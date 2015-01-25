.PHONY: all clean test

LUMEN_LUA  ?= lua
LUMEN_NODE ?= node
LUMEN_HOST ?= $(LUMEN_LUA)

LUMEN := LUMEN_HOST=$(LUMEN_HOST) bin/lumen

OBJS :=	obj/runtime.o	\
	obj/io.o	\
	obj/lib.o	\
	obj/compiler.o	\
	obj/special.o	\
	obj/core.o	\
	obj/main.o

all: bin/lumen.lua	\
     bin/lumen.js	\
     bin/reader.lua	\
     bin/reader.js

clean:
	@git checkout bin/lumen.*
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
	@echo "  $@"
	@$(LUMEN) -c $< -o $@ -t js

bin/%.lua : %.l
	@echo "  $@"
	@$(LUMEN) -c $< -o $@ -t lua

TESTOBJS := obj/math.o obj/test.o

test: all $(TESTOBJS:.o=.js) $(TESTOBJS:.o=.lua)
	@echo js:
	@LUMEN_HOST=$(LUMEN_NODE) bin/lumen $(TESTOBJS:.o=.js) -e '(run)'
	@echo lua:
	@LUMEN_HOST=$(LUMEN_LUA) bin/lumen $(TESTOBJS:.o=.lua) -e '(run)'
