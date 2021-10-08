---
id: start
title: 接入 TapTap 登录
sidebar_label: 功能接入
---

import MultiLang from '@theme/MultiLang';

:::note
温馨提示：[配置签名证书](/sdk/start/quickstart/#配置签名证书) 和 [添加测试用户](/sdk/start/test-accounts/) 在测试登录功能前务必完成配置，否则无法正常登录；
:::

接入 TapTap 登录有两种方式：

1. 基于[内建账户系统](/sdk/authentication/features)接入 TapTap 登录；
2. [单纯 TapTap 用户认证](/sdk/taptap-login/guide/tap-login/)。

第一种方式是我们推荐的方式，一般适用于以下场景：

- 希望直接使用 TapSDK 提供的账户系统
- 希望将更多第三方账号（比如 QQ、微信、Apple 等）绑定到玩家账号上
- 希望使用 TapSDK 的好友、成就等基于内建账户系统的服务和功能

相反，如果你的游戏自己实现了账户系统，也不打算使用好友、成就等 TapSDK 提供的其他功能，仅仅需要接入「TapTap 用户登录」功能，那么可以考虑使用第二种方式。

注意，第一种方式基于内建账户系统，使用量超出免费额度后需要[付费](https://developer.taptap.com/product-intro/price)。
因此，使用第一种方式时请确保余额充足，以免因为欠费导致服务停用，玩家无法登录。

我们首先介绍第一种方式，然后介绍[第二种方式](/sdk/taptap-login/guide/tap-login/)。

## 用 TapTap OAuth 授权结果直接登录账户系统

对于「TapTap 用户登录」，TapSDK 提供了特别的支持，以帮助开发者以最便捷的方式和最少的时间完成接入。你可以直接调用 `TDSUser#loginWithTapTap` 方法来一键登录，例如：

<MultiLang>

```cs
try
{
    var tdsUser = await TDSUser.LoginWithTapTap();
    Debug.Log($"login sucess:{tdsUser}");
}
catch (Exception e)
{
    if (e is TapException tapError)  // using TapTap.Common
    {
        Debug.Log($"encounter exception:{tapError.code} message:{tapError.message}");
        if (tapError.code == TapErrorCode.ERROR_CODE_BIND_CANCEL) // 取消登录
        {
            Debug.Log("登录取消");
        }
    }
}
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

`TDSUser` 即是当前玩家的账户系统，登录成功之后开发者可以：

- 通过访问 `nickname` 属性来获得 TapTap 账户的用户名；
- 通过访问 `avatar` 属性来获得 TapTap 账户的头像；
- 通过访问 `objectId` 来得到该账户系统的 id，可用于游戏服务器内玩家与 TDS 内建账户的绑定或匹配。

在 TapTap 登录完成之后，开发者就可以使用其他 TapTap 生态能力，例如：

### 获取 TapTap 平台用户详细信息

TapTap 用户登录成功之后，开发者可以通过如下方式获取到 TapTap 授权结果的详细信息：

<MultiLang>

```cs
// 获取 TapTap Profile  可以获得当前用户的一些基本信息，例如名称、头像。
var profile = await TapLogin.FetchProfile();
Debug.Log($"profile: {profile.ToJson()}");
```

```java
// 开发者调用 TapLoginHelper.getCurrentProfile() 可以获得当前用户的一些基本信息，例如名称、头像。
Profile profile = TapLoginHelper.getCurrentProfile();
```

```objectivec
[TapLoginHelper currentProfile]
```

</MultiLang>

这里的 `Profile` 类会包含如下信息：

- TapTap 平台 openId，每个玩家在每个游戏中的 openId 都是不一样的；
- TapTap 平台的 unionId，一个玩家在一个厂商的所有游戏中 unionId 都是一样的，不同厂商 unionId 不同；
- username，玩家在 TapTap 平台的用户名；
- avatar，玩家在 TapTap 平台的头像；

### 测试资格校验

:::tip
该功能仅用于需要上线「篝火测试服」的游戏，对有登录白名单的用户进行资格校验，防止测试阶段开发包外传被利用
:::

请在登录成功的回调里调用相关 API 进行资格校验。

<MultiLang>

```cs
try
{
    var test = await TapLogin.GetTestQualification();
    if(test)
    {
        Debug.Log("该玩家具备篝火测试资格");
    }
    else
    {
        Debug.Log("该玩家不具备篝火测试资格");
    }
        
}
catch(Exception e)
{
    Debug.Log($"篝火测试 error：{e.Message}");
}

```

```java
TapLoginHelper.getTestQualification(new Api.ApiCallback<Boolean>() {
    @Override
    public void onSuccess(Boolean aBoolean) {
        if(aBoolean){
            // 该玩家已拥有测试资格
            Toast.makeText(MainActivity.this, "该玩家已具有篝火测试资格", Toast.LENGTH_SHORT).show();
        }else {
            // 该玩家不具备测试资格， 游戏层面进行拦截
            Toast.makeText(MainActivity.this, "该玩家不具备篝火测试资格", Toast.LENGTH_SHORT).show();
        }
    }

    @Override
    public void onError(Throwable throwable) {
        // 服务端检查出错或者网络异常
        Toast.makeText(MainActivity.this, "服务端检查出错或者网络异常", Toast.LENGTH_SHORT).show();
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
        } else {
            // 没有篝火测试资格
        }
    }
}];
```

</MultiLang>

** Error 信息为网络错误，或者该游戏未开通篝火测试服。 **

## 检查登录状态

`TDSUser` 会在本地缓存当前用户的登录信息，所以如果一个玩家在游戏内登录之后，下次启动用户通过调用 `TDSUser#currentUser` 可以得到之前登录的账户实例，此时玩家无需再次登录即可使用。
缓存不会自动清除。
如果玩家在游戏内进行了登出或者玩家手动清除了游戏的存储数据，则本地缓存的登录信息也会被删除，下次进入游戏时 `TDSUser#currentUser` 会返回一个 null 对象。

<MultiLang>

```cs
var currentUser = await TDSUser.GetCurrent();
if (null == currentUser)
{
    Debug.Log("当前未登录");
}
else 
{
    Debug.Log("已登录");
}
```

```java
if (null == TDSUser.currentUser()) {
    // 未登录
} else {
    // 已登录
}
```

```objectivec
TDSUser *currentUser = [TDSUser currentUser]
if (currentUser == nil) {
    // 未登录
} else {
    // 已登录
}
```
</MultiLang>

## 登出当前账户
账户的登出非常简单，调用 `logOut` 方法即可。

<MultiLang>

```cs
await TDSUser.Logout();
```

```java
TDSUser.logOut();
```

```objectivec
[TDSUser logOut];
```

</MultiLang>

## 更多功能

请阅读[内建账户指南](/sdk/authentication/guide/)了解内建账户系统的更多功能。
