.PHONY: all cross test profile

LUA := ../bin/lumen.lua
JS := ../bin/lumen.js
LUMEN := ../bin/lumen

MAIN := lumen/main
TEST := lumen/test

$(LUA) $(JS): lumen/*.l
	@LUMEN_HOST=lua $(LUMEN) $(MAIN) -o $(LUA)
	@LUMEN_HOST=node $(LUMEN) $(MAIN) -o $(JS)

all: $(JS) $(LUA)

cross: all
	@LUMEN_HOST=node $(LUMEN) $(MAIN) -o $(LUA) -t lua
	@LUMEN_HOST=lua $(LUMEN) $(MAIN) -o $(JS) -t js

test: all
	@LUMEN_HOST=lua $(LUMEN) $(TEST) -e "(run)"
	@LUMEN_HOST=node $(LUMEN) $(TEST) -e "(run)"

profile:
	@LUMEN_HOST='luajit -jp' $(LUMEN) $(MAIN) -o $(LUA)
	@LUMEN_HOST='luajit -jp' $(LUMEN) $(TEST) -e "(run)"
