---
id: hook-text-moderation
title: 即时通讯文本检测
sidebar_label: 文本检测
---

本文介绍了如何通过即时通讯 hook 检测文本。
##  预备知识

本文涉及到即时通讯服务 hook、文本检测服务以及云引擎在线编辑云函数功能，首先请阅读相关文档了解这些功能：

1. [详解消息 hook 与系统对话](/sdk/im/guide/systemconv/)
2. 文本检测服务的[功能介绍](/sdk/text-moderation/features/)、[开发指南](/sdk/text-moderation/guide/)、[最佳实践](/sdk/text-moderation/best-practice/)
3. [在线编写云函数](/sdk/engine/guide/cloudfunction#在线编写云函数)

## 操作步骤

1. 开启文本检测服务。

    首先登录「TapTap 开发者中心」创建游戏，进入所使用的游戏的控制面板，并切换到「游戏服务」标签。在左侧选择「应用配置」选项，从「基本信息」里面获取 `Client ID` 和 `Server Secret`。

    开启`文本检测`后点击前往，进入文本检测控制台，切换到「场景」标签，可以看到已经有预创建的场景了，可以选择「聊天检测」的场景，获取其「场景 ID」。

2. 如上开启云引擎服务，选择「云引擎 -> web -> 部署 -> 创建函数」，于弹出编辑窗口中选择类型 `Hook`，名称 `_messageReceived`，在下方编辑区域填入写好的函数。创建成功后点击「部署」，等待部署成功。

3. 现在使用即时通讯服务发送消息，可以看到内容会根据敏感词情况做出相应的变化了。

## 代码示范

下面是一段 Node.js 版的云引擎 Hook 代码，供参考：

```javascript
const https = require('https')

const scene = '***YOUR SECENE ID***'
const clientID = '***YOUR CLIENT ID***'
const serverSecret = '***YOUR SERVER SECRET***'

const params = request.params;
// remove in production environment
console.log(params)

const postData = JSON.stringify({
    'scene': scene,
    'data': {
        'data_id': '1',
        'text': params.content,
        'user_id': params.fromPeer
    }
});

const options = {
    hostname: 'whisper.cn.tapapis.com',
    port: 443,
    path: '/v2/text/check',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'X-Client-ID': clientID,
        'X-Server-Secret': serverSecret
    }
}

return new Promise((resolve, reject)=>{
  const req = https.request(options, (res) => {
    if (res.statusCode != 200) {
      // or resolve(null)
      reject(new Error(`BAD STATUS: ${res.statusCode}`))
      return
    }
    let body = ''
    res.setEncoding('utf8')
    res.on('data', (chunk) => {
      body += chunk
    })
    res.on('end', () => {
      json = JSON.parse(body)
      // remove in production environment
      console.log(json)

      if (json.result == 0) {
        resolve(null)
      } else {
        if (json.filtered_text) {
          resolve({content: json.filtered_text})
        } else {
          resolve({drop: true})
        }
      }
    })
  })

  req.on('error', (e) => {
    // or resolve(null)
    reject(e)
  })

  req.write(postData)
  req.end()
})
```

以上代码简单展示了如何在即时通讯服务中使用语心文本检测服务，代码仅供参考，你需要根据实际业务场景来处理请求和响应结果。
涉及到的即时通讯 hook 参数和语心文本检测服务请求与响应参数，请参考相应文档：

[即时通讯 _messageReceived Hook](/sdk/im/guide/systemconv/#_messagereceived)
[语心文本检测 API 接口说明](/sdk/text-moderation/guide/#api-%E8%AF%A6%E7%BB%86%E8%AF%B4%E6%98%8E)
