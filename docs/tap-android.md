---
id: tap-android
title: TapSDK Android快速开始
sidebar_label: Android快速开始
slug: /
---
`本文主要介绍Android如何将TapSDK快速接入并实现登录功能。TapSDK同时还包含用户数据收集和动态发布功能，详情可以参考`[数据收集](./tap-fun-db)、[动态](./tap-fun-moment)`文档介绍`

## API实现核心步骤

- 初始化[init()](#6-初始化)
- 注册回调[registerCallback()](#7-注册回调)
- 登录[logInWithReadPermissions()](#8-登录)

## 1. 登录TapTap开发者中心
请登录 [TapTap开发者中心](#) 来创建应用或注册为开发者。

## 2. 下载 TapTap 应用
[点击下载](#) TapTap 应用

## 3. 环境配置
- 最低支持Android level 14+。如需开启[OAID功能](#)，最低支持Android level 21+  

## 4. 工程导入
1. 将[下载](#)的SDK包，导入到 '/project/app/libs/' 目录下  
2. 打开您工程的 '/project/app/build.gradle' 文件，添加gradle配置如下  
```java  
repositories{  
    flatDir {  
        dirs 'libs'  
    }  
}  
dependencies {  
...  
    implementation (name:'TapSDK_1.0', ext:'aar')  
}  
```  
## 5. 编辑资源清单
1. 打开您的 /app/res/values/strings.xml 文件  
2. 添加如下所示的代码：

```java
 <string name="tap_client_id">[your client id]</string>
```
**注意: ** tap_client_id是您从[TapTap开发者中心](#)控制台获取到的Client Id
## 6. 初始化
TapSDK初始化  
**API**    [TdsInitializer.init()](./tap-api.md#init)  

**示例代码**  
```java
TdsConfig tdsConfig = new TdsConfig.Builder()
                .appContext(MainActivity.this)
                .clientId(getResources().getString(R.string.tap_client_id))//开发者中心获取到的client Id
                .build();
TdsInitializer.init(tdsConfig);  
```

## 7. 注册回调
监听登录的结果  
**API**  [registerCallback()](./tap-api.md#registercallback)

**示例代码**
```java
CallBackManager callbackManager = CallBackManager.Factory.create();
LoginManager.getInstance().registerCallback(callbackManager, new TapTapLoginCallback<LoginResponse>() {
    @Override
    public void onSuccess(LoginResponse loginResponse) {
        Log.e(Tag, "Login-onSuccess");
        startGame();
    }

    @Override
    public void onCancel() {
        Log.e(Tag, "Login-onCancel");
    }

    @Override
    public void onError(Throwable throwable) {
        Log.e(Tag, "Login-onError: " + throwable.getMessage());
    }
});
```

## 8. 登录
TapTap登录，当没有安装TapTap app时，会打开内置webview进行TapTap验证登录  
**API**  [logInWithReadPermissions()](./tap-api.md#loginwithreadpermissions)

**示例代码**  
可以用下面代码直接登录：
```java
LoginManager.getInstance().logInWithReadPermissions(MainActivity.this, TapTapSdk.SCOPE_PUIBLIC_PROFILE);
```

也可以先校验该用户是否登录过，对未登录的用户调用login()
```java
private void checkLogin() {
//未登录用户会回调onError，已经登录用户实时回调onSuccess
Profile.fetchProfileForCurrentAccessToken(new Api.ApiCallback<Profile>() {
    @Override
    public void onSuccess(Profile data) {
        Log.e(Tag, "checkLogin-onSuccess");
        startGame();
    }

    @Override
    public void onError(Throwable error) {
        Log.e(Tag, "checkLogin-onError");
        LoginManager.getInstance().logInWithReadPermissions(MainActivity.this, TapTapSdk.SCOPE_PUIBLIC_PROFILE);
    }
});
}
```


## 6. simple code
从[这里](#)可以下载到快速开始Demo  
