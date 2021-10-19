---
id: guide
title: 开发指南
sidebar_label: 开发指南
---

import MultiLang from '/src/docComponents/MultiLang';

import {Gray,Blue, Red, Black,Link,ImageLink} from '/src/docComponents/doc';


## 正版验证

<Gray>为了游戏售卖服务的功能，避免 APK 流出导致盗版横行；当游戏准备在 TapTap 开放售卖时，可以接入此功能。</Gray>

在项目的 `Packages/manifest.json` 文件中添加以下依赖：

```json
"dependencies":{
// 公共库
"com.taptap.tds.common":"https://github.com/TapTap/TapCommon-Unity.git#{version}",
// 付费购买
"com.taptap.tds.dlc": "https://github.com/TapTap/TapLicense-Unity.git#{version}",
}
```

### 设置授权回调

<MultiLang>

```cs
// 需要引入 license 库
using TapTap.License;

// 默认情况下 SDK 会弹出不可由玩家手动取消的弹窗来避免未授权玩家进入游戏，如果需要回调来触发流程，请添加如下代码
TapLicense.SetLicencesCallback(ITapLicenseCallback callback);

public interface ITapLicenseCallback
{
    // 授权成功回调
    void OnLicenseSuccess();
}

```

```java
// 默认情况下 SDK 会弹出不可由玩家手动取消的弹窗来避免未授权玩家进入游戏，如果需要回调来触发流程，请添加如下代码
TapLicenseHelper.setLicenseCallback(new TapLicenseCallback() {
    @Override
    public void onLicenseSuccess() {
        // 授权成功回调
    }
});
```
</MultiLang>

### 检查付费授权

<MultiLang>

```cs
TapLicense.Check();
```

```java
TapLicenseHelper.check(Activity activity);
```
</MultiLang>

## 测试

为了保证上线后，游戏对于用户是否购买的判断能够正常生效，**请务必按照以下说明完成自测。**

### 上传 APK

上传需要测试的 APK 至开发者中心，并通过审核。

### 添加测试用户

前往开发者中心   >>   点击<Blue>游戏服务</Blue>   >>   点击<Blue>生态服务</Blue>   >>   点击<Blue>正版验证</Blue>   >>   填写测试用户的 TapTap ID 。

### 开始测试

在 TapTap 客户端使用已填写的测试用户账号登录。

## 正式开始售卖

### 完善应用信息

前往开发者中心，按照[物料要求](/store/store-material/)填写应用信息，并审核通过。

### 设置售卖价格

前往开发者中心 >> <Blue>售卖设置</Blue> ，开启售卖开关，设置游戏售卖金额，提交审核，并同步对接的 TapTap 运营相关信息。

### 正式上线

所有流程都确保顺利后，游戏可[正式上线](/store/store-release/)。
![用来空行的小白条](https://img.tapimg.com/market/images/c53d78b9b120276b53f82aebb0d01537.png)

---

## 常见问题

### 关于 Android 11 无法拉起 TapTap 客户端的解决方案

Android 11 加强了隐私保护策略，引入了大量变更和限制，其中一个重要变更 — [软件包可见性](https://developer.android.com/about/versions/11/privacy/package-visibility) ，将会导致第三方应用无法拉起 TapTap 客户端，从而影响 TapTap 相关功能的正常使用 ，包括但不限于更新唤起 TapTap 、购买验证等功能。
特别需要注意的是，Android 11 的该变更只会影响到升级 ` targetSdkVersion=30 ` 的应用，未升级的应用暂不受影响。

**方案一：**

编译时将 ` targetSdkVersion` 改为 29（目前设置成 30 会触发该问题）

**方案二：**

1. 将 gradle build tools 改为 4.1.0+
```java
classpath 'com.android.tools.build:gradle:4.1.0'
```

2. 在 AndroidManifest.xml 里添加如下内容
```xml
<queries>
  <package android:name="com.taptap" />
  <package android:name="com.taptap.pad" />
  <package android:name="com.taptap.global" />
</queries>
```
