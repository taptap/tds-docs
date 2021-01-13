---
id: tap-fun-alive
title: 唤起 TapTap 相关功能使用说明
sidebar_label: 唤起 TapTap
---

# **唤起 TapTap 相关功能使用说明**

![小白条](https://img.tapimg.com/market/images/c53d78b9b120276b53f82aebb0d01537.png)
当游戏版本过低时，引导用户唤起 TapTap 更新。唤起 TapTap 相关功能介绍

① 唤起TapTap更新游戏

② 唤起TapTap游戏评论页

![小白条](https://img.tapimg.com/market/images/c53d78b9b120276b53f82aebb0d01537.png)

## **一、 准备工作**

![小白条](https://img.tapimg.com/market/images/c53d78b9b120276b53f82aebb0d01537.png)

### **1.唤起TapTap更新游戏**
使用此服务的游戏，建议添加本地游戏版本检测功能，当游戏有版本更新时，使用本服务唤起 TapTap 更新游戏。

如果游戏没有版本检测功能，请手动添加“检查更新”的按钮或者链接，用户主动点击后，可使用本服务唤起 TapTap 更新游戏。

### **2.唤起TapTap游戏评论页**
使用此服务的游戏，请依照下述流程进行配置。并且在游戏内设定触发条件，用户触发后即可跳转至游戏在TapTap内的评论页面。

![小白条](https://img.tapimg.com/market/images/c53d78b9b120276b53f82aebb0d01537.png)

##  **二、 开始接入**

![小白条](https://img.tapimg.com/market/images/c53d78b9b120276b53f82aebb0d01537.png)

### **1. 判断是否安装 TapTap**

#### **· Java**

```
boolean TapTapInstalled = false;
try {
  packageInfo = context.getPackageManager().getPackageInfo("com.taptap", 0);
  if (null != packageInfo) {
    TapTapInstalled = true;
  }
} catch (NameNotFoundException e) {
  e.printStackTrace();
}
return TapTapInstalled;
```

#### **· Unity**

```
bool TapTapInstalled = false;
AndroidJavaClass unityPlayer = new AndroidJavaClass("com.unity3d.player.UnityPlayer");

AndroidJavaObject anActivity = unityPlayer.GetStatic<AndroidJavaObject>("currentActivity");
AndroidJavaObject packageManager = anActivity.Call<AndroidJavaObject>("getPackageManager");
try
{
    AndroidJavaObject taptapInfo = packageManager.Call<AndroidJavaObject>("getPackageInfo","com.taptap",0);
    if (taptapInfo != null)
    {
        TapTapInstalled = true;
    }
}
catch (System.Exception)
{
    TapTapInstalled = false;
}
return TapTapInstalled;
```

![小白条](https://img.tapimg.com/market/images/c53d78b9b120276b53f82aebb0d01537.png)

### **2. 唤起 TapTap更新游戏**

```
uri scheme（外部调用）
taptap://taptap.com/app?app_id=app_id&source=outer|update

示例：

taptap://taptap.com/app?app_id=58881&source=outer|update
```

![小白条](https://img.tapimg.com/market/images/c53d78b9b120276b53f82aebb0d01537.png)

### **3. 唤起 TapTap游戏评论页**
```
url scheme（外部调用）
taptap://taptap.com/app?tab_name=review&app_id=app_id

示例：

taptap://taptap.com/app?tab_name=review&app_id=58881
```
## 三、常见问题

### **1.关于Android 11 无法拉起TapTap 客户端的解决方案** ###

Android 11 加强了隐私保护策略，引入了大量变更和限制，其中一个重要变更 —— [软件包可见性](https://developer.android.com/about/versions/11/privacy/package-visibility) ，将会导致第三方应用无法拉起 TapTap 客户端，从而影响TapTap 相关功能的正常使用 ，包括但不限于更新唤起 TapTap 、购买验证等功能。
特别需要注意的是，Android 11 的该变更只会影响到升级` targetSdkVersion=30 `的应用，未升级的应用暂不受影响。

**方案一：**

编译时将` targetSdkVersion` 改为29（目前=30会触发该问题）

**方案二：**

1. 将gradle build tools 改为4.1.0+
```java
classpath 'com.android.tools.build:gradle:4.1.0'
```

2. 在AndroidManifest.xml 里添加如下内容
```xml
<queries>
    <package android:name="com.taptap" />
    <package android:name="com.taptap.pad" />
    <package android:name="com.taptap.global" />
  </queries>
```
