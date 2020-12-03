---
id: tap-api
title: Tap-API
sidebar_label: Tap-API
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


## TdsInitializer
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
init(TdsConfig config)
```  
</TabItem>

<TabItem value="ios">

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
</TabItem>

<TabItem value="ios">

</TabItem>

<TabItem value="unity">

</TabItem>
</Tabs>

**TdsConfig参数说明**  

参数 | 必选 | 备注
:--- | :--- | :---
clientId | Y | 开发者中心获取的client Id
appContext | Context | 当前Activity

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
enableTapDB(TdsConfig config)
```
</TabItem>

<TabItem value="ios">

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

</TabItem>

<TabItem value="unity">

</TabItem>
</Tabs>



**enableTapDB 参数说明：**   

字段 | 必须 | 说明  
------ | ------ | ------
channel | 否 | 长度大于0并小于等于256。分包渠道。1.2.名词解释中有介绍
gameVersion | 否 | 长度大于0并小于等于256。游戏版本。为空时，自动获取游戏安装包的版本（AndroidManifest.xml中的versionName）

### enableMoment

## TapTapSdk
### changeTapLoginConfig
LoginSdkConfig为可配置项，非必须  
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
changeTapLoginConfig(TapTapSdk.LoginSdkConfig var0)
```
</TabItem>

<TabItem value="ios">

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

</TabItem>

<TabItem value="unity">

</TabItem>
</Tabs>



## TapLoginHelper

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
setLoginResultCallback(TapLoginHelper.ITapLoginResultCallback var1)
````
</TabItem>

<TabItem value="ios">

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

</TabItem>

<TabItem value="unity">

</TabItem>
</Tabs>




### startTapLogin
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
startTapLogin(Activity activity, String... var2)
````
</TabItem>

<TabItem value="ios">

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
logout()
````
</TabItem>

<TabItem value="ios">

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

</TabItem>

<TabItem value="unity">

</TabItem>
</Tabs>

### getCurrentAccessToken
return com.taptap.sdk.AccessToken;  

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
getCurrentAccessToken()
````
</TabItem>

<TabItem value="ios">

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
getCurrentProfile()
````
</TabItem>

<TabItem value="ios">

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
fetchProfileForCurrentAccessToken(Api.ApiCallback<Profile>)
````
</TabItem>

<TabItem value="ios">

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
public static void setUser(String userId)
public static void setUser(String userId, String openId, LoginType loginType)
```
</TabItem>

<TabItem value="ios">

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
public static void setName(String name)
```
</TabItem>

<TabItem value="ios">

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
public static void setLevel(int level)
```
</TabItem>

<TabItem value="ios">

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
public static void setServer(String server)
```
</TabItem>

<TabItem value="ios">

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
public static void onCharge(String orderId, String product, long amount, String currencyType, String payment)
```  
</TabItem>

<TabItem value="ios">

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

</TabItem>

<TabItem value="unity">

</TabItem>
</Tabs>


**参数说明**

字段 | 可为空 | 说明
| ------ | ------ | ------ |
orderId | 是 | 长度大于0并小于等于256。订单ID。传递订单ID可进行排重，防止计算多次
product | 是 | 长度大于0并小于等于256。商品名称
amount | 否 | 大于0并小于等于100000000000。充值金额。单位分，即无论什么币种，都需要乘以100
currencyType | 是 | 货币类型。国际通行三字母表示法，为空时默认CNY。参考：人民币 CNY，美元 USD；欧元 EUR
payment | 是 | 长度大于0并小于等于256。充值渠道

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
public static void onEvent(String eventCode, JSONObject properties)
```
</TabItem>

<TabItem value="ios">

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

</TabItem>

<TabItem value="unity">

</TabItem>
</Tabs>



字段 | 可为空 | 说明
| ------ | ------ | ------ |
eventCode | 否 | 在控制台中配置得到的事件编码
properties | 是 | 事件属性。需要和控制台的配置匹配。值需要是长度大于0并小于等于256的字符串或绝对值小于1E11的浮点数

### onResume&onStop

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
public static void onResume(Activity activity)
public static void onStop(Activity activity)
```
</TabItem>

<TabItem value="ios">

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

</TabItem>

<TabItem value="unity">

</TabItem>
</Tabs>



字段 | 可为空 | 说明
| ------ | ------ | ------ |
activity | 否 | 当前Activity对象。一般传递"this"
