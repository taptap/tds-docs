---
sidebar_position: 2
---

# 测试设备白名单

当你需要用旧设备测试分包渠道或广告是否调通时，可以使用测试设备白名单功能来完成这个任务。

 __一、确保你的游戏已经接入了最新的SDK__

白名单功能需要接入最新的TapDB SDK，具体版本号如下：

iOS：v1.9.2

Android：v1.9.2

Cocos2d-x：v1.3.2

Unity 3D：v1.4.2

<a target="_blank" href="docs/zh_CN/download/SDK.html">下载SDK</a>

 __二、添加测试设备__

你可以使用2种方法添加测试设备：扫码添加、手动添加
<br/>

 __方法一：扫码添加__

1.下载TapDB移动客户端

![图片描述](/img/whiteList/04.png)

2.打开App

未登录：在登录界面左上角点击"!"进入添加页面

已登录：点击左上角“设置”-“测试设备”进入添加页面

![图片描述](/img/whiteList/02.png)

3.点击添加设备，扫描Web端“企业设置”-“测试设备”-“+添加设备”中的二维码

![图片描述](/img/whiteList/01.png)

<br/>
 __方法二：手动添加__

 1. 用Web端点击右上角菜单中的“企业设置”-“测试设备”-“+添加设备”
 2. 选择“自定义添加”
 3. 选择系统

![图片描述](/img/whiteList/03.png)

4.iOS填写IDFA
>  __如何获取IDFA__
> 1. 下载TapDB客户端，点击测试设备，获取IDFA

5.Android填写Android ID或Google ID
>  __如何获取Android ID或Google ID？__
>  1. 下载TapDB客户端，点击测试设备，获取Android ID和Google ID
>  2. 获取Android ID：打开手机拨号键，输入\*#\*#8255#\*#\*
>  3. 获取Google Advertising ID : https://support.google.com/googleplay/android-developer/answer/6048248?hl=en

 __注意事项：__


 1. 每个企业支持添加30个设备
 2. 不建议添加模拟器设备，部分品牌的模拟器添加后，会导致所有使用该模拟器的设备都会被加入白名单
 3. 设备加入白名单后，将对该企业下的所有项目生效。
 4. 设备从白名单内移除后，后续数据将传递在首次激活的设备号上。

如果需要帮助，请联系我们的技术支持
QQ：3171097571
邮件：support@tapdb.com
