.PHONY: all test check clean

LUABOOT := boot/lumen.lua
JSBOOT := boot/lumen.js

$(LUABOOT) $(JSBOOT): *.l
	@./lumen main -s -o $(LUABOOT)
	@LUMEN_HOST=node ./lumen main -s -o $(JSBOOT)

all: $(JSBOOT) $(LUABOOT)

cross: all
	@LUMEN_HOST=node ./lumen main -s -o $(LUABOOT) -t lua
	@./lumen main -s -o $(JSBOOT) -t js

test: cross
	@./lumen test -e "(run-tests)"
	@LUMEN_HOST=node ./lumen test -e "(run-tests)"

clean:
	@git checkout boot
