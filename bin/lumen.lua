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
      local _g62
      if nil63(from) or from < 0 then
        _g62 = 0
      else
        _g62 = from
      end
      local i = _g62
      local n = length(x)
      local _g63
      if nil63(upto) or upto > n then
        _g63 = n
      else
        _g63 = upto
      end
      local _g26 = _g63
      while i < _g26 do
        l[j + 1] = x[i + 1]
        i = i + 1
        j = j + 1
      end
      local _g27 = x
      local k = nil
      for k in next, _g27 do
        local v = _g27[k]
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
    local _g64
    if n then
      _g64 = n + 1
    end
    return(string.byte(str, _g64))
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
      local _g29 = a
      local k = nil
      for k in next, _g29 do
        local v = _g29[k]
        c[k] = v
      end
      local _g31 = b
      local k = nil
      for k in next, _g31 do
        local v = _g31[k]
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
    local _g33 = x
    local k = nil
    for k in next, _g33 do
      local v = _g33[k]
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
    local _g35 = t
    local _g19 = nil
    for _g19 in next, _g35 do
      local y = _g35[_g19]
      if x == y then
        return(true)
      end
    end
  end
  nexus["lumen/runtime"]["in?"] = in63
  local function find(f, t)
    local _g37 = t
    local _g20 = nil
    for _g20 in next, _g37 do
      local x = _g37[_g20]
      local _g39 = f(x)
      if _g39 then
        return(_g39)
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
    local _g40 = x
    local k = nil
    for k in next, _g40 do
      local v = _g40[k]
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
    local _g42 = t
    local k = nil
    for k in next, _g42 do
      local _g21 = _g42[k]
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
    local _g44 = t
    local _g22 = nil
    for _g22 in next, _g44 do
      local _g23 = _g44[_g22]
      b = false
      break
    end
    return(b)
  end
  nexus["lumen/runtime"]["empty?"] = empty63
  local function stash(args)
    if keys63(args) then
      local p = {}
      local _g46 = args
      local k = nil
      for k in next, _g46 do
        local v = _g46[k]
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
        local _g48 = l
        local k = nil
        for k in next, _g48 do
          local v = _g48[k]
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
    local _g65
    if start then
      _g65 = start + 1
    end
    local _g50 = _g65
    local i = string.find(str, pattern, _g50, true)
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
    local _g51 = sub(xs, 0)
    if none63(_g51) then
      return("")
    else
      return(reduce(function (a, b)
        return(a .. b)
      end, _g51))
    end
  end
  nexus["lumen/runtime"].cat = cat
  local function _43(...)
    local xs = unstash({...})
    local _g52 = sub(xs, 0)
    return(reduce(function (a, b)
      return(a + b)
    end, _g52))
  end
  nexus["lumen/runtime"]["+"] = _43
  local function _(...)
    local xs = unstash({...})
    local _g53 = sub(xs, 0)
    return(reduce(function (b, a)
      return(a - b)
    end, reverse(_g53)))
  end
  nexus["lumen/runtime"]["-"] = _
  local function _42(...)
    local xs = unstash({...})
    local _g54 = sub(xs, 0)
    return(reduce(function (a, b)
      return(a * b)
    end, _g54))
  end
  nexus["lumen/runtime"]["*"] = _42
  local function _47(...)
    local xs = unstash({...})
    local _g55 = sub(xs, 0)
    return(reduce(function (b, a)
      return(a / b)
    end, reverse(_g55)))
  end
  nexus["lumen/runtime"]["/"] = _47
  local function _37(...)
    local xs = unstash({...})
    local _g56 = sub(xs, 0)
    return(reduce(function (b, a)
      return(a % b)
    end, reverse(_g56)))
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
            local _g57 = x
            local k = nil
            for k in next, _g57 do
              if not number63(k) then
                local v = _g57[k]
                add(x1, k .. ":")
                add(x1, v)
              end
            end
            local _g58 = x1
            local i = 0
            while i < length(_g58) do
              local y = _g58[i + 1]
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
    local _g59 = stash(args)
    return(f(unpack(_g59)))
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
    local _g60 = sub(keys, 0)
    if string63(k) then
      local frame = last(environment)
      local x = frame[k] or {}
      local _g61 = _g60
      local k1 = nil
      for k1 in next, _g61 do
        if not number63(k1) then
          local v = _g61[k1]
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
  local _g69 = nexus["lumen/runtime"]
  local nil63 = _g69["nil?"]
  local is63 = _g69["is?"]
  local length = _g69.length
  local none63 = _g69["none?"]
  local some63 = _g69["some?"]
  local one63 = _g69["one?"]
  local hd = _g69.hd
  local string63 = _g69["string?"]
  local number63 = _g69["number?"]
  local boolean63 = _g69["boolean?"]
  local function63 = _g69["function?"]
  local composite63 = _g69["composite?"]
  local atom63 = _g69["atom?"]
  local table63 = _g69["table?"]
  local list63 = _g69["list?"]
  local substring = _g69.substring
  local sub = _g69.sub
  local inner = _g69.inner
  local tl = _g69.tl
  local char = _g69.char
  local code = _g69.code
  local string_literal63 = _g69["string-literal?"]
  local id_literal63 = _g69["id-literal?"]
  local add = _g69.add
  local drop = _g69.drop
  local last = _g69.last
  local reverse = _g69.reverse
  local join = _g69.join
  local reduce = _g69.reduce
  local keep = _g69.keep
  local in63 = _g69["in?"]
  local find = _g69.find
  local pair = _g69.pair
  local sort = _g69.sort
  local iterate = _g69.iterate
  local replicate = _g69.replicate
  local series = _g69.series
  local map = _g69.map
  local keys63 = _g69["keys?"]
  local empty63 = _g69["empty?"]
  local stash = _g69.stash
  local unstash = _g69.unstash
  local search = _g69.search
  local split = _g69.split
  local cat = _g69.cat
  local _43 = _g69["+"]
  local _ = _g69["-"]
  local _42 = _g69["*"]
  local _47 = _g69["/"]
  local _37 = _g69["%"]
  local _62 = _g69[">"]
  local _60 = _g69["<"]
  local _61 = _g69["="]
  local _6261 = _g69[">="]
  local _6061 = _g69["<="]
  local read_file = _g69["read-file"]
  local write_file = _g69["write-file"]
  local write = _g69.write
  local exit = _g69.exit
  local today = _g69.today
  local now = _g69.now
  local number = _g69.number
  local string = _g69.string
  local space = _g69.space
  local apply = _g69.apply
  local make_id = _g69["make-id"]
  local _37message_handler = _g69["%message-handler"]
  local toplevel63 = _g69["toplevel?"]
  local module_key = _g69["module-key"]
  local module = _g69.module
  local setenv = _g69.setenv
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
      local _g107
      if c == "\n" then
        _g107 = "\\n"
      else
        local _g108
        if c == "\"" then
          _g108 = "\\\""
        else
          local _g109
          if c == "\\" then
            _g109 = "\\\\"
          else
            _g109 = c
          end
          _g108 = _g109
        end
        _g107 = _g108
      end
      local c1 = _g107
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
      local _g72 = args
      local k = nil
      for k in next, _g72 do
        if not number63(k) then
          local v = _g72[k]
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
        local _g73 = lh
        local i = 0
        while i < length(_g73) do
          local x = _g73[i + 1]
          bs = join(bs, bind(x, {"at", rh, i}))
          i = i + 1
        end
        if r then
          bs = join(bs, bind(r, {"sub", rh, length(lh)}))
        end
        local _g74 = lh
        local k = nil
        for k in next, _g74 do
          if not number63(k) then
            local v = _g74[k]
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
      local _g75 = args
      local _g76 = 0
      while _g76 < length(_g75) do
        local arg = _g75[_g76 + 1]
        if atom63(arg) then
          add(args1, arg)
        else
          if list63(arg) or keys63(arg) then
            local v = make_id()
            add(args1, v)
            bs = join(bs, {arg, v})
          end
        end
        _g76 = _g76 + 1
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
          local _g66 = form[1]
          local name = form[2]
          local value = form[3]
          return({"%local", name, macroexpand(value)})
        else
          if x == "%function" then
            local _g67 = form[1]
            local args = form[2]
            local body = sub(form, 2)
            add(environment, {_scope = true})
            local _g79 = args
            local _g80 = 0
            while _g80 < length(_g79) do
              local _g77 = _g79[_g80 + 1]
              setenv(_g77, {_stash = true, variable = true})
              _g80 = _g80 + 1
            end
            local _g78 = join({"%function", args}, macroexpand(body))
            drop(environment)
            return(_g78)
          else
            if x == "%local-function" or x == "%global-function" then
              local _g68 = form[1]
              local _g81 = form[2]
              local _g82 = form[3]
              local _g83 = sub(form, 3)
              add(environment, {_scope = true})
              local _g86 = _g82
              local _g87 = 0
              while _g87 < length(_g86) do
                local _g84 = _g86[_g87 + 1]
                setenv(_g84, {_stash = true, variable = true})
                _g87 = _g87 + 1
              end
              local _g85 = join({x, _g81, _g82}, macroexpand(_g83))
              drop(environment)
              return(_g85)
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
    local _g88 = form
    local k = nil
    for k in next, _g88 do
      if not number63(k) then
        local v = _g88[k]
        local _g110
        if quasisplice63(v, depth) then
          _g110 = quasiexpand(v[2])
        else
          _g110 = quasiexpand(v, depth)
        end
        local _g89 = _g110
        last(xs)[k] = _g89
      end
    end
    local _g90 = form
    local _g91 = 0
    while _g91 < length(_g90) do
      local x = _g90[_g91 + 1]
      if quasisplice63(x, depth) then
        local _g92 = quasiexpand(x[2])
        add(xs, _g92)
        add(xs, {"list"})
      else
        add(last(xs), quasiexpand(x, depth))
      end
      _g91 = _g91 + 1
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
      local _g111
      if c == "-" then
        _g111 = "_"
      else
        local _g112
        if valid_code63(n) then
          _g112 = c
        else
          local _g113
          if i == 0 then
            _g113 = "_" .. n
          else
            _g113 = n
          end
          _g112 = _g113
        end
        _g111 = _g112
      end
      local c1 = _g111
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
    local _g97 = unstash({...})
    local _g98 = _g97.all
    local m = make_id()
    local k = module_key(spec)
    local imports = {}
    if nexus[k] then
      local _g99 = module(spec).export
      local n = nil
      for n in next, _g99 do
        if not number63(n) then
          local b = _g99[n]
          if b.variable and (_g98 or b.export) then
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
    local _g100 = sub(xs, 0)
    return(join(t, _g100))
  end
  nexus["lumen/lib"].extend = extend
  local function exclude(t, ...)
    local keys = unstash({...})
    local _g101 = sub(keys, 0)
    local t1 = {}
    local _g102 = t
    local _g103 = 0
    while _g103 < length(_g102) do
      local x = _g102[_g103 + 1]
      add(t1, x)
      _g103 = _g103 + 1
    end
    local _g104 = t
    local k = nil
    for k in next, _g104 do
      if not number63(k) then
        local v = _g104[k]
        if not _g101[k] then
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
    local _g105 = t
    local k = nil
    for k in next, _g105 do
      if not number63(k) then
        local v = _g105[k]
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
    local _g106 = {"table"}
    _g106.import = quoted(m.import)
    _g106.alias = quoted(m.alias)
    _g106.export = quote_frame(m.export)
    return(_g106)
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
  local _g114 = nexus["lumen/runtime"]
  local nil63 = _g114["nil?"]
  local is63 = _g114["is?"]
  local length = _g114.length
  local none63 = _g114["none?"]
  local some63 = _g114["some?"]
  local one63 = _g114["one?"]
  local hd = _g114.hd
  local string63 = _g114["string?"]
  local number63 = _g114["number?"]
  local boolean63 = _g114["boolean?"]
  local function63 = _g114["function?"]
  local composite63 = _g114["composite?"]
  local atom63 = _g114["atom?"]
  local table63 = _g114["table?"]
  local list63 = _g114["list?"]
  local substring = _g114.substring
  local sub = _g114.sub
  local inner = _g114.inner
  local tl = _g114.tl
  local char = _g114.char
  local code = _g114.code
  local string_literal63 = _g114["string-literal?"]
  local id_literal63 = _g114["id-literal?"]
  local add = _g114.add
  local drop = _g114.drop
  local last = _g114.last
  local reverse = _g114.reverse
  local join = _g114.join
  local reduce = _g114.reduce
  local keep = _g114.keep
  local in63 = _g114["in?"]
  local find = _g114.find
  local pair = _g114.pair
  local sort = _g114.sort
  local iterate = _g114.iterate
  local replicate = _g114.replicate
  local series = _g114.series
  local map = _g114.map
  local keys63 = _g114["keys?"]
  local empty63 = _g114["empty?"]
  local stash = _g114.stash
  local unstash = _g114.unstash
  local search = _g114.search
  local split = _g114.split
  local cat = _g114.cat
  local _43 = _g114["+"]
  local _ = _g114["-"]
  local _42 = _g114["*"]
  local _47 = _g114["/"]
  local _37 = _g114["%"]
  local _62 = _g114[">"]
  local _60 = _g114["<"]
  local _61 = _g114["="]
  local _6261 = _g114[">="]
  local _6061 = _g114["<="]
  local read_file = _g114["read-file"]
  local write_file = _g114["write-file"]
  local write = _g114.write
  local exit = _g114.exit
  local today = _g114.today
  local now = _g114.now
  local number = _g114.number
  local string = _g114.string
  local space = _g114.space
  local apply = _g114.apply
  local make_id = _g114["make-id"]
  local _37message_handler = _g114["%message-handler"]
  local toplevel63 = _g114["toplevel?"]
  local module_key = _g114["module-key"]
  local module = _g114.module
  local setenv = _g114.setenv
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
  local _g125 = nexus["lumen/runtime"]
  local nil63 = _g125["nil?"]
  local is63 = _g125["is?"]
  local length = _g125.length
  local none63 = _g125["none?"]
  local some63 = _g125["some?"]
  local one63 = _g125["one?"]
  local hd = _g125.hd
  local string63 = _g125["string?"]
  local number63 = _g125["number?"]
  local boolean63 = _g125["boolean?"]
  local function63 = _g125["function?"]
  local composite63 = _g125["composite?"]
  local atom63 = _g125["atom?"]
  local table63 = _g125["table?"]
  local list63 = _g125["list?"]
  local substring = _g125.substring
  local sub = _g125.sub
  local inner = _g125.inner
  local tl = _g125.tl
  local char = _g125.char
  local code = _g125.code
  local string_literal63 = _g125["string-literal?"]
  local id_literal63 = _g125["id-literal?"]
  local add = _g125.add
  local drop = _g125.drop
  local last = _g125.last
  local reverse = _g125.reverse
  local join = _g125.join
  local reduce = _g125.reduce
  local keep = _g125.keep
  local in63 = _g125["in?"]
  local find = _g125.find
  local pair = _g125.pair
  local sort = _g125.sort
  local iterate = _g125.iterate
  local replicate = _g125.replicate
  local series = _g125.series
  local map = _g125.map
  local keys63 = _g125["keys?"]
  local empty63 = _g125["empty?"]
  local stash = _g125.stash
  local unstash = _g125.unstash
  local search = _g125.search
  local split = _g125.split
  local cat = _g125.cat
  local _43 = _g125["+"]
  local _ = _g125["-"]
  local _42 = _g125["*"]
  local _47 = _g125["/"]
  local _37 = _g125["%"]
  local _62 = _g125[">"]
  local _60 = _g125["<"]
  local _61 = _g125["="]
  local _6261 = _g125[">="]
  local _6061 = _g125["<="]
  local read_file = _g125["read-file"]
  local write_file = _g125["write-file"]
  local write = _g125.write
  local exit = _g125.exit
  local today = _g125.today
  local now = _g125.now
  local number = _g125.number
  local string = _g125.string
  local space = _g125.space
  local apply = _g125.apply
  local make_id = _g125["make-id"]
  local _37message_handler = _g125["%message-handler"]
  local toplevel63 = _g125["toplevel?"]
  local module_key = _g125["module-key"]
  local module = _g125.module
  local setenv = _g125.setenv
  local _g128 = nexus["lumen/lib"]
  local getenv = _g128.getenv
  local macro_function = _g128["macro-function"]
  local macro63 = _g128["macro?"]
  local special63 = _g128["special?"]
  local special_form63 = _g128["special-form?"]
  local statement63 = _g128["statement?"]
  local symbol_expansion = _g128["symbol-expansion"]
  local symbol63 = _g128["symbol?"]
  local variable63 = _g128["variable?"]
  local bound63 = _g128["bound?"]
  local quoted = _g128.quoted
  local stash42 = _g128["stash*"]
  local bind = _g128.bind
  local bind42 = _g128["bind*"]
  local quasiexpand = _g128.quasiexpand
  local macroexpand = _g128.macroexpand
  local indentation = _g128.indentation
  local reserved63 = _g128["reserved?"]
  local valid_id63 = _g128["valid-id?"]
  local id = _g128.id
  local key = _g128.key
  local imported = _g128.imported
  local link = _g128.link
  local mapo = _g128.mapo
  local quote_environment = _g128["quote-environment"]
  local quote_modules = _g128["quote-modules"]
  local initial_environment = _g128["initial-environment"]
  local _g129 = nexus["lumen/reader"]
  local make_stream = _g129["make-stream"]
  local read_table = _g129["read-table"]
  local read = _g129.read
  local read_all = _g129["read-all"]
  local read_from_string = _g129["read-from-string"]
  local _g133 = {}
  _g133.js = "!"
  _g133.lua = "not "
  local _g131 = {}
  local _g134 = {}
  _g134.js = "!"
  _g134.lua = "not "
  _g131["not"] = _g134
  local _g136 = {}
  _g136["*"] = true
  _g136["/"] = true
  _g136["%"] = true
  local _g138 = {}
  _g138["+"] = true
  _g138["-"] = true
  local _g142 = {}
  _g142.js = "+"
  _g142.lua = ".."
  local _g140 = {}
  local _g143 = {}
  _g143.js = "+"
  _g143.lua = ".."
  _g140.cat = _g143
  local _g145 = {}
  _g145["<"] = true
  _g145[">"] = true
  _g145["<="] = true
  _g145[">="] = true
  local _g149 = {}
  _g149.js = "==="
  _g149.lua = "=="
  local _g151 = {}
  _g151.js = "!="
  _g151.lua = "~="
  local _g147 = {}
  local _g152 = {}
  _g152.js = "==="
  _g152.lua = "=="
  _g147["="] = _g152
  local _g153 = {}
  _g153.js = "!="
  _g153.lua = "~="
  _g147["~="] = _g153
  local _g157 = {}
  _g157.js = "&&"
  _g157.lua = "and"
  local _g155 = {}
  local _g158 = {}
  _g158.js = "&&"
  _g158.lua = "and"
  _g155["and"] = _g158
  local _g162 = {}
  _g162.js = "||"
  _g162.lua = "or"
  local _g160 = {}
  local _g163 = {}
  _g163.js = "||"
  _g163.lua = "or"
  _g160["or"] = _g163
  local infix = {_g131, _g136, _g138, _g140, _g145, _g147, _g155, _g160}
  nexus["lumen/compiler"].infix = infix
  local function unary63(form)
    local op = form[1]
    local args = sub(form, 1)
    return(one63(args) and in63(op, {"not", "-"}))
  end
  nexus["lumen/compiler"]["unary?"] = unary63
  local function precedence(form)
    if list63(form) and not unary63(form) then
      local _g164 = infix
      local i = 0
      while i < length(_g164) do
        local level = _g164[i + 1]
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
    local _g165 = args
    local i = 0
    while i < length(_g165) do
      local arg = _g165[i + 1]
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
    local _g166 = getenv(x)
    local special = _g166.special
    local stmt = _g166.stmt
    local self_tr63 = _g166.tr
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
    local _g167 = unstash({...})
    local right = _g167.right
    local _g196
    if right then
      _g196 = _6261
    else
      _g196 = _62
    end
    if _g196(precedence(child), precedence(parent)) then
      return({"(", ")"})
    else
      return({"", ""})
    end
  end
  nexus["lumen/compiler"]["op-delims"] = op_delims
  local function compile_infix(form)
    local op = form[1]
    local _g168 = sub(form, 1)
    local a = _g168[1]
    local b = _g168[2]
    local _g169 = op_delims(form, a)
    local ao = _g169[1]
    local ac = _g169[2]
    local _g170 = op_delims(form, b, {_stash = true, right = true})
    local bo = _g170[1]
    local bc = _g170[2]
    local _g171 = compile(a)
    local _g172 = compile(b)
    local _g173 = getop(op)
    if unary63(form) then
      return(_g173 .. ao .. _g171 .. ac)
    else
      return(ao .. _g171 .. ac .. " " .. _g173 .. " " .. bo .. _g172 .. bc)
    end
  end
  nexus["lumen/compiler"]["compile-infix"] = compile_infix
  local function compile_function(args, body, ...)
    local _g174 = unstash({...})
    local name = _g174.name
    local prefix = _g174.prefix
    local _g197
    if name then
      _g197 = compile(name)
    else
      _g197 = ""
    end
    local id = _g197
    local _g175 = prefix or ""
    local _g176 = compile_args(args)
    indent_level = indent_level + 1
    local _g178 = compile(body, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local _g177 = _g178
    local ind = indentation()
    local _g198
    if target == "js" then
      _g198 = ""
    else
      _g198 = "end"
    end
    local tr = _g198
    if name then
      tr = tr .. "\n"
    end
    if target == "js" then
      return("function " .. id .. _g176 .. " {\n" .. _g177 .. ind .. "}" .. tr)
    else
      return(_g175 .. "function " .. id .. _g176 .. "\n" .. _g177 .. ind .. tr)
    end
  end
  nexus["lumen/compiler"]["compile-function"] = compile_function
  local function can_return63(form)
    return(is63(form) and (atom63(form) or not (hd(form) == "return") and not statement63(hd(form))))
  end
  nexus["lumen/compiler"]["can-return?"] = can_return63
  compile = function (form, ...)
    local _g179 = unstash({...})
    local stmt = _g179.stmt
    if nil63(form) then
      return("")
    else
      if special_form63(form) then
        return(compile_special(form, stmt))
      else
        local tr = terminator(stmt)
        local _g199
        if stmt then
          _g199 = indentation()
        else
          _g199 = ""
        end
        local ind = _g199
        local _g200
        if atom63(form) then
          _g200 = compile_atom(form)
        else
          local _g201
          if infix63(hd(form)) then
            _g201 = compile_infix(form)
          else
            _g201 = compile_call(form)
          end
          _g200 = _g201
        end
        local _g180 = _g200
        return(ind .. _g180 .. tr)
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
    local _g181 = sub(args, 0, length(args) - 1)
    local _g182 = 0
    while _g182 < length(_g181) do
      local x = _g181[_g182 + 1]
      add(hoist, lower(x, hoist, stmt63))
      _g182 = _g182 + 1
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
    local _g183 = args[2]
    local _g184 = args[3]
    if stmt63 or tail63 then
      local _g203
      if _g184 then
        _g203 = {lower_body({_g184}, tail63)}
      end
      return(add(hoist, join({"%if", lower(cond, hoist), lower_body({_g183}, tail63)}, _g203)))
    else
      local e = make_id()
      add(hoist, {"%local", e})
      local _g202
      if _g184 then
        _g202 = {lower({"set", e, _g184})}
      end
      add(hoist, join({"%if", lower(cond, hoist), lower({"set", e, _g183})}, _g202))
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
      local _g204
      if x == "and" then
        _g204 = {"%if", id, b, id}
      else
        _g204 = {"%if", id, id, b}
      end
      return(lower({"do", {"%local", id, a}, _g204}, hoist))
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
    local _g185 = args[2]
    local body = sub(args, 2)
    return(add(hoist, {kind, name, _g185, lower_body(body, true)}))
  end
  nexus["lumen/compiler"]["lower-definition"] = lower_definition
  local function lower_call(form, hoist)
    local _g186 = map(function (x)
      return(lower(x, hoist))
    end, form)
    if some63(_g186) then
      return(_g186)
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
    local _g187 = unstash({...})
    local _g188 = _g187.all
    local m = module(spec)
    local frame = last(environment)
    local _g189 = m.export
    local k = nil
    for k in next, _g189 do
      if not number63(k) then
        local v = _g189[k]
        if v.export or _g188 then
          frame[k] = v
        end
      end
    end
  end
  nexus["lumen/compiler"]["open-module"] = open_module
  local function load_module(spec, ...)
    local _g190 = unstash({...})
    local _g191 = _g190.all
    if not module(spec) then
      _37compile_module(spec)
    end
    return(open_module(spec, {_stash = true, all = _g191}))
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
    local _g192 = specs or {}
    local _g193 = 0
    while _g193 < length(_g192) do
      local spec = _g192[_g193 + 1]
      load_module(spec)
      local m = module(spec)
      if m.alias then
        local _g194 = import_modules(m.alias)
        local aliased = _g194[1]
        local bs = _g194[2]
        imports = join(imports, aliased)
        bindings = join(bindings, bs)
      else
        local _g195 = imported(spec)
        add(imports, spec)
        bindings = join(bindings, _g195)
      end
      _g193 = _g193 + 1
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
  local _g205 = nexus["lumen/runtime"]
  local nil63 = _g205["nil?"]
  local is63 = _g205["is?"]
  local length = _g205.length
  local none63 = _g205["none?"]
  local some63 = _g205["some?"]
  local one63 = _g205["one?"]
  local hd = _g205.hd
  local string63 = _g205["string?"]
  local number63 = _g205["number?"]
  local boolean63 = _g205["boolean?"]
  local function63 = _g205["function?"]
  local composite63 = _g205["composite?"]
  local atom63 = _g205["atom?"]
  local table63 = _g205["table?"]
  local list63 = _g205["list?"]
  local substring = _g205.substring
  local sub = _g205.sub
  local inner = _g205.inner
  local tl = _g205.tl
  local char = _g205.char
  local code = _g205.code
  local string_literal63 = _g205["string-literal?"]
  local id_literal63 = _g205["id-literal?"]
  local add = _g205.add
  local drop = _g205.drop
  local last = _g205.last
  local reverse = _g205.reverse
  local join = _g205.join
  local reduce = _g205.reduce
  local keep = _g205.keep
  local in63 = _g205["in?"]
  local find = _g205.find
  local pair = _g205.pair
  local sort = _g205.sort
  local iterate = _g205.iterate
  local replicate = _g205.replicate
  local series = _g205.series
  local map = _g205.map
  local keys63 = _g205["keys?"]
  local empty63 = _g205["empty?"]
  local stash = _g205.stash
  local unstash = _g205.unstash
  local search = _g205.search
  local split = _g205.split
  local cat = _g205.cat
  local _43 = _g205["+"]
  local _ = _g205["-"]
  local _42 = _g205["*"]
  local _47 = _g205["/"]
  local _37 = _g205["%"]
  local _62 = _g205[">"]
  local _60 = _g205["<"]
  local _61 = _g205["="]
  local _6261 = _g205[">="]
  local _6061 = _g205["<="]
  local read_file = _g205["read-file"]
  local write_file = _g205["write-file"]
  local write = _g205.write
  local exit = _g205.exit
  local today = _g205.today
  local now = _g205.now
  local number = _g205.number
  local string = _g205.string
  local space = _g205.space
  local apply = _g205.apply
  local make_id = _g205["make-id"]
  local _37message_handler = _g205["%message-handler"]
  local toplevel63 = _g205["toplevel?"]
  local module_key = _g205["module-key"]
  local module = _g205.module
  local setenv = _g205.setenv
  local _g208 = nexus["lumen/lib"]
  local getenv = _g208.getenv
  local macro_function = _g208["macro-function"]
  local macro63 = _g208["macro?"]
  local special63 = _g208["special?"]
  local special_form63 = _g208["special-form?"]
  local statement63 = _g208["statement?"]
  local symbol_expansion = _g208["symbol-expansion"]
  local symbol63 = _g208["symbol?"]
  local variable63 = _g208["variable?"]
  local bound63 = _g208["bound?"]
  local quoted = _g208.quoted
  local stash42 = _g208["stash*"]
  local bind = _g208.bind
  local bind42 = _g208["bind*"]
  local quasiexpand = _g208.quasiexpand
  local macroexpand = _g208.macroexpand
  local indentation = _g208.indentation
  local reserved63 = _g208["reserved?"]
  local valid_id63 = _g208["valid-id?"]
  local id = _g208.id
  local key = _g208.key
  local imported = _g208.imported
  local link = _g208.link
  local mapo = _g208.mapo
  local quote_environment = _g208["quote-environment"]
  local quote_modules = _g208["quote-modules"]
  local initial_environment = _g208["initial-environment"]
  local _g209 = nexus["lumen/compiler"]
  local compile_function = _g209["compile-function"]
  local compile = _g209.compile
  local open_module = _g209["open-module"]
  local load_module = _g209["load-module"]
  local in_module = _g209["in-module"]
  local import_modules = _g209["import-modules"]
  local compile_module = _g209["compile-module"]
  local declare = _g209.declare
  local eval = _g209.eval
end)();
(function ()
  nexus["lumen/core"] = {}
  local _g383 = nexus["lumen/runtime"]
  local nil63 = _g383["nil?"]
  local is63 = _g383["is?"]
  local length = _g383.length
  local none63 = _g383["none?"]
  local some63 = _g383["some?"]
  local one63 = _g383["one?"]
  local hd = _g383.hd
  local string63 = _g383["string?"]
  local number63 = _g383["number?"]
  local boolean63 = _g383["boolean?"]
  local function63 = _g383["function?"]
  local composite63 = _g383["composite?"]
  local atom63 = _g383["atom?"]
  local table63 = _g383["table?"]
  local list63 = _g383["list?"]
  local substring = _g383.substring
  local sub = _g383.sub
  local inner = _g383.inner
  local tl = _g383.tl
  local char = _g383.char
  local code = _g383.code
  local string_literal63 = _g383["string-literal?"]
  local id_literal63 = _g383["id-literal?"]
  local add = _g383.add
  local drop = _g383.drop
  local last = _g383.last
  local reverse = _g383.reverse
  local join = _g383.join
  local reduce = _g383.reduce
  local keep = _g383.keep
  local in63 = _g383["in?"]
  local find = _g383.find
  local pair = _g383.pair
  local sort = _g383.sort
  local iterate = _g383.iterate
  local replicate = _g383.replicate
  local series = _g383.series
  local map = _g383.map
  local keys63 = _g383["keys?"]
  local empty63 = _g383["empty?"]
  local stash = _g383.stash
  local unstash = _g383.unstash
  local search = _g383.search
  local split = _g383.split
  local cat = _g383.cat
  local _43 = _g383["+"]
  local _ = _g383["-"]
  local _42 = _g383["*"]
  local _47 = _g383["/"]
  local _37 = _g383["%"]
  local _62 = _g383[">"]
  local _60 = _g383["<"]
  local _61 = _g383["="]
  local _6261 = _g383[">="]
  local _6061 = _g383["<="]
  local read_file = _g383["read-file"]
  local write_file = _g383["write-file"]
  local write = _g383.write
  local exit = _g383.exit
  local today = _g383.today
  local now = _g383.now
  local number = _g383.number
  local string = _g383.string
  local space = _g383.space
  local apply = _g383.apply
  local make_id = _g383["make-id"]
  local _37message_handler = _g383["%message-handler"]
  local toplevel63 = _g383["toplevel?"]
  local module_key = _g383["module-key"]
  local module = _g383.module
  local setenv = _g383.setenv
  local _g386 = nexus["lumen/lib"]
  local getenv = _g386.getenv
  local macro_function = _g386["macro-function"]
  local macro63 = _g386["macro?"]
  local special63 = _g386["special?"]
  local special_form63 = _g386["special-form?"]
  local statement63 = _g386["statement?"]
  local symbol_expansion = _g386["symbol-expansion"]
  local symbol63 = _g386["symbol?"]
  local variable63 = _g386["variable?"]
  local bound63 = _g386["bound?"]
  local quoted = _g386.quoted
  local stash42 = _g386["stash*"]
  local bind = _g386.bind
  local bind42 = _g386["bind*"]
  local quasiexpand = _g386.quasiexpand
  local macroexpand = _g386.macroexpand
  local indentation = _g386.indentation
  local reserved63 = _g386["reserved?"]
  local valid_id63 = _g386["valid-id?"]
  local id = _g386.id
  local key = _g386.key
  local imported = _g386.imported
  local link = _g386.link
  local mapo = _g386.mapo
  local quote_environment = _g386["quote-environment"]
  local quote_modules = _g386["quote-modules"]
  local initial_environment = _g386["initial-environment"]
  local _g387 = nexus["lumen/compiler"]
  local compile_function = _g387["compile-function"]
  local compile = _g387.compile
  local open_module = _g387["open-module"]
  local load_module = _g387["load-module"]
  local in_module = _g387["in-module"]
  local import_modules = _g387["import-modules"]
  local compile_module = _g387["compile-module"]
  local declare = _g387.declare
  local eval = _g387.eval
  target = "lua"
end)();
(function ()
  nexus["lumen/boot"] = {}
  local _g696 = nexus["lumen/runtime"]
  local nil63 = _g696["nil?"]
  local is63 = _g696["is?"]
  local length = _g696.length
  local none63 = _g696["none?"]
  local some63 = _g696["some?"]
  local one63 = _g696["one?"]
  local hd = _g696.hd
  local string63 = _g696["string?"]
  local number63 = _g696["number?"]
  local boolean63 = _g696["boolean?"]
  local function63 = _g696["function?"]
  local composite63 = _g696["composite?"]
  local atom63 = _g696["atom?"]
  local table63 = _g696["table?"]
  local list63 = _g696["list?"]
  local substring = _g696.substring
  local sub = _g696.sub
  local inner = _g696.inner
  local tl = _g696.tl
  local char = _g696.char
  local code = _g696.code
  local string_literal63 = _g696["string-literal?"]
  local id_literal63 = _g696["id-literal?"]
  local add = _g696.add
  local drop = _g696.drop
  local last = _g696.last
  local reverse = _g696.reverse
  local join = _g696.join
  local reduce = _g696.reduce
  local keep = _g696.keep
  local in63 = _g696["in?"]
  local find = _g696.find
  local pair = _g696.pair
  local sort = _g696.sort
  local iterate = _g696.iterate
  local replicate = _g696.replicate
  local series = _g696.series
  local map = _g696.map
  local keys63 = _g696["keys?"]
  local empty63 = _g696["empty?"]
  local stash = _g696.stash
  local unstash = _g696.unstash
  local search = _g696.search
  local split = _g696.split
  local cat = _g696.cat
  local _43 = _g696["+"]
  local _ = _g696["-"]
  local _42 = _g696["*"]
  local _47 = _g696["/"]
  local _37 = _g696["%"]
  local _62 = _g696[">"]
  local _60 = _g696["<"]
  local _61 = _g696["="]
  local _6261 = _g696[">="]
  local _6061 = _g696["<="]
  local read_file = _g696["read-file"]
  local write_file = _g696["write-file"]
  local write = _g696.write
  local exit = _g696.exit
  local today = _g696.today
  local now = _g696.now
  local number = _g696.number
  local string = _g696.string
  local space = _g696.space
  local apply = _g696.apply
  local make_id = _g696["make-id"]
  local _37message_handler = _g696["%message-handler"]
  local toplevel63 = _g696["toplevel?"]
  local module_key = _g696["module-key"]
  local module = _g696.module
  local setenv = _g696.setenv
  local _g699 = nexus["lumen/lib"]
  local getenv = _g699.getenv
  local macro_function = _g699["macro-function"]
  local macro63 = _g699["macro?"]
  local special63 = _g699["special?"]
  local special_form63 = _g699["special-form?"]
  local statement63 = _g699["statement?"]
  local symbol_expansion = _g699["symbol-expansion"]
  local symbol63 = _g699["symbol?"]
  local variable63 = _g699["variable?"]
  local bound63 = _g699["bound?"]
  local quoted = _g699.quoted
  local stash42 = _g699["stash*"]
  local bind = _g699.bind
  local bind42 = _g699["bind*"]
  local quasiexpand = _g699.quasiexpand
  local macroexpand = _g699.macroexpand
  local indentation = _g699.indentation
  local reserved63 = _g699["reserved?"]
  local valid_id63 = _g699["valid-id?"]
  local id = _g699.id
  local key = _g699.key
  local imported = _g699.imported
  local link = _g699.link
  local mapo = _g699.mapo
  local quote_environment = _g699["quote-environment"]
  local quote_modules = _g699["quote-modules"]
  local initial_environment = _g699["initial-environment"]
  local _g700 = nexus["lumen/compiler"]
  local compile_function = _g700["compile-function"]
  local compile = _g700.compile
  local open_module = _g700["open-module"]
  local load_module = _g700["load-module"]
  local in_module = _g700["in-module"]
  local import_modules = _g700["import-modules"]
  local compile_module = _g700["compile-module"]
  local declare = _g700.declare
  local eval = _g700.eval
  modules = {["lumen/system"] = {import = {{"lumen", "special"}, {"lumen", "core"}}, export = {nexus = {export = true, global = true}}}, user = {import = {"lumen", {"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}}, export = {}}, ["lumen/compiler"] = {import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}, {"lumen", "lib"}, {"lumen", "reader"}}, export = {["compile-function"] = {export = true, variable = true}, compile = {export = true, variable = true}, ["open-module"] = {export = true, variable = true}, ["load-module"] = {export = true, variable = true}, ["in-module"] = {export = true, variable = true}, ["import-modules"] = {export = true, variable = true}, ["compile-module"] = {export = true, variable = true}, declare = {export = true, variable = true}, eval = {export = true, variable = true}, infix = {variable = true}, ["unary?"] = {variable = true}, precedence = {variable = true}, getop = {variable = true}, ["infix?"] = {variable = true}, ["compile-args"] = {variable = true}, ["compile-atom"] = {variable = true}, terminator = {variable = true}, ["compile-special"] = {variable = true}, ["parenthesize-call?"] = {variable = true}, ["compile-call"] = {variable = true}, ["op-delims"] = {variable = true}, ["compile-infix"] = {variable = true}, ["can-return?"] = {variable = true}, lower = {variable = true}, ["lower-statement"] = {variable = true}, ["lower-body"] = {variable = true}, ["lower-do"] = {variable = true}, ["lower-if"] = {variable = true}, ["lower-short"] = {variable = true}, ["lower-try"] = {variable = true}, ["lower-while"] = {variable = true}, ["lower-for"] = {variable = true}, ["lower-function"] = {variable = true}, ["lower-definition"] = {variable = true}, ["lower-call"] = {variable = true}, ["lower-infix?"] = {variable = true}, ["lower-infix"] = {variable = true}, ["lower-special"] = {variable = true}, process = {variable = true}, ["current-module"] = {global = true, export = true}, ["module-path"] = {variable = true}, encapsulate = {variable = true}, ["compile-file"] = {variable = true}, run = {variable = true}, ["compiling?"] = {variable = true}, ["compiler-output"] = {variable = true}, conclude = {variable = true}, ["%compile-module"] = {variable = true}, reimported = {variable = true}, ["%result"] = {global = true, export = true}}}, ["lumen/runtime"] = {import = {{"lumen", "special"}, {"lumen", "core"}}, export = {["nil?"] = {export = true, variable = true}, ["is?"] = {export = true, variable = true}, length = {export = true, variable = true}, ["none?"] = {export = true, variable = true}, ["some?"] = {export = true, variable = true}, ["one?"] = {export = true, variable = true}, hd = {export = true, variable = true}, ["string?"] = {export = true, variable = true}, ["number?"] = {export = true, variable = true}, ["boolean?"] = {export = true, variable = true}, ["function?"] = {export = true, variable = true}, ["composite?"] = {export = true, variable = true}, ["atom?"] = {export = true, variable = true}, ["table?"] = {export = true, variable = true}, ["list?"] = {export = true, variable = true}, substring = {export = true, variable = true}, sub = {export = true, variable = true}, inner = {export = true, variable = true}, tl = {export = true, variable = true}, char = {export = true, variable = true}, code = {export = true, variable = true}, ["string-literal?"] = {export = true, variable = true}, ["id-literal?"] = {export = true, variable = true}, add = {export = true, variable = true}, drop = {export = true, variable = true}, last = {export = true, variable = true}, reverse = {export = true, variable = true}, join = {export = true, variable = true}, reduce = {export = true, variable = true}, keep = {export = true, variable = true}, ["in?"] = {export = true, variable = true}, find = {export = true, variable = true}, pair = {export = true, variable = true}, sort = {export = true, variable = true}, iterate = {export = true, variable = true}, replicate = {export = true, variable = true}, series = {export = true, variable = true}, map = {export = true, variable = true}, ["keys?"] = {export = true, variable = true}, ["empty?"] = {export = true, variable = true}, stash = {export = true, variable = true}, unstash = {export = true, variable = true}, search = {export = true, variable = true}, split = {export = true, variable = true}, cat = {export = true, variable = true}, ["+"] = {export = true, variable = true}, ["-"] = {export = true, variable = true}, ["*"] = {export = true, variable = true}, ["/"] = {export = true, variable = true}, ["%"] = {export = true, variable = true}, [">"] = {export = true, variable = true}, ["<"] = {export = true, variable = true}, ["="] = {export = true, variable = true}, [">="] = {export = true, variable = true}, ["<="] = {export = true, variable = true}, ["read-file"] = {export = true, variable = true}, ["write-file"] = {export = true, variable = true}, write = {export = true, variable = true}, exit = {export = true, variable = true}, today = {export = true, variable = true}, now = {export = true, variable = true}, number = {export = true, variable = true}, string = {export = true, variable = true}, space = {export = true, variable = true}, apply = {export = true, variable = true}, ["make-id"] = {export = true, variable = true}, ["%message-handler"] = {export = true, variable = true}, ["toplevel?"] = {export = true, variable = true}, ["module-key"] = {export = true, variable = true}, module = {export = true, variable = true}, setenv = {export = true, variable = true}, shift = {variable = true}, ["id-count"] = {variable = true}}}, ["lumen/boot"] = {import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}, {"lumen", "lib"}, {"lumen", "compiler"}}, export = {["%initial-environment"] = {macro = function ()
    return(quote_environment(initial_environment()))
  end}, ["%initial-modules"] = {macro = function ()
    return(quote_modules())
  end}, modules = {global = true, export = true}}}, ["lumen/main"] = {import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}, {"lumen", "reader"}, {"lumen", "compiler"}}, export = {}}, lumen = {import = {{"lumen", "special"}}, export = {}, alias = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}}}, ["lumen/lib"] = {import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}}, export = {getenv = {export = true, variable = true}, ["macro-function"] = {export = true, variable = true}, ["macro?"] = {export = true, variable = true}, ["special?"] = {export = true, variable = true}, ["special-form?"] = {export = true, variable = true}, ["statement?"] = {export = true, variable = true}, ["symbol-expansion"] = {export = true, variable = true}, ["symbol?"] = {export = true, variable = true}, ["variable?"] = {export = true, variable = true}, ["bound?"] = {export = true, variable = true}, quoted = {export = true, variable = true}, ["stash*"] = {export = true, variable = true}, bind = {export = true, variable = true}, ["bind*"] = {export = true, variable = true}, quasiexpand = {export = true, variable = true}, macroexpand = {export = true, variable = true}, indentation = {export = true, variable = true}, ["with-indent"] = {export = true, macro = function (form)
    local result = make_id()
    return({"do", {"inc", "indent-level"}, {"let", {result, form}, {"dec", "indent-level"}, result}})
  end}, ["reserved?"] = {export = true, variable = true}, ["valid-id?"] = {export = true, variable = true}, id = {export = true, variable = true}, key = {export = true, variable = true}, imported = {export = true, variable = true}, link = {export = true, variable = true}, mapo = {export = true, variable = true}, ["quote-environment"] = {export = true, variable = true}, ["quote-modules"] = {export = true, variable = true}, ["initial-environment"] = {export = true, variable = true}, ["global?"] = {variable = true}, escape = {variable = true}, literal = {variable = true}, ["quoting?"] = {variable = true}, ["quasiquoting?"] = {variable = true}, ["can-unquote?"] = {variable = true}, ["quasisplice?"] = {variable = true}, ["quasiquote-list"] = {variable = true}, ["indent-level"] = {global = true, export = true}, reserved = {variable = true}, ["numeric?"] = {variable = true}, ["valid-code?"] = {variable = true}, extend = {variable = true}, exclude = {variable = true}, ["quote-binding"] = {variable = true}, ["quote-frame"] = {variable = true}, ["quote-module"] = {variable = true}}}, ["lumen/special"] = {import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}, {"lumen", "lib"}, {"lumen", "compiler"}}, export = {["do"] = {stmt = true, special = function (...)
    local forms = unstash({...})
    local str = ""
    local _g713 = forms
    local _g714 = 0
    while _g714 < length(_g713) do
      local x = _g713[_g714 + 1]
      str = str .. compile(x, {_stash = true, stmt = true})
      _g714 = _g714 + 1
    end
    return(str)
  end, export = true, foo = true, tr = true}, ["%if"] = {stmt = true, special = function (cond, cons, alt)
    local _g715 = compile(cond)
    indent_level = indent_level + 1
    local _g717 = compile(cons, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local _g716 = _g717
    local _g784
    if alt then
      indent_level = indent_level + 1
      local _g719 = compile(alt, {_stash = true, stmt = true})
      indent_level = indent_level - 1
      _g784 = _g719
    end
    local _g718 = _g784
    local ind = indentation()
    local str = ""
    if target == "js" then
      str = str .. ind .. "if (" .. _g715 .. ") {\n" .. _g716 .. ind .. "}"
    else
      str = str .. ind .. "if " .. _g715 .. " then\n" .. _g716
    end
    if _g718 and target == "js" then
      str = str .. " else {\n" .. _g718 .. ind .. "}"
    else
      if _g718 then
        str = str .. ind .. "else\n" .. _g718
      end
    end
    if target == "lua" then
      return(str .. ind .. "end\n")
    else
      return(str .. "\n")
    end
  end, export = true, foo = true, tr = true}, ["while"] = {stmt = true, special = function (cond, form)
    local _g720 = compile(cond)
    indent_level = indent_level + 1
    local _g721 = compile(form, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local body = _g721
    local ind = indentation()
    if target == "js" then
      return(ind .. "while (" .. _g720 .. ") {\n" .. body .. ind .. "}\n")
    else
      return(ind .. "while " .. _g720 .. " do\n" .. body .. ind .. "end\n")
    end
  end, export = true, foo = true, tr = true}, ["%for"] = {stmt = true, special = function (t, k, form)
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
  end, export = true, foo = true, tr = true}, ["%try"] = {stmt = true, special = function (form)
    local ind = indentation()
    indent_level = indent_level + 1
    local _g724 = compile(form, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local body = _g724
    local e = make_id()
    local hf = {"return", {"%array", false, {"get", e, "\"message\""}}}
    indent_level = indent_level + 1
    local _g725 = compile(hf, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local h = _g725
    return(ind .. "try {\n" .. body .. ind .. "}\n" .. ind .. "catch (" .. e .. ") {\n" .. h .. ind .. "}\n")
  end, export = true, foo = true, tr = true}, ["break"] = {special = function ()
    return(indentation() .. "break")
  end, stmt = true, export = true, foo = true}, ["%function"] = {special = function (args, body)
    return(compile_function(args, body))
  end, export = true, foo = true}, ["%global-function"] = {stmt = true, special = function (name, args, body)
    if target == "lua" then
      local x = compile_function(args, body, {_stash = true, name = name})
      return(indentation() .. x)
    else
      return(compile({"set", name, {"%function", args, body}}, {_stash = true, stmt = true}))
    end
  end, export = true, foo = true, tr = true}, ["%local-function"] = {stmt = true, special = function (name, args, body)
    local x = compile_function(args, body, {_stash = true, name = name, prefix = "local "})
    return(indentation() .. x)
  end, export = true, foo = true, tr = true}, ["return"] = {special = function (x)
    local _g785
    if nil63(x) then
      _g785 = "return"
    else
      _g785 = "return(" .. compile(x) .. ")"
    end
    local _g726 = _g785
    return(indentation() .. _g726)
  end, stmt = true, export = true, foo = true}, error = {special = function (x)
    local _g786
    if target == "js" then
      _g786 = "throw new " .. compile({"Error", x})
    else
      _g786 = "error(" .. compile(x) .. ")"
    end
    local e = _g786
    return(indentation() .. e)
  end, stmt = true, export = true, foo = true}, ["%local"] = {special = function (name, value)
    local id = compile(name)
    local value1 = compile(value)
    local _g787
    if is63(value) then
      _g787 = " = " .. value1
    else
      _g787 = ""
    end
    local rh = _g787
    local _g788
    if target == "js" then
      _g788 = "var "
    else
      _g788 = "local "
    end
    local keyword = _g788
    local ind = indentation()
    return(ind .. keyword .. id .. rh)
  end, stmt = true, export = true, foo = true}, set = {special = function (lh, rh)
    local _g727 = compile(lh)
    local _g789
    if nil63(rh) then
      _g789 = "nil"
    else
      _g789 = rh
    end
    local _g728 = compile(_g789)
    return(indentation() .. _g727 .. " = " .. _g728)
  end, stmt = true, export = true, foo = true}, get = {special = function (t, k)
    local _g729 = compile(t)
    local k1 = compile(k)
    if target == "lua" and char(_g729, 0) == "{" then
      _g729 = "(" .. _g729 .. ")"
    end
    if string_literal63(k) and valid_id63(inner(k)) then
      return(_g729 .. "." .. inner(k))
    else
      return(_g729 .. "[" .. k1 .. "]")
    end
  end, export = true, foo = true}, ["not"] = {}, ["%array"] = {special = function (...)
    local forms = unstash({...})
    local _g790
    if target == "lua" then
      _g790 = "{"
    else
      _g790 = "["
    end
    local open = _g790
    local _g791
    if target == "lua" then
      _g791 = "}"
    else
      _g791 = "]"
    end
    local close = _g791
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
  end, export = true, foo = true}, ["%object"] = {special = function (...)
    local forms = unstash({...})
    local str = "{"
    local _g792
    if target == "lua" then
      _g792 = " = "
    else
      _g792 = ": "
    end
    local sep = _g792
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
  end, export = true, foo = true}}}, ["lumen/reader"] = {import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}}, export = {["make-stream"] = {export = true, variable = true}, ["read-table"] = {export = true, variable = true}, ["define-reader"] = {export = true, macro = function (_g733, ...)
    local char = _g733[1]
    local stream = _g733[2]
    local body = unstash({...})
    local _g734 = sub(body, 0)
    return({"set", {"get", "read-table", char}, join({"fn", {stream}}, _g734)})
  end}, read = {export = true, variable = true}, ["read-all"] = {export = true, variable = true}, ["read-from-string"] = {export = true, variable = true}, delimiters = {variable = true}, whitespace = {variable = true}, ["peek-char"] = {variable = true}, ["read-char"] = {variable = true}, ["skip-non-code"] = {variable = true}, eof = {variable = true}, ["key?"] = {variable = true}, ["flag?"] = {variable = true}}}, ["lumen/core"] = {import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}, {"lumen", "lib"}, {"lumen", "compiler"}}, export = {quote = {export = true, macro = function (form)
    return(quoted(form))
  end}, quasiquote = {export = true, macro = function (form)
    return(quasiexpand(form, 1))
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
      local _g735 = body
      local k = nil
      for k in next, _g735 do
        if not number63(k) then
          local v = _g735[k]
          add(init, {"set", {"get", id, {"quote", k}}, v})
        end
      end
      return(join({"let", {id, l}}, join(init, {id})))
    end
  end}, ["if"] = {export = true, macro = function (...)
    local branches = unstash({...})
    local function step(_g736)
      local a = _g736[1]
      local b = _g736[2]
      local c = sub(_g736, 2)
      if is63(b) then
        return({join({"%if", a, b}, step(c))})
      else
        if is63(a) then
          return({a})
        end
      end
    end
    return(hd(step(branches)))
  end}, when = {export = true, macro = function (cond, ...)
    local body = unstash({...})
    local _g737 = sub(body, 0)
    return({"if", cond, join({"do"}, _g737)})
  end}, unless = {export = true, macro = function (cond, ...)
    local body = unstash({...})
    local _g738 = sub(body, 0)
    return({"if", {"not", cond}, join({"do"}, _g738)})
  end}, table = {export = true, macro = function (...)
    local body = unstash({...})
    return(join({"%object"}, mapo(function (x)
      return(x)
    end, body)))
  end}, let = {export = true, macro = function (bindings, ...)
    local body = unstash({...})
    local _g739 = sub(body, 0)
    if length(bindings) < 2 then
      return(join({"do"}, _g739))
    else
      local renames = {}
      local locals = {}
      local lh = bindings[1]
      local rh = bindings[2]
      local _g740 = bind(lh, rh)
      local _g741 = 0
      while _g741 < length(_g740) do
        local _g742 = _g740[_g741 + 1]
        local id = _g742[1]
        local val = _g742[2]
        if bound63(id) or reserved63(id) or toplevel63() then
          local id1 = make_id()
          add(renames, id)
          add(renames, id1)
          id = id1
        else
          setenv(id, {_stash = true, variable = true})
        end
        add(locals, {"%local", id, val})
        _g741 = _g741 + 1
      end
      return(join({"do"}, join(locals, {{"let-symbol", renames, join({"let", sub(bindings, 2)}, _g739)}})))
    end
  end}, ["define-module"] = {export = true, macro = function (spec, ...)
    local body = unstash({...})
    local _g743 = sub(body, 0)
    local imp = _g743.import
    local exp = _g743.export
    local alias = _g743.alias
    local _g744 = import_modules(imp)
    local imports = _g744[1]
    local bindings = _g744[2]
    local k = module_key(spec)
    modules[k] = {import = imports, export = {}, alias = alias}
    local _g745 = exp or {}
    local _g746 = 0
    while _g746 < length(_g745) do
      local x = _g745[_g746 + 1]
      setenv(x, {_stash = true, export = true})
      _g746 = _g746 + 1
    end
    return(join({"do", {"set", {"get", "nexus", {"quote", k}}, {"table"}}}, bindings))
  end}, ["define-macro"] = {export = true, macro = function (name, args, ...)
    local body = unstash({...})
    local _g747 = sub(body, 0)
    local form = join({"fn", args}, _g747)
    local _g748 = {"setenv", {"quote", name}}
    _g748.macro = form
    _g748.form = {"quote", form}
    eval(_g748)
    return(nil)
  end}, ["define-special"] = {export = true, macro = function (name, args, ...)
    local body = unstash({...})
    local _g749 = sub(body, 0)
    local form = join({"fn", args}, _g749)
    local keys = sub(_g749, length(_g749))
    local _g750 = {"setenv", {"quote", name}}
    _g750.special = form
    _g750.form = {"quote", form}
    eval(join(_g750, keys))
    return(nil)
  end}, ["define-symbol"] = {export = true, macro = function (name, expansion)
    setenv(name, {_stash = true, symbol = expansion})
    return(nil)
  end}, ["define*"] = {export = true, macro = function (name, x, ...)
    local body = unstash({...})
    local _g751 = sub(body, 0)
    setenv(name, {_stash = true, global = true, export = true})
    if some63(_g751) then
      local _g752 = bind42(x, _g751)
      local args = _g752[1]
      local _g753 = _g752[2]
      return(join({"%global-function", name, args}, _g753))
    else
      if target == "js" then
        return({"set", {"get", "global", {"quote", id(name)}}, x})
      else
        return({"set", name, x})
      end
    end
  end}, define = {export = true, macro = function (name, x, ...)
    local body = unstash({...})
    local _g754 = sub(body, 0)
    setenv(name, {_stash = true, variable = true})
    if some63(_g754) and target == "js" then
      return(link(name, {"%local", name, join({"fn", x}, _g754)}))
    else
      if some63(_g754) then
        local _g755 = bind42(x, _g754)
        local args = _g755[1]
        local _g756 = _g755[2]
        return(link(name, join({"%local-function", name, args}, _g756)))
      else
        return(link(name, {"%local", name, x}))
      end
    end
  end}, ["set*"] = {export = true, macro = function (name, value)
    return(link(name, {"set", name, value}))
  end}, ["with-bindings"] = {export = true, macro = function (_g757, ...)
    local names = _g757[1]
    local body = unstash({...})
    local _g758 = sub(body, 0)
    local x = make_id()
    local _g760 = {"setenv", x}
    _g760.variable = true
    local _g759 = {"with-frame", {"each", {x}, names, _g760}}
    _g759.scope = true
    return(join(_g759, _g758))
  end}, ["let-macro"] = {export = true, macro = function (definitions, ...)
    local body = unstash({...})
    local _g761 = sub(body, 0)
    add(environment, {})
    map(function (m)
      return(macroexpand(join({"define-macro"}, m)))
    end, definitions)
    local _g762 = join({"do"}, macroexpand(_g761))
    drop(environment)
    return(_g762)
  end}, ["let-symbol"] = {export = true, macro = function (expansions, ...)
    local body = unstash({...})
    local _g763 = sub(body, 0)
    add(environment, {})
    map(function (_g765)
      local name = _g765[1]
      local exp = _g765[2]
      return(macroexpand({"define-symbol", name, exp}))
    end, pair(expansions))
    local _g764 = join({"do"}, macroexpand(_g763))
    drop(environment)
    return(_g764)
  end}, fn = {export = true, macro = function (args, ...)
    local body = unstash({...})
    local _g766 = sub(body, 0)
    local _g767 = bind42(args, _g766)
    local _g768 = _g767[1]
    local _g769 = _g767[2]
    return(join({"%function", _g768}, _g769))
  end}, guard = {export = true, macro = function (expr)
    if target == "js" then
      return({{"fn", {}, {"%try", {"list", true, expr}}}})
    else
      local e = make_id()
      local x = make_id()
      local ex = "|" .. e .. "," .. x .. "|"
      return({"let", {ex, {"xpcall", {"fn", {}, expr}, "%message-handler"}}, {"list", e, x}})
    end
  end}, all = {export = true, macro = function (_g770, t, ...)
    local k = _g770[1]
    local v = _g770[2]
    local body = unstash({...})
    local _g771 = sub(body, 0)
    local x = make_id()
    local n = make_id()
    local _g793
    if target == "lua" then
      _g793 = _g771
    else
      _g793 = {join({"let", {n, {"parseInt", k}, k, {"if", {"isNaN", n}, k, n}}}, _g771)}
    end
    return({"let", {x, t, k, "nil"}, {"%for", x, k, join({"let", {v, {"get", x, k}}}, _g793)}})
  end}, each = {export = true, macro = function (b, t, ...)
    local body = unstash({...})
    local _g772 = sub(body, 0)
    local k = b[1]
    local v = b[2]
    local t1 = make_id()
    local _g794
    if nil63(v) then
      local _g795
      if b.i then
        _g795 = "i"
      else
        _g795 = make_id()
      end
      local i = _g795
      _g794 = {"let", {i, 0}, {"while", {"<", i, {"length", t1}}, join({"let", {k, {"at", t1, i}}}, _g772), {"inc", i}}}
    else
      local _g773 = {"target"}
      _g773.js = {"isNaN", {"parseInt", k}}
      _g773.lua = {"not", {"number?", k}}
      _g794 = {"let", {k, "nil"}, {"%for", t1, k, {"when", _g773, join({"let", {v, {"get", t1, k}}}, _g772)}}}
    end
    return({"let", {t1, t}, _g794})
  end}, ["set-of"] = {export = true, macro = function (...)
    local xs = unstash({...})
    local l = {}
    local _g774 = xs
    local _g775 = 0
    while _g775 < length(_g774) do
      local x = _g774[_g775 + 1]
      l[x] = true
      _g775 = _g775 + 1
    end
    return(join({"table"}, l))
  end}, language = {export = true, macro = function ()
    return({"quote", target})
  end}, target = {global = true, export = true, macro = function (...)
    local clauses = unstash({...})
    return(clauses[target])
  end}, ["join*"] = {export = true, macro = function (...)
    local xs = unstash({...})
    return(reduce(function (a, b)
      return({"join", a, b})
    end, xs))
  end}, ["join!"] = {export = true, macro = function (a, ...)
    local bs = unstash({...})
    local _g776 = sub(bs, 0)
    return({"set", a, join({"join*", a}, _g776)})
  end}, ["cat!"] = {export = true, macro = function (a, ...)
    local bs = unstash({...})
    local _g777 = sub(bs, 0)
    return({"set", a, join({"cat", a}, _g777)})
  end}, inc = {export = true, macro = function (n, by)
    return({"set", n, {"+", n, by or 1}})
  end}, dec = {export = true, macro = function (n, by)
    return({"set", n, {"-", n, by or 1}})
  end}, pr = {export = true, macro = function (...)
    local xs = unstash({...})
    return({"print", space(xs)})
  end}, ["with-frame"] = {export = true, macro = function (...)
    local body = unstash({...})
    local _g778 = sub(body, 0)
    local scope = body.scope
    local x = make_id()
    local _g779 = {"table"}
    _g779._scope = scope
    return({"do", {"add", "environment", _g779}, {"let", {x, join({"do"}, _g778)}, {"drop", "environment"}, x}})
  end}}}}
  environment = {{["define-module"] = {export = true, macro = function (spec, ...)
    local body = unstash({...})
    local _g780 = sub(body, 0)
    local imp = _g780.import
    local exp = _g780.export
    local alias = _g780.alias
    local _g781 = import_modules(imp)
    local imports = _g781[1]
    local bindings = _g781[2]
    local k = module_key(spec)
    modules[k] = {import = imports, export = {}, alias = alias}
    local _g782 = exp or {}
    local _g783 = 0
    while _g783 < length(_g782) do
      local x = _g782[_g783 + 1]
      setenv(x, {_stash = true, export = true})
      _g783 = _g783 + 1
    end
    return(join({"do", {"set", {"get", "nexus", {"quote", k}}, {"table"}}}, bindings))
  end}}}
