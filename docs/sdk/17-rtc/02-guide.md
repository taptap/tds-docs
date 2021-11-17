---
id: guide
title: 实时语音开发指南
sidebar_label: 开发指南
---

import CodeBlock from '@theme/CodeBlock';
import sdkVersions from '/src/docComponents/sdkVersions';
import Mermaid from '/src/docComponents/Mermaid';

实时语音服务目前仅支持 Unity 平台。

## SDK 获取

可以在 [下载页](/tap-download) 获得 SDK，引入 `TapRTC` 模块，以及 `TapRTC` 依赖的 `TapCommon` 模块：


<CodeBlock className="json">
{`"dependencies":{
  ...
  "com.taptap.tds.common":"https://github.com/TapTap/TapCommon-Unity.git#${sdkVersions.taptap.unity}",
  "com.taptap.tds.rtc":"https://github.com/TapTap/TapRTC-Unity.git#${sdkVersions.taptap.unity}",
}`}
</CodeBlock>

## 注意事项

* RTC 使用前需要在开发者中心进行相关配置。
* RTC 需要周期性的调用 `TapRTC.Poll` 接口，才能触发相关的事件回调。

## 核心接口

RTC 通过 `TapRTCConfig` 来进行初始化配置。初始化的过程是异步的，需要等待初始化结果返回之后，才能进行下一步的操作。

