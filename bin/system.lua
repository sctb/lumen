local function call_with_file(f, path, mode)
  local h,e = io.open(path, mode)
  if not h then
    error(e)
  end
  local _x = f(h)
  h.close(h)
  return(_x)
end
local function read_file(path)
  return(call_with_file(function (f)
    return(f.read(f, "*a"))
  end, path))
end
local function write_file(path, data)
  return(call_with_file(function (f)
    return(f.write(f, data))
  end, path, "w"))
end
local function file_exists63(path)
  local _f = io.open(path)
  local _id = is63(_f)
  local _e
  if _id then
    local _r6 = is63(_f.read(_f, 0)) or 0 == _f.seek(_f, "end")
    _f.close(_f)
    _e = _r6
  else
    _e = _id
  end
  return(_e)
end
local function directory_exists63(path)
  local _f1 = io.open(path)
  local _id1 = is63(_f1)
  local _e1
  if _id1 then
    local _r8 = not _f1.read(_f1, 0) and not( 0 == _f1.seek(_f1, "end"))
    _f1.close(_f1)
    _e1 = _r8
  else
    _e1 = _id1
  end
  return(_e1)
end
local path_separator = char(_G.package.config, 0)
local function path_join(...)
  local _parts = unstash({...})
  return(reduce(function (x, y)
    return(x .. path_separator .. y)
  end, _parts) or "")
end
local function get_environment_variable(name)
  return(os.getenv(name))
end
local function write(x)
  return(io.write(x))
end
local function exit(code)
  return(os.exit(code))
end
local argv = arg
local function reload(module)
  package.loaded[module] = nil
  return(require(module))
end
local function run(command)
  local _f2 = io.popen(command)
  local _x2 = _f2.read(_f2, "*all")
  _f2.close(_f2)
  return(_x2)
end
return({["read-file"] = read_file, ["write-file"] = write_file, ["file-exists?"] = file_exists63, ["directory-exists?"] = directory_exists63, ["path-separator"] = path_separator, ["path-join"] = path_join, ["get-environment-variable"] = get_environment_variable, write = write, exit = exit, argv = argv, reload = reload, run = run})
