---
id: webapp
title: 云引擎 Web 前端运行环境
sidebar_label: Web 前端
---

import CloudTimezone from '../_partials/cloud-timezone.mdx';
import NodejsSetupRuntime from '../_partials/nodejs-setup-runtime.mdx';
import BuildingScripts from '../_partials/building-scripts.mdx';
import BuildingBuildLogs from '../_partials/building-build-logs.mdx';
import NodejsSetupDependencies from '../_partials/nodejs-setup-dependencies.mdx';
import CloudLoadBalancer from '../_partials/cloud-load-balancer.mdx';
import CloudCustomDomain from '../_partials/cloud-custom-domain.mdx';

:::info
这篇文档是针对 Web 前端运行环境的深入介绍，如希望快速地开始使用云引擎，请查看 [云引擎开发指南 § 快速开始](/sdk/engine/cloud-engine#快速开始)。
:::

云引擎支持通过两种方式部署 Web 前端项目：

- **纯静态项目** 只需项目根目录包含一个 `index.html`，云引擎会自动使用 serve 来启动一个 HTTP 服务器。
- **Node.js 构建的项目** 需要项目根目录包含 `package.json`，云引擎会将其视作 Node.js 项目进行构建和运行。

下面会分别介绍这两种部署方式。

## 纯静态项目

只需项目根目录包含一个 `index.html`（或 `static.json`），云引擎会自动使用 [serve](https://www.npmjs.com/package/serve) 来启动一个 HTTP 服务器。

如果你希望创建一个新的项目，推荐从我们的 [纯静态示例项目](https://github.com/leancloud/static-getting-started) 开始。

### 配置 serve

你可以在项目根目录创建一个 `static.json` 来配置 serve 的行为：

```json title='static.json'
{
  "public": "build", // 在 build 目录而不是项目根目录启动网站
  "rewrites": [
    { "source": "**", "destination": "/index.html" } // 将所有不存在的文件的请求重定向到 index.html（适用大部分单页面应用）
  ]
}
```

更多 serve 的选项和用法见 [serve-handler · Options](https://github.com/vercel/serve-handler#options)。

## Node.js 构建的项目

如果项目根目录包含 `package.json`，云引擎会将其视作 Node.js 项目进行构建和运行。

应用需要自己启动一个 HTTP Server 来提供静态文件的访问，我们推荐使用 [serve](https://www.npmjs.com/package/serve) 模块：

```sh
npm install serve
```

在 `leanengine.yaml` 中添加：

``` title='leanengine.yaml'
run: $(npm bin)/serve -c static.json -l ${LEANCLOUD_APP_PORT}
```

### 使用 create-react-app

如果你希望创建一个新的项目，推荐使用 [create-react-app](https://create-react-app.dev/) 来创建项目，它会自动配置好 React 的构建工具链，让开发者能专注在核心功能上：

```sh
npx create-react-app react-for-engine --use-npm
```

等待一小会，我们就可以在本地启动页面的预览了：

```sh
cd react-for-engine
npm start # 会自动打开 http://localhost:3000
```

就像我们前面提到的，create-react-app 提供了开箱即用的 React 工具链，现在你可以编辑 `src/App.js` 中的代码，甚至不需要刷新就可以在浏览器中看到页面发生了变化。

如果要把这个应用部署到云引擎的话，我们需要使用 serve 来启动 HTTP 服务：

```sh
npm install serve
```

然后为 serve 创建一个配置文件（`static.json`）这里我们将不存在的 URL 都重写到 index.html，以便我们的单页应用可以使用自己的前端路由（如 react-router）：

```json title='static.json'
{
  "public": "build",
  "rewrites": [
    { "source": "**", "destination": "/index.html" }
  ]
}
```

再创建一个云引擎的配置文件（`leanengine.yaml`），来配置构建和启动 Web server 的命令：

```yaml title='leanengine.yaml'
build: npm run build
run: $(npm bin)/serve -c static.json -l ${LEANCLOUD_APP_PORT}
```

这样云引擎可以在线上完成 React 的构建过程，开发者不需要将构建产物提交进 Git 仓库也不需要额外的 CI 环境。

### 配置 Node.js 版本

<NodejsSetupRuntime />

### 安装依赖（`package.json`）

<NodejsSetupDependencies />

## 自定义构建过程

<BuildingScripts />

### 构建日志

<BuildingBuildLogs />

## 云端环境

### 绑定自定义域名

<CloudCustomDomain />

### 负载均衡和加速节点

<CloudLoadBalancer only='nodejs' noDeprecatedMiddleware={true} noClientIp={true} />

### 时区

<CloudTimezone />

## 疑难问题
