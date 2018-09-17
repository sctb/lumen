local function call_with_file(f, path, mode)
  local ____id = {io.open(path, mode)}
  local __h = ____id[1]
  local __e = ____id[2]
  if not __h then
    error(__e)
  end
  local __x1 = f(__h)
  __h.close(__h)
  return __x1
end
local function read_file(path)
  return call_with_file(function (f)
    return f.read(f, "*a")
  end, path)
end
local function write_file(path, data)
  return call_with_file(function (f)
    return f.write(f, data)
  end, path, "w")
end
local function file_exists63(path)
  local __f = io.open(path)
  local __id1 = is63(__f)
  local __e1 = nil
  if __id1 then
    local __r6 = is63(__f.read(__f, 0)) or 0 == __f.seek(__f, "end")
    __f.close(__f)
    __e1 = __r6
  else
    __e1 = __id1
  end
  return __e1
end
local function directory_exists63(path)
  local __f1 = io.open(path)
  local __id2 = is63(__f1)
  local __e2 = nil
  if __id2 then
    local __r8 = not __f1.read(__f1, 0) and not( 0 == __f1.seek(__f1, "end"))
    __f1.close(__f1)
    __e2 = __r8
  else
    __e2 = __id2
  end
  return __e2
end
local path_separator = char(_G.package.config, 0)
local function path_join(...)
  local __parts = unstash({...})
  return reduce(function (x, y)
    return x .. path_separator .. y
  end, __parts) or ""
end
local function get_environment_variable(name)
  return os.getenv(name)
end
local function stdout()
  return io.stdout
end
local function stderr()
  return io.stderr
end
local function write(x, out)
  local __out = out or stdout()
  __out.write(__out, x)
  return nil
end
local function exit(code)
  return os.exit(code)
end
local argv = arg
local function reload(module)
  package.loaded[module] = nil
  return require(module)
end
local function run(command)
  local __f2 = io.popen(command)
  local __x3 = __f2.read(__f2, "*all")
  __f2.close(__f2)
  return __x3
end
return {["read-file"] = read_file, ["write-file"] = write_file, ["file-exists?"] = file_exists63, ["directory-exists?"] = directory_exists63, ["path-separator"] = path_separator, ["path-join"] = path_join, ["get-environment-variable"] = get_environment_variable, stdout = stdout, stderr = stderr, write = write, exit = exit, argv = argv, reload = reload, run = run}
