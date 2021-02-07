---
id: tap-unity
title: TapSDK Unity快速开始
sidebar_label: Unity
---
import {Highlight} from '../component';

本文主要介绍Unity如何将TapSDK快速接入并实现登录功能。


:::note
如需通过示例项目了解如何在 Unity 引擎中集成 TapSDK，请参阅 GitHub 中的 [TapSDKSample](https://github.com/xindong/TapSDK_Unity_Demo)。
:::


## 1. 登录TapTap开发者中心
请登录 [TapTap开发者中心](https://www.taptap.com/developer-center) 来创建应用或注册为开发者。

## 2. 下载 TapTap 应用
点击下载 [TapTap 应用](https://www.taptap.com/mobile)

## 3. 环境要求
- 安装Unity Unity 2018.3或更高版本
- iOS 10或更高版本
- Android 目标为API level 21或更高版本

## 4. 工程导入
在YourProjectPath/Packages/manifest.json中添加以下代码，[点击](https://github.com/xindong/TAPSDK_UPM/releases)参考最新版本SDK

```json
"dependencies":{
    "com.tds.sdk":"https://github.com/xindong/TAPSDK_UPM.git#1.0.0"
}
```

## 5. 项目配置
### Android配置
1. 导航栏-> File -> Build Settings，添加Android配置文件
![](https://qnblog.ijemy.com/xd_unity_amanifest.png)
2. 编辑Assets/Plugins/Android/AndroidManifest.xml文件,在Application Tag下添加以下代码。

```xml
<activity
    android:name="com.taptap.sdk.TapTapActivity"
    android:configChanges="keyboard|keyboardHidden|screenLayout|screenSize|orientation"
    android:exported="false"
    android:theme="@android:style/Theme.Translucent.NoTitleBar.Fullscreen" />
```
### iOS配置
在Assets/Plugins/IOS/Resource目录下创建TDS-Info.plist文件，复制以下代码并且替换其中的`ClientId`和`授权文案`

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
    <string>App需要您的同意,才能访问相册</string>
    <key>NSCameraUsageDescription</key>
    <string>App需要您的同意,才能访问相机</string>
    <key>NSMicrophoneUsageDescription</key>
    <string>App需要您的同意,才能访问麦克风</string>
</dict>
</plist>
```

## 6. 添加SDK引用
**<Highlight color="#f00">默认无需配置，如果错误提示缺少TapSDK时请按下面步骤配置</Highlight>**

1. 在Assets/scripts/根目录下面创建.amsdef文件如下图即可。
<!-- 如果项目业务只在指定目录调用TapSDK，也可以只在调用TapSDK处的同级目录下创建
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
TapSDK的初始化操作
#### 示例代码
```cs
TapSDK.TDSCore.Init("clientId");
```
#### API
[Init](./api/unity-login.md/#init)

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
[RegisterLoginCallback](./api/unity-login.md/#registerlogincallback)

## 9. 登录
TapSDK提供的登录功能，开始登录
#### 示例代码
```cs
TapSDK.TDSLogin.StartLogin(new string[]{"public_profile"});
```

#### API
[StartLogin](./api/unity-login.md/#startlogin)

## 10. 登出

:::caution
当用户退出登录的时候请务必调用此方法执行退出功能， 避免用户信息错乱。
:::

#### 示例代码
```cs
TapSDK.TDSLogin.Logout();
```
#### API
[Logout](./api/unity-login.md/#logout)

## 11. 导出到Android
unity打包apk步骤  

`需要配置package name和签名文件`  
![](http://qnblog.ijemy.com/xd_unity_android_build.png)
**<Highlight color='#f00'>需要注意:</Highlight>**  
到Player Settings-->Other Settings-->Target APILevel确认是否 >= 29  
当Target APILever < 29时，需要配置manifest，在application节点添加 `tools:remove="android:requestLegacyExternalStorage"`
## 12. 导出到Xcode
`需要配置icon和bundleId`

1. Unity导出Xcode工程步骤

![](http://qnblog.ijemy.com/xd_ios_build.png)
2. 保存的文件点击'Unity-iPhone.xcodeproj'打开xcode工程
