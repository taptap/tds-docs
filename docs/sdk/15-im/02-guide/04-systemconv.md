---
id: systemconv
title: 四，详解消息 hook 与系统对话
sidebar_label: Hook 与系统对话
---

import MultiLang from '@theme/MultiLang';
import Mermaid from '@theme/Mermaid';



## 本章导读

在前一篇[安全与签名、黑名单和权限管理、玩转聊天室和临时对话](/sdk/im/guide/senior/)中，我们解释了一些第三方鉴权以及成员权限设置方面的问题，在这里我们会更进一步，给大家说明：

- 即时通讯的消息 Hook 机制
- 系统对话的使用方法

## 万能的 Hook 机制

完全开放的架构，支持强大的业务扩展能力，是即时通讯服务的特色之一，这种优势的体现就是这里将要给大家介绍的「Hook 机制」。

### Hook 与即时通讯服务的关系

Hook 也可以称为「钩子」，是一种特殊的消息处理机制，与 Windows 平台下的中断机制类似，允许应用方拦截并处理即时通讯过程中的多种事件和消息，从而达到实现自定义业务逻辑的目的。

以 **_messageRecieved** Hook 为例，它在消息送达服务器后会被调用，在 Hook 内可以捕获消息内容、消息发送者、消息接收者等信息，这些信息均能在 Hook 内做修改并将修改后的值转交回服务器，服务器会使用修改后的消息继续完成消息投递工作。最终收消息用户收到的会是被 Hook 修改过后的消息，而不再是最初送达服务器的原始消息。Hook 也可以选择拒绝消息发送，服务器会在给客户端回复消息被 Hook 拒绝后丢弃消息不再完成后续消息处理及转发流程。

**需要注意的是，默认情况下如果 Hook 调用失败，例如超时、返回状态码非 200 的结果等，服务器会忽略 Hook 的错误继续处理原始请求**。如果您需要改变这个行为，可以在**云服务控制台 > 即时通讯 > 设置 > 即时通讯选项** 内开启 「Hook 调用失败时返回错误给客户端并放弃继续处理请求」。开启后如果 Hook 调用失败，服务器会返回错误信息给客户端告知 Hook 调用错误，并拒绝继续处理请求。

### 消息类 Hook

一条消息，在即时通讯的流程中，从终端用户 A 发送开始，到其他用户接收到为止，考虑到存在接收方在线／不在线的可能，会经历多个不同阶段，这里每一个阶段都会触发 Hook 函数：

* **_messageReceived**<br/>
  消息达到服务器，群组成员已解析完成之后，发送给收件人之前调用。开发者在这里还可以修改消息内容，实时改变消息接收者的列表，以及其他类似操作。
* **_messageSent**<br/>
  消息发送完成后调用。开发者在这里可以完成业务统计，或将消息中转备份到己方服务器，以及其他类似操作。
* **_receiversOffline**<br/>
  消息发送完成，存在离线的收件人，在发推送给收件人之前调用。开发者在这里可以动态修改离线推送的通知内容，或通知目的设备的列表，以及其他类似操作。
* **_messageUpdate**<br/>
  收到消息修改请求，发送修改后的消息给收件人之前调用。与新发消息一样，开发者在这里可以再次修改消息内容，实时改变消息接收者的列表，以及其他类似操作。

### 对话类 Hook

在对话创建和成员变动等更改性操作前后，都可以触发 Hook 函数，进行额外的处理：

* **_conversationStart**<br/>
  创建对话，在签名校验（如果开启）之后，实际创建之前调用。开发者在这里可以为新的「对话」添加其他内部属性，或完成操作鉴权，以及其他类似操作。
* **_conversationStarted**<br/>
  创建对话完成后调用。开发者在这里可以完成业务统计，或将对话数据中转备份到己方服务器，以及其他类似操作。
* **_conversationAdd**<br/>
  向对话添加成员，在签名校验（如果开启）之后，实际加入之前调用，包括主动加入和被其他用户加入两种情况。开发者可以在这里根据内部权限设置批准或驳回这一请求，以及其他类似操作。
* **_conversationRemove**<br/>
  从对话中踢出成员，在签名校验（如果开启）之后，实际踢出之前调用，用户自己退出对话不会调用。开发者可以在这里根据内部权限设置批准或驳回这一请求，以及其他类似操作。
* **_conversationAdded**<br/>
  用户加入对话，在加入成功后调用。
* **_conversationRemoved**<br/>
  用户离开对话，在离开成功后调用。
* **_conversationUpdate**<br/>
  修改对话名称、自定义属性，设置或取消对话消息提醒，在实际修改之前调用。开发者在这里可以为新的「对话」添加其他内部属性，或完成操作鉴权，以及其他类似操作。

### 客户端上下线 Hook

在客户端上线和下线的时候，可以触发 Hook 函数：

* **_clientOnline**<br/>
  客户端上线，客户端登录成功后调用。
* **_clientOffline**<br/>
  客户端下线，客户端登出成功或意外下线后调用。

