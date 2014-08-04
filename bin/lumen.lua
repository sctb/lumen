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
      local _g163
      if nil63(from) or from < 0 then
        _g163 = 0
      else
        _g163 = from
      end
      local i = _g163
      local n = length(x)
      local _g164
      if nil63(upto) or upto > n then
        _g164 = n
      else
        _g164 = upto
      end
      local _g57 = _g164
      while i < _g57 do
        l[j + 1] = x[i + 1]
        i = i + 1
        j = j + 1
      end
      local _g58 = x
      local k = nil
      for k in next, _g58 do
        local v = _g58[k]
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
    local _g61 = x
    local k = nil
    for k in next, _g61 do
      local v = _g61[k]
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
    local _g165
    if n then
      _g165 = n + 1
    end
    return(string.byte(str, _g165))
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
  local function join(a, b)
    if a and b then
      local c = {}
      local o = length(a)
      local _g74 = a
      local k = nil
      for k in next, _g74 do
        local v = _g74[k]
        c[k] = v
      end
      local _g76 = b
      local k = nil
      for k in next, _g76 do
        local v = _g76[k]
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
    local _g81 = x
    local k = nil
    for k in next, _g81 do
      local v = _g81[k]
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
    local _g84 = t
    local _g32 = nil
    for _g32 in next, _g84 do
      local y = _g84[_g32]
      if x == y then
        return(true)
      end
    end
  end
  nexus["lumen/runtime"]["in?"] = in63
  local function find(f, t)
    local _g87 = t
    local _g33 = nil
    for _g33 in next, _g87 do
      local x = _g87[_g33]
      local _g89 = f(x)
      if _g89 then
        return(_g89)
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
    local _g99 = x
    local k = nil
    for k in next, _g99 do
      local v = _g99[k]
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
    local _g102 = t
    local k = nil
    for k in next, _g102 do
      local _g34 = _g102[k]
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
    local _g105 = t
    local _g35 = nil
    for _g35 in next, _g105 do
      local _g36 = _g105[_g35]
      b = false
      break
    end
    return(b)
  end
  nexus["lumen/runtime"]["empty?"] = empty63
  local function stash(args)
    if keys63(args) then
      local p = {}
      local _g108 = args
      local k = nil
      for k in next, _g108 do
        local v = _g108[k]
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
        local args1 = sub(args, 0, length(args) - 1)
        local _g111 = l
        local k = nil
        for k in next, _g111 do
          local v = _g111[k]
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
    local _g166
    if start then
      _g166 = start + 1
    end
    local _g114 = _g166
    local i = string.find(str, pattern, _g114, true)
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
            local _g141 = x
            local k = nil
            for k in next, _g141 do
              local v = _g141[k]
              if number63(k) then
                xs[k] = string(v)
              else
                add(ks, k .. ":")
                add(ks, string(v))
              end
            end
            local _g143 = join(xs, ks)
            local _g37 = nil
            for _g37 in next, _g143 do
              local v = _g143[_g37]
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
    local _g151 = stash(args)
    return(f(unpack(_g151)))
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
    local _g158 = unstash({...})
    local keys = sub(_g158, 0)
    if string63(k) then
      local frame = last(environment)
      local x = frame[k] or {}
      local _g160 = keys
      local _g162 = nil
      for _g162 in next, _g160 do
        local v = _g160[_g162]
        x[_g162] = v
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
  local _g170 = nexus["lumen/runtime"]
  local nil63 = _g170["nil?"]
  local is63 = _g170["is?"]
  local length = _g170.length
  local none63 = _g170["none?"]
  local some63 = _g170["some?"]
  local one63 = _g170["one?"]
  local hd = _g170.hd
  local string63 = _g170["string?"]
  local number63 = _g170["number?"]
  local boolean63 = _g170["boolean?"]
  local function63 = _g170["function?"]
  local composite63 = _g170["composite?"]
  local atom63 = _g170["atom?"]
  local table63 = _g170["table?"]
  local list63 = _g170["list?"]
  local substring = _g170.substring
  local sub = _g170.sub
  local keys = _g170.keys
  local inner = _g170.inner
  local tl = _g170.tl
  local char = _g170.char
  local code = _g170.code
  local string_literal63 = _g170["string-literal?"]
  local id_literal63 = _g170["id-literal?"]
  local add = _g170.add
  local drop = _g170.drop
  local last = _g170.last
  local reverse = _g170.reverse
  local join = _g170.join
  local reduce = _g170.reduce
  local keep = _g170.keep
  local in63 = _g170["in?"]
  local find = _g170.find
  local pair = _g170.pair
  local sort = _g170.sort
  local iterate = _g170.iterate
  local replicate = _g170.replicate
  local series = _g170.series
  local map = _g170.map
  local keys63 = _g170["keys?"]
  local empty63 = _g170["empty?"]
  local stash = _g170.stash
  local unstash = _g170.unstash
  local search = _g170.search
  local split = _g170.split
  local cat = _g170.cat
  local _43 = _g170["+"]
  local _ = _g170["-"]
  local _42 = _g170["*"]
  local _47 = _g170["/"]
  local _37 = _g170["%"]
  local _62 = _g170[">"]
  local _60 = _g170["<"]
  local _61 = _g170["="]
  local _6261 = _g170[">="]
  local _6061 = _g170["<="]
  local read_file = _g170["read-file"]
  local write_file = _g170["write-file"]
  local write = _g170.write
  local exit = _g170.exit
  local today = _g170.today
  local now = _g170.now
  local number = _g170.number
  local string = _g170.string
  local space = _g170.space
  local apply = _g170.apply
  local make_id = _g170["make-id"]
  local _37message_handler = _g170["%message-handler"]
  local toplevel63 = _g170["toplevel?"]
  local module_key = _g170["module-key"]
  local module = _g170.module
  local setenv = _g170.setenv
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
      local _g339
      if c == "\n" then
        _g339 = "\\n"
      else
        local _g340
        if c == "\"" then
          _g340 = "\\\""
        else
          local _g341
          if c == "\\" then
            _g341 = "\\\\"
          else
            _g341 = c
          end
          _g340 = _g341
        end
        _g339 = _g340
      end
      local c1 = _g339
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
      local _g192 = args
      local k = nil
      for k in next, _g192 do
        local v = _g192[k]
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
      local id = make_id()
      return(join({{id, rh}}, bind(lh, id)))
    else
      if atom63(lh) then
        return({{lh, rh}})
      else
        local bs = {}
        local _g202 = lh
        local k = nil
        for k in next, _g202 do
          local v = _g202[k]
          local _g342
          if k == "&" then
            _g342 = {"sub", rh, length(lh)}
          else
            _g342 = {"get", rh, {"quote", bias(k)}}
          end
          local x = _g342
          local _g343
          if v == true then
            _g343 = k
          else
            _g343 = v
          end
          local _g207 = _g343
          bs = join(bs, bind(_g207, x))
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
      local r = make_id()
      local _g224 = args
      local k = nil
      for k in next, _g224 do
        local v = _g224[k]
        if number63(k) then
          if atom63(v) then
            add(args1, v)
          else
            local x = make_id()
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
          local _g167 = form[1]
          local name = form[2]
          local value = form[3]
          return({"%local", name, macroexpand(value)})
        else
          if x == "%function" then
            local _g168 = form[1]
            local args = form[2]
            local body = sub(form, 2)
            add(environment, {_scope = true})
            local _g240 = args
            local _g993 = nil
            for _g993 in next, _g240 do
              local _g238 = _g240[_g993]
              setenv(_g238, {_stash = true, variable = true})
            end
            local _g239 = join({"%function", args}, macroexpand(body))
            drop(environment)
            return(_g239)
          else
            if x == "%local-function" or x == "%global-function" then
              local _g169 = form[1]
              local _g243 = form[2]
              local _g244 = form[3]
              local _g245 = sub(form, 3)
              add(environment, {_scope = true})
              local _g248 = _g244
              local _g993 = nil
              for _g993 in next, _g248 do
                local _g246 = _g248[_g993]
                setenv(_g246, {_stash = true, variable = true})
              end
              local _g247 = join({x, _g243, _g244}, macroexpand(_g245))
              drop(environment)
              return(_g247)
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
    local _g254 = form
    local k = nil
    for k in next, _g254 do
      local v = _g254[k]
      if not number63(k) then
        local _g344
        if quasisplice63(v, depth) then
          _g344 = quasiexpand(v[2])
        else
          _g344 = quasiexpand(v, depth)
        end
        local _g256 = _g344
        last(xs)[k] = _g256
      end
    end
    series(function (x)
      if quasisplice63(x, depth) then
        local _g258 = quasiexpand(x[2])
        add(xs, _g258)
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
      local _g345
      if c == "-" then
        _g345 = "_"
      else
        local _g346
        if valid_code63(n) then
          _g346 = c
        else
          local _g347
          if i == 0 then
            _g347 = "_" .. n
          else
            _g347 = n
          end
          _g346 = _g347
        end
        _g345 = _g346
      end
      local c1 = _g345
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
    local _g297 = unstash({...})
    local private = _g297.private
    local m = make_id()
    local k = module_key(spec)
    local imports = {}
    if nexus[k] then
      local _g299 = module(spec).export
      local _g301 = nil
      for _g301 in next, _g299 do
        local v = _g299[_g301]
        if v.variable and (private or v.export) then
          add(imports, {"%local", _g301, {"get", m, {"quote", _g301}}})
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
    local _g316 = unstash({...})
    local xs = sub(_g316, 0)
    return(join(t, xs))
  end
  nexus["lumen/lib"].extend = extend
  local function exclude(t, ...)
    local _g318 = unstash({...})
    local keys = sub(_g318, 0)
    local t1 = {}
    local _g320 = t
    local k = nil
    for k in next, _g320 do
      local v = _g320[k]
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
    local _g325 = t
    local k = nil
    for k in next, _g325 do
      local v = _g325[k]
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
    local _g334 = {"table"}
    _g334.import = quoted(m.import)
    _g334.alias = quoted(m.alias)
    _g334.export = quote_frame(m.export)
    return(_g334)
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
  local _g348 = nexus["lumen/runtime"]
  local nil63 = _g348["nil?"]
  local is63 = _g348["is?"]
  local length = _g348.length
  local none63 = _g348["none?"]
  local some63 = _g348["some?"]
  local one63 = _g348["one?"]
  local hd = _g348.hd
  local string63 = _g348["string?"]
  local number63 = _g348["number?"]
  local boolean63 = _g348["boolean?"]
  local function63 = _g348["function?"]
  local composite63 = _g348["composite?"]
  local atom63 = _g348["atom?"]
  local table63 = _g348["table?"]
  local list63 = _g348["list?"]
  local substring = _g348.substring
  local sub = _g348.sub
  local keys = _g348.keys
  local inner = _g348.inner
  local tl = _g348.tl
  local char = _g348.char
  local code = _g348.code
  local string_literal63 = _g348["string-literal?"]
  local id_literal63 = _g348["id-literal?"]
  local add = _g348.add
  local drop = _g348.drop
  local last = _g348.last
  local reverse = _g348.reverse
  local join = _g348.join
  local reduce = _g348.reduce
  local keep = _g348.keep
  local in63 = _g348["in?"]
  local find = _g348.find
  local pair = _g348.pair
  local sort = _g348.sort
  local iterate = _g348.iterate
  local replicate = _g348.replicate
  local series = _g348.series
  local map = _g348.map
  local keys63 = _g348["keys?"]
  local empty63 = _g348["empty?"]
  local stash = _g348.stash
  local unstash = _g348.unstash
  local search = _g348.search
  local split = _g348.split
  local cat = _g348.cat
  local _43 = _g348["+"]
  local _ = _g348["-"]
  local _42 = _g348["*"]
  local _47 = _g348["/"]
  local _37 = _g348["%"]
  local _62 = _g348[">"]
  local _60 = _g348["<"]
  local _61 = _g348["="]
  local _6261 = _g348[">="]
  local _6061 = _g348["<="]
  local read_file = _g348["read-file"]
  local write_file = _g348["write-file"]
  local write = _g348.write
  local exit = _g348.exit
  local today = _g348.today
  local now = _g348.now
  local number = _g348.number
  local string = _g348.string
  local space = _g348.space
  local apply = _g348.apply
  local make_id = _g348["make-id"]
  local _37message_handler = _g348["%message-handler"]
  local toplevel63 = _g348["toplevel?"]
  local module_key = _g348["module-key"]
  local module = _g348.module
  local setenv = _g348.setenv
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
            return(make_id())
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
  local _g397 = nexus["lumen/runtime"]
  local nil63 = _g397["nil?"]
  local is63 = _g397["is?"]
  local length = _g397.length
  local none63 = _g397["none?"]
  local some63 = _g397["some?"]
  local one63 = _g397["one?"]
  local hd = _g397.hd
  local string63 = _g397["string?"]
  local number63 = _g397["number?"]
  local boolean63 = _g397["boolean?"]
  local function63 = _g397["function?"]
  local composite63 = _g397["composite?"]
  local atom63 = _g397["atom?"]
  local table63 = _g397["table?"]
  local list63 = _g397["list?"]
  local substring = _g397.substring
  local sub = _g397.sub
  local keys = _g397.keys
  local inner = _g397.inner
  local tl = _g397.tl
  local char = _g397.char
  local code = _g397.code
  local string_literal63 = _g397["string-literal?"]
  local id_literal63 = _g397["id-literal?"]
  local add = _g397.add
  local drop = _g397.drop
  local last = _g397.last
  local reverse = _g397.reverse
  local join = _g397.join
  local reduce = _g397.reduce
  local keep = _g397.keep
  local in63 = _g397["in?"]
  local find = _g397.find
  local pair = _g397.pair
  local sort = _g397.sort
  local iterate = _g397.iterate
  local replicate = _g397.replicate
  local series = _g397.series
  local map = _g397.map
  local keys63 = _g397["keys?"]
  local empty63 = _g397["empty?"]
  local stash = _g397.stash
  local unstash = _g397.unstash
  local search = _g397.search
  local split = _g397.split
  local cat = _g397.cat
  local _43 = _g397["+"]
  local _ = _g397["-"]
  local _42 = _g397["*"]
  local _47 = _g397["/"]
  local _37 = _g397["%"]
  local _62 = _g397[">"]
  local _60 = _g397["<"]
  local _61 = _g397["="]
  local _6261 = _g397[">="]
  local _6061 = _g397["<="]
  local read_file = _g397["read-file"]
  local write_file = _g397["write-file"]
  local write = _g397.write
  local exit = _g397.exit
  local today = _g397.today
  local now = _g397.now
  local number = _g397.number
  local string = _g397.string
  local space = _g397.space
  local apply = _g397.apply
  local make_id = _g397["make-id"]
  local _37message_handler = _g397["%message-handler"]
  local toplevel63 = _g397["toplevel?"]
  local module_key = _g397["module-key"]
  local module = _g397.module
  local setenv = _g397.setenv
  local _g400 = nexus["lumen/lib"]
  local getenv = _g400.getenv
  local macro_function = _g400["macro-function"]
  local macro63 = _g400["macro?"]
  local special63 = _g400["special?"]
  local special_form63 = _g400["special-form?"]
  local statement63 = _g400["statement?"]
  local symbol_expansion = _g400["symbol-expansion"]
  local symbol63 = _g400["symbol?"]
  local variable63 = _g400["variable?"]
  local bound63 = _g400["bound?"]
  local quoted = _g400.quoted
  local stash42 = _g400["stash*"]
  local index = _g400.index
  local bind = _g400.bind
  local bind42 = _g400["bind*"]
  local quasiexpand = _g400.quasiexpand
  local macroexpand = _g400.macroexpand
  local indentation = _g400.indentation
  local reserved63 = _g400["reserved?"]
  local valid_id63 = _g400["valid-id?"]
  local id = _g400.id
  local key = _g400.key
  local imported = _g400.imported
  local link = _g400.link
  local mapo = _g400.mapo
  local quote_environment = _g400["quote-environment"]
  local quote_modules = _g400["quote-modules"]
  local initial_environment = _g400["initial-environment"]
  local _g401 = nexus["lumen/reader"]
  local make_stream = _g401["make-stream"]
  local read_table = _g401["read-table"]
  local read = _g401.read
  local read_all = _g401["read-all"]
  local read_from_string = _g401["read-from-string"]
  local _g404 = {}
  local _g405 = {}
  _g405.js = "!"
  _g405.lua = "not "
  _g404["not"] = _g405
  local _g407 = {}
  _g407["*"] = true
  _g407["/"] = true
  _g407["%"] = true
  local _g409 = {}
  _g409["+"] = true
  _g409["-"] = true
  local _g411 = {}
  local _g412 = {}
  _g412.js = "+"
  _g412.lua = ".."
  _g411.cat = _g412
  local _g414 = {}
  _g414["<"] = true
  _g414[">"] = true
  _g414["<="] = true
  _g414[">="] = true
  local _g416 = {}
  local _g417 = {}
  _g417.js = "==="
  _g417.lua = "=="
  _g416["="] = _g417
  local _g418 = {}
  _g418.js = "!="
  _g418.lua = "~="
  _g416["~="] = _g418
  local _g420 = {}
  local _g421 = {}
  _g421.js = "&&"
  _g421.lua = "and"
  _g420["and"] = _g421
  local _g423 = {}
  local _g424 = {}
  _g424.js = "||"
  _g424.lua = "or"
  _g423["or"] = _g424
  local infix = {_g404, _g407, _g409, _g411, _g414, _g416, _g420, _g423}
  nexus["lumen/compiler"].infix = infix
  local function unary63(form)
    local op = form[1]
    local args = sub(form, 1)
    return(one63(args) and in63(op, {"not", "-"}))
  end
  nexus["lumen/compiler"]["unary?"] = unary63
  local function precedence(form)
    if list63(form) and not unary63(form) then
      local _g428 = infix
      local k = nil
      for k in next, _g428 do
        local v = _g428[k]
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
    local _g438 = getenv(x)
    local special = _g438.special
    local stmt = _g438.stmt
    local self_tr63 = _g438.tr
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
    local _g441 = unstash({...})
    local right = _g441.right
    local _g542
    if right then
      _g542 = _6261
    else
      _g542 = _62
    end
    if _g542(precedence(child), precedence(parent)) then
      return({"(", ")"})
    else
      return({"", ""})
    end
  end
  nexus["lumen/compiler"]["op-delims"] = op_delims
  local function compile_infix(form)
    local op = form[1]
    local _g446 = sub(form, 1)
    local a = _g446[1]
    local b = _g446[2]
    local _g447 = op_delims(form, a)
    local ao = _g447[1]
    local ac = _g447[2]
    local _g448 = op_delims(form, b, {_stash = true, right = true})
    local bo = _g448[1]
    local bc = _g448[2]
    local _g449 = compile(a)
    local _g450 = compile(b)
    local _g451 = getop(op)
    if unary63(form) then
      return(_g451 .. ao .. _g449 .. ac)
    else
      return(ao .. _g449 .. ac .. " " .. _g451 .. " " .. bo .. _g450 .. bc)
    end
  end
  nexus["lumen/compiler"]["compile-infix"] = compile_infix
  local function compile_function(args, body, ...)
    local _g452 = unstash({...})
    local name = _g452.name
    local prefix = _g452.prefix
    local _g543
    if name then
      _g543 = compile(name)
    else
      _g543 = ""
    end
    local id = _g543
    local _g454 = prefix or ""
    local _g455 = compile_args(args)
    indent_level = indent_level + 1
    local _g457 = compile(body, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local _g456 = _g457
    local ind = indentation()
    local _g544
    if target == "js" then
      _g544 = ""
    else
      _g544 = "end"
    end
    local tr = _g544
    if name then
      tr = tr .. "\n"
    end
    if target == "js" then
      return("function " .. id .. _g455 .. " {\n" .. _g456 .. ind .. "}" .. tr)
    else
      return(_g454 .. "function " .. id .. _g455 .. "\n" .. _g456 .. ind .. tr)
    end
  end
  nexus["lumen/compiler"]["compile-function"] = compile_function
  local function can_return63(form)
    return(is63(form) and (atom63(form) or not (hd(form) == "return") and not statement63(hd(form))))
  end
  nexus["lumen/compiler"]["can-return?"] = can_return63
  compile = function (form, ...)
    local _g459 = unstash({...})
    local stmt = _g459.stmt
    if nil63(form) then
      return("")
    else
      if special_form63(form) then
        return(compile_special(form, stmt))
      else
        local tr = terminator(stmt)
        local _g545
        if stmt then
          _g545 = indentation()
        else
          _g545 = ""
        end
        local ind = _g545
        local _g546
        if atom63(form) then
          _g546 = compile_atom(form)
        else
          local _g547
          if infix63(hd(form)) then
            _g547 = compile_infix(form)
          else
            _g547 = compile_call(form)
          end
          _g546 = _g547
        end
        local _g461 = _g546
        return(ind .. _g461 .. tr)
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
    local n = length(args) - 1
    local _g469 = args
    local k = nil
    for k in next, _g469 do
      local x = _g469[k]
      if number63(k) and index(k) < n then
        add(hoist, lower(x, hoist, stmt63))
      end
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
    local _g473 = args[2]
    local _g474 = args[3]
    if stmt63 or tail63 then
      local _g549
      if _g474 then
        _g549 = {lower_body({_g474}, tail63)}
      end
      return(add(hoist, join({"%if", lower(cond, hoist), lower_body({_g473}, tail63)}, _g549)))
    else
      local e = make_id()
      add(hoist, {"%local", e})
      local _g548
      if _g474 then
        _g548 = {lower({"set", e, _g474})}
      end
      add(hoist, join({"%if", lower(cond, hoist), lower({"set", e, _g473})}, _g548))
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
      local _g550
      if x == "and" then
        _g550 = {"%if", id, b, id}
      else
        _g550 = {"%if", id, id, b}
      end
      return(lower({"do", {"%local", id, a}, _g550}, hoist))
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
    local _g499 = args[2]
    local body = sub(args, 2)
    return(add(hoist, {kind, name, _g499, lower_body(body, true)}))
  end
  nexus["lumen/compiler"]["lower-definition"] = lower_definition
  local function lower_call(form, hoist)
    local _g502 = map(function (x)
      return(lower(x, hoist))
    end, form)
    if some63(_g502) then
      return(_g502)
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
    local _g523 = unstash({...})
    local private = _g523.private
    local m = module(spec)
    local frame = last(environment)
    local _g525 = m.export
    local k = nil
    for k in next, _g525 do
      local v = _g525[k]
      if v.export or private then
        frame[k] = v
      end
    end
  end
  nexus["lumen/compiler"]["open-module"] = open_module
  local function load_module(spec, ...)
    local _g527 = unstash({...})
    local private = _g527.private
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
        local _g532 = import_modules(m.alias)
        local aliased = _g532[1]
        local bs = _g532[2]
        imports = join(imports, aliased)
        bindings = join(bindings, bs)
      else
        local _g533 = imported(spec)
        add(imports, spec)
        bindings = join(bindings, _g533)
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
  local _g551 = nexus["lumen/runtime"]
  local nil63 = _g551["nil?"]
  local is63 = _g551["is?"]
  local length = _g551.length
  local none63 = _g551["none?"]
  local some63 = _g551["some?"]
  local one63 = _g551["one?"]
  local hd = _g551.hd
  local string63 = _g551["string?"]
  local number63 = _g551["number?"]
  local boolean63 = _g551["boolean?"]
  local function63 = _g551["function?"]
  local composite63 = _g551["composite?"]
  local atom63 = _g551["atom?"]
  local table63 = _g551["table?"]
  local list63 = _g551["list?"]
  local substring = _g551.substring
  local sub = _g551.sub
  local keys = _g551.keys
  local inner = _g551.inner
  local tl = _g551.tl
  local char = _g551.char
  local code = _g551.code
  local string_literal63 = _g551["string-literal?"]
  local id_literal63 = _g551["id-literal?"]
  local add = _g551.add
  local drop = _g551.drop
  local last = _g551.last
  local reverse = _g551.reverse
  local join = _g551.join
  local reduce = _g551.reduce
  local keep = _g551.keep
  local in63 = _g551["in?"]
  local find = _g551.find
  local pair = _g551.pair
  local sort = _g551.sort
  local iterate = _g551.iterate
  local replicate = _g551.replicate
  local series = _g551.series
  local map = _g551.map
  local keys63 = _g551["keys?"]
  local empty63 = _g551["empty?"]
  local stash = _g551.stash
  local unstash = _g551.unstash
  local search = _g551.search
  local split = _g551.split
  local cat = _g551.cat
  local _43 = _g551["+"]
  local _ = _g551["-"]
  local _42 = _g551["*"]
  local _47 = _g551["/"]
  local _37 = _g551["%"]
  local _62 = _g551[">"]
  local _60 = _g551["<"]
  local _61 = _g551["="]
  local _6261 = _g551[">="]
  local _6061 = _g551["<="]
  local read_file = _g551["read-file"]
  local write_file = _g551["write-file"]
  local write = _g551.write
  local exit = _g551.exit
  local today = _g551.today
  local now = _g551.now
  local number = _g551.number
  local string = _g551.string
  local space = _g551.space
  local apply = _g551.apply
  local make_id = _g551["make-id"]
  local _37message_handler = _g551["%message-handler"]
  local toplevel63 = _g551["toplevel?"]
  local module_key = _g551["module-key"]
  local module = _g551.module
  local setenv = _g551.setenv
  local _g554 = nexus["lumen/lib"]
  local getenv = _g554.getenv
  local macro_function = _g554["macro-function"]
  local macro63 = _g554["macro?"]
  local special63 = _g554["special?"]
  local special_form63 = _g554["special-form?"]
  local statement63 = _g554["statement?"]
  local symbol_expansion = _g554["symbol-expansion"]
  local symbol63 = _g554["symbol?"]
  local variable63 = _g554["variable?"]
  local bound63 = _g554["bound?"]
  local quoted = _g554.quoted
  local stash42 = _g554["stash*"]
  local index = _g554.index
  local bind = _g554.bind
  local bind42 = _g554["bind*"]
  local quasiexpand = _g554.quasiexpand
  local macroexpand = _g554.macroexpand
  local indentation = _g554.indentation
  local reserved63 = _g554["reserved?"]
  local valid_id63 = _g554["valid-id?"]
  local id = _g554.id
  local key = _g554.key
  local imported = _g554.imported
  local link = _g554.link
  local mapo = _g554.mapo
  local quote_environment = _g554["quote-environment"]
  local quote_modules = _g554["quote-modules"]
  local initial_environment = _g554["initial-environment"]
  local _g555 = nexus["lumen/compiler"]
  local compile_function = _g555["compile-function"]
  local compile = _g555.compile
  local open_module = _g555["open-module"]
  local load_module = _g555["load-module"]
  local in_module = _g555["in-module"]
  local import_modules = _g555["import-modules"]
  local compile_module = _g555["compile-module"]
  local declare = _g555.declare
  local eval = _g555.eval
end)();
(function ()
  nexus["lumen/core"] = {}
  local _g953 = nexus["lumen/runtime"]
  local nil63 = _g953["nil?"]
  local is63 = _g953["is?"]
  local length = _g953.length
  local none63 = _g953["none?"]
  local some63 = _g953["some?"]
  local one63 = _g953["one?"]
  local hd = _g953.hd
  local string63 = _g953["string?"]
  local number63 = _g953["number?"]
  local boolean63 = _g953["boolean?"]
  local function63 = _g953["function?"]
  local composite63 = _g953["composite?"]
  local atom63 = _g953["atom?"]
  local table63 = _g953["table?"]
  local list63 = _g953["list?"]
  local substring = _g953.substring
  local sub = _g953.sub
  local keys = _g953.keys
  local inner = _g953.inner
  local tl = _g953.tl
  local char = _g953.char
  local code = _g953.code
  local string_literal63 = _g953["string-literal?"]
  local id_literal63 = _g953["id-literal?"]
  local add = _g953.add
  local drop = _g953.drop
  local last = _g953.last
  local reverse = _g953.reverse
  local join = _g953.join
  local reduce = _g953.reduce
  local keep = _g953.keep
  local in63 = _g953["in?"]
  local find = _g953.find
  local pair = _g953.pair
  local sort = _g953.sort
  local iterate = _g953.iterate
  local replicate = _g953.replicate
  local series = _g953.series
  local map = _g953.map
  local keys63 = _g953["keys?"]
  local empty63 = _g953["empty?"]
  local stash = _g953.stash
  local unstash = _g953.unstash
  local search = _g953.search
  local split = _g953.split
  local cat = _g953.cat
  local _43 = _g953["+"]
  local _ = _g953["-"]
  local _42 = _g953["*"]
  local _47 = _g953["/"]
  local _37 = _g953["%"]
  local _62 = _g953[">"]
  local _60 = _g953["<"]
  local _61 = _g953["="]
  local _6261 = _g953[">="]
  local _6061 = _g953["<="]
  local read_file = _g953["read-file"]
  local write_file = _g953["write-file"]
  local write = _g953.write
  local exit = _g953.exit
  local today = _g953.today
  local now = _g953.now
  local number = _g953.number
  local string = _g953.string
  local space = _g953.space
  local apply = _g953.apply
  local make_id = _g953["make-id"]
  local _37message_handler = _g953["%message-handler"]
  local toplevel63 = _g953["toplevel?"]
  local module_key = _g953["module-key"]
  local module = _g953.module
  local setenv = _g953.setenv
  local _g956 = nexus["lumen/lib"]
  local getenv = _g956.getenv
  local macro_function = _g956["macro-function"]
  local macro63 = _g956["macro?"]
  local special63 = _g956["special?"]
  local special_form63 = _g956["special-form?"]
  local statement63 = _g956["statement?"]
  local symbol_expansion = _g956["symbol-expansion"]
  local symbol63 = _g956["symbol?"]
  local variable63 = _g956["variable?"]
  local bound63 = _g956["bound?"]
  local quoted = _g956.quoted
  local stash42 = _g956["stash*"]
  local index = _g956.index
  local bind = _g956.bind
  local bind42 = _g956["bind*"]
  local quasiexpand = _g956.quasiexpand
  local macroexpand = _g956.macroexpand
  local indentation = _g956.indentation
  local reserved63 = _g956["reserved?"]
  local valid_id63 = _g956["valid-id?"]
  local id = _g956.id
  local key = _g956.key
  local imported = _g956.imported
  local link = _g956.link
  local mapo = _g956.mapo
  local quote_environment = _g956["quote-environment"]
  local quote_modules = _g956["quote-modules"]
  local initial_environment = _g956["initial-environment"]
  local _g957 = nexus["lumen/compiler"]
  local compile_function = _g957["compile-function"]
  local compile = _g957.compile
  local open_module = _g957["open-module"]
  local load_module = _g957["load-module"]
  local in_module = _g957["in-module"]
  local import_modules = _g957["import-modules"]
  local compile_module = _g957["compile-module"]
  local declare = _g957.declare
  local eval = _g957.eval
  target = "lua"
end)();
(function ()
  nexus["lumen/boot"] = {}
  local _g1906 = nexus["lumen/runtime"]
  local nil63 = _g1906["nil?"]
  local is63 = _g1906["is?"]
  local length = _g1906.length
  local none63 = _g1906["none?"]
  local some63 = _g1906["some?"]
  local one63 = _g1906["one?"]
  local hd = _g1906.hd
  local string63 = _g1906["string?"]
  local number63 = _g1906["number?"]
  local boolean63 = _g1906["boolean?"]
  local function63 = _g1906["function?"]
  local composite63 = _g1906["composite?"]
  local atom63 = _g1906["atom?"]
  local table63 = _g1906["table?"]
  local list63 = _g1906["list?"]
  local substring = _g1906.substring
  local sub = _g1906.sub
  local keys = _g1906.keys
  local inner = _g1906.inner
  local tl = _g1906.tl
  local char = _g1906.char
  local code = _g1906.code
  local string_literal63 = _g1906["string-literal?"]
  local id_literal63 = _g1906["id-literal?"]
  local add = _g1906.add
  local drop = _g1906.drop
  local last = _g1906.last
  local reverse = _g1906.reverse
  local join = _g1906.join
  local reduce = _g1906.reduce
  local keep = _g1906.keep
  local in63 = _g1906["in?"]
  local find = _g1906.find
  local pair = _g1906.pair
  local sort = _g1906.sort
  local iterate = _g1906.iterate
  local replicate = _g1906.replicate
  local series = _g1906.series
  local map = _g1906.map
  local keys63 = _g1906["keys?"]
  local empty63 = _g1906["empty?"]
  local stash = _g1906.stash
  local unstash = _g1906.unstash
  local search = _g1906.search
  local split = _g1906.split
  local cat = _g1906.cat
  local _43 = _g1906["+"]
  local _ = _g1906["-"]
  local _42 = _g1906["*"]
  local _47 = _g1906["/"]
  local _37 = _g1906["%"]
  local _62 = _g1906[">"]
  local _60 = _g1906["<"]
  local _61 = _g1906["="]
  local _6261 = _g1906[">="]
  local _6061 = _g1906["<="]
  local read_file = _g1906["read-file"]
  local write_file = _g1906["write-file"]
  local write = _g1906.write
  local exit = _g1906.exit
  local today = _g1906.today
  local now = _g1906.now
  local number = _g1906.number
  local string = _g1906.string
  local space = _g1906.space
  local apply = _g1906.apply
  local make_id = _g1906["make-id"]
  local _37message_handler = _g1906["%message-handler"]
  local toplevel63 = _g1906["toplevel?"]
  local module_key = _g1906["module-key"]
  local module = _g1906.module
  local setenv = _g1906.setenv
  local _g1909 = nexus["lumen/lib"]
  local getenv = _g1909.getenv
  local macro_function = _g1909["macro-function"]
  local macro63 = _g1909["macro?"]
  local special63 = _g1909["special?"]
  local special_form63 = _g1909["special-form?"]
  local statement63 = _g1909["statement?"]
  local symbol_expansion = _g1909["symbol-expansion"]
  local symbol63 = _g1909["symbol?"]
  local variable63 = _g1909["variable?"]
  local bound63 = _g1909["bound?"]
  local quoted = _g1909.quoted
  local stash42 = _g1909["stash*"]
  local index = _g1909.index
  local bind = _g1909.bind
  local bind42 = _g1909["bind*"]
  local quasiexpand = _g1909.quasiexpand
  local macroexpand = _g1909.macroexpand
  local indentation = _g1909.indentation
  local reserved63 = _g1909["reserved?"]
  local valid_id63 = _g1909["valid-id?"]
  local id = _g1909.id
  local key = _g1909.key
  local imported = _g1909.imported
  local link = _g1909.link
  local mapo = _g1909.mapo
  local quote_environment = _g1909["quote-environment"]
  local quote_modules = _g1909["quote-modules"]
  local initial_environment = _g1909["initial-environment"]
  local _g1910 = nexus["lumen/compiler"]
  local compile_function = _g1910["compile-function"]
  local compile = _g1910.compile
  local open_module = _g1910["open-module"]
  local load_module = _g1910["load-module"]
  local in_module = _g1910["in-module"]
  local import_modules = _g1910["import-modules"]
  local compile_module = _g1910["compile-module"]
  local declare = _g1910.declare
  local eval = _g1910.eval
  modules = {["lumen/boot"] = {export = {["%initial-environment"] = {macro = function ()
    return(quote_environment(initial_environment()))
  end}, ["%initial-modules"] = {macro = function ()
    return(quote_modules())
  end}, modules = {global = true, export = true}}, import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}, {"lumen", "lib"}, {"lumen", "compiler"}}}, user = {export = {}, import = {"lumen", {"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}}}, ["lumen/core"] = {export = {quote = {macro = function (form)
    return(quoted(form))
  end, export = true}, quasiquote = {macro = function (form)
    return(quasiexpand(form, 1))
  end, export = true}, at = {macro = function (l, i)
    if target == "lua" and number63(i) then
      i = i + 1
    else
      if target == "lua" then
        i = {"+", i, 1}
      end
    end
    return({"get", l, i})
  end, export = true}, list = {macro = function (...)
    local body = unstash({...})
    local l = {}
    local forms = {}
    local id = make_id()
    local _g1950 = body
    local k = nil
    for k in next, _g1950 do
      local v = _g1950[k]
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
  end, export = true}, ["if"] = {macro = function (...)
    local branches = unstash({...})
    local function step(_g1962)
      local a = _g1962[1]
      local b = _g1962[2]
      local c = sub(_g1962, 2)
      if is63(b) then
        return({join({"%if", a, b}, step(c))})
      else
        if is63(a) then
          return({a})
        end
      end
    end
    return(hd(step(branches)))
  end, export = true}, when = {macro = function (cond, ...)
    local _g1966 = unstash({...})
    local body = sub(_g1966, 0)
    return({"if", cond, join({"do"}, body)})
  end, export = true}, unless = {macro = function (cond, ...)
    local _g1970 = unstash({...})
    local body = sub(_g1970, 0)
    return({"if", {"not", cond}, join({"do"}, body)})
  end, export = true}, table = {macro = function (...)
    local body = unstash({...})
    return(join({"%object"}, mapo(function (x)
      return(x)
    end, body)))
  end, export = true}, let = {macro = function (bindings, ...)
    local _g1978 = unstash({...})
    local body = sub(_g1978, 0)
    if length(bindings) < 2 then
      return(join({"do"}, body))
    else
      local renames = {}
      local locals = {}
      local lh = bindings[1]
      local rh = bindings[2]
      local _g1981 = bind(lh, rh)
      local k = nil
      for k in next, _g1981 do
        local _g1983 = _g1981[k]
        local id = _g1983[1]
        local val = _g1983[2]
        if number63(k) then
          if bound63(id) or reserved63(id) or toplevel63() then
            local id1 = make_id()
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
  end, export = true}, ["define-module"] = {macro = function (spec, ...)
    local _g1989 = unstash({...})
    local body = sub(_g1989, 0)
    local imp = body.import
    local exp = body.export
    local alias = body.alias
    local _g1991 = import_modules(imp)
    local imports = _g1991[1]
    local bindings = _g1991[2]
    local k = module_key(spec)
    modules[k] = {import = imports, export = {}, alias = alias}
    local _g1992 = exp or {}
    local _g950 = nil
    for _g950 in next, _g1992 do
      local x = _g1992[_g950]
      setenv(x, {_stash = true, export = true})
    end
    return(join({"do", {"set", {"get", "nexus", {"quote", k}}, {"table"}}}, bindings))
  end, export = true}, ["define-macro"] = {macro = function (name, args, ...)
    local _g1999 = unstash({...})
    local body = sub(_g1999, 0)
    local form = join({"fn", args}, body)
    local _g2002 = {"setenv", {"quote", name}}
    _g2002.macro = form
    _g2002.form = {"quote", form}
    eval(_g2002)
    return(nil)
  end, export = true}, ["define-special"] = {macro = function (name, args, ...)
    local _g2005 = unstash({...})
    local body = sub(_g2005, 0)
    local form = join({"fn", args}, body)
    local keys = sub(body, length(body))
    local _g2008 = {"setenv", {"quote", name}}
    _g2008.special = form
    _g2008.form = {"quote", form}
    eval(join(_g2008, keys))
    return(nil)
  end, export = true}, ["define-symbol"] = {macro = function (name, expansion)
    setenv(name, {_stash = true, symbol = expansion})
    return(nil)
  end, export = true}, ["define*"] = {macro = function (name, x, ...)
    local _g2012 = unstash({...})
    local body = sub(_g2012, 0)
    setenv(name, {_stash = true, global = true, export = true})
    if some63(body) then
      local _g2014 = bind42(x, body)
      local args = _g2014[1]
      local _g2015 = _g2014[2]
      return(join({"%global-function", name, args}, _g2015))
    else
      if target == "js" then
        return({"set", {"get", "global", {"quote", id(name)}}, x})
      else
        return({"set", name, x})
      end
    end
  end, export = true}, define = {macro = function (name, x, ...)
    local _g2021 = unstash({...})
    local body = sub(_g2021, 0)
    setenv(name, {_stash = true, variable = true})
    if some63(body) and target == "js" then
      return(link(name, {"%local", name, join({"fn", x}, body)}))
    else
      if some63(body) then
        local _g2025 = bind42(x, body)
        local args = _g2025[1]
        local _g2026 = _g2025[2]
        return(link(name, join({"%local-function", name, args}, _g2026)))
      else
        return(link(name, {"%local", name, x}))
      end
    end
  end, export = true}, ["set*"] = {macro = function (name, value)
    return(link(name, {"set", name, value}))
  end, export = true}, ["with-bindings"] = {macro = function (_g2032, ...)
    local names = _g2032[1]
    local _g2031 = unstash({...})
    local body = sub(_g2031, 0)
    local x = make_id()
    local _g2037 = {"setenv", x}
    _g2037.variable = true
    local _g2034 = {"with-frame", {"all", {"_g951", x}, names, _g2037}}
    _g2034.scope = true
    return(join(_g2034, body))
  end, export = true}, ["let-macro"] = {macro = function (definitions, ...)
    local _g2038 = unstash({...})
    local body = sub(_g2038, 0)
    add(environment, {})
    map(function (m)
      return(macroexpand(join({"define-macro"}, m)))
    end, definitions)
    local _g2040 = join({"do"}, macroexpand(body))
    drop(environment)
    return(_g2040)
  end, export = true}, ["let-symbol"] = {macro = function (expansions, ...)
    local _g2044 = unstash({...})
    local body = sub(_g2044, 0)
    add(environment, {})
    map(function (_g2048)
      local name = _g2048[1]
      local exp = _g2048[2]
      return(macroexpand({"define-symbol", name, exp}))
    end, pair(expansions))
    local _g2046 = join({"do"}, macroexpand(body))
    drop(environment)
    return(_g2046)
  end, export = true}, fn = {macro = function (args, ...)
    local _g2051 = unstash({...})
    local body = sub(_g2051, 0)
    local _g2053 = bind42(args, body)
    local _g2054 = _g2053[1]
    local _g2055 = _g2053[2]
    return(join({"%function", _g2054}, _g2055))
  end, export = true}, guard = {macro = function (expr)
    if target == "js" then
      return({{"fn", {}, {"%try", {"list", true, expr}}}})
    else
      local e = make_id()
      local x = make_id()
      local ex = "|" .. e .. "," .. x .. "|"
      return({"let", {ex, {"xpcall", {"fn", {}, expr}, "%message-handler"}}, {"list", e, x}})
    end
  end, export = true}, all = {macro = function (_g2068, t, ...)
    local k = _g2068[1]
    local v = _g2068[2]
    local _g2067 = unstash({...})
    local body = sub(_g2067, 0)
    local x = make_id()
    local n = make_id()
    local _g2254
    if target == "lua" then
      _g2254 = body
    else
      _g2254 = {join({"let", {n, {"parseInt", k}, k, {"if", {"isNaN", n}, k, n}}}, body)}
    end
    return({"let", {x, t, k, "nil"}, {"%for", x, k, join({"let", {v, {"get", x, k}}}, _g2254)}})
  end, export = true}, each = {macro = function (b, t, ...)
    local _g2082 = unstash({...})
    local body = sub(_g2082, 0)
    local k = b[1]
    local v = b[2]
    local t1 = make_id()
    local _g2255
    if nil63(v) then
      local _g2256
      if b.i then
        _g2256 = "i"
      else
        _g2256 = make_id()
      end
      local i = _g2256
      _g2255 = {"let", {i, 0}, {"while", {"<", i, {"length", t1}}, join({"let", {k, {"at", t1, i}}}, body), {"inc", i}}}
    else
      local _g2099 = {"target"}
      _g2099.js = {"isNaN", {"parseInt", k}}
      _g2099.lua = {"not", {"number?", k}}
      _g2255 = {"let", {k, "nil"}, {"%for", t1, k, {"when", _g2099, join({"let", {v, {"get", t1, k}}}, body)}}}
    end
    return({"let", {t1, t}, _g2255})
  end, export = true}, ["set-of"] = {macro = function (...)
    local xs = unstash({...})
    local l = {}
    local _g2108 = xs
    local _g952 = nil
    for _g952 in next, _g2108 do
      local x = _g2108[_g952]
      l[x] = true
    end
    return(join({"table"}, l))
  end, export = true}, language = {macro = function ()
    return({"quote", target})
  end, export = true}, target = {export = true, global = true, macro = function (...)
    local clauses = unstash({...})
    return(clauses[target])
  end}, ["join*"] = {macro = function (...)
    local xs = unstash({...})
    return(reduce(function (a, b)
      return({"join", a, b})
    end, xs))
  end, export = true}, ["join!"] = {macro = function (a, ...)
    local _g2117 = unstash({...})
    local bs = sub(_g2117, 0)
    return({"set", a, join({"join*", a}, bs)})
  end, export = true}, ["cat!"] = {macro = function (a, ...)
    local _g2121 = unstash({...})
    local bs = sub(_g2121, 0)
    return({"set", a, join({"cat", a}, bs)})
  end, export = true}, inc = {macro = function (n, by)
    return({"set", n, {"+", n, by or 1}})
  end, export = true}, dec = {macro = function (n, by)
    return({"set", n, {"-", n, by or 1}})
  end, export = true}, pr = {macro = function (...)
    local xs = unstash({...})
    return({"print", space(xs)})
  end, export = true}, ["with-frame"] = {macro = function (...)
    local _g2133 = unstash({...})
    local body = sub(_g2133, 0)
    local scope = _g2133.scope
    local x = make_id()
    local _g2137 = {"table"}
    _g2137._scope = scope
    return({"do", {"add", "environment", _g2137}, {"let", {x, join({"do"}, body)}, {"drop", "environment"}, x}})
  end, export = true}}, import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}, {"lumen", "lib"}, {"lumen", "compiler"}}}, ["lumen/lib"] = {export = {getenv = {export = true, variable = true}, ["macro-function"] = {export = true, variable = true}, ["macro?"] = {export = true, variable = true}, ["special?"] = {export = true, variable = true}, ["special-form?"] = {export = true, variable = true}, ["statement?"] = {export = true, variable = true}, ["symbol-expansion"] = {export = true, variable = true}, ["symbol?"] = {export = true, variable = true}, ["variable?"] = {export = true, variable = true}, ["bound?"] = {export = true, variable = true}, quoted = {export = true, variable = true}, ["stash*"] = {export = true, variable = true}, index = {export = true, variable = true}, bind = {export = true, variable = true}, ["bind*"] = {export = true, variable = true}, quasiexpand = {export = true, variable = true}, macroexpand = {export = true, variable = true}, indentation = {export = true, variable = true}, ["with-indent"] = {export = true, macro = function (form)
    local result = make_id()
    return({"do", {"inc", "indent-level"}, {"let", {result, form}, {"dec", "indent-level"}, result}})
  end}, ["reserved?"] = {export = true, variable = true}, ["valid-id?"] = {export = true, variable = true}, id = {export = true, variable = true}, key = {export = true, variable = true}, imported = {export = true, variable = true}, link = {export = true, variable = true}, mapo = {export = true, variable = true}, ["quote-environment"] = {export = true, variable = true}, ["quote-modules"] = {export = true, variable = true}, ["initial-environment"] = {export = true, variable = true}, ["global?"] = {variable = true}, escape = {variable = true}, literal = {variable = true}, bias = {variable = true}, ["quoting?"] = {variable = true}, ["quasiquoting?"] = {variable = true}, ["can-unquote?"] = {variable = true}, ["quasisplice?"] = {variable = true}, ["quasiquote-list"] = {variable = true}, ["indent-level"] = {global = true, export = true}, reserved = {variable = true}, ["numeric?"] = {variable = true}, ["valid-code?"] = {variable = true}, extend = {variable = true}, exclude = {variable = true}, ["quote-binding"] = {variable = true}, ["quote-frame"] = {variable = true}, ["quote-module"] = {variable = true}}, import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}}}, ["lumen/compiler"] = {export = {["compile-function"] = {export = true, variable = true}, compile = {export = true, variable = true}, ["open-module"] = {export = true, variable = true}, ["load-module"] = {export = true, variable = true}, ["in-module"] = {export = true, variable = true}, ["import-modules"] = {export = true, variable = true}, ["compile-module"] = {export = true, variable = true}, declare = {export = true, variable = true}, eval = {export = true, variable = true}, infix = {variable = true}, ["unary?"] = {variable = true}, precedence = {variable = true}, getop = {variable = true}, ["infix?"] = {variable = true}, ["compile-args"] = {variable = true}, ["compile-atom"] = {variable = true}, terminator = {variable = true}, ["compile-special"] = {variable = true}, ["parenthesize-call?"] = {variable = true}, ["compile-call"] = {variable = true}, ["op-delims"] = {variable = true}, ["compile-infix"] = {variable = true}, ["can-return?"] = {variable = true}, lower = {variable = true}, ["lower-statement"] = {variable = true}, ["lower-body"] = {variable = true}, ["lower-do"] = {variable = true}, ["lower-if"] = {variable = true}, ["lower-short"] = {variable = true}, ["lower-try"] = {variable = true}, ["lower-while"] = {variable = true}, ["lower-for"] = {variable = true}, ["lower-function"] = {variable = true}, ["lower-definition"] = {variable = true}, ["lower-call"] = {variable = true}, ["lower-infix?"] = {variable = true}, ["lower-infix"] = {variable = true}, ["lower-special"] = {variable = true}, process = {variable = true}, ["current-module"] = {global = true, export = true}, ["module-path"] = {variable = true}, encapsulate = {variable = true}, ["compile-file"] = {variable = true}, run = {variable = true}, ["compiling?"] = {variable = true}, ["compiler-output"] = {variable = true}, conclude = {variable = true}, ["%compile-module"] = {variable = true}, reimported = {variable = true}, ["%result"] = {global = true, export = true}}, import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}, {"lumen", "lib"}, {"lumen", "reader"}}}, ["lumen/special"] = {export = {["do"] = {foo = true, tr = true, stmt = true, special = function (...)
    local forms = unstash({...})
    local str = ""
    series(function (x)
      str = str .. compile(x, {_stash = true, stmt = true})
    end, forms)
    return(str)
  end, export = true}, ["%if"] = {foo = true, tr = true, stmt = true, special = function (cond, cons, alt)
    local _g2167 = compile(cond)
    indent_level = indent_level + 1
    local _g2169 = compile(cons, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local _g2168 = _g2169
    local _g2257
    if alt then
      indent_level = indent_level + 1
      local _g2171 = compile(alt, {_stash = true, stmt = true})
      indent_level = indent_level - 1
      _g2257 = _g2171
    end
    local _g2170 = _g2257
    local ind = indentation()
    local str = ""
    if target == "js" then
      str = str .. ind .. "if (" .. _g2167 .. ") {\n" .. _g2168 .. ind .. "}"
    else
      str = str .. ind .. "if " .. _g2167 .. " then\n" .. _g2168
    end
    if _g2170 and target == "js" then
      str = str .. " else {\n" .. _g2170 .. ind .. "}"
    else
      if _g2170 then
        str = str .. ind .. "else\n" .. _g2170
      end
    end
    if target == "lua" then
      return(str .. ind .. "end\n")
    else
      return(str .. "\n")
    end
  end, export = true}, ["while"] = {foo = true, tr = true, stmt = true, special = function (cond, form)
    local _g2173 = compile(cond)
    indent_level = indent_level + 1
    local _g2174 = compile(form, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local body = _g2174
    local ind = indentation()
    if target == "js" then
      return(ind .. "while (" .. _g2173 .. ") {\n" .. body .. ind .. "}\n")
    else
      return(ind .. "while " .. _g2173 .. " do\n" .. body .. ind .. "end\n")
    end
  end, export = true}, ["%for"] = {foo = true, tr = true, stmt = true, special = function (t, k, form)
    local _g2176 = compile(t)
    local ind = indentation()
    indent_level = indent_level + 1
    local _g2177 = compile(form, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local body = _g2177
    if target == "lua" then
      return(ind .. "for " .. k .. " in next, " .. _g2176 .. " do\n" .. body .. ind .. "end\n")
    else
      return(ind .. "for (" .. k .. " in " .. _g2176 .. ") {\n" .. body .. ind .. "}\n")
    end
  end, export = true}, ["%try"] = {foo = true, tr = true, stmt = true, special = function (form)
    local ind = indentation()
    indent_level = indent_level + 1
    local _g2179 = compile(form, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local body = _g2179
    local e = make_id()
    local hf = {"return", {"%array", false, {"get", e, "\"message\""}}}
    indent_level = indent_level + 1
    local _g2183 = compile(hf, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local h = _g2183
    return(ind .. "try {\n" .. body .. ind .. "}\n" .. ind .. "catch (" .. e .. ") {\n" .. h .. ind .. "}\n")
  end, export = true}, ["break"] = {special = function ()
    return(indentation() .. "break")
  end, foo = true, stmt = true, export = true}, ["%function"] = {foo = true, special = function (args, body)
    return(compile_function(args, body))
  end, export = true}, ["%global-function"] = {foo = true, tr = true, stmt = true, special = function (name, args, body)
    if target == "lua" then
      local x = compile_function(args, body, {_stash = true, name = name})
      return(indentation() .. x)
    else
      return(compile({"set", name, {"%function", args, body}}, {_stash = true, stmt = true}))
    end
  end, export = true}, ["%local-function"] = {foo = true, tr = true, stmt = true, special = function (name, args, body)
    local x = compile_function(args, body, {_stash = true, name = name, prefix = "local "})
    return(indentation() .. x)
  end, export = true}, ["return"] = {special = function (x)
    local _g2258
    if nil63(x) then
      _g2258 = "return"
    else
      _g2258 = "return(" .. compile(x) .. ")"
    end
    local _g2191 = _g2258
    return(indentation() .. _g2191)
  end, foo = true, stmt = true, export = true}, error = {special = function (x)
    local _g2259
    if target == "js" then
      _g2259 = "throw new " .. compile({"Error", x})
    else
      _g2259 = "error(" .. compile(x) .. ")"
    end
    local e = _g2259
    return(indentation() .. e)
  end, foo = true, stmt = true, export = true}, ["%local"] = {special = function (name, value)
    local id = compile(name)
    local value1 = compile(value)
    local _g2260
    if is63(value) then
      _g2260 = " = " .. value1
    else
      _g2260 = ""
    end
    local rh = _g2260
    local _g2261
    if target == "js" then
      _g2261 = "var "
    else
      _g2261 = "local "
    end
    local keyword = _g2261
    local ind = indentation()
    return(ind .. keyword .. id .. rh)
  end, foo = true, stmt = true, export = true}, set = {special = function (lh, rh)
    local _g2196 = compile(lh)
    local _g2262
    if nil63(rh) then
      _g2262 = "nil"
    else
      _g2262 = rh
    end
    local _g2197 = compile(_g2262)
    return(indentation() .. _g2196 .. " = " .. _g2197)
  end, foo = true, stmt = true, export = true}, get = {foo = true, special = function (t, k)
    local _g2199 = compile(t)
    local k1 = compile(k)
    if target == "lua" and char(_g2199, 0) == "{" then
      _g2199 = "(" .. _g2199 .. ")"
    end
    if string_literal63(k) and valid_id63(inner(k)) then
      return(_g2199 .. "." .. inner(k))
    else
      return(_g2199 .. "[" .. k1 .. "]")
    end
  end, export = true}, ["not"] = {}, ["%array"] = {foo = true, special = function (...)
    local forms = unstash({...})
    local _g2263
    if target == "lua" then
      _g2263 = "{"
    else
      _g2263 = "["
    end
    local open = _g2263
    local _g2264
    if target == "lua" then
      _g2264 = "}"
    else
      _g2264 = "]"
    end
    local close = _g2264
    local str = ""
    local comma = ""
    local _g2201 = forms
    local k = nil
    for k in next, _g2201 do
      local v = _g2201[k]
      if number63(k) then
        str = str .. comma .. compile(v)
        comma = ", "
      end
    end
    return(open .. str .. close)
  end, export = true}, ["%object"] = {foo = true, special = function (...)
    local forms = unstash({...})
    local str = "{"
    local _g2265
    if target == "lua" then
      _g2265 = " = "
    else
      _g2265 = ": "
    end
    local sep = _g2265
    local comma = ""
    local _g2204 = pair(forms)
    local k = nil
    for k in next, _g2204 do
      local v = _g2204[k]
      if number63(k) then
        local _g2206 = v[1]
        local _g2207 = v[2]
        if not string63(_g2206) then
          error("Illegal key: " .. string(_g2206))
        end
        str = str .. comma .. key(_g2206) .. sep .. compile(_g2207)
        comma = ", "
      end
    end
    return(str .. "}")
  end, export = true}}, import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}, {"lumen", "lib"}, {"lumen", "compiler"}}}, ["lumen/system"] = {export = {nexus = {global = true, export = true}}, import = {{"lumen", "special"}, {"lumen", "core"}}}, ["lumen/reader"] = {export = {["make-stream"] = {export = true, variable = true}, ["read-table"] = {export = true, variable = true}, ["define-reader"] = {export = true, macro = function (_g2218, ...)
    local char = _g2218[1]
    local stream = _g2218[2]
    local _g2217 = unstash({...})
    local body = sub(_g2217, 0)
    return({"set", {"get", "read-table", char}, join({"fn", {stream}}, body)})
  end}, read = {export = true, variable = true}, ["read-all"] = {export = true, variable = true}, ["read-from-string"] = {export = true, variable = true}, delimiters = {variable = true}, whitespace = {variable = true}, ["peek-char"] = {variable = true}, ["read-char"] = {variable = true}, ["skip-non-code"] = {variable = true}, eof = {variable = true}, ["key?"] = {variable = true}, ["flag?"] = {variable = true}}, import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}}}, ["lumen/runtime"] = {export = {["nil?"] = {export = true, variable = true}, ["is?"] = {export = true, variable = true}, length = {export = true, variable = true}, ["none?"] = {export = true, variable = true}, ["some?"] = {export = true, variable = true}, ["one?"] = {export = true, variable = true}, hd = {export = true, variable = true}, ["string?"] = {export = true, variable = true}, ["number?"] = {export = true, variable = true}, ["boolean?"] = {export = true, variable = true}, ["function?"] = {export = true, variable = true}, ["composite?"] = {export = true, variable = true}, ["atom?"] = {export = true, variable = true}, ["table?"] = {export = true, variable = true}, ["list?"] = {export = true, variable = true}, substring = {export = true, variable = true}, sub = {export = true, variable = true}, keys = {export = true, variable = true}, inner = {export = true, variable = true}, tl = {export = true, variable = true}, char = {export = true, variable = true}, code = {export = true, variable = true}, ["string-literal?"] = {export = true, variable = true}, ["id-literal?"] = {export = true, variable = true}, add = {export = true, variable = true}, drop = {export = true, variable = true}, last = {export = true, variable = true}, reverse = {export = true, variable = true}, join = {export = true, variable = true}, reduce = {export = true, variable = true}, keep = {export = true, variable = true}, ["in?"] = {export = true, variable = true}, find = {export = true, variable = true}, pair = {export = true, variable = true}, sort = {export = true, variable = true}, iterate = {export = true, variable = true}, replicate = {export = true, variable = true}, series = {export = true, variable = true}, map = {export = true, variable = true}, ["keys?"] = {export = true, variable = true}, ["empty?"] = {export = true, variable = true}, stash = {export = true, variable = true}, unstash = {export = true, variable = true}, search = {export = true, variable = true}, split = {export = true, variable = true}, cat = {export = true, variable = true}, ["+"] = {export = true, variable = true}, ["-"] = {export = true, variable = true}, ["*"] = {export = true, variable = true}, ["/"] = {export = true, variable = true}, ["%"] = {export = true, variable = true}, [">"] = {export = true, variable = true}, ["<"] = {export = true, variable = true}, ["="] = {export = true, variable = true}, [">="] = {export = true, variable = true}, ["<="] = {export = true, variable = true}, ["read-file"] = {export = true, variable = true}, ["write-file"] = {export = true, variable = true}, write = {export = true, variable = true}, exit = {export = true, variable = true}, today = {export = true, variable = true}, now = {export = true, variable = true}, number = {export = true, variable = true}, string = {export = true, variable = true}, space = {export = true, variable = true}, apply = {export = true, variable = true}, ["make-id"] = {export = true, variable = true}, ["%message-handler"] = {export = true, variable = true}, ["toplevel?"] = {export = true, variable = true}, ["module-key"] = {export = true, variable = true}, module = {export = true, variable = true}, setenv = {export = true, variable = true}, shift = {variable = true}, ["id-count"] = {variable = true}}, import = {{"lumen", "special"}, {"lumen", "core"}}}, lumen = {export = {}, alias = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}}, import = {{"lumen", "special"}}}, ["lumen/main"] = {export = {}, import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}, {"lumen", "reader"}, {"lumen", "compiler"}}}}
  environment = {{["define-module"] = {macro = function (spec, ...)
    local _g2244 = unstash({...})
    local body = sub(_g2244, 0)
    local imp = body.import
    local exp = body.export
    local alias = body.alias
    local _g2246 = import_modules(imp)
    local imports = _g2246[1]
    local bindings = _g2246[2]
    local k = module_key(spec)
    modules[k] = {import = imports, export = {}, alias = alias}
    local _g2247 = exp or {}
    local _g950 = nil
    for _g950 in next, _g2247 do
      local x = _g2247[_g950]
      setenv(x, {_stash = true, export = true})
    end
    return(join({"do", {"set", {"get", "nexus", {"quote", k}}, {"table"}}}, bindings))
  end, export = true}}}
