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
    local _g31 = upto or length(l)
    local l2 = {}
    while i < _g31 do
      l2[j + 1] = l[i + 1]
      i = i + 1
      j = j + 1
    end
    return(l2)
  end
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
    local _g34
    if n then
      _g34 = n + 1
    end
    return(string.byte(str, _g34))
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
          local _g35 = l1
          local k = nil
          for k in next, _g35 do
            if not number63(k) then
              local v = _g35[k]
              l[k] = v
            end
          end
          local _g36 = l2
          local k = nil
          for k in next, _g36 do
            if not number63(k) then
              local v = _g36[k]
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
    local _g37 = l
    local _g38 = 0
    while _g38 < length(_g37) do
      local x = _g37[_g38 + 1]
      if f(x) then
        add(l1, x)
      end
      _g38 = _g38 + 1
    end
    return(l1)
  end
  local function find(f, l)
    local _g39 = l
    local _g40 = 0
    while _g40 < length(_g39) do
      local x = _g39[_g40 + 1]
      local _g41 = f(x)
      if _g41 then
        return(_g41)
      end
      _g40 = _g40 + 1
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
    local _g42 = l
    local _g43 = 0
    while _g43 < length(_g42) do
      local x = _g42[_g43 + 1]
      local _g44 = f(x)
      if splice63(_g44) then
        l1 = join(l1, _g44.value)
      else
        if is63(_g44) then
          add(l1, _g44)
        end
      end
      _g43 = _g43 + 1
    end
    return(l1)
  end
  local function map(f, t)
    local l = mapl(f, t)
    local _g45 = t
    local k = nil
    for k in next, _g45 do
      if not number63(k) then
        local v = _g45[k]
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
    local _g46 = t
    local k = nil
    for k in next, _g46 do
      if not number63(k) then
        local v = _g46[k]
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
      local _g47 = args
      local k = nil
      for k in next, _g47 do
        if not number63(k) then
          local v = _g47[k]
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
        local _g48 = l
        local k = nil
        for k in next, _g48 do
          if not number63(k) then
            local v = _g48[k]
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
    local _g49 = sub(xs, 0)
    return(join(t, _g49))
  end
  local function exclude(t, ...)
    local keys = unstash({...})
    local _g50 = sub(keys, 0)
    local t1 = sublist(t)
    local _g51 = t
    local k = nil
    for k in next, _g51 do
      if not number63(k) then
        local v = _g51[k]
        if not _g50[k] then
          t1[k] = v
        end
      end
    end
    return(t1)
  end
  local function search(str, pattern, start)
    local _g53
    if start then
      _g53 = start + 1
    end
    local _g52 = _g53
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
    local _g54 = sub(xs, 0)
    if none63(_g54) then
      return("")
    else
      return(reduce(function (a, b)
        return(a .. b)
      end, _g54))
    end
  end
  local function _43(...)
    local xs = unstash({...})
    local _g55 = sub(xs, 0)
    return(reduce(function (a, b)
      return(a + b)
    end, _g55))
  end
  local function _(...)
    local xs = unstash({...})
    local _g56 = sub(xs, 0)
    return(reduce(function (a, b)
      return(b - a)
    end, reverse(_g56)))
  end
  local function _42(...)
    local xs = unstash({...})
    local _g57 = sub(xs, 0)
    return(reduce(function (a, b)
      return(a * b)
    end, _g57))
  end
  local function _47(...)
    local xs = unstash({...})
    local _g58 = sub(xs, 0)
    return(reduce(function (a, b)
      return(b / a)
    end, reverse(_g58)))
  end
  local function _37(...)
    local xs = unstash({...})
    local _g59 = sub(xs, 0)
    return(reduce(function (a, b)
      return(b % a)
    end, reverse(_g59)))
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
            local _g60 = x
            local k = nil
            for k in next, _g60 do
              if not number63(k) then
                local v = _g60[k]
                add(x1, k .. ":")
                add(x1, v)
              end
            end
            local _g61 = x1
            local i = 0
            while i < length(_g61) do
              local y = _g61[i + 1]
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
    local _g62 = stash(args)
    return(f(unpack(_g62)))
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
    local _g63 = sub(keys, 0)
    if string63(k) then
      local frame = last(environment)
      local x = frame[k] or {}
      local _g64 = _g63
      local k1 = nil
      for k1 in next, _g64 do
        if not number63(k1) then
          local v = _g64[k1]
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
  local _g65 = {}
  nexus["lumen/runtime"] = _g65
  _g65["%"] = _37
  _g65["%message-handler"] = _37message_handler
  _g65["*"] = _42
  _g65["+"] = _43
  _g65["-"] = _
  _g65["/"] = _47
  _g65["<"] = _60
  _g65["<="] = _6061
  _g65["="] = _61
  _g65[">"] = _62
  _g65[">="] = _6261
  _g65.abs = abs
  _g65.acos = acos
  _g65.add = add
  _g65.apply = apply
  _g65.asin = asin
  _g65.atan = atan
  _g65.atan2 = atan2
  _g65["atom?"] = atom63
  _g65["boolean?"] = boolean63
  _g65.cat = cat
  _g65.ceil = ceil
  _g65.char = char
  _g65.code = code
  _g65["composite?"] = composite63
  _g65.cos = cos
  _g65.drop = drop
  _g65["empty?"] = empty63
  _g65.exclude = exclude
  _g65.exit = exit
  _g65.extend = extend
  _g65.find = find
  _g65.flat = flat
  _g65.flat1 = flat1
  _g65.floor = floor
  _g65["function?"] = function63
  _g65.hd = hd
  _g65["id-count"] = id_count
  _g65["id-literal?"] = id_literal63
  _g65["in?"] = in63
  _g65.inner = inner
  _g65["is?"] = is63
  _g65.iterate = iterate
  _g65.join = join
  _g65.keep = keep
  _g65["keys?"] = keys63
  _g65.last = last
  _g65.length = length
  _g65["list?"] = list63
  _g65.log = log
  _g65.log10 = log10
  _g65["make-id"] = make_id
  _g65.map = map
  _g65.mapl = mapl
  _g65.math = math
  _g65.max = max
  _g65.min = min
  _g65.module = module
  _g65["module-key"] = module_key
  _g65["nil?"] = nil63
  _g65["none?"] = none63
  _g65.number = number
  _g65["number?"] = number63
  _g65.pairwise = pairwise
  _g65.pow = pow
  _g65.random = random
  _g65["read-file"] = read_file
  _g65.reduce = reduce
  _g65.replicate = replicate
  _g65.reverse = reverse
  _g65.sd = sd
  _g65.search = search
  _g65.setenv = setenv
  _g65.sin = sin
  _g65.sinh = sinh
  _g65["some?"] = some63
  _g65.sort = sort
  _g65.splice = splice
  _g65["splice?"] = splice63
  _g65.split = split
  _g65.sqrt = sqrt
  _g65.stash = stash
  _g65.string = string
  _g65["string-literal?"] = string_literal63
  _g65["string?"] = string63
  _g65.sub = sub
  _g65.sublist = sublist
  _g65.substring = substring
  _g65["table?"] = table63
  _g65.tan = tan
  _g65.tanh = tanh
  _g65.td = td
  _g65.tl = tl
  _g65["toplevel?"] = toplevel63
  _g65.unstash = unstash
  _g65.write = write
  _g65["write-file"] = write_file
