---
title: iOS SDK文档
---

## 1.简介

### 1.1.适用范围

TapDB 提供一套 SDK，游戏开发者可以将其集成到游戏中。系统会收集用户数据，并进行分析，最终形成数据报表，帮助游戏开发者分析用户行为并优化游戏。

目前 SDK 适用于 iOS 9.0 及以上的系统，支持 armv7/armv7s/arm64 架构。

### 1.2.名词解释

名词 | 含义
--- | ---
设备 | 安装了游戏的设备
分包渠道 | 标识游戏安装包的渠道，需要在代码中设置，可作为控制后台的过滤条件
用户 | 默认用户主体分为设备和账号
付费 | 用户使用真实货币换取游戏虚拟币或游戏道具

## 2.使用方法

### 2.1.申请应用

在TapDB控制台中注册一个游戏，获得游戏对应的APP ID。这是一个长度为16的字符串。iOS和Android可共用一个APP ID。  


### 2.2.向Xcode工程中导入SDK

在 TapDB 网站上下载最新的 SDK，将 TapDB.framework 导入到 Xcode 工程中.

**若需要收集广告标识符（IDFA），可调用以下接口。请在初始化之前调用**

```objc
[TapDB setAdvertiserIDCollectionEnabled:YES];
```

**iOS 14开始，获取IDFA需要配置单独权限声明**，在 info.plist 中配置 NSUserTrackingUsageDescription 及描述文案。如：请允许xxx获取并使用您的IDFA,来为您提供更好的服务。

**TapDB版本 2.2.3及以上，请使用Xcode12.3或更高**。

权限声明 | 含义
--- | ---
NSUserTrackingUsageDescription | 用来获取设备广告标识，跟踪设备


### 2.3.引入依赖的框架

#### 2.3.1.系统依赖

需要为Xcode工程引入下列依赖的框架或库

名词 | 含义 | 备注
--- | --- | ---
AdSupport.framework | 用来获取设备广告标识，跟踪设备
AdService.framework | 广告框架 | optional
AppTrackingTransparency.framework | iOS14新增app追踪框架 | optional
SystemConfiguration.framework | 
CoreMotion.framework | 
Security.framework | 用来进行更好的持久化存储
libc++.tdb | c++ 
libresolv.tbd | 
libz.tbd |  
libsqlite3.0.tbd |  


### 2.4.调用统计接口

在需要调用统计接口的代码中引入头文件TapDB.h，并按照后面的接口介绍调用统计接口。

```objc
##import <TapDB/TapDB.h>
```
注：如果 Xcode 提示找不到 TapDB.h 头文件，请确保 Xcode 工程中的 Build Settings -> Search Paths -> Framework Search Paths 中的路径设置正确。



## 3.接口说明

头文件中定义了一个 TapDB 类，包含的都是静态方法，直接用类名调用即可。

### 3.1.初始化

初始化统计系统SDK，调用这个接口是使用其它接口的先决条件，需要尽早调用。
一般建议在AppDelegate的 `application:didFinishLaunchingWithOptions:` 中调用。


```objc
+ (void)onStart:(NSString *)appId channel:(nullable NSString *)channel version:(nullable NSString *)gameVersion properties:(nullable NSDictionary *)properties;
```


字段 | 可为空 | 说明
--- | --- | ---
appId | 否 | 注册游戏时获得的APP ID
channel | 是 | 分包渠道，1.2.名词解释中有介绍
version | 是 | 游戏版本，为空时，自动获取游戏安装包的版本（Xcode配置中的Version）
properties | 是 | 自定义属性，随初始化事件上传


#### 3.2.登录

记录一个账号，当账号登陆时调用。
```objc
+ (void)setUser:(NSString *)userId properties:(nullable NSDictionary *)properties;
```

字段 | 可为空 | 说明
--- | --- | ---
userId | 否 | 长度大于0并小于等于256。只能包含数字、大小写字母、下划线(_)、横线(-)，用户ID。不同用户需要保证ID的唯一性
properties | 是 | 自定义属性，随用户登录事件上传

### 3.3.账号名称

设置账号名称。

```objc
/// 设置账号名
/// @param name 必传，长度大于0并小于等于256，账号名
+ (void)setName:(NSString *)name;
```

字段 | 可为空 | 说明
--- | --- | ---
name | 否 | 长度大于0并小于等于256，账号名

### 3.4.账号等级

设置账号等级，账号登陆时或升级时调用。

```objc
+ (void)setLevel:(NSInteger)level;
```

字段 | 可为空 | 说明
--- | --- | ---
level | 否 | 账号等级


### 3.5.账号区服

设置账号区服，账号登陆时或更换区服时调用。

```objc
+ (void)setServer:(NSString *)server;
```

