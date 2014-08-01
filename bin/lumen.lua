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
          local _g107
          if string_literal63(k) then
            _g107 = k
          else
            _g107 = quoted(k)
          end
          local k1 = _g107
          add(o, k1)
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
  local _g108 = nexus["lumen/runtime"]
  local _37 = _g108["%"]
  local _37message_handler = _g108["%message-handler"]
  local _42 = _g108["*"]
  local _43 = _g108["+"]
  local _ = _g108["-"]
  local _47 = _g108["/"]
  local _60 = _g108["<"]
  local _6061 = _g108["<="]
  local _61 = _g108["="]
  local _62 = _g108[">"]
  local _6261 = _g108[">="]
  local abs = _g108.abs
  local acos = _g108.acos
  local add = _g108.add
  local apply = _g108.apply
  local asin = _g108.asin
  local atan = _g108.atan
  local atan2 = _g108.atan2
  local atom63 = _g108["atom?"]
  local boolean63 = _g108["boolean?"]
  local cat = _g108.cat
  local ceil = _g108.ceil
  local char = _g108.char
  local code = _g108.code
  local composite63 = _g108["composite?"]
  local cos = _g108.cos
  local drop = _g108.drop
  local empty63 = _g108["empty?"]
  local exclude = _g108.exclude
  local exit = _g108.exit
  local extend = _g108.extend
  local find = _g108.find
  local flat = _g108.flat
  local flat1 = _g108.flat1
  local floor = _g108.floor
  local function63 = _g108["function?"]
  local hd = _g108.hd
  local id_literal63 = _g108["id-literal?"]
  local in63 = _g108["in?"]
  local inner = _g108.inner
  local is63 = _g108["is?"]
  local iterate = _g108.iterate
  local join = _g108.join
  local keep = _g108.keep
  local keys63 = _g108["keys?"]
  local last = _g108.last
  local length = _g108.length
  local list63 = _g108["list?"]
  local log = _g108.log
  local log10 = _g108.log10
  local make_id = _g108["make-id"]
  local map = _g108.map
  local max = _g108.max
  local min = _g108.min
  local module = _g108.module
  local module_key = _g108["module-key"]
  local nil63 = _g108["nil?"]
  local none63 = _g108["none?"]
  local now = _g108.now
  local number = _g108.number
  local number63 = _g108["number?"]
  local one63 = _g108["one?"]
  local pair = _g108.pair
  local pow = _g108.pow
  local random = _g108.random
  local read_file = _g108["read-file"]
  local reduce = _g108.reduce
  local replicate = _g108.replicate
  local reverse = _g108.reverse
  local sd = _g108.sd
  local search = _g108.search
  local setenv = _g108.setenv
  local sin = _g108.sin
  local sinh = _g108.sinh
  local some63 = _g108["some?"]
  local sort = _g108.sort
  local space = _g108.space
  local splice = _g108.splice
  local split = _g108.split
  local sqrt = _g108.sqrt
  local stash = _g108.stash
  local string = _g108.string
  local string_literal63 = _g108["string-literal?"]
  local string63 = _g108["string?"]
  local sub = _g108.sub
  local substring = _g108.substring
  local table63 = _g108["table?"]
  local tan = _g108.tan
  local tanh = _g108.tanh
  local td = _g108.td
  local tl = _g108.tl
  local today = _g108.today
  local toplevel63 = _g108["toplevel?"]
  local unstash = _g108.unstash
  local write = _g108.write
  local write_file = _g108["write-file"]
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
  local _g119 = nexus["lumen/runtime"]
  local _37 = _g119["%"]
  local _37message_handler = _g119["%message-handler"]
  local _42 = _g119["*"]
  local _43 = _g119["+"]
  local _ = _g119["-"]
  local _47 = _g119["/"]
  local _60 = _g119["<"]
  local _6061 = _g119["<="]
  local _61 = _g119["="]
  local _62 = _g119[">"]
  local _6261 = _g119[">="]
  local abs = _g119.abs
  local acos = _g119.acos
  local add = _g119.add
  local apply = _g119.apply
  local asin = _g119.asin
  local atan = _g119.atan
  local atan2 = _g119.atan2
  local atom63 = _g119["atom?"]
  local boolean63 = _g119["boolean?"]
  local cat = _g119.cat
  local ceil = _g119.ceil
  local char = _g119.char
  local code = _g119.code
  local composite63 = _g119["composite?"]
  local cos = _g119.cos
  local drop = _g119.drop
  local empty63 = _g119["empty?"]
  local exclude = _g119.exclude
  local exit = _g119.exit
  local extend = _g119.extend
  local find = _g119.find
  local flat = _g119.flat
  local flat1 = _g119.flat1
  local floor = _g119.floor
  local function63 = _g119["function?"]
  local hd = _g119.hd
  local id_literal63 = _g119["id-literal?"]
  local in63 = _g119["in?"]
  local inner = _g119.inner
  local is63 = _g119["is?"]
  local iterate = _g119.iterate
  local join = _g119.join
  local keep = _g119.keep
  local keys63 = _g119["keys?"]
  local last = _g119.last
  local length = _g119.length
  local list63 = _g119["list?"]
  local log = _g119.log
  local log10 = _g119.log10
  local make_id = _g119["make-id"]
  local map = _g119.map
  local max = _g119.max
  local min = _g119.min
  local module = _g119.module
  local module_key = _g119["module-key"]
  local nil63 = _g119["nil?"]
  local none63 = _g119["none?"]
  local now = _g119.now
  local number = _g119.number
  local number63 = _g119["number?"]
  local one63 = _g119["one?"]
  local pair = _g119.pair
  local pow = _g119.pow
  local random = _g119.random
  local read_file = _g119["read-file"]
  local reduce = _g119.reduce
  local replicate = _g119.replicate
  local reverse = _g119.reverse
  local sd = _g119.sd
  local search = _g119.search
  local setenv = _g119.setenv
  local sin = _g119.sin
  local sinh = _g119.sinh
  local some63 = _g119["some?"]
  local sort = _g119.sort
  local space = _g119.space
  local splice = _g119.splice
  local split = _g119.split
  local sqrt = _g119.sqrt
  local stash = _g119.stash
  local string = _g119.string
  local string_literal63 = _g119["string-literal?"]
  local string63 = _g119["string?"]
  local sub = _g119.sub
  local substring = _g119.substring
  local table63 = _g119["table?"]
  local tan = _g119.tan
  local tanh = _g119.tanh
  local td = _g119.td
  local tl = _g119.tl
  local today = _g119.today
  local toplevel63 = _g119["toplevel?"]
  local unstash = _g119.unstash
  local write = _g119.write
  local write_file = _g119["write-file"]
  local _g122 = nexus["lumen/lib"]
  local bind = _g122.bind
  local bind42 = _g122["bind*"]
  local bound63 = _g122["bound?"]
  local getenv = _g122.getenv
  local id = _g122.id
  local imported = _g122.imported
  local indentation = _g122.indentation
  local initial_environment = _g122["initial-environment"]
  local key = _g122.key
  local linked = _g122.linked
  local macro_function = _g122["macro-function"]
  local macro63 = _g122["macro?"]
  local macroexpand = _g122.macroexpand
  local mapo = _g122.mapo
  local quasiexpand = _g122.quasiexpand
  local quote_environment = _g122["quote-environment"]
  local quote_modules = _g122["quote-modules"]
  local quoted = _g122.quoted
  local reserved63 = _g122["reserved?"]
  local sortk = _g122.sortk
  local special_form63 = _g122["special-form?"]
  local special63 = _g122["special?"]
  local stash42 = _g122["stash*"]
  local statement63 = _g122["statement?"]
  local symbol_expansion = _g122["symbol-expansion"]
  local symbol63 = _g122["symbol?"]
  local valid_id63 = _g122["valid-id?"]
  local variable63 = _g122["variable?"]
  local _g123 = nexus["lumen/reader"]
  local make_stream = _g123["make-stream"]
  local read = _g123.read
  local read_all = _g123["read-all"]
  local read_from_string = _g123["read-from-string"]
  local read_table = _g123["read-table"]
  local _g127 = {}
  _g127.js = "!"
  _g127.lua = "not "
  local _g125 = {}
  local _g128 = {}
  _g128.js = "!"
  _g128.lua = "not "
  _g125["not"] = _g128
  local _g130 = {}
  _g130["%"] = true
  _g130["*"] = true
  _g130["/"] = true
  local _g132 = {}
  _g132["+"] = true
  _g132["-"] = true
  local _g136 = {}
  _g136.js = "+"
  _g136.lua = ".."
  local _g134 = {}
  local _g137 = {}
  _g137.js = "+"
  _g137.lua = ".."
  _g134.cat = _g137
  local _g139 = {}
  _g139["<"] = true
  _g139["<="] = true
  _g139[">"] = true
  _g139[">="] = true
  local _g143 = {}
  _g143.js = "==="
  _g143.lua = "=="
  local _g145 = {}
  _g145.js = "!="
  _g145.lua = "~="
  local _g141 = {}
  local _g146 = {}
  _g146.js = "==="
  _g146.lua = "=="
  _g141["="] = _g146
  local _g147 = {}
  _g147.js = "!="
  _g147.lua = "~="
  _g141["~="] = _g147
  local _g151 = {}
  _g151.js = "&&"
  _g151.lua = "and"
  local _g149 = {}
  local _g152 = {}
  _g152.js = "&&"
  _g152.lua = "and"
  _g149["and"] = _g152
  local _g156 = {}
  _g156.js = "||"
  _g156.lua = "or"
  local _g154 = {}
  local _g157 = {}
  _g157.js = "||"
  _g157.lua = "or"
  _g154["or"] = _g157
  local infix = {_g125, _g130, _g132, _g134, _g139, _g141, _g149, _g154}
  nexus["lumen/compiler"].infix = infix
  local function unary63(form)
    local op = form[1]
    local args = sub(form, 1)
    return(one63(args) and in63(op, {"not", "-"}))
  end
  nexus["lumen/compiler"]["unary?"] = unary63
  local function precedence(form)
    if list63(form) and not unary63(form) then
      local _g158 = infix
      local i = 0
      while i < length(_g158) do
        local level = _g158[i + 1]
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
    local _g159 = args
    local i = 0
    while i < length(_g159) do
      local arg = _g159[i + 1]
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
    local _g160 = getenv(x)
    local self_tr63 = _g160.tr
    local stmt = _g160.stmt
    local special = _g160.special
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
    local _g161 = unstash({...})
    local right = _g161.right
    local _g188
    if right then
      _g188 = _6261
    else
      _g188 = _62
    end
    if _g188(precedence(child), precedence(parent)) then
      return({"(", ")"})
    else
      return({"", ""})
    end
  end
  nexus["lumen/compiler"]["op-delims"] = op_delims
  local function compile_infix(form)
    local op = form[1]
    local _g162 = sub(form, 1)
    local a = _g162[1]
    local b = _g162[2]
    local _g163 = op_delims(form, a)
    local ao = _g163[1]
    local ac = _g163[2]
    local _g164 = op_delims(form, b, {_stash = true, right = true})
    local bo = _g164[1]
    local bc = _g164[2]
    local _g165 = compile(a)
    local _g166 = compile(b)
    local _g167 = getop(op)
    if unary63(form) then
      return(_g167 .. ao .. _g165 .. ac)
    else
      return(ao .. _g165 .. ac .. " " .. _g167 .. " " .. bo .. _g166 .. bc)
    end
  end
  nexus["lumen/compiler"]["compile-infix"] = compile_infix
  local function compile_function(args, body, ...)
    local _g168 = unstash({...})
    local name = _g168.name
    local prefix = _g168.prefix
    local _g189
    if name then
      _g189 = compile(name)
    else
      _g189 = ""
    end
    local id = _g189
    local _g169 = prefix or ""
    local _g170 = compile_args(args)
    indent_level = indent_level + 1
    local _g172 = compile(body, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local _g171 = _g172
    local ind = indentation()
    local _g190
    if target == "js" then
      _g190 = ""
    else
      _g190 = "end"
    end
    local tr = _g190
    if name then
      tr = tr .. "\n"
    end
    if target == "js" then
      return("function " .. id .. _g170 .. " {\n" .. _g171 .. ind .. "}" .. tr)
    else
      return(_g169 .. "function " .. id .. _g170 .. "\n" .. _g171 .. ind .. tr)
    end
  end
  nexus["lumen/compiler"]["compile-function"] = compile_function
  local function can_return63(form)
    return(is63(form) and (atom63(form) or not (hd(form) == "return") and not statement63(hd(form))))
  end
  nexus["lumen/compiler"]["can-return?"] = can_return63
  compile = function (form, ...)
    local _g173 = unstash({...})
    local stmt = _g173.stmt
    if nil63(form) then
      return("")
    else
      if special_form63(form) then
        return(compile_special(form, stmt))
      else
        local tr = terminator(stmt)
        local _g191
        if stmt then
          _g191 = indentation()
        else
          _g191 = ""
        end
        local ind = _g191
        local _g192
        if atom63(form) then
          _g192 = compile_atom(form)
        else
          local _g193
          if infix63(hd(form)) then
            _g193 = compile_infix(form)
          else
            _g193 = compile_call(form)
          end
          _g192 = _g193
        end
        local _g174 = _g192
        return(ind .. _g174 .. tr)
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
    local _g175 = sub(args, 0, length(args) - 1)
    local _g176 = 0
    while _g176 < length(_g175) do
      local x = _g175[_g176 + 1]
      add(hoist, lower(x, hoist, stmt63))
      _g176 = _g176 + 1
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
    local _g177 = args[2]
    local _g178 = args[3]
    if stmt63 or tail63 then
      local _g195
      if _g178 then
        _g195 = {lower_body({_g178}, tail63)}
      end
      return(add(hoist, join({"%if", lower(cond, hoist), lower_body({_g177}, tail63)}, _g195)))
    else
      local e = make_id()
      add(hoist, {"%local", e})
      local _g194
      if _g178 then
        _g194 = {lower({"set", e, _g178})}
      end
      add(hoist, join({"%if", lower(cond, hoist), lower({"set", e, _g177})}, _g194))
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
      local _g196
      if x == "and" then
        _g196 = {"%if", id, b, id}
      else
        _g196 = {"%if", id, id, b}
      end
      return(lower({"do", {"%local", id, a}, _g196}, hoist))
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
    local _g179 = args[2]
    local body = sub(args, 2)
    return(add(hoist, {kind, name, _g179, lower_body(body, true)}))
  end
  nexus["lumen/compiler"]["lower-definition"] = lower_definition
  local function lower_call(form, hoist)
    local _g180 = map(function (x)
      return(lower(x, hoist))
    end, form)
    if some63(_g180) then
      return(_g180)
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
    local _g181 = unstash({...})
    local all = _g181.all
    local m = module(spec)
    local frame = last(environment)
    local _g182 = m.export
    local k = nil
    for k in next, _g182 do
      if not number63(k) then
        local v = _g182[k]
        if v.export or all then
          frame[k] = v
        end
      end
    end
  end
  nexus["lumen/compiler"]["open-module"] = open_module
  local function load_module(spec, ...)
    local _g183 = unstash({...})
    local all = _g183.all
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
    local _g184 = specs or {}
    local _g185 = 0
    while _g185 < length(_g184) do
      local spec = _g184[_g185 + 1]
      load_module(spec)
      local m = module(spec)
      if m.alias then
        local _g186 = import_modules(m.alias)
        local aliased = _g186[1]
        local bs = _g186[2]
        imports = join(imports, aliased)
        bindings = join(bindings, bs)
      else
        local _g187 = imported(spec)
        add(imports, spec)
        bindings = join(bindings, _g187)
      end
      _g185 = _g185 + 1
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
  local _g197 = nexus["lumen/runtime"]
  local _37 = _g197["%"]
  local _37message_handler = _g197["%message-handler"]
  local _42 = _g197["*"]
  local _43 = _g197["+"]
  local _ = _g197["-"]
  local _47 = _g197["/"]
  local _60 = _g197["<"]
  local _6061 = _g197["<="]
  local _61 = _g197["="]
  local _62 = _g197[">"]
  local _6261 = _g197[">="]
  local abs = _g197.abs
  local acos = _g197.acos
  local add = _g197.add
  local apply = _g197.apply
  local asin = _g197.asin
  local atan = _g197.atan
  local atan2 = _g197.atan2
  local atom63 = _g197["atom?"]
  local boolean63 = _g197["boolean?"]
  local cat = _g197.cat
  local ceil = _g197.ceil
  local char = _g197.char
  local code = _g197.code
  local composite63 = _g197["composite?"]
  local cos = _g197.cos
  local drop = _g197.drop
  local empty63 = _g197["empty?"]
  local exclude = _g197.exclude
  local exit = _g197.exit
  local extend = _g197.extend
  local find = _g197.find
  local flat = _g197.flat
  local flat1 = _g197.flat1
  local floor = _g197.floor
  local function63 = _g197["function?"]
  local hd = _g197.hd
  local id_literal63 = _g197["id-literal?"]
  local in63 = _g197["in?"]
  local inner = _g197.inner
  local is63 = _g197["is?"]
  local iterate = _g197.iterate
  local join = _g197.join
  local keep = _g197.keep
  local keys63 = _g197["keys?"]
  local last = _g197.last
  local length = _g197.length
  local list63 = _g197["list?"]
  local log = _g197.log
  local log10 = _g197.log10
  local make_id = _g197["make-id"]
  local map = _g197.map
  local max = _g197.max
  local min = _g197.min
  local module = _g197.module
  local module_key = _g197["module-key"]
  local nil63 = _g197["nil?"]
  local none63 = _g197["none?"]
  local now = _g197.now
  local number = _g197.number
  local number63 = _g197["number?"]
  local one63 = _g197["one?"]
  local pair = _g197.pair
  local pow = _g197.pow
  local random = _g197.random
  local read_file = _g197["read-file"]
  local reduce = _g197.reduce
  local replicate = _g197.replicate
  local reverse = _g197.reverse
  local sd = _g197.sd
  local search = _g197.search
  local setenv = _g197.setenv
  local sin = _g197.sin
  local sinh = _g197.sinh
  local some63 = _g197["some?"]
  local sort = _g197.sort
  local space = _g197.space
  local splice = _g197.splice
  local split = _g197.split
  local sqrt = _g197.sqrt
  local stash = _g197.stash
  local string = _g197.string
  local string_literal63 = _g197["string-literal?"]
  local string63 = _g197["string?"]
  local sub = _g197.sub
  local substring = _g197.substring
  local table63 = _g197["table?"]
  local tan = _g197.tan
  local tanh = _g197.tanh
  local td = _g197.td
  local tl = _g197.tl
  local today = _g197.today
  local toplevel63 = _g197["toplevel?"]
  local unstash = _g197.unstash
  local write = _g197.write
  local write_file = _g197["write-file"]
  local _g200 = nexus["lumen/lib"]
  local bind = _g200.bind
  local bind42 = _g200["bind*"]
  local bound63 = _g200["bound?"]
  local getenv = _g200.getenv
  local id = _g200.id
  local imported = _g200.imported
  local indentation = _g200.indentation
  local initial_environment = _g200["initial-environment"]
  local key = _g200.key
  local linked = _g200.linked
  local macro_function = _g200["macro-function"]
  local macro63 = _g200["macro?"]
  local macroexpand = _g200.macroexpand
  local mapo = _g200.mapo
  local quasiexpand = _g200.quasiexpand
  local quote_environment = _g200["quote-environment"]
  local quote_modules = _g200["quote-modules"]
  local quoted = _g200.quoted
  local reserved63 = _g200["reserved?"]
  local sortk = _g200.sortk
  local special_form63 = _g200["special-form?"]
  local special63 = _g200["special?"]
  local stash42 = _g200["stash*"]
  local statement63 = _g200["statement?"]
  local symbol_expansion = _g200["symbol-expansion"]
  local symbol63 = _g200["symbol?"]
  local valid_id63 = _g200["valid-id?"]
  local variable63 = _g200["variable?"]
  local _g201 = nexus["lumen/compiler"]
  local compile = _g201.compile
  local compile_function = _g201["compile-function"]
  local compile_module = _g201["compile-module"]
  local declare = _g201.declare
  local eval = _g201.eval
  local import_modules = _g201["import-modules"]
  local in_module = _g201["in-module"]
  local load_module = _g201["load-module"]
  local open_module = _g201["open-module"]
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
  local _g378 = nexus["lumen/lib"]
  local bind = _g378.bind
  local bind42 = _g378["bind*"]
  local bound63 = _g378["bound?"]
  local getenv = _g378.getenv
  local id = _g378.id
  local imported = _g378.imported
  local indentation = _g378.indentation
  local initial_environment = _g378["initial-environment"]
  local key = _g378.key
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
  local _g692 = nexus["lumen/runtime"]
  local _37 = _g692["%"]
  local _37message_handler = _g692["%message-handler"]
  local _42 = _g692["*"]
  local _43 = _g692["+"]
  local _ = _g692["-"]
  local _47 = _g692["/"]
  local _60 = _g692["<"]
  local _6061 = _g692["<="]
  local _61 = _g692["="]
  local _62 = _g692[">"]
  local _6261 = _g692[">="]
  local abs = _g692.abs
  local acos = _g692.acos
  local add = _g692.add
  local apply = _g692.apply
  local asin = _g692.asin
  local atan = _g692.atan
  local atan2 = _g692.atan2
  local atom63 = _g692["atom?"]
  local boolean63 = _g692["boolean?"]
  local cat = _g692.cat
  local ceil = _g692.ceil
  local char = _g692.char
  local code = _g692.code
  local composite63 = _g692["composite?"]
  local cos = _g692.cos
  local drop = _g692.drop
  local empty63 = _g692["empty?"]
  local exclude = _g692.exclude
  local exit = _g692.exit
  local extend = _g692.extend
  local find = _g692.find
  local flat = _g692.flat
  local flat1 = _g692.flat1
  local floor = _g692.floor
  local function63 = _g692["function?"]
  local hd = _g692.hd
  local id_literal63 = _g692["id-literal?"]
  local in63 = _g692["in?"]
  local inner = _g692.inner
  local is63 = _g692["is?"]
  local iterate = _g692.iterate
  local join = _g692.join
  local keep = _g692.keep
  local keys63 = _g692["keys?"]
  local last = _g692.last
  local length = _g692.length
  local list63 = _g692["list?"]
  local log = _g692.log
  local log10 = _g692.log10
  local make_id = _g692["make-id"]
  local map = _g692.map
  local max = _g692.max
  local min = _g692.min
  local module = _g692.module
  local module_key = _g692["module-key"]
  local nil63 = _g692["nil?"]
  local none63 = _g692["none?"]
  local now = _g692.now
  local number = _g692.number
  local number63 = _g692["number?"]
  local one63 = _g692["one?"]
  local pair = _g692.pair
  local pow = _g692.pow
  local random = _g692.random
  local read_file = _g692["read-file"]
  local reduce = _g692.reduce
  local replicate = _g692.replicate
  local reverse = _g692.reverse
  local sd = _g692.sd
  local search = _g692.search
  local setenv = _g692.setenv
  local sin = _g692.sin
  local sinh = _g692.sinh
  local some63 = _g692["some?"]
  local sort = _g692.sort
  local space = _g692.space
  local splice = _g692.splice
  local split = _g692.split
  local sqrt = _g692.sqrt
  local stash = _g692.stash
  local string = _g692.string
  local string_literal63 = _g692["string-literal?"]
  local string63 = _g692["string?"]
  local sub = _g692.sub
  local substring = _g692.substring
  local table63 = _g692["table?"]
  local tan = _g692.tan
  local tanh = _g692.tanh
  local td = _g692.td
  local tl = _g692.tl
  local today = _g692.today
  local toplevel63 = _g692["toplevel?"]
  local unstash = _g692.unstash
  local write = _g692.write
  local write_file = _g692["write-file"]
  local _g695 = nexus["lumen/lib"]
  local bind = _g695.bind
  local bind42 = _g695["bind*"]
  local bound63 = _g695["bound?"]
  local getenv = _g695.getenv
  local id = _g695.id
  local imported = _g695.imported
  local indentation = _g695.indentation
  local initial_environment = _g695["initial-environment"]
  local key = _g695.key
  local linked = _g695.linked
  local macro_function = _g695["macro-function"]
  local macro63 = _g695["macro?"]
  local macroexpand = _g695.macroexpand
  local mapo = _g695.mapo
  local quasiexpand = _g695.quasiexpand
  local quote_environment = _g695["quote-environment"]
  local quote_modules = _g695["quote-modules"]
  local quoted = _g695.quoted
  local reserved63 = _g695["reserved?"]
  local sortk = _g695.sortk
  local special_form63 = _g695["special-form?"]
  local special63 = _g695["special?"]
  local stash42 = _g695["stash*"]
  local statement63 = _g695["statement?"]
  local symbol_expansion = _g695["symbol-expansion"]
  local symbol63 = _g695["symbol?"]
  local valid_id63 = _g695["valid-id?"]
  local variable63 = _g695["variable?"]
  local _g696 = nexus["lumen/compiler"]
  local compile = _g696.compile
  local compile_function = _g696["compile-function"]
  local compile_module = _g696["compile-module"]
  local declare = _g696.declare
  local eval = _g696.eval
  local import_modules = _g696["import-modules"]
  local in_module = _g696["in-module"]
  local load_module = _g696["load-module"]
  local open_module = _g696["open-module"]
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
    local _g768 = sub(bs, 0)
    return({"set", a, join({"cat", a}, _g768)})
  end}, dec = {export = true, macro = function (n, by)
    return({"set", n, {"-", n, by or 1}})
  end}, define = {export = true, macro = function (name, x, ...)
    local body = unstash({...})
    local _g740 = sub(body, 0)
    setenv(name, {_stash = true, variable = true})
    if some63(_g740) and target == "js" then
      return(linked(name, {"%local", name, join({"fn", x}, _g740)}))
    else
      if some63(_g740) then
        local _g741 = bind42(x, _g740)
        local args = _g741[1]
        local _g742 = _g741[2]
        return(linked(name, join({"%local-function", name, args}, _g742)))
      else
        return(linked(name, {"%local", name, x}))
      end
    end
  end}, ["define*"] = {export = true, macro = function (name, x, ...)
    local body = unstash({...})
    local _g770 = sub(body, 0)
    setenv(name, {_stash = true, export = true, global = true})
    if some63(_g770) then
      local _g771 = bind42(x, _g770)
      local args = _g771[1]
      local _g772 = _g771[2]
      return(join({"%global-function", name, args}, _g772))
    else
      if target == "js" then
        return({"set", {"get", "global", {"quote", id(name)}}, x})
      else
        return({"set", name, x})
      end
    end
  end}, ["define-macro"] = {export = true, macro = function (name, args, ...)
    local body = unstash({...})
    local _g766 = sub(body, 0)
    local form = join({"fn", args}, _g766)
    local _g767 = {"setenv", {"quote", name}}
    _g767.form = {"quote", form}
    _g767.macro = form
    eval(_g767)
    return(nil)
  end}, ["define-module"] = {export = true, macro = function (spec, ...)
    local body = unstash({...})
    local _g754 = sub(body, 0)
    local alias = _g754.alias
    local exp = _g754.export
    local imp = _g754.import
    local _g755 = import_modules(imp)
    local imports = _g755[1]
    local bindings = _g755[2]
    local k = module_key(spec)
    modules[k] = {alias = alias, export = {}, import = imports}
    local _g756 = exp or {}
    local _g757 = 0
    while _g757 < length(_g756) do
      local x = _g756[_g757 + 1]
      setenv(x, {_stash = true, export = true})
      _g757 = _g757 + 1
    end
    return(join({"do", {"set", {"get", "nexus", {"quote", k}}, {"table"}}}, bindings))
  end}, ["define-special"] = {export = true, macro = function (name, args, ...)
    local body = unstash({...})
    local _g738 = sub(body, 0)
    local form = join({"fn", args}, _g738)
    local keys = sub(_g738, length(_g738))
    local _g739 = {"setenv", {"quote", name}}
    _g739.form = {"quote", form}
    _g739.special = form
    eval(join(_g739, keys))
    return(nil)
  end}, ["define-symbol"] = {export = true, macro = function (name, expansion)
    setenv(name, {_stash = true, symbol = expansion})
    return(nil)
  end}, each = {export = true, macro = function (b, t, ...)
    local body = unstash({...})
    local _g775 = sub(body, 0)
    local k = b[1]
    local v = b[2]
    local t1 = make_id()
    local _g792
    if nil63(v) then
      local _g793
      if b.i then
        _g793 = "i"
      else
        _g793 = make_id()
      end
      local i = _g793
      _g792 = {"let", {i, 0}, {"while", {"<", i, {"length", t1}}, join({"let", {k, {"at", t1, i}}}, _g775), {"inc", i}}}
    else
      local _g776 = {"target"}
      _g776.js = {"nil?", {"number", k}}
      _g776.lua = {"not", {"number?", k}}
      _g792 = {"let", {k, "nil"}, {"%for", t1, k, {"when", _g776, join({"let", {v, {"get", t1, k}}}, _g775)}}}
    end
    return({"let", {t1, t}, _g792})
  end}, fn = {export = true, macro = function (args, ...)
    local body = unstash({...})
    local _g762 = sub(body, 0)
    local _g763 = bind42(args, _g762)
    local _g764 = _g763[1]
    local _g765 = _g763[2]
    return(join({"%function", _g764}, _g765))
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
    local function step(_g749)
      local a = _g749[1]
      local b = _g749[2]
      local c = sub(_g749, 2)
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
    local _g748 = sub(bs, 0)
    return({"set", a, join({"join*", a}, _g748)})
  end}, ["join*"] = {export = true, macro = function (...)
    local xs = unstash({...})
    return(reduce(function (a, b)
      return({"join", a, b})
    end, xs))
  end}, language = {export = true, macro = function ()
    return({"quote", target})
  end}, let = {export = true, macro = function (bindings, ...)
    local body = unstash({...})
    local _g733 = sub(body, 0)
    local i = 0
    local renames = {}
    local locals = {}
    map(function (_g734)
      local lh = _g734[1]
      local rh = _g734[2]
      local _g735 = bind(lh, rh)
      local _g736 = 0
      while _g736 < length(_g735) do
        local _g737 = _g735[_g736 + 1]
        local id = _g737[1]
        local val = _g737[2]
        if bound63(id) or reserved63(id) or toplevel63() then
          local rename = make_id()
          add(renames, id)
          add(renames, rename)
          id = rename
        else
          setenv(id, {_stash = true, variable = true})
        end
        add(locals, {"%local", id, val})
        _g736 = _g736 + 1
      end
    end, pair(bindings))
    return(join({"do"}, join(locals, {join({"let-symbol", renames}, _g733)})))
  end}, ["let*"] = {export = true, macro = function (bindings, ...)
    local body = unstash({...})
    local _g750 = sub(body, 0)
    if length(bindings) < 2 then
      return(join({"do"}, _g750))
    else
      local renames = {}
      local locals = {}
      local lh = bindings[1]
      local rh = bindings[2]
      local _g751 = bind(lh, rh)
      local _g752 = 0
      while _g752 < length(_g751) do
        local _g753 = _g751[_g752 + 1]
        local id = _g753[1]
        local val = _g753[2]
        if bound63(id) or reserved63(id) or toplevel63() then
          local id1 = make_id()
          add(renames, id)
          add(renames, id1)
          id = id1
        else
          setenv(id, {_stash = true, variable = true})
        end
        add(locals, {"%local", id, val})
        _g752 = _g752 + 1
      end
      return(join({"do"}, join(locals, {{"let-symbol", renames, join({"let*", sub(bindings, 2)}, _g750)}})))
    end
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
  end}, ["let-symbol"] = {export = true, macro = function (expansions, ...)
    local body = unstash({...})
    local _g758 = sub(body, 0)
    add(environment, {})
    map(function (_g760)
      local name = _g760[1]
      local exp = _g760[2]
      return(macroexpand({"define-symbol", name, exp}))
    end, pair(expansions))
    local _g759 = join({"do"}, macroexpand(_g758))
    drop(environment)
    return(_g759)
  end}, list = {export = true, macro = function (...)
    local body = unstash({...})
    local l = join({"%array"}, body)
    if not keys63(body) then
      return(l)
    else
      local id = make_id()
      local init = {}
      local _g761 = body
      local k = nil
      for k in next, _g761 do
        if not number63(k) then
          local v = _g761[k]
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
    local _g773 = xs
    local _g774 = 0
    while _g774 < length(_g773) do
      local x = _g773[_g774 + 1]
      l[x] = true
      _g774 = _g774 + 1
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
    local _g747 = sub(body, 0)
    return({"if", {"not", cond}, join({"do"}, _g747)})
  end}, when = {export = true, macro = function (cond, ...)
    local body = unstash({...})
    local _g769 = sub(body, 0)
    return({"if", cond, join({"do"}, _g769)})
  end}, ["with-bindings"] = {export = true, macro = function (_g743, ...)
    local names = _g743[1]
    local body = unstash({...})
    local _g744 = sub(body, 0)
    local x = make_id()
    local _g746 = {"setenv", x}
    _g746.variable = true
    local _g745 = {"with-frame", {"each", {x}, names, _g746}}
    _g745.scope = true
    return(join(_g745, _g744))
  end}, ["with-frame"] = {export = true, macro = function (...)
    local body = unstash({...})
    local _g729 = sub(body, 0)
    local scope = body.scope
    local x = make_id()
    local _g730 = {"table"}
    _g730._scope = scope
    return({"do", {"add", "environment", _g730}, {"let", {x, join({"do"}, _g729)}, {"drop", "environment"}, x}})
  end}}, import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}, {"lumen", "lib"}, {"lumen", "compiler"}}}, ["lumen/lib"] = {export = {bind = {export = true, variable = true}, ["bind*"] = {export = true, variable = true}, ["bound?"] = {export = true, variable = true}, ["can-unquote?"] = {variable = true}, escape = {variable = true}, getenv = {export = true, variable = true}, ["global?"] = {variable = true}, id = {export = true, variable = true}, imported = {export = true, variable = true}, ["indent-level"] = {export = true, global = true}, indentation = {export = true, variable = true}, ["initial-environment"] = {export = true, variable = true}, key = {export = true, variable = true}, linked = {export = true, variable = true}, ["macro-function"] = {export = true, variable = true}, ["macro?"] = {export = true, variable = true}, macroexpand = {export = true, variable = true}, mapo = {export = true, variable = true}, ["numeric?"] = {variable = true}, quasiexpand = {export = true, variable = true}, ["quasiquote-list"] = {variable = true}, ["quasiquoting?"] = {variable = true}, ["quasisplice?"] = {variable = true}, ["quote-binding"] = {variable = true}, ["quote-environment"] = {export = true, variable = true}, ["quote-frame"] = {variable = true}, ["quote-module"] = {variable = true}, ["quote-modules"] = {export = true, variable = true}, quoted = {export = true, variable = true}, ["quoting?"] = {variable = true}, reserved = {variable = true}, ["reserved?"] = {export = true, variable = true}, sortk = {export = true, variable = true}, ["special-form?"] = {export = true, variable = true}, ["special?"] = {export = true, variable = true}, ["stash*"] = {export = true, variable = true}, ["statement?"] = {export = true, variable = true}, ["symbol-expansion"] = {export = true, variable = true}, ["symbol?"] = {export = true, variable = true}, ["valid-char?"] = {variable = true}, ["valid-id?"] = {export = true, variable = true}, ["variable?"] = {export = true, variable = true}, ["with-indent"] = {export = true, macro = function (form)
    local result = make_id()
    return({"do", {"inc", "indent-level"}, {"let", {result, form}, {"dec", "indent-level"}, result}})
  end}}, import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}}}, ["lumen/main"] = {export = {}, import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}, {"lumen", "reader"}, {"lumen", "compiler"}}}, ["lumen/reader"] = {export = {["define-reader"] = {export = true, macro = function (_g777, ...)
    local char = _g777[1]
    local stream = _g777[2]
    local body = unstash({...})
    local _g778 = sub(body, 0)
    return({"set", {"get", "read-table", char}, join({"fn", {stream}}, _g778)})
  end}, delimiters = {variable = true}, eof = {variable = true}, ["flag?"] = {variable = true}, ["key?"] = {variable = true}, ["make-stream"] = {export = true, variable = true}, ["peek-char"] = {variable = true}, read = {export = true, variable = true}, ["read-all"] = {export = true, variable = true}, ["read-char"] = {variable = true}, ["read-from-string"] = {export = true, variable = true}, ["read-table"] = {export = true, variable = true}, ["skip-non-code"] = {variable = true}, whitespace = {variable = true}}, import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}}}, ["lumen/runtime"] = {export = {["%"] = {export = true, variable = true}, ["%message-handler"] = {export = true, variable = true}, ["*"] = {export = true, variable = true}, ["+"] = {export = true, variable = true}, ["-"] = {export = true, variable = true}, ["/"] = {export = true, variable = true}, ["<"] = {export = true, variable = true}, ["<="] = {export = true, variable = true}, ["="] = {export = true, variable = true}, [">"] = {export = true, variable = true}, [">="] = {export = true, variable = true}, abs = {export = true, variable = true}, acos = {export = true, variable = true}, add = {export = true, variable = true}, apply = {export = true, variable = true}, asin = {export = true, variable = true}, atan = {export = true, variable = true}, atan2 = {export = true, variable = true}, ["atom?"] = {export = true, variable = true}, ["boolean?"] = {export = true, variable = true}, cat = {export = true, variable = true}, ceil = {export = true, variable = true}, char = {export = true, variable = true}, code = {export = true, variable = true}, ["composite?"] = {export = true, variable = true}, cos = {export = true, variable = true}, drop = {export = true, variable = true}, ["empty?"] = {export = true, variable = true}, exclude = {export = true, variable = true}, exit = {export = true, variable = true}, extend = {export = true, variable = true}, find = {export = true, variable = true}, flat = {export = true, variable = true}, flat1 = {export = true, variable = true}, floor = {export = true, variable = true}, ["function?"] = {export = true, variable = true}, hd = {export = true, variable = true}, ["id-count"] = {variable = true}, ["id-literal?"] = {export = true, variable = true}, ["in?"] = {export = true, variable = true}, inner = {export = true, variable = true}, ["is?"] = {export = true, variable = true}, iterate = {export = true, variable = true}, join = {export = true, variable = true}, keep = {export = true, variable = true}, ["keys?"] = {export = true, variable = true}, last = {export = true, variable = true}, length = {export = true, variable = true}, ["list?"] = {export = true, variable = true}, log = {export = true, variable = true}, log10 = {export = true, variable = true}, ["make-id"] = {export = true, variable = true}, map = {export = true, variable = true}, mapl = {variable = true}, math = {variable = true}, max = {export = true, variable = true}, ["max*"] = {variable = true}, min = {export = true, variable = true}, ["min*"] = {variable = true}, module = {export = true, variable = true}, ["module-key"] = {export = true, variable = true}, ["nil?"] = {export = true, variable = true}, ["none?"] = {export = true, variable = true}, now = {export = true, variable = true}, number = {export = true, variable = true}, ["number?"] = {export = true, variable = true}, ["one?"] = {export = true, variable = true}, pair = {export = true, variable = true}, pow = {export = true, variable = true}, random = {export = true, variable = true}, ["read-file"] = {export = true, variable = true}, reduce = {export = true, variable = true}, replicate = {export = true, variable = true}, reverse = {export = true, variable = true}, sd = {export = true, variable = true}, search = {export = true, variable = true}, setenv = {export = true, variable = true}, sin = {export = true, variable = true}, sinh = {export = true, variable = true}, ["some?"] = {export = true, variable = true}, sort = {export = true, variable = true}, space = {export = true, variable = true}, splice = {export = true, variable = true}, ["splice?"] = {variable = true}, split = {export = true, variable = true}, sqrt = {export = true, variable = true}, stash = {export = true, variable = true}, string = {export = true, variable = true}, ["string-literal?"] = {export = true, variable = true}, ["string?"] = {export = true, variable = true}, sub = {export = true, variable = true}, subl = {variable = true}, substring = {export = true, variable = true}, ["table?"] = {export = true, variable = true}, tan = {export = true, variable = true}, tanh = {export = true, variable = true}, td = {export = true, variable = true}, tl = {export = true, variable = true}, today = {export = true, variable = true}, ["toplevel?"] = {export = true, variable = true}, unstash = {export = true, variable = true}, write = {export = true, variable = true}, ["write-file"] = {export = true, variable = true}}, import = {{"lumen", "special"}, {"lumen", "core"}}}, ["lumen/special"] = {export = {["%array"] = {export = true, foo = true, special = function (...)
    local forms = unstash({...})
    local _g784
    if target == "lua" then
      _g784 = "{"
    else
      _g784 = "["
    end
    local open = _g784
    local _g785
    if target == "lua" then
      _g785 = "}"
    else
      _g785 = "]"
    end
    local close = _g785
    local str = ""
    local _g711 = forms
    local i = 0
    while i < length(_g711) do
      local x = _g711[i + 1]
      str = str .. compile(x)
      if i < length(forms) - 1 then
        str = str .. ", "
      end
      i = i + 1
    end
    return(open .. str .. close)
  end}, ["%for"] = {export = true, foo = true, special = function (t, k, form)
    local _g726 = compile(t)
    local ind = indentation()
    indent_level = indent_level + 1
    local _g727 = compile(form, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local body = _g727
    if target == "lua" then
      return(ind .. "for " .. k .. " in next, " .. _g726 .. " do\n" .. body .. ind .. "end\n")
    else
      return(ind .. "for (" .. k .. " in " .. _g726 .. ") {\n" .. body .. ind .. "}\n")
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
    local _g718 = compile(cond)
    indent_level = indent_level + 1
    local _g721 = compile(cons, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local _g719 = _g721
    local _g786
    if alt then
      indent_level = indent_level + 1
      local _g722 = compile(alt, {_stash = true, stmt = true})
      indent_level = indent_level - 1
      _g786 = _g722
    end
    local _g720 = _g786
    local ind = indentation()
    local str = ""
    if target == "js" then
      str = str .. ind .. "if (" .. _g718 .. ") {\n" .. _g719 .. ind .. "}"
    else
      str = str .. ind .. "if " .. _g718 .. " then\n" .. _g719
    end
    if _g720 and target == "js" then
      str = str .. " else {\n" .. _g720 .. ind .. "}"
    else
      if _g720 then
        str = str .. ind .. "else\n" .. _g720
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
    local _g788
    if is63(value) then
      _g788 = " = " .. value1
    else
      _g788 = ""
    end
    local rh = _g788
    local _g789
    if target == "js" then
      _g789 = "var "
    else
      _g789 = "local "
    end
    local keyword = _g789
    local ind = indentation()
    return(ind .. keyword .. id .. rh)
  end, stmt = true}, ["%local-function"] = {export = true, foo = true, special = function (name, args, body)
    local x = compile_function(args, body, {_stash = true, name = name, prefix = "local "})
    return(indentation() .. x)
  end, stmt = true, tr = true}, ["%object"] = {export = true, foo = true, special = function (...)
    local forms = unstash({...})
    local str = "{"
    local _g787
    if target == "lua" then
      _g787 = " = "
    else
      _g787 = ": "
    end
    local sep = _g787
    local pairs = sortk(pair(forms), hd)
    local _g723 = pairs
    local i = 0
    while i < length(_g723) do
      local _g724 = _g723[i + 1]
      local k = _g724[1]
      local v = _g724[2]
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
    local _g714 = compile(form, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local body = _g714
    local e = make_id()
    local hf = {"return", {"%array", false, {"get", e, "\"message\""}}}
    indent_level = indent_level + 1
    local _g715 = compile(hf, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local h = _g715
    return(ind .. "try {\n" .. body .. ind .. "}\n" .. ind .. "catch (" .. e .. ") {\n" .. h .. ind .. "}\n")
  end, stmt = true, tr = true}, ["break"] = {export = true, foo = true, special = function ()
    return(indentation() .. "break")
  end, stmt = true}, ["do"] = {export = true, foo = true, special = function (...)
    local forms = unstash({...})
    local str = ""
    local _g716 = forms
    local _g717 = 0
    while _g717 < length(_g716) do
      local x = _g716[_g717 + 1]
      str = str .. compile(x, {_stash = true, stmt = true})
      _g717 = _g717 + 1
    end
    return(str)
  end, stmt = true, tr = true}, ["error"] = {export = true, foo = true, special = function (x)
    local _g790
    if target == "js" then
      _g790 = "throw new " .. compile({"Error", x})
    else
      _g790 = "error(" .. compile(x) .. ")"
    end
    local e = _g790
    return(indentation() .. e)
  end, stmt = true}, ["get"] = {export = true, foo = true, special = function (t, k)
    local _g725 = compile(t)
    local k1 = compile(k)
    if target == "lua" and char(_g725, 0) == "{" then
      _g725 = "(" .. _g725 .. ")"
    end
    if string_literal63(k) and valid_id63(inner(k)) then
      return(_g725 .. "." .. inner(k))
    else
      return(_g725 .. "[" .. k1 .. "]")
    end
  end}, ["not"] = {}, ["return"] = {export = true, foo = true, special = function (x)
    local _g791
    if nil63(x) then
      _g791 = "return"
    else
      _g791 = "return(" .. compile(x) .. ")"
    end
    local _g728 = _g791
    return(indentation() .. _g728)
  end, stmt = true}, ["set"] = {export = true, foo = true, special = function (lh, rh)
    local _g709 = compile(lh)
    local _g783
    if nil63(rh) then
      _g783 = "nil"
    else
      _g783 = rh
    end
    local _g710 = compile(_g783)
    return(indentation() .. _g709 .. " = " .. _g710)
  end, stmt = true}, ["while"] = {export = true, foo = true, special = function (cond, form)
    local _g712 = compile(cond)
    indent_level = indent_level + 1
    local _g713 = compile(form, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local body = _g713
    local ind = indentation()
    if target == "js" then
      return(ind .. "while (" .. _g712 .. ") {\n" .. body .. ind .. "}\n")
    else
      return(ind .. "while " .. _g712 .. " do\n" .. body .. ind .. "end\n")
    end
  end, stmt = true, tr = true}}, import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}, {"lumen", "lib"}, {"lumen", "compiler"}}}, ["lumen/system"] = {export = {nexus = {export = true, global = true}}, import = {{"lumen", "special"}, {"lumen", "core"}}}, user = {export = {}, import = {"lumen", {"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}}}}
  environment = {{["define-module"] = {export = true, macro = function (spec, ...)
    local body = unstash({...})
    local _g779 = sub(body, 0)
    local alias = _g779.alias
    local exp = _g779.export
    local imp = _g779.import
    local _g780 = import_modules(imp)
    local imports = _g780[1]
    local bindings = _g780[2]
    local k = module_key(spec)
    modules[k] = {alias = alias, export = {}, import = imports}
    local _g781 = exp or {}
    local _g782 = 0
    while _g782 < length(_g781) do
      local x = _g781[_g782 + 1]
      setenv(x, {_stash = true, export = true})
      _g782 = _g782 + 1
    end
    return(join({"do", {"set", {"get", "nexus", {"quote", k}}, {"table"}}}, bindings))
  end}}}
end)();
(function ()
  nexus.user = {}
  local _g794 = nexus["lumen/runtime"]
  local _37 = _g794["%"]
  local _37message_handler = _g794["%message-handler"]
  local _42 = _g794["*"]
  local _43 = _g794["+"]
  local _ = _g794["-"]
  local _47 = _g794["/"]
  local _60 = _g794["<"]
  local _6061 = _g794["<="]
  local _61 = _g794["="]
  local _62 = _g794[">"]
  local _6261 = _g794[">="]
  local abs = _g794.abs
  local acos = _g794.acos
  local add = _g794.add
  local apply = _g794.apply
  local asin = _g794.asin
  local atan = _g794.atan
  local atan2 = _g794.atan2
  local atom63 = _g794["atom?"]
  local boolean63 = _g794["boolean?"]
  local cat = _g794.cat
  local ceil = _g794.ceil
  local char = _g794.char
  local code = _g794.code
  local composite63 = _g794["composite?"]
  local cos = _g794.cos
  local drop = _g794.drop
  local empty63 = _g794["empty?"]
  local exclude = _g794.exclude
  local exit = _g794.exit
  local extend = _g794.extend
  local find = _g794.find
  local flat = _g794.flat
  local flat1 = _g794.flat1
  local floor = _g794.floor
  local function63 = _g794["function?"]
  local hd = _g794.hd
  local id_literal63 = _g794["id-literal?"]
  local in63 = _g794["in?"]
  local inner = _g794.inner
  local is63 = _g794["is?"]
  local iterate = _g794.iterate
  local join = _g794.join
  local keep = _g794.keep
  local keys63 = _g794["keys?"]
  local last = _g794.last
  local length = _g794.length
  local list63 = _g794["list?"]
  local log = _g794.log
  local log10 = _g794.log10
  local make_id = _g794["make-id"]
  local map = _g794.map
  local max = _g794.max
  local min = _g794.min
  local module = _g794.module
  local module_key = _g794["module-key"]
  local nil63 = _g794["nil?"]
  local none63 = _g794["none?"]
  local now = _g794.now
  local number = _g794.number
  local number63 = _g794["number?"]
  local one63 = _g794["one?"]
  local pair = _g794.pair
  local pow = _g794.pow
  local random = _g794.random
  local read_file = _g794["read-file"]
  local reduce = _g794.reduce
  local replicate = _g794.replicate
  local reverse = _g794.reverse
  local sd = _g794.sd
  local search = _g794.search
  local setenv = _g794.setenv
  local sin = _g794.sin
  local sinh = _g794.sinh
  local some63 = _g794["some?"]
  local sort = _g794.sort
  local space = _g794.space
  local splice = _g794.splice
  local split = _g794.split
  local sqrt = _g794.sqrt
  local stash = _g794.stash
  local string = _g794.string
  local string_literal63 = _g794["string-literal?"]
  local string63 = _g794["string?"]
  local sub = _g794.sub
  local substring = _g794.substring
  local table63 = _g794["table?"]
  local tan = _g794.tan
  local tanh = _g794.tanh
  local td = _g794.td
  local tl = _g794.tl
  local today = _g794.today
  local toplevel63 = _g794["toplevel?"]
  local unstash = _g794.unstash
  local write = _g794.write
  local write_file = _g794["write-file"]
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
    local _g798,_g799 = xpcall(function ()
      return(eval(read_from_string(str)))
    end, _37message_handler)
    local _g797 = {_g798, _g799}
    local _g1 = _g797[1]
    local x = _g797[2]
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
    local _g800 = args
    local i = 0
    while i < length(_g800) do
      local arg = _g800[i + 1]
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
