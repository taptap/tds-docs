---
id: tap-android
title: TapSDK Android快速开始
sidebar_label: Android快速开始
---

## 1. 环境配置
Android API Level: 8+  
gradle: 3.2

## 2. 工程导入
```  
repositories{  
    flatDir {  
        dirs 'libs'  
    }  
}  
dependencies {  
...  
    implementation (name:'TapTapLoginSdk-2.5.2', ext:'aar')  
    implementation (name:'TDSMoment_1.2.1', ext:'aar')  
    implementation (name:'TDSCommon_1.1.0', ext:'aar')  
}  
```  

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
