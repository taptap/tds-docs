---
id: tap-android-faq
title: TapSDK Android FAQ
sidebar_label: Android
---

## 签名错误
TapSDK 的使用，对于 Android，强制需要签名文件、包名、clientId 三个都能鉴权通过

## 登录时报 404 或者 405
请检查 `LoginSdkConfig.regionType` 配置，国内请配置为 RegionType.CN

## Android resource linking failed
error: attribute android:requestLegacyExternalStorage not found.  
error: failed processing manifest.

原因：  
SDK 内部默认配置了 android:requestLegacyExternalStorage = true  
当 targetSdkVersion<29 时会报这个错误  
解决：  
方法一、设置 targetSdkVersion=29  
方法二、targetSdkVersion<29 时  
manifest 节点配置 `xmlns:tools="http://schemas.android.com/tools"`  
application 节点配置 `tools:remove="android:requestLegacyExternalStorage"`
