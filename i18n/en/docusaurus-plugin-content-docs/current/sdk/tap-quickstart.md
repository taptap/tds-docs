---
id: tap-quickstart
title: TapSDK Quick Start
sidebar_label: Quick Start
slug: /sdk
---
import MultiLang from '@theme/MultiLang';

This quick start guide describes how to setup TapSDK and implement [TapTap sign-in.](/pro/pro-login)

:::note
Check the [download page](/sdk/tap-download) for Unity, Android, and iOS demos.
:::

## Create an Application
Please register a developer account at the [TapTap Developer Center](https://developer.taptap.com/) and create an application.

## Download TapTap
Click to download [the TapTap application](https://www.taptap.com/mobile)

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

## Project Setup

<MultiLang>
<>

Depending on your project needs, you can choose to use Unity Package Manger or import the SDK manually.

### Using Unity Package Manager

Add the following dependencies in `Packages/manifest.json`:

```json
"dependencies":{
// Sign-in
"com.taptap.tds.login":"https://github.com/TapTap/TapLogin-Unity.git#2.0.0",
"com.taptap.tds.common":"https://github.com/TapTap/TapCommon-Unity.git#2.0.0",
"com.taptap.tds.bootstrap":"https://github.com/TapTap/TapBootstrap-Unity.git#2.0.0",
// Moment
"com.taptap.tds.moment":"https://github.com/TapTap/TapMoment-Unity.git#2.0.0",
// Analytics 
"com.taptap.tds.tapdb": "https://github.com/TapTap/TapDB-Unity.git#2.0.0",
}
```

[Click here](https://github.com/TapTap) to refer to the latest version number.

### Manual Import

1. [Click here to download the TapSDK-UnityPackage.zip](/sdk/tap-download.md)and then unzip it.

2. In your Unity project, access **Assets > Import Packages > Custom Packages**.

3. Import the interested packages to your project.
   
    - `TapTap_TapBootstrap.unitypackage` TapSDK Launcher (mandatory)
    - `TapTap_TapCommon.unitypackag` TapSDK Foundation Library (mandatory)
    - `TapTap_TapLogin.unitypackage` TapTap Sign-in (mandatory)
    - `TapTap_TapMoment.unitypackage` TapTap Moment
    - `TapTap_TapDB.unitypackage` Analytics

Change Android and iOS related configurations afterwards.

### Android Configuration

1. Add Android profile via **File > Build Settings**. 

    ![](/img/tap_unity_amanifest.png)

2. Add the following code under Application Tag in the `Assets/Plugins/Android/AndroidManifest.xml` file.

    ```xml
    <activity
        android:name="com.taptap.sdk.TapTapActivity"
        android:configChanges="keyboard|keyboardHidden|screenLayout|screenSize|orientation"
        android:exported="false"
        android:theme="@android:style/Theme.Translucent.NoTitleBar.Fullscreen" />
    ```
    
### iOS Configuration

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

1. [Click here to download TapSDK_Android_v2.0.0.zip](/sdk/tap-download) and import the SDK package into the `project/app/libs` directory.
 
2. Open the `project/app/build.gradle` file and edit the gradle configuration as follows:
    
    ```java
    repositories{  
        flatDir {  
            dirs 'libs'  
        }  
    }  
    }  
    dependencies {  
    ...  
        implementation (name:'TapBootstrap_2.0.0', ext:'aar')  //  TapSDK Launcher (mandatory) 
        implementation (name:'TapCommon_2.0.0', ext:'aar') //  TapSDK Foundation Library (mandatory) 
		implementation (name:'TapLogin_2.5.4', ext:'aar') //  TapTap Sign-in (mandatory) 
        executive (name:'TapMoment_2.0.0', ext:'aar') // TapTap Moment
        name:'TapDB_3.0.2', ext:'aar') // Analytics
    }  
    ```
 
3. Request network permission in  `AndroidManifest.xml`:
   
    ```java
    <uses-permission android:name="android.permission.INTERNET"></uses-permission>
    ```

4. Extra configuration for outdated Android versions: 

    Add the following configuration if `targetSdkVersion < 29`:  

    - Add `xmlns:tools="http://schemas.android.com/tools"` in the manifest node.  
    - Add `tools:remove="android:requestLegacyExternalStorage"` in the application node.

</>
<>

### Import the SDK

1. Select the project in Xcode, and then add `-ObjC` in **Build Settings > Other Linker Flags**.

2. Just drag and drop [the downloaded TapSDK_iOS_v2.0.0.zip](/sdk/tap-download) file to the project directory.

3. Import the following downloaded resource files as needed:

    - Mandatory: TapTap launcher, foundation library, sign-in

        ```
        TapBootstrapResource.bundle
        TapBootstrapSDK.framework
        TapCommonResource.bundle
        TapCommonSDK.framework
        TapLoginSDK.framework
        ```

    - TapTap Moment    

        ```
        TapMomentResource.bundle
        TapMomentSDK.framework
        ```
    
    - Analytics

        ```
        TapDB.framework
        ```

4. Please make sure the following dependencies were added:

    ```
    // mandatory
    WebKit.framework
    Security.framework
    SystemConfiguration.framework
    CoreTelephony.framework
    SystemConfiguration.framework
    libc++.tbd

    // TapTap Moment
    AVFoundation.framework
    CoreTelephony.framework
    MobileCoreServices.framework
    Photos.framework
    SystemConfiguration.framework
    WebKit.framework

    // Analytics
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

**TapTap Moment requires to access album, camera, and microphone. Analytics requires the IDFA permission. **

Therefore, if your game uses TapTap Moment or Analytics, you need to specify the following permission requests in `info.plist` (please change the purpose strings accordingly):

```xml
<!-- Photo Library -->
<key>NSPhotoLibraryUsageDescription</key>
Explain why your app requires this permission.
<!-- Camera -->
<key>NSCameraUsageDescription</key>
Explain why your app requires this permission.
<!-- Microphone -->
<key>NSMicrophoneUsageDescription</key>
Explain why your app requires this permission.
<!-- IDFA -->
<key>NSUserTrackingUsageDescription</key>
Explain why your app requires this permission.
```

### Configure Opening the TapTap Application

When a user does not install the TapTap application on their device, TapTap Sign-in will use WebView by default.

1. Add the following configuration in `info.plist` (replace the `clientID` with the value shown on the dashboard):

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

   - If `SceneDelegate.m` is present, add the following code to it:

      ```objectivec
      #import <TapBootstrapSDK/TapBootstrapSDK.h>
      - (void)scene:(UIScene *)scene openURLContexts:(NSSet<UIOpenURLContext *> *)URLContexts{
          [TapBootstrap handleOpenURL:URLContexts.allObjects.firstObject.URL];
      }
      ```

   - If `SceneDelegate.m` is absent, add the following code to `AppDelegate.m`:

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

Initialize TapSDK with required application configuration information (Client ID, region etc.):

<MultiLang>

```cs
TapConfig tapConfig = new TapConfig("your-client-id", true); // true: China, false: Global
TapBootstrap.Init(tapConfig);
```

```java
TapConfig tapConfig = new TapConfig.Builder()
                .withAppContext(getApplicationContext())
                .withClientId ("clientId") // You can find the Client ID in TapTap Developer Center.
                .withRegionType (TapRegionType.CN)// TapRegionType.CN: China, TapRegionType.IO: Global
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

## Sign-in Callback

Register the sign-in callback to receive the sign-in results:

<MultiLang>

```cs
TapBootstrap.RegisterLoginResultListener(new MyLoginCallback());
public class MyLoginCallback : ITapLoginResultListener {
  public void OnLoginSuccess(AccessToken accessToken)
  {
      Debug.Log ("Login Success: " and accessToken.ToJSON());
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
// register the sign-in callback
[TapBootstrap registerLoginResultDelegate:self];

// implement the callback method

// @param token the token object
- (void)onLoginSuccess:(AccessToken *)token{
    NSLog (@"onLoginSuccess");
}


- (void)onLoginCancel{
    NSLog (@"onLoginCancel");
}


@param error failure cause
- (void)onLoginError:(NSError *)error{
    NSLog (@"onLoginError error");
}
```

</MultiLang>

## AccessToken

 `AccessToken` in the code sample above is used for user authentication. It will expire in 90 days (the SDK automatically clears the local cache after its expiration). You can pass it  to the server side to get user information (see [Get User Information](/api/service#流程)).

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

parameter  | description
| ------ | ------ |
accessToken | user credential
kid  | Currently its value is identical to accessToken. We recommend to use the value of accessToken.
macAlgorithm  | Currently its value is fixed: `hmac-sha-1`.
tokenType  | Currently its value is fixed: `mac`.
macKey  | mac key
expireIn  | expiration time


## TapTap Sign-in

Check the sign-in status first. If the user has already signed in, they can start playing directly. Otherwise they need to sign in.

### Check the Sign-in Status

Try to get Access Token for the current user. If the token is empty, the user is not logged in.

<MultiLang>

```cs
TapBootstrap.GetAccessToken((accessToken, error) => {
   if (accessToken == null)
   {
       Debug.Log ("not logged in");
   }
   else
   {
       Debug.Log ("logged in");
   }
});
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

### Sign In

<MultiLang>

```cs
TapConfig config = new TapConfig();
LoginType loginType = LoginType.TAPTAP;
TapBootstrap.Login(loginType, new string[] { "public_profile" });
```

```java
/**
 * @param activity current Activity
 * @param @param LoginType.TAPTAP
 */
TapBootstrap.login(MainActivity.this, LoginType.TAPTAP, "public_profile");
```

```objectivec
TapBootstrapLoginType loginType = TapBootstrapLoginTypeTapTap;
[TapBootstrap login:(loginType) permissions:@[@"public_profile"]];
```

</MultiLang>

### Sign Out

:::caution
Be sure to invoke this method when the user signs out, avoiding to corrupt the user information.
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
