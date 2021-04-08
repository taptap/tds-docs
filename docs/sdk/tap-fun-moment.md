---
id: tap-fun-moment
title: 内嵌动态
sidebar_label: 内嵌动态
---


import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {Highlight} from '../component';

本文主要介绍动态相关的使用方式，详细产品介绍请参考 [动态产品介绍](/pro/pro-moment)

## 1. 介绍
内嵌动态基于 TapTap 内容社区的功能和游戏本身的账号系统的更多融合，成功接入内嵌动态 SDK 后玩家即可通过游戏直接访问 TapTap 内容和自带功能。同时内嵌动态 SDK 也为游戏打造个性化内容或服务提供了开放功能。

## 2. 设置回调
设置动态回调，用于获取动态的状态变化

#### API
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
public static void setCallback(TapMoment.TapMomentCallback tapMomentCallback);
```
  </TabItem>

  <TabItem value="ios">

  ```objectivec
+ (void)setDelegate:(id <TapMomentDelegate>)delegate;
  ```
  </TabItem>
  <TabItem value="unity">

```cs
public static void SetCallback (Action<int, string> callback);
```

  </TabItem>
</Tabs>




#### 示例代码
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
TapMoment.setCallback(new TapMoment.TapMomentCallback() {
    @Override
    public void onCallback(int code, String msg) {

    }
});
  ```
  </TabItem>

  <TabItem value="ios">

  ```objectivec
@interface ViewController ()<TapMomentDelegate>
@end

[TapMoment setDelegate:self];
- (void)onMomentCallbackWithCode:(NSInteger)code msg:(NSString *)msg
{
    NSLog (@"msg:%@, code:%i" ,msg, code);
}  
  ```
  </TabItem>
  <TabItem value="unity">

```cs
TapMoment.SetCallback((code,msg)=>{
    Debug.Log(code+"---"+msg);
});
```

  </TabItem>

</Tabs>

回调方法中 code 表示事件类型，现支持的回调类型如下：

 回调          | 回调值 | 说明       |
 ----------- | --- | -------- |
 CALLBACK_CODE_PUBLISH_SUCCESS       | 10000   | 动态发布成功     |
 CALLBACK_CODE_PUBLISH_FAIL     | 10100   | 动态发布失败     |
 CALLBACK_CODE_PUBLISH_CANCEL       | 10200   | 关闭动态发布页面     |
 CALLBACK_CODE_GET_NOTICE_SUCCESS | 20000   | 获取新消息成功 |
 CALLBACK_CODE_GET_NOTICE_FAIL | 20100   | 获取新消息失败 |
 CALLBACK_CODE_MOMENT_APPEAR | 30000   | 动态页面打开 |
 CALLBACK_CODE_MOMENT_DISAPPEAR | 30100   | 动态页面关闭 |
 CALLBACK_CODE_ClOSE_CANCEL | 50000   | 取消关闭所有动态界面（弹框点击取消按钮） |
 CALLBACK_CODE_ClOSE_CONFIRM | 50100   | 确认关闭所有动态界面（弹框点击确认按钮） |
 CALLBACK_CODE_LOGIN_SUCCESS | 60000   | 动态页面内登录成功 |

<!--
## 4. 设置登录信息
游戏在使用 TapTap 登录完成后，需要调用该接口设置登录信息

#### API  
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

```cs
public static void SetLoginToken(string accessToken);
```

  </TabItem>
</Tabs>

#### 示例代码
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

```cs
TapSDK.TDSLogin.GetCurrentAccessToken((token)=>{
    TapSDK.TDSMoment.SetLoginToken(token.toJSON());
});
```

  </TabItem>
</Tabs> -->


## 3. 打开动态页面
在游戏中，显示游戏动态页面。
> <Highlight color='#f00'> 打开动态页面时，请先屏蔽游戏自身的声音，避免与动态内视频声音产生重合 </Highlight>    

> <Highlight color='#f00'> 如需要动态能支持横竖屏随设备自动旋转，需要游戏 app 自身能支持横竖屏 (Xcode 配置 Device Orientation)</Highlight>  


:::caution
**截止到此步骤，2、3 步为必要步骤**
:::

#### API  
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
/**
 * @param orientation 设置动态显示方向
 * {TapMoment.ORIENTATION_PORTRAIT、TapMoment.ORIENTATION_PORTRAIT}
 */
public static void open(int orientation);
  ```
  </TabItem>

  <TabItem value="ios">

  ```objectivec
+ (void)open:(TapMomentConfig *)config;
  ```
  </TabItem>
  <TabItem value="unity">

```cs
public static void Open (Orientation config);
```

  </TabItem>
</Tabs>

#### 示例代码
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
  TapMoment.open(TapMoment.ORIENTATION_PORTRAIT);
  ```
  </TabItem>

  <TabItem value="ios">

  ```objectivec
  TapMomentConfig *mConfig = TapMomentConfig.new;
  mConfig.orientation = TapMomentOrientationDefault;
  [TapMoment open:mConfig];
  ```
  </TabItem>
  <TabItem value="unity">

```cs
TapMoment.Open(TapSDK.Orientation.ORIENTATION_LANDSCAPE);
```

  </TabItem>
</Tabs>


## 4. 发布动态

普通动态包括图片和对应的内容描述

#### API   
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
  public static void publish(int orientation, String[] imagePath, String content);
  ```
  </TabItem>

  <TabItem value="ios">

  ```objectivec
  + (void)publish:(TapMomentConfig *_Nonnull)config
        content:(TapMomentPostData *_Nonnull)content;
  ```
  </TabItem>
  <TabItem value="unity">

```cs
public static void Publish (Orientation config, string[] imagePaths, string content);
```

  </TabItem>
</Tabs>

#### 示例代码
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
int orientation = TapMoment.ORIENTATION_PORTRAIT;
String content = "发布动态内容描述";
String[] imagePaths = new String[]{"content://***.jpg", "/sdcard/**.jpg"};
TapMoment.publish(orientation, imagePaths, content);
  ```
  </TabItem>

  <TabItem value="ios">

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
  </TabItem>
  <TabItem value="unity">