* `ClientId`、`ClientToken`、`ServerUrl`，参见关于[应用凭证](/sdk/storage/guide/setup-dotnet#应用凭证)的说明。
* `UserId`: 开发者自定义的用户 Id，用于标记玩家
* `DeviceId`: 开发者自定义的设备 Id，用于标记设备
* `AudioPerfProfile`: 音频质量配置（`LOW`、`MID`、`HIGH`，默认为 `MID`）

```cs
using TapTap.RTC;

var config = new TapRTCConfig.Builder()
            .ClientID("ClientId")
            .ClientToken("ClientToken")
            .ServerUrl("ServerUrl")
            .UserId("UserId")
            .DeviceId("DeviceId")
            .AudioProfile(AudioPerfProfile.DEFAULT)
            .ConfigBuilder();
            
var isInit = await TapRTC.Init(config);

if (isInit) {
    // 初始化成功
}
```

### 触发回调事件

可以在 `Update` 方法中调用 `Poll` 方法触发事件回调。如果不调用该方法，会导致 SDK 运行异常。


```cs
public void Update()
{
    TapRTC.Poll();
}
```


### 恢复系统

```cs
TapRTC.Resume();
```

### 暂停系统

```cs
TapRTC.Pause();
```

## 房间相关接口

### 创建房间

初始化成功之后，SDK 在创建房间之后，才可以进行实时语音通话。
创建房间时需指定房间号（`roomId`）以及这个房间[是否启用范围语音](#范围语音)，默认不启用。


```cs
bool enableRangeAudio = false;
var room = await TapRTC.AcquireRoom("roomId", enableRangeAudio);
```


### 注册房间相关的回调事件

```cs
room.RegisterEventAction(new TapRTCEvent()
{
    OnDisconnect = (code, message) => { label.text += "\n" + $"断开连接 code:{code} msg:{e}"; },
    OnEnterFailure = s => { label.text += "\n" + $"进入房间失败:{s}"; },
    OnEnterSuccess = () => { label.text += "\n" + $"进入房间成功"; },
    OnExit = () => { label.text += "\n" + $"退出房间成功"; },
    OnUserEnter = userId => { label.text += "\n" + $"玩家{userId}进入房间"; },
    OnUserExit = userId => { label.text += "\n" + $"玩家{userId}退出房间"; },
    OnUserSpeaker = (userId, volume) => { label.text += "\n" + $"玩家{userId}在房间说话，音量{volume}"; },
    OnUserSpeakEnd = userId => { label.text += "\n" + $"玩家{userId}在房间说话结束"; },
    // 返回切换后的音质，参见下文「切换音频质量」一节
    OnRoomTypeChanged = (i) => { label.text += "\n" + $"房间音质改为{i}"; },
    OnRoomQualityChanged = (weight, loss, delay) =>
    {
       Debug.Log($"音频质量:{weight} 丢包率:{loss}% 延迟:{delay}ms");
    },

});
```


### 加入房间

使用[服务端生成的鉴权信息](#服务端鉴权)进入房间。

进入房间成功之后，会通过 `TapRTCEvent` 中的 `OnEnterSuccess` 进行回调。

```cs
room.Join("authBuffer");
```

`authBuffer` 是在服务端生成的鉴权信息，详见下文[服务端鉴权](#服务端鉴权)一节的说明。

### 退出房间

退出房间之后，会通过 `TapRTCEvent` 中的 `OnExit` 进行回调。

```cs
room.Exit();
```


### 收听某人语音（默认收听）

```cs
bool ok = room.EnableUserAudio("userId");
```

### 拒收某人语音

```cs
bool ok = room.DisableUserAudio("userId");
```

### 打开/关闭语音

```cs
// 开启
bool ok = room.EnableAudioReceiver(true);

// 关闭
bool ok = room.EnableAudioReceiver(false);
```

这个接口设置音频下行的开关。
一般来说，推荐游戏使用[打开/关闭扬声器的接口](#打开关闭扬声器)。

### 切换音频质量

音频质量分为 LOW、MID、HIGH 三档。

进入房间后，可以切换音频质量。

```cs
room.ChangeRoomType(AudioPerfProfile.LOW);
room.ChangeRoomType(AudioPerfProfile.MID);
room.ChangeRoomType(AudioPerfProfile.HIGH);
```

切换音频质量会触发 `OnRoomTypeChanged` 回调。

### 获取当前房间的用户

```cs
HashSet<string> userIdList = room.Users;
```

## 音频控制相关接口

### 打开/关闭麦克风

```cs
// 打开
bool ok = TapRTC.GetAudioDevice().EnableMic(true);

// 关闭
bool ok = TapRTC.GetAudioDevice().EnableMic(false);
```

### 打开/关闭扬声器

```cs
// 打开
bool ok = TapRTC.GetAudioDevice().EnableSpeaker(true);

// 关闭
bool ok = TapRTC.GetAudioDevice().EnableSpeaker(false);
```

### 设置/获取音量

音量是 0 到 100 之间的整数。


```cs
int vol = 60;

// 设置麦克风音量
bool ok = TapRTC.GetAudioDevice().SetMicVolume(vol);
// 设置扬声器音量
bool ok = TapRTC.GetAudioDevice().SetSpeakerVolume(vol);

// 获取麦克风音量
int micVolume = TapRTC.GetAudioDevice().GetMicVolume();
// 获取扬声器音量
int speakerVolume = TapRTC.GetAudioDevice().GetSpeakerVolume();
```

### 开关播放设备

```cs
// 打开
bool ok = TapRTC.GetAudioDevice().EnableAudioPlay(true);
// 关闭
bool ok = TapRTC.GetAudioDevice().EnableAudioPlay(false);
```

### 打开/关闭耳返

```cs
// 打开
bool ok = TapRTC.GetAudioDevice().EnableLoopback(true);
// 关闭
bool ok = TapRTC.GetAudioDevice().EnableLoopback(false);
```

## 范围语音

范围语音功能可以支持以下特性：

- 玩家附近一定范围内的其他小队玩家也能听到该玩家的语音；
- 在同一房间内，支持大量用户同时打开麦克风进行语音通话。

要使用范围语音功能，首先创建房间时需要指定启用范围语音功能：

```cs
bool enableRangeAudio = true;
var room = await TapRTC.AcquireRoom("roomId", enableRangeAudio);
```

其次，玩家进入房间前，需要**切换音频质量为 LOW** 并设定小队号：

```cs
room.ChangeRoomType(AudioPerfProfile.LOW);

int teamId = 12345678;
bool ok = room.GetRtcRangeAudioCtrl().SetRangeAudioTeam(teamId);
```

接着需要指定语音模式：

- 世界模式：距离当前玩家[一定范围](#设置语音接收范围)内的其他小队成员也可以听到该玩家的语音；
- 小队模式：仅小队成员之间可以互相通话。

无论哪种模式下，小队成员之间都能互相通话，不论距离远近。

```cs
// 世界模式 
bool ok = room.GetRtcRangeAudioCtrl().SetRangeAudioMode(RangeAudioMode.WORLD);
// 小队模式
bool ok = room.GetRtcRangeAudioCtrl().SetRangeAudioMode(RangeAudioMode.TEAM);
```

然后进入房间，并[设置语音接收范围](#设置语音接收范围)、[更新声源方位](#更新声源方位朝向)，范围语音即可生效。

进入房间后，如需切换语音模式，可再次调用 `SetRangeAudioMode`。

### 设置语音接收范围

语音接收范围控制世界模式下其他小队成员能否听到声音，在进房后调用，一般仅需设置一次。

```cs
int range = 300;
room.GetRtcRangeAudioCtrl().UpdateAudioReceiverRange(range);
```

范围（`range`）之外的其他小队成员无法听到。

如果同时[启用 3D 语音](#开关-3d-语音)，那么距离远近还会影响音量大小：

| 音源距离 | 音量衰减 |
| - | - |
| `N < range/10` | 1.0 （无衰减）|
| `N >= range/10` | `range/10/N` |

### 更新声源方位朝向

成功进入房间后，需要在 Unity 的 Update 方法中调用该接口更新声源方位、朝向，范围语音才能生效。
方位通过世界坐标系的前、右、上三个坐标指定，朝向通过自身坐标系的前、右、上轴的单位向量指定。

```cs
int x = 1;
int y = 2;
int z = 3;
Position position = new Position(x, y, z);

float[] axisForward = new float[3] {1.0, 0.0, 0.0};
float[] axisRight = new float[3] {0.0, 1.0, 0.0};
float[] axisUp = new float[3] {0.0, 0.0, 1.0};
Forward forward = new Forward(axisForward, axisRight, axisUp);
bool ok = room.GetRtcRangeAudioCtrl().UpdateSelfPosition(position, forward);
```

朝向不影响是否能听到语音，因此如未[启用 3D 语音](#开关-3d-语音)，更新声源方位朝向时，朝向参数可随意设置。
但启用 3D 语音时，需正确设置朝向，这样才能得到准确的 3D 音效。

### 开关 3D 语音

开启 3D 语音，可以将无方位感的声音处理成带有声源方位感的声音，以增加玩家的沉浸感。
这个接口接受两个参数，第一个参数指定当前玩家是否可以听到 3D 音效，第二个参数指定 3D 语音是否作用于[小队内部](#设置范围语音)。

```cs
bool enable3D = true;
bool applyToTeam = true;
bool ok = TapRTC.GetAudioDevice().EnableSpatializer(enable3D, applyToTeam);
```

## 服务端

为了保证聊天通道的安全性，实时语音服务需要搭配游戏自己的鉴权服务器使用。
此外，游戏自己的服务器还用于响应合规回调和调用剔除玩家的接口。

### 服务端鉴权

客户端加入房间前，需要先通过开发者自己的鉴权服务器获取签名，之后实时语音云端会验证该签名，只有附带有效签名的请求才会被执行，非法请求会被阻止。

<Mermaid diagram={`
sequenceDiagram
客户端->>游戏鉴权服务器: 1. 加入房间前请求签名
游戏鉴权服务器-->>客户端: 2. 生成签名返回给客户端
客户端->>实时语音服务云端: 3. 将签名编码到请求中发给实时语音服务器
实时语音服务云端-->>客户端: 4. 对请求的内容和签名进行验证，执行后续操作
`} />

1. 客户端加入房间前，向游戏自己的鉴权服务器请求签名；
2. 鉴权服务器根据下文所述的[鉴权密钥算法](#鉴权密钥算法)生成签名返回给客户端；
3. 客户端获得签名后，编码到请求中，发给实时语音服务器；
4. 实时语音服务器对请求的内容和签名做一遍验证，验证通过后执行后续的实际操作。

签名采用 **HMAC-SHA1** 算法和 Base64 结合。
针对不同的请求，开发者生成不同的签名（参见后续格式说明），总体上，签名就是使用特定的密钥（在这里我们使用应用的 Master Key），对玩家和房间信息进行签名。

#### 鉴权密钥算法

鉴权所用到的签名产生过程涉及到**明文**、**密钥**和**加密算法**。

##### 明文

明文为以下字段的 json 字符串（字段顺序无关）



| 字段       | 类型/长度      | 说明                                                         |
| :--------- | :------------- | :----------------------------------------------------------- |
| `userId`     | `string`         | 进入语音聊天房间的用户标识                                   |
| `appId`      | `string`         | 游戏的 Client ID |
| `expireAt` | `unsigned int/4` | 过期时间（当前时间+有效期（单位：秒, 建议值：300s））          |
| `roomId`     | `string`         | 房间ID                                                       |

##### 密钥

游戏的 `Master Key`（即 `Server Secret`）。
`Client ID` 和 `Server Secret` 都可在 **开发者中心 > 你的游戏 > 游戏服务 > 应用配置** 查看。

##### 加密算法

加密算法采用 **HMAC-SHA1** 算法和 Base64 结合，类似 JWT 的格式。
生成的结果包含 payload（明文）和 sign（加密串）两部分。

1. 按照上面表格中字段构造 JSON 字符串。

2. Base64 编码上一步的 JSON 字符串得到 payload。

3. 通过 **HMAC-SHA1** 对 payload 用 **密钥** 生成 sign。

4. 使用 `.` （英文半角句号）拼接 payload 和 sign。

注意：JSON 字符串本身是字段顺序无关的，但是**传递的 payload 和用于生成 sign 的 payload 的字段顺序必须相同**，否则无法通过实时语音服务云端的校验。

下面给出 Java 和 Go 的示例代码供参考：

<details>
<summary>Java 示例</summary>

```java
import com.google.gson.Gson;
import org.junit.Test;
import javax.crypto.Mac;
import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import static org.junit.Assert.*;

import java.time.Instant;
import java.util.Base64;

public class JUnitTestSuite {

    private static final String MAC_NAME = "HmacSHA1";

    @Test
    public void testToken() throws Exception {
        String masterKey = "masterKey";
        Token t = new Token();
        t.appId = "appId";
        t.userId ="user_test";
        t.roomId ="room_test";;

        int expTime = (int) Instant.now().getEpochSecond() + 5 * 60;
        t.expireAt = expTime;

        // server authBuff to your SDK Client
        String authBuff = genToken(t, masterKey);
        assertNotNull(authBuff);
    }

    private  String genToken(Token token, String key) throws Exception {
        Gson gson = new Gson();
        String t  = gson.toJson(token);
        String payload = Base64.getEncoder().encodeToString(t.getBytes(StandardCharsets.UTF_8));
        byte[] pEncryptOutBuf = hmacSHA1Encrypt(payload.getBytes(StandardCharsets.UTF_8), key);
        String sign = Base64.getEncoder().encodeToString(pEncryptOutBuf);
        return payload + "." + sign;
    }


    byte[] hmacSHA1Encrypt(byte[] text, String key) throws Exception {
        byte[] data = key.getBytes(StandardCharsets.UTF_8);
        SecretKey secretKey = new SecretKeySpec(data, MAC_NAME);
        Mac mac = Mac.getInstance(MAC_NAME);
        mac.init(secretKey);
        return mac.doFinal(text);
    }

    class Token {
        String userId;
        String appId;
        String roomId;
        long expireAt;
    }
}
```

</details>

<details>
<summary>Go 示例</summary>

```go
package configs

import (
   "crypto/hmac"
   "crypto/sha1"
   "encoding/base64"
   "encoding/json"
   "fmt"
   "testing"
   "time"

   "github.com/stretchr/testify/assert"
)


func TestToken(t *testing.T) {
   assert := assert.New(t)
   t1 := &Token{
      UserId:   "appId",
      AppId:    "user_test",
      RoomId:   "roomId_test",
      ExpireAt: time.Now().Unix() + 5*60,
   }
   authBuff := GenToken(t1, "masterKey")
   assert.NotEmpty(authBuff)
   fmt.Println(authBuff)
}


const (
   sep = "."
)

func GenToken(t *Token, masterKey string) string {
   b, err := json.Marshal(t)
   if err != nil {
      return ""
   }
   payload := base64.StdEncoding.EncodeToString(b)
   sign := base64.StdEncoding.EncodeToString(HmacSHA1(masterKey, payload))
   return payload + sep + sign

}


func HmacSHA1(key string, data string) []byte {
   mac := hmac.New(sha1.New, []byte(key))
   mac.Write([]byte(data))
   return mac.Sum(nil)
}

type Token struct {
   UserId   string `json:"userId,omitempty"`
   AppId    string `json:"appId,omitempty"`
   RoomId   string `json:"roomId,omitempty"`
   ExpireAt int64  `json:"expireAt,omitempty"`
}
```

</details>

#### 部署方式

由于加密密钥使用了 `Server Secret`，加密算法的逻辑需在服务端实现，**切勿在客户端部署加密方案**。

#### 使用方法

游戏自己的鉴权服务器生成加密串后，下发给客户端，客户端调用[加入房间的接口](#加入房间)时传入相应的鉴权信息。

C# SDK 还提供了一个 `GenToken` 工具方法，供客户端接入 SDK 测试开发时使用。
比如，客户端开发人员可以在等待服务端开发人员实现、部署相应接口前先行在客户端测试加入房间的功能。
再比如，客户端开发人员可以比较 SDK 自带的 `GenToken` 生成的加密串和服务端生成的加密串是否一致，以便验证服务端正确实现了加密算法。

```cs
var authBuffer = AuthBufferHelper.GenToken(appId, roomId, userId, masterKey);
```

注意，由于这个方法需要传入 `Server Secret` 作为参数，**因此仅供内部测试开发时使用，切勿在对外提供的代码或安装包中使用**。
如果担心因为人为失误导致对外提供的代码或安装包中泄漏 `Server Secret`，或者出于安全考虑希望尽可能少的内部开发人员接触到 `Server Secret`，建议不使用 SDK 提供的 `GenToken` 方法，内部测试开发时也同样通过游戏自己的鉴权服务器生成加密串。

### 合规回调


开发者在实时语音服务管理后台（**开发者中心 > 你的游戏 > 游戏服务 > 实时语音>设置**）设置回调地址后，语音内容有违规时会调用设置的回调地址。

回调地址需要是一个 HTTP(S) 协议接口的 URL，需要支持 POST 方法，传输数据编码采用 UTF-8。

回调的 POST body 示例：

```json
{
    "HitFlag":true,
    "Msg":"不堪入目的消息内容",
    "ScanFinishTime":1634893736,
    "ScanStartTime":1634893734,
    "Scenes":[
        "default"
    ],
    "VoiceFilterPiece":[
        {
            "Duration":14000,
            "HitFlag":true,
            "Info":"不堪入目的消息内容",
            "MainType":"abuse",
            "Offset":0,
            "PieceStartTime":1634893734,
            "RoomId":"1234",
            "UserId":"123456",
            "VoiceFilterDetail":[
                {
                    "EndTime":0,
                    "KeyWord":"不堪入目的关键词",
                    "Label":"abuse",
                    "Rate":"0.00",
                    "StartTime":0
                }
            ]
        }
    ]
}
```

开发者可以在回调的Header中拿到 `sign` 字段，以便校验请求是否来自实时语音服务云端。

#### 合规回调校验算法

1. 在回调的 POST body 前附加 `POST` 前缀，得到 payload：

    ```
    POST{"HitFlag":true,"Msg":"不堪入目的消息内容",/* 略 */}
    ```

    注意：

    - **请直接从 HTTP 请求体中读取 JSON 内容**，反序列化到程序语言的数据结构可能会改变字段顺序，导致校验失败
    - POST 和 body 直接连接，中间无空格。

2. 对 payload 进行 HMAC-SHA1 加密，密钥为游戏应用的 `Server Secret`。

3. 对上一步的结果进行 BASE64 编码，得到 sign。

4. 和回调的 HTTP 头中的 sign 字段的值进行比较，相同则表明请求来自实时语音服务云端。

下面给出 Go 的示例代码供参考：

<details>
<summary>Go 示例</summary>

```go
package main

import (
   "crypto/hmac"
   "crypto/sha1"
   "encoding/base64"
   "github.com/labstack/echo/v4"
   "io/ioutil"
   "net/http"
)


func testCallback(c echo.Context) error {
   sign := c.Request().Header.Get("sign")
   body, _ := ioutil.ReadAll(c.Request().Body)
   checkGMESign(sign, "yourMasterKey", string(body))
   return c.NoContent(http.StatusOK)
}


func checkGMESign(signature, secretKey, body string) bool {
   sign := genSign(secretKey, body)
   return sign == signature
}

func genSign(secretKey, body string) string {
   content := "POST" + body
   a := hmacSHA1(secretKey, content)
   return base64.StdEncoding.EncodeToString(a)
}

func hmacSHA1(key string, data string) []byte {
   mac := hmac.New(sha1.New, []byte(key))
   mac.Write([]byte(data))
   return mac.Sum(nil)
}
```

</details>

### 剔除玩家

在一些场景下，游戏可能有从房间剔除玩家（踢人）的需求，比如涉及违规内容时。
开发者可以在自己的服务端调用实时语音服务的 REST API 接口实现这一需求。

#### 请求格式

对于 POST 和 PUT 请求，请求的主体必须是 JSON 格式，而且 HTTP Header 的 Content-Type 需要设置为 `application/json`。

请求的鉴权是通过 HTTP Header 里面包含的键值对来进行的，参数如下表：

Key|Value|含义|来源
---|----|---|---
`X-LC-Id`|`{{appid}}`|当前应用的 `App Id`（即 `Client Id`）|可在控制台查看
`X-LC-Key`|`{{masterkey}},master`|当前应用的 `Master Key`（即 `Server Secret`）|可在控制台查看

#### Base URL

REST API 请求的 Base URL（下文 curl 示例中用 `{{host}}` 表示）即应用绑定的 API 自定义域名，可以在控制台绑定、查看。
详见文档关于[绑定域名](/sdk/storage/guide/setup-dotnet#绑定域名)的说明。

#### REST API

```sh
curl -X DELETE \
-H "Content-Type: application/json" \
-H "X-LC-Id: {{appId}}" \
-H "X-LC-Key: {{masterKey}},master" \
-d '{"roomId":"YOUR-ROOM-ID", "userId":"YOUR-USER-ID"}' \
https://{{host}}/rtc/v1/room/member
```

成功剔除时响应的 HTTP 状态码为 `200`，出错时响应的 HTTP 状态码为相应的错误码，例如没有权限时 HTTP 状态码为 401.

注意，**剔除玩家后，玩家可以重新加入房间，加入房间后又可以发言。**
**游戏还需在自己的鉴权服务器上实现对应的封禁逻辑**，相应玩家重新加入房间时不下发签名，以阻止玩家通过重新加入房间的方式绕开限制。
