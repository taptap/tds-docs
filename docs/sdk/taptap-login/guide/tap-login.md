---
title: 单纯 TapTap 用户认证
sidebar_label: 单纯认证
sidebar_position: 1
---

import MultiLang from '/src/docComponents/MultiLang';
import {Conditional} from '/src/docComponents/conditional';

如果你仅仅只需要接入 TapTap 这一种登录方式，确认不使用 TDS 其他云服务，可以看这里的文档。请注意，如果刚开始只选择接入「TapTap 登录」，后面又需要使用其他云服务的话，后期可能有一定的升级成本。

<Conditional region='cn'>

使用原来 TapSDK v1.x 版本的开发者，也可以参考这里的说明来完成 TapSDK 的升级。

</Conditional>

## 初始化

单纯接入「TapTap 登录」，需要依赖 `TapLogin` 和 `TapCommon` 模块。请先 [下载](/tap-download) SDK，并添加相关依赖。

<Conditional region='cn'>

:::note
游戏 [**适用地区**](/sdk/start/get-ready/#适用地区) 在开启应用配置时选定。
初始化时需要区分适用于中国大陆还是其他国家或地区。
:::

</Conditional>

<MultiLang>
<>

<Conditional region='cn'>

```cs
// 适用于中国大陆
TapLogin.Init(string clientID);

// 适用于其他国家或地区
TapLogin.Init(string clientID, bool isCn, bool roundCorner);
```

</Conditional>

<Conditional region='global'>

```cs
TapLogin.Init(string clientID, bool isCn, bool roundCorner);
```

</Conditional>

**参数说明**

参数  | 描述
| ------ | ------ |
clientID | TapTap 开发者中心对应应用的 Client ID
isCn | 中国大陆为 true，其他国家或地区为 false
roundCorner | 网页登录时边框是否使用圆角，使用圆⻆边框为 true，使用直⻆边框为 false

</>
<>

<Conditional region='cn'>

```java
// 适用于中国大陆
TapLoginHelper.init(Context context, String clientID);

// 适用于其他国家或地区
LoginSdkConfig config = new LoginSdkConfig();
config.regionType = RegionType.IO;
TapLoginHelper.init(Context context, String clientID, config);
```

</Conditional>

<Conditional region='global'>

```java
LoginSdkConfig config = new LoginSdkConfig();
config.regionType = RegionType.IO;
TapLoginHelper.init(Context context, String clientID, config);
```

</Conditional>

**参数说明**

参数  | 描述
| ------ | ------ |
context | 上下文，一般是当前 Application
clientID | TapTap 开发者中心对应应用的 Client ID

</>
<>

<Conditional region='cn'>

```objectivec
// 适用于中国大陆
[TapLoginHelper initWithClientID:clientID];

// 适用于其他国家或地区
TTSDKConfig *config = [[TTSDKConfig alloc] init];
config.regionType = RegionTypeIO;
config.roundCorner = YES;
[TapLoginHelper initWithClientID:clientID config:config];
```

</Conditional>

<Conditional region='global'>

```objectivec
TTSDKConfig *config = [[TTSDKConfig alloc] init];
config.regionType = RegionTypeIO;
config.roundCorner = YES;
[TapLoginHelper initWithClientID:clientID config:config];
```

</Conditional>

**参数说明**

参数  | 描述
| ------ | ------ |
clientID | TapTap 开发者中心对应应用的 Client ID
regionType | 适用地区。适用于中国大陆为 `RegionTypeCN`，适用于其他国家或地区为 `RegionTypeIO` 
roundCorner | 是否为圆角

**配置跳转 TapTap 应用**


用户无 TapTap 应用时，默认会打开 WebView 登录

打开 info.plist，添加如下配置，然后请替换 clientID 为你在控制台获取的 clientID

```xml
<key>CFBundleURLTypes</key>
<array>
    <dict>
        <key>CFBundleTypeRole</key>
        <string>Editor</string>
        <key>CFBundleURLName</key>
        <string>taptap</string>
        <key>CFBundleURLSchemes</key>
        <array>
            <string>tt[clientID]</string>
        </array>
    </dict>
</array>

<key>LSApplicationQueriesSchemes</key>
<array>
   <string>tapiosdk</string>
   <string>tapsdk</string>
</array>
```


如果项目中有 SceneDelegate.m，请先删除，然后添加如下代码到 AppDelegate.m 文件中。

```objectivec
#import <TapLoginSDK/TapLoginSDK.h>  
- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url sourceApplication:(NSString *)sourceApplication annotation:(id)annotation {
   return [TapLoginHelper handleTapTapOpenURL:url];
}

- (BOOL)application:(UIApplication *)app openURL:(NSURL *)url options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options {
   return [TapLoginHelper handleTapTapOpenURL:url];
}
```

并在 AppDelegate.h 中添加 UIWindow，然后删除 info.plist 里面的 Application Scene Manifest

```objectivec
@property (strong, nonatomic) UIWindow *window;
```

</>


</MultiLang>

## TapTap 登录并获取登录结果

<MultiLang>


```cs
try
{
    // 在 iOS、Android 系统下，会唤起 TapTap 客户端或以 WebView 方式进行登录
    // 在 Windows、macOS 系统下显示二维码（默认）和跳转链接（需配置）
    var accessToken = await TapLogin.Login();
    Debug.Log($"TapTap 登录成功 accessToken: {accessToken.ToJson()}");
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

// 获取 TapTap Profile  可以获得当前用户的一些基本信息，例如名称、头像。
var profile = await TapLogin.FetchProfile();
Debug.Log($"TapTap 登录成功 profile: {profile.ToJson()}");
```

```java
// 实例化监听
TapLoginHelper.TapLoginResultCallback loginCallback = new TapLoginHelper.TapLoginResultCallback() {
    @Override
    public void onLoginSuccess(AccessToken token) {
        Log.d(TAG, "TapTap authorization succeed");
        // 开发者调用 TapLoginHelper.getCurrentProfile() 可以获得当前用户的一些基本信息，例如名称、头像。
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
// 注册监听
TapLoginHelper.registerLoginCallback(loginCallback);
// 登录
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

参见[TapTap OAuth 接口文档](/sdk/taptap-login/guide/taptap-oauth/)。

## 检查登录状态和用户信息

登录状态和用户信息存在本地缓存中，重新登录将会重置，登出将会清除。

<MultiLang>

```cs
// 获取登录状态
try 
{
    var accesstoken = await TapLogin.GetAccessToken();
    Debug.Log("已登录");
    // 直接进入游戏
} 
catch (Exception e)
{
    Debug.Log("当前未登录");
    // 开始登录
}

// 获取用户信息
await TapLogin.GetProfile();

// 获取实时更新的用户信息
await TapLogin.FetchProfile();
```

```java
// 获取登录状态
TapLoginHelper.getCurrentAccessToken();

// 获取用户信息
TapLoginHelper.getCurrentProfile();

// 获取实时更新的用户信息
TapLoginHelper.fetchProfileForCurrentAccessToken(new ApiCallback<Profile>() {
  @Override
  public void onSuccess(Profile data) {

  }

  @Override
  public void onError(Throwable error) {
    
  }
});
```

```objectivec
// 获取登录状态
[TapLoginHelper currentAccessToken];

// 获取用户信息
[TapLoginHelper currentProfile];

// 获取实时更新的用户信息
[TapLoginHelper fetchProfileForCurrentAccessToken:^(TTSDKProfile *_Nonnull profile, NSError *_Nonnull error) {}];
```

</MultiLang>

## 登出

<MultiLang>

```cs
await TapLogin.Logout();
```

```java
TapLoginHelper.logout();
```

```objectivec
[TapLoginHelper logout];
```

</MultiLang>

:::tip
重要提示：在**测试登录功能前**务必完成 [配置签名证书](/sdk/start/quickstart/#配置签名证书) 和 [添加测试用户](/sdk/start/test-accounts/)，否则无法正常使用 TapTap 登录功能。
:::

## PC 登录配置

Unity SDK 自 3.5.2 起支持在 Windows、macOS 下让玩家扫码或跳转网页浏览器完成 TapTap 登录。

SDK **默认支持扫码登录**，跳转浏览器登录需要[额外配置](/sdk/taptap-login/guide/start/#pc-登录配置)。

## 升级到内建账户系统

前面说过，如果前期开发时只把「TapTap 登录」作为一个第三方渠道进行了接入，后期要使用内建账户系统，或者老的 v1.x 版本的游戏要升级到 3.x 版本并使用其他服务，这时候会有「一定的开发成本」。这里我们就来具体说说这种情况下该如何处理。

1. 首先按照前述[初始化](#初始化)和[用 TapTap OAuth 授权结果直接登录账户系统](#用-taptap-oauth-授权结果直接登录账户系统)的提示，完成内建账户系统的 TapTap 用户登录，这时候开发者可以得到一个 TDSUser 实例。

2. 然后再调用 `TapLoginHelper#getCurrentProfile` 方法获得当前授权用户的 `Profile` 信息。请注意，这里的 `Profile` 信息和游戏之前得到的 `Profile` 信息应该是完全一样的，游戏开发者应该可以据此找到游戏服务器上持久化保存的玩家信息，也可以将当前的 TDSUser 与原来的游戏玩家信息绑定在一起。对于游戏来说，最后是否需要将 TDSUser 与游戏内玩家账户进行绑定，是完全由开发者自己决定的：

    - 不绑定是可行的，因为 TapSDK 内部会缓存当前用户的登录状态，需要的时候调用 `TDSUser#currentUser` 总能得到之前登录的 TDS 账户；
    - 绑定带来的好处则是使用上更加简单，同时也可以将 TDS 账户信息扩展到更多的第三方平台。
