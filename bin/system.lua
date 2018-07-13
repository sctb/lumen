local function callWithFile(f, path, mode)
  local h,e = io.open(path, mode)
  if not h then
    error(e)
  end
  local __x = f(h)
  h.close(h)
  return __x
end
local function readFile(path)
  return callWithFile(function (f)
    return f.read(f, "*a")
  end, path)
end
local function writeFile(path, data)
  return callWithFile(function (f)
    return f.write(f, data)
  end, path, "w")
end
local function fileExists63(path)
  local __f = io.open(path)
  local __id = is63(__f)
  local __e
  if __id then
    local __r6 = is63(__f.read(__f, 0)) or 0 == __f.seek(__f, "end")
    __f.close(__f)
    __e = __r6
  else
    __e = __id
  end
  return __e
end
local function directoryExists63(path)
  local __f1 = io.open(path)
  local __id1 = is63(__f1)
  local __e1
  if __id1 then
    local __r8 = not __f1.read(__f1, 0) and not( 0 == __f1.seek(__f1, "end"))
    __f1.close(__f1)
    __e1 = __r8
  else
    __e1 = __id1
  end
  return __e1
end
local pathSeparator = char(_G.package.config, 0)
local function pathJoin(...)
  local __parts = unstash({...})
  return reduce(function (x, y)
    return x .. pathSeparator .. y
  end, __parts) or ""
end
local function getEnvironmentVariable(name)
  return os.getenv(name)
end
local function write(x)
  return io.write(x)
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
  local __x2 = __f2.read(__f2, "*all")
  __f2.close(__f2)
  return __x2
end
return {readFile = readFile, writeFile = writeFile, fileExists63 = fileExists63, directoryExists63 = directoryExists63, pathSeparator = pathSeparator, pathJoin = pathJoin, getEnvironmentVariable = getEnvironmentVariable, write = write, exit = exit, argv = argv, reload = reload, run = run}
