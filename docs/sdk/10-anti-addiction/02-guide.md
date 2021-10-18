---
id: guide
title: 实名认证和防沉迷开发指南
sidebar_label: 开发指南
---

import MultiLang from '@theme/MultiLang';

## SDK 配置

可以在 [下载页](/tap-download) 获得 SDK，引入防沉迷模块。

<MultiLang>

<>

Unity 模块是通过引入 iOS 和 Android 模块后增加桥接文件打包出的 `.unitypackage`，方便以 Unity 开发的游戏直接引入。其他引擎/平台的游戏可以通过 iOS/Android 原生的方式接入，详见 iOS/Android 接入文档。

Unity 接入：

- Unity 开发环境：2018.4.36f1
- 导入 `AntiAddictionForUnity.unitypackage`

支持版本：

- Android：最低支持 5.0
- iOS：最低支持 iOS 10.0

iOS 平台配置：

使用 Xcode 13.0 beta 5 编译，检查 Unity 输出的 Xcode 工程：

1. 请确保设置 `Xcode` - `General` - `Frameworks, Libraries, and Embedded Content` 中的 `AntiAddictionService.framework`  和 `AntiAddictionUI.framework` 为 `Do Not Embed`。
2. 如果编译报错找不到头文件或者模块，请确保 `Xcode`-`Build Settings` - `Framework Search Paths` 中的路径以保证 Xcode 正常编译。
3. 确保 Xcode 工程的 `Build Settings` 的 `Swift Compile Language/Swfit Language Version` 为 `Swift5`。
4. 添加依赖库 `libz.tbd` `libc++.tdb`
5. 开始代码接入
6. 将 `AntiAddiction-Unity/Assets/Plugins/iOS/Resource/AntiAdictionResources.bundle` 拷贝到游戏项目下 (如果 unity 项目没有正确导入 `AntiAddictionResources.bundle`)

</>
<>

最低支持 Android 5.0，编译环境为 Android Studio。

- 将 `AntiAddiction_3.3.0.aar` 拷贝到游戏目录下的 `src/main/libs` 目录中
- 将 `AntiAddictionUI_3.3.0.aar` 拷贝到游戏目录下的 `src/main/libs` 目录中
- 将 `gson-2.8.6.jar` 拷贝到游戏目录下的 `src/main/libs` 目录中

在游戏目录下 `build.gradle` 文件中添加代码

```groovy
repositories{flatDir{dirs 'src/main/libs'}}

dependencies {
    // ...
    implementation(name: "AntiAddiction_${AntiAddictionVersion}", ext: "aar")
    implementation(name: "AntiAddictionUI_${AntiAddictionVersion}", ext: "aar")
    implementation(name: "gson-2.8.6", ext: "jar")
    // ...
}
```

</>
<>

支持的 iOS 版本为最低为 iOS 10，SDK 编译环境为 Xcode 12。

iOS 防沉迷 SDK 结构：

- `AntiAddictionService` 防沉迷基础库，源码由 Swift 编写。
- `AntiAddictionUI` 带 UI 的防沉迷库，依赖 `AntiAddictionService`，源码由  Objective-C 编写。

添加防沉迷库文件：

- 添加 `AntiAddictionService.framework` 和 `AntiAddictionUI.framework` 静态库。注意添加时选择 Embed 方式为 **Do Not Embed**。

- 引用代码：

    ```objc
    // AntiAddictionService
    @import AntiAddictionService;
    // AntiAddictionUI
    #import <AntiAddictionUI/AntiAddiction.h>
    ```

添加系统依赖库：

请检查项目中是否已自动添加以下依赖项：

- `libc++.tdb`
- `libz.tdb`
    
若运行时遇到相关依赖库加载报错，可改为 Optional 尝试。

配置编译选项：

- 在 Build Setting 中的 Other Link Flag 中添加 `-ObjC`

- 在 Build Setting 中的 Always Embed Swift Standard Libraried 设置为 YES，即始终引入 Swift 标准库，避免 App 启动时报错「无法找到 Swift 标准库之类」。如果项目中找不到，可以建立一个空 Swift 文件，Xcode 会自动建立桥接关系。

