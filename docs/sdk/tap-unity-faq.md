---
id: tap-unity-faq
title: TapSDK Unity FAQ
sidebar_label: Unity
---

## 1、登陆失败?
可能有几个原因: 

a、没有在 TapTap 开发者中心开启登陆功能;

b、由于 TapTap 客户端授权登陆, 会对 Android 应用的 Client ID、应用包名、签名文件的 MD5 进行校验; iOS 应用的 Client ID 和 BundleID 进行校验, 其中任何一项配置错误都会导致登陆失败。

c、登录时报 404 或者 405 
请检查 `TapConfig` 的区域配置，中国大陆请配置为 true
```c#
TapConfig tapConfig = new TapConfig("FwFdCIr6u71WQDQwQN", true);
TapBootstrap.Init(tapConfig);
```

## 2、The type or namespace name 'TapSDK' could not be found
不需要手动引入命名空间 using TapSDK; 直接使用就可以，详情参考 [快速开始](/sdk#初始化) 的用法

## 3、打开动态页面出现视频声音跟游戏声音重合
请在 `openTapMoment` 调用时，主动屏蔽游戏声音

## 4、点击动态后小红点未消失
OpenMoment 后会刷新动态，小红点逻辑需要游戏手动根据 FetchNotification 来改变
