---
id: tap-support
title: 客服系统
slug: /sdk/tap-support/guide/
---

import MultiLang from '/src/docComponents/MultiLang';

本文介绍如何在游戏中接入 TDS 提供的客服系统 SaaS 服务。
为了兼容尽可能多的游戏，目前 SDK 只生成网页地址，游戏需要自己加载 webview。

## SDK 初始化


可以在 [下载页](/tap-download) 获得 SDK，引入 `TapSupport` 模块：

<MultiLang>

<>

TapSupport SDK 可独立运行：

```cs
"dependencies":{
  ...
  "com.taptap.tds.support": "https://github.com/TapTap/TapSupport-Unity.git#3.3.0",
}
```

</>
<>

TapSupport SDK 依赖 TapCommon 模块：

```java
repositories{  
    flatDir {  
        dirs 'libs'  
    }  
}  

dependencies {  
    ... 
    implementation name:'TapCommon_3.3.0', ext:'aar'
    implementation (name:'TapSupport_3.3.0', ext:'aar')
}  
```

确认 `AndroidManifest.xml` 已添加网络权限：

```java
<uses-permission android:name="android.permission.INTERNET"></uses-permission>
```

</>
<>


TapSupport SDK 依赖 TapCommon 模块：

```objc
TapCommonSDK.framework
TapSupportSDK.framework
```

</>
</MultiLang>


客服系统是厂商维度的，游戏在接入客服系统时需要提交工单联系我们绑定一个域名。

<MultiLang>

```cs
using TapTap.Support;

TapSupport.Init("https://please-replace-with-your-customized.domain.com", "-", new TapSupportCallback
{
       UnReadStatusChanged = (hasUnRead, exception) =>
       {
          Debug.Log($"hasUnRead:{hasUnRead} exception:{exception}");
       }
});
```

```java
import com.tds.tapsupport.TapSupport;
import com.tds.tapsupport.TapSupportCallback;
import com.tds.tapsupport.TapSupportConfig;

TapSupportConfig config = new TapSupportConfig("https://please-replace-with-your-customized.domain.com", "-", new TapSupportCallback() {
    @Override
    public void onGetUnreadStatusError(Throwable e) {}

    @Override
    public void onUnreadStatusChanged(boolean hasUnread) {}
});
TapSupport.setConfig(this, config);
```

```objc
#import <TapSupportSDK/TapSupportSDK.h>

// callback 需要实现 TapSupportDelegate 
TapSupportConfig *config = [TapSupportConfig new];
config.server = @"https://please-replace-with-your-customized.domain.com";
config.rootCategoryID = @"-";
config.callback = self;
[TapSupport shareInstance].config = config;
```

</MultiLang>

上述代码示例中，`please-replace-with-your-customized.domain.com` 就是绑定的域名，`-` 表示显示客服系统所有的分类。
如前所述，客服系统是厂商维度的，因此我们建议**开发者用客服系统的一级分类来区分不同的游戏**。
所以，一般来说，**初始化 SDK 时，开发者需要用对应当前游戏的一级分类 ID 来替换 `-`**。
具体的一级分类 ID 可以在客服系统后台的工单分类详情页面（**客服后台右上角 > 设置 > 客服设置 > 工单分类**）找到。


## 登录

当前版本仅支持匿名登录，未来计划支持与游戏现有的账号系统关联登录。

开发者可以自行维护匿名登录的 UUID，**客服系统不关心这个匿名 ID 的来源，也不会进行任何的校验，这也意味着丢失了这个 ID 则无法访问历史工单，泄露了这个 ID 则历史工单也会被泄露**。
因此，开发者需确保匿名 ID 满足以下条件：

- **用户唯一且不会变**
- **无法被猜测到、无法枚举**
- **不会被用户通过分享或截图等方式泄露**

<MultiLang>

```cs
TapSupport.AnonymousLogin("uuid");
```

```java
TapSupport.loginAnonymously("uuid");
```

```objc
[TapSupport loginAnonymously:@"uuid"];
```

</MultiLang>

如 `uuid` 为空，SDK 会自动生成一个 UUID，并保存在本地。
这个 UUID 可以通过以下接口获取：

<MultiLang>

```cs
string anonymousId = TapSupport.GetAnonymousId();
```

```java
String anonymousId = TapSupport.getInstance().getAnonymousId();
```

```objc
NSString *anonymousId =  [TapSupport shareInstance].anonymousId;
```

</MultiLang>

获取自动生成的 UUID 后**需要将该 UUID 保存至云端**，比如游戏自己的服务器，**否则玩家卸载游戏会导致保存在本地的 UUID 丢失，之后无法访问历史工单**。

## 生成工单 URL

工单 URL 的构成是这样的:

```
https://{your-domain}/in-app/v1/categories/{rootCategoryID}{path}
```

其中：

- `your-domain` 是之前绑定的自定义域名。

- `rootCategoryID` 是一级分类 ID，通常对应于同一厂商下的不同游戏。

