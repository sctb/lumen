modules = {lib = {toplevel = {["stash*"] = {variable = true, export = true, module = "lib"}, quote = {form = {"fn", {"form"}, {"quoted", "form"}}, macro = function (form)
  return(quoted(form))
end, export = true, module = "lib"}, ["splice?"] = {variable = true, module = "lib"}, ["parse-number"] = {variable = true, export = true, module = "lib"}, let = {form = {"fn", (function ()
  local _g4 = {"bindings"}
  _g4.rest = "body"
  return(_g4)
end)(), {"let", {"i", 0, "renames", {}, "locals", {}}, {"map", {"fn", {{"lh", "rh"}}, {"across", {{"bind", "lh", "rh"}, {"id", "val"}}, {"if", {"bound?", "id"}, {"let", {"rename", {"make-id"}}, {"add", "renames", "id"}, {"add", "renames", "rename"}, {"set", "id", "rename"}}, (function ()
  local _g5 = {"setenv", "id"}
  _g5.variable = true
  return(_g5)
end)()}, {"add", "locals", {"quasiquote", {"%local", {"unquote", "id"}, {"unquote", "val"}}}}}}, {"pairwise", "bindings"}}, {"quasiquote", {"do", {"unquote-splicing", "locals"}, {"let-symbol", {"unquote", "renames"}, {"unquote-splicing", "body"}}}}}}, macro = function (bindings, ...)
  local body = unstash({...})
  local _g6 = sub(body, 0)
  local i = 0
  local renames = {}
  local locals = {}
  map(function (_g7)
    local lh = _g7[1]
    local rh = _g7[2]
    local _g9 = 0
    local _g8 = bind(lh, rh)
    while (_g9 < length(_g8)) do
      local _g10 = _g8[(_g9 + 1)]
      local id = _g10[1]
      local val = _g10[2]
      if bound63(id) then
        local rename = make_id()
        add(renames, id)
        add(renames, rename)
        id = rename
      else
        setenv(id, {_stash = true, variable = true})
      end
      add(locals, {"%local", id, val})
      _g9 = (_g9 + 1)
    end
  end, pairwise(bindings))
  return(join({"do"}, join(locals, {join({"let-symbol", renames}, _g6)})))
end, export = true, module = "lib"}, mapt = {variable = true, export = true, module = "lib"}, ["cat!"] = {form = {"fn", (function ()
  local _g11 = {"a"}
  _g11.rest = "bs"
  return(_g11)
end)(), {"quasiquote", {"set", {"unquote", "a"}, {"cat", {"unquote", "a"}, {"unquote-splicing", "bs"}}}}}, macro = function (a, ...)
  local bs = unstash({...})
  local _g12 = sub(bs, 0)
  return({"set", a, join({"cat", a}, _g12)})
end, export = true, module = "lib"}, mapo = {variable = true, export = true, module = "lib"}, ["%"] = {variable = true, export = true, module = "lib"}, stash = {variable = true, module = "lib"}, _g52 = {variable = true, module = "lib"}, ["define-symbol"] = {form = {"fn", {"name", "expansion"}, (function ()
  local _g13 = {"setenv", "name"}
  _g13.symbol = "expansion"
  return(_g13)
end)(), "nil"}, macro = function (name, expansion)
  setenv(name, {_stash = true, symbol = expansion})
  return(nil)
end, export = true, module = "lib"}, ["keys?"] = {variable = true, export = true, module = "lib"}, ["define-macro"] = {form = {"fn", (function ()
  local _g14 = {"name", "args"}
  _g14.rest = "body"
  return(_g14)
end)(), {"let", {"form", {"quasiquote", {"fn", {"unquote", "args"}, {"unquote-splicing", "body"}}}}, {"eval", {"quasiquote", (function ()
  local _g15 = {"setenv", {"quote", {"unquote", "name"}}}
  _g15.form = {"quote", {"unquote", "form"}}
  _g15.macro = {"unquote", "form"}
  return(_g15)
end)()}}}, "nil"}, macro = function (name, args, ...)
  local body = unstash({...})
  local _g16 = sub(body, 0)
  local form = join({"fn", args}, _g16)
  eval((function ()
    local _g17 = {"setenv", {"quote", name}}
    _g17.form = {"quote", form}
    _g17.macro = form
    return(_g17)
  end)())
  return(nil)
end, export = true, module = "lib"}, _g56 = {variable = true, module = "lib"}, list = {form = {"fn", "body", {"let", {"l", {"quasiquote", {"%array", {"unquote-splicing", "body"}}}}, {"if", {"not", {"keys?", "body"}}, "l", {"let", {"id", {"make-id"}, "init", {}}, {"each", {"body", "k", "v"}, {"add", "init", {"quasiquote", {"set", {"get", {"unquote", "id"}, {"quote", {"unquote", "k"}}}, {"unquote", "v"}}}}}, {"quasiquote", {"let", {{"unquote", "id"}, {"unquote", "l"}}, {"unquote-splicing", "init"}, {"unquote", "id"}}}}}}}, macro = function (...)
  local body = unstash({...})
  local l = join({"%array"}, body)
  if (not keys63(body)) then
    return(l)
  else
    local id = make_id()
    local init = {}
    local k = nil
    local _g18 = body
    for k in next, _g18 do
      if (not number63(k)) then
        local v = _g18[k]
        add(init, {"set", {"get", id, {"quote", k}}, v})
      end
    end
    return(join({"let", {id, l}}, join(init, {id})))
  end
end, export = true, module = "lib"}, last = {variable = true, export = true, module = "lib"}, ["symbol-expansion"] = {variable = true, module = "lib"}, ["bind-arguments"] = {variable = true, module = "lib"}, ["define-global"] = {form = {"fn", (function ()
  local _g19 = {"name", "x"}
  _g19.rest = "body"
  return(_g19)
end)(), (function ()
  local _g20 = {"setenv", "name"}
  _g20.variable = true
  return(_g20)
end)(), {"if", {"not", {"empty?", "body"}}, {"let", {{"args", "body"}, {"bind-arguments", "x", "body"}}, {"quasiquote", {"%global-function", {"unquote", "name"}, {"unquote", "args"}, {"unquote-splicing", "body"}}}}, {"quasiquote", {"set", {"unquote", "name"}, {"unquote", "x"}}}}}, macro = function (name, x, ...)
  local body = unstash({...})
  local _g21 = sub(body, 0)
  setenv(name, {_stash = true, variable = true})
  if (not empty63(_g21)) then
    local _g22 = bind_arguments(x, _g21)
    local args = _g22[1]
    local _g23 = _g22[2]
    return(join({"%global-function", name, args}, _g23))
  else
    return({"set", name, x})
  end
end, export = true, module = "lib"}, getenv = {variable = true, export = true, module = "lib"}, ["nil?"] = {variable = true, export = true, module = "lib"}, ["empty?"] = {variable = true, export = true, module = "lib"}, inc = {form = {"fn", {"n", "by"}, {"quasiquote", {"set", {"unquote", "n"}, {"+", {"unquote", "n"}, {"unquote", {"or", "by", 1}}}}}}, macro = function (n, by)
  return({"set", n, {"+", n, (by or 1)}})
end, export = true, module = "lib"}, language = {form = {"fn", {}, {"quasiquote", {"quote", {"unquote", "target"}}}}, macro = function ()
  return({"quote", target})
end, export = true, module = "lib"}, extend = {variable = true, export = true, module = "lib"}, inner = {variable = true, export = true, module = "lib"}, pr = {form = {"fn", "xs", {"let", {"xs", {"map", {"fn", {"x"}, {"splice", {"quasiquote", {{"to-string", {"unquote", "x"}}, "\" \""}}}}, "xs"}}, {"quasiquote", {"print", {"cat", {"unquote-splicing", "xs"}}}}}}, macro = function (...)
  local xs = unstash({...})
  local xs = map(function (x)
    return(splice({{"to-string", x}, "\" \""}))
  end, xs)
  return({"print", join({"cat"}, xs)})
end, export = true, module = "lib"}, search = {variable = true, export = true, module = "lib"}, ["join!"] = {form = {"fn", (function ()
  local _g24 = {"a"}
  _g24.rest = "bs"
  return(_g24)
end)(), {"quasiquote", {"set", {"unquote", "a"}, {"join*", {"unquote", "a"}, {"unquote-splicing", "bs"}}}}}, macro = function (a, ...)
  local bs = unstash({...})
  local _g25 = sub(bs, 0)
  return({"set", a, join({"join*", a}, _g25)})
end, export = true, module = "lib"}, sub = {variable = true, export = true, module = "lib"}, ["special-form?"] = {variable = true, export = true, module = "lib"}, ["function?"] = {variable = true, export = true, module = "lib"}, ["write-file"] = {variable = true, export = true, module = "lib"}, _g37 = {variable = true, module = "lib"}, macroexpand = {variable = true, export = true, module = "lib"}, guard = {form = {"fn", {"expr"}, {"if", {"=", "target", {"quote", "js"}}, {"quasiquote", {{"fn", {}, {"%try", {"list", true, {"unquote", "expr"}}}}}}, {"let", {"e", {"make-id"}, "x", {"make-id"}, "ex", {"cat", "\"|\"", "e", "\",\"", "x", "\"|\""}}, {"quasiquote", {"let", {{"unquote", "ex"}, {"xpcall", {"fn", {}, {"unquote", "expr"}}, "message-handler"}}, {"list", {"unquote", "e"}, {"unquote", "x"}}}}}}}, macro = function (expr)
  if (target == "js") then
    return({{"fn", {}, {"%try", {"list", true, expr}}}})
  else
    local e = make_id()
    local x = make_id()
    local ex = ("|" .. e .. "," .. x .. "|")
    return({"let", {ex, {"xpcall", {"fn", {}, expr}, "message-handler"}}, {"list", e, x}})
  end
end, export = true, module = "lib"}, ["can-unquote?"] = {variable = true, module = "lib"}, type = {variable = true, export = true, module = "lib"}, pairwise = {variable = true, export = true, module = "lib"}, ["bound?"] = {variable = true, module = "lib"}, fs = {variable = true, module = "lib"}, _g45 = {variable = true, module = "lib"}, ["atom?"] = {variable = true, export = true, module = "lib"}, define = {form = {"fn", (function ()
  local _g27 = {"name", "x"}
  _g27.rest = "body"
  return(_g27)
end)(), (function ()
  local _g28 = {"setenv", "name"}
  _g28.variable = true
  return(_g28)
end)(), {"quasiquote", {"define-global", {"unquote", "name"}, {"unquote", "x"}, {"unquote-splicing", "body"}}}}, macro = function (name, x, ...)
  local body = unstash({...})
  local _g29 = sub(body, 0)
  setenv(name, {_stash = true, variable = true})
  return(join({"define-global", name, x}, _g29))
end, export = true, module = "lib"}, _g17 = {variable = true, module = "lib"}, apply = {variable = true, export = true, module = "lib"}, ["read-file"] = {variable = true, export = true, module = "lib"}, ["make-id"] = {variable = true, export = true, module = "lib"}, ["string?"] = {variable = true, export = true, module = "lib"}, unstash = {variable = true, export = true, module = "lib"}, tl = {variable = true, export = true, module = "lib"}, _g59 = {variable = true, module = "lib"}, dec = {form = {"fn", {"n", "by"}, {"quasiquote", {"set", {"unquote", "n"}, {"-", {"unquote", "n"}, {"unquote", {"or", "by", 1}}}}}}, macro = function (n, by)
  return({"set", n, {"-", n, (by or 1)}})
end, export = true, module = "lib"}, keep = {variable = true, export = true, module = "lib"}, _g112 = {variable = true, module = "lib"}, _g44 = {variable = true, module = "lib"}, ["message-handler"] = {variable = true, module = "lib"}, write = {variable = true, export = true, module = "lib"}, print = {variable = true, export = true, module = "lib"}, ["quasiquote-list"] = {variable = true, module = "lib"}, reduce = {variable = true, export = true, module = "lib"}, code = {variable = true, export = true, module = "lib"}, at = {form = {"fn", {"l", "i"}, {"if", {"and", {"=", "target", {"quote", "lua"}}, {"number?", "i"}}, {"inc", "i"}, {"=", "target", {"quote", "lua"}}, {"set", "i", {"quasiquote", {"+", {"unquote", "i"}, 1}}}}, {"quasiquote", {"get", {"unquote", "l"}, {"unquote", "i"}}}}, macro = function (l, i)
  if ((target == "lua") and number63(i)) then
    i = (i + 1)
  elseif (target == "lua") then
    i = {"+", i, 1}
  end
  return({"get", l, i})
end, export = true, module = "lib"}, each = {form = {"fn", (function ()
  local _g30 = {{"t", "k", "v"}}
  _g30.rest = "body"
  return(_g30)
end)(), {"let", {"t1", {"make-id"}}, {"quasiquote", {"let", {{"unquote", "k"}, "nil", {"unquote", "t1"}, {"unquote", "t"}}, {"%for", {{"unquote", "t1"}, {"unquote", "k"}}, {"if", (function ()
  local _g32 = {"target"}
  _g32.js = {"isNaN", {"parseInt", {"unquote", "k"}}}
  _g32.lua = {"not", {"number?", {"unquote", "k"}}}
  return(_g32)
end)(), {"let", {{"unquote", "v"}, {"get", {"unquote", "t1"}, {"unquote", "k"}}}, {"unquote-splicing", "body"}}}}}}}}, macro = function (_g33, ...)
  local t = _g33[1]
  local k = _g33[2]
  local v = _g33[3]
  local body = unstash({...})
  local _g34 = sub(body, 0)
  local t1 = make_id()
  return({"let", {k, "nil", t1, t}, {"%for", {t1, k}, {"if", (function ()
    local _g35 = {"target"}
    _g35.lua = {"not", {"number?", k}}
    _g35.js = {"isNaN", {"parseInt", k}}
    return(_g35)
  end)(), join({"let", {v, {"get", t1, k}}}, _g34)}}})
end, export = true, module = "lib"}, ["cat"] = {variable = true, export = true, module = "lib"}, ["special?"] = {variable = true, export = true, module = "lib"}, ["composite?"] = {variable = true, export = true, module = "lib"}, sublist = {variable = true, module = "lib"}, _g36 = {variable = true, module = "lib"}, ["with-frame"] = {form = {"fn", "body", {"let", {"x", {"make-id"}}, {"quasiquote", {"do", {"add", "environment", {"table"}}, {"let", {{"unquote", "x"}, {"do", {"unquote-splicing", "body"}}}, {"drop", "environment"}, {"unquote", "x"}}}}}}, macro = function (...)
  local body = unstash({...})
  local x = make_id()
  return({"do", {"add", "environment", {"table"}}, {"let", {x, join({"do"}, body)}, {"drop", "environment"}, x}})
end, export = true, module = "lib"}, table = {form = {"fn", "body", {"quasiquote", {"%object", {"unquote-splicing", {"mapo", {"fn", {"_g5", "x"}, "x"}, "body"}}}}}, macro = function (...)
  local body = unstash({...})
  return(join({"%object"}, mapo(function (_g5, x)
    return(x)
  end, body)))
end, export = true, module = "lib"}, _g32 = {variable = true, module = "lib"}, split = {variable = true, export = true, module = "lib"}, [">="] = {variable = true, export = true, module = "lib"}, _g100 = {variable = true, module = "lib"}, quoted = {variable = true, export = true, module = "lib"}, _g99 = {variable = true, module = "lib"}, map = {variable = true, export = true, module = "lib"}, ["let-symbol"] = {form = {"fn", (function ()
  local _g37 = {"expansions"}
  _g37.rest = "body"
  return(_g37)
end)(), {"with-frame", {"map", {"fn", {{"name", "exp"}}, {"macroexpand", {"quasiquote", {"define-symbol", {"unquote", "name"}, {"unquote", "exp"}}}}}, {"pairwise", "expansions"}}, {"quasiquote", {"do", {"unquote-splicing", {"macroexpand", "body"}}}}}}, macro = function (expansions, ...)
  local body = unstash({...})
  local _g38 = sub(body, 0)
  add(environment, {})
  local _g39 = (function ()
    map(function (_g40)
      local name = _g40[1]
      local exp = _g40[2]
      return(macroexpand({"define-symbol", name, exp}))
    end, pairwise(expansions))
    return(join({"do"}, macroexpand(_g38)))
  end)()
  drop(environment)
  return(_g39)
end, export = true, module = "lib"}, ["define-local"] = {form = {"fn", (function ()
  local _g41 = {"name", "x"}
  _g41.rest = "body"
  return(_g41)
end)(), (function ()
  local _g42 = {"setenv", "name"}
  _g42.variable = true
  return(_g42)
end)(), {"if", {"not", {"empty?", "body"}}, {"let", {{"args", "body"}, {"bind-arguments", "x", "body"}}, {"quasiquote", {"%local-function", {"unquote", "name"}, {"unquote", "args"}, {"unquote-splicing", "body"}}}}, {"quasiquote", {"%local", {"unquote", "name"}, {"unquote", "x"}}}}}, macro = function (name, x, ...)
  local body = unstash({...})
  local _g43 = sub(body, 0)
  setenv(name, {_stash = true, variable = true})
  if (not empty63(_g43)) then
    local _g44 = bind_arguments(x, _g43)
    local args = _g44[1]
    local _g45 = _g44[2]
    return(join({"%local-function", name, args}, _g45))
  else
    return({"%local", name, x})
  end
end, export = true, module = "lib"}, bind = {variable = true, module = "lib"}, iterate = {variable = true, export = true, module = "lib"}, find = {variable = true, export = true, module = "lib"}, splice = {variable = true, export = true, module = "lib"}, ["quoting?"] = {variable = true, module = "lib"}, ["boolean?"] = {variable = true, export = true, module = "lib"}, fn = {form = {"fn", (function ()
  local _g46 = {"args"}
  _g46.rest = "body"
  return(_g46)
end)(), {"let", {{"args", "body"}, {"bind-arguments", "args", "body"}}, {"quasiquote", {"%function", {"unquote", "args"}, {"unquote-splicing", "body"}}}}}, macro = function (args, ...)
  local body = unstash({...})
  local _g47 = sub(body, 0)
  local _g48 = bind_arguments(args, _g47)
  local args = _g48[1]
  local _g49 = _g48[2]
  return(join({"%function", args}, _g49))
end, export = true, module = "lib"}, ["id-count"] = {variable = true, module = "lib"}, _g18 = {variable = true, module = "lib"}, char = {variable = true, export = true, module = "lib"}, ["with-bindings"] = {form = {"fn", (function ()
  local _g50 = {{"names"}}
  _g50.rest = "body"
  return(_g50)
end)(), {"let", {"x", {"make-id"}}, {"quasiquote", {"with-frame", {"across", {{"unquote", "names"}, {"unquote", "x"}}, (function ()
  local _g51 = {"setenv", {"unquote", "x"}}
  _g51.variable = true
  return(_g51)
end)()}, {"unquote-splicing", "body"}}}}}, macro = function (_g52, ...)
  local names = _g52[1]
  local body = unstash({...})
  local _g53 = sub(body, 0)
  local x = make_id()
  return(join({"with-frame", {"across", {names, x}, (function ()
    local _g54 = {"setenv", x}
    _g54.variable = true
    return(_g54)
  end)()}}, _g53))
end, export = true, module = "lib"}, ["%export"] = {form = {"fn", {}, {"let", {"toplevel", {"hd", "environment"}, "m", {"make-id"}, "k", {"module-key", "current-module"}, "body", {"quasiquote", {{"define", {"unquote", "m"}, {"get", "modules", {"quote", {"unquote", "k"}}}}}}}, {"each", {"toplevel", "k", "v"}, {"let", {"b", {"quasiquote", {"get", {"get", {"unquote", "m"}, {"quote", {"unquote", "k"}}}, {"quote", "variable"}}}}, {"if", {"and", {"get", "v", {"quote", "variable"}}, {"=", {"get", "v", {"quote", "module"}}, "current-module"}}, {"add", "body", {"quasiquote", {"set", {"unquote", "b"}, {"unquote", "k"}}}}}}}, {"quasiquote", {"do", {"unquote-splicing", "body"}}}}}, macro = function ()
  local toplevel = hd(environment)
  local m = make_id()
  local k = module_key(current_module)
  local body = {{"define", m, {"get", "modules", {"quote", k}}}}
  local k = nil
  local _g55 = toplevel
  for k in next, _g55 do
    if (not number63(k)) then
      local v = _g55[k]
      local b = {"get", {"get", m, {"quote", k}}, {"quote", "variable"}}
      if (v.variable and (v.module == current_module)) then
        add(body, {"set", b, k})
      end
    end
  end
  return(join({"do"}, body))
end, export = true, module = "lib"}, ["let-macro"] = {form = {"fn", (function ()
  local _g57 = {"definitions"}
  _g57.rest = "body"
  return(_g57)
end)(), {"with-frame", {"map", {"fn", {"m"}, {"macroexpand", {"quasiquote", {"define-macro", {"unquote-splicing", "m"}}}}}, "definitions"}, {"quasiquote", {"do", {"unquote-splicing", {"macroexpand", "body"}}}}}}, macro = function (definitions, ...)
  local body = unstash({...})
  local _g58 = sub(body, 0)
  add(environment, {})
  local _g59 = (function ()
    map(function (m)
      return(macroexpand(join({"define-macro"}, m)))
    end, definitions)
    return(join({"do"}, macroexpand(_g58)))
  end)()
  drop(environment)
  return(_g59)
end, export = true, module = "lib"}, ["list*"] = {form = {"fn", "xs", {"if", {"empty?", "xs"}, {}, {"let", {"l", {}}, {"across", {"xs", "x", "i"}, {"if", {"=", "i", {"-", {"length", "xs"}, 1}}, {"set", "l", {"list", {"quote", "join"}, {"join", {"quote", {"list"}}, "l"}, "x"}}, {"add", "l", "x"}}}, "l"}}}, macro = function (...)
  local xs = unstash({...})
  if empty63(xs) then
    return({})
  else
    local l = {}
    local i = 0
    local _g60 = xs
    while (i < length(_g60)) do
      local x = _g60[(i + 1)]
      if (i == (length(xs) - 1)) then
        l = {"join", join({"list"}, l), x}
      else
        add(l, x)
      end
      i = (i + 1)
    end
    return(l)
  end
end, export = true, module = "lib"}, [">"] = {variable = true, export = true, module = "lib"}, ["string-literal?"] = {variable = true, export = true, module = "lib"}, setenv = {variable = true, export = true, module = "lib"}, ["to-string"] = {variable = true, export = true, module = "lib"}, drop = {variable = true, export = true, module = "lib"}, ["="] = {variable = true, export = true, module = "lib"}, _g21 = {variable = true, module = "lib"}, _g48 = {variable = true, module = "lib"}, ["map*"] = {variable = true, export = true, module = "lib"}, target = {form = {"fn", "clauses", {"get", "clauses", "target"}}, macro = function (...)
  local clauses = unstash({...})
  return(clauses[target])
end, export = true, variable = true, module = "lib"}, exclude = {variable = true, export = true, module = "lib"}, ["-"] = {variable = true, export = true, module = "lib"}, hd = {variable = true, export = true, module = "lib"}, ["/"] = {variable = true, export = true, module = "lib"}, replicate = {variable = true, export = true, module = "lib"}, _g25 = {variable = true, module = "lib"}, ["*"] = {variable = true, export = true, module = "lib"}, ["+"] = {variable = true, export = true, module = "lib"}, _g31 = {variable = true, module = "lib"}, substring = {variable = true, module = "lib"}, ["define-special"] = {form = {"fn", (function ()
  local _g61 = {"name", "args"}
  _g61.rest = "body"
  return(_g61)
end)(), {"let", {"form", {"quasiquote", {"fn", {"unquote", "args"}, {"unquote-splicing", "body"}}}, "keys", {"sub", "body", {"length", "body"}}}, {"eval", {"quasiquote", (function ()
  local _g62 = {"setenv", {"quote", {"unquote", "name"}}, {"unquote-splicing", "keys"}}
  _g62.form = {"quote", {"unquote", "form"}}
  _g62.special = {"unquote", "form"}
  return(_g62)
end)()}}}, "nil"}, macro = function (name, args, ...)
  local body = unstash({...})
  local _g63 = sub(body, 0)
  local form = join({"fn", args}, _g63)
  local keys = sub(_g63, length(_g63))
  eval(join((function ()
    local _g64 = {"setenv", {"quote", name}}
    _g64.form = {"quote", form}
    _g64.special = form
    return(_g64)
  end)(), keys))
  return(nil)
end, export = true, module = "lib"}, _g39 = {variable = true, module = "lib"}, ["symbol?"] = {variable = true, module = "lib"}, quasiexpand = {variable = true, module = "lib"}, ["<="] = {variable = true, export = true, module = "lib"}, _g22 = {variable = true, module = "lib"}, add = {variable = true, export = true, module = "lib"}, ["macro-function"] = {variable = true, module = "lib"}, ["variable?"] = {variable = true, module = "lib"}, ["quasisplice?"] = {variable = true, module = "lib"}, ["join*"] = {form = {"fn", "xs", {"reduce", {"fn", {"a", "b"}, {"list", {"quote", "join"}, "a", "b"}}, "xs"}}, macro = function (...)
  local xs = unstash({...})
  return(reduce(function (a, b)
    return({"join", a, b})
  end, xs))
end, export = true, module = "lib"}, ["set-of"] = {form = {"fn", "elements", {"let", {"l", {}}, {"across", {"elements", "e"}, {"set", {"get", "l", "e"}, true}}, {"quasiquote", {"table", {"unquote-splicing", "l"}}}}}, macro = function (...)
  local elements = unstash({...})
  local l = {}
  local _g66 = 0
  local _g65 = elements
  while (_g66 < length(_g65)) do
    local e = _g65[(_g66 + 1)]
    l[e] = true
    _g66 = (_g66 + 1)
  end
  return(join({"table"}, l))
end, export = true, module = "lib"}, exit = {variable = true, export = true, module = "lib"}, length = {variable = true, export = true, module = "lib"}, ["macro?"] = {variable = true, module = "lib"}, _g26 = {variable = true, module = "lib"}, ["<"] = {variable = true, export = true, module = "lib"}, quasiquote = {form = {"fn", {"form"}, {"quasiexpand", "form", 1}}, macro = function (form)
  return(quasiexpand(form, 1))
end, export = true, module = "lib"}, ["number?"] = {variable = true, export = true, module = "lib"}, escape = {variable = true, module = "lib"}, reverse = {variable = true, export = true, module = "lib"}, ["is?"] = {variable = true, export = true, module = "lib"}, join = {variable = true, export = true, module = "lib"}, _g94 = {variable = true, module = "lib"}, ["quasiquoting?"] = {variable = true, module = "lib"}, across = {form = {"fn", (function ()
  local _g67 = {{"l", "v", "i", "start"}}
  _g67.rest = "body"
  return(_g67)
end)(), {"let", {"l1", {"make-id"}}, {"set", "i", {"or", "i", {"make-id"}}}, {"set", "start", {"or", "start", 0}}, {"quasiquote", {"let", {{"unquote", "i"}, {"unquote", "start"}, {"unquote", "l1"}, {"unquote", "l"}}, {"while", {"<", {"unquote", "i"}, {"length", {"unquote", "l1"}}}, {"let", {{"unquote", "v"}, {"at", {"unquote", "l1"}, {"unquote", "i"}}}, {"unquote-splicing", "body"}, {"inc", {"unquote", "i"}}}}}}}}, macro = function (_g68, ...)
  local l = _g68[1]
  local v = _g68[2]
  local i = _g68[3]
  local start = _g68[4]
  local body = unstash({...})
  local _g69 = sub(body, 0)
  local l1 = make_id()
  i = (i or make_id())
  start = (start or 0)
  return({"let", {i, start, l1, l}, {"while", {"<", i, {"length", l1}}, join({"let", {v, {"at", l1, i}}}, join(_g69, {{"inc", i}}))}})
end, export = true, module = "lib"}, _g27 = {variable = true, module = "lib"}, ["table?"] = {variable = true, export = true, module = "lib"}, ["id-literal?"] = {variable = true, export = true, module = "lib"}, _g40 = {variable = true, module = "lib"}, ["list?"] = {variable = true, export = true, module = "lib"}}, import = {"lib", "compiler"}}, compiler = {toplevel = {["compile-toplevel"] = {variable = true, export = true, module = "compiler"}, ["%compile-module"] = {variable = true, module = "compiler"}, ["initial-environment"] = {variable = true, module = "compiler"}, _g134 = {variable = true, module = "compiler"}, ["%global-function"] = {form = (function ()
  local _g70 = {"fn", {(function ()
    local _g71 = {"name", "args"}
    _g71.rest = "body"
    return(_g71)
  end)()}, {"if", {"=", "target", {"quote", "lua"}}, (function ()
    local _g72 = {"compile-function", "args", "body"}
    _g72.name = "name"
    return(_g72)
  end)(), (function ()
    local _g73 = {"compile", {"quasiquote", {"set", {"unquote", "name"}, {"%function", {"unquote", "args"}, {"unquote-splicing", "body"}}}}}
    _g73["stmt?"] = true
    return(_g73)
  end)()}}
  _g70.stmt = true
  _g70.tr = true
  return(_g70)
end)(), export = true, stmt = true, tr = true, special = function (_g74)
  local name = _g74[1]
  local args = _g74[2]
  local body = sub(_g74, 2)
  if (target == "lua") then
    return(compile_function(args, body, {_stash = true, name = name}))
  else
    return(compile({"set", name, join({"%function", args}, body)}, {_stash = true, ["stmt?"] = true}))
  end
end, module = "compiler"}, ["quote-m0dules"] = {variable = true, export = true, module = "compiler"}, ["can-return?"] = {variable = true, module = "compiler"}, _g165 = {variable = true, module = "compiler"}, _g151 = {variable = true, module = "compiler"}, ["open-module"] = {variable = true, export = true, module = "compiler"}, ["get"] = {form = {"fn", {{"t", "k"}}, {"let", {"t", {"compile", "t"}, "k1", {"compile", "k"}}, {"if", {"and", {"=", "target", {"quote", "lua"}}, {"=", {"char", "t", 0}, "\"{\""}}, {"set", "t", {"cat", "\"(\"", "t", "\")\""}}}, {"if", {"and", {"string-literal?", "k"}, {"valid-id?", {"inner", "k"}}}, {"cat", "t", "\".\"", {"inner", "k"}}, {"cat", "t", "\"[\"", "k1", "\"]\""}}}}, special = function (_g75)
  local t = _g75[1]
  local k = _g75[2]
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
end, export = true, module = "compiler"}, ["compile-branch"] = {variable = true, module = "compiler"}, _g187 = {variable = true, module = "compiler"}, _g167 = {variable = true, module = "compiler"}, _g141 = {variable = true, module = "compiler"}, ["%object"] = {form = {"fn", {"forms"}, {"let", {"str", "\"{\"", "sep", {"if", {"=", "target", {"quote", "lua"}}, "\" = \"", "\": \""}, "pairs", {"pairwise", "forms"}}, {"across", {"pairs", {"k", "v"}, "i"}, {"if", {"not", {"string?", "k"}}, {"error", {"cat", "\"Illegal key: \"", {"to-string", "k"}}}}, {"let", {"v", {"compile", "v"}, "k", {"if", {"valid-id?", "k"}, "k", {"and", {"=", "target", {"quote", "js"}}, {"string-literal?", "k"}}, "k", {"=", "target", {"quote", "js"}}, {"quoted", "k"}, {"string-literal?", "k"}, {"cat", "\"[\"", "k", "\"]\""}, {"cat", "\"[\"", {"quoted", "k"}, "\"]\""}}}, {"cat!", "str", "k", "sep", "v"}}, {"if", {"<", "i", {"-", {"length", "pairs"}, 1}}, {"cat!", "str", "\", \""}}}, {"cat", "str", "\"}\""}}}, special = function (forms)
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
  local _g76 = pairs
  while (i < length(_g76)) do
    local _g77 = _g76[(i + 1)]
    local k = _g77[1]
    local v = _g77[2]
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
end, export = true, module = "compiler"}, ["%try"] = {form = (function ()
  local _g78 = {"fn", {"forms"}, {"let", {"ind", {"indentation"}, "body", {"with-indent", (function ()
    local _g79 = {"compile-body", "forms"}
    _g79["tail?"] = true
    return(_g79)
  end)()}, "e", {"make-id"}, "handler", {"quasiquote", {"return", {"%array", false, {"unquote", "e"}}}}, "h", {"with-indent", (function ()
    local _g80 = {"compile", "handler"}
    _g80["stmt?"] = true
    return(_g80)
  end)()}}, {"cat", "ind", "\"try {\\n\"", "body", "ind", "\"}\\n\"", "ind", "\"catch (\"", "e", "\") {\\n\"", "h", "ind", "\"}\\n\""}}}
  _g78.stmt = true
  _g78.tr = true
  return(_g78)
end)(), export = true, stmt = true, tr = true, special = function (forms)
  local ind = indentation()
  local body = (function ()
    indent_level = (indent_level + 1)
    local _g81 = compile_body(forms, {_stash = true, ["tail?"] = true})
    indent_level = (indent_level - 1)
    return(_g81)
  end)()
  local e = make_id()
  local handler = {"return", {"%array", false, e}}
  local h = (function ()
    indent_level = (indent_level + 1)
    local _g82 = compile(handler, {_stash = true, ["stmt?"] = true})
    indent_level = (indent_level - 1)
    return(_g82)
  end)()
  return((ind .. "try {\n" .. body .. ind .. "}\n" .. ind .. "catch (" .. e .. ") {\n" .. h .. ind .. "}\n"))
end, module = "compiler"}, _g161 = {variable = true, module = "compiler"}, ["quote-frame"] = {variable = true, module = "compiler"}, _g137 = {variable = true, module = "compiler"}, _g184 = {variable = true, module = "compiler"}, eval = {variable = true, export = true, module = "compiler"}, ["with-indent"] = {form = {"fn", {"form"}, {"let", {"result", {"make-id"}}, {"quasiquote", {"do", {"inc", "indent-level"}, {"let", {{"unquote", "result"}, {"unquote", "form"}}, {"dec", "indent-level"}, {"unquote", "result"}}}}}}, macro = function (form)
  local result = make_id()
  return({"do", {"inc", "indent-level"}, {"let", {result, form}, {"dec", "indent-level"}, result}})
end, export = true, module = "compiler"}, ["quote-binding"] = {variable = true, module = "compiler"}, _g140 = {variable = true, module = "compiler"}, ["set"] = {form = (function ()
  local _g83 = {"fn", {{"lh", "rh"}}, {"if", {"nil?", "rh"}, {"error", "\"Missing right-hand side in assignment\""}}, {"cat", {"indentation"}, {"compile", "lh"}, "\" = \"", {"compile", "rh"}}}
  _g83.stmt = true
  return(_g83)
end)(), export = true, stmt = true, special = function (_g84)
  local lh = _g84[1]
  local rh = _g84[2]
  if nil63(rh) then
    error("Missing right-hand side in assignment")
  end
  return((indentation() .. compile(lh) .. " = " .. compile(rh)))
end, module = "compiler"}, terminator = {variable = true, module = "compiler"}, run = {variable = true, module = "compiler"}, ["compile-special"] = {variable = true, module = "compiler"}, ["indent-level"] = {variable = true, module = "compiler"}, ["numeric?"] = {variable = true, module = "compiler"}, ["load-module"] = {variable = true, export = true, module = "compiler"}, ["compile-call"] = {variable = true, module = "compiler"}, ["compile-atom"] = {variable = true, module = "compiler"}, ["compiler-output"] = {variable = true, export = true, module = "compiler"}, ["break"] = {form = (function ()
  local _g85 = {"fn", {"_g122"}, {"cat", {"indentation"}, "\"break\""}}
  _g85.stmt = true
  return(_g85)
end)(), export = true, stmt = true, special = function (_g122)
  return((indentation() .. "break"))
end, module = "compiler"}, ["valid-char?"] = {variable = true, module = "compiler"}, _g171 = {variable = true, module = "compiler"}, ["in-module"] = {variable = true, export = true, module = "compiler"}, _g163 = {variable = true, module = "compiler"}, ["infix?"] = {variable = true, module = "compiler"}, ["compile-infix"] = {variable = true, module = "compiler"}, ["open-m0dule"] = {variable = true, export = true, module = "compiler"}, ["compile-body"] = {variable = true, module = "compiler"}, ["compilation-level"] = {variable = true, module = "compiler"}, getop = {variable = true, module = "compiler"}, ["%array"] = {form = {"fn", {"forms"}, {"let", {"open", {"if", {"=", "target", {"quote", "lua"}}, "\"{\"", "\"[\""}, "close", {"if", {"=", "target", {"quote", "lua"}}, "\"}\"", "\"]\""}, "str", "\"\""}, {"across", {"forms", "x", "i"}, {"cat!", "str", {"compile", "x"}}, {"if", {"<", "i", {"-", {"length", "forms"}, 1}}, {"cat!", "str", "\", \""}}}, {"cat", "open", "str", "close"}}}, special = function (forms)
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
  local _g86 = forms
  while (i < length(_g86)) do
    local x = _g86[(i + 1)]
    str = (str .. compile(x))
    if (i < (length(forms) - 1)) then
      str = (str .. ", ")
    end
    i = (i + 1)
  end
  return((open .. str .. close))
end, export = true, module = "compiler"}, ["return"] = {form = (function ()
  local _g87 = {"fn", {{"x"}}, {"let", {"x", {"if", {"nil?", "x"}, "\"return\"", {"compile-call", {"quasiquote", {"return", {"unquote", "x"}}}}}}, {"cat", {"indentation"}, "x"}}}
  _g87.stmt = true
  return(_g87)
end)(), export = true, stmt = true, special = function (_g88)
  local x = _g88[1]
  local x = (function ()
    if nil63(x) then
      return("return")
    else
      return(compile_call({"return", x}))
    end
  end)()
  return((indentation() .. x))
end, module = "compiler"}, ["module-path"] = {variable = true, module = "compiler"}, ["compile-file"] = {variable = true, module = "compiler"}, module = {variable = true, module = "compiler"}, ["compile-module"] = {variable = true, export = true, module = "compiler"}, ["do"] = {form = (function ()
  local _g89 = {"fn", {"forms", "tail?"}, (function ()
    local _g90 = {"compile-body", "forms"}
    _g90["tail?"] = "tail?"
    return(_g90)
  end)()}
  _g89.stmt = true
  _g89.tr = true
  return(_g89)
end)(), export = true, stmt = true, tr = true, special = function (forms, tail63)
  return(compile_body(forms, {_stash = true, ["tail?"] = tail63}))
end, module = "compiler"}, ["current-module"] = {variable = true, export = true, module = "compiler"}, ["compile-args"] = {variable = true, module = "compiler"}, _g169 = {variable = true, module = "compiler"}, _g152 = {variable = true, module = "compiler"}, infix = {variable = true, module = "compiler"}, ["quote-modules"] = {variable = true, export = true, module = "compiler"}, _g146 = {variable = true, module = "compiler"}, _g154 = {variable = true, module = "compiler"}, ["module-key"] = {variable = true, module = "compiler"}, ["while"] = {form = (function ()
  local _g91 = {"fn", {(function ()
    local _g92 = {"condition"}
    _g92.rest = "body"
    return(_g92)
  end)()}, {"let", {"condition", {"compile", "condition"}, "body", {"with-indent", {"compile-body", "body"}}, "ind", {"indentation"}}, {"if", {"=", "target", {"quote", "js"}}, {"cat", "ind", "\"while (\"", "condition", "\") {\\n\"", "body", "ind", "\"}\\n\""}, {"cat", "ind", "\"while \"", "condition", "\" do\\n\"", "body", "ind", "\"end\\n\""}}}}
  _g91.stmt = true
  _g91.tr = true
  return(_g91)
end)(), export = true, stmt = true, tr = true, special = function (_g93)
  local condition = _g93[1]
  local body = sub(_g93, 1)
  local condition = compile(condition)
  local body = (function ()
    indent_level = (indent_level + 1)
    local _g94 = compile_body(body)
    indent_level = (indent_level - 1)
    return(_g94)
  end)()
  local ind = indentation()
  if (target == "js") then
    return((ind .. "while (" .. condition .. ") {\n" .. body .. ind .. "}\n"))
  else
    return((ind .. "while " .. condition .. " do\n" .. body .. ind .. "end\n"))
  end
end, module = "compiler"}, ["valid-id?"] = {variable = true, module = "compiler"}, compile = {variable = true, export = true, module = "compiler"}, indentation = {variable = true, module = "compiler"}, ["compile-function"] = {variable = true, module = "compiler"}, _g149 = {variable = true, module = "compiler"}, ["quote-module"] = {variable = true, module = "compiler"}, ["compile-id"] = {variable = true, module = "compiler"}, ["%local-function"] = {form = (function ()
  local _g95 = {"fn", {(function ()
    local _g96 = {"name", "args"}
    _g96.rest = "body"
    return(_g96)
  end)()}, (function ()
    local _g97 = {"compile-function", "args", "body"}
    _g97.prefix = "\"local \""
    _g97.name = "name"
    return(_g97)
  end)()}
  _g95.stmt = true
  _g95.tr = true
  return(_g95)
end)(), export = true, stmt = true, tr = true, special = function (_g98)
  local name = _g98[1]
  local args = _g98[2]
  local body = sub(_g98, 2)
  return(compile_function(args, body, {_stash = true, name = name, prefix = "local "}))
end, module = "compiler"}, _g145 = {variable = true, module = "compiler"}, ["error"] = {form = (function ()
  local _g100 = {"fn", {{"x"}}, {"let", {"e", {"if", {"=", "target", {"quote", "js"}}, {"cat", "\"throw \"", {"compile", "x"}}, {"compile-call", {"quasiquote", {"error", {"unquote", "x"}}}}}}, {"cat", {"indentation"}, "e"}}}
  _g100.stmt = true
  return(_g100)
end)(), export = true, stmt = true, special = function (_g101)
  local x = _g101[1]
  local e = (function ()
    if (target == "js") then
      return(("throw " .. compile(x)))
    else
      return(compile_call({"error", x}))
    end
  end)()
  return((indentation() .. e))
end, module = "compiler"}, _g159 = {variable = true, module = "compiler"}, ["%local"] = {form = (function ()
  local _g102 = {"fn", {{"name", "value"}}, {"let", {"id", {"compile", "name"}, "value", {"compile", "value"}, "keyword", {"if", {"=", "target", {"quote", "js"}}, "\"var \"", "\"local \""}, "ind", {"indentation"}}, {"cat", "ind", "keyword", "id", "\" = \"", "value"}}}
  _g102.stmt = true
  return(_g102)
end)(), export = true, stmt = true, special = function (_g103)
  local name = _g103[1]
  local value = _g103[2]
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
end, module = "compiler"}, _g158 = {variable = true, module = "compiler"}, ["quote-environment"] = {variable = true, export = true, module = "compiler"}, ["define-module"] = {form = {"fn", (function ()
  local _g104 = {"spec"}
  _g104.rest = "body"
  return(_g104)
end)(), {"%define-module", "spec", "body"}}, macro = function (spec, ...)
  local body = unstash({...})
  local _g105 = sub(body, 0)
  return(_37define_module(spec, _g105))
end, export = true, module = "boot"}, _g157 = {variable = true, module = "compiler"}, _g162 = {variable = true, module = "compiler"}, _g156 = {variable = true, module = "compiler"}, ["%function"] = {form = {"fn", {(function ()
  local _g106 = {"args"}
  _g106.rest = "body"
  return(_g106)
end)()}, {"compile-function", "args", "body"}}, special = function (_g107)
  local args = _g107[1]
  local body = sub(_g107, 1)
  return(compile_function(args, body))
end, export = true, module = "compiler"}, _g186 = {variable = true, module = "compiler"}, _g135 = {variable = true, module = "compiler"}, ["if"] = {form = (function ()
  local _g108 = {"fn", {"form", "tail?"}, {"let", {"str", "\"\""}, {"across", {"form", "condition", "i"}, {"let", {"last?", {">=", "i", {"-", {"length", "form"}, 2}}, "else?", {"=", "i", {"-", {"length", "form"}, 1}}, "first?", {"=", "i", 0}, "body", {"at", "form", {"+", "i", 1}}}, {"if", "else?", {"do", {"set", "body", "condition"}, {"set", "condition", "nil"}}}, {"cat!", "str", {"compile-branch", "condition", "body", "first?", "last?", "tail?"}}}, {"inc", "i"}}, "str"}}
  _g108.stmt = true
  _g108.tr = true
  return(_g108)
end)(), export = true, stmt = true, tr = true, special = function (form, tail63)
  local str = ""
  local i = 0
  local _g109 = form
  while (i < length(_g109)) do
    local condition = _g109[(i + 1)]
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
end, module = "compiler"}, _g185 = {variable = true, module = "compiler"}, _g150 = {variable = true, module = "compiler"}, ["%for"] = {form = (function ()
  local _g110 = {"fn", {(function ()
    local _g111 = {{"t", "k"}}
    _g111.rest = "body"
    return(_g111)
  end)()}, {"let", {"t", {"compile", "t"}, "ind", {"indentation"}, "body", {"with-indent", {"compile-body", "body"}}}, {"if", {"=", "target", {"quote", "lua"}}, {"cat", "ind", "\"for \"", "k", "\" in next, \"", "t", "\" do\\n\"", "body", "ind", "\"end\\n\""}, {"cat", "ind", "\"for (\"", "k", "\" in \"", "t", "\") {\\n\"", "body", "ind", "\"}\\n\""}}}}
  _g110.stmt = true
  _g110.tr = true
  return(_g110)
end)(), export = true, stmt = true, tr = true, special = function (_g112)
  local _g113 = _g112[1]
  local t = _g113[1]
  local k = _g113[2]
  local body = sub(_g112, 1)
  local t = compile(t)
  local ind = indentation()
  local body = (function ()
    indent_level = (indent_level + 1)
    local _g114 = compile_body(body)
    indent_level = (indent_level - 1)
    return(_g114)
  end)()
  if (target == "lua") then
    return((ind .. "for " .. k .. " in next, " .. t .. " do\n" .. body .. ind .. "end\n"))
  else
    return((ind .. "for (" .. k .. " in " .. t .. ") {\n" .. body .. ind .. "}\n"))
  end
end, module = "compiler"}, ["not"] = {form = {"fn", {{"x"}}, {"let", {"x", {"compile", "x"}, "open", {"if", {"=", "target", {"quote", "js"}}, "\"!(\"", "\"(not \""}}, {"cat", "open", "x", "\")\""}}}, special = function (_g115)
  local x = _g115[1]
  local x = compile(x)
  local open = (function ()
    if (target == "js") then
      return("!(")
    else
      return("(not ")
    end
  end)()
  return((open .. x .. ")"))
end, export = true, module = "compiler"}}, import = {"reader", "lib", "compiler"}}, boot = {toplevel = {}, import = {"lib", "compiler"}}, reader = {toplevel = {read = {variable = true, export = true, module = "reader"}, ["make-stream"] = {variable = true, export = true, module = "reader"}, ["read-table"] = {variable = true, module = "reader"}, _g4 = {variable = true, module = "reader"}, whitespace = {variable = true, module = "reader"}, ["key?"] = {variable = true, module = "reader"}, ["skip-non-code"] = {variable = true, module = "reader"}, ["define-reader"] = {form = {"fn", (function ()
  local _g116 = {{"char", "stream"}}
  _g116.rest = "body"
  return(_g116)
end)(), {"quasiquote", {"set", {"get", "read-table", {"unquote", "char"}}, {"fn", {{"unquote", "stream"}}, {"unquote-splicing", "body"}}}}}, macro = function (_g117, ...)
  local char = _g117[1]
  local stream = _g117[2]
  local body = unstash({...})
  local _g118 = sub(body, 0)
  return({"set", {"get", "read-table", char}, join({"fn", {stream}}, _g118)})
end, export = true, module = "reader"}, delimiters = {variable = true, module = "reader"}, ["peek-char"] = {variable = true, module = "reader"}, ["flag?"] = {variable = true, module = "reader"}, ["read-from-string"] = {variable = true, export = true, module = "reader"}, ["read-char"] = {variable = true, module = "reader"}, eof = {variable = true, module = "reader"}, ["read-all"] = {variable = true, export = true, module = "reader"}}, import = {"lib", "compiler"}}}
environment = {{["define-module"] = {form = {"fn", (function ()
  local _g119 = {"spec"}
  _g119.rest = "body"
  return(_g119)
end)(), {"%define-module", "spec", "body"}}, macro = function (spec, ...)
  local body = unstash({...})
  local _g120 = sub(body, 0)
  return(_37define_module(spec, _g120))
end, export = true, module = "boot"}}}
delimiters = {["("] = true, ["\n"] = true, [")"] = true, [";"] = true}
whitespace = {["\n"] = true, ["\t"] = true, [" "] = true}
function make_stream(str)
  return({string = str, pos = 0, len = length(str)})
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
function setenv(k, ...)
  local keys = unstash({...})
  local _g128 = sub(keys, 0)
  if string63(k) then
    local frame = last(environment)
    local x = (frame[k] or {})
    local k1 = nil
    local _g129 = _g128
    for k1 in next, _g129 do
      if (not number63(k1)) then
        local v = _g129[k1]
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
    local _g188 = args
    for k in next, _g188 do
      if (not number63(k)) then
        local v = _g188[k]
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
    local _g189 = args
    for k in next, _g189 do
      if (not number63(k)) then
        local v = _g189[k]
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
      local _g190 = l
      for k in next, _g190 do
        if (not number63(k)) then
          local v = _g190[k]
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
    local _g192 = 0
    local _g191 = args
    while (_g192 < length(_g191)) do
      local arg = _g191[(_g192 + 1)]
      if atom63(arg) then
        add(args1, arg)
      elseif (list63(arg) or keys63(arg)) then
        local v = make_id()
        add(args1, v)
        bs = join(bs, {arg, v})
      end
      _g192 = (_g192 + 1)
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
    local _g193 = lh
    while (i < length(_g193)) do
      local x = _g193[(i + 1)]
      bs = join(bs, bind(x, {"at", rh, i}))
      i = (i + 1)
    end
    if r then
      bs = join(bs, bind(r, {"sub", rh, length(lh)}))
    end
    local k = nil
    local _g194 = lh
    for k in next, _g194 do
      if (not number63(k)) then
        local v = _g194[k]
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
      local _g125 = form[1]
      local _g195 = form[2]
      local t = _g195[1]
      local k = _g195[2]
      local body = sub(form, 2)
      return(join({"%for", {macroexpand(t), macroexpand(k)}}, macroexpand(body)))
    elseif (x == "%function") then
      local _g126 = form[1]
      local args = form[2]
      local _g196 = sub(form, 2)
      add(environment, {})
      local _g198 = (function ()
        local _g200 = 0
        local _g199 = args
        while (_g200 < length(_g199)) do
          local _g197 = _g199[(_g200 + 1)]
          setenv(_g197, {_stash = true, variable = true})
          _g200 = (_g200 + 1)
        end
        return(join({"%function", map42(macroexpand, args)}, macroexpand(_g196)))
      end)()
      drop(environment)
      return(_g198)
    elseif ((x == "%local-function") or (x == "%global-function")) then
      local _g127 = form[1]
      local name = form[2]
      local _g201 = form[3]
      local _g202 = sub(form, 3)
      add(environment, {})
      local _g204 = (function ()
        local _g206 = 0
        local _g205 = _g201
        while (_g206 < length(_g205)) do
          local _g203 = _g205[(_g206 + 1)]
          setenv(_g203, {_stash = true, variable = true})
          _g206 = (_g206 + 1)
        end
        return(join({x, name, map42(macroexpand, _g201)}, macroexpand(_g202)))
      end)()
      drop(environment)
      return(_g204)
    elseif macro63(x) then
      local b = getenv(x)
      return(macroexpand(apply(b.macro, tl(form))))
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
  local _g207 = form
  for k in next, _g207 do
    if (not number63(k)) then
      local v = _g207[k]
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
  local _g209 = 0
  local _g208 = form
  while (_g209 < length(_g208)) do
    local x = _g208[(_g209 + 1)]
    if quasisplice63(x, depth) then
      local x = quasiexpand(x[2])
      add(xs, x)
      add(xs, {"list"})
    else
      add(last(xs), quasiexpand(x, depth))
    end
    _g209 = (_g209 + 1)
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
  local _g210 = (upto or length(l))
  local l2 = {}
  while (i < _g210) do
    l2[(j + 1)] = l[(i + 1)]
    i = (i + 1)
    j = (j + 1)
  end
  return(l2)