end)();
(function ()
  nexus.user = {}
  local _g2266 = nexus["lumen/runtime"]
  local nil63 = _g2266["nil?"]
  local is63 = _g2266["is?"]
  local length = _g2266.length
  local none63 = _g2266["none?"]
  local some63 = _g2266["some?"]
  local one63 = _g2266["one?"]
  local hd = _g2266.hd
  local string63 = _g2266["string?"]
  local number63 = _g2266["number?"]
  local boolean63 = _g2266["boolean?"]
  local function63 = _g2266["function?"]
  local composite63 = _g2266["composite?"]
  local atom63 = _g2266["atom?"]
  local table63 = _g2266["table?"]
  local list63 = _g2266["list?"]
  local substring = _g2266.substring
  local sub = _g2266.sub
  local keys = _g2266.keys
  local inner = _g2266.inner
  local tl = _g2266.tl
  local char = _g2266.char
  local code = _g2266.code
  local string_literal63 = _g2266["string-literal?"]
  local id_literal63 = _g2266["id-literal?"]
  local add = _g2266.add
  local drop = _g2266.drop
  local last = _g2266.last
  local reverse = _g2266.reverse
  local join = _g2266.join
  local reduce = _g2266.reduce
  local keep = _g2266.keep
  local in63 = _g2266["in?"]
  local find = _g2266.find
  local pair = _g2266.pair
  local sort = _g2266.sort
  local iterate = _g2266.iterate
  local replicate = _g2266.replicate
  local series = _g2266.series
  local map = _g2266.map
  local keys63 = _g2266["keys?"]
  local empty63 = _g2266["empty?"]
  local stash = _g2266.stash
  local unstash = _g2266.unstash
  local search = _g2266.search
  local split = _g2266.split
  local cat = _g2266.cat
  local _43 = _g2266["+"]
  local _ = _g2266["-"]
  local _42 = _g2266["*"]
  local _47 = _g2266["/"]
  local _37 = _g2266["%"]
  local _62 = _g2266[">"]
  local _60 = _g2266["<"]
  local _61 = _g2266["="]
  local _6261 = _g2266[">="]
  local _6061 = _g2266["<="]
  local read_file = _g2266["read-file"]
  local write_file = _g2266["write-file"]
  local write = _g2266.write
  local exit = _g2266.exit
  local today = _g2266.today
  local now = _g2266.now
  local number = _g2266.number
  local string = _g2266.string
  local space = _g2266.space
  local apply = _g2266.apply
  local make_id = _g2266["make-id"]
  local _37message_handler = _g2266["%message-handler"]
  local toplevel63 = _g2266["toplevel?"]
  local module_key = _g2266["module-key"]
  local module = _g2266.module
  local setenv = _g2266.setenv
end)();
(function ()
  nexus["lumen/main"] = {}
  local _g2 = nexus["lumen/runtime"]
  local _37message_handler = _g2["%message-handler"]
  local list63 = _g2["list?"]
  local add = _g2.add
  local replicate = _g2.replicate
  local table63 = _g2["table?"]
  local length = _g2.length
  local search = _g2.search
  local unstash = _g2.unstash
  local split = _g2.split
  local inner = _g2.inner
  local empty63 = _g2["empty?"]
  local substring = _g2.substring
  local tl = _g2.tl
  local number = _g2.number
  local _6061 = _g2["<="]
  local _62 = _g2[">"]
  local _60 = _g2["<"]
  local _61 = _g2["="]
  local pair = _g2.pair
  local apply = _g2.apply
  local function63 = _g2["function?"]
  local sort = _g2.sort
  local keep = _g2.keep
  local _43 = _g2["+"]
  local string63 = _g2["string?"]
  local char = _g2.char
  local _47 = _g2["/"]
  local sub = _g2.sub
  local _ = _g2["-"]
  local hd = _g2.hd
  local code = _g2.code
  local find = _g2.find
  local string = _g2.string
  local some63 = _g2["some?"]
  local reverse = _g2.reverse
  local one63 = _g2["one?"]
  local read_file = _g2["read-file"]
  local exit = _g2.exit
  local keys63 = _g2["keys?"]
  local number63 = _g2["number?"]
  local composite63 = _g2["composite?"]
  local make_id = _g2["make-id"]
  local setenv = _g2.setenv
  local reduce = _g2.reduce
  local cat = _g2.cat
  local write_file = _g2["write-file"]
  local stash = _g2.stash
  local toplevel63 = _g2["toplevel?"]
  local iterate = _g2.iterate
  local drop = _g2.drop
  local _6261 = _g2[">="]
  local write = _g2.write
  local now = _g2.now
  local last = _g2.last
  local is63 = _g2["is?"]
  local atom63 = _g2["atom?"]
  local string_literal63 = _g2["string-literal?"]
  local keys = _g2.keys
  local none63 = _g2["none?"]
  local module = _g2.module
  local map = _g2.map
  local series = _g2.series
  local nil63 = _g2["nil?"]
  local module_key = _g2["module-key"]
  local space = _g2.space
  local join = _g2.join
  local boolean63 = _g2["boolean?"]
  local _37 = _g2["%"]
  local today = _g2.today
  local _42 = _g2["*"]
  local id_literal63 = _g2["id-literal?"]
  local in63 = _g2["in?"]
  local _g5 = nexus["lumen/reader"]
  local read_from_string = _g5["read-from-string"]
  local read_all = _g5["read-all"]
  local make_stream = _g5["make-stream"]
  local read_table = _g5["read-table"]
  local read = _g5.read
  local _g6 = nexus["lumen/compiler"]
  local load_module = _g6["load-module"]
  local in_module = _g6["in-module"]
  local eval = _g6.eval
  local import_modules = _g6["import-modules"]
  local declare = _g6.declare
  local compile = _g6.compile
  local compile_function = _g6["compile-function"]
  local open_module = _g6["open-module"]
  local compile_module = _g6["compile-module"]
  local function rep(str)
    local _g2271,_g2272 = xpcall(function ()
      return(eval(read_from_string(str)))
    end, _37message_handler)
    local _g2270 = {_g2271, _g2272}
    local _g1 = _g2270[1]
    local x = _g2270[2]
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
