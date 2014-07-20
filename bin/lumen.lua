(function ()
  nexus = {}
end)();
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
    local _g20 = l
    local _g21 = 0
    while _g21 < length(_g20) do
      local y = _g20[_g21 + 1]
      if x == y then
        return(true)
      end
      _g21 = _g21 + 1
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
    local _g22 = upto or length(l)
    local l2 = {}
    while i < _g22 do
      l2[j + 1] = l[i + 1]
      i = i + 1
      j = j + 1
    end
    return(l2)
  end
  local function sub(x, from, upto)
    local _g23 = from or 0
    if string63(x) then
      return(substring(x, _g23, upto))
    else
      local l = sublist(x, _g23, upto)
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
    local _g25
    if n then
      _g25 = n + 1
    end
    return(string.byte(str, _g25))
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
          local _g26 = l1
          local k = nil
          for k in next, _g26 do
            if not number63(k) then
              local v = _g26[k]
              l[k] = v
            end
          end
          local _g27 = l2
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
    local _g28 = l
    local _g29 = 0
    while _g29 < length(_g28) do
      local x = _g28[_g29 + 1]
      if f(x) then
        add(l1, x)
      end
      _g29 = _g29 + 1
    end
    return(l1)
  end
  local function find(f, l)
    local _g30 = l
    local _g31 = 0
    while _g31 < length(_g30) do
      local x = _g30[_g31 + 1]
      local _g32 = f(x)
      if _g32 then
        return(_g32)
      end
      _g31 = _g31 + 1
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
    local _g33 = l
    local _g34 = 0
    while _g34 < length(_g33) do
      local x = _g33[_g34 + 1]
      local _g35 = f(x)
      if splice63(_g35) then
        l1 = join(l1, _g35.value)
      else
        if is63(_g35) then
          add(l1, _g35)
        end
      end
      _g34 = _g34 + 1
    end
    return(l1)
  end
  local function map(f, t)
    local l = mapl(f, t)
    local _g36 = t
    local k = nil
    for k in next, _g36 do
      if not number63(k) then
        local v = _g36[k]
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
    local _g37 = t
    local k = nil
    for k in next, _g37 do
      if not number63(k) then
        local v = _g37[k]
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
      local _g38 = args
      local k = nil
      for k in next, _g38 do
        if not number63(k) then
          local v = _g38[k]
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
        local _g39 = l
        local k = nil
        for k in next, _g39 do
          if not number63(k) then
            local v = _g39[k]
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
    local _g40 = sub(xs, 0)
    return(join(t, _g40))
  end
  local function exclude(t, ...)
    local keys = unstash({...})
    local _g41 = sub(keys, 0)
    local t1 = sublist(t)
    local _g42 = t
    local k = nil
    for k in next, _g42 do
      if not number63(k) then
        local v = _g42[k]
        if not _g41[k] then
          t1[k] = v
        end
      end
    end
    return(t1)
  end
  local function search(str, pattern, start)
    local _g44
    if start then
      _g44 = start + 1
    end
    local _g43 = _g44
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
    local _g45 = sub(xs, 0)
    if none63(_g45) then
      return("")
    else
      return(reduce(function (a, b)
        return(a .. b)
      end, _g45))
    end
  end
  local function _43(...)
    local xs = unstash({...})
    local _g46 = sub(xs, 0)
    return(reduce(function (a, b)
      return(a + b)
    end, _g46))
  end
  local function _(...)
    local xs = unstash({...})
    local _g47 = sub(xs, 0)
    return(reduce(function (a, b)
      return(b - a)
    end, reverse(_g47)))
  end
  local function _42(...)
    local xs = unstash({...})
    local _g48 = sub(xs, 0)
    return(reduce(function (a, b)
      return(a * b)
    end, _g48))
  end
  local function _47(...)
    local xs = unstash({...})
    local _g49 = sub(xs, 0)
    return(reduce(function (a, b)
      return(b / a)
    end, reverse(_g49)))
  end
  local function _37(...)
    local xs = unstash({...})
    local _g50 = sub(xs, 0)
    return(reduce(function (a, b)
      return(b % a)
    end, reverse(_g50)))
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
  local function apply(f, args)
    local _g53 = stash(args)
    return(f(unpack(_g53)))
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
  local _g56 = {}
  nexus.runtime = _g56
  _g56["%"] = _37
  _g56["%message-handler"] = _37message_handler
  _g56["*"] = _42
  _g56["+"] = _43
  _g56["-"] = _
  _g56["/"] = _47
  _g56["<"] = _60
  _g56["<="] = _6061
  _g56["="] = _61
  _g56[">"] = _62
  _g56[">="] = _6261
  _g56.abs = abs
  _g56.acos = acos
  _g56.add = add
  _g56.apply = apply
  _g56.asin = asin
  _g56.atan = atan
  _g56.atan2 = atan2
  _g56["atom?"] = atom63
  _g56["boolean?"] = boolean63
  _g56.cat = cat
  _g56.ceil = ceil
  _g56.char = char
  _g56.code = code
  _g56["composite?"] = composite63
  _g56.cos = cos
  _g56.drop = drop
  _g56["empty?"] = empty63
  _g56.exclude = exclude
  _g56.exit = exit
  _g56.extend = extend
  _g56.find = find
  _g56.flat = flat
  _g56.flat1 = flat1
  _g56.floor = floor
  _g56["function?"] = function63
  _g56.hd = hd
  _g56["id-count"] = id_count
  _g56["id-literal?"] = id_literal63
  _g56["in?"] = in63
  _g56.inner = inner
  _g56["is?"] = is63
  _g56.iterate = iterate
  _g56.join = join
  _g56.keep = keep
  _g56["keys?"] = keys63
  _g56.last = last
  _g56.length = length
  _g56["list?"] = list63
  _g56.log = log
  _g56.log10 = log10
  _g56["make-id"] = make_id
  _g56.map = map
  _g56.mapl = mapl
  _g56.math = math
  _g56.max = max
  _g56.min = min
  _g56.module = module
  _g56["module-key"] = module_key
  _g56["nil?"] = nil63
  _g56["none?"] = none63
  _g56.number = number
  _g56["number?"] = number63
  _g56.pairwise = pairwise
  _g56.pow = pow
  _g56.random = random
  _g56["read-file"] = read_file
  _g56.reduce = reduce
  _g56.replicate = replicate
  _g56.reverse = reverse
  _g56.sd = sd
  _g56.search = search
  _g56.setenv = setenv
  _g56.sin = sin
  _g56.sinh = sinh
  _g56["some?"] = some63
  _g56.sort = sort
  _g56.splice = splice
  _g56["splice?"] = splice63
  _g56.split = split
  _g56.sqrt = sqrt
  _g56.stash = stash
  _g56.string = string
  _g56["string-literal?"] = string_literal63
  _g56["string?"] = string63
  _g56.sub = sub
  _g56.sublist = sublist
  _g56.substring = substring
  _g56["table?"] = table63
  _g56.tan = tan
  _g56.tanh = tanh
  _g56.td = td
  _g56.tl = tl
  _g56["toplevel?"] = toplevel63
  _g56.unstash = unstash
  _g56.write = write
  _g56["write-file"] = write_file
