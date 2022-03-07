{% from 'views/_parts.html' import
  supportEmail
%}

# 域名绑定指南

根据法律法规和有关部门的要求，使用云服务需要绑定自有域名。
绑定自有域名也有利于从域名层面做好应用隔离，确保业务稳定。

这篇指南假定你了解域名解析的基本知识，如果你不太熟悉这方面的内容，可以参考我们博客上的[这篇文章][basic]。

[basic]: https://leancloudblog.com/Domain-Name-Story-confirm/

本指南面向 LeanCloud 国内节点用户。
国际版不支持绑定文件域名和 API 域名，只支持绑定云引擎自定义域名，参见 [云引擎常见问题和解答](leanengine_faq.html#国际版云引擎必须绑定自定义域名吗_)。

## 自定义域名的种类

LeanCloud 国内节点服务涉及以下三种自定义域名：

| 域名种类   | 涉及服务                               | 备案 | 在 LeanCloud 备案或接入备案 | SSL  | 绑定目标 | 静态资源加速 |
| ---------- | -------------------------------------- | ---- | --------------------------- | ---- | -------- | ------------- |
| 文件域名   | 文件服务                               | 必须 | 可选                        | 可选 | 应用 | 是    |
| 云引擎域名 | 云引擎 **网站托管**                    | 必须 | 必须                        | 可选 | 分组   | 视情况         |
| API 域名   | 存储、即时通讯、短信、推送、**云函数** | 必须 | 必须                        | 必须 | 应用 | 否         |

说明：

0. 每个域名只能绑定到一个应用的一种服务，可以使用同一主域名下不同的子域名。
1. API 域名需要启用 SSL，绑定时会自动申请 SSL 证书，当然你也可以自行上传证书。
2. 绑定目标中的「分组」指应用下的云引擎实例分组的生产环境。
3. 我们推荐为 API 域名和云引擎域名配置独立 IP。**API 服务只对独立（IP）入口提供可用性保证。**未配置独立 IP 的云引擎服务默认会为静态站点优化，有一些对动态内容不那么友好的限制。详见下面的[API 域名](#API_域名)、[云引擎域名](#云引擎域名)小节。
4. 自定义域名使用 CNAME 配置域名解析，因此不支持绑定裸域名，以免影响该域名下的其他域名的解析以及与 MX 等记录冲突。如果需要使用裸域名作为 API 域名或云引擎域名可以配置独立 IP 后使用 A 记录绑定。
5. 一个应用（文件域名、API 域名）或分组（云引擎域名）上可以绑定多个域名，但文件服务同一时间只能选择使用一个域名（可以在控制台切换）。

## 文件域名

如果你的应用使用了 LeanCloud 文件服务，请前往 **应用控制台 > 设置 > 域名绑定** 绑定文件域名。

注意，即使您并未使用 LeanCloud 的结构化数据存储服务，但是使用了即时通讯的多媒体消息（图像、音频、视频等），那么就有可能使用了文件服务。
一个简单的判断方法是到控制台查看你的应用的 **数据存储 > 结构化数据** 页面，如果 `_File` 表中有数据，就表明你的应用使用了文件服务。

绑定文件域名时，可以选择是否启用 HTTPS：

- 不启用 HTTPS，则客户端只能通过 HTTP 访问。

- 启用 HTTPS 后，客户端同时可以通过 HTTPS 和 HTTP 访问文件。但是，受限于文件服务提供商，无论客户端使用 HTTP URL 还是 HTTPS URL 访问：

  - 启用 HTTPS 域名的自定义文件域名的流量均按照 HTTPS 流量计费。
  - 同理，应用控制台的文件流量统计也总是归入 HTTPS 流量。

更换文件域名后，之前保存在 `_File` 表中的文件 URL 会自动更新。
即时通讯历史消息（包括富媒体消息）中的 URL 不会自动更新。类似地，如果开发者把文件 URL 单独保存在别的地方，更换文件域名后，需要在客户端自行实现相应的替换逻辑。
因此，我们建议开发者在开始使用文件服务和即时通讯服务时就绑定自定义文件域名，以免给以后迁移增加困难。

之前使用 LeanCloud 公共文件域名的旧应用，在绑定文件域名后，现存的使用共享域名的 URL 仍然可以访问。

如果在不同应用间绑定了 `_File` Class，那么需要在源应用绑定自定义文件域名，目标应用无需绑定自定义文件域名。

由于底层文件服务商的限制，如果你在底层文件服务商（七牛）处有账号，并且在自己的七牛账号绑定了泛域名（例如 `*.example.com`），那么该域名（`example.com`）下的所有子域名均无法绑定 LeanCloud 文件服务。
如在七牛取消泛域名绑定，下一个账期以后可以绑定该域名下的子域名至 LeanCloud 文件服务。

## 云引擎域名

使用云引擎网站托管服务的应用，需要前往**应用控制台 > 设置 > 域名绑定**绑定云引擎域名。

如前所述，仅使用云函数（包括 hook 函数）的应用，无需绑定云引擎域名，不过需要绑定 API 域名。

控制台绑定域名时，可以自动申请 SSL 证书。相应地，`/.well-known/acme-challenge/` 路径用于验证，开发者无法使用该路径。

`stg-` 开头的自定义域名（例如 `stg-web.example.com`）会被自动地绑定到预备环境。

如前所述，我们推荐为云引擎配置独立 IP，未配置独立 IP 的云引擎服务默认会为静态站点优化，使用边缘节点为静态资源加速访问。但由于边缘节点的限制，对有些动态内容请求不怎么友好。下面的表格简单对比了两者：

||独立入口|加速节点|
|----|:----:|:----:|
|域名指向|云引擎集群的独立 IP|边缘节点|
|访问加速|-|✔️<br><small>（针对可缓存资源）</small>|
|动态请求|友好|有限制|
|DDoS 防护|2 Gbps 防护带宽<br><small>（可更换 IP 或接入清洗服务）</small>|基础 DDoS 防护|
|流量费用|0.8 元/GB<br><small>（每实例每天 1GB 免费额度）</small>|0.36 元/GB<br><small>（回源流量依然按照普通域名收费）</small>|
|DNS 解析|A 记录|CNAME 记录|

如果你在云引擎上部署的是纯静态站点，比如静态生成的网站，前后端分离应用的前端部分，以及图片、文件等静态资源，那么，使用加速节点可以提升终端用户访问速度，在流量较高的情况下还能降低流量费用。

如果你在云引擎上部署提供动态内容的网站或服务，例如 API 服务或者服务端渲染的页面，推荐使用独立入口。一方面，对动态内容进行加速有可能会略微影响用户访问速度，并会同时产生加速流量费用与回源流量费用。另一方面，由于边缘节点的限制，使用边缘节点的云引擎服务不支持 WebSocket 和 HTTP PATCH 方法，不支持获取客户端 IP，请求超时限制为 10 秒。而使用 A 记录指向独立 IP 的云引擎站点使用独立入口，不经过边缘节点，没有上述限制。

对于混合内容的部署，例如常见的前后端分离的单页应用，在一个分组中同时提供静态的前端页面与动态的 API 服务，可以绑定两个域名，一个域名通过 A 记录指向独立 IP，另一个域名通过 CNAME 记录指向加速节点，通过前一个域名访问动态 API 服务，通过后一个域名访问静态资源。

你可以随时按需通过配置 DNS 选择域名指向的入口。
换言之，独立入口与加速节点的切换，只需在域名服务商处修改 DNS 解析，将 CNAME 记录替换为 A 记录或相反。

## API 域名

如果你使用了以下服务：

- 结构化数据存储
- 云函数（包括 hook 函数）
- 即时通讯
- 多人在线对战、排行榜

那么你需要前往**应用控制台 > 设置 > 域名绑定** 绑定 API 域名。

只使用推送和短信功能的应用目前不强制要求绑定域名，但我们仍然建议用户绑定自己的 API 域名，以免受到共享域名可用性的影响。

我们推荐为 API 域名配置独立 IP。
**API 服务入口分为独立（IP）入口与共享入口，我们只对独立（IP）入口提供可用性保证。**

**共享入口有很多应用共同使用，风险较大，我们不对其提供可用性保证。**通过以下方式访问 API 服务将使用不提供可用性保证的共享入口：

- 使用已绑定，但是没有指向独立 IP 的自有域名

    你可以在命令行 `dig` 自有域名，检查解析结果是否指向独立 IP。如果没有指向独立 IP，请前往自有域名的域名服务商处修改域名解析，将 CNAME 记录替换为指向独立 IP 的 A 记录。

- 使用系统分配的测试域名

    我们为开发测试阶段的应用提供测试域名，这个域名仅供测试使用，可能被回收。正式上线的应用请绑定自有域名。测试域名可以在「控制台 > 设置 > 应用凭证 > 服务器地址」查看。

- 使用旧版 SDK 且没有指定域名

    已绑定自有域名的应用，出于兼容性考虑，旧版本客户端仍可继续访问原来由 LeanCloud 提供的共享域名（旧版 SDK 会自动获取共享域名）。我们会视情况在未来合适的时候回收共享域名。我们强烈建议开发者推动用户升级到使用自定义域名的新版本客户端应用，以免业务受到不必要的影响。

- 使用其他已停止支持的域名

    一些更老的、已停止支持的 SDK 使用的域名，我们很久以前已宣布停止支持。未来我们会停止在这些域名上提供 API 服务。

目前，绑定 API 域名后，即时通讯，Live Query 以及多人对战的 WebSocket 连接暂时仍会使用共享域名。我们后续会支持这类 WebSocket 连接使用自有域名。另外，用户反馈组件暂时也仍然使用共享域名。

### 更新代码

绑定自有 API 域名后，需要更新客户端代码以使用自定义域名。

以下部分假定绑定的自定义域名是 `xxx.example.com`，且开启了 HTTPS。

#### REST API

参考 [存储 REST API 使用指南](rest_api.html#base-url) 配置。

#### JavaScript SDK

##### 存储 SDK

请参考 [SDK 安装指南](sdk_setup-js.html#安装与引用 SDK) 配置。

旧版本的 SDK 请参考以下方法配置（建议使用最新版本的 SDK）：

<details>

<p><code>&gt;=3.5.5, &lt;3.11.1</code> 的版本可能会碰到仍然使用缓存默认配置的 bug，它可能会导致更新后的第一次请求失败</p>

<pre><code>
AV.init({
  // appId, appKey,
  serverURLs: 'https://xxx.example.com',
});
</code></pre>

<p><code>&gt;= 3.0.0, &lt;3.5.5</code></p>

<pre><code>
AV.init({
  // appId, appKey,
  serverURLs: {
    push: 'https://xxx.example.com',
    stats: 'https://xxx.example.com',
    engine: 'https://xxx.example.com',
    api: 'https://xxx.example.com',
  },
});
</code></pre>

<p><code>&lt;3.0.0</code> 的即时通讯 SDK 不支持自定义域名。</p>
</details>



##### 即时通讯 SDK

请参考 [即时通讯开发指南](realtime-guide-beginner.html#创建 IMClient) 配置。

旧版本的 SDK 请参考以下方法配置（建议使用最新版本的 SDK）：

<details>

<p><code>&gt;=4.0.0, &lt;=4.3.1</code> 的即时通讯 SDK 的 server 参数只能填写域名（不含协议），不支持未启用 HTTPS 的自定义域名：</p>

<pre><code>
new Realtime({
  // appId, appKey,
  server: 'xxx.example.com',
};
<code></pre>


<p><code>&lt;4.0.0</code> 的即时通讯 SDK 不支持自定义域名。</p>

<p>如果使用了 LiveQuery 功能，建议使用<code>&gt;=3.14.0</code> 的存储 SDK。
旧版本（<code>&gt;=3.5.0, &lt;=3.13.2</code>）的 SDK 还需要在初始化的时候额外配置 LiveQuery 模块的域名：</p> 

<pre><code>
AV.init({
  // appId, appKey,
  // serverURLs,
  realtime: new AV._sharedConfig.liveQueryRealtime({
    appId,
    appKey,
    server: 'xxx.example.com',
  }),
});
<code></pre>

<p><code>&gt;=3.5.0, &lt;3.13.2</code> 的 SDK 不支持未启用 HTTPS 的自定义域名。</p>

<p><code>&lt;3.5.0</code> 存储 SDK 的 LiveQuery 不支持自定义域名。</p>

</details>

##### 多人在线对战

请参考 [入门指南](multiplayer-quick-start-js.html#初始化) 或 [开发指南](multiplayer-guide-js.html#初始化) 进行配置。

##### 微信小程序白名单

前往 [LeanCloud 控制台 > 设置 > 应用凭证 > 域名白名单][weapp-domains]，获取域名白名单（不同应用对应不同的域名）。

[weapp-domains]: https://leancloud.cn/dashboard/app.html?appid={{appid}}#/key

登录[微信公众平台]，前往 **设置 > 开发设置 > 服务器配置 > 「修改」** 链接，**增加**上述域名白名单中的域名。

[微信公众平台]: https://mp.weixin.qq.com

#### Objective-C SDK

请参考 [SDK 安装指南](sdk_setup-objc.html#初始化) 配置。

`<12.0.0` 的版本请参考以下方法配置：

<details>
<pre><code>
// 配置 SDK 储存
[AVOSCloud setServerURLString:@"https://xxx.example.com" forServiceModule:AVServiceModuleAPI];
// 配置 SDK 推送
[AVOSCloud setServerURLString:@"https://xxx.example.com" forServiceModule:AVServiceModulePush];
// 配置 SDK 云引擎（用于访问云函数，使用 API 自定义域名，而非云引擎自定义域名）
[AVOSCloud setServerURLString:@"https://xxx.example.com" forServiceModule:AVServiceModuleEngine];
// 配置 SDK 即时通讯
[AVOSCloud setServerURLString:@"https://xxx.example.com" forServiceModule:AVServiceModuleRTM];
// 配置 SDK 统计
[AVOSCloud setServerURLString:@"https://xxx.example.com" forServiceModule:AVServiceModuleStatistics];
// 初始化应用
[AVOSCloud setApplicationId:@"{{appid}}" clientKey:@"{{appkey}}"];
</code></pre>

<strong>部分旧版本 SDK（&lt; 8.2.3）存在 SSL Pinning，它可能导致配置后的自定义服务器地址无法使用，如果出现了「证书非法」的相关错误，请至少升级 SDK 到 8.2.3，建议升级至最新版。</strong>
</details>

`<4.6.0` 的版本不支持自定义域名。

#### Swift SDK

`>= 17.0.0` 的版本请参考 [SDK 安装指南](sdk_setup-swift.html#初始化) 配置。

`>= 16.1.0, < 17.0.0` 的版本请参考以下方法配置：

<details>
<pre><code>
let configuration = LCApplication.Configuration(
    customizedServers: [
        .api("https://xxx.example.com"),
        .engine("https://xxx.example.com"),
        .push("https://xxx.example.com"),
        .rtm("https://xxx.example.com")
    ]
)
do {
    try LCApplication.default.set(
        id: "{{appid}}",
        key: "{{appkey}}",
        configuration: configuration
    )
} catch {
    fatalError("\(error)")
}
</code></pre>

</details>

`<16.1.0` 的版本不支持自定义域名。

#### Java Unified SDK

Java Unified SDK （ `>= 6.0.0`） 请参考 [SDK 安装指南](sdk_setup-java.html#初始化) 配置。 

旧版本 SDK 请参考以下方法配置：


<details>

使用 Java Unified SDK (`< 6.0.0`) 的 Android 项目，需在 `Application` 类的 `onCreate` 方法添加：

<pre><code>
import cn.leancloud.AVOSCloud;

public class MyLeanCloudApp extends Application {
    @Override
    public void onCreate() {
        super.onCreate();
        // 配置 SDK 储存
        AVOSCloud.setServer(AVOSService.API, "https://xxx.example.com");
        // 配置 SDK 云引擎（用于访问云函数，使用 API 自定义域名，而非云引擎自定义域名）
        AVOSCloud.setServer(AVOSService.ENGINE, "https://xxx.example.com");
        // 配置 SDK 推送
        AVOSCloud.setServer(AVOSService.PUSH, "https://xxx.example.com");
        // 配置 SDK 即时通讯
        AVOSCloud.setServer(AVOSService.RTM, "https://xxx.example.com"); 

        // 提供 this、App ID 和 App Key 作为参数
        // 注意这里千万不要调用 cn.leancloud.core.AVOSCloud 的 initialize 方法，否则会出现 NetworkOnMainThread 等错误。
        AVOSCloud.initialize(this, "{{appid}}", "{{appkey}}");
    }
}
</code></pre>

老的 Android SDK 请参考以下方法配置：

<pre><code>
// 配置 SDK 储存
AVOSCloud.setServer(AVOSCloud.SERVER_TYPE.API, "https://xxx.example.com");
// 配置 SDK 云引擎
AVOSCloud.setServer(AVOSCloud.SERVER_TYPE.ENGINE, "https://xxx.example.com");
// 配置 SDK 推送
AVOSCloud.setServer(AVOSCloud.SERVER_TYPE.PUSH, "https://xxx.example.com");
// 配置 SDK 即时通讯
AVOSCloud.setServer(AVOSCloud.SERVER_TYPE.RTM, "https://xxx.example.com");
// 初始化应用
AVOSCloud.initialize(this, "{{appid}}", "{{appkey}}");
</code></pre>

<p><code>&lt;4.4.4</code> 的 Android SDK 不支持自定义域名。</p>

</details>

#### .NET SDK

请参考 [SDK 安装指南](sdk_setup-dotnet.html#初始化) 配置。 

`< v20190925.1` 的版本请参考以下方法配置：

<details>
<pre><code>
AVClient.Initialize(new AVClient.Configuration {
                ApplicationId = "{{appid}}",
                ApplicationKey = "{{appkey}}",
                ApiServer = new Uri("https://xxx.example.com"),
                EngineServer = new Uri("https://xxx.example.com"),
                PushServer = new Uri("https://xxx.example.com")
});
<code></pre>
</details>

#### PHP & Python SDK

注意，云引擎内部访问 API 是通过内网，所以不需要也不应该配置 API 自定义域名。
模板项目和云引擎网站托管开发指南中的示例代码均未配置 API 自定义域名，请勿设置自定义域名，以免变成公网访问，影响性能。

在云引擎以外的服务端使用 PHP 或 Python SDK，可以不配置 API 自定义域名。

#### App ID 后缀不为 `-MdYXbMMI` 的国际版应用如何初始化 SDK

极个别国际版应用的 App ID 后缀不为 `-MdYXbMMI`（包括个别老应用以及进行过特殊配置迁移到国际版的应用）。
对于这些应用而言，初始化 SDK 时不配置自定义域名可能会报错
（因为较新版本的 SDK 增加了自定义域名配置参数的检查，检查时会根据 App ID 后缀判断是否为国际版应用）。
这些应用需要这样初始化 SDK：

<details>

<p>注意，请使用你的应用 App ID 的前 8 位替换以下 url 地址中的 <code>aaaaaaaa</code>。<p>

<p><strong>JavaScript 存储</strong></p>

<pre><code>
AV.init({
  // appId, appKey,
  serverURLs: {
    push: 'https://aaaaaaaa.push.lncldglobal.com',
    stats: 'https://aaaaaaaa.stats.lncldglobal.com',
    engine: 'https://aaaaaaaa.engine.lncldglobal.com',
    api: 'https://aaaaaaaa.api.lncldglobal.com',
  },
});
</code></pre>

<p><strong>JavaScript 即时通讯</strong></p>

<p>请参考 <a href="realtime-guide-beginner.html#创建_IMClient">即时通讯开发指南</a> 配置。
其中 <code>server</code> 参数的值为 <code>aaaaaaaa.rtm.lncldglobal.com</code>。</p>

<p><strong>JavaScript 多人在线对战</strong></p>

<p>请参考 <a href="multiplayer-quick-start-js.html#初始化">入门指南</a> 或 <a href="multiplayer-guide-js.html#初始化">开发指南</a> 进行配置。
其中 <code>playServer</code> 参数的值为 <code>aaaaaaaa.play.lncldglobal.com</code>。</p>

<p><strong>Objective-C</strong></p>

<pre><code>
// 配置 SDK 储存
[AVOSCloud setServerURLString:@"https://aaaaaaaa.api.lncldglobal.com" forServiceModule:AVServiceModuleAPI];
// 配置 SDK 推送
[AVOSCloud setServerURLString:@"https://aaaaaaaa.push.lncldglobal.com" forServiceModule:AVServiceModulePush];
// 配置 SDK 云引擎（用于访问云函数，使用 API 自定义域名，而非云引擎自定义域名）
[AVOSCloud setServerURLString:@"https://aaaaaaaa.engine.lncldglobal.com" forServiceModule:AVServiceModuleEngine];
// 配置 SDK 即时通讯
[AVOSCloud setServerURLString:@"https://aaaaaaaa.rtm.lncldglobal.com" forServiceModule:AVServiceModuleRTM];
// 配置 SDK 统计
[AVOSCloud setServerURLString:@"https://aaaaaaaa.stats.lncldglobal.com" forServiceModule:AVServiceModuleStatistics];
// 初始化应用
[AVOSCloud setApplicationId:@"{{appid}}" clientKey:@"{{appkey}}"];
</code></pre>

<p><strong>Swift</strong></p>

<pre><code>
let configuration = LCApplication.Configuration(
    customizedServers: [
        .api("https://aaaaaaaa.api.lncldglobal.com"),
        .engine("https://aaaaaaaa.engine.lncldglobal.com"),
        .push("https://aaaaaaaa.push.lncldglobal.com"),
        .rtm("https://aaaaaaaa.rtm.lncldglobal.com")
    ]
)
do {
    try LCApplication.default.set(
        id: "{{appid}}",
        key: "{{appkey}}",
        configuration: configuration
    )
} catch {
    fatalError("\(error)")
}
</code></pre>

<p><strong>Java</strong></p>

<pre><code>
import cn.leancloud.AVOSCloud;

public class MyLeanCloudApp extends Application {
    @Override
    public void onCreate() {
        super.onCreate();
        // 配置 SDK 储存
        AVOSCloud.setServer(AVOSService.API, "https://aaaaaaaa.api.lncldglobal.com");
        // 配置 SDK 云引擎（用于访问云函数，使用 API 自定义域名，而非云引擎自定义域名）
        AVOSCloud.setServer(AVOSService.ENGINE, "https://aaaaaaaa.engine.lncldglobal.com");
        // 配置 SDK 推送
        AVOSCloud.setServer(AVOSService.PUSH, "https://aaaaaaaa.push.lncldglobal.com");
        // 配置 SDK 即时通讯
        AVOSCloud.setServer(AVOSService.RTM, "https://aaaaaaaa.rtm.lncldglobal.com"); 

        // 提供 this、App ID 和 App Key 作为参数
        // 注意这里千万不要调用 cn.leancloud.core.AVOSCloud 的 initialize 方法，否则会出现 NetworkOnMainThread 等错误。
        AVOSCloud.initialize(this, "{{appid}}", "{{appkey}}");
    }
}
</code></pre>

<p><strong>.NET</strong></p>

<pre><code>
AVClient.Initialize(new AVClient.Configuration {
                ApplicationId = "{{appid}}",
                ApplicationKey = "{{appkey}}",
                ApiServer = new Uri("https://aaaaaaaa.api.lncldglobal.com"),
                EngineServer = new Uri("https://aaaaaaaa.engine.lncldglobal.com"),
                PushServer = new Uri("https://aaaaaaaa.push.lncldglobal.com")
});
<code></pre>


</details>

## 独立 IP

在华北节点控制台（「右上角头像下拉菜单 > 账号设置 > 独立 IP」）可以查看当前账号使用的 API 独立 IP 和云引擎独立 IP，在同一页面也可以申请和解绑 IP。

申请独立 IP 后，在 LeanCloud 控制台新增域名绑定时，请按控制台提示到自有域名的域名服务商处添加 A 记录，指向独立 IP。
已经在 LeanCloud 绑定的自定义域名，只需在域名服务商处修改解析记录，将 CNAME 记录替换为 A 记录即可切换。

解绑 IP 前，请确保所有指向该 IP 的自定义域名均已修改解析记录，将相应 A 记录替换回 CNAME 记录。
由于 DNS 在整个互联网生效需要较长时间，修改解析记录后，请**至少等待 48 小时再解绑 IP**，以免影响服务。

独立 IP 是账户下所有应用共享的，但 API 服务和云引擎服务不可共用 IP。
如果你希望进一步隔离各应用的入口，也可以在控制台购买更多独立 IP。
在应用的域名绑定页会列出帐号下所有可用的 IP，你需要自行规划哪些应用使用哪些 IP。

每一个独立 IP 默认提供了 2 Gbps 的防护带宽，可以防护小规模的攻击，你也无需为此承担额外的费用。
如果攻击超出了默认的防护容量， IP 会被禁用，你可以购买一个新的 IP 进行更换。
或者你也可以将新的 IP 作为源站 IP 接入第三方清洗服务，请通过工单联系我们，我们会提供必要的支持。

独立 IP 的费用为人民币 50 元 / 个 / 月，购买每个 IP 时会扣除一个月的费用（50 元），从下个自然月起，每月 1 日按 50 元 / 个的标准进行扣费。
我们给华北节点名下有商用版应用的用户都赠送了一个 API 独立 IP，可以免费使用。

独立 IP 与账户绑定，不会随应用的转移而发生变化。为了避免影响服务，转移的应用如果不改变自定义域名的解析配置，那么还可以继续使用原来的独立 IP。

华东节点暂不支持在控制台自助绑定独立 IP，如有需求，可提交工单联系我们处理。

如果你有多个独立 IP，在通过修改域名解析切换独立 IP 前，可能希望验证通过新 IP 可以成功访问服务。
这种场景下可以使用 curl 的 `--resolve` 参数指定域名解析到特定的 IP（效果类似修改 `/etc/hosts` 文件）。
比如，验证 API 独立 IP：

```sh
curl --resolve 'api.example.com:443:YOUR-API-IP' https://api.example.com/1.1/date
```

正常情况下会返回包含当前时间的 JSON 格式数据。
验证云引擎独立 IP 同理：

```sh
curl --resolve 'engine.example.com:443:YOUR-ENGINE-IP' https://engine.example.com/
```

## 域名解析

绑定域名需要设置域名解析，因此这里我们简单解释下如何设置。

绑定域名过程中，控制台会提示相应的 DNS 配置，请按照控制台的提示到域名注册商或域名解析服务提供商处设置（如果自己架设域名解析服务器的话，请根据域名解析服务器文档配置）A 记录或 CNAME 记录。

例如，按控制台提示输入待绑定域名 `xxx.example.com` 后，控制台会首先检查备案，检查通过后，控制台会显示预期的 DNS 配置。

![控制台域名绑定界面](images/dashboard-domain-setup.png)

以 CNAME 为例，假定控制台显示的 CNAME 目标值为 `yyy.zzz.example`，那么对应的 DNS Zone 记录为：

```
xxx.example.com.	3600	IN	CNAME	yyy.zzz.example.
```

其中 3600 为 TTL，可根据自己的需要设置。
大多数域名注册商或域名解析服务提供商都提供图形化的设置界面，按照其说明配置即可。

![以 DnsPod 添加 CNAME 记录为例](images/dnspod-add-cname-record.png)

设置完成后，需要等待一段时间（一般在半小时以内），CNAME 记录生效后，LeanCloud 控制台会显示「已绑定」。

A 记录的设置同理。

如果长时间卡在「等待配置 DNS」阶段，那么请点击「等待配置 DNS」后的问号图标，依其提示运行相应的 dig 命令检查域名解析记录是否生效。
如 dig 命令查不到相应的域名解析记录，请返回域名商控制台检查配置是否正确，如仍有疑问，请联系域名商客服。
如 dig 命令能查到预期的 CNAME 记录，但控制台仍显示「等待配置 DNS」，请通过工单或 {{ supportEmail() }} 联系我们。


## SSL 证书

在控制台绑定自定义域名时，可以选择自动管理 SSL 证书或手动管理 SSL 证书。
如果选择自动模式，LeanCloud 会自动申请、续期 [Let's Encrypt] 证书。
如果选择手动模式，则需要上传自己的 SSL 证书（通常是 `.crt` 或 `.pem` 文件）和 SSL 私钥（通常是 `.key` 文件），并在证书过期前自行续期及再次上传。
SSL 证书通常可以在你的域名服务商处购买，你也可以自行申请免费的证书。
Let's Encrypt 之外，比较知名的免费 SSL 证书提供商有 [ZeroSSL]、[buypass]、[TrustAsia]。

[Let's Encrypt]: https://letsencrypt.org/
[ZeroSSL]: https://zerossl.com/
[buypass]: https://www.buypass.com/ssl/products/acme
[TrustAsia]: https://freessl.cn/

## 备案

根据工信部规定，在 LeanCloud 华北、华东节点绑定的文件域名、云引擎域名、API 域名，都需要备案。

### 新增备案

如果你的主域名没有备案（没有 ICP 备案号），那么主域名本身及其子域名均无法在控制台绑定。
需要先在 LeanCloud 或其他云服务商办理备案。管局审核通过后，方可在 LeanCloud 控制台绑定。

如果你的主域名没有备案，我们建议你通过 LeanCloud 新增备案。
主域名在 LeanCloud 备案后，使用子域名在 LeanCloud 绑定文件域名、云引擎域名、API 域名不需要额外备案或接入备案。

商用版应用请进入 **应用控制台 > 账号设置 > 备案**，按照步骤填写资料，并根据控制台提示进行新增备案。

没有商用版应用的用户，如果不打算升级应用为商用版，可以通过以下方式新增备案：

1. 如果你同时也是 LeanCloud 底层 IaaS 服务商（华北节点为 UCloud）的用户，那么也可以自行在底层 IaaS 服务商新增备案。备案通过后，等价于在 LeanCloud 新增备案。
2. 如果只需要绑定文件域名，可以在其他云服务商处新增备案，然后直接在 LeanCloud 控制台绑定文件域名，因为绑定文件域名不需要接入备案。

注意，你也可以选择在其他云服务商处新增备案。
但对于大部分用户而言，因为需要绑定 API 域名或云引擎域名，在其他云服务商处新增备案之后，仍然需要在 LeanCloud 处接入备案。
这意味着需要重复提交许多类似的资料，经过两次审核周期，由管局先后审核两次，徒然增加时间和精力。
因此，对于主域名没有备案的用户，我们一般推荐在 LeanCloud 新增备案。

### 接入备案

工信部规定，网站接入多个云服务商时，需要在各云服务商处接入备案：

- 接入备案只是在备案信息中新增一个服务商，不会影响之前服务商，可以同时使用。
- 和新增备案不同，接入备案可以在服务上线后进行，不要求关站或停止解析，不影响当前网站访问。
- 一般而言，网站使用的所有云服务商皆需备案或接入备案（在使用的第一家云服务商处新增备案，在其他云服务商接入备案）。

因此，如果你的主域名之前通过 LeanCloud 新增备案，那么不需要再操心接入备案事项。
如果你的主域名是通过其他云服务商新增备案，那么你在 LeanCloud 控制台绑定 API 域名或云引擎域名后，需要在 LeanCloud 接入备案。
由于 CDN 服务一般不需要接入备案，因此，如果该子域名仅用于 LeanCloud 文件域名，那么无需在 LeanCloud 接入备案。

商用版应用如需接入备案，请先在 LeanCloud 控制台完成相应域名的绑定，
然后进入 **应用控制台 > 账号设置 > 备案**，按照步骤填写资料，并根据控制台提示进行接入备案。
办理接入备案期间域名、服务可以正常使用。

没有商用版应用的用户，云引擎、API 域名可以先绑定已备案的域名，进行测试开发。在产品正式上线时，升级应用为商用版，通过控制台接入备案。
或者，如果你同时也是 LeanCloud 底层 IaaS 服务商（华北节点为 UCloud、华东节点为腾讯云）的用户，那么也可以自行在底层 IaaS 服务商接入备案。

华东节点底层 IaaS 服务商（腾讯云）暂不支持通过 LeanCloud 以用户主体身份提交备案资料。
因此，希望在华东节点所在机房做备案接入或直接办理新备案的用户，可以自行创建腾讯云账号并通过腾讯云完成备案。如需授权码，商用版应用用户可提交工单获取。

## 常见问题

### 开发版应用无法在 LeanCloud 备案吗？

由于我们运营人员有限，我们无法协助开发版应用办理新增备案。

建议考虑通过其他方式来继续使用我们的服务，如：

- 转入 [LeanCloud 国际版](https://leancloud.app)，国际版无需绑定域名，也无需备案。
- 到 IaaS 服务商处自行完成备案和接入。我们华北节点是和 UCloud 合作，华东节点是和腾讯云合作，大家可以按照应用的节点选择合适的 IaaS 服务商去备案。
- 升级为商用版。

### 老版本的客户端怎么办？

对于绑定了自有域名的应用，其老版本的客户端由于不能及时升级的原因，还会继续使用 LeanCloud 原来提供的共享域名。
我们目前还支持这些请求，以便兼容老版本的客户端。
但共享域名不保证可用性，未来我们也计划下线共享域名，还请尽快升级客户端。

### 开启 HTTPS 的域名，其 SSL 证书如何处理？

API 自定义域名必须开启 HTTPS。
云引擎自定义域名和文件服务自定义域名，HTTPS 是可选项。

如果启用 HTTPS，我们提供了两种方式 SSL 证书配置方式：

- 开发者手动上传自己的证书，在证书到期前自行续期证书并重新上传。
- 自动为该域名申请并维护 Let's Encrypt 证书。

选择哪种方式，开发者可以自行决定。

### 不同应用之间可以使用同一个子域名吗？

不同应用无法使用相同的子域名。

### 应用在开发版和商用版之间切换，对于域名绑定会有什么影响吗？

域名绑定不受开发版、商用版切换影响。

### 应用转让对于域名绑定会有什么影响吗？

应用转让之后，如果原域名所有者不删除 DNS 解析记录，那么所有的请求还是会打到 LeanCloud 后端集群上来，这些请求都会被正常处理。如果原域名所有者删除了 DNS 解析记录，而新的开发者又不绑定到新的域名，那么理论上使用原域名访问的流量是根本不会到达 LeanCloud 集群的，这时候被转让的应用基本上就处于不可用状态了。

如果应用的新所有者需要更换域名，可以采取先新增绑定、后删除老域名的方式来操作。
同一个应用的同一种服务支持绑定多个访问域名，以便开发者需要切换域名的时候可以平滑过渡。

### 使用云函数服务需要绑什么域名？

使用云函数（包含 hook 函数）的应用，需要绑定 API 域名。

在云引擎托管网站，则需要绑定云引擎域名。

如果你实在不确定的话，可以两个都绑一下（需要绑定不同的域名，可以是同一域名的不同子域名，例如 `api.example.com` 和 `web.example.com`），这样就万无一失了。

### 什么是接入备案？

现代网站、应用的架构往往包含多个服务，这些服务可能部署在不同的云服务商上。在接入多个云服务商的情况下，使用的所有云服务商皆需备案或接入备案（在使用的第一家云服务商处新增备案，在其他云服务商处接入备案）。不过，CDN、邮件服务一般不需要接入备案。另外，有可能多家云服务商所用的底层 IaaS 服务商是同一家，这类情况算一家云服务商。

### 接入备案需要关站么？

接入备案只是在备案信息中新增一个服务商，不会影响之前服务商，可以同时使用。和新增备案不同，接入备案可以在服务上线后进行，不要求关站或停止解析，不影响当前网站访问。

### 接入备案的流程有哪些？要花多久？

接入备案的流程和新增备案类似，整个过程花费的时间也差不多，接入备案提交的备案主体等信息需与原备案信息一致。

### 自定义域名已经用了很久了，为何突然收到通知需要办理接入备案？

从合规的角度来说，都是需要接入备案的。
文档也注明了这一点。
考虑到有些用户可能自行在底层 IaaS 服务商办理过接入备案，底层 IaaS 服务商也没有提供查询某个域名是否办理了接入备案的 API 接口，所以控制台在绑定域名时只检查了域名是否备案，没有检查是否接入备案，但我们在收到底层 IaaS 服务商通知时都会协助用户办理接入备案。

### 我收到了需要办理接入备案的通知，但不想办理，会怎么样？

超过通知载明的期限后，底层 IaaS 服务商可能会阻止域名的访问，建议尽快办理接入备案，以免应用承受不必要的停服风险。如有特殊情况，请通过工单联系我们，我们尽力协助您向底层 IaaS 服务商争取延长时间。

### 开发版应用也需要接入备案么？

商用版应用、开发版应用使用的 API 自定义域名和云引擎自定义域名都需要接入备案（同一域名下的不同子域名无需重复接入备案）。开发版应用需要先<a href="custom-api-domain-guide.html#独立-ip">购买独立 IP</a>，然后通过工单提交接入备案所需材料。

### 我是开发版应用，但不想购买独立 IP，还能办理接入备案么？

接入备案申请中需要提交 IP 地址信息。名下有商用版应用的开发者，我们会赠送独立 IP。
如名下无商用版应用，你需要自行购买独立 IP。
目前我们无法协助没有独立 IP 的应用办理接入备案。

### 如果以后退订了备案时使用的独立 IP，会发生什么？

如果管局或底层 IaaS 服务商抽查到 IP 与接入备案的域名不符，会限令整改甚至撤销接入备案。建议不要退订备案使用的独立 IP，除非相应域名已不再使用。
### 开发版应用无法提交工单？

之前工单仅向商用版应用开放，现在为了协助开发版应用办理接入备案，工单系统也向开发版应用开放，不过开发版应用仅能在「接入备案」分类下提交工单。

## 推荐阅读

如需了解域名解析和备案的基本知识，可以参考以下三篇文章：

1. [域名背后那些事](https://nextfe.com/domain-introduction/)
2. [域名之殇](https://nextfe.com/domain-problems/)
3. [备案那些事儿](https://nextfe.com/icp-introduction/)
