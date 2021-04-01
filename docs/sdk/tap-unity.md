---
id: tap-unity
title: TapSDK Unity 快速开始
sidebar_label: Unity
---
import {Highlight} from '../component';

本文主要介绍 Unity 如何将 TapSDK 快速接入并实现登录功能。


:::note
如需通过示例项目了解如何在 Unity 引擎中集成 TapSDK，请参阅[下载](/tap-download)页面中的示例项目。
:::


## 1. 登录 TapTap 开发者中心
请登录 [TapTap 开发者中心](https://developer.taptap.com/) 来创建应用或注册为开发者。

## 2. 下载 TapTap 应用
点击下载 [TapTap 应用](https://www.taptap.com/mobile)

## 3. 环境要求
- 安装 Unity Unity 2018.3 或更高版本
- iOS 10 或更高版本
- Android 目标为 API level 21 或更高版本

## 4. 工程导入
在 YourProjectPath/Packages/manifest.json 中添加以下代码，[点击](https://github.com/TapTap) 参考最新版本 SDK

```json
"dependencies":{
//登录部分
"com.tapsdk.login":"https://github.com/TapTap/TapLogin-Unity.git#2.0.0",
"com.tapsdk.common":"https://github.com/TapTap/TapCommon-Unity.git#2.0.0",
"com.tapsdk.bootstrap":"https://github.com/TapTap/TapBootstrap-Unity.git#2.0.0",
//动态部分
"com.tapsdk.moment":"https://github.com/EingSTapTaphaw/TapMoment-Unity.git#2.0.0",
}
```

## 5. 项目配置

### Android 配置
1. 导航栏 -> File -> Build Settings，添加 Android 配置文件。

![](https://qnblog.ijemy.com/xd_unity_amanifest.png)。

2. 编辑 Assets/Plugins/Android/AndroidManifest.xml 文件，在 Application Tag 下添加以下代码。

```xml
<activity
    android:name="com.taptap.sdk.TapTapActivity"
    android:configChanges="keyboard|keyboardHidden|screenLayout|screenSize|orientation"
    android:exported="false"
    android:theme="@android:style/Theme.Translucent.NoTitleBar.Fullscreen" />
```

### iOS 配置

在 Assets/Plugins/iOS/Resource 目录下创建 TDS-Info.plist 文件，复制以下代码并且替换其中的 `ClientId` 和 `授权文案`：

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

<!-- ## 6. 添加 SDK 引用
**<Highlight color="#f00"> 默认无需配置，如果错误提示缺少 TapSDK 时请按下面步骤配置 </Highlight>**

1. 在 <项目脚本语言根目录> 下面创建.amsdef 文件如下图即可。 -->
<!-- 如果项目业务只在指定目录调用 TapSDK，也可以只在调用 TapSDK 处的同级目录下创建
![](https://qnblog.ijemy.com/xd_amsdefpng.png) -->
<!-- ![](https://qnblog.ijemy.com/xd_unity_amsdef.png)

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
``` -->

## 6. 初始化
首先执行 TapSDK 的初始化操作。

#### 示例代码
```cs
TapConfig tapConfig = new TapConfig("FwFdCIr6u71WQDQwQN", true);
TapBootstrap.Init(tapConfig);
```

<!--
#### API
[Init](/api/unity-tapbootstrap.md/#init)
-->

## 7. 注册回调
注册登录回调，成功与否的信息在回调中处理。

#### 示例代码
```cs
TapBootstrap.RegisterLoginResultListener(new MyLoginCallback());
public class MyLoginCallback : TapBootstrap.ITapLoginResultListener {
  public void OnLoginSuccess(AccessToken accessToken)
  {
      Debug.Log("登录成功:  " + accessToken.ToJSON());
  }

  public void OnLoginError(TapError error)
  {
      Debug.Log("登录失败的error信息:  " + error.errorDescription);
  }

  public void OnLoginCancel()
  {
      Debug.Log("登录取消");
  }
}
```

#### AccessToken 使用说明
- AccessToken 包含过期时间（90 天），过期后 SDK 会自动清除本地缓存。
- AccessToken 信息解出来之后，可以传到游戏服务端去获取用户信息，可参考[获取用户信息](/api/service#流程)。

正确的返回 AccessToken 如下：

```cs
{
  "accessToken":"accessToken",
  "kid":"kid",
  "macAlgorithm":"macAlgorithm",
  "tokenType":"tokenType",
  "macKey":"macKey",
  "expireIn" :7776000
}
```

#### 参数说明
参数  | 描述
| ------ | ------ |
accessToken | 用户登录后的凭证
kid  | 服务端使用需要
macAlgorithm  | 固定为'hmac-sha-1'
tokenType  | 固定为'mac'
macKey  | 服务端使用需要
expireIn  | 过期时间

<!--
#### API
[RegisterLoginCallback](/api/unity-tapbootstrap.md/#registerloginresultlistener)
-->

## 8. 登录
TapSDK 提供的登录功能，开始登录。

#### 示例代码
```cs
TapBootstrap.TapConfig config = new TapConfig();
LoginType loginType = LoginType.TAPTAP;
TapBootstrap.Login(loginType, new string[] { "public_profile" });
```

<!--
#### API
[StartLogin](/api/unity-tapbootstrap.md/#login)
-->

## 9. 登出

:::caution
当用户退出登录的时候请务必调用此方法执行退出功能， 避免用户信息错乱。
:::

#### 示例代码
```cs
TapBootstrap.Logout();
```

<!--
#### API
[Logout](/api/unity-tapbootstrap.md/#logout)
-->

## 10. 导出到 Android
Unity 打包 apk 步骤如下： 

`需要配置 package name 和签名文件`  
![](http://qnblog.ijemy.com/xd_unity_android_build.png)
**<Highlight color='#f00'> 需要注意：</Highlight>**  
到 Player Settings-->Other Settings-->Target APILevel 确认是否 >= 29，当 Target APILever < 29 时，需要配置 manifest，在 application 节点添加 `tools:remove="android:requestLegacyExternalStorage"`。

## 11. 导出到 Xcode
`需要配置 icon 和 bundleId`

1. Unity 导出 Xcode 工程步骤

![](http://qnblog.ijemy.com/xd_ios_build.png)
2. 保存的文件点击 'Unity-iPhone.xcodeproj' 打开 Xcode 工程
