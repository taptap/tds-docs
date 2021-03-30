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

