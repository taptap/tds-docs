---
id: android-tapbootstrap
title: TapBootstrap
---
## method

TapSDK 核心组建，负责 SDK 初始化和功能开启

### init

初始化 SDK

#### API  

```java
public static void init(Activity activity, TapConfig tapConfig);
```

#### 示例代码

```java
TapConfig tapConfig = new TapConfig.Builder()
                .withAppContext(getApplicationContext())
                .withClientId("client Id")
                .build();
TapBootStrap.init(MainActivity.this, tapConfig);
```

**TapConfig 参数说明**  

| 参数         | 可选  | 备注                |
| :--------- | :-- | :---------------- |
| context   | 否   | 上下文 |
| clientId | 否   | 开发者中心获取的 client Id |

### isInitialized

是否完成初始化

#### API  

```java
public static void isInitialized(Callback<TapSdkInitResult> callback);
```

#### 示例代码

```java
TapBootStrap.isInitialized(new Callback<TapSdkInitResult>() {
    @Override
    public void onSuccess(TapSdkInitResult tapSdkInitResult) {
        // 初始化成功
    }

    @Override
    public void onFail(TapError tapError) {
        // 初始化失败
    }
});
```

### registerLoginResultListener

是否完成初始化

#### API  

```java
public static void registerLoginResultListener(TapLoginResultListener loginResultListener);
```

#### 示例代码

```java
TapBootStrap.registerLoginResultListener(new TapLoginResultListener() {
    @Override
    public void loginSuccess(AccessToken accessToken) {
        Log.d(TAG, "onLoginSuccess: " + accessToken.toJSON());
    }

    @Override
    public void loginFail(TapError tapError) {
        Log.d(TAG, "onLoginError: " + tapError.getMessage());
    }

    @Override
    public void loginCancel() {
        Log.d(TAG, "onLoginCancel");
    }
});
```

### login

登陆

#### API  

```java
/**
 * @param type like {TapTap = 0, apple = 1, guest = 2}
 */
public static void login(Activity activity, int type, String... permissions);
```
** 参数说明 **

| 字段         | 可为空 | 说明               |
| ---------- | --- | ---------------- |
| activity | 否   | 当前Activity |
| type   | 否   | 登陆类型：0 表示TapTap登陆, 1 表示苹果登陆, 2 表示游客登陆      |

#### 示例代码

```java
// 使用TapTap登陆
TapBootStrap.login(MainActivity.this, 0);
```

### registerUserStatusChangedListener

监听用户切换账号

#### API  

```java
 // 注册一次即可，多次注册以最后一次为准 
 public static void registerUserStatusChangeListener(TapUserStatusChangedListener listener);
```

#### 示例代码

```java
TapBootStrap.registerUserStatusChangeListener(new TapUserStatusChangedListener() {
    @Override
    public void onLogout(TapError tapError) {
    
    }

    @Override
    public void onBind(TapError tapError) {

    }
});
```


### getUser / getUserDetails

获取用户登录信息

#### API  

```java
 public static void getUser(Callback<TapUser> user);
 public static void getUserDetails(Callback<TapUserDetails> userDetails);
```

#### 示例代码

```java
TapBootStrap.getUser(new Callback<TapUser>() {
    @Override
    public void onSuccess(TapUser tapUser) {
                
    }

    @Override
    public void onFail(TapError tapError) {

    }
});

TapBootStrap.getUserDetails(new Callback<TapUserDetails>() {
    @Override
    public void onSuccess(TapUserDetails tapUserDetails) {
                
    }

    @Override
    public void onFail(TapError tapError) {

    }
});
```


### getCurrentToken

获取用户登录后的Token信息

#### API  

```java
 public static AccessToken getCurrentToken;
```

#### 示例代码

```java
TapBootStrap.getCurrentToken();
```

### openUserCenter

打开用户中心

#### API  

```java
 public static void openUserCenter(Activity activity);

```

#### 示例代码

```java
TapBootStrap.openUserCenter(MainActivity.this);
```


### setPreferredLanguage

国际化语言设置

#### API  

```java
public static void void setPreferredLanguage(@TapLanguageType language);
```
** 参数说明 **

| 字段         | 可为空 | 说明               |
| ---------- | --- | ---------------- |
| language   | 否   | 语言类型：TapLanguageType.AUTO 自动, TapLanguageType.ZH_HANS, 简体中文, TapLanguageType.EN 2英文 |

#### 示例代码

```java
TapBootStrap.setPreferredLanguage(TapLanguageType.ZH_HANS);
```


### logout

登出

#### API  

```java
public static void logout();

```

#### 示例代码

```java
TapBootStrap.logout();
```