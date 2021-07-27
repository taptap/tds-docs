---
id: start
title: 内建账户系统
sidebar_label: 功能接入
---

import MultiLang from '@theme/MultiLang';

[快速开始](/sdk/start/quickstart/)中简单介绍了如何在游戏中加入 Tap 登录，这里详细介绍 TapSDK 的[登录功能](/sdk/taptap-login/features/)。


从 TapSDK 3.0 开始，我们在单纯的 TapTap 登录之外，还提供了一个内建账户系统供游戏使用：开发者可以直接用 TapTap OAuth 授权的结果生成一个游戏内的账号（TDSUser），然后用该账号保存更多玩家数据，同时我们也支持将更多第三方认证登录的结果绑定到该账号上来。将来 TDS 提供的更多服务和功能（例如游戏内好友、成就等），也都会基于这一账户系统来构建。

如果有游戏仅仅只需要接入「TapTap 用户登录」这一项服务，无需使用 TDS 更多功能，可以跳转到后面的章节：[单纯的 TapTap 用户认证使用方式](#单纯的-taptap-用户认证使用方式)。

## 初始化

<MultiLang>


```cs
var config = new TapConfig.Builder()
                          .ClientID("your_client_id")
                          .ClientSecret("your_client_secret")
                          .ServerURL("https://your_server_url") 
                          .RegionType(RegionType.CN)  // CN 标识国内，IO标识海外，目前暂不支持海外授权登陆。
                          .ConfigBuilder();
TapBootstrap.Init(config);
```

```java
TapConfig tdsConfig = new TapConfig.Builder()
        .withAppContext(MainActivity.this)
        .withClientId("your_client_id")
        .withClientToken("your_client_token")
        .withServerUrl("https://your_server_url")
        .withRegionType(TapRegionType.CN)  // CN 标识国内，IO标识海外，目前暂不支持海外授权登陆。
        .build();
TapBootstrap.init(MainActivity.this, tdsConfig);
```

```objectivec
TapConfig *config = [TapConfig new];
config.clientId = @"your_client_id";
config.clientToken = @"your_client_token";
config.region = TapSDKRegionTypeCN;  // CN 标识国内，IO标识海外，目前暂不支持海外授权登陆。
config.serverURL = @"https://your_server_url";
[TapBootstrap initWithConfig:config];
```

</MultiLang>

:::info
TapSDK 3.0 版本目前暂不支持海外，预计本季度部署海外节点，敬请期待。
:::

`client_id`、`client_token`、`server_url` 等信息均可在控制台查看。
详见文档关于[绑定域名](/sdk/storage/guide/setup-dotnet#绑定域名)、[应用凭证](/sdk/storage/guide/setup-dotnet#应用凭证)的说明。

## 用 TapTap OAuth 授权结果直接登录账户系统

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
        Debug.Log($"get AccessToken exception:{tapError.code} message:{tapError.message}");
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

TDS 内建账户系统除了支持直接以 TapTap 用户授权登录之外，还支持其他登录方式，例如：

## 登录资格校验

:::tip
该功能仅用于需要上线「篝火测试服」的游戏，对有登录白名单的用户进行资格校验，防止测试阶段开发包外传被利用
:::
请在登录成功的回调里调用相关API进行校验，[点击](https://www.taptap.com/campfire)了解篝火计划

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
try{
    // 通过 tdsUSer 给出用户唯一标识，如果有的话，
    var tdsUser = await TDSUser.LoginAnonymously();
}catch(Exception e){
    //登录失败
    Debug.Log($"{e.code} : {e.message}");
}
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

:::info
这里的「游客账户」，可以保证玩家在同一个设备上多次登录都得到同一个账户，但是如果玩家卸载游戏重装之后，再以「游客」身份登录则无法保证账户的唯一性。
:::

## 绑定其他第三方平台账号
游戏内经常会发生玩家先用游客身份登录，之后通过绑定第三方账号的认证结果切换到正式账号，这可以通过调用 `TDSUser#associateAuthData` 类方法完成，示例代码如下： 

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

一个 TDSUser 账号，可以绑定多个不同的第三方平台账号，并且以后通过第三方平台 OAuth 结果进行登录，也会得到同样的账号。

### 自动验证第三方平台授权信息

为了确保账户数据的有效性，TDS 云端还支持对部分平台的 access token 的有效性进行自动验证，以防止伪造账户数据。如果有效性验证不通过，在绑定或登录时云端会返回 `invalid authData` 错误，关联不会被建立。对于云端无法识别的服务，开发者需要自己去验证 access token 的有效性。
比如，注册、登录时分别通过云引擎的 `beforeSave hook`、`beforeUpdate hook` 来验证 access token 有效性。

如果希望使用这一功能，则在开始使用前，需要在 **开发者中心（游戏） > 游戏服务 > 云服务 > 数据存储 > 用户 > 设置** 配置相应平台的 **应用 ID** 和 **应用 Secret Key**。

如果不希望云端自动验证 access token，可以在 **开发者中心（游戏） > 游戏服务 > 云服务 > 数据存储 > 用户 > 设置** 里面取消勾选 **第三方登录时，验证用户 AccessToken 合法性**。


## 解绑第三方平台账号

通过调用 `TDSUser#disassociateWithAuthData` 方法可以完成当前账号与第三方平台的解绑，示例代码如下：

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
var currentUser = await TDSUser.GetCurrent();  // 获取当前登录的账户实例
currentUser["nickname"] = "打不死的青铜";
currentUser["cups"] = 256;
await currentUser.Save();
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

## 单纯的 TapTap 用户认证使用方式

如果您仅仅只需要接入「TapTap 用户登录」这一种登录方式，确认不使用 TDS 其他云服务，可以看这里的文档。请注意，如果刚开始只选择接入「TapTap 登录」，后面又需要使用其他云服务的话，后期可能有一定的升级成本。

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



### TapTap 登录并获取登陆结果

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
