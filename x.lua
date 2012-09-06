delimiters = {["("]=true, [")"]=true, [";"]=true, ["\n"]=true}
whitespace = {[" "]=true, ["\t"]=true, ["\n"]=true}

function make_stream (str)
  return { pos=1, string=str, len=string.len(str) }
end

function peek_char (s)
  if s.pos <= s.len then
    return string.sub(s.string, s.pos, s.pos)
  else
    return nil
  end
end

function read_char (s)
  local c = peek_char(s)
  if c then
    s.pos = s.pos+1
  end
  return c
end

function unread_char (s)
  if s.pos > 1 then
    s.pos = s.pos-1
  end
end

function read_whitespace (s)
  local c
  while true do
    c = peek_char(s)
    if c and whitespace[c] then
      read_char(s)
    else
      return
    end
  end
end

function read_atom (s)
  local c
  local str = ""
  while true do
    c = peek_char(s)
    if c and not whitespace[c] and not delimiters[c] then
      str = str .. c
      read_char(s)
    else
      return str
    end
  end
end

function read_list (s)
  read_char(s) -- (
  local l = {}
  local c
  while true do
    -- read_whitespace(s)
    c = peek_char(s)
    if c and c ~= ")" then
      table.insert(l, read(s))
    elseif not c then
      print("Expected ) at ", s.pos)
      error()
    else
      read_char(s) -- )
      break
    end
  end
  return l
end

function read_comment (s)
  local c
  repeat
    c = read_char (s)
  until c == "\n" or not c
end

function read_from_string (str)
  return read(make_stream(str))
end

function read (s)
  read_whitespace(s)
  local c = peek_char(s)
  if c == ";" then
    read_comment(s)
    return read(s)
  elseif c == "(" then
    return read_list(s)
  elseif c == ")" then
    print("Unexpected ) at", s.pos)
    error()
  else
    return read_atom(s)
  end
end
