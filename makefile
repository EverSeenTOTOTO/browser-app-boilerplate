SHELL := /bin/bash

DIST ?= dist

lint:
	npx eslint --fix .
	@echo -e '\033[1;32mNo lint errors found.'

clean:
	-rm -r ${DIST}

start:
	npx webpack serve --config config/webpack.dev.js

build\:dev: clean
	npx webpack --config config/webpack.dev.js

build\:prod: clean
	npx webpack --config config/webpack.prod.js

.PHONY: lint clean build test dev start
