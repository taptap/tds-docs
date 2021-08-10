---
id: rest
title: 即时通讯 REST API
sidebar_label: 即时通讯 REST API
---



## 概览

请求的 Base URL 可以在**云服务控制台 > 设置 > 应用 Keys > 服务器地址**查看。
对于 POST 和 PUT 请求，请求的主体必须是 JSON 格式，而且 HTTP Header 的 Content-Type 需要设置为 `application/json`。
请求的鉴权是通过 HTTP Header 里面包含的键值对来进行的，详见[数据存储 REST API 使用详解](/sdk/storage/guide/rest/)中《请求格式》一节的说明。


`_Conversation` 表包含一些内置的关键字段定义了对话的属性、成员等，单聊、群聊、聊天室、服务号均在此表中，详见[即时通讯总览](/sdk/im/guide/overview/)的《对话》一节。
不过为了避免出现数据不一致问题，我们不推荐调用数据存储相关的 API 直接操作 `_Conversation` 表中的数据。

当前的 API 版本为 `1.2`：

- 单聊、群聊相关 API 以 `rtm/conversations` 标示
- 聊天室相关 API 以 `rtm/chatrooms` 标示，在 `_Conversation` 表内用字段 `tr` 为 true 标示。
- 服务号相关 API 以 `rtm/service-conversations` 标示，在 `_Conversation` 表内用字段 `sys` 为 true 标示。

除此之外，与 client 相关的请求以 `rtm/clients` 标示。
最后，一些全局性质的 API 直接以 `rtm/{function}` 标示，如 `rtm/all-conversations` 可查询所有类型的对话。

## 单聊、群聊

### 创建对话

在 `_Conversation` 表默认 ACL 权限下本接口要求使用 master key。

```sh
curl -X POST \
  -H "X-LC-Id: {{appid}}" \
  -H "X-LC-Key: {{masterkey}},master" \
  -H "Content-Type: application/json" \
  -d '{"name":"My First Conversation", "m": ["BillGates", "SteveJobs"], "unique": true}' \
  https://{{host}}/1.2/rtm/conversations
```

上面的例子会创建一个最简单的对话，包括两个 client ID 为 BillGates 和 SteveJobs 的初始成员。对话创建成功会返回 objectId，即即时通讯中的对话 ID，客户端就可以通过这个 ID 发送消息了。新创建的对话可以在 `_Conversation` 表内找到。
对话的字段可参考[即时通讯总览](/sdk/im/guide/overview/)的《对话》一节。
传入 `"unique": true` 参数可以保证对话的唯一性。

返回

```json
{
  "unique":true,
  "updatedAt":"2020-05-26T06:42:31.492Z",
  "name":"My First Conversation",
  "objectId":"5eccba570d3a42c5fd4e25c3",
  "m":["BillGates","SteveJobs"],
  "createdAt":"2020-05-26T06:42:31.482Z",
  "uniqueId":"6c7b0e5afcae9aa1139a0afa25833dec"
}
```

需要注意，群聊与单聊的唯一区别是 client 数量，API 层面是一致的。

### 查询对话

在 `_Conversation` 表默认 ACL 权限下本接口要求使用 master key。

```sh
curl -X GET \
  -H "X-LC-Id: {{appid}}" \
  -H "X-LC-Key: {{masterkey}},master" \
  -G \
  --data-urlencode 'where={"name": "first conversation"}' \
  --data-urlencode 'skip=1' \
  --data-urlencode 'limit=20' \
  https://{{host}}/1.2/rtm/conversations
```

参数 | 约束 | 说明
---|---|---
skip | 可选 |
limit | 可选 | 与 skip 联合使用实现分页
where | 可选 | 参见[数据存储 REST API 使用详解](/sdk/storage/guide/rest/)的《查询》一节


返回

```json
{"results": [
  {"name":"test conv1",
  "m":["tom", "jerry"],
  "createdAt":"2018-01-17T04:15:33.386Z",
  "updatedAt":"2018-01-17T04:15:33.386Z",
  "objectId":"5a5ecde6c3422b738c8779d7"}
]}
```

### 更新对话

在 `_Conversation` 表默认 ACL 权限下本接口要求使用 master key。

```sh
curl -X PUT \
  -H "X-LC-Id: {{appid}}" \
  -H "X-LC-Key: {{masterkey}},master" \
  -H "Content-Type: application/json" \
  -d '{"name":"Updated Conversation"}' \
  https://{{host}}/1.2/rtm/conversations/{conv_id}
```

`_Conversation` 表除 m 字段均可通过这个接口更新。

返回

```json
{"updatedAt":"2018-01-16T03:40:37.683Z", "objectId":"5a5d7433c3422b31ed845e76"}
```


### 删除对话

在 `_Conversation` 表默认 ACL 权限下本接口要求使用 master key。

```sh
curl -X DELETE \
  -H "X-LC-Id: {{appid}}" \
  -H "X-LC-Key: {{masterkey}},master" \
  https://{{host}}/1.2/rtm/conversations/{conv_id}
```

返回

```json
{}
```

### 增加成员

在 `_Conversation` 表默认 ACL 权限下本接口要求使用 master key。

```sh
curl -X POST \
  -H "X-LC-Id: {{appid}}" \
  -H "X-LC-Key: {{masterkey}},master" \
  -H "Content-Type: application/json" \
  -d '{"client_ids": ["Tom", "Jerry"]}' \
  https://{{host}}/1.2/rtm/conversations/{conv_id}/members
```

返回

```json
{"updatedAt":"2018-01-16T03:40:37.683Z", "objectId":"5a5d7433c3422b31ed845e76"}
```

### 移除成员

在 `_Conversation` 表默认 ACL 权限下本接口要求使用 master key。

```sh
curl -X DELETE \
  -H "X-LC-Id: {{appid}}" \
  -H "X-LC-Key: {{masterkey}},master" \
  -H "Content-Type: application/json" \
  -d '{"client_ids": ["Tom", "Jerry"]}' \
  https://{{host}}/1.2/rtm/conversations/{conv_id}/members
```

返回

```json
{"updatedAt":"2018-01-16T03:40:37.683Z", "objectId":"5a5d7433c3422b31ed845e76"}
```


### 查询成员

在 `_Conversation` 表默认 ACL 权限下本接口要求使用 master key。

```sh
curl -X GET \
  -H "X-LC-Id: {{appid}}" \
  -H "X-LC-Key: {{masterkey}},master" \
  https://{{host}}/1.2/rtm/conversations/{conv_id}/members
```

返回

```json
{"result": ["client1", "client2"]}
```


### 增加静音用户

在 `_Conversation` 表默认 ACL 权限下本接口要求使用 master key。

```sh
curl -X POST \
  -H "X-LC-Id: {{appid}}" \
  -H "X-LC-Key: {{masterkey}},master" \
  -H "Content-Type: application/json" \
  -d '{"client_ids": ["Tom", "Jerry"]}' \
  https://{{host}}/1.2/rtm/conversations/{conv_id}/mutes
```

参数 | 说明
--- | ---
client_ids | 要静音的 `Client ID`，数组

返回

```json
{"updatedAt":"2018-01-16T03:40:37.683Z", "objectId":"5a5d7433c3422b31ed845e76"}
```

### 移除静音用户

在 `_Conversation` 表默认 ACL 权限下本接口要求使用 master key。

```sh
curl -X DELETE \
  -H "X-LC-Id: {{appid}}" \
  -H "X-LC-Key: {{masterkey}},master" \
  -H "Content-Type: application/json" \
  -d '{"client_ids": ["Tom", "Jerry"]}' \
  https://{{host}}/1.2/rtm/conversations/{conv_id}/mutes
```

返回

```json
{"updatedAt":"2018-01-16T03:40:37.683Z", "objectId":"5a5d7433c3422b31ed845e76"}
```

### 查询静音用户

在 `_Conversation` 表默认 ACL 权限下本接口要求使用 master key。

```sh
curl -X GET \
  -H "X-LC-Id: {{appid}}" \
  -H "X-LC-Key: {{masterkey}},master" \
  https://{{host}}/1.2/rtm/conversations/{conv_id}/mutes
```

返回

```json
{"result": ["client1", "client2"]}
```


### 单聊、群聊-发消息

该接口要求使用 master key。

```sh
curl -X POST \
  -H "X-LC-Id: {{appid}}" \
  -H "X-LC-Key: {{masterkey}},master" \
  -H "Content-Type: application/json" \
  -d '{"from_client": "", "message": ""}' \
  https://{{host}}/1.2/rtm/conversations/{conv_id}/messages
```

**注意**，由于这个接口的管理性质，当你通过这个接口发送消息时，我们不会检查 **from_client** 是否有权限给这个对话发送消息，而是统统放行，请谨慎使用这个接口。
如果你在应用中使用了我们内部定义的富媒体消息格式，在发送消息时 **message** 字段需要遵守相应的格式要求。


