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
    local function string(x)
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
  local join = _u172.join
  local table63 = _u172["table?"]
  local _42 = _u172["*"]
  local _43 = _u172["+"]
  local function63 = _u172["function?"]
  local _ = _u172["-"]
  local reverse = _u172.reverse
  local inner = _u172.inner
  local _6061 = _u172["<="]
  local _37 = _u172["%"]
  local add = _u172.add
  local apply = _u172.apply
  local map = _u172.map
  local space = _u172.space
  local _60 = _u172["<"]
  local _61 = _u172["="]
  local _47 = _u172["/"]
  local write = _u172.write
  local sort = _u172.sort
  local number = _u172.number
  local now = _u172.now
  local in63 = _u172["in?"]
  local _62 = _u172[">"]
  local length = _u172.length
  local find = _u172.find
  local keep = _u172.keep
  local module = _u172.module
  local sub = _u172.sub
  local composite63 = _u172["composite?"]
  local series = _u172.series
  local id_literal63 = _u172["id-literal?"]
  local last = _u172.last
  local hd = _u172.hd
  local substring = _u172.substring
  local is63 = _u172["is?"]
  local unique = _u172.unique
  local keys = _u172.keys
  local iterate = _u172.iterate
  local hd61 = _u172["hd="]
  local pair = _u172.pair
  local butlast = _u172.butlast
  local number63 = _u172["number?"]
  local cat = _u172.cat
  local code = _u172.code
  local boolean63 = _u172["boolean?"]
  local stash = _u172.stash
  local exit = _u172.exit
  local reduce = _u172.reduce
  local some63 = _u172["some?"]
  local read_file = _u172["read-file"]
  local keys63 = _u172["keys?"]
  local replicate = _u172.replicate
  local setenv = _u172.setenv
  local atom63 = _u172["atom?"]
  local string_literal63 = _u172["string-literal?"]
  local module_key = _u172["module-key"]
  local _37message_handler = _u172["%message-handler"]
  local unstash = _u172.unstash
  local toplevel63 = _u172["toplevel?"]
  local drop = _u172.drop
  local nil63 = _u172["nil?"]
  local none63 = _u172["none?"]
  local one63 = _u172["one?"]
  local today = _u172.today
  local write_file = _u172["write-file"]
  local list63 = _u172["list?"]
  local char = _u172.char
  local _6261 = _u172[">="]
  local split = _u172.split
  local empty63 = _u172["empty?"]
  local string63 = _u172["string?"]
  local search = _u172.search
  local string = _u172.string
  local tl = _u172.tl
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
            local _u954 = nil
            for _u954 in next, _u242 do
              local _u240 = _u242[_u954]
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
              local _u954 = nil
              for _u954 in next, _u250 do
                local _u248 = _u250[_u954]
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
  local reserved = {["in"] = true, ["void"] = true, ["until"] = true, ["false"] = true, ["or"] = true, ["throw"] = true, ["debugger"] = true, ["for"] = true, ["if"] = true, ["continue"] = true, ["elseif"] = true, ["break"] = true, ["end"] = true, ["<"] = true, ["do"] = true, ["="] = true, ["and"] = true, ["=="] = true, ["else"] = true, ["this"] = true, ["%"] = true, ["case"] = true, ["*"] = true, ["repeat"] = true, ["not"] = true, ["default"] = true, [">="] = true, ["function"] = true, ["new"] = true, ["nil"] = true, ["<="] = true, ["catch"] = true, ["instanceof"] = true, ["then"] = true, ["/"] = true, ["with"] = true, ["-"] = true, ["return"] = true, ["typeof"] = true, ["switch"] = true, ["finally"] = true, ["local"] = true, ["var"] = true, ["while"] = true, ["try"] = true, ["+"] = true, ["true"] = true, [">"] = true, ["delete"] = true}
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
  local join = _u350.join
  local table63 = _u350["table?"]
  local _42 = _u350["*"]
  local _43 = _u350["+"]
  local function63 = _u350["function?"]
  local _ = _u350["-"]
  local reverse = _u350.reverse
  local inner = _u350.inner
  local _6061 = _u350["<="]
  local _37 = _u350["%"]
  local add = _u350.add
  local apply = _u350.apply
  local map = _u350.map
  local space = _u350.space
  local _60 = _u350["<"]
  local _61 = _u350["="]
  local _47 = _u350["/"]
  local write = _u350.write
  local sort = _u350.sort
  local number = _u350.number
  local now = _u350.now
  local in63 = _u350["in?"]
  local _62 = _u350[">"]
  local length = _u350.length
  local find = _u350.find
  local keep = _u350.keep
  local module = _u350.module
  local sub = _u350.sub
  local composite63 = _u350["composite?"]
  local series = _u350.series
  local id_literal63 = _u350["id-literal?"]
  local last = _u350.last
  local hd = _u350.hd
  local substring = _u350.substring
  local is63 = _u350["is?"]
  local unique = _u350.unique
  local keys = _u350.keys
  local iterate = _u350.iterate
  local hd61 = _u350["hd="]
  local pair = _u350.pair
  local butlast = _u350.butlast
  local number63 = _u350["number?"]
  local cat = _u350.cat
  local code = _u350.code
  local boolean63 = _u350["boolean?"]
  local stash = _u350.stash
  local exit = _u350.exit
  local reduce = _u350.reduce
  local some63 = _u350["some?"]
  local read_file = _u350["read-file"]
  local keys63 = _u350["keys?"]
  local replicate = _u350.replicate
  local setenv = _u350.setenv
  local atom63 = _u350["atom?"]
  local string_literal63 = _u350["string-literal?"]
  local module_key = _u350["module-key"]
  local _37message_handler = _u350["%message-handler"]
  local unstash = _u350.unstash
  local toplevel63 = _u350["toplevel?"]
  local drop = _u350.drop
  local nil63 = _u350["nil?"]
  local none63 = _u350["none?"]
  local one63 = _u350["one?"]
  local today = _u350.today
  local write_file = _u350["write-file"]
  local list63 = _u350["list?"]
  local char = _u350.char
  local _6261 = _u350[">="]
  local split = _u350.split
  local empty63 = _u350["empty?"]
  local string63 = _u350["string?"]
  local search = _u350.search
  local string = _u350.string
  local tl = _u350.tl
  local delimiters = {[")"] = true, ["("] = true, [";"] = true, ["\n"] = true}
  nexus["lumen/reader"].delimiters = delimiters
  local whitespace = {[" "] = true, ["\n"] = true, ["\t"] = true}
  nexus["lumen/reader"].whitespace = whitespace
  local function make_stream(str)
    return({len = length(str), string = str, pos = 0})
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
  local join = _u400.join
  local table63 = _u400["table?"]
  local _42 = _u400["*"]
  local _43 = _u400["+"]
  local function63 = _u400["function?"]
  local _ = _u400["-"]
  local reverse = _u400.reverse
  local inner = _u400.inner
  local _6061 = _u400["<="]
  local _37 = _u400["%"]
  local add = _u400.add
  local apply = _u400.apply
  local map = _u400.map
  local space = _u400.space
  local _60 = _u400["<"]
  local _61 = _u400["="]
  local _47 = _u400["/"]
  local write = _u400.write
  local sort = _u400.sort
  local number = _u400.number
  local now = _u400.now
  local in63 = _u400["in?"]
  local _62 = _u400[">"]
  local length = _u400.length
  local find = _u400.find
  local keep = _u400.keep
  local module = _u400.module
  local sub = _u400.sub
  local composite63 = _u400["composite?"]
  local series = _u400.series
  local id_literal63 = _u400["id-literal?"]
  local last = _u400.last
  local hd = _u400.hd
  local substring = _u400.substring
  local is63 = _u400["is?"]
  local unique = _u400.unique
  local keys = _u400.keys
  local iterate = _u400.iterate
  local hd61 = _u400["hd="]
  local pair = _u400.pair
  local butlast = _u400.butlast
  local number63 = _u400["number?"]
  local cat = _u400.cat
  local code = _u400.code
  local boolean63 = _u400["boolean?"]
  local stash = _u400.stash
  local exit = _u400.exit
  local reduce = _u400.reduce
  local some63 = _u400["some?"]
  local read_file = _u400["read-file"]
  local keys63 = _u400["keys?"]
  local replicate = _u400.replicate
  local setenv = _u400.setenv
  local atom63 = _u400["atom?"]
  local string_literal63 = _u400["string-literal?"]
  local module_key = _u400["module-key"]
  local _37message_handler = _u400["%message-handler"]
  local unstash = _u400.unstash
  local toplevel63 = _u400["toplevel?"]
  local drop = _u400.drop
  local nil63 = _u400["nil?"]
  local none63 = _u400["none?"]
  local one63 = _u400["one?"]
  local today = _u400.today
  local write_file = _u400["write-file"]
  local list63 = _u400["list?"]
  local char = _u400.char
  local _6261 = _u400[">="]
  local split = _u400.split
  local empty63 = _u400["empty?"]
  local string63 = _u400["string?"]
  local search = _u400.search
  local string = _u400.string
  local tl = _u400.tl
  local _u403 = nexus["lumen/lib"]
  local quote_environment = _u403["quote-environment"]
  local key = _u403.key
  local bind = _u403.bind
  local bound63 = _u403["bound?"]
  local mapo = _u403.mapo
  local statement63 = _u403["statement?"]
  local valid_id63 = _u403["valid-id?"]
  local quoted = _u403.quoted
  local indentation = _u403.indentation
  local macroexpand = _u403.macroexpand
  local symbol63 = _u403["symbol?"]
  local symbol_expansion = _u403["symbol-expansion"]
  local bind42 = _u403["bind*"]
  local initial_environment = _u403["initial-environment"]
  local quasiexpand = _u403.quasiexpand
  local link = _u403.link
  local stash42 = _u403["stash*"]
  local index = _u403.index
  local imported = _u403.imported
  local macro_function = _u403["macro-function"]
  local special_form63 = _u403["special-form?"]
  local getenv = _u403.getenv
  local special63 = _u403["special?"]
  local variable63 = _u403["variable?"]
  local id = _u403.id
  local reserved63 = _u403["reserved?"]
  local quote_modules = _u403["quote-modules"]
  local macro63 = _u403["macro?"]
  local _u404 = nexus["lumen/reader"]
  local make_stream = _u404["make-stream"]
  local read = _u404.read
  local read_table = _u404["read-table"]
  local read_all = _u404["read-all"]
  local read_from_string = _u404["read-from-string"]
  local _u407 = {}
  local _u408 = {}
  _u408.js = "!"
  _u408.lua = "not "
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
  _u415.js = "+"
  _u415.lua = ".."
  _u414.cat = _u415
  local _u417 = {}
  _u417[">"] = true
  _u417["<="] = true
  _u417["<"] = true
  _u417[">="] = true
  local _u419 = {}
  local _u420 = {}
  _u420.js = "!="
  _u420.lua = "~="
  _u419["~="] = _u420
  local _u421 = {}
  _u421.js = "==="
  _u421.lua = "=="
  _u419["="] = _u421
  local _u423 = {}
  local _u424 = {}
  _u424.js = "&&"
  _u424.lua = "and"
  _u423["and"] = _u424
  local _u426 = {}
  local _u427 = {}
  _u427.js = "||"
  _u427.lua = "or"
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
    local _u441 = getenv(x)
    local self_tr63 = _u441.tr
    local stmt = _u441.stmt
    local special = _u441.special
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
    local _u444 = unstash({...})
    local right = _u444.right
    local _u546
    if right then
      _u546 = _6261
    else
      _u546 = _62
    end
    if _u546(precedence(child), precedence(parent)) then
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
    local name = _u455.name
    local prefix = _u455.prefix
    local _u547
    if name then
      _u547 = compile(name)
    else
      _u547 = ""
    end
    local id = _u547
    local _u457 = prefix or ""
    local _u458 = compile_args(args)
    indent_level = indent_level + 1
    local _u460 = compile(body, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local _u459 = _u460
    local ind = indentation()
    local _u548
    if target == "js" then
      _u548 = ""
    else
      _u548 = "end"
    end
    local tr = _u548
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
        local _u549
        if stmt then
          _u549 = indentation()
        else
          _u549 = ""
        end
        local ind = _u549
        local _u550
        if atom63(form) then
          _u550 = compile_atom(form)
        else
          local _u551
          if infix63(hd(form)) then
            _u551 = compile_infix(form)
          else
            _u551 = compile_call(form)
          end
          _u550 = _u551
        end
        local _u464 = _u550
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
      local _u553
      if _u476 then
        _u553 = {lower_body({_u476}, tail63)}
      end
      return(add(hoist, join({"%if", lower(cond, hoist), lower_body({_u475}, tail63)}, _u553)))
    else
      local e = unique()
      add(hoist, {"%local", e})
      local _u552
      if _u476 then
        _u552 = {lower({"set", e, _u476})}
      end
      add(hoist, join({"%if", lower(cond, hoist), lower({"set", e, _u475})}, _u552))
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
      local _u554
      if x == "and" then
        _u554 = {"%if", id, b, id}
      else
        _u554 = {"%if", id, id, b}
      end
      return(lower({"do", {"%local", id, a}, _u554}, hoist))
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
    local s = make_stream(read_file(path))
    local first = read(s)
    if not hd61(first, "define-module") then
      current_module = "user"
      in_module("user")
    end
    local body = join({first}, read_all(s))
    local form = encapsulate(body)
    local code = compile(form) .. ";\n"
    local _u525 = current_module
    current_module = mod0
    environment = env0
    conclude(code)
    return(_u525)
  end
  nexus["lumen/compiler"]["%compile-module"] = _37compile_module
  local function open_module(spec, ...)
    local _u526 = unstash({...})
    local private = _u526.private
    local m = module(spec)
    local frame = last(environment)
    local _u528 = m.export
    local k = nil
    for k in next, _u528 do
      local v = _u528[k]
      if v.export or private then
        frame[k] = v
      end
    end
  end
  nexus["lumen/compiler"]["open-module"] = open_module
  local function load_module(spec, ...)
    local _u530 = unstash({...})
    local private = _u530.private
    if not module(spec) then
      spec = _37compile_module(spec)
    end
    open_module(spec, {_stash = true, private = private})
    return(spec)
  end
  nexus["lumen/compiler"]["load-module"] = load_module
  in_module = function (spec)
    local _u533 = load_module(spec, {_stash = true, private = true})
    local m = module(_u533)
    series(open_module, m.import)
    current_module = _u533
  end
  nexus["lumen/compiler"]["in-module"] = in_module
  local function import_modules(specs)
    local imports = {}
    local bindings = {}
    series(function (spec)
      load_module(spec)
      local m = module(spec)
      if m.alias then
        local _u536 = import_modules(m.alias)
        local aliased = _u536[1]
        local bs = _u536[2]
        imports = join(imports, aliased)
        bindings = join(bindings, bs)
      else
        local _u537 = imported(spec)
        add(imports, spec)
        bindings = join(bindings, _u537)
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
  local _u555 = nexus["lumen/runtime"]
  local join = _u555.join
  local table63 = _u555["table?"]
  local _42 = _u555["*"]
  local _43 = _u555["+"]
  local function63 = _u555["function?"]
  local _ = _u555["-"]
  local reverse = _u555.reverse
  local inner = _u555.inner
  local _6061 = _u555["<="]
  local _37 = _u555["%"]
  local add = _u555.add
  local apply = _u555.apply
  local map = _u555.map
  local space = _u555.space
  local _60 = _u555["<"]
  local _61 = _u555["="]
  local _47 = _u555["/"]
  local write = _u555.write
  local sort = _u555.sort
  local number = _u555.number
  local now = _u555.now
  local in63 = _u555["in?"]
  local _62 = _u555[">"]
  local length = _u555.length
  local find = _u555.find
  local keep = _u555.keep
  local module = _u555.module
  local sub = _u555.sub
  local composite63 = _u555["composite?"]
  local series = _u555.series
  local id_literal63 = _u555["id-literal?"]
  local last = _u555.last
  local hd = _u555.hd
  local substring = _u555.substring
  local is63 = _u555["is?"]
  local unique = _u555.unique
  local keys = _u555.keys
  local iterate = _u555.iterate
  local hd61 = _u555["hd="]
  local pair = _u555.pair
  local butlast = _u555.butlast
  local number63 = _u555["number?"]
  local cat = _u555.cat
  local code = _u555.code
  local boolean63 = _u555["boolean?"]
  local stash = _u555.stash
  local exit = _u555.exit
  local reduce = _u555.reduce
  local some63 = _u555["some?"]
  local read_file = _u555["read-file"]
  local keys63 = _u555["keys?"]
  local replicate = _u555.replicate
  local setenv = _u555.setenv
  local atom63 = _u555["atom?"]
  local string_literal63 = _u555["string-literal?"]
  local module_key = _u555["module-key"]
  local _37message_handler = _u555["%message-handler"]
  local unstash = _u555.unstash
  local toplevel63 = _u555["toplevel?"]
  local drop = _u555.drop
  local nil63 = _u555["nil?"]
  local none63 = _u555["none?"]
  local one63 = _u555["one?"]
  local today = _u555.today
  local write_file = _u555["write-file"]
  local list63 = _u555["list?"]
  local char = _u555.char
  local _6261 = _u555[">="]
  local split = _u555.split
  local empty63 = _u555["empty?"]
  local string63 = _u555["string?"]
  local search = _u555.search
  local string = _u555.string
  local tl = _u555.tl
  local _u558 = nexus["lumen/lib"]
  local quote_environment = _u558["quote-environment"]
  local key = _u558.key
  local bind = _u558.bind
  local bound63 = _u558["bound?"]
  local mapo = _u558.mapo
  local statement63 = _u558["statement?"]
  local valid_id63 = _u558["valid-id?"]
  local quoted = _u558.quoted
  local indentation = _u558.indentation
  local macroexpand = _u558.macroexpand
  local symbol63 = _u558["symbol?"]
  local symbol_expansion = _u558["symbol-expansion"]
  local bind42 = _u558["bind*"]
  local initial_environment = _u558["initial-environment"]
  local quasiexpand = _u558.quasiexpand
  local link = _u558.link
  local stash42 = _u558["stash*"]
  local index = _u558.index
  local imported = _u558.imported
  local macro_function = _u558["macro-function"]
  local special_form63 = _u558["special-form?"]
  local getenv = _u558.getenv
  local special63 = _u558["special?"]
  local variable63 = _u558["variable?"]
  local id = _u558.id
  local reserved63 = _u558["reserved?"]
  local quote_modules = _u558["quote-modules"]
  local macro63 = _u558["macro?"]
  local _u559 = nexus["lumen/compiler"]
  local compile = _u559.compile
  local declare = _u559.declare
  local open_module = _u559["open-module"]
  local compile_module = _u559["compile-module"]
  local in_module = _u559["in-module"]
  local compile_function = _u559["compile-function"]
  local load_module = _u559["load-module"]
  local import_modules = _u559["import-modules"]
  local eval = _u559.eval
end)();
(function ()
  nexus["lumen/core"] = {}
  local _u956 = nexus["lumen/runtime"]
  local join = _u956.join
  local table63 = _u956["table?"]
  local _42 = _u956["*"]
  local _43 = _u956["+"]
  local function63 = _u956["function?"]
  local _ = _u956["-"]
  local reverse = _u956.reverse
  local inner = _u956.inner
  local _6061 = _u956["<="]
  local _37 = _u956["%"]
  local add = _u956.add
  local apply = _u956.apply
  local map = _u956.map
  local space = _u956.space
  local _60 = _u956["<"]
  local _61 = _u956["="]
  local _47 = _u956["/"]
  local write = _u956.write
  local sort = _u956.sort
  local number = _u956.number
  local now = _u956.now
  local in63 = _u956["in?"]
  local _62 = _u956[">"]
  local length = _u956.length
  local find = _u956.find
  local keep = _u956.keep
  local module = _u956.module
  local sub = _u956.sub
  local composite63 = _u956["composite?"]
  local series = _u956.series
  local id_literal63 = _u956["id-literal?"]
  local last = _u956.last
  local hd = _u956.hd
  local substring = _u956.substring
  local is63 = _u956["is?"]
  local unique = _u956.unique
  local keys = _u956.keys
  local iterate = _u956.iterate
  local hd61 = _u956["hd="]
  local pair = _u956.pair
  local butlast = _u956.butlast
  local number63 = _u956["number?"]
  local cat = _u956.cat
  local code = _u956.code
  local boolean63 = _u956["boolean?"]
  local stash = _u956.stash
  local exit = _u956.exit
  local reduce = _u956.reduce
  local some63 = _u956["some?"]
  local read_file = _u956["read-file"]
  local keys63 = _u956["keys?"]
  local replicate = _u956.replicate
  local setenv = _u956.setenv
  local atom63 = _u956["atom?"]
  local string_literal63 = _u956["string-literal?"]
  local module_key = _u956["module-key"]
  local _37message_handler = _u956["%message-handler"]
  local unstash = _u956.unstash
  local toplevel63 = _u956["toplevel?"]
  local drop = _u956.drop
  local nil63 = _u956["nil?"]
  local none63 = _u956["none?"]
  local one63 = _u956["one?"]
  local today = _u956.today
  local write_file = _u956["write-file"]
  local list63 = _u956["list?"]
  local char = _u956.char
  local _6261 = _u956[">="]
  local split = _u956.split
  local empty63 = _u956["empty?"]
  local string63 = _u956["string?"]
  local search = _u956.search
  local string = _u956.string
  local tl = _u956.tl
  local _u959 = nexus["lumen/lib"]
  local quote_environment = _u959["quote-environment"]
  local key = _u959.key
  local bind = _u959.bind
  local bound63 = _u959["bound?"]
  local mapo = _u959.mapo
  local statement63 = _u959["statement?"]
  local valid_id63 = _u959["valid-id?"]
  local quoted = _u959.quoted
  local indentation = _u959.indentation
  local macroexpand = _u959.macroexpand
  local symbol63 = _u959["symbol?"]
  local symbol_expansion = _u959["symbol-expansion"]
  local bind42 = _u959["bind*"]
  local initial_environment = _u959["initial-environment"]
  local quasiexpand = _u959.quasiexpand
  local link = _u959.link
  local stash42 = _u959["stash*"]
  local index = _u959.index
  local imported = _u959.imported
  local macro_function = _u959["macro-function"]
  local special_form63 = _u959["special-form?"]
  local getenv = _u959.getenv
  local special63 = _u959["special?"]
  local variable63 = _u959["variable?"]
  local id = _u959.id
  local reserved63 = _u959["reserved?"]
  local quote_modules = _u959["quote-modules"]
  local macro63 = _u959["macro?"]
  local _u960 = nexus["lumen/compiler"]
  local compile = _u960.compile
  local declare = _u960.declare
  local open_module = _u960["open-module"]
  local compile_module = _u960["compile-module"]
  local in_module = _u960["in-module"]
  local compile_function = _u960["compile-function"]
  local load_module = _u960["load-module"]
  local import_modules = _u960["import-modules"]
  local eval = _u960.eval
  target = "lua"
end)();
(function ()
  nexus["lumen/boot"] = {}
  local _u1829 = nexus["lumen/runtime"]
  local join = _u1829.join
  local table63 = _u1829["table?"]
  local _42 = _u1829["*"]
  local _43 = _u1829["+"]
  local function63 = _u1829["function?"]
  local _ = _u1829["-"]
  local reverse = _u1829.reverse
  local inner = _u1829.inner
  local _6061 = _u1829["<="]
  local _37 = _u1829["%"]
  local add = _u1829.add
  local apply = _u1829.apply
  local map = _u1829.map
  local space = _u1829.space
  local _60 = _u1829["<"]
  local _61 = _u1829["="]
  local _47 = _u1829["/"]
  local write = _u1829.write
  local sort = _u1829.sort
  local number = _u1829.number
  local now = _u1829.now
  local in63 = _u1829["in?"]
  local _62 = _u1829[">"]
  local length = _u1829.length
  local find = _u1829.find
  local keep = _u1829.keep
  local module = _u1829.module
  local sub = _u1829.sub
  local composite63 = _u1829["composite?"]
  local series = _u1829.series
  local id_literal63 = _u1829["id-literal?"]
  local last = _u1829.last
  local hd = _u1829.hd
  local substring = _u1829.substring
  local is63 = _u1829["is?"]
  local unique = _u1829.unique
  local keys = _u1829.keys
  local iterate = _u1829.iterate
  local hd61 = _u1829["hd="]
  local pair = _u1829.pair
  local butlast = _u1829.butlast
  local number63 = _u1829["number?"]
  local cat = _u1829.cat
  local code = _u1829.code
  local boolean63 = _u1829["boolean?"]
  local stash = _u1829.stash
  local exit = _u1829.exit
  local reduce = _u1829.reduce
  local some63 = _u1829["some?"]
  local read_file = _u1829["read-file"]
  local keys63 = _u1829["keys?"]
  local replicate = _u1829.replicate
  local setenv = _u1829.setenv
  local atom63 = _u1829["atom?"]
  local string_literal63 = _u1829["string-literal?"]
  local module_key = _u1829["module-key"]
  local _37message_handler = _u1829["%message-handler"]
  local unstash = _u1829.unstash
  local toplevel63 = _u1829["toplevel?"]
  local drop = _u1829.drop
  local nil63 = _u1829["nil?"]
  local none63 = _u1829["none?"]
  local one63 = _u1829["one?"]
  local today = _u1829.today
  local write_file = _u1829["write-file"]
  local list63 = _u1829["list?"]
  local char = _u1829.char
  local _6261 = _u1829[">="]
  local split = _u1829.split
  local empty63 = _u1829["empty?"]
  local string63 = _u1829["string?"]
  local search = _u1829.search
  local string = _u1829.string
  local tl = _u1829.tl
  local _u1832 = nexus["lumen/lib"]
  local quote_environment = _u1832["quote-environment"]
  local key = _u1832.key
  local bind = _u1832.bind
  local bound63 = _u1832["bound?"]
  local mapo = _u1832.mapo
  local statement63 = _u1832["statement?"]
  local valid_id63 = _u1832["valid-id?"]
  local quoted = _u1832.quoted
  local indentation = _u1832.indentation
  local macroexpand = _u1832.macroexpand
  local symbol63 = _u1832["symbol?"]
  local symbol_expansion = _u1832["symbol-expansion"]
  local bind42 = _u1832["bind*"]
  local initial_environment = _u1832["initial-environment"]
  local quasiexpand = _u1832.quasiexpand
  local link = _u1832.link
  local stash42 = _u1832["stash*"]
  local index = _u1832.index
  local imported = _u1832.imported
  local macro_function = _u1832["macro-function"]
  local special_form63 = _u1832["special-form?"]
  local getenv = _u1832.getenv
  local special63 = _u1832["special?"]
  local variable63 = _u1832["variable?"]
  local id = _u1832.id
  local reserved63 = _u1832["reserved?"]
  local quote_modules = _u1832["quote-modules"]
  local macro63 = _u1832["macro?"]
  local _u1833 = nexus["lumen/compiler"]
  local compile = _u1833.compile
  local declare = _u1833.declare
  local open_module = _u1833["open-module"]
  local compile_module = _u1833["compile-module"]
  local in_module = _u1833["in-module"]
  local compile_function = _u1833["compile-function"]
  local load_module = _u1833["load-module"]
  local import_modules = _u1833["import-modules"]
  local eval = _u1833.eval
  modules = {["lumen/lib"] = {import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}}, export = {["quasisplice?"] = {variable = true}, ["with-indent"] = {export = true, macro = function (form)
    local result = unique()
    return({"do", {"inc", "indent-level"}, {"let", {result, form}, {"dec", "indent-level"}, result}})
  end}, ["quote-environment"] = {variable = true, export = true}, escape = {variable = true}, key = {variable = true, export = true}, extend = {variable = true}, bind = {variable = true, export = true}, ["bound?"] = {variable = true, export = true}, mapo = {variable = true, export = true}, ["statement?"] = {variable = true, export = true}, ["valid-id?"] = {variable = true, export = true}, quoted = {variable = true, export = true}, indentation = {variable = true, export = true}, macroexpand = {variable = true, export = true}, ["symbol?"] = {variable = true, export = true}, ["symbol-expansion"] = {variable = true, export = true}, ["bind*"] = {variable = true, export = true}, ["initial-environment"] = {variable = true, export = true}, quasiexpand = {variable = true, export = true}, ["quote-module"] = {variable = true}, ["quote-frame"] = {variable = true}, ["quasiquote-list"] = {variable = true}, ["quote-binding"] = {variable = true}, link = {variable = true, export = true}, ["stash*"] = {variable = true, export = true}, ["can-unquote?"] = {variable = true}, ["quasiquoting?"] = {variable = true}, ["valid-code?"] = {variable = true}, index = {variable = true, export = true}, imported = {variable = true, export = true}, ["quoting?"] = {variable = true}, ["macro-function"] = {variable = true, export = true}, exclude = {variable = true}, ["special-form?"] = {variable = true, export = true}, ["numeric?"] = {variable = true}, getenv = {variable = true, export = true}, reserved = {variable = true}, ["special?"] = {variable = true, export = true}, ["variable?"] = {variable = true, export = true}, bias = {variable = true}, id = {variable = true, export = true}, literal = {variable = true}, ["global?"] = {variable = true}, ["reserved?"] = {variable = true, export = true}, ["quote-modules"] = {variable = true, export = true}, ["macro?"] = {variable = true, export = true}, ["indent-level"] = {global = true, export = true}}}, ["lumen/special"] = {import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}, {"lumen", "lib"}, {"lumen", "compiler"}}, export = {["break"] = {stmt = true, export = true, special = function ()
    return(indentation() .. "break")
  end, foo = true}, ["not"] = {}, ["%for"] = {special = function (t, k, form)
    local _u1873 = compile(t)
    local ind = indentation()
    indent_level = indent_level + 1
    local _u1874 = compile(form, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local body = _u1874
    if target == "lua" then
      return(ind .. "for " .. k .. " in next, " .. _u1873 .. " do\n" .. body .. ind .. "end\n")
    else
      return(ind .. "for (" .. k .. " in " .. _u1873 .. ") {\n" .. body .. ind .. "}\n")
    end
  end, tr = true, export = true, stmt = true, foo = true}, ["%local"] = {stmt = true, export = true, special = function (name, value)
    local id = compile(name)
    local value1 = compile(value)
    local _u2152
    if is63(value) then
      _u2152 = " = " .. value1
    else
      _u2152 = ""
    end
    local rh = _u2152
    local _u2153
    if target == "js" then
      _u2153 = "var "
    else
      _u2153 = "local "
    end
    local keyword = _u2153
    local ind = indentation()
    return(ind .. keyword .. id .. rh)
  end, foo = true}, ["do"] = {special = function (...)
    local forms = unstash({...})
    local s = ""
    series(function (x)
      s = s .. compile(x, {_stash = true, stmt = true})
    end, forms)
    return(s)
  end, tr = true, export = true, stmt = true, foo = true}, error = {stmt = true, export = true, special = function (x)
    local _u2154
    if target == "js" then
      _u2154 = "throw new " .. compile({"Error", x})
    else
      _u2154 = "error(" .. compile(x) .. ")"
    end
    local e = _u2154
    return(indentation() .. e)
  end, foo = true}, ["%local-function"] = {special = function (name, args, body)
    local x = compile_function(args, body, {_stash = true, name = name, prefix = "local "})
    return(indentation() .. x)
  end, tr = true, export = true, stmt = true, foo = true}, ["while"] = {special = function (cond, form)
    local _u1882 = compile(cond)
    indent_level = indent_level + 1
    local _u1883 = compile(form, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local body = _u1883
    local ind = indentation()
    if target == "js" then
      return(ind .. "while (" .. _u1882 .. ") {\n" .. body .. ind .. "}\n")
    else
      return(ind .. "while " .. _u1882 .. " do\n" .. body .. ind .. "end\n")
    end
  end, tr = true, export = true, stmt = true, foo = true}, get = {export = true, special = function (t, k)
    local _u1885 = compile(t)
    local k1 = compile(k)
    if target == "lua" and char(_u1885, 0) == "{" then
      _u1885 = "(" .. _u1885 .. ")"
    end
    if string_literal63(k) and valid_id63(inner(k)) then
      return(_u1885 .. "." .. inner(k))
    else
      return(_u1885 .. "[" .. k1 .. "]")
    end
  end, foo = true}, ["%object"] = {export = true, special = function (...)
    local forms = unstash({...})
    local s = "{"
    local c = ""
    local _u2155
    if target == "lua" then
      _u2155 = " = "
    else
      _u2155 = ": "
    end
    local sep = _u2155
    local _u1887 = pair(forms)
    local k = nil
    for k in next, _u1887 do
      local v = _u1887[k]
      if number63(k) then
        local _u1889 = v[1]
        local _u1890 = v[2]
        if not string63(_u1889) then
          error("Illegal key: " .. string(_u1889))
        end
        s = s .. c .. key(_u1889) .. sep .. compile(_u1890)
        c = ", "
      end
    end
    return(s .. "}")
  end, foo = true}, ["%function"] = {export = true, special = function (args, body)
    return(compile_function(args, body))
  end, foo = true}, ["%if"] = {special = function (cond, cons, alt)
    local _u1893 = compile(cond)
    indent_level = indent_level + 1
    local _u1895 = compile(cons, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local _u1894 = _u1895
    local _u2156
    if alt then
      indent_level = indent_level + 1
      local _u1897 = compile(alt, {_stash = true, stmt = true})
      indent_level = indent_level - 1
      _u2156 = _u1897
    end
    local _u1896 = _u2156
    local ind = indentation()
    local s = ""
    if target == "js" then
      s = s .. ind .. "if (" .. _u1893 .. ") {\n" .. _u1894 .. ind .. "}"
    else
      s = s .. ind .. "if " .. _u1893 .. " then\n" .. _u1894
    end
    if _u1896 and target == "js" then
      s = s .. " else {\n" .. _u1896 .. ind .. "}"
    else
      if _u1896 then
        s = s .. ind .. "else\n" .. _u1896
      end
    end
    if target == "lua" then
      return(s .. ind .. "end\n")
    else
      return(s .. "\n")
    end
  end, tr = true, export = true, stmt = true, foo = true}, ["%array"] = {export = true, special = function (...)
    local forms = unstash({...})
    local _u2157
    if target == "lua" then
      _u2157 = "{"
    else
      _u2157 = "["
    end
    local open = _u2157
    local _u2158
    if target == "lua" then
      _u2158 = "}"
    else
      _u2158 = "]"
    end
    local close = _u2158
    local s = ""
    local c = ""
    local _u1899 = forms
    local k = nil
    for k in next, _u1899 do
      local v = _u1899[k]
      if number63(k) then
        s = s .. c .. compile(v)
        c = ", "
      end
    end
    return(open .. s .. close)
  end, foo = true}, ["return"] = {stmt = true, export = true, special = function (x)
    local _u2159
    if nil63(x) then
      _u2159 = "return"
    else
      _u2159 = "return(" .. compile(x) .. ")"
    end
    local _u1902 = _u2159
    return(indentation() .. _u1902)
  end, foo = true}, ["%global-function"] = {special = function (name, args, body)
    if target == "lua" then
      local x = compile_function(args, body, {_stash = true, name = name})
      return(indentation() .. x)
    else
      return(compile({"set", name, {"%function", args, body}}, {_stash = true, stmt = true}))
    end
  end, tr = true, export = true, stmt = true, foo = true}, ["%try"] = {special = function (form)
    local ind = indentation()
    indent_level = indent_level + 1
    local _u1907 = compile(form, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local body = _u1907
    local e = unique()
    local hf = {"return", {"%array", false, {"get", e, "\"message\""}}}
    indent_level = indent_level + 1
    local _u1911 = compile(hf, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local h = _u1911
    return(ind .. "try {\n" .. body .. ind .. "}\n" .. ind .. "catch (" .. e .. ") {\n" .. h .. ind .. "}\n")
  end, tr = true, export = true, stmt = true, foo = true}, set = {stmt = true, export = true, special = function (lh, rh)
    local _u1913 = compile(lh)
    local _u2160
    if nil63(rh) then
      _u2160 = "nil"
    else
      _u2160 = rh
    end
    local _u1914 = compile(_u2160)
    return(indentation() .. _u1913 .. " = " .. _u1914)
  end, foo = true}}}, user = {import = {"lumen", {"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}}, export = {}}, ["lumen/compiler"] = {import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}, {"lumen", "lib"}, {"lumen", "reader"}}, export = {["lower-for"] = {variable = true}, ["lower-statement"] = {variable = true}, ["infix?"] = {variable = true}, ["compile-infix"] = {variable = true}, compile = {variable = true, export = true}, ["compile-special"] = {variable = true}, ["lower-try"] = {variable = true}, ["lower-infix"] = {variable = true}, declare = {variable = true, export = true}, ["lower-short"] = {variable = true}, ["compile-call"] = {variable = true}, ["open-module"] = {variable = true, export = true}, ["unary?"] = {variable = true}, ["lower-body"] = {variable = true}, process = {variable = true}, run = {variable = true}, ["lower-if"] = {variable = true}, ["%result"] = {global = true, export = true}, ["lower-do"] = {variable = true}, context = {variable = true}, ["compile-atom"] = {variable = true}, ["%compile-module"] = {variable = true}, conclude = {variable = true}, ["lower-special"] = {variable = true}, ["compile-args"] = {variable = true}, ["compiler-output"] = {variable = true}, ["parenthesize-call?"] = {variable = true}, ["compile-module"] = {variable = true, export = true}, infix = {variable = true}, ["compiling?"] = {variable = true}, encapsulate = {variable = true}, ["module-path"] = {variable = true}, ["current-module"] = {global = true, export = true}, ["lower-infix?"] = {variable = true}, ["lower-definition"] = {variable = true}, ["in-module"] = {variable = true, export = true}, ["lower-call"] = {variable = true}, terminator = {variable = true}, ["lower-function"] = {variable = true}, ["compile-function"] = {variable = true, export = true}, ["op-delims"] = {variable = true}, ["load-module"] = {variable = true, export = true}, ["import-modules"] = {variable = true, export = true}, ["lower-while"] = {variable = true}, getop = {variable = true}, precedence = {variable = true}, eval = {variable = true, export = true}, ["can-return?"] = {variable = true}, lower = {variable = true}}}, ["lumen/system"] = {import = {{"lumen", "special"}, {"lumen", "core"}}, export = {nexus = {global = true, export = true}}}, ["lumen/runtime"] = {import = {{"lumen", "special"}, {"lumen", "core"}}, export = {join = {variable = true, export = true}, ["table?"] = {variable = true, export = true}, ["*"] = {variable = true, export = true}, ["+"] = {variable = true, export = true}, ["function?"] = {variable = true, export = true}, ["-"] = {variable = true, export = true}, reverse = {variable = true, export = true}, inner = {variable = true, export = true}, ["<="] = {variable = true, export = true}, ["%"] = {variable = true, export = true}, add = {variable = true, export = true}, apply = {variable = true, export = true}, map = {variable = true, export = true}, space = {variable = true, export = true}, ["<"] = {variable = true, export = true}, ["="] = {variable = true, export = true}, ["/"] = {variable = true, export = true}, write = {variable = true, export = true}, sort = {variable = true, export = true}, number = {variable = true, export = true}, now = {variable = true, export = true}, ["in?"] = {variable = true, export = true}, [">"] = {variable = true, export = true}, length = {variable = true, export = true}, find = {variable = true, export = true}, keep = {variable = true, export = true}, module = {variable = true, export = true}, sub = {variable = true, export = true}, ["composite?"] = {variable = true, export = true}, series = {variable = true, export = true}, ["id-literal?"] = {variable = true, export = true}, last = {variable = true, export = true}, hd = {variable = true, export = true}, shift = {variable = true}, substring = {variable = true, export = true}, ["is?"] = {variable = true, export = true}, unique = {variable = true, export = true}, keys = {variable = true, export = true}, iterate = {variable = true, export = true}, ["hd="] = {variable = true, export = true}, pair = {variable = true, export = true}, butlast = {variable = true, export = true}, ["number?"] = {variable = true, export = true}, cat = {variable = true, export = true}, code = {variable = true, export = true}, ["boolean?"] = {variable = true, export = true}, stash = {variable = true, export = true}, exit = {variable = true, export = true}, reduce = {variable = true, export = true}, ["some?"] = {variable = true, export = true}, ["read-file"] = {variable = true, export = true}, ["keys?"] = {variable = true, export = true}, replicate = {variable = true, export = true}, setenv = {variable = true, export = true}, ["atom?"] = {variable = true, export = true}, ["string-literal?"] = {variable = true, export = true}, ["module-key"] = {variable = true, export = true}, ["%message-handler"] = {variable = true, export = true}, unstash = {variable = true, export = true}, ["toplevel?"] = {variable = true, export = true}, drop = {variable = true, export = true}, ["nil?"] = {variable = true, export = true}, ["none?"] = {variable = true, export = true}, ["id-count"] = {variable = true}, ["one?"] = {variable = true, export = true}, today = {variable = true, export = true}, ["write-file"] = {variable = true, export = true}, ["list?"] = {variable = true, export = true}, char = {variable = true, export = true}, [">="] = {variable = true, export = true}, split = {variable = true, export = true}, ["empty?"] = {variable = true, export = true}, ["string?"] = {variable = true, export = true}, search = {variable = true, export = true}, string = {variable = true, export = true}, tl = {variable = true, export = true}}}, ["lumen/boot"] = {import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}, {"lumen", "lib"}, {"lumen", "compiler"}}, export = {["%initial-modules"] = {macro = function ()
    return(quote_modules())
  end}, ["%initial-environment"] = {macro = function ()
    return(quote_environment(initial_environment()))
  end}, modules = {global = true, export = true}}}, ["lumen/main"] = {import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}, {"lumen", "reader"}, {"lumen", "compiler"}}, export = {}}, ["lumen/core"] = {import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}, {"lumen", "lib"}, {"lumen", "compiler"}}, export = {["define-module"] = {export = true, macro = function (spec, ...)
    local _u1951 = unstash({...})
    local body = sub(_u1951, 0)
    local exp = body.export
    local alias = body.alias
    local imp = body.import
    local _u1953 = import_modules(imp)
    local imports = _u1953[1]
    local bindings = _u1953[2]
    local k = module_key(spec)
    current_module = spec
    modules[k] = {export = {}, import = imports, alias = alias}
    local _u1954 = exp or {}
    local _u953 = nil
    for _u953 in next, _u1954 do
      local x = _u1954[_u953]
      setenv(x, {_stash = true, export = true})
    end
    return(join({"do", {"set", {"get", "nexus", {"quote", k}}, {"table"}}}, bindings))
  end}, ["cat!"] = {export = true, macro = function (a, ...)
    local _u1961 = unstash({...})
    local bs = sub(_u1961, 0)
    return({"set", a, join({"cat", a}, bs)})
  end}, pr = {export = true, macro = function (...)
    local xs = unstash({...})
    return({"print", space(xs)})
  end}, ["define-special"] = {export = true, macro = function (name, args, ...)
    local _u1967 = unstash({...})
    local body = sub(_u1967, 0)
    local form = join({"fn", args}, body)
    local _u1970 = {"setenv", {"quote", name}}
    _u1970.special = form
    _u1970.form = {"quote", form}
    eval(join(_u1970, keys(body)))
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
  end}, ["define*"] = {export = true, macro = function (name, x, ...)
    local _u1979 = unstash({...})
    local body = sub(_u1979, 0)
    setenv(name, {_stash = true, global = true, export = true})
    if some63(body) then
      local _u1981 = bind42(x, body)
      local args = _u1981[1]
      local _u1982 = _u1981[2]
      return(join({"%global-function", name, args}, _u1982))
    else
      if target == "js" then
        return({"set", {"get", "global", {"quote", id(name)}}, x})
      else
        return({"set", name, x})
      end
    end
  end}, guard = {export = true, macro = function (expr)
    if target == "js" then
      return({{"fn", {}, {"%try", {"list", true, expr}}}})
    else
      local e = unique()
      local x = unique()
      local ex = "|" .. e .. "," .. x .. "|"
      return({"let", {ex, {"xpcall", {"fn", {}, expr}, "%message-handler"}}, {"list", e, x}})
    end
  end}, quote = {export = true, macro = function (form)
    return(quoted(form))
  end}, ["with-bindings"] = {export = true, macro = function (_u2000, ...)
    local names = _u2000[1]
    local _u1999 = unstash({...})
    local body = sub(_u1999, 0)
    local x = unique()
    local _u2005 = {"setenv", x}
    _u2005.variable = true
    local _u2002 = {"with-frame", {"all", {"_u954", x}, names, _u2005}}
    _u2002.scope = true
    return(join(_u2002, body))
  end}, quasiquote = {export = true, macro = function (form)
    return(quasiexpand(form, 1))
  end}, ["set-of"] = {export = true, macro = function (...)
    local xs = unstash({...})
    local l = {}
    local _u2008 = xs
    local _u955 = nil
    for _u955 in next, _u2008 do
      local x = _u2008[_u955]
      l[x] = true
    end
    return(join({"table"}, l))
  end}, ["set*"] = {export = true, macro = function (name, value)
    return(link(name, {"set", name, value}))
  end}, dec = {export = true, macro = function (n, by)
    return({"set", n, {"-", n, by or 1}})
  end}, unless = {export = true, macro = function (cond, ...)
    local _u2016 = unstash({...})
    local body = sub(_u2016, 0)
    return({"if", {"not", cond}, join({"do"}, body)})
  end}, when = {export = true, macro = function (cond, ...)
    local _u2021 = unstash({...})
    local body = sub(_u2021, 0)
    return({"if", cond, join({"do"}, body)})
  end}, fn = {export = true, macro = function (args, ...)
    local _u2025 = unstash({...})
    local body = sub(_u2025, 0)
    local _u2027 = bind42(args, body)
    local _u2028 = _u2027[1]
    local _u2029 = _u2027[2]
    return(join({"%function", _u2028}, _u2029))
  end}, ["with-frame"] = {export = true, macro = function (...)
    local _u2031 = unstash({...})
    local scope = _u2031.scope
    local body = sub(_u2031, 0)
    local x = unique()
    local _u2035 = {"table"}
    _u2035._scope = scope
    return({"do", {"add", "environment", _u2035}, {"let", {x, join({"do"}, body)}, {"drop", "environment"}, x}})
  end}, ["join!"] = {export = true, macro = function (a, ...)
    local _u2040 = unstash({...})
    local bs = sub(_u2040, 0)
    return({"set", a, join({"join*", a}, bs)})
  end}, ["if"] = {export = true, macro = function (...)
    local branches = unstash({...})
    local function step(_u2046)
      local a = _u2046[1]
      local b = _u2046[2]
      local c = sub(_u2046, 2)
      if is63(b) then
        return({join({"%if", a, b}, step(c))})
      else
        if is63(a) then
          return({a})
        end
      end
    end
    return(hd(step(branches)))
  end}, ["join*"] = {export = true, macro = function (...)
    local xs = unstash({...})
    return(reduce(function (a, b)
      return({"join", a, b})
    end, xs))
  end}, target = {export = true, global = true, macro = function (...)
    local clauses = unstash({...})
    return(clauses[target])
  end}, language = {export = true, macro = function ()
    return({"quote", target})
  end}, all = {export = true, macro = function (_u2057, t, ...)
    local k = _u2057[1]
    local v = _u2057[2]
    local _u2056 = unstash({...})
    local body = sub(_u2056, 0)
    local x = unique()
    local n = unique()
    local _u2161
    if target == "lua" then
      _u2161 = body
    else
      _u2161 = {join({"let", {n, {"parseInt", k}, k, {"if", {"isNaN", n}, k, n}}}, body)}
    end
    return({"let", {x, t, k, "nil"}, {"%for", x, k, join({"let", {v, {"get", x, k}}}, _u2161)}})
  end}, ["define-symbol"] = {export = true, macro = function (name, expansion)
    setenv(name, {_stash = true, symbol = expansion})
    return(nil)
  end}, let = {export = true, macro = function (bindings, ...)
    local _u2072 = unstash({...})
    local body = sub(_u2072, 0)
    if length(bindings) < 2 then
      return(join({"do"}, body))
    else
      local renames = {}
      local locals = {}
      local lh = bindings[1]
      local rh = bindings[2]
      local _u2075 = bind(lh, rh)
      local k = nil
      for k in next, _u2075 do
        local _u2077 = _u2075[k]
        local id = _u2077[1]
        local val = _u2077[2]
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
  end}, at = {export = true, macro = function (l, i)
    if target == "lua" and number63(i) then
      i = i + 1
    else
      if target == "lua" then
        i = {"+", i, 1}
      end
    end
    return({"get", l, i})
  end}, list = {export = true, macro = function (...)
    local body = unstash({...})
    local l = {}
    local forms = {}
    local id = unique()
    local _u2087 = body
    local k = nil
    for k in next, _u2087 do
      local v = _u2087[k]
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
  end}, table = {export = true, macro = function (...)
    local body = unstash({...})
    return(join({"%object"}, mapo(function (x)
      return(x)
    end, body)))
  end}, define = {export = true, macro = function (name, x, ...)
    local _u2100 = unstash({...})
    local body = sub(_u2100, 0)
    setenv(name, {_stash = true, variable = true})
    if some63(body) and target == "js" then
      return(link(name, {"%local", name, join({"fn", x}, body)}))
    else
      if some63(body) then
        local _u2104 = bind42(x, body)
        local args = _u2104[1]
        local _u2105 = _u2104[2]
        return(link(name, join({"%local-function", name, args}, _u2105)))
      else
        return(link(name, {"%local", name, x}))
      end
    end
  end}, ["define-macro"] = {export = true, macro = function (name, args, ...)
    local _u2108 = unstash({...})
    local body = sub(_u2108, 0)
    local form = join({"fn", args}, body)
    local _u2111 = {"setenv", {"quote", name}}
    _u2111.form = {"quote", form}
    _u2111.macro = form
    eval(_u2111)
    return(nil)
  end}, inc = {export = true, macro = function (n, by)
    return({"set", n, {"+", n, by or 1}})
  end}, ["let-symbol"] = {export = true, macro = function (expansions, ...)
    local _u2117 = unstash({...})
    local body = sub(_u2117, 0)
    add(environment, {})
    map(function (_u2121)
      local name = _u2121[1]
      local exp = _u2121[2]
      return(macroexpand({"define-symbol", name, exp}))
    end, pair(expansions))
    local _u2119 = join({"do"}, macroexpand(body))
    drop(environment)
    return(_u2119)
  end}}}, ["lumen/reader"] = {import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}}, export = {["peek-char"] = {variable = true}, ["make-stream"] = {variable = true, export = true}, read = {variable = true, export = true}, ["read-table"] = {variable = true, export = true}, ["read-char"] = {variable = true}, delimiters = {variable = true}, ["key?"] = {variable = true}, ["flag?"] = {variable = true}, eof = {variable = true}, ["skip-non-code"] = {variable = true}, ["define-reader"] = {export = true, macro = function (_u2129, ...)
    local char = _u2129[1]
    local stream = _u2129[2]
    local _u2128 = unstash({...})
    local body = sub(_u2128, 0)
    return({"set", {"get", "read-table", char}, join({"fn", {stream}}, body)})
  end}, ["read-all"] = {variable = true, export = true}, ["read-from-string"] = {variable = true, export = true}, whitespace = {variable = true}}}, lumen = {export = {}, alias = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}}, import = {{"lumen", "special"}}}}
  environment = {{["define-module"] = {export = true, macro = function (spec, ...)
    local _u2142 = unstash({...})
    local body = sub(_u2142, 0)
    local exp = body.export
    local alias = body.alias
    local imp = body.import
    local _u2144 = import_modules(imp)
    local imports = _u2144[1]
    local bindings = _u2144[2]
    local k = module_key(spec)
    current_module = spec
    modules[k] = {export = {}, import = imports, alias = alias}
    local _u2145 = exp or {}
    local _u953 = nil
    for _u953 in next, _u2145 do
      local x = _u2145[_u953]
      setenv(x, {_stash = true, export = true})
    end
    return(join({"do", {"set", {"get", "nexus", {"quote", k}}, {"table"}}}, bindings))
  end}}}
