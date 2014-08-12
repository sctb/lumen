.PHONY: clean

LUMEN_LUA  ?= lua
LUMEN_NODE ?= node
LUMEN_HOST ?= $(LUMEN_LUA)

LUMEN := LUMEN_HOST=$(LUMEN_HOST) bin/lumen

JS := bin/lumen.js
LUA := bin/lumen.lua

obj/%.js : lib/%.l
	@echo "   $*"
	@$(LUMEN) -c $< -o $@ -t js

obj/%.lua : lib/%.l
	@echo "   $*"
	@$(LUMEN) -c $< -o $@ -t lua

ifeq ($(LUMEN_HOST), $(LUMEN_NODE))
obj/core.js: lib/core.l obj/runtime.js obj/lib.js
	@echo "   core*"
	@$(LUMEN) obj/lib.js -c $< -o $@ -t js

obj/special.js: lib/special.l obj/runtime.js obj/lib.js obj/compiler.js
	@echo "   special*"
	@$(LUMEN) obj/lib.js obj/compiler.js -c $< -o $@ -t js

obj/core.lua: lib/core.l obj/runtime.js obj/lib.js
	@echo "   core*"
	@$(LUMEN) obj/lib.js -c $< -o $@ -t lua

obj/special.lua: lib/special.l obj/runtime.js obj/lib.js obj/compiler.js
	@echo "   special*"
	@$(LUMEN) obj/lib.js obj/compiler.js -c $< -o $@ -t lua
endif

$(JS):			\
obj/init.js		\
obj/runtime.js		\
obj/lib.js		\
obj/reader.js		\
obj/compiler.js		\
obj/special.js		\
obj/core.js		\
obj/main.js
	@cat $^ > $@

$(LUA):			\
obj/init.lua		\
obj/runtime.lua		\
obj/lib.lua		\
obj/reader.lua		\
obj/compiler.lua	\
obj/special.lua		\
obj/core.lua		\
obj/main.lua
	@cat $^ > $@

clean:
	@git checkout bin/lumen.*
	@rm -f obj/*
