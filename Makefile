all: smaz_test

smaz_test: smaz_test.c smaz.c
	gcc -o smaz_test -O2 -Wall -W -ansi -pedantic smaz.c smaz_test.c

clean:
	rm -rf smaz_test _smaz.js

.PHONY: js
js: _smaz.js

_smaz.js: smaz.c
# tested with emcc 1.39.13
	emcc smaz.c -O2 -o $@ --closure 1 -s EXPORTED_FUNCTIONS="['_smaz_compress', '_smaz_decompress']" -s 'EXTRA_EXPORTED_RUNTIME_METHODS=["ccall", "cwrap"]' -s BINARYEN_ASYNC_COMPILATION=0 -s SINGLE_FILE=1
