---
id: ios-tapmoment
title: TDSMomentSdk
slug: /ios-tapmoment
---
## method


### didChangeResultCode

设置动态发布回调  

#### API  

```objectivec
- (void)didChangeResultCode:(NSInteger)code msg:(NSString *)msg;
```

#### 示例代码

```objectivec
@interface ViewController () <TDSMomentDelegate>

@end

- (void)didChangeResultCode:(NSInteger)code msg:(NSString *)msg {
    NSLog (@"msg:%@, code:%i" ,msg, code);
}
```

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

### openTapMomentWithConfig

打开动态页面

#### API  

```objectivec
  + (void)openTapMomentWithConfig:(TDSMomentConfig *) config;
```

#### 示例代码

```objectivec
TDSMomentConfig *mconfig = [TDSMomentSdk init];
mconfig.orientation = TDSMomentOrientationDefault;
[TDSMomentSdk openTapMomentWithConfig:mconfig];
```

### openPostMomentPageWithContent

发布动态

#### API  

```objectivec
+ (void)openPostMomentPageWithContent:(TDSPostMomentData * _Nonnull)content
                               config:(TDSMomentConfig * _Nonnull)config;
```

#### 示例代码

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

#### API  

```objectivec
+ (void)fetchNewMessage;
```

  结果在 `Delegate` 下的 `didChangeResultCode:msg:`, code == TM_RESULT_CODE_NEW_MSG_SUCCEED时，`msg` 即为消息数量

#### 示例代码

```objectivec
[TDSMomentSdk fetchNewMessage];
```

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

**参数说明**

| 字段     | 可为空 | 说明                                                   |
| ------ | --- | ---------------------------------------------------- |
| openId | 否   | [openId获取方式](./api/ios-tapdb.md/#tap登录后openid获取方式) |

### closeMoment

关闭动态页面

#### API  

```objectivec
//直接关闭
+ (void)closeMoment;

//确认关闭
+ (void)closeMomentWithTitle:(NSString *)title content:(NSString *)content showConfirm:(BOOL)showConfirm;
```

#### 示例代码

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
