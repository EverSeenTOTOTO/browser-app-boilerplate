# browser-app-boilerplate

[![OSCS Status](https://www.oscs1024.com/platform/badge/EverSeenTOTOTO/browser-app-boilerplate.svg?size=small)](https://www.oscs1024.com/project/EverSeenTOTOTO/browser-app-boilerplate?ref=badge_small)
![react@18.0.0](https://img.shields.io/badge/react-v18.0.0-blue)
![vite@2.9.5](https://img.shields.io/badge/vite-v2.9.5-brightgreen)

[English](./README.md) [中文](./README-zh_CN.md)

A react ssr🚀 project boilerplate with full typescript, vite, eslint, stylelint, husky, lint-staged, commitlint support. **NO** combined UI library or style library, especially built for those who always want to choose `eject` and keep things under control. Read [Wiki](https://github.com/EverSeenTOTOTO/browser-app-boilerplate/wiki) for more details.

## Install

> Note the react ssr version `react-vite-ssr` is not default branch.

```bash
git clone https://github.com/EverSeenTOTOTO/browser-app-boilerplate.git my-project -b react-vite-ssr --depth 1
cd my-project
yarn
```

> Check `vue-vite-ssr` for a vue similar version. A real project use this boilerplate can be found [here](https://github.com/EverSeenTOTOTO/pen-middleware), which use `vite`+`react`+`react-dom`+`react-dom-router`+`mobx`+`mui`.

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

4. What's the difference from [official vite ssr demo](https://github.com/vitejs/vite/tree/main/playground/ssr-react)?

    The biggest difference is we take `render` function defined in `index.server.ts` as a [middleware](./config/vite.dev.ts), and still use `ViteDevServer` for development.
    The official demo however use their [`server.js`](https://github.com/vitejs/vite/blob/main/playground/ssr-react/server.js) as dev server, and regard `ViteDevServer` as a middleware (set `server.middlewareMode`).

## Project Detail

```bash
+ /
  + config/
    - vite.dev.ts           # client dev config
    - vite.prod.ts          # clientApp build config
    - vite.server.ts        # server build config
    - vite.serverEntry.ts   # serverApp build config
  + src/
    + server/
      - index.ts        # server entry
    - main.ts
    - index.server.tsx   # serverApp entry
    - index.client.tsx   # clientApp entry
```
