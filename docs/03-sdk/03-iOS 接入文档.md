---
title: iOS SDK 文档
---

## iOS SDK 文档

### 1.SDK 集成

#### 1.1.系统要求

适用于 iOS 9.0 及以上的系统版本。

#### 1.2.导入 SDK

请 [下载最新的 SDK](../download)，将 TapDB.framework 导入到 Xcode 工程中。

#### 1.3.添加依赖

需要为 Xcode 工程引入下列依赖的框架或库

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


#### 1.4.初始化

**注意：SDK 默认不会收集广告标识符（IDFA），若需要对 IDFA 进行收集，请在初始化前调用以下接口并在 `info.plist` 中配置 `NSUserTrackingUsageDescription` 及描述文案，如「请允许 xxx 获取并使用你的 IDFA ，来为你提供更好的服务。」**

```
[TapDB setAdvertiserIDCollectionEnabled:YES];
```

初始化 TapDB SDK 并上报一个设备登录（ `device_login` ）事件，调用这个接口是使用其它接口的先决条件，需要尽早调用。
一般建议在AppDelegate的 `application:didFinishLaunchingWithOptions:` 中调用。

```
+ (void)onStart:(NSString *)appId channel:(nullable NSString *)channel version:(nullable NSString *)gameVersion;


+ (void)onStart:(NSString *)appId channel:(nullable NSString *)channel version:(nullable NSString *)gameVersion properties:(nullable NSDictionary *)properties;
```

字段 | 可为空 | 说明
--- | --- | ---
appId | 否 | 创建游戏时获得的APP ID
channel | 是 | 分包渠道
version | 是 | 游戏版本，为空时，自动获取游戏安装包的版本（ Xcode 配置中的 Version ）
properties | 是 | 设备登录（ `device_login` ）的事件属性，可以传入预置属性覆盖 SDK 的默认取值，也可以传入在后台配置过的自定义属性


### 2.设置账号

#### 2.1.设置账号 ID

当用户进行账号登录时，可调用设置账号 ID （ `setUser` ）接口在记录该账号 ID。调用后会上报一个账号登录（ `user_login` ）事件，并将这个设备的是否有用户注册过 （ `has_user` ） 属性置为 `true`。在重启应用或调用清除账号 ID （ `clearUser` ） 前，上报的事件都会带有该账号 ID。

```
+ (void)setUser:(NSString *)userId;

+ (void)setUser:(NSString *)userId properties:(nullable NSDictionary *)properties;
```

字段 | 可为空 | 说明
--- | --- | ---
userId | 否 | 长度大于 0 并小于等于 256。只能包含数字、大小写字母、下划线(_)、横线(-)，用户ID。不同用户需要保证ID的唯一性
properties | 是 | 账号登录（ `user_login` ）的事件属性



#### 2.2.清除账号 ID

当用户进行登出时，可调用 clearUser 清除当前 SDK 中保存账号 ID，后续上报的事件将不会带有账号 ID，调用该接口不会上报任何事件。

```
+ (void)clearUser;
```


#### 2.3.设置账号名称

在用户进行账号登录后，可调用该接口设置该账号的名称，调用后将更新账号的账号名称（ `user_name` ）属性。

```
+ (void)setName:(NSString *)name;
```

字段 | 可为空 | 说明
--- | --- | ---
name | 否 | 长度大于0并小于等于256，账号名


#### 2.4.设置账号等级

在用户进行账号登录后，可调用该接口设置该账号的等级，调用将更新账号的账号等级（ `level` ）属性。

```
+ (void)setLevel:(NSInteger)level;
```

字段 | 可为空 | 说明
--- | --- | ---
level | 否 | 账号等级


#### 2.5.设置账号区服

在用户进行账号登录后，可调用该接口设置该账号的区服信息，调用将初始化账号的首次区服（ `first_server` ）属性、更新账号的当前区服（ `current_server` ）属性。

```
+ (void)setServer:(NSString *)server;
```

字段 | 可为空 | 说明
--- | --- | ---
server | 否 | 账号服务器


### 3.上报充值

在用户进行充值后，可调用该接口上报充值信息，调用后将上报 `charge` 事件，并将传入的参数作为事件的属性。

```
+ (void)onChargeSuccess:(NSString *)orderId product:(NSString *)product amount:(NSInteger)amount currencyType:(NSString *)currencyType payment:(NSString *)payment;

+ (void)onChargeSuccess:(NSString *)orderId product:(NSString *)product amount:(NSInteger)amount currencyType:(NSString *)currencyType payment:(NSString *)payment properties:(NSDictionary *)properties;
```

字段 | 可为空 | 说明
--- | --- | ---
orderId | 否 | 订单ID
product | 是 | 产品名称
amount | 否 | 充值金额（单位分，即无论什么币种，都需要乘以100）
currencyType | 是 | 货币类型，参考：人民币 CNY，美元 USD；欧元 EUR
payment | 是 | 支付方式，如：支付宝
properties | 是 | 充值（ `charge` ）的事件属性

**注意:在条件允许的情况下推荐使用服务端充值统计接口，请参考 [服务端接入文档](../服务端接入文档)**


### 4.上报事件

#### 4.1.上报事件

在 SDK 初始化完成后可使用该接口上报事件

```
 + (void)trackEvent:(NSString *)eventName properties:(NSDictionary *)properties;
```

字段 | 可为空 | 说明
--- | --- | ---
eventName | 否 | 事件的名称
properties | 是 | 事件的属性


