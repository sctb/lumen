(function ()
  exports = {}
  function setenv(k, ...)
    local keys = unstash({...})
    local _g6 = sub(keys, 0)
    if string63(k) then
      local frame = last(environment)
      local x = (frame[k] or {})
      local k1 = nil
      local _g7 = _g6
      for k1 in next, _g7 do
        if (not number63(k1)) then
          local v = _g7[k1]
          x[k1] = v
        end
      end
      x.module = current_module
      frame[k] = x
    end
  end
  function getenv(k)
    if string63(k) then
      return(find(function (e)
        return(e[k])
      end, reverse(environment)))
    end
  end
  function macro_function(k)
    local b = getenv(k)
    return((b and b.macro))
  end
  function macro63(k)
    return(is63(macro_function(k)))
  end
  function special63(k)
    local b = getenv(k)
    return((b and is63(b.special)))
  end
  function special_form63(form)
    return((list63(form) and special63(hd(form))))
  end
  function symbol_expansion(k)
    local b = getenv(k)
    return((b and b.symbol))
  end
  function symbol63(k)
    return(is63(symbol_expansion(k)))
  end
  function variable63(k)
    local b = last(environment)[k]
    return((b and is63(b.variable)))
  end
  function bound63(x)
    return((macro63(x) or special63(x) or symbol63(x) or variable63(x)))
  end
  function escape(str)
    local str1 = "\""
    local i = 0
    while (i < length(str)) do
      local c = char(str, i)
      local c1 = (function ()
        if (c == "\n") then
          return("\\n")
        elseif (c == "\"") then
          return("\\\"")
        elseif (c == "\\") then
          return("\\\\")
        else
          return(c)
        end
      end)()
      str1 = (str1 .. c1)
      i = (i + 1)
    end
    return((str1 .. "\""))
  end
  function quoted(form)
    if string63(form) then
      return(escape(form))
    elseif atom63(form) then
      return(form)
    else
      return(join({"list"}, map42(quoted, form)))
    end
  end
  function stash(args)
    if keys63(args) then
      local p = {_stash = true}
      local k = nil
      local _g59 = args
      for k in next, _g59 do
        if (not number63(k)) then
          local v = _g59[k]
          p[k] = v
        end
      end
      return(join(args, {p}))
    else
      return(args)
    end
  end
  function stash42(args)
    if keys63(args) then
      local l = {"%object", "_stash", true}
      local k = nil
      local _g60 = args
      for k in next, _g60 do
        if (not number63(k)) then
          local v = _g60[k]
          add(l, k)
          add(l, v)
        end
      end
      return(join(args, {l}))
    else
      return(args)
    end
  end
  function unstash(args)
    if empty63(args) then
      return({})
    else
      local l = last(args)
      if (table63(l) and l._stash) then
        local args1 = sub(args, 0, (length(args) - 1))
        local k = nil
        local _g61 = l
        for k in next, _g61 do
          if (not number63(k)) then
            local v = _g61[k]
            if (k ~= "_stash") then
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
  function bind_arguments(args, body)
    local args1 = {}
    local rest = function ()
      if (target == "js") then
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
      local r = (args.rest or (keys63(args) and make_id()))
      local _g63 = 0
      local _g62 = args
      while (_g63 < length(_g62)) do
        local arg = _g62[(_g63 + 1)]
        if atom63(arg) then
          add(args1, arg)
        elseif (list63(arg) or keys63(arg)) then
          local v = make_id()
          add(args1, v)
          bs = join(bs, {arg, v})
        end
        _g63 = (_g63 + 1)
      end
      if r then
        bs = join(bs, {r, rest()})
      end
      if keys63(args) then
        bs = join(bs, {sub(args, length(args)), r})
      end
      if empty63(bs) then
        return({args1, body})
      else
        return({args1, {join({"let", bs}, body)}})
      end
    end
  end
  function bind(lh, rh)
    if (composite63(lh) and list63(rh)) then
      local id = make_id()
      return(join({{id, rh}}, bind(lh, id)))
    elseif atom63(lh) then
      return({{lh, rh}})
    else
      local bs = {}
      local r = lh.rest
      local i = 0
      local _g64 = lh
      while (i < length(_g64)) do
        local x = _g64[(i + 1)]
        bs = join(bs, bind(x, {"at", rh, i}))
        i = (i + 1)
      end
      if r then
        bs = join(bs, bind(r, {"sub", rh, length(lh)}))
      end
      local k = nil
      local _g65 = lh
      for k in next, _g65 do
        if (not number63(k)) then
          local v = _g65[k]
          if (v == true) then
            v = k
          end
          if (k ~= "rest") then
            bs = join(bs, bind(v, {"get", rh, {"quote", k}}))
          end
        end
      end
      return(bs)
    end
  end
  function message_handler(msg)
    local i = search(msg, ": ")
    return(sub(msg, (i + 2)))
  end
  function quoting63(depth)
    return(number63(depth))
  end
  function quasiquoting63(depth)
    return((quoting63(depth) and (depth > 0)))
  end
  function can_unquote63(depth)
    return((quoting63(depth) and (depth == 1)))
  end
  function quasisplice63(x, depth)
    return((list63(x) and can_unquote63(depth) and (hd(x) == "unquote-splicing")))
  end
  function macroexpand(form)
    if symbol63(form) then
      return(macroexpand(symbol_expansion(form)))
    elseif atom63(form) then
      return(form)
    else
      local x = hd(form)
      if (x == "%for") then
        local _g3 = form[1]
        local _g66 = form[2]
        local t = _g66[1]
        local k = _g66[2]
        local body = sub(form, 2)
        return(join({"%for", {macroexpand(t), macroexpand(k)}}, macroexpand(body)))
      elseif (x == "%function") then
        local _g4 = form[1]
        local args = form[2]
        local _g67 = sub(form, 2)
        add(environment, {})
        local _g69 = (function ()
          local _g71 = 0
          local _g70 = args
          while (_g71 < length(_g70)) do
            local _g68 = _g70[(_g71 + 1)]
            setenv(_g68, {_stash = true, variable = true})
            _g71 = (_g71 + 1)
          end
          return(join({"%function", map42(macroexpand, args)}, macroexpand(_g67)))
        end)()
        drop(environment)
        return(_g69)
      elseif ((x == "%local-function") or (x == "%global-function")) then
        local _g5 = form[1]
        local name = form[2]
        local _g72 = form[3]
        local _g73 = sub(form, 3)
        add(environment, {})
        local _g75 = (function ()
          local _g77 = 0
          local _g76 = _g72
          while (_g77 < length(_g76)) do
            local _g74 = _g76[(_g77 + 1)]
            setenv(_g74, {_stash = true, variable = true})
            _g77 = (_g77 + 1)
          end
          return(join({x, name, map42(macroexpand, _g72)}, macroexpand(_g73)))
        end)()
        drop(environment)
        return(_g75)
      elseif macro63(x) then
        return(macroexpand(apply(macro_function(x), tl(form))))
      else
        return(map42(macroexpand, form))
      end
    end
  end
  function quasiexpand(form, depth)
    if quasiquoting63(depth) then
      if atom63(form) then
        return({"quote", form})
      elseif (can_unquote63(depth) and (hd(form) == "unquote")) then
        return(quasiexpand(form[2]))
      elseif ((hd(form) == "unquote") or (hd(form) == "unquote-splicing")) then
        return(quasiquote_list(form, (depth - 1)))
      elseif (hd(form) == "quasiquote") then
        return(quasiquote_list(form, (depth + 1)))
      else
        return(quasiquote_list(form, depth))
      end
    elseif atom63(form) then
      return(form)
    elseif (hd(form) == "quote") then
      return(form)
    elseif (hd(form) == "quasiquote") then
      return(quasiexpand(form[2], 1))
    else
      return(map42(function (x)
        return(quasiexpand(x, depth))
      end, form))
    end
  end
  function quasiquote_list(form, depth)
    local xs = {{"list"}}
    local k = nil
    local _g78 = form
    for k in next, _g78 do
      if (not number63(k)) then
        local v = _g78[k]
        local v = (function ()
          if quasisplice63(v, depth) then
            return(quasiexpand(v[2]))
          else
            return(quasiexpand(v, depth))
          end
        end)()
        last(xs)[k] = v
      end
    end
    local _g80 = 0
    local _g79 = form
    while (_g80 < length(_g79)) do
      local x = _g79[(_g80 + 1)]
      if quasisplice63(x, depth) then
        local x = quasiexpand(x[2])
        add(xs, x)
        add(xs, {"list"})
      else
        add(last(xs), quasiexpand(x, depth))
      end
      _g80 = (_g80 + 1)
    end
    if (length(xs) == 1) then
      return(hd(xs))
    else
      return(reduce(function (a, b)
        return({"join", a, b})
      end, keep(function (x)
        return(((length(x) > 1) or (not (hd(x) == "list")) or keys63(x)))
      end, xs)))
    end
  end
  target = "lua"
  function length(x)
    return(#x)
  end
  function empty63(x)
    return((length(x) == 0))
  end
  function substring(str, from, upto)
    return((string.sub)(str, (from + 1), upto))
  end
  function sublist(l, from, upto)
    local i = (from or 0)
    local j = 0
    local _g81 = (upto or length(l))
    local l2 = {}
    while (i < _g81) do
      l2[(j + 1)] = l[(i + 1)]
      i = (i + 1)
      j = (j + 1)
    end
    return(l2)
  end
  function sub(x, from, upto)
    local _g82 = (from or 0)
    if string63(x) then
      return(substring(x, _g82, upto))
    else
      local l = sublist(x, _g82, upto)
      local k = nil
      local _g83 = x
      for k in next, _g83 do
        if (not number63(k)) then
          local v = _g83[k]
          l[k] = v
        end
      end
      return(l)
    end
  end
  function inner(x)
    return(sub(x, 1, (length(x) - 1)))
  end
  function hd(l)
    return(l[1])
  end
  function tl(l)
    return(sub(l, 1))
  end
  function add(l, x)
    return((table.insert)(l, x))
  end
  function drop(l)
    return((table.remove)(l))
  end
  function last(l)
    return(l[((length(l) - 1) + 1)])
  end
  function reverse(l)
    local l1 = {}
    local i = (length(l) - 1)
    while (i >= 0) do
      add(l1, l[(i + 1)])
      i = (i - 1)
    end
    return(l1)
  end
  function join(l1, l2)
    if nil63(l1) then
      return(l2)
    elseif nil63(l2) then
      return(l1)
    else
      local l = {}
      local skip63 = false
      if (not skip63) then
        local i = 0
        local len = length(l1)
        while (i < len) do
          l[(i + 1)] = l1[(i + 1)]
          i = (i + 1)
        end
        while (i < (len + length(l2))) do
          l[(i + 1)] = l2[((i - len) + 1)]
          i = (i + 1)
        end
      end
      local k = nil
      local _g84 = l1
      for k in next, _g84 do
        if (not number63(k)) then
          local v = _g84[k]
          l[k] = v
        end
      end
      local _g86 = nil
      local _g85 = l2
      for _g86 in next, _g85 do
        if (not number63(_g86)) then
          local v = _g85[_g86]
          l[_g86] = v
        end
      end
      return(l)
    end
  end
  function reduce(f, x)
    if empty63(x) then
      return(x)
    elseif (length(x) == 1) then
      return(hd(x))
    else
      return(f(hd(x), reduce(f, tl(x))))
    end
  end
  function keep(f, l)
    local l1 = {}
    local _g88 = 0
    local _g87 = l
    while (_g88 < length(_g87)) do
      local x = _g87[(_g88 + 1)]
      if f(x) then
        add(l1, x)
      end
      _g88 = (_g88 + 1)
    end
    return(l1)
  end
  function find(f, l)
    local _g90 = 0
    local _g89 = l
    while (_g90 < length(_g89)) do
      local x = _g89[(_g90 + 1)]
      local x = f(x)
      if x then
        return(x)
      end
      _g90 = (_g90 + 1)
    end
  end
  function pairwise(l)
    local i = 0
    local l1 = {}
    while (i < length(l)) do
      add(l1, {l[(i + 1)], l[((i + 1) + 1)]})
      i = (i + 2)
    end
    return(l1)
  end
  function iterate(f, count)
    local i = 0
    while (i < count) do
      f(i)
      i = (i + 1)
    end
  end
  function replicate(n, x)
    local l = {}
    iterate(function ()
      return(add(l, x))
    end, n)
    return(l)
  end
  function splice(x)
    return({_splice = x})
  end
  function splice63(x)
    if table63(x) then
      return(x._splice)
    end
  end
  function map(f, l)
    local l1 = {}
    local _g100 = 0
    local _g99 = l
    while (_g100 < length(_g99)) do
      local x = _g99[(_g100 + 1)]
      local x1 = f(x)
      local s = splice63(x1)
      if list63(s) then
        l1 = join(l1, s)
      elseif is63(s) then
        add(l1, s)
      elseif is63(x1) then
        add(l1, x1)
      end
      _g100 = (_g100 + 1)
    end
    return(l1)
  end
  function map42(f, t)
    local l = map(f, t)
    local k = nil
    local _g101 = t
    for k in next, _g101 do
      if (not number63(k)) then
        local v = _g101[k]
        local x = f(v)
        if is63(x) then
          l[k] = x
        end
      end
    end
    return(l)
  end
  function mapt(f, t)
    local t1 = {}
    local k = nil
    local _g102 = t
    for k in next, _g102 do
      if (not number63(k)) then
        local v = _g102[k]
        local x = f(k, v)
        if is63(x) then
          t1[k] = x
        end
      end
    end
    return(t1)
  end
  function mapo(f, t)
    local o = {}
    local k = nil
    local _g103 = t
    for k in next, _g103 do
      if (not number63(k)) then
        local v = _g103[k]
        local x = f(k, v)
        if is63(x) then
          add(o, k)
          add(o, x)
        end
      end
    end
    return(o)
  end
  function keys63(t)
    local k63 = false
    local k = nil
    local _g104 = t
    for k in next, _g104 do
      if (not number63(k)) then
        local v = _g104[k]
        k63 = true
        break
      end
    end
    return(k63)
  end
  function extend(t, ...)
    local xs = unstash({...})
    local _g105 = sub(xs, 0)
    return(join(t, _g105))
  end
  function exclude(t, ...)
    local keys = unstash({...})
    local _g106 = sub(keys, 0)
    local t1 = sublist(t)
    local k = nil
    local _g107 = t
    for k in next, _g107 do
      if (not number63(k)) then
        local v = _g107[k]
        if (not _g106[k]) then
          t1[k] = v
        end
      end
    end
    return(t1)
  end
  function char(str, n)
    return(sub(str, n, (n + 1)))
  end
  function code(str, n)
    return((string.byte)(str, (function ()
      if n then
        return((n + 1))
      end
    end)()))
  end
  function search(str, pattern, start)
    local _g108 = (function ()
      if start then
        return((start + 1))
      end
    end)()
    local i = (string.find)(str, pattern, start, true)
    return((i and (i - 1)))
  end
  function split(str, sep)
    if ((str == "") or (sep == "")) then
      return({})
    else
      local strs = {}
      while true do
        local i = search(str, sep)
        if nil63(i) then
          break
        else
          add(strs, sub(str, 0, i))
          str = sub(str, (i + 1))
        end
      end
      add(strs, str)
      return(strs)
    end
  end
  function cat(...)
    local xs = unstash({...})
    local _g109 = sub(xs, 0)
    if empty63(_g109) then
      return("")
    else
      return(reduce(function (a, b)
        return((a .. b))
      end, _g109))
    end
  end
  function _43(...)
    local xs = unstash({...})
    local _g112 = sub(xs, 0)
    return(reduce(function (a, b)
      return((a + b))
    end, _g112))
  end
  function _(...)
    local xs = unstash({...})
    local _g113 = sub(xs, 0)
    return(reduce(function (a, b)
      return((b - a))
    end, reverse(_g113)))
  end
  function _42(...)
    local xs = unstash({...})
    local _g114 = sub(xs, 0)
    return(reduce(function (a, b)
      return((a * b))
    end, _g114))
  end
  function _47(...)
    local xs = unstash({...})
    local _g115 = sub(xs, 0)
    return(reduce(function (a, b)
      return((b / a))
    end, reverse(_g115)))
  end
  function _37(...)
    local xs = unstash({...})
    local _g116 = sub(xs, 0)
    return(reduce(function (a, b)
      return((b % a))
    end, reverse(_g116)))
  end
  function _62(a, b)
    return((a > b))
  end
  function _60(a, b)
    return((a < b))
  end
  function _61(a, b)
    return((a == b))
  end
  function _6261(a, b)
    return((a >= b))
  end
  function _6061(a, b)
    return((a <= b))
  end
  function read_file(path)
    local f = (io.open)(path)
    return((f.read)(f, "*a"))
  end
  function write_file(path, data)
    local f = (io.open)(path, "w")
    return((f.write)(f, data))
  end
  function write(x)
    return((io.write)(x))
  end
  function exit(code)
    return((os.exit)(code))
  end
  function nil63(x)
    return((x == nil))
  end
  function is63(x)
    return((not nil63(x)))
  end
  function string63(x)
    return((type(x) == "string"))
  end
  function string_literal63(x)
    return((string63(x) and (char(x, 0) == "\"")))
  end
  function id_literal63(x)
    return((string63(x) and (char(x, 0) == "|")))
  end
  function number63(x)
    return((type(x) == "number"))
  end
  function boolean63(x)
    return((type(x) == "boolean"))
  end
  function function63(x)
    return((type(x) == "function"))
  end
  function composite63(x)
    return((type(x) == "table"))
  end
  function atom63(x)
    return((not composite63(x)))
  end
  function table63(x)
    return((composite63(x) and nil63(hd(x))))
  end
  function list63(x)
    return((composite63(x) and is63(hd(x))))
  end
  function parse_number(str)
    return(tonumber(str))
  end
  function to_string(x)
    if nil63(x) then
      return("nil")
    elseif boolean63(x) then
      if x then
        return("true")
      else
        return("false")
      end
    elseif function63(x) then
      return("#<function>")
    elseif atom63(x) then
      return((x .. ""))
    else
      local str = "("
      local x1 = sub(x)
      local k = nil
      local _g117 = x
      for k in next, _g117 do
        if (not number63(k)) then
          local v = _g117[k]
          add(x1, (k .. ":"))
          add(x1, v)
        end
      end
      local i = 0
      local _g118 = x1
      while (i < length(_g118)) do
        local y = _g118[(i + 1)]
        str = (str .. to_string(y))
        if (i < (length(x1) - 1)) then
          str = (str .. " ")
        end
        i = (i + 1)
      end
      return((str .. ")"))
    end
  end
  function apply(f, args)
    local _g119 = stash(args)
    return(f(unpack(_g119)))
  end
  id_count = 0
  function make_id()
    id_count = (id_count + 1)
    return(("_g" .. id_count))
  end
  _g121 = {}
  exports.lib = _g121
  _g121["cat"] = cat
  _g121.apply = apply
  _g121["<="] = _6061
  _g121.pairwise = pairwise
  _g121["*"] = _42
  _g121[">"] = _62
  _g121.setenv = setenv
  _g121["special?"] = special63
  _g121.mapt = mapt
  _g121["special-form?"] = special_form63
  _g121["="] = _61
  _g121.macroexpand = macroexpand
  _g121["number?"] = number63
  _g121["to-string"] = to_string
  _g121.unstash = unstash
  _g121.hd = hd
  _g121.find = find
  _g121.replicate = replicate
  _g121["%"] = _37
  _g121["read-file"] = read_file
  _g121["id-literal?"] = id_literal63
  _g121["string-literal?"] = string_literal63
  _g121.write = write
  _g121.search = search
  _g121["make-id"] = make_id
  _g121.reverse = reverse
  _g121.split = split
  _g121["empty?"] = empty63
  _g121["+"] = _43
  _g121["stash*"] = stash42
  _g121.length = length
  _g121.sub = sub
  _g121.iterate = iterate
  _g121.exclude = exclude
  _g121.extend = extend
  _g121.tl = tl
  _g121.quoted = quoted
  _g121["/"] = _47
  _g121["write-file"] = write_file
  _g121["table?"] = table63
  _g121.map = map
  _g121["string?"] = string63
  _g121.print = print
  _g121["-"] = _
  _g121["boolean?"] = boolean63
  _g121["keys?"] = keys63
  _g121["composite?"] = composite63
  _g121.getenv = getenv
  _g121.join = join
  _g121.last = last
  _g121.code = code
  _g121[">="] = _6261
  _g121["parse-number"] = parse_number
  _g121.mapo = mapo
  _g121["function?"] = function63
  _g121.char = char
  _g121["atom?"] = atom63
  _g121.drop = drop
  _g121.inner = inner
  _g121.reduce = reduce
  _g121.keep = keep
  _g121.splice = splice
  _g121["nil?"] = nil63
  _g121.add = add
  _g121["map*"] = map42
  _g121["list?"] = list63
  _g121["is?"] = is63
  _g121.type = type
  _g121.target = target
  _g121["<"] = _60
  _g121.exit = exit
end)();
(function ()
  delimiters = {["("] = true, [")"] = true, [";"] = true, ["\n"] = true}
  whitespace = {[" "] = true, ["\t"] = true, ["\n"] = true}
  function make_stream(str)
    return({pos = 0, string = str, len = length(str)})
  end
  function peek_char(s)
    if (s.pos < s.len) then
      return(char(s.string, s.pos))
    end
  end
  function read_char(s)
    local c = peek_char(s)
    if c then
      s.pos = (s.pos + 1)
      return(c)
    end
  end
  function skip_non_code(s)
    while true do
      local c = peek_char(s)
      if nil63(c) then
        break
      elseif whitespace[c] then
        read_char(s)
      elseif (c == ";") then
        while (c and (not (c == "\n"))) do
          c = read_char(s)
        end
        skip_non_code(s)
      else
        break
      end
    end
  end
  read_table = {}
  eof = {}
  function key63(atom)
    return((string63(atom) and (length(atom) > 1) and (char(atom, (length(atom) - 1)) == ":")))
  end
  function flag63(atom)
    return((string63(atom) and (length(atom) > 1) and (char(atom, 0) == ":")))
  end
  read_table[""] = function (s)
    local str = ""
    local dot63 = false
    while true do
      local c = peek_char(s)
      if (c and ((not whitespace[c]) and (not delimiters[c]))) then
        if (c == ".") then
          dot63 = true
        end
        str = (str .. c)
        read_char(s)
      else
        break
      end
    end
    local n = parse_number(str)
    if is63(n) then
      return(n)
    elseif (str == "true") then
      return(true)
    elseif (str == "false") then
      return(false)
    elseif (str == "_") then
      return(make_id())
    elseif dot63 then
      return(reduce(function (a, b)
        return({"get", b, {"quote", a}})
      end, reverse(split(str, "."))))
    else
      return(str)
    end
  end
  read_table["("] = function (s)
    read_char(s)
    local l = {}
    while true do
      skip_non_code(s)
      local c = peek_char(s)
      if (c and (not (c == ")"))) then
        local x = read(s)
        if key63(x) then
          local k = sub(x, 0, (length(x) - 1))
          local v = read(s)
          l[k] = v
        elseif flag63(x) then
          l[sub(x, 1)] = true
        else
          add(l, x)
        end
      elseif c then
        read_char(s)
        break
      else
        error(("Expected ) at " .. s.pos))
      end
    end
    return(l)
  end
  read_table[")"] = function (s)
    error(("Unexpected ) at " .. s.pos))
  end
  read_table["\""] = function (s)
    read_char(s)
    local str = "\""
    while true do
      local c = peek_char(s)
      if (c and (not (c == "\""))) then
        if (c == "\\") then
          str = (str .. read_char(s))
        end
        str = (str .. read_char(s))
      elseif c then
        read_char(s)
        break
      else
        error(("Expected \" at " .. s.pos))
      end
    end
    return((str .. "\""))
  end
  read_table["|"] = function (s)
    read_char(s)
    local str = "|"
    while true do
      local c = peek_char(s)
      if (c and (not (c == "|"))) then
        str = (str .. read_char(s))
      elseif c then
        read_char(s)
        break
      else
        error(("Expected | at " .. s.pos))
      end
    end
    return((str .. "|"))
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
    if (peek_char(s) == "@") then
      read_char(s)
      return({"unquote-splicing", read(s)})
    else
      return({"unquote", read(s)})
    end
  end
  function read(s)
    skip_non_code(s)
    local c = peek_char(s)
    if is63(c) then
      return(((read_table[c] or read_table[""]))(s))
    else
      return(eof)
    end
  end
  function read_all(s)
    local l = {}
    while true do
      local form = read(s)
      if (form == eof) then
        break
      end
      add(l, form)
    end
    return(l)
  end
  function read_from_string(str)
    return(read(make_stream(str)))
  end
  _g125 = {}
  exports.reader = _g125
  _g125["make-stream"] = make_stream
  _g125.read = read
  _g125["read-all"] = read_all
  _g125["read-from-string"] = read_from_string
end)();
(function ()
  infix = {common = {["+"] = true, ["-"] = true, ["%"] = true, ["*"] = true, ["/"] = true, ["<"] = true, [">"] = true, ["<="] = true, [">="] = true}, js = {["="] = "===", ["~="] = "!=", ["and"] = "&&", ["or"] = "||", ["cat"] = "+"}, lua = {["="] = "==", ["cat"] = "..", ["~="] = true, ["and"] = true, ["or"] = true}}
  function getop(op)
    local op1 = (infix.common[op] or infix[target][op])
    if (op1 == true) then
      return(op)
    else
      return(op1)
    end
  end
  function infix63(form)
    return((list63(form) and is63(getop(hd(form)))))
  end
  indent_level = 0
  function indentation()
    return(apply(cat, replicate(indent_level, "  ")))
  end
  function compile_args(args)
    local str = "("
    local i = 0
    local _g128 = args
    while (i < length(_g128)) do
      local arg = _g128[(i + 1)]
      str = (str .. compile(arg))
      if (i < (length(args) - 1)) then
        str = (str .. ", ")
      end
      i = (i + 1)
    end
    return((str .. ")"))
  end
  function compile_body(forms, ...)
    local _g129 = unstash({...})
    local tail63 = _g129["tail?"]
    local str = ""
    local i = 0
    local _g130 = forms
    while (i < length(_g130)) do
      local x = _g130[(i + 1)]
      local t63 = (tail63 and (i == (length(forms) - 1)))
      str = (str .. compile(x, {_stash = true, ["stmt?"] = true, ["tail?"] = t63}))
      i = (i + 1)
    end
    return(str)
  end
  function numeric63(n)
    return(((n > 47) and (n < 58)))
  end
  function valid_char63(n)
    return((numeric63(n) or ((n > 64) and (n < 91)) or ((n > 96) and (n < 123)) or (n == 95)))
  end
  function valid_id63(id)
    if empty63(id) then
      return(false)
    elseif special63(id) then
      return(false)
    elseif getop(id) then
      return(false)
    else
      local i = 0
      while (i < length(id)) do
        local n = code(id, i)
        local valid63 = valid_char63(n)
        if ((not valid63) or ((i == 0) and numeric63(n))) then
          return(false)
        end
        i = (i + 1)
      end
      return(true)
    end
  end
  function compile_id(id)
    local id1 = ""
    local i = 0
    while (i < length(id)) do
      local c = char(id, i)
      local n = code(c)
      local c1 = (function ()
        if (c == "-") then
          return("_")
        elseif valid_char63(n) then
          return(c)
        elseif (i == 0) then
          return(("_" .. n))
        else
          return(n)
        end
      end)()
      id1 = (id1 .. c1)
      i = (i + 1)
    end
    return(id1)
  end
  function compile_atom(x)
    if ((x == "nil") and (target == "lua")) then
      return(x)
    elseif (x == "nil") then
      return("undefined")
    elseif id_literal63(x) then
      return(inner(x))
    elseif string_literal63(x) then
      return(x)
    elseif string63(x) then
      return(compile_id(x))
    elseif boolean63(x) then
      if x then
        return("true")
      else
        return("false")
      end
    elseif number63(x) then
      return((x .. ""))
    else
      error("Unrecognized atom")
    end
  end
  function compile_call(form)
    if empty63(form) then
      return(compile_special({"%array"}))
    else
      local f = hd(form)
      local f1 = compile(f)
      local args = compile_args(stash42(tl(form)))
      if list63(f) then
        return(("(" .. f1 .. ")" .. args))
      elseif string63(f) then
        return((f1 .. args))
      else
        error("Invalid function call")
      end
    end
  end
  function compile_infix(_g131)
    local op = _g131[1]
    local args = sub(_g131, 1)
    local str = "("
    local op = getop(op)
    local i = 0
    local _g132 = args
    while (i < length(_g132)) do
      local arg = _g132[(i + 1)]
      if ((op == "-") and (length(args) == 1)) then
        str = (str .. op .. compile(arg))
      else
        str = (str .. compile(arg))
        if (i < (length(args) - 1)) then
          str = (str .. " " .. op .. " ")
        end
      end
      i = (i + 1)
    end
    return((str .. ")"))
  end
  function compile_branch(condition, body, first63, last63, tail63)
    local cond1 = compile(condition)
    local _g133 = (function ()
      indent_level = (indent_level + 1)
      local _g134 = compile(body, {_stash = true, ["stmt?"] = true, ["tail?"] = tail63})
      indent_level = (indent_level - 1)
      return(_g134)
    end)()
    local ind = indentation()
    local tr = (function ()
      if (last63 and (target == "lua")) then
        return((ind .. "end\n"))
      elseif last63 then
        return("\n")
      else
        return("")
      end
    end)()
    if (first63 and (target == "js")) then
      return((ind .. "if (" .. cond1 .. ") {\n" .. _g133 .. ind .. "}" .. tr))
    elseif first63 then
      return((ind .. "if " .. cond1 .. " then\n" .. _g133 .. tr))
    elseif (nil63(condition) and (target == "js")) then
      return((" else {\n" .. _g133 .. ind .. "}\n"))
    elseif nil63(condition) then
      return((ind .. "else\n" .. _g133 .. tr))
    elseif (target == "js") then
      return((" else if (" .. cond1 .. ") {\n" .. _g133 .. ind .. "}" .. tr))
    else
      return((ind .. "elseif " .. cond1 .. " then\n" .. _g133 .. tr))
    end
  end
  function compile_function(args, body, ...)
    local _g135 = unstash({...})
    local name = _g135.name
    local prefix = _g135.prefix
    local id = (function ()
      if name then
        return(compile(name))
      else
        return("")
      end
    end)()
    local prefix = (prefix or "")
    local args = compile_args(args)
    local body = (function ()
      indent_level = (indent_level + 1)
      local _g136 = compile_body(body, {_stash = true, ["tail?"] = true})
      indent_level = (indent_level - 1)
      return(_g136)
    end)()
    local ind = indentation()
    local tr = (function ()
      if name then
        return("end\n")
      else
        return("end")
      end
    end)()
    if (target == "js") then
      return(("function " .. id .. args .. " {\n" .. body .. ind .. "}"))
    else
      return((prefix .. "function " .. id .. args .. "\n" .. body .. ind .. tr))
    end
  end
  function terminator(stmt63)
    if (not stmt63) then
      return("")
    elseif (target == "js") then
      return(";\n")
    else
      return("\n")
    end
  end
  function compile_special(form, stmt63, tail63)
    local _g137 = getenv(hd(form))
    local special = _g137.special
    local stmt = _g137.stmt
    local self_tr63 = _g137.tr
    if ((not stmt63) and stmt) then
      return(compile({{"%function", {}, form}}, {_stash = true, ["tail?"] = tail63}))
    else
      local tr = terminator((stmt63 and (not self_tr63)))
      return((special(tl(form), tail63) .. tr))
    end
  end
  function can_return63(form)
    return(((not special_form63(form)) or (not getenv(hd(form)).stmt)))
  end
  function compile(form, ...)
    local _g181 = unstash({...})
    local stmt63 = _g181["stmt?"]
    local tail63 = _g181["tail?"]
    if (tail63 and can_return63(form)) then
      form = {"return", form}
    end
    if nil63(form) then
      return("")
    elseif special_form63(form) then
      return(compile_special(form, stmt63, tail63))
    else
      local tr = terminator(stmt63)
      local ind = (function ()
        if stmt63 then
          return(indentation())
        else
          return("")
        end
      end)()
      local form = (function ()
        if atom63(form) then
          return(compile_atom(form))
        elseif infix63(form) then
          return(compile_infix(form))
        else
          return(compile_call(form))
        end
      end)()
      return((ind .. form .. tr))
    end
  end
  function compile_toplevel(form)
    return(compile(macroexpand(form), {_stash = true, ["stmt?"] = true}))
  end
  function encapsulate(body)
    local form = join({"do"}, join(body, {{"%export"}}))
    return({{"%function", {}, macroexpand(form)}})
  end
  function compile_file(file)
    local str = read_file(file)
    local body = read_all(make_stream(str))
    local form = encapsulate(body)
    return((compile(form) .. ";\n"))
  end
  compiler_output = nil
  compilation_level = nil
  function compile_module(spec)
    compilation_level = 0
    compiler_output = ""
    return(load_module(spec))
  end
  run_result = nil
  function run(x)
    local f = load((compile("run-result") .. "=" .. x))
    if f then
      f()
      return(run_result)
    else
      local f,e = load(x)
      if f then
        return(f())
      else
        error((e .. " in " .. x))
      end
    end
  end
  function eval(form)
    local previous = target
    target = "lua"
    local str = compile(macroexpand(form))
    target = previous
    return(run(str))
  end
  current_module = nil
  function initial_environment()
    return({{["define-module"] = getenv("define-module")}})
  end
  function module_key(spec)
    if atom63(spec) then
      return(to_string(spec))
    else
      error("Unsupported module specification")
    end
  end
  function module(spec)
    return(modules[module_key(spec)])
  end
  function module_path(spec)
    return((module_key(spec) .. ".l"))
  end
  function load_module(spec)
    if (nil63(module(spec)) or (compilation_level == 1)) then
      _37compile_module(spec)
    end
    return(open_module(spec))
  end
  function _37compile_module(spec)
    local path = module_path(spec)
    local mod0 = current_module
    local env0 = environment
    local k = module_key(spec)
    if number63(compilation_level) then
      compilation_level = (compilation_level + 1)
    end
    current_module = spec
    environment = initial_environment()
    local compiled = compile_file(path)
    local m = module(spec)
    local toplevel = hd(environment)
    current_module = mod0
    environment = env0
    local name = nil
    local _g189 = toplevel
    for name in next, _g189 do
      if (not number63(name)) then
        local binding = _g189[name]
        if (binding.export and (binding.module == k)) then
          m.export[name] = binding
        end
      end
    end
    if number63(compilation_level) then
      compilation_level = (compilation_level - 1)
      compiler_output = (compiler_output .. compiled)
    else
      return(run(compiled))
    end
  end
  function open_module(spec)
    local m = module(spec)
    local frame = last(environment)
    local k = nil
    local _g190 = m.export
    for k in next, _g190 do
      if (not number63(k)) then
        local v = _g190[k]
        frame[k] = v
      end
    end
  end
  function in_module(spec)
    load_module(spec)
    local m = module(spec)
    return(map(open_module, m.import))
  end
  function quote_binding(b)
    b = extend(b, {_stash = true, module = {"quote", b.module}})
    if is63(b.symbol) then
      return(extend(b, {_stash = true, symbol = {"quote", b.symbol}}))
    elseif (b.macro and b.form) then
      return(exclude(extend(b, {_stash = true, macro = b.form}), {_stash = true, form = true}))
    elseif (b.special and b.form) then
      return(exclude(extend(b, {_stash = true, special = b.form}), {_stash = true, form = true}))
    elseif is63(b.variable) then
      return(b)
    end
  end
  function quote_frame(t)
    return(join({"%object"}, mapo(function (_g127, b)
      return(join({"table"}, quote_binding(b)))
    end, t)))
  end
  function quote_environment(env)
    return(join({"list"}, map(quote_frame, env)))
  end
  function quote_module(m)
    local _g191 = {"table"}
    _g191.import = quoted(m.import)
    _g191.export = quote_frame(m.export)
    return(_g191)
  end
  function quote_modules()
    return(join({"table"}, map42(quote_module, modules)))
  end
  _g192 = {}
  exports.compiler = _g192
  _g192["compile-toplevel"] = compile_toplevel
  _g192["quote-modules"] = quote_modules
  _g192["load-module"] = load_module
  _g192["current-module"] = current_module
  _g192["quote-environment"] = quote_environment
  _g192["compiler-output"] = compiler_output
  _g192.compile = compile
  _g192["initial-environment"] = initial_environment
  _g192["in-module"] = in_module
  _g192["open-module"] = open_module
  _g192.eval = eval
  _g192["compile-module"] = compile_module
end)();
(function ()
  modules = {compiler = {import = {"reader", "lib", "compiler"}, export = {["define-module"] = {export = true, module = "compiler", macro = function (spec, ...)
    local body = unstash({...})
    local _g193 = sub(body, 0)
    local imp = _g193.import
    local exp = _g193.export
    map(load_module, imp)
    modules[module_key(spec)] = {import = imp, export = {}}
    local _g195 = 0
    local _g194 = (exp or {})
    while (_g195 < length(_g194)) do
      local k = _g194[(_g195 + 1)]
      setenv(k, {_stash = true, export = true})
      _g195 = (_g195 + 1)
    end
  end}, ["compile-toplevel"] = {variable = true, export = true, module = "compiler"}, ["quote-modules"] = {variable = true, export = true, module = "compiler"}, ["load-module"] = {variable = true, export = true, module = "compiler"}, ["not"] = {special = function (_g196)
    local x = _g196[1]
    local x = compile(x)
    local open = (function ()
      if (target == "js") then
        return("!(")
      else
        return("(not ")
      end
    end)()
    return((open .. x .. ")"))
  end, export = true, module = "compiler"}, ["current-module"] = {variable = true, export = true, module = "compiler"}, ["get"] = {special = function (_g197)
    local t = _g197[1]
    local k = _g197[2]
    local t = compile(t)
    local k1 = compile(k)
    if ((target == "lua") and (char(t, 0) == "{")) then
      t = ("(" .. t .. ")")
    end
    if (string_literal63(k) and valid_id63(inner(k))) then
      return((t .. "." .. inner(k)))
    else
      return((t .. "[" .. k1 .. "]"))
    end
  end, export = true, module = "compiler"}, ["return"] = {special = function (_g198)
    local x = _g198[1]
    local x = (function ()
      if nil63(x) then
        return("return")
      else
        return(compile_call({"return", x}))
      end
    end)()
    return((indentation() .. x))
  end, export = true, stmt = true, module = "compiler"}, ["%local"] = {special = function (_g199)
    local name = _g199[1]
    local value = _g199[2]
    local id = compile(name)
    local value = compile(value)
    local keyword = (function ()
      if (target == "js") then
        return("var ")
      else
        return("local ")
      end
    end)()
    local ind = indentation()
    return((ind .. keyword .. id .. " = " .. value))
  end, export = true, stmt = true, module = "compiler"}, ["%array"] = {special = function (forms)
    local open = (function ()
      if (target == "lua") then
        return("{")
      else
        return("[")
      end
    end)()
    local close = (function ()
      if (target == "lua") then
        return("}")
      else
        return("]")
      end
    end)()
    local str = ""
    local i = 0
    local _g200 = forms
    while (i < length(_g200)) do
      local x = _g200[(i + 1)]
      str = (str .. compile(x))
      if (i < (length(forms) - 1)) then
        str = (str .. ", ")
      end
      i = (i + 1)
    end
    return((open .. str .. close))
  end, export = true, module = "compiler"}, ["break"] = {special = function (_g126)
    return((indentation() .. "break"))
  end, export = true, stmt = true, module = "compiler"}, ["error"] = {special = function (_g201)
    local x = _g201[1]
    local e = (function ()
      if (target == "js") then
        return(("throw " .. compile(x)))
      else
        return(compile_call({"error", x}))
      end
    end)()
    return((indentation() .. e))
  end, export = true, stmt = true, module = "compiler"}, ["do"] = {tr = true, stmt = true, special = function (forms, tail63)
    return(compile_body(forms, {_stash = true, ["tail?"] = tail63}))
  end, export = true, module = "compiler"}, ["quote-environment"] = {variable = true, export = true, module = "compiler"}, ["compiler-output"] = {variable = true, export = true, module = "compiler"}, compile = {variable = true, export = true, module = "compiler"}, ["with-indent"] = {export = true, module = "compiler", macro = function (form)
    local result = make_id()
    return({"do", {"inc", "indent-level"}, {"let", {result, form}, {"dec", "indent-level"}, result}})
  end}, ["%global-function"] = {tr = true, stmt = true, special = function (_g202)
    local name = _g202[1]
    local args = _g202[2]
    local body = sub(_g202, 2)
    if (target == "lua") then
      local x = compile_function(args, body, {_stash = true, name = name})
      return((indentation() .. x))
    else
      return(compile({"set", name, join({"%function", args}, body)}, {_stash = true, ["stmt?"] = true}))
    end
  end, export = true, module = "compiler"}, ["while"] = {tr = true, stmt = true, special = function (_g203)
    local condition = _g203[1]
    local body = sub(_g203, 1)
    local condition = compile(condition)
    local body = (function ()
      indent_level = (indent_level + 1)
      local _g204 = compile_body(body)
      indent_level = (indent_level - 1)
      return(_g204)
    end)()
    local ind = indentation()
    if (target == "js") then
      return((ind .. "while (" .. condition .. ") {\n" .. body .. ind .. "}\n"))
    else
      return((ind .. "while " .. condition .. " do\n" .. body .. ind .. "end\n"))
    end
  end, export = true, module = "compiler"}, ["initial-environment"] = {variable = true, export = true, module = "compiler"}, ["in-module"] = {variable = true, export = true, module = "compiler"}, ["set"] = {special = function (_g205)
    local lh = _g205[1]
    local rh = _g205[2]
    if nil63(rh) then
      error("Missing right-hand side in assignment")
    end
    return((indentation() .. compile(lh) .. " = " .. compile(rh)))
  end, export = true, stmt = true, module = "compiler"}, ["%try"] = {tr = true, stmt = true, special = function (forms)
    local ind = indentation()
    local body = (function ()
      indent_level = (indent_level + 1)
      local _g206 = compile_body(forms, {_stash = true, ["tail?"] = true})
      indent_level = (indent_level - 1)
      return(_g206)
    end)()
    local e = make_id()
    local handler = {"return", {"%array", false, e}}
    local h = (function ()
      indent_level = (indent_level + 1)
      local _g207 = compile(handler, {_stash = true, ["stmt?"] = true})
      indent_level = (indent_level - 1)
      return(_g207)
    end)()
    return((ind .. "try {\n" .. body .. ind .. "}\n" .. ind .. "catch (" .. e .. ") {\n" .. h .. ind .. "}\n"))
  end, export = true, module = "compiler"}, ["open-module"] = {variable = true, export = true, module = "compiler"}, ["%object"] = {special = function (forms)
    local str = "{"
    local sep = (function ()
      if (target == "lua") then
        return(" = ")
      else
        return(": ")
      end
    end)()
    local pairs = pairwise(forms)
    local i = 0
    local _g208 = pairs
    while (i < length(_g208)) do
      local _g209 = _g208[(i + 1)]
      local k = _g209[1]
      local v = _g209[2]
      if (not string63(k)) then
        error(("Illegal key: " .. to_string(k)))
      end
      local v = compile(v)
      local k = (function ()
        if valid_id63(k) then
          return(k)
        elseif ((target == "js") and string_literal63(k)) then
          return(k)
        elseif (target == "js") then
          return(quoted(k))
        elseif string_literal63(k) then
          return(("[" .. k .. "]"))
        else
          return(("[" .. quoted(k) .. "]"))
        end
      end)()
      str = (str .. k .. sep .. v)
      if (i < (length(pairs) - 1)) then
        str = (str .. ", ")
      end
      i = (i + 1)
    end
    return((str .. "}"))
  end, export = true, module = "compiler"}, eval = {variable = true, export = true, module = "compiler"}, ["if"] = {tr = true, stmt = true, special = function (form, tail63)
    local str = ""
    local i = 0
    local _g210 = form
    while (i < length(_g210)) do
      local condition = _g210[(i + 1)]
      local last63 = (i >= (length(form) - 2))
      local else63 = (i == (length(form) - 1))
      local first63 = (i == 0)
      local body = form[((i + 1) + 1)]
      if else63 then
        body = condition
        condition = nil
      end
      str = (str .. compile_branch(condition, body, first63, last63, tail63))
      i = (i + 1)
      i = (i + 1)
    end
    return(str)
  end, export = true, module = "compiler"}, ["%for"] = {tr = true, stmt = true, special = function (_g211)
    local _g212 = _g211[1]
    local t = _g212[1]
    local k = _g212[2]
    local body = sub(_g211, 1)
    local t = compile(t)
    local ind = indentation()
    local body = (function ()
      indent_level = (indent_level + 1)
      local _g213 = compile_body(body)
      indent_level = (indent_level - 1)
      return(_g213)
    end)()
    if (target == "lua") then
      return((ind .. "for " .. k .. " in next, " .. t .. " do\n" .. body .. ind .. "end\n"))
    else
      return((ind .. "for (" .. k .. " in " .. t .. ") {\n" .. body .. ind .. "}\n"))
    end
  end, export = true, module = "compiler"}, ["%local-function"] = {tr = true, stmt = true, special = function (_g214)
    local name = _g214[1]
    local args = _g214[2]
    local body = sub(_g214, 2)
    local x = compile_function(args, body, {_stash = true, name = name, prefix = "local "})
    return((indentation() .. x))
  end, export = true, module = "compiler"}, ["compile-module"] = {variable = true, export = true, module = "compiler"}, ["%function"] = {special = function (_g215)
    local args = _g215[1]
    local body = sub(_g215, 1)
    return(compile_function(args, body))
  end, export = true, module = "compiler"}}}, boot = {import = {"lib", "compiler"}, export = {}}, reader = {import = {"lib", "compiler"}, export = {["make-stream"] = {export = true, module = "reader", variable = true}, ["define-reader"] = {export = true, module = "reader", macro = function (_g216, ...)
    local char = _g216[1]
    local stream = _g216[2]
    local body = unstash({...})
    local _g217 = sub(body, 0)
    return({"set", {"get", "read-table", char}, join({"fn", {stream}}, _g217)})
  end}, read = {export = true, module = "reader", variable = true}, ["read-all"] = {export = true, module = "reader", variable = true}, ["read-from-string"] = {export = true, module = "reader", variable = true}}}, lib = {import = {"lib", "compiler"}, export = {["cat"] = {variable = true, export = true, module = "lib"}, apply = {variable = true, export = true, module = "lib"}, ["define-symbol"] = {export = true, module = "lib", macro = function (name, expansion)
    setenv(name, {_stash = true, symbol = expansion})
    return(nil)
  end}, ["<="] = {variable = true, export = true, module = "lib"}, pairwise = {variable = true, export = true, module = "lib"}, ["set-of"] = {export = true, module = "lib", macro = function (...)
    local elements = unstash({...})
    local l = {}
    local _g219 = 0
    local _g218 = elements
    while (_g219 < length(_g218)) do
      local e = _g218[(_g219 + 1)]
      l[e] = true
      _g219 = (_g219 + 1)
    end
    return(join({"table"}, l))
  end}, ["%export"] = {export = true, module = "lib", macro = function ()
    local toplevel = hd(environment)
    local m = make_id()
    local k = module_key(current_module)
    local form = {"do", {"define", m, {"table"}}, {"set", {"get", "exports", {"quote", k}}, m}}
    local k = nil
    local _g220 = toplevel
    for k in next, _g220 do
      if (not number63(k)) then
        local v = _g220[k]
        if (v.variable and v.export and (v.module == current_module)) then
          add(form, {"set", {"get", m, {"quote", k}}, k})
        end
      end
    end
    return(form)
  end}, let = {export = true, module = "lib", macro = function (bindings, ...)
    local body = unstash({...})
    local _g221 = sub(body, 0)
    local i = 0
    local renames = {}
    local locals = {}
    map(function (_g222)
      local lh = _g222[1]
      local rh = _g222[2]
      local _g224 = 0
      local _g223 = bind(lh, rh)
      while (_g224 < length(_g223)) do
        local _g225 = _g223[(_g224 + 1)]
        local id = _g225[1]
        local val = _g225[2]
        if bound63(id) then
          local rename = make_id()
          add(renames, id)
          add(renames, rename)
          id = rename
        else
          setenv(id, {_stash = true, variable = true})
        end
        add(locals, {"%local", id, val})
        _g224 = (_g224 + 1)
      end
    end, pairwise(bindings))
    return(join({"do"}, join(locals, {join({"let-symbol", renames}, _g221)})))
  end}, language = {export = true, module = "lib", macro = function ()
    return({"quote", target})
  end}, ["*"] = {variable = true, export = true, module = "lib"}, [">"] = {variable = true, export = true, module = "lib"}, setenv = {variable = true, export = true, module = "lib"}, ["special?"] = {variable = true, export = true, module = "lib"}, mapt = {variable = true, export = true, module = "lib"}, ["special-form?"] = {variable = true, export = true, module = "lib"}, ["="] = {variable = true, export = true, module = "lib"}, pr = {export = true, module = "lib", macro = function (...)
    local xs = unstash({...})
    local xs = map(function (x)
      return(splice({{"to-string", x}, "\" \""}))
    end, xs)
    return({"print", join({"cat"}, xs)})
  end}, macroexpand = {variable = true, export = true, module = "lib"}, ["number?"] = {variable = true, export = true, module = "lib"}, ["to-string"] = {variable = true, export = true, module = "lib"}, inc = {export = true, module = "lib", macro = function (n, by)
    return({"set", n, {"+", n, (by or 1)}})
  end}, unstash = {variable = true, export = true, module = "lib"}, hd = {variable = true, export = true, module = "lib"}, find = {variable = true, export = true, module = "lib"}, replicate = {variable = true, export = true, module = "lib"}, quasiquote = {export = true, module = "lib", macro = function (form)
    return(quasiexpand(form, 1))
  end}, ["%"] = {variable = true, export = true, module = "lib"}, ["read-file"] = {variable = true, export = true, module = "lib"}, ["id-literal?"] = {variable = true, export = true, module = "lib"}, ["string-literal?"] = {variable = true, export = true, module = "lib"}, ["define-global"] = {export = true, module = "lib", macro = function (name, x, ...)
    local body = unstash({...})
    local _g226 = sub(body, 0)
    setenv(name, {_stash = true, variable = true})
    if (not empty63(_g226)) then
      local _g227 = bind_arguments(x, _g226)
      local args = _g227[1]
      local _g228 = _g227[2]
      return(join({"%global-function", name, args}, _g228))
    else
      return({"set", name, x})
    end
  end}, write = {variable = true, export = true, module = "lib"}, quote = {export = true, module = "lib", macro = function (form)
    return(quoted(form))
  end}, search = {variable = true, export = true, module = "lib"}, ["with-frame"] = {export = true, module = "lib", macro = function (...)
    local body = unstash({...})
    local x = make_id()
    return({"do", {"add", "environment", {"table"}}, {"let", {x, join({"do"}, body)}, {"drop", "environment"}, x}})
  end}, ["make-id"] = {variable = true, export = true, module = "lib"}, guard = {export = true, module = "lib", macro = function (expr)
    if (target == "js") then
      return({{"fn", {}, {"%try", {"list", true, expr}}}})
    else
      local e = make_id()
      local x = make_id()
      local ex = ("|" .. e .. "," .. x .. "|")
      return({"let", {ex, {"xpcall", {"fn", {}, expr}, "message-handler"}}, {"list", e, x}})
    end
  end}, reverse = {variable = true, export = true, module = "lib"}, ["list*"] = {export = true, module = "lib", macro = function (...)
    local xs = unstash({...})
    if empty63(xs) then
      return({})
    else
      local l = {}
      local i = 0
      local _g229 = xs
      while (i < length(_g229)) do
        local x = _g229[(i + 1)]
        if (i == (length(xs) - 1)) then
          l = {"join", join({"list"}, l), x}
        else
          add(l, x)
        end
        i = (i + 1)
      end
      return(l)
    end
  end}, split = {variable = true, export = true, module = "lib"}, ["empty?"] = {variable = true, export = true, module = "lib"}, ["+"] = {variable = true, export = true, module = "lib"}, ["define-special"] = {export = true, module = "lib", macro = function (name, args, ...)
    local body = unstash({...})
    local _g230 = sub(body, 0)
    local form = join({"fn", args}, _g230)
    local keys = sub(_g230, length(_g230))
    eval(join((function ()
      local _g231 = {"setenv", {"quote", name}}
      _g231.special = form
      _g231.form = {"quote", form}
      return(_g231)
    end)(), keys))
    return(nil)
  end}, ["let-macro"] = {export = true, module = "lib", macro = function (definitions, ...)
    local body = unstash({...})
    local _g232 = sub(body, 0)
    add(environment, {})
    local _g233 = (function ()
      map(function (m)
        return(macroexpand(join({"define-macro"}, m)))
      end, definitions)
      return(join({"do"}, macroexpand(_g232)))
    end)()
    drop(environment)
    return(_g233)
  end}, ["stash*"] = {variable = true, export = true, module = "lib"}, ["define-local"] = {export = true, module = "lib", macro = function (name, x, ...)
    local body = unstash({...})
    local _g234 = sub(body, 0)
    setenv(name, {_stash = true, variable = true})
    if (not empty63(_g234)) then
      local _g235 = bind_arguments(x, _g234)
      local args = _g235[1]
      local _g236 = _g235[2]
      return(join({"%local-function", name, args}, _g236))
    else
      return({"%local", name, x})
    end
  end}, length = {variable = true, export = true, module = "lib"}, sub = {variable = true, export = true, module = "lib"}, iterate = {variable = true, export = true, module = "lib"}, at = {export = true, module = "lib", macro = function (l, i)
    if ((target == "lua") and number63(i)) then
      i = (i + 1)
    elseif (target == "lua") then
      i = {"+", i, 1}
    end
    return({"get", l, i})
  end}, ["join*"] = {export = true, module = "lib", macro = function (...)
    local xs = unstash({...})
    return(reduce(function (a, b)
      return({"join", a, b})
    end, xs))
  end}, across = {export = true, module = "lib", macro = function (_g237, ...)
    local l = _g237[1]
    local v = _g237[2]
    local i = _g237[3]
    local start = _g237[4]
    local body = unstash({...})
    local _g238 = sub(body, 0)
    local l1 = make_id()
    i = (i or make_id())
    start = (start or 0)
    return({"let", {i, start, l1, l}, {"while", {"<", i, {"length", l1}}, join({"let", {v, {"at", l1, i}}}, join(_g238, {{"inc", i}}))}})
  end}, exclude = {variable = true, export = true, module = "lib"}, extend = {variable = true, export = true, module = "lib"}, tl = {variable = true, export = true, module = "lib"}, quoted = {variable = true, export = true, module = "lib"}, ["let-symbol"] = {export = true, module = "lib", macro = function (expansions, ...)
    local body = unstash({...})
    local _g239 = sub(body, 0)
    add(environment, {})
    local _g240 = (function ()
      map(function (_g241)
        local name = _g241[1]
        local exp = _g241[2]
        return(macroexpand({"define-symbol", name, exp}))
      end, pairwise(expansions))
      return(join({"do"}, macroexpand(_g239)))
    end)()
    drop(environment)
    return(_g240)
  end}, ["/"] = {variable = true, export = true, module = "lib"}, define = {export = true, module = "lib", macro = function (name, x, ...)
    local body = unstash({...})
    local _g242 = sub(body, 0)
    setenv(name, {_stash = true, variable = true})
    return(join({"define-global", name, x}, _g242))
  end}, ["write-file"] = {variable = true, export = true, module = "lib"}, ["table?"] = {variable = true, export = true, module = "lib"}, map = {variable = true, export = true, module = "lib"}, ["string?"] = {variable = true, export = true, module = "lib"}, print = {variable = true, export = true, module = "lib"}, ["-"] = {variable = true, export = true, module = "lib"}, ["boolean?"] = {variable = true, export = true, module = "lib"}, ["keys?"] = {variable = true, export = true, module = "lib"}, ["composite?"] = {variable = true, export = true, module = "lib"}, list = {export = true, module = "lib", macro = function (...)
    local body = unstash({...})
    local l = join({"%array"}, body)
    if (not keys63(body)) then
      return(l)
    else
      local id = make_id()
      local init = {}
      local k = nil
      local _g243 = body
      for k in next, _g243 do
        if (not number63(k)) then
          local v = _g243[k]
          add(init, {"set", {"get", id, {"quote", k}}, v})
        end
      end
      return(join({"let", {id, l}}, join(init, {id})))
    end
  end}, getenv = {variable = true, export = true, module = "lib"}, ["cat!"] = {export = true, module = "lib", macro = function (a, ...)
    local bs = unstash({...})
    local _g244 = sub(bs, 0)
    return({"set", a, join({"cat", a}, _g244)})
  end}, join = {variable = true, export = true, module = "lib"}, last = {variable = true, export = true, module = "lib"}, table = {export = true, module = "lib", macro = function (...)
    local body = unstash({...})
    return(join({"%object"}, mapo(function (_g2, x)
      return(x)
    end, body)))
  end}, code = {variable = true, export = true, module = "lib"}, [">="] = {variable = true, export = true, module = "lib"}, ["parse-number"] = {variable = true, export = true, module = "lib"}, mapo = {variable = true, export = true, module = "lib"}, ["function?"] = {variable = true, export = true, module = "lib"}, char = {variable = true, export = true, module = "lib"}, ["atom?"] = {variable = true, export = true, module = "lib"}, ["join!"] = {export = true, module = "lib", macro = function (a, ...)
    local bs = unstash({...})
    local _g245 = sub(bs, 0)
    return({"set", a, join({"join*", a}, _g245)})
  end}, ["with-bindings"] = {export = true, module = "lib", macro = function (_g246, ...)
    local names = _g246[1]
    local body = unstash({...})
    local _g247 = sub(body, 0)
    local x = make_id()
    return(join({"with-frame", {"across", {names, x}, (function ()
      local _g248 = {"setenv", x}
      _g248.variable = true
      return(_g248)
    end)()}}, _g247))
  end}, drop = {variable = true, export = true, module = "lib"}, inner = {variable = true, export = true, module = "lib"}, reduce = {variable = true, export = true, module = "lib"}, keep = {variable = true, export = true, module = "lib"}, dec = {export = true, module = "lib", macro = function (n, by)
    return({"set", n, {"-", n, (by or 1)}})
  end}, splice = {variable = true, export = true, module = "lib"}, ["nil?"] = {variable = true, export = true, module = "lib"}, add = {variable = true, export = true, module = "lib"}, each = {export = true, module = "lib", macro = function (_g249, ...)
    local t = _g249[1]
    local k = _g249[2]
    local v = _g249[3]
    local body = unstash({...})
    local _g250 = sub(body, 0)
    local t1 = make_id()
    return({"let", {k, "nil", t1, t}, {"%for", {t1, k}, {"if", (function ()
      local _g251 = {"target"}
      _g251.js = {"isNaN", {"parseInt", k}}
      _g251.lua = {"not", {"number?", k}}
      return(_g251)
    end)(), join({"let", {v, {"get", t1, k}}}, _g250)}}})
  end}, ["define-macro"] = {export = true, module = "lib", macro = function (name, args, ...)
    local body = unstash({...})
    local _g252 = sub(body, 0)
    local form = join({"fn", args}, _g252)
    eval((function ()
      local _g253 = {"setenv", {"quote", name}}
      _g253.macro = form
      _g253.form = {"quote", form}
      return(_g253)
    end)())
    return(nil)
  end}, fn = {export = true, module = "lib", macro = function (args, ...)
    local body = unstash({...})
    local _g254 = sub(body, 0)
    local _g255 = bind_arguments(args, _g254)
    local args = _g255[1]
    local _g256 = _g255[2]
    return(join({"%function", args}, _g256))
  end}, ["map*"] = {variable = true, export = true, module = "lib"}, ["list?"] = {variable = true, export = true, module = "lib"}, ["is?"] = {variable = true, export = true, module = "lib"}, type = {variable = true, export = true, module = "lib"}, target = {module = "lib", variable = true, export = true, macro = function (...)
    local clauses = unstash({...})
    return(clauses[target])
  end}, ["<"] = {variable = true, export = true, module = "lib"}, exit = {variable = true, export = true, module = "lib"}}}}
  environment = {{["define-module"] = {export = true, module = "compiler", macro = function (spec, ...)
    local body = unstash({...})
    local _g257 = sub(body, 0)
    local imp = _g257.import
    local exp = _g257.export
    map(load_module, imp)
    modules[module_key(spec)] = {import = imp, export = {}}
    local _g259 = 0
    local _g258 = (exp or {})
    while (_g259 < length(_g258)) do
      local k = _g258[(_g259 + 1)]
      setenv(k, {_stash = true, export = true})
      _g259 = (_g259 + 1)
    end
  end}}}
  _g260 = {}
  exports.boot = _g260
  _g260.environment = environment
  _g260.modules = modules
end)();
(function ()
  function rep(str)
    local _g261 = (function ()
      local _g262,_g263 = xpcall(function ()
        return(eval(read_from_string(str)))
      end, message_handler)
      return({_g262, _g263})
    end)()
    local _g1 = _g261[1]
    local x = _g261[2]
    if is63(x) then
      return(print((to_string(x) .. " ")))
    end
  end
  function repl()
    local step = function (str)
      rep(str)
      return(write("> "))
    end
    write("> ")
    while true do
      local str = (io.read)()
      if str then
        step(str)
      else
        break
      end
    end
  end
  function usage()
    print((to_string("usage: lumen [options] <module>") .. " "))
    print((to_string("options:") .. " "))
    print((to_string("  -o <output>\tOutput file") .. " "))
    print((to_string("  -t <target>\tTarget language (default: lua)") .. " "))
    print((to_string("  -e <expr>\tExpression to evaluate") .. " "))
    return(exit())
  end
  function main()
    local args = arg
    if ((hd(args) == "-h") or (hd(args) == "--help")) then
      usage()
    end
    local spec = nil
    local output = nil
    local target1 = nil
    local expr = nil
    local i = 0
    local _g264 = args
    while (i < length(_g264)) do
      local arg = _g264[(i + 1)]
      if ((arg == "-o") or (arg == "-t") or (arg == "-e")) then
        if (i == (length(args) - 1)) then
          print((to_string("missing argument for") .. " " .. to_string(arg) .. " "))
        else
          i = (i + 1)
          local val = args[(i + 1)]
          if (arg == "-o") then
            output = val
          elseif (arg == "-t") then
            target1 = val
          elseif (arg == "-e") then
            expr = val
          end
        end
      elseif (nil63(spec) and ("-" ~= char(arg, 0))) then
        spec = arg
      end
      i = (i + 1)
    end
    if output then
      if target1 then
        target = target1
      end
      compile_module(spec)
      return(write_file(output, compiler_output))
    else
      local spec = (spec or "main")
      in_module(spec)
      if expr then
        return(rep(expr))
      else
        return(repl())
      end
    end
  end
  main()
  _g265 = {}
  exports.main = _g265
end)();