开发者可以利用这两个 Hook 函数，结合 LeanCache 来完成一组客户端实时状态查询的 endpoint，具体可以参考文档[《即时通讯中的在线状态查询》](https://leancloud.cn/docs/realtime-guide-onoff-status.html)。

### Hook 与云引擎的关系

因为 Hook 发生在即时通讯的在线处理环节，而即时通讯服务端每秒钟需要处理的消息和对话事件数量远超大家的想象，出于性能考虑，我们要求开发者使用云引擎来实现 Hook 函数。

即时通讯的云引擎 Hook 要求云引擎部署在云引擎的 **生产环境**，测试环境仅用于开发者手动调用测试。由于缓存的原因，首次部署的云引擎 Hook 需要至多三分钟来正式生效，后续修改会实时生效。

### Hook API 细节与使用场景详解

与 `conversation` 相关的 hook 可以在应用签名之外增加额外的权限判断，控制对话是否允许被建立、某些用户是否允许被加入对话等。你可以用这一 hook 实现黑名单功能。

#### `_messageReceived`

这个 hook 发生在消息到达云端之后。如果是群组消息，我们会解析出所有消息收件人。

你可以通过返回参数控制消息是否需要被丢弃，删除个别收件人，还可以修改消息内容，例如过滤应用中的敏感词。返回空对象（`response.success({})`）则会执行系统默认的流程。

请注意，在这个 hook 的代码实现的任何分支上 **请确保最终会调用 `response.success` 返回结果**，使得消息可以尽快投递给收件人。这个 hook 将 **阻塞发送流程**，因此请尽量减少无谓的代码调用，提升效率。

如果你使用了默认提供的富媒体消息格式，云引擎参数中的 `content` 接收的是 JSON 结构的字符串形式。关于这个结构的详细说明，请参考[即时通讯 REST API 使用指南](/sdk/im/guide/rest/)的《富媒体消息格式说明》一节。

参数：

参数 | 说明
--- | ---
`fromPeer` | 消息发送者的 ID。
`convId` | 消息所属对话的 ID。
`toPeers` | 解析出的对话相关的 `clientId`。
`transient` | 是否是 transient 消息。
`bin` | 原始消息内容是否为二进制消息。
`content` | 消息体字符串。如果 `bin` 为 `true`，则该字段为原始消息内容做 Base64 转码后的结果。
`receipt` | 是否要求回执。
`timestamp` | 服务器收到消息的时间戳（毫秒）。
`system` | 是否属于系统对话消息。
`sourceIP` | 消息发送者的 IP。

参数示例：

```json
{
  "fromPeer": "Tom",
  "receipt": false,
  "groupId": null,
  "system": null,
  "content": "{\"_lctext\":\"来我们去 XX 传奇玩吧\",\"_lctype\":-1}",
  "convId": "5789a33a1b8694ad267d8040",
  "toPeers": ["Jerry"],
  "bin": false,
  "transient": false,
  "sourceIP": "121.239.62.103",
  "timestamp": 1472200796764
};
```

返回值：

参数 | 约束 | 说明
--- | --- | ---
`drop` | 可选 | 如果返回真值，消息将被丢弃。
`code` | 可选 | 当 `drop` 为 `true` 时可以下发一个应用自定义的整型错误码。
`detail` | 可选 | 当 `drop` 为 `true` 时可以下发一个应用自定义的错误说明字符串。
`bin` | 可选 | 返回的 `content` 内是否为二进制消息，如果不提供则为请求中的 `bin` 值。
`content` | 可选 | 修改后的 `content`，如果不提供则保留原消息。如果 `bin` 为 `true`，则 `content` 需要是二进制消息内容做 Base64 转码后的结果。
`toPeers` | 可选 | 数组，修改后的收件人，如果不提供则保留原收件人。

示例代码：



<MultiLang kind="engine">

```js
AV.Cloud.onIMMessageReceived((request) => {
    let content = request.params.content;
    let processedContent = content.replace('XX 传奇', '**');
    // 必须含有以下语句给服务端一个正确的返回，否则会引起异常
  return {
    content: processedContent
  };
});
```
```python
import json

@engine.define
def _messageReceived(**params):
    content = json.loads(params['content'])
    text = content['_lctext']
    content['_lctext'] = text.replace('XX 传奇', '**')
    # 必须含有以下语句给服务端一个正确的返回，否则会引起异常
    return {
        'content': json.dumps(content)
    }
```
```php
Cloud::define("_messageReceived", function($params, $user) {
    $content = json_decode($params["content"], true);
    $text = $content["_lctext"];
    $content["_lctext"] = preg_replace("XX 传奇", "**", $text);
    // 必须含有以下语句给服务端一个正确的返回，否则会引起异常
    return array("content" => json_encode($content));
});
```
```java
@IMHook(type = IMHookType.messageReceived)
  public static Map<String, Object> onMessageReceived(Map<String, Object> params) {
    Map<String, Object> result = new HashMap<String, Object>();
    String content = (String)params.get("content");
    String processedContent = content.replace("XX 传奇", "**");
    result.put("content", processedContent);
    // 必须含有以下语句给服务端一个正确的返回，否则会引起异常
    return result;
  }
```
```cs
[LCEngineRealtimeHook(LCEngineRealtimeHookType.MessageReceived)]
public static object OnMessageReceived(Dictionary<string, object> parameters) {
  string content = parameters["content"] as string;
  string processedContent = content.Replace("XX 中介", "**");
  return new Dictionary<string, object> {
    { "content", processedContent }
  };
}
```
```go
// 暂不支持
```

</MultiLang>


而实际上启用上述代码之后，一条消息的时序图如下：

<Mermaid diagram={`
sequenceDiagram
SDK->>RTM: 1. 发送消息
RTM-->>Engine: 2. 触发 _messageReceived hook 调用
Engine-->>RTM: 3. 返回 hook 函数处理结果
RTM-->>SDK: 4. 将 hook 函数处理结果发送给接收方
`} />

- 上图假设的是对话所有成员都在线，而如果有成员不在线，流程有些不一样，下一节会做介绍。
- RTM 表示即时通讯服务集群，Engine 表示云引擎服务集群，它们基于内网通讯。

#### `_receiversOffline`

这个 hook 发生在有收件人离线的情况下，你可以通过它来自定义离线推送行为，包括推送内容、被推送用户或略过推送。你也可以直接在 hook 中触发自定义的推送。发往聊天室的消息不会触发此 hook。

参数：

参数 | 说明
--- | ---
`fromPeer` | 消息发送者 ID。
`convId` | 消息所属对话的 ID。
`offlinePeers` | 数组，离线的收件人列表。
`content` | 消息内容。
`timestamp` | 服务器收到消息的时间戳（毫秒）。
`mentionAll` | 布尔类型，表示本消息是否 @ 了所有成员。
`mentionOfflinePeers` | 被本消息 @ 且离线的成员 ID。如果 `mentionAll` 为 `true`，则该参数为空，表示所有 `offlinePeers` 参数内的成员全部被 @。

返回值：

参数 | 约束 | 说明
--- | --- | ---
`skip` | 可选 | 如果为真将跳过推送（比如已经在云引擎里触发了推送或者其他通知）。
`offlinePeers`| 可选 | 数组，筛选过的推送收件人。
`pushMessage` | 可选 | 推送内容，支持自定义 JSON 结构。
`force` | 可选 | 如果为真将强制推送给 `offlinePeers` 里 `mute` 的用户，默认 `false`。

示例代码：

<MultiLang kind="engine">

```js
AV.Cloud.onIMReceiversOffline((request) => {
    let params = request.params;
    let content = params.content;

  // params.content 为消息的内容
    let shortContent = content;

    if (shortContent.length > 6) {
        shortContent = content.slice(0, 6);
    }

    console.log('shortContent', shortContent);

  return {
    pushMessage: JSON.stringify({
          // 自增未读消息的数目，不想自增就设为数字
          badge: "Increment",
          sound: "default",
          // 使用开发证书
          _profile: "dev",
          alert: shortContent
      })
  }
});
```
```python
@engine.define
def _receiversOffline(**params):
    print('_receiversOffline start')
    # params['content'] 为消息内容
    content = params['content']
    short_content = content[:6]
    print('short_content:', short_content)
    payloads = {
        # 自增未读消息的数目，不想自增就设为数字
        'badge': 'Increment',
        'sound': 'default',
        # 使用开发证书
        '_profile': 'dev',
        'alert': short_content,
    }
    print('_receiversOffline end')
    return {
        'pushMessage': json.dumps(payloads),
    }
```
```php
Cloud::define('_receiversOffline', function($params, $user) {
    error_log('_receiversOffline start');
    // content 为消息的内容
    $shortContent = $params["content"];
    if (strlen($shortContent) > 6) {
        $shortContent = substr($shortContent, 0, 6);
    }

    $json = array(
        // 自增未读消息的数目，不想自增就设为数字
        "badge" => "Increment",
        "sound" => "default",
        // 使用开发证书
        "_profile" => "dev",
        "alert" => shortContent
    );

    $pushMessage = json_encode($json);
    return array(
        "pushMessage" => $pushMessage,
    );
});
```
```java
@IMHook(type = IMHookType.receiversOffline)
  public static Map<String, Object> onReceiversOffline(Map<String, Object> params) {
    // content 为消息内容
    String alert = (String)params.get("content");
    if(alert.length() > 6){
      alert = alert.substring(0, 6);
    }
    System.out.println(alert);
    Map<String, Object> result = new HashMap<String, Object>();
    JSONObject object = new JSONObject();
    // 自增未读消息的数目
    // 不想自增就设为数字
    object.put("badge", "Increment");
    object.put("sound", "default");
    // 使用开发证书
    object.put("_profile", "dev");
    object.put("alert", alert);
    result.put("pushMessage", object.toString());
    return result;
}
```
```cs
[LCEngineRealtimeHook(LCEngineRealtimeHookType.ReceiversOffline)]
public static Dictionary<string, object> OnReceiversOffline(Dictionary<string, object> parameters) {
    string alert = parameters["content"] as string;
    if (alert.Length > 6) {
        alert = alert.Substring(0, 6);
    }
    Dictionary<string, object> pushMessage = new Dictionary<string, object> {
        { "badge", "Increment" },
        { "sound", "default" },
        { "_profile", "dev" },
        { "alert", alert },
    };
    return new Dictionary<string, object> {
        { "pushMessage", JsonSerializer.Serialize(pushMessage) }
    };
}
```
```go
// 暂不支持
```

</MultiLang>


#### `_messageSent`

在消息发送完成后执行，对消息发送性能没有影响，可以用来执行相对耗时的逻辑。

参数：

参数 | 说明
--- | ---
`fromPeer` | 消息发送者的 ID。
`convId` | 消息所属对话的 ID。
`msgId` | 消息 ID。
`onlinePeers`	| 当前在线发送的用户 ID。
`offlinePeers` | 当前离线的用户 ID。
`transient`	| 是否是 transient 消息。
`system` | 是否是 system conversation。
`bin` | 是否是二进制消息。
`content`	| 消息体字符串。
`receipt`	| 是否要求回执。
`timestamp`	| 服务器收到消息的时间戳（毫秒）。
`sourceIP` | 消息发送者的 IP。

参数示例：

```json
{
  "fromPeer": "Tom",
  "receipt": false,
  "onlinePeers": [],
  "content": "12345678",
  "convId": "5789a33a1b8694ad267d8040",
  "msgId": "fptKnuYYQMGdiSt_Zs7zDA",
  "bin": false,
  "transient": false,
  "sourceIP": "114.219.127.186",
  "offlinePeers": [ "Jerry" ],
  "timestamp": 1472703266522
}
```

返回值：

这个 hook 不会对返回值进行检查。只需返回 `{}` 即可。

示例代码：

下面代码演示了日志记录相关的操作（在消息发送完后，在云引擎中打印一下日志）：

<MultiLang kind="engine">

```js
AV.Cloud.onIMMessageSent((request) => {
    console.log('params', request.params);
});
```
```python
@engine.define
def _messageSent(**params):
    print('_messageSent start')
    print('params:', params)
    print('_messageSent end')
    return {}
```
```php
Cloud::define('_messageSent', function($params, $user) {
    error_log('_messageSent start');
    error_log('params' . json_encode($params));
    return array();
});
```
```java
@IMHook(type = IMHookType.messageSent)
  public static Map<String, Object> onMessageSent(Map<String, Object> params) {
    System.out.println(params);
    Map<String, Object> result = new HashMap<String, Object>();
    return result;
}
```
```cs
[LCEngineRealtimeHook(LCEngineRealtimeHookType.MessageSent)]
public static Dictionary<string, object> OnMessageSent(Dictionary<string, object> parameters) {
    Console.WriteLine(JsonSerializer.Serialize(parameters));
    return default;
}
```
```go
// 暂不支持
```

</MultiLang>


#### `_messageUpdate`

这个 hook 发生在修改消息请求到达云端，云端正式修改消息之前。

你可以通过返回参数控制修改消息请求是否需要被丢弃，删除个别收件人，或再次修改这个修改消息请求中的消息内容。

请注意，在这个 hook 的代码实现的任何分支上 **请确保最终会调用 `response.success` 返回结果**，使得修改消息可以尽快投递给收件人。这个 hook 将 **阻塞发送流程**，因此请尽量减少无谓的代码调用，提升效率。

如果你使用了默认提供的富媒体消息格式，云引擎参数中的 `content` 接收的是 JSON 结构的字符串形式。关于这个结构的详细说明，请参考[即时通讯 REST API 使用指南](/sdk/im/guide/rest/)的《富媒体消息》一节。

参数：

参数 | 说明
--- | ---
`fromPeer` | 消息发送者的 ID。
`convId` | 消息所属对话的 ID。
`toPeers` | 解析出的对话相关的 `clientId`。
`bin` | 原始消息内容是否为二进制消息。
`content` | 消息体字符串。如果 `bin` 为 `true`，则该字段为原始消息内容做 Base64 转码后的结果。
`timestamp` | 服务器收到消息的时间戳（毫秒）。
`msgId` | 被修改的消息 ID。
`sourceIP` | 消息发送者的 IP。
`recall` | 是否撤回消息。
`system` | 是否属于系统对话消息。

返回值：

参数 | 约束 | 说明
--- | --- | ---
`drop` | 可选 | 如果返回真值，修改消息请求将被丢弃。
`code` | 可选 | 当 `drop` 为 `true` 时可以下发一个应用自定义的整型错误码。
`detail` | 可选 | 当 `drop` 为 `true` 时可以下发一个应用自定义的错误说明字符串。
`bin` | 可选 | 返回的 `content` 内是否为二进制消息，如果不提供则为请求中的 `bin` 值。
`content` | 可选 | 修改后的 `content`，如果不提供则保留原消息。如果 `bin` 为 `true`，则 `content` 需要是二进制消息内容做 Base64 转码后的结果。
`toPeers` | 可选 | 数组，修改后的收件人，如果不提供则保留原收件人。

#### `_conversationStart`

在创建对话时调用，发生在签名验证（如果开启）之后、创建对话之前。

参数：

参数 | 说明
--- | ---
`initBy` | 由谁发起的 `clientId`。
`members` | 初始成员数组，包含初始成员。
`attr` | 创建对话时的额外属性。

参数示例：

```
{
  "initBy": "Tom",
  "members": ["Tom", "Jerry"],
  "attr": {
    "name": "Tom & Jerry"
  }
}
```

返回值：

参数 | 约束 | 说明
--- | --- | ---
`reject` | 可选 | 是否拒绝，默认为 `false`。
`code` | 可选 | 当 `reject` 为 `true` 时可以下发一个应用自定义的整型错误码。
`detail` | 可选 | 当 `reject` 为 `true` 时可以下发一个应用自定义的错误说明字符串。

例如，初始成员不足四人，不允许创建对话：

<MultiLang kind="engine">

```js
AV.Cloud.onIMConversationStart((request) => {
  if (request.params.members.length < 4) {
    return {
      "reject": true,
      "code": 1234,
      "detail": "至少邀请 3 人开启对话",
    };
  } else {
    return {};
  }
});
```
```python
@engine.define
def _conversationStart(**params):
    if len(params["members"]) < 4:
      return {
        "reject": True,
        "code": 1234,
        "detail": "至少邀请 3 人开启对话",      
      }
    else:
      return {}
```
```php
Cloud::define('_conversationStart', function($params, $user) {
    if (count($params["members"]) < 4) {
      return [
        "reject" => true,
        "code" => 1234,
        "detail" => "至少邀请 3 人开启对话", 
      ];
    } else {
      return array();
    }
});
```
```java
@IMHook(type = IMHookType.conversationStart)
public static Map<String, Object> onConversationStart(Map<String, Object> params) {
  String[] members = (String[])params.get("members");
  Map<String, Object> result = new HashMap<String, Object>();
  if (members.length < 4) {
    result.put("reject", true);
    result.put("code", 1234);
    result.put("detail", "至少邀请 3 人开启对话");
  }
  return result;
}
```
```cs
[LCEngineRealtimeHook(LCEngineRealtimeHookType.ConversationStart)]
public static object OnConversationStart(Dictionary<string, object> parameters) {
    List<object> members = parameters["members"] as List<object>;
    if (members.Count < 4) {
        return new Dictionary<string, object> {
            { "reject", true },
            { "code", 1234 },
            { "detail", "至少邀请 3 人开启对话" }
        };
    }
    return default;
}
```
```go
// 暂不支持
```

</MultiLang>


#### `_conversationStarted`

对话创建后调用。

参数：

参数 | 说明
--- | ---
`convId` | 新生成的对话 ID。

返回值：

这个 hook 不对返回值进行处理，只需返回 `{}` 即可。

例如，创建对话后，将对话的 ID 存储到 LeanCache 的最近创建对话列表：

<MultiLang kind="engine">

```js
AV.Cloud.onIMConversationStarted((request) => {
  redisClient.lpush("recent_conversations", request.params.convId);
  return {};
});
```
```python
@engine.define
def _conversationStarted(**params):
    redis_client.lpush("recent_conversations", params["convId"])
    return {}
```
```php
Cloud::define('_conversationStarted', function($params, $user) {
    $redis->lpush("recent_conversations", $params["convId"]);
    return array();
});
```
```java
@IMHook(type = IMHookType.conversationStarted)
public static Map<String, Object> onConversationStarted(Map<String, Object> params) throws Exception {
  String convId = (String)params.get("convId");
  jedis.lpush("recent_conversations", params.get("convId"));
  Map<String, Object> result = new HashMap<String, Object>(); 
  return result;
}
```
```cs
[LCEngineRealtimeHook(LCEngineRealtimeHookType.ConversationStarted)]
public static object OnConversationStarted(Dictionary<string, object> parameters) {
    string convId = parameters["convId"] as string;
    Console.WriteLine($"{convId} started");
    return default;
}
```
```go
// 暂不支持
```

</MultiLang>


#### `_conversationAdd`

在将用户加入到对话时调用，发生在签名验证（如果开启）之后、加入对话之前，包括主动加入和被其他用户加入两种情况都会触发。**注意如果在创建对话时传入了其他用户的 `clientId` 作为成员，则不会触发该 hook。**如果是自己加入，那么 `initBy` 和 `members` 的唯一元素是一样的。

参数：

参数 | 说明
--- | ---
`initBy` | 由谁发起的 `clientId`。
`members` | 要加入的成员，数组。
`convId` | 对话 ID。

返回值：

参数 | 约束 | 说明
--- | --- | ---
`reject` | 可选 | 是否拒绝，默认为 `false`。
`code` | 可选 | 当 `reject` 为 `true` 时可以下发一个应用自定义的整型错误码。
`detail` | 可选 | 当 `reject` 为 `true` 时可以下发一个应用自定义的错误说明字符串。

例如，不允许某成员创建的对话新增成员：

<MultiLang kind="engine">

```js
AV.Cloud.onIMConversationAdd((request) => {
  if (request.params.initBy === "Tom") {
    return {
      "reject": true,
      "code": 9890,
      "detail": "会话已封闭，不允许新增成员。"
    };
  } else {
    return {}
  }
});
```
```python
@engine.define
def _conversationAdd(**params):
  if params["initBy"] == "Tom":
    return {
      "reject": True,
      "code": 9890,
      "detail": "会话已封闭，不允许新增成员。"
    }
  else:
    return {}
```
```php
Cloud::define('_conversationAdd', function($params, $user) {
  if ($params["initBy"] === "Tom") {
    return [
      "reject" => true,
      "code" => 9890,
      "detail" => "会话已封闭，不允许新增成员。", 
    ];
  } else {
    return array();
  }
});
```
```java
@IMHook(type = IMHookType.conversationAdd)
public static Map<String, Object> onConversationAdd(Map<String, Object> params) {
  Map<String, Object> result = new HashMap<String, Object>();
  if ("Tom".equals(params.get("initBy"))) {
    result.put("reject", true);
    result.put("code", 9890);
    result.put("detail", "会话已封闭，不允许新增成员。")
  }
  return result;
}
```
```cs
[LCEngineRealtimeHook(LCEngineRealtimeHookType.ConversationAdd)]
public static object OnConversationAdd(Dictionary<string, object> parameters) {
    if ("Tom".Equals(parameters["initBy"])) {
        return new Dictionary<string, object> {
            { "reject", true },
            { "code", 9890 },
            { "detail", "会话已封闭，不允许新增成员。" }
        };
    }
    return default;
}
```
```go
// 暂不支持
```

</MultiLang>


#### `_conversationRemove`

从对话中移除成员，在签名校验（如果开启）之后、实际踢出之前触发，用户自己退出对话不会触发。

参数：

参数 | 说明
--- | ---
`initBy` | 由谁发起。
`members` | 要踢出的成员，数组。
`convId` | 对话 iD。

返回值：

参数 | 约束 | 说明
--- | --- | ---
`reject` | 可选 | 是否拒绝，默认为 `false`。
`code` | 可选 | 当 `reject` 为 `true` 时可以下发一个应用自定义的整型错误码。
`detail` | 可选 | 当 `reject` 为 `true` 时可以下发一个应用自定义的错误说明字符串。

例如，某个应用会让官方运营人员加入每个聊天群，希望加上群主无法踢掉官方运营的限制：

<MultiLang kind="engine">

```js
AV.Cloud.onIMConversationRemove(async (request) => {
  const supporters = ["Bast", "Hypnos", "Kthanid"];
  const members = request.params.members;
  for (const member of members) {
    if (supporters.includes(member)) {
      return {
        "reject": true,
        "code": 1928,
        "detail": `不允许移除官方运营人员 ${member}`,
      };
    }
  }
  return {};
}
```
```python
@engine.define
def _conversationRemove(**params):
    supporters = ["Bast", "Hypnos", "Kthanid"]
    members = params["members"]
    for member in members:
        if member in supporters:
            return {
              "reject": True,
              "code": 1928,
              "detail": f"不允许移除官方运营人员 {member}"
            }
    return {}
```
```php
Cloud::define('_conversationRemove', function($params, $user) {
  $supporters = array("Bast", "Hypnos", "Kthanid");
  $members = $params["members"];
  foreach ($members as $member) {
    if (in_array($member, $supporters)) {
      return [
        "reject" => true,
        "code" => 1928,
        "detail" => "不允许移除官方运营人员 $member",
      ];
    }
  }
  return array();
});
```
```java
@IMHook(type = IMHookType.conversationRemove)
public static Map<String, Object> onConversationRemove(Map<String, Object> params) {
  String[] supporters = {"Bast", "Hypnos", "Kthanid"};
  String[] members = (String[])params.get("members");
  Map<String, Object> result = new HashMap<String, Object>();
  for (String member : members) {
    if (Arrays.asList(supporters).contains(member)) {
      result.put("reject", true);
      result.put("code", 1928);
      result.put("detail", "不允许移除官方运营人员 " + member);
    }
  }
  return result;
}
```
```cs
[LCEngineRealtimeHook(LCEngineRealtimeHookType.ConversationRemove)]
public static object OnConversationRemove(Dictionary<string, object> parameters) {
    List<string> supporters = new List<string> { "Bast", "Hypnos", "Kthanid" };
    List<object> members = parameters["members"] as List<object>;
    foreach (object member in members) {
        if (supporters.Contains(member as string)) {
            return new Dictionary<string, object> {
                { "reject", true },
                { "code", 1928 },
                { "detail", $"不允许移除官方运营人员 {member}" }
            };
        }
    }
    return default;
}
```
```go
// 暂不支持
```

</MultiLang>


#### `_conversationAdded`

成员成功加入对话后调用。

参数：

参数 | 说明
--- | ---
`initBy` | 由谁发起。
`convId` | 对话 ID。
`members` | 新加入的用户 ID 数组

返回值：

这个 hook 不会对返回值进行检查。

例如，如果一个群一次性加入了 10 个以上的成员，那么给运营人员发送一条通知短信：

<MultiLang kind="engine">

```js
AV.Cloud.onIMConversationAdded((request) => {
  if (request.params.members.length > 10) {
    AV.Cloud.requestSmsCode({
      mobilePhoneNumber: "18200008888",
      template: "Group_Notice",
      sign: "sign_example",
      conv_id: request.params.convId,
    }).then(
      function () { /* 调用成功 */ },
      function (err) { /* 调用失败 */}
    );
  }
});
```
```python
@engine.define
def _conversationAdded(**params):
    if len(params["members"]) > 10:
        cloud.request_sms_code(
            "18200008888",
            template="Group_Notice", sign: "sign_example",
            params={"conv_id": params["convId"]}
        )
```
```php
Cloud::define('_conversationAdded', function($params, $user) {
  if (count($params["members"]) > 10) {
    $options = [
      "template" => "Group_Notice",
      "name" => "sign_example",
      "conv_id" => $params["convId"],
    ];
    SMS::requestSmsCode("18200008888", $options);
  }
});
```
```java
@IMHook(type = IMHookType.conversationAdded)
public static void onConversationAdded(Map<String, Object> params) {
  String[] members = (String[])params.get("members");
  if (members.length > 10) {
    LCSMSOption option = new LCSMSOption();
    option.setTemplateName("Group_Notice");
    option.setSignatureName("sign_example");
    Map<String, Object> parameters = new HashMap<String, Object>();
    parameters.put("conv_id", params.get("convId")); 
    option.setEnvMap(parameters);
    LCSMS.requestSMSCodeInBackground("18200008888", option).subscribe(new Observer<LCNull>() {
      @Override
      public void onSubscribe(Disposable disposable) {}
      @Override
      public void onNext(LCNull avNull) {
        Log.d("TAG","Result: Successfully sent text message.");
      }
      @Override
      public void onError(Throwable throwable) {
        Log.d("TAG","Result: Failed to send text message. Reason: " + throwable.getMessage());
      }
      @Override
      public void onComplete() {}
    });
  }
}
```
```cs
[LCEngineRealtimeHook(LCEngineRealtimeHookType.ConversationAdded)]
public static async Task OnConversationAdded(Dictionary<string, object> parameters) {
    List<string> members = (parameters["members"] as List<object>)
        .Cast<string>()
        .ToList();
    if (members.Count > 10) {
        Dictionary<string, object> variables = new Dictionary<string, object> {
            { "conv_id", request.Params["convId"] }
        };
        try {
            await LCSMSClient.RequestSMSCode("18200008888", "Group_Notice", "sign_example", variables: variables);
            Console.WriteLine("Successfully sent text message.");
        } catch (Exception e) {
            Console.WriteLine($"Failed to send text message. Reason: {e.Message}");
        }
    }
}
```
```go
// 暂不支持
```

</MultiLang>


#### `_conversationRemoved`

成员成功离开对话后调用。

参数：

参数 | 说明
--- | ---
`initBy` | 由谁发起。
`convId` | 对话 ID。
`members` | 新加入的用户 ID 数组

返回值：

这个 hook 不会对返回值进行检查。

例如，如果用户自行离开了对话，那么将这个对话的 ID 存储到 LeanCache（应用可以利用这些数据实现展示「最近离开的对话」乃至重新加入的功能）：

<MultiLang kind="engine">

```js
AV.Cloud.onIMConversationRemoved((request) => {
  const initBy = request.params.initBy;
  const members = request.params.members;
  if (members.length === 1) {
    if (members[0] === initBy) {
      redisClient.lpush(initBy, request.params.convId);
    }
  }
});
```
```python
@engine.define
def _conversationRemoved(**params):
    init_by = params["initBy"]
    members = params["members"]
    if len(members) == 1:
      if members[0] == init_by:
        redis_client.lpush(init_by, params["convId"])
```
```php
Cloud::define('_conversationRemoved', function($params, $user) {
    $initBy = $params['initBy'];
    $members = $params['members'];
    if (count($members) === 1) {
      if (members[0] === $initBy) {
        $redis->lpush($initBy, $params["convId"]);
      }
    }
});
```
```java
@IMHook(type = IMHookType.conversationRemoved)
public static void onConversationRemoved(Map<String, Object> params) {
  String[] members = (String[])params.get("members");
  String initBy = (String)params.get("initBy");
  if (members.length == 1) {
    if (initBy.equals(members[0])) {
      jedis.lpush(initBy, params.get("convId"));
    }
  }
}
```
```cs
[LCEngineRealtimeHook(LCEngineRealtimeHookType.ConversationRemoved)]
public static void OnConversationRemoved(Dictionary<string, object> parameters) {
    List<string> members = (parameters["members"] as List<object>)
        .Cast<string>()
        .ToList();
    string initBy = parameters["initBy"] as string;
    if (members.Count == 1 && members[0].Equals(initBy)) {
        Console.WriteLine($"{parameters["convId"]} removed.");
    }
}
```
```go
// 暂不支持
```

</MultiLang>


#### `_conversationUpdate`

在修改对话名称、自定义属性，设置或取消对话消息提醒之前调用。

参数：

参数 | 说明
--- | ---
`initBy` | 由谁发起。
`convId` | 对话 ID。
`mute` | 是否关闭当前对话提醒。
`attr` | 待设置的对话属性。

`mute` 和 `attr` 参数互斥，不会同时传递。

返回值：

参数 | 约束 | 说明
--- | --- | ---
`reject` | 可选 | 是否拒绝，默认为 `false`。
`code` | 可选 | 当 `reject` 为 `true` 时可以下发一个应用自定义的整型错误码。
`detail` | 可选 | 当 `reject` 为 `true` 时可以下发一个应用自定义的错误说明字符串。
`attr` | 可选 | 修改后的待设置对话属性，如果不提供则保持原参数中的对话属性。
`mute` | 可选 | 修改后的关闭对话提醒设置，如果不提供则保持原参数中的关闭提醒设置。

`mute` 和 `attr` 参数互斥，不能同时返回。并且返回值必须与请求对应，请求中如果带着 `attr`，则返回值中只有 `attr` 参数有效，返回 `mute` 会被丢弃。同理，请求中如果带着 `mute`，返回值中如果有 `attr` 则 `attr` 会被丢弃。

例如，不允许修改对话名称：

<MultiLang kind="engine">

```js
AV.Cloud.onIMConversationUpdate((request) => {
  if ('attr' in requst.params && 'name' in request.params.attr) {
    return {
      "reject": true,
      "code": 1949,
      "detail": "对话名称不可修改",
    };
  }
});
```
```python
@engine.define
def _conversationUpdate(**params):
    if ('attr' in params) and ('name' in params['attr']):
      return {
        "reject": True,
        "code": 1949,
        "detail": "对话名称不可修改"
      }
```
```php
Cloud::define('_conversationUpdate', function($params, $user) {
  if (array_key_exists('attr', $params) && array_key_exists('name', $params["attr"])) {
    return [
        "reject" => true,
        "code" => 1949,
        "detail" => "对话名称不可修改",   
    ];
  }
});
```
```java
@IMHook(type = IMHookType.conversationUpdate)
public static Map<String, Object> onConversationUpdate(Map<String, Object> params) {
  Map<String, Object> result = new HashMap<String, Object>();
  Map<String,Object> attr = (Map<String,Object>)params.get("attr");
  if (attr != null && attr.containsKey("name")) {
    result.put("reject", true);
    result.put("code", 1949);
    result.put("detail", "对话名称不可修改");
  }
  return result;
}
```
```cs
[LCEngineRealtimeHook(LCEngineRealtimeHookType.ConversationUpdate)]
public static object OnConversationUpdate(Dictionary<string, object> parameters) {
    Dictionary<string, object> attr = parameters["attr"] as Dictionary<string, object>;
    if (attr != null && attr.ContainsKey("name")) {
        return new Dictionary<string, object> {
            { "reject", true },
            { "code", 1949 },
            { "detail", "对话名称不可修改" }
        };
    }
    return default;
}
```
```go
// 暂不支持
```

</MultiLang>


#### `_clientOnline`

客户端上线，客户端登录成功后调用。

请注意本 Hook 仅作为用户上线后的通知。如果用户快速的进行上下线切换或有多个设备同时进行上下线，则上线和下线 Hook 调用顺序并不做严格保证，即可能出现某用户 `_clientOffline` Hook 先于 `_clientOnline` Hook 而调用。

参数：

参数 | 说明
----- | ------
peerId | 登录者的 ID
sourceIP | 登录者的 IP
tag | 无值或值为 "default" 表示主动登录时不会根据 tag 踢其它设备下线，其它情况下会踢当前登录的相同 tag 的设备下线
reconnect | 标识客户端本次登录是否是自动重连，无值或值为 0 表示主动登录，值为 1 表示自动重连

返回：

这个 hook 不会对返回值进行检查。

例如，客户端上线后更新 LeanCache，供查询客户端的实时在线状态：


<MultiLang kind="engine">

```js
AV.Cloud.onIMClientOnline((request) => {
  // 1 表示在线
  redisClient.set(request.params.peerId, 1)
})
```
```python
@engine.define
def _clientOnline(**params):
  # 1 表示在线
  redis_client.set(params["peerId"], 1)
```
```php
Cloud::define('_clientOnline', function($params, $user) {
  // 1 表示在线
  $redis->set($params["peerId"], 1);
}
```
```java
@IMHook(type = IMHookType.clientOnline)
public static void onClientOnline(Map<String, Object> params) {
  // 1 表示在线
  jedis.set(params.get("peerId"), 1);  
}
```
```cs
// 注意，C# 代码示例中没有更新 LeanCache，仅仅输出了用户状态
[LCEngineRealtimeHook(LCEngineRealtimeHookType.ClientOnline)]
public static void OnClientOnline(Dictionary<string, object> parameters) {
    Console.WriteLine($"{parameters["peerId"]} online.");
}
```
```go
// 暂不支持
```

</MultiLang>


#### `_clientOffline`

在客户端登出成功或意外下线后调用。

请注意本 Hook 仅作为用户下线后的通知。如果用户快速的进行上下线切换或有多个设备同时进行上下线，则上线和下线 Hook 调用顺序并不做严格保证，即可能出现某用户 `_clientOffline` Hook 先于 `_clientOnline` Hook 而调用。

参数：

参数 | 说明
----- | ------
peerId | 登出者的 ID
closeCode | 登出的方式，1 代表用户主动登出，2 代表连接断开，3 代表用户由于 `tag` 冲突被踢下线，4 代表用户被 API 踢下线
closeMsg | 对登出方式的描述信息
sourceIP | 执行关闭会话操作的用户的 IP，连接断开时不传递此参数
tag | 由用户在会话创建时传递而来，无值或值为 `default` 表示主动登录时不会根据 tag 踢其它设备下线，其它情况下会踢当前登录的相同 tag 的设备下线
errorCode | 导致连接断开的错误码，可选
errorMsg | 导致连接断开的错误信息，可选

可能出现的错误信息说明：

错误码 | 错误信息 | 解释
----- | ------- | ---
4107 | READ_TIMEOUT | 长时间未发送消息或心跳包导致连接超时
4108 | LOGIN_TIMEOUT | 一定时间内未登录而导致超时
4109 | FRAME_TOO_LONG | WebSocket 帧过长
4114 | UNPARSEABLE_RAW_MSG | 消息格式错误无法解析
4200 | INTERNAL_ERROR | 服务器内部错误

返回：

这个 hook 不会对返回值进行检查。

例如，客户端下线后更新 LeanCache，供查询客户端的实时在线状态：

<MultiLang kind="engine">

```js
AV.Cloud.onIMClientOffline((request) => {
  // 0 表示下线
  redisClient.set(request.params.peerId, 0)
})
```
```python
@engine.define
def _clientOffline(**params):
  # 0 表示下线
  redis_client.set(params["peerId"], 0)
```
```php
Cloud::define('_clientOffline', function($params, $user) {
  // 0 表示下线 
  $redis->set($params["peerId"], 0);
}
```
```java
@IMHook(type = IMHookType.clientOffline)
public static void onClientOffline(Map<String, Object> params) {
  // 0 表示下线 
  jedis.set(params.get("peerId"), 0);  
}
```
```cs
// 注意，C# 代码示例中没有更新 LeanCache，仅仅输出了用户状态
[LCEngineRealtimeHook(LCEngineRealtimeHookType.ClientOffline)]
public static void OnClientOffline(Dictionary<string, object> parameters) {
    Console.WriteLine($"{parameters["peerId"]} offline");
}
```
```go
// 暂不支持
```

</MultiLang>


[《即时通讯中的在线状态查询》](https://leancloud.cn/docs/realtime-guide-onoff-status.html)提供了完整的 Node.js 示例（包括 LeanCache 连接，久未上线的客户端清理，配套的返回在线状态的云函数，以及如何在客户端调用），可以参考。

## 「系统对话」的使用

系统对话可以用于实现机器人自动回复、公众号、服务账号等功能。在我们的 [官方聊天 Demo](https://leancloud.github.io/leanmessage-demo/) 中就有一个使用系统对话 hook 实现的机器人 MathBot，它能计算用户发送来的数学表达式并返回结果，[其服务端源码](https://github.com/leancloud/leanmessage-demo/tree/master/server) 可以从 GitHub 上获取。

### 系统对话的创建

系统对话也是对话的一种，创建后也是在 `_Conversation` 表中增加一条记录，只是该记录 `sys` 列的值为 `true`，从而与普通会话进行区别。具体创建方法请参考[即时通讯 REST API 使用指南](/sdk/im/guide/rest/)的《创建服务号》一节。
### 系统对话消息的发送

系统对话给用户发消息请参考[即时通讯 REST API 使用指南](/sdk/im/guide/rest/)的《给任意用户单独发消息》一节。用户给系统对话发送消息跟用户给普通对话发消息方法一致。

您还可以利用系统对话发送广播消息给全部用户。相比遍历所有用户 ID 逐个发送，广播消息只需要调用一次 REST API。广播消息具有以下特征：

* 广播消息必须与系统对话关联，广播消息和一般的系统对话消息会混合在系统对话的记录中
* 用户离线时发送的广播消息，上线后会作为离线消息收到
* 广播消息具有实效性，可以设置过期时间；过期的消息不会作为离线消息发送给用户，不过仍然可以在历史消息中获取到
* 新用户第一次登录后，会收到最近一条未过期的系统广播消息

除此以外广播消息与普通消息的处理完全一致。广播消息的发送可以参考[即时通讯 REST API 使用指南](/sdk/im/guide/rest/)的《全局广播》一节。

### 获取系统对话消息记录

获取系统对话给用户发送的消息记录请参考：[即时通讯 REST API 使用指南](/sdk/im/guide/rest/)的《查询服务号给某用户发的消息》一节。

获取用户给系统对话发送的消息记录有以下两种方式实现：

- `_SysMessage` 表方式，在应用首次有用户发送消息给某系统对话时自动创建，创建后我们将所有由用户发送到系统对话的消息都存储在该表中。
- [Web Hook](#Web_Hook) 方式，这种方式需要开发者自行定义 [Web Hook](#Web_Hook)，用于实时接收用户发给系统对话的消息。

### 系统对话消息结构

#### `_SysMessage`

存储用户发给系统对话的消息，各字段含义如下：

字段 | 说明
--- | ---
`ackAt` | 消息送达的时间。
`bin` | 是否为二进制类型消息。
`conv` | 消息关联的系统对话 `Pointer`。
`data` | 消息内容。
`from` | 发消息用户的 `clientId`。
`fromIp` | 发消息用户的 IP。
`msgId` | 消息的内部 ID。
`timestamp` | 消息创建的时间。

#### Web Hook

需要开发者自行在 **云服务控制台 > 即时通讯 > 设置 > 系统对话消息回调设置** 定义，来实时接收用户发给系统对话的消息，消息的数据结构与上文所述的 `_SysMessage` 一致。

当有用户向系统对话发送消息时，我们会通过 HTTP POST 请求将 JSON 格式的数据发送到用户设置的 Web Hook 上。请注意，我们调用 Web Hook 时并不是一次调用只发送一条消息，而是会以批量的形式将消息发送过去。从下面的发送消息格式中能看到，JSON 的最外层是个 `Array`。

超时时间为 5 秒，当用户 hook 地址超时没有响应，我们会重试至多 3 次。

发送的消息格式为：

```json
[
  {
    "fromIp":      "121.238.214.92",
    "conv": {
      "__type":    "Pointer",
      "className": "_Conversation",
      "objectId":  "55b99ad700b0387b8a3d7bf0"
    },
    "msgId":       "nYH9iBSBS_uogCEgvZwE7Q",
    "from":        "A",
    "bin":         false,
    "data":        "你好，sys",
    "createdAt": {
      "__type":    "Date",
      "iso":       "2015-07-30T14:37:42.584Z"
    },
    "updatedAt":  {
      "__type":   "Date",
      "iso":      "2015-07-30T14:37:42.584Z"
    }
  }
]
```

## 即时通讯开发指南一览

- [服务总览](/sdk/im/guide/overview/)
- 《即时通讯开发指南》第一篇[从简单的单聊、群聊、收发图文消息开始](/sdk/im/guide/beginner/)
- 《即时通讯开发指南》第二篇[消息收发的更多方式，离线推送与消息同步，多设备登录](/sdk/im/guide/intermediate/)
- 《即时通讯开发指南》第三篇[安全与签名、黑名单和权限管理、玩转聊天室和临时对话](/sdk/im/guide/senior/)
