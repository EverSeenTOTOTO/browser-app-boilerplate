SHELL := /bin/bash

DIST ?= dist

.PHONY: prepare
prepare:
	npx husky install

.PHONY: lint
lint:
	npx eslint --fix .
	npx stylelint "**/*.{css,scss}" --fix
	@echo -e '\033[1;32mNo lint errors found.'

.PHONY: clean
clean:
	-rm -r ${DIST}

.PHONY: dev
dev: clean
	npx webpack serve --node-env development --config config/webpack.dev.js

.PHONY: build
build: clean
	npx webpack --node-env production --config config/webpack.prod.js

.PHONY: start
start: build
	npx serve -s ${DIST}

