.PHONY: all test check clean

SRCS := lib.l reader.l compiler.l main.l
LUABOOT := boot/lumen.lua
JSBOOT := boot/lumen.js


$(LUABOOT) $(JSBOOT): $(SRCS)
	@echo $(LUABOOT)
	@./lumen $(SRCS) -m -o $(LUABOOT)
	@echo $(JSBOOT)
	@LUMEN_HOST=node ./lumen $(SRCS) -m -o $(JSBOOT)

all: $(JSBOOT) $(LUABOOT)

test: all
	@echo lua
	@./lumen tests.l -e "(run-tests)"
	@echo js
	@LUMEN_HOST=node ./lumen tests.l -e "(run-tests)"

check: all
	@echo check...
	@LUMEN_HOST=node ./lumen $(SRCS) -m -o $(LUABOOT) -t lua && \
./lumen $(SRCS) -m -o $(LUABOOT) && \
./lumen $(SRCS) -m -o x1.lua && \
diff $(LUABOOT) x1.lua && \
./lumen $(SRCS) -m -o $(JSBOOT) -t js && \
LUMEN_HOST=node ./lumen $(SRCS) -m -o $(JSBOOT) && \
LUMEN_HOST=node ./lumen $(SRCS) -m -o x1.js && \
diff $(JSBOOT) x1.js && \
rm x1.lua x1.js

clean:
	@git checkout boot/lumen.*
	@rm -f x1*
