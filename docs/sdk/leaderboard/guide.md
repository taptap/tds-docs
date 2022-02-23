---
title: 排行榜指南
sidebar_label: 开发指南
sidebar_position: 2
---

import MultiLang from '/src/docComponents/MultiLang';

阅读此文档前请先阅读：

- [排行榜功能介绍](/sdk/leaderboard/features/)，了解排行榜的核心概念及功能。
- [内建账户指南](/sdk/authentication/guide/)，排行榜成员类型有 user、object、entity 三种，这里的 user 指内建账户系统中的用户。另外，本文中的 `currentUser` 指内建账户系统的当前登录用户。

## SDK 安装配置

排行榜功能是数据存储 SDK 的一部分，请参考相应平台的数据存储 SDK 的配置指南：

<MultiLang>

<>

[数据存储 .NET SDK 配置](/sdk/storage/guide/setup-dotnet)

</>
<>

[数据存储 Java SDK 配置](/sdk/storage/guide/setup-java)

</>
<>

[数据存储 Objective-C SDK 配置](/sdk/storage/guide/setup-objc)

</>

</MultiLang>

## 快速入门

### 创建排行榜

创建排行榜有 3 种方式：

- 在 TapTap 开发者中心的排行榜控制台创建。
- 在**服务端等受信任的环境**下调用 REST API 创建。
- 在**服务端等受信任的环境**下调用 SDK 的管理接口创建。

比如，可以在控制台创建一个名称为 `world`，成员类型为「内建账户」，排序为 `descending`，更新策略为 `better`，重置周期为「每月」的世界排行榜。

### 提交成绩

假设玩家已登录（`currentUser`），通过如下代码即可更新成绩：

<MultiLang>

```cs
var statistic = new Dictionary<string, double>();
statistic["world"] = 20.0;
await LCLeaderboard.UpdateStatistics(currentUser, statistic);
```

```java
Map<String, Double> statistic  = new HashMap<>();
statistic.put("world", 20.0);
LCLeaderboard.updateStatistic(currentUser, statistic).subscribe(new Observer<LCStatisticResult>() {
  @Override
  public void onSubscribe(@NotNull Disposable disposable) {}

  @Override
  public void onNext(@NotNull LCStatisticResult jsonObject) {
      // scores saved
  }

  @Override
  public void onError(@NotNull Throwable throwable) {
      // handle error
  }

  @Override
  public void onComplete() {}
});
```

```objc
NSDictionary *statistic = @{
  @"world" : 20.0,
};
[LCLeaderboard updateCurrentUserStatistics:statistic, callback:^(NSArray *statistics, NSError *error) {
  if (statistics) {
    // statistics 是更新后你的最好/最新成绩
  } else if (error) {
    // 处理错误
  }
}];
```

</MultiLang>

### 获取名次

接下来我们获取排行榜中的前十，由于之前我们只提交了一个玩家（当前玩家）的成绩，所以结果中只包含一个成绩。

<MultiLang>

```cs
var leaderboard = LCLeaderboard.CreateWithoutData("world");
var rankings = await leaderboard.GetResults(limit: 10);
```

```java
LCLeaderboard leaderboard = LCLeaderboard.createWithoutData("world");
leaderboard.getResults(0, 10, null, null).subscribe(new Observer<LCLeaderboardResult>() {
    @Override
    public void onSubscribe(@NotNull Disposable disposable) {}

    @Override
    public void onNext(@NotNull LCLeaderboardResult leaderboardResult) {
      List<LCRanking> rankings = leaderboardResult.getResults();
      // process rankings
    }

    @Override
    public void onError(@NotNull Throwable throwable) {
      // handle error
    }

    @Override
    public void onComplete() {}
});
```

```objc
LCLeaderboard leaderboard = [[LCLeaderboard alloc] initWithStatisticName:@"world"];
leaderboard.limit = 10;
[leaderboard getUserResultsWithOption:nil, callback:^(NSArray *rankings, NSInteger count, NSError *error) {
  // rankings 是排行榜前十的排名信息
}];
```

</MultiLang>

看过上面这个最简单的接入排行榜的例子后，下面就详细介绍排行榜的各个接口。

## 成绩管理

### 更新用户成绩

当用户完成了一局游戏后，你可以在客户端使用 SDK 的 `updateStatistic` 方法更新该用户的成绩。
不过，**从反作弊的角度出发，我们建议在控制台勾选「只允许使用 Master Key 更新分数」，然后在服务端更新成绩。**

<MultiLang>

```cs
var statistic = new Dictionary<string, double> {
    { "score", 3458.0 },
    { "kills", 28.0 }
};
await LCLeaderboard.UpdateStatistics(currentUser, statistic);
```

```java
Map<String, Double> statistic  = new HashMap<>();
statistic.put("score", 3458.0);
statistic.put("kills", 28.0);
LCLeaderboard.updateStatistic(currentUser, statistic).subscribe(new Observer<LCStatisticResult>() {
  @Override
  public void onSubscribe(@NotNull Disposable disposable) {}

  @Override
  public void onNext(@NotNull LCStatisticResult jsonObject) {
      // saved
  }

  @Override
  public void onError(@NotNull Throwable throwable) {
      // handle error
  }

  @Override
  public void onComplete() {}
});
```

```objc
NSDictionary *statistic = @{
  @"score" : 3458.0,
  @"kills" : 28.0,
};
[LCLeaderboard updateCurrentUserStatistics:statistic, callback:^(NSArray *statistics, NSError *error) {
  if (!error) {
    // saved
  }
}];
```

</MultiLang>

更新用户成绩需要玩家登录，玩家只能更新自己的成绩。
你可以一次性更新多个排行榜的成绩，比如上面的示例中同时更新了得分（`score`）和击杀（`kills`）两个排行榜的成绩。

