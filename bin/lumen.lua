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
  local number63 = _g170["number?"]
  local sub = _g170.sub
  local map = _g170.map
  local series = _g170.series
  local _6261 = _g170[">="]
  local _6061 = _g170["<="]
  local reverse = _g170.reverse
  local length = _g170.length
  local hd = _g170.hd
  local char = _g170.char
  local nil63 = _g170["nil?"]
  local in63 = _g170["in?"]
  local sort = _g170.sort
  local drop = _g170.drop
  local write = _g170.write
  local empty63 = _g170["empty?"]
  local find = _g170.find
  local code = _g170.code
  local keys = _g170.keys
  local function63 = _g170["function?"]
  local keys63 = _g170["keys?"]
  local none63 = _g170["none?"]
  local stash = _g170.stash
  local string = _g170.string
  local join = _g170.join
  local module_key = _g170["module-key"]
  local is63 = _g170["is?"]
  local table63 = _g170["table?"]
  local atom63 = _g170["atom?"]
  local string_literal63 = _g170["string-literal?"]
  local _37message_handler = _g170["%message-handler"]
  local unstash = _g170.unstash
  local add = _g170.add
  local reduce = _g170.reduce
  local _ = _g170["-"]
  local _47 = _g170["/"]
  local _42 = _g170["*"]
  local _43 = _g170["+"]
  local search = _g170.search
  local _37 = _g170["%"]
  local pair = _g170.pair
  local setenv = _g170.setenv
  local boolean63 = _g170["boolean?"]
  local module = _g170.module
  local list63 = _g170["list?"]
  local one63 = _g170["one?"]
  local make_id = _g170["make-id"]
  local some63 = _g170["some?"]
  local substring = _g170.substring
  local read_file = _g170["read-file"]
  local string63 = _g170["string?"]
  local keep = _g170.keep
  local now = _g170.now
  local today = _g170.today
  local replicate = _g170.replicate
  local number = _g170.number
  local space = _g170.space
  local inner = _g170.inner
  local _61 = _g170["="]
  local split = _g170.split
  local write_file = _g170["write-file"]
  local iterate = _g170.iterate
  local apply = _g170.apply
  local toplevel63 = _g170["toplevel?"]
  local cat = _g170.cat
  local composite63 = _g170["composite?"]
  local tl = _g170.tl
  local _60 = _g170["<"]
  local last = _g170.last
  local exit = _g170.exit
  local id_literal63 = _g170["id-literal?"]
  local _62 = _g170[">"]
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
            local _g951 = nil
            for _g951 in next, _g240 do
              local _g238 = _g240[_g951]
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
              local _g951 = nil
              for _g951 in next, _g248 do
                local _g246 = _g248[_g951]
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
  local reserved = {["finally"] = true, ["nil"] = true, ["this"] = true, ["*"] = true, ["else"] = true, ["not"] = true, ["<"] = true, ["typeof"] = true, ["true"] = true, ["=="] = true, ["and"] = true, ["instanceof"] = true, ["return"] = true, ["repeat"] = true, ["with"] = true, ["in"] = true, ["while"] = true, ["catch"] = true, ["/"] = true, ["break"] = true, ["-"] = true, ["+"] = true, ["or"] = true, ["for"] = true, ["default"] = true, [">"] = true, ["false"] = true, ["then"] = true, ["do"] = true, ["local"] = true, ["%"] = true, ["until"] = true, ["="] = true, [">="] = true, ["elseif"] = true, ["<="] = true, ["delete"] = true, ["debugger"] = true, ["continue"] = true, ["void"] = true, ["case"] = true, ["try"] = true, ["if"] = true, ["switch"] = true, ["throw"] = true, ["var"] = true, ["new"] = true, ["function"] = true, ["end"] = true}
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
    _g334.export = quote_frame(m.export)
    _g334.alias = quoted(m.alias)
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
  local number63 = _g348["number?"]
  local sub = _g348.sub
  local map = _g348.map
  local series = _g348.series
  local _6261 = _g348[">="]
  local _6061 = _g348["<="]
  local reverse = _g348.reverse
  local length = _g348.length
  local hd = _g348.hd
  local char = _g348.char
  local nil63 = _g348["nil?"]
  local in63 = _g348["in?"]
  local sort = _g348.sort
  local drop = _g348.drop
  local write = _g348.write
  local empty63 = _g348["empty?"]
  local find = _g348.find
  local code = _g348.code
  local keys = _g348.keys
  local function63 = _g348["function?"]
  local keys63 = _g348["keys?"]
  local none63 = _g348["none?"]
  local stash = _g348.stash
  local string = _g348.string
  local join = _g348.join
  local module_key = _g348["module-key"]
  local is63 = _g348["is?"]
  local table63 = _g348["table?"]
  local atom63 = _g348["atom?"]
  local string_literal63 = _g348["string-literal?"]
  local _37message_handler = _g348["%message-handler"]
  local unstash = _g348.unstash
  local add = _g348.add
  local reduce = _g348.reduce
  local _ = _g348["-"]
  local _47 = _g348["/"]
  local _42 = _g348["*"]
  local _43 = _g348["+"]
  local search = _g348.search
  local _37 = _g348["%"]
  local pair = _g348.pair
  local setenv = _g348.setenv
  local boolean63 = _g348["boolean?"]
  local module = _g348.module
  local list63 = _g348["list?"]
  local one63 = _g348["one?"]
  local make_id = _g348["make-id"]
  local some63 = _g348["some?"]
  local substring = _g348.substring
  local read_file = _g348["read-file"]
  local string63 = _g348["string?"]
  local keep = _g348.keep
  local now = _g348.now
  local today = _g348.today
  local replicate = _g348.replicate
  local number = _g348.number
  local space = _g348.space
  local inner = _g348.inner
  local _61 = _g348["="]
  local split = _g348.split
  local write_file = _g348["write-file"]
  local iterate = _g348.iterate
  local apply = _g348.apply
  local toplevel63 = _g348["toplevel?"]
  local cat = _g348.cat
  local composite63 = _g348["composite?"]
  local tl = _g348.tl
  local _60 = _g348["<"]
  local last = _g348.last
  local exit = _g348.exit
  local id_literal63 = _g348["id-literal?"]
  local _62 = _g348[">"]
  local delimiters = {[";"] = true, [")"] = true, ["\n"] = true, ["("] = true}
  nexus["lumen/reader"].delimiters = delimiters
  local whitespace = {["\t"] = true, [" "] = true, ["\n"] = true}
  nexus["lumen/reader"].whitespace = whitespace
  local function make_stream(str)
    return({string = str, len = length(str), pos = 0})
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
  local _g398 = nexus["lumen/runtime"]
  local number63 = _g398["number?"]
  local sub = _g398.sub
  local map = _g398.map
  local series = _g398.series
  local _6261 = _g398[">="]
  local _6061 = _g398["<="]
  local reverse = _g398.reverse
  local length = _g398.length
  local hd = _g398.hd
  local char = _g398.char
  local nil63 = _g398["nil?"]
  local in63 = _g398["in?"]
  local sort = _g398.sort
  local drop = _g398.drop
  local write = _g398.write
  local empty63 = _g398["empty?"]
  local find = _g398.find
  local code = _g398.code
  local keys = _g398.keys
  local function63 = _g398["function?"]
  local keys63 = _g398["keys?"]
  local none63 = _g398["none?"]
  local stash = _g398.stash
  local string = _g398.string
  local join = _g398.join
  local module_key = _g398["module-key"]
  local is63 = _g398["is?"]
  local table63 = _g398["table?"]
  local atom63 = _g398["atom?"]
  local string_literal63 = _g398["string-literal?"]
  local _37message_handler = _g398["%message-handler"]
  local unstash = _g398.unstash
  local add = _g398.add
  local reduce = _g398.reduce
  local _ = _g398["-"]
  local _47 = _g398["/"]
  local _42 = _g398["*"]
  local _43 = _g398["+"]
  local search = _g398.search
  local _37 = _g398["%"]
  local pair = _g398.pair
  local setenv = _g398.setenv
  local boolean63 = _g398["boolean?"]
  local module = _g398.module
  local list63 = _g398["list?"]
  local one63 = _g398["one?"]
  local make_id = _g398["make-id"]
  local some63 = _g398["some?"]
  local substring = _g398.substring
  local read_file = _g398["read-file"]
  local string63 = _g398["string?"]
  local keep = _g398.keep
  local now = _g398.now
  local today = _g398.today
  local replicate = _g398.replicate
  local number = _g398.number
  local space = _g398.space
  local inner = _g398.inner
  local _61 = _g398["="]
  local split = _g398.split
  local write_file = _g398["write-file"]
  local iterate = _g398.iterate
  local apply = _g398.apply
  local toplevel63 = _g398["toplevel?"]
  local cat = _g398.cat
  local composite63 = _g398["composite?"]
  local tl = _g398.tl
  local _60 = _g398["<"]
  local last = _g398.last
  local exit = _g398.exit
  local id_literal63 = _g398["id-literal?"]
  local _62 = _g398[">"]
  local _g401 = nexus["lumen/lib"]
  local macro63 = _g401["macro?"]
  local quasiexpand = _g401.quasiexpand
  local bind42 = _g401["bind*"]
  local quoted = _g401.quoted
  local id = _g401.id
  local macroexpand = _g401.macroexpand
  local variable63 = _g401["variable?"]
  local reserved63 = _g401["reserved?"]
  local index = _g401.index
  local key = _g401.key
  local getenv = _g401.getenv
  local macro_function = _g401["macro-function"]
  local bind = _g401.bind
  local indentation = _g401.indentation
  local bound63 = _g401["bound?"]
  local mapo = _g401.mapo
  local quote_modules = _g401["quote-modules"]
  local initial_environment = _g401["initial-environment"]
  local statement63 = _g401["statement?"]
  local quote_environment = _g401["quote-environment"]
  local link = _g401.link
  local special63 = _g401["special?"]
  local symbol63 = _g401["symbol?"]
  local imported = _g401.imported
  local valid_id63 = _g401["valid-id?"]
  local special_form63 = _g401["special-form?"]
  local stash42 = _g401["stash*"]
  local symbol_expansion = _g401["symbol-expansion"]
  local _g402 = nexus["lumen/reader"]
  local read_table = _g402["read-table"]
  local read_all = _g402["read-all"]
  local make_stream = _g402["make-stream"]
  local read_from_string = _g402["read-from-string"]
  local read = _g402.read
  local _g405 = {}
  local _g406 = {}
  _g406.lua = "not "
  _g406.js = "!"
  _g405["not"] = _g406
  local _g408 = {}
  _g408["%"] = true
  _g408["*"] = true
  _g408["/"] = true
  local _g410 = {}
  _g410["-"] = true
  _g410["+"] = true
  local _g412 = {}
  local _g413 = {}
  _g413.lua = ".."
  _g413.js = "+"
  _g412.cat = _g413
  local _g415 = {}
  _g415[">="] = true
  _g415[">"] = true
  _g415["<="] = true
  _g415["<"] = true
  local _g417 = {}
  local _g418 = {}
  _g418.lua = "~="
  _g418.js = "!="
  _g417["~="] = _g418
  local _g419 = {}
  _g419.lua = "=="
  _g419.js = "==="
  _g417["="] = _g419
  local _g421 = {}
  local _g422 = {}
  _g422.lua = "and"
  _g422.js = "&&"
  _g421["and"] = _g422
  local _g424 = {}
  local _g425 = {}
  _g425.lua = "or"
  _g425.js = "||"
  _g424["or"] = _g425
  local infix = {_g405, _g408, _g410, _g412, _g415, _g417, _g421, _g424}
  nexus["lumen/compiler"].infix = infix
  local function unary63(form)
    local op = form[1]
    local args = sub(form, 1)
    return(one63(args) and in63(op, {"not", "-"}))
  end
  nexus["lumen/compiler"]["unary?"] = unary63
  local function precedence(form)
    if list63(form) and not unary63(form) then
      local _g429 = infix
      local k = nil
      for k in next, _g429 do
        local v = _g429[k]
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
    local _g439 = getenv(x)
    local special = _g439.special
    local stmt = _g439.stmt
    local self_tr63 = _g439.tr
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
    local _g442 = unstash({...})
    local right = _g442.right
    local _g543
    if right then
      _g543 = _6261
    else
      _g543 = _62
    end
    if _g543(precedence(child), precedence(parent)) then
      return({"(", ")"})
    else
      return({"", ""})
    end
  end
  nexus["lumen/compiler"]["op-delims"] = op_delims
  local function compile_infix(form)
    local op = form[1]
    local _g447 = sub(form, 1)
    local a = _g447[1]
    local b = _g447[2]
    local _g448 = op_delims(form, a)
    local ao = _g448[1]
    local ac = _g448[2]
    local _g449 = op_delims(form, b, {_stash = true, right = true})
    local bo = _g449[1]
    local bc = _g449[2]
    local _g450 = compile(a)
    local _g451 = compile(b)
    local _g452 = getop(op)
    if unary63(form) then
      return(_g452 .. ao .. _g450 .. ac)
    else
      return(ao .. _g450 .. ac .. " " .. _g452 .. " " .. bo .. _g451 .. bc)
    end
  end
  nexus["lumen/compiler"]["compile-infix"] = compile_infix
  local function compile_function(args, body, ...)
    local _g453 = unstash({...})
    local prefix = _g453.prefix
    local name = _g453.name
    local _g544
    if name then
      _g544 = compile(name)
    else
      _g544 = ""
    end
    local id = _g544
    local _g455 = prefix or ""
    local _g456 = compile_args(args)
    indent_level = indent_level + 1
    local _g458 = compile(body, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local _g457 = _g458
    local ind = indentation()
    local _g545
    if target == "js" then
      _g545 = ""
    else
      _g545 = "end"
    end
    local tr = _g545
    if name then
      tr = tr .. "\n"
    end
    if target == "js" then
      return("function " .. id .. _g456 .. " {\n" .. _g457 .. ind .. "}" .. tr)
    else
      return(_g455 .. "function " .. id .. _g456 .. "\n" .. _g457 .. ind .. tr)
    end
  end
  nexus["lumen/compiler"]["compile-function"] = compile_function
  local function can_return63(form)
    return(is63(form) and (atom63(form) or not (hd(form) == "return") and not statement63(hd(form))))
  end
  nexus["lumen/compiler"]["can-return?"] = can_return63
  compile = function (form, ...)
    local _g460 = unstash({...})
    local stmt = _g460.stmt
    if nil63(form) then
      return("")
    else
      if special_form63(form) then
        return(compile_special(form, stmt))
      else
        local tr = terminator(stmt)
        local _g546
        if stmt then
          _g546 = indentation()
        else
          _g546 = ""
        end
        local ind = _g546
        local _g547
        if atom63(form) then
          _g547 = compile_atom(form)
        else
          local _g548
          if infix63(hd(form)) then
            _g548 = compile_infix(form)
          else
            _g548 = compile_call(form)
          end
          _g547 = _g548
        end
        local _g462 = _g547
        return(ind .. _g462 .. tr)
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
    local _g470 = args
    local k = nil
    for k in next, _g470 do
      local x = _g470[k]
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
    local _g474 = args[2]
    local _g475 = args[3]
    if stmt63 or tail63 then
      local _g550
      if _g475 then
        _g550 = {lower_body({_g475}, tail63)}
      end
      return(add(hoist, join({"%if", lower(cond, hoist), lower_body({_g474}, tail63)}, _g550)))
    else
      local e = make_id()
      add(hoist, {"%local", e})
      local _g549
      if _g475 then
        _g549 = {lower({"set", e, _g475})}
      end
      add(hoist, join({"%if", lower(cond, hoist), lower({"set", e, _g474})}, _g549))
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
      local _g551
      if x == "and" then
        _g551 = {"%if", id, b, id}
      else
        _g551 = {"%if", id, id, b}
      end
      return(lower({"do", {"%local", id, a}, _g551}, hoist))
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
    local _g500 = args[2]
    local body = sub(args, 2)
    return(add(hoist, {kind, name, _g500, lower_body(body, true)}))
  end
  nexus["lumen/compiler"]["lower-definition"] = lower_definition
  local function lower_call(form, hoist)
    local _g503 = map(function (x)
      return(lower(x, hoist))
    end, form)
    if some63(_g503) then
      return(_g503)
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
    local _g524 = unstash({...})
    local private = _g524.private
    local m = module(spec)
    local frame = last(environment)
    local _g526 = m.export
    local k = nil
    for k in next, _g526 do
      local v = _g526[k]
      if v.export or private then
        frame[k] = v
      end
    end
  end
  nexus["lumen/compiler"]["open-module"] = open_module
  local function load_module(spec, ...)
    local _g528 = unstash({...})
    local private = _g528.private
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
        local _g533 = import_modules(m.alias)
        local aliased = _g533[1]
        local bs = _g533[2]
        imports = join(imports, aliased)
        bindings = join(bindings, bs)
      else
        local _g534 = imported(spec)
        add(imports, spec)
        bindings = join(bindings, _g534)
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
  local _g552 = nexus["lumen/runtime"]
  local number63 = _g552["number?"]
  local sub = _g552.sub
  local map = _g552.map
  local series = _g552.series
  local _6261 = _g552[">="]
  local _6061 = _g552["<="]
  local reverse = _g552.reverse
  local length = _g552.length
  local hd = _g552.hd
  local char = _g552.char
  local nil63 = _g552["nil?"]
  local in63 = _g552["in?"]
  local sort = _g552.sort
  local drop = _g552.drop
  local write = _g552.write
  local empty63 = _g552["empty?"]
  local find = _g552.find
  local code = _g552.code
  local keys = _g552.keys
  local function63 = _g552["function?"]
  local keys63 = _g552["keys?"]
  local none63 = _g552["none?"]
  local stash = _g552.stash
  local string = _g552.string
  local join = _g552.join
  local module_key = _g552["module-key"]
  local is63 = _g552["is?"]
  local table63 = _g552["table?"]
  local atom63 = _g552["atom?"]
  local string_literal63 = _g552["string-literal?"]
  local _37message_handler = _g552["%message-handler"]
  local unstash = _g552.unstash
  local add = _g552.add
  local reduce = _g552.reduce
  local _ = _g552["-"]
  local _47 = _g552["/"]
  local _42 = _g552["*"]
  local _43 = _g552["+"]
  local search = _g552.search
  local _37 = _g552["%"]
  local pair = _g552.pair
  local setenv = _g552.setenv
  local boolean63 = _g552["boolean?"]
  local module = _g552.module
  local list63 = _g552["list?"]
  local one63 = _g552["one?"]
  local make_id = _g552["make-id"]
  local some63 = _g552["some?"]
  local substring = _g552.substring
  local read_file = _g552["read-file"]
  local string63 = _g552["string?"]
  local keep = _g552.keep
  local now = _g552.now
  local today = _g552.today
  local replicate = _g552.replicate
  local number = _g552.number
  local space = _g552.space
  local inner = _g552.inner
  local _61 = _g552["="]
  local split = _g552.split
  local write_file = _g552["write-file"]
  local iterate = _g552.iterate
  local apply = _g552.apply
  local toplevel63 = _g552["toplevel?"]
  local cat = _g552.cat
  local composite63 = _g552["composite?"]
  local tl = _g552.tl
  local _60 = _g552["<"]
  local last = _g552.last
  local exit = _g552.exit
  local id_literal63 = _g552["id-literal?"]
  local _62 = _g552[">"]
  local _g555 = nexus["lumen/lib"]
  local macro63 = _g555["macro?"]
  local quasiexpand = _g555.quasiexpand
  local bind42 = _g555["bind*"]
  local quoted = _g555.quoted
  local id = _g555.id
  local macroexpand = _g555.macroexpand
  local variable63 = _g555["variable?"]
  local reserved63 = _g555["reserved?"]
  local index = _g555.index
  local key = _g555.key
  local getenv = _g555.getenv
  local macro_function = _g555["macro-function"]
  local bind = _g555.bind
  local indentation = _g555.indentation
  local bound63 = _g555["bound?"]
  local mapo = _g555.mapo
  local quote_modules = _g555["quote-modules"]
  local initial_environment = _g555["initial-environment"]
  local statement63 = _g555["statement?"]
  local quote_environment = _g555["quote-environment"]
  local link = _g555.link
  local special63 = _g555["special?"]
  local symbol63 = _g555["symbol?"]
  local imported = _g555.imported
  local valid_id63 = _g555["valid-id?"]
  local special_form63 = _g555["special-form?"]
  local stash42 = _g555["stash*"]
  local symbol_expansion = _g555["symbol-expansion"]
  local _g556 = nexus["lumen/compiler"]
  local compile_function = _g556["compile-function"]
  local compile = _g556.compile
  local eval = _g556.eval
  local in_module = _g556["in-module"]
  local compile_module = _g556["compile-module"]
  local load_module = _g556["load-module"]
  local open_module = _g556["open-module"]
  local declare = _g556.declare
  local import_modules = _g556["import-modules"]
end)();
(function ()
  nexus["lumen/core"] = {}
  local _g953 = nexus["lumen/runtime"]
  local number63 = _g953["number?"]
  local sub = _g953.sub
  local map = _g953.map
  local series = _g953.series
  local _6261 = _g953[">="]
  local _6061 = _g953["<="]
  local reverse = _g953.reverse
  local length = _g953.length
  local hd = _g953.hd
  local char = _g953.char
  local nil63 = _g953["nil?"]
  local in63 = _g953["in?"]
  local sort = _g953.sort
  local drop = _g953.drop
  local write = _g953.write
  local empty63 = _g953["empty?"]
  local find = _g953.find
  local code = _g953.code
  local keys = _g953.keys
  local function63 = _g953["function?"]
  local keys63 = _g953["keys?"]
  local none63 = _g953["none?"]
  local stash = _g953.stash
  local string = _g953.string
  local join = _g953.join
  local module_key = _g953["module-key"]
  local is63 = _g953["is?"]
  local table63 = _g953["table?"]
  local atom63 = _g953["atom?"]
  local string_literal63 = _g953["string-literal?"]
  local _37message_handler = _g953["%message-handler"]
  local unstash = _g953.unstash
  local add = _g953.add
  local reduce = _g953.reduce
  local _ = _g953["-"]
  local _47 = _g953["/"]
  local _42 = _g953["*"]
  local _43 = _g953["+"]
  local search = _g953.search
  local _37 = _g953["%"]
  local pair = _g953.pair
  local setenv = _g953.setenv
  local boolean63 = _g953["boolean?"]
  local module = _g953.module
  local list63 = _g953["list?"]
  local one63 = _g953["one?"]
  local make_id = _g953["make-id"]
  local some63 = _g953["some?"]
  local substring = _g953.substring
  local read_file = _g953["read-file"]
  local string63 = _g953["string?"]
  local keep = _g953.keep
  local now = _g953.now
  local today = _g953.today
  local replicate = _g953.replicate
  local number = _g953.number
  local space = _g953.space
  local inner = _g953.inner
  local _61 = _g953["="]
  local split = _g953.split
  local write_file = _g953["write-file"]
  local iterate = _g953.iterate
  local apply = _g953.apply
  local toplevel63 = _g953["toplevel?"]
  local cat = _g953.cat
  local composite63 = _g953["composite?"]
  local tl = _g953.tl
  local _60 = _g953["<"]
  local last = _g953.last
  local exit = _g953.exit
  local id_literal63 = _g953["id-literal?"]
  local _62 = _g953[">"]
  local _g956 = nexus["lumen/lib"]
  local macro63 = _g956["macro?"]
  local quasiexpand = _g956.quasiexpand
  local bind42 = _g956["bind*"]
  local quoted = _g956.quoted
  local id = _g956.id
  local macroexpand = _g956.macroexpand
  local variable63 = _g956["variable?"]
  local reserved63 = _g956["reserved?"]
  local index = _g956.index
  local key = _g956.key
  local getenv = _g956.getenv
  local macro_function = _g956["macro-function"]
  local bind = _g956.bind
  local indentation = _g956.indentation
  local bound63 = _g956["bound?"]
  local mapo = _g956.mapo
  local quote_modules = _g956["quote-modules"]
  local initial_environment = _g956["initial-environment"]
  local statement63 = _g956["statement?"]
  local quote_environment = _g956["quote-environment"]
  local link = _g956.link
  local special63 = _g956["special?"]
  local symbol63 = _g956["symbol?"]
  local imported = _g956.imported
  local valid_id63 = _g956["valid-id?"]
  local special_form63 = _g956["special-form?"]
  local stash42 = _g956["stash*"]
  local symbol_expansion = _g956["symbol-expansion"]
  local _g957 = nexus["lumen/compiler"]
  local compile_function = _g957["compile-function"]
  local compile = _g957.compile
  local eval = _g957.eval
  local in_module = _g957["in-module"]
  local compile_module = _g957["compile-module"]
  local load_module = _g957["load-module"]
  local open_module = _g957["open-module"]
  local declare = _g957.declare
  local import_modules = _g957["import-modules"]
  target = "lua"
end)();
(function ()
  nexus["lumen/boot"] = {}
  local _g1826 = nexus["lumen/runtime"]
  local number63 = _g1826["number?"]
  local sub = _g1826.sub
  local map = _g1826.map
  local series = _g1826.series
  local _6261 = _g1826[">="]
  local _6061 = _g1826["<="]
  local reverse = _g1826.reverse
  local length = _g1826.length
  local hd = _g1826.hd
  local char = _g1826.char
  local nil63 = _g1826["nil?"]
  local in63 = _g1826["in?"]
  local sort = _g1826.sort
  local drop = _g1826.drop
  local write = _g1826.write
  local empty63 = _g1826["empty?"]
  local find = _g1826.find
  local code = _g1826.code
  local keys = _g1826.keys
  local function63 = _g1826["function?"]
  local keys63 = _g1826["keys?"]
  local none63 = _g1826["none?"]
  local stash = _g1826.stash
  local string = _g1826.string
  local join = _g1826.join
  local module_key = _g1826["module-key"]
  local is63 = _g1826["is?"]
  local table63 = _g1826["table?"]
  local atom63 = _g1826["atom?"]
  local string_literal63 = _g1826["string-literal?"]
  local _37message_handler = _g1826["%message-handler"]
  local unstash = _g1826.unstash
  local add = _g1826.add
  local reduce = _g1826.reduce
  local _ = _g1826["-"]
  local _47 = _g1826["/"]
  local _42 = _g1826["*"]
  local _43 = _g1826["+"]
  local search = _g1826.search
  local _37 = _g1826["%"]
  local pair = _g1826.pair
  local setenv = _g1826.setenv
  local boolean63 = _g1826["boolean?"]
  local module = _g1826.module
  local list63 = _g1826["list?"]
  local one63 = _g1826["one?"]
  local make_id = _g1826["make-id"]
  local some63 = _g1826["some?"]
  local substring = _g1826.substring
  local read_file = _g1826["read-file"]
  local string63 = _g1826["string?"]
  local keep = _g1826.keep
  local now = _g1826.now
  local today = _g1826.today
  local replicate = _g1826.replicate
  local number = _g1826.number
  local space = _g1826.space
  local inner = _g1826.inner
  local _61 = _g1826["="]
  local split = _g1826.split
  local write_file = _g1826["write-file"]
  local iterate = _g1826.iterate
  local apply = _g1826.apply
  local toplevel63 = _g1826["toplevel?"]
  local cat = _g1826.cat
  local composite63 = _g1826["composite?"]
  local tl = _g1826.tl
  local _60 = _g1826["<"]
  local last = _g1826.last
  local exit = _g1826.exit
  local id_literal63 = _g1826["id-literal?"]
  local _62 = _g1826[">"]
  local _g1829 = nexus["lumen/lib"]
  local macro63 = _g1829["macro?"]
  local quasiexpand = _g1829.quasiexpand
  local bind42 = _g1829["bind*"]
  local quoted = _g1829.quoted
  local id = _g1829.id
  local macroexpand = _g1829.macroexpand
  local variable63 = _g1829["variable?"]
  local reserved63 = _g1829["reserved?"]
  local index = _g1829.index
  local key = _g1829.key
  local getenv = _g1829.getenv
  local macro_function = _g1829["macro-function"]
  local bind = _g1829.bind
  local indentation = _g1829.indentation
  local bound63 = _g1829["bound?"]
  local mapo = _g1829.mapo
  local quote_modules = _g1829["quote-modules"]
  local initial_environment = _g1829["initial-environment"]
  local statement63 = _g1829["statement?"]
  local quote_environment = _g1829["quote-environment"]
  local link = _g1829.link
  local special63 = _g1829["special?"]
  local symbol63 = _g1829["symbol?"]
  local imported = _g1829.imported
  local valid_id63 = _g1829["valid-id?"]
  local special_form63 = _g1829["special-form?"]
  local stash42 = _g1829["stash*"]
  local symbol_expansion = _g1829["symbol-expansion"]
  local _g1830 = nexus["lumen/compiler"]
  local compile_function = _g1830["compile-function"]
  local compile = _g1830.compile
  local eval = _g1830.eval
  local in_module = _g1830["in-module"]
  local compile_module = _g1830["compile-module"]
  local load_module = _g1830["load-module"]
  local open_module = _g1830["open-module"]
  local declare = _g1830.declare
  local import_modules = _g1830["import-modules"]
  modules = {["lumen/boot"] = {export = {["%initial-environment"] = {macro = function ()
    return(quote_environment(initial_environment()))
  end}, ["%initial-modules"] = {macro = function ()
    return(quote_modules())
  end}, modules = {export = true, global = true}}, import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}, {"lumen", "lib"}, {"lumen", "compiler"}}}, ["lumen/special"] = {export = {["not"] = {}, ["%if"] = {special = function (cond, cons, alt)
    local _g1861 = compile(cond)
    indent_level = indent_level + 1
    local _g1863 = compile(cons, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local _g1862 = _g1863
    local _g2149
    if alt then
      indent_level = indent_level + 1
      local _g1865 = compile(alt, {_stash = true, stmt = true})
      indent_level = indent_level - 1
      _g2149 = _g1865
    end
    local _g1864 = _g2149
    local ind = indentation()
    local str = ""
    if target == "js" then
      str = str .. ind .. "if (" .. _g1861 .. ") {\n" .. _g1862 .. ind .. "}"
    else
      str = str .. ind .. "if " .. _g1861 .. " then\n" .. _g1862
    end
    if _g1864 and target == "js" then
      str = str .. " else {\n" .. _g1864 .. ind .. "}"
    else
      if _g1864 then
        str = str .. ind .. "else\n" .. _g1864
      end
    end
    if target == "lua" then
      return(str .. ind .. "end\n")
    else
      return(str .. "\n")
    end
  end, foo = true, export = true, stmt = true, tr = true}, ["do"] = {special = function (...)
    local forms = unstash({...})
    local str = ""
    series(function (x)
      str = str .. compile(x, {_stash = true, stmt = true})
    end, forms)
    return(str)
  end, foo = true, export = true, stmt = true, tr = true}, set = {export = true, special = function (lh, rh)
    local _g1869 = compile(lh)
    local _g2150
    if nil63(rh) then
      _g2150 = "nil"
    else
      _g2150 = rh
    end
    local _g1870 = compile(_g2150)
    return(indentation() .. _g1869 .. " = " .. _g1870)
  end, foo = true, stmt = true}, get = {export = true, special = function (t, k)
    local _g1872 = compile(t)
    local k1 = compile(k)
    if target == "lua" and char(_g1872, 0) == "{" then
      _g1872 = "(" .. _g1872 .. ")"
    end
    if string_literal63(k) and valid_id63(inner(k)) then
      return(_g1872 .. "." .. inner(k))
    else
      return(_g1872 .. "[" .. k1 .. "]")
    end
  end, foo = true}, ["%object"] = {export = true, special = function (...)
    local forms = unstash({...})
    local str = "{"
    local _g2151
    if target == "lua" then
      _g2151 = " = "
    else
      _g2151 = ": "
    end
    local sep = _g2151
    local comma = ""
    local _g1874 = pair(forms)
    local k = nil
    for k in next, _g1874 do
      local v = _g1874[k]
      if number63(k) then
        local _g1876 = v[1]
        local _g1877 = v[2]
        if not string63(_g1876) then
          error("Illegal key: " .. string(_g1876))
        end
        str = str .. comma .. key(_g1876) .. sep .. compile(_g1877)
        comma = ", "
      end
    end
    return(str .. "}")
  end, foo = true}, ["%local"] = {export = true, special = function (name, value)
    local id = compile(name)
    local value1 = compile(value)
    local _g2152
    if is63(value) then
      _g2152 = " = " .. value1
    else
      _g2152 = ""
    end
    local rh = _g2152
    local _g2153
    if target == "js" then
      _g2153 = "var "
    else
      _g2153 = "local "
    end
    local keyword = _g2153
    local ind = indentation()
    return(ind .. keyword .. id .. rh)
  end, foo = true, stmt = true}, ["break"] = {export = true, special = function ()
    return(indentation() .. "break")
  end, foo = true, stmt = true}, error = {export = true, special = function (x)
    local _g2154
    if target == "js" then
      _g2154 = "throw new " .. compile({"Error", x})
    else
      _g2154 = "error(" .. compile(x) .. ")"
    end
    local e = _g2154
    return(indentation() .. e)
  end, foo = true, stmt = true}, ["%array"] = {export = true, special = function (...)
    local forms = unstash({...})
    local _g2155
    if target == "lua" then
      _g2155 = "{"
    else
      _g2155 = "["
    end
    local open = _g2155
    local _g2156
    if target == "lua" then
      _g2156 = "}"
    else
      _g2156 = "]"
    end
    local close = _g2156
    local str = ""
    local comma = ""
    local _g1883 = forms
    local k = nil
    for k in next, _g1883 do
      local v = _g1883[k]
      if number63(k) then
        str = str .. comma .. compile(v)
        comma = ", "
      end
    end
    return(open .. str .. close)
  end, foo = true}, ["%local-function"] = {special = function (name, args, body)
    local x = compile_function(args, body, {_stash = true, prefix = "local ", name = name})
    return(indentation() .. x)
  end, foo = true, export = true, stmt = true, tr = true}, ["%global-function"] = {special = function (name, args, body)
    if target == "lua" then
      local x = compile_function(args, body, {_stash = true, name = name})
      return(indentation() .. x)
    else
      return(compile({"set", name, {"%function", args, body}}, {_stash = true, stmt = true}))
    end
  end, foo = true, export = true, stmt = true, tr = true}, ["%for"] = {special = function (t, k, form)
    local _g1890 = compile(t)
    local ind = indentation()
    indent_level = indent_level + 1
    local _g1891 = compile(form, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local body = _g1891
    if target == "lua" then
      return(ind .. "for " .. k .. " in next, " .. _g1890 .. " do\n" .. body .. ind .. "end\n")
    else
      return(ind .. "for (" .. k .. " in " .. _g1890 .. ") {\n" .. body .. ind .. "}\n")
    end
  end, foo = true, export = true, stmt = true, tr = true}, ["%function"] = {export = true, special = function (args, body)
    return(compile_function(args, body))
  end, foo = true}, ["%try"] = {special = function (form)
    local ind = indentation()
    indent_level = indent_level + 1
    local _g1894 = compile(form, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local body = _g1894
    local e = make_id()
    local hf = {"return", {"%array", false, {"get", e, "\"message\""}}}
    indent_level = indent_level + 1
    local _g1898 = compile(hf, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local h = _g1898
    return(ind .. "try {\n" .. body .. ind .. "}\n" .. ind .. "catch (" .. e .. ") {\n" .. h .. ind .. "}\n")
  end, foo = true, export = true, stmt = true, tr = true}, ["while"] = {special = function (cond, form)
    local _g1900 = compile(cond)
    indent_level = indent_level + 1
    local _g1901 = compile(form, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local body = _g1901
    local ind = indentation()
    if target == "js" then
      return(ind .. "while (" .. _g1900 .. ") {\n" .. body .. ind .. "}\n")
    else
      return(ind .. "while " .. _g1900 .. " do\n" .. body .. ind .. "end\n")
    end
  end, foo = true, export = true, stmt = true, tr = true}, ["return"] = {export = true, special = function (x)
    local _g2157
    if nil63(x) then
      _g2157 = "return"
    else
      _g2157 = "return(" .. compile(x) .. ")"
    end
    local _g1903 = _g2157
    return(indentation() .. _g1903)
  end, foo = true, stmt = true}}, import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}, {"lumen", "lib"}, {"lumen", "compiler"}}}, ["lumen/main"] = {export = {}, import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}, {"lumen", "reader"}, {"lumen", "compiler"}}}, ["lumen/reader"] = {export = {eof = {variable = true}, ["read-table"] = {export = true, variable = true}, ["read-all"] = {export = true, variable = true}, ["peek-char"] = {variable = true}, ["key?"] = {variable = true}, ["flag?"] = {variable = true}, ["make-stream"] = {export = true, variable = true}, ["read-char"] = {variable = true}, ["skip-non-code"] = {variable = true}, ["read-from-string"] = {export = true, variable = true}, delimiters = {variable = true}, read = {export = true, variable = true}, whitespace = {variable = true}, ["define-reader"] = {export = true, macro = function (_g1917, ...)
    local char = _g1917[1]
    local stream = _g1917[2]
    local _g1916 = unstash({...})
    local body = sub(_g1916, 0)
    return({"set", {"get", "read-table", char}, join({"fn", {stream}}, body)})
  end}}, import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}}}, ["lumen/core"] = {export = {define = {export = true, macro = function (name, x, ...)
    local _g1927 = unstash({...})
    local body = sub(_g1927, 0)
    setenv(name, {_stash = true, variable = true})
    if some63(body) and target == "js" then
      return(link(name, {"%local", name, join({"fn", x}, body)}))
    else
      if some63(body) then
        local _g1931 = bind42(x, body)
        local args = _g1931[1]
        local _g1932 = _g1931[2]
        return(link(name, join({"%local-function", name, args}, _g1932)))
      else
        return(link(name, {"%local", name, x}))
      end
    end
  end}, pr = {export = true, macro = function (...)
    local xs = unstash({...})
    return({"print", space(xs)})
  end}, ["with-bindings"] = {export = true, macro = function (_g1938, ...)
    local names = _g1938[1]
    local _g1937 = unstash({...})
    local body = sub(_g1937, 0)
    local x = make_id()
    local _g1943 = {"setenv", x}
    _g1943.variable = true
    local _g1940 = {"with-frame", {"all", {"_g951", x}, names, _g1943}}
    _g1940.scope = true
    return(join(_g1940, body))
  end}, ["join*"] = {export = true, macro = function (...)
    local xs = unstash({...})
    return(reduce(function (a, b)
      return({"join", a, b})
    end, xs))
  end}, ["join!"] = {export = true, macro = function (a, ...)
    local _g1947 = unstash({...})
    local bs = sub(_g1947, 0)
    return({"set", a, join({"join*", a}, bs)})
  end}, ["set*"] = {export = true, macro = function (name, value)
    return(link(name, {"set", name, value}))
  end}, unless = {export = true, macro = function (cond, ...)
    local _g1953 = unstash({...})
    local body = sub(_g1953, 0)
    return({"if", {"not", cond}, join({"do"}, body)})
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
    local function step(_g1970)
      local a = _g1970[1]
      local b = _g1970[2]
      local c = sub(_g1970, 2)
      if is63(b) then
        return({join({"%if", a, b}, step(c))})
      else
        if is63(a) then
          return({a})
        end
      end
    end
    return(hd(step(branches)))
  end}, ["define-symbol"] = {export = true, macro = function (name, expansion)
    setenv(name, {_stash = true, symbol = expansion})
    return(nil)
  end}, list = {export = true, macro = function (...)
    local body = unstash({...})
    local l = {}
    local forms = {}
    local id = make_id()
    local _g1976 = body
    local k = nil
    for k in next, _g1976 do
      local v = _g1976[k]
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
  end}, ["cat!"] = {export = true, macro = function (a, ...)
    local _g1986 = unstash({...})
    local bs = sub(_g1986, 0)
    return({"set", a, join({"cat", a}, bs)})
  end}, dec = {export = true, macro = function (n, by)
    return({"set", n, {"-", n, by or 1}})
  end}, quote = {export = true, macro = function (form)
    return(quoted(form))
  end}, when = {export = true, macro = function (cond, ...)
    local _g1994 = unstash({...})
    local body = sub(_g1994, 0)
    return({"if", cond, join({"do"}, body)})
  end}, target = {export = true, macro = function (...)
    local clauses = unstash({...})
    return(clauses[target])
  end, global = true}, language = {export = true, macro = function ()
    return({"quote", target})
  end}, ["set-of"] = {export = true, macro = function (...)
    local xs = unstash({...})
    local l = {}
    local _g2002 = xs
    local _g952 = nil
    for _g952 in next, _g2002 do
      local x = _g2002[_g952]
      l[x] = true
    end
    return(join({"table"}, l))
  end}, all = {export = true, macro = function (_g2006, t, ...)
    local k = _g2006[1]
    local v = _g2006[2]
    local _g2005 = unstash({...})
    local body = sub(_g2005, 0)
    local x = make_id()
    local n = make_id()
    local _g2158
    if target == "lua" then
      _g2158 = body
    else
      _g2158 = {join({"let", {n, {"parseInt", k}, k, {"if", {"isNaN", n}, k, n}}}, body)}
    end
    return({"let", {x, t, k, "nil"}, {"%for", x, k, join({"let", {v, {"get", x, k}}}, _g2158)}})
  end}, ["define-module"] = {export = true, macro = function (spec, ...)
    local _g2020 = unstash({...})
    local body = sub(_g2020, 0)
    local exp = body.export
    local imp = body.import
    local alias = body.alias
    local _g2022 = import_modules(imp)
    local imports = _g2022[1]
    local bindings = _g2022[2]
    local k = module_key(spec)
    modules[k] = {import = imports, export = {}, alias = alias}
    local _g2023 = exp or {}
    local _g950 = nil
    for _g950 in next, _g2023 do
      local x = _g2023[_g950]
      setenv(x, {_stash = true, export = true})
    end
    return(join({"do", {"set", {"get", "nexus", {"quote", k}}, {"table"}}}, bindings))
  end}, ["define*"] = {export = true, macro = function (name, x, ...)
    local _g2030 = unstash({...})
    local body = sub(_g2030, 0)
    setenv(name, {_stash = true, export = true, global = true})
    if some63(body) then
      local _g2032 = bind42(x, body)
      local args = _g2032[1]
      local _g2033 = _g2032[2]
      return(join({"%global-function", name, args}, _g2033))
    else
      if target == "js" then
        return({"set", {"get", "global", {"quote", id(name)}}, x})
      else
        return({"set", name, x})
      end
    end
  end}, fn = {export = true, macro = function (args, ...)
    local _g2039 = unstash({...})
    local body = sub(_g2039, 0)
    local _g2041 = bind42(args, body)
    local _g2042 = _g2041[1]
    local _g2043 = _g2041[2]
    return(join({"%function", _g2042}, _g2043))
  end}, quasiquote = {export = true, macro = function (form)
    return(quasiexpand(form, 1))
  end}, ["with-frame"] = {export = true, macro = function (...)
    local _g2046 = unstash({...})
    local scope = _g2046.scope
    local body = sub(_g2046, 0)
    local x = make_id()
    local _g2050 = {"table"}
    _g2050._scope = scope
    return({"do", {"add", "environment", _g2050}, {"let", {x, join({"do"}, body)}, {"drop", "environment"}, x}})
  end}, ["define-special"] = {export = true, macro = function (name, args, ...)
    local _g2055 = unstash({...})
    local body = sub(_g2055, 0)
    local form = join({"fn", args}, body)
    local keys = sub(body, length(body))
    local _g2058 = {"setenv", {"quote", name}}
    _g2058.form = {"quote", form}
    _g2058.special = form
    eval(join(_g2058, keys))
    return(nil)
  end}, ["let-macro"] = {export = true, macro = function (definitions, ...)
    local _g2061 = unstash({...})
    local body = sub(_g2061, 0)
    add(environment, {})
    map(function (m)
      return(macroexpand(join({"define-macro"}, m)))
    end, definitions)
    local _g2063 = join({"do"}, macroexpand(body))
    drop(environment)
    return(_g2063)
  end}, let = {export = true, macro = function (bindings, ...)
    local _g2067 = unstash({...})
    local body = sub(_g2067, 0)
    if length(bindings) < 2 then
      return(join({"do"}, body))
    else
      local renames = {}
      local locals = {}
      local lh = bindings[1]
      local rh = bindings[2]
      local _g2070 = bind(lh, rh)
      local k = nil
      for k in next, _g2070 do
        local _g2072 = _g2070[k]
        local id = _g2072[1]
        local val = _g2072[2]
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
  end}, ["define-macro"] = {export = true, macro = function (name, args, ...)
    local _g2078 = unstash({...})
    local body = sub(_g2078, 0)
    local form = join({"fn", args}, body)
    local _g2081 = {"setenv", {"quote", name}}
    _g2081.form = {"quote", form}
    _g2081.macro = form
    eval(_g2081)
    return(nil)
  end}, ["let-symbol"] = {export = true, macro = function (expansions, ...)
    local _g2084 = unstash({...})
    local body = sub(_g2084, 0)
    add(environment, {})
    map(function (_g2088)
      local name = _g2088[1]
      local exp = _g2088[2]
      return(macroexpand({"define-symbol", name, exp}))
    end, pair(expansions))
    local _g2086 = join({"do"}, macroexpand(body))
    drop(environment)
    return(_g2086)
  end}, at = {export = true, macro = function (l, i)
    if target == "lua" and number63(i) then
      i = i + 1
    else
      if target == "lua" then
        i = {"+", i, 1}
      end
    end
    return({"get", l, i})
  end}, inc = {export = true, macro = function (n, by)
    return({"set", n, {"+", n, by or 1}})
  end}, table = {export = true, macro = function (...)
    local body = unstash({...})
    return(join({"%object"}, mapo(function (x)
      return(x)
    end, body)))
  end}}, import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}, {"lumen", "lib"}, {"lumen", "compiler"}}}, lumen = {export = {}, import = {{"lumen", "special"}}, alias = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}}}, ["lumen/runtime"] = {export = {["number?"] = {export = true, variable = true}, sub = {export = true, variable = true}, map = {export = true, variable = true}, series = {export = true, variable = true}, [">="] = {export = true, variable = true}, ["<="] = {export = true, variable = true}, reverse = {export = true, variable = true}, length = {export = true, variable = true}, hd = {export = true, variable = true}, shift = {variable = true}, char = {export = true, variable = true}, ["nil?"] = {export = true, variable = true}, ["in?"] = {export = true, variable = true}, sort = {export = true, variable = true}, drop = {export = true, variable = true}, write = {export = true, variable = true}, ["empty?"] = {export = true, variable = true}, find = {export = true, variable = true}, code = {export = true, variable = true}, keys = {export = true, variable = true}, ["function?"] = {export = true, variable = true}, ["keys?"] = {export = true, variable = true}, ["none?"] = {export = true, variable = true}, stash = {export = true, variable = true}, string = {export = true, variable = true}, join = {export = true, variable = true}, ["module-key"] = {export = true, variable = true}, ["is?"] = {export = true, variable = true}, ["table?"] = {export = true, variable = true}, ["atom?"] = {export = true, variable = true}, ["id-count"] = {variable = true}, ["string-literal?"] = {export = true, variable = true}, ["%message-handler"] = {export = true, variable = true}, unstash = {export = true, variable = true}, add = {export = true, variable = true}, reduce = {export = true, variable = true}, ["-"] = {export = true, variable = true}, ["/"] = {export = true, variable = true}, ["*"] = {export = true, variable = true}, ["+"] = {export = true, variable = true}, search = {export = true, variable = true}, ["%"] = {export = true, variable = true}, pair = {export = true, variable = true}, setenv = {export = true, variable = true}, ["boolean?"] = {export = true, variable = true}, module = {export = true, variable = true}, ["list?"] = {export = true, variable = true}, ["one?"] = {export = true, variable = true}, ["make-id"] = {export = true, variable = true}, ["some?"] = {export = true, variable = true}, substring = {export = true, variable = true}, ["read-file"] = {export = true, variable = true}, ["string?"] = {export = true, variable = true}, keep = {export = true, variable = true}, now = {export = true, variable = true}, today = {export = true, variable = true}, replicate = {export = true, variable = true}, number = {export = true, variable = true}, space = {export = true, variable = true}, inner = {export = true, variable = true}, ["="] = {export = true, variable = true}, split = {export = true, variable = true}, ["write-file"] = {export = true, variable = true}, iterate = {export = true, variable = true}, apply = {export = true, variable = true}, ["toplevel?"] = {export = true, variable = true}, cat = {export = true, variable = true}, ["composite?"] = {export = true, variable = true}, tl = {export = true, variable = true}, ["<"] = {export = true, variable = true}, last = {export = true, variable = true}, exit = {export = true, variable = true}, ["id-literal?"] = {export = true, variable = true}, [">"] = {export = true, variable = true}}, import = {{"lumen", "special"}, {"lumen", "core"}}}, ["lumen/lib"] = {export = {["with-indent"] = {export = true, macro = function (form)
    local result = make_id()
    return({"do", {"inc", "indent-level"}, {"let", {result, form}, {"dec", "indent-level"}, result}})
  end}, ["macro?"] = {export = true, variable = true}, literal = {variable = true}, quasiexpand = {export = true, variable = true}, exclude = {variable = true}, bias = {variable = true}, ["bind*"] = {export = true, variable = true}, quoted = {export = true, variable = true}, id = {export = true, variable = true}, macroexpand = {export = true, variable = true}, ["variable?"] = {export = true, variable = true}, ["reserved?"] = {export = true, variable = true}, ["valid-code?"] = {variable = true}, index = {export = true, variable = true}, ["global?"] = {variable = true}, key = {export = true, variable = true}, ["quote-module"] = {variable = true}, reserved = {variable = true}, ["quote-binding"] = {variable = true}, getenv = {export = true, variable = true}, extend = {variable = true}, ["quasiquote-list"] = {variable = true}, ["numeric?"] = {variable = true}, ["macro-function"] = {export = true, variable = true}, ["quoting?"] = {variable = true}, ["quasisplice?"] = {variable = true}, ["can-unquote?"] = {variable = true}, ["quasiquoting?"] = {variable = true}, bind = {export = true, variable = true}, indentation = {export = true, variable = true}, ["bound?"] = {export = true, variable = true}, mapo = {export = true, variable = true}, ["quote-modules"] = {export = true, variable = true}, escape = {variable = true}, ["indent-level"] = {export = true, global = true}, ["initial-environment"] = {export = true, variable = true}, ["statement?"] = {export = true, variable = true}, ["quote-environment"] = {export = true, variable = true}, ["quote-frame"] = {variable = true}, link = {export = true, variable = true}, ["special?"] = {export = true, variable = true}, ["symbol?"] = {export = true, variable = true}, imported = {export = true, variable = true}, ["valid-id?"] = {export = true, variable = true}, ["special-form?"] = {export = true, variable = true}, ["stash*"] = {export = true, variable = true}, ["symbol-expansion"] = {export = true, variable = true}}, import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}}}, ["lumen/compiler"] = {export = {getop = {variable = true}, process = {variable = true}, ["compile-function"] = {export = true, variable = true}, ["parenthesize-call?"] = {variable = true}, ["lower-if"] = {variable = true}, compile = {export = true, variable = true}, ["lower-short"] = {variable = true}, ["lower-function"] = {variable = true}, infix = {variable = true}, ["lower-infix?"] = {variable = true}, eval = {export = true, variable = true}, lower = {variable = true}, ["compile-call"] = {variable = true}, ["in-module"] = {export = true, variable = true}, ["module-path"] = {variable = true}, ["lower-for"] = {variable = true}, ["compile-special"] = {variable = true}, ["lower-special"] = {variable = true}, precedence = {variable = true}, ["can-return?"] = {variable = true}, ["compile-module"] = {export = true, variable = true}, ["%result"] = {export = true, global = true}, reimported = {variable = true}, ["%compile-module"] = {variable = true}, ["current-module"] = {export = true, global = true}, ["load-module"] = {export = true, variable = true}, ["infix?"] = {variable = true}, conclude = {variable = true}, ["compiler-output"] = {variable = true}, ["compiling?"] = {variable = true}, ["lower-statement"] = {variable = true}, ["compile-args"] = {variable = true}, run = {variable = true}, ["unary?"] = {variable = true}, ["compile-file"] = {variable = true}, ["lower-do"] = {variable = true}, ["op-delims"] = {variable = true}, ["lower-try"] = {variable = true}, encapsulate = {variable = true}, ["lower-infix"] = {variable = true}, ["lower-body"] = {variable = true}, ["lower-call"] = {variable = true}, terminator = {variable = true}, ["lower-while"] = {variable = true}, ["open-module"] = {export = true, variable = true}, ["lower-definition"] = {variable = true}, ["compile-atom"] = {variable = true}, declare = {export = true, variable = true}, ["compile-infix"] = {variable = true}, ["import-modules"] = {export = true, variable = true}}, import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}, {"lumen", "lib"}, {"lumen", "reader"}}}, ["lumen/system"] = {export = {nexus = {export = true, global = true}}, import = {{"lumen", "special"}, {"lumen", "core"}}}, user = {export = {}, import = {"lumen", {"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}}}}
  environment = {{["define-module"] = {export = true, macro = function (spec, ...)
    local _g2139 = unstash({...})
    local body = sub(_g2139, 0)
    local exp = body.export
    local imp = body.import
    local alias = body.alias
    local _g2141 = import_modules(imp)
    local imports = _g2141[1]
    local bindings = _g2141[2]
    local k = module_key(spec)
    modules[k] = {import = imports, export = {}, alias = alias}
    local _g2142 = exp or {}
    local _g950 = nil
    for _g950 in next, _g2142 do
      local x = _g2142[_g950]
      setenv(x, {_stash = true, export = true})
    end
    return(join({"do", {"set", {"get", "nexus", {"quote", k}}, {"table"}}}, bindings))
  end}}}
end)();
(function ()
  nexus.user = {}
  local _g2159 = nexus["lumen/runtime"]
  local number63 = _g2159["number?"]
  local sub = _g2159.sub
  local map = _g2159.map
  local series = _g2159.series
  local _6261 = _g2159[">="]
  local _6061 = _g2159["<="]
  local reverse = _g2159.reverse
  local length = _g2159.length
  local hd = _g2159.hd
  local char = _g2159.char
  local nil63 = _g2159["nil?"]
  local in63 = _g2159["in?"]
  local sort = _g2159.sort
  local drop = _g2159.drop
  local write = _g2159.write
  local empty63 = _g2159["empty?"]
  local find = _g2159.find
  local code = _g2159.code
  local keys = _g2159.keys
  local function63 = _g2159["function?"]
  local keys63 = _g2159["keys?"]
  local none63 = _g2159["none?"]
  local stash = _g2159.stash
  local string = _g2159.string
  local join = _g2159.join
  local module_key = _g2159["module-key"]
  local is63 = _g2159["is?"]
  local table63 = _g2159["table?"]
  local atom63 = _g2159["atom?"]
  local string_literal63 = _g2159["string-literal?"]
  local _37message_handler = _g2159["%message-handler"]
  local unstash = _g2159.unstash
  local add = _g2159.add
  local reduce = _g2159.reduce
  local _ = _g2159["-"]
  local _47 = _g2159["/"]
  local _42 = _g2159["*"]
  local _43 = _g2159["+"]
  local search = _g2159.search
  local _37 = _g2159["%"]
  local pair = _g2159.pair
  local setenv = _g2159.setenv
  local boolean63 = _g2159["boolean?"]
  local module = _g2159.module
  local list63 = _g2159["list?"]
  local one63 = _g2159["one?"]
  local make_id = _g2159["make-id"]
  local some63 = _g2159["some?"]
  local substring = _g2159.substring
  local read_file = _g2159["read-file"]
  local string63 = _g2159["string?"]
  local keep = _g2159.keep
  local now = _g2159.now
  local today = _g2159.today
  local replicate = _g2159.replicate
  local number = _g2159.number
  local space = _g2159.space
  local inner = _g2159.inner
  local _61 = _g2159["="]
  local split = _g2159.split
  local write_file = _g2159["write-file"]
  local iterate = _g2159.iterate
  local apply = _g2159.apply
  local toplevel63 = _g2159["toplevel?"]
  local cat = _g2159.cat
  local composite63 = _g2159["composite?"]
  local tl = _g2159.tl
  local _60 = _g2159["<"]
  local last = _g2159.last
  local exit = _g2159.exit
  local id_literal63 = _g2159["id-literal?"]
  local _62 = _g2159[">"]
end)();
(function ()
  nexus["lumen/main"] = {}
  local _g2 = nexus["lumen/runtime"]
  local number63 = _g2["number?"]
  local sub = _g2.sub
  local replicate = _g2.replicate
  local series = _g2.series
  local string63 = _g2["string?"]
  local inner = _g2.inner
  local reverse = _g2.reverse
  local length = _g2.length
  local hd = _g2.hd
  local char = _g2.char
  local nil63 = _g2["nil?"]
  local in63 = _g2["in?"]
  local sort = _g2.sort
  local drop = _g2.drop
  local write = _g2.write
  local last = _g2.last
  local find = _g2.find
  local code = _g2.code
  local keys = _g2.keys
  local function63 = _g2["function?"]
  local keys63 = _g2["keys?"]
  local none63 = _g2["none?"]
  local stash = _g2.stash
  local string = _g2.string
  local join = _g2.join
  local module_key = _g2["module-key"]
  local is63 = _g2["is?"]
  local table63 = _g2["table?"]
  local atom63 = _g2["atom?"]
  local string_literal63 = _g2["string-literal?"]
  local _37message_handler = _g2["%message-handler"]
  local unstash = _g2.unstash
  local add = _g2.add
  local reduce = _g2.reduce
  local _ = _g2["-"]
  local _47 = _g2["/"]
  local _42 = _g2["*"]
  local _43 = _g2["+"]
  local search = _g2.search
  local _37 = _g2["%"]
  local pair = _g2.pair
  local setenv = _g2.setenv
  local boolean63 = _g2["boolean?"]
  local module = _g2.module
  local _62 = _g2[">"]
  local one63 = _g2["one?"]
  local make_id = _g2["make-id"]
  local some63 = _g2["some?"]
  local substring = _g2.substring
  local _60 = _g2["<"]
  local read_file = _g2["read-file"]
  local write_file = _g2["write-file"]
  local now = _g2.now
  local today = _g2.today
  local keep = _g2.keep
  local number = _g2.number
  local space = _g2.space
  local _6061 = _g2["<="]
  local _6261 = _g2[">="]
  local split = _g2.split
  local _61 = _g2["="]
  local iterate = _g2.iterate
  local apply = _g2.apply
  local toplevel63 = _g2["toplevel?"]
  local cat = _g2.cat
  local composite63 = _g2["composite?"]
  local tl = _g2.tl
  local empty63 = _g2["empty?"]
  local map = _g2.map
  local exit = _g2.exit
  local id_literal63 = _g2["id-literal?"]
  local list63 = _g2["list?"]
  local _g5 = nexus["lumen/reader"]
  local read_table = _g5["read-table"]
  local make_stream = _g5["make-stream"]
  local read_from_string = _g5["read-from-string"]
  local read = _g5.read
  local read_all = _g5["read-all"]
  local _g6 = nexus["lumen/compiler"]
  local compile_function = _g6["compile-function"]
  local compile = _g6.compile
  local eval = _g6.eval
  local in_module = _g6["in-module"]
  local compile_module = _g6["compile-module"]
  local load_module = _g6["load-module"]
  local open_module = _g6["open-module"]
  local declare = _g6.declare
  local import_modules = _g6["import-modules"]
  local function rep(str)
    local _g2164,_g2165 = xpcall(function ()
      return(eval(read_from_string(str)))
    end, _37message_handler)
    local _g2163 = {_g2164, _g2165}
    local _g1 = _g2163[1]
    local x = _g2163[2]
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
