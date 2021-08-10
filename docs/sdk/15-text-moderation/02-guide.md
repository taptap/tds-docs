---
id: guide
title: 开发指南
sidebar_label: 开发指南
---

:::info
**目前需要联系运营团队申请开通文本检测功能。**
**申请方式详见[开启文本检测服务](/sdk/text-moderation/features#开启文本检测服务)**
:::

## 介绍

文本检测为昵称、聊天、个性签名等场景，提供实时、智能、个性化的风险文本检测服务。
基于 AI 及多重识别策略，及时、准确、高效地抵御政治、暴恐、色情、辱骂等违规内容风险。

### API 列表

对外服务域名：https://whisper.cn.tapapis.com

API 路径 | 介绍
--- | ---
/v2/text/check | 文本智能识别检测 API，提供准确的判定和类型识别结果

### API 协议

API 以 HTTP 协议对外提供，对于 POST 和 PUT 请求，请求主体必须是 JSON 格式，并且 HTTP Header 的 Content-Type 需要设置为 application/json

## API 鉴权

API 鉴权通过 HTTP Header 设置键值参数进行授权，参数列表如下：

Key | Value | 描述 
--- | --- | ---
X-Client-ID | ${client_id} | TDS 客户标识（请前往开发者中心获取 `Client ID`）
X-Server-Secret | ${server_secret} | TDS 服务密钥（请前往开发者中心获取 Server Secret）

## API 详细说明

### 接口描述

提供场景进行区分识别检测效果，可利用多个词库组合，配置多种智能算法进行识别检测。API 会根据聚合后的结果返回一个准确的检测结果，分别是以下三种状态，用户可以根据响应的结果进行过滤：

- 通过：表示文本内容是健康的，允许放行的，可供记录的内容。
- 不通过：表示文本内容存在非法文本，不可对内容放行以及记录。
- 复核：表示文本内容疑似非法，需要进一步通过人工确认，还可以定期对复核结果进行离线的特殊策略处理。

> 提示：单次请求数据不得超过 5 MB 大小，文本长度超过 1 万字将会进行截断处理，批量处理情况可能还会截断更多请仔细阅读文档

### 请求方式

```
METHOD: POST
URI: https://{{domain}}/v2/text/check
```

### 请求参数

#### 基本参数
参数 | 类型 | 必须 | 说明 | 示例值
--- | --- | --- | --- | ---
scene | string | 是 | 业务场景，通过配置不同场景实现多种识别检测规则。请前往过滤场景中获取 | c1hh9bttqehouf41di00
data | object | 是 | 文本数据提供进行内容识别检测 | [文本信息参数](#文本信息参数)
opt | object | 否 | 检测可选项，助力一些业务方需求 | [检测选项参数](#检测选项参数)

#### 文本信息参数

参数 | 类型 | 必须 | 说明 | 示例值
--- | --- | --- | --- | ---
data_id | string | 是 | 数据唯一标识。长度不超过 256 个字节 | 6pYJGpgcPz2ugv
text | string | 是 | 进行检测的文本内容。长度不超过 4096 个字节 | 文本检测助力游戏厂商识别违规非法政治内容
ip | string | 否 | 用户请求合法 IP，辅助识别效果，针对分析用户画像 | 127.0.0.1
publish_time | int64 | 否 | 内容创建时间戳（毫秒）。不填默认当前请求时间 | 1618282332919
user_id | string | 是 | 业务使用方，用户唯一 id。长度不超过 256 个字节 | taptap-123456
nickname | string | 否 | 用户昵称，辅助校验和数据查询用途。长度不超过 128 个字节 | 小明

#### 检测选项参数
参数 | 类型 | 必须 | 说明 | 示例值
--- | --- | --- | --- | ---
replacement | string | 否 | 对命中关键词进行替换的符号，默认值"*" | * 

### 响应结果

#### 检测结果数据结构

> 提示：**filtered_text**字段可能不存在，Null 以及空串。当返回空串时要结合 result 和 type 进行业务逻辑处理，建议是响应结果为拒绝且过滤后的内容为空代表该内容需要屏蔽。

参数 | 类型 | 必须 | 说明 | 示例值
--- | --- | --- | --- | ---
request_id | string | 是 | 请求唯一标识，后续可用于查询数据 | c1i1955tqehouf41di20
result | int | 是 | 返回检测结果<br/>0: 通过<br/>1: 拒绝<br/>2: 复核 | 1
type | string | 是 | 返回识别类型：<br/> 健康： Health <br/> 广告：Adv <br/> 政治：Politics <br/>辱骂：Abuse <br/>犯罪：Crime <br/>邪教：Heresy <br/>恐怖主义：Terrorism <br/>色情：Porn <br/>赌博：Gamble <br/>违禁品：Contraband <br/>突发敏感事件：SensitiveEvent <br/>违规网站：IllegalWebsite <br/> | Politics
filtered_text | string | 否 | 通过命中关键词返回过滤后的文本内容(text) | 小明你好*，*就要多读书
hint | object | 是 | 检测线索 | [线索数据结构](#线索数据结构)

#### 线索数据结构
参数 | 类型 | 必须 | 说明 | 示例值
--- | --- | --- | --- | ---
hit_words | array[object]| 是 | 命中的关键词 | [命中词数据结构](#命中词数据结构)

#### 命中词数据结构
参数 | 类型 | 必须 | 说明 | 示例值
--- | --- | --- | --- | ---
word | string | 是 | 关键词 | xxx
type | string | 是 | 识别类型（同上）| Adv
positions | object | 是 | 关键词位置信息 | [关键词位置结构](#关键词位置结构)

#### 关键词位置结构
参数 | 类型 | 必须 | 说明 | 示例值
--- | --- | --- | --- | ---
start_index | int64 | 是 | 起始下标（从 0 开始）| 0
end_index | int64 | 是 | 结束下标 | 3

### 请求示例
```
curl --location --request POST 'https://whisper.cn.tapapis.com/v2/text/check' \
--header 'Content-Type: application/json' \
--header 'X-Client-ID: *' \
--header 'X-Server-Secret: *' \
--data-raw '{
  "data": {
    "data_id": "49a12d8d-7dc1-41cb-968f-31ddbd2ab3f2",
    "text": "你好，欢迎使用文本检测",
    "ip": "127.0.0.1",
    "user_id": "f2e9172e5172",
    "nickname": "小明"
  },
  "scene": "c1eqbi0e3piuseb840fg",
  "opt": {
    "replacement": "*"
  }
}'
```

### 响应示例
拒绝情况示例
```json
{
    "result": 1,
    "type": "Politics",
    "request_id": "c1i1955tqehouf41di20",
    "filtered_text": "小明你好*，*就要多读书",
    "hint": {
        "hit_words": [
            {
                "word": "xxx",
                "type": "Adv",
                "positions": {
                    "start_index": 4,
                    "end_index": 7
                }
            },
            {
                "word": "ooo",
                "type": "Politics",
                "positions": {
                    "start_index": 8,
                    "end_index": 11
                }
            }
        ]
    }
}
```

健康情况示例
```json
{
    "result": 0,
    "type": "Health",
    "request_id": "c1i1asltqehouf41di2g",
    "filtered_text": "",
    "hint": {
        "hit_words": []
    }
}
```

## API 错误响应
当 HTTP 返回码不等于 200 时，即遇到了错误情况将返回以下信息。

参数名称 | 类型 | 必须 | 描述
---|---|---|---
code | int | 是 | 接口错误码，返回码见 (https://developers.google.com/maps-booking/reference/grpc-api/status_codes) 
message | string | 是 | 错误消息
details | object | 否 | 详情信息，具体结构根据不同 code 表示

```json
// 响应 body 为 json 格式
{
    "code": 5, 
    "message": "Text checker is not exists for 'c1exxxxe3pi1useb840fg' scene",
    "details": []
}
```
