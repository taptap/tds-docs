---
id: rest
title: 推送 REST API
sidebar_label: 推送 REST API
---


当 App 安装到用户设备后，如果要使用推送功能，云服务 SDK 会自动生成一个 Installation 对象。Installation 对象包含了推送所需要的所有信息。你可以使用 REST API，通过 Installation 对象进行推送。

请求的 Base URL 可以在**开发者中心 > 你的游戏 > 游戏服务 > 云服务 > 即时通讯 > 设置**查看。
对于 POST 和 PUT 请求，请求的主体必须是 JSON 格式，而且 HTTP Header 的 Content-Type 需要设置为 `application/json`。
请求的鉴权是通过 HTTP Header 里面包含的键值对来进行的，详见[数据存储 REST API 使用详解](/sdk/storage/guide/rest/)中《请求格式》一节的说明。

### Installation

你可以通过 REST API 在云端增加安装对象。
使用 REST API 还可以达成一些客户端 SDK 无法完成的操作，比如查询所有的 installation 来找到一个 channel 的订阅者的集合。

<table>
  <thead>
    <tr>
      <th>URL</th>
      <th>HTTP</th>
      <th>功能</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>/1.1/installations</td>
      <td>POST</td>
      <td>上传安装数据</td>
    </tr>
    <tr>
      <td>/1.1/installations/&lt;objectId&gt;</td>
      <td>GET</td>
      <td>获取安装数据</td>
    </tr>
    <tr>
      <td>/1.1/installations/&lt;objectId&gt;</td>
      <td>PUT</td>
      <td>更新安装数据</td>
    </tr>
    <tr>
      <td>/1.1/installations</td>
      <td>GET</td>
      <td>查询安装数据</td>
    </tr>
    <tr>
      <td>/1.1/installations/&lt;objectId&gt;</td>
      <td>DELETE</td>
      <td>删除安装数据</td>
    </tr>
  </tbody>
</table>

#### 增加 Installation

创建一个安装对象和普通的对象差不多，只是不同平台有不同的字段。

创建成功后，HTTP 的返回值为 **201 Created**，Location header 包括了新的安装的 URL：

```sh
Status: 201 Created
Location: https://{{host}}/1.1/installations/51ff1808e4b074ac5c34d7fd
```

返回的 body 是一个 JSON 对象，包括了 objectId 和 createdAt 这个创建对象的时间戳。

```json
{
  "createdAt": "2012-04-28T17:41:09.106Z",
  "objectId": "51ff1808e4b074ac5c34d7fd"
}
```

##### DeviceToken

iOS 设备通常使用 DeviceToken 来唯一标识一台设备。

```sh
curl -X POST \
  -H "X-LC-Id: {{appid}}"          \
  -H "X-LC-Key: {{appkey}}"        \
  -H "Content-Type: application/json" \
  -d '{
        "deviceType": "ios",
        "deviceToken": "abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789",
        "channels": [
          "public", "protected", "private"
        ]
      }' \
  https://{{host}}/1.1/installations
```

##### installationId

对于 Android 设备，SDK 会自动生成 uuid 作为 installationId 保存到云端。

```sh
curl -X POST \
  -H "X-LC-Id: {{appid}}"          \
  -H "X-LC-Key: {{appkey}}"        \
  -H "Content-Type: application/json" \
  -d '{
        "deviceType": "android",
        "installationId": "12345678-4312-1234-1234-1234567890ab",
        "channels": [
          "public", "protected", "private"
        ]
      }' \
  https://{{host}}/1.1/installations
```

`installationId` 必须在应用内唯一。

#### 获取 Installation

你可以通过 GET 方法请求创建的时候 Location 表示的 URL 来获取 Installation 对象。比如，获取上面创建的对象：

```sh
curl -X GET \
  -H "X-LC-Id: {{appid}}" \
  -H "X-LC-Key: {{appkey}}" \
  https://{{host}}/1.1/installations/51ff1808e4b074ac5c34d7fd
```

返回的 JSON 对象所有用户提供的字段，加上 createdAt、updatedAt 和 objectId 字段：

```json
{
  "deviceType": "ios",
  "deviceToken": "abcdefghijklmnopqrstuvwzxyrandomuuidforyourdevice012345678988",
  "channels": [
    ""
  ],
  "createdAt": "2012-04-28T17:41:09.106Z",
  "updatedAt": "2012-04-28T17:41:09.106Z",
  "objectId": "51ff1808e4b074ac5c34d7fd"
}
```

#### 更新 Installation

安装对象可以向相应的 URL 发送 PUT 请求来更新。例如，通过设置 `channels` 属性来订阅某个推送频道：

```sh
curl -X PUT \
  -H "X-LC-Id: {{appid}}" \
  -H "X-LC-Key: {{appkey}}" \
  -H "Content-Type: application/json" \
  -d '{
        "deviceType": "ios",
        "deviceToken": "abcdefghijklmnopqrstuvwzxyrandomuuidforyourdevice012345678988",
        "channels": [
          "",
          "foo"
        ]
      }' \
  https://{{host}}/1.1/installations/51ff1808e4b074ac5c34d7fd
```

再比如退订一个频道：

```sh
curl -X PUT \
  -H "X-LC-Id: {{appid}}"          \
  -H "X-LC-Key: {{appkey}}"        \
  -H "Content-Type: application/json" \
  -d '{
        "channels": {
           "__op":"Remove",
           "objects":["customer"]
        }
       }' \
  https://{{host}}/1.1/installations/51ff1808e4b074ac5c34d7fd
```

`channels` 本质上是数组属性，因此可以使用标准的数组操作。

