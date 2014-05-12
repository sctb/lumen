.PHONY: all test check clean

LUABOOT := boot/lumen.lua
JSBOOT := boot/lumen.js

$(LUABOOT) $(JSBOOT): *.l
	@./lumen main -s -f -o $(LUABOOT)
	@LUMEN_HOST=node ./lumen main -s -f -o $(JSBOOT)

all: $(JSBOOT) $(LUABOOT)

cross: all
	@LUMEN_HOST=node ./lumen main -s -f -o $(LUABOOT) -t lua
	@./lumen main -s -f -o $(JSBOOT) -t js

test:
	@./lumen test -e "(run-tests)"
	@LUMEN_HOST=node ./lumen test -e "(run-tests)"

clean:
	@git checkout boot
