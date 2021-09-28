---
id: guide
title: 数据分析指南
sidebar_label: 开发指南
---


import MultiLang from '@theme/MultiLang';

## 介绍

TapSDK 提供了一套可供游戏开发者收集账号数据的 API。
系统会收集账号数据并进行分析，最终形成数据报表，帮助游戏开发者分析账号行为并优化游戏。

## SDK 获取

请先[下载](/tap-download) SDK，并添加相关依赖。
如果只需要单独使用 TapDB，可以只依赖 `common+tapdb`。

<MultiLang>

```cs
"dependencies":{
// 登录
"com.taptap.tds.login":"https://github.com/TapTap/TapLogin-Unity.git#2.1.7",
"com.taptap.tds.common":"https://github.com/TapTap/TapCommon-Unity.git#2.1.7",
"com.taptap.tds.bootstrap":"https://github.com/TapTap/TapBootstrap-Unity.git#2.1.7",
// 数据分析
"com.taptap.tds.tapdb": "https://github.com/TapTap/TapDB-Unity.git#2.1.7",
}
```

```java
repositories{  
    flatDir {  
        dirs 'libs'  
    }  
}  

dependencies {  
...  
    implementation (name:'TapBootstrap_2.1.7', ext:'aar')  // 必选： TapSDK 启动器 
    implementation (name:'TapCommon_2.1.7', ext:'aar') // 必选：TapSDK 基础库 
    implementation (name:'TapLogin_2.1.7', ext:'aar') // 必选：TapTap 登录 
    implementation (name:'TapDB_2.1.7', ext:'aar') // 数据统计
}  
```

```objectivec
// 登录
TapBootstrapSDK.framework
TapCommonSDK.framework
TapLoginSDK.framework
//TapDB
TapDB.framework
```

</MultiLang>

## 初始化 SDK

:::info
以下两种初始化方式结合使用场景任选其一即可。
:::

### TapSDK 初始化 

在 TapSDK 初始化时，同步初始化 TapDB。

<MultiLang>

```cs
TapConfig tapConfig = new TapConfig.Builder()
    .ClientID("clientId")// 必须
    .ClientSecret("client_secret")// 必须
    .RegionType(RegionType.CN)// 非必须，默认 CN
    .TapDBConfig(true, "gameChannel", "gameVersion", true) // TapDB 会根据 TapConfig 的配置进行自动初始化
    .ConfigBuilder();

TapBootstrap.Init(tapConfig);
```

```java
TapDBConfig tapDBConfig = new TapDBConfig();
        tapDBConfig.setEnable(true);
        tapDBConfig.setChannel("gameChannel");
        
TapConfig tapConfig = new TapConfig.Builder()
        .withAppContext(getApplicationContext())
        .withRegionType(TapRegionType.CN) // TapRegionType.CN: 国内  TapRegionType.IO: 国外
        .withClientId("clientId")
        .withClientSecret("clientSecret")
        .withTapDBConfig(tapDBConfig)
        .build();
TapBootstrap.init(MainActivity.this, tapConfig);
```

```objectivec
    // 初始化 SDK
    TapConfig *config = TapConfig.new;
    config.clientId = @"clientId";
    config.clientSecret=@"clientSecret";

    TapDBConfig * dbConfig = [[TapDBConfig alloc]init];
    dbConfig.enable = YES;
    dbConfig.channel=@"taptap";
    dbConfig.gameVersion=@"1.0.0";
    dbConfig.advertiserIDCollectionEnabled=YES;
    config.dbConfig = dbConfig;

    config.region = TapSDKRegionTypeCN;
    [TapBootstrap initWithConfig:config];
```

</MultiLang>

### TapDB 单独使用

在单独使用 TapDB 功能时（即不接登录功能时，不导入 TapBootstrap 包时），可以通过以下方式初始化 TapDB。

<MultiLang>

```cs
TapDB.Init("clientId", "taptap", "gameVersion", true);
```

```java
TapDB.init(getApplicationContext(), "clientId", "taptap", "gameVersion", true);
```

```objectivec
[TapDB onStartWithClientId:@"clientid" channel:@"taptap" version:@"gameVersion" isCN:YES];
```

</MultiLang>

上述代码示例中，`clientId` 可以在控制台获取，`taptap` 为分包渠道（游戏安装包渠道），`gameVersion` 为游戏版本号，最后一个参数表示区域，`true` 表示中国大陆，`false` 表示国际。
分包渠道和游戏版本号的长度不大于 256，可以为 `null`。
分包渠道为 `null` 时，就无法根据渠道筛选收集到的数据了。
游戏版本号为 `null` 时，TapSDK 会自动获取游戏安装包的版本。

