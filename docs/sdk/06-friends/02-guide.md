---
id: guide
title: 好友指南
sidebar_label: 开发指南
---

import MultiLang from '/src/docComponents/MultiLang';
import CodeBlock from '@theme/CodeBlock';
import sdkVersions from '/src/docComponents/sdkVersions';

游戏好友模块基于 [TDS 内建账户系统](/sdk/authentication/features/)，下文中的玩家、用户均指 `TDSUser`。

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
TDSFriends.FriendStatusChangedDelegate = new TDSFriendStatusChangedDelegate {
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
TDSFriends.registerFriendStatusChangedListener(new FriendStatusChangedListener() {
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

如果想要停止监听：

<MultiLang>

```cs
TDSFriends.FriendStatusChangedDelegate = null;
```

```java
TDSFriends.removeFriendStatusChangedListener();
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
await TDSFriends.Online();
```

</>
<>

```java
TDSFriends.online(new Callback<Boolean>() {
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
await TDSFriends.Offline();
```

```java
TDSFriends.offline();
```

```objc
[TDSFriends offline];
```

</MultiLang>

## 添加好友

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

可以通过指定好友码添加相应玩家为好友。

<MultiLang>

```cs
await TDSFriends.AddFriendByShortCode(shortId);
```

```java
TDSFriends.addFriendByShortCode(shortId, null, new Callback<Boolean>() {
    @Override
    public void onSuccess(Boolean ok) {
        toast("Applied or added.");
    }

    @Override
    public void onFail(TDSFriendError error) {
        toast("Failed to add a friend: " + error.detailMessage);
    }
});
```

```objc
[TDSFriends addFriendWithShortCode:shortId attributes:nil callback:^(BOOL succeeded, NSError * _Nullable error) {
  if (succeeded) {
    // Applied or added.
  } else if (error) {
    // Failed to add a friend.
  }
}];
```

</MultiLang>


如果当前玩家已经在对方的好友列表中，那么对方会直接成为当前玩家的好友。
否则，会向对方发送好友申请。

添加好友时可以指定额外的属性，例如，将对方放入 `coworkers`（同事）分组：

<MultiLang>

```cs
Dictionary<string, object> attrs = new Dictionary<string, object> {
    { "group", "coworkers" }
};
await TDSFriends.AddFriendByShortCode(shortId, attrs);
```

```java
Map<String, Object> attrs = new HashMap<String, Object>();
attrs.put("group", "coworkers");
TDSFriends.addFriendByShortCode(shortId, attrs, new Callback<Boolean>() {
    // 略（参见上面的例子）
});
```

```objc
NSDictionary *attributes = @{
    @"group" : @"coworkers",
};
[TDSFriends addFriendWithShortCode:shortId attributes:attributes
callback:^(BOOL succeeded, NSError * _Nullable error) {
    // 略（参见上面的例子）
}];
```

</MultiLang>

此外，也可以通过指定某个 `TDSUser` 的 `objectId` 来添加他为好友。
比如，假设 Tarara 的 `objectId` 是 `5b0b97cf06f4fd0abc0abe35`，可以通过以下代码添加她为好友：

<MultiLang>

```cs
await TDSFriends.AddFriend("5b0b97cf06f4fd0abc0abe35");
```

```java
TDSFriends.addFriend("5b0b97cf06f4fd0abc0abe35", new Callback<Boolean>() {
    // 略（参见上面的例子）
});
```

```objc
[TDSFriends addFriendWithUserId:@"5b0b97cf06f4fd0abc0abe35" attributes:nil
callback:^(BOOL succeeded, NSError * _Nullable error) {
    // 略（参见上面的例子）
}];
```

</MultiLang>

通过 `objectId` 添加好友同样可以指定额外属性：

<MultiLang>

```cs
Dictionary<string, object> attrs = new Dictionary<string, object> {
    { "group", "coworkers" }
};
await TDSFriends.AddFriend("5b0b97cf06f4fd0abc0abe35", attrs);
```

```java
Map<String, Object> attrs = new HashMap<String, Object>();
attrs.put("group", "coworkers");
TDSFriends.addFriend("5b0b97cf06f4fd0abc0abe35", attrs, new Callback<Boolean>() {
    // 略（参见上面的例子）
});
```

```objc
NSDictionary *attributes = @{
    @"group" : @"coworkers",
};
[TDSFriends addFriendWithUserId:@"5b0b97cf06f4fd0abc0abe35" attributes:attributes callback:^(BOOL succeeded, NSError * _Nullable error) {
    // 略（参见上面的例子）
}];
```

</MultiLang>

## 删除好友

成为好友的两个玩家，之后也可以单方面删除好友。
例如，和 Tarara 成为好友后，当前玩家又改变主意，不想和 Tarara 做朋友了：

<MultiLang>

```cs
await TDSFriends.DeleteFriend("5b0b97cf06f4fd0abc0abe35");
```

```java
TDSFriends.deleteFriend("5b0b97cf06f4fd0abc0abe35", new Callback<Boolean>() {
    @Override
    public void onSuccess(Boolean ok) {
        toast("Deleted.");
    }

    @Override
    public void onFail(TDSFriendError error) {
        toast("Failed to delete a friend: " + error.detailMessage);
    }
});
```

```objc
[TDSFriends deleteFriendWithUserId:@"5b0b97cf06f4fd0abc0abe35" callback:^(BOOL succeeded, NSError * _Nullable error) {
  if (succeeded) {
    // Deleted.
  } else if (error) {
    // Failed to delete a friend.
  }
}];
```

</MultiLang>

## 查询好友申请列表

好友申请有三种状态：

- `pending`，对方没有回应，还处于等待中。好友申请创建之后默认是此状态。
- `accepted`，对方已经接受，现在双方成为好友。
- `declined`，对方已经拒绝。

SDK 提供了查询好友申请的接口。
例如，查询处于 `pending` 状态的前 20 条申请：

<MultiLang>
<>

```cs
var from = 0;
var limit = 100;
ReadOnlyCollection<LCFriendshipRequest> requests = await TDSFriends.QueryFriendRequestList (
    LCFriendshipRequest.STATUS_PENDING, from, limit
);
```

`LCFriendshipRequest.STATUS_PENDING` 即表示好友申请状态为 `pending`。
类似地，`LCFriendshipRequest.STATUS_ACCEPTED` 和 `LCFriendshipRequest.STATUS_DECLINED` 分别表示好友申请状态为 `accepted` 和 `declined`。
`LCFriendshipRequest.STATUS_ANY` 则表示任意状态。

</>
<>

```java
int from = 0;
int limit = 100;
TDSFriends.queryFriendRequestList(LCFriendshipRequest.STATUS_PENDING, from, limit,
    new ListCallback<LCFriendshipRequest>(){

        @Override
        public void onSuccess(List<LCFriendshipRequest> requests) {
            // requests 就是处于 pending 状态中的好友申请列表
        }

        @Override
        public void onFail(TDSFriendError error) {
            toast("Failed to query friendship requests: " + error.detailMessage);
        }
});
```

上述代码示例中的 `LCFriendshipRequest.STATUS_PENDING` 即表示好友申请状态为 `pending`。
类似地，`LCFriendshipRequest.STATUS_ACCEPTED` 和 `LCFriendshipRequest.STATUS_DECLINED` 分别表示好友申请状态为 `accepted` 和 `declined`。
`LCFriendshipRequest.STATUS_ANY` 则表示任意状态。

</>
<>

```objc
TDSFriendsQueryOption *option = [TDSFriendsQueryOption new];
option.from = 0;
option.limit = 100;
[TDSFriends queryFriendRequestWithStatus:TDSUserFriendshipRequestStatusPending
    option:option
    callback:^(NSArray<LCFriendshipRequest *> * _Nullable requests, NSError * _Nullable error) {
        // requests 就是处于 pending 状态中的好友申请列表
}];        
```

上述代码示例中的 TDSUserFriendshipRequestStatusPending 即表示好友申请状态为 `pending`。
类似地，`TDSUserFriendshipRequestStatusAccepted` 和 `TDSUserFriendshipRequestStatusDeclined;` 分别表示好友申请状态为 `accepted` 和 `declined`。
`TDSUserFriendshipRequestStatusAny` 则表示任意状态。

</>

</MultiLang>

## 处理好友申请

对于新的好友请求，玩家可以同意或者拒绝，也可以什么都不做，无视这些请求，甚至直接删除。

<MultiLang>

```cs
// LCFriendshipRequest request

// 接受
await TDSFriends.AcceptFriendshipRequest(request);
// 接受并添加额外属性
Dictionary<string, object> attrs = new Dictionary<string, object> {
    { "group", "coworkers" }
};
await TDSFriends.AcceptFriendshipRequest(request, attrs);

// 拒绝
await TDSFriends.DeclineFriendshipRequest(request);
// 删除
await request.Delete();
```

```java
// LCFriendshipRequest request

// 接受
TDSFriends.acceptFriendRequest(request, new Callback<Boolean>() {
    @Override
    public void onSuccess(Boolean ok) {
        toast("Accepted.");
    }

    @Override
    public void onFail(TDSFriendError error) {
        toast("Failed to delete a friend: " + error.detailMessage);
    }
});
// 接受并添加额外属性
Map<String, Object> attrs = new HashMap<String, Object>();
attrs.put("group", "coworkers");
TDSFriends.acceptFriendRequest(request, attrs, new Callback<Boolean>() {
    // 略
});

// 拒绝
TDSFriends.declineFriendRequest(request, new Callback<Boolean>() {
    // 略
});
// 删除
TDSFriends.deleteFriendRequest(request, new Callback<Boolean>() {
    // 略
});
```

```objc
// LCFriendshipRequest request

// 接受
[TDSFriends acceptFriendRequest:request attributes:nil
callback:^(BOOL succeeded, NSError * _Nullable error) {
  if (succeeded) {
    // Accepted.
  } else if (error) {
    // Failed to accept a friend request.
  }
}];
// 接受并添加额外属性
NSDictionary *attributes = @{
    @"group" : @"coworkers",
};
[TDSFriends acceptFriendRequest:request attributes:attributes
callback:^(BOOL succeeded, NSError * _Nullable error) {
    // 略
}];

// 拒绝
[TDSFriends declineFriendRequest:request
callback:^(BOOL succeeded, NSError * _Nullable error) {
    // 略
}];

[TDSFriends deleteFriendRequest:request
callback:^(BOOL succeeded, NSError * _Nullable error) {
    // 略
}];       
```

</MultiLang>

注意：

1. 对方拒绝了当前玩家发起的好友申请之后，玩家通过之前接口的添加好友接口再次发送申请时会收到报错，表明对方不想和当前玩家成为好友。
3. 对方删除了当前玩家发起的好友请求后，当前玩家还可以再次发起申请。

## 查询好友列表

玩家可以查询自己的好友列表。查询时可以限定返回结果数量及起始位置：

<MultiLang>

```cs
var from = 0;
var limit = 100;
ReadOnlyCollection<TDSFriendInfo> friendInfos = await TDSFriends.QueryFriendList(from, limit);
foreach (TDSFriendInfo info in friendInfos) {
    // 玩家信息
    TDSUser user = info.User;
    // 富信息数据，详见后文
    Dictionary<string, string> richPresence = info.RichPresence;
    // 好友是否在线
    bool online = info.Online;
}
```

```java
int from = 0;
int limit = 100;
TDSFriends.queryFriendList(from, limit,
    new ListCallback<TDSFriendInfo>(){

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
            toast("Failed to query friend list" + error.detailMessage);
        }
});
```

```objc
TDSFriendsQueryOption *option = [TDSFriendsQueryOption new];
option.from = 0;
option.limit = 100;
[TDSFriends queryFriendWithOption:option
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

## 查询是否好友

可以通过指定某个 `TDSUser` 的 `objectId` 来查询他是否是当前玩家的好友。
比如，假设 Tarara 的 `objectId` 是 `5b0b97cf06f4fd0abc0abe35`：

<MultiLang>

```cs
bool isFriend = await TDSFriends.CheckFriendship("5b0b97cf06f4fd0abc0abe35");
```

```java
TDSFriends.checkFriendship("5b0b97cf06f4fd0abc0abe35", new Callback<Boolean>() {
    @Override
    public void onSuccess(Boolean isFriend) {
        if (isFriend) {
            toast("Tarara is my friend.");
        } else {
            toast("Tarara is not my friend.");
        }
    }

    @Override
    public void onFail(TDSFriendError error) {
        toast("Failed to query friendship: " + error.detailMessage);
    }
});
```

```objc
[TDSFriends checkFriendshipWithUserId:@"5b0b97cf06f4fd0abc0abe35"
    callback:^(NSNumber * _Nullable isFriend, NSError * _Nullable error) {
        if (error) {
            // 处理错误
        }
        if (isFriend.boolValue) {
            NSLog(@"Tarara is my friend.");
        } else {
            NSLog(@"Tarara is not my friend.");
        }
}];
```

</MultiLang>

## 根据昵称查询好友

在不知道玩家 objectId 的情况下，可以通过玩家昵称查询好友。
例如，搜索昵称为 `Tarara` 的好友：

<MultiLang>

```cs
ReadOnlyCollection<TDSFriendInfo> friendInfos = await TDSFriends.SearchUserByName("Tarara");
ReadOnlyCollection<TDSFriendInfo> friendInfos = await TDSFriends.QueryFriendList(from, limit);
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
TDSFriends.searchUserByName("Tarara", new ListCallback<TDSFriendInfo>() {
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

## 根据好友码查询好友

也可以通过好友码查询好友：

<MultiLang>

```cs
TDSFriendInfo friendInfo = await TDSFriends.SearchUserByShortCode(shortId);
```

```java
TDSFriends.searchUserByShortCode(shortId, new Callback<TDSFriendInfo>() {
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
await TDSFriends.SetRichPresence("score", "60");
```

```java
TDSFriends.setRichPresence("score", "60",  new Callback<Boolean>() {
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
await TDSFriends.SetRichPresences(info);
```

```java
Map<String,String> info = new HashMap<>();
info.put("score", "60");
info.put("display", "#matching");
TDSFriends.setRichPresence(info, new Callback<Boolean>() {
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
TDSFriends.clearRichPresence("score");
```

```java
TDSFriends.clearRichPresence("score", new Callback<Boolean>() {
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
await TDSFriends.ClearRichPresences(keys);
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

## 分享链接

注意，**使用这一功能的前提是内建账户系统中设置了 `nickname`（昵称）字段**。
参见[内建账户系统文档](/sdk/authentication/guide/#设置其他用户属性)。

### 落地页

使用分享链接功能需要首先部署落地页网站。
落地页网站可以部署在[云引擎](/sdk/engine/guide/overview/)或其他支持部署纯静态网站的服务器上。
如果计划部署在云引擎上，需注意云引擎的免费实例会自动休眠，请购买标准实例使用。

我们提供了[开源的落地页示例项目][repo]，修改相应配置后可直接构建、部署、使用。
注意，示例项目中的 `VITE_ANDROID_LINK` 环境变量格式为 `scheme://host/path`。
`host` 和 `path` 的值需和 Android 的 `AndroidManifest.xml` 中的值保持一致。

[repo]: https://github.com/taptap/TapFriends-landing-page

例如，假设 `AndroidManifest.xml` 中的相关配置如下：

```xml
<activity
    android:name="com.tapsdk.friends.TDSFriendsRouterPageActivity"
    android:allowTaskReparenting="true"
    android:configChanges="keyboardHidden|orientation"
    android:exported="true"
    android:launchMode="singleTask"
    android:screenOrientation="nosensor"
    android:theme="@android:style/Theme.Translucent.NoTitleBar">
    <intent-filter>
        <action android:name="android.intent.action.VIEW" />

        <category android:name="android.intent.category.DEFAULT" />
        <category android:name="android.intent.category.BROWSABLE" />

        <data
            android:host="游戏应用ID"
            android:path="/friends"
            android:scheme="tapsdk" />
            <!-- scheme不能出现大写或者下划线，<a href="[scheme]://[host]/[path]?[query]">启动应用程序</a> -->
        </intent-filter>
</activity>
```

那么落地页项目中 `VITE_ANDROID_LINK` 的值为 `tapsdk://游戏应用ID/friends`。

落地页网站的地址需要在客户端配置：

<MultiLang>

```cs
TDSFriends.SetShareLink("https://please-replace-with-your-domain.example.com");
```

```java
TDSFriends.setShareLink("https://please-replace-with-your-domain.example.com");
```

```objc
[TDSFriends setShareLink:@"https://please-replace-with-your-domain.example.com"];
```

</MultiLang>

如果落地页部署在云引擎网站上，那么地址就是 `https://你的云引擎自定义域名`。

### 生成链接

部署完落地页网站并在客户端配置好相应地址后，调用以下接口即可生成好友邀请页网址：

<MultiLang>

```cs
string inviteUrl = await TDSFriends.GenerateFriendInvitationLink();
```

```java
TDSFriends.generateFriendInvitationLink(new Callback<String>() {
    @Override
    public void onSuccess(String inviteUrl) {
        System.out.println("share this link to invite your friends: " + inviteUrl);
    }

    @Override
    public void onFail(TDSFriendError error) {
        System.out.println("Failed to generate invite link: " + error.detailMessage);
    }
});
```

```objc
NSError *error;
NSString *inviteUrl = [TDSFriends generateFriendInvitationLinkWithError:&error];
```

</MultiLang>

### 处理链接

玩家通过邀请链接打开游戏后，开发者需要调用该接口。
调用该接口后，SDK 会自动向对应的玩家发起好友申请。

<MultiLang>

<>

```cs
public class DeepLinkManager : MonoBehaviour
{
    // 略
    private async void onDeepLinkActivated(string url) {
        Dictionary<string, object> invitation = TDSFriends.ParseFriendInvitationLink(url);
        string userId = invitation["identity"];
        string nickname = invitation["nickname"];
        await TDSFriends.HandleFriendInvitationLink(url);
    }
}
```

</>
<>

如果玩家通过好友邀请链接打开游戏，那么 Android SDK 会自动发送对应的好友申请。
开发者只需确保玩家登录后调用了 `online()` 方法建立长连接，无需对打开邀请链接进行特别处理。

</>
<>

```objc
- (BOOL)application:(UIApplication *)app openURL:(NSURL *)url options:(NSDictionary<UIApplicationOpenURLOptionsKey, id> *)options {
    return [TDSFriends handleFriendInvitationLink:url
    callback:^(BOOL succeeded, TDSFriendsLinkInfo * _Nullable linkInfo, NSError * _Nullable error) {
        if (error) {
            // handle error
        }
    }];
}
```

</>

</MultiLang>

## 查询第三方平台好友

调用以下接口可以查询当前玩家在第三方平台（比如 TapTap）上的好友。
该接口除了会返回好友列表外，还会返回游标。
指定游标和返回数量，可以实现翻页功能。

返回的第三方平台好友列表中会包括玩家在第三方平台的 ID、昵称、头像。
如果好友已经使用 TapTap 账号登录该游戏，那么还会返回相应的 `TDSFriendInfo`，否则此项会返回 `null`。 

<MultiLang>

```cs
// 首次查询
string platform = "taptap";
string cursor = null;
// 默认 50，最大 500
int limit = 50;
ThirdPartyFriendResult result = await TDSFriends.QueryThirdPartyFriendList(platform, cursor, limit);

ReadOnlyCollection<ThirdPartyFriend> friends = result.FriendList;
foreach (ThirdPartyFriend frined in friends) {
    string thirdPartyId = friend.Id;
    string thirdPartyNickName = friend.Name;
    string thirdPartyAvatarUrl = friend.Avatar;
    TDSFriendInfo info = friend.FriendInfo;
}

// 翻页
string cursor = result.Cursor;
ThirdPartyFriendResult more = await TDSFriends.QueryThirdPartyFriendList(platform, cursor, limit);
```

```java
ThirdPartyFriendRequestConfig config = new ThirdPartyFriendRequestConfig.Builder()
    .platform(ThirdPartyFriendRequestConfig.PLATFORM_TAPTAP)
    .pageSize(50)  /* 默认 50，最大 500 */
    .build();
// 首次查询
TDSFriends.queryThirdPartyFriendList(config, null, new Callback<ThirdPartyFriendResult>() {
    @Override
    public void onSuccess(ThirdPartyFriendResult result) {
        List<ThirdPartyFriend> friends = result.getFriendList();
        for (ThirdPartyFriend friend : friends) {
            String thirdPartyId = friend.getUserId();
            String thirdPartyNickName = friend.getUserName();
            String thirdPartyAvatarUrl = friend.getUserAvatar();
            TDSFriendInfo info = friend.getTdsFriendInfo();
        }

        // 翻页
        String cursor = result.getCursor();
        TDSFriends.queryThirdPartyFriendList(config, cursor, new Callback<ThirdPartyFriendResult>() {
            /* 略 */
        }
    }  
    @Override
    public void onFail(TDSFriendError error) {
        toast("query error = " + error.code + " msg = " + error.detailMessage);       
    }
});
```

```objc
TDSThirdPartyFriendQueryOption *option = [TDSThirdPartyFriendQueryOption new];
option.platform = TDSThirdPartyFriendPlatformTaptap;
option.pageSize = 50; // 默认 50，最大 500
__block NSString *cursor; // 游标

[TDSThirdPartyFriend queryThirdPartyFriendListWithOption:option
callback:^(TDSThirdPartyFriendResult * _Nullable result, NSError * _Nullable error) {
    for (TDSThirdPartyFriend* friend in friends) {
        NSString *thirdPartyId = friend.userId;
        NSString *thirdPartyNickName = friend.userName;
        NSString *thirdPartyAvatarUrl = friend.userAvatar;
        TDSFriendInfo *info = friend.tdsFriendInfo;
    }
    cursor = result.cursor;
}];

// 翻页
option.cursor = cursor;
[TDSThirdPartyFriend queryThirdPartyFriendListWithOption:option
callback:^(TDSThirdPartyFriendResult * _Nullable result, NSError * _Nullable error) {
    // 略
}];
```

</MultiLang>

默认情况下，SDK 优先从本地缓存中查询，以避免不必要的网络开销。
游戏如果希望总是从网络获取查询结果，可以在查询时指定缓存策略。
无论查询时是否指定缓存策略，SDK 总是会缓存查询的结果。
换句话说，缓存策略只决定是否读缓存，不决定是否写缓存。

<MultiLang>

```cs
ThirdPartyFriendResult result = await TDSFriends.QueryThirdPartyFriendList(platform, cursor, limit,
    TDSFriends.ThirdPartyFriendRequestCachePolicy.OnlyNetwork);
```

```java
ThirdPartyFriendRequestConfig config = new ThirdPartyFriendRequestConfig.Builder()
    .platform(ThirdPartyFriendRequestConfig.PLATFORM_TAPTAP)
    .cachePolicy(ThirdPartyFriendRequestConfig.CachePolicy.ONLY_NETWORK)
    .pageSize(50)
    .build();
```

```objc
option.cachePolicy = TDSThirdPartyFriendCachePolicyOnlyNetwork;
```

</MultiLang>

**目前第三方平台仅支持 TapTap，且该功能需要提交工单联系我们开通。**


## 在 TapTap 上关注好友

调用以下接口可以在 TapTap 上关注游戏中的好友。
**注意，该功能需要提交工单联系我们开通。**

<MultiLang>

```cs
// TDSUser friend
await TDSFriends.FollowTapUser(friend);
```

```java
// TDSUser friend
TDSFriends.followTapUser(friend, new Callback<Boolean>() {
    @Override
    public void onSuccess(Boolean ok) {
        toast("关注成功");
    }

    @Override
    public void onFail(TDSFriendError error) {
        toast("tap 关注失败 error: " + error.detailMessage);
    }
});
```

```objc
// TDSUser *friend
[TDSThirdPartyFriend followTapUser:friend
callback:^(BOOL succeeded, NSError * _Nullable error) {
  if (succeeded) {
    // Followed.
  } else if (error) {
    // Failed to follow the friend on TapTap.
  }
}];
```

</MultiLang>

注意，使用这一接口的前提是**对方使用 TapTap 账号登录游戏**。
另外，目前云端未限制仅可关注游戏好友，不是自己好友的玩家，也可以通过以上接口在 TapTap 上关注。
