---
id: tap-quickstart
title: TapSDK Quick Start
sidebar_label: Quick Start
slug: /sdk
---
import MultiLang from '@theme/MultiLang';

This guide describes how to setup TapSDK and implement [TapTap Login.](/pro/pro-login)

:::note
Go to [download](/sdk/tap-download) the demos of Unity, Android, and iOS .
:::

## Create Application
Register a developer account at the [TapTap Developer Center](https://developer.taptap.com/) and create an application.

## Download TapTap
Click to download [TapTap Application](https://www.tap.io/mobile)

## Prerequisites

<MultiLang>
<>

- Unity 2018.3 or later
- iOS 10 or later
- Android level 21 or later

</>
<>

- Android level 21 or later

</>
<>

- iOS 10 or later 

</>
</MultiLang>

## Setup

<MultiLang>
<>

You can choose to use Unity Package Manger or import the SDK manually.

### Unity Package Manager

Add the following dependencies in `Packages/manifest.json`:

```json
"dependencies":{
// Login
"com.taptap.tds.login":"https://github.com/TapTap/TapLogin-Unity.git#2.0.0",
"com.taptap.tds.common":"https://github.com/TapTap/TapCommon-Unity.git#2.0.0",
"com.taptap.tds.bootstrap":"https://github.com/TapTap/TapBootstrap-Unity.git#2.0.0",
// Moment
"com.taptap.tds.moment":"https://github.com/TapTap/TapMoment-Unity.git#2.0.0",
// Data Acquisition
"com.taptap.tds.tapdb": "https://github.com/TapTap/TapDB-Unity.git#2.0.0",
}
```

Refer to the latest version number [here](https://github.com/TapTap).

### Import Manually

1. Download [TapSDK-UnityPackage.zip](/sdk/tap-download.md).

2. In your Unity project, access **Assets > Import Packages > Custom Packages**.

3. Import the interested packages in TapSDK to your project according to your own needs.
   
    - `TapTap_TapBootstrap.unitypackage` TapSDK Launcher (required)
    - `TapTap_TapCommon.unitypackag` TapSDK Foundation Library (required)
    - `TapTap_TapLogin.unitypackage` TapTap Login (required)
    - `TapTap_TapMoment.unitypackage` TapTap Embedded Moments
    - `TapTap_TapDB.unitypackage` Data Acquisition

You will need to complete the configuration for Android and iOS afterward.

### Android 

1. Add Android profile via **File > Build Settings**. 

    ![](/img/tap_unity_amanifest.png)

2. Add the following codes under Application Tag in the `Assets/Plugins/Android/AndroidManifest.xml` file.

    ```xml
    <activity
        android:name="com.taptap.sdk.TapTapActivity"
        android:configChanges="keyboard|keyboardHidden|screenLayout|screenSize|orientation"
        android:exported="false"
        android:theme="@android:style/Theme.Translucent.NoTitleBar.Fullscreen" />
    ```
    
### iOS 

Create a `TDS-Info.plist` file under the `Assets/Plugins/iOS/Resource` directory. Then copy and paste the following code. Please replace the `ClientId` and the purpose strings accordingly.

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
    <key>Apple_SignIn_Enable</key>
    <string>false</string>
    <key>NSPhotoLibraryUsageDescription</key>
    <string>Explain why your app needs this permission.</string>
    <key>NSCameraUsageDescription</key>
    <string>Explain why your app needs this permission.</string>
    <key>NSMicrophoneUsageDescription</key>
    <string>Explain why your app needs this permission.</string>
    <key>NSUserTrackingUsageDescription</key>
    <string>Explain why your app needs this permission.</string>
</dict>
</plist>
```

</>
<>

1. Download [TapSDK_Android_v2.0.0.zip](/sdk/tap-download) and import the SDK package into the `project/app/libs` directory.
 
2. Open the `project/app/build.gradle` file and edit the gradle configuration as follows:
    
    ```java
    repositories{  
        flatDir {  
            dirs 'libs'  
        }  
    }  
    }  
    dependencies {  
      
        implementation (name:'TapBootstrap_2.0.0', ext:'aar')  // Required: TapSDK Launcher 
        implementation (name:'TapCommon_2.0.0', ext:'aar') // Required: TapSDK Foundation Library 
		implementation (name:'TapLogin_2.5.4', ext:'aar') // Required: TapTap Login 
        implementation (name:'TapMoment_2.0.0', ext:'aar') // TapTap Moment
        implementation (name:'TapDB_3.0.2', ext:'aar') // Data Acquisition
    }  
    ```
 
3. Request network permission in  `AndroidManifest.xml`:
   
    ```java
    <uses-permission android:name="android.permission.INTERNET"></uses-permission>
    ```

4. Extra configuration for older Android versions: 

    Add the following configuration if `targetSdkVersion < 29`:  

    - Add `xmlns:tools="http://schemas.android.com/tools"` in the manifest node.  
    - Add `tools:remove="android:requestLegacyExternalStorage"` in the application node.

</>
<>

### Import SDK

1. Select the project in Xcode, and then add `-ObjC` to **Build Settings > Other Linker Flags**.

2. Drag and drop the downloaded [TapSDK_iOS_v2.0.0.zip](/sdk/tap-download) file to the project directory.

3. Import the following downloaded resource files if necessary:

    - Required: TapTap Launcher, Foundation Library, Login

        ```
        TapBootstrapResource.bundle
        TapBootstrapSDK.framework
        TapCommonResource.bundle
        TapCommonSDK.framework
        TapLoginSDK.framework
        ```

    - TapTap Embedded Moments    

        ```
        TapMomentResource.bundle
        TapMomentSDK.framework
        ```
    
    - Data Acquisition

        ```
        TapDB.framework
        ```

4. Make sure the following dependencies were added:

    ```
    // Required
    WebKit.framework
    Security.framework
    SystemConfiguration.framework
    CoreTelephony.framework
    SystemConfiguration.framework
    libc++.tbd

    // TapTap Embedded Moments
    AVFoundation.framework
    CoreTelephony.framework
    MobileCoreServices.framework
    Photos.framework
    SystemConfiguration.framework
    WebKit.framework

    // Data Acquisition 
    AppTrackingTransparency.framework
    AdSupport.framework
    CoreMotion.framework
    Security.framework
    SystemConfiguration.framework
    libresolv.tbd
    libsqlite3.0.tbd
    libz.tbd
    ```

### Configure Permissions

**TapTap Embedded Moments will require access to the album, camera, and microphone, and Data Acquisition will require the IDFA permission.**

Therefore, if your game uses TapTap Embedded Moments or Data Acquisition, you will need to specify the following permission requests in `info.plist` (remember to change the purpose strings accordingly):

```xml
<!-- Photo Library -->
<key>NSPhotoLibraryUsageDescription</key>
<string>Explain why your app needs this permission.</string>
<!-- Camera -->
<key>NSCameraUsageDescription</key>
<string>Explain why your app needs this permission.</string>
<!-- Microphone -->
<key>NSMicrophoneUsageDescription</key>
<string>Explain why your app needs this permission.</string>
<!-- IDFA -->
<key>NSUserTrackingUsageDescription</key>
<string>Explain why your app needs this permission.</string>
```

### Configure Launching TapTap Application

When users have not installed the TapTap application on their device, TapTap Login will use WebView by default.

1. Add the following configuration in `info.plist` (replace the `clientID` with the value shown on the Console):

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

2. Depending on whether the project has a `SceneDelegate.m` file:

   - If there is a `SceneDelegate.m`, add the following code to it:

      ```objectivec
      #import <TapBootstrapSDK/TapBootstrapSDK.h>
      - (void)scene:(UIScene *)scene openURLContexts:(NSSet<UIOpenURLContext *> *)URLContexts{
          [TapBootstrap handleOpenURL:URLContexts.allObjects.firstObject.URL];
      }
      ```

   - If there is no `SceneDelegate.m`, add the following code to `AppDelegate.m`:

      ```objectivec
      - (BOOL)application:(UIApplication *)application openURL:(NSURL *)url sourceApplication:(NSString *)sourceApplication annotation:(id)annotation {
        return [TapBootstrap handleOpenURL:url];
      }

      - (BOOL)application:(UIApplication *)app openURL:(NSURL *)url options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options {
        return [TapBootstrap handleOpenURL:url];
      }
      ```

    Also add `UIWindow` to `AppDelegate.h`. Then delete the Application Scene Manifest in `info.plist`.

    ```objectivec
    @property (strong, nonatomic) UIWindow *window;
    ```

    ![](/img/tap_ios_appmanifest.png)

</>
</MultiLang>

## Initialization

Initialize TapSDK with required application configuration information (Client ID, region, etc.):

<MultiLang>

```cs
TapConfig tapConfig = new TapConfig("your-client-id", true); // true: Mainland China, false: International
TapBootstrap.Init(tapConfig);
```

```java
TapConfig tapConfig = new TapConfig.Builder()
                .withAppContext(getApplicationContext())
                .withClientId ("clientId") // You can find the Client ID in TapTap Developer Center.
                .withRegionType (TapRegionType.CN)// TapRegionType.CN: Mainland China, TapRegionType.IO: International
                .build();
TapBootstrap.init(MainActivity.this, tapConfig);  
```

```objectivec
TapConfig *config = TapConfig.new;
config.clientId = @"clientId";
config.region = TapSDKRegionTypeCN;
[TapBootstrap initWithConfig:config];
```

</MultiLang>

## Login Callback

Register the login callback to receive the login results:

<MultiLang>

```cs
TapBootstrap.RegisterLoginResultListener(new MyLoginCallback());
public class MyLoginCallback : ITapLoginResultListener {
  public void OnLoginSuccess(AccessToken accessToken)
  {
      Debug.Log ("Login successful: " + accessToken.ToJSON());
  }

  public void OnLoginError(TapError error)
  {
      Debug.Log ("Login failed: " . . . error.errorDescription);
  }

  public void OnLoginCancel()
  {
      Debug.Log ("Login canceled.");
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
        Log.d(TAG, "onLoginError: " + tapError.getMessage());
    }

    @Override
    public void loginCancel() {
        Log.d(TAG, "onLoginCancel");
    }
});
```

```objectivec
// Register the login callback
[TapBootstrap registerLoginResultDelegate:self];

// implement the callback method
// Login successful callback
// @param token the token object
- (void)onLoginSuccess:(AccessToken *)token{
    NSLog (@"onLoginSuccess");
}

// Login canceled
- (void)onLoginCancel{
    NSLog (@"onLoginCancel");
}

// Login failed
// @param error Reason for failure
- (void)onLoginError:(NSError *)error{
    NSLog (@"onLoginError error");
}
```

</MultiLang>

## AccessToken

 `AccessToken` in the code sample above is used for user authentication. It will expire in 90 days (the SDK will automatically clear the local cache after its expiration). You can pass it to the server to get user information.

`AccessToken` example:

```json
{
  "accessToken":"accessToken",
  "kid":"kid",
  "macAlgorithm":"macAlgorithm",
  "tokenType":"tokenType",
  "macKey":"macKey",
  "expireIn" :7776000
}
```

### Parameters

Parameter  | Description
| ------ | ------ |
accessToken | User credential
kid  | Currently its value is identical to accessToken. We recommend to use the value of accessToken.
macAlgorithm  | Currently its value is fixed to `hmac-sha-1`.
tokenType  | Currently its value is fixed to `mac`.
macKey  | mac key
expireIn  | Expiration time


## TapTap Login

Check the login status before trying to log in a user.

### Check Login Status

Try to get Access Token for the current user. If Access Token is empty, the user is not logged in.

<MultiLang>

```cs
TapBootstrap.GetAccessToken((accessToken, error) => {
   if (accessToken == null)
   {
       Debug.Log("not logged in");
   }
   else
   {
       Debug.Log("logged in");
   }

```

```java
if (TapBootstrap.getCurrentToken() == null) {
    // not logged in
} else {
    // logged in
}
```

```objectivec
AccessToken *accessToken = [TapBootstrap getCurrentToken];
if (accessToken == nil) {
    // not logged in
} else {
    // logged in
}
```

</MultiLang>

### Log In

<MultiLang>

```cs
TapConfig config = new TapConfig();
LoginType loginType = LoginType.TAPTAP;
TapBootstrap.Login(loginType, new string[] { "public_profile" });
```

```java
/**
 * @param activity Current Activity
 * @param @param LoginType.TAPTAP
 */
TapBootstrap.login(MainActivity.this, LoginType.TAPTAP, "public_profile");
```

```objectivec
TapBootstrapLoginType loginType = TapBootstrapLoginTypeTapTap;
[TapBootstrap login:(loginType) permissions:@[@"public_profile"]];
```

</MultiLang>

### Log Out

:::caution
Remember to invoke this method when the user logs out to avoid corrupting the user information.
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

## Packaging

<MultiLang>
<>

### APK Packaging

1. Configure package name and signature files:  

    ![](/img/tap_unity_android_build.png)

2. Access **Player Settings > Other Settings > Target APILevel**  to check the version. If `Target APILever < 29`, the manifest needs to be configured. Add the following code in the application node:

    ```
    tools:remove="android:requestLegacyExternalStorage"
    ```

### Export Xcode Project

You need to configure icon and bundleId.

![](/img/tap_ios_build.png)

</>
<>

Package the Android APK as usual.

</>
<>

Package the iOS application as usual.

</>
</MultiLang>