客户端无法更新 object 和 entity 的成绩。
如需更新其他用户、object、entity 的成绩，需要使用 [REST API](#更新成绩) 或 [SDK 提供的管理接口](#更新排行榜成员成绩)。

### 删除用户成绩

玩家也可以删除自己的成绩：

<MultiLang>

```cs
await LCLeaderboard.DeleteStatistics(currentUser, new List<string> { "world" });
```

```java
// 暂未支持
```

```objc
[LCLeaderboard deleteCurrentUserStatistics:@[@"world"], callback:^(BOOL succeeded, NSError * _Nullable error) {
  if (succeeded) {
    // 删除成功
  } else if (error) {
    // 处理错误
  }
}];
```

</MultiLang>

和更新成绩一样，玩家只能删除自己的成绩。
如需更新其他用户、object、entity 的成绩，需要使用 [REST API](#删除成绩) 或 [SDK 提供的管理接口](#删除排行榜成员成绩)。


### 查询排行榜成员成绩

**已登录用户**可以通过 `GetStatistics` 方法查询其他用户在所有排行榜中的成绩：

<MultiLang>

```cs
var otherUser = LCObject.CreateWithoutData<LCUser>("5c76107144d90400536fc88b");
var statistics = await LCLeaderboard.GetStatistics(otherUser);
foreach(var statistic in statistics) {
  Debug.Log(statistic.Name);
  Debug.Log(statistic.Value);
}
```

```java
// 查询排行榜成员成绩
LCUser otherUser = null;
try {
    otherUser = LCUser.createWithoutData(LCUser.class, "5c76107144d90400536fc88b");
} catch (LCException e) {
    e.printStackTrace();
}
LCLeaderboard.getUserStatistics(otherUser).subscribe(new Observer<LCStatisticResult>() {
    @Override
    public void onSubscribe(@NotNull Disposable disposable) {}

    @Override
    public void onNext(@NotNull LCStatisticResult lcStatisticResult) {
        List<LCStatistic> statistics = lcStatisticResult.getResults();
        for (LCStatistic statistic : statistics) {
            Log.d(TAG, statistic.getName());
            Log.d(TAG, String.valueOf(statistic.getValue()));
        }
    }

    @Override
    public void onError(@NotNull Throwable throwable) {
        // handle error
        Toast.makeText(MainActivity.this, "查询失败： " + throwable.getMessage(), Toast.LENGTH_SHORT).show();
    }

    @Override
    public void onComplete() {}
});
```

```objc
NSString *otherUserObjectId = @"5c76107144d90400536fc88b";
[LCLeaderboard getStatisticsWithUserId:otherUserObjectId, statisticNames:nil, callback:^(NSArray<LCLeaderboardStatistic *> * _Nullable *statistics, NSError _Nullable *error) {
  if (statistics) {
    for (LCLeaderboardStatistic *statistic in statistics) {
      NSLog(@"排行榜名称：%@", statistic.name);
      NSLog(@"成绩：%f", statistic.value);
    }
  } else if (error) {
        // 处理错误
  }
}];
```

</MultiLang>

更多的场景下，只关心用户在某个或某几个排行榜中的成绩。
查询时指定相应排行榜的名称即可：

<MultiLang>

```cs
var statistics = await LCLeaderboard.GetStatistics(otherUser, new List<string> { "world" });
```

```java
LCLeaderboard.getUserStatistics(otherUser, Arrays.asList("world")).subscribe(/** 略 **/);
```

```objc
[LCLeaderboard getStatisticsWithUserId:otherUserObjectId, statisticNames:@[@"world"], callback:^(NSArray<LCLeaderboardStatistic *> * _Nullable statistics, NSError * _Nullable error) {
  // 略
}];
```

</MultiLang>

类似地，可以查询 object 和 entity 的成绩。

<MultiLang>
<>

例如，假定武器排行榜是 object 排行榜：

```cs
var excalibur = LCObject.createWithoutData("Weapon", "582570f38ac247004f39c24b");
var statistics = await LCLeaderboard.GetStatistics(excalibur, new List<string> { "weapons" });
```

如果武器排行榜是 entity 排行榜：

```cs
var statistics = await LCLeaderboard.GetStatistics("excalibur", new List<string> { "weapons" });
```

</>
<>

例如，假定武器排行榜是 object 排行榜：

```java
String excaliburObjectId = "582570f38ac247004f39c24b";
LCLeaderboard.getMemberStatistics("Weapon", excaliburObjectId,
  Arrays.asList("weapons")).subscribe(/** 略 **/);
```

如果武器排行榜是 entity 排行榜：

```java
LCLeaderboard.getMemberStatistics(LCLeaderboard.MEMBER_TYPE_ENTITY, "excalibur",
  Arrays.asList("weapons")).subscribe(/** 略 **/);
```

顺便提下，之前提到的 `getUserStatistics` 方法

```java
LCLeaderboard.getUserStatistics(otherUser, Arrays.asList("weapons")).subscribe(/** 略 **/);
```

等价于：

```java
LCLeaderboard.getMemberStatistics(LCLeaderboard.LCLeaderboard.MEMBER_TYPE_USER,
  otherUser.getObjectId(),
  Arrays.asList("weapons")).subscribe(/** 略 **/);
```

</>
<>

例如，假定武器排行榜是 object 排行榜：

```objc
NSString *excaliburObjectId = @"582570f38ac247004f39c24b";
[LCLeaderboard getStatisticsWithObjectId:excaliburObjectId, statisticNames:@[@"weapons"],
  option:nil
  callback:^(NSArray *statistics, NSError *error) {
  // 略
}];
```

如果武器排行榜是 entity 排行榜：

```objc
[LCLeaderboard getStatisticsWithEntity:@"excalibur", statisticNames:@[@"weapons"], 
  callback:^(NSArray<LCLeaderboardStatistic *> * _Nullable *statistics, NSError * _Nullable error) {
  // 略
}];
```

</>
</MultiLang>

最后，还可以查询一组成员的成绩：

<MultiLang>

```cs
var otherUser = LCObject.CreateWithoutData<LCUser>("5c76107144d90400536fc88b");
var anotherUser = LCObject.CreateWithoutData<LCUser>("672a127144a90d00536f3456");
var statistics = await LCLeaderboard.GetStatistics({otherUser, anotherUser}, new List<string> { "world" });

var oneObject = LCObject.CreateWithoutData<LCObject>("abccb27133a90ddd536ffffa");
var anotherUser = LCObject.CreateWithoutData<LCObject>("672a1279345777005a2b2444");
var statistics = await LCLeaderboard.GetStatistics({oneObject, anotherObject}, new List<string> { "weapons" });

var statistics = await LCLeaderboard.GetStatistics({"Sylgr", "Leiptr"}, new List<string> { "rivers" });
```

```java
// 暂未支持
```

```objc
NSString *otherUserObjectId = @"5c76107144d90400536fc88b";
NSString *anotherUserObjectId = @"672a127144a90d00536f3456";
[leaderboard getStatisticsWithUserIds:@[otherUserObjectId, anotherUserObjectId]
  callback:^(NSArray<LCLeaderboardStatistic *> * _Nullable statistics, NSError * _Nullable error) {
// 略
}];

NSString *oneObjectId = @"abccb27133a90ddd536ffffa";
NSString *anotherObjectId = @"672a1279345777005a2b2444";
[leaderboard getStatisticsWithObjectIds:@[oneObjectId, anotherObjectId]
  option:nil
  callback:^(NSArray<LCLeaderboardStatistic *> * _Nullable statistics, NSError * _Nullable error) {
// 略
}];

[leaderboard getStatisticsWithEntities:@[@"Sylgr", "Leiptr"]
  callback:^(NSArray<LCLeaderboardStatistic *> * _Nullable statistics, NSError * _Nullable error) {
// 略 
}];
```

</MultiLang>


## 获取排行榜结果

通过 `Leaderboard#getResults` 方法可以获取排行榜结果。
最常见的使用场景是获取排名前 N 的用户成绩和获取当前登录用户附近的排名。

首先，我们构造一个排行榜实例：

<MultiLang>

<>

```cs
var leaderboard = LCLeaderboard.CreateWithoutData("world");
```

`LCLeaderboard.CreateWithoutData` 方法接受两个参数：

```cs
public static LCLeaderboard CreateWithoutData(string statisticName, string memberType = LCLeaderboard.USER_MEMBER_TYPE)
```

- `statisticName` 为排行榜名称，这里需要传入云端已经存在的排行榜名称。上例中是 `world`
- `memberType` 为排行榜成员类型，传入 `LCLeaderboard.USER_MEMBER_TYPE` 表示成员类型为用户，传入 `LCLeaderboard.ENTITY_MEMBER_TYPE` 表示成员类型为 entity，成员类型为 object 时请传入相应 Class 名称。上例中省略了这一参数，表示使用默认值，成员类型为用户。

</>
<>

```java
LCLeaderboard leaderboard = LCLeaderboard.createWithoutData("world");
```

`LCLeaderboard.createWithoutData` 方法接受两个参数：

```java
public static LCLeaderboard createWithoutData(String name, String memberType)
```

- `name` 为排行榜名称，这里需要传入云端已经存在的排行榜名称。上例中是 `world`。
- `memberType` 为排行榜成员类型，传入 `LCLeaderboard.MEMBER_TYPE_USER` 表示成员类型为用户，传入 `LCLeaderboard.MEMBER_TYPE_ENTITY` 表示成员类型为 entity，成员类型为 object 时请传入相应 Class 名称。用户是最常用的排行榜类型，因此 `createWithoutData` 还提供了一个单参数的重载方法，上例中就只传入了排行榜名称，此时成员类型为用户。

</>
<>

```objc
LCLeaderboard leaderboard = [[LCLeaderboard alloc] initWithStatisticName:@"world"];
```

</>

</MultiLang>

构造排行榜实例后，调用该实例上的相应方法即可获取排名。

### 获取指定区间的排名

获取排行榜的 Top 10：

<MultiLang>

<>

```cs
var rankings = await leaderboard.GetResults(limit: 10);
```

`GetResults` 方法可以指定以下参数限制查询范围：

|参数名|类型|说明|
|:--:|:--:|--|
|`aroundUser`|`LCUser`|获取某用户附近的排名，详见下节。|
|`aroundObject`|`LCObject`|获取某 object 附近的排名，详见下节|
|`aroundEntity`|`string`|获取某 entity 附近的排名，详见下节。|
|`limit`|`number`|限制返回的结果数量，默认 10。|
|`skip`|`number`| 指定从某个位置开始获取，与 `limit` 一起可以实现翻页，默认 0。|
|`selectKeys`|`string[]`|指定返回的 `Ranking` 中的 `user` 需要包含的属性，详见下文。|
|`includeKeys`|`string[]`|指定返回的 `Ranking` 中的 `user` 需要包含的 Pointer 属性，详见下文。|
|`includeStatistics`|`string[]`|指定返回的 `Ranking` 中需要包含的其他成绩，详见下文。|
|`version`|`number`|指定返回某个历史版本的成绩。|

返回的结果是一个排名数组（`Ranking[]`），`Ranking` 上有如下属性：

|属性|类型|说明|
|:--:|:--:|--|
|`Rank`|`int`|排名，从 0 开始|
|`User`|`LCUser`|该成绩的用户（user 排行榜）|
|`Object`|`LCObject`|该成绩的 object（object 排行榜）|
|`Entity`|`string`|该成绩的 entity（entity 排行榜）|
|`Value`|`double`|成绩|
|`IncludedStatistics`|`List<Statistic>`|该成员在其他排行榜的成绩|


</>
<>

```java
leaderboard.getResults(0, 10, null, null).subscribe(new Observer<LCLeaderboardResult>() {
    @Override
    public void onSubscribe(@NotNull Disposable disposable) {}

    @Override
    public void onNext(@NotNull LCLeaderboardResult leaderboardResult) {
      List<LCRanking> rankings = leaderboardResult.getResults(); 
    }

    @Override
    public void onError(@NotNull Throwable throwable) {
      // handle error
    }

    @Override
    public void onComplete() {}
});
```

`Leaderboard#getResults` 方法可以指定以下参数限制查询范围：

```java
Observable<LCLeaderboardResult> getResults(
  int skip, int limit,
  List<String> selectMemberKeys, List<String> includeStatistics)
```

- `skip` 指定从某个位置开始获取，与 `limit` 一起可以实现翻页，默认 0
- `limit` 限制返回的结果数量，默认 20
- `selectMemberKeys` 指定返回的 LCRanking 中排行榜成员需要包含的属性，详见下文
- `includeStatistics` 指定返回的 LCRanking 中需要包含的其他成绩，详见下文

如需获取历史版本的排行榜信息，可以在排行榜实例上设置版本号：

```java
int previousVersion = currentVersion - 1;
leaderboard.setVersion(previousVersion);
```

LCRanking 提供了以下方法供获取排名信息：

```java
// 排名，从 0 开始
int getRank()
// 该成绩的用户（user 排行榜）
LCUser getUser()
// 该成绩的 object（object 排行榜）
LCObject getObject()
// 该成绩的 entity（entity 排行榜）
String getEntityId()
// 成绩
double getStatisticValue()
// 该成员在其他排行榜的成绩
List<LCStatistic> getIncludedStatistics()
```
</>
<>

```objc
leaderboard.limit = 10;
[leaderboard getUserResultsWithOption:nil,
  callback:^(NSArray <LCLeaderboardRanking *> * _Nullable *rankings, NSInteger count, NSError * _Nullable error) {
  // rankings 是排行榜前十的排名信息
}];
```

Leaderboard 实例上可以设置如下属性限制查询范围：

```objc
/// 指定从某个位置开始获取，与 limit 一起可以实现翻页，默认 0
@property (nonatomic) NSInteger skip;
/// 限制返回的结果数量，默认 20
@property (nonatomic) NSInteger limit;
/// 指定返回的 LCLeaderboardRanking 中需要包含的其他成绩
@property (nonatomic, nullable) NSArray<NSString *> *includeStatistics;
/// 指定排行榜版本号，默认 0
@property (nonatomic) NSInteger version;
```

`getUserResultsWithOption` 的第一个参数是 `LCLeaderboardQueryOption`，可以指定返回的 `LCLeaderboardRanking` 中排行榜成员需要包含的属性，详见下文。

回调中的 `rankings` 是一个 LCLeaderboardRanking 数组。
LCLeaderboardRanking 包含如下属性：

```objc
// 排行榜名称
@property (nonatomic, readonly, nullable) NSString *statisticName;
/// 排名，从 0 开始
@property (nonatomic, readonly) NSInteger rank;
/// 成绩
@property (nonatomic, readonly) double value;
/// 该成员在其他排行榜的成绩
@property (nonatomic, readonly, nullable) NSArray<LCLeaderboardStatistic *> *includedStatistics;
/// 该成绩的用户（user 排行榜）
@property (nonatomic, readonly, nullable) LCUser *user;
/// 该成绩的 object（object 排行榜）
@property (nonatomic, readonly, nullable) LCObject *object;
/// 该成绩的 entity（entity 排行榜）
@property (nonatomic, readonly, nullable) NSString *entity;
```

上例我们调用的是 `getUserResultsWithOption` 方法，所以 `user` 属性不为空，`object`、`entity` 属性均为空。

如果排行榜是 object 排行榜或 entity 排行榜，那么相应地需要调用 `getObjectResultsWithOption` 及 `getEntityResultsWithCallback` 方法。
`getObjectResultsWithOption` 的参数和 `getUserResultsWithOption` 相同。
因为 entity 排行榜的成员为字符串，所以 `getEntityResultsWithCallback` 不支持 `LCLeaderboardQueryOption`，第一个参数就是回调，回调的参数和 `getUserResultsWithOption`、`getObjectResultsWithOption` 相同：

```objc
- (void)getEntityResultsWithCallback:(void (^)(NSArray<LCLeaderboardRanking *> * _Nullable rankings, NSInteger count, NSError * _Nullable error))callback;
```

</>

</MultiLang>

默认情况下返回的排行榜结果中的 `user` 是一个指向 `LCUser` 的 Pointer。
如果想要像下面这个例子一样，在排行榜结果中显示用户名或者其他的用户属性（对应 `_User` 表中的属性），那么需要使用 `selectKeys` 指定需要包含的属性。

|排名|Username|Score↓|
|:--:|--|:--:|
|0|Genji|3458|
|1|Lúcio|3252|
|2|D.Va|3140|

<MultiLang>

```cs
var rankings = await leaderboard.GetResults(limit: 10,
  selectKeys: new List<string> { "username" });
```

```java
List<String> selectKeys = new ArrayList<>();
selectKeys.add("username");
leaderboard.getResults(0, 10, selectKeys, null).subscribe(/* 略 */);
```

```objc
leaderboard.limit = 10;
LCLeaderboardQueryOption *option = [[LCLeaderboardQueryOption alloc] init];
option.selectKeys = @[@"username"];
[leaderboard getUserResultsWithOption:option,
  callback:^(NSArray<LCLeaderboardRanking *> * _Nullable rankings, NSInteger count, NSError * _Nullable error) {
  // 略
}];
```

</MultiLang>

如果想要在排行榜结果中包含用户的其他成绩，可以使用 `includeStatistics`。
例如，查询得分排行榜时同时返回相应用户的击杀数：

|排名|Username|Score↓|Kills
|:--:|--|:--:|:--:|
|0|Genji|3458|28|
|1|Lúcio|3252|2|
|2|D.Va|3140|31|

<MultiLang>

```cs
var rankings = await leaderboard.GetResults(limit: 10, selectKeys: new List<string> { "username" }
  includeStatistics: new List<string> { "kills" });
```

```java
List<String> selectKeys = new ArrayList<>();
selectKeys.add("username");
List<String> includeStatistics = new ArrayList<>();
includeStatistics.add("kills");
leaderboard.getResults(0, 10, selectKeys, includeStatistics).subscribe(/* 略 */);
```

```objc
leaderboard.limit = 10;
leaderboard.includeStatistics = @[@"kills"];
LCLeaderboardQueryOption *option = [[LCLeaderboardQueryOption alloc] init];
option.selectKeys = @[@"username"];
[leaderboard getUserResultsWithOption:option,
  callback:^(NSArray<LCLeaderboardRanking *> * _Nullable rankings, NSInteger count, NSError * _Nullable error) {
  // 略
}];
```

</MultiLang>

如果想要包含的属性是 Pointer 类型或文件类型，那么 `selectKeys` 只会返回 Pointer 本身。
想要一并获取 Pointer 指向的另一个 class 的数据的话，需要额外使用 `includeKeys` 指定。
例如，假设 `club` 是一个指向 `Club` 类的 Pointer：

<MultiLang>

```cs
var leaderboard = LCLeaderboard.CreateWithoutData("weapons", "Weapon");
var rankings = await leaderboard.GetResults(limit: 10,
  selectKeys: new List<string> { "name", "club" },
  includeKeys: new List<string> { "club" });
```

```java
// 暂未支持，如有此类需求可在 onNext 方法中额外发起一次查询
```

```objc
LCLeaderboard leaderboard = [[LCLeaderboard alloc] initWithStatisticName:@"weapons"];
leaderboard.limit = 10;
LCLeaderboardQueryOption *option = [[LCLeaderboardQueryOption alloc] init];
option.selectKeys = @[@"name", @"club"];
option.includeKeys = @[@"club"];
[leaderboard getUserResultsWithOption:option,
  callback:^(NSArray<LCLeaderboardRanking *> * _Nullable rankings, NSInteger count, NSError * _Nullable error) {
  // 略
}];
```

</MultiLang>

### 获取当前用户附近的排名

|排名|Username|Score↓|
|:--:|--|:--:|
|…|||
|24|Bastion|716|
|25 (You)|Widowmaker|698|
|26|Hanzo|23|
|…||||

<MultiLang>

<>

如果想达到类似上表的效果，在调用 `GetResults` 方法时额外传入当前用户即可：


```cs
var rankings = await leaderboard.GetResults(aroundUser: currentUser, limit: 3, selectKeys: new List<string> { "username" });
```

</>
<>

如果想达到类似上表的效果，可以调用 `getAroundResults` 方法：

```java
List<String> selectKeys = new ArrayList<>();
selectKeys.add("username");
leaderboard.getAroundResults(currentUser.getObjectId(), 0, 3, selectKeys, null).subscribe(/* 略 */);
```

`getAroundResults` 方法的第一个参数为排行榜成员的 ID（user 或 object 为 `objectId`、entity 为字符串），其他参数和 `getResults` 相同。

</>
<>

如果想达到类似上表的效果，可以调用 `getUserResultsAroundUser` 方法：

```objc
leaderboard.limit = 3;
[leaderboard getUserResultsAroundUser:currentUser.objectId,
  option:nil,
  callback:^(NSArray<LCLeaderboardRanking *> * _Nullable rankings, NSInteger count, NSError * _Nullable error) {
  // 略
}];
```

</>

</MultiLang>

上面的代码示例中，`limit` 的值为 3，表示获取与当前玩家相邻的前后两个玩家的排名，当前玩家会在结果的中间位置。
如仅需获取当前玩家排名，可指定 `limit` 为 1。

类似地，可以获取某个 object 或 entity 附近的排名。
例如，获取武器榜上和某件武器排名相近的武器，同时获取这些武器的名称、攻击力、等级：

<MultiLang>

```cs
var leaderboard = LCLeaderboard.CreateWithoutData("weapons", "Weapon");
var excalibur = LCObject.createWithoutData("Weapon", "582570f38ac247004f39c24b");
var rankings = await leaderboard.GetResults(aroundObject: excalibur, limit: 3, selectKeys: new List<string> { "name", "attack", "level" });
```

```java
LCLeaderboard leaderboard = LCLeaderboard.createWithoutData("world", "Weapon");
String excaliburObjectId = "582570f38ac247004f39c24b";
List<String> selectKeys = new ArrayList<>();
selectKeys.add("name");
selectKeys.add("attack");
selectKeys.add("level");
leaderboard.getAroundResults(excaliburObjectId, 0, 3, selectKeys, null).subscribe(/* 略 */);
```

```objc
LCLeaderboard leaderboard = [[LCLeaderboard alloc] initWithStatisticName:@"weapons"];
leaderboard.limit = 3;
LCLeaderboardQueryOption *option = [[LCLeaderboardQueryOption alloc] init];
option.selectKeys = @[@"name", @"attack", @"level"];
NSString *excaliburObjectId = @"582570f38ac247004f39c24b"; 
[leaderboard getObjectResultsAroundObject:excaliburObjectId,
  option:option,
  callback:^(NSArray<LCLeaderboardRanking *> * _Nullable rankings, NSInteger count, NSError * _Nullable error) {
  // 略
}];
```

</MultiLang>

上面的例子中假定武器排行榜是通过 object 排行榜实现的，存储武器信息的 Class 为 `Weapon`。
如果武器排行榜是通过 entity 排行榜实现的，且只需获取武器的名称，那么相应的代码为：

<MultiLang>

```cs
var leaderboard = LCLeaderboard.CreateWithoutData("weapons", LCLeaderboard.ENTITY_MEMBER_TYPE);
var rankings = await leaderboard.GetResults(aroundEntity: "excalibur", limit: 3);
```

```java
LCLeaderboard leaderboard = LCLeaderboard.createWithoutData("world", LCLeaderboard.ENTITY_MEMBER_TYPE);
leaderboard.getAroundResults("excalibur", 0, 3, null, null).subscribe(/* 略 */);
```

```objc
LCLeaderboard leaderboard = [[LCLeaderboard alloc] initWithStatisticName:@"weapons"];
leaderboard.limit = 3;
[leaderboard getEntityResultsAroundEntity:@"excalibur",
  callback:^(NSArray^(NSArray<LCLeaderboardRanking *> * _Nullable rankings, NSInteger count, NSError * _Nullable error) {
  // 略
}];
```

</MultiLang>

## 控制台

在排行榜控制台，你可以：

- 新建、重置、编辑、删除排行榜
- 查看排行榜当前版本的数据、删除成绩、下载排行榜的历史数据归档文件
- 设置是否允许客户端查询前一版本，是否只允许使用 Master Key 更新分数。

## SDK 管理接口

除了通过控制台管理排行榜外，C# SDK 和 Java SDK 也提供了管理接口，可以在**服务端等受信任的环境**下使用。
另外，也可以直接调用 REST API 提供的管理接口。
下面我们先介绍 SDK 提供的管理接口。

请注意，调用管理接口 API 需要在 SDK 初始化时使用 masterKey，因此**只能在服务端等可信任的环境中调用，不得在客户端使用。**

<MultiLang>

```cs
LCApplication.Initialize({{appid}}, {{appkey}}, "https://xxx.example.com", {{masterkey}});
LCApplication.UseMasterKey = true;
```

```java
LeanCloud.setMasterKey({{masterkey}});
```

```objc
// 不支持
```

</MultiLang>

### 创建排行榜

<MultiLang>

<>

```cs
var leaderboard = await LCLeaderboard.CreateLeaderboard("time", order: LCLeaderboardOrder.ASCENDING);
```

可以指定的参数类型和默认值如下：

```cs
public static async Task<LCLeaderboard> CreateLeaderboard(string statisticName,
    LCLeaderboardOrder order = LCLeaderboardOrder.Descending,
    LCLeaderboardUpdateStrategy updateStrategy = LCLeaderboardUpdateStrategy.Better,
    LCLeaderboardVersionChangeInterval versionChangeInterval = LCLeaderboardVersionChangeInterval.Week,
    string memberType = LCLeaderboard.USER_MEMBER_TYPE)
```

- `statisticName` 所排名的成绩名字。
- `order` 排序，可以传入 `LCLeaderboardOrder.Descending` 或 `LCLeaderboardOrder.Ascending`。
- `updateStrategy` 成绩更新策略，可以传入 `LCLeaderboardUpdateStrategy.Better`、`LCLeaderboardUpdateStrategy.Last`、`LCLeaderboardUpdateStrategy.Sum`。
- `versionChangeInterval` 自动重置周期，可以传入 `LCLeaderboardVersionChangeInterval.Never`、`LCLeaderboardVersionChangeInterval.Day`、`LCLeaderboardVersionChangeInterval.Week`、`LCLeaderboardVersionChangeInterval.Month`。
- `memberType` 成员类型，传入 `LCLeaderboard.USER_MEMBER_TYPE` 表示成员类型为用户，传入 `LCLeaderboard.ENTITY_MEMBER_TYPE` 表示成员类型为 entity，成员类型为 object 时请传入相应 Class 名称。


</>
<>

```java
LCLeaderboard.createWithMemberType(LCLeaderboard.MEMBER_TYPE_USER, "time",
  LCLeaderboard.LCLeaderboardOrder.Ascending,
  LCLeaderboard.LCLeaderboardUpdateStrategy.Last,
  LCLeaderboard.LCLeaderboardVersionChangeInterval.Day).subscribe(new Observer<LCLeaderboard>() {
    @Override
    public void onSubscribe(@NotNull Disposable disposable) {}

    @Override
    public void onNext(@NotNull final LCLeaderboard lcLeaderboard) {
      System.out.println("leaderboard created");
    }

    @Override
    public void onError(@NotNull Throwable throwable) {
      System.out.println("failed to create leaderboard. Cause " + throwable);            
    }

    @Override
    public void onComplete() {}
});            
```

你可以指定以下参数：

```java
public static Observable<LCLeaderboard> createWithMemberType(String memberType, String name,
  LCLeaderboardOrder order,
  LCLeaderboardUpdateStrategy updateStrategy,
  LCLeaderboardVersionChangeInterval versionChangeInterval)
```

- `memberType` 成员类型，传入 `LCLeaderboard.MEMBER_TYPE_USER` 表示成员类型为用户，传入 `LCLeaderboard.MEMBER_TYPE_ENTITY` 表示成员类型为 entity，成员类型为 object 时请传入相应 Class 名称。
- `name` 所排名的成绩名字。
- `order` 排序，可以传入 `LCLeaderboard.LCLeaderboardOrder.Descending` （默认值）或 `LCLeaderboard.LCLeaderboardOrder.Ascending`。
- `updateStrategy` 成绩更新策略，可以传入 `LCLeaderboard.LCLeaderboardUpdateStrategy.Better`（默认值）、`LCLeaderboard.LCLeaderboardUpdateStrategy.Last`、`LCLeaderboard.LCLeaderboardUpdateStrategy.Sum`。
- `versionChangeInterval` 自动重置周期，可以传入 `LCLeaderboard.LCLeaderboardVersionChangeInterval.Never`、`LCLeaderboard.LCLeaderboardVersionChangeInterval.Day`、`LCLeaderboard.LCLeaderboardVersionChangeInterval.Week`（默认值）、`LCLeaderboard.LCLeaderboardVersionChangeInterval.Month`。

默认值指相应参数传入 `null` 时对应的取值。

</>

<>

不支持

</>

</MultiLang>



### 手动重置排行榜

<MultiLang>

```cs
var leaderboard = LCLeaderboard.CreateWithoutData("score");
await leaderboard.Reset();
```

```java
LCLeaderboard leaderboard = LCLeaderboard.createWithoutData("score");
leaderboard.reset().subscribe(new Observer<Boolean>() {
    @Override
    public void onSubscribe(@NotNull Disposable disposable) {
    }

    @Override
    public void onNext(@NotNull Boolean aBoolean) {
      if (aBoolean) { // aBoolean should always be true
        System.out.println("leaderboard reset");
      }
    }

    @override
    public void onerror(@notnull throwable throwable) {
        system.out.println("Failed to reset leaderboard. Cause " + throwable);
    }

    @override
    public void oncomplete() {}
});
```

```objc
// 不支持
```

</MultiLang>

### 获取排行榜属性

通过以下接口可以获取当前排行榜的属性，例如：重置周期、版本号、更新策略等。

<MultiLang>

```cs
var leaderboardData = await LCLeaderboard.GetLeaderboard("world");
```

```java
LCLeaderboard leaderboard = LCLeaderboard.fetchByName("world").blockingFirst();
```

```objc
// 不支持
```

</MultiLang>

### 修改排行榜属性

排行榜创建后，仅可修改自动重置周期和成绩更新策略，其他属性无法修改。

<MultiLang>

```cs
var leaderboard = LCLeaderboard.CreateWithoutData("equip");
await leaderboard.UpdateVersionChangeInterval(LCLeaderboardVersionChangeInterval.Week);
await leaderboard.UpdateUpdateStrategy(LCLeaderboardUpdateStrategy.Last);
```

```java
LCLeaderboard leaderboard = LCLeaderboard.createWithoutData("equip");
leaderboard.updateVersionChangeInterval(LCLeaderboard.LCLeaderboardVersionChangeInterval.Week)
  .subscribe(new Observer<Boolean>() {
    @Override
    public void onSubscribe(@NotNull Disposable disposable) {
    }

    @Override
    public void onNext(@NotNull Boolean aBoolean) {
      if (aBoolean) { // aBoolean should always be true
        System.out.println("version update interval updated");
      }
    }

    @override
    public void onerror(@notnull throwable throwable) {
        system.out.println("Failed to change version update interval. Cause: " + throwable);
    }

    @override
    public void oncomplete() {}
});
leaderboard.updateUpdateStrategy(LCLeaderboard.LCLeaderboardUpdateStrategy.Last)
  .subscribe(new Observer<Boolean>() {
    @Override
    public void onSubscribe(@NotNull Disposable disposable) {
    }

    @Override
    public void onNext(@NotNull Boolean aBoolean) {
      if (aBoolean) { // aBoolean should always be true
        System.out.println("update strategy updated");
      }
    }

    @override
    public void onerror(@notnull throwable throwable) {
        system.out.println("Failed to change update strategy. Cause: " + throwable);
    }

    @override
    public void oncomplete() {}
});
```

```objc
// 不支持
```

</MultiLang>

### 删除排行榜

<MultiLang>

```cs
var leaderboard = lcleaderboard.createwithoutdata("equip");
await leaderboard.destroy();
```

```java
LCLeaderboard leaderboard = LCLeaderboard.createWithoutData("equip");
leaderboard.destroy().subscribe(new Observer<Boolean>() {
    @Override
    public void onSubscribe(@NotNull Disposable disposable) {
    }

    @Override
    public void onNext(@NotNull Boolean aBoolean) {
      if (aBoolean) { // aBoolean should always be true
        System.out.println("leaderboard deleted");
      }
    }

    @override
    public void onerror(@notnull throwable throwable) {
        system.out.println("Failed to delete leaderboard. Cause " + throwable);
    }

    @override
    public void oncomplete() {}
});
```

```objc
// 不支持
```

</MultiLang>

**删除排行榜会删除该排行榜的所有数据，包括当前数据及所有历史版本归档。**

### 更新排行榜成员成绩

有些情况下，你会想要绕过排行榜的更新策略强制更新用户的成绩，你可以使用 `overwrite` 参数实现这一需求：

<MultiLang>

```cs
var statistic = new Dictionary<string, double> {
    { "score", 0.0 }
};
await LCLeaderboard.UpdateStatistics(user, statistic, overwrite: true);
```

```java
Map<String, Double> statistic  = new HashMap<>();
statistic.put("world", 0.0);
LCLeaderboard.updateStatistic(currentUser, statistic, true).subscribe(/** 略 **/);
```

```objc
// 不支持
```

</MultiLang>

object 和 entity 排行榜只支持在服务端使用 Master Key 更新，但仍会遵循排行榜的更新策略：

<MultiLang>

```cs
var excalibur = LCObject.createWithoutData("Weapon", "582570f38ac247004f39c24b");
await LCLeaderboard.UpdateStatistics(excalibur, statistic);
```

```java
// 暂不支持，如有需求可以调用 REST API 接口更新
```

```objc
不支持
```

</MultiLang>

如果需要强制更新，同样需要指定 `overwrite` 为真：

<MultiLang>

```cs
await LCLeaderboard.UpdateStatistics("Vimur", statistic, overwrite: true);
```

```java
// 暂不支持，如有需求可以调用 REST API 接口更新
```

```objc
// 不支持
```

</MultiLang>

### 删除排行榜成员成绩

在服务端使用 Master Key 可以删除任意用户、object、entity 的成绩：

<MultiLang>

```cs
var otherUser = LCObject.CreateWithoutData<LCUser>("5c76107144d90400536fc88b");
await LCLeaderboard.DeleteStatistics(otherUser, new List<string> { "world" });

var excalibur = LCObject.createWithoutData("Weapon", "582570f38ac247004f39c24b");
await LCLeaderboard.DeleteStatistics(excalibur, new List<string> { "weapons" });

await LCLeaderboard.DeleteStatistics("Vimur", new List<string> { "rivers" });
```

```java
// 暂不支持，如有需求可以调用 REST API 接口更新
```

```objc
// 不支持
```

</MultiLang>

## REST API

下面我们介绍排行榜相关的 REST API 接口。
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

### 管理排行榜

#### 创建排行榜

```sh
curl -X POST \
  -H "X-LC-Id: {{appid}}" \
  -H "X-LC-Key: {{masterkey}},master" \
  -H "Content-Type: application/json" \
  -d '{"statisticName": "world", "memberType": "_User", "order": "descending", "updateStrategy": "better", "versionChangeInterval": "month"}' \
  https://{{host}}/1.1/leaderboard/leaderboards
```

| 参数        | 约束   | 说明                                   |
| --------- | ---- | ---------------------------------------- |
| `statisticName`     | 必须   | 排行榜的名称，创建后不可修改。 |
| `memberType`      | 必须   | 排行榜的成员类型，创建后不可修改。可填写 `_Entity`、`_User` 及其他已有的 class 名称。|
| `order` | 可选   | 排行榜的排序策略，创建后不可修改。可选项有 `ascending` 或 `descending`，默认为 `descending`。 |
| `updateStrategy` | 可选   |  可选项有 `better`、`last`、`sum`，默认为 `better`。|
| `versionChangeInterval` | 可选   |  可选项有 `day`、`week`、`month`、`never`，默认为 `week`。 |

返回的主体是一个 JSON 对象，包含创建排行榜时传入的所有参数，同时包括以下信息：

* `version` 为排行榜当前版本号。
* `expiredAt` 为下次过期（重置）时间。
* `activatedAt` 当前版本的开始时间。

```json
{
  "objectId": "5b62c15a9f54540062427acc",
  "statisticName": "world",
  "memberType": "_User",
  "versionChangeInterval": "month",
  "order": "descending",
  "updateStrategy": "better",
  "version": 0,
  "createdAt": "2018-08-02T08:31:22.294Z",
  "updatedAt": "2018-08-02T08:31:22.294Z",
  "expiredAt": {
    "__type": "Date",
    "iso": "2018-08-31T16:00:00.000Z"
  },
  "activatedAt": {
    "__type": "Date",
    "iso": "2018-08-02T08:31:22.290Z"
  }
}
```

#### 获取排行榜属性

通过这个接口来查看当前排行榜的属性，例如更新策略、当前版本号等。

```sh
curl -X GET \
  -H "X-LC-Id: {{appid}}" \
  -H "X-LC-Key: {{masterkey}},master" \
  https://{{host}}/1.1/leaderboard/leaderboards/<statisticName>
```

返回的 JSON 对象包含该排行榜的所有信息：

```json
{
  "objectId": "5b0b97cf06f4fd0abc0abe35",
  "statisticName": "world",
  "memberType": "_User",
  "order": "descending",
  "updateStrategy": "better",
  "version": 5,
  "versionChangeInterval": "day",
  "expiredAt": {"__type": "Date", "iso": "2018-05-02T16:00:00.000Z"},
  "activatedAt": {"__type": "Date", "iso": "2018-05-01T16:00:00.000Z"},
  "createdAt": "2018-04-28T05:46:58.579Z",
  "updatedAt": "2018-05-01T01:00:00.000Z"
}
```

#### 修改排行榜属性

这个接口可以用来修改排行榜的 `updateStrategy` 和 `versionChangeInterval` 属性，其他属性不可修改。可以只更新某一个属性，例如只修改 versionChangeInterval：

```sh
curl -X PUT \
  -H "X-LC-Id: {{appid}}" \
  -H "X-LC-Key: {{masterkey}},master" \
  -H "Content-Type: application/json" \
  -d '{"versionChangeInterval": "day"}' \
  https://{{host}}/1.1/leaderboard/leaderboards/<statisticName>
```
返回的 JSON 对象包含更新的属性信息及 `updatedAt` 字段。

```json
{
  "objectId": "5b0b97cf06f4fd0abc0abe35",
  "versionChangeInterval": "day",
  "updatedAt": "2018-05-01T08:01:00.000Z"
}
```

#### 重置排行榜

无论排行榜的重置策略是什么，你都可以通过这个方法重置排行榜。重置时当前版本的数据清空，同时会归档到 csv 文件以供下载，排行榜的 `version` 会自动加一。

```sh
curl -X PUT \
  -H "X-LC-Id: {{appid}}" \
  -H "X-LC-Key: {{masterkey}},master" \
  https://{{host}}/1.1/leaderboard/leaderboards/<statisticName>/incrementVersion
```

返回的 JSON 会显示重置后的当前版本号，下一次过期时间 `expiredAt`，当前版本的开始时间 `activatedAt`：

```json
{
  "objectId": "5b0b97cf06f4fd0abc0abe35",
  "version": 7,
  "expiredAt": {"__type": "Date", "iso": "2018-06-03T16:00:00.000Z"},
  "activatedAt": {"__type": "Date", "iso": "2018-05-28T06:02:56.169Z"},
  "updatedAt": "2018-05-28T06:02:56.185Z"
}
```

#### 获取历史数据归档文件

因为每个排行榜最多保存 60 个归档文件，我们建议定期使用这个接口获取归档文件后另行备份保存。

```sh
curl -X GET \
  -H "X-LC-Id: {{appid}}" \
  -H "X-LC-Key: {{masterkey}},master" \
  -G \
  --data-urlencode 'limit=10' \
  https://{{host}}/1.1/leaderboard/leaderboards/<statisticName>/archives
```

返回的对象会按照 `createdAt` 降序排列。其中 `file_key` 是文件的名称，`url` 是文件的下载地址，`status` 包含以下状态：

* `scheduled`：进入归档任务队列，还未归档，这个状态通常极短。
* `inProgress`：正在归档中。
* `failed`：归档失败，出现这种情况请提交工单联系技术支持。
* `completed`：归档已完成。

```json
{
  "results": [
    {
      "objectId": "5b0b9da506f4fd0abc0abe6e",
      "statisticName": "wins",
      "version": 9,
      "status": "completed",
      "url": "https://lc-paas-files.cn-n1.lcfile.com/yK5s6YJztAwEYiWs.csv",
      "file_key": "yK5s6YJztAwEYiWs.csv",
      "activatedAt": {"__type": "Date", "iso": "2018-05-28T06:11:49.572Z"},
      "deactivatedAt": {"__type": "Date", "iso": "2018-05-30T06:11:49.951Z"},
      "createdAt": "2018-05-01T16:00.00.000Z",
      "updatedAt": "2018-05-28T06:11:50.129Z",
    }
  ]
}
```

#### 删除排行榜

**这个接口将删除排行榜的所有数据**，包括当前版本的数据及所有归档文件，删除后无法恢复，请谨慎操作。

删除时只需要指定排行榜的名称 statisticName。

```sh
curl -X DELETE \
  -H "X-LC-Id: {{appid}}" \
  -H "X-LC-Key: {{masterkey}},master" \
  https://{{host}}/1.1/leaderboard/leaderboards/<statisticName>
```

删除成功时返回空 JSON 对象：

```json
{}
```

### 管理成绩

#### 更新成绩

使用 Master Key 可以更新任意成绩，但更新成绩时仍然遵循排行榜的 `updateStrategy` 属性。

更新用户成绩时需指定相应用户的 `objectId`：

```sh
curl -X POST \
  -H "X-LC-Id: {{appid}}" \
  -H "X-LC-Key: {{masterkey}},master" \
  -H "Content-Type: application/json" \
  -d '[{"statisticName": "wins", "statisticValue": 5}, {"statisticName": "world", "statisticValue": 91}]' \
  https://{{host}}/1.1/leaderboard/users/<objectId>/statistics
```

返回的数据是服务端当前使用的分数：

```sh
{
  "results": [
    {
      "statisticName": "wins",
      "version": 0,
      "statisticValue": 5
    },
    {
      "statisticName": "world",
      "version": 2,
      "statisticValue": 91
    }
  ]
}
```

类似地，更新 object 成绩时需指定相应 object 的 `objectId`：

```sh
curl -X POST \
  -H "X-LC-Id: {{appid}}" \
  -H "X-LC-Key: {{masterkey}},master" \
  -H "Content-Type: application/json" \
  -d '[{"statisticName": "wins", "statisticValue": 5}, {"statisticName": "weapons","statisticValue": 91}]' \
  https://{{host}}/1.1/leaderboard/objects/<objectId>/statistics
```

更新 entity 成绩时则需指定相应的字符串：

```sh
curl -X POST \
  -H "X-LC-Id: {{appid}}" \
  -H "X-LC-Key: {{masterkey}},master" \
  -H "Content-Type: application/json" \
  -d '[{"statisticName": "wins", "statisticValue": 5}, {"statisticName": "cities","statisticValue": 91}]' \
  https://{{host}}/1.1/leaderboard/entities/<entityString>/statistics
```

当前用户可以更新自己的成绩，这个不属于管理接口，不需要 `Master Key`，但需要传入当前用户的 `sessionToken`（客户端 SDK 更新当前用户的成绩封装了这一接口）：

```sh
curl -X POST \
  -H "X-LC-Id: {{appid}}" \
  -H "X-LC-Key: {{appkey}}" \
  -H "X-LC-Session: <sessionToken>" \
  -H "Content-Type: application/json" \
  -d '[{"statisticName": "wins", "statisticValue": 5}, {"statisticName": "world", "statisticValue": 91}]' \
  https://{{host}}/1.1/leaderboard/users/self/statistics
```


#### 强制更新成绩

附加 `overwrite=1` 会无视更新策略 better 及 sum，强制使用 last 策略更新用户的成绩。
比如，发现某个用户存在作弊行为时，可以使用这个接口强制更新用户的成绩。

```sh
curl -X POST \
  -H "X-LC-Id: {{appid}}" \
  -H "X-LC-Key: {{masterkey}},master" \
  -H "Content-Type: application/json" \
  -d '[{"statisticName": "wins", "statisticValue": 10}]' \
  https://{{host}}/1.1/leaderboard/users/<uid>/statistics?overwrite=1
```

返回的数据是当前服务端使用的分数：

```json
{"results":[{"statisticName":"wins","version":0,"statisticValue":10}]}
```

类似地，附加 `overwrite=1` 可以强制更新 object 成绩和 entity 成绩。

#### 删除成绩

如果不希望某个用户出现在榜单中，可以使用该接口删除用户的成绩以及在榜单中的排名（仅删除当前排行榜的成绩，不能删除历史版本的成绩）。

```sh
curl -X DELETE \
  -H "X-LC-Id: {{appid}}" \
  -H "X-LC-Key: {{masterkey}},master" \
  -H "Content-Type: application/json" \
  https://{{host}}/1.1/leaderboard/users/<uid>/statistics?statistics=wins,world
```

成功删除时返回空对象：

```
{}
```

类似地，可以删除 object 的成绩：

```sh
curl -X DELETE \
  -H "X-LC-Id: {{appid}}" \
  -H "X-LC-Key: {{masterkey}},master" \
  --data-urlencode 'statistics=weapons,equipments' \
  https://{{host}}/1.1/leaderboard/objects/<objectId>/statistics
```

以及 entity 的成绩：

```sh
curl -X DELETE \
  -H "X-LC-Id: {{appid}}" \
  -H "X-LC-Key: {{masterkey}},master" \
  --data-urlencode 'statistics=cities' \
  https://{{host}}/1.1/leaderboard/entities/<entityString>/statistics
```

同样，当前用户可以删除自己的成绩，这个不属于管理接口，不需要 `Master Key`，但需要传入当前用户的 `sessionToken`（客户端 SDK 删除当前用户的成绩封装了这一接口）：

```sh
curl -X DELETE \
  -H "X-LC-Id: {{appid}}" \
  -H "X-LC-Key: {{appkey}}" \
  -H "X-LC-Session: <sessionToken>" \
  -H "Content-Type: application/json" \
  https://{{host}}/1.1/leaderboard/users/self/statistics?statistics=wins,world
```

### 查询成绩

通过 REST API 可以查询成绩，这些接口不属于管理接口，不需要 `Master Key`：

#### 查询某个成绩

指定用户的 objectId 即可获取该用户的成绩。
你可以在请求 url 中指定多个 `statistics` 来获得多个排行榜中的成绩，排行榜名称用英文逗号 `,` 隔开，如果不指定将会返回该用户参与的所有排行榜中的成绩。

```sh
curl -X GET \
  -H "X-LC-Id: {{appid}}" \
  -H "X-LC-Key: {{appkey}}" \
  --data-urlencode 'statistics=wins,world' \
  https://{{host}}/1.1/leaderboard/users/<objectId>/statistics
```

返回结果：

```json
{
  "results": [
    {
      "statisticName": "wins",
      "statisticValue": 5,
      "version": 0,
      "user": {
        "__type": "Pointer",
        "className": "_User",
        "objectId": "60d950629be318a249000001"
      }
    },
    {
      "statisticName": "world",
      "statisticValue": 91,
      "version": 0,
      "user": {...}
    }
  ]
}
```

类似地，指定 object 的 objectId 可以查询该 object 参与的排行榜的成绩：

```sh
curl -X GET \
  -H "X-LC-Id: {{appid}}" \
  -H "X-LC-Key: {{appkey}}" \
  --data-urlencode 'statistics=wins,world' \
  https://{{host}}/1.1/leaderboard/objects/<objectId>/statistics
```

返回示例：

```json
{
  "results": [
    {
      "statisticName": "wins",
      "statisticValue": 5,
      "version": 0,
      "object": {
        "__type": "Pointer",
        "className": "Weapon",
        "objectId": "60d1af149be3180684000002"
      }
    },
    {
      "statisticName": "world",
      "statisticValue": 91,
      "version": 0,
      "object": {
        "__type": "Pointer",
        "className": "Weapon",
        "objectId": "60d1af149be3180684000002"
      }
    }
  ]
}
```



获取某个 entity 成绩时则需指定该 entity 的字符串：

```sh
curl -X GET \
  -H "X-LC-Id: {{appid}}" \
  -H "X-LC-Key: {{appkey}}" \
  --data-urlencode 'statistics=wins,world' \
  https://{{host}}/1.1/leaderboard/entities/<entityString>/statistics
```

返回示例：

```json
{
  "results": [
    {
      "statisticName": "wins",
      "statisticValue": 5,
      "version": 0,
      "entity": "1a2b3c4d"
    },
    {
      "statisticName": "world",
      "statisticValue": 91,
      "version": 0,
      "entity": "1a2b3c4d"
    }
  ]
}
```

#### 查询一组成绩

通过这个接口可以一次性拉取多个 user 的成绩，最多不超过 200 个。在请求中，需要在 body 中传入 user 的 `objectId` 数组。

```sh
curl -X POST \
  -H "X-LC-Id: {{appid}}" \
  -H "X-LC-Key: {{appkey}}" \
  -H "Content-Type: application/json" \
  -d '["60d950629be318a249000001", "60d950629be318a249000000"]'
  https://{{host}}/1.1/leaderboard/users/statistics/<statisticName>
```

查询一组成绩的的返回结果与[查询单个成绩](#查询某个成绩)类似：

```json
{
  "results": [
    {
      "statisticName": "wins",
      "statisticValue": 1,
      "version": 0,
      "user": {
        "__type": "Pointer",
        "className": "_User",
        "objectId": "60d950629be318a249000001"
      }
    },
    {
      "statisticName": "wins",
      "statisticValue": 2,
      "version": 0,
      "user": {
        "__type": "Pointer",
        "className": "_User",
        "objectId": "60d950629be318a249000000"
      }
    }
  ]
}
```

类似地，传入 object 的 `objectId` 数组可以一次性获取多个 object 的成绩（最多不超过 200 个）：

```sh
curl -X POST \
  -H "X-LC-Id: {{appid}}" \
  -H "X-LC-Key: {{appkey}}" \
  -H "Content-Type: application/json" \
  -d '["60d950629be318a249000001", "60d950629be318a249000000"]'
  https://{{host}}/1.1/leaderboard/objects/statistics/<statisticName>
```

传入 entity 的字符串数组则可以一次性获取多个 entity 的成绩（最多不超过 200 个）：

```sh
curl -X POST \
  -H "X-LC-Id: {{appid}}" \
  -H "X-LC-Key: {{appkey}}" \
  -H "Content-Type: application/json" \
  -d '["Vimur", "Fimbulthul"]'
  https://{{host}}/1.1/leaderboard/entities/statistics/<statisticName>
```

### 查询排行榜

#### 获取区间排名

你可以使用这个接口来获取 Top 排名。

```sh
curl -X GET \
  -H "X-LC-Id: {{appid}}" \
  -H "X-LC-Key: {{appkey}}" \
  -G \
  --data-urlencode 'startPosition=0' \
  --data-urlencode 'maxResultsCount=20' \
  --data-urlencode 'selectKeys=username,club' \
  --data-urlencode 'includeKeys=club' \
  --data-urlencode 'includeStatistics=wins' \
  https://{{host}}/1.1/leaderboard/leaderboards/user/<statisticName>/ranks
```

| 参数        | 约束   | 说明                                   |
| --------- | ---- | ---------------------------------------- |
| startPosition  | 可选  | 排行头部起始位置，默认为 0。 |
| maxResultsCount | 可选   | 最大返回数量，默认为 20。 |
| selectKeys | 可选   |  返回用户在 `_User` 表的其他字段，支持多个字段，用英文逗号 `,` 隔开。出于安全性考虑，在非 masterKey 请求下不返回敏感字段 `email` 及 `mobilePhoneNumber`。|
| includeKeys | 可选   |  返回用户在 `_User` 表的 pointer 字段的详细信息，支持多个字段，用英文逗号 `,` 隔开。为确保安全，在非 masterKey 请求下不返回敏感字段 `email` 及 `mobilePhoneNumber`。|
| includeStatistics | 可选   |  返回该用户在其他排行榜中的成绩，如果传入了不存在的排行榜名称，将会返回错误。 |
| version | 可选   | 返回指定 version 的排行结果，默认返回当前版本的数据。|
| count  | 可选  | 值为 1 时返回该排行榜中的成员数量，默认为 0。 |

返回 JSON 对象：

```json
{
  "results": [
    {
      "statisticName": "world",
      "statisticValue": 91,
      "rank": 0,
      "user": {
        "__type": "Pointer",
        "className": "_User",
        "updatedAt": "2021-07-21T03:08:10.487Z",
        "username": "zw1stza3fy701rvgxqwiikex7",
        "createdAt": "2020-09-04T04:23:04.795Z",
        "club": {
          "objectId": "60f78f98d9f1465d3b1da12d",
          "name": "board games",
          "updatedAt": "2021-07-21T03:08:08.692Z",
          "createdAt": "2021-07-21T03:08:08.692Z",
        },
        "objectId": "5f51c1287628f2468aa696e6"
      }
    },
    {...}
  ],
  "count": 500
}
```

查询 object 排行榜的 Top 排名的接口与之类似，只是将 `user` 替换为 `object`：

```sh
curl -X GET \
  -H "X-LC-Id: {{appid}}" \
  -H "X-LC-Key: {{appkey}}" \
  -G \
  --data-urlencode 'startPosition=0' \
  --data-urlencode 'maxResultsCount=2' \
  --data-urlencode 'selectKeys=name,image' \
  --data-urlencode 'includeKeys=image' \
  --data-urlencode 'count=1' \
  https://{{host}}/1.1/leaderboard/leaderboards/object/<statisticName>/ranks
```

返回结果：

```json
{
  "results": [
    {
      "statisticName": "wins",
      "statisticValue": 4,
      "rank": 0,
      "object": {
        "__type": "Pointer",
        "className": "Weapon",
        "name": "sword",
        "image": {
          "bucket": "test_files",
          "provider": "leancloud",
          "name": "sword.jpg",
          "url": "https://example.com/sword.jpg",
          "objectId": "60d2f3a39be3183377000002",
          "__type": "File"
        },
        "objectId": "60d2f22f9be318328b000007"
      }
    },
    {
      "statisticName": "wins",
      "statisticValue": 3,
      "rank": 1,
      "object": {...}
    }
  ],
  "count": 500
}
```

同理，URL 中的 `user` 替换为 `entity` 可查询 entity 排行榜的 Top 排名：

```sh
curl -X GET \
  -H "X-LC-Id: {{appid}}" \
  -H "X-LC-Key: {{appkey}}" \
  -G \
  --data-urlencode 'startPosition=0' \
  --data-urlencode 'maxResultsCount=2' \
  --data-urlencode 'count=1' \
  https://{{host}}/1.1/leaderboard/leaderboards/entity/<statisticName>/ranks
```

返回结果：

```json
{
  "results": [
    {
      "statisticName": "wins",
      "statisticValue": 4,
      "rank": 0,
      "entity": "1234567890"
    },
    {
      "statisticName": "wins",
      "statisticValue": 3,
      "rank": 1,
      "entity": "2345678901"
    }
  ],
  "count": 500
}
```

#### 获取附近排名

在 URL 末端附加相应的 objectId 可获取某用户或 object 附近的排名。


获取某用户附近的排名：

```sh
curl -X GET \
  -H "X-LC-Id: {{appid}}" \
  -H "X-LC-Key: {{appkey}}" \
  -G \
  --data-urlencode 'startPosition=0' \
  --data-urlencode 'maxResultsCount=20' \
  --data-urlencode 'selectKeys=username,club' \
  --data-urlencode 'includeKeys=club' \
  https://{{host}}/1.1/leaderboard/leaderboards/user/<statisticName>/ranks/<objectId>
```

参数含义参见上面[获取区间排名](#获取区间排名)一节。
获取附近排名的返回结果与[获取区间排名](#获取区间排名)类似。

```json
{
  "results": [
    {
      "statisticName": "wins",
      "statisticValue": 3,
      "rank": 2,
      "user": {...}
    },
    {
      "statisticName": "wins",
      "statisticValue": 2.5,
      "rank": 3,
      "user": {
        "__type": "Pointer",
        "className": "_User",
        "username": "kate",
        "club": {
          "objectId": "60f78f98d9f1465d3b1da12d",
          "name": "board games",
          "updatedAt": "2021-07-21T03:08:08.692Z",
          "createdAt": "2021-07-21T03:08:08.692Z",
        },
        "objectId": "60d2faa99be3183623000001"
      }
    },
    {
      "statisticName": "wins",
      "statisticValue": 2,
      "rank": 4,
      "user": {...}
    }
  ],
  "count": 500
}
```

获取某 object 附近的排名：

```sh
curl -X GET \
  -H "X-LC-Id: {{appid}}" \
  -H "X-LC-Key: {{appkey}}" \
  -G \
  --data-urlencode 'startPosition=0' \
  --data-urlencode 'maxResultsCount=2' \
  --data-urlencode 'selectKeys=name,image' \
  --data-urlencode 'includeKeys=image' \
  --data-urlencode 'count=1' \
  https://{{host}}/1.1/leaderboard/leaderboards/object/<statisticName>/ranks/<objectId>
```

同理，在 URL 末端附加 entity 字符串即可获取该 entity 附近的排名：

```sh
curl -X GET \
  -H "X-LC-Id: {{appid}}" \
  -H "X-LC-Key: {{appkey}}" \
  -G \
  --data-urlencode 'startPosition=0' \
  --data-urlencode 'maxResultsCount=2' \
  --data-urlencode 'count=1' \
  https://{{host}}/1.1/leaderboard/leaderboards/entity/<statisticName>/ranks/<id>
```