.PHONY: clean

sources := lib.x reader.x compiler.x main.x

main: $(sources)
	@echo x.js
	@node x.js $(sources) -o x.js
	@echo x.lua
	@lua x.lua $(sources) -o x.lua

check: main
	@echo check...
	@lua x.lua $(sources) -o x.js -t js && \
node x.js $(sources) -o x.js && \
node x.js $(sources) -o x1.js && \
diff x.js x1.js && \
node x.js $(sources) -o x.lua -t lua && \
lua x.lua $(sources) -o x.lua && \
lua x.lua $(sources) -o x1.lua && \
diff x.lua x1.lua

test: main
	@echo js
	@node x.js tests.x -e "(run-tests)"
	@echo lua
	@lua x.lua tests.x -e "(run-tests)"

clean:
	@git checkout x.js
	@git checkout x.lua
