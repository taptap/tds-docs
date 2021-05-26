---
id: ios-tapmoment
title: TapMoment
---
import {Red, Blue, Black, Gray} from '../component';

## method

### setDelegate

设置动态回调

#### API  

```objectivec
+ (void)setDelegate:(id <TapMomentDelegate>)delegate;
```

#### 示例代码

```objectivec
@interface ViewController ()<TapMomentDelegate>
@end

[TapMoment setDelegate:self];
- (void)onMomentCallbackWithCode:(NSInteger)code msg:(NSString *)msg
{
  NSLog (@"msg:%@, code:%i" ,msg, code);
}  
```
<!--
### onMomentCallbackWithCode

动态回调结果  

#### API  

```objectivec
- (void)onMomentCallbackWithCode:(NSInteger)code msg:(NSString *)msg;
```

#### 示例代码

```objectivec
@interface ViewController () <TDSMomentDelegate>

@end

- (void)onMomentCallbackWithCode:(NSInteger)code msg:(NSString *)msg {
    NSLog (@"msg:%@, code:%i" ,msg, code);
}
``` -->

<!-- ### setAccessToken

设置登录信息

#### API  

```objectivec
+ (void)setAccessToken:(TDSMomentAccessToken *)token;
```

#### 示例代码

```objectivec
[TDSMomentSdk setAccessToken:[TDSMomentAccessToken build:[[TapLoginHelper currentAccessToken]toJsonString]]];
``` -->

### open

打开动态页面

#### API  

```objectivec
+ (void)open:(TapMomentConfig *)config;
```

#### 示例代码

```objectivec
TapMomentConfig *mConfig = TapMomentConfig.new;
mConfig.orientation = TapMomentOrientationDefault;
[TapMoment open:mConfig];
```

### publish

发布动态

#### API  

```objectivec
+ (void)publish:(TapMomentConfig *_Nonnull)config
      content:(TapMomentPostData *_Nonnull)content;
```

#### 示例代码

```objectivec
//发布动态配置横竖屏
TapMomentConfig * tconfig = TapMomentConfig.new;
tconfig.orientation = TapMomentOrientationDefault;
//发布图片动态
TapMomentImageData *postData = TapMomentImageData.new;
postData.images = @[@"file://..."];
postData.content = @"我是图片描述";
[TapMoment publish:tconfig content:(postData)];
```

**参数说明**

| 字段         | 可为空 | 说明               |
| ---------- | --- | ---------------- |
| config     | 否   | 发布动态图片横竖屏配置 |
| images   | 是   | 图片地址     |
| content    | 是   | 动态描述             |

### fetchNotification

获取用户新通知数量   

#### API  

```objectivec
+ (void)fetchNotification;
```

  结果在 `Delegate` 下的 `onMomentCallbackWithCode:msg:`, code == TM_RESULT_CODE_NEW_MSG_SUCCEED 时，`msg` 0 为无新消息，1 为有新消息

#### 示例代码

```objectivec
[TapMoment fetchNotification];
```
<!--
### openUserCenterWithConfig

进入指定用户的动态页面

#### API  

```objectivec
+ (void)openUserCenterWithConfig:(TDSMomentConfig *)config userId:(NSString *)userId;
```

#### 示例代码

```objectivec
TDSMomentConfig *config = [[TDSMomentConfig alloc] init];
config.orientation = TDSMomentOrientationDefault;
[TDSMomentSdk openUserCenterWithConfig:config userId:@"userId"];
```

** 参数说明 **

| 字段     | 可为空 | 说明                                                   |
| ------ | --- | ---------------------------------------------------- |
| userId | 否   | xd 的 userId，非 TapTap 的 userId | -->

### closeMoment
直接关闭动态页面

#### API  

```objectivec
+ (void)close;
```

#### 示例代码

```objectivec
[TapMoment close];
```

### closeWithTitle

确认方式关闭动态页面

#### API  

```objectivec
+ (void)closeWithTitle:(NSString *)title
               content:(NSString *)content
           showConfirm:(BOOL)showConfirm;
```

#### 示例代码

```objectivec
[TapMoment closeWithTitle:@"title" content:@"content" showConfirm:YES];
```

**参数说明**

| 字段          | 可为空 | 说明       |
| ----------- | --- | -------- |
| title       | 否   | 弹窗Title     |
| content     | 否   | 弹窗描述     |
| showConfirm | 否   | 是否显示确认弹窗 |

<!-- ### getSdkVersion

获取动态功能版本。<Red>注意</Red> 并非是 TapSDK version。此 API 不建议调用

#### API  

```objectivec
+ (NSString *)getSdkVersion;
```

#### 示例代码

```objectivec
NSString *version =  [TapMoment getSdkVersion];
```

### getSdkVersionCode

获取动态功能版本 code，<Red>注意</Red> 并非是 TapSDK version。此 API 不建议调用

#### API  

```objectivec
+ (NSString *)getSdkVersionCode;
```

#### 示例代码

```objectivec
 NSString *versionCode =  [TapMoment getSdkVersionCode];
``` -->

## 回调
| 字段          | code | 说明       |
| ----------- | --- | -------- |
| TM_RESULT_CODE_POST_SUCCEED       | 10000   | 动态发布成功     |
| TM_RESULT_CODE_POST_FAILED     | 10100   | 动态发布失败     |
| TM_RESULT_CODE_POST_CLOSED       | 10200   | 关闭动态发布页面     |
| TM_RESULT_CODE_NEW_MSG_SUCCEED | 20000   | 获取新消息成功 |
| TM_RESULT_CODE_NEW_MSG_FAILED | 20100   | 获取新消息失败 |
| TM_RESULT_CODE_MOMENT_PAGE_OPEBED | 30000   | 动态页面打开 |
| TM_RESULT_CODE_MOMENT_PAGE_CLOSED | 30100   | 动态页面关闭 |
| TM_RESULT_CODE_MOMENT_CLOSE_CANCELLED | 50000   | 取消关闭所有动态界面（弹框点击取消按钮） |
| TM_RESULT_CODE_MOMENT_CLOSE_CONFIRMED | 50100   | 确认关闭所有动态界面（弹框点击确认按钮） |
| TM_RESULT_CODE_MOMENT_LOGIN_SUCCEED | 60000   | 动态页面内登录成功 |  