## 设置获取 IDFA

针对 `iOS14.5+`，可以设置是否获取 IDFA。
默认不获取 IDFA，如果设置获取 IDFA，还需要在应用层额外配置相关弹窗权限。

<MultiLang>

```cs
TapDB.AdvertiserIDCollectionEnabled(true);
```

```java
// Android 平台不适用
```

```objectivec
[TapDB setAdvertiserIDCollectionEnabled:YES];
```

</MultiLang>

## 设置账号

调用该 API 记录一个账号，当账号登录时调用。

<MultiLang>

```cs
TapDB.SetUser("userId");
```

```java
TapDB.setUser("userId");
```


```objectivec
[TapDB setUser:@"userId"];
```

 </MultiLang>

`userId` 是代表账号的唯一字符串，字符串长度不大于 256，只能包含数字、大小写字母、下划线(`_`)、短横(`-`)。
开发者需要保证不同账号的 `userId` 均不相同。

## 账号昵称

游戏设置账号昵称时调用。

<MultiLang>

```cs
TapDB.SetName("Tarara");
```

```java
TapDB.setName("Tarara");
```

```objectivec
[TapDB setName:@"Tarara"];
```

</MultiLang>

参数的类型为字符串，不可为空，长度不大于 256。

## 账号等级

设置账号等级，通常在账号升级时调用。

<MultiLang>

```cs
TapDB.SetLevel(5);
```

```java
TapDB.setLevel(5);
```


```objectivec
[TapDB setLevel:5];
```

等级参数为整型，不可为空，大于等于 0。

</MultiLang>

## 账号所在服务器

通常在账号登录或切换服务器时调用。

<MultiLang>

```cs
TapDB.SetServer("1 区");
```

```java
TapDB.setServer("1 区");
```

```objectivec
[TapDB setServer:@"1 区"];
```

</MultiLang>

服务器参数为非空字符串，长度不大于 256。


## 充值

充值成功时调用。
可以选择通过客户端 SDK 推送和通过服务端推送。
建议优先选择服务端推送方式，以保证数据的准确性。

### 客户端推送

<MultiLang>

```cs
TapDB.OnCharge("0xueiEns", "轩辕剑", "100", "CNY", "wechat", "{\"on_sell\":true}");
```

```java
JSONObject info = new JSONObject();
info.put("on_sell": true);
TapDB.onCharge("0xueiEns", "轩辕剑", "100", "CNY", "wechat", info);
```

```objectivec
[TapDB onChargeSuccess:@"0xueiEns" product:@"轩辕剑" amount:100 currencyType:@"CNY" payment:@"wechat", properties:@{@"on_sell":YES}];
```

</MultiLang>

上述代码示例中，`0xueiEns` 是订单 ID，`轩辕剑` 是商品名，`100` 是金额，`CNY` 是货币名称，`wechat` 是充值渠道，最后一个参数传入自定义字段，示例中传入了一个 `on_sell` 字段，表示这个商品是否正在促销。
订单 ID、商品名、充值渠道是长度大于 0、不大于 256 的字符串，可以为 `null`。
传递订单 ID 方便排重，防止重复计算。
金额是大于 0、小于等于 100000000000 的整数，单位为分（主币价值的百分之一），不可为 `null`。
货币名称由三位字母组成，遵循 ISO 4217 标准，为 `null` 时表示使用默认值 `CNY`。

### 服务端推送

由于客户端推送可能会不太准确，因此推荐通过服务端推送。

请求地址：`https://e.tapdb.net/event`

POST 数据（实际发送请求时需去除注释、空格、换行符并 urlencode）：

```json
{
  "module": "GameAnalysis", // 固定值
  "ip": "172.16.254.1", // 可选，充值账号的 IP
  "name": "charge", // 固定值
  // 必需，需要替换成 client id
  "client_id": "CLIENTID",
  // 必需，账号 ID。
  // 必须和 SDK 的 setUser 接口传递的账号 ID 相一致，
  // 并且对应账号已经通过 SDK 接口进行过推送。
  "identify": "userId",
  "properties": { // 详见上节「客户端推送」的说明
    "order_id": "0xueiEns", // 可选，订单 ID
    "amount": 100, // 必需，金额
    "currency_type": "CNY", // 可选，货币名称
    "product": "轩辕剑", // 可选，商品名
    "payment": "wechat" // 可选，充值渠道
    "on_sell": true // 自定义字段
  }
}
```