- 在 Build Setting 中的 Swift Compiler - Language/Swift Language Version 选择 Swift 5。

</>

</MultiLang>

## 初始化

初始化防沉迷 UI 模块，配置启用的防沉迷功能，注册防沉迷的消息监听：

<MultiLang>
<>

```cs
string gameIdentifier = "游戏的 Client ID";
// 是否启用时长限制功能
bool useTimeLimit = true;
// 是否启用消费限制功能
bool usePaymentLimit = true;
AntiAddictionUIKit.Init(gameIdentifier, useTimeLimit, usePaymentLimit,
    (antiAddictionCallbackData) => {
        int code = antiAddictionCallbackData.code;
        MsgExtraParams extras = antiAddictionCallbackData.extras;
        // 根据 code 不同提示玩家不同信息，详见下面的说明
    },
    (exception) => {
        // 处理异常
    },
);
```

</>
<>

```java
// Android SDK 的各接口第一个参数是当前 Activity，以下不再说明
String gameIdentifier = "游戏的 Client ID";
AntiAddictionFunctionConfig config = new AntiAddictionFunctionConfig.Builder()
    .enablePaymentLimit(true) // 是否启用消费限制功能
    .enableOnLineTimeLimit(true) // 是否启用时长限制功能
    .build();
AntiAddictionUIKit.init(activity, gameIdentifier, config,
    new AntiAddictionUICallback() {
        @Override
        public void onCallback(int code, Map<String, Object> extras) {
            // 根据 code 不同提示玩家不同信息，详见下面的说明
        }       
    }
);
```

</>
<>

```objc
NSString *gameIdentifier = "游戏的 Client ID";
AntiAddictionConfiguration *config = [[AntiAddictionConfiguration alloc] init];
// 是否启用消费限制功能
BOOL config.useSdkPaymentLimit = YES;
// 是否启用时长限制功能
BOOL config.useSdkOnlineTimeLimit = YES;
[AntiAddiction initGameIdentifier:gameIdentifier antiAddictionConfig:config
antiAddictionCallbackDelegate:self
completionHandler:^(BOOL success) {
    if (success) {
        // 初始化成功
    }
}];

`antiAddictionCallbackDelegate` 参数中传入接受回调的对象，其中需实现如下回调：

```objc
- (void)antiAddictionCallbackWithCode:(AntiAddictionResultHandlerCode)code extra:(NSString *)extra {}
```


</>

</MultiLang>

代码示例中的 `gameIdentifier`，是游戏的 `Client ID`，可以在控制台查看（**开发者中心 > 你的游戏 > 游戏服务 > 应用配置**）。


回调类型：

| 回调类型                          | code | 触发逻辑                                                     | 附带信息                     |
| :-------------------------------- | :--- | :----------------------------------------------------------- | :------------------------- |
| `CALLBACK_CODE_LOGIN_SUCCESS`      | 500  | 玩家登录后判断当前玩家可以进行游戏                           | 有 |
| `CALLBACK_CODE_TIME_LIMIT`          | 1030 | 未成年玩家当前无法进行游戏                                         | 有 |
| `CALLBACK_CODE_OPEN_ALERT_TIP`      | 1095 | 未成年玩家登录成功、游戏剩余 15 分钟、剩余 1 分钟、已经到达非游戏时间时提示                                  | 有 |
| `CALLBACK_CODE_LOGOUT` | 1000 | 退出账号 | 无                         |
| `CALLBACK_CODE_REAL_NAME_STOP` | 9002 | 实名过程中点击了关闭实名窗 | 无 |          

附带信息：

Unity SDK 定义了 `MsgExtraParams` 类：

```cs
public class MsgExtraParams
{
    // 用户类型，详见后文「获取用户类型」一节
    public int userType = -1;
    // 提示类型：
    // "0"，启动提示（玩家成功进入游戏）
    // "1"，禁止游戏提示
    public string limit_tip_type = "";
    // 限制类型：
    // "0"，无限制（成年玩家）
    // "1"，有限制（未成年玩家）
    public string restrict_type = "";
    // 显示给玩家的提示内容
    public string description = "";
    // 显示给玩家的提示标题
    public string title = "";
    // 未成年玩家登录成功、游戏剩余时间将尽的提示信息
    public string remaining_time_str = "";
}
```

Andorid SDK 回调中的 `extras` 是一个 `Map<String, Object>`，其中的内容与 Unity SDK 类似。

iOS SDK 回调中的 `extras` 是字符串（`NSString`）。

## 防沉迷授权

传入玩家的唯一标识和 TapTap 的鉴权信息以便进行防沉迷授权。
这个接口会根据相应玩家在 TapTap 的实名信息判断玩家是否可以进行游戏。

<MultiLang>

```cs
// 当前只支持使用 TapTap 登录的游戏
bool useTapLogin = true;
string userIdentifier = "玩家的唯一标识";
string tapTapAccessToken = "TapTap 第三方登录的 access token";

