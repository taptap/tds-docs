---
id: android-loginhelper
title: TapLoginHelper
slug: /android-loginhelper
---
## method


### changeTapLoginConfig

登录配置功能。LoginSdkConfig为可配置项，非必须  

#### API

```java
changeTapLoginConfig(TapTapSdk.LoginSdkConfig var0);
```

#### 示例代码

```java
TapTapSdk.LoginSdkConfig loginSdkConfig = new TapTapSdk.LoginSdkConfig();
//false：登录页面是直角，true：登录页面是圆角
loginSdkConfig.roundCorner = false;
//RegionType.IO标识为国际版，RegionType.CN为国内版
loginSdkConfig.regionType = RegionType.CN;
TapLoginHelper.changeTapLoginConfig(loginSdkConfig);
```

### registerLoginCallback

设置TapSDK的登录回调监听  

#### API  

```java
public static void registerLoginCallback(TapLoginHelper.TapLoginResultCallback loginResultCallback);
```

#### 示例代码

```java
TapLoginHelper.registerLoginCallback(new TapLoginResultCallback() {
     @Override
     public void onLoginSuccess(AccessToken accessToken) {
         Log.e("MainActivity", "onLoginSuccess" + "" + accessToken);
     }

     @Override
     public void onLoginCancel() {
         Log.e("MainActivity", "onLoginCancel" + "");
     }

     @Override
     public void onLoginError(com.taptap.sdk.AccountGlobalError accountGlobalError) {
         Log.e("MainActivity", "onLoginError" + " " + accountGlobalError.toJsonString());
     }
 });
```

### startTapLogin

登录

#### API

```java
public void startTapLogin(Activity activity, String... var2);
```

#### 示例代码

```java
 TapLoginHelper.startTapLogin(MainActivity.this,TapTapSdk.SCOPE_PUIBLIC_PROFILE);
```

#### API

调用该接口会触发[registerLoginCallback](#registerlogincallback)回调

| 类别   | 回调方法                                             |
| ---- | ------------------------------------------------ |
| 登录成功 | void OnLoginSucceed(LoginResponse loginResponse) |
| 登录失败 | void onError(Throwable throwable)                |
| 登录取消 | void onCancel()                                  |

### logout

登出

#### API

```java
public static void logout();
```

#### 示例代码

```java
TapLoginHelper.logout();
```

### getCurrentAccessToken

获取用户登录信息

#### API

```java
public static AccessToken getCurrentAccessToken();
```

#### 示例代码

```java
AccessToken accessToken =  TapLoginHelper.getCurrentAccessToken();
```

### getCurrentProfile

return com.taptap.sdk.Profile;

#### API

```java
public static Profile getCurrentProfile();
```

#### 示例代码

```java
Profile profile = TapLoginHelper.getCurrentProfile();
```

### fetchProfileForCurrentAccessToken

#### API

```java
public static void fetchProfileForCurrentAccessToken(Api.ApiCallback<Profile>);
```

#### 示例代码

```java
TapLoginHelper.fetchProfileForCurrentAccessToken(new Api.ApiCallback<Profile>() {
            @Override
            public void onSuccess(Profile profile) {
                Log.e(Tag, "checkLogin-onSuccess");
                //TapDB会用到
                String openId = Profile.getCurrentProfile().getOpenid();
                startGame();
            }

            @Override
            public void onError(Throwable throwable) {
                login();
            }
        });
```
