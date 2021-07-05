---
id: tap-android-faq
title: TapSDK Android FAQ
sidebar_label: Android
---

## 登录失败
可能有以下几个原因: 

1. 没有在 TapTap 开发者中心开启登录功能；

2. 由于 TapTap 客户端授权登录，会对 Client ID、应用包名、签名文件的 MD5 进行校验, 其中任何一项配置错误都会导致登录失败。
例如:{"status":403,"data":{"code":-1,"msg":"暂未开通","error":"forbidden","error_description":"The action forbidden."}}
原因：Client ID 没有配置正确，检查 Client ID。 由 Client ID、应用包名、签名文件的 MD5 错误导致的登录失败是最常见的情况，建议参考 [接入准备](/sdk/start/get-ready)  进行检查，该问题开发者自己就可以解决；

3. 设备系统时间不准确，此类情况大多数是因为设备的系统时间没有开启自动联网同步导致；

4. 登录功能所在的 Activity 设置横竖屏时添加 android:configChanges 属性配置，需要在 AndroidMainfest.xml 文件中对登陆功能所在的 Activity 添加如下配置(以横屏为例)：
```xml
android:screenOrientation="landscape"
android:configChanges="orientation|keyboardHidden|screenSize|locale|uiMode|screenLayout"
```
否则会导致无法正常登录, 登录回调方法不会被执行.

5. 登录时报 404 或者 405 
请检查 `TapConfig.Builder()` 配置，中国大陆请配置为 `TapRegionType.CN`
```java
// TapSDK 初始化
TapConfig tapConfig = new TapConfig.Builder()
        .withAppContext(getApplicationContext())
        .withRegionType(TapRegionType.CN) // TapRegionType.CN: 中国大陆  TapRegionType.IO: 国际
        .withClientId("Client ID") // TapTap开发者中心创建应用后获取对Client ID
        .withClientSecret("Client Token") // TapTap开发者中心创建应用后获取对Client Token
        .build();
TapBootstrap.init(MainActivity.this, tapConfig);
```


## Android resource linking failed
error: attribute android:requestLegacyExternalStorage not found.  
error: failed processing manifest.

原因：  
SDK 内部默认配置了 android:requestLegacyExternalStorage = true  
当 targetSdkVersion < 29 时会报这个错误  
解决：  
方法一、设置 targetSdkVersion = 29  
方法二、targetSdkVersion < 29 时  
manifest 节点配置 `xmlns:tools="http://schemas.android.com/tools"`  
application 节点配置 `tools:remove="android:requestLegacyExternalStorage"`

## 「抱歉，该游戏/应用暂未开放」

该异常提示主要是开发者未在控制台的「测试用户管理」中添加用户导致。如何添加测试用户，详情请参考[「测试用户管理」](https://developer.taptap.com/v2-doc/sdk/pro-in#%E4%B8%89%E3%80%81%E6%B5%8B%E8%AF%95%E7%94%A8%E6%88%B7%E7%AE%A1%E7%90%86)。

![](/img/tap_android_test.png)