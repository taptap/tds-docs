---
id: tap-api-ios
title: Tap-API-iOS
sidebar_label: iOS-API
---
## TDSInitializer

TapSDK核心组建，负责SDK初始化和功能开启

### initWithConfig

初始化SDK

**API**  

```objectivec
+ (void)initWithConfig:(TDSConfig *)config;
```

**示例代码**  

```objectivec
NSString *clientID = @"clientId";
TDSConfig *config = [[TDSConfig alloc]init];
config.clientId =clientID;
[TDSInitializer initWithConfig:config];
```

**TDSConfig参数说明**  

| 参数       | 可选  | 备注                |
| :------- | :-- | :---------------- |
| clientId | 否   | 开发者中心获取的client Id |

### enableTapDBWithChannel

**API**  

```objectivec
+ (void)enableTapDBWithChannel:(nullable NSString *)channel gameVersion:(nullable NSString *)gameVersion;
```

**示例代码**

```objectivec
[TDSInitializer enableTapDBWithChannel:@"channel" gameVersion:@"v1.0.0"];
```

**enableTapDB 参数说明：**   

| 字段          | 可选  | 说明                                                                    |
| ----------- | --- | --------------------------------------------------------------------- |
| channel     | 是   | 长度大于0并小于等于256。分包渠道。1.2.名词解释中有介绍                                       |
| gameVersion | 是   | 长度大于0并小于等于256。游戏版本。为空时，自动获取游戏安装包的版本（AndroidManifest.xml中的versionName） |

### enableMoment

开启动态

**API**  

```objectivec
+ (void)enableMoment;
```

**示例代码**

```objectivec
[TDSInitializer enableMoment];
```


## TapLoginHelper

登录功能相关API控制

### registerLoginCallback

设置TapSDK的登录回调监听  

**API**  

```objectivec
+ (void)registerLoginCallback:(TTSDKLoginManagerRequestHandler)callback;
```

**示例代码**

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

### startTapLogin

登录

**API**

```objectivec
+ (void)startTapLogin:(NSArray *)permissions;
```

**示例代码**

```objectivec
[TapLoginHelper startTapLogin:@[@"public_profile"]];
```

**API说明**  

