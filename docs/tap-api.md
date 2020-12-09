---
id: tap-api
title: Tap-API
sidebar_label: Tap-API
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


## TdsInitializer
TapSDK核心组建，负责SDK初始化和功能开启
### init
初始化SDK

**API**  
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
init(TdsConfig config);
```  
</TabItem>

<TabItem value="ios">

```objectivec
+ (void)initWithConfig:(TDSConfig *)config;
```
</TabItem>

<TabItem value="unity">

</TabItem>
</Tabs>



**示例代码**  
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
TdsConfig tdsConfig = new TdsConfig.Builder()
                .appContext(MainActivity.this)
                .clientId(Config.CID)
                .build();
TdsInitializer.init(tdsConfig);
```  

**TdsConfig参数说明**  

参数 | 可选 | 备注
:--- | :--- | :---
clientId | 否 | 开发者中心获取的client Id
appContext | 否 | 当前Activity

</TabItem>

<TabItem value="ios">

```objectivec
NSString *clientID = @"clientId";
TDSConfig *config = [[TDSConfig alloc]init];
config.clientId =clientID;
[TDSInitializer initWithConfig:config];
```

**TDSConfig参数说明**  

参数 | 可选 | 备注
:--- | :--- | :---
clientId | 否 | 开发者中心获取的client Id
</TabItem>

<TabItem value="unity">

</TabItem>
</Tabs>



### enableTapDB
**API**  
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
enableTapDB(TdsConfig config);
```
</TabItem>

<TabItem value="ios">

```objectivec
+ (void)enableTapDBWithChannel:(nullable NSString *)channel gameVersion:(nullable NSString *)gameVersion;
```
</TabItem>

<TabItem value="unity">

</TabItem>
</Tabs>


**示例代码**

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
TdsInitializer.enableTapDB("v1.0.0","channel");
```
</TabItem>

<TabItem value="ios">

```objectivec
[TDSInitializer enableTapDBWithChannel:@"channel" gameVersion:@"v1.0.0"];
```
</TabItem>

<TabItem value="unity">

</TabItem>
</Tabs>



**enableTapDB 参数说明：**   

字段 | 可选 | 说明  
------ | ------ | ------
channel | 是 | 长度大于0并小于等于256。分包渠道。1.2.名词解释中有介绍
gameVersion | 是 | 长度大于0并小于等于256。游戏版本。为空时，自动获取游戏安装包的版本（AndroidManifest.xml中的versionName）

### enableMoment
开启动态

**API**  
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
public static void enableMoment(Activity activity);
```
</TabItem>

<TabItem value="ios">

```objectivec
+ (void)enableMoment;
```
</TabItem>

<TabItem value="unity">

</TabItem>
</Tabs>


**示例代码**

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
TdsInitializer.enableMoment(MainActivity.this);
```
</TabItem>

<TabItem value="ios">

```objectivec
[TDSInitializer enableMoment];
```
</TabItem>

<TabItem value="unity">

</TabItem>
</Tabs>

## TapTapSdk
### changeTapLoginConfig
登录配置功能。LoginSdkConfig为可配置项，非必须  

**API:**
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
changeTapLoginConfig(TapTapSdk.LoginSdkConfig var0);
```
</TabItem>

<TabItem value="ios">

```objectivec
+ (void)enableMoment;
```
</TabItem>

<TabItem value="unity">

</TabItem>
</Tabs>



**示例代码**
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
TapTapSdk.LoginSdkConfig loginSdkConfig = new TapTapSdk.LoginSdkConfig();
//false：登录页面是直角，true：登录页面是圆角
loginSdkConfig.roundCorner = false;
//RegionType.IO标识为国际版，RegionType.CN为国内版
loginSdkConfig.regionType = RegionType.IO;
TapTapSdk.changeTapLoginConfig(loginSdkConfig);
```
</TabItem>

<TabItem value="ios">

```objectivec
[TDSMomentSdk closeMoment];
```
</TabItem>

<TabItem value="unity">

</TabItem>
</Tabs>



## TapLoginHelper
登录功能相关API控制
### setLoginResultCallback
设置TapSDK的登录回调监听  

