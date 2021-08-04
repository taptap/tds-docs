---
title: Android SDK 文档
---

## Android SDK 文档

### 1.SDK 集成

#### 1.1.系统要求

适用于 Android 5.0 及以上的系统版本。

**Android SDK 目前没有使用到 API 19 以上的特性，可以在 AndroidManifest 中添加 `<uses-sdk tools:overrideLibrary="com.tds.tapdb"/>` 覆盖 minSdkVersion，但仍然建议尽快提高 minSdkVersion 到 20 以上。**

#### 1.2.导入 SDK

请 [下载最新的 SDK]()，将 TapDB.aar 导入到 Android Studio 工程中。


**注意：TapDB SDK 支持获取 OAID (需要手动添加 OAID 的 SDK)，使归因更加精准**

当前支持 OAID SDK 1.0.5~1.0.25 版本，当集成 OAID SDK 后，TapDB SDK 会自动获取 OAID 并进行上报。OAID SDK 可以自行从OAID官网下载，也可以从此处下载 [OAID 1.0.25](https://res.xdcdn.net/tapdb/Android/oaid/oaid_sdk_1.0.25.aar)。



#### 1.3.工程配置

添加权限

```xml
<!--必选权限-->
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.ACCESS_WIFI_STATE" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE"/>

<!--强烈建议 sdk 获取 IMEI 时会需要此权限；获取不到不影响功能正常使用，IMEI 用于辅助数据分析、广告归因，使统计结果更加精确--> 
<uses-permission android:name="android.permission.READ_PHONE_STATE" />
```



#### 1.4.初始化


初始化 TapDB SDK 并上报一个设备登录（ `device_login` ）事件，调用这个接口是使用其它接口的先决条件，需要尽早调用，建议在游戏的主 Activity 中调用。

```
public static void init(Context context, String appId, String channel, String appVersion)

public static void init(Context context, String appId, String channel, String appVersion, JSONObject properties)
```

字段 | 可为空 | 说明
--- | --- | ---
context | 否 | 当前 Application 或 Activity 的 Context 对象
appId | 否 | 创建游戏时获得的APP ID
channel | 是 | 分包渠道
appVersion | 是 | 游戏版本，为空时，自动获取游戏安装包的版本（ Xcode 配置中的 Version ）
properties | 是 | 设备登录（ `device_login` ）的事件属性，可以传入预置属性覆盖 SDK 的默认取值，也可以传入在后台配置过的自定义属性


### 2.设置账号

#### 2.1.设置账号 ID

当用户进行账号登录时，可调用设置账号 ID （ `setUser` ）接口在记录该账号 ID。调用后会上报一个账号登录（ `user_login` ）事件，并将这个设备的是否有用户注册过 （ `has_user` ） 属性置为 `true`。在重启应用或调用清除账号 ID （ `clearUser` ） 前，上报的事件都会带有该账号 ID。

```
public static void setUser(String userId)

public static void setUser(String userId, JSONObject properties)
```

字段 | 可为空 | 说明
--- | --- | ---
userId | 否 | 长度大于 0 并小于等于 256。只能包含数字、大小写字母、下划线(_)、横线(-)，用户ID。不同账号需要保证ID的唯一性
properties | 是 | 账号登录（ `user_login` ）的事件属性



#### 2.2.清除账号 ID

当用户进行登出时，可调用 clearUser 清除当前 SDK 中保存账号 ID，后续上报的事件将不会带有账号 ID，调用该接口不会上报任何事件。

```
public static void clearUser()
```


#### 2.3.设置账号名称

在用户进行账号登录后，可调用该接口设置该账号的名称，调用后将更新账号的账号名称（ `user_name` ）属性。

```
public static void setName(String name)
```

字段 | 可为空 | 说明
--- | --- | ---
name | 否 | 长度大于0并小于等于256，账号名


#### 2.4.设置账号等级

在用户进行账号登录后，可调用该接口设置该账号的等级，调用将更新账号的账号等级（ `level` ）属性。

```
public static void setLevel(int level)
```

字段 | 可为空 | 说明
--- | --- | ---
level | 否 | 账号等级


#### 2.5.设置账号区服

在用户进行账号登录后，可调用该接口设置该账号的区服信息，调用将初始化账号的首次区服（ `first_server` ）属性、更新账号的当前区服（ `current_server` ）属性。

```
public static void setServer(String server)
```

字段 | 可为空 | 说明
--- | --- | ---
server | 否 | 账号服务器


### 3.上报充值

在用户进行充值后，可调用该接口上报充值信息，调用后将上报 `charge` 事件，并将传入的参数作为事件的属性。

```
public static void onCharge(String orderId, String product, long amount, String currencyType, String payment)

public static void onCharge(String orderId, String product, long amount, String currencyType, String payment, JSONObject properties)
```

字段 | 可为空 | 说明
--- | --- | ---
orderId | 否 | 订单ID
product | 是 | 产品名称
amount | 否 | 充值金额（单位分，即无论什么币种，都需要乘以100）
currencyType | 是 | 货币类型，参考：人民币 CNY，美元 USD；欧元 EUR
payment | 是 | 支付方式，如：支付宝
properties | 是 | 充值（ `charge` ）的事件属性

**注意:在条件允许的情况下推荐使用服务端充值统计接口，请参考文档 [服务端接入]()**


### 4.上报事件

#### 4.1.上报事件

在 SDK 初始化完成后可使用该接口上报事件

```
public static void trackEvent(String eventName, JSONObject properties)
```

字段 | 可为空 | 说明
--- | --- | ---
eventName | 否 | 事件的名称
properties | 是 | 事件的属性


**注意:**

* 事件名支持上报预置事件和自定义事件，其中自定义事件应以 `#` 开头
* 事件属性的 key 值为属性的名称，支持 String 类型
* 事件属性的 value 值为属性的名称，支持 String `256` ）、Long（取值区间为 `[-9E15, 9E15]` ）类型
* 事件属性支持上报预置属性和自定属性，其中自定义属性应以 `#` 开头
* 事件属性传入预置属性时，SDK 默认采集的预置属性将被覆盖


#### 4.2.设置通用事件属性

对于一些所有事件都要携带的属性，建议使用通用事件属性实现。

**添加静态通用事件属性**

```
public static void registerStaticProperties(final JSONObject staticProperties)
```

字段 | 可为空 | 说明
--- | --- | ---
staticProperties | 否 | 静态通用事件属性字典

示例：

```
//当设置了静态通用事件属性 #current_channel，值固定为 TapDB 后
JSONObject commonProperties = new JSONObject();
commonProperties.put("#current_channel", "TapDB");
TapDB.registerStaticProperties(properties);


//使用事件上报时
JSONObject properties = new JSONObject();
properties.put("#customPropertyName", "customPropertyValue");
TapDB.trackEvent("#customEvent", properties);

//等效于在事件属性中添加了 #current_channel，即
JSONObject properties = new JSONObject();
properties.put("#current_channel", "TapDB");
properties.put("#customPropertyName", "customPropertyValue");
TapDB.trackEvent("#customEvent", properties);
```

**删除单个静态通用事件属性**

```
public static void unregisterStaticProperty(String propertyName)
```

字段 | 可为空 | 说明
--- | --- | ---
propertyName | 否 | 静态通用属性名

**清空全部静态通用属性**

```
public static void clearStaticProperties()
```

**注册动态通用事件属性**

对于可能随时发生变化的通用事件属性，可以注册动态通用事件属性，`getDynamicProperties` 将在每次调用时触发，将计算好的属性添加到本次上报事件属性中。

```
public static void registerDynamicProperties(TapDBDataDynamicProperties dynamicProperties)
```

字段 | 可为空 | 说明
--- | --- | ---
dynamicProperties | 否 | 动态通用事件属性计算回调

示例:

```
//后续上报的事件都将携带 #currentLevel 属性，值为变量 level 在事件上报时刻的值

TapDB.registerDynamicProperties(
    () -> {
      JSONObject properties = new JSONObject();
      // getCurrentLevel 在这里仅作为案例，表示用户任何的自有逻辑实现
      long level = getCurrentLevel();
      properties.put("#currentLevel", level);
      return properties; 
    }
);
```

**注意:**

* 在上报事件或通用属性中使用相同属性名会出现属性覆盖的现象，属性覆盖的优先级从高到低依次为：事件属性、动态通用事件属性、静态通用事件属性、预置属性（例如 `trackEvent` 中设置的事件属性将覆盖动态通用事件属性、静态通用事件属性、预置属性中的同名属性）


### 5.修改用户属性

TapDB 支持两种用户模型：设备和账号，你可以通过如下接口对这两种用户的属性进行操作。

**设备属性更新操作**

对于常规的用设备属性，可使用改接口进行赋值操作，新的属性值将会直接覆盖旧的属性值

```
public static void deviceUpdate(final JSONObject properties)
```

字段 | 可为空 | 说明
--- | --- | ---
properties | 否 | 属性字典


例如:

```
JSONObject properties = new JSONObject();
properties.put("currentPoints", 10);
TapDB.deviceUpdate(properties);
// 此时设备表的 "currentPoints" 字段值为 10

JSONObject nextProperties = new JSONObject();
nextProperties.put("currentPoints", 42);
TapDB.deviceUpdate(nextProperties);
// 此时设备表的 "currentPoints" 字段值为 42 
```

**设备属性初始化操作**

对于需要保证只有首次设置时有效的属性，可以使用该接口进行赋值操作，仅当前值为空时赋值操作才会生效，如当前值不为空，则赋值操作会被忽略。

```
public static void deviceInitialize(final JSONObject properties)
```

字段 | 可为空 | 说明
--- | --- | ---
properties | 否 | 属性字典


例如：
记录用户首次登陆的区服，客户端无法得知该属性是否已经被设置过，使用该接口保证仅第一次的设置会生效。

```
JSONObject properties = new JSONObject();
properties.put("firstActiveServer", "server1");
TapDB.deviceInitialize(properties);
// 此时设备表的 "firstActiveServer" 字段值为 "server1"

JSONObject nextProperties = new JSONObject();
nextProperties.put("firstActiveServer", "server2");
TapDB.deviceInitialize(nextProperties);
// 此时设备表的 "firstActiveServer" 字段值还是为 "server1" 
```

**设备属性累加操作**

对于数值类型的属性，可以使用该接口进行累加操作，调用后 TapDB 将对原属性值进行累加后保存结果值
```
public static void deviceAdd(final JSONObject properties)
```

字段 | 可为空 | 说明
--- | --- | ---
properties | 否 | 属性字典，value 仅支持 NSNumber 类型


例如：

```
JSONObject properties = new JSONObject();
properties.put("totalPoints", 10);
deviceAdd(properties);
// 此时设备表的 "totalPoints" 字段值为 10

JSONObject nextProperties = new JSONObject();
nextProperties.put("totalPoints", -2);
deviceAdd(nextProperties);
// 此时设备表的 "totalPoints" 字段值为 8 
```

**账号属性更新操作**

使用方法同设备属性更新操作
```
public static void userUpdate(final JSONObject properties)
```

**账号属性初始化操作**

```
public static void userInitialize(final JSONObject properties)
```

**账号属性累加操作**

使用方法同设备属性累加操作
```
public static void userAdd(final JSONObject properties)
```

## Unity SDK 文档

### 1.SDK 集成

#### 1.1.系统要求

适用于 Unity 开发的游戏，支持 .NET 3.x 及以上、Android 5.0 及以上的系统版本、iOS 9.0 及以上的系统版本。

**Unity SDK 中包含的 Android SDK 目前没有使用到 API 19 以上的特性，可以在 AndroidManifest 中添加 `<uses-sdk tools:overrideLibrary="com.tds.tapdb"/>` 覆盖 minSdkVersion，但仍然建议尽快提高 minSdkVersion 到 20 以上。**


#### 1.2.导入 SDK

请 [下载最新的 SDK]()，将 TapDB.unitypackage 导入到 Unity 工程中。


**注意：Unity SDK 中的 Android TapDB SDK 支持获取 OAID (需要手动添加 OAID 的 SDK)，使归因更加精准**

当前支持 OAID SDK 1.0.5 ~ 1.0.25 版本，当集成 OAID SDK 后，TapDB SDK 会自动获取 OAID 并进行上报。OAID SDK 可以自行从OAID官网下载，也可以从此处下载 [OAID 1.0.25](https://res.xdcdn.net/tapdb/Android/oaid/oaid_sdk_1.0.25.aar)。



#### 1.3.各平台配置

**iOS 添加依赖**

需要为导出的 Xcode 工程引入下列依赖的框架或库

名词 | 含义 | 备注
--- | --- | ---
AdSupport.framework | 用来获取设备广告标识，跟踪设备
AdService.framework | 广告框架 | optional
AppTrackingTransparency.framework | iOS 14 新增 app 追踪框架（若无需在 iOS 14 以上追踪 IDFA 可不添加该依赖） | optional
SystemConfiguration.framework | 
CoreMotion.framework | 
Security.framework | 用来持久化存储设备 ID
libc++.tdb |
libresolv.tbd | 
libz.tbd |  
libsqlite3.0.tbd |  

**Android 配置 AndroidManifest.xml 权限**

```xml
<!--必选权限-->
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.ACCESS_WIFI_STATE" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE"/>

<!--强烈建议 sdk 获取 IMEI 时会需要此权限；获取不到不影响功能正常使用，IMEI 用于辅助数据分析、广告归因，使统计结果更加精确--> 
<uses-permission android:name="android.permission.READ_PHONE_STATE" />
```


#### 1.4.初始化

**注意：Unity TapDB SDK 中的 iOS SDK 默认不会收集广告标识符（IDFA），若需要对 IDFA 进行收集，请在初始化前调用以下接口并在 `info.plist` 中配置 `NSUserTrackingUsageDescription` 及描述文案，如「请允许 xxx 获取并使用你的 IDFA ，来为你提供更好的服务。」**

```
TapDB.enableAdvertiserIDCollection(true);
```

初始化 TapDB SDK 并上报一个设备登录（ `device_login` ）事件，调用这个接口是使用其它接口的先决条件，需要尽早调用。

```
public static void onStart(string appId, string channel, string gameVersion);
public static void onStartWithProperties(string appId, string channel, string gameVersion,Dictionary<string, object> properties)
```

字段 | 可为空 | 说明
--- | --- | ---
appId | 否 | 创建游戏时获得的APP ID
channel | 是 | 分包渠道
version | 是 | 游戏版本，为空时，自动获取游戏安装包的版本
properties | 是 | 设备登录（ `device_login` ）的事件属性，可以传入预置属性覆盖 SDK 的默认取值，也可以传入在后台配置过的自定义属性


### 2.设置账号

#### 2.1.设置账号 ID

当用户进行账号登录时，可调用设置账号 ID （ `setUser` ）接口在记录该账号 ID。调用后会上报一个账号登录（ `user_login` ）事件，并将这个设备的是否有用户注册过 （ `has_user` ） 属性置为 `true`。在重启应用或调用清除账号 ID （ `clearUser` ） 前，上报的事件都会带有该账号 ID。

```
public static void setUser(string userId)
public static void setUserWithProperties(string userId,Dictionary<string, object> properties)
```

字段 | 可为空 | 说明
--- | --- | ---
userId | 否 | 长度大于 0 并小于等于 256。只能包含数字、大小写字母、下划线(_)、横线(-)，用户ID。不同用户需要保证ID的唯一性
properties | 是 | 账号登录（ `user_login` ）的事件属性



#### 2.2.清除账号 ID

当用户进行登出时，可调用 clearUser 清除当前 SDK 中保存账号 ID，后续上报的事件将不会带有账号 ID，调用该接口不会上报任何事件。

```
public static void clearUser()
```


#### 2.3.设置账号名称

在用户进行账号登录后，可调用该接口设置该账号的名称，调用后将更新账号的账号名称（ `user_name` ）属性。

```
public static void setName(string name)
```

字段 | 可为空 | 说明
--- | --- | ---
name | 否 | 长度大于0并小于等于256，账号名


#### 2.4.设置账号等级

在用户进行账号登录后，可调用该接口设置该账号的等级，调用将更新账号的账号等级（ `level` ）属性。

```
public static void setLevel(int level)
```

字段 | 可为空 | 说明
--- | --- | ---
level | 否 | 账号等级


#### 2.5.设置账号区服

在用户进行账号登录后，可调用该接口设置该账号的区服信息，调用将初始化账号的首次区服（ `first_server` ）属性、更新账号的当前区服（ `current_server` ）属性。

```
public static void setServer(string server)
```

字段 | 可为空 | 说明
--- | --- | ---
server | 否 | 账号服务器


### 3.上报充值

在用户进行充值后，可调用该接口上报充值信息，调用后将上报 `charge` 事件，并将传入的参数作为事件的属性。

```
public static void onChargeSuccess(string orderId, string product, Int32 amount, string currencyType, string payment)
```

字段 | 可为空 | 说明
--- | --- | ---
orderId | 否 | 订单ID
product | 是 | 产品名称
amount | 否 | 充值金额（单位分，即无论什么币种，都需要乘以100）
currencyType | 是 | 货币类型，参考：人民币 CNY，美元 USD；欧元 EUR
payment | 是 | 支付方式，如：支付宝
properties | 是 | 充值（ `charge` ）的事件属性

**注意:在条件允许的情况下推荐使用服务端充值统计接口，请参考文档 [服务端接入]()**


### 4.上报事件

#### 4.1.上报事件

在 SDK 初始化完成后可使用该接口上报事件

```
public static void trackEvent(string eventName, Dictionary<string, object> properties)
```

字段 | 可为空 | 说明
--- | --- | ---
eventName | 否 | 事件的名称
properties | 是 | 事件的属性


**注意:**

* 事件名支持上报预置事件和自定义事件，其中自定义事件应以 `#` 开头
* 事件属性的 key 值为属性的名称，支持 string 类型
* 事件属性的 value 值为属性的名称，支持 string（ `256` ）、数值（取值区间为 `[-9E15, 9E15]` ）类型
* 事件属性支持上报预置属性和自定属性，其中自定义属性应以 `#` 开头
* 事件属性传入预置属性时，SDK 默认采集的预置属性将被覆盖


#### 4.2.设置通用事件属性

对于一些所有事件都要携带的属性，建议使用通用事件属性实现。

**添加静态通用事件属性**

```
public static void registerStaticProperties(Dictionary<string, object> properties)
```

字段 | 可为空 | 说明
--- | --- | ---
properties | 否 | 静态通用事件属性字典

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

字段 | 可为空 | 说明
--- | --- | ---
propertyName | 否 | 静态通用属性名

**清空全部静态通用属性**

```
public static void clearStaticProperties()
```

**注册动态通用事件属性**

Unity SDK 暂不支持

**注意:**

* 在上报事件或通用属性中使用相同属性名会出现属性覆盖的现象，属性覆盖的优先级从高到低依次为：事件属性、动态通用事件属性、静态通用事件属性、预置属性（例如 `trackEvent` 中设置的事件属性将覆盖动态通用事件属性、静态通用事件属性、预置属性中的同名属性）


### 5.修改用户属性

TapDB 支持两种用户模型：设备和账号，你可以通过如下接口对这两种用户的属性进行操作。

**设备属性更新操作**

对于常规的用设备属性，可使用改接口进行赋值操作，新的属性值将会直接覆盖旧的属性值

```
public static void deviceUpdate(Dictionary<string, object> properties)
```

字段 | 可为空 | 说明
--- | --- | ---
properties | 否 | 属性字典


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

字段 | 可为空 | 说明
--- | --- | ---
properties | 否 | 属性字典


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

字段 | 可为空 | 说明
--- | --- | ---
properties | 否 | 属性字典，value 仅支持数值类型


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
public static void userInitialize(Dictionary<string, object> properties)
```

**账号属性初始化操作**

```
public static void userUpdate(Dictionary<string, object> properties)
```

**账号属性累加操作**

使用方法同设备属性累加操作
```
public static void userAdd(Dictionary<string, object> properties)
```




# 服务端接入

你可以直接使用 REST API 进行接入，可以在不依赖 SDK 的情况下直接将数据上报到 TapDB。

## 1.上报事件和属性

数据传输的格式和含义请参考 [数据规则]()

## 1.1.上报地址

请将数据上报到如下 URL

`https://e.tapdb.net/event`

## 1.2.上报内容

首先请按照数据规则构造 json 字符串，例如

```
{
    "index": "test_appid",
    "device_id": "test_device_id",
    "user_id": "test_user_id",
    "type": "track",
    "name": "#EventName",
    "properties": {
        "os": "Android",             
        "device_id1": "000",             
        "device_id2": "000",             
        "device_id3": "000",          
        "device_id4": "000",     
        "width": 256,                    
        "height": 768,                   
        "device_model": "pixel",         
        "os_version": "Android 10.0",
        "provider": "O2",                
        "network": "1",                  
        "channel": "Google Play",        
        "app_version": "1.0",
        "sdk_version": "2.8.0",
        "#custem_event_property_name": "CustomEventPropertyValue"
    }
}
```

对以上数据去掉空格、换行和回车符进行 urlencode

```
%7B%22index%22%3A%22test_appid%22%2C%22device_id%22%3A%22test_device_id%22%2C%22user_id%22%3A%22test_user_id%22%2C%22type%22%3A%22track%22%2C%22name%22%3A%22%23EventName%22%2C%22properties%22%3A%7B%22os%22%3A%22Android%22%2C%22device_id1%22%3A%22000%22%2C%22device_id2%22%3A%22000%22%2C%22device_id3%22%3A%22000%22%2C%22device_id4%22%3A%22000%22%2C%22width%22%3A256%2C%22height%22%3A768%2C%22device_model%22%3A%22pixel%22%2C%22os_version%22%3A%22Android10.0%22%2C%22provider%22%3A%22O2%22%2C%22network%22%3A%221%22%2C%22channel%22%3A%22GooglePlay%22%2C%22app_version%22%3A%221.0%22%2C%22sdk_version%22%3A%222.8.0%22%2C%22%23custem_event_property_name%22%3A%22CustomEventPropertyValue%22%7D%7D
```

将编码后的数据使用 POST 提交到上报地址。

## 1.2.返回

如果返回 Response Code 为 200，且返回内容为 `1` ，则代表数据上报成功，请在埋点管理中进一步查看事件的写入情况。

## 1.3.常见问题

* 若当前事件的主体并非设备或账号，device_id 和 user_id 可以传入任意一个固定值
* 为了保证服务端上报的事件也能使用设备维度进行分析，建议在客户端调用 SDK 的 `GetDeviceID` 接口取得 SDK 为该设备生产的唯一 ID 并上报到 App 的服务端




## 2.特殊类型信息上报

### 2.1.上报在线人数

由于SDK无法推送准确的在线数据，这里提供服务端在线数据推送接口。游戏服务端可以每隔5分钟自行统计在线人数，通过接口推送到TapDB。TapDB进行数据汇总展现。

```
接口：https://se.tapdb.net/tapdb/online
方法：POST
格式：json
必需头信息：Content-Type: application/json
```

请求内容：

参数名 | 参数类型 | 参数说明
------ | ------ | ------
appid | string | 游戏的APP ID
onlines | array | 多条在线数据（最多100条）

其中onlines数组的结构为

参数名 | 参数类型 | 参数说明
------ | ------ | ------
server | string | 服务器。TapDB对同一服务器每一个自然5分钟仅接受一次数据
online | number | 在线人数
timestamp | number | 当前统计数据的时间戳(秒)。TapDB会按照自然5分钟进行数据对齐

示例：

```
{
"appid":"gkjasd13bbsa1sdk",
"onlines":[{
  "server":"s1",
  "online":123,
  "timestamp":1489739590
},{
  "server":"s2",
  "online":188,
  "timestamp":1489739560
}]
}
```

成功判断：返回的HTTP Code为200时认为发送成功，否则认为失败

### 2.2.上报充值记录

由于SDK推送可能会不太准确，这里提供服务端充值推送方法。需要忽略掉SDK中的相关充值推送接口。

```
接口：https://e.tapdb.net/event
```
内容（注意后面还需要处理一下）：
```
{
  "module": "GameAnalysis", // 固定参数
  "ip": "8.8.8.8", // 可选。充值用户的IP
  "name": "charge", // 固定参数
  "index": "APPID", // 必需。注意APPID需要被替换成TapDB的appid
  "identify": "userId", // 必需。用户ID。必须和SDK的setUser接口传递的userId一样，并且该用户已经通过SDK接口进行过推送
  "properties": {
      "order_id": "100000", // 可选。长度大于0并小于等于256。订单ID。传递订单ID可进行排重，防止计算多次
      "amount": 100, // 必需。大于0并小于等于100000000000。充值金额。单位分，即无论什么币种，都需要乘以100
      "virtual_currency_amount": 100, //获赠虚拟币数量，必传，可为0
      "currency_type": "CNY", // 可选。货币类型。国际通行三字母表示法，为空时默认CNY。参考：人民币 CNY，美元 USD；欧元 EUR
      "product": "item1", // 可选。长度大于0并小于等于256。商品名称
      "payment": "alipay" // 可选。长度大于0并小于等于256。充值渠道
  }
}
```

假如游戏的appid为abcd1234。构建出json字符串后，去掉空格和换行符，然后再进行一次urlencode。再把结果作为POST数据推送
先替换换行符和空格，变成：   

`{"module":"GameAnalysis","name":"charge","index":"abcd1234","identify":"user_id","properties":{"order_id":"100000","amount":100,"virtual_currency_amount":100,"currency_type":"CNY","product":"item1","payment":"alipay"}}`

然后urlencode，变成如下形式。某些版本的urlencode可能会把':'和','进行编码，不会影响实际使用。   

`%7B%22module%22:%22GameAnalysis%22,%22name%22:%22charge%22,%22index%22:%22abcd1234%22,%22identify%22:%22user_id%22,%22properties%22:%7B%22order_id%22:%22100000%22,%22amount%22:100,%22virtual_currency_amount%22:100,%22currency_type%22:%22CNY%22,%22product%22:%22item1%22,%22payment%22:%22alipay%22%7D%7D`

成功判断：返回的HTTP Code为200时认为发送成功，否则认为失败
