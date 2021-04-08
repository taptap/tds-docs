---
id: tap-android
title: TapSDK Android 快速开始
sidebar_label: Android
slug: /sdk
---
本文主要介绍 Android 如何将 TapSDK 快速接入并实现登录功能。

:::note
如需通过示例项目了解如何在 Android 应用中集成 TapSDK，请参阅 [下载](/sdk/tap-download) 页面中的示例项目。
:::

## 1. 登录 TapTap 开发者中心
请登录 [TapTap 开发者中心](https://developer.taptap.com/) 来创建应用或注册为开发者。

## 2. 下载 TapTap 应用
点击下载 [TapTap 应用](https://www.taptap.com/mobile)。

## 3. 环境要求
- 最低支持 Android level 21+。

## 4. 工程配置
<!-- ### 方法一、自动加载
打开并修改 '/project/app/build.gradle' 文件
```java
dependencies {
   implementation 'com.tds.tapsdk:TapSDK:1.0.0'
}
```   -->
<!-- ### 方法二、手动添加 -->
1. 将 [下载](/sdk/tap-download) 的 SDK 包，导入到项目 **project** > **app** > **libs** 目录下。
 
2. 打开项目的 **project ** > **app** > **build.gradle** 文件，添加 gradle 配置如下：
    
    ```java
    repositories{  
        flatDir {  
            dirs 'libs'  
        }  
    }  
    }  
    dependencies {  
    ...  
        implementation (name:'TapBootstrap_2.0.0', ext:'aar')  // 必选: x.x.x 代表所下载的 SDK 的版本号
        implementation (name:'TapCommon_2.0.0', ext:'aar') // 必选: x.x.x 代表所下载的 SDK 的版本号
        implementation (name:'TapMoment_2.0.0', ext:'aar') // 必选: x.x.x 代表所下载的 SDK 的版本号
    }  
    ```
 
3. 打开 `AndroidManifest.xml` 添加网络权限：
   
    ```java
    <uses-permission android:name="android.permission.INTERNET"></uses-permission>
    ```

4. 配置存储模型

    如果 `targetSdkVersion < 29`，还需要添加如下配置：  

    - manifest 节点添加 `xmlns:tools="http://schemas.android.com/tools"`  
    - application 节点添加 `tools:remove="android:requestLegacyExternalStorage"`

## 5. 初始化

调用 [TapBootstrap.init()](/api/android-tapbootstrap.md#init) 方法，传入应用配置信息，即可初始化 TapSDK：
 
```java
TapConfig tapConfig = new TapConfig.Builder()
                .withAppContext(getApplicationContext())
                .withClientId("clientId") // 开发者中心获取到的 Client ID
                .withRegionType(TapRegionType.CN) // TapRegionType.CN: 国内  TapRegionType.IO: 国外
                .build();
TapBootstrap.init(MainActivity.this, tapConfig);  
```

## 6. 注册登录回调

调用 [registerLoginResultListener()](/api/android-tapbootstrap.md#registerLoginResultListener) 监听登录的结果：

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

### AccessToken 使用说明

- AccessToken 过期时间为 90 天，过期后 SDK 会自动清除本地缓存。
- AccessToken 可以传到游戏服务端去获取用户信息，参见 [获取用户信息](/api/service#流程)。

AccessToken 示例：

```cs
{
  "accessToken":"accessToken",
  "kid":"kid",
  "macAlgorithm":"macAlgorithm",
  "tokenType":"tokenType",
  "macKey":"macKey",
  "expireIn" :7776000
}
```

#### 参数说明
参数  | 描述
| ------ | ------ |
accessToken | 用户登录后的凭证
kid  | 当前实际返回的 kid 和 accessToken 值相等，建议使用 accessToken
macAlgorithm  | 固定为 `hmac-sha-1`
tokenType  | 固定为 `mac`
macKey  | mac 密钥
expireIn  | 过期时间


## 7. 登录

### 检查登录状态

```java
// 未登录用户会返回 null
if (TapBootstrap.getCurrentToken() == null) {
    //TODO 用户未登录
} else {
    //TODO 用户已经登录过
}
```

### 登录

```java
/**
 * @param activity 当前Activity
 * @param @param type like {LoginType.TAPTAP, LoginType.APPLE, LoginType.GUEST}
 */
TapBootstrap.login(MainActivity.this, LoginType.TAPTAP);
```

<!--
#### API
[login()](/api/android-tapbootstrap.md#login)  
-->

## 8. 登出

:::caution
当用户退出登录的时候请务必调用此方法执行退出功能， 避免用户信息错乱。
:::

```java
TapBootstrap.logout();
```
