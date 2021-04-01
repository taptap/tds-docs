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
1. 将 [下载](/sdk/tap-download) 的 SDK 包，导入到项目 **project** > **app** > **libs** 目录下  
2. 打开项目的 **project ** > **app** > **build.gradle** 文件，添加 gradle 配置如下  
```java  
repositories{  
    flatDir {  
        dirs 'libs'  
    }  
}  
dependencies {  
...  
    implementation (name:'TapBootstrap_2.0.0', ext:'aar')  // 必选: x.x.x 代表所下载的 SDK 的版本号
    implementation (name:'TapCommon_2.0.0', ext:'aar') // 必选: x.x.x 代表所下载的 SDK 的版本号
    implementation (name:'TapMoment_2.0.0', ext:'aar') // 必选: x.x.x 代表所下载的 SDK 的版本号

}  
```  
3. 打开 AndroidManifest.xml 添加网络权限  
```java
<uses-permission android:name="android.permission.INTERNET"></uses-permission>
```

4. 配置存储模型  
当你的 `targetSdkVersion < 29` 时，需要添加如下配置：  
- manifest 节点添加 `xmlns:tools="http://schemas.android.com/tools"`  
- application 节点添加 `tools:remove="android:requestLegacyExternalStorage"`

## 5. 初始化

TapSDK 初始化  

#### 示例代码  
```java
TapConfig tapConfig = new TapConfig.Builder()
                .withAppContext(getApplicationContext())
                .withClientId("clientId") // 开发者中心获取到的 Client ID
                .withRegionType(TapRegionType.CN) // TapRegionType.CN: 国内  TapRegionType.IO: 国外
                .build();
TapBootstrap.init(MainActivity.this, tapConfig);  
```

<!--
#### API

[TapBootstrap.init()](/api/android-tapbootstrap.md#init)  
-->

## 6. 注册登录回调
监听登录的结果  

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


#### AccessToken 使用说明
- AccessToken 包含过期时间(90 天)，过期后 SDK 会自动清除本地缓存。
- AccessToken 信息解出来之后，可以传到游戏服务端去获取用户信息，可参考 [获取用户信息](/api/service#流程)。

正确的返回 AccessToken 如下：

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
kid  | 服务端使用需要
macAlgorithm  | 固定为'hmac-sha-1'
tokenType  | 固定为'mac'
macKey  | 服务端使用需要
expireIn  | 过期时间


#### API  
[registerLoginResultListener()](/api/android-tapbootstrap.md#registerLoginResultListener)

## 7. 登录
TapTap 登录，当没有安装 TapTap app 时，会打开内置 Webview 进行 TapTap 验证登录

#### 示例代码  
可以用下面代码直接登录：  

```java
/**
 * @param activity 当前Activity
 * @param type {TapTap = 0, apple = 1, guest = 2}
 */
TapBootstrap.login(MainActivity.this, 0);
```

<!--
#### API
[login()](/api/android-tapbootstrap.md#login)  
-->

## 8. 登出

:::caution
当用户退出登录的时候请务必调用此方法执行退出功能， 避免用户信息错乱。
:::

示例代码
```java
TapBootstrap.logout();
```
