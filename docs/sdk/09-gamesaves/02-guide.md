---
id: guide
title: 云存档开发指南
sidebar_label: 开发指南
---

import MultiLang from '@theme/MultiLang';

阅读此文档前请先阅读[云存档功能介绍](/sdk/gamesaves/features/)，了解云存档的核心概念及功能。

## 创建存档

```cs
var gameSave = new TapGameSave
{
    Name = "internal name",
    Summary = "description",
    ModifiedAt = DateTime.Now.ToLocalTime(),
    PlayedTime = 60000L, // ms
    ProgressValue = 100,
    CoverFilePath = pic_path,
    GameFilePath = dll_path
};
await gameSave.Save();
```

上面的例子中，存档元信息字段的含义请参考[云存档保存的游戏元数据](/sdk/gamesaves/features#云存档保存的游戏元数据)。
保存时，SDK 会自动获取当前登录玩家信息，关联到存档上，同时会限制仅当前玩家可以读写存档本身及关联的存档文件、封面文件。

## 查询用户存档

最常见的场景是获取当前玩家的所有存档：

```cs
var collection = await TapGameSave.GetCurrentUserGameSaves();

foreach(var gameSave in collection){
    var name = gameSave.Summary; 
    var modifiedAt = gameSave.ModifiedAt;
    var playedTime = gameSave.PlayedTime;
    var progressValue = gameSave.ProgressValue;
    var coverFile = gameSave.CoverFile;
    var gameFile = gameSave.GameFile;
    var gameFileUrl = gameFile.Url;
}
```

当然也可以查询满足特定条件的存档，比如查询游戏进度超过第 3 关的存档：

```cs
TDSUser user = await TDSUser.GetCurrent();
LCQuery<TapGameSave> gameSaveQuery = TapGameSave.GetQueryWithUser(user);
gameSaveQuery.WhereGreaterThan("progressValue","3");
var collections = await gameSaveQuery.Find();
```

查询条件的构造请参考[数据存储指南查询章节的说明](/sdk/storage/guide/dotnet/)。

## 删改存档

玩家只能删除或修改自己的存档。

删除存档：

```cs
await gameSave.Delete();
```

修改存档：

```cs
gameSave.Summary = "new description";
await gameSave.Save();
```

## REST API

下面我们介绍云存档相关的 REST API 接口。
开发者可以自行编写程序或脚本调用这些接口在服务端进行管理性质的操作。

### 请求格式

对于 POST 和 PUT 请求，请求的主体必须是 JSON 格式，而且 HTTP Header 的 Content-Type 需要设置为 `application/json`。

请求的鉴权是通过 HTTP Header 里面包含的键值对来进行的，参数如下表：

Key|Value|含义|来源
---|----|---|---
`X-LC-Id`|`{{appid}}`|当前应用的 `App Id`（即 `Client Id`）|可在控制台查看
`X-LC-Key`|`{{appkey}}`|当前应用的 `App Key`（即 `Client Token`）|可在控制台查看
`X-LC-Session`|`<sessionToken>`|玩家的登录凭证

管理接口需要使用 `Master Key`：`X-LC-Key: {{masterkey}},master`。
`Master Key` 即 `Server Secret`，同样可在控制台查看。

详见文档关于[应用凭证](/sdk/storage/guide/setup-dotnet#应用凭证)的说明。

云存档限制只有添加存档的玩家本人可读可写，因此调用云存档的 REST API 接口时均需在 `X-LC-Session` HTTP 头中携带玩家的 `sessionToken` 或使用 `Master Key`，否则请求会因权限不足而失败。

### Base URL

REST API 请求的 Base URL（下文 curl 示例中用 `{{host}}` 表示）即应用绑定的 API 自定义域名，可以在控制台绑定、查看。
详见文档关于[绑定域名](/sdk/storage/guide/setup-dotnet#绑定域名)的说明。

### 接口列表

|接口名称|接口请求方法|接口地址|接口描述|
|------|----------|-------|-------|
|获取存档|GET|`/gamesaves/:id`|根据 id 来获取存档记录|
|查询存档|GET|`/gamesaves`|根据查询条件查询存档|
|添加存档|POST|`/gamesaves`|增加新存档|
|更新存档|PUT|`/gamesaves/:id`|根据 id 更新存档|
|删除存档|DELETE|`/gamesaves/:id`|根据 id 删除文档|

### 获取存档

```sh
curl -X GET \
  -H "X-LC-Id: {{appid}}" \
  -H "X-LC-Key: {{appkey}}" \
  -H "X-LC-Session: <sessionToken>" \
  https://API_BASE_URL/1.1/gamesaves/<objectId>
```

返回示例：

```json
{
    "updatedAt":"2021-08-16T09:18:30.093Z",
    "progressValue":123,
    "name":"dennis",
    "objectId":"611a2d65bcf94a3222b6d5f3",
    "createdAt":"2021-08-16T09:18:29.761Z",
    "gameFile":{
        "__type":"Pointer",
        "className":"_File",
        "objectId":"60d1af149be3180684000002"
    },
    "summary":"hello",
    "modifiedAt":{
        "__type":"Date",
        "iso":"2015-06-21T18:02:52.249Z"
    },
    "user": {
        "__type": "Pointer",
        "className": "_User",
        "objectId": "5b62c15a9f54540062427acc"
    }
}
```

各个字段的含义请参考[云存档保存的游戏元数据](/sdk/gamesaves/features#云存档保存的游戏元数据)。

### 查询存档

可以通过 `where` 参数指定查询条件查询存档：

```sh
curl -X GET \
  -H "X-LC-Id: {{appid}}" \
  -H "X-LC-Key: {{appkey}}" \
  -H "X-LC-Session: <sessionToken>" \
  -H "Content-Type: application/json" \
  -G \
  --data-urlencode 'where={"progressValue":123}' \
  https://API_BASE_URL/1.1/gamesaves
```

返回示例：

```json
{
    "results":[
        {
            "updatedAt":"2021-08-16T09:30:20.643Z",
            "name":"dennis",
            "createdAt":"2021-08-16T09:30:20.643Z",
            "gameFile":{
                "__type":"Pointer",
                "className":"_File",
                "objectId":"60d1af149be3180684000002"
            },
            "summary":"hello",
            "modifiedAt":{
                "__type":"Date",
                "iso":"2015-06-21T18:02:52.249Z"
            },
            "objectId":"611a302cbcf94a3222b6d687"
        }
    ]
}
```

`where` 的用法详见[数据存储 REST API 指南](/sdk/storage/guide/rest#查询约束)

### 添加存档

添加存档时的必填字段和可选字段请参考[云存档保存的游戏元数据](/sdk/gamesaves/features#云存档保存的游戏元数据)。
注意，即使在 `X-LC-Session` HTTP 头中传递了用户的 `sessionToken`，云端也不会自动填充 `user` 字段，开发者仍然需要在调用接口时传入 `user` 字段。
**请设置存档本身和存档指向的 `gameFile` 和 `cover` 的 ACL 为仅限当前用户读取。**

```
curl -X POST \
  -H "X-LC-Id: {{appid}}" \
  -H "X-LC-Key: {{appkey}}" \
  -H "X-LC-Session: <sessionToken>" \
  -H "Content-Type: application/json" \
  -d '{
      "progressValue":123,
      "playedTime":1283490343,
      "name":"dennis",
      "objectId":"611a2d65bcf94a3222b6d5f3",
      "gameFile":{"id":"55a39634e4b0ed48f0c1845c", "type":"_File"},
      "cover":{"id": "543cbaede4b07db196f50f3c", "__type": "File"},
      "summary":"hello",
      "modifiedAt":{"__type":"Date", "iso":"2015-06-21T18:02:52.249Z"},
      "user":{"__type":"Pointer", "className": "_User", "objectId": "558e20cbe4b060308e3eb36c"},
      "ACL":{"558e20cbe4b060308e3eb36c":{"write":true,"read":true}}
  }' \
https://API_BASE_URL/1.1/gamesaves
```

成功创建时会返回 objectId 和创建时间：

```
{"objectId":"611a3407bcf94a3222b6d789", "createdAt":"2021-08-16T09:46:47.290Z"}
```

失败时会报错，例如：

- `gameFile is required.`：遗漏了必填字段 `gameFile`。
- `Forbidden to add new fields by class '_GameSave' permissions.`：提交了非法字段，云存档目前暂不支持添加自定义字段。

### 更新存档


```sh
curl -X PUT \
  -H "X-LC-Id: {{appid}}" \
  -H "X-LC-Key: {{appkey}}" \
  -H "X-LC-Session: <sessionToken>" \
  -H "Content-Type: application/json" \
  -d '{"progressValue": 114514}' \
  https://API_BASE_URL/1.1/gamesave/<objectId>
```

成功时返回 objectId 和更新时间： 

```json
{"updatedAt":"2021-08-16T09:49:49.579Z", "objectId":"611a34bdbcf94a3222b6d7af"}
```

失败时会报错，例如：

- `Forbidden to add new fields by class '_GameSave' permissions.`：提交了非法字段，云存档目前暂不支持添加自定义字段。

### 删除存档

```
curl -X DELETE \
  -H "X-LC-Id: {{appid}}" \
  -H "X-LC-Key: {{appkey}}" \
  -H "X-LC-Session: <sessionToken>" \
  https://API_BASE_URL/1.1/gamesave/<objectId>
```

会返回

```json
{}
```

删除存档时也可以附加 `where` 条件，防止误删。
参见[有条件删除对象](/sdk/storage/guide/rest#有条件删除对象)。