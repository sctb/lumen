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
    local _g58
    if n then
      _g58 = n + 1
    end
    return(string.byte(str, _g58))
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
  local function in63(x, xs)
    local _g31 = xs
    local _g32 = 0
    while _g32 < length(_g31) do
      local y = _g31[_g32 + 1]
      if x == y then
        return(true)
      end
      _g32 = _g32 + 1
    end
  end
  nexus["lumen/runtime"]["in?"] = in63
  local function find(f, l)
    local _g33 = l
    local _g34 = 0
    while _g34 < length(_g33) do
      local x = _g33[_g34 + 1]
      local _g35 = f(x)
      if _g35 then
        return(_g35)
      end
      _g34 = _g34 + 1
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
    local _g36 = l
    local _g37 = 0
    while _g37 < length(_g36) do
      local x = _g36[_g37 + 1]
      local _g38 = f(x)
      if splice63(_g38) then
        l1 = join(l1, _g38.value)
      else
        if is63(_g38) then
          add(l1, _g38)
        end
      end
      _g37 = _g37 + 1
    end
    return(l1)
  end
  nexus["lumen/runtime"].mapl = mapl
  local function map(f, t)
    local l = mapl(f, t)
    local _g39 = t
    local k = nil
    for k in next, _g39 do
      if not number63(k) then
        local v = _g39[k]
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
    local _g40 = t
    local k = nil
    for k in next, _g40 do
      if not number63(k) then
        local v = _g40[k]
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
      local _g41 = args
      local k = nil
      for k in next, _g41 do
        if not number63(k) then
          local v = _g41[k]
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
        local _g42 = l
        local k = nil
        for k in next, _g42 do
          if not number63(k) then
            local v = _g42[k]
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
    local _g43 = sub(xs, 0)
    return(join(t, _g43))
  end
  nexus["lumen/runtime"].extend = extend
  local function exclude(t, ...)
    local keys = unstash({...})
    local _g44 = sub(keys, 0)
    local t1 = subl(t)
    local _g45 = t
    local k = nil
    for k in next, _g45 do
      if not number63(k) then
        local v = _g45[k]
        if not _g44[k] then
          t1[k] = v
        end
      end
    end
    return(t1)
  end
  nexus["lumen/runtime"].exclude = exclude
  local function search(str, pattern, start)
    local _g59
    if start then
      _g59 = start + 1
    end
    local _g46 = _g59
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
  nexus["lumen/utilities"] = {}
  local _g63 = nexus["lumen/runtime"]
  local _37 = _g63["%"]
  local _37message_handler = _g63["%message-handler"]
  local _42 = _g63["*"]
  local _43 = _g63["+"]
  local _ = _g63["-"]
  local _47 = _g63["/"]
  local _60 = _g63["<"]
  local _6061 = _g63["<="]
  local _61 = _g63["="]
  local _62 = _g63[">"]
  local _6261 = _g63[">="]
  local abs = _g63.abs
  local acos = _g63.acos
  local add = _g63.add
  local apply = _g63.apply
  local asin = _g63.asin
  local atan = _g63.atan
  local atan2 = _g63.atan2
  local atom63 = _g63["atom?"]
  local boolean63 = _g63["boolean?"]
  local cat = _g63.cat
  local ceil = _g63.ceil
  local char = _g63.char
  local code = _g63.code
  local composite63 = _g63["composite?"]
  local cos = _g63.cos
  local drop = _g63.drop
  local empty63 = _g63["empty?"]
  local exclude = _g63.exclude
  local exit = _g63.exit
  local extend = _g63.extend
  local find = _g63.find
  local flat = _g63.flat
  local flat1 = _g63.flat1
  local floor = _g63.floor
  local function63 = _g63["function?"]
  local hd = _g63.hd
  local id_literal63 = _g63["id-literal?"]
  local in63 = _g63["in?"]
  local inner = _g63.inner
  local is63 = _g63["is?"]
  local iterate = _g63.iterate
  local join = _g63.join
  local keep = _g63.keep
  local keys63 = _g63["keys?"]
  local last = _g63.last
  local length = _g63.length
  local list63 = _g63["list?"]
  local log = _g63.log
  local log10 = _g63.log10
  local make_id = _g63["make-id"]
  local map = _g63.map
  local max = _g63.max
  local min = _g63.min
  local module = _g63.module
  local module_key = _g63["module-key"]
  local nil63 = _g63["nil?"]
  local none63 = _g63["none?"]
  local now = _g63.now
  local number = _g63.number
  local number63 = _g63["number?"]
  local one63 = _g63["one?"]
  local pair = _g63.pair
  local pow = _g63.pow
  local random = _g63.random
  local read_file = _g63["read-file"]
  local reduce = _g63.reduce
  local replicate = _g63.replicate
  local reverse = _g63.reverse
  local sd = _g63.sd
  local search = _g63.search
  local setenv = _g63.setenv
  local sin = _g63.sin
  local sinh = _g63.sinh
  local some63 = _g63["some?"]
  local sort = _g63.sort
  local space = _g63.space
  local splice = _g63.splice
  local split = _g63.split
  local sqrt = _g63.sqrt
  local stash = _g63.stash
  local string = _g63.string
  local string_literal63 = _g63["string-literal?"]
  local string63 = _g63["string?"]
  local sub = _g63.sub
  local substring = _g63.substring
  local table63 = _g63["table?"]
  local tan = _g63.tan
  local tanh = _g63.tanh
  local td = _g63.td
  local tl = _g63.tl
  local today = _g63.today
  local toplevel63 = _g63["toplevel?"]
  local unstash = _g63.unstash
  local write = _g63.write
  local write_file = _g63["write-file"]
  local function getenv(k, ...)
    local keys = unstash({...})
    local _g66 = sub(keys, 0)
    if string63(k) then
      local b = find(function (e)
        return(e[k])
      end, reverse(environment))
      if table63(b) then
        local _g67 = nil
        local _g68 = _g66
        local x = nil
        for x in next, _g68 do
          if not number63(x) then
            local _g60 = _g68[x]
            _g67 = x
          end
        end
        if _g67 then
          return(b[_g67])
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
      local _g69 = args
      local k = nil
      for k in next, _g69 do
        if not number63(k) then
          local v = _g69[k]
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
        local _g70 = lh
        local i = 0
        while i < length(_g70) do
          local x = _g70[i + 1]
          bs = join(bs, bind(x, {"at", rh, i}))
          i = i + 1
        end
        if r then
          bs = join(bs, bind(r, {"sub", rh, length(lh)}))
        end
        local _g71 = lh
        local k = nil
        for k in next, _g71 do
          if not number63(k) then
            local v = _g71[k]
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
      local _g72 = args
      local _g73 = 0
      while _g73 < length(_g72) do
        local arg = _g72[_g73 + 1]
        if atom63(arg) then
          add(args1, arg)
        else
          if list63(arg) or keys63(arg) then
            local v = make_id()
            add(args1, v)
            bs = join(bs, {arg, v})
          end
        end
        _g73 = _g73 + 1
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
          local _g61 = form[1]
          local args = form[2]
          local body = sub(form, 2)
          add(environment, {_scope = true})
          local _g76 = args
          local _g77 = 0
          while _g77 < length(_g76) do
            local _g74 = _g76[_g77 + 1]
            setenv(_g74, {_stash = true, variable = true})
            _g77 = _g77 + 1
          end
          local _g75 = join({"%function", map(macroexpand, args)}, macroexpand(body))
          drop(environment)
          return(_g75)
        else
          if x == "%local-function" or x == "%global-function" then
            local _g62 = form[1]
            local name = form[2]
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
            local _g81 = join({x, name, map(macroexpand, _g78)}, macroexpand(_g79))
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
  nexus["lumen/utilities"].macroexpand = macroexpand
  local quasiexpand
  nexus["lumen/utilities"].quasiexpand = quasiexpand
  local quasiquote_list
  nexus["lumen/utilities"]["quasiquote-list"] = quasiquote_list
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
      local _g101
      if c == "-" then
        _g101 = "_"
      else
        local _g102
        if valid_char63(n) then
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
  nexus["lumen/utilities"].id = id
  local function sortk(l, k)
    return(sort(l, function (a, b)
      return(k(a) < k(b))
    end))
  end
  nexus["lumen/utilities"].sortk = sortk
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
    local _g95 = t
    local k = nil
    for k in next, _g95 do
      if not number63(k) then
        local v = _g95[k]
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
    local _g96 = {"table"}
    _g96.alias = quoted(m.alias)
    _g96.export = quote_frame(m.export)
    _g96.import = quoted(m.import)
    return(_g96)
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
  local _g104 = nexus["lumen/runtime"]
  local _37 = _g104["%"]
  local _37message_handler = _g104["%message-handler"]
  local _42 = _g104["*"]
  local _43 = _g104["+"]
  local _ = _g104["-"]
  local _47 = _g104["/"]
  local _60 = _g104["<"]
  local _6061 = _g104["<="]
  local _61 = _g104["="]
  local _62 = _g104[">"]
  local _6261 = _g104[">="]
  local abs = _g104.abs
  local acos = _g104.acos
  local add = _g104.add
  local apply = _g104.apply
  local asin = _g104.asin
  local atan = _g104.atan
  local atan2 = _g104.atan2
  local atom63 = _g104["atom?"]
  local boolean63 = _g104["boolean?"]
  local cat = _g104.cat
  local ceil = _g104.ceil
  local char = _g104.char
  local code = _g104.code
  local composite63 = _g104["composite?"]
  local cos = _g104.cos
  local drop = _g104.drop
  local empty63 = _g104["empty?"]
  local exclude = _g104.exclude
  local exit = _g104.exit
  local extend = _g104.extend
  local find = _g104.find
  local flat = _g104.flat
  local flat1 = _g104.flat1
  local floor = _g104.floor
  local function63 = _g104["function?"]
  local hd = _g104.hd
  local id_literal63 = _g104["id-literal?"]
  local in63 = _g104["in?"]
  local inner = _g104.inner
  local is63 = _g104["is?"]
  local iterate = _g104.iterate
  local join = _g104.join
  local keep = _g104.keep
  local keys63 = _g104["keys?"]
  local last = _g104.last
  local length = _g104.length
  local list63 = _g104["list?"]
  local log = _g104.log
  local log10 = _g104.log10
  local make_id = _g104["make-id"]
  local map = _g104.map
  local max = _g104.max
  local min = _g104.min
  local module = _g104.module
  local module_key = _g104["module-key"]
  local nil63 = _g104["nil?"]
  local none63 = _g104["none?"]
  local now = _g104.now
  local number = _g104.number
  local number63 = _g104["number?"]
  local one63 = _g104["one?"]
  local pair = _g104.pair
  local pow = _g104.pow
  local random = _g104.random
  local read_file = _g104["read-file"]
  local reduce = _g104.reduce
  local replicate = _g104.replicate
  local reverse = _g104.reverse
  local sd = _g104.sd
  local search = _g104.search
  local setenv = _g104.setenv
  local sin = _g104.sin
  local sinh = _g104.sinh
  local some63 = _g104["some?"]
  local sort = _g104.sort
  local space = _g104.space
  local splice = _g104.splice
  local split = _g104.split
  local sqrt = _g104.sqrt
  local stash = _g104.stash
  local string = _g104.string
  local string_literal63 = _g104["string-literal?"]
  local string63 = _g104["string?"]
  local sub = _g104.sub
  local substring = _g104.substring
  local table63 = _g104["table?"]
  local tan = _g104.tan
  local tanh = _g104.tanh
  local td = _g104.td
  local tl = _g104.tl
  local today = _g104.today
  local toplevel63 = _g104["toplevel?"]
  local unstash = _g104.unstash
  local write = _g104.write
  local write_file = _g104["write-file"]
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
  local _g115 = nexus["lumen/runtime"]
  local _37 = _g115["%"]
  local _37message_handler = _g115["%message-handler"]
  local _42 = _g115["*"]
  local _43 = _g115["+"]
  local _ = _g115["-"]
  local _47 = _g115["/"]
  local _60 = _g115["<"]
  local _6061 = _g115["<="]
  local _61 = _g115["="]
  local _62 = _g115[">"]
  local _6261 = _g115[">="]
  local abs = _g115.abs
  local acos = _g115.acos
  local add = _g115.add
  local apply = _g115.apply
  local asin = _g115.asin
  local atan = _g115.atan
  local atan2 = _g115.atan2
  local atom63 = _g115["atom?"]
  local boolean63 = _g115["boolean?"]
  local cat = _g115.cat
  local ceil = _g115.ceil
  local char = _g115.char
  local code = _g115.code
  local composite63 = _g115["composite?"]
  local cos = _g115.cos
  local drop = _g115.drop
  local empty63 = _g115["empty?"]
  local exclude = _g115.exclude
  local exit = _g115.exit
  local extend = _g115.extend
  local find = _g115.find
  local flat = _g115.flat
  local flat1 = _g115.flat1
  local floor = _g115.floor
  local function63 = _g115["function?"]
  local hd = _g115.hd
  local id_literal63 = _g115["id-literal?"]
  local in63 = _g115["in?"]
  local inner = _g115.inner
  local is63 = _g115["is?"]
  local iterate = _g115.iterate
  local join = _g115.join
  local keep = _g115.keep
  local keys63 = _g115["keys?"]
  local last = _g115.last
  local length = _g115.length
  local list63 = _g115["list?"]
  local log = _g115.log
  local log10 = _g115.log10
  local make_id = _g115["make-id"]
  local map = _g115.map
  local max = _g115.max
  local min = _g115.min
  local module = _g115.module
  local module_key = _g115["module-key"]
  local nil63 = _g115["nil?"]
  local none63 = _g115["none?"]
  local now = _g115.now
  local number = _g115.number
  local number63 = _g115["number?"]
  local one63 = _g115["one?"]
  local pair = _g115.pair
  local pow = _g115.pow
  local random = _g115.random
  local read_file = _g115["read-file"]
  local reduce = _g115.reduce
  local replicate = _g115.replicate
  local reverse = _g115.reverse
  local sd = _g115.sd
  local search = _g115.search
  local setenv = _g115.setenv
  local sin = _g115.sin
  local sinh = _g115.sinh
  local some63 = _g115["some?"]
  local sort = _g115.sort
  local space = _g115.space
  local splice = _g115.splice
  local split = _g115.split
  local sqrt = _g115.sqrt
  local stash = _g115.stash
  local string = _g115.string
  local string_literal63 = _g115["string-literal?"]
  local string63 = _g115["string?"]
  local sub = _g115.sub
  local substring = _g115.substring
  local table63 = _g115["table?"]
  local tan = _g115.tan
  local tanh = _g115.tanh
  local td = _g115.td
  local tl = _g115.tl
  local today = _g115.today
  local toplevel63 = _g115["toplevel?"]
  local unstash = _g115.unstash
  local write = _g115.write
  local write_file = _g115["write-file"]
  local _g118 = nexus["lumen/utilities"]
  local bind = _g118.bind
  local bind42 = _g118["bind*"]
  local bound63 = _g118["bound?"]
  local getenv = _g118.getenv
  local id = _g118.id
  local imported = _g118.imported
  local indentation = _g118.indentation
  local initial_environment = _g118["initial-environment"]
  local linked = _g118.linked
  local macro_function = _g118["macro-function"]
  local macro63 = _g118["macro?"]
  local macroexpand = _g118.macroexpand
  local mapo = _g118.mapo
  local quasiexpand = _g118.quasiexpand
  local quote_environment = _g118["quote-environment"]
  local quote_modules = _g118["quote-modules"]
  local quoted = _g118.quoted
  local reserved63 = _g118["reserved?"]
  local sortk = _g118.sortk
  local special_form63 = _g118["special-form?"]
  local special63 = _g118["special?"]
  local stash42 = _g118["stash*"]
  local statement63 = _g118["statement?"]
  local symbol_expansion = _g118["symbol-expansion"]
  local symbol63 = _g118["symbol?"]
  local valid_id63 = _g118["valid-id?"]
  local variable63 = _g118["variable?"]
  local _g119 = nexus["lumen/reader"]
  local make_stream = _g119["make-stream"]
  local read = _g119.read
  local read_all = _g119["read-all"]
  local read_from_string = _g119["read-from-string"]
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
  _g126["%"] = true
  _g126["*"] = true
  _g126["/"] = true
  local _g128 = {}
  _g128["+"] = true
  _g128["-"] = true
  local _g132 = {}
  _g132.js = "+"
  _g132.lua = ".."
  local _g130 = {}
  local _g133 = {}
  _g133.js = "+"
  _g133.lua = ".."
  _g130.cat = _g133
  local _g135 = {}
  _g135["<"] = true
  _g135["<="] = true
  _g135[">"] = true
  _g135[">="] = true
  local _g141 = {}
  _g141.js = "==="
  _g141.lua = "=="
  local _g139 = {}
  _g139.js = "!="
  _g139.lua = "~="
  local _g137 = {}
  local _g142 = {}
  _g142.js = "==="
  _g142.lua = "=="
  _g137["="] = _g142
  local _g143 = {}
  _g143.js = "!="
  _g143.lua = "~="
  _g137["~="] = _g143
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
    local stmt = _g156.stmt
    local self_tr63 = _g156.tr
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
  local _g193 = nexus["lumen/runtime"]
  local _37 = _g193["%"]
  local _37message_handler = _g193["%message-handler"]
  local _42 = _g193["*"]
  local _43 = _g193["+"]
  local _ = _g193["-"]
  local _47 = _g193["/"]
  local _60 = _g193["<"]
  local _6061 = _g193["<="]
  local _61 = _g193["="]
  local _62 = _g193[">"]
  local _6261 = _g193[">="]
  local abs = _g193.abs
  local acos = _g193.acos
  local add = _g193.add
  local apply = _g193.apply
  local asin = _g193.asin
  local atan = _g193.atan
  local atan2 = _g193.atan2
  local atom63 = _g193["atom?"]
  local boolean63 = _g193["boolean?"]
  local cat = _g193.cat
  local ceil = _g193.ceil
  local char = _g193.char
  local code = _g193.code
  local composite63 = _g193["composite?"]
  local cos = _g193.cos
  local drop = _g193.drop
  local empty63 = _g193["empty?"]
  local exclude = _g193.exclude
  local exit = _g193.exit
  local extend = _g193.extend
  local find = _g193.find
  local flat = _g193.flat
  local flat1 = _g193.flat1
  local floor = _g193.floor
  local function63 = _g193["function?"]
  local hd = _g193.hd
  local id_literal63 = _g193["id-literal?"]
  local in63 = _g193["in?"]
  local inner = _g193.inner
  local is63 = _g193["is?"]
  local iterate = _g193.iterate
  local join = _g193.join
  local keep = _g193.keep
  local keys63 = _g193["keys?"]
  local last = _g193.last
  local length = _g193.length
  local list63 = _g193["list?"]
  local log = _g193.log
  local log10 = _g193.log10
  local make_id = _g193["make-id"]
  local map = _g193.map
  local max = _g193.max
  local min = _g193.min
  local module = _g193.module
  local module_key = _g193["module-key"]
  local nil63 = _g193["nil?"]
  local none63 = _g193["none?"]
  local now = _g193.now
  local number = _g193.number
  local number63 = _g193["number?"]
  local one63 = _g193["one?"]
  local pair = _g193.pair
  local pow = _g193.pow
  local random = _g193.random
  local read_file = _g193["read-file"]
  local reduce = _g193.reduce
  local replicate = _g193.replicate
  local reverse = _g193.reverse
  local sd = _g193.sd
  local search = _g193.search
  local setenv = _g193.setenv
  local sin = _g193.sin
  local sinh = _g193.sinh
  local some63 = _g193["some?"]
  local sort = _g193.sort
  local space = _g193.space
  local splice = _g193.splice
  local split = _g193.split
  local sqrt = _g193.sqrt
  local stash = _g193.stash
  local string = _g193.string
  local string_literal63 = _g193["string-literal?"]
  local string63 = _g193["string?"]
  local sub = _g193.sub
  local substring = _g193.substring
  local table63 = _g193["table?"]
  local tan = _g193.tan
  local tanh = _g193.tanh
  local td = _g193.td
  local tl = _g193.tl
  local today = _g193.today
  local toplevel63 = _g193["toplevel?"]
  local unstash = _g193.unstash
  local write = _g193.write
  local write_file = _g193["write-file"]
  local _g196 = nexus["lumen/utilities"]
  local bind = _g196.bind
  local bind42 = _g196["bind*"]
  local bound63 = _g196["bound?"]
  local getenv = _g196.getenv
  local id = _g196.id
  local imported = _g196.imported
  local indentation = _g196.indentation
  local initial_environment = _g196["initial-environment"]
  local linked = _g196.linked
  local macro_function = _g196["macro-function"]
  local macro63 = _g196["macro?"]
  local macroexpand = _g196.macroexpand
  local mapo = _g196.mapo
  local quasiexpand = _g196.quasiexpand
  local quote_environment = _g196["quote-environment"]
  local quote_modules = _g196["quote-modules"]
  local quoted = _g196.quoted
  local reserved63 = _g196["reserved?"]
  local sortk = _g196.sortk
  local special_form63 = _g196["special-form?"]
  local special63 = _g196["special?"]
  local stash42 = _g196["stash*"]
  local statement63 = _g196["statement?"]
  local symbol_expansion = _g196["symbol-expansion"]
  local symbol63 = _g196["symbol?"]
  local valid_id63 = _g196["valid-id?"]
  local variable63 = _g196["variable?"]
  local _g197 = nexus["lumen/compiler"]
  local compile = _g197.compile
  local compile_function = _g197["compile-function"]
  local compile_module = _g197["compile-module"]
  local declare = _g197.declare
  local eval = _g197.eval
  local import_modules = _g197["import-modules"]
  local in_module = _g197["in-module"]
  local load_module = _g197["load-module"]
  local open_module = _g197["open-module"]