**API**  
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
public void setLoginResultCallback(TapLoginHelper.ITapLoginResultCallback var1);
````
</TabItem>

<TabItem value="ios">

```objectivec
+ (void)registerLoginCallback:(TTSDKLoginManagerRequestHandler)callback;
```
</TabItem>

<TabItem value="unity">

</TabItem>
</Tabs>



**示例代码**
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
TapLoginHelper.getInstance().setLoginResultCallback(new TapLoginHelper.ITapLoginResultCallback() {
    @Override
    public void onLoginSuccess(AccessToken accessToken) {
        startGame();
    }

    @Override
    public void onLoginCancel() {

    }

    @Override
    public void onLoginError(Throwable throwable) {
        login();
    }
});  
```
</TabItem>

<TabItem value="ios">

```objectivec
[TapLoginHelper registerLoginCallback:^(TTSDKLoginResult *result, NSError *error) {
        if (error) {
            // 授权失败
            NSLog([error localizedDescription]);
        } else {
            if (result.isCancelled) {
                // 授权流程被取消
                NSLog(@"isCancelled");              
            } else {
                // 授权成功
                NSLog(@"success");
            }
        }
    }];
```
</TabItem>

<TabItem value="unity">

</TabItem>
</Tabs>




### startTapLogin
登录

**API**
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
public void startTapLogin(Activity activity, String... var2);
````
</TabItem>

<TabItem value="ios">

```objectivec
+ (void)startTapLogin:(NSArray *)permissions;
```

</TabItem>

<TabItem value="unity">

</TabItem>
</Tabs>



**示例代码**
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
 TapLoginHelper.getInstance().startTapLogin(MainActivity.this,TapTapSdk.SCOPE_PUIBLIC_PROFILE);
```
</TabItem>

<TabItem value="ios">

```objectivec
[TapLoginHelper startTapLogin:@[@"public_profile"]];
```

</TabItem>

<TabItem value="unity">

</TabItem>
</Tabs>



**API说明**  

