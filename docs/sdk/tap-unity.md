---
id: tap-unity
title: TapSDK Unity 快速开始
sidebar_label: Unity
---
import {Highlight} from '../component';

本文主要介绍 Unity 如何将 TapSDK 快速接入并实现登录功能。


:::note
如需通过示例项目了解如何在 Unity 引擎中集成 TapSDK，请参阅 GitHub 中的 [TapSDK_Unity_Demo](https://github.com/xindong/TapSDK_Unity_Demo) 示例项目。
:::


## 1. 登录 TapTap 开发者中心
请登录 [TapTap 开发者中心](https://www.taptap.com/developer-center) 来创建应用或注册为开发者。

## 2. 下载 TapTap 应用
点击下载 [TapTap 应用](https://www.taptap.com/mobile)

## 3. 环境要求
- 安装 Unity Unity 2018.3 或更高版本
- iOS 10 或更高版本
- Android 目标为 API level 21 或更高版本

## 4. 工程导入
在 YourProjectPath/Packages/manifest.json 中添加以下代码，[点击](https://github.com/xindong/TAPSDK_UPM/releases) 参考最新版本 SDK

```json
"dependencies":{
    "com.tds.sdk":"https://github.com/xindong/TAPSDK_UPM.git#1.0.1"
}
```

## 5. 项目配置
### Android 配置
1. 导航栏 -> File -> Build Settings，添加 Android 配置文件
![](https://qnblog.ijemy.com/xd_unity_amanifest.png)
2. 编辑 Assets/Plugins/Android/AndroidManifest.xml 文件，在 Application Tag 下添加以下代码。

```xml
<activity
    android:name="com.taptap.sdk.TapTapActivity"
    android:configChanges="keyboard|keyboardHidden|screenLayout|screenSize|orientation"
    android:exported="false"
    android:theme="@android:style/Theme.Translucent.NoTitleBar.Fullscreen" />
```
### iOS 配置
在 Assets/Plugins/iOS/Resource 目录下创建 TDS-Info.plist 文件，复制以下代码并且替换其中的 `ClientId` 和 `授权文案`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>taptap</key>
    <dict>
        <key>client_id</key>
        <string>ClientId</string>
    </dict>
    <key>NSPhotoLibraryUsageDescription</key>
    <string>App 需要你的同意，才能访问相册 </string>
    <key>NSCameraUsageDescription</key>
    <string>App 需要你的同意，才能访问相机 </string>
    <key>NSMicrophoneUsageDescription</key>
    <string>App 需要你的同意，才能访问麦克风 </string>
</dict>
</plist>
```

## 6. 添加 SDK 引用
**<Highlight color="#f00"> 默认无需配置，如果错误提示缺少 TapSDK 时请按下面步骤配置 </Highlight>**

1. 在 <项目脚本语言根目录> 下面创建.amsdef 文件如下图即可。
<!-- 如果项目业务只在指定目录调用 TapSDK，也可以只在调用 TapSDK 处的同级目录下创建
![](https://qnblog.ijemy.com/xd_amsdefpng.png) -->
![](https://qnblog.ijemy.com/xd_unity_amsdef.png)

2. 添加如下配置

```json
{
    "name": "YourProject",
    "references": [
        "TDSCommon",
        "TDSMoment",
        "TDSLogin",
        "TDSCore",
        "TDSTapDB"
    ],
    "includePlatforms": [
        "Android",
        "Editor",
        "iOS"
    ],
}
```

## 7. 初始化
TapSDK 的初始化操作
#### 示例代码
```cs
TapSDK.TDSCore.Init("clientId");
```
#### API
[Init](/api/unity-login.md/#init)

## 8. 注册回调
注册登录回调，成功与否的信息在回调中处理
#### 示例代码
```cs
TapSDK.TDSLogin.RegisterLoginCallback(new MyLoginCallback());
public class MyLoginCallback : TapSDK.LoginCallback{
   public void LoginSuccess(TapSDK.TDSAccessToken accessToken){
       Debug.Log("Login success");
   }

   public void LoginCancel(){
       Debug.Log("LoginCancel");
   }

   public void LoginError(TapSDK.TDSAccountError error){
       Debug.Log(error.ToString());
   }
}
```

#### API
[RegisterLoginCallback](/api/unity-login.md/#registerlogincallback)

## 9. 登录
TapSDK 提供的登录功能，开始登录
#### 示例代码
```cs
TapSDK.TDSLogin.StartLogin(new string[]{"public_profile"});
```

#### API
[StartLogin](/api/unity-login.md/#startlogin)

## 10. 登出

:::caution
当用户退出登录的时候请务必调用此方法执行退出功能， 避免用户信息错乱。
:::

#### 示例代码
```cs
TapSDK.TDSLogin.Logout();
```
#### API
[Logout](/api/unity-login.md/#logout)

## 11. 导出到 Android
unity 打包 apk 步骤  

`需要配置 package name 和签名文件`  
![](http://qnblog.ijemy.com/xd_unity_android_build.png)
**<Highlight color='#f00'> 需要注意:</Highlight>**  
到 Player Settings-->Other Settings-->Target APILevel 确认是否 >= 29  
当 Target APILever < 29 时，需要配置 manifest，在 application 节点添加 `tools:remove="android:requestLegacyExternalStorage"`
## 12. 导出到 Xcode
`需要配置 icon 和 bundleId`

1. Unity 导出 Xcode 工程步骤

![](http://qnblog.ijemy.com/xd_ios_build.png)
2. 保存的文件点击'Unity-iPhone.xcodeproj'打开xcode工程
