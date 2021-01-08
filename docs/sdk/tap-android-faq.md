---
id: tap-android-faq
title: TapSDK Android FAQ
sidebar_label: Android
---

## 签名错误
TapSDK的使用，对于Android，强制需要签名文件、包名、clientId三个都能鉴权通过

## 登录时报404或者405
请检查`LoginSdkConfig.regionType`配置，国内请配置为RegionType.CN