字段 | 可为空 | 说明
--- | --- | ---
server | 否 | 账号服务器

### 3.6.充值

<div style={{fontSize: '18px', fontWeight: '500', position: 'relative'}}>
<p style={{position: 'absolute',top:'-50px',left:'150px'}}>(<span style={{color: '#080'}}>推荐使用服务端充值统计接口</span>)</p></div>
充值成功时调用。

```objc
+ (void)onChargeSuccess:(NSString *)orderId product:(NSString *)product amount:(NSInteger)amount currencyType:(NSString *)currencyType payment:(NSString *)payment;
```

字段 | 可为空 | 说明
--- | --- | ---
orderId | 否 | 订单ID
product | 是 | 产品名称
amount | 否 | 充值金额（单位分，即无论什么币种，都需要乘以100）
currencyType | 是 | 货币类型，参考：人民币 CNY，美元 USD；欧元 EUR
payment | 是 | 支付方式，如：支付宝

常见货币类型的格式参考<a target="_blank" href="https://www.tapdb.com/docs/zh_CN/features/exchangeRate.html">汇率表</a>

#### 3.7.登出
账号登出时，需要调用以下接口清空用户数据。

```objc
/**
登出清理账号
*/
+ (void)clearUser;
```



### 3.8.自定义事件（如需开通自定义事件，请联系技术支持QQ：3171097571）
  


需要发送自定义事件时调用，自定义事件的 eventName 和 properties 属性都必须在元数据管理预先配置，才可以使用SDK进行发送

```objc
 + (void)trackEvent:(NSString *)eventName properties:(NSDictionary *)properties;
```

用户可以通过调用 trackEvent 方法上传需要跟踪的自定义事件。eventName 为自定义事件的事件名，需要保证以 '#' 开头，取值规则请参考自定义属性登记页面。properties 为自定义事件所包含的自定义属性（以 Key : Value 的形式保存），其中 Key 代表了自定义属性的属性名，Value 代表了该属性的值。这里需要注意的是 Key 的命名规则同 eventName 一致，也需要保证以 '#' 开头。目前所支持的 Value 类型为 String, Number, Boolean。String 类型支持最大长度为 256。Number 类型取值区间为 [-9E15, 9E15]。以战斗事件为例：

```objc
[TapDB trackEvent:@"#battle"
                         withProperties:@{@"#weapon":@"axe")}];
```


字段 | 可为空 | 说明
--- | --- | ---
eventName | 否 | 事件code，需要在元数据管理预先配置
properties | 是 | 事件属性，具体字段需要在元数据管理预先配置

### 3.9.事件主体操作（账号、设备）
TapDB 目前支持两个事件主体：设备，账号。相应支持的主体操作为初始化，更新和累加。累加操作只支持数值类型。
需要注意的是，传入的自定义属性需要同预登记属性名保持一致。

#### 设备属性初始化操作

```objc
/// 初始化设备属性操作
/// @param properties 属性字典
+ (void)deviceInitialize:(NSDictionary *)properties;
```

如果需要初始化设备的某些属性，可以调用 deviceInitialize 来进行设置。如果相应属性之前已近被初始化，那么后续对这些属性的初始化操作将会被忽略。以首次活跃服务器为例：

```objc
[TapDB deviceInitialize:@{@"firstActiveServer":@"server1"}];
// 此时设备表的 "firstActiveServer" 字段值为 "server1"

[TapDB deviceInitialize:@{@"firstActiveServer":@"server2"}];
// 此时设备表的 "firstActiveServer" 字段值还是为 "server1" 
```

#### 设备属性更新操作

```objc
/// 更新设备属性操作
/// @param properties 属性字典
+ (void)deviceUpdate:(NSDictionary *)properties;
```

如果需要更新设备的某些属性，可以调用 deviceUpdate 来进行设置。通过该接口上传的属性会将原有属性值进行覆盖。以当前积分为例：

```objc
[TapDB deviceUpdate:@{@"currentPoints":@10}];
// 此时设备表的 "currentPoints" 字段值为 10

[TapDB deviceUpdate:@{@"currentPoints":@42}];
// 此时设备表的 "currentPoints" 字段值为 42 
```

#### 设备属性累加操作 

```objc
/// 设备属性增加操作
/// @param properties 属性字典 暂时只支持数字属性
+ (void)deviceAdd:(NSDictionary *)properties;
```

如果需要更新设备的某些属性，可以调用 deviceUpdate 来进行设置。通过该接口上传的属性会将原有属性值进行覆盖。以当前积分为例：

```objc
[TapDB deviceAdd:@{@"totalPoints":@10}];
// 此时设备表的 "totalPoints" 字段值为 10

[TapDB deviceAdd:@{@"totalPoints":@(-2)}];
// 此时设备表的 "totalPoints" 字段值为 8 
```

