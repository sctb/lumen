.PHONY: clean

LUMEN := bin/lumen
JS := bin/lumen.js
LUA := bin/lumen.lua

obj/%.js : lib/lumen/%.l
	@echo "    $*"
	@$(LUMEN) -c $< -o obj/$*.js -t js

obj/%.lua : lib/lumen/%.l
	@echo "    $*"
	@$(LUMEN) -c $< -o obj/$*.lua -t lua

$(JS):			\
obj/init.js		\
obj/runtime.js		\
obj/nlib.js		\
obj/reader.js		\
obj/ncompiler.js	\
obj/special.js		\
obj/core.js		\
obj/nmain.js
	@cat $^ > $@

$(LUA):			\
obj/init.lua		\
obj/runtime.lua		\
obj/nlib.lua		\
obj/reader.lua		\
obj/ncompiler.lua	\
obj/special.lua		\
obj/core.lua		\
obj/nmain.lua
	@cat $^ > $@

clean:
	@git checkout bin/lumen.*
	@rm -f obj/*