调用该接口会触发[registerLoginCallback](#registerLoginCallback)回调


### logout

登出

**API**

```objectivec
+ (void)logout;
```

**示例代码**

```objectivec
[[[TapLoginHelper alloc] init] logout];
```

### currentAccessToken

获取用户登录信息

**API**

```objectivec
+ (TTSDKAccessToken *)currentAccessToken;
```

**示例代码**

```objectivec
TTSDKAccessToken *currentAccessToken = [TapLoginHelper currentAccessToken];
```

### currentProfile

**API**

```objectivec
+ (TTSDKProfile *)currentProfile;
```

**示例代码**

```objectivec
TTSDKProfile *currentProfile = [TapLoginHelper currentProfile];
```

### fetchProfileForCurrentAccessToken

**API**

```objectivec
+ (void)fetchProfileForCurrentAccessToken:(void (^)(TTSDKProfile *profile, NSError *error))callback;
```

**示例代码**

```objectivec
[TapLoginHelper fetchProfileForCurrentAccessToken:^(TTSDKProfile * _Nonnull profile, NSError * _Nonnull error) {
        //TapDB会用到openID
        NSString *openId = [profile openid];
    }];
```

## TapDB

### setUser

当enableTapDB后，可以调用此API  

**API**

```objectivec
+ (void)setUser:(NSString *)userId;
+ (void)setUser:(NSString *)userId openId:(NSString *)openId loginType:(TapDBLoginType)loginType;
```

**示例代码**

```objectivec
[TapDB setUser:@"userId" openId:@"openId" loginType:TapDBLoginTypeTapTap];
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

```objectivec
TTSDKProfile *currentProfile = [TapLoginHelper currentProfile];
NSString *openId = [currentProfile openid];
```

### setName

设置用户名称
**API**  

```objectivec
+ (void)setName:(NSString *)name;
```

**示例代码**

```objectivec
 [TapDB setName:@"Tap zhang"];
```

| 字段   | 可为空 | 说明                |
| ---- | --- | ----------------- |
| name | 否   | 长度大于0并小于等于256。用户名 |

### setLevel

设置用户等级。用户登录或升级时调用  
**API**  

```objectivec
+ (void)setLevel:(NSInteger)level;
```

**示例代码**

```objectivec
[TapDB setLevel:10];
```

| 字段    | 可为空 | 说明         |
| ----- | --- | ---------- |
| level | 否   | 大于等于0。用户等级 |

### setServer

设置用户所在服务器。用户登陆或切换服务器时调用

**API**  

```objectivec
+ (void)setServer:(NSString *)server;
```

**示例代码**

```objectivec
[TapDB setServer:@"https://test.taptap.com/callback"];
```

| 字段     | 可为空 | 说明                    |
| ------ | --- | --------------------- |
| server | 否   | 长度大于0并小于等于256。用户所在服务器 |

### onChargeSuccess

充值成功时调用。SDK推送和4.1中描述的服务端推送方法只能选择其中一种。建议优先选择服务端推送方式，以保证数据的准确性。

**API**  

```objectivec
+ (void)onChargeSuccess:(NSString *)orderId product:(NSString *)product amount:(NSInteger)amount currencyType:(NSString *)currencyType payment:(NSString *)payment;
```

**示例代码**

```objectivec
[TapDB onChargeSuccess:@"0xueiEns" product:@"轩辕剑" amount:10 currencyType:@"CNY" payment:@"wechat"];
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

### onEvent

推送自定义事件。需要在控制台预先进行配置。

**API**  

```objectivec
+ (void)onEvent:(NSString *)eventCode properties:(NSDictionary *)properties;
```

**示例代码**

```objectivec
NSDictionary *dict = [NSDictionary dictionaryWithObjectsAndKeys:@"name",@"Tap zhang",@"age",@"18",nil];
[TapDB onEvent:@"userInfo" properties:dict];
```

| 字段         | 可为空 | 说明                                                   |
| ---------- | --- | ---------------------------------------------------- |
| eventCode  | 否   | 在控制台中配置得到的事件编码                                       |
| properties | 是   | 事件属性。需要和控制台的配置匹配。值需要是长度大于0并小于等于256的字符串或绝对值小于1E11的浮点数 |


## TDSMomentSdk

### didChangeResultCode

设置动态发布回调  

**API**  

```objectivec
- (void)didChangeResultCode:(NSInteger)code msg:(NSString *)msg;
```

**示例代码**

```objectivec
@interface ViewController () <TDSMomentDelegate>

@end

- (void)didChangeResultCode:(NSInteger)code msg:(NSString *)msg {
    NSLog (@"msg:%@, code:%i" ,msg, code);
}
```

### setAccessToken

设置登录信息

**API**  

```objectivec
+ (void)setAccessToken:(TDSMomentAccessToken *)token;
```

**示例代码**

```objectivec
[TDSMomentSdk setAccessToken:[TDSMomentAccessToken build:[[TapLoginHelper currentAccessToken]toJsonString]]];
```

### openTapMomentWithConfig

打开动态页面

**API**  

```objectivec
  + (void)openTapMomentWithConfig:(TDSMomentConfig *) config;
```

**示例代码**

```objectivec
TDSMomentConfig *mconfig = [TDSMomentSdk init];
mconfig.orientation = TDSMomentOrientationDefault;
[TDSMomentSdk openTapMomentWithConfig:mconfig];
```

### openPostMomentPageWithContent

发布动态

**API**  

```objectivec
+ (void)openPostMomentPageWithContent:(TDSPostMomentData * _Nonnull)content
                               config:(TDSMomentConfig * _Nonnull)config;
```

**示例代码**

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

**参数说明**

| 字段         | 可为空 | 说明               |
| ---------- | --- | ---------------- |
| config     | 否   | 发布动态图片或者视频的横竖屏配置 |
| videoPaths | 否   | 视频文件路径，数组形式呈现    |
| imgPaths   | 是   | 视频封面图，可以不配置      |
| title      | 否   | 动态标题             |
| content    | 是   | 动态描述             |

### fetchNewMessage

获取用户新通知数量   

**API**  

```objectivec
+ (void)fetchNewMessage;
```

  结果在 `Delegate` 下的 `didChangeResultCode:msg:`, code == TM_RESULT_CODE_NEW_MSG_SUCCEED时，`msg` 即为消息数量

**示例代码**

```objectivec
[TDSMomentSdk fetchNewMessage];
```

### openUserCenterWithConfig

进入指定用户的动态页面

**API**  

```objectivec
+ (void)openUserCenterWithConfig:(TDSMomentConfig *)config userId:(NSString *)userId;
```

**示例代码**

```objectivec
TDSMomentConfig *config = [[TDSMomentConfig alloc] init];
config.orientation = TDSMomentOrientationDefault;
[TDSMomentSdk openUserCenterWithConfig:config userId:@"userId"];
```

**参数说明**

| 字段     | 可为空 | 说明                                                   |
| ------ | --- | ---------------------------------------------------- |
| openId | 否   | [openId获取方式](./api/ios-tapdb.md/#tap登录后openid获取方式) |

### closeMoment

关闭动态页面

**API**  

```objectivec
//直接关闭
+ (void)closeMoment;

//确认关闭
+ (void)closeMomentWithTitle:(NSString *)title content:(NSString *)content showConfirm:(BOOL)showConfirm;
```

**示例代码**

```objectivec
//直接关闭
[TDSMomentSdk closeMoment];

//确认关闭
[TDSMomentSdk closeMomentWithTitle:@"title" content:@"content" showConfirm:true];
```

**参数说明**

| 字段          | 可为空 | 说明       |
| ----------- | --- | -------- |
| title       | 否   | 动态标题     |
| content     | 否   | 动态描述     |
| showConfirm | 否   | 是否显示确认弹窗 |

## 回调
| 字段          | code | 说明       |
| ----------- | --- | -------- |
| TM_RESULT_CODE_POST_SUCCEED       | 10000   | 动态发布成功     |
| TM_RESULT_CODE_POST_FAILED     | 10100   | 动态发布失败     |
| TM_RESULT_CODE_POST_CLOSED       | 10200   | 关闭动态发布页面     |
| TM_RESULT_CODE_NEW_MSG_SUCCEED | 20000   | 获取新消息成功 |
| TM_RESULT_CODE_NEW_MSG_FAILED | 20100   | 获取新消息失败 |
| TM_RESULT_CODE_MOMENT_PAGE_OPEBED | 30000   | 自己/好友动态页面打开 |
| TM_RESULT_CODE_MOMENT_PAGE_CLOSED | 30100   | 自己/好友动态页面关闭 |
| TM_RESULT_CODE_MOMENT_CLOSE_CANCELLED | 50000   | 取消关闭所有动态界面（弹框点击取消按钮） |
| TM_RESULT_CODE_MOMENT_CLOSE_CONFIRMED | 50100   | 确认关闭所有动态界面（弹框点击确认按钮） |
| TM_RESULT_CODE_MOMENT_LOGIN_SUCCEED | 60000   | 动态也没内嵌登录成功 |
