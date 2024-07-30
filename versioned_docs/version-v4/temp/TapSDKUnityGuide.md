# TapTapSDK V4 Unity 接入指南

本文介绍如何在游戏中加入`TapTapSDK` 的登录、更新唤起模块。

## package 集成

### 依赖库

SDK 修改 JSON 解析库为 `Newtonsoft-json`，如果当前工程已接入该依赖库，则不需额外处理，否则需在 `Packages/manifest.json` 添加依赖 ，同时SDK
使用 `com.google.external-dependency-manager`
管理Android、iOS依赖，如果当前工程已接入该依赖库，则不需额外处理，否则需在 `Packages/manifest.json` 添加如下依赖：

```
{
   "dependencies": {
      "com.unity.nuget.newtonsoft-json":"3.2.1",
      "com.google.external-dependency-manager": "1.2.179"
   },
   "scopedRegistries": [
      {
         "name": "package.openupm.com",
         "url": "https://package.openupm.com",
         "scopes": [
            "com.google.external-dependency-manager"
         ]
      }
  ]
}
```

### 导入UnityPackage

1. 下载 `TapSDK-UnityPackage.zip`，解压到方便的位置，然后在 Unity 项目中导入。
2. 在 Unity 项目中依次转到 **Assets > Import Packages > Custom Packages**，从解压后的 `TapSDK-UnityPackage.zip` 中，选择您希望在应用中使用的 **TapSDK**
   产品导入。
   `TapTapSDK_Core.unitypackage` ： **必选**。TapSDK 核心库
   `TapTapSDK_Login.unitypackage` ： **必选**。TapSDK 登录
   `TapTapSDK_Update.unitypackage` ： **必选**。TapSDK 更新唤起

## Login

## update