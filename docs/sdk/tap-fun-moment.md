---
id: tap-fun-moment
title: 内嵌动态
sidebar_label: 内嵌动态
---


import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {Highlight} from '../component';
import MultiLang from '@theme/MultiLang';

本文主要介绍动态相关的使用方式，详细产品介绍请参考 [动态产品介绍](/pro/pro-moment)

## 1. 介绍
内嵌动态基于 TapTap 内容社区的功能和游戏本身的账号系统的更多融合，成功接入内嵌动态 SDK 后玩家即可通过游戏直接访问 TapTap 内容和自带功能。同时内嵌动态 SDK 也为游戏打造个性化内容或服务提供了开放功能。

## 2. 设置回调
设置动态回调，用于获取动态的状态变化

#### API

<MultiLang>

```cs
public static void SetCallback (Action<int, string> callback);
```

```java
public static void setCallback(TapMoment.TapMomentCallback tapMomentCallback);
```
 

  ```objectivec
+ (void)setDelegate:(id <TapMomentDelegate>)delegate;
  ```
 </MultiLang>


#### 示例代码
<MultiLang>

```cs
TapMoment.SetCallback((code,msg)=>{
    Debug.Log(code+"---"+msg);
});
```

  ```java
TapMoment.setCallback(new TapMoment.TapMomentCallback() {
    @Override
    public void onCallback(int code, String msg) {

    }
});
  ```


```objectivec
@interface ViewController ()<TapMomentDelegate>
@end

[TapMoment setDelegate:self];
- (void)onMomentCallbackWithCode:(NSInteger)code msg:(NSString *)msg
{
  NSLog (@"msg:%@, code:%i" ,msg, code);
}  
```
 


 </MultiLang>

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


  ```java
TapTapMomentSdk.setLoginToken(AccessToken);
  ```


  ```objectivec
+ (void)setAccessToken:(TDSMomentAccessToken *)token;
  ```
 

```cs
public static void SetLoginToken(string accessToken);
```



#### 示例代码


  ```java
AccessToken currentAccessToken = AccessToken.getCurrentAccessToken();
TapTapMomentSdk.setLoginToken(currentAccessToken);
  ```


  ```objectivec
[TDSMomentSdk setAccessToken:[TDSMomentAccessToken build:[[TapLoginHelper currentAccessToken]toJsonString]]];
  ```
 

```cs
TapSDK.TDSLogin.GetCurrentAccessToken((token)=>{
    TapSDK.TDSMoment.SetLoginToken(token.toJSON());
});
```

 -->


## 3. 打开动态页面
在游戏中，显示游戏动态页面。
> <Highlight color='#f00'> 打开动态页面时，请先屏蔽游戏自身的声音，避免与动态内视频声音产生重合 </Highlight>    

> <Highlight color='#f00'> 如需要动态能支持横竖屏随设备自动旋转，需要游戏 app 自身能支持横竖屏 (Xcode 配置 Device Orientation)</Highlight>  


:::caution
**截止到此步骤，2、3 步为必要步骤**
:::

#### API  

<MultiLang>

```cs
public static void Open (Orientation config);
```

  ```java
/**
 * @param orientation 设置动态显示方向
 * {TapMoment.ORIENTATION_PORTRAIT、TapMoment.ORIENTATION_PORTRAIT}
 */
public static void open(int orientation);
  ```


  ```objectivec
+ (void)open:(TapMomentConfig *)config;
  ```
 
 </MultiLang>


#### 示例代码
<MultiLang>

```cs
TapMoment.Open(TapSDK.Orientation.ORIENTATION_LANDSCAPE);
```

```java
TapMoment.open(TapMoment.ORIENTATION_PORTRAIT);
```


```objectivec
TapMomentConfig *mConfig = TapMomentConfig.new;
mConfig.orientation = TapMomentOrientationDefault;
[TapMoment open:mConfig];
```
 

 </MultiLang>


## 4. 发布动态

普通动态包括图片和对应的内容描述

#### API   
<MultiLang>

```cs
public static void Publish (Orientation config, string[] imagePaths, string content);
```

```java
public static void publish(int orientation, String[] imagePath, String content);
```


