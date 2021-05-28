---
id: ios-tapdb
title: TapDB
---
## method

### onStartWithClientId

初始化TapDB功能

#### API
```objectivec
+ (void)onStartWithClientId:(NSString *)clientId channel:(nullable NSString *)channel version:(nullable NSString *)gameVersion isCN:(BOOL)isCN;
```

#### 示例代码

```objectivec
[TapDB onStartWithClientId:@"clientid" channel:@"taptap" version:@"2.0.0" isCN:true];
```

### setUser

#### API

```objectivec
+ (void)setUser:(NSString *)userId;
+ (void)setUser:(NSString *)userId loginType:(TapDBLoginType)loginType;
```

#### 示例代码

```objectivec
[TapDB setUser:@"userId" loginType:TapDBLoginTypeTapTap];
```

**setUser 参数说明**

| 字段        | 可为空 | 说明                                                           |
| --------- | --- | ------------------------------------------------------------ |
| userId    | 否   | 长度大于 0 并小于等于 256。只能包含数字、大小写字母、下划线 (\_)、横线 (-)，用户 ID。不同用户需要保证 ID 的唯一性 |
| loginType | 否   | 第三方登录枚举类型，具体见下面说明                                            |

**loginType 类型说明**

参数  | 描述
| ------ | ------ |
TapBootstrapLoginTypeTapTap | TapTap 登录
TapBootstrapLoginTypeApple  | Apple 登录
TapBootstrapLoginTypeGuest  | 游客登录


### setName

设置用户名称
#### API  

```objectivec
+ (void)setName:(NSString *)name;
```

#### 示例代码

```objectivec
 [TapDB setName:@"Tap zhang"];
```

| 字段   | 可为空 | 说明                |
| ---- | --- | ----------------- |
| name | 否   | 长度大于 0 并小于等于 256。用户名 |

### setLevel

设置用户等级。用户登录或升级时调用  
#### API  

```objectivec
+ (void)setLevel:(NSInteger)level;
```

#### 示例代码

```objectivec
[TapDB setLevel:10];
```

| 字段    | 可为空 | 说明         |
| ----- | --- | ---------- |
| level | 否   | 大于等于 0。用户等级 |

### setServer

设置用户所在服务器。用户登陆或切换服务器时调用

#### API  

```objectivec
+ (void)setServer:(NSString *)server;
```

#### 示例代码

```objectivec
[TapDB setServer:@"https://test.taptap.com/callback"];
```

| 字段     | 可为空 | 说明                    |
| ------ | --- | --------------------- |
| server | 否   | 长度大于 0 并小于等于 256。用户所在服务器 |

### onChargeSuccess

充值成功时调用。SDK 推送和 4.1 中描述的服务端推送方法只能选择其中一种。建议优先选择服务端推送方式，以保证数据的准确性。

#### API  

```objectivec
+ (void)onChargeSuccess:(NSString *)orderId product:(NSString *)product amount:(NSInteger)amount currencyType:(NSString *)currencyType payment:(NSString *)payment;
```

#### 示例代码

```objectivec
[TapDB onChargeSuccess:@"0xueiEns" product:@"轩辕剑" amount:10 currencyType:@"CNY" payment:@"wechat"];
```

**参数说明**

| 字段           | 可为空 | 说明                                                |
| ------------ | --- | ------------------------------------------------- |
| orderId      | 是   | 订单 ID。长度大于 0 并小于等于 256。传递订单 ID 可进行排重，防止计算多次             |
| product      | 是   | 商品名称。长度大于 0 并小于等于 256。                               |
| amount       | 否   | 充值金额。大于 0 并小于等于 100000000000。单位分，即无论什么币种，都需要乘以 100    |
| currencyType | 是   | 货币类型。国际通行三字母表示法，为空时默认 CNY。参考：人民币 CNY，美元 USD；欧元 EUR |
| payment      | 是   | 充值渠道。长度大于 0 并小于等于 256。                               |

常见货币类型的格式参考 <a target="_blank" href="https://www.tapdb.com/docs/zh_CN/features/exchangeRate.html"> 汇率表 </a>
<!-- 
### onEvent

推送自定义事件。需要在控制台预先进行配置。

#### API  

```objectivec
+ (void)onEvent:(NSString *)eventCode properties:(NSDictionary *)properties;
```

#### 示例代码

```objectivec
NSDictionary *dict = [NSDictionary dictionaryWithObjectsAndKeys:@"name",@"Tap zhang",@"age",@"18",nil];
[TapDB onEvent:@"userInfo" properties:dict];
```

| 字段         | 可为空 | 说明                                                   |
| ---------- | --- | ---------------------------------------------------- |
| eventCode  | 否   | 在控制台中配置得到的事件编码                                       |
| properties | 是   | 事件属性。需要和控制台的配置匹配。值需要是长度大于0并小于等于256的字符串或绝对值小于1E11的浮点数 | -->
### deviceInitialize


#### API  

```objectivec
+ (void)deviceInitialize:(NSDictionary *)properties;
```

#### 示例代码

```objectivec
NSDictionary* dic = @{@"firstActiveServer":@"server1"};
[TapDB deviceInitialize:dic];
```

### deviceUpdate


#### API  

```objectivec
+ (void)deviceUpdate:(NSDictionary *)properties;
```

#### 示例代码

```objectivec
 NSDictionary* dic = @{@"currentPoints":@10};
[TapDB deviceUpdate:dic];
```

### deviceAdd


#### API  

```objectivec
+ (void)deviceAdd:(NSDictionary *)properties;
```

#### 示例代码

```objectivec
 NSDictionary* dic = @{@"totalPoints":@10};
[TapDB deviceAdd:dic];
```

### userInitialize


#### API  

```objectivec
+ (void)userInitialize:(NSDictionary *)properties;
```

#### 示例代码

```objectivec
 NSDictionary* dic = @{@"params":@"user"};
[TapDB userInitialize:dic];
```

### userUpdate


#### API  

```objectivec
+ (void)userUpdate:(NSDictionary *)properties;
```

#### 示例代码

```objectivec
 NSDictionary* dic = @{@"params":@"1"};
[TapDB userUpdate:dic];
```

### userAdd


#### API  

```objectivec
+ (void)userAdd:(NSDictionary *)properties;
```

#### 示例代码

```objectivec
 NSDictionary* dic = @{@"params":@"1"};
[TapDB userAdd:dic];
```


### registerDynamicProperties


#### API  

```objectivec
+ (void)registerDynamicProperties:(NSDictionary* (^)(void))dynamicPropertiesCaculator;
```

#### 示例代码

```objectivec
NSDictionary* dic1 = @{@"params":@"param1"};
[TapDB registerStaticProperties:dic1];
```

### registerStaticProperties


#### API  

```objectivec
+ (void)registerStaticProperties:(NSDictionary *)staticProperties;
```

#### 示例代码

```objectivec
NSDictionary* dic = @{@"params":@"param1"};
[TapDB registerStaticProperties:dic];
```

### clearStaticProperties


#### API  

```objectivec
+ (void)clearStaticProperties;
```

#### 示例代码

```objectivec
[TapDB clearStaticProperties];
```

### unregisterStaticProperty


#### API  

```objectivec
+ (void)unregisterStaticProperty:(NSString *)propertyName;
```

#### 示例代码

```objectivec
NSDictionary* dic = @{@"params":@"param1"};
[TapDB unregisterStaticProperty:dic];
```
