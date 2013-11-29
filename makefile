.PHONY: all test check clean

SRCS := lib.x reader.x compiler.x main.x
LUABOOT := boot/x.lua
JSBOOT := boot/x.js


$(LUABOOT) $(JSBOOT): $(SRCS)
	@echo $(LUABOOT)
	@./x $(SRCS) -o $(LUABOOT)
	@echo $(JSBOOT)
	@X_HOST=node ./x $(SRCS) -o $(JSBOOT)

all: $(JSBOOT) $(LUABOOT)

test: all
	@echo lua
	@./x tests.x -e "(run-tests)"
	@echo js
	@X_HOST=node ./x tests.x -e "(run-tests)"

check: all
	@echo check...
	@X_HOST=node ./x $(SRCS) -o $(LUABOOT) -t lua && \
./x $(SRCS) -o $(LUABOOT) && \
./x $(SRCS) -o x1.lua && \
diff $(LUABOOT) x1.lua && \
./x $(SRCS) -o $(JSBOOT) -t js && \
X_HOST=node ./x $(SRCS) -o $(JSBOOT) && \
X_HOST=node ./x $(SRCS) -o x1.js && \
diff $(JSBOOT) x1.js && \
rm x1.lua x1.js

clean:
	@git checkout boot/x.*
	@rm -f x1*
