---
id: tap-fun-db
title: TapDB数据收集
sidebar_label: 数据收集
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {Highlight} from '../component';

:::caution
**目前 需要联系运营团队获取 TapDB 的使用权限。**
:::

`本文介绍数据收集相关功能和使用方式`
## 1. 介绍
TapSDK 提供一套可供游戏开发者收集用户数据的API。系统会收集用户数据并进行分析，最终形成数据报表，帮助游戏开发者分析用户行为并优化游戏。  

## 2. 功能开启
放在初始化 SDK 之后调用即可

#### API  
<Tabs
groupId="tap-platform"
  defaultValue="Android"
  values={[
    {label: 'Android', value: 'android'},
    {label: 'iOS', value: 'ios'},
    {label: 'unity', value: 'unity'},
  ]}>
  <TabItem value="android">

  ```java
  public static void enableTapDB(Activity activity, String gameVersion, String gameChannel)
  ```  
  </TabItem>

  <TabItem value="ios">

```objectivec
(void)enableTapDBWithChannel:(nullable NSString *)channel gameVersion:(nullable NSString *)gameVersion;
```
  </TabItem>

  <TabItem value="unity">

```cs
public static void EnableTapDB(string gameVersion, string channel);
```

  </TabItem>
</Tabs>

#### 示例代码

<Tabs
groupId="tap-platform"
  defaultValue="Android"
  values={[
    {label: 'Android', value: 'android'},
    {label: 'iOS', value: 'ios'},
    {label: 'unity', value: 'unity'},
  ]}>
  <TabItem value="android">

```java
  TdsInitializer.enableTapDB(MainActivity.this, "1.0", "taptap");
```
  </TabItem>

  <TabItem value="ios">

```objectivec
[TDSInitializer enableTapDBWithChannel:@"taptap" gameVersion:@"v1.0.0"];
```
  </TabItem>
  <TabItem value="unity">

```cs
TapSDK.TDSCore.EnableTapDB(gameVersion,gameChannel);
```

  </TabItem>
</Tabs>

**enableTapDB 参数说明：**   

