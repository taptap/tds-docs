---
id: quickstart
title: TapSDK 快速开始
sidebar_label: 快速开始
---

import MultiLang from '/src/docComponents/MultiLang';
import CodeBlock from '@theme/CodeBlock';
import sdkVersions from '/src/docComponents/sdkVersions';

本文介绍如何快速接入 TapSDK 并实现 **[TapTap 登录](/sdk/taptap-login/guide/start/)** 功能。

:::note
[下载](/tap-download) 页面提供了 Unity、Android、iOS 示例项目，可供参考。
:::

## 创建应用
请登录 [TapTap 开发者中心](https://developer.taptap.com/) 注册为开发者并创建应用。

## 下载 TapTap 应用
在测试设备中下载 [TapTap 客户端](https://www.taptap.com/mobile)，测试时会唤起 TapTap 客户端授权登录。若用户设备中未安装 TapTap 客户端，则会打开 webview 进行登录。

## 环境要求

<MultiLang>
<>

- Unity 2018.3 或更高版本
- iOS 10 或更高版本
- Android level 21 或更高版本

</>
<>

- Android level 21 或更高版本

</>
<>

- iOS 10 或更高版本

</>
</MultiLang>

:::caution
- 下面的**项目配置**以及**初始化**部分，预设开发者使用基于[内建账户](/sdk/authentication/features/)系统的 TDS 服务。
- 如果游戏已经有了完整的账户系统，仅需要接入 TapTap 登录、内嵌动态，且不需要 TDS 更多云服务，则不必参考下面的配置和初始化方式，可跳转至 [单纯的 TapTap 登录开发指南](/sdk/taptap-login/guide/tap-login/)，[内嵌动态开发指南](/sdk/embedded-moments/guide/)。
- 请慎重选择，如果之后需要其他 TDS 服务，升级需要一定的开发成本。
:::

## 项目配置

<MultiLang>
<>

SDK 可以**通过 Unity Package Manger 导入或手动导入**，二者任选其一。请根据项目需要选择。

#### 方法一：使用 Unity Package Manager

在项目的 `Packages/manifest.json` 文件中添加以下依赖：

<CodeBlock className="json">
{`"dependencies":{
    "com.taptap.tds.login":"https://github.com/TapTap/TapLogin-Unity.git#${sdkVersions.taptap.unity_login}",
    "com.taptap.tds.common":"https://github.com/TapTap/TapCommon-Unity.git#${sdkVersions.taptap.unity_common}",
    "com.taptap.tds.bootstrap":"https://github.com/TapTap/TapBootstrap-Unity.git#${sdkVersions.taptap.unity}",
    "com.leancloud.realtime": "https://github.com/leancloud/csharp-sdk-upm.git#realtime-${sdkVersions.leancloud.csharp}",
    "com.leancloud.storage": "https://github.com/leancloud/csharp-sdk-upm.git#storage-${sdkVersions.leancloud.csharp}",
}`}
</CodeBlock>

在 Unity 顶部菜单中选择 **Window > Package Manager** 可查看已经安装在项目中的包。

#### 方法二：手动导入

1. [点击下载](/tap-download) `TapSDK-UnityPackage.zip` 和 `LeanCloud-SDK-Realtime-Unity.zip`。

2. 在 Unity 项目中依次转到 **Assets > Import Packages > Custom Packages**，从解压后的 `TapSDK-UnityPackage.zip` 中，选择希望在游戏中使用的 TapSDK 包导入，其中：

   - `TapTap_Bootstrap.unitypackage` TapSDK 启动器，必选。
   - `TapTap_Common.unitypackage` TapSDK 基础库，必选。
   - `TapTap_Login.unitypackage` TapTap 登录，必选。

3. 解压后的 `LeanCloud-SDK-Realtime-Unity.zip` 为 Plugins 文件夹，拖拽至 Unity 即可。

:::tip
如果是手动下载 unitypackage 进行 SDK 导入，需要将 `Assets/TapTap/Common/Plugins/iOS/TapTap.Common.dll` 设置为只支持 iOS
:::

导入 SDK 后还需进行 Android、iOS 平台的相关配置。

#### Android 配置

1. **File > Build Settings** 添加 Android 配置文件。

   ![](/img/tap_unity_amanifest.png)

2. 编辑 `Assets/Plugins/Android/AndroidManifest.xml` 文件，在 Application Tag 下添加以下代码。

    ```xml
    <activity
        android:name="com.taptap.sdk.TapTapActivity"
        android:configChanges="keyboard|keyboardHidden|screenLayout|screenSize|orientation"
        android:exported="false"
        android:theme="@android:style/Theme.Translucent.NoTitleBar.Fullscreen" />
    ```

#### iOS 配置

在 `Assets/Plugins/iOS/Resource` 目录下创建 `TDS-Info.plist` 文件，复制以下代码并且替换其中的 `ClientId` 和授权文案：

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
    <string>说明为何应用需要此项权限</string>
    <key>NSCameraUsageDescription</key>
    <string>说明为何应用需要此项权限</string>
    <key>NSMicrophoneUsageDescription</key>
    <string>说明为何应用需要此项权限</string>
    <!--TapDB 需要用到，收集 IDFA，如应用程序不想弹框，可以设置 TapDB.AdvertiserIDCollectionEnabled(false)-->
    <key>NSUserTrackingUsageDescription</key>
    <string>说明为何应用需要此项权限</string>
</dict>
</plist>
```

</>
<>

1. [点击下载 TapSDK_Android](/tap-download)，将 SDK 包导入到项目 `project/app/libs` 目录下。

2. 打开项目的 `project/app/build.gradle` 文件，添加 gradle 配置如下：

    <CodeBlock className="java">
    {`repositories{  
        flatDir {  
            dirs 'libs'  
        }  
    }  \n
    dependencies {  
    ...  
        implementation name:'TapBootstrap_${sdkVersions.taptap.android}', ext:'aar'   
        implementation name:'TapCommon_${sdkVersions.taptap.android}', ext:'aar' 
        implementation name:'TapLogin_${sdkVersions.taptap.android}', ext:'aar' 
        implementation 'cn.leancloud:realtime-android:${sdkVersions.leancloud.java}'
        implementation 'cn.leancloud:storage-android:${sdkVersions.leancloud.java}'
        implementation 'io.reactivex.rxjava2:rxandroid:2.1.1'
    }`}
    </CodeBlock>

3. 在 `AndroidManifest.xml` 添加网络权限：

    ```java
    <uses-permission android:name="android.permission.INTERNET"></uses-permission>
    ```

4. 旧版 Android 额外配置

   如果 `targetSdkVersion < 29`，还需要添加如下配置：

   - manifest 节点添加 `xmlns:tools="http://schemas.android.com/tools"`
   - application 节点添加 `tools:remove="android:requestLegacyExternalStorage"`

</>
<>

#### 导入 SDK

1. 在 Xcode 选择工程，到 **Build Setting > Other Linker Flags** 添加 `-ObjC`。

2. 直接拖拽 [下载的 TapSDK_iOS.zip](/tap-download) 到项目目录即可。

3. 视需要导入下载的资源文件：

   - 必选：TapTap 启动器、基础库、登录

       ```
       TapBootstrapSDK.framework
       TapCommonSDK.framework
       TapLoginSDK.framework
       LeanCloudObjc.framework
       ```


4. 请仔细核对下面依赖库是否都添加成功：

    ```
    // 必选
    WebKit.framework
    Security.framework
    SystemConfiguration.framework
    CoreTelephony.framework
    SystemConfiguration.framework
    libc++.tbd

    // TapTap 内嵌动态
    AVFoundation.framework
    CoreTelephony.framework
    MobileCoreServices.framework
    Photos.framework
    SystemConfiguration.framework
    WebKit.framework

    // 数据分析
    // 如果不需要获取 idfa 则不要添加这 `AppTrackingTransparency` 和 `AdSupport`两个系统库
    AppTrackingTransparency.framework
    AdSupport.framework
    CoreMotion.framework
    Security.framework
    SystemConfiguration.framework
    libresolv.tbd
    libsqlite3.0.tbd
    libz.tbd
    ```

#### 配置权限

**TapTap 内嵌动态功能需要相册、相机、麦克风访问权限，数据分析功能需要 IDFA 权限。**

因此，如果游戏加入了 TapTap 内嵌动态功能或数据分析功能，那么需要在 `info.plist` 添加如下配置（请替换授权文案）：

```xml
<!-- 相册 -->
<key>NSPhotoLibraryUsageDescription</key>
<string>说明为何应用需要此项权限</string>
<!-- 相机 -->
<key>NSCameraUsageDescription</key>
<string>说明为何应用需要此项权限</string>
<!-- 麦克风 -->
<key>NSMicrophoneUsageDescription</key>
<string>说明为何应用需要此项权限</string>
<!--TapDB 需要用到，收集 IDFA，如应用程序不想弹框，可以设置 TapDB.AdvertiserIDCollectionEnabled(false)-->
<key>NSUserTrackingUsageDescription</key>
<string>说明为何应用需要此项权限</string>
```

#### 配置跳转 TapTap 应用

用户无 TapTap 应用时，默认会通过 WebView 登录。

1. 打开 `info.plist`，添加如下配置（请替换 `clientID` 为你在控制台获取的 `Client ID`）：

   ![](/img/tap_ios_info.png)

    ```xml
    <key>CFBundleURLTypes</key>
    <array>
        <dict>
            <key>CFBundleTypeRole</key>
            <string>Editor</string>
            <key>CFBundleURLName</key>
            <string>taptap</string>
            <key>CFBundleURLSchemes</key>
            <array>
                <!-- 这里注意下，中括号需要去掉，最终是 clientID 前拼接上 tt 的形式； 例如：ttFwFdCxxxxxxxQDQwQN -->
                <string>tt[clientID]</string>
            </array>
        </dict>
    </array>

    <key>LSApplicationQueriesSchemes</key>
    <array>
      <string>tapiosdk</string>
      <string>tapsdk</string>
    </array>
    ```

2. 配置 openUrl：

   a) 如果项目中有 `SceneDelegate.m`，请先删除，然后请添加如下代码到 `AppDelegate.m` 文件：

      ```objectivec
      - (BOOL)application:(UIApplication *)application openURL:(NSURL *)url sourceApplication:(NSString *)sourceApplication annotation:(id)annotation {
        return [TapBootstrap handleOpenURL:url];
      }

      - (BOOL)application:(UIApplication *)app openURL:(NSURL *)url options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options {
        return [TapBootstrap handleOpenURL:url];
      }
      ```

   b) 删除 `info.plist` 里面的 Application Scene Manifest  
   ![](/img/tap_ios_appmanifest.png)

   c) 删除 AppDelegate.m 文件中的两个管理 Scenedelegate 生命周期代理方法

    ```objectivec
    #pragma mark - UISceneSession lifecycle
    - (UISceneConfiguration *)application:(UIApplication *)application configurationForConnectingSceneSession:(UISceneSession *)connectingSceneSession options:(UISceneConnectionOptions *)options {
    
    return [[UISceneConfiguration alloc] initWithName:@"Default Configuration" sessionRole:connectingSceneSession.role];
    }

    - (void)application:(UIApplication *)application didDiscardSceneSessions:(NSSet<UISceneSession *> *)sceneSessions {
    }
    ```

   d) 在 `AppDelegate.h` 中添加 `UIWindow`

    ```objectivec
    @property (strong, nonatomic) UIWindow *window;
    ```


</>
</MultiLang>

## 初始化

初始化 TapSDK 时需传入 `Client ID`、区域等应用配置信息。

<MultiLang>

```cs
using TapTap.Bootstrap; // 命名空间

var config =  new TapConfig.Builder()
    .ClientID("your_client_id")  // 必须，开发者中心对应 Client ID
    .ClientToken("your_client_token")  // 必须，开发者中心对应 Client Token
    .ServerURL("https://your_server_url") // 必须，开发者中心 > 你的游戏 > 游戏服务 > 云服务 > 数据存储 > 服务设置 > 自定义域名 绑定域名
    .RegionType(RegionType.CN)  // 非必须，默认 CN 表示国内
    .ConfigBuilder();
TapBootstrap.Init(config);
```

```java  
TapConfig tdsConfig = new TapConfig.Builder()
        .withAppContext(MainActivity.this)  // Context 上下文
        .withClientId("your_client_id")  // 开发者中心对应 Client ID
        .withClientToken("your_client_token")  // 开发者中心对应 Client Token
        .withServerUrl("https://your_server_url")  // 开发者中心 > 你的游戏 > 游戏服务 > 云服务 > 数据存储 > 服务设置 > 自定义域名 绑定域名
        .withRegionType(TapRegionType.CN)  // TapRegionType.CN: 国内  TapRegionType.IO: 国外
        .build();
TapBootstrap.init(MainActivity.this, tdsConfig);     
```

```objectivec
// 开发者必须至少依赖 `TapBootstrap`、`TapLogin`、`TapCommon` 以及 `LeanCloudObjc` 模块，并按照如下方式完成初始化：
TapConfig *config = [TapConfig new];
config.clientId = @"your_client_id";  // 开发者中心对应 Client ID
config.clientToken = @"your_client_token";  // 开发者中心对应 Client Token
config.region = TapSDKRegionTypeCN;  // TapSDKRegionTypeCN: 国内  TapSDKRegionTypeIO: 国外
config.serverURL = @"https://your_server_url";  // 开发者中心 > 你的游戏 > 游戏服务 > 云服务 > 数据存储 > 服务设置 > 自定义域名 绑定域名
[TapBootstrap initWithConfig:config];
```

</MultiLang>

`client_id`、`client_token`信息可在 **开发者中心 > 你的游戏 > 游戏服务 > 应用配置** 查看。

`server_url` 可参考 **[域名绑定](/sdk/start/get-ready/#绑定域名)** 的文档。

## 接入功能

TapSDK 提供了众多功能。请在初始化 SDK 后，根据项目需要，参考相应功能的文档，接入相应功能。
绝大多数游戏都会接入 TapTap 登录，所以我们推荐从这一功能开始。

:::tip
重要提示：在**测试登录功能前**务必完成 [配置签名证书](/sdk/start/quickstart/#配置签名证书) 和 [添加测试用户](/sdk/start/test-accounts/)，否则无法正常使用 TapTap 登录功能。
:::

### 接入 TapTap 登录

请根据开发者指南：[快速上手，接入 TapTap 一键登录](/sdk/taptap-login/guide/start) 完成操作，可以选择单纯的 TapTap 登录，或者基于内建账户系统接入 TapTap 登录。

### 配置签名证书

Android 和 iOS 应用需要在 TapTap 开发者中心进入你的游戏，依次选择 **游戏服务 > 生态服务 > TapTap 登录** 配置应用的相关信息（如下图所示），否则测试登录功能时会返回 `signature not match` 报错信息，无法正常使用 TapTap 登录功能。

![](/img/start_getready_info.png)

### 添加测试用户

请见[测试用户管理](/sdk/start/test-accounts/)。

接下来，就可以打包应用，测试 TapTap 登录功能了。

### Android 代码混淆

TapSDK 已经做了混淆处理，再次混淆会导致不可预期的错误，请在项目的混淆脚本中添加如下配置，跳过对 TapSDK 的混淆操作：

```java
-keep class com.tds.** { *;}
-keep class com.taptap.** { *;}
-keep class com.tapsdk.** { *;}
-keep class tds.androidx.** { *;}
```

如果使用到基于**数据存储**的云服务，比如**内建账户**方式登陆则需要额外添加 **[数据存储](/sdk/storage/guide/setup-java/#android-代码混淆)** 相关的混淆代码。

## 打包

Android 或 iOS 请按通常的 Android APK 或者 iOS 应用打包流程操作即可。这里介绍一下 Unity 打包流程：

### 打包 APK

第一步，配置 package name 和签名文件：

![](/img/tap_unity_android_build.png)

第二步，检查 **File > Build Settings > Player Settings > Other Settings > Target API Level** 版本，当 API Level 小于 29 时，需要配置 manifest，在 application 节点添加：

```
tools:remove="android:requestLegacyExternalStorage"
```

这是因为 SDK 内部默认配置了 `android:requestLegacyExternalStorage = true`，当 `targetSdkVersion < 29` 时会报错 `Android resource linking failed`。

### 导出 Xcode 工程

需要配置 icon 和 `BundleID`：

![](/img/tap_ios_build.png)
