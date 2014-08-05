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
  local function hd(l)
    return(l[1])
  end
  nexus["lumen/runtime"].hd = hd
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
  local function sub(x, from, upto)
    if string63(x) then
      return(substring(x, from or 0, upto))
    else
      local l = {}
      local j = 0
      local _u165
      if nil63(from) or from < 0 then
        _u165 = 0
      else
        _u165 = from
      end
      local i = _u165
      local n = length(x)
      local _u166
      if nil63(upto) or upto > n then
        _u166 = n
      else
        _u166 = upto
      end
      local _u57 = _u166
      while i < _u57 do
        l[j + 1] = x[i + 1]
        i = i + 1
        j = j + 1
      end
      local _u58 = x
      local k = nil
      for k in next, _u58 do
        local v = _u58[k]
        if not number63(k) then
          l[k] = v
        end
      end
      return(l)
    end
  end
  nexus["lumen/runtime"].sub = sub
  local function keys(x)
    local t = {}
    local _u61 = x
    local k = nil
    for k in next, _u61 do
      local v = _u61[k]
      if not number63(k) then
        t[k] = v
      end
    end
    return(t)
  end
  nexus["lumen/runtime"].keys = keys
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
    local _u167
    if n then
      _u167 = n + 1
    end
    return(string.byte(str, _u167))
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
  local function butlast(l)
    return(sub(l, 0, length(l) - 1))
  end
  nexus["lumen/runtime"].butlast = butlast
  local function reverse(l)
    local l1 = keys(l)
    local i = length(l) - 1
    while i >= 0 do
      add(l1, l[i + 1])
      i = i - 1
    end
    return(l1)
  end
  nexus["lumen/runtime"].reverse = reverse
  local function join(a, b)
    if a and b then
      local c = {}
      local o = length(a)
      local _u75 = a
      local k = nil
      for k in next, _u75 do
        local v = _u75[k]
        c[k] = v
      end
      local _u77 = b
      local k = nil
      for k in next, _u77 do
        local v = _u77[k]
        if number63(k) then
          k = k + o
        end
        c[k] = v
      end
      return(c)
    else
      return(a or b or {})
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
  local function shift(k, n)
    if number63(k) then
      return(k - n)
    else
      return(k)
    end
  end
  nexus["lumen/runtime"].shift = shift
  local function keep(f, x)
    local t = {}
    local o = 0
    local _u82 = x
    local k = nil
    for k in next, _u82 do
      local v = _u82[k]
      if f(v) then
        t[shift(k, o)] = v
      else
        o = o + 1
      end
    end
    return(t)
  end
  nexus["lumen/runtime"].keep = keep
  local function in63(x, t)
    local _u85 = t
    local _u32 = nil
    for _u32 in next, _u85 do
      local y = _u85[_u32]
      if x == y then
        return(true)
      end
    end
  end
  nexus["lumen/runtime"]["in?"] = in63
  local function find(f, t)
    local _u88 = t
    local _u33 = nil
    for _u33 in next, _u88 do
      local x = _u88[_u33]
      local _u90 = f(x)
      if _u90 then
        return(_u90)
      end
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
  local function series(f, l)
    return(iterate(function (i)
      return(f(l[i + 1]))
    end, length(l)))
  end
  nexus["lumen/runtime"].series = series
  local function map(f, x)
    local t = {}
    local o = 0
    local _u100 = x
    local k = nil
    for k in next, _u100 do
      local v = _u100[k]
      local y = f(v)
      if is63(y) then
        t[shift(k, o)] = y
      else
        o = o + 1
      end
    end
    return(t)
  end
  nexus["lumen/runtime"].map = map
  local function keys63(t)
    local b = false
    local _u103 = t
    local k = nil
    for k in next, _u103 do
      local _u34 = _u103[k]
      if not number63(k) then
        b = true
        break
      end
    end
    return(b)
  end
  nexus["lumen/runtime"]["keys?"] = keys63
  local function empty63(t)
    local b = true
    local _u106 = t
    local _u35 = nil
    for _u35 in next, _u106 do
      local _u36 = _u106[_u35]
      b = false
      break
    end
    return(b)
  end
  nexus["lumen/runtime"]["empty?"] = empty63
  local function stash(args)
    if keys63(args) then
      local p = {}
      local _u109 = args
      local k = nil
      for k in next, _u109 do
        local v = _u109[k]
        if not number63(k) then
          p[k] = v
        end
      end
      p._stash = true
      add(args, p)
    end
    return(args)
  end
  nexus["lumen/runtime"].stash = stash
  local function unstash(args)
    if none63(args) then
      return({})
    else
      local l = last(args)
      if table63(l) and l._stash then
        local args1 = butlast(args)
        local _u112 = l
        local k = nil
        for k in next, _u112 do
          local v = _u112[k]
          if not (k == "_stash") then
            args1[k] = v
          end
        end
        return(args1)
      else
        return(args)
      end
    end
  end
  nexus["lumen/runtime"].unstash = unstash
  local function search(str, pattern, start)
    local _u168
    if start then
      _u168 = start + 1
    end
    local _u115 = _u168
    local i = string.find(str, pattern, _u115, true)
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
    if none63(xs) then
      return("")
    else
      return(reduce(function (a, b)
        return(a .. b)
      end, xs))
    end
  end
  nexus["lumen/runtime"].cat = cat
  local function _43(...)
    local xs = unstash({...})
    return(reduce(function (a, b)
      return(a + b)
    end, xs))
  end
  nexus["lumen/runtime"]["+"] = _43
  local function _(...)
    local xs = unstash({...})
    return(reduce(function (b, a)
      return(a - b)
    end, reverse(xs)))
  end
  nexus["lumen/runtime"]["-"] = _
  local function _42(...)
    local xs = unstash({...})
    return(reduce(function (a, b)
      return(a * b)
    end, xs))
  end
  nexus["lumen/runtime"]["*"] = _42
  local function _47(...)
    local xs = unstash({...})
    return(reduce(function (b, a)
      return(a / b)
    end, reverse(xs)))
  end
  nexus["lumen/runtime"]["/"] = _47
  local function _37(...)
    local xs = unstash({...})
    return(reduce(function (b, a)
      return(a % b)
    end, reverse(xs)))
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
            local sp = ""
            local xs = {}
            local ks = {}
            local _u142 = x
            local k = nil
            for k in next, _u142 do
              local v = _u142[k]
              if number63(k) then
                xs[k] = string(v)
              else
                add(ks, k .. ":")
                add(ks, string(v))
              end
            end
            local _u144 = join(xs, ks)
            local _u37 = nil
            for _u37 in next, _u144 do
              local v = _u144[_u37]
              str = str .. sp .. v
              sp = " "
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
    local _u152 = stash(args)
    return(f(unpack(_u152)))
  end
  nexus["lumen/runtime"].apply = apply
  local id_count = 0
  nexus["lumen/runtime"]["id-count"] = id_count
  local function uniq()
    id_count = id_count + 1
    return("_u" .. id_count)
  end
  nexus["lumen/runtime"].uniq = uniq
  local function unique()
    id_count = id_count + 1
    return("_u" .. id_count)
  end
  nexus["lumen/runtime"].unique = unique
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
    local _u160 = unstash({...})
    local keys = sub(_u160, 0)
    if string63(k) then
      local frame = last(environment)
      local x = frame[k] or {}
      local _u162 = keys
      local _u164 = nil
      for _u164 in next, _u162 do
        local v = _u162[_u164]
        x[_u164] = v
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
  local _u172 = nexus["lumen/runtime"]
  local number63 = _u172["number?"]
  local _47 = _u172["/"]
  local tl = _u172.tl
  local number = _u172.number
  local function63 = _u172["function?"]
  local _42 = _u172["*"]
  local _43 = _u172["+"]
  local _ = _u172["-"]
  local _62 = _u172[">"]
  local _6261 = _u172[">="]
  local find = _u172.find
  local _6061 = _u172["<="]
  local unique = _u172.unique
  local in63 = _u172["in?"]
  local substring = _u172.substring
  local _61 = _u172["="]
  local pair = _u172.pair
  local composite63 = _u172["composite?"]
  local reduce = _u172.reduce
  local one63 = _u172["one?"]
  local exit = _u172.exit
  local search = _u172.search
  local space = _u172.space
  local _37 = _u172["%"]
  local join = _u172.join
  local char = _u172.char
  local string = _u172.string
  local inner = _u172.inner
  local split = _u172.split
  local sub = _u172.sub
  local reverse = _u172.reverse
  local setenv = _u172.setenv
  local iterate = _u172.iterate
  local read_file = _u172["read-file"]
  local id_literal63 = _u172["id-literal?"]
  local now = _u172.now
  local module = _u172.module
  local replicate = _u172.replicate
  local some63 = _u172["some?"]
  local keep = _u172.keep
  local empty63 = _u172["empty?"]
  local write = _u172.write
  local module_key = _u172["module-key"]
  local series = _u172.series
  local toplevel63 = _u172["toplevel?"]
  local butlast = _u172.butlast
  local table63 = _u172["table?"]
  local atom63 = _u172["atom?"]
  local drop = _u172.drop
  local _37message_handler = _u172["%message-handler"]
  local uniq = _u172.uniq
  local string_literal63 = _u172["string-literal?"]
  local write_file = _u172["write-file"]
  local today = _u172.today
  local boolean63 = _u172["boolean?"]
  local apply = _u172.apply
  local none63 = _u172["none?"]
  local stash = _u172.stash
  local unstash = _u172.unstash
  local last = _u172.last
  local cat = _u172.cat
  local _60 = _u172["<"]
  local nil63 = _u172["nil?"]
  local string63 = _u172["string?"]
  local list63 = _u172["list?"]
  local sort = _u172.sort
  local length = _u172.length
  local keys63 = _u172["keys?"]
  local is63 = _u172["is?"]
  local keys = _u172.keys
  local map = _u172.map
  local code = _u172.code
  local hd = _u172.hd
  local add = _u172.add
  local function getenv(k, p)
    if string63(k) then
      local b = find(function (e)
        return(e[k])
      end, reverse(environment))
      if is63(b) then
        if p then
          return(b[p])
        else
          return(b)
        end
      end
    end
  end
  nexus["lumen/lib"].getenv = getenv
  local function macro_function(k)
    return(getenv(k, "macro"))
  end
  nexus["lumen/lib"]["macro-function"] = macro_function
  local function macro63(k)
    return(is63(macro_function(k)))
  end
  nexus["lumen/lib"]["macro?"] = macro63
  local function special63(k)
    return(is63(getenv(k, "special")))
  end
  nexus["lumen/lib"]["special?"] = special63
  local function special_form63(form)
    return(list63(form) and special63(hd(form)))
  end
  nexus["lumen/lib"]["special-form?"] = special_form63
  local function statement63(k)
    return(special63(k) and getenv(k, "stmt"))
  end
  nexus["lumen/lib"]["statement?"] = statement63
  local function symbol_expansion(k)
    return(getenv(k, "symbol"))
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
    return(getenv(k, "global"))
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
      local _u341
      if c == "\n" then
        _u341 = "\\n"
      else
        local _u342
        if c == "\"" then
          _u342 = "\\\""
        else
          local _u343
          if c == "\\" then
            _u343 = "\\\\"
          else
            _u343 = c
          end
          _u342 = _u343
        end
        _u341 = _u342
      end
      local c1 = _u341
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
  local function literal(s)
    if string_literal63(s) then
      return(s)
    else
      return(quoted(s))
    end
  end
  nexus["lumen/lib"].literal = literal
  local function stash42(args)
    if keys63(args) then
      local l = {"%object", "\"_stash\"", true}
      local _u194 = args
      local k = nil
      for k in next, _u194 do
        local v = _u194[k]
        if not number63(k) then
          add(l, literal(k))
          add(l, v)
        end
      end
      return(join(args, {l}))
    else
      return(args)
    end
  end
  nexus["lumen/lib"]["stash*"] = stash42
  local function index(k)
    if number63(k) then
      return(k - 1)
    end
  end
  nexus["lumen/lib"].index = index
  local function bias(k)
    if number63(k) and target ~= "lua" then
      if target == "js" then
        k = k - 1
      else
        k = k + 1
      end
    end
    return(k)
  end
  nexus["lumen/lib"].bias = bias
  local function bind(lh, rh)
    if composite63(lh) and list63(rh) then
      local id = unique()
      return(join({{id, rh}}, bind(lh, id)))
    else
      if atom63(lh) then
        return({{lh, rh}})
      else
        local bs = {}
        local _u204 = lh
        local k = nil
        for k in next, _u204 do
          local v = _u204[k]
          local _u344
          if k == "&" then
            _u344 = {"sub", rh, length(lh)}
          else
            _u344 = {"get", rh, {"quote", bias(k)}}
          end
          local x = _u344
          local _u345
          if v == true then
            _u345 = k
          else
            _u345 = v
          end
          local _u209 = _u345
          bs = join(bs, bind(_u209, x))
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
      local k63 = keys63(args)
      local r = unique()
      local _u226 = args
      local k = nil
      for k in next, _u226 do
        local v = _u226[k]
        if number63(k) then
          if atom63(v) then
            add(args1, v)
          else
            local x = unique()
            add(args1, x)
            bs = join(bs, {v, x})
          end
        end
      end
      if k63 then
        bs = join(bs, {r, rest()})
        bs = join(bs, {keys(args), r})
      end
      return({args1, {join({"let", bs}, body)}})
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
          local _u169 = form[1]
          local name = form[2]
          local value = form[3]
          return({"%local", name, macroexpand(value)})
        else
          if x == "%function" then
            local _u170 = form[1]
            local args = form[2]
            local body = sub(form, 2)
            add(environment, {_scope = true})
            local _u242 = args
            local _u952 = nil
            for _u952 in next, _u242 do
              local _u240 = _u242[_u952]
              setenv(_u240, {_stash = true, variable = true})
            end
            local _u241 = join({"%function", args}, macroexpand(body))
            drop(environment)
            return(_u241)
          else
            if x == "%local-function" or x == "%global-function" then
              local _u171 = form[1]
              local _u245 = form[2]
              local _u246 = form[3]
              local _u247 = sub(form, 3)
              add(environment, {_scope = true})
              local _u250 = _u246
              local _u952 = nil
              for _u952 in next, _u250 do
                local _u248 = _u250[_u952]
                setenv(_u248, {_stash = true, variable = true})
              end
              local _u249 = join({x, _u245, _u246}, macroexpand(_u247))
              drop(environment)
              return(_u249)
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
    local _u256 = form
    local k = nil
    for k in next, _u256 do
      local v = _u256[k]
      if not number63(k) then
        local _u346
        if quasisplice63(v, depth) then
          _u346 = quasiexpand(v[2])
        else
          _u346 = quasiexpand(v, depth)
        end
        local _u258 = _u346
        last(xs)[k] = _u258
      end
    end
    series(function (x)
      if quasisplice63(x, depth) then
        local _u260 = quasiexpand(x[2])
        add(xs, _u260)
        return(add(xs, {"list"}))
      else
        return(add(last(xs), quasiexpand(x, depth)))
      end
    end, form)
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
  local reserved = {["for"] = true, ["if"] = true, [">"] = true, ["<"] = true, ["debugger"] = true, ["until"] = true, ["new"] = true, ["in"] = true, ["return"] = true, ["and"] = true, ["*"] = true, ["try"] = true, ["catch"] = true, ["instanceof"] = true, ["end"] = true, ["while"] = true, ["then"] = true, ["not"] = true, ["false"] = true, ["elseif"] = true, ["function"] = true, ["with"] = true, ["delete"] = true, ["case"] = true, ["else"] = true, ["repeat"] = true, ["="] = true, ["throw"] = true, [">="] = true, ["this"] = true, ["or"] = true, ["var"] = true, ["true"] = true, ["continue"] = true, ["break"] = true, ["/"] = true, ["%"] = true, ["typeof"] = true, ["finally"] = true, ["void"] = true, ["+"] = true, ["do"] = true, ["-"] = true, ["default"] = true, ["<="] = true, ["=="] = true, ["nil"] = true, ["switch"] = true, ["local"] = true}
  nexus["lumen/lib"].reserved = reserved
  local function reserved63(x)
    return(reserved[x])
  end
  nexus["lumen/lib"]["reserved?"] = reserved63
  local function numeric63(n)
    return(n > 47 and n < 58)
  end
  nexus["lumen/lib"]["numeric?"] = numeric63
  local function valid_code63(n)
    return(numeric63(n) or n > 64 and n < 91 or n > 96 and n < 123 or n == 95)
  end
  nexus["lumen/lib"]["valid-code?"] = valid_code63
  local function valid_id63(id)
    if none63(id) or reserved63(id) then
      return(false)
    else
      local i = 0
      while i < length(id) do
        if not valid_code63(code(id, i)) then
          return(false)
        end
        i = i + 1
      end
      return(true)
    end
  end
  nexus["lumen/lib"]["valid-id?"] = valid_id63
  local function id(id)
    local id1 = ""
    local i = 0
    while i < length(id) do
      local c = char(id, i)
      local n = code(c)
      local _u347
      if c == "-" then
        _u347 = "_"
      else
        local _u348
        if valid_code63(n) then
          _u348 = c
        else
          local _u349
          if i == 0 then
            _u349 = "_" .. n
          else
            _u349 = n
          end
          _u348 = _u349
        end
        _u347 = _u348
      end
      local c1 = _u347
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
    if valid_id63(i) then
      return(i)
    else
      return(wrap(k))
    end
  end
  nexus["lumen/lib"].key = key
  local function imported(spec, ...)
    local _u299 = unstash({...})
    local private = _u299.private
    local m = unique()
    local k = module_key(spec)
    local imports = {}
    if nexus[k] then
      local _u301 = module(spec).export
      local _u303 = nil
      for _u303 in next, _u301 do
        local v = _u301[_u303]
        if v.variable and (private or v.export) then
          add(imports, {"%local", _u303, {"get", m, {"quote", _u303}}})
        end
      end
    end
    if some63(imports) then
      return(join({{"%local", m, {"get", "nexus", {"quote", k}}}}, imports))
    end
  end
  nexus["lumen/lib"].imported = imported
  local function link(name, form)
    if toplevel63() then
      local k = module_key(current_module)
      return({"do", form, {"set", {"get", {"get", "nexus", {"quote", k}}, {"quote", name}}, name}})
    else
      return(form)
    end
  end
  nexus["lumen/lib"].link = link
  local function extend(t, ...)
    local _u318 = unstash({...})
    local xs = sub(_u318, 0)
    return(join(t, xs))
  end
  nexus["lumen/lib"].extend = extend
  local function exclude(t, ...)
    local _u320 = unstash({...})
    local keys = sub(_u320, 0)
    local t1 = {}
    local _u322 = t
    local k = nil
    for k in next, _u322 do
      local v = _u322[k]
      if not keys[k] then
        t1[k] = v
      end
    end
    return(t1)
  end
  nexus["lumen/lib"].exclude = exclude
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
    local _u327 = t
    local k = nil
    for k in next, _u327 do
      local v = _u327[k]
      local x = f(v)
      if is63(x) then
        add(o, literal(k))
        add(o, x)
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
    local _u336 = {"table"}
    _u336.export = quote_frame(m.export)
    _u336.alias = quoted(m.alias)
    _u336.import = quoted(m.import)
    return(_u336)
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
  local _u350 = nexus["lumen/runtime"]
  local number63 = _u350["number?"]
  local _47 = _u350["/"]
  local tl = _u350.tl
  local number = _u350.number
  local function63 = _u350["function?"]
  local _42 = _u350["*"]
  local _43 = _u350["+"]
  local _ = _u350["-"]
  local _62 = _u350[">"]
  local _6261 = _u350[">="]
  local find = _u350.find
  local _6061 = _u350["<="]
  local unique = _u350.unique
  local in63 = _u350["in?"]
  local substring = _u350.substring
  local _61 = _u350["="]
  local pair = _u350.pair
  local composite63 = _u350["composite?"]
  local reduce = _u350.reduce
  local one63 = _u350["one?"]
  local exit = _u350.exit
  local search = _u350.search
  local space = _u350.space
  local _37 = _u350["%"]
  local join = _u350.join
  local char = _u350.char
  local string = _u350.string
  local inner = _u350.inner
  local split = _u350.split
  local sub = _u350.sub
  local reverse = _u350.reverse
  local setenv = _u350.setenv
  local iterate = _u350.iterate
  local read_file = _u350["read-file"]
  local id_literal63 = _u350["id-literal?"]
  local now = _u350.now
  local module = _u350.module
  local replicate = _u350.replicate
  local some63 = _u350["some?"]
  local keep = _u350.keep
  local empty63 = _u350["empty?"]
  local write = _u350.write
  local module_key = _u350["module-key"]
  local series = _u350.series
  local toplevel63 = _u350["toplevel?"]
  local butlast = _u350.butlast
  local table63 = _u350["table?"]
  local atom63 = _u350["atom?"]
  local drop = _u350.drop
  local _37message_handler = _u350["%message-handler"]
  local uniq = _u350.uniq
  local string_literal63 = _u350["string-literal?"]
  local write_file = _u350["write-file"]
  local today = _u350.today
  local boolean63 = _u350["boolean?"]
  local apply = _u350.apply
  local none63 = _u350["none?"]
  local stash = _u350.stash
  local unstash = _u350.unstash
  local last = _u350.last
  local cat = _u350.cat
  local _60 = _u350["<"]
  local nil63 = _u350["nil?"]
  local string63 = _u350["string?"]
  local list63 = _u350["list?"]
  local sort = _u350.sort
  local length = _u350.length
  local keys63 = _u350["keys?"]
  local is63 = _u350["is?"]
  local keys = _u350.keys
  local map = _u350.map
  local code = _u350.code
  local hd = _u350.hd
  local add = _u350.add
  local delimiters = {[";"] = true, ["("] = true, [")"] = true, ["\n"] = true}
  nexus["lumen/reader"].delimiters = delimiters
  local whitespace = {["\t"] = true, ["\n"] = true, [" "] = true}
  nexus["lumen/reader"].whitespace = whitespace
  local function make_stream(str)
    return({string = str, pos = 0, len = length(str)})
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
            return(unique())
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
          local k = butlast(x)
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
  local _u400 = nexus["lumen/runtime"]
  local number63 = _u400["number?"]
  local _47 = _u400["/"]
  local tl = _u400.tl
  local number = _u400.number
  local function63 = _u400["function?"]
  local _42 = _u400["*"]
  local _43 = _u400["+"]
  local _ = _u400["-"]
  local _62 = _u400[">"]
  local _6261 = _u400[">="]
  local find = _u400.find
  local _6061 = _u400["<="]
  local unique = _u400.unique
  local in63 = _u400["in?"]
  local substring = _u400.substring
  local _61 = _u400["="]
  local pair = _u400.pair
  local composite63 = _u400["composite?"]
  local reduce = _u400.reduce
  local one63 = _u400["one?"]
  local exit = _u400.exit
  local search = _u400.search
  local space = _u400.space
  local _37 = _u400["%"]
  local join = _u400.join
  local char = _u400.char
  local string = _u400.string
  local inner = _u400.inner
  local split = _u400.split
  local sub = _u400.sub
  local reverse = _u400.reverse
  local setenv = _u400.setenv
  local iterate = _u400.iterate
  local read_file = _u400["read-file"]
  local id_literal63 = _u400["id-literal?"]
  local now = _u400.now
  local module = _u400.module
  local replicate = _u400.replicate
  local some63 = _u400["some?"]
  local keep = _u400.keep
  local empty63 = _u400["empty?"]
  local write = _u400.write
  local module_key = _u400["module-key"]
  local series = _u400.series
  local toplevel63 = _u400["toplevel?"]
  local butlast = _u400.butlast
  local table63 = _u400["table?"]
  local atom63 = _u400["atom?"]
  local drop = _u400.drop
  local _37message_handler = _u400["%message-handler"]
  local uniq = _u400.uniq
  local string_literal63 = _u400["string-literal?"]
  local write_file = _u400["write-file"]
  local today = _u400.today
  local boolean63 = _u400["boolean?"]
  local apply = _u400.apply
  local none63 = _u400["none?"]
  local stash = _u400.stash
  local unstash = _u400.unstash
  local last = _u400.last
  local cat = _u400.cat
  local _60 = _u400["<"]
  local nil63 = _u400["nil?"]
  local string63 = _u400["string?"]
  local list63 = _u400["list?"]
  local sort = _u400.sort
  local length = _u400.length
  local keys63 = _u400["keys?"]
  local is63 = _u400["is?"]
  local keys = _u400.keys
  local map = _u400.map
  local code = _u400.code
  local hd = _u400.hd
  local add = _u400.add
  local _u403 = nexus["lumen/lib"]
  local symbol_expansion = _u403["symbol-expansion"]
  local macroexpand = _u403.macroexpand
  local link = _u403.link
  local index = _u403.index
  local quasiexpand = _u403.quasiexpand
  local key = _u403.key
  local reserved63 = _u403["reserved?"]
  local bind = _u403.bind
  local special_form63 = _u403["special-form?"]
  local getenv = _u403.getenv
  local symbol63 = _u403["symbol?"]
  local special63 = _u403["special?"]
  local quoted = _u403.quoted
  local quote_modules = _u403["quote-modules"]
  local indentation = _u403.indentation
  local valid_id63 = _u403["valid-id?"]
  local macro63 = _u403["macro?"]
  local macro_function = _u403["macro-function"]
  local variable63 = _u403["variable?"]
  local bound63 = _u403["bound?"]
  local bind42 = _u403["bind*"]
  local initial_environment = _u403["initial-environment"]
  local quote_environment = _u403["quote-environment"]
  local statement63 = _u403["statement?"]
  local id = _u403.id
  local mapo = _u403.mapo
  local stash42 = _u403["stash*"]
  local imported = _u403.imported
  local _u404 = nexus["lumen/reader"]
  local read_table = _u404["read-table"]
  local read_from_string = _u404["read-from-string"]
  local read_all = _u404["read-all"]
  local read = _u404.read
  local make_stream = _u404["make-stream"]
  local _u407 = {}
  local _u408 = {}
  _u408.lua = "not "
  _u408.js = "!"
  _u407["not"] = _u408
  local _u410 = {}
  _u410["*"] = true
  _u410["/"] = true
  _u410["%"] = true
  local _u412 = {}
  _u412["-"] = true
  _u412["+"] = true
  local _u414 = {}
  local _u415 = {}
  _u415.lua = ".."
  _u415.js = "+"
  _u414.cat = _u415
  local _u417 = {}
  _u417[">"] = true
  _u417[">="] = true
  _u417["<"] = true
  _u417["<="] = true
  local _u419 = {}
  local _u420 = {}
  _u420.lua = "=="
  _u420.js = "==="
  _u419["="] = _u420
  local _u421 = {}
  _u421.lua = "~="
  _u421.js = "!="
  _u419["~="] = _u421
  local _u423 = {}
  local _u424 = {}
  _u424.lua = "and"
  _u424.js = "&&"
  _u423["and"] = _u424
  local _u426 = {}
  local _u427 = {}
  _u427.lua = "or"
  _u427.js = "||"
  _u426["or"] = _u427
  local infix = {_u407, _u410, _u412, _u414, _u417, _u419, _u423, _u426}
  nexus["lumen/compiler"].infix = infix
  local function unary63(form)
    local op = form[1]
    local args = sub(form, 1)
    return(one63(args) and in63(op, {"not", "-"}))
  end
  nexus["lumen/compiler"]["unary?"] = unary63
  local function precedence(form)
    if list63(form) and not unary63(form) then
      local _u431 = infix
      local k = nil
      for k in next, _u431 do
        local v = _u431[k]
        if v[hd(form)] then
          return(index(k))
        end
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
    local comma = ""
    series(function (x)
      str = str .. comma .. compile(x)
      comma = ", "
    end, args)
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
    local _u441 = getenv(x)
    local stmt = _u441.stmt
    local self_tr63 = _u441.tr
    local special = _u441.special
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
    local _u444 = unstash({...})
    local right = _u444.right
    local _u544
    if right then
      _u544 = _6261
    else
      _u544 = _62
    end
    if _u544(precedence(child), precedence(parent)) then
      return({"(", ")"})
    else
      return({"", ""})
    end
  end
  nexus["lumen/compiler"]["op-delims"] = op_delims
  local function compile_infix(form)
    local op = form[1]
    local _u449 = sub(form, 1)
    local a = _u449[1]
    local b = _u449[2]
    local _u450 = op_delims(form, a)
    local ao = _u450[1]
    local ac = _u450[2]
    local _u451 = op_delims(form, b, {_stash = true, right = true})
    local bo = _u451[1]
    local bc = _u451[2]
    local _u452 = compile(a)
    local _u453 = compile(b)
    local _u454 = getop(op)
    if unary63(form) then
      return(_u454 .. ao .. _u452 .. ac)
    else
      return(ao .. _u452 .. ac .. " " .. _u454 .. " " .. bo .. _u453 .. bc)
    end
  end
  nexus["lumen/compiler"]["compile-infix"] = compile_infix
  local function compile_function(args, body, ...)
    local _u455 = unstash({...})
    local prefix = _u455.prefix
    local name = _u455.name
    local _u545
    if name then
      _u545 = compile(name)
    else
      _u545 = ""
    end
    local id = _u545
    local _u457 = prefix or ""
    local _u458 = compile_args(args)
    indent_level = indent_level + 1
    local _u460 = compile(body, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local _u459 = _u460
    local ind = indentation()
    local _u546
    if target == "js" then
      _u546 = ""
    else
      _u546 = "end"
    end
    local tr = _u546
    if name then
      tr = tr .. "\n"
    end
    if target == "js" then
      return("function " .. id .. _u458 .. " {\n" .. _u459 .. ind .. "}" .. tr)
    else
      return(_u457 .. "function " .. id .. _u458 .. "\n" .. _u459 .. ind .. tr)
    end
  end
  nexus["lumen/compiler"]["compile-function"] = compile_function
  local function can_return63(form)
    return(is63(form) and (atom63(form) or not (hd(form) == "return") and not statement63(hd(form))))
  end
  nexus["lumen/compiler"]["can-return?"] = can_return63
  compile = function (form, ...)
    local _u462 = unstash({...})
    local stmt = _u462.stmt
    if nil63(form) then
      return("")
    else
      if special_form63(form) then
        return(compile_special(form, stmt))
      else
        local tr = terminator(stmt)
        local _u547
        if stmt then
          _u547 = indentation()
        else
          _u547 = ""
        end
        local ind = _u547
        local _u548
        if atom63(form) then
          _u548 = compile_atom(form)
        else
          local _u549
          if infix63(hd(form)) then
            _u549 = compile_infix(form)
          else
            _u549 = compile_call(form)
          end
          _u548 = _u549
        end
        local _u464 = _u548
        return(ind .. _u464 .. tr)
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
    series(function (x)
      return(add(hoist, lower(x, hoist, stmt63)))
    end, butlast(args))
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
    local _u475 = args[2]
    local _u476 = args[3]
    if stmt63 or tail63 then
      local _u551
      if _u476 then
        _u551 = {lower_body({_u476}, tail63)}
      end
      return(add(hoist, join({"%if", lower(cond, hoist), lower_body({_u475}, tail63)}, _u551)))
    else
      local e = unique()
      add(hoist, {"%local", e})
      local _u550
      if _u476 then
        _u550 = {lower({"set", e, _u476})}
      end
      add(hoist, join({"%if", lower(cond, hoist), lower({"set", e, _u475})}, _u550))
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
      local id = unique()
      local _u552
      if x == "and" then
        _u552 = {"%if", id, b, id}
      else
        _u552 = {"%if", id, id, b}
      end
      return(lower({"do", {"%local", id, a}, _u552}, hoist))
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
    local _u501 = args[2]
    local body = sub(args, 2)
    return(add(hoist, {kind, name, _u501, lower_body(body, true)}))
  end
  nexus["lumen/compiler"]["lower-definition"] = lower_definition
  local function lower_call(form, hoist)
    local _u504 = map(function (x)
      return(lower(x, hoist))
    end, form)
    if some63(_u504) then
      return(_u504)
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
    local _u525 = unstash({...})
    local private = _u525.private
    local m = module(spec)
    local frame = last(environment)
    local _u527 = m.export
    local k = nil
    for k in next, _u527 do
      local v = _u527[k]
      if v.export or private then
        frame[k] = v
      end
    end
  end
  nexus["lumen/compiler"]["open-module"] = open_module
  local function load_module(spec, ...)
    local _u529 = unstash({...})
    local private = _u529.private
    if not module(spec) then
      _37compile_module(spec)
    end
    return(open_module(spec, {_stash = true, private = private}))
  end
  nexus["lumen/compiler"]["load-module"] = load_module
  local function in_module(spec)
    load_module(spec, {_stash = true, private = true})
    local m = module(spec)
    series(open_module, m.import)
    current_module = spec
  end
  nexus["lumen/compiler"]["in-module"] = in_module
  local function import_modules(specs)
    local imports = {}
    local bindings = {}
    series(function (spec)
      load_module(spec)
      local m = module(spec)
      if m.alias then
        local _u534 = import_modules(m.alias)
        local aliased = _u534[1]
        local bs = _u534[2]
        imports = join(imports, aliased)
        bindings = join(bindings, bs)
      else
        local _u535 = imported(spec)
        add(imports, spec)
        bindings = join(bindings, _u535)
      end
    end, specs or {})
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
    local imports = {}
    local m = module(current_module)
    series(function (spec)
      imports = join(imports, imported(spec))
    end, m.import)
    return(join(imports, imported(current_module, {_stash = true, private = true})))
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
  local _u553 = nexus["lumen/runtime"]
  local number63 = _u553["number?"]
  local _47 = _u553["/"]
  local tl = _u553.tl
  local number = _u553.number
  local function63 = _u553["function?"]
  local _42 = _u553["*"]
  local _43 = _u553["+"]
  local _ = _u553["-"]
  local _62 = _u553[">"]
  local _6261 = _u553[">="]
  local find = _u553.find
  local _6061 = _u553["<="]
  local unique = _u553.unique
  local in63 = _u553["in?"]
  local substring = _u553.substring
  local _61 = _u553["="]
  local pair = _u553.pair
  local composite63 = _u553["composite?"]
  local reduce = _u553.reduce
  local one63 = _u553["one?"]
  local exit = _u553.exit
  local search = _u553.search
  local space = _u553.space
  local _37 = _u553["%"]
  local join = _u553.join
  local char = _u553.char
  local string = _u553.string
  local inner = _u553.inner
  local split = _u553.split
  local sub = _u553.sub
  local reverse = _u553.reverse
  local setenv = _u553.setenv
  local iterate = _u553.iterate
  local read_file = _u553["read-file"]
  local id_literal63 = _u553["id-literal?"]
  local now = _u553.now
  local module = _u553.module
  local replicate = _u553.replicate
  local some63 = _u553["some?"]
  local keep = _u553.keep
  local empty63 = _u553["empty?"]
  local write = _u553.write
  local module_key = _u553["module-key"]
  local series = _u553.series
  local toplevel63 = _u553["toplevel?"]
  local butlast = _u553.butlast
  local table63 = _u553["table?"]
  local atom63 = _u553["atom?"]
  local drop = _u553.drop
  local _37message_handler = _u553["%message-handler"]
  local uniq = _u553.uniq
  local string_literal63 = _u553["string-literal?"]
  local write_file = _u553["write-file"]
  local today = _u553.today
  local boolean63 = _u553["boolean?"]
  local apply = _u553.apply
  local none63 = _u553["none?"]
  local stash = _u553.stash
  local unstash = _u553.unstash
  local last = _u553.last
  local cat = _u553.cat
  local _60 = _u553["<"]
  local nil63 = _u553["nil?"]
  local string63 = _u553["string?"]
  local list63 = _u553["list?"]
  local sort = _u553.sort
  local length = _u553.length
  local keys63 = _u553["keys?"]
  local is63 = _u553["is?"]
  local keys = _u553.keys
  local map = _u553.map
  local code = _u553.code
  local hd = _u553.hd
  local add = _u553.add
  local _u556 = nexus["lumen/lib"]
  local symbol_expansion = _u556["symbol-expansion"]
  local macroexpand = _u556.macroexpand
  local link = _u556.link
  local index = _u556.index
  local quasiexpand = _u556.quasiexpand
  local key = _u556.key
  local reserved63 = _u556["reserved?"]
  local bind = _u556.bind
  local special_form63 = _u556["special-form?"]
  local getenv = _u556.getenv
  local symbol63 = _u556["symbol?"]
  local special63 = _u556["special?"]
  local quoted = _u556.quoted
  local quote_modules = _u556["quote-modules"]
  local indentation = _u556.indentation
  local valid_id63 = _u556["valid-id?"]
  local macro63 = _u556["macro?"]
  local macro_function = _u556["macro-function"]
  local variable63 = _u556["variable?"]
  local bound63 = _u556["bound?"]
  local bind42 = _u556["bind*"]
  local initial_environment = _u556["initial-environment"]
  local quote_environment = _u556["quote-environment"]
  local statement63 = _u556["statement?"]
  local id = _u556.id
  local mapo = _u556.mapo
  local stash42 = _u556["stash*"]
  local imported = _u556.imported
  local _u557 = nexus["lumen/compiler"]
  local declare = _u557.declare
  local load_module = _u557["load-module"]
  local eval = _u557.eval
  local import_modules = _u557["import-modules"]
  local compile_function = _u557["compile-function"]
  local open_module = _u557["open-module"]
  local in_module = _u557["in-module"]
  local compile_module = _u557["compile-module"]
  local compile = _u557.compile
end)();
(function ()
  nexus["lumen/core"] = {}
  local _u954 = nexus["lumen/runtime"]
  local number63 = _u954["number?"]
  local _47 = _u954["/"]
  local tl = _u954.tl
  local number = _u954.number
  local function63 = _u954["function?"]
  local _42 = _u954["*"]
  local _43 = _u954["+"]
  local _ = _u954["-"]
  local _62 = _u954[">"]
  local _6261 = _u954[">="]
  local find = _u954.find
  local _6061 = _u954["<="]
  local unique = _u954.unique
  local in63 = _u954["in?"]
  local substring = _u954.substring
  local _61 = _u954["="]
  local pair = _u954.pair
  local composite63 = _u954["composite?"]
  local reduce = _u954.reduce
  local one63 = _u954["one?"]
  local exit = _u954.exit
  local search = _u954.search
  local space = _u954.space
  local _37 = _u954["%"]
  local join = _u954.join
  local char = _u954.char
  local string = _u954.string
  local inner = _u954.inner
  local split = _u954.split
  local sub = _u954.sub
  local reverse = _u954.reverse
  local setenv = _u954.setenv
  local iterate = _u954.iterate
  local read_file = _u954["read-file"]
  local id_literal63 = _u954["id-literal?"]
  local now = _u954.now
  local module = _u954.module
  local replicate = _u954.replicate
  local some63 = _u954["some?"]
  local keep = _u954.keep
  local empty63 = _u954["empty?"]
  local write = _u954.write
  local module_key = _u954["module-key"]
  local series = _u954.series
  local toplevel63 = _u954["toplevel?"]
  local butlast = _u954.butlast
  local table63 = _u954["table?"]
  local atom63 = _u954["atom?"]
  local drop = _u954.drop
  local _37message_handler = _u954["%message-handler"]
  local uniq = _u954.uniq
  local string_literal63 = _u954["string-literal?"]
  local write_file = _u954["write-file"]
  local today = _u954.today
  local boolean63 = _u954["boolean?"]
  local apply = _u954.apply
  local none63 = _u954["none?"]
  local stash = _u954.stash
  local unstash = _u954.unstash
  local last = _u954.last
  local cat = _u954.cat
  local _60 = _u954["<"]
  local nil63 = _u954["nil?"]
  local string63 = _u954["string?"]
  local list63 = _u954["list?"]
  local sort = _u954.sort
  local length = _u954.length
  local keys63 = _u954["keys?"]
  local is63 = _u954["is?"]
  local keys = _u954.keys
  local map = _u954.map
  local code = _u954.code
  local hd = _u954.hd
  local add = _u954.add
  local _u957 = nexus["lumen/lib"]
  local symbol_expansion = _u957["symbol-expansion"]
  local macroexpand = _u957.macroexpand
  local link = _u957.link
  local index = _u957.index
  local quasiexpand = _u957.quasiexpand
  local key = _u957.key
  local reserved63 = _u957["reserved?"]
  local bind = _u957.bind
  local special_form63 = _u957["special-form?"]
  local getenv = _u957.getenv
  local symbol63 = _u957["symbol?"]
  local special63 = _u957["special?"]
  local quoted = _u957.quoted
  local quote_modules = _u957["quote-modules"]
  local indentation = _u957.indentation
  local valid_id63 = _u957["valid-id?"]
  local macro63 = _u957["macro?"]
  local macro_function = _u957["macro-function"]
  local variable63 = _u957["variable?"]
  local bound63 = _u957["bound?"]
  local bind42 = _u957["bind*"]
  local initial_environment = _u957["initial-environment"]
  local quote_environment = _u957["quote-environment"]
  local statement63 = _u957["statement?"]
  local id = _u957.id
  local mapo = _u957.mapo
  local stash42 = _u957["stash*"]
  local imported = _u957.imported
  local _u958 = nexus["lumen/compiler"]
  local declare = _u958.declare
  local load_module = _u958["load-module"]
  local eval = _u958.eval
  local import_modules = _u958["import-modules"]
  local compile_function = _u958["compile-function"]
  local open_module = _u958["open-module"]
  local in_module = _u958["in-module"]
  local compile_module = _u958["compile-module"]
  local compile = _u958.compile
  target = "lua"
end)();
(function ()
  nexus["lumen/boot"] = {}
  local _u1826 = nexus["lumen/runtime"]
  local number63 = _u1826["number?"]
  local _47 = _u1826["/"]
  local tl = _u1826.tl
  local number = _u1826.number
  local function63 = _u1826["function?"]
  local _42 = _u1826["*"]
  local _43 = _u1826["+"]
  local _ = _u1826["-"]
  local _62 = _u1826[">"]
  local _6261 = _u1826[">="]
  local find = _u1826.find
  local _6061 = _u1826["<="]
  local unique = _u1826.unique
  local in63 = _u1826["in?"]
  local substring = _u1826.substring
  local _61 = _u1826["="]
  local pair = _u1826.pair
  local composite63 = _u1826["composite?"]
  local reduce = _u1826.reduce
  local one63 = _u1826["one?"]
  local exit = _u1826.exit
  local search = _u1826.search
  local space = _u1826.space
  local _37 = _u1826["%"]
  local join = _u1826.join
  local char = _u1826.char
  local string = _u1826.string
  local inner = _u1826.inner
  local split = _u1826.split
  local sub = _u1826.sub
  local reverse = _u1826.reverse
  local setenv = _u1826.setenv
  local iterate = _u1826.iterate
  local read_file = _u1826["read-file"]
  local id_literal63 = _u1826["id-literal?"]
  local now = _u1826.now
  local module = _u1826.module
  local replicate = _u1826.replicate
  local some63 = _u1826["some?"]
  local keep = _u1826.keep
  local empty63 = _u1826["empty?"]
  local write = _u1826.write
  local module_key = _u1826["module-key"]
  local series = _u1826.series
  local toplevel63 = _u1826["toplevel?"]
  local butlast = _u1826.butlast
  local table63 = _u1826["table?"]
  local atom63 = _u1826["atom?"]
  local drop = _u1826.drop
  local _37message_handler = _u1826["%message-handler"]
  local uniq = _u1826.uniq
  local string_literal63 = _u1826["string-literal?"]
  local write_file = _u1826["write-file"]
  local today = _u1826.today
  local boolean63 = _u1826["boolean?"]
  local apply = _u1826.apply
  local none63 = _u1826["none?"]
  local stash = _u1826.stash
  local unstash = _u1826.unstash
  local last = _u1826.last
  local cat = _u1826.cat
  local _60 = _u1826["<"]
  local nil63 = _u1826["nil?"]
  local string63 = _u1826["string?"]
  local list63 = _u1826["list?"]
  local sort = _u1826.sort
  local length = _u1826.length
  local keys63 = _u1826["keys?"]
  local is63 = _u1826["is?"]
  local keys = _u1826.keys
  local map = _u1826.map
  local code = _u1826.code
  local hd = _u1826.hd
  local add = _u1826.add
  local _u1829 = nexus["lumen/lib"]
  local symbol_expansion = _u1829["symbol-expansion"]
  local macroexpand = _u1829.macroexpand
  local link = _u1829.link
  local index = _u1829.index
  local quasiexpand = _u1829.quasiexpand
  local key = _u1829.key
  local reserved63 = _u1829["reserved?"]
  local bind = _u1829.bind
  local special_form63 = _u1829["special-form?"]
  local getenv = _u1829.getenv
  local symbol63 = _u1829["symbol?"]
  local special63 = _u1829["special?"]
  local quoted = _u1829.quoted
  local quote_modules = _u1829["quote-modules"]
  local indentation = _u1829.indentation
  local valid_id63 = _u1829["valid-id?"]
  local macro63 = _u1829["macro?"]
  local macro_function = _u1829["macro-function"]
  local variable63 = _u1829["variable?"]
  local bound63 = _u1829["bound?"]
  local bind42 = _u1829["bind*"]
  local initial_environment = _u1829["initial-environment"]
  local quote_environment = _u1829["quote-environment"]
  local statement63 = _u1829["statement?"]
  local id = _u1829.id
  local mapo = _u1829.mapo
  local stash42 = _u1829["stash*"]
  local imported = _u1829.imported
  local _u1830 = nexus["lumen/compiler"]
  local declare = _u1830.declare
  local load_module = _u1830["load-module"]
  local eval = _u1830.eval
  local import_modules = _u1830["import-modules"]
  local compile_function = _u1830["compile-function"]
  local open_module = _u1830["open-module"]
  local in_module = _u1830["in-module"]
  local compile_module = _u1830["compile-module"]
  local compile = _u1830.compile
  modules = {user = {import = {"lumen", {"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}}, export = {}}, ["lumen/lib"] = {import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}}, export = {["quasiquote-list"] = {variable = true}, ["symbol-expansion"] = {variable = true, export = true}, extend = {variable = true}, macroexpand = {variable = true, export = true}, ["with-indent"] = {macro = function (form)
    local result = unique()
    return({"do", {"inc", "indent-level"}, {"let", {result, form}, {"dec", "indent-level"}, result}})
  end, export = true}, link = {variable = true, export = true}, index = {variable = true, export = true}, ["can-unquote?"] = {variable = true}, quasiexpand = {variable = true, export = true}, ["quote-binding"] = {variable = true}, key = {variable = true, export = true}, ["reserved?"] = {variable = true, export = true}, bind = {variable = true, export = true}, ["special-form?"] = {variable = true, export = true}, getenv = {variable = true, export = true}, exclude = {variable = true}, ["symbol?"] = {variable = true, export = true}, ["special?"] = {variable = true, export = true}, ["global?"] = {variable = true}, ["quote-module"] = {variable = true}, ["quote-frame"] = {variable = true}, quoted = {variable = true, export = true}, ["quote-modules"] = {variable = true, export = true}, indentation = {variable = true, export = true}, ["valid-id?"] = {variable = true, export = true}, escape = {variable = true}, ["macro?"] = {variable = true, export = true}, ["macro-function"] = {variable = true, export = true}, ["quasisplice?"] = {variable = true}, reserved = {variable = true}, ["variable?"] = {variable = true, export = true}, literal = {variable = true}, ["bound?"] = {variable = true, export = true}, ["numeric?"] = {variable = true}, ["bind*"] = {variable = true, export = true}, ["initial-environment"] = {variable = true, export = true}, ["indent-level"] = {export = true, global = true}, ["quasiquoting?"] = {variable = true}, ["quoting?"] = {variable = true}, ["quote-environment"] = {variable = true, export = true}, bias = {variable = true}, ["statement?"] = {variable = true, export = true}, id = {variable = true, export = true}, mapo = {variable = true, export = true}, ["stash*"] = {variable = true, export = true}, imported = {variable = true, export = true}, ["valid-code?"] = {variable = true}}}, ["lumen/special"] = {import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}, {"lumen", "lib"}, {"lumen", "compiler"}}, export = {["%array"] = {foo = true, export = true, special = function (...)
    local forms = unstash({...})
    local _u2149
    if target == "lua" then
      _u2149 = "{"
    else
      _u2149 = "["
    end
    local open = _u2149
    local _u2150
    if target == "lua" then
      _u2150 = "}"
    else
      _u2150 = "]"
    end
    local close = _u2150
    local str = ""
    local comma = ""
    local _u1873 = forms
    local k = nil
    for k in next, _u1873 do
      local v = _u1873[k]
      if number63(k) then
        str = str .. comma .. compile(v)
        comma = ", "
      end
    end
    return(open .. str .. close)
  end}, set = {stmt = true, foo = true, special = function (lh, rh)
    local _u1876 = compile(lh)
    local _u2151
    if nil63(rh) then
      _u2151 = "nil"
    else
      _u2151 = rh
    end
    local _u1877 = compile(_u2151)
    return(indentation() .. _u1876 .. " = " .. _u1877)
  end, export = true}, ["return"] = {stmt = true, foo = true, special = function (x)
    local _u2152
    if nil63(x) then
      _u2152 = "return"
    else
      _u2152 = "return(" .. compile(x) .. ")"
    end
    local _u1879 = _u2152
    return(indentation() .. _u1879)
  end, export = true}, ["%if"] = {tr = true, export = true, stmt = true, foo = true, special = function (cond, cons, alt)
    local _u1881 = compile(cond)
    indent_level = indent_level + 1
    local _u1883 = compile(cons, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local _u1882 = _u1883
    local _u2153
    if alt then
      indent_level = indent_level + 1
      local _u1885 = compile(alt, {_stash = true, stmt = true})
      indent_level = indent_level - 1
      _u2153 = _u1885
    end
    local _u1884 = _u2153
    local ind = indentation()
    local str = ""
    if target == "js" then
      str = str .. ind .. "if (" .. _u1881 .. ") {\n" .. _u1882 .. ind .. "}"
    else
      str = str .. ind .. "if " .. _u1881 .. " then\n" .. _u1882
    end
    if _u1884 and target == "js" then
      str = str .. " else {\n" .. _u1884 .. ind .. "}"
    else
      if _u1884 then
        str = str .. ind .. "else\n" .. _u1884
      end
    end
    if target == "lua" then
      return(str .. ind .. "end\n")
    else
      return(str .. "\n")
    end
  end}, ["%local-function"] = {tr = true, export = true, stmt = true, foo = true, special = function (name, args, body)
    local x = compile_function(args, body, {_stash = true, prefix = "local ", name = name})
    return(indentation() .. x)
  end}, ["%global-function"] = {tr = true, export = true, stmt = true, foo = true, special = function (name, args, body)
    if target == "lua" then
      local x = compile_function(args, body, {_stash = true, name = name})
      return(indentation() .. x)
    else
      return(compile({"set", name, {"%function", args, body}}, {_stash = true, stmt = true}))
    end
  end}, error = {stmt = true, foo = true, special = function (x)
    local _u2154
    if target == "js" then
      _u2154 = "throw new " .. compile({"Error", x})
    else
      _u2154 = "error(" .. compile(x) .. ")"
    end
    local e = _u2154
    return(indentation() .. e)
  end, export = true}, get = {foo = true, export = true, special = function (t, k)
    local _u1893 = compile(t)
    local k1 = compile(k)
    if target == "lua" and char(_u1893, 0) == "{" then
      _u1893 = "(" .. _u1893 .. ")"
    end
    if string_literal63(k) and valid_id63(inner(k)) then
      return(_u1893 .. "." .. inner(k))
    else
      return(_u1893 .. "[" .. k1 .. "]")
    end
  end}, ["not"] = {}, ["%function"] = {foo = true, export = true, special = function (args, body)
    return(compile_function(args, body))
  end}, ["%object"] = {foo = true, export = true, special = function (...)
    local forms = unstash({...})
    local str = "{"
    local _u2155
    if target == "lua" then
      _u2155 = " = "
    else
      _u2155 = ": "
    end
    local sep = _u2155
    local comma = ""
    local _u1896 = pair(forms)
    local k = nil
    for k in next, _u1896 do
      local v = _u1896[k]
      if number63(k) then
        local _u1898 = v[1]
        local _u1899 = v[2]
        if not string63(_u1898) then
          error("Illegal key: " .. string(_u1898))
        end
        str = str .. comma .. key(_u1898) .. sep .. compile(_u1899)
        comma = ", "
      end
    end
    return(str .. "}")
  end}, ["%for"] = {tr = true, export = true, stmt = true, foo = true, special = function (t, k, form)
    local _u1901 = compile(t)
    local ind = indentation()
    indent_level = indent_level + 1
    local _u1902 = compile(form, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local body = _u1902
    if target == "lua" then
      return(ind .. "for " .. k .. " in next, " .. _u1901 .. " do\n" .. body .. ind .. "end\n")
    else
      return(ind .. "for (" .. k .. " in " .. _u1901 .. ") {\n" .. body .. ind .. "}\n")
    end
  end}, ["%try"] = {tr = true, export = true, stmt = true, foo = true, special = function (form)
    local ind = indentation()
    indent_level = indent_level + 1
    local _u1904 = compile(form, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local body = _u1904
    local e = unique()
    local hf = {"return", {"%array", false, {"get", e, "\"message\""}}}
    indent_level = indent_level + 1
    local _u1908 = compile(hf, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local h = _u1908
    return(ind .. "try {\n" .. body .. ind .. "}\n" .. ind .. "catch (" .. e .. ") {\n" .. h .. ind .. "}\n")
  end}, ["while"] = {tr = true, export = true, stmt = true, foo = true, special = function (cond, form)
    local _u1910 = compile(cond)
    indent_level = indent_level + 1
    local _u1911 = compile(form, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local body = _u1911
    local ind = indentation()
    if target == "js" then
      return(ind .. "while (" .. _u1910 .. ") {\n" .. body .. ind .. "}\n")
    else
      return(ind .. "while " .. _u1910 .. " do\n" .. body .. ind .. "end\n")
    end
  end}, ["break"] = {stmt = true, foo = true, special = function ()
    return(indentation() .. "break")
  end, export = true}, ["do"] = {tr = true, export = true, stmt = true, foo = true, special = function (...)
    local forms = unstash({...})
    local str = ""
    series(function (x)
      str = str .. compile(x, {_stash = true, stmt = true})
    end, forms)
    return(str)
  end}, ["%local"] = {stmt = true, foo = true, special = function (name, value)
    local id = compile(name)
    local value1 = compile(value)
    local _u2156
    if is63(value) then
      _u2156 = " = " .. value1
    else
      _u2156 = ""
    end
    local rh = _u2156
    local _u2157
    if target == "js" then
      _u2157 = "var "
    else
      _u2157 = "local "
    end
    local keyword = _u2157
    local ind = indentation()
    return(ind .. keyword .. id .. rh)
  end, export = true}}}, ["lumen/system"] = {import = {{"lumen", "special"}, {"lumen", "core"}}, export = {nexus = {global = true, export = true}}}, ["lumen/main"] = {import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}, {"lumen", "reader"}, {"lumen", "compiler"}}, export = {}}, ["lumen/reader"] = {import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}}, export = {eof = {variable = true}, ["read-table"] = {variable = true, export = true}, ["read-from-string"] = {variable = true, export = true}, ["read-all"] = {variable = true, export = true}, ["key?"] = {variable = true}, ["flag?"] = {variable = true}, ["skip-non-code"] = {variable = true}, ["read-char"] = {variable = true}, read = {variable = true, export = true}, delimiters = {variable = true}, ["define-reader"] = {macro = function (_u1930, ...)
    local char = _u1930[1]
    local stream = _u1930[2]
    local _u1929 = unstash({...})
    local body = sub(_u1929, 0)
    return({"set", {"get", "read-table", char}, join({"fn", {stream}}, body)})
  end, export = true}, whitespace = {variable = true}, ["make-stream"] = {variable = true, export = true}, ["peek-char"] = {variable = true}}}, ["lumen/runtime"] = {import = {{"lumen", "special"}, {"lumen", "core"}}, export = {["number?"] = {variable = true, export = true}, ["/"] = {variable = true, export = true}, tl = {variable = true, export = true}, number = {variable = true, export = true}, ["function?"] = {variable = true, export = true}, ["*"] = {variable = true, export = true}, ["+"] = {variable = true, export = true}, ["-"] = {variable = true, export = true}, [">"] = {variable = true, export = true}, [">="] = {variable = true, export = true}, find = {variable = true, export = true}, ["<="] = {variable = true, export = true}, unique = {variable = true, export = true}, ["in?"] = {variable = true, export = true}, substring = {variable = true, export = true}, ["="] = {variable = true, export = true}, pair = {variable = true, export = true}, ["composite?"] = {variable = true, export = true}, reduce = {variable = true, export = true}, ["one?"] = {variable = true, export = true}, exit = {variable = true, export = true}, search = {variable = true, export = true}, space = {variable = true, export = true}, ["%"] = {variable = true, export = true}, join = {variable = true, export = true}, char = {variable = true, export = true}, string = {variable = true, export = true}, inner = {variable = true, export = true}, split = {variable = true, export = true}, sub = {variable = true, export = true}, reverse = {variable = true, export = true}, setenv = {variable = true, export = true}, iterate = {variable = true, export = true}, ["read-file"] = {variable = true, export = true}, ["id-literal?"] = {variable = true, export = true}, now = {variable = true, export = true}, ["id-count"] = {variable = true}, shift = {variable = true}, module = {variable = true, export = true}, replicate = {variable = true, export = true}, ["some?"] = {variable = true, export = true}, keep = {variable = true, export = true}, ["empty?"] = {variable = true, export = true}, write = {variable = true, export = true}, ["module-key"] = {variable = true, export = true}, series = {variable = true, export = true}, ["toplevel?"] = {variable = true, export = true}, butlast = {variable = true, export = true}, ["table?"] = {variable = true, export = true}, ["atom?"] = {variable = true, export = true}, drop = {variable = true, export = true}, ["%message-handler"] = {variable = true, export = true}, uniq = {variable = true, export = true}, ["string-literal?"] = {variable = true, export = true}, ["write-file"] = {variable = true, export = true}, today = {variable = true, export = true}, ["boolean?"] = {variable = true, export = true}, apply = {variable = true, export = true}, ["none?"] = {variable = true, export = true}, stash = {variable = true, export = true}, unstash = {variable = true, export = true}, last = {variable = true, export = true}, cat = {variable = true, export = true}, ["<"] = {variable = true, export = true}, ["nil?"] = {variable = true, export = true}, ["string?"] = {variable = true, export = true}, ["list?"] = {variable = true, export = true}, sort = {variable = true, export = true}, length = {variable = true, export = true}, ["keys?"] = {variable = true, export = true}, ["is?"] = {variable = true, export = true}, keys = {variable = true, export = true}, map = {variable = true, export = true}, code = {variable = true, export = true}, hd = {variable = true, export = true}, add = {variable = true, export = true}}}, ["lumen/boot"] = {import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}, {"lumen", "lib"}, {"lumen", "compiler"}}, export = {["%initial-modules"] = {macro = function ()
    return(quote_modules())
  end}, modules = {global = true, export = true}, ["%initial-environment"] = {macro = function ()
    return(quote_environment(initial_environment()))
  end}}}, ["lumen/core"] = {import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}, {"lumen", "lib"}, {"lumen", "compiler"}}, export = {inc = {macro = function (n, by)
    return({"set", n, {"+", n, by or 1}})
  end, export = true}, target = {export = true, macro = function (...)
    local clauses = unstash({...})
    return(clauses[target])
  end, global = true}, ["let-macro"] = {macro = function (definitions, ...)
    local _u1957 = unstash({...})
    local body = sub(_u1957, 0)
    add(environment, {})
    map(function (m)
      return(macroexpand(join({"define-macro"}, m)))
    end, definitions)
    local _u1959 = join({"do"}, macroexpand(body))
    drop(environment)
    return(_u1959)
  end, export = true}, ["with-frame"] = {macro = function (...)
    local _u1963 = unstash({...})
    local body = sub(_u1963, 0)
    local scope = _u1963.scope
    local x = unique()
    local _u1967 = {"table"}
    _u1967._scope = scope
    return({"do", {"add", "environment", _u1967}, {"let", {x, join({"do"}, body)}, {"drop", "environment"}, x}})
  end, export = true}, dec = {macro = function (n, by)
    return({"set", n, {"-", n, by or 1}})
  end, export = true}, ["cat!"] = {macro = function (a, ...)
    local _u1975 = unstash({...})
    local bs = sub(_u1975, 0)
    return({"set", a, join({"cat", a}, bs)})
  end, export = true}, quasiquote = {macro = function (form)
    return(quasiexpand(form, 1))
  end, export = true}, when = {macro = function (cond, ...)
    local _u1980 = unstash({...})
    local body = sub(_u1980, 0)
    return({"if", cond, join({"do"}, body)})
  end, export = true}, ["if"] = {macro = function (...)
    local branches = unstash({...})
    local function step(_u1986)
      local a = _u1986[1]
      local b = _u1986[2]
      local c = sub(_u1986, 2)
      if is63(b) then
        return({join({"%if", a, b}, step(c))})
      else
        if is63(a) then
          return({a})
        end
      end
    end
    return(hd(step(branches)))
  end, export = true}, ["join!"] = {macro = function (a, ...)
    local _u1990 = unstash({...})
    local bs = sub(_u1990, 0)
    return({"set", a, join({"join*", a}, bs)})
  end, export = true}, ["set-of"] = {macro = function (...)
    local xs = unstash({...})
    local l = {}
    local _u1995 = xs
    local _u953 = nil
    for _u953 in next, _u1995 do
      local x = _u1995[_u953]
      l[x] = true
    end
    return(join({"table"}, l))
  end, export = true}, ["join*"] = {macro = function (...)
    local xs = unstash({...})
    return(reduce(function (a, b)
      return({"join", a, b})
    end, xs))
  end, export = true}, ["with-bindings"] = {macro = function (_u2002, ...)
    local names = _u2002[1]
    local _u2001 = unstash({...})
    local body = sub(_u2001, 0)
    local x = unique()
    local _u2007 = {"setenv", x}
    _u2007.variable = true
    local _u2004 = {"with-frame", {"all", {"_u952", x}, names, _u2007}}
    _u2004.scope = true
    return(join(_u2004, body))
  end, export = true}, unless = {macro = function (cond, ...)
    local _u2008 = unstash({...})
    local body = sub(_u2008, 0)
    return({"if", {"not", cond}, join({"do"}, body)})
  end, export = true}, pr = {macro = function (...)
    local xs = unstash({...})
    return({"print", space(xs)})
  end, export = true}, let = {macro = function (bindings, ...)
    local _u2015 = unstash({...})
    local body = sub(_u2015, 0)
    if length(bindings) < 2 then
      return(join({"do"}, body))
    else
      local renames = {}
      local locals = {}
      local lh = bindings[1]
      local rh = bindings[2]
      local _u2018 = bind(lh, rh)
      local k = nil
      for k in next, _u2018 do
        local _u2020 = _u2018[k]
        local id = _u2020[1]
        local val = _u2020[2]
        if number63(k) then
          if bound63(id) or reserved63(id) or toplevel63() then
            local id1 = unique()
            add(renames, id)
            add(renames, id1)
            id = id1
          else
            setenv(id, {_stash = true, variable = true})
          end
          add(locals, {"%local", id, val})
        end
      end
      return(join({"do"}, join(locals, {{"let-symbol", renames, join({"let", sub(bindings, 2)}, body)}})))
    end
  end, export = true}, ["define-special"] = {macro = function (name, args, ...)
    local _u2026 = unstash({...})
    local body = sub(_u2026, 0)
    local form = join({"fn", args}, body)
    local _u2029 = {"setenv", {"quote", name}}
    _u2029.form = {"quote", form}
    _u2029.special = form
    eval(join(_u2029, keys(body)))
    return(nil)
  end, export = true}, ["define-macro"] = {macro = function (name, args, ...)
    local _u2032 = unstash({...})
    local body = sub(_u2032, 0)
    local form = join({"fn", args}, body)
    local _u2035 = {"setenv", {"quote", name}}
    _u2035.macro = form
    _u2035.form = {"quote", form}
    eval(_u2035)
    return(nil)
  end, export = true}, all = {macro = function (_u2039, t, ...)
    local k = _u2039[1]
    local v = _u2039[2]
    local _u2038 = unstash({...})
    local body = sub(_u2038, 0)
    local x = unique()
    local n = unique()
    local _u2158
    if target == "lua" then
      _u2158 = body
    else
      _u2158 = {join({"let", {n, {"parseInt", k}, k, {"if", {"isNaN", n}, k, n}}}, body)}
    end
    return({"let", {x, t, k, "nil"}, {"%for", x, k, join({"let", {v, {"get", x, k}}}, _u2158)}})
  end, export = true}, fn = {macro = function (args, ...)
    local _u2053 = unstash({...})
    local body = sub(_u2053, 0)
    local _u2055 = bind42(args, body)
    local _u2056 = _u2055[1]
    local _u2057 = _u2055[2]
    return(join({"%function", _u2056}, _u2057))
  end, export = true}, ["let-symbol"] = {macro = function (expansions, ...)
    local _u2059 = unstash({...})
    local body = sub(_u2059, 0)
    add(environment, {})
    map(function (_u2063)
      local name = _u2063[1]
      local exp = _u2063[2]
      return(macroexpand({"define-symbol", name, exp}))
    end, pair(expansions))
    local _u2061 = join({"do"}, macroexpand(body))
    drop(environment)
    return(_u2061)
  end, export = true}, ["set*"] = {macro = function (name, value)
    return(link(name, {"set", name, value}))
  end, export = true}, list = {macro = function (...)
    local body = unstash({...})
    local l = {}
    local forms = {}
    local id = unique()
    local _u2069 = body
    local k = nil
    for k in next, _u2069 do
      local v = _u2069[k]
      if number63(k) then
        l[k] = v
      else
        add(forms, {"set", {"get", id, {"quote", k}}, v})
      end
    end
    if some63(forms) then
      return(join({"let", {id, join({"%array"}, l)}}, join(forms, {id})))
    else
      return(join({"%array"}, l))
    end
  end, export = true}, ["define*"] = {macro = function (name, x, ...)
    local _u2079 = unstash({...})
    local body = sub(_u2079, 0)
    setenv(name, {_stash = true, global = true, export = true})
    if some63(body) then
      local _u2081 = bind42(x, body)
      local args = _u2081[1]
      local _u2082 = _u2081[2]
      return(join({"%global-function", name, args}, _u2082))
    else
      if target == "js" then
        return({"set", {"get", "global", {"quote", id(name)}}, x})
      else
        return({"set", name, x})
      end
    end
  end, export = true}, ["define-module"] = {macro = function (spec, ...)
    local _u2088 = unstash({...})
    local body = sub(_u2088, 0)
    local exp = body.export
    local alias = body.alias
    local imp = body.import
    local _u2090 = import_modules(imp)
    local imports = _u2090[1]
    local bindings = _u2090[2]
    local k = module_key(spec)
    modules[k] = {import = imports, alias = alias, export = {}}
    local _u2091 = exp or {}
    local _u951 = nil
    for _u951 in next, _u2091 do
      local x = _u2091[_u951]
      setenv(x, {_stash = true, export = true})
    end
    return(join({"do", {"set", {"get", "nexus", {"quote", k}}, {"table"}}}, bindings))
  end, export = true}, ["define-symbol"] = {macro = function (name, expansion)
    setenv(name, {_stash = true, symbol = expansion})
    return(nil)
  end, export = true}, guard = {macro = function (expr)
    if target == "js" then
      return({{"fn", {}, {"%try", {"list", true, expr}}}})
    else
      local e = unique()
      local x = unique()
      local ex = "|" .. e .. "," .. x .. "|"
      return({"let", {ex, {"xpcall", {"fn", {}, expr}, "%message-handler"}}, {"list", e, x}})
    end
  end, export = true}, table = {macro = function (...)
    local body = unstash({...})
    return(join({"%object"}, mapo(function (x)
      return(x)
    end, body)))
  end, export = true}, language = {macro = function ()
    return({"quote", target})
  end, export = true}, define = {macro = function (name, x, ...)
    local _u2114 = unstash({...})
    local body = sub(_u2114, 0)
    setenv(name, {_stash = true, variable = true})
    if some63(body) and target == "js" then
      return(link(name, {"%local", name, join({"fn", x}, body)}))
    else
      if some63(body) then
        local _u2118 = bind42(x, body)
        local args = _u2118[1]
        local _u2119 = _u2118[2]
        return(link(name, join({"%local-function", name, args}, _u2119)))
      else
        return(link(name, {"%local", name, x}))
      end
    end
  end, export = true}, quote = {macro = function (form)
    return(quoted(form))
  end, export = true}, at = {macro = function (l, i)
    if target == "lua" and number63(i) then
      i = i + 1
    else
      if target == "lua" then
        i = {"+", i, 1}
      end
    end
    return({"get", l, i})
  end, export = true}}}, ["lumen/compiler"] = {import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}, {"lumen", "lib"}, {"lumen", "reader"}}, export = {declare = {variable = true, export = true}, ["compile-args"] = {variable = true}, encapsulate = {variable = true}, ["load-module"] = {variable = true, export = true}, lower = {variable = true}, ["lower-short"] = {variable = true}, ["unary?"] = {variable = true}, ["lower-infix?"] = {variable = true}, eval = {variable = true, export = true}, ["lower-if"] = {variable = true}, ["infix?"] = {variable = true}, ["compiling?"] = {variable = true}, ["import-modules"] = {variable = true, export = true}, ["compile-function"] = {variable = true, export = true}, ["open-module"] = {variable = true, export = true}, ["compiler-output"] = {variable = true}, ["lower-try"] = {variable = true}, reimported = {variable = true}, ["%result"] = {export = true, global = true}, ["lower-definition"] = {variable = true}, ["op-delims"] = {variable = true}, ["%compile-module"] = {variable = true}, run = {variable = true}, ["compile-file"] = {variable = true}, ["module-path"] = {variable = true}, ["lower-while"] = {variable = true}, ["compile-special"] = {variable = true}, ["lower-for"] = {variable = true}, ["lower-special"] = {variable = true}, ["lower-do"] = {variable = true}, process = {variable = true}, ["lower-call"] = {variable = true}, conclude = {variable = true}, ["in-module"] = {variable = true, export = true}, ["compile-infix"] = {variable = true}, ["compile-atom"] = {variable = true}, terminator = {variable = true}, ["can-return?"] = {variable = true}, ["compile-module"] = {variable = true, export = true}, getop = {variable = true}, ["lower-infix"] = {variable = true}, ["current-module"] = {export = true, global = true}, precedence = {variable = true}, ["parenthesize-call?"] = {variable = true}, infix = {variable = true}, ["lower-body"] = {variable = true}, ["lower-statement"] = {variable = true}, compile = {variable = true, export = true}, ["lower-function"] = {variable = true}, ["compile-call"] = {variable = true}}}, lumen = {import = {{"lumen", "special"}}, alias = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}}, export = {}}}
  environment = {{["define-module"] = {macro = function (spec, ...)
    local _u2139 = unstash({...})
    local body = sub(_u2139, 0)
    local exp = body.export
    local alias = body.alias
    local imp = body.import
    local _u2141 = import_modules(imp)
    local imports = _u2141[1]
    local bindings = _u2141[2]
    local k = module_key(spec)
    modules[k] = {import = imports, alias = alias, export = {}}
    local _u2142 = exp or {}
    local _u951 = nil
    for _u951 in next, _u2142 do
      local x = _u2142[_u951]
      setenv(x, {_stash = true, export = true})
    end
    return(join({"do", {"set", {"get", "nexus", {"quote", k}}, {"table"}}}, bindings))
  end, export = true}}}
