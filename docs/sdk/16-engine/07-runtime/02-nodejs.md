---
id: nodejs
title: 云引擎 Node.js 运行环境
sidebar_label: Node.js
---

import CloudEnvironments from '../_partials/cloud-environments.mdx';
import CloudTimezone from '../_partials/cloud-timezone.mdx';
import CloudLoadBalancer from '../_partials/cloud-load-balancer.mdx';
import BuildingScripts from '../_partials/building-scripts.mdx';
import BuildingBuildLogs from '../_partials/building-build-logs.mdx';
import NodejsSetupRuntime from '../_partials/nodejs-setup-runtime.mdx';
import NodejsSetupDependencies from '../_partials/nodejs-setup-dependencies.mdx';
import CloudCustomDomain from '../_partials/cloud-custom-domain.mdx';

:::info
这篇文档是针对 Node.js 运行环境的深入介绍，如希望快速地开始使用云引擎，请查看 [云引擎开发指南 § 快速开始](/sdk/engine/cloud-engine#快速开始)。
:::

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
    "node": "16.x"
  }
}
```

如果你希望创建一个新的项目，推荐从我们的 [Node.js 示例项目](https://github.com/leancloud/node-js-getting-started) 开始。

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

<NodejsSetupRuntime />

## 安装依赖（`package.json`）

<NodejsSetupDependencies />

## 自定义构建过程

<BuildingScripts />

### 构建日志

<BuildingBuildLogs />

### 系统级依赖

在云引擎的线上环境中，你可以通过 `leanengine.yaml` 文件的 `systemDependencies` 部分来自定义系统级依赖：

```yaml title='leanengine.yaml'
systemDependencies:
  - imagemagick
