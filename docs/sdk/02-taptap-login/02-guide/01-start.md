---
id: start
title: TapTap 登录与内建账户系统
sidebar_label: 功能接入
---

import MultiLang from '@theme/MultiLang';

[快速开始](/sdk/start/quickstart)中简单介绍了[如何在游戏中加入 Tap 登录](/sdk/start/quickstart#taptap-登录)，这里详细介绍 TapSDK 的[登录功能](/sdk/taptap-login/features)。


## 登录

如果开发者在游戏中同时接入了多家第三方（例如支持苹果、微信、Facebook 等账户登录），只把 TapTap 当成一个普通的登录渠道，那么在客户端可以只依赖 `TapTapLogin` 这一个模块，并按照如下的流程来接入：

### 初始化

<MultiLang>


```cs

```

```java
TapLoginHelper.init(applicationContext, clientId);
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

### 开始 TapTap 登录

<MultiLang>


```cs

```

```java
TapLoginHelper.TapLoginResultCallback loginCallback = new TapLoginHelper.TapLoginResultCallback() {
      @Override
      public void onLoginSuccess(com.taptap.sdk.AccessToken token) {
        logger.i("TapTap authorization succeed");
        // 开发者调用 TapLoginHelper.getCurrentProfile() 可以获得当前用户的一些基本信息，例如名称、头像、性别。
        Profile profile = TapLoginHelper.getCurrentProfile();
      }

      @Override
      public void onLoginCancel() {
        logger.w("TapTap authorization cancelled");
      }

      @Override
      public void onLoginError(AccountGlobalError globalError) {
        logger.w("TapTap authorization failed. cause: " + globalError.getMessage());
      }
    };
    TapLoginHelper.registerLoginCallback(loginCallback);
    TapLoginHelper.startTapLogin(activity, permissions);
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

## TDS 内建账户系统

从 TapSDK 3.0 开始，我们在单纯的 TapTap 登录之外，还提供了一个内建账户系统供游戏使用：开发者可以直接用 TapTap OAuth 授权的结果生成一个游戏内的账号（TDSUser），然后用该账号保存更多玩家数据。同时，我们也支持将更多第三方认证登录的结果绑定到这一账号上来（以及后续的解绑操作）。

### 初始化
如果要使用内建账户系统，开发者必须至少依赖 `TapBootstrap` 模块，并按照如下方式完成初始化：
<MultiLang>


```cs

```

```java
TapDBConfig tapDBConfig = new TapDBConfig();
tapDBConfig.setGameVersion("{your game version}");
tapDBConfig.setChannel("{current channel}");
TapConfig tdsConfig = new TapConfig.Builder()
        .withAppContext(MainActivity.this)
        .withTapDBConfig(tapDBConfig)
        .withClientId("{your client id}")
        .withClientToken("{your client token}}")
        .withServerUrl("{your server url}}")
        .withRegionType(TapRegionType.CN)
        .build();
TapBootstrap.init(MainActivity.this, tdsConfig);
```

```objectivec

```

</MultiLang>

### 用 TapTap OAuth 授权结果直接登录账户系统

<MultiLang>


```cs

```

```java
TapBootstrap.loginWithTapTap(MainActivity.this, new Callback<TDSUser>() {
    @Override
    public void onSuccess(TDSUser resultUser) {
        Toast.makeText(MainActivity.this, "succeed to login with Taptap.", Toast.LENGTH_SHORT).show();
        // 开发者可以调用 resultUser 的方法获取更多属性。
        String userId = resultUser.getObjectId();
        String userName = resultUser.getUsername();
        String avatar = resultUser.get("avatar");
    }

    @Override
    public void onFail(TapError error) {
        Toast.makeText(MainActivity.this, error.getMessage(), Toast.LENGTH_SHORT).show();
    }
}, "public_profile");
```

```objectivec

```

</MultiLang>


:::info
对于 `TDSUser`， 我们还支持一些其他操作，例如：
:::

### 游客登录
内建账户系统支持游戏创建一个游客账号，其调用示例如下：

<MultiLang>


```cs

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

```

</MultiLang>

### 绑定其他第三方平台账号
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
currentUser.associateWithAuthData(authData, "weixin").subscribe(new Observer<TDSUser>() {
  @Override
  public void onSubscribe(Disposable disposable) {

  }

  @Override
  public void onNext(TDSUser resultUser) {
    // 绑定成功
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

```

</MultiLang>


### 解绑第三方平台账号
<MultiLang>


```cs
// 与微信账户解除绑定
await currentUser.DisassociateWithAuthData("weixin");
```

```java
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

```

</MultiLang>


### 设置其他属性并保存
开发者可以使用内建账户系统保存更多玩家的信息，例如当前玩家的昵称、获得奖杯数等，示意代码如下：

<MultiLang>


```cs

```

```java
currentUser.put("nickname", "打不死的青铜");
currentUser.put("cups", 256);
currentUser.saveInBackground().subscribe(new Observer<TDSUser>() {
  @Override
  public void onSubscribe(Disposable disposable) {

  }

  @Override
  public void onNext(TDSUser resultUser) {
    // 保存成功，currentUser 的属性得到更新。
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

```

</MultiLang>

### 登出当前账户
账户的登出非常简单，调用 `logOut` 方法即可。

<MultiLang>


```cs

```

```java
currentUser.logOut().
```

```objectivec

```

</MultiLang>

### 检查登录状态
`TDSUser` 会在本地缓存当前用户的登录信息，所以如果一个玩家在游戏内登录之后，下次启动用户通过调用 `TDSUser#currentUser` 可以得到之前登录的账户实例，此时玩家无需再次登录即可使用。
如果玩家在游戏内进行了登出，则本地缓存的登录信息也会被删除，下次进入游戏时 `TDSUser#currentUser` 会返回一个 null 对象。

### 一些疑问
#### TapSDK 1.x 可以直接升级到 TapSDK 3.0 吗？
可以。

#### 如果游戏之前是接入 TapSDK 2.x 版本完成的 TapTap 登录，可以直接升级到 TapSDK 3.0 吗？
在 TapSDK 2.x 中，TapTap 登录是调用 TapBootstrap 的 API 完成的，其示例如下：
```java
TapBootstrap.registerLoginResultListener(new TapLoginResultListener() {
    @Override
    public void loginSuccess(AccessToken accessToken) {
        Log.d(TAG, "onLoginSuccess: " + accessToken.toJSON());
        TapBootstrap.getUser(new Callback<TapUser>() {
            @Override
            public void onSuccess(TapUser tapUser) {
                // 通过 tapUser 获取到当前登录用户的 ID、昵称、头像等基本信息
            }

            @Override
            public void onFail(TapError tapError) {

            }
        });
    }

    @Override
    public void loginFail(TapError tapError) {
        Log.d(TAG, "onLoginError: " + tapError.toJSON());
    }

    @Override
    public void loginCancel() {
        Log.d(TAG, "onLoginCancel");
    }
});
TapBootstrap.login(MainActivity.this, LoginType.TAPTAP, "public_profile");
```

由于我们把登录接口做了调整，在 3.0 版本的 SDK 中开发者可以通过 `TapBootstrap#loginWithTapTap` 一次调用直接得到登录用户信息：

```java
TapBootstrap.loginWithTapTap(MainActivity.this, new Callback<TDSUser>() {
    @Override
    public void onSuccess(TDSUser resultUser) {
        Toast.makeText(MainActivity.this, "succeed to login with Taptap.", Toast.LENGTH_SHORT).show();
        // 开发者可以调用 resultUser 的方法获取更多属性。
        String userId = resultUser.getObjectId();
        String userName = resultUser.getUsername();
        String avatar = resultUser.get("avatar");
    }

    @Override
    public void onFail(TapError error) {
        Toast.makeText(MainActivity.this, error.getMessage(), Toast.LENGTH_SHORT).show();
    }
}, "public_profile");
```

不过这需要我们后端做一些调整，计划在 3.2 版本中支持 2.x 游戏直接升级使用。
