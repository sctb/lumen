modules = {reader = {import = {"lib", "compiler"}, toplevel = {read = {module = "reader", export = true, variable = true}, delimiters = {module = "reader", variable = true}, _g4 = {module = "reader", variable = true}, ["skip-non-code"] = {module = "reader", variable = true}, ["read-from-string"] = {module = "reader", export = true, variable = true}, ["define-reader"] = {module = "reader", macro = function (_g2, ...)
  local char = _g2[1]
  local stream = _g2[2]
  local body = unstash({...})
  local _g3 = sub(body, 0)
  return({"set", {"get", "read-table", char}, join({"fn", {stream}}, _g3)})
end, export = true, form = {"fn", (function ()
  local _g4 = {{"char", "stream"}}
  _g4.rest = "body"
  return(_g4)
end)(), {"quasiquote", {"set", {"get", "read-table", {"unquote", "char"}}, {"fn", {{"unquote", "stream"}}, {"unquote-splicing", "body"}}}}}}, ["peek-char"] = {module = "reader", variable = true}, whitespace = {module = "reader", variable = true}, ["make-stream"] = {module = "reader", export = true, variable = true}, ["read-table"] = {module = "reader", variable = true}, ["key?"] = {module = "reader", variable = true}, ["flag?"] = {module = "reader", variable = true}, eof = {module = "reader", variable = true}, ["read-all"] = {module = "reader", export = true, variable = true}, ["read-char"] = {module = "reader", variable = true}}}, lib = {import = {"lib", "compiler"}, toplevel = {["atom?"] = {export = true, module = "lib", variable = true}, _g59 = {module = "lib", variable = true}, _g99 = {module = "lib", variable = true}, ["macro-function"] = {module = "lib", variable = true}, exclude = {export = true, module = "lib", variable = true}, ["set-of"] = {macro = function (...)
  local elements = unstash({...})
  local l = {}
  local _g6 = 0
  local _g5 = elements
  while (_g6 < length(_g5)) do
    local e = _g5[(_g6 + 1)]
    l[e] = true
    _g6 = (_g6 + 1)
  end
  return(join({"table"}, l))
end, module = "lib", export = true, form = {"fn", "elements", {"let", {"l", {}}, {"across", {"elements", "e"}, {"set", {"get", "l", "e"}, true}}, {"quasiquote", {"table", {"unquote-splicing", "l"}}}}}}, ["id-count"] = {module = "lib", variable = true}, ["<="] = {export = true, module = "lib", variable = true}, _g52 = {module = "lib", variable = true}, _g45 = {module = "lib", variable = true}, extend = {export = true, module = "lib", variable = true}, language = {macro = function ()
  return({"quote", target})
end, module = "lib", export = true, form = {"fn", {}, {"quasiquote", {"quote", {"unquote", "target"}}}}}, _g27 = {module = "lib", variable = true}, substring = {module = "lib", variable = true}, ["boolean?"] = {export = true, module = "lib", variable = true}, _g18 = {module = "lib", variable = true}, ["function?"] = {export = true, module = "lib", variable = true}, _g26 = {module = "lib", variable = true}, bind = {module = "lib", variable = true}, ["map*"] = {export = true, module = "lib", variable = true}, _g32 = {module = "lib", variable = true}, _g21 = {module = "lib", variable = true}, list = {macro = function (...)
  local body = unstash({...})
  local l = join({"%array"}, body)
  if (not keys63(body)) then
    return(l)
  else
    local id = make_id()
    local init = {}
    local k = nil
    local _g7 = body
    for k in next, _g7 do
      if (not number63(k)) then
        local v = _g7[k]
        add(init, {"set", {"get", id, {"quote", k}}, v})
      end
    end
    return(join({"let", {id, l}}, join(init, {id})))
  end
end, module = "lib", export = true, form = {"fn", "body", {"let", {"l", {"quasiquote", {"%array", {"unquote-splicing", "body"}}}}, {"if", {"not", {"keys?", "body"}}, "l", {"let", {"id", {"make-id"}, "init", {}}, {"each", {"body", "k", "v"}, {"add", "init", {"quasiquote", {"set", {"get", {"unquote", "id"}, {"quote", {"unquote", "k"}}}, {"unquote", "v"}}}}}, {"quasiquote", {"let", {{"unquote", "id"}, {"unquote", "l"}}, {"unquote-splicing", "init"}, {"unquote", "id"}}}}}}}}, [">"] = {export = true, module = "lib", variable = true}, write = {export = true, module = "lib", variable = true}, ["<"] = {export = true, module = "lib", variable = true}, [">="] = {export = true, module = "lib", variable = true}, ["*"] = {export = true, module = "lib", variable = true}, _g40 = {module = "lib", variable = true}, fs = {module = "lib", variable = true}, exit = {export = true, module = "lib", variable = true}, ["%"] = {export = true, module = "lib", variable = true}, code = {export = true, module = "lib", variable = true}, quote = {macro = function (form)
  return(quoted(form))
end, module = "lib", export = true, form = {"fn", {"form"}, {"quoted", "form"}}}, ["define-special"] = {macro = function (name, args, ...)
  local body = unstash({...})
  local _g8 = sub(body, 0)
  local form = join({"fn", args}, _g8)
  local keys = sub(_g8, length(_g8))
  eval(join((function ()
    local _g9 = {"setenv", {"quote", name}}
    _g9.special = form
    _g9.form = {"quote", form}
    return(_g9)
  end)(), keys))
  return(nil)
end, module = "lib", export = true, form = {"fn", (function ()
  local _g10 = {"name", "args"}
  _g10.rest = "body"
  return(_g10)
end)(), {"let", {"form", {"quasiquote", {"fn", {"unquote", "args"}, {"unquote-splicing", "body"}}}, "keys", {"sub", "body", {"length", "body"}}}, {"eval", {"quasiquote", (function ()
  local _g11 = {"setenv", {"quote", {"unquote", "name"}}, {"unquote-splicing", "keys"}}
  _g11.special = {"unquote", "form"}
  _g11.form = {"quote", {"unquote", "form"}}
  return(_g11)
end)()}}}, "nil"}}, ["-"] = {export = true, module = "lib", variable = true}, inner = {export = true, module = "lib", variable = true}, replicate = {export = true, module = "lib", variable = true}, ["keys?"] = {export = true, module = "lib", variable = true}, ["list?"] = {export = true, module = "lib", variable = true}, ["with-frame"] = {macro = function (...)
  local body = unstash({...})
  local x = make_id()
  return({"do", {"add", "environment", {"table"}}, {"let", {x, join({"do"}, body)}, {"drop", "environment"}, x}})
end, module = "lib", export = true, form = {"fn", "body", {"let", {"x", {"make-id"}}, {"quasiquote", {"do", {"add", "environment", {"table"}}, {"let", {{"unquote", "x"}, {"do", {"unquote-splicing", "body"}}}, {"drop", "environment"}, {"unquote", "x"}}}}}}}, _g44 = {module = "lib", variable = true}, search = {export = true, module = "lib", variable = true}, dec = {macro = function (n, by)
  return({"set", n, {"-", n, (by or 1)}})
end, module = "lib", export = true, form = {"fn", {"n", "by"}, {"quasiquote", {"set", {"unquote", "n"}, {"-", {"unquote", "n"}, {"unquote", {"or", "by", 1}}}}}}}, ["id-literal?"] = {export = true, module = "lib", variable = true}, _g25 = {module = "lib", variable = true}, length = {export = true, module = "lib", variable = true}, ["empty?"] = {export = true, module = "lib", variable = true}, _g37 = {module = "lib", variable = true}, define = {macro = function (name, x, ...)
  local body = unstash({...})
  local _g12 = sub(body, 0)
  setenv(name, {_stash = true, variable = true})
  return(join({"define-global", name, x}, _g12))
end, module = "lib", export = true, form = {"fn", (function ()
  local _g13 = {"name", "x"}
  _g13.rest = "body"
  return(_g13)
end)(), (function ()
  local _g14 = {"setenv", "name"}
  _g14.variable = true
  return(_g14)
end)(), {"quasiquote", {"define-global", {"unquote", "name"}, {"unquote", "x"}, {"unquote-splicing", "body"}}}}}, unstash = {export = true, module = "lib", variable = true}, sub = {export = true, module = "lib", variable = true}, pairwise = {export = true, module = "lib", variable = true}, ["read-file"] = {export = true, module = "lib", variable = true}, ["macro?"] = {module = "lib", variable = true}, reduce = {export = true, module = "lib", variable = true}, ["define-symbol"] = {macro = function (name, expansion)
  setenv(name, {_stash = true, symbol = expansion})
  return(nil)
end, module = "lib", export = true, form = {"fn", {"name", "expansion"}, (function ()
  local _g15 = {"setenv", "name"}
  _g15.symbol = "expansion"
  return(_g15)
end)(), "nil"}}, ["write-file"] = {export = true, module = "lib", variable = true}, _g31 = {module = "lib", variable = true}, setenv = {export = true, module = "lib", variable = true}, ["composite?"] = {export = true, module = "lib", variable = true}, _g94 = {module = "lib", variable = true}, splice = {export = true, module = "lib", variable = true}, ["to-string"] = {export = true, module = "lib", variable = true}, ["cat"] = {export = true, module = "lib", variable = true}, ["let-symbol"] = {macro = function (expansions, ...)
  local body = unstash({...})
  local _g16 = sub(body, 0)
  add(environment, {})
  local _g17 = (function ()
    map(function (_g18)
      local name = _g18[1]
      local exp = _g18[2]
      return(macroexpand({"define-symbol", name, exp}))
    end, pairwise(expansions))
    return(join({"do"}, macroexpand(_g16)))
  end)()
  drop(environment)
  return(_g17)
end, module = "lib", export = true, form = {"fn", (function ()
  local _g19 = {"expansions"}
  _g19.rest = "body"
  return(_g19)
end)(), {"with-frame", {"map", {"fn", {{"name", "exp"}}, {"macroexpand", {"quasiquote", {"define-symbol", {"unquote", "name"}, {"unquote", "exp"}}}}}, {"pairwise", "expansions"}}, {"quasiquote", {"do", {"unquote-splicing", {"macroexpand", "body"}}}}}}}, inc = {macro = function (n, by)
  return({"set", n, {"+", n, (by or 1)}})
end, module = "lib", export = true, form = {"fn", {"n", "by"}, {"quasiquote", {"set", {"unquote", "n"}, {"+", {"unquote", "n"}, {"unquote", {"or", "by", 1}}}}}}}, ["quoting?"] = {module = "lib", variable = true}, keep = {export = true, module = "lib", variable = true}, fn = {macro = function (args, ...)
  local body = unstash({...})
  local _g20 = sub(body, 0)
  local _g21 = bind_arguments(args, _g20)
  local args = _g21[1]
  local _g22 = _g21[2]
  return(join({"%function", args}, _g22))
end, module = "lib", export = true, form = {"fn", (function ()
  local _g23 = {"args"}
  _g23.rest = "body"
  return(_g23)
end)(), {"let", {{"args", "body"}, {"bind-arguments", "args", "body"}}, {"quasiquote", {"%function", {"unquote", "args"}, {"unquote-splicing", "body"}}}}}}, ["make-id"] = {export = true, module = "lib", variable = true}, ["table?"] = {export = true, module = "lib", variable = true}, ["parse-number"] = {export = true, module = "lib", variable = true}, char = {export = true, module = "lib", variable = true}, mapt = {export = true, module = "lib", variable = true}, ["define-macro"] = {macro = function (name, args, ...)
  local body = unstash({...})
  local _g24 = sub(body, 0)
  local form = join({"fn", args}, _g24)
  eval((function ()
    local _g25 = {"setenv", {"quote", name}}
    _g25.macro = form
    _g25.form = {"quote", form}
    return(_g25)
  end)())
  return(nil)
end, module = "lib", export = true, form = {"fn", (function ()
  local _g26 = {"name", "args"}
  _g26.rest = "body"
  return(_g26)
end)(), {"let", {"form", {"quasiquote", {"fn", {"unquote", "args"}, {"unquote-splicing", "body"}}}}, {"eval", {"quasiquote", (function ()
  local _g27 = {"setenv", {"quote", {"unquote", "name"}}}
  _g27.macro = {"unquote", "form"}
  _g27.form = {"quote", {"unquote", "form"}}
  return(_g27)
end)()}}}, "nil"}}, ["special?"] = {export = true, module = "lib", variable = true}, _g39 = {module = "lib", variable = true}, ["stash*"] = {export = true, module = "lib", variable = true}, macroexpand = {export = true, module = "lib", variable = true}, ["join!"] = {macro = function (a, ...)
  local bs = unstash({...})
  local _g28 = sub(bs, 0)
  return({"set", a, join({"join*", a}, _g28)})
end, module = "lib", export = true, form = {"fn", (function ()
  local _g29 = {"a"}
  _g29.rest = "bs"
  return(_g29)
end)(), {"quasiquote", {"set", {"unquote", "a"}, {"join*", {"unquote", "a"}, {"unquote-splicing", "bs"}}}}}}, drop = {export = true, module = "lib", variable = true}, quoted = {export = true, module = "lib", variable = true}, ["message-handler"] = {module = "lib", variable = true}, _g112 = {module = "lib", variable = true}, ["%export"] = {macro = function ()
  local toplevel = hd(environment)
  local m = make_id()
  local k = module_key(current_module)
  local body = {{"define", m, {"get", "modules", {"quote", k}}}}
  local k = nil
  local _g30 = toplevel
  for k in next, _g30 do
    if (not number63(k)) then
      local v = _g30[k]
      local b = {"get", {"get", m, {"quote", k}}, {"quote", "variable"}}
      if (v.variable and (v.module == current_module)) then
        add(body, {"set", b, k})
      end
    end
  end
  return(join({"do"}, body))
end, module = "lib", export = true, form = {"fn", {}, {"let", {"toplevel", {"hd", "environment"}, "m", {"make-id"}, "k", {"module-key", "current-module"}, "body", {"quasiquote", {{"define", {"unquote", "m"}, {"get", "modules", {"quote", {"unquote", "k"}}}}}}}, {"each", {"toplevel", "k", "v"}, {"let", {"b", {"quasiquote", {"get", {"get", {"unquote", "m"}, {"quote", {"unquote", "k"}}}, {"quote", "variable"}}}}, {"if", {"and", {"get", "v", {"quote", "variable"}}, {"=", {"get", "v", {"quote", "module"}}, "current-module"}}, {"add", "body", {"quasiquote", {"set", {"unquote", "b"}, {"unquote", "k"}}}}}}}, {"quasiquote", {"do", {"unquote-splicing", "body"}}}}}}, ["quasiquote-list"] = {module = "lib", variable = true}, _g17 = {module = "lib", variable = true}, quasiexpand = {module = "lib", variable = true}, quasiquote = {macro = function (form)
  return(quasiexpand(form, 1))
end, module = "lib", export = true, form = {"fn", {"form"}, {"quasiexpand", "form", 1}}}, hd = {export = true, module = "lib", variable = true}, ["special-form?"] = {export = true, module = "lib", variable = true}, ["define-global"] = {macro = function (name, x, ...)
  local body = unstash({...})
  local _g31 = sub(body, 0)
  setenv(name, {_stash = true, variable = true})
  if (not empty63(_g31)) then
    local _g32 = bind_arguments(x, _g31)
    local args = _g32[1]
    local _g33 = _g32[2]
    return(join({"%global-function", name, args}, _g33))
  else
    return({"set", name, x})
  end
end, module = "lib", export = true, form = {"fn", (function ()
  local _g34 = {"name", "x"}
  _g34.rest = "body"
  return(_g34)
end)(), (function ()
  local _g35 = {"setenv", "name"}
  _g35.variable = true
  return(_g35)
end)(), {"if", {"not", {"empty?", "body"}}, {"let", {{"args", "body"}, {"bind-arguments", "x", "body"}}, {"quasiquote", {"%global-function", {"unquote", "name"}, {"unquote", "args"}, {"unquote-splicing", "body"}}}}, {"quasiquote", {"set", {"unquote", "name"}, {"unquote", "x"}}}}}}, stash = {module = "lib", variable = true}, print = {export = true, module = "lib", variable = true}, apply = {export = true, module = "lib", variable = true}, _g22 = {module = "lib", variable = true}, sublist = {module = "lib", variable = true}, ["quasisplice?"] = {module = "lib", variable = true}, ["string-literal?"] = {export = true, module = "lib", variable = true}, iterate = {export = true, module = "lib", variable = true}, ["symbol-expansion"] = {module = "lib", variable = true}, add = {export = true, module = "lib", variable = true}, map = {export = true, module = "lib", variable = true}, ["number?"] = {export = true, module = "lib", variable = true}, at = {macro = function (l, i)
  if ((target == "lua") and number63(i)) then
    i = (i + 1)
  elseif (target == "lua") then
    i = {"+", i, 1}
  end
  return({"get", l, i})
end, module = "lib", export = true, form = {"fn", {"l", "i"}, {"if", {"and", {"=", "target", {"quote", "lua"}}, {"number?", "i"}}, {"inc", "i"}, {"=", "target", {"quote", "lua"}}, {"set", "i", {"quasiquote", {"+", {"unquote", "i"}, 1}}}}, {"quasiquote", {"get", {"unquote", "l"}, {"unquote", "i"}}}}}, reverse = {export = true, module = "lib", variable = true}, target = {export = true, variable = true, form = {"fn", "clauses", {"get", "clauses", "target"}}, macro = function (...)
  local clauses = unstash({...})
  return(clauses[target])
end, module = "lib"}, table = {macro = function (...)
  local body = unstash({...})
  return(join({"%object"}, mapo(function (_g5, x)
    return(x)
  end, body)))
end, module = "lib", export = true, form = {"fn", "body", {"quasiquote", {"%object", {"unquote-splicing", {"mapo", {"fn", {"_g5", "x"}, "x"}, "body"}}}}}}, ["can-unquote?"] = {module = "lib", variable = true}, ["symbol?"] = {module = "lib", variable = true}, ["+"] = {export = true, module = "lib", variable = true}, ["quasiquoting?"] = {module = "lib", variable = true}, last = {export = true, module = "lib", variable = true}, pr = {macro = function (...)
  local xs = unstash({...})
  local xs = map(function (x)
    return(splice({{"to-string", x}, "\" \""}))
  end, xs)
  return({"print", join({"cat"}, xs)})
end, module = "lib", export = true, form = {"fn", "xs", {"let", {"xs", {"map", {"fn", {"x"}, {"splice", {"quasiquote", {{"to-string", {"unquote", "x"}}, "\" \""}}}}, "xs"}}, {"quasiquote", {"print", {"cat", {"unquote-splicing", "xs"}}}}}}}, ["/"] = {export = true, module = "lib", variable = true}, ["splice?"] = {module = "lib", variable = true}, ["cat!"] = {macro = function (a, ...)
  local bs = unstash({...})
  local _g36 = sub(bs, 0)
  return({"set", a, join({"cat", a}, _g36)})
end, module = "lib", export = true, form = {"fn", (function ()
  local _g37 = {"a"}
  _g37.rest = "bs"
  return(_g37)
end)(), {"quasiquote", {"set", {"unquote", "a"}, {"cat", {"unquote", "a"}, {"unquote-splicing", "bs"}}}}}}, ["="] = {export = true, module = "lib", variable = true}, split = {export = true, module = "lib", variable = true}, _g36 = {module = "lib", variable = true}, each = {macro = function (_g38, ...)
  local t = _g38[1]
  local k = _g38[2]
  local v = _g38[3]
  local body = unstash({...})
  local _g39 = sub(body, 0)
  local t1 = make_id()
  return({"let", {k, "nil", t1, t}, {"%for", {t1, k}, {"if", (function ()
    local _g40 = {"target"}
    _g40.js = {"isNaN", {"parseInt", k}}
    _g40.lua = {"not", {"number?", k}}
    return(_g40)
  end)(), join({"let", {v, {"get", t1, k}}}, _g39)}}})
end, module = "lib", export = true, form = {"fn", (function ()
  local _g41 = {{"t", "k", "v"}}
  _g41.rest = "body"
  return(_g41)
end)(), {"let", {"t1", {"make-id"}}, {"quasiquote", {"let", {{"unquote", "k"}, "nil", {"unquote", "t1"}, {"unquote", "t"}}, {"%for", {{"unquote", "t1"}, {"unquote", "k"}}, {"if", (function ()
  local _g42 = {"target"}
  _g42.js = {"isNaN", {"parseInt", {"unquote", "k"}}}
  _g42.lua = {"not", {"number?", {"unquote", "k"}}}
  return(_g42)
end)(), {"let", {{"unquote", "v"}, {"get", {"unquote", "t1"}, {"unquote", "k"}}}, {"unquote-splicing", "body"}}}}}}}}}, _g100 = {module = "lib", variable = true}, _g56 = {module = "lib", variable = true}, type = {export = true, module = "lib", variable = true}, ["nil?"] = {export = true, module = "lib", variable = true}, ["is?"] = {export = true, module = "lib", variable = true}, ["let-macro"] = {macro = function (definitions, ...)
  local body = unstash({...})
  local _g43 = sub(body, 0)
  add(environment, {})
  local _g44 = (function ()
    map(function (m)
      return(macroexpand(join({"define-macro"}, m)))
    end, definitions)
    return(join({"do"}, macroexpand(_g43)))
  end)()
  drop(environment)
  return(_g44)
end, module = "lib", export = true, form = {"fn", (function ()
  local _g45 = {"definitions"}
  _g45.rest = "body"
  return(_g45)
end)(), {"with-frame", {"map", {"fn", {"m"}, {"macroexpand", {"quasiquote", {"define-macro", {"unquote-splicing", "m"}}}}}, "definitions"}, {"quasiquote", {"do", {"unquote-splicing", {"macroexpand", "body"}}}}}}}, mapo = {export = true, module = "lib", variable = true}, across = {macro = function (_g46, ...)
  local l = _g46[1]
  local v = _g46[2]
  local i = _g46[3]
  local start = _g46[4]
  local body = unstash({...})
  local _g47 = sub(body, 0)
  local l1 = make_id()
  i = (i or make_id())
  start = (start or 0)
  return({"let", {i, start, l1, l}, {"while", {"<", i, {"length", l1}}, join({"let", {v, {"at", l1, i}}}, join(_g47, {{"inc", i}}))}})
end, module = "lib", export = true, form = {"fn", (function ()
  local _g48 = {{"l", "v", "i", "start"}}
  _g48.rest = "body"
  return(_g48)
end)(), {"let", {"l1", {"make-id"}}, {"set", "i", {"or", "i", {"make-id"}}}, {"set", "start", {"or", "start", 0}}, {"quasiquote", {"let", {{"unquote", "i"}, {"unquote", "start"}, {"unquote", "l1"}, {"unquote", "l"}}, {"while", {"<", {"unquote", "i"}, {"length", {"unquote", "l1"}}}, {"let", {{"unquote", "v"}, {"at", {"unquote", "l1"}, {"unquote", "i"}}}, {"unquote-splicing", "body"}, {"inc", {"unquote", "i"}}}}}}}}}, join = {export = true, module = "lib", variable = true}, ["string?"] = {export = true, module = "lib", variable = true}, _g48 = {module = "lib", variable = true}, ["define-local"] = {macro = function (name, x, ...)
  local body = unstash({...})
  local _g49 = sub(body, 0)
  setenv(name, {_stash = true, variable = true})
  if (not empty63(_g49)) then
    local _g50 = bind_arguments(x, _g49)
    local args = _g50[1]
    local _g51 = _g50[2]
    return(join({"%local-function", name, args}, _g51))
  else
    return({"%local", name, x})
  end
end, module = "lib", export = true, form = {"fn", (function ()
  local _g52 = {"name", "x"}
  _g52.rest = "body"
  return(_g52)
end)(), (function ()
  local _g53 = {"setenv", "name"}
  _g53.variable = true
  return(_g53)
end)(), {"if", {"not", {"empty?", "body"}}, {"let", {{"args", "body"}, {"bind-arguments", "x", "body"}}, {"quasiquote", {"%local-function", {"unquote", "name"}, {"unquote", "args"}, {"unquote-splicing", "body"}}}}, {"quasiquote", {"%local", {"unquote", "name"}, {"unquote", "x"}}}}}}, let = {macro = function (bindings, ...)
  local body = unstash({...})
  local _g54 = sub(body, 0)
  local i = 0
  local renames = {}
  local locals = {}
  map(function (_g55)
    local lh = _g55[1]
    local rh = _g55[2]
    local _g57 = 0
    local _g56 = bind(lh, rh)
    while (_g57 < length(_g56)) do
      local _g58 = _g56[(_g57 + 1)]
      local id = _g58[1]
      local val = _g58[2]
      if bound63(id) then
        local rename = make_id()
        add(renames, id)
        add(renames, rename)
        id = rename
      else
        setenv(id, {_stash = true, variable = true})
      end
      add(locals, {"%local", id, val})
      _g57 = (_g57 + 1)
    end
  end, pairwise(bindings))
  return(join({"do"}, join(locals, {join({"let-symbol", renames}, _g54)})))
end, module = "lib", export = true, form = {"fn", (function ()
  local _g59 = {"bindings"}
  _g59.rest = "body"
  return(_g59)
end)(), {"let", {"i", 0, "renames", {}, "locals", {}}, {"map", {"fn", {{"lh", "rh"}}, {"across", {{"bind", "lh", "rh"}, {"id", "val"}}, {"if", {"bound?", "id"}, {"let", {"rename", {"make-id"}}, {"add", "renames", "id"}, {"add", "renames", "rename"}, {"set", "id", "rename"}}, (function ()
  local _g60 = {"setenv", "id"}
  _g60.variable = true
  return(_g60)
end)()}, {"add", "locals", {"quasiquote", {"%local", {"unquote", "id"}, {"unquote", "val"}}}}}}, {"pairwise", "bindings"}}, {"quasiquote", {"do", {"unquote-splicing", "locals"}, {"let-symbol", {"unquote", "renames"}, {"unquote-splicing", "body"}}}}}}}, find = {export = true, module = "lib", variable = true}, tl = {export = true, module = "lib", variable = true}, ["bind-arguments"] = {module = "lib", variable = true}, ["bound?"] = {module = "lib", variable = true}, ["variable?"] = {module = "lib", variable = true}, guard = {macro = function (expr)
  if (target == "js") then
    return({{"fn", {}, {"%try", {"list", true, expr}}}})
  else
    local e = make_id()
    local x = make_id()
    local ex = ("|" .. e .. "," .. x .. "|")
    return({"let", {ex, {"xpcall", {"fn", {}, expr}, "message-handler"}}, {"list", e, x}})
  end
end, module = "lib", export = true, form = {"fn", {"expr"}, {"if", {"=", "target", {"quote", "js"}}, {"quasiquote", {{"fn", {}, {"%try", {"list", true, {"unquote", "expr"}}}}}}, {"let", {"e", {"make-id"}, "x", {"make-id"}, "ex", {"cat", "\"|\"", "e", "\",\"", "x", "\"|\""}}, {"quasiquote", {"let", {{"unquote", "ex"}, {"xpcall", {"fn", {}, {"unquote", "expr"}}, "message-handler"}}, {"list", {"unquote", "e"}, {"unquote", "x"}}}}}}}}, ["list*"] = {macro = function (...)
  local xs = unstash({...})
  if empty63(xs) then
    return({})
  else
    local l = {}
    local i = 0
    local _g61 = xs
    while (i < length(_g61)) do
      local x = _g61[(i + 1)]
      if (i == (length(xs) - 1)) then
        l = {"join", join({"list"}, l), x}
      else
        add(l, x)
      end
      i = (i + 1)
    end
    return(l)
  end
end, module = "lib", export = true, form = {"fn", "xs", {"if", {"empty?", "xs"}, {}, {"let", {"l", {}}, {"across", {"xs", "x", "i"}, {"if", {"=", "i", {"-", {"length", "xs"}, 1}}, {"set", "l", {"list", {"quote", "join"}, {"join", {"quote", {"list"}}, "l"}, "x"}}, {"add", "l", "x"}}}, "l"}}}}, escape = {module = "lib", variable = true}, ["with-bindings"] = {macro = function (_g62, ...)
  local names = _g62[1]
  local body = unstash({...})
  local _g63 = sub(body, 0)
  local x = make_id()
  return(join({"with-frame", {"across", {names, x}, (function ()
    local _g64 = {"setenv", x}
    _g64.variable = true
    return(_g64)
  end)()}}, _g63))
end, module = "lib", export = true, form = {"fn", (function ()
  local _g65 = {{"names"}}
  _g65.rest = "body"
  return(_g65)
end)(), {"let", {"x", {"make-id"}}, {"quasiquote", {"with-frame", {"across", {{"unquote", "names"}, {"unquote", "x"}}, (function ()
  local _g66 = {"setenv", {"unquote", "x"}}
  _g66.variable = true
  return(_g66)
end)()}, {"unquote-splicing", "body"}}}}}}, ["join*"] = {macro = function (...)
  local xs = unstash({...})
  return(reduce(function (a, b)
    return({"join", a, b})
  end, xs))
end, module = "lib", export = true, form = {"fn", "xs", {"reduce", {"fn", {"a", "b"}, {"list", {"quote", "join"}, "a", "b"}}, "xs"}}}, getenv = {export = true, module = "lib", variable = true}}}, boot = {import = {"lib", "compiler"}, toplevel = {}}, compiler = {import = {"reader", "lib", "compiler"}, toplevel = {terminator = {module = "compiler", variable = true}, _g162 = {module = "compiler", variable = true}, ["infix?"] = {module = "compiler", variable = true}, ["module-key"] = {module = "compiler", variable = true}, ["module-path"] = {module = "compiler", variable = true}, _g171 = {module = "compiler", variable = true}, ["compile-args"] = {module = "compiler", variable = true}, ["if"] = {tr = true, export = true, form = (function ()
  local _g67 = {"fn", {"form", "tail?"}, {"let", {"str", "\"\""}, {"across", {"form", "condition", "i"}, {"let", {"last?", {">=", "i", {"-", {"length", "form"}, 2}}, "else?", {"=", "i", {"-", {"length", "form"}, 1}}, "first?", {"=", "i", 0}, "body", {"at", "form", {"+", "i", 1}}}, {"if", "else?", {"do", {"set", "body", "condition"}, {"set", "condition", "nil"}}}, {"cat!", "str", {"compile-branch", "condition", "body", "first?", "last?", "tail?"}}}, {"inc", "i"}}, "str"}}
  _g67.stmt = true
  _g67.tr = true
  return(_g67)
end)(), stmt = true, module = "compiler", special = function (form, tail63)
  local str = ""
  local i = 0
  local _g68 = form
  while (i < length(_g68)) do
    local condition = _g68[(i + 1)]
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
end}, ["%global-function"] = {tr = true, export = true, form = (function ()
  local _g69 = {"fn", {(function ()
    local _g70 = {"name", "args"}
    _g70.rest = "body"
    return(_g70)
  end)()}, {"if", {"=", "target", {"quote", "lua"}}, (function ()
    local _g71 = {"compile-function", "args", "body"}
    _g71.name = "name"
    return(_g71)
  end)(), (function ()
    local _g72 = {"compile", {"quasiquote", {"set", {"unquote", "name"}, {"%function", {"unquote", "args"}, {"unquote-splicing", "body"}}}}}
    _g72["stmt?"] = true
    return(_g72)
  end)()}}
  _g69.stmt = true
  _g69.tr = true
  return(_g69)
end)(), stmt = true, module = "compiler", special = function (_g73)
  local name = _g73[1]
  local args = _g73[2]
  local body = sub(_g73, 2)
  if (target == "lua") then
    return(compile_function(args, body, {_stash = true, name = name}))
  else
    return(compile({"set", name, join({"%function", args}, body)}, {_stash = true, ["stmt?"] = true}))
  end
end}, ["compile-module"] = {export = true, module = "compiler", variable = true}, ["set"] = {export = true, form = (function ()
  local _g74 = {"fn", {{"lh", "rh"}}, {"if", {"nil?", "rh"}, {"error", "\"Missing right-hand side in assignment\""}}, {"cat", {"indentation"}, {"compile", "lh"}, "\" = \"", {"compile", "rh"}}}
  _g74.stmt = true
  return(_g74)
end)(), stmt = true, module = "compiler", special = function (_g75)
  local lh = _g75[1]
  local rh = _g75[2]
  if nil63(rh) then
    error("Missing right-hand side in assignment")
  end
  return((indentation() .. compile(lh) .. " = " .. compile(rh)))
end}, ["compiler-output"] = {export = true, module = "compiler", variable = true}, _g137 = {module = "compiler", variable = true}, _g158 = {module = "compiler", variable = true}, _g161 = {module = "compiler", variable = true}, ["quote-m0dules"] = {export = true, module = "compiler", variable = true}, ["compile-id"] = {module = "compiler", variable = true}, ["quote-environment"] = {export = true, module = "compiler", variable = true}, ["compile-toplevel"] = {export = true, module = "compiler", variable = true}, _g163 = {module = "compiler", variable = true}, ["%local"] = {export = true, form = (function ()
  local _g76 = {"fn", {{"name", "value"}}, {"let", {"id", {"compile", "name"}, "value", {"compile", "value"}, "keyword", {"if", {"=", "target", {"quote", "js"}}, "\"var \"", "\"local \""}, "ind", {"indentation"}}, {"cat", "ind", "keyword", "id", "\" = \"", "value"}}}
  _g76.stmt = true
  return(_g76)
end)(), stmt = true, module = "compiler", special = function (_g77)
  local name = _g77[1]
  local value = _g77[2]
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
end}, ["numeric?"] = {module = "compiler", variable = true}, ["compile-file"] = {module = "compiler", variable = true}, ["in-module"] = {export = true, module = "compiler", variable = true}, _g134 = {module = "compiler", variable = true}, ["compile-body"] = {module = "compiler", variable = true}, ["quote-binding"] = {module = "compiler", variable = true}, _g159 = {module = "compiler", variable = true}, ["with-indent"] = {macro = function (form)
  local result = make_id()
  return({"do", {"inc", "indent-level"}, {"let", {result, form}, {"dec", "indent-level"}, result}})
end, module = "compiler", export = true, form = {"fn", {"form"}, {"let", {"result", {"make-id"}}, {"quasiquote", {"do", {"inc", "indent-level"}, {"let", {{"unquote", "result"}, {"unquote", "form"}}, {"dec", "indent-level"}, {"unquote", "result"}}}}}}}, ["%array"] = {export = true, module = "compiler", special = function (forms)
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
  local _g78 = forms
  while (i < length(_g78)) do
    local x = _g78[(i + 1)]
    str = (str .. compile(x))
    if (i < (length(forms) - 1)) then
      str = (str .. ", ")
    end
    i = (i + 1)
  end
  return((open .. str .. close))
end, form = {"fn", {"forms"}, {"let", {"open", {"if", {"=", "target", {"quote", "lua"}}, "\"{\"", "\"[\""}, "close", {"if", {"=", "target", {"quote", "lua"}}, "\"}\"", "\"]\""}, "str", "\"\""}, {"across", {"forms", "x", "i"}, {"cat!", "str", {"compile", "x"}}, {"if", {"<", "i", {"-", {"length", "forms"}, 1}}, {"cat!", "str", "\", \""}}}, {"cat", "open", "str", "close"}}}}, module = {module = "compiler", variable = true}, ["error"] = {export = true, form = (function ()
  local _g79 = {"fn", {{"x"}}, {"let", {"e", {"if", {"=", "target", {"quote", "js"}}, {"cat", "\"throw \"", {"compile", "x"}}, {"compile-call", {"quasiquote", {"error", {"unquote", "x"}}}}}}, {"cat", {"indentation"}, "e"}}}
  _g79.stmt = true
  return(_g79)
end)(), stmt = true, module = "compiler", special = function (_g80)
  local x = _g80[1]
  local e = (function ()
    if (target == "js") then
      return(("throw " .. compile(x)))
    else
      return(compile_call({"error", x}))
    end
  end)()
  return((indentation() .. e))
end}, ["initial-environment"] = {module = "compiler", variable = true}, _g154 = {module = "compiler", variable = true}, ["%local-function"] = {tr = true, export = true, form = (function ()
  local _g81 = {"fn", {(function ()
    local _g82 = {"name", "args"}
    _g82.rest = "body"
    return(_g82)
  end)()}, (function ()
    local _g83 = {"compile-function", "args", "body"}
    _g83.prefix = "\"local \""
    _g83.name = "name"
    return(_g83)
  end)()}
  _g81.stmt = true
  _g81.tr = true
  return(_g81)
end)(), stmt = true, module = "compiler", special = function (_g84)
  local name = _g84[1]
  local args = _g84[2]
  local body = sub(_g84, 2)
  return(compile_function(args, body, {_stash = true, prefix = "local ", name = name}))
end}, ["compile-branch"] = {module = "compiler", variable = true}, _g187 = {module = "compiler", variable = true}, ["compile-special"] = {module = "compiler", variable = true}, ["compile-call"] = {module = "compiler", variable = true}, eval = {export = true, module = "compiler", variable = true}, run = {module = "compiler", variable = true}, ["compile-infix"] = {module = "compiler", variable = true}, ["return"] = {export = true, form = (function ()
  local _g85 = {"fn", {{"x"}}, {"let", {"x", {"if", {"nil?", "x"}, "\"return\"", {"compile-call", {"quasiquote", {"return", {"unquote", "x"}}}}}}, {"cat", {"indentation"}, "x"}}}
  _g85.stmt = true
  return(_g85)
end)(), stmt = true, module = "compiler", special = function (_g86)
  local x = _g86[1]
  local x = (function ()
    if nil63(x) then
      return("return")
    else
      return(compile_call({"return", x}))
    end
  end)()
  return((indentation() .. x))
end}, ["while"] = {tr = true, export = true, form = (function ()
  local _g87 = {"fn", {(function ()
    local _g88 = {"condition"}
    _g88.rest = "body"
    return(_g88)
  end)()}, {"let", {"condition", {"compile", "condition"}, "body", {"with-indent", {"compile-body", "body"}}, "ind", {"indentation"}}, {"if", {"=", "target", {"quote", "js"}}, {"cat", "ind", "\"while (\"", "condition", "\") {\\n\"", "body", "ind", "\"}\\n\""}, {"cat", "ind", "\"while \"", "condition", "\" do\\n\"", "body", "ind", "\"end\\n\""}}}}
  _g87.stmt = true
  _g87.tr = true
  return(_g87)
end)(), stmt = true, module = "compiler", special = function (_g89)
  local condition = _g89[1]
  local body = sub(_g89, 1)
  local condition = compile(condition)
  local body = (function ()
    indent_level = (indent_level + 1)
    local _g90 = compile_body(body)
    indent_level = (indent_level - 1)
    return(_g90)
  end)()
  local ind = indentation()
  if (target == "js") then
    return((ind .. "while (" .. condition .. ") {\n" .. body .. ind .. "}\n"))
  else
    return((ind .. "while " .. condition .. " do\n" .. body .. ind .. "end\n"))
  end
end}, _g151 = {module = "compiler", variable = true}, _g167 = {module = "compiler", variable = true}, _g165 = {module = "compiler", variable = true}, _g149 = {module = "compiler", variable = true}, ["open-module"] = {export = true, module = "compiler", variable = true}, ["%object"] = {export = true, module = "compiler", special = function (forms)
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
  local _g91 = pairs
  while (i < length(_g91)) do
    local _g92 = _g91[(i + 1)]
    local k = _g92[1]
    local v = _g92[2]
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
end, form = {"fn", {"forms"}, {"let", {"str", "\"{\"", "sep", {"if", {"=", "target", {"quote", "lua"}}, "\" = \"", "\": \""}, "pairs", {"pairwise", "forms"}}, {"across", {"pairs", {"k", "v"}, "i"}, {"if", {"not", {"string?", "k"}}, {"error", {"cat", "\"Illegal key: \"", {"to-string", "k"}}}}, {"let", {"v", {"compile", "v"}, "k", {"if", {"valid-id?", "k"}, "k", {"and", {"=", "target", {"quote", "js"}}, {"string-literal?", "k"}}, "k", {"=", "target", {"quote", "js"}}, {"quoted", "k"}, {"string-literal?", "k"}, {"cat", "\"[\"", "k", "\"]\""}, {"cat", "\"[\"", {"quoted", "k"}, "\"]\""}}}, {"cat!", "str", "k", "sep", "v"}}, {"if", {"<", "i", {"-", {"length", "pairs"}, 1}}, {"cat!", "str", "\", \""}}}, {"cat", "str", "\"}\""}}}}, ["not"] = {export = true, module = "compiler", special = function (_g93)
  local x = _g93[1]
  local x = compile(x)
  local open = (function ()
    if (target == "js") then
      return("!(")
    else
      return("(not ")
    end
  end)()
  return((open .. x .. ")"))
end, form = {"fn", {{"x"}}, {"let", {"x", {"compile", "x"}, "open", {"if", {"=", "target", {"quote", "js"}}, "\"!(\"", "\"(not \""}}, {"cat", "open", "x", "\")\""}}}}, ["compilation-level"] = {module = "compiler", variable = true}, _g157 = {module = "compiler", variable = true}, ["open-m0dule"] = {export = true, module = "compiler", variable = true}, _g135 = {module = "compiler", variable = true}, _g184 = {module = "compiler", variable = true}, ["%for"] = {tr = true, export = true, form = (function ()
  local _g94 = {"fn", {(function ()
    local _g95 = {{"t", "k"}}
    _g95.rest = "body"
    return(_g95)
  end)()}, {"let", {"t", {"compile", "t"}, "ind", {"indentation"}, "body", {"with-indent", {"compile-body", "body"}}}, {"if", {"=", "target", {"quote", "lua"}}, {"cat", "ind", "\"for \"", "k", "\" in next, \"", "t", "\" do\\n\"", "body", "ind", "\"end\\n\""}, {"cat", "ind", "\"for (\"", "k", "\" in \"", "t", "\") {\\n\"", "body", "ind", "\"}\\n\""}}}}
  _g94.stmt = true
  _g94.tr = true
  return(_g94)
end)(), stmt = true, module = "compiler", special = function (_g96)
  local _g97 = _g96[1]
  local t = _g97[1]
  local k = _g97[2]
  local body = sub(_g96, 1)
  local t = compile(t)
  local ind = indentation()
  local body = (function ()
    indent_level = (indent_level + 1)
    local _g98 = compile_body(body)
    indent_level = (indent_level - 1)
    return(_g98)
  end)()
  if (target == "lua") then
    return((ind .. "for " .. k .. " in next, " .. t .. " do\n" .. body .. ind .. "end\n"))
  else
    return((ind .. "for (" .. k .. " in " .. t .. ") {\n" .. body .. ind .. "}\n"))
  end
end}, _g152 = {module = "compiler", variable = true}, ["%try"] = {tr = true, export = true, form = (function ()
  local _g99 = {"fn", {"forms"}, {"let", {"ind", {"indentation"}, "body", {"with-indent", (function ()
    local _g100 = {"compile-body", "forms"}
    _g100["tail?"] = true
    return(_g100)
  end)()}, "e", {"make-id"}, "handler", {"quasiquote", {"return", {"%array", false, {"unquote", "e"}}}}, "h", {"with-indent", (function ()
    local _g101 = {"compile", "handler"}
    _g101["stmt?"] = true
    return(_g101)
  end)()}}, {"cat", "ind", "\"try {\\n\"", "body", "ind", "\"}\\n\"", "ind", "\"catch (\"", "e", "\") {\\n\"", "h", "ind", "\"}\\n\""}}}
  _g99.stmt = true
  _g99.tr = true
  return(_g99)
end)(), stmt = true, module = "compiler", special = function (forms)
  local ind = indentation()
  local body = (function ()
    indent_level = (indent_level + 1)
    local _g102 = compile_body(forms, {_stash = true, ["tail?"] = true})
    indent_level = (indent_level - 1)
    return(_g102)
  end)()
  local e = make_id()
  local handler = {"return", {"%array", false, e}}
  local h = (function ()
    indent_level = (indent_level + 1)
    local _g103 = compile(handler, {_stash = true, ["stmt?"] = true})
    indent_level = (indent_level - 1)
    return(_g103)
  end)()
  return((ind .. "try {\n" .. body .. ind .. "}\n" .. ind .. "catch (" .. e .. ") {\n" .. h .. ind .. "}\n"))
end}, infix = {module = "compiler", variable = true}, _g145 = {module = "compiler", variable = true}, ["valid-id?"] = {module = "compiler", variable = true}, ["%compile-module"] = {module = "compiler", variable = true}, ["indent-level"] = {module = "compiler", variable = true}, _g141 = {module = "compiler", variable = true}, ["load-module"] = {export = true, module = "compiler", variable = true}, ["do"] = {tr = true, export = true, form = (function ()
  local _g104 = {"fn", {"forms", "tail?"}, (function ()
    local _g105 = {"compile-body", "forms"}
    _g105["tail?"] = "tail?"
    return(_g105)
  end)()}
  _g104.stmt = true
  _g104.tr = true
  return(_g104)
end)(), stmt = true, module = "compiler", special = function (forms, tail63)
  return(compile_body(forms, {_stash = true, ["tail?"] = tail63}))
end}, _g146 = {module = "compiler", variable = true}, ["%function"] = {export = true, module = "compiler", special = function (_g106)
  local args = _g106[1]
  local body = sub(_g106, 1)
  return(compile_function(args, body))
end, form = {"fn", {(function ()
  local _g107 = {"args"}
  _g107.rest = "body"
  return(_g107)
end)()}, {"compile-function", "args", "body"}}}, ["valid-char?"] = {module = "compiler", variable = true}, ["current-module"] = {export = true, module = "compiler", variable = true}, ["break"] = {export = true, form = (function ()
  local _g108 = {"fn", {"_g122"}, {"cat", {"indentation"}, "\"break\""}}
  _g108.stmt = true
  return(_g108)
end)(), stmt = true, module = "compiler", special = function (_g122)
  return((indentation() .. "break"))
end}, ["compile-atom"] = {module = "compiler", variable = true}, _g140 = {module = "compiler", variable = true}, compile = {export = true, module = "compiler", variable = true}, _g150 = {module = "compiler", variable = true}, ["get"] = {export = true, module = "compiler", special = function (_g109)
  local t = _g109[1]
  local k = _g109[2]
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
end, form = {"fn", {{"t", "k"}}, {"let", {"t", {"compile", "t"}, "k1", {"compile", "k"}}, {"if", {"and", {"=", "target", {"quote", "lua"}}, {"=", {"char", "t", 0}, "\"{\""}}, {"set", "t", {"cat", "\"(\"", "t", "\")\""}}}, {"if", {"and", {"string-literal?", "k"}, {"valid-id?", {"inner", "k"}}}, {"cat", "t", "\".\"", {"inner", "k"}}, {"cat", "t", "\"[\"", "k1", "\"]\""}}}}}, _g156 = {module = "compiler", variable = true}, ["compile-function"] = {module = "compiler", variable = true}, indentation = {module = "compiler", variable = true}, ["quote-module"] = {module = "compiler", variable = true}, ["quote-modules"] = {export = true, module = "compiler", variable = true}, ["can-return?"] = {module = "compiler", variable = true}, getop = {module = "compiler", variable = true}, _g186 = {module = "compiler", variable = true}, ["quote-frame"] = {module = "compiler", variable = true}, ["define-module"] = {macro = function (spec, ...)
  local body = unstash({...})
  local _g110 = sub(body, 0)
  local imp = _g110.import
  local exp = _g110.export
  map(load_module, imp)
  modules[module_key(spec)] = {import = imp, toplevel = {}}
  local _g112 = 0
  local _g111 = (exp or {})
  while (_g112 < length(_g111)) do
    local k = _g111[(_g112 + 1)]
    setenv(k, {_stash = true, export = true})
    _g112 = (_g112 + 1)
  end
  return(nil)
end, module = "compiler", export = true, form = {"fn", (function ()
  local _g113 = {"spec"}
  _g113.rest = "body"
  return(_g113)
end)(), {"let", {(function ()
  local _g114 = {}
  _g114.import = "imp"
  _g114.export = "exp"
  return(_g114)
end)(), "body"}, {"map", "load-module", "imp"}, {"set", {"get", "modules", {"module-key", "spec"}}, (function ()
  local _g115 = {"table"}
  _g115.import = "imp"
  _g115.toplevel = {"table"}
  return(_g115)
end)()}, {"across", {{"or", "exp", {}}, "k"}, (function ()
  local _g116 = {"setenv", "k"}
  _g116.export = true
  return(_g116)
end)()}}, "nil"}}, _g169 = {module = "compiler", variable = true}, _g185 = {module = "compiler", variable = true}}}}
environment = {{["define-module"] = {macro = function (spec, ...)
  local body = unstash({...})
  local _g117 = sub(body, 0)
  local imp = _g117.import
  local exp = _g117.export
  map(load_module, imp)
  modules[module_key(spec)] = {import = imp, toplevel = {}}
  local _g119 = 0
  local _g118 = (exp or {})
  while (_g119 < length(_g118)) do
    local k = _g118[(_g119 + 1)]
    setenv(k, {_stash = true, export = true})
    _g119 = (_g119 + 1)
  end
  return(nil)
end, module = "compiler", export = true, form = {"fn", (function ()
  local _g120 = {"spec"}
  _g120.rest = "body"
  return(_g120)
end)(), {"let", {(function ()
  local _g121 = {}
  _g121.import = "imp"
  _g121.export = "exp"
  return(_g121)
end)(), "body"}, {"map", "load-module", "imp"}, {"set", {"get", "modules", {"module-key", "spec"}}, (function ()
  local _g122 = {"table"}
  _g122.import = "imp"
  _g122.toplevel = {"table"}
  return(_g122)
end)()}, {"across", {{"or", "exp", {}}, "k"}, (function ()
  local _g123 = {"setenv", "k"}
  _g123.export = true
  return(_g123)
end)()}}, "nil"}}}}
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
function setenv(k, ...)
  local keys = unstash({...})
  local _g131 = sub(keys, 0)
  if string63(k) then
    local frame = last(environment)
    local x = (frame[k] or {})
    local k1 = nil
    local _g132 = _g131
    for k1 in next, _g132 do
      if (not number63(k1)) then
        local v = _g132[k1]
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
    local _g184 = args
    for k in next, _g184 do
      if (not number63(k)) then
        local v = _g184[k]
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
    local _g185 = args
    for k in next, _g185 do
      if (not number63(k)) then
        local v = _g185[k]
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
      local _g186 = l
      for k in next, _g186 do
        if (not number63(k)) then
          local v = _g186[k]
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
    local _g188 = 0
    local _g187 = args
    while (_g188 < length(_g187)) do
      local arg = _g187[(_g188 + 1)]
      if atom63(arg) then
        add(args1, arg)
      elseif (list63(arg) or keys63(arg)) then
        local v = make_id()
        add(args1, v)
        bs = join(bs, {arg, v})
      end
      _g188 = (_g188 + 1)
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
    local _g189 = lh
    while (i < length(_g189)) do
      local x = _g189[(i + 1)]
      bs = join(bs, bind(x, {"at", rh, i}))
      i = (i + 1)
    end
    if r then
      bs = join(bs, bind(r, {"sub", rh, length(lh)}))
    end
    local k = nil
    local _g190 = lh
    for k in next, _g190 do
      if (not number63(k)) then
        local v = _g190[k]
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
      local _g128 = form[1]
      local _g191 = form[2]
      local t = _g191[1]
      local k = _g191[2]
      local body = sub(form, 2)
      return(join({"%for", {macroexpand(t), macroexpand(k)}}, macroexpand(body)))
    elseif (x == "%function") then
      local _g129 = form[1]
      local args = form[2]
      local _g192 = sub(form, 2)
      add(environment, {})
      local _g194 = (function ()
        local _g196 = 0
        local _g195 = args
        while (_g196 < length(_g195)) do
          local _g193 = _g195[(_g196 + 1)]
          setenv(_g193, {_stash = true, variable = true})
          _g196 = (_g196 + 1)
        end
        return(join({"%function", map42(macroexpand, args)}, macroexpand(_g192)))
      end)()
      drop(environment)
      return(_g194)
    elseif ((x == "%local-function") or (x == "%global-function")) then
      local _g130 = form[1]
      local name = form[2]
      local _g197 = form[3]
      local _g198 = sub(form, 3)
      add(environment, {})
      local _g200 = (function ()
        local _g202 = 0
        local _g201 = _g197
        while (_g202 < length(_g201)) do
          local _g199 = _g201[(_g202 + 1)]
          setenv(_g199, {_stash = true, variable = true})
          _g202 = (_g202 + 1)
        end
        return(join({x, name, map42(macroexpand, _g197)}, macroexpand(_g198)))
      end)()
      drop(environment)
      return(_g200)
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
  local _g203 = form
  for k in next, _g203 do
    if (not number63(k)) then
      local v = _g203[k]
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
  local _g205 = 0
  local _g204 = form
  while (_g205 < length(_g204)) do
    local x = _g204[(_g205 + 1)]
    if quasisplice63(x, depth) then
      local x = quasiexpand(x[2])
      add(xs, x)
      add(xs, {"list"})
    else
      add(last(xs), quasiexpand(x, depth))
    end
    _g205 = (_g205 + 1)
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
  local _g206 = (upto or length(l))
  local l2 = {}
  while (i < _g206) do
    l2[(j + 1)] = l[(i + 1)]
    i = (i + 1)
    j = (j + 1)
  end
  return(l2)
