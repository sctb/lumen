.PHONY: clean

main: x.x
	@echo x.js
	@node x.js x.x -o x.js
	@echo x.lua
	@lua x.lua x.x -o x.lua

check: main
	@echo check...
	@lua x.lua x.x -o x.js -l js && \
node x.js x.x -o x.js && \
node x.js x.x -o x1.js && \
diff x.js x1.js && \
node x.js x.x -o x.lua -l lua && \
lua x.lua x.x -o x.lua && \
lua x.lua x.x -o x1.lua && \
diff x.lua x1.lua

test: main
	@echo js
	@node x.js -e "(run-tests)"
	@echo lua
	@lua x.lua -e "(run-tests)"

clean:
	@git checkout x.js
	@git checkout x.lua
