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
  local function sublist(l, from, upto)
    local i = from or 0
    local j = 0
    local _g25 = upto or length(l)
    local l2 = {}
    while i < _g25 do
      l2[j + 1] = l[i + 1]
      i = i + 1
      j = j + 1
    end
    return(l2)
  end
  nexus["lumen/runtime"].sublist = sublist
  local function sub(x, from, upto)
    local _g26 = from or 0
    if string63(x) then
      return(substring(x, _g26, upto))
    else
      local l = sublist(x, _g26, upto)
      local _g27 = x
      local k = nil
      for k in next, _g27 do
        if not number63(k) then
          local v = _g27[k]
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
    local _g57
    if n then
      _g57 = n + 1
    end
    return(string.byte(str, _g57))
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
          local _g28 = l1
          local k = nil
          for k in next, _g28 do
            if not number63(k) then
              local v = _g28[k]
              l[k] = v
            end
          end
          local _g29 = l2
          local k = nil
          for k in next, _g29 do
            if not number63(k) then
              local v = _g29[k]
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
    local _g30 = l
    local _g31 = 0
    while _g31 < length(_g30) do
      local x = _g30[_g31 + 1]
      if f(x) then
        add(l1, x)
      end
      _g31 = _g31 + 1
    end
    return(l1)
  end
  nexus["lumen/runtime"].keep = keep
  local function find(f, l)
    local _g32 = l
    local _g33 = 0
    while _g33 < length(_g32) do
      local x = _g32[_g33 + 1]
      local _g34 = f(x)
      if _g34 then
        return(_g34)
      end
      _g33 = _g33 + 1
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
    local _g35 = l
    local _g36 = 0
    while _g36 < length(_g35) do
      local x = _g35[_g36 + 1]
      local _g37 = f(x)
      if splice63(_g37) then
        l1 = join(l1, _g37.value)
      else
        if is63(_g37) then
          add(l1, _g37)
        end
      end
      _g36 = _g36 + 1
    end
    return(l1)
  end
  nexus["lumen/runtime"].mapl = mapl
  local function map(f, t)
    local l = mapl(f, t)
    local _g38 = t
    local k = nil
    for k in next, _g38 do
      if not number63(k) then
        local v = _g38[k]
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
    local _g39 = t
    local k = nil
    for k in next, _g39 do
      if not number63(k) then
        local v = _g39[k]
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
      local _g40 = args
      local k = nil
      for k in next, _g40 do
        if not number63(k) then
          local v = _g40[k]
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
        local _g41 = l
        local k = nil
        for k in next, _g41 do
          if not number63(k) then
            local v = _g41[k]
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
    local _g42 = sub(xs, 0)
    return(join(t, _g42))
  end
  nexus["lumen/runtime"].extend = extend
  local function exclude(t, ...)
    local keys = unstash({...})
    local _g43 = sub(keys, 0)
    local t1 = sublist(t)
    local _g44 = t
    local k = nil
    for k in next, _g44 do
      if not number63(k) then
        local v = _g44[k]
        if not _g43[k] then
          t1[k] = v
        end
      end
    end
    return(t1)
  end
  nexus["lumen/runtime"].exclude = exclude
  local function search(str, pattern, start)
    local _g58
    if start then
      _g58 = start + 1
    end
    local _g45 = _g58
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
    local _g46 = sub(xs, 0)
    if none63(_g46) then
      return("")
    else
      return(reduce(function (a, b)
        return(a .. b)
      end, _g46))
    end
  end
  nexus["lumen/runtime"].cat = cat
  local function _43(...)
    local xs = unstash({...})
    local _g47 = sub(xs, 0)
    return(reduce(function (a, b)
      return(a + b)
    end, _g47))
  end
  nexus["lumen/runtime"]["+"] = _43
  local function _(...)
    local xs = unstash({...})
    local _g48 = sub(xs, 0)
    return(reduce(function (a, b)
      return(b - a)
    end, reverse(_g48)))
  end
  nexus["lumen/runtime"]["-"] = _
  local function _42(...)
    local xs = unstash({...})
    local _g49 = sub(xs, 0)
    return(reduce(function (a, b)
      return(a * b)
    end, _g49))
  end
  nexus["lumen/runtime"]["*"] = _42
  local function _47(...)
    local xs = unstash({...})
    local _g50 = sub(xs, 0)
    return(reduce(function (a, b)
      return(b / a)
    end, reverse(_g50)))
  end
  nexus["lumen/runtime"]["/"] = _47
  local function _37(...)
    local xs = unstash({...})
    local _g51 = sub(xs, 0)
    return(reduce(function (a, b)
      return(b % a)
    end, reverse(_g51)))
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
            local _g52 = x
            local k = nil
            for k in next, _g52 do
              if not number63(k) then
                local v = _g52[k]
                add(x1, k .. ":")
                add(x1, v)
              end
            end
            local _g53 = x1
            local i = 0
            while i < length(_g53) do
              local y = _g53[i + 1]
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
  local function space(...)
    local xs = unstash({...})
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
    local _g54 = stash(args)
    return(f(unpack(_g54)))
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
    local _g55 = sub(keys, 0)
    if string63(k) then
      local frame = last(environment)
      local x = frame[k] or {}
      local _g56 = _g55
      local k1 = nil
      for k1 in next, _g56 do
        if not number63(k1) then
          local v = _g56[k1]
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
  local _g62 = nexus["lumen/runtime"]
  local _37 = _g62["%"]
  local _37message_handler = _g62["%message-handler"]
  local _42 = _g62["*"]
  local _43 = _g62["+"]
  local _ = _g62["-"]
  local _47 = _g62["/"]
  local _60 = _g62["<"]
  local _6061 = _g62["<="]
  local _61 = _g62["="]
  local _62 = _g62[">"]
  local _6261 = _g62[">="]
  local abs = _g62.abs
  local acos = _g62.acos
  local add = _g62.add
  local apply = _g62.apply
  local asin = _g62.asin
  local atan = _g62.atan
  local atan2 = _g62.atan2
  local atom63 = _g62["atom?"]
  local boolean63 = _g62["boolean?"]
  local cat = _g62.cat
  local ceil = _g62.ceil
  local char = _g62.char
  local code = _g62.code
  local composite63 = _g62["composite?"]
  local cos = _g62.cos
  local drop = _g62.drop
  local empty63 = _g62["empty?"]
  local exclude = _g62.exclude
  local exit = _g62.exit
  local extend = _g62.extend
  local find = _g62.find
  local flat = _g62.flat
  local flat1 = _g62.flat1
  local floor = _g62.floor
  local function63 = _g62["function?"]
  local hd = _g62.hd
  local id_literal63 = _g62["id-literal?"]
  local in63 = _g62["in?"]
  local inner = _g62.inner
  local is63 = _g62["is?"]
  local iterate = _g62.iterate
  local join = _g62.join
  local keep = _g62.keep
  local keys63 = _g62["keys?"]
  local last = _g62.last
  local length = _g62.length
  local list63 = _g62["list?"]
  local log = _g62.log
  local log10 = _g62.log10
  local make_id = _g62["make-id"]
  local map = _g62.map
  local max = _g62.max
  local min = _g62.min
  local module = _g62.module
  local module_key = _g62["module-key"]
  local nil63 = _g62["nil?"]
  local none63 = _g62["none?"]
  local now = _g62.now
  local number = _g62.number
  local number63 = _g62["number?"]
  local one63 = _g62["one?"]
  local pair = _g62.pair
  local pow = _g62.pow
  local random = _g62.random
  local read_file = _g62["read-file"]
  local reduce = _g62.reduce
  local replicate = _g62.replicate
  local reverse = _g62.reverse
  local sd = _g62.sd
  local search = _g62.search
  local setenv = _g62.setenv
  local sin = _g62.sin
  local sinh = _g62.sinh
  local some63 = _g62["some?"]
  local sort = _g62.sort
  local space = _g62.space
  local splice = _g62.splice
  local split = _g62.split
  local sqrt = _g62.sqrt
  local stash = _g62.stash
  local string = _g62.string
  local string_literal63 = _g62["string-literal?"]
  local string63 = _g62["string?"]
  local sub = _g62.sub
  local sublist = _g62.sublist
  local substring = _g62.substring
  local table63 = _g62["table?"]
  local tan = _g62.tan
  local tanh = _g62.tanh
  local td = _g62.td
  local tl = _g62.tl
  local today = _g62.today
  local toplevel63 = _g62["toplevel?"]
  local unstash = _g62.unstash
  local write = _g62.write
  local write_file = _g62["write-file"]
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
            local _g59 = _g67[x]
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
      local _g96
      if c == "\n" then
        _g96 = "\\n"
      else
        local _g97
        if c == "\"" then
          _g97 = "\\\""
        else
          local _g98
          if c == "\\" then
            _g98 = "\\\\"
          else
            _g98 = c
          end
          _g97 = _g98
        end
        _g96 = _g97
      end
      local c1 = _g96
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
      local _g68 = args
      local k = nil
      for k in next, _g68 do
        if not number63(k) then
          local v = _g68[k]
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
            local name = form[2]
            local _g77 = form[3]
            local _g78 = sub(form, 3)
            add(environment, {_scope = true})
            local _g81 = _g77
            local _g82 = 0
            while _g82 < length(_g81) do
              local _g79 = _g81[_g82 + 1]
              setenv(_g79, {_stash = true, variable = true})
              _g82 = _g82 + 1
            end
            local _g80 = join({x, name, map(macroexpand, _g77)}, macroexpand(_g78))
            drop(environment)
            return(_g80)
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
    local _g83 = form
    local k = nil
    for k in next, _g83 do
      if not number63(k) then
        local v = _g83[k]
        local _g99
        if quasisplice63(v, depth) then
          _g99 = quasiexpand(v[2])
        else
          _g99 = quasiexpand(v, depth)
        end
        local _g84 = _g99
        last(xs)[k] = _g84
      end
    end
    local _g85 = form
    local _g86 = 0
    while _g86 < length(_g85) do
      local x = _g85[_g86 + 1]
      if quasisplice63(x, depth) then
        local _g87 = quasiexpand(x[2])
        add(xs, _g87)
        add(xs, {"list"})
      else
        add(last(xs), quasiexpand(x, depth))
      end
      _g86 = _g86 + 1
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
      local _g100
      if c == "-" then
        _g100 = "_"
      else
        local _g101
        if valid_char63(n) then
          _g101 = c
        else
          local _g102
          if i == 0 then
            _g102 = "_" .. n
          else
            _g102 = n
          end
          _g101 = _g102
        end
        _g100 = _g101
      end
      local c1 = _g100
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
    local _g92 = unstash({...})
    local all = _g92.all
    local m = make_id()
    local k = module_key(spec)
    local imports = {}
    if nexus[k] then
      local _g93 = module(spec).export
      local n = nil
      for n in next, _g93 do
        if not number63(n) then
          local b = _g93[n]
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
    local _g94 = t
    local k = nil
    for k in next, _g94 do
      if not number63(k) then
        local v = _g94[k]
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
    local _g95 = {"table"}
    _g95.alias = quoted(m.alias)
    _g95.export = quote_frame(m.export)
    _g95.import = quoted(m.import)
    return(_g95)
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
  local _g103 = nexus["lumen/runtime"]
  local _37 = _g103["%"]
  local _37message_handler = _g103["%message-handler"]
  local _42 = _g103["*"]
  local _43 = _g103["+"]
  local _ = _g103["-"]
  local _47 = _g103["/"]
  local _60 = _g103["<"]
  local _6061 = _g103["<="]
  local _61 = _g103["="]
  local _62 = _g103[">"]
  local _6261 = _g103[">="]
  local abs = _g103.abs
  local acos = _g103.acos
  local add = _g103.add
  local apply = _g103.apply
  local asin = _g103.asin
  local atan = _g103.atan
  local atan2 = _g103.atan2
  local atom63 = _g103["atom?"]
  local boolean63 = _g103["boolean?"]
  local cat = _g103.cat
  local ceil = _g103.ceil
  local char = _g103.char
  local code = _g103.code
  local composite63 = _g103["composite?"]
  local cos = _g103.cos
  local drop = _g103.drop
  local empty63 = _g103["empty?"]
  local exclude = _g103.exclude
  local exit = _g103.exit
  local extend = _g103.extend
  local find = _g103.find
  local flat = _g103.flat
  local flat1 = _g103.flat1
  local floor = _g103.floor
  local function63 = _g103["function?"]
  local hd = _g103.hd
  local id_literal63 = _g103["id-literal?"]
  local in63 = _g103["in?"]
  local inner = _g103.inner
  local is63 = _g103["is?"]
  local iterate = _g103.iterate
  local join = _g103.join
  local keep = _g103.keep
  local keys63 = _g103["keys?"]
  local last = _g103.last
  local length = _g103.length
  local list63 = _g103["list?"]
  local log = _g103.log
  local log10 = _g103.log10
  local make_id = _g103["make-id"]
  local map = _g103.map
  local max = _g103.max
  local min = _g103.min
  local module = _g103.module
  local module_key = _g103["module-key"]
  local nil63 = _g103["nil?"]
  local none63 = _g103["none?"]
  local now = _g103.now
  local number = _g103.number
  local number63 = _g103["number?"]
  local one63 = _g103["one?"]
  local pair = _g103.pair
  local pow = _g103.pow
  local random = _g103.random
  local read_file = _g103["read-file"]
  local reduce = _g103.reduce
  local replicate = _g103.replicate
  local reverse = _g103.reverse
  local sd = _g103.sd
  local search = _g103.search
  local setenv = _g103.setenv
  local sin = _g103.sin
  local sinh = _g103.sinh
  local some63 = _g103["some?"]
  local sort = _g103.sort
  local space = _g103.space
  local splice = _g103.splice
  local split = _g103.split
  local sqrt = _g103.sqrt
  local stash = _g103.stash
  local string = _g103.string
  local string_literal63 = _g103["string-literal?"]
  local string63 = _g103["string?"]
  local sub = _g103.sub
  local sublist = _g103.sublist
  local substring = _g103.substring
  local table63 = _g103["table?"]
  local tan = _g103.tan
  local tanh = _g103.tanh
  local td = _g103.td
  local tl = _g103.tl
  local today = _g103.today
  local toplevel63 = _g103["toplevel?"]
  local unstash = _g103.unstash
  local write = _g103.write
  local write_file = _g103["write-file"]
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
  local _g114 = nexus["lumen/runtime"]
  local _37 = _g114["%"]
  local _37message_handler = _g114["%message-handler"]
  local _42 = _g114["*"]
  local _43 = _g114["+"]
  local _ = _g114["-"]
  local _47 = _g114["/"]
  local _60 = _g114["<"]
  local _6061 = _g114["<="]
  local _61 = _g114["="]
  local _62 = _g114[">"]
  local _6261 = _g114[">="]
  local abs = _g114.abs
  local acos = _g114.acos
  local add = _g114.add
  local apply = _g114.apply
  local asin = _g114.asin
  local atan = _g114.atan
  local atan2 = _g114.atan2
  local atom63 = _g114["atom?"]
  local boolean63 = _g114["boolean?"]
  local cat = _g114.cat
  local ceil = _g114.ceil
  local char = _g114.char
  local code = _g114.code
  local composite63 = _g114["composite?"]
  local cos = _g114.cos
  local drop = _g114.drop
  local empty63 = _g114["empty?"]
  local exclude = _g114.exclude
  local exit = _g114.exit
  local extend = _g114.extend
  local find = _g114.find
  local flat = _g114.flat
  local flat1 = _g114.flat1
  local floor = _g114.floor
  local function63 = _g114["function?"]
  local hd = _g114.hd
  local id_literal63 = _g114["id-literal?"]
  local in63 = _g114["in?"]
  local inner = _g114.inner
  local is63 = _g114["is?"]
  local iterate = _g114.iterate
  local join = _g114.join
  local keep = _g114.keep
  local keys63 = _g114["keys?"]
  local last = _g114.last
  local length = _g114.length
  local list63 = _g114["list?"]
  local log = _g114.log
  local log10 = _g114.log10
  local make_id = _g114["make-id"]
  local map = _g114.map
  local max = _g114.max
  local min = _g114.min
  local module = _g114.module
  local module_key = _g114["module-key"]
  local nil63 = _g114["nil?"]
  local none63 = _g114["none?"]
  local now = _g114.now
  local number = _g114.number
  local number63 = _g114["number?"]
  local one63 = _g114["one?"]
  local pair = _g114.pair
  local pow = _g114.pow
  local random = _g114.random
  local read_file = _g114["read-file"]
  local reduce = _g114.reduce
  local replicate = _g114.replicate
  local reverse = _g114.reverse
  local sd = _g114.sd
  local search = _g114.search
  local setenv = _g114.setenv
  local sin = _g114.sin
  local sinh = _g114.sinh
  local some63 = _g114["some?"]
  local sort = _g114.sort
  local space = _g114.space
  local splice = _g114.splice
  local split = _g114.split
  local sqrt = _g114.sqrt
  local stash = _g114.stash
  local string = _g114.string
  local string_literal63 = _g114["string-literal?"]
  local string63 = _g114["string?"]
  local sub = _g114.sub
  local sublist = _g114.sublist
  local substring = _g114.substring
  local table63 = _g114["table?"]
  local tan = _g114.tan
  local tanh = _g114.tanh
  local td = _g114.td
  local tl = _g114.tl
  local today = _g114.today
  local toplevel63 = _g114["toplevel?"]
  local unstash = _g114.unstash
  local write = _g114.write
  local write_file = _g114["write-file"]
  local _g117 = nexus["lumen/utilities"]
  local bind = _g117.bind
  local bind42 = _g117["bind*"]
  local bound63 = _g117["bound?"]
  local getenv = _g117.getenv
  local id = _g117.id
  local imported = _g117.imported
  local indentation = _g117.indentation
  local initial_environment = _g117["initial-environment"]
  local linked = _g117.linked
  local macro_function = _g117["macro-function"]
  local macro63 = _g117["macro?"]
  local macroexpand = _g117.macroexpand
  local mapo = _g117.mapo
  local quasiexpand = _g117.quasiexpand
  local quote_environment = _g117["quote-environment"]
  local quote_modules = _g117["quote-modules"]
  local quoted = _g117.quoted
  local reserved63 = _g117["reserved?"]
  local sortk = _g117.sortk
  local special_form63 = _g117["special-form?"]
  local special63 = _g117["special?"]
  local stash42 = _g117["stash*"]
  local statement63 = _g117["statement?"]
  local symbol_expansion = _g117["symbol-expansion"]
  local symbol63 = _g117["symbol?"]
  local valid_id63 = _g117["valid-id?"]
  local variable63 = _g117["variable?"]
  local _g118 = nexus["lumen/reader"]
  local make_stream = _g118["make-stream"]
  local read = _g118.read
  local read_all = _g118["read-all"]
  local read_from_string = _g118["read-from-string"]
  local read_table = _g118["read-table"]
  local _g122 = {}
  _g122.js = "!"
  _g122.lua = "not "
  local _g120 = {}
  local _g123 = {}
  _g123.js = "!"
  _g123.lua = "not "
  _g120["not"] = _g123
  local _g125 = {}
  _g125["%"] = true
  _g125["*"] = true
  _g125["/"] = true
  local _g127 = {}
  _g127["+"] = true
  _g127["-"] = true
  local _g131 = {}
  _g131.js = "+"
  _g131.lua = ".."
  local _g129 = {}
  local _g132 = {}
  _g132.js = "+"
  _g132.lua = ".."
  _g129.cat = _g132
  local _g134 = {}
  _g134["<"] = true
  _g134["<="] = true
  _g134[">"] = true
  _g134[">="] = true
  local _g140 = {}
  _g140.js = "!="
  _g140.lua = "~="
  local _g138 = {}
  _g138.js = "==="
  _g138.lua = "=="
  local _g136 = {}
  local _g141 = {}
  _g141.js = "==="
  _g141.lua = "=="
  _g136["="] = _g141
  local _g142 = {}
  _g142.js = "!="
  _g142.lua = "~="
  _g136["~="] = _g142
  local _g146 = {}
  _g146.js = "&&"
  _g146.lua = "and"
  local _g144 = {}
  local _g147 = {}
  _g147.js = "&&"
  _g147.lua = "and"
  _g144["and"] = _g147
  local _g151 = {}
  _g151.js = "||"
  _g151.lua = "or"
  local _g149 = {}
  local _g152 = {}
  _g152.js = "||"
  _g152.lua = "or"
  _g149["or"] = _g152
  local infix = {_g120, _g125, _g127, _g129, _g134, _g136, _g144, _g149}
  nexus["lumen/compiler"].infix = infix
  local function unary63(form)
    local op = form[1]
    local args = sub(form, 1)
    return(one63(args) and in63(op, {"not", "-"}))
  end
  nexus["lumen/compiler"]["unary?"] = unary63
  local function precedence(form)
    if list63(form) and not unary63(form) then
      local _g153 = infix
      local i = 0
      while i < length(_g153) do
        local level = _g153[i + 1]
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
    local _g154 = args
    local i = 0
    while i < length(_g154) do
      local arg = _g154[i + 1]
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
    local _g155 = getenv(x)
    local stmt = _g155.stmt
    local self_tr63 = _g155.tr
    local special = _g155.special
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
    local _g156 = unstash({...})
    local right = _g156.right
    local _g183
    if right then
      _g183 = _6261
    else
      _g183 = _62
    end
    if _g183(precedence(child), precedence(parent)) then
      return({"(", ")"})
    else
      return({"", ""})
    end
  end
  nexus["lumen/compiler"]["op-delims"] = op_delims
  local function compile_infix(form)
    local op = form[1]
    local _g157 = sub(form, 1)
    local a = _g157[1]
    local b = _g157[2]
    local _g158 = op_delims(form, a)
    local ao = _g158[1]
    local ac = _g158[2]
    local _g159 = op_delims(form, b, {_stash = true, right = true})
    local bo = _g159[1]
    local bc = _g159[2]
    local _g160 = compile(a)
    local _g161 = compile(b)
    local _g162 = getop(op)
    if unary63(form) then
      return(_g162 .. ao .. _g160 .. ac)
    else
      return(ao .. _g160 .. ac .. " " .. _g162 .. " " .. bo .. _g161 .. bc)
    end
  end
  nexus["lumen/compiler"]["compile-infix"] = compile_infix
  local function compile_function(args, body, ...)
    local _g163 = unstash({...})
    local name = _g163.name
    local prefix = _g163.prefix
    local _g184
    if name then
      _g184 = compile(name)
    else
      _g184 = ""
    end
    local id = _g184
    local _g164 = prefix or ""
    local _g165 = compile_args(args)
    indent_level = indent_level + 1
    local _g167 = compile(body, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local _g166 = _g167
    local ind = indentation()
    local _g185
    if target == "js" then
      _g185 = ""
    else
      _g185 = "end"
    end
    local tr = _g185
    if name then
      tr = tr .. "\n"
    end
    if target == "js" then
      return("function " .. id .. _g165 .. " {\n" .. _g166 .. ind .. "}" .. tr)
    else
      return(_g164 .. "function " .. id .. _g165 .. "\n" .. _g166 .. ind .. tr)
    end
  end
  nexus["lumen/compiler"]["compile-function"] = compile_function
  local function can_return63(form)
    return(is63(form) and (atom63(form) or not (hd(form) == "return") and not statement63(hd(form))))
  end
  nexus["lumen/compiler"]["can-return?"] = can_return63
  compile = function (form, ...)
    local _g168 = unstash({...})
    local stmt = _g168.stmt
    if nil63(form) then
      return("")
    else
      if special_form63(form) then
        return(compile_special(form, stmt))
      else
        local tr = terminator(stmt)
        local _g186
        if stmt then
          _g186 = indentation()
        else
          _g186 = ""
        end
        local ind = _g186
        local _g187
        if atom63(form) then
          _g187 = compile_atom(form)
        else
          local _g188
          if infix63(hd(form)) then
            _g188 = compile_infix(form)
          else
            _g188 = compile_call(form)
          end
          _g187 = _g188
        end
        local _g169 = _g187
        return(ind .. _g169 .. tr)
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
    local _g170 = sub(args, 0, length(args) - 1)
    local _g171 = 0
    while _g171 < length(_g170) do
      local x = _g170[_g171 + 1]
      add(hoist, lower(x, hoist, stmt63))
      _g171 = _g171 + 1
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
    local _g172 = args[2]
    local _g173 = args[3]
    if stmt63 or tail63 then
      local _g190
      if _g173 then
        _g190 = {lower_body({_g173}, tail63)}
      end
      return(add(hoist, join({"%if", lower(cond, hoist), lower_body({_g172}, tail63)}, _g190)))
    else
      local e = make_id()
      add(hoist, {"%local", e})
      local _g189
      if _g173 then
        _g189 = {lower({"set", e, _g173})}
      end
      add(hoist, join({"%if", lower(cond, hoist), lower({"set", e, _g172})}, _g189))
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
      local _g191
      if x == "and" then
        _g191 = {"%if", id, b, id}
      else
        _g191 = {"%if", id, id, b}
      end
      return(lower({"do", {"%local", id, a}, _g191}, hoist))
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
    local _g174 = args[2]
    local body = sub(args, 2)
    return(add(hoist, {kind, name, _g174, lower_body(body, true)}))
  end
  nexus["lumen/compiler"]["lower-definition"] = lower_definition
  local function lower_call(form, hoist)
    local _g175 = map(function (x)
      return(lower(x, hoist))
    end, form)
    if some63(_g175) then
      return(_g175)
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
    local _g176 = unstash({...})
    local all = _g176.all
    local m = module(spec)
    local frame = last(environment)
    local _g177 = m.export
    local k = nil
    for k in next, _g177 do
      if not number63(k) then
        local v = _g177[k]
        if v.export or all then
          frame[k] = v
        end
      end
    end
  end
  nexus["lumen/compiler"]["open-module"] = open_module
  local function load_module(spec, ...)
    local _g178 = unstash({...})
    local all = _g178.all
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
    local _g179 = specs or {}
    local _g180 = 0
    while _g180 < length(_g179) do
      local spec = _g179[_g180 + 1]
      load_module(spec)
      local m = module(spec)
      if m.alias then
        local _g181 = import_modules(m.alias)
        local aliased = _g181[1]
        local bs = _g181[2]
        imports = join(imports, aliased)
        bindings = join(bindings, bs)
      else
        local _g182 = imported(spec)
        add(imports, spec)
        bindings = join(bindings, _g182)
      end
      _g180 = _g180 + 1
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
  local _g192 = nexus["lumen/runtime"]
  local _37 = _g192["%"]
  local _37message_handler = _g192["%message-handler"]
  local _42 = _g192["*"]
  local _43 = _g192["+"]
  local _ = _g192["-"]
  local _47 = _g192["/"]
  local _60 = _g192["<"]
  local _6061 = _g192["<="]
  local _61 = _g192["="]
  local _62 = _g192[">"]
  local _6261 = _g192[">="]
  local abs = _g192.abs
  local acos = _g192.acos
  local add = _g192.add
  local apply = _g192.apply
  local asin = _g192.asin
  local atan = _g192.atan
  local atan2 = _g192.atan2
  local atom63 = _g192["atom?"]
  local boolean63 = _g192["boolean?"]
  local cat = _g192.cat
  local ceil = _g192.ceil
  local char = _g192.char
  local code = _g192.code
  local composite63 = _g192["composite?"]
  local cos = _g192.cos
  local drop = _g192.drop
  local empty63 = _g192["empty?"]
  local exclude = _g192.exclude
  local exit = _g192.exit
  local extend = _g192.extend
  local find = _g192.find
  local flat = _g192.flat
  local flat1 = _g192.flat1
  local floor = _g192.floor
  local function63 = _g192["function?"]
  local hd = _g192.hd
  local id_literal63 = _g192["id-literal?"]
  local in63 = _g192["in?"]
  local inner = _g192.inner
  local is63 = _g192["is?"]
  local iterate = _g192.iterate
  local join = _g192.join
  local keep = _g192.keep
  local keys63 = _g192["keys?"]
  local last = _g192.last
  local length = _g192.length
  local list63 = _g192["list?"]
  local log = _g192.log
  local log10 = _g192.log10
  local make_id = _g192["make-id"]
  local map = _g192.map
  local max = _g192.max
  local min = _g192.min
  local module = _g192.module
  local module_key = _g192["module-key"]
  local nil63 = _g192["nil?"]
  local none63 = _g192["none?"]
  local now = _g192.now
  local number = _g192.number
  local number63 = _g192["number?"]
  local one63 = _g192["one?"]
  local pair = _g192.pair
  local pow = _g192.pow
  local random = _g192.random
  local read_file = _g192["read-file"]
  local reduce = _g192.reduce
  local replicate = _g192.replicate
  local reverse = _g192.reverse
  local sd = _g192.sd
  local search = _g192.search
  local setenv = _g192.setenv
  local sin = _g192.sin
  local sinh = _g192.sinh
  local some63 = _g192["some?"]
  local sort = _g192.sort
  local space = _g192.space
  local splice = _g192.splice
  local split = _g192.split
  local sqrt = _g192.sqrt
  local stash = _g192.stash
  local string = _g192.string
  local string_literal63 = _g192["string-literal?"]
  local string63 = _g192["string?"]
  local sub = _g192.sub
  local sublist = _g192.sublist
  local substring = _g192.substring
  local table63 = _g192["table?"]
  local tan = _g192.tan
  local tanh = _g192.tanh
  local td = _g192.td
  local tl = _g192.tl
  local today = _g192.today
  local toplevel63 = _g192["toplevel?"]
  local unstash = _g192.unstash
  local write = _g192.write
  local write_file = _g192["write-file"]
  local _g195 = nexus["lumen/utilities"]
  local bind = _g195.bind
  local bind42 = _g195["bind*"]
  local bound63 = _g195["bound?"]
  local getenv = _g195.getenv
  local id = _g195.id
  local imported = _g195.imported
  local indentation = _g195.indentation
  local initial_environment = _g195["initial-environment"]
  local linked = _g195.linked
  local macro_function = _g195["macro-function"]
  local macro63 = _g195["macro?"]
  local macroexpand = _g195.macroexpand
  local mapo = _g195.mapo
  local quasiexpand = _g195.quasiexpand
  local quote_environment = _g195["quote-environment"]
  local quote_modules = _g195["quote-modules"]
  local quoted = _g195.quoted
  local reserved63 = _g195["reserved?"]
  local sortk = _g195.sortk
  local special_form63 = _g195["special-form?"]
  local special63 = _g195["special?"]
  local stash42 = _g195["stash*"]
  local statement63 = _g195["statement?"]
  local symbol_expansion = _g195["symbol-expansion"]
  local symbol63 = _g195["symbol?"]
  local valid_id63 = _g195["valid-id?"]
  local variable63 = _g195["variable?"]
  local _g196 = nexus["lumen/compiler"]
  local compile = _g196.compile
  local compile_function = _g196["compile-function"]
  local compile_module = _g196["compile-module"]
  local declare = _g196.declare
  local eval = _g196.eval
  local import_modules = _g196["import-modules"]
  local in_module = _g196["in-module"]
  local load_module = _g196["load-module"]
  local open_module = _g196["open-module"]
end)();
(function ()
  nexus["lumen/core"] = {}
  local _g376 = nexus["lumen/runtime"]
  local _37 = _g376["%"]
  local _37message_handler = _g376["%message-handler"]
  local _42 = _g376["*"]
  local _43 = _g376["+"]
  local _ = _g376["-"]
  local _47 = _g376["/"]
  local _60 = _g376["<"]
  local _6061 = _g376["<="]
  local _61 = _g376["="]
  local _62 = _g376[">"]
  local _6261 = _g376[">="]
  local abs = _g376.abs
  local acos = _g376.acos
  local add = _g376.add
  local apply = _g376.apply
  local asin = _g376.asin
  local atan = _g376.atan
  local atan2 = _g376.atan2
  local atom63 = _g376["atom?"]
  local boolean63 = _g376["boolean?"]
  local cat = _g376.cat
  local ceil = _g376.ceil
  local char = _g376.char
  local code = _g376.code
  local composite63 = _g376["composite?"]
  local cos = _g376.cos
  local drop = _g376.drop
  local empty63 = _g376["empty?"]
  local exclude = _g376.exclude
  local exit = _g376.exit
  local extend = _g376.extend
  local find = _g376.find
  local flat = _g376.flat
  local flat1 = _g376.flat1
  local floor = _g376.floor
  local function63 = _g376["function?"]
  local hd = _g376.hd
  local id_literal63 = _g376["id-literal?"]
  local in63 = _g376["in?"]
  local inner = _g376.inner
  local is63 = _g376["is?"]
  local iterate = _g376.iterate
  local join = _g376.join
  local keep = _g376.keep
  local keys63 = _g376["keys?"]
  local last = _g376.last
  local length = _g376.length
  local list63 = _g376["list?"]
  local log = _g376.log
  local log10 = _g376.log10
  local make_id = _g376["make-id"]
  local map = _g376.map
  local max = _g376.max
  local min = _g376.min
  local module = _g376.module
  local module_key = _g376["module-key"]
  local nil63 = _g376["nil?"]
  local none63 = _g376["none?"]
  local now = _g376.now
  local number = _g376.number
  local number63 = _g376["number?"]
  local one63 = _g376["one?"]
  local pair = _g376.pair
  local pow = _g376.pow
  local random = _g376.random
  local read_file = _g376["read-file"]
  local reduce = _g376.reduce
  local replicate = _g376.replicate
  local reverse = _g376.reverse
  local sd = _g376.sd
  local search = _g376.search
  local setenv = _g376.setenv
  local sin = _g376.sin
  local sinh = _g376.sinh
  local some63 = _g376["some?"]
  local sort = _g376.sort
  local space = _g376.space
  local splice = _g376.splice
  local split = _g376.split
  local sqrt = _g376.sqrt
  local stash = _g376.stash
  local string = _g376.string
  local string_literal63 = _g376["string-literal?"]
  local string63 = _g376["string?"]
  local sub = _g376.sub
  local sublist = _g376.sublist
  local substring = _g376.substring
  local table63 = _g376["table?"]
  local tan = _g376.tan
  local tanh = _g376.tanh
  local td = _g376.td
  local tl = _g376.tl
  local today = _g376.today
  local toplevel63 = _g376["toplevel?"]
  local unstash = _g376.unstash
  local write = _g376.write
  local write_file = _g376["write-file"]
  local _g379 = nexus["lumen/utilities"]
  local bind = _g379.bind
  local bind42 = _g379["bind*"]
  local bound63 = _g379["bound?"]
  local getenv = _g379.getenv
  local id = _g379.id
  local imported = _g379.imported
  local indentation = _g379.indentation
  local initial_environment = _g379["initial-environment"]
  local linked = _g379.linked
  local macro_function = _g379["macro-function"]
  local macro63 = _g379["macro?"]
  local macroexpand = _g379.macroexpand
  local mapo = _g379.mapo
  local quasiexpand = _g379.quasiexpand
  local quote_environment = _g379["quote-environment"]
  local quote_modules = _g379["quote-modules"]
  local quoted = _g379.quoted
  local reserved63 = _g379["reserved?"]
  local sortk = _g379.sortk
  local special_form63 = _g379["special-form?"]
  local special63 = _g379["special?"]
  local stash42 = _g379["stash*"]
  local statement63 = _g379["statement?"]
  local symbol_expansion = _g379["symbol-expansion"]
  local symbol63 = _g379["symbol?"]
  local valid_id63 = _g379["valid-id?"]
  local variable63 = _g379["variable?"]
  local _g380 = nexus["lumen/compiler"]
  local compile = _g380.compile
  local compile_function = _g380["compile-function"]
  local compile_module = _g380["compile-module"]
  local declare = _g380.declare
  local eval = _g380.eval
  local import_modules = _g380["import-modules"]
  local in_module = _g380["in-module"]
  local load_module = _g380["load-module"]
  local open_module = _g380["open-module"]
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
  local sublist = _g680.sublist
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
    local _g704 = sub(bs, 0)
    return({"set", a, join({"cat", a}, _g704)})
  end}, dec = {export = true, macro = function (n, by)
    return({"set", n, {"-", n, by or 1}})
  end}, define = {export = true, macro = function (name, x, ...)
    local body = unstash({...})
    local _g707 = sub(body, 0)
    setenv(name, {_stash = true, variable = true})
    if some63(_g707) and target == "js" then
      return(linked(name, {"%local", name, join({"fn", x}, _g707)}))
    else
      if some63(_g707) then
        local _g708 = bind42(x, _g707)
        local args = _g708[1]
        local _g709 = _g708[2]
        return(linked(name, join({"%local-function", name, args}, _g709)))
      else
        return(linked(name, {"%local", name, x}))
      end
    end
  end}, ["define*"] = {export = true, macro = function (name, x, ...)
    local body = unstash({...})
    local _g699 = sub(body, 0)
    setenv(name, {_stash = true, export = true, global = true})
    if some63(_g699) then
      local _g700 = bind42(x, _g699)
      local args = _g700[1]
      local _g701 = _g700[2]
      return(join({"%global-function", name, args}, _g701))
    else
      if target == "js" then
        return({"set", {"get", "global", {"quote", id(name)}}, x})
      else
        return({"set", name, x})
      end
    end
  end}, ["define-macro"] = {export = true, macro = function (name, args, ...)
    local body = unstash({...})
    local _g723 = sub(body, 0)
    local form = join({"fn", args}, _g723)
    local _g724 = {"setenv", {"quote", name}}
    _g724.form = {"quote", form}
    _g724.macro = form
    eval(_g724)
    return(nil)
  end}, ["define-module"] = {export = true, macro = function (spec, ...)
    local body = unstash({...})
    local _g734 = sub(body, 0)
    local imp = _g734.import
    local exp = _g734.export
    local alias = _g734.alias
    local _g735 = import_modules(imp)
    local imports = _g735[1]
    local bindings = _g735[2]
    local k = module_key(spec)
    modules[k] = {alias = alias, export = {}, import = imports}
    local _g736 = exp or {}
    local _g737 = 0
    while _g737 < length(_g736) do
      local x = _g736[_g737 + 1]
      setenv(x, {_stash = true, export = true})
      _g737 = _g737 + 1
    end
    return(join({"do", {"set", {"get", "nexus", {"quote", k}}, {"table"}}}, bindings))
  end}, ["define-special"] = {export = true, macro = function (name, args, ...)
    local body = unstash({...})
    local _g702 = sub(body, 0)
    local form = join({"fn", args}, _g702)
    local keys = sub(_g702, length(_g702))
    local _g703 = {"setenv", {"quote", name}}
    _g703.form = {"quote", form}
    _g703.special = form
    eval(join(_g703, keys))
    return(nil)
  end}, ["define-symbol"] = {export = true, macro = function (name, expansion)
    setenv(name, {_stash = true, symbol = expansion})
    return(nil)
  end}, each = {export = true, macro = function (b, t, ...)
    local body = unstash({...})
    local _g738 = sub(body, 0)
    local k = b[1]
    local v = b[2]
    local t1 = make_id()
    local _g770
    if nil63(v) then
      local _g771
      if b.i then
        _g771 = "i"
      else
        _g771 = make_id()
      end
      local i = _g771
      _g770 = {"let", {i, 0}, {"while", {"<", i, {"length", t1}}, join({"let", {k, {"at", t1, i}}}, _g738), {"inc", i}}}
    else
      local _g739 = {"target"}
      _g739.js = {"isNaN", {"parseInt", k}}
      _g739.lua = {"not", {"number?", k}}
      _g770 = {"let", {k, "nil"}, {"%for", t1, k, {"when", _g739, join({"let", {v, {"get", t1, k}}}, _g738)}}}
    end
    return({"let", {t1, t}, _g770})
  end}, fn = {export = true, macro = function (args, ...)
    local body = unstash({...})
    local _g710 = sub(body, 0)
    local _g711 = bind42(args, _g710)
    local _g712 = _g711[1]
    local _g713 = _g711[2]
    return(join({"%function", _g712}, _g713))
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
    local function step(_g730)
      local a = _g730[1]
      local b = _g730[2]
      local c = sub(_g730, 2)
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
    local _g706 = sub(bs, 0)
    return({"set", a, join({"join*", a}, _g706)})
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
  end}, ["let-macro"] = {export = true, macro = function (definitions, ...)
    local body = unstash({...})
    local _g714 = sub(body, 0)
    add(environment, {})
    map(function (m)
      return(macroexpand(join({"define-macro"}, m)))
    end, definitions)
    local _g715 = join({"do"}, macroexpand(_g714))
    drop(environment)
    return(_g715)
  end}, ["let-symbol"] = {export = true, macro = function (expansions, ...)
    local body = unstash({...})
    local _g731 = sub(body, 0)
    add(environment, {})
    map(function (_g733)
      local name = _g733[1]
      local exp = _g733[2]
      return(macroexpand({"define-symbol", name, exp}))
    end, pair(expansions))
    local _g732 = join({"do"}, macroexpand(_g731))
    drop(environment)
    return(_g732)
  end}, list = {export = true, macro = function (...)
    local body = unstash({...})
    local l = join({"%array"}, body)
    if not keys63(body) then
      return(l)
    else
      local id = make_id()
      local init = {}
      local _g697 = body
      local k = nil
      for k in next, _g697 do
        if not number63(k) then
          local v = _g697[k]
          add(init, {k, {"set", {"get", id, {"quote", k}}, v}})
        end
      end
      return(join({"let", {id, l}}, join(map(sd, sortk(init, hd)), {id})))
    end
  end}, pr = {export = true, macro = function (...)
    local xs = unstash({...})
    local _g698 = map(function (x)
      return(splice({{"string", x}, "\" \""}))
    end, xs)
    return({"print", join({"cat"}, _g698)})
  end}, quasiquote = {export = true, macro = function (form)
    return(quasiexpand(form, 1))
  end}, quote = {export = true, macro = function (form)
    return(quoted(form))
  end}, ["set*"] = {export = true, macro = function (name, value)
    return(linked(name, {"set", name, value}))
  end}, ["set-of"] = {export = true, macro = function (...)
    local elements = unstash({...})
    local l = {}
    local _g721 = elements
    local _g722 = 0
    while _g722 < length(_g721) do
      local e = _g721[_g722 + 1]
      l[e] = true
      _g722 = _g722 + 1
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
    local _g729 = sub(body, 0)
    return({"if", {"not", cond}, join({"do"}, _g729)})
  end}, when = {export = true, macro = function (cond, ...)
    local body = unstash({...})
    local _g705 = sub(body, 0)
    return({"if", cond, join({"do"}, _g705)})
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
    local _g740 = sub(body, 0)
    local scope = body.scope
    local x = make_id()
    local _g741 = {"table"}
    _g741._scope = scope
    return({"do", {"add", "environment", _g741}, {"let", {x, join({"do"}, _g740)}, {"drop", "environment"}, x}})
  end}}, import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}, {"lumen", "utilities"}, {"lumen", "compiler"}}}, ["lumen/main"] = {export = {}, import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}, {"lumen", "reader"}, {"lumen", "compiler"}}}, ["lumen/reader"] = {export = {["define-reader"] = {export = true, macro = function (_g764, ...)
    local char = _g764[1]
    local stream = _g764[2]
    local body = unstash({...})
    local _g765 = sub(body, 0)
    return({"set", {"get", "read-table", char}, join({"fn", {stream}}, _g765)})
  end}, delimiters = {variable = true}, eof = {variable = true}, ["flag?"] = {variable = true}, ["key?"] = {variable = true}, ["make-stream"] = {export = true, variable = true}, ["peek-char"] = {variable = true}, read = {export = true, variable = true}, ["read-all"] = {export = true, variable = true}, ["read-char"] = {variable = true}, ["read-from-string"] = {export = true, variable = true}, ["read-table"] = {export = true, variable = true}, ["skip-non-code"] = {variable = true}, whitespace = {variable = true}}, import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}}}, ["lumen/runtime"] = {export = {["%"] = {export = true, variable = true}, ["%message-handler"] = {export = true, variable = true}, ["*"] = {export = true, variable = true}, ["+"] = {export = true, variable = true}, ["-"] = {export = true, variable = true}, ["/"] = {export = true, variable = true}, ["<"] = {export = true, variable = true}, ["<="] = {export = true, variable = true}, ["="] = {export = true, variable = true}, [">"] = {export = true, variable = true}, [">="] = {export = true, variable = true}, abs = {export = true, variable = true}, acos = {export = true, variable = true}, add = {export = true, variable = true}, apply = {export = true, variable = true}, asin = {export = true, variable = true}, atan = {export = true, variable = true}, atan2 = {export = true, variable = true}, ["atom?"] = {export = true, variable = true}, ["boolean?"] = {export = true, variable = true}, cat = {export = true, variable = true}, ceil = {export = true, variable = true}, char = {export = true, variable = true}, code = {export = true, variable = true}, ["composite?"] = {export = true, variable = true}, cos = {export = true, variable = true}, drop = {export = true, variable = true}, ["empty?"] = {export = true, variable = true}, exclude = {export = true, variable = true}, exit = {export = true, variable = true}, extend = {export = true, variable = true}, find = {export = true, variable = true}, flat = {export = true, variable = true}, flat1 = {export = true, variable = true}, floor = {export = true, variable = true}, ["function?"] = {export = true, variable = true}, hd = {export = true, variable = true}, ["id-count"] = {variable = true}, ["id-literal?"] = {export = true, variable = true}, ["in?"] = {export = true, variable = true}, inner = {export = true, variable = true}, ["is?"] = {export = true, variable = true}, iterate = {export = true, variable = true}, join = {export = true, variable = true}, keep = {export = true, variable = true}, ["keys?"] = {export = true, variable = true}, last = {export = true, variable = true}, length = {export = true, variable = true}, ["list?"] = {export = true, variable = true}, log = {export = true, variable = true}, log10 = {export = true, variable = true}, ["make-id"] = {export = true, variable = true}, map = {export = true, variable = true}, mapl = {variable = true}, math = {variable = true}, max = {export = true, variable = true}, min = {export = true, variable = true}, module = {export = true, variable = true}, ["module-key"] = {export = true, variable = true}, ["nil?"] = {export = true, variable = true}, ["none?"] = {export = true, variable = true}, now = {export = true, variable = true}, number = {export = true, variable = true}, ["number?"] = {export = true, variable = true}, ["one?"] = {export = true, variable = true}, pair = {export = true, variable = true}, pow = {export = true, variable = true}, random = {export = true, variable = true}, ["read-file"] = {export = true, variable = true}, reduce = {export = true, variable = true}, replicate = {export = true, variable = true}, reverse = {export = true, variable = true}, sd = {export = true, variable = true}, search = {export = true, variable = true}, setenv = {export = true, variable = true}, sin = {export = true, variable = true}, sinh = {export = true, variable = true}, ["some?"] = {export = true, variable = true}, sort = {export = true, variable = true}, space = {export = true, variable = true}, splice = {export = true, variable = true}, ["splice?"] = {variable = true}, split = {export = true, variable = true}, sqrt = {export = true, variable = true}, stash = {export = true, variable = true}, string = {export = true, variable = true}, ["string-literal?"] = {export = true, variable = true}, ["string?"] = {export = true, variable = true}, sub = {export = true, variable = true}, sublist = {export = true, variable = true}, substring = {export = true, variable = true}, ["table?"] = {export = true, variable = true}, tan = {export = true, variable = true}, tanh = {export = true, variable = true}, td = {export = true, variable = true}, tl = {export = true, variable = true}, today = {export = true, variable = true}, ["toplevel?"] = {export = true, variable = true}, unstash = {export = true, variable = true}, write = {export = true, variable = true}, ["write-file"] = {export = true, variable = true}}, import = {{"lumen", "special"}, {"lumen", "core"}}}, ["lumen/special"] = {export = {["%array"] = {export = true, foo = true, special = function (...)
    local forms = unstash({...})
    local _g782
    if target == "lua" then
      _g782 = "{"
    else
      _g782 = "["
    end
    local open = _g782
    local _g783
    if target == "lua" then
      _g783 = "}"
    else
      _g783 = "]"
    end
    local close = _g783
    local str = ""
    local _g759 = forms
    local i = 0
    while i < length(_g759) do
      local x = _g759[i + 1]
      str = str .. compile(x)
      if i < length(forms) - 1 then
        str = str .. ", "
      end
      i = i + 1
    end
    return(open .. str .. close)
  end}, ["%for"] = {export = true, foo = true, special = function (t, k, form)
    local _g760 = compile(t)
    local ind = indentation()
    indent_level = indent_level + 1
    local _g761 = compile(form, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local body = _g761
    if target == "lua" then
      return(ind .. "for " .. k .. " in next, " .. _g760 .. " do\n" .. body .. ind .. "end\n")
    else
      return(ind .. "for (" .. k .. " in " .. _g760 .. ") {\n" .. body .. ind .. "}\n")
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
    local _g750 = compile(cond)
    indent_level = indent_level + 1
    local _g753 = compile(cons, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local _g751 = _g753
    local _g773
    if alt then
      indent_level = indent_level + 1
      local _g754 = compile(alt, {_stash = true, stmt = true})
      indent_level = indent_level - 1
      _g773 = _g754
    end
    local _g752 = _g773
    local ind = indentation()
    local str = ""
    if target == "js" then
      str = str .. ind .. "if (" .. _g750 .. ") {\n" .. _g751 .. ind .. "}"
    else
      str = str .. ind .. "if " .. _g750 .. " then\n" .. _g751
    end
    if _g752 and target == "js" then
      str = str .. " else {\n" .. _g752 .. ind .. "}"
    else
      if _g752 then
        str = str .. ind .. "else\n" .. _g752
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
    local _g775
    if is63(value) then
      _g775 = " = " .. value1
    else
      _g775 = ""
    end
    local rh = _g775
    local _g776
    if target == "js" then
      _g776 = "var "
    else
      _g776 = "local "
    end
    local keyword = _g776
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
    local _g755 = pairs
    local i = 0
    while i < length(_g755) do
      local _g756 = _g755[i + 1]
      local k = _g756[1]
      local v = _g756[2]
      if not string63(k) then
        error("Illegal key: " .. string(k))
      end
      local _g757 = compile(v)
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
      local _g758 = _g778
      str = str .. _g758 .. sep .. _g757
      if i < length(pairs) - 1 then
        str = str .. ", "
      end
      i = i + 1
    end
    return(str .. "}")
  end}, ["%try"] = {export = true, foo = true, special = function (form)
    local ind = indentation()
    indent_level = indent_level + 1
    local _g748 = compile(form, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local body = _g748
    local e = make_id()
    local hf = {"return", {"%array", false, {"get", e, "\"message\""}}}
    indent_level = indent_level + 1
    local _g749 = compile(hf, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local h = _g749
    return(ind .. "try {\n" .. body .. ind .. "}\n" .. ind .. "catch (" .. e .. ") {\n" .. h .. ind .. "}\n")
  end, stmt = true, tr = true}, ["break"] = {export = true, foo = true, special = function ()
    return(indentation() .. "break")
  end, stmt = true}, ["do"] = {export = true, foo = true, special = function (...)
    local forms = unstash({...})
    local str = ""
    local _g742 = forms
    local _g743 = 0
    while _g743 < length(_g742) do
      local x = _g742[_g743 + 1]
      str = str .. compile(x, {_stash = true, stmt = true})
      _g743 = _g743 + 1
    end
    return(str)
  end, stmt = true, tr = true}, ["error"] = {export = true, foo = true, special = function (x)
    local _g774
    if target == "js" then
      _g774 = "throw new " .. compile({"Error", x})
    else
      _g774 = "error(" .. compile(x) .. ")"
    end
    local e = _g774
    return(indentation() .. e)
  end, stmt = true}, ["get"] = {export = true, foo = true, special = function (t, k)
    local _g763 = compile(t)
    local k1 = compile(k)
    if target == "lua" and char(_g763, 0) == "{" then
      _g763 = "(" .. _g763 .. ")"
    end
    if string_literal63(k) and valid_id63(inner(k)) then
      return(_g763 .. "." .. inner(k))
    else
      return(_g763 .. "[" .. k1 .. "]")
    end
  end}, ["not"] = {}, ["return"] = {export = true, foo = true, special = function (x)
    local _g784
    if nil63(x) then
      _g784 = "return"
    else
      _g784 = "return(" .. compile(x) .. ")"
    end
    local _g762 = _g784
    return(indentation() .. _g762)
  end, stmt = true}, ["set"] = {export = true, foo = true, special = function (lh, rh)
    local _g744 = compile(lh)
    local _g772
    if nil63(rh) then
      _g772 = "nil"
    else
      _g772 = rh
    end
    local _g745 = compile(_g772)
    return(indentation() .. _g744 .. " = " .. _g745)
  end, stmt = true}, ["while"] = {export = true, foo = true, special = function (cond, form)
    local _g746 = compile(cond)
    indent_level = indent_level + 1
    local _g747 = compile(form, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local body = _g747
    local ind = indentation()
    if target == "js" then
      return(ind .. "while (" .. _g746 .. ") {\n" .. body .. ind .. "}\n")
    else
      return(ind .. "while " .. _g746 .. " do\n" .. body .. ind .. "end\n")
    end
  end, stmt = true, tr = true}}, import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}, {"lumen", "utilities"}, {"lumen", "compiler"}}}, ["lumen/system"] = {export = {nexus = {export = true, global = true}}, import = {{"lumen", "special"}, {"lumen", "core"}}}, ["lumen/utilities"] = {export = {bind = {export = true, variable = true}, ["bind*"] = {export = true, variable = true}, ["bound?"] = {export = true, variable = true}, ["can-unquote?"] = {variable = true}, escape = {variable = true}, getenv = {export = true, variable = true}, ["global?"] = {variable = true}, id = {export = true, variable = true}, imported = {export = true, variable = true}, ["indent-level"] = {export = true, global = true}, indentation = {export = true, variable = true}, ["initial-environment"] = {export = true, variable = true}, linked = {export = true, variable = true}, ["macro-function"] = {export = true, variable = true}, ["macro?"] = {export = true, variable = true}, macroexpand = {export = true, variable = true}, mapo = {export = true, variable = true}, ["numeric?"] = {variable = true}, quasiexpand = {export = true, variable = true}, ["quasiquote-list"] = {variable = true}, ["quasiquoting?"] = {variable = true}, ["quasisplice?"] = {variable = true}, ["quote-binding"] = {variable = true}, ["quote-environment"] = {export = true, variable = true}, ["quote-frame"] = {variable = true}, ["quote-module"] = {variable = true}, ["quote-modules"] = {export = true, variable = true}, quoted = {export = true, variable = true}, ["quoting?"] = {variable = true}, reserved = {variable = true}, ["reserved?"] = {export = true, variable = true}, sortk = {export = true, variable = true}, ["special-form?"] = {export = true, variable = true}, ["special?"] = {export = true, variable = true}, ["stash*"] = {export = true, variable = true}, ["statement?"] = {export = true, variable = true}, ["symbol-expansion"] = {export = true, variable = true}, ["symbol?"] = {export = true, variable = true}, ["valid-char?"] = {variable = true}, ["valid-id?"] = {export = true, variable = true}, ["variable?"] = {export = true, variable = true}, ["with-indent"] = {export = true, macro = function (form)
    local result = make_id()
    return({"do", {"inc", "indent-level"}, {"let", {result, form}, {"dec", "indent-level"}, result}})
  end}}, import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}}}, user = {export = {}, import = {"lumen", {"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}}}}
  environment = {{["define-module"] = {export = true, macro = function (spec, ...)
    local body = unstash({...})
    local _g766 = sub(body, 0)
    local imp = _g766.import
    local exp = _g766.export
    local alias = _g766.alias
    local _g767 = import_modules(imp)
    local imports = _g767[1]
    local bindings = _g767[2]
    local k = module_key(spec)
    modules[k] = {alias = alias, export = {}, import = imports}
    local _g768 = exp or {}
    local _g769 = 0
    while _g769 < length(_g768) do
      local x = _g768[_g769 + 1]
      setenv(x, {_stash = true, export = true})
      _g769 = _g769 + 1
    end
    return(join({"do", {"set", {"get", "nexus", {"quote", k}}, {"table"}}}, bindings))
  end}}}
end)();
(function ()
  nexus.user = {}
  local _g785 = nexus["lumen/runtime"]
  local _37 = _g785["%"]
  local _37message_handler = _g785["%message-handler"]
  local _42 = _g785["*"]
  local _43 = _g785["+"]
  local _ = _g785["-"]
  local _47 = _g785["/"]
  local _60 = _g785["<"]
  local _6061 = _g785["<="]
  local _61 = _g785["="]
  local _62 = _g785[">"]
  local _6261 = _g785[">="]
  local abs = _g785.abs
  local acos = _g785.acos
  local add = _g785.add
  local apply = _g785.apply
  local asin = _g785.asin
  local atan = _g785.atan
  local atan2 = _g785.atan2
  local atom63 = _g785["atom?"]
  local boolean63 = _g785["boolean?"]
  local cat = _g785.cat
  local ceil = _g785.ceil
  local char = _g785.char
  local code = _g785.code
  local composite63 = _g785["composite?"]
  local cos = _g785.cos
  local drop = _g785.drop
  local empty63 = _g785["empty?"]
  local exclude = _g785.exclude
  local exit = _g785.exit
  local extend = _g785.extend
  local find = _g785.find
  local flat = _g785.flat
  local flat1 = _g785.flat1
  local floor = _g785.floor
  local function63 = _g785["function?"]
  local hd = _g785.hd
  local id_literal63 = _g785["id-literal?"]
  local in63 = _g785["in?"]
  local inner = _g785.inner
  local is63 = _g785["is?"]
  local iterate = _g785.iterate
  local join = _g785.join
  local keep = _g785.keep
  local keys63 = _g785["keys?"]
  local last = _g785.last
  local length = _g785.length
  local list63 = _g785["list?"]
  local log = _g785.log
  local log10 = _g785.log10
  local make_id = _g785["make-id"]
  local map = _g785.map
  local max = _g785.max
  local min = _g785.min
  local module = _g785.module
  local module_key = _g785["module-key"]
  local nil63 = _g785["nil?"]
  local none63 = _g785["none?"]
  local now = _g785.now
  local number = _g785.number
  local number63 = _g785["number?"]
  local one63 = _g785["one?"]
  local pair = _g785.pair
  local pow = _g785.pow
  local random = _g785.random
  local read_file = _g785["read-file"]
  local reduce = _g785.reduce
  local replicate = _g785.replicate
  local reverse = _g785.reverse
  local sd = _g785.sd
  local search = _g785.search
  local setenv = _g785.setenv
  local sin = _g785.sin
  local sinh = _g785.sinh
  local some63 = _g785["some?"]
  local sort = _g785.sort
  local space = _g785.space
  local splice = _g785.splice
  local split = _g785.split
  local sqrt = _g785.sqrt
  local stash = _g785.stash
  local string = _g785.string
  local string_literal63 = _g785["string-literal?"]
  local string63 = _g785["string?"]
  local sub = _g785.sub
  local sublist = _g785.sublist
  local substring = _g785.substring
  local table63 = _g785["table?"]
  local tan = _g785.tan
  local tanh = _g785.tanh
  local td = _g785.td
  local tl = _g785.tl
  local today = _g785.today
  local toplevel63 = _g785["toplevel?"]
  local unstash = _g785.unstash
  local write = _g785.write
  local write_file = _g785["write-file"]
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
  local sublist = _g2.sublist
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
    local _g789,_g790 = xpcall(function ()
      return(eval(read_from_string(str)))
    end, _37message_handler)
    local _g788 = {_g789, _g790}
    local _g1 = _g788[1]
    local x = _g788[2]
    if is63(x) then
      return(print(string(x) .. " "))
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
    print(string("usage: lumen [options] <module>") .. " ")
    print(string("options:") .. " ")
    print(string("  -o <output>\tOutput file") .. " ")
    print(string("  -t <target>\tTarget language (default: lua)") .. " ")
    print(string("  -e <expr>\tExpression to evaluate") .. " ")
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
    local _g791 = args
    local i = 0
    while i < length(_g791) do
      local arg = _g791[i + 1]
      if arg == "-o" or arg == "-t" or arg == "-e" then
        if i == length(args) - 1 then
          print(string("missing argument for") .. " " .. string(arg) .. " ")
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
