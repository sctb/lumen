.PHONY: all clean test

LUMEN_LUA  ?= lua
LUMEN_NODE ?= node
LUMEN_HOST ?= $(LUMEN_LUA)

LUMEN := LUMEN_HOST=$(LUMEN_HOST) bin/lumen

OBJS :=	obj/runtime.o	\
	obj/macros.o	\
	obj/main.o

MODS := bin/lumen.x	\
	bin/reader.x	\
	bin/compiler.x	\
	bin/system.x

all: $(MODS:.x=.js) $(MODS:.x=.lua)

clean:
	@git checkout bin/*.js
	@git checkout bin/*.lua
	@rm -f obj/*

bin/lumen.js: $(OBJS:.o=.js)
	@echo $@
	@cat $^ > $@.tmp
	@mv $@.tmp $@

bin/lumen.lua: $(OBJS:.o=.lua)
	@echo $@
	@cat $^ > $@.tmp
	@mv $@.tmp $@

obj/%.js : %.l
	@echo "  $@"
	@$(LUMEN) -c $< -o $@ -t js

obj/%.lua : %.l
	@echo "  $@"
	@$(LUMEN) -c $< -o $@ -t lua

bin/%.js : %.l
	@echo $@
	@$(LUMEN) -c $< -o $@ -t js

bin/%.lua : %.l
	@echo $@
	@$(LUMEN) -c $< -o $@ -t lua

test: all obj/test.js obj/test.lua
	@echo js:
	@LUMEN_HOST=$(LUMEN_NODE) bin/lumen obj/test.js -e '(run)'
	@echo lua:
	@LUMEN_HOST=$(LUMEN_LUA) bin/lumen obj/test.lua -e '(run)'