AntiAddictionUIKit.Startup(useTapLogin, userIdentifier, tapTapAccessToken);
```

```java
// 当前只支持使用 TapTap 登录的游戏
boolean useTapLogin = true;
String userIdentifier = "玩家的唯一标识";
String tapTapAccessToken = "TapTap 第三方登录的 access token";
AntiAddictionUIKit.startup(activity, useTapLogin, userIdentifier, tapTapAccessToken);
```

```objc
// 当前只支持使用 TapTap 登录的游戏
BOOL useTapLogin = YES;
NSString *userIdentifier = "玩家的唯一标识";
NSString *tapTapAccessToken = "TapTap 第三方登录的 access token";
[AntiAddiction startUpUseTapLogin:useTapLogin
userIdentifier:userIdentifier tapAccesssToken:tapTapAccessToken];
```

</MultiLang>

初始化时传入的玩家唯一标识由游戏自己定义。
如果使用 TDS 内建账户系统，可以使用玩家的 `objectId`。

### 获取 TapTap Access Token

初始化时需要传入 TapTap 的 `access token`，以便从 TapTap 获取玩家的实名信息。

无论游戏使用[TDS 内建账户系统](/sdk/taptap-login/guide/start/#用-taptap-oauth-授权结果直接登录账户系统)，还是使用[单纯 TapTap 用户认证](/sdk/taptap-login/guide/tap-login/#taptap-登录并获取登录结果)的方式接入 TapTap 登录，在玩家已登录 TapTap 的情况下，都可以通过如下接口获取 TapTap 的 `access token`：

<MultiLang>

```cs
AccessToken accessToken = TapLogin.GetAccessToken();
string tapTapAccessToken = JsonUtility.ToJson(accessToken);
```

```java
AccessToken accessToken = TapLoginHelper.getCurrentAccessToken();
String tapTapAccessToken = accessToken.toJsonString();
```

```objc
TTSDKAccessToken *accessToken = [TapLoginHelper currentAccessToken];
NSString *tapTapAccessToken = [accessToken toJsonString];
```

</MultiLang>


## 登出

玩家在游戏内退出账号时调用，重置防沉迷状态。

<MultiLang>

```cs
AntiAddictionUIKit.Logout();
```

```java
AntiAddictionUIKit.logout();
```

```objc
[AntiAddiction logout];
```

</MultiLang>

## 获取玩家年龄段

调用该接口可获取玩家所处年龄段：

<MultiLang>

```cs
int ageRange = AntiAddictionUIKit.CurrentUserAgeLimit();
```

```java
int ageRange = AntiAddictionKit.currentUserAgeLimit();
```

```objc
NSInteger ageRange = [AntiAddiction getCurrentUserAgeLimit];
```

</MultiLang>

上例中的 `ageRange` 是一个整数，表示玩家所处年龄段的下限（最低年龄）。
特别地，`-1` 表示「未实名」。

| 类型数值 | 含义 |
| - | - |
| -1 | 未实名 |
| 0 | 0 到 7 岁 |
| 8 | 8 到 15 岁 |
| 16 | 16 到 17 岁 |
| 18 | 成年玩家 |

## 检查消费上限

根据年龄段的不同，未成年玩家的消费金额有不同的上限。
如果启用消费限制功能，开发者需要在未成年玩家消费前检查是否受限，并在成功消费后上报消费金额。

游戏在收到玩家的付费请求后，调用以下接口当前玩家的付费行为是否被限制：

<MultiLang>

```cs
long amount = 100;
AntiAddictionUIKit.CheckPayLimit(amount,
    (result) => {
        // status 为 1 时可以支付
        int status = result.status;
        if (status != 1) {
            // 限制消费提示标题
            string title = result.title;
            // 限制消费提示描述（例如法规说明）
            string description = result.description; 
        }
    },
    (exception) => {
        // 处理异常
    }
);
```

```java
long amount = 100;
AntiAddictionUIKit.checkPayLimit(activity, amount,
    new Callback<CheckPayResult>() {
        @Override
        public void onSuccess(CheckPayResult result) {
            // status 为 1 时可以支付
            if (result.status != 1) {
                // 限制消费提示标题
                String title = result.title;
                // 限制消费提示描述（例如法规说明）
                String description = result.description;
            }
        }
        
        @Override
        public void onError(Throwable throwable) {
            // 处理异常                     
        }
    }
);
```

```objc
NSInteger amount = 100;
[AntiAddiction checkPayLimit:amount
callBack:^(BOOL status, NSString * _Nonnull title, NSString * _Nonnull description) {
    if (status) {
        // 无限制
    } else {
        // title 限制消费提示标题
        // description 限制消费提示描述（例如法规说明）
    }
failureHandler:^(NSString * _Nonnull msg) {
    // 处理异常    
}];
```

</MultiLang>

消费金额的单位为分。

检查消费上限需要游戏事先上报未成年玩家的消费金额。
建议开发者在服务端上报，服务端上报方式参见 [相关 REST API 用法说明](#上报消费金额)。
开发者也可以调用 SDK 提供的接口，当未成年玩家消费成功后，在客户端上报消费金额，在客户端上报的可靠性低于在服务端上报，主要适用于无服务端的单机游戏。

<MultiLang>

```cs
long amount = 100;
AntiAddictionUIKit.SubmitPayResult(amount,
    () => {
        // 成功
    }, (exception) => {
        // 处理异常
    }
);
```

```java
long amount = 100;
AntiAddictionUIKit.paySuccess(amount,
    new Callback<SubmitPayResult>() {
        @Override
        public void onSuccess(SubmitPayResult result) {
            // 提交成功
        }

        @Override
        public void onError(Throwable throwable) {
            // 处理异常
        }
    }
);
```

```objc
NSInteger amount = 100;
[AntiAddiction reportConsumption:amount
callBack:^(BOOL success) {
    if (success) {
        // 提交成功
    }
}
failureHandler:^(NSString * _Nonnull msg) {
    // 处理异常       
}];
```

</MultiLang>

上报消费金额时，传入的消费金额的单位同样为分。

## 上报游戏时长

如果启用时长限制功能，需要上报游戏时长。

已登录的玩家，开始游戏时调用此接口，之后 SDK 会自动轮询上报游戏时长。

<MultiLang>

```cs
AntiAddictionUIKit.EnterGame();
```

```java
AntiAddictionUIKit.enterGame();
```

```objc
[AntiAddiction enterGame];
```

</MultiLang>

相应地，已登录的玩家，停止游戏时调用此接口，之后 SDK 停止轮询上报时长。

<MultiLang>

```cs
AntiAddictionUIKit.LeaveGame();
```

```java
AntiAddictionUIKit.leaveGame();
```

```objc
[AntiAddiction leaveGame];
```

</MultiLang>

## REST API

### 请求格式

REST API 请求的主体为 JSON 格式，HTTP header 的 `Content-Type` 需要设置为 `application/json`。

请求通过 `Authorization TOKEN` HTTP 头进行鉴权。
开发者需要在客户端通过 SDK 接口获取 `TOKEN` 后传给服务端，然后在服务端凭借此 `TOKEN` 调用防沉迷服务的 REST API。

API Base 为 `https://tds-tapsdk.cn.tapapis.com`.

**注意，参数错误、内部错误时响应的状态码均为 200。**

#### 获取鉴权 Token

<MultiLang>

```cs
string token = AntiAddictionUIKit.CurrentToken();
```

```java
String token = AntiAddictionUIKit.currentToken();
```

```objc
NSString *token = [AntiAddiction currentToken];
```

</MultiLang>

### 上报消费金额

接口：

```
POST /addict/api/v1/paymentsubmit
```

请求体：

```json
// 消费金额：100 分
{ amount: 100 }
```

上报成功时响应的状态码为 200，返回结果：

```json
{
    "success":true,
    "data":{"message":"上传金额成功"}
}
```

金额格式异常时返回 400 错误：

```json
{
    "success":false,
    "data":{
        "code":3,
        "error":"上传金额不正确",
        "error_description":"金额大于等于0并小于100_000_000_000","msg":"请输入正确的金额格式"
    }
}
```

### 检查玩家消费是否受限

接口：

```
POST /addict/api/v1/paymentcheck
```

请求体：

```json
// 消费金额：100 分
{ amount: 100 }
```

消费受限和不受限时响应的状态码都是 200：

```json
// 受限
{
    "success":true,
    "data":{
        "code":200,
        "status":false,
        "message":"限额提示",
        "title":"健康消费提示",
        "description":"允许充值根据国家相关规定，未满8周岁：不提供付费服务；8-16周岁以下：单笔付费不超过50元，每月累计不超过200元；16-18周岁以下：单笔付费不超过100元，每月累计不超过400元。"
    }
}

// 允许
{
    "success":true,
    "data":{
        "code":200,
        "status":true,
        "message":"限额提示",
        "title":"健康消费提示",
        "description":"允许充值根据国家相关规定，未满8周岁：不提供付费服务；8-16周岁以下：单笔付费不超过50元，每月累计不超过200元；16-18周岁以下：单笔付费不超过100元，每月累计不超过400元。"
    }
}
```

金额格式异常时返回 400 错误：

```json
{
    "success":false,
    "data":{
        "code":3,
        "error":"上传金额不正确",
        "error_description":"金额大于等于0并小于100_000_000_000","msg":"请输入正确的金额格式"
    }
}
```

实名认证失败（包括 Token 解析错误）时返回 401 错误：

```json
{
    "success":false,
    "data":{
        "code":16,
        "error":"实名认证失败",
        "error_description":"未实名用户不能进入游戏",
        "msg":"该账号没有通过实名认证"}
    }
}
```

### 检查玩家当前能否游戏

接口：

```
POST /addict/api/v1/playcheck
```

请求体：

```json
{}
```

无论能否游戏，已实名玩家的响应状态码均为 200：

```json
// 成年玩家
{
    "success":true,
    "data":{
        "code":200,
        "can_play":true,
        "message":"游戏时间不受限制",
        "remain_time":60,
        "cost_time":0,
        "restrict_type":0,
        "title":"健康游戏提示",
        "description":"当前为成年人账号"
    }
}

// 未成年玩家，当前可以游戏
{
    "success":true,
    "data":{
        "code":200,
        "can_play":true,
        "message":"游戏允许时间",
        "remain_time": {{remainTime}},
        "cost_time": {{costtime}},
        "restrict_type":1,
        "title":"健康游戏提示","description":"您当前为未成年账号，已被纳入防沉迷系统。根据国家相关规定，周五、周六、周日及法定节假日 20 点 - 21 点之外为健康保护时段。您今日游戏时间还剩余${remianTime}分钟，请注意适当休息。"
    }
}

// 未成年玩家，当前不可游戏
{
    "success":true,
    "data":{
        "code":200,
        "can_play":false,
        "message":"游戏时间耗尽",
        "remain_time": 0,
        "cost_time": 60,
        "restrict_type":1,
        "title":"健康游戏提示",
        "description":"您当前为未成年账号，已被纳入防沉迷系统。根据国家相关规定，周五、周六、周日及法定节假日 20 点 - 21 点之外为健康保护时段。当前时间段无法游玩，请合理安排时间。"
    }
}
```

实名认证失败（包括 Token 解析错误）时返回 401 错误：

```json
{
    "success":false,
    "data":{
        "code":16,
        "error":"实名认证失败",
        "error_description":"未实名用户不能进入游戏",
        "msg":"该账号没有通过实名认证"}
    }
}
```