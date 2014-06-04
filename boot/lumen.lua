(function ()
  nexus = {}
  function setenv(k, ...)
    local keys = unstash({...})
    local _g7 = sub(keys, 0)
    if string63(k) then
      local frame = last(environment)
      local x = (frame[k] or {})
      local k1 = nil
      local _g8 = _g7
      for k1 in next, _g8 do
        if (not number63(k1)) then
          local v = _g8[k1]
          x[k1] = v
        end
      end
      x.module = current_module
      frame[k] = x
    end
  end
  function getenv(k, ...)
    local keys = unstash({...})
    local _g9 = sub(keys, 0)
    if string63(k) then
      local b = find(function (e)
        return(e[k])
      end, reverse(environment))
      if table63(b) then
        local _g10 = keys63(_g9)
        if _g10 then
          return(b[_g10])
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
      local _g11 = args
      for k in next, _g11 do
        if (not number63(k)) then
          local v = _g11[k]
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
      local _g12 = lh
      while (i < length(_g12)) do
        local x = _g12[(i + 1)]
        bs = join(bs, bind(x, join({"at", rh, i})))
        i = (i + 1)
      end
      if r then
        bs = join(bs, bind(r, join({"sub", rh, length(lh)})))
      end
      local k = nil
      local _g13 = lh
      for k in next, _g13 do
        if (not number63(k)) then
          local v = _g13[k]
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
      local _g15 = 0
      local _g14 = args
      while (_g15 < length(_g14)) do
        local arg = _g14[(_g15 + 1)]
        if atom63(arg) then
          add(args1, arg)
        elseif (list63(arg) or keys63(arg)) then
          local v = make_id()
          add(args1, v)
          bs = join(bs, {arg, v})
        end
        _g15 = (_g15 + 1)
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
        local _g2 = form[1]
        local _g16 = form[2]
        local t = _g16[1]
        local k = _g16[2]
        local body = sub(form, 2)
        return(join({"%for", join({macroexpand(t), macroexpand(k)})}, macroexpand(body)))
      elseif (x == "%function") then
        local _g3 = form[1]
        local args = form[2]
        local _g17 = sub(form, 2)
        add(environment, {_scope = true})
        local _g19 = (function ()
          local _g21 = 0
          local _g20 = args
          while (_g21 < length(_g20)) do
            local _g18 = _g20[(_g21 + 1)]
            setenv(_g18, {_stash = true, variable = true})
            _g21 = (_g21 + 1)
          end
          return(join({"%function", map42(macroexpand, args)}, macroexpand(_g17)))
        end)()
        drop(environment)
        return(_g19)
      elseif ((x == "%local-function") or (x == "%global-function")) then
        local _g4 = form[1]
        local name = form[2]
        local _g22 = form[3]
        local _g23 = sub(form, 3)
        add(environment, {_scope = true})
        local _g25 = (function ()
          local _g27 = 0
          local _g26 = _g22
          while (_g27 < length(_g26)) do
            local _g24 = _g26[(_g27 + 1)]
            setenv(_g24, {_stash = true, variable = true})
            _g27 = (_g27 + 1)
          end
          return(join({x, name, map42(macroexpand, _g22)}, macroexpand(_g23)))
        end)()
        drop(environment)
        return(_g25)
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
    local _g28 = form
    for k in next, _g28 do
      if (not number63(k)) then
        local v = _g28[k]
        local _g29 = (function ()
          if quasisplice63(v, depth) then
            return(quasiexpand(v[2]))
          else
            return(quasiexpand(v, depth))
          end
        end)()
        last(xs)[k] = _g29
      end
    end
    local _g31 = 0
    local _g30 = form
    while (_g31 < length(_g30)) do
      local x = _g30[(_g31 + 1)]
      if quasisplice63(x, depth) then
        local _g32 = quasiexpand(x[2])
        add(xs, _g32)
        add(xs, {"list"})
      else
        add(last(xs), quasiexpand(x, depth))
      end
      _g31 = (_g31 + 1)
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
  local reserved = {["=="] = true, ["else"] = true, ["end"] = true, [">"] = true, ["finally"] = true, ["*"] = true, ["until"] = true, ["do"] = true, ["throw"] = true, ["switch"] = true, ["try"] = true, ["while"] = true, ["case"] = true, ["with"] = true, ["%"] = true, ["instanceof"] = true, ["typeof"] = true, ["repeat"] = true, ["in"] = true, ["local"] = true, [">="] = true, ["="] = true, ["not"] = true, ["this"] = true, ["debugger"] = true, ["if"] = true, ["false"] = true, ["delete"] = true, ["then"] = true, ["nil"] = true, ["continue"] = true, ["return"] = true, ["+"] = true, ["void"] = true, ["<="] = true, ["new"] = true, ["and"] = true, ["var"] = true, ["default"] = true, ["function"] = true, ["break"] = true, ["or"] = true, ["elseif"] = true, ["catch"] = true, ["-"] = true, ["/"] = true, ["<"] = true, ["true"] = true, ["for"] = true}
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
    local _g33 = toplevel
    for n in next, _g33 do
      if (not number63(n)) then
        local b = _g33[n]
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
      local _g34 = x
      for b in next, _g34 do
        if (not number63(b)) then
          local _g5 = _g34[b]
          add(imports, join({"%local", b, join({"get", m, join({"quote", b})})}))
        end
      end
    end
    return(imports)
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
    return(join({"%object"}, mapo(function (_g6, b)
      return(join({"table"}, quote_binding(b)))
    end, t)))
  end
  function quote_environment(env)
    return(join({"list"}, map(quote_frame, env)))
  end
  local function quote_module(m)
    return(join((function ()
      local _g35 = {"table"}
      _g35.import = quoted(m.import)
      _g35.export = quote_frame(m.export)
      return(_g35)
    end)()))
  end
  function quote_modules()
    return(join({"table"}, map42(quote_module, modules)))
  end
  function initial_environment()
    return({{["define-module"] = getenv("define-module")}})
  end
  _g36 = {}
  nexus.utilities = _g36
  _g36["special?"] = special63
  _g36.quoted = quoted
  _g36["variable?"] = variable63
  _g36["special-form?"] = special_form63
  _g36.indentation = indentation
  _g36.setenv = setenv
  _g36.exported = exported
  _g36["quote-modules"] = quote_modules
  _g36["initial-environment"] = initial_environment
  _g36.imported = imported
  _g36["macro?"] = macro63
  _g36["stash*"] = stash42
  _g36["symbol?"] = symbol63
  _g36["bound?"] = bound63
  _g36["macro-function"] = macro_function
  _g36["module-key"] = module_key
  _g36["to-id"] = to_id
  _g36.macroexpand = macroexpand
  _g36.quasiexpand = quasiexpand
  _g36["bind*"] = bind42
  _g36.getenv = getenv
  _g36["quote-environment"] = quote_environment
  _g36["symbol-expansion"] = symbol_expansion
  _g36["valid-id?"] = valid_id63
  _g36.bind = bind
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
    local _g38 = (upto or length(l))
    local l2 = {}
    while (i < _g38) do
      l2[(j + 1)] = l[(i + 1)]
      i = (i + 1)
      j = (j + 1)
    end
    return(l2)
  end
  function sub(x, from, upto)
    local _g39 = (from or 0)
    if string63(x) then
      return(substring(x, _g39, upto))
    else
      local l = sublist(x, _g39, upto)
      local k = nil
      local _g40 = x
      for k in next, _g40 do
        if (not number63(k)) then
          local v = _g40[k]
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
      local _g41 = l1
      for k in next, _g41 do
        if (not number63(k)) then
          local v = _g41[k]
          l[k] = v
        end
      end
      local _g43 = nil
      local _g42 = l2
      for _g43 in next, _g42 do
        if (not number63(_g43)) then
          local v = _g42[_g43]
          l[_g43] = v
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
    local _g45 = 0
    local _g44 = l
    while (_g45 < length(_g44)) do
      local x = _g44[(_g45 + 1)]
      if f(x) then
        add(l1, x)
      end
      _g45 = (_g45 + 1)
    end
    return(l1)
  end
  function find(f, l)
    local _g47 = 0
    local _g46 = l
    while (_g47 < length(_g46)) do
      local x = _g46[(_g47 + 1)]
      local _g48 = f(x)
      if _g48 then
        return(_g48)
      end
      _g47 = (_g47 + 1)
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
    local _g50 = 0
    local _g49 = l
    while (_g50 < length(_g49)) do
      local x = _g49[(_g50 + 1)]
      local x1 = f(x)
      local s = splice63(x1)
      if list63(s) then
        l1 = join(l1, s)
      elseif is63(s) then
        add(l1, s)
      elseif is63(x1) then
        add(l1, x1)
      end
      _g50 = (_g50 + 1)
    end
    return(l1)
  end
  function map42(f, t)
    local l = map(f, t)
    local k = nil
    local _g51 = t
    for k in next, _g51 do
      if (not number63(k)) then
        local v = _g51[k]
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
    local _g52 = t
    for k in next, _g52 do
      if (not number63(k)) then
        local v = _g52[k]
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
    local _g53 = t
    for k in next, _g53 do
      if (not number63(k)) then
        local v = _g53[k]
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
    local _g54 = t
    for k1 in next, _g54 do
      if (not number63(k1)) then
        local v = _g54[k1]
        k = k1
        break
      end
    end
    return(k)
  end
  function extend(t, ...)
    local xs = unstash({...})
    local _g55 = sub(xs, 0)
    return(join(t, _g55))
  end
  function exclude(t, ...)
    local keys = unstash({...})
    local _g56 = sub(keys, 0)
    local t1 = sublist(t)
    local k = nil
    local _g57 = t
    for k in next, _g57 do
      if (not number63(k)) then
        local v = _g57[k]
        if (not _g56[k]) then
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
    local _g58 = (function ()
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
    local _g59 = sub(xs, 0)
    if empty63(_g59) then
      return("")
    else
      return(reduce(function (a, b)
        return((a .. b))
      end, _g59))
    end
  end
  function _43(...)
    local xs = unstash({...})
    local _g60 = sub(xs, 0)
    return(reduce(function (a, b)
      return((a + b))
    end, _g60))
  end
  function _(...)
    local xs = unstash({...})
    local _g61 = sub(xs, 0)
    return(reduce(function (a, b)
      return((b - a))
    end, reverse(_g61)))
  end
  function _42(...)
    local xs = unstash({...})
    local _g62 = sub(xs, 0)
    return(reduce(function (a, b)
      return((a * b))
    end, _g62))
  end
  function _47(...)
    local xs = unstash({...})
    local _g63 = sub(xs, 0)
    return(reduce(function (a, b)
      return((b / a))
    end, reverse(_g63)))
  end
  function _37(...)
    local xs = unstash({...})
    local _g64 = sub(xs, 0)
    return(reduce(function (a, b)
      return((b % a))
    end, reverse(_g64)))
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
      local _g65 = x
      for k in next, _g65 do
        if (not number63(k)) then
          local v = _g65[k]
          add(x1, (k .. ":"))
          add(x1, v)
        end
      end
      local i = 0
      local _g66 = x1
      while (i < length(_g66)) do
        local y = _g66[(i + 1)]
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
    local _g67 = stash(args)
    return(f(unpack(_g67)))
  end
  function stash(args)
    if keys63(args) then
      local p = {_stash = true}
      local k = nil
      local _g68 = args
      for k in next, _g68 do
        if (not number63(k)) then
          local v = _g68[k]
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
        local _g69 = l
        for k in next, _g69 do
          if (not number63(k)) then
            local v = _g69[k]
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
  _g70 = {}
  nexus.runtime = _g70
  _g70.stash = stash
  _g70.pairwise = pairwise
  _g70.join = join
  _g70.reduce = reduce
  _g70.iterate = iterate
  _g70["function?"] = function63
  _g70.substring = substring
  _g70["-"] = _
  _g70.length = length
  _g70.last = last
  _g70[">="] = _6261
  _g70["keys?"] = keys63
  _g70.splice = splice
  _g70.map = map
  _g70["%message-handler"] = _37message_handler
  _g70.unstash = unstash
  _g70.inner = inner
  _g70.apply = apply
  _g70["string?"] = string63
  _g70.replicate = replicate
  _g70["composite?"] = composite63
  _g70["parse-number"] = parse_number
  _g70["list?"] = list63
  _g70["table?"] = table63
  _g70["atom?"] = atom63
  _g70["to-string"] = to_string
  _g70.tl = tl
  _g70["nil?"] = nil63
  _g70["id-literal?"] = id_literal63
  _g70[">"] = _62
  _g70.search = search
  _g70["number?"] = number63
  _g70["read-file"] = read_file
  _g70["is?"] = is63
  _g70["boolean?"] = boolean63
  _g70.add = add
  _g70["<="] = _6061
  _g70.exit = exit
  _g70.char = char
  _g70.hd = hd
  _g70["write-file"] = write_file
  _g70["string-literal?"] = string_literal63
  _g70["="] = _61
  _g70["<"] = _60
  _g70["%"] = _37
  _g70["/"] = _47
  _g70.reverse = reverse
  _g70.split = split
  _g70["*"] = _42
  _g70["+"] = _43
  _g70.cat = cat
  _g70.code = code
  _g70.write = write
  _g70.extend = extend
  _g70.exclude = exclude
  _g70.mapt = mapt
  _g70["map*"] = map42
  _g70["empty?"] = empty63
  _g70.drop = drop
  _g70.sublist = sublist
  _g70.sub = sub
  _g70["some?"] = some63
  _g70.mapo = mapo
  _g70.keep = keep
  _g70.find = find
end)();
(function ()
  local delimiters = {["\n"] = true, ["("] = true, [")"] = true, [";"] = true}
  local whitespace = {["\t"] = true, ["\n"] = true, [" "] = true}
  local function make_stream(str)
    return({len = length(str), pos = 0, string = str})
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
  _g75 = {}
  nexus.reader = _g75
  _g75["read-all"] = read_all
  _g75.read = read
  _g75["read-table"] = read_table
  _g75["make-stream"] = make_stream
  _g75["read-from-string"] = read_from_string
end)();
(function ()
  local _g77 = nexus.utilities
  local special63 = _g77["special?"]
  local initial_environment = _g77["initial-environment"]
  local setenv = _g77.setenv
  local exported = _g77.exported
  local imported = _g77.imported
  local stash42 = _g77["stash*"]
  local valid_id63 = _g77["valid-id?"]
  local macro_function = _g77["macro-function"]
  local symbol63 = _g77["symbol?"]
  local quote_environment = _g77["quote-environment"]
  local quoted = _g77.quoted
  local symbol_expansion = _g77["symbol-expansion"]
  local getenv = _g77.getenv
  local quote_modules = _g77["quote-modules"]
  local variable63 = _g77["variable?"]
  local bind42 = _g77["bind*"]
  local special_form63 = _g77["special-form?"]
  local macro63 = _g77["macro?"]
  local indentation = _g77.indentation
  local bind = _g77.bind
  local to_id = _g77["to-id"]
  local module_key = _g77["module-key"]
  local macroexpand = _g77.macroexpand
  local bound63 = _g77["bound?"]
  local quasiexpand = _g77.quasiexpand
  local _g78 = nexus.runtime
  local stash = _g78.stash
  local exit = _g78.exit
  local pairwise = _g78.pairwise
  local list63 = _g78["list?"]
  local reduce = _g78.reduce
  local id_literal63 = _g78["id-literal?"]
  local code = _g78.code
  local function63 = _g78["function?"]
  local substring = _g78.substring
  local _ = _g78["-"]
  local _42 = _g78["*"]
  local _43 = _g78["+"]
  local char = _g78.char
  local _6261 = _g78[">="]
  local keys63 = _g78["keys?"]
  local _6061 = _g78["<="]
  local splice = _g78.splice
  local _37 = _g78["%"]
  local sublist = _g78.sublist
  local map = _g78.map
  local _61 = _g78["="]
  local inner = _g78.inner
  local string63 = _g78["string?"]
  local replicate = _g78.replicate
  local to_string = _g78["to-string"]
  local apply = _g78.apply
  local _62 = _g78[">"]
  local search = _g78.search
  local number63 = _g78["number?"]
  local composite63 = _g78["composite?"]
  local boolean63 = _g78["boolean?"]
  local add = _g78.add
  local hd = _g78.hd
  local string_literal63 = _g78["string-literal?"]
  local table63 = _g78["table?"]
  local write_file = _g78["write-file"]
  local reverse = _g78.reverse
  local split = _g78.split
  local write = _g78.write
  local extend = _g78.extend
  local empty63 = _g78["empty?"]
  local tl = _g78.tl
  local _47 = _g78["/"]
  local length = _g78.length
  local last = _g78.last
  local _37message_handler = _g78["%message-handler"]
  local map42 = _g78["map*"]
  local some63 = _g78["some?"]
  local join = _g78.join
  local unstash = _g78.unstash
  local iterate = _g78.iterate
  local mapt = _g78.mapt
  local sub = _g78.sub
  local is63 = _g78["is?"]
  local cat = _g78.cat
  local mapo = _g78.mapo
  local _60 = _g78["<"]
  local parse_number = _g78["parse-number"]
  local drop = _g78.drop
  local exclude = _g78.exclude
  local nil63 = _g78["nil?"]
  local atom63 = _g78["atom?"]
  local keep = _g78.keep
  local find = _g78.find
  local read_file = _g78["read-file"]
  local _g79 = nexus.reader
  local read_from_string = _g79["read-from-string"]
  local make_stream = _g79["make-stream"]
  local read = _g79.read
  local read_table = _g79["read-table"]
  local read_all = _g79["read-all"]
  local infix = {lua = {["and"] = true, cat = "..", ["="] = "==", ["~="] = true, ["or"] = true}, js = {["and"] = "&&", ["~="] = "!=", ["="] = "===", cat = "+", ["or"] = "||"}, common = {["<"] = true, ["-"] = true, ["*"] = true, ["+"] = true, [">="] = true, [">"] = true, ["<="] = true, ["%"] = true, ["/"] = true}}
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
    local _g80 = args
    while (i < length(_g80)) do
      local arg = _g80[(i + 1)]
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
    local _g81 = unstash({...})
    local tail63 = _g81["tail?"]
    local str = ""
    local i = 0
    local _g82 = forms
    while (i < length(_g82)) do
      local x = _g82[(i + 1)]
      local t63 = (tail63 and (i == (length(forms) - 1)))
      str = (str .. compile(x, {_stash = true, ["tail?"] = t63, ["stmt?"] = true}))
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
  local function compile_infix(_g83)
    local op = _g83[1]
    local args = sub(_g83, 1)
    local str = "("
    local _g84 = getop(op)
    local i = 0
    local _g85 = args
    while (i < length(_g85)) do
      local arg = _g85[(i + 1)]
      if ((_g84 == "-") and (length(args) == 1)) then
        str = (str .. _g84 .. compile(arg))
      else
        str = (str .. compile(arg))
        if (i < (length(args) - 1)) then
          str = (str .. " " .. _g84 .. " ")
        end
      end
      i = (i + 1)
    end
    return((str .. ")"))
  end
  function compile_branch(condition, body, first63, last63, tail63)
    local cond1 = compile(condition)
    local _g86 = (function ()
      indent_level = (indent_level + 1)
      local _g87 = compile(body, {_stash = true, ["tail?"] = tail63, ["stmt?"] = true})
      indent_level = (indent_level - 1)
      return(_g87)
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
      return((ind .. "if (" .. cond1 .. ") {\n" .. _g86 .. ind .. "}" .. tr))
    elseif first63 then
      return((ind .. "if " .. cond1 .. " then\n" .. _g86 .. tr))
    elseif (nil63(condition) and (target == "js")) then
      return((" else {\n" .. _g86 .. ind .. "}\n"))
    elseif nil63(condition) then
      return((ind .. "else\n" .. _g86 .. tr))
    elseif (target == "js") then
      return((" else if (" .. cond1 .. ") {\n" .. _g86 .. ind .. "}" .. tr))
    else
      return((ind .. "elseif " .. cond1 .. " then\n" .. _g86 .. tr))
    end
  end
  function compile_function(args, body, ...)
    local _g88 = unstash({...})
    local name = _g88.name
    local prefix = _g88.prefix
    local id = (function ()
      if name then
        return(compile(name))
      else
        return("")
      end
    end)()
    local _g89 = (prefix or "")
    local _g90 = compile_args(args)
    local _g91 = (function ()
      indent_level = (indent_level + 1)
      local _g92 = compile_body(body, {_stash = true, ["tail?"] = true})
      indent_level = (indent_level - 1)
      return(_g92)
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
      return(("function " .. id .. _g90 .. " {\n" .. _g91 .. ind .. "}" .. tr))
    else
      return((_g89 .. "function " .. id .. _g90 .. "\n" .. _g91 .. ind .. tr))
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
    local _g93 = getenv(hd(form))
    local stmt = _g93.stmt
    local special = _g93.special
    local self_tr63 = _g93.tr
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
    local _g94 = unstash({...})
    local tail63 = _g94["tail?"]
    local stmt63 = _g94["stmt?"]
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
      local _g95 = (function ()
        if atom63(form) then
          return(compile_atom(form))
        elseif infix63(form) then
          return(compile_infix(form))
        else
          return(compile_call(form))
        end
      end)()
      return((ind .. _g95 .. tr))
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
    local _g96 = macroexpand(body)
    local epilog = macroexpand(exported())
    return(join({join({"%function", {}}, join(_g96, {epilog}))}))
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
    local _g106 = toplevel
    for name in next, _g106 do
      if (not number63(name)) then
        local binding = _g106[name]
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
    local _g107 = m.export
    for k in next, _g107 do
      if (not number63(k)) then
        local v = _g107[k]
        frame[k] = v
      end
    end
  end
  function in_module(spec)
    load_module(spec)
    local m = module(spec)
    return(map(open_module, m.import))
  end
  _g108 = {}
  nexus.compiler = _g108
  _g108["in-module"] = in_module
  _g108["compile-function"] = compile_function
  _g108.eval = eval
  _g108["compile-call"] = compile_call
  _g108.compile = compile
  _g108["open-module"] = open_module
  _g108["load-module"] = load_module
  _g108["compile-special"] = compile_special
  _g108["compile-branch"] = compile_branch
  _g108["compile-body"] = compile_body
end)();
(function ()
  local _g111 = nexus.utilities
  local special63 = _g111["special?"]
  local initial_environment = _g111["initial-environment"]
  local setenv = _g111.setenv
  local exported = _g111.exported
  local imported = _g111.imported
  local stash42 = _g111["stash*"]
  local valid_id63 = _g111["valid-id?"]
  local macro_function = _g111["macro-function"]
  local symbol63 = _g111["symbol?"]
  local quote_environment = _g111["quote-environment"]
  local quoted = _g111.quoted
  local symbol_expansion = _g111["symbol-expansion"]
  local getenv = _g111.getenv
  local quote_modules = _g111["quote-modules"]
  local variable63 = _g111["variable?"]
  local bind42 = _g111["bind*"]
  local special_form63 = _g111["special-form?"]
  local macro63 = _g111["macro?"]
  local indentation = _g111.indentation
  local bind = _g111.bind
  local to_id = _g111["to-id"]
  local module_key = _g111["module-key"]
  local macroexpand = _g111.macroexpand
  local bound63 = _g111["bound?"]
  local quasiexpand = _g111.quasiexpand
  local _g112 = nexus.compiler
  local compile_function = _g112["compile-function"]
  local in_module = _g112["in-module"]
  local eval = _g112.eval
  local compile_branch = _g112["compile-branch"]
  local compile = _g112.compile
  local load_module = _g112["load-module"]
  local compile_body = _g112["compile-body"]
  local open_module = _g112["open-module"]
  local compile_special = _g112["compile-special"]
  local compile_call = _g112["compile-call"]
end)();
(function ()
  local _g168 = nexus.utilities
  local special63 = _g168["special?"]
  local initial_environment = _g168["initial-environment"]
  local setenv = _g168.setenv
  local exported = _g168.exported
  local imported = _g168.imported
  local stash42 = _g168["stash*"]
  local valid_id63 = _g168["valid-id?"]
  local macro_function = _g168["macro-function"]
  local symbol63 = _g168["symbol?"]
  local quote_environment = _g168["quote-environment"]
  local quoted = _g168.quoted
  local symbol_expansion = _g168["symbol-expansion"]
  local getenv = _g168.getenv
  local quote_modules = _g168["quote-modules"]
  local variable63 = _g168["variable?"]
  local bind42 = _g168["bind*"]
  local special_form63 = _g168["special-form?"]
  local macro63 = _g168["macro?"]
  local indentation = _g168.indentation
  local bind = _g168.bind
  local to_id = _g168["to-id"]
  local module_key = _g168["module-key"]
  local macroexpand = _g168.macroexpand
  local bound63 = _g168["bound?"]
  local quasiexpand = _g168.quasiexpand
  local _g169 = nexus.runtime
  local stash = _g169.stash
  local exit = _g169.exit
  local pairwise = _g169.pairwise
  local list63 = _g169["list?"]
  local reduce = _g169.reduce
  local id_literal63 = _g169["id-literal?"]
  local code = _g169.code
  local function63 = _g169["function?"]
  local substring = _g169.substring
  local _ = _g169["-"]
  local _42 = _g169["*"]
  local _43 = _g169["+"]
  local char = _g169.char
  local _6261 = _g169[">="]
  local keys63 = _g169["keys?"]
  local _6061 = _g169["<="]
  local splice = _g169.splice
  local _37 = _g169["%"]
  local sublist = _g169.sublist
  local map = _g169.map
  local _61 = _g169["="]
  local inner = _g169.inner
  local string63 = _g169["string?"]
  local replicate = _g169.replicate
  local to_string = _g169["to-string"]
  local apply = _g169.apply
  local _62 = _g169[">"]
  local search = _g169.search
  local number63 = _g169["number?"]
  local composite63 = _g169["composite?"]
  local boolean63 = _g169["boolean?"]
  local add = _g169.add
  local hd = _g169.hd
  local string_literal63 = _g169["string-literal?"]
  local table63 = _g169["table?"]
  local write_file = _g169["write-file"]
  local reverse = _g169.reverse
  local split = _g169.split
  local write = _g169.write
  local extend = _g169.extend
  local empty63 = _g169["empty?"]
  local tl = _g169.tl
  local _47 = _g169["/"]
  local length = _g169.length
  local last = _g169.last
  local _37message_handler = _g169["%message-handler"]
  local map42 = _g169["map*"]
  local some63 = _g169["some?"]
  local join = _g169.join
  local unstash = _g169.unstash
  local iterate = _g169.iterate
  local mapt = _g169.mapt
  local sub = _g169.sub
  local is63 = _g169["is?"]
  local cat = _g169.cat
  local mapo = _g169.mapo
  local _60 = _g169["<"]
  local parse_number = _g169["parse-number"]
  local drop = _g169.drop
  local exclude = _g169.exclude
  local nil63 = _g169["nil?"]
  local atom63 = _g169["atom?"]
  local keep = _g169.keep
  local find = _g169.find
  local read_file = _g169["read-file"]
  target = "lua"
end)();
(function ()
  local _g242 = nexus.utilities
  local special63 = _g242["special?"]
  local initial_environment = _g242["initial-environment"]
  local setenv = _g242.setenv
  local exported = _g242.exported
  local imported = _g242.imported
  local stash42 = _g242["stash*"]
  local valid_id63 = _g242["valid-id?"]
  local macro_function = _g242["macro-function"]
  local symbol63 = _g242["symbol?"]
  local quote_environment = _g242["quote-environment"]
  local quoted = _g242.quoted
  local symbol_expansion = _g242["symbol-expansion"]
  local getenv = _g242.getenv
  local quote_modules = _g242["quote-modules"]
  local variable63 = _g242["variable?"]
  local bind42 = _g242["bind*"]
  local special_form63 = _g242["special-form?"]
  local macro63 = _g242["macro?"]
  local indentation = _g242.indentation
  local bind = _g242.bind
  local to_id = _g242["to-id"]
  local module_key = _g242["module-key"]
  local macroexpand = _g242.macroexpand
  local bound63 = _g242["bound?"]
  local quasiexpand = _g242.quasiexpand
  modules = {runtime = {import = {"special", "core"}, export = {stash = {variable = true, export = true, module = "runtime"}, exit = {variable = true, export = true, module = "runtime"}, pairwise = {variable = true, export = true, module = "runtime"}, join = {variable = true, export = true, module = "runtime"}, reduce = {variable = true, export = true, module = "runtime"}, ["id-literal?"] = {variable = true, export = true, module = "runtime"}, code = {variable = true, export = true, module = "runtime"}, ["function?"] = {variable = true, export = true, module = "runtime"}, substring = {variable = true, export = true, module = "runtime"}, ["-"] = {variable = true, export = true, module = "runtime"}, ["*"] = {variable = true, export = true, module = "runtime"}, ["+"] = {variable = true, export = true, module = "runtime"}, char = {variable = true, export = true, module = "runtime"}, [">="] = {variable = true, export = true, module = "runtime"}, ["keys?"] = {variable = true, export = true, module = "runtime"}, ["<="] = {variable = true, export = true, module = "runtime"}, splice = {variable = true, export = true, module = "runtime"}, ["%"] = {variable = true, export = true, module = "runtime"}, print = {}, map = {variable = true, export = true, module = "runtime"}, ["="] = {variable = true, export = true, module = "runtime"}, inner = {variable = true, export = true, module = "runtime"}, ["string?"] = {variable = true, export = true, module = "runtime"}, replicate = {variable = true, export = true, module = "runtime"}, ["to-string"] = {variable = true, export = true, module = "runtime"}, tl = {variable = true, export = true, module = "runtime"}, unstash = {variable = true, export = true, module = "runtime"}, search = {variable = true, export = true, module = "runtime"}, ["number?"] = {variable = true, export = true, module = "runtime"}, ["composite?"] = {variable = true, export = true, module = "runtime"}, ["boolean?"] = {variable = true, export = true, module = "runtime"}, add = {variable = true, export = true, module = "runtime"}, hd = {variable = true, export = true, module = "runtime"}, ["string-literal?"] = {variable = true, export = true, module = "runtime"}, type = {}, ["table?"] = {variable = true, export = true, module = "runtime"}, ["write-file"] = {variable = true, export = true, module = "runtime"}, reverse = {variable = true, export = true, module = "runtime"}, split = {variable = true, export = true, module = "runtime"}, write = {variable = true, export = true, module = "runtime"}, extend = {variable = true, export = true, module = "runtime"}, ["parse-number"] = {variable = true, export = true, module = "runtime"}, apply = {variable = true, export = true, module = "runtime"}, ["is?"] = {variable = true, export = true, module = "runtime"}, mapo = {variable = true, export = true, module = "runtime"}, [">"] = {variable = true, export = true, module = "runtime"}, sublist = {variable = true, export = true, module = "runtime"}, ["%message-handler"] = {variable = true, export = true, module = "runtime"}, ["map*"] = {variable = true, export = true, module = "runtime"}, ["some?"] = {variable = true, export = true, module = "runtime"}, drop = {variable = true, export = true, module = "runtime"}, ["list?"] = {variable = true, export = true, module = "runtime"}, ["empty?"] = {variable = true, export = true, module = "runtime"}, ["<"] = {variable = true, export = true, module = "runtime"}, sub = {variable = true, export = true, module = "runtime"}, iterate = {variable = true, export = true, module = "runtime"}, mapt = {variable = true, export = true, module = "runtime"}, ["/"] = {variable = true, export = true, module = "runtime"}, length = {variable = true, export = true, module = "runtime"}, last = {variable = true, export = true, module = "runtime"}, cat = {variable = true, export = true, module = "runtime"}, exclude = {variable = true, export = true, module = "runtime"}, ["nil?"] = {variable = true, export = true, module = "runtime"}, ["atom?"] = {variable = true, export = true, module = "runtime"}, keep = {variable = true, export = true, module = "runtime"}, find = {variable = true, export = true, module = "runtime"}, ["read-file"] = {variable = true, export = true, module = "runtime"}}}, core = {import = {"utilities", "runtime", "special", "core"}, export = {["join*"] = {macro = function (...)
    local xs = unstash({...})
    if (length(xs) == 1) then
      return(join({"join"}, xs))
    else
      return(reduce(function (a, b)
        return({"join", a, b})
      end, xs))
    end
  end, export = true, module = "core"}, dec = {macro = function (n, by)
    return(join({"set", n, join({"-", n, (by or 1)})}))
  end, export = true, module = "core"}, quote = {macro = function (form)
    return(quoted(form))
  end, export = true, module = "core"}, each = {macro = function (_g243, ...)
    local t = _g243[1]
    local k = _g243[2]
    local v = _g243[3]
    local body = unstash({...})
    local _g244 = sub(body, 0)
    local t1 = make_id()
    return(join({"let", join({k, "nil", t1, t}), join({"%for", join({t1, k}), join({"if", join((function ()
      local _g245 = {"target"}
      _g245.lua = join({"not", join({"number?", k})})
      _g245.js = join({"isNaN", join({"parseInt", k})})
      return(_g245)
    end)()), join({"let", join({v, join({"get", t1, k})})}, _g244)})})}))
  end, export = true, module = "core"}, inc = {macro = function (n, by)
    return(join({"set", n, join({"+", n, (by or 1)})}))
  end, export = true, module = "core"}, ["list*"] = {macro = function (...)
    local xs = unstash({...})
    if empty63(xs) then
      return({})
    else
      local l = {}
      local i = 0
      local _g246 = xs
      while (i < length(_g246)) do
        local x = _g246[(i + 1)]
        if (i == (length(xs) - 1)) then
          l = {"join", join({"list"}, l), x}
        else
          add(l, x)
        end
        i = (i + 1)
      end
      return(l)
    end
  end, export = true, module = "core"}, define = {macro = function (name, x, ...)
    local body = unstash({...})
    local _g247 = sub(body, 0)
    setenv(name, {_stash = true, variable = true})
    if (not empty63(_g247)) then
      local _g248 = bind42(x, _g247)
      local args = _g248[1]
      local _g249 = _g248[2]
      return(join({"%global-function", name, args}, _g249))
    else
      return(join({"set", name, x}))
    end
  end, export = true, module = "core"}, ["let-symbol"] = {macro = function (expansions, ...)
    local body = unstash({...})
    local _g250 = sub(body, 0)
    add(environment, {})
    local _g251 = (function ()
      map(function (_g252)
        local name = _g252[1]
        local exp = _g252[2]
        return(macroexpand(join({"define-symbol", name, exp})))
      end, pairwise(expansions))
      return(join({"do"}, macroexpand(_g250)))
    end)()
    drop(environment)
    return(_g251)
  end, export = true, module = "core"}, ["set-of"] = {macro = function (...)
    local elements = unstash({...})
    local l = {}
    local _g254 = 0
    local _g253 = elements
    while (_g254 < length(_g253)) do
      local e = _g253[(_g254 + 1)]
      l[e] = true
      _g254 = (_g254 + 1)
    end
    return(join({"table"}, l))
  end, export = true, module = "core"}, quasiquote = {macro = function (form)
    return(quasiexpand(form, 1))
  end, export = true, module = "core"}, across = {macro = function (_g255, ...)
    local l = _g255[1]
    local v = _g255[2]
    local i = _g255[3]
    local start = _g255[4]
    local body = unstash({...})
    local _g256 = sub(body, 0)
    local l1 = make_id()
    i = (i or make_id())
    start = (start or 0)
    return(join({"let", join({i, start, l1, l}), join({"while", join({"<", i, join({"length", l1})}), join({"let", join({v, join({"at", l1, i})})}, join(_g256, {join({"inc", i})}))})}))
  end, export = true, module = "core"}, ["define-symbol"] = {macro = function (name, expansion)
    setenv(name, {_stash = true, symbol = expansion})
    return(nil)
  end, export = true, module = "core"}, pr = {macro = function (...)
    local xs = unstash({...})
    local _g257 = map(function (x)
      return(splice(join({join({"to-string", x}), "\" \""})))
    end, xs)
    return(join({"print", join({"cat"}, _g257)}))
  end, export = true, module = "core"}, ["with-frame"] = {macro = function (...)
    local body = unstash({...})
    local _g258 = sub(body, 0)
    local scope = body.scope
    local x = make_id()
    return(join({"do", join({"add", "environment", join((function ()
      local _g259 = {"table"}
      _g259._scope = scope
      return(_g259)
    end)())}), join({"let", join({x, join({"do"}, _g258)}), join({"drop", "environment"}), x})}))
  end, export = true, module = "core"}, ["define-macro"] = {macro = function (name, args, ...)
    local body = unstash({...})
    local _g260 = sub(body, 0)
    local form = join({"fn", args}, _g260)
    eval(join((function ()
      local _g261 = {"setenv", join({"quote", name})}
      _g261.macro = form
      _g261.form = join({"quote", form})
      return(_g261)
    end)()))
    return(nil)
  end, export = true, module = "core"}, fn = {macro = function (args, ...)
    local body = unstash({...})
    local _g262 = sub(body, 0)
    local _g263 = bind42(args, _g262)
    local _g264 = _g263[1]
    local _g265 = _g263[2]
    return(join({"%function", _g264}, _g265))
  end, export = true, module = "core"}, ["join!"] = {macro = function (a, ...)
    local bs = unstash({...})
    local _g266 = sub(bs, 0)
    return(join({"set", a, join({"join*", a}, _g266)}))
  end, export = true, module = "core"}, target = {macro = function (...)
    local clauses = unstash({...})
    return(clauses[target])
  end, module = "core", export = true, global = true}, ["with-bindings"] = {macro = function (_g267, ...)
    local names = _g267[1]
    local body = unstash({...})
    local _g268 = sub(body, 0)
    local x = make_id()
    return(join((function ()
      local _g269 = {"with-frame", join({"across", join({names, x}), join((function ()
        local _g270 = {"setenv", x}
        _g270.variable = true
        return(_g270)
      end)())})}
      _g269.scope = true
      return(_g269)
    end)(), _g268))
  end, export = true, module = "core"}, ["define-global"] = {macro = function (name, x, ...)
    local body = unstash({...})
    local _g271 = sub(body, 0)
    setenv(name, {_stash = true, global = true, export = true})
    if (not empty63(_g271)) then
      local _g272 = bind42(x, _g271)
      local args = _g272[1]
      local _g273 = _g272[2]
      return(join({"%global-function", name, args}, _g273))
    elseif (target == "js") then
      return(join({"set", join({"get", "global", join({"quote", to_id(name)})}), x}))
    else
      return(join({"set", name, x}))
    end
  end, export = true, module = "core"}, list = {macro = function (...)
    local body = unstash({...})
    local l = join({"%array"}, body)
    if (not keys63(body)) then
      return(l)
    else
      local id = make_id()
      local init = {}
      local k = nil
      local _g274 = body
      for k in next, _g274 do
        if (not number63(k)) then
          local v = _g274[k]
          add(init, join({"set", join({"get", id, join({"quote", k})}), v}))
        end
      end
      return(join({"let", join({id, l})}, join(init, {id})))
    end
  end, export = true, module = "core"}, guard = {macro = function (expr)
    if (target == "js") then
      return(join({join({"fn", {}, join({"%try", join({"list", true, expr})})})}))
    else
      local e = make_id()
      local x = make_id()
      local ex = ("|" .. e .. "," .. x .. "|")
      return(join({"let", join({ex, join({"xpcall", join({"fn", {}, expr}), "%message-handler"})}), join({"list", e, x})}))
    end
  end, export = true, module = "core"}, ["let-macro"] = {macro = function (definitions, ...)
    local body = unstash({...})
    local _g275 = sub(body, 0)
    add(environment, {})
    local _g276 = (function ()
      map(function (m)
        return(macroexpand(join({"define-macro"}, m)))
      end, definitions)
      return(join({"do"}, macroexpand(_g275)))
    end)()
    drop(environment)
    return(_g276)
  end, export = true, module = "core"}, ["cat!"] = {macro = function (a, ...)
    local bs = unstash({...})
    local _g277 = sub(bs, 0)
    return(join({"set", a, join({"cat", a}, _g277)}))
  end, export = true, module = "core"}, let = {macro = function (bindings, ...)
    local body = unstash({...})
    local _g278 = sub(body, 0)
    local i = 0
    local renames = {}
    local locals = {}
    map(function (_g279)
      local lh = _g279[1]
      local rh = _g279[2]
      local _g281 = 0
      local _g280 = bind(lh, rh)
      while (_g281 < length(_g280)) do
        local _g282 = _g280[(_g281 + 1)]
        local id = _g282[1]
        local val = _g282[2]
        if bound63(id) then
          local rename = make_id()
          add(renames, id)
          add(renames, rename)
          id = rename
        else
          setenv(id, {_stash = true, variable = true})
        end
        add(locals, join({"%local", id, val}))
        _g281 = (_g281 + 1)
      end
    end, pairwise(bindings))
    return(join({"do"}, join(locals, {join({"let-symbol", renames}, _g278)})))
  end, export = true, module = "core"}, at = {macro = function (l, i)
    if ((target == "lua") and number63(i)) then
      i = (i + 1)
    elseif (target == "lua") then
      i = join({"+", i, 1})
    end
    return(join({"get", l, i}))
  end, export = true, module = "core"}, ["define-local"] = {macro = function (name, x, ...)
    local body = unstash({...})
    local _g283 = sub(body, 0)
    setenv(name, {_stash = true, variable = true})
    if (not empty63(_g283)) then
      local _g284 = bind42(x, _g283)
      local args = _g284[1]
      local _g285 = _g284[2]
      return(join({"%local-function", name, args}, _g285))
    else
      return(join({"%local", name, x}))
    end
  end, export = true, module = "core"}, language = {macro = function ()
    return(join({"quote", target}))
  end, export = true, module = "core"}, table = {macro = function (...)
    local body = unstash({...})
    return(join({"%object"}, mapo(function (_g167, x)
      return(x)
    end, body)))
  end, export = true, module = "core"}, ["define-special"] = {macro = function (name, args, ...)
    local body = unstash({...})
    local _g286 = sub(body, 0)
    local form = join({"fn", args}, _g286)
    local keys = sub(_g286, length(_g286))
    eval(join((function ()
      local _g287 = {"setenv", join({"quote", name})}
      _g287.form = join({"quote", form})
      _g287.special = form
      return(_g287)
    end)(), keys))
    return(nil)
  end, export = true, module = "core"}}}, special = {import = {"utilities", "special", "core", "compiler"}, export = {["%object"] = {module = "special", export = true, special = function (forms)
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
    local _g288 = pairs
    while (i < length(_g288)) do
      local _g289 = _g288[(i + 1)]
      local k = _g289[1]
      local v = _g289[2]
      if (not string63(k)) then
        error(("Illegal key: " .. to_string(k)))
      end
      local _g290 = compile(v)
      local _g291 = (function ()
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
      str = (str .. _g291 .. sep .. _g290)
      if (i < (length(pairs) - 1)) then
        str = (str .. ", ")
      end
      i = (i + 1)
    end
    return((str .. "}"))
  end}, ["%local"] = {special = function (_g292)
    local name = _g292[1]
    local value = _g292[2]
    local id = compile(name)
    local _g293 = compile(value)
    local keyword = (function ()
      if (target == "js") then
        return("var ")
      else
        return("local ")
      end
    end)()
    local ind = indentation()
    return((ind .. keyword .. id .. " = " .. _g293))
  end, stmt = true, export = true, module = "special"}, ["if"] = {stmt = true, export = true, tr = true, module = "special", special = function (form, tail63)
    local str = ""
    local i = 0
    local _g294 = form
    while (i < length(_g294)) do
      local condition = _g294[(i + 1)]
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
  end}, ["%for"] = {stmt = true, export = true, tr = true, module = "special", special = function (_g295)
    local _g296 = _g295[1]
    local t = _g296[1]
    local k = _g296[2]
    local body = sub(_g295, 1)
    local _g297 = compile(t)
    local ind = indentation()
    local _g298 = (function ()
      indent_level = (indent_level + 1)
      local _g299 = compile_body(body)
      indent_level = (indent_level - 1)
      return(_g299)
    end)()
    if (target == "lua") then
      return((ind .. "for " .. k .. " in next, " .. _g297 .. " do\n" .. _g298 .. ind .. "end\n"))
    else
      return((ind .. "for (" .. k .. " in " .. _g297 .. ") {\n" .. _g298 .. ind .. "}\n"))
    end
  end}, ["error"] = {special = function (_g300)
    local x = _g300[1]
    local e = (function ()
      if (target == "js") then
        return(("throw " .. compile(x)))
      else
        return(compile_call(join({"error", x})))
      end
    end)()
    return((indentation() .. e))
  end, stmt = true, export = true, module = "special"}, ["set"] = {special = function (_g301)
    local lh = _g301[1]
    local rh = _g301[2]
    if nil63(rh) then
      error("Missing right-hand side in assignment")
    end
    return((indentation() .. compile(lh) .. " = " .. compile(rh)))
  end, stmt = true, export = true, module = "special"}, ["%try"] = {stmt = true, export = true, tr = true, module = "special", special = function (forms)
    local ind = indentation()
    local body = (function ()
      indent_level = (indent_level + 1)
      local _g302 = compile_body(forms, {_stash = true, ["tail?"] = true})
      indent_level = (indent_level - 1)
      return(_g302)
    end)()
    local e = make_id()
    local handler = join({"return", join({"%array", false, e})})
    local h = (function ()
      indent_level = (indent_level + 1)
      local _g303 = compile(handler, {_stash = true, ["stmt?"] = true})
      indent_level = (indent_level - 1)
      return(_g303)
    end)()
    return((ind .. "try {\n" .. body .. ind .. "}\n" .. ind .. "catch (" .. e .. ") {\n" .. h .. ind .. "}\n"))
  end}, ["%global-function"] = {stmt = true, export = true, tr = true, module = "special", special = function (_g304)
    local name = _g304[1]
    local args = _g304[2]
    local body = sub(_g304, 2)
    if (target == "lua") then
      local x = compile_function(args, body, {_stash = true, name = name})
      return((indentation() .. x))
    else
      return(compile(join({"set", name, join({"%function", args}, body)}), {_stash = true, ["stmt?"] = true}))
    end
  end}, ["%local-function"] = {stmt = true, export = true, tr = true, module = "special", special = function (_g305)
    local name = _g305[1]
    local args = _g305[2]
    local body = sub(_g305, 2)
    local x = compile_function(args, body, {_stash = true, name = name, prefix = "local "})
    return((indentation() .. x))
  end}, ["return"] = {special = function (_g306)
    local x = _g306[1]
    local _g307 = (function ()
      if nil63(x) then
        return("return")
      else
        return(compile_call(join({"return", x})))
      end
    end)()
    return((indentation() .. _g307))
  end, stmt = true, export = true, module = "special"}, ["get"] = {module = "special", export = true, special = function (_g308)
    local t = _g308[1]
    local k = _g308[2]
    local _g309 = compile(t)
    local k1 = compile(k)
    if ((target == "lua") and (char(_g309, 0) == "{")) then
      _g309 = ("(" .. _g309 .. ")")
    end
    if (string_literal63(k) and valid_id63(inner(k))) then
      return((_g309 .. "." .. inner(k)))
    else
      return((_g309 .. "[" .. k1 .. "]"))
    end
  end}, ["break"] = {special = function (_g110)
    return((indentation() .. "break"))
  end, stmt = true, export = true, module = "special"}, ["while"] = {stmt = true, export = true, tr = true, module = "special", special = function (_g310)
    local condition = _g310[1]
    local body = sub(_g310, 1)
    local _g311 = compile(condition)
    local _g312 = (function ()
      indent_level = (indent_level + 1)
      local _g313 = compile_body(body)
      indent_level = (indent_level - 1)
      return(_g313)
    end)()
    local ind = indentation()
    if (target == "js") then
      return((ind .. "while (" .. _g311 .. ") {\n" .. _g312 .. ind .. "}\n"))
    else
      return((ind .. "while " .. _g311 .. " do\n" .. _g312 .. ind .. "end\n"))
    end
  end}, ["%array"] = {module = "special", export = true, special = function (forms)
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
    local _g314 = forms
    while (i < length(_g314)) do
      local x = _g314[(i + 1)]
      str = (str .. compile(x))
      if (i < (length(forms) - 1)) then
        str = (str .. ", ")
      end
      i = (i + 1)
    end
    return((open .. str .. close))
  end}, ["%function"] = {module = "special", export = true, special = function (_g315)
    local args = _g315[1]
    local body = sub(_g315, 1)
    return(compile_function(args, body))
  end}, ["do"] = {stmt = true, export = true, tr = true, module = "special", special = function (forms, tail63)
    return(compile_body(forms, {_stash = true, ["tail?"] = tail63}))
  end}, ["not"] = {module = "special", export = true, special = function (_g316)
    local x = _g316[1]
    local _g317 = compile(x)
    local open = (function ()
      if (target == "js") then
        return("!(")
      else
        return("(not ")
      end
    end)()
    return((open .. _g317 .. ")"))
  end}}}, lib = {import = {"core", "special"}, export = {}}, reader = {import = {"special", "core"}, export = {["define-reader"] = {macro = function (_g318, ...)
    local char = _g318[1]
    local stream = _g318[2]
    local body = unstash({...})
    local _g319 = sub(body, 0)
    return(join({"set", join({"get", "read-table", char}), join({"fn", join({stream})}, _g319)}))
  end, module = "reader", export = true}, ["read-from-string"] = {variable = true, export = true, module = "reader"}, ["make-stream"] = {variable = true, export = true, module = "reader"}, ["read-all"] = {variable = true, export = true, module = "reader"}, ["read-table"] = {variable = true, export = true, module = "reader"}, read = {variable = true, export = true, module = "reader"}}}, boot = {import = {"utilities", "special", "core"}, export = {}}, compiler = {import = {"utilities", "runtime", "special", "core", "reader"}, export = {["compile-function"] = {variable = true, export = true, module = "compiler"}, ["in-module"] = {variable = true, export = true, module = "compiler"}, ["%result"] = {global = true, module = "compiler", export = true}, ["compile-branch"] = {variable = true, export = true, module = "compiler"}, eval = {variable = true, export = true, module = "compiler"}, ["compile-body"] = {variable = true, export = true, module = "compiler"}, ["compile-special"] = {variable = true, export = true, module = "compiler"}, compile = {variable = true, export = true, module = "compiler"}, ["load-module"] = {variable = true, export = true, module = "compiler"}, ["open-module"] = {variable = true, export = true, module = "compiler"}, ["define-module"] = {macro = function (spec, ...)
    local body = unstash({...})
    local _g320 = sub(body, 0)
    local imports = {}
    local exp = _g320.export
    local imp = _g320.import
    local _g322 = 0
    local _g321 = (imp or {})
    while (_g322 < length(_g321)) do
      local k = _g321[(_g322 + 1)]
      load_module(k)
      imports = join(imports, imported(k))
      _g322 = (_g322 + 1)
    end
    modules[module_key(spec)] = {import = imp, export = {}}
    local _g324 = 0
    local _g323 = (exp or {})
    while (_g324 < length(_g323)) do
      local k = _g323[(_g324 + 1)]
      setenv(k, {_stash = true, export = true})
      _g324 = (_g324 + 1)
    end
    return(join({"do"}, imports))
  end, export = true, module = "compiler"}, ["current-module"] = {global = true, module = "compiler", export = true}, ["compile-call"] = {variable = true, export = true, module = "compiler"}}}, utilities = {import = {"special", "core"}, export = {["special?"] = {variable = true, export = true, module = "utilities"}, bind = {variable = true, export = true, module = "utilities"}, ["valid-id?"] = {variable = true, export = true, module = "utilities"}, indentation = {variable = true, export = true, module = "utilities"}, setenv = {variable = true, export = true, module = "utilities"}, ["quote-modules"] = {variable = true, export = true, module = "utilities"}, exported = {variable = true, export = true, module = "utilities"}, ["quote-environment"] = {variable = true, export = true, module = "utilities"}, imported = {variable = true, export = true, module = "utilities"}, ["stash*"] = {variable = true, export = true, module = "utilities"}, ["indent-level"] = {global = true, module = "utilities", export = true}, ["initial-environment"] = {variable = true, export = true, module = "utilities"}, ["make-id"] = {}, ["bind*"] = {variable = true, export = true, module = "utilities"}, quasiexpand = {variable = true, export = true, module = "utilities"}, ["symbol-expansion"] = {variable = true, export = true, module = "utilities"}, getenv = {variable = true, export = true, module = "utilities"}, nexus = {global = true, module = "utilities", export = true}, ["variable?"] = {variable = true, export = true, module = "utilities"}, ["macro?"] = {variable = true, export = true, module = "utilities"}, ["special-form?"] = {variable = true, export = true, module = "utilities"}, ["macro-function"] = {variable = true, export = true, module = "utilities"}, quoted = {variable = true, export = true, module = "utilities"}, ["with-indent"] = {macro = function (form)
    local result = make_id()
    return(join({"do", join({"inc", "indent-level"}), join({"let", join({result, form}), join({"dec", "indent-level"}), result})}))
  end, module = "utilities", export = true}, ["to-id"] = {variable = true, export = true, module = "utilities"}, ["module-key"] = {variable = true, export = true, module = "utilities"}, macroexpand = {variable = true, export = true, module = "utilities"}, ["bound?"] = {variable = true, export = true, module = "utilities"}, ["symbol?"] = {variable = true, export = true, module = "utilities"}}}}
  environment = {{["define-module"] = {macro = function (spec, ...)
    local body = unstash({...})
    local _g325 = sub(body, 0)
    local imports = {}
    local exp = _g325.export
    local imp = _g325.import
    local _g327 = 0
    local _g326 = (imp or {})
    while (_g327 < length(_g326)) do
      local k = _g326[(_g327 + 1)]
      load_module(k)
      imports = join(imports, imported(k))
      _g327 = (_g327 + 1)
    end
    modules[module_key(spec)] = {import = imp, export = {}}
    local _g329 = 0
    local _g328 = (exp or {})
    while (_g329 < length(_g328)) do
      local k = _g328[(_g329 + 1)]
      setenv(k, {_stash = true, export = true})
      _g329 = (_g329 + 1)
    end
    return(join({"do"}, imports))
  end, export = true, module = "compiler"}}}
end)();
(function ()
  local _g37 = nexus.utilities
  local special63 = _g37["special?"]
  local initial_environment = _g37["initial-environment"]
  local setenv = _g37.setenv
  local exported = _g37.exported
  local imported = _g37.imported
  local stash42 = _g37["stash*"]
  local valid_id63 = _g37["valid-id?"]
  local macro_function = _g37["macro-function"]
  local symbol63 = _g37["symbol?"]
  local quote_environment = _g37["quote-environment"]
  local quoted = _g37.quoted
  local symbol_expansion = _g37["symbol-expansion"]
  local getenv = _g37.getenv
  local quote_modules = _g37["quote-modules"]
  local variable63 = _g37["variable?"]
  local bind42 = _g37["bind*"]
  local special_form63 = _g37["special-form?"]
  local macro63 = _g37["macro?"]
  local indentation = _g37.indentation
  local bind = _g37.bind
  local to_id = _g37["to-id"]
  local module_key = _g37["module-key"]
  local macroexpand = _g37.macroexpand
  local bound63 = _g37["bound?"]
  local quasiexpand = _g37.quasiexpand
  local _g71 = nexus.runtime
  local stash = _g71.stash
  local exit = _g71.exit
  local pairwise = _g71.pairwise
  local list63 = _g71["list?"]
  local reduce = _g71.reduce
  local id_literal63 = _g71["id-literal?"]
  local code = _g71.code
  local function63 = _g71["function?"]
  local substring = _g71.substring
  local _ = _g71["-"]
  local _42 = _g71["*"]
  local _43 = _g71["+"]
  local char = _g71.char
  local _6261 = _g71[">="]
  local keys63 = _g71["keys?"]
  local _6061 = _g71["<="]
  local splice = _g71.splice
  local _37 = _g71["%"]
  local sublist = _g71.sublist
  local map = _g71.map
  local _61 = _g71["="]
  local inner = _g71.inner
  local string63 = _g71["string?"]
  local replicate = _g71.replicate
  local to_string = _g71["to-string"]
  local apply = _g71.apply
  local _62 = _g71[">"]
  local search = _g71.search
  local number63 = _g71["number?"]
  local composite63 = _g71["composite?"]
  local boolean63 = _g71["boolean?"]
  local add = _g71.add
  local hd = _g71.hd
  local string_literal63 = _g71["string-literal?"]
  local table63 = _g71["table?"]
  local write_file = _g71["write-file"]
  local reverse = _g71.reverse
  local split = _g71.split
  local write = _g71.write
  local extend = _g71.extend
  local empty63 = _g71["empty?"]
  local tl = _g71.tl
  local _47 = _g71["/"]
  local length = _g71.length
  local last = _g71.last
  local _37message_handler = _g71["%message-handler"]
  local map42 = _g71["map*"]
  local some63 = _g71["some?"]
  local join = _g71.join
  local unstash = _g71.unstash
  local iterate = _g71.iterate
  local mapt = _g71.mapt
  local sub = _g71.sub
  local is63 = _g71["is?"]
  local cat = _g71.cat
  local mapo = _g71.mapo
  local _60 = _g71["<"]
  local parse_number = _g71["parse-number"]
  local drop = _g71.drop
  local exclude = _g71.exclude
  local nil63 = _g71["nil?"]
  local atom63 = _g71["atom?"]
  local keep = _g71.keep
  local find = _g71.find
  local read_file = _g71["read-file"]
  local _g76 = nexus.reader
  local read_from_string = _g76["read-from-string"]
  local make_stream = _g76["make-stream"]
  local read = _g76.read
  local read_table = _g76["read-table"]
  local read_all = _g76["read-all"]
  local _g109 = nexus.compiler
  local compile_function = _g109["compile-function"]
  local in_module = _g109["in-module"]
  local eval = _g109.eval
  local compile_branch = _g109["compile-branch"]
  local compile = _g109.compile
  local load_module = _g109["load-module"]
  local compile_body = _g109["compile-body"]
  local open_module = _g109["open-module"]
  local compile_special = _g109["compile-special"]
  local compile_call = _g109["compile-call"]
  local function rep(str)
    local _g331 = (function ()
      local _g332,_g333 = xpcall(function ()
        return(eval(read_from_string(str)))
      end, _37message_handler)
      return({_g332, _g333})
    end)()
    local _g1 = _g331[1]
    local x = _g331[2]
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
    local _g334 = args
    while (i < length(_g334)) do
      local arg = _g334[(i + 1)]
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
      local _g335 = (spec or "main")
      in_module(_g335)
      if expr then
        return(rep(expr))
      else
        return(repl())
      end
    end
  end
  return(main())
end)();
