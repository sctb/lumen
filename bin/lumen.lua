nexus = {}
(function ()
  local function nil63(x)
    return(x == nil)
  end
  local function is63(x)
    return(not nil63(x))
  end
  local math = math
  local abs = math.abs
  local acos = math.acos
  local asin = math.asin
  local atan = math.atan
  local atan2 = math.atan2
  local ceil = math.ceil
  local cos = math.cos
  local floor = math.floor
  local log = math.log
  local log10 = math.log10
  local max = math.max
  local min = math.min
  local pow = math.pow
  local random = math.random
  local sin = math.sin
  local sinh = math.sinh
  local sqrt = math.sqrt
  local tan = math.tan
  local tanh = math.tanh
  local function length(x)
    return(#x)
  end
  local function none63(x)
    return(length(x) == 0)
  end
  local function some63(x)
    return(length(x) > 0)
  end
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
  local function hd(l)
    return(l[1])
  end
  local function sd(l)
    return(l[2])
  end
  local function td(l)
    return(l[3])
  end
  local function string63(x)
    return(type(x) == "string")
  end
  local function number63(x)
    return(type(x) == "number")
  end
  local function boolean63(x)
    return(type(x) == "boolean")
  end
  local function function63(x)
    return(type(x) == "function")
  end
  local function composite63(x)
    return(type(x) == "table")
  end
  local function atom63(x)
    return(not composite63(x))
  end
  local function table63(x)
    return(composite63(x) and nil63(hd(x)))
  end
  local function list63(x)
    return(composite63(x) and is63(hd(x)))
  end
  local function substring(str, from, upto)
    return(string.sub(str, from + 1, upto))
  end
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
  local function inner(x)
    return(sub(x, 1, length(x) - 1))
  end
  local function tl(l)
    return(sub(l, 1))
  end
  local function char(str, n)
    return(sub(str, n, n + 1))
  end
  local function code(str, n)
    local _g31
    if n then
      _g31 = n + 1
    end
    return(string.byte(str, _g31))
  end
  local function string_literal63(x)
    return(string63(x) and char(x, 0) == "\"")
  end
  local function id_literal63(x)
    return(string63(x) and char(x, 0) == "|")
  end
  local function add(l, x)
    return(table.insert(l, x))
  end
  local function drop(l)
    return(table.remove(l))
  end
  local function last(l)
    return(l[length(l) - 1 + 1])
  end
  local function reverse(l)
    local l1 = sub(l, length(l))
    local i = length(l) - 1
    while i >= 0 do
      add(l1, l[i + 1])
      i = i - 1
    end
    return(l1)
  end
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
          local _g32 = l1
          local k = nil
          for k in next, _g32 do
            if not number63(k) then
              local v = _g32[k]
              l[k] = v
            end
          end
          local _g33 = l2
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
    end
  end
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
  local function keep(f, l)
    local l1 = {}
    local _g34 = l
    local _g35 = 0
    while _g35 < length(_g34) do
      local x = _g34[_g35 + 1]
      if f(x) then
        add(l1, x)
      end
      _g35 = _g35 + 1
    end
    return(l1)
  end
  local function find(f, l)
    local _g36 = l
    local _g37 = 0
    while _g37 < length(_g36) do
      local x = _g36[_g37 + 1]
      local _g38 = f(x)
      if _g38 then
        return(_g38)
      end
      _g37 = _g37 + 1
    end
  end
  local function pairwise(l)
    local i = 0
    local l1 = {}
    while i < length(l) do
      add(l1, {l[i + 1], l[i + 1 + 1]})
      i = i + 2
    end
    return(l1)
  end
  local function sort(l, f)
    table.sort(l, f)
    return(l)
  end
  local function iterate(f, count)
    local i = 0
    while i < count do
      f(i)
      i = i + 1
    end
  end
  local function replicate(n, x)
    local l = {}
    iterate(function ()
      return(add(l, x))
    end, n)
    return(l)
  end
  local function splice(x)
    return({_splice = true, value = x})
  end
  local function splice63(x)
    return(table63(x) and x._splice)
  end
  local function mapl(f, l)
    local l1 = {}
    local _g39 = l
    local _g40 = 0
    while _g40 < length(_g39) do
      local x = _g39[_g40 + 1]
      local _g41 = f(x)
      if splice63(_g41) then
        l1 = join(l1, _g41.value)
      else
        if is63(_g41) then
          add(l1, _g41)
        end
      end
      _g40 = _g40 + 1
    end
    return(l1)
  end
  local function map(f, t)
    local l = mapl(f, t)
    local _g42 = t
    local k = nil
    for k in next, _g42 do
      if not number63(k) then
        local v = _g42[k]
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
  local function keys63(t)
    local k63 = false
    local _g43 = t
    local k = nil
    for k in next, _g43 do
      if not number63(k) then
        local v = _g43[k]
        k63 = true
        break
      end
    end
    return(k63)
  end
  local function empty63(t)
    return(none63(t) and not keys63(t))
  end
  local function stash(args)
    if keys63(args) then
      local p = {_stash = true}
      local _g44 = args
      local k = nil
      for k in next, _g44 do
        if not number63(k) then
          local v = _g44[k]
          p[k] = v
        end
      end
      return(join(args, {p}))
    else
      return(args)
    end
  end
  local function unstash(args)
    if none63(args) then
      return({})
    else
      local l = last(args)
      if table63(l) and l._stash then
        local args1 = sub(args, 0, length(args) - 1)
        local _g45 = l
        local k = nil
        for k in next, _g45 do
          if not number63(k) then
            local v = _g45[k]
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
  local function extend(t, ...)
    local xs = unstash({...})
    local _g46 = sub(xs, 0)
    return(join(t, _g46))
  end
  local function exclude(t, ...)
    local keys = unstash({...})
    local _g47 = sub(keys, 0)
    local t1 = sublist(t)
    local _g48 = t
    local k = nil
    for k in next, _g48 do
      if not number63(k) then
        local v = _g48[k]
        if not _g47[k] then
          t1[k] = v
        end
      end
    end
    return(t1)
  end
  local function search(str, pattern, start)
    local _g50
    if start then
      _g50 = start + 1
    end
    local _g49 = _g50
    local i = string.find(str, pattern, start, true)
    return(i and i - 1)
  end
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
  local function cat(...)
    local xs = unstash({...})
    local _g51 = sub(xs, 0)
    if none63(_g51) then
      return("")
    else
      return(reduce(function (a, b)
        return(a .. b)
      end, _g51))
    end
  end
  local function _43(...)
    local xs = unstash({...})
    local _g52 = sub(xs, 0)
    return(reduce(function (a, b)
      return(a + b)
    end, _g52))
  end
  local function _(...)
    local xs = unstash({...})
    local _g53 = sub(xs, 0)
    return(reduce(function (a, b)
      return(b - a)
    end, reverse(_g53)))
  end
  local function _42(...)
    local xs = unstash({...})
    local _g54 = sub(xs, 0)
    return(reduce(function (a, b)
      return(a * b)
    end, _g54))
  end
  local function _47(...)
    local xs = unstash({...})
    local _g55 = sub(xs, 0)
    return(reduce(function (a, b)
      return(b / a)
    end, reverse(_g55)))
  end
  local function _37(...)
    local xs = unstash({...})
    local _g56 = sub(xs, 0)
    return(reduce(function (a, b)
      return(b % a)
    end, reverse(_g56)))
  end
  local function _62(a, b)
    return(a > b)
  end
  local function _60(a, b)
    return(a < b)
  end
  local function _61(a, b)
    return(a == b)
  end
  local function _6261(a, b)
    return(a >= b)
  end
  local function _6061(a, b)
    return(a <= b)
  end
  local function read_file(path)
    local f = io.open(path)
    return(f.read(f, "*a"))
  end
  local function write_file(path, data)
    local f = io.open(path, "w")
    return(f.write(f, data))
  end
  local function write(x)
    return(io.write(x))
  end
  local function exit(code)
    return(os.exit(code))
  end
  local function number(str)
    return(tonumber(str))
  end
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
            local _g57 = x
            local k = nil
            for k in next, _g57 do
              if not number63(k) then
                local v = _g57[k]
                add(x1, k .. ":")
                add(x1, v)
              end
            end
            local _g58 = x1
            local i = 0
            while i < length(_g58) do
              local y = _g58[i + 1]
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
  local function apply(f, args)
    local _g59 = stash(args)
    return(f(unpack(_g59)))
  end
  local id_count = 0
  local function make_id()
    id_count = id_count + 1
    return("_g" .. id_count)
  end
  local function _37message_handler(msg)
    local i = search(msg, ": ")
    return(sub(msg, i + 2))
  end
  local function toplevel63()
    return(length(environment) == 1)
  end
  local function module_key(spec)
    if atom63(spec) then
      return(string(spec))
    else
      return(reduce(function (a, b)
        return(module_key(a) .. "/" .. module_key(b))
      end, spec))
    end
  end
  local function module(spec)
    return(modules[module_key(spec)])
  end
  local function setenv(k, ...)
    local keys = unstash({...})
    local _g60 = sub(keys, 0)
    if string63(k) then
      local frame = last(environment)
      local x = frame[k] or {}
      local _g61 = _g60
      local k1 = nil
      for k1 in next, _g61 do
        if not number63(k1) then
          local v = _g61[k1]
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
  local _g62 = {}
  nexus["lumen/runtime"] = _g62
  _g62["%"] = _37
  _g62["%message-handler"] = _37message_handler
  _g62["*"] = _42
  _g62["+"] = _43
  _g62["-"] = _
  _g62["/"] = _47
  _g62["<"] = _60
  _g62["<="] = _6061
  _g62["="] = _61
  _g62[">"] = _62
  _g62[">="] = _6261
  _g62.abs = abs
  _g62.acos = acos
  _g62.add = add
  _g62.apply = apply
  _g62.asin = asin
  _g62.atan = atan
  _g62.atan2 = atan2
  _g62["atom?"] = atom63
  _g62["boolean?"] = boolean63
  _g62.cat = cat
  _g62.ceil = ceil
  _g62.char = char
  _g62.code = code
  _g62["composite?"] = composite63
  _g62.cos = cos
  _g62.drop = drop
  _g62["empty?"] = empty63
  _g62.exclude = exclude
  _g62.exit = exit
  _g62.extend = extend
  _g62.find = find
  _g62.flat = flat
  _g62.flat1 = flat1
  _g62.floor = floor
  _g62["function?"] = function63
  _g62.hd = hd
  _g62["id-count"] = id_count
  _g62["id-literal?"] = id_literal63
  _g62["in?"] = in63
  _g62.inner = inner
  _g62["is?"] = is63
  _g62.iterate = iterate
  _g62.join = join
  _g62.keep = keep
  _g62["keys?"] = keys63
  _g62.last = last
  _g62.length = length
  _g62["list?"] = list63
  _g62.log = log
  _g62.log10 = log10
  _g62["make-id"] = make_id
  _g62.map = map
  _g62.mapl = mapl
  _g62.math = math
  _g62.max = max
  _g62.min = min
  _g62.module = module
  _g62["module-key"] = module_key
  _g62["nil?"] = nil63
  _g62["none?"] = none63
  _g62.number = number
  _g62["number?"] = number63
  _g62.pairwise = pairwise
  _g62.pow = pow
  _g62.random = random
  _g62["read-file"] = read_file
  _g62.reduce = reduce
  _g62.replicate = replicate
  _g62.reverse = reverse
  _g62.sd = sd
  _g62.search = search
  _g62.setenv = setenv
  _g62.sin = sin
  _g62.sinh = sinh
  _g62["some?"] = some63
  _g62.sort = sort
  _g62.splice = splice
  _g62["splice?"] = splice63
  _g62.split = split
  _g62.sqrt = sqrt
  _g62.stash = stash
  _g62.string = string
  _g62["string-literal?"] = string_literal63
  _g62["string?"] = string63
  _g62.sub = sub
  _g62.sublist = sublist
  _g62.substring = substring
  _g62["table?"] = table63
  _g62.tan = tan
  _g62.tanh = tanh
  _g62.td = td
  _g62.tl = tl
  _g62["toplevel?"] = toplevel63
  _g62.unstash = unstash
  _g62.write = write
  _g62["write-file"] = write_file
end)();
(function ()
  local _g67 = nexus["lumen/runtime"]
  local _37 = _g67["%"]
  local _37message_handler = _g67["%message-handler"]
  local _42 = _g67["*"]
  local _43 = _g67["+"]
  local _ = _g67["-"]
  local _47 = _g67["/"]
  local _60 = _g67["<"]
  local _6061 = _g67["<="]
  local _61 = _g67["="]
  local _62 = _g67[">"]
  local _6261 = _g67[">="]
  local abs = _g67.abs
  local acos = _g67.acos
  local add = _g67.add
  local apply = _g67.apply
  local asin = _g67.asin
  local atan = _g67.atan
  local atan2 = _g67.atan2
  local atom63 = _g67["atom?"]
  local boolean63 = _g67["boolean?"]
  local cat = _g67.cat
  local ceil = _g67.ceil
  local char = _g67.char
  local code = _g67.code
  local composite63 = _g67["composite?"]
  local cos = _g67.cos
  local drop = _g67.drop
  local empty63 = _g67["empty?"]
  local exclude = _g67.exclude
  local exit = _g67.exit
  local extend = _g67.extend
  local find = _g67.find
  local flat = _g67.flat
  local flat1 = _g67.flat1
  local floor = _g67.floor
  local function63 = _g67["function?"]
  local hd = _g67.hd
  local id_literal63 = _g67["id-literal?"]
  local in63 = _g67["in?"]
  local inner = _g67.inner
  local is63 = _g67["is?"]
  local iterate = _g67.iterate
  local join = _g67.join
  local keep = _g67.keep
  local keys63 = _g67["keys?"]
  local last = _g67.last
  local length = _g67.length
  local list63 = _g67["list?"]
  local log = _g67.log
  local log10 = _g67.log10
  local make_id = _g67["make-id"]
  local map = _g67.map
  local max = _g67.max
  local min = _g67.min
  local module = _g67.module
  local module_key = _g67["module-key"]
  local nil63 = _g67["nil?"]
  local none63 = _g67["none?"]
  local number = _g67.number
  local number63 = _g67["number?"]
  local pairwise = _g67.pairwise
  local pow = _g67.pow
  local random = _g67.random
  local read_file = _g67["read-file"]
  local reduce = _g67.reduce
  local replicate = _g67.replicate
  local reverse = _g67.reverse
  local sd = _g67.sd
  local search = _g67.search
  local setenv = _g67.setenv
  local sin = _g67.sin
  local sinh = _g67.sinh
  local some63 = _g67["some?"]
  local sort = _g67.sort
  local splice = _g67.splice
  local split = _g67.split
  local sqrt = _g67.sqrt
  local stash = _g67.stash
  local string = _g67.string
  local string_literal63 = _g67["string-literal?"]
  local string63 = _g67["string?"]
  local sub = _g67.sub
  local sublist = _g67.sublist
  local substring = _g67.substring
  local table63 = _g67["table?"]
  local tan = _g67.tan
  local tanh = _g67.tanh
  local td = _g67.td
  local tl = _g67.tl
  local toplevel63 = _g67["toplevel?"]
  local unstash = _g67.unstash
  local write = _g67.write
  local write_file = _g67["write-file"]
  local function getenv(k, ...)
    local keys = unstash({...})
    local _g70 = sub(keys, 0)
    if string63(k) then
      local b = find(function (e)
        return(e[k])
      end, reverse(environment))
      if table63(b) then
        local _g71 = nil
        local _g72 = _g70
        local x = nil
        for x in next, _g72 do
          if not number63(x) then
            local _g63 = _g72[x]
            _g71 = x
          end
        end
        if _g71 then
          return(b[_g71])
        else
          return(b)
        end
      end
    end
  end
  local function macro_function(k)
    return(getenv(k, {_stash = true, macro = true}))
  end
  local function macro63(k)
    return(is63(macro_function(k)))
  end
  local function special63(k)
    return(is63(getenv(k, {_stash = true, special = true})))
  end
  local function special_form63(form)
    return(list63(form) and special63(hd(form)))
  end
  local function statement63(k)
    return(special63(k) and getenv(k, {_stash = true, stmt = true}))
  end
  local function symbol_expansion(k)
    return(getenv(k, {_stash = true, symbol = true}))
  end
  local function symbol63(k)
    return(is63(symbol_expansion(k)))
  end
  local function variable63(k)
    local b = find(function (frame)
      return(frame[k] or frame._scope)
    end, reverse(environment))
    return(table63(b) and is63(b.variable))
  end
  local function global63(k)
    return(getenv(k, {_stash = true, global = true}))
  end
  local function bound63(x)
    return(macro63(x) or special63(x) or symbol63(x) or variable63(x) or global63(x))
  end
  local function escape(str)
    local str1 = "\""
    local i = 0
    while i < length(str) do
      local c = char(str, i)
      local _g73
      if c == "\n" then
        _g73 = "\\n"
      else
        local _g74
        if c == "\"" then
          _g74 = "\\\""
        else
          local _g75
          if c == "\\" then
            _g75 = "\\\\"
          else
            _g75 = c
          end
          _g74 = _g75
        end
        _g73 = _g74
      end
      local c1 = _g73
      str1 = str1 .. c1
      i = i + 1
    end
    return(str1 .. "\"")
  end
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
  local function stash42(args)
    if keys63(args) then
      local l = {"%object", "_stash", true}
      local _g76 = args
      local k = nil
      for k in next, _g76 do
        if not number63(k) then
          local v = _g76[k]
          add(l, k)
          add(l, v)
        end
      end
      return(join(args, {l}))
    else
      return(args)
    end
  end
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
        local _g77 = lh
        local i = 0
        while i < length(_g77) do
          local x = _g77[i + 1]
          bs = join(bs, bind(x, {"at", rh, i}))
          i = i + 1
        end
        if r then
          bs = join(bs, bind(r, {"sub", rh, length(lh)}))
        end
        local _g78 = lh
        local k = nil
        for k in next, _g78 do
          if not number63(k) then
            local v = _g78[k]
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
      local _g79 = args
      local _g80 = 0
      while _g80 < length(_g79) do
        local arg = _g79[_g80 + 1]
        if atom63(arg) then
          add(args1, arg)
        else
          if list63(arg) or keys63(arg) then
            local v = make_id()
            add(args1, v)
            bs = join(bs, {arg, v})
          end
        end
        _g80 = _g80 + 1
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
  local function quoting63(depth)
    return(number63(depth))
  end
  local function quasiquoting63(depth)
    return(quoting63(depth) and depth > 0)
  end
  local function can_unquote63(depth)
    return(quoting63(depth) and depth == 1)
  end
  local function quasisplice63(x, depth)
    return(list63(x) and can_unquote63(depth) and hd(x) == "unquote-splicing")
  end
  local function macroexpand(form)
    if symbol63(form) then
      return(macroexpand(symbol_expansion(form)))
    else
      if atom63(form) then
        return(form)
      else
        local x = hd(form)
        if x == "%function" then
          local _g64 = form[1]
          local args = form[2]
          local body = sub(form, 2)
          add(environment, {_scope = true})
          local _g83 = args
          local _g84 = 0
          while _g84 < length(_g83) do
            local _g81 = _g83[_g84 + 1]
            setenv(_g81, {_stash = true, variable = true})
            _g84 = _g84 + 1
          end
          local _g82 = join({"%function", map(macroexpand, args)}, macroexpand(body))
          drop(environment)
          return(_g82)
        else
          if x == "%local-function" or x == "%global-function" then
            local _g65 = form[1]
            local name = form[2]
            local _g85 = form[3]
            local _g86 = sub(form, 3)
            add(environment, {_scope = true})
            local _g89 = _g85
            local _g90 = 0
            while _g90 < length(_g89) do
              local _g87 = _g89[_g90 + 1]
              setenv(_g87, {_stash = true, variable = true})
              _g90 = _g90 + 1
            end
            local _g88 = join({x, name, map(macroexpand, _g85)}, macroexpand(_g86))
            drop(environment)
            return(_g88)
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
  local quasiexpand
  local quasiquote_list
  quasiquote_list = function (form, depth)
    local xs = {{"list"}}
    local _g91 = form
    local k = nil
    for k in next, _g91 do
      if not number63(k) then
        local v = _g91[k]
        local _g96
        if quasisplice63(v, depth) then
          _g96 = quasiexpand(v[2])
        else
          _g96 = quasiexpand(v, depth)
        end
        local _g92 = _g96
        last(xs)[k] = _g92
      end
    end
    local _g93 = form
    local _g94 = 0
    while _g94 < length(_g93) do
      local x = _g93[_g94 + 1]
      if quasisplice63(x, depth) then
        local _g95 = quasiexpand(x[2])
        add(xs, _g95)
        add(xs, {"list"})
      else
        add(last(xs), quasiexpand(x, depth))
      end
      _g94 = _g94 + 1
    end
    local pruned = keep(function (x)
      return(length(x) > 1 or not (hd(x) == "list") or keys63(x))
    end, xs)
    return(join({"join*"}, pruned))
  end
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
  indent_level = 0
  local function indentation()
    return(apply(cat, replicate(indent_level, "  ")))
  end
  local reserved = {["%"] = true, ["*"] = true, ["+"] = true, ["-"] = true, ["/"] = true, ["<"] = true, ["<="] = true, ["="] = true, ["=="] = true, [">"] = true, [">="] = true, ["and"] = true, ["break"] = true, ["case"] = true, ["catch"] = true, ["continue"] = true, ["debugger"] = true, ["default"] = true, ["delete"] = true, ["do"] = true, ["else"] = true, ["elseif"] = true, ["end"] = true, ["false"] = true, ["finally"] = true, ["for"] = true, ["function"] = true, ["if"] = true, ["in"] = true, ["instanceof"] = true, ["local"] = true, ["new"] = true, ["nil"] = true, ["not"] = true, ["or"] = true, ["repeat"] = true, ["return"] = true, ["switch"] = true, ["then"] = true, ["this"] = true, ["throw"] = true, ["true"] = true, ["try"] = true, ["typeof"] = true, ["until"] = true, ["var"] = true, ["void"] = true, ["while"] = true, ["with"] = true}
  local function reserved63(x)
    return(reserved[x])
  end
  local function numeric63(n)
    return(n > 47 and n < 58)
  end
  local function valid_char63(n)
    return(numeric63(n) or n > 64 and n < 91 or n > 96 and n < 123 or n == 95)
  end
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
  local function id(id)
    local id1 = ""
    local i = 0
    while i < length(id) do
      local c = char(id, i)
      local n = code(c)
      local _g102
      if c == "-" then
        _g102 = "_"
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
      local c1 = _g102
      id1 = id1 .. c1
      i = i + 1
    end
    return(id1)
  end
  local function sortk(l, k)
    return(sort(l, function (a, b)
      return(k(a) < k(b))
    end))
  end
  local function imported(spec, ...)
    local _g105 = unstash({...})
    local all = _g105.all
    local m = make_id()
    local k = module_key(spec)
    local imports = {}
    if nexus[k] then
      local _g106 = module(spec).export
      local n = nil
      for n in next, _g106 do
        if not number63(n) then
          local b = _g106[n]
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
  local function exported()
    local m = make_id()
    local k = module_key(current_module)
    local exports = {}
    local _g107 = module(current_module).export
    local n = nil
    for n in next, _g107 do
      if not number63(n) then
        local b = _g107[n]
        if b.variable then
          add(exports, {"set", {"get", m, {"quote", n}}, n})
        end
      end
    end
    if some63(exports) then
      return(join({{"%local", m, {"table"}}, {"set", {"get", "nexus", {"quote", k}}, m}}, sortk(exports, td)))
    else
      return({})
    end
  end
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
  local function mapo(f, t)
    local o = {}
    local _g108 = t
    local k = nil
    for k in next, _g108 do
      if not number63(k) then
        local v = _g108[k]
        local x = f(v)
        if is63(x) then
          add(o, k)
          add(o, x)
        end
      end
    end
    return(o)
  end
  local function quote_frame(t)
    return(join({"%object"}, mapo(function (b)
      return(join({"table"}, quote_binding(b)))
    end, t)))
  end
  local function quote_environment(env)
    return(join({"list"}, map(quote_frame, env)))
  end
  local function quote_module(m)
    local _g109 = {"table"}
    _g109.alias = quoted(m.alias)
    _g109.export = quote_frame(m.export)
    _g109.import = quoted(m.import)
    return(_g109)
  end
  local function quote_modules()
    return(join({"table"}, map(quote_module, modules)))
  end
  local function initial_environment()
    return({{["define-module"] = getenv("define-module")}})
  end
  local _g110 = {}
  nexus["lumen/utilities"] = _g110
  _g110.bind = bind
  _g110["bind*"] = bind42
  _g110["bound?"] = bound63
  _g110["can-unquote?"] = can_unquote63
  _g110.escape = escape
  _g110.exported = exported
  _g110.getenv = getenv
  _g110["global?"] = global63
  _g110.id = id
  _g110.imported = imported
  _g110.indentation = indentation
  _g110["initial-environment"] = initial_environment
  _g110["macro-function"] = macro_function
  _g110["macro?"] = macro63
  _g110.macroexpand = macroexpand
  _g110.mapo = mapo
  _g110["numeric?"] = numeric63
  _g110.quasiexpand = quasiexpand
  _g110["quasiquote-list"] = quasiquote_list
  _g110["quasiquoting?"] = quasiquoting63
  _g110["quasisplice?"] = quasisplice63
  _g110["quote-binding"] = quote_binding
  _g110["quote-environment"] = quote_environment
  _g110["quote-frame"] = quote_frame
  _g110["quote-module"] = quote_module
  _g110["quote-modules"] = quote_modules
  _g110.quoted = quoted
  _g110["quoting?"] = quoting63
  _g110.reserved = reserved
  _g110["reserved?"] = reserved63
  _g110.sortk = sortk
  _g110["special-form?"] = special_form63
  _g110["special?"] = special63
  _g110["stash*"] = stash42
  _g110["statement?"] = statement63
  _g110["symbol-expansion"] = symbol_expansion
  _g110["symbol?"] = symbol63
  _g110["toplevel?"] = toplevel63
  _g110["valid-char?"] = valid_char63
  _g110["valid-id?"] = valid_id63
  _g110["variable?"] = variable63
end)();
(function ()
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
  local whitespace = {[" "] = true, ["\n"] = true, ["\t"] = true}
  local function make_stream(str)
    return({len = length(str), pos = 0, string = str})
  end
  local function peek_char(s)
    if s.pos < s.len then
      return(char(s.string, s.pos))
    end
  end
  local function read_char(s)
    local c = peek_char(s)
    if c then
      s.pos = s.pos + 1
      return(c)
    end
  end
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
  local read_table = {}
  local eof = {}
  local function read(s)
    skip_non_code(s)
    local c = peek_char(s)
    if is63(c) then
      return((read_table[c] or read_table[""])(s))
    else
      return(eof)
    end
  end
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
  local function read_from_string(str)
    return(read(make_stream(str)))
  end
  local function key63(atom)
    return(string63(atom) and length(atom) > 1 and char(atom, length(atom) - 1) == ":")
  end
  local function flag63(atom)
    return(string63(atom) and length(atom) > 1 and char(atom, 0) == ":")
  end
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
  local _g124 = {}
  nexus["lumen/reader"] = _g124
  _g124.delimiters = delimiters
  _g124.eof = eof
  _g124["flag?"] = flag63
  _g124["key?"] = key63
  _g124["make-stream"] = make_stream
  _g124["peek-char"] = peek_char
  _g124.read = read
  _g124["read-all"] = read_all
  _g124["read-char"] = read_char
  _g124["read-from-string"] = read_from_string
  _g124["read-table"] = read_table
  _g124["skip-non-code"] = skip_non_code
  _g124.whitespace = whitespace
end)();
(function ()
  local _g126 = nexus["lumen/utilities"]
  local bind = _g126.bind
  local bind42 = _g126["bind*"]
  local bound63 = _g126["bound?"]
  local exported = _g126.exported
  local getenv = _g126.getenv
  local id = _g126.id
  local imported = _g126.imported
  local indentation = _g126.indentation
  local initial_environment = _g126["initial-environment"]
  local macro_function = _g126["macro-function"]
  local macro63 = _g126["macro?"]
  local macroexpand = _g126.macroexpand
  local mapo = _g126.mapo
  local quasiexpand = _g126.quasiexpand
  local quote_environment = _g126["quote-environment"]
  local quote_modules = _g126["quote-modules"]
  local quoted = _g126.quoted
  local reserved63 = _g126["reserved?"]
  local sortk = _g126.sortk
  local special_form63 = _g126["special-form?"]
  local special63 = _g126["special?"]
  local stash42 = _g126["stash*"]
  local statement63 = _g126["statement?"]
  local symbol_expansion = _g126["symbol-expansion"]
  local symbol63 = _g126["symbol?"]
  local toplevel63 = _g126["toplevel?"]
  local valid_id63 = _g126["valid-id?"]
  local variable63 = _g126["variable?"]
  local _g127 = nexus["lumen/reader"]
  local make_stream = _g127["make-stream"]
  local read = _g127.read
  local read_all = _g127["read-all"]
  local read_from_string = _g127["read-from-string"]
  local read_table = _g127["read-table"]
  local _g128 = nexus["lumen/runtime"]
  local _37 = _g128["%"]
  local _37message_handler = _g128["%message-handler"]
  local _42 = _g128["*"]
  local _43 = _g128["+"]
  local _ = _g128["-"]
  local _47 = _g128["/"]
  local _60 = _g128["<"]
  local _6061 = _g128["<="]
  local _61 = _g128["="]
  local _62 = _g128[">"]
  local _6261 = _g128[">="]
  local abs = _g128.abs
  local acos = _g128.acos
  local add = _g128.add
  local apply = _g128.apply
  local asin = _g128.asin
  local atan = _g128.atan
  local atan2 = _g128.atan2
  local atom63 = _g128["atom?"]
  local boolean63 = _g128["boolean?"]
  local cat = _g128.cat
  local ceil = _g128.ceil
  local char = _g128.char
  local code = _g128.code
  local composite63 = _g128["composite?"]
  local cos = _g128.cos
  local drop = _g128.drop
  local empty63 = _g128["empty?"]
  local exclude = _g128.exclude
  local exit = _g128.exit
  local extend = _g128.extend
  local find = _g128.find
  local flat = _g128.flat
  local flat1 = _g128.flat1
  local floor = _g128.floor
  local function63 = _g128["function?"]
  local hd = _g128.hd
  local id_literal63 = _g128["id-literal?"]
  local in63 = _g128["in?"]
  local inner = _g128.inner
  local is63 = _g128["is?"]
  local iterate = _g128.iterate
  local join = _g128.join
  local keep = _g128.keep
  local keys63 = _g128["keys?"]
  local last = _g128.last
  local length = _g128.length
  local list63 = _g128["list?"]
  local log = _g128.log
  local log10 = _g128.log10
  local make_id = _g128["make-id"]
  local map = _g128.map
  local max = _g128.max
  local min = _g128.min
  local module = _g128.module
  local module_key = _g128["module-key"]
  local nil63 = _g128["nil?"]
  local none63 = _g128["none?"]
  local number = _g128.number
  local number63 = _g128["number?"]
  local pairwise = _g128.pairwise
  local pow = _g128.pow
  local random = _g128.random
  local read_file = _g128["read-file"]
  local reduce = _g128.reduce
  local replicate = _g128.replicate
  local reverse = _g128.reverse
  local sd = _g128.sd
  local search = _g128.search
  local setenv = _g128.setenv
  local sin = _g128.sin
  local sinh = _g128.sinh
  local some63 = _g128["some?"]
  local sort = _g128.sort
  local splice = _g128.splice
  local split = _g128.split
  local sqrt = _g128.sqrt
  local stash = _g128.stash
  local string = _g128.string
  local string_literal63 = _g128["string-literal?"]
  local string63 = _g128["string?"]
  local sub = _g128.sub
  local sublist = _g128.sublist
  local substring = _g128.substring
  local table63 = _g128["table?"]
  local tan = _g128.tan
  local tanh = _g128.tanh
  local td = _g128.td
  local tl = _g128.tl
  local toplevel63 = _g128["toplevel?"]
  local unstash = _g128.unstash
  local write = _g128.write
  local write_file = _g128["write-file"]
  local _g134 = {}
  _g134.js = "!"
  _g134.lua = "not "
  local _g132 = {}
  local _g135 = {}
  _g135.js = "!"
  _g135.lua = "not "
  _g132["not"] = _g135
  local _g137 = {}
  _g137["%"] = true
  _g137["*"] = true
  _g137["/"] = true
  local _g139 = {}
  _g139["+"] = true
  _g139["-"] = true
  local _g143 = {}
  _g143.js = "+"
  _g143.lua = ".."
  local _g141 = {}
  local _g144 = {}
  _g144.js = "+"
  _g144.lua = ".."
  _g141.cat = _g144
  local _g146 = {}
  _g146["<"] = true
  _g146["<="] = true
  _g146[">"] = true
  _g146[">="] = true
  local _g150 = {}
  _g150.js = "==="
  _g150.lua = "=="
  local _g152 = {}
  _g152.js = "!="
  _g152.lua = "~="
  local _g148 = {}
  local _g153 = {}
  _g153.js = "==="
  _g153.lua = "=="
  _g148["="] = _g153
  local _g154 = {}
  _g154.js = "!="
  _g154.lua = "~="
  _g148["~="] = _g154
  local _g158 = {}
  _g158.js = "&&"
  _g158.lua = "and"
  local _g156 = {}
  local _g159 = {}
  _g159.js = "&&"
  _g159.lua = "and"
  _g156["and"] = _g159
  local _g163 = {}
  _g163.js = "||"
  _g163.lua = "or"
  local _g161 = {}
  local _g164 = {}
  _g164.js = "||"
  _g164.lua = "or"
  _g161["or"] = _g164
  local infix = {_g132, _g137, _g139, _g141, _g146, _g148, _g156, _g161}
  local function unary63(form)
    local op = form[1]
    local args = sub(form, 1)
    return(length(args) == 1 and in63(op, {"not", "-"}))
  end
  local function precedence(form)
    if list63(form) and not unary63(form) then
      local _g165 = infix
      local i = 0
      while i < length(_g165) do
        local level = _g165[i + 1]
        if level[hd(form)] then
          return(i)
        end
        i = i + 1
      end
    end
    return(0)
  end
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
  local function infix63(x)
    return(is63(getop(x)))
  end
  local compile
  local function compile_args(args)
    local str = "("
    local _g166 = args
    local i = 0
    while i < length(_g166) do
      local arg = _g166[i + 1]
      str = str .. compile(arg)
      if i < length(args) - 1 then
        str = str .. ", "
      end
      i = i + 1
    end
    return(str .. ")")
  end
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
  local function compile_special(form, stmt63)
    local x = form[1]
    local args = sub(form, 1)
    local _g167 = getenv(x)
    local special = _g167.special
    local stmt = _g167.stmt
    local self_tr63 = _g167.tr
    local tr = terminator(stmt63 and not self_tr63)
    return(apply(special, args) .. tr)
  end
  local function parenthesize_call63(x)
    return(list63(x) and (hd(x) == "%function" or precedence(x) > 0))
  end
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
  local function op_delims(parent, child, ...)
    local _g168 = unstash({...})
    local right = _g168.right
    local _g169
    if right then
      _g169 = _6261
    else
      _g169 = _62
    end
    if _g169(precedence(child), precedence(parent)) then
      return({"(", ")"})
    else
      return({"", ""})
    end
  end
  local function compile_infix(form)
    local op = form[1]
    local _g170 = sub(form, 1)
    local a = _g170[1]
    local b = _g170[2]
    local _g171 = op_delims(form, a)
    local ao = _g171[1]
    local ac = _g171[2]
    local _g172 = op_delims(form, b, {_stash = true, right = true})
    local bo = _g172[1]
    local bc = _g172[2]
    local _g173 = compile(a)
    local _g174 = compile(b)
    local _g175 = getop(op)
    if unary63(form) then
      return(_g175 .. ao .. _g173 .. ac)
    else
      return(ao .. _g173 .. ac .. " " .. _g175 .. " " .. bo .. _g174 .. bc)
    end
  end
  local function compile_function(args, body, ...)
    local _g176 = unstash({...})
    local name = _g176.name
    local prefix = _g176.prefix
    local _g181
    if name then
      _g181 = compile(name)
    else
      _g181 = ""
    end
    local id = _g181
    local _g177 = prefix or ""
    local _g178 = compile_args(args)
    indent_level = indent_level + 1
    local _g180 = compile(body, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local _g179 = _g180
    local ind = indentation()
    local _g182
    if target == "js" then
      _g182 = ""
    else
      _g182 = "end"
    end
    local tr = _g182
    if name then
      tr = tr .. "\n"
    end
    if target == "js" then
      return("function " .. id .. _g178 .. " {\n" .. _g179 .. ind .. "}" .. tr)
    else
      return(_g177 .. "function " .. id .. _g178 .. "\n" .. _g179 .. ind .. tr)
    end
  end
  local function can_return63(form)
    return(is63(form) and (atom63(form) or not (hd(form) == "return") and not statement63(hd(form))))
  end
  compile = function (form, ...)
    local _g183 = unstash({...})
    local stmt = _g183.stmt
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
        local _g184 = _g186
        return(ind .. _g184 .. tr)
      end
    end
  end
  local lower
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
  local function lower_body(body, tail63)
    return(lower_statement(join({"do"}, body), tail63))
  end
  local function lower_do(args, hoist, stmt63, tail63)
    local _g188 = sub(args, 0, length(args) - 1)
    local _g189 = 0
    while _g189 < length(_g188) do
      local x = _g188[_g189 + 1]
      add(hoist, lower(x, hoist, stmt63))
      _g189 = _g189 + 1
    end
    local e = lower(last(args), hoist, stmt63, tail63)
    if tail63 and can_return63(e) then
      return({"return", e})
    else
      return(e)
    end
  end
  local function lower_if(args, hoist, stmt63, tail63)
    local cond = args[1]
    local _g190 = args[2]
    local _g191 = args[3]
    if stmt63 or tail63 then
      local _g193
      if _g191 then
        _g193 = {lower_body({_g191}, tail63)}
      end
      return(add(hoist, join({"%if", lower(cond, hoist), lower_body({_g190}, tail63)}, _g193)))
    else
      local e = make_id()
      add(hoist, {"%local", e})
      local _g192
      if _g191 then
        _g192 = {lower({"set", e, _g191})}
      end
      add(hoist, join({"%if", lower(cond, hoist), lower({"set", e, _g190})}, _g192))
      return(e)
    end
  end
  local function lower_short(x, args, hoist)
    local a = args[1]
    local b = args[2]
    local hoist1 = {}
    local b1 = lower(b, hoist1)
    if some63(hoist1) then
      local id = make_id()
      local _g194
      if x == "and" then
        _g194 = {"%if", id, b, id}
      else
        _g194 = {"%if", id, id, b}
      end
      return(lower({"do", {"%local", id, a}, _g194}, hoist))
    else
      return({x, lower(a, hoist), b1})
    end
  end
  local function lower_try(args, hoist, tail63)
    return(add(hoist, {"%try", lower_body(args, tail63)}))
  end
  local function lower_while(args, hoist)
    local c = args[1]
    local body = sub(args, 1)
    return(add(hoist, {"while", lower(c, hoist), lower_body(body)}))
  end
  local function lower_for(args, hoist)
    local t = args[1]
    local k = args[2]
    local body = sub(args, 2)
    return(add(hoist, {"%for", lower(t, hoist), k, lower_body(body)}))
  end
  local function lower_function(args)
    local a = args[1]
    local body = sub(args, 1)
    return({"%function", a, lower_body(body, true)})
  end
  local function lower_definition(kind, args, hoist)
    local name = args[1]
    local _g195 = args[2]
    local body = sub(args, 2)
    return(add(hoist, {kind, name, _g195, lower_body(body, true)}))
  end
  local function lower_call(form, hoist)
    local _g196 = map(function (x)
      return(lower(x, hoist))
    end, form)
    if some63(_g196) then
      return(_g196)
    end
  end
  local function lower_infix63(form)
    return(infix63(hd(form)) and length(form) > 3)
  end
  local function lower_infix(form, hoist)
    local x = form[1]
    local args = sub(form, 1)
    return(lower(reduce(function (a, b)
      return({x, b, a})
    end, reverse(args)), hoist))
  end
  local function lower_special(form, hoist)
    local e = lower_call(form, hoist)
    if e then
      return(add(hoist, e))
    end
  end
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
  local function process(form)
    return(lower(macroexpand(form)))
  end
  current_module = nil
  local function module_path(spec)
    return(module_key(spec) .. ".l")
  end
  local function encapsulate(body)
    local _g197 = map(process, body)
    local epilogue = map(process, exported())
    return({{"%function", {}, join({"do"}, join(_g197, epilogue))}})
  end
  local function compile_file(file)
    local str = read_file(file)
    local body = read_all(make_stream(str))
    local form = encapsulate(body)
    return(compile(form) .. ";\n")
  end
  local function run(code)
    local f,e = load(code)
    if f then
      return(f())
    else
      error(e .. " in " .. code)
    end
  end
  local compiling63 = false
  local compiler_output = ""
  local function conclude(code)
    if compiling63 then
      compiler_output = compiler_output .. code
    else
      return(run(code))
    end
  end
  local function _37compile_module(spec)
    local path = module_path(spec)
    local mod0 = current_module
    local env0 = environment
    current_module = spec
    environment = initial_environment()
    local compiled = compile_file(path)
    current_module = mod0
    environment = env0
    return(conclude(compiled))
  end
  local function open_module(spec, ...)
    local _g198 = unstash({...})
    local all = _g198.all
    local m = module(spec)
    local frame = last(environment)
    local _g199 = m.export
    local k = nil
    for k in next, _g199 do
      if not number63(k) then
        local v = _g199[k]
        if v.export or all then
          frame[k] = v
        end
      end
    end
  end
  local function load_module(spec, ...)
    local _g200 = unstash({...})
    local all = _g200.all
    if not module(spec) then
      _37compile_module(spec)
    end
    return(open_module(spec, {_stash = true, all = all}))
  end
  local function in_module(spec)
    load_module(spec, {_stash = true, all = true})
    local m = module(spec)
    map(open_module, m.import)
    current_module = spec
  end
  local function compile_module(spec)
    compiling63 = true
    _37compile_module(spec)
    return(compiler_output)
  end
  local function declare(form)
    return(conclude(compile(process(form), {_stash = true, stmt = true})))
  end
  local function reimported()
    local m = module(current_module)
    return(join(imported(current_module, {_stash = true, all = true}), map(function (x)
      return(splice(imported(x)))
    end, m.import)))
  end
  _37result = nil
  local function eval(form)
    local previous = target
    target = "lua"
    local prologue = map(process, reimported())
    local result = process({"set", "%result", form})
    local compiled = compile({{"%function", {}, join({"do"}, join(prologue, {result}))}})
    target = previous
    run(compiled)
    return(_37result)
  end
  local _g201 = {}
  nexus["lumen/compiler"] = _g201
  _g201["%compile-module"] = _37compile_module
  _g201["can-return?"] = can_return63
  _g201.compile = compile
  _g201["compile-args"] = compile_args
  _g201["compile-atom"] = compile_atom
  _g201["compile-call"] = compile_call
  _g201["compile-file"] = compile_file
  _g201["compile-function"] = compile_function
  _g201["compile-infix"] = compile_infix
  _g201["compile-module"] = compile_module
  _g201["compile-special"] = compile_special
  _g201["compiler-output"] = compiler_output
  _g201["compiling?"] = compiling63
  _g201.conclude = conclude
  _g201.declare = declare
  _g201.encapsulate = encapsulate
  _g201.eval = eval
  _g201.getop = getop
  _g201["in-module"] = in_module
  _g201.infix = infix
  _g201["infix?"] = infix63
  _g201["load-module"] = load_module
  _g201.lower = lower
  _g201["lower-body"] = lower_body
  _g201["lower-call"] = lower_call
  _g201["lower-definition"] = lower_definition
  _g201["lower-do"] = lower_do
  _g201["lower-for"] = lower_for
  _g201["lower-function"] = lower_function
  _g201["lower-if"] = lower_if
  _g201["lower-infix"] = lower_infix
  _g201["lower-infix?"] = lower_infix63
  _g201["lower-short"] = lower_short
  _g201["lower-special"] = lower_special
  _g201["lower-statement"] = lower_statement
  _g201["lower-try"] = lower_try
  _g201["lower-while"] = lower_while
  _g201["module-path"] = module_path
  _g201["op-delims"] = op_delims
  _g201["open-module"] = open_module
  _g201["parenthesize-call?"] = parenthesize_call63
  _g201.precedence = precedence
  _g201.process = process
  _g201.reimported = reimported
  _g201.run = run
  _g201.terminator = terminator
  _g201["unary?"] = unary63
end)();
(function ()
  local _g203 = nexus["lumen/utilities"]
  local bind = _g203.bind
  local bind42 = _g203["bind*"]
  local bound63 = _g203["bound?"]
  local exported = _g203.exported
  local getenv = _g203.getenv
  local id = _g203.id
  local imported = _g203.imported
  local indentation = _g203.indentation
  local initial_environment = _g203["initial-environment"]
  local macro_function = _g203["macro-function"]
  local macro63 = _g203["macro?"]
  local macroexpand = _g203.macroexpand
  local mapo = _g203.mapo
  local quasiexpand = _g203.quasiexpand
  local quote_environment = _g203["quote-environment"]
  local quote_modules = _g203["quote-modules"]
  local quoted = _g203.quoted
  local reserved63 = _g203["reserved?"]
  local sortk = _g203.sortk
  local special_form63 = _g203["special-form?"]
  local special63 = _g203["special?"]
  local stash42 = _g203["stash*"]
  local statement63 = _g203["statement?"]
  local symbol_expansion = _g203["symbol-expansion"]
  local symbol63 = _g203["symbol?"]
  local toplevel63 = _g203["toplevel?"]
  local valid_id63 = _g203["valid-id?"]
  local variable63 = _g203["variable?"]
  local _g204 = nexus["lumen/compiler"]
  local compile = _g204.compile
  local compile_function = _g204["compile-function"]
  local compile_module = _g204["compile-module"]
  local declare = _g204.declare
  local eval = _g204.eval
  local in_module = _g204["in-module"]
  local load_module = _g204["load-module"]
  local open_module = _g204["open-module"]
  local _g205 = nexus["lumen/runtime"]
  local _37 = _g205["%"]
  local _37message_handler = _g205["%message-handler"]
  local _42 = _g205["*"]
  local _43 = _g205["+"]
  local _ = _g205["-"]
  local _47 = _g205["/"]
  local _60 = _g205["<"]
  local _6061 = _g205["<="]
  local _61 = _g205["="]
  local _62 = _g205[">"]
  local _6261 = _g205[">="]
  local abs = _g205.abs
  local acos = _g205.acos
  local add = _g205.add
  local apply = _g205.apply
  local asin = _g205.asin
  local atan = _g205.atan
  local atan2 = _g205.atan2
  local atom63 = _g205["atom?"]
  local boolean63 = _g205["boolean?"]
  local cat = _g205.cat
  local ceil = _g205.ceil
  local char = _g205.char
  local code = _g205.code
  local composite63 = _g205["composite?"]
  local cos = _g205.cos
  local drop = _g205.drop
  local empty63 = _g205["empty?"]
  local exclude = _g205.exclude
  local exit = _g205.exit
  local extend = _g205.extend
  local find = _g205.find
  local flat = _g205.flat
  local flat1 = _g205.flat1
  local floor = _g205.floor
  local function63 = _g205["function?"]
  local hd = _g205.hd
  local id_literal63 = _g205["id-literal?"]
  local in63 = _g205["in?"]
  local inner = _g205.inner
  local is63 = _g205["is?"]
  local iterate = _g205.iterate
  local join = _g205.join
  local keep = _g205.keep
  local keys63 = _g205["keys?"]
  local last = _g205.last
  local length = _g205.length
  local list63 = _g205["list?"]
  local log = _g205.log
  local log10 = _g205.log10
  local make_id = _g205["make-id"]
  local map = _g205.map
  local max = _g205.max
  local min = _g205.min
  local module = _g205.module
  local module_key = _g205["module-key"]
  local nil63 = _g205["nil?"]
  local none63 = _g205["none?"]
  local number = _g205.number
  local number63 = _g205["number?"]
  local pairwise = _g205.pairwise
  local pow = _g205.pow
  local random = _g205.random
  local read_file = _g205["read-file"]
  local reduce = _g205.reduce
  local replicate = _g205.replicate
  local reverse = _g205.reverse
  local sd = _g205.sd
  local search = _g205.search
  local setenv = _g205.setenv
  local sin = _g205.sin
  local sinh = _g205.sinh
  local some63 = _g205["some?"]
  local sort = _g205.sort
  local splice = _g205.splice
  local split = _g205.split
  local sqrt = _g205.sqrt
  local stash = _g205.stash
  local string = _g205.string
  local string_literal63 = _g205["string-literal?"]
  local string63 = _g205["string?"]
  local sub = _g205.sub
  local sublist = _g205.sublist
  local substring = _g205.substring
  local table63 = _g205["table?"]
  local tan = _g205.tan
  local tanh = _g205.tanh
  local td = _g205.td
  local tl = _g205.tl
  local toplevel63 = _g205["toplevel?"]
  local unstash = _g205.unstash
  local write = _g205.write
  local write_file = _g205["write-file"]
end)();
(function ()
  local _g405 = nexus["lumen/utilities"]
  local bind = _g405.bind
  local bind42 = _g405["bind*"]
  local bound63 = _g405["bound?"]
  local exported = _g405.exported
  local getenv = _g405.getenv
  local id = _g405.id
  local imported = _g405.imported
  local indentation = _g405.indentation
  local initial_environment = _g405["initial-environment"]
  local macro_function = _g405["macro-function"]
  local macro63 = _g405["macro?"]
  local macroexpand = _g405.macroexpand
  local mapo = _g405.mapo
  local quasiexpand = _g405.quasiexpand
  local quote_environment = _g405["quote-environment"]
  local quote_modules = _g405["quote-modules"]
  local quoted = _g405.quoted
  local reserved63 = _g405["reserved?"]
  local sortk = _g405.sortk
  local special_form63 = _g405["special-form?"]
  local special63 = _g405["special?"]
  local stash42 = _g405["stash*"]
  local statement63 = _g405["statement?"]
  local symbol_expansion = _g405["symbol-expansion"]
  local symbol63 = _g405["symbol?"]
  local toplevel63 = _g405["toplevel?"]
  local valid_id63 = _g405["valid-id?"]
  local variable63 = _g405["variable?"]
  local _g406 = nexus["lumen/compiler"]
  local compile = _g406.compile
  local compile_function = _g406["compile-function"]
  local compile_module = _g406["compile-module"]
  local declare = _g406.declare
  local eval = _g406.eval
  local in_module = _g406["in-module"]
  local load_module = _g406["load-module"]
  local open_module = _g406["open-module"]
  local _g407 = nexus["lumen/runtime"]
  local _37 = _g407["%"]
  local _37message_handler = _g407["%message-handler"]
  local _42 = _g407["*"]
  local _43 = _g407["+"]
  local _ = _g407["-"]
  local _47 = _g407["/"]
  local _60 = _g407["<"]
  local _6061 = _g407["<="]
  local _61 = _g407["="]
  local _62 = _g407[">"]
  local _6261 = _g407[">="]
  local abs = _g407.abs
  local acos = _g407.acos
  local add = _g407.add
  local apply = _g407.apply
  local asin = _g407.asin
  local atan = _g407.atan
  local atan2 = _g407.atan2
  local atom63 = _g407["atom?"]
  local boolean63 = _g407["boolean?"]
  local cat = _g407.cat
  local ceil = _g407.ceil
  local char = _g407.char
  local code = _g407.code
  local composite63 = _g407["composite?"]
  local cos = _g407.cos
  local drop = _g407.drop
  local empty63 = _g407["empty?"]
  local exclude = _g407.exclude
  local exit = _g407.exit
  local extend = _g407.extend
  local find = _g407.find
  local flat = _g407.flat
  local flat1 = _g407.flat1
  local floor = _g407.floor
  local function63 = _g407["function?"]
  local hd = _g407.hd
  local id_literal63 = _g407["id-literal?"]
  local in63 = _g407["in?"]
  local inner = _g407.inner
  local is63 = _g407["is?"]
  local iterate = _g407.iterate
  local join = _g407.join
  local keep = _g407.keep
  local keys63 = _g407["keys?"]
  local last = _g407.last
  local length = _g407.length
  local list63 = _g407["list?"]
  local log = _g407.log
  local log10 = _g407.log10
  local make_id = _g407["make-id"]
  local map = _g407.map
  local max = _g407.max
  local min = _g407.min
  local module = _g407.module
  local module_key = _g407["module-key"]
  local nil63 = _g407["nil?"]
  local none63 = _g407["none?"]
  local number = _g407.number
  local number63 = _g407["number?"]
  local pairwise = _g407.pairwise
  local pow = _g407.pow
  local random = _g407.random
  local read_file = _g407["read-file"]
  local reduce = _g407.reduce
  local replicate = _g407.replicate
  local reverse = _g407.reverse
  local sd = _g407.sd
  local search = _g407.search
  local setenv = _g407.setenv
  local sin = _g407.sin
  local sinh = _g407.sinh
  local some63 = _g407["some?"]
  local sort = _g407.sort
  local splice = _g407.splice
  local split = _g407.split
  local sqrt = _g407.sqrt
  local stash = _g407.stash
  local string = _g407.string
  local string_literal63 = _g407["string-literal?"]
  local string63 = _g407["string?"]
  local sub = _g407.sub
  local sublist = _g407.sublist
  local substring = _g407.substring
  local table63 = _g407["table?"]
  local tan = _g407.tan
  local tanh = _g407.tanh
  local td = _g407.td
  local tl = _g407.tl
  local toplevel63 = _g407["toplevel?"]
  local unstash = _g407.unstash
  local write = _g407.write
  local write_file = _g407["write-file"]
  target = "lua"
end)();
(function ()
  local _g739 = nexus["lumen/utilities"]
  local bind = _g739.bind
  local bind42 = _g739["bind*"]
  local bound63 = _g739["bound?"]
  local exported = _g739.exported
  local getenv = _g739.getenv
  local id = _g739.id
  local imported = _g739.imported
  local indentation = _g739.indentation
  local initial_environment = _g739["initial-environment"]
  local macro_function = _g739["macro-function"]
  local macro63 = _g739["macro?"]
  local macroexpand = _g739.macroexpand
  local mapo = _g739.mapo
  local quasiexpand = _g739.quasiexpand
  local quote_environment = _g739["quote-environment"]
  local quote_modules = _g739["quote-modules"]
  local quoted = _g739.quoted
  local reserved63 = _g739["reserved?"]
  local sortk = _g739.sortk
  local special_form63 = _g739["special-form?"]
  local special63 = _g739["special?"]
  local stash42 = _g739["stash*"]
  local statement63 = _g739["statement?"]
  local symbol_expansion = _g739["symbol-expansion"]
  local symbol63 = _g739["symbol?"]
  local toplevel63 = _g739["toplevel?"]
  local valid_id63 = _g739["valid-id?"]
  local variable63 = _g739["variable?"]
  local _g740 = nexus["lumen/compiler"]
  local compile = _g740.compile
  local compile_function = _g740["compile-function"]
  local compile_module = _g740["compile-module"]
  local declare = _g740.declare
  local eval = _g740.eval
  local in_module = _g740["in-module"]
  local load_module = _g740["load-module"]
  local open_module = _g740["open-module"]
  local _g741 = nexus["lumen/runtime"]
  local _37 = _g741["%"]
  local _37message_handler = _g741["%message-handler"]
  local _42 = _g741["*"]
  local _43 = _g741["+"]
  local _ = _g741["-"]
  local _47 = _g741["/"]
  local _60 = _g741["<"]
  local _6061 = _g741["<="]
  local _61 = _g741["="]
  local _62 = _g741[">"]
  local _6261 = _g741[">="]
  local abs = _g741.abs
  local acos = _g741.acos
  local add = _g741.add
  local apply = _g741.apply
  local asin = _g741.asin
  local atan = _g741.atan
  local atan2 = _g741.atan2
  local atom63 = _g741["atom?"]
  local boolean63 = _g741["boolean?"]
  local cat = _g741.cat
  local ceil = _g741.ceil
  local char = _g741.char
  local code = _g741.code
  local composite63 = _g741["composite?"]
  local cos = _g741.cos
  local drop = _g741.drop
  local empty63 = _g741["empty?"]
  local exclude = _g741.exclude
  local exit = _g741.exit
  local extend = _g741.extend
  local find = _g741.find
  local flat = _g741.flat
  local flat1 = _g741.flat1
  local floor = _g741.floor
  local function63 = _g741["function?"]
  local hd = _g741.hd
  local id_literal63 = _g741["id-literal?"]
  local in63 = _g741["in?"]
  local inner = _g741.inner
  local is63 = _g741["is?"]
  local iterate = _g741.iterate
  local join = _g741.join
  local keep = _g741.keep
  local keys63 = _g741["keys?"]
  local last = _g741.last
  local length = _g741.length
  local list63 = _g741["list?"]
  local log = _g741.log
  local log10 = _g741.log10
  local make_id = _g741["make-id"]
  local map = _g741.map
  local max = _g741.max
  local min = _g741.min
  local module = _g741.module
  local module_key = _g741["module-key"]
  local nil63 = _g741["nil?"]
  local none63 = _g741["none?"]
  local number = _g741.number
  local number63 = _g741["number?"]
  local pairwise = _g741.pairwise
  local pow = _g741.pow
  local random = _g741.random
  local read_file = _g741["read-file"]
  local reduce = _g741.reduce
  local replicate = _g741.replicate
  local reverse = _g741.reverse
  local sd = _g741.sd
  local search = _g741.search
  local setenv = _g741.setenv
  local sin = _g741.sin
  local sinh = _g741.sinh
  local some63 = _g741["some?"]
  local sort = _g741.sort
  local splice = _g741.splice
  local split = _g741.split
  local sqrt = _g741.sqrt
  local stash = _g741.stash
  local string = _g741.string
  local string_literal63 = _g741["string-literal?"]
  local string63 = _g741["string?"]
  local sub = _g741.sub
  local sublist = _g741.sublist
  local substring = _g741.substring
  local table63 = _g741["table?"]
  local tan = _g741.tan
  local tanh = _g741.tanh
  local td = _g741.td
  local tl = _g741.tl
  local toplevel63 = _g741["toplevel?"]
  local unstash = _g741.unstash
  local write = _g741.write
  local write_file = _g741["write-file"]
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
    local _g802 = sub(bs, 0)
    return({"set", a, join({"cat", a}, _g802)})
  end}, dec = {export = true, macro = function (n, by)
    return({"set", n, {"-", n, by or 1}})
  end}, define = {export = true, macro = function (name, x, ...)
    local body = unstash({...})
    local _g778 = sub(body, 0)
    setenv(name, {_stash = true, variable = true})
    if some63(_g778) then
      local _g779 = bind42(x, _g778)
      local args = _g779[1]
      local _g780 = _g779[2]
      return(join({"%local-function", name, args}, _g780))
    else
      return({"%local", name, x})
    end
  end}, ["define*"] = {export = true, macro = function (name, x, ...)
    local body = unstash({...})
    local _g781 = sub(body, 0)
    setenv(name, {_stash = true, export = true, global = true})
    if some63(_g781) then
      local _g782 = bind42(x, _g781)
      local args = _g782[1]
      local _g783 = _g782[2]
      return(join({"%global-function", name, args}, _g783))
    else
      if target == "js" then
        return({"set", {"get", "global", {"quote", id(name)}}, x})
      else
        return({"set", name, x})
      end
    end
  end}, ["define-macro"] = {export = true, macro = function (name, args, ...)
    local body = unstash({...})
    local _g774 = sub(body, 0)
    local form = join({"fn", args}, _g774)
    local _g775 = {"setenv", {"quote", name}}
    _g775.form = {"quote", form}
    _g775.macro = form
    eval(_g775)
    return(nil)
  end}, ["define-module"] = {export = true, macro = function (spec, ...)
    local body = unstash({...})
    local _g767 = sub(body, 0)
    local imports = {}
    local aliased = {}
    local alias = _g767.alias
    local exp = _g767.export
    local imp = _g767.import
    local _g768 = imp or {}
    local _g769 = 0
    while _g769 < length(_g768) do
      local k = _g768[_g769 + 1]
      load_module(k)
      local _g770 = module(k).alias or {}
      local _g771 = 0
      while _g771 < length(_g770) do
        local a = _g770[_g771 + 1]
        add(imp, a)
        _g771 = _g771 + 1
      end
      imports = join(imports, imported(k))
      _g769 = _g769 + 1
    end
    modules[module_key(spec)] = {alias = alias, export = {}, import = imp}
    local _g772 = exp or {}
    local _g773 = 0
    while _g773 < length(_g772) do
      local k = _g772[_g773 + 1]
      setenv(k, {_stash = true, export = true})
      _g773 = _g773 + 1
    end
    return(join({"do"}, imports))
  end}, ["define-special"] = {export = true, macro = function (name, args, ...)
    local body = unstash({...})
    local _g776 = sub(body, 0)
    local form = join({"fn", args}, _g776)
    local keys = sub(_g776, length(_g776))
    local _g777 = {"setenv", {"quote", name}}
    _g777.form = {"quote", form}
    _g777.special = form
    eval(join(_g777, keys))
    return(nil)
  end}, ["define-symbol"] = {export = true, macro = function (name, expansion)
    setenv(name, {_stash = true, symbol = expansion})
    return(nil)
  end}, each = {export = true, macro = function (b, t, ...)
    local body = unstash({...})
    local _g797 = sub(body, 0)
    local k = b[1]
    local v = b[2]
    local t1 = make_id()
    local _g830
    if nil63(v) then
      local _g831
      if b.i then
        _g831 = "i"
      else
        _g831 = make_id()
      end
      local i = _g831
      _g830 = {"let", {i, 0}, {"while", {"<", i, {"length", t1}}, join({"let", {k, {"at", t1, i}}}, _g797), {"inc", i}}}
    else
      local _g798 = {"target"}
      _g798.js = {"isNaN", {"parseInt", k}}
      _g798.lua = {"not", {"number?", k}}
      _g830 = {"let", {k, "nil"}, {"%for", t1, k, {"when", _g798, join({"let", {v, {"get", t1, k}}}, _g797)}}}
    end
    return({"let", {t1, t}, _g830})
  end}, fn = {export = true, macro = function (args, ...)
    local body = unstash({...})
    local _g793 = sub(body, 0)
    local _g794 = bind42(args, _g793)
    local _g795 = _g794[1]
    local _g796 = _g794[2]
    return(join({"%function", _g795}, _g796))
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
    local function step(_g759)
      local a = _g759[1]
      local b = _g759[2]
      local c = sub(_g759, 2)
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
    local _g801 = sub(bs, 0)
    return({"set", a, join({"join*", a}, _g801)})
  end}, ["join*"] = {export = true, macro = function (...)
    local xs = unstash({...})
    return(reduce(function (a, b)
      return({"join", a, b})
    end, xs))
  end}, language = {export = true, macro = function ()
    return({"quote", target})
  end}, let = {export = true, macro = function (bindings, ...)
    local body = unstash({...})
    local _g762 = sub(body, 0)
    local i = 0
    local renames = {}
    local locals = {}
    map(function (_g763)
      local lh = _g763[1]
      local rh = _g763[2]
      local _g764 = bind(lh, rh)
      local _g765 = 0
      while _g765 < length(_g764) do
        local _g766 = _g764[_g765 + 1]
        local id = _g766[1]
        local val = _g766[2]
        if bound63(id) or reserved63(id) or toplevel63() then
          local rename = make_id()
          add(renames, id)
          add(renames, rename)
          id = rename
        else
          setenv(id, {_stash = true, variable = true})
        end
        add(locals, {"%local", id, val})
        _g765 = _g765 + 1
      end
    end, pairwise(bindings))
    return(join({"do"}, join(locals, {join({"let-symbol", renames}, _g762)})))
  end}, ["let-macro"] = {export = true, macro = function (definitions, ...)
    local body = unstash({...})
    local _g788 = sub(body, 0)
    add(environment, {})
    map(function (m)
      return(macroexpand(join({"define-macro"}, m)))
    end, definitions)
    local _g789 = join({"do"}, macroexpand(_g788))
    drop(environment)
    return(_g789)
  end}, ["let-symbol"] = {export = true, macro = function (expansions, ...)
    local body = unstash({...})
    local _g790 = sub(body, 0)
    add(environment, {})
    map(function (_g792)
      local name = _g792[1]
      local exp = _g792[2]
      return(macroexpand({"define-symbol", name, exp}))
    end, pairwise(expansions))
    local _g791 = join({"do"}, macroexpand(_g790))
    drop(environment)
    return(_g791)
  end}, list = {export = true, macro = function (...)
    local body = unstash({...})
    local l = join({"%array"}, body)
    if not keys63(body) then
      return(l)
    else
      local id = make_id()
      local init = {}
      local _g758 = body
      local k = nil
      for k in next, _g758 do
        if not number63(k) then
          local v = _g758[k]
          add(init, {k, {"set", {"get", id, {"quote", k}}, v}})
        end
      end
      return(join({"let", {id, l}}, join(map(sd, sortk(init, hd)), {id})))
    end
  end}, pr = {export = true, macro = function (...)
    local xs = unstash({...})
    local _g803 = map(function (x)
      return(splice({{"string", x}, "\" \""}))
    end, xs)
    return({"print", join({"cat"}, _g803)})
  end}, quasiquote = {export = true, macro = function (form)
    return(quasiexpand(form, 1))
  end}, quote = {export = true, macro = function (form)
    return(quoted(form))
  end}, ["set-of"] = {export = true, macro = function (...)
    local elements = unstash({...})
    local l = {}
    local _g799 = elements
    local _g800 = 0
    while _g800 < length(_g799) do
      local e = _g799[_g800 + 1]
      l[e] = true
      _g800 = _g800 + 1
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
    local _g761 = sub(body, 0)
    return({"if", {"not", cond}, join({"do"}, _g761)})
  end}, when = {export = true, macro = function (cond, ...)
    local body = unstash({...})
    local _g760 = sub(body, 0)
    return({"if", cond, join({"do"}, _g760)})
  end}, ["with-bindings"] = {export = true, macro = function (_g784, ...)
    local names = _g784[1]
    local body = unstash({...})
    local _g785 = sub(body, 0)
    local x = make_id()
    local _g787 = {"setenv", x}
    _g787.variable = true
    local _g786 = {"with-frame", {"each", {x}, names, _g787}}
    _g786.scope = true
    return(join(_g786, _g785))
  end}, ["with-frame"] = {export = true, macro = function (...)
    local body = unstash({...})
    local _g804 = sub(body, 0)
    local scope = body.scope
    local x = make_id()
    local _g805 = {"table"}
    _g805._scope = scope
    return({"do", {"add", "environment", _g805}, {"let", {x, join({"do"}, _g804)}, {"drop", "environment"}, x}})
  end}}, import = {{"lumen"}, {"lumen", "utilities"}, {"lumen", "compiler"}, {"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}}}, ["lumen/main"] = {export = {}, import = {{"lumen"}, {"lumen", "reader"}, {"lumen", "compiler"}, {"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}}}, ["lumen/reader"] = {export = {["define-reader"] = {export = true, macro = function (_g806, ...)
    local char = _g806[1]
    local stream = _g806[2]
    local body = unstash({...})
    local _g807 = sub(body, 0)
    return({"set", {"get", "read-table", char}, join({"fn", {stream}}, _g807)})
  end}, delimiters = {variable = true}, eof = {variable = true}, ["flag?"] = {variable = true}, ["key?"] = {variable = true}, ["make-stream"] = {export = true, variable = true}, ["peek-char"] = {variable = true}, read = {export = true, variable = true}, ["read-all"] = {export = true, variable = true}, ["read-char"] = {variable = true}, ["read-from-string"] = {export = true, variable = true}, ["read-table"] = {export = true, variable = true}, ["skip-non-code"] = {variable = true}, whitespace = {variable = true}}, import = {"lumen", {"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}}}, ["lumen/runtime"] = {export = {["%"] = {export = true, variable = true}, ["%message-handler"] = {export = true, variable = true}, ["*"] = {export = true, variable = true}, ["+"] = {export = true, variable = true}, ["-"] = {export = true, variable = true}, ["/"] = {export = true, variable = true}, ["<"] = {export = true, variable = true}, ["<="] = {export = true, variable = true}, ["="] = {export = true, variable = true}, [">"] = {export = true, variable = true}, [">="] = {export = true, variable = true}, abs = {export = true, variable = true}, acos = {export = true, variable = true}, add = {export = true, variable = true}, apply = {export = true, variable = true}, asin = {export = true, variable = true}, atan = {export = true, variable = true}, atan2 = {export = true, variable = true}, ["atom?"] = {export = true, variable = true}, ["boolean?"] = {export = true, variable = true}, cat = {export = true, variable = true}, ceil = {export = true, variable = true}, char = {export = true, variable = true}, code = {export = true, variable = true}, ["composite?"] = {export = true, variable = true}, cos = {export = true, variable = true}, drop = {export = true, variable = true}, ["empty?"] = {export = true, variable = true}, exclude = {export = true, variable = true}, exit = {export = true, variable = true}, extend = {export = true, variable = true}, find = {export = true, variable = true}, flat = {export = true, variable = true}, flat1 = {export = true, variable = true}, floor = {export = true, variable = true}, ["function?"] = {export = true, variable = true}, hd = {export = true, variable = true}, ["id-count"] = {variable = true}, ["id-literal?"] = {export = true, variable = true}, ["in?"] = {export = true, variable = true}, inner = {export = true, variable = true}, ["is?"] = {export = true, variable = true}, iterate = {export = true, variable = true}, join = {export = true, variable = true}, keep = {export = true, variable = true}, ["keys?"] = {export = true, variable = true}, last = {export = true, variable = true}, length = {export = true, variable = true}, ["list?"] = {export = true, variable = true}, log = {export = true, variable = true}, log10 = {export = true, variable = true}, ["make-id"] = {export = true, variable = true}, map = {export = true, variable = true}, mapl = {variable = true}, math = {variable = true}, max = {export = true, variable = true}, min = {export = true, variable = true}, module = {export = true, variable = true}, ["module-key"] = {export = true, variable = true}, ["nil?"] = {export = true, variable = true}, ["none?"] = {export = true, variable = true}, number = {export = true, variable = true}, ["number?"] = {export = true, variable = true}, pairwise = {export = true, variable = true}, pow = {export = true, variable = true}, random = {export = true, variable = true}, ["read-file"] = {export = true, variable = true}, reduce = {export = true, variable = true}, replicate = {export = true, variable = true}, reverse = {export = true, variable = true}, sd = {export = true, variable = true}, search = {export = true, variable = true}, setenv = {export = true, variable = true}, sin = {export = true, variable = true}, sinh = {export = true, variable = true}, ["some?"] = {export = true, variable = true}, sort = {export = true, variable = true}, splice = {export = true, variable = true}, ["splice?"] = {variable = true}, split = {export = true, variable = true}, sqrt = {export = true, variable = true}, stash = {export = true, variable = true}, string = {export = true, variable = true}, ["string-literal?"] = {export = true, variable = true}, ["string?"] = {export = true, variable = true}, sub = {export = true, variable = true}, sublist = {export = true, variable = true}, substring = {export = true, variable = true}, ["table?"] = {export = true, variable = true}, tan = {export = true, variable = true}, tanh = {export = true, variable = true}, td = {export = true, variable = true}, tl = {export = true, variable = true}, ["toplevel?"] = {export = true, variable = true}, unstash = {export = true, variable = true}, write = {export = true, variable = true}, ["write-file"] = {export = true, variable = true}}, import = {{"lumen", "special"}, {"lumen", "core"}}}, ["lumen/special"] = {export = {["%array"] = {export = true, foo = true, special = function (...)
    local forms = unstash({...})
    local _g838
    if target == "lua" then
      _g838 = "{"
    else
      _g838 = "["
    end
    local open = _g838
    local _g839
    if target == "lua" then
      _g839 = "}"
    else
      _g839 = "]"
    end
    local close = _g839
    local str = ""
    local _g825 = forms
    local i = 0
    while i < length(_g825) do
      local x = _g825[i + 1]
      str = str .. compile(x)
      if i < length(forms) - 1 then
        str = str .. ", "
      end
      i = i + 1
    end
    return(open .. str .. close)
  end}, ["%for"] = {export = true, foo = true, special = function (t, k, form)
    local _g817 = compile(t)
    local ind = indentation()
    indent_level = indent_level + 1
    local _g818 = compile(form, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local body = _g818
    if target == "lua" then
      return(ind .. "for " .. k .. " in next, " .. _g817 .. " do\n" .. body .. ind .. "end\n")
    else
      return(ind .. "for (" .. k .. " in " .. _g817 .. ") {\n" .. body .. ind .. "}\n")
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
    local _g810 = compile(cond)
    indent_level = indent_level + 1
    local _g813 = compile(cons, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local _g811 = _g813
    local _g832
    if alt then
      indent_level = indent_level + 1
      local _g814 = compile(alt, {_stash = true, stmt = true})
      indent_level = indent_level - 1
      _g832 = _g814
    end
    local _g812 = _g832
    local ind = indentation()
    local str = ""
    if target == "js" then
      str = str .. ind .. "if (" .. _g810 .. ") {\n" .. _g811 .. ind .. "}"
    else
      str = str .. ind .. "if " .. _g810 .. " then\n" .. _g811
    end
    if _g812 and target == "js" then
      str = str .. " else {\n" .. _g812 .. ind .. "}"
    else
      if _g812 then
        str = str .. ind .. "else\n" .. _g812
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
    local _g835
    if is63(value) then
      _g835 = " = " .. value1
    else
      _g835 = ""
    end
    local rh = _g835
    local _g836
    if target == "js" then
      _g836 = "var "
    else
      _g836 = "local "
    end
    local keyword = _g836
    local ind = indentation()
    return(ind .. keyword .. id .. rh)
  end, stmt = true}, ["%local-function"] = {export = true, foo = true, special = function (name, args, body)
    local x = compile_function(args, body, {_stash = true, name = name, prefix = "local "})
    return(indentation() .. x)
  end, stmt = true, tr = true}, ["%object"] = {export = true, foo = true, special = function (...)
    local forms = unstash({...})
    local str = "{"
    local _g840
    if target == "lua" then
      _g840 = " = "
    else
      _g840 = ": "
    end
    local sep = _g840
    local pairs = sortk(pairwise(forms), hd)
    local _g826 = pairs
    local i = 0
    while i < length(_g826) do
      local _g827 = _g826[i + 1]
      local k = _g827[1]
      local v = _g827[2]
      if not string63(k) then
        error("Illegal key: " .. string(k))
      end
      local _g828 = compile(v)
      local _g841
      if valid_id63(k) then
        _g841 = k
      else
        local _g842
        if target == "js" and string_literal63(k) then
          _g842 = k
        else
          local _g843
          if target == "js" then
            _g843 = quoted(k)
          else
            local _g844
            if string_literal63(k) then
              _g844 = "[" .. k .. "]"
            else
              _g844 = "[" .. quoted(k) .. "]"
            end
            _g843 = _g844
          end
          _g842 = _g843
        end
        _g841 = _g842
      end
      local _g829 = _g841
      str = str .. _g829 .. sep .. _g828
      if i < length(pairs) - 1 then
        str = str .. ", "
      end
      i = i + 1
    end
    return(str .. "}")
  end}, ["%try"] = {export = true, foo = true, special = function (form)
    local ind = indentation()
    indent_level = indent_level + 1
    local _g819 = compile(form, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local body = _g819
    local e = make_id()
    local hf = {"return", {"%array", false, {"get", e, "\"message\""}}}
    indent_level = indent_level + 1
    local _g820 = compile(hf, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local h = _g820
    return(ind .. "try {\n" .. body .. ind .. "}\n" .. ind .. "catch (" .. e .. ") {\n" .. h .. ind .. "}\n")
  end, stmt = true, tr = true}, ["break"] = {export = true, foo = true, special = function ()
    return(indentation() .. "break")
  end, stmt = true}, ["do"] = {export = true, foo = true, special = function (...)
    local forms = unstash({...})
    local str = ""
    local _g808 = forms
    local _g809 = 0
    while _g809 < length(_g808) do
      local x = _g808[_g809 + 1]
      str = str .. compile(x, {_stash = true, stmt = true})
      _g809 = _g809 + 1
    end
    return(str)
  end, stmt = true, tr = true}, ["error"] = {export = true, foo = true, special = function (x)
    local _g834
    if target == "js" then
      _g834 = "throw new " .. compile({"Error", x})
    else
      _g834 = "error(" .. compile(x) .. ")"
    end
    local e = _g834
    return(indentation() .. e)
  end, stmt = true}, ["get"] = {export = true, foo = true, special = function (t, k)
    local _g824 = compile(t)
    local k1 = compile(k)
    if target == "lua" and char(_g824, 0) == "{" then
      _g824 = "(" .. _g824 .. ")"
    end
    if string_literal63(k) and valid_id63(inner(k)) then
      return(_g824 .. "." .. inner(k))
    else
      return(_g824 .. "[" .. k1 .. "]")
    end
  end}, ["not"] = {}, ["return"] = {export = true, foo = true, special = function (x)
    local _g833
    if nil63(x) then
      _g833 = "return"
    else
      _g833 = "return(" .. compile(x) .. ")"
    end
    local _g821 = _g833
    return(indentation() .. _g821)
  end, stmt = true}, ["set"] = {export = true, foo = true, special = function (lh, rh)
    local _g822 = compile(lh)
    local _g837
    if nil63(rh) then
      _g837 = "nil"
    else
      _g837 = rh
    end
    local _g823 = compile(_g837)
    return(indentation() .. _g822 .. " = " .. _g823)
  end, stmt = true}, ["while"] = {export = true, foo = true, special = function (cond, form)
    local _g815 = compile(cond)
    indent_level = indent_level + 1
    local _g816 = compile(form, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local body = _g816
    local ind = indentation()
    if target == "js" then
      return(ind .. "while (" .. _g815 .. ") {\n" .. body .. ind .. "}\n")
    else
      return(ind .. "while " .. _g815 .. " do\n" .. body .. ind .. "end\n")
    end
  end, stmt = true, tr = true}}, import = {{"lumen"}, {"lumen", "utilities"}, {"lumen", "compiler"}, {"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}}}, ["lumen/system"] = {export = {nexus = {export = true, global = true}}, import = {{"lumen", "special"}, {"lumen", "core"}}}, ["lumen/utilities"] = {export = {bind = {export = true, variable = true}, ["bind*"] = {export = true, variable = true}, ["bound?"] = {export = true, variable = true}, ["can-unquote?"] = {variable = true}, escape = {variable = true}, exported = {export = true, variable = true}, getenv = {export = true, variable = true}, ["global?"] = {variable = true}, id = {export = true, variable = true}, imported = {export = true, variable = true}, ["indent-level"] = {export = true, global = true}, indentation = {export = true, variable = true}, ["initial-environment"] = {export = true, variable = true}, ["macro-function"] = {export = true, variable = true}, ["macro?"] = {export = true, variable = true}, macroexpand = {export = true, variable = true}, mapo = {export = true, variable = true}, ["numeric?"] = {variable = true}, quasiexpand = {export = true, variable = true}, ["quasiquote-list"] = {variable = true}, ["quasiquoting?"] = {variable = true}, ["quasisplice?"] = {variable = true}, ["quote-binding"] = {variable = true}, ["quote-environment"] = {export = true, variable = true}, ["quote-frame"] = {variable = true}, ["quote-module"] = {variable = true}, ["quote-modules"] = {export = true, variable = true}, quoted = {export = true, variable = true}, ["quoting?"] = {variable = true}, reserved = {variable = true}, ["reserved?"] = {export = true, variable = true}, sortk = {export = true, variable = true}, ["special-form?"] = {export = true, variable = true}, ["special?"] = {export = true, variable = true}, ["stash*"] = {export = true, variable = true}, ["statement?"] = {export = true, variable = true}, ["symbol-expansion"] = {export = true, variable = true}, ["symbol?"] = {export = true, variable = true}, ["toplevel?"] = {export = true, variable = true}, ["valid-char?"] = {variable = true}, ["valid-id?"] = {export = true, variable = true}, ["variable?"] = {export = true, variable = true}, ["with-indent"] = {export = true, macro = function (form)
    local result = make_id()
    return({"do", {"inc", "indent-level"}, {"let", {result, form}, {"dec", "indent-level"}, result}})
  end}}, import = {"lumen", {"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}}}}
  environment = {{["define-module"] = {export = true, macro = function (spec, ...)
    local body = unstash({...})
    local _g845 = sub(body, 0)
    local imports = {}
    local aliased = {}
    local alias = _g845.alias
    local exp = _g845.export
    local imp = _g845.import
    local _g846 = imp or {}
    local _g847 = 0
    while _g847 < length(_g846) do
      local k = _g846[_g847 + 1]
      load_module(k)
      local _g848 = module(k).alias or {}
      local _g849 = 0
      while _g849 < length(_g848) do
        local a = _g848[_g849 + 1]
        add(imp, a)
        _g849 = _g849 + 1
      end
      imports = join(imports, imported(k))
      _g847 = _g847 + 1
    end
    modules[module_key(spec)] = {alias = alias, export = {}, import = imp}
    local _g850 = exp or {}
    local _g851 = 0
    while _g851 < length(_g850) do
      local k = _g850[_g851 + 1]
      setenv(k, {_stash = true, export = true})
      _g851 = _g851 + 1
    end
    return(join({"do"}, imports))
  end}}}
end)();
(function ()
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
  local pairwise = _g5.pairwise
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
  local toplevel63 = _g5["toplevel?"]
  local unstash = _g5.unstash
  local write = _g5.write
  local write_file = _g5["write-file"]
  local function rep(str)
    local _g854,_g855 = xpcall(function ()
      return(eval(read_from_string(str)))
    end, _37message_handler)
    local _g853 = {_g854, _g855}
    local _g1 = _g853[1]
    local x = _g853[2]
    if is63(x) then
      return(print(string(x) .. " "))
    end
  end
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
  local function usage()
    print(string("usage: lumen [options] <module>") .. " ")
    print(string("options:") .. " ")
    print(string("  -o <output>\tOutput file") .. " ")
    print(string("  -t <target>\tTarget language (default: lua)") .. " ")
    print(string("  -e <expr>\tExpression to evaluate") .. " ")
    return(exit())
  end
  local function main()
    local args = arg
    if hd(args) == "-h" or hd(args) == "--help" then
      usage()
    end
    local spec = nil
    local output = nil
    local target1 = nil
    local expr = nil
    local _g856 = args
    local i = 0
    while i < length(_g856) do
      local arg = _g856[i + 1]
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
      in_module(spec or {"lumen", "main"})
      if expr then
        return(rep(expr))
      else
        return(repl())
      end
    end
  end
  main()
  local _g857 = {}
  nexus["lumen/main"] = _g857
  _g857.main = main
  _g857.rep = rep
  _g857.repl = repl
  _g857.usage = usage
end)();
