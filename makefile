.PHONY: all test check clean

SRCS := lib.l reader.l compiler.l main.l
LUABOOT := boot/lumen.lua
JSBOOT := boot/lumen.js


$(LUABOOT) $(JSBOOT): $(SRCS)
	@./lumen $(SRCS) -m -o $(LUABOOT)
	@LUMEN_HOST=node ./lumen $(SRCS) -m -o $(JSBOOT)

all: $(JSBOOT) $(LUABOOT)

cross: all
	@LUMEN_HOST=node ./lumen $(SRCS) -m -o $(LUABOOT) -t lua
	@./lumen $(SRCS) -m -o $(JSBOOT) -t js

test: cross
	@./lumen test.l -e "(run-tests)"
	@LUMEN_HOST=node ./lumen test.l -e "(run-tests)"

clean:
	@git checkout boot/lumen.*
