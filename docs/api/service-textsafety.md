---
id: service-textsafety
title: 文本过滤
sidebar_label: 文本过滤
---
## 1. 介绍

### 1.1 API列表

统一对外服务域名：https://whisper.tapapis.com

API路径 | 介绍
--- | ---
/v2/text/check | 文本智能识别检测API，提供准确的判定和类型识别结果

### 1.2 API协议

API以HTTP协议对外提供，对于POST和PUT请求，请求主体必须是JSON格式，并且HTTP Header的Conntent-Type需要设置为application/json

## 2. API鉴权

API鉴权通过HTTP Header设置键值参数进行授权，参数列表如下：

Key | Value | 描述 
--- | --- | ---
X-Client-ID | ${tds_client_id} | TDS客户标识（请前往开发者中心获取）
X-Client-Secret | ${tds_secret} | TDS客户密钥（请前往开发者中心获取）

## 3. API

### 3.1 文本智能检测

#### 接口描述

本服务提供场景进行区分识别检测，可利用多个词库组合，配置多种智能算法进行识别检测。API会根据聚合后的结果返回一个准确的检测结果，分别是以下三种状态，用户可以根据响应的结果进行过滤：

- 通过：表示文本内容是健康的，允许放行的，可供记录的内容。
- 不通过：表示文本内容存在非法文本，不可对内容放行以及记录。
- 复核：表示文本内容疑似非法，需要进一步通过人工确认，还可以定期对复核结果进行离线的特殊策略处理。

> 提示：单次请求数据不得超过 5 MB 大小 

### 请求方式

```
METHOD: POST
URI: https://{{domain}}/v2/text/check
```

#### 请求参数

##### 基本参数
参数 | 类型 | 必须 | 说明 | 示例值
--- | --- | --- | --- | ---
scene | string | 是 | 业务场景，通过配置不同场景实现多种识别检测规则 | c1hh9bttqehouf41di00
data | object | 是 | 文本数据，供系统进行内容识别检测 | [文本数据参数](#文本信息参数)
opt | object | 否 | 检测可选项，助力一些业务方需求 | [检测选项参数](#检测选项参数)

##### 文本信息参数

参数 | 类型 | 必须 | 说明 | 示例值
--- | --- | --- | --- | ---
data_id | string | 是 | 数据唯一标识。长度不超过256个字节 | 6pYJGpgcPz2ugv
text | string | 是 | 进行检测的文本内容。长度不超过4096个字节 | 语心助力游戏厂商识别违规非法政治内容
ip | string | 否 | 用户请求合法IP，辅助识别效果，针对分析用户画像 | 127.0.0.1
publish_time | int64 | 否 | 内容创建时间戳（秒）。不填默认当前请求时间 | 1617165196
user_id | string | 是 | 业务使用方，用户唯一id。长度不超过256个字节 | taptap-123456
nickname | string | 否 | 用户昵称，辅助校验和数据查询用途。长度不超过128个字节 | 小明

##### 检测选项参数
参数 | 类型 | 必须 | 说明 | 示例值
--- | --- | --- | --- | ---
replacement | string | 是 | 对命中关键词进行替换的符号，默认值"*" | * 

#### 响应结果

##### 检测结果数据结构
参数 | 类型 | 必须 | 说明 | 示例值
--- | --- | --- | --- | ---
request_id | string | 是 | 请求唯一标识，后续可用于查询数据 | c1i1955tqehouf41di20
result | int | 是 | 返回检测结果<br>0: 通过<br>1: 拒绝<br>2: 复核 | 1
type | string | 是 | 返回识别类型：<br> 健康: Health <br> 广告: Adv <br> 政治: Politics <br>辱骂: Abuse <br>犯罪: Crime <br>邪教: Heresy <br>恐怖主义: Terrorism <br>色情: Porn <br>赌博: Gamble <br>违禁品: Contraband <br>突发敏感事件: SensitiveEvent <br>违规网站: IllegalWebsite <br> | Politics
filtered_text | string | 是 | 过滤后的文本内容(text)，当且仅当结果是拒绝时，才会返回文本过滤后的结果。若返回的内容为空字符串代表文本需要屏蔽，不能执行后续行为 | 小明你好*，*就要多读书
hint | object | 是 | 检测线索 | [线索数据结构](#线索数据结构)

##### 线索数据结构
参数 | 类型 | 必须 | 说明 | 示例值
--- | --- | --- | --- | ---
hit_words | array[object]| 是 | 命中的关键词 | [命中词数据结构](#命中词数据结构)

##### 命中词数据结构
参数 | 类型 | 必须 | 说明 | 示例值
--- | --- | --- | --- | ---
word | string | yes | 关键词 | xxx
type | string | yes | 识别类型（同上）| Adv
positions | object | yes | 关键词位置信息 | [关键词位置结构](#关键词位置结构)

##### 关键词位置结构
参数 | 类型 | 必须 | 说明 | 示例值
--- | --- | --- | --- | ---
start_index | int64 | yes | 起始下标（从0开始）| 0
end_index | int64 | yes | 结束下标 | 3

#### 请求示例
```
curl --location --request POST 'https://whisper.tapapis.com/v2/text/check' \
--header 'Content-Type: application/json' \
--header 'X-Client-ID: *' \
--header 'X-Client-Secret: *' \
--data-raw {
  "data": {
    "data_id": "49a12d8d-7dc1-41cb-968f-31ddbd2ab3f2",
    "text": "你好，欢迎使用语心文本检测",
    "ip": "127.0.0.1",
    "user_id": "f2e9172e5172",
    "nickname": "小明"
  },
  "scene": "c1eqbi0e3piuseb840fg",
  "opt": {
    "replacement": "*"
  }
}
```

#### 响应示例
拒绝情况示例
```
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
                    "start_index": "4",
                    "end_index": "7"
                }
            },
            {
                "word": "ooo",
                "type": "Politics",
                "positions": {
                    "start_index": "8",
                    "end_index": "11"
                }
            }
        ]
    }
}
```

健康情况示例
```
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