参数 | 约束 | 说明
---|---|---
from_client | 必填 | 消息的发件人 client Id
message | 必填 | 消息内容（这里的消息内容的本质是字符串，但是我们对字符串内部的格式没有做限定，理论上开发者可以随意发送任意格式，只要大小不超过 5 KB 限制即可。）
transient | 可选 | 是否为暂态消息，默认 false
no_sync | 可选 | 默认情况下消息会被同步给在线的 from_client 用户的客户端，设置为 true 禁用此功能。
push_data | 可选 | 以消息附件方式设置本条消息的离线推送通知内容。如果目标接收者使用的是 iOS 设备并且当前不在线，我们会按照该参数填写的内容来发离线推送。请参看[即时通讯开发指南第二篇](/sdk/im/guide/intermediate/)的《离线推送通知》一节的说明。
priority | 可选 | 定义消息优先级，可选值为 high、normal、low，分别对应高、中、低三种优先级。该参数大小写不敏感，默认为中优先级 normal。本参数仅对暂态消息或聊天室的消息有效，高优先级下在服务端与用户设备的连接拥塞时依然排队。
mention_all | 可选 | 布尔类型，用于提醒对话内所有成员注意本消息。
mention_client_ids | 可选 | 数组类型，表示需要提醒注意本消息的对话内成员 client_id 列表，最多能包含 20 个 client Id。 

返回说明：

默认情况下发送消息 API 使用异步的方式，调用后返回消息 id 和接收消息的服务器时间戳，例如 `{"msg-id":"qNkRkFWOeSqP65S9fDyHJw", "timestamp":1495431811151}`。

频率限制：