#### 账号属性初始化操作 

```objc
/// 账号属性初始化操作 
/// @param properties 属性字典
+ (void)userInitialize:(NSDictionary *)properties;
```

#### 账号属性更新操作
使用方法同设备属性更新操作
```objc
/// 账号属性更新操作
/// @param properties 属性字典
+ (void)userUpdate:(NSDictionary *)properties;
```

#### 账号属性累加操作
使用方法同设备属性累加操作
```objc
/// 账号属性累加操作
/// @param properties 属性字典 暂时只支持数字属性
+ (void)userAdd:(NSDictionary *)properties;
```


### 3.10.设置通用事件属性

对于某些重要的属性需要在每个上传的事件中出现，用户可以将这些属性设置为全局通用的自定义属性，包括静态通用属性和动态通用属性，静态通用属性为固定值，动态通用属性每次获取的值由用户所设置的计算逻辑产生。这些通用属性在注册之后，会被附带在TapDB上传的事件中。这里需要注意 trackEvent 中传入的属性优先级 > 动态通用属性优先级 > 静态通用属性优先级，也就是说动态通用属性会覆盖同名的静态通用属性。trackEvent 中的属性会覆盖同名的动态通用属性和静态通用属性。 

#### 添加静态事件属性 

```objc
/// 添加静态事件属性，每个事件都将会发送
/// @param staticProperties 属性字典
+ (void)registerStaticProperties:(NSDictionary *)staticProperties;
```

```objc
[TapDB registerStaticProperties:@{@"channel":@"TapDB"}];
// 设置了静态属性 "channel"，值固定为 "TapDB"

[TapDB trackEvent:@"#customEvent"
                         withProperties:@{@"#custom1":@"custom")}];
// 使用 trackEvent 方法上传自定义事件，此时上传的事件中带有上面设置的公共属性 "channel", 值为 "TapDB" 
```
如果需要添加的通用属性的值在所有事件中相对固定，那么可以调用 registerStaticProperties 方法注册静态通用属性


#### 删除单个静态事件属性 

如果要删除某个已添加的静态通用属性，不想让它出现在之后的每个事件中，可以调用 unregisterStaticProperty 方法，将不需要的静态通用属性删除。

```objc
/// 删除添加的某个静态事件属性
/// @param propertyName 属性Key
+ (void)unregisterStaticProperty:(NSString *)propertyName;
```


#### 删除所有静态事件属性  
```objc
/// 删除所有静态事件属性
+ (void)clearStaticProperties;
```


如果想要删除之前添加的所有静态通用属性，那么可以调用快捷方法 clearStaticProperties，清空所有注册的静态通用方法。


#### 添加动态事件属性 

```objc
/// 添加动态事件属性，每次发送事件会调用dynamicPropertiesCaculator
/// @param dynamicPropertiesCaculator 动态属性回调，需返回希望上传的属性字典
+ (void)registerDynamicProperties:(NSDictionary* (^)(void))dynamicPropertiesCaculator;
```

如果需要添加的通用属性的值在不同的上传事件中具有动态的赋值逻辑，那么可以调用 registerDynamicProperties 方法，注册相应的取值逻辑。以用户事件调用当前等级为例：

```objc
[TapDB registerDynamicProperties:^NSDictionary *_Nonnull {
      return @{
          @"#currentLevel": level
      };
  }];
```

## 4 服务端推送接口
### 4.1在线人数

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
online | int | 在线人数
timestamp | long | 当前统计数据的时间戳(秒)。TapDB会按照自然5分钟进行数据对齐

示例：

```js
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

### 4.2充值

由于SDK推送可能会不太准确，这里提供服务端充值推送方法。需要忽略掉SDK中的相关充值推送接口。

```
接口：https://e.tapdb.net/event
```
内容（注意后面还需要处理一下）：
```js
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

>{"module":"GameAnalysis","name":"charge","index":"abcd1234","identify":"user_id","properties":{"order_id":"100000","amount":100,"virtual_currency_amount":100,"currency_type":"CNY","product":"item1","payment":"alipay"}}

然后urlencode，变成如下形式。某些版本的urlencode可能会把 `:` 和 `,` 进行编码，不会影响实际使用。   

>%7B%22module%22:%22GameAnalysis%22,%22name%22:%22charge%22,%22index%22:%22abcd1234%22,%22identify%22:%22user_id%22,%22properties%22:%7B%22order_id%22:%22100000%22,%22amount%22:100,%22virtual_currency_amount%22:100,%22currency_type%22:%22CNY%22,%22product%22:%22item1%22,%22payment%22:%22alipay%22%7D%7D

成功判断：返回的HTTP Code为200时认为发送成功，否则认为失败