返回的 HTTP Code 为 200 时发送成功，否则发送失败。

## 自定义事件

需要发送自定义事件时调用，自定义事件的 eventName 和 properties 属性都必须在元数据管理预先配置，才可以使用 SDK 进行发送

用户可以通过调用 trackEvent 方法上传需要跟踪的自定义事件。eventName 为自定义事件的事件名，需要保证以 '#' 开头，取值规则请参考自定义属性登记页面。properties 为自定义事件所包含的自定义属性（以 Key : Value 的形式保存），其中 Key 代表了自定义属性的属性名，Value 代表了该属性的值。这里需要注意的是 Key 的命名规则同 eventName 一致，也需要保证以 '#' 开头。目前所支持的 Value 类型为 String, Number, Boolean。String 类型支持最大长度为 256。Number 类型取值区间为 [-9E15, 9E15]。以战斗事件为例：

<MultiLang>

```cs
TapDB.TrackEvent("eventName", "{\"weapon\":\"axe\"}");	
```

```java
JSONObject properties = new JSONObject();
properties.put("#weapon", "axe");
properties.put("#level", 10);
properties.put("#map", "atrium");
TapDB.trackEvent("#battle", properties); 
```

```objectivec
NSDictionary* dic = @{@"aaa":@"xxx",@"bbb":@"yyy"};   
[TapDB trackEvent:@"testEvent2" properties:dic];
```

</MultiLang>


## 设置通用事件属性

对于某些重要的属性需要在每个上传的事件中出现，用户可以将这些属性设置为全局通用的自定义属性，包括静态通用属性和动态通用属性，静态通用属性为固定值，动态通用属性每次获取的值由用户所设置的计算逻辑产生。这些通用属性在注册之后，会被附带在 TapDB 上传的事件中。这里需要注意 trackEvent 中传入的属性优先级 > 动态通用属性优先级 > 静态通用属性优先级，也就是说动态通用属性会覆盖同名的静态通用属性。trackEvent 中的属性会覆盖同名的动态通用属性和静态通用属性。

### 添加静态通用属性

例如，添加来源渠道：

<MultiLang>

```cs
string properties = "{\"channel\":\"TapDB\"}";
TapDB.RegisterStaticProperties(properties);
```

```java
JSONObject commonProperties = new JSONObject();
commonProperties.put("channel", "TapDB");
TapDB.registerStaticProperties(properties);
```

```objectivec
[TapDB registerStaticProperties:@{@"channel":@"TapDB"}];
```

</MultiLang>

### 删除静态通用属性

删除单个已添加的事件属性：

<MultiLang>

```cs
TapDB.UnregisterStaticProperty("channel");
```

```java
TapDB.unregisterStaticProperty("channel");
```

```objectivec
[TapDB unregisterStaticProperty:@"channel"];
```

</MultiLang>

删除所有事件属性：

<MultiLang>

```cs
TapDB.ClearStaticProperties();
```

```java
TapDB.clearStaticProperties();
```

```objectivec
[TapDB clearStaticProperties];
```

</MultiLang>

### 添加动态通用属性

如果需要添加的通用属性的值在不同的上传事件中具有动态的赋值逻辑，那么可以调用 registerDynamicProperties 方法，注册相应的取值逻辑。以用户事件调用当前等级为例：

<MultiLang>

```cs
public class TapDBDynamicPropertiesImpl : IDynamicProperties
{
        public Dictionary<string, object> GetDynamicProperties()
        {
                Dictionary<string, object> dic = new Dictionary<string, object>();
                dic["#currentLevel"] = level;
                return dic;
        }
}
TapDB.RegisterDynamicProperties(new TapDBDynamicPropertiesImpl());
```

```java

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

```objectivec
[TapDB registerDynamicProperties:^NSDictionary *_Nonnull {
      return @{
          @"#currentLevel": level
      };
  }];
```

</MultiLang>




## 事件主体操作

TapDB 目前支持两个事件主体：设备，账号。相应支持主体属性的操作为初始化，更新和累加。累加操作只支持数值类型。需要注意的是，传入的自定义属性需要同预登记属性名保持一致。

### 初始化

初始化操作用于初始化属性。
已初始化的属性，后续的初始化操作会被忽略。
以上报首次活跃服务器为例：

<MultiLang>

```cs
string properties = "{\"firstActiveServer\":\"server1\"}";
TapDB.DeviceInitialize(properties);

