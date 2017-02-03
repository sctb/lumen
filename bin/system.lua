local function call_with_file(f, path, mode)
  local h,e = io.open(path, mode)
  if not h then
    error(e)
  end
  local x = f(h)
  h.close(h)
  return(x)
end
local function read_file(path)
  local _e
  if path == "-" then
    _e = "/dev/stdin"
  else
    _e = path
  end
  local _path = _e
  return(call_with_file(function (f)
    return(f.read(f, "*a"))
  end, _path))
end
local function write_file(path, data)
  local _e1
  if path == "-" then
    _e1 = "/dev/stdout"
  else
    _e1 = path
  end
  local _path1 = _e1
  return(call_with_file(function (f)
    return(f.write(f, data))
  end, _path1, "w"))
end
local function file_exists63(path)
  local _id = path == "-"
  local _e3
  if _id then
    _e3 = _id
  else
    local f = io.open(path)
    local _e4
    if f then
      _e4 = f.close(f)
    end
    _e3 = is63(f)
  end
  return(_e3)
end
local path_separator = char(_G.package.config, 0)
local function path_join(...)
  local parts = unstash({...})
  return(reduce(function (x, y)
    return(x .. path_separator .. y)
  end, parts) or "")
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
  local f = io.popen(command)
  local x = f.read(f, "*all")
  f.close(f)
  return(x)
end
local function tty63(fd)
  local _e5
  if fd == "stdin" then
    _e5 = 0
  else
    local _e6
    if fd == "stdout" then
      _e6 = 1
    else
      local _e7
      if fd == "stderr" then
        _e7 = 2
      else
        _e7 = fd
      end
      _e6 = _e7
    end
    _e5 = _e6
  end
  local _fd = _e5
  return("1" == run("[ -t " .. _fd .. " ] && printf 1 || exit 0"))
end
return({["read-file"] = read_file, reload = reload, ["file-exists?"] = file_exists63, exit = exit, ["write-file"] = write_file, ["path-join"] = path_join, write = write, ["path-separator"] = path_separator, run = run, ["tty?"] = tty63, argv = argv, ["get-environment-variable"] = get_environment_variable})
