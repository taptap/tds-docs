---
title: 推送通知总览
sidebar_label: 总览
sidebar_position: 0
---

import {Conditional} from '/src/docComponents/conditional';


推送通知，使得开发者可以即时地向其应用程序的用户推送通知或者消息，与用户保持互动，从而有效地提高留存率，提升用户体验。平台提供整合了 Android 推送、iOS 推送的统一推送服务。

除了通过 iOS、Android SDK 做推送服务之外，你还可以通过 REST API 来发送推送请求。

使用推送服务前，需在 **开发者中心 > 你的游戏 > 游戏服务 > 应用配置** 开启推送服务，此开关有三分钟的延迟。

## 基本概念

### Installation

Installation 表示一个允许推送的设备的唯一标示，对应数据管理平台中的 `_Installation` 表。它就是一个普通的 LCObject，主要属性包括:

名称|适用平台|描述
---|---|---
badge|iOS|呈现在应用图标右上角的红色圆形数字提示，例如待更新的应用数、未读信息数目等。
channels| |设备订阅的频道。频道名称只能包含大小写英文字母、数字、下划线（`_`）、连字符（`-`）、等号（`=`）、汉字（中日韩统一表意文字）。
deviceProfile||在应用有多个 iOS 推送证书或多个 Android 混合推送配置的场景下，deviceProfile 用于指定当前设备使用的证书名或配置名。其值需要与 **开发者中心 > 你的游戏 > 游戏服务 > 云服务 > 推送通知 > 设置** 内配置的证书名或配置名对应，否则将无法完成推送。`deviceProfile` 的值必须以字母开头，由大小写字母、数字和下划线组成的字符串，或为空值。deviceProfile 是特殊字段，只支持 `equals` 查询。
deviceToken|iOS|APNS 推送的唯一标识符
apnsTopic|iOS|基于 Token Authentication 的推送需要设置该字段。iOS SDK 会自动读取 iOS 应用的 bundle ID 作为 apnsTopic。但以下情况需要手工指定： 1. 使用低于 v4.2.0 的 iOS SDK 版本; 2. 不使用 iOS SDK （如 React Native）；3. 使用不同于 bundle ID 的 topic。
deviceType| |设备类型，目前支持 `ios`、`android`。
installationId|Android|LeanCloud SDK 为每个 Android 设备产生的唯一标识符
timeZone| |字符串，设备设定的时区

### Notification

对应 **开发者中心 > 你的游戏 > 游戏服务 > 云服务 > 推送通知 > 推送记录** 里的一条记录，表示一条推送消息，它包括下列属性：

名称|适用平台|描述
---|---|---
notificationId| | 推送消息 ID
msg| |本次推送的消息内容，JSON 对象，详见[消息内容参数](/sdk/push/guide/rest#消息内容参数)。
invalidTokens|iOS|本次推送遇到多少次由 APNS 返回的 [INVALID TOKEN](https://developer.apple.com/library/mac/technotes/tn2265/_index.html#//apple_ref/doc/uid/DTS40010376-CH1-TNTAG32) 错误。**如果这个数字过大，请留意证书是否正常。**
prod|iOS|使用什么环境证书。**dev** 表示开发证书，**prod** 表示生产环境证书。
status| |本次推送的状态，**in-queue** 表示仍然在队列，**done** 表示完成，**scheduled** 表示定时推送任务等待触发中。
devices| |本次推送目标设备数。这个数字不是实际送达数，而是处理本次推送请求时在 `_Installation` 表中符合查询条件且有效的总设备数。有效是指 `_Installation` 表的 valid 字段为 true 且 updatedAt 字段时间在最近三个月以内。目标设备数可能会包含大量的非活跃用户(如已卸载 App 的用户)，这部分用户可能无法收到推送。
successes| |本次推送成功设备数。推送成功对普通 Android 设备来说指目标设备收到了推送，对 iOS 设备或使用了混合推送的 Android 设备来说指消息成功推送给了 Apple APNS 或设备对应的混合推送平台。此外还有 `[lc/ios/fcm/hms/mi/oppo/vivo/meizu]Successes` 等分别代表通过各渠道推送成功的设备数。
where| |本次推送查询 `_Installation` 表的条件，符合这些查询条件的设备将接收本条推送消息。
errors| | 本次推送过程中的错误信息。
from-service| | **push**"表示是直接发送的推送消息，**rtm** 表示是 RTM 离线推送消息。
push-time| | 定时推送的发送时间

推送本质上是根据一个 query 条件来查询 `_Installation` 表里符合条件的设备，然后将消息推送给设备。因为 `_Installation` 是一个可以完全自定义属性的 Key-Value Object，因此可以实现各种复杂条件推送，例如频道订阅、地理位置信息推送、特定用户推送等。

对于 **devices** 和 **successes** 这两个属性，当 **devices** 值为 0 时，表示没有找到任何符合目标条件的设备，需要检查一下推送查询条件，这时没有设备能收到推送通知；当 **devices** 值不为 0 时，该值仅仅说明找到了这么多符合条件的设备，但并不保证这些设备都能收到推送通知，所以 **successes** 很可能是会小于 **devices** 的。特别是当查询出来的设备中含有大量的非活跃设备时，**successes** 可能会和 **devices** 有很大差距。

如果某个设备不想收到推送提醒，可以将 `_Installation` 表中相应安装对象的 `valid` 字段修改为 `false`。

注意：我们只保留最近一周的推送记录，并会对过期的推送记录定时进行清理。推送记录清理和推送消息过期时间无关，也就是说即使推送记录被清理，没有过期的推送消息依然是有效的，目标用户依然是能够收到消息。推送过期时间设置请参考[推送 REST API 使用指南](/sdk/push/guide/rest/)的《过期时间和定时推送》一节。

## Unity 推送

请阅读 [Unity 推送指南](/sdk/push/guide/unity/)。

## iOS 推送

请阅读 [iOS 推送指南](/sdk/push/guide/ios/)。

## Android 推送

由于 Android 系统权限控制越来越严，推送服务自有通道的推送到达率受到影响。
因此，建议商用版应用使用我们的「混合推送」方案，该方案对接了<Conditional region="cn">国内主流厂商</Conditional><Conditional region="global"> FCM </Conditional>的接口，让开发者通过统一的 API 完成推送任务。
详见 [Android 混合推送指南](/sdk/push/guide/android-mixpush/)。

如果想要使用推送服务自有通道推送，请阅读[Android 推送指南](/sdk/push/guide/android/)。

## 使用 REST API 推送消息

请阅读[推送 REST API 使用指南](/sdk/push/guide/rest/)。

## 云引擎下通过 JavaScript SDK 创建推送

JavaScript SDK 也提供了创建推送的接口，使用场景主要面向云引擎。请参考 SDK 的 API 文档 [AV.Push](https://leancloud.github.io/javascript-sdk/docs/AV.Push.html)。
这里举两个简单的例子：

推送给所有订阅了 `public` 频道的设备：

```js
AV.Push.send({
  channels: [ 'public' ],
  data: {
    alert: 'public message'
  }
});
```

如果希望按照某个 `_Installation` 表的查询条件来推送，例如推送给某个 `installationId` 的 Android 设备，可以传入一个 `AV.Query` 对象作为 `where` 条件：

```js
const query = new AV.Query('_Installation');
query.equalTo('installationId', installationId);
AV.Push.send({
  where: query,
  data: {
    alert: 'Public message'
  }
});
```
