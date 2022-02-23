---
title: Unity 推送指南
sidebar_label: Unity 推送
sidebar_position: 5
---


本文介绍了如何在 Unity 中使用推送通知功能。建议先阅读 [推送通知服务总览](/sdk/push/guide/overview/) 了解相关概念。

由于 Android 系统对于第三方推送管控越来越严格，所以目前只支持 iOS 及 Android 厂商（华为、小米、VIVO、OPPO、魅族）推送。

## 准备工作

### iOS

请参考 [iOS 推送设置指南](/sdk/push/guide/ios-cert/)申请 iOS 推送证书。

### Android

请参考 [Android 混合推送开发指南](/sdk/push/guide/android-mixpush/)申请各厂商 Android 推送权限。

注意：这里只需要参考混合推送指南申请各厂商的推送权限，**不需要** 参考混合推送指南中 Android 相关配置的内容。

## 接入推送服务

### 安装

在 [SDK Releases](https://github.com/leancloud/csharp-sdk/releases) 下载最新版本的 `unity-push.unitypackage` 或 `unity-push-without-gradle.unitypackage`。

如果项目中**没有**使用其他 Android Gradle 配置，可以直接下载 `unity-push.unitypackage`，其中包括了完整的 iOS/Android 配置，开发者只需配置各厂商参数即可。

如果项目中**有**其他 Android Gradle 配置，则需要下载 `unity-push-without-gradle.unitypackage`，这个包中不包含推送相关的 Android Gradle 配置，需要开发者自行补充。

因为涉及到 Android Gradle 配置，目前不提供 UPM 方式安装。

### 配置

#### iOS

只需要在初始化时传入 iOS 开发者的 TeamId，见[初始化](#初始化)。

#### Android

##### 华为

下载华为推送后台申请的 `agconnect-services.json`，放置在项目的 `Assets/LeanCloud/Push/Android/HuaWei/hms/` 下（在打包时会将其拷贝到华为要求的目录下）。

##### VIVO

将 VIVO 推送后台申请的 `app_id` 和 `api_key` 填入 `Assets/Plugins/Android/AndroidMenifest.xml` 中的 `meta-data` 的 `com.vivo.push.app_id` 和 `com.vivo.push.api_key`。

##### 其他平台

小米、OPPO、魅族的配置在初始化时传入。

注意：`AndroidMenifest.xml` 中会用 `${applicationId}` 作为包名配置，如果 `applicationId` 需要划分渠道，则需要手动修改。

### 初始化

这里需要开发者根据平台及设备信息，进行不同厂商 SDK 的初始化。
小米推送有能力在其他厂商下建立推送连接，可以作为缺省厂商使用。

```cs
if (Application.platform == RuntimePlatform.IPhonePlayer) {
    LCIOSPushManager.RegisterIOSPush(IOS_TEAM_ID);
} else if (Application.platform == RuntimePlatform.Android) {
    string deviceModel = SystemInfo.deviceModel.ToLower();
    if (deviceModel.Contains("huawei")) {
        LCHuaWeiPushManager.RegisterHuaWeiPush();
    } else if (deviceModel.Contains("oppo")) {
        LCOPPOPushManager.RegisterOPPOPush(OPPO_APP_KEY, OPPO_APP_SECRET);
    } else if (deviceModel.Contains("vivo")) {
        LCVIVOPushManager.RegisterVIVOPush();
    } else if (deviceModel.Contains("meizu")) {
        LCMeiZuPushManager.RegisterMeiZuPush(MEIZU_APP_ID, MEIZU_APP_KEY);
    } else /*if (deviceModel.Contains("xiaomi"))*/ {
        // 其他的厂商可以尝试注册小米推送
        LCXiaoMiPushManager.RegisterXiaoMiPush(XIAOMI_APP_ID, XIAOMI_APP_KEY);
    }
}
```

## Installation

SDK 提供默认的 Installation 对象，用来保存推送所需的 token 以及其它数据。

```cs
LCInstallation lcInstallation = await LCInstallation.GetCurrent();
```

## 推送消息

**开发者中心 > 你的游戏 > 游戏服务 > 云服务 > 推送通知 > 设置** 中默认选中了 **禁止从客户端进行消息推送**，避免客户端可以不经限制地给应用内任意目标设备推送消息。
我们建议开发者都勾选此项，通过 REST API 或云服务控制台发送推送消息。

如果有从客户端发推送的需求，需要先取消勾选此项。

### 推送给所有设备

```csharp
try {
    LCPush push = new LCPush {
        Data = new Dictionary<string, object> {
            { "alert", pushData }
        }
    };
    await push.Send();
} catch (Exception e) {
    Debug.LogError(e);
}
```

### 发送给特定的用户

下面是一个从客户端推送的例子，给某一台测试环境的 iOS 设备发推送：

```cs
try {
    LCPush push = new LCPush {
        Data = new Dictionary<string, object> {
            { "alert", pushData }
        },
        IOSEnvironment = LCPush.IOSEnvironmentDev,
    };
    LCInstallation installation = await LCInstallation.GetCurrent();
    push.Query.WhereEqualTo("objectId", installation.ObjectId);
    await push.Send();
} catch (Exception e) {
    Debug.LogError(e);
}
```

## 深入阅读：如何响应推送消息

### 消息格式

具体的消息格式，可参考[推送 REST API 使用指南的推送消息](/sdk/push/guide/rest#推送消息)一节。 对于 Android 设备，默认的消息内容参数支持下列属性：

```json
{
  "alert":      "消息内容",
  "title":      "显示在通知栏的标题",
  "custom-key": "由用户添加的自定义属性，custom-key 仅是举例，可随意替换"
}
```

### 通知栏消息如何响应用户点击事件

Unity 环境有别于 iOS/Android 环境，当点击通知时，Unity 场景不一定能初始化完成，所以从 Native 到 Unity 的通知可能无法到达。

SDK 为了能够将**通知参数**顺利的发送到 Unity，会在通知时将参数缓存在 Native 层，提供一个统一获取启动参数的 C# 接口：

```cs
Dictionary<string, object> launchData = await LCPushBridge.Instance.GetLaunchData();
```

## 推送验证

初始化 SDK 后，在 iOS/Android 真机运行项目，`_Installation` 表会生成一条设备信息的数据。

在**开发者中心 > 你的游戏 > 游戏服务 > 云服务 > 推送通知 > 在线发送**可以自定义推送条件发送一条推送，测试当前设备能否正常收到推送。
这里可以根据 Installation 的 objectId 推送，iOS 设备也可以根据 deviceToken 推送，Android 设备可以根据 registrationId 推送。

## 其他

### 如何剔除某些厂商推送服务

应用可能只计划支持部分手机厂商，或针对不同渠道分别打包，这时可以手动剔除不需要的厂商 SDK，以节省打包体积：

- 删掉 `Assets/LeanCloud/Push/Android/xx`，`xx` 代表厂商，如 `HuaWei`、`XiaoMi` 等
- 删除 `Assets/Plugins/Android/mainTemplate.gradle` 中的 `dependences` 部分
- 删掉 `Assets/Plugins/Android/AndroidManifest.xml` 中厂商 SDK 组件部分（有厂商相关的注释）

