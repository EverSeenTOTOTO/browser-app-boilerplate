SHELL := /bin/bash

DIST ?= dist

prepare:
	npx husky install

lint:
	npx eslint --fix .
	npx stylelint "src/*.{css,scss,vue}" --fix
	@echo -e '\033[1;32mNo lint errors found.'

clean:
	-rm -r ${DIST}

dev: clean
	npx vite --mode development --config config/vite.dev.js

build: clean
	npx vite build --mode production --config config/vite.prod.js

start: build
	npx vite preview --port 3000

.PHONY: lint clean build test dev start prepare
