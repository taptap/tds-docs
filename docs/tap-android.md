---
id: tap-android
title: TapSDK Android快速开始
sidebar_label: Android
slug: /
---

本文主要介绍Android如何将TapSDK快速接入并实现登录功能。TapSDK同时还包含用户数据收集和动态发布功能，详情可以参考[数据收集](./tap-fun-db)、[动态](./tap-fun-moment)文档介绍  

export const Highlight = ({children, color}) => (
  <span
    style={{
      backgroundColor: color,
      borderRadius: '4px',
      color: '#fff',
      padding: '0.2rem',
    }}>
    {children}
  </span>
);

<Highlight color="#f9422f">⚠️注意：</Highlight>  

在接入前请确保您已经仔细阅读过[TapSDK注意事项](./tap-issue.md)，以方便您能更加顺利接入



:::note
如需通过示例项目了解如何在 Android 应用中集成 TapSDK，请参阅 GitHub 中的 [TapSDKSample](https://github.com/xindong/TapSDKDemoAndroid)。
:::


## 1. 登录TapTap开发者中心
请登录 [TapTap开发者中心](https://www.taptap.com/developer-center) 来创建应用或注册为开发者。

## 2. 下载 TapTap 应用
点击下载 [TapTap 应用](#)

## 3. 环境要求
- 最低支持Android level 21+。

## 4. 工程配置
<!-- ### 方法一、自动加载
打开并修改 '/project/app/build.gradle' 文件
```java
dependencies {
   implementation 'com.tds.tapsdk:TapSDK:1.0.0'
}
```   -->
<!-- ### 方法二、手动添加 -->
1. 将[下载](#)的SDK包，导入到 **your project** > **app** > **libs** 目录下  
2. 打开您工程的 **your project ** > **app** > **build.gradle** 文件，添加gradle配置如下  
```java  
repositories{  
    flatDir {  
        dirs 'libs'  
    }  
}  
dependencies {  
...  
    implementation (name:'TapSDK_x.x.x', ext:'aar')  // 必选: x.x.x 代表所下载的 SDK的版本号
    implementation (name:'TDSCommon_x.x.x', ext:'aar') // 必选:x.x.x 代表所下载的 SDK的版本号
    implementation (name:'oaid_sdk_x.x.x', ext:'aar')  // 可选: 使用 TapDB 数据分析功能必选， 以获得更精准的统计
}  
```  
3. 打开AndroidManifest.xml添加网络权限  
```java
<uses-permission android:name="android.permission.INTERNET"></uses-permission>
```

## 5. 初始化

TapSDK初始化  

#### 示例代码  
```java
TdsConfig tdsConfig = new TdsConfig.Builder()
                .appContext(Activity)
                .clientId(your cient id)//开发者中心获取到的client Id
                .build();
TdsInitializer.init(tdsConfig);  
```

#### API

[TdsInitializer.init()](./api/android-initializer.md#init)  

## 6. 注册登录回调
监听登录的结果  

#### 示例代码
```java
TapLoginHelper.registerLoginCallback(new TapLoginResultCallback() {
     @Override
     public void onLoginSuccess(AccessToken accessToken) {
         Log.e(TAG, "onLoginSuccess" + "" + accessToken);
     }

     @Override
     public void onLoginCancel() {
         Log.e(TAG, "onLoginCancel" + "");
     }

     @Override
     public void onLoginError(com.taptap.sdk.AccountGlobalError accountGlobalError) {
         Log.e(TAG, "onLoginError" + " " + accountGlobalError.toJsonString());
     }
 });
```

#### API  
[registerLoginCallback()](./api/android-loginhelper.md#registerlogincallback)

## 7. 登录
TapTap登录，当没有安装TapTap app时，会打开内置webview进行TapTap验证登录

#### 示例代码  
可以用下面代码直接登录：  

```java
TapLoginHelper.startTapLogin(MainActivity.this,TapTapSdk.SCOPE_PUIBLIC_PROFILE);
```
#### API
[startTapLogin()](./api/android-loginhelper.md#starttaplogin)  

## 8. 登出
可以先校验该用户是否登录过，对未登录的用户调用login()  
:::caution
当用户退出登录的时候请务必调用此方法执行退出功能， 避免用户信息错乱。
:::
调用`TapLoginHelper.logout()` 实现登出功能。