调用该接口会触发[setloginresultcallback](#setloginresultcallback)回调

类别 | 回调方法
--- | ---
登录成功 | void OnLoginSucceed(LoginResponse loginResponse)
登录失败 | void onError(Throwable throwable)
登录取消 | void onCancel()  

### logout
登出

**API**
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
public static void logout();
````
</TabItem>

<TabItem value="ios">

```objectivec
+ (void)logout;
```

</TabItem>

<TabItem value="unity">

</TabItem>
</Tabs>



**示例代码**
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
TapLoginHelper.logout();
```
</TabItem>

<TabItem value="ios">

```objectivec
[[[TapLoginHelper alloc] init] logout];
```

</TabItem>

<TabItem value="unity">

</TabItem>
</Tabs>

### getCurrentAccessToken
获取用户登录信息

**API**
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
public static AccessToken getCurrentAccessToken();
````
</TabItem>

<TabItem value="ios">

```objectivec
+ (TTSDKAccessToken *)currentAccessToken;
```

</TabItem>

<TabItem value="unity">

</TabItem>
</Tabs>



**示例代码**
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
AccessToken accessToken =  TapLoginHelper.getCurrentAccessToken();
```
</TabItem>

<TabItem value="ios">

```objectivec
TTSDKAccessToken *currentAccessToken = [TapLoginHelper currentAccessToken];
```

</TabItem>

<TabItem value="unity">

</TabItem>
</Tabs>

### getCurrentProfile
return com.taptap.sdk.Profile;

**API**
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
public static Profile getCurrentProfile();
````
</TabItem>

<TabItem value="ios">

```objectivec
+ (TTSDKProfile *)currentProfile;
```

</TabItem>

<TabItem value="unity">

</TabItem>
</Tabs>



**示例代码**
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
Profile profile = TapLoginHelper.getCurrentProfile();
```
</TabItem>

<TabItem value="ios">

```objectivec
TTSDKProfile *currentProfile = [TapLoginHelper currentProfile];
```

</TabItem>

<TabItem value="unity">

</TabItem>
</Tabs>

### fetchProfileForCurrentAccessToken

**API**
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
public static void fetchProfileForCurrentAccessToken(Api.ApiCallback<Profile>);
````
</TabItem>

<TabItem value="ios">

```objectivec
+ (void)fetchProfileForCurrentAccessToken:(void (^)(TTSDKProfile *profile, NSError *error))callback;
```

</TabItem>

<TabItem value="unity">

</TabItem>
</Tabs>



**示例代码**
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
TapLoginHelper.getInstance().fetchProfileForCurrentAccessToken(new Api.ApiCallback<Profile>() {
            @Override
            public void onSuccess(Profile profile) {
                Log.e(Tag, "checkLogin-onSuccess");
                //TapDB会用到
                String openId = Profile.getCurrentProfile().getOpenid();
                startGame();
            }

            @Override
            public void onError(Throwable throwable) {
                login();
            }
        });
```
</TabItem>

<TabItem value="ios">

```objectivec
[TapLoginHelper fetchProfileForCurrentAccessToken:^(TTSDKProfile * _Nonnull profile, NSError * _Nonnull error) {
        //TapDB会用到openID
        NSString *openId = [profile openid];
    }];
```

</TabItem>

<TabItem value="unity">

</TabItem>
</Tabs>



## TapDB
### setUser
当enableTapDB后，可以调用此API  

**API**
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
public static void setUser(String userId);
public static void setUser(String userId, String openId, LoginType loginType);
```
</TabItem>

<TabItem value="ios">

```objectivec
+ (void)setUser:(NSString *)userId;
+ (void)setUser:(NSString *)userId openId:(NSString *)openId loginType:(TapDBLoginType)loginType;
```

</TabItem>

<TabItem value="unity">

</TabItem>
</Tabs>



**示例代码**
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
TapDB.setUser("xxxxuser1","openId",LoginType.TapTap);
```
</TabItem>

<TabItem value="ios">

```objectivec
[TapDB setUser:@"userId" openId:@"openId" loginType:TapDBLoginTypeTapTap];
```

</TabItem>

<TabItem value="unity">

</TabItem>
</Tabs>


**setUser参数说明**

字段 | 可为空 | 说明
| ------ | ------ | ------ |
userId | 否 | 长度大于0并小于等于256。只能包含数字、大小写字母、下划线(_)、横线(-)，用户ID。不同用户需要保证ID的唯一性
openId | 否 | 通过第三方登录获取到的openId
loginType | 否 | 第三方登录枚举类型，具体见下面说明

**loginType类型说明**

| 参数      |    说明   |
| :-------- | :-------- |
| TapTap      |    TapTap登录   |
| WeiXin      |    微信登录   |
| QQ      |    QQ登录   |
| Tourist      |    游客登录   |
| Apple      |    Apple登录   |
| Alipay      |    支付宝登录 |
| Facebook      |    facebook登录   |
| Google      |    Google登录   |
| Twitter      |    Twitter登录   |
| PhoneNumber      |    手机号登录   |
| Custom      |   用户自定义登录类型  （默认名字为Custom,如需修改可以调用LoginType.Custom.changeType） |

### Tap登录后openId获取方式
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

</TabItem>
</Tabs>



### setName
设置用户名称
**API**  
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
public static void setName(String name);
```
</TabItem>

<TabItem value="ios">

```objectivec
+ (void)setName:(NSString *)name;
```

</TabItem>

<TabItem value="unity">

</TabItem>
</Tabs>


**示例代码**
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

</TabItem>
</Tabs>


字段 | 可为空 | 说明
| ------ | ------ | ------ |
name | 否 | 长度大于0并小于等于256。用户名

### setLevel
设置用户等级。用户登录或升级时调用  
**API**  
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
public static void setLevel(int level);
```
</TabItem>

<TabItem value="ios">

```objectivec
+ (void)setLevel:(NSInteger)level;
```

</TabItem>

<TabItem value="unity">

</TabItem>
</Tabs>


**示例代码**
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

</TabItem>
</Tabs>



字段 | 可为空 | 说明
| ------ | ------ | ------ |
level | 否 | 大于等于0。用户等级

### setServer

设置用户所在服务器。用户登陆或切换服务器时调用

**API**  
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
public static void setServer(String server);
```
</TabItem>

<TabItem value="ios">

```objectivec
+ (void)setServer:(NSString *)server;
```

</TabItem>

<TabItem value="unity">

</TabItem>
</Tabs>


**示例代码**
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

</TabItem>
</Tabs>




字段 | 可为空 | 说明
| ------ | ------ | ------ |
server | 否 | 长度大于0并小于等于256。用户所在服务器

### onCharge

充值成功时调用。SDK推送和4.1中描述的服务端推送方法只能选择其中一种。建议优先选择服务端推送方式，以保证数据的准确性。

**API**  
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
public static void onCharge(String orderId, String product, long amount, String currencyType, String payment);
```  
</TabItem>

<TabItem value="ios">

```objectivec
+ (void)onChargeSuccess:(NSString *)orderId product:(NSString *)product amount:(NSInteger)amount currencyType:(NSString *)currencyType payment:(NSString *)payment;
```

</TabItem>

<TabItem value="unity">

</TabItem>
</Tabs>


**示例代码**
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
TapDB.onCharge("0xueiEns","大宝剑","100","CNY","wechat");
```
</TabItem>

<TabItem value="ios">

```objectivec
[TapDB onChargeSuccess:@"0xueiEns" product:@"轩辕剑" amount:10 currencyType:@"CNY" payment:@"wechat"];
```

</TabItem>

<TabItem value="unity">

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

### onEvent

推送自定义事件。需要在控制台预先进行配置。

**API**  
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
public static void onEvent(String eventCode, JSONObject properties);
```
</TabItem>

<TabItem value="ios">

```objectivec
+ (void)onEvent:(NSString *)eventCode properties:(NSDictionary *)properties;
```

</TabItem>

<TabItem value="unity">

</TabItem>
</Tabs>


**示例代码**
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

</TabItem>
</Tabs>



字段 | 可为空 | 说明
| ------ | ------ | ------ |
eventCode | 否 | 在控制台中配置得到的事件编码
properties | 是 | 事件属性。需要和控制台的配置匹配。值需要是长度大于0并小于等于256的字符串或绝对值小于1E11的浮点数

<!-- ### onResume&onStop

跟踪用户游戏次数和游戏时长。需要给游戏中每个Activity的onResume和onStop中添加对应的调用。如果多个Activity继承同一个父类，只需要在父类中添加调用即可。比如onResume方法，直接在Activity的onResume方法的最后添加TapDB.onResume(this)即可。  
**API**  
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
public static void onResume(Activity activity);
public static void onStop(Activity activity);
```
</TabItem>

<TabItem value="ios">

```objectivec

```

</TabItem>

<TabItem value="unity">

</TabItem>
</Tabs>


**示例代码**
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
public class GameActivity extends Activity {
    private GameView gameView;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_game);
    }

    @Override
    protected void onResume() {
        super.onResume();
        TapDB.onResume(GameActivity.this);
    }

    @Override
    protected void onPause() {
        super.onPause();
        TapDB.onStop(GameActivity.this);
    }
}
```
</TabItem>

<TabItem value="ios">

```objectivec

```

</TabItem>

<TabItem value="unity">

</TabItem>
</Tabs>



字段 | 可为空 | 说明
| ------ | ------ | ------ |
activity | 否 | 当前Activity对象。一般传递"this" -->

## TapTapMoment
### setCallback

设置动态发布回调  

**API**  
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
public static void setCallback(TapTapMomentSdk.TapMomentCallback tapMomentCallback);
```
</TabItem>

<TabItem value="ios">

```objectivec
- (void)didChangeResultCode:(NSInteger)code msg:(NSString *)msg;
```

</TabItem>

<TabItem value="unity">

</TabItem>
</Tabs>


**示例代码**
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
TapTapMomentSdk.setCallback(new TapTapMomentSdk.TapMomentCallback() {
  @Override
  public void onCallback(int code, String msg) {

  }
});
```
</TabItem>

<TabItem value="ios">

```objectivec
@interface ViewController () <TDSMomentDelegate>

@end

- (void)didChangeResultCode:(NSInteger)code msg:(NSString *)msg {
    NSLog (@"msg:%@, code:%i" ,msg, code);
}
```

</TabItem>

<TabItem value="unity">

</TabItem>
</Tabs>

### setLoginToken
设置登录信息

**API**  
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
public static void setLoginToken(AccessToken accessToken);
```
</TabItem>

<TabItem value="ios">

```objectivec
+ (void)setAccessToken:(TDSMomentAccessToken *)token;
```

</TabItem>

<TabItem value="unity">

</TabItem>
</Tabs>


**示例代码**
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
AccessToken currentAccessToken = AccessToken.getCurrentAccessToken();
TapTapMomentSdk.setLoginToken(currentAccessToken);
```
</TabItem>

<TabItem value="ios">

```objectivec
[TDSMomentSdk setAccessToken:[TDSMomentAccessToken build:[[TapLoginHelper currentAccessToken]toJsonString]]];
```

</TabItem>

<TabItem value="unity">

</TabItem>
</Tabs>


### openTapMoment
打开动态页面

**API**  
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
public static void openTapMoment(TapTapMomentSdk.Config config);
```
</TabItem>

<TabItem value="ios">

```objectivec
  + (void)openTapMomentWithConfig:(TDSMomentConfig *) config;
```

</TabItem>

<TabItem value="unity">

</TabItem>
</Tabs>


**示例代码**
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
TapTapMomentSdk.Config config = new TapTapMomentSdk.Config();
// config用来设置页面显示配置，包括显示方向等
TapTapMomentSdk.openTapMoment(config);
```
</TabItem>

<TabItem value="ios">

```objectivec
TDSMomentConfig *mconfig = [TDSMomentSdk init];
mconfig.orientation = TDSMomentOrientationDefault;
[TDSMomentSdk openTapMomentWithConfig:mconfig];
```

</TabItem>

<TabItem value="unity">

</TabItem>
</Tabs>

### publishMoment
发布动态

**API**  
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
//发布普通动态，包括图片和描述
public static void publishMoment(TapTapMomentSdk.Config config, String imgPaths, String content);
//发布视频动态，包括视频和图片（图片可选）
public static void publishVideoMoment(TapTapMomentSdk.Config config, String[] videoPaths,String[] imgPaths, String title, String content);
```
</TabItem>

<TabItem value="ios">

```objectivec
+ (void)openPostMomentPageWithContent:(TDSPostMomentData * _Nonnull)content
                               config:(TDSMomentConfig * _Nonnull)config;
```

</TabItem>

<TabItem value="unity">

</TabItem>
</Tabs>

**示例代码**
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
//普通动态
TapTapMomentSdk.Config config = new TapTapMomentSdk.Config();
config.orientation = TapTapMomentSdk.ORIENTATION_DEFAULT;  
String content = "普通动态描述";
String[] imagePaths = new String[] { "content://***.jpg","/sdcard/**.jpg" };
TapTapMomentSdk.publishMoment(config, imagePaths, content);

//视频动态
TapTapMomentSdk.Config config = new TapTapMomentSdk.Config();
String[] imagePaths = new String[]{ "content://***.jpg","/sdcard/**.jpg" };
String[] videoPaths = new String[] { "content://***.mp4", "content://***.mp4" };
String title = "title";
String content = "content";
TapTapMomentSdk.publishVideoMoment(config, videoPaths, imagePaths, title, content);
//如果不需要上传封面图片，可调用如下接口
//TapTapMomentSdk.publishVideoMoment(config, videoPaths, title, content);
```
</TabItem>

<TabItem value="ios">

```objectivec
//发布图片动态
TDSImageMomentData *imageMoment = [[TDSImageMomentData alloc] init];
imageMoment.images = @[@"file://..."];
imageMoment.content = @"我是发图片动态的内容";
TDSMomentConfig *config = [[TDSMomentConfig alloc] init];
config.orientation = TDSMomentOrientationDefault;
[TDSMomentSdk openPostMomentPageWithContent:imageMoment config:config];

//发布视频动态
TDSVideoMomentData *videoMoment = [[TDSVideoMomentData alloc] init];
videoMoment.images = @[@"file://..."];
videoMoment.videos = @[@"file://..."];
videoMoment.title = @"我是发送视频动态的标题";
videoMoment.content = @"我是发送视频动态的内容";
TDSMomentConfig *config = [[TDSMomentConfig alloc] init];
config.orientation = TDSMomentOrientationDefault;
[TDSMomentSdk openPostMomentPageWithContent:videoMoment config:config];
```

</TabItem>

<TabItem value="unity">

</TabItem>
</Tabs>

**参数说明**

字段 | 可为空 | 说明
| ------ | ------ | ------ |
config | 否 | 发布动态图片或者视频的横竖屏配置
videoPaths | 否 | 视频文件路径，数组形式呈现
imgPaths | 是 | 视频封面图，可以不配置
title | 否 | 动态标题
content | 是 | 动态描述

### getNoticeData
获取用户新通知数量   

**API**  
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
public static void getNoticeData();
```
</TabItem>

<TabItem value="ios">

```objectivec
+ (void)fetchNewMessage;
```
  结果在 `Delegate` 下的 `didChangeResultCode:msg:`, code == TM_RESULT_CODE_NEW_MSG_SUCCEED时，`msg` 即为消息数量
</TabItem>

<TabItem value="unity">

</TabItem>
</Tabs>


**示例代码**
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
TapTapMomentSdk.getNoticeData();
```
</TabItem>

<TabItem value="ios">

```objectivec
[TDSMomentSdk fetchNewMessage];
```

</TabItem>

<TabItem value="unity">

</TabItem>
</Tabs>

### openUserMoment
进入指定用户的动态页面

**API**  
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
public static void openUserMoment(TapTapMomentSdk.Config config, String openId)
```
</TabItem>

<TabItem value="ios">

```objectivec
+ (void)openUserCenterWithConfig:(TDSMomentConfig *)config userId:(NSString *)userId;
```

</TabItem>

<TabItem value="unity">

</TabItem>
</Tabs>

**示例代码**
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
TapTapMomentSdk.Config config = new TapTapMomentSdk.Config();
config.orientation = TapTapMomentSdk.ORIENTATION_DEFAULT;  
TapTapMomentSdk.openUserMoment(config, openId);
```
</TabItem>

<TabItem value="ios">

```objectivec
TDSMomentConfig *config = [[TDSMomentConfig alloc] init];
config.orientation = TDSMomentOrientationDefault;
[TDSMomentSdk openUserCenterWithConfig:config userId:@"userId"];
```

</TabItem>

<TabItem value="unity">

</TabItem>
</Tabs>

**参数说明**

字段 | 可为空 | 说明
| ------ | ------ | ------ |
openId | 否 | [openId获取方式](./tap-api.md/#tap登录后openid获取方式)


### closeMoment
关闭动态页面

**API**  
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
//直接关闭
public static void closeMoment();

//确认关闭
public static void closeMoment(String title, String content);
```
</TabItem>

<TabItem value="ios">

```objectivec
//直接关闭
+ (void)closeMoment;

//确认关闭
+ (void)closeMomentWithTitle:(NSString *)title content:(NSString *)content showConfirm:(BOOL)showConfirm;
```

</TabItem>

<TabItem value="unity">

</TabItem>
</Tabs>


**示例代码**
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
//直接关闭
TapTapMomentSdk.closeMoment();

//确认关闭
TapTapMomentSdk.closeMoment(title, content);
```

**参数说明**

字段 | 可为空 | 说明
| ------ | ------ | ------ |
title | 否 | 动态标题
content | 否 | 动态描述
</TabItem>

<TabItem value="ios">

```objectivec
//直接关闭
[TDSMomentSdk closeMoment];

//确认关闭
[TDSMomentSdk closeMomentWithTitle:@"title" content:@"content" showConfirm:true];
```
**参数说明**

字段 | 可为空 | 说明
| ------ | ------ | ------ |
title | 否 | 动态标题
content | 否 | 动态描述
showConfirm | 否 | 是否显示确认弹窗
</TabItem>

<TabItem value="unity">

</TabItem>
</Tabs>
