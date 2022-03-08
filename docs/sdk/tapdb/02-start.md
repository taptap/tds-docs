---
title: 快速接入
hide_title: false
---

本文档旨在帮助你自助式快速接入 TapDB，请仔细阅读以下接入指南：

## 第一步：获取 AppID

你必须使用 AppID 才能完成 SDK 集成。AppID 可以按以下方式申请

1. 登录 TapDB：通过 TapDB 账号登录 TapDB。

2. 创建企业：进入 TapDB 后首先创建企业，完善企业名称和企业 Logo。

3. 创建项目：在「游戏」界面下创建游戏项目，创建完成后系统会为项目分配 AppID。

注意：建议同一个应用的 iOS 和 Android 版共用一个 AppID。一家企业创建项目的上限是 20 个。


## 第二步：集成 SDK

### 下载 SDK：

目前 TapDB 支持 iOS 与 Andriod 平台的游戏。

[下载 SDK](download "_blank")

### 集成 SDK：

为了能更好的理解和使用 TapDB，建议你阅读 [埋点设计指南](/features/customEvent/dataModel "_blank") 后集成 SDK。

[iOS 接入指南](/sdk/iOS "_blank")

[Android 接入指南](/sdk/Android "_blank")

[Unity 接入指南](/sdk/unity "_blank")

[服务端接入指南](/docs/sdk/server-side-integration "_blank")

## 第三步：校验数据

App 集成 SDK 后，使用一台联网设备下载 App，在「配置」-「埋点管理」测试埋点上报情况。数据校验通过后项目才可正式上线。点击 [埋点管理](/features/customEvent/trackingManagement "_blank") 查看详细校验指导。

在操作过程中，如遇到任何问题，请先查阅说明文档和 FAQ 文档，若文档无法解决问题，请联系我们的技术支持 QQ：3171097571。

