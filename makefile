.PHONY: clean

main: x.x
	@echo x.js
	@node x.js x.x
	@echo x.lua
	@lua x.lua x.x -l lua

check: main
	@echo check...
	@node x.js x.x -o x1.js && \
diff x.js x1.js && \
lua x.lua x.x -l lua -o x1.lua && \
diff x.lua x1.lua

test: main
	@echo js
	@node x.js -e "(run-tests)"
	@echo lua
	@lua x.lua -e "(run-tests)"

clean:
	@git checkout x.js
	@git checkout x.lua
