---
id: tap-unity2android
title: unity打包Android apk
sidebar_label: Unity2Android
---

## 按需要修改AndroidManifest  

可以根据需要,参照如下示例修改Plugins/Android/AndroidManifest.xml。  

```  
<?xml version="1.0" encoding="utf-8"?>
<manifest
    xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.xd.sdkdemo"
    xmlns:tools="http://schemas.android.com/tools"
    android:installLocation="preferExternal"
    android:versionCode="1"
    android:versionName="1.0">
    <supports-screens
        android:smallScreens="true"
        android:normalScreens="true"
        android:largeScreens="true"
        android:xlargeScreens="true"
        android:anyDensity="true"/>

 	<uses-sdk tools:overrideLibrary="com.bun.miitmdid"/>

    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
    <uses-permission android:name="android.permission.ACCESS_WIFI_STATE" />
    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />

    <application
        android:theme="@style/UnityThemeSelector"
        android:icon="@drawable/app_icon"
        android:label="@string/app_name"
        android:debuggable="true">

        <activity
        android:name="com.xd.sdklib.helper.XDStartView"
        android:theme="@android:style/Theme.Translucent.NoTitleBar.Fullscreen"
        android:configChanges="orientation|keyboardHidden|screenSize" />
    <activity
        android:name="com.xd.sdklib.helper.XDPayActivity"
        android:theme="@android:style/Theme.Translucent.NoTitleBar.Fullscreen"
        android:configChanges="orientation|keyboardHidden|screenSize"  />
    <activity
        android:name="com.xd.sdklib.helper.XDViewActivity"
        android:theme="@android:style/Theme.Translucent.NoTitleBar.Fullscreen"
        android:configChanges="orientation|keyboardHidden|screenSize" />
    <activity
        android:name="com.xd.sdklib.helper.XDWebView"
        android:theme="@android:style/Theme.Translucent.NoTitleBar.Fullscreen" />
    <activity
        android:name="com.xd.sdklib.helper.WXEntryActivity"
        android:theme="@android:style/Theme.Translucent.NoTitleBar.Fullscreen" />

    <activity-alias
        android:name="项目包名.wxapi.WXEntryActivity"
        android:exported="true"
        android:targetActivity="com.xd.sdklib.helper.WXEntryActivity"/>

    <!-- Ping++ SDK -->
    <activity
        android:name="com.pingplusplus.android.PaymentActivity"
        android:configChanges="orientation|screenSize"
        android:launchMode="singleTop"
        android:theme="@android:style/Theme.Translucent.NoTitleBar.Fullscreen" />

     <!-- TapTap登录 -->
    <activity
            android:name="com.taptap.sdk.TapTapActivity"
            android:exported="false"
            android:configChanges="keyboard|keyboardHidden|screenLayout|screenSize|orientation"
            android:theme="@android:style/Theme.Translucent.NoTitleBar.Fullscreen" />

    <activity
            android:name="com.taptap.forum.TapTapActivity"
            android:configChanges="keyboard|keyboardHidden|screenLayout|screenSize|orientation"
            android:exported="false"
            android:theme="@android:style/Theme.NoTitleBar.Fullscreen" />

    <!-- 支付宝 -->
    <activity
        android:name="com.alipay.sdk.app.H5PayActivity"
        android:configChanges="orientation|keyboardHidden|navigation"
        android:exported="false"
        android:screenOrientation="portrait" />
    <activity
        android:name="com.alipay.sdk.auth.AuthActivity"
        android:configChanges="orientation|keyboardHidden|navigation"
        android:exported="false"
        android:screenOrientation="portrait" />

    <!-- 微信支付 -->
    <activity-alias
        android:name="项目包名.wxapi.WXPayEntryActivity"
        android:exported="true"
        android:targetActivity="com.pingplusplus.android.PaymentActivity" />

    <!-- QQ登录 -->
    <activity
        android:name="com.tencent.tauth.AuthActivity"
        android:noHistory="true"
        android:launchMode="singleTask" />
    <activity
        android:name="com.tencent.connect.common.AssistActivity"
        android:theme="@android:style/Theme.Translucent.NoTitleBar"
        android:configChanges="orientation|keyboardHidden|screenSize" />

    <!-- 文件配置 -->
    <provider
		android:authorities="项目包名.com.squareup.picasso"
		android:exported="false"
		android:name="com.squareup.picasso.PicassoProvider"/>
    </application>
</manifest>
```   

## 防沉迷设置
Android 防沉迷依赖于 XDSDK.OnResume 和 XDSDK.OnStop 接口，所以游戏应确保这两个接口接入正常，在 unity 中接入示例：  

```  
void OnApplicationPause(bool pauseStatus)
    {
        if (pauseStatus)
        {
			xdsdk.XDSDK.OnStop();
        }
        else
        {
			xdsdk.XDSDK.OnResume();
        }
    }  
```  
如果游戏将项目导出为 Android 原生工程，也可以在主 Activity 中的`onResume`和`onStop`中调用原生对应接口 `XDSDK.onResume`和`XDSDK.onStop`。两种接入方式选择一个即可。  

## 生成APK  

在Unity中生成APK，或将工程导出至Android Studio进行打包。

当前版本QQ SDK （open_sdk_r6008_lite.jar）包含assets，当构建工具设置成internal时，这些文件不会被打包进apk中，会导致未安装QQ时不能扫码登录。为避免此类问题，建议将构建构建工具换成gradle或提取jar包含的assets文件，放置于android/assets

![](http://qnblog.ijemy.com/xd_android_releaseapk.png)  

## FAQ

- 游戏打包后无法在AndroidP的机型上使用

1. 将[org.apache.http.legacy.jar](../org.apache.http.legacy.jar)打包到游戏内
2. AndroidManifest的Application标签下添加如下内容

```
<uses-library android:name="org.apache.http.legacy" android:required="false"/>
```

另外需要在 AndroidManifest.xml中 application 标签内添加: android:usesCleartextTraffic="true" ，例如：

```
    <application
     …
      android:usesCleartextTraffic="true"
     …
    >

```
