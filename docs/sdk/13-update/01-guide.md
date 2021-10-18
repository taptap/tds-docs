---
id: guide
title: 开发指南
sidebar_label: 开发指南
---

import MultiLang from '@theme/MultiLang';

TapTap 开发者服务为游戏和玩家提供唤起 TapTap 客户端进行游戏更新的功能。当游戏发布了新版本，且需要玩家进行更新才能体验新版本时，在游戏内绘制一个界面告知玩家，需要进行新版本更新，并且提供一个更新的按钮。玩家点击后，会跳转到 TapTap 客户端内的游戏详情页面，进行更新。

## SDK 获取

在 [下载页](/tap-download) 获得 SDK，添加 `TapCommon` 模块：

<MultiLang>

```cs
"dependencies":{
  ...
  "com.taptap.tds.common":"https://github.com/TapTap/TapCommon-Unity.git#3.3.0",
}
```

```java
repositories{  
    flatDir {  
        dirs 'libs'  
    }  
}  

dependencies {  
    ... 
    implementation (name:'TapCommon_3.3.0', ext:'aar')
}  
```

```objectivec
TapCommonSDK.framework
```

</MultiLang>

## 唤起 TapTap 检查更新

:::tip
自 TapSDK 3.3.0 版本开始，针对更新功能做了逻辑优化，唤起 TapTap 客户端更新游戏失败时可以跳转到自定义网页。TapSDK 3.3.0 版本对之前的版本向下兼容。
该版本一般情况下不需要在使用以下 API 前特别检查是否安装 TapTap 客户端，自 TapSDK 3.3.0 版本开始推荐使用新接口。
:::

<MultiLang>
<>

在 TapTap 客户端更新游戏，失败时通过浏览器打开 TapTap 网站对应的游戏页面：

```cs
// 适用于中国大陆
bool isSuccess = await TapCommon.UpdateGameAndFailToWebInTapTap(string appId);
// 适用于其他国家或地区
bool isSuccess = await TapCommon.UpdateGameAndFailToWebInTapGlobal(string appId);
```

唤起 TapTap 客户端更新游戏失败，跳转到自定义网页：

```cs
// 适用于中国大陆
bool isSuccess = await TapCommon.UpdateGameAndFailToWebInTapTap(string appId, string webUrl);
// 适用于其他国家或地区
bool isSuccess = await TapCommon.UpdateGameAndFailToWebInTapGlobal(string appId, string webUrl);
```

</>
<>

在 TapTap 客户端更新游戏，失败时通过浏览器打开 TapTap 网站对应的游戏页面：

```java
// 适用于中国大陆
TapGameUtil.updateGameAndFailToWebInTapTap(context, "your app id");
// 适用于其他国家或地区
TapGameUtil.updateGameAndFailToWebInTapGlobal(context, "your app id");
```

唤起 TapTap 客户端更新游戏失败，跳转到自定义网页：

```java
// 适用于中国大陆
TapGameUtil.updateGameAndFailToWebInTapTap(context, "your app id", "your website url");
// 适用于其他国家或地区
TapGameUtil.updateGameAndFailToWebInTapGlobal(context, "your app id", "your website url");
```

</>
<>

```objc
// 受限于苹果政策，iOS 平台的 TapTap 客户端不提供游戏更新功能 
```

</>
</MultiLang>

## 检查 TapTap 客户端是否安装

:::note
TapSDK 3.3.0 及之后版本不必参考这一节，推荐使用上面「唤起 TapTap 检查更新」的 API。
:::

<MultiLang>

<>

```cs
// 适用于中国大陆
TapCommon.IsTapTapInstalled(installed =>
{
    if (installed) {
        Debug.Log("TapTap 已经安装");
    }
});

// 适用于其他国家或地区
TapCommon.IsTapTapGlobalInstalled(installed =>
{
    if (installed) {
        Debug.Log("TapTap 已经安装");
    }
});
```

</>
<>

需要导入 `TapCommon.aar` 包，接口在 TapGameUtil 中。

```java
import com.tds.common.utils.TapGameUtil;

// 适用于中国大陆
if(TapGameUtil.isTapTapInstalled(this)){
    Log.d(TAG, "已经安装 TapTap 客户端");
}
// 适用于其他国家或地区
if(TapGameUtil.isTapGlobalInstalled(this)){
    Log.d(TAG, "已经安装 TapTap 客户端");
}
```

</>
<>

需要导入`TapCommon.framework` 库文件，在 info.plist 里配置 `LSApplicationQueriesSchemes` 增加 `tapsdk` 和 `tapiosdk`。

```objc
#import <TapCommonSDK/TapCommonSDK.h>
// 适用于中国大陆
BOOL isInstalled = [TapGameUtil isTapTapInstalled];
// 适用于其他国家或地区
BOOL isInstalled = [TapGameUtil isTapGlobalInstalled];
```

</>

</MultiLang>

## 打开游戏评论区

<MultiLang>

```cs
TapCommon.OpenReviewInTapTap(appId, openSuccess =>
{
    if (openSuccess) {
        Debug.Log("打开游戏评论区成功");
    }
});
```

```java
// 适用于中国大陆
if(TapGameUtil.openReviewInTapTap(this,"appid")){
    Log.d(TAG, "打开评论区成功");
}
// 适用于其他国家或地区
if(TapGameUtil.openReviewInTapGlobal(this,"appid")){
    Log.d(TAG, "打开评论区成功");
}
```

```objc
// 未支持
```

</MultiLang>

TapSDK 3.3.0 版本也兼容以下的接口：

<MultiLang>

```cs
TapCommon.UpdateGameInTapTap("appid", callSuccess =>
{
    if (callSuccess) {
        Debug.Log("TapTap 唤起成功");
    }
});
```

```java
if(TapGameUtil.updateGameInTapTap(this,"appid")){
    Log.d(TAG, "唤起 TapTap 客户端成功");
}
```

```objc
// 受限于苹果政策，iOS 平台的 TapTap 客户端不提供游戏更新功能 
```

</MultiLang>

appid: 游戏在 TapTap 商店的唯一身份标识。
例如：`https://www.taptap.com/app/187168` ，其中 `187168` 是 `appid`.


## 常见问题

### 关于 Android 11 无法拉起 TapTap 客户端的解决方案

Android 11 加强了隐私保护策略，引入了大量变更和限制，其中一个重要变更 —— [软件包可见性](https://developer.android.com/about/versions/11/privacy/package-visibility) ，将会导致第三方应用无法拉起 TapTap 客户端，从而影响 TapTap 相关功能的正常使用 ，包括但不限于更新唤起 TapTap 、购买验证等功能。

特别需要注意的是，Android 11 的该变更只会影响到升级 `targetSdkVersion=30` 的应用，未升级的应用暂不受影响。

**方案一：**

编译时将 `targetSdkVersion` 改为 29（目前 `=30` 会触发该问题）。

**方案二：**

1. 将 gradle build tools 改为 4.1.0+
```java
classpath 'com.android.tools.build:gradle:4.1.0'
```

2. 在 AndroidManifest.xml 里添加如下内容：
```xml
<queries>
  <package android:name="com.taptap" />
  <package android:name="com.taptap.pad" />
  <package android:name="com.taptap.global" />
</queries>
```

### 未接入 TapSDK 的游戏如何引导用户下载最新版本的 TapTap 客户端

未接入 TapSDK 的游戏可以唤起浏览器访问如下 URL 下载最新版本的 TapTap 客户端。

```
https://d.taptap.com/latest?app_id=187168
```

将 `187168` 替换为你的游戏的 `appid`，可以让 TapTap 启动时将指定游戏显示在首页最前位置。