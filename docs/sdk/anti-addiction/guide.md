---
title: 实名认证和防沉迷开发指南
sidebar_label: 开发指南
sidebar_position: 2
---

import MultiLang from '/src/docComponents/MultiLang';
import CodeBlock from '@theme/CodeBlock';
import sdkVersions from '/src/docComponents/sdkVersions';

:::info
使用 TDS 实名认证和防沉迷服务之前，需要完成[中宣部实名认证系统的注册和接口测试](/sdk/anti-addiction/features/#准备工作)工作，并在 TapTap 开发者中心后台完成[参数配置](/sdk/anti-addiction/features/#完成开发者中心配置)。
:::

:::tip
推荐阅读博客：[实名认证和防沉迷功能接入](https://blog.taptap.dev/posts/tapsdk-tap-antiaddiction-practice)，加深对实名认证和防沉迷功能的理解。
:::

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

最低支持 Android 5.0（API level 21），编译环境为 Android Studio。

<ul>
<li>将 <code>AntiAddiction_{sdkVersions.taptap.anti_addiction}.aar</code> 拷贝到游戏目录下的 <code>src/main/libs</code> 目录中</li>
<li>将 <code>AntiAddictionUI_{sdkVersions.taptap.anti_addiction}.aar</code> 拷贝到游戏目录下的 <code>src/main/libs</code> 目录中</li>
</ul>

在游戏目录下 `build.gradle` 文件中添加代码

<CodeBlock className="groovy">
{`repositories{
    flatDir{   
        dirs 'src/main/libs'
    }
}
dependencies {
    // ...
    implementation(name: "AntiAddiction_${sdkVersions.taptap.anti_addiction}", ext: "aar")
    implementation(name: "AntiAddictionUI_${sdkVersions.taptap.anti_addiction}", ext: "aar")
    // ...
}`}
</CodeBlock>

</>
<>

支持的 iOS 版本为最低为 iOS 10，SDK 编译环境为 Xcode 12。

iOS 防沉迷 SDK 结构：

- `AntiAddictionService` 防沉迷基础库，源码由 Swift 编写。
- `AntiAddictionUI` 带 UI 的防沉迷库，依赖 `AntiAddictionService`，源码由  Objective-C 编写。
- `AntiAdictionResources.bundle` 资源文件

添加防沉迷库文件：

- 添加 `AntiAddictionService.framework` 和 `AntiAddictionUI.framework` 静态库。注意添加时选择 Embed 方式为 **Do Not Embed**。

- 引用代码：

    ``` objc
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

防沉迷 SDK 需要联网和发送请求数据的权限，请开发者注意在项目中声明相应权限。

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
// 是否显示切换账号按钮
bool showSwitchAccount = false;

AntiAddictionUIKit.Init(gameIdentifier, useTimeLimit, usePaymentLimit, showSwitchAccount,
    (antiAddictionCallbackData) => {
        int code = antiAddictionCallbackData.code;
        MsgExtraParams extras = antiAddictionCallbackData.extras;
        // 根据 code 不同提示玩家不同信息，详见下面的说明
        if (code == 500)
        {
            // 开始计时
            AntiAddictionUIKit.EnterGame();
            Debug.Log("玩家登录后判断当前玩家可以进行游戏");
        }

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
    .showSwitchAccount(true)    // 是否显示切换账号按钮
    .build();
AntiAddictionUIKit.init(activity, gameIdentifier, config,
    new AntiAddictionUICallback() {
        @Override
        public void onCallback(int code, Map<String, Object> extras) {
            // 根据 code 不同提示玩家不同信息，详见下面的说明
            if (code == Constants.ANTI_ADDICTION_CALLBACK_CODE.LOGIN_SUCCESS){
                // 开始计时
                AntiAddictionUIKit.enterGame();
                Log.d("TapTap-AntiAddiction", "玩家登录后判断当前玩家可以进行游戏");
            }
        }       
    }
);
```

</>
<>

```objc
NSString *gameIdentifier = @"游戏的 Client ID";
AntiAddictionConfiguration *config = AntiAddictionService.configuration;
// 是否启用消费限制功能
config.useSdkPaymentLimit = YES;
// 是否启用时长限制功能
config.useSdkOnlineTimeLimit = YES;
// 是否显示切换账号按钮
config.showSwitchAccount = YES;

[AntiAddiction initGameIdentifier:gameIdentifier antiAddictionConfig:config
antiAddictionCallbackDelegate:self
completionHandler:^(BOOL success) {
    if (success) {
        // 初始化成功
    }
}];
```

`antiAddictionCallbackDelegate` 参数中传入接受回调的对象，其中需实现如下回调：

```objc
- (void)antiAddictionCallbackWithCode:(AntiAddictionResultHandlerCode)code extra:(NSString *)extra {}
```


</>
</MultiLang>

### 参数说明

- `gameIdentifier` 是游戏的 `Client ID`，可以在控制台查看（**开发者中心 > 你的游戏 > 游戏服务 > 应用配置**）。

- `useTimeLimit` 是否启用时长限制功能。如果使用这个功能，需要[上报游戏时长](#上报游戏时长)。

- `usePaymentLimit` 是否启用消费限制功能。如果使用这个功能，需要[检查消费上限](#检查消费上限)。

- `showSwitchAccount` 是否显示切换账号按钮。如果游戏没有切换账号功能，可以在初始化阶段配置隐藏切换账号按钮；如果游戏选择显示切换账号按钮(如下图所示)，玩家点击之后会触发 `1001` 回调，游戏可根据这个回调 code 做相应处理。

![切换账号界面](/img/anti-addiction/switch-account.png)

### 回调类型

| 回调类型                          | code | 触发逻辑                                                     | 附带信息                     |
| :-------------------------------- | :--- | :----------------------------------------------------------- | :------------------------- |
| `CALLBACK_CODE_LOGIN_SUCCESS`      | 500  | 玩家登录后判断当前玩家可以进行游戏                           | 无 |
| `CALLBACK_CODE_NIGHT_STRICT`          | 1030 | 未成年玩家当前无法进行游戏                                         | 有 |
| `CALLBACK_CODE_OPEN_ALERT_TIP`      | 1095 | 未成年允许游戏弹窗                                  | 有 |
| `CALLBACK_CODE_LOGOUT` | 1000 | 退出账号 | 无                         |
| `CALLBACK_CODE_REAL_NAME_STOP` | 9002 | 实名过程中点击了关闭实名窗 | 无 |          
| `CALLBACK_CODE_SWITCH_ACCOUNT` | 1001 | 点击切换账号按钮（v1.0.2 新增） | 无 |         

附带信息：

Unity SDK 定义了 `MsgExtraParams` 类：

```cs
public class MsgExtraParams
{
    // 限制类型：
    // "0"，无限制（成年玩家）
    // "1"，有限制（未成年玩家）
    public string restrict_type = "";
    // 显示给玩家的提示内容
    public string description = "";
    // 显示给玩家的提示标题
    public string title = "";
}
```

Andorid SDK 回调中的 `extras` 是一个 `Map<String, Object>`，其中的内容与 Unity SDK 类似。

iOS SDK 回调中的 `extras` 是字符串（`NSString`）。

## 防沉迷认证

SDK 支持两种防沉迷认证方式：

1. 使用 TapTap 快速认证，传入玩家的唯一标识和 TapTap 的鉴权信息，TDS 云端会根据相应玩家在 TapTap 的实名信息判断玩家是否可以进行游戏。
2. 不使用 TapTap 快速认证，玩家在 SDK 提供的界面中手动输入身份证号等实名信息，TDS 云端会将相应信息上报至中宣部防沉迷实名认证系统。

### TapTap 快速认证

使用 TapTap 快速认证需要接入 [TapTap 登录](/sdk/taptap-login/features/)功能。

游戏可以选择通过[TDS 内建账户系统](/sdk/taptap-login/guide/start/#用-taptap-oauth-授权结果直接登录账户系统)接入 TapTap 登录，或者以[单纯 TapTap 用户认证](/sdk/taptap-login/guide/tap-login/#taptap-登录并获取登录结果)的方式接入 TapTap 登录。

传入玩家唯一标识 `userIdentifier`，即可开始 TapTap 快速认证。

其中的**玩家唯一标识** `userIdentifier`，如果接入 [TDS 内建账户系统](/sdk/taptap-login/guide/start/#用-taptap-oauth-授权结果直接登录账户系统)，可以用玩家的 `objectId`；如果使用[单纯 TapTap 用户认证](/sdk/taptap-login/guide/tap-login/#taptap-登录并获取登录结果)则可以用 `openid` 或 `unionid`。

<MultiLang>

```cs
bool useTapLogin = true;
string userIdentifier = "玩家的唯一标识";

AntiAddictionUIKit.Startup(useTapLogin, userIdentifier);
```

```java
boolean useTapLogin = true;
String userIdentifier = "玩家的唯一标识";
AntiAddictionUIKit.startup(activity, useTapLogin, userIdentifier);
```

```objc
BOOL useTapLogin = YES;
NSString *userIdentifier = @"玩家的唯一标识";
[AntiAddiction startUpUseTapLogin:useTapLogin userIdentifier:userIdentifier];
```

</MultiLang>

快速认证基于 TapTap 的 `access token`，SDK 会自动获取 `access token`。
如果自动获取失败，那么会显示手动输入实名信息的用户界面。


### 手动输入实名信息

如果不使用 TapTap 快速认证，可以通过下面的接口开始防沉迷授权。需要传入的**玩家唯一标识** `userIdentifier`，由游戏自己定义。

<MultiLang>

```cs
string userIdentifier = "玩家的唯一标识";
AntiAddictionUIKit.Startup(false, userIdentifier);
```

```java
String userIdentifier = "玩家的唯一标识";
AntiAddictionUIKit.startup(activity, false, userIdentifier);
```

```objc
NSString *userIdentifier = @"玩家的唯一标识";
[AntiAddiction startUpUseTapLogin:NO
userIdentifier:userIdentifier];
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
            // status 为 true 时可以支付，false 则限制消费
            if (!result.status) {
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
AntiAddictionUIKit.submitPayResult(amount,
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
[AntiAddiction submitPayResult:amount
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

鉴权 Token 永久有效。

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
        "title":"健康游戏提示","description":"你当前为未成年账号，已被纳入防沉迷系统。根据国家相关规定，周五、周六、周日及法定节假日 20 点 - 21 点之外为健康保护时段。你今日游戏时间还剩余${remainTime}分钟，请注意适当休息。"
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
        "description":"你当前为未成年账号，已被纳入防沉迷系统。根据国家相关规定，周五、周六、周日及法定节假日 20 点 - 21 点之外为健康保护时段。当前时间段无法游玩，请合理安排时间。"
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

## 常见问题

#### 实名认证和防沉迷 SDK 自带哪些用户界面（UI）

实名认证和防沉迷 SDK 提供的用户界面主要在防沉迷授权阶段，可参考[功能介绍文档](/sdk/anti-addiction/features/#接入-tds-实名认证和防沉迷服务)中的界面预览。

#### 无版号游戏应该怎么接入

无版号游戏无法配置中宣部参数，需要在开发者后台右上角选择「工单 > 创建工单」，申请开启防沉迷功能，工单分类选择「游戏服务支持 > 防沉迷新政相关」。开启之后才能正常使用实名认证和防沉迷服务。

等游戏有了版号，可以配置[中宣部参数](/sdk/anti-addiction/features/#准备工作)并通过工单联系我们。切换后客户端代码不受影响，不需要修改。

#### 接入 SDK 后填写真实的姓名和身份信息，为什么不通过

请再次确认填写的身份信息无误，然后根据游戏是否有版号排查：

- 有版号游戏：在开发者中心后台，是否正确配置了[中宣部参数](/sdk/anti-addiction/features/#准备工作)。
- 无版号游戏：在开发者中心后台，是否提交工单申请了[开启防沉迷服务](#无版号游戏应该怎么接入)。

如果仍出现「认证未通过，请提交真实信息」提示，请提交工单获得技术支持。
