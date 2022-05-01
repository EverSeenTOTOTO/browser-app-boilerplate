# browser-app-boilerplate

[English](./README.md) [中文](./README-zh_CN.md)

A vue ssr🚀 project boilerplate with full typescript, vite, eslint, stylelint, husky, lint-staged, commitlint support. No combined state management library, UI library or style library, especially built for those who always want to choose `eject` and keep things under control.

## Install

> Note the vue ssr version `vite-vue-ssr` is not default branch.

```bash
npx degit EverSeenTOTOTO/browser-app-boilerplate#vue-vite-ssr my-project
cd my-project
yarn
```

## Usage

+ dev: `make dev`

+ build: `make build`

## Q&A

1. Why makefile, not npm scripts?

    I found `yarn clean && yarn build && yarn start` so annoying.

2. Can I use this project for production?

    Of course! You can extend this project for production usage. But note there are many implemention details, you may need advanced refactoring and optimization.

3. My git hooks not working?

    Try `make prepare` to reinstall husky hooks.

4. What's the difference from [official vite ssr demo](https://github.com/vitejs/vite/tree/main/packages/playground/ssr-vue)?

    The most difference is we take `render` function defined in `index.server.ts` as a [middleware](./config/vite.dev.ts), and still use `ViteDevServer` for development.
    The official demo however use their [`server.js`](https://github.com/vitejs/vite/blob/main/packages/playground/ssr-vue/server.js) as dev server, and regard `ViteDevServer` as a middleware (set `server.middlewareMode`).

## Project Detail

```bash
+ /
  + config/
    - vite.dev.ts           # client dev config
    - vite.prod.ts          # clientside build config
    - vite.server.ts        # server build config
    - vite.serverEntry.ts   # serverside bundle build config
  + src/
    + server/
      - index.ts        # server entry
    - main.ts
    - index.server.ts   # serverside entry
    - index.client.ts   # clientside entry
```