又比如添加自定义属性：

```sh
curl -X PUT \
  -H "X-LC-Id: {{appid}}"          \
  -H "X-LC-Key: {{appkey}}"        \
  -H "Content-Type: application/json" \
  -d '{
        "userObjectId": "<用户的 objectId>"
      }' \
  https://{{host}}/1.1/installations/51ff1808e4b074ac5c34d7fd
```

#### 查询 Installation

你可以一次通过 GET 请求到 installations 的根 URL 来获取多个安装对象。这项功能在 SDK 中不可用。

没有任何 URL 参数的话，一个 GET 请求会列出所有安装：

```sh
curl -X GET \
  -H "X-LC-Id: {{appid}}" \
  -H "X-LC-Key: {{masterkey}},master" \
  https://{{host}}/1.1/installations
```

返回的 JSON 对象的 results 字段包含了所有的结果：

```json
{
  "results": [
    {
      "deviceType": "ios",
      "deviceToken": "abcdefghijklmnopqrstuvwzxyrandomuuidforyourdevice012345678988",
      "channels": [
        ""
      ],
      "createdAt": "2012-04-28T17:41:09.106Z",
      "updatedAt": "2012-04-28T17:41:09.106Z",
      "objectId": "51ff1808e4b074ac5c34d7fd"
    },
    {
      "deviceType": "ios",
      "deviceToken": "876543210fedcba9876543210fedcba9876543210fedcba9876543210fedcba9",
      "channels": [
        ""
      ],
      "createdAt": "2012-04-30T01:52:57.975Z",
      "updatedAt": "2012-04-30T01:52:57.975Z",
      "objectId": "51fcb74ee4b074ac5c34cf85"
    }
  ]
}
```

所有对普通的对象的查询都对 installatin 对象起作用，所以可以查看之前的查询部分以获取详细信息。通过做 channels 的数组查询，你可以查找一个订阅了给定的推送频道的所有设备。

出于安全性考虑，云端默认未开放 installation 查找权限，所以通常这个接口需要使用 master key 鉴权。

#### 删除 Installaion

为了从 LeanCloud 中删除一个安装对象，可以发送 DELETE 请求到相应的 URL。这个功能在客户端 SDK 也不可用。举例：

```sh
curl -X DELETE \
  -H "X-LC-Id: {{appid}}" \
  -H "X-LC-Key: {{masterkey}},master" \
  https://{{host}}/1.1/installations/51fcb74ee4b074ac5c34cf85
```

出于安全性考虑，云端默认未开放 installation 删除权限，所以通常这个接口需要使用 master key 鉴权。

#### Installation 自动过期和清理

每当用户打开应用，我们都会更新该设备的 `_Installation` 表中的 `updatedAt` 时间戳。如果用户长期没有更新 `_Installation` 表的 `updatedAt` 时间戳，也就意味着该用户长期没有打开过应用。当超过 90 天没有打开过应用时，我们会将这个用户在 `_Installation` 表中的记录删除。不过请不要担心，当用户再次打开应用的时候，仍然会自动创建一个新的 Installation 用于推送。

对于 iOS 设备，除了上述过期机制外还多拥有一套过期机制。当我们根据 Apple 推送服务的反馈获取到某设备的 deviceToken 已过期时，我们也会将这个设备在 `_Installation` 表中的信息删除，并标记这个已过期的 deviceToken 为无效，丢弃后续所有发送到该 deviceToken 的消息。

### 

#### API 接口一览

Path|Method|描述
---|---|---
/1.1/push|POST|推送通知
/1.1/notifications|GET|查询推送记录
/1.1/notifications/:notification_id|GET|根据 ID 查推送记录
/1.1/notifications/:notification_id|DELETE|根据 ID 删推送记录
/1.1/scheduledPushMessages|GET|查询应用下所有的定时推送
/1.1/scheduledPushMessages/:id|DELETE|根据 ID 删定时推送

#### master key 校验

当在**开发者中心 > 你的游戏 > 游戏服务 > 云服务 > 推送通知 > 设置**中点选了 **禁止从客户端进行消息推送** 后，
必须通过 **master key** 才能发送推送，从而避免了客户端可以不经限制的给应用内任意目标设备推送消息的可能。
这一限制默认为启用状态。
我们建议用户都将此限制启用。

#### 消息内容参数

##### iOS 设备推送消息内容参数

