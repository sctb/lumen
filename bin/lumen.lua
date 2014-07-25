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
    local _g31 = upto or length(l)
    local l2 = {}
    while i < _g31 do
      l2[j + 1] = l[i + 1]
      i = i + 1
      j = j + 1
    end
    return(l2)
  end
  nexus["lumen/runtime"].sublist = sublist
  local function sub(x, from, upto)
    local _g32 = from or 0
    if string63(x) then
      return(substring(x, _g32, upto))
    else
      local l = sublist(x, _g32, upto)
      local _g33 = x
      local k = nil
      for k in next, _g33 do
        if not number63(k) then
          local v = _g33[k]
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
    local _g63
    if n then
      _g63 = n + 1
    end
    return(string.byte(str, _g63))
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
          local _g34 = l1
          local k = nil
          for k in next, _g34 do
            if not number63(k) then
              local v = _g34[k]
              l[k] = v
            end
          end
          local _g35 = l2
          local k = nil
          for k in next, _g35 do
            if not number63(k) then
              local v = _g35[k]
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
    local _g36 = l
    local _g37 = 0
    while _g37 < length(_g36) do
      local x = _g36[_g37 + 1]
      if f(x) then
        add(l1, x)
      end
      _g37 = _g37 + 1
    end
    return(l1)
  end
  nexus["lumen/runtime"].keep = keep
  local function find(f, l)
    local _g38 = l
    local _g39 = 0
    while _g39 < length(_g38) do
      local x = _g38[_g39 + 1]
      local _g40 = f(x)
      if _g40 then
        return(_g40)
      end
      _g39 = _g39 + 1
    end
  end
  nexus["lumen/runtime"].find = find
  local function pairwise(l)
    local i = 0
    local l1 = {}
    while i < length(l) do
      add(l1, {l[i + 1], l[i + 1 + 1]})
      i = i + 2
    end
    return(l1)
  end
  nexus["lumen/runtime"].pairwise = pairwise
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
    local _g41 = l
    local _g42 = 0
    while _g42 < length(_g41) do
      local x = _g41[_g42 + 1]
      local _g43 = f(x)
      if splice63(_g43) then
        l1 = join(l1, _g43.value)
      else
        if is63(_g43) then
          add(l1, _g43)
        end
      end
      _g42 = _g42 + 1
    end
    return(l1)
  end
  nexus["lumen/runtime"].mapl = mapl
  local function map(f, t)
    local l = mapl(f, t)
    local _g44 = t
    local k = nil
    for k in next, _g44 do
      if not number63(k) then
        local v = _g44[k]
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
    local _g45 = t
    local k = nil
    for k in next, _g45 do
      if not number63(k) then
        local v = _g45[k]
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
      local _g46 = args
      local k = nil
      for k in next, _g46 do
        if not number63(k) then
          local v = _g46[k]
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
        local _g47 = l
        local k = nil
        for k in next, _g47 do
          if not number63(k) then
            local v = _g47[k]
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
    local _g48 = sub(xs, 0)
    return(join(t, _g48))
  end
  nexus["lumen/runtime"].extend = extend
  local function exclude(t, ...)
    local keys = unstash({...})
    local _g49 = sub(keys, 0)
    local t1 = sublist(t)
    local _g50 = t
    local k = nil
    for k in next, _g50 do
      if not number63(k) then
        local v = _g50[k]
        if not _g49[k] then
          t1[k] = v
        end
      end
    end
    return(t1)
  end
  nexus["lumen/runtime"].exclude = exclude
  local function search(str, pattern, start)
    local _g64
    if start then
      _g64 = start + 1
    end
    local _g51 = _g64
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
    local _g52 = sub(xs, 0)
    if none63(_g52) then
      return("")
    else
      return(reduce(function (a, b)
        return(a .. b)
      end, _g52))
    end
  end
  nexus["lumen/runtime"].cat = cat
  local function _43(...)
    local xs = unstash({...})
    local _g53 = sub(xs, 0)
    return(reduce(function (a, b)
      return(a + b)
    end, _g53))
  end
  nexus["lumen/runtime"]["+"] = _43
  local function _(...)
    local xs = unstash({...})
    local _g54 = sub(xs, 0)
    return(reduce(function (a, b)
      return(b - a)
    end, reverse(_g54)))
  end
  nexus["lumen/runtime"]["-"] = _
  local function _42(...)
    local xs = unstash({...})
    local _g55 = sub(xs, 0)
    return(reduce(function (a, b)
      return(a * b)
    end, _g55))
  end
  nexus["lumen/runtime"]["*"] = _42
  local function _47(...)
    local xs = unstash({...})
    local _g56 = sub(xs, 0)
    return(reduce(function (a, b)
      return(b / a)
    end, reverse(_g56)))
  end
  nexus["lumen/runtime"]["/"] = _47
  local function _37(...)
    local xs = unstash({...})
    local _g57 = sub(xs, 0)
    return(reduce(function (a, b)
      return(b % a)
    end, reverse(_g57)))
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
            local _g58 = x
            local k = nil
            for k in next, _g58 do
              if not number63(k) then
                local v = _g58[k]
                add(x1, k .. ":")
                add(x1, v)
              end
            end
            local _g59 = x1
            local i = 0
            while i < length(_g59) do
              local y = _g59[i + 1]
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
    local _g60 = stash(args)
    return(f(unpack(_g60)))
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
    local _g61 = sub(keys, 0)
    if string63(k) then
      local frame = last(environment)
      local x = frame[k] or {}
      local _g62 = _g61
      local k1 = nil
      for k1 in next, _g62 do
        if not number63(k1) then
          local v = _g62[k1]
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
  local _g69 = nexus["lumen/runtime"]
  local _37 = _g69["%"]
  local _37message_handler = _g69["%message-handler"]
  local _42 = _g69["*"]
  local _43 = _g69["+"]
  local _ = _g69["-"]
  local _47 = _g69["/"]
  local _60 = _g69["<"]
  local _6061 = _g69["<="]
  local _61 = _g69["="]
  local _62 = _g69[">"]
  local _6261 = _g69[">="]
  local abs = _g69.abs
  local acos = _g69.acos
  local add = _g69.add
  local apply = _g69.apply
  local asin = _g69.asin
  local atan = _g69.atan
  local atan2 = _g69.atan2
  local atom63 = _g69["atom?"]
  local boolean63 = _g69["boolean?"]
  local cat = _g69.cat
  local ceil = _g69.ceil
  local char = _g69.char
  local code = _g69.code
  local composite63 = _g69["composite?"]
  local cos = _g69.cos
  local drop = _g69.drop
  local empty63 = _g69["empty?"]
  local exclude = _g69.exclude
  local exit = _g69.exit
  local extend = _g69.extend
  local find = _g69.find
  local flat = _g69.flat
  local flat1 = _g69.flat1
  local floor = _g69.floor
  local function63 = _g69["function?"]
  local hd = _g69.hd
  local id_literal63 = _g69["id-literal?"]
  local in63 = _g69["in?"]
  local inner = _g69.inner
  local is63 = _g69["is?"]
  local iterate = _g69.iterate
  local join = _g69.join
  local keep = _g69.keep
  local keys63 = _g69["keys?"]
  local last = _g69.last
  local length = _g69.length
  local list63 = _g69["list?"]
  local log = _g69.log
  local log10 = _g69.log10
  local make_id = _g69["make-id"]
  local map = _g69.map
  local max = _g69.max
  local min = _g69.min
  local module = _g69.module
  local module_key = _g69["module-key"]
  local nil63 = _g69["nil?"]
  local none63 = _g69["none?"]
  local number = _g69.number
  local number63 = _g69["number?"]
  local pairwise = _g69.pairwise
  local pow = _g69.pow
  local random = _g69.random
  local read_file = _g69["read-file"]
  local reduce = _g69.reduce
  local replicate = _g69.replicate
  local reverse = _g69.reverse
  local sd = _g69.sd
  local search = _g69.search
  local setenv = _g69.setenv
  local sin = _g69.sin
  local sinh = _g69.sinh
  local some63 = _g69["some?"]
  local sort = _g69.sort
  local splice = _g69.splice
  local split = _g69.split
  local sqrt = _g69.sqrt
  local stash = _g69.stash
  local string = _g69.string
  local string_literal63 = _g69["string-literal?"]
  local string63 = _g69["string?"]
  local sub = _g69.sub
  local sublist = _g69.sublist
  local substring = _g69.substring
  local table63 = _g69["table?"]
  local tan = _g69.tan
  local tanh = _g69.tanh
  local td = _g69.td
  local tl = _g69.tl
  local toplevel63 = _g69["toplevel?"]
  local unstash = _g69.unstash
  local write = _g69.write
  local write_file = _g69["write-file"]
  local function getenv(k, ...)
    local keys = unstash({...})
    local _g72 = sub(keys, 0)
    if string63(k) then
      local b = find(function (e)
        return(e[k])
      end, reverse(environment))
      if table63(b) then
        local _g73 = nil
        local _g74 = _g72
        local x = nil
        for x in next, _g74 do
          if not number63(x) then
            local _g65 = _g74[x]
            _g73 = x
          end
        end
        if _g73 then
          return(b[_g73])
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
      local _g104
      if c == "\n" then
        _g104 = "\\n"
      else
        local _g105
        if c == "\"" then
          _g105 = "\\\""
        else
          local _g106
          if c == "\\" then
            _g106 = "\\\\"
          else
            _g106 = c
          end
          _g105 = _g106
        end
        _g104 = _g105
      end
      local c1 = _g104
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
      local _g75 = args
      local k = nil
      for k in next, _g75 do
        if not number63(k) then
          local v = _g75[k]
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
        local _g76 = lh
        local i = 0
        while i < length(_g76) do
          local x = _g76[i + 1]
          bs = join(bs, bind(x, {"at", rh, i}))
          i = i + 1
        end
        if r then
          bs = join(bs, bind(r, {"sub", rh, length(lh)}))
        end
        local _g77 = lh
        local k = nil
        for k in next, _g77 do
          if not number63(k) then
            local v = _g77[k]
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
      local _g78 = args
      local _g79 = 0
      while _g79 < length(_g78) do
        local arg = _g78[_g79 + 1]
        if atom63(arg) then
          add(args1, arg)
        else
          if list63(arg) or keys63(arg) then
            local v = make_id()
            add(args1, v)
            bs = join(bs, {arg, v})
          end
        end
        _g79 = _g79 + 1
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
          local _g66 = form[1]
          local args = form[2]
          local body = sub(form, 2)
          add(environment, {_scope = true})
          local _g82 = args
          local _g83 = 0
          while _g83 < length(_g82) do
            local _g80 = _g82[_g83 + 1]
            setenv(_g80, {_stash = true, variable = true})
            _g83 = _g83 + 1
          end
          local _g81 = join({"%function", map(macroexpand, args)}, macroexpand(body))
          drop(environment)
          return(_g81)
        else
          if x == "%local-function" or x == "%global-function" then
            local _g67 = form[1]
            local name = form[2]
            local _g84 = form[3]
            local _g85 = sub(form, 3)
            add(environment, {_scope = true})
            local _g88 = _g84
            local _g89 = 0
            while _g89 < length(_g88) do
              local _g86 = _g88[_g89 + 1]
              setenv(_g86, {_stash = true, variable = true})
              _g89 = _g89 + 1
            end
            local _g87 = join({x, name, map(macroexpand, _g84)}, macroexpand(_g85))
            drop(environment)
            return(_g87)
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
    local _g90 = form
    local k = nil
    for k in next, _g90 do
      if not number63(k) then
        local v = _g90[k]
        local _g107
        if quasisplice63(v, depth) then
          _g107 = quasiexpand(v[2])
        else
          _g107 = quasiexpand(v, depth)
        end
        local _g91 = _g107
        last(xs)[k] = _g91
      end
    end
    local _g92 = form
    local _g93 = 0
    while _g93 < length(_g92) do
      local x = _g92[_g93 + 1]
      if quasisplice63(x, depth) then
        local _g94 = quasiexpand(x[2])
        add(xs, _g94)
        add(xs, {"list"})
      else
        add(last(xs), quasiexpand(x, depth))
      end
      _g93 = _g93 + 1
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
      local _g108
      if c == "-" then
        _g108 = "_"
      else
        local _g109
        if valid_char63(n) then
          _g109 = c
        else
          local _g110
          if i == 0 then
            _g110 = "_" .. n
          else
            _g110 = n
          end
          _g109 = _g110
        end
        _g108 = _g109
      end
      local c1 = _g108
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
    local _g100 = unstash({...})
    local all = _g100.all
    local m = make_id()
    local k = module_key(spec)
    local imports = {}
    if nexus[k] then
      local _g101 = module(spec).export
      local n = nil
      for n in next, _g101 do
        if not number63(n) then
          local b = _g101[n]
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
    local _g102 = t
    local k = nil
    for k in next, _g102 do
      if not number63(k) then
        local v = _g102[k]
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
    local _g103 = {"table"}
    _g103.alias = quoted(m.alias)
    _g103.export = quote_frame(m.export)
    _g103.import = quoted(m.import)
    return(_g103)
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
  local _g112 = nexus["lumen/runtime"]
  local _37 = _g112["%"]
  local _37message_handler = _g112["%message-handler"]
  local _42 = _g112["*"]
  local _43 = _g112["+"]
  local _ = _g112["-"]
  local _47 = _g112["/"]
  local _60 = _g112["<"]
  local _6061 = _g112["<="]
  local _61 = _g112["="]
  local _62 = _g112[">"]
  local _6261 = _g112[">="]
  local abs = _g112.abs
  local acos = _g112.acos
  local add = _g112.add
  local apply = _g112.apply
  local asin = _g112.asin
  local atan = _g112.atan
  local atan2 = _g112.atan2
  local atom63 = _g112["atom?"]
  local boolean63 = _g112["boolean?"]
  local cat = _g112.cat
  local ceil = _g112.ceil
  local char = _g112.char
  local code = _g112.code
  local composite63 = _g112["composite?"]
  local cos = _g112.cos
  local drop = _g112.drop
  local empty63 = _g112["empty?"]
  local exclude = _g112.exclude
  local exit = _g112.exit
  local extend = _g112.extend
  local find = _g112.find
  local flat = _g112.flat
  local flat1 = _g112.flat1
  local floor = _g112.floor
  local function63 = _g112["function?"]
  local hd = _g112.hd
  local id_literal63 = _g112["id-literal?"]
  local in63 = _g112["in?"]
  local inner = _g112.inner
  local is63 = _g112["is?"]
  local iterate = _g112.iterate
  local join = _g112.join
  local keep = _g112.keep
  local keys63 = _g112["keys?"]
  local last = _g112.last
  local length = _g112.length
  local list63 = _g112["list?"]
  local log = _g112.log
  local log10 = _g112.log10
  local make_id = _g112["make-id"]
  local map = _g112.map
  local max = _g112.max
  local min = _g112.min
  local module = _g112.module
  local module_key = _g112["module-key"]
  local nil63 = _g112["nil?"]
  local none63 = _g112["none?"]
  local number = _g112.number
  local number63 = _g112["number?"]
  local pairwise = _g112.pairwise
  local pow = _g112.pow
  local random = _g112.random
  local read_file = _g112["read-file"]
  local reduce = _g112.reduce
  local replicate = _g112.replicate
  local reverse = _g112.reverse
  local sd = _g112.sd
  local search = _g112.search
  local setenv = _g112.setenv
  local sin = _g112.sin
  local sinh = _g112.sinh
  local some63 = _g112["some?"]
  local sort = _g112.sort
  local splice = _g112.splice
  local split = _g112.split
  local sqrt = _g112.sqrt
  local stash = _g112.stash
  local string = _g112.string
  local string_literal63 = _g112["string-literal?"]
  local string63 = _g112["string?"]
  local sub = _g112.sub
  local sublist = _g112.sublist
  local substring = _g112.substring
  local table63 = _g112["table?"]
  local tan = _g112.tan
  local tanh = _g112.tanh
  local td = _g112.td
  local tl = _g112.tl
  local toplevel63 = _g112["toplevel?"]
  local unstash = _g112.unstash
  local write = _g112.write
  local write_file = _g112["write-file"]
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
  local _g125 = nexus["lumen/utilities"]
  local bind = _g125.bind
  local bind42 = _g125["bind*"]
  local bound63 = _g125["bound?"]
  local getenv = _g125.getenv
  local id = _g125.id
  local imported = _g125.imported
  local indentation = _g125.indentation
  local initial_environment = _g125["initial-environment"]
  local linked = _g125.linked
  local macro_function = _g125["macro-function"]
  local macro63 = _g125["macro?"]
  local macroexpand = _g125.macroexpand
  local mapo = _g125.mapo
  local quasiexpand = _g125.quasiexpand
  local quote_environment = _g125["quote-environment"]
  local quote_modules = _g125["quote-modules"]
  local quoted = _g125.quoted
  local reserved63 = _g125["reserved?"]
  local sortk = _g125.sortk
  local special_form63 = _g125["special-form?"]
  local special63 = _g125["special?"]
  local stash42 = _g125["stash*"]
  local statement63 = _g125["statement?"]
  local symbol_expansion = _g125["symbol-expansion"]
  local symbol63 = _g125["symbol?"]
  local toplevel63 = _g125["toplevel?"]
  local valid_id63 = _g125["valid-id?"]
  local variable63 = _g125["variable?"]
  local _g126 = nexus["lumen/reader"]
  local make_stream = _g126["make-stream"]
  local read = _g126.read
  local read_all = _g126["read-all"]
  local read_from_string = _g126["read-from-string"]
  local read_table = _g126["read-table"]
  local _g127 = nexus["lumen/runtime"]
  local _37 = _g127["%"]
  local _37message_handler = _g127["%message-handler"]
  local _42 = _g127["*"]
  local _43 = _g127["+"]
  local _ = _g127["-"]
  local _47 = _g127["/"]
  local _60 = _g127["<"]
  local _6061 = _g127["<="]
  local _61 = _g127["="]
  local _62 = _g127[">"]
  local _6261 = _g127[">="]
  local abs = _g127.abs
  local acos = _g127.acos
  local add = _g127.add
  local apply = _g127.apply
  local asin = _g127.asin
  local atan = _g127.atan
  local atan2 = _g127.atan2
  local atom63 = _g127["atom?"]
  local boolean63 = _g127["boolean?"]
  local cat = _g127.cat
  local ceil = _g127.ceil
  local char = _g127.char
  local code = _g127.code
  local composite63 = _g127["composite?"]
  local cos = _g127.cos
  local drop = _g127.drop
  local empty63 = _g127["empty?"]
  local exclude = _g127.exclude
  local exit = _g127.exit
  local extend = _g127.extend
  local find = _g127.find
  local flat = _g127.flat
  local flat1 = _g127.flat1
  local floor = _g127.floor
  local function63 = _g127["function?"]
  local hd = _g127.hd
  local id_literal63 = _g127["id-literal?"]
  local in63 = _g127["in?"]
  local inner = _g127.inner
  local is63 = _g127["is?"]
  local iterate = _g127.iterate
  local join = _g127.join
  local keep = _g127.keep
  local keys63 = _g127["keys?"]
  local last = _g127.last
  local length = _g127.length
  local list63 = _g127["list?"]
  local log = _g127.log
  local log10 = _g127.log10
  local make_id = _g127["make-id"]
  local map = _g127.map
  local max = _g127.max
  local min = _g127.min
  local module = _g127.module
  local module_key = _g127["module-key"]
  local nil63 = _g127["nil?"]
  local none63 = _g127["none?"]
  local number = _g127.number
  local number63 = _g127["number?"]
  local pairwise = _g127.pairwise
  local pow = _g127.pow
  local random = _g127.random
  local read_file = _g127["read-file"]
  local reduce = _g127.reduce
  local replicate = _g127.replicate
  local reverse = _g127.reverse
  local sd = _g127.sd
  local search = _g127.search
  local setenv = _g127.setenv
  local sin = _g127.sin
  local sinh = _g127.sinh
  local some63 = _g127["some?"]
  local sort = _g127.sort
  local splice = _g127.splice
  local split = _g127.split
  local sqrt = _g127.sqrt
  local stash = _g127.stash
  local string = _g127.string
  local string_literal63 = _g127["string-literal?"]
  local string63 = _g127["string?"]
  local sub = _g127.sub
  local sublist = _g127.sublist
  local substring = _g127.substring
  local table63 = _g127["table?"]
  local tan = _g127.tan
  local tanh = _g127.tanh
  local td = _g127.td
  local tl = _g127.tl
  local toplevel63 = _g127["toplevel?"]
  local unstash = _g127.unstash
  local write = _g127.write
  local write_file = _g127["write-file"]
  local _g133 = {}
  _g133.js = "!"
  _g133.lua = "not "
  local _g131 = {}
  local _g134 = {}
  _g134.js = "!"
  _g134.lua = "not "
  _g131["not"] = _g134
  local _g136 = {}
  _g136["%"] = true
  _g136["*"] = true
  _g136["/"] = true
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
  _g145["<="] = true
  _g145[">"] = true
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
    return(length(args) == 1 and in63(op, {"not", "-"}))
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
    local _g190
    if right then
      _g190 = _6261
    else
      _g190 = _62
    end
    if _g190(precedence(child), precedence(parent)) then
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
    local _g191
    if name then
      _g191 = compile(name)
    else
      _g191 = ""
    end
    local id = _g191
    local _g175 = prefix or ""
    local _g176 = compile_args(args)
    indent_level = indent_level + 1
    local _g178 = compile(body, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local _g177 = _g178
    local ind = indentation()
    local _g192
    if target == "js" then
      _g192 = ""
    else
      _g192 = "end"
    end
    local tr = _g192
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
        local _g193
        if stmt then
          _g193 = indentation()
        else
          _g193 = ""
        end
        local ind = _g193
        local _g194
        if atom63(form) then
          _g194 = compile_atom(form)
        else
          local _g195
          if infix63(hd(form)) then
            _g195 = compile_infix(form)
          else
            _g195 = compile_call(form)
          end
          _g194 = _g195
        end
        local _g180 = _g194
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
      local _g197
      if _g184 then
        _g197 = {lower_body({_g184}, tail63)}
      end
      return(add(hoist, join({"%if", lower(cond, hoist), lower_body({_g183}, tail63)}, _g197)))
    else
      local e = make_id()
      add(hoist, {"%local", e})
      local _g196
      if _g184 then
        _g196 = {lower({"set", e, _g184})}
      end
      add(hoist, join({"%if", lower(cond, hoist), lower({"set", e, _g183})}, _g196))
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
      local _g198
      if x == "and" then
        _g198 = {"%if", id, b, id}
      else
        _g198 = {"%if", id, id, b}
      end
      return(lower({"do", {"%local", id, a}, _g198}, hoist))
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
    local all = _g187.all
    local m = module(spec)
    local frame = last(environment)
    local _g188 = m.export
    local k = nil
    for k in next, _g188 do
      if not number63(k) then
        local v = _g188[k]
        if v.export or all then
          frame[k] = v
        end
      end
    end
  end
  nexus["lumen/compiler"]["open-module"] = open_module
  local function load_module(spec, ...)
    local _g189 = unstash({...})
    local all = _g189.all
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
  local _g200 = nexus["lumen/utilities"]
  local bind = _g200.bind
  local bind42 = _g200["bind*"]
  local bound63 = _g200["bound?"]
  local getenv = _g200.getenv
  local id = _g200.id
  local imported = _g200.imported
  local indentation = _g200.indentation
  local initial_environment = _g200["initial-environment"]
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
  local toplevel63 = _g200["toplevel?"]
  local valid_id63 = _g200["valid-id?"]
  local variable63 = _g200["variable?"]
  local _g201 = nexus["lumen/compiler"]
  local compile = _g201.compile
  local compile_function = _g201["compile-function"]
  local compile_module = _g201["compile-module"]
  local declare = _g201.declare
  local eval = _g201.eval
  local in_module = _g201["in-module"]
  local load_module = _g201["load-module"]
  local open_module = _g201["open-module"]
  local _g202 = nexus["lumen/runtime"]
  local _37 = _g202["%"]
  local _37message_handler = _g202["%message-handler"]
  local _42 = _g202["*"]
  local _43 = _g202["+"]
  local _ = _g202["-"]
  local _47 = _g202["/"]
  local _60 = _g202["<"]
  local _6061 = _g202["<="]
  local _61 = _g202["="]
  local _62 = _g202[">"]
  local _6261 = _g202[">="]
  local abs = _g202.abs
  local acos = _g202.acos
  local add = _g202.add
  local apply = _g202.apply
  local asin = _g202.asin
  local atan = _g202.atan
  local atan2 = _g202.atan2
  local atom63 = _g202["atom?"]
  local boolean63 = _g202["boolean?"]
  local cat = _g202.cat
  local ceil = _g202.ceil
  local char = _g202.char
  local code = _g202.code
  local composite63 = _g202["composite?"]
  local cos = _g202.cos
  local drop = _g202.drop
  local empty63 = _g202["empty?"]
  local exclude = _g202.exclude
  local exit = _g202.exit
  local extend = _g202.extend
  local find = _g202.find
  local flat = _g202.flat
  local flat1 = _g202.flat1
  local floor = _g202.floor
  local function63 = _g202["function?"]
  local hd = _g202.hd
  local id_literal63 = _g202["id-literal?"]
  local in63 = _g202["in?"]
  local inner = _g202.inner
  local is63 = _g202["is?"]
  local iterate = _g202.iterate
  local join = _g202.join
  local keep = _g202.keep
  local keys63 = _g202["keys?"]
  local last = _g202.last
  local length = _g202.length
  local list63 = _g202["list?"]
  local log = _g202.log
  local log10 = _g202.log10
  local make_id = _g202["make-id"]
  local map = _g202.map
  local max = _g202.max
  local min = _g202.min
  local module = _g202.module
  local module_key = _g202["module-key"]
  local nil63 = _g202["nil?"]
  local none63 = _g202["none?"]
  local number = _g202.number
  local number63 = _g202["number?"]
  local pairwise = _g202.pairwise
  local pow = _g202.pow
  local random = _g202.random
  local read_file = _g202["read-file"]
  local reduce = _g202.reduce
  local replicate = _g202.replicate
  local reverse = _g202.reverse
  local sd = _g202.sd
  local search = _g202.search
  local setenv = _g202.setenv
  local sin = _g202.sin
  local sinh = _g202.sinh
  local some63 = _g202["some?"]
  local sort = _g202.sort
  local splice = _g202.splice
  local split = _g202.split
  local sqrt = _g202.sqrt
  local stash = _g202.stash
  local string = _g202.string
  local string_literal63 = _g202["string-literal?"]
  local string63 = _g202["string?"]
  local sub = _g202.sub
  local sublist = _g202.sublist
  local substring = _g202.substring
  local table63 = _g202["table?"]
  local tan = _g202.tan
  local tanh = _g202.tanh
  local td = _g202.td
  local tl = _g202.tl
  local toplevel63 = _g202["toplevel?"]
  local unstash = _g202.unstash
  local write = _g202.write
  local write_file = _g202["write-file"]
end)();
(function ()
  nexus["lumen/core"] = {}
  local _g401 = nexus["lumen/utilities"]
  local bind = _g401.bind
  local bind42 = _g401["bind*"]
  local bound63 = _g401["bound?"]
  local getenv = _g401.getenv
  local id = _g401.id
  local imported = _g401.imported
  local indentation = _g401.indentation
  local initial_environment = _g401["initial-environment"]
  local linked = _g401.linked
  local macro_function = _g401["macro-function"]
  local macro63 = _g401["macro?"]
  local macroexpand = _g401.macroexpand
  local mapo = _g401.mapo
  local quasiexpand = _g401.quasiexpand
  local quote_environment = _g401["quote-environment"]
  local quote_modules = _g401["quote-modules"]
  local quoted = _g401.quoted
  local reserved63 = _g401["reserved?"]
  local sortk = _g401.sortk
  local special_form63 = _g401["special-form?"]
  local special63 = _g401["special?"]
  local stash42 = _g401["stash*"]
  local statement63 = _g401["statement?"]
  local symbol_expansion = _g401["symbol-expansion"]
  local symbol63 = _g401["symbol?"]
  local toplevel63 = _g401["toplevel?"]
  local valid_id63 = _g401["valid-id?"]
  local variable63 = _g401["variable?"]
  local _g402 = nexus["lumen/compiler"]
  local compile = _g402.compile
  local compile_function = _g402["compile-function"]
  local compile_module = _g402["compile-module"]
  local declare = _g402.declare
  local eval = _g402.eval
  local in_module = _g402["in-module"]
  local load_module = _g402["load-module"]
  local open_module = _g402["open-module"]
  local _g403 = nexus["lumen/runtime"]
  local _37 = _g403["%"]
  local _37message_handler = _g403["%message-handler"]
  local _42 = _g403["*"]
  local _43 = _g403["+"]
  local _ = _g403["-"]
  local _47 = _g403["/"]
  local _60 = _g403["<"]
  local _6061 = _g403["<="]
  local _61 = _g403["="]
  local _62 = _g403[">"]
  local _6261 = _g403[">="]
  local abs = _g403.abs
  local acos = _g403.acos
  local add = _g403.add
  local apply = _g403.apply
  local asin = _g403.asin
  local atan = _g403.atan
  local atan2 = _g403.atan2
  local atom63 = _g403["atom?"]
  local boolean63 = _g403["boolean?"]
  local cat = _g403.cat
  local ceil = _g403.ceil
  local char = _g403.char
  local code = _g403.code
  local composite63 = _g403["composite?"]
  local cos = _g403.cos
  local drop = _g403.drop
  local empty63 = _g403["empty?"]
  local exclude = _g403.exclude
  local exit = _g403.exit
  local extend = _g403.extend
  local find = _g403.find
  local flat = _g403.flat
  local flat1 = _g403.flat1
  local floor = _g403.floor
  local function63 = _g403["function?"]
  local hd = _g403.hd
  local id_literal63 = _g403["id-literal?"]
  local in63 = _g403["in?"]
  local inner = _g403.inner
  local is63 = _g403["is?"]
  local iterate = _g403.iterate
  local join = _g403.join
  local keep = _g403.keep
  local keys63 = _g403["keys?"]
  local last = _g403.last
  local length = _g403.length
  local list63 = _g403["list?"]
  local log = _g403.log
  local log10 = _g403.log10
  local make_id = _g403["make-id"]
  local map = _g403.map
  local max = _g403.max
  local min = _g403.min
  local module = _g403.module
  local module_key = _g403["module-key"]
  local nil63 = _g403["nil?"]
  local none63 = _g403["none?"]
  local number = _g403.number
  local number63 = _g403["number?"]
  local pairwise = _g403.pairwise
  local pow = _g403.pow
  local random = _g403.random
  local read_file = _g403["read-file"]
  local reduce = _g403.reduce
  local replicate = _g403.replicate
  local reverse = _g403.reverse
  local sd = _g403.sd
  local search = _g403.search
  local setenv = _g403.setenv
  local sin = _g403.sin
  local sinh = _g403.sinh
  local some63 = _g403["some?"]
  local sort = _g403.sort
  local splice = _g403.splice
  local split = _g403.split
  local sqrt = _g403.sqrt
  local stash = _g403.stash
  local string = _g403.string
  local string_literal63 = _g403["string-literal?"]
  local string63 = _g403["string?"]
  local sub = _g403.sub
  local sublist = _g403.sublist
  local substring = _g403.substring
  local table63 = _g403["table?"]
  local tan = _g403.tan
  local tanh = _g403.tanh
  local td = _g403.td
  local tl = _g403.tl
  local toplevel63 = _g403["toplevel?"]
  local unstash = _g403.unstash
  local write = _g403.write
  local write_file = _g403["write-file"]
  target = "lua"
end)();
(function ()
  nexus["lumen/boot"] = {}
  local _g741 = nexus["lumen/utilities"]
  local bind = _g741.bind
  local bind42 = _g741["bind*"]
  local bound63 = _g741["bound?"]
  local getenv = _g741.getenv
  local id = _g741.id
  local imported = _g741.imported
  local indentation = _g741.indentation
  local initial_environment = _g741["initial-environment"]
  local linked = _g741.linked
  local macro_function = _g741["macro-function"]
  local macro63 = _g741["macro?"]
  local macroexpand = _g741.macroexpand
  local mapo = _g741.mapo
  local quasiexpand = _g741.quasiexpand
  local quote_environment = _g741["quote-environment"]
  local quote_modules = _g741["quote-modules"]
  local quoted = _g741.quoted
  local reserved63 = _g741["reserved?"]
  local sortk = _g741.sortk
  local special_form63 = _g741["special-form?"]
  local special63 = _g741["special?"]
  local stash42 = _g741["stash*"]
  local statement63 = _g741["statement?"]
  local symbol_expansion = _g741["symbol-expansion"]
  local symbol63 = _g741["symbol?"]
  local toplevel63 = _g741["toplevel?"]
  local valid_id63 = _g741["valid-id?"]
  local variable63 = _g741["variable?"]
  local _g742 = nexus["lumen/compiler"]
  local compile = _g742.compile
  local compile_function = _g742["compile-function"]
  local compile_module = _g742["compile-module"]
  local declare = _g742.declare
  local eval = _g742.eval
  local in_module = _g742["in-module"]
  local load_module = _g742["load-module"]
  local open_module = _g742["open-module"]
  local _g743 = nexus["lumen/runtime"]
  local _37 = _g743["%"]
  local _37message_handler = _g743["%message-handler"]
  local _42 = _g743["*"]
  local _43 = _g743["+"]
  local _ = _g743["-"]
  local _47 = _g743["/"]
  local _60 = _g743["<"]
  local _6061 = _g743["<="]
  local _61 = _g743["="]
  local _62 = _g743[">"]
  local _6261 = _g743[">="]
  local abs = _g743.abs
  local acos = _g743.acos
  local add = _g743.add
  local apply = _g743.apply
  local asin = _g743.asin
  local atan = _g743.atan
  local atan2 = _g743.atan2
  local atom63 = _g743["atom?"]
  local boolean63 = _g743["boolean?"]
  local cat = _g743.cat
  local ceil = _g743.ceil
  local char = _g743.char
  local code = _g743.code
  local composite63 = _g743["composite?"]
  local cos = _g743.cos
  local drop = _g743.drop
  local empty63 = _g743["empty?"]
  local exclude = _g743.exclude
  local exit = _g743.exit
  local extend = _g743.extend
  local find = _g743.find
  local flat = _g743.flat
  local flat1 = _g743.flat1
  local floor = _g743.floor
  local function63 = _g743["function?"]
  local hd = _g743.hd
  local id_literal63 = _g743["id-literal?"]
  local in63 = _g743["in?"]
  local inner = _g743.inner
  local is63 = _g743["is?"]
  local iterate = _g743.iterate
  local join = _g743.join
  local keep = _g743.keep
  local keys63 = _g743["keys?"]
  local last = _g743.last
  local length = _g743.length
  local list63 = _g743["list?"]
  local log = _g743.log
  local log10 = _g743.log10
  local make_id = _g743["make-id"]
  local map = _g743.map
  local max = _g743.max
  local min = _g743.min
  local module = _g743.module
  local module_key = _g743["module-key"]
  local nil63 = _g743["nil?"]
  local none63 = _g743["none?"]
  local number = _g743.number
  local number63 = _g743["number?"]
  local pairwise = _g743.pairwise
  local pow = _g743.pow
  local random = _g743.random
  local read_file = _g743["read-file"]
  local reduce = _g743.reduce
  local replicate = _g743.replicate
  local reverse = _g743.reverse
  local sd = _g743.sd
  local search = _g743.search
  local setenv = _g743.setenv
  local sin = _g743.sin
  local sinh = _g743.sinh
  local some63 = _g743["some?"]
  local sort = _g743.sort
  local splice = _g743.splice
  local split = _g743.split
  local sqrt = _g743.sqrt
  local stash = _g743.stash
  local string = _g743.string
  local string_literal63 = _g743["string-literal?"]
  local string63 = _g743["string?"]
  local sub = _g743.sub
  local sublist = _g743.sublist
  local substring = _g743.substring
  local table63 = _g743["table?"]
  local tan = _g743.tan
  local tanh = _g743.tanh
  local td = _g743.td
  local tl = _g743.tl
  local toplevel63 = _g743["toplevel?"]
  local unstash = _g743.unstash
  local write = _g743.write
  local write_file = _g743["write-file"]
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
    local _g804 = sub(bs, 0)
    return({"set", a, join({"cat", a}, _g804)})
  end}, dec = {export = true, macro = function (n, by)
    return({"set", n, {"-", n, by or 1}})
  end}, define = {export = true, macro = function (name, x, ...)
    local body = unstash({...})
    local _g783 = sub(body, 0)
    setenv(name, {_stash = true, variable = true})
    if some63(_g783) then
      local _g784 = bind42(x, _g783)
      local args = _g784[1]
      local _g785 = _g784[2]
      return(linked(name, join({"%local-function", name, args}, _g785)))
    else
      return(linked(name, {"%local", name, x}))
    end
  end}, ["define*"] = {export = true, macro = function (name, x, ...)
    local body = unstash({...})
    local _g780 = sub(body, 0)
    setenv(name, {_stash = true, export = true, global = true})
    if some63(_g780) then
      local _g781 = bind42(x, _g780)
      local args = _g781[1]
      local _g782 = _g781[2]
      return(join({"%global-function", name, args}, _g782))
    else
      if target == "js" then
        return({"set", {"get", "global", {"quote", id(name)}}, x})
      else
        return({"set", name, x})
      end
    end
  end}, ["define-macro"] = {export = true, macro = function (name, args, ...)
    local body = unstash({...})
    local _g776 = sub(body, 0)
    local form = join({"fn", args}, _g776)
    local _g777 = {"setenv", {"quote", name}}
    _g777.form = {"quote", form}
    _g777.macro = form
    eval(_g777)
    return(nil)
  end}, ["define-module"] = {export = true, macro = function (spec, ...)
    local body = unstash({...})
    local _g769 = sub(body, 0)
    local imports = {}
    local aliased = {}
    local alias = _g769.alias
    local exp = _g769.export
    local imp = _g769.import
    local _g770 = imp or {}
    local _g771 = 0
    while _g771 < length(_g770) do
      local k = _g770[_g771 + 1]
      load_module(k)
      local _g772 = module(k).alias or {}
      local _g773 = 0
      while _g773 < length(_g772) do
        local a = _g772[_g773 + 1]
        add(imp, a)
        _g773 = _g773 + 1
      end
      imports = join(imports, imported(k))
      _g771 = _g771 + 1
    end
    modules[module_key(spec)] = {alias = alias, export = {}, import = imp}
    local _g774 = exp or {}
    local _g775 = 0
    while _g775 < length(_g774) do
      local k = _g774[_g775 + 1]
      setenv(k, {_stash = true, export = true})
      _g775 = _g775 + 1
    end
    local k = module_key(current_module)
    return(join({"do", {"set", {"get", "nexus", {"quote", k}}, {"table"}}}, imports))
  end}, ["define-special"] = {export = true, macro = function (name, args, ...)
    local body = unstash({...})
    local _g778 = sub(body, 0)
    local form = join({"fn", args}, _g778)
    local keys = sub(_g778, length(_g778))
    local _g779 = {"setenv", {"quote", name}}
    _g779.form = {"quote", form}
    _g779.special = form
    eval(join(_g779, keys))
    return(nil)
  end}, ["define-symbol"] = {export = true, macro = function (name, expansion)
    setenv(name, {_stash = true, symbol = expansion})
    return(nil)
  end}, each = {export = true, macro = function (b, t, ...)
    local body = unstash({...})
    local _g799 = sub(body, 0)
    local k = b[1]
    local v = b[2]
    local t1 = make_id()
    local _g839
    if nil63(v) then
      local _g840
      if b.i then
        _g840 = "i"
      else
        _g840 = make_id()
      end
      local i = _g840
      _g839 = {"let", {i, 0}, {"while", {"<", i, {"length", t1}}, join({"let", {k, {"at", t1, i}}}, _g799), {"inc", i}}}
    else
      local _g800 = {"target"}
      _g800.js = {"isNaN", {"parseInt", k}}
      _g800.lua = {"not", {"number?", k}}
      _g839 = {"let", {k, "nil"}, {"%for", t1, k, {"when", _g800, join({"let", {v, {"get", t1, k}}}, _g799)}}}
    end
    return({"let", {t1, t}, _g839})
  end}, fn = {export = true, macro = function (args, ...)
    local body = unstash({...})
    local _g795 = sub(body, 0)
    local _g796 = bind42(args, _g795)
    local _g797 = _g796[1]
    local _g798 = _g796[2]
    return(join({"%function", _g797}, _g798))
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
    local _g803 = sub(bs, 0)
    return({"set", a, join({"join*", a}, _g803)})
  end}, ["join*"] = {export = true, macro = function (...)
    local xs = unstash({...})
    return(reduce(function (a, b)
      return({"join", a, b})
    end, xs))
  end}, language = {export = true, macro = function ()
    return({"quote", target})
  end}, let = {export = true, macro = function (bindings, ...)
    local body = unstash({...})
    local _g764 = sub(body, 0)
    local i = 0
    local renames = {}
    local locals = {}
    map(function (_g765)
      local lh = _g765[1]
      local rh = _g765[2]
      local _g766 = bind(lh, rh)
      local _g767 = 0
      while _g767 < length(_g766) do
        local _g768 = _g766[_g767 + 1]
        local id = _g768[1]
        local val = _g768[2]
        if bound63(id) or reserved63(id) or toplevel63() then
          local rename = make_id()
          add(renames, id)
          add(renames, rename)
          id = rename
        else
          setenv(id, {_stash = true, variable = true})
        end
        add(locals, {"%local", id, val})
        _g767 = _g767 + 1
      end
    end, pairwise(bindings))
    return(join({"do"}, join(locals, {join({"let-symbol", renames}, _g764)})))
  end}, ["let-macro"] = {export = true, macro = function (definitions, ...)
    local body = unstash({...})
    local _g790 = sub(body, 0)
    add(environment, {})
    map(function (m)
      return(macroexpand(join({"define-macro"}, m)))
    end, definitions)
    local _g791 = join({"do"}, macroexpand(_g790))
    drop(environment)
    return(_g791)
  end}, ["let-symbol"] = {export = true, macro = function (expansions, ...)
    local body = unstash({...})
    local _g792 = sub(body, 0)
    add(environment, {})
    map(function (_g794)
      local name = _g794[1]
      local exp = _g794[2]
      return(macroexpand({"define-symbol", name, exp}))
    end, pairwise(expansions))
    local _g793 = join({"do"}, macroexpand(_g792))
    drop(environment)
    return(_g793)
  end}, list = {export = true, macro = function (...)
    local body = unstash({...})
    local l = join({"%array"}, body)
    if not keys63(body) then
      return(l)
    else
      local id = make_id()
      local init = {}
      local _g760 = body
      local k = nil
      for k in next, _g760 do
        if not number63(k) then
          local v = _g760[k]
          add(init, {k, {"set", {"get", id, {"quote", k}}, v}})
        end
      end
      return(join({"let", {id, l}}, join(map(sd, sortk(init, hd)), {id})))
    end
  end}, pr = {export = true, macro = function (...)
    local xs = unstash({...})
    local _g805 = map(function (x)
      return(splice({{"string", x}, "\" \""}))
    end, xs)
    return({"print", join({"cat"}, _g805)})
  end}, quasiquote = {export = true, macro = function (form)
    return(quasiexpand(form, 1))
  end}, quote = {export = true, macro = function (form)
    return(quoted(form))
  end}, ["set*"] = {export = true, macro = function (name, value)
    return(linked(name, {"set", name, value}))
  end}, ["set-of"] = {export = true, macro = function (...)
    local elements = unstash({...})
    local l = {}
    local _g801 = elements
    local _g802 = 0
    while _g802 < length(_g801) do
      local e = _g801[_g802 + 1]
      l[e] = true
      _g802 = _g802 + 1
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
    local _g763 = sub(body, 0)
    return({"if", {"not", cond}, join({"do"}, _g763)})
  end}, when = {export = true, macro = function (cond, ...)
    local body = unstash({...})
    local _g762 = sub(body, 0)
    return({"if", cond, join({"do"}, _g762)})
  end}, ["with-bindings"] = {export = true, macro = function (_g786, ...)
    local names = _g786[1]
    local body = unstash({...})
    local _g787 = sub(body, 0)
    local x = make_id()
    local _g789 = {"setenv", x}
    _g789.variable = true
    local _g788 = {"with-frame", {"each", {x}, names, _g789}}
    _g788.scope = true
    return(join(_g788, _g787))
  end}, ["with-frame"] = {export = true, macro = function (...)
    local body = unstash({...})
    local _g806 = sub(body, 0)
    local scope = body.scope
    local x = make_id()
    local _g807 = {"table"}
    _g807._scope = scope
    return({"do", {"add", "environment", _g807}, {"let", {x, join({"do"}, _g806)}, {"drop", "environment"}, x}})
  end}}, import = {{"lumen"}, {"lumen", "utilities"}, {"lumen", "compiler"}, {"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}}}, ["lumen/main"] = {export = {}, import = {{"lumen"}, {"lumen", "reader"}, {"lumen", "compiler"}, {"user"}, {"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}}}, ["lumen/reader"] = {export = {["define-reader"] = {export = true, macro = function (_g808, ...)
    local char = _g808[1]
    local stream = _g808[2]
    local body = unstash({...})
    local _g809 = sub(body, 0)
    return({"set", {"get", "read-table", char}, join({"fn", {stream}}, _g809)})
  end}, delimiters = {variable = true}, eof = {variable = true}, ["flag?"] = {variable = true}, ["key?"] = {variable = true}, ["make-stream"] = {export = true, variable = true}, ["peek-char"] = {variable = true}, read = {export = true, variable = true}, ["read-all"] = {export = true, variable = true}, ["read-char"] = {variable = true}, ["read-from-string"] = {export = true, variable = true}, ["read-table"] = {export = true, variable = true}, ["skip-non-code"] = {variable = true}, whitespace = {variable = true}}, import = {"lumen", {"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}}}, ["lumen/runtime"] = {export = {["%"] = {export = true, variable = true}, ["%message-handler"] = {export = true, variable = true}, ["*"] = {export = true, variable = true}, ["+"] = {export = true, variable = true}, ["-"] = {export = true, variable = true}, ["/"] = {export = true, variable = true}, ["<"] = {export = true, variable = true}, ["<="] = {export = true, variable = true}, ["="] = {export = true, variable = true}, [">"] = {export = true, variable = true}, [">="] = {export = true, variable = true}, abs = {export = true, variable = true}, acos = {export = true, variable = true}, add = {export = true, variable = true}, apply = {export = true, variable = true}, asin = {export = true, variable = true}, atan = {export = true, variable = true}, atan2 = {export = true, variable = true}, ["atom?"] = {export = true, variable = true}, ["boolean?"] = {export = true, variable = true}, cat = {export = true, variable = true}, ceil = {export = true, variable = true}, char = {export = true, variable = true}, code = {export = true, variable = true}, ["composite?"] = {export = true, variable = true}, cos = {export = true, variable = true}, drop = {export = true, variable = true}, ["empty?"] = {export = true, variable = true}, exclude = {export = true, variable = true}, exit = {export = true, variable = true}, extend = {export = true, variable = true}, find = {export = true, variable = true}, flat = {export = true, variable = true}, flat1 = {export = true, variable = true}, floor = {export = true, variable = true}, ["function?"] = {export = true, variable = true}, hd = {export = true, variable = true}, ["id-count"] = {variable = true}, ["id-literal?"] = {export = true, variable = true}, ["in?"] = {export = true, variable = true}, inner = {export = true, variable = true}, ["is?"] = {export = true, variable = true}, iterate = {export = true, variable = true}, join = {export = true, variable = true}, keep = {export = true, variable = true}, ["keys?"] = {export = true, variable = true}, last = {export = true, variable = true}, length = {export = true, variable = true}, ["list?"] = {export = true, variable = true}, log = {export = true, variable = true}, log10 = {export = true, variable = true}, ["make-id"] = {export = true, variable = true}, map = {export = true, variable = true}, mapl = {variable = true}, math = {variable = true}, max = {export = true, variable = true}, min = {export = true, variable = true}, module = {export = true, variable = true}, ["module-key"] = {export = true, variable = true}, ["nil?"] = {export = true, variable = true}, ["none?"] = {export = true, variable = true}, number = {export = true, variable = true}, ["number?"] = {export = true, variable = true}, pairwise = {export = true, variable = true}, pow = {export = true, variable = true}, random = {export = true, variable = true}, ["read-file"] = {export = true, variable = true}, reduce = {export = true, variable = true}, replicate = {export = true, variable = true}, reverse = {export = true, variable = true}, sd = {export = true, variable = true}, search = {export = true, variable = true}, setenv = {export = true, variable = true}, sin = {export = true, variable = true}, sinh = {export = true, variable = true}, ["some?"] = {export = true, variable = true}, sort = {export = true, variable = true}, splice = {export = true, variable = true}, ["splice?"] = {variable = true}, split = {export = true, variable = true}, sqrt = {export = true, variable = true}, stash = {export = true, variable = true}, string = {export = true, variable = true}, ["string-literal?"] = {export = true, variable = true}, ["string?"] = {export = true, variable = true}, sub = {export = true, variable = true}, sublist = {export = true, variable = true}, substring = {export = true, variable = true}, ["table?"] = {export = true, variable = true}, tan = {export = true, variable = true}, tanh = {export = true, variable = true}, td = {export = true, variable = true}, tl = {export = true, variable = true}, ["toplevel?"] = {export = true, variable = true}, unstash = {export = true, variable = true}, write = {export = true, variable = true}, ["write-file"] = {export = true, variable = true}}, import = {{"lumen", "special"}, {"lumen", "core"}}}, ["lumen/special"] = {export = {["%array"] = {export = true, foo = true, special = function (...)
    local forms = unstash({...})
    local _g847
    if target == "lua" then
      _g847 = "{"
    else
      _g847 = "["
    end
    local open = _g847
    local _g848
    if target == "lua" then
      _g848 = "}"
    else
      _g848 = "]"
    end
    local close = _g848
    local str = ""
    local _g827 = forms
    local i = 0
    while i < length(_g827) do
      local x = _g827[i + 1]
      str = str .. compile(x)
      if i < length(forms) - 1 then
        str = str .. ", "
      end
      i = i + 1
    end
    return(open .. str .. close)
  end}, ["%for"] = {export = true, foo = true, special = function (t, k, form)
    local _g819 = compile(t)
    local ind = indentation()
    indent_level = indent_level + 1
    local _g820 = compile(form, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local body = _g820
    if target == "lua" then
      return(ind .. "for " .. k .. " in next, " .. _g819 .. " do\n" .. body .. ind .. "end\n")
    else
      return(ind .. "for (" .. k .. " in " .. _g819 .. ") {\n" .. body .. ind .. "}\n")
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
    local _g812 = compile(cond)
    indent_level = indent_level + 1
    local _g815 = compile(cons, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local _g813 = _g815
    local _g841
    if alt then
      indent_level = indent_level + 1
      local _g816 = compile(alt, {_stash = true, stmt = true})
      indent_level = indent_level - 1
      _g841 = _g816
    end
    local _g814 = _g841
    local ind = indentation()
    local str = ""
    if target == "js" then
      str = str .. ind .. "if (" .. _g812 .. ") {\n" .. _g813 .. ind .. "}"
    else
      str = str .. ind .. "if " .. _g812 .. " then\n" .. _g813
    end
    if _g814 and target == "js" then
      str = str .. " else {\n" .. _g814 .. ind .. "}"
    else
      if _g814 then
        str = str .. ind .. "else\n" .. _g814
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
    local _g844
    if is63(value) then
      _g844 = " = " .. value1
    else
      _g844 = ""
    end
    local rh = _g844
    local _g845
    if target == "js" then
      _g845 = "var "
    else
      _g845 = "local "
    end
    local keyword = _g845
    local ind = indentation()
    return(ind .. keyword .. id .. rh)
  end, stmt = true}, ["%local-function"] = {export = true, foo = true, special = function (name, args, body)
    local x = compile_function(args, body, {_stash = true, name = name, prefix = "local "})
    return(indentation() .. x)
  end, stmt = true, tr = true}, ["%object"] = {export = true, foo = true, special = function (...)
    local forms = unstash({...})
    local str = "{"
    local _g849
    if target == "lua" then
      _g849 = " = "
    else
      _g849 = ": "
    end
    local sep = _g849
    local pairs = sortk(pairwise(forms), hd)
    local _g828 = pairs
    local i = 0
    while i < length(_g828) do
      local _g829 = _g828[i + 1]
      local k = _g829[1]
      local v = _g829[2]
      if not string63(k) then
        error("Illegal key: " .. string(k))
      end
      local _g830 = compile(v)
      local _g850
      if valid_id63(k) then
        _g850 = k
      else
        local _g851
        if target == "js" and string_literal63(k) then
          _g851 = k
        else
          local _g852
          if target == "js" then
            _g852 = quoted(k)
          else
            local _g853
            if string_literal63(k) then
              _g853 = "[" .. k .. "]"
            else
              _g853 = "[" .. quoted(k) .. "]"
            end
            _g852 = _g853
          end
          _g851 = _g852
        end
        _g850 = _g851
      end
      local _g831 = _g850
      str = str .. _g831 .. sep .. _g830
      if i < length(pairs) - 1 then
        str = str .. ", "
      end
      i = i + 1
    end
    return(str .. "}")
  end}, ["%try"] = {export = true, foo = true, special = function (form)
    local ind = indentation()
    indent_level = indent_level + 1
    local _g821 = compile(form, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local body = _g821
    local e = make_id()
    local hf = {"return", {"%array", false, {"get", e, "\"message\""}}}
    indent_level = indent_level + 1
    local _g822 = compile(hf, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local h = _g822
    return(ind .. "try {\n" .. body .. ind .. "}\n" .. ind .. "catch (" .. e .. ") {\n" .. h .. ind .. "}\n")
  end, stmt = true, tr = true}, ["break"] = {export = true, foo = true, special = function ()
    return(indentation() .. "break")
  end, stmt = true}, ["do"] = {export = true, foo = true, special = function (...)
    local forms = unstash({...})
    local str = ""
    local _g810 = forms
    local _g811 = 0
    while _g811 < length(_g810) do
      local x = _g810[_g811 + 1]
      str = str .. compile(x, {_stash = true, stmt = true})
      _g811 = _g811 + 1
    end
    return(str)
  end, stmt = true, tr = true}, ["error"] = {export = true, foo = true, special = function (x)
    local _g843
    if target == "js" then
      _g843 = "throw new " .. compile({"Error", x})
    else
      _g843 = "error(" .. compile(x) .. ")"
    end
    local e = _g843
    return(indentation() .. e)
  end, stmt = true}, ["get"] = {export = true, foo = true, special = function (t, k)
    local _g826 = compile(t)
    local k1 = compile(k)
    if target == "lua" and char(_g826, 0) == "{" then
      _g826 = "(" .. _g826 .. ")"
    end
    if string_literal63(k) and valid_id63(inner(k)) then
      return(_g826 .. "." .. inner(k))
    else
      return(_g826 .. "[" .. k1 .. "]")
    end
  end}, ["not"] = {}, ["return"] = {export = true, foo = true, special = function (x)
    local _g842
    if nil63(x) then
      _g842 = "return"
    else
      _g842 = "return(" .. compile(x) .. ")"
    end
    local _g823 = _g842
    return(indentation() .. _g823)
  end, stmt = true}, ["set"] = {export = true, foo = true, special = function (lh, rh)
    local _g824 = compile(lh)
    local _g846
    if nil63(rh) then
      _g846 = "nil"
    else
      _g846 = rh
    end
    local _g825 = compile(_g846)
    return(indentation() .. _g824 .. " = " .. _g825)
  end, stmt = true}, ["while"] = {export = true, foo = true, special = function (cond, form)
    local _g817 = compile(cond)
    indent_level = indent_level + 1
    local _g818 = compile(form, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local body = _g818
    local ind = indentation()
    if target == "js" then
      return(ind .. "while (" .. _g817 .. ") {\n" .. body .. ind .. "}\n")
    else
      return(ind .. "while " .. _g817 .. " do\n" .. body .. ind .. "end\n")
    end
  end, stmt = true, tr = true}}, import = {{"lumen"}, {"lumen", "utilities"}, {"lumen", "compiler"}, {"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}}}, ["lumen/system"] = {export = {nexus = {export = true, global = true}}, import = {{"lumen", "special"}, {"lumen", "core"}}}, ["lumen/utilities"] = {export = {bind = {export = true, variable = true}, ["bind*"] = {export = true, variable = true}, ["bound?"] = {export = true, variable = true}, ["can-unquote?"] = {variable = true}, escape = {variable = true}, getenv = {export = true, variable = true}, ["global?"] = {variable = true}, id = {export = true, variable = true}, imported = {export = true, variable = true}, ["indent-level"] = {export = true, global = true}, indentation = {export = true, variable = true}, ["initial-environment"] = {export = true, variable = true}, linked = {export = true, variable = true}, ["macro-function"] = {export = true, variable = true}, ["macro?"] = {export = true, variable = true}, macroexpand = {export = true, variable = true}, mapo = {export = true, variable = true}, ["numeric?"] = {variable = true}, quasiexpand = {export = true, variable = true}, ["quasiquote-list"] = {variable = true}, ["quasiquoting?"] = {variable = true}, ["quasisplice?"] = {variable = true}, ["quote-binding"] = {variable = true}, ["quote-environment"] = {export = true, variable = true}, ["quote-frame"] = {variable = true}, ["quote-module"] = {variable = true}, ["quote-modules"] = {export = true, variable = true}, quoted = {export = true, variable = true}, ["quoting?"] = {variable = true}, reserved = {variable = true}, ["reserved?"] = {export = true, variable = true}, sortk = {export = true, variable = true}, ["special-form?"] = {export = true, variable = true}, ["special?"] = {export = true, variable = true}, ["stash*"] = {export = true, variable = true}, ["statement?"] = {export = true, variable = true}, ["symbol-expansion"] = {export = true, variable = true}, ["symbol?"] = {export = true, variable = true}, ["toplevel?"] = {export = true, variable = true}, ["valid-char?"] = {variable = true}, ["valid-id?"] = {export = true, variable = true}, ["variable?"] = {export = true, variable = true}, ["with-indent"] = {export = true, macro = function (form)
    local result = make_id()
    return({"do", {"inc", "indent-level"}, {"let", {result, form}, {"dec", "indent-level"}, result}})
  end}}, import = {"lumen", {"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}}}, user = {export = {}, import = {"lumen", {"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}}}}
  environment = {{["define-module"] = {export = true, macro = function (spec, ...)
    local body = unstash({...})
    local _g832 = sub(body, 0)
    local imports = {}
    local aliased = {}
    local alias = _g832.alias
    local exp = _g832.export
    local imp = _g832.import
    local _g833 = imp or {}
    local _g834 = 0
    while _g834 < length(_g833) do
      local k = _g833[_g834 + 1]
      load_module(k)
      local _g835 = module(k).alias or {}
      local _g836 = 0
      while _g836 < length(_g835) do
        local a = _g835[_g836 + 1]
        add(imp, a)
        _g836 = _g836 + 1
      end
      imports = join(imports, imported(k))
      _g834 = _g834 + 1
    end
    modules[module_key(spec)] = {alias = alias, export = {}, import = imp}
    local _g837 = exp or {}
    local _g838 = 0
    while _g838 < length(_g837) do
      local k = _g837[_g838 + 1]
      setenv(k, {_stash = true, export = true})
      _g838 = _g838 + 1
    end
    local k = module_key(current_module)
    return(join({"do", {"set", {"get", "nexus", {"quote", k}}, {"table"}}}, imports))
  end}}}
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
  local _g6 = nexus["lumen/runtime"]
  local _37 = _g6["%"]
  local _37message_handler = _g6["%message-handler"]
  local _42 = _g6["*"]
  local _43 = _g6["+"]
  local _ = _g6["-"]
  local _47 = _g6["/"]
  local _60 = _g6["<"]
  local _6061 = _g6["<="]
  local _61 = _g6["="]
  local _62 = _g6[">"]
  local _6261 = _g6[">="]
  local abs = _g6.abs
  local acos = _g6.acos
  local add = _g6.add
  local apply = _g6.apply
  local asin = _g6.asin
  local atan = _g6.atan
  local atan2 = _g6.atan2
  local atom63 = _g6["atom?"]
  local boolean63 = _g6["boolean?"]
  local cat = _g6.cat
  local ceil = _g6.ceil
  local char = _g6.char
  local code = _g6.code
  local composite63 = _g6["composite?"]
  local cos = _g6.cos
  local drop = _g6.drop
  local empty63 = _g6["empty?"]
  local exclude = _g6.exclude
  local exit = _g6.exit
  local extend = _g6.extend
  local find = _g6.find
  local flat = _g6.flat
  local flat1 = _g6.flat1
  local floor = _g6.floor
  local function63 = _g6["function?"]
  local hd = _g6.hd
  local id_literal63 = _g6["id-literal?"]
  local in63 = _g6["in?"]
  local inner = _g6.inner
  local is63 = _g6["is?"]
  local iterate = _g6.iterate
  local join = _g6.join
  local keep = _g6.keep
  local keys63 = _g6["keys?"]
  local last = _g6.last
  local length = _g6.length
  local list63 = _g6["list?"]
  local log = _g6.log
  local log10 = _g6.log10
  local make_id = _g6["make-id"]
  local map = _g6.map
  local max = _g6.max
  local min = _g6.min
  local module = _g6.module
  local module_key = _g6["module-key"]
  local nil63 = _g6["nil?"]
  local none63 = _g6["none?"]
  local number = _g6.number
  local number63 = _g6["number?"]
  local pairwise = _g6.pairwise
  local pow = _g6.pow
  local random = _g6.random
  local read_file = _g6["read-file"]
  local reduce = _g6.reduce
  local replicate = _g6.replicate
  local reverse = _g6.reverse
  local sd = _g6.sd
  local search = _g6.search
  local setenv = _g6.setenv
  local sin = _g6.sin
  local sinh = _g6.sinh
  local some63 = _g6["some?"]
  local sort = _g6.sort
  local splice = _g6.splice
  local split = _g6.split
  local sqrt = _g6.sqrt
  local stash = _g6.stash
  local string = _g6.string
  local string_literal63 = _g6["string-literal?"]
  local string63 = _g6["string?"]
  local sub = _g6.sub
  local sublist = _g6.sublist
  local substring = _g6.substring
  local table63 = _g6["table?"]
  local tan = _g6.tan
  local tanh = _g6.tanh
  local td = _g6.td
  local tl = _g6.tl
  local toplevel63 = _g6["toplevel?"]
  local unstash = _g6.unstash
  local write = _g6.write
  local write_file = _g6["write-file"]
  local function rep(str)
    local _g855,_g856 = xpcall(function ()
      return(eval(read_from_string(str)))
    end, _37message_handler)
    local _g854 = {_g855, _g856}
    local _g1 = _g854[1]
    local x = _g854[2]
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
    local _g857 = args
    local i = 0
    while i < length(_g857) do
      local arg = _g857[i + 1]
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
