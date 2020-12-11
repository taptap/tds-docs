---
id: tap-api-unity
title: Tap-API-Unity
sidebar_label: Unity-API
---

## TDSLogin
### Init
初始化SDK

**API**

```c#
public static void Init(string clientId)

public static void Init(string clientId, bool isCN, bool isRoundCorner)
```


**示例代码**

```c#
TapSDK.TDSLogin.Init("clientId");

TapSDK.TDSLogin.Init("clientId", true,true);
```

| 字段        | 可为空 | 说明                                                           |
| --------- | --- | ------------------------------------------------------------ |
| clientId    | 否   | 开发者中心获取到的clientId |
| isCN    | 是   | true为国内，false为国外，默认true                                           |
| isRoundCorner | 是   | 登录框：true为圆角，false为直角，默认为true                     |

### StartLogin
开始登录

**API**

```c#
public static void StartLogin(string[] permissions)
```

**示例代码**

```c#
TapSDK.TDSLogin.StartLogin(new string[]{"public_profile"});
```


### RegisterLoginCallback
设置登录回调

**API**

```c#
public static void RegisterLoginCallback(LoginCallback callback)
```

**示例代码**

```c#
TapSDK.TDSLogin.RegisterLoginCallback(new MyLoginCallback());
public class MyLoginCallback : TapSDK.LoginCallback{
    public void LoginSuccess(TapSDK.TDSAccessToken accessToken){
            Debug.Log("Login success");
            SceneManager.LoadScene("StartScene");
    }

    public void LoginCancel(){
        Debug.Log("LoginCancel");
    }

    public void LoginError(string error){
        Debug.Log(error);
    }
}
```

### GetCurrentAccessToken
获取accessToken

**API**

```c#
public static void GetCurrentAccessToken(Action<TDSAccessToken> callback)
```

**示例代码**

```c#
TapSDK.TDSLogin.GetCurrentAccessToken((token)=>{
    Debug.Log(token.toJSON());
});
```

### GetCurrentProfile
获取登录信息

**API**

```c#
public static void GetCurrentProfile(Action<TDSLoginProfile> callback)
```

**示例代码**

```c#
TapSDK.TDSLogin.GetCurrentProfile((profile)=>{
    Debug.Log(profile.toJSON());
});
```

### Logout
登出

**API**

```c#
public static void Logout()
```

**示例代码**

```c#
TapSDK.TDSLogin.Logout();
```

### FetchProfileForCurrentAccessToken
获取accessToken
**API**

```c#
public static void FetchProfileForCurrentAccessToken(Action<TDSLoginProfile> callback, Action<string> errorCallback)
```

**示例代码**

```c#
TapSDK.TDSLogin.FetchProfileForCurrentAccessToken((profile)=>{          
    Debug.Log(profile.toJSON());
}, (error)=>{
     Debug.Log(error);
});
```

### ChangeConfig
修改登录配置

**API**

```c#
public static void ChangeConfig(bool isCN, bool isRoundCorner)
```

**示例代码**

```c#
TapSDK.TDSLogin.ChangeConfig(true,true);
```


## TDSTapDB
### Init
初始化TapDB

**API**

```c#
public static void Init(string clientId, string channel, string gameVersion)
```

**示例代码**

```c#
TapSDK.TDSTapDB.Init("clientID","channel","gameVersion");
```

### SetUser
设置用户

**API**

```c#
public static void SetUser(string userId)

public static void SetUser(string userId, string openId, string loginType)
```

**示例代码**