iOS 设备中 data 和 alert 内属性的具体含义请参考：
1. [Apple 官方关于 Payload Key 的文档](https://developer.apple.com/documentation/usernotifications/setting_up_a_remote_notification_server/generating_a_remote_notification)，
2. [Apple 官方关于 Request Header 的文档](https://developer.apple.com/library/content/documentation/NetworkingInternet/Conceptual/RemoteNotificationsPG/CommunicatingwithAPNs.html)，以及 
3. [Apple 官方关于 UserNotifications 的文档](https://developer.apple.com/documentation/usernotifications)。

下面是对各属性的一些具体说明：

##### iOS 设备 data 各属性说明

名称|格式|约束|描述
---|---|---|---
alert|普通字符串或 JSON 字符串|必填|表示消息内容。如果目标设备中只包含 iOS 设备则还可以是 JSON 类型，下面详述 JSON 类型时支持的属性,
title|字符串|可选|表示推送内容标题，如果 alert 字段为字符串可以在此补充提供 title，如果 alert 是 JSON 类型则无需再提供本字段,
category|字符串|可选|通知类型,
thread-id|字符串|可选|通知分类名称,
badge|数字|可选|未读消息数目，应用图标边上的小红点数字，可以是数字，也可以是字符串 "Increment"（大小写敏感）,
sound|普通字符串或 JSON 字符串|可选|指定推送声音信息，下面详述 JSON 类型时支持的属性,
content-available|数字|可选|如果使用 Newsstand，设置为 1 来开始一次后台下载,
mutable-content|数字|可选|用于支持 UNNotificationServiceExtension 功能，设置为 1 时启用,
collapse-id|字符串|可选|对应 APNs request header 的 apns-collapse-id 参数，用于多条推送合并展示，具体请点击下面 Apple 官方关于 Request Header 的文档链接进行查阅,
apns-priority|数字|可选|只能是 10 或 5，对应 APNs request header 的 apns-priority 参数，用于控制是否以节电模式发推送，具体请点击下面 Apple 官方关于 Request Header 的文档链接进行查阅,
apns-push-type|字符串|可选|用于设置推送展示类型，在 iOS 13 或 watchOS 6 以上设备支持，只能为 "background" 或 "alert"，默认为 "alert",
url-args|字符串|可选|列表类型，用于 Safari 推送，详情见 APNs 文档关于 url-args 参数的描述,
target-content-id|字符串|可选|详情见 APNs 文档关于 target-content-id 参数的描述,
自定义属性|自定义类型|可选|由用户添加的自定义属性，字段名和字段类型任意。

示例：

```json
{
  "alert": "hi"
}
```

##### iOS 设备 alert 各属性说明

并且 iOS 设备支持 `alert` 本地化消息推送，只需要将上面 `alert` 参数从 String 替换为一个由本地化消息推送属性组成的 JSON 即可：

名称|格式|约束|描述
---|---|---| ---
title|字符串|可选|表示推送内容标题,
title-loc-key|字符串列表|可选|详情请参看 Apple 关于推送提醒本地化的说明,
title-loc-args|字符串列表|可选|详情请参看 Apple 关于推送提醒本地化的说明,
subtitle|字符串|可选|表示推送内容副标题,
subtitle-loc-key|字符串|可选|详情请参看 Apple 关于推送提醒本地化的说明,
subtitle-loc-args|字符串列表|可选|详情请参看 Apple 关于推送提醒本地化的说明,
body|字符串|可选|表示消息内容,
action-loc-key|字符串|可选|详情请参看 Apple 关于推送提醒本地化的说明,
loc-key|字符串|可选|详情请参看 Apple 关于推送提醒本地化的说明,
loc-args|字符串列表|可选|详情请参看 Apple 关于推送提醒本地化的说明,
launch-image|字符串|可选|设置点击推送后启动图片文件名,
summary-arg|字符串|可选|用于设置 Summary,
summary-arg-count|数字|可选|用于设置 Summary 参数数量

示例：

```json
{
  "alert": {
    "title": "A message"
    "body": "A body"
  }
}
```

##### iOS 设备 sound 各属性说明

iOS 支持通过 sound 参数设置推送声音，可以是字符串类型的声音文件名，指向一个在应用内存在的声音文件，或是 JSON 类型：

名称|格式|约束|描述
---|---|---|---
name|字符串|可选|声音文件名，指向一个在应用内存在的声音文件
critical|布尔类型|可选|true 表示使用 "Critical" 提示音，默认为 false
volume|数字类型|可选|指定声音大小，必须为 0 到 1 之间的小数

示例：

```json
{
  "alert": "New weixin message.",
  "badge": 9,
  "sound": "biubiubiu.aiff"
}
```

```json
{
  "alert": "消费 13 元",
  "sound": {
    "name": "ding.aiff",
    "volume": "0.8"
  }
}
```

##### iOS 设备其他说明

另外，我们也支持按照上述 Apple 官方文档的方式构造推送参数例如：

```json
{
  "aps": {
    "alert": "New weixin message.",
    "badge": 9,
    "sound": "biubiubiu.aiff"
  }
}
```

更详细的描述如下面例子描述：

```json
{
  "aps": {
    "alert": {
      "title":             "字符串类型，表示推送内容标题",
      "title-loc-key":     "字符串列表，详情请参看 Apple 关于推送提醒本地化的说明",
      "title-loc-args":    "字符串列表类型，详情请参看 Apple 关于推送提醒本地化的说明",
      "subtitle":          "字符串类型，表示推送内容副标题",
      "subtitle-loc-key":  "字符串类型，详情请参看 Apple 关于推送提醒本地化的说明",
      "subtitle-loc-args": "字符串列表类型，详情请参看 Apple 关于推送提醒本地化的说明",
      "body":              "字符串类型，表示消息内容",
      "action-loc-key":    "字符串类型，详情请参看 Apple 关于推送提醒本地化的说明",
      "loc-key":           "字符串类型，详情请参看 Apple 关于推送提醒本地化的说明",
      "loc-args":          "字符串列表类型，详情请参看 Apple 关于推送提醒本地化的说明",
      "launch-image":      "字符串类型，设置点击推送后启动图片文件名",
      "summary-arg":       "字符串类型，用于设置 Summary",
      "summary-arg-count": "数字类型，用于设置 Summary 参数数量"
    },
    "category":            "字符串类型，通知类型",
    "thread-id":           "字符串类型，通知分类名称",
    "badge":               "数字类型，未读消息数目，应用图标边上的小红点数字，可以是数字，也可以是字符串 Increment（大小写敏感）",
    "sound":               "普通字符串或 JSON 字符串类型，指定推送声音信息",
    "content-available":   "数字类型，如果使用 Newsstand，设置为 1 来开始一次后台下载",
    "mutable-content":     "数字类型，用于支持 UNNotificationServiceExtension 功能，设置为 1 时启用"
  },
  "collapse-id":           "字符串类型，对应 APNs request header 的 apns-collapse-id 参数，用于多条推送合并展示，具体请点击下面 Apple 官方关于 Request Header 的文档链接进行查阅",
  "apns-priority":         "数字类型，只能是 10 或 5，对应 APNs request header 的 apns-priority 参数，用于控制是否以节电模式发推送，具体请点击上面 Apple 官方关于 Request Header 的文档链接进行查阅",
  "apns-push-type":        "字符串类型，用于设置推送展示类型，只能为 background，voip，complication，fileprovider，mdm，alert，默认为 alert",
  "custom-key":            "由用户添加的自定义属性，字段名和字段类型任意，custom-key 仅是举例，可随意替换。"
}
```

##### Android 设备通用推送消息内容参数

如果是 Android 设备，默认的消息栏通知消息内容参数支持下列属性：

名称|格式|约束|描述
---|---|---|---
alert|字符串|必填|表示消息内容。
title|字符串|可选|表示显示在通知栏的标题。
silent|布尔|可选|指定透传消息或通知栏消息，默认为 false，即 `通知栏消息`。
action|字符串|可选|注册 Receiver 时提供的 action name，仅当需要自定义 Receiver 时设置。
自定义名称|任意类型|可选|由用户添加的自定义属性，字段名和字段类型任意。

示例：

```json
{
  "alert": "你好小明，家里来客人了，快回家吃饭！",
  "title": "小明，您收一条微信消息"
}
```

```json
{
  "alert": "支付宝到账 13 元！",
  "my-custom-key": "my-custom-value"
}
```

关于 `silent` 参数请参看 [Android 推送区分透传和通知栏消息](#android-推送区分透传和通知栏消息)，关于自定义 Receiver 请参看《Android 消息推送开发指南》的《自定义 Receiver》一节。

##### 为多种类型设备设置不同推送内容

单次推送中，如果查询条件覆盖的目标推送设备包含多种类型，如既包含 iOS 设备，又包含云服务自有渠道的 Android 设备，又有混合推送的小米华为设备等，可以为不同推送设备单独填写推送内容参数，我们会按照设备类型取出对应设备类型的推送内容来发推送，例如：

```json
{
  "alert": "Body default",
  "title": "Title default",
  "mi": {
    "title": "Title for xiaomi"
  },
  "hms": {
    "title": "Title for huawei"
  },
  "vivo": {
    "title": "Title for vivo",
    "alert": "body for vivo",
    "pushMode": 1
  }
}
```

上述示例中，我们向不同类型的设备推送了不同的标题。
另外，每个厂商所支持的参数都不尽相同，我们对最常用的参数做了适配，为不同设备设置不同的推送内容也意味着可以针对不同的设备使用相应厂商特有的推送参数。
比如上面我们在推送给 vivo 设备时设定了 `pushMode` 参数，这个参数是 vivo 特有的参数，用来标记推送模式是正式推送还是测试推送。

其中属性名称和推送平台对应关系如下：

属性名称 | 平台
-------- | ----
ios | Apple APNs
android | 云服务自有 Android 平台
mi | 小米推送
hms | 华为 HMS 推送 （仅国内版适用）
mz | 魅族推送 （仅国内版适用）
vivo | vivo 推送 （仅国内版适用）
oppo | oppo 推送 （仅国内版适用）
fcm | FCM 推送（仅国际版适用）

#### 通过查询条件发推送

本接口用于根据提供的查询条件，给在 _Installation 表内所有符合查询条件的有效设备记录发推送消息。例如下面是给所有在 _Installation 表中 `channels` 字段包含 `public` 值的有效设备推送一条内容为 `Hello from LeanCloud` 的消息。

请注意，本接口限制请求的 HTTP Body 大小必须小于 4096 个字节，即您调用本接口传递的所有参数做 JSON 序列化后得到的结果不能超过此限制。

```sh
curl -X POST \
  -H "X-LC-Id: {{appid}}"          \
  -H "X-LC-Key: {{masterkey}},master"        \
  -H "Content-Type: application/json" \
  -d '{
        "where": {"channels" : ["public"]},
        "data": {"alert" : "Hello from LeanCloud"}
     }' \
  https://{{host}}/1.1/push
```

本接口支持的参数如下：

名称| 约束 | 描述
---|--- | ---
data| **必填**| 推送的内容数据，JSON 对象，请参考 [消息内容](#消息内容参数)。
where| 可选 | 检索 `_Installation` 表使用的查询条件，JSON 对象。如果查询条件内包含日期或二进制等需要做编码的特殊类型数据，查询条件内需要包含编码后的数据。如查询 `createdAt` 字段大于某个时间的设备，where 条件需要为 `{"createdAt":{"$gte":{"__type":"Date","iso":"2015-06-21T18:02:52.249Z"}}}`。更多信息请参看[数据存储 REST API 使用详解](/sdk/storage/guide/rest/)的《数据类型》一节的说明。
channels| 可选 | 推送给哪些频道，将作为条件加入 where 对象。
push_time| 可选 | 设置定时推送的发送时间，需为 UTC 时间且符合 ISO8601 格式要求，例如：`2019-04-01T06:19:29.000Z`。请注意发送时间与当前时间如果小于 1 分钟则推送会立即发出，不会遵循 push_time 参数要求。如果需要实现周期推送，可以参照 [使用云引擎实现周期推送](#使用云引擎实现周期推送) 实现。
expiration_time| 可选 | 消息过期的绝对日期时间，需为 UTC 时间且符合 ISO8601 格式要求，例如："2019-04-01T06:19:29.000Z"。如果客户端收到消息的时间超过消息过期的时间，那么消息将不显示给用户。
expiration_interval| 可选 | 消息过期的相对时间，单位是秒。从 `push_time` 开始算起，未指定 `push_time` 时从调用 API 的时间开始算起。建议推送都设置 `expiration_time` 或 `expiration_interval`，避免用户长时间断网并重新联网后收到一大堆已失效的推送信息。
notification_id | 可选 | 自定义推送 id，最长 16 个字符且只能由英文字母和数字组成，不提供该参数时我们会为每个推送请求随机分配一个唯一的推送 id，用于区分不同推送。我们会根据推送 id 来统计推送的目标设备数和最终消息到达数，并展示在云服务控制台的推送记录中。用户自定义推送 id 可以将多个不同的请求并入同一个推送 id 下从而整体统计出这一批推送请求的目标设备数和最终消息到达数。
req_id | 可选 | 自定义请求 id，最长 16 个字符且只能由英文字母和数字组成。5 分钟内带有相同 req_id 的不同推送请求我们认为是重复请求，只会发一次推送。用户可以在请求中带着唯一的 req_id 从而在接口出现超时等异常时将请求重发一次，以避免漏掉失败的推送请求。并且由于前后两次请求中 req_id 相同，我们会自动过滤重复的推送请求以保证每个目标终端用户最多只会收到一次推送消息。**重发过频或次数过多会影响正常的消息推送**，请注意控制。
prod| 可选 | ***仅对 iOS 推送有效***。当使用 Token Authentication 鉴权方式发 iOS 推送时，该参数用于设置将推送发至 APNs 的开发环境（***dev***）还是生产环境（***prod***）。当使用证书鉴权方式发 iOS 推送时，该参数用于设置使用开发证书（***dev***）还是生产证书（***prod***）。未传入 `prod` 时，如果传入了 `X-LC-Prod` HTTP 头，且其值不为 1，那么视同 `"prod": "dev"`，否则默认 `"prod": "prod"`。在使用证书鉴权方式下，当设备在 Installation 记录中设置了 deviceProfile 时我们优先按照 deviceProfile 指定的证书推送。
topic | 可选 | ***仅对使用 Token Authentication 鉴权方式的 iOS 推送有效***。当使用 Token Authentication 鉴权方式发 iOS 推送时需要提供设备对应的 APNs Topic 做鉴权。一般情况下，iOS SDK 会自动读取 iOS app 的 bundle ID 作为 topic 存入 Installation 记录的 apnsTopic 字段，所以推送请求中无需带有该参数。但以下情况需要手工指定： 1. 使用低于 v4.2.0 的 iOS SDK; 2. 不使用 iOS SDK （如 React Native）；3. 推送目标设备使用的 topic 与 iOS Bundle ID 不同。
apns_team_id | 可选 | ***仅对使用 Token Authentication 鉴权方式的 iOS 推送有效***。当使用 Token Authentication 鉴权方式发 iOS 推送时需要提供设备对应的 Team ID 做鉴权。一般情况下如果您配置的所有 Team ID 下的 APNs Topic 均不重复，或在存储 Installation 时主动设置过 apnsTeamId 值，则无需提供本参数，我们会为每个设备匹配对应的 Team ID 来发推送。否则必须提供本参数且需要通过 where 查询条件保证单次推送请求的目标设备均属于本参数指定的 Team ID，以保证推送正常进行。
flow_control | 可选 | 是否开启平缓发送，默认不开启。其值代表推送的速度，即每秒推送的目标终端用户数。最低值 1000，低于最低值按最低值计算。
_notificationChannel | 可选 | Android 8.0 以上设备在推送时需要传递 channnel id 才能正常接收推送，请参看[Android 推送指南](/sdk/push/guide/android/)的《Android 8.0 推送适配》一节。

`_Installation` 表中的所有属性，无论是内置的还是自定义的，都可以作为查询条件通过 where 来指定，并且支持各种复杂查询。

下面会举一些例子，更多例子请参考[数据存储 REST API 使用详解](/sdk/storage/guide/rest/)的《查询》一节。

##### 推送给所有的设备

```sh
curl -X POST \
  -H "X-LC-Id: {{appid}}"          \
  -H "X-LC-Key: {{masterkey}},master"        \
  -H "Content-Type: application/json" \
  -d '{
        "data": {
          "alert": "问好！"
        }
      }' \
  https://{{host}}/1.1/push
```

##### 推送给 android 设备

```sh
curl -X POST \
-H "X-LC-Id: {{appid}}"          \
-H "X-LC-Key: {{masterkey}},master"        \
-H "Content-Type: application/json" \
-d '{
      "where":{
        "deviceType": "android"
      },
      "data": {
        "alert": "问好！"
      }
    }' \
https://{{host}}/1.1/push
```

##### 推送给 public 频道的设备

```sh
curl -X POST \
  -H "X-LC-Id: {{appid}}"          \
  -H "X-LC-Key: {{masterkey}},master"        \
  -H "Content-Type: application/json" \
  -d '{
        "channels":["public"],
        "data": {
          "alert": "问好！"
        }
      }' \
  https://{{host}}/1.1/push
```

##### 推送给不活跃的设备

```sh
curl -X POST \
-H "X-LC-Id: {{appid}}"          \
-H "X-LC-Key: {{masterkey}},master"        \
-H "Content-Type: application/json" \
-d '{
      "where":{
          "updatedAt":{
              "$lt":{"__type":"Date","iso":"2015-06-29T11:33:53.323Z"}
            }
      },
      "data": {
          "alert": "问好！"
      }
    }' \
https://{{host}}/1.1/push
```

##### 推送给自定义属性符合条件的设备

```sh
curl -X POST \
  -H "X-LC-Id: {{appid}}"          \
  -H "X-LC-Key: {{masterkey}},master"        \
  -H "Content-Type: application/json" \
  -d '{
        "where": {
          "preOrder": true
        },
        "data": {
          "alert": "抢购开始！"
        }
      }' \
  https://{{host}}/1.1/push
```

用 `where` 查询的都是 `_Installations` 表中的属性。这里假设该表存储了 `preOrder` 的布尔属性。

##### 根据地理信息位置做推送

```sh
curl -X POST \
  -H "X-LC-Id: {{appid}}"          \
  -H "X-LC-Key: {{masterkey}},master"        \
  -H "Content-Type: application/json" \
  -d '{
        "where": {
          "owner": {
            "$inQuery": {
              "location": {
                "$nearSphere": {
                  "__type": "GeoPoint",
                  "latitude": 30.0,
                  "longitude": -20.0
                },
                "$maxDistanceInMiles": 10.0
              }
            }
          }
        },
        "data": {
          "alert": "北京明日最高气温 40 摄氏度。"
        }
      }' \
  https://{{host}}/1.1/push
```

上面的例子假设 installation 有个 owner 属性指向 `_User` 表的记录，并且用户有个 `location` 属性是 GeoPoint 类型，我们就可以根据地理信息位置做推送。

#### 通过设备 ID 列表发推送

本接口用于给一批指定的设备 ID 发推送，推送过程因为不用查询目标设备的 Installation 记录，推送速度相对查询方式来说会更快，延迟相对更低。例如下面是给 device token 为 "device_token1", "device_token2", "device_token3" 的 iOS 设备推送一条内容为 `Hello` 的消息。

```sh
curl -X POST \
  -H "X-LC-Id: {{appid}}"          \
  -H "X-LC-Key: {{masterkey}},master"        \
  -H "Content-Type: application/json" \
  -d '{
        "data": {"alert" : "Hello"},
        "device_type": "ios",
        "device_ids": ["device_token1", "device_token2", "device_token3"]
     }' \
  https://{{host}}/1.1/push/devices
```

本接口的参数由推送渠道无关的通用参数和推送渠道相关的渠道参数两部分组成。通用参数因为跟具体推送渠道无关，无论是给 iOS 设备还是混合推送、非混合推送的 Android 设备发推送都可以带上。

支持的通用参数如下：

名称| 约束 | 描述
---|--- | ---
device_type | **必填** | 目标设备类型，目前只能为 android、ios 两种。一次推送只能给一种类型的设备发推送。
device_ids | **必填** | 目标设备 ID 列表，最多包含 500 个 ID 。对于 iOS 设备来说，设备 ID 是 _Installation 表中的 deviceToken 字段；对于使用混合推送的 Android 设备来说，设备 ID 是 _Installation 表中的 registrationId 字段；对于非混合推送的 Android 设备来说，设备 ID 是 _Installation 表中的 installationId 字段。
data| **必填**| 同[通过查询条件发推送](#通过查询条件发推送)。
expiration_interval| 可选 | 同上。
expiration_time| 可选 | 同上。
notification_id | 可选 | 同上。
req_id | 可选 | 同上。

如果目标设备为 iOS 设备，则在上述通用参数之外，还可以附带如下参数：

名称 | 约束 | 描述
---- | ---- | ----
prod| 可选 | 同[通过查询条件发推送](#通过查询条件发推送)。
topic | 可选 | 同上。
apns_team_id | 可选 | 同上。
device_profile | 可选 | 用于指定使用的 iOS 自定义推送证书。如果使用 Token Authentication 鉴权方式，或者使用的推送证书为配置的「生产环境证书」或「开发环境证书」则无需提供本参数。我们会根据您填写的 `prod` 参数值来使用对应的证书。

如果目标为 Android 设备，则在前述通用参数之外，还可以附带如下参数：

名称 | 约束 | 描述
---- | ---- | ----
channel| 可选 | 指定[Android 通知渠道][android-channel]。
vendor | 可选 | ***仅对开启混合推送的设备有效*** 对应混合推送设备在 _Installation 表中的 vendor 字段。一次推送接口调用只能将推送发送给相同 vendor 的设备。
device_profile | 可选 | ***仅对开启混合推送的设备有效*** 当目标混合推送平台下配置了多份配置时需要通过该参数指定配置名。默认值为 _default

[android-channel]: https://developer.android.com/guide/topics/ui/notifiers/notifications.html?hl=zh-cn#ManageChannels

#### Android 混合推送多配置区分

如果使用了混合推送功能，并且在 **开发者中心 > 你的游戏 > 游戏服务 > 云服务 > 推送通知 > 设置 > 混合推送** 增加了多个混合推送配置，那么在向 `_Installation` 表保存设备信息时就需要将当前设备所对应的混合推送配置名存入 `deviceProfile` 字段。系统会按照该字段指定的唯一配置名为每个目标设备进行混合推送。

如果 `deviceProfile` 字段为空，系统会默认使用名为 `_default` 的混合推送配置来进行推送，所以一定要保证在控制台的混合推送设置中，存在以 `_default` 命名的 Profile 并且已被正确配置，否则系统会**拒绝推送。**

`deviceProfile` 的值必须以字母开头，由大小写字母、数字和下划线组成的字符串，或为空值。

#### Android 推送区分透传和通知栏消息

Android 推送（包括 Android 混合推送）支持透传和通知栏两种消息类型。透传消息是指消息到达设备后会先交给 LeanCloud Android SDK，再由 SDK 将消息通过自定义 Receiver 传递给开发者，收到消息后的行为由开发者定义的 Receiver 来决定，SDK 不会自动弹出通知栏提醒。而通知栏消息是指消息到达设备后会立即自动弹出通知栏提醒。

推送服务通过推送请求中 `data` 参数内的 `silent` 字段区分透传和通知栏消息。
`silent` 为 `true` 表示这个消息是透传消息，为 `false` 表示消息是通知栏消息。
如果不传递 `silent` 则默认其值为 `false`。
另外请注意，如果希望接收透传消息请不要忘记自行实现自定义 Receiver，参见[Android 推送指南](/sdk/push/guide/android/)的《自定义 Receiver》一节的说明。

#### 过期时间和定时推送

如上所述，可以用 `expiration_time` 参数指定消息的过期时间：

```sh
curl -X POST \
  -H "X-LC-Id: {{appid}}"          \
  -H "X-LC-Key: {{masterkey}},master"        \
  -H "Content-Type: application/json" \
  -d '{
        "expiration_time": "2015-10-07T00:51:13Z",
        "data": {
          "alert": "您的优惠券将于 10 月 7 日到期。"
        }
      }' \
  https://{{host}}/1.1/push
```

`expiration_interval` 也可以用于指定过期时间，一般结合定时推送使用：

```sh
curl -X POST \
  -H "X-LC-Id: {{appid}}"          \
  -H "X-LC-Key: {{masterkey}},master"        \
  -H "Content-Type: application/json" \
  -d '{
        "push_time": "2016-01-28T00:07:29.773Z",
        "expiration_interval": 86400,
        "data": {
          "alert": "北京时间 1 月 28 日 8:07 发送这条推送，24 小时（86400 秒）后过期"
        }
      }' \
  https://{{host}}/1.1/push
```

##### 定时推送任务查询和取消

调用 `POST /scheduledPushMessages` 接口可以查询当前正在等待推送的定时推送任务，调用这个接口需要使用 **master key**：


```sh
curl -X GET \
  -H "X-LC-Id: {{appid}}"          \
  -H "X-LC-Key: {{masterkey}},master"        \
  -H "Content-Type: application/json" \
  https://{{host}}/1.1/scheduledPushMessages
```

查询出来的结果类似：

```json
{
  "results": [
    {
      "id": 1,
      "expire_time": 1373912050838,
      "push_msg": {
        "through?": null,
        "app-id": "OLnulS0MaC7EEyAJ0uA7uKEF-gzGzoHsz",
        "where": {
          "sort": {
            "createdAt": 1
          },
          "query": {
            "installationId": "just-for-test",
            "valid": true
          }
        },
        "prod": "prod",
        "api-version": "1.1",
        "msg": {
          "message": "test msg"
        },
        "id": "XRs9jmWnLd0GH2EH",
        "notificationId": "mhWjvHvJARB6Q6ni"
      },
      "createdAt": "2016-01-21T00:47:46.000Z"
    }
  ]
}
```

其中 `push_msg` 就是该推送消息的详情，`expire_time` 是消息设定推送时间的 unix 时间戳。

根据查询的结果，就可以取消一个定时推送任务。
注意需要使用返回结果中最外层的 id。
比如取消第一个定时推送，需要使用 `results[0].id`，而不是 `results[0].push_msg.id`。
就上面的例子而言，应该使用 `1` 而不是 `XRs9jmWnLd0GH2EH`：

```sh
curl -X DELETE \
  -H "X-LC-Id: {{appid}}"          \
  -H "X-LC-Key: {{masterkey}},master"        \
  -H "Content-Type: application/json" \
  https://{{host}}/1.1/scheduledPushMessages/1
```

##### 使用云引擎实现周期推送

可以配合 `云引擎` 的 `定时任务` 功能实现周期推送，非常方便。请阅读《在云引擎中使用推送服务》。

### 推送记录查询

`/push` 接口在推送后会返回代表该条推送消息的 `objectId`，你可以使用这个 ID 调用下列 API 查询推送记录：

```sh
curl -X GET \
  -H "X-LC-Id: {{appid}}"          \
  -H "X-LC-Key: {{appkey}}"        \
  -H "Content-Type: application/json" \
  https://{{host}}/1.1/tables/Notifications/:objectId
```

其中 URL 里的 `:objectId` 替换成 `/push` 接口返回的 objectId 。

将返回推送记录对象，推送记录各字段含义参考[推送通知总览](/sdk/push/guide/overview/)的《Notification》一节。

### 推送状态查看和取消

在发推送的过程中，我们会随着推送任务的执行更新推送状态到 **开发者中心 > 你的游戏 > 游戏服务 > 云服务 > 推送通知 > 推送记录** 中，可以在这里查看推送的最新状态。对不同推送状态的说明请参看[推送通知总览](/sdk/push/guide/overview/)的《Notification》一节。

在一条推送记录状态到达 **done** 即完成推送之前，其状态信息旁边会显示 “取消推送” 按钮，点击后就能将本次推送取消。并且取消了的推送会从推送记录中删除。

请注意取消推送的意思是取消还排在队列中未发出的推送，已经发出或已存入离线缓存的推送是无法取消的。同理，推送状态显示已经完成的推送也无法取消。请尽量在发推送前做好测试，确认好发送内容和目标设备查询条件。

## 限制与费用

### 推送消息接口

[推送消息接口](#推送消息)的调用受频率限制，限制如下：

|商用版（每应用）|开发版（每应用）|
|----------|---------------|
|最大 9600 次/分钟，默认 600 次/分钟|60 次/分钟|

超过频率限制后 1 分钟内云端会拒绝请求持续返回 429 错误码，一分钟后会重新处理请求。

商用版应用默认上限可以在 **开发者中心 > 你的游戏 > 游戏服务 > 云服务 > 推送通知 > 设置 > 消息推送 API 调用频率上限** 修改。
按照每日调用频率峰值实行阶梯收费，费用如下：

| 每分钟调用频率 | 费用 |
| - | - |
| 0 ～ 600 | 免费 |
| 601 ~ 1200 | ¥60 元 / 天 |
| 1201 ~ 1800 | ¥90 元 / 天 |
| 1801 ~ 2400 | ¥120 元 / 天 |
| 2401 ~ 3000 | ¥150 元 / 天 |
| 3001 ~ 3600 | ¥180 元 / 天 |
| 3601 ~ 4200 | ¥210 元 / 天 |
| 4201 ~ 4800 | ¥240 元 / 天 |
| 4801 ~ 5400 | ¥270 元 / 天 |
| 5401 ~ 6000 | ¥300 元 / 天 |
| 6001 ~ 6600 | ¥330 元 / 天 |
| 6601 ~ 7200 | ¥360 元 / 天 |
| 7201 ~ 7800 | ¥390 元 / 天 |
| 7801 ~ 8400 | ¥420 元 / 天 |
| 8401 ~ 9000 | ¥450 元 / 天 |
| 9001 ~ 9600 | ¥480 元 / 天 |

国际版

| 每分钟调用频率 | 费用 |
| - | - |
| 0 ～ 600 | 免费 |
| 601 ~ 1200 | $20 USD / 天 |
| 1201 ~ 1800 | $30 USD / 天 |
| 1801 ~ 2400 | $40 USD / 天 |
| 2401 ~ 3000 | $50 USD / 天 |
| 3001 ~ 3600 | $60 USD / 天 |
| 3601 ~ 4200 | $70 USD / 天 |
| 4201 ~ 4800 | $80 USD / 天 |
| 4801 ~ 5400 | $90 USD / 天 |
| 5401 ~ 6000 | $100 USD / 天 |
| 6001 ~ 6600 | $110 USD / 天 |
| 6601 ~ 7200 | $120 USD / 天 |
| 7201 ~ 7800 | $130 USD / 天 |
| 7801 ~ 8400 | $140 USD / 天 |
| 8401 ~ 9000 | $150 USD / 天 |
| 9001 ~ 9600 | $160 USD / 天 |

每日调用频率峰值可在 **开发者中心 > 你的游戏 > 游戏服务 > 云服务 > 推送通知 > 统计 > REST API QPM 峰值** 中查看。

### 每日推送人次

限制如下：

|商用版（每应用每天）|开发版（每应用每天）|
|----------|---------------|
|最大无上限，默认 100 万人次|1 万人次|

达到限制后，当天将无法再推送消息。

商用版应用默认上限可以在 **开发者中心 > 你的游戏 > 游戏服务 > 云服务 > 推送通知 > 设置 > 每日推送上限** 修改。
费用如下（其中不足一万人次的部分，按一万人次计算）：

| 每日推送人次 | 费用 |
| - | - |
| 小于等于 100 万的部分 | 免费 |
| 大于 100 万的部分 | ¥0.5 元 / 万人次 |

国际版

| 每日推送人次 | 费用 |
| - | - |
| 小于等于 10 万的部分 | 免费 |
| 大于 10 万的部分 | $0.02 USD / 万人次 |

每日推送人次可在 **开发者中心 > 你的游戏 > 游戏服务 > 云服务 > 推送通知 > 统计 > 推送人次** 中查看。

### 其它

* 为避免给大量早已不再活跃的用户发消息，我们限制只能给 `_Installation` 表内 `updatedAt` 时间在最近三个月以内的设备推送消息。我们会在根据推送查询条件查出目标设备后自动将不符合条件的设备从目标设备中剔除，并且被剔除的设备不会计入 **开发者中心 > 你的游戏 > 游戏服务 > 云服务 > 推送通知 > 推送记录** 内的目标设备数中。商用版用户如有特别需求，可提交工单联系我们付费延长有效期（最长可延长至一年）。
* 为防止由于大量证书错误所产生的性能问题，我们对使用 **开发证书** 的推送做了设备数量的限制，即一次至多可以向 20,000 个设备进行推送。如果满足推送条件的设备超过了 20,000 个，系统会拒绝此次推送，在 **开发者中心 > 你的游戏 > 游戏服务 > 云服务 > 推送通知 > 推送记录** 中的 **状态** 一栏显示「错误」，提示信息为「dev profile disabled for massive push」。因此，在使用开发证书推送时，请合理设置推送条件。
* Apple 对推送消息大小有限制，对 iOS 推送请尽量缩小要发送的数据大小，否则会被截断。详情请参看 [APNs 文档](https://developer.apple.com/library/content/documentation/NetworkingInternet/Conceptual/RemoteNotificationsPG/PayloadKeyReference.html)。
* 如果使用了 Android 的混合推送，请注意华为推送对消息大小有限制。为保证推送消息能被正常发送，我们要求 data + channels 参数须小于 4096 字节，超过限制会导致推送无法正常发送，请尽量减小发送数据大小。
* 每个开发版应用处在待发队列中的定时推送数量最多 10 条，每个商用版应用处在待发队列中的定时推送数量最多 1000 条。

如果推送失败，在 **开发者中心 > 你的游戏 > 游戏服务 > 云服务 > 推送通知 > 推送记录** 的 **状态** 一栏中会看到错误提示。

