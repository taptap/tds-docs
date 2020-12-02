---
id: tap-fun-login
title: 登录功能
sidebar_label: 登录
---
`本文用Android API介绍登录相关功能和使用方式，iOS和unity可参考同名方法和参数即可`
## 介绍
跳转TapTap APP登录，当没有TapTap APP时，会默认打开内置webview登录

## 登录设置
您可以通过LoginSdkConfig配置您的需要的登录页面是圆角还是直角，及是否需要开启国际化等

**API:** TapSDK.enableTapLogin(LoginSdkConfig)  
**`LoginSdkConfig为可配置项，非必须`**

**示例代码**
```
TapTapSdk.LoginSdkConfig loginSdkConfig = new TapTapSdk.LoginSdkConfig();
//false：登录页面是直角，true：登录页面是圆角
loginSdkConfig.roundCorner = false;
//RegionType.IO标识为国际版，RegionType.CN为国内版
loginSdkConfig.regionType = RegionType.IO;
TapTapSdk.changeTapLoginConfig(loginSdkConfig);
```

## 登录
**API:** logInWithReadPermissions(Activity activity, String... var2)

**示例代码**
```
LoginManager.getInstance().logInWithReadPermissions(MainActivity.this, TapTapSdk.SCOPE_PUIBLIC_PROFILE);
```

## 登出
**API:** logout()  

**示例代码**
```
LoginManager.getInstance().logout();
```
