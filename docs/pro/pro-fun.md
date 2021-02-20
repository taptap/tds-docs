---
id: pro-fun
title: 产品功能
sidebar_label: 产品功能
---
import {Highlight} from '../component';

## 一、登录
TapTap 登录是基于OAuth2.0 协议标准构建的授权登录系统。在进行 TapTap OAuth2.0 授权登录接入之前，需要在 TapTap 开发者中心注册开发者帐号，并拥有一个已审核通过的移动应用。

### 1. 登录业务流程
![](http://qnblog.ijemy.com/xd-loginflow.png)

### 2. 服务端对接
如果是单机游戏，可以只对接客户端登录业务(建议游戏保存数据到自己业务服务器)。如果是联网游戏，需要对接服务端保存用户数据

请参考[服务端文档](../api/service)
### 3. 登录实现
请参考[快速开始](../sdk/tap-unity)，实现第三方登录功能  

### 4. 界面示例
![](http://qnblog.ijemy.com/xd-taploginview.png)
## 二、数据收集

## 三、动态
内嵌动态基于TapTap 内容社区的功能和游戏本身的账号系统的更多融合，成功接入内嵌动态SDK后玩家即可通过游戏直接访问TapTap内容和自带功能。同时内嵌动态SDK也为游戏打造个性化内容或服务提供了开放功能。
### 1. 打开动态查看内容
TapTap提供玩家获取更多游戏内容类型的方式。玩家可以浏览图文，视频甚至今后呈现的直播。方便官方和大神进行内容展示。
![](http://qnblog.ijemy.com/xd-moment01.png)
![](http://qnblog.ijemy.com/xd-moment02.png)

### 2. 发布动态
玩家可以通过厂商设置的一键分享通过游戏直接分享图文至内嵌动态，也可以在内嵌动态中编辑发布视频和图文。通过玩家帮助游戏内容传播。
![](http://qnblog.ijemy.com/xd-moment05.png)

### 3. 动态内互动
玩家可以直接关注其他用户。也可以通过内容进行点赞，评论和转发。玩家之间的互动会触发通知。提供玩家之间更多建立联系和沉淀关系的方式。
![](http://qnblog.ijemy.com/xd-moment03.png)
![](http://qnblog.ijemy.com/xd-moment04.png)

### 4. 小红点通知

玩家关注的用户发布了内容将触发消息通知，消息刷新间隔为1分钟一次，可以在获取到通知消息后UI上实现小红点提示新消息同志。（建议当前通知类型采用小红点样式）

<Highlight color="#f00">动态打开后需要将小红点消失</Highlight>

![](http://qnblog.ijemy.com/xd-moment06.png)
