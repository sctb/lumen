.PHONY: all test check clean

SRCS := lib.l reader.l compiler.l main.l
LUABOOT := boot/lumen.lua
JSBOOT := boot/lumen.js


$(LUABOOT) $(JSBOOT): $(SRCS)
	@./lumen $(SRCS) -m -o $(LUABOOT)
	@LUMEN_HOST=node ./lumen $(SRCS) -m -o $(JSBOOT)

all: $(JSBOOT) $(LUABOOT)

test: all
	@./lumen tests.l -e "(run-tests)"
	@LUMEN_HOST=node ./lumen tests.l -e "(run-tests)"

cross: all
	@LUMEN_HOST=node ./lumen $(SRCS) -m -o $(LUABOOT) -t lua
	@./lumen $(SRCS) -m -o $(JSBOOT) -t js

clean:
	@git checkout boot/lumen.*