end)();
(function ()
  local _g60 = nexus.runtime
  local _37 = _g60["%"]
  local _37message_handler = _g60["%message-handler"]
  local _42 = _g60["*"]
  local _43 = _g60["+"]
  local _ = _g60["-"]
  local _47 = _g60["/"]
  local _60 = _g60["<"]
  local _6061 = _g60["<="]
  local _61 = _g60["="]
  local _62 = _g60[">"]
  local _6261 = _g60[">="]
  local abs = _g60.abs
  local acos = _g60.acos
  local add = _g60.add
  local apply = _g60.apply
  local asin = _g60.asin
  local atan = _g60.atan
  local atan2 = _g60.atan2
  local atom63 = _g60["atom?"]
  local boolean63 = _g60["boolean?"]
  local cat = _g60.cat
  local ceil = _g60.ceil
  local char = _g60.char
  local code = _g60.code
  local composite63 = _g60["composite?"]
  local cos = _g60.cos
  local drop = _g60.drop
  local empty63 = _g60["empty?"]
  local exclude = _g60.exclude
  local exit = _g60.exit
  local extend = _g60.extend
  local find = _g60.find
  local flat = _g60.flat
  local flat1 = _g60.flat1
  local floor = _g60.floor
  local function63 = _g60["function?"]
  local hd = _g60.hd
  local id_literal63 = _g60["id-literal?"]
  local in63 = _g60["in?"]
  local inner = _g60.inner
  local is63 = _g60["is?"]
  local iterate = _g60.iterate
  local join = _g60.join
  local keep = _g60.keep
  local keys63 = _g60["keys?"]
  local last = _g60.last
  local length = _g60.length
  local list63 = _g60["list?"]
  local log = _g60.log
  local log10 = _g60.log10
  local make_id = _g60["make-id"]
  local map = _g60.map
  local max = _g60.max
  local min = _g60.min
  local module = _g60.module
  local module_key = _g60["module-key"]
  local nil63 = _g60["nil?"]
  local none63 = _g60["none?"]
  local number = _g60.number
  local number63 = _g60["number?"]
  local pairwise = _g60.pairwise
  local pow = _g60.pow
  local random = _g60.random
  local read_file = _g60["read-file"]
  local reduce = _g60.reduce
  local replicate = _g60.replicate
  local reverse = _g60.reverse
  local sd = _g60.sd
  local search = _g60.search
  local setenv = _g60.setenv
  local sin = _g60.sin
  local sinh = _g60.sinh
  local some63 = _g60["some?"]
  local sort = _g60.sort
  local splice = _g60.splice
  local split = _g60.split
  local sqrt = _g60.sqrt
  local stash = _g60.stash
  local string = _g60.string
  local string_literal63 = _g60["string-literal?"]
  local string63 = _g60["string?"]
  local sub = _g60.sub
  local sublist = _g60.sublist
  local substring = _g60.substring
  local table63 = _g60["table?"]
  local tan = _g60.tan
  local tanh = _g60.tanh
  local td = _g60.td
  local tl = _g60.tl
  local toplevel63 = _g60["toplevel?"]
  local unstash = _g60.unstash
  local write = _g60.write
  local write_file = _g60["write-file"]
  local function getenv(k, ...)
    local keys = unstash({...})
    local _g63 = sub(keys, 0)
    if string63(k) then
      local b = find(function (e)
        return(e[k])
      end, reverse(environment))
      if table63(b) then
        local _g64 = nil
        local _g65 = _g63
        local x = nil
        for x in next, _g65 do
          if not number63(x) then
            local _g57 = _g65[x]
            _g64 = x
          end
        end
        if _g64 then
          return(b[_g64])
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
      local _g66
      if c == "\n" then
        _g66 = "\\n"
      else
        local _g67
        if c == "\"" then
          _g67 = "\\\""
        else
          local _g68
          if c == "\\" then
            _g68 = "\\\\"
          else
            _g68 = c
          end
          _g67 = _g68
        end
        _g66 = _g67
      end
      local c1 = _g66
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
          local _g58 = form[1]
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
            local _g59 = form[1]
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
  local quasiexpand
  local quasiquote_list
  quasiquote_list = function (form, depth)
    local xs = {{"list"}}
    local _g84 = form
    local k = nil
    for k in next, _g84 do
      if not number63(k) then
        local v = _g84[k]
        local _g89
        if quasisplice63(v, depth) then
          _g89 = quasiexpand(v[2])
        else
          _g89 = quasiexpand(v, depth)
        end
        local _g85 = _g89
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
      local _g94
      if c == "-" then
        _g94 = "_"
      else
        local _g95
        if valid_char63(n) then
          _g95 = c
        else
          local _g96
          if i == 0 then
            _g96 = "_" .. n
          else
            _g96 = n
          end
          _g95 = _g96
        end
        _g94 = _g95
      end
      local c1 = _g94
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
  local function exported()
    local m = make_id()
    local k = module_key(current_module)
    local exports = {}
    local _g99 = module(current_module).export
    local n = nil
    for n in next, _g99 do
      if not number63(n) then
        local b = _g99[n]
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
    local _g100 = t
    local k = nil
    for k in next, _g100 do
      if not number63(k) then
        local v = _g100[k]
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
    local _g101 = {"table"}
    _g101.export = quote_frame(m.export)
    _g101.import = quoted(m.import)
    return(_g101)
  end
  local function quote_modules()
    return(join({"table"}, map(quote_module, modules)))
  end
  local function initial_environment()
    return({{["define-module"] = getenv("define-module")}})
  end
  local _g102 = {}
  nexus.utilities = _g102
  _g102.bind = bind
  _g102["bind*"] = bind42
  _g102["bound?"] = bound63
  _g102["can-unquote?"] = can_unquote63
  _g102.escape = escape
  _g102.exported = exported
  _g102.getenv = getenv
  _g102["global?"] = global63
  _g102.id = id
  _g102.imported = imported
  _g102.indentation = indentation
  _g102["initial-environment"] = initial_environment
  _g102["macro-function"] = macro_function
  _g102["macro?"] = macro63
  _g102.macroexpand = macroexpand
  _g102.mapo = mapo
  _g102["numeric?"] = numeric63
  _g102.quasiexpand = quasiexpand
  _g102["quasiquote-list"] = quasiquote_list
  _g102["quasiquoting?"] = quasiquoting63
  _g102["quasisplice?"] = quasisplice63
  _g102["quote-binding"] = quote_binding
  _g102["quote-environment"] = quote_environment
  _g102["quote-frame"] = quote_frame
  _g102["quote-module"] = quote_module
  _g102["quote-modules"] = quote_modules
  _g102.quoted = quoted
  _g102["quoting?"] = quoting63
  _g102.reserved = reserved
  _g102["reserved?"] = reserved63
  _g102.sortk = sortk
  _g102["special-form?"] = special_form63
  _g102["special?"] = special63
  _g102["stash*"] = stash42
  _g102["statement?"] = statement63
  _g102["symbol-expansion"] = symbol_expansion
  _g102["symbol?"] = symbol63
  _g102["toplevel?"] = toplevel63
  _g102["valid-char?"] = valid_char63
  _g102["valid-id?"] = valid_id63
  _g102["variable?"] = variable63
end)();
(function ()
  local _g103 = nexus.runtime
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
  local number = _g103.number
  local number63 = _g103["number?"]
  local pairwise = _g103.pairwise
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
  local toplevel63 = _g103["toplevel?"]
  local unstash = _g103.unstash
  local write = _g103.write
  local write_file = _g103["write-file"]
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
  local _g113 = {}
  nexus.reader = _g113
  _g113.delimiters = delimiters
  _g113.eof = eof
  _g113["flag?"] = flag63
  _g113["key?"] = key63
  _g113["make-stream"] = make_stream
  _g113["peek-char"] = peek_char
  _g113.read = read
  _g113["read-all"] = read_all
  _g113["read-char"] = read_char
  _g113["read-from-string"] = read_from_string
  _g113["read-table"] = read_table
  _g113["skip-non-code"] = skip_non_code
  _g113.whitespace = whitespace
end)();
(function ()
  local _g114 = nexus.runtime
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
  local number = _g114.number
  local number63 = _g114["number?"]
  local pairwise = _g114.pairwise
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
  local toplevel63 = _g114["toplevel?"]
  local unstash = _g114.unstash
  local write = _g114.write
  local write_file = _g114["write-file"]
  local _g115 = nexus.utilities
  local bind = _g115.bind
  local bind42 = _g115["bind*"]
  local bound63 = _g115["bound?"]
  local exported = _g115.exported
  local getenv = _g115.getenv
  local id = _g115.id
  local imported = _g115.imported
  local indentation = _g115.indentation
  local initial_environment = _g115["initial-environment"]
  local macro_function = _g115["macro-function"]
  local macro63 = _g115["macro?"]
  local macroexpand = _g115.macroexpand
  local mapo = _g115.mapo
  local quasiexpand = _g115.quasiexpand
  local quote_environment = _g115["quote-environment"]
  local quote_modules = _g115["quote-modules"]
  local quoted = _g115.quoted
  local reserved63 = _g115["reserved?"]
  local sortk = _g115.sortk
  local special_form63 = _g115["special-form?"]
  local special63 = _g115["special?"]
  local stash42 = _g115["stash*"]
  local statement63 = _g115["statement?"]
  local symbol_expansion = _g115["symbol-expansion"]
  local symbol63 = _g115["symbol?"]
  local toplevel63 = _g115["toplevel?"]
  local valid_id63 = _g115["valid-id?"]
  local variable63 = _g115["variable?"]
  local _g118 = nexus.reader
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
  _g140.js = "==="
  _g140.lua = "=="
  local _g138 = {}
  _g138.js = "!="
  _g138.lua = "~="
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
  local function unary63(form)
    local op = form[1]
    local args = sub(form, 1)
    return(length(args) == 1 and in63(op, {"not", "-"}))
  end
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
    local _g155 = getenv(x)
    local stmt = _g155.stmt
    local special = _g155.special
    local self_tr63 = _g155.tr
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
    local _g156 = unstash({...})
    local right = _g156.right
    local _g157
    if right then
      _g157 = _6261
    else
      _g157 = _62
    end
    if _g157(precedence(child), precedence(parent)) then
      return({"(", ")"})
    else
      return({"", ""})
    end
  end
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
  local function compile_function(args, body, ...)
    local _g164 = unstash({...})
    local name = _g164.name
    local prefix = _g164.prefix
    local _g169
    if name then
      _g169 = compile(name)
    else
      _g169 = ""
    end
    local id = _g169
    local _g165 = prefix or ""
    local _g166 = compile_args(args)
    indent_level = indent_level + 1
    local _g168 = compile(body, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local _g167 = _g168
    local ind = indentation()
    local _g170
    if target == "js" then
      _g170 = ""
    else
      _g170 = "end"
    end
    local tr = _g170
    if name then
      tr = tr .. "\n"
    end
    if target == "js" then
      return("function " .. id .. _g166 .. " {\n" .. _g167 .. ind .. "}" .. tr)
    else
      return(_g165 .. "function " .. id .. _g166 .. "\n" .. _g167 .. ind .. tr)
    end
  end
  local function can_return63(form)
    return(is63(form) and (atom63(form) or not (hd(form) == "return") and not statement63(hd(form))))
  end
  compile = function (form, ...)
    local _g171 = unstash({...})
    local stmt = _g171.stmt
    if nil63(form) then
      return("")
    else
      if special_form63(form) then
        return(compile_special(form, stmt))
      else
        local tr = terminator(stmt)
        local _g173
        if stmt then
          _g173 = indentation()
        else
          _g173 = ""
        end
        local ind = _g173
        local _g174
        if atom63(form) then
          _g174 = compile_atom(form)
        else
          local _g175
          if infix63(hd(form)) then
            _g175 = compile_infix(form)
          else
            _g175 = compile_call(form)
          end
          _g174 = _g175
        end
        local _g172 = _g174
        return(ind .. _g172 .. tr)
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
    local _g176 = sub(args, 0, length(args) - 1)
    local _g177 = 0
    while _g177 < length(_g176) do
      local x = _g176[_g177 + 1]
      add(hoist, lower(x, hoist, stmt63))
      _g177 = _g177 + 1
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
    local _g178 = args[2]
    local _g179 = args[3]
    if stmt63 or tail63 then
      local _g181
      if _g179 then
        _g181 = {lower_body({_g179}, tail63)}
      end
      return(add(hoist, join({"%if", lower(cond, hoist), lower_body({_g178}, tail63)}, _g181)))
    else
      local e = make_id()
      add(hoist, {"%local", e})
      local _g180
      if _g179 then
        _g180 = {lower({"set", e, _g179})}
      end
      add(hoist, join({"%if", lower(cond, hoist), lower({"set", e, _g178})}, _g180))
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
      local _g182
      if x == "and" then
        _g182 = {"%if", id, b, id}
      else
        _g182 = {"%if", id, id, b}
      end
      return(lower({"do", {"%local", id, a}, _g182}, hoist))
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
    local _g183 = args[2]
    local body = sub(args, 2)
    return(add(hoist, {kind, name, _g183, lower_body(body, true)}))
  end
  local function lower_call(form, hoist)
    local _g184 = map(function (x)
      return(lower(x, hoist))
    end, form)
    if some63(_g184) then
      return(_g184)
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
    local _g185 = map(process, body)
    local epilog = map(process, exported())
    return({{"%function", {}, join({"do"}, join(_g185, epilog))}})
  end
  local function compile_file(file)
    local str = read_file(file)
    local body = read_all(make_stream(str))
    local form = encapsulate(body)
    return(compile(form) .. ";\n")
  end
  _37result = nil
  local function run(x)
    local f = load(compile("%result") .. "=" .. x)
    if f then
      f()
      return(_37result)
    else
      local f,e = load(x)
      if f then
        return(f())
      else
        error(e .. " in " .. x)
      end
    end
  end
  local compiling63 = false
  local compiler_output = ""
  local function _37compile_module(spec)
    local path = module_path(spec)
    local mod0 = current_module
    local env0 = environment
    current_module = spec
    environment = initial_environment()
    local compiled = compile_file(path)
    current_module = mod0
    environment = env0
    if compiling63 then
      compiler_output = compiler_output .. compiled
    else
      return(run(compiled))
    end
  end
  local function open_module(spec, ...)
    local _g186 = unstash({...})
    local all = _g186.all
    local m = module(spec)
    local frame = last(environment)
    local _g187 = m.export
    local k = nil
    for k in next, _g187 do
      if not number63(k) then
        local v = _g187[k]
        if v.export or all then
          frame[k] = v
        end
      end
    end
  end
  local function load_module(spec, ...)
    local _g188 = unstash({...})
    local all = _g188.all
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
  local function prologue()
    local m = module(current_module)
    return(join(imported(current_module, {_stash = true, all = true}), map(function (x)
      return(splice(imported(x)))
    end, m.import)))
  end
  local function eval(form)
    local previous = target
    target = "lua"
    local _g189 = {join({"%function", {}}, join(prologue(), {form}))}
    local compiled = compile(process(_g189))
    target = previous
    return(run(compiled))
  end
  local _g190 = {}
  nexus.compiler = _g190
  _g190["%compile-module"] = _37compile_module
  _g190["can-return?"] = can_return63
  _g190.compile = compile
  _g190["compile-args"] = compile_args
  _g190["compile-atom"] = compile_atom
  _g190["compile-call"] = compile_call
  _g190["compile-file"] = compile_file
  _g190["compile-function"] = compile_function
  _g190["compile-infix"] = compile_infix
  _g190["compile-module"] = compile_module
  _g190["compile-special"] = compile_special
  _g190["compiler-output"] = compiler_output
  _g190["compiling?"] = compiling63
  _g190.encapsulate = encapsulate
  _g190.eval = eval
  _g190.getop = getop
  _g190["in-module"] = in_module
  _g190.infix = infix
  _g190["infix?"] = infix63
  _g190["load-module"] = load_module
  _g190.lower = lower
  _g190["lower-body"] = lower_body
  _g190["lower-call"] = lower_call
  _g190["lower-definition"] = lower_definition
  _g190["lower-do"] = lower_do
  _g190["lower-for"] = lower_for
  _g190["lower-function"] = lower_function
  _g190["lower-if"] = lower_if
  _g190["lower-infix"] = lower_infix
  _g190["lower-infix?"] = lower_infix63
  _g190["lower-short"] = lower_short
  _g190["lower-special"] = lower_special
  _g190["lower-statement"] = lower_statement
  _g190["lower-try"] = lower_try
  _g190["lower-while"] = lower_while
  _g190["module-path"] = module_path
  _g190["op-delims"] = op_delims
  _g190["open-module"] = open_module
  _g190["parenthesize-call?"] = parenthesize_call63
  _g190.precedence = precedence
  _g190.process = process
  _g190.prologue = prologue
  _g190.run = run
  _g190.terminator = terminator
  _g190["unary?"] = unary63
end)();
(function ()
  local _g191 = nexus.runtime
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
  local number = _g191.number
  local number63 = _g191["number?"]
  local pairwise = _g191.pairwise
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
  local splice = _g191.splice
  local split = _g191.split
  local sqrt = _g191.sqrt
  local stash = _g191.stash
  local string = _g191.string
  local string_literal63 = _g191["string-literal?"]
  local string63 = _g191["string?"]
  local sub = _g191.sub
  local sublist = _g191.sublist
  local substring = _g191.substring
  local table63 = _g191["table?"]
  local tan = _g191.tan
  local tanh = _g191.tanh
  local td = _g191.td
  local tl = _g191.tl
  local toplevel63 = _g191["toplevel?"]
  local unstash = _g191.unstash
  local write = _g191.write
  local write_file = _g191["write-file"]
  local _g192 = nexus.utilities
  local bind = _g192.bind
  local bind42 = _g192["bind*"]
  local bound63 = _g192["bound?"]
  local exported = _g192.exported
  local getenv = _g192.getenv
  local id = _g192.id
  local imported = _g192.imported
  local indentation = _g192.indentation
  local initial_environment = _g192["initial-environment"]
  local macro_function = _g192["macro-function"]
  local macro63 = _g192["macro?"]
  local macroexpand = _g192.macroexpand
  local mapo = _g192.mapo
  local quasiexpand = _g192.quasiexpand
  local quote_environment = _g192["quote-environment"]
  local quote_modules = _g192["quote-modules"]
  local quoted = _g192.quoted
  local reserved63 = _g192["reserved?"]
  local sortk = _g192.sortk
  local special_form63 = _g192["special-form?"]
  local special63 = _g192["special?"]
  local stash42 = _g192["stash*"]
  local statement63 = _g192["statement?"]
  local symbol_expansion = _g192["symbol-expansion"]
  local symbol63 = _g192["symbol?"]
  local toplevel63 = _g192["toplevel?"]
  local valid_id63 = _g192["valid-id?"]
  local variable63 = _g192["variable?"]
  local _g195 = nexus.compiler
  local compile = _g195.compile
  local compile_function = _g195["compile-function"]
  local compile_module = _g195["compile-module"]
  local eval = _g195.eval
  local in_module = _g195["in-module"]
  local load_module = _g195["load-module"]
  local open_module = _g195["open-module"]
end)();
(function ()
  local _g352 = nexus.runtime
  local _37 = _g352["%"]
  local _37message_handler = _g352["%message-handler"]
  local _42 = _g352["*"]
  local _43 = _g352["+"]
  local _ = _g352["-"]
  local _47 = _g352["/"]
  local _60 = _g352["<"]
  local _6061 = _g352["<="]
  local _61 = _g352["="]
  local _62 = _g352[">"]
  local _6261 = _g352[">="]
  local abs = _g352.abs
  local acos = _g352.acos
  local add = _g352.add
  local apply = _g352.apply
  local asin = _g352.asin
  local atan = _g352.atan
  local atan2 = _g352.atan2
  local atom63 = _g352["atom?"]
  local boolean63 = _g352["boolean?"]
  local cat = _g352.cat
  local ceil = _g352.ceil
  local char = _g352.char
  local code = _g352.code
  local composite63 = _g352["composite?"]
  local cos = _g352.cos
  local drop = _g352.drop
  local empty63 = _g352["empty?"]
  local exclude = _g352.exclude
  local exit = _g352.exit
  local extend = _g352.extend
  local find = _g352.find
  local flat = _g352.flat
  local flat1 = _g352.flat1
  local floor = _g352.floor
  local function63 = _g352["function?"]
  local hd = _g352.hd
  local id_literal63 = _g352["id-literal?"]
  local in63 = _g352["in?"]
  local inner = _g352.inner
  local is63 = _g352["is?"]
  local iterate = _g352.iterate
  local join = _g352.join
  local keep = _g352.keep
  local keys63 = _g352["keys?"]
  local last = _g352.last
  local length = _g352.length
  local list63 = _g352["list?"]
  local log = _g352.log
  local log10 = _g352.log10
  local make_id = _g352["make-id"]
  local map = _g352.map
  local max = _g352.max
  local min = _g352.min
  local module = _g352.module
  local module_key = _g352["module-key"]
  local nil63 = _g352["nil?"]
  local none63 = _g352["none?"]
  local number = _g352.number
  local number63 = _g352["number?"]
  local pairwise = _g352.pairwise
  local pow = _g352.pow
  local random = _g352.random
  local read_file = _g352["read-file"]
  local reduce = _g352.reduce
  local replicate = _g352.replicate
  local reverse = _g352.reverse
  local sd = _g352.sd
  local search = _g352.search
  local setenv = _g352.setenv
  local sin = _g352.sin
  local sinh = _g352.sinh
  local some63 = _g352["some?"]
  local sort = _g352.sort
  local splice = _g352.splice
  local split = _g352.split
  local sqrt = _g352.sqrt
  local stash = _g352.stash
  local string = _g352.string
  local string_literal63 = _g352["string-literal?"]
  local string63 = _g352["string?"]
  local sub = _g352.sub
  local sublist = _g352.sublist
  local substring = _g352.substring
  local table63 = _g352["table?"]
  local tan = _g352.tan
  local tanh = _g352.tanh
  local td = _g352.td
  local tl = _g352.tl
  local toplevel63 = _g352["toplevel?"]
  local unstash = _g352.unstash
  local write = _g352.write
  local write_file = _g352["write-file"]
  local _g353 = nexus.utilities
  local bind = _g353.bind
  local bind42 = _g353["bind*"]
  local bound63 = _g353["bound?"]
  local exported = _g353.exported
  local getenv = _g353.getenv
  local id = _g353.id
  local imported = _g353.imported
  local indentation = _g353.indentation
  local initial_environment = _g353["initial-environment"]
  local macro_function = _g353["macro-function"]
  local macro63 = _g353["macro?"]
  local macroexpand = _g353.macroexpand
  local mapo = _g353.mapo
  local quasiexpand = _g353.quasiexpand
  local quote_environment = _g353["quote-environment"]
  local quote_modules = _g353["quote-modules"]
  local quoted = _g353.quoted
  local reserved63 = _g353["reserved?"]
  local sortk = _g353.sortk
  local special_form63 = _g353["special-form?"]
  local special63 = _g353["special?"]
  local stash42 = _g353["stash*"]
  local statement63 = _g353["statement?"]
  local symbol_expansion = _g353["symbol-expansion"]
  local symbol63 = _g353["symbol?"]
  local toplevel63 = _g353["toplevel?"]
  local valid_id63 = _g353["valid-id?"]
  local variable63 = _g353["variable?"]
  local _g356 = nexus.compiler
  local compile = _g356.compile
  local compile_function = _g356["compile-function"]
  local compile_module = _g356["compile-module"]
  local eval = _g356.eval
  local in_module = _g356["in-module"]
  local load_module = _g356["load-module"]
  local open_module = _g356["open-module"]
  target = "lua"
end)();
(function ()
  local _g622 = nexus.runtime
  local _37 = _g622["%"]
  local _37message_handler = _g622["%message-handler"]
  local _42 = _g622["*"]
  local _43 = _g622["+"]
  local _ = _g622["-"]
  local _47 = _g622["/"]
  local _60 = _g622["<"]
  local _6061 = _g622["<="]
  local _61 = _g622["="]
  local _62 = _g622[">"]
  local _6261 = _g622[">="]
  local abs = _g622.abs
  local acos = _g622.acos
  local add = _g622.add
  local apply = _g622.apply
  local asin = _g622.asin
  local atan = _g622.atan
  local atan2 = _g622.atan2
  local atom63 = _g622["atom?"]
  local boolean63 = _g622["boolean?"]
  local cat = _g622.cat
  local ceil = _g622.ceil
  local char = _g622.char
  local code = _g622.code
  local composite63 = _g622["composite?"]
  local cos = _g622.cos
  local drop = _g622.drop
  local empty63 = _g622["empty?"]
  local exclude = _g622.exclude
  local exit = _g622.exit
  local extend = _g622.extend
  local find = _g622.find
  local flat = _g622.flat
  local flat1 = _g622.flat1
  local floor = _g622.floor
  local function63 = _g622["function?"]
  local hd = _g622.hd
  local id_literal63 = _g622["id-literal?"]
  local in63 = _g622["in?"]
  local inner = _g622.inner
  local is63 = _g622["is?"]
  local iterate = _g622.iterate
  local join = _g622.join
  local keep = _g622.keep
  local keys63 = _g622["keys?"]
  local last = _g622.last
  local length = _g622.length
  local list63 = _g622["list?"]
  local log = _g622.log
  local log10 = _g622.log10
  local make_id = _g622["make-id"]
  local map = _g622.map
  local max = _g622.max
  local min = _g622.min
  local module = _g622.module
  local module_key = _g622["module-key"]
  local nil63 = _g622["nil?"]
  local none63 = _g622["none?"]
  local number = _g622.number
  local number63 = _g622["number?"]
  local pairwise = _g622.pairwise
  local pow = _g622.pow
  local random = _g622.random
  local read_file = _g622["read-file"]
  local reduce = _g622.reduce
  local replicate = _g622.replicate
  local reverse = _g622.reverse
  local sd = _g622.sd
  local search = _g622.search
  local setenv = _g622.setenv
  local sin = _g622.sin
  local sinh = _g622.sinh
  local some63 = _g622["some?"]
  local sort = _g622.sort
  local splice = _g622.splice
  local split = _g622.split
  local sqrt = _g622.sqrt
  local stash = _g622.stash
  local string = _g622.string
  local string_literal63 = _g622["string-literal?"]
  local string63 = _g622["string?"]
  local sub = _g622.sub
  local sublist = _g622.sublist
  local substring = _g622.substring
  local table63 = _g622["table?"]
  local tan = _g622.tan
  local tanh = _g622.tanh
  local td = _g622.td
  local tl = _g622.tl
  local toplevel63 = _g622["toplevel?"]
  local unstash = _g622.unstash
  local write = _g622.write
  local write_file = _g622["write-file"]
  local _g623 = nexus.utilities
  local bind = _g623.bind
  local bind42 = _g623["bind*"]
  local bound63 = _g623["bound?"]
  local exported = _g623.exported
  local getenv = _g623.getenv
  local id = _g623.id
  local imported = _g623.imported
  local indentation = _g623.indentation
  local initial_environment = _g623["initial-environment"]
  local macro_function = _g623["macro-function"]
  local macro63 = _g623["macro?"]
  local macroexpand = _g623.macroexpand
  local mapo = _g623.mapo
  local quasiexpand = _g623.quasiexpand
  local quote_environment = _g623["quote-environment"]
  local quote_modules = _g623["quote-modules"]
  local quoted = _g623.quoted
  local reserved63 = _g623["reserved?"]
  local sortk = _g623.sortk
  local special_form63 = _g623["special-form?"]
  local special63 = _g623["special?"]
  local stash42 = _g623["stash*"]
  local statement63 = _g623["statement?"]
  local symbol_expansion = _g623["symbol-expansion"]
  local symbol63 = _g623["symbol?"]
  local toplevel63 = _g623["toplevel?"]
  local valid_id63 = _g623["valid-id?"]
  local variable63 = _g623["variable?"]
  local _g626 = nexus.compiler
  local compile = _g626.compile
  local compile_function = _g626["compile-function"]
  local compile_module = _g626["compile-module"]
  local eval = _g626.eval
  local in_module = _g626["in-module"]
  local load_module = _g626["load-module"]
  local open_module = _g626["open-module"]
  modules = {boot = {export = {["%initial-environment"] = {macro = function ()
    return(quote_environment(initial_environment()))
  end}, ["%initial-modules"] = {macro = function ()
    return(quote_modules())
  end}, modules = {export = true, global = true}}, import = {"runtime", "utilities", "special", "core", "compiler"}}, compiler = {export = {["%compile-module"] = {variable = true}, ["%result"] = {export = true, global = true}, ["can-return?"] = {variable = true}, compile = {export = true, variable = true}, ["compile-args"] = {variable = true}, ["compile-atom"] = {variable = true}, ["compile-call"] = {variable = true}, ["compile-file"] = {variable = true}, ["compile-function"] = {export = true, variable = true}, ["compile-infix"] = {variable = true}, ["compile-module"] = {export = true, variable = true}, ["compile-special"] = {variable = true}, ["compiler-output"] = {variable = true}, ["compiling?"] = {variable = true}, ["current-module"] = {export = true, global = true}, encapsulate = {variable = true}, eval = {export = true, variable = true}, getop = {variable = true}, ["in-module"] = {export = true, variable = true}, infix = {variable = true}, ["infix?"] = {variable = true}, ["load-module"] = {export = true, variable = true}, lower = {variable = true}, ["lower-body"] = {variable = true}, ["lower-call"] = {variable = true}, ["lower-definition"] = {variable = true}, ["lower-do"] = {variable = true}, ["lower-for"] = {variable = true}, ["lower-function"] = {variable = true}, ["lower-if"] = {variable = true}, ["lower-infix"] = {variable = true}, ["lower-infix?"] = {variable = true}, ["lower-short"] = {variable = true}, ["lower-special"] = {variable = true}, ["lower-statement"] = {variable = true}, ["lower-try"] = {variable = true}, ["lower-while"] = {variable = true}, ["module-path"] = {variable = true}, ["op-delims"] = {variable = true}, ["open-module"] = {export = true, variable = true}, ["parenthesize-call?"] = {variable = true}, precedence = {variable = true}, process = {variable = true}, prologue = {variable = true}, run = {variable = true}, terminator = {variable = true}, ["unary?"] = {variable = true}}, import = {"runtime", "utilities", "special", "core", "reader"}}, core = {export = {at = {export = true, macro = function (l, i)
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
    local _g697 = sub(bs, 0)
    return({"set", a, join({"cat", a}, _g697)})
  end}, dec = {export = true, macro = function (n, by)
    return({"set", n, {"-", n, by or 1}})
  end}, define = {export = true, macro = function (name, x, ...)
    local body = unstash({...})
    local _g682 = sub(body, 0)
    setenv(name, {_stash = true, variable = true})
    if some63(_g682) then
      local _g683 = bind42(x, _g682)
      local args = _g683[1]
      local _g684 = _g683[2]
      return(join({"%local-function", name, args}, _g684))
    else
      return({"%local", name, x})
    end
  end}, ["define*"] = {export = true, macro = function (name, x, ...)
    local body = unstash({...})
    local _g705 = sub(body, 0)
    setenv(name, {_stash = true, export = true, global = true})
    if some63(_g705) then
      local _g706 = bind42(x, _g705)
      local args = _g706[1]
      local _g707 = _g706[2]
      return(join({"%global-function", name, args}, _g707))
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
    local _g670 = sub(body, 0)
    local imports = {}
    local exp = _g670.export
    local imp = _g670.import
    local _g671 = imp or {}
    local _g672 = 0
    while _g672 < length(_g671) do
      local k = _g671[_g672 + 1]
      load_module(k)
      imports = join(imports, imported(k))
      _g672 = _g672 + 1
    end
    modules[module_key(spec)] = {export = {}, import = imp}
    local _g673 = exp or {}
    local _g674 = 0
    while _g674 < length(_g673) do
      local k = _g673[_g674 + 1]
      setenv(k, {_stash = true, export = true})
      _g674 = _g674 + 1
    end
    return(join({"do"}, imports))
  end}, ["define-special"] = {export = true, macro = function (name, args, ...)
    local body = unstash({...})
    local _g668 = sub(body, 0)
    local form = join({"fn", args}, _g668)
    local keys = sub(_g668, length(_g668))
    local _g669 = {"setenv", {"quote", name}}
    _g669.form = {"quote", form}
    _g669.special = form
    eval(join(_g669, keys))
    return(nil)
  end}, ["define-symbol"] = {export = true, macro = function (name, expansion)
    setenv(name, {_stash = true, symbol = expansion})
    return(nil)
  end}, each = {export = true, macro = function (b, t, ...)
    local body = unstash({...})
    local _g698 = sub(body, 0)
    local k = b[1]
    local v = b[2]
    local t1 = make_id()
    local _g723
    if nil63(v) then
      local _g724
      if b.i then
        _g724 = "i"
      else
        _g724 = make_id()
      end
      local i = _g724
      _g723 = {"let", {i, 0}, {"while", {"<", i, {"length", t1}}, join({"let", {k, {"at", t1, i}}}, _g698), {"inc", i}}}
    else
      local _g699 = {"target"}
      _g699.js = {"isNaN", {"parseInt", k}}
      _g699.lua = {"not", {"number?", k}}
      _g723 = {"let", {k, "nil"}, {"%for", t1, k, {"when", _g699, join({"let", {v, {"get", t1, k}}}, _g698)}}}
    end
    return({"let", {t1, t}, _g723})
  end}, fn = {export = true, macro = function (args, ...)
    local body = unstash({...})
    local _g691 = sub(body, 0)
    local _g692 = bind42(args, _g691)
    local _g693 = _g692[1]
    local _g694 = _g692[2]
    return(join({"%function", _g693}, _g694))
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
    local function step(_g690)
      local a = _g690[1]
      local b = _g690[2]
      local c = sub(_g690, 2)
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
    local _g665 = sub(bs, 0)
    return({"set", a, join({"join*", a}, _g665)})
  end}, ["join*"] = {export = true, macro = function (...)
    local xs = unstash({...})
    return(reduce(function (a, b)
      return({"join", a, b})
    end, xs))
  end}, language = {export = true, macro = function ()
    return({"quote", target})
  end}, let = {export = true, macro = function (bindings, ...)
    local body = unstash({...})
    local _g685 = sub(body, 0)
    local i = 0
    local renames = {}
    local locals = {}
    map(function (_g686)
      local lh = _g686[1]
      local rh = _g686[2]
      local _g687 = bind(lh, rh)
      local _g688 = 0
      while _g688 < length(_g687) do
        local _g689 = _g687[_g688 + 1]
        local id = _g689[1]
        local val = _g689[2]
        if bound63(id) or reserved63(id) or toplevel63() then
          local rename = make_id()
          add(renames, id)
          add(renames, rename)
          id = rename
        else
          setenv(id, {_stash = true, variable = true})
        end
        add(locals, {"%local", id, val})
        _g688 = _g688 + 1
      end
    end, pairwise(bindings))
    return(join({"do"}, join(locals, {join({"let-symbol", renames}, _g685)})))
  end}, ["let-macro"] = {export = true, macro = function (definitions, ...)
    local body = unstash({...})
    local _g678 = sub(body, 0)
    add(environment, {})
    map(function (m)
      return(macroexpand(join({"define-macro"}, m)))
    end, definitions)
    local _g679 = join({"do"}, macroexpand(_g678))
    drop(environment)
    return(_g679)
  end}, ["let-symbol"] = {export = true, macro = function (expansions, ...)
    local body = unstash({...})
    local _g675 = sub(body, 0)
    add(environment, {})
    map(function (_g677)
      local name = _g677[1]
      local exp = _g677[2]
      return(macroexpand({"define-symbol", name, exp}))
    end, pairwise(expansions))
    local _g676 = join({"do"}, macroexpand(_g675))
    drop(environment)
    return(_g676)
  end}, list = {export = true, macro = function (...)
    local body = unstash({...})
    local l = join({"%array"}, body)
    if not keys63(body) then
      return(l)
    else
      local id = make_id()
      local init = {}
      local _g696 = body
      local k = nil
      for k in next, _g696 do
        if not number63(k) then
          local v = _g696[k]
          add(init, {k, {"set", {"get", id, {"quote", k}}, v}})
        end
      end
      return(join({"let", {id, l}}, join(map(sd, sortk(init, hd)), {id})))
    end
  end}, pr = {export = true, macro = function (...)
    local xs = unstash({...})
    local _g695 = map(function (x)
      return(splice({{"string", x}, "\" \""}))
    end, xs)
    return({"print", join({"cat"}, _g695)})
  end}, quasiquote = {export = true, macro = function (form)
    return(quasiexpand(form, 1))
  end}, quote = {export = true, macro = function (form)
    return(quoted(form))
  end}, ["set-of"] = {export = true, macro = function (...)
    local elements = unstash({...})
    local l = {}
    local _g680 = elements
    local _g681 = 0
    while _g681 < length(_g680) do
      local e = _g680[_g681 + 1]
      l[e] = true
      _g681 = _g681 + 1
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
    local _g664 = sub(body, 0)
    return({"if", {"not", cond}, join({"do"}, _g664)})
  end}, when = {export = true, macro = function (cond, ...)
    local body = unstash({...})
    local _g704 = sub(body, 0)
    return({"if", cond, join({"do"}, _g704)})
  end}, ["with-bindings"] = {export = true, macro = function (_g700, ...)
    local names = _g700[1]
    local body = unstash({...})
    local _g701 = sub(body, 0)
    local x = make_id()
    local _g703 = {"setenv", x}
    _g703.variable = true
    local _g702 = {"with-frame", {"each", {x}, names, _g703}}
    _g702.scope = true
    return(join(_g702, _g701))
  end}, ["with-frame"] = {export = true, macro = function (...)
    local body = unstash({...})
    local _g666 = sub(body, 0)
    local scope = body.scope
    local x = make_id()
    local _g667 = {"table"}
    _g667._scope = scope
    return({"do", {"add", "environment", _g667}, {"let", {x, join({"do"}, _g666)}, {"drop", "environment"}, x}})
  end}}, import = {"runtime", "utilities", "special", "core", "compiler"}}, lib = {export = {}, import = {"core", "special"}}, main = {export = {save = {macro = function (...)
    local specs = unstash({...})
    local _g639 = sub(specs, 0)
    map(compile_module, _g639)
    return(nil)
  end}}, import = {"runtime", "special", "core", "reader", "compiler"}}, optimizer = {export = {["define-optimization"] = {}, optimizations = {variable = true}, optimize = {export = true, variable = true}}, import = {"runtime", "special", "core"}}, reader = {export = {["define-reader"] = {export = true, macro = function (_g640, ...)
    local char = _g640[1]
    local stream = _g640[2]
    local body = unstash({...})
    local _g641 = sub(body, 0)
    return({"set", {"get", "read-table", char}, join({"fn", {stream}}, _g641)})
  end}, delimiters = {variable = true}, eof = {variable = true}, ["flag?"] = {variable = true}, ["key?"] = {variable = true}, ["make-stream"] = {export = true, variable = true}, ["peek-char"] = {variable = true}, read = {export = true, variable = true}, ["read-all"] = {export = true, variable = true}, ["read-char"] = {variable = true}, ["read-from-string"] = {export = true, variable = true}, ["read-table"] = {export = true, variable = true}, ["skip-non-code"] = {variable = true}, whitespace = {variable = true}}, import = {"runtime", "special", "core"}}, runtime = {export = {["%"] = {export = true, variable = true}, ["%message-handler"] = {export = true, variable = true}, ["*"] = {export = true, variable = true}, ["+"] = {export = true, variable = true}, ["-"] = {export = true, variable = true}, ["/"] = {export = true, variable = true}, ["<"] = {export = true, variable = true}, ["<="] = {export = true, variable = true}, ["="] = {export = true, variable = true}, [">"] = {export = true, variable = true}, [">="] = {export = true, variable = true}, abs = {export = true, variable = true}, acos = {export = true, variable = true}, add = {export = true, variable = true}, apply = {export = true, variable = true}, asin = {export = true, variable = true}, atan = {export = true, variable = true}, atan2 = {export = true, variable = true}, ["atom?"] = {export = true, variable = true}, ["boolean?"] = {export = true, variable = true}, cat = {export = true, variable = true}, ceil = {export = true, variable = true}, char = {export = true, variable = true}, code = {export = true, variable = true}, ["composite?"] = {export = true, variable = true}, cos = {export = true, variable = true}, drop = {export = true, variable = true}, ["empty?"] = {export = true, variable = true}, exclude = {export = true, variable = true}, exit = {export = true, variable = true}, extend = {export = true, variable = true}, find = {export = true, variable = true}, flat = {export = true, variable = true}, flat1 = {export = true, variable = true}, floor = {export = true, variable = true}, ["function?"] = {export = true, variable = true}, hd = {export = true, variable = true}, ["id-count"] = {variable = true}, ["id-literal?"] = {export = true, variable = true}, ["in?"] = {export = true, variable = true}, inner = {export = true, variable = true}, ["is?"] = {export = true, variable = true}, iterate = {export = true, variable = true}, join = {export = true, variable = true}, keep = {export = true, variable = true}, ["keys?"] = {export = true, variable = true}, last = {export = true, variable = true}, length = {export = true, variable = true}, ["list?"] = {export = true, variable = true}, log = {export = true, variable = true}, log10 = {export = true, variable = true}, ["make-id"] = {export = true, variable = true}, map = {export = true, variable = true}, mapl = {variable = true}, math = {variable = true}, max = {export = true, variable = true}, min = {export = true, variable = true}, module = {export = true, variable = true}, ["module-key"] = {export = true, variable = true}, ["nil?"] = {export = true, variable = true}, ["none?"] = {export = true, variable = true}, number = {export = true, variable = true}, ["number?"] = {export = true, variable = true}, pairwise = {export = true, variable = true}, pow = {export = true, variable = true}, random = {export = true, variable = true}, ["read-file"] = {export = true, variable = true}, reduce = {export = true, variable = true}, replicate = {export = true, variable = true}, reverse = {export = true, variable = true}, sd = {export = true, variable = true}, search = {export = true, variable = true}, setenv = {export = true, variable = true}, sin = {export = true, variable = true}, sinh = {export = true, variable = true}, ["some?"] = {export = true, variable = true}, sort = {export = true, variable = true}, splice = {export = true, variable = true}, ["splice?"] = {variable = true}, split = {export = true, variable = true}, sqrt = {export = true, variable = true}, stash = {export = true, variable = true}, string = {export = true, variable = true}, ["string-literal?"] = {export = true, variable = true}, ["string?"] = {export = true, variable = true}, sub = {export = true, variable = true}, sublist = {export = true, variable = true}, substring = {export = true, variable = true}, ["table?"] = {export = true, variable = true}, tan = {export = true, variable = true}, tanh = {export = true, variable = true}, td = {export = true, variable = true}, tl = {export = true, variable = true}, ["toplevel?"] = {export = true, variable = true}, unstash = {export = true, variable = true}, write = {export = true, variable = true}, ["write-file"] = {export = true, variable = true}}, import = {"special", "core"}}, special = {export = {["%array"] = {export = true, foo = true, special = function (...)
    local forms = unstash({...})
    local _g719
    if target == "lua" then
      _g719 = "{"
    else
      _g719 = "["
    end
    local open = _g719
    local _g720
    if target == "lua" then
      _g720 = "}"
    else
      _g720 = "]"
    end
    local close = _g720
    local str = ""
    local _g658 = forms
    local i = 0
    while i < length(_g658) do
      local x = _g658[i + 1]
      str = str .. compile(x)
      if i < length(forms) - 1 then
        str = str .. ", "
      end
      i = i + 1
    end
    return(open .. str .. close)
  end}, ["%for"] = {export = true, foo = true, special = function (t, k, form)
    local _g643 = compile(t)
    local ind = indentation()
    indent_level = indent_level + 1
    local _g644 = compile(form, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local body = _g644
    if target == "lua" then
      return(ind .. "for " .. k .. " in next, " .. _g643 .. " do\n" .. body .. ind .. "end\n")
    else
      return(ind .. "for (" .. k .. " in " .. _g643 .. ") {\n" .. body .. ind .. "}\n")
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
    local _g653 = compile(cond)
    indent_level = indent_level + 1
    local _g656 = compile(cons, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local _g654 = _g656
    local _g718
    if alt then
      indent_level = indent_level + 1
      local _g657 = compile(alt, {_stash = true, stmt = true})
      indent_level = indent_level - 1
      _g718 = _g657
    end
    local _g655 = _g718
    local ind = indentation()
    local str = ""
    if target == "js" then
      str = str .. ind .. "if (" .. _g653 .. ") {\n" .. _g654 .. ind .. "}"
    else
      str = str .. ind .. "if " .. _g653 .. " then\n" .. _g654
    end
    if _g655 and target == "js" then
      str = str .. " else {\n" .. _g655 .. ind .. "}"
    else
      if _g655 then
        str = str .. ind .. "else\n" .. _g655
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
    local _g721
    if is63(value) then
      _g721 = " = " .. value1
    else
      _g721 = ""
    end
    local rh = _g721
    local _g722
    if target == "js" then
      _g722 = "var "
    else
      _g722 = "local "
    end
    local keyword = _g722
    local ind = indentation()
    return(ind .. keyword .. id .. rh)
  end, stmt = true}, ["%local-function"] = {export = true, foo = true, special = function (name, args, body)
    local x = compile_function(args, body, {_stash = true, name = name, prefix = "local "})
    return(indentation() .. x)
  end, stmt = true, tr = true}, ["%object"] = {export = true, foo = true, special = function (...)
    local forms = unstash({...})
    local str = "{"
    local _g712
    if target == "lua" then
      _g712 = " = "
    else
      _g712 = ": "
    end
    local sep = _g712
    local pairs = sortk(pairwise(forms), hd)
    local _g647 = pairs
    local i = 0
    while i < length(_g647) do
      local _g648 = _g647[i + 1]
      local k = _g648[1]
      local v = _g648[2]
      if not string63(k) then
        error("Illegal key: " .. string(k))
      end
      local _g649 = compile(v)
      local _g713
      if valid_id63(k) then
        _g713 = k
      else
        local _g714
        if target == "js" and string_literal63(k) then
          _g714 = k
        else
          local _g715
          if target == "js" then
            _g715 = quoted(k)
          else
            local _g716
            if string_literal63(k) then
              _g716 = "[" .. k .. "]"
            else
              _g716 = "[" .. quoted(k) .. "]"
            end
            _g715 = _g716
          end
          _g714 = _g715
        end
        _g713 = _g714
      end
      local _g650 = _g713
      str = str .. _g650 .. sep .. _g649
      if i < length(pairs) - 1 then
        str = str .. ", "
      end
      i = i + 1
    end
    return(str .. "}")
  end}, ["%try"] = {export = true, foo = true, special = function (form)
    local ind = indentation()
    indent_level = indent_level + 1
    local _g645 = compile(form, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local body = _g645
    local e = make_id()
    local hf = {"return", {"%array", false, {"get", e, "\"message\""}}}
    indent_level = indent_level + 1
    local _g646 = compile(hf, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local h = _g646
    return(ind .. "try {\n" .. body .. ind .. "}\n" .. ind .. "catch (" .. e .. ") {\n" .. h .. ind .. "}\n")
  end, stmt = true, tr = true}, ["break"] = {export = true, foo = true, special = function ()
    return(indentation() .. "break")
  end, stmt = true}, ["do"] = {export = true, foo = true, special = function (...)
    local forms = unstash({...})
    local str = ""
    local _g659 = forms
    local _g660 = 0
    while _g660 < length(_g659) do
      local x = _g659[_g660 + 1]
      str = str .. compile(x, {_stash = true, stmt = true})
      _g660 = _g660 + 1
    end
    return(str)
  end, stmt = true, tr = true}, ["error"] = {export = true, foo = true, special = function (x)
    local _g711
    if target == "js" then
      _g711 = "throw new " .. compile({"Error", x})
    else
      _g711 = "error(" .. compile(x) .. ")"
    end
    local e = _g711
    return(indentation() .. e)
  end, stmt = true}, ["get"] = {export = true, foo = true, special = function (t, k)
    local _g663 = compile(t)
    local k1 = compile(k)
    if target == "lua" and char(_g663, 0) == "{" then
      _g663 = "(" .. _g663 .. ")"
    end
    if string_literal63(k) and valid_id63(inner(k)) then
      return(_g663 .. "." .. inner(k))
    else
      return(_g663 .. "[" .. k1 .. "]")
    end
  end}, ["not"] = {}, ["return"] = {export = true, foo = true, special = function (x)
    local _g710
    if nil63(x) then
      _g710 = "return"
    else
      _g710 = "return(" .. compile(x) .. ")"
    end
    local _g642 = _g710
    return(indentation() .. _g642)
  end, stmt = true}, ["set"] = {export = true, foo = true, special = function (lh, rh)
    local _g651 = compile(lh)
    local _g717
    if nil63(rh) then
      _g717 = "nil"
    else
      _g717 = rh
    end
    local _g652 = compile(_g717)
    return(indentation() .. _g651 .. " = " .. _g652)
  end, stmt = true}, ["while"] = {export = true, foo = true, special = function (cond, form)
    local _g661 = compile(cond)
    indent_level = indent_level + 1
    local _g662 = compile(form, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local body = _g662
    local ind = indentation()
    if target == "js" then
      return(ind .. "while (" .. _g661 .. ") {\n" .. body .. ind .. "}\n")
    else
      return(ind .. "while " .. _g661 .. " do\n" .. body .. ind .. "end\n")
    end
  end, stmt = true, tr = true}}, import = {"runtime", "utilities", "special", "core", "compiler"}}, system = {export = {nexus = {export = true, global = true}}, import = {"special", "core"}}, utilities = {export = {bind = {export = true, variable = true}, ["bind*"] = {export = true, variable = true}, ["bound?"] = {export = true, variable = true}, ["can-unquote?"] = {variable = true}, escape = {variable = true}, exported = {export = true, variable = true}, getenv = {export = true, variable = true}, ["global?"] = {variable = true}, id = {export = true, variable = true}, imported = {export = true, variable = true}, ["indent-level"] = {export = true, global = true}, indentation = {export = true, variable = true}, ["initial-environment"] = {export = true, variable = true}, ["macro-function"] = {export = true, variable = true}, ["macro?"] = {export = true, variable = true}, macroexpand = {export = true, variable = true}, mapo = {export = true, variable = true}, ["numeric?"] = {variable = true}, quasiexpand = {export = true, variable = true}, ["quasiquote-list"] = {variable = true}, ["quasiquoting?"] = {variable = true}, ["quasisplice?"] = {variable = true}, ["quote-binding"] = {variable = true}, ["quote-environment"] = {export = true, variable = true}, ["quote-frame"] = {variable = true}, ["quote-module"] = {variable = true}, ["quote-modules"] = {export = true, variable = true}, quoted = {export = true, variable = true}, ["quoting?"] = {variable = true}, reserved = {variable = true}, ["reserved?"] = {export = true, variable = true}, sortk = {export = true, variable = true}, ["special-form?"] = {export = true, variable = true}, ["special?"] = {export = true, variable = true}, ["stash*"] = {export = true, variable = true}, ["statement?"] = {export = true, variable = true}, ["symbol-expansion"] = {export = true, variable = true}, ["symbol?"] = {export = true, variable = true}, ["toplevel?"] = {export = true, variable = true}, ["valid-char?"] = {variable = true}, ["valid-id?"] = {export = true, variable = true}, ["variable?"] = {export = true, variable = true}, ["with-indent"] = {export = true, macro = function (form)
    local result = make_id()
    return({"do", {"inc", "indent-level"}, {"let", {result, form}, {"dec", "indent-level"}, result}})
  end}}, import = {"runtime", "special", "core"}}}
  environment = {{["define-module"] = {export = true, macro = function (spec, ...)
    local body = unstash({...})
    local _g725 = sub(body, 0)
    local imports = {}
    local exp = _g725.export
    local imp = _g725.import
    local _g726 = imp or {}
    local _g727 = 0
    while _g727 < length(_g726) do
      local k = _g726[_g727 + 1]
      load_module(k)
      imports = join(imports, imported(k))
      _g727 = _g727 + 1
    end
    modules[module_key(spec)] = {export = {}, import = imp}
    local _g728 = exp or {}
    local _g729 = 0
    while _g729 < length(_g728) do
      local k = _g728[_g729 + 1]
      setenv(k, {_stash = true, export = true})
      _g729 = _g729 + 1
    end
    return(join({"do"}, imports))
  end}}}
end)();
(function ()
  local _g2 = nexus.runtime
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
  local number = _g2.number
  local number63 = _g2["number?"]
  local pairwise = _g2.pairwise
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
  local toplevel63 = _g2["toplevel?"]
  local unstash = _g2.unstash
  local write = _g2.write
  local write_file = _g2["write-file"]
  local _g5 = nexus.reader
  local make_stream = _g5["make-stream"]
  local read = _g5.read
  local read_all = _g5["read-all"]
  local read_from_string = _g5["read-from-string"]
  local read_table = _g5["read-table"]
  local _g6 = nexus.compiler
  local compile = _g6.compile
  local compile_function = _g6["compile-function"]
  local compile_module = _g6["compile-module"]
  local eval = _g6.eval
  local in_module = _g6["in-module"]
  local load_module = _g6["load-module"]
  local open_module = _g6["open-module"]
  local function rep(str)
    local _g732,_g733 = xpcall(function ()
      return(eval(read_from_string(str)))
    end, _37message_handler)
    local _g731 = {_g732, _g733}
    local _g1 = _g731[1]
    local x = _g731[2]
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
    local _g734 = args
    local i = 0
    while i < length(_g734) do
      local arg = _g734[i + 1]
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
      in_module(spec or "main")
      if expr then
        return(rep(expr))
      else
        return(repl())
      end
    end
  end
  main()
  local _g735 = {}
  nexus.main = _g735
  _g735.main = main
  _g735.rep = rep
  _g735.repl = repl
  _g735.usage = usage
end)();
