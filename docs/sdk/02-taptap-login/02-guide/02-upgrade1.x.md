---
id: upgrade1.x
title: 1.x升级3.x指南
sidebar_label: 1.x升级3.x
---

import MultiLang from '@theme/MultiLang';

从1.x升级到3.x，在3.x版本中，提供获取`openid`和`unionid`的方式，与1.x版本保持一致


## 初始化

<MultiLang>


```cs
TapLogin.Init(string clientID);
```

```java
TapLoginHelper.init(Context context, String clientID);
```

```objectivec
AccessToken *accessToken = [TapBootstrap getCurrentToken];
if (accessToken == nil) {
    // 未登录
} else {
    // 已登录
}
```

```objectivec
[TapLoginHelper initWithClientID:@"your clientId"];
```

</MultiLang>

## TapTap 登录并获取 Profile

<MultiLang>


```cs
// 唤起 TapTap 网页 或者 TapTap 客户端进行登陆
var accessToken = await TapLogin.Login();
// 获取 TapTap AccessToken
var accessToken = await TapLogin.GetAccessToken();
// 获取 TapTap Profile  可以获得当前用户的一些基本信息，例如名称、头像、性别。
var profile = await TapLogin.FetchProfile();
```

```java
TapLoginHelper.TapLoginResultCallback loginCallback = new TapLoginHelper.TapLoginResultCallback() {
    @Override
    public void onLoginSuccess(AccessToken token) {
        Log.d(TAG, "TapTap authorization succeed");
        // 开发者调用 TapLoginHelper.getCurrentProfile() 可以获得当前用户的一些基本信息，例如名称、头像、性别。
        Profile profile = TapLoginHelper.getCurrentProfile();
    }

    @Override
    public void onLoginCancel() {
        Log.d(TAG, "TapTap authorization cancelled");
    }

    @Override
    public void onLoginError(AccountGlobalError globalError) {
        Log.d(TAG, "TapTap authorization failed. cause: " + globalError.getMessage());
    }
};
TapLoginHelper.registerLoginCallback(loginCallback);
TapLoginHelper.startTapLogin(MainActivity.this, TapLoginHelper.SCOPE_PUBLIC_PROFILE);
```

```objectivec
[TapLoginHelper registerLoginResultDelegate:delegator];
if ([TapLoginHelper currentProfile]) {
    // 当前已经登录
} else {
    [TapLoginHelper startTapLogin:@[@"public_profile"]];
}

// delegator
- (void)onLoginCancel {
    // 登录取消
}

- (void)onLoginError:(nonnull NSError *)error {
    // 登录失败
}

- (void)onLoginSuccess:(nonnull TTSDKAccessToken *)token {
    // 登录成功
}
```

</MultiLang>