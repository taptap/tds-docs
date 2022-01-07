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

- 阅读本篇指南，了解两种好友模型下均通用的接口。

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

## 响应好友变化通知

好友模块支持客户端监听好友状态变化，在游戏中实时给玩家提示。
你需要在调用上线接口前注册好友状态变更监听实例，这样，玩家上线后就能收到相应通知：

<MultiLang>

```cs
TDSFriendCore.FriendStatusChangedDelegate = new TDSFriendStatusChangedDelegate {
    // 新增好友（触发时机同「已发送的好友申请被接受」）
    OnFriendAdd = friendInfo => {},
    // 新增好友申请
    OnNewRequestComing = req => {},
    // 已发送的好友申请被接受
    OnRequestAccepted = req => {},
    // 已发送的好友申请被拒绝
    OnRequestDeclined = req => {},
    // 好友上线
    OnFriendOnline = userId => {},
    // 好友下线
    OnFriendOffline = userId => {},
    // 好友富信息变更
    OnRichPresenceChanged = (userId, richPresence) => {},
    // 当前玩家成功上线（长连接建立成功）
    OnConnected = () => {},
    // 当前玩家长连接断开，SDK 会自动重试，开发者通常无需额外处理
    OnDisconnected = () => {},
    // 当前连接异常
    OnConnectionError = (code, message) => {},
};
```

```java
TDSFriendCommon.registerFriendStatusChangedListener(new FriendStatusChangedListener() {
    // 新增好友（触发时机同「已发送的好友申请被接受」）
    @Override
    public void onFriendAdd(TDSFriendInfo friendInfo) {}

    // 新增好友申请
    @Override
    public void onNewRequestComing(LCFriendshipRequest request) {}

    // 通过分享链接进入游戏 SDK 自动发送好友申请时触发
    @Override
    public void onSendFriendRequestToSharer(boolean isSuccess, String nickname, TDSFriendError error) {}

    // 已发送的好友申请被接受
    @Override
    public void onRequestAccepted(LCFriendshipRequest request) {}

    // 已发送的好友申请被拒绝
    @Override
    public void onRequestDeclined(LCFriendshipRequest request) {}

    // 好友上线
    @Override
    public void onFriendOnline(String userId) {}

    // 好友下线
    @Override
    public void onFriendOffline(String userId) {}

    // 好友富信息变更
    @Override
    public void onRichPresenceChanged(String userId, TDSRichPresence richPresence) {}

    // 当前玩家成功上线（长连接建立成功）
    @Override
    public void onConnected() {}

    // 当前玩家长连接断开，SDK 会自动重试，开发者通常无需额外处理
    @Override
    public void onDisconnected() {}

    // 当前连接异常
    @Override
    public void onConnectError(int code, String msg){});
}
```

```objc
[TDSFriends registerNotificationDelegate:self];

// 新增好友（触发时机同「已发送的好友申请被接受」）
- (void)onFriendAdd:(TDSFriendInfo *)info {}

// 新增好友申请
- (void)onNewRequestComing:(LCFriendshipRequest *)request {}

// 已发送的好友申请被接受
- (void)onRequestAccepted:(LCFriendshipRequest *)request {}

// 已发送的好友申请被拒绝
- (void)onRequestDeclined:(LCFriendshipRequest *)request {}

// 好友上线
- (void)onFriendOnline:(NSString *)userId {}

// 好友下线
- (void)onFriendOffline:(NSString *)userId {}

// 好友富信息变更
- (void)onRichPresenceChanged:(NSString *)userId dictionary:(NSDictionary * _Nullable)dictionary {}

// 当前玩家成功上线（长连接建立成功）
- (void)onConnected {}

// 当前玩家长连接断开，SDK 会自动重试，开发者通常无需额外处理
- (void)onDisconnected {}

// 当前连接异常
- (void)onDisconnectedWithError:(NSError * _Nullable)error {}
```

</MultiLang>

上述事件中的「好友」，均指「好友模式」下的「好友」。
目前 SDK 暂不支持监听关注模式下的事件。

如果想要停止监听：

<MultiLang>

```cs
TDSFriendCore.FriendStatusChangedDelegate = null;
```

```java
TDSFriendCommon.removeFriendStatusChangedListener();
```

```objc
[TDSFriends unregisterNotificationDelegate];
```

</MultiLang>

## 玩家上线

玩家成功登录后，需要调用该接口建立和好友服务云端的长连接。
长连接建立后，如果网络临时中断，SDK 会在网络恢复后自动重连。

<MultiLang>
<>

```cs
await TDSFriendCore.Online();
```

</>
<>

```java
TDSFriendCommon.online(new Callback<Boolean>() {
    @Override
    public void onSuccess(Boolean ok) {
        toast("online success");
    }

    @Override
    public void onFail(TDSFriendError error) {
        toast("online failure: " + error.detailMessage);
    }
});
```

建立长连接后，如果玩家通过好友邀请链接打开游戏，那么 Android SDK 也会自动发送对应的好友申请。

