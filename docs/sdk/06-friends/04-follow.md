---
id: follow
title: 关注模式
sidebar_label: 关注模式
---

import MultiLang from '/src/docComponents/MultiLang';

阅读本文前请先了解[好友模块的通用接口](/sdk/friends/guide/)。

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
TDSFriendCore.SetShareLink("https://please-replace-with-your-domain.example.com");
```

如果落地页部署在云引擎网站上，那么地址就是 `https://你的云引擎自定义域名`。

### 生成链接

部署完落地页网站并在客户端配置好相应地址后，调用以下接口即可生成好友邀请页网址：

```cs
string inviteUrl = await TDSFriendCore.GenerateFriendInvitationLink();
```

### 处理链接

玩家通过邀请链接打开游戏后，开发者需要调用 SDK 提供的接口解析链接，获取玩家的 userId，然后通过 userId 关注玩家。


```cs
public class DeepLinkManager : MonoBehaviour
{
    // 略
    private async void onDeepLinkActivated(string url) {
        Dictionary<string, object> invitation = TDSFriendCore.ParseFriendInvitationLink(url);
        string userId = invitation["identity"];
        await TDSFollows.Follow(userId);
    }
}
```

注意：

- 目前关注模式下只有 C# SDK 支持分享链接功能，Java、Objective-C SDK 暂不支持。
- 落地页示例项目默认使用好友模式，需要设置环境变量 `INVITE_TYPE` 为 `follow` 切换为关注模式。