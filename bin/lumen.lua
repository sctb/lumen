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
      local _g58
      if nil63(from) or from < 0 then
        _g58 = 0
      else
        _g58 = from
      end
      local i = _g58
      local n = length(x)
      local _g59
      if nil63(upto) or upto > n then
        _g59 = n
      else
        _g59 = upto
      end
      local _g25 = _g59
      while i < _g25 do
        l[j + 1] = x[i + 1]
        i = i + 1
        j = j + 1
      end
      local _g26 = x
      local k = nil
      for k in next, _g26 do
        local v = _g26[k]
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
    local _g60
    if n then
      _g60 = n + 1
    end
    return(string.byte(str, _g60))
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
      local _g28 = a
      local k = nil
      for k in next, _g28 do
        local v = _g28[k]
        c[k] = v
      end
      local _g30 = b
      local k = nil
      for k in next, _g30 do
        local v = _g30[k]
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
    local _g32 = x
    local k = nil
    for k in next, _g32 do
      local v = _g32[k]
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
    local _g34 = t
    local _g21 = nil
    for _g21 in next, _g34 do
      local y = _g34[_g21]
      if x == y then
        return(true)
      end
    end
  end
  nexus["lumen/runtime"]["in?"] = in63
  local function find(f, t)
    local _g36 = t
    local _g22 = nil
    for _g22 in next, _g36 do
      local x = _g36[_g22]
      local _g38 = f(x)
      if _g38 then
        return(_g38)
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
  local function map(f, t)
    local t1 = {}
    local _g39 = t
    local _g40 = 0
    while _g40 < length(_g39) do
      local x = _g39[_g40 + 1]
      local _g41 = f(x)
      if is63(_g41) then
        add(t1, _g41)
      end
      _g40 = _g40 + 1
    end
    local _g42 = t
    local k = nil
    for k in next, _g42 do
      if not number63(k) then
        local v = _g42[k]
        local x = f(v)
        if is63(x) then
          t1[k] = x
        end
      end
    end
    return(t1)
  end
  nexus["lumen/runtime"].map = map
  local function keys63(t)
    local k63 = false
    local _g43 = t
    local k = nil
    for k in next, _g43 do
      if not number63(k) then
        local v = _g43[k]
        k63 = true
        break
      end
    end
    return(k63)
  end
  nexus["lumen/runtime"]["keys?"] = keys63
  local function empty63(t)
    return(none63(t) and not keys63(t))
  end
  nexus["lumen/runtime"]["empty?"] = empty63
  local function stash(args)
    if keys63(args) then
      local p = {_stash = true}
      local _g44 = args
      local k = nil
      for k in next, _g44 do
        if not number63(k) then
          local v = _g44[k]
          p[k] = v
        end
      end
      return(join(args, {p}))
    else
      return(args)
    end
  end
  nexus["lumen/runtime"].stash = stash
  local function unstash(args)
    if none63(args) then
      return({})
    else
      local l = last(args)
      if table63(l) and l._stash then
        local args1 = sub(args, 0, length(args) - 1)
        local _g45 = l
        local k = nil
        for k in next, _g45 do
          if not number63(k) then
            local v = _g45[k]
            if not (k == "_stash") then
              args1[k] = v
            end
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
    local _g61
    if start then
      _g61 = start + 1
    end
    local _g46 = _g61
    local i = string.find(str, pattern, _g46, true)
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
    local _g47 = sub(xs, 0)
    if none63(_g47) then
      return("")
    else
      return(reduce(function (a, b)
        return(a .. b)
      end, _g47))
    end
  end
  nexus["lumen/runtime"].cat = cat
  local function _43(...)
    local xs = unstash({...})
    local _g48 = sub(xs, 0)
    return(reduce(function (a, b)
      return(a + b)
    end, _g48))
  end
  nexus["lumen/runtime"]["+"] = _43
  local function _(...)
    local xs = unstash({...})
    local _g49 = sub(xs, 0)
    return(reduce(function (b, a)
      return(a - b)
    end, reverse(_g49)))
  end
  nexus["lumen/runtime"]["-"] = _
  local function _42(...)
    local xs = unstash({...})
    local _g50 = sub(xs, 0)
    return(reduce(function (a, b)
      return(a * b)
    end, _g50))
  end
  nexus["lumen/runtime"]["*"] = _42
  local function _47(...)
    local xs = unstash({...})
    local _g51 = sub(xs, 0)
    return(reduce(function (b, a)
      return(a / b)
    end, reverse(_g51)))
  end
  nexus["lumen/runtime"]["/"] = _47
  local function _37(...)
    local xs = unstash({...})
    local _g52 = sub(xs, 0)
    return(reduce(function (b, a)
      return(a % b)
    end, reverse(_g52)))
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
            local x1 = sub(x)
            local _g53 = x
            local k = nil
            for k in next, _g53 do
              if not number63(k) then
                local v = _g53[k]
                add(x1, k .. ":")
                add(x1, v)
              end
            end
            local _g54 = x1
            local i = 0
            while i < length(_g54) do
              local y = _g54[i + 1]
              str = str .. string(y)
              if i < length(x1) - 1 then
                str = str .. " "
              end
              i = i + 1
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
    local _g55 = stash(args)
    return(f(unpack(_g55)))
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
    local _g56 = sub(keys, 0)
    if string63(k) then
      local frame = last(environment)
      local x = frame[k] or {}
      local _g57 = _g56
      local k1 = nil
      for k1 in next, _g57 do
        if not number63(k1) then
          local v = _g57[k1]
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
  local _g65 = nexus["lumen/runtime"]
  local replicate = _g65.replicate
  local apply = _g65.apply
  local reverse = _g65.reverse
  local _6261 = _g65[">="]
  local find = _g65.find
  local _6061 = _g65["<="]
  local list63 = _g65["list?"]
  local module = _g65.module
  local pair = _g65.pair
  local composite63 = _g65["composite?"]
  local number = _g65.number
  local none63 = _g65["none?"]
  local empty63 = _g65["empty?"]
  local string_literal63 = _g65["string-literal?"]
  local id_literal63 = _g65["id-literal?"]
  local map = _g65.map
  local length = _g65.length
  local in63 = _g65["in?"]
  local function63 = _g65["function?"]
  local atom63 = _g65["atom?"]
  local write = _g65.write
  local module_key = _g65["module-key"]
  local boolean63 = _g65["boolean?"]
  local unstash = _g65.unstash
  local add = _g65.add
  local tl = _g65.tl
  local split = _g65.split
  local cat = _g65.cat
  local hd = _g65.hd
  local inner = _g65.inner
  local read_file = _g65["read-file"]
  local setenv = _g65.setenv
  local code = _g65.code
  local reduce = _g65.reduce
  local toplevel63 = _g65["toplevel?"]
  local is63 = _g65["is?"]
  local space = _g65.space
  local iterate = _g65.iterate
  local _62 = _g65[">"]
  local string63 = _g65["string?"]
  local make_id = _g65["make-id"]
  local sort = _g65.sort
  local _37message_handler = _g65["%message-handler"]
  local string = _g65.string
  local _60 = _g65["<"]
  local last = _g65.last
  local drop = _g65.drop
  local today = _g65.today
  local exit = _g65.exit
  local write_file = _g65["write-file"]
  local keep = _g65.keep
  local char = _g65.char
  local some63 = _g65["some?"]
  local substring = _g65.substring
  local search = _g65.search
  local _ = _g65["-"]
  local _61 = _g65["="]
  local _47 = _g65["/"]
  local _42 = _g65["*"]
  local nil63 = _g65["nil?"]
  local now = _g65.now
  local _43 = _g65["+"]
  local table63 = _g65["table?"]
  local _37 = _g65["%"]
  local stash = _g65.stash
  local join = _g65.join
  local keys63 = _g65["keys?"]
  local number63 = _g65["number?"]
  local sub = _g65.sub
  local one63 = _g65["one?"]
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
      local _g103
      if c == "\n" then
        _g103 = "\\n"
      else
        local _g104
        if c == "\"" then
          _g104 = "\\\""
        else
          local _g105
          if c == "\\" then
            _g105 = "\\\\"
          else
            _g105 = c
          end
          _g104 = _g105
        end
        _g103 = _g104
      end
      local c1 = _g103
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
      local _g68 = args
      local k = nil
      for k in next, _g68 do
        if not number63(k) then
          local v = _g68[k]
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
        local _g69 = lh
        local i = 0
        while i < length(_g69) do
          local x = _g69[i + 1]
          bs = join(bs, bind(x, {"at", rh, i}))
          i = i + 1
        end
        if r then
          bs = join(bs, bind(r, {"sub", rh, length(lh)}))
        end
        local _g70 = lh
        local k = nil
        for k in next, _g70 do
          if not number63(k) then
            local v = _g70[k]
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
      local _g71 = args
      local _g72 = 0
      while _g72 < length(_g71) do
        local arg = _g71[_g72 + 1]
        if atom63(arg) then
          add(args1, arg)
        else
          if list63(arg) or keys63(arg) then
            local v = make_id()
            add(args1, v)
            bs = join(bs, {arg, v})
          end
        end
        _g72 = _g72 + 1
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
          local _g62 = form[1]
          local name = form[2]
          local value = form[3]
          return({"%local", name, macroexpand(value)})
        else
          if x == "%function" then
            local _g63 = form[1]
            local args = form[2]
            local body = sub(form, 2)
            add(environment, {_scope = true})
            local _g75 = args
            local _g76 = 0
            while _g76 < length(_g75) do
              local _g73 = _g75[_g76 + 1]
              setenv(_g73, {_stash = true, variable = true})
              _g76 = _g76 + 1
            end
            local _g74 = join({"%function", map(macroexpand, args)}, macroexpand(body))
            drop(environment)
            return(_g74)
          else
            if x == "%local-function" or x == "%global-function" then
              local _g64 = form[1]
              local _g77 = form[2]
              local _g78 = form[3]
              local _g79 = sub(form, 3)
              add(environment, {_scope = true})
              local _g82 = _g78
              local _g83 = 0
              while _g83 < length(_g82) do
                local _g80 = _g82[_g83 + 1]
                setenv(_g80, {_stash = true, variable = true})
                _g83 = _g83 + 1
              end
              local _g81 = join({x, _g77, map(macroexpand, _g78)}, macroexpand(_g79))
              drop(environment)
              return(_g81)
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
    local _g84 = form
    local k = nil
    for k in next, _g84 do
      if not number63(k) then
        local v = _g84[k]
        local _g106
        if quasisplice63(v, depth) then
          _g106 = quasiexpand(v[2])
        else
          _g106 = quasiexpand(v, depth)
        end
        local _g85 = _g106
        last(xs)[k] = _g85
      end
    end
    local _g86 = form
    local _g87 = 0
    while _g87 < length(_g86) do
      local x = _g86[_g87 + 1]
      if quasisplice63(x, depth) then
        local _g88 = quasiexpand(x[2])
        add(xs, _g88)
        add(xs, {"list"})
      else
        add(last(xs), quasiexpand(x, depth))
      end
      _g87 = _g87 + 1
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
  local reserved = {["default"] = true, [">="] = true, ["instanceof"] = true, ["<="] = true, ["debugger"] = true, ["return"] = true, ["case"] = true, ["catch"] = true, ["="] = true, ["false"] = true, ["continue"] = true, ["break"] = true, ["for"] = true, ["this"] = true, ["and"] = true, ["if"] = true, ["local"] = true, ["then"] = true, ["-"] = true, ["/"] = true, ["elseif"] = true, ["=="] = true, ["delete"] = true, ["true"] = true, ["switch"] = true, ["while"] = true, ["new"] = true, ["<"] = true, ["throw"] = true, ["until"] = true, [">"] = true, ["%"] = true, ["nil"] = true, ["void"] = true, ["repeat"] = true, ["else"] = true, ["not"] = true, ["with"] = true, ["finally"] = true, ["var"] = true, ["typeof"] = true, ["try"] = true, ["*"] = true, ["+"] = true, ["in"] = true, ["or"] = true, ["function"] = true, ["end"] = true, ["do"] = true}
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
      local _g107
      if c == "-" then
        _g107 = "_"
      else
        local _g108
        if valid_code63(n) then
          _g108 = c
        else
          local _g109
          if i == 0 then
            _g109 = "_" .. n
          else
            _g109 = n
          end
          _g108 = _g109
        end
        _g107 = _g108
      end
      local c1 = _g107
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
    local _g93 = unstash({...})
    local _g94 = _g93.all
    local m = make_id()
    local k = module_key(spec)
    local imports = {}
    if nexus[k] then
      local _g95 = module(spec).export
      local n = nil
      for n in next, _g95 do
        if not number63(n) then
          local b = _g95[n]
          if b.variable and (_g94 or b.export) then
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
    local _g96 = sub(xs, 0)
    return(join(t, _g96))
  end
  nexus["lumen/lib"].extend = extend
  local function exclude(t, ...)
    local keys = unstash({...})
    local _g97 = sub(keys, 0)
    local t1 = {}
    local _g98 = t
    local _g99 = 0
    while _g99 < length(_g98) do
      local x = _g98[_g99 + 1]
      add(t1, x)
      _g99 = _g99 + 1
    end
    local _g100 = t
    local k = nil
    for k in next, _g100 do
      if not number63(k) then
        local v = _g100[k]
        if not _g97[k] then
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
    local _g101 = t
    local k = nil
    for k in next, _g101 do
      if not number63(k) then
        local v = _g101[k]
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
    local _g102 = {"table"}
    _g102.export = quote_frame(m.export)
    _g102.import = quoted(m.import)
    _g102.alias = quoted(m.alias)
    return(_g102)
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
  local _g110 = nexus["lumen/runtime"]
  local replicate = _g110.replicate
  local apply = _g110.apply
  local reverse = _g110.reverse
  local _6261 = _g110[">="]
  local find = _g110.find
  local _6061 = _g110["<="]
  local list63 = _g110["list?"]
  local module = _g110.module
  local pair = _g110.pair
  local composite63 = _g110["composite?"]
  local number = _g110.number
  local none63 = _g110["none?"]
  local empty63 = _g110["empty?"]
  local string_literal63 = _g110["string-literal?"]
  local id_literal63 = _g110["id-literal?"]
  local map = _g110.map
  local length = _g110.length
  local in63 = _g110["in?"]
  local function63 = _g110["function?"]
  local atom63 = _g110["atom?"]
  local write = _g110.write
  local module_key = _g110["module-key"]
  local boolean63 = _g110["boolean?"]
  local unstash = _g110.unstash
  local add = _g110.add
  local tl = _g110.tl
  local split = _g110.split
  local cat = _g110.cat
  local hd = _g110.hd
  local inner = _g110.inner
  local read_file = _g110["read-file"]
  local setenv = _g110.setenv
  local code = _g110.code
  local reduce = _g110.reduce
  local toplevel63 = _g110["toplevel?"]
  local is63 = _g110["is?"]
  local space = _g110.space
  local iterate = _g110.iterate
  local _62 = _g110[">"]
  local string63 = _g110["string?"]
  local make_id = _g110["make-id"]
  local sort = _g110.sort
  local _37message_handler = _g110["%message-handler"]
  local string = _g110.string
  local _60 = _g110["<"]
  local last = _g110.last
  local drop = _g110.drop
  local today = _g110.today
  local exit = _g110.exit
  local write_file = _g110["write-file"]
  local keep = _g110.keep
  local char = _g110.char
  local some63 = _g110["some?"]
  local substring = _g110.substring
  local search = _g110.search
  local _ = _g110["-"]
  local _61 = _g110["="]
  local _47 = _g110["/"]
  local _42 = _g110["*"]
  local nil63 = _g110["nil?"]
  local now = _g110.now
  local _43 = _g110["+"]
  local table63 = _g110["table?"]
  local _37 = _g110["%"]
  local stash = _g110.stash
  local join = _g110.join
  local keys63 = _g110["keys?"]
  local number63 = _g110["number?"]
  local sub = _g110.sub
  local one63 = _g110["one?"]
  local delimiters = {[")"] = true, ["("] = true, [";"] = true, ["\n"] = true}
  nexus["lumen/reader"].delimiters = delimiters
  local whitespace = {["\t"] = true, ["\n"] = true, [" "] = true}
  nexus["lumen/reader"].whitespace = whitespace
  local function make_stream(str)
    return({string = str, pos = 0, len = length(str)})
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
  local _g121 = nexus["lumen/runtime"]
  local replicate = _g121.replicate
  local apply = _g121.apply
  local reverse = _g121.reverse
  local _6261 = _g121[">="]
  local find = _g121.find
  local _6061 = _g121["<="]
  local list63 = _g121["list?"]
  local module = _g121.module
  local pair = _g121.pair
  local composite63 = _g121["composite?"]
  local number = _g121.number
  local none63 = _g121["none?"]
  local empty63 = _g121["empty?"]
  local string_literal63 = _g121["string-literal?"]
  local id_literal63 = _g121["id-literal?"]
  local map = _g121.map
  local length = _g121.length
  local in63 = _g121["in?"]
  local function63 = _g121["function?"]
  local atom63 = _g121["atom?"]
  local write = _g121.write
  local module_key = _g121["module-key"]
  local boolean63 = _g121["boolean?"]
  local unstash = _g121.unstash
  local add = _g121.add
  local tl = _g121.tl
  local split = _g121.split
  local cat = _g121.cat
  local hd = _g121.hd
  local inner = _g121.inner
  local read_file = _g121["read-file"]
  local setenv = _g121.setenv
  local code = _g121.code
  local reduce = _g121.reduce
  local toplevel63 = _g121["toplevel?"]
  local is63 = _g121["is?"]
  local space = _g121.space
  local iterate = _g121.iterate
  local _62 = _g121[">"]
  local string63 = _g121["string?"]
  local make_id = _g121["make-id"]
  local sort = _g121.sort
  local _37message_handler = _g121["%message-handler"]
  local string = _g121.string
  local _60 = _g121["<"]
  local last = _g121.last
  local drop = _g121.drop
  local today = _g121.today
  local exit = _g121.exit
  local write_file = _g121["write-file"]
  local keep = _g121.keep
  local char = _g121.char
  local some63 = _g121["some?"]
  local substring = _g121.substring
  local search = _g121.search
  local _ = _g121["-"]
  local _61 = _g121["="]
  local _47 = _g121["/"]
  local _42 = _g121["*"]
  local nil63 = _g121["nil?"]
  local now = _g121.now
  local _43 = _g121["+"]
  local table63 = _g121["table?"]
  local _37 = _g121["%"]
  local stash = _g121.stash
  local join = _g121.join
  local keys63 = _g121["keys?"]
  local number63 = _g121["number?"]
  local sub = _g121.sub
  local one63 = _g121["one?"]
  local _g124 = nexus["lumen/lib"]
  local macroexpand = _g124.macroexpand
  local bind42 = _g124["bind*"]
  local key = _g124.key
  local quasiexpand = _g124.quasiexpand
  local macro63 = _g124["macro?"]
  local id = _g124.id
  local variable63 = _g124["variable?"]
  local special_form63 = _g124["special-form?"]
  local statement63 = _g124["statement?"]
  local quote_environment = _g124["quote-environment"]
  local link = _g124.link
  local getenv = _g124.getenv
  local symbol_expansion = _g124["symbol-expansion"]
  local special63 = _g124["special?"]
  local symbol63 = _g124["symbol?"]
  local indentation = _g124.indentation
  local stash42 = _g124["stash*"]
  local reserved63 = _g124["reserved?"]
  local imported = _g124.imported
  local bind = _g124.bind
  local initial_environment = _g124["initial-environment"]
  local quoted = _g124.quoted
  local quote_modules = _g124["quote-modules"]
  local mapo = _g124.mapo
  local bound63 = _g124["bound?"]
  local macro_function = _g124["macro-function"]
  local valid_id63 = _g124["valid-id?"]
  local _g125 = nexus["lumen/reader"]
  local read_from_string = _g125["read-from-string"]
  local read = _g125.read
  local make_stream = _g125["make-stream"]
  local read_all = _g125["read-all"]
  local read_table = _g125["read-table"]
  local _g129 = {}
  _g129.lua = "not "
  _g129.js = "!"
  local _g127 = {}
  local _g130 = {}
  _g130.lua = "not "
  _g130.js = "!"
  _g127["not"] = _g130
  local _g132 = {}
  _g132["*"] = true
  _g132["%"] = true
  _g132["/"] = true
  local _g134 = {}
  _g134["+"] = true
  _g134["-"] = true
  local _g138 = {}
  _g138.lua = ".."
  _g138.js = "+"
  local _g136 = {}
  local _g139 = {}
  _g139.lua = ".."
  _g139.js = "+"
  _g136.cat = _g139
  local _g141 = {}
  _g141[">="] = true
  _g141["<"] = true
  _g141["<="] = true
  _g141[">"] = true
  local _g145 = {}
  _g145.lua = "~="
  _g145.js = "!="
  local _g147 = {}
  _g147.lua = "=="
  _g147.js = "==="
  local _g143 = {}
  local _g148 = {}
  _g148.lua = "~="
  _g148.js = "!="
  _g143["~="] = _g148
  local _g149 = {}
  _g149.lua = "=="
  _g149.js = "==="
  _g143["="] = _g149
  local _g153 = {}
  _g153.lua = "and"
  _g153.js = "&&"
  local _g151 = {}
  local _g154 = {}
  _g154.lua = "and"
  _g154.js = "&&"
  _g151["and"] = _g154
  local _g158 = {}
  _g158.lua = "or"
  _g158.js = "||"
  local _g156 = {}
  local _g159 = {}
  _g159.lua = "or"
  _g159.js = "||"
  _g156["or"] = _g159
  local infix = {_g127, _g132, _g134, _g136, _g141, _g143, _g151, _g156}
  nexus["lumen/compiler"].infix = infix
  local function unary63(form)
    local op = form[1]
    local args = sub(form, 1)
    return(one63(args) and in63(op, {"not", "-"}))
  end
  nexus["lumen/compiler"]["unary?"] = unary63
  local function precedence(form)
    if list63(form) and not unary63(form) then
      local _g160 = infix
      local i = 0
      while i < length(_g160) do
        local level = _g160[i + 1]
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
    local _g161 = args
    local i = 0
    while i < length(_g161) do
      local arg = _g161[i + 1]
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
    local _g162 = getenv(x)
    local self_tr63 = _g162.tr
    local special = _g162.special
    local stmt = _g162.stmt
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
    local _g163 = unstash({...})
    local right = _g163.right
    local _g192
    if right then
      _g192 = _6261
    else
      _g192 = _62
    end
    if _g192(precedence(child), precedence(parent)) then
      return({"(", ")"})
    else
      return({"", ""})
    end
  end
  nexus["lumen/compiler"]["op-delims"] = op_delims
  local function compile_infix(form)
    local op = form[1]
    local _g164 = sub(form, 1)
    local a = _g164[1]
    local b = _g164[2]
    local _g165 = op_delims(form, a)
    local ao = _g165[1]
    local ac = _g165[2]
    local _g166 = op_delims(form, b, {_stash = true, right = true})
    local bo = _g166[1]
    local bc = _g166[2]
    local _g167 = compile(a)
    local _g168 = compile(b)
    local _g169 = getop(op)
    if unary63(form) then
      return(_g169 .. ao .. _g167 .. ac)
    else
      return(ao .. _g167 .. ac .. " " .. _g169 .. " " .. bo .. _g168 .. bc)
    end
  end
  nexus["lumen/compiler"]["compile-infix"] = compile_infix
  local function compile_function(args, body, ...)
    local _g170 = unstash({...})
    local name = _g170.name
    local prefix = _g170.prefix
    local _g193
    if name then
      _g193 = compile(name)
    else
      _g193 = ""
    end
    local id = _g193
    local _g171 = prefix or ""
    local _g172 = compile_args(args)
    indent_level = indent_level + 1
    local _g174 = compile(body, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local _g173 = _g174
    local ind = indentation()
    local _g194
    if target == "js" then
      _g194 = ""
    else
      _g194 = "end"
    end
    local tr = _g194
    if name then
      tr = tr .. "\n"
    end
    if target == "js" then
      return("function " .. id .. _g172 .. " {\n" .. _g173 .. ind .. "}" .. tr)
    else
      return(_g171 .. "function " .. id .. _g172 .. "\n" .. _g173 .. ind .. tr)
    end
  end
  nexus["lumen/compiler"]["compile-function"] = compile_function
  local function can_return63(form)
    return(is63(form) and (atom63(form) or not (hd(form) == "return") and not statement63(hd(form))))
  end
  nexus["lumen/compiler"]["can-return?"] = can_return63
  compile = function (form, ...)
    local _g175 = unstash({...})
    local stmt = _g175.stmt
    if nil63(form) then
      return("")
    else
      if special_form63(form) then
        return(compile_special(form, stmt))
      else
        local tr = terminator(stmt)
        local _g195
        if stmt then
          _g195 = indentation()
        else
          _g195 = ""
        end
        local ind = _g195
        local _g196
        if atom63(form) then
          _g196 = compile_atom(form)
        else
          local _g197
          if infix63(hd(form)) then
            _g197 = compile_infix(form)
          else
            _g197 = compile_call(form)
          end
          _g196 = _g197
        end
        local _g176 = _g196
        return(ind .. _g176 .. tr)
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
    local _g177 = sub(args, 0, length(args) - 1)
    local _g178 = 0
    while _g178 < length(_g177) do
      local x = _g177[_g178 + 1]
      add(hoist, lower(x, hoist, stmt63))
      _g178 = _g178 + 1
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
    local _g179 = args[2]
    local _g180 = args[3]
    if stmt63 or tail63 then
      local _g199
      if _g180 then
        _g199 = {lower_body({_g180}, tail63)}
      end
      return(add(hoist, join({"%if", lower(cond, hoist), lower_body({_g179}, tail63)}, _g199)))
    else
      local e = make_id()
      add(hoist, {"%local", e})
      local _g198
      if _g180 then
        _g198 = {lower({"set", e, _g180})}
      end
      add(hoist, join({"%if", lower(cond, hoist), lower({"set", e, _g179})}, _g198))
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
      local _g200
      if x == "and" then
        _g200 = {"%if", id, b, id}
      else
        _g200 = {"%if", id, id, b}
      end
      return(lower({"do", {"%local", id, a}, _g200}, hoist))
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
    local _g181 = args[2]
    local body = sub(args, 2)
    return(add(hoist, {kind, name, _g181, lower_body(body, true)}))
  end
  nexus["lumen/compiler"]["lower-definition"] = lower_definition
  local function lower_call(form, hoist)
    local _g182 = map(function (x)
      return(lower(x, hoist))
    end, form)
    if some63(_g182) then
      return(_g182)
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
    local _g183 = unstash({...})
    local _g184 = _g183.all
    local m = module(spec)
    local frame = last(environment)
    local _g185 = m.export
    local k = nil
    for k in next, _g185 do
      if not number63(k) then
        local v = _g185[k]
        if v.export or _g184 then
          frame[k] = v
        end
      end
    end
  end
  nexus["lumen/compiler"]["open-module"] = open_module
  local function load_module(spec, ...)
    local _g186 = unstash({...})
    local _g187 = _g186.all
    if not module(spec) then
      _37compile_module(spec)
    end
    return(open_module(spec, {_stash = true, all = _g187}))
  end
  nexus["lumen/compiler"]["load-module"] = load_module
  local function in_module(spec)
    load_module(spec, {_stash = true, all = true})
    local m = module(spec)
    map(open_module, m.import)
    current_module = spec
  end
  nexus["lumen/compiler"]["in-module"] = in_module
  local function import_modules(specs)
    local imports = {}
    local bindings = {}
    local _g188 = specs or {}
    local _g189 = 0
    while _g189 < length(_g188) do
      local spec = _g188[_g189 + 1]
      load_module(spec)
      local m = module(spec)
      if m.alias then
        local _g190 = import_modules(m.alias)
        local aliased = _g190[1]
        local bs = _g190[2]
        imports = join(imports, aliased)
        bindings = join(bindings, bs)
      else
        local _g191 = imported(spec)
        add(imports, spec)
        bindings = join(bindings, _g191)
      end
      _g189 = _g189 + 1
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
    local m = module(current_module)
    return(join(reduce(join, map(imported, m.import)), imported(current_module, {_stash = true, all = true})))
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
  local _g201 = nexus["lumen/runtime"]
  local replicate = _g201.replicate
  local apply = _g201.apply
  local reverse = _g201.reverse
  local _6261 = _g201[">="]
  local find = _g201.find
  local _6061 = _g201["<="]
  local list63 = _g201["list?"]
  local module = _g201.module
  local pair = _g201.pair
  local composite63 = _g201["composite?"]
  local number = _g201.number
  local none63 = _g201["none?"]
  local empty63 = _g201["empty?"]
  local string_literal63 = _g201["string-literal?"]
  local id_literal63 = _g201["id-literal?"]
  local map = _g201.map
  local length = _g201.length
  local in63 = _g201["in?"]
  local function63 = _g201["function?"]
  local atom63 = _g201["atom?"]
  local write = _g201.write
  local module_key = _g201["module-key"]
  local boolean63 = _g201["boolean?"]
  local unstash = _g201.unstash
  local add = _g201.add
  local tl = _g201.tl
  local split = _g201.split
  local cat = _g201.cat
  local hd = _g201.hd
  local inner = _g201.inner
  local read_file = _g201["read-file"]
  local setenv = _g201.setenv
  local code = _g201.code
  local reduce = _g201.reduce
  local toplevel63 = _g201["toplevel?"]
  local is63 = _g201["is?"]
  local space = _g201.space
  local iterate = _g201.iterate
  local _62 = _g201[">"]
  local string63 = _g201["string?"]
  local make_id = _g201["make-id"]
  local sort = _g201.sort
  local _37message_handler = _g201["%message-handler"]
  local string = _g201.string
  local _60 = _g201["<"]
  local last = _g201.last
  local drop = _g201.drop
  local today = _g201.today
  local exit = _g201.exit
  local write_file = _g201["write-file"]
  local keep = _g201.keep
  local char = _g201.char
  local some63 = _g201["some?"]
  local substring = _g201.substring
  local search = _g201.search
  local _ = _g201["-"]
  local _61 = _g201["="]
  local _47 = _g201["/"]
  local _42 = _g201["*"]
  local nil63 = _g201["nil?"]
  local now = _g201.now
  local _43 = _g201["+"]
  local table63 = _g201["table?"]
  local _37 = _g201["%"]
  local stash = _g201.stash
  local join = _g201.join
  local keys63 = _g201["keys?"]
  local number63 = _g201["number?"]
  local sub = _g201.sub
  local one63 = _g201["one?"]
  local _g204 = nexus["lumen/lib"]
  local macroexpand = _g204.macroexpand
  local bind42 = _g204["bind*"]
  local key = _g204.key
  local quasiexpand = _g204.quasiexpand
  local macro63 = _g204["macro?"]
  local id = _g204.id
  local variable63 = _g204["variable?"]
  local special_form63 = _g204["special-form?"]
  local statement63 = _g204["statement?"]
  local quote_environment = _g204["quote-environment"]
  local link = _g204.link
  local getenv = _g204.getenv
  local symbol_expansion = _g204["symbol-expansion"]
  local special63 = _g204["special?"]
  local symbol63 = _g204["symbol?"]
  local indentation = _g204.indentation
  local stash42 = _g204["stash*"]
  local reserved63 = _g204["reserved?"]
  local imported = _g204.imported
  local bind = _g204.bind
  local initial_environment = _g204["initial-environment"]
  local quoted = _g204.quoted
  local quote_modules = _g204["quote-modules"]
  local mapo = _g204.mapo
  local bound63 = _g204["bound?"]
  local macro_function = _g204["macro-function"]
  local valid_id63 = _g204["valid-id?"]
  local _g205 = nexus["lumen/compiler"]
  local in_module = _g205["in-module"]
  local open_module = _g205["open-module"]
  local declare = _g205.declare
  local import_modules = _g205["import-modules"]
  local compile_module = _g205["compile-module"]
  local compile = _g205.compile
  local compile_function = _g205["compile-function"]
  local load_module = _g205["load-module"]
  local eval = _g205.eval
end)();
(function ()
  nexus["lumen/core"] = {}
  local _g379 = nexus["lumen/runtime"]
  local replicate = _g379.replicate
  local apply = _g379.apply
  local reverse = _g379.reverse
  local _6261 = _g379[">="]
  local find = _g379.find
  local _6061 = _g379["<="]
  local list63 = _g379["list?"]
  local module = _g379.module
  local pair = _g379.pair
  local composite63 = _g379["composite?"]
  local number = _g379.number
  local none63 = _g379["none?"]
  local empty63 = _g379["empty?"]
  local string_literal63 = _g379["string-literal?"]
  local id_literal63 = _g379["id-literal?"]
  local map = _g379.map
  local length = _g379.length
  local in63 = _g379["in?"]
  local function63 = _g379["function?"]
  local atom63 = _g379["atom?"]
  local write = _g379.write
  local module_key = _g379["module-key"]
  local boolean63 = _g379["boolean?"]
  local unstash = _g379.unstash
  local add = _g379.add
  local tl = _g379.tl
  local split = _g379.split
  local cat = _g379.cat
  local hd = _g379.hd
  local inner = _g379.inner
  local read_file = _g379["read-file"]
  local setenv = _g379.setenv
  local code = _g379.code
  local reduce = _g379.reduce
  local toplevel63 = _g379["toplevel?"]
  local is63 = _g379["is?"]
  local space = _g379.space
  local iterate = _g379.iterate
  local _62 = _g379[">"]
  local string63 = _g379["string?"]
  local make_id = _g379["make-id"]
  local sort = _g379.sort
  local _37message_handler = _g379["%message-handler"]
  local string = _g379.string
  local _60 = _g379["<"]
  local last = _g379.last
  local drop = _g379.drop
  local today = _g379.today
  local exit = _g379.exit
  local write_file = _g379["write-file"]
  local keep = _g379.keep
  local char = _g379.char
  local some63 = _g379["some?"]
  local substring = _g379.substring
  local search = _g379.search
  local _ = _g379["-"]
  local _61 = _g379["="]
  local _47 = _g379["/"]
  local _42 = _g379["*"]
  local nil63 = _g379["nil?"]
  local now = _g379.now
  local _43 = _g379["+"]
  local table63 = _g379["table?"]
  local _37 = _g379["%"]
  local stash = _g379.stash
  local join = _g379.join
  local keys63 = _g379["keys?"]
  local number63 = _g379["number?"]
  local sub = _g379.sub
  local one63 = _g379["one?"]
  local _g382 = nexus["lumen/lib"]
  local macroexpand = _g382.macroexpand
  local bind42 = _g382["bind*"]
  local key = _g382.key
  local quasiexpand = _g382.quasiexpand
  local macro63 = _g382["macro?"]
  local id = _g382.id
  local variable63 = _g382["variable?"]
  local special_form63 = _g382["special-form?"]
  local statement63 = _g382["statement?"]
  local quote_environment = _g382["quote-environment"]
  local link = _g382.link
  local getenv = _g382.getenv
  local symbol_expansion = _g382["symbol-expansion"]
  local special63 = _g382["special?"]
  local symbol63 = _g382["symbol?"]
  local indentation = _g382.indentation
  local stash42 = _g382["stash*"]
  local reserved63 = _g382["reserved?"]
  local imported = _g382.imported
  local bind = _g382.bind
  local initial_environment = _g382["initial-environment"]
  local quoted = _g382.quoted
  local quote_modules = _g382["quote-modules"]
  local mapo = _g382.mapo
  local bound63 = _g382["bound?"]
  local macro_function = _g382["macro-function"]
  local valid_id63 = _g382["valid-id?"]
  local _g383 = nexus["lumen/compiler"]
  local in_module = _g383["in-module"]
  local open_module = _g383["open-module"]
  local declare = _g383.declare
  local import_modules = _g383["import-modules"]
  local compile_module = _g383["compile-module"]
  local compile = _g383.compile
  local compile_function = _g383["compile-function"]
  local load_module = _g383["load-module"]
  local eval = _g383.eval
  target = "lua"
end)();
(function ()
  nexus["lumen/boot"] = {}
  local _g692 = nexus["lumen/runtime"]
  local replicate = _g692.replicate
  local apply = _g692.apply
  local reverse = _g692.reverse
  local _6261 = _g692[">="]
  local find = _g692.find
  local _6061 = _g692["<="]
  local list63 = _g692["list?"]
  local module = _g692.module
  local pair = _g692.pair
  local composite63 = _g692["composite?"]
  local number = _g692.number
  local none63 = _g692["none?"]
  local empty63 = _g692["empty?"]
  local string_literal63 = _g692["string-literal?"]
  local id_literal63 = _g692["id-literal?"]
  local map = _g692.map
  local length = _g692.length
  local in63 = _g692["in?"]
  local function63 = _g692["function?"]
  local atom63 = _g692["atom?"]
  local write = _g692.write
  local module_key = _g692["module-key"]
  local boolean63 = _g692["boolean?"]
  local unstash = _g692.unstash
  local add = _g692.add
  local tl = _g692.tl
  local split = _g692.split
  local cat = _g692.cat
  local hd = _g692.hd
  local inner = _g692.inner
  local read_file = _g692["read-file"]
  local setenv = _g692.setenv
  local code = _g692.code
  local reduce = _g692.reduce
  local toplevel63 = _g692["toplevel?"]
  local is63 = _g692["is?"]
  local space = _g692.space
  local iterate = _g692.iterate
  local _62 = _g692[">"]
  local string63 = _g692["string?"]
  local make_id = _g692["make-id"]
  local sort = _g692.sort
  local _37message_handler = _g692["%message-handler"]
  local string = _g692.string
  local _60 = _g692["<"]
  local last = _g692.last
  local drop = _g692.drop
  local today = _g692.today
  local exit = _g692.exit
  local write_file = _g692["write-file"]
  local keep = _g692.keep
  local char = _g692.char
  local some63 = _g692["some?"]
  local substring = _g692.substring
  local search = _g692.search
  local _ = _g692["-"]
  local _61 = _g692["="]
  local _47 = _g692["/"]
  local _42 = _g692["*"]
  local nil63 = _g692["nil?"]
  local now = _g692.now
  local _43 = _g692["+"]
  local table63 = _g692["table?"]
  local _37 = _g692["%"]
  local stash = _g692.stash
  local join = _g692.join
  local keys63 = _g692["keys?"]
  local number63 = _g692["number?"]
  local sub = _g692.sub
  local one63 = _g692["one?"]
  local _g695 = nexus["lumen/lib"]
  local macroexpand = _g695.macroexpand
  local bind42 = _g695["bind*"]
  local key = _g695.key
  local quasiexpand = _g695.quasiexpand
  local macro63 = _g695["macro?"]
  local id = _g695.id
  local variable63 = _g695["variable?"]
  local special_form63 = _g695["special-form?"]
  local statement63 = _g695["statement?"]
  local quote_environment = _g695["quote-environment"]
  local link = _g695.link
  local getenv = _g695.getenv
  local symbol_expansion = _g695["symbol-expansion"]
  local special63 = _g695["special?"]
  local symbol63 = _g695["symbol?"]
  local indentation = _g695.indentation
  local stash42 = _g695["stash*"]
  local reserved63 = _g695["reserved?"]
  local imported = _g695.imported
  local bind = _g695.bind
  local initial_environment = _g695["initial-environment"]
  local quoted = _g695.quoted
  local quote_modules = _g695["quote-modules"]
  local mapo = _g695.mapo
  local bound63 = _g695["bound?"]
  local macro_function = _g695["macro-function"]
  local valid_id63 = _g695["valid-id?"]
  local _g696 = nexus["lumen/compiler"]
  local in_module = _g696["in-module"]
  local open_module = _g696["open-module"]
  local declare = _g696.declare
  local import_modules = _g696["import-modules"]
  local compile_module = _g696["compile-module"]
  local compile = _g696.compile
  local compile_function = _g696["compile-function"]
  local load_module = _g696["load-module"]
  local eval = _g696.eval
  modules = {["lumen/system"] = {export = {nexus = {export = true, global = true}}, import = {{"lumen", "special"}, {"lumen", "core"}}}, user = {export = {}, import = {"lumen", {"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}}}, ["lumen/main"] = {export = {}, import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}, {"lumen", "reader"}, {"lumen", "compiler"}}}, ["lumen/core"] = {export = {["cat!"] = {export = true, macro = function (a, ...)
    local bs = unstash({...})
    local _g709 = sub(bs, 0)
    return({"set", a, join({"cat", a}, _g709)})
  end}, all = {export = true, macro = function (_g710, t, ...)
    local k = _g710[1]
    local v = _g710[2]
    local body = unstash({...})
    local _g711 = sub(body, 0)
    local x = make_id()
    local n = make_id()
    local _g780
    if target == "lua" then
      _g780 = _g711
    else
      _g780 = {join({"let", {n, {"parseInt", k}, k, {"if", {"isNaN", n}, k, n}}}, _g711)}
    end
    return({"let", {x, t, k, "nil"}, {"%for", x, k, join({"let", {v, {"get", x, k}}}, _g780)}})
  end}, ["define-module"] = {export = true, macro = function (spec, ...)
    local body = unstash({...})
    local _g712 = sub(body, 0)
    local exp = _g712.export
    local imp = _g712.import
    local alias = _g712.alias
    local _g713 = import_modules(imp)
    local imports = _g713[1]
    local bindings = _g713[2]
    local k = module_key(spec)
    modules[k] = {export = {}, import = imports, alias = alias}
    local _g714 = exp or {}
    local _g715 = 0
    while _g715 < length(_g714) do
      local x = _g714[_g715 + 1]
      setenv(x, {_stash = true, export = true})
      _g715 = _g715 + 1
    end
    return(join({"do", {"set", {"get", "nexus", {"quote", k}}, {"table"}}}, bindings))
  end}, ["let-symbol"] = {export = true, macro = function (expansions, ...)
    local body = unstash({...})
    local _g716 = sub(body, 0)
    add(environment, {})
    map(function (_g718)
      local name = _g718[1]
      local exp = _g718[2]
      return(macroexpand({"define-symbol", name, exp}))
    end, pair(expansions))
    local _g717 = join({"do"}, macroexpand(_g716))
    drop(environment)
    return(_g717)
  end}, at = {export = true, macro = function (l, i)
    if target == "lua" and number63(i) then
      i = i + 1
    else
      if target == "lua" then
        i = {"+", i, 1}
      end
    end
    return({"get", l, i})
  end}, when = {export = true, macro = function (cond, ...)
    local body = unstash({...})
    local _g719 = sub(body, 0)
    return({"if", cond, join({"do"}, _g719)})
  end}, ["set*"] = {export = true, macro = function (name, value)
    return(link(name, {"set", name, value}))
  end}, ["let-macro"] = {export = true, macro = function (definitions, ...)
    local body = unstash({...})
    local _g720 = sub(body, 0)
    add(environment, {})
    map(function (m)
      return(macroexpand(join({"define-macro"}, m)))
    end, definitions)
    local _g721 = join({"do"}, macroexpand(_g720))
    drop(environment)
    return(_g721)
  end}, ["if"] = {export = true, macro = function (...)
    local branches = unstash({...})
    local function step(_g722)
      local a = _g722[1]
      local b = _g722[2]
      local c = sub(_g722, 2)
      if is63(b) then
        return({join({"%if", a, b}, step(c))})
      else
        if is63(a) then
          return({a})
        end
      end
    end
    return(hd(step(branches)))
  end}, guard = {export = true, macro = function (expr)
    if target == "js" then
      return({{"fn", {}, {"%try", {"list", true, expr}}}})
    else
      local e = make_id()
      local x = make_id()
      local ex = "|" .. e .. "," .. x .. "|"
      return({"let", {ex, {"xpcall", {"fn", {}, expr}, "%message-handler"}}, {"list", e, x}})
    end
  end}, quote = {export = true, macro = function (form)
    return(quoted(form))
  end}, fn = {export = true, macro = function (args, ...)
    local body = unstash({...})
    local _g723 = sub(body, 0)
    local _g724 = bind42(args, _g723)
    local _g725 = _g724[1]
    local _g726 = _g724[2]
    return(join({"%function", _g725}, _g726))
  end}, unless = {export = true, macro = function (cond, ...)
    local body = unstash({...})
    local _g727 = sub(body, 0)
    return({"if", {"not", cond}, join({"do"}, _g727)})
  end}, pr = {export = true, macro = function (...)
    local xs = unstash({...})
    return({"print", space(xs)})
  end}, ["join!"] = {export = true, macro = function (a, ...)
    local bs = unstash({...})
    local _g728 = sub(bs, 0)
    return({"set", a, join({"join*", a}, _g728)})
  end}, table = {export = true, macro = function (...)
    local body = unstash({...})
    return(join({"%object"}, mapo(function (x)
      return(x)
    end, body)))
  end}, language = {export = true, macro = function ()
    return({"quote", target})
  end}, quasiquote = {export = true, macro = function (form)
    return(quasiexpand(form, 1))
  end}, ["define-special"] = {export = true, macro = function (name, args, ...)
    local body = unstash({...})
    local _g729 = sub(body, 0)
    local form = join({"fn", args}, _g729)
    local keys = sub(_g729, length(_g729))
    local _g730 = {"setenv", {"quote", name}}
    _g730.form = {"quote", form}
    _g730.special = form
    eval(join(_g730, keys))
    return(nil)
  end}, dec = {export = true, macro = function (n, by)
    return({"set", n, {"-", n, by or 1}})
  end}, let = {export = true, macro = function (bindings, ...)
    local body = unstash({...})
    local _g731 = sub(body, 0)
    if length(bindings) < 2 then
      return(join({"do"}, _g731))
    else
      local renames = {}
      local locals = {}
      local lh = bindings[1]
      local rh = bindings[2]
      local _g732 = bind(lh, rh)
      local _g733 = 0
      while _g733 < length(_g732) do
        local _g734 = _g732[_g733 + 1]
        local id = _g734[1]
        local val = _g734[2]
        if bound63(id) or reserved63(id) or toplevel63() then
          local id1 = make_id()
          add(renames, id)
          add(renames, id1)
          id = id1
        else
          setenv(id, {_stash = true, variable = true})
        end
        add(locals, {"%local", id, val})
        _g733 = _g733 + 1
      end
      return(join({"do"}, join(locals, {{"let-symbol", renames, join({"let", sub(bindings, 2)}, _g731)}})))
    end
  end}, ["with-frame"] = {export = true, macro = function (...)
    local body = unstash({...})
    local _g735 = sub(body, 0)
    local scope = body.scope
    local x = make_id()
    local _g736 = {"table"}
    _g736._scope = scope
    return({"do", {"add", "environment", _g736}, {"let", {x, join({"do"}, _g735)}, {"drop", "environment"}, x}})
  end}, target = {export = true, macro = function (...)
    local clauses = unstash({...})
    return(clauses[target])
  end, global = true}, inc = {export = true, macro = function (n, by)
    return({"set", n, {"+", n, by or 1}})
  end}, ["define-symbol"] = {export = true, macro = function (name, expansion)
    setenv(name, {_stash = true, symbol = expansion})
    return(nil)
  end}, ["with-bindings"] = {export = true, macro = function (_g737, ...)
    local names = _g737[1]
    local body = unstash({...})
    local _g738 = sub(body, 0)
    local x = make_id()
    local _g740 = {"setenv", x}
    _g740.variable = true
    local _g739 = {"with-frame", {"each", {x}, names, _g740}}
    _g739.scope = true
    return(join(_g739, _g738))
  end}, ["join*"] = {export = true, macro = function (...)
    local xs = unstash({...})
    return(reduce(function (a, b)
      return({"join", a, b})
    end, xs))
  end}, ["set-of"] = {export = true, macro = function (...)
    local xs = unstash({...})
    local l = {}
    local _g741 = xs
    local _g742 = 0
    while _g742 < length(_g741) do
      local x = _g741[_g742 + 1]
      l[x] = true
      _g742 = _g742 + 1
    end
    return(join({"table"}, l))
  end}, ["define*"] = {export = true, macro = function (name, x, ...)
    local body = unstash({...})
    local _g743 = sub(body, 0)
    setenv(name, {_stash = true, export = true, global = true})
    if some63(_g743) then
      local _g744 = bind42(x, _g743)
      local args = _g744[1]
      local _g745 = _g744[2]
      return(join({"%global-function", name, args}, _g745))
    else
      if target == "js" then
        return({"set", {"get", "global", {"quote", id(name)}}, x})
      else
        return({"set", name, x})
      end
    end
  end}, ["define-macro"] = {export = true, macro = function (name, args, ...)
    local body = unstash({...})
    local _g746 = sub(body, 0)
    local form = join({"fn", args}, _g746)
    local _g747 = {"setenv", {"quote", name}}
    _g747.form = {"quote", form}
    _g747.macro = form
    eval(_g747)
    return(nil)
  end}, list = {export = true, macro = function (...)
    local body = unstash({...})
    local l = join({"%array"}, body)
    if not keys63(body) then
      return(l)
    else
      local id = make_id()
      local init = {}
      local _g748 = body
      local k = nil
      for k in next, _g748 do
        if not number63(k) then
          local v = _g748[k]
          add(init, {"set", {"get", id, {"quote", k}}, v})
        end
      end
      return(join({"let", {id, l}}, join(init, {id})))
    end
  end}, define = {export = true, macro = function (name, x, ...)
    local body = unstash({...})
    local _g749 = sub(body, 0)
    setenv(name, {_stash = true, variable = true})
    if some63(_g749) and target == "js" then
      return(link(name, {"%local", name, join({"fn", x}, _g749)}))
    else
      if some63(_g749) then
        local _g750 = bind42(x, _g749)
        local args = _g750[1]
        local _g751 = _g750[2]
        return(link(name, join({"%local-function", name, args}, _g751)))
      else
        return(link(name, {"%local", name, x}))
      end
    end
  end}, each = {export = true, macro = function (b, t, ...)
    local body = unstash({...})
    local _g752 = sub(body, 0)
    local k = b[1]
    local v = b[2]
    local t1 = make_id()
    local _g781
    if nil63(v) then
      local _g782
      if b.i then
        _g782 = "i"
      else
        _g782 = make_id()
      end
      local i = _g782
      _g781 = {"let", {i, 0}, {"while", {"<", i, {"length", t1}}, join({"let", {k, {"at", t1, i}}}, _g752), {"inc", i}}}
    else
      local _g753 = {"target"}
      _g753.lua = {"not", {"number?", k}}
      _g753.js = {"isNaN", {"parseInt", k}}
      _g781 = {"let", {k, "nil"}, {"%for", t1, k, {"when", _g753, join({"let", {v, {"get", t1, k}}}, _g752)}}}
    end
    return({"let", {t1, t}, _g781})
  end}}, import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}, {"lumen", "lib"}, {"lumen", "compiler"}}}, ["lumen/runtime"] = {export = {replicate = {export = true, variable = true}, apply = {export = true, variable = true}, reverse = {export = true, variable = true}, [">="] = {export = true, variable = true}, find = {export = true, variable = true}, ["<="] = {export = true, variable = true}, ["list?"] = {export = true, variable = true}, module = {export = true, variable = true}, pair = {export = true, variable = true}, ["composite?"] = {export = true, variable = true}, number = {export = true, variable = true}, ["none?"] = {export = true, variable = true}, ["empty?"] = {export = true, variable = true}, ["string-literal?"] = {export = true, variable = true}, ["id-literal?"] = {export = true, variable = true}, map = {export = true, variable = true}, length = {export = true, variable = true}, ["in?"] = {export = true, variable = true}, ["function?"] = {export = true, variable = true}, ["atom?"] = {export = true, variable = true}, write = {export = true, variable = true}, ["module-key"] = {export = true, variable = true}, ["boolean?"] = {export = true, variable = true}, unstash = {export = true, variable = true}, add = {export = true, variable = true}, tl = {export = true, variable = true}, split = {export = true, variable = true}, cat = {export = true, variable = true}, hd = {export = true, variable = true}, inner = {export = true, variable = true}, ["id-count"] = {variable = true}, shift = {variable = true}, ["read-file"] = {export = true, variable = true}, setenv = {export = true, variable = true}, code = {export = true, variable = true}, reduce = {export = true, variable = true}, ["toplevel?"] = {export = true, variable = true}, ["is?"] = {export = true, variable = true}, space = {export = true, variable = true}, iterate = {export = true, variable = true}, [">"] = {export = true, variable = true}, ["string?"] = {export = true, variable = true}, ["make-id"] = {export = true, variable = true}, sort = {export = true, variable = true}, ["%message-handler"] = {export = true, variable = true}, string = {export = true, variable = true}, ["<"] = {export = true, variable = true}, last = {export = true, variable = true}, drop = {export = true, variable = true}, today = {export = true, variable = true}, exit = {export = true, variable = true}, ["write-file"] = {export = true, variable = true}, keep = {export = true, variable = true}, char = {export = true, variable = true}, ["some?"] = {export = true, variable = true}, substring = {export = true, variable = true}, search = {export = true, variable = true}, ["-"] = {export = true, variable = true}, ["="] = {export = true, variable = true}, ["/"] = {export = true, variable = true}, ["*"] = {export = true, variable = true}, ["nil?"] = {export = true, variable = true}, now = {export = true, variable = true}, ["+"] = {export = true, variable = true}, ["table?"] = {export = true, variable = true}, ["%"] = {export = true, variable = true}, stash = {export = true, variable = true}, join = {export = true, variable = true}, ["keys?"] = {export = true, variable = true}, ["number?"] = {export = true, variable = true}, sub = {export = true, variable = true}, ["one?"] = {export = true, variable = true}}, import = {{"lumen", "special"}, {"lumen", "core"}}}, lumen = {export = {}, import = {{"lumen", "special"}}, alias = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}}}, ["lumen/compiler"] = {export = {["compile-atom"] = {variable = true}, ["compiler-output"] = {variable = true}, ["lower-short"] = {variable = true}, ["parenthesize-call?"] = {variable = true}, ["in-module"] = {export = true, variable = true}, ["compile-special"] = {variable = true}, lower = {variable = true}, ["open-module"] = {export = true, variable = true}, ["compile-infix"] = {variable = true}, ["compile-file"] = {variable = true}, ["compile-call"] = {variable = true}, ["module-path"] = {variable = true}, ["lower-while"] = {variable = true}, encapsulate = {variable = true}, conclude = {variable = true}, reimported = {variable = true}, ["lower-for"] = {variable = true}, terminator = {variable = true}, ["%result"] = {export = true, global = true}, precedence = {variable = true}, process = {variable = true}, ["infix?"] = {variable = true}, declare = {export = true, variable = true}, ["%compile-module"] = {variable = true}, ["lower-infix"] = {variable = true}, ["compiling?"] = {variable = true}, ["import-modules"] = {export = true, variable = true}, ["lower-body"] = {variable = true}, ["lower-special"] = {variable = true}, ["compile-module"] = {export = true, variable = true}, compile = {export = true, variable = true}, ["compile-function"] = {export = true, variable = true}, run = {variable = true}, ["lower-if"] = {variable = true}, ["lower-infix?"] = {variable = true}, ["current-module"] = {export = true, global = true}, ["lower-definition"] = {variable = true}, ["load-module"] = {export = true, variable = true}, ["op-delims"] = {variable = true}, eval = {export = true, variable = true}, ["lower-function"] = {variable = true}, ["compile-args"] = {variable = true}, ["lower-call"] = {variable = true}, ["unary?"] = {variable = true}, ["lower-try"] = {variable = true}, ["lower-do"] = {variable = true}, ["lower-statement"] = {variable = true}, ["can-return?"] = {variable = true}, getop = {variable = true}, infix = {variable = true}}, import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}, {"lumen", "lib"}, {"lumen", "reader"}}}, ["lumen/special"] = {export = {["while"] = {tr = true, export = true, special = function (cond, form)
    local _g754 = compile(cond)
    indent_level = indent_level + 1
    local _g755 = compile(form, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local body = _g755
    local ind = indentation()
    if target == "js" then
      return(ind .. "while (" .. _g754 .. ") {\n" .. body .. ind .. "}\n")
    else
      return(ind .. "while " .. _g754 .. " do\n" .. body .. ind .. "end\n")
    end
  end, stmt = true, foo = true}, ["break"] = {export = true, special = function ()
    return(indentation() .. "break")
  end, foo = true, stmt = true}, error = {export = true, special = function (x)
    local _g783
    if target == "js" then
      _g783 = "throw new " .. compile({"Error", x})
    else
      _g783 = "error(" .. compile(x) .. ")"
    end
    local e = _g783
    return(indentation() .. e)
  end, foo = true, stmt = true}, ["%for"] = {tr = true, export = true, special = function (t, k, form)
    local _g756 = compile(t)
    local ind = indentation()
    indent_level = indent_level + 1
    local _g757 = compile(form, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local body = _g757
    if target == "lua" then
      return(ind .. "for " .. k .. " in next, " .. _g756 .. " do\n" .. body .. ind .. "end\n")
    else
      return(ind .. "for (" .. k .. " in " .. _g756 .. ") {\n" .. body .. ind .. "}\n")
    end
  end, stmt = true, foo = true}, ["%object"] = {export = true, special = function (...)
    local forms = unstash({...})
    local str = "{"
    local _g784
    if target == "lua" then
      _g784 = " = "
    else
      _g784 = ": "
    end
    local sep = _g784
    local pairs = pair(forms)
    local n_1 = length(pairs) - 1
    local _g758 = pairs
    local i = 0
    while i < length(_g758) do
      local _g759 = _g758[i + 1]
      local k = _g759[1]
      local v = _g759[2]
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
  end, foo = true}, ["%function"] = {export = true, special = function (args, body)
    return(compile_function(args, body))
  end, foo = true}, ["%array"] = {export = true, special = function (...)
    local forms = unstash({...})
    local _g785
    if target == "lua" then
      _g785 = "{"
    else
      _g785 = "["
    end
    local open = _g785
    local _g786
    if target == "lua" then
      _g786 = "}"
    else
      _g786 = "]"
    end
    local close = _g786
    local str = ""
    local _g760 = forms
    local i = 0
    while i < length(_g760) do
      local x = _g760[i + 1]
      str = str .. compile(x)
      if i < length(forms) - 1 then
        str = str .. ", "
      end
      i = i + 1
    end
    return(open .. str .. close)
  end, foo = true}, get = {export = true, special = function (t, k)
    local _g761 = compile(t)
    local k1 = compile(k)
    if target == "lua" and char(_g761, 0) == "{" then
      _g761 = "(" .. _g761 .. ")"
    end
    if string_literal63(k) and valid_id63(inner(k)) then
      return(_g761 .. "." .. inner(k))
    else
      return(_g761 .. "[" .. k1 .. "]")
    end
  end, foo = true}, ["%if"] = {tr = true, export = true, special = function (cond, cons, alt)
    local _g762 = compile(cond)
    indent_level = indent_level + 1
    local _g764 = compile(cons, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local _g763 = _g764
    local _g787
    if alt then
      indent_level = indent_level + 1
      local _g766 = compile(alt, {_stash = true, stmt = true})
      indent_level = indent_level - 1
      _g787 = _g766
    end
    local _g765 = _g787
    local ind = indentation()
    local str = ""
    if target == "js" then
      str = str .. ind .. "if (" .. _g762 .. ") {\n" .. _g763 .. ind .. "}"
    else
      str = str .. ind .. "if " .. _g762 .. " then\n" .. _g763
    end
    if _g765 and target == "js" then
      str = str .. " else {\n" .. _g765 .. ind .. "}"
    else
      if _g765 then
        str = str .. ind .. "else\n" .. _g765
      end
    end
    if target == "lua" then
      return(str .. ind .. "end\n")
    else
      return(str .. "\n")
    end
  end, stmt = true, foo = true}, ["%try"] = {tr = true, export = true, special = function (form)
    local ind = indentation()
    indent_level = indent_level + 1
    local _g767 = compile(form, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local body = _g767
    local e = make_id()
    local hf = {"return", {"%array", false, {"get", e, "\"message\""}}}
    indent_level = indent_level + 1
    local _g768 = compile(hf, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local h = _g768
    return(ind .. "try {\n" .. body .. ind .. "}\n" .. ind .. "catch (" .. e .. ") {\n" .. h .. ind .. "}\n")
  end, stmt = true, foo = true}, ["not"] = {}, ["return"] = {export = true, special = function (x)
    local _g788
    if nil63(x) then
      _g788 = "return"
    else
      _g788 = "return(" .. compile(x) .. ")"
    end
    local _g769 = _g788
    return(indentation() .. _g769)
  end, foo = true, stmt = true}, ["do"] = {tr = true, export = true, special = function (...)
    local forms = unstash({...})
    local str = ""
    local _g770 = forms
    local _g771 = 0
    while _g771 < length(_g770) do
      local x = _g770[_g771 + 1]
      str = str .. compile(x, {_stash = true, stmt = true})
      _g771 = _g771 + 1
    end
    return(str)
  end, stmt = true, foo = true}, ["%local"] = {export = true, special = function (name, value)
    local id = compile(name)
    local value1 = compile(value)
    local _g789
    if is63(value) then
      _g789 = " = " .. value1
    else
      _g789 = ""
    end
    local rh = _g789
    local _g790
    if target == "js" then
      _g790 = "var "
    else
      _g790 = "local "
    end
    local keyword = _g790
    local ind = indentation()
    return(ind .. keyword .. id .. rh)
  end, foo = true, stmt = true}, set = {export = true, special = function (lh, rh)
    local _g772 = compile(lh)
    local _g791
    if nil63(rh) then
      _g791 = "nil"
    else
      _g791 = rh
    end
    local _g773 = compile(_g791)
    return(indentation() .. _g772 .. " = " .. _g773)
  end, foo = true, stmt = true}, ["%global-function"] = {tr = true, export = true, special = function (name, args, body)
    if target == "lua" then
      local x = compile_function(args, body, {_stash = true, name = name})
      return(indentation() .. x)
    else
      return(compile({"set", name, {"%function", args, body}}, {_stash = true, stmt = true}))
    end
  end, stmt = true, foo = true}, ["%local-function"] = {tr = true, export = true, special = function (name, args, body)
    local x = compile_function(args, body, {_stash = true, name = name, prefix = "local "})
    return(indentation() .. x)
  end, stmt = true, foo = true}}, import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}, {"lumen", "lib"}, {"lumen", "compiler"}}}, ["lumen/boot"] = {export = {["%initial-modules"] = {macro = function ()
    return(quote_modules())
  end}, ["%initial-environment"] = {macro = function ()
    return(quote_environment(initial_environment()))
  end}, modules = {export = true, global = true}}, import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}, {"lumen", "lib"}, {"lumen", "compiler"}}}, ["lumen/reader"] = {export = {["flag?"] = {variable = true}, ["read-from-string"] = {export = true, variable = true}, ["key?"] = {variable = true}, eof = {variable = true}, whitespace = {variable = true}, delimiters = {variable = true}, ["read-char"] = {variable = true}, ["peek-char"] = {variable = true}, read = {export = true, variable = true}, ["skip-non-code"] = {variable = true}, ["make-stream"] = {export = true, variable = true}, ["define-reader"] = {export = true, macro = function (_g774, ...)
    local char = _g774[1]
    local stream = _g774[2]
    local body = unstash({...})
    local _g775 = sub(body, 0)
    return({"set", {"get", "read-table", char}, join({"fn", {stream}}, _g775)})
  end}, ["read-all"] = {export = true, variable = true}, ["read-table"] = {export = true, variable = true}}, import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}}}, ["lumen/lib"] = {export = {macroexpand = {export = true, variable = true}, ["bind*"] = {export = true, variable = true}, ["quote-module"] = {variable = true}, ["with-indent"] = {export = true, macro = function (form)
    local result = make_id()
    return({"do", {"inc", "indent-level"}, {"let", {result, form}, {"dec", "indent-level"}, result}})
  end}, ["valid-code?"] = {variable = true}, ["can-unquote?"] = {variable = true}, key = {export = true, variable = true}, quasiexpand = {export = true, variable = true}, ["macro?"] = {export = true, variable = true}, ["numeric?"] = {variable = true}, id = {export = true, variable = true}, ["variable?"] = {export = true, variable = true}, ["special-form?"] = {export = true, variable = true}, ["statement?"] = {export = true, variable = true}, ["quote-environment"] = {export = true, variable = true}, ["quasiquoting?"] = {variable = true}, ["global?"] = {variable = true}, link = {export = true, variable = true}, getenv = {export = true, variable = true}, ["symbol-expansion"] = {export = true, variable = true}, ["special?"] = {export = true, variable = true}, ["symbol?"] = {export = true, variable = true}, reserved = {variable = true}, ["quote-frame"] = {variable = true}, ["quote-binding"] = {variable = true}, indentation = {export = true, variable = true}, ["stash*"] = {export = true, variable = true}, ["reserved?"] = {export = true, variable = true}, ["quasiquote-list"] = {variable = true}, extend = {variable = true}, ["indent-level"] = {export = true, global = true}, exclude = {variable = true}, imported = {export = true, variable = true}, literal = {variable = true}, bind = {export = true, variable = true}, ["quoting?"] = {variable = true}, ["quasisplice?"] = {variable = true}, escape = {variable = true}, ["initial-environment"] = {export = true, variable = true}, quoted = {export = true, variable = true}, ["quote-modules"] = {export = true, variable = true}, mapo = {export = true, variable = true}, ["bound?"] = {export = true, variable = true}, ["macro-function"] = {export = true, variable = true}, ["valid-id?"] = {export = true, variable = true}}, import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}}}}
  environment = {{["define-module"] = {export = true, macro = function (spec, ...)
    local body = unstash({...})
    local _g776 = sub(body, 0)
    local exp = _g776.export
    local imp = _g776.import
    local alias = _g776.alias
    local _g777 = import_modules(imp)
    local imports = _g777[1]
    local bindings = _g777[2]
    local k = module_key(spec)
    modules[k] = {export = {}, import = imports, alias = alias}
    local _g778 = exp or {}
    local _g779 = 0
    while _g779 < length(_g778) do
      local x = _g778[_g779 + 1]
      setenv(x, {_stash = true, export = true})
      _g779 = _g779 + 1
    end
    return(join({"do", {"set", {"get", "nexus", {"quote", k}}, {"table"}}}, bindings))
  end}}}