</>
<>

```objc
[TDSFriends online];
```

</>
</MultiLang>

## 玩家下线

玩家登出后，需要调用此接口断开和云端的长连接。

<MultiLang>

```cs
await TDSFriendCore.Offline();
```

```java
TDSFriendCommon.offline();
```

```objc
[TDSFriends offline];
```

</MultiLang>

## 根据昵称查询好友

在不知道玩家 objectId 的情况下，可以通过玩家昵称查询好友。
例如，搜索昵称为 `Tarara` 的好友：

<MultiLang>

```cs
ReadOnlyCollection<TDSFriendInfo> friendInfos = await TDSFriendCore.SearchUserByName("Tarara");
foreach (TDSFriendInfo info in friendInfos) {
    // 玩家信息
    TDSUser user = info.User;
    // 富信息数据，详见后文
    Dictionary<string, string> richPresence = RichPresence;
    // 好友是否在线
    bool online = info.Online;
}
```

```java
TDSFriendCommon.searchUserByName("Tarara", new ListCallback<TDSFriendInfo>() {
    @Override
    public void onSuccess(List<TDSFriendInfo> friendInfoList) {
        for (TDSFriendInfo info : friendInfoList) {
            // 玩家信息
            TDSUser user = info.getUser();
            // 富信息数据，详见后文
            TDSRichPresence richPresence = info.getRichPresence();
            // 好友是否在线
            boolean online = info.isOnline();
        }
    }

    @Override
    public void onFail(TDSFriendError error) {
        toast("Failed search friend by nickname" + error.detailMessage);
    }
});
```

```objc
TDSFriendsQueryOption *option = [TDSFriendsQueryOption new];
option.from = 0;
option.limit = 100;
[TDSFriends searchUserWithNickname:@"Tarara" option:option
callback:^(NSArray<TDSFriendInfo *> * _Nullable friendInfos, NSError * _Nullable error) {
    if (friendInfos) {
        for (TDSFriendInfo *info in friendInfos) {
            // 玩家信息
            TDSUser *user = info.user;
            // 富信息数据，详见后文
            NSDictionary *richPresence = info.richPresence;
            // 好友是否在线
            BOOL online = info.online;
        }
    } else if (error) {
        // 处理错误
    }
}];
```

</MultiLang>

