---
id: service
title: 服务端文档
---

## 概述

OpenAPI 采用统一的 Mac Token 头部签算来传递用户身份。

接入客户端  SDK  后，经过用户的授权流程，会获得这个用户在当前应用中的 Mac Token。Mac Token 长期有效，只有在用户更新自己账号相关安全信息、注销对当前应用的授权时才会失效。开发者应当将 Mac Token 妥善保管于自己的服务器上，作为后续与 TapTap 服务端通讯的标示。（Mac Token 算法细节见文档中的 `其他-MacToken` 部分）

以下接口，凡标示类似 `GET` `MAC Token` 的，表示这是一个 `GET` 请求，头部要用 `MAC Token` 签算。

## API

### 当前账户详细信息

`GET` `MAC Token` <https://openapi.taptap.com/account/profile/v1>

#### Request

| 字段      | 类型   | 说明   |
| --------- | ------ | ------ |
| client_id | string | 该应用的 client_id，应与约定相同 |

#### Response

字段             | 类型           | 说明
--------------- | ------------- | ------------
name            | string        | 用户名
avatar          | string        | 用户头像图片
gender         | string       | "female"、"male" 或者空字符串
openid          | string        | 授权用户唯一标识(每个 client 不同)
unionid         | string        | 授权用户唯一标识(每个 union 不同)

### 主动撤销 Token

`POST` `MAC Token` <https://www.taptap.com/oauth2/v1/revoke>

只有在当前设备上的主动登出行为，才需要调用撤销接口，如收到 access_denied 401 说明用户在其他渠道撤销了授权，只需要清理本地登录数据

### 授权过期
#### 判断授权过期
服务端请求 OpenAPI 收到 access_denied 错误时，表示 access token 已经失效
SDK 需要在 onError() 的时候手动判断下错误类型，并且提取出错误 message 识别是否为 token 失效

#### 处理授权过期
游戏客户端重新向用户申请授权（即让用户退出登录状态，重新使用 TapTap 登录游戏）

## 其他

### MAC Token 算法

MAC Token 包含以下字段：

| 字段          | 类型   | 说明                            |
| ------------- | ------ | ------------------------------- |
| kid           | string | mac_key id, The key identifier. |
| access_token  | string | 该字段暂无作用                    |
| token_type    | string | Token 类型，如 mac               |
| mac_key       | string | mac 密钥                         |
| mac_algorithm | string | mac计算的算法名称 hmac-sha-1      |

使用 Mac Token 签算一个接口：

```php

$url = 'http://api.domain.com/protected-resource?a=b';

$kid = '664cee85e5d85fc8645186c64ea11f198370d876'; // kid
$mac_key = '744f213aad7ebe0a78fae2e8416d0d1c2323537f'; // mac_key
$nonce = 'aSefW'; // 随机字串，建议至少5位，必须每次随机生成
$ts = time(); // 当前时间戳，秒级

$signatureBaseArray = [];
$signatureBaseArray[] = $ts; // 当前时间戳，秒级
$signatureBaseArray[] = $nonce; // 随机字符串
$signatureBaseArray[] = 'GET'; // 请求方式, GET 或 POST
$signatureBaseArray[] = '/protected-resource?a=b'; // uri
$signatureBaseArray[] = 'api.domain.com'; // 主机名
$signatureBaseArray[] = 80; // 端口 80 | 443
$signatureBaseArray[] = ""; // ext

$signatureBaseString = implode("\n", $signatureBaseArray) . "\n";

$mac = buildSignature($signatureBaseString, $mac_key);

$header = [
    "Authorization" => sprintf('MAC id="%s",ts="%d",nonce="%s",mac="%s"', $kid, $ts, $nonce, $mac)
];

$response = Requests::get($url, $header);

/**
 * 生成签名
 *
 * @param $signatureBaseString
 * @param $signatureSecret
 * @return string
 * @example buildSignature('abc', 'def') -> dYTuFEkwcs2NmuhQ4P8JBTgjD4w=
 */
function buildSignature($signatureBaseString, $signatureSecret) {
    return base64_encode ( hash_hmac ( 'sha1', $signatureBaseString, $signatureSecret, true ) );
}

```

### 通用接口错误信息

**统一格式**

| 字段              | 类型   | 说明                                                 |
| ----------------- | ------ | ---------------------------------------------------- |
| code              | int    | 预留字段，用于以后追踪问题                           |
| error             | string | 错误码，代码逻辑判断时使用                           |
| error_description | string | 错误描述信息，开发的时候用来帮助理解和解决发生的错误 |


**错误响应**

| 错误码                    | HTTP 状态码 | 详细描述                                                     |
| ------------------------- | ----------- | ------------------------------------------------------------ |
| invalid_request           | 400         | 请求缺少某个必需参数，包含一个不支持的参数或参数值，或者格式不正确 |
| invalid_time              | 400         | MAC Token 算法中，ts 时间不合法，**应请求服务器时间重新构造** |
| invalid_client            | 401         | client_id、client_secret参数无效                             |
| access_denied             | 401         | 授权服务器拒绝请求 **这个状态出现在拿着 token 请求用户资源时，如出现，客户端应退出本地的用户登录信息，引导用户重新登录** |
| forbidden       | 403         | 用户没有对当前动作的权限，**引导重新身份验证并不能提供任何帮助，而且这个请求也不应该被重复提交** |
| not_found       | 404         | 请求失败，请求所希望得到的资源未被在服务器上发现。**在参数相同的情况下，不应该重复请求** |
| server_error              | 500         | 服务器出现异常情况 **可稍等后重新尝试请求，但需有尝试上限，建议最多3次，如一直失败，则中断并告知用户** |
