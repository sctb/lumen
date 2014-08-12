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
  local function hd61(l, x)
    return(list63(l) and hd(l) == x)
  end
  nexus["lumen/runtime"]["hd="] = hd61
  local function substring(s, from, upto)
    return(string.sub(s, from + 1, upto))
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
      local _u58 = _u166
      while i < _u58 do
        l[j + 1] = x[i + 1]
        i = i + 1
        j = j + 1
      end
      local _u59 = x
      local k = nil
      for k in next, _u59 do
        local v = _u59[k]
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
    local _u62 = x
    local k = nil
    for k in next, _u62 do
      local v = _u62[k]
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
  local function char(s, n)
    return(sub(s, n, n + 1))
  end
  nexus["lumen/runtime"].char = char
  local function code(s, n)
    local _u167
    if n then
      _u167 = n + 1
    end
    return(string.byte(s, _u167))
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
      local _u76 = a
      local k = nil
      for k in next, _u76 do
        local v = _u76[k]
        c[k] = v
      end
      local _u78 = b
      local k = nil
      for k in next, _u78 do
        local v = _u78[k]
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
    local _u83 = x
    local k = nil
    for k in next, _u83 do
      local v = _u83[k]
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
    local _u86 = t
    local _u32 = nil
    for _u32 in next, _u86 do
      local y = _u86[_u32]
      if x == y then
        return(true)
      end
    end
  end
  nexus["lumen/runtime"]["in?"] = in63
  local function find(f, t)
    local _u89 = t
    local _u33 = nil
    for _u33 in next, _u89 do
      local x = _u89[_u33]
      local _u91 = f(x)
      if _u91 then
        return(_u91)
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
    local _u101 = x
    local k = nil
    for k in next, _u101 do
      local v = _u101[k]
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
    local _u104 = t
    local k = nil
    for k in next, _u104 do
      local _u34 = _u104[k]
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
    local _u107 = t
    local _u35 = nil
    for _u35 in next, _u107 do
      local _u36 = _u107[_u35]
      b = false
      break
    end
    return(b)
  end
  nexus["lumen/runtime"]["empty?"] = empty63
  local function stash(args)
    if keys63(args) then
      local p = {}
      local _u110 = args
      local k = nil
      for k in next, _u110 do
        local v = _u110[k]
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
        local _u113 = l
        local k = nil
        for k in next, _u113 do
          local v = _u113[k]
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
  local function search(s, pattern, start)
    local _u168
    if start then
      _u168 = start + 1
    end
    local _u116 = _u168
    local i = string.find(s, pattern, _u116, true)
    return(i and i - 1)
  end
  nexus["lumen/runtime"].search = search
  local function split(s, sep)
    if s == "" or sep == "" then
      return({})
    else
      local l = {}
      while true do
        local i = search(s, sep)
        if nil63(i) then
          break
        else
          add(l, sub(s, 0, i))
          s = sub(s, i + 1)
        end
      end
      add(l, s)
      return(l)
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
  local function number(s)
    return(tonumber(s))
  end
  nexus["lumen/runtime"].number = number
  local function string(x, depth)
    if depth and depth > 5 then
      return("#<circular>")
    else
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
              local s = "("
              local sp = ""
              local xs = {}
              local ks = {}
              local d = (depth or 0) + 1
              local _u143 = x
              local k = nil
              for k in next, _u143 do
                local v = _u143[k]
                if number63(k) then
                  xs[k] = string(v, d)
                else
                  add(ks, k .. ":")
                  add(ks, string(v, d))
                end
              end
              local _u145 = join(xs, ks)
              local _u37 = nil
              for _u37 in next, _u145 do
                local v = _u145[_u37]
                s = s .. sp .. v
                sp = " "
              end
              return(s .. ")")
            end
          end
        end
      end
    end
  end
  nexus["lumen/runtime"].string = string
  local function space(xs)
    local string = function (x)
      if string_literal63(x) or hd61(x, "cat") then
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
    local _u153 = stash(args)
    return(f(unpack(_u153)))
  end
  nexus["lumen/runtime"].apply = apply
  local id_count = 0
  nexus["lumen/runtime"]["id-count"] = id_count
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
  local keep = _u172.keep
  local iterate = _u172.iterate
  local replicate = _u172.replicate
  local sort = _u172.sort
  local last = _u172.last
  local hd61 = _u172["hd="]
  local reverse = _u172.reverse
  local length = _u172.length
  local number63 = _u172["number?"]
  local search = _u172.search
  local hd = _u172.hd
  local tl = _u172.tl
  local number = _u172.number
  local table63 = _u172["table?"]
  local module = _u172.module
  local stash = _u172.stash
  local list63 = _u172["list?"]
  local split = _u172.split
  local is63 = _u172["is?"]
  local nil63 = _u172["nil?"]
  local _42 = _u172["*"]
  local code = _u172.code
  local some63 = _u172["some?"]
  local id_literal63 = _u172["id-literal?"]
  local map = _u172.map
  local setenv = _u172.setenv
  local _6061 = _u172["<="]
  local in63 = _u172["in?"]
  local string63 = _u172["string?"]
  local sub = _u172.sub
  local keys63 = _u172["keys?"]
  local _6261 = _u172[">="]
  local boolean63 = _u172["boolean?"]
  local butlast = _u172.butlast
  local exit = _u172.exit
  local composite63 = _u172["composite?"]
  local unique = _u172.unique
  local add = _u172.add
  local _62 = _u172[">"]
  local _61 = _u172["="]
  local unstash = _u172.unstash
  local _60 = _u172["<"]
  local string = _u172.string
  local module_key = _u172["module-key"]
  local read_file = _u172["read-file"]
  local toplevel63 = _u172["toplevel?"]
  local inner = _u172.inner
  local find = _u172.find
  local _37message_handler = _u172["%message-handler"]
  local apply = _u172.apply
  local space = _u172.space
  local now = _u172.now
  local atom63 = _u172["atom?"]
  local keys = _u172.keys
  local today = _u172.today
  local _37 = _u172["%"]
  local write = _u172.write
  local drop = _u172.drop
  local one63 = _u172["one?"]
  local none63 = _u172["none?"]
  local _47 = _u172["/"]
  local series = _u172.series
  local _ = _u172["-"]
  local _43 = _u172["+"]
  local reduce = _u172.reduce
  local function63 = _u172["function?"]
  local cat = _u172.cat
  local write_file = _u172["write-file"]
  local pair = _u172.pair
  local empty63 = _u172["empty?"]
  local join = _u172.join
  local char = _u172.char
  local substring = _u172.substring
  local string_literal63 = _u172["string-literal?"]
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
  local function escape(s)
    local s1 = "\""
    local i = 0
    while i < length(s) do
      local c = char(s, i)
      local _u345
      if c == "\n" then
        _u345 = "\\n"
      else
        local _u346
        if c == "\"" then
          _u346 = "\\\""
        else
          local _u347
          if c == "\\" then
            _u347 = "\\\\"
          else
            _u347 = c
          end
          _u346 = _u347
        end
        _u345 = _u346
      end
      local c1 = _u345
      s1 = s1 .. c1
      i = i + 1
    end
    return(s1 .. "\"")
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
    if number63(k) and not (target == "lua") then
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
          local _u348
          if k == "rest" then
            _u348 = {"sub", rh, length(lh)}
          else
            _u348 = {"get", rh, {"quote", bias(k)}}
          end
          local x = _u348
          local _u349
          if v == true then
            _u349 = k
          else
            _u349 = v
          end
          local _u209 = _u349
          bs = join(bs, bind(_u209, x))
        end
        return(bs)
      end
    end
  end
  nexus["lumen/lib"].bind = bind
  local function bind42(args, body)
    local args1 = {}
    local rest = function ()
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
            local _u957 = nil
            for _u957 in next, _u242 do
              local _u240 = _u242[_u957]
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
              local _u957 = nil
              for _u957 in next, _u250 do
                local _u248 = _u250[_u957]
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
        local _u350
        if quasisplice63(v, depth) then
          _u350 = quasiexpand(v[2])
        else
          _u350 = quasiexpand(v, depth)
        end
        local _u258 = _u350
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
  local function expand_if(_u268)
    local a = _u268[1]
    local b = _u268[2]
    local c = sub(_u268, 2)
    if is63(b) then
      return({join({"%if", a, b}, expand_if(c))})
    else
      if is63(a) then
        return({a})
      end
    end
  end
  nexus["lumen/lib"]["expand-if"] = expand_if
  indent_level = 0
  local function indentation()
    return(apply(cat, replicate(indent_level, "  ")))
  end
  nexus["lumen/lib"].indentation = indentation
  local reserved = {["do"] = true, ["var"] = true, ["for"] = true, ["in"] = true, ["delete"] = true, ["*"] = true, ["function"] = true, ["return"] = true, ["catch"] = true, ["default"] = true, ["break"] = true, ["continue"] = true, ["and"] = true, ["try"] = true, [">"] = true, ["<"] = true, ["this"] = true, ["void"] = true, ["=="] = true, ["case"] = true, ["instanceof"] = true, ["%"] = true, ["until"] = true, ["-"] = true, ["+"] = true, ["if"] = true, ["local"] = true, ["while"] = true, ["or"] = true, ["not"] = true, ["new"] = true, ["true"] = true, ["repeat"] = true, ["then"] = true, ["finally"] = true, ["false"] = true, ["typeof"] = true, ["end"] = true, ["switch"] = true, ["throw"] = true, ["with"] = true, ["/"] = true, ["="] = true, ["nil"] = true, ["else"] = true, ["debugger"] = true, [">="] = true, ["elseif"] = true, ["<="] = true}
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
      local _u351
      if c == "-" then
        _u351 = "_"
      else
        local _u352
        if valid_code63(n) then
          _u352 = c
        else
          local _u353
          if i == 0 then
            _u353 = "_" .. n
          else
            _u353 = n
          end
          _u352 = _u353
        end
        _u351 = _u352
      end
      local c1 = _u351
      id1 = id1 .. c1
      i = i + 1
    end
    return(id1)
  end
  nexus["lumen/lib"].id = id
  local function key(k)
    local i = inner(k)
    if valid_id63(i) then
      return(i)
    else
      if target == "js" then
        return(k)
      else
        return("[" .. k .. "]")
      end
    end
  end
  nexus["lumen/lib"].key = key
  local function imported(spec, ...)
    local _u303 = unstash({...})
    local private = _u303.private
    local m = unique()
    local k = module_key(spec)
    local imports = {}
    if nexus[k] then
      local _u305 = module(spec).export
      local _u307 = nil
      for _u307 in next, _u305 do
        local v = _u305[_u307]
        if v.variable and (private or v.export) then
          add(imports, {"%local", _u307, {"get", m, {"quote", _u307}}})
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
    local _u322 = unstash({...})
    local xs = sub(_u322, 0)
    return(join(t, xs))
  end
  nexus["lumen/lib"].extend = extend
  local function exclude(t, ...)
    local _u324 = unstash({...})
    local keys = sub(_u324, 0)
    local t1 = {}
    local _u326 = t
    local k = nil
    for k in next, _u326 do
      local v = _u326[k]
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
    local _u331 = t
    local k = nil
    for k in next, _u331 do
      local v = _u331[k]
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
    local _u340 = {"table"}
    _u340.export = quote_frame(m.export)
    _u340.import = quoted(m.import)
    _u340.alias = quoted(m.alias)
    return(_u340)
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
  local _u354 = nexus["lumen/runtime"]
  local keep = _u354.keep
  local iterate = _u354.iterate
  local replicate = _u354.replicate
  local sort = _u354.sort
  local last = _u354.last
  local hd61 = _u354["hd="]
  local reverse = _u354.reverse
  local length = _u354.length
  local number63 = _u354["number?"]
  local search = _u354.search
  local hd = _u354.hd
  local tl = _u354.tl
  local number = _u354.number
  local table63 = _u354["table?"]
  local module = _u354.module
  local stash = _u354.stash
  local list63 = _u354["list?"]
  local split = _u354.split
  local is63 = _u354["is?"]
  local nil63 = _u354["nil?"]
  local _42 = _u354["*"]
  local code = _u354.code
  local some63 = _u354["some?"]
  local id_literal63 = _u354["id-literal?"]
  local map = _u354.map
  local setenv = _u354.setenv
  local _6061 = _u354["<="]
  local in63 = _u354["in?"]
  local string63 = _u354["string?"]
  local sub = _u354.sub
  local keys63 = _u354["keys?"]
  local _6261 = _u354[">="]
  local boolean63 = _u354["boolean?"]
  local butlast = _u354.butlast
  local exit = _u354.exit
  local composite63 = _u354["composite?"]
  local unique = _u354.unique
  local add = _u354.add
  local _62 = _u354[">"]
  local _61 = _u354["="]
  local unstash = _u354.unstash
  local _60 = _u354["<"]
  local string = _u354.string
  local module_key = _u354["module-key"]
  local read_file = _u354["read-file"]
  local toplevel63 = _u354["toplevel?"]
  local inner = _u354.inner
  local find = _u354.find
  local _37message_handler = _u354["%message-handler"]
  local apply = _u354.apply
  local space = _u354.space
  local now = _u354.now
  local atom63 = _u354["atom?"]
  local keys = _u354.keys
  local today = _u354.today
  local _37 = _u354["%"]
  local write = _u354.write
  local drop = _u354.drop
  local one63 = _u354["one?"]
  local none63 = _u354["none?"]
  local _47 = _u354["/"]
  local series = _u354.series
  local _ = _u354["-"]
  local _43 = _u354["+"]
  local reduce = _u354.reduce
  local function63 = _u354["function?"]
  local cat = _u354.cat
  local write_file = _u354["write-file"]
  local pair = _u354.pair
  local empty63 = _u354["empty?"]
  local join = _u354.join
  local char = _u354.char
  local substring = _u354.substring
  local string_literal63 = _u354["string-literal?"]
  local delimiters = {["\n"] = true, ["("] = true, [")"] = true, [";"] = true}
  nexus["lumen/reader"].delimiters = delimiters
  local whitespace = {["\n"] = true, ["\t"] = true, [" "] = true}
  nexus["lumen/reader"].whitespace = whitespace
  local function stream(str)
    return({len = length(str), pos = 0, string = str})
  end
  nexus["lumen/reader"].stream = stream
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
    local x = read(stream(str))
    if not (x == eof) then
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
  local _u404 = nexus["lumen/runtime"]
  local keep = _u404.keep
  local iterate = _u404.iterate
  local replicate = _u404.replicate
  local sort = _u404.sort
  local last = _u404.last
  local hd61 = _u404["hd="]
  local reverse = _u404.reverse
  local length = _u404.length
  local number63 = _u404["number?"]
  local search = _u404.search
  local hd = _u404.hd
  local tl = _u404.tl
  local number = _u404.number
  local table63 = _u404["table?"]
  local module = _u404.module
  local stash = _u404.stash
  local list63 = _u404["list?"]
  local split = _u404.split
  local is63 = _u404["is?"]
  local nil63 = _u404["nil?"]
  local _42 = _u404["*"]
  local code = _u404.code
  local some63 = _u404["some?"]
  local id_literal63 = _u404["id-literal?"]
  local map = _u404.map
  local setenv = _u404.setenv
  local _6061 = _u404["<="]
  local in63 = _u404["in?"]
  local string63 = _u404["string?"]
  local sub = _u404.sub
  local keys63 = _u404["keys?"]
  local _6261 = _u404[">="]
  local boolean63 = _u404["boolean?"]
  local butlast = _u404.butlast
  local exit = _u404.exit
  local composite63 = _u404["composite?"]
  local unique = _u404.unique
  local add = _u404.add
  local _62 = _u404[">"]
  local _61 = _u404["="]
  local unstash = _u404.unstash
  local _60 = _u404["<"]
  local string = _u404.string
  local module_key = _u404["module-key"]
  local read_file = _u404["read-file"]
  local toplevel63 = _u404["toplevel?"]
  local inner = _u404.inner
  local find = _u404.find
  local _37message_handler = _u404["%message-handler"]
  local apply = _u404.apply
  local space = _u404.space
  local now = _u404.now
  local atom63 = _u404["atom?"]
  local keys = _u404.keys
  local today = _u404.today
  local _37 = _u404["%"]
  local write = _u404.write
  local drop = _u404.drop
  local one63 = _u404["one?"]
  local none63 = _u404["none?"]
  local _47 = _u404["/"]
  local series = _u404.series
  local _ = _u404["-"]
  local _43 = _u404["+"]
  local reduce = _u404.reduce
  local function63 = _u404["function?"]
  local cat = _u404.cat
  local write_file = _u404["write-file"]
  local pair = _u404.pair
  local empty63 = _u404["empty?"]
  local join = _u404.join
  local char = _u404.char
  local substring = _u404.substring
  local string_literal63 = _u404["string-literal?"]
  local _u407 = nexus["lumen/lib"]
  local quote_environment = _u407["quote-environment"]
  local stash42 = _u407["stash*"]
  local macroexpand = _u407.macroexpand
  local mapo = _u407.mapo
  local reserved63 = _u407["reserved?"]
  local getenv = _u407.getenv
  local id = _u407.id
  local indentation = _u407.indentation
  local index = _u407.index
  local link = _u407.link
  local statement63 = _u407["statement?"]
  local special_form63 = _u407["special-form?"]
  local imported = _u407.imported
  local quote_modules = _u407["quote-modules"]
  local key = _u407.key
  local special63 = _u407["special?"]
  local quoted = _u407.quoted
  local bind = _u407.bind
  local expand_if = _u407["expand-if"]
  local macro_function = _u407["macro-function"]
  local bound63 = _u407["bound?"]
  local bind42 = _u407["bind*"]
  local symbol63 = _u407["symbol?"]
  local macro63 = _u407["macro?"]
  local symbol_expansion = _u407["symbol-expansion"]
  local initial_environment = _u407["initial-environment"]
  local variable63 = _u407["variable?"]
  local quasiexpand = _u407.quasiexpand
  local valid_id63 = _u407["valid-id?"]
  local _u408 = nexus["lumen/reader"]
  local read = _u408.read
  local read_all = _u408["read-all"]
  local read_from_string = _u408["read-from-string"]
  local stream = _u408.stream
  local read_table = _u408["read-table"]
  local _u411 = {}
  local _u412 = {}
  _u412.lua = "not "
  _u412.js = "!"
  _u411["not"] = _u412
  local _u414 = {}
  _u414["*"] = true
  _u414["%"] = true
  _u414["/"] = true
  local _u416 = {}
  _u416["+"] = true
  _u416["-"] = true
  local _u418 = {}
  local _u419 = {}
  _u419.lua = ".."
  _u419.js = "+"
  _u418.cat = _u419
  local _u421 = {}
  _u421[">"] = true
  _u421[">="] = true
  _u421["<"] = true
  _u421["<="] = true
  local _u423 = {}
  local _u424 = {}
  _u424.lua = "=="
  _u424.js = "==="
  _u423["="] = _u424
  local _u426 = {}
  local _u427 = {}
  _u427.lua = "and"
  _u427.js = "&&"
  _u426["and"] = _u427
  local _u429 = {}
  local _u430 = {}
  _u430.lua = "or"
  _u430.js = "||"
  _u429["or"] = _u430
  local infix = {_u411, _u414, _u416, _u418, _u421, _u423, _u426, _u429}
  nexus["lumen/compiler"].infix = infix
  local function unary63(form)
    return(length(form) == 2 and in63(hd(form), {"not", "-"}))
  end
  nexus["lumen/compiler"]["unary?"] = unary63
  local function precedence(form)
    if list63(form) and not unary63(form) then
      local _u434 = infix
      local k = nil
      for k in next, _u434 do
        local v = _u434[k]
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
    local s = "("
    local c = ""
    series(function (x)
      s = s .. c .. compile(x)
      c = ", "
    end, args)
    return(s .. ")")
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
    local _u444 = getenv(x)
    local self_tr63 = _u444.tr
    local stmt = _u444.stmt
    local special = _u444.special
    local tr = terminator(stmt63 and not self_tr63)
    return(apply(special, args) .. tr)
  end
  nexus["lumen/compiler"]["compile-special"] = compile_special
  local function parenthesize_call63(x)
    return(hd61(x, "%function") or precedence(x) > 0)
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
    local _u447 = unstash({...})
    local right = _u447.right
    local _u549
    if right then
      _u549 = _6261
    else
      _u549 = _62
    end
    if _u549(precedence(child), precedence(parent)) then
      return({"(", ")"})
    else
      return({"", ""})
    end
  end
  nexus["lumen/compiler"]["op-delims"] = op_delims
  local function compile_infix(form)
    local op = form[1]
    local _u452 = sub(form, 1)
    local a = _u452[1]
    local b = _u452[2]
    local _u453 = op_delims(form, a)
    local ao = _u453[1]
    local ac = _u453[2]
    local _u454 = op_delims(form, b, {_stash = true, right = true})
    local bo = _u454[1]
    local bc = _u454[2]
    local _u455 = compile(a)
    local _u456 = compile(b)
    local _u457 = getop(op)
    if unary63(form) then
      return(_u457 .. ao .. _u455 .. ac)
    else
      return(ao .. _u455 .. ac .. " " .. _u457 .. " " .. bo .. _u456 .. bc)
    end
  end
  nexus["lumen/compiler"]["compile-infix"] = compile_infix
  local function compile_function(args, body, ...)
    local _u458 = unstash({...})
    local name = _u458.name
    local prefix = _u458.prefix
    local _u550
    if name then
      _u550 = compile(name)
    else
      _u550 = ""
    end
    local id = _u550
    local _u460 = prefix or ""
    local _u461 = compile_args(args)
    indent_level = indent_level + 1
    local _u463 = compile(body, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local _u462 = _u463
    local ind = indentation()
    local _u551
    if target == "js" then
      _u551 = ""
    else
      _u551 = "end"
    end
    local tr = _u551
    if name then
      tr = tr .. "\n"
    end
    if target == "js" then
      return("function " .. id .. _u461 .. " {\n" .. _u462 .. ind .. "}" .. tr)
    else
      return(_u460 .. "function " .. id .. _u461 .. "\n" .. _u462 .. ind .. tr)
    end
  end
  nexus["lumen/compiler"]["compile-function"] = compile_function
  local function can_return63(form)
    return(is63(form) and (atom63(form) or not (hd(form) == "return") and not statement63(hd(form))))
  end
  nexus["lumen/compiler"]["can-return?"] = can_return63
  compile = function (form, ...)
    local _u465 = unstash({...})
    local stmt = _u465.stmt
    if nil63(form) then
      return("")
    else
      if special_form63(form) then
        return(compile_special(form, stmt))
      else
        local tr = terminator(stmt)
        local _u552
        if stmt then
          _u552 = indentation()
        else
          _u552 = ""
        end
        local ind = _u552
        local _u553
        if atom63(form) then
          _u553 = compile_atom(form)
        else
          local _u554
          if infix63(hd(form)) then
            _u554 = compile_infix(form)
          else
            _u554 = compile_call(form)
          end
          _u553 = _u554
        end
        local _u467 = _u553
        return(ind .. _u467 .. tr)
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
    local _u478 = args[2]
    local _u479 = args[3]
    if stmt63 or tail63 then
      local _u556
      if _u479 then
        _u556 = {lower_body({_u479}, tail63)}
      end
      return(add(hoist, join({"%if", lower(cond, hoist), lower_body({_u478}, tail63)}, _u556)))
    else
      local e = unique()
      add(hoist, {"%local", e})
      local _u555
      if _u479 then
        _u555 = {lower({"set", e, _u479})}
      end
      add(hoist, join({"%if", lower(cond, hoist), lower({"set", e, _u478})}, _u555))
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
      local _u557
      if x == "and" then
        _u557 = {"%if", id, b, id}
      else
        _u557 = {"%if", id, id, b}
      end
      return(lower({"do", {"%local", id, a}, _u557}, hoist))
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
    local _u504 = args[2]
    local body = sub(args, 2)
    return(add(hoist, {kind, name, _u504, lower_body(body, true)}))
  end
  nexus["lumen/compiler"]["lower-definition"] = lower_definition
  local function lower_call(form, hoist)
    local _u507 = map(function (x)
      return(lower(x, hoist))
    end, form)
    if some63(_u507) then
      return(_u507)
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
  local in_module
  nexus["lumen/compiler"]["in-module"] = in_module
  local function _37compile_module(spec)
    local path = module_path(spec)
    local mod0 = current_module
    local env0 = environment
    environment = initial_environment()
    local s = stream(read_file(path))
    local first = read(s)
    if not hd61(first, "define-module") then
      current_module = "user"
      in_module("user")
    end
    local body = join({first}, read_all(s))
    local form = encapsulate(body)
    local code = compile(form) .. ";\n"
    local _u528 = current_module
    current_module = mod0
    environment = env0
    conclude(code)
    return(_u528)
  end
  nexus["lumen/compiler"]["%compile-module"] = _37compile_module
  local function open_module(spec, ...)
    local _u529 = unstash({...})
    local private = _u529.private
    local m = module(spec)
    local frame = last(environment)
    local _u531 = m.export
    local k = nil
    for k in next, _u531 do
      local v = _u531[k]
      if v.export or private then
        frame[k] = v
      end
    end
  end
  nexus["lumen/compiler"]["open-module"] = open_module
  local function load_module(spec, ...)
    local _u533 = unstash({...})
    local private = _u533.private
    if not module(spec) then
      spec = _37compile_module(spec)
    end
    open_module(spec, {_stash = true, private = private})
    return(spec)
  end
  nexus["lumen/compiler"]["load-module"] = load_module
  in_module = function (spec)
    local _u536 = load_module(spec, {_stash = true, private = true})
    local m = module(_u536)
    series(open_module, m.import)
    current_module = _u536
  end
  nexus["lumen/compiler"]["in-module"] = in_module
  local function import_modules(specs)
    local imports = {}
    local bindings = {}
    series(function (spec)
      load_module(spec)
      local m = module(spec)
      if m.alias then
        local _u539 = import_modules(m.alias)
        local aliased = _u539[1]
        local bs = _u539[2]
        imports = join(imports, aliased)
        bindings = join(bindings, bs)
      else
        local _u540 = imported(spec)
        add(imports, spec)
        bindings = join(bindings, _u540)
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
  local function context()
    local imports = {}
    local m = module(current_module)
    series(function (spec)
      imports = join(imports, imported(spec))
    end, m.import)
    return(join(imports, imported(current_module, {_stash = true, private = true})))
  end
  nexus["lumen/compiler"].context = context
  _37result = nil
  local function eval(form)
    local previous = target
    target = "lua"
    local body = join(context(), {{"set", "%result", form}})
    local code = compile(encapsulate(body))
    target = previous
    run(code)
    return(_37result)
  end
  nexus["lumen/compiler"].eval = eval
end)();
(function ()
  nexus["lumen/special"] = {}
  local _u558 = nexus["lumen/runtime"]
  local keep = _u558.keep
  local iterate = _u558.iterate
  local replicate = _u558.replicate
  local sort = _u558.sort
  local last = _u558.last
  local hd61 = _u558["hd="]
  local reverse = _u558.reverse
  local length = _u558.length
  local number63 = _u558["number?"]
  local search = _u558.search
  local hd = _u558.hd
  local tl = _u558.tl
  local number = _u558.number
  local table63 = _u558["table?"]
  local module = _u558.module
  local stash = _u558.stash
  local list63 = _u558["list?"]
  local split = _u558.split
  local is63 = _u558["is?"]
  local nil63 = _u558["nil?"]
  local _42 = _u558["*"]
  local code = _u558.code
  local some63 = _u558["some?"]
  local id_literal63 = _u558["id-literal?"]
  local map = _u558.map
  local setenv = _u558.setenv
  local _6061 = _u558["<="]
  local in63 = _u558["in?"]
  local string63 = _u558["string?"]
  local sub = _u558.sub
  local keys63 = _u558["keys?"]
  local _6261 = _u558[">="]
  local boolean63 = _u558["boolean?"]
  local butlast = _u558.butlast
  local exit = _u558.exit
  local composite63 = _u558["composite?"]
  local unique = _u558.unique
  local add = _u558.add
  local _62 = _u558[">"]
  local _61 = _u558["="]
  local unstash = _u558.unstash
  local _60 = _u558["<"]
  local string = _u558.string
  local module_key = _u558["module-key"]
  local read_file = _u558["read-file"]
  local toplevel63 = _u558["toplevel?"]
  local inner = _u558.inner
  local find = _u558.find
  local _37message_handler = _u558["%message-handler"]
  local apply = _u558.apply
  local space = _u558.space
  local now = _u558.now
  local atom63 = _u558["atom?"]
  local keys = _u558.keys
  local today = _u558.today
  local _37 = _u558["%"]
  local write = _u558.write
  local drop = _u558.drop
  local one63 = _u558["one?"]
  local none63 = _u558["none?"]
  local _47 = _u558["/"]
  local series = _u558.series
  local _ = _u558["-"]
  local _43 = _u558["+"]
  local reduce = _u558.reduce
  local function63 = _u558["function?"]
  local cat = _u558.cat
  local write_file = _u558["write-file"]
  local pair = _u558.pair
  local empty63 = _u558["empty?"]
  local join = _u558.join
  local char = _u558.char
  local substring = _u558.substring
  local string_literal63 = _u558["string-literal?"]
  local _u561 = nexus["lumen/lib"]
  local quote_environment = _u561["quote-environment"]
  local stash42 = _u561["stash*"]
  local macroexpand = _u561.macroexpand
  local mapo = _u561.mapo
  local reserved63 = _u561["reserved?"]
  local getenv = _u561.getenv
  local id = _u561.id
  local indentation = _u561.indentation
  local index = _u561.index
  local link = _u561.link
  local statement63 = _u561["statement?"]
  local special_form63 = _u561["special-form?"]
  local imported = _u561.imported
  local quote_modules = _u561["quote-modules"]
  local key = _u561.key
  local special63 = _u561["special?"]
  local quoted = _u561.quoted
  local bind = _u561.bind
  local expand_if = _u561["expand-if"]
  local macro_function = _u561["macro-function"]
  local bound63 = _u561["bound?"]
  local bind42 = _u561["bind*"]
  local symbol63 = _u561["symbol?"]
  local macro63 = _u561["macro?"]
  local symbol_expansion = _u561["symbol-expansion"]
  local initial_environment = _u561["initial-environment"]
  local variable63 = _u561["variable?"]
  local quasiexpand = _u561.quasiexpand
  local valid_id63 = _u561["valid-id?"]
  local _u562 = nexus["lumen/compiler"]
  local compile = _u562.compile
  local compile_module = _u562["compile-module"]
  local in_module = _u562["in-module"]
  local load_module = _u562["load-module"]
  local declare = _u562.declare
  local compile_function = _u562["compile-function"]
  local eval = _u562.eval
  local open_module = _u562["open-module"]
  local import_modules = _u562["import-modules"]
end)();
(function ()
  nexus["lumen/core"] = {}
  local _u959 = nexus["lumen/runtime"]
  local keep = _u959.keep
  local iterate = _u959.iterate
  local replicate = _u959.replicate
  local sort = _u959.sort
  local last = _u959.last
  local hd61 = _u959["hd="]
  local reverse = _u959.reverse
  local length = _u959.length
  local number63 = _u959["number?"]
  local search = _u959.search
  local hd = _u959.hd
  local tl = _u959.tl
  local number = _u959.number
  local table63 = _u959["table?"]
  local module = _u959.module
  local stash = _u959.stash
  local list63 = _u959["list?"]
  local split = _u959.split
  local is63 = _u959["is?"]
  local nil63 = _u959["nil?"]
  local _42 = _u959["*"]
  local code = _u959.code
  local some63 = _u959["some?"]
  local id_literal63 = _u959["id-literal?"]
  local map = _u959.map
  local setenv = _u959.setenv
  local _6061 = _u959["<="]
  local in63 = _u959["in?"]
  local string63 = _u959["string?"]
  local sub = _u959.sub
  local keys63 = _u959["keys?"]
  local _6261 = _u959[">="]
  local boolean63 = _u959["boolean?"]
  local butlast = _u959.butlast
  local exit = _u959.exit
  local composite63 = _u959["composite?"]
  local unique = _u959.unique
  local add = _u959.add
  local _62 = _u959[">"]
  local _61 = _u959["="]
  local unstash = _u959.unstash
  local _60 = _u959["<"]
  local string = _u959.string
  local module_key = _u959["module-key"]
  local read_file = _u959["read-file"]
  local toplevel63 = _u959["toplevel?"]
  local inner = _u959.inner
  local find = _u959.find
  local _37message_handler = _u959["%message-handler"]
  local apply = _u959.apply
  local space = _u959.space
  local now = _u959.now
  local atom63 = _u959["atom?"]
  local keys = _u959.keys
  local today = _u959.today
  local _37 = _u959["%"]
  local write = _u959.write
  local drop = _u959.drop
  local one63 = _u959["one?"]
  local none63 = _u959["none?"]
  local _47 = _u959["/"]
  local series = _u959.series
  local _ = _u959["-"]
  local _43 = _u959["+"]
  local reduce = _u959.reduce
  local function63 = _u959["function?"]
  local cat = _u959.cat
  local write_file = _u959["write-file"]
  local pair = _u959.pair
  local empty63 = _u959["empty?"]
  local join = _u959.join
  local char = _u959.char
  local substring = _u959.substring
  local string_literal63 = _u959["string-literal?"]
  local _u962 = nexus["lumen/lib"]
  local quote_environment = _u962["quote-environment"]
  local stash42 = _u962["stash*"]
  local macroexpand = _u962.macroexpand
  local mapo = _u962.mapo
  local reserved63 = _u962["reserved?"]
  local getenv = _u962.getenv
  local id = _u962.id
  local indentation = _u962.indentation
  local index = _u962.index
  local link = _u962.link
  local statement63 = _u962["statement?"]
  local special_form63 = _u962["special-form?"]
  local imported = _u962.imported
  local quote_modules = _u962["quote-modules"]
  local key = _u962.key
  local special63 = _u962["special?"]
  local quoted = _u962.quoted
  local bind = _u962.bind
  local expand_if = _u962["expand-if"]
  local macro_function = _u962["macro-function"]
  local bound63 = _u962["bound?"]
  local bind42 = _u962["bind*"]
  local symbol63 = _u962["symbol?"]
  local macro63 = _u962["macro?"]
  local symbol_expansion = _u962["symbol-expansion"]
  local initial_environment = _u962["initial-environment"]
  local variable63 = _u962["variable?"]
  local quasiexpand = _u962.quasiexpand
  local valid_id63 = _u962["valid-id?"]
  local _u963 = nexus["lumen/compiler"]
  local compile = _u963.compile
  local compile_module = _u963["compile-module"]
  local in_module = _u963["in-module"]
  local load_module = _u963["load-module"]
  local declare = _u963.declare
  local compile_function = _u963["compile-function"]
  local eval = _u963.eval
  local open_module = _u963["open-module"]
  local import_modules = _u963["import-modules"]
  target = "lua"
end)();
(function ()
  nexus["lumen/boot"] = {}
  local _u1826 = nexus["lumen/runtime"]
  local keep = _u1826.keep
  local iterate = _u1826.iterate
  local replicate = _u1826.replicate
  local sort = _u1826.sort
  local last = _u1826.last
  local hd61 = _u1826["hd="]
  local reverse = _u1826.reverse
  local length = _u1826.length
  local number63 = _u1826["number?"]
  local search = _u1826.search
  local hd = _u1826.hd
  local tl = _u1826.tl
  local number = _u1826.number
  local table63 = _u1826["table?"]
  local module = _u1826.module
  local stash = _u1826.stash
  local list63 = _u1826["list?"]
  local split = _u1826.split
  local is63 = _u1826["is?"]
  local nil63 = _u1826["nil?"]
  local _42 = _u1826["*"]
  local code = _u1826.code
  local some63 = _u1826["some?"]
  local id_literal63 = _u1826["id-literal?"]
  local map = _u1826.map
  local setenv = _u1826.setenv
  local _6061 = _u1826["<="]
  local in63 = _u1826["in?"]
  local string63 = _u1826["string?"]
  local sub = _u1826.sub
  local keys63 = _u1826["keys?"]
  local _6261 = _u1826[">="]
  local boolean63 = _u1826["boolean?"]
  local butlast = _u1826.butlast
  local exit = _u1826.exit
  local composite63 = _u1826["composite?"]
  local unique = _u1826.unique
  local add = _u1826.add
  local _62 = _u1826[">"]
  local _61 = _u1826["="]
  local unstash = _u1826.unstash
  local _60 = _u1826["<"]
  local string = _u1826.string
  local module_key = _u1826["module-key"]
  local read_file = _u1826["read-file"]
  local toplevel63 = _u1826["toplevel?"]
  local inner = _u1826.inner
  local find = _u1826.find
  local _37message_handler = _u1826["%message-handler"]
  local apply = _u1826.apply
  local space = _u1826.space
  local now = _u1826.now
  local atom63 = _u1826["atom?"]
  local keys = _u1826.keys
  local today = _u1826.today
  local _37 = _u1826["%"]
  local write = _u1826.write
  local drop = _u1826.drop
  local one63 = _u1826["one?"]
  local none63 = _u1826["none?"]
  local _47 = _u1826["/"]
  local series = _u1826.series
  local _ = _u1826["-"]
  local _43 = _u1826["+"]
  local reduce = _u1826.reduce
  local function63 = _u1826["function?"]
  local cat = _u1826.cat
  local write_file = _u1826["write-file"]
  local pair = _u1826.pair
  local empty63 = _u1826["empty?"]
  local join = _u1826.join
  local char = _u1826.char
  local substring = _u1826.substring
  local string_literal63 = _u1826["string-literal?"]
  local _u1829 = nexus["lumen/lib"]
  local quote_environment = _u1829["quote-environment"]
  local stash42 = _u1829["stash*"]
  local macroexpand = _u1829.macroexpand
  local mapo = _u1829.mapo
  local reserved63 = _u1829["reserved?"]
  local getenv = _u1829.getenv
  local id = _u1829.id
  local indentation = _u1829.indentation
  local index = _u1829.index
  local link = _u1829.link
  local statement63 = _u1829["statement?"]
  local special_form63 = _u1829["special-form?"]
  local imported = _u1829.imported
  local quote_modules = _u1829["quote-modules"]
  local key = _u1829.key
  local special63 = _u1829["special?"]
  local quoted = _u1829.quoted
  local bind = _u1829.bind
  local expand_if = _u1829["expand-if"]
  local macro_function = _u1829["macro-function"]
  local bound63 = _u1829["bound?"]
  local bind42 = _u1829["bind*"]
  local symbol63 = _u1829["symbol?"]
  local macro63 = _u1829["macro?"]
  local symbol_expansion = _u1829["symbol-expansion"]
  local initial_environment = _u1829["initial-environment"]
  local variable63 = _u1829["variable?"]
  local quasiexpand = _u1829.quasiexpand
  local valid_id63 = _u1829["valid-id?"]
  local _u1830 = nexus["lumen/compiler"]
  local compile = _u1830.compile
  local compile_module = _u1830["compile-module"]
  local in_module = _u1830["in-module"]
  local load_module = _u1830["load-module"]
  local declare = _u1830.declare
  local compile_function = _u1830["compile-function"]
  local eval = _u1830.eval
  local open_module = _u1830["open-module"]
  local import_modules = _u1830["import-modules"]
  modules = {["lumen/runtime"] = {export = {keep = {variable = true, export = true}, iterate = {variable = true, export = true}, replicate = {variable = true, export = true}, sort = {variable = true, export = true}, last = {variable = true, export = true}, ["hd="] = {variable = true, export = true}, reverse = {variable = true, export = true}, length = {variable = true, export = true}, ["number?"] = {variable = true, export = true}, search = {variable = true, export = true}, shift = {variable = true}, hd = {variable = true, export = true}, tl = {variable = true, export = true}, number = {variable = true, export = true}, ["table?"] = {variable = true, export = true}, module = {variable = true, export = true}, stash = {variable = true, export = true}, ["list?"] = {variable = true, export = true}, split = {variable = true, export = true}, ["is?"] = {variable = true, export = true}, ["nil?"] = {variable = true, export = true}, ["*"] = {variable = true, export = true}, code = {variable = true, export = true}, ["some?"] = {variable = true, export = true}, ["id-literal?"] = {variable = true, export = true}, map = {variable = true, export = true}, setenv = {variable = true, export = true}, ["<="] = {variable = true, export = true}, ["in?"] = {variable = true, export = true}, ["string?"] = {variable = true, export = true}, sub = {variable = true, export = true}, ["keys?"] = {variable = true, export = true}, [">="] = {variable = true, export = true}, ["boolean?"] = {variable = true, export = true}, butlast = {variable = true, export = true}, exit = {variable = true, export = true}, ["composite?"] = {variable = true, export = true}, unique = {variable = true, export = true}, add = {variable = true, export = true}, [">"] = {variable = true, export = true}, ["="] = {variable = true, export = true}, unstash = {variable = true, export = true}, ["<"] = {variable = true, export = true}, string = {variable = true, export = true}, ["module-key"] = {variable = true, export = true}, ["read-file"] = {variable = true, export = true}, ["toplevel?"] = {variable = true, export = true}, inner = {variable = true, export = true}, find = {variable = true, export = true}, ["%message-handler"] = {variable = true, export = true}, apply = {variable = true, export = true}, space = {variable = true, export = true}, ["id-count"] = {variable = true}, now = {variable = true, export = true}, ["atom?"] = {variable = true, export = true}, keys = {variable = true, export = true}, today = {variable = true, export = true}, ["%"] = {variable = true, export = true}, write = {variable = true, export = true}, drop = {variable = true, export = true}, ["one?"] = {variable = true, export = true}, ["none?"] = {variable = true, export = true}, ["/"] = {variable = true, export = true}, series = {variable = true, export = true}, ["-"] = {variable = true, export = true}, ["+"] = {variable = true, export = true}, reduce = {variable = true, export = true}, ["function?"] = {variable = true, export = true}, cat = {variable = true, export = true}, ["write-file"] = {variable = true, export = true}, pair = {variable = true, export = true}, ["empty?"] = {variable = true, export = true}, join = {variable = true, export = true}, char = {variable = true, export = true}, substring = {variable = true, export = true}, ["string-literal?"] = {variable = true, export = true}}, import = {{"lumen", "special"}, {"lumen", "core"}}}, ["lumen/core"] = {export = {["define-module"] = {export = true, macro = function (spec, ...)
    local _u1855 = unstash({...})
    local body = sub(_u1855, 0)
    local alias = body.alias
    local imp = body.import
    local exp = body.export
    local _u1857 = import_modules(imp)
    local imports = _u1857[1]
    local bindings = _u1857[2]
    local k = module_key(spec)
    current_module = spec
    modules[k] = {export = {}, import = imports, alias = alias}
    local _u1858 = exp or {}
    local _u956 = nil
    for _u956 in next, _u1858 do
      local x = _u1858[_u956]
      setenv(x, {_stash = true, export = true})
    end
    return(join({"do", {"set", {"get", "nexus", {"quote", k}}, {"table"}}}, bindings))
  end}, ["with-frame"] = {export = true, macro = function (...)
    local _u1865 = unstash({...})
    local body = sub(_u1865, 0)
    local scope = _u1865.scope
    local x = unique()
    local _u1869 = {"table"}
    _u1869._scope = scope
    return({"do", {"add", "environment", _u1869}, {"let", {x, join({"do"}, body)}, {"drop", "environment"}, x}})
  end}, ["define-global"] = {export = true, macro = function (name, x, ...)
    local _u1874 = unstash({...})
    local body = sub(_u1874, 0)
    setenv(name, {_stash = true, export = true, global = true})
    if some63(body) then
      local _u1876 = bind42(x, body)
      local args = _u1876[1]
      local _u1877 = _u1876[2]
      return(join({"%global-function", name, args}, _u1877))
    else
      if target == "js" then
        return({"set", {"get", "global", {"quote", id(name)}}, x})
      else
        return({"set", name, x})
      end
    end
  end}, ["define-symbol"] = {export = true, macro = function (name, expansion)
    setenv(name, {_stash = true, symbol = expansion})
    return(nil)
  end}, pr = {export = true, macro = function (...)
    local xs = unstash({...})
    return({"print", space(xs)})
  end}, ["let-symbol"] = {export = true, macro = function (expansions, ...)
    local _u1886 = unstash({...})
    local body = sub(_u1886, 0)
    add(environment, {})
    map(function (_u1890)
      local name = _u1890[1]
      local exp = _u1890[2]
      return(macroexpand({"define-symbol", name, exp}))
    end, pair(expansions))
    local _u1888 = join({"do"}, macroexpand(body))
    drop(environment)
    return(_u1888)
  end}, ["join*"] = {export = true, macro = function (...)
    local xs = unstash({...})
    return(reduce(function (a, b)
      return({"join", a, b})
    end, xs))
  end}, at = {export = true, macro = function (l, i)
    if target == "lua" and number63(i) then
      i = i + 1
    else
      if target == "lua" then
        i = {"+", i, 1}
      end
    end
    return({"get", l, i})
  end}, dec = {export = true, macro = function (n, by)
    return({"set", n, {"-", n, by or 1}})
  end}, inc = {export = true, macro = function (n, by)
    return({"set", n, {"+", n, by or 1}})
  end}, quote = {export = true, macro = function (form)
    return(quoted(form))
  end}, ["cat!"] = {export = true, macro = function (a, ...)
    local _u1906 = unstash({...})
    local bs = sub(_u1906, 0)
    return({"set", a, join({"cat", a}, bs)})
  end}, all = {export = true, macro = function (_u1911, t, ...)
    local k = _u1911[1]
    local v = _u1911[2]
    local _u1910 = unstash({...})
    local body = sub(_u1910, 0)
    local x = unique()
    local n = unique()
    local _u2146
    if target == "lua" then
      _u2146 = body
    else
      _u2146 = {join({"let", {n, {"parseInt", k}, k, {"if", {"isNaN", n}, k, n}}}, body)}
    end
    return({"let", {x, t, k, "nil"}, {"%for", x, k, join({"let", {v, {"get", x, k}}}, _u2146)}})
  end}, quasiquote = {export = true, macro = function (form)
    return(quasiexpand(form, 1))
  end}, ["join!"] = {export = true, macro = function (a, ...)
    local _u1926 = unstash({...})
    local bs = sub(_u1926, 0)
    return({"set", a, join({"join*", a}, bs)})
  end}, target = {export = true, macro = function (...)
    local clauses = unstash({...})
    return(clauses[target])
  end, global = true}, language = {export = true, macro = function ()
    return({"quote", target})
  end}, ["set-of"] = {export = true, macro = function (...)
    local xs = unstash({...})
    local l = {}
    local _u1934 = xs
    local _u958 = nil
    for _u958 in next, _u1934 do
      local x = _u1934[_u958]
      l[x] = true
    end
    return(join({"table"}, l))
  end}, table = {export = true, macro = function (...)
    local body = unstash({...})
    return(join({"%object"}, mapo(function (x)
      return(x)
    end, body)))
  end}, guard = {export = true, macro = function (expr)
    if target == "js" then
      return({{"fn", {}, {"%try", {"list", true, expr}}}})
    else
      local e = unique()
      local x = unique()
      local ex = "|" .. e .. "," .. x .. "|"
      return({"let", {ex, {"xpcall", {"fn", {}, expr}, "%message-handler"}}, {"list", e, x}})
    end
  end}, let = {export = true, macro = function (bindings, ...)
    local _u1950 = unstash({...})
    local body = sub(_u1950, 0)
    if length(bindings) < 2 then
      return(join({"do"}, body))
    else
      local renames = {}
      local locals = {}
      local lh = bindings[1]
      local rh = bindings[2]
      local _u1953 = bind(lh, rh)
      local k = nil
      for k in next, _u1953 do
        local _u1955 = _u1953[k]
        local id = _u1955[1]
        local val = _u1955[2]
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
  end}, fn = {export = true, macro = function (args, ...)
    local _u1961 = unstash({...})
    local body = sub(_u1961, 0)
    local _u1963 = bind42(args, body)
    local _u1964 = _u1963[1]
    local _u1965 = _u1963[2]
    return(join({"%function", _u1964}, _u1965))
  end}, ["define-macro"] = {export = true, macro = function (name, args, ...)
    local _u1967 = unstash({...})
    local body = sub(_u1967, 0)
    local form = join({"fn", args}, body)
    local _u1970 = {"setenv", {"quote", name}}
    _u1970.macro = form
    _u1970.form = {"quote", form}
    eval(_u1970)
    return(nil)
  end}, ["let-macro"] = {export = true, macro = function (definitions, ...)
    local _u1973 = unstash({...})
    local body = sub(_u1973, 0)
    add(environment, {})
    map(function (m)
      return(macroexpand(join({"define-macro"}, m)))
    end, definitions)
    local _u1975 = join({"do"}, macroexpand(body))
    drop(environment)
    return(_u1975)
  end}, define = {export = true, macro = function (name, x, ...)
    local _u1979 = unstash({...})
    local body = sub(_u1979, 0)
    if not toplevel63() then
      print(string("local") .. " " .. string(name))
    end
    setenv(name, {_stash = true, variable = true})
    if some63(body) and target == "js" then
      return(link(name, {"%local", name, join({"fn", x}, body)}))
    else
      if some63(body) then
        local _u1983 = bind42(x, body)
        local args = _u1983[1]
        local _u1984 = _u1983[2]
        return(link(name, join({"%local-function", name, args}, _u1984)))
      else
        return(link(name, {"%local", name, x}))
      end
    end
  end}, ["define-special"] = {export = true, macro = function (name, args, ...)
    local _u1987 = unstash({...})
    local body = sub(_u1987, 0)
    local form = join({"fn", args}, body)
    local _u1990 = {"setenv", {"quote", name}}
    _u1990.form = {"quote", form}
    _u1990.special = form
    eval(join(_u1990, keys(body)))
    return(nil)
  end}, when = {export = true, macro = function (cond, ...)
    local _u1993 = unstash({...})
    local body = sub(_u1993, 0)
    return({"if", cond, join({"do"}, body)})
  end}, ["with-bindings"] = {export = true, macro = function (_u1998, ...)
    local names = _u1998[1]
    local _u1997 = unstash({...})
    local body = sub(_u1997, 0)
    local x = unique()
    local _u2003 = {"setenv", x}
    _u2003.variable = true
    local _u2000 = {"with-frame", {"all", {"_u957", x}, names, _u2003}}
    _u2000.scope = true
    return(join(_u2000, body))
  end}, unless = {export = true, macro = function (cond, ...)
    local _u2004 = unstash({...})
    local body = sub(_u2004, 0)
    return({"if", {"not", cond}, join({"do"}, body)})
  end}, redefine = {export = true, macro = function (name, x, ...)
    local _u2009 = unstash({...})
    local body = sub(_u2009, 0)
    if some63(body) then
      x = join({"fn", x}, body)
    end
    return(link(name, {"set", name, x}))
  end}, ["if"] = {export = true, macro = function (...)
    local branches = unstash({...})
    return(hd(expand_if(branches)))
  end}, list = {export = true, macro = function (...)
    local body = unstash({...})
    local l = {}
    local forms = {}
    local id = unique()
    local _u2015 = body
    local k = nil
    for k in next, _u2015 do
      local v = _u2015[k]
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
  end}}, import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}, {"lumen", "lib"}, {"lumen", "compiler"}}}, user = {export = {}, import = {"lumen", {"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}}}, ["lumen/lib"] = {export = {["quote-environment"] = {variable = true, export = true}, ["stash*"] = {variable = true, export = true}, ["quoting?"] = {variable = true}, escape = {variable = true}, ["valid-code?"] = {variable = true}, macroexpand = {variable = true, export = true}, mapo = {variable = true, export = true}, ["reserved?"] = {variable = true, export = true}, ["can-unquote?"] = {variable = true}, ["with-indent"] = {export = true, macro = function (form)
    local result = unique()
    return({"do", {"inc", "indent-level"}, {"let", {result, form}, {"dec", "indent-level"}, result}})
  end}, getenv = {variable = true, export = true}, bias = {variable = true}, ["quasisplice?"] = {variable = true}, ["quote-binding"] = {variable = true}, extend = {variable = true}, ["quote-module"] = {variable = true}, id = {variable = true, export = true}, indentation = {variable = true, export = true}, index = {variable = true, export = true}, link = {variable = true, export = true}, ["statement?"] = {variable = true, export = true}, ["special-form?"] = {variable = true, export = true}, imported = {variable = true, export = true}, ["indent-level"] = {global = true, export = true}, ["quote-modules"] = {variable = true, export = true}, key = {variable = true, export = true}, ["special?"] = {variable = true, export = true}, quoted = {variable = true, export = true}, ["quote-frame"] = {variable = true}, bind = {variable = true, export = true}, ["quasiquote-list"] = {variable = true}, ["expand-if"] = {variable = true, export = true}, reserved = {variable = true}, ["macro-function"] = {variable = true, export = true}, ["numeric?"] = {variable = true}, ["quasiquoting?"] = {variable = true}, ["bound?"] = {variable = true, export = true}, ["bind*"] = {variable = true, export = true}, literal = {variable = true}, ["symbol?"] = {variable = true, export = true}, ["macro?"] = {variable = true, export = true}, ["symbol-expansion"] = {variable = true, export = true}, exclude = {variable = true}, ["global?"] = {variable = true}, ["initial-environment"] = {variable = true, export = true}, ["variable?"] = {variable = true, export = true}, quasiexpand = {variable = true, export = true}, ["valid-id?"] = {variable = true, export = true}}, import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}}}, ["lumen/special"] = {export = {["return"] = {export = true, special = function (x)
    local _u2147
    if nil63(x) then
      _u2147 = "return"
    else
      _u2147 = "return(" .. compile(x) .. ")"
    end
    local _u2046 = _u2147
    return(indentation() .. _u2046)
  end, foo = true, stmt = true}, ["%if"] = {export = true, tr = true, stmt = true, special = function (cond, cons, alt)
    local _u2048 = compile(cond)
    indent_level = indent_level + 1
    local _u2050 = compile(cons, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local _u2049 = _u2050
    local _u2148
    if alt then
      indent_level = indent_level + 1
      local _u2052 = compile(alt, {_stash = true, stmt = true})
      indent_level = indent_level - 1
      _u2148 = _u2052
    end
    local _u2051 = _u2148
    local ind = indentation()
    local s = ""
    if target == "js" then
      s = s .. ind .. "if (" .. _u2048 .. ") {\n" .. _u2049 .. ind .. "}"
    else
      s = s .. ind .. "if " .. _u2048 .. " then\n" .. _u2049
    end
    if _u2051 and target == "js" then
      s = s .. " else {\n" .. _u2051 .. ind .. "}"
    else
      if _u2051 then
        s = s .. ind .. "else\n" .. _u2051
      end
    end
    if target == "lua" then
      return(s .. ind .. "end\n")
    else
      return(s .. "\n")
    end
  end, foo = true}, ["%function"] = {export = true, special = function (args, body)
    return(compile_function(args, body))
  end, foo = true}, ["%local"] = {export = true, special = function (name, value)
    local id = compile(name)
    local value1 = compile(value)
    local _u2149
    if is63(value) then
      _u2149 = " = " .. value1
    else
      _u2149 = ""
    end
    local rh = _u2149
    local _u2150
    if target == "js" then
      _u2150 = "var "
    else
      _u2150 = "local "
    end
    local keyword = _u2150
    local ind = indentation()
    return(ind .. keyword .. id .. rh)
  end, foo = true, stmt = true}, ["do"] = {export = true, tr = true, stmt = true, special = function (...)
    local forms = unstash({...})
    local s = ""
    series(function (x)
      s = s .. compile(x, {_stash = true, stmt = true})
    end, forms)
    return(s)
  end, foo = true}, set = {export = true, special = function (lh, rh)
    local _u2058 = compile(lh)
    local _u2151
    if nil63(rh) then
      _u2151 = "nil"
    else
      _u2151 = rh
    end
    local _u2059 = compile(_u2151)
    return(indentation() .. _u2058 .. " = " .. _u2059)
  end, foo = true, stmt = true}, ["%global-function"] = {export = true, tr = true, stmt = true, special = function (name, args, body)
    if target == "lua" then
      local x = compile_function(args, body, {_stash = true, name = name})
      return(indentation() .. x)
    else
      return(compile({"set", name, {"%function", args, body}}, {_stash = true, stmt = true}))
    end
  end, foo = true}, get = {export = true, special = function (t, k)
    local _u2064 = compile(t)
    local k1 = compile(k)
    if target == "lua" and char(_u2064, 0) == "{" then
      _u2064 = "(" .. _u2064 .. ")"
    end
    if string_literal63(k) and valid_id63(inner(k)) then
      return(_u2064 .. "." .. inner(k))
    else
      return(_u2064 .. "[" .. k1 .. "]")
    end
  end, foo = true}, ["while"] = {export = true, tr = true, stmt = true, special = function (cond, form)
    local _u2066 = compile(cond)
    indent_level = indent_level + 1
    local _u2067 = compile(form, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local body = _u2067
    local ind = indentation()
    if target == "js" then
      return(ind .. "while (" .. _u2066 .. ") {\n" .. body .. ind .. "}\n")
    else
      return(ind .. "while " .. _u2066 .. " do\n" .. body .. ind .. "end\n")
    end
  end, foo = true}, ["%try"] = {export = true, tr = true, stmt = true, special = function (form)
    local ind = indentation()
    indent_level = indent_level + 1
    local _u2069 = compile(form, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local body = _u2069
    local e = unique()
    local hf = {"return", {"%array", false, {"get", e, "\"message\""}}}
    indent_level = indent_level + 1
    local _u2073 = compile(hf, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local h = _u2073
    return(ind .. "try {\n" .. body .. ind .. "}\n" .. ind .. "catch (" .. e .. ") {\n" .. h .. ind .. "}\n")
  end, foo = true}, ["break"] = {export = true, special = function ()
    return(indentation() .. "break")
  end, foo = true, stmt = true}, ["not"] = {}, ["%local-function"] = {export = true, tr = true, stmt = true, special = function (name, args, body)
    local x = compile_function(args, body, {_stash = true, prefix = "local ", name = name})
    return(indentation() .. x)
  end, foo = true}, ["%array"] = {export = true, special = function (...)
    local forms = unstash({...})
    local _u2152
    if target == "lua" then
      _u2152 = "{"
    else
      _u2152 = "["
    end
    local open = _u2152
    local _u2153
    if target == "lua" then
      _u2153 = "}"
    else
      _u2153 = "]"
    end
    local close = _u2153
    local s = ""
    local c = ""
    local _u2077 = forms
    local k = nil
    for k in next, _u2077 do
      local v = _u2077[k]
      if number63(k) then
        s = s .. c .. compile(v)
        c = ", "
      end
    end
    return(open .. s .. close)
  end, foo = true}, ["%object"] = {export = true, special = function (...)
    local forms = unstash({...})
    local s = "{"
    local c = ""
    local _u2154
    if target == "lua" then
      _u2154 = " = "
    else
      _u2154 = ": "
    end
    local sep = _u2154
    local _u2080 = pair(forms)
    local k = nil
    for k in next, _u2080 do
      local v = _u2080[k]
      if number63(k) then
        local _u2082 = v[1]
        local _u2083 = v[2]
        if not string63(_u2082) then
          error("Illegal key: " .. string(_u2082))
        end
        s = s .. c .. key(_u2082) .. sep .. compile(_u2083)
        c = ", "
      end
    end
    return(s .. "}")
  end, foo = true}, ["%for"] = {export = true, tr = true, stmt = true, special = function (t, k, form)
    local _u2085 = compile(t)
    local ind = indentation()
    indent_level = indent_level + 1
    local _u2086 = compile(form, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local body = _u2086
    if target == "lua" then
      return(ind .. "for " .. k .. " in next, " .. _u2085 .. " do\n" .. body .. ind .. "end\n")
    else
      return(ind .. "for (" .. k .. " in " .. _u2085 .. ") {\n" .. body .. ind .. "}\n")
    end
  end, foo = true}, error = {export = true, special = function (x)
    local _u2155
    if target == "js" then
      _u2155 = "throw new " .. compile({"Error", x})
    else
      _u2155 = "error(" .. compile(x) .. ")"
    end
    local e = _u2155
    return(indentation() .. e)
  end, foo = true, stmt = true}}, import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}, {"lumen", "lib"}, {"lumen", "compiler"}}}, ["lumen/system"] = {export = {nexus = {global = true, export = true}}, import = {{"lumen", "special"}, {"lumen", "core"}}}, ["lumen/compiler"] = {export = {compile = {variable = true, export = true}, ["compiling?"] = {variable = true}, process = {variable = true}, ["lower-special"] = {variable = true}, ["compile-module"] = {variable = true, export = true}, ["lower-if"] = {variable = true}, encapsulate = {variable = true}, terminator = {variable = true}, ["lower-statement"] = {variable = true}, lower = {variable = true}, ["in-module"] = {variable = true, export = true}, ["load-module"] = {variable = true, export = true}, ["lower-try"] = {variable = true}, declare = {variable = true, export = true}, ["op-delims"] = {variable = true}, ["compile-call"] = {variable = true}, ["current-module"] = {global = true, export = true}, getop = {variable = true}, ["module-path"] = {variable = true}, conclude = {variable = true}, ["compile-function"] = {variable = true, export = true}, ["%result"] = {global = true, export = true}, ["lower-short"] = {variable = true}, ["lower-do"] = {variable = true}, context = {variable = true}, ["parenthesize-call?"] = {variable = true}, ["%compile-module"] = {variable = true}, ["unary?"] = {variable = true}, ["compiler-output"] = {variable = true}, run = {variable = true}, ["compile-special"] = {variable = true}, ["lower-while"] = {variable = true}, ["lower-call"] = {variable = true}, ["can-return?"] = {variable = true}, eval = {variable = true, export = true}, ["lower-infix"] = {variable = true}, ["lower-body"] = {variable = true}, ["compile-infix"] = {variable = true}, ["open-module"] = {variable = true, export = true}, ["lower-function"] = {variable = true}, ["infix?"] = {variable = true}, ["lower-definition"] = {variable = true}, precedence = {variable = true}, ["lower-for"] = {variable = true}, ["compile-atom"] = {variable = true}, ["lower-infix?"] = {variable = true}, ["import-modules"] = {variable = true, export = true}, ["compile-args"] = {variable = true}, infix = {variable = true}}, import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}, {"lumen", "lib"}, {"lumen", "reader"}}}, ["lumen/boot"] = {export = {modules = {export = true, global = true}, ["%initial-modules"] = {macro = function ()
    return(quote_modules())
  end}, ["%initial-environment"] = {macro = function ()
    return(quote_environment(initial_environment()))
  end}}, import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}, {"lumen", "lib"}, {"lumen", "compiler"}}}, ["lumen/reader"] = {export = {eof = {variable = true}, delimiters = {variable = true}, ["key?"] = {variable = true}, read = {variable = true, export = true}, ["define-reader"] = {export = true, macro = function (_u2113, ...)
    local char = _u2113[1]
    local s = _u2113[2]
    local _u2112 = unstash({...})
    local body = sub(_u2112, 0)
    return({"set", {"get", "read-table", char}, join({"fn", {s}}, body)})
  end}, ["flag?"] = {variable = true}, whitespace = {variable = true}, ["read-all"] = {variable = true, export = true}, ["read-char"] = {variable = true}, ["read-from-string"] = {variable = true, export = true}, ["skip-non-code"] = {variable = true}, stream = {variable = true, export = true}, ["read-table"] = {variable = true, export = true}, ["peek-char"] = {variable = true}}, import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}}}, ["lumen/main"] = {export = {}, import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}, {"lumen", "reader"}, {"lumen", "compiler"}}}, lumen = {export = {}, import = {{"lumen", "special"}}, alias = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}}}}
  environment = {{["define-module"] = {export = true, macro = function (spec, ...)
    local _u2136 = unstash({...})
    local body = sub(_u2136, 0)
    local alias = body.alias
    local imp = body.import
    local exp = body.export
    local _u2138 = import_modules(imp)
    local imports = _u2138[1]
    local bindings = _u2138[2]
    local k = module_key(spec)
    current_module = spec
    modules[k] = {export = {}, import = imports, alias = alias}
    local _u2139 = exp or {}
    local _u956 = nil
    for _u956 in next, _u2139 do
      local x = _u2139[_u956]
      setenv(x, {_stash = true, export = true})
    end
    return(join({"do", {"set", {"get", "nexus", {"quote", k}}, {"table"}}}, bindings))
  end}}}
