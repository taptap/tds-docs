---
title: TapSDK Quickstart
sidebar_label: Quickstart
sidebar_position: 4
---

import MultiLang from '/src/docComponents/MultiLang';
import CodeBlock from '@theme/CodeBlock';
import sdkVersions from '/src/docComponents/sdkVersions';
import {Conditional} from '/src/docComponents/conditional';

This article will introduce how to quickly integrate TapSDK and use the **[TapTap Login](/sdk/taptap-login/guide/start/)** function.

:::note
[Download](/tap-download) page provides Unity, Android, iOS examples for reference.
:::

## Creating Applications

Log into the <Conditional region='cn'>[TapTap Developer Center](https://developer.taptap.com/) </Conditional> <Conditional region='global'>[TapTap Developer Center](https://developer.taptap.io/)</Conditional> to register as a developer and create an application.

## Downloading TapTap Applications

Download the <Conditional region='cn'>[TapTap app](https://www.taptap.com/mobile) </Conditional> <Conditional region='global'>[TapTap app](https://www.taptap.io/mobile)</Conditional> on your test device. When testing your game, the SDK will take you to the TapTap app for the authorization process. If the TapTap app is not installed on your device, a WebView will be opened for you to log in.

## Environment Requirements

<MultiLang>
<>

- Unity 2018.3 or later
- iOS 10 or later
- Android 5.0 (API level 21) or higher

</>
<>

- Android 5.0 (API level 21) or higher

</>
<>

- iOS 10 or later

</>
</MultiLang>

:::caution

- In the **Project Configurations** and \*_Initialization_ sections below, it is assumed that the developer is using [TDS Authentication](/sdk/authentication/features/) services.
- If the game already has a complete account system and only requires TapTap Login and Moments without needing additional TDS cloud services, then there is no need to reference configurations and initializations below. Skip to the [Basic TapTap Login Developer Guide](/sdk/taptap-login/guide/tap-login/) and/or the [Moments Developer Guide](/sdk/embedded-moments/guide/).
- Please choose carefully. If other TDS services are needed later, it could be hard for you to make a switch.

:::

## Project Configuration

<MultiLang>
<>

The SDK can be imported **either through the Unity Package Manager or manually**.

#### Method 1: Use Unity Package Manager

Add the following dependencies in the `Packages/manifest.json` file:

<CodeBlock className="json">
{`"dependencies":{
    "com.taptap.tds.login":"https://github.com/TapTap/TapLogin-Unity.git#${sdkVersions.taptap.unity}",
    "com.taptap.tds.common":"https://github.com/TapTap/TapCommon-Unity.git#${sdkVersions.taptap.unity}",
    "com.taptap.tds.bootstrap":"https://github.com/TapTap/TapBootstrap-Unity.git#${sdkVersions.taptap.unity}",
    "com.leancloud.realtime": "https://github.com/leancloud/csharp-sdk-upm.git#realtime-${sdkVersions.leancloud.csharp}",
    "com.leancloud.storage": "https://github.com/leancloud/csharp-sdk-upm.git#storage-${sdkVersions.leancloud.csharp}",
}`}
</CodeBlock>

In Unity’s top menu, select **Window > Package Manager** to view the packages already installed in the project.

#### Method 2: Import Manually

1. [Click here to download](/tap-download) `TapSDK-UnityPackage.zip` and `LeanCloud-SDK-Realtime-Unity.zip`.

2. In the Unity project navigate to **Assets > Import Packages > Custom Packages** and select the TapSDK packages you want to use from the decompressed `TapSDK-UnityPackage.zip` files. Of which:

  - `TapTap_Bootstrap.unitypackage` TapSDK Launcher must be selected.
  - `TapTap_Common.unitypackage` TapSDK Basic Library must be selected.
  - `TapTap_Login.unitypackage` TapTap Login must be selected.

3. Drag the uncompressed `LeanCloud-SDK-Realtime-Unity.zip` plugins folder into Unity.

:::tip
If you have manually downloaded the unitypackage to import SDK, you must configure `Assets/TapTap/Common/Plugins/iOS/TapTap.Common.dll` to support iOS only.
:::

After importing SDK, you must configure the corresponding Android/iOS platform.

#### Android Configuration

1. **File > Build Settings** to add the Android configuration file.

   ![](/img/tap_unity_amanifest.png)

2. Edit the `Assets/Plugins/Android/AndroidManifest.xml` file in the Application Tag to add the following code:

    ```xml
    <activity
        android:name="com.taptap.sdk.TapTapActivity"
        android:configChanges="keyboard|keyboardHidden|screenLayout|screenSize|orientation"
        android:exported="false"
        android:theme="@android:style/Theme.Translucent.NoTitleBar.Fullscreen" />
    ```

#### iOS Configuration

In the `Assets/Plugins/iOS/Resource` directory, download the `TDS-Info.plist` file and copy the following code to replace the authorization file in the `ClientId`:

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
    <string>Explain why this application requires this permission.</string>
    <key>NSCameraUsageDescription</key>
    <string>Explain why this application requires this permission.</string>
    <key>NSMicrophoneUsageDescription</key>
    <string>Explain why this application requires this permission.</string>
    <!--TapDB needs to be used to collect IDFA. If the application does not need a pop-out menu, configure TapDB.AdvertiserIDCollectionEnabled(false)-->
    <key>NSUserTrackingUsageDescription</key>
    <string>Explain why this application requires this permission.</string>
</dict>
</plist>
```

</>
<>

1. [Click here to download TapSDK_Android](/tap-download) to import the SDK pack into the  `project/app/libs` directory.

2. Open the project's `project/app/build.gradle` file and add the following gradle configurations:

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

3. Add network permission to `AndroidManifest.xml`:

    ```java
    <uses-permission android:name="android.permission.INTERNET"></uses-permission>
    ```

4. Add additional configurations for older Android versions.

   If `targetSdkVersion < 29`, you must add the following configurations:

   - Manifest node adds `xmlns:tools="http://schemas.android.com/tools"`
   - Application node adds `tools:remove="android:requestLegacyExternalStorage"`

</>
<>

#### Import SDK

1. In Xcode, select the project and add `-ObjC` into **Build Setting > Other Linker Flags**

2. Drag [Downloaded TapSDK_iOS.zip](/tap-download) into the project directory.

3. Import downloaded resource files as needed:

    - Must select: TapTap Launcher, Basic Library, and Login

        ```
        TapBootstrapSDK.framework 
        TapCommonSDK.framework 
        TapLoginSDK.framework 
        LeanCloudObjc.framework
        ```

4. Please carefully check whether the following dependency libraries are added successfully:

    ```
    // Must select
    WebKit.framework
    Security.framework
    SystemConfiguration.framework
    CoreTelephony.framework
    SystemConfiguration.framework
    libc++.tbd

    // TapTap Moments
    AVFoundation.framework
    CoreTelephony.framework
    MobileCoreServices.framework
    Photos.framework
    SystemConfiguration.framework
    WebKit.framework

    // Data Analysis
    // If you do not need to fetch IDFA, then don't add the system libraries `AppTrackingTransparency` and `AdSupport`.
    AppTrackingTransparency.framework
    AdSupport.framework
    CoreMotion.framework
    Security.framework
    SystemConfiguration.framework
    libresolv.tbd
    libsqlite3.0.tbd
    libz.tbd
    ```

#### Configuration Permission

**TapTap Moments requires photo library, camera, and microphone access permission. Data Analysis requires IDFA permission.**

If the game imports TapTap Moments or Data Analysis, then you must add the following configurations to `info.plist` (replace the authorization copy):

```xml
<!-- Photo Library -->
<key>NSPhotoLibraryUsageDescription</key>
<string>Explain why this application requires this permission.</string>
<!-- Camera -->
<key>NSCameraUsageDescription</key>
<string>Explain why this application requires this permission.</string>
<!-- Microphone -->
<key>NSMicrophoneUsageDescription</key>
<string>Explain why this application requires this permission.</string>
<!--TapDB needs to be used to collect IDFA. If the application does not need a pop-out menu, configure  TapDB.AdvertiserIDCollectionEnabled(false)-->
<key>NSUserTrackingUsageDescription</key>
<string>Explain why this application requires this permission.</string>
```

#### Transferring Configurations to TapTap Applications

When a user does not have any TapTap applications, the WebView login will be displayed by default.

1. Open `info.plist`, then add the following configurations (replace `clientID` as the `Client ID` you obtained from the control panel):

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
                <!-- Note: Remove the brackets and type tt before the final ClientId. For example: ttFwFdCxxxxxxxQDQwQN -->
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

2. Configure openUrl：

    a) If the project has `SceneDelegate.m`, delete it first and then add the following code into the `AppDelegate.m` file:

        ```objectivec
        - (BOOL)application:(UIApplication *)application openURL:(NSURL *)url sourceApplication:(NSString *)sourceApplication annotation:(id)annotation {
        return [TapBootstrap handleOpenURL:url];
        }

        - (BOOL)application:(UIApplication *)app openURL:(NSURL *)url options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options {
        return [TapBootstrap handleOpenURL:url];
        }
        ```

    b) Delete the Application Scene Manifest in `info.plist`.
       ![](/img/tap_ios_appmanifest.png)

    c) Delete the two methods for regulating the Scenedelegate lifecycle agent in AppDelegate.m.

        ```objectivec
        #pragma mark - UISceneSession lifecycle
        - (UISceneConfiguration *)application:(UIApplication *)application configurationForConnectingSceneSession:(UISceneSession *)connectingSceneSession options:(UISceneConnectionOptions *)options {
        
        return [[UISceneConfiguration alloc] initWithName:@"Default Configuration" sessionRole:connectingSceneSession.role];
        }

        - (void)application:(UIApplication *)application didDiscardSceneSessions:(NSSet<UISceneSession *> *)sceneSessions {
        }
        ```

    d) Add `UIWindow` to `AppDelegate.h`.

    ```objectivec
    @property (strong, nonatomic) UIWindow *window;
    ```

</>
</MultiLang>

## Initialization

When initializing TapSDK, you must import the `Client ID` and domain-related configuration info.

<MultiLang>

```cs
using TapTap.Bootstrap; // Namespace

var config =  new TapConfig.Builder()
    .ClientID("your_client_id")  // (Required) Corresponding Client ID in the Developer Center.
    .ClientToken("your_client_token")  // (Required) Corresponding Client Token in the Developer Center.
    .ServerURL("https://your_server_url") //(Required) Developer Center > Your Game > Game Services > Cloud Services > Data Storage > Service Settings > Custom Domain Name > Bind Domain Name
    .RegionType(RegionType.CN)  // (Optional) CN for Mainland China, IO for international.
    .ConfigBuilder();
TapBootstrap.Init(config);
````

```java
TapConfig tdsConfig = new TapConfig.Builder()
        .withAppContext(MainActivity.this)  // Context
        .withClientId("your_client_id")  // Corresponding Client ID in the Developer Center.
        .withClientToken("your_client_token")  // Corresponding Client Token in the Developer Center.
        .withServerURL("https://your_server_url") // Developer Center > Your Game > Game Services > Cloud Services > Data Storage > Service Settings > Custom Domain Name > Bind Domain Name
        .withRegionType(TapRegionType.CN)  // TapRegionType.CN: Mainland China; TapRegionType.IO: International
        .build();
TapBootstrap.init(MainActivity.this, tdsConfig);     
```

```objectivec
// The project must import `TapBootstrap`, `TapLogin`, `TapCommon`, and `LeanCloudObjc`, then initialize according to the following method:
TapConfig *config = [TapConfig new];
config.clientId = @"your_client_id";  //  Corresponding Client ID in the Developer Center.
config.clientToken = @"your_client_token";  // Corresponding Client Token in the Developer Center.
config.region = TapSDKRegionTypeCN;  // TapSDKRegionTypeCN: Domestic  TapSDKRegionTypeIO: International
config.serverURL = @"https://your_server_url";  // Developer Center > Your Game > Game Services > Cloud Services > Data Storage > Service Settings > Custom Domain Name > Bind Domain Name
[TapBootstrap initWithConfig:config];
```

</MultiLang>

You can find `client_id` and `client_token` in **Developer Center > Your Game > Game Services > App Configurations**.

Please visit **[Bind Domain Name](/sdk/start/get-ready/#domain-names)** to learn more about `server_url`.

## Integrate Functions

TapSDK provides a variety of functions. After initializing SDK, reference the document for integrating the corresponding function.
Many of the functions can be integrated via TapTap Login, so we recommend this as the starting point.

:::tip
Important: You must [Configure Signature Certification](/sdk/start/quickstart/#configure-signature-certificate) and [Add Testers](/sdk/start/test-accounts/) **before testing the login function**. Otherwise, TapTap Login will not operate normally.
:::

### Integrate TapTap Login

Follow the Developer Guide [Getting Started, Integrate TapTap Quick Login](/sdk/taptap-login/guide/start) to finish setup. Select Basic TapTap Login or TDS Authentication to integrate the TapTap Login.

### Configure Signature Certificate

For Android and iOS applications, go to your game from the Developer Center, then go to **Game Services > Gaming Ecosystem > TapTap Login** to configure the corresponding app information (see below). Otherwise, the SDK will return a `signature not match` error, and the TapTap Login function will not work properly.

![](/img/io/login-config.png)

### Add Testers

View [Manage Testers](/sdk/start/test-accounts/).

Next, you can package the application and test the TapTap Login function.

### Android Code Obfuscation

TapSDK has already undergone obfuscation. Therefore, initiating another obfuscation will create unexpected issues. Please fill in the following configurations in the scripts to skip TapSDK obfuscation:

```java
-keep class com.tds.** { *;}
-keep class com.taptap.** { *;}
-keep class com.tapsdk.** { *;}
-keep class tds.androidx.** { *;}
```

<Conditional region='cn'>

If cloud services based on **Data Storage** are used (ex: **TDS Authentication** login), then it requires you to add the corresponding obfuscation code: **[Data Storage](/sdk/storage/guide/setup-java/#android-code-obfuscation)**.

</Conditional>

## Package

Proceed with normal app packaging for Android or iOS. Here is the method for packaging apps on Unity:

## Package the APK

Step 1) Configure package name and signature file:

![](/img/tap_unity_android_build.png)

Step 2) Inspect  **File > Build Settings > Player Settings > Other Settings > Target API Level** version. If the API Level is below 29, you must configure the manifest by adding the following to the application node:

```
tools:remove="android:requestLegacyExternalStorage"
```

This is because SDK is configured  `android:requestLegacyExternalStorage = true` by default. If `targetSdkVersion < 29`, then it will return `Android resource linking failed`.

### Export Xcode Program

You must configure the icon and `BundleID`:

![](/img/tap_ios_build.png)