```

目前支持的选项包括：

- `ffmpeg` 一个音视频处理工具库。
- `imagemagick` 一个图片处理工具库。
- `fonts-wqy` 文泉驿点阵宋体、文泉驿微米黑，通常和 `phantomjs` 或 `chrome-headless` 配合来显示中文。
- `fonts-noto` 思源黑体（体积较大）。
- `phantomjs` 一个无 UI 的 WebKit 浏览器（该项目已停止维护）。
- `chrome-headless` 一个无 UI 的 Chrome 浏览器（体积很大，会显著增加部署耗时，运行时也会消耗大量 CPU 和内存；如果使用 `puppeter` 的话，需要给 `puppeteer.launch` 传递这些参数：`{executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox', '--disable-setuid-sandbox']}`；暂不支持 Java）。
- `node-canvas` 安装 `node-canvas` 所需要的系统级依赖（你仍需要安装 `node-canvas`）。
- `python-talib` 金融市场数据分析库。

:::caution
注意添加系统依赖将会显著增加部署耗时，因此请不要添加未用到的依赖。
:::

## 健康检查

云引擎目前主要为 Web 应用优化，应用在启动后需要在环境变量 `LEANCLOUD_APP_PORT` 中指定的端口上提供 HTTP 服务，注意需要监听在 `0.0.0.0` 地址（所有接口）上，而不是一些框架默认的 `127.0.0.1`。

在应用部署时，云引擎的管理程序会每隔一秒去检查应用是否启动成功，如果超过启动时间限制仍未启动成功，即认为启动失败，部署会中止。在之后的运行过程中，也会有定期的健康检查来确保应用正常运行，如果健康检查失败，云引擎管理程序会自动重启你的应用。

健康检查会通过 HTTP 检查应用的首页（`/`），如果返回 HTTP 2xx 的响应，就视作成功。

<details>
<summary>点击展开健康检查与云引擎 SDK 的关联</summary>

云引擎还会尝试检查由 SDK 处理的 `/__engine/1/ping`，如果 SDK 接入正确，便不再要求首页（`/`）返回 HTTP 2xx。

如果 **开发者中心 » 你的游戏 » 游戏服务 » 云服务 » 云引擎 » 你的分组 » 设置 » 云函数模式** 设置为「开启」或 `leanengine.yaml` 中 `functionsMode` 设置为 `strict`，云引擎会检查 SDK 是否被正确地接入，否则会视作启动失败。

</details>

## 云引擎 SDK
云引擎 SDK 提供了云函数和 Hook 等功能的支持，但并不是必须的。

### 接入云引擎 SDK
我们的示例项目默认已经接入了 SDK，如果你需要将云引擎 SDK 接入到已有的项目中的的话，需要先使用 NPM 安装：

```sh
npm install leanengine leancloud-storage
```

然后在代码中将云引擎中间件挂载到 Express 框架上：

```js title='app.js'
var express = require('express');
var AV = require('leanengine');

AV.init({
  appId: process.env.LEANCLOUD_APP_ID,
  appKey: process.env.LEANCLOUD_APP_KEY,
  masterKey: process.env.LEANCLOUD_APP_MASTER_KEY
});

var app = express();
app.use(AV.express());
app.listen(process.env.LEANCLOUD_APP_PORT);
```

其中，`AV.express` 接受一个可选参数 `options`，`options` 是一个对象，目前支持以下两个可选属性：

- `onError`：全局错误处理函数，云函数（包括 Hook 函数）抛出异常时会调用该函数。该函数的使用场景包括统一发送错误报告。
- `ignoreInvalidSessionToken`：布尔值，为真时忽略客户端发来的错误的 `sessionToken`（`X-LC-session` 头），为假时抛出 `401` 错误 `{"code": 211, "error": "Verify sessionToken failed, maybe login expired: ..."}`。客户端 SDK 发送请求时会统一发送 `X-LC-session` 头（其中指定了 `sessionToken`），`sessionToken` 可能因种种原因失效，而云函数在很多情况下并不关心 `sessionToken`。因此，云引擎提供了 `ignoreInvalidSessionToken` 这个选项，设为真时忽略 `sessionToken` 错误。反之，如果该选项设为假，客户端收到相应报错时，需要重新登录。

关于云引擎 SDK 的详细 API 文档见 [LeanEngine Node SDK · API.md](https://github.com/leancloud/leanengine-node-sdk/blob/master/API.md)。

<details>
<summary>点击展开 Koa 等更多框架</summary>

#### Koa

```js title='app.js'
var koa = require('koa');
var AV = require('leanengine');

AV.init({
  appId: process.env.LEANCLOUD_APP_ID,
  appKey: process.env.LEANCLOUD_APP_KEY,
  masterKey: process.env.LEANCLOUD_APP_MASTER_KEY
});

var app = koa();
app.use(AV.koa());
app.listen(process.env.LEANCLOUD_APP_PORT);
```

#### http 模块

```js
require('http').createServer(function (req, res) {
  if (req.url == '/') {
    res.statusCode = 200;
    res.end();
  } else {
    res.statusCode = 404;
    res.end();
  }
}).listen(process.env.LEANCLOUD_APP_PORT);
```

</details>

<details>
<summary>点击展开 Node SDK 不同版本的差异</summary>

Node SDK 的历史版本：

- `0.x`：最初的版本，对 Node.js 4.x 及以上版本兼容不佳，建议用户参考[升级到云引擎 Node.js SDK 1.0](https://leancloud.cn/docs/leanengine-node-sdk-upgrade-1.html) 来更新。
- `1.x`：彻底废弃了全局的 `currentUser`，依赖的 JavaScript 也升级到了 1.x 分支，支持了 Koa 和 Node.js 4.x 及以上版本。
- `2.x`：提供了对 Promise 风格的云函数、Hook 写法的支持，移除了一些被弃用的特性（`AV.Cloud.httpRequest`），不再支持 Backbone 风格的回调函数。
- `3.x`：**推荐使用** 的版本，指定 JavaScript SDK 为 peer dependency（允许自定义 JS SDK 的版本），升级 JS SDK 到 3.x。

详见 Node.js SDK 的 [更新日志](https://github.com/leancloud/leanengine-node-sdk/releases)。

</details>

### 使用数据存储服务

在云引擎中你可以使用云服务提供的数据存储作为应用的后端数据库，以及使用其他云服务提供的功能。
SDK 可以让你更加方便地使用这些功能。

建议使用云引擎模板项目。
模板项目已经集成了 SDK，也包含了初始化 SDK 的逻辑，可以直接使用。

建议在客户端（浏览器端、移动端）登录用户，调用 SDK 的接口获取 session token。
对于需要后端以当前用户的身份完成的操作，客户端通过 HTTP Header 等方式将 session token 发送给后端。

参见[数据存储指南](/sdk/storage/guide/dotnet/)。

### CookieSession

如果你的页面主要是由服务器端渲染（例如使用 EJS、Pug），在前端不需要使用 JavaScript SDK 进行数据操作，那么可以我们提供的一个 `CookieSession` 中间件，在 Cookie 中维护用户状态：

```js
app.use(AV.Cloud.CookieSession({ secret: 'my secret', maxAge: 3600000, fetchUser: true }));
```

Koa 需要添加一个 `framework: 'koa'` 的参数：

```js
app.use(AV.Cloud.CookieSession({ framework: 'koa', secret: 'my secret', maxAge: 3600000, fetchUser: true }));
```

:::danger

使用 `CookieSession` 的同时需要添加 CSRF Token 来 [防御 CSRF 攻击](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html)。

:::

你需要传入一个 `secret` 用于签名 Cookie（必须提供），这个中间件会将 `AV.User` 的登录状态信息记录到 Cookie 中，用户下次访问时自动检查用户是否已经登录，如果已经登录，可以通过 `req.currentUser` 获取当前登录用户。

`AV.Cloud.CookieSession` 支持的选项包括：

- **fetchUser**：是否自动 `fetch` 当前登录的 `AV.User` 对象。默认为 `false`。如果设置为 `true`，每个 HTTP 请求都将发起一次 LeanCloud API 调用来 `fetch` 用户对象。如果设置为 `false`，默认只可以访问 `req.currentUser` 的 `id`（`_User` 表记录的 `objectId`）和 `sessionToken` 属性，你可以在需要时再手动 `fetch` 整个用户。
- **name**：Cookie 的名字，默认为 `avos.sess`。
- **maxAge**：Cookie 的过期时间。单位为毫秒。

在 Node SDK 1.x 之后我们不再允许通过 `AV.User.current()` 获取登录用户的信息，而是需要你：

- 通过 `request.currentUser` 获取用户信息。
- 在后续的方法调用显式传递 user 对象。

<details>
<summary>点击展开一个具有登录功能的站点的例子</summary>

```js
app.post('/login', function (req, res) {
  AV.User.logIn(req.body.username, req.body.password).then(function (user) {
    res.saveCurrentUser(user); // save cookie
    res.redirect('/profile');
  }, function (error) {
    res.redirect('/login');
  });
})

app.get('/profile', function (req, res) {
  if (req.currentUser) {
    res.send(req.currentUser);
  } else {
    res.redirect('/login');
  }
});

app.get('/logout', function (req, res) {
  req.currentUser.logOut();
  res.clearCurrentUser(); // clear cookie
  res.redirect('/profile');
});
```

</details>

## 云端环境

### 绑定自定义域名

<CloudCustomDomain />

### 负载均衡和加速节点

<CloudLoadBalancer only='nodejs' />

### 环境变量

<CloudEnvironments />

### 日志

应用的日志可以直接输出到「标准输出」或者「标准错误」，这些信息会分别对应日志的 `info` 和 `error` 级别，比如下列代码会在 info 级别记录参数信息：

```js
console.log('hello');
console.error('some error!');
```

日志单行最大 4096 个字符，多余部分会被丢弃；日志输出频率大于 600 行/分钟，多余的部分会被丢弃。

### 时区

<CloudTimezone />

### 文件系统

你可以向 `/home/leanengine` 或 `/tmp` 目录写入临时文件，最多不能超过 1 GB。

:::caution
云引擎每次部署都会产生一个新的容器，即使不部署系统偶尔也会进行一些自动调度，这意味着你 **不能将本地文件系统当作持久的存储**，只能用作临时存储。
:::

如果你写入的文件体积较大，建议在使用后自动删除他们，否则如果占用磁盘空间超过 1 GB，继续写入文件可能会收到类似 `Disk quota exceeded` 的错误，这种情况下你可以重新部署一下，这样文件就会被清空了。

### 出入口 IP 地址
如果开发者希望在第三方服务平台（如微信开放平台）上配置 IP 白名单而需要获取云引擎的入口或出口 IP 地址，请进入 **开发者中心 > 你的游戏 > 游戏服务 > 云服务 > 云引擎 > 云引擎分组 > 设置 > 出入口 IP** 来自助查询。

我们会尽可能减少出入口 IP 的变化频率，但 IP 突然变换的可能性仍然存在。因此在遇到与出入口 IP 相关的问题，我们建议先进入控制台来核实一下 IP 列表是否有变化。

如需保持入口 IP 不变，建议为云引擎绑定独立 IP。

## 疑难问题
### 排查云引擎 Node.js 内存使用过高（内存泄漏）

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

### 排查云引擎 Node.js CPU 使用过高（响应缓慢）

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