end)();
(function ()
  local _g70 = nexus["lumen/runtime"]
  local _37 = _g70["%"]
  local _37message_handler = _g70["%message-handler"]
  local _42 = _g70["*"]
  local _43 = _g70["+"]
  local _ = _g70["-"]
  local _47 = _g70["/"]
  local _60 = _g70["<"]
  local _6061 = _g70["<="]
  local _61 = _g70["="]
  local _62 = _g70[">"]
  local _6261 = _g70[">="]
  local abs = _g70.abs
  local acos = _g70.acos
  local add = _g70.add
  local apply = _g70.apply
  local asin = _g70.asin
  local atan = _g70.atan
  local atan2 = _g70.atan2
  local atom63 = _g70["atom?"]
  local boolean63 = _g70["boolean?"]
  local cat = _g70.cat
  local ceil = _g70.ceil
  local char = _g70.char
  local code = _g70.code
  local composite63 = _g70["composite?"]
  local cos = _g70.cos
  local drop = _g70.drop
  local empty63 = _g70["empty?"]
  local exclude = _g70.exclude
  local exit = _g70.exit
  local extend = _g70.extend
  local find = _g70.find
  local flat = _g70.flat
  local flat1 = _g70.flat1
  local floor = _g70.floor
  local function63 = _g70["function?"]
  local hd = _g70.hd
  local id_literal63 = _g70["id-literal?"]
  local in63 = _g70["in?"]
  local inner = _g70.inner
  local is63 = _g70["is?"]
  local iterate = _g70.iterate
  local join = _g70.join
  local keep = _g70.keep
  local keys63 = _g70["keys?"]
  local last = _g70.last
  local length = _g70.length
  local list63 = _g70["list?"]
  local log = _g70.log
  local log10 = _g70.log10
  local make_id = _g70["make-id"]
  local map = _g70.map
  local max = _g70.max
  local min = _g70.min
  local module = _g70.module
  local module_key = _g70["module-key"]
  local nil63 = _g70["nil?"]
  local none63 = _g70["none?"]
  local number = _g70.number
  local number63 = _g70["number?"]
  local pairwise = _g70.pairwise
  local pow = _g70.pow
  local random = _g70.random
  local read_file = _g70["read-file"]
  local reduce = _g70.reduce
  local replicate = _g70.replicate
  local reverse = _g70.reverse
  local sd = _g70.sd
  local search = _g70.search
  local setenv = _g70.setenv
  local sin = _g70.sin
  local sinh = _g70.sinh
  local some63 = _g70["some?"]
  local sort = _g70.sort
  local splice = _g70.splice
  local split = _g70.split
  local sqrt = _g70.sqrt
  local stash = _g70.stash
  local string = _g70.string
  local string_literal63 = _g70["string-literal?"]
  local string63 = _g70["string?"]
  local sub = _g70.sub
  local sublist = _g70.sublist
  local substring = _g70.substring
  local table63 = _g70["table?"]
  local tan = _g70.tan
  local tanh = _g70.tanh
  local td = _g70.td
  local tl = _g70.tl
  local toplevel63 = _g70["toplevel?"]
  local unstash = _g70.unstash
  local write = _g70.write
  local write_file = _g70["write-file"]
  local function getenv(k, ...)
    local keys = unstash({...})
    local _g73 = sub(keys, 0)
    if string63(k) then
      local b = find(function (e)
        return(e[k])
      end, reverse(environment))
      if table63(b) then
        local _g74 = nil
        local _g75 = _g73
        local x = nil
        for x in next, _g75 do
          if not number63(x) then
            local _g66 = _g75[x]
            _g74 = x
          end
        end
        if _g74 then
          return(b[_g74])
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
      local _g76
      if c == "\n" then
        _g76 = "\\n"
      else
        local _g77
        if c == "\"" then
          _g77 = "\\\""
        else
          local _g78
          if c == "\\" then
            _g78 = "\\\\"
          else
            _g78 = c
          end
          _g77 = _g78
        end
        _g76 = _g77
      end
      local c1 = _g76
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
      local _g79 = args
      local k = nil
      for k in next, _g79 do
        if not number63(k) then
          local v = _g79[k]
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
        local _g80 = lh
        local i = 0
        while i < length(_g80) do
          local x = _g80[i + 1]
          bs = join(bs, bind(x, {"at", rh, i}))
          i = i + 1
        end
        if r then
          bs = join(bs, bind(r, {"sub", rh, length(lh)}))
        end
        local _g81 = lh
        local k = nil
        for k in next, _g81 do
          if not number63(k) then
            local v = _g81[k]
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
      local _g82 = args
      local _g83 = 0
      while _g83 < length(_g82) do
        local arg = _g82[_g83 + 1]
        if atom63(arg) then
          add(args1, arg)
        else
          if list63(arg) or keys63(arg) then
            local v = make_id()
            add(args1, v)
            bs = join(bs, {arg, v})
          end
        end
        _g83 = _g83 + 1
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
          local _g67 = form[1]
          local args = form[2]
          local body = sub(form, 2)
          add(environment, {_scope = true})
          local _g86 = args
          local _g87 = 0
          while _g87 < length(_g86) do
            local _g84 = _g86[_g87 + 1]
            setenv(_g84, {_stash = true, variable = true})
            _g87 = _g87 + 1
          end
          local _g85 = join({"%function", map(macroexpand, args)}, macroexpand(body))
          drop(environment)
          return(_g85)
        else
          if x == "%local-function" or x == "%global-function" then
            local _g68 = form[1]
            local name = form[2]
            local _g88 = form[3]
            local _g89 = sub(form, 3)
            add(environment, {_scope = true})
            local _g92 = _g88
            local _g93 = 0
            while _g93 < length(_g92) do
              local _g90 = _g92[_g93 + 1]
              setenv(_g90, {_stash = true, variable = true})
              _g93 = _g93 + 1
            end
            local _g91 = join({x, name, map(macroexpand, _g88)}, macroexpand(_g89))
            drop(environment)
            return(_g91)
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
    local _g94 = form
    local k = nil
    for k in next, _g94 do
      if not number63(k) then
        local v = _g94[k]
        local _g99
        if quasisplice63(v, depth) then
          _g99 = quasiexpand(v[2])
        else
          _g99 = quasiexpand(v, depth)
        end
        local _g95 = _g99
        last(xs)[k] = _g95
      end
    end
    local _g96 = form
    local _g97 = 0
    while _g97 < length(_g96) do
      local x = _g96[_g97 + 1]
      if quasisplice63(x, depth) then
        local _g98 = quasiexpand(x[2])
        add(xs, _g98)
        add(xs, {"list"})
      else
        add(last(xs), quasiexpand(x, depth))
      end
      _g97 = _g97 + 1
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
  local function sortk(l, k)
    return(sort(l, function (a, b)
      return(k(a) < k(b))
    end))
  end
  local function imported(spec, ...)
    local _g108 = unstash({...})
    local all = _g108.all
    local m = make_id()
    local k = module_key(spec)
    local imports = {}
    if nexus[k] then
      local _g109 = module(spec).export
      local n = nil
      for n in next, _g109 do
        if not number63(n) then
          local b = _g109[n]
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
    local _g110 = module(current_module).export
    local n = nil
    for n in next, _g110 do
      if not number63(n) then
        local b = _g110[n]
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
    local _g111 = t
    local k = nil
    for k in next, _g111 do
      if not number63(k) then
        local v = _g111[k]
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
    local _g112 = {"table"}
    _g112.alias = quoted(m.alias)
    _g112.export = quote_frame(m.export)
    _g112.import = quoted(m.import)
    return(_g112)
  end
  local function quote_modules()
    return(join({"table"}, map(quote_module, modules)))
  end
  local function initial_environment()
    return({{["define-module"] = getenv("define-module")}})
  end
  local _g113 = {}
  nexus["lumen/utilities"] = _g113
  _g113.bind = bind
  _g113["bind*"] = bind42
  _g113["bound?"] = bound63
  _g113["can-unquote?"] = can_unquote63
  _g113.escape = escape
  _g113.exported = exported
  _g113.getenv = getenv
  _g113["global?"] = global63
  _g113.id = id
  _g113.imported = imported
  _g113.indentation = indentation
  _g113["initial-environment"] = initial_environment
  _g113["macro-function"] = macro_function
  _g113["macro?"] = macro63
  _g113.macroexpand = macroexpand
  _g113.mapo = mapo
  _g113["numeric?"] = numeric63
  _g113.quasiexpand = quasiexpand
  _g113["quasiquote-list"] = quasiquote_list
  _g113["quasiquoting?"] = quasiquoting63
  _g113["quasisplice?"] = quasisplice63
  _g113["quote-binding"] = quote_binding
  _g113["quote-environment"] = quote_environment
  _g113["quote-frame"] = quote_frame
  _g113["quote-module"] = quote_module
  _g113["quote-modules"] = quote_modules
  _g113.quoted = quoted
  _g113["quoting?"] = quoting63
  _g113.reserved = reserved
  _g113["reserved?"] = reserved63
  _g113.sortk = sortk
  _g113["special-form?"] = special_form63
  _g113["special?"] = special63
  _g113["stash*"] = stash42
  _g113["statement?"] = statement63
  _g113["symbol-expansion"] = symbol_expansion
  _g113["symbol?"] = symbol63
  _g113["toplevel?"] = toplevel63
  _g113["valid-char?"] = valid_char63
  _g113["valid-id?"] = valid_id63
  _g113["variable?"] = variable63
end)();
(function ()
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
  local number = _g115.number
  local number63 = _g115["number?"]
  local pairwise = _g115.pairwise
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
  local splice = _g115.splice
  local split = _g115.split
  local sqrt = _g115.sqrt
  local stash = _g115.stash
  local string = _g115.string
  local string_literal63 = _g115["string-literal?"]
  local string63 = _g115["string?"]
  local sub = _g115.sub
  local sublist = _g115.sublist
  local substring = _g115.substring
  local table63 = _g115["table?"]
  local tan = _g115.tan
  local tanh = _g115.tanh
  local td = _g115.td
  local tl = _g115.tl
  local toplevel63 = _g115["toplevel?"]
  local unstash = _g115.unstash
  local write = _g115.write
  local write_file = _g115["write-file"]
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
  local _g127 = {}
  nexus["lumen/reader"] = _g127
  _g127.delimiters = delimiters
  _g127.eof = eof
  _g127["flag?"] = flag63
  _g127["key?"] = key63
  _g127["make-stream"] = make_stream
  _g127["peek-char"] = peek_char
  _g127.read = read
  _g127["read-all"] = read_all
  _g127["read-char"] = read_char
  _g127["read-from-string"] = read_from_string
  _g127["read-table"] = read_table
  _g127["skip-non-code"] = skip_non_code
  _g127.whitespace = whitespace
end)();
(function ()
  local _g129 = nexus["lumen/utilities"]
  local bind = _g129.bind
  local bind42 = _g129["bind*"]
  local bound63 = _g129["bound?"]
  local exported = _g129.exported
  local getenv = _g129.getenv
  local id = _g129.id
  local imported = _g129.imported
  local indentation = _g129.indentation
  local initial_environment = _g129["initial-environment"]
  local macro_function = _g129["macro-function"]
  local macro63 = _g129["macro?"]
  local macroexpand = _g129.macroexpand
  local mapo = _g129.mapo
  local quasiexpand = _g129.quasiexpand
  local quote_environment = _g129["quote-environment"]
  local quote_modules = _g129["quote-modules"]
  local quoted = _g129.quoted
  local reserved63 = _g129["reserved?"]
  local sortk = _g129.sortk
  local special_form63 = _g129["special-form?"]
  local special63 = _g129["special?"]
  local stash42 = _g129["stash*"]
  local statement63 = _g129["statement?"]
  local symbol_expansion = _g129["symbol-expansion"]
  local symbol63 = _g129["symbol?"]
  local toplevel63 = _g129["toplevel?"]
  local valid_id63 = _g129["valid-id?"]
  local variable63 = _g129["variable?"]
  local _g130 = nexus["lumen/reader"]
  local make_stream = _g130["make-stream"]
  local read = _g130.read
  local read_all = _g130["read-all"]
  local read_from_string = _g130["read-from-string"]
  local read_table = _g130["read-table"]
  local _g131 = nexus["lumen/runtime"]
  local _37 = _g131["%"]
  local _37message_handler = _g131["%message-handler"]
  local _42 = _g131["*"]
  local _43 = _g131["+"]
  local _ = _g131["-"]
  local _47 = _g131["/"]
  local _60 = _g131["<"]
  local _6061 = _g131["<="]
  local _61 = _g131["="]
  local _62 = _g131[">"]
  local _6261 = _g131[">="]
  local abs = _g131.abs
  local acos = _g131.acos
  local add = _g131.add
  local apply = _g131.apply
  local asin = _g131.asin
  local atan = _g131.atan
  local atan2 = _g131.atan2
  local atom63 = _g131["atom?"]
  local boolean63 = _g131["boolean?"]
  local cat = _g131.cat
  local ceil = _g131.ceil
  local char = _g131.char
  local code = _g131.code
  local composite63 = _g131["composite?"]
  local cos = _g131.cos
  local drop = _g131.drop
  local empty63 = _g131["empty?"]
  local exclude = _g131.exclude
  local exit = _g131.exit
  local extend = _g131.extend
  local find = _g131.find
  local flat = _g131.flat
  local flat1 = _g131.flat1
  local floor = _g131.floor
  local function63 = _g131["function?"]
  local hd = _g131.hd
  local id_literal63 = _g131["id-literal?"]
  local in63 = _g131["in?"]
  local inner = _g131.inner
  local is63 = _g131["is?"]
  local iterate = _g131.iterate
  local join = _g131.join
  local keep = _g131.keep
  local keys63 = _g131["keys?"]
  local last = _g131.last
  local length = _g131.length
  local list63 = _g131["list?"]
  local log = _g131.log
  local log10 = _g131.log10
  local make_id = _g131["make-id"]
  local map = _g131.map
  local max = _g131.max
  local min = _g131.min
  local module = _g131.module
  local module_key = _g131["module-key"]
  local nil63 = _g131["nil?"]
  local none63 = _g131["none?"]
  local number = _g131.number
  local number63 = _g131["number?"]
  local pairwise = _g131.pairwise
  local pow = _g131.pow
  local random = _g131.random
  local read_file = _g131["read-file"]
  local reduce = _g131.reduce
  local replicate = _g131.replicate
  local reverse = _g131.reverse
  local sd = _g131.sd
  local search = _g131.search
  local setenv = _g131.setenv
  local sin = _g131.sin
  local sinh = _g131.sinh
  local some63 = _g131["some?"]
  local sort = _g131.sort
  local splice = _g131.splice
  local split = _g131.split
  local sqrt = _g131.sqrt
  local stash = _g131.stash
  local string = _g131.string
  local string_literal63 = _g131["string-literal?"]
  local string63 = _g131["string?"]
  local sub = _g131.sub
  local sublist = _g131.sublist
  local substring = _g131.substring
  local table63 = _g131["table?"]
  local tan = _g131.tan
  local tanh = _g131.tanh
  local td = _g131.td
  local tl = _g131.tl
  local toplevel63 = _g131["toplevel?"]
  local unstash = _g131.unstash
  local write = _g131.write
  local write_file = _g131["write-file"]
  local _g137 = {}
  _g137.js = "!"
  _g137.lua = "not "
  local _g135 = {}
  local _g138 = {}
  _g138.js = "!"
  _g138.lua = "not "
  _g135["not"] = _g138
  local _g140 = {}
  _g140["%"] = true
  _g140["*"] = true
  _g140["/"] = true
  local _g142 = {}
  _g142["+"] = true
  _g142["-"] = true
  local _g146 = {}
  _g146.js = "+"
  _g146.lua = ".."
  local _g144 = {}
  local _g147 = {}
  _g147.js = "+"
  _g147.lua = ".."
  _g144.cat = _g147
  local _g149 = {}
  _g149["<"] = true
  _g149["<="] = true
  _g149[">"] = true
  _g149[">="] = true
  local _g153 = {}
  _g153.js = "==="
  _g153.lua = "=="
  local _g155 = {}
  _g155.js = "!="
  _g155.lua = "~="
  local _g151 = {}
  local _g156 = {}
  _g156.js = "==="
  _g156.lua = "=="
  _g151["="] = _g156
  local _g157 = {}
  _g157.js = "!="
  _g157.lua = "~="
  _g151["~="] = _g157
  local _g161 = {}
  _g161.js = "&&"
  _g161.lua = "and"
  local _g159 = {}
  local _g162 = {}
  _g162.js = "&&"
  _g162.lua = "and"
  _g159["and"] = _g162
  local _g166 = {}
  _g166.js = "||"
  _g166.lua = "or"
  local _g164 = {}
  local _g167 = {}
  _g167.js = "||"
  _g167.lua = "or"
  _g164["or"] = _g167
  local infix = {_g135, _g140, _g142, _g144, _g149, _g151, _g159, _g164}
  local function unary63(form)
    local op = form[1]
    local args = sub(form, 1)
    return(length(args) == 1 and in63(op, {"not", "-"}))
  end
  local function precedence(form)
    if list63(form) and not unary63(form) then
      local _g168 = infix
      local i = 0
      while i < length(_g168) do
        local level = _g168[i + 1]
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
    local _g169 = args
    local i = 0
    while i < length(_g169) do
      local arg = _g169[i + 1]
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
    local _g170 = getenv(x)
    local stmt = _g170.stmt
    local self_tr63 = _g170.tr
    local special = _g170.special
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
    local _g171 = unstash({...})
    local right = _g171.right
    local _g172
    if right then
      _g172 = _6261
    else
      _g172 = _62
    end
    if _g172(precedence(child), precedence(parent)) then
      return({"(", ")"})
    else
      return({"", ""})
    end
  end
  local function compile_infix(form)
    local op = form[1]
    local _g173 = sub(form, 1)
    local a = _g173[1]
    local b = _g173[2]
    local _g174 = op_delims(form, a)
    local ao = _g174[1]
    local ac = _g174[2]
    local _g175 = op_delims(form, b, {_stash = true, right = true})
    local bo = _g175[1]
    local bc = _g175[2]
    local _g176 = compile(a)
    local _g177 = compile(b)
    local _g178 = getop(op)
    if unary63(form) then
      return(_g178 .. ao .. _g176 .. ac)
    else
      return(ao .. _g176 .. ac .. " " .. _g178 .. " " .. bo .. _g177 .. bc)
    end
  end
  local function compile_function(args, body, ...)
    local _g179 = unstash({...})
    local name = _g179.name
    local prefix = _g179.prefix
    local _g184
    if name then
      _g184 = compile(name)
    else
      _g184 = ""
    end
    local id = _g184
    local _g180 = prefix or ""
    local _g181 = compile_args(args)
    indent_level = indent_level + 1
    local _g183 = compile(body, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local _g182 = _g183
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
      return("function " .. id .. _g181 .. " {\n" .. _g182 .. ind .. "}" .. tr)
    else
      return(_g180 .. "function " .. id .. _g181 .. "\n" .. _g182 .. ind .. tr)
    end
  end
  local function can_return63(form)
    return(is63(form) and (atom63(form) or not (hd(form) == "return") and not statement63(hd(form))))
  end
  compile = function (form, ...)
    local _g186 = unstash({...})
    local stmt = _g186.stmt
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
        local _g187 = _g189
        return(ind .. _g187 .. tr)
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
    local _g191 = sub(args, 0, length(args) - 1)
    local _g192 = 0
    while _g192 < length(_g191) do
      local x = _g191[_g192 + 1]
      add(hoist, lower(x, hoist, stmt63))
      _g192 = _g192 + 1
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
    local _g193 = args[2]
    local _g194 = args[3]
    if stmt63 or tail63 then
      local _g196
      if _g194 then
        _g196 = {lower_body({_g194}, tail63)}
      end
      return(add(hoist, join({"%if", lower(cond, hoist), lower_body({_g193}, tail63)}, _g196)))
    else
      local e = make_id()
      add(hoist, {"%local", e})
      local _g195
      if _g194 then
        _g195 = {lower({"set", e, _g194})}
      end
      add(hoist, join({"%if", lower(cond, hoist), lower({"set", e, _g193})}, _g195))
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
      local _g197
      if x == "and" then
        _g197 = {"%if", id, b, id}
      else
        _g197 = {"%if", id, id, b}
      end
      return(lower({"do", {"%local", id, a}, _g197}, hoist))
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
    local _g198 = args[2]
    local body = sub(args, 2)
    return(add(hoist, {kind, name, _g198, lower_body(body, true)}))
  end
  local function lower_call(form, hoist)
    local _g199 = map(function (x)
      return(lower(x, hoist))
    end, form)
    if some63(_g199) then
      return(_g199)
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
    local _g200 = map(process, body)
    local epilogue = map(process, exported())
    return({{"%function", {}, join({"do"}, join(_g200, epilogue))}})
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
    local _g201 = unstash({...})
    local all = _g201.all
    local m = module(spec)
    local frame = last(environment)
    local _g202 = m.export
    local k = nil
    for k in next, _g202 do
      if not number63(k) then
        local v = _g202[k]
        if v.export or all then
          frame[k] = v
        end
      end
    end
  end
  local function load_module(spec, ...)
    local _g203 = unstash({...})
    local all = _g203.all
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
  local _g204 = {}
  nexus["lumen/compiler"] = _g204
  _g204["%compile-module"] = _37compile_module
  _g204["can-return?"] = can_return63
  _g204.compile = compile
  _g204["compile-args"] = compile_args
  _g204["compile-atom"] = compile_atom
  _g204["compile-call"] = compile_call
  _g204["compile-file"] = compile_file
  _g204["compile-function"] = compile_function
  _g204["compile-infix"] = compile_infix
  _g204["compile-module"] = compile_module
  _g204["compile-special"] = compile_special
  _g204["compiler-output"] = compiler_output
  _g204["compiling?"] = compiling63
  _g204.conclude = conclude
  _g204.declare = declare
  _g204.encapsulate = encapsulate
  _g204.eval = eval
  _g204.getop = getop
  _g204["in-module"] = in_module
  _g204.infix = infix
  _g204["infix?"] = infix63
  _g204["load-module"] = load_module
  _g204.lower = lower
  _g204["lower-body"] = lower_body
  _g204["lower-call"] = lower_call
  _g204["lower-definition"] = lower_definition
  _g204["lower-do"] = lower_do
  _g204["lower-for"] = lower_for
  _g204["lower-function"] = lower_function
  _g204["lower-if"] = lower_if
  _g204["lower-infix"] = lower_infix
  _g204["lower-infix?"] = lower_infix63
  _g204["lower-short"] = lower_short
  _g204["lower-special"] = lower_special
  _g204["lower-statement"] = lower_statement
  _g204["lower-try"] = lower_try
  _g204["lower-while"] = lower_while
  _g204["module-path"] = module_path
  _g204["op-delims"] = op_delims
  _g204["open-module"] = open_module
  _g204["parenthesize-call?"] = parenthesize_call63
  _g204.precedence = precedence
  _g204.process = process
  _g204.reimported = reimported
  _g204.run = run
  _g204.terminator = terminator
  _g204["unary?"] = unary63
end)();
(function ()
  local _g206 = nexus["lumen/utilities"]
  local bind = _g206.bind
  local bind42 = _g206["bind*"]
  local bound63 = _g206["bound?"]
  local exported = _g206.exported
  local getenv = _g206.getenv
  local id = _g206.id
  local imported = _g206.imported
  local indentation = _g206.indentation
  local initial_environment = _g206["initial-environment"]
  local macro_function = _g206["macro-function"]
  local macro63 = _g206["macro?"]
  local macroexpand = _g206.macroexpand
  local mapo = _g206.mapo
  local quasiexpand = _g206.quasiexpand
  local quote_environment = _g206["quote-environment"]
  local quote_modules = _g206["quote-modules"]
  local quoted = _g206.quoted
  local reserved63 = _g206["reserved?"]
  local sortk = _g206.sortk
  local special_form63 = _g206["special-form?"]
  local special63 = _g206["special?"]
  local stash42 = _g206["stash*"]
  local statement63 = _g206["statement?"]
  local symbol_expansion = _g206["symbol-expansion"]
  local symbol63 = _g206["symbol?"]
  local toplevel63 = _g206["toplevel?"]
  local valid_id63 = _g206["valid-id?"]
  local variable63 = _g206["variable?"]
  local _g207 = nexus["lumen/compiler"]
  local compile = _g207.compile
  local compile_function = _g207["compile-function"]
  local compile_module = _g207["compile-module"]
  local declare = _g207.declare
  local eval = _g207.eval
  local in_module = _g207["in-module"]
  local load_module = _g207["load-module"]
  local open_module = _g207["open-module"]
  local _g208 = nexus["lumen/runtime"]
  local _37 = _g208["%"]
  local _37message_handler = _g208["%message-handler"]
  local _42 = _g208["*"]
  local _43 = _g208["+"]
  local _ = _g208["-"]
  local _47 = _g208["/"]
  local _60 = _g208["<"]
  local _6061 = _g208["<="]
  local _61 = _g208["="]
  local _62 = _g208[">"]
  local _6261 = _g208[">="]
  local abs = _g208.abs
  local acos = _g208.acos
  local add = _g208.add
  local apply = _g208.apply
  local asin = _g208.asin
  local atan = _g208.atan
  local atan2 = _g208.atan2
  local atom63 = _g208["atom?"]
  local boolean63 = _g208["boolean?"]
  local cat = _g208.cat
  local ceil = _g208.ceil
  local char = _g208.char
  local code = _g208.code
  local composite63 = _g208["composite?"]
  local cos = _g208.cos
  local drop = _g208.drop
  local empty63 = _g208["empty?"]
  local exclude = _g208.exclude
  local exit = _g208.exit
  local extend = _g208.extend
  local find = _g208.find
  local flat = _g208.flat
  local flat1 = _g208.flat1
  local floor = _g208.floor
  local function63 = _g208["function?"]
  local hd = _g208.hd
  local id_literal63 = _g208["id-literal?"]
  local in63 = _g208["in?"]
  local inner = _g208.inner
  local is63 = _g208["is?"]
  local iterate = _g208.iterate
  local join = _g208.join
  local keep = _g208.keep
  local keys63 = _g208["keys?"]
  local last = _g208.last
  local length = _g208.length
  local list63 = _g208["list?"]
  local log = _g208.log
  local log10 = _g208.log10
  local make_id = _g208["make-id"]
  local map = _g208.map
  local max = _g208.max
  local min = _g208.min
  local module = _g208.module
  local module_key = _g208["module-key"]
  local nil63 = _g208["nil?"]
  local none63 = _g208["none?"]
  local number = _g208.number
  local number63 = _g208["number?"]
  local pairwise = _g208.pairwise
  local pow = _g208.pow
  local random = _g208.random
  local read_file = _g208["read-file"]
  local reduce = _g208.reduce
  local replicate = _g208.replicate
  local reverse = _g208.reverse
  local sd = _g208.sd
  local search = _g208.search
  local setenv = _g208.setenv
  local sin = _g208.sin
  local sinh = _g208.sinh
  local some63 = _g208["some?"]
  local sort = _g208.sort
  local splice = _g208.splice
  local split = _g208.split
  local sqrt = _g208.sqrt
  local stash = _g208.stash
  local string = _g208.string
  local string_literal63 = _g208["string-literal?"]
  local string63 = _g208["string?"]
  local sub = _g208.sub
  local sublist = _g208.sublist
  local substring = _g208.substring
  local table63 = _g208["table?"]
  local tan = _g208.tan
  local tanh = _g208.tanh
  local td = _g208.td
  local tl = _g208.tl
  local toplevel63 = _g208["toplevel?"]
  local unstash = _g208.unstash
  local write = _g208.write
  local write_file = _g208["write-file"]
end)();
(function ()
  local _g408 = nexus["lumen/utilities"]
  local bind = _g408.bind
  local bind42 = _g408["bind*"]
  local bound63 = _g408["bound?"]
  local exported = _g408.exported
  local getenv = _g408.getenv
  local id = _g408.id
  local imported = _g408.imported
  local indentation = _g408.indentation
  local initial_environment = _g408["initial-environment"]
  local macro_function = _g408["macro-function"]
  local macro63 = _g408["macro?"]
  local macroexpand = _g408.macroexpand
  local mapo = _g408.mapo
  local quasiexpand = _g408.quasiexpand
  local quote_environment = _g408["quote-environment"]
  local quote_modules = _g408["quote-modules"]
  local quoted = _g408.quoted
  local reserved63 = _g408["reserved?"]
  local sortk = _g408.sortk
  local special_form63 = _g408["special-form?"]
  local special63 = _g408["special?"]
  local stash42 = _g408["stash*"]
  local statement63 = _g408["statement?"]
  local symbol_expansion = _g408["symbol-expansion"]
  local symbol63 = _g408["symbol?"]
  local toplevel63 = _g408["toplevel?"]
  local valid_id63 = _g408["valid-id?"]
  local variable63 = _g408["variable?"]
  local _g409 = nexus["lumen/compiler"]
  local compile = _g409.compile
  local compile_function = _g409["compile-function"]
  local compile_module = _g409["compile-module"]
  local declare = _g409.declare
  local eval = _g409.eval
  local in_module = _g409["in-module"]
  local load_module = _g409["load-module"]
  local open_module = _g409["open-module"]
  local _g410 = nexus["lumen/runtime"]
  local _37 = _g410["%"]
  local _37message_handler = _g410["%message-handler"]
  local _42 = _g410["*"]
  local _43 = _g410["+"]
  local _ = _g410["-"]
  local _47 = _g410["/"]
  local _60 = _g410["<"]
  local _6061 = _g410["<="]
  local _61 = _g410["="]
  local _62 = _g410[">"]
  local _6261 = _g410[">="]
  local abs = _g410.abs
  local acos = _g410.acos
  local add = _g410.add
  local apply = _g410.apply
  local asin = _g410.asin
  local atan = _g410.atan
  local atan2 = _g410.atan2
  local atom63 = _g410["atom?"]
  local boolean63 = _g410["boolean?"]
  local cat = _g410.cat
  local ceil = _g410.ceil
  local char = _g410.char
  local code = _g410.code
  local composite63 = _g410["composite?"]
  local cos = _g410.cos
  local drop = _g410.drop
  local empty63 = _g410["empty?"]
  local exclude = _g410.exclude
  local exit = _g410.exit
  local extend = _g410.extend
  local find = _g410.find
  local flat = _g410.flat
  local flat1 = _g410.flat1
  local floor = _g410.floor
  local function63 = _g410["function?"]
  local hd = _g410.hd
  local id_literal63 = _g410["id-literal?"]
  local in63 = _g410["in?"]
  local inner = _g410.inner
  local is63 = _g410["is?"]
  local iterate = _g410.iterate
  local join = _g410.join
  local keep = _g410.keep
  local keys63 = _g410["keys?"]
  local last = _g410.last
  local length = _g410.length
  local list63 = _g410["list?"]
  local log = _g410.log
  local log10 = _g410.log10
  local make_id = _g410["make-id"]
  local map = _g410.map
  local max = _g410.max
  local min = _g410.min
  local module = _g410.module
  local module_key = _g410["module-key"]
  local nil63 = _g410["nil?"]
  local none63 = _g410["none?"]
  local number = _g410.number
  local number63 = _g410["number?"]
  local pairwise = _g410.pairwise
  local pow = _g410.pow
  local random = _g410.random
  local read_file = _g410["read-file"]
  local reduce = _g410.reduce
  local replicate = _g410.replicate
  local reverse = _g410.reverse
  local sd = _g410.sd
  local search = _g410.search
  local setenv = _g410.setenv
  local sin = _g410.sin
  local sinh = _g410.sinh
  local some63 = _g410["some?"]
  local sort = _g410.sort
  local splice = _g410.splice
  local split = _g410.split
  local sqrt = _g410.sqrt
  local stash = _g410.stash
  local string = _g410.string
  local string_literal63 = _g410["string-literal?"]
  local string63 = _g410["string?"]
  local sub = _g410.sub
  local sublist = _g410.sublist
  local substring = _g410.substring
  local table63 = _g410["table?"]
  local tan = _g410.tan
  local tanh = _g410.tanh
  local td = _g410.td
  local tl = _g410.tl
  local toplevel63 = _g410["toplevel?"]
  local unstash = _g410.unstash
  local write = _g410.write
  local write_file = _g410["write-file"]
  target = "lua"
end)();
(function ()
  local _g742 = nexus["lumen/utilities"]
  local bind = _g742.bind
  local bind42 = _g742["bind*"]
  local bound63 = _g742["bound?"]
  local exported = _g742.exported
  local getenv = _g742.getenv
  local id = _g742.id
  local imported = _g742.imported
  local indentation = _g742.indentation
  local initial_environment = _g742["initial-environment"]
  local macro_function = _g742["macro-function"]
  local macro63 = _g742["macro?"]
  local macroexpand = _g742.macroexpand
  local mapo = _g742.mapo
  local quasiexpand = _g742.quasiexpand
  local quote_environment = _g742["quote-environment"]
  local quote_modules = _g742["quote-modules"]
  local quoted = _g742.quoted
  local reserved63 = _g742["reserved?"]
  local sortk = _g742.sortk
  local special_form63 = _g742["special-form?"]
  local special63 = _g742["special?"]
  local stash42 = _g742["stash*"]
  local statement63 = _g742["statement?"]
  local symbol_expansion = _g742["symbol-expansion"]
  local symbol63 = _g742["symbol?"]
  local toplevel63 = _g742["toplevel?"]
  local valid_id63 = _g742["valid-id?"]
  local variable63 = _g742["variable?"]
  local _g743 = nexus["lumen/compiler"]
  local compile = _g743.compile
  local compile_function = _g743["compile-function"]
  local compile_module = _g743["compile-module"]
  local declare = _g743.declare
  local eval = _g743.eval
  local in_module = _g743["in-module"]
  local load_module = _g743["load-module"]
  local open_module = _g743["open-module"]
  local _g744 = nexus["lumen/runtime"]
  local _37 = _g744["%"]
  local _37message_handler = _g744["%message-handler"]
  local _42 = _g744["*"]
  local _43 = _g744["+"]
  local _ = _g744["-"]
  local _47 = _g744["/"]
  local _60 = _g744["<"]
  local _6061 = _g744["<="]
  local _61 = _g744["="]
  local _62 = _g744[">"]
  local _6261 = _g744[">="]
  local abs = _g744.abs
  local acos = _g744.acos
  local add = _g744.add
  local apply = _g744.apply
  local asin = _g744.asin
  local atan = _g744.atan
  local atan2 = _g744.atan2
  local atom63 = _g744["atom?"]
  local boolean63 = _g744["boolean?"]
  local cat = _g744.cat
  local ceil = _g744.ceil
  local char = _g744.char
  local code = _g744.code
  local composite63 = _g744["composite?"]
  local cos = _g744.cos
  local drop = _g744.drop
  local empty63 = _g744["empty?"]
  local exclude = _g744.exclude
  local exit = _g744.exit
  local extend = _g744.extend
  local find = _g744.find
  local flat = _g744.flat
  local flat1 = _g744.flat1
  local floor = _g744.floor
  local function63 = _g744["function?"]
  local hd = _g744.hd
  local id_literal63 = _g744["id-literal?"]
  local in63 = _g744["in?"]
  local inner = _g744.inner
  local is63 = _g744["is?"]
  local iterate = _g744.iterate
  local join = _g744.join
  local keep = _g744.keep
  local keys63 = _g744["keys?"]
  local last = _g744.last
  local length = _g744.length
  local list63 = _g744["list?"]
  local log = _g744.log
  local log10 = _g744.log10
  local make_id = _g744["make-id"]
  local map = _g744.map
  local max = _g744.max
  local min = _g744.min
  local module = _g744.module
  local module_key = _g744["module-key"]
  local nil63 = _g744["nil?"]
  local none63 = _g744["none?"]
  local number = _g744.number
  local number63 = _g744["number?"]
  local pairwise = _g744.pairwise
  local pow = _g744.pow
  local random = _g744.random
  local read_file = _g744["read-file"]
  local reduce = _g744.reduce
  local replicate = _g744.replicate
  local reverse = _g744.reverse
  local sd = _g744.sd
  local search = _g744.search
  local setenv = _g744.setenv
  local sin = _g744.sin
  local sinh = _g744.sinh
  local some63 = _g744["some?"]
  local sort = _g744.sort
  local splice = _g744.splice
  local split = _g744.split
  local sqrt = _g744.sqrt
  local stash = _g744.stash
  local string = _g744.string
  local string_literal63 = _g744["string-literal?"]
  local string63 = _g744["string?"]
  local sub = _g744.sub
  local sublist = _g744.sublist
  local substring = _g744.substring
  local table63 = _g744["table?"]
  local tan = _g744.tan
  local tanh = _g744.tanh
  local td = _g744.td
  local tl = _g744.tl
  local toplevel63 = _g744["toplevel?"]
  local unstash = _g744.unstash
  local write = _g744.write
  local write_file = _g744["write-file"]
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
    local _g776 = sub(bs, 0)
    return({"set", a, join({"cat", a}, _g776)})
  end}, dec = {export = true, macro = function (n, by)
    return({"set", n, {"-", n, by or 1}})
  end}, define = {export = true, macro = function (name, x, ...)
    local body = unstash({...})
    local _g788 = sub(body, 0)
    setenv(name, {_stash = true, variable = true})
    if some63(_g788) then
      local _g789 = bind42(x, _g788)
      local args = _g789[1]
      local _g790 = _g789[2]
      return(join({"%local-function", name, args}, _g790))
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
    local _g763 = sub(body, 0)
    local form = join({"fn", args}, _g763)
    local _g764 = {"setenv", {"quote", name}}
    _g764.form = {"quote", form}
    _g764.macro = form
    eval(_g764)
    return(nil)
  end}, ["define-module"] = {export = true, macro = function (spec, ...)
    local body = unstash({...})
    local _g765 = sub(body, 0)
    local imports = {}
    local aliased = {}
    local exp = _g765.export
    local imp = _g765.import
    local alias = _g765.alias
    local _g766 = imp or {}
    local _g767 = 0
    while _g767 < length(_g766) do
      local k = _g766[_g767 + 1]
      load_module(k)
      local _g768 = module(k).alias or {}
      local _g769 = 0
      while _g769 < length(_g768) do
        local a = _g768[_g769 + 1]
        add(imp, a)
        _g769 = _g769 + 1
      end
      imports = join(imports, imported(k))
      _g767 = _g767 + 1
    end
    modules[module_key(spec)] = {alias = alias, export = {}, import = imp}
    local _g770 = exp or {}
    local _g771 = 0
    while _g771 < length(_g770) do
      local k = _g770[_g771 + 1]
      setenv(k, {_stash = true, export = true})
      _g771 = _g771 + 1
    end
    return(join({"do"}, imports))
  end}, ["define-special"] = {export = true, macro = function (name, args, ...)
    local body = unstash({...})
    local _g774 = sub(body, 0)
    local form = join({"fn", args}, _g774)
    local keys = sub(_g774, length(_g774))
    local _g775 = {"setenv", {"quote", name}}
    _g775.form = {"quote", form}
    _g775.special = form
    eval(join(_g775, keys))
    return(nil)
  end}, ["define-symbol"] = {export = true, macro = function (name, expansion)
    setenv(name, {_stash = true, symbol = expansion})
    return(nil)
  end}, each = {export = true, macro = function (b, t, ...)
    local body = unstash({...})
    local _g761 = sub(body, 0)
    local k = b[1]
    local v = b[2]
    local t1 = make_id()
    local _g833
    if nil63(v) then
      local _g834
      if b.i then
        _g834 = "i"
      else
        _g834 = make_id()
      end
      local i = _g834
      _g833 = {"let", {i, 0}, {"while", {"<", i, {"length", t1}}, join({"let", {k, {"at", t1, i}}}, _g761), {"inc", i}}}
    else
      local _g762 = {"target"}
      _g762.js = {"isNaN", {"parseInt", k}}
      _g762.lua = {"not", {"number?", k}}
      _g833 = {"let", {k, "nil"}, {"%for", t1, k, {"when", _g762, join({"let", {v, {"get", t1, k}}}, _g761)}}}
    end
    return({"let", {t1, t}, _g833})
  end}, fn = {export = true, macro = function (args, ...)
    local body = unstash({...})
    local _g791 = sub(body, 0)
    local _g792 = bind42(args, _g791)
    local _g793 = _g792[1]
    local _g794 = _g792[2]
    return(join({"%function", _g793}, _g794))
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
    local function step(_g808)
      local a = _g808[1]
      local b = _g808[2]
      local c = sub(_g808, 2)
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
    local _g805 = sub(bs, 0)
    return({"set", a, join({"join*", a}, _g805)})
  end}, ["join*"] = {export = true, macro = function (...)
    local xs = unstash({...})
    return(reduce(function (a, b)
      return({"join", a, b})
    end, xs))
  end}, language = {export = true, macro = function ()
    return({"quote", target})
  end}, let = {export = true, macro = function (bindings, ...)
    local body = unstash({...})
    local _g799 = sub(body, 0)
    local i = 0
    local renames = {}
    local locals = {}
    map(function (_g800)
      local lh = _g800[1]
      local rh = _g800[2]
      local _g801 = bind(lh, rh)
      local _g802 = 0
      while _g802 < length(_g801) do
        local _g803 = _g801[_g802 + 1]
        local id = _g803[1]
        local val = _g803[2]
        if bound63(id) or reserved63(id) or toplevel63() then
          local rename = make_id()
          add(renames, id)
          add(renames, rename)
          id = rename
        else
          setenv(id, {_stash = true, variable = true})
        end
        add(locals, {"%local", id, val})
        _g802 = _g802 + 1
      end
    end, pairwise(bindings))
    return(join({"do"}, join(locals, {join({"let-symbol", renames}, _g799)})))
  end}, ["let-macro"] = {export = true, macro = function (definitions, ...)
    local body = unstash({...})
    local _g784 = sub(body, 0)
    add(environment, {})
    map(function (m)
      return(macroexpand(join({"define-macro"}, m)))
    end, definitions)
    local _g785 = join({"do"}, macroexpand(_g784))
    drop(environment)
    return(_g785)
  end}, ["let-symbol"] = {export = true, macro = function (expansions, ...)
    local body = unstash({...})
    local _g795 = sub(body, 0)
    add(environment, {})
    map(function (_g797)
      local name = _g797[1]
      local exp = _g797[2]
      return(macroexpand({"define-symbol", name, exp}))
    end, pairwise(expansions))
    local _g796 = join({"do"}, macroexpand(_g795))
    drop(environment)
    return(_g796)
  end}, list = {export = true, macro = function (...)
    local body = unstash({...})
    local l = join({"%array"}, body)
    if not keys63(body) then
      return(l)
    else
      local id = make_id()
      local init = {}
      local _g804 = body
      local k = nil
      for k in next, _g804 do
        if not number63(k) then
          local v = _g804[k]
          add(init, {k, {"set", {"get", id, {"quote", k}}, v}})
        end
      end
      return(join({"let", {id, l}}, join(map(sd, sortk(init, hd)), {id})))
    end
  end}, pr = {export = true, macro = function (...)
    local xs = unstash({...})
    local _g798 = map(function (x)
      return(splice({{"string", x}, "\" \""}))
    end, xs)
    return({"print", join({"cat"}, _g798)})
  end}, quasiquote = {export = true, macro = function (form)
    return(quasiexpand(form, 1))
  end}, quote = {export = true, macro = function (form)
    return(quoted(form))
  end}, ["set-of"] = {export = true, macro = function (...)
    local elements = unstash({...})
    local l = {}
    local _g786 = elements
    local _g787 = 0
    while _g787 < length(_g786) do
      local e = _g786[_g787 + 1]
      l[e] = true
      _g787 = _g787 + 1
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
    local _g806 = sub(body, 0)
    return({"if", {"not", cond}, join({"do"}, _g806)})
  end}, when = {export = true, macro = function (cond, ...)
    local body = unstash({...})
    local _g807 = sub(body, 0)
    return({"if", cond, join({"do"}, _g807)})
  end}, ["with-bindings"] = {export = true, macro = function (_g777, ...)
    local names = _g777[1]
    local body = unstash({...})
    local _g778 = sub(body, 0)
    local x = make_id()
    local _g780 = {"setenv", x}
    _g780.variable = true
    local _g779 = {"with-frame", {"each", {x}, names, _g780}}
    _g779.scope = true
    return(join(_g779, _g778))
  end}, ["with-frame"] = {export = true, macro = function (...)
    local body = unstash({...})
    local _g772 = sub(body, 0)
    local scope = body.scope
    local x = make_id()
    local _g773 = {"table"}
    _g773._scope = scope
    return({"do", {"add", "environment", _g773}, {"let", {x, join({"do"}, _g772)}, {"drop", "environment"}, x}})
  end}}, import = {{"lumen"}, {"lumen", "utilities"}, {"lumen", "compiler"}, {"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}}}, ["lumen/main"] = {export = {}, import = {{"lumen"}, {"lumen", "reader"}, {"lumen", "compiler"}, {"user"}, {"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}}}, ["lumen/reader"] = {export = {["define-reader"] = {export = true, macro = function (_g809, ...)
    local char = _g809[1]
    local stream = _g809[2]
    local body = unstash({...})
    local _g810 = sub(body, 0)
    return({"set", {"get", "read-table", char}, join({"fn", {stream}}, _g810)})
  end}, delimiters = {variable = true}, eof = {variable = true}, ["flag?"] = {variable = true}, ["key?"] = {variable = true}, ["make-stream"] = {export = true, variable = true}, ["peek-char"] = {variable = true}, read = {export = true, variable = true}, ["read-all"] = {export = true, variable = true}, ["read-char"] = {variable = true}, ["read-from-string"] = {export = true, variable = true}, ["read-table"] = {export = true, variable = true}, ["skip-non-code"] = {variable = true}, whitespace = {variable = true}}, import = {"lumen", {"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}}}, ["lumen/runtime"] = {export = {["%"] = {export = true, variable = true}, ["%message-handler"] = {export = true, variable = true}, ["*"] = {export = true, variable = true}, ["+"] = {export = true, variable = true}, ["-"] = {export = true, variable = true}, ["/"] = {export = true, variable = true}, ["<"] = {export = true, variable = true}, ["<="] = {export = true, variable = true}, ["="] = {export = true, variable = true}, [">"] = {export = true, variable = true}, [">="] = {export = true, variable = true}, abs = {export = true, variable = true}, acos = {export = true, variable = true}, add = {export = true, variable = true}, apply = {export = true, variable = true}, asin = {export = true, variable = true}, atan = {export = true, variable = true}, atan2 = {export = true, variable = true}, ["atom?"] = {export = true, variable = true}, ["boolean?"] = {export = true, variable = true}, cat = {export = true, variable = true}, ceil = {export = true, variable = true}, char = {export = true, variable = true}, code = {export = true, variable = true}, ["composite?"] = {export = true, variable = true}, cos = {export = true, variable = true}, drop = {export = true, variable = true}, ["empty?"] = {export = true, variable = true}, exclude = {export = true, variable = true}, exit = {export = true, variable = true}, extend = {export = true, variable = true}, find = {export = true, variable = true}, flat = {export = true, variable = true}, flat1 = {export = true, variable = true}, floor = {export = true, variable = true}, ["function?"] = {export = true, variable = true}, hd = {export = true, variable = true}, ["id-count"] = {variable = true}, ["id-literal?"] = {export = true, variable = true}, ["in?"] = {export = true, variable = true}, inner = {export = true, variable = true}, ["is?"] = {export = true, variable = true}, iterate = {export = true, variable = true}, join = {export = true, variable = true}, keep = {export = true, variable = true}, ["keys?"] = {export = true, variable = true}, last = {export = true, variable = true}, length = {export = true, variable = true}, ["list?"] = {export = true, variable = true}, log = {export = true, variable = true}, log10 = {export = true, variable = true}, ["make-id"] = {export = true, variable = true}, map = {export = true, variable = true}, mapl = {variable = true}, math = {variable = true}, max = {export = true, variable = true}, min = {export = true, variable = true}, module = {export = true, variable = true}, ["module-key"] = {export = true, variable = true}, ["nil?"] = {export = true, variable = true}, ["none?"] = {export = true, variable = true}, number = {export = true, variable = true}, ["number?"] = {export = true, variable = true}, pairwise = {export = true, variable = true}, pow = {export = true, variable = true}, random = {export = true, variable = true}, ["read-file"] = {export = true, variable = true}, reduce = {export = true, variable = true}, replicate = {export = true, variable = true}, reverse = {export = true, variable = true}, sd = {export = true, variable = true}, search = {export = true, variable = true}, setenv = {export = true, variable = true}, sin = {export = true, variable = true}, sinh = {export = true, variable = true}, ["some?"] = {export = true, variable = true}, sort = {export = true, variable = true}, splice = {export = true, variable = true}, ["splice?"] = {variable = true}, split = {export = true, variable = true}, sqrt = {export = true, variable = true}, stash = {export = true, variable = true}, string = {export = true, variable = true}, ["string-literal?"] = {export = true, variable = true}, ["string?"] = {export = true, variable = true}, sub = {export = true, variable = true}, sublist = {export = true, variable = true}, substring = {export = true, variable = true}, ["table?"] = {export = true, variable = true}, tan = {export = true, variable = true}, tanh = {export = true, variable = true}, td = {export = true, variable = true}, tl = {export = true, variable = true}, ["toplevel?"] = {export = true, variable = true}, unstash = {export = true, variable = true}, write = {export = true, variable = true}, ["write-file"] = {export = true, variable = true}}, import = {{"lumen", "special"}, {"lumen", "core"}}}, ["lumen/special"] = {export = {["%array"] = {export = true, foo = true, special = function (...)
    local forms = unstash({...})
    local _g837
    if target == "lua" then
      _g837 = "{"
    else
      _g837 = "["
    end
    local open = _g837
    local _g838
    if target == "lua" then
      _g838 = "}"
    else
      _g838 = "]"
    end
    local close = _g838
    local str = ""
    local _g811 = forms
    local i = 0
    while i < length(_g811) do
      local x = _g811[i + 1]
      str = str .. compile(x)
      if i < length(forms) - 1 then
        str = str .. ", "
      end
      i = i + 1
    end
    return(open .. str .. close)
  end}, ["%for"] = {export = true, foo = true, special = function (t, k, form)
    local _g830 = compile(t)
    local ind = indentation()
    indent_level = indent_level + 1
    local _g831 = compile(form, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local body = _g831
    if target == "lua" then
      return(ind .. "for " .. k .. " in next, " .. _g830 .. " do\n" .. body .. ind .. "end\n")
    else
      return(ind .. "for (" .. k .. " in " .. _g830 .. ") {\n" .. body .. ind .. "}\n")
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
    local _g815 = compile(cond)
    indent_level = indent_level + 1
    local _g818 = compile(cons, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local _g816 = _g818
    local _g841
    if alt then
      indent_level = indent_level + 1
      local _g819 = compile(alt, {_stash = true, stmt = true})
      indent_level = indent_level - 1
      _g841 = _g819
    end
    local _g817 = _g841
    local ind = indentation()
    local str = ""
    if target == "js" then
      str = str .. ind .. "if (" .. _g815 .. ") {\n" .. _g816 .. ind .. "}"
    else
      str = str .. ind .. "if " .. _g815 .. " then\n" .. _g816
    end
    if _g817 and target == "js" then
      str = str .. " else {\n" .. _g817 .. ind .. "}"
    else
      if _g817 then
        str = str .. ind .. "else\n" .. _g817
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
    local _g842
    if target == "lua" then
      _g842 = " = "
    else
      _g842 = ": "
    end
    local sep = _g842
    local pairs = sortk(pairwise(forms), hd)
    local _g820 = pairs
    local i = 0
    while i < length(_g820) do
      local _g821 = _g820[i + 1]
      local k = _g821[1]
      local v = _g821[2]
      if not string63(k) then
        error("Illegal key: " .. string(k))
      end
      local _g822 = compile(v)
      local _g843
      if valid_id63(k) then
        _g843 = k
      else
        local _g844
        if target == "js" and string_literal63(k) then
          _g844 = k
        else
          local _g845
          if target == "js" then
            _g845 = quoted(k)
          else
            local _g846
            if string_literal63(k) then
              _g846 = "[" .. k .. "]"
            else
              _g846 = "[" .. quoted(k) .. "]"
            end
            _g845 = _g846
          end
          _g844 = _g845
        end
        _g843 = _g844
      end
      local _g823 = _g843
      str = str .. _g823 .. sep .. _g822
      if i < length(pairs) - 1 then
        str = str .. ", "
      end
      i = i + 1
    end
    return(str .. "}")
  end}, ["%try"] = {export = true, foo = true, special = function (form)
    local ind = indentation()
    indent_level = indent_level + 1
    local _g826 = compile(form, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local body = _g826
    local e = make_id()
    local hf = {"return", {"%array", false, {"get", e, "\"message\""}}}
    indent_level = indent_level + 1
    local _g827 = compile(hf, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local h = _g827
    return(ind .. "try {\n" .. body .. ind .. "}\n" .. ind .. "catch (" .. e .. ") {\n" .. h .. ind .. "}\n")
  end, stmt = true, tr = true}, ["break"] = {export = true, foo = true, special = function ()
    return(indentation() .. "break")
  end, stmt = true}, ["do"] = {export = true, foo = true, special = function (...)
    local forms = unstash({...})
    local str = ""
    local _g824 = forms
    local _g825 = 0
    while _g825 < length(_g824) do
      local x = _g824[_g825 + 1]
      str = str .. compile(x, {_stash = true, stmt = true})
      _g825 = _g825 + 1
    end
    return(str)
  end, stmt = true, tr = true}, ["error"] = {export = true, foo = true, special = function (x)
    local _g847
    if target == "js" then
      _g847 = "throw new " .. compile({"Error", x})
    else
      _g847 = "error(" .. compile(x) .. ")"
    end
    local e = _g847
    return(indentation() .. e)
  end, stmt = true}, ["get"] = {export = true, foo = true, special = function (t, k)
    local _g832 = compile(t)
    local k1 = compile(k)
    if target == "lua" and char(_g832, 0) == "{" then
      _g832 = "(" .. _g832 .. ")"
    end
    if string_literal63(k) and valid_id63(inner(k)) then
      return(_g832 .. "." .. inner(k))
    else
      return(_g832 .. "[" .. k1 .. "]")
    end
  end}, ["not"] = {}, ["return"] = {export = true, foo = true, special = function (x)
    local _g839
    if nil63(x) then
      _g839 = "return"
    else
      _g839 = "return(" .. compile(x) .. ")"
    end
    local _g812 = _g839
    return(indentation() .. _g812)
  end, stmt = true}, ["set"] = {export = true, foo = true, special = function (lh, rh)
    local _g813 = compile(lh)
    local _g840
    if nil63(rh) then
      _g840 = "nil"
    else
      _g840 = rh
    end
    local _g814 = compile(_g840)
    return(indentation() .. _g813 .. " = " .. _g814)
  end, stmt = true}, ["while"] = {export = true, foo = true, special = function (cond, form)
    local _g828 = compile(cond)
    indent_level = indent_level + 1
    local _g829 = compile(form, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local body = _g829
    local ind = indentation()
    if target == "js" then
      return(ind .. "while (" .. _g828 .. ") {\n" .. body .. ind .. "}\n")
    else
      return(ind .. "while " .. _g828 .. " do\n" .. body .. ind .. "end\n")
    end
  end, stmt = true, tr = true}}, import = {{"lumen"}, {"lumen", "utilities"}, {"lumen", "compiler"}, {"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}}}, ["lumen/system"] = {export = {nexus = {export = true, global = true}}, import = {{"lumen", "special"}, {"lumen", "core"}}}, ["lumen/utilities"] = {export = {bind = {export = true, variable = true}, ["bind*"] = {export = true, variable = true}, ["bound?"] = {export = true, variable = true}, ["can-unquote?"] = {variable = true}, escape = {variable = true}, exported = {export = true, variable = true}, getenv = {export = true, variable = true}, ["global?"] = {variable = true}, id = {export = true, variable = true}, imported = {export = true, variable = true}, ["indent-level"] = {export = true, global = true}, indentation = {export = true, variable = true}, ["initial-environment"] = {export = true, variable = true}, ["macro-function"] = {export = true, variable = true}, ["macro?"] = {export = true, variable = true}, macroexpand = {export = true, variable = true}, mapo = {export = true, variable = true}, ["numeric?"] = {variable = true}, quasiexpand = {export = true, variable = true}, ["quasiquote-list"] = {variable = true}, ["quasiquoting?"] = {variable = true}, ["quasisplice?"] = {variable = true}, ["quote-binding"] = {variable = true}, ["quote-environment"] = {export = true, variable = true}, ["quote-frame"] = {variable = true}, ["quote-module"] = {variable = true}, ["quote-modules"] = {export = true, variable = true}, quoted = {export = true, variable = true}, ["quoting?"] = {variable = true}, reserved = {variable = true}, ["reserved?"] = {export = true, variable = true}, sortk = {export = true, variable = true}, ["special-form?"] = {export = true, variable = true}, ["special?"] = {export = true, variable = true}, ["stash*"] = {export = true, variable = true}, ["statement?"] = {export = true, variable = true}, ["symbol-expansion"] = {export = true, variable = true}, ["symbol?"] = {export = true, variable = true}, ["toplevel?"] = {export = true, variable = true}, ["valid-char?"] = {variable = true}, ["valid-id?"] = {export = true, variable = true}, ["variable?"] = {export = true, variable = true}, ["with-indent"] = {export = true, macro = function (form)
    local result = make_id()
    return({"do", {"inc", "indent-level"}, {"let", {result, form}, {"dec", "indent-level"}, result}})
  end}}, import = {"lumen", {"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}}}, user = {export = {}, import = {"lumen", {"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}}}}
  environment = {{["define-module"] = {export = true, macro = function (spec, ...)
    local body = unstash({...})
    local _g848 = sub(body, 0)
    local imports = {}
    local aliased = {}
    local exp = _g848.export
    local imp = _g848.import
    local alias = _g848.alias
    local _g849 = imp or {}
    local _g850 = 0
    while _g850 < length(_g849) do
      local k = _g849[_g850 + 1]
      load_module(k)
      local _g851 = module(k).alias or {}
      local _g852 = 0
      while _g852 < length(_g851) do
        local a = _g851[_g852 + 1]
        add(imp, a)
        _g852 = _g852 + 1
      end
      imports = join(imports, imported(k))
      _g850 = _g850 + 1
    end
    modules[module_key(spec)] = {alias = alias, export = {}, import = imp}
    local _g853 = exp or {}
    local _g854 = 0
    while _g854 < length(_g853) do
      local k = _g853[_g854 + 1]
      setenv(k, {_stash = true, export = true})
      _g854 = _g854 + 1
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
    local _g857,_g858 = xpcall(function ()
      return(eval(read_from_string(str)))
    end, _37message_handler)
    local _g856 = {_g857, _g858}
    local _g1 = _g856[1]
    local x = _g856[2]
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
    local _g859 = args
    local i = 0
    while i < length(_g859) do
      local arg = _g859[i + 1]
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
  main()
  local _g860 = {}
  nexus["lumen/main"] = _g860
  _g860.main = main
  _g860.rep = rep
  _g860.repl = repl
  _g860.usage = usage
end)();
