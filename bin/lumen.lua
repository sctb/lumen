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
  local function clock()
    return(os.clock())
  end
  nexus["lumen/runtime"].clock = clock
  local function number(str)
    local function numeric63(c)
      local n = code(c)
      return(n > 47 and n < 58)
    end
    local function number_char63(c)
      return(numeric63(c) or in63(c, {"+", "-", "e", "E", "."}))
    end
    local i = 0
    while i < length(str) do
      if not number_char63(char(str, i)) then
        return
      end
      i = i + 1
    end
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
  local nil63 = _g62["nil?"]
  local is63 = _g62["is?"]
  local max = _g62.max
  local min = _g62.min
  local abs = _g62.abs
  local acos = _g62.acos
  local asin = _g62.asin
  local atan = _g62.atan
  local atan2 = _g62.atan2
  local ceil = _g62.ceil
  local cos = _g62.cos
  local floor = _g62.floor
  local log = _g62.log
  local log10 = _g62.log10
  local pow = _g62.pow
  local random = _g62.random
  local sin = _g62.sin
  local sinh = _g62.sinh
  local sqrt = _g62.sqrt
  local tan = _g62.tan
  local tanh = _g62.tanh
  local length = _g62.length
  local none63 = _g62["none?"]
  local some63 = _g62["some?"]
  local one63 = _g62["one?"]
  local hd = _g62.hd
  local string63 = _g62["string?"]
  local number63 = _g62["number?"]
  local boolean63 = _g62["boolean?"]
  local function63 = _g62["function?"]
  local composite63 = _g62["composite?"]
  local atom63 = _g62["atom?"]
  local table63 = _g62["table?"]
  local list63 = _g62["list?"]
  local substring = _g62.substring
  local sub = _g62.sub
  local inner = _g62.inner
  local tl = _g62.tl
  local char = _g62.char
  local code = _g62.code
  local string_literal63 = _g62["string-literal?"]
  local id_literal63 = _g62["id-literal?"]
  local add = _g62.add
  local drop = _g62.drop
  local last = _g62.last
  local reverse = _g62.reverse
  local join = _g62.join
  local reduce = _g62.reduce
  local keep = _g62.keep
  local in63 = _g62["in?"]
  local find = _g62.find
  local pair = _g62.pair
  local sort = _g62.sort
  local iterate = _g62.iterate
  local replicate = _g62.replicate
  local splice = _g62.splice
  local map = _g62.map
  local flat = _g62.flat
  local flat1 = _g62.flat1
  local keys63 = _g62["keys?"]
  local empty63 = _g62["empty?"]
  local stash = _g62.stash
  local unstash = _g62.unstash
  local extend = _g62.extend
  local exclude = _g62.exclude
  local search = _g62.search
  local split = _g62.split
  local cat = _g62.cat
  local _43 = _g62["+"]
  local _ = _g62["-"]
  local _42 = _g62["*"]
  local _47 = _g62["/"]
  local _37 = _g62["%"]
  local _62 = _g62[">"]
  local _60 = _g62["<"]
  local _61 = _g62["="]
  local _6261 = _g62[">="]
  local _6061 = _g62["<="]
  local read_file = _g62["read-file"]
  local write_file = _g62["write-file"]
  local write = _g62.write
  local exit = _g62.exit
  local today = _g62.today
  local now = _g62.now
  local clock = _g62.clock
  local number = _g62.number
  local string = _g62.string
  local space = _g62.space
  local apply = _g62.apply
  local make_id = _g62["make-id"]
  local _37message_handler = _g62["%message-handler"]
  local toplevel63 = _g62["toplevel?"]
  local module_key = _g62["module-key"]
  local module = _g62.module
  local setenv = _g62.setenv
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
  local function valid_char63(n)
    return(numeric63(n) or n > 64 and n < 91 or n > 96 and n < 123 or n == 95)
  end
  nexus["lumen/lib"]["valid-char?"] = valid_char63
  local function valid_id63(id)
    if none63(id) then
      return(false)
    else
      if special63(id) then
        return(false)
      else
        if reserved63(id) then
          return(false)
        else
          local i = 0
          while i < length(id) do
            local n = code(id, i)
            if not (valid_char63(n) and (i > 0 or not numeric63(n))) then
              return(false)
            end
            i = i + 1
          end
          return(true)
        end
      end
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
        if i == 0 and numeric63(n) then
          _g102 = "_" .. n
        else
          local _g103
          if valid_char63(n) then
            _g103 = c
          else
            local _g104
            if i == 0 then
              _g104 = "_" .. n
            else
              _g104 = n
            end
            _g103 = _g104
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
    _g96.alias = quoted(m.alias)
    _g96.export = quote_frame(m.export)
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
  local _g105 = nexus["lumen/runtime"]
  local nil63 = _g105["nil?"]
  local is63 = _g105["is?"]
  local max = _g105.max
  local min = _g105.min
  local abs = _g105.abs
  local acos = _g105.acos
  local asin = _g105.asin
  local atan = _g105.atan
  local atan2 = _g105.atan2
  local ceil = _g105.ceil
  local cos = _g105.cos
  local floor = _g105.floor
  local log = _g105.log
  local log10 = _g105.log10
  local pow = _g105.pow
  local random = _g105.random
  local sin = _g105.sin
  local sinh = _g105.sinh
  local sqrt = _g105.sqrt
  local tan = _g105.tan
  local tanh = _g105.tanh
  local length = _g105.length
  local none63 = _g105["none?"]
  local some63 = _g105["some?"]
  local one63 = _g105["one?"]
  local hd = _g105.hd
  local string63 = _g105["string?"]
  local number63 = _g105["number?"]
  local boolean63 = _g105["boolean?"]
  local function63 = _g105["function?"]
  local composite63 = _g105["composite?"]
  local atom63 = _g105["atom?"]
  local table63 = _g105["table?"]
  local list63 = _g105["list?"]
  local substring = _g105.substring
  local sub = _g105.sub
  local inner = _g105.inner
  local tl = _g105.tl
  local char = _g105.char
  local code = _g105.code
  local string_literal63 = _g105["string-literal?"]
  local id_literal63 = _g105["id-literal?"]
  local add = _g105.add
  local drop = _g105.drop
  local last = _g105.last
  local reverse = _g105.reverse
  local join = _g105.join
  local reduce = _g105.reduce
  local keep = _g105.keep
  local in63 = _g105["in?"]
  local find = _g105.find
  local pair = _g105.pair
  local sort = _g105.sort
  local iterate = _g105.iterate
  local replicate = _g105.replicate
  local splice = _g105.splice
  local map = _g105.map
  local flat = _g105.flat
  local flat1 = _g105.flat1
  local keys63 = _g105["keys?"]
  local empty63 = _g105["empty?"]
  local stash = _g105.stash
  local unstash = _g105.unstash
  local extend = _g105.extend
  local exclude = _g105.exclude
  local search = _g105.search
  local split = _g105.split
  local cat = _g105.cat
  local _43 = _g105["+"]
  local _ = _g105["-"]
  local _42 = _g105["*"]
  local _47 = _g105["/"]
  local _37 = _g105["%"]
  local _62 = _g105[">"]
  local _60 = _g105["<"]
  local _61 = _g105["="]
  local _6261 = _g105[">="]
  local _6061 = _g105["<="]
  local read_file = _g105["read-file"]
  local write_file = _g105["write-file"]
  local write = _g105.write
  local exit = _g105.exit
  local today = _g105.today
  local now = _g105.now
  local clock = _g105.clock
  local number = _g105.number
  local string = _g105.string
  local space = _g105.space
  local apply = _g105.apply
  local make_id = _g105["make-id"]
  local _37message_handler = _g105["%message-handler"]
  local toplevel63 = _g105["toplevel?"]
  local module_key = _g105["module-key"]
  local module = _g105.module
  local setenv = _g105.setenv
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
  local _g116 = nexus["lumen/runtime"]
  local nil63 = _g116["nil?"]
  local is63 = _g116["is?"]
  local max = _g116.max
  local min = _g116.min
  local abs = _g116.abs
  local acos = _g116.acos
  local asin = _g116.asin
  local atan = _g116.atan
  local atan2 = _g116.atan2
  local ceil = _g116.ceil
  local cos = _g116.cos
  local floor = _g116.floor
  local log = _g116.log
  local log10 = _g116.log10
  local pow = _g116.pow
  local random = _g116.random
  local sin = _g116.sin
  local sinh = _g116.sinh
  local sqrt = _g116.sqrt
  local tan = _g116.tan
  local tanh = _g116.tanh
  local length = _g116.length
  local none63 = _g116["none?"]
  local some63 = _g116["some?"]
  local one63 = _g116["one?"]
  local hd = _g116.hd
  local string63 = _g116["string?"]
  local number63 = _g116["number?"]
  local boolean63 = _g116["boolean?"]
  local function63 = _g116["function?"]
  local composite63 = _g116["composite?"]
  local atom63 = _g116["atom?"]
  local table63 = _g116["table?"]
  local list63 = _g116["list?"]
  local substring = _g116.substring
  local sub = _g116.sub
  local inner = _g116.inner
  local tl = _g116.tl
  local char = _g116.char
  local code = _g116.code
  local string_literal63 = _g116["string-literal?"]
  local id_literal63 = _g116["id-literal?"]
  local add = _g116.add
  local drop = _g116.drop
  local last = _g116.last
  local reverse = _g116.reverse
  local join = _g116.join
  local reduce = _g116.reduce
  local keep = _g116.keep
  local in63 = _g116["in?"]
  local find = _g116.find
  local pair = _g116.pair
  local sort = _g116.sort
  local iterate = _g116.iterate
  local replicate = _g116.replicate
  local splice = _g116.splice
  local map = _g116.map
  local flat = _g116.flat
  local flat1 = _g116.flat1
  local keys63 = _g116["keys?"]
  local empty63 = _g116["empty?"]
  local stash = _g116.stash
  local unstash = _g116.unstash
  local extend = _g116.extend
  local exclude = _g116.exclude
  local search = _g116.search
  local split = _g116.split
  local cat = _g116.cat
  local _43 = _g116["+"]
  local _ = _g116["-"]
  local _42 = _g116["*"]
  local _47 = _g116["/"]
  local _37 = _g116["%"]
  local _62 = _g116[">"]
  local _60 = _g116["<"]
  local _61 = _g116["="]
  local _6261 = _g116[">="]
  local _6061 = _g116["<="]
  local read_file = _g116["read-file"]
  local write_file = _g116["write-file"]
  local write = _g116.write
  local exit = _g116.exit
  local today = _g116.today
  local now = _g116.now
  local clock = _g116.clock
  local number = _g116.number
  local string = _g116.string
  local space = _g116.space
  local apply = _g116.apply
  local make_id = _g116["make-id"]
  local _37message_handler = _g116["%message-handler"]
  local toplevel63 = _g116["toplevel?"]
  local module_key = _g116["module-key"]
  local module = _g116.module
  local setenv = _g116.setenv
  local _g119 = nexus["lumen/lib"]
  local getenv = _g119.getenv
  local macro_function = _g119["macro-function"]
  local macro63 = _g119["macro?"]
  local special63 = _g119["special?"]
  local special_form63 = _g119["special-form?"]
  local statement63 = _g119["statement?"]
  local symbol_expansion = _g119["symbol-expansion"]
  local symbol63 = _g119["symbol?"]
  local variable63 = _g119["variable?"]
  local bound63 = _g119["bound?"]
  local quoted = _g119.quoted
  local stash42 = _g119["stash*"]
  local bind = _g119.bind
  local bind42 = _g119["bind*"]
  local quasiexpand = _g119.quasiexpand
  local macroexpand = _g119.macroexpand
  local indentation = _g119.indentation
  local reserved63 = _g119["reserved?"]
  local valid_id63 = _g119["valid-id?"]
  local id = _g119.id
  local key = _g119.key
  local imported = _g119.imported
  local linked = _g119.linked
  local mapo = _g119.mapo
  local quote_environment = _g119["quote-environment"]
  local quote_modules = _g119["quote-modules"]
  local initial_environment = _g119["initial-environment"]
  local _g120 = nexus["lumen/reader"]
  local make_stream = _g120["make-stream"]
  local read_table = _g120["read-table"]
  local read = _g120.read
  local read_all = _g120["read-all"]
  local read_from_string = _g120["read-from-string"]
  local _g124 = {}
  _g124.js = "!"
  _g124.lua = "not "
  local _g122 = {}
  local _g125 = {}
  _g125.js = "!"
  _g125.lua = "not "
  _g122["not"] = _g125
  local _g127 = {}
  _g127["*"] = true
  _g127["/"] = true
  _g127["%"] = true
  local _g129 = {}
  _g129["+"] = true
  _g129["-"] = true
  local _g133 = {}
  _g133.js = "+"
  _g133.lua = ".."
  local _g131 = {}
  local _g134 = {}
  _g134.js = "+"
  _g134.lua = ".."
  _g131.cat = _g134
  local _g136 = {}
  _g136["<"] = true
  _g136[">"] = true
  _g136["<="] = true
  _g136[">="] = true
  local _g140 = {}
  _g140.js = "==="
  _g140.lua = "=="
  local _g142 = {}
  _g142.js = "!="
  _g142.lua = "~="
  local _g138 = {}
  local _g143 = {}
  _g143.js = "==="
  _g143.lua = "=="
  _g138["="] = _g143
  local _g144 = {}
  _g144.js = "!="
  _g144.lua = "~="
  _g138["~="] = _g144
  local _g148 = {}
  _g148.js = "&&"
  _g148.lua = "and"
  local _g146 = {}
  local _g149 = {}
  _g149.js = "&&"
  _g149.lua = "and"
  _g146["and"] = _g149
  local _g153 = {}
  _g153.js = "||"
  _g153.lua = "or"
  local _g151 = {}
  local _g154 = {}
  _g154.js = "||"
  _g154.lua = "or"
  _g151["or"] = _g154
  local infix = {_g122, _g127, _g129, _g131, _g136, _g138, _g146, _g151}
  nexus["lumen/compiler"].infix = infix
  local function unary63(form)
    local op = form[1]
    local args = sub(form, 1)
    return(one63(args) and in63(op, {"not", "-"}))
  end
  nexus["lumen/compiler"]["unary?"] = unary63
  local function precedence(form)
    if list63(form) and not unary63(form) then
      local _g155 = infix
      local i = 0
      while i < length(_g155) do
        local level = _g155[i + 1]
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
    local _g156 = args
    local i = 0
    while i < length(_g156) do
      local arg = _g156[i + 1]
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
    local _g157 = getenv(x)
    local special = _g157.special
    local stmt = _g157.stmt
    local self_tr63 = _g157.tr
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
    local _g158 = unstash({...})
    local right = _g158.right
    local _g185
    if right then
      _g185 = _6261
    else
      _g185 = _62
    end
    if _g185(precedence(child), precedence(parent)) then
      return({"(", ")"})
    else
      return({"", ""})
    end
  end
  nexus["lumen/compiler"]["op-delims"] = op_delims
  local function compile_infix(form)
    local op = form[1]
    local _g159 = sub(form, 1)
    local a = _g159[1]
    local b = _g159[2]
    local _g160 = op_delims(form, a)
    local ao = _g160[1]
    local ac = _g160[2]
    local _g161 = op_delims(form, b, {_stash = true, right = true})
    local bo = _g161[1]
    local bc = _g161[2]
    local _g162 = compile(a)
    local _g163 = compile(b)
    local _g164 = getop(op)
    if unary63(form) then
      return(_g164 .. ao .. _g162 .. ac)
    else
      return(ao .. _g162 .. ac .. " " .. _g164 .. " " .. bo .. _g163 .. bc)
    end
  end
  nexus["lumen/compiler"]["compile-infix"] = compile_infix
  local function compile_function(args, body, ...)
    local _g165 = unstash({...})
    local name = _g165.name
    local prefix = _g165.prefix
    local _g186
    if name then
      _g186 = compile(name)
    else
      _g186 = ""
    end
    local id = _g186
    local _g166 = prefix or ""
    local _g167 = compile_args(args)
    indent_level = indent_level + 1
    local _g169 = compile(body, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local _g168 = _g169
    local ind = indentation()
    local _g187
    if target == "js" then
      _g187 = ""
    else
      _g187 = "end"
    end
    local tr = _g187
    if name then
      tr = tr .. "\n"
    end
    if target == "js" then
      return("function " .. id .. _g167 .. " {\n" .. _g168 .. ind .. "}" .. tr)
    else
      return(_g166 .. "function " .. id .. _g167 .. "\n" .. _g168 .. ind .. tr)
    end
  end
  nexus["lumen/compiler"]["compile-function"] = compile_function
  local function can_return63(form)
    return(is63(form) and (atom63(form) or not (hd(form) == "return") and not statement63(hd(form))))
  end
  nexus["lumen/compiler"]["can-return?"] = can_return63
  compile = function (form, ...)
    local _g170 = unstash({...})
    local stmt = _g170.stmt
    if nil63(form) then
      return("")
    else
      if special_form63(form) then
        return(compile_special(form, stmt))
      else
        local tr = terminator(stmt)
        local _g188
        if stmt then
          _g188 = indentation()
        else
          _g188 = ""
        end
        local ind = _g188
        local _g189
        if atom63(form) then
          _g189 = compile_atom(form)
        else
          local _g190
          if infix63(hd(form)) then
            _g190 = compile_infix(form)
          else
            _g190 = compile_call(form)
          end
          _g189 = _g190
        end
        local _g171 = _g189
        return(ind .. _g171 .. tr)
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
    local _g172 = sub(args, 0, length(args) - 1)
    local _g173 = 0
    while _g173 < length(_g172) do
      local x = _g172[_g173 + 1]
      add(hoist, lower(x, hoist, stmt63))
      _g173 = _g173 + 1
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
    local _g174 = args[2]
    local _g175 = args[3]
    if stmt63 or tail63 then
      local _g192
      if _g175 then
        _g192 = {lower_body({_g175}, tail63)}
      end
      return(add(hoist, join({"%if", lower(cond, hoist), lower_body({_g174}, tail63)}, _g192)))
    else
      local e = make_id()
      add(hoist, {"%local", e})
      local _g191
      if _g175 then
        _g191 = {lower({"set", e, _g175})}
      end
      add(hoist, join({"%if", lower(cond, hoist), lower({"set", e, _g174})}, _g191))
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
      local _g193
      if x == "and" then
        _g193 = {"%if", id, b, id}
      else
        _g193 = {"%if", id, id, b}
      end
      return(lower({"do", {"%local", id, a}, _g193}, hoist))
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
    local _g176 = args[2]
    local body = sub(args, 2)
    return(add(hoist, {kind, name, _g176, lower_body(body, true)}))
  end
  nexus["lumen/compiler"]["lower-definition"] = lower_definition
  local function lower_call(form, hoist)
    local _g177 = map(function (x)
      return(lower(x, hoist))
    end, form)
    if some63(_g177) then
      return(_g177)
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
    local _g178 = unstash({...})
    local all = _g178.all
    local m = module(spec)
    local frame = last(environment)
    local _g179 = m.export
    local k = nil
    for k in next, _g179 do
      if not number63(k) then
        local v = _g179[k]
        if v.export or all then
          frame[k] = v
        end
      end
    end
  end
  nexus["lumen/compiler"]["open-module"] = open_module
  local function load_module(spec, ...)
    local _g180 = unstash({...})
    local all = _g180.all
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
    local _g181 = specs or {}
    local _g182 = 0
    while _g182 < length(_g181) do
      local spec = _g181[_g182 + 1]
      load_module(spec)
      local m = module(spec)
      if m.alias then
        local _g183 = import_modules(m.alias)
        local aliased = _g183[1]
        local bs = _g183[2]
        imports = join(imports, aliased)
        bindings = join(bindings, bs)
      else
        local _g184 = imported(spec)
        add(imports, spec)
        bindings = join(bindings, _g184)
      end
      _g182 = _g182 + 1
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
    return(join(map(function (x)
      return(splice(imported(x)))
    end, m.import), imported(current_module, {_stash = true, all = true})))
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
  local _g194 = nexus["lumen/runtime"]
  local nil63 = _g194["nil?"]
  local is63 = _g194["is?"]
  local max = _g194.max
  local min = _g194.min
  local abs = _g194.abs
  local acos = _g194.acos
  local asin = _g194.asin
  local atan = _g194.atan
  local atan2 = _g194.atan2
  local ceil = _g194.ceil
  local cos = _g194.cos
  local floor = _g194.floor
  local log = _g194.log
  local log10 = _g194.log10
  local pow = _g194.pow
  local random = _g194.random
  local sin = _g194.sin
  local sinh = _g194.sinh
  local sqrt = _g194.sqrt
  local tan = _g194.tan
  local tanh = _g194.tanh
  local length = _g194.length
  local none63 = _g194["none?"]
  local some63 = _g194["some?"]
  local one63 = _g194["one?"]
  local hd = _g194.hd
  local string63 = _g194["string?"]
  local number63 = _g194["number?"]
  local boolean63 = _g194["boolean?"]
  local function63 = _g194["function?"]
  local composite63 = _g194["composite?"]
  local atom63 = _g194["atom?"]
  local table63 = _g194["table?"]
  local list63 = _g194["list?"]
  local substring = _g194.substring
  local sub = _g194.sub
  local inner = _g194.inner
  local tl = _g194.tl
  local char = _g194.char
  local code = _g194.code
  local string_literal63 = _g194["string-literal?"]
  local id_literal63 = _g194["id-literal?"]
  local add = _g194.add
  local drop = _g194.drop
  local last = _g194.last
  local reverse = _g194.reverse
  local join = _g194.join
  local reduce = _g194.reduce
  local keep = _g194.keep
  local in63 = _g194["in?"]
  local find = _g194.find
  local pair = _g194.pair
  local sort = _g194.sort
  local iterate = _g194.iterate
  local replicate = _g194.replicate
  local splice = _g194.splice
  local map = _g194.map
  local flat = _g194.flat
  local flat1 = _g194.flat1
  local keys63 = _g194["keys?"]
  local empty63 = _g194["empty?"]
  local stash = _g194.stash
  local unstash = _g194.unstash
  local extend = _g194.extend
  local exclude = _g194.exclude
  local search = _g194.search
  local split = _g194.split
  local cat = _g194.cat
  local _43 = _g194["+"]
  local _ = _g194["-"]
  local _42 = _g194["*"]
  local _47 = _g194["/"]
  local _37 = _g194["%"]
  local _62 = _g194[">"]
  local _60 = _g194["<"]
  local _61 = _g194["="]
  local _6261 = _g194[">="]
  local _6061 = _g194["<="]
  local read_file = _g194["read-file"]
  local write_file = _g194["write-file"]
  local write = _g194.write
  local exit = _g194.exit
  local today = _g194.today
  local now = _g194.now
  local clock = _g194.clock
  local number = _g194.number
  local string = _g194.string
  local space = _g194.space
  local apply = _g194.apply
  local make_id = _g194["make-id"]
  local _37message_handler = _g194["%message-handler"]
  local toplevel63 = _g194["toplevel?"]
  local module_key = _g194["module-key"]
  local module = _g194.module
  local setenv = _g194.setenv
  local _g197 = nexus["lumen/lib"]
  local getenv = _g197.getenv
  local macro_function = _g197["macro-function"]
  local macro63 = _g197["macro?"]
  local special63 = _g197["special?"]
  local special_form63 = _g197["special-form?"]
  local statement63 = _g197["statement?"]
  local symbol_expansion = _g197["symbol-expansion"]
  local symbol63 = _g197["symbol?"]
  local variable63 = _g197["variable?"]
  local bound63 = _g197["bound?"]
  local quoted = _g197.quoted
  local stash42 = _g197["stash*"]
  local bind = _g197.bind
  local bind42 = _g197["bind*"]
  local quasiexpand = _g197.quasiexpand
  local macroexpand = _g197.macroexpand
  local indentation = _g197.indentation
  local reserved63 = _g197["reserved?"]
  local valid_id63 = _g197["valid-id?"]
  local id = _g197.id
  local key = _g197.key
  local imported = _g197.imported
  local linked = _g197.linked
  local mapo = _g197.mapo
  local quote_environment = _g197["quote-environment"]
  local quote_modules = _g197["quote-modules"]
  local initial_environment = _g197["initial-environment"]
  local _g198 = nexus["lumen/compiler"]
  local compile_function = _g198["compile-function"]
  local compile = _g198.compile
  local open_module = _g198["open-module"]
  local load_module = _g198["load-module"]
  local in_module = _g198["in-module"]
  local import_modules = _g198["import-modules"]
  local compile_module = _g198["compile-module"]
  local declare = _g198.declare
  local eval = _g198.eval
end)();
(function ()
  nexus["lumen/core"] = {}
  local _g372 = nexus["lumen/runtime"]
  local nil63 = _g372["nil?"]
  local is63 = _g372["is?"]
  local max = _g372.max
  local min = _g372.min
  local abs = _g372.abs
  local acos = _g372.acos
  local asin = _g372.asin
  local atan = _g372.atan
  local atan2 = _g372.atan2
  local ceil = _g372.ceil
  local cos = _g372.cos
  local floor = _g372.floor
  local log = _g372.log
  local log10 = _g372.log10
  local pow = _g372.pow
  local random = _g372.random
  local sin = _g372.sin
  local sinh = _g372.sinh
  local sqrt = _g372.sqrt
  local tan = _g372.tan
  local tanh = _g372.tanh
  local length = _g372.length
  local none63 = _g372["none?"]
  local some63 = _g372["some?"]
  local one63 = _g372["one?"]
  local hd = _g372.hd
  local string63 = _g372["string?"]
  local number63 = _g372["number?"]
  local boolean63 = _g372["boolean?"]
  local function63 = _g372["function?"]
  local composite63 = _g372["composite?"]
  local atom63 = _g372["atom?"]
  local table63 = _g372["table?"]
  local list63 = _g372["list?"]
  local substring = _g372.substring
  local sub = _g372.sub
  local inner = _g372.inner
  local tl = _g372.tl
  local char = _g372.char
  local code = _g372.code
  local string_literal63 = _g372["string-literal?"]
  local id_literal63 = _g372["id-literal?"]
  local add = _g372.add
  local drop = _g372.drop
  local last = _g372.last
  local reverse = _g372.reverse
  local join = _g372.join
  local reduce = _g372.reduce
  local keep = _g372.keep
  local in63 = _g372["in?"]
  local find = _g372.find
  local pair = _g372.pair
  local sort = _g372.sort
  local iterate = _g372.iterate
  local replicate = _g372.replicate
  local splice = _g372.splice
  local map = _g372.map
  local flat = _g372.flat
  local flat1 = _g372.flat1
  local keys63 = _g372["keys?"]
  local empty63 = _g372["empty?"]
  local stash = _g372.stash
  local unstash = _g372.unstash
  local extend = _g372.extend
  local exclude = _g372.exclude
  local search = _g372.search
  local split = _g372.split
  local cat = _g372.cat
  local _43 = _g372["+"]
  local _ = _g372["-"]
  local _42 = _g372["*"]
  local _47 = _g372["/"]
  local _37 = _g372["%"]
  local _62 = _g372[">"]
  local _60 = _g372["<"]
  local _61 = _g372["="]
  local _6261 = _g372[">="]
  local _6061 = _g372["<="]
  local read_file = _g372["read-file"]
  local write_file = _g372["write-file"]
  local write = _g372.write
  local exit = _g372.exit
  local today = _g372.today
  local now = _g372.now
  local clock = _g372.clock
  local number = _g372.number
  local string = _g372.string
  local space = _g372.space
  local apply = _g372.apply
  local make_id = _g372["make-id"]
  local _37message_handler = _g372["%message-handler"]
  local toplevel63 = _g372["toplevel?"]
  local module_key = _g372["module-key"]
  local module = _g372.module
  local setenv = _g372.setenv
  local _g375 = nexus["lumen/lib"]
  local getenv = _g375.getenv
  local macro_function = _g375["macro-function"]
  local macro63 = _g375["macro?"]
  local special63 = _g375["special?"]
  local special_form63 = _g375["special-form?"]
  local statement63 = _g375["statement?"]
  local symbol_expansion = _g375["symbol-expansion"]
  local symbol63 = _g375["symbol?"]
  local variable63 = _g375["variable?"]
  local bound63 = _g375["bound?"]
  local quoted = _g375.quoted
  local stash42 = _g375["stash*"]
  local bind = _g375.bind
  local bind42 = _g375["bind*"]
  local quasiexpand = _g375.quasiexpand
  local macroexpand = _g375.macroexpand
  local indentation = _g375.indentation
  local reserved63 = _g375["reserved?"]
  local valid_id63 = _g375["valid-id?"]
  local id = _g375.id
  local key = _g375.key
  local imported = _g375.imported
  local linked = _g375.linked
  local mapo = _g375.mapo
  local quote_environment = _g375["quote-environment"]
  local quote_modules = _g375["quote-modules"]
  local initial_environment = _g375["initial-environment"]
  local _g376 = nexus["lumen/compiler"]
  local compile_function = _g376["compile-function"]
  local compile = _g376.compile
  local open_module = _g376["open-module"]
  local load_module = _g376["load-module"]
  local in_module = _g376["in-module"]
  local import_modules = _g376["import-modules"]
  local compile_module = _g376["compile-module"]
  local declare = _g376.declare
  local eval = _g376.eval
  target = "lua"
end)();
(function ()
  nexus["lumen/boot"] = {}
  local _g674 = nexus["lumen/runtime"]
  local nil63 = _g674["nil?"]
  local is63 = _g674["is?"]
  local max = _g674.max
  local min = _g674.min
  local abs = _g674.abs
  local acos = _g674.acos
  local asin = _g674.asin
  local atan = _g674.atan
  local atan2 = _g674.atan2
  local ceil = _g674.ceil
  local cos = _g674.cos
  local floor = _g674.floor
  local log = _g674.log
  local log10 = _g674.log10
  local pow = _g674.pow
  local random = _g674.random
  local sin = _g674.sin
  local sinh = _g674.sinh
  local sqrt = _g674.sqrt
  local tan = _g674.tan
  local tanh = _g674.tanh
  local length = _g674.length
  local none63 = _g674["none?"]
  local some63 = _g674["some?"]
  local one63 = _g674["one?"]
  local hd = _g674.hd
  local string63 = _g674["string?"]
  local number63 = _g674["number?"]
  local boolean63 = _g674["boolean?"]
  local function63 = _g674["function?"]
  local composite63 = _g674["composite?"]
  local atom63 = _g674["atom?"]
  local table63 = _g674["table?"]
  local list63 = _g674["list?"]
  local substring = _g674.substring
  local sub = _g674.sub
  local inner = _g674.inner
  local tl = _g674.tl
  local char = _g674.char
  local code = _g674.code
  local string_literal63 = _g674["string-literal?"]
  local id_literal63 = _g674["id-literal?"]
  local add = _g674.add
  local drop = _g674.drop
  local last = _g674.last
  local reverse = _g674.reverse
  local join = _g674.join
  local reduce = _g674.reduce
  local keep = _g674.keep
  local in63 = _g674["in?"]
  local find = _g674.find
  local pair = _g674.pair
  local sort = _g674.sort
  local iterate = _g674.iterate
  local replicate = _g674.replicate
  local splice = _g674.splice
  local map = _g674.map
  local flat = _g674.flat
  local flat1 = _g674.flat1
  local keys63 = _g674["keys?"]
  local empty63 = _g674["empty?"]
  local stash = _g674.stash
  local unstash = _g674.unstash
  local extend = _g674.extend
  local exclude = _g674.exclude
  local search = _g674.search
  local split = _g674.split
  local cat = _g674.cat
  local _43 = _g674["+"]
  local _ = _g674["-"]
  local _42 = _g674["*"]
  local _47 = _g674["/"]
  local _37 = _g674["%"]
  local _62 = _g674[">"]
  local _60 = _g674["<"]
  local _61 = _g674["="]
  local _6261 = _g674[">="]
  local _6061 = _g674["<="]
  local read_file = _g674["read-file"]
  local write_file = _g674["write-file"]
  local write = _g674.write
  local exit = _g674.exit
  local today = _g674.today
  local now = _g674.now
  local clock = _g674.clock
  local number = _g674.number
  local string = _g674.string
  local space = _g674.space
  local apply = _g674.apply
  local make_id = _g674["make-id"]
  local _37message_handler = _g674["%message-handler"]
  local toplevel63 = _g674["toplevel?"]
  local module_key = _g674["module-key"]
  local module = _g674.module
  local setenv = _g674.setenv
  local _g677 = nexus["lumen/lib"]
  local getenv = _g677.getenv
  local macro_function = _g677["macro-function"]
  local macro63 = _g677["macro?"]
  local special63 = _g677["special?"]
  local special_form63 = _g677["special-form?"]
  local statement63 = _g677["statement?"]
  local symbol_expansion = _g677["symbol-expansion"]
  local symbol63 = _g677["symbol?"]
  local variable63 = _g677["variable?"]
  local bound63 = _g677["bound?"]
  local quoted = _g677.quoted
  local stash42 = _g677["stash*"]
  local bind = _g677.bind
  local bind42 = _g677["bind*"]
  local quasiexpand = _g677.quasiexpand
  local macroexpand = _g677.macroexpand
  local indentation = _g677.indentation
  local reserved63 = _g677["reserved?"]
  local valid_id63 = _g677["valid-id?"]
  local id = _g677.id
  local key = _g677.key
  local imported = _g677.imported
  local linked = _g677.linked
  local mapo = _g677.mapo
  local quote_environment = _g677["quote-environment"]
  local quote_modules = _g677["quote-modules"]
  local initial_environment = _g677["initial-environment"]
  local _g678 = nexus["lumen/compiler"]
  local compile_function = _g678["compile-function"]
  local compile = _g678.compile
  local open_module = _g678["open-module"]
  local load_module = _g678["load-module"]
  local in_module = _g678["in-module"]
  local import_modules = _g678["import-modules"]
  local compile_module = _g678["compile-module"]
  local declare = _g678.declare
  local eval = _g678.eval
  modules = {["lumen/reader"] = {import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}}, export = {["make-stream"] = {export = true, variable = true}, ["read-table"] = {export = true, variable = true}, ["define-reader"] = {export = true, macro = function (_g691, ...)
    local char = _g691[1]
    local stream = _g691[2]
    local body = unstash({...})
    local _g692 = sub(body, 0)
    return({"set", {"get", "read-table", char}, join({"fn", {stream}}, _g692)})
  end}, read = {export = true, variable = true}, ["read-all"] = {export = true, variable = true}, ["read-from-string"] = {export = true, variable = true}, delimiters = {variable = true}, whitespace = {variable = true}, ["peek-char"] = {variable = true}, ["read-char"] = {variable = true}, ["skip-non-code"] = {variable = true}, eof = {variable = true}, ["key?"] = {variable = true}, ["flag?"] = {variable = true}}}, ["lumen/boot"] = {import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}, {"lumen", "lib"}, {"lumen", "compiler"}}, export = {["%initial-environment"] = {macro = function ()
    return(quote_environment(initial_environment()))
  end}, ["%initial-modules"] = {macro = function ()
    return(quote_modules())
  end}, modules = {global = true, export = true}}}, lumen = {alias = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}}, import = {{"lumen", "special"}}, export = {}}, ["lumen/compiler"] = {import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}, {"lumen", "lib"}, {"lumen", "reader"}}, export = {["compile-function"] = {export = true, variable = true}, compile = {export = true, variable = true}, ["open-module"] = {export = true, variable = true}, ["load-module"] = {export = true, variable = true}, ["in-module"] = {export = true, variable = true}, ["import-modules"] = {export = true, variable = true}, ["compile-module"] = {export = true, variable = true}, declare = {export = true, variable = true}, eval = {export = true, variable = true}, infix = {variable = true}, ["unary?"] = {variable = true}, precedence = {variable = true}, getop = {variable = true}, ["infix?"] = {variable = true}, ["compile-args"] = {variable = true}, ["compile-atom"] = {variable = true}, terminator = {variable = true}, ["compile-special"] = {variable = true}, ["parenthesize-call?"] = {variable = true}, ["compile-call"] = {variable = true}, ["op-delims"] = {variable = true}, ["compile-infix"] = {variable = true}, ["can-return?"] = {variable = true}, lower = {variable = true}, ["lower-statement"] = {variable = true}, ["lower-body"] = {variable = true}, ["lower-do"] = {variable = true}, ["lower-if"] = {variable = true}, ["lower-short"] = {variable = true}, ["lower-try"] = {variable = true}, ["lower-while"] = {variable = true}, ["lower-for"] = {variable = true}, ["lower-function"] = {variable = true}, ["lower-definition"] = {variable = true}, ["lower-call"] = {variable = true}, ["lower-infix?"] = {variable = true}, ["lower-infix"] = {variable = true}, ["lower-special"] = {variable = true}, process = {variable = true}, ["current-module"] = {export = true, global = true}, ["module-path"] = {variable = true}, encapsulate = {variable = true}, ["compile-file"] = {variable = true}, run = {variable = true}, ["compiling?"] = {variable = true}, ["compiler-output"] = {variable = true}, conclude = {variable = true}, ["%compile-module"] = {variable = true}, reimported = {variable = true}, ["%result"] = {export = true, global = true}}}, ["lumen/system"] = {import = {{"lumen", "special"}, {"lumen", "core"}}, export = {nexus = {export = true, global = true}}}, ["lumen/core"] = {import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}, {"lumen", "lib"}, {"lumen", "compiler"}}, export = {quote = {export = true, macro = function (form)
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
      local _g693 = body
      local k = nil
      for k in next, _g693 do
        if not number63(k) then
          local v = _g693[k]
          add(init, {"set", {"get", id, {"quote", k}}, v})
        end
      end
      return(join({"let", {id, l}}, join(init, {id})))
    end
  end}, ["if"] = {export = true, macro = function (...)
    local branches = unstash({...})
    local function step(_g694)
      local a = _g694[1]
      local b = _g694[2]
      local c = sub(_g694, 2)
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
    local _g695 = sub(body, 0)
    return({"if", cond, join({"do"}, _g695)})
  end}, unless = {export = true, macro = function (cond, ...)
    local body = unstash({...})
    local _g696 = sub(body, 0)
    return({"if", {"not", cond}, join({"do"}, _g696)})
  end}, table = {export = true, macro = function (...)
    local body = unstash({...})
    return(join({"%object"}, mapo(function (x)
      return(x)
    end, body)))
  end}, let = {export = true, macro = function (bindings, ...)
    local body = unstash({...})
    local _g697 = sub(body, 0)
    if length(bindings) < 2 then
      return(join({"do"}, _g697))
    else
      local renames = {}
      local locals = {}
      local lh = bindings[1]
      local rh = bindings[2]
      local _g698 = bind(lh, rh)
      local _g699 = 0
      while _g699 < length(_g698) do
        local _g700 = _g698[_g699 + 1]
        local id = _g700[1]
        local val = _g700[2]
        if bound63(id) or reserved63(id) or toplevel63() then
          local id1 = make_id()
          add(renames, id)
          add(renames, id1)
          id = id1
        else
          setenv(id, {_stash = true, variable = true})
        end
        add(locals, {"%local", id, val})
        _g699 = _g699 + 1
      end
      return(join({"do"}, join(locals, {{"let-symbol", renames, join({"let", sub(bindings, 2)}, _g697)}})))
    end
  end}, ["define-module"] = {export = true, macro = function (spec, ...)
    local body = unstash({...})
    local _g701 = sub(body, 0)
    local imp = _g701.import
    local exp = _g701.export
    local alias = _g701.alias
    local _g702 = import_modules(imp)
    local imports = _g702[1]
    local bindings = _g702[2]
    local k = module_key(spec)
    modules[k] = {import = imports, export = {}, alias = alias}
    local _g703 = exp or {}
    local _g704 = 0
    while _g704 < length(_g703) do
      local x = _g703[_g704 + 1]
      setenv(x, {_stash = true, export = true})
      _g704 = _g704 + 1
    end
    return(join({"do", {"set", {"get", "nexus", {"quote", k}}, {"table"}}}, bindings))
  end}, ["define-macro"] = {export = true, macro = function (name, args, ...)
    local body = unstash({...})
    local _g705 = sub(body, 0)
    local form = join({"fn", args}, _g705)
    local _g706 = {"setenv", {"quote", name}}
    _g706.macro = form
    _g706.form = {"quote", form}
    eval(_g706)
    return(nil)
  end}, ["define-special"] = {export = true, macro = function (name, args, ...)
    local body = unstash({...})
    local _g707 = sub(body, 0)
    local form = join({"fn", args}, _g707)
    local keys = sub(_g707, length(_g707))
    local _g708 = {"setenv", {"quote", name}}
    _g708.special = form
    _g708.form = {"quote", form}
    eval(join(_g708, keys))
    return(nil)
  end}, ["define-symbol"] = {export = true, macro = function (name, expansion)
    setenv(name, {_stash = true, symbol = expansion})
    return(nil)
  end}, ["define*"] = {export = true, macro = function (name, x, ...)
    local body = unstash({...})
    local _g709 = sub(body, 0)
    setenv(name, {_stash = true, global = true, export = true})
    if some63(_g709) then
      local _g710 = bind42(x, _g709)
      local args = _g710[1]
      local _g711 = _g710[2]
      return(join({"%global-function", name, args}, _g711))
    else
      if target == "js" then
        return({"set", {"get", "global", {"quote", id(name)}}, x})
      else
        return({"set", name, x})
      end
    end
  end}, define = {export = true, macro = function (name, x, ...)
    local body = unstash({...})
    local _g712 = sub(body, 0)
    setenv(name, {_stash = true, variable = true})
    if some63(_g712) and target == "js" then
      return(linked(name, {"%local", name, join({"fn", x}, _g712)}))
    else
      if some63(_g712) then
        local _g713 = bind42(x, _g712)
        local args = _g713[1]
        local _g714 = _g713[2]
        return(linked(name, join({"%local-function", name, args}, _g714)))
      else
        return(linked(name, {"%local", name, x}))
      end
    end
  end}, ["set*"] = {export = true, macro = function (name, value)
    return(linked(name, {"set", name, value}))
  end}, ["with-bindings"] = {export = true, macro = function (_g715, ...)
    local names = _g715[1]
    local body = unstash({...})
    local _g716 = sub(body, 0)
    local x = make_id()
    local _g718 = {"setenv", x}
    _g718.variable = true
    local _g717 = {"with-frame", {"each", {x}, names, _g718}}
    _g717.scope = true
    return(join(_g717, _g716))
  end}, ["let-macro"] = {export = true, macro = function (definitions, ...)
    local body = unstash({...})
    local _g719 = sub(body, 0)
    add(environment, {})
    map(function (m)
      return(macroexpand(join({"define-macro"}, m)))
    end, definitions)
    local _g720 = join({"do"}, macroexpand(_g719))
    drop(environment)
    return(_g720)
  end}, ["let-symbol"] = {export = true, macro = function (expansions, ...)
    local body = unstash({...})
    local _g721 = sub(body, 0)
    add(environment, {})
    map(function (_g723)
      local name = _g723[1]
      local exp = _g723[2]
      return(macroexpand({"define-symbol", name, exp}))
    end, pair(expansions))
    local _g722 = join({"do"}, macroexpand(_g721))
    drop(environment)
    return(_g722)
  end}, fn = {export = true, macro = function (args, ...)
    local body = unstash({...})
    local _g724 = sub(body, 0)
    local _g725 = bind42(args, _g724)
    local _g726 = _g725[1]
    local _g727 = _g725[2]
    return(join({"%function", _g726}, _g727))
  end}, guard = {export = true, macro = function (expr)
    if target == "js" then
      return({{"fn", {}, {"%try", {"list", true, expr}}}})
    else
      local e = make_id()
      local x = make_id()
      local ex = "|" .. e .. "," .. x .. "|"
      return({"let", {ex, {"xpcall", {"fn", {}, expr}, "%message-handler"}}, {"list", e, x}})
    end
  end}, each = {export = true, macro = function (b, t, ...)
    local body = unstash({...})
    local _g728 = sub(body, 0)
    local k = b[1]
    local v = b[2]
    local t1 = make_id()
    local _g760
    if nil63(v) then
      local _g761
      if b.i then
        _g761 = "i"
      else
        _g761 = make_id()
      end
      local i = _g761
      _g760 = {"let", {i, 0}, {"while", {"<", i, {"length", t1}}, join({"let", {k, {"at", t1, i}}}, _g728), {"inc", i}}}
    else
      local _g729 = {"target"}
      _g729.js = {"nil?", {"number", k}}
      _g729.lua = {"not", {"number?", k}}
      _g760 = {"let", {k, "nil"}, {"%for", t1, k, {"when", _g729, join({"let", {v, {"get", t1, k}}}, _g728)}}}
    end
    return({"let", {t1, t}, _g760})
  end}, ["set-of"] = {export = true, macro = function (...)
    local xs = unstash({...})
    local l = {}
    local _g730 = xs
    local _g731 = 0
    while _g731 < length(_g730) do
      local x = _g730[_g731 + 1]
      l[x] = true
      _g731 = _g731 + 1
    end
    return(join({"table"}, l))
  end}, language = {export = true, macro = function ()
    return({"quote", target})
  end}, target = {export = true, global = true, macro = function (...)
    local clauses = unstash({...})
    return(clauses[target])
  end}, ["join*"] = {export = true, macro = function (...)
    local xs = unstash({...})
    return(reduce(function (a, b)
      return({"join", a, b})
    end, xs))
  end}, ["join!"] = {export = true, macro = function (a, ...)
    local bs = unstash({...})
    local _g732 = sub(bs, 0)
    return({"set", a, join({"join*", a}, _g732)})
  end}, ["cat!"] = {export = true, macro = function (a, ...)
    local bs = unstash({...})
    local _g733 = sub(bs, 0)
    return({"set", a, join({"cat", a}, _g733)})
  end}, inc = {export = true, macro = function (n, by)
    return({"set", n, {"+", n, by or 1}})
  end}, dec = {export = true, macro = function (n, by)
    return({"set", n, {"-", n, by or 1}})
  end}, pr = {export = true, macro = function (...)
    local xs = unstash({...})
    return({"print", space(xs)})
  end}, ["with-frame"] = {export = true, macro = function (...)
    local body = unstash({...})
    local _g734 = sub(body, 0)
    local scope = body.scope
    local x = make_id()
    local _g735 = {"table"}
    _g735._scope = scope
    return({"do", {"add", "environment", _g735}, {"let", {x, join({"do"}, _g734)}, {"drop", "environment"}, x}})
  end}}}, ["lumen/runtime"] = {import = {{"lumen", "special"}, {"lumen", "core"}}, export = {["nil?"] = {export = true, variable = true}, ["is?"] = {export = true, variable = true}, max = {export = true, variable = true}, min = {export = true, variable = true}, abs = {export = true, variable = true}, acos = {export = true, variable = true}, asin = {export = true, variable = true}, atan = {export = true, variable = true}, atan2 = {export = true, variable = true}, ceil = {export = true, variable = true}, cos = {export = true, variable = true}, floor = {export = true, variable = true}, log = {export = true, variable = true}, log10 = {export = true, variable = true}, pow = {export = true, variable = true}, random = {export = true, variable = true}, sin = {export = true, variable = true}, sinh = {export = true, variable = true}, sqrt = {export = true, variable = true}, tan = {export = true, variable = true}, tanh = {export = true, variable = true}, length = {export = true, variable = true}, ["none?"] = {export = true, variable = true}, ["some?"] = {export = true, variable = true}, ["one?"] = {export = true, variable = true}, hd = {export = true, variable = true}, ["string?"] = {export = true, variable = true}, ["number?"] = {export = true, variable = true}, ["boolean?"] = {export = true, variable = true}, ["function?"] = {export = true, variable = true}, ["composite?"] = {export = true, variable = true}, ["atom?"] = {export = true, variable = true}, ["table?"] = {export = true, variable = true}, ["list?"] = {export = true, variable = true}, substring = {export = true, variable = true}, sub = {export = true, variable = true}, inner = {export = true, variable = true}, tl = {export = true, variable = true}, char = {export = true, variable = true}, code = {export = true, variable = true}, ["string-literal?"] = {export = true, variable = true}, ["id-literal?"] = {export = true, variable = true}, add = {export = true, variable = true}, drop = {export = true, variable = true}, last = {export = true, variable = true}, reverse = {export = true, variable = true}, join = {export = true, variable = true}, reduce = {export = true, variable = true}, keep = {export = true, variable = true}, ["in?"] = {export = true, variable = true}, find = {export = true, variable = true}, pair = {export = true, variable = true}, sort = {export = true, variable = true}, iterate = {export = true, variable = true}, replicate = {export = true, variable = true}, splice = {export = true, variable = true}, map = {export = true, variable = true}, flat = {export = true, variable = true}, flat1 = {export = true, variable = true}, ["keys?"] = {export = true, variable = true}, ["empty?"] = {export = true, variable = true}, stash = {export = true, variable = true}, unstash = {export = true, variable = true}, extend = {export = true, variable = true}, exclude = {export = true, variable = true}, search = {export = true, variable = true}, split = {export = true, variable = true}, cat = {export = true, variable = true}, ["+"] = {export = true, variable = true}, ["-"] = {export = true, variable = true}, ["*"] = {export = true, variable = true}, ["/"] = {export = true, variable = true}, ["%"] = {export = true, variable = true}, [">"] = {export = true, variable = true}, ["<"] = {export = true, variable = true}, ["="] = {export = true, variable = true}, [">="] = {export = true, variable = true}, ["<="] = {export = true, variable = true}, ["read-file"] = {export = true, variable = true}, ["write-file"] = {export = true, variable = true}, write = {export = true, variable = true}, exit = {export = true, variable = true}, today = {export = true, variable = true}, now = {export = true, variable = true}, clock = {export = true, variable = true}, number = {export = true, variable = true}, string = {export = true, variable = true}, space = {export = true, variable = true}, apply = {export = true, variable = true}, ["make-id"] = {export = true, variable = true}, ["%message-handler"] = {export = true, variable = true}, ["toplevel?"] = {export = true, variable = true}, ["module-key"] = {export = true, variable = true}, module = {export = true, variable = true}, setenv = {export = true, variable = true}, math = {variable = true}, ["max*"] = {variable = true}, ["min*"] = {variable = true}, subl = {variable = true}, ["splice?"] = {variable = true}, mapl = {variable = true}, ["id-count"] = {variable = true}}}, ["lumen/lib"] = {import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}}, export = {getenv = {export = true, variable = true}, ["macro-function"] = {export = true, variable = true}, ["macro?"] = {export = true, variable = true}, ["special?"] = {export = true, variable = true}, ["special-form?"] = {export = true, variable = true}, ["statement?"] = {export = true, variable = true}, ["symbol-expansion"] = {export = true, variable = true}, ["symbol?"] = {export = true, variable = true}, ["variable?"] = {export = true, variable = true}, ["bound?"] = {export = true, variable = true}, quoted = {export = true, variable = true}, ["stash*"] = {export = true, variable = true}, bind = {export = true, variable = true}, ["bind*"] = {export = true, variable = true}, quasiexpand = {export = true, variable = true}, macroexpand = {export = true, variable = true}, indentation = {export = true, variable = true}, ["with-indent"] = {export = true, macro = function (form)
    local result = make_id()
    return({"do", {"inc", "indent-level"}, {"let", {result, form}, {"dec", "indent-level"}, result}})
  end}, ["reserved?"] = {export = true, variable = true}, ["valid-id?"] = {export = true, variable = true}, id = {export = true, variable = true}, key = {export = true, variable = true}, imported = {export = true, variable = true}, linked = {export = true, variable = true}, mapo = {export = true, variable = true}, ["quote-environment"] = {export = true, variable = true}, ["quote-modules"] = {export = true, variable = true}, ["initial-environment"] = {export = true, variable = true}, ["global?"] = {variable = true}, escape = {variable = true}, literal = {variable = true}, ["quoting?"] = {variable = true}, ["quasiquoting?"] = {variable = true}, ["can-unquote?"] = {variable = true}, ["quasisplice?"] = {variable = true}, ["quasiquote-list"] = {variable = true}, ["indent-level"] = {export = true, global = true}, reserved = {variable = true}, ["numeric?"] = {variable = true}, ["valid-char?"] = {variable = true}, ["quote-binding"] = {variable = true}, ["quote-frame"] = {variable = true}, ["quote-module"] = {variable = true}}}, ["lumen/special"] = {import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}, {"lumen", "lib"}, {"lumen", "compiler"}}, export = {["do"] = {export = true, foo = true, special = function (...)
    local forms = unstash({...})
    local str = ""
    local _g736 = forms
    local _g737 = 0
    while _g737 < length(_g736) do
      local x = _g736[_g737 + 1]
      str = str .. compile(x, {_stash = true, stmt = true})
      _g737 = _g737 + 1
    end
    return(str)
  end, tr = true, stmt = true}, ["%if"] = {export = true, foo = true, special = function (cond, cons, alt)
    local _g738 = compile(cond)
    indent_level = indent_level + 1
    local _g740 = compile(cons, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local _g739 = _g740
    local _g762
    if alt then
      indent_level = indent_level + 1
      local _g742 = compile(alt, {_stash = true, stmt = true})
      indent_level = indent_level - 1
      _g762 = _g742
    end
    local _g741 = _g762
    local ind = indentation()
    local str = ""
    if target == "js" then
      str = str .. ind .. "if (" .. _g738 .. ") {\n" .. _g739 .. ind .. "}"
    else
      str = str .. ind .. "if " .. _g738 .. " then\n" .. _g739
    end
    if _g741 and target == "js" then
      str = str .. " else {\n" .. _g741 .. ind .. "}"
    else
      if _g741 then
        str = str .. ind .. "else\n" .. _g741
      end
    end
    if target == "lua" then
      return(str .. ind .. "end\n")
    else
      return(str .. "\n")
    end
  end, tr = true, stmt = true}, ["while"] = {export = true, foo = true, special = function (cond, form)
    local _g743 = compile(cond)
    indent_level = indent_level + 1
    local _g744 = compile(form, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local body = _g744
    local ind = indentation()
    if target == "js" then
      return(ind .. "while (" .. _g743 .. ") {\n" .. body .. ind .. "}\n")
    else
      return(ind .. "while " .. _g743 .. " do\n" .. body .. ind .. "end\n")
    end
  end, tr = true, stmt = true}, ["%for"] = {export = true, foo = true, special = function (t, k, form)
    local _g745 = compile(t)
    local ind = indentation()
    indent_level = indent_level + 1
    local _g746 = compile(form, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local body = _g746
    if target == "lua" then
      return(ind .. "for " .. k .. " in next, " .. _g745 .. " do\n" .. body .. ind .. "end\n")
    else
      return(ind .. "for (" .. k .. " in " .. _g745 .. ") {\n" .. body .. ind .. "}\n")
    end
  end, tr = true, stmt = true}, ["%try"] = {export = true, foo = true, special = function (form)
    local ind = indentation()
    indent_level = indent_level + 1
    local _g747 = compile(form, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local body = _g747
    local e = make_id()
    local hf = {"return", {"%array", false, {"get", e, "\"message\""}}}
    indent_level = indent_level + 1
    local _g748 = compile(hf, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local h = _g748
    return(ind .. "try {\n" .. body .. ind .. "}\n" .. ind .. "catch (" .. e .. ") {\n" .. h .. ind .. "}\n")
  end, tr = true, stmt = true}, ["break"] = {export = true, foo = true, stmt = true, special = function ()
    return(indentation() .. "break")
  end}, ["%function"] = {export = true, foo = true, special = function (args, body)
    return(compile_function(args, body))
  end}, ["%global-function"] = {export = true, foo = true, special = function (name, args, body)
    if target == "lua" then
      local x = compile_function(args, body, {_stash = true, name = name})
      return(indentation() .. x)
    else
      return(compile({"set", name, {"%function", args, body}}, {_stash = true, stmt = true}))
    end
  end, tr = true, stmt = true}, ["%local-function"] = {export = true, foo = true, special = function (name, args, body)
    local x = compile_function(args, body, {_stash = true, name = name, prefix = "local "})
    return(indentation() .. x)
  end, tr = true, stmt = true}, ["return"] = {export = true, foo = true, stmt = true, special = function (x)
    local _g763
    if nil63(x) then
      _g763 = "return"
    else
      _g763 = "return(" .. compile(x) .. ")"
    end
    local _g749 = _g763
    return(indentation() .. _g749)
  end}, ["error"] = {export = true, foo = true, stmt = true, special = function (x)
    local _g764
    if target == "js" then
      _g764 = "throw new " .. compile({"Error", x})
    else
      _g764 = "error(" .. compile(x) .. ")"
    end
    local e = _g764
    return(indentation() .. e)
  end}, ["%local"] = {export = true, foo = true, stmt = true, special = function (name, value)
    local id = compile(name)
    local value1 = compile(value)
    local _g765
    if is63(value) then
      _g765 = " = " .. value1
    else
      _g765 = ""
    end
    local rh = _g765
    local _g766
    if target == "js" then
      _g766 = "var "
    else
      _g766 = "local "
    end
    local keyword = _g766
    local ind = indentation()
    return(ind .. keyword .. id .. rh)
  end}, ["set"] = {export = true, foo = true, stmt = true, special = function (lh, rh)
    local _g750 = compile(lh)
    local _g767
    if nil63(rh) then
      _g767 = "nil"
    else
      _g767 = rh
    end
    local _g751 = compile(_g767)
    return(indentation() .. _g750 .. " = " .. _g751)
  end}, ["get"] = {export = true, foo = true, special = function (t, k)
    local _g752 = compile(t)
    local k1 = compile(k)
    if target == "lua" and char(_g752, 0) == "{" then
      _g752 = "(" .. _g752 .. ")"
    end
    if string_literal63(k) and valid_id63(inner(k)) then
      return(_g752 .. "." .. inner(k))
    else
      return(_g752 .. "[" .. k1 .. "]")
    end
  end}, ["not"] = {}, ["%array"] = {export = true, foo = true, special = function (...)
    local forms = unstash({...})
    local _g768
    if target == "lua" then
      _g768 = "{"
    else
      _g768 = "["
    end
    local open = _g768
    local _g769
    if target == "lua" then
      _g769 = "}"
    else
      _g769 = "]"
    end
    local close = _g769
    local str = ""
    local _g753 = forms
    local i = 0
    while i < length(_g753) do
      local x = _g753[i + 1]
      str = str .. compile(x)
      if i < length(forms) - 1 then
        str = str .. ", "
      end
      i = i + 1
    end
    return(open .. str .. close)
  end}, ["%object"] = {export = true, foo = true, special = function (...)
    local forms = unstash({...})
    local str = "{"
    local _g770
    if target == "lua" then
      _g770 = " = "
    else
      _g770 = ": "
    end
    local sep = _g770
    local pairs = pair(forms)
    local n_1 = length(pairs) - 1
    local _g754 = pairs
    local i = 0
    while i < length(_g754) do
      local _g755 = _g754[i + 1]
      local k = _g755[1]
      local v = _g755[2]
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
  end}}}, ["lumen/main"] = {import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}, {"lumen", "reader"}, {"lumen", "compiler"}}, export = {}}, user = {import = {"lumen", {"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}}, export = {}}}
  environment = {{["define-module"] = {export = true, macro = function (spec, ...)
    local body = unstash({...})
    local _g756 = sub(body, 0)
    local imp = _g756.import
    local exp = _g756.export
    local alias = _g756.alias
    local _g757 = import_modules(imp)
    local imports = _g757[1]
    local bindings = _g757[2]
    local k = module_key(spec)
    modules[k] = {import = imports, export = {}, alias = alias}
    local _g758 = exp or {}
    local _g759 = 0
    while _g759 < length(_g758) do
      local x = _g758[_g759 + 1]
      setenv(x, {_stash = true, export = true})
      _g759 = _g759 + 1
    end
    return(join({"do", {"set", {"get", "nexus", {"quote", k}}, {"table"}}}, bindings))
  end}}}
end)();
(function ()
  nexus.user = {}
  local _g771 = nexus["lumen/runtime"]
  local nil63 = _g771["nil?"]
  local is63 = _g771["is?"]
  local max = _g771.max
  local min = _g771.min
  local abs = _g771.abs
  local acos = _g771.acos
  local asin = _g771.asin
  local atan = _g771.atan
  local atan2 = _g771.atan2
  local ceil = _g771.ceil
  local cos = _g771.cos
  local floor = _g771.floor
  local log = _g771.log
  local log10 = _g771.log10
  local pow = _g771.pow
  local random = _g771.random
  local sin = _g771.sin
  local sinh = _g771.sinh
  local sqrt = _g771.sqrt
  local tan = _g771.tan
  local tanh = _g771.tanh
  local length = _g771.length
  local none63 = _g771["none?"]
  local some63 = _g771["some?"]
  local one63 = _g771["one?"]
  local hd = _g771.hd
  local string63 = _g771["string?"]
  local number63 = _g771["number?"]
  local boolean63 = _g771["boolean?"]
  local function63 = _g771["function?"]
  local composite63 = _g771["composite?"]
  local atom63 = _g771["atom?"]
  local table63 = _g771["table?"]
  local list63 = _g771["list?"]
  local substring = _g771.substring
  local sub = _g771.sub
  local inner = _g771.inner
  local tl = _g771.tl
  local char = _g771.char
  local code = _g771.code
  local string_literal63 = _g771["string-literal?"]
  local id_literal63 = _g771["id-literal?"]
  local add = _g771.add
  local drop = _g771.drop
  local last = _g771.last
  local reverse = _g771.reverse
  local join = _g771.join
  local reduce = _g771.reduce
  local keep = _g771.keep
  local in63 = _g771["in?"]
  local find = _g771.find
  local pair = _g771.pair
  local sort = _g771.sort
  local iterate = _g771.iterate
  local replicate = _g771.replicate
  local splice = _g771.splice
  local map = _g771.map
  local flat = _g771.flat
  local flat1 = _g771.flat1
  local keys63 = _g771["keys?"]
  local empty63 = _g771["empty?"]
  local stash = _g771.stash
  local unstash = _g771.unstash
  local extend = _g771.extend
  local exclude = _g771.exclude
  local search = _g771.search
  local split = _g771.split
  local cat = _g771.cat
  local _43 = _g771["+"]
  local _ = _g771["-"]
  local _42 = _g771["*"]
  local _47 = _g771["/"]
  local _37 = _g771["%"]
  local _62 = _g771[">"]
  local _60 = _g771["<"]
  local _61 = _g771["="]
  local _6261 = _g771[">="]
  local _6061 = _g771["<="]
  local read_file = _g771["read-file"]
  local write_file = _g771["write-file"]
  local write = _g771.write
  local exit = _g771.exit
  local today = _g771.today
  local now = _g771.now
  local clock = _g771.clock
  local number = _g771.number
  local string = _g771.string
  local space = _g771.space
  local apply = _g771.apply
  local make_id = _g771["make-id"]
  local _37message_handler = _g771["%message-handler"]
  local toplevel63 = _g771["toplevel?"]
  local module_key = _g771["module-key"]
  local module = _g771.module
  local setenv = _g771.setenv
end)();
(function ()
  nexus["lumen/main"] = {}
  local _g2 = nexus["lumen/runtime"]
  local string = _g2.string
  local sort = _g2.sort
  local unstash = _g2.unstash
  local log10 = _g2.log10
  local drop = _g2.drop
  local flat = _g2.flat
  local id_literal63 = _g2["id-literal?"]
  local reduce = _g2.reduce
  local last = _g2.last
  local some63 = _g2["some?"]
  local _37 = _g2["%"]
  local split = _g2.split
  local string63 = _g2["string?"]
  local today = _g2.today
  local _ = _g2["-"]
  local keys63 = _g2["keys?"]
  local find = _g2.find
  local max = _g2.max
  local number63 = _g2["number?"]
  local substring = _g2.substring
  local setenv = _g2.setenv
  local join = _g2.join
  local _47 = _g2["/"]
  local composite63 = _g2["composite?"]
  local _62 = _g2[">"]
  local splice = _g2.splice
  local asin = _g2.asin
  local abs = _g2.abs
  local log = _g2.log
  local module = _g2.module
  local sinh = _g2.sinh
  local table63 = _g2["table?"]
  local one63 = _g2["one?"]
  local atan2 = _g2.atan2
  local reverse = _g2.reverse
  local atan = _g2.atan
  local floor = _g2.floor
  local apply = _g2.apply
  local make_id = _g2["make-id"]
  local add = _g2.add
  local sqrt = _g2.sqrt
  local atom63 = _g2["atom?"]
  local module_key = _g2["module-key"]
  local keep = _g2.keep
  local number = _g2.number
  local _37message_handler = _g2["%message-handler"]
  local space = _g2.space
  local in63 = _g2["in?"]
  local iterate = _g2.iterate
  local ceil = _g2.ceil
  local stash = _g2.stash
  local char = _g2.char
  local random = _g2.random
  local pair = _g2.pair
  local write = _g2.write
  local exit = _g2.exit
  local write_file = _g2["write-file"]
  local search = _g2.search
  local tl = _g2.tl
  local read_file = _g2["read-file"]
  local replicate = _g2.replicate
  local list63 = _g2["list?"]
  local _6061 = _g2["<="]
  local empty63 = _g2["empty?"]
  local _6261 = _g2[">="]
  local _61 = _g2["="]
  local boolean63 = _g2["boolean?"]
  local _60 = _g2["<"]
  local hd = _g2.hd
  local _42 = _g2["*"]
  local _43 = _g2["+"]
  local cat = _g2.cat
  local exclude = _g2.exclude
  local string_literal63 = _g2["string-literal?"]
  local inner = _g2.inner
  local nil63 = _g2["nil?"]
  local length = _g2.length
  local is63 = _g2["is?"]
  local tanh = _g2.tanh
  local toplevel63 = _g2["toplevel?"]
  local none63 = _g2["none?"]
  local min = _g2.min
  local sub = _g2.sub
  local sin = _g2.sin
  local extend = _g2.extend
  local acos = _g2.acos
  local cos = _g2.cos
  local flat1 = _g2.flat1
  local map = _g2.map
  local function63 = _g2["function?"]
  local pow = _g2.pow
  local clock = _g2.clock
  local now = _g2.now
  local code = _g2.code
  local tan = _g2.tan
  local _g5 = nexus["lumen/reader"]
  local read_table = _g5["read-table"]
  local make_stream = _g5["make-stream"]
  local read_from_string = _g5["read-from-string"]
  local read_all = _g5["read-all"]
  local read = _g5.read
  local _g6 = nexus["lumen/compiler"]
  local in_module = _g6["in-module"]
  local open_module = _g6["open-module"]
  local load_module = _g6["load-module"]
  local compile = _g6.compile
  local compile_function = _g6["compile-function"]
  local declare = _g6.declare
  local compile_module = _g6["compile-module"]
  local eval = _g6.eval
  local import_modules = _g6["import-modules"]
  local function rep(str)
    local _g775,_g776 = xpcall(function ()
      return(eval(read_from_string(str)))
    end, _37message_handler)
    local _g774 = {_g775, _g776}
    local _g1 = _g774[1]
    local x = _g774[2]
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
    local _g777 = args
    local i = 0
    while i < length(_g777) do
      local arg = _g777[i + 1]
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
