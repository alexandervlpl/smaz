all: smaz_test

smaz_test: smaz_test.c smaz.c
	gcc -o smaz_test -O2 -Wall -W -ansi -pedantic smaz.c smaz_test.c

clean:
	rm -rf smaz_test

.PHONY: js
js: _smaz.js

_smaz.js: $(OBJECTS) $(HEADERS)
	emcc smaz.c -O2 -o $@ --closure 1 -s EXPORTED_FUNCTIONS="['_smaz_compress', '_smaz_decompress']" -s 'EXTRA_EXPORTED_RUNTIME_METHODS=["ccall", "cwrap"]'