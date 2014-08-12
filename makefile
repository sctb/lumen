.PHONY: clean

LUMEN := bin/lumen
JS := bin/lumen.js
LUA := bin/lumen.lua

obj/%.js : lib/%.l
	@echo "    $*"
	@$(LUMEN) -c $< -o obj/$*.js -t js

obj/%.lua : lib/%.l
	@echo "    $*"
	@$(LUMEN) -c $< -o obj/$*.lua -t lua

$(JS):			\
obj/init.js		\
obj/runtime.js		\
obj/lib.js		\
obj/reader.js		\
obj/compiler.js	\
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