end)();
(function ()
  nexus.user = {}
  local _g796 = nexus["lumen/runtime"]
  local nil63 = _g796["nil?"]
  local is63 = _g796["is?"]
  local length = _g796.length
  local none63 = _g796["none?"]
  local some63 = _g796["some?"]
  local one63 = _g796["one?"]
  local hd = _g796.hd
  local string63 = _g796["string?"]
  local number63 = _g796["number?"]
  local boolean63 = _g796["boolean?"]
  local function63 = _g796["function?"]
  local composite63 = _g796["composite?"]
  local atom63 = _g796["atom?"]
  local table63 = _g796["table?"]
  local list63 = _g796["list?"]
  local substring = _g796.substring
  local sub = _g796.sub
  local inner = _g796.inner
  local tl = _g796.tl
  local char = _g796.char
  local code = _g796.code
  local string_literal63 = _g796["string-literal?"]
  local id_literal63 = _g796["id-literal?"]
  local add = _g796.add
  local drop = _g796.drop
  local last = _g796.last
  local reverse = _g796.reverse
  local join = _g796.join
  local reduce = _g796.reduce
  local keep = _g796.keep
  local in63 = _g796["in?"]
  local find = _g796.find
  local pair = _g796.pair
  local sort = _g796.sort
  local iterate = _g796.iterate
  local replicate = _g796.replicate
  local series = _g796.series
  local map = _g796.map
  local keys63 = _g796["keys?"]
  local empty63 = _g796["empty?"]
  local stash = _g796.stash
  local unstash = _g796.unstash
  local search = _g796.search
  local split = _g796.split
  local cat = _g796.cat
  local _43 = _g796["+"]
  local _ = _g796["-"]
  local _42 = _g796["*"]
  local _47 = _g796["/"]
  local _37 = _g796["%"]
  local _62 = _g796[">"]
  local _60 = _g796["<"]
  local _61 = _g796["="]
  local _6261 = _g796[">="]
  local _6061 = _g796["<="]
  local read_file = _g796["read-file"]
  local write_file = _g796["write-file"]
  local write = _g796.write
  local exit = _g796.exit
  local today = _g796.today
  local now = _g796.now
  local number = _g796.number
  local string = _g796.string
  local space = _g796.space
  local apply = _g796.apply
  local make_id = _g796["make-id"]
  local _37message_handler = _g796["%message-handler"]
  local toplevel63 = _g796["toplevel?"]
  local module_key = _g796["module-key"]
  local module = _g796.module
  local setenv = _g796.setenv
end)();
(function ()
  nexus["lumen/main"] = {}
  local _g2 = nexus["lumen/runtime"]
  local read_file = _g2["read-file"]
  local find = _g2.find
  local empty63 = _g2["empty?"]
  local in63 = _g2["in?"]
  local today = _g2.today
  local sub = _g2.sub
  local _37message_handler = _g2["%message-handler"]
  local table63 = _g2["table?"]
  local id_literal63 = _g2["id-literal?"]
  local toplevel63 = _g2["toplevel?"]
  local make_id = _g2["make-id"]
  local unstash = _g2.unstash
  local join = _g2.join
  local keys63 = _g2["keys?"]
  local split = _g2.split
  local replicate = _g2.replicate
  local code = _g2.code
  local last = _g2.last
  local search = _g2.search
  local apply = _g2.apply
  local is63 = _g2["is?"]
  local now = _g2.now
  local list63 = _g2["list?"]
  local setenv = _g2.setenv
  local map = _g2.map
  local inner = _g2.inner
  local string_literal63 = _g2["string-literal?"]
  local pair = _g2.pair
  local reverse = _g2.reverse
  local sort = _g2.sort
  local _61 = _g2["="]
  local _62 = _g2[">"]
  local hd = _g2.hd
  local series = _g2.series
  local iterate = _g2.iterate
  local substring = _g2.substring
  local module = _g2.module
  local exit = _g2.exit
  local atom63 = _g2["atom?"]
  local _47 = _g2["/"]
  local module_key = _g2["module-key"]
  local _ = _g2["-"]
  local string63 = _g2["string?"]
  local number63 = _g2["number?"]
  local add = _g2.add
  local function63 = _g2["function?"]
  local _42 = _g2["*"]
  local drop = _g2.drop
  local space = _g2.space
  local _37 = _g2["%"]
  local string = _g2.string
  local keep = _g2.keep
  local number = _g2.number
  local write = _g2.write
  local reduce = _g2.reduce
  local some63 = _g2["some?"]
  local write_file = _g2["write-file"]
  local _6061 = _g2["<="]
  local stash = _g2.stash
  local composite63 = _g2["composite?"]
  local _6261 = _g2[">="]
  local length = _g2.length
  local nil63 = _g2["nil?"]
  local _60 = _g2["<"]
  local boolean63 = _g2["boolean?"]
  local _43 = _g2["+"]
  local cat = _g2.cat
  local tl = _g2.tl
  local char = _g2.char
  local one63 = _g2["one?"]
  local none63 = _g2["none?"]
  local _g5 = nexus["lumen/reader"]
  local make_stream = _g5["make-stream"]
  local read = _g5.read
  local read_from_string = _g5["read-from-string"]
  local read_all = _g5["read-all"]
  local read_table = _g5["read-table"]
  local _g6 = nexus["lumen/compiler"]
  local compile_module = _g6["compile-module"]
  local open_module = _g6["open-module"]
  local load_module = _g6["load-module"]
  local in_module = _g6["in-module"]
  local declare = _g6.declare
  local compile_function = _g6["compile-function"]
  local compile = _g6.compile
  local eval = _g6.eval
  local import_modules = _g6["import-modules"]
  local function rep(str)
    local _g800,_g801 = xpcall(function ()
      return(eval(read_from_string(str)))
    end, _37message_handler)
    local _g799 = {_g800, _g801}
    local _g1 = _g799[1]
    local x = _g799[2]
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
    local _g802 = args
    local i = 0
    while i < length(_g802) do
      local arg = _g802[i + 1]
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