end)();
(function ()
  nexus.user = {}
  local _u2162 = nexus["lumen/runtime"]
  local join = _u2162.join
  local table63 = _u2162["table?"]
  local _42 = _u2162["*"]
  local _43 = _u2162["+"]
  local function63 = _u2162["function?"]
  local _ = _u2162["-"]
  local reverse = _u2162.reverse
  local inner = _u2162.inner
  local _6061 = _u2162["<="]
  local _37 = _u2162["%"]
  local add = _u2162.add
  local apply = _u2162.apply
  local map = _u2162.map
  local space = _u2162.space
  local _60 = _u2162["<"]
  local _61 = _u2162["="]
  local _47 = _u2162["/"]
  local write = _u2162.write
  local sort = _u2162.sort
  local number = _u2162.number
  local now = _u2162.now
  local in63 = _u2162["in?"]
  local _62 = _u2162[">"]
  local length = _u2162.length
  local find = _u2162.find
  local keep = _u2162.keep
  local module = _u2162.module
  local sub = _u2162.sub
  local composite63 = _u2162["composite?"]
  local series = _u2162.series
  local id_literal63 = _u2162["id-literal?"]
  local last = _u2162.last
  local hd = _u2162.hd
  local substring = _u2162.substring
  local is63 = _u2162["is?"]
  local unique = _u2162.unique
  local keys = _u2162.keys
  local iterate = _u2162.iterate
  local hd61 = _u2162["hd="]
  local pair = _u2162.pair
  local butlast = _u2162.butlast
  local number63 = _u2162["number?"]
  local cat = _u2162.cat
  local code = _u2162.code
  local boolean63 = _u2162["boolean?"]
  local stash = _u2162.stash
  local exit = _u2162.exit
  local reduce = _u2162.reduce
  local some63 = _u2162["some?"]
  local read_file = _u2162["read-file"]
  local keys63 = _u2162["keys?"]
  local replicate = _u2162.replicate
  local setenv = _u2162.setenv
  local atom63 = _u2162["atom?"]
  local string_literal63 = _u2162["string-literal?"]
  local module_key = _u2162["module-key"]
  local _37message_handler = _u2162["%message-handler"]
  local unstash = _u2162.unstash
  local toplevel63 = _u2162["toplevel?"]
  local drop = _u2162.drop
  local nil63 = _u2162["nil?"]
  local none63 = _u2162["none?"]
  local one63 = _u2162["one?"]
  local today = _u2162.today
  local write_file = _u2162["write-file"]
  local list63 = _u2162["list?"]
  local char = _u2162.char
  local _6261 = _u2162[">="]
  local split = _u2162.split
  local empty63 = _u2162["empty?"]
  local string63 = _u2162["string?"]
  local search = _u2162.search
  local string = _u2162.string
  local tl = _u2162.tl
end)();
(function ()
  nexus["lumen/main"] = {}
  local _u2 = nexus["lumen/runtime"]
  local join = _u2.join
  local table63 = _u2["table?"]
  local _42 = _u2["*"]
  local _43 = _u2["+"]
  local function63 = _u2["function?"]
  local _ = _u2["-"]
  local reverse = _u2.reverse
  local inner = _u2.inner
  local _6061 = _u2["<="]
  local _6261 = _u2[">="]
  local add = _u2.add
  local apply = _u2.apply
  local map = _u2.map
  local space = _u2.space
  local _60 = _u2["<"]
  local _61 = _u2["="]
  local _47 = _u2["/"]
  local write = _u2.write
  local sort = _u2.sort
  local number = _u2.number
  local now = _u2.now
  local in63 = _u2["in?"]
  local _62 = _u2[">"]
  local length = _u2.length
  local find = _u2.find
  local keep = _u2.keep
  local module = _u2.module
  local sub = _u2.sub
  local module_key = _u2["module-key"]
  local _37message_handler = _u2["%message-handler"]
  local id_literal63 = _u2["id-literal?"]
  local last = _u2.last
  local hd = _u2.hd
  local substring = _u2.substring
  local is63 = _u2["is?"]
  local unique = _u2.unique
  local keys = _u2.keys
  local drop = _u2.drop
  local hd61 = _u2["hd="]
  local pair = _u2.pair
  local butlast = _u2.butlast
  local number63 = _u2["number?"]
  local cat = _u2.cat
  local code = _u2.code
  local boolean63 = _u2["boolean?"]
  local stash = _u2.stash
  local exit = _u2.exit
  local reduce = _u2.reduce
  local some63 = _u2["some?"]
  local read_file = _u2["read-file"]
  local string63 = _u2["string?"]
  local none63 = _u2["none?"]
  local series = _u2.series
  local split = _u2.split
  local string_literal63 = _u2["string-literal?"]
  local char = _u2.char
  local nil63 = _u2["nil?"]
  local unstash = _u2.unstash
  local toplevel63 = _u2["toplevel?"]
  local tl = _u2.tl
  local _37 = _u2["%"]
  local iterate = _u2.iterate
  local one63 = _u2["one?"]
  local today = _u2.today
  local write_file = _u2["write-file"]
  local list63 = _u2["list?"]
  local setenv = _u2.setenv
  local replicate = _u2.replicate
  local search = _u2.search
  local empty63 = _u2["empty?"]
  local atom63 = _u2["atom?"]
  local keys63 = _u2["keys?"]
  local string = _u2.string
  local composite63 = _u2["composite?"]
  local _u5 = nexus["lumen/reader"]
  local read = _u5.read
  local read_table = _u5["read-table"]
  local make_stream = _u5["make-stream"]
  local read_all = _u5["read-all"]
  local read_from_string = _u5["read-from-string"]
  local _u6 = nexus["lumen/compiler"]
  local compile = _u6.compile
  local declare = _u6.declare
  local open_module = _u6["open-module"]
  local import_modules = _u6["import-modules"]
  local compile_module = _u6["compile-module"]
  local load_module = _u6["load-module"]
  local in_module = _u6["in-module"]
  local eval = _u6.eval
  local compile_function = _u6["compile-function"]
  local function rep(s)
    local _u2167,_u2168 = xpcall(function ()
      return(eval(read_from_string(s)))
    end, _37message_handler)
    local _u2166 = {_u2167, _u2168}
    local _u1 = _u2166[1]
    local x = _u2166[2]
    if is63(x) then
      return(print(string(x)))
    end
  end
  nexus["lumen/main"].rep = rep
  local function repl()
    local function step(s)
      rep(s)
      return(write("> "))
    end
    write("> ")
    while true do
      local s = io.read()
      if s then
        step(s)
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
