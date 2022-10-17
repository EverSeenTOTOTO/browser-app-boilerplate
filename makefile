SHELL := /bin/bash

DIST ?= dist

.PHONY: prepare
prepare:
	npx husky install

.PHONY: lint
lint:
	npx eslint --fix .
	npx stylelint "**/*.{css,scss,vue}" --fix
	@echo -e '\033[1;32mNo lint errors found.'

.PHONY: clean
clean:
	-rm -r ${DIST}

.PHONY: dev
dev: clean
	npx webpack --mode development --config config/webpack.serverEntry.js
	npx webpack serve --mode development --config config/webpack.dev.js

.PHONY: build
build: clean
	# parallel use \n to separate inputs
	echo -e "prod\\nserver\\nserverEntry" |\
		parallel -j4 --tty "npx webpack --mode production --config config/webpack.{}.js"

.PHONY: start
start: build
	node ${DIST}/server.js

.PHONY: server
server:
	node ${DIST}/server.js
