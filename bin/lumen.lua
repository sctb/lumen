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
    return({value = x, _splice = true})
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
  local function parse_number(str)
    return(tonumber(str))
  end
  local function to_string(x)
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
              str = str .. to_string(y)
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
      return(to_string(spec))
    else
      error("Unsupported module specification")
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
  _g56[">="] = _6261
  _g56["number?"] = number63
  _g56.exit = exit
  _g56["table?"] = table63
  _g56["module-key"] = module_key
  _g56["in?"] = in63
  _g56.add = add
  _g56["parse-number"] = parse_number
  _g56.reverse = reverse
  _g56.apply = apply
  _g56.replicate = replicate
  _g56.code = code
  _g56.splice = splice
  _g56["make-id"] = make_id
  _g56["splice?"] = splice63
  _g56.last = last
  _g56["some?"] = some63
  _g56["is?"] = is63
  _g56.map = map
  _g56["%message-handler"] = _37message_handler
  _g56["list?"] = list63
  _g56["read-file"] = read_file
  _g56.substring = substring
  _g56["toplevel?"] = toplevel63
  _g56.unstash = unstash
  _g56["keys?"] = keys63
  _g56.iterate = iterate
  _g56["empty?"] = empty63
  _g56.exclude = exclude
  _g56["-"] = _
  _g56.module = module
  _g56["/"] = _47
  _g56.extend = extend
  _g56.length = length
  _g56["none?"] = none63
  _g56["composite?"] = composite63
  _g56["atom?"] = atom63
  _g56.tl = tl
  _g56.setenv = setenv
  _g56.keep = keep
  _g56.join = join
  _g56["%"] = _37
  _g56.char = char
  _g56.hd = hd
  _g56["*"] = _42
  _g56["+"] = _43
  _g56.reduce = reduce
  _g56["id-literal?"] = id_literal63
  _g56.drop = drop
  _g56.split = split
  _g56.sublist = sublist
  _g56.find = find
  _g56["<="] = _6061
  _g56.mapl = mapl
  _g56["string?"] = string63
  _g56["id-count"] = id_count
  _g56["<"] = _60
  _g56["="] = _61
  _g56[">"] = _62
  _g56.sub = sub
  _g56.inner = inner
  _g56.pairwise = pairwise
  _g56["boolean?"] = boolean63
  _g56["to-string"] = to_string
  _g56["write-file"] = write_file
  _g56["string-literal?"] = string_literal63
  _g56["nil?"] = nil63
  _g56["function?"] = function63
  _g56.write = write
  _g56.cat = cat
  _g56.search = search
  _g56.stash = stash
