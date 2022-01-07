---
id: follow
title: 关注模式
sidebar_label: 关注模式
---

import MultiLang from '/src/docComponents/MultiLang';

阅读本文前请先[完成 SDK 初始化](/sdk/friends/guide/)。

## 响应好友变化通知

好友模块支持客户端监听好友状态变化，在游戏中实时给玩家提示。
你需要在调用上线接口前注册好友状态变更监听实例，这样，玩家上线后就能收到相应通知：

<MultiLang>

```cs
TDSFollows.FriendStatusChangedDelegate = new TDSFriendStatusChangedDelegate {
    // 当前玩家成功上线（长连接建立成功）
    OnConnected = () => {},
    // 当前玩家长连接断开，SDK 会自动重试，开发者通常无需额外处理
    OnDisconnected = () => {},
    // 当前连接异常
    OnConnectionError = (code, message) => {},
};
```

```java
TDSFollows.registerFriendStatusChangedListener(new FriendStatusChangedListener() {
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
[TDSFollows registerNotificationDelegate:self];

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
TDSFollows.FriendStatusChangedDelegate = null;
```

```java
TDSFollows.removeFriendStatusChangedListener();
```

```objc
[TDSFollows unregisterNotificationDelegate];
```

</MultiLang>

## 玩家上线

玩家成功登录后，需要调用该接口建立和好友服务云端的长连接。
长连接建立后，如果网络临时中断，SDK 会在网络恢复后自动重连。

<MultiLang>
<>

```cs
await TDSFollows.Online();
```

</>
<>

```java
TDSFollows.online(new Callback<Boolean>() {
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
[TDSFollows online];
```

</>
</MultiLang>

## 玩家下线

玩家登出后，需要调用此接口断开和云端的长连接。

<MultiLang>

```cs
await TDSFollows.Offline();
```

```java
TDSFollows.offline();
```

```objc
[TDSFollows offline];
```

</MultiLang>

## 根据昵称查询好友

在不知道玩家 objectId 的情况下，可以通过玩家昵称查询好友。
例如，搜索昵称为 `Tarara` 的好友：

<MultiLang>

```cs
ReadOnlyCollection<TDSFriendInfo> friendInfos = await TDSFollows.SearchUserByName("Tarara");
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
TDSFollows.searchUserByName("Tarara", new ListCallback<TDSFriendInfo>() {
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
TDSFriendQueryOption *option = [TDSFriendQueryOption new];
option.from = 0;
option.limit = 100;
[TDSFollows searchUserWithNickname:@"Tarara" option:option
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
TDSFriendInfo friendInfo = await TDSFollows.SearchUserByShortCode(shortId);
```

```java
TDSFollows.searchUserByShortCode(shortId, new Callback<TDSFriendInfo>() {
    @Override
    public void onSuccess(TDSFriendInfo friendInfo) { /* 略（参见上节） */ }

    @Override
    public void onFail(TDSFriendError error) { /* 略（参见上节） */ }
});
```

```objc
[TDSFollows searchUserWithShortCode:shortId
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
await TDSFollows.SetRichPresence("score", "60");
```

```java
TDSFollows.setRichPresence("score", "60",  new Callback<Boolean>() {
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
[TDSFollows setRichPresenceWithKey:@"score" value:@"60"
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
await TDSFollows.SetRichPresences(info);
```

```java
Map<String,String> info = new HashMap<>();
info.put("score", "60");
info.put("display", "#matching");
TDSFollows.setRichPresence(info, new Callback<Boolean>() {
    // 略
});
```

```objc
[TDSFollows setRichPresencesWithDictionary:@{
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
TDSFollows.ClearRichPresence("score");
```

```java
TDSFollows.clearRichPresence("score", new Callback<Boolean>() {
    // 略
});
```

```objc
[TDSFollows clearRichPresenceWithKey:@"score"
callback:^(BOOL succeeded, NSError * _Nullable error) {
    // 略
}];
```

</MultiLang>

同样，可以批量清除一组富信息：

<MultiLang>

```cs
IEnumerable<string> keys = new string[] {"score", "display"}
await TDSFollows.ClearRichPresences(keys);
```

```java
List<String> keys = new ArrayList<>();
keys.add("score");
keys.add("display");
TDSFollows.clearRichPresence(keys, new Callback<Boolean>() {
    // 略
});
```

```objc
[TDSFollows clearRichPresencesWithKeys:@[@"score", @"display"]
callback:^(BOOL succeeded, NSError * _Nullable error) {
    // 略
});
```

</MultiLang>

设置和清除富信息接口有调用频率限制，每 30s 最多各触发一次。

