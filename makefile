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

CORE_PREREQ := obj/runtime.js obj/lib.js
SPECIAL_PREREQ := $(CORE_PREREQ) obj/compiler.js

ifeq ($(LUMEN_HOST), $(LUMEN_NODE))
obj/core.js: lib/core.l $(CORE_PREREQ)
	@echo " *$@"
	@$(LUMEN) $(CORE_PREREQ) -c $< -o $@ -t js

obj/special.js: lib/special.l $(SPECIAL_PREREQ)
	@echo " *$@"
	@$(LUMEN) $(SPECIAL_PREREQ) -c $< -o $@ -t js

obj/core.lua: lib/core.l $(CORE_PREREQ)
	@echo " *$@"
	@$(LUMEN) $(CORE_PREREQ) -c $< -o $@ -t lua

obj/special.lua: lib/special.l $(SPECIAL_PREREQ)
	@echo " *$@"
	@$(LUMEN) $(SPECIAL_PREREQ) -c $< -o $@ -t lua
endif
