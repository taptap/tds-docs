---
id: tap-fun-login
title: 登录功能
sidebar_label: 登录
---

import MultiLang from '@theme/MultiLang';

[快速开始](/sdk)中简单介绍了[如何在游戏中加入 Tap 登录](/sdk#TapTap-登录)，这里详细介绍 TapSDK 的[登录功能](/sdk/features/pro-login/)。

## 检查登录状态

尝试获取当前用户的 Access Token，如 Access Token 为空则用户未登录。
调用登录方法前先检查登录状态，可以避免重复登录。

<MultiLang>

```cs
TapBootstrap.GetAccessToken((accessToken, error) => {
   if (accessToken == null)
   {
       Debug.Log("当前未登录");
   }
   else
   {
       Debug.Log("已登录");
   }
});
```

```java
if (TapBootstrap.getCurrentToken() == null) {
    // 未登录
} else {
    // 已登录
}
```

```objectivec
AccessToken *accessToken = [TapBootstrap getCurrentToken];
if (accessToken == nil) {
    // 未登录
} else {
    // 已登录
}
```

</MultiLang>

## 登录资格校验

:::tip
该功能仅用于需要上线「篝火测试服」的游戏，对有登录白名单的用户进行资格校验，防止测试阶段开发包外传被利用
:::

请在登录成功的回调里调用相关 API 进行校验，[点击](https://www.taptap.com/campfire)了解篝火计划

<MultiLang>

```cs
  public void OnLoginSuccess(AccessToken accessToken)
    {
        Debug.Log("登录成功:  " + accessToken.ToJSON());
        TapBootstrap.GetTestQualification((valid, error) => {
            if (valid)
            {
                Debug.Log("该用户已拥有测试资格");
            }
            else
            {
                Debug.Log("不具备测试资格，游戏层面进行拦截");
            }
        });
    }
```

```java
TapBootstrap.getTestQualification(new Callback<Boolean>() {
    @Override
    public void onSuccess(Boolean aBoolean) {
        // 该玩家已拥有测试资格
    }

    @Override
    public void onFail(TapError tapError) {
        // 该玩家不具备测试资格， 游戏层面进行拦截
    }
});
```

```objectivec
- (void)onLoginSuccess:(AccessToken *)token{
    NSLog (@"onLoginSuccess");
    [TapBootstrap getTestQualification:^(BOOL isQualified, NSError *_Nullable error) {
        if (error) {
            // 网络异常或游戏未开启篝火测试
        } else {
            if (isQualified) {
                // 有篝火测试资格
            }
        }
    }];
}
```

</MultiLang>

** Error 信息为网络错误，或者该游戏未开通篝火测试服 **

## 获取用户信息

获取当前登录用户的 ID、昵称、头像等基本信息。

:::caution
请仅在用户已登录的情况下获取用户信息，如用户未登录，强行获取用户信息，可能导致程序异常甚至崩溃。
:::

<MultiLang>

```cs
TapBootstrap.GetUser((user, error) => {
    Debug.Log(user.ToJSON());
});
```

```java
TapBootstrap.getUser(new Callback<TapUser>() {
    @Override
    public void onSuccess(TapUser tapUser) {

    }

    @Override
    public void onFail(TapError tapError) {

    }
});
```

```objectivec
[TapBootstrap getUser:^(TapUser * _Nullable userInfo, NSError * _Nullable error) {
    if (error) {
        NSLog(@"获取用户信息失败 %@", error);
    } else {
        NSLog(@"获取用户信息成功 %@", userInfo);
    }
}];
```

</MultiLang>


## 登录

执行登录操作，优先跳转 TapTap APP 登录，当没有 TapTap APP 时，会打开内置 WebView 登录。
另外，请仔细阅读[登录按钮设计规范](/login-design)。  


<MultiLang>

```cs
LoginType loginType = LoginType.TAPTAP;
TapBootstrap.Login(loginType, new string[] { "public_profile" });
```

```java
TapBootstrap.login(MainActivity.this, LoginType.TAPTAP, "public_profile");
```

```objectivec  
TapBootstrapLoginType loginType = TapBootstrapLoginTypeTapTap;
[TapBootstrap login:(loginType) permissions:@[@"public_profile"]];
```

</MultiLang>

上述代码示例中，登录类型固定为 TapTap 登录，权限固定为 `public_profile`。

## 登出

退出登录，清除用户登录缓存。

<MultiLang>

```cs
TapBootstrap.Logout();
```

```java
TapBootstrap.logout();
```

```objectivec
[TapBootstrap logout];
```

</MultiLang>