此接口受频率限制，详见后文[接口请求频率限制](#接口请求频率限制)一节。

### 查询历史消息

该接口要求使用 master key。
为了保证获取聊天记录的安全性，可以开启签名认证，具体可以参考[即时通讯开发指南第三篇](/sdk/im/guide/senior/)的《安全与签名》一节。

```sh
curl -X GET \
  -H "X-LC-Id: {{appid}}" \
  -H "X-LC-Key: {{masterkey}},master" \
  -H "Content-Type: application/json" \
  https://{{host}}/1.2/rtm/conversations/{conv_id}/messages
```

参数 | 约束 | 说明
--- | --- | ---
msgid | 可选 | 起始的消息 id，**使用时必须加上对应消息的时间戳 timestamp 参数，作为查询的起点**
timestamp | 可选 | 查询起始的时间戳。默认是当前时间，单位是毫秒
till_msgid | 可选 | 查询终止的消息 id。**使用时必须加上消息的时间戳 till_timestamp 参数，作为查询的终点**
till_timestamp | 可选 | 查询终止的时间戳，默认为 0，单位是毫秒
include_start | 可选 | 是否包含由 timestamp 与 msgid 确定的起始消息。布尔值，默认为 false
include_stop | 可选 | 是否包含由 till_timestamp 与 till_msgid 确定的终止消息。布尔值，默认为 false
reversed | 可选 | 以默认排序（默认按时间降序）相反的方向返回结果，这时 till_timestamp 默认为当前时间戳，timestamp 默认为 0。布尔值，默认为 false
limit | 可选 | 返回条数限制，可选，默认 100 条，最大 1000 条
client_id | 可选 | 查看者 id（签名参数）
nonce | 可选 | 签名随机字符串（签名参数）
signature_ts | 可选 | 签名时间戳（签名参数），单位是毫秒
signature | 可选 | 签名（签名参数）

本接口时间参数较多，这里举一示例供大家参考。比如某对话内有三条消息，id 分别为 id1、id2、id3，发消息的时间分别是 t1、t2、t3（t1 < t2 < t3），下面列举出不同参数组合的查询结果（空白表示使用默认值）：

| timestamp| msgid| till_timestamp| till_msgid| include_start| include_stop| reversed| 结果 |
| ---------|---------|---------|---------|---------|---------|---------|--------- |
| t3| id3| t1| id1| | | | id2 |
| t3| id3| t1| id1| true| | | id3 id2 |
| t3| id3| t1| id1| | true| | id2 id1 |
| t1| id1| t3| id3| | | true| id2 |
| t1| id1| t3| id3| true| | true| id1 id2 |
| t1| id1| t3| id3| | true| true| id2 id3 |

返回数据格式，JSON 数组，默认按消息记录从新到旧排序，设置请求参数 `reversed` 后以相反的方向排序。

返回：

```json
[
  {
    "timestamp": 1408008498571,
    "conv-id":   "219946ef32e40c515d33ae6975a5c593",
    "data":      "今天天气不错！",
    "from":      "u111872755_9d0461adf9c267ae263b3742c60fa",
    "msg-id":    "vdkGm4dtRNmhQ5gqUTFBiA",
    "is-conv":   true,
    "is-room":   false,
    "to":        "5541c02ce4b0f83f4d44414e",
    "bin":       false,
    "from-ip":   "202.117.15.217"
  },
  ...
]
```

如需查询某个用户发出的消息，可以调用 `GET /rtm/clients/{client_id}/messages` 这个接口。
如需查询整个应用的历史消息，可以调用 `GET /rtm/messages` 这个接口。

### 单聊、群聊-修改消息

该接口要求使用 master key。

```sh
curl -X PUT \
  -H "X-LC-Id: {{appid}}" \
  -H "X-LC-Key: {{masterkey}},master" \
  -H "Content-Type: application/json" \
  -d '{"from_client": "", "message": "", "timestamp": 123}' \
  https://{{host}}/1.2/rtm/conversations/{conv_id}/messages/{message_id}
```

参数 | 约束 | 说明
---|---|---
from_client | 必填 | 消息的发件人 client ID
message | 必填 | 消息体
timestamp | 必填 | 消息的时间戳

成功则返回状态码 `200 OK`。

频率限制：

此接口受频率限制，详见后文[接口请求频率限制](#接口请求频率限制)一节。

### 单聊、群聊-撤回消息

该接口要求使用 master key。需要相应 SDK 的支持，具体可参考之前的修改消息接口。

```sh
curl -X PUT \
  -H "X-LC-Id: {{appid}}" \
  -H "X-LC-Key: {{masterkey}},master" \
  -H "Content-Type: application/json" \
  -d '{"from_client": "", "timestamp": 123}' \
  https://{{host}}/1.2/rtm/conversations/{conv_id}/messages/{message_id}/recall
```


参数 | 约束 | 说明
---|---|---
from_client | 必填 | 消息的发件人 client ID
timestamp | 必填 | 消息的时间戳

成功则返回状态码 `200 OK`。

频率限制：

此接口受频率限制，详见后文[接口请求频率限制](#接口请求频率限制)一节。

### 删除消息

该接口要求使用 master key。

```sh
curl -X DELETE \
  -H "X-LC-Id: {{appid}}" \
  -H "X-LC-Key: {{masterkey}},master" \
  -G \
  --data-urlencode 'from_client=some-client-id' \
  --data-urlencode 'timestamp=123' \
  https://{{host}}/1.2/rtm/conversations/{conv_id}/messages/{message_id}
```

注意，该接口仅删除服务端的消息，对客户端无影响。

参数 | 约束 | 说明
---|---|---
from_client | 必填 | 消息的发件人 client ID
timestamp | 必填 | 消息的时间戳


返回：

```json
{}
```

### 增加临时性禁言用户

该接口要求使用 master key。

```sh
curl -X POST \
  -H "X-LC-Id: {{appid}}" \
  -H "X-LC-Key: {{masterkey}},master" \
  -H "Content-Type: application/json" \
  -d '{"client_id": "some-client-id", "ttl": 50}' \
  https://{{host}}/1.2/rtm/conversations/{conv_id}/temporary-silenceds
```

参数 | 说明
--- | ---
client_id | 要禁言的 `Client ID`，字符串
ttl | 禁言的时间，秒数，最长 24 小时

返回

```json
{}
```

### 移除临时性禁言用户

该接口要求使用 master key。

```sh
curl -X DELETE \
  -H "X-LC-Id: {{appid}}" \
  -H "X-LC-Key: {{masterkey}},master" \
  -G \
  --data-urlencode 'client_id=some-client-id' \
  https://{{host}}/1.2/rtm/conversations/{conv_id}/temporary-silenceds
```

返回

```json
{}
```

### 对话权限

该功能介绍可参考[即时通讯开发指南第三篇](/sdk/im/guide/senior/)中的《权限管理与黑名单》一节。

#### 增加权限

该接口要求使用 master key。
每个对话最多允许添加 500 个永久性禁言用户。

```sh
curl -X POST \
  -H "X-LC-Id: {{appid}}" \
  -H "X-LC-Key: {{masterkey}},master" \
  -H "Content-Type: application/json" \
  -d '{"clientId": "client", "role": "role"}' \
  https://{{host}}/1.2/rtm/conversations/{conv_id}/member-infos
```

参数 | 说明
--- | ---
clientId | 用户 ID，字符串
role | 角色，可选值 Member、Manager、Owner

返回

```json
{"updatedAt":"2018-01-16T03:40:37.683Z", "objectId":"5a5d7433c3422b31ed845e76"}
```

#### 删除权限

该接口要求使用 master key。

```sh
curl -X DELETE \
  -H "X-LC-Id: {{appid}}" \
  -H "X-LC-Key: {{masterkey}},master" \
  https://{{host}}/1.2/rtm/conversations/{conv_id}/member-infos/{info-id}
```

参数 | 说明
--- | ---
info-id | 该记录对应的 objectId

返回

```json
{}
```

#### 更新权限

该接口要求使用 master key。

```sh
curl -X PUT \
  -H "X-LC-Id: {{appid}}" \
  -H "X-LC-Key: {{masterkey}},master" \
  -H "Content-Type: application/json" \
  -d '{"clientId": "client", "role": "role"}' \
  https://{{host}}/1.2/rtm/conversations/{conv_id}/member-infos/{info-id}
```

参数 | 说明
--- | ---
clientId | 用户 ID，字符串
role | 角色，可选值 Member、Manager、Owner。可选
info-id | 该记录对应的 objectId

返回

```json
{"updatedAt":"2018-01-16T03:40:37.683Z", "objectId":"5a5d7433c3422b31ed845e76"}
```


#### 查询权限

该接口要求使用 master key。

```sh
curl -X GET \
  -H "X-LC-Id: {{appid}}" \
  -H "X-LC-Key: {{masterkey}},master" \
  -G \
  --data-urlencode 'skip=1' \
  --data-urlencode 'limit=20' \
  https://{{host}}/1.2/rtm/conversations/{conv_id}/member-infos
```

参数 | 说明
--- | ---
skip |
limit | 与 skip 联合使用实现分页
role | 本次查询只希望包含该角色

返回

```json
{"results": [{"clientId":"client1", "objectId":"5a5d7433c3422b31ed845e76", "role": "Manager"}]}
```


#### 增加永久性禁言用户

该接口要求使用 master key。
每个对话最多允许添加 500 个永久性禁言用户。

```sh
curl -X POST \
  -H "X-LC-Id: {{appid}}" \
  -H "X-LC-Key: {{masterkey}},master" \
  -H "Content-Type: application/json" \
  -d '{"client_ids": ["client1", "client2"]}' \
  https://{{host}}/1.2/rtm/conversations/{conv_id}/permanent-silenceds
```

参数 | 说明
--- | ---
client_ids | 要禁言的 `Client ID` 列表，数组

返回

```json
{}
```

#### 移除永久性禁言用户

该接口要求使用 master key。

```sh
curl -X DELETE \
  -H "X-LC-Id: {{appid}}" \
  -H "X-LC-Key: {{masterkey}},master" \
  -d '{"client_ids": ["client1", "client2"]}' \
  https://{{host}}/1.2/rtm/conversations/{conv_id}/permanent-silenceds
```

返回

```json
{}
```

#### 查询永久性禁言列表

该接口要求使用 master key。

```sh
curl -X GET \
  -H "X-LC-Id: {{appid}}" \
  -H "X-LC-Key: {{masterkey}},master" \
  -G \
  --data-urlencode 'limit=20' \
  https://{{host}}/1.2/rtm/conversations/{conv_id}/permanent-silenceds
```

参数 | 约束 | 说明
---|---|---
limit | 可选 | 与 next 联合使用实现分页，默认 10
next | 可选 | 第一次查询时返回，后面的查询带着这个参数，实现分页查询

返回

```json
{"client_ids": ["client1", "client2"]}
```

### 黑名单

该功能介绍可参考[即时通讯开发指南第三篇](/sdk/im/guide/senior/)中的《权限管理与黑名单》一节。

#### 增加对话黑名单

该接口要求使用 master key。

加入黑名单的 client 不允许再加入该对话，如果之前在该对话中将被移除。每个对话最多允许添加 500 个黑名单。

```sh
curl -X POST \
  -H "X-LC-Id: {{appid}}" \
  -H "X-LC-Key: {{masterkey}},master" \
  -H "Content-Type: application/json" \
  -d '{"client_ids": ["client1", "client2"]}' \
  https://{{host}}/1.2/rtm/conversations/{conv_id}/blacklists
```

参数 | 说明
--- | ---
client_ids | 要拉黑的 `Client ID` 列表，数组

返回

```json
{}
```

#### 移除对话黑名单

该接口要求使用 master key。

```sh
curl -X DELETE \
  -H "X-LC-Id: {{appid}}" \
  -H "X-LC-Key: {{masterkey}},master" \
  -d '{"client_ids": ["client1", "client2"]}' \
  https://{{host}}/1.2/rtm/conversations/{conv_id}/blacklists
```

返回

```json
{}
```

#### 查询对话黑名单

该接口要求使用 master key。

```sh
curl -X GET \
  -H "X-LC-Id: {{appid}}" \
  -H "X-LC-Key: {{masterkey}},master" \
  -d '{"client_ids": ["client1", "client2"]}' \
  https://{{host}}/1.2/rtm/conversations/{conv_id}/blacklists
```

参数 | 约束 | 说明
---|---|---
limit | 可选 | 与 next 联合使用实现分页，默认 10
next | 可选 | 第一次查询时返回，后面的查询带着这个参数，实现分页查询

返回

```json
{"client_ids": ["client1", "client2"]}
```

## 聊天室

### 创建聊天室

在 `_Conversation` 表默认 ACL 权限下本接口要求使用 master key。

```sh
curl -X POST \
  -H "X-LC-Id: {{appid}}" \
  -H "X-LC-Key: {{masterkey}},master" \
  -H "Content-Type: application/json" \
  -d '{"name":"My First Chatroom"}' \
  https://{{host}}/1.2/rtm/chatrooms
```

对话的字段可参考[即时通讯总览](/sdk/im/guide/overview/)的《对话》一节。

返回

```json
{"objectId":"5a5d7432c3422b31ed845e75", "createdAt":"2018-01-16T03:40:32.814Z"}
```

### 查询聊天室

在 `_Conversation` 表默认 ACL 权限下本接口要求使用 master key。

```sh
curl -X GET \
  -H "X-LC-Id: {{appid}}" \
  -H "X-LC-Key: {{masterkey}},master" \
  -G \
  --data-urlencode 'where={"name": "chatroom"}' \
  --data-urlencode 'skip=1' \
  --data-urlencode 'limit=20' \
  https://{{host}}/1.2/rtm/chatrooms
```

参数 | 约束 | 说明
---|---|---
skip | 可选 |
limit | 可选 | 与 skip 联合使用实现分页
where | 可选 | 请参考[数据存储 REST API 使用详解](/sdk/storage/guide/rest/)的《查询》一节。


返回

```json
{"results":[
  {"name":"My First Chatroom",
  "createdAt":"2018-01-17T04:15:33.386Z", "updatedAt":"2018-01-17T04:15:33.386Z",
  "objectId"=>"5a5ecde6c3422b738c8779d7"}
]}
```

### 更新聊天室

在 `_Conversation` 表默认 ACL 权限下本接口要求使用 master key。

```sh
curl -X PUT \
  -H "X-LC-Id: {{appid}}" \
  -H "X-LC-Key: {{masterkey}},master" \
  -H "Content-Type: application/json" \
  -d '{"name":"Updated Chatroom"}' \
  https://{{host}}/1.2/rtm/chatrooms/{chatroom_id}
```

返回

```json
{"updatedAt":"2018-01-16T03:40:37.683Z", "objectId":"5a5d7433c3422b31ed845e76"}
```

### 删除聊天室

在 `_Conversation` 表默认 ACL 权限下本接口要求使用 master key。

```sh
curl -X DELETE \
  -H "X-LC-Id: {{appid}}" \
  -H "X-LC-Key: {{masterkey}},master" \
  https://{{host}}/1.2/rtm/chatrooms/{chatroom_id}
```

返回

```json
{}
```

### 随机获取在线成员

该接口要求使用 master key。

```sh
curl -X GET \
  -H "X-LC-Id: {{appid}}" \
  -H "X-LC-Key: {{masterkey}},master" \
  https://{{host}}/1.2/rtm/chatrooms/{chatroom_id}/members
```

返回

```json
{"result": ["clientid1", "clientid2", "clientid3"]}
```

### 查询在线成员数

该接口要求使用 master key。

```sh
curl -X GET \
  -H "X-LC-Id: {{appid}}" \
  -H "X-LC-Key: {{masterkey}},master" \
  https://{{host}}/1.2/rtm/chatrooms/{chatroom_id}/members/online-count
```

返回

```json
{"result": 3}
```


### 聊天室-发消息

该接口要求使用 master key。

```sh
curl -X POST \
  -H "X-LC-Id: {{appid}}" \
  -H "X-LC-Key: {{masterkey}},master" \
  -H "Content-Type: application/json" \
  -d '{"from_client": "", "message": ""}' \
  https://{{host}}/1.2/rtm/chatrooms/{chatroom_id}/messages
```

**注意**，由于这个接口的管理性质，当你通过这个接口发送消息时，我们不会检查 **from_client** 是否有权限给这个聊天室发送消息，而是统统放行，请谨慎使用这个接口。
如果你在应用中使用了我们内部定义的富媒体消息格式，在发送消息时 **message** 字段需要相应的格式要求。
此外，聊天室目前**不支持**将消息同步发送给在线的 **from_client**。

参数 | 约束 | 说明
---|---|---
from_client | 必填 | 消息的发件人 client Id
message | 必填 | 消息内容（这里的消息内容的本质是字符串，但是我们对字符串内部的格式没有做限定，理论上开发者可以随意发送任意格式，只要大小不超过 5 KB 限制即可。）
transient | 可选 | 是否为暂态消息，默认 false
priority | 可选 | 定义消息优先级，可选值为 high、normal、low，分别对应高、中、低三种优先级。该参数大小写不敏感，默认为中优先级 normal。本参数仅对暂态消息或聊天室的消息有效，高优先级下在服务端与用户设备的连接拥塞时依然排队。
mention_all | 可选 | 布尔类型，用于提醒对话内所有成员注意本消息。
mention_client_ids | 可选 | 数组类型，表示需要提醒注意本消息的对话内成员 client_id 列表，最多能包含 20 个 client Id。

返回说明：

默认情况下发送消息 API 使用异步的方式，调用后返回消息 id 和接收消息的服务器时间戳，例如 `{"msg-id":"qNkRkFWOeSqP65S9fDyHJw", "timestamp":1495431811151}`。

频率限制：

此接口受频率限制，详见后文[接口请求频率限制](#接口请求频率限制)一节。

### 查询历史消息

该接口要求使用 master key。
为了保证获取聊天记录的安全性，可以开启签名认证，具体可以参考[即时通讯开发指南第三篇](/sdk/im/guide/senior/)的《安全与签名》一节。

```sh
curl -X GET \
  -H "X-LC-Id: {{appid}}" \
  -H "X-LC-Key: {{masterkey}},master" \
  -H "Content-Type: application/json" \
  https://{{host}}/1.2/rtm/chatrooms/{conv_id}/messages
```

参数 | 约束 | 说明
--- | --- | ---
msgid | 可选 | 起始的消息 id，**使用时必须加上对应消息的时间戳 timestamp 参数，作为查询的起点**
timestamp | 可选 | 查询起始的时间戳。默认是当前时间，单位是毫秒
till_msgid | 可选 | 查询终止的消息 id。**使用时必须加上消息的时间戳 till_timestamp 参数，作为查询的终点**
till_timestamp | 可选 | 查询终止的时间戳，默认为 0，单位是毫秒
include_start | 可选 | 是否包含由 timestamp 与 msgid 确定的起始消息。布尔值，默认为 false
include_stop | 可选 | 是否包含由 till_timestamp 与 till_msgid 确定的终止消息。布尔值，默认为 false
reversed | 可选 | 以默认排序（默认按时间降序）相反的方向返回结果，这时 till_timestamp 默认为当前时间戳，timestamp 默认为 0。布尔值，默认为 false
limit | 可选 | 返回条数限制，可选，默认 100 条，最大 1000 条
client_id | 可选 | 查看者 id（签名参数）
nonce | 可选 | 签名随机字符串（签名参数）
signature_ts | 可选 | 签名时间戳（签名参数），单位是毫秒
signature | 可选 | 签名（签名参数）

本接口时间参数较多，这里举一示例供大家参考。比如某对话内有三条消息，id 分别为 id1、id2、id3，发消息的时间分别是 t1、t2、t3（t1 < t2 < t3），下面列举出不同参数组合的查询结果（空白表示使用默认值）：

| timestamp| msgid| till_timestamp| till_msgid| include_start| include_stop| reversed| 结果 |
| ---------|---------|---------|---------|---------|---------|---------|--------- |
| t3| id3| t1| id1| | | | id2 |
| t3| id3| t1| id1| true| | | id3 id2 |
| t3| id3| t1| id1| | true| | id2 id1 |
| t1| id1| t3| id3| | | true| id2 |
| t1| id1| t3| id3| true| | true| id1 id2 |
| t1| id1| t3| id3| | true| true| id2 id3 |

返回数据格式，JSON 数组，默认按消息记录从新到旧排序，设置请求参数 `reversed` 后以相反的方向排序。

返回：

```json
[
  {
    "timestamp": 1408008498571,
    "conv-id":   "219946ef32e40c515d33ae6975a5c593",
    "data":      "今天天气不错！",
    "from":      "u111872755_9d0461adf9c267ae263b3742c60fa",
    "msg-id":    "vdkGm4dtRNmhQ5gqUTFBiA",
    "is-conv":   true,
    "is-room":   false,
    "to":        "5541c02ce4b0f83f4d44414e",
    "bin":       false,
    "from-ip":   "202.117.15.217"
  },
  ...
]
```

如需查询某个用户发出的消息，可以调用 `GET /rtm/clients/{client_id}/messages` 这个接口。
如需查询整个应用的历史消息，可以调用 `GET /rtm/messages` 这个接口

### 聊天室-修改消息

该接口要求使用 master key。

```sh
curl -X PUT \
  -H "X-LC-Id: {{appid}}" \
  -H "X-LC-Key: {{masterkey}},master" \
  -H "Content-Type: application/json" \
  -d '{"from_client": "", "message": "", "timestamp": 123}' \
  https://{{host}}/1.2/rtm/chatrooms/{chatroom_id}/messages/{message_id}
```

参数 | 约束 | 说明
---|---|---
from_client | 必填 | 消息的发件人 client ID
message | 必填 | 消息体
timestamp | 必填 | 消息的时间戳

成功则返回状态码 `200 OK`。

频率限制：

此接口受频率限制，详见后文[接口请求频率限制](#接口请求频率限制)一节。

### 聊天室-撤回消息

该接口要求使用 master key。需要相应 SDK 的支持，具体可参考上面的「修改消息」接口。

```sh
curl -X PUT \
  -H "X-LC-Id: {{appid}}" \
  -H "X-LC-Key: {{masterkey}},master" \
  -H "Content-Type: application/json" \
  -d '{"from_client": "", "timestamp": 123}' \
  https://{{host}}/1.2/rtm/chatrooms/{chatroom_id}/messages/{message_id}/recall
```


参数 | 约束 | 说明
---|---|---
from_client | 必填 | 消息的发件人 client ID
timestamp | 必填 | 消息的时间戳

成功则返回状态码 `200 OK`。

频率限制：

此接口受频率限制，详见后文[接口请求频率限制](#接口请求频率限制)一节。

### 删除消息

该接口要求使用 master key。

```sh
curl -X DELETE \
  -H "X-LC-Id: {{appid}}" \
  -H "X-LC-Key: {{masterkey}},master" \
  -G \
  --data-urlencode 'from_client=some-client-id' \
  --data-urlencode 'timestamp=123' \
  https://{{host}}/1.2/rtm/chatrooms/{chatroom_id}/messages/{message_id}
```

注意，该接口仅删除服务端的消息，对客户端无影响。

参数 | 约束 | 说明
---|---|---
from_client | 必填 | 消息的发件人 client ID
timestamp | 必填 | 消息的时间戳


返回：

```json
{}
```

### 增加临时性禁言用户

该接口要求使用 master key。

```sh
curl -X POST \
  -H "X-LC-Id: {{appid}}" \
  -H "X-LC-Key: {{masterkey}},master" \
  -H "Content-Type: application/json" \
  -d '{"client_id": "some-client-id", "ttl": 50}' \
  https://{{host}}/1.2/rtm/chatrooms/{chatroom_id}/temporary-silenceds
```

参数 | 说明
--- | ---
client_id | 要禁言的 id，字符串
ttl | 禁言的时间，秒数，最长 24 小时

返回

```json
{}
```

### 移除临时性禁言用户

该接口要求使用 master key。

```sh
curl -X DELETE \
  -H "X-LC-Id: {{appid}}" \
  -H "X-LC-Key: {{masterkey}},master" \
  -G \
  --data-urlencode 'client_id=some-client-id' \
  https://{{host}}/1.2/rtm/chatrooms/{chatroom_id}/temporary-silenceds
```

返回

```json
{}
```

### 对话权限

该功能介绍可参考[即时通讯开发指南第三篇](/sdk/im/guide/senior/)中的《权限管理与黑名单》一节。

#### 增加权限

该接口要求使用 master key。
每个聊天室最多允许添加 10,000 个永久性禁言用户。

```sh
curl -X POST \
  -H "X-LC-Id: {{appid}}" \
  -H "X-LC-Key: {{masterkey}},master" \
  -H "Content-Type: application/json" \
  -d '{"clientId": "client", "role": "role"}' \
  https://{{host}}/1.2/rtm/chatrooms/{conv_id}/member-infos
```

参数 | 说明
--- | ---
clientId | 用户 ID，字符串
role | 角色，可选值 Member、Manager、Owner

返回

```json
{"updatedAt":"2018-01-16T03:40:37.683Z", "objectId":"5a5d7433c3422b31ed845e76"}
```

#### 删除权限

该接口要求使用 master key。

```sh
curl -X DELETE \
  -H "X-LC-Id: {{appid}}" \
  -H "X-LC-Key: {{masterkey}},master" \
  https://{{host}}/1.2/rtm/chatrooms/{conv_id}/member-infos/{info-id}
```

参数 | 说明
--- | ---
info-id | 该记录对应的 objectId

返回

```json
{}
```

#### 更新权限

该接口要求使用 master key。

```sh
curl -X PUT \
  -H "X-LC-Id: {{appid}}" \
  -H "X-LC-Key: {{masterkey}},master" \
  -H "Content-Type: application/json" \
  -d '{"clientId": "client", "role": "role"}' \
  https://{{host}}/1.2/rtm/chatrooms/{conv_id}/member-infos/{info-id}
```

参数 | 说明
--- | ---
client_id | 要禁言的 id，字符串。可选
role | 角色，可选值 Member、Manager、Owner。可选
info-id | 该记录对应的 objectId

返回

```json
{"updatedAt":"2018-01-16T03:40:37.683Z", "objectId":"5a5d7433c3422b31ed845e76"}
```


#### 查询权限

该接口要求使用 master key。

```sh
curl -X GET \
  -H "X-LC-Id: {{appid}}" \
  -H "X-LC-Key: {{masterkey}},master" \
  -G \
  --data-urlencode 'skip=1' \
  --data-urlencode 'limit=20' \
  https://{{host}}/1.2/rtm/chatrooms/{conv_id}/member-infos
```

参数 | 说明
--- | ---
skip |
limit | 与 skip 联合使用实现分页
role | 本次查询只希望包含该角色

返回

```json
{"results": [{"clientId":"client1", "objectId":"5a5d7433c3422b31ed845e76", "role": "Manager"}]}
```


#### 增加永久性禁言用户

该接口要求使用 master key。
每个聊天室最多允许添加 500 个永久性禁言用户。

```sh
curl -X POST \
  -H "X-LC-Id: {{appid}}" \
  -H "X-LC-Key: {{masterkey}},master" \
  -H "Content-Type: application/json" \
  -d '{"client_ids": ["client1", "client2"]}' \
  https://{{host}}/1.2/rtm/chatrooms/{conv_id}/permanent-silenceds
```

参数 | 说明
--- | ---
client_ids | 要禁言的 `Client ID` 列表，数组

返回

```json
{}
```

#### 移除永久性禁言用户

该接口要求使用 master key。

```sh
curl -X DELETE \
  -H "X-LC-Id: {{appid}}" \
  -H "X-LC-Key: {{masterkey}},master" \
  -d '{"client_ids": ["client1", "client2"]}' \
  https://{{host}}/1.2/rtm/chatrooms/{conv_id}/permanent-silenceds
```

返回

```json
{}
```

#### 查询永久性禁言列表

该接口要求使用 master key。

```sh
curl -X GET \
  -H "X-LC-Id: {{appid}}" \
  -H "X-LC-Key: {{masterkey}},master" \
  -G \
  --data-urlencode 'limit=20' \
  https://{{host}}/1.2/rtm/chatrooms/{conv_id}/permanent-silenceds
```

参数 | 约束 | 说明
---|---|---
limit | 可选 | 与 next 联合使用实现分页，默认 10
next | 可选 | 第一次查询时返回，后面的查询带着这个参数，实现分页查询

返回

```json
{"client_ids": ["client1", "client2"]}
```


### 黑名单

该功能介绍可参考[即时通讯开发指南第三篇](/sdk/im/guide/senior/)中的《权限管理与黑名单》一节。

#### 增加聊天室黑名单

该接口要求使用 master key。

加入黑名单的 client 不允许再加入该聊天室，如果之前在该聊天室中将被移除。每个聊天室最多允许添加 10,000 个黑名单。

```sh
curl -X POST \
  -H "X-LC-Id: {{appid}}" \
  -H "X-LC-Key: {{masterkey}},master" \
  -H "Content-Type: application/json" \
  -d '{"client_ids": ["client1", "client2"]}' \
  https://{{host}}/1.2/rtm/chatrooms/{chatroom_id}/blacklists
```

参数 | 说明
--- | ---
client_ids | 要拉黑的 `Client ID` 列表，数组

返回

```json
{}
```

#### 移除聊天室黑名单

该接口要求使用 master key。

```sh
curl -X DELETE \
  -H "X-LC-Id: {{appid}}" \
  -H "X-LC-Key: {{masterkey}},master" \
  -d '{"client_ids": ["client1", "client2"]}' \
  https://{{host}}/1.2/rtm/chatrooms/{chatroom_id}/blacklists
```

返回

```json
{}
```

#### 查询聊天室黑名单

该接口要求使用 master key。

```sh
curl -X GET \
  -H "X-LC-Id: {{appid}}" \
  -H "X-LC-Key: {{masterkey}},master" \
  -d '{"client_ids": ["client1", "client2"]}' \
  https://{{host}}/1.2/rtm/chatrooms/{chatroom_id}/blacklists
```

参数 | 约束 | 说明
---|---|---
limit | 可选 | 与 next 联合使用实现分页，默认 10
next | 可选 | 第一次查询时返回，后面的查询带着这个参数，实现分页查询

返回

```json
{"client_ids": ["client1", "client2"]}
```

## 服务号

### 创建服务号

在 `_Conversation` 表默认 ACL 权限下本接口要求使用 master key。

```sh
curl -X POST \
  -H "X-LC-Id: {{appid}}" \
  -H "X-LC-Key: {{masterkey}},master" \
  -H "Content-Type: application/json" \
  -d '{"name":"My First Service-conversation"}' \
  https://{{host}}/1.2/rtm/service-conversations
```

对话的字段可参考[即时通讯总览](/sdk/im/guide/overview/)的《对话》一节。

返回

```json
{"objectId":"5a5d7432c3422b31ed845e75", "createdAt":"2018-01-16T03:40:32.814Z"}
```

### 查询服务号

在 `_Conversation` 表默认 ACL 权限下本接口要求使用 master key。

```sh
curl -X GET \
  -H "X-LC-Id: {{appid}}" \
  -H "X-LC-Key: {{masterkey}},master" \
  -G \
  --data-urlencode 'where={"name": "service"}' \
  --data-urlencode 'skip=1' \
  --data-urlencode 'limit=20' \
  https://{{host}}/1.2/rtm/service-conversations
```

参数 | 约束 | 说明
---|---|---
skip | 可选 |
limit | 可选 | 与 skip 联合使用实现分页
where | 可选 | 请参考[数据存储 REST API 使用详解](/sdk/storage/guide/rest/)的《查询》一节。


返回

```json
{"results":[
  {"name":"My First Service-conversation",
  "createdAt":"2018-01-17T04:15:33.386Z",
  "updatedAt":"2018-01-17T04:15:33.386Z",
  "objectId":"5a5ecde6c3422b738c8779d7"}
]}
```

### 更新服务号

在 `_Conversation` 表默认 ACL 权限下本接口要求使用 master key。

```sh
curl -X PUT \
  -H "X-LC-Id: {{appid}}" \
  -H "X-LC-Key: {{masterkey}},master" \
  -H "Content-Type: application/json" \
  -d '{"name":"Updated Service-conversation"}' \
  https://{{host}}/1.2/rtm/service-conversations/{conv_id}
```

返回

```json
{"updatedAt":"2018-01-16T03:40:37.683Z", "objectId":"5a5d7433c3422b31ed845e76"}
```


### 删除服务号

在 `_Conversation` 表默认 ACL 权限下本接口要求使用 master key。

```sh
curl -X DELETE \
  -H "X-LC-Id: {{appid}}" \
  -H "X-LC-Key: {{masterkey}},master" \
  https://{{host}}/1.2/rtm/service-conversations/{conv_id}
```

返回

```json
{}
```

### 订阅服务号

```sh
curl -X POST \
  -H "X-LC-Id: {{appid}}" \
  -H "X-LC-Key: {{masterkey}},master" \
  -H "Content-Type: application/json" \
  -d '{"client_id":"client_id"}' \
  https://{{host}}/1.2/rtm/service-conversations/{conv_id}/subscribers
```

返回

```json
{}
```

### 取消订阅

```sh
curl -X DELETE \
  -H "X-LC-Id: {{appid}}" \
  -H "X-LC-Key: {{masterkey}},master" \
  https://{{host}}/1.2/rtm/service-conversations/{conv_id}/subscribers/{client_id}
```

返回

```json
{}
```

### 遍历查询订阅者

该接口要求使用 master key。

```sh
curl -X GET \
  -H "X-LC-Id: {{appid}}" \
  -H "X-LC-Key: {{masterkey}},master" \
  https://{{host}}/1.2/rtm/service-conversations/{conv_id}/subscribers
```

参数 | 约束 | 说明
---|---|---
limit | 可选 | 返回条数限制，默认是 50 条，最大 50 条。
client_id | 可选 | 查询起始订阅者 client id，不填则从订阅者列表起始位置开始遍历。查询结果不会再包含当前指定的订阅者 client id。

返回

```json
[{"timestamp":1491467841116,"subscriber":"client id 1","conv_id":"55b871"},
 {"timestamp":1491467852768,"subscriber":"client id 2","conv_id":"55b872"}, ...]
```
其中 timestamp 表示用户订阅系统对话的时间，subscriber 是订阅用户的 client id。如果一次没有获取完，需要从结果列表中取最后一个订阅者的 client id，作为 client_id 参数再次调用本接口以获取下一批订阅者列表。


### 查询订阅者数

该接口要求使用 master key。

```sh
curl -X GET \
  -H "X-LC-Id: {{appid}}" \
  -H "X-LC-Key: {{masterkey}},master" \
  https://{{host}}/1.2/rtm/service-conversations/{conv_id}/subscribers/count
```

返回

```json
{"count": 100}
```

### 给所有订阅者发消息

该接口要求使用 master key。

```sh
curl -X POST \
  -H "X-LC-Id: {{appid}}" \
  -H "X-LC-Key: {{masterkey}},master" \
  -H "Content-Type: application/json" \
  -d '{"from_client": "", "message": ""}' \
  https://{{host}}/1.2/rtm/service-conversations/{conv_id}/broadcasts
```

参数 | 约束 | 说明
---|---|---
from_client | 必选 | 消息的发件人 client ID
message | 必选 | 消息体
push | 可选 | 附带的推送内容，如果设置，所有 iOS 和 Android 用户会收到这条推送通知。字符串或 JSON 对象

返回：

```json
{"msg-id":"qNkRkFWOeSqP65S9fDyHJw", "timestamp":1495431811151}
```

频率限制：

此接口受频率限制，详见后文[接口请求频率限制](#接口请求频率限制)一节。

### 修改给所有订阅者发送的消息

该接口要求使用 master key。

```sh
curl -X PUT \
  -H "X-LC-Id: {{appid}}" \
  -H "X-LC-Key: {{masterkey}},master" \
  -H "Content-Type: application/json" \
  -d '{"from_client": "", "message": "", "timestamp": 123}' \
  https://{{host}}/1.2/rtm/service-conversations/{conv_id}/messages/{message_id}
```

参数 | 约束 | 说明
---|---|---
from_client | 必填 | 消息的发件人 client ID
message | 必填 | 消息体
timestamp | 必填 | 消息的时间戳

成功则返回状态码 `200 OK`。

频率限制：

此接口受频率限制，详见后文[接口请求频率限制](#接口请求频率限制)一节。

### 撤回给所有订阅者发送的消息

该接口要求使用 master key。

```sh
curl -X PUT \
  -H "X-LC-Id: {{appid}}" \
  -H "X-LC-Key: {{masterkey}},master" \
  -H "Content-Type: application/json" \
  -d '{"from_client": "", "timestamp": 123}' \
  https://{{host}}/1.2/rtm/service-conversations/{conv_id}/messages/{message_id}/recall
```

参数 | 约束 | 说明
---|---|---
from_client | 必填 | 消息的发件人 client ID
timestamp | 必填 | 消息的时间戳

成功则返回状态码 `200 OK`。

频率限制：

此接口受频率限制，详见后文[接口请求频率限制](#接口请求频率限制)一节。

### 给任意用户单独发消息

该接口要求使用 master key。

```sh
curl -X POST \
  -H "X-LC-Id: {{appid}}" \
  -H "X-LC-Key: {{masterkey}},master" \
  -H "Content-Type: application/json" \
  -d '{"from_client": "", "message": ""}' \
  https://{{host}}/1.2/rtm/service-conversations/{conv_id}/messages
```

**注意**，由于这个接口的管理性质，当你通过这个接口发送消息时，我们不会检查 **from_client** 是否有权限给这个服务号发送消息，而是统统放行，请谨慎使用这个接口。
如果你在应用中使用了我们内部定义的富媒体消息格式，在发送消息时 **message** 字段需要遵守相应的格式要求。

参数 | 约束 | 说明
---|---|---
from_client | 必填 | 消息的发件人 client Id
to_clients | 必填 | 数组类型，表示接收消息的 client Id 列表，最多能包含 20 个 client Id
message | 必填 | 消息内容（这里的消息内容的本质是字符串，但是我们对字符串内部的格式没有做限定，<br/>理论上开发者可以随意发送任意格式，只要大小不超过 5 KB 限制即可。）
transient | 可选 | 是否为暂态消息，默认 false
no_sync | 可选 | 默认情况下消息会被同步给在线的 from_client 用户的客户端，设置为 true 禁用此功能。
push_data | 可选 | 以消息附件方式设置本条消息的离线推送通知内容。如果目标接收者使用的是 iOS 设备并且当前不在线，我们会按照该参数填写的内容来发离线推送。请参看[即时通讯开发指南第三篇](/sdk/im/guide/senior/)的《离线推送通知》一节。
priority | 可选 | 定义消息优先级，可选值为 high、normal、low，分别对应高、中、低三种优先级。该参数大小写不敏感，默认为中优先级 normal。本参数仅对暂态消息或聊天室的消息有效，高优先级下在服务端与用户设备的连接拥塞时依然排队。

返回说明：

默认情况下发送消息 API 使用异步的方式，调用后返回消息 id 和接收消息的服务器时间戳，例如 `{"msg-id":"qNkRkFWOeSqP65S9fDyHJw", "timestamp":1495431811151}`。

频率限制：

此接口受频率限制，详见后文[接口请求频率限制](#接口请求频率限制)一节。

### 修改给用户单独发送的消息

该接口要求使用 master key。

```sh
curl -X PUT \
  -H "X-LC-Id: {{appid}}" \
  -H "X-LC-Key: {{masterkey}},master" \
  -H "Content-Type: application/json" \
  -d '{"from_client": "", "message": "", "timestamp": 123, "to_clients":["a","b","c"]}' \
  https://{{host}}/1.2/rtm/service-conversations/{conv_id}/messages/{message_id}
```

参数 | 约束 | 说明
---|---|---
from_client | 必填 | 消息的发件人 client ID
message | 必填 | 消息体
timestamp | 必填 | 消息的时间戳
to_clients | 必填 | 数组类型，表示接收目标消息的 client Id 列表，最多能包含 20 个 client Id

成功则返回状态码 `200 OK`。

频率限制：

此接口受频率限制，详见后文[接口请求频率限制](#接口请求频率限制)一节。

### 撤回给用户单独发送的消息

该接口要求使用 master key。

```sh
curl -X PUT \
  -H "X-LC-Id: {{appid}}" \
  -H "X-LC-Key: {{masterkey}},master" \
  -H "Content-Type: application/json" \
  -d '{"from_client": "", "timestamp": 123, "to_clients":["a","b","c"]}' \
  https://{{host}}/1.2/rtm/service-conversations/{conv_id}/messages/{message_id}/recall
```

参数 | 约束 | 说明
---|---|---
from_client | 必填 | 消息的发件人 client ID
timestamp | 必填 | 消息的时间戳
to_clients | 必填 | 数组类型，表示接收目标消息的 client Id 列表，最多能包含 20 个 client Id

成功则返回状态码 `200 OK`。

频率限制：

此接口受频率限制，详见后文[接口请求频率限制](#接口请求频率限制)一节。

### 删除给用户单独发送的消息

本接口要求使用 master key，并且只能删除订阅消息或给用户单独发送的消息，无法删除广播消息。
广播消息请调用 `DELETE /1.2/rtm/broadcasts/{message_id}` 接口删除。

```sh
curl -X DELETE \
  -H "X-LC-Id: {{appid}}" \
  -H "X-LC-Key: {{masterkey}},master" \
  -G \
  --data-urlencode 'from_client=some-client-id' \
  --data-urlencode 'timestamp=123' \
  https://{{host}}/1.2/rtm/service-conversations/{conv_id}/subscribers/{client_id}/messages/{message_id}
```

注意，该接口仅删除服务端的消息，对客户端无影响。

参数 | 约束 | 说明
---|---|---
from_client | 必填 | 消息的发件人 client ID
timestamp | 必填 | 消息的时间戳

返回：

```json
{}
```

### 查询服务号给某用户发的消息

该接口要求使用 master key。查询结果包含服务号发送的订阅广播消息也包含单独发送的消息。

```sh
curl -X GET \
  -H "X-LC-Id: {{appid}}" \
  -H "X-LC-Key: {{masterkey}},master" \
  -H "Content-Type: application/json" \
  https://{{host}}/1.2/rtm/service-conversations/{conv_id}/subscribers/{client_id}/messages
```

参数和返回值与查询历史消息接口相同。

### 黑名单

该功能介绍可参考[即时通讯开发指南第三篇](/sdk/im/guide/senior/)中的《权限管理与黑名单》一节。

#### 增加服务号黑名单

该接口要求使用 master key。

加入黑名单的 client 不允许再加入该服务号，如果之前在该服务号中将被移除。每个服务号最多允许添加 10,000 个黑名单。

```sh
curl -X POST \
  -H "X-LC-Id: {{appid}}" \
  -H "X-LC-Key: {{masterkey}},master" \
  -H "Content-Type: application/json" \
  -d '{"client_ids": ["client1", "client2"]}' \
  https://{{host}}/1.2/rtm/service-conversations/{conv_id}/blacklists
```

参数 | 说明
--- | ---
client_ids | 要拉黑的 `Client ID` 列表，数组

返回

```json
{}
```

#### 移除服务号黑名单

该接口要求使用 master key。

```sh
curl -X DELETE \
  -H "X-LC-Id: {{appid}}" \
  -H "X-LC-Key: {{masterkey}},master" \
  -d '{"client_ids": ["client1", "client2"]}' \
  https://{{host}}/1.2/rtm/service-conversations/{conv_id}/blacklists
```

返回

```json
{}
```

#### 查询服务号黑名单

该接口要求使用 master key。

```sh
curl -X GET \
  -H "X-LC-Id: {{appid}}" \
  -H "X-LC-Key: {{masterkey}},master" \
  -d '{"client_ids": ["client1", "client2"]}' \
  https://{{host}}/1.2/rtm/service-conversations/{conv_id}/blacklists
```

参数 | 约束 | 说明
---|---|---
limit | 可选 | 与 next 联合使用实现分页，默认 10
next | 可选 | 第一次查询时返回，后面的查询带着这个参数，实现分页查询

返回

```json
{"client_ids": ["client1", "client2"]}
```

## 用户

### 查询在线成员

该接口要求使用 master key。

```sh
curl -X POST \
  -H "X-LC-Id: {{appid}}" \
  -H "X-LC-Key: {{masterkey}},master" \
  -H "Content-Type: application/json" \
  -d '{"client_ids": ["Tom", "Jerry"]}' \
  https://{{host}}/1.2/rtm/clients/check-online
```

参数 | 约束 | 说明
---|---|---
client_ids | 必选 | 要查询的 client ID 列表，最多 20 个

返回在线的 ID 列表

```json
{"results":["client1"]}
```

注意，该接口不判断用户是否存在，「用户不存在」视同「用户不在线」。

### 查询未读消息数

```sh
curl -X GET \
  -H "X-LC-Id: {{appid}}" \
  -H "X-LC-Key: {{appkey}}" \
  -G \
  --data-urlencode 'conv_id=...' \
  https://{{host}}/1.2/rtm/clients/{client_id}/unread-count
```

参数 | 约束 | 说明
---|---|---
conv_id | 可选 | 对话 ID，若不传此参数，查询 client 在所有对话中的未读消息数

返回

```json
{"count":1}
```

### 强制下线

该接口要求使用 master key。

```sh
curl -X POST \
  -H "X-LC-Id: {{appid}}" \
  -H "X-LC-Key: {{masterkey}},master" \
  -H "Content-Type: application/json" \
  -d '{"reason": "why"}' \
  https://{{host}}/1.2/rtm/clients/{client_id}/kick
```

参数 | 约束 | 说明
---|---|---
reason | 可选 | 下线原因，字符串，不超过 20 个字符

返回

```json
{}
```

### 查询订阅的服务号

该接口要求使用 master key。

```sh
curl -X GET \
  -H "X-LC-Id: {{appid}}" \
  -H "X-LC-Key: {{masterkey}},master" \
  -G \
  --data-urlencode 'conv_id=...' \
  --data-urlencode 'timestamp=...' \
  --data-urlencode 'limit=...' \
  --data-urlencode 'direction=...' \
  https://{{host}}/1.2/rtm/clients/{client_id}/service-conversations
```

参数 | 约束 | 类型 | 说明
---|---|---|---
conv_id | 可选 | 字符串 | 查询起始服务号 id，不填则从订阅列表起始位置开始遍历。查询结果不会再包含本对话
timestamp | 可选 | 数字 | 查询起始对话被订阅时间。虽然是可选字段但当提供 conv_id 时本字段必填，值必须为订阅 conv_id 参数所指定系统对话的时间，单位是毫秒
limit | 可选 | 数字 | 返回条数限制，默认是 50 条
direction | 可选 | 字符串 | 查询结果按时间排序方式，old 表示降序，new 表示升序，默认是 new。使用 old 则先返回最近订阅的对话，使用 new 则先返回最早订阅的对话

返回目标用户订阅系统对话的列表：

```json
[{"timestamp":1482994126561,"subscriber":"XXX","conv_id":"convId1"},
 {"timestamp":1491467945277,"subscriber":"XXX","conv_id":"convId2"}, ...]
```

其中 `timestamp` 表示用户订阅系统对话的时间，`subscriber` 是订阅用户的 client id。如果一次没有获取完，需要从结果列表中取最后一个服务号 ID 和订阅时间，分别作为 conv_id 和 timestamp 参数再次调用本接口以获取下一批订阅的系统对话。

### 查询用户发送消息

该接口要求使用 master key。
使用这个接口可以查询某 client_id 在单聊、群聊与聊天室里发的消息。

```sh
curl -X GET \
  -H "X-LC-Id: {{appid}}" \
  -H "X-LC-Key: {{masterkey}},master" \
  https://{{host}}/1.2/rtm/clients/{client_id}/messages
```

参数与返回值可以参考 `GET /1.2/rtm/conversations/{conv_id}/messages` 接口。

### 增加黑名单

该接口要求使用 master key。
一个 client 可以把一个 群聊／聊天室／服务号 加入黑名单，这样其他人就无法要求其加入该对话了。
目前不支持 client 把另一个 client 加入黑名单。

```sh
curl -X POST \
  -H "X-LC-Id: {{appid}}" \
  -H "X-LC-Key: {{masterkey}},master" \
  -H "Content-Type: application/json" \
  -d '{"conv_id": ""}' \
  https://{{host}}/1.2/rtm/clients/{client_id}/blacklists
```

参数 | 约束 | 说明
---|---|---
conv_id | 必选 | 拉黑的 群聊／聊天室／服务号 ID

返回

```json
{}
```

### 移除黑名单

```sh
curl -X DELETE \
  -H "X-LC-Id: {{appid}}" \
  -H "X-LC-Key: {{masterkey}},master" \
  -H "Content-Type: application/json" \
  -d '{"conv_id": ""}' \
  https://{{host}}/1.2/rtm/clients/{client_id}/blacklists
```

返回

```json
{}
```

### 查询黑名单

```sh
curl -X GET \
  -H "X-LC-Id: {{appid}}" \
  -H "X-LC-Key: {{masterkey}},master" \
  https://{{host}}/1.2/rtm/clients/{client_id}/blacklists
```

参数 | 约束 | 说明
---|---|---
limit | 可选 | 与 next 联合使用实现分页，默认 10
next | 可选 | 第一次查询时返回，后面的查询带着这个参数，实现分页查询

返回

```json
{"conv_ids":["conv1"], "next":"1"}
```

### 获取登录签名

本接口可以让使用了 LCUser 的应用方便快捷地实现登录认证。
登录认证默认关闭，可以进入 **云服务控制台 > 消息 > 即时通讯 > 设置 > 即时通讯选项**，勾选 **登录启用签名认证** 进行开启。

```sh
curl -X GET \
  -H "X-LC-Id: {{appid}}" \
  -H "X-LC-Key: {{appkey}}" \
  -G \
  --data-urlencode 'session_token=some-token' \
  https://{{host}}/1.2/rtm/clients/sign
```

参数 | 约束 | 说明
---|---|---
session_token | 必选 | LCUser 的 sessionToken

返回

```json
{
  "signature":"bc884dbb617aab1efc228229210e487330abfc7d",
  "nonce":"akywke3f28",
  "client_id":"5fb4ff18d0deed36ea501c8a",
  "timestamp":1614237989966
}
```

注意，虽然这是一个 GET 请求，但并不是幂等的，每次调用返回的签名都不相同。

为了方便用户进行细粒度控制，实现自定义功能（如黑名单），本接口提供了一个 hook `_rtmClientSign`，在验证 sessionToken 后去调用，传入的参数为 LCUser 构成的 JSON 对象：

```json
{
    "email": "",
    "sessionToken": "",
    "updatedAt": "",  // 格式：2017-07-11T07:58:10.149Z
    "phone": "",
    "objectId": "",
    "username": "",
    "createdAt": "",  // 格式：2017-07-11T07:58:10.149Z
    "emailVerified": true/false,
    "mobilePhoneVerified": true/false
}
```

可以返回两类结果：

```json
{"result": true} // 允许签名
{"result": false, "error": "error message"}  // 拒绝签名
```

## 全局 API

### 查询用户数

本接口会返回应用当前在线用户总数，以及当天有登录记录的独立用户总数。本接口要求使用 master key。

```sh
curl -X GET \
  -H "X-LC-Id: {{appid}}" \
  -H "X-LC-Key: {{masterkey}},master" \
  https://{{host}}/1.2/rtm/stats
```

返回

```json
{"result":{"online_user_count":10212,"user_count_today":1002324}}
```

其中 `online_user_count` 表示当前应用在线用户总数，`user_count_today` 表示当天有登录记录的独立用户总数。

### 查询所有对话

本接口会返回所有的 单聊群聊／聊天室／服务号。在 `_Conversation` 表默认 ACL 权限下要求使用 master key。

```sh
curl -X GET \
  -H "X-LC-Id: {{appid}}" \
  -H "X-LC-Key: {{masterkey}},master" \
  https://{{host}}/1.2/rtm/all-conversations
```

参数 | 约束 | 说明
---|---|---
skip | 可选 |
limit | 可选 | 与 skip 联合使用实现分页
where | 可选 | 参考《存储 REST API 指南》中的《查询》一节

返回

```json
{"results":[
  {"name":"conversation",
  "createdAt":"2018-01-17T04:15:33.386Z", "updatedAt":"2018-01-17T04:15:33.386Z",
  "objectId":"5a5ecde6c3422b738c8779d7"}
]}
```

### 全局广播

该接口可以给该应用所有 client 广播一条消息，每天最多 30 条。本接口要求使用 master key。

```sh
curl -X POST \
  -H "X-LC-Id: {{appid}}" \
  -H "X-LC-Key: {{masterkey}},master" \
  -H "Content-Type: application/json" \
  -d '{"from_client": "1a", "message": "{\"_lctype\":-1,\"_lctext\":\"这是一个纯文本消息\",\"_lcattrs\":{\"a\":\"_lcattrs 是用来存储用户自定义的一些键值对\"}}", "conv_id": "..."}' \
  https://{{host}}/1.2/rtm/broadcasts
```

参数 | 约束 | 类型 | 说明
---|---|---|---
from_client | 必填 | 字符串 | 消息的发件人 id
conv_id | 必填 | 字符串 | 发送到对话 id，仅限于服务号
message | 必填 | 字符串 | 消息内容（这里的消息内容的本质是字符串，但是我们对字符串内部的格式没有做限定，理论上开发者可以随意发送任意格式，只要大小不超过 5 KB 限制即可。）
valid_till | 可选 | 数字 | 过期时间，UTC 时间戳（毫秒），最长为 1 个月之后。默认值为 1 个月后。
push | 可选 | 字符串或 JSON 对象 | 附带的推送内容，如果设置，**所有** iOS 和 Android 用户会收到这条推送通知。
transient | 可选 | 布尔值 | 默认为 false。该字段用于表示广播消息是否为暂态消息，暂态消息只会被当前在线的用户收到，不在线的用户再次上线后也收不到该消息。

Push 的格式与《推送 REST API 指南》的《消息内容 Data》一节中 `data` 下面的部分一致。如果您需要指定开发证书推送，需要在 push 的 json 中设置 `"_profile": "dev"`，例如：

```json
{
   "alert": "消息内容",
   "category": "通知分类名称",
   "badge": "Increment",
   "_profile": "dev"
}
```

频率限制：

此接口受频率限制，详见后文[接口请求频率限制](#接口请求频率限制)一节。

### 修改广播消息

该接口要求使用 master key。

广播消息修改仅对当前还未收到该广播消息的设备生效，如果目标设备已经收到了该广播消息则无法修改。请慎重发送广播消息。

```sh
curl -X PUT \
  -H "X-LC-Id: {{appid}}" \
  -H "X-LC-Key: {{masterkey}},master" \
  -H "Content-Type: application/json" \
  -d '{"from_client": "", "message": "", "timestamp": 123}' \
  https://{{host}}/1.2/rtm/service-conversations/{conv_id}/messages/{message_id}
```

参数 | 约束 | 说明
---|---|---
from_client | 必填 | 消息的发件人 client ID
message | 必填 | 消息体
timestamp | 必填 | 消息的时间戳

成功则返回状态码 `200 OK`。

频率限制：

此接口受频率限制，详见后文[接口请求频率限制](#接口请求频率限制)一节。

### 删除广播消息

调用此 API 将删除已发布的广播消息，仅对还未收到广播消息的设备生效，已收到广播消息的设备无法删除消息。本接口要求使用 master key。

```sh
curl -X DELETE \
  -H "X-LC-Id: {{appid}}" \
  -H "X-LC-Key: {{masterkey}},master" \
  https://{{host}}/1.2/rtm/broadcasts/{message_id}
```

参数 | 约束 | 说明
--- | --- | ---
message_id | 必填 | 要删除的消息 id，字符串

成功则返回状态码 `200 OK`。

### 查询广播消息

调用此 API 可查询目前有效的广播消息。本接口要求使用 master key。

```sh
curl -X GET \
  -H "X-LC-Id: {{appid}}" \
  -H "X-LC-Key: {{masterkey}},master" \
  https://{{host}}/1.2/rtm/broadcasts?conv_id={conv_id}
```

参数 | 约束 | 说明
--- | --- | ---
conv_id | 必填 | 服务号 id
limit | 可选 | 返回消息条数
skip | 可选 | 跳过消息条数，用于翻页

### 查询应用内所有历史消息

该接口要求使用 master key。

```sh
curl -X GET \
  -H "X-LC-Id: {{appid}}" \
  -H "X-LC-Key: {{masterkey}},master" \
  https://{{host}}/1.2/rtm/messages
```

参数与返回值可以参考 `GET /1.2/rtm/conversations/{conv_id}/messages` 接口。

## 接口请求频率限制

本文档中和消息操作有关的 REST API 有请求频率以及总量的限制（**即时通讯客户端 SDK 的 API 不受此限制影响**），具体如下：

### 普通消息

1.1 版本：

* 发送消息、系统对话给用户发消息（`/1.1/rtm/messages`）
* 修改与撤回消息 (`/1.1/rtm/patch/message`)

1.2 版本：

* [单聊、群聊-发消息](#单聊、群聊-发消息)
* [单聊、群聊-修改消息](#单聊、群聊-修改消息)
* [单聊、群聊-撤回消息](#单聊、群聊-撤回消息)
* [聊天室-发消息](#聊天室-发消息)
* [聊天室-修改消息](#聊天室-修改消息)
* [聊天室-撤回消息](#聊天室-撤回消息)
* [服务号-给任意用户单独发消息](#给任意用户单独发消息)
* [服务号-修改给用户单独发送的消息](#修改给用户单独发送的消息)
* [服务号-撤回给用户单独发送的消息](#撤回给用户单独发送的消息)

#### 限制

| 商用版（每应用） | 开发版（每应用）|
|----------|---------------|
| 最大 9000 次／分钟，默认 1800 次／分钟 |120 次／分钟 |

所有接口共享额度。超过额度限制后一分钟内 LeanCloud 会拒绝请求持续返回 429 错误码，一分钟后会重新处理请求。

商用版应用的上限可以在 **云服务控制台 > 消息 > 即时通讯 > 设置 > 服务阈值 > 普通消息 API 调用频率上限** 修改。
按照每日调用频率峰值实行阶梯收费，如下表所示：

| 每分钟调用频率 | 费用 |
| - | - |
| 0 ～ 1800 | 免费 |
| 1801 ~ 3600 | ¥20 元 / 天 |
| 3601 ~ 5400 | ¥30 元 / 天 |
| 5401 ~ 7200 | ¥40 元 / 天 |
| 7201 ~ 9000 | ¥50 元 / 天 |

国际版

| 每分钟调用频率 | 费用 |
| - | - |
| 0 ～ 1800 | 免费 |
| 1801 ~ 3600 | $6 USD / 天 |
| 3601 ~ 5400 | $9 USD / 天 |
| 5401 ~ 7200 | $12 USD / 天 |
| 7201 ~ 9000 | $15 USD / 天 |

每日调用频率峰值可以在 **控制台 > 消息 > 即时通讯 > 统计 > API 请求频率峰值** 中查看。

### 订阅消息

1.1 版本：

* 系统对话发送订阅消息 （`/1.1/rtm/broadcast/subscriber`）

1.2 版本：

* [给所有订阅者发消息](#给所有订阅者发消息)
* [修改给所有订阅者发送的消息](#修改给所有订阅者发送的消息)
* [撤回给所有订阅者发送的消息](#撤回给所有订阅者发送的消息)

#### 限制

| 限制  | 商用版   |      开发版    |
|----------|----------|---------------|
| 频率限制 | 每应用 30 次／分钟 | 每应用 10 次／分钟  |
| 总量限制 | 全天最多 1000 次 | 全天最多 100 次 |

所有接口共享额度。超过频率限制后 1 分钟内云端会拒绝请求持续返回 429 错误码，一分钟后会重新处理请求；超过总量限制后当天会拒绝之后的所有请求并返回 429 错误码。

### 广播消息

1.1 版本：

* 发送广播消息 （`/1.1/rtm/broadcast`）

1.2 版本：

* [全局广播](#全局广播)
* [修改广播消息](#修改广播消息)

#### 限制

| 限制   | 商用版   |      开发版    |
|----------|----------|---------------|
| 频率限制 | 每应用 10 次／分钟 | 每应用 1 次／分钟  |
| 总量限制 | 全天最多 30 次 | 全天最多 10 次 |

所有接口共享以上额度。超过频率限制后 1 分钟内云端会拒绝请求持续返回 429 错误码，一分钟后会重新处理请求；超过总量限制后当天会拒绝之后的所有请求并返回 429 错误码。
