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
  local function in63(x, l)
    local _g23 = l
    local _g24 = 0
    while _g24 < length(_g23) do
      local y = _g23[_g24 + 1]
      if x == y then
        return(true)
      end
      _g24 = _g24 + 1
    end
  end
  nexus["lumen/runtime"]["in?"] = in63
  local function hd(l)
    return(l[1])
  end
  nexus["lumen/runtime"].hd = hd
  local function sd(l)
    return(l[2])
  end
  nexus["lumen/runtime"].sd = sd
  local function td(l)
    return(l[3])
  end
  nexus["lumen/runtime"].td = td
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
    return(type(x) == "table")
  end
  nexus["lumen/runtime"]["composite?"] = composite63
  local function atom63(x)
    return(not composite63(x))
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
    local _g25 = min42(upto, length(l))
    local j = 0
    local l2 = {}
    while i < _g25 do
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
      local _g26 = x
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
          local _g27 = l1
          local k = nil
          for k in next, _g27 do
            if not number63(k) then
              local v = _g27[k]
              l[k] = v
            end
          end
          local _g28 = l2
          local k = nil
          for k in next, _g28 do
            if not number63(k) then
              local v = _g28[k]
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
    local _g29 = l
    local _g30 = 0
    while _g30 < length(_g29) do
      local x = _g29[_g30 + 1]
      if f(x) then
        add(l1, x)
      end
      _g30 = _g30 + 1
    end
    return(l1)
  end
  nexus["lumen/runtime"].keep = keep
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
    local i = string.find(str, pattern, start, true)
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
  nexus["lumen/utilities"] = {}
  local _g61 = nexus["lumen/runtime"]
  local _37 = _g61["%"]
  local _37message_handler = _g61["%message-handler"]
  local _42 = _g61["*"]
  local _43 = _g61["+"]
  local _ = _g61["-"]
  local _47 = _g61["/"]
  local _60 = _g61["<"]
  local _6061 = _g61["<="]
  local _61 = _g61["="]
  local _62 = _g61[">"]
  local _6261 = _g61[">="]
  local abs = _g61.abs
  local acos = _g61.acos
  local add = _g61.add
  local apply = _g61.apply
  local asin = _g61.asin
  local atan = _g61.atan
  local atan2 = _g61.atan2
  local atom63 = _g61["atom?"]
  local boolean63 = _g61["boolean?"]
  local cat = _g61.cat
  local ceil = _g61.ceil
  local char = _g61.char
  local code = _g61.code
  local composite63 = _g61["composite?"]
  local cos = _g61.cos
  local drop = _g61.drop
  local empty63 = _g61["empty?"]
  local exclude = _g61.exclude
  local exit = _g61.exit
  local extend = _g61.extend
  local find = _g61.find
  local flat = _g61.flat
  local flat1 = _g61.flat1
  local floor = _g61.floor
  local function63 = _g61["function?"]
  local hd = _g61.hd
  local id_literal63 = _g61["id-literal?"]
  local in63 = _g61["in?"]
  local inner = _g61.inner
  local is63 = _g61["is?"]
  local iterate = _g61.iterate
  local join = _g61.join
  local keep = _g61.keep
  local keys63 = _g61["keys?"]
  local last = _g61.last
  local length = _g61.length
  local list63 = _g61["list?"]
  local log = _g61.log
  local log10 = _g61.log10
  local make_id = _g61["make-id"]
  local map = _g61.map
  local max = _g61.max
  local min = _g61.min
  local module = _g61.module
  local module_key = _g61["module-key"]
  local nil63 = _g61["nil?"]
  local none63 = _g61["none?"]
  local now = _g61.now
  local number = _g61.number
  local number63 = _g61["number?"]
  local one63 = _g61["one?"]
  local pair = _g61.pair
  local pow = _g61.pow
  local random = _g61.random
  local read_file = _g61["read-file"]
  local reduce = _g61.reduce
  local replicate = _g61.replicate
  local reverse = _g61.reverse
  local sd = _g61.sd
  local search = _g61.search
  local setenv = _g61.setenv
  local sin = _g61.sin
  local sinh = _g61.sinh
  local some63 = _g61["some?"]
  local sort = _g61.sort
  local space = _g61.space
  local splice = _g61.splice
  local split = _g61.split
  local sqrt = _g61.sqrt
  local stash = _g61.stash
  local string = _g61.string
  local string_literal63 = _g61["string-literal?"]
  local string63 = _g61["string?"]
  local sub = _g61.sub
  local substring = _g61.substring
  local table63 = _g61["table?"]
  local tan = _g61.tan
  local tanh = _g61.tanh
  local td = _g61.td
  local tl = _g61.tl
  local today = _g61.today
  local toplevel63 = _g61["toplevel?"]
  local unstash = _g61.unstash
  local write = _g61.write
  local write_file = _g61["write-file"]
  local function getenv(k, ...)
    local keys = unstash({...})
    local _g64 = sub(keys, 0)
    if string63(k) then
      local b = find(function (e)
        return(e[k])
      end, reverse(environment))
      if table63(b) then
        local _g65 = nil
        local _g66 = _g64
        local x = nil
        for x in next, _g66 do
          if not number63(x) then
            local _g58 = _g66[x]
            _g65 = x
          end
        end
        if _g65 then
          return(b[_g65])
        else
          return(b)
        end
      end
    end
  end
  nexus["lumen/utilities"].getenv = getenv
  local function macro_function(k)
    return(getenv(k, {_stash = true, macro = true}))
  end
  nexus["lumen/utilities"]["macro-function"] = macro_function
  local function macro63(k)
    return(is63(macro_function(k)))
  end
  nexus["lumen/utilities"]["macro?"] = macro63
  local function special63(k)
    return(is63(getenv(k, {_stash = true, special = true})))
  end
  nexus["lumen/utilities"]["special?"] = special63
  local function special_form63(form)
    return(list63(form) and special63(hd(form)))
  end
  nexus["lumen/utilities"]["special-form?"] = special_form63
  local function statement63(k)
    return(special63(k) and getenv(k, {_stash = true, stmt = true}))
  end
  nexus["lumen/utilities"]["statement?"] = statement63
  local function symbol_expansion(k)
    return(getenv(k, {_stash = true, symbol = true}))
  end
  nexus["lumen/utilities"]["symbol-expansion"] = symbol_expansion
  local function symbol63(k)
    return(is63(symbol_expansion(k)))
  end
  nexus["lumen/utilities"]["symbol?"] = symbol63
  local function variable63(k)
    local b = find(function (frame)
      return(frame[k] or frame._scope)
    end, reverse(environment))
    return(table63(b) and is63(b.variable))
  end
  nexus["lumen/utilities"]["variable?"] = variable63
  local function global63(k)
    return(getenv(k, {_stash = true, global = true}))
  end
  nexus["lumen/utilities"]["global?"] = global63
  local function bound63(x)
    return(macro63(x) or special63(x) or symbol63(x) or variable63(x) or global63(x))
  end
  nexus["lumen/utilities"]["bound?"] = bound63
  local function escape(str)
    local str1 = "\""
    local i = 0
    while i < length(str) do
      local c = char(str, i)
      local _g95
      if c == "\n" then
        _g95 = "\\n"
      else
        local _g96
        if c == "\"" then
          _g96 = "\\\""
        else
          local _g97
          if c == "\\" then
            _g97 = "\\\\"
          else
            _g97 = c
          end
          _g96 = _g97
        end
        _g95 = _g96
      end
      local c1 = _g95
      str1 = str1 .. c1
      i = i + 1
    end
    return(str1 .. "\"")
  end
  nexus["lumen/utilities"].escape = escape
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
  nexus["lumen/utilities"].quoted = quoted
  local function stash42(args)
    if keys63(args) then
      local l = {"%object", "_stash", true}
      local _g67 = args
      local k = nil
      for k in next, _g67 do
        if not number63(k) then
          local v = _g67[k]
          add(l, k)
          add(l, v)
        end
      end
      return(join(args, {l}))
    else
      return(args)
    end
  end
  nexus["lumen/utilities"]["stash*"] = stash42
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
        local _g68 = lh
        local i = 0
        while i < length(_g68) do
          local x = _g68[i + 1]
          bs = join(bs, bind(x, {"at", rh, i}))
          i = i + 1
        end
        if r then
          bs = join(bs, bind(r, {"sub", rh, length(lh)}))
        end
        local _g69 = lh
        local k = nil
        for k in next, _g69 do
          if not number63(k) then
            local v = _g69[k]
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
  nexus["lumen/utilities"].bind = bind
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
      local _g70 = args
      local _g71 = 0
      while _g71 < length(_g70) do
        local arg = _g70[_g71 + 1]
        if atom63(arg) then
          add(args1, arg)
        else
          if list63(arg) or keys63(arg) then
            local v = make_id()
            add(args1, v)
            bs = join(bs, {arg, v})
          end
        end
        _g71 = _g71 + 1
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
  nexus["lumen/utilities"]["bind*"] = bind42
  local function quoting63(depth)
    return(number63(depth))
  end
  nexus["lumen/utilities"]["quoting?"] = quoting63
  local function quasiquoting63(depth)
    return(quoting63(depth) and depth > 0)
  end
  nexus["lumen/utilities"]["quasiquoting?"] = quasiquoting63
  local function can_unquote63(depth)
    return(quoting63(depth) and depth == 1)
  end
  nexus["lumen/utilities"]["can-unquote?"] = can_unquote63
  local function quasisplice63(x, depth)
    return(list63(x) and can_unquote63(depth) and hd(x) == "unquote-splicing")
  end
  nexus["lumen/utilities"]["quasisplice?"] = quasisplice63
  local function macroexpand(form)
    if symbol63(form) then
      return(macroexpand(symbol_expansion(form)))
    else
      if atom63(form) then
        return(form)
      else
        local x = hd(form)
        if x == "%function" then
          local _g59 = form[1]
          local args = form[2]
          local body = sub(form, 2)
          add(environment, {_scope = true})
          local _g74 = args
          local _g75 = 0
          while _g75 < length(_g74) do
            local _g72 = _g74[_g75 + 1]
            setenv(_g72, {_stash = true, variable = true})
            _g75 = _g75 + 1
          end
          local _g73 = join({"%function", map(macroexpand, args)}, macroexpand(body))
          drop(environment)
          return(_g73)
        else
          if x == "%local-function" or x == "%global-function" then
            local _g60 = form[1]
            local name = form[2]
            local _g76 = form[3]
            local _g77 = sub(form, 3)
            add(environment, {_scope = true})
            local _g80 = _g76
            local _g81 = 0
            while _g81 < length(_g80) do
              local _g78 = _g80[_g81 + 1]
              setenv(_g78, {_stash = true, variable = true})
              _g81 = _g81 + 1
            end
            local _g79 = join({x, name, map(macroexpand, _g76)}, macroexpand(_g77))
            drop(environment)
            return(_g79)
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
  nexus["lumen/utilities"].macroexpand = macroexpand
  local quasiexpand
  nexus["lumen/utilities"].quasiexpand = quasiexpand
  local quasiquote_list
  nexus["lumen/utilities"]["quasiquote-list"] = quasiquote_list
  quasiquote_list = function (form, depth)
    local xs = {{"list"}}
    local _g82 = form
    local k = nil
    for k in next, _g82 do
      if not number63(k) then
        local v = _g82[k]
        local _g98
        if quasisplice63(v, depth) then
          _g98 = quasiexpand(v[2])
        else
          _g98 = quasiexpand(v, depth)
        end
        local _g83 = _g98
        last(xs)[k] = _g83
      end
    end
    local _g84 = form
    local _g85 = 0
    while _g85 < length(_g84) do
      local x = _g84[_g85 + 1]
      if quasisplice63(x, depth) then
        local _g86 = quasiexpand(x[2])
        add(xs, _g86)
        add(xs, {"list"})
      else
        add(last(xs), quasiexpand(x, depth))
      end
      _g85 = _g85 + 1
    end
    local pruned = keep(function (x)
      return(length(x) > 1 or not (hd(x) == "list") or keys63(x))
    end, xs)
    return(join({"join*"}, pruned))
  end
  nexus["lumen/utilities"]["quasiquote-list"] = quasiquote_list
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
  nexus["lumen/utilities"].quasiexpand = quasiexpand
  indent_level = 0
  local function indentation()
    return(apply(cat, replicate(indent_level, "  ")))
  end
  nexus["lumen/utilities"].indentation = indentation
  local reserved = {["%"] = true, ["*"] = true, ["+"] = true, ["-"] = true, ["/"] = true, ["<"] = true, ["<="] = true, ["="] = true, ["=="] = true, [">"] = true, [">="] = true, ["and"] = true, ["break"] = true, ["case"] = true, ["catch"] = true, ["continue"] = true, ["debugger"] = true, ["default"] = true, ["delete"] = true, ["do"] = true, ["else"] = true, ["elseif"] = true, ["end"] = true, ["false"] = true, ["finally"] = true, ["for"] = true, ["function"] = true, ["if"] = true, ["in"] = true, ["instanceof"] = true, ["local"] = true, ["new"] = true, ["nil"] = true, ["not"] = true, ["or"] = true, ["repeat"] = true, ["return"] = true, ["switch"] = true, ["then"] = true, ["this"] = true, ["throw"] = true, ["true"] = true, ["try"] = true, ["typeof"] = true, ["until"] = true, ["var"] = true, ["void"] = true, ["while"] = true, ["with"] = true}
  nexus["lumen/utilities"].reserved = reserved
  local function reserved63(x)
    return(reserved[x])
  end
  nexus["lumen/utilities"]["reserved?"] = reserved63
  local function numeric63(n)
    return(n > 47 and n < 58)
  end
  nexus["lumen/utilities"]["numeric?"] = numeric63
  local function valid_char63(n)
    return(numeric63(n) or n > 64 and n < 91 or n > 96 and n < 123 or n == 95)
  end
  nexus["lumen/utilities"]["valid-char?"] = valid_char63
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
            local valid63 = valid_char63(n)
            if not valid63 or i == 0 and numeric63(n) then
              return(false)
            end
            i = i + 1
          end
          return(true)
        end
      end
    end
  end
  nexus["lumen/utilities"]["valid-id?"] = valid_id63
  local function id(id)
    local id1 = ""
    local i = 0
    while i < length(id) do
      local c = char(id, i)
      local n = code(c)
      local _g99
      if c == "-" then
        _g99 = "_"
      else
        local _g100
        if valid_char63(n) then
          _g100 = c
        else
          local _g101
          if i == 0 then
            _g101 = "_" .. n
          else
            _g101 = n
          end
          _g100 = _g101
        end
        _g99 = _g100
      end
      local c1 = _g99
      id1 = id1 .. c1
      i = i + 1
    end
    return(id1)
  end
  nexus["lumen/utilities"].id = id
  local function sortk(l, k)
    return(sort(l, function (a, b)
      return(k(a) < k(b))
    end))
  end
  nexus["lumen/utilities"].sortk = sortk
  local function imported(spec, ...)
    local _g91 = unstash({...})
    local all = _g91.all
    local m = make_id()
    local k = module_key(spec)
    local imports = {}
    if nexus[k] then
      local _g92 = module(spec).export
      local n = nil
      for n in next, _g92 do
        if not number63(n) then
          local b = _g92[n]
          if b.variable and (all or b.export) then
            add(imports, {"%local", n, {"get", m, {"quote", n}}})
          end
        end
      end
    end
    if some63(imports) then
      return(join({{"%local", m, {"get", "nexus", {"quote", k}}}}, sortk(imports, sd)))
    end
  end
  nexus["lumen/utilities"].imported = imported
  local function linked(name, form)
    if toplevel63() then
      local k = module_key(current_module)
      return({"do", form, {"set", {"get", {"get", "nexus", {"quote", k}}, {"quote", name}}, name}})
    else
      return(form)
    end
  end
  nexus["lumen/utilities"].linked = linked
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
  nexus["lumen/utilities"]["quote-binding"] = quote_binding
  local function mapo(f, t)
    local o = {}
    local _g93 = t
    local k = nil
    for k in next, _g93 do
      if not number63(k) then
        local v = _g93[k]
        local x = f(v)
        if is63(x) then
          add(o, k)
          add(o, x)
        end
      end
    end
    return(o)
  end
  nexus["lumen/utilities"].mapo = mapo
  local function quote_frame(t)
    return(join({"%object"}, mapo(function (b)
      return(join({"table"}, quote_binding(b)))
    end, t)))
  end
  nexus["lumen/utilities"]["quote-frame"] = quote_frame
  local function quote_environment(env)
    return(join({"list"}, map(quote_frame, env)))
  end
  nexus["lumen/utilities"]["quote-environment"] = quote_environment
  local function quote_module(m)
    local _g94 = {"table"}
    _g94.alias = quoted(m.alias)
    _g94.export = quote_frame(m.export)
    _g94.import = quoted(m.import)
    return(_g94)
  end
  nexus["lumen/utilities"]["quote-module"] = quote_module
  local function quote_modules()
    return(join({"table"}, map(quote_module, modules)))
  end
  nexus["lumen/utilities"]["quote-modules"] = quote_modules
  local function initial_environment()
    return({{["define-module"] = getenv("define-module")}})
  end
  nexus["lumen/utilities"]["initial-environment"] = initial_environment
