---
id: nodejs
title: 云引擎 Node.js 运行环境
sidebar_label: Node.js
---

import CloudEnvironments from '../_partials/cloud-environments.mdx';
import BuildingScripts from '../_partials/building-scripts.mdx';

所有 Node.js 项目都必须在根目录包含一个 [package.json](https://docs.npmjs.com/cli/v7/configuring-npm/package-json) 才会被云引擎识别为 Node.js 项目，云引擎也会从中读取项目对于环境的需求：

```json title='package.json'
{
  "name": "node-js-getting-started",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js -- "
  },
  "dependencies": {
    "leancloud-storage": "^3.11.0",
    "leanengine": "^3.3.2"
  },
  "devDependencies": {
    "nodemon": "^1.18.7"
  },
  "engines": {
    "node": "12.x"
  }
}
```

如果你希望创建一个新的项目，请从我们的 [Node.js 示例项目](https://github.com/leancloud/node-js-getting-started) 开始。

## 启动命令

云引擎默认使用 `npm start` 来启动项目，你可以在 `package.json` 中修改 `scripts.start` 来使用不同的程序入口或向 `node` 添加额外的参数。

```json title='package.json'
{
  "scripts": {
    "start": "node server.js"
  }
}
```

:::note
在使用 [命令行工具] 本地调试时，`lean up` 会优先使用 `npm run dev` 来启动项目。
:::

## 配置 Node.js 版本

在 `package.json` 的 `engines.node` 字段可以指定 Node.js 版本：

```json title='package.json'
{
  "engines": {
    "node": "16.x"
  }
}
```

你还可以设置为 `*` 表示总是使用最新的稳定版本。

:::note
对于新创建的应用，如未设置 Node.js 版本，云引擎会默认使用最新的稳定版本。在 2021-09-02 之前创建的分组因兼容考虑会默认使用 `0.12` 版本。
:::

## 安装依赖（`package.json`）

云引擎会自动安装 `package.json` 中的依赖：

```json title='package.json'
{
  "dependencies": {
    "leancloud-storage": "^3.11.0",
    "leanengine": "^3.3.2"
  },
  "devDependencies": {
    "nodemon": "^1.18.7"
  }
}
```

在安装依赖的过程中，云引擎会正常触发 NPM 的生命周期脚本（[Life Cycle Scripts](https://docs.npmjs.com/cli/v7/using-npm/scripts#life-cycle-scripts)），如 `postinstall`、`prepare` 等。

:::note
如果存在 `package-lock.json`，云引擎会优先使用 `npm ci` 安装依赖（需要 Node.js 10 以上）。否则云引擎会使用 `npm install --production` 安装依赖（这意味着 `devDependencies` 中的依赖不会被安装）。
:::

:::note
如果存在 `yarn.lock`，云引擎会优先使用 `yarn` 安装依赖（需要 Node.js 4.8 以上）。如果不希望在线上使用 Yarn，请将它们加入 `.gitignore`（Git 部署时）或 `.leanengineignore`（命令行工具部署时）。请注意 `yarn.lock` 中包含了下载依赖的 URL，请选择合适的源，否则可能会增加构建时间。
:::

## 自定义构建过程

<BuildingScripts />

## 使用云引擎 SDK

## 使用数据存储服务

## 容量管理

## 云端环境

### 环境变量

<CloudEnvironments />

## FAQ
### 如何排查云引擎 Node.js 内存使用过高（内存泄漏）？

首先建议检查云引擎日志，检查每分钟请求数、响应时间、CPU、内存统计，查看是否存在其他异常情况，如果有的话，先解决其他的问题。如果是从某个时间点开始内存使用变高，建议检查这个时间点之前是否有部署新版本，然后检查新版本的代码改动或尝试回滚版本。

然后这里有一些常见的原因可供对照检查：

- 如果使用 cluster 多进程运行，内存使用会成倍增加（取决于运行几个 Worker）。
- 如果在代码中不断地向一个全局对象（或生命周期较长的对象）上添加新的对象或闭包的引用（例如某种缓存），那么在运行过程中内存使用会逐渐增加（即内存泄漏）。
- 如果响应时间增加（例如对请求的处理卡在慢查询、第三方网络请求），那么程序同时处理的请求数量会增加（即请求堆积），会占用很多内存。
- 也有可能是业务本身在增加，确实需要这么多内存。

如果还不能找到原因，可以尝试一些更高级的工具：

- [heapdump](https://github.com/bnoordhuis/node-heapdump) 或 [v8-profiler](https://github.com/node-inspector/v8-profiler)：可以导出一份内存快照，快照文件可以被下载到本地，通过 Chrome 打开，可以看到内存被哪些对象占用。如果能在本地复现的话，建议尽量在本地运行，如需线上运行则你需要自己编码实现发送信号、下载快照文件等功能。
- `--trace_gc`：可以在 GC 时在标准输出打印简要的日志，包括 GC 的类型、耗时，GC 前后的堆体积和对象数量（在 `package.json` 的 `scripts.start` 里改成 `node --trace_gc server.js` 来开启）。

其他参考资料（第三方）：

- [Node.js 调试 GC 以及内存暴涨的分析](https://blog.devopszen.com/node-js_gc)
- [Node.js Performance Tip: Managing Garbage Collection](https://strongloop.com/strongblog/node-js-performance-garbage-collection/)
- [Node.JS Profile 1.2 V8 GC 详解](https://xenojoshua.com/2018/01/node-v8-gc/)

### 如何排查云引擎 Node.js CPU 使用过高（响应缓慢）？

首先建议检查云引擎日志，检查每分钟请求数、响应时间、CPU、内存统计，查看是否存在其他异常情况，如果有的话，先解决其他的问题。如果是从某个时间点开始 CPU 使用变高，建议检查这个时间点之前是否有部署新版本，然后检查新版本的代码改动或尝试回滚版本。

然后这里有一些常见的原因可供对照检查：

- 如果内存使用率较高、或频繁分配和释放大量对象，那么 GC 会占用一些 CPU 也会导致卡顿，可以用 `--trace_gc` 打开 GC 日志来确认 GC 的影响。
- 程序中有死循环或失去控制（数量不断增加）的 setTimeout 或 setInterval。
- 也有可能是业务本身在增加，确实需要这么多 CPU。

因为 Node.js 是基于单线程的事件循环模型，如果事件循环中新的任务一直得不到执行（即事件循环被「阻塞」），那么就会造成 CPU 不高，但响应缓慢或不响应的情况。导致事件循环被阻塞的场景情况包括：

- 密集的纯计算，例如执行时间非常长的同步循环、序列化（JSON 等）、复杂的数学（密码学）运算、复杂度非常高的正则表达式。
- 同步的 IO 操作，例如 `fs.readFileSync`、`child_process.execSync` 或含有这些同步操作的第三方包（例如 `sync-request`）。
- 不断向事件循环中添加新的任务，例如 `process.nextTick` 或 `setImmediate`，导致事件队列中的任务一直执行不完。

其他会导致 Node.js 响应慢或不响应的情况：

- 使用了 Node.js 中底层采用线程数实现的 API，包括 `dns.lookup`（多数 HTTP 客户端间接使用了该函数）、所有文件系统 API，如果大量使用这些 API 或这些操作非常慢，则会产生额外的等待。

如果能不能找到原因，可以尝试一些更高级的工具：

- `node --prof`：可以统计程序中每一个函数的执行耗时和调用关系，导出一份日志文件，可以用 `node --prof-process` 来生成一份报告，包括占用 CPU 时间最多的函数（包括 JavaScript 和 C++ 部分）列表。`node --prof` 对性能本身的影响很大，长时间运行生成的日志也很大，建议尽量在本地运行，如需在线上运行则需要你自己编码实现生成报告、下载报告等功能。
- [v8-profiler](https://github.com/node-inspector/v8-profiler)：可以生成一份 CPU 日志，可以下载到本地后通过 Chrome 打开，可以看到每个函数的执行时间和调用关系。v8-profiler 对性能本身的影响很大，长时间运行生成的日志也很大，建议尽量在本地运行，如需在线上运行则需要你自己编码实现开始生成日志、下载报告等功能。

其他参考资料（第三方）：

- [不要阻塞你的事件循环](https://nodejs.org/zh-cn/docs/guides/dont-block-the-event-loop/)
- [Node.JS Profile 4.1 Profile 实践](https://xenojoshua.com/2018/02/node-profile-practice/)
- [手把手测试你的 JS 代码性能](https://cnodejs.org/topic/58b562f97872ea0864fee1a7)
- [Speed Up JavaScript Execution](https://developers.google.com/web/tools/chrome-devtools/rendering-tools/js-execution)
