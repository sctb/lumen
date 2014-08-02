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
  local math = math
  nexus["lumen/runtime"].math = math
  local abs = math.abs
  nexus["lumen/runtime"].abs = abs
  local acos = math.acos
  nexus["lumen/runtime"].acos = acos
  local asin = math.asin
  nexus["lumen/runtime"].asin = asin
  local atan = math.atan
  nexus["lumen/runtime"].atan = atan
  local atan2 = math.atan2
  nexus["lumen/runtime"].atan2 = atan2
  local ceil = math.ceil
  nexus["lumen/runtime"].ceil = ceil
  local cos = math.cos
  nexus["lumen/runtime"].cos = cos
  local floor = math.floor
  nexus["lumen/runtime"].floor = floor
  local log = math.log
  nexus["lumen/runtime"].log = log
  local log10 = math.log10
  nexus["lumen/runtime"].log10 = log10
  local max = math.max
  nexus["lumen/runtime"].max = max
  local min = math.min
  nexus["lumen/runtime"].min = min
  local pow = math.pow
  nexus["lumen/runtime"].pow = pow
  local random = math.random
  nexus["lumen/runtime"].random = random
  local sin = math.sin
  nexus["lumen/runtime"].sin = sin
  local sinh = math.sinh
  nexus["lumen/runtime"].sinh = sinh
  local sqrt = math.sqrt
  nexus["lumen/runtime"].sqrt = sqrt
  local tan = math.tan
  nexus["lumen/runtime"].tan = tan
  local tanh = math.tanh
  nexus["lumen/runtime"].tanh = tanh
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
  local function max42(x, n)
    if nil63(x) then
      return(n)
    else
      return(max(x, n))
    end
  end
  nexus["lumen/runtime"]["max*"] = max42
  local function min42(x, n)
    if nil63(x) then
      return(n)
    else
      return(min(x, n))
    end
  end
  nexus["lumen/runtime"]["min*"] = min42
  local function subl(l, from, upto)
    local i = max42(from, 0)
    local _g23 = min42(upto, length(l))
    local j = 0
    local l2 = {}
    while i < _g23 do
      l2[j + 1] = l[i + 1]
      i = i + 1
      j = j + 1
    end
    return(l2)
  end
  nexus["lumen/runtime"].subl = subl
  local function sub(x, from, upto)
    if string63(x) then
      return(substring(x, from or 0, upto))
    else
      local l = subl(x, from, upto)
      local _g24 = x
      local k = nil
      for k in next, _g24 do
        if not number63(k) then
          local v = _g24[k]
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
    local _g56
    if n then
      _g56 = n + 1
    end
    return(string.byte(str, _g56))
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
  local function join(l1, l2)
    if nil63(l2) and nil63(l1) then
      return({})
    else
      if nil63(l1) then
        return(join({}, l2))
      else
        if nil63(l2) then
          return(join(l1, {}))
        else
          local l = {}
          local skip63 = false
          if not skip63 then
            local i = 0
            local len = length(l1)
            while i < len do
              l[i + 1] = l1[i + 1]
              i = i + 1
            end
            while i < len + length(l2) do
              l[i + 1] = l2[i - len + 1]
              i = i + 1
            end
          end
          local _g25 = l1
          local k = nil
          for k in next, _g25 do
            if not number63(k) then
              local v = _g25[k]
              l[k] = v
            end
          end
          local _g26 = l2
          local k = nil
          for k in next, _g26 do
            if not number63(k) then
              local v = _g26[k]
              l[k] = v
            end
          end
          return(l)
        end
      end
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
  local function keep(f, l)
    local l1 = {}
    local _g27 = l
    local _g28 = 0
    while _g28 < length(_g27) do
      local x = _g27[_g28 + 1]
      if f(x) then
        add(l1, x)
      end
      _g28 = _g28 + 1
    end
    return(l1)
  end
  nexus["lumen/runtime"].keep = keep
  local function in63(x, l)
    local _g29 = l
    local _g30 = 0
    while _g30 < length(_g29) do
      local y = _g29[_g30 + 1]
      if x == y then
        return(true)
      end
      _g30 = _g30 + 1
    end
  end
  nexus["lumen/runtime"]["in?"] = in63
  local function find(f, l)
    local _g31 = l
    local _g32 = 0
    while _g32 < length(_g31) do
      local x = _g31[_g32 + 1]
      local _g33 = f(x)
      if _g33 then
        return(_g33)
      end
      _g32 = _g32 + 1
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
  local function splice(x)
    return({_splice = true, value = x})
  end
  nexus["lumen/runtime"].splice = splice
  local function splice63(x)
    return(table63(x) and x._splice)
  end
  nexus["lumen/runtime"]["splice?"] = splice63
  local function mapl(f, l)
    local l1 = {}
    local _g34 = l
    local _g35 = 0
    while _g35 < length(_g34) do
      local x = _g34[_g35 + 1]
      local _g36 = f(x)
      if splice63(_g36) then
        l1 = join(l1, _g36.value)
      else
        if is63(_g36) then
          add(l1, _g36)
        end
      end
      _g35 = _g35 + 1
    end
    return(l1)
  end
  nexus["lumen/runtime"].mapl = mapl
  local function map(f, t)
    local l = mapl(f, t)
    local _g37 = t
    local k = nil
    for k in next, _g37 do
      if not number63(k) then
        local v = _g37[k]
        local x = f(v)
        if splice63(x) then
          l[k] = x.value
        else
          if is63(x) then
            l[k] = x
          end
        end
      end
    end
    return(l)
  end
  nexus["lumen/runtime"].map = map
  local function flat(x)
    if atom63(x) then
      return(x)
    else
      return(map(function (a)
        if list63(a) then
          return(splice(flat(a)))
        else
          return(a)
        end
      end, x))
    end
  end
  nexus["lumen/runtime"].flat = flat
  local function flat1(x)
    if atom63(x) then
      return(x)
    else
      return(map(function (a)
        if list63(a) then
          return(splice(a))
        else
          return(a)
        end
      end, x))
    end
  end
  nexus["lumen/runtime"].flat1 = flat1
  local function keys63(t)
    local k63 = false
    local _g38 = t
    local k = nil
    for k in next, _g38 do
      if not number63(k) then
        local v = _g38[k]
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
      local _g39 = args
      local k = nil
      for k in next, _g39 do
        if not number63(k) then
          local v = _g39[k]
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
        local _g40 = l
        local k = nil
        for k in next, _g40 do
          if not number63(k) then
            local v = _g40[k]
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
  local function extend(t, ...)
    local xs = unstash({...})
    local _g41 = sub(xs, 0)
    return(join(t, _g41))
  end
  nexus["lumen/runtime"].extend = extend
  local function exclude(t, ...)
    local keys = unstash({...})
    local _g42 = sub(keys, 0)
    local t1 = subl(t)
    local _g43 = t
    local k = nil
    for k in next, _g43 do
      if not number63(k) then
        local v = _g43[k]
        if not _g42[k] then
          t1[k] = v
        end
      end
    end
    return(t1)
  end
  nexus["lumen/runtime"].exclude = exclude
  local function search(str, pattern, start)
    local _g57
    if start then
      _g57 = start + 1
    end
    local _g44 = _g57
    local i = string.find(str, pattern, _g44, true)
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
    local _g45 = sub(xs, 0)
    if none63(_g45) then
      return("")
    else
      return(reduce(function (a, b)
        return(a .. b)
      end, _g45))
    end
  end
  nexus["lumen/runtime"].cat = cat
  local function _43(...)
    local xs = unstash({...})
    local _g46 = sub(xs, 0)
    return(reduce(function (a, b)
      return(a + b)
    end, _g46))
  end
  nexus["lumen/runtime"]["+"] = _43
  local function _(...)
    local xs = unstash({...})
    local _g47 = sub(xs, 0)
    return(reduce(function (b, a)
      return(a - b)
    end, reverse(_g47)))
  end
  nexus["lumen/runtime"]["-"] = _
  local function _42(...)
    local xs = unstash({...})
    local _g48 = sub(xs, 0)
    return(reduce(function (a, b)
      return(a * b)
    end, _g48))
  end
  nexus["lumen/runtime"]["*"] = _42
  local function _47(...)
    local xs = unstash({...})
    local _g49 = sub(xs, 0)
    return(reduce(function (b, a)
      return(a / b)
    end, reverse(_g49)))
  end
  nexus["lumen/runtime"]["/"] = _47
  local function _37(...)
    local xs = unstash({...})
    local _g50 = sub(xs, 0)
    return(reduce(function (b, a)
      return(a % b)
    end, reverse(_g50)))
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
            local _g51 = x
            local k = nil
            for k in next, _g51 do
              if not number63(k) then
                local v = _g51[k]
                add(x1, k .. ":")
                add(x1, v)
              end
            end
            local _g52 = x1
            local i = 0
            while i < length(_g52) do
              local y = _g52[i + 1]
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
    local _g53 = stash(args)
    return(f(unpack(_g53)))
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
    local _g54 = sub(keys, 0)
    if string63(k) then
      local frame = last(environment)
      local x = frame[k] or {}
      local _g55 = _g54
      local k1 = nil
      for k1 in next, _g55 do
        if not number63(k1) then
          local v = _g55[k1]
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
  local _g62 = nexus["lumen/runtime"]
  local tanh = _g62.tanh
  local join = _g62.join
  local find = _g62.find
  local reduce = _g62.reduce
  local cos = _g62.cos
  local nil63 = _g62["nil?"]
  local empty63 = _g62["empty?"]
  local boolean63 = _g62["boolean?"]
  local char = _g62.char
  local is63 = _g62["is?"]
  local _37message_handler = _g62["%message-handler"]
  local abs = _g62.abs
  local search = _g62.search
  local list63 = _g62["list?"]
  local sort = _g62.sort
  local length = _g62.length
  local acos = _g62.acos
  local last = _g62.last
  local inner = _g62.inner
  local split = _g62.split
  local atan2 = _g62.atan2
  local string63 = _g62["string?"]
  local table63 = _g62["table?"]
  local function63 = _g62["function?"]
  local module = _g62.module
  local extend = _g62.extend
  local flat = _g62.flat
  local write = _g62.write
  local write_file = _g62["write-file"]
  local keep = _g62.keep
  local setenv = _g62.setenv
  local module_key = _g62["module-key"]
  local _37 = _g62["%"]
  local composite63 = _g62["composite?"]
  local make_id = _g62["make-id"]
  local cat = _g62.cat
  local reverse = _g62.reverse
  local pow = _g62.pow
  local flat1 = _g62.flat1
  local now = _g62.now
  local apply = _g62.apply
  local toplevel63 = _g62["toplevel?"]
  local string = _g62.string
  local replicate = _g62.replicate
  local today = _g62.today
  local _60 = _g62["<"]
  local exit = _g62.exit
  local keys63 = _g62["keys?"]
  local log10 = _g62.log10
  local add = _g62.add
  local substring = _g62.substring
  local string_literal63 = _g62["string-literal?"]
  local read_file = _g62["read-file"]
  local asin = _g62.asin
  local _6261 = _g62[">="]
  local sub = _g62.sub
  local number = _g62.number
  local exclude = _g62.exclude
  local stash = _g62.stash
  local space = _g62.space
  local max = _g62.max
  local _47 = _g62["/"]
  local hd = _g62.hd
  local none63 = _g62["none?"]
  local atan = _g62.atan
  local _43 = _g62["+"]
  local tl = _g62.tl
  local sqrt = _g62.sqrt
  local _6061 = _g62["<="]
  local unstash = _g62.unstash
  local map = _g62.map
  local atom63 = _g62["atom?"]
  local log = _g62.log
  local _61 = _g62["="]
  local _62 = _g62[">"]
  local sinh = _g62.sinh
  local random = _g62.random
  local drop = _g62.drop
  local some63 = _g62["some?"]
  local one63 = _g62["one?"]
  local iterate = _g62.iterate
  local splice = _g62.splice
  local min = _g62.min
  local tan = _g62.tan
  local floor = _g62.floor
  local number63 = _g62["number?"]
  local _42 = _g62["*"]
  local code = _g62.code
  local in63 = _g62["in?"]
  local _ = _g62["-"]
  local ceil = _g62.ceil
  local pair = _g62.pair
  local sin = _g62.sin
  local id_literal63 = _g62["id-literal?"]
  local function getenv(k, ...)
    local keys = unstash({...})
    local _g65 = sub(keys, 0)
    if string63(k) then
      local b = find(function (e)
        return(e[k])
      end, reverse(environment))
      if table63(b) then
        local _g66 = nil
        local _g67 = _g65
        local x = nil
        for x in next, _g67 do
          if not number63(x) then
            local _g58 = _g67[x]
            _g66 = x
          end
        end
        if _g66 then
          return(b[_g66])
        else
          return(b)
        end
      end
    end
  end
  nexus["lumen/lib"].getenv = getenv
  local function macro_function(k)
    return(getenv(k, {_stash = true, macro = true}))
  end
  nexus["lumen/lib"]["macro-function"] = macro_function
  local function macro63(k)
    return(is63(macro_function(k)))
  end
  nexus["lumen/lib"]["macro?"] = macro63
  local function special63(k)
    return(is63(getenv(k, {_stash = true, special = true})))
  end
  nexus["lumen/lib"]["special?"] = special63
  local function special_form63(form)
    return(list63(form) and special63(hd(form)))
  end
  nexus["lumen/lib"]["special-form?"] = special_form63
  local function statement63(k)
    return(special63(k) and getenv(k, {_stash = true, stmt = true}))
  end
  nexus["lumen/lib"]["statement?"] = statement63
  local function symbol_expansion(k)
    return(getenv(k, {_stash = true, symbol = true}))
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
    return(getenv(k, {_stash = true, global = true}))
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
      local _g97
      if c == "\n" then
        _g97 = "\\n"
      else
        local _g98
        if c == "\"" then
          _g98 = "\\\""
        else
          local _g99
          if c == "\\" then
            _g99 = "\\\\"
          else
            _g99 = c
          end
          _g98 = _g99
        end
        _g97 = _g98
      end
      local c1 = _g97
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
          local _g59 = form[1]
          local name = form[2]
          local value = form[3]
          return({"%local", name, macroexpand(value)})
        else
          if x == "%function" then
            local _g60 = form[1]
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
              local _g61 = form[1]
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
        local _g100
        if quasisplice63(v, depth) then
          _g100 = quasiexpand(v[2])
        else
          _g100 = quasiexpand(v, depth)
        end
        local _g85 = _g100
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
  local reserved = {["end"] = true, ["=="] = true, ["var"] = true, ["else"] = true, ["and"] = true, ["do"] = true, ["case"] = true, ["until"] = true, ["while"] = true, ["in"] = true, ["break"] = true, ["elseif"] = true, ["not"] = true, ["or"] = true, ["function"] = true, ["local"] = true, ["="] = true, ["<="] = true, ["false"] = true, [">="] = true, ["continue"] = true, ["typeof"] = true, ["delete"] = true, ["true"] = true, ["new"] = true, ["*"] = true, ["for"] = true, ["catch"] = true, ["debugger"] = true, ["return"] = true, ["instanceof"] = true, ["then"] = true, ["-"] = true, ["finally"] = true, ["try"] = true, ["switch"] = true, ["this"] = true, ["with"] = true, ["+"] = true, ["/"] = true, ["nil"] = true, ["repeat"] = true, ["void"] = true, ["if"] = true, ["throw"] = true, ["%"] = true, [">"] = true, ["default"] = true, ["<"] = true}
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
      local _g101
      if c == "-" then
        _g101 = "_"
      else
        local _g102
        if valid_code63(n) then
          _g102 = c
        else
          local _g103
          if i == 0 then
            _g103 = "_" .. n
          else
            _g103 = n
          end
          _g102 = _g103
        end
        _g101 = _g102
      end
      local c1 = _g101
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
    local all = _g93.all
    local m = make_id()
    local k = module_key(spec)
    local imports = {}
    if nexus[k] then
      local _g94 = module(spec).export
      local n = nil
      for n in next, _g94 do
        if not number63(n) then
          local b = _g94[n]
          if b.variable and (all or b.export) then
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
  local function linked(name, form)
    if toplevel63() then
      local k = module_key(current_module)
      return({"do", form, {"set", {"get", {"get", "nexus", {"quote", k}}, {"quote", name}}, name}})
    else
      return(form)
    end
  end
  nexus["lumen/lib"].linked = linked
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
    local _g95 = t
    local k = nil
    for k in next, _g95 do
      if not number63(k) then
        local v = _g95[k]
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
    local _g96 = {"table"}
    _g96.import = quoted(m.import)
    _g96.export = quote_frame(m.export)
    _g96.alias = quoted(m.alias)
    return(_g96)
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
  local _g104 = nexus["lumen/runtime"]
  local tanh = _g104.tanh
  local join = _g104.join
  local find = _g104.find
  local reduce = _g104.reduce
  local cos = _g104.cos
  local nil63 = _g104["nil?"]
  local empty63 = _g104["empty?"]
  local boolean63 = _g104["boolean?"]
  local char = _g104.char
  local is63 = _g104["is?"]
  local _37message_handler = _g104["%message-handler"]
  local abs = _g104.abs
  local search = _g104.search
  local list63 = _g104["list?"]
  local sort = _g104.sort
  local length = _g104.length
  local acos = _g104.acos
  local last = _g104.last
  local inner = _g104.inner
  local split = _g104.split
  local atan2 = _g104.atan2
  local string63 = _g104["string?"]
  local table63 = _g104["table?"]
  local function63 = _g104["function?"]
  local module = _g104.module
  local extend = _g104.extend
  local flat = _g104.flat
  local write = _g104.write
  local write_file = _g104["write-file"]
  local keep = _g104.keep
  local setenv = _g104.setenv
  local module_key = _g104["module-key"]
  local _37 = _g104["%"]
  local composite63 = _g104["composite?"]
  local make_id = _g104["make-id"]
  local cat = _g104.cat
  local reverse = _g104.reverse
  local pow = _g104.pow
  local flat1 = _g104.flat1
  local now = _g104.now
  local apply = _g104.apply
  local toplevel63 = _g104["toplevel?"]
  local string = _g104.string
  local replicate = _g104.replicate
  local today = _g104.today
  local _60 = _g104["<"]
  local exit = _g104.exit
  local keys63 = _g104["keys?"]
  local log10 = _g104.log10
  local add = _g104.add
  local substring = _g104.substring
  local string_literal63 = _g104["string-literal?"]
  local read_file = _g104["read-file"]
  local asin = _g104.asin
  local _6261 = _g104[">="]
  local sub = _g104.sub
  local number = _g104.number
  local exclude = _g104.exclude
  local stash = _g104.stash
  local space = _g104.space
  local max = _g104.max
  local _47 = _g104["/"]
  local hd = _g104.hd
  local none63 = _g104["none?"]
  local atan = _g104.atan
  local _43 = _g104["+"]
  local tl = _g104.tl
  local sqrt = _g104.sqrt
  local _6061 = _g104["<="]
  local unstash = _g104.unstash
  local map = _g104.map
  local atom63 = _g104["atom?"]
  local log = _g104.log
  local _61 = _g104["="]
  local _62 = _g104[">"]
  local sinh = _g104.sinh
  local random = _g104.random
  local drop = _g104.drop
  local some63 = _g104["some?"]
  local one63 = _g104["one?"]
  local iterate = _g104.iterate
  local splice = _g104.splice
  local min = _g104.min
  local tan = _g104.tan
  local floor = _g104.floor
  local number63 = _g104["number?"]
  local _42 = _g104["*"]
  local code = _g104.code
  local in63 = _g104["in?"]
  local _ = _g104["-"]
  local ceil = _g104.ceil
  local pair = _g104.pair
  local sin = _g104.sin
  local id_literal63 = _g104["id-literal?"]
  local delimiters = {["("] = true, [";"] = true, ["\n"] = true, [")"] = true}
  nexus["lumen/reader"].delimiters = delimiters
  local whitespace = {[" "] = true, ["\n"] = true, ["\t"] = true}
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
  local _g115 = nexus["lumen/runtime"]
  local tanh = _g115.tanh
  local join = _g115.join
  local find = _g115.find
  local reduce = _g115.reduce
  local cos = _g115.cos
  local nil63 = _g115["nil?"]
  local empty63 = _g115["empty?"]
  local boolean63 = _g115["boolean?"]
  local char = _g115.char
  local is63 = _g115["is?"]
  local _37message_handler = _g115["%message-handler"]
  local abs = _g115.abs
  local search = _g115.search
  local list63 = _g115["list?"]
  local sort = _g115.sort
  local length = _g115.length
  local acos = _g115.acos
  local last = _g115.last
  local inner = _g115.inner
  local split = _g115.split
  local atan2 = _g115.atan2
  local string63 = _g115["string?"]
  local table63 = _g115["table?"]
  local function63 = _g115["function?"]
  local module = _g115.module
  local extend = _g115.extend
  local flat = _g115.flat
  local write = _g115.write
  local write_file = _g115["write-file"]
  local keep = _g115.keep
  local setenv = _g115.setenv
  local module_key = _g115["module-key"]
  local _37 = _g115["%"]
  local composite63 = _g115["composite?"]
  local make_id = _g115["make-id"]
  local cat = _g115.cat
  local reverse = _g115.reverse
  local pow = _g115.pow
  local flat1 = _g115.flat1
  local now = _g115.now
  local apply = _g115.apply
  local toplevel63 = _g115["toplevel?"]
  local string = _g115.string
  local replicate = _g115.replicate
  local today = _g115.today
  local _60 = _g115["<"]
  local exit = _g115.exit
  local keys63 = _g115["keys?"]
  local log10 = _g115.log10
  local add = _g115.add
  local substring = _g115.substring
  local string_literal63 = _g115["string-literal?"]
  local read_file = _g115["read-file"]
  local asin = _g115.asin
  local _6261 = _g115[">="]
  local sub = _g115.sub
  local number = _g115.number
  local exclude = _g115.exclude
  local stash = _g115.stash
  local space = _g115.space
  local max = _g115.max
  local _47 = _g115["/"]
  local hd = _g115.hd
  local none63 = _g115["none?"]
  local atan = _g115.atan
  local _43 = _g115["+"]
  local tl = _g115.tl
  local sqrt = _g115.sqrt
  local _6061 = _g115["<="]
  local unstash = _g115.unstash
  local map = _g115.map
  local atom63 = _g115["atom?"]
  local log = _g115.log
  local _61 = _g115["="]
  local _62 = _g115[">"]
  local sinh = _g115.sinh
  local random = _g115.random
  local drop = _g115.drop
  local some63 = _g115["some?"]
  local one63 = _g115["one?"]
  local iterate = _g115.iterate
  local splice = _g115.splice
  local min = _g115.min
  local tan = _g115.tan
  local floor = _g115.floor
  local number63 = _g115["number?"]
  local _42 = _g115["*"]
  local code = _g115.code
  local in63 = _g115["in?"]
  local _ = _g115["-"]
  local ceil = _g115.ceil
  local pair = _g115.pair
  local sin = _g115.sin
  local id_literal63 = _g115["id-literal?"]
  local _g118 = nexus["lumen/lib"]
  local mapo = _g118.mapo
  local indentation = _g118.indentation
  local getenv = _g118.getenv
  local bind = _g118.bind
  local macro_function = _g118["macro-function"]
  local initial_environment = _g118["initial-environment"]
  local imported = _g118.imported
  local symbol63 = _g118["symbol?"]
  local quote_modules = _g118["quote-modules"]
  local reserved63 = _g118["reserved?"]
  local macroexpand = _g118.macroexpand
  local id = _g118.id
  local linked = _g118.linked
  local statement63 = _g118["statement?"]
  local variable63 = _g118["variable?"]
  local special_form63 = _g118["special-form?"]
  local macro63 = _g118["macro?"]
  local quoted = _g118.quoted
  local bound63 = _g118["bound?"]
  local symbol_expansion = _g118["symbol-expansion"]
  local quote_environment = _g118["quote-environment"]
  local stash42 = _g118["stash*"]
  local bind42 = _g118["bind*"]
  local special63 = _g118["special?"]
  local quasiexpand = _g118.quasiexpand
  local valid_id63 = _g118["valid-id?"]
  local key = _g118.key
  local _g119 = nexus["lumen/reader"]
  local read_from_string = _g119["read-from-string"]
  local read_all = _g119["read-all"]
  local read = _g119.read
  local make_stream = _g119["make-stream"]
  local read_table = _g119["read-table"]
  local _g123 = {}
  _g123.js = "!"
  _g123.lua = "not "
  local _g121 = {}
  local _g124 = {}
  _g124.js = "!"
  _g124.lua = "not "
  _g121["not"] = _g124
  local _g126 = {}
  _g126["*"] = true
  _g126["/"] = true
  _g126["%"] = true
  local _g128 = {}
  _g128["-"] = true
  _g128["+"] = true
  local _g132 = {}
  _g132.js = "+"
  _g132.lua = ".."
  local _g130 = {}
  local _g133 = {}
  _g133.js = "+"
  _g133.lua = ".."
  _g130.cat = _g133
  local _g135 = {}
  _g135[">"] = true
  _g135[">="] = true
  _g135["<"] = true
  _g135["<="] = true
  local _g139 = {}
  _g139.js = "!="
  _g139.lua = "~="
  local _g141 = {}
  _g141.js = "==="
  _g141.lua = "=="
  local _g137 = {}
  local _g142 = {}
  _g142.js = "!="
  _g142.lua = "~="
  _g137["~="] = _g142
  local _g143 = {}
  _g143.js = "==="
  _g143.lua = "=="
  _g137["="] = _g143
  local _g147 = {}
  _g147.js = "&&"
  _g147.lua = "and"
  local _g145 = {}
  local _g148 = {}
  _g148.js = "&&"
  _g148.lua = "and"
  _g145["and"] = _g148
  local _g152 = {}
  _g152.js = "||"
  _g152.lua = "or"
  local _g150 = {}
  local _g153 = {}
  _g153.js = "||"
  _g153.lua = "or"
  _g150["or"] = _g153
  local infix = {_g121, _g126, _g128, _g130, _g135, _g137, _g145, _g150}
  nexus["lumen/compiler"].infix = infix
  local function unary63(form)
    local op = form[1]
    local args = sub(form, 1)
    return(one63(args) and in63(op, {"not", "-"}))
  end
  nexus["lumen/compiler"]["unary?"] = unary63
  local function precedence(form)
    if list63(form) and not unary63(form) then
      local _g154 = infix
      local i = 0
      while i < length(_g154) do
        local level = _g154[i + 1]
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
    local _g155 = args
    local i = 0
    while i < length(_g155) do
      local arg = _g155[i + 1]
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
    local _g156 = getenv(x)
    local special = _g156.special
    local self_tr63 = _g156.tr
    local stmt = _g156.stmt
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
    local _g157 = unstash({...})
    local right = _g157.right
    local _g184
    if right then
      _g184 = _6261
    else
      _g184 = _62
    end
    if _g184(precedence(child), precedence(parent)) then
      return({"(", ")"})
    else
      return({"", ""})
    end
  end
  nexus["lumen/compiler"]["op-delims"] = op_delims
  local function compile_infix(form)
    local op = form[1]
    local _g158 = sub(form, 1)
    local a = _g158[1]
    local b = _g158[2]
    local _g159 = op_delims(form, a)
    local ao = _g159[1]
    local ac = _g159[2]
    local _g160 = op_delims(form, b, {_stash = true, right = true})
    local bo = _g160[1]
    local bc = _g160[2]
    local _g161 = compile(a)
    local _g162 = compile(b)
    local _g163 = getop(op)
    if unary63(form) then
      return(_g163 .. ao .. _g161 .. ac)
    else
      return(ao .. _g161 .. ac .. " " .. _g163 .. " " .. bo .. _g162 .. bc)
    end
  end
  nexus["lumen/compiler"]["compile-infix"] = compile_infix
  local function compile_function(args, body, ...)
    local _g164 = unstash({...})
    local name = _g164.name
    local prefix = _g164.prefix
    local _g185
    if name then
      _g185 = compile(name)
    else
      _g185 = ""
    end
    local id = _g185
    local _g165 = prefix or ""
    local _g166 = compile_args(args)
    indent_level = indent_level + 1
    local _g168 = compile(body, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local _g167 = _g168
    local ind = indentation()
    local _g186
    if target == "js" then
      _g186 = ""
    else
      _g186 = "end"
    end
    local tr = _g186
    if name then
      tr = tr .. "\n"
    end
    if target == "js" then
      return("function " .. id .. _g166 .. " {\n" .. _g167 .. ind .. "}" .. tr)
    else
      return(_g165 .. "function " .. id .. _g166 .. "\n" .. _g167 .. ind .. tr)
    end
  end
  nexus["lumen/compiler"]["compile-function"] = compile_function
  local function can_return63(form)
    return(is63(form) and (atom63(form) or not (hd(form) == "return") and not statement63(hd(form))))
  end
  nexus["lumen/compiler"]["can-return?"] = can_return63
  compile = function (form, ...)
    local _g169 = unstash({...})
    local stmt = _g169.stmt
    if nil63(form) then
      return("")
    else
      if special_form63(form) then
        return(compile_special(form, stmt))
      else
        local tr = terminator(stmt)
        local _g187
        if stmt then
          _g187 = indentation()
        else
          _g187 = ""
        end
        local ind = _g187
        local _g188
        if atom63(form) then
          _g188 = compile_atom(form)
        else
          local _g189
          if infix63(hd(form)) then
            _g189 = compile_infix(form)
          else
            _g189 = compile_call(form)
          end
          _g188 = _g189
        end
        local _g170 = _g188
        return(ind .. _g170 .. tr)
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
    local _g171 = sub(args, 0, length(args) - 1)
    local _g172 = 0
    while _g172 < length(_g171) do
      local x = _g171[_g172 + 1]
      add(hoist, lower(x, hoist, stmt63))
      _g172 = _g172 + 1
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
    local _g173 = args[2]
    local _g174 = args[3]
    if stmt63 or tail63 then
      local _g191
      if _g174 then
        _g191 = {lower_body({_g174}, tail63)}
      end
      return(add(hoist, join({"%if", lower(cond, hoist), lower_body({_g173}, tail63)}, _g191)))
    else
      local e = make_id()
      add(hoist, {"%local", e})
      local _g190
      if _g174 then
        _g190 = {lower({"set", e, _g174})}
      end
      add(hoist, join({"%if", lower(cond, hoist), lower({"set", e, _g173})}, _g190))
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
      local _g192
      if x == "and" then
        _g192 = {"%if", id, b, id}
      else
        _g192 = {"%if", id, id, b}
      end
      return(lower({"do", {"%local", id, a}, _g192}, hoist))
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
    local _g175 = args[2]
    local body = sub(args, 2)
    return(add(hoist, {kind, name, _g175, lower_body(body, true)}))
  end
  nexus["lumen/compiler"]["lower-definition"] = lower_definition
  local function lower_call(form, hoist)
    local _g176 = map(function (x)
      return(lower(x, hoist))
    end, form)
    if some63(_g176) then
      return(_g176)
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
    local _g177 = unstash({...})
    local all = _g177.all
    local m = module(spec)
    local frame = last(environment)
    local _g178 = m.export
    local k = nil
    for k in next, _g178 do
      if not number63(k) then
        local v = _g178[k]
        if v.export or all then
          frame[k] = v
        end
      end
    end
  end
  nexus["lumen/compiler"]["open-module"] = open_module
  local function load_module(spec, ...)
    local _g179 = unstash({...})
    local all = _g179.all
    if not module(spec) then
      _37compile_module(spec)
    end
    return(open_module(spec, {_stash = true, all = all}))
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
    local _g180 = specs or {}
    local _g181 = 0
    while _g181 < length(_g180) do
      local spec = _g180[_g181 + 1]
      load_module(spec)
      local m = module(spec)
      if m.alias then
        local _g182 = import_modules(m.alias)
        local aliased = _g182[1]
        local bs = _g182[2]
        imports = join(imports, aliased)
        bindings = join(bindings, bs)
      else
        local _g183 = imported(spec)
        add(imports, spec)
        bindings = join(bindings, _g183)
      end
      _g181 = _g181 + 1
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
  local _g193 = nexus["lumen/runtime"]
  local tanh = _g193.tanh
  local join = _g193.join
  local find = _g193.find
  local reduce = _g193.reduce
  local cos = _g193.cos
  local nil63 = _g193["nil?"]
  local empty63 = _g193["empty?"]
  local boolean63 = _g193["boolean?"]
  local char = _g193.char
  local is63 = _g193["is?"]
  local _37message_handler = _g193["%message-handler"]
  local abs = _g193.abs
  local search = _g193.search
  local list63 = _g193["list?"]
  local sort = _g193.sort
  local length = _g193.length
  local acos = _g193.acos
  local last = _g193.last
  local inner = _g193.inner
  local split = _g193.split
  local atan2 = _g193.atan2
  local string63 = _g193["string?"]
  local table63 = _g193["table?"]
  local function63 = _g193["function?"]
  local module = _g193.module
  local extend = _g193.extend
  local flat = _g193.flat
  local write = _g193.write
  local write_file = _g193["write-file"]
  local keep = _g193.keep
  local setenv = _g193.setenv
  local module_key = _g193["module-key"]
  local _37 = _g193["%"]
  local composite63 = _g193["composite?"]
  local make_id = _g193["make-id"]
  local cat = _g193.cat
  local reverse = _g193.reverse
  local pow = _g193.pow
  local flat1 = _g193.flat1
  local now = _g193.now
  local apply = _g193.apply
  local toplevel63 = _g193["toplevel?"]
  local string = _g193.string
  local replicate = _g193.replicate
  local today = _g193.today
  local _60 = _g193["<"]
  local exit = _g193.exit
  local keys63 = _g193["keys?"]
  local log10 = _g193.log10
  local add = _g193.add
  local substring = _g193.substring
  local string_literal63 = _g193["string-literal?"]
  local read_file = _g193["read-file"]
  local asin = _g193.asin
  local _6261 = _g193[">="]
  local sub = _g193.sub
  local number = _g193.number
  local exclude = _g193.exclude
  local stash = _g193.stash
  local space = _g193.space
  local max = _g193.max
  local _47 = _g193["/"]
  local hd = _g193.hd
  local none63 = _g193["none?"]
  local atan = _g193.atan
  local _43 = _g193["+"]
  local tl = _g193.tl
  local sqrt = _g193.sqrt
  local _6061 = _g193["<="]
  local unstash = _g193.unstash
  local map = _g193.map
  local atom63 = _g193["atom?"]
  local log = _g193.log
  local _61 = _g193["="]
  local _62 = _g193[">"]
  local sinh = _g193.sinh
  local random = _g193.random
  local drop = _g193.drop
  local some63 = _g193["some?"]
  local one63 = _g193["one?"]
  local iterate = _g193.iterate
  local splice = _g193.splice
  local min = _g193.min
  local tan = _g193.tan
  local floor = _g193.floor
  local number63 = _g193["number?"]
  local _42 = _g193["*"]
  local code = _g193.code
  local in63 = _g193["in?"]
  local _ = _g193["-"]
  local ceil = _g193.ceil
  local pair = _g193.pair
  local sin = _g193.sin
  local id_literal63 = _g193["id-literal?"]
  local _g196 = nexus["lumen/lib"]
  local mapo = _g196.mapo
  local indentation = _g196.indentation
  local getenv = _g196.getenv
  local bind = _g196.bind
  local macro_function = _g196["macro-function"]
  local initial_environment = _g196["initial-environment"]
  local imported = _g196.imported
  local symbol63 = _g196["symbol?"]
  local quote_modules = _g196["quote-modules"]
  local reserved63 = _g196["reserved?"]
  local macroexpand = _g196.macroexpand
  local id = _g196.id
  local linked = _g196.linked
  local statement63 = _g196["statement?"]
  local variable63 = _g196["variable?"]
  local special_form63 = _g196["special-form?"]
  local macro63 = _g196["macro?"]
  local quoted = _g196.quoted
  local bound63 = _g196["bound?"]
  local symbol_expansion = _g196["symbol-expansion"]
  local quote_environment = _g196["quote-environment"]
  local stash42 = _g196["stash*"]
  local bind42 = _g196["bind*"]
  local special63 = _g196["special?"]
  local quasiexpand = _g196.quasiexpand
  local valid_id63 = _g196["valid-id?"]
  local key = _g196.key
  local _g197 = nexus["lumen/compiler"]
  local load_module = _g197["load-module"]
  local compile = _g197.compile
  local compile_module = _g197["compile-module"]
  local import_modules = _g197["import-modules"]
  local in_module = _g197["in-module"]
  local declare = _g197.declare
  local compile_function = _g197["compile-function"]
  local eval = _g197.eval
  local open_module = _g197["open-module"]
end)();
(function ()
  nexus["lumen/core"] = {}
  local _g371 = nexus["lumen/runtime"]
  local tanh = _g371.tanh
  local join = _g371.join
  local find = _g371.find
  local reduce = _g371.reduce
  local cos = _g371.cos
  local nil63 = _g371["nil?"]
  local empty63 = _g371["empty?"]
  local boolean63 = _g371["boolean?"]
  local char = _g371.char
  local is63 = _g371["is?"]
  local _37message_handler = _g371["%message-handler"]
  local abs = _g371.abs
  local search = _g371.search
  local list63 = _g371["list?"]
  local sort = _g371.sort
  local length = _g371.length
  local acos = _g371.acos
  local last = _g371.last
  local inner = _g371.inner
  local split = _g371.split
  local atan2 = _g371.atan2
  local string63 = _g371["string?"]
  local table63 = _g371["table?"]
  local function63 = _g371["function?"]
  local module = _g371.module
  local extend = _g371.extend
  local flat = _g371.flat
  local write = _g371.write
  local write_file = _g371["write-file"]
  local keep = _g371.keep
  local setenv = _g371.setenv
  local module_key = _g371["module-key"]
  local _37 = _g371["%"]
  local composite63 = _g371["composite?"]
  local make_id = _g371["make-id"]
  local cat = _g371.cat
  local reverse = _g371.reverse
  local pow = _g371.pow
  local flat1 = _g371.flat1
  local now = _g371.now
  local apply = _g371.apply
  local toplevel63 = _g371["toplevel?"]
  local string = _g371.string
  local replicate = _g371.replicate
  local today = _g371.today
  local _60 = _g371["<"]
  local exit = _g371.exit
  local keys63 = _g371["keys?"]
  local log10 = _g371.log10
  local add = _g371.add
  local substring = _g371.substring
  local string_literal63 = _g371["string-literal?"]
  local read_file = _g371["read-file"]
  local asin = _g371.asin
  local _6261 = _g371[">="]
  local sub = _g371.sub
  local number = _g371.number
  local exclude = _g371.exclude
  local stash = _g371.stash
  local space = _g371.space
  local max = _g371.max
  local _47 = _g371["/"]
  local hd = _g371.hd
  local none63 = _g371["none?"]
  local atan = _g371.atan
  local _43 = _g371["+"]
  local tl = _g371.tl
  local sqrt = _g371.sqrt
  local _6061 = _g371["<="]
  local unstash = _g371.unstash
  local map = _g371.map
  local atom63 = _g371["atom?"]
  local log = _g371.log
  local _61 = _g371["="]
  local _62 = _g371[">"]
  local sinh = _g371.sinh
  local random = _g371.random
  local drop = _g371.drop
  local some63 = _g371["some?"]
  local one63 = _g371["one?"]
  local iterate = _g371.iterate
  local splice = _g371.splice
  local min = _g371.min
  local tan = _g371.tan
  local floor = _g371.floor
  local number63 = _g371["number?"]
  local _42 = _g371["*"]
  local code = _g371.code
  local in63 = _g371["in?"]
  local _ = _g371["-"]
  local ceil = _g371.ceil
  local pair = _g371.pair
  local sin = _g371.sin
  local id_literal63 = _g371["id-literal?"]
  local _g374 = nexus["lumen/lib"]
  local mapo = _g374.mapo
  local indentation = _g374.indentation
  local getenv = _g374.getenv
  local bind = _g374.bind
  local macro_function = _g374["macro-function"]
  local initial_environment = _g374["initial-environment"]
  local imported = _g374.imported
  local symbol63 = _g374["symbol?"]
  local quote_modules = _g374["quote-modules"]
  local reserved63 = _g374["reserved?"]
  local macroexpand = _g374.macroexpand
  local id = _g374.id
  local linked = _g374.linked
  local statement63 = _g374["statement?"]
  local variable63 = _g374["variable?"]
  local special_form63 = _g374["special-form?"]
  local macro63 = _g374["macro?"]
  local quoted = _g374.quoted
  local bound63 = _g374["bound?"]
  local symbol_expansion = _g374["symbol-expansion"]
  local quote_environment = _g374["quote-environment"]
  local stash42 = _g374["stash*"]
  local bind42 = _g374["bind*"]
  local special63 = _g374["special?"]
  local quasiexpand = _g374.quasiexpand
  local valid_id63 = _g374["valid-id?"]
  local key = _g374.key
  local _g375 = nexus["lumen/compiler"]
  local load_module = _g375["load-module"]
  local compile = _g375.compile
  local compile_module = _g375["compile-module"]
  local import_modules = _g375["import-modules"]
  local in_module = _g375["in-module"]
  local declare = _g375.declare
  local compile_function = _g375["compile-function"]
  local eval = _g375.eval
  local open_module = _g375["open-module"]
  target = "lua"
end)();
(function ()
  nexus["lumen/boot"] = {}
  local _g673 = nexus["lumen/runtime"]
  local tanh = _g673.tanh
  local join = _g673.join
  local find = _g673.find
  local reduce = _g673.reduce
  local cos = _g673.cos
  local nil63 = _g673["nil?"]
  local empty63 = _g673["empty?"]
  local boolean63 = _g673["boolean?"]
  local char = _g673.char
  local is63 = _g673["is?"]
  local _37message_handler = _g673["%message-handler"]
  local abs = _g673.abs
  local search = _g673.search
  local list63 = _g673["list?"]
  local sort = _g673.sort
  local length = _g673.length
  local acos = _g673.acos
  local last = _g673.last
  local inner = _g673.inner
  local split = _g673.split
  local atan2 = _g673.atan2
  local string63 = _g673["string?"]
  local table63 = _g673["table?"]
  local function63 = _g673["function?"]
  local module = _g673.module
  local extend = _g673.extend
  local flat = _g673.flat
  local write = _g673.write
  local write_file = _g673["write-file"]
  local keep = _g673.keep
  local setenv = _g673.setenv
  local module_key = _g673["module-key"]
  local _37 = _g673["%"]
  local composite63 = _g673["composite?"]
  local make_id = _g673["make-id"]
  local cat = _g673.cat
  local reverse = _g673.reverse
  local pow = _g673.pow
  local flat1 = _g673.flat1
  local now = _g673.now
  local apply = _g673.apply
  local toplevel63 = _g673["toplevel?"]
  local string = _g673.string
  local replicate = _g673.replicate
  local today = _g673.today
  local _60 = _g673["<"]
  local exit = _g673.exit
  local keys63 = _g673["keys?"]
  local log10 = _g673.log10
  local add = _g673.add
  local substring = _g673.substring
  local string_literal63 = _g673["string-literal?"]
  local read_file = _g673["read-file"]
  local asin = _g673.asin
  local _6261 = _g673[">="]
  local sub = _g673.sub
  local number = _g673.number
  local exclude = _g673.exclude
  local stash = _g673.stash
  local space = _g673.space
  local max = _g673.max
  local _47 = _g673["/"]
  local hd = _g673.hd
  local none63 = _g673["none?"]
  local atan = _g673.atan
  local _43 = _g673["+"]
  local tl = _g673.tl
  local sqrt = _g673.sqrt
  local _6061 = _g673["<="]
  local unstash = _g673.unstash
  local map = _g673.map
  local atom63 = _g673["atom?"]
  local log = _g673.log
  local _61 = _g673["="]
  local _62 = _g673[">"]
  local sinh = _g673.sinh
  local random = _g673.random
  local drop = _g673.drop
  local some63 = _g673["some?"]
  local one63 = _g673["one?"]
  local iterate = _g673.iterate
  local splice = _g673.splice
  local min = _g673.min
  local tan = _g673.tan
  local floor = _g673.floor
  local number63 = _g673["number?"]
  local _42 = _g673["*"]
  local code = _g673.code
  local in63 = _g673["in?"]
  local _ = _g673["-"]
  local ceil = _g673.ceil
  local pair = _g673.pair
  local sin = _g673.sin
  local id_literal63 = _g673["id-literal?"]
  local _g676 = nexus["lumen/lib"]
  local mapo = _g676.mapo
  local indentation = _g676.indentation
  local getenv = _g676.getenv
  local bind = _g676.bind
  local macro_function = _g676["macro-function"]
  local initial_environment = _g676["initial-environment"]
  local imported = _g676.imported
  local symbol63 = _g676["symbol?"]
  local quote_modules = _g676["quote-modules"]
  local reserved63 = _g676["reserved?"]
  local macroexpand = _g676.macroexpand
  local id = _g676.id
  local linked = _g676.linked
  local statement63 = _g676["statement?"]
  local variable63 = _g676["variable?"]
  local special_form63 = _g676["special-form?"]
  local macro63 = _g676["macro?"]
  local quoted = _g676.quoted
  local bound63 = _g676["bound?"]
  local symbol_expansion = _g676["symbol-expansion"]
  local quote_environment = _g676["quote-environment"]
  local stash42 = _g676["stash*"]
  local bind42 = _g676["bind*"]
  local special63 = _g676["special?"]
  local quasiexpand = _g676.quasiexpand
  local valid_id63 = _g676["valid-id?"]
  local key = _g676.key
  local _g677 = nexus["lumen/compiler"]
  local load_module = _g677["load-module"]
  local compile = _g677.compile
  local compile_module = _g677["compile-module"]
  local import_modules = _g677["import-modules"]
  local in_module = _g677["in-module"]
  local declare = _g677.declare
  local compile_function = _g677["compile-function"]
  local eval = _g677.eval
  local open_module = _g677["open-module"]
  modules = {lumen = {import = {{"lumen", "special"}}, export = {}, alias = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}}}, ["lumen/boot"] = {import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}, {"lumen", "lib"}, {"lumen", "compiler"}}, export = {modules = {global = true, export = true}, ["%initial-environment"] = {macro = function ()
    return(quote_environment(initial_environment()))
  end}, ["%initial-modules"] = {macro = function ()
    return(quote_modules())
  end}}}, ["lumen/reader"] = {import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}}, export = {["read-from-string"] = {export = true, variable = true}, ["define-reader"] = {export = true, macro = function (_g690, ...)
    local char = _g690[1]
    local stream = _g690[2]
    local body = unstash({...})
    local _g691 = sub(body, 0)
    return({"set", {"get", "read-table", char}, join({"fn", {stream}}, _g691)})
  end}, whitespace = {variable = true}, ["peek-char"] = {variable = true}, delimiters = {variable = true}, ["read-all"] = {export = true, variable = true}, eof = {variable = true}, ["flag?"] = {variable = true}, ["read-char"] = {variable = true}, ["key?"] = {variable = true}, ["skip-non-code"] = {variable = true}, read = {export = true, variable = true}, ["make-stream"] = {export = true, variable = true}, ["read-table"] = {export = true, variable = true}}}, user = {import = {"lumen", {"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}}, export = {}}, ["lumen/core"] = {import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}, {"lumen", "lib"}, {"lumen", "compiler"}}, export = {define = {export = true, macro = function (name, x, ...)
    local body = unstash({...})
    local _g692 = sub(body, 0)
    setenv(name, {_stash = true, variable = true})
    if some63(_g692) and target == "js" then
      return(linked(name, {"%local", name, join({"fn", x}, _g692)}))
    else
      if some63(_g692) then
        local _g693 = bind42(x, _g692)
        local args = _g693[1]
        local _g694 = _g693[2]
        return(linked(name, join({"%local-function", name, args}, _g694)))
      else
        return(linked(name, {"%local", name, x}))
      end
    end
  end}, let = {export = true, macro = function (bindings, ...)
    local body = unstash({...})
    local _g695 = sub(body, 0)
    if length(bindings) < 2 then
      return(join({"do"}, _g695))
    else
      local renames = {}
      local locals = {}
      local lh = bindings[1]
      local rh = bindings[2]
      local _g696 = bind(lh, rh)
      local _g697 = 0
      while _g697 < length(_g696) do
        local _g698 = _g696[_g697 + 1]
        local id = _g698[1]
        local val = _g698[2]
        if bound63(id) or reserved63(id) or toplevel63() then
          local id1 = make_id()
          add(renames, id)
          add(renames, id1)
          id = id1
        else
          setenv(id, {_stash = true, variable = true})
        end
        add(locals, {"%local", id, val})
        _g697 = _g697 + 1
      end
      return(join({"do"}, join(locals, {{"let-symbol", renames, join({"let", sub(bindings, 2)}, _g695)}})))
    end
  end}, quasiquote = {export = true, macro = function (form)
    return(quasiexpand(form, 1))
  end}, ["define-macro"] = {export = true, macro = function (name, args, ...)
    local body = unstash({...})
    local _g699 = sub(body, 0)
    local form = join({"fn", args}, _g699)
    local _g700 = {"setenv", {"quote", name}}
    _g700.macro = form
    _g700.form = {"quote", form}
    eval(_g700)
    return(nil)
  end}, ["with-frame"] = {export = true, macro = function (...)
    local body = unstash({...})
    local _g701 = sub(body, 0)
    local scope = body.scope
    local x = make_id()
    local _g702 = {"table"}
    _g702._scope = scope
    return({"do", {"add", "environment", _g702}, {"let", {x, join({"do"}, _g701)}, {"drop", "environment"}, x}})
  end}, ["if"] = {export = true, macro = function (...)
    local branches = unstash({...})
    local function step(_g703)
      local a = _g703[1]
      local b = _g703[2]
      local c = sub(_g703, 2)
      if is63(b) then
        return({join({"%if", a, b}, step(c))})
      else
        if is63(a) then
          return({a})
        end
      end
    end
    return(hd(step(branches)))
  end}, ["set*"] = {export = true, macro = function (name, value)
    return(linked(name, {"set", name, value}))
  end}, ["define-special"] = {export = true, macro = function (name, args, ...)
    local body = unstash({...})
    local _g704 = sub(body, 0)
    local form = join({"fn", args}, _g704)
    local keys = sub(_g704, length(_g704))
    local _g705 = {"setenv", {"quote", name}}
    _g705.form = {"quote", form}
    _g705.special = form
    eval(join(_g705, keys))
    return(nil)
  end}, pr = {export = true, macro = function (...)
    local xs = unstash({...})
    return({"print", space(xs)})
  end}, ["define-module"] = {export = true, macro = function (spec, ...)
    local body = unstash({...})
    local _g706 = sub(body, 0)
    local imp = _g706.import
    local exp = _g706.export
    local alias = _g706.alias
    local _g707 = import_modules(imp)
    local imports = _g707[1]
    local bindings = _g707[2]
    local k = module_key(spec)
    modules[k] = {import = imports, export = {}, alias = alias}
    local _g708 = exp or {}
    local _g709 = 0
    while _g709 < length(_g708) do
      local x = _g708[_g709 + 1]
      setenv(x, {_stash = true, export = true})
      _g709 = _g709 + 1
    end
    return(join({"do", {"set", {"get", "nexus", {"quote", k}}, {"table"}}}, bindings))
  end}, inc = {export = true, macro = function (n, by)
    return({"set", n, {"+", n, by or 1}})
  end}, ["cat!"] = {export = true, macro = function (a, ...)
    local bs = unstash({...})
    local _g710 = sub(bs, 0)
    return({"set", a, join({"cat", a}, _g710)})
  end}, quote = {export = true, macro = function (form)
    return(quoted(form))
  end}, list = {export = true, macro = function (...)
    local body = unstash({...})
    local l = join({"%array"}, body)
    if not keys63(body) then
      return(l)
    else
      local id = make_id()
      local init = {}
      local _g711 = body
      local k = nil
      for k in next, _g711 do
        if not number63(k) then
          local v = _g711[k]
          add(init, {"set", {"get", id, {"quote", k}}, v})
        end
      end
      return(join({"let", {id, l}}, join(init, {id})))
    end
  end}, ["join!"] = {export = true, macro = function (a, ...)
    local bs = unstash({...})
    local _g712 = sub(bs, 0)
    return({"set", a, join({"join*", a}, _g712)})
  end}, language = {export = true, macro = function ()
    return({"quote", target})
  end}, target = {macro = function (...)
    local clauses = unstash({...})
    return(clauses[target])
  end, export = true, global = true}, ["define*"] = {export = true, macro = function (name, x, ...)
    local body = unstash({...})
    local _g713 = sub(body, 0)
    setenv(name, {_stash = true, global = true, export = true})
    if some63(_g713) then
      local _g714 = bind42(x, _g713)
      local args = _g714[1]
      local _g715 = _g714[2]
      return(join({"%global-function", name, args}, _g715))
    else
      if target == "js" then
        return({"set", {"get", "global", {"quote", id(name)}}, x})
      else
        return({"set", name, x})
      end
    end
  end}, fn = {export = true, macro = function (args, ...)
    local body = unstash({...})
    local _g716 = sub(body, 0)
    local _g717 = bind42(args, _g716)
    local _g718 = _g717[1]
    local _g719 = _g717[2]
    return(join({"%function", _g718}, _g719))
  end}, ["join*"] = {export = true, macro = function (...)
    local xs = unstash({...})
    return(reduce(function (a, b)
      return({"join", a, b})
    end, xs))
  end}, when = {export = true, macro = function (cond, ...)
    local body = unstash({...})
    local _g720 = sub(body, 0)
    return({"if", cond, join({"do"}, _g720)})
  end}, table = {export = true, macro = function (...)
    local body = unstash({...})
    return(join({"%object"}, mapo(function (x)
      return(x)
    end, body)))
  end}, ["set-of"] = {export = true, macro = function (...)
    local xs = unstash({...})
    local l = {}
    local _g721 = xs
    local _g722 = 0
    while _g722 < length(_g721) do
      local x = _g721[_g722 + 1]
      l[x] = true
      _g722 = _g722 + 1
    end
    return(join({"table"}, l))
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
  end}, ["let-symbol"] = {export = true, macro = function (expansions, ...)
    local body = unstash({...})
    local _g723 = sub(body, 0)
    add(environment, {})
    map(function (_g725)
      local name = _g725[1]
      local exp = _g725[2]
      return(macroexpand({"define-symbol", name, exp}))
    end, pair(expansions))
    local _g724 = join({"do"}, macroexpand(_g723))
    drop(environment)
    return(_g724)
  end}, ["define-symbol"] = {export = true, macro = function (name, expansion)
    setenv(name, {_stash = true, symbol = expansion})
    return(nil)
  end}, at = {export = true, macro = function (l, i)
    if target == "lua" and number63(i) then
      i = i + 1
    else
      if target == "lua" then
        i = {"+", i, 1}
      end
    end
    return({"get", l, i})
  end}, ["with-bindings"] = {export = true, macro = function (_g726, ...)
    local names = _g726[1]
    local body = unstash({...})
    local _g727 = sub(body, 0)
    local x = make_id()
    local _g729 = {"setenv", x}
    _g729.variable = true
    local _g728 = {"with-frame", {"each", {x}, names, _g729}}
    _g728.scope = true
    return(join(_g728, _g727))
  end}, unless = {export = true, macro = function (cond, ...)
    local body = unstash({...})
    local _g730 = sub(body, 0)
    return({"if", {"not", cond}, join({"do"}, _g730)})
  end}, ["let-macro"] = {export = true, macro = function (definitions, ...)
    local body = unstash({...})
    local _g731 = sub(body, 0)
    add(environment, {})
    map(function (m)
      return(macroexpand(join({"define-macro"}, m)))
    end, definitions)
    local _g732 = join({"do"}, macroexpand(_g731))
    drop(environment)
    return(_g732)
  end}, each = {export = true, macro = function (b, t, ...)
    local body = unstash({...})
    local _g733 = sub(body, 0)
    local k = b[1]
    local v = b[2]
    local t1 = make_id()
    local _g759
    if nil63(v) then
      local _g760
      if b.i then
        _g760 = "i"
      else
        _g760 = make_id()
      end
      local i = _g760
      _g759 = {"let", {i, 0}, {"while", {"<", i, {"length", t1}}, join({"let", {k, {"at", t1, i}}}, _g733), {"inc", i}}}
    else
      local _g734 = {"target"}
      _g734.lua = {"not", {"number?", k}}
      _g734.js = {"isNaN", {"parseInt", k}}
      _g759 = {"let", {k, "nil"}, {"%for", t1, k, {"when", _g734, join({"let", {v, {"get", t1, k}}}, _g733)}}}
    end
    return({"let", {t1, t}, _g759})
  end}}}, ["lumen/compiler"] = {import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}, {"lumen", "lib"}, {"lumen", "reader"}}, export = {["lower-body"] = {variable = true}, precedence = {variable = true}, ["module-path"] = {variable = true}, terminator = {variable = true}, ["lower-short"] = {variable = true}, ["load-module"] = {export = true, variable = true}, ["compile-atom"] = {variable = true}, ["op-delims"] = {variable = true}, compile = {export = true, variable = true}, infix = {variable = true}, ["compile-module"] = {export = true, variable = true}, lower = {variable = true}, ["lower-infix?"] = {variable = true}, ["%result"] = {global = true, export = true}, ["import-modules"] = {export = true, variable = true}, getop = {variable = true}, ["in-module"] = {export = true, variable = true}, reimported = {variable = true}, ["%compile-module"] = {variable = true}, conclude = {variable = true}, ["current-module"] = {global = true, export = true}, ["lower-call"] = {variable = true}, ["compiling?"] = {variable = true}, ["lower-while"] = {variable = true}, run = {variable = true}, ["compile-call"] = {variable = true}, ["compile-infix"] = {variable = true}, process = {variable = true}, ["can-return?"] = {variable = true}, ["parenthesize-call?"] = {variable = true}, ["compile-args"] = {variable = true}, ["lower-definition"] = {variable = true}, ["compile-special"] = {variable = true}, ["lower-try"] = {variable = true}, encapsulate = {variable = true}, ["lower-statement"] = {variable = true}, declare = {export = true, variable = true}, ["compile-function"] = {export = true, variable = true}, ["lower-infix"] = {variable = true}, ["compiler-output"] = {variable = true}, ["lower-if"] = {variable = true}, ["lower-function"] = {variable = true}, ["lower-do"] = {variable = true}, ["compile-file"] = {variable = true}, eval = {export = true, variable = true}, ["lower-for"] = {variable = true}, ["open-module"] = {export = true, variable = true}, ["infix?"] = {variable = true}, ["lower-special"] = {variable = true}, ["unary?"] = {variable = true}}}, ["lumen/runtime"] = {import = {{"lumen", "special"}, {"lumen", "core"}}, export = {tanh = {export = true, variable = true}, join = {export = true, variable = true}, find = {export = true, variable = true}, reduce = {export = true, variable = true}, cos = {export = true, variable = true}, ["nil?"] = {export = true, variable = true}, ["empty?"] = {export = true, variable = true}, ["boolean?"] = {export = true, variable = true}, char = {export = true, variable = true}, ["is?"] = {export = true, variable = true}, ["%message-handler"] = {export = true, variable = true}, abs = {export = true, variable = true}, search = {export = true, variable = true}, ["list?"] = {export = true, variable = true}, sort = {export = true, variable = true}, length = {export = true, variable = true}, acos = {export = true, variable = true}, last = {export = true, variable = true}, inner = {export = true, variable = true}, split = {export = true, variable = true}, atan2 = {export = true, variable = true}, ["string?"] = {export = true, variable = true}, ["table?"] = {export = true, variable = true}, math = {variable = true}, ["function?"] = {export = true, variable = true}, ["id-count"] = {variable = true}, module = {export = true, variable = true}, extend = {export = true, variable = true}, flat = {export = true, variable = true}, write = {export = true, variable = true}, ["write-file"] = {export = true, variable = true}, keep = {export = true, variable = true}, ["min*"] = {variable = true}, ["max*"] = {variable = true}, setenv = {export = true, variable = true}, mapl = {variable = true}, ["module-key"] = {export = true, variable = true}, ["%"] = {export = true, variable = true}, ["composite?"] = {export = true, variable = true}, ["make-id"] = {export = true, variable = true}, cat = {export = true, variable = true}, reverse = {export = true, variable = true}, pow = {export = true, variable = true}, flat1 = {export = true, variable = true}, now = {export = true, variable = true}, apply = {export = true, variable = true}, ["toplevel?"] = {export = true, variable = true}, string = {export = true, variable = true}, replicate = {export = true, variable = true}, today = {export = true, variable = true}, ["<"] = {export = true, variable = true}, exit = {export = true, variable = true}, ["keys?"] = {export = true, variable = true}, subl = {variable = true}, log10 = {export = true, variable = true}, add = {export = true, variable = true}, substring = {export = true, variable = true}, ["string-literal?"] = {export = true, variable = true}, ["read-file"] = {export = true, variable = true}, asin = {export = true, variable = true}, [">="] = {export = true, variable = true}, sub = {export = true, variable = true}, number = {export = true, variable = true}, exclude = {export = true, variable = true}, stash = {export = true, variable = true}, space = {export = true, variable = true}, max = {export = true, variable = true}, ["/"] = {export = true, variable = true}, hd = {export = true, variable = true}, ["none?"] = {export = true, variable = true}, atan = {export = true, variable = true}, ["+"] = {export = true, variable = true}, tl = {export = true, variable = true}, sqrt = {export = true, variable = true}, ["splice?"] = {variable = true}, ["<="] = {export = true, variable = true}, unstash = {export = true, variable = true}, map = {export = true, variable = true}, ["atom?"] = {export = true, variable = true}, log = {export = true, variable = true}, ["="] = {export = true, variable = true}, [">"] = {export = true, variable = true}, sinh = {export = true, variable = true}, random = {export = true, variable = true}, drop = {export = true, variable = true}, ["some?"] = {export = true, variable = true}, ["one?"] = {export = true, variable = true}, iterate = {export = true, variable = true}, splice = {export = true, variable = true}, min = {export = true, variable = true}, tan = {export = true, variable = true}, floor = {export = true, variable = true}, ["number?"] = {export = true, variable = true}, ["*"] = {export = true, variable = true}, code = {export = true, variable = true}, ["in?"] = {export = true, variable = true}, ["-"] = {export = true, variable = true}, ceil = {export = true, variable = true}, pair = {export = true, variable = true}, sin = {export = true, variable = true}, ["id-literal?"] = {export = true, variable = true}}}, ["lumen/special"] = {import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}, {"lumen", "lib"}, {"lumen", "compiler"}}, export = {["%if"] = {export = true, tr = true, special = function (cond, cons, alt)
    local _g735 = compile(cond)
    indent_level = indent_level + 1
    local _g737 = compile(cons, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local _g736 = _g737
    local _g761
    if alt then
      indent_level = indent_level + 1
      local _g739 = compile(alt, {_stash = true, stmt = true})
      indent_level = indent_level - 1
      _g761 = _g739
    end
    local _g738 = _g761
    local ind = indentation()
    local str = ""
    if target == "js" then
      str = str .. ind .. "if (" .. _g735 .. ") {\n" .. _g736 .. ind .. "}"
    else
      str = str .. ind .. "if " .. _g735 .. " then\n" .. _g736
    end
    if _g738 and target == "js" then
      str = str .. " else {\n" .. _g738 .. ind .. "}"
    else
      if _g738 then
        str = str .. ind .. "else\n" .. _g738
      end
    end
    if target == "lua" then
      return(str .. ind .. "end\n")
    else
      return(str .. "\n")
    end
  end, foo = true, stmt = true}, ["%for"] = {export = true, tr = true, special = function (t, k, form)
    local _g740 = compile(t)
    local ind = indentation()
    indent_level = indent_level + 1
    local _g741 = compile(form, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local body = _g741
    if target == "lua" then
      return(ind .. "for " .. k .. " in next, " .. _g740 .. " do\n" .. body .. ind .. "end\n")
    else
      return(ind .. "for (" .. k .. " in " .. _g740 .. ") {\n" .. body .. ind .. "}\n")
    end
  end, foo = true, stmt = true}, ["%array"] = {special = function (...)
    local forms = unstash({...})
    local _g762
    if target == "lua" then
      _g762 = "{"
    else
      _g762 = "["
    end
    local open = _g762
    local _g763
    if target == "lua" then
      _g763 = "}"
    else
      _g763 = "]"
    end
    local close = _g763
    local str = ""
    local _g742 = forms
    local i = 0
    while i < length(_g742) do
      local x = _g742[i + 1]
      str = str .. compile(x)
      if i < length(forms) - 1 then
        str = str .. ", "
      end
      i = i + 1
    end
    return(open .. str .. close)
  end, export = true, foo = true}, ["%try"] = {export = true, tr = true, special = function (form)
    local ind = indentation()
    indent_level = indent_level + 1
    local _g743 = compile(form, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local body = _g743
    local e = make_id()
    local hf = {"return", {"%array", false, {"get", e, "\"message\""}}}
    indent_level = indent_level + 1
    local _g744 = compile(hf, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local h = _g744
    return(ind .. "try {\n" .. body .. ind .. "}\n" .. ind .. "catch (" .. e .. ") {\n" .. h .. ind .. "}\n")
  end, foo = true, stmt = true}, set = {special = function (lh, rh)
    local _g745 = compile(lh)
    local _g764
    if nil63(rh) then
      _g764 = "nil"
    else
      _g764 = rh
    end
    local _g746 = compile(_g764)
    return(indentation() .. _g745 .. " = " .. _g746)
  end, stmt = true, export = true, foo = true}, error = {special = function (x)
    local _g765
    if target == "js" then
      _g765 = "throw new " .. compile({"Error", x})
    else
      _g765 = "error(" .. compile(x) .. ")"
    end
    local e = _g765
    return(indentation() .. e)
  end, stmt = true, export = true, foo = true}, ["not"] = {}, ["return"] = {special = function (x)
    local _g766
    if nil63(x) then
      _g766 = "return"
    else
      _g766 = "return(" .. compile(x) .. ")"
    end
    local _g747 = _g766
    return(indentation() .. _g747)
  end, stmt = true, export = true, foo = true}, ["%object"] = {special = function (...)
    local forms = unstash({...})
    local str = "{"
    local _g767
    if target == "lua" then
      _g767 = " = "
    else
      _g767 = ": "
    end
    local sep = _g767
    local pairs = pair(forms)
    local n_1 = length(pairs) - 1
    local _g748 = pairs
    local i = 0
    while i < length(_g748) do
      local _g749 = _g748[i + 1]
      local k = _g749[1]
      local v = _g749[2]
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
  end, export = true, foo = true}, ["%global-function"] = {export = true, tr = true, special = function (name, args, body)
    if target == "lua" then
      local x = compile_function(args, body, {_stash = true, name = name})
      return(indentation() .. x)
    else
      return(compile({"set", name, {"%function", args, body}}, {_stash = true, stmt = true}))
    end
  end, foo = true, stmt = true}, ["do"] = {export = true, tr = true, special = function (...)
    local forms = unstash({...})
    local str = ""
    local _g750 = forms
    local _g751 = 0
    while _g751 < length(_g750) do
      local x = _g750[_g751 + 1]
      str = str .. compile(x, {_stash = true, stmt = true})
      _g751 = _g751 + 1
    end
    return(str)
  end, foo = true, stmt = true}, ["while"] = {export = true, tr = true, special = function (cond, form)
    local _g752 = compile(cond)
    indent_level = indent_level + 1
    local _g753 = compile(form, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local body = _g753
    local ind = indentation()
    if target == "js" then
      return(ind .. "while (" .. _g752 .. ") {\n" .. body .. ind .. "}\n")
    else
      return(ind .. "while " .. _g752 .. " do\n" .. body .. ind .. "end\n")
    end
  end, foo = true, stmt = true}, ["break"] = {special = function ()
    return(indentation() .. "break")
  end, stmt = true, export = true, foo = true}, ["%local-function"] = {export = true, tr = true, special = function (name, args, body)
    local x = compile_function(args, body, {_stash = true, name = name, prefix = "local "})
    return(indentation() .. x)
  end, foo = true, stmt = true}, ["%local"] = {special = function (name, value)
    local id = compile(name)
    local value1 = compile(value)
    local _g768
    if is63(value) then
      _g768 = " = " .. value1
    else
      _g768 = ""
    end
    local rh = _g768
    local _g769
    if target == "js" then
      _g769 = "var "
    else
      _g769 = "local "
    end
    local keyword = _g769
    local ind = indentation()
    return(ind .. keyword .. id .. rh)
  end, stmt = true, export = true, foo = true}, ["%function"] = {special = function (args, body)
    return(compile_function(args, body))
  end, export = true, foo = true}, get = {special = function (t, k)
    local _g754 = compile(t)
    local k1 = compile(k)
    if target == "lua" and char(_g754, 0) == "{" then
      _g754 = "(" .. _g754 .. ")"
    end
    if string_literal63(k) and valid_id63(inner(k)) then
      return(_g754 .. "." .. inner(k))
    else
      return(_g754 .. "[" .. k1 .. "]")
    end
  end, export = true, foo = true}}}, ["lumen/lib"] = {import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}}, export = {mapo = {export = true, variable = true}, indentation = {export = true, variable = true}, ["quasiquote-list"] = {variable = true}, getenv = {export = true, variable = true}, bind = {export = true, variable = true}, ["can-unquote?"] = {variable = true}, ["indent-level"] = {global = true, export = true}, ["macro-function"] = {export = true, variable = true}, ["initial-environment"] = {export = true, variable = true}, imported = {export = true, variable = true}, ["symbol?"] = {export = true, variable = true}, ["valid-code?"] = {variable = true}, ["quote-modules"] = {export = true, variable = true}, ["with-indent"] = {export = true, macro = function (form)
    local result = make_id()
    return({"do", {"inc", "indent-level"}, {"let", {result, form}, {"dec", "indent-level"}, result}})
  end}, ["reserved?"] = {export = true, variable = true}, macroexpand = {export = true, variable = true}, escape = {variable = true}, id = {export = true, variable = true}, ["quote-binding"] = {variable = true}, linked = {export = true, variable = true}, ["statement?"] = {export = true, variable = true}, ["numeric?"] = {variable = true}, ["variable?"] = {export = true, variable = true}, ["quasiquoting?"] = {variable = true}, ["quote-module"] = {variable = true}, ["special-form?"] = {export = true, variable = true}, ["macro?"] = {export = true, variable = true}, quoted = {export = true, variable = true}, reserved = {variable = true}, ["bound?"] = {export = true, variable = true}, ["quoting?"] = {variable = true}, ["quote-frame"] = {variable = true}, literal = {variable = true}, ["global?"] = {variable = true}, ["symbol-expansion"] = {export = true, variable = true}, ["quasisplice?"] = {variable = true}, ["quote-environment"] = {export = true, variable = true}, ["stash*"] = {export = true, variable = true}, ["bind*"] = {export = true, variable = true}, ["special?"] = {export = true, variable = true}, quasiexpand = {export = true, variable = true}, ["valid-id?"] = {export = true, variable = true}, key = {export = true, variable = true}}}, ["lumen/main"] = {import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}, {"lumen", "reader"}, {"lumen", "compiler"}}, export = {}}, ["lumen/system"] = {import = {{"lumen", "special"}, {"lumen", "core"}}, export = {nexus = {global = true, export = true}}}}
  environment = {{["define-module"] = {export = true, macro = function (spec, ...)
    local body = unstash({...})
    local _g755 = sub(body, 0)
    local imp = _g755.import
    local exp = _g755.export
    local alias = _g755.alias
    local _g756 = import_modules(imp)
    local imports = _g756[1]
    local bindings = _g756[2]
    local k = module_key(spec)
    modules[k] = {import = imports, export = {}, alias = alias}
    local _g757 = exp or {}
    local _g758 = 0
    while _g758 < length(_g757) do
      local x = _g757[_g758 + 1]
      setenv(x, {_stash = true, export = true})
      _g758 = _g758 + 1
    end
    return(join({"do", {"set", {"get", "nexus", {"quote", k}}, {"table"}}}, bindings))
  end}}}
