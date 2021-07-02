---
title: Cocos2d-x SDK文档
---

## 1.简介

### 1.1.适用范围

封装了TapDB的SDK，适用于 Cocos2d-x 开发的游戏，同时支持 iOS 和 Android 平台。

### 1.2.名词解释

名词 | 含义
- | -
玩家 | 对应一个玩家账户，需要一个唯一的标识符。玩家是统计系统的数据统计基本单位
设备 | 安装了对应游戏的设备
付费 | 玩家使用真实货币换取游戏虚拟币或游戏道具
分包渠道 | 标识游戏安装包渠道来源，需要在代码中设置

## 2.接入方式

### 2.1.申请应用

在TapDB控制台中注册一个游戏，获得游戏对应的APP ID，这是一个16位的字符串，iOS和Android可共用一个APP ID。

### 2.2.向工程中导入SDK

在TapDB网站上下载最新的SDK，其中包含一个 TapDB_sdk.zip 文件，解压得到3个文件夹，include文件夹里面是头文件，iOS和Android文件夹里面是对应平台的实现代码和库文件。另外，在Android.mk里面添加对TapDB.cpp的引用。

### 2.3.添加Android支持库

添加Android v4支持库到项目中，Android v4支持库的版本必须不低于23.0.0，否则可能导致闪退。

如果使用gradle依赖安装版本高于24.2.0版本的v4支持库，可以仅安装support-compat模块，参见文档： 
<https://developer.android.com/topic/libraries/support-library/setup.html>

<https://developer.android.com/topic/libraries/support-library/features.html>

