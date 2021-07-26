---
id: start
title: 内建账户系统
sidebar_label: 功能接入
---

import MultiLang from '@theme/MultiLang';

[快速开始](/sdk/start/quickstart/)中简单介绍了如何在游戏中加入 Tap 登录，这里详细介绍 TapSDK 的[登录功能](/sdk/taptap-login/features/)。


从 TapSDK 3.0 开始，我们在单纯的 TapTap 登录之外，还提供了一个内建账户系统供游戏使用：开发者可以直接用 TapTap OAuth 授权的结果生成一个游戏内的账号（TDSUser），然后用该账号保存更多玩家数据。同时，我们也支持将更多第三方认证登录的结果绑定到这一账号上来（以及后续的解绑操作）。

## 初始化

<MultiLang>


```cs
var config = new TapConfig.Builder()
                          .ClientID("client_id")
                          .ClientSecret("client_secret")
                          .ServerURL("https://ikggdre2.lc-cn-n1-shared.com")
                          .RegionType(RegionType.CN)  // CN 标识国内，IO标识海外，目前暂不支持海外授权登陆。
                          .ConfigBuilder();
TapBootstrap.Init(config);
```

```java
TapConfig tdsConfig = new TapConfig.Builder()
        .withAppContext(MainActivity.this)
        .withClientId("{your client id}")
        .withClientToken("{your client token}}")
        .withServerUrl("{your server url}}")
        .withRegionType(TapRegionType.CN)  // CN 标识国内，IO标识海外，目前暂不支持海外授权登陆。
        .build();
TapBootstrap.init(MainActivity.this, tdsConfig);
```

```objectivec
TapConfig *config = [TapConfig new];
config.clientId = @"{your client id}";
config.clientToken = @"{your client token}";
config.region = TapSDKRegionTypeCN;  // CN 标识国内，IO标识海外，目前暂不支持海外授权登陆。
config.serverURL = @"{your server url}";
[TapBootstrap initWithConfig:config];
```

</MultiLang>

:::info
TapSDK 3.0 版本目前暂不支持海外，预计本季度部署海外节点，敬请期待。
:::

## 用 TapTap OAuth 授权结果直接登录账户系统

<MultiLang>


```cs
var tdsUser = await TDSUser.LoginWithTapTap();
```

```java
TDSUser.loginWithTapTap(MainActivity.this, new Callback<TDSUser>() {
    @Override
    public void onSuccess(TDSUser resultUser) {
        Toast.makeText(MainActivity.this, "succeed to login with Taptap.", Toast.LENGTH_SHORT).show();
        // 开发者可以调用 resultUser 的方法获取更多属性。
        String userId = resultUser.getObjectId();  // 用户唯一标识
        String avatar = (String) resultUser.get("avatar");  // 头像
        String nickName = (String) resultUser.get("nickname");  // 昵称
    }

    @Override
    public void onFail(TapError error) {
        Toast.makeText(MainActivity.this, error.getMessage(), Toast.LENGTH_SHORT).show();
    }
}, "public_profile");
```

```objectivec
[TDSUser loginByTapTapWithPermissions:@[@"public_profile"] callback:^(TDSUser * _Nullable user, NSError * _Nullable error) {
    if (user) {
        // 开发者可以调用 user 的方法获取更多属性。
        NSString *userId = user.objectId;
        NSString *username = user[@"nickname"];
        NSString *avatar = user[@"avatar"];
    } else {
        NSLog(@"%@", error);
    }
}];
```

</MultiLang>


## 登录资格校验

