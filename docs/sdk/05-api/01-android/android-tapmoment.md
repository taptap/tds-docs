---
id: android-tapmoment
title: TapMoment
---
## method

### setCallback

设置动态发布回调  

#### API  

```java
public static void setCallback(TapMoment.TapMomentCallback tapMomentCallback);
```

#### 示例代码

```java
TapMoment.setCallback(new TapMoment.TapMomentCallback() {
  @Override
  public void onCallback(int code, String msg) {

  }
});
```
<!--
### setLoginToken

设置登录信息

#### API  

```java
public static void setLoginToken(AccessToken accessToken);
```

#### 示例代码

```java
AccessToken currentAccessToken = AccessToken.getCurrentAccessToken();
TapTapMomentSdk.setLoginToken(currentAccessToken);
``` -->

<!-- ### openTapMoment

打开动态页面

#### API  

```java
public static void openTapMoment(TapTapMomentSdk.Config config);
```

#### 示例代码

```java
TapTapMomentSdk.Config config = new TapTapMomentSdk.Config();
//config 用来设置页面显示配置，包括显示方向等
TapTapMomentSdk.openTapMoment(config);
``` -->

### open

打开动态页面

#### API  

```java
/**
 * @param orientation 设置动态显示方向
 * {TapMoment.ORIENTATION_PORTRAIT、TapMoment.ORIENTATION_PORTRAIT}
 */
public static void open(int orientation);
```

#### 示例代码

```java
TapMoment.open(TapMoment.ORIENTATION_PORTRAIT);
```


### publish

发布普通动态，包括图片和描述

#### API  

```java
public static void publish(int orientation, String[] imagePath, String content);
```
** 参数说明 **

| 字段         | 可为空 | 说明               |
| ---------- | --- | ---------------- |
| orientation | 否   | 发布动态时横竖屏配置 |
| imgPaths   | 是   | 动态图片地址      |
| content    | 是   | 动态描述             |

#### 示例代码

```java
int orientation = TapMoment.ORIENTATION_PORTRAIT;
String content = "发布动态内容描述";
String[] imagePaths = new String[]{"content://***.jpg", "/sdcard/**.jpg"};
TapMoment.publish(orientation, imagePaths, content);
```

<!-- ### publishVideoMoment

发布视频动态

#### API  

```java
// 发布视频动态，包括视频和图片（图片可选）
public static void publishVideoMoment(TapTapMomentSdk.Config config, String[] videoPaths,String[] imgPaths, String title, String content);
```

#### 示例代码

```java
TapTapMomentSdk.Config config = new TapTapMomentSdk.Config();
String[] imagePaths = new String[]{ "content://***.jpg","/sdcard/**.jpg" };
String[] videoPaths = new String[] { "content://***.mp4", "content://***.mp4" };
String title = "title";
String content = "content";
TapTapMomentSdk.publishVideoMoment(config, videoPaths, imagePaths, title, content);
// 如果不需要上传封面图片，可调用如下接口
//TapTapMomentSdk.publishVideoMoment(config, videoPaths, title, content);
```

** 参数说明 **

| 字段         | 可为空 | 说明               |
| ---------- | --- | ---------------- |
| config     | 否   | 发布动态图片或者视频的横竖屏配置 |
| videoPaths | 否   | 视频文件路径，数组形式呈现    |
| imgPaths   | 是   | 视频封面图，可以不配置      |
| title      | 否   | 动态标题             |
| content    | 是   | 动态描述             | -->

### fetchNotification

获取用户新通知数量   

#### API  

```java
public static void fetchNotification();
```

#### 示例代码

```java
TapMoment.fetchNotification();
```

<!-- ### openUserMoment

进入指定用户的动态页面。

#### API  

```java
public static void openUserMoment(TapTapMomentSdk.Config config, String userId)
```

#### 示例代码

```java
TapTapMomentSdk.Config config = new TapTapMomentSdk.Config();
config.orientation = TapTapMomentSdk.ORIENTATION_DEFAULT;  
TapTapMomentSdk.openUserMoment(config, userId);
```

** 参数说明 **

| 字段     | 可为空 | 说明                                                   |
| ------ | --- | ---------------------------------------------------- |
| userId | 否   | xd 的 userId，非 TapTap 的 userId | -->

### close

关闭动态页面

#### API  

```java
// 直接关闭
public static void close();

// 确认关闭
public static void closeWithConfirmWindow(String title, String content)
```

#### 示例代码

```java
// 直接关闭
TapMoment.close();

// 确认关闭
TapMoment.closeWithConfirmWindow(title, content);
```

** 参数说明 **

| 字段      | 可为空 | 说明   |
| ------- | --- | ---- |
| title   | 否   | 动态标题 |
| content | 否   | 动态描述 |


### getSdkVersion

获取动态功能的版本信息，** 注意 ** 并非是 TapSDK version。此 API 不建议调用

#### API  

```java
public static String getSdkVersion()
```

#### 示例代码

```java
String sdkVersion = TapMoment.getSdkVersion();
```


## 回调
| 字段          | code | 说明       |
| ----------- | --- | -------- |
| CALLBACK_CODE_PUBLISH_SUCCESS       | 10000   | 动态发布成功     |
| CALLBACK_CODE_PUBLISH_FAIL     | 10100   | 动态发布失败     |
| CALLBACK_CODE_PUBLISH_CANCEL       | 10200   | 关闭动态发布页面     |
| CALLBACK_CODE_GET_NOTICE_SUCCESS | 20000   | 获取新消息成功 |
| CALLBACK_CODE_GET_NOTICE_FAIL | 20100   | 获取新消息失败 |
| CALLBACK_CODE_MOMENT_APPEAR | 30000   | 自己 / 好友动态页面打开 |
| CALLBACK_CODE_MOMENT_DISAPPEAR | 30100   | 自己 / 好友动态页面关闭 |
| CALLBACK_CODE_ClOSE_CANCEL | 50000   | 取消关闭所有动态界面（弹框点击取消按钮） |
| CALLBACK_CODE_ClOSE_CONFIRM | 50100   | 确认关闭所有动态界面（弹框点击确认按钮） |
| CALLBACK_CODE_LOGIN_SUCCESS | 60000   | 动态页面内登录成功 |

