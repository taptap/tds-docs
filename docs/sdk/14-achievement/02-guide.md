---
id: guide
title: 开发指南
sidebar_label: 开发指南
---

import MultiLang from '@theme/MultiLang';

本文介绍如何在游戏中加入成就系统。TDS 推出的成就系统模块，是基于内建账户系统（TDSUser）的，具体请阅读[登录系统 > 开发指南](/sdk/taptap-login/guide/start/)。

## 注册监听回调
成就 SDK 中包含多个监听回调，分别会在初始化数据成功、初始化数据失败以及成就进度更新时被调用，请特别注意初始化数据成功的回调，这是成就 SDK 正常使用的前提，初始化数据失败时请提示用户或者在合适的时候重新初始化数据。

<MultiLang>

<>

### 使用前提

使用 TapTap.Achievement 前提是必须依赖 `TapTap.Bootstrap` 库。

### 命名空间

```cs
using TapTap.Achievement;
```

注册监听回调：

```cs
TapAchievement.RegisterCallback(IAchievementCallback callback);

private class AchievementCallback:IAchievementCallback{

    public void OnAchievementSDKInitSuccess()
    {
        //成就SDK 初始化成功
    }

    public void OnAchievementSDKInitFail(TapError errorCode)
    {
        if (errorCode != null)
        {
            //初始化失败
        }
    }

    public void OnAchievementStatusUpdate(TapAchievementBean bean, TapError errorCode)
    {
        if (errorCode != null)
        {
            // 成就状态更新失败
            return;
        }

        if (bean != null)
        {
            // 成就状态更新更新
        }
    }

}
```

</>
<>

```java
TapAchievement.registerCallback(new AchievementCallback() {

      @Override
      public void onAchievementSDKInitSuccess() {
        // 数据加载成功
      }

      @Override
      public void onAchievementSDKInitFail(AchievementException exception) {
        // 数据加载失败，请重试
      }

      @Override
      public void onAchievementStatusUpdate(TapAchievementBean item, AchievementException exception) {
        if (exception != null) {
          // 成就更新失败
          return;
        }
        if (item != null) {
          // item 更新成功
        }
      }
    });
```

</>
<>


```objectivec
[TapAchievement registerCallBack:self];

- (void)onAchievementSDKInitSuccess {
  // 数据加载成功  
}

//初始化失败
- (void)onAchievementSDKInitFail:(nullable NSError *)error {
    // 数据加载失败，请重试
}

//成就状态改变
- (void)onAchievementStatusUpdate:(nullable TapAchievementModel *)achievement failure:(nullable NSError *)error {
    if (error) {
       // 成就更新失败
    } else {
      // achievement 更新成功
    }
}
```

</>

</MultiLang>

## 初始化数据
由于成就系统会在本地记录用户的成就数据，所以请在用户登录后初始化数据。如果用户切换账号时，务必重新调用该接口，不然数据可能会存在账号存储混乱的问题。

这个步骤是异步操作，需要确认收到成功回调时才能进行更多操作。

<MultiLang>

```cs
TapAchievement.InitData();
```

```java
TapAchievement.initData();
```

```objectivec
[TapAchievement initData];
```

</MultiLang>

## 获取全部成就数据
全部成就数据分为本地数据和服务端数据两种：本地数据是记录在玩家本机的数据，本地数据会在调用初始化数据接口成功后被服务端数据刷新。主动调用服务端数据接口时也会更新本地数据。

如果在游玩过程中有更新服务端数据且需要实时更新的需求时，可以调用获取服务端数据接口来实现，正常情况下直接获取本地数据即可。

<MultiLang>

```cs
// 获取本地数据
TapAchievement.GetLocalAllAchievementList((list, code) =>
{
     if (code != null)
     {
        // 获取成就数据失败
     }
     else
     {
        // 获取成就数据成功
     });
}
// 获取服务器数据
TapAchievement.FetchAllAchievementList((list, code) =>
{
     if (code != null)
     {
        // 获取成就数据失败
     }
     else
     {
        // 获取成就数据成功
     });
}
```

```java
// 本地数据
List<TapAchievementBean> allList = TapAchievement.getLocalAllAchievementList();

// 服务端数据
TapAchievement.fetchAllAchievementList(new GetAchievementListCallBack() {
      @Override
      public void onGetAchievementList(List<TapAchievementBean> achievementList, AchievementException exception) {
        if (exception != null) {
          switch (exception.errorCode) {
            case AchievementException.SDK_NOT_INIT:
              // SDK 还未初始化数据
              break;
            default:
              // 数据获取失败
          }
        } else {
          // 成功获取数据
        }
      }
    });
```

```objectivec
// 本地数据
 NSArray<TapAchievementModel *> *allList = [TapAchievement getLocalAllAchievementList];

 // 服务端数据
 [TapAchievement fetchAllAchievementList:^(NSArray<TapAchievementModel *> *_Nullable result, NSError *_Nullable error) {
        if (error) {
            switch (error.code) {
                case 9001:
                    //SDK 还未成功初始化
                    break;
                default:
                    //数据获取失败
                    break;
            }
        } else {
            //成功获取数据
        }
    }];
```

</MultiLang>

## 获取当前用户成就数据
用户成就数据分为本地数据和服务端数据两种：本地数据是记录在玩家本机的数据，本地数据会在调用初始化数据接口成功后和服务端数据合并（对单个成就来说会以步长更高的数据为准）。主动调用服务端数据接口也会和本地数据进行合并。

对于用户数据，一般以本地数据为准。服务端数据可能存在上报失败等可能导致数据并非实时。
<MultiLang>

