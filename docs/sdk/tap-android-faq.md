---
id: tap-android-faq
title: TapSDK Android FAQ
sidebar_label: Android
---

## 1、登陆失败?
可能有几个原因: 

a、没有在 TapTap 开发者中心开启登陆功能;

b、由于 TapTap 客户端授权登陆, 会对 Client ID、应用包名、签名文件的 MD5 进行校验, 其中任何一项配置错误都会导致登陆失败。
例如:{"status":403,"data":{"code":-1,"msg":"暂未开通","error":"forbidden","error_description":"The action forbidden."}}
原因：Client ID 没有配置正确，检查 Client ID。 由 Client ID、应用包名、签名文件的 MD5 错误导致的登陆失败是最常见的情况, 建议参考 [接入准备](/pro/pro-in)  进行检查, 该问题开发者自己就可以解决;

c、设备系统时间不准确, 此类情况大多数是因为设备的系统时间没有开启自动联网同步导致;

d、登陆功能所在的 Activity 设置横竖屏时添加 android:configChanges 属性配置, 需要在 AndroidMainfest.xml 文件中对登陆功能所在的 Activity 添加如下配置:(以横屏为例)
```xml
android:screenOrientation="landscape"
android:configChanges="orientation|keyboardHidden|screenSize|locale|uiMode|screenLayout"
```
否则会导致无法正常登陆, 登陆回调方法不会被执行.

e、登录时报 404 或者 405 
请检查 `TapConfig.Builder()` 配置，国内请配置为 TapRegionType.CN
```java
// TapSDK 初始化
TapConfig tapConfig = new TapConfig.Builder()
        .withAppContext(getApplicationContext())
        .withRegionType(TapRegionType.CN) // TapRegionType.CN: 国内  TapRegionType.IO: 国外
        .withClientId("Client ID") // TapTap开发者中心创建应用后获取对Client ID
        .build();
TapBootstrap.init(MainActivity.this, tapConfig);
```


## 2、 Android resource linking failed
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

