---
title: Unity SDK 文档
sidebar_position: 5
---

## 1.SDK 集成

### 1.1.系统要求

适用于 Unity 开发的游戏，支持 .NET 3.x 及以上、Android 5.0 及以上的系统版本、iOS 9.0 及以上的系统版本。

**Unity SDK 中包含的 Android SDK 目前没有使用到 API 19 以上的特性，可以在 AndroidManifest 中添加 `<uses-sdk tools:overrideLibrary="com.tds.tapdb"/>` 覆盖 minSdkVersion，但仍然建议尽快提高 minSdkVersion 到 20 以上。**

### 1.2.导入 SDK

请 [下载最新的 SDK](/sdk/tapdb/download.md)，将 TapDB.unitypackage 导入到 Unity 工程中。

**注意：Unity SDK 中的 Android TapDB SDK 支持获取 OAID （需要手动添加 OAID 的 SDK），使归因更加精准**

当前支持 OAID SDK 1.0.5 ~ 1.0.25 版本，当集成 OAID SDK 后，TapDB SDK 会自动获取 OAID 并进行上报。OAID SDK 可以自行从 OAID 官网下载，也可以从此处下载 [OAID 1.0.25](https://res.xdcdn.net/tapdb/Android/oaid/oaid_sdk_1.0.25.aar)。

### 1.3.各平台配置

**iOS 添加依赖**

需要为导出的 Xcode 工程引入下列依赖的框架或库

| 名词                                | 含义                                                | 备注       |
| --------------------------------- | ------------------------------------------------- | -------- |
| AdSupport.framework               | 用来获取设备广告标识，跟踪设备                                   |          |
| AdService.framework               | 广告框架                                              | optional |
| AppTrackingTransparency.framework | iOS 14 新增 app 追踪框架（若无需在 iOS 14 以上追踪 IDFA 可不添加该依赖） | optional |
| SystemConfiguration.framework     |                                                   |          |
| CoreMotion.framework              |                                                   |          |
| CoreTelephony.framework           |                                                   |          |
| Security.framework                | 用来持久化存储设备 ID                                      |          |
| libc++.tdb                        |                                                   |          |
| libresolv.tbd                     |                                                   |          |
| libz.tbd                          |                                                   |          |
| libsqlite3.0.tbd                  |                                                   |          |

在 `Build Settings` 中的 `link` -> `Other Linker Flags` 中加入： `-ObjC`

**Android 配置 AndroidManifest.xml 权限**

```xml
<!--必选权限-->
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.ACCESS_WIFI_STATE" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE"/>

<!--强烈建议 sdk 获取 IMEI 时会需要此权限；获取不到不影响功能正常使用，IMEI 用于辅助数据分析、广告归因，使统计结果更加精确--> 
<uses-permission android:name="android.permission.READ_PHONE_STATE" />
```

### 1.4.初始化

**注意：Unity TapDB SDK 中的 iOS SDK 默认不会收集广告标识符（IDFA），若需要对 IDFA 进行收集，请在初始化前调用以下接口并在 `info.plist` 中配置 `NSUserTrackingUsageDescription` 及描述文案，如「请允许 xxx 获取并使用你的 IDFA ，来为你提供更好的服务。」**

```
TapDB.enableAdvertiserIDCollection(true);
```

初始化 TapDB SDK 并上报一个设备登录（ `device_login` ）事件，调用这个接口是使用其它接口的先决条件，需要尽早调用。

```
public static void onStart(string appId, string channel, string gameVersion);
public static void onStartWithProperties(string appId, string channel, string gameVersion,Dictionary<string, object> properties)
```

| 字段         | 可为空 | 说明                                                                 |
| ---------- | --- | ------------------------------------------------------------------ |
| appId      | 否   | 创建游戏时获得的 APPID                                                     |
| channel    | 是   | 分包渠道                                                               |
| version    | 是   | 游戏版本，为空时，自动获取游戏安装包的版本                                              |
| properties | 是   | 设备登录（ `device_login` ）的事件属性，可以传入预置属性覆盖 SDK 的默认取值，也可以传入在后台配置过的自定义属性 |

## 2.设置账号

### 2.1.设置账号 ID

当用户进行账号登录时，可调用设置账号 ID （ `setUser` ）接口在记录该账号 ID。调用后会上报一个账号登录（ `user_login` ）事件，并将这个设备的是否有用户注册过 （ `has_user` ） 属性置为 `true`。在重启应用或调用清除账号 ID （ `clearUser` ） 前，上报的事件都会带有该账号 ID。

```
public static void setUser(string userId)
public static void setUserWithProperties(string userId,Dictionary<string, object> properties)
```

| 字段         | 可为空 | 说明                                                                |
| ---------- | --- | ----------------------------------------------------------------- |
| userId     | 否   | 长度大于 0 并小于等于 256。只能包含数字、大小写字母、下划线（_）、横线（-），用户 ID。不同用户需要保证 ID 的唯一性 |
| properties | 是   | 账号登录（ `user_login` ）的事件属性                                         |

### 2.2.清除账号 ID

当用户进行登出时，可调用 clearUser 清除当前 SDK 中保存账号 ID，后续上报的事件将不会带有账号 ID，调用该接口不会上报任何事件。

```
public static void clearUser()
```

### 2.3.设置账号名称

在用户进行账号登录后，可调用该接口设置该账号的名称，调用后将更新账号的账号名称（ `user_name` ）属性。

```
public static void setName(string name)
```

| 字段   | 可为空 | 说明                   |
| ---- | --- | -------------------- |
| name | 否   | 长度大于 0 并小于等于 256，账号名 |

### 2.4.设置账号等级

在用户进行账号登录后，可调用该接口设置该账号的等级，调用将更新账号的账号等级（ `level` ）属性。

```
public static void setLevel(int level)
```

| 字段    | 可为空 | 说明   |
| ----- | --- | ---- |
| level | 否   | 账号等级 |

### 2.5.设置账号区服

在用户进行账号登录后，可调用该接口设置该账号的区服信息，调用将初始化账号的首次区服（ `first_server` ）属性、更新账号的当前区服（ `current_server` ）属性。

```
public static void setServer(string server)
```

| 字段     | 可为空 | 说明    |
| ------ | --- | ----- |
| server | 否   | 账号服务器 |

## 3.上报充值

在用户进行充值后，可调用该接口上报充值信息，调用后将上报 `charge` 事件，并将传入的参数作为事件的属性。

```
public static void onChargeSuccess(string orderId, string product, Int32 amount, string currencyType, string payment)
```

| 字段           | 可为空 | 说明                            |
| ------------ | --- | ----------------------------- |
| orderId      | 否   | 订单 ID                         |
| product      | 是   | 产品名称                          |
| amount       | 否   | 充值金额（单位分，即无论什么币种，都需要乘以 100）   |
| currencyType | 是   | 货币类型，参考：人民币 CNY，美元 USD；欧元 EUR |
| payment      | 是   | 支付方式，如：支付宝                    |
| properties   | 是   | 充值（ `charge` ）的事件属性           |

**注意:在条件允许的情况下推荐使用服务端充值统计接口，请参考 [服务端接入文档](/sdk/tapdb/sdk/server-side-integration)**

## 4.上报事件

### 4.1.上报事件

在 SDK 初始化完成后可使用该接口上报事件

```
public static void trackEvent(string eventName, Dictionary<string, object> properties)
```

| 字段         | 可为空 | 说明    |
| ---------- | --- | ----- |
| eventName  | 否   | 事件的名称 |
| properties | 是   | 事件的属性 |

**注意:**

- 事件名支持上报预置事件和自定义事件，其中自定义事件应以 `#` 开头
- 事件属性的 key 值为属性的名称，支持 string 类型
- 事件属性的 value 值为属性的名称，支持 string（ `256` ）、数值（取值区间为 `[-9E15, 9E15]` ）类型
- 事件属性支持上报预置属性和自定属性，其中自定义属性应以 `#` 开头
- 事件属性传入预置属性时，SDK 默认采集的预置属性将被覆盖

### 4.2.设置通用事件属性

对于一些所有事件都要携带的属性，建议使用通用事件属性实现。

**添加静态通用事件属性**

```
public static void registerStaticProperties(Dictionary<string, object> properties)
```

| 字段         | 可为空 | 说明         |
| ---------- | --- | ---------- |
| properties | 否   | 静态通用事件属性字典 |

示例：

```
//当设置了静态通用事件属性 #current_channel，值固定为 TapDB 后
Dictionary<string, object> properties = new Dictionary<string, object>();
properties.Add("#current_channel", "TapDB");
TapDB.registerStaticProperties(properties);


//使用事件上报时
[TapDB trackEvent:@"#customEventName"
                         withProperties:@{@"#customPropertyName":@"customPropertyValue")}];

//等效于在事件属性中添加了 #current_channel，即
Dictionary<string, object> properties = new Dictionary<string, object>();
properties.Add("#customPropertyName", "customPropertyValue");
TapDB.trackEvent("#customEventName", custom);
```

**删除单个静态通用事件属性**

```
public static void unregisterStaticProperty(string propertyName)
```

| 字段           | 可为空 | 说明      |
| ------------ | --- | ------- |
| propertyName | 否   | 静态通用属性名 |

**清空全部静态通用属性**

```
public static void clearStaticProperties()
```

**注册动态通用事件属性**

Unity SDK 暂不支持

**注意:**

- 在上报事件或通用属性中使用相同属性名会出现属性覆盖的现象，属性覆盖的优先级从高到低依次为：事件属性、动态通用事件属性、静态通用事件属性、预置属性（例如 `trackEvent` 中设置的事件属性将覆盖动态通用事件属性、静态通用事件属性、预置属性中的同名属性）

## 5.修改用户属性

TapDB 支持两种用户模型：设备和账号，你可以通过如下接口对这两种用户的属性进行操作。

**设备属性更新操作**

对于常规的用设备属性，可使用改接口进行赋值操作，新的属性值将会直接覆盖旧的属性值

```
public static void deviceUpdate(Dictionary<string, object> properties)
```

| 字段         | 可为空 | 说明   |
| ---------- | --- | ---- |
| properties | 否   | 属性字典 |

例如:

```
Dictionary<string, object> properties = new Dictionary<string, object>();
properties.Add("currentPoints", 10);
TapDB.deviceUpdate(properties);
// 此时设备表的 "currentPoints" 字段值为 10

Dictionary<string, object> properties = new Dictionary<string, object>();
properties.Add("currentPoints", 42);
TapDB.deviceUpdate(properties);
// 此时设备表的 "currentPoints" 字段值为 42 
```

**设备属性初始化操作**

对于需要保证只有首次设置时有效的属性，可以使用该接口进行赋值操作，仅当前值为空时赋值操作才会生效，如当前值不为空，则赋值操作会被忽略。

```
public static void deviceInitialize(Dictionary<string, object> properties)
```

| 字段         | 可为空 | 说明   |
| ---------- | --- | ---- |
| properties | 否   | 属性字典 |

例如：
记录用户首次登陆的区服，客户端无法得知该属性是否已经被设置过，使用该接口保证仅第一次的设置会生效。

```
Dictionary<string, object> properties = new Dictionary<string, object>();
properties.Add("firstActiveServer", "server1");
TapDB.deviceInitialize(properties);
// 此时设备表的 "#firstActiveServer" 字段值为 "server1"

Dictionary<string, object> properties = new Dictionary<string, object>();
properties.Add("firstActiveServer", "server2");
TapDB.deviceInitialize(properties);
// 此时设备表的 "#firstActiveServer" 字段值还是为 "server1" 
```

**设备属性累加操作**

对于数值类型的属性，可以使用该接口进行累加操作，调用后 TapDB 将对原属性值进行累加后保存结果值

```
public static void deviceAdd(Dictionary<string, object> properties)
```

| 字段         | 可为空 | 说明                 |
| ---------- | --- | ------------------ |
| properties | 否   | 属性字典，value 仅支持数值类型 |

例如：

```
Dictionary<string, object> properties = new Dictionary<string, object>();
properties.Add("totalPoints", 10);
TapDB.deviceInitialize(properties);
// 此时设备表的 "totalPoints" 字段值为 10

Dictionary<string, object> properties = new Dictionary<string, object>();
properties.Add("totalPoints", -2);
TapDB.deviceInitialize(properties);
// 此时设备表的 "totalPoints" 字段值为 8 

```

**账号属性更新操作**

使用方法同设备属性更新操作

```
public static void userUpdate(Dictionary<string, object> properties)
```

**账号属性初始化操作**

```
public static void userInitialize(Dictionary<string, object> properties)
```

**账号属性累加操作**

使用方法同设备属性累加操作

```
public static void userAdd(Dictionary<string, object> properties)
```
