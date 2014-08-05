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
      local _u164
      if nil63(from) or from < 0 then
        _u164 = 0
      else
        _u164 = from
      end
      local i = _u164
      local n = length(x)
      local _u165
      if nil63(upto) or upto > n then
        _u165 = n
      else
        _u165 = upto
      end
      local _u57 = _u165
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
  local function char(s, n)
    return(sub(s, n, n + 1))
  end
  nexus["lumen/runtime"].char = char
  local function code(s, n)
    local _u166
    if n then
      _u166 = n + 1
    end
    return(string.byte(s, _u166))
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
  local function search(s, pattern, start)
    local _u167
    if start then
      _u167 = start + 1
    end
    local _u115 = _u167
    local i = string.find(s, pattern, _u115, true)
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
            local s = "("
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
              s = s .. sp .. v
              sp = " "
            end
            return(s .. ")")
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
    local _u159 = unstash({...})
    local keys = sub(_u159, 0)
    if string63(k) then
      local frame = last(environment)
      local x = frame[k] or {}
      local _u161 = keys
      local _u163 = nil
      for _u163 in next, _u161 do
        local v = _u161[_u163]
        x[_u163] = v
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
  local _u171 = nexus["lumen/runtime"]
  local nil63 = _u171["nil?"]
  local is63 = _u171["is?"]
  local length = _u171.length
  local none63 = _u171["none?"]
  local some63 = _u171["some?"]
  local one63 = _u171["one?"]
  local hd = _u171.hd
  local string63 = _u171["string?"]
  local number63 = _u171["number?"]
  local boolean63 = _u171["boolean?"]
  local function63 = _u171["function?"]
  local composite63 = _u171["composite?"]
  local atom63 = _u171["atom?"]
  local table63 = _u171["table?"]
  local list63 = _u171["list?"]
  local substring = _u171.substring
  local sub = _u171.sub
  local keys = _u171.keys
  local inner = _u171.inner
  local tl = _u171.tl
  local char = _u171.char
  local code = _u171.code
  local string_literal63 = _u171["string-literal?"]
  local id_literal63 = _u171["id-literal?"]
  local add = _u171.add
  local drop = _u171.drop
  local last = _u171.last
  local butlast = _u171.butlast
  local reverse = _u171.reverse
  local join = _u171.join
  local reduce = _u171.reduce
  local keep = _u171.keep
  local in63 = _u171["in?"]
  local find = _u171.find
  local pair = _u171.pair
  local sort = _u171.sort
  local iterate = _u171.iterate
  local replicate = _u171.replicate
  local series = _u171.series
  local map = _u171.map
  local keys63 = _u171["keys?"]
  local empty63 = _u171["empty?"]
  local stash = _u171.stash
  local unstash = _u171.unstash
  local search = _u171.search
  local split = _u171.split
  local cat = _u171.cat
  local _43 = _u171["+"]
  local _ = _u171["-"]
  local _42 = _u171["*"]
  local _47 = _u171["/"]
  local _37 = _u171["%"]
  local _62 = _u171[">"]
  local _60 = _u171["<"]
  local _61 = _u171["="]
  local _6261 = _u171[">="]
  local _6061 = _u171["<="]
  local read_file = _u171["read-file"]
  local write_file = _u171["write-file"]
  local write = _u171.write
  local exit = _u171.exit
  local today = _u171.today
  local now = _u171.now
  local number = _u171.number
  local string = _u171.string
  local space = _u171.space
  local apply = _u171.apply
  local unique = _u171.unique
  local _37message_handler = _u171["%message-handler"]
  local toplevel63 = _u171["toplevel?"]
  local module_key = _u171["module-key"]
  local module = _u171.module
  local setenv = _u171.setenv
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
      local _u340
      if c == "\n" then
        _u340 = "\\n"
      else
        local _u341
        if c == "\"" then
          _u341 = "\\\""
        else
          local _u342
          if c == "\\" then
            _u342 = "\\\\"
          else
            _u342 = c
          end
          _u341 = _u342
        end
        _u340 = _u341
      end
      local c1 = _u340
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
      local _u193 = args
      local k = nil
      for k in next, _u193 do
        local v = _u193[k]
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
        local _u203 = lh
        local k = nil
        for k in next, _u203 do
          local v = _u203[k]
          local _u343
          if k == "&" then
            _u343 = {"sub", rh, length(lh)}
          else
            _u343 = {"get", rh, {"quote", bias(k)}}
          end
          local x = _u343
          local _u344
          if v == true then
            _u344 = k
          else
            _u344 = v
          end
          local _u208 = _u344
          bs = join(bs, bind(_u208, x))
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
      local _u225 = args
      local k = nil
      for k in next, _u225 do
        local v = _u225[k]
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
          local _u168 = form[1]
          local name = form[2]
          local value = form[3]
          return({"%local", name, macroexpand(value)})
        else
          if x == "%function" then
            local _u169 = form[1]
            local args = form[2]
            local body = sub(form, 2)
            add(environment, {_scope = true})
            local _u241 = args
            local _u991 = nil
            for _u991 in next, _u241 do
              local _u239 = _u241[_u991]
              setenv(_u239, {_stash = true, variable = true})
            end
            local _u240 = join({"%function", args}, macroexpand(body))
            drop(environment)
            return(_u240)
          else
            if x == "%local-function" or x == "%global-function" then
              local _u170 = form[1]
              local _u244 = form[2]
              local _u245 = form[3]
              local _u246 = sub(form, 3)
              add(environment, {_scope = true})
              local _u249 = _u245
              local _u991 = nil
              for _u991 in next, _u249 do
                local _u247 = _u249[_u991]
                setenv(_u247, {_stash = true, variable = true})
              end
              local _u248 = join({x, _u244, _u245}, macroexpand(_u246))
              drop(environment)
              return(_u248)
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
    local _u255 = form
    local k = nil
    for k in next, _u255 do
      local v = _u255[k]
      if not number63(k) then
        local _u345
        if quasisplice63(v, depth) then
          _u345 = quasiexpand(v[2])
        else
          _u345 = quasiexpand(v, depth)
        end
        local _u257 = _u345
        last(xs)[k] = _u257
      end
    end
    series(function (x)
      if quasisplice63(x, depth) then
        local _u259 = quasiexpand(x[2])
        add(xs, _u259)
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
  local reserved = {["="] = true, ["=="] = true, ["+"] = true, ["-"] = true, ["%"] = true, ["*"] = true, ["/"] = true, ["<"] = true, [">"] = true, ["<="] = true, [">="] = true, ["break"] = true, ["case"] = true, ["catch"] = true, ["continue"] = true, ["debugger"] = true, ["default"] = true, ["delete"] = true, ["do"] = true, ["else"] = true, ["finally"] = true, ["for"] = true, ["function"] = true, ["if"] = true, ["in"] = true, ["instanceof"] = true, ["new"] = true, ["return"] = true, ["switch"] = true, ["this"] = true, ["throw"] = true, ["try"] = true, ["typeof"] = true, ["var"] = true, ["void"] = true, ["with"] = true, ["and"] = true, ["end"] = true, ["repeat"] = true, ["while"] = true, ["false"] = true, ["local"] = true, ["nil"] = true, ["then"] = true, ["not"] = true, ["true"] = true, ["elseif"] = true, ["or"] = true, ["until"] = true}
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
      local _u346
      if c == "-" then
        _u346 = "_"
      else
        local _u347
        if valid_code63(n) then
          _u347 = c
        else
          local _u348
          if i == 0 then
            _u348 = "_" .. n
          else
            _u348 = n
          end
          _u347 = _u348
        end
        _u346 = _u347
      end
      local c1 = _u346
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
    local _u298 = unstash({...})
    local private = _u298.private
    local m = unique()
    local k = module_key(spec)
    local imports = {}
    if nexus[k] then
      local _u300 = module(spec).export
      local _u302 = nil
      for _u302 in next, _u300 do
        local v = _u300[_u302]
        if v.variable and (private or v.export) then
          add(imports, {"%local", _u302, {"get", m, {"quote", _u302}}})
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
    local _u317 = unstash({...})
    local xs = sub(_u317, 0)
    return(join(t, xs))
  end
  nexus["lumen/lib"].extend = extend
  local function exclude(t, ...)
    local _u319 = unstash({...})
    local keys = sub(_u319, 0)
    local t1 = {}
    local _u321 = t
    local k = nil
    for k in next, _u321 do
      local v = _u321[k]
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
    local _u326 = t
    local k = nil
    for k in next, _u326 do
      local v = _u326[k]
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
    local _u335 = {"table"}
    _u335.import = quoted(m.import)
    _u335.alias = quoted(m.alias)
    _u335.export = quote_frame(m.export)
    return(_u335)
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
  local _u349 = nexus["lumen/runtime"]
  local nil63 = _u349["nil?"]
  local is63 = _u349["is?"]
  local length = _u349.length
  local none63 = _u349["none?"]
  local some63 = _u349["some?"]
  local one63 = _u349["one?"]
  local hd = _u349.hd
  local string63 = _u349["string?"]
  local number63 = _u349["number?"]
  local boolean63 = _u349["boolean?"]
  local function63 = _u349["function?"]
  local composite63 = _u349["composite?"]
  local atom63 = _u349["atom?"]
  local table63 = _u349["table?"]
  local list63 = _u349["list?"]
  local substring = _u349.substring
  local sub = _u349.sub
  local keys = _u349.keys
  local inner = _u349.inner
  local tl = _u349.tl
  local char = _u349.char
  local code = _u349.code
  local string_literal63 = _u349["string-literal?"]
  local id_literal63 = _u349["id-literal?"]
  local add = _u349.add
  local drop = _u349.drop
  local last = _u349.last
  local butlast = _u349.butlast
  local reverse = _u349.reverse
  local join = _u349.join
  local reduce = _u349.reduce
  local keep = _u349.keep
  local in63 = _u349["in?"]
  local find = _u349.find
  local pair = _u349.pair
  local sort = _u349.sort
  local iterate = _u349.iterate
  local replicate = _u349.replicate
  local series = _u349.series
  local map = _u349.map
  local keys63 = _u349["keys?"]
  local empty63 = _u349["empty?"]
  local stash = _u349.stash
  local unstash = _u349.unstash
  local search = _u349.search
  local split = _u349.split
  local cat = _u349.cat
  local _43 = _u349["+"]
  local _ = _u349["-"]
  local _42 = _u349["*"]
  local _47 = _u349["/"]
  local _37 = _u349["%"]
  local _62 = _u349[">"]
  local _60 = _u349["<"]
  local _61 = _u349["="]
  local _6261 = _u349[">="]
  local _6061 = _u349["<="]
  local read_file = _u349["read-file"]
  local write_file = _u349["write-file"]
  local write = _u349.write
  local exit = _u349.exit
  local today = _u349.today
  local now = _u349.now
  local number = _u349.number
  local string = _u349.string
  local space = _u349.space
  local apply = _u349.apply
  local unique = _u349.unique
  local _37message_handler = _u349["%message-handler"]
  local toplevel63 = _u349["toplevel?"]
  local module_key = _u349["module-key"]
  local module = _u349.module
  local setenv = _u349.setenv
  local delimiters = {["("] = true, [")"] = true, [";"] = true, ["\n"] = true}
  nexus["lumen/reader"].delimiters = delimiters
  local whitespace = {[" "] = true, ["\t"] = true, ["\n"] = true}
  nexus["lumen/reader"].whitespace = whitespace
  local function make_stream(str)
    return({pos = 0, string = str, len = length(str)})
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
  local _u398 = nexus["lumen/runtime"]
  local nil63 = _u398["nil?"]
  local is63 = _u398["is?"]
  local length = _u398.length
  local none63 = _u398["none?"]
  local some63 = _u398["some?"]
  local one63 = _u398["one?"]
  local hd = _u398.hd
  local string63 = _u398["string?"]
  local number63 = _u398["number?"]
  local boolean63 = _u398["boolean?"]
  local function63 = _u398["function?"]
  local composite63 = _u398["composite?"]
  local atom63 = _u398["atom?"]
  local table63 = _u398["table?"]
  local list63 = _u398["list?"]
  local substring = _u398.substring
  local sub = _u398.sub
  local keys = _u398.keys
  local inner = _u398.inner
  local tl = _u398.tl
  local char = _u398.char
  local code = _u398.code
  local string_literal63 = _u398["string-literal?"]
  local id_literal63 = _u398["id-literal?"]
  local add = _u398.add
  local drop = _u398.drop
  local last = _u398.last
  local butlast = _u398.butlast
  local reverse = _u398.reverse
  local join = _u398.join
  local reduce = _u398.reduce
  local keep = _u398.keep
  local in63 = _u398["in?"]
  local find = _u398.find
  local pair = _u398.pair
  local sort = _u398.sort
  local iterate = _u398.iterate
  local replicate = _u398.replicate
  local series = _u398.series
  local map = _u398.map
  local keys63 = _u398["keys?"]
  local empty63 = _u398["empty?"]
  local stash = _u398.stash
  local unstash = _u398.unstash
  local search = _u398.search
  local split = _u398.split
  local cat = _u398.cat
  local _43 = _u398["+"]
  local _ = _u398["-"]
  local _42 = _u398["*"]
  local _47 = _u398["/"]
  local _37 = _u398["%"]
  local _62 = _u398[">"]
  local _60 = _u398["<"]
  local _61 = _u398["="]
  local _6261 = _u398[">="]
  local _6061 = _u398["<="]
  local read_file = _u398["read-file"]
  local write_file = _u398["write-file"]
  local write = _u398.write
  local exit = _u398.exit
  local today = _u398.today
  local now = _u398.now
  local number = _u398.number
  local string = _u398.string
  local space = _u398.space
  local apply = _u398.apply
  local unique = _u398.unique
  local _37message_handler = _u398["%message-handler"]
  local toplevel63 = _u398["toplevel?"]
  local module_key = _u398["module-key"]
  local module = _u398.module
  local setenv = _u398.setenv
  local _u401 = nexus["lumen/lib"]
  local getenv = _u401.getenv
  local macro_function = _u401["macro-function"]
  local macro63 = _u401["macro?"]
  local special63 = _u401["special?"]
  local special_form63 = _u401["special-form?"]
  local statement63 = _u401["statement?"]
  local symbol_expansion = _u401["symbol-expansion"]
  local symbol63 = _u401["symbol?"]
  local variable63 = _u401["variable?"]
  local bound63 = _u401["bound?"]
  local quoted = _u401.quoted
  local stash42 = _u401["stash*"]
  local index = _u401.index
  local bind = _u401.bind
  local bind42 = _u401["bind*"]
  local quasiexpand = _u401.quasiexpand
  local macroexpand = _u401.macroexpand
  local indentation = _u401.indentation
  local reserved63 = _u401["reserved?"]
  local valid_id63 = _u401["valid-id?"]
  local id = _u401.id
  local key = _u401.key
  local imported = _u401.imported
  local link = _u401.link
  local mapo = _u401.mapo
  local quote_environment = _u401["quote-environment"]
  local quote_modules = _u401["quote-modules"]
  local initial_environment = _u401["initial-environment"]
  local _u402 = nexus["lumen/reader"]
  local make_stream = _u402["make-stream"]
  local read_table = _u402["read-table"]
  local read = _u402.read
  local read_all = _u402["read-all"]
  local read_from_string = _u402["read-from-string"]
  local _u405 = {}
  local _u406 = {}
  _u406.js = "!"
  _u406.lua = "not "
  _u405["not"] = _u406
  local _u408 = {}
  _u408["*"] = true
  _u408["/"] = true
  _u408["%"] = true
  local _u410 = {}
  _u410["+"] = true
  _u410["-"] = true
  local _u412 = {}
  local _u413 = {}
  _u413.js = "+"
  _u413.lua = ".."
  _u412.cat = _u413
  local _u415 = {}
  _u415["<"] = true
  _u415[">"] = true
  _u415["<="] = true
  _u415[">="] = true
  local _u417 = {}
  local _u418 = {}
  _u418.js = "==="
  _u418.lua = "=="
  _u417["="] = _u418
  local _u419 = {}
  _u419.js = "!="
  _u419.lua = "~="
  _u417["~="] = _u419
  local _u421 = {}
  local _u422 = {}
  _u422.js = "&&"
  _u422.lua = "and"
  _u421["and"] = _u422
  local _u424 = {}
  local _u425 = {}
  _u425.js = "||"
  _u425.lua = "or"
  _u424["or"] = _u425
  local infix = {_u405, _u408, _u410, _u412, _u415, _u417, _u421, _u424}
  nexus["lumen/compiler"].infix = infix
  local function unary63(form)
    local op = form[1]
    local args = sub(form, 1)
    return(one63(args) and in63(op, {"not", "-"}))
  end
  nexus["lumen/compiler"]["unary?"] = unary63
  local function precedence(form)
    if list63(form) and not unary63(form) then
      local _u429 = infix
      local k = nil
      for k in next, _u429 do
        local v = _u429[k]
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
    local _u439 = getenv(x)
    local special = _u439.special
    local stmt = _u439.stmt
    local self_tr63 = _u439.tr
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
    local _u442 = unstash({...})
    local right = _u442.right
    local _u542
    if right then
      _u542 = _6261
    else
      _u542 = _62
    end
    if _u542(precedence(child), precedence(parent)) then
      return({"(", ")"})
    else
      return({"", ""})
    end
  end
  nexus["lumen/compiler"]["op-delims"] = op_delims
  local function compile_infix(form)
    local op = form[1]
    local _u447 = sub(form, 1)
    local a = _u447[1]
    local b = _u447[2]
    local _u448 = op_delims(form, a)
    local ao = _u448[1]
    local ac = _u448[2]
    local _u449 = op_delims(form, b, {_stash = true, right = true})
    local bo = _u449[1]
    local bc = _u449[2]
    local _u450 = compile(a)
    local _u451 = compile(b)
    local _u452 = getop(op)
    if unary63(form) then
      return(_u452 .. ao .. _u450 .. ac)
    else
      return(ao .. _u450 .. ac .. " " .. _u452 .. " " .. bo .. _u451 .. bc)
    end
  end
  nexus["lumen/compiler"]["compile-infix"] = compile_infix
  local function compile_function(args, body, ...)
    local _u453 = unstash({...})
    local name = _u453.name
    local prefix = _u453.prefix
    local _u543
    if name then
      _u543 = compile(name)
    else
      _u543 = ""
    end
    local id = _u543
    local _u455 = prefix or ""
    local _u456 = compile_args(args)
    indent_level = indent_level + 1
    local _u458 = compile(body, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local _u457 = _u458
    local ind = indentation()
    local _u544
    if target == "js" then
      _u544 = ""
    else
      _u544 = "end"
    end
    local tr = _u544
    if name then
      tr = tr .. "\n"
    end
    if target == "js" then
      return("function " .. id .. _u456 .. " {\n" .. _u457 .. ind .. "}" .. tr)
    else
      return(_u455 .. "function " .. id .. _u456 .. "\n" .. _u457 .. ind .. tr)
    end
  end
  nexus["lumen/compiler"]["compile-function"] = compile_function
  local function can_return63(form)
    return(is63(form) and (atom63(form) or not (hd(form) == "return") and not statement63(hd(form))))
  end
  nexus["lumen/compiler"]["can-return?"] = can_return63
  compile = function (form, ...)
    local _u460 = unstash({...})
    local stmt = _u460.stmt
    if nil63(form) then
      return("")
    else
      if special_form63(form) then
        return(compile_special(form, stmt))
      else
        local tr = terminator(stmt)
        local _u545
        if stmt then
          _u545 = indentation()
        else
          _u545 = ""
        end
        local ind = _u545
        local _u546
        if atom63(form) then
          _u546 = compile_atom(form)
        else
          local _u547
          if infix63(hd(form)) then
            _u547 = compile_infix(form)
          else
            _u547 = compile_call(form)
          end
          _u546 = _u547
        end
        local _u462 = _u546
        return(ind .. _u462 .. tr)
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
    local _u473 = args[2]
    local _u474 = args[3]
    if stmt63 or tail63 then
      local _u549
      if _u474 then
        _u549 = {lower_body({_u474}, tail63)}
      end
      return(add(hoist, join({"%if", lower(cond, hoist), lower_body({_u473}, tail63)}, _u549)))
    else
      local e = unique()
      add(hoist, {"%local", e})
      local _u548
      if _u474 then
        _u548 = {lower({"set", e, _u474})}
      end
      add(hoist, join({"%if", lower(cond, hoist), lower({"set", e, _u473})}, _u548))
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
      local _u550
      if x == "and" then
        _u550 = {"%if", id, b, id}
      else
        _u550 = {"%if", id, id, b}
      end
      return(lower({"do", {"%local", id, a}, _u550}, hoist))
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
    local _u499 = args[2]
    local body = sub(args, 2)
    return(add(hoist, {kind, name, _u499, lower_body(body, true)}))
  end
  nexus["lumen/compiler"]["lower-definition"] = lower_definition
  local function lower_call(form, hoist)
    local _u502 = map(function (x)
      return(lower(x, hoist))
    end, form)
    if some63(_u502) then
      return(_u502)
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
    local body = read_all(make_stream(read_file(file)))
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
    local _u523 = unstash({...})
    local private = _u523.private
    local m = module(spec)
    local frame = last(environment)
    local _u525 = m.export
    local k = nil
    for k in next, _u525 do
      local v = _u525[k]
      if v.export or private then
        frame[k] = v
      end
    end
  end
  nexus["lumen/compiler"]["open-module"] = open_module
  local function load_module(spec, ...)
    local _u527 = unstash({...})
    local private = _u527.private
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
        local _u532 = import_modules(m.alias)
        local aliased = _u532[1]
        local bs = _u532[2]
        imports = join(imports, aliased)
        bindings = join(bindings, bs)
      else
        local _u533 = imported(spec)
        add(imports, spec)
        bindings = join(bindings, _u533)
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
  local _u551 = nexus["lumen/runtime"]
  local nil63 = _u551["nil?"]
  local is63 = _u551["is?"]
  local length = _u551.length
  local none63 = _u551["none?"]
  local some63 = _u551["some?"]
  local one63 = _u551["one?"]
  local hd = _u551.hd
  local string63 = _u551["string?"]
  local number63 = _u551["number?"]
  local boolean63 = _u551["boolean?"]
  local function63 = _u551["function?"]
  local composite63 = _u551["composite?"]
  local atom63 = _u551["atom?"]
  local table63 = _u551["table?"]
  local list63 = _u551["list?"]
  local substring = _u551.substring
  local sub = _u551.sub
  local keys = _u551.keys
  local inner = _u551.inner
  local tl = _u551.tl
  local char = _u551.char
  local code = _u551.code
  local string_literal63 = _u551["string-literal?"]
  local id_literal63 = _u551["id-literal?"]
  local add = _u551.add
  local drop = _u551.drop
  local last = _u551.last
  local butlast = _u551.butlast
  local reverse = _u551.reverse
  local join = _u551.join
  local reduce = _u551.reduce
  local keep = _u551.keep
  local in63 = _u551["in?"]
  local find = _u551.find
  local pair = _u551.pair
  local sort = _u551.sort
  local iterate = _u551.iterate
  local replicate = _u551.replicate
  local series = _u551.series
  local map = _u551.map
  local keys63 = _u551["keys?"]
  local empty63 = _u551["empty?"]
  local stash = _u551.stash
  local unstash = _u551.unstash
  local search = _u551.search
  local split = _u551.split
  local cat = _u551.cat
  local _43 = _u551["+"]
  local _ = _u551["-"]
  local _42 = _u551["*"]
  local _47 = _u551["/"]
  local _37 = _u551["%"]
  local _62 = _u551[">"]
  local _60 = _u551["<"]
  local _61 = _u551["="]
  local _6261 = _u551[">="]
  local _6061 = _u551["<="]
  local read_file = _u551["read-file"]
  local write_file = _u551["write-file"]
  local write = _u551.write
  local exit = _u551.exit
  local today = _u551.today
  local now = _u551.now
  local number = _u551.number
  local string = _u551.string
  local space = _u551.space
  local apply = _u551.apply
  local unique = _u551.unique
  local _37message_handler = _u551["%message-handler"]
  local toplevel63 = _u551["toplevel?"]
  local module_key = _u551["module-key"]
  local module = _u551.module
  local setenv = _u551.setenv
  local _u554 = nexus["lumen/lib"]
  local getenv = _u554.getenv
  local macro_function = _u554["macro-function"]
  local macro63 = _u554["macro?"]
  local special63 = _u554["special?"]
  local special_form63 = _u554["special-form?"]
  local statement63 = _u554["statement?"]
  local symbol_expansion = _u554["symbol-expansion"]
  local symbol63 = _u554["symbol?"]
  local variable63 = _u554["variable?"]
  local bound63 = _u554["bound?"]
  local quoted = _u554.quoted
  local stash42 = _u554["stash*"]
  local index = _u554.index
  local bind = _u554.bind
  local bind42 = _u554["bind*"]
  local quasiexpand = _u554.quasiexpand
  local macroexpand = _u554.macroexpand
  local indentation = _u554.indentation
  local reserved63 = _u554["reserved?"]
  local valid_id63 = _u554["valid-id?"]
  local id = _u554.id
  local key = _u554.key
  local imported = _u554.imported
  local link = _u554.link
  local mapo = _u554.mapo
  local quote_environment = _u554["quote-environment"]
  local quote_modules = _u554["quote-modules"]
  local initial_environment = _u554["initial-environment"]
  local _u555 = nexus["lumen/compiler"]
  local compile_function = _u555["compile-function"]
  local compile = _u555.compile
  local open_module = _u555["open-module"]
  local load_module = _u555["load-module"]
  local in_module = _u555["in-module"]
  local import_modules = _u555["import-modules"]
  local compile_module = _u555["compile-module"]
  local declare = _u555.declare
  local eval = _u555.eval
end)();
(function ()
  nexus["lumen/core"] = {}
  local _u953 = nexus["lumen/runtime"]
  local nil63 = _u953["nil?"]
  local is63 = _u953["is?"]
  local length = _u953.length
  local none63 = _u953["none?"]
  local some63 = _u953["some?"]
  local one63 = _u953["one?"]
  local hd = _u953.hd
  local string63 = _u953["string?"]
  local number63 = _u953["number?"]
  local boolean63 = _u953["boolean?"]
  local function63 = _u953["function?"]
  local composite63 = _u953["composite?"]
  local atom63 = _u953["atom?"]
  local table63 = _u953["table?"]
  local list63 = _u953["list?"]
  local substring = _u953.substring
  local sub = _u953.sub
  local keys = _u953.keys
  local inner = _u953.inner
  local tl = _u953.tl
  local char = _u953.char
  local code = _u953.code
  local string_literal63 = _u953["string-literal?"]
  local id_literal63 = _u953["id-literal?"]
  local add = _u953.add
  local drop = _u953.drop
  local last = _u953.last
  local butlast = _u953.butlast
  local reverse = _u953.reverse
  local join = _u953.join
  local reduce = _u953.reduce
  local keep = _u953.keep
  local in63 = _u953["in?"]
  local find = _u953.find
  local pair = _u953.pair
  local sort = _u953.sort
  local iterate = _u953.iterate
  local replicate = _u953.replicate
  local series = _u953.series
  local map = _u953.map
  local keys63 = _u953["keys?"]
  local empty63 = _u953["empty?"]
  local stash = _u953.stash
  local unstash = _u953.unstash
  local search = _u953.search
  local split = _u953.split
  local cat = _u953.cat
  local _43 = _u953["+"]
  local _ = _u953["-"]
  local _42 = _u953["*"]
  local _47 = _u953["/"]
  local _37 = _u953["%"]
  local _62 = _u953[">"]
  local _60 = _u953["<"]
  local _61 = _u953["="]
  local _6261 = _u953[">="]
  local _6061 = _u953["<="]
  local read_file = _u953["read-file"]
  local write_file = _u953["write-file"]
  local write = _u953.write
  local exit = _u953.exit
  local today = _u953.today
  local now = _u953.now
  local number = _u953.number
  local string = _u953.string
  local space = _u953.space
  local apply = _u953.apply
  local unique = _u953.unique
  local _37message_handler = _u953["%message-handler"]
  local toplevel63 = _u953["toplevel?"]
  local module_key = _u953["module-key"]
  local module = _u953.module
  local setenv = _u953.setenv
  local _u956 = nexus["lumen/lib"]
  local getenv = _u956.getenv
  local macro_function = _u956["macro-function"]
  local macro63 = _u956["macro?"]
  local special63 = _u956["special?"]
  local special_form63 = _u956["special-form?"]
  local statement63 = _u956["statement?"]
  local symbol_expansion = _u956["symbol-expansion"]
  local symbol63 = _u956["symbol?"]
  local variable63 = _u956["variable?"]
  local bound63 = _u956["bound?"]
  local quoted = _u956.quoted
  local stash42 = _u956["stash*"]
  local index = _u956.index
  local bind = _u956.bind
  local bind42 = _u956["bind*"]
  local quasiexpand = _u956.quasiexpand
  local macroexpand = _u956.macroexpand
  local indentation = _u956.indentation
  local reserved63 = _u956["reserved?"]
  local valid_id63 = _u956["valid-id?"]
  local id = _u956.id
  local key = _u956.key
  local imported = _u956.imported
  local link = _u956.link
  local mapo = _u956.mapo
  local quote_environment = _u956["quote-environment"]
  local quote_modules = _u956["quote-modules"]
  local initial_environment = _u956["initial-environment"]
  local _u957 = nexus["lumen/compiler"]
  local compile_function = _u957["compile-function"]
  local compile = _u957.compile
  local open_module = _u957["open-module"]
  local load_module = _u957["load-module"]
  local in_module = _u957["in-module"]
  local import_modules = _u957["import-modules"]
  local compile_module = _u957["compile-module"]
  local declare = _u957.declare
  local eval = _u957.eval
  target = "lua"
end)();
(function ()
  nexus["lumen/boot"] = {}
  local _u1810 = nexus["lumen/runtime"]
  local nil63 = _u1810["nil?"]
  local is63 = _u1810["is?"]
  local length = _u1810.length
  local none63 = _u1810["none?"]
  local some63 = _u1810["some?"]
  local one63 = _u1810["one?"]
  local hd = _u1810.hd
  local string63 = _u1810["string?"]
  local number63 = _u1810["number?"]
  local boolean63 = _u1810["boolean?"]
  local function63 = _u1810["function?"]
  local composite63 = _u1810["composite?"]
  local atom63 = _u1810["atom?"]
  local table63 = _u1810["table?"]
  local list63 = _u1810["list?"]
  local substring = _u1810.substring
  local sub = _u1810.sub
  local keys = _u1810.keys
  local inner = _u1810.inner
  local tl = _u1810.tl
  local char = _u1810.char
  local code = _u1810.code
  local string_literal63 = _u1810["string-literal?"]
  local id_literal63 = _u1810["id-literal?"]
  local add = _u1810.add
  local drop = _u1810.drop
  local last = _u1810.last
  local butlast = _u1810.butlast
  local reverse = _u1810.reverse
  local join = _u1810.join
  local reduce = _u1810.reduce
  local keep = _u1810.keep
  local in63 = _u1810["in?"]
  local find = _u1810.find
  local pair = _u1810.pair
  local sort = _u1810.sort
  local iterate = _u1810.iterate
  local replicate = _u1810.replicate
  local series = _u1810.series
  local map = _u1810.map
  local keys63 = _u1810["keys?"]
  local empty63 = _u1810["empty?"]
  local stash = _u1810.stash
  local unstash = _u1810.unstash
  local search = _u1810.search
  local split = _u1810.split
  local cat = _u1810.cat
  local _43 = _u1810["+"]
  local _ = _u1810["-"]
  local _42 = _u1810["*"]
  local _47 = _u1810["/"]
  local _37 = _u1810["%"]
  local _62 = _u1810[">"]
  local _60 = _u1810["<"]
  local _61 = _u1810["="]
  local _6261 = _u1810[">="]
  local _6061 = _u1810["<="]
  local read_file = _u1810["read-file"]
  local write_file = _u1810["write-file"]
  local write = _u1810.write
  local exit = _u1810.exit
  local today = _u1810.today
  local now = _u1810.now
  local number = _u1810.number
  local string = _u1810.string
  local space = _u1810.space
  local apply = _u1810.apply
  local unique = _u1810.unique
  local _37message_handler = _u1810["%message-handler"]
  local toplevel63 = _u1810["toplevel?"]
  local module_key = _u1810["module-key"]
  local module = _u1810.module
  local setenv = _u1810.setenv
  local _u1813 = nexus["lumen/lib"]
  local getenv = _u1813.getenv
  local macro_function = _u1813["macro-function"]
  local macro63 = _u1813["macro?"]
  local special63 = _u1813["special?"]
  local special_form63 = _u1813["special-form?"]
  local statement63 = _u1813["statement?"]
  local symbol_expansion = _u1813["symbol-expansion"]
  local symbol63 = _u1813["symbol?"]
  local variable63 = _u1813["variable?"]
  local bound63 = _u1813["bound?"]
  local quoted = _u1813.quoted
  local stash42 = _u1813["stash*"]
  local index = _u1813.index
  local bind = _u1813.bind
  local bind42 = _u1813["bind*"]
  local quasiexpand = _u1813.quasiexpand
  local macroexpand = _u1813.macroexpand
  local indentation = _u1813.indentation
  local reserved63 = _u1813["reserved?"]
  local valid_id63 = _u1813["valid-id?"]
  local id = _u1813.id
  local key = _u1813.key
  local imported = _u1813.imported
  local link = _u1813.link
  local mapo = _u1813.mapo
  local quote_environment = _u1813["quote-environment"]
  local quote_modules = _u1813["quote-modules"]
  local initial_environment = _u1813["initial-environment"]
  local _u1814 = nexus["lumen/compiler"]
  local compile_function = _u1814["compile-function"]
  local compile = _u1814.compile
  local open_module = _u1814["open-module"]
  local load_module = _u1814["load-module"]
  local in_module = _u1814["in-module"]
  local import_modules = _u1814["import-modules"]
  local compile_module = _u1814["compile-module"]
  local declare = _u1814.declare
  local eval = _u1814.eval
  modules = {lumen = {import = {{"lumen", "special"}}, alias = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}}, export = {}}, ["lumen/lib"] = {import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}}, export = {getenv = {export = true, variable = true}, ["macro-function"] = {export = true, variable = true}, ["macro?"] = {export = true, variable = true}, ["special?"] = {export = true, variable = true}, ["special-form?"] = {export = true, variable = true}, ["statement?"] = {export = true, variable = true}, ["symbol-expansion"] = {export = true, variable = true}, ["symbol?"] = {export = true, variable = true}, ["variable?"] = {export = true, variable = true}, ["bound?"] = {export = true, variable = true}, quoted = {export = true, variable = true}, ["stash*"] = {export = true, variable = true}, index = {export = true, variable = true}, bind = {export = true, variable = true}, ["bind*"] = {export = true, variable = true}, quasiexpand = {export = true, variable = true}, macroexpand = {export = true, variable = true}, indentation = {export = true, variable = true}, ["with-indent"] = {export = true, macro = function (form)
    local result = unique()
    return({"do", {"inc", "indent-level"}, {"let", {result, form}, {"dec", "indent-level"}, result}})
  end}, ["reserved?"] = {export = true, variable = true}, ["valid-id?"] = {export = true, variable = true}, id = {export = true, variable = true}, key = {export = true, variable = true}, imported = {export = true, variable = true}, link = {export = true, variable = true}, mapo = {export = true, variable = true}, ["quote-environment"] = {export = true, variable = true}, ["quote-modules"] = {export = true, variable = true}, ["initial-environment"] = {export = true, variable = true}, ["global?"] = {variable = true}, escape = {variable = true}, literal = {variable = true}, bias = {variable = true}, ["quoting?"] = {variable = true}, ["quasiquoting?"] = {variable = true}, ["can-unquote?"] = {variable = true}, ["quasisplice?"] = {variable = true}, ["quasiquote-list"] = {variable = true}, ["indent-level"] = {global = true, export = true}, reserved = {variable = true}, ["numeric?"] = {variable = true}, ["valid-code?"] = {variable = true}, extend = {variable = true}, exclude = {variable = true}, ["quote-binding"] = {variable = true}, ["quote-frame"] = {variable = true}, ["quote-module"] = {variable = true}}}, ["lumen/runtime"] = {import = {{"lumen", "special"}, {"lumen", "core"}}, export = {["nil?"] = {export = true, variable = true}, ["is?"] = {export = true, variable = true}, length = {export = true, variable = true}, ["none?"] = {export = true, variable = true}, ["some?"] = {export = true, variable = true}, ["one?"] = {export = true, variable = true}, hd = {export = true, variable = true}, ["string?"] = {export = true, variable = true}, ["number?"] = {export = true, variable = true}, ["boolean?"] = {export = true, variable = true}, ["function?"] = {export = true, variable = true}, ["composite?"] = {export = true, variable = true}, ["atom?"] = {export = true, variable = true}, ["table?"] = {export = true, variable = true}, ["list?"] = {export = true, variable = true}, substring = {export = true, variable = true}, sub = {export = true, variable = true}, keys = {export = true, variable = true}, inner = {export = true, variable = true}, tl = {export = true, variable = true}, char = {export = true, variable = true}, code = {export = true, variable = true}, ["string-literal?"] = {export = true, variable = true}, ["id-literal?"] = {export = true, variable = true}, add = {export = true, variable = true}, drop = {export = true, variable = true}, last = {export = true, variable = true}, butlast = {export = true, variable = true}, reverse = {export = true, variable = true}, join = {export = true, variable = true}, reduce = {export = true, variable = true}, keep = {export = true, variable = true}, ["in?"] = {export = true, variable = true}, find = {export = true, variable = true}, pair = {export = true, variable = true}, sort = {export = true, variable = true}, iterate = {export = true, variable = true}, replicate = {export = true, variable = true}, series = {export = true, variable = true}, map = {export = true, variable = true}, ["keys?"] = {export = true, variable = true}, ["empty?"] = {export = true, variable = true}, stash = {export = true, variable = true}, unstash = {export = true, variable = true}, search = {export = true, variable = true}, split = {export = true, variable = true}, cat = {export = true, variable = true}, ["+"] = {export = true, variable = true}, ["-"] = {export = true, variable = true}, ["*"] = {export = true, variable = true}, ["/"] = {export = true, variable = true}, ["%"] = {export = true, variable = true}, [">"] = {export = true, variable = true}, ["<"] = {export = true, variable = true}, ["="] = {export = true, variable = true}, [">="] = {export = true, variable = true}, ["<="] = {export = true, variable = true}, ["read-file"] = {export = true, variable = true}, ["write-file"] = {export = true, variable = true}, write = {export = true, variable = true}, exit = {export = true, variable = true}, today = {export = true, variable = true}, now = {export = true, variable = true}, number = {export = true, variable = true}, string = {export = true, variable = true}, space = {export = true, variable = true}, apply = {export = true, variable = true}, unique = {export = true, variable = true}, ["%message-handler"] = {export = true, variable = true}, ["toplevel?"] = {export = true, variable = true}, ["module-key"] = {export = true, variable = true}, module = {export = true, variable = true}, setenv = {export = true, variable = true}, shift = {variable = true}, ["id-count"] = {variable = true}}}, ["lumen/compiler"] = {import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}, {"lumen", "lib"}, {"lumen", "reader"}}, export = {["compile-function"] = {export = true, variable = true}, compile = {export = true, variable = true}, ["open-module"] = {export = true, variable = true}, ["load-module"] = {export = true, variable = true}, ["in-module"] = {export = true, variable = true}, ["import-modules"] = {export = true, variable = true}, ["compile-module"] = {export = true, variable = true}, declare = {export = true, variable = true}, eval = {export = true, variable = true}, infix = {variable = true}, ["unary?"] = {variable = true}, precedence = {variable = true}, getop = {variable = true}, ["infix?"] = {variable = true}, ["compile-args"] = {variable = true}, ["compile-atom"] = {variable = true}, terminator = {variable = true}, ["compile-special"] = {variable = true}, ["parenthesize-call?"] = {variable = true}, ["compile-call"] = {variable = true}, ["op-delims"] = {variable = true}, ["compile-infix"] = {variable = true}, ["can-return?"] = {variable = true}, lower = {variable = true}, ["lower-statement"] = {variable = true}, ["lower-body"] = {variable = true}, ["lower-do"] = {variable = true}, ["lower-if"] = {variable = true}, ["lower-short"] = {variable = true}, ["lower-try"] = {variable = true}, ["lower-while"] = {variable = true}, ["lower-for"] = {variable = true}, ["lower-function"] = {variable = true}, ["lower-definition"] = {variable = true}, ["lower-call"] = {variable = true}, ["lower-infix?"] = {variable = true}, ["lower-infix"] = {variable = true}, ["lower-special"] = {variable = true}, process = {variable = true}, ["current-module"] = {global = true, export = true}, ["module-path"] = {variable = true}, encapsulate = {variable = true}, ["compile-file"] = {variable = true}, run = {variable = true}, ["compiling?"] = {variable = true}, ["compiler-output"] = {variable = true}, conclude = {variable = true}, ["%compile-module"] = {variable = true}, reimported = {variable = true}, ["%result"] = {global = true, export = true}}}, user = {import = {"lumen", {"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}}, export = {}}, ["lumen/boot"] = {import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}, {"lumen", "lib"}, {"lumen", "compiler"}}, export = {["%initial-environment"] = {macro = function ()
    return(quote_environment(initial_environment()))
  end}, ["%initial-modules"] = {macro = function ()
    return(quote_modules())
  end}, modules = {global = true, export = true}}}, ["lumen/main"] = {import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}, {"lumen", "reader"}, {"lumen", "compiler"}}, export = {}}, ["lumen/system"] = {import = {{"lumen", "special"}, {"lumen", "core"}}, export = {nexus = {export = true, global = true}}}, ["lumen/reader"] = {import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}}, export = {["make-stream"] = {export = true, variable = true}, ["read-table"] = {export = true, variable = true}, ["define-reader"] = {export = true, macro = function (_u1887, ...)
    local char = _u1887[1]
    local stream = _u1887[2]
    local _u1886 = unstash({...})
    local body = sub(_u1886, 0)
    return({"set", {"get", "read-table", char}, join({"fn", {stream}}, body)})
  end}, read = {export = true, variable = true}, ["read-all"] = {export = true, variable = true}, ["read-from-string"] = {export = true, variable = true}, delimiters = {variable = true}, whitespace = {variable = true}, ["peek-char"] = {variable = true}, ["read-char"] = {variable = true}, ["skip-non-code"] = {variable = true}, eof = {variable = true}, ["key?"] = {variable = true}, ["flag?"] = {variable = true}}}, ["lumen/core"] = {import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}, {"lumen", "lib"}, {"lumen", "compiler"}}, export = {quote = {export = true, macro = function (form)
    return(quoted(form))
  end}, quasiquote = {export = true, macro = function (form)
    return(quasiexpand(form, 1))
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
    local _u1905 = body
    local k = nil
    for k in next, _u1905 do
      local v = _u1905[k]
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
  end}, ["if"] = {export = true, macro = function (...)
    local branches = unstash({...})
    local function step(_u1917)
      local a = _u1917[1]
      local b = _u1917[2]
      local c = sub(_u1917, 2)
      if is63(b) then
        return({join({"%if", a, b}, step(c))})
      else
        if is63(a) then
          return({a})
        end
      end
    end
    return(hd(step(branches)))
  end}, when = {export = true, macro = function (cond, ...)
    local _u1921 = unstash({...})
    local body = sub(_u1921, 0)
    return({"if", cond, join({"do"}, body)})
  end}, unless = {export = true, macro = function (cond, ...)
    local _u1925 = unstash({...})
    local body = sub(_u1925, 0)
    return({"if", {"not", cond}, join({"do"}, body)})
  end}, table = {export = true, macro = function (...)
    local body = unstash({...})
    return(join({"%object"}, mapo(function (x)
      return(x)
    end, body)))
  end}, let = {export = true, macro = function (bindings, ...)
    local _u1933 = unstash({...})
    local body = sub(_u1933, 0)
    if length(bindings) < 2 then
      return(join({"do"}, body))
    else
      local renames = {}
      local locals = {}
      local lh = bindings[1]
      local rh = bindings[2]
      local _u1936 = bind(lh, rh)
      local k = nil
      for k in next, _u1936 do
        local _u1938 = _u1936[k]
        local id = _u1938[1]
        local val = _u1938[2]
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
  end}, ["define-module"] = {export = true, macro = function (spec, ...)
    local _u1944 = unstash({...})
    local body = sub(_u1944, 0)
    local imp = body.import
    local exp = body.export
    local alias = body.alias
    local _u1946 = import_modules(imp)
    local imports = _u1946[1]
    local bindings = _u1946[2]
    local k = module_key(spec)
    modules[k] = {import = imports, export = {}, alias = alias}
    local _u1947 = exp or {}
    local _u950 = nil
    for _u950 in next, _u1947 do
      local x = _u1947[_u950]
      setenv(x, {_stash = true, export = true})
    end
    return(join({"do", {"set", {"get", "nexus", {"quote", k}}, {"table"}}}, bindings))
  end}, ["define-macro"] = {export = true, macro = function (name, args, ...)
    local _u1954 = unstash({...})
    local body = sub(_u1954, 0)
    local form = join({"fn", args}, body)
    local _u1957 = {"setenv", {"quote", name}}
    _u1957.macro = form
    _u1957.form = {"quote", form}
    eval(_u1957)
    return(nil)
  end}, ["define-special"] = {export = true, macro = function (name, args, ...)
    local _u1960 = unstash({...})
    local body = sub(_u1960, 0)
    local form = join({"fn", args}, body)
    local _u1963 = {"setenv", {"quote", name}}
    _u1963.special = form
    _u1963.form = {"quote", form}
    eval(join(_u1963, keys(body)))
    return(nil)
  end}, ["define-symbol"] = {export = true, macro = function (name, expansion)
    setenv(name, {_stash = true, symbol = expansion})
    return(nil)
  end}, ["define*"] = {export = true, macro = function (name, x, ...)
    local _u1967 = unstash({...})
    local body = sub(_u1967, 0)
    setenv(name, {_stash = true, global = true, export = true})
    if some63(body) then
      local _u1969 = bind42(x, body)
      local args = _u1969[1]
      local _u1970 = _u1969[2]
      return(join({"%global-function", name, args}, _u1970))
    else
      if target == "js" then
        return({"set", {"get", "global", {"quote", id(name)}}, x})
      else
        return({"set", name, x})
      end
    end
  end}, define = {export = true, macro = function (name, x, ...)
    local _u1976 = unstash({...})
    local body = sub(_u1976, 0)
    setenv(name, {_stash = true, variable = true})
    if some63(body) and target == "js" then
      return(link(name, {"%local", name, join({"fn", x}, body)}))
    else
      if some63(body) then
        local _u1980 = bind42(x, body)
        local args = _u1980[1]
        local _u1981 = _u1980[2]
        return(link(name, join({"%local-function", name, args}, _u1981)))
      else
        return(link(name, {"%local", name, x}))
      end
    end
  end}, ["set*"] = {export = true, macro = function (name, value)
    return(link(name, {"set", name, value}))
  end}, ["with-bindings"] = {export = true, macro = function (_u1987, ...)
    local names = _u1987[1]
    local _u1986 = unstash({...})
    local body = sub(_u1986, 0)
    local x = unique()
    local _u1992 = {"setenv", x}
    _u1992.variable = true
    local _u1989 = {"with-frame", {"all", {"_u951", x}, names, _u1992}}
    _u1989.scope = true
    return(join(_u1989, body))
  end}, ["let-macro"] = {export = true, macro = function (definitions, ...)
    local _u1993 = unstash({...})
    local body = sub(_u1993, 0)
    add(environment, {})
    map(function (m)
      return(macroexpand(join({"define-macro"}, m)))
    end, definitions)
    local _u1995 = join({"do"}, macroexpand(body))
    drop(environment)
    return(_u1995)
  end}, ["let-symbol"] = {export = true, macro = function (expansions, ...)
    local _u1999 = unstash({...})
    local body = sub(_u1999, 0)
    add(environment, {})
    map(function (_u2003)
      local name = _u2003[1]
      local exp = _u2003[2]
      return(macroexpand({"define-symbol", name, exp}))
    end, pair(expansions))
    local _u2001 = join({"do"}, macroexpand(body))
    drop(environment)
    return(_u2001)
  end}, fn = {export = true, macro = function (args, ...)
    local _u2006 = unstash({...})
    local body = sub(_u2006, 0)
    local _u2008 = bind42(args, body)
    local _u2009 = _u2008[1]
    local _u2010 = _u2008[2]
    return(join({"%function", _u2009}, _u2010))
  end}, guard = {export = true, macro = function (expr)
    if target == "js" then
      return({{"fn", {}, {"%try", {"list", true, expr}}}})
    else
      local e = unique()
      local x = unique()
      local ex = "|" .. e .. "," .. x .. "|"
      return({"let", {ex, {"xpcall", {"fn", {}, expr}, "%message-handler"}}, {"list", e, x}})
    end
  end}, all = {export = true, macro = function (_u2023, t, ...)
    local k = _u2023[1]
    local v = _u2023[2]
    local _u2022 = unstash({...})
    local body = sub(_u2022, 0)
    local x = unique()
    local n = unique()
    local _u2133
    if target == "lua" then
      _u2133 = body
    else
      _u2133 = {join({"let", {n, {"parseInt", k}, k, {"if", {"isNaN", n}, k, n}}}, body)}
    end
    return({"let", {x, t, k, "nil"}, {"%for", x, k, join({"let", {v, {"get", x, k}}}, _u2133)}})
  end}, ["set-of"] = {export = true, macro = function (...)
    local xs = unstash({...})
    local l = {}
    local _u2038 = xs
    local _u952 = nil
    for _u952 in next, _u2038 do
      local x = _u2038[_u952]
      l[x] = true
    end
    return(join({"table"}, l))
  end}, language = {export = true, macro = function ()
    return({"quote", target})
  end}, target = {macro = function (...)
    local clauses = unstash({...})
    return(clauses[target])
  end, global = true, export = true}, ["join*"] = {export = true, macro = function (...)
    local xs = unstash({...})
    return(reduce(function (a, b)
      return({"join", a, b})
    end, xs))
  end}, ["join!"] = {export = true, macro = function (a, ...)
    local _u2047 = unstash({...})
    local bs = sub(_u2047, 0)
    return({"set", a, join({"join*", a}, bs)})
  end}, ["cat!"] = {export = true, macro = function (a, ...)
    local _u2051 = unstash({...})
    local bs = sub(_u2051, 0)
    return({"set", a, join({"cat", a}, bs)})
  end}, inc = {export = true, macro = function (n, by)
    return({"set", n, {"+", n, by or 1}})
  end}, dec = {export = true, macro = function (n, by)
    return({"set", n, {"-", n, by or 1}})
  end}, pr = {export = true, macro = function (...)
    local xs = unstash({...})
    return({"print", space(xs)})
  end}, ["with-frame"] = {export = true, macro = function (...)
    local _u2063 = unstash({...})
    local body = sub(_u2063, 0)
    local scope = _u2063.scope
    local x = unique()
    local _u2067 = {"table"}
    _u2067._scope = scope
    return({"do", {"add", "environment", _u2067}, {"let", {x, join({"do"}, body)}, {"drop", "environment"}, x}})
  end}}}, ["lumen/special"] = {import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}, {"lumen", "lib"}, {"lumen", "compiler"}}, export = {["do"] = {foo = true, stmt = true, tr = true, special = function (...)
    local forms = unstash({...})
    local s = ""
    series(function (x)
      s = s .. compile(x, {_stash = true, stmt = true})
    end, forms)
    return(s)
  end, export = true}, ["%if"] = {foo = true, stmt = true, tr = true, special = function (cond, cons, alt)
    local _u2081 = compile(cond)
    indent_level = indent_level + 1
    local _u2083 = compile(cons, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local _u2082 = _u2083
    local _u2134
    if alt then
      indent_level = indent_level + 1
      local _u2085 = compile(alt, {_stash = true, stmt = true})
      indent_level = indent_level - 1
      _u2134 = _u2085
    end
    local _u2084 = _u2134
    local ind = indentation()
    local s = ""
    if target == "js" then
      s = s .. ind .. "if (" .. _u2081 .. ") {\n" .. _u2082 .. ind .. "}"
    else
      s = s .. ind .. "if " .. _u2081 .. " then\n" .. _u2082
    end
    if _u2084 and target == "js" then
      s = s .. " else {\n" .. _u2084 .. ind .. "}"
    else
      if _u2084 then
        s = s .. ind .. "else\n" .. _u2084
      end
    end
    if target == "lua" then
      return(s .. ind .. "end\n")
    else
      return(s .. "\n")
    end
  end, export = true}, ["while"] = {foo = true, stmt = true, tr = true, special = function (cond, form)
    local _u2087 = compile(cond)
    indent_level = indent_level + 1
    local _u2088 = compile(form, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local body = _u2088
    local ind = indentation()
    if target == "js" then
      return(ind .. "while (" .. _u2087 .. ") {\n" .. body .. ind .. "}\n")
    else
      return(ind .. "while " .. _u2087 .. " do\n" .. body .. ind .. "end\n")
    end
  end, export = true}, ["%for"] = {foo = true, stmt = true, tr = true, special = function (t, k, form)
    local _u2090 = compile(t)
    local ind = indentation()
    indent_level = indent_level + 1
    local _u2091 = compile(form, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local body = _u2091
    if target == "lua" then
      return(ind .. "for " .. k .. " in next, " .. _u2090 .. " do\n" .. body .. ind .. "end\n")
    else
      return(ind .. "for (" .. k .. " in " .. _u2090 .. ") {\n" .. body .. ind .. "}\n")
    end
  end, export = true}, ["%try"] = {foo = true, stmt = true, tr = true, special = function (form)
    local ind = indentation()
    indent_level = indent_level + 1
    local _u2093 = compile(form, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local body = _u2093
    local e = unique()
    local hf = {"return", {"%array", false, {"get", e, "\"message\""}}}
    indent_level = indent_level + 1
    local _u2097 = compile(hf, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local h = _u2097
    return(ind .. "try {\n" .. body .. ind .. "}\n" .. ind .. "catch (" .. e .. ") {\n" .. h .. ind .. "}\n")
  end, export = true}, ["break"] = {foo = true, stmt = true, export = true, special = function ()
    return(indentation() .. "break")
  end}, ["%function"] = {foo = true, export = true, special = function (args, body)
    return(compile_function(args, body))
  end}, ["%global-function"] = {foo = true, stmt = true, tr = true, special = function (name, args, body)
    if target == "lua" then
      local x = compile_function(args, body, {_stash = true, name = name})
      return(indentation() .. x)
    else
      return(compile({"set", name, {"%function", args, body}}, {_stash = true, stmt = true}))
    end
  end, export = true}, ["%local-function"] = {foo = true, stmt = true, tr = true, special = function (name, args, body)
    local x = compile_function(args, body, {_stash = true, name = name, prefix = "local "})
    return(indentation() .. x)
  end, export = true}, ["return"] = {foo = true, stmt = true, export = true, special = function (x)
    local _u2135
    if nil63(x) then
      _u2135 = "return"
    else
      _u2135 = "return(" .. compile(x) .. ")"
    end
    local _u2105 = _u2135
    return(indentation() .. _u2105)
  end}, error = {foo = true, stmt = true, export = true, special = function (x)
    local _u2136
    if target == "js" then
      _u2136 = "throw new " .. compile({"Error", x})
    else
      _u2136 = "error(" .. compile(x) .. ")"
    end
    local e = _u2136
    return(indentation() .. e)
  end}, ["%local"] = {foo = true, stmt = true, export = true, special = function (name, value)
    local id = compile(name)
    local value1 = compile(value)
    local _u2137
    if is63(value) then
      _u2137 = " = " .. value1
    else
      _u2137 = ""
    end
    local rh = _u2137
    local _u2138
    if target == "js" then
      _u2138 = "var "
    else
      _u2138 = "local "
    end
    local keyword = _u2138
    local ind = indentation()
    return(ind .. keyword .. id .. rh)
  end}, set = {foo = true, stmt = true, export = true, special = function (lh, rh)
    local _u2110 = compile(lh)
    local _u2139
    if nil63(rh) then
      _u2139 = "nil"
    else
      _u2139 = rh
    end
    local _u2111 = compile(_u2139)
    return(indentation() .. _u2110 .. " = " .. _u2111)
  end}, get = {foo = true, export = true, special = function (t, k)
    local _u2113 = compile(t)
    local k1 = compile(k)
    if target == "lua" and char(_u2113, 0) == "{" then
      _u2113 = "(" .. _u2113 .. ")"
    end
    if string_literal63(k) and valid_id63(inner(k)) then
      return(_u2113 .. "." .. inner(k))
    else
      return(_u2113 .. "[" .. k1 .. "]")
    end
  end}, ["not"] = {}, ["%array"] = {foo = true, export = true, special = function (...)
    local forms = unstash({...})
    local _u2140
    if target == "lua" then
      _u2140 = "{"
    else
      _u2140 = "["
    end
    local open = _u2140
    local _u2141
    if target == "lua" then
      _u2141 = "}"
    else
      _u2141 = "]"
    end
    local close = _u2141
    local s = ""
    local c = ""
    local _u2115 = forms
    local k = nil
    for k in next, _u2115 do
      local v = _u2115[k]
      if number63(k) then
        s = s .. c .. compile(v)
        c = ", "
      end
    end
    return(open .. s .. close)
  end}, ["%object"] = {foo = true, export = true, special = function (...)
    local forms = unstash({...})
    local s = "{"
    local c = ""
    local _u2142
    if target == "lua" then
      _u2142 = " = "
    else
      _u2142 = ": "
    end
    local sep = _u2142
    local _u2118 = pair(forms)
    local k = nil
    for k in next, _u2118 do
      local v = _u2118[k]
      if number63(k) then
        local _u2120 = v[1]
        local _u2121 = v[2]
        if not string63(_u2120) then
          error("Illegal key: " .. string(_u2120))
        end
        s = s .. c .. key(_u2120) .. sep .. compile(_u2121)
        c = ", "
      end
    end
    return(s .. "}")
  end}}}}
  environment = {{["define-module"] = {export = true, macro = function (spec, ...)
    local _u2123 = unstash({...})
    local body = sub(_u2123, 0)
    local imp = body.import
    local exp = body.export
    local alias = body.alias
    local _u2125 = import_modules(imp)
    local imports = _u2125[1]
    local bindings = _u2125[2]
    local k = module_key(spec)
    modules[k] = {import = imports, export = {}, alias = alias}
    local _u2126 = exp or {}
    local _u950 = nil
    for _u950 in next, _u2126 do
      local x = _u2126[_u950]
      setenv(x, {_stash = true, export = true})
    end
    return(join({"do", {"set", {"get", "nexus", {"quote", k}}, {"table"}}}, bindings))
  end}}}
end)();
(function ()
  nexus.user = {}
  local _u2143 = nexus["lumen/runtime"]
  local nil63 = _u2143["nil?"]
  local is63 = _u2143["is?"]
  local length = _u2143.length
  local none63 = _u2143["none?"]
  local some63 = _u2143["some?"]
  local one63 = _u2143["one?"]
  local hd = _u2143.hd
  local string63 = _u2143["string?"]
  local number63 = _u2143["number?"]
  local boolean63 = _u2143["boolean?"]
  local function63 = _u2143["function?"]
  local composite63 = _u2143["composite?"]
  local atom63 = _u2143["atom?"]
  local table63 = _u2143["table?"]
  local list63 = _u2143["list?"]
  local substring = _u2143.substring
  local sub = _u2143.sub
  local keys = _u2143.keys
  local inner = _u2143.inner
  local tl = _u2143.tl
  local char = _u2143.char
  local code = _u2143.code
  local string_literal63 = _u2143["string-literal?"]
  local id_literal63 = _u2143["id-literal?"]
  local add = _u2143.add
  local drop = _u2143.drop
  local last = _u2143.last
  local butlast = _u2143.butlast
  local reverse = _u2143.reverse
  local join = _u2143.join
  local reduce = _u2143.reduce
  local keep = _u2143.keep
  local in63 = _u2143["in?"]
  local find = _u2143.find
  local pair = _u2143.pair
  local sort = _u2143.sort
  local iterate = _u2143.iterate
  local replicate = _u2143.replicate
  local series = _u2143.series
  local map = _u2143.map
  local keys63 = _u2143["keys?"]
  local empty63 = _u2143["empty?"]
  local stash = _u2143.stash
  local unstash = _u2143.unstash
  local search = _u2143.search
  local split = _u2143.split
  local cat = _u2143.cat
  local _43 = _u2143["+"]
  local _ = _u2143["-"]
  local _42 = _u2143["*"]
  local _47 = _u2143["/"]
  local _37 = _u2143["%"]
  local _62 = _u2143[">"]
  local _60 = _u2143["<"]
  local _61 = _u2143["="]
  local _6261 = _u2143[">="]
  local _6061 = _u2143["<="]
  local read_file = _u2143["read-file"]
  local write_file = _u2143["write-file"]
  local write = _u2143.write
  local exit = _u2143.exit
  local today = _u2143.today
  local now = _u2143.now
  local number = _u2143.number
  local string = _u2143.string
  local space = _u2143.space
  local apply = _u2143.apply
  local unique = _u2143.unique
  local _37message_handler = _u2143["%message-handler"]
  local toplevel63 = _u2143["toplevel?"]
  local module_key = _u2143["module-key"]
  local module = _u2143.module
  local setenv = _u2143.setenv
end)();
(function ()
  nexus["lumen/main"] = {}
  local _u2 = nexus["lumen/runtime"]
  local nil63 = _u2["nil?"]
  local is63 = _u2["is?"]
  local length = _u2.length
  local none63 = _u2["none?"]
  local some63 = _u2["some?"]
  local one63 = _u2["one?"]
  local hd = _u2.hd
  local string63 = _u2["string?"]
  local number63 = _u2["number?"]
  local boolean63 = _u2["boolean?"]
  local function63 = _u2["function?"]
  local composite63 = _u2["composite?"]
  local atom63 = _u2["atom?"]
  local table63 = _u2["table?"]
  local list63 = _u2["list?"]
  local substring = _u2.substring
  local sub = _u2.sub
  local keys = _u2.keys
  local inner = _u2.inner
  local tl = _u2.tl
  local char = _u2.char
  local code = _u2.code
  local string_literal63 = _u2["string-literal?"]
  local id_literal63 = _u2["id-literal?"]
  local add = _u2.add
  local drop = _u2.drop
  local last = _u2.last
  local butlast = _u2.butlast
  local reverse = _u2.reverse
  local join = _u2.join
  local reduce = _u2.reduce
  local keep = _u2.keep
  local in63 = _u2["in?"]
  local find = _u2.find
  local pair = _u2.pair
  local sort = _u2.sort
  local iterate = _u2.iterate
  local replicate = _u2.replicate
  local series = _u2.series
  local map = _u2.map
  local keys63 = _u2["keys?"]
  local empty63 = _u2["empty?"]
  local stash = _u2.stash
  local unstash = _u2.unstash
  local search = _u2.search
  local split = _u2.split
  local cat = _u2.cat
  local _43 = _u2["+"]
  local _ = _u2["-"]
  local _42 = _u2["*"]
  local _47 = _u2["/"]
  local _37 = _u2["%"]
  local _62 = _u2[">"]
  local _60 = _u2["<"]
  local _61 = _u2["="]
  local _6261 = _u2[">="]
  local _6061 = _u2["<="]
  local read_file = _u2["read-file"]
  local write_file = _u2["write-file"]
  local write = _u2.write
  local exit = _u2.exit
  local today = _u2.today
  local now = _u2.now
  local number = _u2.number
  local string = _u2.string
  local space = _u2.space
  local apply = _u2.apply
  local unique = _u2.unique
  local _37message_handler = _u2["%message-handler"]
  local toplevel63 = _u2["toplevel?"]
  local module_key = _u2["module-key"]
  local module = _u2.module
  local setenv = _u2.setenv
  local _u5 = nexus["lumen/reader"]
  local make_stream = _u5["make-stream"]
  local read_table = _u5["read-table"]
  local read = _u5.read
  local read_all = _u5["read-all"]
  local read_from_string = _u5["read-from-string"]
  local _u6 = nexus["lumen/compiler"]
  local compile_function = _u6["compile-function"]
  local compile = _u6.compile
  local open_module = _u6["open-module"]
  local load_module = _u6["load-module"]
  local in_module = _u6["in-module"]
  local import_modules = _u6["import-modules"]
  local compile_module = _u6["compile-module"]
  local declare = _u6.declare
  local eval = _u6.eval
  local function rep(s)
    local _u2148,_u2149 = xpcall(function ()
      return(eval(read_from_string(s)))
    end, _37message_handler)
    local _u2147 = {_u2148, _u2149}
    local _u1 = _u2147[1]
    local x = _u2147[2]
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
