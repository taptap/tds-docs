---
id: android-tapmoment
title: TapTapMoment
slug: /android-tapmoment
---
## method

### setCallback

设置动态发布回调  

**API**  

```java
public static void setCallback(TapTapMomentSdk.TapMomentCallback tapMomentCallback);
```

**示例代码**

```java
TapTapMomentSdk.setCallback(new TapTapMomentSdk.TapMomentCallback() {
  @Override
  public void onCallback(int code, String msg) {

  }
});
```

### setLoginToken

设置登录信息

**API**  

```java
public static void setLoginToken(AccessToken accessToken);
```

**示例代码**

```java
AccessToken currentAccessToken = AccessToken.getCurrentAccessToken();
TapTapMomentSdk.setLoginToken(currentAccessToken);
```

### openTapMoment

打开动态页面

**API**  

```java
public static void openTapMoment(TapTapMomentSdk.Config config);
```

**示例代码**

```java
TapTapMomentSdk.Config config = new TapTapMomentSdk.Config();
// config用来设置页面显示配置，包括显示方向等
TapTapMomentSdk.openTapMoment(config);
```

### publishMoment

发布动态

**API**  

```java
//发布普通动态，包括图片和描述
public static void publishMoment(TapTapMomentSdk.Config config, String imgPaths, String content);
//发布视频动态，包括视频和图片（图片可选）
public static void publishVideoMoment(TapTapMomentSdk.Config config, String[] videoPaths,String[] imgPaths, String title, String content);
```

**示例代码**

```java
//普通动态
TapTapMomentSdk.Config config = new TapTapMomentSdk.Config();
config.orientation = TapTapMomentSdk.ORIENTATION_DEFAULT;  
String content = "普通动态描述";
String[] imagePaths = new String[] { "content://***.jpg","/sdcard/**.jpg" };
TapTapMomentSdk.publishMoment(config, imagePaths, content);

//视频动态
TapTapMomentSdk.Config config = new TapTapMomentSdk.Config();
String[] imagePaths = new String[]{ "content://***.jpg","/sdcard/**.jpg" };
String[] videoPaths = new String[] { "content://***.mp4", "content://***.mp4" };
String title = "title";
String content = "content";
TapTapMomentSdk.publishVideoMoment(config, videoPaths, imagePaths, title, content);
//如果不需要上传封面图片，可调用如下接口
//TapTapMomentSdk.publishVideoMoment(config, videoPaths, title, content);
```

**参数说明**

| 字段         | 可为空 | 说明               |
| ---------- | --- | ---------------- |
| config     | 否   | 发布动态图片或者视频的横竖屏配置 |
| videoPaths | 否   | 视频文件路径，数组形式呈现    |
| imgPaths   | 是   | 视频封面图，可以不配置      |
| title      | 否   | 动态标题             |
| content    | 是   | 动态描述             |

### getNoticeData

获取用户新通知数量   

**API**  

```java
public static void getNoticeData();
```

**示例代码**

```java
TapTapMomentSdk.getNoticeData();
```

### openUserMoment

进入指定用户的动态页面

**API**  

```java
public static void openUserMoment(TapTapMomentSdk.Config config, String openId)
```

**示例代码**

```java
TapTapMomentSdk.Config config = new TapTapMomentSdk.Config();
config.orientation = TapTapMomentSdk.ORIENTATION_DEFAULT;  
TapTapMomentSdk.openUserMoment(config, openId);
```

**参数说明**

| 字段     | 可为空 | 说明                                                   |
| ------ | --- | ---------------------------------------------------- |
| openId | 否   | [openId获取方式](./api/android-tapdb.md/#tap登录后openid获取方式) |

### closeMoment

关闭动态页面

**API**  

```java
//直接关闭
public static void closeMoment();

//确认关闭
public static void closeMoment(String title, String content);
```

**示例代码**

```java
//直接关闭
TapTapMomentSdk.closeMoment();

//确认关闭
TapTapMomentSdk.closeMoment(title, content);
```

**参数说明**

| 字段      | 可为空 | 说明   |
| ------- | --- | ---- |
| title   | 否   | 动态标题 |
| content | 否   | 动态描述 |
