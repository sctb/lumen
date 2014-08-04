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
      local _g69
      if nil63(from) or from < 0 then
        _g69 = 0
      else
        _g69 = from
      end
      local i = _g69
      local n = length(x)
      local _g70
      if nil63(upto) or upto > n then
        _g70 = n
      else
        _g70 = upto
      end
      local _g27 = _g70
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
  local function keys(x)
    local t = {}
    local _g30 = x
    local k = nil
    for k in next, _g30 do
      local v = _g30[k]
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
    local _g71
    if n then
      _g71 = n + 1
    end
    return(string.byte(str, _g71))
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
      local _g32 = a
      local k = nil
      for k in next, _g32 do
        local v = _g32[k]
        c[k] = v
      end
      local _g34 = b
      local k = nil
      for k in next, _g34 do
        local v = _g34[k]
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
    local _g36 = x
    local k = nil
    for k in next, _g36 do
      local v = _g36[k]
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
    local _g38 = t
    local _g19 = nil
    for _g19 in next, _g38 do
      local y = _g38[_g19]
      if x == y then
        return(true)
      end
    end
  end
  nexus["lumen/runtime"]["in?"] = in63
  local function find(f, t)
    local _g40 = t
    local _g20 = nil
    for _g20 in next, _g40 do
      local x = _g40[_g20]
      local _g42 = f(x)
      if _g42 then
        return(_g42)
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
    local _g43 = x
    local k = nil
    for k in next, _g43 do
      local v = _g43[k]
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
    local _g45 = t
    local k = nil
    for k in next, _g45 do
      local _g21 = _g45[k]
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
    local _g47 = t
    local _g22 = nil
    for _g22 in next, _g47 do
      local _g23 = _g47[_g22]
      b = false
      break
    end
    return(b)
  end
  nexus["lumen/runtime"]["empty?"] = empty63
  local function stash(args)
    if keys63(args) then
      local p = {}
      local _g49 = args
      local k = nil
      for k in next, _g49 do
        local v = _g49[k]
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
        local _g51 = l
        local k = nil
        for k in next, _g51 do
          local v = _g51[k]
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
    local _g72
    if start then
      _g72 = start + 1
    end
    local _g53 = _g72
    local i = string.find(str, pattern, _g53, true)
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
    local _g54 = sub(xs, 0)
    if none63(_g54) then
      return("")
    else
      return(reduce(function (a, b)
        return(a .. b)
      end, _g54))
    end
  end
  nexus["lumen/runtime"].cat = cat
  local function _43(...)
    local xs = unstash({...})
    local _g55 = sub(xs, 0)
    return(reduce(function (a, b)
      return(a + b)
    end, _g55))
  end
  nexus["lumen/runtime"]["+"] = _43
  local function _(...)
    local xs = unstash({...})
    local _g56 = sub(xs, 0)
    return(reduce(function (b, a)
      return(a - b)
    end, reverse(_g56)))
  end
  nexus["lumen/runtime"]["-"] = _
  local function _42(...)
    local xs = unstash({...})
    local _g57 = sub(xs, 0)
    return(reduce(function (a, b)
      return(a * b)
    end, _g57))
  end
  nexus["lumen/runtime"]["*"] = _42
  local function _47(...)
    local xs = unstash({...})
    local _g58 = sub(xs, 0)
    return(reduce(function (b, a)
      return(a / b)
    end, reverse(_g58)))
  end
  nexus["lumen/runtime"]["/"] = _47
  local function _37(...)
    local xs = unstash({...})
    local _g59 = sub(xs, 0)
    return(reduce(function (b, a)
      return(a % b)
    end, reverse(_g59)))
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
            local _g60 = x
            local k = nil
            for k in next, _g60 do
              local v = _g60[k]
              if number63(k) then
                xs[k] = string(v)
              else
                add(ks, k .. ":")
                add(ks, string(v))
              end
            end
            local _g62 = join(xs, ks)
            local _g24 = nil
            for _g24 in next, _g62 do
              local v = _g62[_g24]
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
    local _g64 = stash(args)
    return(f(unpack(_g64)))
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
    local _g65 = sub(keys, 0)
    if string63(k) then
      local frame = last(environment)
      local x = frame[k] or {}
      local _g66 = _g65
      local _g68 = nil
      for _g68 in next, _g66 do
        local v = _g66[_g68]
        x[_g68] = v
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
  local _g76 = nexus["lumen/runtime"]
  local write_file = _g76["write-file"]
  local find = _g76.find
  local function63 = _g76["function?"]
  local hd = _g76.hd
  local char = _g76.char
  local _43 = _g76["+"]
  local _6061 = _g76["<="]
  local exit = _g76.exit
  local string_literal63 = _g76["string-literal?"]
  local number63 = _g76["number?"]
  local table63 = _g76["table?"]
  local space = _g76.space
  local map = _g76.map
  local keys = _g76.keys
  local _60 = _g76["<"]
  local _62 = _g76[">"]
  local one63 = _g76["one?"]
  local search = _g76.search
  local none63 = _g76["none?"]
  local toplevel63 = _g76["toplevel?"]
  local split = _g76.split
  local keys63 = _g76["keys?"]
  local last = _g76.last
  local join = _g76.join
  local some63 = _g76["some?"]
  local code = _g76.code
  local iterate = _g76.iterate
  local in63 = _g76["in?"]
  local _37message_handler = _g76["%message-handler"]
  local keep = _g76.keep
  local unstash = _g76.unstash
  local substring = _g76.substring
  local boolean63 = _g76["boolean?"]
  local tl = _g76.tl
  local sub = _g76.sub
  local sort = _g76.sort
  local module_key = _g76["module-key"]
  local is63 = _g76["is?"]
  local drop = _g76.drop
  local reduce = _g76.reduce
  local atom63 = _g76["atom?"]
  local number = _g76.number
  local apply = _g76.apply
  local setenv = _g76.setenv
  local pair = _g76.pair
  local module = _g76.module
  local list63 = _g76["list?"]
  local make_id = _g76["make-id"]
  local string = _g76.string
  local _47 = _g76["/"]
  local string63 = _g76["string?"]
  local now = _g76.now
  local read_file = _g76["read-file"]
  local today = _g76.today
  local write = _g76.write
  local length = _g76.length
  local id_literal63 = _g76["id-literal?"]
  local add = _g76.add
  local _42 = _g76["*"]
  local _6261 = _g76[">="]
  local _61 = _g76["="]
  local replicate = _g76.replicate
  local nil63 = _g76["nil?"]
  local series = _g76.series
  local _37 = _g76["%"]
  local _ = _g76["-"]
  local cat = _g76.cat
  local empty63 = _g76["empty?"]
  local reverse = _g76.reverse
  local stash = _g76.stash
  local inner = _g76.inner
  local composite63 = _g76["composite?"]
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
      local _g116
      if c == "\n" then
        _g116 = "\\n"
      else
        local _g117
        if c == "\"" then
          _g117 = "\\\""
        else
          local _g118
          if c == "\\" then
            _g118 = "\\\\"
          else
            _g118 = c
          end
          _g117 = _g118
        end
        _g116 = _g117
      end
      local c1 = _g116
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
      local _g79 = args
      local k = nil
      for k in next, _g79 do
        local v = _g79[k]
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
        local _g81 = lh
        local k = nil
        for k in next, _g81 do
          local v = _g81[k]
          local _g119
          if k == "rest" or k == "&" then
            _g119 = {"sub", rh, length(lh)}
          else
            _g119 = {"get", rh, {"quote", k}}
          end
          local x = _g119
          local _g120
          if v == true then
            _g120 = k
          else
            _g120 = v
          end
          local _g83 = _g120
          bs = join(bs, bind(_g83, x))
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
      local _g84 = args
      local k = nil
      for k in next, _g84 do
        local v = _g84[k]
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
          local _g73 = form[1]
          local name = form[2]
          local value = form[3]
          return({"%local", name, macroexpand(value)})
        else
          if x == "%function" then
            local _g74 = form[1]
            local args = form[2]
            local body = sub(form, 2)
            add(environment, {_scope = true})
            local _g88 = args
            local _g89 = 0
            while _g89 < length(_g88) do
              local _g86 = _g88[_g89 + 1]
              setenv(_g86, {_stash = true, variable = true})
              _g89 = _g89 + 1
            end
            local _g87 = join({"%function", args}, macroexpand(body))
            drop(environment)
            return(_g87)
          else
            if x == "%local-function" or x == "%global-function" then
              local _g75 = form[1]
              local _g90 = form[2]
              local _g91 = form[3]
              local _g92 = sub(form, 3)
              add(environment, {_scope = true})
              local _g95 = _g91
              local _g96 = 0
              while _g96 < length(_g95) do
                local _g93 = _g95[_g96 + 1]
                setenv(_g93, {_stash = true, variable = true})
                _g96 = _g96 + 1
              end
              local _g94 = join({x, _g90, _g91}, macroexpand(_g92))
              drop(environment)
              return(_g94)
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
    local _g97 = form
    local k = nil
    for k in next, _g97 do
      if not number63(k) then
        local v = _g97[k]
        local _g121
        if quasisplice63(v, depth) then
          _g121 = quasiexpand(v[2])
        else
          _g121 = quasiexpand(v, depth)
        end
        local _g98 = _g121
        last(xs)[k] = _g98
      end
    end
    local _g99 = form
    local _g100 = 0
    while _g100 < length(_g99) do
      local x = _g99[_g100 + 1]
      if quasisplice63(x, depth) then
        local _g101 = quasiexpand(x[2])
        add(xs, _g101)
        add(xs, {"list"})
      else
        add(last(xs), quasiexpand(x, depth))
      end
      _g100 = _g100 + 1
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
  local reserved = {["typeof"] = true, ["true"] = true, ["nil"] = true, ["this"] = true, ["try"] = true, ["or"] = true, ["in"] = true, ["*"] = true, ["finally"] = true, ["throw"] = true, ["else"] = true, ["with"] = true, ["repeat"] = true, ["void"] = true, ["<"] = true, ["=="] = true, [">"] = true, ["elseif"] = true, ["new"] = true, ["while"] = true, ["instanceof"] = true, ["local"] = true, ["var"] = true, ["switch"] = true, ["break"] = true, ["not"] = true, ["continue"] = true, ["function"] = true, ["-"] = true, ["for"] = true, ["catch"] = true, ["end"] = true, ["false"] = true, ["do"] = true, ["and"] = true, ["default"] = true, ["then"] = true, ["debugger"] = true, ["+"] = true, ["/"] = true, ["return"] = true, ["if"] = true, ["delete"] = true, ["until"] = true, ["case"] = true, [">="] = true, ["%"] = true, ["<="] = true, ["="] = true}
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
      local _g122
      if c == "-" then
        _g122 = "_"
      else
        local _g123
        if valid_code63(n) then
          _g123 = c
        else
          local _g124
          if i == 0 then
            _g124 = "_" .. n
          else
            _g124 = n
          end
          _g123 = _g124
        end
        _g122 = _g123
      end
      local c1 = _g122
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
    local _g106 = unstash({...})
    local _g107 = _g106.all
    local m = make_id()
    local k = module_key(spec)
    local imports = {}
    if nexus[k] then
      local _g108 = module(spec).export
      local n = nil
      for n in next, _g108 do
        if not number63(n) then
          local b = _g108[n]
          if b.variable and (_g107 or b.export) then
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
    local _g109 = sub(xs, 0)
    return(join(t, _g109))
  end
  nexus["lumen/lib"].extend = extend
  local function exclude(t, ...)
    local keys = unstash({...})
    local _g110 = sub(keys, 0)
    local t1 = {}
    local _g111 = t
    local _g112 = 0
    while _g112 < length(_g111) do
      local x = _g111[_g112 + 1]
      add(t1, x)
      _g112 = _g112 + 1
    end
    local _g113 = t
    local k = nil
    for k in next, _g113 do
      if not number63(k) then
        local v = _g113[k]
        if not _g110[k] then
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
    local _g114 = t
    local k = nil
    for k in next, _g114 do
      if not number63(k) then
        local v = _g114[k]
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
    local _g115 = {"table"}
    _g115.export = quote_frame(m.export)
    _g115.alias = quoted(m.alias)
    _g115.import = quoted(m.import)
    return(_g115)
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
  local _g125 = nexus["lumen/runtime"]
  local write_file = _g125["write-file"]
  local find = _g125.find
  local function63 = _g125["function?"]
  local hd = _g125.hd
  local char = _g125.char
  local _43 = _g125["+"]
  local _6061 = _g125["<="]
  local exit = _g125.exit
  local string_literal63 = _g125["string-literal?"]
  local number63 = _g125["number?"]
  local table63 = _g125["table?"]
  local space = _g125.space
  local map = _g125.map
  local keys = _g125.keys
  local _60 = _g125["<"]
  local _62 = _g125[">"]
  local one63 = _g125["one?"]
  local search = _g125.search
  local none63 = _g125["none?"]
  local toplevel63 = _g125["toplevel?"]
  local split = _g125.split
  local keys63 = _g125["keys?"]
  local last = _g125.last
  local join = _g125.join
  local some63 = _g125["some?"]
  local code = _g125.code
  local iterate = _g125.iterate
  local in63 = _g125["in?"]
  local _37message_handler = _g125["%message-handler"]
  local keep = _g125.keep
  local unstash = _g125.unstash
  local substring = _g125.substring
  local boolean63 = _g125["boolean?"]
  local tl = _g125.tl
  local sub = _g125.sub
  local sort = _g125.sort
  local module_key = _g125["module-key"]
  local is63 = _g125["is?"]
  local drop = _g125.drop
  local reduce = _g125.reduce
  local atom63 = _g125["atom?"]
  local number = _g125.number
  local apply = _g125.apply
  local setenv = _g125.setenv
  local pair = _g125.pair
  local module = _g125.module
  local list63 = _g125["list?"]
  local make_id = _g125["make-id"]
  local string = _g125.string
  local _47 = _g125["/"]
  local string63 = _g125["string?"]
  local now = _g125.now
  local read_file = _g125["read-file"]
  local today = _g125.today
  local write = _g125.write
  local length = _g125.length
  local id_literal63 = _g125["id-literal?"]
  local add = _g125.add
  local _42 = _g125["*"]
  local _6261 = _g125[">="]
  local _61 = _g125["="]
  local replicate = _g125.replicate
  local nil63 = _g125["nil?"]
  local series = _g125.series
  local _37 = _g125["%"]
  local _ = _g125["-"]
  local cat = _g125.cat
  local empty63 = _g125["empty?"]
  local reverse = _g125.reverse
  local stash = _g125.stash
  local inner = _g125.inner
  local composite63 = _g125["composite?"]
  local delimiters = {[")"] = true, ["("] = true, ["\n"] = true, [";"] = true}
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
  local _g136 = nexus["lumen/runtime"]
  local write_file = _g136["write-file"]
  local find = _g136.find
  local function63 = _g136["function?"]
  local hd = _g136.hd
  local char = _g136.char
  local _43 = _g136["+"]
  local _6061 = _g136["<="]
  local exit = _g136.exit
  local string_literal63 = _g136["string-literal?"]
  local number63 = _g136["number?"]
  local table63 = _g136["table?"]
  local space = _g136.space
  local map = _g136.map
  local keys = _g136.keys
  local _60 = _g136["<"]
  local _62 = _g136[">"]
  local one63 = _g136["one?"]
  local search = _g136.search
  local none63 = _g136["none?"]
  local toplevel63 = _g136["toplevel?"]
  local split = _g136.split
  local keys63 = _g136["keys?"]
  local last = _g136.last
  local join = _g136.join
  local some63 = _g136["some?"]
  local code = _g136.code
  local iterate = _g136.iterate
  local in63 = _g136["in?"]
  local _37message_handler = _g136["%message-handler"]
  local keep = _g136.keep
  local unstash = _g136.unstash
  local substring = _g136.substring
  local boolean63 = _g136["boolean?"]
  local tl = _g136.tl
  local sub = _g136.sub
  local sort = _g136.sort
  local module_key = _g136["module-key"]
  local is63 = _g136["is?"]
  local drop = _g136.drop
  local reduce = _g136.reduce
  local atom63 = _g136["atom?"]
  local number = _g136.number
  local apply = _g136.apply
  local setenv = _g136.setenv
  local pair = _g136.pair
  local module = _g136.module
  local list63 = _g136["list?"]
  local make_id = _g136["make-id"]
  local string = _g136.string
  local _47 = _g136["/"]
  local string63 = _g136["string?"]
  local now = _g136.now
  local read_file = _g136["read-file"]
  local today = _g136.today
  local write = _g136.write
  local length = _g136.length
  local id_literal63 = _g136["id-literal?"]
  local add = _g136.add
  local _42 = _g136["*"]
  local _6261 = _g136[">="]
  local _61 = _g136["="]
  local replicate = _g136.replicate
  local nil63 = _g136["nil?"]
  local series = _g136.series
  local _37 = _g136["%"]
  local _ = _g136["-"]
  local cat = _g136.cat
  local empty63 = _g136["empty?"]
  local reverse = _g136.reverse
  local stash = _g136.stash
  local inner = _g136.inner
  local composite63 = _g136["composite?"]
  local _g139 = nexus["lumen/lib"]
  local imported = _g139.imported
  local bind = _g139.bind
  local quote_modules = _g139["quote-modules"]
  local symbol63 = _g139["symbol?"]
  local quote_environment = _g139["quote-environment"]
  local link = _g139.link
  local key = _g139.key
  local getenv = _g139.getenv
  local reserved63 = _g139["reserved?"]
  local valid_id63 = _g139["valid-id?"]
  local stash42 = _g139["stash*"]
  local variable63 = _g139["variable?"]
  local special63 = _g139["special?"]
  local symbol_expansion = _g139["symbol-expansion"]
  local macroexpand = _g139.macroexpand
  local special_form63 = _g139["special-form?"]
  local statement63 = _g139["statement?"]
  local mapo = _g139.mapo
  local initial_environment = _g139["initial-environment"]
  local bind42 = _g139["bind*"]
  local quasiexpand = _g139.quasiexpand
  local id = _g139.id
  local macro63 = _g139["macro?"]
  local indentation = _g139.indentation
  local macro_function = _g139["macro-function"]
  local quoted = _g139.quoted
  local bound63 = _g139["bound?"]
  local _g140 = nexus["lumen/reader"]
  local make_stream = _g140["make-stream"]
  local read_all = _g140["read-all"]
  local read_from_string = _g140["read-from-string"]
  local read_table = _g140["read-table"]
  local read = _g140.read
  local _g144 = {}
  _g144.lua = "not "
  _g144.js = "!"
  local _g142 = {}
  local _g145 = {}
  _g145.lua = "not "
  _g145.js = "!"
  _g142["not"] = _g145
  local _g147 = {}
  _g147["%"] = true
  _g147["/"] = true
  _g147["*"] = true
  local _g149 = {}
  _g149["-"] = true
  _g149["+"] = true
  local _g153 = {}
  _g153.lua = ".."
  _g153.js = "+"
  local _g151 = {}
  local _g154 = {}
  _g154.lua = ".."
  _g154.js = "+"
  _g151.cat = _g154
  local _g156 = {}
  _g156["<="] = true
  _g156["<"] = true
  _g156[">="] = true
  _g156[">"] = true
  local _g160 = {}
  _g160.lua = "=="
  _g160.js = "==="
  local _g162 = {}
  _g162.lua = "~="
  _g162.js = "!="
  local _g158 = {}
  local _g163 = {}
  _g163.lua = "=="
  _g163.js = "==="
  _g158["="] = _g163
  local _g164 = {}
  _g164.lua = "~="
  _g164.js = "!="
  _g158["~="] = _g164
  local _g168 = {}
  _g168.lua = "and"
  _g168.js = "&&"
  local _g166 = {}
  local _g169 = {}
  _g169.lua = "and"
  _g169.js = "&&"
  _g166["and"] = _g169
  local _g173 = {}
  _g173.lua = "or"
  _g173.js = "||"
  local _g171 = {}
  local _g174 = {}
  _g174.lua = "or"
  _g174.js = "||"
  _g171["or"] = _g174
  local infix = {_g142, _g147, _g149, _g151, _g156, _g158, _g166, _g171}
  nexus["lumen/compiler"].infix = infix
  local function unary63(form)
    local op = form[1]
    local args = sub(form, 1)
    return(one63(args) and in63(op, {"not", "-"}))
  end
  nexus["lumen/compiler"]["unary?"] = unary63
  local function precedence(form)
    if list63(form) and not unary63(form) then
      local _g175 = infix
      local i = 0
      while i < length(_g175) do
        local level = _g175[i + 1]
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
    local _g176 = args
    local i = 0
    while i < length(_g176) do
      local arg = _g176[i + 1]
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
    local _g177 = getenv(x)
    local special = _g177.special
    local self_tr63 = _g177.tr
    local stmt = _g177.stmt
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
    local _g178 = unstash({...})
    local right = _g178.right
    local _g207
    if right then
      _g207 = _6261
    else
      _g207 = _62
    end
    if _g207(precedence(child), precedence(parent)) then
      return({"(", ")"})
    else
      return({"", ""})
    end
  end
  nexus["lumen/compiler"]["op-delims"] = op_delims
  local function compile_infix(form)
    local op = form[1]
    local _g179 = sub(form, 1)
    local a = _g179[1]
    local b = _g179[2]
    local _g180 = op_delims(form, a)
    local ao = _g180[1]
    local ac = _g180[2]
    local _g181 = op_delims(form, b, {_stash = true, right = true})
    local bo = _g181[1]
    local bc = _g181[2]
    local _g182 = compile(a)
    local _g183 = compile(b)
    local _g184 = getop(op)
    if unary63(form) then
      return(_g184 .. ao .. _g182 .. ac)
    else
      return(ao .. _g182 .. ac .. " " .. _g184 .. " " .. bo .. _g183 .. bc)
    end
  end
  nexus["lumen/compiler"]["compile-infix"] = compile_infix
  local function compile_function(args, body, ...)
    local _g185 = unstash({...})
    local name = _g185.name
    local prefix = _g185.prefix
    local _g208
    if name then
      _g208 = compile(name)
    else
      _g208 = ""
    end
    local id = _g208
    local _g186 = prefix or ""
    local _g187 = compile_args(args)
    indent_level = indent_level + 1
    local _g189 = compile(body, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local _g188 = _g189
    local ind = indentation()
    local _g209
    if target == "js" then
      _g209 = ""
    else
      _g209 = "end"
    end
    local tr = _g209
    if name then
      tr = tr .. "\n"
    end
    if target == "js" then
      return("function " .. id .. _g187 .. " {\n" .. _g188 .. ind .. "}" .. tr)
    else
      return(_g186 .. "function " .. id .. _g187 .. "\n" .. _g188 .. ind .. tr)
    end
  end
  nexus["lumen/compiler"]["compile-function"] = compile_function
  local function can_return63(form)
    return(is63(form) and (atom63(form) or not (hd(form) == "return") and not statement63(hd(form))))
  end
  nexus["lumen/compiler"]["can-return?"] = can_return63
  compile = function (form, ...)
    local _g190 = unstash({...})
    local stmt = _g190.stmt
    if nil63(form) then
      return("")
    else
      if special_form63(form) then
        return(compile_special(form, stmt))
      else
        local tr = terminator(stmt)
        local _g210
        if stmt then
          _g210 = indentation()
        else
          _g210 = ""
        end
        local ind = _g210
        local _g211
        if atom63(form) then
          _g211 = compile_atom(form)
        else
          local _g212
          if infix63(hd(form)) then
            _g212 = compile_infix(form)
          else
            _g212 = compile_call(form)
          end
          _g211 = _g212
        end
        local _g191 = _g211
        return(ind .. _g191 .. tr)
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
    local _g192 = sub(args, 0, length(args) - 1)
    local _g193 = 0
    while _g193 < length(_g192) do
      local x = _g192[_g193 + 1]
      add(hoist, lower(x, hoist, stmt63))
      _g193 = _g193 + 1
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
    local _g194 = args[2]
    local _g195 = args[3]
    if stmt63 or tail63 then
      local _g214
      if _g195 then
        _g214 = {lower_body({_g195}, tail63)}
      end
      return(add(hoist, join({"%if", lower(cond, hoist), lower_body({_g194}, tail63)}, _g214)))
    else
      local e = make_id()
      add(hoist, {"%local", e})
      local _g213
      if _g195 then
        _g213 = {lower({"set", e, _g195})}
      end
      add(hoist, join({"%if", lower(cond, hoist), lower({"set", e, _g194})}, _g213))
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
      local _g215
      if x == "and" then
        _g215 = {"%if", id, b, id}
      else
        _g215 = {"%if", id, id, b}
      end
      return(lower({"do", {"%local", id, a}, _g215}, hoist))
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
    local _g196 = args[2]
    local body = sub(args, 2)
    return(add(hoist, {kind, name, _g196, lower_body(body, true)}))
  end
  nexus["lumen/compiler"]["lower-definition"] = lower_definition
  local function lower_call(form, hoist)
    local _g197 = map(function (x)
      return(lower(x, hoist))
    end, form)
    if some63(_g197) then
      return(_g197)
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
    local _g198 = unstash({...})
    local _g199 = _g198.all
    local m = module(spec)
    local frame = last(environment)
    local _g200 = m.export
    local k = nil
    for k in next, _g200 do
      if not number63(k) then
        local v = _g200[k]
        if v.export or _g199 then
          frame[k] = v
        end
      end
    end
  end
  nexus["lumen/compiler"]["open-module"] = open_module
  local function load_module(spec, ...)
    local _g201 = unstash({...})
    local _g202 = _g201.all
    if not module(spec) then
      _37compile_module(spec)
    end
    return(open_module(spec, {_stash = true, all = _g202}))
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
    local _g203 = specs or {}
    local _g204 = 0
    while _g204 < length(_g203) do
      local spec = _g203[_g204 + 1]
      load_module(spec)
      local m = module(spec)
      if m.alias then
        local _g205 = import_modules(m.alias)
        local aliased = _g205[1]
        local bs = _g205[2]
        imports = join(imports, aliased)
        bindings = join(bindings, bs)
      else
        local _g206 = imported(spec)
        add(imports, spec)
        bindings = join(bindings, _g206)
      end
      _g204 = _g204 + 1
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
  local _g216 = nexus["lumen/runtime"]
  local write_file = _g216["write-file"]
  local find = _g216.find
  local function63 = _g216["function?"]
  local hd = _g216.hd
  local char = _g216.char
  local _43 = _g216["+"]
  local _6061 = _g216["<="]
  local exit = _g216.exit
  local string_literal63 = _g216["string-literal?"]
  local number63 = _g216["number?"]
  local table63 = _g216["table?"]
  local space = _g216.space
  local map = _g216.map
  local keys = _g216.keys
  local _60 = _g216["<"]
  local _62 = _g216[">"]
  local one63 = _g216["one?"]
  local search = _g216.search
  local none63 = _g216["none?"]
  local toplevel63 = _g216["toplevel?"]
  local split = _g216.split
  local keys63 = _g216["keys?"]
  local last = _g216.last
  local join = _g216.join
  local some63 = _g216["some?"]
  local code = _g216.code
  local iterate = _g216.iterate
  local in63 = _g216["in?"]
  local _37message_handler = _g216["%message-handler"]
  local keep = _g216.keep
  local unstash = _g216.unstash
  local substring = _g216.substring
  local boolean63 = _g216["boolean?"]
  local tl = _g216.tl
  local sub = _g216.sub
  local sort = _g216.sort
  local module_key = _g216["module-key"]
  local is63 = _g216["is?"]
  local drop = _g216.drop
  local reduce = _g216.reduce
  local atom63 = _g216["atom?"]
  local number = _g216.number
  local apply = _g216.apply
  local setenv = _g216.setenv
  local pair = _g216.pair
  local module = _g216.module
  local list63 = _g216["list?"]
  local make_id = _g216["make-id"]
  local string = _g216.string
  local _47 = _g216["/"]
  local string63 = _g216["string?"]
  local now = _g216.now
  local read_file = _g216["read-file"]
  local today = _g216.today
  local write = _g216.write
  local length = _g216.length
  local id_literal63 = _g216["id-literal?"]
  local add = _g216.add
  local _42 = _g216["*"]
  local _6261 = _g216[">="]
  local _61 = _g216["="]
  local replicate = _g216.replicate
  local nil63 = _g216["nil?"]
  local series = _g216.series
  local _37 = _g216["%"]
  local _ = _g216["-"]
  local cat = _g216.cat
  local empty63 = _g216["empty?"]
  local reverse = _g216.reverse
  local stash = _g216.stash
  local inner = _g216.inner
  local composite63 = _g216["composite?"]
  local _g219 = nexus["lumen/lib"]
  local imported = _g219.imported
  local bind = _g219.bind
  local quote_modules = _g219["quote-modules"]
  local symbol63 = _g219["symbol?"]
  local quote_environment = _g219["quote-environment"]
  local link = _g219.link
  local key = _g219.key
  local getenv = _g219.getenv
  local reserved63 = _g219["reserved?"]
  local valid_id63 = _g219["valid-id?"]
  local stash42 = _g219["stash*"]
  local variable63 = _g219["variable?"]
  local special63 = _g219["special?"]
  local symbol_expansion = _g219["symbol-expansion"]
  local macroexpand = _g219.macroexpand
  local special_form63 = _g219["special-form?"]
  local statement63 = _g219["statement?"]
  local mapo = _g219.mapo
  local initial_environment = _g219["initial-environment"]
  local bind42 = _g219["bind*"]
  local quasiexpand = _g219.quasiexpand
  local id = _g219.id
  local macro63 = _g219["macro?"]
  local indentation = _g219.indentation
  local macro_function = _g219["macro-function"]
  local quoted = _g219.quoted
  local bound63 = _g219["bound?"]
  local _g220 = nexus["lumen/compiler"]
  local in_module = _g220["in-module"]
  local compile = _g220.compile
  local declare = _g220.declare
  local import_modules = _g220["import-modules"]
  local eval = _g220.eval
  local compile_module = _g220["compile-module"]
  local open_module = _g220["open-module"]
  local compile_function = _g220["compile-function"]
  local load_module = _g220["load-module"]
end)();
(function ()
  nexus["lumen/core"] = {}
  local _g394 = nexus["lumen/runtime"]
  local write_file = _g394["write-file"]
  local find = _g394.find
  local function63 = _g394["function?"]
  local hd = _g394.hd
  local char = _g394.char
  local _43 = _g394["+"]
  local _6061 = _g394["<="]
  local exit = _g394.exit
  local string_literal63 = _g394["string-literal?"]
  local number63 = _g394["number?"]
  local table63 = _g394["table?"]
  local space = _g394.space
  local map = _g394.map
  local keys = _g394.keys
  local _60 = _g394["<"]
  local _62 = _g394[">"]
  local one63 = _g394["one?"]
  local search = _g394.search
  local none63 = _g394["none?"]
  local toplevel63 = _g394["toplevel?"]
  local split = _g394.split
  local keys63 = _g394["keys?"]
  local last = _g394.last
  local join = _g394.join
  local some63 = _g394["some?"]
  local code = _g394.code
  local iterate = _g394.iterate
  local in63 = _g394["in?"]
  local _37message_handler = _g394["%message-handler"]
  local keep = _g394.keep
  local unstash = _g394.unstash
  local substring = _g394.substring
  local boolean63 = _g394["boolean?"]
  local tl = _g394.tl
  local sub = _g394.sub
  local sort = _g394.sort
  local module_key = _g394["module-key"]
  local is63 = _g394["is?"]
  local drop = _g394.drop
  local reduce = _g394.reduce
  local atom63 = _g394["atom?"]
  local number = _g394.number
  local apply = _g394.apply
  local setenv = _g394.setenv
  local pair = _g394.pair
  local module = _g394.module
  local list63 = _g394["list?"]
  local make_id = _g394["make-id"]
  local string = _g394.string
  local _47 = _g394["/"]
  local string63 = _g394["string?"]
  local now = _g394.now
  local read_file = _g394["read-file"]
  local today = _g394.today
  local write = _g394.write
  local length = _g394.length
  local id_literal63 = _g394["id-literal?"]
  local add = _g394.add
  local _42 = _g394["*"]
  local _6261 = _g394[">="]
  local _61 = _g394["="]
  local replicate = _g394.replicate
  local nil63 = _g394["nil?"]
  local series = _g394.series
  local _37 = _g394["%"]
  local _ = _g394["-"]
  local cat = _g394.cat
  local empty63 = _g394["empty?"]
  local reverse = _g394.reverse
  local stash = _g394.stash
  local inner = _g394.inner
  local composite63 = _g394["composite?"]
  local _g397 = nexus["lumen/lib"]
  local imported = _g397.imported
  local bind = _g397.bind
  local quote_modules = _g397["quote-modules"]
  local symbol63 = _g397["symbol?"]
  local quote_environment = _g397["quote-environment"]
  local link = _g397.link
  local key = _g397.key
  local getenv = _g397.getenv
  local reserved63 = _g397["reserved?"]
  local valid_id63 = _g397["valid-id?"]
  local stash42 = _g397["stash*"]
  local variable63 = _g397["variable?"]
  local special63 = _g397["special?"]
  local symbol_expansion = _g397["symbol-expansion"]
  local macroexpand = _g397.macroexpand
  local special_form63 = _g397["special-form?"]
  local statement63 = _g397["statement?"]
  local mapo = _g397.mapo
  local initial_environment = _g397["initial-environment"]
  local bind42 = _g397["bind*"]
  local quasiexpand = _g397.quasiexpand
  local id = _g397.id
  local macro63 = _g397["macro?"]
  local indentation = _g397.indentation
  local macro_function = _g397["macro-function"]
  local quoted = _g397.quoted
  local bound63 = _g397["bound?"]
  local _g398 = nexus["lumen/compiler"]
  local in_module = _g398["in-module"]
  local compile = _g398.compile
  local declare = _g398.declare
  local import_modules = _g398["import-modules"]
  local eval = _g398.eval
  local compile_module = _g398["compile-module"]
  local open_module = _g398["open-module"]
  local compile_function = _g398["compile-function"]
  local load_module = _g398["load-module"]
  target = "lua"
end)();
(function ()
  nexus["lumen/boot"] = {}
  local _g707 = nexus["lumen/runtime"]
  local write_file = _g707["write-file"]
  local find = _g707.find
  local function63 = _g707["function?"]
  local hd = _g707.hd
  local char = _g707.char
  local _43 = _g707["+"]
  local _6061 = _g707["<="]
  local exit = _g707.exit
  local string_literal63 = _g707["string-literal?"]
  local number63 = _g707["number?"]
  local table63 = _g707["table?"]
  local space = _g707.space
  local map = _g707.map
  local keys = _g707.keys
  local _60 = _g707["<"]
  local _62 = _g707[">"]
  local one63 = _g707["one?"]
  local search = _g707.search
  local none63 = _g707["none?"]
  local toplevel63 = _g707["toplevel?"]
  local split = _g707.split
  local keys63 = _g707["keys?"]
  local last = _g707.last
  local join = _g707.join
  local some63 = _g707["some?"]
  local code = _g707.code
  local iterate = _g707.iterate
  local in63 = _g707["in?"]
  local _37message_handler = _g707["%message-handler"]
  local keep = _g707.keep
  local unstash = _g707.unstash
  local substring = _g707.substring
  local boolean63 = _g707["boolean?"]
  local tl = _g707.tl
  local sub = _g707.sub
  local sort = _g707.sort
  local module_key = _g707["module-key"]
  local is63 = _g707["is?"]
  local drop = _g707.drop
  local reduce = _g707.reduce
  local atom63 = _g707["atom?"]
  local number = _g707.number
  local apply = _g707.apply
  local setenv = _g707.setenv
  local pair = _g707.pair
  local module = _g707.module
  local list63 = _g707["list?"]
  local make_id = _g707["make-id"]
  local string = _g707.string
  local _47 = _g707["/"]
  local string63 = _g707["string?"]
  local now = _g707.now
  local read_file = _g707["read-file"]
  local today = _g707.today
  local write = _g707.write
  local length = _g707.length
  local id_literal63 = _g707["id-literal?"]
  local add = _g707.add
  local _42 = _g707["*"]
  local _6261 = _g707[">="]
  local _61 = _g707["="]
  local replicate = _g707.replicate
  local nil63 = _g707["nil?"]
  local series = _g707.series
  local _37 = _g707["%"]
  local _ = _g707["-"]
  local cat = _g707.cat
  local empty63 = _g707["empty?"]
  local reverse = _g707.reverse
  local stash = _g707.stash
  local inner = _g707.inner
  local composite63 = _g707["composite?"]
  local _g710 = nexus["lumen/lib"]
  local imported = _g710.imported
  local bind = _g710.bind
  local quote_modules = _g710["quote-modules"]
  local symbol63 = _g710["symbol?"]
  local quote_environment = _g710["quote-environment"]
  local link = _g710.link
  local key = _g710.key
  local getenv = _g710.getenv
  local reserved63 = _g710["reserved?"]
  local valid_id63 = _g710["valid-id?"]
  local stash42 = _g710["stash*"]
  local variable63 = _g710["variable?"]
  local special63 = _g710["special?"]
  local symbol_expansion = _g710["symbol-expansion"]
  local macroexpand = _g710.macroexpand
  local special_form63 = _g710["special-form?"]
  local statement63 = _g710["statement?"]
  local mapo = _g710.mapo
  local initial_environment = _g710["initial-environment"]
  local bind42 = _g710["bind*"]
  local quasiexpand = _g710.quasiexpand
  local id = _g710.id
  local macro63 = _g710["macro?"]
  local indentation = _g710.indentation
  local macro_function = _g710["macro-function"]
  local quoted = _g710.quoted
  local bound63 = _g710["bound?"]
  local _g711 = nexus["lumen/compiler"]
  local in_module = _g711["in-module"]
  local compile = _g711.compile
  local declare = _g711.declare
  local import_modules = _g711["import-modules"]
  local eval = _g711.eval
  local compile_module = _g711["compile-module"]
  local open_module = _g711["open-module"]
  local compile_function = _g711["compile-function"]
  local load_module = _g711["load-module"]
  modules = {["lumen/main"] = {export = {}, import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}, {"lumen", "reader"}, {"lumen", "compiler"}}}, ["lumen/system"] = {export = {nexus = {global = true, export = true}}, import = {{"lumen", "special"}, {"lumen", "core"}}}, ["lumen/reader"] = {export = {["read-char"] = {variable = true}, ["peek-char"] = {variable = true}, delimiters = {variable = true}, ["flag?"] = {variable = true}, ["make-stream"] = {variable = true, export = true}, ["skip-non-code"] = {variable = true}, ["define-reader"] = {macro = function (_g724, ...)
    local char = _g724[1]
    local stream = _g724[2]
    local body = unstash({...})
    local _g725 = sub(body, 0)
    return({"set", {"get", "read-table", char}, join({"fn", {stream}}, _g725)})
  end, export = true}, whitespace = {variable = true}, eof = {variable = true}, ["read-all"] = {variable = true, export = true}, ["read-from-string"] = {variable = true, export = true}, ["key?"] = {variable = true}, ["read-table"] = {variable = true, export = true}, read = {variable = true, export = true}}, import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}}}, lumen = {export = {}, alias = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}}, import = {{"lumen", "special"}}}, user = {export = {}, import = {"lumen", {"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}}}, ["lumen/boot"] = {export = {["%initial-modules"] = {macro = function ()
    return(quote_modules())
  end}, modules = {global = true, export = true}, ["%initial-environment"] = {macro = function ()
    return(quote_environment(initial_environment()))
  end}}, import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}, {"lumen", "lib"}, {"lumen", "compiler"}}}, ["lumen/special"] = {export = {["%array"] = {special = function (...)
    local forms = unstash({...})
    local _g795
    if target == "lua" then
      _g795 = "{"
    else
      _g795 = "["
    end
    local open = _g795
    local _g796
    if target == "lua" then
      _g796 = "}"
    else
      _g796 = "]"
    end
    local close = _g796
    local str = ""
    local _g726 = forms
    local i = 0
    while i < length(_g726) do
      local x = _g726[i + 1]
      str = str .. compile(x)
      if i < length(forms) - 1 then
        str = str .. ", "
      end
      i = i + 1
    end
    return(open .. str .. close)
  end, export = true, foo = true}, error = {special = function (x)
    local _g797
    if target == "js" then
      _g797 = "throw new " .. compile({"Error", x})
    else
      _g797 = "error(" .. compile(x) .. ")"
    end
    local e = _g797
    return(indentation() .. e)
  end, export = true, stmt = true, foo = true}, ["%for"] = {stmt = true, foo = true, special = function (t, k, form)
    local _g727 = compile(t)
    local ind = indentation()
    indent_level = indent_level + 1
    local _g728 = compile(form, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local body = _g728
    if target == "lua" then
      return(ind .. "for " .. k .. " in next, " .. _g727 .. " do\n" .. body .. ind .. "end\n")
    else
      return(ind .. "for (" .. k .. " in " .. _g727 .. ") {\n" .. body .. ind .. "}\n")
    end
  end, tr = true, export = true}, ["while"] = {stmt = true, foo = true, special = function (cond, form)
    local _g729 = compile(cond)
    indent_level = indent_level + 1
    local _g730 = compile(form, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local body = _g730
    local ind = indentation()
    if target == "js" then
      return(ind .. "while (" .. _g729 .. ") {\n" .. body .. ind .. "}\n")
    else
      return(ind .. "while " .. _g729 .. " do\n" .. body .. ind .. "end\n")
    end
  end, tr = true, export = true}, ["%local"] = {special = function (name, value)
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
  end, export = true, stmt = true, foo = true}, ["%global-function"] = {stmt = true, foo = true, special = function (name, args, body)
    if target == "lua" then
      local x = compile_function(args, body, {_stash = true, name = name})
      return(indentation() .. x)
    else
      return(compile({"set", name, {"%function", args, body}}, {_stash = true, stmt = true}))
    end
  end, tr = true, export = true}, ["%if"] = {stmt = true, foo = true, special = function (cond, cons, alt)
    local _g731 = compile(cond)
    indent_level = indent_level + 1
    local _g733 = compile(cons, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local _g732 = _g733
    local _g800
    if alt then
      indent_level = indent_level + 1
      local _g735 = compile(alt, {_stash = true, stmt = true})
      indent_level = indent_level - 1
      _g800 = _g735
    end
    local _g734 = _g800
    local ind = indentation()
    local str = ""
    if target == "js" then
      str = str .. ind .. "if (" .. _g731 .. ") {\n" .. _g732 .. ind .. "}"
    else
      str = str .. ind .. "if " .. _g731 .. " then\n" .. _g732
    end
    if _g734 and target == "js" then
      str = str .. " else {\n" .. _g734 .. ind .. "}"
    else
      if _g734 then
        str = str .. ind .. "else\n" .. _g734
      end
    end
    if target == "lua" then
      return(str .. ind .. "end\n")
    else
      return(str .. "\n")
    end
  end, tr = true, export = true}, get = {special = function (t, k)
    local _g736 = compile(t)
    local k1 = compile(k)
    if target == "lua" and char(_g736, 0) == "{" then
      _g736 = "(" .. _g736 .. ")"
    end
    if string_literal63(k) and valid_id63(inner(k)) then
      return(_g736 .. "." .. inner(k))
    else
      return(_g736 .. "[" .. k1 .. "]")
    end
  end, export = true, foo = true}, ["%local-function"] = {stmt = true, foo = true, special = function (name, args, body)
    local x = compile_function(args, body, {_stash = true, name = name, prefix = "local "})
    return(indentation() .. x)
  end, tr = true, export = true}, ["%object"] = {special = function (...)
    local forms = unstash({...})
    local str = "{"
    local _g801
    if target == "lua" then
      _g801 = " = "
    else
      _g801 = ": "
    end
    local sep = _g801
    local pairs = pair(forms)
    local n_1 = length(pairs) - 1
    local _g737 = pairs
    local i = 0
    while i < length(_g737) do
      local _g738 = _g737[i + 1]
      local k = _g738[1]
      local v = _g738[2]
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
  end, export = true, foo = true}, ["do"] = {stmt = true, foo = true, special = function (...)
    local forms = unstash({...})
    local str = ""
    local _g739 = forms
    local _g740 = 0
    while _g740 < length(_g739) do
      local x = _g739[_g740 + 1]
      str = str .. compile(x, {_stash = true, stmt = true})
      _g740 = _g740 + 1
    end
    return(str)
  end, tr = true, export = true}, ["%function"] = {special = function (args, body)
    return(compile_function(args, body))
  end, export = true, foo = true}, ["%try"] = {stmt = true, foo = true, special = function (form)
    local ind = indentation()
    indent_level = indent_level + 1
    local _g741 = compile(form, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local body = _g741
    local e = make_id()
    local hf = {"return", {"%array", false, {"get", e, "\"message\""}}}
    indent_level = indent_level + 1
    local _g742 = compile(hf, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local h = _g742
    return(ind .. "try {\n" .. body .. ind .. "}\n" .. ind .. "catch (" .. e .. ") {\n" .. h .. ind .. "}\n")
  end, tr = true, export = true}, ["return"] = {special = function (x)
    local _g802
    if nil63(x) then
      _g802 = "return"
    else
      _g802 = "return(" .. compile(x) .. ")"
    end
    local _g743 = _g802
    return(indentation() .. _g743)
  end, export = true, stmt = true, foo = true}, ["not"] = {}, ["break"] = {special = function ()
    return(indentation() .. "break")
  end, export = true, stmt = true, foo = true}, set = {special = function (lh, rh)
    local _g744 = compile(lh)
    local _g803
    if nil63(rh) then
      _g803 = "nil"
    else
      _g803 = rh
    end
    local _g745 = compile(_g803)
    return(indentation() .. _g744 .. " = " .. _g745)
  end, export = true, stmt = true, foo = true}}, import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}, {"lumen", "lib"}, {"lumen", "compiler"}}}, ["lumen/lib"] = {export = {["numeric?"] = {variable = true}, imported = {variable = true, export = true}, bind = {variable = true, export = true}, ["quote-modules"] = {variable = true, export = true}, ["symbol?"] = {variable = true, export = true}, ["with-indent"] = {macro = function (form)
    local result = make_id()
    return({"do", {"inc", "indent-level"}, {"let", {result, form}, {"dec", "indent-level"}, result}})
  end, export = true}, ["quote-environment"] = {variable = true, export = true}, link = {variable = true, export = true}, key = {variable = true, export = true}, getenv = {variable = true, export = true}, ["quasisplice?"] = {variable = true}, ["reserved?"] = {variable = true, export = true}, ["valid-id?"] = {variable = true, export = true}, ["stash*"] = {variable = true, export = true}, ["variable?"] = {variable = true, export = true}, ["special?"] = {variable = true, export = true}, ["symbol-expansion"] = {variable = true, export = true}, macroexpand = {variable = true, export = true}, literal = {variable = true}, ["quote-module"] = {variable = true}, ["special-form?"] = {variable = true, export = true}, ["quote-frame"] = {variable = true}, ["quote-binding"] = {variable = true}, exclude = {variable = true}, extend = {variable = true}, ["valid-code?"] = {variable = true}, reserved = {variable = true}, ["can-unquote?"] = {variable = true}, ["global?"] = {variable = true}, ["indent-level"] = {global = true, export = true}, ["quasiquote-list"] = {variable = true}, ["quasiquoting?"] = {variable = true}, ["statement?"] = {variable = true, export = true}, escape = {variable = true}, mapo = {variable = true, export = true}, ["initial-environment"] = {variable = true, export = true}, ["bind*"] = {variable = true, export = true}, quasiexpand = {variable = true, export = true}, id = {variable = true, export = true}, ["macro?"] = {variable = true, export = true}, ["quoting?"] = {variable = true}, indentation = {variable = true, export = true}, ["macro-function"] = {variable = true, export = true}, quoted = {variable = true, export = true}, ["bound?"] = {variable = true, export = true}}, import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}}}, ["lumen/core"] = {export = {["set-of"] = {macro = function (...)
    local xs = unstash({...})
    local l = {}
    local _g746 = xs
    local _g747 = 0
    while _g747 < length(_g746) do
      local x = _g746[_g747 + 1]
      l[x] = true
      _g747 = _g747 + 1
    end
    return(join({"table"}, l))
  end, export = true}, pr = {macro = function (...)
    local xs = unstash({...})
    return({"print", space(xs)})
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
  end, export = true}, ["if"] = {macro = function (...)
    local branches = unstash({...})
    local function step(_g748)
      local a = _g748[1]
      local b = _g748[2]
      local c = sub(_g748, 2)
      if is63(b) then
        return({join({"%if", a, b}, step(c))})
      else
        if is63(a) then
          return({a})
        end
      end
    end
    return(hd(step(branches)))
  end, export = true}, ["define*"] = {macro = function (name, x, ...)
    local body = unstash({...})
    local _g749 = sub(body, 0)
    setenv(name, {_stash = true, global = true, export = true})
    if some63(_g749) then
      local _g750 = bind42(x, _g749)
      local args = _g750[1]
      local _g751 = _g750[2]
      return(join({"%global-function", name, args}, _g751))
    else
      if target == "js" then
        return({"set", {"get", "global", {"quote", id(name)}}, x})
      else
        return({"set", name, x})
      end
    end
  end, export = true}, quote = {macro = function (form)
    return(quoted(form))
  end, export = true}, ["join!"] = {macro = function (a, ...)
    local bs = unstash({...})
    local _g752 = sub(bs, 0)
    return({"set", a, join({"join*", a}, _g752)})
  end, export = true}, unless = {macro = function (cond, ...)
    local body = unstash({...})
    local _g753 = sub(body, 0)
    return({"if", {"not", cond}, join({"do"}, _g753)})
  end, export = true}, ["define-symbol"] = {macro = function (name, expansion)
    setenv(name, {_stash = true, symbol = expansion})
    return(nil)
  end, export = true}, all = {macro = function (_g754, t, ...)
    local k = _g754[1]
    local v = _g754[2]
    local body = unstash({...})
    local _g755 = sub(body, 0)
    local x = make_id()
    local n = make_id()
    local _g804
    if target == "lua" then
      _g804 = _g755
    else
      _g804 = {join({"let", {n, {"parseInt", k}, k, {"if", {"isNaN", n}, k, n}}}, _g755)}
    end
    return({"let", {x, t, k, "nil"}, {"%for", x, k, join({"let", {v, {"get", x, k}}}, _g804)}})
  end, export = true}, fn = {macro = function (args, ...)
    local body = unstash({...})
    local _g756 = sub(body, 0)
    local _g757 = bind42(args, _g756)
    local _g758 = _g757[1]
    local _g759 = _g757[2]
    return(join({"%function", _g758}, _g759))
  end, export = true}, ["let-symbol"] = {macro = function (expansions, ...)
    local body = unstash({...})
    local _g760 = sub(body, 0)
    add(environment, {})
    map(function (_g762)
      local name = _g762[1]
      local exp = _g762[2]
      return(macroexpand({"define-symbol", name, exp}))
    end, pair(expansions))
    local _g761 = join({"do"}, macroexpand(_g760))
    drop(environment)
    return(_g761)
  end, export = true}, ["let-macro"] = {macro = function (definitions, ...)
    local body = unstash({...})
    local _g763 = sub(body, 0)
    add(environment, {})
    map(function (m)
      return(macroexpand(join({"define-macro"}, m)))
    end, definitions)
    local _g764 = join({"do"}, macroexpand(_g763))
    drop(environment)
    return(_g764)
  end, export = true}, at = {macro = function (l, i)
    if target == "lua" and number63(i) then
      i = i + 1
    else
      if target == "lua" then
        i = {"+", i, 1}
      end
    end
    return({"get", l, i})
  end, export = true}, inc = {macro = function (n, by)
    return({"set", n, {"+", n, by or 1}})
  end, export = true}, target = {macro = function (...)
    local clauses = unstash({...})
    return(clauses[target])
  end, global = true, export = true}, ["set*"] = {macro = function (name, value)
    return(link(name, {"set", name, value}))
  end, export = true}, list = {macro = function (...)
    local body = unstash({...})
    local l = join({"%array"}, body)
    if not keys63(body) then
      return(l)
    else
      local id = make_id()
      local init = {}
      local _g765 = body
      local k = nil
      for k in next, _g765 do
        if not number63(k) then
          local v = _g765[k]
          add(init, {"set", {"get", id, {"quote", k}}, v})
        end
      end
      return(join({"let", {id, l}}, join(init, {id})))
    end
  end, export = true}, ["define-special"] = {macro = function (name, args, ...)
    local body = unstash({...})
    local _g766 = sub(body, 0)
    local form = join({"fn", args}, _g766)
    local keys = sub(_g766, length(_g766))
    local _g767 = {"setenv", {"quote", name}}
    _g767.form = {"quote", form}
    _g767.special = form
    eval(join(_g767, keys))
    return(nil)
  end, export = true}, when = {macro = function (cond, ...)
    local body = unstash({...})
    local _g768 = sub(body, 0)
    return({"if", cond, join({"do"}, _g768)})
  end, export = true}, ["with-bindings"] = {macro = function (_g769, ...)
    local names = _g769[1]
    local body = unstash({...})
    local _g770 = sub(body, 0)
    local x = make_id()
    local _g772 = {"setenv", x}
    _g772.variable = true
    local _g771 = {"with-frame", {"each", {x}, names, _g772}}
    _g771.scope = true
    return(join(_g771, _g770))
  end, export = true}, ["define-macro"] = {macro = function (name, args, ...)
    local body = unstash({...})
    local _g773 = sub(body, 0)
    local form = join({"fn", args}, _g773)
    local _g774 = {"setenv", {"quote", name}}
    _g774.macro = form
    _g774.form = {"quote", form}
    eval(_g774)
    return(nil)
  end, export = true}, quasiquote = {macro = function (form)
    return(quasiexpand(form, 1))
  end, export = true}, ["cat!"] = {macro = function (a, ...)
    local bs = unstash({...})
    local _g775 = sub(bs, 0)
    return({"set", a, join({"cat", a}, _g775)})
  end, export = true}, each = {macro = function (b, t, ...)
    local body = unstash({...})
    local _g776 = sub(body, 0)
    local k = b[1]
    local v = b[2]
    local t1 = make_id()
    local _g805
    if nil63(v) then
      local _g806
      if b.i then
        _g806 = "i"
      else
        _g806 = make_id()
      end
      local i = _g806
      _g805 = {"let", {i, 0}, {"while", {"<", i, {"length", t1}}, join({"let", {k, {"at", t1, i}}}, _g776), {"inc", i}}}
    else
      local _g777 = {"target"}
      _g777.lua = {"not", {"number?", k}}
      _g777.js = {"isNaN", {"parseInt", k}}
      _g805 = {"let", {k, "nil"}, {"%for", t1, k, {"when", _g777, join({"let", {v, {"get", t1, k}}}, _g776)}}}
    end
    return({"let", {t1, t}, _g805})
  end, export = true}, ["with-frame"] = {macro = function (...)
    local body = unstash({...})
    local _g778 = sub(body, 0)
    local scope = body.scope
    local x = make_id()
    local _g779 = {"table"}
    _g779._scope = scope
    return({"do", {"add", "environment", _g779}, {"let", {x, join({"do"}, _g778)}, {"drop", "environment"}, x}})
  end, export = true}, ["join*"] = {macro = function (...)
    local xs = unstash({...})
    return(reduce(function (a, b)
      return({"join", a, b})
    end, xs))
  end, export = true}, ["define-module"] = {macro = function (spec, ...)
    local body = unstash({...})
    local _g780 = sub(body, 0)
    local alias = _g780.alias
    local exp = _g780.export
    local imp = _g780.import
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
  end, export = true}, language = {macro = function ()
    return({"quote", target})
  end, export = true}, table = {macro = function (...)
    local body = unstash({...})
    return(join({"%object"}, mapo(function (x)
      return(x)
    end, body)))
  end, export = true}, let = {macro = function (bindings, ...)
    local body = unstash({...})
    local _g787 = sub(body, 0)
    if length(bindings) < 2 then
      return(join({"do"}, _g787))
    else
      local renames = {}
      local locals = {}
      local lh = bindings[1]
      local rh = bindings[2]
      local _g788 = bind(lh, rh)
      local _g789 = 0
      while _g789 < length(_g788) do
        local _g790 = _g788[_g789 + 1]
        local id = _g790[1]
        local val = _g790[2]
        if bound63(id) or reserved63(id) or toplevel63() then
          local id1 = make_id()
          add(renames, id)
          add(renames, id1)
          id = id1
        else
          setenv(id, {_stash = true, variable = true})
        end
        add(locals, {"%local", id, val})
        _g789 = _g789 + 1
      end
      return(join({"do"}, join(locals, {{"let-symbol", renames, join({"let", sub(bindings, 2)}, _g787)}})))
    end
  end, export = true}}, import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}, {"lumen", "lib"}, {"lumen", "compiler"}}}, ["lumen/compiler"] = {export = {terminator = {variable = true}, ["lower-body"] = {variable = true}, getop = {variable = true}, ["parenthesize-call?"] = {variable = true}, ["lower-statement"] = {variable = true}, ["compile-infix"] = {variable = true}, ["lower-infix?"] = {variable = true}, precedence = {variable = true}, ["compiler-output"] = {variable = true}, ["in-module"] = {variable = true, export = true}, ["can-return?"] = {variable = true}, ["compile-file"] = {variable = true}, ["lower-infix"] = {variable = true}, ["%result"] = {global = true, export = true}, ["lower-call"] = {variable = true}, conclude = {variable = true}, ["module-path"] = {variable = true}, compile = {variable = true, export = true}, declare = {variable = true, export = true}, ["lower-definition"] = {variable = true}, ["import-modules"] = {variable = true, export = true}, ["op-delims"] = {variable = true}, ["compile-args"] = {variable = true}, infix = {variable = true}, ["lower-try"] = {variable = true}, ["lower-while"] = {variable = true}, ["compile-call"] = {variable = true}, ["compiling?"] = {variable = true}, eval = {variable = true, export = true}, ["lower-function"] = {variable = true}, ["current-module"] = {global = true, export = true}, ["lower-for"] = {variable = true}, ["lower-special"] = {variable = true}, encapsulate = {variable = true}, ["compile-module"] = {variable = true, export = true}, ["open-module"] = {variable = true, export = true}, process = {variable = true}, ["unary?"] = {variable = true}, reimported = {variable = true}, ["lower-short"] = {variable = true}, ["compile-atom"] = {variable = true}, ["compile-function"] = {variable = true, export = true}, ["lower-do"] = {variable = true}, lower = {variable = true}, ["lower-if"] = {variable = true}, ["%compile-module"] = {variable = true}, ["compile-special"] = {variable = true}, ["infix?"] = {variable = true}, run = {variable = true}, ["load-module"] = {variable = true, export = true}}, import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}, {"lumen", "lib"}, {"lumen", "reader"}}}, ["lumen/runtime"] = {export = {["write-file"] = {variable = true, export = true}, find = {variable = true, export = true}, ["function?"] = {variable = true, export = true}, hd = {variable = true, export = true}, char = {variable = true, export = true}, ["+"] = {variable = true, export = true}, ["<="] = {variable = true, export = true}, exit = {variable = true, export = true}, ["string-literal?"] = {variable = true, export = true}, ["number?"] = {variable = true, export = true}, ["table?"] = {variable = true, export = true}, space = {variable = true, export = true}, map = {variable = true, export = true}, keys = {variable = true, export = true}, ["<"] = {variable = true, export = true}, [">"] = {variable = true, export = true}, ["one?"] = {variable = true, export = true}, search = {variable = true, export = true}, ["none?"] = {variable = true, export = true}, ["toplevel?"] = {variable = true, export = true}, split = {variable = true, export = true}, ["keys?"] = {variable = true, export = true}, last = {variable = true, export = true}, join = {variable = true, export = true}, ["some?"] = {variable = true, export = true}, code = {variable = true, export = true}, iterate = {variable = true, export = true}, ["in?"] = {variable = true, export = true}, ["%message-handler"] = {variable = true, export = true}, keep = {variable = true, export = true}, unstash = {variable = true, export = true}, substring = {variable = true, export = true}, ["boolean?"] = {variable = true, export = true}, tl = {variable = true, export = true}, sub = {variable = true, export = true}, sort = {variable = true, export = true}, ["module-key"] = {variable = true, export = true}, ["is?"] = {variable = true, export = true}, drop = {variable = true, export = true}, reduce = {variable = true, export = true}, ["atom?"] = {variable = true, export = true}, number = {variable = true, export = true}, apply = {variable = true, export = true}, ["id-count"] = {variable = true}, shift = {variable = true}, setenv = {variable = true, export = true}, pair = {variable = true, export = true}, module = {variable = true, export = true}, ["list?"] = {variable = true, export = true}, ["make-id"] = {variable = true, export = true}, string = {variable = true, export = true}, ["/"] = {variable = true, export = true}, ["string?"] = {variable = true, export = true}, now = {variable = true, export = true}, ["read-file"] = {variable = true, export = true}, today = {variable = true, export = true}, write = {variable = true, export = true}, length = {variable = true, export = true}, ["id-literal?"] = {variable = true, export = true}, add = {variable = true, export = true}, ["*"] = {variable = true, export = true}, [">="] = {variable = true, export = true}, ["="] = {variable = true, export = true}, replicate = {variable = true, export = true}, ["nil?"] = {variable = true, export = true}, series = {variable = true, export = true}, ["%"] = {variable = true, export = true}, ["-"] = {variable = true, export = true}, cat = {variable = true, export = true}, ["empty?"] = {variable = true, export = true}, reverse = {variable = true, export = true}, stash = {variable = true, export = true}, inner = {variable = true, export = true}, ["composite?"] = {variable = true, export = true}}, import = {{"lumen", "special"}, {"lumen", "core"}}}}
  environment = {{["define-module"] = {macro = function (spec, ...)
    local body = unstash({...})
    local _g791 = sub(body, 0)
    local alias = _g791.alias
    local exp = _g791.export
    local imp = _g791.import
    local _g792 = import_modules(imp)
    local imports = _g792[1]
    local bindings = _g792[2]
    local k = module_key(spec)
    modules[k] = {import = imports, export = {}, alias = alias}
    local _g793 = exp or {}
    local _g794 = 0
    while _g794 < length(_g793) do
      local x = _g793[_g794 + 1]
      setenv(x, {_stash = true, export = true})
      _g794 = _g794 + 1
    end
    return(join({"do", {"set", {"get", "nexus", {"quote", k}}, {"table"}}}, bindings))
  end, export = true}}}
