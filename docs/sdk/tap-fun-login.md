---
id: tap-fun-login
title: 登录功能
sidebar_label: 登录
---

import MultiLang from '@theme/MultiLang';

[快速开始](/sdk)中简单介绍了[如何在游戏中加入 Tap 登录](/sdk#TapTap-登录)，这里详细介绍 TapSDK 的[登录功能](/pro/pro-login/)。

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
另外，请仔细阅读[登录按钮设计规范](/pro/login-design.md)。  


<MultiLang>

```cs
LoginType loginType = LoginType.TAPTAP;
TapBootstrap.Login(loginType, new string[] { "public_profile" });
```

```java
// 登陆类型：固定0 表示TapTap登陆
// 本例使用TapTap登陆
TapBootstrap.login(MainActivity.this, LoginType.TAPTAP);
```

```objectivec  
TapBootstrapLoginType loginType = TapBootstrapLoginTypeTapTap;
[TapBootstrap login:(loginType) permissions:@[@"public_profile"]];
```

</MultiLang>

上述代码示例中，登录类型固定为 TapTap 登录。

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