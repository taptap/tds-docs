---
id: setup-objc
title: 数据存储、即时通讯 Objective-C SDK 配置 
sidebar_label: Objective-C SDK 配置
---

# 数据存储、即时通讯 Objective C SDK 配置指南

## 获取 SDK

获取 SDK 有多种方式，较为推荐的方式是通过包依赖管理工具下载最新版本。

### 包依赖管理工具安装

通过 [CocoaPods](https://cocoapods.org) 安装可以最大化地简化安装过程。

首先，确保开发环境中已经安装了最新版 `pod`。如果没有，请参考官网的 [INSTALL](https://cocoapods.org) 文档。

接着，在项目根目录下通过命令行工具执行下列命令生成 `Podfile` 文件：

```sh
$ pod init
```

参考 [GET STARTED](https://cocoapods.org) 文档，在 `Podfile` 文件中的 `target` 里添加以下 pod 依赖：

```ruby
pod 'LeanCloudObjc'   # 集成所有服务模块
```

`LeanCloudObjc` 包含多个 Subspecs。如果只需要部分功能，可以按需选择：

```ruby
pod 'LeanCloudObjc/Foundation'    # 数据存储、短信、推送、云引擎等基础服务模块
pod 'LeanCloudObjc/Realtime'      # 即时通讯、LiveQuery 模块
```

最后，在项目根目录下执行下列任意命令，集成最新的 SDK：

```sh
$ pod update
```

或者

```sh
$ pod install --repo-update
```

集成 SDK 成功后，使用项目根目录下 **`<项目名称>.xcworkspace`** 来打开项目。

### 手动安装

#### 下载源码

在 [SDK 下载页面][download-sdk]，下载最新版的源码。

[download-sdk]: https://releases.leanapp.cn/#/leancloud/objc-sdk/releases
#### 集成 SDK

将 `AVOS`/`AVOS.xcodeproj` 项目文件拖入示例项目，作为 subproject：

![「AVOS.xcodeproj」会出现在项目根目录下。](/img/quick_start/ios/subproject.png)

接着为示例项目连接依赖库，在 **xcodeproj > target > general > frameworks** 添加如下内容：

![「LeanCloudObjc.framework」](/img/quick_start/ios/link-binary.png)

这样就集成完毕了。

## 快速开始

### 绑定域名

你需要绑定 API 自定义域名，以便和其他厂商的应用隔离入口，避免其他应用受到 DDoS 攻击时相互牵连。
如果使用了文件服务，也需要绑定文件自定义域名。

进入 **开发者中心 > 你的游戏 > 游戏服务 > 技术服务 > 数据存储 > 服务设置 > 自定义域名** 点击「绑定新域名」按钮，根据控制台提示完成绑定步骤。
注意，DNS 解析记录和证书申请（如果选择了自动管理 SSL 证书）都需要一定时间，请耐心等待。

绑定成功后，初始化 SDK 时，请传入绑定的自定义域名（`https://please-replace-with-your-customized.domain.com`）。

如果你使用了文件服务（包括即时通讯的多媒体消息（图像、音频、视频等）），同样需要前往 **开发者中心 > 你的游戏 > 游戏服务 > 技术服务 > 数据存储 > 文件 > 设置 > 文件访问域名** 绑定域名，步骤和 API 自定义域名基本相同，但有两点不一样：

1. API 域名解析使用 A 记录，文件域名解析使用 CNAME 记录，也因此文件域名不支持绑定裸域名（例如 `example.com`），需要绑定子域名（例如 `files.example.com`）。
2. 绑定成功后，还需在 **文件 > 设置 > 文件访问地址** 点击「修改」按钮进行切换。

### 应用凭证

在 **开发者中心 > 你的游戏 > 游戏服务 > 基本信息** 可以查看应用凭证：

- **Client ID**，又称 App ID，在 SDK 初始化时用到。联系技术支持时，提供 Client ID 可以方便我们更快定位到你的应用。
- **Client Token**，又称 App Key，在 SDK 初始化时用到。
- **Server Secret**，又称 Master Key，用于在自有服务器、云引擎等**受信任环境**调用管理接口，具备跳过一切权限验证的超级权限。所以**一定注意保密，千万不要在客户端代码中使用该凭证**。

### 初始化

打开 `AppDelegate` 文件，导入基础模块头文件：

```objc
#import <LeanCloudObjc/Foundation.h>
```


然后在 `application:didFinishLaunchingWithOptions:` 方法中设置 App ID，App Key 以及服务器地址：

```objc
[LCApplication setApplicationId:@"your-client-id"
                      clientKey:@"your-client-token"
                serverURLString:@"https://please-replace-with-your-customized.domain.com"];
```

在使用 SDK 的 API 时，请确保进行了 Application 的 ID、Key 以及 Server URL 的初始化。


## 开启调试日志

在应用开发阶段，你可以选择开启 SDK 的调试日志（debug log）来方便追踪问题。调试日志开启后，SDK 会把网络请求、错误消息等信息输出到 IDE 的日志窗口，或是浏览器 Console 或是云引擎日志（如果在云引擎下运行 SDK）。

```objc
// 在 Application 初始化代码执行之前执行
[LCApplication setAllLogsEnabled:true];
```

详细调试流程可以参考 [Objective-C SDK 调试指南][objc-debug-guide]。

[objc-debug-guide]: https://forum.leancloud.cn/t/leancloud-sdk-objective-c-sdk/21851

注意，在应用发布之前，请关闭调试日志，以免暴露敏感数据。

## 验证

首先，确认本地网络环境是可以访问云端服务器的，可以执行以下命令：

```sh
curl "https://{{host}}/1.1/date"
```

`{{host}}` 为绑定的 API 自定义域名。

如果当前网路正常会返回当前时间：

```json
{"__type":"Date","iso":"2020-10-12T06:46:56.000Z"}
```

下面来试着向云端保存一条数据，将下面的代码拷贝到 `viewDidLoad` 方法或其它在应用运行时会被调用的方法中：

```objc
LCObject *testObject = [LCObject objectWithClassName:@"TestObject"];
[testObject setObject:@"Hello world!" forKey:@"words"];
[testObject save];
```

然后，点击 `Run` 运行调试，真机和虚拟机均可。

然后打开 **云服务控制台 > 数据存储 > 结构化数据 > `TestObject`**，如果看到数据表中出现一行「words」列的值为「Hello world!」的数据，说明 SDK 已经正确地执行了上述代码，配置完毕。

如果控制台没有发现对应的数据，请参考 [问题排查](#问题排查)。

## 问题排查

SDK 安装指南基于当前最新版本的 SDK 编写，所以排查问题前，请先检查下安装的 SDK 是不是最新版本。

### `401 Unauthorized`

如果 SDK 抛出 `401` 异常或者查看本地网络访问日志存在：

```json
{
  "code": 401,
  "error": "Unauthorized."
}
```

则可认定为 App ID 或者 App Key 输入有误，或者是不匹配，很多开发者同时注册了多个应用，导致拷贝粘贴的时候，用 A 应用的 App ID 匹配 B 应用的 App Key，这样就会出现服务端鉴权失败的错误。

### 客户端无法访问网络

客户端尤其是手机端，应用在访问网络的时候需要申请一定的权限。