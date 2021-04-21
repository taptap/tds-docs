---
id: pro-in
title: 接入准备
sidebar_label: 接入准备
---
import {Highlight} from '../component';

## <Highlight color='#f00'>注意事项</Highlight>

- 第一步开启登录时，请注意国内国外选择，选定后不可变更 
- 测试用户管理功能是针对游戏在“未上线时”进行添加白名单测试，游戏上架前一定要点“上线应用”  
![](/img/tap_login_online.png)
- 登录按钮需要符合TapTap规范，请下载 [TapTap 登录按钮](/res/TapTapLoginButton.zip)  
- 集成应用所使用的的client id与上架app时的商店页要强关联，即不能将测试服的参数打包上架正式服  

## 一、开启 "TapTap 登录" 功能

1. 在开发者中心进入已经通过审核的应用，在菜单中找到「TapTap 登录」功能。
2. 选择适用地区。
3. 点击开启，获得相应的 Client ID ，即可开始接入流程。

![](/img/tap_taplogin_cn.png)

## 二、配置平台信息
开启功能后，需要配置与应用包体一致的平台信息。一个平台可以设置多条信息以供不同场景使用。如开发者后台配置的信息与实际应用使用的信息不一致，则 TapTap 登录功能无法生效(注意: 签名 MD5 的格式, 由数字和字母组成, 没有冒号, 字母不区分大小写)。配置步骤如下：

![](/img/tap_tapconfig_cn.png)

## 三、集成 SDK 到你的应用

下载 TapTap SDK 集成到应用中，再按照技术对接文档调用 API，即可实现 TapTap 登录功能。

TapTap SDK 支持唤起 TapTap 原生应用授权登录。用户未安装 TapTap 客户端时，采用内嵌 Webview 授权登录的方式。  
SDK 集成步骤请参考 [快速开始](/sdk/tap-unity)。

<!-- ## 四、开始测试
如需要测试SDK功能，可以[点击下载](/res/TapSDK测试用例.xlsx)测试用例 -->


