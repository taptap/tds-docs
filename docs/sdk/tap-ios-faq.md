---
id: tap-ios-faq
title: TapSDK iOS FAQ
sidebar_label: iOS
---

## 1、登陆失败?
可能有几个原因: 

a、没有在 TapTap 开发者中心开启登陆功能;

b、由于 TapTap 客户端授权登陆, 会对 Client ID、BundleID 进行校验, 其中任何一项配置错误都会导致登陆失败。

c、登录时报 404 或者 405 
请检查 `TapConfig` 的区域配置，国内请配置为 TapSDKRegionTypeCN
```c#
// TapSDK 初始化
TapConfig *config = TapConfig.new;
config.clientId = @"clientId";
config.region = TapSDKRegionTypeCN;
[TapBootstrap initWithConfig:config];
```

## 2、registerLoginCallback 代理无法回调
检查一下 client ID 设置，info.plist 和初始化代码里面保持一致

## 3、[UIWindow tds_topWindow]: unrecognized selector sent to class 0xxxxxxxx
到 Build Setting --> Other Linker Flags 添加 - ObjC
![](/img/tap_ios_003.png)

## 4、ld: symbol(s) not found for architecture arm64 clang: error: linker command failed with exit code 1 (use -v to see invocation)
到这个位置，再检查一遍包导入情况

![](/img/tap_ios_faq_libc.png)
