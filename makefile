SHELL := /bin/bash

DIST ?= dist

prepare:
	npx husky install

lint:
	npx eslint --fix .
	@echo -e '\033[1;32mNo lint errors found.'

clean:
	-rm -r ${DIST}

dev: clean
	npx webpack serve --node-env development --config config/webpack.dev.js

build: clean
	npx webpack --node-env production --config config/webpack.prod.js

.PHONY: lint clean build test dev start prepare
