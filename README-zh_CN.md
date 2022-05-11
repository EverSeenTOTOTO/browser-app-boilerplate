# browser-app-boilerplate

[English](./README.md) [中文](./README-zh_CN.md)

一个vue ssr🚀项目模板，具有完善的typescript，vite，eslint，stylelint, husky, lint-staged, commitlint支持。但**不**与任何状态管理、UI与样式库相绑定，专为那些总是选择`eject`并试图让一切都处在自己控制下的开发者提供。

## Install

> 注意vue ssr版本`vue-vite-ssr`不是默认分支。

```bash
git clone https://github.com/EverSeenTOTOTO/browser-app-boilerplate.git my-project -b vue-vite-ssr --depth 1
cd my-project
yarn
```

## Usage

+ dev: `make dev`

+ build: `make build`

## Q&A

1. 为什么选择makefile，而不是npm脚本命令？

    我觉得`yarn clean && yarn build && yarn start`非常丑陋……

2. 这个项目可以被用于生产环境吗？

    当然，你可以继续拓展这个项目以便用于生产环境。但是注意项目中有很多实现的细节，你可能需要进一步的重构和优化。

3. 我的git钩子不起作用？

    试试`make prepare`重新安装下husky钩子。

4. 和[vite官方的ssr demo](https://github.com/vitejs/vite/tree/main/playground/ssr-vue)有什么不同？

    最大的不同点在于，我们将`index.server.ts`中定义的`render`函数实现为[中间件](./config/vite.dev.ts), 然后仍然使用`ViteDevServer`做开发。而官方的例子将[server.js](https://github.com/vitejs/vite/blob/main/playground/ssr-vue/server.js)也用作开发服务器，并设置`ViteDevServer`的`server.middlewareMode`来将`ViteDevServer`当作中间件使用。

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
