---
id: android-tapdb
title: TapDB
---
## method

### init

#### API

```java
public static void init(Context context, String clientId, String channel);
public static void init(Context context, String clientId, String channel, boolean isCN);
```

#### 示例代码

```java
TapDB.init(getApplicationContext(), "Client ID", "taptap");
TapDB.init(getApplicationContext(), "Client ID", "taptap", true);
```
**init 参数说明**  

| 参数         | 可选  | 备注                |
| :--------- | :-- | :---------------- |
| context   | 否   | 上下文 |
| clientId | 否   | 开发者中心获取的 Client ID |
| channel   | 否   | 渠道信息|
| isCN   | 否   | 区域类型: true 表示国内; false 表示国外  默认为 true|


### setUser
当 enableTapDB 后，可以调用此 API  

#### API

```java
public static void setUser(String userId);
public static void setUser(String userId, LoginType loginType);
```

#### 示例代码

```java
TapDB.setUser("xxxxuser1", LoginType.TapTap);
```

**setUser 参数说明**

| 字段        | 可为空 | 说明                                                           |
| --------- | --- | ------------------------------------------------------------ |
| userId    | 否   | 长度大于 0 并小于等于 256。只能包含数字、大小写字母、下划线 (\_)、横线 (-)，用户 ID。不同用户需要保证 ID 的唯一性 |                                           |
| loginType | 否   | 第三方登录枚举类型，具体见下面说明                                            |

**loginType 类型说明**

| 参数          | 说明                                                           |
| :---------- | :----------------------------------------------------------- |
| TapTap      | TapTap 登录                                                     |
| WeiXin      | 微信登录                                                         |
| QQ          | QQ 登录                                                         |
| Tourist     | 游客登录                                                         |
| Apple       | Apple 登录                                                      |
| Alipay      | 支付宝登录                                                        |
| Facebook    | facebook 登录                                                   |
| Google      | Google 登录                                                     |
| Twitter     | Twitter 登录                                                    |
| PhoneNumber | 手机号登录                                                        |
| Custom      | 用户自定义登录类型  |

### setName

设置用户名称
#### API  

```java
public static void setName(String name);
```

#### 示例代码

```java
TapDB.setName("taptap");
```

| 字段   | 可为空 | 说明                |
| ---- | --- | ----------------- |
| name | 否   | 长度大于 0 并小于等于 256。用户名 |

### setLevel

设置用户等级。用户登录或升级时调用  
#### API  

```java
public static void setLevel(int level);
```

#### 示例代码

```java
TapDB.setLevel(5);
```

| 字段    | 可为空 | 说明         |
| ----- | --- | ---------- |
| level | 否   | 大于等于 0。用户等级 |

### setServer

设置用户所在服务器。用户登陆或切换服务器时调用

#### API  

```java
public static void setServer(String server);
```

#### 示例代码

```java
TapDB.setServer("https://test.taptap.com/callback");
```

| 字段     | 可为空 | 说明                    |
| ------ | --- | --------------------- |
| server | 否   | 长度大于 0 并小于等于 256。用户所在服务器 |

### onCharge

充值成功时调用。SDK 推送和 4.1 中描述的服务端推送方法只能选择其中一种。建议优先选择服务端推送方式，以保证数据的准确性。

#### API  

```java
public static void onCharge(String orderId, String product, long amount, String currencyType, String payment);
```

#### 示例代码

```java
TapDB.onCharge ("0xueiEns", "LeeJiEun 5th Album", "1000", "CNY", "wechat");
```

**参数说明**  

| 字段           | 可为空 | 说明                                                |
| ------------ | --- | ------------------------------------------------- |
| orderId      | 是   | 订单 ID。长度大于 0 并小于等于 256。传递订单 ID 可进行排重，防止计算多次             |
| product      | 是   | 商品名称。长度大于 0 并小于等于 256。                               |
| amount       | 否   | 充值金额。大于 0 并小于等于 100000000000。单位分，即无论什么币种，都需要乘以 100    |
| currencyType | 是   | 货币类型。国际通行三字母表示法，为空时默认 CNY。参考：人民币 CNY，美元 USD；欧元 EUR|
| payment      | 是   | 充值渠道。长度大于 0 并小于等于 256。                               |

常见货币类型的格式参考 <a target="_blank" href="https://www.tapdb.com/docs/zh_CN/features/exchangeRate.html"> 汇率表 </a>