end)();
(function ()
  nexus.user = {}
  local _u2159 = nexus["lumen/runtime"]
  local number63 = _u2159["number?"]
  local _47 = _u2159["/"]
  local tl = _u2159.tl
  local number = _u2159.number
  local function63 = _u2159["function?"]
  local _42 = _u2159["*"]
  local _43 = _u2159["+"]
  local _ = _u2159["-"]
  local _62 = _u2159[">"]
  local _6261 = _u2159[">="]
  local find = _u2159.find
  local _6061 = _u2159["<="]
  local unique = _u2159.unique
  local in63 = _u2159["in?"]
  local substring = _u2159.substring
  local _61 = _u2159["="]
  local pair = _u2159.pair
  local composite63 = _u2159["composite?"]
  local reduce = _u2159.reduce
  local one63 = _u2159["one?"]
  local exit = _u2159.exit
  local search = _u2159.search
  local space = _u2159.space
  local _37 = _u2159["%"]
  local join = _u2159.join
  local char = _u2159.char
  local string = _u2159.string
  local inner = _u2159.inner
  local split = _u2159.split
  local sub = _u2159.sub
  local reverse = _u2159.reverse
  local setenv = _u2159.setenv
  local iterate = _u2159.iterate
  local read_file = _u2159["read-file"]
  local id_literal63 = _u2159["id-literal?"]
  local now = _u2159.now
  local module = _u2159.module
  local replicate = _u2159.replicate
  local some63 = _u2159["some?"]
  local keep = _u2159.keep
  local empty63 = _u2159["empty?"]
  local write = _u2159.write
  local module_key = _u2159["module-key"]
  local series = _u2159.series
  local toplevel63 = _u2159["toplevel?"]
  local butlast = _u2159.butlast
  local table63 = _u2159["table?"]
  local atom63 = _u2159["atom?"]
  local drop = _u2159.drop
  local _37message_handler = _u2159["%message-handler"]
  local uniq = _u2159.uniq
  local string_literal63 = _u2159["string-literal?"]
  local write_file = _u2159["write-file"]
  local today = _u2159.today
  local boolean63 = _u2159["boolean?"]
  local apply = _u2159.apply
  local none63 = _u2159["none?"]
  local stash = _u2159.stash
  local unstash = _u2159.unstash
  local last = _u2159.last
  local cat = _u2159.cat
  local _60 = _u2159["<"]
  local nil63 = _u2159["nil?"]
  local string63 = _u2159["string?"]
  local list63 = _u2159["list?"]
  local sort = _u2159.sort
  local length = _u2159.length
  local keys63 = _u2159["keys?"]
  local is63 = _u2159["is?"]
  local keys = _u2159.keys
  local map = _u2159.map
  local code = _u2159.code
  local hd = _u2159.hd
  local add = _u2159.add
end)();
(function ()
  nexus["lumen/main"] = {}
  local _u2 = nexus["lumen/runtime"]
  local number63 = _u2["number?"]
  local _47 = _u2["/"]
  local tl = _u2.tl
  local number = _u2.number
  local function63 = _u2["function?"]
  local _42 = _u2["*"]
  local _43 = _u2["+"]
  local _ = _u2["-"]
  local none63 = _u2["none?"]
  local stash = _u2.stash
  local find = _u2.find
  local _6061 = _u2["<="]
  local unique = _u2.unique
  local substring = _u2.substring
  local _61 = _u2["="]
  local list63 = _u2["list?"]
  local composite63 = _u2["composite?"]
  local reduce = _u2.reduce
  local one63 = _u2["one?"]
  local exit = _u2.exit
  local search = _u2.search
  local space = _u2.space
  local _37 = _u2["%"]
  local join = _u2.join
  local char = _u2.char
  local string = _u2.string
  local inner = _u2.inner
  local split = _u2.split
  local sub = _u2.sub
  local reverse = _u2.reverse
  local setenv = _u2.setenv
  local iterate = _u2.iterate
  local read_file = _u2["read-file"]
  local id_literal63 = _u2["id-literal?"]
  local now = _u2.now
  local _62 = _u2[">"]
  local keys63 = _u2["keys?"]
  local _6261 = _u2[">="]
  local replicate = _u2.replicate
  local some63 = _u2["some?"]
  local keep = _u2.keep
  local empty63 = _u2["empty?"]
  local write = _u2.write
  local pair = _u2.pair
  local series = _u2.series
  local _60 = _u2["<"]
  local butlast = _u2.butlast
  local table63 = _u2["table?"]
  local atom63 = _u2["atom?"]
  local drop = _u2.drop
  local write_file = _u2["write-file"]
  local module = _u2.module
  local uniq = _u2.uniq
  local string63 = _u2["string?"]
  local today = _u2.today
  local boolean63 = _u2["boolean?"]
  local apply = _u2.apply
  local hd = _u2.hd
  local in63 = _u2["in?"]
  local unstash = _u2.unstash
  local last = _u2.last
  local cat = _u2.cat
  local _37message_handler = _u2["%message-handler"]
  local module_key = _u2["module-key"]
  local code = _u2.code
  local sort = _u2.sort
  local length = _u2.length
  local nil63 = _u2["nil?"]
  local is63 = _u2["is?"]
  local keys = _u2.keys
  local map = _u2.map
  local toplevel63 = _u2["toplevel?"]
  local string_literal63 = _u2["string-literal?"]
  local add = _u2.add
  local _u5 = nexus["lumen/reader"]
  local read_table = _u5["read-table"]
  local read_from_string = _u5["read-from-string"]
  local read_all = _u5["read-all"]
  local make_stream = _u5["make-stream"]
  local read = _u5.read
  local _u6 = nexus["lumen/compiler"]
  local eval = _u6.eval
  local import_modules = _u6["import-modules"]
  local compile_function = _u6["compile-function"]
  local open_module = _u6["open-module"]
  local load_module = _u6["load-module"]
  local compile = _u6.compile
  local declare = _u6.declare
  local in_module = _u6["in-module"]
  local compile_module = _u6["compile-module"]
  local function rep(str)
    local _u2164,_u2165 = xpcall(function ()
      return(eval(read_from_string(str)))
    end, _37message_handler)
    local _u2163 = {_u2164, _u2165}
    local _u1 = _u2163[1]
    local x = _u2163[2]
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
    local n = length(args)
    local i = 0
    while i < n do
      local arg = args[i + 1]
      if arg == "-o" or arg == "-t" or arg == "-e" then
        if i == n - 1 then
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
