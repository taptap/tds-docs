---
id: tap-ios-faq
title: TapSDK iOS FAQ
sidebar_label: iOS
---

## registerLoginCallback 代理无法回调
检查一下 client ID 设置，info.plist 和初始化代码里面保持一致

## [UIWindow tds_topWindow]: unrecognized selector sent to class 0xxxxxxxx
到 Build Setting --> Other Linker Flags 添加 - ObjC
![](/img/tap_ios_003.png)

## ld: symbol(s) not found for architecture arm64 clang: error: linker command failed with exit code 1 (use -v to see invocation)
到这个位置，再检查一遍包导入情况

![](/img/tap_ios_faq_libc.png)
