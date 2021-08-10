---
id: guide
title: 内建账户指南
sidebar_label: 开发指南
---

我们在[登录功能的开发指南](/sdk/taptap-login/guide/start/) 中简单介绍了内建账户系统（TDSUser）的基本用法。
这里再详细介绍 TDSUser 的用法。

## TDSUser 和 LCUser

TDSUser 类继承自 LCUser 类。
LCUser 是 LeanCloud 提供的账户系统，TDSUser 基本沿用了其功能和接口，并针对 TDS 的需求进行了细微调整，所以我们推荐大家使用 TDSUser 类来构建玩家账户系统。

## 当前用户

用户登录后，SDK 会自动将会话信息存储到客户端，这样用户在下次打开客户端时无需再次登录。下面的代码检查是否有已经登录的用户：

```cs
TDSUser currentUser = await TDSUser.GetCurrent();
if (currentUser != null) {
  // 跳到首页
} else {
  // 显示注册或登录页面
}
```

会话信息会长期有效，直到用户主动登出：

```cs
await TDSUser.Logout();

// currentUser 变为 null
TDSUser currentUser = await TDSUser.GetCurrent();
```

## 设置当前用户

用户登录后，云端会返回一个 **session token** 给客户端，它会由 SDK 缓存起来并用于日后同一 `TDSUser` 的鉴权请求。session token 会被包含在每个客户端发起的 HTTP 请求的 header 里面，这样云端就知道是哪个 `TDSUser` 发起的请求了。

以下是一些应用可能需要用到 session token 的场景：

- 应用根据以前缓存的 session token 登录（可以通过 `SessionToken` 属性获取到当前用户的 session token，在服务端等受信任的环境下，可以通过 `Master Key` （即 `Server Secret`）读取任意用户的 `sessionToken` 字段以获取 session token）。
- 应用内的某个 WebView 需要知道当前登录的用户。
- 在服务端登录后，返回 session token 给客户端，客户端根据返回的 session token 登录。

下面的代码使用 session token 登录一个用户（云端会验证 session token 是否有效）：

```cs
await TDSUser.BecomeWithSessionToken("anmlwi96s381m6ca7o7266pzf");
```

请避免在外部浏览器使用 URL 来传递 session token，以防范信息泄露风险。

如果在 **控制台 > 数据存储 > 设置** 中勾选了 **密码修改后，强制客户端重新登录**，那么当一个用户修改密码后，该用户的 session token 会被重置。此时需要让用户重新登录，否则会遇到 `403 (Forbidden)` 错误。

下面的代码检查 session token 是否有效：

```cs
TDSUser currentUser = await TDSUser.GetCurrent();
bool isAuthenticated = await currentUser.IsAuthenticated();
if (isAuthenticated) {
  // session token 有效
} else {
  // session token 无效
}
```

## 用户的查询

可以直接构建一个针对 `_User` 的 `LCQuery` 来查询用户：

```cs
LCQuery<TDSUser> userQuery = TDSUser.GetQuery();
```

为了安全起见，**新创建的应用的 `_User` 表默认关闭了 `find` 权限**，这样每位用户登录后只能查询到自己在 `_User` 表中的数据，无法查询其他用户的数据。如果需要让其查询其他用户的数据，建议单独创建一张表来保存这类数据，并开放这张表的 `find` 查询权限。除此之外，还可以在云引擎里封装用户查询相关的方法。