end)();
(function ()
  nexus["lumen/core"] = {}
  local _g377 = nexus["lumen/runtime"]
  local _37 = _g377["%"]
  local _37message_handler = _g377["%message-handler"]
  local _42 = _g377["*"]
  local _43 = _g377["+"]
  local _ = _g377["-"]
  local _47 = _g377["/"]
  local _60 = _g377["<"]
  local _6061 = _g377["<="]
  local _61 = _g377["="]
  local _62 = _g377[">"]
  local _6261 = _g377[">="]
  local abs = _g377.abs
  local acos = _g377.acos
  local add = _g377.add
  local apply = _g377.apply
  local asin = _g377.asin
  local atan = _g377.atan
  local atan2 = _g377.atan2
  local atom63 = _g377["atom?"]
  local boolean63 = _g377["boolean?"]
  local cat = _g377.cat
  local ceil = _g377.ceil
  local char = _g377.char
  local code = _g377.code
  local composite63 = _g377["composite?"]
  local cos = _g377.cos
  local drop = _g377.drop
  local empty63 = _g377["empty?"]
  local exclude = _g377.exclude
  local exit = _g377.exit
  local extend = _g377.extend
  local find = _g377.find
  local flat = _g377.flat
  local flat1 = _g377.flat1
  local floor = _g377.floor
  local function63 = _g377["function?"]
  local hd = _g377.hd
  local id_literal63 = _g377["id-literal?"]
  local in63 = _g377["in?"]
  local inner = _g377.inner
  local is63 = _g377["is?"]
  local iterate = _g377.iterate
  local join = _g377.join
  local keep = _g377.keep
  local keys63 = _g377["keys?"]
  local last = _g377.last
  local length = _g377.length
  local list63 = _g377["list?"]
  local log = _g377.log
  local log10 = _g377.log10
  local make_id = _g377["make-id"]
  local map = _g377.map
  local max = _g377.max
  local min = _g377.min
  local module = _g377.module
  local module_key = _g377["module-key"]
  local nil63 = _g377["nil?"]
  local none63 = _g377["none?"]
  local now = _g377.now
  local number = _g377.number
  local number63 = _g377["number?"]
  local one63 = _g377["one?"]
  local pair = _g377.pair
  local pow = _g377.pow
  local random = _g377.random
  local read_file = _g377["read-file"]
  local reduce = _g377.reduce
  local replicate = _g377.replicate
  local reverse = _g377.reverse
  local sd = _g377.sd
  local search = _g377.search
  local setenv = _g377.setenv
  local sin = _g377.sin
  local sinh = _g377.sinh
  local some63 = _g377["some?"]
  local sort = _g377.sort
  local space = _g377.space
  local splice = _g377.splice
  local split = _g377.split
  local sqrt = _g377.sqrt
  local stash = _g377.stash
  local string = _g377.string
  local string_literal63 = _g377["string-literal?"]
  local string63 = _g377["string?"]
  local sub = _g377.sub
  local substring = _g377.substring
  local table63 = _g377["table?"]
  local tan = _g377.tan
  local tanh = _g377.tanh
  local td = _g377.td
  local tl = _g377.tl
  local today = _g377.today
  local toplevel63 = _g377["toplevel?"]
  local unstash = _g377.unstash
  local write = _g377.write
  local write_file = _g377["write-file"]
  local _g380 = nexus["lumen/utilities"]
  local bind = _g380.bind
  local bind42 = _g380["bind*"]
  local bound63 = _g380["bound?"]
  local getenv = _g380.getenv
  local id = _g380.id
  local imported = _g380.imported
  local indentation = _g380.indentation
  local initial_environment = _g380["initial-environment"]
  local linked = _g380.linked
  local macro_function = _g380["macro-function"]
  local macro63 = _g380["macro?"]
  local macroexpand = _g380.macroexpand
  local mapo = _g380.mapo
  local quasiexpand = _g380.quasiexpand
  local quote_environment = _g380["quote-environment"]
  local quote_modules = _g380["quote-modules"]
  local quoted = _g380.quoted
  local reserved63 = _g380["reserved?"]
  local sortk = _g380.sortk
  local special_form63 = _g380["special-form?"]
  local special63 = _g380["special?"]
  local stash42 = _g380["stash*"]
  local statement63 = _g380["statement?"]
  local symbol_expansion = _g380["symbol-expansion"]
  local symbol63 = _g380["symbol?"]
  local valid_id63 = _g380["valid-id?"]
  local variable63 = _g380["variable?"]
  local _g381 = nexus["lumen/compiler"]
  local compile = _g381.compile
  local compile_function = _g381["compile-function"]
  local compile_module = _g381["compile-module"]
  local declare = _g381.declare
  local eval = _g381.eval
  local import_modules = _g381["import-modules"]
  local in_module = _g381["in-module"]
  local load_module = _g381["load-module"]
  local open_module = _g381["open-module"]
  target = "lua"
end)();
(function ()
  nexus["lumen/boot"] = {}
  local _g680 = nexus["lumen/runtime"]
  local _37 = _g680["%"]
  local _37message_handler = _g680["%message-handler"]
  local _42 = _g680["*"]
  local _43 = _g680["+"]
  local _ = _g680["-"]
  local _47 = _g680["/"]
  local _60 = _g680["<"]
  local _6061 = _g680["<="]
  local _61 = _g680["="]
  local _62 = _g680[">"]
  local _6261 = _g680[">="]
  local abs = _g680.abs
  local acos = _g680.acos
  local add = _g680.add
  local apply = _g680.apply
  local asin = _g680.asin
  local atan = _g680.atan
  local atan2 = _g680.atan2
  local atom63 = _g680["atom?"]
  local boolean63 = _g680["boolean?"]
  local cat = _g680.cat
  local ceil = _g680.ceil
  local char = _g680.char
  local code = _g680.code
  local composite63 = _g680["composite?"]
  local cos = _g680.cos
  local drop = _g680.drop
  local empty63 = _g680["empty?"]
  local exclude = _g680.exclude
  local exit = _g680.exit
  local extend = _g680.extend
  local find = _g680.find
  local flat = _g680.flat
  local flat1 = _g680.flat1
  local floor = _g680.floor
  local function63 = _g680["function?"]
  local hd = _g680.hd
  local id_literal63 = _g680["id-literal?"]
  local in63 = _g680["in?"]
  local inner = _g680.inner
  local is63 = _g680["is?"]
  local iterate = _g680.iterate
  local join = _g680.join
  local keep = _g680.keep
  local keys63 = _g680["keys?"]
  local last = _g680.last
  local length = _g680.length
  local list63 = _g680["list?"]
  local log = _g680.log
  local log10 = _g680.log10
  local make_id = _g680["make-id"]
  local map = _g680.map
  local max = _g680.max
  local min = _g680.min
  local module = _g680.module
  local module_key = _g680["module-key"]
  local nil63 = _g680["nil?"]
  local none63 = _g680["none?"]
  local now = _g680.now
  local number = _g680.number
  local number63 = _g680["number?"]
  local one63 = _g680["one?"]
  local pair = _g680.pair
  local pow = _g680.pow
  local random = _g680.random
  local read_file = _g680["read-file"]
  local reduce = _g680.reduce
  local replicate = _g680.replicate
  local reverse = _g680.reverse
  local sd = _g680.sd
  local search = _g680.search
  local setenv = _g680.setenv
  local sin = _g680.sin
  local sinh = _g680.sinh
  local some63 = _g680["some?"]
  local sort = _g680.sort
  local space = _g680.space
  local splice = _g680.splice
  local split = _g680.split
  local sqrt = _g680.sqrt
  local stash = _g680.stash
  local string = _g680.string
  local string_literal63 = _g680["string-literal?"]
  local string63 = _g680["string?"]
  local sub = _g680.sub
  local substring = _g680.substring
  local table63 = _g680["table?"]
  local tan = _g680.tan
  local tanh = _g680.tanh
  local td = _g680.td
  local tl = _g680.tl
  local today = _g680.today
  local toplevel63 = _g680["toplevel?"]
  local unstash = _g680.unstash
  local write = _g680.write
  local write_file = _g680["write-file"]
  local _g683 = nexus["lumen/utilities"]
  local bind = _g683.bind
  local bind42 = _g683["bind*"]
  local bound63 = _g683["bound?"]
  local getenv = _g683.getenv
  local id = _g683.id
  local imported = _g683.imported
  local indentation = _g683.indentation
  local initial_environment = _g683["initial-environment"]
  local linked = _g683.linked
  local macro_function = _g683["macro-function"]
  local macro63 = _g683["macro?"]
  local macroexpand = _g683.macroexpand
  local mapo = _g683.mapo
  local quasiexpand = _g683.quasiexpand
  local quote_environment = _g683["quote-environment"]
  local quote_modules = _g683["quote-modules"]
  local quoted = _g683.quoted
  local reserved63 = _g683["reserved?"]
  local sortk = _g683.sortk
  local special_form63 = _g683["special-form?"]
  local special63 = _g683["special?"]
  local stash42 = _g683["stash*"]
  local statement63 = _g683["statement?"]
  local symbol_expansion = _g683["symbol-expansion"]
  local symbol63 = _g683["symbol?"]
  local valid_id63 = _g683["valid-id?"]
  local variable63 = _g683["variable?"]
  local _g684 = nexus["lumen/compiler"]
  local compile = _g684.compile
  local compile_function = _g684["compile-function"]
  local compile_module = _g684["compile-module"]
  local declare = _g684.declare
  local eval = _g684.eval
  local import_modules = _g684["import-modules"]
  local in_module = _g684["in-module"]
  local load_module = _g684["load-module"]
  local open_module = _g684["open-module"]
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
    local _g762 = sub(bs, 0)
    return({"set", a, join({"cat", a}, _g762)})
  end}, dec = {export = true, macro = function (n, by)
    return({"set", n, {"-", n, by or 1}})
  end}, define = {export = true, macro = function (name, x, ...)
    local body = unstash({...})
    local _g735 = sub(body, 0)
    setenv(name, {_stash = true, variable = true})
    if some63(_g735) and target == "js" then
      return(linked(name, {"%local", name, join({"fn", x}, _g735)}))
    else
      if some63(_g735) then
        local _g736 = bind42(x, _g735)
        local args = _g736[1]
        local _g737 = _g736[2]
        return(linked(name, join({"%local-function", name, args}, _g737)))
      else
        return(linked(name, {"%local", name, x}))
      end
    end
  end}, ["define*"] = {export = true, macro = function (name, x, ...)
    local body = unstash({...})
    local _g746 = sub(body, 0)
    setenv(name, {_stash = true, export = true, global = true})
    if some63(_g746) then
      local _g747 = bind42(x, _g746)
      local args = _g747[1]
      local _g748 = _g747[2]
      return(join({"%global-function", name, args}, _g748))
    else
      if target == "js" then
        return({"set", {"get", "global", {"quote", id(name)}}, x})
      else
        return({"set", name, x})
      end
    end
  end}, ["define-macro"] = {export = true, macro = function (name, args, ...)
    local body = unstash({...})
    local _g744 = sub(body, 0)
    local form = join({"fn", args}, _g744)
    local _g745 = {"setenv", {"quote", name}}
    _g745.form = {"quote", form}
    _g745.macro = form
    eval(_g745)
    return(nil)
  end}, ["define-module"] = {export = true, macro = function (spec, ...)
    local body = unstash({...})
    local _g753 = sub(body, 0)
    local alias = _g753.alias
    local exp = _g753.export
    local imp = _g753.import
    local _g754 = import_modules(imp)
    local imports = _g754[1]
    local bindings = _g754[2]
    local k = module_key(spec)
    modules[k] = {alias = alias, export = {}, import = imports}
    local _g755 = exp or {}
    local _g756 = 0
    while _g756 < length(_g755) do
      local x = _g755[_g756 + 1]
      setenv(x, {_stash = true, export = true})
      _g756 = _g756 + 1
    end
    return(join({"do", {"set", {"get", "nexus", {"quote", k}}, {"table"}}}, bindings))
  end}, ["define-special"] = {export = true, macro = function (name, args, ...)
    local body = unstash({...})
    local _g719 = sub(body, 0)
    local form = join({"fn", args}, _g719)
    local keys = sub(_g719, length(_g719))
    local _g720 = {"setenv", {"quote", name}}
    _g720.form = {"quote", form}
    _g720.special = form
    eval(join(_g720, keys))
    return(nil)
  end}, ["define-symbol"] = {export = true, macro = function (name, expansion)
    setenv(name, {_stash = true, symbol = expansion})
    return(nil)
  end}, each = {export = true, macro = function (b, t, ...)
    local body = unstash({...})
    local _g749 = sub(body, 0)
    local k = b[1]
    local v = b[2]
    local t1 = make_id()
    local _g782
    if nil63(v) then
      local _g783
      if b.i then
        _g783 = "i"
      else
        _g783 = make_id()
      end
      local i = _g783
      _g782 = {"let", {i, 0}, {"while", {"<", i, {"length", t1}}, join({"let", {k, {"at", t1, i}}}, _g749), {"inc", i}}}
    else
      local _g750 = {"target"}
      _g750.js = {"isNaN", {"parseInt", k}}
      _g750.lua = {"not", {"number?", k}}
      _g782 = {"let", {k, "nil"}, {"%for", t1, k, {"when", _g750, join({"let", {v, {"get", t1, k}}}, _g749)}}}
    end
    return({"let", {t1, t}, _g782})
  end}, fn = {export = true, macro = function (args, ...)
    local body = unstash({...})
    local _g757 = sub(body, 0)
    local _g758 = bind42(args, _g757)
    local _g759 = _g758[1]
    local _g760 = _g758[2]
    return(join({"%function", _g759}, _g760))
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
    local function step(_g761)
      local a = _g761[1]
      local b = _g761[2]
      local c = sub(_g761, 2)
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
    local _g729 = sub(bs, 0)
    return({"set", a, join({"join*", a}, _g729)})
  end}, ["join*"] = {export = true, macro = function (...)
    local xs = unstash({...})
    return(reduce(function (a, b)
      return({"join", a, b})
    end, xs))
  end}, language = {export = true, macro = function ()
    return({"quote", target})
  end}, let = {export = true, macro = function (bindings, ...)
    local body = unstash({...})
    local _g730 = sub(body, 0)
    local i = 0
    local renames = {}
    local locals = {}
    map(function (_g731)
      local lh = _g731[1]
      local rh = _g731[2]
      local _g732 = bind(lh, rh)
      local _g733 = 0
      while _g733 < length(_g732) do
        local _g734 = _g732[_g733 + 1]
        local id = _g734[1]
        local val = _g734[2]
        if bound63(id) or reserved63(id) or toplevel63() then
          local rename = make_id()
          add(renames, id)
          add(renames, rename)
          id = rename
        else
          setenv(id, {_stash = true, variable = true})
        end
        add(locals, {"%local", id, val})
        _g733 = _g733 + 1
      end
    end, pair(bindings))
    return(join({"do"}, join(locals, {join({"let-symbol", renames}, _g730)})))
  end}, ["let-macro"] = {export = true, macro = function (definitions, ...)
    local body = unstash({...})
    local _g740 = sub(body, 0)
    add(environment, {})
    map(function (m)
      return(macroexpand(join({"define-macro"}, m)))
    end, definitions)
    local _g741 = join({"do"}, macroexpand(_g740))
    drop(environment)
    return(_g741)
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
  end}, list = {export = true, macro = function (...)
    local body = unstash({...})
    local l = join({"%array"}, body)
    if not keys63(body) then
      return(l)
    else
      local id = make_id()
      local init = {}
      local _g724 = body
      local k = nil
      for k in next, _g724 do
        if not number63(k) then
          local v = _g724[k]
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
    local _g742 = elements
    local _g743 = 0
    while _g743 < length(_g742) do
      local e = _g742[_g743 + 1]
      l[e] = true
      _g743 = _g743 + 1
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
    local _g739 = sub(body, 0)
    return({"if", {"not", cond}, join({"do"}, _g739)})
  end}, when = {export = true, macro = function (cond, ...)
    local body = unstash({...})
    local _g738 = sub(body, 0)
    return({"if", cond, join({"do"}, _g738)})
  end}, ["with-bindings"] = {export = true, macro = function (_g725, ...)
    local names = _g725[1]
    local body = unstash({...})
    local _g726 = sub(body, 0)
    local x = make_id()
    local _g728 = {"setenv", x}
    _g728.variable = true
    local _g727 = {"with-frame", {"each", {x}, names, _g728}}
    _g727.scope = true
    return(join(_g727, _g726))
  end}, ["with-frame"] = {export = true, macro = function (...)
    local body = unstash({...})
    local _g751 = sub(body, 0)
    local scope = body.scope
    local x = make_id()
    local _g752 = {"table"}
    _g752._scope = scope
    return({"do", {"add", "environment", _g752}, {"let", {x, join({"do"}, _g751)}, {"drop", "environment"}, x}})
  end}}, import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}, {"lumen", "utilities"}, {"lumen", "compiler"}}}, ["lumen/main"] = {export = {}, import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}, {"lumen", "reader"}, {"lumen", "compiler"}}}, ["lumen/reader"] = {export = {["define-reader"] = {export = true, macro = function (_g763, ...)
    local char = _g763[1]
    local stream = _g763[2]
    local body = unstash({...})
    local _g764 = sub(body, 0)
    return({"set", {"get", "read-table", char}, join({"fn", {stream}}, _g764)})
  end}, delimiters = {variable = true}, eof = {variable = true}, ["flag?"] = {variable = true}, ["key?"] = {variable = true}, ["make-stream"] = {export = true, variable = true}, ["peek-char"] = {variable = true}, read = {export = true, variable = true}, ["read-all"] = {export = true, variable = true}, ["read-char"] = {variable = true}, ["read-from-string"] = {export = true, variable = true}, ["read-table"] = {export = true, variable = true}, ["skip-non-code"] = {variable = true}, whitespace = {variable = true}}, import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}}}, ["lumen/runtime"] = {export = {["%"] = {export = true, variable = true}, ["%message-handler"] = {export = true, variable = true}, ["*"] = {export = true, variable = true}, ["+"] = {export = true, variable = true}, ["-"] = {export = true, variable = true}, ["/"] = {export = true, variable = true}, ["<"] = {export = true, variable = true}, ["<="] = {export = true, variable = true}, ["="] = {export = true, variable = true}, [">"] = {export = true, variable = true}, [">="] = {export = true, variable = true}, abs = {export = true, variable = true}, acos = {export = true, variable = true}, add = {export = true, variable = true}, apply = {export = true, variable = true}, asin = {export = true, variable = true}, atan = {export = true, variable = true}, atan2 = {export = true, variable = true}, ["atom?"] = {export = true, variable = true}, ["boolean?"] = {export = true, variable = true}, cat = {export = true, variable = true}, ceil = {export = true, variable = true}, char = {export = true, variable = true}, code = {export = true, variable = true}, ["composite?"] = {export = true, variable = true}, cos = {export = true, variable = true}, drop = {export = true, variable = true}, ["empty?"] = {export = true, variable = true}, exclude = {export = true, variable = true}, exit = {export = true, variable = true}, extend = {export = true, variable = true}, find = {export = true, variable = true}, flat = {export = true, variable = true}, flat1 = {export = true, variable = true}, floor = {export = true, variable = true}, ["function?"] = {export = true, variable = true}, hd = {export = true, variable = true}, ["id-count"] = {variable = true}, ["id-literal?"] = {export = true, variable = true}, ["in?"] = {export = true, variable = true}, inner = {export = true, variable = true}, ["is?"] = {export = true, variable = true}, iterate = {export = true, variable = true}, join = {export = true, variable = true}, keep = {export = true, variable = true}, ["keys?"] = {export = true, variable = true}, last = {export = true, variable = true}, length = {export = true, variable = true}, ["list?"] = {export = true, variable = true}, log = {export = true, variable = true}, log10 = {export = true, variable = true}, ["make-id"] = {export = true, variable = true}, map = {export = true, variable = true}, mapl = {variable = true}, math = {variable = true}, max = {export = true, variable = true}, ["max*"] = {variable = true}, min = {export = true, variable = true}, ["min*"] = {variable = true}, module = {export = true, variable = true}, ["module-key"] = {export = true, variable = true}, ["nil?"] = {export = true, variable = true}, ["none?"] = {export = true, variable = true}, now = {export = true, variable = true}, number = {export = true, variable = true}, ["number?"] = {export = true, variable = true}, ["one?"] = {export = true, variable = true}, pair = {export = true, variable = true}, pow = {export = true, variable = true}, random = {export = true, variable = true}, ["read-file"] = {export = true, variable = true}, reduce = {export = true, variable = true}, replicate = {export = true, variable = true}, reverse = {export = true, variable = true}, sd = {export = true, variable = true}, search = {export = true, variable = true}, setenv = {export = true, variable = true}, sin = {export = true, variable = true}, sinh = {export = true, variable = true}, ["some?"] = {export = true, variable = true}, sort = {export = true, variable = true}, space = {export = true, variable = true}, splice = {export = true, variable = true}, ["splice?"] = {variable = true}, split = {export = true, variable = true}, sqrt = {export = true, variable = true}, stash = {export = true, variable = true}, string = {export = true, variable = true}, ["string-literal?"] = {export = true, variable = true}, ["string?"] = {export = true, variable = true}, sub = {export = true, variable = true}, subl = {variable = true}, substring = {export = true, variable = true}, ["table?"] = {export = true, variable = true}, tan = {export = true, variable = true}, tanh = {export = true, variable = true}, td = {export = true, variable = true}, tl = {export = true, variable = true}, today = {export = true, variable = true}, ["toplevel?"] = {export = true, variable = true}, unstash = {export = true, variable = true}, write = {export = true, variable = true}, ["write-file"] = {export = true, variable = true}}, import = {{"lumen", "special"}, {"lumen", "core"}}}, ["lumen/special"] = {export = {["%array"] = {export = true, foo = true, special = function (...)
    local forms = unstash({...})
    local _g779
    if target == "lua" then
      _g779 = "{"
    else
      _g779 = "["
    end
    local open = _g779
    local _g780
    if target == "lua" then
      _g780 = "}"
    else
      _g780 = "]"
    end
    local close = _g780
    local str = ""
    local _g713 = forms
    local i = 0
    while i < length(_g713) do
      local x = _g713[i + 1]
      str = str .. compile(x)
      if i < length(forms) - 1 then
        str = str .. ", "
      end
      i = i + 1
    end
    return(open .. str .. close)
  end}, ["%for"] = {export = true, foo = true, special = function (t, k, form)
    local _g716 = compile(t)
    local ind = indentation()
    indent_level = indent_level + 1
    local _g717 = compile(form, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local body = _g717
    if target == "lua" then
      return(ind .. "for " .. k .. " in next, " .. _g716 .. " do\n" .. body .. ind .. "end\n")
    else
      return(ind .. "for (" .. k .. " in " .. _g716 .. ") {\n" .. body .. ind .. "}\n")
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
    local _g702 = compile(cond)
    indent_level = indent_level + 1
    local _g705 = compile(cons, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local _g703 = _g705
    local _g777
    if alt then
      indent_level = indent_level + 1
      local _g706 = compile(alt, {_stash = true, stmt = true})
      indent_level = indent_level - 1
      _g777 = _g706
    end
    local _g704 = _g777
    local ind = indentation()
    local str = ""
    if target == "js" then
      str = str .. ind .. "if (" .. _g702 .. ") {\n" .. _g703 .. ind .. "}"
    else
      str = str .. ind .. "if " .. _g702 .. " then\n" .. _g703
    end
    if _g704 and target == "js" then
      str = str .. " else {\n" .. _g704 .. ind .. "}"
    else
      if _g704 then
        str = str .. ind .. "else\n" .. _g704
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
    local _g774
    if is63(value) then
      _g774 = " = " .. value1
    else
      _g774 = ""
    end
    local rh = _g774
    local _g775
    if target == "js" then
      _g775 = "var "
    else
      _g775 = "local "
    end
    local keyword = _g775
    local ind = indentation()
    return(ind .. keyword .. id .. rh)
  end, stmt = true}, ["%local-function"] = {export = true, foo = true, special = function (name, args, body)
    local x = compile_function(args, body, {_stash = true, name = name, prefix = "local "})
    return(indentation() .. x)
  end, stmt = true, tr = true}, ["%object"] = {export = true, foo = true, special = function (...)
    local forms = unstash({...})
    local str = "{"
    local _g769
    if target == "lua" then
      _g769 = " = "
    else
      _g769 = ": "
    end
    local sep = _g769
    local pairs = sortk(pair(forms), hd)
    local _g697 = pairs
    local i = 0
    while i < length(_g697) do
      local _g698 = _g697[i + 1]
      local k = _g698[1]
      local v = _g698[2]
      if not string63(k) then
        error("Illegal key: " .. string(k))
      end
      local _g699 = compile(v)
      local _g770
      if valid_id63(k) then
        _g770 = k
      else
        local _g771
        if target == "js" and string_literal63(k) then
          _g771 = k
        else
          local _g772
          if target == "js" then
            _g772 = quoted(k)
          else
            local _g773
            if string_literal63(k) then
              _g773 = "[" .. k .. "]"
            else
              _g773 = "[" .. quoted(k) .. "]"
            end
            _g772 = _g773
          end
          _g771 = _g772
        end
        _g770 = _g771
      end
      local _g700 = _g770
      str = str .. _g700 .. sep .. _g699
      if i < length(pairs) - 1 then
        str = str .. ", "
      end
      i = i + 1
    end
    return(str .. "}")
  end}, ["%try"] = {export = true, foo = true, special = function (form)
    local ind = indentation()
    indent_level = indent_level + 1
    local _g707 = compile(form, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local body = _g707
    local e = make_id()
    local hf = {"return", {"%array", false, {"get", e, "\"message\""}}}
    indent_level = indent_level + 1
    local _g708 = compile(hf, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local h = _g708
    return(ind .. "try {\n" .. body .. ind .. "}\n" .. ind .. "catch (" .. e .. ") {\n" .. h .. ind .. "}\n")
  end, stmt = true, tr = true}, ["break"] = {export = true, foo = true, special = function ()
    return(indentation() .. "break")
  end, stmt = true}, ["do"] = {export = true, foo = true, special = function (...)
    local forms = unstash({...})
    local str = ""
    local _g714 = forms
    local _g715 = 0
    while _g715 < length(_g714) do
      local x = _g714[_g715 + 1]
      str = str .. compile(x, {_stash = true, stmt = true})
      _g715 = _g715 + 1
    end
    return(str)
  end, stmt = true, tr = true}, ["error"] = {export = true, foo = true, special = function (x)
    local _g781
    if target == "js" then
      _g781 = "throw new " .. compile({"Error", x})
    else
      _g781 = "error(" .. compile(x) .. ")"
    end
    local e = _g781
    return(indentation() .. e)
  end, stmt = true}, ["get"] = {export = true, foo = true, special = function (t, k)
    local _g718 = compile(t)
    local k1 = compile(k)
    if target == "lua" and char(_g718, 0) == "{" then
      _g718 = "(" .. _g718 .. ")"
    end
    if string_literal63(k) and valid_id63(inner(k)) then
      return(_g718 .. "." .. inner(k))
    else
      return(_g718 .. "[" .. k1 .. "]")
    end
  end}, ["not"] = {}, ["return"] = {export = true, foo = true, special = function (x)
    local _g776
    if nil63(x) then
      _g776 = "return"
    else
      _g776 = "return(" .. compile(x) .. ")"
    end
    local _g701 = _g776
    return(indentation() .. _g701)
  end, stmt = true}, ["set"] = {export = true, foo = true, special = function (lh, rh)
    local _g709 = compile(lh)
    local _g778
    if nil63(rh) then
      _g778 = "nil"
    else
      _g778 = rh
    end
    local _g710 = compile(_g778)
    return(indentation() .. _g709 .. " = " .. _g710)
  end, stmt = true}, ["while"] = {export = true, foo = true, special = function (cond, form)
    local _g711 = compile(cond)
    indent_level = indent_level + 1
    local _g712 = compile(form, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local body = _g712
    local ind = indentation()
    if target == "js" then
      return(ind .. "while (" .. _g711 .. ") {\n" .. body .. ind .. "}\n")
    else
      return(ind .. "while " .. _g711 .. " do\n" .. body .. ind .. "end\n")
    end
  end, stmt = true, tr = true}}, import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}, {"lumen", "utilities"}, {"lumen", "compiler"}}}, ["lumen/system"] = {export = {nexus = {export = true, global = true}}, import = {{"lumen", "special"}, {"lumen", "core"}}}, ["lumen/utilities"] = {export = {bind = {export = true, variable = true}, ["bind*"] = {export = true, variable = true}, ["bound?"] = {export = true, variable = true}, ["can-unquote?"] = {variable = true}, escape = {variable = true}, getenv = {export = true, variable = true}, ["global?"] = {variable = true}, id = {export = true, variable = true}, imported = {export = true, variable = true}, ["indent-level"] = {export = true, global = true}, indentation = {export = true, variable = true}, ["initial-environment"] = {export = true, variable = true}, linked = {export = true, variable = true}, ["macro-function"] = {export = true, variable = true}, ["macro?"] = {export = true, variable = true}, macroexpand = {export = true, variable = true}, mapo = {export = true, variable = true}, ["numeric?"] = {variable = true}, quasiexpand = {export = true, variable = true}, ["quasiquote-list"] = {variable = true}, ["quasiquoting?"] = {variable = true}, ["quasisplice?"] = {variable = true}, ["quote-binding"] = {variable = true}, ["quote-environment"] = {export = true, variable = true}, ["quote-frame"] = {variable = true}, ["quote-module"] = {variable = true}, ["quote-modules"] = {export = true, variable = true}, quoted = {export = true, variable = true}, ["quoting?"] = {variable = true}, reserved = {variable = true}, ["reserved?"] = {export = true, variable = true}, sortk = {export = true, variable = true}, ["special-form?"] = {export = true, variable = true}, ["special?"] = {export = true, variable = true}, ["stash*"] = {export = true, variable = true}, ["statement?"] = {export = true, variable = true}, ["symbol-expansion"] = {export = true, variable = true}, ["symbol?"] = {export = true, variable = true}, ["valid-char?"] = {variable = true}, ["valid-id?"] = {export = true, variable = true}, ["variable?"] = {export = true, variable = true}, ["with-indent"] = {export = true, macro = function (form)
    local result = make_id()
    return({"do", {"inc", "indent-level"}, {"let", {result, form}, {"dec", "indent-level"}, result}})
  end}}, import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}}}, user = {export = {}, import = {"lumen", {"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}}}}
  environment = {{["define-module"] = {export = true, macro = function (spec, ...)
    local body = unstash({...})
    local _g765 = sub(body, 0)
    local alias = _g765.alias
    local exp = _g765.export
    local imp = _g765.import
    local _g766 = import_modules(imp)
    local imports = _g766[1]
    local bindings = _g766[2]
    local k = module_key(spec)
    modules[k] = {alias = alias, export = {}, import = imports}
    local _g767 = exp or {}
    local _g768 = 0
    while _g768 < length(_g767) do
      local x = _g767[_g768 + 1]
      setenv(x, {_stash = true, export = true})
      _g768 = _g768 + 1
    end
    return(join({"do", {"set", {"get", "nexus", {"quote", k}}, {"table"}}}, bindings))
  end}}}
end)();
(function ()
  nexus.user = {}
  local _g784 = nexus["lumen/runtime"]
  local _37 = _g784["%"]
  local _37message_handler = _g784["%message-handler"]
  local _42 = _g784["*"]
  local _43 = _g784["+"]
  local _ = _g784["-"]
  local _47 = _g784["/"]
  local _60 = _g784["<"]
  local _6061 = _g784["<="]
  local _61 = _g784["="]
  local _62 = _g784[">"]
  local _6261 = _g784[">="]
  local abs = _g784.abs
  local acos = _g784.acos
  local add = _g784.add
  local apply = _g784.apply
  local asin = _g784.asin
  local atan = _g784.atan
  local atan2 = _g784.atan2
  local atom63 = _g784["atom?"]
  local boolean63 = _g784["boolean?"]
  local cat = _g784.cat
  local ceil = _g784.ceil
  local char = _g784.char
  local code = _g784.code
  local composite63 = _g784["composite?"]
  local cos = _g784.cos
  local drop = _g784.drop
  local empty63 = _g784["empty?"]
  local exclude = _g784.exclude
  local exit = _g784.exit
  local extend = _g784.extend
  local find = _g784.find
  local flat = _g784.flat
  local flat1 = _g784.flat1
  local floor = _g784.floor
  local function63 = _g784["function?"]
  local hd = _g784.hd
  local id_literal63 = _g784["id-literal?"]
  local in63 = _g784["in?"]
  local inner = _g784.inner
  local is63 = _g784["is?"]
  local iterate = _g784.iterate
  local join = _g784.join
  local keep = _g784.keep
  local keys63 = _g784["keys?"]
  local last = _g784.last
  local length = _g784.length
  local list63 = _g784["list?"]
  local log = _g784.log
  local log10 = _g784.log10
  local make_id = _g784["make-id"]
  local map = _g784.map
  local max = _g784.max
  local min = _g784.min
  local module = _g784.module
  local module_key = _g784["module-key"]
  local nil63 = _g784["nil?"]
  local none63 = _g784["none?"]
  local now = _g784.now
  local number = _g784.number
  local number63 = _g784["number?"]
  local one63 = _g784["one?"]
  local pair = _g784.pair
  local pow = _g784.pow
  local random = _g784.random
  local read_file = _g784["read-file"]
  local reduce = _g784.reduce
  local replicate = _g784.replicate
  local reverse = _g784.reverse
  local sd = _g784.sd
  local search = _g784.search
  local setenv = _g784.setenv
  local sin = _g784.sin
  local sinh = _g784.sinh
  local some63 = _g784["some?"]
  local sort = _g784.sort
  local space = _g784.space
  local splice = _g784.splice
  local split = _g784.split
  local sqrt = _g784.sqrt
  local stash = _g784.stash
  local string = _g784.string
  local string_literal63 = _g784["string-literal?"]
  local string63 = _g784["string?"]
  local sub = _g784.sub
  local substring = _g784.substring
  local table63 = _g784["table?"]
  local tan = _g784.tan
  local tanh = _g784.tanh
  local td = _g784.td
  local tl = _g784.tl
  local today = _g784.today
  local toplevel63 = _g784["toplevel?"]
  local unstash = _g784.unstash
  local write = _g784.write
  local write_file = _g784["write-file"]
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
    local _g788,_g789 = xpcall(function ()
      return(eval(read_from_string(str)))
    end, _37message_handler)
    local _g787 = {_g788, _g789}
    local _g1 = _g787[1]
    local x = _g787[2]
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
    local _g790 = args
    local i = 0
    while i < length(_g790) do
      local arg = _g790[i + 1]
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