end)();
(function ()
  nexus.user = {}
  local _u2156 = nexus["lumen/runtime"]
  local keep = _u2156.keep
  local iterate = _u2156.iterate
  local replicate = _u2156.replicate
  local sort = _u2156.sort
  local last = _u2156.last
  local hd61 = _u2156["hd="]
  local reverse = _u2156.reverse
  local length = _u2156.length
  local number63 = _u2156["number?"]
  local search = _u2156.search
  local hd = _u2156.hd
  local tl = _u2156.tl
  local number = _u2156.number
  local table63 = _u2156["table?"]
  local module = _u2156.module
  local stash = _u2156.stash
  local list63 = _u2156["list?"]
  local split = _u2156.split
  local is63 = _u2156["is?"]
  local nil63 = _u2156["nil?"]
  local _42 = _u2156["*"]
  local code = _u2156.code
  local some63 = _u2156["some?"]
  local id_literal63 = _u2156["id-literal?"]
  local map = _u2156.map
  local setenv = _u2156.setenv
  local _6061 = _u2156["<="]
  local in63 = _u2156["in?"]
  local string63 = _u2156["string?"]
  local sub = _u2156.sub
  local keys63 = _u2156["keys?"]
  local _6261 = _u2156[">="]
  local boolean63 = _u2156["boolean?"]
  local butlast = _u2156.butlast
  local exit = _u2156.exit
  local composite63 = _u2156["composite?"]
  local unique = _u2156.unique
  local add = _u2156.add
  local _62 = _u2156[">"]
  local _61 = _u2156["="]
  local unstash = _u2156.unstash
  local _60 = _u2156["<"]
  local string = _u2156.string
  local module_key = _u2156["module-key"]
  local read_file = _u2156["read-file"]
  local toplevel63 = _u2156["toplevel?"]
  local inner = _u2156.inner
  local find = _u2156.find
  local _37message_handler = _u2156["%message-handler"]
  local apply = _u2156.apply
  local space = _u2156.space
  local now = _u2156.now
  local atom63 = _u2156["atom?"]
  local keys = _u2156.keys
  local today = _u2156.today
  local _37 = _u2156["%"]
  local write = _u2156.write
  local drop = _u2156.drop
  local one63 = _u2156["one?"]
  local none63 = _u2156["none?"]
  local _47 = _u2156["/"]
  local series = _u2156.series
  local _ = _u2156["-"]
  local _43 = _u2156["+"]
  local reduce = _u2156.reduce
  local function63 = _u2156["function?"]
  local cat = _u2156.cat
  local write_file = _u2156["write-file"]
  local pair = _u2156.pair
  local empty63 = _u2156["empty?"]
  local join = _u2156.join
  local char = _u2156.char
  local substring = _u2156.substring
  local string_literal63 = _u2156["string-literal?"]
end)();
(function ()
  nexus["lumen/main"] = {}
  local _u2 = nexus["lumen/runtime"]
  local keep = _u2.keep
  local iterate = _u2.iterate
  local replicate = _u2.replicate
  local sort = _u2.sort
  local last = _u2.last
  local hd61 = _u2["hd="]
  local reverse = _u2.reverse
  local length = _u2.length
  local number63 = _u2["number?"]
  local apply = _u2.apply
  local hd = _u2.hd
  local tl = _u2.tl
  local number = _u2.number
  local table63 = _u2["table?"]
  local module = _u2.module
  local stash = _u2.stash
  local list63 = _u2["list?"]
  local split = _u2.split
  local _ = _u2["-"]
  local nil63 = _u2["nil?"]
  local _42 = _u2["*"]
  local drop = _u2.drop
  local some63 = _u2["some?"]
  local today = _u2.today
  local map = _u2.map
  local setenv = _u2.setenv
  local _6061 = _u2["<="]
  local in63 = _u2["in?"]
  local string63 = _u2["string?"]
  local sub = _u2.sub
  local keys63 = _u2["keys?"]
  local _6261 = _u2[">="]
  local boolean63 = _u2["boolean?"]
  local space = _u2.space
  local exit = _u2.exit
  local composite63 = _u2["composite?"]
  local unique = _u2.unique
  local add = _u2.add
  local _62 = _u2[">"]
  local _61 = _u2["="]
  local unstash = _u2.unstash
  local _60 = _u2["<"]
  local atom63 = _u2["atom?"]
  local _43 = _u2["+"]
  local read_file = _u2["read-file"]
  local one63 = _u2["one?"]
  local module_key = _u2["module-key"]
  local find = _u2.find
  local is63 = _u2["is?"]
  local reduce = _u2.reduce
  local butlast = _u2.butlast
  local code = _u2.code
  local id_literal63 = _u2["id-literal?"]
  local toplevel63 = _u2["toplevel?"]
  local string_literal63 = _u2["string-literal?"]
  local _37 = _u2["%"]
  local now = _u2.now
  local join = _u2.join
  local function63 = _u2["function?"]
  local none63 = _u2["none?"]
  local keys = _u2.keys
  local series = _u2.series
  local _47 = _u2["/"]
  local write = _u2.write
  local string = _u2.string
  local _37message_handler = _u2["%message-handler"]
  local cat = _u2.cat
  local write_file = _u2["write-file"]
  local search = _u2.search
  local empty63 = _u2["empty?"]
  local inner = _u2.inner
  local char = _u2.char
  local substring = _u2.substring
  local pair = _u2.pair
  local _u5 = nexus["lumen/reader"]
  local read_table = _u5["read-table"]
  local read = _u5.read
  local read_from_string = _u5["read-from-string"]
  local stream = _u5.stream
  local read_all = _u5["read-all"]
  local _u6 = nexus["lumen/compiler"]
  local compile_module = _u6["compile-module"]
  local in_module = _u6["in-module"]
  local load_module = _u6["load-module"]
  local declare = _u6.declare
  local compile_function = _u6["compile-function"]
  local open_module = _u6["open-module"]
  local compile = _u6.compile
  local eval = _u6.eval
  local import_modules = _u6["import-modules"]
  local function rep(s)
    local _u2161,_u2162 = xpcall(function ()
      return(eval(read_from_string(s)))
    end, _37message_handler)
    local _u2160 = {_u2161, _u2162}
    local _u1 = _u2160[1]
    local x = _u2160[2]
    if is63(x) then
      return(print(string(x)))
    end
  end
  nexus["lumen/main"].rep = rep
  local function repl()
    write("> ")
    local rep1 = function (s)
      rep(s)
      return(write("> "))
    end
    while true do
      local s = io.read()
      if s then
        rep1(s)
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
        if nil63(spec) and not ("-" == char(arg, 0)) then
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