end)();
(function ()
  nexus.user = {}
  local _g792 = nexus["lumen/runtime"]
  local replicate = _g792.replicate
  local apply = _g792.apply
  local reverse = _g792.reverse
  local _6261 = _g792[">="]
  local find = _g792.find
  local _6061 = _g792["<="]
  local list63 = _g792["list?"]
  local module = _g792.module
  local pair = _g792.pair
  local composite63 = _g792["composite?"]
  local number = _g792.number
  local none63 = _g792["none?"]
  local empty63 = _g792["empty?"]
  local string_literal63 = _g792["string-literal?"]
  local id_literal63 = _g792["id-literal?"]
  local map = _g792.map
  local length = _g792.length
  local in63 = _g792["in?"]
  local function63 = _g792["function?"]
  local atom63 = _g792["atom?"]
  local write = _g792.write
  local module_key = _g792["module-key"]
  local boolean63 = _g792["boolean?"]
  local unstash = _g792.unstash
  local add = _g792.add
  local tl = _g792.tl
  local split = _g792.split
  local cat = _g792.cat
  local hd = _g792.hd
  local inner = _g792.inner
  local read_file = _g792["read-file"]
  local setenv = _g792.setenv
  local code = _g792.code
  local reduce = _g792.reduce
  local toplevel63 = _g792["toplevel?"]
  local is63 = _g792["is?"]
  local space = _g792.space
  local iterate = _g792.iterate
  local _62 = _g792[">"]
  local string63 = _g792["string?"]
  local make_id = _g792["make-id"]
  local sort = _g792.sort
  local _37message_handler = _g792["%message-handler"]
  local string = _g792.string
  local _60 = _g792["<"]
  local last = _g792.last
  local drop = _g792.drop
  local today = _g792.today
  local exit = _g792.exit
  local write_file = _g792["write-file"]
  local keep = _g792.keep
  local char = _g792.char
  local some63 = _g792["some?"]
  local substring = _g792.substring
  local search = _g792.search
  local _ = _g792["-"]
  local _61 = _g792["="]
  local _47 = _g792["/"]
  local _42 = _g792["*"]
  local nil63 = _g792["nil?"]
  local now = _g792.now
  local _43 = _g792["+"]
  local table63 = _g792["table?"]
  local _37 = _g792["%"]
  local stash = _g792.stash
  local join = _g792.join
  local keys63 = _g792["keys?"]
  local number63 = _g792["number?"]
  local sub = _g792.sub
  local one63 = _g792["one?"]
end)();
(function ()
  nexus["lumen/main"] = {}
  local _g2 = nexus["lumen/runtime"]
  local sort = _g2.sort
  local apply = _g2.apply
  local reverse = _g2.reverse
  local _6261 = _g2[">="]
  local char = _g2.char
  local _6061 = _g2["<="]
  local list63 = _g2["list?"]
  local module = _g2.module
  local keys63 = _g2["keys?"]
  local composite63 = _g2["composite?"]
  local number = _g2.number
  local none63 = _g2["none?"]
  local empty63 = _g2["empty?"]
  local string_literal63 = _g2["string-literal?"]
  local id_literal63 = _g2["id-literal?"]
  local map = _g2.map
  local drop = _g2.drop
  local number63 = _g2["number?"]
  local atom63 = _g2["atom?"]
  local write = _g2.write
  local module_key = _g2["module-key"]
  local string = _g2.string
  local unstash = _g2.unstash
  local make_id = _g2["make-id"]
  local tl = _g2.tl
  local split = _g2.split
  local cat = _g2.cat
  local hd = _g2.hd
  local inner = _g2.inner
  local _62 = _g2[">"]
  local _47 = _g2["/"]
  local read_file = _g2["read-file"]
  local find = _g2.find
  local code = _g2.code
  local reduce = _g2.reduce
  local some63 = _g2["some?"]
  local is63 = _g2["is?"]
  local write_file = _g2["write-file"]
  local iterate = _g2.iterate
  local toplevel63 = _g2["toplevel?"]
  local string63 = _g2["string?"]
  local function63 = _g2["function?"]
  local _61 = _g2["="]
  local _37message_handler = _g2["%message-handler"]
  local in63 = _g2["in?"]
  local _60 = _g2["<"]
  local add = _g2.add
  local replicate = _g2.replicate
  local sub = _g2.sub
  local exit = _g2.exit
  local space = _g2.space
  local keep = _g2.keep
  local pair = _g2.pair
  local length = _g2.length
  local boolean63 = _g2["boolean?"]
  local search = _g2.search
  local _ = _g2["-"]
  local substring = _g2.substring
  local last = _g2.last
  local _42 = _g2["*"]
  local nil63 = _g2["nil?"]
  local now = _g2.now
  local _43 = _g2["+"]
  local table63 = _g2["table?"]
  local _37 = _g2["%"]
  local today = _g2.today
  local join = _g2.join
  local stash = _g2.stash
  local setenv = _g2.setenv
  local one63 = _g2["one?"]
  local _g5 = nexus["lumen/reader"]
  local read_from_string = _g5["read-from-string"]
  local read_all = _g5["read-all"]
  local read = _g5.read
  local make_stream = _g5["make-stream"]
  local read_table = _g5["read-table"]
  local _g6 = nexus["lumen/compiler"]
  local in_module = _g6["in-module"]
  local open_module = _g6["open-module"]
  local eval = _g6.eval
  local declare = _g6.declare
  local import_modules = _g6["import-modules"]
  local compile_module = _g6["compile-module"]
  local compile = _g6.compile
  local compile_function = _g6["compile-function"]
  local load_module = _g6["load-module"]
  local function rep(str)
    local _g796,_g797 = xpcall(function ()
      return(eval(read_from_string(str)))
    end, _37message_handler)
    local _g795 = {_g796, _g797}
    local _g1 = _g795[1]
    local x = _g795[2]
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
    local _g798 = args
    local i = 0
    while i < length(_g798) do
      local arg = _g798[i + 1]
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
