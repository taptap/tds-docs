---
id: android-tapdb
title: TapDB
---
## method
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
| Custom      | 用户自定义登录类型  （默认名字为 Custom, 如需修改可以调用 LoginType.Custom.changeType） |

### Tap 登录后 openId 获取方式

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
TapDB.onCharge ("0xueiEns","大宝剑","100","CNY","wechat");
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
| properties | 是   | 事件属性。需要和控制台的配置匹配。值需要是长度大于 0 并小于等于 256 的字符串或绝对值小于 1E11 的浮点数 |

<!-- ### onResume&onStop

跟踪用户游戏次数和游戏时长。需要给游戏中每个 Activity 的 onResume 和 onStop 中添加对应的调用。如果多个 Activity 继承同一个父类，只需要在父类中添加调用即可。比如 onResume 方法，直接在 Activity 的 onResume 方法的最后添加 TapDB.onResume (this) 即可。  
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
