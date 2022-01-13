---
id: guide
title: Copyright Verification
sidebar_label: Guide
---

import {Conditional} from '/src/docComponents/conditional';
import MultiLang from '/src/docComponents/MultiLang';
import CodeBlock from '@theme/CodeBlock';
import sdkVersions from '/src/docComponents/sdkVersions';
import {Gray,Blue, Red, Black} from '/src/docComponents/doc';

## Copyright Verification

<Gray>Integrate this feature to protect your paid games from APK leakage and piracy.</Gray>

Add the following dependencies to the `Packages/manifest.json` file in the project:

<CodeBlock className="json">
{`"dependencies":{
// Common library
"com.taptap.tds.common":"https://github.com/TapTap/TapCommon-Unity.git#${sdkVersions.taptap.unity_common}",
// Paid Purchase
"com.taptap.tds.dlc": "https://github.com/TapTap/TapLicense-Unity.git#${sdkVersions.taptap.unity}",
}`}
</CodeBlock>

### Set Up Authorization Callback

<MultiLang>

```cs
// Must import license library
using TapTap.License;

// By default, the SDK will display a window
// that can't be closed manually by the player to avoid unauthorized players from entering the game.
// If you want to use a callback to trigger a customized procedure,
// add the following code.
TapLicense.SetLicencesCallback(ITapLicenseCallback callback);

public interface ITapLicenseCallback
{
    // Authorization success callback
    void OnLicenseSuccess();
}

```

```java
// By default, the SDK will display a window
// that can't be closed manually by the player to avoid unauthorized players from entering the game.
// If you want to use a callback to trigger a customized procedure,
// add the following code.
TapLicenseHelper.setLicenseCallback(new TapLicenseCallback() {
    @Override
    public void onLicenseSuccess() {
        // Authorization success callback
    }
});
```

```objc
// Not supported for now.
```

</MultiLang>

### Payment and Authorization Verification

<MultiLang>

```cs
TapLicense.Check();
```

```java
TapLicenseHelper.check(Activity activity);
```

```objc
// Not supported for now.
```
</MultiLang>

## Testing

To ensure that the game can determine whether a player's purchase is effective after the release, **please follow the instructions below for self-testing. **

### Upload APK

Upload the APK to be tested to the Developer Center and complete the review process.

### Add Testers

Go to Developer Center >> <Blue>Game Services</Blue> >> <Blue>Gaming Ecosystem</Blue> >> <Blue>Copyright Verification</Blue> >> Enter tester’s TapTap ID.

### Begin the Test

Log in with the added tester account on TapTap app.

## Make your game paid

### Complete Information

Go to Developer Center, fill in the information according to the [Material Requirements](/store/store-material/) and submit for review.

### Set up Pricing

Go to Developer Center >> <Blue>Price Settings</Blue>, make your game a paid game and submit for review. Do not forget to inform the TapTap operation staff that you’ve been working with.

### Official Release

After completing the above steps, your game will be ready for the <Conditional region='cn'>[Official Release](/store/store-release/)</Conditional><Conditional region='global'>[Official Release](/store/store-publish-game)</Conditional>.


---

## FAQ

### How to fix Android 11 being unable to launch TapTap app

Android 11 has ramped up its privacy protection policies resulting in a series of changes and restrictions, one of the key changes being [Package Visibility](https://developer.android.com/about/versions/11/privacy/package-visibility), which prevents third-party apps from launching the TapTap client. This has affected related TapTap services from functioning properly, including but not limited to accessing TapTap during updates, purchase verification, and other functions. Notice that this change on Android 11 only affects apps that have been upgraded to `targetSdkVersion=30`. Apps that haven't been upgraded will not be affected.

**Solution 1**

During editing, change `targetSdkVersion` to 29. (Currently, setting this to 30 will trigger this problem.)

**Solution 2**

1. Change gradle build tools to 4.1.0+

    ```java
    classpath 'com.android.tools.build:gradle:4.1.0'
    ```

2. Add the following codes to AndroidManifest.xml

    ```xml
    <queries>
        <package android:name="com.taptap" />
        <package android:name="com.taptap.pad" />
        <package android:name="com.taptap.global" />
    </queries>
    ```