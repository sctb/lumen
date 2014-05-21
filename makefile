.PHONY: all test check clean

LUABOOT := boot/lumen.lua
JSBOOT := boot/lumen.js

$(LUABOOT) $(JSBOOT): *.l
	@./lumen main -o $(LUABOOT)
	@LUMEN_HOST=node ./lumen main -o $(JSBOOT)

all: $(JSBOOT) $(LUABOOT)

cross: all
	@LUMEN_HOST=node ./lumen main -o $(LUABOOT) -t lua
	@./lumen main -o $(JSBOOT) -t js

test: all
	@./lumen test -e "(run-tests)"
	@LUMEN_HOST=node ./lumen test -e "(run-tests)"

clean:
	@git checkout boot
