---
title: 第三方平台好友
sidebar_label: 第三方好友
sidebar_position: 5
---

import {Conditional} from '/src/docComponents/conditional';
import MultiLang from '/src/docComponents/MultiLang';

阅读本文前请先了解[好友模块的通用接口](/sdk/friends/guide/)。

## 查询第三方平台好友

调用以下接口可以查询当前玩家在第三方平台（比如 TapTap）上的同玩好友（互相关注的用户）。
该接口除了会返回好友列表外，还会返回游标。
指定游标和返回数量，可以实现翻页功能。
同时，支持根据在线状态获取排序后的结果（当前游戏在线的玩家在前）。

返回的第三方平台好友列表中会包括玩家在第三方平台的 ID、昵称、头像。
如前所述，第三方平台的好友列表只会返回同玩好友，也就是已经使用第三方平台账号登录过该游戏的好友。
通常情况下，同玩好友也是基于内建账户系统使用第三方平台账号登录游戏，因此第三方平台的好友列表还会返回相应的 `TDSFriendInfo`。

特殊情况下，如果同玩好友通过其他方式，而非基于内建账户系统使用第三方平台账号登录游戏，那么第三方平台的好友列表仍会返回该玩家，但相应的 `TDSFriendInfo` 会是 `null`。
例如，假设游戏有两个渠道包，其中一个渠道包 a 基于内建账户系统使用 F 平台账号登录游戏，同时支持了好友功能，渠道包 b 自行实现了 F 平台账号的登录，并未支持好友功能。玩家 d 和 e 在 F 平台上互为好友，玩家 d 安装了渠道包 a 并通过它使用 F 平台账号登录游戏，玩家 e 则安装了渠道包 b 并通过它使用 F 平台账号登录游戏，那么玩家 d 调用以下接口查询第三方平台 F 的好友，返回列表中会包含 e，但 e 的 `TDSFriendInfo` 会是 `null`。

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
- <code>facebook</code> （游戏需要支持 Facebook 登录）
</Conditional>
