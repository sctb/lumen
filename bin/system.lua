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
  local f = io.open(path)
  if f then
    f.close(f)
  end
  return(is63(f))
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
return({["file-exists?"] = file_exists63, ["read-file"] = read_file, write = write, ["path-join"] = path_join, ["get-environment-variable"] = get_environment_variable, ["path-separator"] = path_separator, ["write-file"] = write_file, exit = exit, argv = argv})
