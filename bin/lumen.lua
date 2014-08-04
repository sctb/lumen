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
      local _g164
      if nil63(from) or from < 0 then
        _g164 = 0
      else
        _g164 = from
      end
      local i = _g164
      local n = length(x)
      local _g165
      if nil63(upto) or upto > n then
        _g165 = n
      else
        _g165 = upto
      end
      local _g57 = _g165
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
    local _g166
    if n then
      _g166 = n + 1
    end
    return(string.byte(str, _g166))
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
      local _g75 = a
      local k = nil
      for k in next, _g75 do
        local v = _g75[k]
        c[k] = v
      end
      local _g77 = b
      local k = nil
      for k in next, _g77 do
        local v = _g77[k]
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
    local _g82 = x
    local k = nil
    for k in next, _g82 do
      local v = _g82[k]
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
    local _g85 = t
    local _g32 = nil
    for _g32 in next, _g85 do
      local y = _g85[_g32]
      if x == y then
        return(true)
      end
    end
  end
  nexus["lumen/runtime"]["in?"] = in63
  local function find(f, t)
    local _g88 = t
    local _g33 = nil
    for _g33 in next, _g88 do
      local x = _g88[_g33]
      local _g90 = f(x)
      if _g90 then
        return(_g90)
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
    local _g100 = x
    local k = nil
    for k in next, _g100 do
      local v = _g100[k]
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
    local _g103 = t
    local k = nil
    for k in next, _g103 do
      local _g34 = _g103[k]
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
    local _g106 = t
    local _g35 = nil
    for _g35 in next, _g106 do
      local _g36 = _g106[_g35]
      b = false
      break
    end
    return(b)
  end
  nexus["lumen/runtime"]["empty?"] = empty63
  local function stash(args)
    if keys63(args) then
      local p = {}
      local _g109 = args
      local k = nil
      for k in next, _g109 do
        local v = _g109[k]
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
        local _g112 = l
        local k = nil
        for k in next, _g112 do
          local v = _g112[k]
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
    local _g167
    if start then
      _g167 = start + 1
    end
    local _g115 = _g167
    local i = string.find(str, pattern, _g115, true)
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
            local _g142 = x
            local k = nil
            for k in next, _g142 do
              local v = _g142[k]
              if number63(k) then
                xs[k] = string(v)
              else
                add(ks, k .. ":")
                add(ks, string(v))
              end
            end
            local _g144 = join(xs, ks)
            local _g37 = nil
            for _g37 in next, _g144 do
              local v = _g144[_g37]
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
    local _g152 = stash(args)
    return(f(unpack(_g152)))
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
    local _g159 = unstash({...})
    local keys = sub(_g159, 0)
    if string63(k) then
      local frame = last(environment)
      local x = frame[k] or {}
      local _g161 = keys
      local _g163 = nil
      for _g163 in next, _g161 do
        local v = _g161[_g163]
        x[_g163] = v
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
  local _g171 = nexus["lumen/runtime"]
  local nil63 = _g171["nil?"]
  local is63 = _g171["is?"]
  local length = _g171.length
  local none63 = _g171["none?"]
  local some63 = _g171["some?"]
  local one63 = _g171["one?"]
  local hd = _g171.hd
  local string63 = _g171["string?"]
  local number63 = _g171["number?"]
  local boolean63 = _g171["boolean?"]
  local function63 = _g171["function?"]
  local composite63 = _g171["composite?"]
  local atom63 = _g171["atom?"]
  local table63 = _g171["table?"]
  local list63 = _g171["list?"]
  local substring = _g171.substring
  local sub = _g171.sub
  local keys = _g171.keys
  local inner = _g171.inner
  local tl = _g171.tl
  local char = _g171.char
  local code = _g171.code
  local string_literal63 = _g171["string-literal?"]
  local id_literal63 = _g171["id-literal?"]
  local add = _g171.add
  local drop = _g171.drop
  local last = _g171.last
  local butlast = _g171.butlast
  local reverse = _g171.reverse
  local join = _g171.join
  local reduce = _g171.reduce
  local keep = _g171.keep
  local in63 = _g171["in?"]
  local find = _g171.find
  local pair = _g171.pair
  local sort = _g171.sort
  local iterate = _g171.iterate
  local replicate = _g171.replicate
  local series = _g171.series
  local map = _g171.map
  local keys63 = _g171["keys?"]
  local empty63 = _g171["empty?"]
  local stash = _g171.stash
  local unstash = _g171.unstash
  local search = _g171.search
  local split = _g171.split
  local cat = _g171.cat
  local _43 = _g171["+"]
  local _ = _g171["-"]
  local _42 = _g171["*"]
  local _47 = _g171["/"]
  local _37 = _g171["%"]
  local _62 = _g171[">"]
  local _60 = _g171["<"]
  local _61 = _g171["="]
  local _6261 = _g171[">="]
  local _6061 = _g171["<="]
  local read_file = _g171["read-file"]
  local write_file = _g171["write-file"]
  local write = _g171.write
  local exit = _g171.exit
  local today = _g171.today
  local now = _g171.now
  local number = _g171.number
  local string = _g171.string
  local space = _g171.space
  local apply = _g171.apply
  local make_id = _g171["make-id"]
  local _37message_handler = _g171["%message-handler"]
  local toplevel63 = _g171["toplevel?"]
  local module_key = _g171["module-key"]
  local module = _g171.module
  local setenv = _g171.setenv
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
      local _g340
      if c == "\n" then
        _g340 = "\\n"
      else
        local _g341
        if c == "\"" then
          _g341 = "\\\""
        else
          local _g342
          if c == "\\" then
            _g342 = "\\\\"
          else
            _g342 = c
          end
          _g341 = _g342
        end
        _g340 = _g341
      end
      local c1 = _g340
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
      local _g193 = args
      local k = nil
      for k in next, _g193 do
        local v = _g193[k]
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
        local _g203 = lh
        local k = nil
        for k in next, _g203 do
          local v = _g203[k]
          local _g343
          if k == "&" then
            _g343 = {"sub", rh, length(lh)}
          else
            _g343 = {"get", rh, {"quote", bias(k)}}
          end
          local x = _g343
          local _g344
          if v == true then
            _g344 = k
          else
            _g344 = v
          end
          local _g208 = _g344
          bs = join(bs, bind(_g208, x))
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
      local _g225 = args
      local k = nil
      for k in next, _g225 do
        local v = _g225[k]
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
          local _g168 = form[1]
          local name = form[2]
          local value = form[3]
          return({"%local", name, macroexpand(value)})
        else
          if x == "%function" then
            local _g169 = form[1]
            local args = form[2]
            local body = sub(form, 2)
            add(environment, {_scope = true})
            local _g241 = args
            local _g991 = nil
            for _g991 in next, _g241 do
              local _g239 = _g241[_g991]
              setenv(_g239, {_stash = true, variable = true})
            end
            local _g240 = join({"%function", args}, macroexpand(body))
            drop(environment)
            return(_g240)
          else
            if x == "%local-function" or x == "%global-function" then
              local _g170 = form[1]
              local _g244 = form[2]
              local _g245 = form[3]
              local _g246 = sub(form, 3)
              add(environment, {_scope = true})
              local _g249 = _g245
              local _g991 = nil
              for _g991 in next, _g249 do
                local _g247 = _g249[_g991]
                setenv(_g247, {_stash = true, variable = true})
              end
              local _g248 = join({x, _g244, _g245}, macroexpand(_g246))
              drop(environment)
              return(_g248)
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
    local _g255 = form
    local k = nil
    for k in next, _g255 do
      local v = _g255[k]
      if not number63(k) then
        local _g345
        if quasisplice63(v, depth) then
          _g345 = quasiexpand(v[2])
        else
          _g345 = quasiexpand(v, depth)
        end
        local _g257 = _g345
        last(xs)[k] = _g257
      end
    end
    series(function (x)
      if quasisplice63(x, depth) then
        local _g259 = quasiexpand(x[2])
        add(xs, _g259)
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
      local _g346
      if c == "-" then
        _g346 = "_"
      else
        local _g347
        if valid_code63(n) then
          _g347 = c
        else
          local _g348
          if i == 0 then
            _g348 = "_" .. n
          else
            _g348 = n
          end
          _g347 = _g348
        end
        _g346 = _g347
      end
      local c1 = _g346
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
    local _g298 = unstash({...})
    local private = _g298.private
    local m = make_id()
    local k = module_key(spec)
    local imports = {}
    if nexus[k] then
      local _g300 = module(spec).export
      local _g302 = nil
      for _g302 in next, _g300 do
        local v = _g300[_g302]
        if v.variable and (private or v.export) then
          add(imports, {"%local", _g302, {"get", m, {"quote", _g302}}})
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
    local _g317 = unstash({...})
    local xs = sub(_g317, 0)
    return(join(t, xs))
  end
  nexus["lumen/lib"].extend = extend
  local function exclude(t, ...)
    local _g319 = unstash({...})
    local keys = sub(_g319, 0)
    local t1 = {}
    local _g321 = t
    local k = nil
    for k in next, _g321 do
      local v = _g321[k]
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
    local _g326 = t
    local k = nil
    for k in next, _g326 do
      local v = _g326[k]
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
    local _g335 = {"table"}
    _g335.import = quoted(m.import)
    _g335.alias = quoted(m.alias)
    _g335.export = quote_frame(m.export)
    return(_g335)
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
  local _g349 = nexus["lumen/runtime"]
  local nil63 = _g349["nil?"]
  local is63 = _g349["is?"]
  local length = _g349.length
  local none63 = _g349["none?"]
  local some63 = _g349["some?"]
  local one63 = _g349["one?"]
  local hd = _g349.hd
  local string63 = _g349["string?"]
  local number63 = _g349["number?"]
  local boolean63 = _g349["boolean?"]
  local function63 = _g349["function?"]
  local composite63 = _g349["composite?"]
  local atom63 = _g349["atom?"]
  local table63 = _g349["table?"]
  local list63 = _g349["list?"]
  local substring = _g349.substring
  local sub = _g349.sub
  local keys = _g349.keys
  local inner = _g349.inner
  local tl = _g349.tl
  local char = _g349.char
  local code = _g349.code
  local string_literal63 = _g349["string-literal?"]
  local id_literal63 = _g349["id-literal?"]
  local add = _g349.add
  local drop = _g349.drop
  local last = _g349.last
  local butlast = _g349.butlast
  local reverse = _g349.reverse
  local join = _g349.join
  local reduce = _g349.reduce
  local keep = _g349.keep
  local in63 = _g349["in?"]
  local find = _g349.find
  local pair = _g349.pair
  local sort = _g349.sort
  local iterate = _g349.iterate
  local replicate = _g349.replicate
  local series = _g349.series
  local map = _g349.map
  local keys63 = _g349["keys?"]
  local empty63 = _g349["empty?"]
  local stash = _g349.stash
  local unstash = _g349.unstash
  local search = _g349.search
  local split = _g349.split
  local cat = _g349.cat
  local _43 = _g349["+"]
  local _ = _g349["-"]
  local _42 = _g349["*"]
  local _47 = _g349["/"]
  local _37 = _g349["%"]
  local _62 = _g349[">"]
  local _60 = _g349["<"]
  local _61 = _g349["="]
  local _6261 = _g349[">="]
  local _6061 = _g349["<="]
  local read_file = _g349["read-file"]
  local write_file = _g349["write-file"]
  local write = _g349.write
  local exit = _g349.exit
  local today = _g349.today
  local now = _g349.now
  local number = _g349.number
  local string = _g349.string
  local space = _g349.space
  local apply = _g349.apply
  local make_id = _g349["make-id"]
  local _37message_handler = _g349["%message-handler"]
  local toplevel63 = _g349["toplevel?"]
  local module_key = _g349["module-key"]
  local module = _g349.module
  local setenv = _g349.setenv
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
  local _g398 = nexus["lumen/runtime"]
  local nil63 = _g398["nil?"]
  local is63 = _g398["is?"]
  local length = _g398.length
  local none63 = _g398["none?"]
  local some63 = _g398["some?"]
  local one63 = _g398["one?"]
  local hd = _g398.hd
  local string63 = _g398["string?"]
  local number63 = _g398["number?"]
  local boolean63 = _g398["boolean?"]
  local function63 = _g398["function?"]
  local composite63 = _g398["composite?"]
  local atom63 = _g398["atom?"]
  local table63 = _g398["table?"]
  local list63 = _g398["list?"]
  local substring = _g398.substring
  local sub = _g398.sub
  local keys = _g398.keys
  local inner = _g398.inner
  local tl = _g398.tl
  local char = _g398.char
  local code = _g398.code
  local string_literal63 = _g398["string-literal?"]
  local id_literal63 = _g398["id-literal?"]
  local add = _g398.add
  local drop = _g398.drop
  local last = _g398.last
  local butlast = _g398.butlast
  local reverse = _g398.reverse
  local join = _g398.join
  local reduce = _g398.reduce
  local keep = _g398.keep
  local in63 = _g398["in?"]
  local find = _g398.find
  local pair = _g398.pair
  local sort = _g398.sort
  local iterate = _g398.iterate
  local replicate = _g398.replicate
  local series = _g398.series
  local map = _g398.map
  local keys63 = _g398["keys?"]
  local empty63 = _g398["empty?"]
  local stash = _g398.stash
  local unstash = _g398.unstash
  local search = _g398.search
  local split = _g398.split
  local cat = _g398.cat
  local _43 = _g398["+"]
  local _ = _g398["-"]
  local _42 = _g398["*"]
  local _47 = _g398["/"]
  local _37 = _g398["%"]
  local _62 = _g398[">"]
  local _60 = _g398["<"]
  local _61 = _g398["="]
  local _6261 = _g398[">="]
  local _6061 = _g398["<="]
  local read_file = _g398["read-file"]
  local write_file = _g398["write-file"]
  local write = _g398.write
  local exit = _g398.exit
  local today = _g398.today
  local now = _g398.now
  local number = _g398.number
  local string = _g398.string
  local space = _g398.space
  local apply = _g398.apply
  local make_id = _g398["make-id"]
  local _37message_handler = _g398["%message-handler"]
  local toplevel63 = _g398["toplevel?"]
  local module_key = _g398["module-key"]
  local module = _g398.module
  local setenv = _g398.setenv
  local _g401 = nexus["lumen/lib"]
  local getenv = _g401.getenv
  local macro_function = _g401["macro-function"]
  local macro63 = _g401["macro?"]
  local special63 = _g401["special?"]
  local special_form63 = _g401["special-form?"]
  local statement63 = _g401["statement?"]
  local symbol_expansion = _g401["symbol-expansion"]
  local symbol63 = _g401["symbol?"]
  local variable63 = _g401["variable?"]
  local bound63 = _g401["bound?"]
  local quoted = _g401.quoted
  local stash42 = _g401["stash*"]
  local index = _g401.index
  local bind = _g401.bind
  local bind42 = _g401["bind*"]
  local quasiexpand = _g401.quasiexpand
  local macroexpand = _g401.macroexpand
  local indentation = _g401.indentation
  local reserved63 = _g401["reserved?"]
  local valid_id63 = _g401["valid-id?"]
  local id = _g401.id
  local key = _g401.key
  local imported = _g401.imported
  local link = _g401.link
  local mapo = _g401.mapo
  local quote_environment = _g401["quote-environment"]
  local quote_modules = _g401["quote-modules"]
  local initial_environment = _g401["initial-environment"]
  local _g402 = nexus["lumen/reader"]
  local make_stream = _g402["make-stream"]
  local read_table = _g402["read-table"]
  local read = _g402.read
  local read_all = _g402["read-all"]
  local read_from_string = _g402["read-from-string"]
  local _g405 = {}
  local _g406 = {}
  _g406.js = "!"
  _g406.lua = "not "
  _g405["not"] = _g406
  local _g408 = {}
  _g408["*"] = true
  _g408["/"] = true
  _g408["%"] = true
  local _g410 = {}
  _g410["+"] = true
  _g410["-"] = true
  local _g412 = {}
  local _g413 = {}
  _g413.js = "+"
  _g413.lua = ".."
  _g412.cat = _g413
  local _g415 = {}
  _g415["<"] = true
  _g415[">"] = true
  _g415["<="] = true
  _g415[">="] = true
  local _g417 = {}
  local _g418 = {}
  _g418.js = "==="
  _g418.lua = "=="
  _g417["="] = _g418
  local _g419 = {}
  _g419.js = "!="
  _g419.lua = "~="
  _g417["~="] = _g419
  local _g421 = {}
  local _g422 = {}
  _g422.js = "&&"
  _g422.lua = "and"
  _g421["and"] = _g422
  local _g424 = {}
  local _g425 = {}
  _g425.js = "||"
  _g425.lua = "or"
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
    local name = _g453.name
    local prefix = _g453.prefix
    local _g543
    if name then
      _g543 = compile(name)
    else
      _g543 = ""
    end
    local id = _g543
    local _g455 = prefix or ""
    local _g456 = compile_args(args)
    indent_level = indent_level + 1
    local _g458 = compile(body, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local _g457 = _g458
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
        local _g462 = _g546
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
  local butlast = _g551.butlast
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
  local butlast = _g953.butlast
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
  local _g1811 = nexus["lumen/runtime"]
  local nil63 = _g1811["nil?"]
  local is63 = _g1811["is?"]
  local length = _g1811.length
  local none63 = _g1811["none?"]
  local some63 = _g1811["some?"]
  local one63 = _g1811["one?"]
  local hd = _g1811.hd
  local string63 = _g1811["string?"]
  local number63 = _g1811["number?"]
  local boolean63 = _g1811["boolean?"]
  local function63 = _g1811["function?"]
  local composite63 = _g1811["composite?"]
  local atom63 = _g1811["atom?"]
  local table63 = _g1811["table?"]
  local list63 = _g1811["list?"]
  local substring = _g1811.substring
  local sub = _g1811.sub
  local keys = _g1811.keys
  local inner = _g1811.inner
  local tl = _g1811.tl
  local char = _g1811.char
  local code = _g1811.code
  local string_literal63 = _g1811["string-literal?"]
  local id_literal63 = _g1811["id-literal?"]
  local add = _g1811.add
  local drop = _g1811.drop
  local last = _g1811.last
  local butlast = _g1811.butlast
  local reverse = _g1811.reverse
  local join = _g1811.join
  local reduce = _g1811.reduce
  local keep = _g1811.keep
  local in63 = _g1811["in?"]
  local find = _g1811.find
  local pair = _g1811.pair
  local sort = _g1811.sort
  local iterate = _g1811.iterate
  local replicate = _g1811.replicate
  local series = _g1811.series
  local map = _g1811.map
  local keys63 = _g1811["keys?"]
  local empty63 = _g1811["empty?"]
  local stash = _g1811.stash
  local unstash = _g1811.unstash
  local search = _g1811.search
  local split = _g1811.split
  local cat = _g1811.cat
  local _43 = _g1811["+"]
  local _ = _g1811["-"]
  local _42 = _g1811["*"]
  local _47 = _g1811["/"]
  local _37 = _g1811["%"]
  local _62 = _g1811[">"]
  local _60 = _g1811["<"]
  local _61 = _g1811["="]
  local _6261 = _g1811[">="]
  local _6061 = _g1811["<="]
  local read_file = _g1811["read-file"]
  local write_file = _g1811["write-file"]
  local write = _g1811.write
  local exit = _g1811.exit
  local today = _g1811.today
  local now = _g1811.now
  local number = _g1811.number
  local string = _g1811.string
  local space = _g1811.space
  local apply = _g1811.apply
  local make_id = _g1811["make-id"]
  local _37message_handler = _g1811["%message-handler"]
  local toplevel63 = _g1811["toplevel?"]
  local module_key = _g1811["module-key"]
  local module = _g1811.module
  local setenv = _g1811.setenv
  local _g1814 = nexus["lumen/lib"]
  local getenv = _g1814.getenv
  local macro_function = _g1814["macro-function"]
  local macro63 = _g1814["macro?"]
  local special63 = _g1814["special?"]
  local special_form63 = _g1814["special-form?"]
  local statement63 = _g1814["statement?"]
  local symbol_expansion = _g1814["symbol-expansion"]
  local symbol63 = _g1814["symbol?"]
  local variable63 = _g1814["variable?"]
  local bound63 = _g1814["bound?"]
  local quoted = _g1814.quoted
  local stash42 = _g1814["stash*"]
  local index = _g1814.index
  local bind = _g1814.bind
  local bind42 = _g1814["bind*"]
  local quasiexpand = _g1814.quasiexpand
  local macroexpand = _g1814.macroexpand
  local indentation = _g1814.indentation
  local reserved63 = _g1814["reserved?"]
  local valid_id63 = _g1814["valid-id?"]
  local id = _g1814.id
  local key = _g1814.key
  local imported = _g1814.imported
  local link = _g1814.link
  local mapo = _g1814.mapo
  local quote_environment = _g1814["quote-environment"]
  local quote_modules = _g1814["quote-modules"]
  local initial_environment = _g1814["initial-environment"]
  local _g1815 = nexus["lumen/compiler"]
  local compile_function = _g1815["compile-function"]
  local compile = _g1815.compile
  local open_module = _g1815["open-module"]
  local load_module = _g1815["load-module"]
  local in_module = _g1815["in-module"]
  local import_modules = _g1815["import-modules"]
  local compile_module = _g1815["compile-module"]
  local declare = _g1815.declare
  local eval = _g1815.eval
  modules = {["lumen/system"] = {import = {{"lumen", "special"}, {"lumen", "core"}}, export = {nexus = {global = true, export = true}}}, lumen = {import = {{"lumen", "special"}}, alias = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}}, export = {}}, ["lumen/core"] = {import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}, {"lumen", "lib"}, {"lumen", "compiler"}}, export = {quote = {macro = function (form)
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
    local _g1858 = body
    local k = nil
    for k in next, _g1858 do
      local v = _g1858[k]
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
    local function step(_g1870)
      local a = _g1870[1]
      local b = _g1870[2]
      local c = sub(_g1870, 2)
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
    local _g1874 = unstash({...})
    local body = sub(_g1874, 0)
    return({"if", cond, join({"do"}, body)})
  end, export = true}, unless = {macro = function (cond, ...)
    local _g1878 = unstash({...})
    local body = sub(_g1878, 0)
    return({"if", {"not", cond}, join({"do"}, body)})
  end, export = true}, table = {macro = function (...)
    local body = unstash({...})
    return(join({"%object"}, mapo(function (x)
      return(x)
    end, body)))
  end, export = true}, let = {macro = function (bindings, ...)
    local _g1886 = unstash({...})
    local body = sub(_g1886, 0)
    if length(bindings) < 2 then
      return(join({"do"}, body))
    else
      local renames = {}
      local locals = {}
      local lh = bindings[1]
      local rh = bindings[2]
      local _g1889 = bind(lh, rh)
      local k = nil
      for k in next, _g1889 do
        local _g1891 = _g1889[k]
        local id = _g1891[1]
        local val = _g1891[2]
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
    local _g1897 = unstash({...})
    local body = sub(_g1897, 0)
    local imp = body.import
    local exp = body.export
    local alias = body.alias
    local _g1899 = import_modules(imp)
    local imports = _g1899[1]
    local bindings = _g1899[2]
    local k = module_key(spec)
    modules[k] = {import = imports, export = {}, alias = alias}
    local _g1900 = exp or {}
    local _g950 = nil
    for _g950 in next, _g1900 do
      local x = _g1900[_g950]
      setenv(x, {_stash = true, export = true})
    end
    return(join({"do", {"set", {"get", "nexus", {"quote", k}}, {"table"}}}, bindings))
  end, export = true}, ["define-macro"] = {macro = function (name, args, ...)
    local _g1907 = unstash({...})
    local body = sub(_g1907, 0)
    local form = join({"fn", args}, body)
    local _g1910 = {"setenv", {"quote", name}}
    _g1910.macro = form
    _g1910.form = {"quote", form}
    eval(_g1910)
    return(nil)
  end, export = true}, ["define-special"] = {macro = function (name, args, ...)
    local _g1913 = unstash({...})
    local body = sub(_g1913, 0)
    local form = join({"fn", args}, body)
    local keys = sub(body, length(body))
    local _g1916 = {"setenv", {"quote", name}}
    _g1916.special = form
    _g1916.form = {"quote", form}
    eval(join(_g1916, keys))
    return(nil)
  end, export = true}, ["define-symbol"] = {macro = function (name, expansion)
    setenv(name, {_stash = true, symbol = expansion})
    return(nil)
  end, export = true}, ["define*"] = {macro = function (name, x, ...)
    local _g1920 = unstash({...})
    local body = sub(_g1920, 0)
    setenv(name, {_stash = true, global = true, export = true})
    if some63(body) then
      local _g1922 = bind42(x, body)
      local args = _g1922[1]
      local _g1923 = _g1922[2]
      return(join({"%global-function", name, args}, _g1923))
    else
      if target == "js" then
        return({"set", {"get", "global", {"quote", id(name)}}, x})
      else
        return({"set", name, x})
      end
    end
  end, export = true}, define = {macro = function (name, x, ...)
    local _g1929 = unstash({...})
    local body = sub(_g1929, 0)
    setenv(name, {_stash = true, variable = true})
    if some63(body) and target == "js" then
      return(link(name, {"%local", name, join({"fn", x}, body)}))
    else
      if some63(body) then
        local _g1933 = bind42(x, body)
        local args = _g1933[1]
        local _g1934 = _g1933[2]
        return(link(name, join({"%local-function", name, args}, _g1934)))
      else
        return(link(name, {"%local", name, x}))
      end
    end
  end, export = true}, ["set*"] = {macro = function (name, value)
    return(link(name, {"set", name, value}))
  end, export = true}, ["with-bindings"] = {macro = function (_g1940, ...)
    local names = _g1940[1]
    local _g1939 = unstash({...})
    local body = sub(_g1939, 0)
    local x = make_id()
    local _g1945 = {"setenv", x}
    _g1945.variable = true
    local _g1942 = {"with-frame", {"all", {"_g951", x}, names, _g1945}}
    _g1942.scope = true
    return(join(_g1942, body))
  end, export = true}, ["let-macro"] = {macro = function (definitions, ...)
    local _g1946 = unstash({...})
    local body = sub(_g1946, 0)
    add(environment, {})
    map(function (m)
      return(macroexpand(join({"define-macro"}, m)))
    end, definitions)
    local _g1948 = join({"do"}, macroexpand(body))
    drop(environment)
    return(_g1948)
  end, export = true}, ["let-symbol"] = {macro = function (expansions, ...)
    local _g1952 = unstash({...})
    local body = sub(_g1952, 0)
    add(environment, {})
    map(function (_g1956)
      local name = _g1956[1]
      local exp = _g1956[2]
      return(macroexpand({"define-symbol", name, exp}))
    end, pair(expansions))
    local _g1954 = join({"do"}, macroexpand(body))
    drop(environment)
    return(_g1954)
  end, export = true}, fn = {macro = function (args, ...)
    local _g1959 = unstash({...})
    local body = sub(_g1959, 0)
    local _g1961 = bind42(args, body)
    local _g1962 = _g1961[1]
    local _g1963 = _g1961[2]
    return(join({"%function", _g1962}, _g1963))
  end, export = true}, guard = {macro = function (expr)
    if target == "js" then
      return({{"fn", {}, {"%try", {"list", true, expr}}}})
    else
      local e = make_id()
      local x = make_id()
      local ex = "|" .. e .. "," .. x .. "|"
      return({"let", {ex, {"xpcall", {"fn", {}, expr}, "%message-handler"}}, {"list", e, x}})
    end
  end, export = true}, all = {macro = function (_g1976, t, ...)
    local k = _g1976[1]
    local v = _g1976[2]
    local _g1975 = unstash({...})
    local body = sub(_g1975, 0)
    local x = make_id()
    local n = make_id()
    local _g2134
    if target == "lua" then
      _g2134 = body
    else
      _g2134 = {join({"let", {n, {"parseInt", k}, k, {"if", {"isNaN", n}, k, n}}}, body)}
    end
    return({"let", {x, t, k, "nil"}, {"%for", x, k, join({"let", {v, {"get", x, k}}}, _g2134)}})
  end, export = true}, ["set-of"] = {macro = function (...)
    local xs = unstash({...})
    local l = {}
    local _g1991 = xs
    local _g952 = nil
    for _g952 in next, _g1991 do
      local x = _g1991[_g952]
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
    local _g2000 = unstash({...})
    local bs = sub(_g2000, 0)
    return({"set", a, join({"join*", a}, bs)})
  end, export = true}, ["cat!"] = {macro = function (a, ...)
    local _g2004 = unstash({...})
    local bs = sub(_g2004, 0)
    return({"set", a, join({"cat", a}, bs)})
  end, export = true}, inc = {macro = function (n, by)
    return({"set", n, {"+", n, by or 1}})
  end, export = true}, dec = {macro = function (n, by)
    return({"set", n, {"-", n, by or 1}})
  end, export = true}, pr = {macro = function (...)
    local xs = unstash({...})
    return({"print", space(xs)})
  end, export = true}, ["with-frame"] = {macro = function (...)
    local _g2016 = unstash({...})
    local body = sub(_g2016, 0)
    local scope = _g2016.scope
    local x = make_id()
    local _g2020 = {"table"}
    _g2020._scope = scope
    return({"do", {"add", "environment", _g2020}, {"let", {x, join({"do"}, body)}, {"drop", "environment"}, x}})
  end, export = true}}}, ["lumen/runtime"] = {import = {{"lumen", "special"}, {"lumen", "core"}}, export = {["nil?"] = {export = true, variable = true}, ["is?"] = {export = true, variable = true}, length = {export = true, variable = true}, ["none?"] = {export = true, variable = true}, ["some?"] = {export = true, variable = true}, ["one?"] = {export = true, variable = true}, hd = {export = true, variable = true}, ["string?"] = {export = true, variable = true}, ["number?"] = {export = true, variable = true}, ["boolean?"] = {export = true, variable = true}, ["function?"] = {export = true, variable = true}, ["composite?"] = {export = true, variable = true}, ["atom?"] = {export = true, variable = true}, ["table?"] = {export = true, variable = true}, ["list?"] = {export = true, variable = true}, substring = {export = true, variable = true}, sub = {export = true, variable = true}, keys = {export = true, variable = true}, inner = {export = true, variable = true}, tl = {export = true, variable = true}, char = {export = true, variable = true}, code = {export = true, variable = true}, ["string-literal?"] = {export = true, variable = true}, ["id-literal?"] = {export = true, variable = true}, add = {export = true, variable = true}, drop = {export = true, variable = true}, last = {export = true, variable = true}, butlast = {export = true, variable = true}, reverse = {export = true, variable = true}, join = {export = true, variable = true}, reduce = {export = true, variable = true}, keep = {export = true, variable = true}, ["in?"] = {export = true, variable = true}, find = {export = true, variable = true}, pair = {export = true, variable = true}, sort = {export = true, variable = true}, iterate = {export = true, variable = true}, replicate = {export = true, variable = true}, series = {export = true, variable = true}, map = {export = true, variable = true}, ["keys?"] = {export = true, variable = true}, ["empty?"] = {export = true, variable = true}, stash = {export = true, variable = true}, unstash = {export = true, variable = true}, search = {export = true, variable = true}, split = {export = true, variable = true}, cat = {export = true, variable = true}, ["+"] = {export = true, variable = true}, ["-"] = {export = true, variable = true}, ["*"] = {export = true, variable = true}, ["/"] = {export = true, variable = true}, ["%"] = {export = true, variable = true}, [">"] = {export = true, variable = true}, ["<"] = {export = true, variable = true}, ["="] = {export = true, variable = true}, [">="] = {export = true, variable = true}, ["<="] = {export = true, variable = true}, ["read-file"] = {export = true, variable = true}, ["write-file"] = {export = true, variable = true}, write = {export = true, variable = true}, exit = {export = true, variable = true}, today = {export = true, variable = true}, now = {export = true, variable = true}, number = {export = true, variable = true}, string = {export = true, variable = true}, space = {export = true, variable = true}, apply = {export = true, variable = true}, ["make-id"] = {export = true, variable = true}, ["%message-handler"] = {export = true, variable = true}, ["toplevel?"] = {export = true, variable = true}, ["module-key"] = {export = true, variable = true}, module = {export = true, variable = true}, setenv = {export = true, variable = true}, shift = {variable = true}, ["id-count"] = {variable = true}}}, ["lumen/compiler"] = {import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}, {"lumen", "lib"}, {"lumen", "reader"}}, export = {["compile-function"] = {export = true, variable = true}, compile = {export = true, variable = true}, ["open-module"] = {export = true, variable = true}, ["load-module"] = {export = true, variable = true}, ["in-module"] = {export = true, variable = true}, ["import-modules"] = {export = true, variable = true}, ["compile-module"] = {export = true, variable = true}, declare = {export = true, variable = true}, eval = {export = true, variable = true}, infix = {variable = true}, ["unary?"] = {variable = true}, precedence = {variable = true}, getop = {variable = true}, ["infix?"] = {variable = true}, ["compile-args"] = {variable = true}, ["compile-atom"] = {variable = true}, terminator = {variable = true}, ["compile-special"] = {variable = true}, ["parenthesize-call?"] = {variable = true}, ["compile-call"] = {variable = true}, ["op-delims"] = {variable = true}, ["compile-infix"] = {variable = true}, ["can-return?"] = {variable = true}, lower = {variable = true}, ["lower-statement"] = {variable = true}, ["lower-body"] = {variable = true}, ["lower-do"] = {variable = true}, ["lower-if"] = {variable = true}, ["lower-short"] = {variable = true}, ["lower-try"] = {variable = true}, ["lower-while"] = {variable = true}, ["lower-for"] = {variable = true}, ["lower-function"] = {variable = true}, ["lower-definition"] = {variable = true}, ["lower-call"] = {variable = true}, ["lower-infix?"] = {variable = true}, ["lower-infix"] = {variable = true}, ["lower-special"] = {variable = true}, process = {variable = true}, ["current-module"] = {global = true, export = true}, ["module-path"] = {variable = true}, encapsulate = {variable = true}, ["compile-file"] = {variable = true}, run = {variable = true}, ["compiling?"] = {variable = true}, ["compiler-output"] = {variable = true}, conclude = {variable = true}, ["%compile-module"] = {variable = true}, reimported = {variable = true}, ["%result"] = {global = true, export = true}}}, ["lumen/special"] = {import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}, {"lumen", "lib"}, {"lumen", "compiler"}}, export = {["do"] = {tr = true, export = true, foo = true, special = function (...)
    local forms = unstash({...})
    local str = ""
    series(function (x)
      str = str .. compile(x, {_stash = true, stmt = true})
    end, forms)
    return(str)
  end, stmt = true}, ["%if"] = {tr = true, export = true, foo = true, special = function (cond, cons, alt)
    local _g2043 = compile(cond)
    indent_level = indent_level + 1
    local _g2045 = compile(cons, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local _g2044 = _g2045
    local _g2135
    if alt then
      indent_level = indent_level + 1
      local _g2047 = compile(alt, {_stash = true, stmt = true})
      indent_level = indent_level - 1
      _g2135 = _g2047
    end
    local _g2046 = _g2135
    local ind = indentation()
    local str = ""
    if target == "js" then
      str = str .. ind .. "if (" .. _g2043 .. ") {\n" .. _g2044 .. ind .. "}"
    else
      str = str .. ind .. "if " .. _g2043 .. " then\n" .. _g2044
    end
    if _g2046 and target == "js" then
      str = str .. " else {\n" .. _g2046 .. ind .. "}"
    else
      if _g2046 then
        str = str .. ind .. "else\n" .. _g2046
      end
    end
    if target == "lua" then
      return(str .. ind .. "end\n")
    else
      return(str .. "\n")
    end
  end, stmt = true}, ["while"] = {tr = true, export = true, foo = true, special = function (cond, form)
    local _g2049 = compile(cond)
    indent_level = indent_level + 1
    local _g2050 = compile(form, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local body = _g2050
    local ind = indentation()
    if target == "js" then
      return(ind .. "while (" .. _g2049 .. ") {\n" .. body .. ind .. "}\n")
    else
      return(ind .. "while " .. _g2049 .. " do\n" .. body .. ind .. "end\n")
    end
  end, stmt = true}, ["%for"] = {tr = true, export = true, foo = true, special = function (t, k, form)
    local _g2052 = compile(t)
    local ind = indentation()
    indent_level = indent_level + 1
    local _g2053 = compile(form, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local body = _g2053
    if target == "lua" then
      return(ind .. "for " .. k .. " in next, " .. _g2052 .. " do\n" .. body .. ind .. "end\n")
    else
      return(ind .. "for (" .. k .. " in " .. _g2052 .. ") {\n" .. body .. ind .. "}\n")
    end
  end, stmt = true}, ["%try"] = {tr = true, export = true, foo = true, special = function (form)
    local ind = indentation()
    indent_level = indent_level + 1
    local _g2055 = compile(form, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local body = _g2055
    local e = make_id()
    local hf = {"return", {"%array", false, {"get", e, "\"message\""}}}
    indent_level = indent_level + 1
    local _g2059 = compile(hf, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local h = _g2059
    return(ind .. "try {\n" .. body .. ind .. "}\n" .. ind .. "catch (" .. e .. ") {\n" .. h .. ind .. "}\n")
  end, stmt = true}, ["break"] = {special = function ()
    return(indentation() .. "break")
  end, export = true, foo = true, stmt = true}, ["%function"] = {special = function (args, body)
    return(compile_function(args, body))
  end, export = true, foo = true}, ["%global-function"] = {tr = true, export = true, foo = true, special = function (name, args, body)
    if target == "lua" then
      local x = compile_function(args, body, {_stash = true, name = name})
      return(indentation() .. x)
    else
      return(compile({"set", name, {"%function", args, body}}, {_stash = true, stmt = true}))
    end
  end, stmt = true}, ["%local-function"] = {tr = true, export = true, foo = true, special = function (name, args, body)
    local x = compile_function(args, body, {_stash = true, name = name, prefix = "local "})
    return(indentation() .. x)
  end, stmt = true}, ["return"] = {special = function (x)
    local _g2136
    if nil63(x) then
      _g2136 = "return"
    else
      _g2136 = "return(" .. compile(x) .. ")"
    end
    local _g2067 = _g2136
    return(indentation() .. _g2067)
  end, export = true, foo = true, stmt = true}, error = {special = function (x)
    local _g2137
    if target == "js" then
      _g2137 = "throw new " .. compile({"Error", x})
    else
      _g2137 = "error(" .. compile(x) .. ")"
    end
    local e = _g2137
    return(indentation() .. e)
  end, export = true, foo = true, stmt = true}, ["%local"] = {special = function (name, value)
    local id = compile(name)
    local value1 = compile(value)
    local _g2138
    if is63(value) then
      _g2138 = " = " .. value1
    else
      _g2138 = ""
    end
    local rh = _g2138
    local _g2139
    if target == "js" then
      _g2139 = "var "
    else
      _g2139 = "local "
    end
    local keyword = _g2139
    local ind = indentation()
    return(ind .. keyword .. id .. rh)
  end, export = true, foo = true, stmt = true}, set = {special = function (lh, rh)
    local _g2072 = compile(lh)
    local _g2140
    if nil63(rh) then
      _g2140 = "nil"
    else
      _g2140 = rh
    end
    local _g2073 = compile(_g2140)
    return(indentation() .. _g2072 .. " = " .. _g2073)
  end, export = true, foo = true, stmt = true}, get = {special = function (t, k)
    local _g2075 = compile(t)
    local k1 = compile(k)
    if target == "lua" and char(_g2075, 0) == "{" then
      _g2075 = "(" .. _g2075 .. ")"
    end
    if string_literal63(k) and valid_id63(inner(k)) then
      return(_g2075 .. "." .. inner(k))
    else
      return(_g2075 .. "[" .. k1 .. "]")
    end
  end, export = true, foo = true}, ["not"] = {}, ["%array"] = {special = function (...)
    local forms = unstash({...})
    local _g2141
    if target == "lua" then
      _g2141 = "{"
    else
      _g2141 = "["
    end
    local open = _g2141
    local _g2142
    if target == "lua" then
      _g2142 = "}"
    else
      _g2142 = "]"
    end
    local close = _g2142
    local str = ""
    local comma = ""
    local _g2077 = forms
    local k = nil
    for k in next, _g2077 do
      local v = _g2077[k]
      if number63(k) then
        str = str .. comma .. compile(v)
        comma = ", "
      end
    end
    return(open .. str .. close)
  end, export = true, foo = true}, ["%object"] = {special = function (...)
    local forms = unstash({...})
    local str = "{"
    local _g2143
    if target == "lua" then
      _g2143 = " = "
    else
      _g2143 = ": "
    end
    local sep = _g2143
    local comma = ""
    local _g2080 = pair(forms)
    local k = nil
    for k in next, _g2080 do
      local v = _g2080[k]
      if number63(k) then
        local _g2082 = v[1]
        local _g2083 = v[2]
        if not string63(_g2082) then
          error("Illegal key: " .. string(_g2082))
        end
        str = str .. comma .. key(_g2082) .. sep .. compile(_g2083)
        comma = ", "
      end
    end
    return(str .. "}")
  end, export = true, foo = true}}}, ["lumen/boot"] = {import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}, {"lumen", "lib"}, {"lumen", "compiler"}}, export = {["%initial-environment"] = {macro = function ()
    return(quote_environment(initial_environment()))
  end}, ["%initial-modules"] = {macro = function ()
    return(quote_modules())
  end}, modules = {global = true, export = true}}}, ["lumen/lib"] = {import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}}, export = {getenv = {export = true, variable = true}, ["macro-function"] = {export = true, variable = true}, ["macro?"] = {export = true, variable = true}, ["special?"] = {export = true, variable = true}, ["special-form?"] = {export = true, variable = true}, ["statement?"] = {export = true, variable = true}, ["symbol-expansion"] = {export = true, variable = true}, ["symbol?"] = {export = true, variable = true}, ["variable?"] = {export = true, variable = true}, ["bound?"] = {export = true, variable = true}, quoted = {export = true, variable = true}, ["stash*"] = {export = true, variable = true}, index = {export = true, variable = true}, bind = {export = true, variable = true}, ["bind*"] = {export = true, variable = true}, quasiexpand = {export = true, variable = true}, macroexpand = {export = true, variable = true}, indentation = {export = true, variable = true}, ["with-indent"] = {export = true, macro = function (form)
    local result = make_id()
    return({"do", {"inc", "indent-level"}, {"let", {result, form}, {"dec", "indent-level"}, result}})
  end}, ["reserved?"] = {export = true, variable = true}, ["valid-id?"] = {export = true, variable = true}, id = {export = true, variable = true}, key = {export = true, variable = true}, imported = {export = true, variable = true}, link = {export = true, variable = true}, mapo = {export = true, variable = true}, ["quote-environment"] = {export = true, variable = true}, ["quote-modules"] = {export = true, variable = true}, ["initial-environment"] = {export = true, variable = true}, ["global?"] = {variable = true}, escape = {variable = true}, literal = {variable = true}, bias = {variable = true}, ["quoting?"] = {variable = true}, ["quasiquoting?"] = {variable = true}, ["can-unquote?"] = {variable = true}, ["quasisplice?"] = {variable = true}, ["quasiquote-list"] = {variable = true}, ["indent-level"] = {global = true, export = true}, reserved = {variable = true}, ["numeric?"] = {variable = true}, ["valid-code?"] = {variable = true}, extend = {variable = true}, exclude = {variable = true}, ["quote-binding"] = {variable = true}, ["quote-frame"] = {variable = true}, ["quote-module"] = {variable = true}}}, ["lumen/reader"] = {import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}}, export = {["make-stream"] = {export = true, variable = true}, ["read-table"] = {export = true, variable = true}, ["define-reader"] = {export = true, macro = function (_g2107, ...)
    local char = _g2107[1]
    local stream = _g2107[2]
    local _g2106 = unstash({...})
    local body = sub(_g2106, 0)
    return({"set", {"get", "read-table", char}, join({"fn", {stream}}, body)})
  end}, read = {export = true, variable = true}, ["read-all"] = {export = true, variable = true}, ["read-from-string"] = {export = true, variable = true}, delimiters = {variable = true}, whitespace = {variable = true}, ["peek-char"] = {variable = true}, ["read-char"] = {variable = true}, ["skip-non-code"] = {variable = true}, eof = {variable = true}, ["key?"] = {variable = true}, ["flag?"] = {variable = true}}}, user = {import = {"lumen", {"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}}, export = {}}, ["lumen/main"] = {import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}, {"lumen", "reader"}, {"lumen", "compiler"}}, export = {}}}
  environment = {{["define-module"] = {macro = function (spec, ...)
    local _g2124 = unstash({...})
    local body = sub(_g2124, 0)
    local imp = body.import
    local exp = body.export
    local alias = body.alias
    local _g2126 = import_modules(imp)
    local imports = _g2126[1]
    local bindings = _g2126[2]
    local k = module_key(spec)
    modules[k] = {import = imports, export = {}, alias = alias}
    local _g2127 = exp or {}
    local _g950 = nil
    for _g950 in next, _g2127 do
      local x = _g2127[_g950]
      setenv(x, {_stash = true, export = true})
    end
    return(join({"do", {"set", {"get", "nexus", {"quote", k}}, {"table"}}}, bindings))
  end, export = true}}}
end)();
(function ()
  nexus.user = {}
  local _g2144 = nexus["lumen/runtime"]
  local nil63 = _g2144["nil?"]
  local is63 = _g2144["is?"]
  local length = _g2144.length
  local none63 = _g2144["none?"]
  local some63 = _g2144["some?"]
  local one63 = _g2144["one?"]
  local hd = _g2144.hd
  local string63 = _g2144["string?"]
  local number63 = _g2144["number?"]
  local boolean63 = _g2144["boolean?"]
  local function63 = _g2144["function?"]
  local composite63 = _g2144["composite?"]
  local atom63 = _g2144["atom?"]
  local table63 = _g2144["table?"]
  local list63 = _g2144["list?"]
  local substring = _g2144.substring
  local sub = _g2144.sub
  local keys = _g2144.keys
  local inner = _g2144.inner
  local tl = _g2144.tl
  local char = _g2144.char
  local code = _g2144.code
  local string_literal63 = _g2144["string-literal?"]
  local id_literal63 = _g2144["id-literal?"]
  local add = _g2144.add
  local drop = _g2144.drop
  local last = _g2144.last
  local butlast = _g2144.butlast
  local reverse = _g2144.reverse
  local join = _g2144.join
  local reduce = _g2144.reduce
  local keep = _g2144.keep
  local in63 = _g2144["in?"]
  local find = _g2144.find
  local pair = _g2144.pair
  local sort = _g2144.sort
  local iterate = _g2144.iterate
  local replicate = _g2144.replicate
  local series = _g2144.series
  local map = _g2144.map
  local keys63 = _g2144["keys?"]
  local empty63 = _g2144["empty?"]
  local stash = _g2144.stash
  local unstash = _g2144.unstash
  local search = _g2144.search
  local split = _g2144.split
  local cat = _g2144.cat
  local _43 = _g2144["+"]
  local _ = _g2144["-"]
  local _42 = _g2144["*"]
  local _47 = _g2144["/"]
  local _37 = _g2144["%"]
  local _62 = _g2144[">"]
  local _60 = _g2144["<"]
  local _61 = _g2144["="]
  local _6261 = _g2144[">="]
  local _6061 = _g2144["<="]
  local read_file = _g2144["read-file"]
  local write_file = _g2144["write-file"]
  local write = _g2144.write
  local exit = _g2144.exit
  local today = _g2144.today
  local now = _g2144.now
  local number = _g2144.number
  local string = _g2144.string
  local space = _g2144.space
  local apply = _g2144.apply
  local make_id = _g2144["make-id"]
  local _37message_handler = _g2144["%message-handler"]
  local toplevel63 = _g2144["toplevel?"]
  local module_key = _g2144["module-key"]
  local module = _g2144.module
  local setenv = _g2144.setenv
end)();
(function ()
  nexus["lumen/main"] = {}
  local _g2 = nexus["lumen/runtime"]
  local nil63 = _g2["nil?"]
  local is63 = _g2["is?"]
  local length = _g2.length
  local none63 = _g2["none?"]
  local some63 = _g2["some?"]
  local one63 = _g2["one?"]
  local hd = _g2.hd
  local string63 = _g2["string?"]
  local number63 = _g2["number?"]
  local boolean63 = _g2["boolean?"]
  local function63 = _g2["function?"]
  local composite63 = _g2["composite?"]
  local atom63 = _g2["atom?"]
  local table63 = _g2["table?"]
  local list63 = _g2["list?"]
  local substring = _g2.substring
  local sub = _g2.sub
  local keys = _g2.keys
  local inner = _g2.inner
  local tl = _g2.tl
  local char = _g2.char
  local code = _g2.code
  local string_literal63 = _g2["string-literal?"]
  local id_literal63 = _g2["id-literal?"]
  local add = _g2.add
  local drop = _g2.drop
  local last = _g2.last
  local butlast = _g2.butlast
  local reverse = _g2.reverse
  local join = _g2.join
  local reduce = _g2.reduce
  local keep = _g2.keep
  local in63 = _g2["in?"]
  local find = _g2.find
  local pair = _g2.pair
  local sort = _g2.sort
  local iterate = _g2.iterate
  local replicate = _g2.replicate
  local series = _g2.series
  local map = _g2.map
  local keys63 = _g2["keys?"]
  local empty63 = _g2["empty?"]
  local stash = _g2.stash
  local unstash = _g2.unstash
  local search = _g2.search
  local split = _g2.split
  local cat = _g2.cat
  local _43 = _g2["+"]
  local _ = _g2["-"]
  local _42 = _g2["*"]
  local _47 = _g2["/"]
  local _37 = _g2["%"]
  local _62 = _g2[">"]
  local _60 = _g2["<"]
  local _61 = _g2["="]
  local _6261 = _g2[">="]
  local _6061 = _g2["<="]
  local read_file = _g2["read-file"]
  local write_file = _g2["write-file"]
  local write = _g2.write
  local exit = _g2.exit
  local today = _g2.today
  local now = _g2.now
  local number = _g2.number
  local string = _g2.string
  local space = _g2.space
  local apply = _g2.apply
  local make_id = _g2["make-id"]
  local _37message_handler = _g2["%message-handler"]
  local toplevel63 = _g2["toplevel?"]
  local module_key = _g2["module-key"]
  local module = _g2.module
  local setenv = _g2.setenv
  local _g5 = nexus["lumen/reader"]
  local make_stream = _g5["make-stream"]
  local read_table = _g5["read-table"]
  local read = _g5.read
  local read_all = _g5["read-all"]
  local read_from_string = _g5["read-from-string"]
  local _g6 = nexus["lumen/compiler"]
  local compile_function = _g6["compile-function"]
  local compile = _g6.compile
  local open_module = _g6["open-module"]
  local load_module = _g6["load-module"]
  local in_module = _g6["in-module"]
  local import_modules = _g6["import-modules"]
  local compile_module = _g6["compile-module"]
  local declare = _g6.declare
  local eval = _g6.eval
  local function rep(str)
    local _g2149,_g2150 = xpcall(function ()
      return(eval(read_from_string(str)))
    end, _37message_handler)
    local _g2148 = {_g2149, _g2150}
    local _g1 = _g2148[1]
    local x = _g2148[2]
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