string properties = "{\"firstActiveServer\":\"server2\"}";
TapDB.DeviceInitialize(properties);
```

```java
JSONObject properties = new JSONObject();
properties.put("firstActiveServer", "server1");
TapDB.deviceInitialize(properties);

properties.put("firstActiveServer", "server2");
TapDB.deviceInitialize(properties);
```

```objectivec
[TapDB deviceInitialize:@{@"firstActiveServer":@"server1"}];

[TapDB deviceInitialize:@{@"firstActiveServer":@"server2"}];
```

</MultiLang>

运行上述代码后，设备表的 `firstActiveServer` 字段值仍为 `server1`。

### 更新

更新操作用于更新属性。
该操作会覆盖原属性值。
以上报当前点数为例：

<MultiLang>

```cs
string properties = "{\"currentPoints\":10}";
TapDB.DeviceUpdate(properties);

properties = "{\"currentPoints\":42}";
TapDB.DeviceUpdate(properties);
```

```java
JSONObject properties = new JSONObject();
properties.put("currentPoints", 10);
TapDB.deviceUpdate(properties);

properties.put("currentPoints", 42);
TapDB.deviceUpdate(properties);
```

```objectivec
[TapDB deviceUpdate:@{@"currentPoints":@10}];

[TapDB deviceUpdate:@{@"currentPoints":@42}];
```

</MultiLang>

运行上述代码后，设备表的 `currentPoints` 字段值为 `42`。

### 累加

累加操作用于增减属性，目前只支持数字属性。
该操作会在原属性值基础上累加数值，原属性不存在时，原属性值计为 0.
以上报总点数为例：

<MultiLang>

```cs
string properties = "{\"totalPoints\":10}";
TapDB.DeviceAdd(properties);

properties = "{\"totalPoints\":-2}";
TapDB.DeviceAdd(properties);
```

```java
JSONObject properties = new JSONObject();
properties.put("totalPoints", 10);
TapDB.deviceAdd(properties);

properties.put("totalPoints", -2);
TapDB.deviceAdd(properties);
```

```objectivec
[TapDB deviceAdd:@{@"totalPoints":@10}];

[TapDB deviceAdd:@{@"totalPoints":@(-2)}];
```
</MultiLang>

运行上述代码后，设备表的 `totalPoints` 字段值为 `8`。

上述代码示例中，属性值为整数。
累加操作也支持浮点数，不过浮点数相加有精度问题，开发者还需留意。

初始化、更新、累加操作同样适用于账号主体：

<MultiLang>

```cs
TapDB.UserInitialize(properties);
TapDB.UserUpdate(properties);
TapDB.UserAdd(properties);
```

```java
TapDB.userInitialize(properties);
TapDB.userUpdate(properties);
TapDB.userAdd(properties);
```

```objectivec
[TapDB userInitialize:@{@"firstActiveServer":@"server1"}];
[TapDB userUpdate:@{@"currentPoints":@10}];
[TapDB userAdd:@{@"totalPoints":@10}];
```
</MultiLang>

## 服务端在线人数推送

游戏服务端自行统计在线人数，每隔 5 分钟向 `https://se.tapdb.net/tapdb/online` 发送 POST 请求，请求内容为 json 格式的数据，包含以下信息：

参数名 | 参数类型 | 参数说明
| ------ | ------ | ------ |
client_id | string | 游戏的 client id
onlines | array | 多条在线数据（最多 100 条）

其中 `onlines` 数组元素的结构为：

参数名 | 参数类型 | 参数说明
| ------ | ------ | ------ |
server | string | 服务器。自然时间 5 分钟内，TapDB 对同一服务器仅接受一次数据。
online | int | 在线人数
timestamp | long | 当前统计数据的时间戳（秒）。TapDB 会按照自然时间 5 分钟对齐数据。

示例：

```json
{
  "client_id":"gkjasd13bbsa1sdk",
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

返回的 HTTP Code 为 200 时发送成功，否则发送失败。

注意，因为请求内容为 json 格式数据，所以发送请求时别忘了加上 `Content-Type: application/json` 的 HTTP 头。

## 收集设备指纹

### OAID

当需要采集设备指纹时，需要引入 OAID.  
TapSDK 支持的 OAID 版本为 `1.0.5-1.0.25`。

当游戏集成的其他 SDK 引入了 OAID，TapSDK 里面无需引入，可以直接使用。