```cs
// 获取本地数据
TapAchievement.GetLocalUserAchievementList((list, code) =>
{
     if (code != null)
     {
        // 获取成就数据失败
     }
     else
     {
        // 获取成就数据成功
     });
}
// 获取服务器数据
TapAchievement.FetchUserAchievementList((list, code) =>
{
     if (code != null)
     {
        // 获取成就数据失败
     }
     else
     {
        // 获取成就数据成功
     });
}
```

```java
// 本地数据
List<TapAchievementBean> userList = TapAchievement.getLocalUserAchievementList();

// 服务端数据
TapAchievement.fetchUserAchievementList(new GetAchievementListCallBack() {
      @Override
      public void onGetAchievementList(List<TapAchievementBean> achievementList, AchievementException exception) {
        if (exception != null) {
          switch (exception.errorCode) {
            case AchievementException.SDK_NOT_INIT:
              // SDK 还未初始化数据
              break;
            default:
              // 数据获取失败
          }
        } else {
          // 成功获取数据
        }
      }
    });
```

```objectivec
// 本地数据
 NSArray<TapAchievementModel *> *userList = [TapAchievement getLocalUserAchievementList];

// 服务端数据
[TapAchievement fetchUserAchievementList:^(NSArray<TapAchievementModel *> *_Nullable result, NSError *_Nullable error) {
        if (error) {
            switch (error.code) {
                case 9001:
                    //SDK 还未成功初始化
                    break;
                default:
                    //数据获取失败
                    break;
            }
        } else {
            //成功获取数据
        }
    }];
```

</MultiLang>

## 达成某个成就（直接获得）

<MultiLang>

```cs
// displayID 是在开发者中心中添加成就时自行设定的 成就ID
TapAchievement.Reach("displayID");
```

```java
// displayID 是在开发者中心中添加成就时自行设定的 成就ID
TapAchievement.reach("displayID");
```

```objectivec
// displayID 是在开发者中心中添加成就时自行设定的 成就ID
[TapAchievement reach:@"displayId"];
```

</MultiLang>

## 多步长成就增长步数
成就增长步数提供两种方式调用，`growSteps` 中传递当前增量达成的步数（例如：多走了5步，则传递5即可），`makeSteps` 中传递当前成就已达成的步数，(例如：当前已经走了100步，则传递100)，调用 `growSteps` 时 SDK 内部会计算当前全量步数。

<MultiLang>

```cs
// displayID 是在开发者中心中添加成就时自行设定的 成就ID
TapAchievement.GrowSteps("displayID", step);
TapAchievement.MakeSteps("displayID", step);
```

```java
// displayID 是在开发者中心中添加成就时自行设定的 成就ID
TapAchievement.growSteps("displayID", 5);
TapAchievement.makeSteps("displayID", 100);
```

```objectivec
// displayID 是在开发者中心中添加成就时自行设定的 成就ID
[TapAchievement growSteps:@"displayID" numSteps:5];
[TapAchievement makeSteps:@"displayID" numSteps:100];
```

</MultiLang>

## 设置冒泡开关
默认情况下，成就达成时 SDK 会自行展示一个冒泡浮窗提示玩家已达成相应成就。需要关闭请调用如下接口：

<MultiLang>

```cs
TapAchievement.SetShowToast(bool isShow);
```

```java
TapAchievement.setShowToast(false);
```

```objectivec
[TapAchievement setShowToast:NO];
```

</MultiLang>

## 打开成就展示页
SDK 自带一个展示所有成就和已达成成就情况的页面：

<MultiLang>

```cs
TapAchievement.ShowAchievementPage();
```

```java
TapAchievement.showAchievementPage();
```

```objectivec
[TapAchievement showAchievementPage];
```

</MultiLang>

## 成就相关数据解读

<MultiLang>

```cs
public string displayId;              // 成就 id 
public int visible = VisibleFalse;    //是否是隐藏成就
public string title;                  //标题
public string subTitle;               //副标题
public string achieveIcon;            // 图标
public int step;                      //设定步数
public bool fullReached;              //是否达成
public int reachedStep;               //达成步数
public long reachedTime;              //达成时间
public AchievmentStats stats;         //当前成就稀有度指标
```

```java
  /*base*/
  private String displayId;             // 成就 id
  private int visible = VISIBLE_TRUE;   // 是否是隐藏成就
  private String title;                 // 标题
  private String subTitle;              // 副标题
  private String achieveIcon;           // 图标
  private int step;                     // 设定步数
  private AchievementStats stats;       // 当前成就稀有度指标
  private int type;                     // 类型，1为普通成就，99为白金成就
  /*user*/
  private boolean fullReached;          // 是否已达成
  private int reachedStep;              // 当前达成步数
  private long reachedTime;             // 当前达成时间
```

```objectivec
@property (nonatomic, copy, readonly) NSString *displayId;      // 成就 id
@property (nonatomic, copy, readonly) NSString *achieveIcon;    // 成就图片
@property (nonatomic, copy) NSString *title;                    // 成就名称
@property (nonatomic, copy, readonly) NSString *subTitle;       // 成就描述
@property (nonatomic, assign, readonly) NSNumber *step;         // 完成成就总的步数
@property (nonatomic, strong) TDSAchievementStatus *stats;      // 当前成就稀有度指标
@property (nonatomic, assign) NSInteger type;                   // 类型，1为普通成就，99为白金成就

//用户数据
@property (nonatomic, assign) BOOL fullReached;                 // 是否到达成就 
@property (nonatomic, assign) long reachedTime;                 // 成就达到时间
@property (nonatomic, assign) NSInteger reachedStep;            // 当前完成步数
```

</MultiLang>
