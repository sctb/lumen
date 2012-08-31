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
  local c = peek_char(s)
  local l = {}
  while c and c ~= ")" do
    table.insert(l, c)
    read_char(s) -- change to read!
    c = peek_char(s)
  end

  if c then
    read_char(s)
  else
    print("Expected ) at ", s.pos)
    error()
  end

  return l
end
