---
id: guide
title: 开发指南
sidebar_label: 开发指南
---

TapTap 开发者服务为游戏和玩家提供唤起 TapTap 客户端进行游戏更新的功能。当游戏发布了新版本，且需要玩家进行更新才能体验新版本时，在游戏内绘制一个界面告知玩家，需要进行新版本更新，并且提供一个更新的按钮。玩家点击后，会跳转到 TapTap 客户端内的游戏详情页面，进行更新。

## Unity

### 检查 TapTap 是否安装

在项目的 `Packages/manifest.json` 文件中添加以下依赖：

```json
"dependencies":{
// 公共库,{version}为具体版本号
"com.taptap.tds.common":"https://github.com/TapTap/TapCommon-Unity.git#{version}",
}
```

```cs
TapCommon.IsTapTapInstalled(installed =>
{
    if (installed) {
        Debug.Log("TapTap已经安装");
    }
});

```




### 唤起 TapTap 检查更新

```cs
TapCommon.UpdateGameInTapTap("appid", callSuccess =>
{
    if (callSuccess) {
        Debug.Log("TapTap唤起成功");
    }
});
```
appid: 游戏在 TapTap 商店的唯一身份标识  
例如：https://www.taptap.com/app/187168 ，其中 "187168" 是 appid


### 打开游戏评论区

```cs
TapCommon.OpenReviewInTapTap(appId, openSuccess =>
{
    if (openSuccess) {
        Debug.Log("打开游戏评论区成功");
    }
});

```

## Android

### 检查 TapTap 是否安装

接口在 TapGameUtil 里面，`import com.tds.common.utils.TapGameUtil;`

```java
if(TapGameUtil.isTapTapInstalled(this)){
    Log.d(TAG, "已经安装TapTap客户端");
}
```


### 唤起 TapTap 检查更新

```java
if(TapGameUtil.updateGameInTapTap(this,"appid")){
    Log.d(TAG, "唤起TapTap客户端成功");
}
```
appid: 游戏在 TapTap 商店的唯一身份标识  
例如：https://www.taptap.com/app/187168 ，其中 "187168" 是 appid


### 打开游戏评论区

```java
if(TapGameUtil.openReviewInTapTap(this,"appid")){
    Log.d(TAG, "打开评论区成功");
}

```

## 常见问题

### 关于 Android 11 无法拉起 TapTap 客户端的解决方案

Android 11 加强了隐私保护策略，引入了大量变更和限制，其中一个重要变更 —— [软件包可见性](https://developer.android.com/about/versions/11/privacy/package-visibility) ，将会导致第三方应用无法拉起 TapTap 客户端，从而影响 TapTap 相关功能的正常使用 ，包括但不限于更新唤起 TapTap 、购买验证等功能。
特别需要注意的是，Android 11 的该变更只会影响到升级` targetSdkVersion=30 `的应用，未升级的应用暂不受影响。

**方案一：**

编译时将 `targetSdkVersion` 改为 29（目前=30会触发该问题）

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