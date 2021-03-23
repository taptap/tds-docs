---
id: ios-loginhelper
title: TapLoginHelper
---
## method

### changeTapLoginConfig
修改登录配置
#### API  
```objectivec
+ (void)changeTapLoginConfig:(TTSDKConfig *_Nullable)config;
```
#### 示例代码

```objectivec
/** 修改登录配置。
 此段代码可以不调用，默认配置 (RegionTypeCN 和圆角登录框)
 */
TTSDKConfig *tconfig = [[TTSDKConfig alloc] init];
tconfig.regionType = RegionTypeCN;// 海外为 RegionTypeIO（默认值为 RegionTypeCN）
tconfig.roundCorner = YES;// NO 则网页登录是边框为直角（默认值为 YES）
[TapLoginHelper changeTapLoginConfig:tconfig];
```

### registerLoginResultDelegate
设置 TapSDK 的登录回调监听  

#### API  

```objectivec
+ (void)registerLoginResultDelegate:(id <TapLoginResultDelegate>)delegate;
```

#### 示例代码

```objectivec
[TapLoginHelper registerLoginResultDelegate:self];

 - (void)onLoginSuccess:(TTSDKAccessToken *)token {
     NSLog(@"Login success %@", [token toJsonString]);
 }

 - (void)onLoginCancel {
     NSLog(@"Login cancel");

 }

 - (void)onLoginError:(AccountGlobalError *)error{
     NSLog(@"Login error %@", [error toJsonString]);
 }
```

### unregisterLoginResultDelegate
移除 TapSDK 的登录回调监听  

#### API  

```objectivec
+ (void)unregisterLoginResultDelegate;
```

#### 示例代码

```objectivec
[TapLoginHelper unregisterLoginResultDelegate];
```

### getLoginResultDelegate
获取当前设置的登录回调

#### API  

```objectivec
+ (id <TapLoginResultDelegate>)getLoginResultDelegate;
```

#### 示例代码

```objectivec
[TapLoginHelper getLoginResultDelegate];
```

### startTapLogin

登录

#### API

```objectivec
+ (void)startTapLogin:(NSArray *)permissions;
```

#### 示例代码

```objectivec
[TapLoginHelper startTapLogin:@[@"public_profile"]];
```

**API 说明**  

调用该接口会触发 [registerLoginCallback](#registerLoginCallback) 回调


### logout

登出

#### API

```objectivec
+ (void)logout;
```

#### 示例代码

```objectivec
[TapLoginHelper logout];
```

### currentAccessToken

获取用户登录信息

#### API

```objectivec
+ (TTSDKAccessToken *)currentAccessToken;
```

#### 示例代码

```objectivec
TTSDKAccessToken *currentAccessToken = [TapLoginHelper currentAccessToken];
```

### currentProfile

#### API

```objectivec
+ (TTSDKProfile *)currentProfile;
```

#### 示例代码

```objectivec
TTSDKProfile *currentProfile = [TapLoginHelper currentProfile];
```

### fetchProfileForCurrentAccessToken

#### API

```objectivec
+ (void)fetchProfileForCurrentAccessToken:(void (^)(TTSDKProfile *profile, NSError *error))callback;
```

#### 示例代码

```objectivec
[TapLoginHelper fetchProfileForCurrentAccessToken:^(TTSDKProfile * _Nonnull profile, NSError * _Nonnull error) {
        //TapDB 会用到 openID
        NSString *openId = [profile openid];
    }];
```

### isTapTapClientSupport
当前是否有国内客户端支持
#### API

```objectivec
+ (BOOL)isTapTapClientSupport;
```

#### 示例代码

```objectivec
bool isCNSuport = [TapLoginHelper isTapTapClientSupport];
```

### isTapTapGlobalClientSupport
当前是否有国外客户端支持
#### API

```objectivec
+ (BOOL)isTapTapGlobalClientSupport;
```

#### 示例代码

```objectivec
bool isIOSuport = [TapLoginHelper isTapTapGlobalClientSupport];
```

## 错误码
| 字段          | error | 说明       |
| ----------- | --- | -------- |
| AccountGlobalError.LOGIN_ERROR_ACCESS_DENIED       | access_denied   | token 失效   |
| AccountGlobalError.LOGIN_ERROR_INVALID_GRANT     | invalid_grant   |  token 失效    |
| AccountGlobalError.LOGIN_ERROR_PERMISSION_RESULT       | permission_result   | 登录失败，发生在首次登录过程中    |