end
function sub(x, from, upto)
  local _g207 = (from or 0)
  if string63(x) then
    return(substring(x, _g207, upto))
  else
    local l = sublist(x, _g207, upto)
    local k = nil
    local _g208 = x
    for k in next, _g208 do
      if (not number63(k)) then
        local v = _g208[k]
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
    local _g209 = l1
    for k in next, _g209 do
      if (not number63(k)) then
        local v = _g209[k]
        l[k] = v
      end
    end
    local _g211 = nil
    local _g210 = l2
    for _g211 in next, _g210 do
      if (not number63(_g211)) then
        local v = _g210[_g211]
        l[_g211] = v
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
  local _g213 = 0
  local _g212 = l
  while (_g213 < length(_g212)) do
    local x = _g212[(_g213 + 1)]
    if f(x) then
      add(l1, x)
    end
    _g213 = (_g213 + 1)
  end
  return(l1)
end
function find(f, l)
  local _g215 = 0
  local _g214 = l
  while (_g215 < length(_g214)) do
    local x = _g214[(_g215 + 1)]
    local x = f(x)
    if x then
      return(x)
    end
    _g215 = (_g215 + 1)
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
  local _g225 = 0
  local _g224 = l
  while (_g225 < length(_g224)) do
    local x = _g224[(_g225 + 1)]
    local x1 = f(x)
    local s = splice63(x1)
    if list63(s) then
      l1 = join(l1, s)
    elseif is63(s) then
      add(l1, s)
    elseif is63(x1) then
      add(l1, x1)
    end
    _g225 = (_g225 + 1)
  end
  return(l1)