end)();
(function ()
  local _g61 = nexus.runtime
  local _6261 = _g61[">="]
  local number63 = _g61["number?"]
  local exit = _g61.exit
  local table63 = _g61["table?"]
  local module_key = _g61["module-key"]
  local in63 = _g61["in?"]
  local add = _g61.add
  local parse_number = _g61["parse-number"]
  local reverse = _g61.reverse
  local apply = _g61.apply
  local replicate = _g61.replicate
  local code = _g61.code
  local splice = _g61.splice
  local make_id = _g61["make-id"]
  local last = _g61.last
  local some63 = _g61["some?"]
  local is63 = _g61["is?"]
  local map = _g61.map
  local _37message_handler = _g61["%message-handler"]
  local list63 = _g61["list?"]
  local read_file = _g61["read-file"]
  local substring = _g61.substring
  local toplevel63 = _g61["toplevel?"]
  local unstash = _g61.unstash
  local keys63 = _g61["keys?"]
  local iterate = _g61.iterate
  local empty63 = _g61["empty?"]
  local exclude = _g61.exclude
  local _ = _g61["-"]
  local module = _g61.module
  local _47 = _g61["/"]
  local extend = _g61.extend
  local length = _g61.length
  local none63 = _g61["none?"]
  local composite63 = _g61["composite?"]
  local atom63 = _g61["atom?"]
  local tl = _g61.tl
  local setenv = _g61.setenv
  local keep = _g61.keep
  local join = _g61.join
  local _37 = _g61["%"]
  local char = _g61.char
  local hd = _g61.hd
  local _42 = _g61["*"]
  local _43 = _g61["+"]
  local reduce = _g61.reduce
  local id_literal63 = _g61["id-literal?"]
  local drop = _g61.drop
  local split = _g61.split
  local sublist = _g61.sublist
  local find = _g61.find
  local _6061 = _g61["<="]
  local string63 = _g61["string?"]
  local _60 = _g61["<"]
  local _61 = _g61["="]
  local _62 = _g61[">"]
  local sub = _g61.sub
  local inner = _g61.inner
  local pairwise = _g61.pairwise
  local boolean63 = _g61["boolean?"]
  local to_string = _g61["to-string"]
  local write_file = _g61["write-file"]
  local string_literal63 = _g61["string-literal?"]
  local nil63 = _g61["nil?"]
  local function63 = _g61["function?"]
  local write = _g61.write
  local cat = _g61.cat
  local search = _g61.search
  local stash = _g61.stash
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
            local _g57 = _g66[x]
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
      local _g67
      if c == "\n" then
        _g67 = "\\n"
      else
        local _g68
        if c == "\"" then
          _g68 = "\\\""
        else
          local _g69
          if c == "\\" then
            _g69 = "\\\\"
          else
            _g69 = c
          end
          _g68 = _g69
        end
        _g67 = _g68
      end
      local c1 = _g67
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
  local function bind42(args, body)
    local args1 = {}
    local function rest()
      if target == "js" then
        return({"unstash", {"sublist", "arguments", length(args1)}})
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
            local _g59 = form[1]
            local name = form[2]
            local _g79 = form[3]
            local _g80 = sub(form, 3)
            add(environment, {_scope = true})
            local _g83 = _g79
            local _g84 = 0
            while _g84 < length(_g83) do
              local _g81 = _g83[_g84 + 1]
              setenv(_g81, {_stash = true, variable = true})
              _g84 = _g84 + 1
            end
            local _g82 = join({x, name, map(macroexpand, _g79)}, macroexpand(_g80))
            drop(environment)
            return(_g82)
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
    local _g85 = form
    local k = nil
    for k in next, _g85 do
      if not number63(k) then
        local v = _g85[k]
        local _g90
        if quasisplice63(v, depth) then
          _g90 = quasiexpand(v[2])
        else
          _g90 = quasiexpand(v, depth)
        end
        local _g86 = _g90
        last(xs)[k] = _g86
      end
    end
    local _g87 = form
    local _g88 = 0
    while _g88 < length(_g87) do
      local x = _g87[_g88 + 1]
      if quasisplice63(x, depth) then
        local _g89 = quasiexpand(x[2])
        add(xs, _g89)
        add(xs, {"list"})
      else
        add(last(xs), quasiexpand(x, depth))
      end
      _g88 = _g88 + 1
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
  local reserved = {["for"] = true, [">="] = true, ["local"] = true, ["until"] = true, ["end"] = true, ["switch"] = true, ["<="] = true, ["var"] = true, ["do"] = true, ["default"] = true, ["try"] = true, ["="] = true, ["throw"] = true, ["instanceof"] = true, ["void"] = true, ["/"] = true, ["*"] = true, ["this"] = true, ["-"] = true, ["+"] = true, ["with"] = true, ["if"] = true, ["case"] = true, ["or"] = true, ["return"] = true, ["in"] = true, ["else"] = true, ["=="] = true, ["finally"] = true, ["false"] = true, ["elseif"] = true, ["while"] = true, ["break"] = true, [">"] = true, ["function"] = true, ["<"] = true, ["then"] = true, ["true"] = true, ["delete"] = true, ["new"] = true, ["catch"] = true, ["nil"] = true, ["repeat"] = true, ["and"] = true, ["typeof"] = true, ["not"] = true, ["continue"] = true, ["debugger"] = true, ["%"] = true}
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
  local function to_id(id)
    local id1 = ""
    local i = 0
    while i < length(id) do
      local c = char(id, i)
      local n = code(c)
      local _g95
      if c == "-" then
        _g95 = "_"
      else
        local _g96
        if valid_char63(n) then
          _g96 = c
        else
          local _g97
          if i == 0 then
            _g97 = "_" .. n
          else
            _g97 = n
          end
          _g96 = _g97
        end
        _g95 = _g96
      end
      local c1 = _g95
      id1 = id1 .. c1
      i = i + 1
    end
    return(id1)
  end
  local function exported()
    local m = make_id()
    local k = module_key(current_module)
    local exports = {}
    local _g98 = module(current_module).export
    local n = nil
    for n in next, _g98 do
      if not number63(n) then
        local b = _g98[n]
        if b.variable then
          add(exports, {"set", {"get", m, {"quote", n}}, n})
        end
      end
    end
    if some63(exports) then
      return(join({{"%local", m, {"table"}}, {"set", {"get", "nexus", {"quote", k}}, m}}, exports))
    else
      return({})
    end
  end
  local function imported(spec, ...)
    local _g99 = unstash({...})
    local all = _g99.all
    local m = make_id()
    local k = module_key(spec)
    local imports = {}
    if nexus[k] then
      local _g100 = module(spec).export
      local n = nil
      for n in next, _g100 do
        if not number63(n) then
          local b = _g100[n]
          if b.variable and (all or b.export) then
            add(imports, {"%local", n, {"get", m, {"quote", n}}})
          end
        end
      end
    end
    if some63(imports) then
      return(join({{"%local", m, {"get", "nexus", {"quote", k}}}}, imports))
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
    local _g101 = t
    local k = nil
    for k in next, _g101 do
      if not number63(k) then
        local v = _g101[k]
        local x = f(k, v)
        if is63(x) then
          add(o, k)
          add(o, x)
        end
      end
    end
    return(o)
  end
  local function quote_frame(t)
    return(join({"%object"}, mapo(function (_g60, b)
      return(join({"table"}, quote_binding(b)))
    end, t)))
  end
  local function quote_environment(env)
    return(join({"list"}, map(quote_frame, env)))
  end
  local function quote_module(m)
    local _g102 = {"table"}
    _g102.import = quoted(m.import)
    _g102.export = quote_frame(m.export)
    return(_g102)
  end
  local function quote_modules()
    return(join({"table"}, map(quote_module, modules)))
  end
  local function initial_environment()
    return({{["define-module"] = getenv("define-module")}})
  end
  local _g103 = {}
  nexus.utilities = _g103
  _g103.quasiexpand = quasiexpand
  _g103["bound?"] = bound63
  _g103["special?"] = special63
  _g103.escape = escape
  _g103["variable?"] = variable63
  _g103.imported = imported
  _g103["bind*"] = bind42
  _g103["to-id"] = to_id
  _g103["quote-modules"] = quote_modules
  _g103["initial-environment"] = initial_environment
  _g103["stash*"] = stash42
  _g103["quoting?"] = quoting63
  _g103["numeric?"] = numeric63
  _g103["quote-module"] = quote_module
  _g103["quote-frame"] = quote_frame
  _g103.bind = bind
  _g103.getenv = getenv
  _g103["macro-function"] = macro_function
  _g103["quote-environment"] = quote_environment
  _g103["valid-char?"] = valid_char63
  _g103.reserved = reserved
  _g103["symbol?"] = symbol63
  _g103["valid-id?"] = valid_id63
  _g103["statement?"] = statement63
  _g103["reserved?"] = reserved63
  _g103["global?"] = global63
  _g103.indentation = indentation
  _g103.macroexpand = macroexpand
  _g103.exported = exported
  _g103["special-form?"] = special_form63
  _g103["toplevel?"] = toplevel63
  _g103["can-unquote?"] = can_unquote63
  _g103["quasiquoting?"] = quasiquoting63
  _g103["symbol-expansion"] = symbol_expansion
  _g103.mapo = mapo
  _g103["macro?"] = macro63
  _g103["quote-binding"] = quote_binding
  _g103.quoted = quoted
  _g103["quasiquote-list"] = quasiquote_list
  _g103["quasisplice?"] = quasisplice63
end)();
(function ()
  local _g104 = nexus.runtime
  local _6261 = _g104[">="]
  local number63 = _g104["number?"]
  local exit = _g104.exit
  local table63 = _g104["table?"]
  local module_key = _g104["module-key"]
  local in63 = _g104["in?"]
  local add = _g104.add
  local parse_number = _g104["parse-number"]
  local reverse = _g104.reverse
  local apply = _g104.apply
  local replicate = _g104.replicate
  local code = _g104.code
  local splice = _g104.splice
  local make_id = _g104["make-id"]
  local last = _g104.last
  local some63 = _g104["some?"]
  local is63 = _g104["is?"]
  local map = _g104.map
  local _37message_handler = _g104["%message-handler"]
  local list63 = _g104["list?"]
  local read_file = _g104["read-file"]
  local substring = _g104.substring
  local toplevel63 = _g104["toplevel?"]
  local unstash = _g104.unstash
  local keys63 = _g104["keys?"]
  local iterate = _g104.iterate
  local empty63 = _g104["empty?"]
  local exclude = _g104.exclude
  local _ = _g104["-"]
  local module = _g104.module
  local _47 = _g104["/"]
  local extend = _g104.extend
  local length = _g104.length
  local none63 = _g104["none?"]
  local composite63 = _g104["composite?"]
  local atom63 = _g104["atom?"]
  local tl = _g104.tl
  local setenv = _g104.setenv
  local keep = _g104.keep
  local join = _g104.join
  local _37 = _g104["%"]
  local char = _g104.char
  local hd = _g104.hd
  local _42 = _g104["*"]
  local _43 = _g104["+"]
  local reduce = _g104.reduce
  local id_literal63 = _g104["id-literal?"]
  local drop = _g104.drop
  local split = _g104.split
  local sublist = _g104.sublist
  local find = _g104.find
  local _6061 = _g104["<="]
  local string63 = _g104["string?"]
  local _60 = _g104["<"]
  local _61 = _g104["="]
  local _62 = _g104[">"]
  local sub = _g104.sub
  local inner = _g104.inner
  local pairwise = _g104.pairwise
  local boolean63 = _g104["boolean?"]
  local to_string = _g104["to-string"]
  local write_file = _g104["write-file"]
  local string_literal63 = _g104["string-literal?"]
  local nil63 = _g104["nil?"]
  local function63 = _g104["function?"]
  local write = _g104.write
  local cat = _g104.cat
  local search = _g104.search
  local stash = _g104.stash
  local delimiters = {["\n"] = true, ["("] = true, [")"] = true, [";"] = true}
  local whitespace = {["\n"] = true, ["\t"] = true, [" "] = true}
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
    local n = parse_number(str)
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
  local _g114 = {}
  nexus.reader = _g114
  _g114.eof = eof
  _g114["read-from-string"] = read_from_string
  _g114["make-stream"] = make_stream
  _g114.delimiters = delimiters
  _g114["read-table"] = read_table
  _g114.whitespace = whitespace
  _g114["read-char"] = read_char
  _g114["read-all"] = read_all
  _g114["flag?"] = flag63
  _g114["skip-non-code"] = skip_non_code
  _g114.read = read
  _g114["key?"] = key63
  _g114["peek-char"] = peek_char
end)();
(function ()
  local _g115 = nexus.runtime
  local _6261 = _g115[">="]
  local number63 = _g115["number?"]
  local exit = _g115.exit
  local table63 = _g115["table?"]
  local module_key = _g115["module-key"]
  local in63 = _g115["in?"]
  local add = _g115.add
  local parse_number = _g115["parse-number"]
  local reverse = _g115.reverse
  local apply = _g115.apply
  local replicate = _g115.replicate
  local code = _g115.code
  local splice = _g115.splice
  local make_id = _g115["make-id"]
  local last = _g115.last
  local some63 = _g115["some?"]
  local is63 = _g115["is?"]
  local map = _g115.map
  local _37message_handler = _g115["%message-handler"]
  local list63 = _g115["list?"]
  local read_file = _g115["read-file"]
  local substring = _g115.substring
  local toplevel63 = _g115["toplevel?"]
  local unstash = _g115.unstash
  local keys63 = _g115["keys?"]
  local iterate = _g115.iterate
  local empty63 = _g115["empty?"]
  local exclude = _g115.exclude
  local _ = _g115["-"]
  local module = _g115.module
  local _47 = _g115["/"]
  local extend = _g115.extend
  local length = _g115.length
  local none63 = _g115["none?"]
  local composite63 = _g115["composite?"]
  local atom63 = _g115["atom?"]
  local tl = _g115.tl
  local setenv = _g115.setenv
  local keep = _g115.keep
  local join = _g115.join
  local _37 = _g115["%"]
  local char = _g115.char
  local hd = _g115.hd
  local _42 = _g115["*"]
  local _43 = _g115["+"]
  local reduce = _g115.reduce
  local id_literal63 = _g115["id-literal?"]
  local drop = _g115.drop
  local split = _g115.split
  local sublist = _g115.sublist
  local find = _g115.find
  local _6061 = _g115["<="]
  local string63 = _g115["string?"]
  local _60 = _g115["<"]
  local _61 = _g115["="]
  local _62 = _g115[">"]
  local sub = _g115.sub
  local inner = _g115.inner
  local pairwise = _g115.pairwise
  local boolean63 = _g115["boolean?"]
  local to_string = _g115["to-string"]
  local write_file = _g115["write-file"]
  local string_literal63 = _g115["string-literal?"]
  local nil63 = _g115["nil?"]
  local function63 = _g115["function?"]
  local write = _g115.write
  local cat = _g115.cat
  local search = _g115.search
  local stash = _g115.stash
  local _g116 = nexus.utilities
  local quasiexpand = _g116.quasiexpand
  local bound63 = _g116["bound?"]
  local special63 = _g116["special?"]
  local variable63 = _g116["variable?"]
  local imported = _g116.imported
  local bind42 = _g116["bind*"]
  local to_id = _g116["to-id"]
  local quote_modules = _g116["quote-modules"]
  local initial_environment = _g116["initial-environment"]
  local stash42 = _g116["stash*"]
  local bind = _g116.bind
  local getenv = _g116.getenv
  local macro_function = _g116["macro-function"]
  local quote_environment = _g116["quote-environment"]
  local symbol63 = _g116["symbol?"]
  local valid_id63 = _g116["valid-id?"]
  local statement63 = _g116["statement?"]
  local reserved63 = _g116["reserved?"]
  local indentation = _g116.indentation
  local macroexpand = _g116.macroexpand
  local exported = _g116.exported
  local special_form63 = _g116["special-form?"]
  local toplevel63 = _g116["toplevel?"]
  local symbol_expansion = _g116["symbol-expansion"]
  local mapo = _g116.mapo
  local macro63 = _g116["macro?"]
  local quoted = _g116.quoted
  local _g119 = nexus.reader
  local read_from_string = _g119["read-from-string"]
  local make_stream = _g119["make-stream"]
  local read_table = _g119["read-table"]
  local read_all = _g119["read-all"]
  local read = _g119.read
  local _g123 = {}
  _g123.lua = "not "
  _g123.js = "!"
  local _g121 = {}
  local _g124 = {}
  _g124.lua = "not "
  _g124.js = "!"
  _g121["not"] = _g124
  local _g126 = {}
  _g126["%"] = true
  _g126["*"] = true
  _g126["/"] = true
  local _g128 = {}
  _g128["+"] = true
  _g128["-"] = true
  local _g132 = {}
  _g132.lua = ".."
  _g132.js = "+"
  local _g130 = {}
  local _g133 = {}
  _g133.lua = ".."
  _g133.js = "+"
  _g130.cat = _g133
  local _g135 = {}
  _g135["<"] = true
  _g135[">="] = true
  _g135["<="] = true
  _g135[">"] = true
  local _g139 = {}
  _g139.lua = "~="
  _g139.js = "!="
  local _g141 = {}
  _g141.lua = "=="
  _g141.js = "==="
  local _g137 = {}
  local _g142 = {}
  _g142.lua = "~="
  _g142.js = "!="
  _g137["~="] = _g142
  local _g143 = {}
  _g143.lua = "=="
  _g143.js = "==="
  _g137["="] = _g143
  local _g147 = {}
  _g147.lua = "and"
  _g147.js = "&&"
  local _g145 = {}
  local _g148 = {}
  _g148.lua = "and"
  _g148.js = "&&"
  _g145["and"] = _g148
  local _g152 = {}
  _g152.lua = "or"
  _g152.js = "||"
  local _g150 = {}
  local _g153 = {}
  _g153.lua = "or"
  _g153.js = "||"
  _g150["or"] = _g153
  local infix = {_g121, _g126, _g128, _g130, _g135, _g137, _g145, _g150}
  local function unary63(form)
    local op = form[1]
    local args = sub(form, 1)
    return(length(args) == 1 and in63(op, {"not", "-"}))
  end
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
              return(to_id(x))
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
                  error("Unrecognized atom")
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
    local _g156 = getenv(x)
    local special = _g156.special
    local stmt = _g156.stmt
    local self_tr63 = _g156.tr
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
    local _g157 = unstash({...})
    local right = _g157.right
    local _g158
    if right then
      _g158 = _6261
    else
      _g158 = _62
    end
    if _g158(precedence(child), precedence(parent)) then
      return({"(", ")"})
    else
      return({"", ""})
    end
  end
  local function compile_infix(form)
    local op = form[1]
    local _g159 = sub(form, 1)
    local a = _g159[1]
    local b = _g159[2]
    local _g160 = op_delims(form, a)
    local ao = _g160[1]
    local ac = _g160[2]
    local _g161 = op_delims(form, b, {_stash = true, right = true})
    local bo = _g161[1]
    local bc = _g161[2]
    local _g162 = compile(a)
    local _g163 = compile(b)
    local _g164 = getop(op)
    if unary63(form) then
      return(_g164 .. ao .. _g162 .. ac)
    else
      return(ao .. _g162 .. ac .. " " .. _g164 .. " " .. bo .. _g163 .. bc)
    end
  end
  local function compile_function(args, body, ...)
    local _g165 = unstash({...})
    local name = _g165.name
    local prefix = _g165.prefix
    local _g170
    if name then
      _g170 = compile(name)
    else
      _g170 = ""
    end
    local id = _g170
    local _g166 = prefix or ""
    local _g167 = compile_args(args)
    indent_level = indent_level + 1
    local _g169 = compile(body, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local _g168 = _g169
    local ind = indentation()
    local _g171
    if target == "js" then
      _g171 = ""
    else
      _g171 = "end"
    end
    local tr = _g171
    if name then
      tr = tr .. "\n"
    end
    if target == "js" then
      return("function " .. id .. _g167 .. " {\n" .. _g168 .. ind .. "}" .. tr)
    else
      return(_g166 .. "function " .. id .. _g167 .. "\n" .. _g168 .. ind .. tr)
    end
  end
  local function can_return63(form)
    return(is63(form) and (atom63(form) or not (hd(form) == "return") and not statement63(hd(form))))
  end
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
        local _g174
        if stmt then
          _g174 = indentation()
        else
          _g174 = ""
        end
        local ind = _g174
        local _g175
        if atom63(form) then
          _g175 = compile_atom(form)
        else
          local _g176
          if infix63(hd(form)) then
            _g176 = compile_infix(form)
          else
            _g176 = compile_call(form)
          end
          _g175 = _g176
        end
        local _g173 = _g175
        return(ind .. _g173 .. tr)
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
    local _g177 = sub(args, 0, length(args) - 1)
    local _g178 = 0
    while _g178 < length(_g177) do
      local x = _g177[_g178 + 1]
      add(hoist, lower(x, hoist, stmt63))
      _g178 = _g178 + 1
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
    local _g179 = args[2]
    local _g180 = args[3]
    if stmt63 or tail63 then
      local _g182
      if _g180 then
        _g182 = {lower_body({_g180}, tail63)}
      end
      return(add(hoist, join({"%if", lower(cond, hoist), lower_body({_g179}, tail63)}, _g182)))
    else
      local e = make_id()
      add(hoist, {"%local", e})
      local _g181
      if _g180 then
        _g181 = {lower({"set", e, _g180})}
      end
      add(hoist, join({"%if", lower(cond, hoist), lower({"set", e, _g179})}, _g181))
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
      local _g183
      if x == "and" then
        _g183 = {"%if", id, b, id}
      else
        _g183 = {"%if", id, id, b}
      end
      return(lower({"do", {"%local", id, a}, _g183}, hoist))
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
    local _g184 = args[2]
    local body = sub(args, 2)
    return(add(hoist, {kind, name, _g184, lower_body(body, true)}))
  end
  local function lower_call(form, hoist)
    local _g185 = map(function (x)
      return(lower(x, hoist))
    end, form)
    if some63(_g185) then
      return(_g185)
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
  lower = lower
  local function process(form)
    return(lower(macroexpand(form)))
  end
  current_module = nil
  local function module_path(spec)
    return(module_key(spec) .. ".l")
  end
  local function encapsulate(body)
    local _g186 = map(process, body)
    local epilog = map(process, exported())
    return({{"%function", {}, join({"do"}, join(_g186, epilog))}})
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
  local function load_module(spec, ...)
    local _g189 = unstash({...})
    local all = _g189.all
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
    local _g190 = {join({"%function", {}}, join(prologue(), {form}))}
    local compiled = compile(process(_g190))
    target = previous
    return(run(compiled))
  end
  local _g191 = {}
  nexus.compiler = _g191
  _g191["compile-file"] = compile_file
  _g191["lower-infix"] = lower_infix
  _g191["compile-atom"] = compile_atom
  _g191.infix = infix
  _g191["open-module"] = open_module
  _g191["compile-args"] = compile_args
  _g191.lower = lower
  _g191["op-delims"] = op_delims
  _g191.terminator = terminator
  _g191["infix?"] = infix63
  _g191.prologue = prologue
  _g191["lower-special"] = lower_special
  _g191["lower-infix?"] = lower_infix63
  _g191["lower-statement"] = lower_statement
  _g191["compile-infix"] = compile_infix
  _g191.process = process
  _g191.eval = eval
  _g191["lower-short"] = lower_short
  _g191["%compile-module"] = _37compile_module
  _g191["lower-while"] = lower_while
  _g191["compile-special"] = compile_special
  _g191.getop = getop
  _g191["compile-function"] = compile_function
  _g191["can-return?"] = can_return63
  _g191.precedence = precedence
  _g191["in-module"] = in_module
  _g191["compiler-output"] = compiler_output
  _g191["compiling?"] = compiling63
  _g191.run = run
  _g191["module-path"] = module_path
  _g191["lower-call"] = lower_call
  _g191["compile-call"] = compile_call
  _g191.encapsulate = encapsulate
  _g191.compile = compile
  _g191["lower-definition"] = lower_definition
  _g191["lower-function"] = lower_function
  _g191["unary?"] = unary63
  _g191["load-module"] = load_module
  _g191["lower-if"] = lower_if
  _g191["lower-for"] = lower_for
  _g191["lower-body"] = lower_body
  _g191["lower-try"] = lower_try
  _g191["lower-do"] = lower_do
  _g191["parenthesize-call?"] = parenthesize_call63
  _g191["compile-module"] = compile_module
end)();
(function ()
  local _g192 = nexus.runtime
  local _6261 = _g192[">="]
  local number63 = _g192["number?"]
  local exit = _g192.exit
  local table63 = _g192["table?"]
  local module_key = _g192["module-key"]
  local in63 = _g192["in?"]
  local add = _g192.add
  local parse_number = _g192["parse-number"]
  local reverse = _g192.reverse
  local apply = _g192.apply
  local replicate = _g192.replicate
  local code = _g192.code
  local splice = _g192.splice
  local make_id = _g192["make-id"]
  local last = _g192.last
  local some63 = _g192["some?"]
  local is63 = _g192["is?"]
  local map = _g192.map
  local _37message_handler = _g192["%message-handler"]
  local list63 = _g192["list?"]
  local read_file = _g192["read-file"]
  local substring = _g192.substring
  local toplevel63 = _g192["toplevel?"]
  local unstash = _g192.unstash
  local keys63 = _g192["keys?"]
  local iterate = _g192.iterate
  local empty63 = _g192["empty?"]
  local exclude = _g192.exclude
  local _ = _g192["-"]
  local module = _g192.module
  local _47 = _g192["/"]
  local extend = _g192.extend
  local length = _g192.length
  local none63 = _g192["none?"]
  local composite63 = _g192["composite?"]
  local atom63 = _g192["atom?"]
  local tl = _g192.tl
  local setenv = _g192.setenv
  local keep = _g192.keep
  local join = _g192.join
  local _37 = _g192["%"]
  local char = _g192.char
  local hd = _g192.hd
  local _42 = _g192["*"]
  local _43 = _g192["+"]
  local reduce = _g192.reduce
  local id_literal63 = _g192["id-literal?"]
  local drop = _g192.drop
  local split = _g192.split
  local sublist = _g192.sublist
  local find = _g192.find
  local _6061 = _g192["<="]
  local string63 = _g192["string?"]
  local _60 = _g192["<"]
  local _61 = _g192["="]
  local _62 = _g192[">"]
  local sub = _g192.sub
  local inner = _g192.inner
  local pairwise = _g192.pairwise
  local boolean63 = _g192["boolean?"]
  local to_string = _g192["to-string"]
  local write_file = _g192["write-file"]
  local string_literal63 = _g192["string-literal?"]
  local nil63 = _g192["nil?"]
  local function63 = _g192["function?"]
  local write = _g192.write
  local cat = _g192.cat
  local search = _g192.search
  local stash = _g192.stash
  local _g193 = nexus.utilities
  local quasiexpand = _g193.quasiexpand
  local bound63 = _g193["bound?"]
  local special63 = _g193["special?"]
  local variable63 = _g193["variable?"]
  local imported = _g193.imported
  local bind42 = _g193["bind*"]
  local to_id = _g193["to-id"]
  local quote_modules = _g193["quote-modules"]
  local initial_environment = _g193["initial-environment"]
  local stash42 = _g193["stash*"]
  local bind = _g193.bind
  local getenv = _g193.getenv
  local macro_function = _g193["macro-function"]
  local quote_environment = _g193["quote-environment"]
  local symbol63 = _g193["symbol?"]
  local valid_id63 = _g193["valid-id?"]
  local statement63 = _g193["statement?"]
  local reserved63 = _g193["reserved?"]
  local indentation = _g193.indentation
  local macroexpand = _g193.macroexpand
  local exported = _g193.exported
  local special_form63 = _g193["special-form?"]
  local toplevel63 = _g193["toplevel?"]
  local symbol_expansion = _g193["symbol-expansion"]
  local mapo = _g193.mapo
  local macro63 = _g193["macro?"]
  local quoted = _g193.quoted
  local _g196 = nexus.compiler
  local open_module = _g196["open-module"]
  local lower = _g196.lower
  local eval = _g196.eval
  local compile_function = _g196["compile-function"]
  local in_module = _g196["in-module"]
  local compile = _g196.compile
  local load_module = _g196["load-module"]
  local compile_module = _g196["compile-module"]
end)();
(function ()
  local _g354 = nexus.runtime
  local _6261 = _g354[">="]
  local number63 = _g354["number?"]
  local exit = _g354.exit
  local table63 = _g354["table?"]
  local module_key = _g354["module-key"]
  local in63 = _g354["in?"]
  local add = _g354.add
  local parse_number = _g354["parse-number"]
  local reverse = _g354.reverse
  local apply = _g354.apply
  local replicate = _g354.replicate
  local code = _g354.code
  local splice = _g354.splice
  local make_id = _g354["make-id"]
  local last = _g354.last
  local some63 = _g354["some?"]
  local is63 = _g354["is?"]
  local map = _g354.map
  local _37message_handler = _g354["%message-handler"]
  local list63 = _g354["list?"]
  local read_file = _g354["read-file"]
  local substring = _g354.substring
  local toplevel63 = _g354["toplevel?"]
  local unstash = _g354.unstash
  local keys63 = _g354["keys?"]
  local iterate = _g354.iterate
  local empty63 = _g354["empty?"]
  local exclude = _g354.exclude
  local _ = _g354["-"]
  local module = _g354.module
  local _47 = _g354["/"]
  local extend = _g354.extend
  local length = _g354.length
  local none63 = _g354["none?"]
  local composite63 = _g354["composite?"]
  local atom63 = _g354["atom?"]
  local tl = _g354.tl
  local setenv = _g354.setenv
  local keep = _g354.keep
  local join = _g354.join
  local _37 = _g354["%"]
  local char = _g354.char
  local hd = _g354.hd
  local _42 = _g354["*"]
  local _43 = _g354["+"]
  local reduce = _g354.reduce
  local id_literal63 = _g354["id-literal?"]
  local drop = _g354.drop
  local split = _g354.split
  local sublist = _g354.sublist
  local find = _g354.find
  local _6061 = _g354["<="]
  local string63 = _g354["string?"]
  local _60 = _g354["<"]
  local _61 = _g354["="]
  local _62 = _g354[">"]
  local sub = _g354.sub
  local inner = _g354.inner
  local pairwise = _g354.pairwise
  local boolean63 = _g354["boolean?"]
  local to_string = _g354["to-string"]
  local write_file = _g354["write-file"]
  local string_literal63 = _g354["string-literal?"]
  local nil63 = _g354["nil?"]
  local function63 = _g354["function?"]
  local write = _g354.write
  local cat = _g354.cat
  local search = _g354.search
  local stash = _g354.stash
  local _g355 = nexus.utilities
  local quasiexpand = _g355.quasiexpand
  local bound63 = _g355["bound?"]
  local special63 = _g355["special?"]
  local variable63 = _g355["variable?"]
  local imported = _g355.imported
  local bind42 = _g355["bind*"]
  local to_id = _g355["to-id"]
  local quote_modules = _g355["quote-modules"]
  local initial_environment = _g355["initial-environment"]
  local stash42 = _g355["stash*"]
  local bind = _g355.bind
  local getenv = _g355.getenv
  local macro_function = _g355["macro-function"]
  local quote_environment = _g355["quote-environment"]
  local symbol63 = _g355["symbol?"]
  local valid_id63 = _g355["valid-id?"]
  local statement63 = _g355["statement?"]
  local reserved63 = _g355["reserved?"]
  local indentation = _g355.indentation
  local macroexpand = _g355.macroexpand
  local exported = _g355.exported
  local special_form63 = _g355["special-form?"]
  local toplevel63 = _g355["toplevel?"]
  local symbol_expansion = _g355["symbol-expansion"]
  local mapo = _g355.mapo
  local macro63 = _g355["macro?"]
  local quoted = _g355.quoted
  local _g358 = nexus.compiler
  local open_module = _g358["open-module"]
  local lower = _g358.lower
  local eval = _g358.eval
  local compile_function = _g358["compile-function"]
  local in_module = _g358["in-module"]
  local compile = _g358.compile
  local load_module = _g358["load-module"]
  local compile_module = _g358["compile-module"]
  target = "lua"
end)();
(function ()
  local _g624 = nexus.runtime
  local _6261 = _g624[">="]
  local number63 = _g624["number?"]
  local exit = _g624.exit
  local table63 = _g624["table?"]
  local module_key = _g624["module-key"]
  local in63 = _g624["in?"]
  local add = _g624.add
  local parse_number = _g624["parse-number"]
  local reverse = _g624.reverse
  local apply = _g624.apply
  local replicate = _g624.replicate
  local code = _g624.code
  local splice = _g624.splice
  local make_id = _g624["make-id"]
  local last = _g624.last
  local some63 = _g624["some?"]
  local is63 = _g624["is?"]
  local map = _g624.map
  local _37message_handler = _g624["%message-handler"]
  local list63 = _g624["list?"]
  local read_file = _g624["read-file"]
  local substring = _g624.substring
  local toplevel63 = _g624["toplevel?"]
  local unstash = _g624.unstash
  local keys63 = _g624["keys?"]
  local iterate = _g624.iterate
  local empty63 = _g624["empty?"]
  local exclude = _g624.exclude
  local _ = _g624["-"]
  local module = _g624.module
  local _47 = _g624["/"]
  local extend = _g624.extend
  local length = _g624.length
  local none63 = _g624["none?"]
  local composite63 = _g624["composite?"]
  local atom63 = _g624["atom?"]
  local tl = _g624.tl
  local setenv = _g624.setenv
  local keep = _g624.keep
  local join = _g624.join
  local _37 = _g624["%"]
  local char = _g624.char
  local hd = _g624.hd
  local _42 = _g624["*"]
  local _43 = _g624["+"]
  local reduce = _g624.reduce
  local id_literal63 = _g624["id-literal?"]
  local drop = _g624.drop
  local split = _g624.split
  local sublist = _g624.sublist
  local find = _g624.find
  local _6061 = _g624["<="]
  local string63 = _g624["string?"]
  local _60 = _g624["<"]
  local _61 = _g624["="]
  local _62 = _g624[">"]
  local sub = _g624.sub
  local inner = _g624.inner
  local pairwise = _g624.pairwise
  local boolean63 = _g624["boolean?"]
  local to_string = _g624["to-string"]
  local write_file = _g624["write-file"]
  local string_literal63 = _g624["string-literal?"]
  local nil63 = _g624["nil?"]
  local function63 = _g624["function?"]
  local write = _g624.write
  local cat = _g624.cat
  local search = _g624.search
  local stash = _g624.stash
  local _g625 = nexus.utilities
  local quasiexpand = _g625.quasiexpand
  local bound63 = _g625["bound?"]
  local special63 = _g625["special?"]
  local variable63 = _g625["variable?"]
  local imported = _g625.imported
  local bind42 = _g625["bind*"]
  local to_id = _g625["to-id"]
  local quote_modules = _g625["quote-modules"]
  local initial_environment = _g625["initial-environment"]
  local stash42 = _g625["stash*"]
  local bind = _g625.bind
  local getenv = _g625.getenv
  local macro_function = _g625["macro-function"]
  local quote_environment = _g625["quote-environment"]
  local symbol63 = _g625["symbol?"]
  local valid_id63 = _g625["valid-id?"]
  local statement63 = _g625["statement?"]
  local reserved63 = _g625["reserved?"]
  local indentation = _g625.indentation
  local macroexpand = _g625.macroexpand
  local exported = _g625.exported
  local special_form63 = _g625["special-form?"]
  local toplevel63 = _g625["toplevel?"]
  local symbol_expansion = _g625["symbol-expansion"]
  local mapo = _g625.mapo
  local macro63 = _g625["macro?"]
  local quoted = _g625.quoted
  local _g628 = nexus.compiler
  local open_module = _g628["open-module"]
  local lower = _g628.lower
  local eval = _g628.eval
  local compile_function = _g628["compile-function"]
  local in_module = _g628["in-module"]
  local compile = _g628.compile
  local load_module = _g628["load-module"]
  local compile_module = _g628["compile-module"]
  modules = {runtime = {import = {"special", "core"}, export = {[">="] = {export = true, variable = true}, ["number?"] = {export = true, variable = true}, exit = {export = true, variable = true}, ["table?"] = {export = true, variable = true}, ["module-key"] = {export = true, variable = true}, ["in?"] = {export = true, variable = true}, add = {export = true, variable = true}, ["parse-number"] = {export = true, variable = true}, reverse = {export = true, variable = true}, apply = {export = true, variable = true}, replicate = {export = true, variable = true}, code = {export = true, variable = true}, splice = {export = true, variable = true}, ["make-id"] = {export = true, variable = true}, ["splice?"] = {variable = true}, last = {export = true, variable = true}, ["some?"] = {export = true, variable = true}, ["is?"] = {export = true, variable = true}, map = {export = true, variable = true}, ["%message-handler"] = {export = true, variable = true}, ["list?"] = {export = true, variable = true}, ["read-file"] = {export = true, variable = true}, substring = {export = true, variable = true}, ["toplevel?"] = {export = true, variable = true}, unstash = {export = true, variable = true}, ["keys?"] = {export = true, variable = true}, iterate = {export = true, variable = true}, ["empty?"] = {export = true, variable = true}, exclude = {export = true, variable = true}, ["-"] = {export = true, variable = true}, module = {export = true, variable = true}, ["/"] = {export = true, variable = true}, extend = {export = true, variable = true}, length = {export = true, variable = true}, ["none?"] = {export = true, variable = true}, ["composite?"] = {export = true, variable = true}, ["atom?"] = {export = true, variable = true}, tl = {export = true, variable = true}, setenv = {export = true, variable = true}, keep = {export = true, variable = true}, join = {export = true, variable = true}, ["%"] = {export = true, variable = true}, char = {export = true, variable = true}, hd = {export = true, variable = true}, ["*"] = {export = true, variable = true}, ["+"] = {export = true, variable = true}, reduce = {export = true, variable = true}, ["id-literal?"] = {export = true, variable = true}, drop = {export = true, variable = true}, split = {export = true, variable = true}, sublist = {export = true, variable = true}, find = {export = true, variable = true}, ["<="] = {export = true, variable = true}, mapl = {variable = true}, ["string?"] = {export = true, variable = true}, ["id-count"] = {variable = true}, ["<"] = {export = true, variable = true}, ["="] = {export = true, variable = true}, [">"] = {export = true, variable = true}, sub = {export = true, variable = true}, inner = {export = true, variable = true}, pairwise = {export = true, variable = true}, ["boolean?"] = {export = true, variable = true}, ["to-string"] = {export = true, variable = true}, ["write-file"] = {export = true, variable = true}, ["string-literal?"] = {export = true, variable = true}, ["nil?"] = {export = true, variable = true}, ["function?"] = {export = true, variable = true}, write = {export = true, variable = true}, cat = {export = true, variable = true}, search = {export = true, variable = true}, stash = {export = true, variable = true}}}, core = {import = {"runtime", "utilities", "special", "core", "compiler"}, export = {["define*"] = {macro = function (name, x, ...)
    local body = unstash({...})
    local _g641 = sub(body, 0)
    setenv(name, {_stash = true, global = true, export = true})
    if some63(_g641) then
      local _g642 = bind42(x, _g641)
      local args = _g642[1]
      local _g643 = _g642[2]
      return(join({"%global-function", name, args}, _g643))
    else
      if target == "js" then
        return({"set", {"get", "global", {"quote", to_id(name)}}, x})
      else
        return({"set", name, x})
      end
    end
  end, export = true}, ["define-symbol"] = {macro = function (name, expansion)
    setenv(name, {_stash = true, symbol = expansion})
    return(nil)
  end, export = true}, ["join!"] = {macro = function (a, ...)
    local bs = unstash({...})
    local _g644 = sub(bs, 0)
    return({"set", a, join({"join*", a}, _g644)})
  end, export = true}, when = {macro = function (cond, ...)
    local body = unstash({...})
    local _g645 = sub(body, 0)
    return({"if", cond, join({"do"}, _g645)})
  end, export = true}, target = {macro = function (...)
    local clauses = unstash({...})
    return(clauses[target])
  end, export = true, global = true}, let = {macro = function (bindings, ...)
    local body = unstash({...})
    local _g646 = sub(body, 0)
    local i = 0
    local renames = {}
    local locals = {}
    map(function (_g647)
      local lh = _g647[1]
      local rh = _g647[2]
      local _g648 = bind(lh, rh)
      local _g649 = 0
      while _g649 < length(_g648) do
        local _g650 = _g648[_g649 + 1]
        local id = _g650[1]
        local val = _g650[2]
        if bound63(id) or reserved63(id) or toplevel63() then
          local rename = make_id()
          add(renames, id)
          add(renames, rename)
          id = rename
        else
          setenv(id, {_stash = true, variable = true})
        end
        add(locals, {"%local", id, val})
        _g649 = _g649 + 1
      end
    end, pairwise(bindings))
    return(join({"do"}, join(locals, {join({"let-symbol", renames}, _g646)})))
  end, export = true}, ["with-frame"] = {macro = function (...)
    local body = unstash({...})
    local _g651 = sub(body, 0)
    local scope = body.scope
    local x = make_id()
    local _g652 = {"table"}
    _g652._scope = scope
    return({"do", {"add", "environment", _g652}, {"let", {x, join({"do"}, _g651)}, {"drop", "environment"}, x}})
  end, export = true}, dec = {macro = function (n, by)
    return({"set", n, {"-", n, by or 1}})
  end, export = true}, ["join*"] = {macro = function (...)
    local xs = unstash({...})
    return(reduce(function (a, b)
      return({"join", a, b})
    end, xs))
  end, export = true}, inc = {macro = function (n, by)
    return({"set", n, {"+", n, by or 1}})
  end, export = true}, ["define-macro"] = {macro = function (name, args, ...)
    local body = unstash({...})
    local _g653 = sub(body, 0)
    local form = join({"fn", args}, _g653)
    local _g654 = {"setenv", {"quote", name}}
    _g654.macro = form
    _g654.form = {"quote", form}
    eval(_g654)
    return(nil)
  end, export = true}, pr = {macro = function (...)
    local xs = unstash({...})
    local _g655 = map(function (x)
      return(splice({{"to-string", x}, "\" \""}))
    end, xs)
    return({"print", join({"cat"}, _g655)})
  end, export = true}, language = {macro = function ()
    return({"quote", target})
  end, export = true}, quasiquote = {macro = function (form)
    return(quasiexpand(form, 1))
  end, export = true}, unless = {macro = function (cond, ...)
    local body = unstash({...})
    local _g656 = sub(body, 0)
    return({"if", {"not", cond}, join({"do"}, _g656)})
  end, export = true}, at = {macro = function (l, i)
    if target == "lua" and number63(i) then
      i = i + 1
    else
      if target == "lua" then
        i = {"+", i, 1}
      end
    end
    return({"get", l, i})
  end, export = true}, ["let-macro"] = {macro = function (definitions, ...)
    local body = unstash({...})
    local _g657 = sub(body, 0)
    add(environment, {})
    map(function (m)
      return(macroexpand(join({"define-macro"}, m)))
    end, definitions)
    local _g658 = join({"do"}, macroexpand(_g657))
    drop(environment)
    return(_g658)
  end, export = true}, list = {macro = function (...)
    local body = unstash({...})
    local l = join({"%array"}, body)
    if not keys63(body) then
      return(l)
    else
      local id = make_id()
      local init = {}
      local _g659 = body
      local k = nil
      for k in next, _g659 do
        if not number63(k) then
          local v = _g659[k]
          add(init, {"set", {"get", id, {"quote", k}}, v})
        end
      end
      return(join({"let", {id, l}}, join(init, {id})))
    end
  end, export = true}, each = {macro = function (b, t, ...)
    local body = unstash({...})
    local _g660 = sub(body, 0)
    local k = b[1]
    local v = b[2]
    local t1 = make_id()
    local _g712
    if nil63(v) then
      local _g713
      if b.i then
        _g713 = "i"
      else
        _g713 = make_id()
      end
      local i = _g713
      _g712 = {"let", {i, 0}, {"while", {"<", i, {"length", t1}}, join({"let", {k, {"at", t1, i}}}, _g660), {"inc", i}}}
    else
      local _g661 = {"target"}
      _g661.lua = {"not", {"number?", k}}
      _g661.js = {"isNaN", {"parseInt", k}}
      _g712 = {"let", {k, "nil"}, {"%for", t1, k, {"when", _g661, join({"let", {v, {"get", t1, k}}}, _g660)}}}
    end
    return({"let", {t1, t}, _g712})
  end, export = true}, ["define-module"] = {macro = function (spec, ...)
    local body = unstash({...})
    local _g662 = sub(body, 0)
    local imports = {}
    local exp = _g662.export
    local imp = _g662.import
    local _g663 = imp or {}
    local _g664 = 0
    while _g664 < length(_g663) do
      local k = _g663[_g664 + 1]
      load_module(k)
      imports = join(imports, imported(k))
      _g664 = _g664 + 1
    end
    modules[module_key(spec)] = {import = imp, export = {}}
    local _g665 = exp or {}
    local _g666 = 0
    while _g666 < length(_g665) do
      local k = _g665[_g666 + 1]
      setenv(k, {_stash = true, export = true})
      _g666 = _g666 + 1
    end
    return(join({"do"}, imports))
  end, export = true}, guard = {macro = function (expr)
    if target == "js" then
      return({{"fn", {}, {"%try", {"list", true, expr}}}})
    else
      local e = make_id()
      local x = make_id()
      local ex = "|" .. e .. "," .. x .. "|"
      return({"let", {ex, {"xpcall", {"fn", {}, expr}, "%message-handler"}}, {"list", e, x}})
    end
  end, export = true}, table = {macro = function (...)
    local body = unstash({...})
    return(join({"%object"}, mapo(function (_g353, x)
      return(x)
    end, body)))
  end, export = true}, define = {macro = function (name, x, ...)
    local body = unstash({...})
    local _g667 = sub(body, 0)
    setenv(name, {_stash = true, variable = true})
    if some63(_g667) then
      local _g668 = bind42(x, _g667)
      local args = _g668[1]
      local _g669 = _g668[2]
      return(join({"%local-function", name, args}, _g669))
    else
      return({"%local", name, x})
    end
  end, export = true}, ["define-special"] = {macro = function (name, args, ...)
    local body = unstash({...})
    local _g670 = sub(body, 0)
    local form = join({"fn", args}, _g670)
    local keys = sub(_g670, length(_g670))
    local _g671 = {"setenv", {"quote", name}}
    _g671.special = form
    _g671.form = {"quote", form}
    eval(join(_g671, keys))
    return(nil)
  end, export = true}, ["let-symbol"] = {macro = function (expansions, ...)
    local body = unstash({...})
    local _g672 = sub(body, 0)
    add(environment, {})
    map(function (_g674)
      local name = _g674[1]
      local exp = _g674[2]
      return(macroexpand({"define-symbol", name, exp}))
    end, pairwise(expansions))
    local _g673 = join({"do"}, macroexpand(_g672))
    drop(environment)
    return(_g673)
  end, export = true}, quote = {macro = function (form)
    return(quoted(form))
  end, export = true}, ["set-of"] = {macro = function (...)
    local elements = unstash({...})
    local l = {}
    local _g675 = elements
    local _g676 = 0
    while _g676 < length(_g675) do
      local e = _g675[_g676 + 1]
      l[e] = true
      _g676 = _g676 + 1
    end
    return(join({"table"}, l))
  end, export = true}, ["with-bindings"] = {macro = function (_g677, ...)
    local names = _g677[1]
    local body = unstash({...})
    local _g678 = sub(body, 0)
    local x = make_id()
    local _g680 = {"setenv", x}
    _g680.variable = true
    local _g679 = {"with-frame", {"each", {x}, names, _g680}}
    _g679.scope = true
    return(join(_g679, _g678))
  end, export = true}, ["cat!"] = {macro = function (a, ...)
    local bs = unstash({...})
    local _g681 = sub(bs, 0)
    return({"set", a, join({"cat", a}, _g681)})
  end, export = true}, ["if"] = {macro = function (...)
    local branches = unstash({...})
    local function step(_g682)
      local a = _g682[1]
      local b = _g682[2]
      local c = sub(_g682, 2)
      if is63(b) then
        return({join({"%if", a, b}, step(c))})
      else
        if is63(a) then
          return({a})
        end
      end
    end
    return(hd(step(branches)))
  end, export = true}, fn = {macro = function (args, ...)
    local body = unstash({...})
    local _g683 = sub(body, 0)
    local _g684 = bind42(args, _g683)
    local _g685 = _g684[1]
    local _g686 = _g684[2]
    return(join({"%function", _g685}, _g686))
  end, export = true}}}, special = {import = {"runtime", "utilities", "special", "core", "compiler"}, export = {["%local-function"] = {tr = true, foo = true, special = function (name, args, body)
    local x = compile_function(args, body, {_stash = true, name = name, prefix = "local "})
    return(indentation() .. x)
  end, export = true, stmt = true}, ["%local"] = {special = function (name, value)
    local id = compile(name)
    local value1 = compile(value)
    local _g714
    if is63(value) then
      _g714 = " = " .. value1
    else
      _g714 = ""
    end
    local rh = _g714
    local _g715
    if target == "js" then
      _g715 = "var "
    else
      _g715 = "local "
    end
    local keyword = _g715
    local ind = indentation()
    return(ind .. keyword .. id .. rh)
  end, export = true, stmt = true, foo = true}, ["%array"] = {special = function (...)
    local forms = unstash({...})
    local _g716
    if target == "lua" then
      _g716 = "{"
    else
      _g716 = "["
    end
    local open = _g716
    local _g717
    if target == "lua" then
      _g717 = "}"
    else
      _g717 = "]"
    end
    local close = _g717
    local str = ""
    local _g687 = forms
    local i = 0
    while i < length(_g687) do
      local x = _g687[i + 1]
      str = str .. compile(x)
      if i < length(forms) - 1 then
        str = str .. ", "
      end
      i = i + 1
    end
    return(open .. str .. close)
  end, export = true, foo = true}, ["%try"] = {tr = true, foo = true, special = function (form)
    local ind = indentation()
    indent_level = indent_level + 1
    local _g688 = compile(form, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local body = _g688
    local e = make_id()
    local hf = {"return", {"%array", false, {"get", e, "\"message\""}}}
    indent_level = indent_level + 1
    local _g689 = compile(hf, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local h = _g689
    return(ind .. "try {\n" .. body .. ind .. "}\n" .. ind .. "catch (" .. e .. ") {\n" .. h .. ind .. "}\n")
  end, export = true, stmt = true}, ["get"] = {special = function (t, k)
    local _g690 = compile(t)
    local k1 = compile(k)
    if target == "lua" and char(_g690, 0) == "{" then
      _g690 = "(" .. _g690 .. ")"
    end
    if string_literal63(k) and valid_id63(inner(k)) then
      return(_g690 .. "." .. inner(k))
    else
      return(_g690 .. "[" .. k1 .. "]")
    end
  end, export = true, foo = true}, ["return"] = {special = function (x)
    local _g718
    if nil63(x) then
      _g718 = "return"
    else
      _g718 = "return(" .. compile(x) .. ")"
    end
    local _g691 = _g718
    return(indentation() .. _g691)
  end, export = true, stmt = true, foo = true}, ["%global-function"] = {tr = true, foo = true, special = function (name, args, body)
    if target == "lua" then
      local x = compile_function(args, body, {_stash = true, name = name})
      return(indentation() .. x)
    else
      return(compile({"set", name, {"%function", args, body}}, {_stash = true, stmt = true}))
    end
  end, export = true, stmt = true}, ["break"] = {special = function ()
    return(indentation() .. "break")
  end, export = true, stmt = true, foo = true}, ["%function"] = {special = function (args, body)
    return(compile_function(args, body))
  end, export = true, foo = true}, ["error"] = {special = function (x)
    local _g719
    if target == "js" then
      _g719 = "throw new " .. compile({"Error", x})
    else
      _g719 = "error(" .. compile(x) .. ")"
    end
    local e = _g719
    return(indentation() .. e)
  end, export = true, stmt = true, foo = true}, ["%if"] = {tr = true, foo = true, special = function (cond, cons, alt)
    local _g692 = compile(cond)
    indent_level = indent_level + 1
    local _g695 = compile(cons, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local _g693 = _g695
    local _g720
    if alt then
      indent_level = indent_level + 1
      local _g696 = compile(alt, {_stash = true, stmt = true})
      indent_level = indent_level - 1
      _g720 = _g696
    end
    local _g694 = _g720
    local ind = indentation()
    local str = ""
    if target == "js" then
      str = str .. ind .. "if (" .. _g692 .. ") {\n" .. _g693 .. ind .. "}"
    else
      str = str .. ind .. "if " .. _g692 .. " then\n" .. _g693
    end
    if _g694 and target == "js" then
      str = str .. " else {\n" .. _g694 .. ind .. "}"
    else
      if _g694 then
        str = str .. ind .. "else\n" .. _g694
      end
    end
    if target == "lua" then
      return(str .. ind .. "end\n")
    else
      return(str .. "\n")
    end
  end, export = true, stmt = true}, ["%object"] = {special = function (...)
    local forms = unstash({...})
    local str = "{"
    local _g721
    if target == "lua" then
      _g721 = " = "
    else
      _g721 = ": "
    end
    local sep = _g721
    local pairs = pairwise(forms)
    local _g697 = pairs
    local i = 0
    while i < length(_g697) do
      local _g698 = _g697[i + 1]
      local k = _g698[1]
      local v = _g698[2]
      if not string63(k) then
        error("Illegal key: " .. to_string(k))
      end
      local _g699 = compile(v)
      local _g722
      if valid_id63(k) then
        _g722 = k
      else
        local _g723
        if target == "js" and string_literal63(k) then
          _g723 = k
        else
          local _g724
          if target == "js" then
            _g724 = quoted(k)
          else
            local _g725
            if string_literal63(k) then
              _g725 = "[" .. k .. "]"
            else
              _g725 = "[" .. quoted(k) .. "]"
            end
            _g724 = _g725
          end
          _g723 = _g724
        end
        _g722 = _g723
      end
      local _g700 = _g722
      str = str .. _g700 .. sep .. _g699
      if i < length(pairs) - 1 then
        str = str .. ", "
      end
      i = i + 1
    end
    return(str .. "}")
  end, export = true, foo = true}, ["not"] = {}, ["do"] = {tr = true, foo = true, special = function (...)
    local forms = unstash({...})
    local str = ""
    local _g701 = forms
    local _g702 = 0
    while _g702 < length(_g701) do
      local x = _g701[_g702 + 1]
      str = str .. compile(x, {_stash = true, stmt = true})
      _g702 = _g702 + 1
    end
    return(str)
  end, export = true, stmt = true}, ["while"] = {tr = true, foo = true, special = function (cond, form)
    local _g703 = compile(cond)
    indent_level = indent_level + 1
    local _g704 = compile(form, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local body = _g704
    local ind = indentation()
    if target == "js" then
      return(ind .. "while (" .. _g703 .. ") {\n" .. body .. ind .. "}\n")
    else
      return(ind .. "while " .. _g703 .. " do\n" .. body .. ind .. "end\n")
    end
  end, export = true, stmt = true}, ["%for"] = {tr = true, foo = true, special = function (t, k, form)
    local _g705 = compile(t)
    local ind = indentation()
    indent_level = indent_level + 1
    local _g706 = compile(form, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local body = _g706
    if target == "lua" then
      return(ind .. "for " .. k .. " in next, " .. _g705 .. " do\n" .. body .. ind .. "end\n")
    else
      return(ind .. "for (" .. k .. " in " .. _g705 .. ") {\n" .. body .. ind .. "}\n")
    end
  end, export = true, stmt = true}, ["set"] = {special = function (lh, rh)
    local _g707 = compile(lh)
    local _g726
    if nil63(rh) then
      _g726 = "nil"
    else
      _g726 = rh
    end
    local _g708 = compile(_g726)
    return(indentation() .. _g707 .. " = " .. _g708)
  end, export = true, stmt = true, foo = true}}}, boot = {import = {"runtime", "utilities", "special", "core", "compiler"}, export = {["%initial-modules"] = {macro = function ()
    return(quote_modules())
  end}, modules = {global = true, export = true}, ["%initial-environment"] = {macro = function ()
    return(quote_environment(initial_environment()))
  end}}}, reader = {import = {"runtime", "special", "core"}, export = {["define-reader"] = {macro = function (_g709, ...)
    local char = _g709[1]
    local stream = _g709[2]
    local body = unstash({...})
    local _g710 = sub(body, 0)
    return({"set", {"get", "read-table", char}, join({"fn", {stream}}, _g710)})
  end, export = true}, eof = {variable = true}, ["read-from-string"] = {export = true, variable = true}, ["make-stream"] = {export = true, variable = true}, delimiters = {variable = true}, ["read-table"] = {export = true, variable = true}, whitespace = {variable = true}, ["read-char"] = {variable = true}, ["read-all"] = {export = true, variable = true}, ["flag?"] = {variable = true}, ["skip-non-code"] = {variable = true}, read = {export = true, variable = true}, ["key?"] = {variable = true}, ["peek-char"] = {variable = true}}}, optimizer = {import = {"runtime", "special", "core"}, export = {optimizations = {variable = true}, optimize = {variable = true, export = true}, ["define-optimization"] = {}}}, main = {import = {"runtime", "special", "core", "reader", "compiler"}, export = {save = {macro = function (...)
    local specs = unstash({...})
    local _g711 = sub(specs, 0)
    map(compile_module, _g711)
    return(nil)
  end}}}, lib = {import = {"core", "special"}, export = {}}, utilities = {import = {"runtime", "special", "core"}, export = {quasiexpand = {export = true, variable = true}, ["with-indent"] = {macro = function (form)
    local result = make_id()
    return({"do", {"inc", "indent-level"}, {"let", {result, form}, {"dec", "indent-level"}, result}})
  end, export = true}, ["bound?"] = {export = true, variable = true}, ["special?"] = {export = true, variable = true}, escape = {variable = true}, ["variable?"] = {export = true, variable = true}, imported = {export = true, variable = true}, ["bind*"] = {export = true, variable = true}, ["to-id"] = {export = true, variable = true}, ["quote-modules"] = {export = true, variable = true}, ["initial-environment"] = {export = true, variable = true}, ["stash*"] = {export = true, variable = true}, ["quoting?"] = {variable = true}, ["numeric?"] = {variable = true}, ["quote-module"] = {variable = true}, ["quote-frame"] = {variable = true}, bind = {export = true, variable = true}, getenv = {export = true, variable = true}, ["macro-function"] = {export = true, variable = true}, ["quote-environment"] = {export = true, variable = true}, ["valid-char?"] = {variable = true}, reserved = {variable = true}, ["symbol?"] = {export = true, variable = true}, ["valid-id?"] = {export = true, variable = true}, ["statement?"] = {export = true, variable = true}, ["indent-level"] = {global = true, export = true}, ["reserved?"] = {export = true, variable = true}, ["global?"] = {variable = true}, indentation = {export = true, variable = true}, macroexpand = {export = true, variable = true}, exported = {export = true, variable = true}, ["special-form?"] = {export = true, variable = true}, ["toplevel?"] = {export = true, variable = true}, ["can-unquote?"] = {variable = true}, ["quasiquoting?"] = {variable = true}, ["symbol-expansion"] = {export = true, variable = true}, mapo = {export = true, variable = true}, ["macro?"] = {export = true, variable = true}, ["quote-binding"] = {variable = true}, quoted = {export = true, variable = true}, ["quasiquote-list"] = {variable = true}, ["quasisplice?"] = {variable = true}}}, compiler = {import = {"runtime", "utilities", "special", "core", "reader"}, export = {["compile-file"] = {variable = true}, ["lower-infix"] = {variable = true}, ["compile-atom"] = {variable = true}, infix = {variable = true}, ["open-module"] = {export = true, variable = true}, ["compile-args"] = {variable = true}, lower = {global = true, variable = true, export = true}, ["op-delims"] = {variable = true}, terminator = {variable = true}, ["infix?"] = {variable = true}, prologue = {variable = true}, ["lower-special"] = {variable = true}, ["lower-infix?"] = {variable = true}, ["lower-statement"] = {variable = true}, ["compile-infix"] = {variable = true}, process = {variable = true}, eval = {export = true, variable = true}, ["lower-short"] = {variable = true}, ["%compile-module"] = {variable = true}, ["lower-while"] = {variable = true}, ["compile-special"] = {variable = true}, getop = {variable = true}, ["compile-function"] = {export = true, variable = true}, ["can-return?"] = {variable = true}, precedence = {variable = true}, ["in-module"] = {export = true, variable = true}, ["compiler-output"] = {variable = true}, ["compiling?"] = {variable = true}, run = {variable = true}, ["%result"] = {global = true, export = true}, ["module-path"] = {variable = true}, ["lower-call"] = {variable = true}, ["compile-call"] = {variable = true}, encapsulate = {variable = true}, compile = {export = true, variable = true}, ["current-module"] = {global = true, export = true}, ["lower-definition"] = {variable = true}, ["lower-function"] = {variable = true}, ["unary?"] = {variable = true}, ["load-module"] = {export = true, variable = true}, ["lower-if"] = {variable = true}, ["lower-for"] = {variable = true}, ["lower-body"] = {variable = true}, ["lower-try"] = {variable = true}, ["lower-do"] = {variable = true}, ["parenthesize-call?"] = {variable = true}, ["compile-module"] = {export = true, variable = true}}}, system = {import = {"special", "core"}, export = {nexus = {global = true, export = true}}}}
  environment = {{["define-module"] = {macro = function (spec, ...)
    local body = unstash({...})
    local _g727 = sub(body, 0)
    local imports = {}
    local exp = _g727.export
    local imp = _g727.import
    local _g728 = imp or {}
    local _g729 = 0
    while _g729 < length(_g728) do
      local k = _g728[_g729 + 1]
      load_module(k)
      imports = join(imports, imported(k))
      _g729 = _g729 + 1
    end
    modules[module_key(spec)] = {import = imp, export = {}}
    local _g730 = exp or {}
    local _g731 = 0
    while _g731 < length(_g730) do
      local k = _g730[_g731 + 1]
      setenv(k, {_stash = true, export = true})
      _g731 = _g731 + 1
    end
    return(join({"do"}, imports))
  end, export = true}}}
end)();
(function ()
  local _g2 = nexus.runtime
  local _6261 = _g2[">="]
  local string63 = _g2["string?"]
  local exit = _g2.exit
  local table63 = _g2["table?"]
  local module_key = _g2["module-key"]
  local in63 = _g2["in?"]
  local add = _g2.add
  local parse_number = _g2["parse-number"]
  local reverse = _g2.reverse
  local apply = _g2.apply
  local replicate = _g2.replicate
  local code = _g2.code
  local splice = _g2.splice
  local make_id = _g2["make-id"]
  local last = _g2.last
  local some63 = _g2["some?"]
  local is63 = _g2["is?"]
  local map = _g2.map
  local _37message_handler = _g2["%message-handler"]
  local list63 = _g2["list?"]
  local to_string = _g2["to-string"]
  local substring = _g2.substring
  local toplevel63 = _g2["toplevel?"]
  local unstash = _g2.unstash
  local keys63 = _g2["keys?"]
  local search = _g2.search
  local empty63 = _g2["empty?"]
  local exclude = _g2.exclude
  local _ = _g2["-"]
  local module = _g2.module
  local _47 = _g2["/"]
  local sub = _g2.sub
  local length = _g2.length
  local none63 = _g2["none?"]
  local composite63 = _g2["composite?"]
  local atom63 = _g2["atom?"]
  local function63 = _g2["function?"]
  local setenv = _g2.setenv
  local keep = _g2.keep
  local join = _g2.join
  local _37 = _g2["%"]
  local char = _g2.char
  local hd = _g2.hd
  local _42 = _g2["*"]
  local _43 = _g2["+"]
  local reduce = _g2.reduce
  local id_literal63 = _g2["id-literal?"]
  local drop = _g2.drop
  local split = _g2.split
  local write = _g2.write
  local write_file = _g2["write-file"]
  local find = _g2.find
  local read_file = _g2["read-file"]
  local inner = _g2.inner
  local _60 = _g2["<"]
  local _61 = _g2["="]
  local _62 = _g2[">"]
  local sublist = _g2.sublist
  local pairwise = _g2.pairwise
  local boolean63 = _g2["boolean?"]
  local iterate = _g2.iterate
  local stash = _g2.stash
  local string_literal63 = _g2["string-literal?"]
  local nil63 = _g2["nil?"]
  local cat = _g2.cat
  local number63 = _g2["number?"]
  local _6061 = _g2["<="]
  local tl = _g2.tl
  local extend = _g2.extend
  local _g5 = nexus.reader
  local read_from_string = _g5["read-from-string"]
  local make_stream = _g5["make-stream"]
  local read_table = _g5["read-table"]
  local read_all = _g5["read-all"]
  local read = _g5.read
  local _g6 = nexus.compiler
  local lower = _g6.lower
  local eval = _g6.eval
  local compile_function = _g6["compile-function"]
  local in_module = _g6["in-module"]
  local compile = _g6.compile
  local compile_module = _g6["compile-module"]
  local open_module = _g6["open-module"]
  local load_module = _g6["load-module"]
  local function rep(str)
    local _g734,_g735 = xpcall(function ()
      return(eval(read_from_string(str)))
    end, _37message_handler)
    local _g733 = {_g734, _g735}
    local _g1 = _g733[1]
    local x = _g733[2]
    if is63(x) then
      return(print(to_string(x) .. " "))
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
    print(to_string("usage: lumen [options] <module>") .. " ")
    print(to_string("options:") .. " ")
    print(to_string("  -o <output>\tOutput file") .. " ")
    print(to_string("  -t <target>\tTarget language (default: lua)") .. " ")
    print(to_string("  -e <expr>\tExpression to evaluate") .. " ")
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
    local _g736 = args
    local i = 0
    while i < length(_g736) do
      local arg = _g736[i + 1]
      if arg == "-o" or arg == "-t" or arg == "-e" then
        if i == length(args) - 1 then
          print(to_string("missing argument for") .. " " .. to_string(arg) .. " ")
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
  local _g737 = {}
  nexus.main = _g737
  _g737.usage = usage
  _g737.main = main
  _g737.repl = repl
  _g737.rep = rep
end)();
