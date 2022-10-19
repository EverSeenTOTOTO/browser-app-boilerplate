# browser-app-boilerplate

[![OSCS Status](https://www.oscs1024.com/platform/badge/EverSeenTOTOTO/browser-app-boilerplate.svg?size=small)](https://www.oscs1024.com/project/EverSeenTOTOTO/browser-app-boilerplate?ref=badge_small)
![vue@3.2.33](https://img.shields.io/badge/vuejs-v3.2.33-brightgreen)
![webpack@5.74.0](https://img.shields.io/badge/webpack-v5.74.0-brightgreen)

[English](./README.md) [中文](./README-zh_CN.md)

A vue ssr🚀 project boilerplate with full typescript, webpack, eslint, stylelint, husky, lint-staged, commitlint support. **NO** combined state management library, UI library or style library, especially built for those who always want to select `eject` and keep things under control. Read [Wiki](https://github.com/EverSeenTOTOTO/browser-app-boilerplate/wiki) for more details.

## Install

```bash
git clone https://github.com/EverSeenTOTOTO/browser-app-boilerplate.git my-project -b vue-webpack-ssr --depth 1
cd my-project
yarn
```

> Note: You may install `commitizen` globally for `git cz`:`npm i -g commitizen`, or you can use`npx cz`.

## Usage

+ dev: `make dev`

+ build: `make build`

## Q&A

1. Why makefile, not npm scripts?

    I found `yarn clean && yarn build && yarn start` so annoying.

2. Can I use this project for production?

    Production use of this project is possible, but will require advanced refactoring and optimization due to many implementation details.

3. My git hooks not working?

    Try `make prepare` to reinstall husky hooks.

## Project Detail

```bash
+ /
  + config/
    - webpack.dev.ts           # client dev config
    - webpack.prod.ts          # clientApp build config
    - webpack.server.ts        # server build config
    - webpack.serverEntry.ts   # serverApp build config
  + src/
    + server/
      - index.ts        # server entry
    - main.ts
    - index.server.ts   # serverApp entry
    - index.client.ts   # clientApp entry
```
