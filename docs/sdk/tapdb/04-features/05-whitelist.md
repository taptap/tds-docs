---
id: whiteList
title: 测试设备
hide_title: false
hide_table_of_contents: false
---

「测试设备」是应用SDK接入测试、渠道后台联调测试等场景下的白名单功能，可以帮助你更加便捷的进行激活联调测试，避免手动清除激活或者寻找新设备的不便。


## 1. 接入最新的 SDK

白名单功能需要接入最新的 TapDB SDK，具体版本号如下：

iOS：<Data field="sdk.0.version"/><br/>
Android：<Data field="sdk.1.version"/><br/>
Unity 3D：<Data field="sdk.2.version"/><br/>

[下载 SDK](../download "_blank")

## 2. 添加测试设备

你可以使用 2 种方法添加测试设备：扫码添加、手动添加


### 方法一：扫码添加

1. 下载 TapDB 移动客户端

![图片描述](/img/app-dl-qr.png)

2. 打开 App，使用扫码功能

**安卓端处理方式**：<br/>
登录客户端后点击右上角图标进入设置页，再点击「设备信息」进入设备信息页，点击「加入白名单」打开扫码功能，可按照下图步骤进行设置。
![安卓端处理方式](/img/customEvent/whitelist/Android-whitelist.png)

**iOS 端处理方式**：<br/>
登录客户端后点击右上角图标进入设置页，再点击「设备信息」进入设备信息页，点击「加入白名单」打开扫码功能，可按照下图步骤进行设置（iOS 系统 14.5 及以上的设备需允许广告跟踪）。
![iOS 端处理方式](/img/customEvent/whitelist/iOS-whitelist.png)

3. 扫描 Web 端「工具」-「测试设备」-「+添加设备」中的二维码

![添加二维码](/img/customEvent/whitelist/web-whitelist.png)

### 方法二：自定义添加

1.  打开 Web 端「工具」-「测试设备」-「+添加设备」；
2.  选择「自定义添加」
3.  选择系统

![自定义添加](/img/customEvent/whitelist/zidingyi-whitelist.png)

4. iOS 填写 IDFA

   > **如何获取 IDFA**
   >
   > 1. 下载 TapDB 客户端，点击设备信息，获取 IDFA（详细步骤见 iOS 端处理方式）

5. Android 填写 Google ID 或 OAID（至少填写一个 ID）
   > **如何获取 Google ID 或 OAID？**
   >
   > 1. 下载 TapDB 客户端，点击设备信息，获取OAID（详细步骤见安卓端处理方式）
   > 2. 获取 Google ID : <https://support.google.com/googleplay/android-developer/answer/6048248?hl=en>


**注意事项：**

1.  不建议添加模拟器设备，部分品牌的模拟器添加后，会导致所有使用该模拟器的设备都会被加入白名单。
2.  设备加入白名单后，仅对当前项目生效。
3.  设备从白名单内移除后，后续数据将传递在首次激活的设备号上。
4.  安卓端扫码添加设备时，暂时只支持扫描二维码后录入Android ID 和 Google ID。

如果需要帮助，请联系我们的技术支持
QQ：<Data field="tapdb.support.QQ"/>
邮件：support@tapdb.com
