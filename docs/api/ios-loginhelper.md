---
id: ios-loginhelper
title: TapLoginHelper
slug: /ios-loginhelper
---
## method


### registerLoginCallback

设置TapSDK的登录回调监听  

#### API  

```objectivec
+ (void)registerLoginCallback:(TTSDKLoginManagerRequestHandler)callback;
```

#### 示例代码

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

#### API

```objectivec
+ (void)startTapLogin:(NSArray *)permissions;
```

#### 示例代码

```objectivec
[TapLoginHelper startTapLogin:@[@"public_profile"]];
```

**API说明**  

调用该接口会触发[registerLoginCallback](#registerLoginCallback)回调


### logout

登出

#### API

```objectivec
+ (void)logout;
```

#### 示例代码

```objectivec
[[[TapLoginHelper alloc] init] logout];
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
        //TapDB会用到openID
        NSString *openId = [profile openid];
    }];
```
