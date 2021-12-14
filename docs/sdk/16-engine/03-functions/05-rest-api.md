---
id: rest-api
title: 云函数 REST API
sidebar_label: REST API
---

:::info
这篇文档会是关于 REST API 的深入介绍，如需了解云函数和 Hook 的用法请看 [云函数和 Hook 开发指南](/sdk/engine/functions/guides)。
:::

云服务提供了统一的访问云函数的 REST API 接口，所有的客户端 SDK 也都是封装了这个接口从而实现对云函数的调用。

我们推荐使用 [Postman](http://www.getpostman.com/) 来调试 REST API。

## Base URL

REST API 请求的 Base URL（下文 curl 示例中用 `{{host}}` 表示）即应用绑定的 API 自定义域名，可以在控制台绑定、查看。
详见文档关于[绑定域名](/sdk/storage/guide/setup-dotnet#绑定域名)的说明。

## 概览

<table>
  <thead>
    <tr>
      <th>URL</th>
      <th>HTTP</th>
      <th>功能</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>/1.1/functions/&lt;functionName&gt;</td>
      <td>POST</td>
      <td>调用云函数</td>
    </tr>
    <tr>
      <td>/1.1/call/&lt;functionName&gt;</td>
      <td>POST</td>
      <td>调用云函数，支持 LCObject 作为参数和结果</td>
    </tr>
  </tbody>
</table>

## 预备环境和生产环境

在客户端通过 REST API 调用云函数时，可以设置 HTTP 头 `X-LC-Prod` 来区分调用的环境。

* `X-LC-Prod: 0` 表示调用预备环境
* `X-LC-Prod: 1` 表示调用生产环境

通过 SDK 调用云函数时，SDK 会根据当前环境设置 `X-LC-Prod` HTTP 头，详见 [云函数开发指南 § 生产环境和预备环境](/sdk/engine/functions/guides/#生产环境和预备环境) 中的说明。

## 云函数

通过 `POST /functions/:name` 可以调用云函数，参数和结果都是 JSON 格式。
例如，我们传入电影的名字来获取电影的目前的评分：

```sh
curl -X POST -H "Content-Type: application/json; charset=utf-8" \
       -H "X-LC-Id: {{appid}}" \
       -H "X-LC-Key: {{appkey}}" \
       -d '{"movie":"夏洛特烦恼"}' \
https://{{host}}/1.1/functions/averageStars
```

响应：

```json
{
  "result": {
    "movie": "夏洛特烦恼",
    "stars": "2.5"
  }
}
```

如果调用的云函数需要关联用户，那么可以通过 `X-LC-Session` 传入相应的 `sessionToken`：

```sh
curl -X POST \
  -H "X-LC-Id: {{appid}}" \
  -H "X-LC-Key: {{appkey}}" \
  -H "X-LC-Session: qmdj8pdidnmyzp0c7yqil91oc" \
  -H "Content-Type: application/json" \
  -d '{}' \
  https://{{host}}/1.1/functions/hello
```

有些时候我们希望使用 LCObject 作为云函数的参数，或者希望以 LCObject 为云函数的返回值，这时我们可以使用 `POST /1.1/call/:name` 这个 RPC 调用的 API，云函数 SDK 会将参数解释为一个 LCObject，同时在返回 LCObject 时提供必要的元信息：

```sh
curl -X POST \
  -H "X-LC-Id: {{appid}}" \
  -H "X-LC-Key: {{appkey}}" \
  -H "Content-Type: application/json" \
  -d '{"__type": "Object", "className": "Post", "pubUser": "LeanCloud 官方客服"}' \
  https://{{host}}/1.1/call/addPost
```

响应：

```json
{
  "result": {
    "__type": "Object",
    "className": "Post",
    "pubUser": "官方客服"
  }
}
```

RPC 调用时，不仅可以返回单个 LCObject，还可以返回包含 LCObject 的数据结构。
例如，假设有一个云函数返回一个数组，其中包含一个数字和一个 Todo 对象，那么 RPC 调用的结果为：

```json
{
  "result": [
    1,
    {
      "title": "工程师周会",
      "createdAt": {
        "__type": "Date",
        "iso": "2019-04-28T08:34:12.932Z"
      },
      "updatedAt": {
        "__type": "Date",
        "iso": "2019-04-28T08:34:12.932Z"
      },
      "objectId": "5cc5658443e78cb53fe7b731",
      "__type": "Object",
      "className": "Todo"
    }
  ]
}
```

在通过 SDK 进行 RPC 调用时，SDK 会据此自动反序列化。

如果云函数超时，客户端会收到 HTTP status code 为 503、524、141 等的响应。
