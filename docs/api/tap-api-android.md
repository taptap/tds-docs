---
id: tap-api-android
title: Tap-API-Android
sidebar_label: Android-API
---

## TdsInitializer

TapSDK核心组建，负责SDK初始化和功能开启

### init

初始化SDK

#### API  

```java
init(TdsConfig config);
```

#### 示例代码

```java
TdsConfig tdsConfig = new TdsConfig.Builder()
                .appContext(MainActivity.this)
                .clientId(Config.CID)
                .build();
TdsInitializer.init(tdsConfig);
```

**TdsConfig参数说明**  

| 参数         | 可选  | 备注                |
| :--------- | :-- | :---------------- |
| clientId   | 否   | 开发者中心获取的client Id |
| appContext | 否   | 当前Activity        |

### enableTapDB

#### API  

```java
enableTapDB(TdsConfig config);
```

#### 示例代码

```java
TdsInitializer.enableTapDB("v1.0.0","channel");
```

**enableTapDB 参数说明：**   

| 字段          | 可选  | 说明                                                                    |
| ----------- | --- | --------------------------------------------------------------------- |
| channel     | 是   | 长度大于0并小于等于256。分包渠道。1.2.名词解释中有介绍                                       |
| gameVersion | 是   | 长度大于0并小于等于256。游戏版本。为空时，自动获取游戏安装包的版本（AndroidManifest.xml中的versionName） |

### enableMoment

开启动态

#### API  

```java
public static void enableMoment(Activity activity);
```

#### 示例代码

```java
TdsInitializer.enableMoment(MainActivity.this);
```

## TapTapSdk

### changeTapLoginConfig

登录配置功能。LoginSdkConfig为可配置项，非必须  

**API:**

```java
changeTapLoginConfig(TapTapSdk.LoginSdkConfig var0);
```

#### 示例代码

```java
TapTapSdk.LoginSdkConfig loginSdkConfig = new TapTapSdk.LoginSdkConfig();
//false：登录页面是直角，true：登录页面是圆角
loginSdkConfig.roundCorner = false;
//RegionType.IO标识为国际版，RegionType.CN为国内版
loginSdkConfig.regionType = RegionType.IO;
TapTapSdk.changeTapLoginConfig(loginSdkConfig);
```

## TapLoginHelper

登录功能相关API控制

### setLoginResultCallback

设置TapSDK的登录回调监听  

#### API  

```java
public void setLoginResultCallback(TapLoginHelper.ITapLoginResultCallback var1);
```

#### 示例代码

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

### startTapLogin

登录

#### API

```java
public void startTapLogin(Activity activity, String... var2);
```

#### 示例代码

```java
 TapLoginHelper.getInstance().startTapLogin(MainActivity.this,TapTapSdk.SCOPE_PUIBLIC_PROFILE);
```

**API说明**  