end)();
(function ()
  nexus.user = {}
  local _g807 = nexus["lumen/runtime"]
  local write_file = _g807["write-file"]
  local find = _g807.find
  local function63 = _g807["function?"]
  local hd = _g807.hd
  local char = _g807.char
  local _43 = _g807["+"]
  local _6061 = _g807["<="]
  local exit = _g807.exit
  local string_literal63 = _g807["string-literal?"]
  local number63 = _g807["number?"]
  local table63 = _g807["table?"]
  local space = _g807.space
  local map = _g807.map
  local keys = _g807.keys
  local _60 = _g807["<"]
  local _62 = _g807[">"]
  local one63 = _g807["one?"]
  local search = _g807.search
  local none63 = _g807["none?"]
  local toplevel63 = _g807["toplevel?"]
  local split = _g807.split
  local keys63 = _g807["keys?"]
  local last = _g807.last
  local join = _g807.join
  local some63 = _g807["some?"]
  local code = _g807.code
  local iterate = _g807.iterate
  local in63 = _g807["in?"]
  local _37message_handler = _g807["%message-handler"]
  local keep = _g807.keep
  local unstash = _g807.unstash
  local substring = _g807.substring
  local boolean63 = _g807["boolean?"]
  local tl = _g807.tl
  local sub = _g807.sub
  local sort = _g807.sort
  local module_key = _g807["module-key"]
  local is63 = _g807["is?"]
  local drop = _g807.drop
  local reduce = _g807.reduce
  local atom63 = _g807["atom?"]
  local number = _g807.number
  local apply = _g807.apply
  local setenv = _g807.setenv
  local pair = _g807.pair
  local module = _g807.module
  local list63 = _g807["list?"]
  local make_id = _g807["make-id"]
  local string = _g807.string
  local _47 = _g807["/"]
  local string63 = _g807["string?"]
  local now = _g807.now
  local read_file = _g807["read-file"]
  local today = _g807.today
  local write = _g807.write
  local length = _g807.length
  local id_literal63 = _g807["id-literal?"]
  local add = _g807.add
  local _42 = _g807["*"]
  local _6261 = _g807[">="]
  local _61 = _g807["="]
  local replicate = _g807.replicate
  local nil63 = _g807["nil?"]
  local series = _g807.series
  local _37 = _g807["%"]
  local _ = _g807["-"]
  local cat = _g807.cat
  local empty63 = _g807["empty?"]
  local reverse = _g807.reverse
  local stash = _g807.stash
  local inner = _g807.inner
  local composite63 = _g807["composite?"]
end)();
(function ()
  nexus["lumen/main"] = {}
  local _g2 = nexus["lumen/runtime"]
  local string63 = _g2["string?"]
  local find = _g2.find
  local _37 = _g2["%"]
  local _6261 = _g2[">="]
  local _43 = _g2["+"]
  local _42 = _g2["*"]
  local exit = _g2.exit
  local string_literal63 = _g2["string-literal?"]
  local number63 = _g2["number?"]
  local table63 = _g2["table?"]
  local space = _g2.space
  local map = _g2.map
  local _61 = _g2["="]
  local _60 = _g2["<"]
  local _62 = _g2[">"]
  local one63 = _g2["one?"]
  local search = _g2.search
  local setenv = _g2.setenv
  local toplevel63 = _g2["toplevel?"]
  local _ = _g2["-"]
  local _47 = _g2["/"]
  local last = _g2.last
  local join = _g2.join
  local some63 = _g2["some?"]
  local code = _g2.code
  local stash = _g2.stash
  local module = _g2.module
  local _37message_handler = _g2["%message-handler"]
  local keep = _g2.keep
  local unstash = _g2.unstash
  local substring = _g2.substring
  local boolean63 = _g2["boolean?"]
  local tl = _g2.tl
  local sub = _g2.sub
  local sort = _g2.sort
  local module_key = _g2["module-key"]
  local is63 = _g2["is?"]
  local drop = _g2.drop
  local reduce = _g2.reduce
  local atom63 = _g2["atom?"]
  local make_id = _g2["make-id"]
  local apply = _g2.apply
  local inner = _g2.inner
  local in63 = _g2["in?"]
  local string = _g2.string
  local cat = _g2.cat
  local list63 = _g2["list?"]
  local id_literal63 = _g2["id-literal?"]
  local write = _g2.write
  local function63 = _g2["function?"]
  local none63 = _g2["none?"]
  local char = _g2.char
  local read_file = _g2["read-file"]
  local length = _g2.length
  local now = _g2.now
  local today = _g2.today
  local split = _g2.split
  local add = _g2.add
  local number = _g2.number
  local pair = _g2.pair
  local replicate = _g2.replicate
  local nil63 = _g2["nil?"]
  local series = _g2.series
  local write_file = _g2["write-file"]
  local keys63 = _g2["keys?"]
  local hd = _g2.hd
  local empty63 = _g2["empty?"]
  local reverse = _g2.reverse
  local _6061 = _g2["<="]
  local composite63 = _g2["composite?"]
  local iterate = _g2.iterate
  local _g5 = nexus["lumen/reader"]
  local make_stream = _g5["make-stream"]
  local read_all = _g5["read-all"]
  local read_from_string = _g5["read-from-string"]
  local read_table = _g5["read-table"]
  local read = _g5.read
  local _g6 = nexus["lumen/compiler"]
  local in_module = _g6["in-module"]
  local declare = _g6.declare
  local compile_function = _g6["compile-function"]
  local open_module = _g6["open-module"]
  local compile_module = _g6["compile-module"]
  local eval = _g6.eval
  local compile = _g6.compile
  local import_modules = _g6["import-modules"]
  local load_module = _g6["load-module"]
  local function rep(str)
    local _g811,_g812 = xpcall(function ()
      return(eval(read_from_string(str)))
    end, _37message_handler)
    local _g810 = {_g811, _g812}
    local _g1 = _g810[1]
    local x = _g810[2]
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
    local _g813 = args
    local i = 0
    while i < length(_g813) do
      local arg = _g813[i + 1]
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
