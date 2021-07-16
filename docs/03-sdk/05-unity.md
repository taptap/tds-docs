---
title: Unity-3D SDK 文档
---

## 1.简介

### 1.1.适用范围

TapDB 提供一套 SDK，游戏开发者可以将其集成到游戏中，系统会收集玩家数据，并进行分析，最终形成数据报表，帮助游戏开发者分析玩家行为并优化游戏。

适用于 Unity 开发的游戏，Android 支持 4.0 及以上的系统，iOS 支持 9.0 及以上的系统。

### 1.2.名词解释

| 名词     | 含义                                     |
| -------- | ---------------------------------------- |
| 账号     | 对应一个玩家账户，需要一个唯一的标识符。 |
| 设备     | 安装了对应游戏的设备                     |
| 付费     | 玩家使用真实货币换取游戏虚拟币或游戏道具 |
| 分包渠道 | 标识游戏安装包渠道来源，需要在代码中设置 |

## 2.接入方式

### 2.1.申请应用

在 TapDB 控制台中注册一个游戏，获得游戏对应的 APP ID，这是一个 16 位的字符串，iOS 和 Android 可共用一个 APP ID。

### 2.2.向工程中导入 SDK

在 TapDB 网站上下载最新的 SDK，其中包含一个 TapDB.unitypackage 文件，在 Unity3D 编译器中选择 Assets --> Import Package --> Custom Package 找到 TapDB.unitypackage 文件，点击"打开按钮"即可导入成功。其中 demo.cs 仅是示例代码，不是 SDK 所需的代码。

### 2.3.Android

#### 2.3.1.权限

SDK 为中需要下列权限。

| 权限                                  | 是否必须 | 用途                 |
| ------------------------------------- | -------- | -------------------- |
| android.permission.INTERNET           | 是       | 使用网络的权限       |
| android.permission.ACCESSNETWORKSTATE | 是       | 获取手机网络连接状态 |
| android.permission.ACCESS_WIFI_STATE  | 是       | WIFI                 |

可选权限，强烈建议添加。SDK 获取 IMEI 时会需要此权限；获取不到不影响功能正常使用，IMEI 用于辅助数据分析，使统计结果更加精确

| 权限                                | 是否必须 | 用途             |
| ----------------------------------- | -------- | ---------------- |
| android.permission.READ_PHONE_STATE | 否       | 获取手机状态信息 |

#### 2.3.2.第三方设备 ID 说明

**说明：设备 ID 会使数据统计更加精确，建议添加，TapDB SDK 支持获取 OAID 的设备 ID(需要手动添加 OAID 的 SDK)，获取到的设备 id，会上报到服务器，辅助数据分析，使统计结果更加精准，如果不需要可以跳过该步骤**

#### OAID SDK 获取设备 ID