字段 | 必须 | 说明  
------ | ------ | ------
channel | 否 | [分包渠道](/sdk/tap-noun#分包渠道)。长度大于0并小于等于256的字符串。
gameVersion | 否 | 游戏版本。长度大于0并小于等于256的字符串。为空时，自动获取游戏安装包的版本（AndroidManifest.xml中的versionName）


## 3. 记录一个用户
当 enableTapD B后，可以调用此 API 来记录一个用户  

#### API
<Tabs
groupId="tap-platform"
  defaultValue="Android"
  values={[
    {label: 'Android', value: 'android'},
    {label: 'iOS', value: 'ios'},
    {label: 'unity', value: 'unity'},
  ]}>
  <TabItem value="android">

```java
  public static void setUser(String userId)
  public static void setUser(String userId,  LoginType loginType)
```
  </TabItem>

  <TabItem value="ios">

  ```objectivec  
+ (void)setUser:(NSString *)userId;
+ (void)setUser:(NSString *)userId  loginType:(TapDBLoginType)loginType;
  ```
  </TabItem>
  <TabItem value="unity">

```cs
public static void SetUser(string userId)

public static void SetUser(string userId, string loginType)
```

  </TabItem>
</Tabs>




#### 示例代码
<Tabs
groupId="tap-platform"
  defaultValue="Android"
  values={[
    {label: 'Android', value: 'android'},
    {label: 'iOS', value: 'ios'},
    {label: 'unity', value: 'unity'},
  ]}>
  <TabItem value="android">

  ```java
  TapDB.setUser("xxxxuser1", LoginType.TapTap);
  ```
  </TabItem>

  <TabItem value="ios">

  ```objectivec
 [TapDB setUser:@"userId" loginType:TapDBLoginTypeTapTap];
  ```
  </TabItem>
  <TabItem value="unity">

```cs
TapSDK.TDSTapDB.SetUser("userId");
TapSDK.TDSTapDB.SetUser("userId","loginType");
```

  </TabItem>
</Tabs>

**setUser 参数说明**

字段 | 可为空 | 说明
| ------ | ------ | ------ |
userId | 否 | 长度大于0并小于等于256。只能包含数字、大小写字母、下划线(_)、横线(-)，用户ID。不同用户需要保证ID的唯一性
loginType | 否 | 第三方登录枚举类型，具体见下面说明

**loginType 类型说明**

| 参数      |    说明   |
| :-------- | :-------- |
| TapTap      |    TapTap 登录   |
| WeiXin      |    微信登录   |
| QQ      |    QQ 登录   |
| Tourist      |    游客登录   |
| Apple      |    Apple 登录   |
| Alipay      |    支付宝登录 |
| Facebook      |    facebook 登录   |
| Google      |    Google 登录   |
| Twitter      |    Twitter 登录   |
| PhoneNumber      |    手机号登录   |
| Custom      |   用户自定义登录类型  （默认名字为 Custom, 如需修改可以调用 LoginType.Custom.changeType） |
<!--
### TapTap登录时openId获取方式

<Tabs
groupId="tap-platform"
  defaultValue="Android"
  values={[
    {label: 'Android', value: 'android'},
    {label: 'iOS', value: 'ios'},
    {label: 'unity', value: 'unity'},
  ]}>
  <TabItem value="android">

  ```java
  Profile.fetchProfileForCurrentAccessToken(new Api.ApiCallback<Profile>() {
              @Override
              public void onSuccess(Profile data) {
                  Log.e(Tag, "checkLogin-onSuccess");
                  String openId = Profile.getCurrentProfile().getOpenid();
              }

              @Override
              public void onError(Throwable error) {
                  Log.e(Tag, "checkLogin-onError");
                  login();
              }
          });
  ```
  </TabItem>

  <TabItem value="ios">

```objectivec
TTSDKProfile *currentProfile = [TapLoginHelper currentProfile];
NSString *openId = [currentProfile openid];
```
  </TabItem>
  <TabItem value="unity">

```cs
TapSDK.TDSLogin.GetCurrentProfile((profile) => {
    string openid = profile.openid;
});
```
  </TabItem>

</Tabs> -->


## 4. 用户名称
设置用户名称

#### API  
<Tabs
groupId="tap-platform"
  defaultValue="Android"
  values={[
    {label: 'Android', value: 'android'},
    {label: 'iOS', value: 'ios'},
    {label: 'unity', value: 'unity'},
  ]}>
  <TabItem value="android">

  ```java
  public static void setName(String name)
  ```
  </TabItem>

  <TabItem value="ios">

  ```objectivec
+ (void)setName:(NSString *)name;
  ```
  </TabItem>
  <TabItem value="unity">

```cs
public static void SetName(string name);
```

  </TabItem>
</Tabs>

#### 示例代码
<Tabs
groupId="tap-platform"
  defaultValue="Android"
  values={[
    {label: 'Android', value: 'android'},
    {label: 'iOS', value: 'ios'},
    {label: 'unity', value: 'unity'},
  ]}>
  <TabItem value="android">

  ```java
  TapDB.setName("taptap");
  ```
  </TabItem>

  <TabItem value="ios">

  ```objectivec
 [TapDB setName:@"Tap zhang"];
  ```
  </TabItem>
  <TabItem value="unity">

```cs
TapSDK.TDSTapDB.SetName("name");
```

  </TabItem>
</Tabs>


字段 | 可为空 | 说明
| ------ | ------ | ------ |
name | 否 | 长度大于0并小于等于256。用户名

## 5. 用户等级
设置用户等级。用户登录或升级时调用  

#### API  
<Tabs
groupId="tap-platform"
  defaultValue="Android"
  values={[
    {label: 'Android', value: 'android'},
    {label: 'iOS', value: 'ios'},
    {label: 'unity', value: 'unity'},
  ]}>
  <TabItem value="android">

  ```java
  public static void setLevel(int level)
  ```
  </TabItem>

  <TabItem value="ios">

  ```objectivec
+ (void)setLevel:(NSInteger)level;
  ```
  </TabItem>
  <TabItem value="unity">

```cs
public static void SetLevel(int level);
```

  </TabItem>
</Tabs>

#### 示例代码
<Tabs
groupId="tap-platform"
  defaultValue="Android"
  values={[
    {label: 'Android', value: 'android'},
    {label: 'iOS', value: 'ios'},
    {label: 'unity', value: 'unity'},
  ]}>
  <TabItem value="android">

  ```java
  TapDB.setLevel(5);
  ```
  </TabItem>

  <TabItem value="ios">

  ```objectivec
[TapDB setLevel:10];
  ```
  </TabItem>
  <TabItem value="unity">

```cs
TapSDK.TDSTapDB.SetLevel(5);
```

  </TabItem>
</Tabs>


字段 | 可为空 | 说明
| ------ | ------ | ------ |
level | 否 | 大于等于0。用户等级

## 6. 用户所在服务器

设置用户所在服务器。用户登陆或切换服务器时调用

#### API   
<Tabs
groupId="tap-platform"
  defaultValue="Android"
  values={[
    {label: 'Android', value: 'android'},
    {label: 'iOS', value: 'ios'},
    {label: 'unity', value: 'unity'},
  ]}>
  <TabItem value="android">

  ```java
  public static void setServer(String server)
  ```
  </TabItem>

  <TabItem value="ios">

  ```objectivec
+ (void)setServer:(NSString *)server;
  ```
  </TabItem>
  <TabItem value="unity">

```cs
public static void SetServer(string server);
```

  </TabItem>
</Tabs>

#### 示例代码
<Tabs
groupId="tap-platform"
  defaultValue="Android"
  values={[
    {label: 'Android', value: 'android'},
    {label: 'iOS', value: 'ios'},
    {label: 'unity', value: 'unity'},
  ]}>
  <TabItem value="android">

  ```java
  TapDB.setServer("https://test.taptap.com/callback");
  ```
  </TabItem>

  <TabItem value="ios">

  ```objectivec
[TapDB setServer:@"https://test.taptap.com/callback"];
  ```
  </TabItem>
  <TabItem value="unity">

```cs
TapSDK.TDSTapDB.SetServer("https://test.taptap.com/callback");
```

  </TabItem>
</Tabs>


字段 | 可为空 | 说明
| ------ | ------ | ------ |
server | 否 | 用户所在服务器。长度大于0并小于等于256。

## 7. 充值

### 客户端充值推送

充值成功时调用。SDK推送和[服务端充值推送](#101-充值推送接口)只能选择其中一种。建议优先选择服务端推送方式，以保证数据的准确性。

#### API  
<Tabs
groupId="tap-platform"
  defaultValue="Android"
  values={[
    {label: 'Android', value: 'android'},
    {label: 'iOS', value: 'ios'},
    {label: 'unity', value: 'unity'},
  ]}>
  <TabItem value="android">

  ```java
  public static void onCharge(String orderId, String product, long amount, String currencyType, String payment)
  ```
  </TabItem>

  <TabItem value="ios">

  ```objectivec
+ (void)onChargeSuccess:(NSString *)orderId product:(NSString *)product amount:(NSInteger)amount currencyType:(NSString *)currencyType payment:(NSString *)payment;
  ```
  </TabItem>
  <TabItem value="unity">

```cs
public static void OnCharge(string orderId, string productId, string amount, string currencyType, string payment)
```

  </TabItem>
</Tabs>

#### 示例代码
<Tabs
groupId="tap-platform"
  defaultValue="Android"
  values={[
    {label: 'Android', value: 'android'},
    {label: 'iOS', value: 'ios'},
    {label: 'unity', value: 'unity'},
  ]}>
  <TabItem value="android">

  ```java
  TapDB.onCharge("0xueiEns","轩辕剑","100","CNY","wechat");
  ```
  </TabItem>

  <TabItem value="ios">

  ```objectivec
[TapDB onChargeSuccess:@"0xueiEns" product:@"轩辕剑" amount:10 currencyType:@"CNY" payment:@"wechat"];
  ```
  </TabItem>
  <TabItem value="unity">

```cs
TapSDK.TDSTapDB.OnCharge("0xueiEns","大宝剑","100","CNY","wechat");
```

  </TabItem>
</Tabs>

**参数说明**

字段 | 可为空 | 说明
| ------ | ------ | ------ |
orderId | 是 | 订单ID。长度大于0并小于等于256。传递订单ID可进行排重，防止计算多次
product | 是 | 商品名称。长度大于0并小于等于256。
amount | 否 | 充值金额。大于0并小于等于100000000000。单位分，即无论什么币种，都需要乘以100
currencyType | 是 | 货币类型。国际通行三字母表示法，为空时默认CNY。参考：人民币 CNY，美元 USD；欧元 EUR
payment | 是 | 充值渠道。长度大于0并小于等于256。

常见货币类型的格式参考<a target="_blank" href="https://www.tapdb.com/docs/zh_CN/features/exchangeRate.html">汇率表</a>

### 服务端充值推送


由于SDK推送可能会不太准确，这里提供服务端充值推送方法。需要忽略掉SDK中的相关充值推送接口。

```
接口：https://e.tapdb.net/event
内容（注意后面还需要处理一下）：
{
    "module": "GameAnalysis", // 固定参数
    "ip": "8.8.8.8", // 可选。充值用户的IP
    "name": "charge", // 固定参数
    "index": "APPID", // 必需。注意APPID需要被替换成TapDB的appid
    "identify": "userId", // 必需。用户ID。必须和SDK的setUser接口传递的userId一样，并且该用户已经通过SDK接口进行过推送
    "properties": {
        "order_id": "100000", // 可选。长度大于0并小于等于256。订单ID。传递订单ID可进行排重，防止计算多次
        "amount": 100, // 必需。大于0并小于等于100000000000。充值金额。单位分，即无论什么币种，都需要乘以100
        "currency_type": "CNY", // 可选。货币类型。国际通行三字母表示法，为空时默认CNY。参考：人民币 CNY，美元 USD；欧元 EUR
        "product": "item1", // 可选。长度大于0并小于等于256。商品名称
        "payment": "alipay" // 可选。长度大于0并小于等于256。充值渠道
    }
}

假如游戏的appid为abcd1234。构建出json字符串后，去掉空格和换行符，然后再进行一次urlencode。再把结果作为POST数据推送
先替换换行符和空格，变成：
{"module":"GameAnalysis","name":"charge","index":"abcd1234","identify":"user_id","properties":{"order_id":"100000","amount":100,"virtual_currency_amount":100,"currency_type":"CNY","product":"item1","payment":"alipay"}}
然后urlencode，变成如下形式。某些版本的urlencode可能会把':'和','进行编码，不会影响实际使用。
%7B%22module%22:%22GameAnalysis%22,%22name%22:%22charge%22,%22index%22:%22abcd1234%22,%22identify%22:%22user_id%22,%22properties%22:%7B%22order_id%22:%22100000%22,%22amount%22:100,%22virtual_currency_amount%22:100,%22currency_type%22:%22CNY%22,%22product%22:%22item1%22,%22payment%22:%22alipay%22%7D%7D
```

成功判断：返回的HTTP Code为200时认为发送成功，否则认为失败

常见货币类型的格式参考<a target="_blank" href="https://www.tapdb.com/docs/zh_CN/features/exchangeRate.html">汇率表</a>


## 8. 自定义事件

推送自定义事件。需要在控制台预先进行配置。

#### API  
<Tabs
groupId="tap-platform"
  defaultValue="Android"
  values={[
    {label: 'Android', value: 'android'},
    {label: 'iOS', value: 'ios'},
    {label: 'unity', value: 'unity'},
  ]}>
  <TabItem value="android">

  ```java
  public static void onEvent(String eventCode, JSONObject properties)
  ```
  </TabItem>

  <TabItem value="ios">

  ```objectivec
+ (void)onEvent:(NSString *)eventCode properties:(NSDictionary *)properties;
  ```
  </TabItem>
  <TabItem value="unity">

```cs
public static void OnEvent(string eventCode, string properties)
```

  </TabItem>
</Tabs>

#### 示例代码
<Tabs
groupId="tap-platform"
  defaultValue="Android"
  values={[
    {label: 'Android', value: 'android'},
    {label: 'iOS', value: 'ios'},
    {label: 'unity', value: 'unity'},
  ]}>
  <TabItem value="android">

  ```java
  try {
      JSONObject object = new JSONObject("{\"param1\":\"param1\",\"param2\":\"param2\"}");
      TapDB.setLevel(4);TapDB.onEvent("1000",object);
  } catch (JSONException e) {
      e.printStackTrace();
  }
  ```
  </TabItem>

  <TabItem value="ios">

  ```objectivec
NSDictionary *dict = [NSDictionary dictionaryWithObjectsAndKeys:@"name",@"Tap zhang",@"age",@"18",nil];
[TapDB onEvent:@"userInfo" properties:dict];
  ```
  </TabItem>
  <TabItem value="unity">

```cs
TapSDK.TDSTapDB.OnEvent("1000","{\"param1\":\"param1\",\"param2\":\"param2\"}");
```

  </TabItem>
</Tabs>


字段 | 可为空 | 说明
| ------ | ------ | ------ |
eventCode | 否 | 在控制台中配置得到的事件编码
properties | 是 | 事件属性。需要和控制台的配置匹配。值需要是长度大于0并小于等于256的字符串或绝对值小于1E11的浮点数


## 9. 服务端在线人数推送

由于SDK无法推送准确的在线数据，这里提供服务端在线数据推送接口。游戏服务端可以每隔5分钟`自行统计`在线人数，通过接口推送到TapDB。TapDB进行数据汇总展现。

```
接口：https://se.tapdb.net/tapdb/online
方法：POST
格式：json
必需头信息：Content-Type: application/json
```

请求内容：

参数名 | 参数类型 | 参数说明
| ------ | ------ | ------ |
appid | string | 游戏的APP ID
onlines | array | 多条在线数据（最多100条）

其中onlines数组的结构为

参数名 | 参数类型 | 参数说明
| ------ | ------ | ------ |
server | string | 服务器。TapDB对同一服务器每一个自然5分钟仅接受一次数据
online | int | 在线人数
timestamp | long | 当前统计数据的时间戳(秒)。TapDB会按照自然5分钟进行数据对齐

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

## 10. 收集设备指纹
### OAID方式
自行选择是否引入OAID，TapSDK支持OAID版本为1.0.5-1.0.23
- 如果自己有集成其他SDK使用到OAID，TapSDK可以直接使用
- 如果没有集成其他OAID版本，我们推荐下载 [oaid_sdk_1.0.23.aar](/res/tap_oaid_sdk_1.0.23.aar)

### 数美SDK收集
  <Highlight color='#f00'> ⬇️ 数美定制版，仅支持当前下载渠道</Highlight>

[下载SDK](/res/tap_wl_pri_release.aar)