```objectivec
+ (void)publish:(TapMomentConfig *_Nonnull)config
      content:(TapMomentPostData *_Nonnull)content;
```
 
</MultiLang>


#### 示例代码
<MultiLang>

```cs
string content = "我是描述";
string[] images = {"imgpath01","imgpath02","imgpath03"};
TapMoment.Publish(Orientation.ORIENTATION_LANDSCAPE, images, content);
```

  ```java
int orientation = TapMoment.ORIENTATION_PORTRAIT;
String content = "发布动态内容描述";
String[] imagePaths = new String[]{"content://***.jpg", "/sdcard/**.jpg"};
TapMoment.publish(orientation, imagePaths, content);
  ```


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
 
</MultiLang>




<!-- ### 发布视频动态

视频动态包括视频和图片（可选）

#### API  


  ```java
  TapTapMomentSdk.publishVideoMoment(TapTapMomentSdk.Config config, String[] videoPaths,
  String[] imagePaths, String title, String content);
  ```


  ```objectivec
  + (void)openPostMomentPageWithContent:(TDSPostMomentData * _Nonnull)content
                                 config:(TDSMomentConfig * _Nonnull)config;
  ```
 

```cs
// 带封面
public static void PublishVideoMoment(Orientation config, string[] videoPaths, string[] imagePaths, string title, string desc)

// 不带封面
public static void PublishVideoMoment(Orientation config, string[] videoPaths, string title, string desc)
```



#### 示例代码


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
<MultiLang>

```cs
public static void FetchNotification ();
```


```java
public static void fetchNotification();
```

```objectivec
+ (void)fetchNotification;
```

</MultiLang>

结果在注册的回调中返回。  
`code == CALLBACK_CODE_GET_NOTICE_SUCCESS`(20000) 表示获取成功，`msg` 为 0 表示无新消息，非 0 表示新消息数量。   
`CALLBACK_CODE_GET_NOTICE_FAIL`(20100) 表示获取失败


<!-- ## 7. 进入好友动态主页

当游戏需要进入指定用户的动态页面时，调用该接口

#### API  


  ```java
TapTapMomentSdk.openUserMoment(TapTapMomentSdk.Config config, String openId);
  ```


  ```objectivec
+ (void)openUserCenterWithConfig:(TDSMomentConfig *)config userId:(NSString *)userId;
  ```
 

```cs

```



#### 示例代码


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
 

```cs

```

 -->

## 6. 关闭动态页面

当游戏在特定场景下需要主动关闭动态窗口时调用
### 直接关闭  

该接口会直接关闭动态窗口，不会弹出二次确认弹窗，接口示例：

<MultiLang>

```cs
TapMoment.Close();
```

```java
TapMoment.close();
```



```objectivec
[TapMoment close];
```
 

</MultiLang>


### 弹出二次确认  

该接口会弹出二次确认弹窗，由用户确定是否关闭，示例如下：
<MultiLang>

```cs
TapMoment.Close(title, desc);
```
我是unity参数说明

```java
TapMoment.closeWithConfirmWindow(title, content);
```
我是android参数说明

```objectivec
[TapMoment closeWithTitle:@"title" content:@"content" showConfirm:YES];
```
我是ios参数说明

</MultiLang>

参数为二次弹窗的标题和内容，默认为 "提示" 和 "匹配成功，进入游戏", 用户选择接口会通过回调 `CALLBACK_CODE_ClOSE_CANCEL`(50000) 和 `CALLBACK_CODE_ClOSE_CONFIRM`(50100) 通知游戏  

**参数说明**

字段 | 可为空 | 说明
| ------ | ------ | ------ |
title | 否 | 动态标题
content | 否 | 动态描述
showConfirm | 否 | 是否显示确认弹窗



## 7. 注意事项
- 打开动态页面时，请先屏蔽游戏自身的声音，避免与动态内视频声音产生重合
- 如需要动态能支持横竖屏随设备自动旋转，需要游戏 app 自身能支持横竖屏 (Xcode 配置 Device Orientation)
- 小红点建议请求频率 1 次 / 1 分钟
- 动态内的背景图是可配置的，具体配置位置 [点击查看](/img/tap_moment_bg.png)，且需要等待审核，请提前配置
