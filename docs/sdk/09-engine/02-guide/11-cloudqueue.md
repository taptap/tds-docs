---
id: cloudqueue
title: 云队列指南 
sidebar_label: 云队列
---

# 云队列指南

云队列提供了一种在云引擎之外调度云函数的能力，它基于云引擎已有的「云函数」这个概念实现了重试、去重、结果查询、延时任务、定时任务等功能，是对云函数功能的一个补充。尚未运行的任务会以一种可靠的方式暂存在云队列，即使你的云引擎因部署、过载、崩溃而重启，任务也不会丢失，云队列会等待你的云引擎实例恢复正常后继续运行它们。

目前云队列还是一个实验性功能，可以免费使用，在正式上线后将会是一项单独计费的功能，因为云队列被设计用于应对突发流量，所以收费的指标将会与「每小时入队任务数量（对应队列的处理能力）」和「队列内剩余任务峰值（对应队列空间的占用）」相关，按实际用量计费，不需要预估容量。

云队列实际上运行在云引擎之外，它通过 HTTP 接受入队等操作，同时也通过 HTTP 来调用云引擎容器中的云函数来完成实际的任务执行，我们的 SDK 会封装这些细节。云队列的入队接口（`Cloud.enqueue`）目前仅限在云引擎内使用 masterKey 权限调用（后续可能会开放客户端调用）；结果查询接口（`Cloud.getTaskInfo`）则允许客户端直接使用 uniqueId 调用。

## 功能和使用场景

云队列提供的功能包括：

