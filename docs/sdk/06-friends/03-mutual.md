---
id: mutual
title: 互为好友模型
sidebar_label: 互为好友
---

import MultiLang from '/src/docComponents/MultiLang';

阅读本文前请先了解[好友模块的通用接口](/sdk/friends/guide/)。

## 添加好友

可以通过指定[好友码](/sdk/friends/guide/#好友码)添加相应玩家为好友。

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
               // 富信息数据
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

## 分享链接

注意，**使用这一功能的前提是内建账户系统中设置了 `nickname`（昵称）字段**。
参见[内建账户系统文档](/sdk/authentication/guide/#设置其他用户属性)。

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