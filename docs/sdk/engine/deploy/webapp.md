---
id: webapp
title: 云引擎 Web 前端运行环境
sidebar_label: Web 前端
sidebar_position: 3
---

import CloudTimezone from '../_partials/cloud-timezone.mdx';
import NodejsSetupRuntime from '../_partials/nodejs-setup-runtime.mdx';
import BuildingScripts from '../_partials/building-scripts.mdx';
import BuildingBuildLogs from '../_partials/building-build-logs.mdx';
import NodejsSetupDependencies from '../_partials/nodejs-setup-dependencies.mdx';
import CloudLoadBalancer from '../_partials/cloud-load-balancer.mdx';
import CloudCustomDomain from '../_partials/cloud-custom-domain.mdx';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import QuickStartDeploy from '../_partials/quick-start-deploy.mdx';

云引擎同样对托管 Web 前端应用（例如一个网站）提供了支持，对于使用了 React、Vue 等框架的应用，云引擎可以在线上完成构建的过程，开发者不需要将构建产物提交进 Git 仓库也不需要额外的 CI 环境。云引擎还提供了自定义域名绑定、自动申请 SSL 证书、重定向到 HTTPS 等常用的功能，减轻前端开发者在部署和运维环节的工作量。

:::info
这篇文档是针对 Web 前端运行环境的介绍，如需了解云引擎平台提供的功能，请看 [云引擎平台功能](/sdk/engine/deploy/platform)。
:::

如果项目根目录包含一个 `static.json` 或 `index.html`，云引擎就会将其识别为 Web 前端项目，使用 Node.js 运行环境进行构建，然后自动使用 [serve](https://www.npmjs.com/package/serve) 来启动一个 HTTP 服务器。

## 快速开始

大多前端脚手架都可以通过简单地配置运行在云引擎上，推荐使用它们来创建新的项目。

<Tabs>
<TabItem value='react' label='React' default>

[create-react-app](https://create-react-app.dev/) 提供了开箱即用的 React 工具链，会自动配置好 React 的构建工具链，让开发者能专注在核心功能上：

```sh
npx create-react-app react-for-engine --use-npm
```

然后切换到项目目录（上面的例子中是 `react-for-engine`）创建一个配置文件 `static.json` 将不存在的 URL 都重写到 `index.html`，以便我们的单页应用可以使用自己的前端路由（如 `react-router`）：

```json title='static.json'
{
  "public": "build",
  "rewrites": [
    { "source": "**", "destination": "/index.html" }
  ]
}
```

再创建一个 `leanengine.yaml` 来配置构建命令：

```yaml title='leanengine.yaml'
build: npm run build
```

</TabItem>
<TabItem value='vue' label='Vue'>

可以使用官方的 [Vue CLI](https://cli.vuejs.org/)：

```sh
npm install -g @vue/cli
vue create vue-for-engine
```

然后切换到项目目录（上面的例子中是 `vue-for-engine`）创建一个配置文件 `static.json` 将不存在的 URL 都重写到 `index.html`，以便我们的单页应用可以使用自己的前端路由（如 `vue-router`）：

```json title='static.json'
{
  "public": "dist",
  "rewrites": [
    { "source": "**", "destination": "/index.html" }
  ]
}
```

再创建一个 `leanengine.yaml` 来配置构建命令：

```yaml title='leanengine.yaml'
build: npm run build
```

</TabItem>
</Tabs>

云引擎可以在线上完成构建过程，开发者不需要将构建产物提交进 Git 仓库也不需要额外的 CI 环境。

### 部署到云引擎

<QuickStartDeploy />

## 配置 Node.js 版本

<NodejsSetupRuntime />

## 安装依赖（`package.json`）

<NodejsSetupDependencies />

## 配置 serve

你可以在项目根目录创建一个 `static.json` 来配置 serve 的行为。

```json title='static.json'
{
  "public": "build", // 在 build 目录而不是项目根目录启动网站
  "rewrites": [
    { "source": "**", "destination": "/index.html" } // 将所有不存在的文件的请求重定向到 index.html（适用大部分单页面应用）
  ]
}
```

更多 serve 的选项和用法见 [serve-handler · Options](https://github.com/vercel/serve-handler#options)。

## 自定义构建过程

<BuildingScripts />

### 构建日志

<BuildingBuildLogs />

## 云端环境

### 绑定自定义域名

<CloudCustomDomain />

### 负载均衡和加速节点

<CloudLoadBalancer only='nodejs' noClientIp={true} />

### 时区

<CloudTimezone />
