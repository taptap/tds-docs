---
id: tap-unity
title: Unity快速开始
sidebar_label: Unity
---

:::note
如需通过示例项目了解如何在 Unity 引擎中集成 TapSDK，请参阅 GitHub 中的 [TapSDKSample](#)。
:::

## 1. 环境要求
- 安装Unity Unity 2018.3或更高版本
- iOS 10或更高版本
- Android 目标为API19或更高版本

## 2. 工程导入
在YourProjectPath/Packages/manifest.json中添加以下代码

```json
"dependencies":{
    "com.tds.sdk":"https://github.com/xindong/TAPSDK_UPM.git#0.0.2-alpha"
}
```

## 3. 项目配置
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
在Assets/Plugins/IOS/Resource目录下创建TDS-Info.plist文件,复制以下代码并且替换其中的ClientId。

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>taptap</key>
    <dict>
        <key>client_id</key>
        <string>{Your-ClientId}</string>
    </dict>
</dict>
</plist>
```

## 4. SDK脚本引用
1. 在调用SDK脚本目录下创建.amsdef文件
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

## 5. 初始化

```c#
TapSDK.TDSCore.Init("clientId");
```
## 6. 注册回调

```c#
TapSDK.TDSLogin.RegisterLoginCallback(new MyLoginCallback());
public class MyLoginCallback : LoginCallback{
    void LoginSuccess(TDSAccessToken accessToken){
        Debug.Log("Login success");
    }

    void LoginCancel(){

    }

    void LoginError(string error){
        Debug.Log(error);
    }
}
```
## 7. 登录

```c#
TapSDK.TDSLogin.StartLogin(new string["public_profile"]);
```
## 8. 登出

```c#
TapSDK.TDSLogin.Logout();
```
