---
id: pro-in
title: 接入准备
sidebar_label: 接入准备
---
import {Highlight} from '../component';

## 一、开启"TapTap登录"功能
1. 进入已经通过审核的应用，在菜单中找到“TapTap 登录”功能
2. 选择适用地区
3. 点击开启，并获得相应的 client id ，即可开始接入流程
- 目前移动应用上提供原生授权登录，需用户安装 TapTap 客户端配合使用
- 如用户没有安装 TapTap 客户端，则会唤起 webview 进行登录

![](http://qnblog.ijemy.com/xd-taplogin.png)

## 二、配置平台信息
开启功能后，需要配置与应用包体一致的平台信息。一个平台可以设置多条信息以供满足不同场景使用。如开发者后台配置的信息与实际应用使用的信息不一致，则 TapTap 登录功能无法生效。配置步骤如下：

![](http://qnblog.ijemy.com/xd-tapconfig.png)

## 三、集成 SDK 到您的应用
您将需要下载 TapTap SDK，集成到你的应用中，请按照技术对接文档按序调用 API，实现 TapTap 登录功能。

TapTap SDK 支持唤起 TapTap 原生应用授权登录，当用户未安装 TapTap 客户端时，采用内嵌 webview 授权登录的方式。  
SDK集成步骤请参考[快速开始](../sdk/tap-unity)

登录成功界面示例：

![](http://qnblog.ijemy.com/xd-taploginview.png)
