---
id: tap-android-faq
title: TapSDK Android FAQ
sidebar_label: Android
---

## 签名错误
TapSDK的使用，对于Android，强制需要签名文件、包名、clientId三个都能鉴权通过

## 登录时报404或者405
请检查`LoginSdkConfig.regionType`配置，国内请配置为RegionType.CN

## Android resource linking failed
error: attribute android:requestLegacyExternalStorage not found.  
error: failed processing manifest.

原因：  
SDK内部默认配置了 android:requestLegacyExternalStorage = true  
当targetSdkVersion<29时会报这个错误  
解决：  
方法一、设置targetSdkVersion=29  
方法二、targetSdkVersion<29时  
manifest节点配置 `xmlns:tools="http://schemas.android.com/tools"`  
application节点配置 `tools:remove="android:requestLegacyExternalStorage"`
