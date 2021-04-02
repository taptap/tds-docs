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
                .withClientId("clientId")
                .withRegionType(TapRegionType.CN) 
                .build();
TapBootstrap.init(MainActivity.this, tapConfig);
```

**TapConfig 参数说明**  

| 参数         | 可选  | 备注                |
| :--------- | :-- | :---------------- |
| context   | 否   | 上下文 |
| clientId | 否   | 开发者中心获取的 Client ID |
| regionType   | 否   | 区域类型 TapRegionType.CN 表示国内，TapRegionType.IO 表示国外|

### isInitialized

是否完成初始化

#### API  

```java
public static boolean isInitialized();
```

#### 示例代码

```java
boolean isInited = TapBootstrap.isInitialized();
```

### registerLoginResultListener

注册登录回调

#### API  

```java
public static void registerLoginResultListener(TapLoginResultListener loginResultListener);
```

#### 示例代码

```java
TapBootstrap.registerLoginResultListener(new TapLoginResultListener() {
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
TapBootstrap.login(MainActivity.this, 0);
```

### registerUserStatusChangedListener

监听用户账号的登陆状态

#### API  

```java
 // 注册一次即可，多次注册以最后一次为准 
 public static void registerUserStatusChangeListener(TapUserStatusChangedListener listener);
```

#### 示例代码

```java
TapBootstrap.registerUserStatusChangeListener(new TapUserStatusChangedListener() {
    @Override
    public void onLogout(TapError tapError) {
        // 如果是因为出错导致的退登，则返回错误信息
    }

    @Override
    public void onBind(TapError tapError) {
        
    }
});
```


### getUser / getUserDetails

获取用户 基本 / 详细 登录信息

#### API  

```java
 public static void getUser(Callback<TapUser> user);
 public static void getUserDetails(Callback<TapUserDetails> userDetails);
```

#### 示例代码

```java
TapBootstrap.getUser(new Callback<TapUser>() {
    @Override
    public void onSuccess(TapUser tapUser) {
                
    }

    @Override
    public void onFail(TapError tapError) {

    }
});

TapBootstrap.getUserDetails(new Callback<TapUserDetails>() {
    @Override
    public void onSuccess(TapUserDetails tapUserDetails) {
                
    }

    @Override
    public void onFail(TapError tapError) {

    }
});
```


### getCurrentToken

获取用户登录后的 Token 信息

#### API  

```java
 public static AccessToken getCurrentToken;
```

#### 示例代码

```java
TapBootstrap.getCurrentToken();
```

### openUserCenter

打开用户中心

#### API  

```java
 public static void openUserCenter(Activity activity);
```

#### 示例代码

```java
TapBootstrap.openUserCenter(MainActivity.this);
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
| language   | 否   | 语言类型：TapLanguageType.AUTO 自动, TapLanguageType.ZH_HANS, 简体中文, TapLanguageType.EN 英文 |

#### 示例代码

```java
TapBootstrap.setPreferredLanguage(TapLanguageType.ZH_HANS);
```


### logout

登出

#### API  

```java
public static void logout();
```

#### 示例代码

```java
TapBootstrap.logout();
```

## 错误码
| 字段          | code | 说明       |
| ----------- | --- | -------- |
|   ERROR_CODE_UNDEFINED     | 80000    | 未定义   |
| ERROR_CODE_UNINITIALIZED     | 80001    |  未初始化   |
| ERROR_CODE_LOGOUT_INVALID_LOGIN_STATE      | 80004    | token失效    |
|ERROR_CODE_LOGOUT_KICKED     | 80007     | 账号被踢     |