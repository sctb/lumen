(function ()
  nexus = {}
  return
end)();
(function ()
  function setenv(k, ...)
    local keys = unstash({...})
    local _g8 = sub(keys, 0)
    if string63(k) then
      local frame = last(environment)
      local x = (frame[k] or {})
      local k1 = nil
      local _g9 = _g8
      for k1 in next, _g9 do
        if (not number63(k1)) then
          local v = _g9[k1]
          x[k1] = v
        end
      end
      x.module = current_module
      frame[k] = x
    end
  end
  function getenv(k, ...)
    local keys = unstash({...})
    local _g10 = sub(keys, 0)
    if string63(k) then
      local b = find(function (e)
        return(e[k])
      end, reverse(environment))
      if table63(b) then
        local _g11 = keys63(_g10)
        if _g11 then
          return(b[_g11])
        else
          return(b)
        end
      end
    end
  end
  function macro_function(k)
    return(getenv(k, {_stash = true, macro = true}))
  end
  function macro63(k)
    return(is63(macro_function(k)))
  end
  function special63(k)
    return(is63(getenv(k, {_stash = true, special = true})))
  end
  function special_form63(form)
    return((list63(form) and special63(hd(form))))
  end
  function symbol_expansion(k)
    return(getenv(k, {_stash = true, symbol = true}))
  end
  function symbol63(k)
    return(is63(symbol_expansion(k)))
  end
  function variable63(k)
    local b = find(function (frame)
      return((frame[k] or frame._scope))
    end, reverse(environment))
    return((table63(b) and is63(b.variable)))
  end
  function global63(k)
    return(getenv(k, {_stash = true, global = true}))
  end
  function bound63(x)
    return((macro63(x) or special63(x) or symbol63(x) or variable63(x) or global63(x)))
  end
  local function escape(str)
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
  function stash42(args)
    if keys63(args) then
      local l = {"%object", "_stash", true}
      local k = nil
      local _g12 = args
      for k in next, _g12 do
        if (not number63(k)) then
          local v = _g12[k]
          add(l, k)
          add(l, v)
        end
      end
      return(join(args, {l}))
    else
      return(args)
    end
  end
  local id_count = 0
  function make_id()
    id_count = (id_count + 1)
    return(("_g" .. id_count))
  end
  function bind(lh, rh)
    if (composite63(lh) and list63(rh)) then
      local id = make_id()
      return(join({join({id, rh})}, bind(lh, id)))
    elseif atom63(lh) then
      return(join({join({lh, rh})}))
    else
      local bs = {}
      local r = lh.rest
      local i = 0
      local _g13 = lh
      while (i < length(_g13)) do
        local x = _g13[(i + 1)]
        bs = join(bs, bind(x, join({"at", rh, i})))
        i = (i + 1)
      end
      if r then
        bs = join(bs, bind(r, join({"sub", rh, length(lh)})))
      end
      local k = nil
      local _g14 = lh
      for k in next, _g14 do
        if (not number63(k)) then
          local v = _g14[k]
          if (v == true) then
            v = k
          end
          if (k ~= "rest") then
            bs = join(bs, bind(v, join({"get", rh, join({"quote", k})})))
          end
        end
      end
      return(bs)
    end
  end
  function bind42(args, body)
    local args1 = {}
    local function rest()
      if (target == "js") then
        return(join({"unstash", join({"sublist", "arguments", length(args1)})}))
      else
        add(args1, "|...|")
        return({"unstash", {"list", "|...|"}})
      end
    end
    if atom63(args) then
      return({args1, join({join({"let", {args, rest()}}, body)})})
    else
      local bs = {}
      local r = (args.rest or (keys63(args) and make_id()))
      local _g16 = 0
      local _g15 = args
      while (_g16 < length(_g15)) do
        local arg = _g15[(_g16 + 1)]
        if atom63(arg) then
          add(args1, arg)
        elseif (list63(arg) or keys63(arg)) then
          local v = make_id()
          add(args1, v)
          bs = join(bs, {arg, v})
        end
        _g16 = (_g16 + 1)
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
        return({args1, join({join({"let", bs}, body)})})
      end
    end
  end
  local function quoting63(depth)
    return(number63(depth))
  end
  local function quasiquoting63(depth)
    return((quoting63(depth) and (depth > 0)))
  end
  local function can_unquote63(depth)
    return((quoting63(depth) and (depth == 1)))
  end
  local function quasisplice63(x, depth)
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
        local _g17 = form[2]
        local t = _g17[1]
        local k = _g17[2]
        local body = sub(form, 2)
        return(join({"%for", join({macroexpand(t), macroexpand(k)})}, macroexpand(body)))
      elseif (x == "%function") then
        local _g4 = form[1]
        local args = form[2]
        local _g18 = sub(form, 2)
        add(environment, {_scope = true})
        local _g20 = (function ()
          local _g22 = 0
          local _g21 = args
          while (_g22 < length(_g21)) do
            local _g19 = _g21[(_g22 + 1)]
            setenv(_g19, {_stash = true, variable = true})
            _g22 = (_g22 + 1)
          end
          return(join({"%function", map42(macroexpand, args)}, macroexpand(_g18)))
        end)()
        drop(environment)
        return(_g20)
      elseif ((x == "%local-function") or (x == "%global-function")) then
        local _g5 = form[1]
        local name = form[2]
        local _g23 = form[3]
        local _g24 = sub(form, 3)
        add(environment, {_scope = true})
        local _g26 = (function ()
          local _g28 = 0
          local _g27 = _g23
          while (_g28 < length(_g27)) do
            local _g25 = _g27[(_g28 + 1)]
            setenv(_g25, {_stash = true, variable = true})
            _g28 = (_g28 + 1)
          end
          return(join({x, name, map42(macroexpand, _g23)}, macroexpand(_g24)))
        end)()
        drop(environment)
        return(_g26)
      elseif macro63(x) then
        return(macroexpand(apply(macro_function(x), tl(form))))
      else
        return(map42(macroexpand, form))
      end
    end
  end
  local function quasiquote_list(form, depth)
    local xs = {{"list"}}
    local k = nil
    local _g29 = form
    for k in next, _g29 do
      if (not number63(k)) then
        local v = _g29[k]
        local _g30 = (function ()
          if quasisplice63(v, depth) then
            return(quasiexpand(v[2]))
          else
            return(quasiexpand(v, depth))
          end
        end)()
        last(xs)[k] = _g30
      end
    end
    local _g32 = 0
    local _g31 = form
    while (_g32 < length(_g31)) do
      local x = _g31[(_g32 + 1)]
      if quasisplice63(x, depth) then
        local _g33 = quasiexpand(x[2])
        add(xs, _g33)
        add(xs, {"list"})
      else
        add(last(xs), quasiexpand(x, depth))
      end
      _g32 = (_g32 + 1)
    end
    local pruned = keep(function (x)
      return(((length(x) > 1) or (not (hd(x) == "list")) or keys63(x)))
    end, xs)
    return(join({"join*"}, pruned))
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
  indent_level = 0
  function indentation()
    return(apply(cat, replicate(indent_level, "  ")))
  end
  local reserved = {["="] = true, ["=="] = true, ["+"] = true, ["-"] = true, ["%"] = true, ["*"] = true, ["/"] = true, ["<"] = true, [">"] = true, ["<="] = true, [">="] = true, ["break"] = true, ["case"] = true, ["catch"] = true, ["continue"] = true, ["debugger"] = true, ["default"] = true, ["delete"] = true, ["do"] = true, ["else"] = true, ["finally"] = true, ["for"] = true, ["function"] = true, ["if"] = true, ["in"] = true, ["instanceof"] = true, ["new"] = true, ["return"] = true, ["switch"] = true, ["this"] = true, ["throw"] = true, ["try"] = true, ["typeof"] = true, ["var"] = true, ["void"] = true, ["with"] = true, ["and"] = true, ["end"] = true, ["repeat"] = true, ["while"] = true, ["false"] = true, ["local"] = true, ["nil"] = true, ["then"] = true, ["not"] = true, ["true"] = true, ["elseif"] = true, ["or"] = true, ["until"] = true}
  local function numeric63(n)
    return(((n > 47) and (n < 58)))
  end
  local function valid_char63(n)
    return((numeric63(n) or ((n > 64) and (n < 91)) or ((n > 96) and (n < 123)) or (n == 95)))
  end
  function valid_id63(id)
    if empty63(id) then
      return(false)
    elseif special63(id) then
      return(false)
    elseif reserved[id] then
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
  function to_id(id)
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
  function module_key(spec)
    if atom63(spec) then
      return(to_string(spec))
    else
      error("Unsupported module specification")
    end
  end
  function exported()
    local toplevel = hd(environment)
    local m = make_id()
    local k = module_key(current_module)
    local exports = {}
    local n = nil
    local _g34 = toplevel
    for n in next, _g34 do
      if (not number63(n)) then
        local b = _g34[n]
        if (b.variable and b.export and (b.module == current_module)) then
          add(exports, join({"set", join({"get", m, join({"quote", n})}), n}))
        end
      end
    end
    if some63(exports) then
      return(join({"do", join({"define", m, join({"table"})}), join({"set", join({"get", "nexus", join({"quote", k})}), m})}, exports))
    end
  end
  function imported(k)
    local imports = {}
    local x = nexus[k]
    if (x and keys63(x)) then
      local m = make_id()
      add(imports, join({"%local", m, join({"get", "nexus", join({"quote", k})})}))
      local b = nil
      local _g35 = x
      for b in next, _g35 do
        if (not number63(b)) then
          local _g6 = _g35[b]
          add(imports, join({"%local", b, join({"get", m, join({"quote", b})})}))
        end
      end
      return(join({"do"}, imports))
    end
  end
  local function quote_binding(b)
    b = extend(b, {_stash = true, module = join({"quote", b.module})})
    if is63(b.symbol) then
      return(extend(b, {_stash = true, symbol = join({"quote", b.symbol})}))
    elseif (b.macro and b.form) then
      return(exclude(extend(b, {_stash = true, macro = b.form}), {_stash = true, form = true}))
    elseif (b.special and b.form) then
      return(exclude(extend(b, {_stash = true, special = b.form}), {_stash = true, form = true}))
    elseif is63(b.variable) then
      return(b)
    elseif is63(b.global) then
      return(b)
    end
  end
  local function quote_frame(t)
    return(join({"%object"}, mapo(function (_g7, b)
      return(join({"table"}, quote_binding(b)))
    end, t)))
  end
  function quote_environment(env)
    return(join({"list"}, map(quote_frame, env)))
  end
  local function quote_module(m)
    return(join((function ()
      local _g36 = {"table"}
      _g36.import = quoted(m.import)
      _g36.export = quote_frame(m.export)
      return(_g36)
    end)()))
  end
  function quote_modules()
    return(join({"table"}, map42(quote_module, modules)))
  end
  function initial_environment()
    return({{["define-module"] = getenv("define-module")}})
  end
  _g37 = {}
  nexus.utilities = _g37
  _g37.setenv = setenv
  _g37.getenv = getenv
  _g37["macro-function"] = macro_function
  _g37["macro?"] = macro63
  _g37["special?"] = special63
  _g37["special-form?"] = special_form63
  _g37["symbol-expansion"] = symbol_expansion
  _g37["symbol?"] = symbol63
  _g37["variable?"] = variable63
  _g37["bound?"] = bound63
  _g37.quoted = quoted
  _g37["stash*"] = stash42
  _g37.bind = bind
  _g37["bind*"] = bind42
  _g37.quasiexpand = quasiexpand
  _g37.macroexpand = macroexpand
  _g37.indentation = indentation
  _g37["valid-id?"] = valid_id63
  _g37["to-id"] = to_id
  _g37["module-key"] = module_key
  _g37.imported = imported
  _g37.exported = exported
  _g37["quote-environment"] = quote_environment
  _g37["quote-modules"] = quote_modules
  _g37["initial-environment"] = initial_environment
end)();
(function ()
  function length(x)
    return(#x)
  end
  function empty63(x)
    return((length(x) == 0))
  end
  function some63(x)
    return((length(x) > 0))
  end
  function substring(str, from, upto)
    return((string.sub)(str, (from + 1), upto))
  end
  function sublist(l, from, upto)
    local i = (from or 0)
    local j = 0
    local _g39 = (upto or length(l))
    local l2 = {}
    while (i < _g39) do
      l2[(j + 1)] = l[(i + 1)]
      i = (i + 1)
      j = (j + 1)
    end
    return(l2)
  end
  function sub(x, from, upto)
    local _g40 = (from or 0)
    if string63(x) then
      return(substring(x, _g40, upto))
    else
      local l = sublist(x, _g40, upto)
      local k = nil
      local _g41 = x
      for k in next, _g41 do
        if (not number63(k)) then
          local v = _g41[k]
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
    if (nil63(l2) and nil63(l1)) then
      return({})
    elseif nil63(l1) then
      return(join({}, l2))
    elseif nil63(l2) then
      return(join(l1, {}))
    elseif (atom63(l1) and atom63(l2)) then
      return({l1, l2})
    elseif atom63(l1) then
      return(join({l1}, l2))
    elseif atom63(l2) then
      return(join(l1, {l2}))
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
      local _g42 = l1
      for k in next, _g42 do
        if (not number63(k)) then
          local v = _g42[k]
          l[k] = v
        end
      end
      local _g44 = nil
      local _g43 = l2
      for _g44 in next, _g43 do
        if (not number63(_g44)) then
          local v = _g43[_g44]
          l[_g44] = v
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
    local _g46 = 0
    local _g45 = l
    while (_g46 < length(_g45)) do
      local x = _g45[(_g46 + 1)]
      if f(x) then
        add(l1, x)
      end
      _g46 = (_g46 + 1)
    end
    return(l1)
  end
  function find(f, l)
    local _g48 = 0
    local _g47 = l
    while (_g48 < length(_g47)) do
      local x = _g47[(_g48 + 1)]
      local _g49 = f(x)
      if _g49 then
        return(_g49)
      end
      _g48 = (_g48 + 1)
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
  local function splice63(x)
    if table63(x) then
      return(x._splice)
    end
  end
  function map(f, l)
    local l1 = {}
    local _g51 = 0
    local _g50 = l
    while (_g51 < length(_g50)) do
      local x = _g50[(_g51 + 1)]
      local x1 = f(x)
      local s = splice63(x1)
      if list63(s) then
        l1 = join(l1, s)
      elseif is63(s) then
        add(l1, s)
      elseif is63(x1) then
        add(l1, x1)
      end
      _g51 = (_g51 + 1)
    end
    return(l1)
  end
  function map42(f, t)
    local l = map(f, t)
    local k = nil
    local _g52 = t
    for k in next, _g52 do
      if (not number63(k)) then
        local v = _g52[k]
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
    local _g53 = t
    for k in next, _g53 do
      if (not number63(k)) then
        local v = _g53[k]
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
    local _g54 = t
    for k in next, _g54 do
      if (not number63(k)) then
        local v = _g54[k]
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
    local k = nil
    local k1 = nil
    local _g55 = t
    for k1 in next, _g55 do
      if (not number63(k1)) then
        local v = _g55[k1]
        k = k1
        break
      end
    end
    return(k)
  end
  function extend(t, ...)
    local xs = unstash({...})
    local _g56 = sub(xs, 0)
    return(join(t, _g56))
  end
  function exclude(t, ...)
    local keys = unstash({...})
    local _g57 = sub(keys, 0)
    local t1 = sublist(t)
    local k = nil
    local _g58 = t
    for k in next, _g58 do
      if (not number63(k)) then
        local v = _g58[k]
        if (not _g57[k]) then
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
    local _g59 = (function ()
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
    local _g60 = sub(xs, 0)
    if empty63(_g60) then
      return("")
    else
      return(reduce(function (a, b)
        return((a .. b))
      end, _g60))
    end
  end
  function _43(...)
    local xs = unstash({...})
    local _g61 = sub(xs, 0)
    return(reduce(function (a, b)
      return((a + b))
    end, _g61))
  end
  function _(...)
    local xs = unstash({...})
    local _g62 = sub(xs, 0)
    return(reduce(function (a, b)
      return((b - a))
    end, reverse(_g62)))
  end
  function _42(...)
    local xs = unstash({...})
    local _g63 = sub(xs, 0)
    return(reduce(function (a, b)
      return((a * b))
    end, _g63))
  end
  function _47(...)
    local xs = unstash({...})
    local _g64 = sub(xs, 0)
    return(reduce(function (a, b)
      return((b / a))
    end, reverse(_g64)))
  end
  function _37(...)
    local xs = unstash({...})
    local _g65 = sub(xs, 0)
    return(reduce(function (a, b)
      return((b % a))
    end, reverse(_g65)))
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
      local _g66 = x
      for k in next, _g66 do
        if (not number63(k)) then
          local v = _g66[k]
          add(x1, (k .. ":"))
          add(x1, v)
        end
      end
      local i = 0
      local _g67 = x1
      while (i < length(_g67)) do
        local y = _g67[(i + 1)]
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
    local _g68 = stash(args)
    return(f(unpack(_g68)))
  end
  function stash(args)
    if keys63(args) then
      local p = {_stash = true}
      local k = nil
      local _g69 = args
      for k in next, _g69 do
        if (not number63(k)) then
          local v = _g69[k]
          p[k] = v
        end
      end
      return(join(args, {p}))
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
        local _g70 = l
        for k in next, _g70 do
          if (not number63(k)) then
            local v = _g70[k]
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
  function _37message_handler(msg)
    local i = search(msg, ": ")
    return(sub(msg, (i + 2)))
  end
  _g71 = {}
  nexus.runtime = _g71
  _g71.length = length
  _g71["empty?"] = empty63
  _g71["some?"] = some63
  _g71.substring = substring
  _g71.sublist = sublist
  _g71.sub = sub
  _g71.inner = inner
  _g71.hd = hd
  _g71.tl = tl
  _g71.add = add
  _g71.drop = drop
  _g71.last = last
  _g71.reverse = reverse
  _g71.join = join
  _g71.reduce = reduce
  _g71.keep = keep
  _g71.find = find
  _g71.pairwise = pairwise
  _g71.iterate = iterate
  _g71.replicate = replicate
  _g71.splice = splice
  _g71.map = map
  _g71["map*"] = map42
  _g71.mapt = mapt
  _g71.mapo = mapo
  _g71["keys?"] = keys63
  _g71.extend = extend
  _g71.exclude = exclude
  _g71.char = char
  _g71.code = code
  _g71.search = search
  _g71.split = split
  _g71.cat = cat
  _g71["+"] = _43
  _g71["-"] = _
  _g71["*"] = _42
  _g71["/"] = _47
  _g71["%"] = _37
  _g71[">"] = _62
  _g71["<"] = _60
  _g71["="] = _61
  _g71[">="] = _6261
  _g71["<="] = _6061
  _g71["read-file"] = read_file
  _g71["write-file"] = write_file
  _g71.write = write
  _g71.exit = exit
  _g71["nil?"] = nil63
  _g71["is?"] = is63
  _g71["string?"] = string63
  _g71["string-literal?"] = string_literal63
  _g71["id-literal?"] = id_literal63
  _g71["number?"] = number63
  _g71["boolean?"] = boolean63
  _g71["function?"] = function63
  _g71["composite?"] = composite63
  _g71["atom?"] = atom63
  _g71["table?"] = table63
  _g71["list?"] = list63
  _g71["parse-number"] = parse_number
  _g71["to-string"] = to_string
  _g71.apply = apply
  _g71.stash = stash
  _g71.unstash = unstash
  _g71["%message-handler"] = _37message_handler
end)();
(function ()
  local delimiters = {["("] = true, [")"] = true, [";"] = true, ["\n"] = true}
  local whitespace = {[" "] = true, ["\t"] = true, ["\n"] = true}
  local function make_stream(str)
    return({pos = 0, string = str, len = length(str)})
  end
  local function peek_char(s)
    if (s.pos < s.len) then
      return(char(s.string, s.pos))
    end
  end
  local function read_char(s)
    local c = peek_char(s)
    if c then
      s.pos = (s.pos + 1)
      return(c)
    end
  end
  local function skip_non_code(s)
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
  local read_table = {}
  local eof = {}
  local function read(s)
    skip_non_code(s)
    local c = peek_char(s)
    if is63(c) then
      return(((read_table[c] or read_table[""]))(s))
    else
      return(eof)
    end
  end
  local function read_all(s)
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
  local function read_from_string(str)
    return(read(make_stream(str)))
  end
  local function key63(atom)
    return((string63(atom) and (length(atom) > 1) and (char(atom, (length(atom) - 1)) == ":")))
  end
  local function flag63(atom)
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
        return(join({"get", b, join({"quote", a})}))
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
  _g76 = {}
  nexus.reader = _g76
  _g76["make-stream"] = make_stream
  _g76["read-table"] = read_table
  _g76.read = read
  _g76["read-all"] = read_all
  _g76["read-from-string"] = read_from_string
end)();
(function ()
  local _g78 = nexus.utilities
  local setenv = _g78.setenv
  local getenv = _g78.getenv
  local macro_function = _g78["macro-function"]
  local macro63 = _g78["macro?"]
  local special63 = _g78["special?"]
  local special_form63 = _g78["special-form?"]
  local symbol_expansion = _g78["symbol-expansion"]
  local symbol63 = _g78["symbol?"]
  local variable63 = _g78["variable?"]
  local bound63 = _g78["bound?"]
  local quoted = _g78.quoted
  local stash42 = _g78["stash*"]
  local bind = _g78.bind
  local bind42 = _g78["bind*"]
  local quasiexpand = _g78.quasiexpand
  local macroexpand = _g78.macroexpand
  local indentation = _g78.indentation
  local valid_id63 = _g78["valid-id?"]
  local to_id = _g78["to-id"]
  local module_key = _g78["module-key"]
  local imported = _g78.imported
  local exported = _g78.exported
  local quote_environment = _g78["quote-environment"]
  local quote_modules = _g78["quote-modules"]
  local initial_environment = _g78["initial-environment"]
  local _g79 = nexus.runtime
  local length = _g79.length
  local empty63 = _g79["empty?"]
  local some63 = _g79["some?"]
  local substring = _g79.substring
  local sublist = _g79.sublist
  local sub = _g79.sub
  local inner = _g79.inner
  local hd = _g79.hd
  local tl = _g79.tl
  local add = _g79.add
  local drop = _g79.drop
  local last = _g79.last
  local reverse = _g79.reverse
  local join = _g79.join
  local reduce = _g79.reduce
  local keep = _g79.keep
  local find = _g79.find
  local pairwise = _g79.pairwise
  local iterate = _g79.iterate
  local replicate = _g79.replicate
  local splice = _g79.splice
  local map = _g79.map
  local map42 = _g79["map*"]
  local mapt = _g79.mapt
  local mapo = _g79.mapo
  local keys63 = _g79["keys?"]
  local extend = _g79.extend
  local exclude = _g79.exclude
  local char = _g79.char
  local code = _g79.code
  local search = _g79.search
  local split = _g79.split
  local cat = _g79.cat
  local _43 = _g79["+"]
  local _ = _g79["-"]
  local _42 = _g79["*"]
  local _47 = _g79["/"]
  local _37 = _g79["%"]
  local _62 = _g79[">"]
  local _60 = _g79["<"]
  local _61 = _g79["="]
  local _6261 = _g79[">="]
  local _6061 = _g79["<="]
  local read_file = _g79["read-file"]
  local write_file = _g79["write-file"]
  local print = _g79.print
  local write = _g79.write
  local exit = _g79.exit
  local type = _g79.type
  local nil63 = _g79["nil?"]
  local is63 = _g79["is?"]
  local string63 = _g79["string?"]
  local string_literal63 = _g79["string-literal?"]
  local id_literal63 = _g79["id-literal?"]
  local number63 = _g79["number?"]
  local boolean63 = _g79["boolean?"]
  local function63 = _g79["function?"]
  local composite63 = _g79["composite?"]
  local atom63 = _g79["atom?"]
  local table63 = _g79["table?"]
  local list63 = _g79["list?"]
  local parse_number = _g79["parse-number"]
  local to_string = _g79["to-string"]
  local apply = _g79.apply
  local stash = _g79.stash
  local unstash = _g79.unstash
  local _37message_handler = _g79["%message-handler"]
  local _g80 = nexus.reader
  local make_stream = _g80["make-stream"]
  local read_table = _g80["read-table"]
  local read = _g80.read
  local read_all = _g80["read-all"]
  local read_from_string = _g80["read-from-string"]
  local infix = {common = {["+"] = true, ["-"] = true, ["%"] = true, ["*"] = true, ["/"] = true, ["<"] = true, [">"] = true, ["<="] = true, [">="] = true}, js = {["="] = "===", ["~="] = "!=", ["and"] = "&&", ["or"] = "||", cat = "+"}, lua = {["="] = "==", cat = "..", ["~="] = true, ["and"] = true, ["or"] = true}}
  local function getop(op)
    local op1 = (infix.common[op] or infix[target][op])
    if (op1 == true) then
      return(op)
    else
      return(op1)
    end
  end
  local function infix63(form)
    return((list63(form) and is63(getop(hd(form)))))
  end
  local function compile_args(args)
    local str = "("
    local i = 0
    local _g81 = args
    while (i < length(_g81)) do
      local arg = _g81[(i + 1)]
      str = (str .. compile(arg))
      if (i < (length(args) - 1)) then
        str = (str .. ", ")
      end
      i = (i + 1)
    end
    return((str .. ")"))
  end
  local function compile_atom(x)
    if ((x == "nil") and (target == "lua")) then
      return(x)
    elseif (x == "nil") then
      return("undefined")
    elseif id_literal63(x) then
      return(inner(x))
    elseif string_literal63(x) then
      return(x)
    elseif string63(x) then
      return(to_id(x))
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
  function compile_body(forms, ...)
    local _g82 = unstash({...})
    local tail63 = _g82["tail?"]
    local str = ""
    local i = 0
    local _g83 = forms
    while (i < length(_g83)) do
      local x = _g83[(i + 1)]
      local t63 = (tail63 and (i == (length(forms) - 1)))
      str = (str .. compile(x, {_stash = true, ["stmt?"] = true, ["tail?"] = t63}))
      i = (i + 1)
    end
    return(str)
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
  local function compile_infix(_g84)
    local op = _g84[1]
    local args = sub(_g84, 1)
    local str = "("
    local _g85 = getop(op)
    local i = 0
    local _g86 = args
    while (i < length(_g86)) do
      local arg = _g86[(i + 1)]
      if ((_g85 == "-") and (length(args) == 1)) then
        str = (str .. _g85 .. compile(arg))
      else
        str = (str .. compile(arg))
        if (i < (length(args) - 1)) then
          str = (str .. " " .. _g85 .. " ")
        end
      end
      i = (i + 1)
    end
    return((str .. ")"))
  end
  function compile_branch(condition, body, first63, last63, tail63)
    local cond1 = compile(condition)
    local _g87 = (function ()
      indent_level = (indent_level + 1)
      local _g88 = compile(body, {_stash = true, ["stmt?"] = true, ["tail?"] = tail63})
      indent_level = (indent_level - 1)
      return(_g88)
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
      return((ind .. "if (" .. cond1 .. ") {\n" .. _g87 .. ind .. "}" .. tr))
    elseif first63 then
      return((ind .. "if " .. cond1 .. " then\n" .. _g87 .. tr))
    elseif (nil63(condition) and (target == "js")) then
      return((" else {\n" .. _g87 .. ind .. "}\n"))
    elseif nil63(condition) then
      return((ind .. "else\n" .. _g87 .. tr))
    elseif (target == "js") then
      return((" else if (" .. cond1 .. ") {\n" .. _g87 .. ind .. "}" .. tr))
    else
      return((ind .. "elseif " .. cond1 .. " then\n" .. _g87 .. tr))
    end
  end
  function compile_function(args, body, ...)
    local _g89 = unstash({...})
    local name = _g89.name
    local prefix = _g89.prefix
    local id = (function ()
      if name then
        return(compile(name))
      else
        return("")
      end
    end)()
    local _g90 = (prefix or "")
    local _g91 = compile_args(args)
    local _g92 = (function ()
      indent_level = (indent_level + 1)
      local _g93 = compile_body(body, {_stash = true, ["tail?"] = true})
      indent_level = (indent_level - 1)
      return(_g93)
    end)()
    local ind = indentation()
    local tr = (function ()
      if (target == "js") then
        return("")
      else
        return("end")
      end
    end)()
    if name then
      tr = (tr .. "\n")
    end
    if (target == "js") then
      return(("function " .. id .. _g91 .. " {\n" .. _g92 .. ind .. "}" .. tr))
    else
      return((_g90 .. "function " .. id .. _g91 .. "\n" .. _g92 .. ind .. tr))
    end
  end
  local function terminator(stmt63)
    if (not stmt63) then
      return("")
    elseif (target == "js") then
      return(";\n")
    else
      return("\n")
    end
  end
  function compile_special(form, stmt63, tail63)
    local _g94 = getenv(hd(form))
    local special = _g94.special
    local stmt = _g94.stmt
    local self_tr63 = _g94.tr
    if ((not stmt63) and stmt) then
      return(compile(join({join({"%function", {}, form})}), {_stash = true, ["tail?"] = tail63}))
    else
      local tr = terminator((stmt63 and (not self_tr63)))
      return((special(tl(form), tail63) .. tr))
    end
  end
  local function can_return63(form)
    return(((not special_form63(form)) or (not getenv(hd(form)).stmt)))
  end
  function compile(form, ...)
    local _g95 = unstash({...})
    local stmt63 = _g95["stmt?"]
    local tail63 = _g95["tail?"]
    if (tail63 and can_return63(form)) then
      form = join({"return", form})
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
      local _g96 = (function ()
        if atom63(form) then
          return(compile_atom(form))
        elseif infix63(form) then
          return(compile_infix(form))
        else
          return(compile_call(form))
        end
      end)()
      return((ind .. _g96 .. tr))
    end
  end
  _37result = nil
  local function run(x)
    local f = load((compile("%result") .. "=" .. x))
    if f then
      f()
      return(_37result)
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
  local function module(spec)
    return(modules[module_key(spec)])
  end
  local function module_path(spec)
    return((module_key(spec) .. ".l"))
  end
  local function encapsulate(body)
    local _g97 = macroexpand(body)
    local epilog = macroexpand(exported())
    return(join({join({"%function", {}}, join(_g97, {epilog}))}))
  end
  local function compile_file(file)
    local str = read_file(file)
    local body = read_all(make_stream(str))
    local form = encapsulate(body)
    return((compile(form) .. ";\n"))
  end
  local compiler_output = nil
  local compilation_level = nil
  function compile_module(spec)
    compilation_level = 0
    compiler_output = ""
    load_module(spec)
    return(compiler_output)
  end
  local function _37compile_module(spec)
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
    local _g107 = toplevel
    for name in next, _g107 do
      if (not number63(name)) then
        local binding = _g107[name]
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
  function load_module(spec)
    if (nil63(module(spec)) or (compilation_level == 1)) then
      _37compile_module(spec)
    end
    return(open_module(spec))
  end
  function open_module(spec)
    local m = module(spec)
    local frame = last(environment)
    local k = nil
    local _g108 = m.export
    for k in next, _g108 do
      if (not number63(k)) then
        local v = _g108[k]
        frame[k] = v
      end
    end
  end
  function in_module(spec)
    load_module(spec)
    local m = module(spec)
    return(map(open_module, m.import))
  end
  _g109 = {}
  nexus.compiler = _g109
  _g109["compile-body"] = compile_body
  _g109["compile-call"] = compile_call
  _g109["compile-branch"] = compile_branch
  _g109["compile-function"] = compile_function
  _g109["compile-special"] = compile_special
  _g109.compile = compile
  _g109.eval = eval
  _g109["load-module"] = load_module
  _g109["open-module"] = open_module
  _g109["in-module"] = in_module
end)();
(function ()
  local _g112 = nexus.utilities
  local setenv = _g112.setenv
  local getenv = _g112.getenv
  local macro_function = _g112["macro-function"]
  local macro63 = _g112["macro?"]
  local special63 = _g112["special?"]
  local special_form63 = _g112["special-form?"]
  local symbol_expansion = _g112["symbol-expansion"]
  local symbol63 = _g112["symbol?"]
  local variable63 = _g112["variable?"]
  local bound63 = _g112["bound?"]
  local quoted = _g112.quoted
  local stash42 = _g112["stash*"]
  local bind = _g112.bind
  local bind42 = _g112["bind*"]
  local quasiexpand = _g112.quasiexpand
  local macroexpand = _g112.macroexpand
  local indentation = _g112.indentation
  local valid_id63 = _g112["valid-id?"]
  local to_id = _g112["to-id"]
  local module_key = _g112["module-key"]
  local imported = _g112.imported
  local exported = _g112.exported
  local quote_environment = _g112["quote-environment"]
  local quote_modules = _g112["quote-modules"]
  local initial_environment = _g112["initial-environment"]
  local _g113 = nexus.compiler
  local compile_body = _g113["compile-body"]
  local compile_call = _g113["compile-call"]
  local compile_branch = _g113["compile-branch"]
  local compile_function = _g113["compile-function"]
  local compile_special = _g113["compile-special"]
  local compile = _g113.compile
  local eval = _g113.eval
  local load_module = _g113["load-module"]
  local open_module = _g113["open-module"]
  local in_module = _g113["in-module"]
  return
end)();
(function ()
  local _g169 = nexus.utilities
  local setenv = _g169.setenv
  local getenv = _g169.getenv
  local macro_function = _g169["macro-function"]
  local macro63 = _g169["macro?"]
  local special63 = _g169["special?"]
  local special_form63 = _g169["special-form?"]
  local symbol_expansion = _g169["symbol-expansion"]
  local symbol63 = _g169["symbol?"]
  local variable63 = _g169["variable?"]
  local bound63 = _g169["bound?"]
  local quoted = _g169.quoted
  local stash42 = _g169["stash*"]
  local bind = _g169.bind
  local bind42 = _g169["bind*"]
  local quasiexpand = _g169.quasiexpand
  local macroexpand = _g169.macroexpand
  local indentation = _g169.indentation
  local valid_id63 = _g169["valid-id?"]
  local to_id = _g169["to-id"]
  local module_key = _g169["module-key"]
  local imported = _g169.imported
  local exported = _g169.exported
  local quote_environment = _g169["quote-environment"]
  local quote_modules = _g169["quote-modules"]
  local initial_environment = _g169["initial-environment"]
  local _g170 = nexus.runtime
  local length = _g170.length
  local empty63 = _g170["empty?"]
  local some63 = _g170["some?"]
  local substring = _g170.substring
  local sublist = _g170.sublist
  local sub = _g170.sub
  local inner = _g170.inner
  local hd = _g170.hd
  local tl = _g170.tl
  local add = _g170.add
  local drop = _g170.drop
  local last = _g170.last
  local reverse = _g170.reverse
  local join = _g170.join
  local reduce = _g170.reduce
  local keep = _g170.keep
  local find = _g170.find
  local pairwise = _g170.pairwise
  local iterate = _g170.iterate
  local replicate = _g170.replicate
  local splice = _g170.splice
  local map = _g170.map
  local map42 = _g170["map*"]
  local mapt = _g170.mapt
  local mapo = _g170.mapo
  local keys63 = _g170["keys?"]
  local extend = _g170.extend
  local exclude = _g170.exclude
  local char = _g170.char
  local code = _g170.code
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
  local print = _g170.print
  local write = _g170.write
  local exit = _g170.exit
  local type = _g170.type
  local nil63 = _g170["nil?"]
  local is63 = _g170["is?"]
  local string63 = _g170["string?"]
  local string_literal63 = _g170["string-literal?"]
  local id_literal63 = _g170["id-literal?"]
  local number63 = _g170["number?"]
  local boolean63 = _g170["boolean?"]
  local function63 = _g170["function?"]
  local composite63 = _g170["composite?"]
  local atom63 = _g170["atom?"]
  local table63 = _g170["table?"]
  local list63 = _g170["list?"]
  local parse_number = _g170["parse-number"]
  local to_string = _g170["to-string"]
  local apply = _g170.apply
  local stash = _g170.stash
  local unstash = _g170.unstash
  local _37message_handler = _g170["%message-handler"]
  target = "lua"
  return
end)();
(function ()
  local _g243 = nexus.utilities
  local setenv = _g243.setenv
  local getenv = _g243.getenv
  local macro_function = _g243["macro-function"]
  local macro63 = _g243["macro?"]
  local special63 = _g243["special?"]
  local special_form63 = _g243["special-form?"]
  local symbol_expansion = _g243["symbol-expansion"]
  local symbol63 = _g243["symbol?"]
  local variable63 = _g243["variable?"]
  local bound63 = _g243["bound?"]
  local quoted = _g243.quoted
  local stash42 = _g243["stash*"]
  local bind = _g243.bind
  local bind42 = _g243["bind*"]
  local quasiexpand = _g243.quasiexpand
  local macroexpand = _g243.macroexpand
  local indentation = _g243.indentation
  local valid_id63 = _g243["valid-id?"]
  local to_id = _g243["to-id"]
  local module_key = _g243["module-key"]
  local imported = _g243.imported
  local exported = _g243.exported
  local quote_environment = _g243["quote-environment"]
  local quote_modules = _g243["quote-modules"]
  local initial_environment = _g243["initial-environment"]
  modules = {boot = {import = {"utilities", "special", "core"}, export = {}}, core = {import = {"utilities", "runtime", "special", "core"}, export = {["list*"] = {export = true, module = "core", macro = function (...)
    local xs = unstash({...})
    if empty63(xs) then
      return({})
    else
      local l = {}
      local i = 0
      local _g244 = xs
      while (i < length(_g244)) do
        local x = _g244[(i + 1)]
        if (i == (length(xs) - 1)) then
          l = {"join", join({"list"}, l), x}
        else
          add(l, x)
        end
        i = (i + 1)
      end
      return(l)
    end
  end}, each = {export = true, module = "core", macro = function (_g245, ...)
    local t = _g245[1]
    local k = _g245[2]
    local v = _g245[3]
    local body = unstash({...})
    local _g246 = sub(body, 0)
    local t1 = make_id()
    return(join({"let", join({k, "nil", t1, t}), join({"%for", join({t1, k}), join({"if", join((function ()
      local _g247 = {"target"}
      _g247.js = join({"isNaN", join({"parseInt", k})})
      _g247.lua = join({"not", join({"number?", k})})
      return(_g247)
    end)()), join({"let", join({v, join({"get", t1, k})})}, _g246)})})}))
  end}, inc = {export = true, module = "core", macro = function (n, by)
    return(join({"set", n, join({"+", n, (by or 1)})}))
  end}, quote = {export = true, module = "core", macro = function (form)
    return(quoted(form))
  end}, ["join*"] = {export = true, module = "core", macro = function (...)
    local xs = unstash({...})
    if (length(xs) == 1) then
      return(join({"join"}, xs))
    else
      return(reduce(function (a, b)
        return({"join", a, b})
      end, xs))
    end
  end}, fn = {export = true, module = "core", macro = function (args, ...)
    local body = unstash({...})
    local _g248 = sub(body, 0)
    local _g249 = bind42(args, _g248)
    local _g250 = _g249[1]
    local _g251 = _g249[2]
    return(join({"%function", _g250}, _g251))
  end}, table = {export = true, module = "core", macro = function (...)
    local body = unstash({...})
    return(join({"%object"}, mapo(function (_g168, x)
      return(x)
    end, body)))
  end}, ["join!"] = {export = true, module = "core", macro = function (a, ...)
    local bs = unstash({...})
    local _g252 = sub(bs, 0)
    return(join({"set", a, join({"join*", a}, _g252)}))
  end}, ["let-symbol"] = {export = true, module = "core", macro = function (expansions, ...)
    local body = unstash({...})
    local _g253 = sub(body, 0)
    add(environment, {})
    local _g254 = (function ()
      map(function (_g255)
        local name = _g255[1]
        local exp = _g255[2]
        return(macroexpand(join({"define-symbol", name, exp})))
      end, pairwise(expansions))
      return(join({"do"}, macroexpand(_g253)))
    end)()
    drop(environment)
    return(_g254)
  end}, pr = {export = true, module = "core", macro = function (...)
    local xs = unstash({...})
    local _g256 = map(function (x)
      return(splice(join({join({"to-string", x}), "\" \""})))
    end, xs)
    return(join({"print", join({"cat"}, _g256)}))
  end}, ["with-frame"] = {export = true, module = "core", macro = function (...)
    local body = unstash({...})
    local _g257 = sub(body, 0)
    local scope = body.scope
    local x = make_id()
    return(join({"do", join({"add", "environment", join((function ()
      local _g258 = {"table"}
      _g258._scope = scope
      return(_g258)
    end)())}), join({"let", join({x, join({"do"}, _g257)}), join({"drop", "environment"}), x})}))
  end}, define = {export = true, module = "core", macro = function (name, x, ...)
    local body = unstash({...})
    local _g259 = sub(body, 0)
    setenv(name, {_stash = true, variable = true})
    if (not empty63(_g259)) then
      local _g260 = bind42(x, _g259)
      local args = _g260[1]
      local _g261 = _g260[2]
      return(join({"%global-function", name, args}, _g261))
    else
      return(join({"set", name, x}))
    end
  end}, let = {export = true, module = "core", macro = function (bindings, ...)
    local body = unstash({...})
    local _g262 = sub(body, 0)
    local i = 0
    local renames = {}
    local locals = {}
    map(function (_g263)
      local lh = _g263[1]
      local rh = _g263[2]
      local _g265 = 0
      local _g264 = bind(lh, rh)
      while (_g265 < length(_g264)) do
        local _g266 = _g264[(_g265 + 1)]
        local id = _g266[1]
        local val = _g266[2]
        if bound63(id) then
          local rename = make_id()
          add(renames, id)
          add(renames, rename)
          id = rename
        else
          setenv(id, {_stash = true, variable = true})
        end
        add(locals, join({"%local", id, val}))
        _g265 = (_g265 + 1)
      end
    end, pairwise(bindings))
    return(join({"do"}, join(locals, {join({"let-symbol", renames}, _g262)})))
  end}, ["define-local"] = {export = true, module = "core", macro = function (name, x, ...)
    local body = unstash({...})
    local _g267 = sub(body, 0)
    setenv(name, {_stash = true, variable = true})
    if (not empty63(_g267)) then
      local _g268 = bind42(x, _g267)
      local args = _g268[1]
      local _g269 = _g268[2]
      return(join({"%local-function", name, args}, _g269))
    else
      return(join({"%local", name, x}))
    end
  end}, dec = {export = true, module = "core", macro = function (n, by)
    return(join({"set", n, join({"-", n, (by or 1)})}))
  end}, ["set-of"] = {export = true, module = "core", macro = function (...)
    local elements = unstash({...})
    local l = {}
    local _g271 = 0
    local _g270 = elements
    while (_g271 < length(_g270)) do
      local e = _g270[(_g271 + 1)]
      l[e] = true
      _g271 = (_g271 + 1)
    end
    return(join({"table"}, l))
  end}, quasiquote = {export = true, module = "core", macro = function (form)
    return(quasiexpand(form, 1))
  end}, ["with-bindings"] = {export = true, module = "core", macro = function (_g272, ...)
    local names = _g272[1]
    local body = unstash({...})
    local _g273 = sub(body, 0)
    local x = make_id()
    return(join((function ()
      local _g274 = {"with-frame", join({"across", join({names, x}), join((function ()
        local _g275 = {"setenv", x}
        _g275.variable = true
        return(_g275)
      end)())})}
      _g274.scope = true
      return(_g274)
    end)(), _g273))
  end}, ["define-special"] = {export = true, module = "core", macro = function (name, args, ...)
    local body = unstash({...})
    local _g276 = sub(body, 0)
    local form = join({"fn", args}, _g276)
    local keys = sub(_g276, length(_g276))
    eval(join((function ()
      local _g277 = {"setenv", join({"quote", name})}
      _g277.special = form
      _g277.form = join({"quote", form})
      return(_g277)
    end)(), keys))
    return(nil)
  end}, ["cat!"] = {export = true, module = "core", macro = function (a, ...)
    local bs = unstash({...})
    local _g278 = sub(bs, 0)
    return(join({"set", a, join({"cat", a}, _g278)}))
  end}, ["define-macro"] = {export = true, module = "core", macro = function (name, args, ...)
    local body = unstash({...})
    local _g279 = sub(body, 0)
    local form = join({"fn", args}, _g279)
    eval(join((function ()
      local _g280 = {"setenv", join({"quote", name})}
      _g280.macro = form
      _g280.form = join({"quote", form})
      return(_g280)
    end)()))
    return(nil)
  end}, ["define-symbol"] = {export = true, module = "core", macro = function (name, expansion)
    setenv(name, {_stash = true, symbol = expansion})
    return(nil)
  end}, ["let-macro"] = {export = true, module = "core", macro = function (definitions, ...)
    local body = unstash({...})
    local _g281 = sub(body, 0)
    add(environment, {})
    local _g282 = (function ()
      map(function (m)
        return(macroexpand(join({"define-macro"}, m)))
      end, definitions)
      return(join({"do"}, macroexpand(_g281)))
    end)()
    drop(environment)
    return(_g282)
  end}, language = {export = true, module = "core", macro = function ()
    return(join({"quote", target}))
  end}, list = {export = true, module = "core", macro = function (...)
    local body = unstash({...})
    local l = join({"%array"}, body)
    if (not keys63(body)) then
      return(l)
    else
      local id = make_id()
      local init = {}
      local k = nil
      local _g283 = body
      for k in next, _g283 do
        if (not number63(k)) then
          local v = _g283[k]
          add(init, join({"set", join({"get", id, join({"quote", k})}), v}))
        end
      end
      return(join({"let", join({id, l})}, join(init, {id})))
    end
  end}, target = {export = true, global = true, module = "core", macro = function (...)
    local clauses = unstash({...})
    return(clauses[target])
  end}, across = {export = true, module = "core", macro = function (_g284, ...)
    local l = _g284[1]
    local v = _g284[2]
    local i = _g284[3]
    local start = _g284[4]
    local body = unstash({...})
    local _g285 = sub(body, 0)
    local l1 = make_id()
    i = (i or make_id())
    start = (start or 0)
    return(join({"let", join({i, start, l1, l}), join({"while", join({"<", i, join({"length", l1})}), join({"let", join({v, join({"at", l1, i})})}, join(_g285, {join({"inc", i})}))})}))
  end}, guard = {export = true, module = "core", macro = function (expr)
    if (target == "js") then
      return(join({join({"fn", {}, join({"%try", join({"list", true, expr})})})}))
    else
      local e = make_id()
      local x = make_id()
      local ex = ("|" .. e .. "," .. x .. "|")
      return(join({"let", join({ex, join({"xpcall", join({"fn", {}, expr}), "%message-handler"})}), join({"list", e, x})}))
    end
  end}, ["define-global"] = {export = true, module = "core", macro = function (name, x, ...)
    local body = unstash({...})
    local _g286 = sub(body, 0)
    setenv(name, {_stash = true, global = true, export = true})
    if (not empty63(_g286)) then
      local _g287 = bind42(x, _g286)
      local args = _g287[1]
      local _g288 = _g287[2]
      return(join({"%global-function", name, args}, _g288))
    elseif (target == "js") then
      return(join({"set", join({"get", "global", join({"quote", to_id(name)})}), x}))
    else
      return(join({"set", name, x}))
    end
  end}, at = {export = true, module = "core", macro = function (l, i)
    if ((target == "lua") and number63(i)) then
      i = (i + 1)
    elseif (target == "lua") then
      i = join({"+", i, 1})
    end
    return(join({"get", l, i}))
  end}}}, reader = {import = {"special", "core"}, export = {["make-stream"] = {export = true, module = "reader", variable = true}, ["read-table"] = {export = true, module = "reader", variable = true}, ["define-reader"] = {export = true, module = "reader", macro = function (_g289, ...)
    local char = _g289[1]
    local stream = _g289[2]
    local body = unstash({...})
    local _g290 = sub(body, 0)
    return(join({"set", join({"get", "read-table", char}), join({"fn", join({stream})}, _g290)}))
  end}, read = {export = true, module = "reader", variable = true}, ["read-all"] = {export = true, module = "reader", variable = true}, ["read-from-string"] = {export = true, module = "reader", variable = true}}}, compiler = {import = {"utilities", "runtime", "special", "core", "reader"}, export = {["define-module"] = {export = true, module = "compiler", macro = function (spec, ...)
    local body = unstash({...})
    local _g291 = sub(body, 0)
    local imports = {}
    local imp = _g291.import
    local exp = _g291.export
    local _g293 = 0
    local _g292 = (imp or {})
    while (_g293 < length(_g292)) do
      local k = _g292[(_g293 + 1)]
      load_module(k)
      add(imports, imported(k))
      _g293 = (_g293 + 1)
    end
    modules[module_key(spec)] = {import = imp, export = {}}
    local _g295 = 0
    local _g294 = (exp or {})
    while (_g295 < length(_g294)) do
      local k = _g294[(_g295 + 1)]
      setenv(k, {_stash = true, export = true})
      _g295 = (_g295 + 1)
    end
    return(join({"do"}, imports))
  end}, ["compile-body"] = {export = true, module = "compiler", variable = true}, ["compile-call"] = {export = true, module = "compiler", variable = true}, ["compile-branch"] = {export = true, module = "compiler", variable = true}, ["compile-function"] = {export = true, module = "compiler", variable = true}, ["compile-special"] = {export = true, module = "compiler", variable = true}, compile = {export = true, module = "compiler", variable = true}, eval = {export = true, module = "compiler", variable = true}, ["load-module"] = {export = true, module = "compiler", variable = true}, ["open-module"] = {export = true, module = "compiler", variable = true}, ["in-module"] = {export = true, module = "compiler", variable = true}, ["%result"] = {global = true, export = true, module = "compiler"}, ["current-module"] = {global = true, export = true, module = "compiler"}}}, runtime = {import = {"special", "core"}, export = {length = {export = true, module = "runtime", variable = true}, ["empty?"] = {export = true, module = "runtime", variable = true}, ["some?"] = {export = true, module = "runtime", variable = true}, substring = {export = true, module = "runtime", variable = true}, sublist = {export = true, module = "runtime", variable = true}, sub = {export = true, module = "runtime", variable = true}, inner = {export = true, module = "runtime", variable = true}, hd = {export = true, module = "runtime", variable = true}, tl = {export = true, module = "runtime", variable = true}, add = {export = true, module = "runtime", variable = true}, drop = {export = true, module = "runtime", variable = true}, last = {export = true, module = "runtime", variable = true}, reverse = {export = true, module = "runtime", variable = true}, join = {export = true, module = "runtime", variable = true}, reduce = {export = true, module = "runtime", variable = true}, keep = {export = true, module = "runtime", variable = true}, find = {export = true, module = "runtime", variable = true}, pairwise = {export = true, module = "runtime", variable = true}, iterate = {export = true, module = "runtime", variable = true}, replicate = {export = true, module = "runtime", variable = true}, splice = {export = true, module = "runtime", variable = true}, map = {export = true, module = "runtime", variable = true}, ["map*"] = {export = true, module = "runtime", variable = true}, mapt = {export = true, module = "runtime", variable = true}, mapo = {export = true, module = "runtime", variable = true}, ["keys?"] = {export = true, module = "runtime", variable = true}, extend = {export = true, module = "runtime", variable = true}, exclude = {export = true, module = "runtime", variable = true}, char = {export = true, module = "runtime", variable = true}, code = {export = true, module = "runtime", variable = true}, search = {export = true, module = "runtime", variable = true}, split = {export = true, module = "runtime", variable = true}, cat = {export = true, module = "runtime", variable = true}, ["+"] = {export = true, module = "runtime", variable = true}, ["-"] = {export = true, module = "runtime", variable = true}, ["*"] = {export = true, module = "runtime", variable = true}, ["/"] = {export = true, module = "runtime", variable = true}, ["%"] = {export = true, module = "runtime", variable = true}, [">"] = {export = true, module = "runtime", variable = true}, ["<"] = {export = true, module = "runtime", variable = true}, ["="] = {export = true, module = "runtime", variable = true}, [">="] = {export = true, module = "runtime", variable = true}, ["<="] = {export = true, module = "runtime", variable = true}, ["read-file"] = {export = true, module = "runtime", variable = true}, ["write-file"] = {export = true, module = "runtime", variable = true}, print = {}, write = {export = true, module = "runtime", variable = true}, exit = {export = true, module = "runtime", variable = true}, type = {}, ["nil?"] = {export = true, module = "runtime", variable = true}, ["is?"] = {export = true, module = "runtime", variable = true}, ["string?"] = {export = true, module = "runtime", variable = true}, ["string-literal?"] = {export = true, module = "runtime", variable = true}, ["id-literal?"] = {export = true, module = "runtime", variable = true}, ["number?"] = {export = true, module = "runtime", variable = true}, ["boolean?"] = {export = true, module = "runtime", variable = true}, ["function?"] = {export = true, module = "runtime", variable = true}, ["composite?"] = {export = true, module = "runtime", variable = true}, ["atom?"] = {export = true, module = "runtime", variable = true}, ["table?"] = {export = true, module = "runtime", variable = true}, ["list?"] = {export = true, module = "runtime", variable = true}, ["parse-number"] = {export = true, module = "runtime", variable = true}, ["to-string"] = {export = true, module = "runtime", variable = true}, apply = {export = true, module = "runtime", variable = true}, stash = {export = true, module = "runtime", variable = true}, unstash = {export = true, module = "runtime", variable = true}, ["%message-handler"] = {export = true, module = "runtime", variable = true}}}, special = {import = {"utilities", "special", "core", "compiler"}, export = {["%function"] = {export = true, special = function (_g296)
    local args = _g296[1]
    local body = sub(_g296, 1)
    return(compile_function(args, body))
  end, module = "special"}, ["if"] = {module = "special", special = function (form, tail63)
    local str = ""
    local i = 0
    local _g297 = form
    while (i < length(_g297)) do
      local condition = _g297[(i + 1)]
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
  end, stmt = true, tr = true, export = true}, ["not"] = {export = true, special = function (_g298)
    local x = _g298[1]
    local _g299 = compile(x)
    local open = (function ()
      if (target == "js") then
        return("!(")
      else
        return("(not ")
      end
    end)()
    return((open .. _g299 .. ")"))
  end, module = "special"}, ["while"] = {module = "special", special = function (_g300)
    local condition = _g300[1]
    local body = sub(_g300, 1)
    local _g301 = compile(condition)
    local _g302 = (function ()
      indent_level = (indent_level + 1)
      local _g303 = compile_body(body)
      indent_level = (indent_level - 1)
      return(_g303)
    end)()
    local ind = indentation()
    if (target == "js") then
      return((ind .. "while (" .. _g301 .. ") {\n" .. _g302 .. ind .. "}\n"))
    else
      return((ind .. "while " .. _g301 .. " do\n" .. _g302 .. ind .. "end\n"))
    end
  end, stmt = true, tr = true, export = true}, ["do"] = {module = "special", special = function (forms, tail63)
    return(compile_body(forms, {_stash = true, ["tail?"] = tail63}))
  end, stmt = true, tr = true, export = true}, ["%try"] = {module = "special", special = function (forms)
    local ind = indentation()
    local body = (function ()
      indent_level = (indent_level + 1)
      local _g304 = compile_body(forms, {_stash = true, ["tail?"] = true})
      indent_level = (indent_level - 1)
      return(_g304)
    end)()
    local e = make_id()
    local handler = join({"return", join({"%array", false, e})})
    local h = (function ()
      indent_level = (indent_level + 1)
      local _g305 = compile(handler, {_stash = true, ["stmt?"] = true})
      indent_level = (indent_level - 1)
      return(_g305)
    end)()
    return((ind .. "try {\n" .. body .. ind .. "}\n" .. ind .. "catch (" .. e .. ") {\n" .. h .. ind .. "}\n"))
  end, stmt = true, tr = true, export = true}, ["%for"] = {module = "special", special = function (_g306)
    local _g307 = _g306[1]
    local t = _g307[1]
    local k = _g307[2]
    local body = sub(_g306, 1)
    local _g308 = compile(t)
    local ind = indentation()
    local _g309 = (function ()
      indent_level = (indent_level + 1)
      local _g310 = compile_body(body)
      indent_level = (indent_level - 1)
      return(_g310)
    end)()
    if (target == "lua") then
      return((ind .. "for " .. k .. " in next, " .. _g308 .. " do\n" .. _g309 .. ind .. "end\n"))
    else
      return((ind .. "for (" .. k .. " in " .. _g308 .. ") {\n" .. _g309 .. ind .. "}\n"))
    end
  end, stmt = true, tr = true, export = true}, ["%object"] = {export = true, special = function (forms)
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
    local _g311 = pairs
    while (i < length(_g311)) do
      local _g312 = _g311[(i + 1)]
      local k = _g312[1]
      local v = _g312[2]
      if (not string63(k)) then
        error(("Illegal key: " .. to_string(k)))
      end
      local _g313 = compile(v)
      local _g314 = (function ()
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
      str = (str .. _g314 .. sep .. _g313)
      if (i < (length(pairs) - 1)) then
        str = (str .. ", ")
      end
      i = (i + 1)
    end
    return((str .. "}"))
  end, module = "special"}, ["set"] = {stmt = true, module = "special", special = function (_g315)
    local lh = _g315[1]
    local rh = _g315[2]
    if nil63(rh) then
      error("Missing right-hand side in assignment")
    end
    return((indentation() .. compile(lh) .. " = " .. compile(rh)))
  end, export = true}, ["return"] = {stmt = true, module = "special", special = function (_g316)
    local x = _g316[1]
    local _g317 = (function ()
      if nil63(x) then
        return("return")
      else
        return(compile_call(join({"return", x})))
      end
    end)()
    return((indentation() .. _g317))
  end, export = true}, ["%local-function"] = {module = "special", special = function (_g318)
    local name = _g318[1]
    local args = _g318[2]
    local body = sub(_g318, 2)
    local x = compile_function(args, body, {_stash = true, name = name, prefix = "local "})
    return((indentation() .. x))
  end, stmt = true, tr = true, export = true}, ["%local"] = {stmt = true, module = "special", special = function (_g319)
    local name = _g319[1]
    local value = _g319[2]
    local id = compile(name)
    local _g320 = compile(value)
    local keyword = (function ()
      if (target == "js") then
        return("var ")
      else
        return("local ")
      end
    end)()
    local ind = indentation()
    return((ind .. keyword .. id .. " = " .. _g320))
  end, export = true}, ["error"] = {stmt = true, module = "special", special = function (_g321)
    local x = _g321[1]
    local e = (function ()
      if (target == "js") then
        return(("throw " .. compile(x)))
      else
        return(compile_call(join({"error", x})))
      end
    end)()
    return((indentation() .. e))
  end, export = true}, ["break"] = {stmt = true, module = "special", special = function (_g111)
    return((indentation() .. "break"))
  end, export = true}, ["get"] = {export = true, special = function (_g322)
    local t = _g322[1]
    local k = _g322[2]
    local _g323 = compile(t)
    local k1 = compile(k)
    if ((target == "lua") and (char(_g323, 0) == "{")) then
      _g323 = ("(" .. _g323 .. ")")
    end
    if (string_literal63(k) and valid_id63(inner(k))) then
      return((_g323 .. "." .. inner(k)))
    else
      return((_g323 .. "[" .. k1 .. "]"))
    end
  end, module = "special"}, ["%array"] = {export = true, special = function (forms)
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
    local _g324 = forms
    while (i < length(_g324)) do
      local x = _g324[(i + 1)]
      str = (str .. compile(x))
      if (i < (length(forms) - 1)) then
        str = (str .. ", ")
      end
      i = (i + 1)
    end
    return((open .. str .. close))
  end, module = "special"}, ["%global-function"] = {module = "special", special = function (_g325)
    local name = _g325[1]
    local args = _g325[2]
    local body = sub(_g325, 2)
    if (target == "lua") then
      local x = compile_function(args, body, {_stash = true, name = name})
      return((indentation() .. x))
    else
      return(compile(join({"set", name, join({"%function", args}, body)}), {_stash = true, ["stmt?"] = true}))
    end
  end, stmt = true, tr = true, export = true}}}, lib = {import = {"core", "special"}, export = {}}, utilities = {import = {"special", "core"}, export = {setenv = {export = true, module = "utilities", variable = true}, getenv = {export = true, module = "utilities", variable = true}, ["macro-function"] = {export = true, module = "utilities", variable = true}, ["macro?"] = {export = true, module = "utilities", variable = true}, ["special?"] = {export = true, module = "utilities", variable = true}, ["special-form?"] = {export = true, module = "utilities", variable = true}, ["symbol-expansion"] = {export = true, module = "utilities", variable = true}, ["symbol?"] = {export = true, module = "utilities", variable = true}, ["variable?"] = {export = true, module = "utilities", variable = true}, ["bound?"] = {export = true, module = "utilities", variable = true}, quoted = {export = true, module = "utilities", variable = true}, ["stash*"] = {export = true, module = "utilities", variable = true}, ["make-id"] = {}, bind = {export = true, module = "utilities", variable = true}, ["bind*"] = {export = true, module = "utilities", variable = true}, quasiexpand = {export = true, module = "utilities", variable = true}, macroexpand = {export = true, module = "utilities", variable = true}, indentation = {export = true, module = "utilities", variable = true}, ["with-indent"] = {export = true, module = "utilities", macro = function (form)
    local result = make_id()
    return(join({"do", join({"inc", "indent-level"}), join({"let", join({result, form}), join({"dec", "indent-level"}), result})}))
  end}, ["valid-id?"] = {export = true, module = "utilities", variable = true}, ["to-id"] = {export = true, module = "utilities", variable = true}, ["module-key"] = {export = true, module = "utilities", variable = true}, imported = {export = true, module = "utilities", variable = true}, exported = {export = true, module = "utilities", variable = true}, ["quote-environment"] = {export = true, module = "utilities", variable = true}, ["quote-modules"] = {export = true, module = "utilities", variable = true}, ["initial-environment"] = {export = true, module = "utilities", variable = true}, ["indent-level"] = {global = true, export = true, module = "utilities"}}}, system = {import = {"special", "core"}, export = {nexus = {global = true, export = true, module = "system"}}}}
  environment = {{["define-module"] = {export = true, module = "compiler", macro = function (spec, ...)
    local body = unstash({...})
    local _g326 = sub(body, 0)
    local imports = {}
    local imp = _g326.import
    local exp = _g326.export
    local _g328 = 0
    local _g327 = (imp or {})
    while (_g328 < length(_g327)) do
      local k = _g327[(_g328 + 1)]
      load_module(k)
      add(imports, imported(k))
      _g328 = (_g328 + 1)
    end
    modules[module_key(spec)] = {import = imp, export = {}}
    local _g330 = 0
    local _g329 = (exp or {})
    while (_g330 < length(_g329)) do
      local k = _g329[(_g330 + 1)]
      setenv(k, {_stash = true, export = true})
      _g330 = (_g330 + 1)
    end
    return(join({"do"}, imports))
  end}}}
  return
end)();
(function ()
  local _g38 = nexus.utilities
  local setenv = _g38.setenv
  local getenv = _g38.getenv
  local macro_function = _g38["macro-function"]
  local macro63 = _g38["macro?"]
  local special63 = _g38["special?"]
  local special_form63 = _g38["special-form?"]
  local symbol_expansion = _g38["symbol-expansion"]
  local symbol63 = _g38["symbol?"]
  local variable63 = _g38["variable?"]
  local bound63 = _g38["bound?"]
  local quoted = _g38.quoted
  local stash42 = _g38["stash*"]
  local bind = _g38.bind
  local bind42 = _g38["bind*"]
  local quasiexpand = _g38.quasiexpand
  local macroexpand = _g38.macroexpand
  local indentation = _g38.indentation
  local valid_id63 = _g38["valid-id?"]
  local to_id = _g38["to-id"]
  local module_key = _g38["module-key"]
  local imported = _g38.imported
  local exported = _g38.exported
  local quote_environment = _g38["quote-environment"]
  local quote_modules = _g38["quote-modules"]
  local initial_environment = _g38["initial-environment"]
  local _g72 = nexus.runtime
  local length = _g72.length
  local empty63 = _g72["empty?"]
  local some63 = _g72["some?"]
  local substring = _g72.substring
  local sublist = _g72.sublist
  local sub = _g72.sub
  local inner = _g72.inner
  local hd = _g72.hd
  local tl = _g72.tl
  local add = _g72.add
  local drop = _g72.drop
  local last = _g72.last
  local reverse = _g72.reverse
  local join = _g72.join
  local reduce = _g72.reduce
  local keep = _g72.keep
  local find = _g72.find
  local pairwise = _g72.pairwise
  local iterate = _g72.iterate
  local replicate = _g72.replicate
  local splice = _g72.splice
  local map = _g72.map
  local map42 = _g72["map*"]
  local mapt = _g72.mapt
  local mapo = _g72.mapo
  local keys63 = _g72["keys?"]
  local extend = _g72.extend
  local exclude = _g72.exclude
  local char = _g72.char
  local code = _g72.code
  local search = _g72.search
  local split = _g72.split
  local cat = _g72.cat
  local _43 = _g72["+"]
  local _ = _g72["-"]
  local _42 = _g72["*"]
  local _47 = _g72["/"]
  local _37 = _g72["%"]
  local _62 = _g72[">"]
  local _60 = _g72["<"]
  local _61 = _g72["="]
  local _6261 = _g72[">="]
  local _6061 = _g72["<="]
  local read_file = _g72["read-file"]
  local write_file = _g72["write-file"]
  local print = _g72.print
  local write = _g72.write
  local exit = _g72.exit
  local type = _g72.type
  local nil63 = _g72["nil?"]
  local is63 = _g72["is?"]
  local string63 = _g72["string?"]
  local string_literal63 = _g72["string-literal?"]
  local id_literal63 = _g72["id-literal?"]
  local number63 = _g72["number?"]
  local boolean63 = _g72["boolean?"]
  local function63 = _g72["function?"]
  local composite63 = _g72["composite?"]
  local atom63 = _g72["atom?"]
  local table63 = _g72["table?"]
  local list63 = _g72["list?"]
  local parse_number = _g72["parse-number"]
  local to_string = _g72["to-string"]
  local apply = _g72.apply
  local stash = _g72.stash
  local unstash = _g72.unstash
  local _37message_handler = _g72["%message-handler"]
  local _g77 = nexus.reader
  local make_stream = _g77["make-stream"]
  local read_table = _g77["read-table"]
  local read = _g77.read
  local read_all = _g77["read-all"]
  local read_from_string = _g77["read-from-string"]
  local _g110 = nexus.compiler
  local compile_body = _g110["compile-body"]
  local compile_call = _g110["compile-call"]
  local compile_branch = _g110["compile-branch"]
  local compile_function = _g110["compile-function"]
  local compile_special = _g110["compile-special"]
  local compile = _g110.compile
  local eval = _g110.eval
  local load_module = _g110["load-module"]
  local open_module = _g110["open-module"]
  local in_module = _g110["in-module"]
  local function rep(str)
    local _g332 = (function ()
      local _g333,_g334 = xpcall(function ()
        return(eval(read_from_string(str)))
      end, _37message_handler)
      return({_g333, _g334})
    end)()
    local _g1 = _g332[1]
    local x = _g332[2]
    if is63(x) then
      return(print((to_string(x) .. " ")))
    end
  end
  local function repl()
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
  local function usage()
    print((to_string("usage: lumen [options] <module>") .. " "))
    print((to_string("options:") .. " "))
    print((to_string("  -o <output>\tOutput file") .. " "))
    print((to_string("  -t <target>\tTarget language (default: lua)") .. " "))
    print((to_string("  -e <expr>\tExpression to evaluate") .. " "))
    return(exit())
  end
  local function main()
    local args = arg
    if ((hd(args) == "-h") or (hd(args) == "--help")) then
      usage()
    end
    local spec = nil
    local output = nil
    local target1 = nil
    local expr = nil
    local i = 0
    local _g335 = args
    while (i < length(_g335)) do
      local arg = _g335[(i + 1)]
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
      return(write_file(output, compile_module(spec)))
    else
      local _g336 = (spec or "main")
      in_module(_g336)
      if expr then
        return(rep(expr))
      else
        return(repl())
      end
    end
  end
  main()
  return
end)();
