---
id: tap-unity
title: Unity工程
sidebar_label: Unity
---
## 1. 环境配置
Unity Version: 8+  

## 2. 工程导入


## 3. 初始化
TapSDK.init();
## 4. 功能开启
TapSDK.enableLogin();  
TapSDK.enableMoment();  
TapSDK.enableDB();  
## 5. 注册回调
TapSDK.registerTapSDKCallback();
## 6. 开始使用
LoginManager.getInstance().logInWithReadPermissions(MainActivity.this, TapTapSdk.SCOPE_PUIBLIC_PROFILE);

## 7. simple code
从[这里](#)可以下载到快速开始Demo
## 8. API功能参考