end)();
(function ()
  nexus.user = {}
  local _g770 = nexus["lumen/runtime"]
  local tanh = _g770.tanh
  local join = _g770.join
  local find = _g770.find
  local reduce = _g770.reduce
  local cos = _g770.cos
  local nil63 = _g770["nil?"]
  local empty63 = _g770["empty?"]
  local boolean63 = _g770["boolean?"]
  local char = _g770.char
  local is63 = _g770["is?"]
  local _37message_handler = _g770["%message-handler"]
  local abs = _g770.abs
  local search = _g770.search
  local list63 = _g770["list?"]
  local sort = _g770.sort
  local length = _g770.length
  local acos = _g770.acos
  local last = _g770.last
  local inner = _g770.inner
  local split = _g770.split
  local atan2 = _g770.atan2
  local string63 = _g770["string?"]
  local table63 = _g770["table?"]
  local function63 = _g770["function?"]
  local module = _g770.module
  local extend = _g770.extend
  local flat = _g770.flat
  local write = _g770.write
  local write_file = _g770["write-file"]
  local keep = _g770.keep
  local setenv = _g770.setenv
  local module_key = _g770["module-key"]
  local _37 = _g770["%"]
  local composite63 = _g770["composite?"]
  local make_id = _g770["make-id"]
  local cat = _g770.cat
  local reverse = _g770.reverse
  local pow = _g770.pow
  local flat1 = _g770.flat1
  local now = _g770.now
  local apply = _g770.apply
  local toplevel63 = _g770["toplevel?"]
  local string = _g770.string
  local replicate = _g770.replicate
  local today = _g770.today
  local _60 = _g770["<"]
  local exit = _g770.exit
  local keys63 = _g770["keys?"]
  local log10 = _g770.log10
  local add = _g770.add
  local substring = _g770.substring
  local string_literal63 = _g770["string-literal?"]
  local read_file = _g770["read-file"]
  local asin = _g770.asin
  local _6261 = _g770[">="]
  local sub = _g770.sub
  local number = _g770.number
  local exclude = _g770.exclude
  local stash = _g770.stash
  local space = _g770.space
  local max = _g770.max
  local _47 = _g770["/"]
  local hd = _g770.hd
  local none63 = _g770["none?"]
  local atan = _g770.atan
  local _43 = _g770["+"]
  local tl = _g770.tl
  local sqrt = _g770.sqrt
  local _6061 = _g770["<="]
  local unstash = _g770.unstash
  local map = _g770.map
  local atom63 = _g770["atom?"]
  local log = _g770.log
  local _61 = _g770["="]
  local _62 = _g770[">"]
  local sinh = _g770.sinh
  local random = _g770.random
  local drop = _g770.drop
  local some63 = _g770["some?"]
  local one63 = _g770["one?"]
  local iterate = _g770.iterate
  local splice = _g770.splice
  local min = _g770.min
  local tan = _g770.tan
  local floor = _g770.floor
  local number63 = _g770["number?"]
  local _42 = _g770["*"]
  local code = _g770.code
  local in63 = _g770["in?"]
  local _ = _g770["-"]
  local ceil = _g770.ceil
  local pair = _g770.pair
  local sin = _g770.sin
  local id_literal63 = _g770["id-literal?"]
end)();
(function ()
  nexus["lumen/main"] = {}
  local _g2 = nexus["lumen/runtime"]
  local tanh = _g2.tanh
  local join = _g2.join
  local find = _g2.find
  local asin = _g2.asin
  local cos = _g2.cos
  local nil63 = _g2["nil?"]
  local empty63 = _g2["empty?"]
  local boolean63 = _g2["boolean?"]
  local sinh = _g2.sinh
  local is63 = _g2["is?"]
  local _37message_handler = _g2["%message-handler"]
  local abs = _g2.abs
  local search = _g2.search
  local floor = _g2.floor
  local sort = _g2.sort
  local length = _g2.length
  local acos = _g2.acos
  local last = _g2.last
  local none63 = _g2["none?"]
  local split = _g2.split
  local atan2 = _g2.atan2
  local string63 = _g2["string?"]
  local table63 = _g2["table?"]
  local function63 = _g2["function?"]
  local module = _g2.module
  local unstash = _g2.unstash
  local flat = _g2.flat
  local write = _g2.write
  local write_file = _g2["write-file"]
  local keep = _g2.keep
  local setenv = _g2.setenv
  local module_key = _g2["module-key"]
  local _37 = _g2["%"]
  local composite63 = _g2["composite?"]
  local make_id = _g2["make-id"]
  local cat = _g2.cat
  local sqrt = _g2.sqrt
  local pow = _g2.pow
  local flat1 = _g2.flat1
  local now = _g2.now
  local apply = _g2.apply
  local toplevel63 = _g2["toplevel?"]
  local string = _g2.string
  local sub = _g2.sub
  local today = _g2.today
  local _60 = _g2["<"]
  local exit = _g2.exit
  local keys63 = _g2["keys?"]
  local log10 = _g2.log10
  local add = _g2.add
  local substring = _g2.substring
  local string_literal63 = _g2["string-literal?"]
  local read_file = _g2["read-file"]
  local stash = _g2.stash
  local _6261 = _g2[">="]
  local replicate = _g2.replicate
  local number = _g2.number
  local exclude = _g2.exclude
  local iterate = _g2.iterate
  local space = _g2.space
  local max = _g2.max
  local _47 = _g2["/"]
  local char = _g2.char
  local list63 = _g2["list?"]
  local atan = _g2.atan
  local _43 = _g2["+"]
  local tl = _g2.tl
  local extend = _g2.extend
  local _6061 = _g2["<="]
  local reduce = _g2.reduce
  local map = _g2.map
  local ceil = _g2.ceil
  local log = _g2.log
  local _61 = _g2["="]
  local _62 = _g2[">"]
  local number63 = _g2["number?"]
  local random = _g2.random
  local drop = _g2.drop
  local some63 = _g2["some?"]
  local one63 = _g2["one?"]
  local in63 = _g2["in?"]
  local splice = _g2.splice
  local min = _g2.min
  local tan = _g2.tan
  local reverse = _g2.reverse
  local id_literal63 = _g2["id-literal?"]
  local _42 = _g2["*"]
  local code = _g2.code
  local inner = _g2.inner
  local _ = _g2["-"]
  local atom63 = _g2["atom?"]
  local pair = _g2.pair
  local sin = _g2.sin
  local hd = _g2.hd
  local _g5 = nexus["lumen/reader"]
  local make_stream = _g5["make-stream"]
  local read_table = _g5["read-table"]
  local read = _g5.read
  local read_from_string = _g5["read-from-string"]
  local read_all = _g5["read-all"]
  local _g6 = nexus["lumen/compiler"]
  local open_module = _g6["open-module"]
  local load_module = _g6["load-module"]
  local compile = _g6.compile
  local compile_module = _g6["compile-module"]
  local import_modules = _g6["import-modules"]
  local in_module = _g6["in-module"]
  local declare = _g6.declare
  local compile_function = _g6["compile-function"]
  local eval = _g6.eval
  local function rep(str)
    local _g774,_g775 = xpcall(function ()
      return(eval(read_from_string(str)))
    end, _37message_handler)
    local _g773 = {_g774, _g775}
    local _g1 = _g773[1]
    local x = _g773[2]
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
    local _g776 = args
    local i = 0
    while i < length(_g776) do
      local arg = _g776[i + 1]
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
