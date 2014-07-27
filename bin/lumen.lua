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
  local function in63(x, l)
    local _g26 = l
    local _g27 = 0
    while _g27 < length(_g26) do
      local y = _g26[_g27 + 1]
      if x == y then
        return(true)
      end
      _g27 = _g27 + 1
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
    local _g28 = upto or length(l)
    local l2 = {}
    while i < _g28 do
      l2[j + 1] = l[i + 1]
      i = i + 1
      j = j + 1
    end
    return(l2)
  end
  nexus["lumen/runtime"].sublist = sublist
  local function sub(x, from, upto)
    local _g29 = from or 0
    if string63(x) then
      return(substring(x, _g29, upto))
    else
      local l = sublist(x, _g29, upto)
      local _g30 = x
      local k = nil
      for k in next, _g30 do
        if not number63(k) then
          local v = _g30[k]
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
          local _g31 = l1
          local k = nil
          for k in next, _g31 do
            if not number63(k) then
              local v = _g31[k]
              l[k] = v
            end
          end
          local _g32 = l2
          local k = nil
          for k in next, _g32 do
            if not number63(k) then
              local v = _g32[k]
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
      if length(x) == 1 then
        return(hd(x))
      else
        return(f(hd(x), reduce(f, tl(x))))
      end
    end
  end
  nexus["lumen/runtime"].reduce = reduce
  local function keep(f, l)
    local l1 = {}
    local _g33 = l
    local _g34 = 0
    while _g34 < length(_g33) do
      local x = _g33[_g34 + 1]
      if f(x) then
        add(l1, x)
      end
      _g34 = _g34 + 1
    end
    return(l1)
  end
  nexus["lumen/runtime"].keep = keep
  local function find(f, l)
    local _g35 = l
    local _g36 = 0
    while _g36 < length(_g35) do
      local x = _g35[_g36 + 1]
      local _g37 = f(x)
      if _g37 then
        return(_g37)
      end
      _g36 = _g36 + 1
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
    local _g38 = l
    local _g39 = 0
    while _g39 < length(_g38) do
      local x = _g38[_g39 + 1]
      local _g40 = f(x)
      if splice63(_g40) then
        l1 = join(l1, _g40.value)
      else
        if is63(_g40) then
          add(l1, _g40)
        end
      end
      _g39 = _g39 + 1
    end
    return(l1)
  end
  nexus["lumen/runtime"].mapl = mapl
  local function map(f, t)
    local l = mapl(f, t)
    local _g41 = t
    local k = nil
    for k in next, _g41 do
      if not number63(k) then
        local v = _g41[k]
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
    local _g42 = t
    local k = nil
    for k in next, _g42 do
      if not number63(k) then
        local v = _g42[k]
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
      local _g43 = args
      local k = nil
      for k in next, _g43 do
        if not number63(k) then
          local v = _g43[k]
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
        local _g44 = l
        local k = nil
        for k in next, _g44 do
          if not number63(k) then
            local v = _g44[k]
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
    local _g45 = sub(xs, 0)
    return(join(t, _g45))
  end
  nexus["lumen/runtime"].extend = extend
  local function exclude(t, ...)
    local keys = unstash({...})
    local _g46 = sub(keys, 0)
    local t1 = sublist(t)
    local _g47 = t
    local k = nil
    for k in next, _g47 do
      if not number63(k) then
        local v = _g47[k]
        if not _g46[k] then
          t1[k] = v
        end
      end
    end
    return(t1)
  end
  nexus["lumen/runtime"].exclude = exclude
  local function search(str, pattern, start)
    local _g61
    if start then
      _g61 = start + 1
    end
    local _g48 = _g61
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
    local _g49 = sub(xs, 0)
    if none63(_g49) then
      return("")
    else
      return(reduce(function (a, b)
        return(a .. b)
      end, _g49))
    end
  end
  nexus["lumen/runtime"].cat = cat
  local function _43(...)
    local xs = unstash({...})
    local _g50 = sub(xs, 0)
    return(reduce(function (a, b)
      return(a + b)
    end, _g50))
  end
  nexus["lumen/runtime"]["+"] = _43
  local function _(...)
    local xs = unstash({...})
    local _g51 = sub(xs, 0)
    return(reduce(function (a, b)
      return(b - a)
    end, reverse(_g51)))
  end
  nexus["lumen/runtime"]["-"] = _
  local function _42(...)
    local xs = unstash({...})
    local _g52 = sub(xs, 0)
    return(reduce(function (a, b)
      return(a * b)
    end, _g52))
  end
  nexus["lumen/runtime"]["*"] = _42
  local function _47(...)
    local xs = unstash({...})
    local _g53 = sub(xs, 0)
    return(reduce(function (a, b)
      return(b / a)
    end, reverse(_g53)))
  end
  nexus["lumen/runtime"]["/"] = _47
  local function _37(...)
    local xs = unstash({...})
    local _g54 = sub(xs, 0)
    return(reduce(function (a, b)
      return(b % a)
    end, reverse(_g54)))
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
            local _g55 = x
            local k = nil
            for k in next, _g55 do
              if not number63(k) then
                local v = _g55[k]
                add(x1, k .. ":")
                add(x1, v)
              end
            end
            local _g56 = x1
            local i = 0
            while i < length(_g56) do
              local y = _g56[i + 1]
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
  local function apply(f, args)
    local _g57 = stash(args)
    return(f(unpack(_g57)))
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
    return(length(environment) == 1)
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
    local _g58 = sub(keys, 0)
    if string63(k) then
      local frame = last(environment)
      local x = frame[k] or {}
      local _g59 = _g58
      local k1 = nil
      for k1 in next, _g59 do
        if not number63(k1) then
          local v = _g59[k1]
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
  local _g66 = nexus["lumen/runtime"]
  local _37 = _g66["%"]
  local _37message_handler = _g66["%message-handler"]
  local _42 = _g66["*"]
  local _43 = _g66["+"]
  local _ = _g66["-"]
  local _47 = _g66["/"]
  local _60 = _g66["<"]
  local _6061 = _g66["<="]
  local _61 = _g66["="]
  local _62 = _g66[">"]
  local _6261 = _g66[">="]
  local abs = _g66.abs
  local acos = _g66.acos
  local add = _g66.add
  local apply = _g66.apply
  local asin = _g66.asin
  local atan = _g66.atan
  local atan2 = _g66.atan2
  local atom63 = _g66["atom?"]
  local boolean63 = _g66["boolean?"]
  local cat = _g66.cat
  local ceil = _g66.ceil
  local char = _g66.char
  local code = _g66.code
  local composite63 = _g66["composite?"]
  local cos = _g66.cos
  local drop = _g66.drop
  local empty63 = _g66["empty?"]
  local exclude = _g66.exclude
  local exit = _g66.exit
  local extend = _g66.extend
  local find = _g66.find
  local flat = _g66.flat
  local flat1 = _g66.flat1
  local floor = _g66.floor
  local function63 = _g66["function?"]
  local hd = _g66.hd
  local id_literal63 = _g66["id-literal?"]
  local in63 = _g66["in?"]
  local inner = _g66.inner
  local is63 = _g66["is?"]
  local iterate = _g66.iterate
  local join = _g66.join
  local keep = _g66.keep
  local keys63 = _g66["keys?"]
  local last = _g66.last
  local length = _g66.length
  local list63 = _g66["list?"]
  local log = _g66.log
  local log10 = _g66.log10
  local make_id = _g66["make-id"]
  local map = _g66.map
  local max = _g66.max
  local min = _g66.min
  local module = _g66.module
  local module_key = _g66["module-key"]
  local nil63 = _g66["nil?"]
  local none63 = _g66["none?"]
  local now = _g66.now
  local number = _g66.number
  local number63 = _g66["number?"]
  local pair = _g66.pair
  local pow = _g66.pow
  local random = _g66.random
  local read_file = _g66["read-file"]
  local reduce = _g66.reduce
  local replicate = _g66.replicate
  local reverse = _g66.reverse
  local sd = _g66.sd
  local search = _g66.search
  local setenv = _g66.setenv
  local sin = _g66.sin
  local sinh = _g66.sinh
  local some63 = _g66["some?"]
  local sort = _g66.sort
  local splice = _g66.splice
  local split = _g66.split
  local sqrt = _g66.sqrt
  local stash = _g66.stash
  local string = _g66.string
  local string_literal63 = _g66["string-literal?"]
  local string63 = _g66["string?"]
  local sub = _g66.sub
  local sublist = _g66.sublist
  local substring = _g66.substring
  local table63 = _g66["table?"]
  local tan = _g66.tan
  local tanh = _g66.tanh
  local td = _g66.td
  local tl = _g66.tl
  local today = _g66.today
  local toplevel63 = _g66["toplevel?"]
  local unstash = _g66.unstash
  local write = _g66.write
  local write_file = _g66["write-file"]
  local function getenv(k, ...)
    local keys = unstash({...})
    local _g69 = sub(keys, 0)
    if string63(k) then
      local b = find(function (e)
        return(e[k])
      end, reverse(environment))
      if table63(b) then
        local _g70 = nil
        local _g71 = _g69
        local x = nil
        for x in next, _g71 do
          if not number63(x) then
            local _g62 = _g71[x]
            _g70 = x
          end
        end
        if _g70 then
          return(b[_g70])
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
      local _g101
      if c == "\n" then
        _g101 = "\\n"
      else
        local _g102
        if c == "\"" then
          _g102 = "\\\""
        else
          local _g103
          if c == "\\" then
            _g103 = "\\\\"
          else
            _g103 = c
          end
          _g102 = _g103
        end
        _g101 = _g102
      end
      local c1 = _g101
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
      local _g72 = args
      local k = nil
      for k in next, _g72 do
        if not number63(k) then
          local v = _g72[k]
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
          local _g63 = form[1]
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
          local _g78 = join({"%function", map(macroexpand, args)}, macroexpand(body))
          drop(environment)
          return(_g78)
        else
          if x == "%local-function" or x == "%global-function" then
            local _g64 = form[1]
            local name = form[2]
            local _g81 = form[3]
            local _g82 = sub(form, 3)
            add(environment, {_scope = true})
            local _g85 = _g81
            local _g86 = 0
            while _g86 < length(_g85) do
              local _g83 = _g85[_g86 + 1]
              setenv(_g83, {_stash = true, variable = true})
              _g86 = _g86 + 1
            end
            local _g84 = join({x, name, map(macroexpand, _g81)}, macroexpand(_g82))
            drop(environment)
            return(_g84)
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
    local _g87 = form
    local k = nil
    for k in next, _g87 do
      if not number63(k) then
        local v = _g87[k]
        local _g104
        if quasisplice63(v, depth) then
          _g104 = quasiexpand(v[2])
        else
          _g104 = quasiexpand(v, depth)
        end
        local _g88 = _g104
        last(xs)[k] = _g88
      end
    end
    local _g89 = form
    local _g90 = 0
    while _g90 < length(_g89) do
      local x = _g89[_g90 + 1]
      if quasisplice63(x, depth) then
        local _g91 = quasiexpand(x[2])
        add(xs, _g91)
        add(xs, {"list"})
      else
        add(last(xs), quasiexpand(x, depth))
      end
      _g90 = _g90 + 1
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
      local _g105
      if c == "-" then
        _g105 = "_"
      else
        local _g106
        if valid_char63(n) then
          _g106 = c
        else
          local _g107
          if i == 0 then
            _g107 = "_" .. n
          else
            _g107 = n
          end
          _g106 = _g107
        end
        _g105 = _g106
      end
      local c1 = _g105
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
    local _g97 = unstash({...})
    local all = _g97.all
    local m = make_id()
    local k = module_key(spec)
    local imports = {}
    if nexus[k] then
      local _g98 = module(spec).export
      local n = nil
      for n in next, _g98 do
        if not number63(n) then
          local b = _g98[n]
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
    local _g99 = t
    local k = nil
    for k in next, _g99 do
      if not number63(k) then
        local v = _g99[k]
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
    local _g100 = {"table"}
    _g100.alias = quoted(m.alias)
    _g100.export = quote_frame(m.export)
    _g100.import = quoted(m.import)
    return(_g100)
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
  local _g109 = nexus["lumen/runtime"]
  local _37 = _g109["%"]
  local _37message_handler = _g109["%message-handler"]
  local _42 = _g109["*"]
  local _43 = _g109["+"]
  local _ = _g109["-"]
  local _47 = _g109["/"]
  local _60 = _g109["<"]
  local _6061 = _g109["<="]
  local _61 = _g109["="]
  local _62 = _g109[">"]
  local _6261 = _g109[">="]
  local abs = _g109.abs
  local acos = _g109.acos
  local add = _g109.add
  local apply = _g109.apply
  local asin = _g109.asin
  local atan = _g109.atan
  local atan2 = _g109.atan2
  local atom63 = _g109["atom?"]
  local boolean63 = _g109["boolean?"]
  local cat = _g109.cat
  local ceil = _g109.ceil
  local char = _g109.char
  local code = _g109.code
  local composite63 = _g109["composite?"]
  local cos = _g109.cos
  local drop = _g109.drop
  local empty63 = _g109["empty?"]
  local exclude = _g109.exclude
  local exit = _g109.exit
  local extend = _g109.extend
  local find = _g109.find
  local flat = _g109.flat
  local flat1 = _g109.flat1
  local floor = _g109.floor
  local function63 = _g109["function?"]
  local hd = _g109.hd
  local id_literal63 = _g109["id-literal?"]
  local in63 = _g109["in?"]
  local inner = _g109.inner
  local is63 = _g109["is?"]
  local iterate = _g109.iterate
  local join = _g109.join
  local keep = _g109.keep
  local keys63 = _g109["keys?"]
  local last = _g109.last
  local length = _g109.length
  local list63 = _g109["list?"]
  local log = _g109.log
  local log10 = _g109.log10
  local make_id = _g109["make-id"]
  local map = _g109.map
  local max = _g109.max
  local min = _g109.min
  local module = _g109.module
  local module_key = _g109["module-key"]
  local nil63 = _g109["nil?"]
  local none63 = _g109["none?"]
  local now = _g109.now
  local number = _g109.number
  local number63 = _g109["number?"]
  local pair = _g109.pair
  local pow = _g109.pow
  local random = _g109.random
  local read_file = _g109["read-file"]
  local reduce = _g109.reduce
  local replicate = _g109.replicate
  local reverse = _g109.reverse
  local sd = _g109.sd
  local search = _g109.search
  local setenv = _g109.setenv
  local sin = _g109.sin
  local sinh = _g109.sinh
  local some63 = _g109["some?"]
  local sort = _g109.sort
  local splice = _g109.splice
  local split = _g109.split
  local sqrt = _g109.sqrt
  local stash = _g109.stash
  local string = _g109.string
  local string_literal63 = _g109["string-literal?"]
  local string63 = _g109["string?"]
  local sub = _g109.sub
  local sublist = _g109.sublist
  local substring = _g109.substring
  local table63 = _g109["table?"]
  local tan = _g109.tan
  local tanh = _g109.tanh
  local td = _g109.td
  local tl = _g109.tl
  local today = _g109.today
  local toplevel63 = _g109["toplevel?"]
  local unstash = _g109.unstash
  local write = _g109.write
  local write_file = _g109["write-file"]
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
  local _g122 = nexus["lumen/utilities"]
  local bind = _g122.bind
  local bind42 = _g122["bind*"]
  local bound63 = _g122["bound?"]
  local getenv = _g122.getenv
  local id = _g122.id
  local imported = _g122.imported
  local indentation = _g122.indentation
  local initial_environment = _g122["initial-environment"]
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
  local toplevel63 = _g122["toplevel?"]
  local valid_id63 = _g122["valid-id?"]
  local variable63 = _g122["variable?"]
  local _g123 = nexus["lumen/reader"]
  local make_stream = _g123["make-stream"]
  local read = _g123.read
  local read_all = _g123["read-all"]
  local read_from_string = _g123["read-from-string"]
  local read_table = _g123["read-table"]
  local _g124 = nexus["lumen/runtime"]
  local _37 = _g124["%"]
  local _37message_handler = _g124["%message-handler"]
  local _42 = _g124["*"]
  local _43 = _g124["+"]
  local _ = _g124["-"]
  local _47 = _g124["/"]
  local _60 = _g124["<"]
  local _6061 = _g124["<="]
  local _61 = _g124["="]
  local _62 = _g124[">"]
  local _6261 = _g124[">="]
  local abs = _g124.abs
  local acos = _g124.acos
  local add = _g124.add
  local apply = _g124.apply
  local asin = _g124.asin
  local atan = _g124.atan
  local atan2 = _g124.atan2
  local atom63 = _g124["atom?"]
  local boolean63 = _g124["boolean?"]
  local cat = _g124.cat
  local ceil = _g124.ceil
  local char = _g124.char
  local code = _g124.code
  local composite63 = _g124["composite?"]
  local cos = _g124.cos
  local drop = _g124.drop
  local empty63 = _g124["empty?"]
  local exclude = _g124.exclude
  local exit = _g124.exit
  local extend = _g124.extend
  local find = _g124.find
  local flat = _g124.flat
  local flat1 = _g124.flat1
  local floor = _g124.floor
  local function63 = _g124["function?"]
  local hd = _g124.hd
  local id_literal63 = _g124["id-literal?"]
  local in63 = _g124["in?"]
  local inner = _g124.inner
  local is63 = _g124["is?"]
  local iterate = _g124.iterate
  local join = _g124.join
  local keep = _g124.keep
  local keys63 = _g124["keys?"]
  local last = _g124.last
  local length = _g124.length
  local list63 = _g124["list?"]
  local log = _g124.log
  local log10 = _g124.log10
  local make_id = _g124["make-id"]
  local map = _g124.map
  local max = _g124.max
  local min = _g124.min
  local module = _g124.module
  local module_key = _g124["module-key"]
  local nil63 = _g124["nil?"]
  local none63 = _g124["none?"]
  local now = _g124.now
  local number = _g124.number
  local number63 = _g124["number?"]
  local pair = _g124.pair
  local pow = _g124.pow
  local random = _g124.random
  local read_file = _g124["read-file"]
  local reduce = _g124.reduce
  local replicate = _g124.replicate
  local reverse = _g124.reverse
  local sd = _g124.sd
  local search = _g124.search
  local setenv = _g124.setenv
  local sin = _g124.sin
  local sinh = _g124.sinh
  local some63 = _g124["some?"]
  local sort = _g124.sort
  local splice = _g124.splice
  local split = _g124.split
  local sqrt = _g124.sqrt
  local stash = _g124.stash
  local string = _g124.string
  local string_literal63 = _g124["string-literal?"]
  local string63 = _g124["string?"]
  local sub = _g124.sub
  local sublist = _g124.sublist
  local substring = _g124.substring
  local table63 = _g124["table?"]
  local tan = _g124.tan
  local tanh = _g124.tanh
  local td = _g124.td
  local tl = _g124.tl
  local today = _g124.today
  local toplevel63 = _g124["toplevel?"]
  local unstash = _g124.unstash
  local write = _g124.write
  local write_file = _g124["write-file"]
  local _g130 = {}
  _g130.js = "!"
  _g130.lua = "not "
  local _g128 = {}
  local _g131 = {}
  _g131.js = "!"
  _g131.lua = "not "
  _g128["not"] = _g131
  local _g133 = {}
  _g133["%"] = true
  _g133["*"] = true
  _g133["/"] = true
  local _g135 = {}
  _g135["+"] = true
  _g135["-"] = true
  local _g139 = {}
  _g139.js = "+"
  _g139.lua = ".."
  local _g137 = {}
  local _g140 = {}
  _g140.js = "+"
  _g140.lua = ".."
  _g137.cat = _g140
  local _g142 = {}
  _g142["<"] = true
  _g142["<="] = true
  _g142[">"] = true
  _g142[">="] = true
  local _g146 = {}
  _g146.js = "==="
  _g146.lua = "=="
  local _g148 = {}
  _g148.js = "!="
  _g148.lua = "~="
  local _g144 = {}
  local _g149 = {}
  _g149.js = "==="
  _g149.lua = "=="
  _g144["="] = _g149
  local _g150 = {}
  _g150.js = "!="
  _g150.lua = "~="
  _g144["~="] = _g150
  local _g154 = {}
  _g154.js = "&&"
  _g154.lua = "and"
  local _g152 = {}
  local _g155 = {}
  _g155.js = "&&"
  _g155.lua = "and"
  _g152["and"] = _g155
  local _g159 = {}
  _g159.js = "||"
  _g159.lua = "or"
  local _g157 = {}
  local _g160 = {}
  _g160.js = "||"
  _g160.lua = "or"
  _g157["or"] = _g160
  local infix = {_g128, _g133, _g135, _g137, _g142, _g144, _g152, _g157}
  nexus["lumen/compiler"].infix = infix
  local function unary63(form)
    local op = form[1]
    local args = sub(form, 1)
    return(length(args) == 1 and in63(op, {"not", "-"}))
  end
  nexus["lumen/compiler"]["unary?"] = unary63
  local function precedence(form)
    if list63(form) and not unary63(form) then
      local _g161 = infix
      local i = 0
      while i < length(_g161) do
        local level = _g161[i + 1]
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
    local _g162 = args
    local i = 0
    while i < length(_g162) do
      local arg = _g162[i + 1]
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
    local _g163 = getenv(x)
    local special = _g163.special
    local self_tr63 = _g163.tr
    local stmt = _g163.stmt
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
    local _g164 = unstash({...})
    local right = _g164.right
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
    local _g165 = sub(form, 1)
    local a = _g165[1]
    local b = _g165[2]
    local _g166 = op_delims(form, a)
    local ao = _g166[1]
    local ac = _g166[2]
    local _g167 = op_delims(form, b, {_stash = true, right = true})
    local bo = _g167[1]
    local bc = _g167[2]
    local _g168 = compile(a)
    local _g169 = compile(b)
    local _g170 = getop(op)
    if unary63(form) then
      return(_g170 .. ao .. _g168 .. ac)
    else
      return(ao .. _g168 .. ac .. " " .. _g170 .. " " .. bo .. _g169 .. bc)
    end
  end
  nexus["lumen/compiler"]["compile-infix"] = compile_infix
  local function compile_function(args, body, ...)
    local _g171 = unstash({...})
    local name = _g171.name
    local prefix = _g171.prefix
    local _g188
    if name then
      _g188 = compile(name)
    else
      _g188 = ""
    end
    local id = _g188
    local _g172 = prefix or ""
    local _g173 = compile_args(args)
    indent_level = indent_level + 1
    local _g175 = compile(body, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local _g174 = _g175
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
      return("function " .. id .. _g173 .. " {\n" .. _g174 .. ind .. "}" .. tr)
    else
      return(_g172 .. "function " .. id .. _g173 .. "\n" .. _g174 .. ind .. tr)
    end
  end
  nexus["lumen/compiler"]["compile-function"] = compile_function
  local function can_return63(form)
    return(is63(form) and (atom63(form) or not (hd(form) == "return") and not statement63(hd(form))))
  end
  nexus["lumen/compiler"]["can-return?"] = can_return63
  compile = function (form, ...)
    local _g176 = unstash({...})
    local stmt = _g176.stmt
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
        local _g177 = _g191
        return(ind .. _g177 .. tr)
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
    local _g178 = sub(args, 0, length(args) - 1)
    local _g179 = 0
    while _g179 < length(_g178) do
      local x = _g178[_g179 + 1]
      add(hoist, lower(x, hoist, stmt63))
      _g179 = _g179 + 1
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
    local _g180 = args[2]
    local _g181 = args[3]
    if stmt63 or tail63 then
      local _g194
      if _g181 then
        _g194 = {lower_body({_g181}, tail63)}
      end
      return(add(hoist, join({"%if", lower(cond, hoist), lower_body({_g180}, tail63)}, _g194)))
    else
      local e = make_id()
      add(hoist, {"%local", e})
      local _g193
      if _g181 then
        _g193 = {lower({"set", e, _g181})}
      end
      add(hoist, join({"%if", lower(cond, hoist), lower({"set", e, _g180})}, _g193))
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
    local _g182 = args[2]
    local body = sub(args, 2)
    return(add(hoist, {kind, name, _g182, lower_body(body, true)}))
  end
  nexus["lumen/compiler"]["lower-definition"] = lower_definition
  local function lower_call(form, hoist)
    local _g183 = map(function (x)
      return(lower(x, hoist))
    end, form)
    if some63(_g183) then
      return(_g183)
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
    local _g184 = unstash({...})
    local all = _g184.all
    local m = module(spec)
    local frame = last(environment)
    local _g185 = m.export
    local k = nil
    for k in next, _g185 do
      if not number63(k) then
        local v = _g185[k]
        if v.export or all then
          frame[k] = v
        end
      end
    end
  end
  nexus["lumen/compiler"]["open-module"] = open_module
  local function load_module(spec, ...)
    local _g186 = unstash({...})
    local all = _g186.all
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
    return(join(imported(current_module, {_stash = true, all = true}), map(function (x)
      return(splice(imported(x)))
    end, m.import)))
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
  local _g197 = nexus["lumen/utilities"]
  local bind = _g197.bind
  local bind42 = _g197["bind*"]
  local bound63 = _g197["bound?"]
  local getenv = _g197.getenv
  local id = _g197.id
  local imported = _g197.imported
  local indentation = _g197.indentation
  local initial_environment = _g197["initial-environment"]
  local linked = _g197.linked
  local macro_function = _g197["macro-function"]
  local macro63 = _g197["macro?"]
  local macroexpand = _g197.macroexpand
  local mapo = _g197.mapo
  local quasiexpand = _g197.quasiexpand
  local quote_environment = _g197["quote-environment"]
  local quote_modules = _g197["quote-modules"]
  local quoted = _g197.quoted
  local reserved63 = _g197["reserved?"]
  local sortk = _g197.sortk
  local special_form63 = _g197["special-form?"]
  local special63 = _g197["special?"]
  local stash42 = _g197["stash*"]
  local statement63 = _g197["statement?"]
  local symbol_expansion = _g197["symbol-expansion"]
  local symbol63 = _g197["symbol?"]
  local toplevel63 = _g197["toplevel?"]
  local valid_id63 = _g197["valid-id?"]
  local variable63 = _g197["variable?"]
  local _g198 = nexus["lumen/compiler"]
  local compile = _g198.compile
  local compile_function = _g198["compile-function"]
  local compile_module = _g198["compile-module"]
  local declare = _g198.declare
  local eval = _g198.eval
  local in_module = _g198["in-module"]
  local load_module = _g198["load-module"]
  local open_module = _g198["open-module"]
  local _g199 = nexus["lumen/runtime"]
  local _37 = _g199["%"]
  local _37message_handler = _g199["%message-handler"]
  local _42 = _g199["*"]
  local _43 = _g199["+"]
  local _ = _g199["-"]
  local _47 = _g199["/"]
  local _60 = _g199["<"]
  local _6061 = _g199["<="]
  local _61 = _g199["="]
  local _62 = _g199[">"]
  local _6261 = _g199[">="]
  local abs = _g199.abs
  local acos = _g199.acos
  local add = _g199.add
  local apply = _g199.apply
  local asin = _g199.asin
  local atan = _g199.atan
  local atan2 = _g199.atan2
  local atom63 = _g199["atom?"]
  local boolean63 = _g199["boolean?"]
  local cat = _g199.cat
  local ceil = _g199.ceil
  local char = _g199.char
  local code = _g199.code
  local composite63 = _g199["composite?"]
  local cos = _g199.cos
  local drop = _g199.drop
  local empty63 = _g199["empty?"]
  local exclude = _g199.exclude
  local exit = _g199.exit
  local extend = _g199.extend
  local find = _g199.find
  local flat = _g199.flat
  local flat1 = _g199.flat1
  local floor = _g199.floor
  local function63 = _g199["function?"]
  local hd = _g199.hd
  local id_literal63 = _g199["id-literal?"]
  local in63 = _g199["in?"]
  local inner = _g199.inner
  local is63 = _g199["is?"]
  local iterate = _g199.iterate
  local join = _g199.join
  local keep = _g199.keep
  local keys63 = _g199["keys?"]
  local last = _g199.last
  local length = _g199.length
  local list63 = _g199["list?"]
  local log = _g199.log
  local log10 = _g199.log10
  local make_id = _g199["make-id"]
  local map = _g199.map
  local max = _g199.max
  local min = _g199.min
  local module = _g199.module
  local module_key = _g199["module-key"]
  local nil63 = _g199["nil?"]
  local none63 = _g199["none?"]
  local now = _g199.now
  local number = _g199.number
  local number63 = _g199["number?"]
  local pair = _g199.pair
  local pow = _g199.pow
  local random = _g199.random
  local read_file = _g199["read-file"]
  local reduce = _g199.reduce
  local replicate = _g199.replicate
  local reverse = _g199.reverse
  local sd = _g199.sd
  local search = _g199.search
  local setenv = _g199.setenv
  local sin = _g199.sin
  local sinh = _g199.sinh
  local some63 = _g199["some?"]
  local sort = _g199.sort
  local splice = _g199.splice
  local split = _g199.split
  local sqrt = _g199.sqrt
  local stash = _g199.stash
  local string = _g199.string
  local string_literal63 = _g199["string-literal?"]
  local string63 = _g199["string?"]
  local sub = _g199.sub
  local sublist = _g199.sublist
  local substring = _g199.substring
  local table63 = _g199["table?"]
  local tan = _g199.tan
  local tanh = _g199.tanh
  local td = _g199.td
  local tl = _g199.tl
  local today = _g199.today
  local toplevel63 = _g199["toplevel?"]
  local unstash = _g199.unstash
  local write = _g199.write
  local write_file = _g199["write-file"]
end)();
(function ()
  nexus["lumen/core"] = {}
  local _g398 = nexus["lumen/utilities"]
  local bind = _g398.bind
  local bind42 = _g398["bind*"]
  local bound63 = _g398["bound?"]
  local getenv = _g398.getenv
  local id = _g398.id
  local imported = _g398.imported
  local indentation = _g398.indentation
  local initial_environment = _g398["initial-environment"]
  local linked = _g398.linked
  local macro_function = _g398["macro-function"]
  local macro63 = _g398["macro?"]
  local macroexpand = _g398.macroexpand
  local mapo = _g398.mapo
  local quasiexpand = _g398.quasiexpand
  local quote_environment = _g398["quote-environment"]
  local quote_modules = _g398["quote-modules"]
  local quoted = _g398.quoted
  local reserved63 = _g398["reserved?"]
  local sortk = _g398.sortk
  local special_form63 = _g398["special-form?"]
  local special63 = _g398["special?"]
  local stash42 = _g398["stash*"]
  local statement63 = _g398["statement?"]
  local symbol_expansion = _g398["symbol-expansion"]
  local symbol63 = _g398["symbol?"]
  local toplevel63 = _g398["toplevel?"]
  local valid_id63 = _g398["valid-id?"]
  local variable63 = _g398["variable?"]
  local _g399 = nexus["lumen/compiler"]
  local compile = _g399.compile
  local compile_function = _g399["compile-function"]
  local compile_module = _g399["compile-module"]
  local declare = _g399.declare
  local eval = _g399.eval
  local in_module = _g399["in-module"]
  local load_module = _g399["load-module"]
  local open_module = _g399["open-module"]
  local _g400 = nexus["lumen/runtime"]
  local _37 = _g400["%"]
  local _37message_handler = _g400["%message-handler"]
  local _42 = _g400["*"]
  local _43 = _g400["+"]
  local _ = _g400["-"]
  local _47 = _g400["/"]
  local _60 = _g400["<"]
  local _6061 = _g400["<="]
  local _61 = _g400["="]
  local _62 = _g400[">"]
  local _6261 = _g400[">="]
  local abs = _g400.abs
  local acos = _g400.acos
  local add = _g400.add
  local apply = _g400.apply
  local asin = _g400.asin
  local atan = _g400.atan
  local atan2 = _g400.atan2
  local atom63 = _g400["atom?"]
  local boolean63 = _g400["boolean?"]
  local cat = _g400.cat
  local ceil = _g400.ceil
  local char = _g400.char
  local code = _g400.code
  local composite63 = _g400["composite?"]
  local cos = _g400.cos
  local drop = _g400.drop
  local empty63 = _g400["empty?"]
  local exclude = _g400.exclude
  local exit = _g400.exit
  local extend = _g400.extend
  local find = _g400.find
  local flat = _g400.flat
  local flat1 = _g400.flat1
  local floor = _g400.floor
  local function63 = _g400["function?"]
  local hd = _g400.hd
  local id_literal63 = _g400["id-literal?"]
  local in63 = _g400["in?"]
  local inner = _g400.inner
  local is63 = _g400["is?"]
  local iterate = _g400.iterate
  local join = _g400.join
  local keep = _g400.keep
  local keys63 = _g400["keys?"]
  local last = _g400.last
  local length = _g400.length
  local list63 = _g400["list?"]
  local log = _g400.log
  local log10 = _g400.log10
  local make_id = _g400["make-id"]
  local map = _g400.map
  local max = _g400.max
  local min = _g400.min
  local module = _g400.module
  local module_key = _g400["module-key"]
  local nil63 = _g400["nil?"]
  local none63 = _g400["none?"]
  local now = _g400.now
  local number = _g400.number
  local number63 = _g400["number?"]
  local pair = _g400.pair
  local pow = _g400.pow
  local random = _g400.random
  local read_file = _g400["read-file"]
  local reduce = _g400.reduce
  local replicate = _g400.replicate
  local reverse = _g400.reverse
  local sd = _g400.sd
  local search = _g400.search
  local setenv = _g400.setenv
  local sin = _g400.sin
  local sinh = _g400.sinh
  local some63 = _g400["some?"]
  local sort = _g400.sort
  local splice = _g400.splice
  local split = _g400.split
  local sqrt = _g400.sqrt
  local stash = _g400.stash
  local string = _g400.string
  local string_literal63 = _g400["string-literal?"]
  local string63 = _g400["string?"]
  local sub = _g400.sub
  local sublist = _g400.sublist
  local substring = _g400.substring
  local table63 = _g400["table?"]
  local tan = _g400.tan
  local tanh = _g400.tanh
  local td = _g400.td
  local tl = _g400.tl
  local today = _g400.today
  local toplevel63 = _g400["toplevel?"]
  local unstash = _g400.unstash
  local write = _g400.write
  local write_file = _g400["write-file"]
  target = "lua"
end)();
(function ()
  nexus["lumen/boot"] = {}
  local _g738 = nexus["lumen/utilities"]
  local bind = _g738.bind
  local bind42 = _g738["bind*"]
  local bound63 = _g738["bound?"]
  local getenv = _g738.getenv
  local id = _g738.id
  local imported = _g738.imported
  local indentation = _g738.indentation
  local initial_environment = _g738["initial-environment"]
  local linked = _g738.linked
  local macro_function = _g738["macro-function"]
  local macro63 = _g738["macro?"]
  local macroexpand = _g738.macroexpand
  local mapo = _g738.mapo
  local quasiexpand = _g738.quasiexpand
  local quote_environment = _g738["quote-environment"]
  local quote_modules = _g738["quote-modules"]
  local quoted = _g738.quoted
  local reserved63 = _g738["reserved?"]
  local sortk = _g738.sortk
  local special_form63 = _g738["special-form?"]
  local special63 = _g738["special?"]
  local stash42 = _g738["stash*"]
  local statement63 = _g738["statement?"]
  local symbol_expansion = _g738["symbol-expansion"]
  local symbol63 = _g738["symbol?"]
  local toplevel63 = _g738["toplevel?"]
  local valid_id63 = _g738["valid-id?"]
  local variable63 = _g738["variable?"]
  local _g739 = nexus["lumen/compiler"]
  local compile = _g739.compile
  local compile_function = _g739["compile-function"]
  local compile_module = _g739["compile-module"]
  local declare = _g739.declare
  local eval = _g739.eval
  local in_module = _g739["in-module"]
  local load_module = _g739["load-module"]
  local open_module = _g739["open-module"]
  local _g740 = nexus["lumen/runtime"]
  local _37 = _g740["%"]
  local _37message_handler = _g740["%message-handler"]
  local _42 = _g740["*"]
  local _43 = _g740["+"]
  local _ = _g740["-"]
  local _47 = _g740["/"]
  local _60 = _g740["<"]
  local _6061 = _g740["<="]
  local _61 = _g740["="]
  local _62 = _g740[">"]
  local _6261 = _g740[">="]
  local abs = _g740.abs
  local acos = _g740.acos
  local add = _g740.add
  local apply = _g740.apply
  local asin = _g740.asin
  local atan = _g740.atan
  local atan2 = _g740.atan2
  local atom63 = _g740["atom?"]
  local boolean63 = _g740["boolean?"]
  local cat = _g740.cat
  local ceil = _g740.ceil
  local char = _g740.char
  local code = _g740.code
  local composite63 = _g740["composite?"]
  local cos = _g740.cos
  local drop = _g740.drop
  local empty63 = _g740["empty?"]
  local exclude = _g740.exclude
  local exit = _g740.exit
  local extend = _g740.extend
  local find = _g740.find
  local flat = _g740.flat
  local flat1 = _g740.flat1
  local floor = _g740.floor
  local function63 = _g740["function?"]
  local hd = _g740.hd
  local id_literal63 = _g740["id-literal?"]
  local in63 = _g740["in?"]
  local inner = _g740.inner
  local is63 = _g740["is?"]
  local iterate = _g740.iterate
  local join = _g740.join
  local keep = _g740.keep
  local keys63 = _g740["keys?"]
  local last = _g740.last
  local length = _g740.length
  local list63 = _g740["list?"]
  local log = _g740.log
  local log10 = _g740.log10
  local make_id = _g740["make-id"]
  local map = _g740.map
  local max = _g740.max
  local min = _g740.min
  local module = _g740.module
  local module_key = _g740["module-key"]
  local nil63 = _g740["nil?"]
  local none63 = _g740["none?"]
  local now = _g740.now
  local number = _g740.number
  local number63 = _g740["number?"]
  local pair = _g740.pair
  local pow = _g740.pow
  local random = _g740.random
  local read_file = _g740["read-file"]
  local reduce = _g740.reduce
  local replicate = _g740.replicate
  local reverse = _g740.reverse
  local sd = _g740.sd
  local search = _g740.search
  local setenv = _g740.setenv
  local sin = _g740.sin
  local sinh = _g740.sinh
  local some63 = _g740["some?"]
  local sort = _g740.sort
  local splice = _g740.splice
  local split = _g740.split
  local sqrt = _g740.sqrt
  local stash = _g740.stash
  local string = _g740.string
  local string_literal63 = _g740["string-literal?"]
  local string63 = _g740["string?"]
  local sub = _g740.sub
  local sublist = _g740.sublist
  local substring = _g740.substring
  local table63 = _g740["table?"]
  local tan = _g740.tan
  local tanh = _g740.tanh
  local td = _g740.td
  local tl = _g740.tl
  local today = _g740.today
  local toplevel63 = _g740["toplevel?"]
  local unstash = _g740.unstash
  local write = _g740.write
  local write_file = _g740["write-file"]
  modules = {lumen = {alias = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}}, export = {}, import = {{"lumen", "special"}}}, ["lumen/boot"] = {export = {["%initial-environment"] = {macro = function ()
    return(quote_environment(initial_environment()))
  end}, ["%initial-modules"] = {macro = function ()
    return(quote_modules())
  end}, modules = {export = true, global = true}}, import = {{"lumen"}, {"lumen", "utilities"}, {"lumen", "compiler"}, {"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}}}, ["lumen/compiler"] = {export = {["%compile-module"] = {variable = true}, ["%result"] = {export = true, global = true}, ["can-return?"] = {variable = true}, compile = {export = true, variable = true}, ["compile-args"] = {variable = true}, ["compile-atom"] = {variable = true}, ["compile-call"] = {variable = true}, ["compile-file"] = {variable = true}, ["compile-function"] = {export = true, variable = true}, ["compile-infix"] = {variable = true}, ["compile-module"] = {export = true, variable = true}, ["compile-special"] = {variable = true}, ["compiler-output"] = {variable = true}, ["compiling?"] = {variable = true}, conclude = {variable = true}, ["current-module"] = {export = true, global = true}, declare = {export = true, variable = true}, encapsulate = {variable = true}, eval = {export = true, variable = true}, getop = {variable = true}, ["in-module"] = {export = true, variable = true}, infix = {variable = true}, ["infix?"] = {variable = true}, ["load-module"] = {export = true, variable = true}, lower = {variable = true}, ["lower-body"] = {variable = true}, ["lower-call"] = {variable = true}, ["lower-definition"] = {variable = true}, ["lower-do"] = {variable = true}, ["lower-for"] = {variable = true}, ["lower-function"] = {variable = true}, ["lower-if"] = {variable = true}, ["lower-infix"] = {variable = true}, ["lower-infix?"] = {variable = true}, ["lower-short"] = {variable = true}, ["lower-special"] = {variable = true}, ["lower-statement"] = {variable = true}, ["lower-try"] = {variable = true}, ["lower-while"] = {variable = true}, ["module-path"] = {variable = true}, ["op-delims"] = {variable = true}, ["open-module"] = {export = true, variable = true}, ["parenthesize-call?"] = {variable = true}, precedence = {variable = true}, process = {variable = true}, reimported = {variable = true}, run = {variable = true}, terminator = {variable = true}, ["unary?"] = {variable = true}}, import = {{"lumen"}, {"lumen", "utilities"}, {"lumen", "reader"}, {"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}}}, ["lumen/core"] = {export = {at = {export = true, macro = function (l, i)
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
    local _g781 = sub(bs, 0)
    return({"set", a, join({"cat", a}, _g781)})
  end}, dec = {export = true, macro = function (n, by)
    return({"set", n, {"-", n, by or 1}})
  end}, define = {export = true, macro = function (name, x, ...)
    local body = unstash({...})
    local _g823 = sub(body, 0)
    setenv(name, {_stash = true, variable = true})
    if some63(_g823) then
      local _g824 = bind42(x, _g823)
      local args = _g824[1]
      local _g825 = _g824[2]
      return(linked(name, join({"%local-function", name, args}, _g825)))
    else
      return(linked(name, {"%local", name, x}))
    end
  end}, ["define*"] = {export = true, macro = function (name, x, ...)
    local body = unstash({...})
    local _g800 = sub(body, 0)
    setenv(name, {_stash = true, export = true, global = true})
    if some63(_g800) then
      local _g801 = bind42(x, _g800)
      local args = _g801[1]
      local _g802 = _g801[2]
      return(join({"%global-function", name, args}, _g802))
    else
      if target == "js" then
        return({"set", {"get", "global", {"quote", id(name)}}, x})
      else
        return({"set", name, x})
      end
    end
  end}, ["define-macro"] = {export = true, macro = function (name, args, ...)
    local body = unstash({...})
    local _g787 = sub(body, 0)
    local form = join({"fn", args}, _g787)
    local _g788 = {"setenv", {"quote", name}}
    _g788.form = {"quote", form}
    _g788.macro = form
    eval(_g788)
    return(nil)
  end}, ["define-module"] = {export = true, macro = function (spec, ...)
    local body = unstash({...})
    local _g815 = sub(body, 0)
    local imports = {}
    local aliased = {}
    local alias = _g815.alias
    local imp = _g815.import
    local exp = _g815.export
    local _g816 = imp or {}
    local _g817 = 0
    while _g817 < length(_g816) do
      local k = _g816[_g817 + 1]
      load_module(k)
      local _g818 = module(k).alias or {}
      local _g819 = 0
      while _g819 < length(_g818) do
        local a = _g818[_g819 + 1]
        add(imp, a)
        _g819 = _g819 + 1
      end
      imports = join(imports, imported(k))
      _g817 = _g817 + 1
    end
    modules[module_key(spec)] = {alias = alias, export = {}, import = imp}
    local _g820 = exp or {}
    local _g821 = 0
    while _g821 < length(_g820) do
      local k = _g820[_g821 + 1]
      setenv(k, {_stash = true, export = true})
      _g821 = _g821 + 1
    end
    local k = module_key(current_module)
    return(join({"do", {"set", {"get", "nexus", {"quote", k}}, {"table"}}}, imports))
  end}, ["define-special"] = {export = true, macro = function (name, args, ...)
    local body = unstash({...})
    local _g794 = sub(body, 0)
    local form = join({"fn", args}, _g794)
    local keys = sub(_g794, length(_g794))
    local _g795 = {"setenv", {"quote", name}}
    _g795.form = {"quote", form}
    _g795.special = form
    eval(join(_g795, keys))
    return(nil)
  end}, ["define-symbol"] = {export = true, macro = function (name, expansion)
    setenv(name, {_stash = true, symbol = expansion})
    return(nil)
  end}, each = {export = true, macro = function (b, t, ...)
    local body = unstash({...})
    local _g805 = sub(body, 0)
    local k = b[1]
    local v = b[2]
    local t1 = make_id()
    local _g849
    if nil63(v) then
      local _g850
      if b.i then
        _g850 = "i"
      else
        _g850 = make_id()
      end
      local i = _g850
      _g849 = {"let", {i, 0}, {"while", {"<", i, {"length", t1}}, join({"let", {k, {"at", t1, i}}}, _g805), {"inc", i}}}
    else
      local _g806 = {"target"}
      _g806.js = {"isNaN", {"parseInt", k}}
      _g806.lua = {"not", {"number?", k}}
      _g849 = {"let", {k, "nil"}, {"%for", t1, k, {"when", _g806, join({"let", {v, {"get", t1, k}}}, _g805)}}}
    end
    return({"let", {t1, t}, _g849})
  end}, fn = {export = true, macro = function (args, ...)
    local body = unstash({...})
    local _g789 = sub(body, 0)
    local _g790 = bind42(args, _g789)
    local _g791 = _g790[1]
    local _g792 = _g790[2]
    return(join({"%function", _g791}, _g792))
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
    local function step(_g799)
      local a = _g799[1]
      local b = _g799[2]
      local c = sub(_g799, 2)
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
    local _g814 = sub(bs, 0)
    return({"set", a, join({"join*", a}, _g814)})
  end}, ["join*"] = {export = true, macro = function (...)
    local xs = unstash({...})
    return(reduce(function (a, b)
      return({"join", a, b})
    end, xs))
  end}, language = {export = true, macro = function ()
    return({"quote", target})
  end}, let = {export = true, macro = function (bindings, ...)
    local body = unstash({...})
    local _g782 = sub(body, 0)
    local i = 0
    local renames = {}
    local locals = {}
    map(function (_g783)
      local lh = _g783[1]
      local rh = _g783[2]
      local _g784 = bind(lh, rh)
      local _g785 = 0
      while _g785 < length(_g784) do
        local _g786 = _g784[_g785 + 1]
        local id = _g786[1]
        local val = _g786[2]
        if bound63(id) or reserved63(id) or toplevel63() then
          local rename = make_id()
          add(renames, id)
          add(renames, rename)
          id = rename
        else
          setenv(id, {_stash = true, variable = true})
        end
        add(locals, {"%local", id, val})
        _g785 = _g785 + 1
      end
    end, pair(bindings))
    return(join({"do"}, join(locals, {join({"let-symbol", renames}, _g782)})))
  end}, ["let-macro"] = {export = true, macro = function (definitions, ...)
    local body = unstash({...})
    local _g826 = sub(body, 0)
    add(environment, {})
    map(function (m)
      return(macroexpand(join({"define-macro"}, m)))
    end, definitions)
    local _g827 = join({"do"}, macroexpand(_g826))
    drop(environment)
    return(_g827)
  end}, ["let-symbol"] = {export = true, macro = function (expansions, ...)
    local body = unstash({...})
    local _g811 = sub(body, 0)
    add(environment, {})
    map(function (_g813)
      local name = _g813[1]
      local exp = _g813[2]
      return(macroexpand({"define-symbol", name, exp}))
    end, pair(expansions))
    local _g812 = join({"do"}, macroexpand(_g811))
    drop(environment)
    return(_g812)
  end}, list = {export = true, macro = function (...)
    local body = unstash({...})
    local l = join({"%array"}, body)
    if not keys63(body) then
      return(l)
    else
      local id = make_id()
      local init = {}
      local _g793 = body
      local k = nil
      for k in next, _g793 do
        if not number63(k) then
          local v = _g793[k]
          add(init, {k, {"set", {"get", id, {"quote", k}}, v}})
        end
      end
      return(join({"let", {id, l}}, join(map(sd, sortk(init, hd)), {id})))
    end
  end}, pr = {export = true, macro = function (...)
    local xs = unstash({...})
    local _g828 = map(function (x)
      return(splice({{"string", x}, "\" \""}))
    end, xs)
    return({"print", join({"cat"}, _g828)})
  end}, quasiquote = {export = true, macro = function (form)
    return(quasiexpand(form, 1))
  end}, quote = {export = true, macro = function (form)
    return(quoted(form))
  end}, ["set*"] = {export = true, macro = function (name, value)
    return(linked(name, {"set", name, value}))
  end}, ["set-of"] = {export = true, macro = function (...)
    local elements = unstash({...})
    local l = {}
    local _g803 = elements
    local _g804 = 0
    while _g804 < length(_g803) do
      local e = _g803[_g804 + 1]
      l[e] = true
      _g804 = _g804 + 1
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
    local _g796 = sub(body, 0)
    return({"if", {"not", cond}, join({"do"}, _g796)})
  end}, when = {export = true, macro = function (cond, ...)
    local body = unstash({...})
    local _g822 = sub(body, 0)
    return({"if", cond, join({"do"}, _g822)})
  end}, ["with-bindings"] = {export = true, macro = function (_g807, ...)
    local names = _g807[1]
    local body = unstash({...})
    local _g808 = sub(body, 0)
    local x = make_id()
    local _g810 = {"setenv", x}
    _g810.variable = true
    local _g809 = {"with-frame", {"each", {x}, names, _g810}}
    _g809.scope = true
    return(join(_g809, _g808))
  end}, ["with-frame"] = {export = true, macro = function (...)
    local body = unstash({...})
    local _g797 = sub(body, 0)
    local scope = body.scope
    local x = make_id()
    local _g798 = {"table"}
    _g798._scope = scope
    return({"do", {"add", "environment", _g798}, {"let", {x, join({"do"}, _g797)}, {"drop", "environment"}, x}})
  end}}, import = {{"lumen"}, {"lumen", "utilities"}, {"lumen", "compiler"}, {"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}}}, ["lumen/main"] = {export = {}, import = {{"lumen"}, {"lumen", "reader"}, {"lumen", "compiler"}, {"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}}}, ["lumen/reader"] = {export = {["define-reader"] = {export = true, macro = function (_g757, ...)
    local char = _g757[1]
    local stream = _g757[2]
    local body = unstash({...})
    local _g758 = sub(body, 0)
    return({"set", {"get", "read-table", char}, join({"fn", {stream}}, _g758)})
  end}, delimiters = {variable = true}, eof = {variable = true}, ["flag?"] = {variable = true}, ["key?"] = {variable = true}, ["make-stream"] = {export = true, variable = true}, ["peek-char"] = {variable = true}, read = {export = true, variable = true}, ["read-all"] = {export = true, variable = true}, ["read-char"] = {variable = true}, ["read-from-string"] = {export = true, variable = true}, ["read-table"] = {export = true, variable = true}, ["skip-non-code"] = {variable = true}, whitespace = {variable = true}}, import = {"lumen", {"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}}}, ["lumen/runtime"] = {export = {["%"] = {export = true, variable = true}, ["%message-handler"] = {export = true, variable = true}, ["*"] = {export = true, variable = true}, ["+"] = {export = true, variable = true}, ["-"] = {export = true, variable = true}, ["/"] = {export = true, variable = true}, ["<"] = {export = true, variable = true}, ["<="] = {export = true, variable = true}, ["="] = {export = true, variable = true}, [">"] = {export = true, variable = true}, [">="] = {export = true, variable = true}, abs = {export = true, variable = true}, acos = {export = true, variable = true}, add = {export = true, variable = true}, apply = {export = true, variable = true}, asin = {export = true, variable = true}, atan = {export = true, variable = true}, atan2 = {export = true, variable = true}, ["atom?"] = {export = true, variable = true}, ["boolean?"] = {export = true, variable = true}, cat = {export = true, variable = true}, ceil = {export = true, variable = true}, char = {export = true, variable = true}, code = {export = true, variable = true}, ["composite?"] = {export = true, variable = true}, cos = {export = true, variable = true}, drop = {export = true, variable = true}, ["empty?"] = {export = true, variable = true}, exclude = {export = true, variable = true}, exit = {export = true, variable = true}, extend = {export = true, variable = true}, find = {export = true, variable = true}, flat = {export = true, variable = true}, flat1 = {export = true, variable = true}, floor = {export = true, variable = true}, ["function?"] = {export = true, variable = true}, hd = {export = true, variable = true}, ["id-count"] = {variable = true}, ["id-literal?"] = {export = true, variable = true}, ["in?"] = {export = true, variable = true}, inner = {export = true, variable = true}, ["is?"] = {export = true, variable = true}, iterate = {export = true, variable = true}, join = {export = true, variable = true}, keep = {export = true, variable = true}, ["keys?"] = {export = true, variable = true}, last = {export = true, variable = true}, length = {export = true, variable = true}, ["list?"] = {export = true, variable = true}, log = {export = true, variable = true}, log10 = {export = true, variable = true}, ["make-id"] = {export = true, variable = true}, map = {export = true, variable = true}, mapl = {variable = true}, math = {variable = true}, max = {export = true, variable = true}, min = {export = true, variable = true}, module = {export = true, variable = true}, ["module-key"] = {export = true, variable = true}, ["nil?"] = {export = true, variable = true}, ["none?"] = {export = true, variable = true}, now = {export = true, variable = true}, number = {export = true, variable = true}, ["number?"] = {export = true, variable = true}, pair = {export = true, variable = true}, pow = {export = true, variable = true}, random = {export = true, variable = true}, ["read-file"] = {export = true, variable = true}, reduce = {export = true, variable = true}, replicate = {export = true, variable = true}, reverse = {export = true, variable = true}, sd = {export = true, variable = true}, search = {export = true, variable = true}, setenv = {export = true, variable = true}, sin = {export = true, variable = true}, sinh = {export = true, variable = true}, ["some?"] = {export = true, variable = true}, sort = {export = true, variable = true}, splice = {export = true, variable = true}, ["splice?"] = {variable = true}, split = {export = true, variable = true}, sqrt = {export = true, variable = true}, stash = {export = true, variable = true}, string = {export = true, variable = true}, ["string-literal?"] = {export = true, variable = true}, ["string?"] = {export = true, variable = true}, sub = {export = true, variable = true}, sublist = {export = true, variable = true}, substring = {export = true, variable = true}, ["table?"] = {export = true, variable = true}, tan = {export = true, variable = true}, tanh = {export = true, variable = true}, td = {export = true, variable = true}, tl = {export = true, variable = true}, today = {export = true, variable = true}, ["toplevel?"] = {export = true, variable = true}, unstash = {export = true, variable = true}, write = {export = true, variable = true}, ["write-file"] = {export = true, variable = true}}, import = {{"lumen", "special"}, {"lumen", "core"}}}, ["lumen/special"] = {export = {["%array"] = {export = true, foo = true, special = function (...)
    local forms = unstash({...})
    local _g839
    if target == "lua" then
      _g839 = "{"
    else
      _g839 = "["
    end
    local open = _g839
    local _g840
    if target == "lua" then
      _g840 = "}"
    else
      _g840 = "]"
    end
    local close = _g840
    local str = ""
    local _g762 = forms
    local i = 0
    while i < length(_g762) do
      local x = _g762[i + 1]
      str = str .. compile(x)
      if i < length(forms) - 1 then
        str = str .. ", "
      end
      i = i + 1
    end
    return(open .. str .. close)
  end}, ["%for"] = {export = true, foo = true, special = function (t, k, form)
    local _g779 = compile(t)
    local ind = indentation()
    indent_level = indent_level + 1
    local _g780 = compile(form, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local body = _g780
    if target == "lua" then
      return(ind .. "for " .. k .. " in next, " .. _g779 .. " do\n" .. body .. ind .. "end\n")
    else
      return(ind .. "for (" .. k .. " in " .. _g779 .. ") {\n" .. body .. ind .. "}\n")
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
    local _g771 = compile(cond)
    indent_level = indent_level + 1
    local _g774 = compile(cons, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local _g772 = _g774
    local _g847
    if alt then
      indent_level = indent_level + 1
      local _g775 = compile(alt, {_stash = true, stmt = true})
      indent_level = indent_level - 1
      _g847 = _g775
    end
    local _g773 = _g847
    local ind = indentation()
    local str = ""
    if target == "js" then
      str = str .. ind .. "if (" .. _g771 .. ") {\n" .. _g772 .. ind .. "}"
    else
      str = str .. ind .. "if " .. _g771 .. " then\n" .. _g772
    end
    if _g773 and target == "js" then
      str = str .. " else {\n" .. _g773 .. ind .. "}"
    else
      if _g773 then
        str = str .. ind .. "else\n" .. _g773
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
    local _g836
    if is63(value) then
      _g836 = " = " .. value1
    else
      _g836 = ""
    end
    local rh = _g836
    local _g837
    if target == "js" then
      _g837 = "var "
    else
      _g837 = "local "
    end
    local keyword = _g837
    local ind = indentation()
    return(ind .. keyword .. id .. rh)
  end, stmt = true}, ["%local-function"] = {export = true, foo = true, special = function (name, args, body)
    local x = compile_function(args, body, {_stash = true, name = name, prefix = "local "})
    return(indentation() .. x)
  end, stmt = true, tr = true}, ["%object"] = {export = true, foo = true, special = function (...)
    local forms = unstash({...})
    local str = "{"
    local _g841
    if target == "lua" then
      _g841 = " = "
    else
      _g841 = ": "
    end
    local sep = _g841
    local pairs = sortk(pair(forms), hd)
    local _g765 = pairs
    local i = 0
    while i < length(_g765) do
      local _g766 = _g765[i + 1]
      local k = _g766[1]
      local v = _g766[2]
      if not string63(k) then
        error("Illegal key: " .. string(k))
      end
      local _g767 = compile(v)
      local _g842
      if valid_id63(k) then
        _g842 = k
      else
        local _g843
        if target == "js" and string_literal63(k) then
          _g843 = k
        else
          local _g844
          if target == "js" then
            _g844 = quoted(k)
          else
            local _g845
            if string_literal63(k) then
              _g845 = "[" .. k .. "]"
            else
              _g845 = "[" .. quoted(k) .. "]"
            end
            _g844 = _g845
          end
          _g843 = _g844
        end
        _g842 = _g843
      end
      local _g768 = _g842
      str = str .. _g768 .. sep .. _g767
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
    local _g763 = forms
    local _g764 = 0
    while _g764 < length(_g763) do
      local x = _g763[_g764 + 1]
      str = str .. compile(x, {_stash = true, stmt = true})
      _g764 = _g764 + 1
    end
    return(str)
  end, stmt = true, tr = true}, ["error"] = {export = true, foo = true, special = function (x)
    local _g846
    if target == "js" then
      _g846 = "throw new " .. compile({"Error", x})
    else
      _g846 = "error(" .. compile(x) .. ")"
    end
    local e = _g846
    return(indentation() .. e)
  end, stmt = true}, ["get"] = {export = true, foo = true, special = function (t, k)
    local _g776 = compile(t)
    local k1 = compile(k)
    if target == "lua" and char(_g776, 0) == "{" then
      _g776 = "(" .. _g776 .. ")"
    end
    if string_literal63(k) and valid_id63(inner(k)) then
      return(_g776 .. "." .. inner(k))
    else
      return(_g776 .. "[" .. k1 .. "]")
    end
  end}, ["not"] = {}, ["return"] = {export = true, foo = true, special = function (x)
    local _g838
    if nil63(x) then
      _g838 = "return"
    else
      _g838 = "return(" .. compile(x) .. ")"
    end
    local _g759 = _g838
    return(indentation() .. _g759)
  end, stmt = true}, ["set"] = {export = true, foo = true, special = function (lh, rh)
    local _g777 = compile(lh)
    local _g848
    if nil63(rh) then
      _g848 = "nil"
    else
      _g848 = rh
    end
    local _g778 = compile(_g848)
    return(indentation() .. _g777 .. " = " .. _g778)
  end, stmt = true}, ["while"] = {export = true, foo = true, special = function (cond, form)
    local _g760 = compile(cond)
    indent_level = indent_level + 1
    local _g761 = compile(form, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local body = _g761
    local ind = indentation()
    if target == "js" then
      return(ind .. "while (" .. _g760 .. ") {\n" .. body .. ind .. "}\n")
    else
      return(ind .. "while " .. _g760 .. " do\n" .. body .. ind .. "end\n")
    end
  end, stmt = true, tr = true}}, import = {{"lumen"}, {"lumen", "utilities"}, {"lumen", "compiler"}, {"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}}}, ["lumen/system"] = {export = {nexus = {export = true, global = true}}, import = {{"lumen", "special"}, {"lumen", "core"}}}, ["lumen/utilities"] = {export = {bind = {export = true, variable = true}, ["bind*"] = {export = true, variable = true}, ["bound?"] = {export = true, variable = true}, ["can-unquote?"] = {variable = true}, escape = {variable = true}, getenv = {export = true, variable = true}, ["global?"] = {variable = true}, id = {export = true, variable = true}, imported = {export = true, variable = true}, ["indent-level"] = {export = true, global = true}, indentation = {export = true, variable = true}, ["initial-environment"] = {export = true, variable = true}, linked = {export = true, variable = true}, ["macro-function"] = {export = true, variable = true}, ["macro?"] = {export = true, variable = true}, macroexpand = {export = true, variable = true}, mapo = {export = true, variable = true}, ["numeric?"] = {variable = true}, quasiexpand = {export = true, variable = true}, ["quasiquote-list"] = {variable = true}, ["quasiquoting?"] = {variable = true}, ["quasisplice?"] = {variable = true}, ["quote-binding"] = {variable = true}, ["quote-environment"] = {export = true, variable = true}, ["quote-frame"] = {variable = true}, ["quote-module"] = {variable = true}, ["quote-modules"] = {export = true, variable = true}, quoted = {export = true, variable = true}, ["quoting?"] = {variable = true}, reserved = {variable = true}, ["reserved?"] = {export = true, variable = true}, sortk = {export = true, variable = true}, ["special-form?"] = {export = true, variable = true}, ["special?"] = {export = true, variable = true}, ["stash*"] = {export = true, variable = true}, ["statement?"] = {export = true, variable = true}, ["symbol-expansion"] = {export = true, variable = true}, ["symbol?"] = {export = true, variable = true}, ["toplevel?"] = {export = true, variable = true}, ["valid-char?"] = {variable = true}, ["valid-id?"] = {export = true, variable = true}, ["variable?"] = {export = true, variable = true}, ["with-indent"] = {export = true, macro = function (form)
    local result = make_id()
    return({"do", {"inc", "indent-level"}, {"let", {result, form}, {"dec", "indent-level"}, result}})
  end}}, import = {"lumen", {"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}}}, user = {export = {}, import = {"lumen", {"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}}}}
  environment = {{["define-module"] = {export = true, macro = function (spec, ...)
    local body = unstash({...})
    local _g829 = sub(body, 0)
    local imports = {}
    local aliased = {}
    local alias = _g829.alias
    local imp = _g829.import
    local exp = _g829.export
    local _g830 = imp or {}
    local _g831 = 0
    while _g831 < length(_g830) do
      local k = _g830[_g831 + 1]
      load_module(k)
      local _g832 = module(k).alias or {}
      local _g833 = 0
      while _g833 < length(_g832) do
        local a = _g832[_g833 + 1]
        add(imp, a)
        _g833 = _g833 + 1
      end
      imports = join(imports, imported(k))
      _g831 = _g831 + 1
    end
    modules[module_key(spec)] = {alias = alias, export = {}, import = imp}
    local _g834 = exp or {}
    local _g835 = 0
    while _g835 < length(_g834) do
      local k = _g834[_g835 + 1]
      setenv(k, {_stash = true, export = true})
      _g835 = _g835 + 1
    end
    local k = module_key(current_module)
    return(join({"do", {"set", {"get", "nexus", {"quote", k}}, {"table"}}}, imports))
  end}}}
end)();
(function ()
  nexus.user = {}
  local _g852 = nexus["lumen/runtime"]
  local _37 = _g852["%"]
  local _37message_handler = _g852["%message-handler"]
  local _42 = _g852["*"]
  local _43 = _g852["+"]
  local _ = _g852["-"]
  local _47 = _g852["/"]
  local _60 = _g852["<"]
  local _6061 = _g852["<="]
  local _61 = _g852["="]
  local _62 = _g852[">"]
  local _6261 = _g852[">="]
  local abs = _g852.abs
  local acos = _g852.acos
  local add = _g852.add
  local apply = _g852.apply
  local asin = _g852.asin
  local atan = _g852.atan
  local atan2 = _g852.atan2
  local atom63 = _g852["atom?"]
  local boolean63 = _g852["boolean?"]
  local cat = _g852.cat
  local ceil = _g852.ceil
  local char = _g852.char
  local code = _g852.code
  local composite63 = _g852["composite?"]
  local cos = _g852.cos
  local drop = _g852.drop
  local empty63 = _g852["empty?"]
  local exclude = _g852.exclude
  local exit = _g852.exit
  local extend = _g852.extend
  local find = _g852.find
  local flat = _g852.flat
  local flat1 = _g852.flat1
  local floor = _g852.floor
  local function63 = _g852["function?"]
  local hd = _g852.hd
  local id_literal63 = _g852["id-literal?"]
  local in63 = _g852["in?"]
  local inner = _g852.inner
  local is63 = _g852["is?"]
  local iterate = _g852.iterate
  local join = _g852.join
  local keep = _g852.keep
  local keys63 = _g852["keys?"]
  local last = _g852.last
  local length = _g852.length
  local list63 = _g852["list?"]
  local log = _g852.log
  local log10 = _g852.log10
  local make_id = _g852["make-id"]
  local map = _g852.map
  local max = _g852.max
  local min = _g852.min
  local module = _g852.module
  local module_key = _g852["module-key"]
  local nil63 = _g852["nil?"]
  local none63 = _g852["none?"]
  local now = _g852.now
  local number = _g852.number
  local number63 = _g852["number?"]
  local pair = _g852.pair
  local pow = _g852.pow
  local random = _g852.random
  local read_file = _g852["read-file"]
  local reduce = _g852.reduce
  local replicate = _g852.replicate
  local reverse = _g852.reverse
  local sd = _g852.sd
  local search = _g852.search
  local setenv = _g852.setenv
  local sin = _g852.sin
  local sinh = _g852.sinh
  local some63 = _g852["some?"]
  local sort = _g852.sort
  local splice = _g852.splice
  local split = _g852.split
  local sqrt = _g852.sqrt
  local stash = _g852.stash
  local string = _g852.string
  local string_literal63 = _g852["string-literal?"]
  local string63 = _g852["string?"]
  local sub = _g852.sub
  local sublist = _g852.sublist
  local substring = _g852.substring
  local table63 = _g852["table?"]
  local tan = _g852.tan
  local tanh = _g852.tanh
  local td = _g852.td
  local tl = _g852.tl
  local today = _g852.today
  local toplevel63 = _g852["toplevel?"]
  local unstash = _g852.unstash
  local write = _g852.write
  local write_file = _g852["write-file"]
end)();
(function ()
  nexus["lumen/main"] = {}
  local _g3 = nexus["lumen/reader"]
  local make_stream = _g3["make-stream"]
  local read = _g3.read
  local read_all = _g3["read-all"]
  local read_from_string = _g3["read-from-string"]
  local read_table = _g3["read-table"]
  local _g4 = nexus["lumen/compiler"]
  local compile = _g4.compile
  local compile_function = _g4["compile-function"]
  local compile_module = _g4["compile-module"]
  local declare = _g4.declare
  local eval = _g4.eval
  local in_module = _g4["in-module"]
  local load_module = _g4["load-module"]
  local open_module = _g4["open-module"]
  local _g5 = nexus["lumen/runtime"]
  local _37 = _g5["%"]
  local _37message_handler = _g5["%message-handler"]
  local _42 = _g5["*"]
  local _43 = _g5["+"]
  local _ = _g5["-"]
  local _47 = _g5["/"]
  local _60 = _g5["<"]
  local _6061 = _g5["<="]
  local _61 = _g5["="]
  local _62 = _g5[">"]
  local _6261 = _g5[">="]
  local abs = _g5.abs
  local acos = _g5.acos
  local add = _g5.add
  local apply = _g5.apply
  local asin = _g5.asin
  local atan = _g5.atan
  local atan2 = _g5.atan2
  local atom63 = _g5["atom?"]
  local boolean63 = _g5["boolean?"]
  local cat = _g5.cat
  local ceil = _g5.ceil
  local char = _g5.char
  local code = _g5.code
  local composite63 = _g5["composite?"]
  local cos = _g5.cos
  local drop = _g5.drop
  local empty63 = _g5["empty?"]
  local exclude = _g5.exclude
  local exit = _g5.exit
  local extend = _g5.extend
  local find = _g5.find
  local flat = _g5.flat
  local flat1 = _g5.flat1
  local floor = _g5.floor
  local function63 = _g5["function?"]
  local hd = _g5.hd
  local id_literal63 = _g5["id-literal?"]
  local in63 = _g5["in?"]
  local inner = _g5.inner
  local is63 = _g5["is?"]
  local iterate = _g5.iterate
  local join = _g5.join
  local keep = _g5.keep
  local keys63 = _g5["keys?"]
  local last = _g5.last
  local length = _g5.length
  local list63 = _g5["list?"]
  local log = _g5.log
  local log10 = _g5.log10
  local make_id = _g5["make-id"]
  local map = _g5.map
  local max = _g5.max
  local min = _g5.min
  local module = _g5.module
  local module_key = _g5["module-key"]
  local nil63 = _g5["nil?"]
  local none63 = _g5["none?"]
  local number = _g5.number
  local number63 = _g5["number?"]
  local pair = _g5.pair
  local pow = _g5.pow
  local random = _g5.random
  local read_file = _g5["read-file"]
  local reduce = _g5.reduce
  local replicate = _g5.replicate
  local reverse = _g5.reverse
  local sd = _g5.sd
  local search = _g5.search
  local setenv = _g5.setenv
  local sin = _g5.sin
  local sinh = _g5.sinh
  local some63 = _g5["some?"]
  local sort = _g5.sort
  local splice = _g5.splice
  local split = _g5.split
  local sqrt = _g5.sqrt
  local stash = _g5.stash
  local string = _g5.string
  local string_literal63 = _g5["string-literal?"]
  local string63 = _g5["string?"]
  local sub = _g5.sub
  local sublist = _g5.sublist
  local substring = _g5.substring
  local table63 = _g5["table?"]
  local tan = _g5.tan
  local tanh = _g5.tanh
  local td = _g5.td
  local tl = _g5.tl
  local today = _g5.today
  local toplevel63 = _g5["toplevel?"]
  local unstash = _g5.unstash
  local write = _g5.write
  local write_file = _g5["write-file"]
  local function rep(str)
    local _g856,_g857 = xpcall(function ()
      return(eval(read_from_string(str)))
    end, _37message_handler)
    local _g855 = {_g856, _g857}
    local _g1 = _g855[1]
    local x = _g855[2]
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
    local _g858 = args
    local i = 0
    while i < length(_g858) do
      local arg = _g858[i + 1]
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
