---
id: follow
title: 单向关注模型
sidebar_label: 单向关注
---

import MultiLang from '/src/docComponents/MultiLang';

阅读本文前请先了解[好友模块的通用接口](/sdk/friends/guide/)。

## 关注

可以通过指定[好友码](/sdk/friends/guide/#好友码)关注相应玩家：

<MultiLang>

```cs

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
            // 好友是否在线
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