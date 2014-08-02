.PHONY: all cross test profile clean

LUMEN := bin/lumen
LIBDIR := lib

all:
	@$(MAKE) -C $(LIBDIR) all

cross:
	@$(MAKE) -C $(LIBDIR) cross

test:
	@$(MAKE) -C $(LIBDIR) test

profile:
	@$(MAKE) -C $(LIBDIR) profile

clean:
	@git checkout bin/lumen.*
