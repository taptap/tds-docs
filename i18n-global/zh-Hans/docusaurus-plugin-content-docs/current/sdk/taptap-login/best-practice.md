---
title: TapTap 登录最佳实践
sidebar_label: 最佳实践
sidebar_position: 3
---

import useBaseUrl from '@docusaurus/useBaseUrl';

## 登录流程

玩家在登录时，操作的步骤越少，路径越短，则转化率越高。建议使用相对简短的引导，保留必要的步骤，让玩家能快速进入游戏。如图所示：

<img src={useBaseUrl('/img/login-practice.png')} alt="" width="800" />

### 登录界面

为玩家提供 TapTap 登录按钮，按照[登录设计指南](/design/)绘制，并参考[功能介绍](/sdk/taptap-login/features/) 中单个登录与多个登录的展现方式。

### 使用玩家公开信息

玩家在游戏内创建角色时，可以直接使用玩家登录后授权给游戏的公开信息，包括玩家的 TapTap 头像、昵称等，帮助玩家自动完成填写流程。

使用内建账户搭建游戏账户系统，可以参考[设置其他用户属性](/sdk/authentication/guide/#设置其他用户属性)一节设置用户信息。

仅使用单纯的 TapTap 登录，可以参考下面的流程图：

<img src={useBaseUrl('/img/login-follow.png')} alt="" width="800" />

*参考上一篇「开发指南」文档。

### 提供切换账号功能

建议游戏为玩家提供切换账号的功能。

- 玩家切换账号时，务必调用登出接口，以保证登录账号与其他游戏服务（内嵌动态）账号保持一致。
- 当玩家已经完成了登出的操作，为玩家自动显示出登录的界面，让玩家可以使用另一个账号登录。

### 提供账号绑定功能

建议在游戏中添加账号绑定功能，为玩家提供多种登录方式。

使用内建账户搭建游戏账户系统，可以参考[绑定第三方账户](/sdk/authentication/guide/#绑定第三方账户)一节。

如果游戏有自己的账户系统，仅使用单纯 TapTap 登录，则需要游戏自行实现账号绑定功能，方便玩家绑定游戏账号与 TapTap 登录后返回的用户唯一标识。

## Checklist

向玩家提供登录功能前，开发者需要测试登录流程是否正常完成，检查以下事项：

* 游戏是否达到[SDK 环境要求](/sdk/start/quickstart/#环境要求)。
* 开发者是否了解 TapSDK 中两种 TapTap 登录方式，并选择了适合游戏的一种。参考[接入 TapTap 登录](/sdk/taptap-login/guide/start/)。
* 是否在 TapTap 开发者后台填写了 Android 平台或 iOS 平台相关配置。参考[配置签名证书](/sdk/start/quickstart/#配置签名证书)和[格式要求](/sdk/taptap-login/features/#配置签名证书)。
* 测试用户是否具备相关权限。参考[测试用户管理](/sdk/start/test-accounts/)。
* 在未安装 TapTap 客户端的设备上打开游戏，是否能以 WebView 方式完成登录流程，是否能获取玩家授权的基本信息。
* 在安装了最新版 TapTap 客户端的设备上打开游戏，是否能拉起 TapTap 客户端完成登录流程，是否能获取玩家授权的基本信息。
* 登录授权完成后，退出游戏再次进入，是否可以[静默登录](/sdk/taptap-login/features/#实现静默登录)。
* 登录授权未完成就退出游戏，或者点了取消，再次进入游戏，是否能重新开始登录流程。
