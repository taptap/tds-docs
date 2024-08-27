---
title: TapSDK iOS FAQ
---

<head>
  <meta name="robots" content="noindex" />
</head>

## 登录失败
可能有几个以下原因：

1. 没有在 TapTap 开发者中心开启登录功能；

2. 由于 TapTap 客户端授权登录，会对 `Client ID`、`BundleID` 进行校验，其中任何一项配置错误都会导致登录失败。

3. 登录时报 404 或者 405 
请检查 `TapConfig` 的区域配置，中国大陆请配置为 `TapSDKRegionTypeCN`。
```c#
// TapSDK 初始化
TapConfig *config = TapConfig.new;
config.clientId = @"clientId";
config.clientSecret=@"clientSecret";// 开发者中心对应 Client Token
config.region = TapSDKRegionTypeCN;
[TapBootstrap initWithConfig:config];
```

## registerLoginCallback 代理无法回调
检查一下 client ID 设置，info.plist 和初始化代码里面保持一致。

## [UIWindow tds_topWindow]: unrecognized selector sent to class 0xxxxxxxx
到 Build Setting --> Other Linker Flags 添加 - ObjC 。
![](/img/tap_ios_003.png)

## ld: symbol(s) not found for architecture arm64 clang: error: linker command failed with exit code 1 (use -v to see invocation)
到下图所示位置，再检查一遍包的导入情况。

![](/img/tap_ios_faq_libc.png)

## Xcode 版本过低导致的异常

下图异常主要是 Xcode 版本过低导致，TapSDK2.X 版本，iOS 建议使用 Xcode12.3 及其以上版本打包。

![](/img/tap_fqa_ios_xcode.png)