可以参见 [用户对象的安全](#用户对象的安全) 来了解 `_User` 表的一些限制，还可以阅读[数据和安全](/sdk/storage/guide/security/)来了解更多 class 级权限设置的方法。

## 关联用户对象

关联 `TDSUser` 的方法和 `LCObject` 是一样的。下面的代码为一名作者保存了一本书，然后获取所有该作者写的书：

```cs
LCObject book = new LCObject("Book");
TDSUser author = await LCUser.GetCurrent();
book["title"] = "我的第五本书";
book["author"] = author;
await book.Save();

LCQuery<LCObject> query = new LCQuery<LCObject>("Book");
query.WhereEqualTo("author", author);
// books 是包含同一作者所有 Book 对象的数组
ReadOnlyCollection<LCObject> books = await query.Find();
```

## 用户对象的安全

`TDSUser` 类自带安全保障，只有通过登录等经过鉴权的方法获取到的 `TDSUser` 才能进行保存或删除相关的操作，保证每个用户只能修改自己的数据。

这样设计是因为 `TDSUser` 中存储的大多数数据都比较敏感，包括手机号、社交网络账号等等。为了用户的隐私安全，即使是应用的开发者也应避免直接接触这些数据。

下面的代码展现了这种安全措施：

```cs
try {
  TDSUser tdsUser = await TDSUser.LoginWithTapTap();
  // 试图修改用户名
  user["username"] = "Jerry";
  // 可以执行，因为用户已鉴权
  await user.Save();

  // 绕过鉴权直接获取用户
  LCQuery<TDSUser> userQuery = TDSUser.GetQuery();
  TDSUser unauthenticatedUser = await userQuery.Get(user.ObjectId);
  unauthenticatedUser["username"] = "Toodle";

  // 会出错，因为用户未鉴权
  unauthenticatedUser.Save();
} catch (LCException e) {
  print($"{e.code} : {e.message}");
}
```

通过 `TDSUser.GetCurrent()` 获取的 `LCUser` 总是经过鉴权的。

要查看一个 `TDSUser` 是否经过鉴权，可以调用 `IsAuthenticated` 方法。通过经过鉴权的方法获取到的 `TDSUser` 无需进行该检查。

## 其他对象的安全

对于给定的一个对象，可以指定哪些用户有权限读取或修改它。为实现该功能，每个对象都有一个由 `ACL` 对象组成的访问控制表。请参阅[《ACL 权限管理开发指南》](https://leancloud.cn/docs/acl-guide.html)。

## 第三方账户登录

我们在登录功能的开发指南中已经介绍了如何[使用 TapTap OAuth 授权结果直接登录账户系统](/sdk/taptap-login/guide/start#用-taptap-oauth-授权结果直接登录账户系统)。

其实除了 TapTap 外，我们也支持直接使用第三方社交平台（例如微信、微博、QQ 等）的账户信息来创建自己的账户体系并完成登录，也允许将既有账户与第三方账户绑定起来，这样终端用户后续可以直接用第三方账户信息来便捷登录。

例如以下的代码展示了终端用户使用微信登录的处理流程：

```cs
Dictionary<string, object> thirdPartyData = new Dictionary<string, object> {
  // 必须
  { "openid", "OPENID" },
  { "access_token", "ACCESS_TOKEN" },
  { "expires_in", 7200 },

  // 可选
  { "refresh_token", "REFRESH_TOKEN" },
  { "scope", "SCOPE" }
};
TDSUser currentUser = await TDSUser.LoginWithAuthData(thirdPartyData, "weixin");
```

`loginWithAuthData` 系列方法需要两个参数来唯一确定一个账户：

- 第三方平台的名字，就是前例中的 `weixin`，该名字由应用层自己决定。
- 第三方平台的授权信息，就是前例中的 `thirdPartyData`（一般包括 `uid`、`token`、`expires` 等信息，与具体的第三方平台有关）。

云端会使用第三方平台的鉴权信息来查询是否已经存在与之关联的账户。如果存在的话，则返回 `200 OK` 状态码，同时附上用户的信息（包括 [`sessionToken`](#设置当前用户)）。如果第三方平台的信息没有和任何账户关联，客户端会收到 `201 Created` 状态码，意味着新账户被创建，同时附上用户的 `objectId`、`createdAt`、`sessionToken` 和一个自动生成的 `username`，例如：

```json
{
  "username":     "k9mjnl7zq9mjbc7expspsxlls",
  "objectId":     "5b029266fb4ffe005d6c7c2e",
  "createdAt":    "2018-05-21T09:33:26.406Z",
  "updatedAt":    "2018-05-21T09:33:26.575Z",
  "sessionToken": "…",
  // authData 通常不会返回，继续阅读以了解其中原因
  "authData": {
    "weixin": {
      "openid":        "OPENID",
      "access_token":  "ACCESS_TOKEN",
      "expires_in":    7200,
      "refresh_token": "REFRESH_TOKEN",
      "scope":         "SCOPE"
    }
  }
  // …
}
```

这时候我们会看到 `_User` 表中出现了一条新的账户记录，账户中有一个名为 `authData` 的列，保存了第三方平台的授权信息。出于安全考虑，`authData` 不会被返回给客户端，除非它属于当前用户。

开发者需要自己完成第三方平台的鉴权流程（一般通过 OAuth 1.0 或 2.0），以获取鉴权信息，继而到云端来登录。

#### Signin With Apple

如果你需要开发 [Sigin With Apple](https://developer.apple.com/documentation/sign_in_with_apple/sign_in_with_apple_rest_api)，云服务可以帮你校验 `identityToken`，并获取 Apple 的 `access_token`。Apple Sign In 的 `authData` 结构如下：

```
{
  "lc_apple": {
    "uid" : "从 Apple 获取到的 User Identifier",
    "identity_token" : "从苹果获取到的 identityToken"
    "code" : "从苹果获取到的 Authorization Code"
  }
}
```
`authData` 中的 key 的作用：

* **`lc_apple`**：只有 platform 为 `lc_apple` 时，云服务才会执行 `identity_token` 和 `code` 的逻辑。
* **`uid`**：必填。云服务通过 `uid` 判断是否存在用户。
* **`identity_token`**：可选。`authData` 中有 `identity_token` 时云端会自动校验 `identity_token` 的有效性。开发者需要在云服务控制台「存储」-「用户」-「设置」-「第三方集成」中填写 Apple 的相关信息。
* **`code`**：可选。`authData` 中有 `code` 时云端会自动用该 `code` 向 Apple 换取 `access_token` 和 `refresh_token`。开发者需要在云服务控制台「存储」-「用户」-「设置」-「第三方集成」中填写 Apple 的相关信息。

##### 获取 Client ID

Client ID 用于校验 `identity_token` 及获取 `access_token`，指的是 Apple 应用的 identifier，也就是 `AppID` 或 `serviceID`。对于原生应用来说，指的是 Xcode 中的 Bundle Identifier，例如 `com.mytest.app`。详情请参考 [Apple 的文档](https://developer.apple.com/documentation/sign_in_with_apple/generate_and_validate_tokens)。

##### 获取 Private Key 及 Private Key ID

Private Key 用于获取 `access_token`。登录 Apple 开发者平台，在左侧的 「Certificates, Identifiers & Profiles」 中选择 「Keys」，添加一个用于 Apple Sign In 的 Private Key，下载 XXXXX.p8 文件，同时在下载 Key 的页面获得 Private Key ID。详情请参考[ Apple 的文档](https://help.apple.com/developer-account/#/dev77c875b7e)。

将 Key ID 填写到控制台，将下载下来的 Private Key 文件上传到控制台。控制台只能上传 Private Key 文件，无法查看及下载其内容。

##### 获取 Team ID

Team ID 用于获取 `access_token`。登录 Apple 开发者平台，在右上角或 Membership 页面即可看到自己所属开发团队的 Team ID。注意选择 Bundle ID 对应的 Team。

##### 使用 Apple Sign In 登录云服务

在控制台填写完成所有信息后，使用以下代码登录。

```cs
Dictionary<string, object> appleAuthData = new Dictionary<string, object> {
  // 必须
  { "uid", "USER IDENTIFIER" },

  // 可选
  { "identity_token", "IDENTITY TOKEN" },
  { "code", "AUTHORIZATION CODE" }
};
TDSUser currentUser = await TDSUser.LoginWithAuthData(appleAuthData, "lc_apple");
```

#### 鉴权数据的保存

`_User` class 中的 `authData` 是一个以平台名为键名，鉴权信息为键值的 JSON 对象。

一个关联了微信账户的用户应该会有下列对象作为 `authData`：

```json
{
  "weixin": {
    "openid":        "…",
    "access_token":  "…",
    "expires_in":    7200,
    "refresh_token": "…",
    "scope":         "…"
  }
}
```

而一个关联了微博账户的用户，则会有如下的 `authData`：

```json
{
    "weibo": {
      "refresh_token": "2.0xxx",
      "uid": "271XFEFEW273",
      "expires_in": 115057,
      "access_token": "2.00xxx",
    }
}
```

我们允许一个账户绑定多个第三方平台的鉴权数据，这样如果某个用户同时关联了微信和微博账户，则其 `authData` 可能会是这样的：

```json
{
  "weixin": {
    "openid":        "…",
    "access_token":  "…",
    "expires_in":    7200,
    "refresh_token": "…",
    "scope":         "…"
  }
  "weibo": {
    "refresh_token": "2.0xxx",
    "uid": "271XFEFEW273",
    "expires_in": 115057,
    "access_token": "2.00xxx",
  }
}
```

理解 `authData` 的数据结构至关重要。一个终端用户通过如下的鉴权信息来登录的时候，

```json
"weixin": {
  "openid":        "OPENID",
  "access_token":  "ACCESS_TOKEN",
  "expires_in":    7200,
  "refresh_token": "REFRESH_TOKEN",
  "scope":         "SCOPE"
}
```

云端首先会查找账户系统（_User 表），看看是否存在 authData.weixin.openid = “ OPENID ” 的账户，如果存在，则返回现有账户，如果不存在那么就创建一个新账户，同时将上面的鉴权信息写入新账户的 `authData` 属性中，并将新账户的数据当成结果返回。

云端会自动为 `_User` class 中每个用户的 `authData.<PLATFORM>.<uid>` 创建唯一索引，从而避免重复数据。
`<uid>` 在微信等部分云服务内建支持的第三方平台上为 `openid` 字段，在其他第三方平台（包括部分云服务专门支持的第三方平台和所有云服务没有专门支持的第三方平台）上为 `uid` 字段。

#### 自动验证第三方平台授权信息

为了确保账户数据的有效性，云端还支持对部分平台的 `Access Token` 的有效性进行自动验证，以防止伪造账户数据。如果有效性验证不通过，云端会返回 `invalid authData` 错误，关联不会被建立。对于云端无法识别的服务，开发者需要自己去验证 `Access Token` 的有效性。
比如，注册、登录时分别通过云引擎的 `beforeSave hook`、`beforeUpdate hook` 来验证 `Access Token` 有效性。

如果希望使用这一功能，则在开始使用前，需要在 **云服务控制台 > 数据存储 > 用户 > 设置** 配置相应平台的 **应用 ID** 和 **应用 Secret Key**。

如果不希望云端自动验证 `Access Token`，可以在 **云服务控制台 > 数据存储 > 设置** 里面取消勾选 **第三方登录时，验证用户 AccessToken 合法性**。

配置平台账号的目的在于创建 `TDSUser` 时，云端会使用相关信息去校验请求参数 `thirdPartyData` 的合法性，确保 `TDSUser` 实际对应着一个合法真实的用户，确保平台安全性。

#### 绑定第三方账户

用户已经有了 LCUser 并登录成功后，可以绑定新的第三方账号信息。
绑定成功后，新的第三方账户信息会被添加到 LCUser 的 authData 字段里。

例如，下面的代码可以关联微信账户：

```cs
await currentUser.AssociateAuthData(weixinData, "weixin");
```

为节省篇幅，上面的代码示例中没有给出具体的微信平台授权信息，相关内容请参考上面的[「第三方账户登录」](#第三方账户登录)一节。

#### 解除与第三方账户的关联

类似地，可以解绑第三方账户。

例如，下面的代码可以解除用户和微信账户的关联：

```cs
TDSUser currentUser = await TDSUser.GetCurrent();
await currentUser.DisassociateWithAuthData("weixin");
```

#### 扩展：接入 UnionID 体系，打通不同子产品的账号系统

随着第三方平台的账户体系变得日渐复杂，它们的第三方鉴权信息出现了一些较大的变化。下面我们以最典型的微信开放平台为例来进行说明。

当一个用户在移动应用内登录微信账号时，会被分配一个 OpenID；在微信小程序内登录账号时，又会被分配另一个不同的 OpenID。这样的架构会导致的问题是，使用同一个微信号的用户，也无法在微信开发平台下的移动应用和小程序之间互通。

微信官方为了解决这个问题，引入了 `UnionID` 的体系，以下为其官方说明：

> 通过获取用户基本信息接口，开发者可通过 OpenID 来获取用户基本信息，而如果开发者拥有多个公众号，可使用以下办法通过 UnionID 机制来在多公众号之间进行用户帐号互通。只要是同一个微信开放平台帐号下的公众号，用户的 UnionID 是唯一的。换句话说，同一用户，对同一个微信开放平台帐号下的不同应用，UnionID 是相同的。

其他平台，如 QQ 和微博，与微信的设计也基本一致。

云服务支持 `UnionID` 体系。你只需要给 `loginWithauthData` 和 `associateWithauthData` 接口传入更多的第三方鉴权信息，即可完成新 UnionID 体系的集成。新增加的第三方鉴权登录选项包括：

- unionId，指第三方平台返回的 UnionId 字符串。
- unionId platform，指 unionId 对应的 platform 字符串，由应用层自己指定，[后面](#该如何指定 -unionIdPlatform)会详述。
- asMainAccount，指示是否把当前平台的鉴权信息作为主账号来使用。如果作为主账号，那么就由当前用户唯一占有该 unionId，以后其他平台使用同样的 unionId 登录的话，会绑定到当前的用户记录上来；否则，当前应用的鉴权信息会被绑定到其他账号上去。

下面让我们通过一个例子来说明如何使用这些参数完成 UnionID 登录。

假设云服务在微信开放平台上有两个应用，一个是「云服务通讯」，一个是「云服务技术支持」，这两个应用在接入第三方鉴权的时候，分别使用了 `wxleanoffice` 和 `wxleansupport` 作为 platform 来进行登录。现在我们开启 UnionID 的用户体系，希望同一个微信用户在这两个应用中都能对应到同一个账户系统（_User 表中的同一条记录），同时我们决定将 `wxleanoffice` 平台作为主账号平台。

假设对于用户 A，微信给 ta 为 云服务分配的 UnionId 为 `unionid4a`，而对两个应用的授权信息分别为：

```json
"wxleanoffice": {
  "access_token": "officetoken",
  "openid": "officeopenid",
  "expires_in": 1384686496
},
"wxleansupport": {
  "openid": "supportopenid",
  "access_token": "supporttoken",
  "expires_in": 1384686496
}
```

现在，用户 A 在「云服务通讯」中通过微信登录，其调用请求为：

```cs
Dictionary<string, object> thirdPartyData = new Dictionary<string, object> {
  // 必须
  { "uid", "officeopenid" },
  { "access_token", "officetoken" },
  { "expires_in", 1384686496 },
  { "unionId", "unionid4a" },   // 新增属性

  // 可选
  { "refresh_token", "..." },
  { "scope", "SCOPE" }
};
LCUserAuthDataLoginOption option = new LCUserAuthDataLoginOption();
option.AsMainAccount = true;
option.UnionIdPlatform = "weixin";
TDSUser currentUser = await TDSUser.LoginWithAuthDataAndUnionId(
    thirdPartyData, "wxleanoffice", "unionid4a",
    option: option);
```

> 注意代码中将微信传回来的 openid 属性改为了 uid，这是因为云端要求对于自定义的 platform，只能使用 uid 这样的属性名，才能保证自动建立 `authData.<PLATFORM>.uid` 的唯一索引，具体可以参考[数据存储 REST API 使用详解](/sdk/storage/guide/rest/)的《连接用户账户和第三方平台》一节。

如果用户 A 是第一次在「云服务通讯」中通过微信登录，那么 _User 表中会增加一个新用户（假设其 objectId 为 `ThisIsUserA`），其 `authData` 的结果如下：

```json
{
  "wxleanoffice": {
    "platform": "weixin",
    "uid": "officeopenid",
    "expires_in": 1384686496,
    "main_account": true,
    "access_token": "officetoken",
    "unionid": "unionid4a"
  },
  "_weixin_unionid": {   // 新增键值对
    "uid": "unionid4a"
  }
}
```

可以看到，与之前的第三方登录 API 相比，这里由于登录时指定了 `asMainAccount` 为 true，所以 authData 的第一级子目录中增加了 `_weixin_unionid` 的键值对，这里的 `weixin` 就是我们指定的 `unionIdPlatform` 的值。`_weixin_unionid` 这个增加的键值对非常重要，以后我们判断是否存在同样 UnionID 的账户就是依靠它来查找的，而是否增加这个键值对，则是由登录时指定的 `asMainAccount` 的值决定的：

- 当 `asMainAccount` 为 true 时，云端会在 `authData` 下面增加名为 `_{unionIdPlatform}_unionid` 的键值对，当前账号就会作为这一个 UnionID 对应的主账号被唯一确定。
- 当 `asMainAccount` 为 false 时，云端不会在 `authData` 下面增加名为 `_{unionIdPlatform}_unionid` 的键值对，此时如果通过提供的 UnionID 可以找到主账号，则会将当前的鉴权信息合并进主账号的 `authData` 属性里，同时返回主账号对应的 _User 表记录；如果通过提供的 UnionID 可以找不到主账号，则会根据平台的 `openid` 去查找账户，找到匹配的账户就返回匹配的，找不到就新建一个账户，此时的处理逻辑与不使用 UnionID 时的逻辑完全一致。

接下来，用户 A 继续在「云服务技术支持」中进行微信登录，其登录逻辑为：

```cs
Dictionary<string, object> thirdPartyData = new Dictionary<string, object> {
  // 必须
  { "uid", "supportopenid" },
  { "access_token", "supporttoken" },
  { "expires_in", 1384686496 },
  { "unionId", "unionid4a" },

  // 可选
  { "refresh_token", "..." },
  { "scope", "SCOPE" }
};
LCUserAuthDataLoginOption option = new LCUserAuthDataLoginOption();
option.AsMainAccount = false;
option.UnionIdPlatform = "weixin";     // 这里指定 unionIdPlatform，使用「weixin」来指代微信平台。
TDSUser currentUser = await TDSUser.LoginWithAuthDataAndUnionId(
    thirdPartyData, "wxleansupport", "unionid4a",
    option: option);
```

与「云服务通讯」中的登录过程相比，在「云服务技术支持」这个应用中，我们在登录时只是将 `asMainAccount` 设为了 false。 这时我们看到，本次登录得到的还是 objectId 为 `ThisIsUserA` 的 _User 表记录（同一个账户），同时该账户的 `authData` 属性中发生了变化，多了 `wxleansupport` 的数据，如下：

```json
{
  "wxleanoffice": {
    "platform": "weixin",
    "uid": "officeopenid",
    "expires_in": 1384686496,
    "main_account": true,
    "access_token": "officetoken",
    "unionid": "unionid4a"
  },
  "_weixin_unionid": {
    "uid": "unionid4a"
  },
  "wxleansupport": {
    "platform": "weixin",
    "uid": "supportopenid",
    "expires_in": 1384686496,
    "main_account": false,
    "access_token": "supporttoken",
    "unionid": "unionid4a"
  }
}
```

在新的登录方式中，当一个用户以「平台名为 `wxleanoffice`、uid 为 `officeopenid`、UnionID 为 `unionid4a`」的第三方鉴权信息登录得到新的 `TDSUser` 后，接下来这个用户以「平台名为 `wxleansupport`、uid 为 `supportopenid`、UnionID 为 `unionid4a`」的第三方鉴权信息登录时，云端判定是同样的 UnionID，就直接把来自 `wxleansupport` 的新用户数据加入到已有账户的 `authData` 里了，不会再创建新的账户。

这样一来，云端通过识别平台性的用户唯一标识 UnionID，让来自同一个 UnionID 体系内的应用程序、小程序等不同平台的用户都绑定到了一个 `TDSUser` 上，实现互通。

##### 为 UnionID 建立索引

云端会为 UnionID 自动建立索引，不过因为自动创建基于请求的抽样统计，可能会滞后。
因此，我们推荐自行创建相关索引，特别是用户量（`_User`　表记录数）很大的应用，更需要预先创建索引，否则用户使用 UnionID 账号登录时可能超时失败。
以上面的微信 UnionID 为例，建议在控制台预先创建下列唯一索引（允许缺失值）：

- `authData.wxleanoffice.uid`
- `authData.wxleansupport.uid`
- `authData._weixin_unionid.uid`

##### 该如何指定 unionIdPlatform

从上面的例子可以看出，使用 UnionID 登录的时候，需要指定 `unionIdPlatform` 的主要目的，就是为了便于查找已经存在的唯一主账号。云端会在主账号对应账户的 `authData` 属性中增加一个 `_{unionIdPlatform}_unionid` 键值对来标记唯一性，终端用户在其他应用中登录的时候，云端会根据参数中提供的 `uniondId` + `unionIdPlatform` 的组合，在 `_User` 表中进行查找，这样来确定唯一的既存主账号。

本来 `unionIdPlatform` 的取值，应该是开发者可以自行决定的，但是 Javascript SDK 基于易用性的目的，在 `loginWithAuthDataAndUnionId` 之外，还额外提供了两个接口：

- `AV.User.loginWithQQAppWithUnionId`，这里默认使用 `qq` 作为 `unionIdPlatform`。
- `AV.User.loginWithWeappWithUnionId`，这里默认使用 `weixin` 作为 `unionIdPlatform`。

从我们的统计来看，这两个接口已经被很多开发者接受，在大量线上产品中产生着实际数据。所以为了避免数据在不同平台（例如 Android 和 iOS 应用）间发生冲突，建议大家统一按照 Javascript SDK 的默认值来设置 `unionIdPlatform`，即：

- 微信平台的多个应用，统一使用 `weixin` 作为 `unionIdPlatform`；
- QQ 平台的多个应用，统一使用 `qq` 作为 `unionIdPlatform`；
- 微博平台的多个应用，统一使用 `weibo` 作为 `unionIdPlatform`；
- 除此之外的其他平台，开发者可以自行定义 `unionIdPlatform` 的名字，只要自己保证多个应用间统一即可。

##### 主副应用不同登录顺序出现的不同结果

上面的流程是用户先登录了「云服务通讯」这个主应用，然后再登录「云服务技术支持」这个副应用，所以账号都被通过 UnionID 有效关联起来了。可能有人会想到另外一个问题，如果用户 B 先登录副应用，后登录主应用，这时候会发生什么事情呢？

用户 B 首先登录副应用的时候，提供了「平台名为 `wxleansupport`、uid 为 `supportopenid`、UnionID 为 `unionid4a`」的第三方鉴权信息，并且指定「UnionIDPlatform 为 `weixin`、`asMainAccount` 为 false」（与上面的调用完全一致），此时云端由于找不到存在的 UnionID，会新建一个 `TDSUser` 对象，该账户 `authData` 结果为：

```json
{
  "wxleansupport": {
    "platform": "weixin",
    "uid": "supportopenid",
    "expires_in": 1384686496,
    "main_account": false,
    "access_token": "supporttoken",
    "unionid": "unionid4a"
  }
}
```

用户 B 接着又使用了主应用，ta 再次通过微信登录，此时以「平台名为 `wxleanoffice`、uid 为 `officeopenid`、UnionID 为 `unionid4a`」的第三方鉴权信息，以及「UnionIDPlatform 为 `weixin`、`asMainAccount` 为 true」的参数进行登录，此时云端由于找不到存在的 UnionID，会再次新建一个 `TDSUser` 对象，该账户 `authData` 结果为：

```json
{
  "wxleanoffice": {
    "platform": "weixin",
    "uid": "officeopenid",
    "expires_in": 1384686496,
    "main_account": true,
    "access_token": "officetoken",
    "unionid": "unionid4a"
  },
  "_weixin_unionid": {
    "uid": "unionid4a"
  }
}
```

还有更复杂的情况。如果某公司的产品之前就接入了微信登录，产生了很多存量用户，并且分散在不同的子产品中，这时候怎么办？我们接下来专门讨论此时的解决方案。

##### 存量账户如何通过 UnionID 实现关联

还是以我们的两个子产品「云服务通讯」（后续以「产品 1」指代）和「云服务技术支持为例」（后续以「产品 2」指代），在接入 UnionID 之前，我们就接入了之前版本的微信平台登录，这时候账户系统内可能存在多种账户：

- 只使用产品 1 的微信用户 A
- 只使用产品 2 的微信用户 B
- 同时使用两个产品的微信用户 C

此时的存量账户表如下所示：

objectId | 微信用户 | authData.{platform} | authData._{platform}_unionid
------ | ------ | ------ | ------
1 | UserA | openid1（对应产品 1） | N/A
2 | UserB | openid2（对应产品 2） | N/A
3 | UserC | openid3（对应产品 1） | N/A
4 | UserC | openid4（对应产品 2） | N/A

现在我们对两个子产品进行升级，接入 UnionID 体系。这时因为已经有同一个微信用户在不同子产品中创建了不同的账户（例如 objectId 为 3 和 4 的账户），我们需要确定以哪个平台的账号为主。比如决定使用「云服务通讯」上生成的账号为主账号，则在该应用程序更新版本时，使用 `asMainAccount=true` 参数。这个应用带着 UnionID 登录匹配或创建的账号将作为主账号，之后所有这个 UnionID 的登录都会匹配到这个账号。请注意这时 `_User` 表里会剩下一些用户数据，也就是没有被选为主账号的、其他平台的同一个用户的旧账号数据（例如 objectId 为 2 和 4 的账户）。这部分数据会继续服务于已经发布的但仍然使用 OpenID 登录的旧版应用。

接下来我们看一下，如果以产品 1 的账户作为「主账户」，按照前述的方式同时提供 openid/unionid 完成登录，则最后达到的结果是：

1. 使用老版本的用户，不管在哪个产品里面，都可以和往常一样通过 openid 登录到正确的账户；
2. 使用产品 1 的新版本的老用户，通过 openid/unionid 组合，还是绑定到原来的账户。例如 UserC 在产品 1 中通过 openid3/unionId3 还是会绑定到 objectId=3 的账户（会增加 uniondId 记录）；而 UserC 在产品 2 的新版本中，通过 openid4/unionId3 的组合则会绑定到 objectId=3 的账户，而不再是原来的 objectId=4 的账户。
3. 使用产品 1 的新版本的新用户，通过 openid/unionid 组合，会创建新的账户；之后该用户再使用产品 2 的新版本，也会绑定到刚才创建的新账户上。

以上面的三个用户为例，他们分别升级到两个产品的最新版，且最终都会启用两个产品，则账户表的最终结果如下：

objectId | 微信用户 | authData.{platform} | authData._{platform}_unionid
------ | ------ | ------ | ------
1 | UserA | openid1（对应产品 1）/openid6（对应产品 2） | unionId_user_A
2 | UserB | openid2（对应产品 2） | N/A
3 | UserC | openid3（对应产品 1）/openid4（对应产品 2） | unionId_user_C
4 | UserC | openid4（对应产品 2） | N/A
5 | UserB | openid5（对应产品 1）/openid2（对应产品 2） | unionId_user_B

之后有新的用户 D，分别在两个产品的新版本中登录，则账户表中会增加一条新的 objectId=6 的记录，结果如下：

objectId | 微信用户 | authData.{platform} | authData._{platform}_unionid
------ | ------ | ------ | ------
1 | UserA | openid1（对应产品 1）/openid6（对应产品 2） | unionId_user_A
2 | UserB | openid2（对应产品 2） | N/A
3 | UserC | openid3（对应产品 1）/openid4（对应产品 2） | unionId_user_C
4 | UserC | openid4（对应产品 2） | N/A
5 | UserB | openid5（对应产品 1）/openid2（对应产品 2） | unionId_user_B
6 | UserD | openid7（对应产品 1）/openid8（对应产品 2） | unionId_user_D

如果之后我们增加了新的子产品 3，这些用户在子产品 3 中也进行微信登录的话，那么四个用户还是会继续绑定到 objectId 为 1/3/5/6 的主账户。此时账户表的结果会变为：

objectId | 微信用户 | authData.{platform} | authData._{platform}_unionid
------ | ------ | ------ | ------
1 | UserA | openid1（对应产品 1）/openid6（对应产品 2）/openid9（对应产品 3） | unionId_user_A
2 | UserB | openid2（对应产品 2） | N/A
3 | UserC | openid3（对应产品 1）/openid4（对应产品 2）/openid10（对应产品 3） | unionId_user_C
4 | UserC | openid4（对应产品 2） | N/A
5 | UserB | openid5（对应产品 1）/openid2（对应产品 2）/openid11（对应产品 3） | unionId_user_B
6 | UserD | openid7（对应产品 1）/openid8（对应产品 2）/openid12（对应产品 3） | unionId_user_D