```cs
string content = "我是描述";
string[] images = {"imgpath01","imgpath02","imgpath03"};
TapMoment.Publish(Orientation.ORIENTATION_LANDSCAPE, images, content);
```

  </TabItem>
</Tabs>

<!-- ### 发布视频动态

视频动态包括视频和图片（可选）

#### API  
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

```cs
// 带封面
public static void PublishVideoMoment(Orientation config, string[] videoPaths, string[] imagePaths, string title, string desc)

// 不带封面
public static void PublishVideoMoment(Orientation config, string[] videoPaths, string title, string desc)
```

  </TabItem>
</Tabs>

#### 示例代码
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
// 如果不需要上传封面图片，可调用如下接口
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

```cs
// 带封面
string[] images = {"imgpath01","imgpath02","imgpath03"};
string[] videos = {"videop01","videop02","videop03"};
string title = "我是动态";
string content = "我是描述";
TapSDK.TDSMoment.PublishVideoMoment(TapSDK.Orientation.ORIENTATION_LANDSCAPE, videos, images, title, content);

// 不带封面
string[] images = {"imgpath01","imgpath02","imgpath03"};
string[] videos = {"videop01","videop02","videop03"};
string title = "我是动态";
string content = "我是描述";
TapSDK.TDSMoment.PublishVideoMoment(TapSDK.Orientation.ORIENTATION_LANDSCAPE, videos, title, content);
```

  </TabItem>
</Tabs>

**参数说明**

字段 | 可为空 | 说明
| ------ | ------ | ------ |
config | 否 | 发布动态图片或者视频的横竖屏配置
videos | 否 | 视频文件路径，数组形式呈现
images | 是 | 视频封面图，可以不配置
title | 否 | 动态标题
content | 是 | 动态描述 -->



## 5. 获取用户新通知数量
当游戏需要获取当前用户的新的通知信息数量时，调用该接口

#### API  
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
public static void fetchNotification();
  ```
  返回结果会通过动态回调通知游戏。  
  `code == CALLBACK_CODE_GET_NOTICE_SUCCESS`(20000) 表示获取成功，`msg` 为 0 表示无新消息，为 1 表示有新消息。   
  `CALLBACK_CODE_GET_NOTICE_FAIL`(20100) 表示获取失败
  </TabItem>

  <TabItem value="ios">

  ```objectivec
+ (void)fetchNotification;
  ```
  结果在 `Delegate` 下的 `onMomentCallbackWithCode:msg:` 中返回。  
  `code == CALLBACK_CODE_GET_NOTICE_SUCCESS`(20000) 表示获取成功，`msg` 为 0 表示无新消息，为 1 表示有新消息。   
  `CALLBACK_CODE_GET_NOTICE_FAIL`(20100) 表示获取失败
  </TabItem>
  <TabItem value="unity">

```cs
public static void FetchNotification ();
```
结果在 `TapMoment.SetCallback` 进行回调

  </TabItem>
</Tabs>


<!-- ## 7. 进入好友动态主页

当游戏需要进入指定用户的动态页面时，调用该接口

#### API  
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

```cs

```

  </TabItem>
</Tabs>

#### 示例代码
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

```cs

```

  </TabItem>
</Tabs> -->

## 6. 关闭动态页面

当游戏在特定场景下需要主动关闭动态窗口时调用
### 直接关闭  

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
TapMoment.close();
  ```

  </TabItem>

  <TabItem value="ios">

  ```objectivec
 [TapMoment close];
  ```
  </TabItem>
  <TabItem value="unity">

```cs
TapMoment.Close();
```

  </TabItem>
</Tabs>

### 弹出二次确认  

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
TapMoment.closeWithConfirmWindow(title, content);
  ```
  **参数说明**

字段 | 可为空 | 说明
| ------ | ------ | ------ |
title | 否 | 动态标题
content | 否 | 动态描述

参数为二次弹窗的标题和内容，默认为 "提示" 和 "匹配成功，进入游戏", 用户选择接口会通过回调 `CALLBACK_CODE_ClOSE_CANCEL`(50000) 和 `CALLBACK_CODE_ClOSE_CONFIRM`(50100) 通知游戏  
  </TabItem>

  <TabItem value="ios">

  ```objectivec
[TapMoment closeWithTitle:@"title" content:@"content" showConfirm:YES];
  ```
  **参数说明**

字段 | 可为空 | 说明
| ------ | ------ | ------ |
title | 否 | 动态标题
content | 否 | 动态描述
showConfirm | 否 | 是否显示确认弹窗

  </TabItem>
  <TabItem value="unity">

```cs
TapMoment.Close(title, desc);
```

**参数说明**

字段 | 可为空 | 说明
| ------ | ------ | ------ |
title | 否 | 动态标题
desc | 否 | 动态描述

  </TabItem>
</Tabs>

## 7. 注意事项
- 打开动态页面时，请先屏蔽游戏自身的声音，避免与动态内视频声音产生重合
- 如需要动态能支持横竖屏随设备自动旋转，需要游戏 app 自身能支持横竖屏 (Xcode 配置 Device Orientation)
- 小红点建议请求频率 1 次 / 1 分钟
- 动态内的背景图是可配置的，具体配置位置 [点击查看](/img/tap_moment_bg.png)，且需要等待审核，请提前配置