如果不方便使用gradle进行自动化依赖安装，之前也没有使用到v4支持库，可以使用此处提供的support-compat模块的jar文件:
[android-support-v4.jar](https://static.tapdb.net/web/res/file/upload/2017/0926/android-support-v4.jar)

### 2.4.Android添加需要的权限

需要为工程中的AndroidManifest.xml添加下列权限

权限 | 是否必须 | 用途
- | - | -
android.permission.INTERNET | 必选 | 使用网络的权限
android.permission.ACCESS_NETWORK_STATE | 必选 | 获取手机网络连接状态
android.permission.WRITE_EXTERNAL_STORAGE | 可选 | 使用SD卡辅助存储设备标识等信息，若不具备此权限，有一部分设备无法进行很好的设备跟踪

### 2.5.iOS引入依赖的框架

需要为Xcode工程引入下列依赖的框架或库

框架或库 | 用途
- | -
AdSupport.framework | 用来获取设备广告标识，跟踪设备
Security.framework | 用来进行更好的持久化存储

### 2.6.调用统计接口

在需要调用统计接口的代码中引入TapDB.h，并按照后面的接口介绍调用统计接口。

## 3.接口说明

TapDB.h包含了类TapDB，还定义了TGTUserType/TGTUserSex两个枚举类型。TapDB包含的都是静态方法，直接用类名调用即可。TGTUserType表示玩家类型，TGTUserSex表示玩家性别。

### 3.1.初始化

初始化统计系统SDK，调用这个接口是使用其它接口的先决条件，需要尽早调用。init 方法会初始化 SDK，在此之前不可以调用 SDK 的其他方法。

Android需要引入libTyrantdbGameTracker.jar，并且在主 Activity 的 onCreate() 中调用 TyrantdbGameTracker.init(Activity activity, String appId, String channelId, String version, bool requestPermission)，最后一个参数固定传递false。

```java
public static void onStart(string appId, string channel, string version)
```

字段 | 可为空 | 说明
- | - | -
appId | 否 | 注册游戏时获得的APP ID
channel | 是 | 分包渠道，1.2.名词解释中有介绍
version | 是 | 游戏版本，为空时，自动获取游戏安装包的版本

### 3.2.跟踪游戏的启停（只适用于Android）

跟踪玩家游戏次数和游戏时长。需要给游戏中每个Activity的onResume和onStop中添加对应的调用。如：在MainActivity里面调用TyrantdbGameTracker.onStop (this);即可。

```java
public static void onResume(Context ctx)
public static void onStop(Context ctx)
```

### 3.3.记录一个玩家

记录一个玩家（注意是平台用户，不是游戏角色），当玩家登陆时调用，如果是试玩用户，userId由游戏自己生成，但需要保证唯一性。

```java
public static void setUser(const char *userId, TGTUserType userType, TGTUserSex userSex,
 int userAge, const char *userName)
```

字段 | 可为空 | 说明
- | - | -
userId | 否 | 玩家ID（注意是平台用户ID，不是游戏角色ID），不同玩家要是唯一的，不同用户平台可能存在相同的用户ID，需要想办法做区分
userType | 否 | 玩家类型，见类型详细定义
userSex | 否 | 玩家性别，见类型详细定义
userAge | 否 | 玩家年龄，无法获知玩家年龄直接传递0
userName | 是 | 玩家名称

### 3.4.玩家等级

设置玩家等级，玩家登陆时或升级时调用。

```java
public static void setLevel(int level)
```

字段 | 可为空 | 说明
- | - | -
level | 否 | 玩家等级

### 3.5.玩家区服

设置玩家区服，玩家登陆时或更换区服时调用。

```cpp
public static void setServer(const char *server)
```

字段 | 可为空 | 说明
- | - | -
server | 否 | 玩家服务器

### 3.6.发起充值请求

<div style={{'fontSize': '18px','fontWeight': '500',position: 'relative'}}>
<p style={{position: 'absolute',top:'-50px',left:'150px'}}>(<span style={{color:'#080'}}>推荐使用服务端充值统计接口</span>)</p></div>

当玩家发起充值请求时调用。

<p>提醒：<span style={{color:'#FA6456'}}>由于客户端行为，不可避免会有投机者尝试破解充值；
如果没有通过服务器校验，一定会造成数据不准确，强烈建议使用服务器接口进行充值数据回调。</span>
(<a href="docs/zh_CN/sdk/cocos2d-x.html#aea457feb3d22f612ac7505de9b800e5">4.1.充值统计接口</a>)</p>

```cpp
public static void onChargeRequest(const char *orderId, const char *product,
 long amount, const char * currencyType, long virtualCurrencyAmount, const char *payment)
```

字段 | 可为空 | 说明
- | - | -
orderId | 否 | 订单ID
product | 是 | 产品名称
amount | 否 | 充值金额（单位分，即无论什么币种，都需要乘以100）
currencyType | 是 | 货币类型，参考：人民币 CNY，美元 USD；欧元 EUR
virtualCurrencyAmount | 否 | 充值获得的虚拟币
payment | 是 | 支付方式，如：支付宝

### 3.7.充值成功

充值成功时调用，需要与充值请求成对调用

```cpp
public static void onChargeSuccess(const char *orderId)
```

字段 | 可为空 | 说明
- | - | -
orderId | 否 | 订单ID，与之前调用的充值请求传递的ID对应

### 3.8.充值失败

充值失败时调用，需要与充值请求成对调用

```cpp
public static void onChargeFail(const char *orderId, const char *reason)
```

字段 | 可为空 | 说明
- | - | -
orderId | 否 | 订单ID，与之前调用的充值请求传递的ID对应
reason | 是 | 失败原因

### 3.9.仅充值成功

当客户端无法跟踪充值请求发起，只能跟踪到充值成功的事件时，调用该接口记录充值信息

```cpp
public static void onChargeOnlySuccess(const char *orderId, const char *product,
long amount, const char *currencyType, long virtualCurrencyAmount, const char *payment)
```

字段 | 可为空 | 说明
- | - | -
orderId | 是 | 订单ID
product | 是 | 产品名称
amount | 否 | 充值金额（单位分，即无论什么币种，都需要乘以100）
currencyType | 是 | 货币类型，参考：人民币 CNY，美元 USD；欧元 EUR
virtualCurrencyAmount | 否 | 充值获得的虚拟币
payment | 是 | 支付方式，如：支付宝

## 4.服务端统计接口

### 4.1.充值统计接口

由于客户端接入充值统计可能会不太准确，这里提供服务端充值统计方法，需要忽略掉SDK中的相关充值统计接口

```
接口：https://e.tapdb.net/event
```
内容（注意后面还需要处理一下）：
```js
{
    "module": "GameAnalysis", //固定
    "ip": "8.8.8.8", //充值用户的IP，可选
    "name": "charge", //固定
    "index": "APPID", //APPID注意替换成TapDB的appid
    "identify": "user_id", //user_id，必须和客户端的setUser接口传递的user_id一样，并且该用户已经通过SDK接口进行过统计
    "properties": {
        "order_id": "100000", //order_id，可选，若传递此参数，需要保证order_id唯一，重复订单不计入统计
        "amount": 100, //充值金额（必须是整数，单位分，即无论什么币种，都需要乘以100），必传
        "virtual_currency_amount": 100, //获赠虚拟币数量，必传，可为0
        "currency_type": "CNY", //货币类型，可选，不传或者不是正确的货币类型，统一处理成人民币分
        "product": "item1", //充值包名称，可选
        "payment": "alipay" //充值途径，可选
    }
}
```
假如游戏的appid为abcd1234，构建出json字符串后，需要去掉空格和换行符，然后再进行一次urlencode，再把结果作为post数据发过来
先替换换行符和空格，变成：
>{"module":"GameAnalysis","name":"charge","index":"abcd1234","identify":"user_id","properties":{"order_id":"100000","amount":100,"virtual_currency_amount":100,"currency_type":"CNY","product":"item1","payment":"alipay"}}

然后urlencode，变成如下形式，某些版本的urlencode可能会把':'和','进行编码，不影响实际使用。

>%7B%22module%22:%22GameAnalysis%22,%22name%22:%22charge%22,%22index%22:%22abcd1234%22,%22identify%22:%22user_id%22,%22properties%22:%7B%22order_id%22:%22100000%22,%22amount%22:100,%22virtual_currency_amount%22:100,%22currency_type%22:%22CNY%22,%22product%22:%22item1%22,%22payment%22:%22alipay%22%7D%7D


货币类型的格式参考<a target="_blank" href="docs/zh_CN/features/exchangeRate.html">汇率表</a>

成功判断：返回的HTTP Code为200认为发送成功，否则认为失败

### 4.2.在线数据统计接口

由于SDK无法进行准确的在线数据统计，这里提供服务端在线数据统计接口。游戏服务端可以每隔5分钟自行统计在线人数，通过接口发送到TapDB，TapDB进行数据汇总和展现。

```
接口：https://se.tapdb.net/tapdb/online
方法：POST
格式：json
必须头信息：Content-Type: application/json
```

请求内容：

参数名 | 参数类型 | 参数说明
- | - | -
appid | string | TapDB的appid
onlines | array | 多条在线数据（最多100条）

其中onlines数组的结构为

参数名 | 参数类型 | 参数说明
- | - | -
server | string | 服务器，TapDB对同一服务器每一个自然5分钟仅接受一次数据
online | int | 在线人数
timestamp | long | 当前统计数据的时间戳(秒)，TapDB会按照自然5分钟进行数据对齐

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

成功判断：返回的HTTP Code为200认为发送成功，否则认为失败
