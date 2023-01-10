---
title: Go SDK 配置指南
sidebar_label: Go SDK 配置
slug: /sdk/storage/guide/setup-go/
sidebar_position: 1
---

import { Conditional } from "/src/docComponents/conditional";
import DomainBinding from "../../_partials/setup-domain.mdx";
import AppConfig from "../_partials/app-config.mdx";
import Path from "/src/docComponents/path";

:::info
Go SDK 为服务端 SDK，主要用于在云引擎等受信任的服务器环境中调用管理接口、云函数等。
如果你需要在自己的服务器上使用 Go SDK，请参考此篇文档完成配置。
:::

## 获取 SDK

获取 SDK 有多种方式，较为推荐的方式是通过**包依赖管理工具**下载最新版本。

### 包依赖管理工具安装

Go SDK 支持使用官方推荐的 Go Modules 进行安装和管理，如果你的项目没有使用过 Go Modules 的话需要先用 `go mod init` 来进行初始化。

你可以先在代码中引用 Go SDK:

```go
import "github.com/leancloud/go-sdk/leancloud"
```

之后运行 `go build` 的时候就会自动下载安装 Go SDK 了。

注意：

- 如果你希望创建一个新的云引擎项目的话，推荐基于我们的 [示例项目](https://github.com/leancloud/golang-getting-started) 进行开发。
- 如果依赖下载速度较慢，可以 [配置镜像](https://goproxy.cn) 或者通过代理（设置 `http_proxy` 环境变量）访问。

### 手动安装

前往 [Go SDK 下载页](https://releases.leanapp.cn/#/leancloud/go-sdk/releases)获取 SDK 并安装。

## 初始化

### 应用凭证

<AppConfig />

如果是部署到[云引擎](/sdk/engine/overview/)的项目，或在本地使用 `lean up` 启动项目时会自动注入环境变量，只需从环境变量创建客户端即可：

```go
client := leancloud.NewEnvClient()
```

在其他环境中，你也可以手动传入应用信息：

<Conditional brand="leancloud">

```go
client := leancloud.NewClient(&leancloud.ClientOptions{
  AppID:     "your-app-id",
  AppKey:    "your-app-key",
  MasterKey: "your-master-key",
  ServerURL: "https://your-server-url",
})
```

</Conditional>

<Conditional brand="tds">

```go
client := leancloud.NewClient(&leancloud.ClientOptions{
  AppID:     "your-client-id",
  AppKey:    "your-client-token",
  MasterKey: "your-server-secret",
  ServerURL: "https://your-server-url",
})
```

</Conditional>

## 域名

<DomainBinding />

## 开启调试日志

在应用开发阶段，你可以选择开启 SDK 的调试日志（debug log）来方便追踪问题。调试日志开启后，SDK 会把网络请求、错误消息等信息输出到 IDE 的日志窗口，或是浏览器 Console 或是云引擎日志（如果在云引擎下运行 SDK）。

在启动程序前设置环境变量 `LEANCLOUD_DEBUG`：

```sh
LEANCLOUD_DEBUG=true lean up
```

注意，在应用发布之前，请关闭调试日志，以免暴露敏感数据。

## 验证

首先，确认本地网络环境是可以访问云端服务器的，可以执行以下命令：

```sh
curl "https://{{host}}/1.1/date"
```

`{{host}}` 为绑定的 API 自定义域名。

如果当前网络正常会返回当前时间：

```json
{"__type":"Date","iso":"2020-10-12T06:46:56.000Z"}
```

然后在项目中编写如下测试代码：

```go
type TestObject struct {
  leancloud.Object
  Words        string    `json:"words"`
}

client := leancloud.NewENVClient()

testObject := TestObject{
  Words: "Hello world!",
}

ref, err := client.Class("TestObject").Create(&testObject)

if err != nil {
  panic(err)
}
```

保存后运行程序。

然后打开 **<Path to="storage" /> > 结构化数据 > `TestObject`**，如果看到数据表中出现一行「words」列的值为「Hello world!」的数据，说明 SDK 已经正确地执行了上述代码，配置完毕。

如果控制台没有发现对应的数据，请参考 [问题排查](#问题排查)。

## 问题排查

SDK 安装指南基于当前最新版本的 SDK 编写，所以排查问题前，请先检查下安装的 SDK 是不是最新版本。

### `401 Unauthorized`

如果 SDK 抛出 `401` 异常或者查看本地网络访问日志存在：

```json
{
  "code": 401,
  "error": "Unauthorized."
}
```

则可认定为 App ID 或者 App Key 输入有误，或者是不匹配，很多开发者同时注册了多个应用，导致拷贝粘贴的时候，用 A 应用的 App ID 匹配 B 应用的 App Key，这样就会出现服务端鉴权失败的错误。

### 客户端无法访问网络

客户端尤其是手机端，应用在访问网络的时候需要申请一定的权限。