- `path` 是客服系统的路径，常用的路径有：

      * `/` 落地页，会展示客服配置的常见问题（如有），工单列表入口，以及工单分类（供发起新工单）。一般应用内的客服入口会指到这个页面。
      * `/tickets` 用户工单列表页，可以看到用户所有历史工单。
      * `/tickets/new?category_id={id}` 提交新工单的页面，一般是用户从落地页选择分类之后自动跳转过去，也可以由应用带着指定的 `category_id` 直接打开。`category_id` 的值可以在客服系统后台的工单分类详情页面找到（**客服后台右上角 > 设置 > 客服设置 > 工单分类**）。

如前所述，目前游戏需要自己加载 webview。
不过 SDK 提供了接口帮助生成工单 URL。

<MultiLang>

```cs
string webUrl = TapSupport.GetSupportWebUrl("path");
```

```java
String webUrl = TapSupport.getSupportWebUrl("path");
```

```objc
NSString *webUrl = [TapSupport getSupportWebUrl:@"path"];
```

</MultiLang>

`path` 为空时 SDK 会生成客服系统落地页的 URL，等价于 `/`。

工单支持在 URL hash 中传入设备、用户相关的信息。
这些信息可以在打开（任意）工单页面时带上，在提交工单时会与该工单关联。
这些信息分为两类：

- 仅客服可见的 `meta` 信息。最常见的如设备机型、网络状况、用户的一些配置：`{url}#meta={"key":"value"}`（仅为示意，实际构造 URL 时需 encode）。
- 用户可见、可修改的 `fields` 信息。工单可以通过让用户填写表单，收集一些结构化的信息。这些信息也可以通过 URL 参数来预填写：`{url}#fields={"id": "value"}`（仅为示意，实际构造 URL 时需 encode）。其中的 `id` 可以在客服系统后台的字段设置页面找到（**客服后台右上角 > 设置 > 客服设置 > 工单字段**）。

<MultiLang>

```cs
Dictionary<string, object> meta = new Dictionary<string, object>();
meta.Add("OS", "iOS 15.1");
meta.Add("Network", "WiFi");

Dictionary<string, object> fields = new Dictionary<string, object>();
fields.Add("60d18c10d604b86f6cd5ba60", "hi@exmaple.com"); // 联系方式

string webUrl = TapSupport.GetSupportWebUrl("/tickets/new?category_id=6077c0f104ea8479a395c54f", meta, fields); 
```

```java
Map<String, Object> meta = new HashMap<>();
meta.put("OS", "iOS 15.1");
meta.put("Network", "WiFi");

Map<String, Object> fields = new HashMap<>();
fields.put("60d18c10d604b86f6cd5ba60", "hi@exmaple.com"); // 联系方式

String webUrl = TapSupport.getSupportWebUrl("path", meta, fields);
```

```objc
NSDictionary *meta = @{@"OS":@"iOS 15.1", @"Network":@"WiFi"};
NSDictionary *fields = @{@"60d18c10d604b86f6cd5ba60":@"hi@exmaple.com"}; // 联系方式
NSString *webUrl = [TapSupport getSupportWebUrl:@"path" metaData:meta fieldsData:fields];
```

</MultiLang>

你也可以通过以下接口设置一些默认的 `meta`、`fields` 信息：（`meta`、`fields` 的声明见上）

<MultiLang>

```cs
TapSupport.SetDefaultMetaData(meta);
TapSupport.SetDefaultFieldsData(fields);
string webUrl = TapSupport.GetSupportWebUrl("path");
```

```java
TapSupport.setDefaultMetaData(meta);
TapSupport.setDefaultFieldsData(fields);
String webUrl = TapSupport.getSupportWebUrl("path");
```

```objc
[TapSupport shareInstance].defaultMetaData = meta;
[TapSupport shareInstance].defaultFieldsData = fields;
NSString *webUrl = [TapSupport getSupportWebUrl:@"path"];
```

</MultiLang>

注意，**如果调用 `GetSupportWebUrl` 方法时传入了非空的 `meta`、`fields` 参数，那么设置的默认 `meta`、`fields` 信息不会生效。**

## 未读通知

玩家成功登录且打开工单 webview 后，就可以调用 `FetchUnReadStatus` 方法查询当前是否有未读工单。
如有未读工单，则会调用初始化时传入的回调函数。

<MultiLang>

```cs
bool hasUnreads = await TapSupport.FetchUnReadStatus();
```

```java
TapSupport.fetchUnreadStatus();
```

```objc
[TapSupport fetchUnreadStatus];
```

</MultiLang>

你可以基于这一接口自行实现轮询策略，不过 SDK 提供了默认的自动轮询机制。
调用 `Resume` 可以开启/恢复自动轮询，调用 `Pause` 则会中断自动轮询。

<MultiLang>

```cs
TapSupport.Resume();
TapSupport.Pause();
```

```java
TapSupport.resume();
TapSupport.pause();
```

```objc
[TapSupport resume];
[TapSupport pause];
```

</MultiLang>


SDK 提供的自动轮询策略为 10s 一次，如果没有未读消息则增加 10s 间隔时间，直到最大间隔时间 300s。
一旦轮询到未读消息，则间隔重置为 10s
另外，调用 `Pause`、`Resume` 方法都会重置轮询间隔时间为 10s。

注意，如果玩家没有成功登录，或者之前从未打开工单 webview，那么轮询会一直返回错误，因为客服系统尚未关联这个用户。