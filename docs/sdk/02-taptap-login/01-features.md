---
id: features
title: 功能介绍
sidebar_label: 功能介绍
---

import useBaseUrl from '@docusaurus/useBaseUrl';

为了访问 TapTap Deverlop Server （以下简称 TDS）的相关服务功能，你的用户需要拥有一个 TapTap 账号。如果用户未使用 TapTap 账号，你的应用在调用 TDS 服务 API 时可能会遇到错误。本文档介绍了如何在你的应用中实现 TapTap 登录体验。

## 业务介绍

TapTap 账号服务，基于标准的 OAuth 2.0 协议构建的授权登录系统，为开发者提供了简单、安全、快速的账号登录授权功能，为用户免去输入账号密码的繁琐步骤，一键通过 TapTap 账号授权，即刻使用你的应用。  

在取得用户授权之后，开发者可以通过接口调用的方式获得 TapTap 用户的相关公开信息，包括用户昵称、头像、性别等信息，可用于提高应用内的用户体验设计。  



## 前期工作

请确认已经在 TapTap 开发者中 - 应用配置完成了开启操作。可参照入门指南-准备工作。

配置签名证书

为了更高的安全性，TapTap 登录服务需要校验你的游戏。你需要提交游戏的 package name（Android 包名）、Bundle id（iOS 包名）以及 Android 签名。

:::tip

1、Android 的包名请使用符合 Android 规范的命名方式。参考文档：[Android 开发者-设置应用 ID](https://developer.android.com/studio/build/application-id)

2、Android 的签名为 Keystore 文件中的 MD5 字符串（32 位），填入时请去除特殊符号

3、iOS 的 Bundle ID 请使用符合苹果规范的命名方式。参考文档：[Property List Key - CFBundle 标识符](https://developer.apple.com/documentation/bundleresources/information_property_list/cfbundleidentifier)

:::

## 实现交互式登录 

检查当前如果没有用户登录状态时，需要为用户提供一个可视化点击交互的登录界面。TapTap 审核团队会在应用上架 TapTap 商店时审核你的登录界面，请务必参照《登录按钮设计规范》进行绘制。

## 单个登录方式

当应用中仅提供 TapTap 一种登录方式时，建议在开始游戏的主界面，绘制一个可交互的登录按钮。按钮的范围大小、按钮上的文案使用，均不能误导、不能阻碍用户的正常顺畅点击。

登录按钮的设计样式，在[《登录按钮设计规范》](/design)允许的范围内，可适当添加与游戏气质相符的风格元素。此外，TDS 也为你准备了不同场景下 TapTap 登录按钮的设计图标，帮助你快速实现登录流程，点击 [《TapTap 登录按钮设计图标  》](/tap-download)下载资源。


<img src={useBaseUrl('/img/login-feature01.png')} alt="" width="800" />


## 多种登录方式

如果游戏还有其他登录方式同时存在时，为用户提供合理布局的登录界面，尽可能的从外观明显区分每种登录方式的不同，让用户可以快速找到目标。

<img src={useBaseUrl('/img/login-feature02.png')} alt="" width="800" />
      

## 实现静默登录

静默登录可以帮助用户节省登录的流程，通常用于用户下一次启动游戏时，仍有登录状态的场景。  

当用户启动游戏时，你可以尝试获取当前用户的 Access Token  来检查用户是否已经当前设备上登录过。则可以尝试在不显示登录按钮或界面的情况下帮用户完成登录过程。



## 登录授权

移动应用的 TapTap 账号服务，需要与 TapTap 移动端客配合使用。TapSDK 会根据用户设备中，TapTap 客户端的安装情况，来自动选择使用合适的登录流程。  

[点击此处](https://www.taptap.com/mobile)下载 TapTap 移动客户端

## 唤起 TapTap 客户端授权登录

当用户单击 TapTap 登录按钮时，TapSDK 检测到用户设备中已经安装了 TapTap 客户端，会自动唤起设备中的 TapTap 客户端，并识别客户端中的登录信息，进行授权登录。

<img src={useBaseUrl('/img/login-taptapclient.png')} alt="" width="800" />


## 打开 webview 授权登录

当用户单击 TapTap 登录按钮时，TapSDK 检测到用户设备中未安装 TapTap 客户端，则会打开 webview 进行登录流程。  

<img src={useBaseUrl('/img/login-webview.png')} alt="" width="800" />