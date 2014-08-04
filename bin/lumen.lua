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
  local now = _g171.now
  local empty63 = _g171["empty?"]
  local exit = _g171.exit
  local toplevel63 = _g171["toplevel?"]
  local iterate = _g171.iterate
  local split = _g171.split
  local number63 = _g171["number?"]
  local butlast = _g171.butlast
  local keys = _g171.keys
  local in63 = _g171["in?"]
  local write_file = _g171["write-file"]
  local boolean63 = _g171["boolean?"]
  local map = _g171.map
  local reduce = _g171.reduce
  local sort = _g171.sort
  local cat = _g171.cat
  local some63 = _g171["some?"]
  local is63 = _g171["is?"]
  local pair = _g171.pair
  local series = _g171.series
  local string_literal63 = _g171["string-literal?"]
  local substring = _g171.substring
  local inner = _g171.inner
  local string63 = _g171["string?"]
  local search = _g171.search
  local length = _g171.length
  local make_id = _g171["make-id"]
  local find = _g171.find
  local keep = _g171.keep
  local number = _g171.number
  local keys63 = _g171["keys?"]
  local none63 = _g171["none?"]
  local stash = _g171.stash
  local drop = _g171.drop
  local one63 = _g171["one?"]
  local hd = _g171.hd
  local write = _g171.write
  local setenv = _g171.setenv
  local join = _g171.join
  local code = _g171.code
  local today = _g171.today
  local module = _g171.module
  local module_key = _g171["module-key"]
  local _37message_handler = _g171["%message-handler"]
  local apply = _g171.apply
  local space = _g171.space
  local _ = _g171["-"]
  local string = _g171.string
  local _47 = _g171["/"]
  local unstash = _g171.unstash
  local last = _g171.last
  local nil63 = _g171["nil?"]
  local atom63 = _g171["atom?"]
  local _6061 = _g171["<="]
  local id_literal63 = _g171["id-literal?"]
  local read_file = _g171["read-file"]
  local add = _g171.add
  local composite63 = _g171["composite?"]
  local _6261 = _g171[">="]
  local reverse = _g171.reverse
  local _61 = _g171["="]
  local replicate = _g171.replicate
  local function63 = _g171["function?"]
  local list63 = _g171["list?"]
  local _62 = _g171[">"]
  local char = _g171.char
  local _37 = _g171["%"]
  local _60 = _g171["<"]
  local table63 = _g171["table?"]
  local _42 = _g171["*"]
  local _43 = _g171["+"]
  local sub = _g171.sub
  local tl = _g171.tl
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
            local _g951 = nil
            for _g951 in next, _g241 do
              local _g239 = _g241[_g951]
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
              local _g951 = nil
              for _g951 in next, _g249 do
                local _g247 = _g249[_g951]
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
  local reserved = {["and"] = true, ["true"] = true, ["nil"] = true, ["end"] = true, ["default"] = true, ["catch"] = true, ["+"] = true, [">"] = true, ["typeof"] = true, ["%"] = true, ["return"] = true, ["if"] = true, ["in"] = true, ["or"] = true, ["for"] = true, ["finally"] = true, ["continue"] = true, ["do"] = true, ["with"] = true, [">="] = true, ["void"] = true, ["switch"] = true, ["elseif"] = true, ["local"] = true, ["then"] = true, ["delete"] = true, ["="] = true, ["function"] = true, ["var"] = true, ["*"] = true, ["while"] = true, ["false"] = true, ["until"] = true, ["this"] = true, ["else"] = true, ["throw"] = true, ["try"] = true, ["not"] = true, ["debugger"] = true, ["new"] = true, ["break"] = true, ["<"] = true, ["repeat"] = true, ["case"] = true, ["instanceof"] = true, ["<="] = true, ["-"] = true, ["=="] = true, ["/"] = true}
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
    _g335.export = quote_frame(m.export)
    _g335.alias = quoted(m.alias)
    _g335.import = quoted(m.import)
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
  local now = _g349.now
  local empty63 = _g349["empty?"]
  local exit = _g349.exit
  local toplevel63 = _g349["toplevel?"]
  local iterate = _g349.iterate
  local split = _g349.split
  local number63 = _g349["number?"]
  local butlast = _g349.butlast
  local keys = _g349.keys
  local in63 = _g349["in?"]
  local write_file = _g349["write-file"]
  local boolean63 = _g349["boolean?"]
  local map = _g349.map
  local reduce = _g349.reduce
  local sort = _g349.sort
  local cat = _g349.cat
  local some63 = _g349["some?"]
  local is63 = _g349["is?"]
  local pair = _g349.pair
  local series = _g349.series
  local string_literal63 = _g349["string-literal?"]
  local substring = _g349.substring
  local inner = _g349.inner
  local string63 = _g349["string?"]
  local search = _g349.search
  local length = _g349.length
  local make_id = _g349["make-id"]
  local find = _g349.find
  local keep = _g349.keep
  local number = _g349.number
  local keys63 = _g349["keys?"]
  local none63 = _g349["none?"]
  local stash = _g349.stash
  local drop = _g349.drop
  local one63 = _g349["one?"]
  local hd = _g349.hd
  local write = _g349.write
  local setenv = _g349.setenv
  local join = _g349.join
  local code = _g349.code
  local today = _g349.today
  local module = _g349.module
  local module_key = _g349["module-key"]
  local _37message_handler = _g349["%message-handler"]
  local apply = _g349.apply
  local space = _g349.space
  local _ = _g349["-"]
  local string = _g349.string
  local _47 = _g349["/"]
  local unstash = _g349.unstash
  local last = _g349.last
  local nil63 = _g349["nil?"]
  local atom63 = _g349["atom?"]
  local _6061 = _g349["<="]
  local id_literal63 = _g349["id-literal?"]
  local read_file = _g349["read-file"]
  local add = _g349.add
  local composite63 = _g349["composite?"]
  local _6261 = _g349[">="]
  local reverse = _g349.reverse
  local _61 = _g349["="]
  local replicate = _g349.replicate
  local function63 = _g349["function?"]
  local list63 = _g349["list?"]
  local _62 = _g349[">"]
  local char = _g349.char
  local _37 = _g349["%"]
  local _60 = _g349["<"]
  local table63 = _g349["table?"]
  local _42 = _g349["*"]
  local _43 = _g349["+"]
  local sub = _g349.sub
  local tl = _g349.tl
  local delimiters = {[";"] = true, ["\n"] = true, [")"] = true, ["("] = true}
  nexus["lumen/reader"].delimiters = delimiters
  local whitespace = {["\n"] = true, [" "] = true, ["\t"] = true}
  nexus["lumen/reader"].whitespace = whitespace
  local function make_stream(str)
    return({pos = 0, len = length(str), string = str})
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
  local _g399 = nexus["lumen/runtime"]
  local now = _g399.now
  local empty63 = _g399["empty?"]
  local exit = _g399.exit
  local toplevel63 = _g399["toplevel?"]
  local iterate = _g399.iterate
  local split = _g399.split
  local number63 = _g399["number?"]
  local butlast = _g399.butlast
  local keys = _g399.keys
  local in63 = _g399["in?"]
  local write_file = _g399["write-file"]
  local boolean63 = _g399["boolean?"]
  local map = _g399.map
  local reduce = _g399.reduce
  local sort = _g399.sort
  local cat = _g399.cat
  local some63 = _g399["some?"]
  local is63 = _g399["is?"]
  local pair = _g399.pair
  local series = _g399.series
  local string_literal63 = _g399["string-literal?"]
  local substring = _g399.substring
  local inner = _g399.inner
  local string63 = _g399["string?"]
  local search = _g399.search
  local length = _g399.length
  local make_id = _g399["make-id"]
  local find = _g399.find
  local keep = _g399.keep
  local number = _g399.number
  local keys63 = _g399["keys?"]
  local none63 = _g399["none?"]
  local stash = _g399.stash
  local drop = _g399.drop
  local one63 = _g399["one?"]
  local hd = _g399.hd
  local write = _g399.write
  local setenv = _g399.setenv
  local join = _g399.join
  local code = _g399.code
  local today = _g399.today
  local module = _g399.module
  local module_key = _g399["module-key"]
  local _37message_handler = _g399["%message-handler"]
  local apply = _g399.apply
  local space = _g399.space
  local _ = _g399["-"]
  local string = _g399.string
  local _47 = _g399["/"]
  local unstash = _g399.unstash
  local last = _g399.last
  local nil63 = _g399["nil?"]
  local atom63 = _g399["atom?"]
  local _6061 = _g399["<="]
  local id_literal63 = _g399["id-literal?"]
  local read_file = _g399["read-file"]
  local add = _g399.add
  local composite63 = _g399["composite?"]
  local _6261 = _g399[">="]
  local reverse = _g399.reverse
  local _61 = _g399["="]
  local replicate = _g399.replicate
  local function63 = _g399["function?"]
  local list63 = _g399["list?"]
  local _62 = _g399[">"]
  local char = _g399.char
  local _37 = _g399["%"]
  local _60 = _g399["<"]
  local table63 = _g399["table?"]
  local _42 = _g399["*"]
  local _43 = _g399["+"]
  local sub = _g399.sub
  local tl = _g399.tl
  local _g402 = nexus["lumen/lib"]
  local index = _g402.index
  local id = _g402.id
  local special_form63 = _g402["special-form?"]
  local quoted = _g402.quoted
  local macroexpand = _g402.macroexpand
  local macro_function = _g402["macro-function"]
  local symbol_expansion = _g402["symbol-expansion"]
  local bound63 = _g402["bound?"]
  local reserved63 = _g402["reserved?"]
  local variable63 = _g402["variable?"]
  local bind42 = _g402["bind*"]
  local getenv = _g402.getenv
  local valid_id63 = _g402["valid-id?"]
  local imported = _g402.imported
  local key = _g402.key
  local stash42 = _g402["stash*"]
  local link = _g402.link
  local macro63 = _g402["macro?"]
  local statement63 = _g402["statement?"]
  local symbol63 = _g402["symbol?"]
  local initial_environment = _g402["initial-environment"]
  local quote_modules = _g402["quote-modules"]
  local quote_environment = _g402["quote-environment"]
  local mapo = _g402.mapo
  local special63 = _g402["special?"]
  local indentation = _g402.indentation
  local bind = _g402.bind
  local quasiexpand = _g402.quasiexpand
  local _g403 = nexus["lumen/reader"]
  local read_from_string = _g403["read-from-string"]
  local make_stream = _g403["make-stream"]
  local read_all = _g403["read-all"]
  local read_table = _g403["read-table"]
  local read = _g403.read
  local _g406 = {}
  local _g407 = {}
  _g407.lua = "not "
  _g407.js = "!"
  _g406["not"] = _g407
  local _g409 = {}
  _g409["*"] = true
  _g409["%"] = true
  _g409["/"] = true
  local _g411 = {}
  _g411["+"] = true
  _g411["-"] = true
  local _g413 = {}
  local _g414 = {}
  _g414.lua = ".."
  _g414.js = "+"
  _g413.cat = _g414
  local _g416 = {}
  _g416[">"] = true
  _g416[">="] = true
  _g416["<"] = true
  _g416["<="] = true
  local _g418 = {}
  local _g419 = {}
  _g419.lua = "=="
  _g419.js = "==="
  _g418["="] = _g419
  local _g420 = {}
  _g420.lua = "~="
  _g420.js = "!="
  _g418["~="] = _g420
  local _g422 = {}
  local _g423 = {}
  _g423.lua = "and"
  _g423.js = "&&"
  _g422["and"] = _g423
  local _g425 = {}
  local _g426 = {}
  _g426.lua = "or"
  _g426.js = "||"
  _g425["or"] = _g426
  local infix = {_g406, _g409, _g411, _g413, _g416, _g418, _g422, _g425}
  nexus["lumen/compiler"].infix = infix
  local function unary63(form)
    local op = form[1]
    local args = sub(form, 1)
    return(one63(args) and in63(op, {"not", "-"}))
  end
  nexus["lumen/compiler"]["unary?"] = unary63
  local function precedence(form)
    if list63(form) and not unary63(form) then
      local _g430 = infix
      local k = nil
      for k in next, _g430 do
        local v = _g430[k]
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
    local _g440 = getenv(x)
    local special = _g440.special
    local self_tr63 = _g440.tr
    local stmt = _g440.stmt
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
    local _g443 = unstash({...})
    local right = _g443.right
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
    local _g448 = sub(form, 1)
    local a = _g448[1]
    local b = _g448[2]
    local _g449 = op_delims(form, a)
    local ao = _g449[1]
    local ac = _g449[2]
    local _g450 = op_delims(form, b, {_stash = true, right = true})
    local bo = _g450[1]
    local bc = _g450[2]
    local _g451 = compile(a)
    local _g452 = compile(b)
    local _g453 = getop(op)
    if unary63(form) then
      return(_g453 .. ao .. _g451 .. ac)
    else
      return(ao .. _g451 .. ac .. " " .. _g453 .. " " .. bo .. _g452 .. bc)
    end
  end
  nexus["lumen/compiler"]["compile-infix"] = compile_infix
  local function compile_function(args, body, ...)
    local _g454 = unstash({...})
    local name = _g454.name
    local prefix = _g454.prefix
    local _g544
    if name then
      _g544 = compile(name)
    else
      _g544 = ""
    end
    local id = _g544
    local _g456 = prefix or ""
    local _g457 = compile_args(args)
    indent_level = indent_level + 1
    local _g459 = compile(body, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local _g458 = _g459
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
      return("function " .. id .. _g457 .. " {\n" .. _g458 .. ind .. "}" .. tr)
    else
      return(_g456 .. "function " .. id .. _g457 .. "\n" .. _g458 .. ind .. tr)
    end
  end
  nexus["lumen/compiler"]["compile-function"] = compile_function
  local function can_return63(form)
    return(is63(form) and (atom63(form) or not (hd(form) == "return") and not statement63(hd(form))))
  end
  nexus["lumen/compiler"]["can-return?"] = can_return63
  compile = function (form, ...)
    local _g461 = unstash({...})
    local stmt = _g461.stmt
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
        local _g463 = _g547
        return(ind .. _g463 .. tr)
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
  local now = _g552.now
  local empty63 = _g552["empty?"]
  local exit = _g552.exit
  local toplevel63 = _g552["toplevel?"]
  local iterate = _g552.iterate
  local split = _g552.split
  local number63 = _g552["number?"]
  local butlast = _g552.butlast
  local keys = _g552.keys
  local in63 = _g552["in?"]
  local write_file = _g552["write-file"]
  local boolean63 = _g552["boolean?"]
  local map = _g552.map
  local reduce = _g552.reduce
  local sort = _g552.sort
  local cat = _g552.cat
  local some63 = _g552["some?"]
  local is63 = _g552["is?"]
  local pair = _g552.pair
  local series = _g552.series
  local string_literal63 = _g552["string-literal?"]
  local substring = _g552.substring
  local inner = _g552.inner
  local string63 = _g552["string?"]
  local search = _g552.search
  local length = _g552.length
  local make_id = _g552["make-id"]
  local find = _g552.find
  local keep = _g552.keep
  local number = _g552.number
  local keys63 = _g552["keys?"]
  local none63 = _g552["none?"]
  local stash = _g552.stash
  local drop = _g552.drop
  local one63 = _g552["one?"]
  local hd = _g552.hd
  local write = _g552.write
  local setenv = _g552.setenv
  local join = _g552.join
  local code = _g552.code
  local today = _g552.today
  local module = _g552.module
  local module_key = _g552["module-key"]
  local _37message_handler = _g552["%message-handler"]
  local apply = _g552.apply
  local space = _g552.space
  local _ = _g552["-"]
  local string = _g552.string
  local _47 = _g552["/"]
  local unstash = _g552.unstash
  local last = _g552.last
  local nil63 = _g552["nil?"]
  local atom63 = _g552["atom?"]
  local _6061 = _g552["<="]
  local id_literal63 = _g552["id-literal?"]
  local read_file = _g552["read-file"]
  local add = _g552.add
  local composite63 = _g552["composite?"]
  local _6261 = _g552[">="]
  local reverse = _g552.reverse
  local _61 = _g552["="]
  local replicate = _g552.replicate
  local function63 = _g552["function?"]
  local list63 = _g552["list?"]
  local _62 = _g552[">"]
  local char = _g552.char
  local _37 = _g552["%"]
  local _60 = _g552["<"]
  local table63 = _g552["table?"]
  local _42 = _g552["*"]
  local _43 = _g552["+"]
  local sub = _g552.sub
  local tl = _g552.tl
  local _g555 = nexus["lumen/lib"]
  local index = _g555.index
  local id = _g555.id
  local special_form63 = _g555["special-form?"]
  local quoted = _g555.quoted
  local macroexpand = _g555.macroexpand
  local macro_function = _g555["macro-function"]
  local symbol_expansion = _g555["symbol-expansion"]
  local bound63 = _g555["bound?"]
  local reserved63 = _g555["reserved?"]
  local variable63 = _g555["variable?"]
  local bind42 = _g555["bind*"]
  local getenv = _g555.getenv
  local valid_id63 = _g555["valid-id?"]
  local imported = _g555.imported
  local key = _g555.key
  local stash42 = _g555["stash*"]
  local link = _g555.link
  local macro63 = _g555["macro?"]
  local statement63 = _g555["statement?"]
  local symbol63 = _g555["symbol?"]
  local initial_environment = _g555["initial-environment"]
  local quote_modules = _g555["quote-modules"]
  local quote_environment = _g555["quote-environment"]
  local mapo = _g555.mapo
  local special63 = _g555["special?"]
  local indentation = _g555.indentation
  local bind = _g555.bind
  local quasiexpand = _g555.quasiexpand
  local _g556 = nexus["lumen/compiler"]
  local import_modules = _g556["import-modules"]
  local open_module = _g556["open-module"]
  local declare = _g556.declare
  local load_module = _g556["load-module"]
  local compile = _g556.compile
  local compile_function = _g556["compile-function"]
  local compile_module = _g556["compile-module"]
  local in_module = _g556["in-module"]
  local eval = _g556.eval
end)();
(function ()
  nexus["lumen/core"] = {}
  local _g953 = nexus["lumen/runtime"]
  local now = _g953.now
  local empty63 = _g953["empty?"]
  local exit = _g953.exit
  local toplevel63 = _g953["toplevel?"]
  local iterate = _g953.iterate
  local split = _g953.split
  local number63 = _g953["number?"]
  local butlast = _g953.butlast
  local keys = _g953.keys
  local in63 = _g953["in?"]
  local write_file = _g953["write-file"]
  local boolean63 = _g953["boolean?"]
  local map = _g953.map
  local reduce = _g953.reduce
  local sort = _g953.sort
  local cat = _g953.cat
  local some63 = _g953["some?"]
  local is63 = _g953["is?"]
  local pair = _g953.pair
  local series = _g953.series
  local string_literal63 = _g953["string-literal?"]
  local substring = _g953.substring
  local inner = _g953.inner
  local string63 = _g953["string?"]
  local search = _g953.search
  local length = _g953.length
  local make_id = _g953["make-id"]
  local find = _g953.find
  local keep = _g953.keep
  local number = _g953.number
  local keys63 = _g953["keys?"]
  local none63 = _g953["none?"]
  local stash = _g953.stash
  local drop = _g953.drop
  local one63 = _g953["one?"]
  local hd = _g953.hd
  local write = _g953.write
  local setenv = _g953.setenv
  local join = _g953.join
  local code = _g953.code
  local today = _g953.today
  local module = _g953.module
  local module_key = _g953["module-key"]
  local _37message_handler = _g953["%message-handler"]
  local apply = _g953.apply
  local space = _g953.space
  local _ = _g953["-"]
  local string = _g953.string
  local _47 = _g953["/"]
  local unstash = _g953.unstash
  local last = _g953.last
  local nil63 = _g953["nil?"]
  local atom63 = _g953["atom?"]
  local _6061 = _g953["<="]
  local id_literal63 = _g953["id-literal?"]
  local read_file = _g953["read-file"]
  local add = _g953.add
  local composite63 = _g953["composite?"]
  local _6261 = _g953[">="]
  local reverse = _g953.reverse
  local _61 = _g953["="]
  local replicate = _g953.replicate
  local function63 = _g953["function?"]
  local list63 = _g953["list?"]
  local _62 = _g953[">"]
  local char = _g953.char
  local _37 = _g953["%"]
  local _60 = _g953["<"]
  local table63 = _g953["table?"]
  local _42 = _g953["*"]
  local _43 = _g953["+"]
  local sub = _g953.sub
  local tl = _g953.tl
  local _g956 = nexus["lumen/lib"]
  local index = _g956.index
  local id = _g956.id
  local special_form63 = _g956["special-form?"]
  local quoted = _g956.quoted
  local macroexpand = _g956.macroexpand
  local macro_function = _g956["macro-function"]
  local symbol_expansion = _g956["symbol-expansion"]
  local bound63 = _g956["bound?"]
  local reserved63 = _g956["reserved?"]
  local variable63 = _g956["variable?"]
  local bind42 = _g956["bind*"]
  local getenv = _g956.getenv
  local valid_id63 = _g956["valid-id?"]
  local imported = _g956.imported
  local key = _g956.key
  local stash42 = _g956["stash*"]
  local link = _g956.link
  local macro63 = _g956["macro?"]
  local statement63 = _g956["statement?"]
  local symbol63 = _g956["symbol?"]
  local initial_environment = _g956["initial-environment"]
  local quote_modules = _g956["quote-modules"]
  local quote_environment = _g956["quote-environment"]
  local mapo = _g956.mapo
  local special63 = _g956["special?"]
  local indentation = _g956.indentation
  local bind = _g956.bind
  local quasiexpand = _g956.quasiexpand
  local _g957 = nexus["lumen/compiler"]
  local import_modules = _g957["import-modules"]
  local open_module = _g957["open-module"]
  local declare = _g957.declare
  local load_module = _g957["load-module"]
  local compile = _g957.compile
  local compile_function = _g957["compile-function"]
  local compile_module = _g957["compile-module"]
  local in_module = _g957["in-module"]
  local eval = _g957.eval
  target = "lua"
end)();
(function ()
  nexus["lumen/boot"] = {}
  local _g1825 = nexus["lumen/runtime"]
  local now = _g1825.now
  local empty63 = _g1825["empty?"]
  local exit = _g1825.exit
  local toplevel63 = _g1825["toplevel?"]
  local iterate = _g1825.iterate
  local split = _g1825.split
  local number63 = _g1825["number?"]
  local butlast = _g1825.butlast
  local keys = _g1825.keys
  local in63 = _g1825["in?"]
  local write_file = _g1825["write-file"]
  local boolean63 = _g1825["boolean?"]
  local map = _g1825.map
  local reduce = _g1825.reduce
  local sort = _g1825.sort
  local cat = _g1825.cat
  local some63 = _g1825["some?"]
  local is63 = _g1825["is?"]
  local pair = _g1825.pair
  local series = _g1825.series
  local string_literal63 = _g1825["string-literal?"]
  local substring = _g1825.substring
  local inner = _g1825.inner
  local string63 = _g1825["string?"]
  local search = _g1825.search
  local length = _g1825.length
  local make_id = _g1825["make-id"]
  local find = _g1825.find
  local keep = _g1825.keep
  local number = _g1825.number
  local keys63 = _g1825["keys?"]
  local none63 = _g1825["none?"]
  local stash = _g1825.stash
  local drop = _g1825.drop
  local one63 = _g1825["one?"]
  local hd = _g1825.hd
  local write = _g1825.write
  local setenv = _g1825.setenv
  local join = _g1825.join
  local code = _g1825.code
  local today = _g1825.today
  local module = _g1825.module
  local module_key = _g1825["module-key"]
  local _37message_handler = _g1825["%message-handler"]
  local apply = _g1825.apply
  local space = _g1825.space
  local _ = _g1825["-"]
  local string = _g1825.string
  local _47 = _g1825["/"]
  local unstash = _g1825.unstash
  local last = _g1825.last
  local nil63 = _g1825["nil?"]
  local atom63 = _g1825["atom?"]
  local _6061 = _g1825["<="]
  local id_literal63 = _g1825["id-literal?"]
  local read_file = _g1825["read-file"]
  local add = _g1825.add
  local composite63 = _g1825["composite?"]
  local _6261 = _g1825[">="]
  local reverse = _g1825.reverse
  local _61 = _g1825["="]
  local replicate = _g1825.replicate
  local function63 = _g1825["function?"]
  local list63 = _g1825["list?"]
  local _62 = _g1825[">"]
  local char = _g1825.char
  local _37 = _g1825["%"]
  local _60 = _g1825["<"]
  local table63 = _g1825["table?"]
  local _42 = _g1825["*"]
  local _43 = _g1825["+"]
  local sub = _g1825.sub
  local tl = _g1825.tl
  local _g1828 = nexus["lumen/lib"]
  local index = _g1828.index
  local id = _g1828.id
  local special_form63 = _g1828["special-form?"]
  local quoted = _g1828.quoted
  local macroexpand = _g1828.macroexpand
  local macro_function = _g1828["macro-function"]
  local symbol_expansion = _g1828["symbol-expansion"]
  local bound63 = _g1828["bound?"]
  local reserved63 = _g1828["reserved?"]
  local variable63 = _g1828["variable?"]
  local bind42 = _g1828["bind*"]
  local getenv = _g1828.getenv
  local valid_id63 = _g1828["valid-id?"]
  local imported = _g1828.imported
  local key = _g1828.key
  local stash42 = _g1828["stash*"]
  local link = _g1828.link
  local macro63 = _g1828["macro?"]
  local statement63 = _g1828["statement?"]
  local symbol63 = _g1828["symbol?"]
  local initial_environment = _g1828["initial-environment"]
  local quote_modules = _g1828["quote-modules"]
  local quote_environment = _g1828["quote-environment"]
  local mapo = _g1828.mapo
  local special63 = _g1828["special?"]
  local indentation = _g1828.indentation
  local bind = _g1828.bind
  local quasiexpand = _g1828.quasiexpand
  local _g1829 = nexus["lumen/compiler"]
  local import_modules = _g1829["import-modules"]
  local open_module = _g1829["open-module"]
  local declare = _g1829.declare
  local load_module = _g1829["load-module"]
  local compile = _g1829.compile
  local compile_function = _g1829["compile-function"]
  local compile_module = _g1829["compile-module"]
  local in_module = _g1829["in-module"]
  local eval = _g1829.eval
  modules = {["lumen/lib"] = {import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}}, export = {index = {export = true, variable = true}, ["numeric?"] = {variable = true}, id = {export = true, variable = true}, ["special-form?"] = {export = true, variable = true}, quoted = {export = true, variable = true}, macroexpand = {export = true, variable = true}, ["quote-module"] = {variable = true}, ["with-indent"] = {export = true, macro = function (form)
    local result = make_id()
    return({"do", {"inc", "indent-level"}, {"let", {result, form}, {"dec", "indent-level"}, result}})
  end}, ["macro-function"] = {export = true, variable = true}, ["symbol-expansion"] = {export = true, variable = true}, ["quote-frame"] = {variable = true}, ["quoting?"] = {variable = true}, ["bound?"] = {export = true, variable = true}, ["valid-code?"] = {variable = true}, bias = {variable = true}, ["reserved?"] = {export = true, variable = true}, ["can-unquote?"] = {variable = true}, ["variable?"] = {export = true, variable = true}, ["bind*"] = {export = true, variable = true}, getenv = {export = true, variable = true}, exclude = {variable = true}, ["quote-binding"] = {variable = true}, ["valid-id?"] = {export = true, variable = true}, imported = {export = true, variable = true}, key = {export = true, variable = true}, literal = {variable = true}, ["indent-level"] = {global = true, export = true}, ["stash*"] = {export = true, variable = true}, ["quasiquote-list"] = {variable = true}, link = {export = true, variable = true}, ["quasisplice?"] = {variable = true}, ["macro?"] = {export = true, variable = true}, ["statement?"] = {export = true, variable = true}, ["quasiquoting?"] = {variable = true}, escape = {variable = true}, ["symbol?"] = {export = true, variable = true}, ["global?"] = {variable = true}, ["initial-environment"] = {export = true, variable = true}, ["quote-modules"] = {export = true, variable = true}, ["quote-environment"] = {export = true, variable = true}, reserved = {variable = true}, extend = {variable = true}, mapo = {export = true, variable = true}, ["special?"] = {export = true, variable = true}, indentation = {export = true, variable = true}, bind = {export = true, variable = true}, quasiexpand = {export = true, variable = true}}}, ["lumen/compiler"] = {import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}, {"lumen", "lib"}, {"lumen", "reader"}}, export = {["%compile-module"] = {variable = true}, ["can-return?"] = {variable = true}, ["compile-atom"] = {variable = true}, ["compile-args"] = {variable = true}, ["lower-infix"] = {variable = true}, ["compile-special"] = {variable = true}, precedence = {variable = true}, ["lower-do"] = {variable = true}, conclude = {variable = true}, ["current-module"] = {global = true, export = true}, ["lower-function"] = {variable = true}, ["compile-infix"] = {variable = true}, lower = {variable = true}, ["import-modules"] = {export = true, variable = true}, ["%result"] = {global = true, export = true}, ["infix?"] = {variable = true}, ["lower-short"] = {variable = true}, terminator = {variable = true}, reimported = {variable = true}, ["op-delims"] = {variable = true}, ["compiler-output"] = {variable = true}, ["lower-infix?"] = {variable = true}, ["compiling?"] = {variable = true}, ["unary?"] = {variable = true}, run = {variable = true}, ["compile-file"] = {variable = true}, ["lower-if"] = {variable = true}, ["compile-call"] = {variable = true}, ["lower-body"] = {variable = true}, ["open-module"] = {export = true, variable = true}, declare = {export = true, variable = true}, encapsulate = {variable = true}, ["module-path"] = {variable = true}, ["lower-while"] = {variable = true}, ["load-module"] = {export = true, variable = true}, ["lower-special"] = {variable = true}, ["lower-definition"] = {variable = true}, ["lower-call"] = {variable = true}, infix = {variable = true}, ["lower-try"] = {variable = true}, process = {variable = true}, compile = {export = true, variable = true}, ["compile-function"] = {export = true, variable = true}, ["compile-module"] = {export = true, variable = true}, ["parenthesize-call?"] = {variable = true}, ["lower-for"] = {variable = true}, ["in-module"] = {export = true, variable = true}, getop = {variable = true}, eval = {export = true, variable = true}, ["lower-statement"] = {variable = true}}}, ["lumen/main"] = {import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}, {"lumen", "reader"}, {"lumen", "compiler"}}, export = {}}, ["lumen/system"] = {import = {{"lumen", "special"}, {"lumen", "core"}}, export = {nexus = {global = true, export = true}}}, ["lumen/core"] = {import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}, {"lumen", "lib"}, {"lumen", "compiler"}}, export = {at = {macro = function (l, i)
    if target == "lua" and number63(i) then
      i = i + 1
    else
      if target == "lua" then
        i = {"+", i, 1}
      end
    end
    return({"get", l, i})
  end, export = true}, ["with-frame"] = {macro = function (...)
    local _g1885 = unstash({...})
    local scope = _g1885.scope
    local body = sub(_g1885, 0)
    local x = make_id()
    local _g1889 = {"table"}
    _g1889._scope = scope
    return({"do", {"add", "environment", _g1889}, {"let", {x, join({"do"}, body)}, {"drop", "environment"}, x}})
  end, export = true}, all = {macro = function (_g1895, t, ...)
    local k = _g1895[1]
    local v = _g1895[2]
    local _g1894 = unstash({...})
    local body = sub(_g1894, 0)
    local x = make_id()
    local n = make_id()
    local _g2148
    if target == "lua" then
      _g2148 = body
    else
      _g2148 = {join({"let", {n, {"parseInt", k}, k, {"if", {"isNaN", n}, k, n}}}, body)}
    end
    return({"let", {x, t, k, "nil"}, {"%for", x, k, join({"let", {v, {"get", x, k}}}, _g2148)}})
  end, export = true}, ["if"] = {macro = function (...)
    local branches = unstash({...})
    local function step(_g1911)
      local a = _g1911[1]
      local b = _g1911[2]
      local c = sub(_g1911, 2)
      if is63(b) then
        return({join({"%if", a, b}, step(c))})
      else
        if is63(a) then
          return({a})
        end
      end
    end
    return(hd(step(branches)))
  end, export = true}, language = {macro = function ()
    return({"quote", target})
  end, export = true}, ["let-symbol"] = {macro = function (expansions, ...)
    local _g1917 = unstash({...})
    local body = sub(_g1917, 0)
    add(environment, {})
    map(function (_g1921)
      local name = _g1921[1]
      local exp = _g1921[2]
      return(macroexpand({"define-symbol", name, exp}))
    end, pair(expansions))
    local _g1919 = join({"do"}, macroexpand(body))
    drop(environment)
    return(_g1919)
  end, export = true}, define = {macro = function (name, x, ...)
    local _g1924 = unstash({...})
    local body = sub(_g1924, 0)
    setenv(name, {_stash = true, variable = true})
    if some63(body) and target == "js" then
      return(link(name, {"%local", name, join({"fn", x}, body)}))
    else
      if some63(body) then
        local _g1928 = bind42(x, body)
        local args = _g1928[1]
        local _g1929 = _g1928[2]
        return(link(name, join({"%local-function", name, args}, _g1929)))
      else
        return(link(name, {"%local", name, x}))
      end
    end
  end, export = true}, ["join!"] = {macro = function (a, ...)
    local _g1932 = unstash({...})
    local bs = sub(_g1932, 0)
    return({"set", a, join({"join*", a}, bs)})
  end, export = true}, quasiquote = {macro = function (form)
    return(quasiexpand(form, 1))
  end, export = true}, inc = {macro = function (n, by)
    return({"set", n, {"+", n, by or 1}})
  end, export = true}, ["cat!"] = {macro = function (a, ...)
    local _g1940 = unstash({...})
    local bs = sub(_g1940, 0)
    return({"set", a, join({"cat", a}, bs)})
  end, export = true}, ["join*"] = {macro = function (...)
    local xs = unstash({...})
    return(reduce(function (a, b)
      return({"join", a, b})
    end, xs))
  end, export = true}, ["define-special"] = {macro = function (name, args, ...)
    local _g1947 = unstash({...})
    local body = sub(_g1947, 0)
    local form = join({"fn", args}, body)
    local _g1950 = {"setenv", {"quote", name}}
    _g1950.form = {"quote", form}
    _g1950.special = form
    eval(join(_g1950, keys(body)))
    return(nil)
  end, export = true}, list = {macro = function (...)
    local body = unstash({...})
    local l = {}
    local forms = {}
    local id = make_id()
    local _g1954 = body
    local k = nil
    for k in next, _g1954 do
      local v = _g1954[k]
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
  end, export = true}, guard = {macro = function (expr)
    if target == "js" then
      return({{"fn", {}, {"%try", {"list", true, expr}}}})
    else
      local e = make_id()
      local x = make_id()
      local ex = "|" .. e .. "," .. x .. "|"
      return({"let", {ex, {"xpcall", {"fn", {}, expr}, "%message-handler"}}, {"list", e, x}})
    end
  end, export = true}, ["set-of"] = {macro = function (...)
    local xs = unstash({...})
    local l = {}
    local _g1975 = xs
    local _g952 = nil
    for _g952 in next, _g1975 do
      local x = _g1975[_g952]
      l[x] = true
    end
    return(join({"table"}, l))
  end, export = true}, fn = {macro = function (args, ...)
    local _g1978 = unstash({...})
    local body = sub(_g1978, 0)
    local _g1980 = bind42(args, body)
    local _g1981 = _g1980[1]
    local _g1982 = _g1980[2]
    return(join({"%function", _g1981}, _g1982))
  end, export = true}, ["define-macro"] = {macro = function (name, args, ...)
    local _g1984 = unstash({...})
    local body = sub(_g1984, 0)
    local form = join({"fn", args}, body)
    local _g1987 = {"setenv", {"quote", name}}
    _g1987.form = {"quote", form}
    _g1987.macro = form
    eval(_g1987)
    return(nil)
  end, export = true}, ["define*"] = {macro = function (name, x, ...)
    local _g1990 = unstash({...})
    local body = sub(_g1990, 0)
    setenv(name, {_stash = true, global = true, export = true})
    if some63(body) then
      local _g1992 = bind42(x, body)
      local args = _g1992[1]
      local _g1993 = _g1992[2]
      return(join({"%global-function", name, args}, _g1993))
    else
      if target == "js" then
        return({"set", {"get", "global", {"quote", id(name)}}, x})
      else
        return({"set", name, x})
      end
    end
  end, export = true}, pr = {macro = function (...)
    local xs = unstash({...})
    return({"print", space(xs)})
  end, export = true}, ["define-symbol"] = {macro = function (name, expansion)
    setenv(name, {_stash = true, symbol = expansion})
    return(nil)
  end, export = true}, ["with-bindings"] = {macro = function (_g2003, ...)
    local names = _g2003[1]
    local _g2002 = unstash({...})
    local body = sub(_g2002, 0)
    local x = make_id()
    local _g2008 = {"setenv", x}
    _g2008.variable = true
    local _g2005 = {"with-frame", {"all", {"_g951", x}, names, _g2008}}
    _g2005.scope = true
    return(join(_g2005, body))
  end, export = true}, ["let-macro"] = {macro = function (definitions, ...)
    local _g2009 = unstash({...})
    local body = sub(_g2009, 0)
    add(environment, {})
    map(function (m)
      return(macroexpand(join({"define-macro"}, m)))
    end, definitions)
    local _g2011 = join({"do"}, macroexpand(body))
    drop(environment)
    return(_g2011)
  end, export = true}, unless = {macro = function (cond, ...)
    local _g2015 = unstash({...})
    local body = sub(_g2015, 0)
    return({"if", {"not", cond}, join({"do"}, body)})
  end, export = true}, ["define-module"] = {macro = function (spec, ...)
    local _g2020 = unstash({...})
    local body = sub(_g2020, 0)
    local exp = body.export
    local alias = body.alias
    local imp = body.import
    local _g2022 = import_modules(imp)
    local imports = _g2022[1]
    local bindings = _g2022[2]
    local k = module_key(spec)
    modules[k] = {export = {}, import = imports, alias = alias}
    local _g2023 = exp or {}
    local _g950 = nil
    for _g950 in next, _g2023 do
      local x = _g2023[_g950]
      setenv(x, {_stash = true, export = true})
    end
    return(join({"do", {"set", {"get", "nexus", {"quote", k}}, {"table"}}}, bindings))
  end, export = true}, ["set*"] = {macro = function (name, value)
    return(link(name, {"set", name, value}))
  end, export = true}, dec = {macro = function (n, by)
    return({"set", n, {"-", n, by or 1}})
  end, export = true}, target = {global = true, macro = function (...)
    local clauses = unstash({...})
    return(clauses[target])
  end, export = true}, table = {macro = function (...)
    local body = unstash({...})
    return(join({"%object"}, mapo(function (x)
      return(x)
    end, body)))
  end, export = true}, let = {macro = function (bindings, ...)
    local _g2039 = unstash({...})
    local body = sub(_g2039, 0)
    if length(bindings) < 2 then
      return(join({"do"}, body))
    else
      local renames = {}
      local locals = {}
      local lh = bindings[1]
      local rh = bindings[2]
      local _g2042 = bind(lh, rh)
      local k = nil
      for k in next, _g2042 do
        local _g2044 = _g2042[k]
        local id = _g2044[1]
        local val = _g2044[2]
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
  end, export = true}, quote = {macro = function (form)
    return(quoted(form))
  end, export = true}, when = {macro = function (cond, ...)
    local _g2051 = unstash({...})
    local body = sub(_g2051, 0)
    return({"if", cond, join({"do"}, body)})
  end, export = true}}}, ["lumen/reader"] = {import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}}, export = {["read-from-string"] = {export = true, variable = true}, delimiters = {variable = true}, ["key?"] = {variable = true}, ["make-stream"] = {export = true, variable = true}, ["define-reader"] = {export = true, macro = function (_g2060, ...)
    local char = _g2060[1]
    local stream = _g2060[2]
    local _g2059 = unstash({...})
    local body = sub(_g2059, 0)
    return({"set", {"get", "read-table", char}, join({"fn", {stream}}, body)})
  end}, ["read-all"] = {export = true, variable = true}, ["read-table"] = {export = true, variable = true}, ["skip-non-code"] = {variable = true}, eof = {variable = true}, ["peek-char"] = {variable = true}, ["read-char"] = {variable = true}, whitespace = {variable = true}, read = {export = true, variable = true}, ["flag?"] = {variable = true}}}, ["lumen/special"] = {import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}, {"lumen", "lib"}, {"lumen", "compiler"}}, export = {["return"] = {foo = true, export = true, special = function (x)
    local _g2149
    if nil63(x) then
      _g2149 = "return"
    else
      _g2149 = "return(" .. compile(x) .. ")"
    end
    local _g2073 = _g2149
    return(indentation() .. _g2073)
  end, stmt = true}, get = {foo = true, export = true, special = function (t, k)
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
  end}, ["%local-function"] = {tr = true, foo = true, export = true, special = function (name, args, body)
    local x = compile_function(args, body, {_stash = true, name = name, prefix = "local "})
    return(indentation() .. x)
  end, stmt = true}, ["%object"] = {foo = true, export = true, special = function (...)
    local forms = unstash({...})
    local str = "{"
    local _g2150
    if target == "lua" then
      _g2150 = " = "
    else
      _g2150 = ": "
    end
    local sep = _g2150
    local comma = ""
    local _g2078 = pair(forms)
    local k = nil
    for k in next, _g2078 do
      local v = _g2078[k]
      if number63(k) then
        local _g2080 = v[1]
        local _g2081 = v[2]
        if not string63(_g2080) then
          error("Illegal key: " .. string(_g2080))
        end
        str = str .. comma .. key(_g2080) .. sep .. compile(_g2081)
        comma = ", "
      end
    end
    return(str .. "}")
  end}, ["not"] = {}, ["%for"] = {tr = true, foo = true, export = true, special = function (t, k, form)
    local _g2083 = compile(t)
    local ind = indentation()
    indent_level = indent_level + 1
    local _g2084 = compile(form, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local body = _g2084
    if target == "lua" then
      return(ind .. "for " .. k .. " in next, " .. _g2083 .. " do\n" .. body .. ind .. "end\n")
    else
      return(ind .. "for (" .. k .. " in " .. _g2083 .. ") {\n" .. body .. ind .. "}\n")
    end
  end, stmt = true}, ["%function"] = {foo = true, export = true, special = function (args, body)
    return(compile_function(args, body))
  end}, ["%if"] = {tr = true, foo = true, export = true, special = function (cond, cons, alt)
    local _g2087 = compile(cond)
    indent_level = indent_level + 1
    local _g2089 = compile(cons, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local _g2088 = _g2089
    local _g2151
    if alt then
      indent_level = indent_level + 1
      local _g2091 = compile(alt, {_stash = true, stmt = true})
      indent_level = indent_level - 1
      _g2151 = _g2091
    end
    local _g2090 = _g2151
    local ind = indentation()
    local str = ""
    if target == "js" then
      str = str .. ind .. "if (" .. _g2087 .. ") {\n" .. _g2088 .. ind .. "}"
    else
      str = str .. ind .. "if " .. _g2087 .. " then\n" .. _g2088
    end
    if _g2090 and target == "js" then
      str = str .. " else {\n" .. _g2090 .. ind .. "}"
    else
      if _g2090 then
        str = str .. ind .. "else\n" .. _g2090
      end
    end
    if target == "lua" then
      return(str .. ind .. "end\n")
    else
      return(str .. "\n")
    end
  end, stmt = true}, set = {foo = true, export = true, special = function (lh, rh)
    local _g2093 = compile(lh)
    local _g2152
    if nil63(rh) then
      _g2152 = "nil"
    else
      _g2152 = rh
    end
    local _g2094 = compile(_g2152)
    return(indentation() .. _g2093 .. " = " .. _g2094)
  end, stmt = true}, ["break"] = {foo = true, export = true, special = function ()
    return(indentation() .. "break")
  end, stmt = true}, ["do"] = {tr = true, foo = true, export = true, special = function (...)
    local forms = unstash({...})
    local str = ""
    series(function (x)
      str = str .. compile(x, {_stash = true, stmt = true})
    end, forms)
    return(str)
  end, stmt = true}, ["%try"] = {tr = true, foo = true, export = true, special = function (form)
    local ind = indentation()
    indent_level = indent_level + 1
    local _g2099 = compile(form, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local body = _g2099
    local e = make_id()
    local hf = {"return", {"%array", false, {"get", e, "\"message\""}}}
    indent_level = indent_level + 1
    local _g2103 = compile(hf, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local h = _g2103
    return(ind .. "try {\n" .. body .. ind .. "}\n" .. ind .. "catch (" .. e .. ") {\n" .. h .. ind .. "}\n")
  end, stmt = true}, ["while"] = {tr = true, foo = true, export = true, special = function (cond, form)
    local _g2105 = compile(cond)
    indent_level = indent_level + 1
    local _g2106 = compile(form, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local body = _g2106
    local ind = indentation()
    if target == "js" then
      return(ind .. "while (" .. _g2105 .. ") {\n" .. body .. ind .. "}\n")
    else
      return(ind .. "while " .. _g2105 .. " do\n" .. body .. ind .. "end\n")
    end
  end, stmt = true}, error = {foo = true, export = true, special = function (x)
    local _g2153
    if target == "js" then
      _g2153 = "throw new " .. compile({"Error", x})
    else
      _g2153 = "error(" .. compile(x) .. ")"
    end
    local e = _g2153
    return(indentation() .. e)
  end, stmt = true}, ["%local"] = {foo = true, export = true, special = function (name, value)
    local id = compile(name)
    local value1 = compile(value)
    local _g2154
    if is63(value) then
      _g2154 = " = " .. value1
    else
      _g2154 = ""
    end
    local rh = _g2154
    local _g2155
    if target == "js" then
      _g2155 = "var "
    else
      _g2155 = "local "
    end
    local keyword = _g2155
    local ind = indentation()
    return(ind .. keyword .. id .. rh)
  end, stmt = true}, ["%array"] = {foo = true, export = true, special = function (...)
    local forms = unstash({...})
    local _g2156
    if target == "lua" then
      _g2156 = "{"
    else
      _g2156 = "["
    end
    local open = _g2156
    local _g2157
    if target == "lua" then
      _g2157 = "}"
    else
      _g2157 = "]"
    end
    local close = _g2157
    local str = ""
    local comma = ""
    local _g2111 = forms
    local k = nil
    for k in next, _g2111 do
      local v = _g2111[k]
      if number63(k) then
        str = str .. comma .. compile(v)
        comma = ", "
      end
    end
    return(open .. str .. close)
  end}, ["%global-function"] = {tr = true, foo = true, export = true, special = function (name, args, body)
    if target == "lua" then
      local x = compile_function(args, body, {_stash = true, name = name})
      return(indentation() .. x)
    else
      return(compile({"set", name, {"%function", args, body}}, {_stash = true, stmt = true}))
    end
  end, stmt = true}}}, ["lumen/runtime"] = {import = {{"lumen", "special"}, {"lumen", "core"}}, export = {now = {export = true, variable = true}, ["empty?"] = {export = true, variable = true}, exit = {export = true, variable = true}, ["toplevel?"] = {export = true, variable = true}, iterate = {export = true, variable = true}, split = {export = true, variable = true}, ["number?"] = {export = true, variable = true}, butlast = {export = true, variable = true}, keys = {export = true, variable = true}, ["in?"] = {export = true, variable = true}, ["write-file"] = {export = true, variable = true}, ["boolean?"] = {export = true, variable = true}, map = {export = true, variable = true}, reduce = {export = true, variable = true}, sort = {export = true, variable = true}, cat = {export = true, variable = true}, ["some?"] = {export = true, variable = true}, ["is?"] = {export = true, variable = true}, pair = {export = true, variable = true}, series = {export = true, variable = true}, ["string-literal?"] = {export = true, variable = true}, substring = {export = true, variable = true}, inner = {export = true, variable = true}, ["string?"] = {export = true, variable = true}, search = {export = true, variable = true}, length = {export = true, variable = true}, ["make-id"] = {export = true, variable = true}, find = {export = true, variable = true}, keep = {export = true, variable = true}, number = {export = true, variable = true}, ["keys?"] = {export = true, variable = true}, ["none?"] = {export = true, variable = true}, stash = {export = true, variable = true}, drop = {export = true, variable = true}, ["one?"] = {export = true, variable = true}, hd = {export = true, variable = true}, shift = {variable = true}, write = {export = true, variable = true}, setenv = {export = true, variable = true}, join = {export = true, variable = true}, code = {export = true, variable = true}, today = {export = true, variable = true}, ["id-count"] = {variable = true}, module = {export = true, variable = true}, ["module-key"] = {export = true, variable = true}, ["%message-handler"] = {export = true, variable = true}, apply = {export = true, variable = true}, space = {export = true, variable = true}, ["-"] = {export = true, variable = true}, string = {export = true, variable = true}, ["/"] = {export = true, variable = true}, unstash = {export = true, variable = true}, last = {export = true, variable = true}, ["nil?"] = {export = true, variable = true}, ["atom?"] = {export = true, variable = true}, ["<="] = {export = true, variable = true}, ["id-literal?"] = {export = true, variable = true}, ["read-file"] = {export = true, variable = true}, add = {export = true, variable = true}, ["composite?"] = {export = true, variable = true}, [">="] = {export = true, variable = true}, reverse = {export = true, variable = true}, ["="] = {export = true, variable = true}, replicate = {export = true, variable = true}, ["function?"] = {export = true, variable = true}, ["list?"] = {export = true, variable = true}, [">"] = {export = true, variable = true}, char = {export = true, variable = true}, ["%"] = {export = true, variable = true}, ["<"] = {export = true, variable = true}, ["table?"] = {export = true, variable = true}, ["*"] = {export = true, variable = true}, ["+"] = {export = true, variable = true}, sub = {export = true, variable = true}, tl = {export = true, variable = true}}}, user = {import = {"lumen", {"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}}, export = {}}, ["lumen/boot"] = {import = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}, {"lumen", "lib"}, {"lumen", "compiler"}}, export = {["%initial-modules"] = {macro = function ()
    return(quote_modules())
  end}, ["%initial-environment"] = {macro = function ()
    return(quote_environment(initial_environment()))
  end}, modules = {global = true, export = true}}}, lumen = {export = {}, import = {{"lumen", "special"}}, alias = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}}}}
  environment = {{["define-module"] = {macro = function (spec, ...)
    local _g2138 = unstash({...})
    local body = sub(_g2138, 0)
    local exp = body.export
    local alias = body.alias
    local imp = body.import
    local _g2140 = import_modules(imp)
    local imports = _g2140[1]
    local bindings = _g2140[2]
    local k = module_key(spec)
    modules[k] = {export = {}, import = imports, alias = alias}
    local _g2141 = exp or {}
    local _g950 = nil
    for _g950 in next, _g2141 do
      local x = _g2141[_g950]
      setenv(x, {_stash = true, export = true})
    end
    return(join({"do", {"set", {"get", "nexus", {"quote", k}}, {"table"}}}, bindings))
  end, export = true}}}
end)();
(function ()
  nexus.user = {}
  local _g2158 = nexus["lumen/runtime"]
  local now = _g2158.now
  local empty63 = _g2158["empty?"]
  local exit = _g2158.exit
  local toplevel63 = _g2158["toplevel?"]
  local iterate = _g2158.iterate
  local split = _g2158.split
  local number63 = _g2158["number?"]
  local butlast = _g2158.butlast
  local keys = _g2158.keys
  local in63 = _g2158["in?"]
  local write_file = _g2158["write-file"]
  local boolean63 = _g2158["boolean?"]
  local map = _g2158.map
  local reduce = _g2158.reduce
  local sort = _g2158.sort
  local cat = _g2158.cat
  local some63 = _g2158["some?"]
  local is63 = _g2158["is?"]
  local pair = _g2158.pair
  local series = _g2158.series
  local string_literal63 = _g2158["string-literal?"]
  local substring = _g2158.substring
  local inner = _g2158.inner
  local string63 = _g2158["string?"]
  local search = _g2158.search
  local length = _g2158.length
  local make_id = _g2158["make-id"]
  local find = _g2158.find
  local keep = _g2158.keep
  local number = _g2158.number
  local keys63 = _g2158["keys?"]
  local none63 = _g2158["none?"]
  local stash = _g2158.stash
  local drop = _g2158.drop
  local one63 = _g2158["one?"]
  local hd = _g2158.hd
  local write = _g2158.write
  local setenv = _g2158.setenv
  local join = _g2158.join
  local code = _g2158.code
  local today = _g2158.today
  local module = _g2158.module
  local module_key = _g2158["module-key"]
  local _37message_handler = _g2158["%message-handler"]
  local apply = _g2158.apply
  local space = _g2158.space
  local _ = _g2158["-"]
  local string = _g2158.string
  local _47 = _g2158["/"]
  local unstash = _g2158.unstash
  local last = _g2158.last
  local nil63 = _g2158["nil?"]
  local atom63 = _g2158["atom?"]
  local _6061 = _g2158["<="]
  local id_literal63 = _g2158["id-literal?"]
  local read_file = _g2158["read-file"]
  local add = _g2158.add
  local composite63 = _g2158["composite?"]
  local _6261 = _g2158[">="]
  local reverse = _g2158.reverse
  local _61 = _g2158["="]
  local replicate = _g2158.replicate
  local function63 = _g2158["function?"]
  local list63 = _g2158["list?"]
  local _62 = _g2158[">"]
  local char = _g2158.char
  local _37 = _g2158["%"]
  local _60 = _g2158["<"]
  local table63 = _g2158["table?"]
  local _42 = _g2158["*"]
  local _43 = _g2158["+"]
  local sub = _g2158.sub
  local tl = _g2158.tl
end)();
(function ()
  nexus["lumen/main"] = {}
  local _g2 = nexus["lumen/runtime"]
  local now = _g2.now
  local empty63 = _g2["empty?"]
  local toplevel63 = _g2["toplevel?"]
  local iterate = _g2.iterate
  local split = _g2.split
  local number63 = _g2["number?"]
  local butlast = _g2.butlast
  local keys = _g2.keys
  local in63 = _g2["in?"]
  local write_file = _g2["write-file"]
  local boolean63 = _g2["boolean?"]
  local map = _g2.map
  local reduce = _g2.reduce
  local sort = _g2.sort
  local cat = _g2.cat
  local some63 = _g2["some?"]
  local is63 = _g2["is?"]
  local _6261 = _g2[">="]
  local _6061 = _g2["<="]
  local string_literal63 = _g2["string-literal?"]
  local substring = _g2.substring
  local inner = _g2.inner
  local string63 = _g2["string?"]
  local search = _g2.search
  local length = _g2.length
  local make_id = _g2["make-id"]
  local find = _g2.find
  local keep = _g2.keep
  local number = _g2.number
  local keys63 = _g2["keys?"]
  local module = _g2.module
  local stash = _g2.stash
  local drop = _g2.drop
  local one63 = _g2["one?"]
  local hd = _g2.hd
  local write = _g2.write
  local setenv = _g2.setenv
  local join = _g2.join
  local code = _g2.code
  local today = _g2.today
  local composite63 = _g2["composite?"]
  local atom63 = _g2["atom?"]
  local list63 = _g2["list?"]
  local function63 = _g2["function?"]
  local last = _g2.last
  local unstash = _g2.unstash
  local _ = _g2["-"]
  local _37 = _g2["%"]
  local _47 = _g2["/"]
  local _42 = _g2["*"]
  local none63 = _g2["none?"]
  local nil63 = _g2["nil?"]
  local _43 = _g2["+"]
  local module_key = _g2["module-key"]
  local id_literal63 = _g2["id-literal?"]
  local exit = _g2.exit
  local add = _g2.add
  local read_file = _g2["read-file"]
  local space = _g2.space
  local reverse = _g2.reverse
  local apply = _g2.apply
  local _62 = _g2[">"]
  local _61 = _g2["="]
  local _37message_handler = _g2["%message-handler"]
  local tl = _g2.tl
  local char = _g2.char
  local pair = _g2.pair
  local _60 = _g2["<"]
  local table63 = _g2["table?"]
  local series = _g2.series
  local replicate = _g2.replicate
  local sub = _g2.sub
  local string = _g2.string
  local _g5 = nexus["lumen/reader"]
  local read_from_string = _g5["read-from-string"]
  local make_stream = _g5["make-stream"]
  local read_all = _g5["read-all"]
  local read_table = _g5["read-table"]
  local read = _g5.read
  local _g6 = nexus["lumen/compiler"]
  local import_modules = _g6["import-modules"]
  local in_module = _g6["in-module"]
  local open_module = _g6["open-module"]
  local load_module = _g6["load-module"]
  local declare = _g6.declare
  local compile = _g6.compile
  local compile_function = _g6["compile-function"]
  local compile_module = _g6["compile-module"]
  local eval = _g6.eval
  local function rep(str)
    local _g2163,_g2164 = xpcall(function ()
      return(eval(read_from_string(str)))
    end, _37message_handler)
    local _g2162 = {_g2163, _g2164}
    local _g1 = _g2162[1]
    local x = _g2162[2]
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
