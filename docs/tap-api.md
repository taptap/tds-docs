---
id: tap-api
title: Tap-API
sidebar_label: Tap-API
---
## TdsSDK
### Init
初始化SDK

**API**  

```
init(TdsConfig config)
```

**示例代码**  

```
TdsConfig tdsConfig = new TdsConfig.Builder()
                .appContext(MainActivity.this)
                .clientId(Config.CID)
                .build();
TdsInitializer.init(tdsConfig);
```

**TdsConfig参数说明**  

参数 | 必选 | 备注
:--- | :--- | :---
clientId | Y | 开发者中心获取的client Id
appContext | Context | 当前Activity

### enableTapDB
**API**  

```
enableTapDB(TdsConfig config)
```
**示例代码**
```
TdsInitializer.enableTapDB("v1.0.0","channel");
```

**enableTapDB 参数说明：**   

字段 | 必须 | 说明  
------ | ------ | ------
channel | 否 | 长度大于0并小于等于256。分包渠道。1.2.名词解释中有介绍
gameVersion | 否 | 长度大于0并小于等于256。游戏版本。为空时，自动获取游戏安装包的版本（AndroidManifest.xml中的versionName）

### enableMoment

## LoginManager
### registerCallback
设置TapSDK的登录回调监听  

**API**  
```
registerCallback(CallBackManager var1, final TapTapLoginCallback<LoginResponse> var2);
````

**示例代码**  
```
callbackManager = CallBackManager.Factory.create();
LoginManager.getInstance().registerCallback(callbackManager, new TapTapLoginCallback<LoginResponse>() {
    @Override
    public void onSuccess(LoginResponse loginResponse) {
        Log.e(Tag, "Login-onSuccess");
        startGame();
    }

    @Override
    public void onCancel() {
        Log.e(Tag, "Login-onCancel");
    }

    @Override
    public void onError(Throwable throwable) {
        Log.e(Tag, "Login-onError: " + throwable.getMessage());
    }
});    
```


### logInWithReadPermissions
**API**
```
logInWithReadPermissions(Activity activity, String... var2)
````

**示例代码**
```
LoginManager.getInstance().logInWithReadPermissions(MainActivity.this, TapTapSdk.SCOPE_PUIBLIC_PROFILE);
```

**API说明**  

调用该接口会触发下列回调

类别 | 回调方法
--- | ---
登录成功 | void OnLoginSucceed(LoginResponse loginResponse)
登录失败 | void onError(Throwable throwable)
登录取消 | void onCancel()  

## TapDB
### setUser
当enableTapDB后，可以调用此API  

**API**
```
public static void setUser(String userId)
```

```
public static void setUser(String userId, String openId, LoginType loginType)
```

**示例代码**
```
TapDB.setUser("xxxxuser1","openId",LoginType.TapTap);
```
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

### openId获取方式
```
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

### setName
设置用户名称
**API**  
```
public static void setName(String name)
```
**示例代码**
```
TapDB.setName("taptap");
```

字段 | 可为空 | 说明
| ------ | ------ | ------ |
name | 否 | 长度大于0并小于等于256。用户名

### setLevel
设置用户等级。用户登录或升级时调用  
**API**  
```
public static void setLevel(int level)
```
**示例代码**
```
TapDB.setLevel(5);
```

字段 | 可为空 | 说明
| ------ | ------ | ------ |
level | 否 | 大于等于0。用户等级

### setServer

设置用户所在服务器。用户登陆或切换服务器时调用

**API**  
```
public static void setServer(String server)
```
**示例代码**
```
TapDB.setServer("https://test.taptap.com/callback");
```


字段 | 可为空 | 说明
| ------ | ------ | ------ |
server | 否 | 长度大于0并小于等于256。用户所在服务器

### onCharge

充值成功时调用。SDK推送和4.1中描述的服务端推送方法只能选择其中一种。建议优先选择服务端推送方式，以保证数据的准确性。

**API**  
```
public static void onCharge(String orderId, String product, long amount, String currencyType, String payment)
```
**示例代码**
```
TapDB.onCharge("0xueiEns","大宝剑","100","CNY","wechat");
```
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
```
public static void onEvent(String eventCode, JSONObject properties)
```
**示例代码**
```
try {
    JSONObject object = new JSONObject("{\"param1\":\"param1\",\"param2\":\"param2\"}");
    TapDB.setLevel(4);TapDB.onEvent("1000",object);
} catch (JSONException e) {
    e.printStackTrace();
}
```

字段 | 可为空 | 说明
| ------ | ------ | ------ |
eventCode | 否 | 在控制台中配置得到的事件编码
properties | 是 | 事件属性。需要和控制台的配置匹配。值需要是长度大于0并小于等于256的字符串或绝对值小于1E11的浮点数

### onResume&onStop

跟踪用户游戏次数和游戏时长。需要给游戏中每个Activity的onResume和onStop中添加对应的调用。如果多个Activity继承同一个父类，只需要在父类中添加调用即可。比如onResume方法，直接在Activity的onResume方法的最后添加TapDB.onResume(this)即可。
**API**  
```
public static void onResume(Activity activity)
public static void onStop(Activity activity)
```
**示例代码**
```
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

字段 | 可为空 | 说明
| ------ | ------ | ------ |
activity | 否 | 当前Activity对象。一般传递"this"


###
充值推送接口
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
