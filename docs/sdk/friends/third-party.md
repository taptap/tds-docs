---
title: 第三方平台好友
sidebar_label: 第三方好友
sidebar_position: 5
---

import {Conditional} from '/src/docComponents/conditional';
import MultiLang from '/src/docComponents/MultiLang';

阅读本文前请先了解[好友模块的通用接口](/sdk/friends/guide/)。

## 查询第三方平台好友

调用以下接口可以查询当前玩家在第三方平台（比如 TapTap）上的好友（互相关注的用户）。
该接口除了会返回好友列表外，还会返回游标。
指定游标和返回数量，可以实现翻页功能。
同时，支持根据在线状态获取排序后的结果（当前游戏在线的玩家在前）。

返回的第三方平台好友列表中会包括玩家在第三方平台的 ID、昵称、头像。
如果好友已经使用第三方平台账号登录该游戏，那么还会返回相应的 `TDSFriendInfo`，否则此项会返回 `null`。

<MultiLang>

```cs
// 首次查询
string platform = "taptap";
string cursor = null;
// 默认 50，最大 500
int limit = 50;
// 根据在线状态排序
SortCondition sortCondition = SortCondition.OnlineCondition
ThirdPartyFriendResult result = await TDSFriends.QueryThirdPartyFriendList(platform, cursor, limit, condition: sortCondition);

ReadOnlyCollection<ThirdPartyFriend> friends = result.FriendList;
foreach (ThirdPartyFriend frined in friends) {
    string thirdPartyId = friend.Id;
    string thirdPartyNickName = friend.Name;
    string thirdPartyAvatarUrl = friend.Avatar;
    TDSFriendInfo info = friend.FriendInfo;
}

// 翻页
string cursor = result.Cursor;
ThirdPartyFriendResult more = await TDSFriends.QueryThirdPartyFriendList(platform, cursor, limit, condition: sortCondition);
```

```java
ThirdPartyFriendRequestConfig config = new ThirdPartyFriendRequestConfig.Builder()
    .platform(ThirdPartyFriendRequestConfig.PLATFORM_TAPTAP)
    .pageSize(50)  /* 默认 50，最大 500 */
    .sortCondition(SortCondition.getOnlineCondition()) /* 根据在线状态排序 */
    .build();
// 首次查询
TDSFollows.queryThirdPartyMutualList(config, null, new Callback<ThirdPartyFriendResult>() {
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
        TDSFollows.queryThirdPartyMutualList(config, cursor, new Callback<ThirdPartyFriendResult>() {
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
option.limit = 50;// 默认 50，最大 500
__block NSString *cursor; // 游标

[TDSFriends queryThirdPartyFriendListWithOption:option
callback:^(TDSThirdPartyFriendResult * _Nullable result, NSError * _Nullable error) {
    for (TDSThirdPartyFriend* friend in result.friendList) {
        NSString *thirdPartyId = friend.userId;
        NSString *thirdPartyNickName = friend.userName;
        NSString *thirdPartyAvatarUrl = friend.userAvatar;
        TDSFriendInfo *info = friend.tdsFriendInfo;
    }
    cursor = result.cursor;
}];

// 翻页
option.from = cursor;
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
    TDSFriends.ThirdPartyFriendRequestCachePolicy.OnlyNetwork, sortCondition);
```

```java
ThirdPartyFriendRequestConfig config = new ThirdPartyFriendRequestConfig.Builder()
    .platform(ThirdPartyFriendRequestConfig.PLATFORM_TAPTAP)
    .sortCondition(SortCondition.getOnlineCondition())
    .cachePolicy(ThirdPartyFriendRequestConfig.CachePolicy.ONLY_NETWORK)
    .pageSize(50)
    .build();
```

```objc
option.cachePolicy = TDSThirdPartyFriendCachePolicyOnlyNetwork;
```

</MultiLang>

目前支持的第三方平台（platform）如下：

<Conditional region='cn'>
- <code>taptap</code>（需要提交工单联系我们开通）
</Conditional>

<Conditional region='global'>
- <code>taptap</code>（需要提交工单联系我们开通）
- <code>facebook</code>
</Conditional>