end
function sub(x, from, upto)
  local _g211 = (from or 0)
  if string63(x) then
    return(substring(x, _g211, upto))
  else
    local l = sublist(x, _g211, upto)
    local k = nil
    local _g212 = x
    for k in next, _g212 do
      if (not number63(k)) then
        local v = _g212[k]
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
    local _g213 = l1
    for k in next, _g213 do
      if (not number63(k)) then
        local v = _g213[k]
        l[k] = v
      end
    end
    local _g215 = nil
    local _g214 = l2
    for _g215 in next, _g214 do
      if (not number63(_g215)) then
        local v = _g214[_g215]
        l[_g215] = v
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
  local _g217 = 0
  local _g216 = l
  while (_g217 < length(_g216)) do
    local x = _g216[(_g217 + 1)]
    if f(x) then
      add(l1, x)
    end
    _g217 = (_g217 + 1)
  end
  return(l1)
end
function find(f, l)
  local _g219 = 0
  local _g218 = l
  while (_g219 < length(_g218)) do
    local x = _g218[(_g219 + 1)]
    local x = f(x)
    if x then
      return(x)
    end
    _g219 = (_g219 + 1)
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
  local _g229 = 0
  local _g228 = l
  while (_g229 < length(_g228)) do
    local x = _g228[(_g229 + 1)]
    local x1 = f(x)
    local s = splice63(x1)
    if list63(s) then
      l1 = join(l1, s)
    elseif is63(s) then
      add(l1, s)
    elseif is63(x1) then
      add(l1, x1)
    end
    _g229 = (_g229 + 1)
  end
  return(l1)