### deviceInitialize

设备初始化操作

#### API

```java
public static void deviceInitialize(final JSONObject properties);
```
如果需要初始化设备的某些属性，可以调用 deviceInitialize 来进行设置。如果相应属性之前已近被初始化，那么后续对这些属性的初始化操作将会被忽略。以首次活跃服务器为例：

#### 示例代码

```java
JSONObject properties = new JSONObject();
properties.put("firstActiveServer","server1");
TapDB.deviceInitialize(properties);
```

### deviceUpdate

设备属性更新操作

#### API

```java
public static void deviceUpdate(final JSONObject properties);
```

如果需要更新设备的某些属性，可以调用 deviceUpdate 来进行设置。通过该接口上传的属性会将原有属性值进行覆盖。以当前积分为例：

#### 示例代码

```java
JSONObject properties = new JSONObject();
properties.put("currentPoints", 10);
// 此时设备表的 "currentPoints" 字段值为 10
TapDB.deviceUpdate(properties);

JSONObject nextProperties = new JSONObject();
nextProperties.put("currentPoints", 42);
// 此时设备表的 "currentPoints" 字段值为 42 
TapDB.deviceUpdate(nextProperties);
```

### deviceAdd

设备属性累加操作

#### API

```java
public static void deviceAdd(final JSONObject properties);
```
如果需要对设备的某些数值属性有加减的需求，可以调用 deviceAdd 来进行操作。未初始化数值属性在操作时会被当做 0 进行计算。以当前总积分为例：

#### 示例代码

```java
JSONObject properties = new JSONObject();
properties.put("totalPoints", 10);
// 此时设备表的 "totalPoints" 字段值为 10
TapDB.deviceAdd(properties);

JSONObject nextProperties = new JSONObject();
nextProperties.put("totalPoints", -2);
// 此时设备表的 "totalPoints" 字段值为 8 
TapDB.deviceAdd(nextProperties);
```

### userInitialize

账号初始化操作

#### API

```java
public static void userInitialize(final JSONObject properties);
```

#### 示例代码

```java
JSONObject properties = new JSONObject();
properties.put("userName", "LeeJiEun");
TapDB.userInitialize(properties);
```

### userUpdate

账号属性更新操作

#### API

```java
public static void userUpdate(final JSONObject properties);
```

#### 示例代码

```java
JSONObject properties = new JSONObject();
properties.put("useAge", 29);
TapDB.userUpdate(properties);
```

### userAdd

账号属性累加操作

#### API

```java
public static void userAdd(final JSONObject properties);
```

#### 示例代码

```java
JSONObject properties = new JSONObject();
properties.put("userName", "LeeJiEun");
TapDB.userAdd(properties);
```

### registerStaticProperties

添加静态事件属性

#### API

```java
public static void registerStaticProperties(final JSONObject properties);
```
如果需要添加的通用属性的值在所有事件中相对固定，那么可以调用 registerStaticProperties 方法注册静态通用属性。以来源渠道为例：

#### 示例代码

```java
// 设置了静态属性 "channel"，值固定为 "TapDB"
JSONObject properties = new JSONObject();
properties.put("channel", "TapDB");
TapDB.registerStaticProperties(properties); 
```

### unregisterStaticProperties

删除单个静态事件属性

#### API

```java
public static void unregisterStaticProperties(final JSONObject properties);
```

#### 示例代码

```java
JSONObject properties = new JSONObject();
properties.put("channel", "TapDB");
TapDB.unregisterStaticProperties(properties); 
```

### registerDynamicProperties

添加动态事件属性

#### API

```java
public static void registerDynamicProperties(final TapDBDataDynamicProperties dynamicProperties);
```

如果需要添加的通用属性的值在不同的上传事件中具有动态的赋值逻辑，那么可以调用 registerDynamicProperties 方法，注册相应的取值逻辑。以用户事件调用当前等级为例：

#### 示例代码

```java
registerDynamicProperties(
	() -> {
			JSONObject properties = new JSONObject();
			// getCurrentLevel 在这里仅作为案例，表示开发者任何的自有逻辑实现
			long level = getCurrentLevel();
			properties.put("#currentLevel", level);
			return properties; 
	}
);
```



### clearStaticProperties

删除所有静态事件属性

#### API

```java
public static void clearStaticProperties();
```

#### 示例代码

```java
TapDB.clearStaticProperties();
```
