---
title: Text Moderation Development Guide
slug: /sdk/text-moderation/guide/
---

:::info
**Currently, you need to contact the operation team to apply for activating the features of Text Moderation. **
** For details on how to apply, please refer to [Activate Text Moderation Service](/sdk/text-moderation/features#activate-text-moderation-service).**
:::

## Introduction

[Text Moderation] provides real-time, intelligent, and personalized risky text check-up services for scene such as nicknames, chats, and personalized signatures.
Based on AI and multiple identification strategies, the product can timely, accurately, and efficiently resist the risks of illegal content related to politics, violence, terrorism, pornography, and abuse.

### API list

External service domain name: https://whisper.cn.tapapis.com

API path | introduction
--- | ---
/v2/text/check | API for the intelligent identification and check-up of texts, which provides accurate judgment and type identification results 

### API protocol 

API is provided externally via HTTP protocol. For POST and PUT requests, the request body must be in JSON format, and the Content-Type of HTTP Header must be set to application/json

## API authentication

API authentication uses HTTP Header to set the key-value parameter for authorization. The parameter list is as follows:

Key | Value | Description
--- | --- | ---
X-Client-ID | ${client_id} | TDS Client ID (please go to Developer Center to obtain Client ID)
X-Server-Secret | ${server_secret} | TDS service key (please go to Developer Center to obtain Server Secret)

## Detailed description of API

###  Interface description 

Provide a scenario to distinguish and identify the check-up effect. The combination of multiple lexicons can be used to configure a variety of intelligent algorithms for identifying and checking the target text. Based on the aggregated result, API can return an accurate check-up result, which is one of the following three states. The user can filter the check-up result based on the response result:

- Passed: This indicates that the text content is healthy and is allowed to be let go and can be recorded.
- Rejected: This indicates that there are illegal words in the text content and the content cannot be let go or recorded.
- In Review: This means that the text content is suspected to be illegal and needs to be further manually confirmed. The review result can also be processed with special offline strategies on a regular basis.

>Caution: The size of a single request should not exceed 5 MB of data. If the text length exceeds 10,000 words, the text will be truncated. Such batch processing may also truncate more text content. Please read the documentation carefully.

### Request mode

```
METHOD: POST
URI: https://{{domain}}/v2/text/check
```

### Request parameters

#### Basic parameters
 Parameter  | Type | Required | Description | Demo value
--- | --- | --- | --- | ---
scene | string | Yes | Business scenario; achieve multiple identification & check-up rules through configuring different scene. Go to the filtering scenario to obtain | c1hh9bttqehouf41di00
data | object | Yes | Text data, for which the content identification & check-up is provided  | [Text information parameters](#Text information parameters)
opt | object | No | Check-up options, which help some business needs | [Check-up option parameters](#Check-up option parameters)

#### Text information parameters

 Parameter  | Type | Required | Description | Demo value
--- | --- | --- | --- | ---
data_id | string | Yes | Unique identifier for the data. The length cannot exceed 256 bytes | 6pYJGpgcPz2ugv
text | string | Yes | Text content to be checked up. The length cannot exceed 4096 bytes | Text Moderation helps game developers identify incompliant and illegal political contents
ip | string | No | A legal IP requested by the user, which can assist the identification effect and help analyze the user portrait in a targeted way | 127.0.0.1
publish_time | int64 | No | The content creation timestamp (in milliseconds), which is defaulted as the current request time if not filled in | 1618282332919
user_id | string | Yes | Business user’s unique ID. The length cannot exceed 256 bytes | taptap-123456
nickname | string | No | User nickname, which is used to assist verification and data query. The length can’t exceed 128 bytes | Xiaoming

#### Check-up option parameters
 Parameter  | Type | Required | Description | Demo value
--- | --- | --- | --- | ---
replacement | string | No | Symbol used to replace the hit keyword; the default value is "*" | * 

### Response result 

#### Data structure for the check-up result

>Caution: **filtered_text**  The field may not exist and may Null and an empty string. When an empty string is returned, business logic processing should be performed in combination with ‘result’ and ‘type’. It is recommended that the content be blocked if the response result is “Rejected” and the filtered content is empty.

 Parameter  | Type | Required | Description | Demo value
--- | --- | --- | --- | ---
request_id | string | Yes | Request’s unique identifier, which can be used to query data later | c1i1955tqehouf41di20
result | int | Yes | Return the check-up result <br/>0: Passed<br/>1: Rejected<br/>2: In Review | 1
type | string | Yes | Return the identification type: <br/>Health: Health <br/>Advertising: Adv <br/>Politics: Politics <br/>Abuse: Abuse <br/>Crime: Crime <br/>Heresy: Heresy <br/>Terrorism: Terrorism <br/>Pornography: Porn <br/>Gambling: Gamble <br/>Contraband: Contraband <br/>Sensitive Event: SensitiveEvent <br/>Others: OtherViolations <br/> | Politics
filtered_text | string | No | Return the filtered text content (text) through the hit keyword | You such a*, *you
hint | object | Yes | Check-up clue | [Clue’s data structure](#Clue’s data structure)

#### Clue’s data structure
Parameter  | Type | Required | Description | Demo value
--- | --- | --- | --- | ---
hit_words | array[object]| Yes | Hit keyword  | [Data structure of hit words](#Data structure of hit words)

#### Data structure of hit words
 Parameter  | Type | Required | Description | Demo value
--- | --- | --- | --- | ---
word | string | Yes | Keyword  | xxx
type | string | Yes | Identification type (the same as the above)| Adv
positions | object | Yes | Keyword’s location information | [Keyword’s location structure](#Keyword’s location structure)

#### Keyword’s location structure
 Parameter  | Type | Required | Description | Demo value
--- | --- | --- | --- | ---
start_index | int64 | Yes | Starting index (starting from 0) | 0
end_index | int64 | Yes | End index | 3

### Request example
```sh
curl --location --request POST 'https://whisper.cn.tapapis.com/v2/text/check' \
--header 'Content-Type: application/json' \
--header 'X-Client-ID: *' \
--header 'X-Server-Secret: *' \
--data-raw '{
  "data": {
    "data_id": "49a12d8d-7dc1-41cb-968f-31ddbd2ab3f2",
    "text": "Hello, welcome to use Text Moderation",
    "ip": "127.0.0.1",
    "user_id": "f2e9172e5172",
    "nickname": "Xiaoming"
  },
  "scene": "c1eqbi0e3piuseb840fg",
  "opt": {
    "replacement": "*"
  }
}'
```

### Response example 
Example of rejected case
```json
{
    "result": 1,
    "type": "Politics",
    "request_id": "c1i1955tqehouf41di20",
    "filtered_text": "You such a*, *you",
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

Example of healthy situation
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

## API error response 
If the HTTP return code is not equal to 200, the following information will be returned when an error occurs.

Parameter name | Type | Required | Description
---|---|---|---
code | int | Yes | Interface  error code. As for return codes, please refer to  (https://developers.google.com/maps-booking/reference/grpc-api/status_codes) 
message | string | Yes | Error message
details | object | No | Detailed information, whose specific structure is expressed according to different codes

```json
// The response body is in json format 
{
    "code": 5, 
    "message": "Text checker is not exists for 'c1exxxxe3pi1useb840fg' scene",
    "details": []
}
```