end
function map42(f, t)
  local l = map(f, t)
  local k = nil
  local _g230 = t
  for k in next, _g230 do
    if (not number63(k)) then
      local v = _g230[k]
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
  local _g231 = t
  for k in next, _g231 do
    if (not number63(k)) then
      local v = _g231[k]
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
  local _g232 = t
  for k in next, _g232 do
    if (not number63(k)) then
      local v = _g232[k]
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
  local _g233 = t
  for k in next, _g233 do
    if (not number63(k)) then
      local v = _g233[k]
      k63 = true
      break
    end
  end
  return(k63)
end
function extend(t, ...)
  local xs = unstash({...})
  local _g234 = sub(xs, 0)
  return(join(t, _g234))
end
function exclude(t, ...)
  local keys = unstash({...})
  local _g235 = sub(keys, 0)
  local t1 = sublist(t)
  local k = nil
  local _g236 = t
  for k in next, _g236 do
    if (not number63(k)) then
      local v = _g236[k]
      if (not _g235[k]) then
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
  local _g237 = (function ()
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
  local _g238 = sub(xs, 0)
  if empty63(_g238) then
    return("")
  else
    return(reduce(function (a, b)
      return((a .. b))
    end, _g238))
  end
end
function _43(...)
  local xs = unstash({...})
  local _g241 = sub(xs, 0)
  return(reduce(function (a, b)
    return((a + b))
  end, _g241))
end
function _(...)
  local xs = unstash({...})
  local _g242 = sub(xs, 0)
  return(reduce(function (a, b)
    return((b - a))
  end, reverse(_g242)))
end
function _42(...)
  local xs = unstash({...})
  local _g243 = sub(xs, 0)
  return(reduce(function (a, b)
    return((a * b))
  end, _g243))
end
function _47(...)
  local xs = unstash({...})
  local _g244 = sub(xs, 0)
  return(reduce(function (a, b)
    return((b / a))
  end, reverse(_g244)))
end
function _37(...)
  local xs = unstash({...})
  local _g245 = sub(xs, 0)
  return(reduce(function (a, b)
    return((b % a))
  end, reverse(_g245)))
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
    local _g246 = x
    for k in next, _g246 do
      if (not number63(k)) then
        local v = _g246[k]
        add(x1, (k .. ":"))
        add(x1, v)
      end
    end
    local i = 0
    local _g247 = x1
    while (i < length(_g247)) do
      local y = _g247[(i + 1)]
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
  local _g248 = stash(args)
  return(f(unpack(_g248)))
end
id_count = 0
function make_id()
  id_count = (id_count + 1)
  return(("_g" .. id_count))
end
infix = {js = {["="] = "===", ["or"] = "||", ["~="] = "!=", ["cat"] = "+", ["and"] = "&&"}, common = {["%"] = true, [">="] = true, ["-"] = true, [">"] = true, ["/"] = true, ["*"] = true, ["<="] = true, ["+"] = true, ["<"] = true}, lua = {["="] = "==", ["or"] = true, ["~="] = true, ["cat"] = "..", ["and"] = true}}
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
  local _g251 = args
  while (i < length(_g251)) do
    local arg = _g251[(i + 1)]
    str = (str .. compile(arg))
    if (i < (length(args) - 1)) then
      str = (str .. ", ")
    end
    i = (i + 1)
  end
  return((str .. ")"))
end
function compile_body(forms, ...)
  local _g252 = unstash({...})
  local tail63 = _g252["tail?"]
  local str = ""
  local i = 0
  local _g253 = forms
  while (i < length(_g253)) do
    local x = _g253[(i + 1)]
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
function compile_infix(_g254)
  local op = _g254[1]
  local args = sub(_g254, 1)
  local str = "("
  local op = getop(op)
  local i = 0
  local _g255 = args
  while (i < length(_g255)) do
    local arg = _g255[(i + 1)]
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
  local _g256 = (function ()
    indent_level = (indent_level + 1)
    local _g257 = compile(body, {_stash = true, ["stmt?"] = true, ["tail?"] = tail63})
    indent_level = (indent_level - 1)
    return(_g257)
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
    return((ind .. "if (" .. cond1 .. ") {\n" .. _g256 .. ind .. "}" .. tr))
  elseif first63 then
    return((ind .. "if " .. cond1 .. " then\n" .. _g256 .. tr))
  elseif (nil63(condition) and (target == "js")) then
    return((" else {\n" .. _g256 .. ind .. "}\n"))
  elseif nil63(condition) then
    return((ind .. "else\n" .. _g256 .. tr))
  elseif (target == "js") then
    return((" else if (" .. cond1 .. ") {\n" .. _g256 .. ind .. "}" .. tr))
  else
    return((ind .. "elseif " .. cond1 .. " then\n" .. _g256 .. tr))
  end
end
function compile_function(args, body, ...)
  local _g258 = unstash({...})
  local name = _g258.name
  local prefix = _g258.prefix
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
    local _g259 = compile_body(body, {_stash = true, ["tail?"] = true})
    indent_level = (indent_level - 1)
    return(_g259)
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
  local _g260 = getenv(hd(form))
  local stmt = _g260.stmt
  local self_tr63 = _g260.tr
  local special = _g260.special
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
  local _g304 = unstash({...})
  local stmt63 = _g304["stmt?"]
  local tail63 = _g304["tail?"]
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
function compile_file(file)
  local str = read_file(file)
  local body = read_all(make_stream(str))
  local form = join({"do"}, body)
  return(compile_toplevel(form))
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
function _37define_module(spec, body)
  local exp = body.export
  local imp = body.import
  map(load_module, imp)
  modules[module_key(spec)] = {import = imp, export = {}, toplevel = {}}
  local _g306 = 0
  local _g305 = (exp or {})
  while (_g306 < length(_g305)) do
    local k = _g305[(_g306 + 1)]
    setenv(k, {_stash = true, export = true})
    _g306 = (_g306 + 1)
  end
end
function load_module(spec)
  if nil63(module(spec)) then
    _37compile_module(spec)
  elseif (compilation_level == 0) then
    compilation_level = (compilation_level + 1)
    _37compile_module(spec)
    compilation_level = (compilation_level - 1)
  end
  return(open_module(spec))
end
function _37compile_module(spec)
  local path = module_path(spec)
  local mod0 = current_module
  local env0 = environment
  local k = module_key(spec)
  current_module = spec
  environment = initial_environment()
  local compiled = compile_file(path)
  local m = module(spec)
  local toplevel = hd(environment)
  current_module = mod0
  environment = env0
  local name = nil
  local _g307 = toplevel
  for name in next, _g307 do
    if (not number63(name)) then
      local binding = _g307[name]
      if (binding.export and (binding.module == k)) then
        m.toplevel[name] = binding
      end
    end
  end
  if number63(compilation_level) then
    compiler_output = (compiler_output .. compiled)
  else
    return(run(compiled))
  end
end
function open_module(spec)
  local m = module(spec)
  local frame = last(environment)
  local k = nil
  local _g308 = m.toplevel
  for k in next, _g308 do
    if (not number63(k)) then
      local v = _g308[k]
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
    return(extend(b, {_stash = true, form = {"quote", b.form}, macro = b.form}))
  elseif (b.special and b.form) then
    return(extend(b, {_stash = true, form = {"quote", b.form}, special = b.form}))
  elseif is63(b.variable) then
    return(b)
  end
end
function quote_frame(t)
  return(join({"%object"}, mapo(function (_g250, b)
    return(join({"table"}, quote_binding(b)))
  end, t)))
end
function quote_environment(env)
  return(join({"list"}, map(quote_frame, env)))
end
function quote_module(m)
  local _g309 = {"table"}
  _g309.toplevel = quote_frame(m.toplevel)
  _g309.import = quoted(m.import)
  return(_g309)
end
function quote_modules()
  return(join({"table"}, map42(quote_module, modules)))
end
function rep(str)
  local _g310 = (function ()
    local _g311,_g312 = xpcall(function ()
      return(eval(read_from_string(str)))
    end, message_handler)
    return({_g311, _g312})
  end)()
  local _g1 = _g310[1]
  local x = _g310[2]
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
  local _g313 = args
  while (i < length(_g313)) do
    local arg = _g313[(i + 1)]
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
