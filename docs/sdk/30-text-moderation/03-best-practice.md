---
id: best-practice
title: 文本检测最佳实践
sidebar_label: 最佳实践
---

## 游戏昵称检测

根据《互联网信息服务管理办法》《网络信息内容生态治理规定》等法律法规，及国家网信办等相关部门的要求，游戏开发运营者需保证玩家发布的信息同样复核内容安全规定。其中玩家昵称由于具有长期持有、出现频繁等特点，易引发明显的违规风险，因此文本检测提供对游戏违规昵称提供识别能力。

### 前提条件

 - 已[开启文本检测服务](/sdk/text-moderation/features#开启文本检测服务)
 - 已阅读[开发指南](/sdk/text-moderation/guide/)

### 应用场景

游戏创建人物角色，玩家起名字时，可以利用文本检测 API 进行识别，逻辑处理可参考以下：

1. 玩家输入昵称：“游戏不好玩”，点击创建角色
2. 服务端收到了创建角色的请求，在服务端中使用文本检测接口对玩家昵称进行检测，根据返回的结果可以处理以下几种情况：

    1. **通过**：识别为健康的内容，允许创建该昵称

    2. **复核**：由于是复核情况，游戏可以执行上述“通过”的逻辑，后续根据记录在由人工定夺，是否需要修改名字

    3. **拒绝**：存在违规风险，不符合规定，不允许创建该昵称

3. 通过上述的文本检测结构就能达到满足于昵称场景下的识别


### 代码示例

**Golang**

``` go
rs := client.Check("游戏不好玩")
if rs.result == 1 {
    // todo: reject create user
} else if rs.result == 2 {
    // todo: can create user, log result for auditor review
} else {
    // todo: get pass, can create user
}
```


## 聊天检测

大多数联机游戏中都会有即时通讯，广播，聊天室等场景，在这些场景中可能会出现违规违法，低俗色情，诱导推广信息的内容问题。为了降低开发者负担，利用文本检测可以解决该场景下的内容生态一系列问题，保证内容健康积极，打击违法违规信息，制止传播低俗色情内容，屏蔽诱导推广信息。

### 前提条件

 - 已[开启文本检测服务](/sdk/text-moderation/features#开启文本检测服务)
 - 已阅读[开发指南](/sdk/text-moderation/guide/)

### 应用场景

玩家进行聊天，传播内容时，可以通过文本检测 API 进行识别过滤，逻辑处理可参考如下：

#### 涉政内容过滤
1. 玩家输入聊天内容：「G 市偷井盖，真讨厌」，并发送到公屏
2. 服务端收到了发送公屏的请求，在服务端中使用文本检测接口对内容进行检测，根据返回的过滤内容结果可以处理以下几种情况：

    1. **通过**：识别为健康的内容，允许发送到公屏

    2. **复核**：由于是复核情况，游戏可以执行上述「通过」的逻辑，后续根据记录在由人工定夺，进行禁言／封号处理

    3. **拒绝**：存在涉证内容，不符合规定，可以不允许发送公屏聊天，或者通过接口的已过滤后的文本「*，真讨厌」进行发送

#### 代码示例

**Golang**

``` go
rs := client.Check("G 市偷井盖，真讨厌")
if rs.result == 1 && rs.filtered_text != "" {
    // todo: can send 'rs.filterd_text' in chat room
} else if rs.result == 2 {
    // todo: can send msg, log result for auditor review
} else if rs.result == 0 {
    // todo: get pass, can send msg
} else {
    // todo: warning info send to user
}
```

#### 广告内容

1. 玩家输入聊天内容：「工作室，+v xxxx」，并发送到公屏
2. 服务端收到了发送公屏的请求，在服务端中使用文本检测接口对内容进行检测，根据返回的过滤结果可以处理以下几种情况 :

    1. **通过**：识别为健康的内容，允许发送到公屏

    2. **复核**：由于是复核情况，游戏可以执行上述「通过」的逻辑，后续根据记录在由人工定夺，进行禁言／封号处理
    
    3. **拒绝**：识别类型为广告(Adv)，需要进行屏蔽，不发送到公屏聊天

#### 代码示例

**Golang**

``` go
rs := client.Check("工作室，+v xxxx")
if rs.result == 1 && rs.type == "Adv" {
    // todo: reject send to chat room
} else if rs.result == 2 {
    // todo: can send msg, log result for auditor review
} else {
    // todo: get pass, can send msg
}
```



