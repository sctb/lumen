.PHONY: clean

sources := boot.x lib.x reader.x compiler.x main.x
jsboot := boot/x.js
luaboot := boot/x.lua

main: $(sources)
	@echo x.js
	@node $(jsboot) $(sources) -o $(jsboot)
	@echo x.lua
	@lua $(luaboot) $(sources) -o $(luaboot)

check: main
	@echo check...
	@mkdir -p tmp
	@lua $(luaboot) $(sources) -o $(jsboot) -t js && \
node $(jsboot) $(sources) -o $(jsboot) && \
node $(jsboot) $(sources) -o tmp/x1.js && \
diff $(jsboot) tmp/x1.js && \
node $(jsboot) $(sources) -o $(luaboot) -t lua && \
lua $(luaboot) $(sources) -o $(luaboot) && \
lua $(luaboot) $(sources) -o tmp/x1.lua && \
diff $(luaboot) tmp/x1.lua

test: main
	@echo js
	@node $(jsboot) tests.x -e "(run-tests)"
	@echo lua
	@lua $(luaboot) tests.x -e "(run-tests)"

clean:
	@git checkout $(jsboot)
	@git checkout $(luaboot)
	@rm -f tmp/x1*
	@rm -d tmp
