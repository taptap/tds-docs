---
id: guide
title: 开发指南
sidebar_label: 开发指南
---


import MultiLang from '/src/docComponents/MultiLang';
import CodeBlock from '@theme/CodeBlock';
import sdkVersions from '/src/docComponents/sdkVersions';

本文介绍如何在游戏中加入 [TapTap 内嵌动态](/sdk/embedded-moments/features/)。使用内嵌动态功能需依赖 TapTap 登录，需要导入`TapMoment` 模块。

## SDK 获取

:::info
- 如果使用 [单纯的 TapTap 登录](/sdk/taptap-login/guide/tap-login/) 并接入内嵌动态，初始化和 SDK 获取请参考：[单纯的内嵌动态初始化](#单纯的内嵌动态初始化)。
:::

假设你已经在 [快速开始](/sdk/start/quickstart/#初始化) 部分完成了 SDK 初始化，可以通过 [下载](/tap-download) 获得 SDK，添加 `TapMoment` 模块：

<MultiLang>

<CodeBlock className="json">
{`"dependencies":{
  ...
  // 内嵌动态
  "com.taptap.tds.moment":"https://github.com/TapTap/TapMoment-Unity.git#${sdkVersions.taptap.unity}",
}`}
</CodeBlock>

<CodeBlock className="groovy">
{`repositories{  
    flatDir {  
        dirs 'libs'  
    }  
}  
dependencies {  
    ... 
    implementation (name:'TapMoment_${sdkVersions.taptap.android}', ext:'aar') // TapTap 内嵌动态
}`}
</CodeBlock>

<CodeBlock className="objectivec">
{`// 内嵌动态
TapMomentResource.bundle
TapMomentSDK.framework
`}
</CodeBlock>

</MultiLang>

## 设置回调

设置回调以获取动态的状态变化。

<MultiLang>

```cs
TapMoment.SetCallback((code, msg) => {
  Debug.Log(code + "---" + msg);
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
  NSLog (@"msg:%@, code:%i", msg, code);
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
CALLBACK_CODE_SCENE_EVENT | 70000   | 场景化入口回调 |

## 获取新消息

定时调用获取消息通知的接口，有新信息时可以在 TapTap 动态入口显示小红点，提醒玩家查看新动态。

<MultiLang>

```cs
TapMoment.FetchNotification();
```

```java
TapMoment.fetchNotification();
```

```objectivec
[TapMoment fetchNotification];
```

</MultiLang>

获取消息通知的结果会在本文刚开始设置的回调中返回，`code` 为 `CALLBACK_CODE_GET_NOTICE_SUCCESS`（`20000`）表示获取成功，`CALLBACK_CODE_GET_NOTICE_FAIL`（`20100`）表示获取失败。
获取成功时，`msg` 为新消息数量，`0` 表示没有新消息。

:::tip
为了方便玩家查看好友动态、游戏公告等，我们建议将 TapTap 动态入口放在显眼的位置，**每分钟调用 1 次**获取消息通知的接口。

获取消息通知时，如果没有新消息（`msg` 为 `0`），那么游戏需要清除界面上的小红点。
同样，打开 TapTap 动态页面后，游戏也需要清除界面上的小红点。
:::
## 显示动态页面

在游戏中显示 TapTap 动态页面，在这个页面，玩家不仅可以查看动态，还能发布新动态。

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


:::note
打开动态页面时，请先屏蔽游戏自身的声音，以免干扰动态内的视频声音。

如需要动态能支持横竖屏随设备自动旋转，需要游戏自身能支持横竖屏。

如前所述，打开动态页面后别忘了清除动态页面入口处的小红点。
:::

动态页面的背景图可以配置，步骤如下图所示。
背景图需要人工审核后才能生效，请预留充足的时间。

![](/img/tap_moment_bg.png)


## 场景化入口

打开动态页面跳转到指定的页面

<MultiLang>

```cs
var sceneDic = new Dictionary<string, object>() { { TapMomentConstants.TapMomentPageShortCutKey, sceneId } };
TapMoment.DirectlyOpen(Orientation.ORIENTATION_DEFAULT, TapMomentConstants.TapMomentPageShortCut, sceneDic);
```

```java
Map<String, String> extras = new HashMap<>();
// 注意：这里的 key 是固定的，"scene_id"； 第二个参数：开发者后台开启场景化入口并配置相关项后可以得到
extras.put("scene_id", "xxxx");
// 注意：第二个参数固定为 "tap://moment/scene/" 
TapMoment.directlyOpen(TapMoment.ORIENTATION_DEFAULT,"tap://moment/scene/", extras);
```

```objectivec
TapMomentConfig *mConfig = TapMomentConfig.new;
mConfig.orientation = TapMomentOrientationDefault;
[TapMoment directlyOpen:mConfig page:TapMomentPageShortcut extras:@{ TapMomentPageShortcutKey: @"sceneid" }];
```

</MultiLang>

#### 参数说明
参数           | 说明       |
 ----------- | -------- |
orientation    |    打开方向  |
page    |    固定为 TapMomentConstants.TapMomentPageShortCut  |
Dictionary     | 其中 TapMomentConstants.TapMomentPageShortCutKey 固定，第二个参数为要需要跳转的页面 id     |

### 场景化入口回调格式说明

**SDK 回调结构**

字段名           | 值类型       |required       | 说明       |
 ----------- | -------- |-------- |-------- |
sceneId    |  字符串    | 是 | 场景化入口 ID |
eventType    |   字符串   | 是 | 枚举的事件类型，如 VIEW，FORWARD，VOTE 等 |
eventPayload     |   字符串   | 是 | 根据类型自定义的 JSON 字符串 |
timestamp     |   整数   |  是 | unix 时间戳，ms |

**事件类型**

eventType            | eventPayload (未序列化)       | 说明
 ----------- | -------- | -------- |
 READY  |    {}  | 已成功落地，将在 dom 挂载时触发（获取数据之前） |
REPOST    |    {}  | 转发 | 
VOTE     | { isCancel: boolean }     | 点赞（含是否取消），仅帖子本身 |
FOLLOW     | { isCancel: boolean }     | 关注（含是否取消），仅帖子本身 |
COMMENT     | {}    | 评论，仅帖子本身 |

## 关闭动态页面

玩家可以在动态页面退出。
但在特定场景下，游戏可能需要主动关闭动态页面。

比如，玩家排位等待结束，准备进入对局时提示玩家关闭动态页面，玩家确认后关闭。

<MultiLang>

```cs
TapMoment.Close("提示", "匹配成功，进入游戏");
```

```java
TapMoment.closeWithConfirmWindow("提示", "匹配成功，进入游戏");
```

```objectivec
[TapMoment closeWithTitle:@"提示" content:@"匹配成功，进入游戏" showConfirm:YES];
```

</MultiLang>

用户的选择会通过回调返回：

- `CALLBACK_CODE_ClOSE_CANCEL`（50000），表示玩家点了「取消」，选择不关闭动态页面。
- `CALLBACK_CODE_ClOSE_CONFIRM`（50100），表示玩家点了「确认」，选择关闭动态页面。

如果需要直接关闭动态窗口，不弹出二次确认框：

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

## 一键发布

:::info
这是可选功能，请根据项目需求决定是否在游戏中加入这一功能。
:::

我们推荐游戏让玩家直接在动态页面发布新动态。
不过，SDK 也提供了发布图文动态的 API，以支持「一键发动态」等需求。
图文动态包括单张或多张图片及相应的文字内容。

<MultiLang>

```cs
string content = "我是描述";
string[] images = {"imgpath01","imgpath02","imgpath03"};
TapMoment.Publish(Orientation.ORIENTATION_LANDSCAPE, images, content);
```

```java
int orientation = TapMoment.ORIENTATION_PORTRAIT;
String content = "描述";
String[] imagePaths = new String[]{"content://hello.jpg", "/sdcard/world.jpg"};
TapMoment.publish(orientation, imagePaths, content);
```

```objectivec
TapMomentConfig * tconfig = TapMomentConfig.new;
tconfig.orientation = TapMomentOrientationDefault;

TapMomentImageData *postData = TapMomentImageData.new;
postData.images = @[@"file://..."];
postData.content = @"我是图片描述";
[TapMoment publish:tconfig content:(postData)];
```

</MultiLang>

:::info
玩家在动态页面可以发布图文动态和视频动态。
「一键发布」只支持发布图文动态。
:::

## 单纯的内嵌动态初始化

这里 SDK 获取及初始化，仅供使用 [单纯的 TapTap 登录](/sdk/taptap-login/guide/tap-login/) 的开发者参考。

请先 [下载](/tap-download) SDK，并添加相关依赖。内嵌动态功能依赖 `TapLogin`、`TapCommon` 和 `TapMoment` 模块。

<MultiLang>

<CodeBlock className="json">
{`"dependencies":{
  "com.taptap.tds.login":"https://github.com/TapTap/TapLogin-Unity.git#${sdkVersions.taptap.unity}",
  "com.taptap.tds.common":"https://github.com/TapTap/TapCommon-Unity.git#${sdkVersions.taptap.unity}",
  "com.taptap.tds.moment":"https://github.com/TapTap/TapMoment-Unity.git#${sdkVersions.taptap.unity}",
}`}
</CodeBlock>

<CodeBlock className="groovy">
{`repositories{  
    flatDir {  
        dirs 'libs'  
    }  
}  
dependencies {  
    ...
    implementation (name:'TapCommon_${sdkVersions.taptap.android}', ext:'aar') // 必选：TapSDK 基础库 
    implementation (name:'TapLogin_${sdkVersions.taptap.android}', ext:'aar') // 必选：TapTap 登录  
    implementation (name:'TapMoment_${sdkVersions.taptap.android}', ext:'aar') // TapTap 内嵌动态
}`}
</CodeBlock>

<CodeBlock className="objectivec">
{`// 基础库
TapCommonSDK.framework
TapLoginSDK.framework
// 内嵌动态
TapMomentResource.bundle
TapMomentSDK.framework
`}
</CodeBlock>

</MultiLang>


请确认完成了 [单纯 TapTap 登录的初始化](/sdk/taptap-login/guide/start/#初始化)。

内嵌动态功能的**初始化**示例如下：

<MultiLang>
<>

```cs
TapMoment.Init(string clientID);
```

**参数说明**

参数  | 描述
| ------ | ------ |
clientID | TapTap 开发者中心对应游戏的 Client ID。

</>
<>

```java
TapMoment.init(Context context, String clientID);
```

**参数说明**

参数  | 描述
| ------ | ------ |
context | 上下文，一般是当前 Application。
clientID | TapTap 开发者中心对应游戏的 Client ID。

</>
<>

```objectivec
[TapMoment initWithClientID:@"your clientId"];
```
**参数说明**

参数  | 描述
| ------ | ------ |
clientId | TapTap 开发者中心对应应用的 Client ID

</>


</MultiLang>
