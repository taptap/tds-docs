---
id: unity-tapdb
title: TapDB
---
## method
### Init
初始化 TapDB

#### API

```cs
public static void Init (string clientId, string channel, string gameVersion, bool isCN);
```

#### 示例代码

```cs
TapDB.Init("clientId","channel","gameVersion",true);
```

### SetUser
设置用户

#### API

```cs
public static void SetUser(string userId)

public static void SetUser(string userId, string loginType)
```

#### 示例代码

```cs
TapDB.SetUser("userId");
TapDB.SetUser("userId", "loginType");
```

**setUser 参数说明 **

| 字段        | 可为空 | 说明                                                           |
| --------- | --- | ------------------------------------------------------------ |
| userId    | 否   | 长度大于 0 并小于等于 256。只能包含数字、大小写字母、下划线 (\_)、横线 (-)，用户 ID。不同用户需要保证 ID 的唯一性 |
| loginType | 否   | 第三方登录枚举类型，具体见下面说明                                            |

**loginType 类型说明 **

参数  | 描述
| ------ | ------ |
LoginType.TAPTAP | TapTap 登录
LoginType.APPLE  | Apple 登录
LoginType.GUEST  | 游客登录

### SetName
设置姓名

#### API

```cs
public static void SetName(string name);
```

#### 示例代码

```cs
TapDB.SetName("name");
```

### SetLevel
设置玩家等级

#### API

```cs
public static void SetLevel(int level);
```

#### 示例代码

```cs
TapDB.SetLevel(5);
```

### SetServer
设置服务器

#### API

```cs
public static void SetServer(string server);
```

#### 示例代码

```cs
TapDB.SetServer("https://test.taptap.com/callback");
```

### OnCharge
充值成功

#### API

```cs
public static void OnCharge(string orderId, string productId, string amount, string currencyType, string payment)
```

#### 示例代码

```cs
TapDB.OnCharge ("0xueiEns","大宝剑","100","CNY","wechat");
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

**参数说明**

| 字段         | 可为空 | 说明                                                   |
| ---------- | --- | ---------------------------------------------------- |
| eventCode  | 否   | 在控制台中配置得到的事件编码                                       |
| properties | 是   | 事件属性。需要和控制台的配置匹配。值需要是长度大于0并小于等于256的字符串或绝对值小于1E11的浮点数 |

<!-- ### Track
自定义回调事件

#### API

```cs
public static void Track (string eventName, string properties);
```

#### 示例代码

```cs
TapDB.Track("tracktest","{\"param1\":\"param1\",\"param2\":\"param2\"}");
```

**参数说明**

| 字段         | 可为空 | 说明                                                   |
| ---------- | --- | ---------------------------------------------------- |
| eventName  | 否   | 在控制台中配置得到的事件编码                                       |
| properties | 是   | 事件属性。需要和控制台的配置匹配。值需要是长度大于0并小于等于256的字符串或绝对值小于1E11的浮点数 | -->

### RegisterStaticProperties
添加静态事件属性

#### API

```cs
public static void RegisterStaticProperties (string properties);
```

#### 示例代码

```cs
TapDB.RegisterStaticProperties("{\"channel\":\"TapDB\"}");
```

### UnregisterStaticProperty 
删除单个静态事件属性

#### API

```cs
public static void UnregisterStaticProperty (string propertKey);
```

#### 示例代码

```cs
TapDB.UnregisterStaticProperty("{\"channel\":\"TapDB\"}");
```

### ClearStaticProperties
删除所有静态事件属性

#### API

```cs
public static void ClearStaticProperties();
```

#### 示例代码

```cs
TapDB.ClearStaticProperties();
```

### DeviceInitialize
设备属性初始化

#### API

```cs
public static void DeviceInitialize (string properties);
```

#### 示例代码

```cs
TapDB.DeviceInitialize("{\"firstActiveServer\":\"server1\"}");
```

### DeviceAdd 
增加设备属性

#### API

```cs
public static void DeviceAdd (string properties);
```

#### 示例代码

```cs
TapDB.DeviceAdd("{\"totalPoints\":10}");
TapDB.DeviceAdd("{\"totalPoints\":-2}");
// 此时设备表的 "totalPoints" 字段值为 8 
```

### DeviceUpdate 
设备属性更新

#### API

```cs
public static void DeviceUpdate (string properties);
```

#### 示例代码

```cs
TapDB.DeviceUpdate("{\"currentPoints\":10}");
TapDB.DeviceUpdate("{\"currentPoints\":42}");
// 此时设备表的 "currentPoints" 字段值为 42 
```


### UserInitialize
初始化用户属性

#### API

```cs
public static void UserInitialize (string properties);
```

#### 示例代码

```cs
TapDB.UserInitialize("{\"param2\":\"param2\"}");
```

### UserUpdate
更新用户信息

#### API

```cs
public static void UserUpdate (string properties);
```

#### 示例代码

```cs
TapDB.UserUpdate("{\"param2\":2}");
```

### UserAdd 
增加用户

#### API

```cs
public static void UserAdd (string properties);
```

#### 示例代码

```cs
TapDB.UserAdd ("{\"param2\":2}");
```


### ClearUser
清除用户

#### API

```cs
public static void ClearUser ();
```

#### 示例代码

```cs
TapDB.ClearUser ();
```