.PHONY: all cross test

LUA := ../bin/lumen.lua
JS := ../bin/lumen.js
LUMEN := ../bin/lumen

MAIN := lumen/main
TEST := lumen/test

$(LUA) $(JS): lumen/*.l
	@$(LUMEN) $(MAIN) -o $(LUA)
	@LUMEN_HOST=node $(LUMEN) $(MAIN) -o $(JS)

all: $(JS) $(LUA)

cross: all
	@LUMEN_HOST=node $(LUMEN) $(MAIN) -o $(LUA) -t lua
	@$(LUMEN) $(MAIN) -o $(JS) -t js

test: all
	@$(LUMEN) $(TEST) -e "(run)"
	@LUMEN_HOST=node $(LUMEN) $(TEST) -e "(run)"