调用该接口会触发[setloginresultcallback](#setloginresultcallback)回调

| 类别   | 回调方法                                             |
| ---- | ------------------------------------------------ |
| 登录成功 | void OnLoginSucceed(LoginResponse loginResponse) |
| 登录失败 | void onError(Throwable throwable)                |
| 登录取消 | void onCancel()                                  |

### logout

登出

#### API

```java
public static void logout();
```

#### 示例代码

```java
TapLoginHelper.logout();
```

### getCurrentAccessToken

获取用户登录信息

#### API

```java
public static AccessToken getCurrentAccessToken();
```

#### 示例代码

```java
AccessToken accessToken =  TapLoginHelper.getCurrentAccessToken();
```

### getCurrentProfile

return com.taptap.sdk.Profile;

#### API

```java
public static Profile getCurrentProfile();
```

#### 示例代码

```java
Profile profile = TapLoginHelper.getCurrentProfile();
```

### fetchProfileForCurrentAccessToken

#### API

```java
public static void fetchProfileForCurrentAccessToken(Api.ApiCallback<Profile>);
```

#### 示例代码

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

## TapDB

### setUser

当enableTapDB后，可以调用此API  

#### API

```java
public static void setUser(String userId);
public static void setUser(String userId, String openId, LoginType loginType);
```

#### 示例代码

```java
TapDB.setUser("xxxxuser1","openId",LoginType.TapTap);
```

**setUser参数说明**

| 字段        | 可为空 | 说明                                                           |
| --------- | --- | ------------------------------------------------------------ |
| userId    | 否   | 长度大于0并小于等于256。只能包含数字、大小写字母、下划线(\_)、横线(-)，用户ID。不同用户需要保证ID的唯一性 |
| openId    | 否   | 通过第三方登录获取到的openId                                            |
| loginType | 否   | 第三方登录枚举类型，具体见下面说明                                            |

**loginType类型说明**

| 参数          | 说明                                                           |
| :---------- | :----------------------------------------------------------- |
| TapTap      | TapTap登录                                                     |
| WeiXin      | 微信登录                                                         |
| QQ          | QQ登录                                                         |
| Tourist     | 游客登录                                                         |
| Apple       | Apple登录                                                      |
| Alipay      | 支付宝登录                                                        |
| Facebook    | facebook登录                                                   |
| Google      | Google登录                                                     |
| Twitter     | Twitter登录                                                    |
| PhoneNumber | 手机号登录                                                        |
| Custom      | 用户自定义登录类型  （默认名字为Custom,如需修改可以调用LoginType.Custom.changeType） |

### Tap登录后openId获取方式

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
| name | 否   | 长度大于0并小于等于256。用户名 |

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
| level | 否   | 大于等于0。用户等级 |

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
| server | 否   | 长度大于0并小于等于256。用户所在服务器 |

### onCharge

充值成功时调用。SDK推送和4.1中描述的服务端推送方法只能选择其中一种。建议优先选择服务端推送方式，以保证数据的准确性。

#### API  

```java
public static void onCharge(String orderId, String product, long amount, String currencyType, String payment);
```

#### 示例代码

```java
TapDB.onCharge("0xueiEns","大宝剑","100","CNY","wechat");
```

**参数说明**  

| 字段           | 可为空 | 说明                                                |
| ------------ | --- | ------------------------------------------------- |
| orderId      | 是   | 订单ID。长度大于0并小于等于256。传递订单ID可进行排重，防止计算多次             |
| product      | 是   | 商品名称。长度大于0并小于等于256。                               |
| amount       | 否   | 充值金额。大于0并小于等于100000000000。单位分，即无论什么币种，都需要乘以100    |
| currencyType | 是   | 货币类型。国际通行三字母表示法，为空时默认CNY。参考：人民币 CNY，美元 USD；欧元 EUR|
| payment      | 是   | 充值渠道。长度大于0并小于等于256。                               |

常见货币类型的格式参考<a target="_blank" href="https://www.tapdb.com/docs/zh_CN/features/exchangeRate.html">汇率表</a>

### onEvent

推送自定义事件。需要在控制台预先进行配置。

#### API  

```java
public static void onEvent(String eventCode, JSONObject properties);
```

#### 示例代码

```java
try {
    JSONObject object = new JSONObject("{\"param1\":\"param1\",\"param2\":\"param2\"}");
    TapDB.setLevel(4);TapDB.onEvent("1000",object);
} catch (JSONException e) {
    e.printStackTrace();
}
```

**参数说明**
| 字段         | 可为空 | 说明                                                   |
| ---------- | --- | ---------------------------------------------------- |
| eventCode  | 否   | 在控制台中配置得到的事件编码                                       |
| properties | 是   | 事件属性。需要和控制台的配置匹配。值需要是长度大于0并小于等于256的字符串或绝对值小于1E11的浮点数 |

<!-- ### onResume&onStop

跟踪用户游戏次数和游戏时长。需要给游戏中每个Activity的onResume和onStop中添加对应的调用。如果多个Activity继承同一个父类，只需要在父类中添加调用即可。比如onResume方法，直接在Activity的onResume方法的最后添加TapDB.onResume(this)即可。  
#### API  


```java
public static void onResume(Activity activity);
public static void onStop(Activity activity);
```


```objectivec

```




#### 示例代码


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


```objectivec

```





字段 | 可为空 | 说明
| ------ | ------ | ------ |
activity | 否 | 当前Activity对象。一般传递"this" -->

## TapTapMoment

### setCallback

设置动态发布回调  

#### API  

```java
public static void setCallback(TapTapMomentSdk.TapMomentCallback tapMomentCallback);
```

#### 示例代码

```java
TapTapMomentSdk.setCallback(new TapTapMomentSdk.TapMomentCallback() {
  @Override
  public void onCallback(int code, String msg) {

  }
});
```

### setLoginToken

设置登录信息

#### API  

```java
public static void setLoginToken(AccessToken accessToken);
```

#### 示例代码

```java
AccessToken currentAccessToken = AccessToken.getCurrentAccessToken();
TapTapMomentSdk.setLoginToken(currentAccessToken);
```

### openTapMoment

打开动态页面

#### API  

```java
public static void openTapMoment(TapTapMomentSdk.Config config);
```

#### 示例代码

```java
TapTapMomentSdk.Config config = new TapTapMomentSdk.Config();
// config用来设置页面显示配置，包括显示方向等
TapTapMomentSdk.openTapMoment(config);
```

### publishMoment

发布动态

#### API  

```java
//发布普通动态，包括图片和描述
public static void publishMoment(TapTapMomentSdk.Config config, String imgPaths, String content);
//发布视频动态，包括视频和图片（图片可选）
public static void publishVideoMoment(TapTapMomentSdk.Config config, String[] videoPaths,String[] imgPaths, String title, String content);
```

#### 示例代码

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

**参数说明**

| 字段         | 可为空 | 说明               |
| ---------- | --- | ---------------- |
| config     | 否   | 发布动态图片或者视频的横竖屏配置 |
| videoPaths | 否   | 视频文件路径，数组形式呈现    |
| imgPaths   | 是   | 视频封面图，可以不配置      |
| title      | 否   | 动态标题             |
| content    | 是   | 动态描述             |

### getNoticeData

获取用户新通知数量   

#### API  

```java
public static void getNoticeData();
```

#### 示例代码

```java
TapTapMomentSdk.getNoticeData();
```

### openUserMoment

进入指定用户的动态页面

#### API  

```java
public static void openUserMoment(TapTapMomentSdk.Config config, String openId)
```

#### 示例代码

```java
TapTapMomentSdk.Config config = new TapTapMomentSdk.Config();
config.orientation = TapTapMomentSdk.ORIENTATION_DEFAULT;  
TapTapMomentSdk.openUserMoment(config, openId);
```

**参数说明**

| 字段     | 可为空 | 说明                                                   |
| ------ | --- | ---------------------------------------------------- |
| openId | 否   | [openId获取方式](./api/android-tapdb.md/#tap登录后openid获取方式) |

### closeMoment

关闭动态页面

#### API  

```java
//直接关闭
public static void closeMoment();

//确认关闭
public static void closeMoment(String title, String content);
```

#### 示例代码

```java
//直接关闭
TapTapMomentSdk.closeMoment();

//确认关闭
TapTapMomentSdk.closeMoment(title, content);
```

**参数说明**

| 字段      | 可为空 | 说明   |
| ------- | --- | ---- |
| title   | 否   | 动态标题 |
| content | 否   | 动态描述 |
