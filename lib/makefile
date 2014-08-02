.PHONY: all cross test profile

LUMEN_LUA ?= lua
LUMEN_NODE ?= node

LUA := ../bin/lumen.lua
JS := ../bin/lumen.js
LUMEN := ../bin/lumen

MAIN := lumen/main
TEST := lumen/test

$(LUA) $(JS): lumen/*.l
	@LUMEN_HOST=$(LUMEN_LUA) $(LUMEN) $(MAIN) -o $(LUA)
	@LUMEN_HOST=$(LUMEN_NODE) $(LUMEN) $(MAIN) -o $(JS)

all: $(JS) $(LUA)

cross: all
	@LUMEN_HOST=$(LUMEN_NODE) $(LUMEN) $(MAIN) -o $(LUA) -t lua
	@LUMEN_HOST=$(LUMEN_LUA) $(LUMEN) $(MAIN) -o $(JS) -t js

test: all
	@LUMEN_HOST=$(LUMEN_LUA) $(LUMEN) $(TEST) -e "(run)"
	@LUMEN_HOST=$(LUMEN_NODE) $(LUMEN) $(TEST) -e "(run)"

profile:
	@LUMEN_HOST='luajit -jp' $(LUMEN) $(MAIN) -o $(LUA)
	@LUMEN_HOST='luajit -jp' $(LUMEN) $(TEST) -e "(run)"
