---
id: guide
title: 好友指南
sidebar_label: 开发指南
---

import MultiLang from '/src/docComponents/MultiLang';
import CodeBlock from '@theme/CodeBlock';
import sdkVersions from '/src/docComponents/sdkVersions';

TDS 提供了两种好友模型：

- [好友模式](/sdk/friends/mutual/)
- [关注模式](/sdk/friends/follow/)

开发者可根据游戏项目需求，选择其中一种模型。
注意：

- 只能选择一种模型，**同一游戏无法混用两种模型**。
- 选定一种模型后，**后续无法变更为另一种模型**。

此外，还支持获取[第三方平台的好友关系](/sdk/friends/third-party/)（此功能需要通过工单申请开通）。

我们建议开发者按照以下顺序入手：

- 了解 [TDS 内建账户系统](/sdk/authentication/features/)，好友功能依赖内建账户，下文中的玩家、用户均指 `TDSUser`。

- 阅读本文，了解如何初始化 SDK。

- 根据游戏项目需求，选定游戏将采用的好友模型，然后阅读相应的开发指南：

    * [好友模式](/sdk/friends/mutual/)
    * [关注模式](/sdk/friends/follow/)

## SDK 初始化

假设你已经在 [快速开始](/sdk/start/quickstart/#初始化) 部分完成了 **SDK 初始化**，可以在 [下载页](/tap-download) 获得 SDK，添加 `TapFriends` 模块：

<MultiLang>

<CodeBlock className="json">
{`"dependencies":{
  ...
  "com.taptap.tds.friends": "https://github.com/TapTap/TapFriends-Unity.git#${sdkVersions.taptap.unity}",
}`}
</CodeBlock>

<CodeBlock className="groovy">
{`repositories{
    flatDir {
        dirs 'libs'
    }
}
dependencies {
    ...
    implementation (name:'TapFriend_${sdkVersions.taptap.android}', ext:'aar')
}`}
</CodeBlock>

<CodeBlock className="objectivec">
{`TapFriendResource.bundle
TapFriendSDK.framework
TapFriendUISDK.framework`}
</CodeBlock>

</MultiLang>


如需使用[富信息功能](#富信息)，请先在 **开发者中心 > 游戏服务 > 云服务 > 好友 > 设置** 开启 **富信息接口数据实时同步**。
并调用 [配置富信息字段](#配置富信息字段) 的 REST API 接口设置需要使用的富信息字段。

## 富信息 REST API

下面我们介绍富信息相关的 REST API 接口。
开发者可以自行编写程序或脚本调用这些接口在服务端进行管理性质的操作。

### 请求格式

对于 POST 和 PUT 请求，请求的主体必须是 JSON 格式，而且 HTTP Header 的 Content-Type 需要设置为 `application/json`。

请求的鉴权是通过 HTTP Header 里面包含的键值对来进行的，参数如下表：

Key|Value|含义|来源
---|----|---|---
`X-LC-Id`|`{{appid}}`|当前应用的 `App Id`（即 `Client Id`）|可在控制台查看
`X-LC-Key`|`{{appkey}}`|当前应用的 `App Key`（即 `Client Token`）|可在控制台查看

管理接口需要使用 `Master Key`：`X-LC-Key: {{masterkey}},master`。
`Master Key` 即 `Server Secret`，同样可在控制台查看。

详见文档关于[应用凭证](/sdk/storage/guide/setup-dotnet#应用凭证)的说明。

### Base URL

REST API 请求的 Base URL（下文 curl 示例中用 `{{host}}` 表示）即应用绑定的 API 自定义域名，可以在控制台绑定、查看。
详见文档关于[绑定域名](/sdk/storage/guide/setup-dotnet#绑定域名)的说明。

### 获取富信息配置

```sh
curl -X GET \
  -H "X-LC-Id: {{appid}}" \
  -H "X-LC-Key: {{appkey}}" \
  -H "X-LC-Session: {{sessionToken}}" \
  https://{{host}}/friend/v1/rich-presence/config
```

返回结果示例：

```json
{
    "clientId": "YOUR CLIENT ID",
    "enabled": 1,
    "richMsgEnabled": true,
    "onlineMsgEnabled": true,
    "webSocketUrl": "wss://XXX.ws.tds1.tapapis.cn/ws/leancloud/v1",
    "richPresenceFields": [
        {
            "key": "display",
            "type": "token"
        },
        {
            "key": "leadboard",
            "type": "token"
        },
        {
            "key": "inviteable",
            "type": "variable"
        },
        {
            "key": "score",
            "type": "variable"
        },
        {
            "key": "rank",
            "type": "variable"
        }
    ],
    "richPresenceMultiLang": [
        {
            "key": "display",
            "lang": "zh_CN",
            "content": {
                "#playing": "游戏中",
                "#idle": "在线",
                "#room": "准备中",
                "#matching": "组队中"
            }
        },
        {
            "key": "display",
            "lang": "en_US",
            "content": {
                "#playing": "Playing",
                "#idle": "Idle",
                "#room": "Room",
                "#matching": "Matching"
            }
        },
        {
            "key": "leadboard",
            "lang": "zh_CN",
            "content": {
                "#score": "%score% 分,排名为 %rank%",
                "#rank": "%rank% 名"
            }
        },
        {
            "key": "leadboard",
            "lang": "en_US",
            "content": {
                "#score": "%score% score",
                "#rank": "%rank% rank"
            }
        }
    ]
}
```

### 配置富信息字段

可以通过 REST API 设置游戏的富信息字段，需要指定各字段的名称和类型。
这是管理接口，鉴权需要 `Master Key`：

```sh
curl -X POST \
  -H "X-LC-Id: {{appid}}" \
  -H "X-LC-Key: {{masterkey}},master" \
  -H "Content-Type: application/json" \
  -d '{
    "enableRichMsg":true,
    "enableOnlineMsg":true,
    "richPresenceFields":[
        {"key":"display","type":"token"},
        {"key":"leadboard","type":"token"},
        {"key":"inviteable","type":"variable"},
        {"key":"score","type":"variable"},
        {"key":"rank","type":"variable"}
    ]
  }' \
  https://{{host}}/friend/v2/rich-presence/config/base-info
```

`enableRichMsg` 和 `enableOnlineMsg` 分别用于设置是否启用富信息通知、是否启用好友上下线通知，建议两者均指定为 `true`。
注意，**这个接口 URL 地址中的版本号是 `v2`**，和其他接口的 `v1` 不同。

返回结果示例：

```json
{
    "appId": "YOUR CLIENT ID"
}
```

请求失败返回结果示例：

```json
{
    "code": 400,
    "error": "Missing request header"
}
```

### 配置多语言内容

配置富信息字段的多语言内容。
这是管理接口，鉴权需要 `Master Key`：

```sh
curl -X POST \
  -H "X-LC-Id: {{appid}}" \
  -H "X-LC-Key: {{masterkey}},master" \
  -H "Content-Type: application/json" \
  -d '{
    "action":"save",
    "config":[
        {
            "key": "display",
            "lang": "zh_CN",
            "content": {
                "#playing": "游戏中",
                "#idle": "在线",
                "#room": "准备中",
                "#matching": "组队中"
            }
        },
        {
            "key": "display",
            "lang": "en_US",
            "content": {
                "#playing": "Playing",
                "#idle": "Idle",
                "#room": "Room",
                "#matching": "Matching"
            }
        },
        {
            "key": "leadboard",
            "lang": "zh_CN",
            "content": {
                "#score": "%score% 分,竞技排名为 %rank%",
                "#rank": "%rank% 名"
            }
        },
        {
            "key": "leadboard",
            "lang": "en_US",
            "content": {
                "#score": "%score% score",
                "#rank": "%rank% rank best"
            }
        }
    ]
  }'
  https://{{host}}/friend/v1/rich-presence/config/lang-info
```

返回结果同上节的[配置富信息字段](#配置富信息字段)接口。

### 获取玩家的富信息

可以一次性获取多个玩家的富信息（传入逗号分隔的 objectId 列表）：

```sh
curl -X GET \
  -H "X-LC-Id: {{appid}}" \
  -H "X-LC-Key: {{appkey}}" \
  -H "X-LC-Session: {{sessionToken}}" \
  --data-urlencode 'ids={userObjectId,anotherUserObjectId}'
  https://{{host}}/friend/v1/rich-presence/users
```

返回结果示例：

```json
{
    "results": [
        {
            "online": false,
            "richPresence": {
                "score": "15",
                "leadboard": "15 分,排名为 150",
                "rank": "150"
            }
        },
        {
            "online": false,
            "richPresence": {}
        }
    ]
}
```