注意，**使用这一功能的前提是内建账户系统中设置了 `nickname`（昵称）字段**。
参见[内建账户系统文档](/sdk/authentication/guide/#设置其他用户属性)。

## 好友码

每个已登录玩家都有一个好友码，可以分享给其他玩家用于添加好友。

访问 `TDSUser` 的 `shortId` 属性可获取好友码：

<MultiLang>

```cs
// currentUser 是已登录的 TDSUser
string shortId = currentUser["shortId"];
```

```java
String shortId = currentUser.getString("shortId");
```

```objc
NSString *shortId = currentUser[@"shortId"];
```

</MultiLang>

可以通过好友码查询玩家：

<MultiLang>

```cs
TDSFriendInfo friendInfo = await TDSFriendCore.SearchUserByShortCode(shortId);
```

```java
TDSFriendCommon.searchUserByShortCode(shortId, new Callback<TDSFriendInfo>() {
    @Override
    public void onSuccess(TDSFriendInfo friendInfo) { /* 略（参见上节） */ }

    @Override
    public void onFail(TDSFriendError error) { /* 略（参见上节） */ }
});
```

```objc
[TDSFriends searchUserWithShortCode:shortId
callback:^(TDSFriendInfo * _Nullable friendInfo, NSError * _Nullable error) {
    // 略（参见上节）
}];
```

</MultiLang>



## 富信息

富信息用于呈现玩家状态等信息，如在线状态、正在使用哪个英雄、正处于哪个游戏模式等。

在控制台添加富信息相关配置后，可以根据已配置的富信息字段，设置对应的富信息内容：

<MultiLang>

```cs
await TDSFriendCore.SetRichPresence("score", "60");
```

```java
TDSFriendCommon.setRichPresence("score", "60",  new Callback<Boolean>() {
    @Override
    public void onSuccess(Boolean ok) {
        toast("Succeed to set rich presence.");
    }

    @Override
    public void onFail(TDSFriendError error) {
        toast("Failed to set rich presence: " + error.detailMessage);
    }
});
```

```objc
[TDSFriends setRichPresenceWithKey:@"score" value:@"60"
    callback:^(BOOL succeeded, NSError * _Nullable error) {
  if (succeeded) {
    // Succeed to set rich presence.
  } else if (error) {
    // Failed to set rich presence.
  }
}];
```

</MultiLang>

这里 `score` 是在控制台配置的富信息字段。
富信息的字段有两种类型：

- `variable` 类型，值是字符串。例如，之前的代码实例中，`score` 在控制台配置为 `variable` 类型，因此客户端设置富信息字段的值时填了 `60`，云端返回给客户端的富信息为 `"score": "60"`，在游戏界面该玩家的好友会看到当前玩家的富信息显示为「得分 60」之类。这里，开发者需要自行实现将 `score` 显示为「得分」等本地化内容的逻辑。

- `token` 类型，值是以 `#` 开头的字符串。例如，下面的代码实例中 `display` 字段的类型是 `token`，客户端设置富信息字段的值时填了 `#matching`，这个值在云端会进行多语言匹配，返回给客户端的富信息会直接替换为本地化的内容：`"display": "匹配中"`。注意，如果多语言匹配失败则会返回空字符串（`"display": " "`）。

需要一次性配置多个字段时，可以传入一组字段：

<MultiLang>

```cs
Dictionary<string, string> info = new Dictionary<string, string>();
info.Add("score", "60");
info.Add("display", "#matching");
await TDSFriendCore.SetRichPresences(info);
```

```java
Map<String,String> info = new HashMap<>();
info.put("score", "60");
info.put("display", "#matching");
TDSFriendCommon.setRichPresence(info, new Callback<Boolean>() {
    // 略
});
```

```objc
[TDSFriends setRichPresencesWithDictionary:@{
    @"score" : @"60",
    @"display" : @"#matching",
} callback:^(BOOL succeeded, NSError * _Nullable error) {
    // 略
}];
```

</MultiLang>

控制台**最多配置 20 个富信息字段**，字段名（key）长度不超过 128 bytes，字段值（value）长度不超过 256 bytes。

如需清除当前玩家的某项富信息，可以调用以下接口：

<MultiLang>

```cs
TDSFriendCore.ClearRichPresence("score");
```

```java
TDSFriendCommon.clearRichPresence("score", new Callback<Boolean>() {
    // 略
});
```

```objc
[TDSFriends clearRichPresenceWithKey:@"score"
callback:^(BOOL succeeded, NSError * _Nullable error) {
    // 略
}];
```

</MultiLang>

同样，可以批量清除一组富信息：

<MultiLang>

```cs
IEnumerable<string> keys = new string[] {"score", "display"}
await TDSFriendCore.ClearRichPresences(keys);
```

```java
List<String> keys = new ArrayList<>();
keys.add("score");
keys.add("display");
TDSFriends.clearRichPresence(keys, new Callback<Boolean>() {
    // 略
});
```

```objc
[TDSFriends clearRichPresencesWithKeys:@[@"score", @"display"]
callback:^(BOOL succeeded, NSError * _Nullable error) {
    // 略
});
```

</MultiLang>

设置和清除富信息接口有调用频率限制，每 30s 最多各触发一次。

### 富信息 REST API

下面我们介绍富信息相关的 REST API 接口。
开发者可以自行编写程序或脚本调用这些接口在服务端进行管理性质的操作。

#### 请求格式

对于 POST 和 PUT 请求，请求的主体必须是 JSON 格式，而且 HTTP Header 的 Content-Type 需要设置为 `application/json`。

请求的鉴权是通过 HTTP Header 里面包含的键值对来进行的，参数如下表：

Key|Value|含义|来源
---|----|---|---
`X-LC-Id`|`{{appid}}`|当前应用的 `App Id`（即 `Client Id`）|可在控制台查看
`X-LC-Key`|`{{appkey}}`|当前应用的 `App Key`（即 `Client Token`）|可在控制台查看

管理接口需要使用 `Master Key`：`X-LC-Key: {{masterkey}},master`。
`Master Key` 即 `Server Secret`，同样可在控制台查看。

详见文档关于[应用凭证](/sdk/storage/guide/setup-dotnet#应用凭证)的说明。

#### Base URL

REST API 请求的 Base URL（下文 curl 示例中用 `{{host}}` 表示）即应用绑定的 API 自定义域名，可以在控制台绑定、查看。
详见文档关于[绑定域名](/sdk/storage/guide/setup-dotnet#绑定域名)的说明。

#### 获取富信息配置

```sh
curl -X GET \
  -H "X-LC-Id: {{appid}}" \
  -H "X-LC-Key: {{appkey}}" \
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

#### 配置富信息字段

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

#### 配置多语言内容

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

#### 获取玩家的富信息

可以一次性获取多个玩家的富信息（传入逗号分隔的 objectId 列表）：

```sh
curl -X GET \
  -H "X-LC-Id: {{appid}}" \
  -H "X-LC-Key: {{appkey}}" \
  --data-urlencode 'ids=userObjectId,anotherUserObjectId'
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

## 3.5 与 3.6 兼容性

3.6 新增了关注模式（`TDSFollows` 类），因此将一些通用的接口移动到了新的公共类中。
但 `TDSFriends` 在 3.6 下继承了新增的公共类，因此这些公共类的接口也可以通过 `TDSFriends` 访问。
所以，使用好友模式的游戏从 3.5 升级到 3.6，可以不更新原先通过 `TDSFriends` 访问的接口。