- **重试** 任务在执行失败后会默认进行一次重试，可以通过选项来配置重试次数（`attempts`）和重试间隔（`backoff`），重试时 uniqueId 不会改变。
- **去重** 可以为任务提供唯一 ID（`uniqueId`，如不提供则会随机生成），在任务存在于队列期间（包括已完成的），云队列不会接受有 uniqued 的任务。
- **结果查询** 任务在完成后会继续被保留在队列中一段时间（可通过 `keepResult` 配置），客户端可以使用 uniqueId 来进行高性能的结果查询。
- **延时任务** 可以通过 `delay` 来延迟执行一个任务。
- **定时任务** 现在定时任务是云队列的一个子功能，你可以在控制台上创建和管理任意数量的定时任务，可以使用 [CORN 表达式](#CORN_表达式) 或设置间隔时间。
- **并发控制** 云队列会将入队的任务暂存起来，以 1 个并发的速度逐步地执行，避免云引擎实例过载（后续我们会引入更智能的并发调节算法）。
- **优先级** 可以为特定任务设置优先级（`priority`），在队列拥堵时，高优先级的任务会优先执行。

你可以在 [leanengine-nodejs-demos](https://github.com/leancloud/leanengine-nodejs-demos) 中找到一些有关云队列的示例：

- [queue-delay-retry](https://github.com/leancloud/leanengine-nodejs-demos/blob/master/functions/queue-delay-retry.js) 延时和重试云函数
- [queue-result-query](https://github.com/leancloud/leanengine-nodejs-demos/blob/master/functions/queue-result-query.js) 结果查询
- [crawler](https://github.com/leancloud/leanengine-nodejs-demos/blob/master/functions/crawler.js) 抓取一个站点下所有网页的爬虫（去重和控制并发）

## 简单使用

```javascript
const {Cloud} = require('leanengine')

// 被执行的云函数，这里只是一个例子，实际业务中注意鉴权
Cloud.define('closeOrder', async function({params}) {
  try {
    const order = await new Query('Order').get(params.id)
    // 返回值可用于后续的结果查询，也会被记录到日志中
    return await order.save({status: 'closed'})
  } catch (err) {
    // 抛出异常使云函数执行失败（JavaScript 自身或依赖库的异常也会使云函数执行失败）
    throw new Cloud.Error(`Some error happened: ${err.message}`)
  }
})

// 添加任务，enqueue 本身在添加队列成功就返回一个 uniqueId（不等待任务实际被执行）
// 你可以在所有云引擎代码（包括云函数也包括网站托管中的自定义路由）使用 Cloud.enqueue
const {uniqueId} = await Cloud.enqueue('closeOrder', {id: 1234})

// 查询任务结果，可将 uniqueId 发给客户端，由客户端进行查询
// 只有存在于队列中的任务才能查询，可以用 keepResult 来调整已完成任务的保留时间
console.log(await Cloud.getTaskInfo(uniqueId))

// 调整默认选项，增加重试次数，减少重试间隔
Cloud.enqueue('closeOrder', {id: 1234}, {attempts: 10, backoff: 10000})

// 添加延时任务，closeOrder 会在一分钟之后执行
Cloud.enqueue('closeOrder', {id: 1234}, {delay: 600000})

// 指定 uniqueId，如果已有相同 uniqueId 的任务会抛出异常
// 只有存在于队列中的任务会参与去重，可以用 keepResult 来调整已完成任务的保留时间
Cloud.enqueue('closeOrder', {id: 1234}, {uniqueId: '1234'})
```

如果你希望某个云函数仅限被云队列调用（而不允许客户端直接调用）的话，可以为 `Cloud.define` 加上 [`internal` 选项](https://github.com/leancloud/leanengine-node-sdk/blob/master/API.md#avclouddefine)，通过这种方式定义的云函数只能被 Cloud Queue 或其他具有 masterKey 权限的代码调用。

## API

目前我们只在 Node SDK（3.4 以上版本）添加了云队列支持：

```
Cloud.enqueue(functionName, params, options?): Promise<{uniqueId: string}>
Cloud.getTaskInfo(uniqueId): Promise<TaskInfo>
```

用法：

```javascript
const {Cloud} = require('leanengine')

// 添加任务，enqueue 本身在添加队列成功就返回一个 uniqueId（不等待任务实际被执行）
const {uniqueId} = await Cloud.enqueue('sendMail', {userId: 1234})

// 延时任务
Cloud.enqueue('closeOrder', {id: 1234}, {delay: 600000})

// 查询任务结果
console.log(await Cloud.getTaskInfo(uniqueId))
```

`options` 的属性包括：

- `attempts?: number`：最大重试次数，默认 `1`
- `backoff?: number`：重试间隔（毫秒），默认 `60000`（一分钟）
- `delay?: number`：延时执行（毫秒）
- `deliveryMode?: string`：超时时的行为，值是 `atLeastOnce`（至少一次，可能会重试多次）、`atMostOnce`（至多一次，不会重试），默认是 `atLeastOnce`
- `keepResult?: number` 在队列中保留结果的时间（毫秒），默认 `300000`（五分钟）
- `priority?: number`：优先级，默认是当前时间戳，设置为更小的值可以在队列拥堵时让特定任务更快地被执行
- `timeout?: number`：超时时间（毫秒），默认 `15000`，目前最大也是 `15000`，后续会提供更长的时间
- `uniqueId?: string`：任务的唯一 ID，会据此进行去重，最长 32 个字符，默认是随机的 UUID

`TaskInfo` 的属性包括：

- `uniqueId: string`：任务的唯一 ID
- `status: string`：任务的状态，包括 `queued`（等待或正在执行）、`success`（执行成功）、`failed`（执行失败）

执行完成的 `TaskInfo` 会有：

- `finishedAt?: string` 执行完成（成功或失败）的时间
- `statusCode?: number` 云函数响应的 HTTP 状态码
- `result?: object` 来自云函数的响应

执行失败的 `TaskInfo` 会有：

- `error?: string` 错误提示
- `retryAt?: string` 下次重试的时间

## 性能和可靠性

云队列的入队接口（`Cloud.enqueue`）被设计用于应对较高的突发流量（例如 1000 QPS 以上），云队列会将这些任务存储起来，以 1 个并发的速度逐步地执行，减少对于云引擎容器的压力。

云队列的调度并非在云引擎容器中进行，这意味着即使云引擎容器故障、重启也不会影响到云队列（任务不会丢失，失败的任务会重试），可以用于支持突发流量。同时任务本身又是以云函数的形式在云引擎容器中运行的（占用云引擎的 CPU、内存资源），和直接调用云函数的执行环境完全相同。

## 拥堵和排队

如果执行任务的并发达到了上限，那么新的任务（包括延时任务和形式任务的触发）会进入到一个抽象的「等待队列」中，每当有正在执行的任务完成了，就会从等待队列中抽取优先级最高（`priority` 值最低）的任务来执行。

priority 的值默认是入队时（对于定时任务则为触发时）的毫秒时间戳（例如 `2019-05-20T17:32:07.166+08:00` 的时间戳是 `1558344727166`），也就是说默认情况下等待队列中的任务会按时间顺序被执行。你可以覆盖 priority 的值，改为一个较小的值来让重要的任务尽快地被执行；或改成一个较大的值让任务更迟执行。

## CRON 表达式

CRON 表达式的基本语法为：

```
秒 分钟 小时 日期 day-of-month 月份 星期 day-of-week
```

位置 | 字段 | 约束 | 取值 | 可使用的特殊符号
---|---|---|---|---
1| 秒 | 必须 |0-59|`, - * /`
2| 分钟 | 必须 |0-59|`, - * /`
3| 小时 | 必须 |0-23（0 为午夜）|`, - * /`
4| 日期 | 必须 |1-31|`, - * ? /`
5| 月份 | 必须 |1-12、JAN-DEC|`, - * /`
6| 星期 | 必须 |1-7、SUN-SAT|`, - ? /`

特殊符号的用法：

符号 | 含义 | 用法
---|---|---
`*`| 所有值 | 代表一个字段的所有可能取值。如将 `分钟` 设为 **\***，表示每一分钟。
`?`| 不指定值 | 用于可以使用该符号的两个字段中的一个，在一个表达式中只能出现一次。如任务执行时间为每月 10 号，星期几无所谓，那么表达式中 `日期` 设为 **10**，`星期` 设为 **?**。
`-`| 范围 | 如 `小时` 为 **10-12**，即 10 点、11 点、12 点。
`,`| 分隔多个值 | 如 `星期` 为 **MON,WED,FRI**，即周一、周三、周五。
`/`| 间隔 | 如 `秒` 设为 **\*/15**，即表示每隔 15 秒执行一次，包括 0、15、30、45 秒。

各字段以空格或空白隔开。`JAN-DEC`、`SUN-SAT` 这些值不区分大小写，比如 `MON` 和 `mon` 效果一样。

举例如下：

表达式 | 说明
---|---
`0  */5 * * * ?`| 每隔 5 分钟执行一次
`10 */5 * * * ?`| 每隔 5 分钟执行一次，每次执行都在分钟开始的 10 秒，例如 10:00:10、10:05:10 等等。
`0 30 10-13 ? * WED,FRI`| 每周三和每周五的 10:30、11:30、12:30、13:30 执行。
`0 */30 8-9 5,20 * ?`| 每个月的 5 号和 20 号的 8 点和 10 点之间每隔 30 分钟执行一次，也就是 8:00、8:30、9:00 和 9:30。

Cron 表达式的时区为东八区（国内版）、UTC 零时区（国际版）。

## 测试期间的限制

在测试期间我们有一些默认的限制：

- 入队请求限制为每应用 100 QPS
- 每天入队请求限制为每应用 10000
- 队列中的最大任务数量限制为每应用 1000

如果你达到了这些限制的话可以联系我们的技术支持。

## FAQ

### 接下来还会有什么功能？

这里列出的是后续可能会实施的一些计划，如果你非常需要其中某个功能，请通过工单或论坛联系我们，让我们知道。

- **允许客户端调用** 我们有计划为用户提供一个「允许客户端调用云队列」的选项，开启这个选项后客户端将会可以进行入队操作（`Cloud.enqueue`），但客户端不能指定 `options` 中的任何选项，只能传递参数。
- **超时时间** 因为之前我们的云函数一直将超时时间限制在 15 秒，所以目前云队列受限于云函数，超时也是 15 秒。我们正在调整相关的基础设施，计划在后续让从云队列调用云函数的超时时间最长可以达到 5 分钟。
- **并发限制** 目前所有应用的并发限制都是 1，我们有计划实现一种自动控制并发的机制：在任务较多的情况下，并发会逐渐增加，直到负载体现在实例的 CPU 或内存压力上。
- **使用单独的分组运行任务** 我们有计划为用户提供一个「在独立分组中运行定时任务」的选项，开启这个选项后会自动创建一个特殊分组，所有定时任务都在这个分组中运行。
- **定时任务的可编程接口** 我们有计划为定时任务提供可编程接口，但优先级较低。
- **云队列的日志** 目前云队列会将执行日志直接打印到云引擎的应用日志中，后续我们准备把云队列的日志显示在一个单独的 Tab 中。
- **在其他 SDK 中使用云函数** 后续我们会在 Python SDK、Java SDK、PHP SDK 中添加云队列的支持。

### 异常处理策略（deliveryMode）具体影响哪些情况？

异常处理策略（deliveryMode）用于在以下几种不确定任务是否已经执行或是否应该执行的情况下，来决定是否重试：

- 云队列已将请求发到云函数，但云函数未在超时时间内给出成功或失败的响应。
- 因云队列本身的故障导致失去对正在执行的任务的追踪。
- 因云队列本身的故障导致定时任务没有在指定的时间触发。

如果选择「放弃（atMostOnce）」在出现上述情况时任务可能不会执行；如果选择「重试（atLeastOnce）」在发生上述情况时任务可能会执行多次。

### 如何在本地调试时使用云队列？

你可以在本地调试时远程调用云队列相关的 API，但云队列只会在线上的云引擎中运行指定的云函数。
