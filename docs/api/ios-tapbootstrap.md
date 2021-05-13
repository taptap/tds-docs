---
id: ios-tapbootstrap
title: TapBootstrap
---
## method

### initWithConfig

初始化 SDK

#### API  

```objectivec
+ (void)initWithConfig:(TapConfig *)config;
```

#### 示例代码

```objectivec
TapConfig *config = TapConfig.new;
config.clientId = @"clientId";
config.clientSecret = @"ServerSecret";
config.region = TapSDKRegionTypeCN;
[TapBootstrap initWithConfig:config];
```

**TapConfig 参数说明**  

| 参数       | 可选  | 备注                |
| :------- | :-- | :---------------- |
| clientId | 否   | 开发者中心获取的 Client ID |
| clientSecret | 否   | 开发者中心获取的 Server Secret |
| region | 否   | 海外或者国内 |

### isInitialized

#### API  

```objectivec
+ (BOOL)isInitialized;
```

#### 示例代码

```objectivec
bool isInit = [TapBootstrap isInitialized];
```

### registerLoginResultDelegate

注册登录回调

#### API  

```objectivec
+ (void)registerLoginResultDelegate:(id <TapLoginResultDelegate>)delegate;
```

#### 示例代码

```objectivec
// 监听用户登陆状态
[TapBootstrap registerLoginResultDelegate:self];

// 实现回调方法
// 登录成功回调
// @param token token 对象
- (void)onLoginSuccess:(AccessToken *)token{
    NSLog (@"onLoginSuccess");
}

// 登录取消
- (void)onLoginCancel{
    NSLog (@"onLoginCancel");
}

// 登录失败
// @param error 失败原因
- (void)onLoginError:(NSError *)error{
    NSLog (@"onLoginError error");
}
```

### registerUserStatusChangedDelegate

监听用户账号的登陆状态

#### API  

```objectivec
+ (void)registerUserStatusChangedDelegate:(id <TapUserStatusChangedDelegate>)delegate;
```

#### 示例代码

```objectivec
// 注册登录回调
[TapBootstrap registerUserStatusChangedDelegate:self];
- (void)onLogout:(NSError *)error{
    NSLog (@"onLogout");
}

// 如果是因为出错导致的退登，则返回错误信息
- (void)onBind:(NSError *)error{
    NSLog (@"onBind");
}
```


### login

登录

#### API

```objectivec
+ (void)login:(TapBootstrapLoginType)type permissions:(NSArray *_Nullable)permissions;
```

#### 示例代码

```objectivec
TapBootstrapLoginType loginType = TapBootstrapLoginTypeTapTap;
[TapBootstrap login:(loginType) permissions:@[@"public_profile"]];
```

**API 说明**  

调用该接口会触发 [registerLoginResultDelegate](#registerloginresultdelegate) 回调


### logout

登出

#### API

```objectivec
+ (void)logout;
```

#### 示例代码

```objectivec
[TapBootstrap logout];
```

### getUser

获取用户基本信息

#### API

```objectivec
+ (void)getUser:(TapUserHandler)handler;
```

#### 示例代码

```objectivec
[TapBootstrap getUser:^(TapUser * _Nullable userInfo, NSError * _Nullable error) {
      if(error){
          NSLog(@"获取用户信息失败 %@", error);
      }else{
          NSLog(@"获取用户信息成功 %@", userInfo);
      }
  }];
```

### getUserDetails
获取用户详细信息

#### API

```objectivec
+ (void)getUserDetails:(TapUserDetailsHandler)handler;
```

#### 示例代码

```objectivec
[TapBootstrap getUserDetails:^(TapUserDetails *_Nullable userDetail, NSError *_Nullable error) {
        if (error) {
            NSLog(@"获取用户信息失败 %@", error);
        } else {
            NSLog(@"获取用户信息成功 %@", userDetail.name);
        }
    }];
```
### getCurrentToken

获取 AccessToken

#### API  

```objectivec
+ (AccessToken *)getCurrentToken;
```

#### 示例代码

```objectivec
AccessToken *accessToken = [TapBootstrap getCurrentToken];
```

### openUserCenter

#### API

```objectivec
+ (void)openUserCenter;
```

#### 示例代码

```objectivec
[TapBootstrap openUserCenter];
```

### setPreferredLanguage
设定游戏倾向语言, TapLanguageType 0-自动 1-简中 2-英文
#### API

```objectivec
+ (void)setPreferredLanguage:(TapLanguageType)lang;
```

#### 示例代码

```objectivec
[TapBootstrap setPreferredLanguage:0];
```

<!-- ### isTapTapGlobalClientSupport
当前是否有国外客户端支持
#### API

```objectivec
+ (BOOL)isTapTapGlobalClientSupport;
```

#### 示例代码

```objectivec
bool isIOSuport = [TapLoginHelper isTapTapGlobalClientSupport];
``` -->

## 错误码
| 字段          | code | 说明       |
| ----------- | --- | -------- |
|   ERROR_CODE_UNDEFINED     | 80000    | 未定义   |
| ERROR_CODE_UNINITIALIZED     | 80001    |  未初始化   |
| ERROR_CODE_LOGOUT_INVALID_LOGIN_STATE      | 80004    | token失效   |
|ERROR_CODE_LOGOUT_KICKED     | 80007     | 账号被踢     |
