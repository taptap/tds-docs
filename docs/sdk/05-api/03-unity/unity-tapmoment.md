---
id: unity-tapmoment
title: TapMoment
---
## method


### SetCallback
设置动态回调

#### API

```cs
public static void SetCallback (Action<int, string> callback);
```

#### 示例代码

```cs
TapMoment.SetCallback((code,msg)=>{
    Debug.Log(code+"---"+msg);
});
```

<!-- ### SetLoginToken
设置登录信息

#### API

```cs
public static void SetLoginToken(string accessToken);
```

#### 示例代码

```cs
TapLogin.GetCurrentAccessToken((token)=>{
    TapMoment.SetLoginToken(token.toJSON());
});
``` -->

### Open
打开动态页面

#### API

```cs
public static void Open (Orientation config);
```

#### 示例代码

```cs
TapMoment.Open(TapSDK.Orientation.ORIENTATION_LANDSCAPE);
```

| 字段     | 可为空 | 说明                                                   |
| ------ | --- | ---------------------------------------------------- |
| Orientation | 否   |ORIENTATION_LANDSCAPE: 横屏，ORIENTATION_PORTRAIT: 竖屏 |

### Publish

#### API

```cs
public static void Publish (Orientation config, string[] imagePaths, string content);
```

#### 示例代码

```cs
string content = "我是描述";
string[] images = {"imgpath01","imgpath02","imgpath03"};
TapMoment.Publish(Orientation.ORIENTATION_LANDSCAPE, images, content);
```

<!-- ### PublishVideoMoment
发布视频动态

#### API

```cs
// 带封面
public static void PublishVideoMoment(Orientation config, string[] videoPaths, string[] imagePaths, string title, string desc)

// 不带封面
public static void PublishVideoMoment(Orientation config, string[] videoPaths, string title, string desc)
```

#### 示例代码

```cs
// 带封面
string[] images = {"imgpath01","imgpath02","imgpath03"};
string[] videos = {"videop01","videop02","videop03"};
string title = "我是动态";
string desc = "我是描述";
TapMoment.PublishVideoMoment(TapSDK.Orientation.ORIENTATION_LANDSCAPE, videos,images,title,desc);

// 不带封面
string[] images = {"imgpath01","imgpath02","imgpath03"};
string[] videos = {"videop01","videop02","videop03"};
string title = "我是动态";
string desc = "我是描述";
TapMoment.PublishVideoMoment(TapSDK.Orientation.ORIENTATION_LANDSCAPE, videos,title,desc);
``` -->

### FetchNotification
获取用户新增通知

#### API

```cs
public static void FetchNotification ();
```

#### 示例代码

```cs
TapMoment.FetchNotification();
```

### Close
关闭动态

#### API

```cs
// 直接关闭
public static void Close ();

// 确认关闭
public static void Close (string title, string desc);
```

#### 示例代码

```cs
// 直接关闭
TapMoment.Close();

// 确认关闭
TapMoment.Close(title, desc);
```
**参数说明**

| 字段      | 可为空 | 说明   |
| ------- | --- | ---- |
| title   | 否   | 弹窗标题 |
| desc | 否   | 弹窗描述 |


### SetGameScreenAutoRotate
设置游戏页面旋转角度

#### API

```cs
public static void SetGameScreenAutoRotate (bool auto);
```

#### 示例代码

```cs
TapMoment.SetGameScreenAutoRotate(true);
```


## 回调
| code | 说明       |
| --- | -------- |
| 10000   | 动态发布成功     |
| 10100   | 动态发布失败     |
| 10200   | 关闭动态发布页面     |
| 20000   | 获取新消息成功 |
| 20100   | 获取新消息失败 |
| 30000   | 动态页面打开 |
| 30100   | 动态页面关闭 |
| 50000   | 取消关闭所有动态界面（弹框点击取消按钮） |
| 50100   | 确认关闭所有动态界面（弹框点击确认按钮） |
| 60000   | 动态页面内登录成功 |
