---
sidebar_position: 1
---

# 现在开始
## 第一步：注册账号
###注册：
如果您还没有TapDB账号，请先前往
<a target="_blank" href="../../index.html">首页</a>
申请
###验证邮箱：
您必须在验证邮箱后才能使用TapDB。邮件的有效期为7天。
如果收不到邮件，您可以尝试重新发送邮件或者换一个邮箱。

## 第二步：创建企业和项目
###创建企业：
首次进入TapDB，会要求您创建企业，您需要提供企业名称和企业LOGO（非必须）。
###创建项目：
企业创建成功后，您可以在「游戏」界面下创建您的游戏项目。
创建项目需要提供项目名称和项目icon（非必须），如果您的游戏支持多个平台，也只需要创建一个项目即可。
创建完成后会分配一个APPID，使用该ID来进行SDK集成步骤。
<p style={{color: '#FA6456'}}>注意：iOS和Android共用此APPID。</p>

## 第三步：SDK集成
###下载SDK：
目前TapDB支持iOS与Andriod平台的游戏。

<a target="_blank" href="docs/zh_CN/download/SDK.html">下载SDK</a>

###集成SDK：
iOS、Android共用一个APPID。

<a target="_blank" href="docs/zh_CN/sdk/iOS.html">iOS接入指南</a>

<a target="_blank" href="docs/zh_CN/sdk/Android.html">Android接入指南</a>

## 第四步：调试
###调试数据：

游戏安装包集成完TapDB后，需要一台联网设备下载并打开游戏，如果后台接收到了激活数据，那么就可以把项目转为正式游戏，转为正式游戏后，测试数据将被删除，不影响正式数据。

如果后台接收不到数据，您可以：
- 检查测试设备是否联网
- 检查APPID是否输入正确
- 重新打开游戏客户端，查看数据是否接收到
- 如果上述办法都无效，请通过 
<a target="_blank" href="../../dm/m/workOrder">工单</a>
和我们联系