富信息提供了 [REST API 接口](/sdk/friends/guide/#富信息-rest-api)。
开发者可以自行编写程序或脚本调用这些接口在服务端进行管理性质的操作。

## 关注

可以通过指定[好友码](/sdk/friends/guide/#好友码)关注相应玩家：

<MultiLang>

```cs
await TDSFollows.FollowByShortCode(shortId);
```

```java
TDSFollows.followByShortCode(shortId, new Callback<Boolean>() {
    @Override
    public void onSuccess(Boolean ok) {
        toast("Followed.");
    }

    @Override
    public void onFail(TDSFriendError error) {
        toast("Failed to follow: " + error.detailMessage);
    }
});
```

```objc
[TDSFollows followWithShortCode:shortId callback:^(BOOL succeeded, NSError * _Nullable error) {
  if (succeeded) {
    // Followed.
  } else if (error) {
    // Failed to follow.
  }
}];
```

</MultiLang>

关注玩家时可以指定额外的属性，例如，将对方放入 `coworkers`（同事）分组：

<MultiLang>

```cs
Dictionary<string, object> attrs = new Dictionary<string, object> {
    { "group", "coworkers" }
};
await TDSFollows.FollowByShortCode(shortId);
```

```java
Map<String, Object> attrs = new HashMap<String, Object>();
attrs.put("group", "coworkers");
TDSFollows.followByShortCode(shortId, attrs, new Callback<Boolean>() {
    // 略
});
```

```objc
NSDictionary *attributes = @{
    @"group" : @"coworkers",
};
[TDSFollows followWithShortCode:shortId attributes:attributes callback:^(BOOL succeeded, NSError * _Nullable error) {
    // 略
}];
```

</MultiLang>


此外，也可以通过指定某个 `TDSUser` 的 `objectId` 来关注他。
比如，假设 Tarara 的 `objectId` 是 `5b0b97cf06f4fd0abc0abe35`，可以通过以下代码添加她：

<MultiLang>

```cs
await TDSFollows.Follow("5b0b97cf06f4fd0abc0abe35");
```

```java
TDSFollows.follow("5b0b97cf06f4fd0abc0abe35", new Callback<Boolean>() {
    // 略
});
```

```objc
[TDSFollows followWithUserId:@"5b0b97cf06f4fd0abc0abe35"
callback:^(BOOL succeeded, NSError * _Nullable error) {
    // 略
}];
```

</MultiLang>

通过 `objectId` 关注玩家同样可以指定额外属性：

<MultiLang>

```cs
Dictionary<string, object> attrs = new Dictionary<string, object> {
    { "group", "coworkers" }
};
await TDSFollows.Follow("5b0b97cf06f4fd0abc0abe35");
```

```java
Map<String, Object> attrs = new HashMap<String, Object>();
attrs.put("group", "coworkers");
TDSFollows.follow("5b0b97cf06f4fd0abc0abe35", attrs, new Callback<Boolean>() {
    // 略
});
```

```objc
NSDictionary *attributes = @{
    @"group" : @"coworkers",
};
[TDSFollows followWithUserId:@"5b0b97cf06f4fd0abc0abe35" attributes:attributes
callback:^(BOOL succeeded, NSError * _Nullable error) {
    // 略
}];
```

</MultiLang>

注意，一个玩家 **最多关注 5000** 个玩家。

## 取关

可以通过指定 `objectId` 或好友码来取消关注之前关注的玩家。
例如，之前关注了 Tarara，当前玩家后来改变主意，不想关注 Tarara 了：

<MultiLang>

```cs
await TDSFollows.UnFollow("5b0b97cf06f4fd0abc0abe35");

await TDSFollows.UnFollowByShortCode(shortIdOfTarara);
```

```java
TDSFollows.unfollow("5b0b97cf06f4fd0abc0abe35", new Callback<Boolean>() {
    @Override
    public void onSuccess(Boolean ok) {
        toast("Unfollowed.");
    }

    @Override
    public void onFail(TDSFriendError error) {
        toast("Failed to unfollow: " + error.detailMessage);
    }
});

TDSFollows.unfollowByShortCode(shortIdOfTarara, new Callback<Boolean>() {
    // 略
});
```

```objc
[TDSFollows unfollowWithUserId:@"5b0b97cf06f4fd0abc0abe35" callback:^(BOOL succeeded, NSError * _Nullable error) {
  if (succeeded) {
    // Unfollowed.
  } else if (error) {
    // Failed to unfollow.
  }
}];

[TDSFollows unfollowWithShortCode:shortIdOfTarara, callback:^(BOOL succeeded, NSError * _Nullable error) {
    // 略
}];
```

</MultiLang>

## 查询互关列表

玩家可以查询哪些玩家和自己是「互相关注」关系。
该接口除了会返回好友列表外，还会返回游标。
指定游标和返回数量，可以实现翻页功能。
同时，支持根据在线状态获取排序后的结果（当前在线的玩家在前）：

<MultiLang>

```cs
// 首次查询
string cursor = null;
// 默认 50，最大 500
int limit = 50;
// 根据在线状态排序
SortCondition sortCondition = SortCondition.OnlineCondition
FriendResult result = await TDSFollows.QueryMutualList(cursor, limit, sortCondition);

ReadOnlyCollection<TDSFriendInfo> friendInfos = result.FriendList;
foreach (TDSFriendInfo info in friendInfos) {
    // 玩家信息
    TDSUser user = info.User;
    // 富信息数据
    Dictionary<string, string> richPresence = info.RichPresence;
    // 玩家是否在线
    bool online = info.Online;    
}

// 翻页
string cursor = result.Cursor;
FriendResult more = await TDSFollows.QueryMutualList(cursor, limit, sortCondition);
```

```java
FriendRequestConfig config = new FriendRequestConfig.Builder()
    .pageSize(50)  /* 默认 50，最大 500 */
    .sortCondition(SortCondition.getOnlineCondition()) /* 根据在线状态排序 */
    .build();
// 首次查询
TDSFollows.queryMutualList(config, null, new Callback<FriendResult>() {
    @Override
    public void onSuccess(FriendResult result) {
        List<TDSFriendInfo> friendInfoList = result.getFriendList();
        for (TDSFriendInfo info : friendInfoList) {
            // 玩家信息
            TDSUser user = info.getUser();
            // 富信息数据
            TDSRichPresence richPresence = info.getRichPresence();
            // 玩家是否在线
            boolean online = info.isOnline();
        }

        // 翻页
        String cursor = result.getCursor();
        TDSFollows.queryMutualList(config, cursor, new Callback<FriendResult>() {
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
TDSFriendQueryOption *option = [TDSFriendQueryOption new];
option.limit = 50;// 默认 50，最大 500
__block NSString *cursor; // 游标
TDSFriendQuerySortCondition *sort = [TDSFriendQuerySortCondition new];
[sort append:TDSFriendQuerySortTypeOnline error:nil];
option.sortCondition = sort;

[TDSFollows queryMutualListWithOption:option
callback:^(TDSFriendResult * _Nullable result, NSError * _Nullable error) {
    for (TDSFriendInfo *info in result.friendList)
        // 玩家信息
        TDSUser *user = info.user;
        // 富信息数据，详见后文
        NSDictionary *richPresence = info.richPresence;
        // 玩家是否在线
        BOOL online = info.online;
    }
    cursor = result.cursor;
}];

// 翻页
option.from = cursor;
[TDSFollows queryMutualListWithOption:option
callback:^(TDSFriendResult * _Nullable result, NSError * _Nullable error) {
    // 略
}];
```

</MultiLang>



## 查询关注列表

类似地，玩家可以查询自己关注了哪些玩家，接口与查询互关列表类似，也同样支持根据在线状态排序：

<MultiLang>

```cs
FriendResult result = await TDSFollows.QueryFolloweeList(cursor, limit, sortCondition);
```

```java
TDSFollows.queryFolloweeList(config, cursor, new Callback<FriendResult>() {
    // 略
}
```

```objc
[TDSFollows queryFolloweeWithOption:option
callback:^(TDSFriendResult * _Nullable result, NSError * _Nullable error) {
    // 略
}];
```

</MultiLang>

## 查询粉丝列表

玩家还可以查询哪些玩家关注了自己，也就是自己的粉丝，接口与查询互关、关注列表类似，**但不支持根据在线状态排序**：

<MultiLang>

```cs
FriendResult result = await TDSFollows.QueryFollowerList(cursor, limit, sortCondition);
```

```java
TDSFollows.queryFollowerList(config, cursor, new Callback<FriendResult>() {
    // 略
}
```

```objc
[TDSFollows queryFollowerWithOption:option
callback:^(TDSFriendResult * _Nullable result, NSError * _Nullable error) {
    // 略
}];
```


</MultiLang>

如果查询时指定了根据在线状态排序，**云端会忽略这一条件**，仍然返回未排序的查询结果。

### 落地页

使用分享链接功能需要首先部署落地页网站。
落地页网站可以部署在[云引擎](/sdk/engine/overview/)或其他支持部署纯静态网站的服务器上。
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

```cs
TDSFollows.SetShareLink("https://please-replace-with-your-domain.example.com");
```

如果落地页部署在云引擎网站上，那么地址就是 `https://你的云引擎自定义域名`。

### 生成链接

部署完落地页网站并在客户端配置好相应地址后，调用以下接口即可生成好友邀请页网址：

```cs
string inviteUrl = await TDSFollows.GenerateFriendInvitationLink();
```

### 处理链接

玩家通过邀请链接打开游戏后，开发者需要调用 SDK 提供的接口解析链接，获取玩家的 userId，然后通过 userId 关注玩家。


```cs
public class DeepLinkManager : MonoBehaviour
{
    // 略
    private async void onDeepLinkActivated(string url) {
        Dictionary<string, object> invitation = TDSFollows.ParseFriendInvitationLink(url);
        string userId = invitation["identity"];
        await TDSFollows.Follow(userId);
    }
}
```

注意：

- 目前关注模式下只有 C# SDK 支持分享链接功能，Java、Objective-C SDK 暂不支持。
- 落地页示例项目默认使用好友模式，需要设置环境变量 `INVITE_TYPE` 为 `follow` 切换为关注模式。