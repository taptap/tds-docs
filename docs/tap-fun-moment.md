---
id: tap-fun-moment
title: TDSMoment
sidebar_label: 动态
---


import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


`本文介绍动态相关功能和使用方式`
:::caution
**目前 需要联系[运营团队](#)获取 TapMoment 的使用权限。**
:::

## 1. 介绍
TapSDK提供可供用户发布动态到TapTapApp和游戏内部展示动态的控件和功能。  

## 2. 功能开启
API放在[TdsInitializer.init](./tap-api-android.md#init)初始化SDK之后调用即可  

**API**  

<Tabs
groupId="tap-platform"
  defaultValue="Android"
  values={[
    {label: 'Android', value: 'android'},
    {label: 'iOS', value: 'ios'},
    {label: 'unity', value: 'unity'},
  ]}>
  <TabItem value="android">

  ```java
TdsInitializer.enableMoment(Activity);
  ```  
  </TabItem>

  <TabItem value="ios">

  ```objectivec
+ (void)enableMoment;
  ```
  </TabItem>

  <TabItem value="unity">

  </TabItem>
</Tabs>

**示例代码**

<Tabs
groupId="tap-platform"
  defaultValue="Android"
  values={[
    {label: 'Android', value: 'android'},
    {label: 'iOS', value: 'ios'},
    {label: 'unity', value: 'unity'},
  ]}>
  <TabItem value="android">

```java
  TdsInitializer.enableMoment(MainActivity.this);
```
  </TabItem>

  <TabItem value="ios">

  ```objectivec
[TDSInitializer enableMoment];
  ```
  </TabItem>
  <TabItem value="unity">

  </TabItem>
</Tabs>


## 3. 添加回调
调用 enableMoment 后，需要设置动态回调

**API**
<Tabs
groupId="tap-platform"
  defaultValue="Android"
  values={[
    {label: 'Android', value: 'android'},
    {label: 'iOS', value: 'ios'},
    {label: 'unity', value: 'unity'},
  ]}>
  <TabItem value="android">

```java
TapTapMomentSdk.setCallback(TapTapMomentSdk.TapMomentCallback var0);
```
  </TabItem>

  <TabItem value="ios">

  ```objectivec
- (void)didChangeResultCode:(NSInteger)code msg:(NSString *)msg;
  ```
  </TabItem>
  <TabItem value="unity">

  </TabItem>
</Tabs>




**示例代码**
<Tabs
groupId="tap-platform"
  defaultValue="Android"
  values={[
    {label: 'Android', value: 'android'},
    {label: 'iOS', value: 'ios'},
    {label: 'unity', value: 'unity'},
  ]}>

  <TabItem value="android">

  ```java
TapTapMomentSdk.setCallback(new TapTapMomentSdk.TapMomentCallback() {
  @Override
  public void onCallback(int code, String msg) {

  }
});
  ```
  </TabItem>

  <TabItem value="ios">

  ```objectivec
  @interface ViewController () <TDSMomentDelegate>

  @end

  - (void)didChangeResultCode:(NSInteger)code msg:(NSString *)msg {
      NSLog (@"msg:%@, code:%i" ,msg, code);
  }
  ```
  </TabItem>
  <TabItem value="unity">

  </TabItem>

</Tabs>

回调方法中 code 表示事件类型，现支持的回调类型如下：

回调 | 回调值 | 说明
--- | --- | ---
CALLBACK\_CODE_PUBLISH\_SUCCESS | 10000 | 动态发布成功
CALLBACK\_CODE_PUBLISH\_FAIL | 10100 | 动态发布失败
CALLBACK\_CODE\_PUBLISH\_CANCEL | 10200 | 动态发布失败
CALLBACK\_CODE\_GET\_NOTICE\_SUCCESS | 20000| 获取通知数量成功，附带信息为通知数量
CALLBACK\_CODE\_GET\_NOTICE\_FAIL | 20100 | 获取通知数量失败，附带信息为错误原因
CALLBACK\_CODE_MOMENT\_APPEAR | 30000 | 动态页面显示时触发
CALLBACK\_CODE_MOMENT\_DISAPPEAR | 30100 | 动态页面消失时触发
CALLBACK_CODE_INIT_SUCCESS | 40000 | 动态初始化成功
CALLBACK_CODE_INIT_FAIL | 40100 | 动态初始化失败
CALLBACK_CODE_ClOSE_CANCEL | 50000 | 弹出关闭动态弹窗时，用户取消
CALLBACK_CODE_ClOSE_CONFIRM | 50100 | 弹出关闭动态弹窗时，用户确认


## 4. 设置登录信息
游戏在使用 TapTap 登录完成后，需要调用该接口设置登录信息

**API**  
<Tabs
groupId="tap-platform"
  defaultValue="Android"
  values={[
    {label: 'Android', value: 'android'},
    {label: 'iOS', value: 'ios'},
    {label: 'unity', value: 'unity'},
  ]}>
  <TabItem value="android">

  ```java
TapTapMomentSdk.setLoginToken(AccessToken);
  ```
  </TabItem>

  <TabItem value="ios">

  ```objectivec
+ (void)setAccessToken:(TDSMomentAccessToken *)token;
  ```
  </TabItem>
  <TabItem value="unity">

  </TabItem>
</Tabs>

**示例代码**
<Tabs
groupId="tap-platform"
  defaultValue="Android"
  values={[
    {label: 'Android', value: 'android'},
    {label: 'iOS', value: 'ios'},
    {label: 'unity', value: 'unity'},
  ]}>
  <TabItem value="android">

  ```java
AccessToken currentAccessToken = AccessToken.getCurrentAccessToken();
TapTapMomentSdk.setLoginToken(currentAccessToken);
  ```
  </TabItem>

  <TabItem value="ios">

  ```objectivec
[TDSMomentSdk setAccessToken:[TDSMomentAccessToken build:[[TapLoginHelper currentAccessToken]toJsonString]]];
  ```
  </TabItem>
  <TabItem value="unity">

  </TabItem>
</Tabs>


## 5. 打开动态页面
在游戏中，显示游戏动态页面  

**API**  
<Tabs
groupId="tap-platform"
  defaultValue="Android"
  values={[
    {label: 'Android', value: 'android'},
    {label: 'iOS', value: 'ios'},
    {label: 'unity', value: 'unity'},
  ]}>
  <TabItem value="android">

  ```java
TapTapMomentSdk.openTapMoment(TapTapMomentSdk.Config);
  ```
  </TabItem>

  <TabItem value="ios">

  ```objectivec
  + (void)openTapMomentWithConfig:(TDSMomentConfig *) config;
  ```
  </TabItem>
  <TabItem value="unity">

  </TabItem>
</Tabs>

**示例代码**
<Tabs
groupId="tap-platform"
  defaultValue="Android"
  values={[
    {label: 'Android', value: 'android'},
    {label: 'iOS', value: 'ios'},
    {label: 'unity', value: 'unity'},
  ]}>
  <TabItem value="android">

  ```java
  TapTapMomentSdk.Config config = new TapTapMomentSdk.Config();
  // config用来设置页面显示配置，包括显示方向等
  TapTapMomentSdk.openTapMoment(config);
  ```
  </TabItem>

  <TabItem value="ios">

  ```objectivec
  TDSMomentConfig *mconfig = [TDSMomentSdk init];
  mconfig.orientation = TDSMomentOrientationDefault;
  [TDSMomentSdk openTapMomentWithConfig:mconfig];
  ```
  </TabItem>
  <TabItem value="unity">

  </TabItem>
</Tabs>


## 6. 发布动态
:::caution
**截止到此步骤，2、3、4步为必要步骤**
:::

### 普通动态
普通动态包括图片和对应的内容描述

**API**   
<Tabs
groupId="tap-platform"
  defaultValue="Android"
  values={[
    {label: 'Android', value: 'android'},
    {label: 'iOS', value: 'ios'},
    {label: 'unity', value: 'unity'},
  ]}>
  <TabItem value="android">

  ```java
  TapTapMomentSdk.publishMoment(TapTapMomentSdk.Config config, String imgPaths, String content);
  ```
  </TabItem>

  <TabItem value="ios">

  ```objectivec
  + (void)openPostMomentPageWithContent:(TDSPostMomentData * _Nonnull)content
                                 config:(TDSMomentConfig * _Nonnull)config;
  ```
  </TabItem>
  <TabItem value="unity">

  </TabItem>
</Tabs>

**示例代码**
<Tabs
groupId="tap-platform"
  defaultValue="Android"
  values={[
    {label: 'Android', value: 'android'},
    {label: 'iOS', value: 'ios'},
    {label: 'unity', value: 'unity'},
  ]}>
  <TabItem value="android">

  ```java
TapTapMomentSdk.Config config = new TapTapMomentSdk.Config();
config.orientation = TapTapMomentSdk.ORIENTATION_DEFAULT;  
String content = "普通动态描述";
String[] images = new String[] { "content://***.jpg","/sdcard/**.jpg" };
TapTapMomentSdk.publishMoment(config, imagePaths, content);
  ```
  </TabItem>

  <TabItem value="ios">

  ```objectivec
  TDSImageMomentData *imageMoment = [[TDSImageMomentData alloc] init];
  imageMoment.images = @[@"file://..."];
  imageMoment.content = @"我是发图片动态的内容";

  TDSMomentConfig *config = [[TDSMomentConfig alloc] init];
  config.orientation = TDSMomentOrientationDefault;

  [TDSMomentSdk openPostMomentPageWithContent:imageMoment config:config];
  ```
  </TabItem>
  <TabItem value="unity">

  </TabItem>
</Tabs>

### 发布视频动态

视频动态包括视频和图片（可选）

**API**  
<Tabs
groupId="tap-platform"
  defaultValue="Android"
  values={[
    {label: 'Android', value: 'android'},
    {label: 'iOS', value: 'ios'},
    {label: 'unity', value: 'unity'},
  ]}>
  <TabItem value="android">

  ```java
  TapTapMomentSdk.publishVideoMoment(TapTapMomentSdk.Config config, String[] videoPaths,
  String[] imagePaths, String title, String content);
  ```
  </TabItem>

  <TabItem value="ios">

  ```objectivec
  + (void)openPostMomentPageWithContent:(TDSPostMomentData * _Nonnull)content
                                 config:(TDSMomentConfig * _Nonnull)config;
  ```
  </TabItem>
  <TabItem value="unity">

  </TabItem>
</Tabs>

**示例代码**
<Tabs
groupId="tap-platform"
  defaultValue="Android"
  values={[
    {label: 'Android', value: 'android'},
    {label: 'iOS', value: 'ios'},
    {label: 'unity', value: 'unity'},
  ]}>
  <TabItem value="android">

  ```java
TapTapMomentSdk.Config config = new TapTapMomentSdk.Config();
String[] images = new String[]{ "content://***.jpg","/sdcard/**.jpg" };
String[] videos = new String[] { "content://***.mp4", "content://***.mp4" };
String title = "title";
String content = "content";
TapTapMomentSdk.publishVideoMoment(config, videoPaths, imagePaths, title, content);
//如果不需要上传封面图片，可调用如下接口
//TapTapMomentSdk.publishVideoMoment(config, videoPaths, title, content);

  ```
  </TabItem>

  <TabItem value="ios">

  ```objectivec
  TDSVideoMomentData *videoMoment = [[TDSVideoMomentData alloc] init];
  videoMoment.images = @[@"file://..."];
  videoMoment.videos = @[@"file://..."];
  videoMoment.title = @"我是发送视频动态的标题";
  videoMoment.content = @"我是发送视频动态的内容";

  TDSMomentConfig *config = [[TDSMomentConfig alloc] init];
  config.orientation = TDSMomentOrientationDefault;

  [TDSMomentSdk openPostMomentPageWithContent:videoMoment config:config];
  ```
  </TabItem>
  <TabItem value="unity">

  </TabItem>
</Tabs>

**参数说明**

字段 | 可为空 | 说明
| ------ | ------ | ------ |
config | 否 | 发布动态图片或者视频的横竖屏配置
videos | 否 | 视频文件路径，数组形式呈现
images | 是 | 视频封面图，可以不配置
title | 否 | 动态标题
content | 是 | 动态描述



## 7. 获取用户新通知数量
当游戏需要获取当前用户的新的通知信息数量时，调用该接口

**API**  
<Tabs
groupId="tap-platform"
  defaultValue="Android"
  values={[
    {label: 'Android', value: 'android'},
    {label: 'iOS', value: 'ios'},
    {label: 'unity', value: 'unity'},
  ]}>
  <TabItem value="android">

  ```java
TapTapMomentSdk.getNoticeData();
  ```
  返回结果会通过回调 `CALLBACK_CODE_GET_NOTICE_SUCCESS`(20000)或`CALLBACK_CODE_GET_NOTICE_FAIL`(20100)通知游戏
  </TabItem>

  <TabItem value="ios">

  ```objectivec
+ (void)fetchNewMessage;
  ```
  结果在 `Delegate` 下的 `didChangeResultCode:msg:`, code == TM_RESULT_CODE_NEW_MSG_SUCCEED时，`msg` 即为消息数量
  </TabItem>
  <TabItem value="unity">

  </TabItem>
</Tabs>


## 8. 进入好友动态主页

当游戏需要进入指定用户的动态页面时，调用该接口

**API**  
<Tabs
groupId="tap-platform"
  defaultValue="Android"
  values={[
    {label: 'Android', value: 'android'},
    {label: 'iOS', value: 'ios'},
    {label: 'unity', value: 'unity'},
  ]}>
  <TabItem value="android">

  ```java
TapTapMomentSdk.openUserMoment(TapTapMomentSdk.Config config, String openId);
  ```
  </TabItem>

  <TabItem value="ios">

  ```objectivec
+ (void)openUserCenterWithConfig:(TDSMomentConfig *)config userId:(NSString *)userId;
  ```
  </TabItem>
  <TabItem value="unity">

  </TabItem>
</Tabs>

**示例代码**
<Tabs
groupId="tap-platform"
  defaultValue="Android"
  values={[
    {label: 'Android', value: 'android'},
    {label: 'iOS', value: 'ios'},
    {label: 'unity', value: 'unity'},
  ]}>
  <TabItem value="android">

  ```java
TapTapMomentSdk.Config config = new TapTapMomentSdk.Config();
config.orientation = TapTapMomentSdk.ORIENTATION_DEFAULT;  
TapTapMomentSdk.openUserMoment(config, openId);
  ```
  </TabItem>
  <TabItem value="ios">

  ```objectivec
  TDSMomentConfig *config = [[TDSMomentConfig alloc] init];
  config.orientation = TDSMomentOrientationDefault;
  [TDSMomentSdk openUserCenterWithConfig:config userId:@"userId"];
  ```
  </TabItem>
  <TabItem value="unity">

  </TabItem>
</Tabs>

**参数说明**

字段 | 可为空 | 说明
| ------ | ------ | ------ |
openId | 否 | [openId获取方式](./tap-api-android.md/#tap登录后openid获取方式)

## 9. 关闭动态

当游戏在特定场景下需要主动关闭动态时调用
1. 直接关闭  

该接口会直接关闭动态窗口，不会弹出二次确认弹窗，接口示例：

<Tabs
groupId="tap-platform"
  defaultValue="Android"
  values={[
    {label: 'Android', value: 'android'},
    {label: 'iOS', value: 'ios'},
    {label: 'unity', value: 'unity'},
  ]}>
  <TabItem value="android">

  ```java
TapTapMomentSdk.closeMoment();
  ```

  </TabItem>

  <TabItem value="ios">

  ```objectivec
[TDSMomentSdk closeMoment];
  ```
  </TabItem>
  <TabItem value="unity">

  </TabItem>
</Tabs>

2. 弹出二次确认  

该接口会弹出二次确认弹窗，由用户确定是否关闭，示例如下：
<Tabs
groupId="tap-platform"
  defaultValue="Android"
  values={[
    {label: 'Android', value: 'android'},
    {label: 'iOS', value: 'ios'},
    {label: 'unity', value: 'unity'},
  ]}>
  <TabItem value="android">

  ```java
TapTapMomentSdk.closeMoment(title, content)
  ```
  **参数说明**

字段 | 可为空 | 说明
| ------ | ------ | ------ |
title | 否 | 动态标题
content | 否 | 动态描述

参数为二次弹窗的标题和内容，默认为"提示"和"匹配成功，进入游戏",用户选择接口会通过回调 `CALLBACK_CODE_ClOSE_CANCEL`(50000) 和`CALLBACK_CODE_ClOSE_CONFIRM`(50100)通知游戏  
  </TabItem>

  <TabItem value="ios">

  ```objectivec
[TDSMomentSdk closeMomentWithTitle:@"title" content:@"content" showConfirm:true];
  ```
  **参数说明**

字段 | 可为空 | 说明
| ------ | ------ | ------ |
title | 否 | 动态标题
content | 否 | 动态描述
showConfirm | 否 | 是否显示确认弹窗

  </TabItem>
  <TabItem value="unity">

  </TabItem>
</Tabs>
