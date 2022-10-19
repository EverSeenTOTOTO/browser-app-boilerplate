# browser-app-boilerplate

[English](./README.md) [中文](./README-zh_CN.md)

一个vue ssr🚀项目模板，具有完善的typescript，webpack，eslint，stylelint, husky, lint-staged, commitlint支持。但**不**与任何状态管理、UI与样式库相绑定，专为那些总是选择`eject`并试图让一切都处在自己控制下的开发者提供。阅读[Wiki](https://github.com/EverSeenTOTOTO/browser-app-boilerplate/wiki)来获得更多细节。

## Install

```bash
git clone https://github.com/EverSeenTOTOTO/browser-app-boilerplate.git my-project -b vue-webpack-ssr --depth 1
cd my-project
yarn
```

> 你可以全局安装`commitizen`来使用`git cz`命令，也或者你可以使用`npx cz`。

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
