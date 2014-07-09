.PHONY: all test check clean

LUA := bin/lumen.lua
JS := bin/lumen.js
LUMEN := bin/lumen

$(LUA) $(JS): *.l
	@$(LUMEN) main -o $(LUA)
	@LUMEN_HOST=node $(LUMEN) main -o $(JS)

all: $(JS) $(LUA)

cross: all
	@LUMEN_HOST=node $(LUMEN) main -o $(LUA) -t lua
	@$(LUMEN) main -o $(JS) -t js

test: all
	@$(LUMEN) test -e "(run)"
	@LUMEN_HOST=node $(LUMEN) test -e "(run)"

clean:
	@git checkout boot
