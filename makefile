.PHONY: all clean

LUMEN_LUA  ?= lua
LUMEN_NODE ?= node
LUMEN_HOST ?= $(LUMEN_LUA)

LUMEN := LUMEN_HOST=$(LUMEN_HOST) bin/lumen

OBJS :=	obj/init.o	\
	obj/runtime.o	\
	obj/lib.o	\
	obj/reader.o	\
	obj/compiler.o	\
	obj/special.o	\
	obj/core.o	\
	obj/main.o

all: bin/lumen.lua bin/lumen.js

clean:
	@git checkout bin/lumen.*
	@rm -f obj/*

bin/lumen.js: $(OBJS:.o=.js)
	@echo $@
	@cat $^ > $@

bin/lumen.lua: $(OBJS:.o=.lua)
	@echo $@
	@cat $^ > $@

obj/%.js : lib/%.l
	@echo "  $@"
	@$(LUMEN) -c $< -o $@ -t js

obj/%.lua : lib/%.l
	@echo "  $@"
	@$(LUMEN) -c $< -o $@ -t lua