TapDB SDK 当前支持 OAID SDK 1.0.5~1.0.25 的版本，当应用集成进去之后，会自动使用 OAID 从而获取设备 id，可以自行从 OAID 官网下载，也可以从此处下载[1.0.25](https://res.xdcdn.net/tapdb/Android/oaid/oaid_sdk_1.0.25.aar)的版本【如需其它版本请自行去 OAID 官网下载；然后将 OAID SDK（下载下来是个 aar)， 导入应用的工程目录

**在 AndroidManifest.xml 添加如下权限**

```xml
<!-- 必选权限 -->
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.READ_PHONE_STATE" />
<uses-permission android:name="android.permission.ACCESS_WIFI_STATE" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE"/>
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE"/>
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
<!-- 强烈建议权限 -->
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
```

**注意：
SDK 默认使用 HTTP 传输数据，在 targetSdkVersion >= 28 时需要在 AndroidManifest.xml 增加如下配置**

```xml
<application
...
android:usesCleartextTraffic="true"
...
/>
```

### 2.4.iOS

#### 2.4.1.权限

**若需要收集广告标识符（IDFA），可调用以下接口。请在初始化之前调用**

```csharp
TapDB.enableAdvertiserIDCollection(true);
```

**iOS 14 开始，获取 IDFA 需要配置单独权限声明**，在 info.plist 中配置 NSUserTrackingUsageDescription 及描述文案。如：请允许 xxx 获取并使用您的 IDFA，来为您提供更好的服务。

**TapDB 版本 2.2.3 及以上，请使用 Xcode12.3 或更高**。

| 权限声明                       | 含义                           |
| ------------------------------ | ------------------------------ |
| NSUserTrackingUsageDescription | 用来获取设备广告标识，跟踪设备 |

需要为 iOS 导出的 Xcode 工程引入下列依赖的框架或库

#### 2.4.2.系统依赖

需要为 Xcode 工程引入下列依赖的框架或库

| 名词                              | 含义                           | 备注     |
| --------------------------------- | ------------------------------ | -------- |
| AdSupport.framework               | 用来获取设备广告标识，跟踪设备 |
| AdService.framework               | 广告框架                       | optional |
| AppTrackingTransparency.framework | iOS14 新增 app 追踪框架        | optional |
| SystemConfiguration.framework     |                                |
| CoreMotion.framework              |                                |
| Security.framework                | 用来进行更好的持久化存储       |
| libc++.tdb                        | c++                            |
| libresolv.tbd                     |                                |
| libz.tbd                          |                                |
| libsqlite3.0.tbd                  |                                |

## 3.接口说明

### 3.1.初始化

初始化统计系统 SDK，调用这个接口是使用其它接口的先决条件，需要尽早调用。一般建议在 Unity 里的 Start()里面调用。

```csharp
public static void onStart(string appId, string channel, string gameVersion);
public static void onStartWithProperties(string appId, string channel, string gameVersion,Dictionary<string, object> properties)
```

| 字段        | 可为空 | 说明                                                                                                                         |
| ----------- | ------ | ---------------------------------------------------------------------------------------------------------------------------- |
| appId       | 否     | 注册游戏时获得的 APP ID                                                                                                      |
| channel     | 是     | 分包渠道，1.2.名词解释中有介绍                                                                                               |
| gameVersion | 是     | 游戏版本，为空时，自动获取游戏安装包的版本（Android 是 AndroidManifest.xml 中的 versionName，iOS 是 Xcode 配置中的 Version） |
| properties  | 否     | 自定义属性，随初始化上传                                                                                                     |

### 3.2.登录

记录一个账号，当账号登陆时调用。

```csharp
public static void setUser(string userId)
public static void setUserWithProperties(string userId,Dictionary<string, object> properties)
```

| 字段       | 可为空 | 说明                                                                                                            |
| ---------- | ------ | --------------------------------------------------------------------------------------------------------------- |
| userId     | 否     | 长度大于 0 并小于等于 256。只能包含数字、大小写字母、下划线(\_)、横线(-)，用户 ID。不同账号需要保证 ID 的唯一性 |
| properties | 否     | 自定义属性                                                                                                      |

### 3.3.账号名称

设置账号名称。

```csharp
public static void setName(string name)
```

| 字段 | 可为空 | 说明                              |
| ---- | ------ | --------------------------------- |
| name | 否     | 长度大于 0 并小于等于 256，账号名 |

### 3.4.账号等级

设置账号等级，账号登陆时或升级时调用。

```csharp
public static void setLevel(int level)
```

| 字段  | 可为空 | 说明     |
| ----- | ------ | -------- |
| level | 否     | 账号等级 |

### 3.5.账号区服

设置账号区服，账号登陆时或更换区服时调用。

```csharp
public static void setServer(string server)
```

| 字段   | 可为空 | 说明       |
| ------ | ------ | ---------- |
| server | 否     | 账号服务器 |

### 3.6.充值

<div style={{ fontSize: "18px", fontWeight: "500", position: "relative" }}>
  <p style={{ position: "absolute", top: "-50px", left: "150px" }}>
    (<span style={{ color: "#080" }}>推荐使用服务端充值统计接口</span>)
  </p>
</div>

充值成功时调用

<p>
  提醒：
  <span style={{ color: "#FA6456" }}>
    由于客户端行为，不可避免会有投机者尝试破解充值；
    如果没有通过服务器校验，一定会造成数据不准确，强烈建议使用服务器接口进行充值数据回调。
  </span>
  (<a href="docs/zh_CN/sdk/unity.html#09119adcfbdeceac797a914952974bd9">
    4.2.充值
  </a>)
</p>

```csharp
public static void onChargeSuccess(string orderId, string product, Int32 amount, string currencyType, string payment)
```

| 字段         | 可为空 | 说明                                               |
| ------------ | ------ | -------------------------------------------------- |
| orderId      | 否     | 订单 ID                                            |
| product      | 是     | 产品名称                                           |
| amount       | 否     | 充值金额（单位分，即无论什么币种，都需要乘以 100） |
| currencyType | 是     | 货币类型，参考：人民币 CNY，美元 USD；欧元 EUR     |
| payment      | 是     | 支付方式，如：支付宝                               |

### 3.7.登出

账号登出时，需要调用以下接口清空用户数据。

```csharp
public static void clearUser()

```

### 3.8.自定义事件（如需开通自定义事件，请联系技术支持 QQ：3171097571）

需要发送自定义事件时调用，自定义事件的 eventName 和 properties 属性都必须在元数据管理预先配置，才可以使用 SDK 进行发送

```csharp
public static void trackEvent(string eventName, Dictionary<string, object> properties)
```

用户可以通过调用 trackEvent 方法上传需要跟踪的自定义事件。eventName 为自定义事件的事件名，需要保证以 '#' 开头，取值规则请参考自定义属性登记页面。properties 为自定义事件所包含的自定义属性（以 Key : Value 的形式保存），其中 Key 代表了自定义属性的属性名，Value 代表了该属性的值。这里需要注意的是 Key 的命名规则同 eventName 一致，也需要保证以 '#' 开头。目前所支持的 Value 类型为 String， Number， Boolean。String 类型支持最大长度为 256。Number 类型取值区间为 [-9E15， 9E15]。以战斗事件为例：

```csharp
Dictionary<string, object> properties = new Dictionary<string, object>();
properties.Add("#weapon", "axe");
TapDB.trackEvent("#battle", properties);
```

| 字段       | 可为空 | 说明                                     |
| ---------- | ------ | ---------------------------------------- |
| eventName  | 否     | 事件 code，需要在控制后台预先配置        |
| properties | 是     | 事件属性，具体字段需要在控制后台预先配置 |

### 3.9.事件主体操作（账号、设备）

TapDB 的事件主体分为账号和设备，支持对主体的某个属性做相关操作。

#### 设备属性初始化操作

```csharp
/// 初始化设备属性操作
/// @param properties 属性字典
public static void deviceInitialize(Dictionary<string, object> properties)
```

如果需要初始化设备的某些属性，可以调用 deviceInitialize 来进行设置。如果相应属性之前已近被初始化，那么后续对这些属性的初始化操作将会被忽略。以首次活跃服务器为例：

```csharp
Dictionary<string, object> properties = new Dictionary<string, object>();
properties.Add("firstActiveServer", "server1");
TapDB.deviceInitialize(properties);
// 此时设备表的 "firstActiveServer" 字段值为 "server1"

Dictionary<string, object> properties = new Dictionary<string, object>();
properties.Add("firstActiveServer", "server2");
TapDB.deviceInitialize(properties);
// 此时设备表的 "firstActiveServer" 字段值还是为 "server1"
```

#### 设备属性更新操作

```csharp
/// 更新设备属性操作
/// @param properties 属性字典
public static void deviceUpdate(Dictionary<string, object> properties)
```

如果需要更新设备的某些属性，可以调用 deviceUpdate 来进行设置。通过该接口上传的属性会将原有属性值进行覆盖。以当前积分为例：

```csharp
Dictionary<string, object> properties = new Dictionary<string, object>();
properties.Add("currentPoints", 10);
TapDB.deviceUpdate(properties);
// 此时设备表的 "currentPoints" 字段值为 10

Dictionary<string, object> properties = new Dictionary<string, object>();
properties.Add("currentPoints", 42);
TapDB.deviceUpdate(properties);
// 此时设备表的 "currentPoints" 字段值为 42
```

#### 设备属性累加操作

```csharp
/// 设备属性累加操作
/// @param properties 属性字典 暂时只支持数字属性
public static void deviceAdd(Dictionary<string, object> properties)
```

```csharp
Dictionary<string, object> properties = new Dictionary<string, object>();
properties.Add("totalPoints", 10);
TapDB.deviceInitialize(properties);
// 此时设备表的 "totalPoints" 字段值为 10

Dictionary<string, object> properties = new Dictionary<string, object>();
properties.Add("totalPoints", -2);
TapDB.deviceInitialize(properties);
// 此时设备表的 "totalPoints" 字段值为 8
```

#### 账号属性初始化操作

```csharp
/// 初始化账号属性操作
/// @param properties 属性字典
public static void userInitialize(Dictionary<string, object> properties)
```

#### 账号属性更新操作

使用方法同设备属性更新操作

```csharp
/// 更新账号属性操作
/// @param properties 属性字典
public static void userUpdate(Dictionary<string, object> properties)
```

#### 账号属性累加操作

使用方法同设备属性累加操作

```csharp
/// 账号属性累加操作
/// @param properties 属性字典 暂时只支持数字属性
public static void userAdd(Dictionary<string, object> properties)
```

### 3.10.设置通用事件属性

对于某些重要的属性需要在每个上传的事件中出现，用户可以将这些属性设置为全局通用的自定义属性，静态通用属性为固定值，这些通用属性在注册之后，会被附带在 TapDB 上传的事件中。这里需要注意 trackEvent 中传入的属性优先级 > 静态通用属性优先级，trackEvent 中的属性会覆盖同名的静态通用属性。

#### 添加静态事件属性

```csharp
/// 添加静态事件属性，每个事件都将会发送
/// @param staticProperties 属性字典
public static void registerStaticProperties(Dictionary<string, object> properties)
```

```csharp
Dictionary<string, object> properties = new Dictionary<string, object>();
properties.Add("channel", "TapDB");
TapDB.registerStaticProperties(properties);
// 设置了静态属性 "channel"，值固定为 "TapDB"

Dictionary<string, object> properties = new Dictionary<string, object>();
properties.Add("#customEvent", "axe");
TapDB.trackEvent("#custom1", custom);
// 使用 trackEvent 方法上传自定义事件，此时上传的事件中带有上面设置的公共属性 "channel"， 值为 "TapDB"
```

如果需要添加的通用属性的值在所有事件中相对固定，那么可以调用 registerStaticProperties 方法注册静态通用属性

#### 删除单个静态事件属性

如果要删除某个已添加的静态通用属性，不想让它出现在之后的每个事件中，可以调用 unregisterStaticProperty 方法，将不需要的静态通用属性删除。

```csharp
/// 删除添加的某个静态事件属性
/// @param propertyName 属性 Key
public static void unregisterStaticProperty(string propertyName)
```

#### 删除所有静态事件属性

```csharp
/// 删除添加的静态事件属性
public static void clearStaticProperties()
```

## 4.服务端推送接口

### 4.1.在线人数

由于 SDK 无法推送准确的在线数据，这里提供服务端在线数据推送接口。游戏服务端可以每隔 5 分钟自行统计在线人数，通过接口推送到 TapDB。TapDB 进行数据汇总展现。

```
接口：https://se.tapdb.net/tapdb/online
方法：POST
格式：json
必需头信息：Content-Type: application/json
```

请求内容：

| 参数名  | 参数类型 | 参数说明                    |
| ------- | -------- | --------------------------- |
| appid   | string   | 游戏的 APP ID               |
| onlines | array    | 多条在线数据（最多 100 条） |

其中 onlines 数组的结构为

| 参数名    | 参数类型 | 参数说明                                                      |
| --------- | -------- | ------------------------------------------------------------- |
| server    | string   | 服务器。TapDB 对同一服务器每一个自然 5 分钟仅接受一次数据     |
| online    | int      | 在线人数                                                      |
| timestamp | long     | 当前统计数据的时间戳(秒)。TapDB 会按照自然 5 分钟进行数据对齐 |

示例：

```json
{
  "appid": "gkjasd13bbsa1sdk",
  "onlines": [
    {
      "server": "s1",
      "online": 123,
      "timestamp": 1489739590
    },
    {
      "server": "s2",
      "online": 188,
      "timestamp": 1489739560
    }
  ]
}
```

成功判断：返回的 HTTP Code 为 200 时认为发送成功，否则认为失败

### 4.2.充值

由于 SDK 推送可能会不太准确，这里提供服务端充值推送方法。需要忽略掉 SDK 中的相关充值推送接口。

```
接口：https://e.tapdb.net/event
```

内容（注意后面还需要处理一下）：

```json
{
  "module": "GameAnalysis", // 固定参数
  "ip": "8.8.8.8", // 可选。充值用户的 IP
  "name": "charge", // 固定参数
  "index": "APPID", // 必需。注意 APPID 需要被替换成 TapDB 的 appid
  "identify": "userId", // 必需。用户 ID。必须和 SDK 的 setUser 接口传递的 userId 一样，并且该用户已经通过 SDK 接口进行过推送
  "properties": {
    "order_id": "100000", // 可选。长度大于 0 并小于等于 256。订单 ID。传递订单 ID 可进行排重，防止计算多次
    "amount": 100, // 必需。大于 0 并小于等于 100000000000。充值金额。单位分，即无论什么币种，都需要乘以 100
    "virtual_currency_amount": 100, //获赠虚拟币数量，必传，可为 0
    "currency_type": "CNY", // 可选。货币类型。国际通行三字母表示法，为空时默认 CNY。参考：人民币 CNY，美元 USD；欧元 EUR
    "product": "item1", // 可选。长度大于 0 并小于等于 256。商品名称
    "payment": "alipay" // 可选。长度大于 0 并小于等于 256。充值渠道
  }
}
```

假如游戏的 appid 为 abcd1234。构建出 json 字符串后，去掉空格和换行符，然后再进行一次 urlencode。再把结果作为 POST 数据推送
先替换换行符和空格，变成：

> {"module":"GameAnalysis","name":"charge","index":"abcd1234","identify":"user_id","properties":{"order_id":"100000","amount":100,"virtual_currency_amount":100,"currency_type":"CNY","product":"item1","payment":"alipay"}}

然后 urlencode，变成如下形式。某些版本的 urlencode 可能会把`:` 和`,` 进行编码，不会影响实际使用。

> %7B%22module%22:%22GameAnalysis%22,%22name%22:%22charge%22,%22index%22:%22abcd1234%22,%22identify%22:%22user_id%22,%22properties%22:%7B%22order_id%22:%22100000%22,%22amount%22:100,%22virtual_currency_amount%22:100,%22currency_type%22:%22CNY%22,%22product%22:%22item1%22,%22payment%22:%22alipay%22%7D%7D

成功判断：返回的 HTTP Code 为 200 时认为发送成功，否则认为失败
