---
id: tap-ios-faq
title: TapSDK iOS FAQ
sidebar_label: iOS
---

## 无法唤起registerLoginCallback回调
检查一下clientID设置，info.plist和初始化代码里面保持一致

## [UIWindow tds_topWindow]: unrecognized selector sent to class 0xxxxxxxx
到Build Setting-->Other Linker Flags添加-ObjC
![](https://qnblog.ijemy.com/xd_ios_003.png)

## ld: symbol(s) not found for architecture arm64 clang: error: linker command failed with exit code 1 (use -v to see invocation)
到这个位置，再检查一遍包导入情况

![](https://qnblog.ijemy.com/xd_ios_faq_libc.png)
