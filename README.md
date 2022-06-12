# browser-app-boilerplate

[English](./README.md) [中文](./README-zh_CN.md)

A vue ssr🚀 project boilerplate with full typescript, vite, eslint, stylelint, husky, lint-staged, commitlint support. **NO** combined state management library, UI library or style library, especially built for those who always want to select `eject` and keep things under control.

## Install

> Note the quasar ssr version `quasar-vite-ssr` is not default branch.

```bash
git clone https://github.com/EverSeenTOTOTO/browser-app-boilerplate.git my-project -b quasar-vite-ssr --depth 1
cd my-project
yarn
```

> Note: You may install `commitizen` globally for `git cz`:`npm i -g commitizen`, or you can use`npx cz`.

> Checkout branch `react-vite-ssr` for a react similar version. A real project use this boilerplate can be found [here](https://github.com/EverSeenTOTOTO/pen-middleware).

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

4. What's the difference from [official vite ssr demo](https://github.com/vitejs/vite/tree/main/playground/ssr-vue)?

    The biggest difference is we take `render` function defined in `index.server.ts` as a [middleware](./config/vite.dev.ts), and still use `ViteDevServer` for development.
    The official demo however use their [`server.js`](https://github.com/vitejs/vite/blob/main/playground/ssr-vue/server.js) as dev server, and regard `ViteDevServer` as a middleware (set `server.middlewareMode`).

## Project Detail

```bash
+ /
  + config/
    - vite.dev.ts           # client dev config
    - vite.prod.ts          # clientside build config
    - vite.server.ts        # server build config
    - vite.serverEntry.ts   # serverside build config
  + src/
    + server/
      - index.ts        # server entry
    - main.ts
    - index.server.ts   # serverside entry
    - index.client.ts   # clientside entry
```
