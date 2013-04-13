.PHONY: clean

main: x.x
	@echo x.js
	@node x.js x.x
	@echo x.lua
	@lua x.lua x.x

check: x.x
	@echo x.js
	@node x.js x.x && \
node x.js x.x -o x1.js && \
diff x.js x1.js && \
lua x.lua x.x && \
diff x.js x1.js && \
echo x.lua && \
lua x.lua x.x -l lua && \
lua x.lua x.x -l lua -o x1.lua && \
diff x.lua x1.lua && \
node x.js x.x -l lua -o x1.lua && \
diff x.lua x1.lua

test: main
	@echo js
	@node x.js -t
	@echo lua
	@lua x.lua -t

clean:
	@git checkout x.js
	@git checkout x.lua