end
function map42(f, t)
  local l = map(f, t)
  local k = nil
  local _g226 = t
  for k in next, _g226 do
    if (not number63(k)) then
      local v = _g226[k]
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
  local _g227 = t
  for k in next, _g227 do
    if (not number63(k)) then
      local v = _g227[k]
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
  local _g228 = t
  for k in next, _g228 do
    if (not number63(k)) then
      local v = _g228[k]
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
  local _g229 = t
  for k in next, _g229 do
    if (not number63(k)) then
      local v = _g229[k]
      k63 = true
      break
    end
  end
  return(k63)
end
function extend(t, ...)
  local xs = unstash({...})
  local _g230 = sub(xs, 0)
  return(join(t, _g230))
end
function exclude(t, ...)
  local keys = unstash({...})
  local _g231 = sub(keys, 0)
  local t1 = sublist(t)
  local k = nil
  local _g232 = t
  for k in next, _g232 do
    if (not number63(k)) then
      local v = _g232[k]
      if (not _g231[k]) then
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
  local _g233 = (function ()
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
  local _g234 = sub(xs, 0)
  if empty63(_g234) then
    return("")
  else
    return(reduce(function (a, b)
      return((a .. b))
    end, _g234))
  end
end
function _43(...)
  local xs = unstash({...})
  local _g237 = sub(xs, 0)
  return(reduce(function (a, b)
    return((a + b))
  end, _g237))
end
function _(...)
  local xs = unstash({...})
  local _g238 = sub(xs, 0)
  return(reduce(function (a, b)
    return((b - a))
  end, reverse(_g238)))
end
function _42(...)
  local xs = unstash({...})
  local _g239 = sub(xs, 0)
  return(reduce(function (a, b)
    return((a * b))
  end, _g239))
end
function _47(...)
  local xs = unstash({...})
  local _g240 = sub(xs, 0)
  return(reduce(function (a, b)
    return((b / a))
  end, reverse(_g240)))
end
function _37(...)
  local xs = unstash({...})
  local _g241 = sub(xs, 0)
  return(reduce(function (a, b)
    return((b % a))
  end, reverse(_g241)))
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
    local _g242 = x
    for k in next, _g242 do
      if (not number63(k)) then
        local v = _g242[k]
        add(x1, (k .. ":"))
        add(x1, v)
      end
    end
    local i = 0
    local _g243 = x1
    while (i < length(_g243)) do
      local y = _g243[(i + 1)]
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
  local _g244 = stash(args)
  return(f(unpack(_g244)))
end
id_count = 0
function make_id()
  id_count = (id_count + 1)
  return(("_g" .. id_count))
end
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
  local _g248 = args
  while (i < length(_g248)) do
    local arg = _g248[(i + 1)]
    str = (str .. compile(arg))
    if (i < (length(args) - 1)) then
      str = (str .. ", ")
    end
    i = (i + 1)
  end
  return((str .. ")"))
end
function compile_body(forms, ...)
  local _g249 = unstash({...})
  local tail63 = _g249["tail?"]
  local str = ""
  local i = 0
  local _g250 = forms
  while (i < length(_g250)) do
    local x = _g250[(i + 1)]
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
function compile_infix(_g251)
  local op = _g251[1]
  local args = sub(_g251, 1)
  local str = "("
  local op = getop(op)
  local i = 0
  local _g252 = args
  while (i < length(_g252)) do
    local arg = _g252[(i + 1)]
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
  local _g253 = (function ()
    indent_level = (indent_level + 1)
    local _g254 = compile(body, {_stash = true, ["stmt?"] = true, ["tail?"] = tail63})
    indent_level = (indent_level - 1)
    return(_g254)
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
    return((ind .. "if (" .. cond1 .. ") {\n" .. _g253 .. ind .. "}" .. tr))
  elseif first63 then
    return((ind .. "if " .. cond1 .. " then\n" .. _g253 .. tr))
  elseif (nil63(condition) and (target == "js")) then
    return((" else {\n" .. _g253 .. ind .. "}\n"))
  elseif nil63(condition) then
    return((ind .. "else\n" .. _g253 .. tr))
  elseif (target == "js") then
    return((" else if (" .. cond1 .. ") {\n" .. _g253 .. ind .. "}" .. tr))
  else
    return((ind .. "elseif " .. cond1 .. " then\n" .. _g253 .. tr))
  end
end
function compile_function(args, body, ...)
  local _g255 = unstash({...})
  local name = _g255.name
  local prefix = _g255.prefix
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
    local _g256 = compile_body(body, {_stash = true, ["tail?"] = true})
    indent_level = (indent_level - 1)
    return(_g256)
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
  local _g257 = getenv(hd(form))
  local special = _g257.special
  local stmt = _g257.stmt
  local self_tr63 = _g257.tr
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
  local _g301 = unstash({...})
  local stmt63 = _g301["stmt?"]
  local tail63 = _g301["tail?"]
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
compiler_output = nil
compilation_level = nil
function compile_file(file)
  local str = read_file(file)
  local body = read_all(make_stream(str))
  local form = join({"do"}, body)
  return(compile_toplevel(form))
end
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
  local _g302 = toplevel
  for name in next, _g302 do
    if (not number63(name)) then
      local binding = _g302[name]
      if (binding.module == k) then
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
  local _g303 = m.toplevel
  for k in next, _g303 do
    if (not number63(k)) then
      local v = _g303[k]
      if v.export then
        frame[k] = v
      end
    end
  end
end
function in_module(spec)
  load_module(spec)
  local m = module(spec)
  local frame = last(environment)
  local k = nil
  local _g304 = m.toplevel
  for k in next, _g304 do
    if (not number63(k)) then
      local v = _g304[k]
      frame[k] = v
    end
  end
  return(map(open_module, m.import))
end
function compile_module(spec)
  compilation_level = 0
  compiler_output = ""
  return(load_module(spec))
end
function quote_binding(b)
  b = extend(b, {_stash = true, module = {"quote", b.module}})
  if is63(b.symbol) then
    return(extend(b, {_stash = true, symbol = {"quote", b.symbol}}))
  elseif (b.macro and b.form) then
    return(extend(b, {_stash = true, macro = b.form, form = {"quote", b.form}}))
  elseif (b.special and b.form) then
    return(extend(b, {_stash = true, special = b.form, form = {"quote", b.form}}))
  elseif is63(b.variable) then
    return(b)
  end
end
function quote_frame(t)
  return(join({"%object"}, mapo(function (_g247, b)
    return(join({"table"}, quote_binding(b)))
  end, t)))
end
function quote_environment(env)
  return(join({"list"}, map(quote_frame, env)))
end
function quote_module(m)
  local _g312 = {"table"}
  _g312.import = quoted(m.import)
  _g312.toplevel = quote_frame(m.toplevel)
  return(_g312)
end
function quote_modules()
  return(join({"table"}, map42(quote_module, modules)))
end
function rep(str)
  local _g313 = (function ()
    local _g314,_g315 = xpcall(function ()
      return(eval(read_from_string(str)))
    end, message_handler)
    return({_g314, _g315})
  end)()
  local _g1 = _g313[1]
  local x = _g313[2]
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
  local _g316 = args
  while (i < length(_g316)) do
    local arg = _g316[(i + 1)]
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