**注意:**

* 事件名支持上报预置事件和自定义事件，其中自定义事件应以 `#` 开头
* 事件属性的 key 值为属性的名称，支持 NSString 类型
* 事件属性的 value 值为属性的名称，支持 NSString（最大长度 `256` ）、NSNumber（取值区间为 `[-9E15, 9E15]` ）类型
* 事件属性支持上报预置属性和自定属性，其中自定义属性应以 `#` 开头
* 事件属性传入预置属性时，SDK 默认采集的预置属性将被覆盖


#### 4.2.设置通用事件属性

对于一些所有事件都要携带的属性，建议使用通用事件属性实现。

**添加静态通用事件属性**

```
+ (void)registerStaticProperties:(NSDictionary *)staticProperties;
```

字段 | 可为空 | 说明
--- | --- | ---
staticProperties | 否 | 静态通用事件属性字典

示例：

```
//当设置了静态通用事件属性 #current_channel，值固定为 TapDB 后
[TapDB registerStaticProperties:@{@"#currentChannel":@"TapDB"}];

//使用事件上报时
[TapDB trackEvent:@"#customEventName"
                         withProperties:@{@"#customPropertyName":@"customPropertyValue")}];

//等效于在事件属性中添加了 #current_channel，即
[TapDB trackEvent:@"#customEventName"
withProperties:@{@"#customPropertyName":@"customPropertyValue",
@"#current_channel":@"TapDB")}];
```

**删除单个静态通用事件属性**

```
+ (void)unregisterStaticProperty:(NSString *)propertyName;
```

字段 | 可为空 | 说明
--- | --- | ---
propertyName | 否 | 静态通用属性名

**清空全部静态通用属性**

```
+ (void)clearStaticProperties;
```

**注册动态通用事件属性**

对于可能随时发生变化的通用事件属性，可以注册动态通用事件属性，`dynamicPropertiesCaculator` 将在每次调用时触发，将计算好的属性添加到本次上报事件属性中。

```
+ (void)registerDynamicProperties:(NSDictionary* (^)(void))dynamicPropertiesCaculator;
```

字段 | 可为空 | 说明
--- | --- | ---
dynamicPropertiesCaculator | 否 | 动态通用事件属性计算回调

示例:

```
//后续上报的事件都将携带 #currentLevel 属性，值为变量 level 在事件上报时刻的值

[TapDB registerDynamicProperties:^NSDictionary *_Nonnull {
      return @{
          @"#currentLevel": level
      };
  }];
```

**注意:**

* 在上报事件或通用属性中使用相同属性名会出现属性覆盖的现象，属性覆盖的优先级从高到低依次为：事件属性、动态通用事件属性、静态通用事件属性、预置属性（例如 `trackEvent` 中设置的事件属性将覆盖动态通用事件属性、静态通用事件属性、预置属性中的同名属性）


### 5.修改用户属性

TapDB 支持两种用户模型：设备和账号，你可以通过如下接口对这两种用户的属性进行操作。

**设备属性更新操作**

对于常规的用设备属性，可使用改接口进行赋值操作，新的属性值将会直接覆盖旧的属性值

```
+ (void)deviceUpdate:(NSDictionary *)properties;
```

字段 | 可为空 | 说明
--- | --- | ---
properties | 否 | 属性字典


例如:

```
[TapDB deviceUpdate:@{@"#currentPoints":@10}];
// 此时设备表的 "currentPoints" 字段值为 10

[TapDB deviceUpdate:@{@"#currentPoints":@42}];
// 此时设备表的 "currentPoints" 字段值为 42 
```

**设备属性初始化操作**

对于需要保证只有首次设置时有效的属性，可以使用该接口进行赋值操作，仅当前值为空时赋值操作才会生效，如当前值不为空，则赋值操作会被忽略。

```
+ (void)deviceInitialize:(NSDictionary *)properties;
```

字段 | 可为空 | 说明
--- | --- | ---
properties | 否 | 属性字典


例如：
记录用户首次登陆的区服，客户端无法得知该属性是否已经被设置过，使用该接口保证仅第一次的设置会生效。

```
[TapDB deviceInitialize:@{@"#firstActiveServer":@"server1"}];
// 此时设备表的 "#firstActiveServer" 字段值为 "server1"

[TapDB deviceInitialize:@{@"#firstActiveServer":@"server2"}];
// 此时设备表的 "#firstActiveServer" 字段值还是为 "server1" 
```

**设备属性累加操作**

对于数值类型的属性，可以使用该接口进行累加操作，调用后 TapDB 将对原属性值进行累加后保存结果值
```
+ (void)deviceAdd:(NSDictionary *)properties;
```

字段 | 可为空 | 说明
--- | --- | ---
properties | 否 | 属性字典，value 仅支持 NSNumber 类型


例如：

```
[TapDB deviceAdd:@{@"totalPoints":@10}];
// 此时设备表的 "totalPoints" 字段值为 10

[TapDB deviceAdd:@{@"totalPoints":@(-2)}];
// 此时设备表的 "totalPoints" 字段值为 8 
```

**账号属性更新操作**

使用方法同设备属性更新操作
```
+ (void)userUpdate:(NSDictionary *)properties;
```

**账号属性初始化操作**

```
+ (void)userInitialize:(NSDictionary *)properties;
```

**账号属性累加操作**

使用方法同设备属性累加操作
```
+ (void)userAdd:(NSDictionary *)properties;
```
