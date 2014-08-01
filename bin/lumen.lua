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
  local _g64 = nexus["lumen/runtime"]
  local _37 = _g64["%"]
  local _37message_handler = _g64["%message-handler"]
  local _42 = _g64["*"]
  local _43 = _g64["+"]
  local _ = _g64["-"]
  local _47 = _g64["/"]
  local _60 = _g64["<"]
  local _6061 = _g64["<="]
  local _61 = _g64["="]
  local _62 = _g64[">"]
  local _6261 = _g64[">="]
  local abs = _g64.abs
  local acos = _g64.acos
  local add = _g64.add
  local apply = _g64.apply
  local asin = _g64.asin
  local atan = _g64.atan
  local atan2 = _g64.atan2
  local atom63 = _g64["atom?"]
  local boolean63 = _g64["boolean?"]
  local cat = _g64.cat
  local ceil = _g64.ceil
  local char = _g64.char
  local code = _g64.code
  local composite63 = _g64["composite?"]
  local cos = _g64.cos
  local drop = _g64.drop
  local empty63 = _g64["empty?"]
  local exclude = _g64.exclude
  local exit = _g64.exit
  local extend = _g64.extend
  local find = _g64.find
  local flat = _g64.flat
  local flat1 = _g64.flat1
  local floor = _g64.floor
  local function63 = _g64["function?"]
  local hd = _g64.hd
  local id_literal63 = _g64["id-literal?"]
  local in63 = _g64["in?"]
  local inner = _g64.inner
  local is63 = _g64["is?"]
  local iterate = _g64.iterate
  local join = _g64.join
  local keep = _g64.keep
  local keys63 = _g64["keys?"]
  local last = _g64.last
  local length = _g64.length
  local list63 = _g64["list?"]
  local log = _g64.log
  local log10 = _g64.log10
  local make_id = _g64["make-id"]
  local map = _g64.map
  local max = _g64.max
  local min = _g64.min
  local module = _g64.module
  local module_key = _g64["module-key"]
  local nil63 = _g64["nil?"]
  local none63 = _g64["none?"]
  local now = _g64.now
  local number = _g64.number
  local number63 = _g64["number?"]
  local one63 = _g64["one?"]
  local pair = _g64.pair
  local pow = _g64.pow
  local random = _g64.random
  local read_file = _g64["read-file"]
  local reduce = _g64.reduce
  local replicate = _g64.replicate
  local reverse = _g64.reverse
  local sd = _g64.sd
  local search = _g64.search
  local setenv = _g64.setenv
  local sin = _g64.sin
  local sinh = _g64.sinh
  local some63 = _g64["some?"]
  local sort = _g64.sort
  local space = _g64.space
  local splice = _g64.splice
  local split = _g64.split
  local sqrt = _g64.sqrt
  local stash = _g64.stash
  local string = _g64.string
  local string_literal63 = _g64["string-literal?"]
  local string63 = _g64["string?"]
  local sub = _g64.sub
  local substring = _g64.substring
  local table63 = _g64["table?"]
  local tan = _g64.tan
  local tanh = _g64.tanh
  local td = _g64.td
  local tl = _g64.tl
  local today = _g64.today
  local toplevel63 = _g64["toplevel?"]
  local unstash = _g64.unstash
  local write = _g64.write
  local write_file = _g64["write-file"]
  local function getenv(k, ...)
    local keys = unstash({...})
    local _g67 = sub(keys, 0)
    if string63(k) then
      local b = find(function (e)
        return(e[k])
      end, reverse(environment))
      if table63(b) then
        local _g68 = nil
        local _g69 = _g67
        local x = nil
        for x in next, _g69 do
          if not number63(x) then
            local _g60 = _g69[x]
            _g68 = x
          end
        end
        if _g68 then
          return(b[_g68])
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
      local _g99
      if c == "\n" then
        _g99 = "\\n"
      else
        local _g100
        if c == "\"" then
          _g100 = "\\\""
        else
          local _g101
          if c == "\\" then
            _g101 = "\\\\"
          else
            _g101 = c
          end
          _g100 = _g101
        end
        _g99 = _g100
      end
      local c1 = _g99
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
  local function stash42(args)
    if keys63(args) then
      local l = {"%object", "_stash", true}
      local _g70 = args
      local k = nil
      for k in next, _g70 do
        if not number63(k) then
          local v = _g70[k]
          add(l, k)
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
        local _g71 = lh
        local i = 0
        while i < length(_g71) do
          local x = _g71[i + 1]
          bs = join(bs, bind(x, {"at", rh, i}))
          i = i + 1
        end
        if r then
          bs = join(bs, bind(r, {"sub", rh, length(lh)}))
        end
        local _g72 = lh
        local k = nil
        for k in next, _g72 do
          if not number63(k) then
            local v = _g72[k]
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
      local _g73 = args
      local _g74 = 0
      while _g74 < length(_g73) do
        local arg = _g73[_g74 + 1]
        if atom63(arg) then
          add(args1, arg)
        else
          if list63(arg) or keys63(arg) then
            local v = make_id()
            add(args1, v)
            bs = join(bs, {arg, v})
          end
        end
        _g74 = _g74 + 1
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
          local _g61 = form[1]
          local name = form[2]
          local value = form[3]
          return({"%local", name, macroexpand(value)})
        else
          if x == "%function" then
            local _g62 = form[1]
            local args = form[2]
            local body = sub(form, 2)
            add(environment, {_scope = true})
            local _g77 = args
            local _g78 = 0
            while _g78 < length(_g77) do
              local _g75 = _g77[_g78 + 1]
              setenv(_g75, {_stash = true, variable = true})
              _g78 = _g78 + 1
            end
            local _g76 = join({"%function", map(macroexpand, args)}, macroexpand(body))
            drop(environment)
            return(_g76)
          else
            if x == "%local-function" or x == "%global-function" then
              local _g63 = form[1]
              local _g79 = form[2]
              local _g80 = form[3]
              local _g81 = sub(form, 3)
              add(environment, {_scope = true})
              local _g84 = _g80
              local _g85 = 0
              while _g85 < length(_g84) do
                local _g82 = _g84[_g85 + 1]
                setenv(_g82, {_stash = true, variable = true})
                _g85 = _g85 + 1
              end
              local _g83 = join({x, _g79, map(macroexpand, _g80)}, macroexpand(_g81))
              drop(environment)
              return(_g83)
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
    local _g86 = form
    local k = nil
    for k in next, _g86 do
      if not number63(k) then
        local v = _g86[k]
        local _g102
        if quasisplice63(v, depth) then
          _g102 = quasiexpand(v[2])
        else
          _g102 = quasiexpand(v, depth)
        end
        local _g87 = _g102
        last(xs)[k] = _g87
      end
    end
    local _g88 = form
    local _g89 = 0
    while _g89 < length(_g88) do
      local x = _g88[_g89 + 1]
      if quasisplice63(x, depth) then
        local _g90 = quasiexpand(x[2])
        add(xs, _g90)
        add(xs, {"list"})
      else
        add(last(xs), quasiexpand(x, depth))
      end
      _g89 = _g89 + 1
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
  local reserved = {["%"] = true, ["*"] = true, ["+"] = true, ["-"] = true, ["/"] = true, ["<"] = true, ["<="] = true, ["="] = true, ["=="] = true, [">"] = true, [">="] = true, ["and"] = true, ["break"] = true, ["case"] = true, ["catch"] = true, ["continue"] = true, ["debugger"] = true, ["default"] = true, ["delete"] = true, ["do"] = true, ["else"] = true, ["elseif"] = true, ["end"] = true, ["false"] = true, ["finally"] = true, ["for"] = true, ["function"] = true, ["if"] = true, ["in"] = true, ["instanceof"] = true, ["local"] = true, ["new"] = true, ["nil"] = true, ["not"] = true, ["or"] = true, ["repeat"] = true, ["return"] = true, ["switch"] = true, ["then"] = true, ["this"] = true, ["throw"] = true, ["true"] = true, ["try"] = true, ["typeof"] = true, ["until"] = true, ["var"] = true, ["void"] = true, ["while"] = true, ["with"] = true}
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
      local _g103
      if c == "-" then
        _g103 = "_"
      else
        local _g104
        if i == 0 and numeric63(n) then
          _g104 = "_" .. n
        else
          local _g105
          if valid_char63(n) then
            _g105 = c
          else
            local _g106
            if i == 0 then
              _g106 = "_" .. n
            else
              _g106 = n
            end
            _g105 = _g106
          end
          _g104 = _g105
        end
        _g103 = _g104
      end
      local c1 = _g103
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
    if valid_id63(k) then
      return(k)
    else
      if string_literal63(k) and valid_id63(i) then
        return(i)
      else
        if string_literal63(k) then
          return(wrap(k))
        else
          return(wrap(quoted(k)))
        end
      end
    end
  end
  nexus["lumen/lib"].key = key
  local function sortk(l, k)
    return(sort(l, function (a, b)
      return(k(a) < k(b))
    end))
  end
  nexus["lumen/lib"].sortk = sortk
  local function imported(spec, ...)
    local _g95 = unstash({...})
    local all = _g95.all
    local m = make_id()
    local k = module_key(spec)
    local imports = {}
    if nexus[k] then
      local _g96 = module(spec).export
      local n = nil
      for n in next, _g96 do
        if not number63(n) then
          local b = _g96[n]
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
    local _g97 = t
    local k = nil
    for k in next, _g97 do
      if not number63(k) then
        local v = _g97[k]
        local x = f(v)
        if is63(x) then
          add(o, k)
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
    local _g98 = {"table"}
    _g98.alias = quoted(m.alias)
    _g98.export = quote_frame(m.export)
    _g98.import = quoted(m.import)
    return(_g98)
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
  local _g107 = nexus["lumen/runtime"]
  local _37 = _g107["%"]
  local _37message_handler = _g107["%message-handler"]
  local _42 = _g107["*"]
  local _43 = _g107["+"]
  local _ = _g107["-"]
  local _47 = _g107["/"]
  local _60 = _g107["<"]
  local _6061 = _g107["<="]
  local _61 = _g107["="]
  local _62 = _g107[">"]
  local _6261 = _g107[">="]
  local abs = _g107.abs
  local acos = _g107.acos
  local add = _g107.add
  local apply = _g107.apply
  local asin = _g107.asin
  local atan = _g107.atan
  local atan2 = _g107.atan2
  local atom63 = _g107["atom?"]
  local boolean63 = _g107["boolean?"]
  local cat = _g107.cat
  local ceil = _g107.ceil
  local char = _g107.char
  local code = _g107.code
  local composite63 = _g107["composite?"]
  local cos = _g107.cos
  local drop = _g107.drop
  local empty63 = _g107["empty?"]
  local exclude = _g107.exclude
  local exit = _g107.exit
  local extend = _g107.extend
  local find = _g107.find
  local flat = _g107.flat
  local flat1 = _g107.flat1
  local floor = _g107.floor
  local function63 = _g107["function?"]
  local hd = _g107.hd
  local id_literal63 = _g107["id-literal?"]
  local in63 = _g107["in?"]
  local inner = _g107.inner
  local is63 = _g107["is?"]
  local iterate = _g107.iterate
  local join = _g107.join
  local keep = _g107.keep
  local keys63 = _g107["keys?"]
  local last = _g107.last
  local length = _g107.length
  local list63 = _g107["list?"]
  local log = _g107.log
  local log10 = _g107.log10
  local make_id = _g107["make-id"]
  local map = _g107.map
  local max = _g107.max
  local min = _g107.min
  local module = _g107.module
  local module_key = _g107["module-key"]
  local nil63 = _g107["nil?"]
  local none63 = _g107["none?"]
  local now = _g107.now
  local number = _g107.number
  local number63 = _g107["number?"]
  local one63 = _g107["one?"]
  local pair = _g107.pair
  local pow = _g107.pow
  local random = _g107.random
  local read_file = _g107["read-file"]
  local reduce = _g107.reduce
  local replicate = _g107.replicate
  local reverse = _g107.reverse
  local sd = _g107.sd
  local search = _g107.search
  local setenv = _g107.setenv
  local sin = _g107.sin
  local sinh = _g107.sinh
  local some63 = _g107["some?"]
  local sort = _g107.sort
  local space = _g107.space
  local splice = _g107.splice
  local split = _g107.split
  local sqrt = _g107.sqrt
  local stash = _g107.stash
  local string = _g107.string
  local string_literal63 = _g107["string-literal?"]
  local string63 = _g107["string?"]
  local sub = _g107.sub
  local substring = _g107.substring
  local table63 = _g107["table?"]
  local tan = _g107.tan
  local tanh = _g107.tanh
  local td = _g107.td
  local tl = _g107.tl
  local today = _g107.today
  local toplevel63 = _g107["toplevel?"]
  local unstash = _g107.unstash
  local write = _g107.write
  local write_file = _g107["write-file"]
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
  local _g118 = nexus["lumen/runtime"]
  local _37 = _g118["%"]
  local _37message_handler = _g118["%message-handler"]
  local _42 = _g118["*"]
  local _43 = _g118["+"]
  local _ = _g118["-"]
  local _47 = _g118["/"]
  local _60 = _g118["<"]
  local _6061 = _g118["<="]
  local _61 = _g118["="]
  local _62 = _g118[">"]
  local _6261 = _g118[">="]
  local abs = _g118.abs
  local acos = _g118.acos
  local add = _g118.add
  local apply = _g118.apply
  local asin = _g118.asin
  local atan = _g118.atan
  local atan2 = _g118.atan2
  local atom63 = _g118["atom?"]
  local boolean63 = _g118["boolean?"]
  local cat = _g118.cat
  local ceil = _g118.ceil
  local char = _g118.char
  local code = _g118.code
  local composite63 = _g118["composite?"]
  local cos = _g118.cos
  local drop = _g118.drop
  local empty63 = _g118["empty?"]
  local exclude = _g118.exclude
  local exit = _g118.exit
  local extend = _g118.extend
  local find = _g118.find
  local flat = _g118.flat
  local flat1 = _g118.flat1
  local floor = _g118.floor
  local function63 = _g118["function?"]
  local hd = _g118.hd
  local id_literal63 = _g118["id-literal?"]
  local in63 = _g118["in?"]
  local inner = _g118.inner
  local is63 = _g118["is?"]
  local iterate = _g118.iterate
  local join = _g118.join
  local keep = _g118.keep
  local keys63 = _g118["keys?"]
  local last = _g118.last
  local length = _g118.length
  local list63 = _g118["list?"]
  local log = _g118.log
  local log10 = _g118.log10
  local make_id = _g118["make-id"]
  local map = _g118.map
  local max = _g118.max
  local min = _g118.min
  local module = _g118.module
  local module_key = _g118["module-key"]
  local nil63 = _g118["nil?"]
  local none63 = _g118["none?"]
  local now = _g118.now
  local number = _g118.number
  local number63 = _g118["number?"]
  local one63 = _g118["one?"]
  local pair = _g118.pair
  local pow = _g118.pow
  local random = _g118.random
  local read_file = _g118["read-file"]
  local reduce = _g118.reduce
  local replicate = _g118.replicate
  local reverse = _g118.reverse
  local sd = _g118.sd
  local search = _g118.search
  local setenv = _g118.setenv
  local sin = _g118.sin
  local sinh = _g118.sinh
  local some63 = _g118["some?"]
  local sort = _g118.sort
  local space = _g118.space
  local splice = _g118.splice
  local split = _g118.split
  local sqrt = _g118.sqrt
  local stash = _g118.stash
  local string = _g118.string
  local string_literal63 = _g118["string-literal?"]
  local string63 = _g118["string?"]
  local sub = _g118.sub
  local substring = _g118.substring
  local table63 = _g118["table?"]
  local tan = _g118.tan
  local tanh = _g118.tanh
  local td = _g118.td
  local tl = _g118.tl
  local today = _g118.today
  local toplevel63 = _g118["toplevel?"]
  local unstash = _g118.unstash
  local write = _g118.write
  local write_file = _g118["write-file"]
  local _g121 = nexus["lumen/lib"]
  local bind = _g121.bind
  local bind42 = _g121["bind*"]
  local bound63 = _g121["bound?"]
  local getenv = _g121.getenv
  local id = _g121.id
  local imported = _g121.imported
  local indentation = _g121.indentation
  local initial_environment = _g121["initial-environment"]
  local key = _g121.key
  local linked = _g121.linked
  local macro_function = _g121["macro-function"]
  local macro63 = _g121["macro?"]
  local macroexpand = _g121.macroexpand
  local mapo = _g121.mapo
  local quasiexpand = _g121.quasiexpand
  local quote_environment = _g121["quote-environment"]
  local quote_modules = _g121["quote-modules"]
  local quoted = _g121.quoted
  local reserved63 = _g121["reserved?"]
  local sortk = _g121.sortk
  local special_form63 = _g121["special-form?"]
  local special63 = _g121["special?"]
  local stash42 = _g121["stash*"]
  local statement63 = _g121["statement?"]
  local symbol_expansion = _g121["symbol-expansion"]
  local symbol63 = _g121["symbol?"]
  local valid_id63 = _g121["valid-id?"]
  local variable63 = _g121["variable?"]
  local _g122 = nexus["lumen/reader"]
  local make_stream = _g122["make-stream"]
  local read = _g122.read
  local read_all = _g122["read-all"]
  local read_from_string = _g122["read-from-string"]
  local read_table = _g122["read-table"]
  local _g126 = {}
  _g126.js = "!"
  _g126.lua = "not "
  local _g124 = {}
  local _g127 = {}
  _g127.js = "!"
  _g127.lua = "not "
  _g124["not"] = _g127
  local _g129 = {}
  _g129["%"] = true
  _g129["*"] = true
  _g129["/"] = true
  local _g131 = {}
  _g131["+"] = true
  _g131["-"] = true
  local _g135 = {}
  _g135.js = "+"
  _g135.lua = ".."
  local _g133 = {}
  local _g136 = {}
  _g136.js = "+"
  _g136.lua = ".."
  _g133.cat = _g136
  local _g138 = {}
  _g138["<"] = true
  _g138["<="] = true
  _g138[">"] = true
  _g138[">="] = true
  local _g142 = {}
  _g142.js = "==="
  _g142.lua = "=="
  local _g144 = {}
  _g144.js = "!="
  _g144.lua = "~="
  local _g140 = {}
  local _g145 = {}
  _g145.js = "==="
  _g145.lua = "=="
  _g140["="] = _g145
  local _g146 = {}
  _g146.js = "!="
  _g146.lua = "~="
  _g140["~="] = _g146
  local _g150 = {}
  _g150.js = "&&"
  _g150.lua = "and"
  local _g148 = {}
  local _g151 = {}
  _g151.js = "&&"
  _g151.lua = "and"
  _g148["and"] = _g151
  local _g155 = {}
  _g155.js = "||"
  _g155.lua = "or"
  local _g153 = {}
  local _g156 = {}
  _g156.js = "||"
  _g156.lua = "or"
  _g153["or"] = _g156
  local infix = {_g124, _g129, _g131, _g133, _g138, _g140, _g148, _g153}
  nexus["lumen/compiler"].infix = infix
  local function unary63(form)
    local op = form[1]
    local args = sub(form, 1)
    return(one63(args) and in63(op, {"not", "-"}))
  end
  nexus["lumen/compiler"]["unary?"] = unary63
  local function precedence(form)
    if list63(form) and not unary63(form) then
      local _g157 = infix
      local i = 0
      while i < length(_g157) do
        local level = _g157[i + 1]
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
    local _g158 = args
    local i = 0
    while i < length(_g158) do
      local arg = _g158[i + 1]
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
    local _g159 = getenv(x)
    local special = _g159.special
    local stmt = _g159.stmt
    local self_tr63 = _g159.tr
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
    local _g160 = unstash({...})
    local right = _g160.right
    local _g187
    if right then
      _g187 = _6261
    else
      _g187 = _62
    end
    if _g187(precedence(child), precedence(parent)) then
      return({"(", ")"})
    else
      return({"", ""})
    end
  end
  nexus["lumen/compiler"]["op-delims"] = op_delims
  local function compile_infix(form)
    local op = form[1]
    local _g161 = sub(form, 1)
    local a = _g161[1]
    local b = _g161[2]
    local _g162 = op_delims(form, a)
    local ao = _g162[1]
    local ac = _g162[2]
    local _g163 = op_delims(form, b, {_stash = true, right = true})
    local bo = _g163[1]
    local bc = _g163[2]
    local _g164 = compile(a)
    local _g165 = compile(b)
    local _g166 = getop(op)
    if unary63(form) then
      return(_g166 .. ao .. _g164 .. ac)
    else
      return(ao .. _g164 .. ac .. " " .. _g166 .. " " .. bo .. _g165 .. bc)
    end
  end
  nexus["lumen/compiler"]["compile-infix"] = compile_infix
  local function compile_function(args, body, ...)
    local _g167 = unstash({...})
    local name = _g167.name
    local prefix = _g167.prefix
    local _g188
    if name then
      _g188 = compile(name)
    else
      _g188 = ""
    end
    local id = _g188
    local _g168 = prefix or ""
    local _g169 = compile_args(args)
    indent_level = indent_level + 1
    local _g171 = compile(body, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local _g170 = _g171
    local ind = indentation()
    local _g189
    if target == "js" then
      _g189 = ""
    else
      _g189 = "end"
    end
    local tr = _g189
    if name then
      tr = tr .. "\n"
    end
    if target == "js" then
      return("function " .. id .. _g169 .. " {\n" .. _g170 .. ind .. "}" .. tr)
    else
      return(_g168 .. "function " .. id .. _g169 .. "\n" .. _g170 .. ind .. tr)
    end
  end
  nexus["lumen/compiler"]["compile-function"] = compile_function
  local function can_return63(form)
    return(is63(form) and (atom63(form) or not (hd(form) == "return") and not statement63(hd(form))))
  end
  nexus["lumen/compiler"]["can-return?"] = can_return63
  compile = function (form, ...)
    local _g172 = unstash({...})
    local stmt = _g172.stmt
    if nil63(form) then
      return("")
    else
      if special_form63(form) then
        return(compile_special(form, stmt))
      else
        local tr = terminator(stmt)
        local _g190
        if stmt then
          _g190 = indentation()
        else
          _g190 = ""
        end
        local ind = _g190
        local _g191
        if atom63(form) then
          _g191 = compile_atom(form)
        else
          local _g192
          if infix63(hd(form)) then
            _g192 = compile_infix(form)
          else
            _g192 = compile_call(form)
          end
          _g191 = _g192
        end
        local _g173 = _g191
        return(ind .. _g173 .. tr)
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
    local _g174 = sub(args, 0, length(args) - 1)
    local _g175 = 0
    while _g175 < length(_g174) do
      local x = _g174[_g175 + 1]
      add(hoist, lower(x, hoist, stmt63))
      _g175 = _g175 + 1
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
    local _g176 = args[2]
    local _g177 = args[3]
    if stmt63 or tail63 then
      local _g194
      if _g177 then
        _g194 = {lower_body({_g177}, tail63)}
      end
      return(add(hoist, join({"%if", lower(cond, hoist), lower_body({_g176}, tail63)}, _g194)))
    else
      local e = make_id()
      add(hoist, {"%local", e})
      local _g193
      if _g177 then
        _g193 = {lower({"set", e, _g177})}
      end
      add(hoist, join({"%if", lower(cond, hoist), lower({"set", e, _g176})}, _g193))
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
      local _g195
      if x == "and" then
        _g195 = {"%if", id, b, id}
      else
        _g195 = {"%if", id, id, b}
      end
      return(lower({"do", {"%local", id, a}, _g195}, hoist))
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
    local _g178 = args[2]
    local body = sub(args, 2)
    return(add(hoist, {kind, name, _g178, lower_body(body, true)}))
  end
  nexus["lumen/compiler"]["lower-definition"] = lower_definition
  local function lower_call(form, hoist)
    local _g179 = map(function (x)
      return(lower(x, hoist))
    end, form)
    if some63(_g179) then
      return(_g179)
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
    local _g180 = unstash({...})
    local all = _g180.all
    local m = module(spec)
    local frame = last(environment)
    local _g181 = m.export
    local k = nil
    for k in next, _g181 do
      if not number63(k) then
        local v = _g181[k]
        if v.export or all then
          frame[k] = v
        end
      end
    end
  end
  nexus["lumen/compiler"]["open-module"] = open_module
  local function load_module(spec, ...)
    local _g182 = unstash({...})
    local all = _g182.all
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
    local _g183 = specs or {}
    local _g184 = 0
    while _g184 < length(_g183) do
      local spec = _g183[_g184 + 1]
      load_module(spec)
      local m = module(spec)
      if m.alias then
        local _g185 = import_modules(m.alias)
        local aliased = _g185[1]
        local bs = _g185[2]
        imports = join(imports, aliased)
        bindings = join(bindings, bs)
      else
        local _g186 = imported(spec)
        add(imports, spec)
        bindings = join(bindings, _g186)
      end
      _g184 = _g184 + 1
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
  local _g196 = nexus["lumen/runtime"]
  local _37 = _g196["%"]
  local _37message_handler = _g196["%message-handler"]
  local _42 = _g196["*"]
  local _43 = _g196["+"]
  local _ = _g196["-"]
  local _47 = _g196["/"]
  local _60 = _g196["<"]
  local _6061 = _g196["<="]
  local _61 = _g196["="]
  local _62 = _g196[">"]
  local _6261 = _g196[">="]
  local abs = _g196.abs
  local acos = _g196.acos
  local add = _g196.add
  local apply = _g196.apply
  local asin = _g196.asin
  local atan = _g196.atan
  local atan2 = _g196.atan2
  local atom63 = _g196["atom?"]
  local boolean63 = _g196["boolean?"]
  local cat = _g196.cat
  local ceil = _g196.ceil
  local char = _g196.char
  local code = _g196.code
  local composite63 = _g196["composite?"]
  local cos = _g196.cos
  local drop = _g196.drop
  local empty63 = _g196["empty?"]
  local exclude = _g196.exclude
  local exit = _g196.exit
  local extend = _g196.extend
  local find = _g196.find
  local flat = _g196.flat
  local flat1 = _g196.flat1
  local floor = _g196.floor
  local function63 = _g196["function?"]
  local hd = _g196.hd
  local id_literal63 = _g196["id-literal?"]
  local in63 = _g196["in?"]
  local inner = _g196.inner
  local is63 = _g196["is?"]
  local iterate = _g196.iterate
  local join = _g196.join
  local keep = _g196.keep
  local keys63 = _g196["keys?"]
  local last = _g196.last
  local length = _g196.length
  local list63 = _g196["list?"]
  local log = _g196.log
  local log10 = _g196.log10
  local make_id = _g196["make-id"]
  local map = _g196.map
  local max = _g196.max
  local min = _g196.min
  local module = _g196.module
  local module_key = _g196["module-key"]
  local nil63 = _g196["nil?"]
  local none63 = _g196["none?"]
  local now = _g196.now
  local number = _g196.number
  local number63 = _g196["number?"]
  local one63 = _g196["one?"]
  local pair = _g196.pair
  local pow = _g196.pow
  local random = _g196.random
  local read_file = _g196["read-file"]
  local reduce = _g196.reduce
  local replicate = _g196.replicate
  local reverse = _g196.reverse
  local sd = _g196.sd
  local search = _g196.search
  local setenv = _g196.setenv
  local sin = _g196.sin
  local sinh = _g196.sinh
  local some63 = _g196["some?"]
  local sort = _g196.sort
  local space = _g196.space
  local splice = _g196.splice
  local split = _g196.split
  local sqrt = _g196.sqrt
  local stash = _g196.stash
  local string = _g196.string
  local string_literal63 = _g196["string-literal?"]
  local string63 = _g196["string?"]
  local sub = _g196.sub
  local substring = _g196.substring
  local table63 = _g196["table?"]
  local tan = _g196.tan
  local tanh = _g196.tanh
  local td = _g196.td
  local tl = _g196.tl
  local today = _g196.today
  local toplevel63 = _g196["toplevel?"]
  local unstash = _g196.unstash
  local write = _g196.write
  local write_file = _g196["write-file"]
  local _g199 = nexus["lumen/lib"]
  local bind = _g199.bind
  local bind42 = _g199["bind*"]
  local bound63 = _g199["bound?"]
  local getenv = _g199.getenv
  local id = _g199.id
  local imported = _g199.imported
  local indentation = _g199.indentation
  local initial_environment = _g199["initial-environment"]
  local key = _g199.key
  local linked = _g199.linked
  local macro_function = _g199["macro-function"]
  local macro63 = _g199["macro?"]
  local macroexpand = _g199.macroexpand
  local mapo = _g199.mapo
  local quasiexpand = _g199.quasiexpand
  local quote_environment = _g199["quote-environment"]
  local quote_modules = _g199["quote-modules"]
  local quoted = _g199.quoted
  local reserved63 = _g199["reserved?"]
  local sortk = _g199.sortk
  local special_form63 = _g199["special-form?"]
  local special63 = _g199["special?"]
  local stash42 = _g199["stash*"]
  local statement63 = _g199["statement?"]
  local symbol_expansion = _g199["symbol-expansion"]
  local symbol63 = _g199["symbol?"]
  local valid_id63 = _g199["valid-id?"]
  local variable63 = _g199["variable?"]
  local _g200 = nexus["lumen/compiler"]
  local compile = _g200.compile
  local compile_function = _g200["compile-function"]
  local compile_module = _g200["compile-module"]
  local declare = _g200.declare
  local eval = _g200.eval
  local import_modules = _g200["import-modules"]
  local in_module = _g200["in-module"]
  local load_module = _g200["load-module"]
  local open_module = _g200["open-module"]
end)();
(function ()
  nexus["lumen/core"] = {}
  local _g374 = nexus["lumen/runtime"]
  local _37 = _g374["%"]
  local _37message_handler = _g374["%message-handler"]
  local _42 = _g374["*"]
  local _43 = _g374["+"]
  local _ = _g374["-"]
  local _47 = _g374["/"]
  local _60 = _g374["<"]
  local _6061 = _g374["<="]
  local _61 = _g374["="]
  local _62 = _g374[">"]
  local _6261 = _g374[">="]
  local abs = _g374.abs
  local acos = _g374.acos
  local add = _g374.add
  local apply = _g374.apply
  local asin = _g374.asin
  local atan = _g374.atan
  local atan2 = _g374.atan2
  local atom63 = _g374["atom?"]
  local boolean63 = _g374["boolean?"]
  local cat = _g374.cat
  local ceil = _g374.ceil
  local char = _g374.char
  local code = _g374.code
  local composite63 = _g374["composite?"]
  local cos = _g374.cos
  local drop = _g374.drop
  local empty63 = _g374["empty?"]
  local exclude = _g374.exclude
  local exit = _g374.exit
  local extend = _g374.extend
  local find = _g374.find
  local flat = _g374.flat
  local flat1 = _g374.flat1
  local floor = _g374.floor
  local function63 = _g374["function?"]
  local hd = _g374.hd
  local id_literal63 = _g374["id-literal?"]
  local in63 = _g374["in?"]
  local inner = _g374.inner
  local is63 = _g374["is?"]
  local iterate = _g374.iterate
  local join = _g374.join
  local keep = _g374.keep
  local keys63 = _g374["keys?"]
  local last = _g374.last
  local length = _g374.length
  local list63 = _g374["list?"]
  local log = _g374.log
  local log10 = _g374.log10
  local make_id = _g374["make-id"]
  local map = _g374.map
  local max = _g374.max
  local min = _g374.min
  local module = _g374.module
  local module_key = _g374["module-key"]
  local nil63 = _g374["nil?"]
  local none63 = _g374["none?"]
  local now = _g374.now
  local number = _g374.number
  local number63 = _g374["number?"]
  local one63 = _g374["one?"]
  local pair = _g374.pair
  local pow = _g374.pow
  local random = _g374.random
  local read_file = _g374["read-file"]
  local reduce = _g374.reduce
  local replicate = _g374.replicate
  local reverse = _g374.reverse
  local sd = _g374.sd
  local search = _g374.search
  local setenv = _g374.setenv
  local sin = _g374.sin
  local sinh = _g374.sinh
  local some63 = _g374["some?"]
  local sort = _g374.sort
  local space = _g374.space
  local splice = _g374.splice
  local split = _g374.split
  local sqrt = _g374.sqrt
  local stash = _g374.stash
  local string = _g374.string
  local string_literal63 = _g374["string-literal?"]
  local string63 = _g374["string?"]
  local sub = _g374.sub
  local substring = _g374.substring
  local table63 = _g374["table?"]
  local tan = _g374.tan
  local tanh = _g374.tanh
  local td = _g374.td
  local tl = _g374.tl
  local today = _g374.today
  local toplevel63 = _g374["toplevel?"]
  local unstash = _g374.unstash
  local write = _g374.write
  local write_file = _g374["write-file"]
  local _g377 = nexus["lumen/lib"]
  local bind = _g377.bind
  local bind42 = _g377["bind*"]
  local bound63 = _g377["bound?"]
  local getenv = _g377.getenv
  local id = _g377.id
  local imported = _g377.imported
  local indentation = _g377.indentation
  local initial_environment = _g377["initial-environment"]
  local key = _g377.key
  local linked = _g377.linked
  local macro_function = _g377["macro-function"]
  local macro63 = _g377["macro?"]
  local macroexpand = _g377.macroexpand
  local mapo = _g377.mapo
  local quasiexpand = _g377.quasiexpand
  local quote_environment = _g377["quote-environment"]
  local quote_modules = _g377["quote-modules"]
  local quoted = _g377.quoted
  local reserved63 = _g377["reserved?"]
  local sortk = _g377.sortk
  local special_form63 = _g377["special-form?"]
  local special63 = _g377["special?"]
  local stash42 = _g377["stash*"]
  local statement63 = _g377["statement?"]
  local symbol_expansion = _g377["symbol-expansion"]
  local symbol63 = _g377["symbol?"]
  local valid_id63 = _g377["valid-id?"]
  local variable63 = _g377["variable?"]
  local _g378 = nexus["lumen/compiler"]
  local compile = _g378.compile
  local compile_function = _g378["compile-function"]
  local compile_module = _g378["compile-module"]
  local declare = _g378.declare
  local eval = _g378.eval
  local import_modules = _g378["import-modules"]
  local in_module = _g378["in-module"]
  local load_module = _g378["load-module"]
  local open_module = _g378["open-module"]
  target = "lua"
end)();
(function ()
  nexus["lumen/boot"] = {}
  local _g691 = nexus["lumen/runtime"]
  local _37 = _g691["%"]
  local _37message_handler = _g691["%message-handler"]
  local _42 = _g691["*"]
  local _43 = _g691["+"]
  local _ = _g691["-"]
  local _47 = _g691["/"]
  local _60 = _g691["<"]
  local _6061 = _g691["<="]
  local _61 = _g691["="]
  local _62 = _g691[">"]
  local _6261 = _g691[">="]
  local abs = _g691.abs
  local acos = _g691.acos
  local add = _g691.add
  local apply = _g691.apply
  local asin = _g691.asin
  local atan = _g691.atan
  local atan2 = _g691.atan2
  local atom63 = _g691["atom?"]
  local boolean63 = _g691["boolean?"]
  local cat = _g691.cat
  local ceil = _g691.ceil
  local char = _g691.char
  local code = _g691.code
  local composite63 = _g691["composite?"]
  local cos = _g691.cos
  local drop = _g691.drop
  local empty63 = _g691["empty?"]
  local exclude = _g691.exclude
  local exit = _g691.exit
  local extend = _g691.extend
  local find = _g691.find
  local flat = _g691.flat
  local flat1 = _g691.flat1
  local floor = _g691.floor
  local function63 = _g691["function?"]
  local hd = _g691.hd
  local id_literal63 = _g691["id-literal?"]
  local in63 = _g691["in?"]
  local inner = _g691.inner
  local is63 = _g691["is?"]
  local iterate = _g691.iterate
  local join = _g691.join
  local keep = _g691.keep
  local keys63 = _g691["keys?"]
  local last = _g691.last
  local length = _g691.length
  local list63 = _g691["list?"]
  local log = _g691.log
  local log10 = _g691.log10
  local make_id = _g691["make-id"]
  local map = _g691.map
  local max = _g691.max
  local min = _g691.min
  local module = _g691.module
  local module_key = _g691["module-key"]
  local nil63 = _g691["nil?"]
  local none63 = _g691["none?"]
  local now = _g691.now
  local number = _g691.number
  local number63 = _g691["number?"]
  local one63 = _g691["one?"]
  local pair = _g691.pair
  local pow = _g691.pow
  local random = _g691.random
  local read_file = _g691["read-file"]
  local reduce = _g691.reduce
  local replicate = _g691.replicate
  local reverse = _g691.reverse
  local sd = _g691.sd
  local search = _g691.search
  local setenv = _g691.setenv
  local sin = _g691.sin
  local sinh = _g691.sinh
  local some63 = _g691["some?"]
  local sort = _g691.sort
  local space = _g691.space
  local splice = _g691.splice
  local split = _g691.split
  local sqrt = _g691.sqrt
  local stash = _g691.stash
  local string = _g691.string
  local string_literal63 = _g691["string-literal?"]
  local string63 = _g691["string?"]
  local sub = _g691.sub
  local substring = _g691.substring
  local table63 = _g691["table?"]
  local tan = _g691.tan
  local tanh = _g691.tanh
  local td = _g691.td
  local tl = _g691.tl
  local today = _g691.today
  local toplevel63 = _g691["toplevel?"]
  local unstash = _g691.unstash
  local write = _g691.write
  local write_file = _g691["write-file"]
  local _g694 = nexus["lumen/lib"]
  local bind = _g694.bind
  local bind42 = _g694["bind*"]
  local bound63 = _g694["bound?"]
  local getenv = _g694.getenv
  local id = _g694.id
  local imported = _g694.imported
  local indentation = _g694.indentation
  local initial_environment = _g694["initial-environment"]
  local key = _g694.key
  local linked = _g694.linked
  local macro_function = _g694["macro-function"]
  local macro63 = _g694["macro?"]
  local macroexpand = _g694.macroexpand
  local mapo = _g694.mapo
  local quasiexpand = _g694.quasiexpand
  local quote_environment = _g694["quote-environment"]
  local quote_modules = _g694["quote-modules"]
  local quoted = _g694.quoted
  local reserved63 = _g694["reserved?"]
  local sortk = _g694.sortk
  local special_form63 = _g694["special-form?"]
  local special63 = _g694["special?"]
  local stash42 = _g694["stash*"]
  local statement63 = _g694["statement?"]
  local symbol_expansion = _g694["symbol-expansion"]
  local symbol63 = _g694["symbol?"]
  local valid_id63 = _g694["valid-id?"]
  local variable63 = _g694["variable?"]
  local _g695 = nexus["lumen/compiler"]
  local compile = _g695.compile
  local compile_function = _g695["compile-function"]
  local compile_module = _g695["compile-module"]
  local declare = _g695.declare
  local eval = _g695.eval
  local import_modules = _g695["import-modules"]
  local in_module = _g695["in-module"]
  local load_module = _g695["load-module"]
  local open_module = _g695["open-module"]
  modules = {lumen = {alias = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}}, export = {}, import = {{"lumen", "special"}}}, ["lumen/boot"] = {export = {["%initial-environment"] = {macro = function ()
    return(quote_environment(initial_environment()))
  end}, ["%initial-modules"] = {macro = function ()
    return(quote_modules())
  end}, modules = {export = true, global = true}}, import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}, {"lumen", "lib"}, {"lumen", "compiler"}}}, ["lumen/compiler"] = {export = {["%compile-module"] = {variable = true}, ["%result"] = {export = true, global = true}, ["can-return?"] = {variable = true}, compile = {export = true, variable = true}, ["compile-args"] = {variable = true}, ["compile-atom"] = {variable = true}, ["compile-call"] = {variable = true}, ["compile-file"] = {variable = true}, ["compile-function"] = {export = true, variable = true}, ["compile-infix"] = {variable = true}, ["compile-module"] = {export = true, variable = true}, ["compile-special"] = {variable = true}, ["compiler-output"] = {variable = true}, ["compiling?"] = {variable = true}, conclude = {variable = true}, ["current-module"] = {export = true, global = true}, declare = {export = true, variable = true}, encapsulate = {variable = true}, eval = {export = true, variable = true}, getop = {variable = true}, ["import-modules"] = {export = true, variable = true}, ["in-module"] = {export = true, variable = true}, infix = {variable = true}, ["infix?"] = {variable = true}, ["load-module"] = {export = true, variable = true}, lower = {variable = true}, ["lower-body"] = {variable = true}, ["lower-call"] = {variable = true}, ["lower-definition"] = {variable = true}, ["lower-do"] = {variable = true}, ["lower-for"] = {variable = true}, ["lower-function"] = {variable = true}, ["lower-if"] = {variable = true}, ["lower-infix"] = {variable = true}, ["lower-infix?"] = {variable = true}, ["lower-short"] = {variable = true}, ["lower-special"] = {variable = true}, ["lower-statement"] = {variable = true}, ["lower-try"] = {variable = true}, ["lower-while"] = {variable = true}, ["module-path"] = {variable = true}, ["op-delims"] = {variable = true}, ["open-module"] = {export = true, variable = true}, ["parenthesize-call?"] = {variable = true}, precedence = {variable = true}, process = {variable = true}, reimported = {variable = true}, run = {variable = true}, terminator = {variable = true}, ["unary?"] = {variable = true}}, import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}, {"lumen", "lib"}, {"lumen", "reader"}}}, ["lumen/core"] = {export = {at = {export = true, macro = function (l, i)
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
    local _g753 = sub(bs, 0)
    return({"set", a, join({"cat", a}, _g753)})
  end}, dec = {export = true, macro = function (n, by)
    return({"set", n, {"-", n, by or 1}})
  end}, define = {export = true, macro = function (name, x, ...)
    local body = unstash({...})
    local _g732 = sub(body, 0)
    setenv(name, {_stash = true, variable = true})
    if some63(_g732) and target == "js" then
      return(linked(name, {"%local", name, join({"fn", x}, _g732)}))
    else
      if some63(_g732) then
        local _g733 = bind42(x, _g732)
        local args = _g733[1]
        local _g734 = _g733[2]
        return(linked(name, join({"%local-function", name, args}, _g734)))
      else
        return(linked(name, {"%local", name, x}))
      end
    end
  end}, ["define*"] = {export = true, macro = function (name, x, ...)
    local body = unstash({...})
    local _g729 = sub(body, 0)
    setenv(name, {_stash = true, export = true, global = true})
    if some63(_g729) then
      local _g730 = bind42(x, _g729)
      local args = _g730[1]
      local _g731 = _g730[2]
      return(join({"%global-function", name, args}, _g731))
    else
      if target == "js" then
        return({"set", {"get", "global", {"quote", id(name)}}, x})
      else
        return({"set", name, x})
      end
    end
  end}, ["define-macro"] = {export = true, macro = function (name, args, ...)
    local body = unstash({...})
    local _g725 = sub(body, 0)
    local form = join({"fn", args}, _g725)
    local _g726 = {"setenv", {"quote", name}}
    _g726.form = {"quote", form}
    _g726.macro = form
    eval(_g726)
    return(nil)
  end}, ["define-module"] = {export = true, macro = function (spec, ...)
    local body = unstash({...})
    local _g721 = sub(body, 0)
    local alias = _g721.alias
    local exp = _g721.export
    local imp = _g721.import
    local _g722 = import_modules(imp)
    local imports = _g722[1]
    local bindings = _g722[2]
    local k = module_key(spec)
    modules[k] = {alias = alias, export = {}, import = imports}
    local _g723 = exp or {}
    local _g724 = 0
    while _g724 < length(_g723) do
      local x = _g723[_g724 + 1]
      setenv(x, {_stash = true, export = true})
      _g724 = _g724 + 1
    end
    return(join({"do", {"set", {"get", "nexus", {"quote", k}}, {"table"}}}, bindings))
  end}, ["define-special"] = {export = true, macro = function (name, args, ...)
    local body = unstash({...})
    local _g727 = sub(body, 0)
    local form = join({"fn", args}, _g727)
    local keys = sub(_g727, length(_g727))
    local _g728 = {"setenv", {"quote", name}}
    _g728.form = {"quote", form}
    _g728.special = form
    eval(join(_g728, keys))
    return(nil)
  end}, ["define-symbol"] = {export = true, macro = function (name, expansion)
    setenv(name, {_stash = true, symbol = expansion})
    return(nil)
  end}, each = {export = true, macro = function (b, t, ...)
    local body = unstash({...})
    local _g748 = sub(body, 0)
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
      _g782 = {"let", {i, 0}, {"while", {"<", i, {"length", t1}}, join({"let", {k, {"at", t1, i}}}, _g748), {"inc", i}}}
    else
      local _g749 = {"target"}
      _g749.js = {"nil?", {"number", k}}
      _g749.lua = {"not", {"number?", k}}
      _g782 = {"let", {k, "nil"}, {"%for", t1, k, {"when", _g749, join({"let", {v, {"get", t1, k}}}, _g748)}}}
    end
    return({"let", {t1, t}, _g782})
  end}, fn = {export = true, macro = function (args, ...)
    local body = unstash({...})
    local _g744 = sub(body, 0)
    local _g745 = bind42(args, _g744)
    local _g746 = _g745[1]
    local _g747 = _g745[2]
    return(join({"%function", _g746}, _g747))
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
    local function step(_g709)
      local a = _g709[1]
      local b = _g709[2]
      local c = sub(_g709, 2)
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
    local _g752 = sub(bs, 0)
    return({"set", a, join({"join*", a}, _g752)})
  end}, ["join*"] = {export = true, macro = function (...)
    local xs = unstash({...})
    return(reduce(function (a, b)
      return({"join", a, b})
    end, xs))
  end}, language = {export = true, macro = function ()
    return({"quote", target})
  end}, let = {export = true, macro = function (bindings, ...)
    local body = unstash({...})
    local _g716 = sub(body, 0)
    local i = 0
    local renames = {}
    local locals = {}
    map(function (_g717)
      local lh = _g717[1]
      local rh = _g717[2]
      local _g718 = bind(lh, rh)
      local _g719 = 0
      while _g719 < length(_g718) do
        local _g720 = _g718[_g719 + 1]
        local id = _g720[1]
        local val = _g720[2]
        if bound63(id) or reserved63(id) or toplevel63() then
          local rename = make_id()
          add(renames, id)
          add(renames, rename)
          id = rename
        else
          setenv(id, {_stash = true, variable = true})
        end
        add(locals, {"%local", id, val})
        _g719 = _g719 + 1
      end
    end, pair(bindings))
    return(join({"do"}, join(locals, {join({"let-symbol", renames}, _g716)})))
  end}, ["let*"] = {export = true, macro = function (bindings, ...)
    local body = unstash({...})
    local _g712 = sub(body, 0)
    if length(bindings) < 2 then
      return(join({"do"}, _g712))
    else
      local renames = {}
      local locals = {}
      local lh = bindings[1]
      local rh = bindings[2]
      local _g713 = bind(lh, rh)
      local _g714 = 0
      while _g714 < length(_g713) do
        local _g715 = _g713[_g714 + 1]
        local id = _g715[1]
        local val = _g715[2]
        if bound63(id) or reserved63(id) or toplevel63() then
          local id1 = make_id()
          add(renames, id)
          add(renames, id1)
          id = id1
        else
          setenv(id, {_stash = true, variable = true})
        end
        add(locals, {"%local", id, val})
        _g714 = _g714 + 1
      end
      return(join({"do"}, join(locals, {{"let-symbol", renames, join({"let*", sub(bindings, 2)}, _g712)}})))
    end
  end}, ["let-macro"] = {export = true, macro = function (definitions, ...)
    local body = unstash({...})
    local _g739 = sub(body, 0)
    add(environment, {})
    map(function (m)
      return(macroexpand(join({"define-macro"}, m)))
    end, definitions)
    local _g740 = join({"do"}, macroexpand(_g739))
    drop(environment)
    return(_g740)
  end}, ["let-symbol"] = {export = true, macro = function (expansions, ...)
    local body = unstash({...})
    local _g741 = sub(body, 0)
    add(environment, {})
    map(function (_g743)
      local name = _g743[1]
      local exp = _g743[2]
      return(macroexpand({"define-symbol", name, exp}))
    end, pair(expansions))
    local _g742 = join({"do"}, macroexpand(_g741))
    drop(environment)
    return(_g742)
  end}, list = {export = true, macro = function (...)
    local body = unstash({...})
    local l = join({"%array"}, body)
    if not keys63(body) then
      return(l)
    else
      local id = make_id()
      local init = {}
      local _g708 = body
      local k = nil
      for k in next, _g708 do
        if not number63(k) then
          local v = _g708[k]
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
    local xs = unstash({...})
    local l = {}
    local _g750 = xs
    local _g751 = 0
    while _g751 < length(_g750) do
      local x = _g750[_g751 + 1]
      l[x] = true
      _g751 = _g751 + 1
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
    local _g711 = sub(body, 0)
    return({"if", {"not", cond}, join({"do"}, _g711)})
  end}, when = {export = true, macro = function (cond, ...)
    local body = unstash({...})
    local _g710 = sub(body, 0)
    return({"if", cond, join({"do"}, _g710)})
  end}, ["with-bindings"] = {export = true, macro = function (_g735, ...)
    local names = _g735[1]
    local body = unstash({...})
    local _g736 = sub(body, 0)
    local x = make_id()
    local _g738 = {"setenv", x}
    _g738.variable = true
    local _g737 = {"with-frame", {"each", {x}, names, _g738}}
    _g737.scope = true
    return(join(_g737, _g736))
  end}, ["with-frame"] = {export = true, macro = function (...)
    local body = unstash({...})
    local _g754 = sub(body, 0)
    local scope = body.scope
    local x = make_id()
    local _g755 = {"table"}
    _g755._scope = scope
    return({"do", {"add", "environment", _g755}, {"let", {x, join({"do"}, _g754)}, {"drop", "environment"}, x}})
  end}}, import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}, {"lumen", "lib"}, {"lumen", "compiler"}}}, ["lumen/lib"] = {export = {bind = {export = true, variable = true}, ["bind*"] = {export = true, variable = true}, ["bound?"] = {export = true, variable = true}, ["can-unquote?"] = {variable = true}, escape = {variable = true}, getenv = {export = true, variable = true}, ["global?"] = {variable = true}, id = {export = true, variable = true}, imported = {export = true, variable = true}, ["indent-level"] = {export = true, global = true}, indentation = {export = true, variable = true}, ["initial-environment"] = {export = true, variable = true}, key = {export = true, variable = true}, linked = {export = true, variable = true}, ["macro-function"] = {export = true, variable = true}, ["macro?"] = {export = true, variable = true}, macroexpand = {export = true, variable = true}, mapo = {export = true, variable = true}, ["numeric?"] = {variable = true}, quasiexpand = {export = true, variable = true}, ["quasiquote-list"] = {variable = true}, ["quasiquoting?"] = {variable = true}, ["quasisplice?"] = {variable = true}, ["quote-binding"] = {variable = true}, ["quote-environment"] = {export = true, variable = true}, ["quote-frame"] = {variable = true}, ["quote-module"] = {variable = true}, ["quote-modules"] = {export = true, variable = true}, quoted = {export = true, variable = true}, ["quoting?"] = {variable = true}, reserved = {variable = true}, ["reserved?"] = {export = true, variable = true}, sortk = {export = true, variable = true}, ["special-form?"] = {export = true, variable = true}, ["special?"] = {export = true, variable = true}, ["stash*"] = {export = true, variable = true}, ["statement?"] = {export = true, variable = true}, ["symbol-expansion"] = {export = true, variable = true}, ["symbol?"] = {export = true, variable = true}, ["valid-char?"] = {variable = true}, ["valid-id?"] = {export = true, variable = true}, ["variable?"] = {export = true, variable = true}, ["with-indent"] = {export = true, macro = function (form)
    local result = make_id()
    return({"do", {"inc", "indent-level"}, {"let", {result, form}, {"dec", "indent-level"}, result}})
  end}}, import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}}}, ["lumen/main"] = {export = {}, import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}, {"lumen", "reader"}, {"lumen", "compiler"}}}, ["lumen/reader"] = {export = {["define-reader"] = {export = true, macro = function (_g756, ...)
    local char = _g756[1]
    local stream = _g756[2]
    local body = unstash({...})
    local _g757 = sub(body, 0)
    return({"set", {"get", "read-table", char}, join({"fn", {stream}}, _g757)})
  end}, delimiters = {variable = true}, eof = {variable = true}, ["flag?"] = {variable = true}, ["key?"] = {variable = true}, ["make-stream"] = {export = true, variable = true}, ["peek-char"] = {variable = true}, read = {export = true, variable = true}, ["read-all"] = {export = true, variable = true}, ["read-char"] = {variable = true}, ["read-from-string"] = {export = true, variable = true}, ["read-table"] = {export = true, variable = true}, ["skip-non-code"] = {variable = true}, whitespace = {variable = true}}, import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}}}, ["lumen/runtime"] = {export = {["%"] = {export = true, variable = true}, ["%message-handler"] = {export = true, variable = true}, ["*"] = {export = true, variable = true}, ["+"] = {export = true, variable = true}, ["-"] = {export = true, variable = true}, ["/"] = {export = true, variable = true}, ["<"] = {export = true, variable = true}, ["<="] = {export = true, variable = true}, ["="] = {export = true, variable = true}, [">"] = {export = true, variable = true}, [">="] = {export = true, variable = true}, abs = {export = true, variable = true}, acos = {export = true, variable = true}, add = {export = true, variable = true}, apply = {export = true, variable = true}, asin = {export = true, variable = true}, atan = {export = true, variable = true}, atan2 = {export = true, variable = true}, ["atom?"] = {export = true, variable = true}, ["boolean?"] = {export = true, variable = true}, cat = {export = true, variable = true}, ceil = {export = true, variable = true}, char = {export = true, variable = true}, code = {export = true, variable = true}, ["composite?"] = {export = true, variable = true}, cos = {export = true, variable = true}, drop = {export = true, variable = true}, ["empty?"] = {export = true, variable = true}, exclude = {export = true, variable = true}, exit = {export = true, variable = true}, extend = {export = true, variable = true}, find = {export = true, variable = true}, flat = {export = true, variable = true}, flat1 = {export = true, variable = true}, floor = {export = true, variable = true}, ["function?"] = {export = true, variable = true}, hd = {export = true, variable = true}, ["id-count"] = {variable = true}, ["id-literal?"] = {export = true, variable = true}, ["in?"] = {export = true, variable = true}, inner = {export = true, variable = true}, ["is?"] = {export = true, variable = true}, iterate = {export = true, variable = true}, join = {export = true, variable = true}, keep = {export = true, variable = true}, ["keys?"] = {export = true, variable = true}, last = {export = true, variable = true}, length = {export = true, variable = true}, ["list?"] = {export = true, variable = true}, log = {export = true, variable = true}, log10 = {export = true, variable = true}, ["make-id"] = {export = true, variable = true}, map = {export = true, variable = true}, mapl = {variable = true}, math = {variable = true}, max = {export = true, variable = true}, ["max*"] = {variable = true}, min = {export = true, variable = true}, ["min*"] = {variable = true}, module = {export = true, variable = true}, ["module-key"] = {export = true, variable = true}, ["nil?"] = {export = true, variable = true}, ["none?"] = {export = true, variable = true}, now = {export = true, variable = true}, number = {export = true, variable = true}, ["number?"] = {export = true, variable = true}, ["one?"] = {export = true, variable = true}, pair = {export = true, variable = true}, pow = {export = true, variable = true}, random = {export = true, variable = true}, ["read-file"] = {export = true, variable = true}, reduce = {export = true, variable = true}, replicate = {export = true, variable = true}, reverse = {export = true, variable = true}, sd = {export = true, variable = true}, search = {export = true, variable = true}, setenv = {export = true, variable = true}, sin = {export = true, variable = true}, sinh = {export = true, variable = true}, ["some?"] = {export = true, variable = true}, sort = {export = true, variable = true}, space = {export = true, variable = true}, splice = {export = true, variable = true}, ["splice?"] = {variable = true}, split = {export = true, variable = true}, sqrt = {export = true, variable = true}, stash = {export = true, variable = true}, string = {export = true, variable = true}, ["string-literal?"] = {export = true, variable = true}, ["string?"] = {export = true, variable = true}, sub = {export = true, variable = true}, subl = {variable = true}, substring = {export = true, variable = true}, ["table?"] = {export = true, variable = true}, tan = {export = true, variable = true}, tanh = {export = true, variable = true}, td = {export = true, variable = true}, tl = {export = true, variable = true}, today = {export = true, variable = true}, ["toplevel?"] = {export = true, variable = true}, unstash = {export = true, variable = true}, write = {export = true, variable = true}, ["write-file"] = {export = true, variable = true}}, import = {{"lumen", "special"}, {"lumen", "core"}}}, ["lumen/special"] = {export = {["%array"] = {export = true, foo = true, special = function (...)
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
    local _g775 = forms
    local i = 0
    while i < length(_g775) do
      local x = _g775[i + 1]
      str = str .. compile(x)
      if i < length(forms) - 1 then
        str = str .. ", "
      end
      i = i + 1
    end
    return(open .. str .. close)
  end}, ["%for"] = {export = true, foo = true, special = function (t, k, form)
    local _g767 = compile(t)
    local ind = indentation()
    indent_level = indent_level + 1
    local _g768 = compile(form, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local body = _g768
    if target == "lua" then
      return(ind .. "for " .. k .. " in next, " .. _g767 .. " do\n" .. body .. ind .. "end\n")
    else
      return(ind .. "for (" .. k .. " in " .. _g767 .. ") {\n" .. body .. ind .. "}\n")
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
    local _g760 = compile(cond)
    indent_level = indent_level + 1
    local _g763 = compile(cons, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local _g761 = _g763
    local _g784
    if alt then
      indent_level = indent_level + 1
      local _g764 = compile(alt, {_stash = true, stmt = true})
      indent_level = indent_level - 1
      _g784 = _g764
    end
    local _g762 = _g784
    local ind = indentation()
    local str = ""
    if target == "js" then
      str = str .. ind .. "if (" .. _g760 .. ") {\n" .. _g761 .. ind .. "}"
    else
      str = str .. ind .. "if " .. _g760 .. " then\n" .. _g761
    end
    if _g762 and target == "js" then
      str = str .. " else {\n" .. _g762 .. ind .. "}"
    else
      if _g762 then
        str = str .. ind .. "else\n" .. _g762
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
  end, stmt = true}, ["%local-function"] = {export = true, foo = true, special = function (name, args, body)
    local x = compile_function(args, body, {_stash = true, name = name, prefix = "local "})
    return(indentation() .. x)
  end, stmt = true, tr = true}, ["%object"] = {export = true, foo = true, special = function (...)
    local forms = unstash({...})
    local str = "{"
    local _g792
    if target == "lua" then
      _g792 = " = "
    else
      _g792 = ": "
    end
    local sep = _g792
    local pairs = sortk(pair(forms), hd)
    local _g776 = pairs
    local i = 0
    while i < length(_g776) do
      local _g777 = _g776[i + 1]
      local k = _g777[1]
      local v = _g777[2]
      if not string63(k) then
        error("Illegal key: " .. string(k))
      end
      str = str .. key(k) .. sep .. compile(v)
      if i < length(pairs) - 1 then
        str = str .. ", "
      end
      i = i + 1
    end
    return(str .. "}")
  end}, ["%try"] = {export = true, foo = true, special = function (form)
    local ind = indentation()
    indent_level = indent_level + 1
    local _g769 = compile(form, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local body = _g769
    local e = make_id()
    local hf = {"return", {"%array", false, {"get", e, "\"message\""}}}
    indent_level = indent_level + 1
    local _g770 = compile(hf, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local h = _g770
    return(ind .. "try {\n" .. body .. ind .. "}\n" .. ind .. "catch (" .. e .. ") {\n" .. h .. ind .. "}\n")
  end, stmt = true, tr = true}, ["break"] = {export = true, foo = true, special = function ()
    return(indentation() .. "break")
  end, stmt = true}, ["do"] = {export = true, foo = true, special = function (...)
    local forms = unstash({...})
    local str = ""
    local _g758 = forms
    local _g759 = 0
    while _g759 < length(_g758) do
      local x = _g758[_g759 + 1]
      str = str .. compile(x, {_stash = true, stmt = true})
      _g759 = _g759 + 1
    end
    return(str)
  end, stmt = true, tr = true}, ["error"] = {export = true, foo = true, special = function (x)
    local _g786
    if target == "js" then
      _g786 = "throw new " .. compile({"Error", x})
    else
      _g786 = "error(" .. compile(x) .. ")"
    end
    local e = _g786
    return(indentation() .. e)
  end, stmt = true}, ["get"] = {export = true, foo = true, special = function (t, k)
    local _g774 = compile(t)
    local k1 = compile(k)
    if target == "lua" and char(_g774, 0) == "{" then
      _g774 = "(" .. _g774 .. ")"
    end
    if string_literal63(k) and valid_id63(inner(k)) then
      return(_g774 .. "." .. inner(k))
    else
      return(_g774 .. "[" .. k1 .. "]")
    end
  end}, ["not"] = {}, ["return"] = {export = true, foo = true, special = function (x)
    local _g785
    if nil63(x) then
      _g785 = "return"
    else
      _g785 = "return(" .. compile(x) .. ")"
    end
    local _g771 = _g785
    return(indentation() .. _g771)
  end, stmt = true}, ["set"] = {export = true, foo = true, special = function (lh, rh)
    local _g772 = compile(lh)
    local _g789
    if nil63(rh) then
      _g789 = "nil"
    else
      _g789 = rh
    end
    local _g773 = compile(_g789)
    return(indentation() .. _g772 .. " = " .. _g773)
  end, stmt = true}, ["while"] = {export = true, foo = true, special = function (cond, form)
    local _g765 = compile(cond)
    indent_level = indent_level + 1
    local _g766 = compile(form, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local body = _g766
    local ind = indentation()
    if target == "js" then
      return(ind .. "while (" .. _g765 .. ") {\n" .. body .. ind .. "}\n")
    else
      return(ind .. "while " .. _g765 .. " do\n" .. body .. ind .. "end\n")
    end
  end, stmt = true, tr = true}}, import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}, {"lumen", "lib"}, {"lumen", "compiler"}}}, ["lumen/system"] = {export = {nexus = {export = true, global = true}}, import = {{"lumen", "special"}, {"lumen", "core"}}}, user = {export = {}, import = {"lumen", {"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}}}}
  environment = {{["define-module"] = {export = true, macro = function (spec, ...)
    local body = unstash({...})
    local _g778 = sub(body, 0)
    local alias = _g778.alias
    local exp = _g778.export
    local imp = _g778.import
    local _g779 = import_modules(imp)
    local imports = _g779[1]
    local bindings = _g779[2]
    local k = module_key(spec)
    modules[k] = {alias = alias, export = {}, import = imports}
    local _g780 = exp or {}
    local _g781 = 0
    while _g781 < length(_g780) do
      local x = _g780[_g781 + 1]
      setenv(x, {_stash = true, export = true})
      _g781 = _g781 + 1
    end
    return(join({"do", {"set", {"get", "nexus", {"quote", k}}, {"table"}}}, bindings))
  end}}}
end)();
(function ()
  nexus.user = {}
  local _g793 = nexus["lumen/runtime"]
  local _37 = _g793["%"]
  local _37message_handler = _g793["%message-handler"]
  local _42 = _g793["*"]
  local _43 = _g793["+"]
  local _ = _g793["-"]
  local _47 = _g793["/"]
  local _60 = _g793["<"]
  local _6061 = _g793["<="]
  local _61 = _g793["="]
  local _62 = _g793[">"]
  local _6261 = _g793[">="]
  local abs = _g793.abs
  local acos = _g793.acos
  local add = _g793.add
  local apply = _g793.apply
  local asin = _g793.asin
  local atan = _g793.atan
  local atan2 = _g793.atan2
  local atom63 = _g793["atom?"]
  local boolean63 = _g793["boolean?"]
  local cat = _g793.cat
  local ceil = _g793.ceil
  local char = _g793.char
  local code = _g793.code
  local composite63 = _g793["composite?"]
  local cos = _g793.cos
  local drop = _g793.drop
  local empty63 = _g793["empty?"]
  local exclude = _g793.exclude
  local exit = _g793.exit
  local extend = _g793.extend
  local find = _g793.find
  local flat = _g793.flat
  local flat1 = _g793.flat1
  local floor = _g793.floor
  local function63 = _g793["function?"]
  local hd = _g793.hd
  local id_literal63 = _g793["id-literal?"]
  local in63 = _g793["in?"]
  local inner = _g793.inner
  local is63 = _g793["is?"]
  local iterate = _g793.iterate
  local join = _g793.join
  local keep = _g793.keep
  local keys63 = _g793["keys?"]
  local last = _g793.last
  local length = _g793.length
  local list63 = _g793["list?"]
  local log = _g793.log
  local log10 = _g793.log10
  local make_id = _g793["make-id"]
  local map = _g793.map
  local max = _g793.max
  local min = _g793.min
  local module = _g793.module
  local module_key = _g793["module-key"]
  local nil63 = _g793["nil?"]
  local none63 = _g793["none?"]
  local now = _g793.now
  local number = _g793.number
  local number63 = _g793["number?"]
  local one63 = _g793["one?"]
  local pair = _g793.pair
  local pow = _g793.pow
  local random = _g793.random
  local read_file = _g793["read-file"]
  local reduce = _g793.reduce
  local replicate = _g793.replicate
  local reverse = _g793.reverse
  local sd = _g793.sd
  local search = _g793.search
  local setenv = _g793.setenv
  local sin = _g793.sin
  local sinh = _g793.sinh
  local some63 = _g793["some?"]
  local sort = _g793.sort
  local space = _g793.space
  local splice = _g793.splice
  local split = _g793.split
  local sqrt = _g793.sqrt
  local stash = _g793.stash
  local string = _g793.string
  local string_literal63 = _g793["string-literal?"]
  local string63 = _g793["string?"]
  local sub = _g793.sub
  local substring = _g793.substring
  local table63 = _g793["table?"]
  local tan = _g793.tan
  local tanh = _g793.tanh
  local td = _g793.td
  local tl = _g793.tl
  local today = _g793.today
  local toplevel63 = _g793["toplevel?"]
  local unstash = _g793.unstash
  local write = _g793.write
  local write_file = _g793["write-file"]
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
    local _g797,_g798 = xpcall(function ()
      return(eval(read_from_string(str)))
    end, _37message_handler)
    local _g796 = {_g797, _g798}
    local _g1 = _g796[1]
    local x = _g796[2]
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
    local _g799 = args
    local i = 0
    while i < length(_g799) do
      local arg = _g799[i + 1]
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
