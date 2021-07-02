---
id: quickstart
title: TapSDK 快速开始
sidebar_label: 快速开始
---
import MultiLang from '@theme/MultiLang';

本文介绍如何快速接入 TapSDK 并实现 [TapTap 登录](/sdk/taptap-login/guide/start)功能。

:::note
[下载](/tap-download) 页面提供了 Unity、Android、iOS 示例项目，可供参考。
:::

## 创建应用
请登录 [TapTap 开发者中心](https://developer.taptap.com/) 注册为开发者并创建应用。

## 下载 TapTap 应用
点击下载 [TapTap 应用](https://www.taptap.com/mobile)

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

## 项目配置

<MultiLang>
<>

SDK 可以通过 Unity Package Manger 导入或手动导入，请根据项目需要选择。

#### 使用 Unity Package Manager

在项目的 `Packages/manifest.json` 文件中添加以下依赖：

```json
"dependencies":{
// 登录
"com.taptap.tds.login":"https://github.com/TapTap/TapLogin-Unity.git#2.1.6",
"com.taptap.tds.common":"https://github.com/TapTap/TapCommon-Unity.git#2.1.6",
"com.taptap.tds.bootstrap":"https://github.com/TapTap/TapBootstrap-Unity.git#2.1.6",
}
```

:::tip
如果是手动下载unitypackage进行SDK导入，需要将 `Assets/TapTap/Common/Plugins/iOS/TapTap.Common.dll` 设置为只支持iOS
:::

[点击](https://github.com/TapTap) 参考 SDK 最新版本号。

#### 手动导入

1. [点击下载 TapSDK-UnityPackage.zip](/tap-download)，然后将该 SDK 解压到方便的位置。

2. 在 Unity 项目中依次转到 **Assets > Import Packages > Custom Packages**。

3. 从解压缩中的 TapSDK 中，选择希望在应用中使用的 TapSDK 包导入。

   - `TapTap_TapBootstrap.unitypackage` 必选，TapSDK 启动器
   - `TapTap_TapCommon.unitypackag` 必选，TapSDK 基础库
   - `TapTap_TapLogin.unitypackage` 必选，TapTap 登录


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
    <!--TapDB需要用到，收集IDFA，如应用程序不想弹框，可以设置TapDB.AdvertiserIDCollectionEnabled(false)-->
    <key>NSUserTrackingUsageDescription</key>
    <string>说明为何应用需要此项权限</string>
</dict>
</plist>
```

</>
<>

1. [点击下载 TapSDK_Android](/tap-download)，将 SDK 包导入到项目 `project/app/libs` 目录下。

2. 打开项目的 `project/app/build.gradle` 文件，添加 gradle 配置如下：

    ```java
    repositories{  
        flatDir {  
            dirs 'libs'  
        }  
    }  
    
    dependencies {  
    ...  
        implementation (name:'TapBootstrap_2.1.6', ext:'aar')  // 必选: TapSDK 启动器 
        implementation (name:'TapCommon_2.1.6', ext:'aar') // 必选: TapSDK 基础库 
		implementation (name:'TapLogin_2.1.6', ext:'aar') // 必选: TapTap 登录 

    }  
    ```

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

2. 直接拖拽 [下载的 TapSDK_iOS_v2.1.2.zip](/tap-download) 到项目目录即可。

3. 视需要导入下载的资源文件：

   - 必选：TapTap 启动器、基础库、登录

       ```
       TapBootstrapResource.bundle
       TapBootstrapSDK.framework
       TapCommonResource.bundle
       TapCommonSDK.framework
       TapLoginSDK.framework
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
<!-- IDFA -->
<key>NSUserTrackingUsageDescription</key>
<string>说明为何应用需要此项权限</string>
```

#### 配置跳转 TapTap 应用

用户无 TapTap 应用时，默认会通过 WebView 登录。

1. 打开 `info.plist`，添加如下配置（请替换 `clientID` 为你在控制台获取的 Client ID）：

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

2. 配置openUrl：

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

   c) 删除AppDelegate.m文件中的两个管理Scenedelegate生命周期代理方法

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

初始化 TapSDK 时需传入 Client ID、区域等应用配置信息。

<MultiLang>

```cs
TapConfig tapConfig = new TapConfig.Builder()
    .ClientID("clientId")//必须
    .ClientSecret("client_secret")//必须，开发者中心对应Client Token
    .RegionType(RegionType.CN)//非必须，默认CN
    .ConfigBuilder();

TapBootstrap.Init(tapConfig);
```

```java       
TapConfig tapConfig = new TapConfig.Builder()
        .withAppContext(getApplicationContext())
        .withRegionType(TapRegionType.CN) // TapRegionType.CN: 国内  TapRegionType.IO: 国外
        .withClientId("clientId")
        .withClientSecret("clientSecret")//开发者中心对应Client Token
        .build();
TapBootstrap.init(MainActivity.this, tapConfig);
```

```objectivec
    //初始化SDK
    TapConfig *config = TapConfig.new;
    config.clientId = @"clientId";
    config.clientSecret=@"clientSecret";//开发者中心对应Client Token

    config.region = TapSDKRegionTypeCN;
    [TapBootstrap initWithConfig:config];
```

</MultiLang>

## 登录回调

注册登录回调，以接收登录结果。

<MultiLang>

```cs
TapBootstrap.RegisterLoginResultListener(new MyLoginCallback());
public class MyLoginCallback : ITapLoginResultListener {
  public void OnLoginSuccess(AccessToken accessToken)
  {
      Debug.Log("登录成功： " + accessToken.ToJSON());
  }

  public void OnLoginError(TapError error)
  {
      Debug.Log("登录失败： " + error.errorDescription);
  }

  public void OnLoginCancel()
  {
      Debug.Log("登录取消");
  }
}
```

```java
TapBootstrap.registerLoginResultListener(new TapLoginResultListener() {
    @Override
    public void loginSuccess(AccessToken accessToken) {
        Log.d(TAG, "onLoginSuccess: " + accessToken.toJSON());
    }

    @Override
    public void loginFail(TapError tapError) {
        Log.d(TAG, "onLoginError: " + tapError.toJSON());
    }

    @Override
    public void loginCancel() {
        Log.d(TAG, "onLoginCancel");
    }
});
```

```objectivec
// 注册登录回调
[TapBootstrap registerLoginResultDelegate:self];

// 实现回调方法
// 登录成功回调
// @param token token 对象
- (void)onLoginSuccess:(AccessToken *)token{
    NSLog (@"onLoginSuccess");
}

// 登录取消
- (void)onLoginCancel{
    NSLog (@"onLoginCancel");
}

// 登录失败
// @param error 失败原因
- (void)onLoginError:(NSError *)error{
    NSLog (@"onLoginError error");
}
```

</MultiLang>

## AccessToken

上面代码示例中的 `AccessToken` 用于用户鉴权，过期时间为 90 天（过期后 SDK 会自动清除本地缓存），可以传到游戏服务端去获取用户信息，参见 [获取用户信息](/sdk/taptap-login/guide/userinfo#流程)。

`AccessToken` 示例：

```json
{
   "access_token":"accessToken",
   "kid":"kid",
   "macAlgorithm":"macAlgorithm",
   "tokenType":"tokenType",
   "macKey":"macKey",
   "expireIn" :7776000
}
```

### 参数说明

参数  | 描述
| ------ | ------ |
access_token | 用户登录后的凭证
kid  | 当前实际返回的 kid 和 accessToken 值相等，建议使用 accessToken
macAlgorithm  | 固定为 `hmac-sha-1`
tokenType  | 固定为 `mac`
macKey  | mac 密钥
expireIn  | 过期时间


## TapTap 登录

在尝试登录用户前先检查登录状态。

### 检查登录状态

尝试获取当前用户的 Access Token，如 Access Token 为空则用户未登录。

<MultiLang>

```cs
TapBootstrap.GetAccessToken((accessToken, error) => {
   if (accessToken == null)
   {
       Debug.Log("当前未登录");
   }
   else
   {
       Debug.Log("已登录");
   }
});
```

```java
if (TapBootstrap.getCurrentToken() == null) {
    // 未登录
} else {
    // 已登录
}
```

```objectivec
AccessToken *accessToken = [TapBootstrap getCurrentToken];
if (accessToken == nil) {
    // 未登录
} else {
    // 已登录
}
```

</MultiLang>

### 登录

<MultiLang>

```cs
LoginType loginType = LoginType.TAPTAP;
TapBootstrap.Login(loginType, new string[] { "public_profile" });
```

```java
/**
 * @param activity 当前 Activity
 * @param @param LoginType.TAPTAP
 */
TapBootstrap.login(MainActivity.this, LoginType.TAPTAP, "public_profile");
```

```objectivec
TapBootstrapLoginType loginType = TapBootstrapLoginTypeTapTap;
[TapBootstrap login:(loginType) permissions:@[@"public_profile"]];
```

</MultiLang>

### 登出

:::caution
当用户退出登录的时候请务必调用此方法执行退出功能， 避免用户信息错乱。
:::

<MultiLang>

```cs
TapBootstrap.Logout();
```

```java
TapBootstrap.logout();
```

```objectivec
[TapBootstrap logout];
```

</MultiLang>

## 打包

<MultiLang>
<>

### 打包 APK

1. 配置 package name 和签名文件：

   ![](/img/tap_unity_android_build.png)

2. 检查 **Player Settings > Other Settings > Target APILevel** 版本，当 `Target APILever < 29` 时，需要配置 manifest，在 application 节点添加

    ```
    tools:remove="android:requestLegacyExternalStorage"
    ```

### 导出 Xcode 工程

需要配置 icon 和 bundleId

![](/img/tap_ios_build.png)

</>
<>

按通常的 Android APK 打包流程操作即可。

</>
<>

按通常的 iOS 应用打包流程操作即可。

</>
</MultiLang>