:::tip
该功能仅用于需要上线「篝火测试服」的游戏，对有登录白名单的用户进行资格校验，防止测试阶段开发包外传被利用
:::
请在登录成功的回调里调用相关API进行校验，[点击](https://www.taptap.com/campfire)了解篝火计划

<MultiLang>

```cs
TapLogin.GetTestQualification((valid, error) => {
    if (error)
    {
        // 网络异常或游戏未开启篝火测试
    }
    else
    {
        if(valid)
        {
            // 有篝火测试资格
        }
    }
});
```

```java
TapLoginHelper.getTestQualification(new Callback<Boolean>() {
    @Override
    public void onSuccess(Boolean aBoolean) {
        if（aboolean）{
            // 该玩家已拥有测试资格
        }else{
            // 该玩家不具备测试资格
        }
    }

    @Override
    public void onFail(TapError tapError) {
        // 网络异常或查询失败
    }
});
```

```objectivec
[TapLoginHelper getTestQualification:^(BOOL isQualified, NSError *_Nullable error) {
    if (error) {
        // 网络异常或游戏未开启篝火测试
    } else {
        if (isQualified) {
            // 有篝火测试资格
        }
    }
}];
```

</MultiLang>

** Error信息为网络错误，或者该游戏未开通篝火测试服 **

:::info
对于 `TDSUser`， 我们还支持一些其他操作，例如：
:::

## 游客登录
内建账户系统支持游戏创建一个游客账号，其调用示例如下：

<MultiLang>


```cs
var tdsUser = await TDSUser.LoginAnonymously();
```

```java
TDSUser.logInAnonymously().subscribe(new Observer<TDSUser>() {
  @Override
  public void onSubscribe(Disposable disposable) {

  }

  @Override
  public void onNext(TDSUser resultUser) {
    // 登录成功，得到一个账户实例。
    String userId = resultUser.getObjectId();
  }

  @Override
  public void onError(Throwable throwable) {
    
  }

  @Override
  public void onComplete() {
  }
});
```


```objectivec
[TDSUser loginAnonymously:^(TDSUser * _Nullable user, NSError * _Nullable error) {
    if (user) {
        NSString *userId = user.objectId;
    } else {
        NSLog(@"%@", error);
    }
}];
```

</MultiLang>

## 绑定其他第三方平台账号
游戏内经常会发生玩家先用游客身份登录，之后通过绑定第三方账号的认证结果切换到正式账号，这一过程可以通过如下方式完成： 

<MultiLang>


```cs
// 绑定微信账户
Dictionary<string, object> thirdPartyData = new Dictionary<string, object> {
    // 必须
    { "openid", "OPENID" },
    { "access_token", "ACCESS_TOKEN" },
    { "expires_in", 7200 },

    // 可选
    { "refresh_token", "REFRESH_TOKEN" },
    { "scope", "SCOPE" }
  };
// currentUser 可以是游客，也可以是一个正式账户
await currentUser.AssociateAuthData(thirdPartyData, "weixin");
```

```java
// 以绑定微信账户为例子
Map<String, Object> authData = new HashMap<String, Object>();
authData.put("openid", "OPENID");
authData.put("access_token", "ACCESS_TOKEN");
authData.put("expires_in", 7200);
authData.put("scope", "SCOPE");

TDSUser currentUser = TDSUser.currentUser();  // 获取当前登录的账户实例
currentUser.associateWithAuthData(authData, "weixin").subscribe(new Observer<LCUser>() {
    @Override
    public void onSubscribe(@NotNull Disposable d) {

    }

    @Override
    public void onNext(@NotNull LCUser lcUser) {
        // 绑定成功
        TDSUser tdsUser = (TDSUser) lcUser;
    }

    @Override
    public void onError(@NotNull Throwable e) {

    }

    @Override
    public void onComplete() {

    }
});
```


```objectivec
// 以绑定微信账户为例子
NSDictionary *authData = @{
    @"openid" : @"OPENID",
    @"access_token" : @"ACCESS_TOKEN",
    @"expires_in" : @7200,
    @"scope" : @"SCOPE",
};
[[TDSUser currentUser] associateWithAuthData:authData platformId:@"weixin" options:nil callback:^(BOOL succeeded, NSError * _Nullable error) {
    if (succeeded) {
        // 绑定成功
    } else {
        NSLog(@"%@", error);
    }
}];
```

</MultiLang>


## 解绑第三方平台账号
<MultiLang>


```cs
// 与微信账户解除绑定
var currentUser = await TDSUser.GetCurrent();  // 获取当前登录的账户实例
await currentUser.DisassociateWithAuthData("weixin");
```

```java
// 以解绑微信账户为例子
TDSUser currentUser = TDSUser.currentUser();  // 获取当前登录的账户实例
currentUser.disassociateWithAuthData("weixin").subscribe(new Observer<TDSUser>() {
  @Override
  public void onSubscribe(Disposable disposable) {

  }

  @Override
  public void onNext(TDSUser resultUser) {
    // 解绑成功
  }

  @Override
  public void onError(Throwable throwable) {
    
  }

  @Override
  public void onComplete() {
  }
});
```


```objectivec
// 以解绑微信账户为例子
[[TDSUser currentUser] disassociateWithPlatformId:@"weixin" callback:^(BOOL succeeded, NSError * _Nullable error) {
    if (succeeded) {
        // 解绑成功
    } else {
        NSLog(@"%@", error);
    }
}];
```

</MultiLang>


## 设置其他属性并保存
开发者可以使用内建账户系统保存更多玩家的信息，例如当前玩家的昵称、获得奖杯数等，示意代码如下：

<MultiLang>


```cs

```

```java
TDSUser currentUser = TDSUser.currentUser();  // 获取当前登录的账户实例
currentUser.put("nickname", "打不死的青铜");
currentUser.put("cups", 256);
currentUser.saveInBackground().subscribe(new Observer<LCObject>() {
    @Override
    public void onSubscribe(@NotNull Disposable d) {

    }

    @Override
    public void onNext(@NotNull LCObject lcObject) {
        // 保存成功，currentUser 的属性得到更新。
        TDSUser tdsUser = (TDSUser) lcObject;
    }

    @Override
    public void onError(@NotNull Throwable e) {

    }

    @Override
    public void onComplete() {

    }
});
```


```objectivec
TDSUser *currentUser = [TDSUser currentUser];
currentUser[@"nickname"] = @"打不死的青铜";
currentUser[@"cups"] = @256;
[currentUser saveInBackgroundWithBlock:^(BOOL succeeded, NSError * _Nullable error) {
    if (succeeded) {
        // 保存成功
    } else {
        NSLog(@"%@", error);
    }
}];
```

</MultiLang>

## 登出当前账户
账户的登出非常简单，调用 `logOut` 方法即可。

<MultiLang>


```cs
TDSUser.Logout();
```

```java
TDSUser.logOut().
```

```objectivec
[TDSUser logOut];
```

</MultiLang>

## 检查登录状态
`TDSUser` 会在本地缓存当前用户的登录信息，所以如果一个玩家在游戏内登录之后，下次启动用户通过调用 `TDSUser#currentUser` 可以得到之前登录的账户实例，此时玩家无需再次登录即可使用。
如果玩家在游戏内进行了登出，则本地缓存的登录信息也会被删除，下次进入游戏时 `TDSUser#currentUser` 会返回一个 null 对象。


:::info
TapSDK 2.x 版本暂不支持升级到 3.0 版本，计划在 TapSDK 3.2 版本中支持对 TapSDK 2.x 的升级。
:::