```c#
TapSDK.TDSTapDB.SetUser("userId");
TapSDK.TDSTapDB.SetUser("userId","openId","loginType");
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

### SetName
设置姓名

**API**

```c#
public static void SetName(string name);
```

**示例代码**

```c#
TapSDK.TDSTapDB.SetName("name");
```

### SetLevel
设置玩家等级

**API**

```c#
public static void SetLevel(int level);
```

**示例代码**

```c#
TapSDK.TDSTapDB.SetLevel(5);
```

### SetServer
设置服务器

**API**

```c#
public static void SetServer(string server);
```

**示例代码**

```c#
TapSDK.TDSTapDB.SetServer("https://test.taptap.com/callback");
```

### OnCharge
充值成功

**API**

```c#
public static void OnCharge(string orderId, string productId, string amount, string currencyType, string payment)
```

**示例代码**

```c#
TapSDK.TDSTapDB.OnCharge("0xueiEns","大宝剑","100","CNY","wechat");
```

**参数说明**

| 字段           | 可为空 | 说明                                                |
| ------------ | --- | ------------------------------------------------- |
| orderId      | 是   | 订单ID。长度大于0并小于等于256。传递订单ID可进行排重，防止计算多次             |
| product      | 是   | 商品名称。长度大于0并小于等于256。                               |
| amount       | 否   | 充值金额。大于0并小于等于100000000000。单位分，即无论什么币种，都需要乘以100    |
| currencyType | 是   | 货币类型。国际通行三字母表示法，为空时默认CNY。参考：人民币 CNY，美元 USD；欧元 EUR |
| payment      | 是   | 充值渠道。长度大于0并小于等于256。                               |

常见货币类型的格式参考<a target="_blank" href="https://www.tapdb.com/docs/zh_CN/features/exchangeRate.html">汇率表</a>

### OnEvent
自定义回调事件

**API**

```c#
public static void OnEvent(string eventCode, string properties)
```

**示例代码**

```c#
TapSDK.TDSTapDB.OnEvent("1000","{\"param1\":\"param1\",\"param2\":\"param2\"}");
```

**参数说明**
| 字段         | 可为空 | 说明                                                   |
| ---------- | --- | ---------------------------------------------------- |
| eventCode  | 否   | 在控制台中配置得到的事件编码                                       |
| properties | 是   | 事件属性。需要和控制台的配置匹配。值需要是长度大于0并小于等于256的字符串或绝对值小于1E11的浮点数 |


## TDSMoment

### InitSDK
初始化动态SDK

**API**

```c#
public static void InitSDK(string clientId);
```

**示例代码**

```c#
TapSDK.TDSMoment.InitSDK("clientId");
```

### SetCallback
设置动态回调

**API**

```c#
public static void SetCallback(Action<int, string> callback);
```

**示例代码**

```c#
TapSDK.TDSMoment.SetCallback((code,msg)=>{
    Debug.Log(code+"---"+msg);
});
```

### SetLoginToken
设置登录信息

**API**

```c#
public static void SetLoginToken(string accessToken);
```

**示例代码**

```c#
TapSDK.TDSLogin.GetCurrentAccessToken((token)=>{
    TapSDK.TDSMoment.SetLoginToken(token.toJSON());
});
```

### OpenMoment
打开动态页面

**API**

```c#
public static void OpenMoment(Orientation config);
```

**示例代码**

```c#
TapSDK.TDSMoment.OpenMoment(TapSDK.Orientation.ORIENTATION_LANDSCAPE);
```

| 字段     | 可为空 | 说明                                                   |
| ------ | --- | ---------------------------------------------------- |
| Orientation | 否   |ORIENTATION_LANDSCAPE:横屏，ORIENTATION_PORTRAIT:竖屏 |

### PublishMoment
发布普通动态

**API**

```c#
public static void PublishMoment(Orientation config, string[] imagePaths, string content);
```

**示例代码**

```c#
string content = "我是描述";
string[] images = {"imgpath01","imgpath02","imgpath03"};
TapSDK.TDSMoment.PublishMoment(TapSDK.Orientation.ORIENTATION_LANDSCAPE, images, content);
```

### PublishVideoMoment
发布视频动态

**API**

```c#
//带封面
public static void PublishVideoMoment(Orientation config, string[] videoPaths, string[] imagePaths, string title, string desc)

//不带封面
public static void PublishVideoMoment(Orientation config, string[] videoPaths, string title, string desc)
```

**示例代码**

```c#
//带封面
string[] images = {"imgpath01","imgpath02","imgpath03"};
string[] videos = {"videop01","videop02","videop03"};
string title = "我是动态";
string desc = "我是描述";
TapSDK.TDSMoment.PublishVideoMoment(TapSDK.Orientation.ORIENTATION_LANDSCAPE, videos,images,title,desc);

//不带封面
string[] images = {"imgpath01","imgpath02","imgpath03"};
string[] videos = {"videop01","videop02","videop03"};
string title = "我是动态";
string desc = "我是描述";
TapSDK.TDSMoment.PublishVideoMoment(TapSDK.Orientation.ORIENTATION_LANDSCAPE, videos,title,desc);
```

### GetNoticeData
获取用户新增通知

**API**

```c#
public static void GetNoticeData();
```

**示例代码**

```c#
TapSDK.TDSMoment.GetNoticeData();
```

### CloseMoment
关闭动态

**API**

```c#
//直接关闭
public static void CloseMoment()

//确认关闭
public static void CloseMoment(string title, string desc)
```

**示例代码**

```c#
//直接关闭
TapSDK.TDSMoment.CloseMoment();

//确认关闭
TapSDK.TDSMoment.CloseMoment(title, desc);
```

**参数说明**

| 字段      | 可为空 | 说明   |
| ------- | --- | ---- |
| title   | 否   | 动态标题 |
| desc | 否   | 动态描述 |

### SetGameScreenAutoRotate
设置游戏页面旋转角度

**API**

```c#
public static void SetGameScreenAutoRotate(Boolean auto)
```

**示例代码**

```c#
TapSDK.TDSMoment.SetGameScreenAutoRotate(true);
```
