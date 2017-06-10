.PHONY: all clean test

LUMEN_LUA  ?= lua
LUMEN_NODE ?= node
LUMEN_HOST ?= $(LUMEN_LUA)

LUMEN := LUMEN_HOST="$(LUMEN_HOST)" bin/lumen

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

test: all
	@echo js:
	@LUMEN_HOST=$(LUMEN_NODE) ./test.l
	@echo lua:
	@LUMEN_HOST=$(LUMEN_LUA) ./test.l

PREFIX     ?= /usr/local/bin
LUMEN_NAME ?= lumen

install: all
	@mkdir -p "$(PREFIX)"
	@ln -sf "$(shell pwd)/bin/lumen" "$(PREFIX)/$(LUMEN_NAME)"

uninstall:
	@rm -f "$(PREFIX)/$(LUMEN_NAME)"
