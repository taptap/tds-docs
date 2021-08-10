---
id: start
title: 接入 TapTap 登录
sidebar_label: 功能接入
---

import MultiLang from '@theme/MultiLang';

接入 TapTap 登录有两种方式：

1. 基于[内建账户系统](/sdk/tdsuser/featurs)接入 TapTap 登录；
2. [单纯 TapTap 用户认证](#单纯的-taptap-用户认证使用方式)。

第一种方式是我们推荐的方式，一般适用于以下场景：

- 希望直接使用 TapSDK 提供的账户系统
- 希望将更多第三方账号（比如 QQ、微信、Apple 等）绑定到玩家账号上
- 希望使用 TapSDK 的好友、成就等基于内建账户系统的服务和功能

相反，如果你的游戏自己实现了账户系统，也不打算使用好友、成就等 TapSDK 提供的其他功能，仅仅需要接入「TapTap 用户登录」功能，那么可以考虑使用第二种方式。

我们首先介绍第一种方式，然后介绍[第二种方式](#单纯的-taptap-用户认证使用方式)。

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
// 获取 TapTap Profile  可以获得当前用户的一些基本信息，例如名称、头像、性别。
var profile = await TapLogin.FetchProfile();
```

```java
// 开发者调用 TapLoginHelper.getCurrentProfile() 可以获得当前用户的一些基本信息，例如名称、头像、性别。
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

请阅读[内建账户指南](/sdk/tdsuser/guide/)了解内建账户系统的更多功能。

## 单纯的 TapTap 用户认证使用方式

如果您仅仅只需要接入 TapTap 这一种登录方式，确认不使用 TDS 其他云服务，可以看这里的文档。请注意，如果刚开始只选择接入「TapTap 登录」，后面又需要使用其他云服务的话，后期可能有一定的升级成本。

使用原来 TapSDK v1.x 版本的开发者，也可以参考这里的说明来完成 TapSDK 的升级。

### 初始化

单纯接入「TapTap 登录」，可以只依赖于 `TapLogin` 模块，调用该模块的初始化方法完成整个 SDK 初始化。示例如下：

<MultiLang>
<>

```cs
TapLogin.Init(string clientID);
```

**参数说明**

参数  | 描述
| ------ | ------ |
clientID | TapTap 开发者中心对应应用的 Client ID。

</>
<>

```java
TapLoginHelper.init(Context context, String clientID);
```

**参数说明**

参数  | 描述
| ------ | ------ |
context | 上下文，一般是当前 Application。
clientID | TapTap 开发者中心对应应用的 Client ID。

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

### TapTap 登录并获取登录结果

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

最后通过 SDK 得到的 `Profile` 类，会包含如下信息：

- TapTap 平台 openId，每个玩家在每个游戏中的 openId 都是不一样的；
- TapTap 平台的 unionId，一个玩家在一个厂商的所有游戏中 unionId 都是一样的，不同厂商 unionId 不同；
- username，玩家在 TapTap 平台的用户名；
- avatar，玩家在 TapTap 平台的头像；

开发者可以合理使用这些信息。

### 如何从 TapTap 用户认证接口升级到内建账户系统

前面说过，如果前期开发时只把「TapTap 登录」作为一个第三方渠道进行了接入，后期要使用内建账户系统，或者老的 v1.x 版本的游戏要升级到 3.x 版本并使用其他服务，这时候会有「一定的开发成本」。这里我们就来具体说说这种情况下该如何处理。

1. 首先按照前述[初始化](#初始化)和[用 TapTap OAuth 授权结果直接登录账户系统](#用-taptap-oauth-授权结果直接登录账户系统)的提示，完成内建账户系统的 TapTap 用户登录，这时候开发者可以得到一个 TDSUser 实例。

2. 然后再调用 `TapLoginHelper#getCurrentProfile` 方法获得当前授权用户的 `Profile` 信息。请注意，这里的 `Profile` 信息和游戏之前得到的 `Profile` 信息应该是完全一样的，游戏开发者应该可以据此找到游戏服务器上持久化保存的玩家信息，也可以将当前的 TDSUser 与原来的游戏玩家信息绑定在一起。对于游戏来说，最后是否需要将 TDSUser 与游戏内玩家账户进行绑定，是完全由开发者自己决定的：

    - 不绑定是可行的，因为 TapSDK 内部会缓存当前用户的登录状态，需要的时候调用 `TDSUser#currentUser` 总能得到之前登录的 TDS 账户；
    - 绑定带来的好处则是使用上更加简单，同时也可以将 TDS 账户信息扩展到更多的第三方平台。


:::info
TapSDK 2.x 版本暂不支持升级到 3.0 版本，计划在 TapSDK 3.2 版本中支持对 TapSDK 2.x 的升级。
:::
