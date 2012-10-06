.PHONY: clean

main: x.x
	./y x.x && ./y x.x -o x1.js && diff x.js x1.js

clean:
	git checkout x.js