end)();
(function ()
  nexus["lumen/reader"] = {}
  local _g102 = nexus["lumen/runtime"]
  local _37 = _g102["%"]
  local _37message_handler = _g102["%message-handler"]
  local _42 = _g102["*"]
  local _43 = _g102["+"]
  local _ = _g102["-"]
  local _47 = _g102["/"]
  local _60 = _g102["<"]
  local _6061 = _g102["<="]
  local _61 = _g102["="]
  local _62 = _g102[">"]
  local _6261 = _g102[">="]
  local abs = _g102.abs
  local acos = _g102.acos
  local add = _g102.add
  local apply = _g102.apply
  local asin = _g102.asin
  local atan = _g102.atan
  local atan2 = _g102.atan2
  local atom63 = _g102["atom?"]
  local boolean63 = _g102["boolean?"]
  local cat = _g102.cat
  local ceil = _g102.ceil
  local char = _g102.char
  local code = _g102.code
  local composite63 = _g102["composite?"]
  local cos = _g102.cos
  local drop = _g102.drop
  local empty63 = _g102["empty?"]
  local exclude = _g102.exclude
  local exit = _g102.exit
  local extend = _g102.extend
  local find = _g102.find
  local flat = _g102.flat
  local flat1 = _g102.flat1
  local floor = _g102.floor
  local function63 = _g102["function?"]
  local hd = _g102.hd
  local id_literal63 = _g102["id-literal?"]
  local in63 = _g102["in?"]
  local inner = _g102.inner
  local is63 = _g102["is?"]
  local iterate = _g102.iterate
  local join = _g102.join
  local keep = _g102.keep
  local keys63 = _g102["keys?"]
  local last = _g102.last
  local length = _g102.length
  local list63 = _g102["list?"]
  local log = _g102.log
  local log10 = _g102.log10
  local make_id = _g102["make-id"]
  local map = _g102.map
  local max = _g102.max
  local min = _g102.min
  local module = _g102.module
  local module_key = _g102["module-key"]
  local nil63 = _g102["nil?"]
  local none63 = _g102["none?"]
  local now = _g102.now
  local number = _g102.number
  local number63 = _g102["number?"]
  local one63 = _g102["one?"]
  local pair = _g102.pair
  local pow = _g102.pow
  local random = _g102.random
  local read_file = _g102["read-file"]
  local reduce = _g102.reduce
  local replicate = _g102.replicate
  local reverse = _g102.reverse
  local sd = _g102.sd
  local search = _g102.search
  local setenv = _g102.setenv
  local sin = _g102.sin
  local sinh = _g102.sinh
  local some63 = _g102["some?"]
  local sort = _g102.sort
  local space = _g102.space
  local splice = _g102.splice
  local split = _g102.split
  local sqrt = _g102.sqrt
  local stash = _g102.stash
  local string = _g102.string
  local string_literal63 = _g102["string-literal?"]
  local string63 = _g102["string?"]
  local sub = _g102.sub
  local substring = _g102.substring
  local table63 = _g102["table?"]
  local tan = _g102.tan
  local tanh = _g102.tanh
  local td = _g102.td
  local tl = _g102.tl
  local today = _g102.today
  local toplevel63 = _g102["toplevel?"]
  local unstash = _g102.unstash
  local write = _g102.write
  local write_file = _g102["write-file"]
  local delimiters = {["("] = true, [")"] = true, [";"] = true, ["\n"] = true}
  nexus["lumen/reader"].delimiters = delimiters
  local whitespace = {[" "] = true, ["\n"] = true, ["\t"] = true}
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
    return(read(make_stream(str)))
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
            if dot63 then
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
  local _g113 = nexus["lumen/runtime"]
  local _37 = _g113["%"]
  local _37message_handler = _g113["%message-handler"]
  local _42 = _g113["*"]
  local _43 = _g113["+"]
  local _ = _g113["-"]
  local _47 = _g113["/"]
  local _60 = _g113["<"]
  local _6061 = _g113["<="]
  local _61 = _g113["="]
  local _62 = _g113[">"]
  local _6261 = _g113[">="]
  local abs = _g113.abs
  local acos = _g113.acos
  local add = _g113.add
  local apply = _g113.apply
  local asin = _g113.asin
  local atan = _g113.atan
  local atan2 = _g113.atan2
  local atom63 = _g113["atom?"]
  local boolean63 = _g113["boolean?"]
  local cat = _g113.cat
  local ceil = _g113.ceil
  local char = _g113.char
  local code = _g113.code
  local composite63 = _g113["composite?"]
  local cos = _g113.cos
  local drop = _g113.drop
  local empty63 = _g113["empty?"]
  local exclude = _g113.exclude
  local exit = _g113.exit
  local extend = _g113.extend
  local find = _g113.find
  local flat = _g113.flat
  local flat1 = _g113.flat1
  local floor = _g113.floor
  local function63 = _g113["function?"]
  local hd = _g113.hd
  local id_literal63 = _g113["id-literal?"]
  local in63 = _g113["in?"]
  local inner = _g113.inner
  local is63 = _g113["is?"]
  local iterate = _g113.iterate
  local join = _g113.join
  local keep = _g113.keep
  local keys63 = _g113["keys?"]
  local last = _g113.last
  local length = _g113.length
  local list63 = _g113["list?"]
  local log = _g113.log
  local log10 = _g113.log10
  local make_id = _g113["make-id"]
  local map = _g113.map
  local max = _g113.max
  local min = _g113.min
  local module = _g113.module
  local module_key = _g113["module-key"]
  local nil63 = _g113["nil?"]
  local none63 = _g113["none?"]
  local now = _g113.now
  local number = _g113.number
  local number63 = _g113["number?"]
  local one63 = _g113["one?"]
  local pair = _g113.pair
  local pow = _g113.pow
  local random = _g113.random
  local read_file = _g113["read-file"]
  local reduce = _g113.reduce
  local replicate = _g113.replicate
  local reverse = _g113.reverse
  local sd = _g113.sd
  local search = _g113.search
  local setenv = _g113.setenv
  local sin = _g113.sin
  local sinh = _g113.sinh
  local some63 = _g113["some?"]
  local sort = _g113.sort
  local space = _g113.space
  local splice = _g113.splice
  local split = _g113.split
  local sqrt = _g113.sqrt
  local stash = _g113.stash
  local string = _g113.string
  local string_literal63 = _g113["string-literal?"]
  local string63 = _g113["string?"]
  local sub = _g113.sub
  local substring = _g113.substring
  local table63 = _g113["table?"]
  local tan = _g113.tan
  local tanh = _g113.tanh
  local td = _g113.td
  local tl = _g113.tl
  local today = _g113.today
  local toplevel63 = _g113["toplevel?"]
  local unstash = _g113.unstash
  local write = _g113.write
  local write_file = _g113["write-file"]
  local _g116 = nexus["lumen/utilities"]
  local bind = _g116.bind
  local bind42 = _g116["bind*"]
  local bound63 = _g116["bound?"]
  local getenv = _g116.getenv
  local id = _g116.id
  local imported = _g116.imported
  local indentation = _g116.indentation
  local initial_environment = _g116["initial-environment"]
  local linked = _g116.linked
  local macro_function = _g116["macro-function"]
  local macro63 = _g116["macro?"]
  local macroexpand = _g116.macroexpand
  local mapo = _g116.mapo
  local quasiexpand = _g116.quasiexpand
  local quote_environment = _g116["quote-environment"]
  local quote_modules = _g116["quote-modules"]
  local quoted = _g116.quoted
  local reserved63 = _g116["reserved?"]
  local sortk = _g116.sortk
  local special_form63 = _g116["special-form?"]
  local special63 = _g116["special?"]
  local stash42 = _g116["stash*"]
  local statement63 = _g116["statement?"]
  local symbol_expansion = _g116["symbol-expansion"]
  local symbol63 = _g116["symbol?"]
  local valid_id63 = _g116["valid-id?"]
  local variable63 = _g116["variable?"]
  local _g117 = nexus["lumen/reader"]
  local make_stream = _g117["make-stream"]
  local read = _g117.read
  local read_all = _g117["read-all"]
  local read_from_string = _g117["read-from-string"]
  local read_table = _g117["read-table"]
  local _g121 = {}
  _g121.js = "!"
  _g121.lua = "not "
  local _g119 = {}
  local _g122 = {}
  _g122.js = "!"
  _g122.lua = "not "
  _g119["not"] = _g122
  local _g124 = {}
  _g124["%"] = true
  _g124["*"] = true
  _g124["/"] = true
  local _g126 = {}
  _g126["+"] = true
  _g126["-"] = true
  local _g130 = {}
  _g130.js = "+"
  _g130.lua = ".."
  local _g128 = {}
  local _g131 = {}
  _g131.js = "+"
  _g131.lua = ".."
  _g128.cat = _g131
  local _g133 = {}
  _g133["<"] = true
  _g133["<="] = true
  _g133[">"] = true
  _g133[">="] = true
  local _g137 = {}
  _g137.js = "==="
  _g137.lua = "=="
  local _g139 = {}
  _g139.js = "!="
  _g139.lua = "~="
  local _g135 = {}
  local _g140 = {}
  _g140.js = "==="
  _g140.lua = "=="
  _g135["="] = _g140
  local _g141 = {}
  _g141.js = "!="
  _g141.lua = "~="
  _g135["~="] = _g141
  local _g145 = {}
  _g145.js = "&&"
  _g145.lua = "and"
  local _g143 = {}
  local _g146 = {}
  _g146.js = "&&"
  _g146.lua = "and"
  _g143["and"] = _g146
  local _g150 = {}
  _g150.js = "||"
  _g150.lua = "or"
  local _g148 = {}
  local _g151 = {}
  _g151.js = "||"
  _g151.lua = "or"
  _g148["or"] = _g151
  local infix = {_g119, _g124, _g126, _g128, _g133, _g135, _g143, _g148}
  nexus["lumen/compiler"].infix = infix
  local function unary63(form)
    local op = form[1]
    local args = sub(form, 1)
    return(one63(args) and in63(op, {"not", "-"}))
  end
  nexus["lumen/compiler"]["unary?"] = unary63
  local function precedence(form)
    if list63(form) and not unary63(form) then
      local _g152 = infix
      local i = 0
      while i < length(_g152) do
        local level = _g152[i + 1]
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
    local _g153 = args
    local i = 0
    while i < length(_g153) do
      local arg = _g153[i + 1]
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
    local _g154 = getenv(x)
    local special = _g154.special
    local stmt = _g154.stmt
    local self_tr63 = _g154.tr
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
    local _g155 = unstash({...})
    local right = _g155.right
    local _g182
    if right then
      _g182 = _6261
    else
      _g182 = _62
    end
    if _g182(precedence(child), precedence(parent)) then
      return({"(", ")"})
    else
      return({"", ""})
    end
  end
  nexus["lumen/compiler"]["op-delims"] = op_delims
  local function compile_infix(form)
    local op = form[1]
    local _g156 = sub(form, 1)
    local a = _g156[1]
    local b = _g156[2]
    local _g157 = op_delims(form, a)
    local ao = _g157[1]
    local ac = _g157[2]
    local _g158 = op_delims(form, b, {_stash = true, right = true})
    local bo = _g158[1]
    local bc = _g158[2]
    local _g159 = compile(a)
    local _g160 = compile(b)
    local _g161 = getop(op)
    if unary63(form) then
      return(_g161 .. ao .. _g159 .. ac)
    else
      return(ao .. _g159 .. ac .. " " .. _g161 .. " " .. bo .. _g160 .. bc)
    end
  end
  nexus["lumen/compiler"]["compile-infix"] = compile_infix
  local function compile_function(args, body, ...)
    local _g162 = unstash({...})
    local name = _g162.name
    local prefix = _g162.prefix
    local _g183
    if name then
      _g183 = compile(name)
    else
      _g183 = ""
    end
    local id = _g183
    local _g163 = prefix or ""
    local _g164 = compile_args(args)
    indent_level = indent_level + 1
    local _g166 = compile(body, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local _g165 = _g166
    local ind = indentation()
    local _g184
    if target == "js" then
      _g184 = ""
    else
      _g184 = "end"
    end
    local tr = _g184
    if name then
      tr = tr .. "\n"
    end
    if target == "js" then
      return("function " .. id .. _g164 .. " {\n" .. _g165 .. ind .. "}" .. tr)
    else
      return(_g163 .. "function " .. id .. _g164 .. "\n" .. _g165 .. ind .. tr)
    end
  end
  nexus["lumen/compiler"]["compile-function"] = compile_function
  local function can_return63(form)
    return(is63(form) and (atom63(form) or not (hd(form) == "return") and not statement63(hd(form))))
  end
  nexus["lumen/compiler"]["can-return?"] = can_return63
  compile = function (form, ...)
    local _g167 = unstash({...})
    local stmt = _g167.stmt
    if nil63(form) then
      return("")
    else
      if special_form63(form) then
        return(compile_special(form, stmt))
      else
        local tr = terminator(stmt)
        local _g185
        if stmt then
          _g185 = indentation()
        else
          _g185 = ""
        end
        local ind = _g185
        local _g186
        if atom63(form) then
          _g186 = compile_atom(form)
        else
          local _g187
          if infix63(hd(form)) then
            _g187 = compile_infix(form)
          else
            _g187 = compile_call(form)
          end
          _g186 = _g187
        end
        local _g168 = _g186
        return(ind .. _g168 .. tr)
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
    local _g169 = sub(args, 0, length(args) - 1)
    local _g170 = 0
    while _g170 < length(_g169) do
      local x = _g169[_g170 + 1]
      add(hoist, lower(x, hoist, stmt63))
      _g170 = _g170 + 1
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
    local _g171 = args[2]
    local _g172 = args[3]
    if stmt63 or tail63 then
      local _g189
      if _g172 then
        _g189 = {lower_body({_g172}, tail63)}
      end
      return(add(hoist, join({"%if", lower(cond, hoist), lower_body({_g171}, tail63)}, _g189)))
    else
      local e = make_id()
      add(hoist, {"%local", e})
      local _g188
      if _g172 then
        _g188 = {lower({"set", e, _g172})}
      end
      add(hoist, join({"%if", lower(cond, hoist), lower({"set", e, _g171})}, _g188))
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
      local _g190
      if x == "and" then
        _g190 = {"%if", id, b, id}
      else
        _g190 = {"%if", id, id, b}
      end
      return(lower({"do", {"%local", id, a}, _g190}, hoist))
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
    local _g173 = args[2]
    local body = sub(args, 2)
    return(add(hoist, {kind, name, _g173, lower_body(body, true)}))
  end
  nexus["lumen/compiler"]["lower-definition"] = lower_definition
  local function lower_call(form, hoist)
    local _g174 = map(function (x)
      return(lower(x, hoist))
    end, form)
    if some63(_g174) then
      return(_g174)
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
    local _g175 = unstash({...})
    local all = _g175.all
    local m = module(spec)
    local frame = last(environment)
    local _g176 = m.export
    local k = nil
    for k in next, _g176 do
      if not number63(k) then
        local v = _g176[k]
        if v.export or all then
          frame[k] = v
        end
      end
    end
  end
  nexus["lumen/compiler"]["open-module"] = open_module
  local function load_module(spec, ...)
    local _g177 = unstash({...})
    local all = _g177.all
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
    local _g178 = specs or {}
    local _g179 = 0
    while _g179 < length(_g178) do
      local spec = _g178[_g179 + 1]
      load_module(spec)
      local m = module(spec)
      if m.alias then
        local _g180 = import_modules(m.alias)
        local aliased = _g180[1]
        local bs = _g180[2]
        imports = join(imports, aliased)
        bindings = join(bindings, bs)
      else
        local _g181 = imported(spec)
        add(imports, spec)
        bindings = join(bindings, _g181)
      end
      _g179 = _g179 + 1
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
  local _g191 = nexus["lumen/runtime"]
  local _37 = _g191["%"]
  local _37message_handler = _g191["%message-handler"]
  local _42 = _g191["*"]
  local _43 = _g191["+"]
  local _ = _g191["-"]
  local _47 = _g191["/"]
  local _60 = _g191["<"]
  local _6061 = _g191["<="]
  local _61 = _g191["="]
  local _62 = _g191[">"]
  local _6261 = _g191[">="]
  local abs = _g191.abs
  local acos = _g191.acos
  local add = _g191.add
  local apply = _g191.apply
  local asin = _g191.asin
  local atan = _g191.atan
  local atan2 = _g191.atan2
  local atom63 = _g191["atom?"]
  local boolean63 = _g191["boolean?"]
  local cat = _g191.cat
  local ceil = _g191.ceil
  local char = _g191.char
  local code = _g191.code
  local composite63 = _g191["composite?"]
  local cos = _g191.cos
  local drop = _g191.drop
  local empty63 = _g191["empty?"]
  local exclude = _g191.exclude
  local exit = _g191.exit
  local extend = _g191.extend
  local find = _g191.find
  local flat = _g191.flat
  local flat1 = _g191.flat1
  local floor = _g191.floor
  local function63 = _g191["function?"]
  local hd = _g191.hd
  local id_literal63 = _g191["id-literal?"]
  local in63 = _g191["in?"]
  local inner = _g191.inner
  local is63 = _g191["is?"]
  local iterate = _g191.iterate
  local join = _g191.join
  local keep = _g191.keep
  local keys63 = _g191["keys?"]
  local last = _g191.last
  local length = _g191.length
  local list63 = _g191["list?"]
  local log = _g191.log
  local log10 = _g191.log10
  local make_id = _g191["make-id"]
  local map = _g191.map
  local max = _g191.max
  local min = _g191.min
  local module = _g191.module
  local module_key = _g191["module-key"]
  local nil63 = _g191["nil?"]
  local none63 = _g191["none?"]
  local now = _g191.now
  local number = _g191.number
  local number63 = _g191["number?"]
  local one63 = _g191["one?"]
  local pair = _g191.pair
  local pow = _g191.pow
  local random = _g191.random
  local read_file = _g191["read-file"]
  local reduce = _g191.reduce
  local replicate = _g191.replicate
  local reverse = _g191.reverse
  local sd = _g191.sd
  local search = _g191.search
  local setenv = _g191.setenv
  local sin = _g191.sin
  local sinh = _g191.sinh
  local some63 = _g191["some?"]
  local sort = _g191.sort
  local space = _g191.space
  local splice = _g191.splice
  local split = _g191.split
  local sqrt = _g191.sqrt
  local stash = _g191.stash
  local string = _g191.string
  local string_literal63 = _g191["string-literal?"]
  local string63 = _g191["string?"]
  local sub = _g191.sub
  local substring = _g191.substring
  local table63 = _g191["table?"]
  local tan = _g191.tan
  local tanh = _g191.tanh
  local td = _g191.td
  local tl = _g191.tl
  local today = _g191.today
  local toplevel63 = _g191["toplevel?"]
  local unstash = _g191.unstash
  local write = _g191.write
  local write_file = _g191["write-file"]
  local _g194 = nexus["lumen/utilities"]
  local bind = _g194.bind
  local bind42 = _g194["bind*"]
  local bound63 = _g194["bound?"]
  local getenv = _g194.getenv
  local id = _g194.id
  local imported = _g194.imported
  local indentation = _g194.indentation
  local initial_environment = _g194["initial-environment"]
  local linked = _g194.linked
  local macro_function = _g194["macro-function"]
  local macro63 = _g194["macro?"]
  local macroexpand = _g194.macroexpand
  local mapo = _g194.mapo
  local quasiexpand = _g194.quasiexpand
  local quote_environment = _g194["quote-environment"]
  local quote_modules = _g194["quote-modules"]
  local quoted = _g194.quoted
  local reserved63 = _g194["reserved?"]
  local sortk = _g194.sortk
  local special_form63 = _g194["special-form?"]
  local special63 = _g194["special?"]
  local stash42 = _g194["stash*"]
  local statement63 = _g194["statement?"]
  local symbol_expansion = _g194["symbol-expansion"]
  local symbol63 = _g194["symbol?"]
  local valid_id63 = _g194["valid-id?"]
  local variable63 = _g194["variable?"]
  local _g195 = nexus["lumen/compiler"]
  local compile = _g195.compile
  local compile_function = _g195["compile-function"]
  local compile_module = _g195["compile-module"]
  local declare = _g195.declare
  local eval = _g195.eval
  local import_modules = _g195["import-modules"]
  local in_module = _g195["in-module"]
  local load_module = _g195["load-module"]
  local open_module = _g195["open-module"]
end)();
(function ()
  nexus["lumen/core"] = {}
  local _g375 = nexus["lumen/runtime"]
  local _37 = _g375["%"]
  local _37message_handler = _g375["%message-handler"]
  local _42 = _g375["*"]
  local _43 = _g375["+"]
  local _ = _g375["-"]
  local _47 = _g375["/"]
  local _60 = _g375["<"]
  local _6061 = _g375["<="]
  local _61 = _g375["="]
  local _62 = _g375[">"]
  local _6261 = _g375[">="]
  local abs = _g375.abs
  local acos = _g375.acos
  local add = _g375.add
  local apply = _g375.apply
  local asin = _g375.asin
  local atan = _g375.atan
  local atan2 = _g375.atan2
  local atom63 = _g375["atom?"]
  local boolean63 = _g375["boolean?"]
  local cat = _g375.cat
  local ceil = _g375.ceil
  local char = _g375.char
  local code = _g375.code
  local composite63 = _g375["composite?"]
  local cos = _g375.cos
  local drop = _g375.drop
  local empty63 = _g375["empty?"]
  local exclude = _g375.exclude
  local exit = _g375.exit
  local extend = _g375.extend
  local find = _g375.find
  local flat = _g375.flat
  local flat1 = _g375.flat1
  local floor = _g375.floor
  local function63 = _g375["function?"]
  local hd = _g375.hd
  local id_literal63 = _g375["id-literal?"]
  local in63 = _g375["in?"]
  local inner = _g375.inner
  local is63 = _g375["is?"]
  local iterate = _g375.iterate
  local join = _g375.join
  local keep = _g375.keep
  local keys63 = _g375["keys?"]
  local last = _g375.last
  local length = _g375.length
  local list63 = _g375["list?"]
  local log = _g375.log
  local log10 = _g375.log10
  local make_id = _g375["make-id"]
  local map = _g375.map
  local max = _g375.max
  local min = _g375.min
  local module = _g375.module
  local module_key = _g375["module-key"]
  local nil63 = _g375["nil?"]
  local none63 = _g375["none?"]
  local now = _g375.now
  local number = _g375.number
  local number63 = _g375["number?"]
  local one63 = _g375["one?"]
  local pair = _g375.pair
  local pow = _g375.pow
  local random = _g375.random
  local read_file = _g375["read-file"]
  local reduce = _g375.reduce
  local replicate = _g375.replicate
  local reverse = _g375.reverse
  local sd = _g375.sd
  local search = _g375.search
  local setenv = _g375.setenv
  local sin = _g375.sin
  local sinh = _g375.sinh
  local some63 = _g375["some?"]
  local sort = _g375.sort
  local space = _g375.space
  local splice = _g375.splice
  local split = _g375.split
  local sqrt = _g375.sqrt
  local stash = _g375.stash
  local string = _g375.string
  local string_literal63 = _g375["string-literal?"]
  local string63 = _g375["string?"]
  local sub = _g375.sub
  local substring = _g375.substring
  local table63 = _g375["table?"]
  local tan = _g375.tan
  local tanh = _g375.tanh
  local td = _g375.td
  local tl = _g375.tl
  local today = _g375.today
  local toplevel63 = _g375["toplevel?"]
  local unstash = _g375.unstash
  local write = _g375.write
  local write_file = _g375["write-file"]
  local _g378 = nexus["lumen/utilities"]
  local bind = _g378.bind
  local bind42 = _g378["bind*"]
  local bound63 = _g378["bound?"]
  local getenv = _g378.getenv
  local id = _g378.id
  local imported = _g378.imported
  local indentation = _g378.indentation
  local initial_environment = _g378["initial-environment"]
  local linked = _g378.linked
  local macro_function = _g378["macro-function"]
  local macro63 = _g378["macro?"]
  local macroexpand = _g378.macroexpand
  local mapo = _g378.mapo
  local quasiexpand = _g378.quasiexpand
  local quote_environment = _g378["quote-environment"]
  local quote_modules = _g378["quote-modules"]
  local quoted = _g378.quoted
  local reserved63 = _g378["reserved?"]
  local sortk = _g378.sortk
  local special_form63 = _g378["special-form?"]
  local special63 = _g378["special?"]
  local stash42 = _g378["stash*"]
  local statement63 = _g378["statement?"]
  local symbol_expansion = _g378["symbol-expansion"]
  local symbol63 = _g378["symbol?"]
  local valid_id63 = _g378["valid-id?"]
  local variable63 = _g378["variable?"]
  local _g379 = nexus["lumen/compiler"]
  local compile = _g379.compile
  local compile_function = _g379["compile-function"]
  local compile_module = _g379["compile-module"]
  local declare = _g379.declare
  local eval = _g379.eval
  local import_modules = _g379["import-modules"]
  local in_module = _g379["in-module"]
  local load_module = _g379["load-module"]
  local open_module = _g379["open-module"]
  target = "lua"
end)();
(function ()
  nexus["lumen/boot"] = {}
  local _g678 = nexus["lumen/runtime"]
  local _37 = _g678["%"]
  local _37message_handler = _g678["%message-handler"]
  local _42 = _g678["*"]
  local _43 = _g678["+"]
  local _ = _g678["-"]
  local _47 = _g678["/"]
  local _60 = _g678["<"]
  local _6061 = _g678["<="]
  local _61 = _g678["="]
  local _62 = _g678[">"]
  local _6261 = _g678[">="]
  local abs = _g678.abs
  local acos = _g678.acos
  local add = _g678.add
  local apply = _g678.apply
  local asin = _g678.asin
  local atan = _g678.atan
  local atan2 = _g678.atan2
  local atom63 = _g678["atom?"]
  local boolean63 = _g678["boolean?"]
  local cat = _g678.cat
  local ceil = _g678.ceil
  local char = _g678.char
  local code = _g678.code
  local composite63 = _g678["composite?"]
  local cos = _g678.cos
  local drop = _g678.drop
  local empty63 = _g678["empty?"]
  local exclude = _g678.exclude
  local exit = _g678.exit
  local extend = _g678.extend
  local find = _g678.find
  local flat = _g678.flat
  local flat1 = _g678.flat1
  local floor = _g678.floor
  local function63 = _g678["function?"]
  local hd = _g678.hd
  local id_literal63 = _g678["id-literal?"]
  local in63 = _g678["in?"]
  local inner = _g678.inner
  local is63 = _g678["is?"]
  local iterate = _g678.iterate
  local join = _g678.join
  local keep = _g678.keep
  local keys63 = _g678["keys?"]
  local last = _g678.last
  local length = _g678.length
  local list63 = _g678["list?"]
  local log = _g678.log
  local log10 = _g678.log10
  local make_id = _g678["make-id"]
  local map = _g678.map
  local max = _g678.max
  local min = _g678.min
  local module = _g678.module
  local module_key = _g678["module-key"]
  local nil63 = _g678["nil?"]
  local none63 = _g678["none?"]
  local now = _g678.now
  local number = _g678.number
  local number63 = _g678["number?"]
  local one63 = _g678["one?"]
  local pair = _g678.pair
  local pow = _g678.pow
  local random = _g678.random
  local read_file = _g678["read-file"]
  local reduce = _g678.reduce
  local replicate = _g678.replicate
  local reverse = _g678.reverse
  local sd = _g678.sd
  local search = _g678.search
  local setenv = _g678.setenv
  local sin = _g678.sin
  local sinh = _g678.sinh
  local some63 = _g678["some?"]
  local sort = _g678.sort
  local space = _g678.space
  local splice = _g678.splice
  local split = _g678.split
  local sqrt = _g678.sqrt
  local stash = _g678.stash
  local string = _g678.string
  local string_literal63 = _g678["string-literal?"]
  local string63 = _g678["string?"]
  local sub = _g678.sub
  local substring = _g678.substring
  local table63 = _g678["table?"]
  local tan = _g678.tan
  local tanh = _g678.tanh
  local td = _g678.td
  local tl = _g678.tl
  local today = _g678.today
  local toplevel63 = _g678["toplevel?"]
  local unstash = _g678.unstash
  local write = _g678.write
  local write_file = _g678["write-file"]
  local _g681 = nexus["lumen/utilities"]
  local bind = _g681.bind
  local bind42 = _g681["bind*"]
  local bound63 = _g681["bound?"]
  local getenv = _g681.getenv
  local id = _g681.id
  local imported = _g681.imported
  local indentation = _g681.indentation
  local initial_environment = _g681["initial-environment"]
  local linked = _g681.linked
  local macro_function = _g681["macro-function"]
  local macro63 = _g681["macro?"]
  local macroexpand = _g681.macroexpand
  local mapo = _g681.mapo
  local quasiexpand = _g681.quasiexpand
  local quote_environment = _g681["quote-environment"]
  local quote_modules = _g681["quote-modules"]
  local quoted = _g681.quoted
  local reserved63 = _g681["reserved?"]
  local sortk = _g681.sortk
  local special_form63 = _g681["special-form?"]
  local special63 = _g681["special?"]
  local stash42 = _g681["stash*"]
  local statement63 = _g681["statement?"]
  local symbol_expansion = _g681["symbol-expansion"]
  local symbol63 = _g681["symbol?"]
  local valid_id63 = _g681["valid-id?"]
  local variable63 = _g681["variable?"]
  local _g682 = nexus["lumen/compiler"]
  local compile = _g682.compile
  local compile_function = _g682["compile-function"]
  local compile_module = _g682["compile-module"]
  local declare = _g682.declare
  local eval = _g682.eval
  local import_modules = _g682["import-modules"]
  local in_module = _g682["in-module"]
  local load_module = _g682["load-module"]
  local open_module = _g682["open-module"]
  modules = {lumen = {alias = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}}, export = {}, import = {{"lumen", "special"}}}, ["lumen/boot"] = {export = {["%initial-environment"] = {macro = function ()
    return(quote_environment(initial_environment()))
  end}, ["%initial-modules"] = {macro = function ()
    return(quote_modules())
  end}, modules = {export = true, global = true}}, import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}, {"lumen", "utilities"}, {"lumen", "compiler"}}}, ["lumen/compiler"] = {export = {["%compile-module"] = {variable = true}, ["%result"] = {export = true, global = true}, ["can-return?"] = {variable = true}, compile = {export = true, variable = true}, ["compile-args"] = {variable = true}, ["compile-atom"] = {variable = true}, ["compile-call"] = {variable = true}, ["compile-file"] = {variable = true}, ["compile-function"] = {export = true, variable = true}, ["compile-infix"] = {variable = true}, ["compile-module"] = {export = true, variable = true}, ["compile-special"] = {variable = true}, ["compiler-output"] = {variable = true}, ["compiling?"] = {variable = true}, conclude = {variable = true}, ["current-module"] = {export = true, global = true}, declare = {export = true, variable = true}, encapsulate = {variable = true}, eval = {export = true, variable = true}, getop = {variable = true}, ["import-modules"] = {export = true, variable = true}, ["in-module"] = {export = true, variable = true}, infix = {variable = true}, ["infix?"] = {variable = true}, ["load-module"] = {export = true, variable = true}, lower = {variable = true}, ["lower-body"] = {variable = true}, ["lower-call"] = {variable = true}, ["lower-definition"] = {variable = true}, ["lower-do"] = {variable = true}, ["lower-for"] = {variable = true}, ["lower-function"] = {variable = true}, ["lower-if"] = {variable = true}, ["lower-infix"] = {variable = true}, ["lower-infix?"] = {variable = true}, ["lower-short"] = {variable = true}, ["lower-special"] = {variable = true}, ["lower-statement"] = {variable = true}, ["lower-try"] = {variable = true}, ["lower-while"] = {variable = true}, ["module-path"] = {variable = true}, ["op-delims"] = {variable = true}, ["open-module"] = {export = true, variable = true}, ["parenthesize-call?"] = {variable = true}, precedence = {variable = true}, process = {variable = true}, reimported = {variable = true}, run = {variable = true}, terminator = {variable = true}, ["unary?"] = {variable = true}}, import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}, {"lumen", "utilities"}, {"lumen", "reader"}}}, ["lumen/core"] = {export = {at = {export = true, macro = function (l, i)
    if target == "lua" and number63(i) then
      i = i + 1
    else
      if target == "lua" then
        i = {"+", i, 1}
      end
    end
    return({"get", l, i})
  end}, ["cat!"] = {export = true, macro = function (a, ...)
    local bs = unstash({...})
    local _g736 = sub(bs, 0)
    return({"set", a, join({"cat", a}, _g736)})
  end}, dec = {export = true, macro = function (n, by)
    return({"set", n, {"-", n, by or 1}})
  end}, define = {export = true, macro = function (name, x, ...)
    local body = unstash({...})
    local _g715 = sub(body, 0)
    setenv(name, {_stash = true, variable = true})
    if some63(_g715) and target == "js" then
      return(linked(name, {"%local", name, join({"fn", x}, _g715)}))
    else
      if some63(_g715) then
        local _g716 = bind42(x, _g715)
        local args = _g716[1]
        local _g717 = _g716[2]
        return(linked(name, join({"%local-function", name, args}, _g717)))
      else
        return(linked(name, {"%local", name, x}))
      end
    end
  end}, ["define*"] = {export = true, macro = function (name, x, ...)
    local body = unstash({...})
    local _g712 = sub(body, 0)
    setenv(name, {_stash = true, export = true, global = true})
    if some63(_g712) then
      local _g713 = bind42(x, _g712)
      local args = _g713[1]
      local _g714 = _g713[2]
      return(join({"%global-function", name, args}, _g714))
    else
      if target == "js" then
        return({"set", {"get", "global", {"quote", id(name)}}, x})
      else
        return({"set", name, x})
      end
    end
  end}, ["define-macro"] = {export = true, macro = function (name, args, ...)
    local body = unstash({...})
    local _g708 = sub(body, 0)
    local form = join({"fn", args}, _g708)
    local _g709 = {"setenv", {"quote", name}}
    _g709.form = {"quote", form}
    _g709.macro = form
    eval(_g709)
    return(nil)
  end}, ["define-module"] = {export = true, macro = function (spec, ...)
    local body = unstash({...})
    local _g704 = sub(body, 0)
    local alias = _g704.alias
    local exp = _g704.export
    local imp = _g704.import
    local _g705 = import_modules(imp)
    local imports = _g705[1]
    local bindings = _g705[2]
    local k = module_key(spec)
    modules[k] = {alias = alias, export = {}, import = imports}
    local _g706 = exp or {}
    local _g707 = 0
    while _g707 < length(_g706) do
      local x = _g706[_g707 + 1]
      setenv(x, {_stash = true, export = true})
      _g707 = _g707 + 1
    end
    return(join({"do", {"set", {"get", "nexus", {"quote", k}}, {"table"}}}, bindings))
  end}, ["define-special"] = {export = true, macro = function (name, args, ...)
    local body = unstash({...})
    local _g710 = sub(body, 0)
    local form = join({"fn", args}, _g710)
    local keys = sub(_g710, length(_g710))
    local _g711 = {"setenv", {"quote", name}}
    _g711.form = {"quote", form}
    _g711.special = form
    eval(join(_g711, keys))
    return(nil)
  end}, ["define-symbol"] = {export = true, macro = function (name, expansion)
    setenv(name, {_stash = true, symbol = expansion})
    return(nil)
  end}, each = {export = true, macro = function (b, t, ...)
    local body = unstash({...})
    local _g731 = sub(body, 0)
    local k = b[1]
    local v = b[2]
    local t1 = make_id()
    local _g767
    if nil63(v) then
      local _g768
      if b.i then
        _g768 = "i"
      else
        _g768 = make_id()
      end
      local i = _g768
      _g767 = {"let", {i, 0}, {"while", {"<", i, {"length", t1}}, join({"let", {k, {"at", t1, i}}}, _g731), {"inc", i}}}
    else
      local _g732 = {"target"}
      _g732.js = {"isNaN", {"parseInt", k}}
      _g732.lua = {"not", {"number?", k}}
      _g767 = {"let", {k, "nil"}, {"%for", t1, k, {"when", _g732, join({"let", {v, {"get", t1, k}}}, _g731)}}}
    end
    return({"let", {t1, t}, _g767})
  end}, fn = {export = true, macro = function (args, ...)
    local body = unstash({...})
    local _g727 = sub(body, 0)
    local _g728 = bind42(args, _g727)
    local _g729 = _g728[1]
    local _g730 = _g728[2]
    return(join({"%function", _g729}, _g730))
  end}, guard = {export = true, macro = function (expr)
    if target == "js" then
      return({{"fn", {}, {"%try", {"list", true, expr}}}})
    else
      local e = make_id()
      local x = make_id()
      local ex = "|" .. e .. "," .. x .. "|"
      return({"let", {ex, {"xpcall", {"fn", {}, expr}, "%message-handler"}}, {"list", e, x}})
    end
  end}, ["if"] = {export = true, macro = function (...)
    local branches = unstash({...})
    local function step(_g696)
      local a = _g696[1]
      local b = _g696[2]
      local c = sub(_g696, 2)
      if is63(b) then
        return({join({"%if", a, b}, step(c))})
      else
        if is63(a) then
          return({a})
        end
      end
    end
    return(hd(step(branches)))
  end}, inc = {export = true, macro = function (n, by)
    return({"set", n, {"+", n, by or 1}})
  end}, ["join!"] = {export = true, macro = function (a, ...)
    local bs = unstash({...})
    local _g735 = sub(bs, 0)
    return({"set", a, join({"join*", a}, _g735)})
  end}, ["join*"] = {export = true, macro = function (...)
    local xs = unstash({...})
    return(reduce(function (a, b)
      return({"join", a, b})
    end, xs))
  end}, language = {export = true, macro = function ()
    return({"quote", target})
  end}, let = {export = true, macro = function (bindings, ...)
    local body = unstash({...})
    local _g699 = sub(body, 0)
    local i = 0
    local renames = {}
    local locals = {}
    map(function (_g700)
      local lh = _g700[1]
      local rh = _g700[2]
      local _g701 = bind(lh, rh)
      local _g702 = 0
      while _g702 < length(_g701) do
        local _g703 = _g701[_g702 + 1]
        local id = _g703[1]
        local val = _g703[2]
        if bound63(id) or reserved63(id) or toplevel63() then
          local rename = make_id()
          add(renames, id)
          add(renames, rename)
          id = rename
        else
          setenv(id, {_stash = true, variable = true})
        end
        add(locals, {"%local", id, val})
        _g702 = _g702 + 1
      end
    end, pair(bindings))
    return(join({"do"}, join(locals, {join({"let-symbol", renames}, _g699)})))
  end}, ["let-macro"] = {export = true, macro = function (definitions, ...)
    local body = unstash({...})
    local _g722 = sub(body, 0)
    add(environment, {})
    map(function (m)
      return(macroexpand(join({"define-macro"}, m)))
    end, definitions)
    local _g723 = join({"do"}, macroexpand(_g722))
    drop(environment)
    return(_g723)
  end}, ["let-symbol"] = {export = true, macro = function (expansions, ...)
    local body = unstash({...})
    local _g724 = sub(body, 0)
    add(environment, {})
    map(function (_g726)
      local name = _g726[1]
      local exp = _g726[2]
      return(macroexpand({"define-symbol", name, exp}))
    end, pair(expansions))
    local _g725 = join({"do"}, macroexpand(_g724))
    drop(environment)
    return(_g725)
  end}, list = {export = true, macro = function (...)
    local body = unstash({...})
    local l = join({"%array"}, body)
    if not keys63(body) then
      return(l)
    else
      local id = make_id()
      local init = {}
      local _g695 = body
      local k = nil
      for k in next, _g695 do
        if not number63(k) then
          local v = _g695[k]
          add(init, {k, {"set", {"get", id, {"quote", k}}, v}})
        end
      end
      return(join({"let", {id, l}}, join(map(sd, sortk(init, hd)), {id})))
    end
  end}, pr = {export = true, macro = function (...)
    local xs = unstash({...})
    return({"print", space(xs)})
  end}, quasiquote = {export = true, macro = function (form)
    return(quasiexpand(form, 1))
  end}, quote = {export = true, macro = function (form)
    return(quoted(form))
  end}, ["set*"] = {export = true, macro = function (name, value)
    return(linked(name, {"set", name, value}))
  end}, ["set-of"] = {export = true, macro = function (...)
    local elements = unstash({...})
    local l = {}
    local _g733 = elements
    local _g734 = 0
    while _g734 < length(_g733) do
      local e = _g733[_g734 + 1]
      l[e] = true
      _g734 = _g734 + 1
    end
    return(join({"table"}, l))
  end}, table = {export = true, macro = function (...)
    local body = unstash({...})
    return(join({"%object"}, mapo(function (x)
      return(x)
    end, body)))
  end}, target = {export = true, global = true, macro = function (...)
    local clauses = unstash({...})
    return(clauses[target])
  end}, unless = {export = true, macro = function (cond, ...)
    local body = unstash({...})
    local _g698 = sub(body, 0)
    return({"if", {"not", cond}, join({"do"}, _g698)})
  end}, when = {export = true, macro = function (cond, ...)
    local body = unstash({...})
    local _g697 = sub(body, 0)
    return({"if", cond, join({"do"}, _g697)})
  end}, ["with-bindings"] = {export = true, macro = function (_g718, ...)
    local names = _g718[1]
    local body = unstash({...})
    local _g719 = sub(body, 0)
    local x = make_id()
    local _g721 = {"setenv", x}
    _g721.variable = true
    local _g720 = {"with-frame", {"each", {x}, names, _g721}}
    _g720.scope = true
    return(join(_g720, _g719))
  end}, ["with-frame"] = {export = true, macro = function (...)
    local body = unstash({...})
    local _g737 = sub(body, 0)
    local scope = body.scope
    local x = make_id()
    local _g738 = {"table"}
    _g738._scope = scope
    return({"do", {"add", "environment", _g738}, {"let", {x, join({"do"}, _g737)}, {"drop", "environment"}, x}})
  end}}, import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}, {"lumen", "utilities"}, {"lumen", "compiler"}}}, ["lumen/main"] = {export = {}, import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}, {"lumen", "reader"}, {"lumen", "compiler"}}}, ["lumen/reader"] = {export = {["define-reader"] = {export = true, macro = function (_g739, ...)
    local char = _g739[1]
    local stream = _g739[2]
    local body = unstash({...})
    local _g740 = sub(body, 0)
    return({"set", {"get", "read-table", char}, join({"fn", {stream}}, _g740)})
  end}, delimiters = {variable = true}, eof = {variable = true}, ["flag?"] = {variable = true}, ["key?"] = {variable = true}, ["make-stream"] = {export = true, variable = true}, ["peek-char"] = {variable = true}, read = {export = true, variable = true}, ["read-all"] = {export = true, variable = true}, ["read-char"] = {variable = true}, ["read-from-string"] = {export = true, variable = true}, ["read-table"] = {export = true, variable = true}, ["skip-non-code"] = {variable = true}, whitespace = {variable = true}}, import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}}}, ["lumen/runtime"] = {export = {["%"] = {export = true, variable = true}, ["%message-handler"] = {export = true, variable = true}, ["*"] = {export = true, variable = true}, ["+"] = {export = true, variable = true}, ["-"] = {export = true, variable = true}, ["/"] = {export = true, variable = true}, ["<"] = {export = true, variable = true}, ["<="] = {export = true, variable = true}, ["="] = {export = true, variable = true}, [">"] = {export = true, variable = true}, [">="] = {export = true, variable = true}, abs = {export = true, variable = true}, acos = {export = true, variable = true}, add = {export = true, variable = true}, apply = {export = true, variable = true}, asin = {export = true, variable = true}, atan = {export = true, variable = true}, atan2 = {export = true, variable = true}, ["atom?"] = {export = true, variable = true}, ["boolean?"] = {export = true, variable = true}, cat = {export = true, variable = true}, ceil = {export = true, variable = true}, char = {export = true, variable = true}, code = {export = true, variable = true}, ["composite?"] = {export = true, variable = true}, cos = {export = true, variable = true}, drop = {export = true, variable = true}, ["empty?"] = {export = true, variable = true}, exclude = {export = true, variable = true}, exit = {export = true, variable = true}, extend = {export = true, variable = true}, find = {export = true, variable = true}, flat = {export = true, variable = true}, flat1 = {export = true, variable = true}, floor = {export = true, variable = true}, ["function?"] = {export = true, variable = true}, hd = {export = true, variable = true}, ["id-count"] = {variable = true}, ["id-literal?"] = {export = true, variable = true}, ["in?"] = {export = true, variable = true}, inner = {export = true, variable = true}, ["is?"] = {export = true, variable = true}, iterate = {export = true, variable = true}, join = {export = true, variable = true}, keep = {export = true, variable = true}, ["keys?"] = {export = true, variable = true}, last = {export = true, variable = true}, length = {export = true, variable = true}, ["list?"] = {export = true, variable = true}, log = {export = true, variable = true}, log10 = {export = true, variable = true}, ["make-id"] = {export = true, variable = true}, map = {export = true, variable = true}, mapl = {variable = true}, math = {variable = true}, max = {export = true, variable = true}, ["max*"] = {variable = true}, min = {export = true, variable = true}, ["min*"] = {variable = true}, module = {export = true, variable = true}, ["module-key"] = {export = true, variable = true}, ["nil?"] = {export = true, variable = true}, ["none?"] = {export = true, variable = true}, now = {export = true, variable = true}, number = {export = true, variable = true}, ["number?"] = {export = true, variable = true}, ["one?"] = {export = true, variable = true}, pair = {export = true, variable = true}, pow = {export = true, variable = true}, random = {export = true, variable = true}, ["read-file"] = {export = true, variable = true}, reduce = {export = true, variable = true}, replicate = {export = true, variable = true}, reverse = {export = true, variable = true}, sd = {export = true, variable = true}, search = {export = true, variable = true}, setenv = {export = true, variable = true}, sin = {export = true, variable = true}, sinh = {export = true, variable = true}, ["some?"] = {export = true, variable = true}, sort = {export = true, variable = true}, space = {export = true, variable = true}, splice = {export = true, variable = true}, ["splice?"] = {variable = true}, split = {export = true, variable = true}, sqrt = {export = true, variable = true}, stash = {export = true, variable = true}, string = {export = true, variable = true}, ["string-literal?"] = {export = true, variable = true}, ["string?"] = {export = true, variable = true}, sub = {export = true, variable = true}, subl = {variable = true}, substring = {export = true, variable = true}, ["table?"] = {export = true, variable = true}, tan = {export = true, variable = true}, tanh = {export = true, variable = true}, td = {export = true, variable = true}, tl = {export = true, variable = true}, today = {export = true, variable = true}, ["toplevel?"] = {export = true, variable = true}, unstash = {export = true, variable = true}, write = {export = true, variable = true}, ["write-file"] = {export = true, variable = true}}, import = {{"lumen", "special"}, {"lumen", "core"}}}, ["lumen/special"] = {export = {["%array"] = {export = true, foo = true, special = function (...)
    local forms = unstash({...})
    local _g775
    if target == "lua" then
      _g775 = "{"
    else
      _g775 = "["
    end
    local open = _g775
    local _g776
    if target == "lua" then
      _g776 = "}"
    else
      _g776 = "]"
    end
    local close = _g776
    local str = ""
    local _g758 = forms
    local i = 0
    while i < length(_g758) do
      local x = _g758[i + 1]
      str = str .. compile(x)
      if i < length(forms) - 1 then
        str = str .. ", "
      end
      i = i + 1
    end
    return(open .. str .. close)
  end}, ["%for"] = {export = true, foo = true, special = function (t, k, form)
    local _g750 = compile(t)
    local ind = indentation()
    indent_level = indent_level + 1
    local _g751 = compile(form, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local body = _g751
    if target == "lua" then
      return(ind .. "for " .. k .. " in next, " .. _g750 .. " do\n" .. body .. ind .. "end\n")
    else
      return(ind .. "for (" .. k .. " in " .. _g750 .. ") {\n" .. body .. ind .. "}\n")
    end
  end, stmt = true, tr = true}, ["%function"] = {export = true, foo = true, special = function (args, body)
    return(compile_function(args, body))
  end}, ["%global-function"] = {export = true, foo = true, special = function (name, args, body)
    if target == "lua" then
      local x = compile_function(args, body, {_stash = true, name = name})
      return(indentation() .. x)
    else
      return(compile({"set", name, {"%function", args, body}}, {_stash = true, stmt = true}))
    end
  end, stmt = true, tr = true}, ["%if"] = {export = true, foo = true, special = function (cond, cons, alt)
    local _g743 = compile(cond)
    indent_level = indent_level + 1
    local _g746 = compile(cons, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local _g744 = _g746
    local _g769
    if alt then
      indent_level = indent_level + 1
      local _g747 = compile(alt, {_stash = true, stmt = true})
      indent_level = indent_level - 1
      _g769 = _g747
    end
    local _g745 = _g769
    local ind = indentation()
    local str = ""
    if target == "js" then
      str = str .. ind .. "if (" .. _g743 .. ") {\n" .. _g744 .. ind .. "}"
    else
      str = str .. ind .. "if " .. _g743 .. " then\n" .. _g744
    end
    if _g745 and target == "js" then
      str = str .. " else {\n" .. _g745 .. ind .. "}"
    else
      if _g745 then
        str = str .. ind .. "else\n" .. _g745
      end
    end
    if target == "lua" then
      return(str .. ind .. "end\n")
    else
      return(str .. "\n")
    end
  end, stmt = true, tr = true}, ["%local"] = {export = true, foo = true, special = function (name, value)
    local id = compile(name)
    local value1 = compile(value)
    local _g772
    if is63(value) then
      _g772 = " = " .. value1
    else
      _g772 = ""
    end
    local rh = _g772
    local _g773
    if target == "js" then
      _g773 = "var "
    else
      _g773 = "local "
    end
    local keyword = _g773
    local ind = indentation()
    return(ind .. keyword .. id .. rh)
  end, stmt = true}, ["%local-function"] = {export = true, foo = true, special = function (name, args, body)
    local x = compile_function(args, body, {_stash = true, name = name, prefix = "local "})
    return(indentation() .. x)
  end, stmt = true, tr = true}, ["%object"] = {export = true, foo = true, special = function (...)
    local forms = unstash({...})
    local str = "{"
    local _g777
    if target == "lua" then
      _g777 = " = "
    else
      _g777 = ": "
    end
    local sep = _g777
    local pairs = sortk(pair(forms), hd)
    local _g759 = pairs
    local i = 0
    while i < length(_g759) do
      local _g760 = _g759[i + 1]
      local k = _g760[1]
      local v = _g760[2]
      if not string63(k) then
        error("Illegal key: " .. string(k))
      end
      local _g761 = compile(v)
      local _g778
      if valid_id63(k) then
        _g778 = k
      else
        local _g779
        if target == "js" and string_literal63(k) then
          _g779 = k
        else
          local _g780
          if target == "js" then
            _g780 = quoted(k)
          else
            local _g781
            if string_literal63(k) then
              _g781 = "[" .. k .. "]"
            else
              _g781 = "[" .. quoted(k) .. "]"
            end
            _g780 = _g781
          end
          _g779 = _g780
        end
        _g778 = _g779
      end
      local _g762 = _g778
      str = str .. _g762 .. sep .. _g761
      if i < length(pairs) - 1 then
        str = str .. ", "
      end
      i = i + 1
    end
    return(str .. "}")
  end}, ["%try"] = {export = true, foo = true, special = function (form)
    local ind = indentation()
    indent_level = indent_level + 1
    local _g752 = compile(form, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local body = _g752
    local e = make_id()
    local hf = {"return", {"%array", false, {"get", e, "\"message\""}}}
    indent_level = indent_level + 1
    local _g753 = compile(hf, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local h = _g753
    return(ind .. "try {\n" .. body .. ind .. "}\n" .. ind .. "catch (" .. e .. ") {\n" .. h .. ind .. "}\n")
  end, stmt = true, tr = true}, ["break"] = {export = true, foo = true, special = function ()
    return(indentation() .. "break")
  end, stmt = true}, ["do"] = {export = true, foo = true, special = function (...)
    local forms = unstash({...})
    local str = ""
    local _g741 = forms
    local _g742 = 0
    while _g742 < length(_g741) do
      local x = _g741[_g742 + 1]
      str = str .. compile(x, {_stash = true, stmt = true})
      _g742 = _g742 + 1
    end
    return(str)
  end, stmt = true, tr = true}, ["error"] = {export = true, foo = true, special = function (x)
    local _g771
    if target == "js" then
      _g771 = "throw new " .. compile({"Error", x})
    else
      _g771 = "error(" .. compile(x) .. ")"
    end
    local e = _g771
    return(indentation() .. e)
  end, stmt = true}, ["get"] = {export = true, foo = true, special = function (t, k)
    local _g757 = compile(t)
    local k1 = compile(k)
    if target == "lua" and char(_g757, 0) == "{" then
      _g757 = "(" .. _g757 .. ")"
    end
    if string_literal63(k) and valid_id63(inner(k)) then
      return(_g757 .. "." .. inner(k))
    else
      return(_g757 .. "[" .. k1 .. "]")
    end
  end}, ["not"] = {}, ["return"] = {export = true, foo = true, special = function (x)
    local _g770
    if nil63(x) then
      _g770 = "return"
    else
      _g770 = "return(" .. compile(x) .. ")"
    end
    local _g754 = _g770
    return(indentation() .. _g754)
  end, stmt = true}, ["set"] = {export = true, foo = true, special = function (lh, rh)
    local _g755 = compile(lh)
    local _g774
    if nil63(rh) then
      _g774 = "nil"
    else
      _g774 = rh
    end
    local _g756 = compile(_g774)
    return(indentation() .. _g755 .. " = " .. _g756)
  end, stmt = true}, ["while"] = {export = true, foo = true, special = function (cond, form)
    local _g748 = compile(cond)
    indent_level = indent_level + 1
    local _g749 = compile(form, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local body = _g749
    local ind = indentation()
    if target == "js" then
      return(ind .. "while (" .. _g748 .. ") {\n" .. body .. ind .. "}\n")
    else
      return(ind .. "while " .. _g748 .. " do\n" .. body .. ind .. "end\n")
    end
  end, stmt = true, tr = true}}, import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}, {"lumen", "utilities"}, {"lumen", "compiler"}}}, ["lumen/system"] = {export = {nexus = {export = true, global = true}}, import = {{"lumen", "special"}, {"lumen", "core"}}}, ["lumen/utilities"] = {export = {bind = {export = true, variable = true}, ["bind*"] = {export = true, variable = true}, ["bound?"] = {export = true, variable = true}, ["can-unquote?"] = {variable = true}, escape = {variable = true}, getenv = {export = true, variable = true}, ["global?"] = {variable = true}, id = {export = true, variable = true}, imported = {export = true, variable = true}, ["indent-level"] = {export = true, global = true}, indentation = {export = true, variable = true}, ["initial-environment"] = {export = true, variable = true}, linked = {export = true, variable = true}, ["macro-function"] = {export = true, variable = true}, ["macro?"] = {export = true, variable = true}, macroexpand = {export = true, variable = true}, mapo = {export = true, variable = true}, ["numeric?"] = {variable = true}, quasiexpand = {export = true, variable = true}, ["quasiquote-list"] = {variable = true}, ["quasiquoting?"] = {variable = true}, ["quasisplice?"] = {variable = true}, ["quote-binding"] = {variable = true}, ["quote-environment"] = {export = true, variable = true}, ["quote-frame"] = {variable = true}, ["quote-module"] = {variable = true}, ["quote-modules"] = {export = true, variable = true}, quoted = {export = true, variable = true}, ["quoting?"] = {variable = true}, reserved = {variable = true}, ["reserved?"] = {export = true, variable = true}, sortk = {export = true, variable = true}, ["special-form?"] = {export = true, variable = true}, ["special?"] = {export = true, variable = true}, ["stash*"] = {export = true, variable = true}, ["statement?"] = {export = true, variable = true}, ["symbol-expansion"] = {export = true, variable = true}, ["symbol?"] = {export = true, variable = true}, ["valid-char?"] = {variable = true}, ["valid-id?"] = {export = true, variable = true}, ["variable?"] = {export = true, variable = true}, ["with-indent"] = {export = true, macro = function (form)
    local result = make_id()
    return({"do", {"inc", "indent-level"}, {"let", {result, form}, {"dec", "indent-level"}, result}})
  end}}, import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}}}, user = {export = {}, import = {"lumen", {"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}}}}
  environment = {{["define-module"] = {export = true, macro = function (spec, ...)
    local body = unstash({...})
    local _g763 = sub(body, 0)
    local alias = _g763.alias
    local exp = _g763.export
    local imp = _g763.import
    local _g764 = import_modules(imp)
    local imports = _g764[1]
    local bindings = _g764[2]
    local k = module_key(spec)
    modules[k] = {alias = alias, export = {}, import = imports}
    local _g765 = exp or {}
    local _g766 = 0
    while _g766 < length(_g765) do
      local x = _g765[_g766 + 1]
      setenv(x, {_stash = true, export = true})
      _g766 = _g766 + 1
    end
    return(join({"do", {"set", {"get", "nexus", {"quote", k}}, {"table"}}}, bindings))
  end}}}
end)();
(function ()
  nexus.user = {}
  local _g782 = nexus["lumen/runtime"]
  local _37 = _g782["%"]
  local _37message_handler = _g782["%message-handler"]
  local _42 = _g782["*"]
  local _43 = _g782["+"]
  local _ = _g782["-"]
  local _47 = _g782["/"]
  local _60 = _g782["<"]
  local _6061 = _g782["<="]
  local _61 = _g782["="]
  local _62 = _g782[">"]
  local _6261 = _g782[">="]
  local abs = _g782.abs
  local acos = _g782.acos
  local add = _g782.add
  local apply = _g782.apply
  local asin = _g782.asin
  local atan = _g782.atan
  local atan2 = _g782.atan2
  local atom63 = _g782["atom?"]
  local boolean63 = _g782["boolean?"]
  local cat = _g782.cat
  local ceil = _g782.ceil
  local char = _g782.char
  local code = _g782.code
  local composite63 = _g782["composite?"]
  local cos = _g782.cos
  local drop = _g782.drop
  local empty63 = _g782["empty?"]
  local exclude = _g782.exclude
  local exit = _g782.exit
  local extend = _g782.extend
  local find = _g782.find
  local flat = _g782.flat
  local flat1 = _g782.flat1
  local floor = _g782.floor
  local function63 = _g782["function?"]
  local hd = _g782.hd
  local id_literal63 = _g782["id-literal?"]
  local in63 = _g782["in?"]
  local inner = _g782.inner
  local is63 = _g782["is?"]
  local iterate = _g782.iterate
  local join = _g782.join
  local keep = _g782.keep
  local keys63 = _g782["keys?"]
  local last = _g782.last
  local length = _g782.length
  local list63 = _g782["list?"]
  local log = _g782.log
  local log10 = _g782.log10
  local make_id = _g782["make-id"]
  local map = _g782.map
  local max = _g782.max
  local min = _g782.min
  local module = _g782.module
  local module_key = _g782["module-key"]
  local nil63 = _g782["nil?"]
  local none63 = _g782["none?"]
  local now = _g782.now
  local number = _g782.number
  local number63 = _g782["number?"]
  local one63 = _g782["one?"]
  local pair = _g782.pair
  local pow = _g782.pow
  local random = _g782.random
  local read_file = _g782["read-file"]
  local reduce = _g782.reduce
  local replicate = _g782.replicate
  local reverse = _g782.reverse
  local sd = _g782.sd
  local search = _g782.search
  local setenv = _g782.setenv
  local sin = _g782.sin
  local sinh = _g782.sinh
  local some63 = _g782["some?"]
  local sort = _g782.sort
  local space = _g782.space
  local splice = _g782.splice
  local split = _g782.split
  local sqrt = _g782.sqrt
  local stash = _g782.stash
  local string = _g782.string
  local string_literal63 = _g782["string-literal?"]
  local string63 = _g782["string?"]
  local sub = _g782.sub
  local substring = _g782.substring
  local table63 = _g782["table?"]
  local tan = _g782.tan
  local tanh = _g782.tanh
  local td = _g782.td
  local tl = _g782.tl
  local today = _g782.today
  local toplevel63 = _g782["toplevel?"]
  local unstash = _g782.unstash
  local write = _g782.write
  local write_file = _g782["write-file"]
end)();
(function ()
  nexus["lumen/main"] = {}
  local _g2 = nexus["lumen/runtime"]
  local _37 = _g2["%"]
  local _37message_handler = _g2["%message-handler"]
  local _42 = _g2["*"]
  local _43 = _g2["+"]
  local _ = _g2["-"]
  local _47 = _g2["/"]
  local _60 = _g2["<"]
  local _6061 = _g2["<="]
  local _61 = _g2["="]
  local _62 = _g2[">"]
  local _6261 = _g2[">="]
  local abs = _g2.abs
  local acos = _g2.acos
  local add = _g2.add
  local apply = _g2.apply
  local asin = _g2.asin
  local atan = _g2.atan
  local atan2 = _g2.atan2
  local atom63 = _g2["atom?"]
  local boolean63 = _g2["boolean?"]
  local cat = _g2.cat
  local ceil = _g2.ceil
  local char = _g2.char
  local code = _g2.code
  local composite63 = _g2["composite?"]
  local cos = _g2.cos
  local drop = _g2.drop
  local empty63 = _g2["empty?"]
  local exclude = _g2.exclude
  local exit = _g2.exit
  local extend = _g2.extend
  local find = _g2.find
  local flat = _g2.flat
  local flat1 = _g2.flat1
  local floor = _g2.floor
  local function63 = _g2["function?"]
  local hd = _g2.hd
  local id_literal63 = _g2["id-literal?"]
  local in63 = _g2["in?"]
  local inner = _g2.inner
  local is63 = _g2["is?"]
  local iterate = _g2.iterate
  local join = _g2.join
  local keep = _g2.keep
  local keys63 = _g2["keys?"]
  local last = _g2.last
  local length = _g2.length
  local list63 = _g2["list?"]
  local log = _g2.log
  local log10 = _g2.log10
  local make_id = _g2["make-id"]
  local map = _g2.map
  local max = _g2.max
  local min = _g2.min
  local module = _g2.module
  local module_key = _g2["module-key"]
  local nil63 = _g2["nil?"]
  local none63 = _g2["none?"]
  local now = _g2.now
  local number = _g2.number
  local number63 = _g2["number?"]
  local one63 = _g2["one?"]
  local pair = _g2.pair
  local pow = _g2.pow
  local random = _g2.random
  local read_file = _g2["read-file"]
  local reduce = _g2.reduce
  local replicate = _g2.replicate
  local reverse = _g2.reverse
  local sd = _g2.sd
  local search = _g2.search
  local setenv = _g2.setenv
  local sin = _g2.sin
  local sinh = _g2.sinh
  local some63 = _g2["some?"]
  local sort = _g2.sort
  local space = _g2.space
  local splice = _g2.splice
  local split = _g2.split
  local sqrt = _g2.sqrt
  local stash = _g2.stash
  local string = _g2.string
  local string_literal63 = _g2["string-literal?"]
  local string63 = _g2["string?"]
  local sub = _g2.sub
  local substring = _g2.substring
  local table63 = _g2["table?"]
  local tan = _g2.tan
  local tanh = _g2.tanh
  local td = _g2.td
  local tl = _g2.tl
  local today = _g2.today
  local toplevel63 = _g2["toplevel?"]
  local unstash = _g2.unstash
  local write = _g2.write
  local write_file = _g2["write-file"]
  local _g5 = nexus["lumen/reader"]
  local make_stream = _g5["make-stream"]
  local read = _g5.read
  local read_all = _g5["read-all"]
  local read_from_string = _g5["read-from-string"]
  local read_table = _g5["read-table"]
  local _g6 = nexus["lumen/compiler"]
  local compile = _g6.compile
  local compile_function = _g6["compile-function"]
  local compile_module = _g6["compile-module"]
  local declare = _g6.declare
  local eval = _g6.eval
  local import_modules = _g6["import-modules"]
  local in_module = _g6["in-module"]
  local load_module = _g6["load-module"]
  local open_module = _g6["open-module"]
  local function rep(str)
    local _g786,_g787 = xpcall(function ()
      return(eval(read_from_string(str)))
    end, _37message_handler)
    local _g785 = {_g786, _g787}
    local _g1 = _g785[1]
    local x = _g785[2]
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
    local _g788 = args
    local i = 0
    while i < length(_g788) do
      local arg = _g788[i + 1]
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
