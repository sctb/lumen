.PHONY: all cross test clean

LUMEN := bin/lumen
LIBDIR := lib

all:
	@$(MAKE) -C $(LIBDIR) all

cross:
	@$(MAKE) -C $(LIBDIR) cross

test:
	@$(MAKE) -C $(LIBDIR) test

clean:
	@git checkout bin/lumen.*
