---
id: faq
title: 云引擎 FAQ
sidebar_label: FAQ
---

import MultiLang from '/src/docComponents/MultiLang';

## 云引擎功能

### 云引擎都支持哪些语言

目前支持 Node.js、Python、Java、PHP、.Net、Go 运行环境，也支持基于 Node.js 的 Web 前端项目，未来可能还会引入其他语言，详见 [云引擎服务总览](/sdk/engine/overview/)。

### 云引擎支持托管纯静态网站吗

支持，请看 [云引擎 Web 前端应用运行环境](/sdk/engine/deploy/webapp/)。

### 云引擎支持 HTTPS 吗

- 自定义域名在绑定时启用 SSL 即可支持 HTTPS。
- 如需配置自动跳转，请看 [云引擎下如何重定向到 HTTPS？](#云引擎下如何重定向到-https？)。

<<<<<<< HEAD:docs/sdk/16-engine/07-faq.md
<<<<<<< HEAD
### 部署更新云引擎会导致服务中断吗？

服务不会中断。在代码部署时，系统会优先启动使用新版本代码的实例，待新实例通过了健康检查，系统修改路由将请求转发至新实例后，再关闭旧版本的实例，让服务保持零中断。

## 云函数

### 云函数有哪些限制？

云函数是 LeanCloud 提供的一个 **相对受限** 的自定义服务器端逻辑的功能，和我们的 SDK 有比较 **深度的集成**。我们将云函数设计为一种类似 **RPC** 的机制，在云函数中你只能关注参数和结果，而不能自定义超时时间、HTTP Method、URL，不能读取和设置 Header。如果希望更加自由地使用这些 HTTP 的语义化功能，或者希望使用第三方的框架提供标准的 RESTful API，请使用云引擎的网站托管功能自行来处理 HTTP 请求。

### 云函数可以同时存在于多个分组么？

云引擎会自动将一个应用下的云函数请求转发到正确的分组，因此你可以同时在多个分组下使用云函数。

### 项目部署成功了，但云函数和 Hook 不可用？

为了支持云引擎的云函数和 Hook 功能，云引擎的管理程序会使用 `/1.1/functions/_ops/metadatas` 这个 URL 和 SDK 交互，请确保将这个 URL 交给 SDK 处理。
默认情况下，云引擎会尝试从 `/1.1/functions/_ops/metadatas` 获取云函数和 Hook 的元信息，如果失败，则云函数和 Hook 功能不可用，但不会中断部署。
如果希望在获取元信息失败后中断部署，可以在 `leanengine.yaml` 文件中指定 `functionsMode` 为 `strict`。
如果应用不使用云函数和 Hook 功能，那么你可以：

- 在 `leanengine.yaml` 中不指定 `functionsMode`，同时 `/1.1/functions/_ops/metadatas` **返回一个 HTTP `404`** 表示不使用云函数和 Hook 相关的功能；
- 或者在 `leanengine.yaml` 中指定 `functionsMode` 为 `disabled`。注意，这种情况下，即使应用代码中定义了云函数和 Hook，Hook 也不会生效，云函数调用（通过 SDK 发起远程调用或通过 REST API 向 API 域名发起云函数调用）有可能因为被转发到错误的云引擎分组而失败。

### 部署中断，提示有同名云函数怎么办？

云引擎支持多个分组。
如果当前部署代码中部分云函数与其他组的同名，默认情况会提示错误并中断部署，防止意外重复定义云函数。
我们建议你移除不需要的云函数，毕竟重复定义的云函数并不易于理解和维护。
不过，你也可以通过在每次部署时额外指定 `--overwrite-functions` 参数强制替换其他组云函数的实现。

### 为什么 Class Hook 没有被运行？

首先确认一下 Hook 被调用的时机是否与你的理解一致：

* `beforeSave`：对象保存或创建之前
* `afterSave`：对象保存或创建之后
* `beforeUpdate`：对象更新之前
* `afterUpdate`：对象更新之后
* `beforeDelete`：对象删除之前
* `afterDelete`：对象删除之后
* `onVerified`：用户通过邮箱或手机验证后
* `onLogin`：用户在进行登录操作时（`become(sessionToken)` 不是登录操作，因此不会调用 `onLogin`）

还需注意在本地进行云引擎调试时，运行的会是线上预备环境的 Hook，如果没有预备环境则不会运行。

然后检查 Hook 函数是否被执行过：

可以先在 Hook 函数的入口打印一行日志，然后进行操作，再到云引擎日志中检查该行日志是否被打印出来，如果没有看到日志原因可能包括：

* 代码没有被部署到正确的应用
* 代码没有被部署到生产环境（或没有部署成功）
* Hook 的类名不正确

如果日志已打出，则继续检查函数是否成功，检查控制台上是否有错误信息被打印出。如果是 before 类 Hook，需要保证 Hook 函数在 15 秒内结束，否则会被系统认为超时。

after 类 Hook 超时时间为 3 秒，如果你的体验实例已经休眠，很可能因为启动时间过长无法收到 after 类 Hook，建议升级到云引擎的标准实例避免休眠。

### 可以在云函数中未登录的情况下查询 _User 表吗？

在云函数里可以用 masterKey 跳过权限检查，未登录也可直接查询 _User 表。

因为云引擎运行在可信的服务器端环境中，所以你可以全局开启超级权限（`Master Key`），这样云端会跳过包括 ACL 和 Class 权限在内的检查，让你自由地操作所有云存储中的数据。具体细节可以参考 [云函数开发指南 § 使用超级权限](/sdk/engine/functions/guides#使用超级权限)。

## 部署

### 云引擎的启动限制时间是多久？

你的应用在启动时，云引擎的管理程序会每秒去检查你的应用是否启动成功，如果超过启动时间限制仍未启动成功，即认为启动失败。
启动时间限制默认为 30 秒，如需延长或缩短，可以在 leanengine.yaml` 文件中指定 `startupTimeout`，可设置范围为 15 – 120 秒。

### 多次部署同一个项目时镜像大小为什么差别那么大？

云引擎底层有一套缓存机制以加速构建过程，所以部署时显示的「存储镜像到仓库」后面的大小表示本次构建新产生的数据，可用于评估是否利用到了缓存，不代表整个项目的大小。

### 云引擎中设置的环境变量无效？

默认情况下，应用在运行阶段才能够读取到内置环境变量和自定义环境变量。
如果希望在安装依赖或编译阶段就能读取到这些环境变量，需要在 `leanengine.yaml` 里设置：

```yaml
exposeEnvironmentsOnBuild: true
```

### 部署时长时间卡在「正在下载和安装依赖」怎么办？

这个步骤对应在云端调用各个语言的包管理器（`npm`、`pip`、`composer`、`maven`）安装依赖的过程，我们有一个依赖缓存机制来加速这个安装过程，但缓存可能会因为很多原因失效（比如修改了依赖列表），在缓存失效时会比平时慢很多，请耐心等待。如果你在 `leanengine.yaml` 中指定了系统依赖也会在这个步骤中安装，因此请不要添加未用到的依赖。

对于 Node.js 建议检查是否在 `package-lock.json` 或 `yarn.lock` 中指定了较慢的源。

### 部署到多个实例时，部分实例失败需要重新部署吗？

同一环境（预备／生产）下有多个实例时，云引擎会同时在所有实例上部署项目。如因偶然因素部分实例部署不成功，会在几分钟后自动尝试再次部署，无需手动重新部署。

### 云引擎实例部署后控制台多次显示「部署中」是怎么回事？

控制台显示的「部署中」状态泛指所有运维操作，例如唤醒休眠实例、服务器偶发故障引起的重新部署，不只是用户主动进行的部署。

### 云引擎的健康检查是什么？

云引擎的管理系统会每隔几分钟检查所有实例的工作状态（通过 HTTP 检查，详见具体运行环境文档的「健康检查」小节），
如果实例无法正确响应的话，管理系统会触发一次重新部署，并在控制台上打印类似下面的日志：

> 健康检查失败：web1 检测到 Error connect ECONNREFUSED 10.19.30.220:51797

如果一周内发生一两次属正常现象（有可能是我们的服务器出现偶发的故障，因为会立刻重新部署，对服务影响很小），如果频繁发生可能是你的程序资源不足，或存在其他问题（运行一段时间后不再响应 HTTP 请求），需结合具体情况来分析。

## 限制和费用
=======
## 限制和费用
=======
### 部署更新云引擎会导致服务中断吗？
>>>>>>> 9aef831 (:sparkles: Organize faq):docs/sdk/15-engine/07-faq.md

服务不会中断。在代码部署时，系统会优先启动使用新版本代码的实例，待新实例通过了健康检查，系统修改路由将请求转发至新实例后，再关闭旧版本的实例，让服务保持零中断。

## 云函数

### 云函数有哪些限制？

云函数是 LeanCloud 提供的一个 **相对受限** 的自定义服务器端逻辑的功能，和我们的 SDK 有比较 **深度的集成**。我们将云函数设计为一种类似 **RPC** 的机制，在云函数中你只能关注参数和结果，而不能自定义超时时间、HTTP Method、URL，不能读取和设置 Header。如果希望更加自由地使用这些 HTTP 的语义化功能，或者希望使用第三方的框架提供标准的 RESTful API，请使用云引擎的网站托管功能自行来处理 HTTP 请求。

### 云函数可以同时存在于多个分组么？

云引擎会自动将一个应用下的云函数请求转发到正确的分组，因此你可以同时在多个分组下使用云函数。

### 项目部署成功了，但云函数和 Hook 不可用？

为了支持云引擎的云函数和 Hook 功能，云引擎的管理程序会使用 `/1.1/functions/_ops/metadatas` 这个 URL 和 SDK 交互，请确保将这个 URL 交给 SDK 处理。
默认情况下，云引擎会尝试从 `/1.1/functions/_ops/metadatas` 获取云函数和 Hook 的元信息，如果失败，则云函数和 Hook 功能不可用，但不会中断部署。
如果希望在获取元信息失败后中断部署，可以在 `leanengine.yaml` 文件中指定 `functionsMode` 为 `strict`。
如果应用不使用云函数和 Hook 功能，那么你可以：

- 在 `leanengine.yaml` 中不指定 `functionsMode`，同时 `/1.1/functions/_ops/metadatas` **返回一个 HTTP `404`** 表示不使用云函数和 Hook 相关的功能；
- 或者在 `leanengine.yaml` 中指定 `functionsMode` 为 `disabled`。注意，这种情况下，即使应用代码中定义了云函数和 Hook，Hook 也不会生效，云函数调用（通过 SDK 发起远程调用或通过 REST API 向 API 域名发起云函数调用）有可能因为被转发到错误的云引擎分组而失败。

### 部署中断，提示有同名云函数怎么办？

云引擎支持多个分组。
如果当前部署代码中部分云函数与其他组的同名，默认情况会提示错误并中断部署，防止意外重复定义云函数。
我们建议你移除不需要的云函数，毕竟重复定义的云函数并不易于理解和维护。
不过，你也可以通过在每次部署时额外指定 `--overwrite-functions` 参数强制替换其他组云函数的实现。

### 为什么 Class Hook 没有被运行？

首先确认一下 Hook 被调用的时机是否与你的理解一致：

* `beforeSave`：对象保存或创建之前
* `afterSave`：对象保存或创建之后
* `beforeUpdate`：对象更新之前
* `afterUpdate`：对象更新之后
* `beforeDelete`：对象删除之前
* `afterDelete`：对象删除之后
* `onVerified`：用户通过邮箱或手机验证后
* `onLogin`：用户在进行登录操作时（`become(sessionToken)` 不是登录操作，因此不会调用 `onLogin`）

还需注意在本地进行云引擎调试时，运行的会是线上预备环境的 Hook，如果没有预备环境则不会运行。

然后检查 Hook 函数是否被执行过：

可以先在 Hook 函数的入口打印一行日志，然后进行操作，再到云引擎日志中检查该行日志是否被打印出来，如果没有看到日志原因可能包括：

* 代码没有被部署到正确的应用
* 代码没有被部署到生产环境（或没有部署成功）
* Hook 的类名不正确

如果日志已打出，则继续检查函数是否成功，检查控制台上是否有错误信息被打印出。如果是 before 类 Hook，需要保证 Hook 函数在 15 秒内结束，否则会被系统认为超时。

after 类 Hook 超时时间为 3 秒，如果你的体验实例已经休眠，很可能因为启动时间过长无法收到 after 类 Hook，建议升级到云引擎的标准实例避免休眠。

### 可以在云函数中未登录的情况下查询 _User 表吗？

在云函数里可以用 masterKey 跳过权限检查，未登录也可直接查询 _User 表。

因为云引擎运行在可信的服务器端环境中，所以你可以全局开启超级权限（`Master Key`），这样云端会跳过包括 ACL 和 Class 权限在内的检查，让你自由地操作所有云存储中的数据。具体细节可以参考[云函数指南](/sdk/engine/guide/cloudfunction/)的《Master Key 和超级权限》一节。

### 调用云函数时，如何指定请求所发往的环境？

云引擎应用有「生产环境」和「预备环境」之分。在云引擎通过 SDK 调用云函数时，包括显式调用以及隐式调用（由于触发 hook 条件导致 hook 函数被调用），SDK 会根据云引擎所属环境（预备、生产）调用相应环境的云函数。例如，假定定义了 `beforeDelete` 云函数，在预备环境通过 SDK 删除一个对象，会触发预备环境的 `beforeDelete` hook 函数。

在云引擎以外的环境通过 SDK 显式或隐式调用云函数时，`X-LC-Prod` 的默认值一般为 `1`，也就是调用生产环境。但由于历史原因，各 SDK 的具体行为有一些差异：

- 在 Node.js、PHP、Java、C# 这三个 SDK 下，默认总是调用生产环境的云函数。
- 在 Python SDK 下，配合 lean-cli 本地调试时，且应用存在预备环境时，默认调用预备环境的云函数，其他情况默认调用生产环境的云函数。
- 云引擎 Java 环境的模板项目 [java-war-getting-started] 和 [spring-boot-getting-started] 做了处理，配合 lean-cli 本地调试时，且应用存在预备环境时，默认调用预备环境的云函数，其他情况默认调用生产环境的云函数（与 Python SDK 的行为一致）。

[java-war-getting-started]: https://github.com/leancloud/java-war-getting-started/
[spring-boot-getting-started]: https://github.com/leancloud/spring-boot-getting-started/

你还可以在 SDK 中指定客户端将请求所发往的环境：

<MultiLang>

```cs
LCCloud.IsProduction = true; // production (default)
LCCloud.IsProduction = false; // stage
```
```java
LCCloud.setProductionMode(true); // production
LCCloud.setProductionMode(false); // stage
```
```objc
[LCCloud setProductionMode:YES]; // production (default)
[LCCloud setProductionMode:NO]; // stage
```
```swift
// production by default

// stage
do {
    let environment: LCApplication.Environment = [.cloudEngineDevelopment]
    let configuration = LCApplication.Configuration(environment: environment)
    try LCApplication.default.set(
        id: {{appid}},
        key: {{appkey}},
        serverURL: "https://please-replace-with-your-customized.domain.com",
        configuration: configuration)
} catch {
    print(error)
}
```
```dart
LCCloud.setProduction(true); // production (default)
LCCloud.setProduction(false); // stage
```
```js
AV.setProduction(true); // production (default)
AV.setProduction(false); // stage
```
```python
leancloud.use_production(True) # production (default)
leancloud.use_production(False) # stage
# 需要在 SDK 初始化语句 `leancloud.init` 之前调用
```
```php
LeanClient::useProduction(true); // production (default)
LeanClient::useProduction(false); // stage
```
```go
// 暂不支持（总是使用生产环境）
```

</MultiLang>

免费版云引擎应用只有「生产环境」，因此请不要切换到预备环境。

## 部署

### 云引擎的启动限制时间是多久？

你的应用在启动时，云引擎的管理程序会每秒去检查你的应用是否启动成功，如果超过启动时间限制仍未启动成功，即认为启动失败。
启动时间限制默认为 30 秒，如需延长或缩短，可以在 leanengine.yaml` 文件中指定 `startupTimeout`，可设置范围为 15 – 120 秒。

### 多次部署同一个项目时镜像大小为什么差别那么大？

云引擎底层有一套缓存机制以加速构建过程，所以部署时显示的「存储镜像到仓库」后面的大小表示本次构建新产生的数据，可用于评估是否利用到了缓存，不代表整个项目的大小。

### 云引擎中设置的环境变量无效？

默认情况下，应用在运行阶段才能够读取到内置环境变量和自定义环境变量。
如果希望在安装依赖或编译阶段就能读取到这些环境变量，需要在 `leanengine.yaml` 里设置：

```yaml
exposeEnvironmentsOnBuild: true
```

### 部署时长时间卡在「正在下载和安装依赖」怎么办？

这个步骤对应在云端调用各个语言的包管理器（`npm`、`pip`、`composer`、`maven`）安装依赖的过程，我们有一个依赖缓存机制来加速这个安装过程，但缓存可能会因为很多原因失效（比如修改了依赖列表），在缓存失效时会比平时慢很多，请耐心等待。如果你在 `leanengine.yaml` 中指定了系统依赖也会在这个步骤中安装，因此请不要添加未用到的依赖。

对于 Node.js 建议检查是否在 `package-lock.json` 或 `yarn.lock` 中指定了较慢的源。

### 部署到多个实例时，部分实例失败需要重新部署吗？

同一环境（预备／生产）下有多个实例时，云引擎会同时在所有实例上部署项目。如因偶然因素部分实例部署不成功，会在几分钟后自动尝试再次部署，无需手动重新部署。

### 云引擎实例部署后控制台多次显示「部署中」是怎么回事？

控制台显示的「部署中」状态泛指所有运维操作，例如唤醒休眠实例、服务器偶发故障引起的重新部署，不只是用户主动进行的部署。

### 云引擎的健康检查是什么？

云引擎的管理系统会每隔几分钟检查所有实例的工作状态（通过 HTTP 检查，详见[云引擎网站托管指南](/sdk/engine/guide/webhosting/)的《健康监测》一节。
如果实例无法正确响应的话，管理系统会触发一次重新部署，并在控制台上打印类似下面的日志：

> 健康检查失败：web1 检测到 Error connect ECONNREFUSED 10.19.30.220:51797

如果一周内发生一两次属正常现象（有可能是我们的服务器出现偶发的故障，因为会立刻重新部署，对服务影响很小），如果频繁发生可能是你的程序资源不足，或存在其他问题（运行一段时间后不再响应 HTTP 请求），需结合具体情况来分析。

## 命令行工具

### 之前使用 `npm` 装过旧版的命令行工具，如果升级到新版？

如果之前使用 `npm` 安装过旧版本的命令行工具，为了避免与新版本产生冲突，建议使用 `npm uninstall -g leancloud-cli` 卸载旧版本命令行工具。或者直接按照 `homebrew` 的提示，执行 `brew link --overwrite lean-cli` 覆盖掉之前的 `lean` 命令来解决。

### 使用命令行工具部署失败怎么办？

部署失败有多种原因，请根据显示的报错信息耐心排查。
一般来说，如果您使用命令行工具部署，首先建议您检查命令行工具是否是最新版，如果不是最新版，先升级到最新版再重试。



### 同一个项目如何批量部署到多个应用的云引擎？

可以通过 `lean switch` 切换项目所属应用，然后通过 `lean deploy` 部署。
`lean switch` 支持通过参数以非交互的方式使用：

```sh
lean switch --region REGION --group GROUP_NAME APP_ID
lean deploy --prod 1
```

上述命令中，`REGION` 代表应用所在区域，目前支持的值为 `cn-n1`（华北节点）、`cn-e1`（华东节点）、`us-w1`（国际版）。
`--prod 1` 表示部署到生产环境，如果希望部署到预备环境，换成 `lean deploy` 即可。
基于这两个命令可以自行编写 CI 脚本快速部署至多个应用的云引擎实例。


## 限制和费用

### 云引擎的请求有哪些限制？

云引擎的负载均衡组件限制了请求不能超过 100 MB（包括直接上传文件到云引擎）、请求处理不得超过 60 秒，WebSocket 60 秒无数据会被断开连接。

国内节点未绑定独立 IP 的云引擎默认为纯静态站点优化。请求会先经过边缘节点，再视缓存命中情况回源到负载均衡组件，最后到达你的应用。
边缘节点额外限制了请求不能超过 60 MB、请求处理不得超过 10 秒，另外边缘节点不支持 WebSocket 请求和 HTTP PATCH 方法，也不支持获取客户端 IP。
因此，如果您在国内节点云引擎托管动态网站，我们建议您绑定独立 IP，使用独立入口，不经过边缘节点，自然也就没有上述限制。

### 云引擎采用什么样的休眠策略？

标准实例不会休眠。

体验实例会执行休眠策略：

* 如果应用最近一段时间（半小时）没有任何外部请求，则休眠。
* 休眠后如果有新的外部请求实例则马上启动。访问者的体验是第一个请求响应时间是 5 ~ 30 秒（视实例启动时间而定），后续访问响应速度恢复正常。
* 强制休眠：如果最近 24 小时内累计运行超过 18 小时，则强制休眠。此时新的请求会收到 503 的错误响应码，该错误可在 **开发者中心 > 你的游戏 > 游戏服务 > 云服务 > 云引擎 > 云引擎分组 > 统计** 中查看。
>>>>>>> 803298f (:technologist: Refine navigations)

### 每个应用最多有几个实例？

每个应用最多拥有 12 个实例，如果需要更多资源请通过工单联系我们的技术支持。

<<<<<<< HEAD:docs/sdk/16-engine/07-faq.md
国内节点未绑定独立 IP 的云引擎默认为纯静态站点优化。请求会先经过边缘节点，再视缓存命中情况回源到负载均衡组件，最后到达你的应用。
边缘节点额外限制了请求不能超过 60 MB、请求处理不得超过 10 秒，另外边缘节点不支持 WebSocket 请求和 HTTP PATCH 方法，也不支持获取客户端 IP。
因此，如果你在国内节点云引擎托管动态网站，我们建议你绑定独立 IP，使用独立入口，不经过边缘节点，自然也就没有上述限制。

<<<<<<< HEAD
### 每个应用最多有几个实例？

每个应用最多拥有 12 个实例，如果需要更多资源请通过工单联系我们的技术支持。

### 云引擎如何收费？

云引擎中如果有云服务的存储等 API 调用，按数据存储收费策略照常收费。

云引擎的标准实例、LeanDB 实例、回源流量、加速流量都会产生费用，详见官网的价格方案页面。

### 流量如何计费？

每个云引擎实例每天有 1 G 免费额度，超出部分价格可以在当前节点的价格页面查看。

一个应用下的流量额度会合并计算，即每天的免费额度为 `max(n, 1)` GB，其中 `n` 为该应用所有云引擎分组下的标准实例总数。

**云引擎不适合分发大文件之类的场景**，有此需求的开发者可以使用文件服务。

在**开发者中心 > 你的游戏 > 游戏服务 > 云服务 > 云引擎 > 云引擎分组 > 统计 > 流量**可以查看最近流量统计。

### 如果更改了实例规格或数量，当天的云引擎费用如何收取？

云引擎资源使用量按 **当天最大的实例数量** 计算，次日凌晨从账户余额中扣费，假设某天从 0 点至 24 点之间：

* 应用本来有 4 个 standard-512 的实例；
* 发现资源数量不足，将实例规格调整到了 standard-1024；
* 发现资源过多，减少到 2 个实例。

则当天费用按照 standard-1024 的价格乘上 4 个实例计算。

### Hook 函数算 API 请求次数吗，afterUpdate 执行一次算 1 次请求次数吗？

AfterUpdate 是在云引擎内执行的，执行 afterUpdate 不算 API 请求，自然也不计入 API 请求数。如果 afterUpdate 里发起了 API 请求，那么照常计算 API 请求数（和客户端请求 API 一样）。

## 最佳实践
=======
### 如何访问云引擎预备环境中托管的网站？
=======
### 云引擎如何收费？

云引擎中如果有云服务的存储等 API 调用，按数据存储收费策略照常收费。
>>>>>>> 9aef831 (:sparkles: Organize faq):docs/sdk/15-engine/07-faq.md

云引擎的标准实例、LeanDB 实例、回源流量、加速流量都会产生费用，详见官网的价格方案页面。

### 流量如何计费？

每个云引擎实例每天有 1 G 免费额度，超出部分价格可以在当前节点的价格页面查看。

一个应用下的流量额度会合并计算，即每天的免费额度为 `max(n, 1)` GB，其中 `n` 为该应用所有云引擎分组下的标准实例总数。

<<<<<<< HEAD:docs/sdk/16-engine/07-faq.md
另外，stg-web.example.com 域名是需要在控制台自行绑定的。
>>>>>>> 803298f (:technologist: Refine navigations)
=======
**云引擎不适合分发大文件之类的场景**，有此需求的开发者可以使用文件服务。

在**开发者中心 > 你的游戏 > 游戏服务 > 云服务 > 云引擎 > 云引擎分组 > 统计 > 流量**可以查看最近流量统计。

### 如果更改了实例规格或数量，当天的云引擎费用如何收取？

云引擎资源使用量按 **当天最大的实例数量** 计算，次日凌晨从账户余额中扣费，假设某天从 0 点至 24 点之间：

* 应用本来有 4 个 standard-512 的实例；
* 发现资源数量不足，将实例规格调整到了 standard-1024；
* 发现资源过多，减少到 2 个实例。

则当天费用按照 standard-1024 的价格乘上 4 个实例计算。

### Hook 函数算 API 请求次数吗，afterUpdate 执行一次算 1 次请求次数吗？

AfterUpdate 是在云引擎内执行的，执行 afetrUpdate 不算 API 请求，自然也不计入 API 请求数。如果 afterUpdate 里发起了 API 请求，那么照常计算 API 请求数（和客户端请求 API 一样）。

## 最佳实践
>>>>>>> 9aef831 (:sparkles: Organize faq):docs/sdk/15-engine/07-faq.md

### 云引擎中如何处理用户登录和 Cookie？

如果你的页面主要由服务端渲染，可以使用我们在部分 SDK 中提供的管理 Cookie 和 Session 的中间件或模块，也可以其他第三方的中间件或模块，在 Cookie 中维护用户状态。

使用 Cookie 作为鉴权方式需要注意防范 [CSRF](https://github.com/pillarjs/understanding-csrf) 攻击（其他站点伪造带有正确 Cookie 的恶意请求）。
业界通常使用 CSRF Token 来防御 CSRF 攻击，你需要传递给客户端一个随机字符串（即 CSRF Token，可通过 Cookie 传递），客户端在每个有副作用的请求中都要将 CSRF 包含在请求正文或 Header 中，服务器端需要校验这个 CSRF Token 是否正确。

如果你的页面主要是由浏览器端渲染，那么建议在前端使用 SDK 登录用户，调用 SDK 的接口获取 session token，通过 HTTP Header 等方式将 session token 发送给后端。

例如，在前端登录用户并通过 `user.getSessionToken()` 获取 `sessionToken` 并发送给后端：

```js
AV.User.login(user, pass).then(user => {
  return fetch('/profile', {
    headers: {
      'X-LC-Session': user.getSessionToken()
    }
  });
});
```

相应的后端 Node.js 代码：

```js
app.get('/profile', function (req, res) {
  AV.User.become(req.headers['x-lc-session']).then(user => {
    res.send(user);
  }).catch(err => {
    res.send({ error: err.message });
  });
});

app.post('/todos', function (req, res) {
  var todo = new Todo();
  todo.save(req.body, { sessionToken: req.headers['x-lc-session'] }).then(() => {
    res.send(todo);
  }).catch(err => {
    res.send({ error: err.message });
  });
});
```

### 云引擎下如何管理用户会话？

使用各框架自带的组件或第三方模块即可。

例如：

- Node.js 的 Express 框架可以使用 [cookie-session](https://github.com/expressjs/cookie-session) 组件。它和 `AV.Cloud.CookieSession` 组件可以并存。注意，Express 框架的 `express.session.MemoryStore` 在云引擎中是无法正常工作的，因为云引擎是多主机、多进程运行，因此内存型 session 是无法共享的。
- Python 的 Flask 框架和 Django 框架都自带 session 组件。
- PHP 可以使用 SDK 提供的 `CookieStorage` 保存会话属性。注意，PHP 默认的 `$_SESSION` 在云引擎中是无法正常工作的，因为云引擎是多主机、多进程运行，因此内存型 session 是无法共享的。
<<<<<<< HEAD:docs/sdk/16-engine/07-faq.md
<<<<<<< HEAD

=======
### 云引擎下如何发送 HTTP 请求？

使用各语言的标准库或社区提供的模块即可。

例如：

- Node.js 项目可以使用 [superagent] 等社区提供的模块。
- Python 项目可以使用标准库中的 `urllib.request` 模块或社区的 [requests] 模块。
- PHP 项目可以使用 PHP 内置的 `curl` 模块或 [guzzle] 等第三方库。
- Java 项目可以使用 `URL` 或者是 `HttpClient` 等基础类或 [OkHttp] 等第三方库。

[superagent]: https://www.npmjs.com/package/superagent
[requests]: https://docs.python-requests.org/en/master/
[guzzle]: https://docs.guzzlephp.org/en/stable/
[OkHttp]: https://square.github.io/okhttp/
>>>>>>> 803298f (:technologist: Refine navigations)
=======

>>>>>>> 9aef831 (:sparkles: Organize faq):docs/sdk/15-engine/07-faq.md

### 云引擎如何上传文件？

托管在云引擎的网站可以使用相应 SDK 提供的接口上传文件。
不过，一般情况下建议在客户端 SDK 上传文件，而不是通过云引擎中转，以免增加不必要的云引擎流量。

### 如何判断请求是通过 HTTPS 还是 HTTP 访问的？

因为 HTTPS 加密是在负载均衡层面处理的，所以通常部署在云引擎上的 web 框架获取的请求 URL 总是使用 HTTP 协议，建议通过 `X-Forwarded-Proto` HTTP 头来判断原请求是通过 HTTP 还是 HTTPS 访问的。

<<<<<<< HEAD:docs/sdk/16-engine/07-faq.md
<<<<<<< HEAD
=======

>>>>>>> 803298f (:technologist: Refine navigations)
=======
>>>>>>> 9aef831 (:sparkles: Organize faq):docs/sdk/15-engine/07-faq.md
### 云引擎响应时间增加怎么办

响应时间的增加有很多种原因：可能因为只是单纯的请求处理的数据更加复杂导致耗时变长；也有可能是因为请求量过高实例的处理能力不足从而导致响应时间增加。
建议分析当前的代码并参考 CPU、内存占用量找出瓶颈，确定是否需要调高实例规格或增加实例数量。
如果需要定位具体是哪些 API 或云函数响应较慢，可以下载访问日志分析。

### 如何下载云引擎的应用日志和访问日志
<<<<<<< HEAD:docs/sdk/16-engine/07-faq.md

云引擎的应用日志（程序的标准输出和标准错误输出）可以在 **开发者中心 > 你的游戏 > 游戏服务 > 云服务 > 云引擎 > 云引擎分组 > 日志** 查看；并且可以使用命令行工具导出最长 7 天的日志。

云引擎的访问日志（Access Log）同样可以在**开发者中心 > 你的游戏 > 游戏服务 > 云服务 > 云引擎 > 访问日志**导出。
<<<<<<< HEAD
=======
## 部署


### 云引擎中设置的环境变量无效？

默认情况下，应用在运行阶段才能够读取到内置环境变量和自定义环境变量。
如果希望在安装依赖或编译阶段就能读取到这些环境变量，需要在 `leanengine.yaml` 里设置：

```yaml
exposeEnvironmentsOnBuild: true
```

### 部署更新云引擎会导致服务中断吗？

服务不会中断。在代码部署时，系统会优先启动使用新版本代码的实例，待新实例通过了健康检查，系统修改路由将请求转发至新实例后，再关闭旧版本的实例，让服务保持零中断。


### 部署时长时间卡在「正在下载和安装依赖」怎么办？

这个步骤对应在云端调用各个语言的包管理器（`npm`、`pip`、`composer`、`maven`）安装依赖的过程，我们有一个依赖缓存机制来加速这个安装过程，但缓存可能会因为很多原因失效（比如修改了依赖列表），在缓存失效时会比平时慢很多，请耐心等待。如果你在 `leanengine.yaml` 中指定了系统依赖也会在这个步骤中安装，因此请不要添加未用到的依赖。

对于 Node.js 建议检查是否在 `package-lock.json` 或 `yarn.lock` 中指定了较慢的源。

### 部署到多个实例时，部分实例失败需要重新部署吗？

同一环境（预备／生产）下有多个实例时，云引擎会同时在所有实例上部署项目。如因偶然因素部分实例部署不成功，会在几分钟后自动尝试再次部署，无需手动重新部署。

### 云引擎实例部署后控制台多次显示「部署中」是怎么回事？

控制台显示的「部署中」状态泛指所有运维操作，例如唤醒休眠实例、服务器偶发故障引起的重新部署，不只是用户主动进行的部署。

### 云引擎的健康检查是什么？

云引擎的管理系统会每隔几分钟检查所有实例的工作状态（通过 HTTP 检查，详见[云引擎网站托管指南](/sdk/engine/guide/webhosting/)的《健康监测》一节。
如果实例无法正确响应的话，管理系统会触发一次重新部署，并在控制台上打印类似下面的日志：
=======
>>>>>>> 9aef831 (:sparkles: Organize faq):docs/sdk/15-engine/07-faq.md

云引擎的应用日志（程序的标准输出和标准错误输出）可以在 **开发者中心 > 你的游戏 > 游戏服务 > 云服务 > 云引擎 > 云引擎分组 > 日志** 查看；并且可以使用命令行工具导出最长 7 天的日志。

<<<<<<< HEAD:docs/sdk/16-engine/07-faq.md
如果一周内发生一两次属正常现象（有可能是我们的服务器出现偶发的故障，因为会立刻重新部署，对服务影响很小），如果频繁发生可能是你的程序资源不足，或存在其他问题（运行一段时间后不再响应 HTTP 请求），需结合具体情况来分析。
>>>>>>> 803298f (:technologist: Refine navigations)
=======
云引擎的访问日志（Access Log）同样可以在**开发者中心 > 你的游戏 > 游戏服务 > 云服务 > 云引擎 > 访问日志**导出。
>>>>>>> 9aef831 (:sparkles: Organize faq):docs/sdk/15-engine/07-faq.md

### 不使用 SDK 的情况下，该如何实现健康监测和云函数元信息路由？

不使用 SDK 的情况下，需要自行实现相关路由。
下面给出 Java 和 PHP 的例子供参考。

健康监测：

```java
// 健康监测 router
@WebServlet(name = "LeanEngineHealthServlet", urlPatterns = {"/__engine/1/ping"})
public class LeanEngineHealthCheckServlet extends HttpServlet {

  @Override
  protected void doGet(HttpServletRequest req, HttpServletResponse resp)
      throws ServletException, IOException {
    resp.setHeader("content-type", "application/json; charset=UTF-8");
    JSONObject result = new JSONObject();
    result.put("runtime", System.getProperty("java.version"));
    result.put("version", "custom");
    resp.getWriter().write(result.toJSONString());
  }
}
```

```php
$app->get('/__engine/1/ping', function($req, $res) {
    // PSR-7 response is immutable
    $response = $res->withHeader("Content-Type", "application/json");
    $response->getBody()->write(json_encode(array(
        "runtime" => "php-" . phpversion(),
        "version" => "custom"
    )));
    return $response;
});
```

云函数元信息：

```java
@WebServlet(name = "LeanEngineMetadataServlet", urlPatterns = {"/1.1/functions/_ops/metadatas"})
public class LeanEngineMetadataServlet extends HttpServlet {

  @Override
  protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException,
      IOException {
    resp.setContentType("application/json; charset=UTF-8");
    resp.getWriter().write("{\"result\":[]}");
  }
}
```

```php
app.get('/1.1/_ops/functions/metadatas', function(req, res) {
    $response = $res->withHeader("Content-Type", "application/json");
    $response->getBody()->write(json_encode(array(
        "result" => array()
    )));
    return $response;
});
```

<<<<<<< HEAD:docs/sdk/16-engine/07-faq.md
<<<<<<< HEAD
### 如何判断当前云引擎是预备环境还是生产环境？

默认情况，云引擎只有一个「生产环境」，对应的域名是 web.example.com。在生产环境中有一个「体验实例」来运行应用。

当生产环境的体验实例升级到「标准实例」后会有一个额外的「预备环境」，对应域名 stg-web.example.com，两个环境所访问的都是同样的数据，你可以用预备环境测试你的云引擎代码，每次修改先部署到预备环境，测试通过后再发布到生产环境；如果你希望有一个独立数据源的测试环境，建议单独创建一个应用。

另外，stg-web.example.com 域名是需要在控制台自行绑定的。

### 云引擎下如何发送 HTTP 请求？

使用各语言的标准库或社区提供的模块即可。

例如：

- Node.js 项目可以使用 [superagent] 等社区提供的模块。
- Python 项目可以使用标准库中的 `urllib.request` 模块或社区的 [requests] 模块。
- PHP 项目可以使用 PHP 内置的 `curl` 模块或 [guzzle] 等第三方库。
- Java 项目可以使用 `URL` 或者是 `HttpClient` 等基础类或 [OkHttp] 等第三方库。

[superagent]: https://www.npmjs.com/package/superagent
[requests]: https://docs.python-requests.org/en/master/
[guzzle]: https://docs.guzzlephp.org/en/stable/
[OkHttp]: https://square.github.io/okhttp/

### 如何访问云引擎预备环境中托管的网站？

需要在控制台手动绑定一个 `stg-` 开头的域名。`stg-` 开头的自定义域名（例如 stg-web.example.com）会被自动地绑定到预备环境。

### 云引擎可以绑定裸域名吗？

如果希望在国际版云引擎绑定裸域名，我们建议选择支持 ANAME 或 CNAME Flattening 记录的域名服务商。
=======
### 云引擎的启动限制时间是多久？

你的应用在启动时，云引擎的管理程序会每秒去检查你的应用是否启动成功，如果超过启动时间限制仍未启动成功，即认为启动失败。
启动时间限制默认为 30 秒，如需延长或缩短，可以在 leanengine.yaml` 文件中指定 `startupTimeout`，可设置范围为 15 – 120 秒。

### 多次部署同一个项目时镜像大小为什么差别那么大？

云引擎底层有一套缓存机制以加速构建过程，所以部署时显示的「存储镜像到仓库」后面的大小表示本次构建新产生的数据，可用于评估是否利用到了缓存，不代表整个项目的大小。

## 命令行工具

### 之前使用 `npm` 装过旧版的命令行工具，如果升级到新版？

如果之前使用 `npm` 安装过旧版本的命令行工具，为了避免与新版本产生冲突，建议使用 `npm uninstall -g leancloud-cli` 卸载旧版本命令行工具。或者直接按照 `homebrew` 的提示，执行 `brew link --overwrite lean-cli` 覆盖掉之前的 `lean` 命令来解决。

### 使用命令行工具部署失败怎么办？

部署失败有多种原因，请根据显示的报错信息耐心排查。
一般来说，如果你使用命令行工具部署，首先建议你检查命令行工具是否是最新版，如果不是最新版，先升级到最新版再重试。

### 命令行工具在本地调试时提示 `Error: listen EADDRINUSE :::3000`，无法访问应用

`listen EADDRINUSE :::3000` 表示你的程序默认使用的 3000 端口被其他应用占用了，可以按照下面的方法找到并关闭占用 3000 端口的程序：

* [macOS 使用 `lsof` 和 `kill`](http://stackoverflow.com/questions/3855127/find-and-kill-process-locking-port-3000-on-mac)
* [Linux 使用 `fuser`](http://stackoverflow.com/questions/11583562/how-to-kill-a-process-running-on-particular-port-in-linux)
* [Windows 使用 `netstat` 和 `taskkill`](http://stackoverflow.com/questions/6204003/kill-a-process-by-looking-up-the-port-being-used-by-it-from-a-bat)

也可以修改命令行工具默认使用的 3000 端口：
```
lean -p 3002
```

### 同一个项目如何批量部署到多个应用的云引擎？

可以通过 `lean switch` 切换项目所属应用，然后通过 `lean deploy` 部署。
`lean switch` 支持通过参数以非交互的方式使用：

```sh
lean switch --region REGION --group GROUP_NAME APP_ID
lean deploy --prod 1
```

上述命令中，`REGION` 代表应用所在区域，目前支持的值为 `cn-n1`（华北节点）、`cn-e1`（华东节点）、`us-w1`（国际版）。
`--prod 1` 表示部署到生产环境，如果希望部署到预备环境，换成 `lean deploy` 即可。
基于这两个命令可以自行编写 CI 脚本快速部署至多个应用的云引擎实例。

### 命令行工具的 metric 命令有什么用？

使用 `metric` 命令可以查看 LeanStorage 的状态报告：

```sh
$ lean metric --from 2017-09-07
[INFO] Retrieving xxxxxx storage report
Date                 2017-09-07   2017-09-08   2017-09-09
API Requests         49           35           14
Max Concurrent       2            2            2
Mean Concurrent      1            1            1
Exceed Time          0            0            0
Max QPS              5            5            5
Mean Duration Time   9ms          21ms         7ms
80% Duration Time    15ms         22ms         9ms
95% Duration Time    26ms         110ms        25ms
```

相关状态的描述如下：

<table>
	<tr><th width="35%">状态</th><th>描述</th></tr>
	<tr><td>`Date`</td><td>日期</td></tr>
	<tr><td>`API Requests`</td><td>API 请求次数</td></tr>
	<tr><td>`Max Concurrent`</td><td>最大工作线程数</td></tr>
	<tr><td>`Mean Concurrent`</td><td>平均工作线程数</td></tr>
	<tr><td>`Exceed Time`</td><td>超限请求数</td></tr>
	<tr><td>`Max QPS`</td><td>最大 QPS</td></tr>
	<tr><td>`Mean Duration Time`</td><td>平均响应时间</td></tr>
	<tr><td>`80% Duration Time`</td><td>80% 响应时间</td></tr>
	<tr><td>`95% Duration Time`</td><td>95% 响应时间</td></tr>
</table>

`metric` 接收参数与 `logs` 类似，具体参考 `lean metric -h`。

=======
>>>>>>> 9aef831 (:sparkles: Organize faq):docs/sdk/15-engine/07-faq.md
### 如何通过命令行工具上传文件至文件服务？

```sh
$ lean upload public/index.html
Uploads /Users/dennis/programming/avos/new_app/public/index.html successfully at: http://ac-7104en0u.qiniudn.com/f9e13e69-10a2-1742-5e5a-8e71de75b9fc.html
```

文件上传成功后会自动生成在云端的 URL，即上例中 `successfully at:` 之后的信息。

上传 images 目录下的所有文件：

```sh
$ lean upload images/
```

### 如何扩展命令行工具的功能？

有时我们需要对某个应用进行特定并且频繁的操作，比如查看应用 `_User` 表的记录总数，这样可以使用命令行工具的自定义命令来实现。

只要在当前系统的 `PATH` 环境变量下，或者在项目目录 `.leancloud/bin` 下存在一个以 `lean-` 开头的可执行文件，比如 `lean-usercount`，那么执行 `$ lean usercount`，命令行工具就会自动调用这个可执行文件。与直接执行 `$ lean-usercount` 不同的是，这个命令可以获取与应用相关的环境变量，方便访问对应的数据。

例如将如下脚本放到当前系统的 `PATH` 环境变量中（比如 `/usr/local/bin`）：

```python
#! /bin/env python

import sys

import leancloud

app_id = os.environ['LEANCLOUD_APP_ID']
master_key = os.environ['LEANCLOUD_APP_MASTER_KEY']

leancloud.init(app_id, master_key=master_key)
print(leancloud.User.query.count())
```

同时赋予这个脚本可执行权限 `$ chmod +x /usr/local/bin/lean-usercount`，然后执行 `$ lean usercount`，就可以看到当前应用对应的 `_User` 表中记录总数了。

### 如何判断当前云引擎是预备环境还是生产环境？

默认情况，云引擎只有一个「生产环境」，对应的域名是 web.example.com。在生产环境中有一个「体验实例」来运行应用。

当生产环境的体验实例升级到「标准实例」后会有一个额外的「预备环境」，对应域名 stg-web.example.com，两个环境所访问的都是同样的数据，你可以用预备环境测试你的云引擎代码，每次修改先部署到预备环境，测试通过后再发布到生产环境；如果你希望有一个独立数据源的测试环境，建议单独创建一个应用。

另外，stg-web.example.com 域名是需要在控制台自行绑定的。

### 云引擎下如何发送 HTTP 请求？

使用各语言的标准库或社区提供的模块即可。

例如：

- Node.js 项目可以使用 [superagent] 等社区提供的模块。
- Python 项目可以使用标准库中的 `urllib.request` 模块或社区的 [requests] 模块。
- PHP 项目可以使用 PHP 内置的 `curl` 模块或 [guzzle] 等第三方库。
- Java 项目可以使用 `URL` 或者是 `HttpClient` 等基础类或 [OkHttp] 等第三方库。

[superagent]: https://www.npmjs.com/package/superagent
[requests]: https://docs.python-requests.org/en/master/
[guzzle]: https://docs.guzzlephp.org/en/stable/
[OkHttp]: https://square.github.io/okhttp/

### 如何访问云引擎预备环境中托管的网站？

需要在控制台手动绑定一个 `stg-` 开头的域名。`stg-` 开头的自定义域名（例如 stg-web.example.com）会被自动地绑定到预备环境。

### 云引擎可以绑定裸域名吗？

如果希望在国际版云引擎绑定裸域名，我们建议选择支持 ANAME 或 CNAME Flattening 记录的域名服务商。

### 定时任务应该在预备环境还是生产环境执行？

系统赠送的预备环境体验实例会自动休眠，可能干扰定时任务的执行，因此一般建议在预备环境测试定时任务，在生产环境正式执行定时任务。
如果定时任务 CPU、内存占用非常高，担心影响生产环境的网站托管功能或其他云函数访问，那么可以在预备环境购买标准实例，并在预备环境执行定时任务。

## 疑难问题

### Application not found 错误

访问云引擎服务时，服务端返回错误「Application not found」或在云引擎日志中出现这个错误，可能有以下原因：

* 调用错了环境。最常见的情况是，免费的体验实例是没有预备环境，开发者却主动设置去调用预备环境。
* 云引擎自定义域名填错了，比如微信回调地址。
* 因为免费版（体验版）的云引擎是有休眠的，休眠期间被调用会出现这个错误。建议升级到标准实例以保证实例一直运行。

### 在线上无法读取到项目中的文件怎么办？

建议先检查文件大小写是否正确，线上的文件系统是区分大小写的，而 Windows 和 macOS 通常不区分大小写。

<<<<<<< HEAD:docs/sdk/16-engine/07-faq.md
- 在 Node.js、PHP、Java、C# 这些 SDK 下，默认总是调用生产环境的云函数。
- 在 Python SDK 下，配合 lean-cli 本地调试时，且应用存在预备环境时，默认调用预备环境的云函数，其他情况默认调用生产环境的云函数。
- 云引擎 Java 环境的模板项目 [java-war-getting-started] 和 [spring-boot-getting-started] 做了处理，配合 lean-cli 本地调试时，且应用存在预备环境时，默认调用预备环境的云函数，其他情况默认调用生产环境的云函数（与 Python SDK 的行为一致）。
=======
### 云引擎会重复提交请求吗？
>>>>>>> 9aef831 (:sparkles: Organize faq):docs/sdk/15-engine/07-faq.md

云引擎的负载均衡对于幂等的请求（GET、PUT），在 HTTP 层面出错或超时的情况下是会重试的。
可以使用正确的谓词（例如 POST）避免此类重试。

### 命令行工具在本地调试时提示 `Error: listen EADDRINUSE :::3000`，无法访问应用

`listen EADDRINUSE :::3000` 表示你的程序默认使用的 3000 端口被其他应用占用了，可以按照下面的方法找到并关闭占用 3000 端口的程序：

* [macOS 使用 `lsof` 和 `kill`](http://stackoverflow.com/questions/3855127/find-and-kill-process-locking-port-3000-on-mac)
* [Linux 使用 `fuser`](http://stackoverflow.com/questions/11583562/how-to-kill-a-process-running-on-particular-port-in-linux)
* [Windows 使用 `netstat` 和 `taskkill`](http://stackoverflow.com/questions/6204003/kill-a-process-by-looking-up-the-port-being-used-by-it-from-a-bat)

也可以修改命令行工具默认使用的 3000 端口：
```
lean -p 3002
```

<<<<<<< HEAD:docs/sdk/16-engine/07-faq.md
</MultiLang>

免费版云引擎应用只有「生产环境」，因此请不要切换到预备环境。

### 云引擎创建的新的分组，可以调试云函数吗？

云引擎的各个分组都支持定义云函数（包括 Hook 函数和定时任务）。

每个分组都有独立的预备环境用于测试代码、独立的域名供外部访问，每个分组的环境变量、代码仓库等设置也是独立的，可以单独对一个组部署代码。你可以在分组中创建和管理实例，如果组中没有实例就无法响应请求，如果组中有多个实例便可以提供负载均衡和高可用的能力。

### 客户端如何调用云引擎分组中的云函数？

2020 年 10 月份云引擎已经[在所有分组上支持了云函数](https://leancloudblog.com/cloud-functions-on-all-groups/)，如果你的应用的不同分组上不存在重复定义的云函数，客户端直接调用云函数，在云引擎这边能自动根据名称路由到正确的分组（对客户端来说是透明的）。

## 定时任务和云队列
>>>>>>> 803298f (:technologist: Refine navigations)

### 定时任务应该在预备环境还是生产环境执行？

系统赠送的预备环境体验实例会自动休眠，可能干扰定时任务的执行，因此一般建议在预备环境测试定时任务，在生产环境正式执行定时任务。
如果定时任务 CPU、内存占用非常高，担心影响生产环境的网站托管功能或其他云函数访问，那么可以在预备环境购买标准实例，并在预备环境执行定时任务。

<<<<<<< HEAD
## 疑难问题

### Application not found 错误

访问云引擎服务时，服务端返回错误「Application not found」或在云引擎日志中出现这个错误，可能有以下原因：

* 调用错了环境。最常见的情况是，免费的体验实例是没有预备环境，开发者却主动设置去调用预备环境。
* 云引擎自定义域名填错了，比如微信回调地址。
* 因为免费版（体验版）的云引擎是有休眠的，休眠期间被调用会出现这个错误。建议升级到标准实例以保证实例一直运行。

### 在线上无法读取到项目中的文件怎么办？

建议先检查文件大小写是否正确，线上的文件系统是区分大小写的，而 Windows 和 macOS 通常不区分大小写。

### 云引擎会重复提交请求吗？

云引擎的负载均衡对于幂等的请求（GET、PUT），在 HTTP 层面出错或超时的情况下是会重试的。
可以使用正确的谓词（例如 POST）避免此类重试。

=======
=======
>>>>>>> 9aef831 (:sparkles: Organize faq):docs/sdk/15-engine/07-faq.md
## Node.js

### Node.js 项目如何打印 SDK 发出的网络请求？

你可以通过设置一个 `DEBUG=leancloud:request` 的环境变量来打印由 SDK 发出的网络请求。在本地调试时你可以通过这样的命令启动程序：

```sh
env DEBUG=leancloud:request lean up
```

当有对 LeanCloud 的调用时，你可以看到类似这样的日志：

```sh
leancloud:request request(0) +0ms GET https://{{host}}/1.1/classes/Todo?&where=%7B%7D&order=-createdAt { where: '{}', order: '-createdAt' }
leancloud:request response(0) +220ms 200 {"results":[{"content":"1","createdAt":"2016-08-09T06:18:13.028Z","updatedAt":"2016-08-09T06:18:13.028Z","objectId":"57a975a55bbb5000643fb690"}]}
```

我们不建议在线上生产环境开启这个日志，否则将会打印大量的日志。如有必要，可以指定 `DEBUG=leancloud:request:error`，只打印出错的网络请求。

### Maximum call stack size exceeded 如何解决？

**将 JavaScript SDK 和 Node SDK 升级到 1.2.2 以上版本可以彻底解决该问题。**

如果你的应用时不时出现 `Maximum call stack size exceeded` 异常，可能是因为在 hook 中调用了 `AV.Object.extend`。有两种方法可以避免这种异常：

- 升级 leanengine 到 v1.2.2 或以上版本
- 在 hook 外定义 Class（即定义在 `AV.Cloud.define` 方法之外），确保不会对一个 Class 执行多次 `AV.Object.extend`

<<<<<<< HEAD:docs/sdk/16-engine/07-faq.md
### 「在线编辑」和「项目部署」可以混用吗？

「在线编辑」的产生是为了方便大家初次体验云引擎，或者只是需要一些简单 hook 方法的应用使用。我们的实现方式就是把定义的函数拼接起来，生成一个云引擎项目然后部署。

所以可以认为「在线编辑」和「项目部署」最终是一样的，都是一个完整的项目。

定义函数是一个单独功能，可以不用使用基础包，git 等工具快速的生成和编辑云引擎。

当然，你也可以使用基础包，自己写代码并部署项目。

这两条路是分开的，任何一个部署，就会导致另一种方式失效掉。

### 如何从「在线编辑」迁移到项目部署？

1. 按照[云引擎命令行工具使用指南](/sdk/engine/guide/cli/)安装命令行工具，使用 `lean init` 初始化项目，模板选择 `Node.js > Express`（我们的 Node.js 示例项目）。
2. 在**开发者中心 > 你的游戏 > 游戏服务 > 云服务 > 云引擎 > 云引擎分组 > 部署 > 在线编辑**点击 **预览**，将全部函数的代码拷贝到新建项目中的 `cloud.js`（替换掉原有内容）。
3. 运行 `lean up`，在 <http://localhost:3001> 的调试界面中测试云函数和 Hook，然后运行 `lean deploy` 部署代码到云引擎（使用标准实例的用户还需要执行 `lean publish`）。
4. 部署后请留意云引擎控制台上是否有错误产生。

如果在线编辑使用的是 0.x 版本 的 Node.js SDK，那么还需要修改不兼容的代码。
比如将 `AV.User.current()` 改为 `request.currentUser`。
详见 [升级到云引擎 Node.js SDK 1.0](https://leancloud.cn/docs/leanengine-node-sdk-upgrade-1.html)。

=======
>>>>>>> 9aef831 (:sparkles: Organize faq):docs/sdk/15-engine/07-faq.md
### 云引擎下如何通过 JavaScript SDK 创建推送？

请参考 SDK 的 API 文档 [AV.Push](https://leancloud.github.io/javascript-sdk/docs/AV.Push.html)。
这里举两个简单的例子：

推送给所有订阅了 `public` 频道的设备：

```js
AV.Push.send({
  channels: [ 'public' ],
  data: {
    alert: 'public message'
  }
});
```

如果希望按照某个 `_Installation` 表的查询条件来推送，例如推送给某个 `installationId` 的 Android 设备，可以传入一个 `AV.Query` 对象作为 `where` 条件：

```js
const query = new AV.Query('_Installation');
query.equalTo('installationId', installationId);
AV.Push.send({
  where: query,
  data: {
    alert: 'Public message'
  }
});
```

### 跨域 POST 请求未携带 Cookie 怎么办？

Chrome 80 起 `SameSite` 的默认值为 `Lax`，如果你的应用的前端没部署在云引擎上，又需要向云引擎发送携带 Cookie 的 POST 请求，那么需要设置 `SameSite` 为 `none`。
`AV.Cloud.CookieSession` 会将所有参数都传递给浏览器的 `cookies.set()`，所以你可以将 `sameSite` 传入：

```js
AV.Cloud.CookieSession({sameSite: 'none'})
```

注意：

0. `SameSite` 要求与 `Secure` 标记一同发送，因此请确保你的客户端是通过 HTTPS 协议访问云引擎的。
1. 请仅在有必要的时候设置 `SameSite` 为 `none`，以免平白增加 CSRF 风险。

### 为什么云函数中 include 的字段没有被完整地发给客户端？

> 将 JavaScript SDK 和 Node SDK 升级到 3.0 以上版本可以彻底解决该问题。

云函数在响应时会调用到 `AV.Object#toJSON` 方法，将结果序列化为 JSON 对象返回给客户端。在早期版本中 `AV.Object#toJSON` 方法为了防止循环引用，当遇到属性是 Pointer 类型会返回 Pointer 元信息，不会将 include 的其他字段添加进去，我们在 [JavaScript SDK 3.0](https://github.com/leancloud/javascript-sdk/releases/tag/v3.0.0) 中对序列化相关的逻辑做了重新设计，**将 JavaScript SDK 和 Node SDK 升级到 3.0 以上版本便可以彻底解决该问题**。

如果暂时无法升级 SDK 版本，可以通过这样的方式绕过：

```javascript
AV.Cloud.define('querySomething', function(req, res) {
  var query = new AV.Query('Something');
  // user 是 Something 表的一个 Pointer 字段
  query.include('user');
  query.find().then(function(results) {
    // 手动进行一次序列化
    results.forEach(function(result){
      result.set('user', result.get('user') ?  result.get('user').toJSON() : null);
    });
    // 再返回查询结果给客户端
    res.success(results);
  }).catch(res.error);
});
```

Python SDK 也存在类似的问题，只会返回 Pointer 元信息，因此也需要额外进行一次查询并手动进行序列化。

### RPC 调用云函数时，为什么会返回预期之外的空对象？

使用 Node SDK 定义的云函数，如果返回一个不是 AVObject 的值，比如字符串、数字，RPC 调用得到的是空对象（`{}`）。
类似地，如果返回一个包含非 AVObject 成员的数组，RPC 调用的结果中该数组的相应成员也会被序列化为 `{}`。
这个问题将在 Node SDK 的下一个大版本（4.0）中修复。
目前绕过这一个问题的方法是将返回结果放在对象（`{}`）中返回。

### 如何使用云引擎批量更新数据？

可以参考我们的 [Demo: batch-update](https://github.com/leancloud/leanengine-nodejs-demos/blob/master/routes/batch-update.js)。

#### 路由超时设置

因为 Node.js 的异步调用容易因运行时错误或编码疏忽中断，为了减少在这种情况下对服务器内存的占用，也为了客户端能够更早地收到错误提示，所以需要添加这个设置，一旦发生超时，服务端会返回一个 HTTP 错误码给客户端。

使用 Express 框架实现自定义路由的时候，请求默认的超时时间为 15 秒，该值可以在 `app.js` 中进行调整：

```js
// 设置默认超时时间
app.use(timeout('15s'));
```
<<<<<<< HEAD:docs/sdk/16-engine/07-faq.md

## 计费

### 如果更改了实例规格或数量，当天的云引擎费用如何收取？

云引擎资源使用量按 **当天最大的实例数量** 计算，次日凌晨从账户余额中扣费，假设某天从 0 点至 24 点之间：

* 应用本来有 4 个 standard-512 的实例；
* 发现资源数量不足，将实例规格调整到了 standard-1024；
* 发现资源过多，减少到 2 个实例。

则当天费用按照 standard-1024 的价格乘上 4 个实例计算。

### 云引擎如何收费？

云引擎中如果有云服务的存储等 API 调用，按 API 收费策略照常收费。
云引擎标准实例也会产生使用费，具体请参考[云引擎运行方案](/sdk/engine/guide/plan/)。

### Hook 函数算 API 请求次数吗，afterUpdate 执行一次算 1 次请求次数吗？

AfterUpdate 是在云引擎内执行的，执行 afterUpdate 不算 API 请求，自然也不计入 API 请求数。如果 afterUpdate 里发起了 API 请求，那么照常计算 API 请求数（和客户端请求 API 一样）。

### 组管理功能收费吗？

组管理功能免费使用，但组下面创建的实例按照实例价格收取费用。

### 流量如何计费？

每个云引擎实例每天有 1 G 免费额度，超出部分价格可以在当前节点的价格页面查看。

一个应用下的流量额度会合并计算，即每天的免费额度为 `max(n, 1)` GB，其中 `n` 为该应用所有云引擎分组下的标准实例总数。

**云引擎不适合分发大文件之类的场景**，有此需求的开发者可以使用文件服务。

在**开发者中心 > 你的游戏 > 游戏服务 > 云服务 > 云引擎 > 云引擎分组 > 统计 > 流量**可以查看最近流量统计。

## 国际版

### 国际版云引擎必须绑定自定义域名吗？

国际版可以在「开发者中心 > 你的游戏 > 游戏服务 > 云服务 > 云引擎 > 云引擎分组 > 设置」配置 `avosapps.us` 子域名，也可以绑定云引擎自定义域名（不要求备案）。

### 国际版云引擎可以绑定裸域名吗？

如果希望在国际版云引擎绑定裸域名，我们建议选择支持 ANAME 或 CNAME Flattening 记录的域名服务商。
>>>>>>> 803298f (:technologist: Refine navigations)
=======
>>>>>>> 9aef831 (:sparkles: Organize faq):docs/sdk/15-engine/07-faq.md
