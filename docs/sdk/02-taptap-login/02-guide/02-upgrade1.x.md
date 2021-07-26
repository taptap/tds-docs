---
id: upgrade1.x
title: 1.x 升级 3.x 指南
sidebar_label: 1.x 升级 3.x
---

import MultiLang from '@theme/MultiLang';

因新版接口与旧版接口有明显差别，所以需将旧版接口删除，通过如下方式重新接入以便使用新版本接口。

## 初始化

该接口应尽早并在调用 SDK 的其他接口前调用，示例如下：

<MultiLang>
<>

```cs
TapLogin.Init(string clientID);
```

**参数说明**

参数  | 描述
| ------ | ------ |
clientID | TapTap 开发者中心对应应用的 Client ID

</>
<>

```java
LoginSdkConfig loginSdkConfig = new LoginSdkConfig(true, true, RegionType.CN);
TapLoginHelper.init(Context context, String clientID, LoginSdkConfig config);
```

**参数说明**

参数  | 描述
| ------ | ------ |
context | 上下文
clientID | TapTap 开发者中心对应应用的 Client ID
config | TapSDK 初始化相关配置

</>
<>

```objectivec
[TapLoginHelper initWithClientID:@"your clientId"];
```
**参数说明**

参数  | 描述
| ------ | ------ |
clientId | TapTap 开发者中心对应应用的 Client ID

</>


</MultiLang>


## TapTap 登录并获取登陆结果

<MultiLang>


```cs
// 唤起 TapTap 网页 或者 TapTap 客户端进行登陆
var accessToken = await TapLogin.Login();
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