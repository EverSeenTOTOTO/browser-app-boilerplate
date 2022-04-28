SHELL := /bin/bash

DIST ?= dist

.PHONY: prepare
prepare:
	npx husky install

.PHONY: lint
lint:
	npx eslint --fix .
	npx stylelint "src/*.{css,scss,vue}" --fix
	@echo -e '\033[1;32mNo lint errors found.'

.PHONY: clean
clean:
	-rm -r ${DIST}

.PHONY: dev
dev: clean
	npx vite --mode development --config config/vite.dev.ts

.PHONY: build
build: clean
	npx vite build --mode production --config config/vite.prod.ts

.PHONY: start
start: build
	npx vite preview --port 3000

