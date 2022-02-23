---
title: 全文搜索 REST API
sidebar_position: 9
---



全文搜索服务提供以下 REST API 接口：

| URL | HTTP | 功能 |
| - | - | - |
| /1.1/search/select | GET | 条件查询 |
| /1.1/search/mlt | GET | moreLikeThis 相关性查询 |
| /1.1/search/analyze | GET | 分词结果查询 |

在调用全文搜索的 REST API 接口前，需要首先为相应的 Class 启用搜索。
另外也请参考[数据存储 REST API 使用详解](/sdk/storage/guide/rest/)中关于 API Base URL、请求格式、响应格式的说明，以及[全文搜索指南](/sdk/storage/guide/fulltext-search/)的《自定义分词》章节。

## 条件查询

`GET /1.1/search/select` REST API 接口提供全文搜索功能。


```sh
curl -X GET \
  -H "X-LC-Id: {{appid}}" \
  -H "X-LC-Key: {{appkey}}" \
  "https://{{host}}/1.1/search/select?q=dennis&limit=200&clazz=GameScore&order=-score"
```

返回类似：

``` json
{
"hits": 1,  
"results": [
  {
    "_app_url": "http://stg.pass.com//1/go/com.leancloud/classes/GameScore/51e3a334e4b0b3eb44adbe1a",
    "_deeplink": "com.leancloud.appSearchTest://leancloud/classes/GameScore/51e3a334e4b0b3eb44adbe1a",
    "_highlight": null,
    "updatedAt": "2011-08-20T02:06:57.931Z",
    "playerName": "Sean Plott",
    "objectId": "51e3a334e4b0b3eb44adbe1a",
    "createdAt": "2011-08-20T02:06:57.931Z",
    "cheatMode": false,
    "score": 1337
  }
],
"sid": "cXVlcnlUaGVuRmV0Y2g7Mzs0NDpWX0NFUmFjY1JtMnpaRDFrNUlBcTNnOzQzOlZfQ0VSYWNjUm0yelpEMWs1SUFxM2c7NDU6Vl9DRVJhY2NSbTJ6WkQxazVJQXEzZzswOw=="
}
```

查询的参数支持：

参数 | 约束 | 说明
---|---|---
`q`| 必须 | 查询文本，支持 elasticsearch 的 query string 语法。参见 [q 查询语法](#q- 查询语法)。
`skip`| 可选 | 跳过的文档数目，默认为 0
`limit`| 可选 | 返回集合大小，默认 100，最大 1000
`sid`| 可选 | 之前查询结果中返回的 sid 值，用于分页，对应于 elasticsearch 中的 [scroll id]。
`fields`| 可选 | 逗号隔开的字段列表，查询的字段列表
`highlights`| 可选 | 高亮字段，可以是通配符 `*`，也可以是字段列表（逗号隔开的字符串）。
`clazz`| 可选 | 类名，如果没有指定或者为空字符串，则搜索所有启用了全文搜索的 class。
`include`| 可选 | 关联查询内联的 Pointer 字段列表，逗号隔开，形如 `user,comment` 的字符串。**仅支持 include Pointer 类型**。
`order`| 可选 | 排序字段，形如 `-score,createdAt` 逗号隔开的字段，负号表示倒序，可以多个字段组合排序。
`sort`| 可选 | 复杂排序字段，例如地理位置信息排序，见下文描述。

[scroll id]: https://www.elastic.co/guide/en/elasticsearch/reference/7.4/search-request-body.html#request-body-search-scroll

返回结果属性介绍：

- `results`：符合查询条件的结果文档。
- `hits`：符合查询条件的文档总数
- `sid`：标记本次查询结果，下次查询继续传入这个 sid 用于查找后续的数据，用来支持翻页查询。

返回结果 results 列表里是一个一个的对象，字段是你在全文搜索设置里启用的字段列表，并且有三个特殊字段：

- `_app_url`：全文搜索结果在网站上的链接。
- `_deeplink`：全文搜索的程序调用 URL，也就是 deeplink。
- `_highlight`：高亮的搜索结果内容，关键字用 `em` 标签括起来。如果搜索时未传入 `highlights` 参数，则该字段为 null。 

最外层的 `sid` 用来标记本次查询结果，下次查询继续传入这个 sid 将翻页查找后 200 条数据：

``` sh
curl -X GET \
  -H "X-LC-Id: {{appid}}" \
  -H "X-LC-Key: {{appkey}}" \
  "https://{{host}}/1.1/search/select?q=dennis&limit=200&clazz=GameScore&order=-score&sid=cXVlcnlUaGVuRmV0Y2g7Mzs0NDpWX0NFUmFjY1JtMnpaRDFrNUlBcTNnOzQzOlZfQ0VSYWNjUm0yelpEMWs1SUFxM2c7NDU6Vl9DRVJhY2NSbTJ6WkQxazVJQXEzZzswOw"
```

直到返回结果为空。

### q 查询语法

q 参数遵循 elasticsearch 的 [query string 语法](https://www.elastic.co/guide/en/elasticsearch/reference/7.4/query-dsl-query-string-query.html#query-string-syntax)。建议详细阅读这个文档。这里简单做个举例说明。

如果你非常熟悉 elasticsearch 的 query string 语法，那么可以跳至[地理位置信息查询](#地理位置信息查询)一节（地理位置查询是我们在 elasticsearch 上添加的扩展功能）。

查询的关键字保留字符包括： `+ - = && || > < ! ( ) { } [ ] ^ " ~ * ? : \ /`，当出现这些字符的时候，请对这些保留字符做 URL Escape 转义。

#### 基础查询语法

- 查询某个关键字，例如 `可乐`。
- 查询**多个关键字**，例如 `可口 可乐`，空格隔开，返回的结果默认按照文本相关性排序，其他排序方法请参考上文中的 [order](#条件查询) 和下文中的 [sort](#复杂排序)。
- 查询某个**短语**，例如 `"lady gaga"`，注意用双引号括起来，这样才能保证查询出来的相关对象里的相关内容的关键字也是按照 `lady gaga` 的顺序出现。
- 根据**字段查询**，例如根据 nickname 字段查询：`nickename:逃跑计划`。
- 根据字段查询，也可以是短语，记得加双引号在短语两侧： `nickename:"lady gaga"`
- **复合查询**，AND 或者 OR，例如 `nickname:(逃跑计划 OR 夜空中最亮的星)`
- 假设 book 字段是 object 类型，那么可以根据**内嵌字段**来查询，例如 `book.name:clojure OR book.content:clojure`，也可以用通配符简写为 `book.*:clojure`。
- 查询没有 title 的对象： `_missing_:title`。
- 查询有 title 字段并且不是 null 的对象：`_exists_:title`。

**上面举例根据字段查询，前提是这些字段在 class 的全文搜索设置里启用了索引。**

#### 通配符和正则查询

`qu?ck bro*` 就是一个通配符查询，`?` 表示一个单个字符，而 `*` 表示 0 个或者多个字符。

通配符其实是正则的简化，可以使用正则查询：

```
name:/joh?n(ath[oa]n)/
```

正则的语法参考 [正则语法](https://www.elastic.co/guide/en/elasticsearch/reference/7.4/query-dsl-regexp-query.html#regexp-syntax)。

#### 模糊查询

根据文本距离相似度（Fuzziness）来查询。例如 `quikc~`，默认根据 [Damerau-Levenshtein 文本距离算法](http://en.wikipedia.org/wiki/Damerau-Levenshtein_distance)来查找最多两次变换的匹配项。

例如这个查询可以匹配 `quick`、`qukic`、`qukci` 等。

#### 范围查询

```
// 数字 1 到 5：
count:[1 TO 5]

// 2012 年内
date:[2012-01-01 TO 2012-12-31]

//2012 年之前
{* TO 2012-01-01}
```

`[]` 表示闭区间，`{}` 表示开区间。

还可以采用比较运算符：

```
age:>10
age:>=10
age:<10
age:<=10
```

#### 查询分组

查询可以使用括号分组：

```
(quick OR brown) AND fox
```

#### 特殊类型字段说明

- objectId 在全文搜索的类型为 string，因此可以按照字符串查询： `objectId: 558e20cbe4b060308e3eb36c`，不过这个没有特别必要了，你可以直接走 SDK 查询，效率更好。
- createdAt 和 updatedAt 映射为 date 类型，例如 `createdAt:["2015-07-30T00:00:00.000Z" TO "2015-08-15T00:00:00.000Z"]` 或者 `updatedAt: [2012-01-01 TO 2012-12-31]`
- 除了 createdAt 和 updatedAt 之外的 Date 字段类型，需要加上 `.iso` 后缀做查询： `birthday.iso: [2012-01-01 TO 2012-12-31]`
- Pointer 类型，可以采用 `字段名.objectId` 的方式来查询： `player.objectId: 558e20cbe4b060308e3eb36c and player.className: Player`，pointer 只有这两个属性，全文搜索不会 include 其他属性。
- Relation 字段的查询不支持。
- File 字段，可以根据 url 或者 id 来查询：`avartar.url: "https://leancloud.cn/docs/app_search_guide.html#搜索_API"`，无法根据文件内容做全文搜索。

### 复杂排序

假设你要排序的字段是一个数组，比如分数数组 `scores`，你想根据平均分来倒序排序，并且没有分数的排最后，那么可以传入：

``` sh
--data-urlencode 'sort=[{"scores":{"order":"desc","mode":"avg","missing":"_last"}}]'
```

也就是 `sort` 可以是一个 JSON 数组，其中每个数组元素是一个 JSON 对象：

``` json
{"scores":{"order":"desc","mode":"avg","missing":"_last"}}
```

排序的字段作为 key，字段可以设定下列选项：

- `order`：`asc` 表示升序，`desc` 表示降序
- `mode`：如果该字段是多值属性或者数组，那么可以选择按照最小值 `min`、最大值 `max`、总和 `sum` 或者平均值 `avg` 来排序。
- `missing`：决定缺失该字段的文档排序在开始还是最后，可以选择 `_last` 或者 `_first`，或者指定一个默认值。

多个字段排序就类似：

``` json
[
  {
    "scores":{"order":"desc","mode":"avg","missing":"_last"}
  },
  {
    "updatedAt": {"order":"asc"}
  }
]
```

### 地理位置信息查询

如果 class 里某个列是 `GeoPoint` 类型，那么可以根据这个字段的地理位置远近来排序，例如假设字段 `location` 保存的是 `GeoPoint` 类型，那么查询 `[39.9, 116.4]` 附近的玩家可以通过设定 sort 为：

``` json
{
  "_geo_distance" : {
                "location" : [39.9, 116.4],
                "order" : "asc",
                "unit" : "km",
                "mode" : "min",
   }
}
```

`order` 和  `mode` 含义跟上述复杂排序里的一致，`unit` 用来指定距离单位，例如 `km` 表示千米，`m` 表示米，`cm` 表示厘米等。

## moreLikeThis 相关性查询

除了 `/1.1/search/select` 之外，我们还提供了 `/1.1/search/mlt` API 接口，用于相似文档的查询，可以用来实现相关性推荐。

假设我们有一个 Class 叫 `Post` 是用来保存博客文章的，我们想基于它的标签字段 `tags` 做相关性推荐：

```sh
curl -X GET \
  -H "X-LC-Id: {{appid}}" \
  -H "X-LC-Key: {{appkey}}" \
  "https://{{host}}/1.1/search/mlt?like=clojure&clazz=Post&fields=tags"
```

我们设定了 `like` 参数为 `clojure`，查询的相关性匹配字段 `fields` 是 `tags`，也就是从 `Post` 里查找 `tags` 字段跟 `clojure` 这个文本相似的对象，返回类似：

``` json
{
"results": [
  {  
    "tags":[  
          "clojure",
           "数据结构与算法"
     ],
     "updatedAt":"2016-07-07T08:54:50.268Z",
     "_deeplink":"cn.leancloud.qfo17qmvr8w2y6g5gtk5zitcqg7fyv4l612qiqxv8uqyo61n:\/\/leancloud\/classes\/Article\/577e18b50a2b580057469a5e",
     "_app_url":"https:\/\/leancloud.cn\/1\/go\/cn.leancloud.qfo17qmvr8w2y6g5gtk5zitcqg7fyv4l612qiqxv8uqyo61n\/classes\/Article\/577e18b50a2b580057469a5e",
     "objectId":"577e18b50a2b580057469a5e",
     "_highlight":null,
     "createdAt":"2016-07-07T08:54:13.250Z",
     "className":"Article",
     "title":"clojure persistent vector"
  },
  // ……
],
"sid": null
}
```

除了可以通过指定 `like` 这样的相关性文本来指定查询相似的文档之外，还可以通过 likeObjectIds 指定一个对象的 objectId 列表，来查询相似的对象：

```sh
curl -X GET \
  -H "X-LC-Id: {{appid}}" \
  -H "X-LC-Key: {{appkey}}" \
  "https://{{host}}/1.1/search/mlt?likeObjectIds=577e18b50a2b580057469a5e&clazz=Post&fields=tags"
```

这次我们换成了查找和 `577e18b50a2b580057469a5e` 这个 objectId 指代的对象相似的对象。

更详细的查询参数说明：

参数 | 约束 | 说明
---|---|---
`clazz`| 必须 | 类名
`like`| 可选 |**和 `likeObjectIds` 参数二者必须提供其中之一**。代表相似的文本关键字。
`likeObjectIds`| 可选 |**和 `like` 参数二者必须提供其中之一**。代表相似的对象 objectId 列表，用逗号隔开。
`min_term_freq`| 可选 |**文档中一个词语至少出现次数，小于这个值的词将被忽略，默认是 2**，如果返回文档数目过少，可以尝试调低此值。
`min_doc_freq`| 可选 |**词语至少出现的文档个数，少于这个值的词将被忽略，默认值为 5**，同样，如果返回文档数目过少，可以尝试调低此值。
`max_doc_freq`| 可选 | 词语最多出现的文档个数，超过这个值的词将被忽略，防止一些无意义的热频词干扰结果，默认无限制。
`skip`| 可选 | 跳过的文档数目，默认为 0
`limit`| 可选 | 返回集合大小，默认 100，最大 1000
`fields`| 可选 | 相似搜索匹配的字段列表，用逗号隔开，默认为所有索引字段 `_all`
`include`| 可选 | 关联查询内联的 Pointer 字段列表，逗号隔开，形如 `user,comment` 的字符串。**仅支持 include Pointer 类型**。

更多内容参考 [ElasticSearch 文档](https://www.elastic.co/guide/en/elasticsearch/reference/7.4/query-dsl-mlt-query.html)。

## 分词结果查询

全文搜索会对 String 类型的字段自动进行分词处理。
如果发现搜索结果不符合预期，推荐先通过 `analyze` API 检查分词结果（要求使用 master key）。
`analyze` API 也用于验证自定义词库是否生效。

```sh
curl -X GET \
  -H "X-LC-Id: {{appid}}" \
  -H "X-LC-Key: {{masterkey}},master" \
  "https://{{host}}/1.1/search/analyze?clazz=GameScore&text=响应式设计"
```

参数包括 `clazz` 和 `text`。`text` 就是测试的文本段，返回结果：


```json
{
  "tokens": [
    {
      "token": "响应",
      "start_offset": 0,
      "end_offset": 2,
      "type": "word",
      "position": 0
    },
    {
      "token": "式",
      "start_offset": 2,
      "end_offset": 3,
      "type": "word",
      "position": 1
    },
    {
      "token": "设计",
      "start_offset": 3,
      "end_offset": 5,
      "type": "word",
      "position": 2
    }
  ]
}
```

可以看到，分词系统将「响应式设计」分为了三个词。
如果分词系统认为「响应式设计」是一个词（比如上传了包含「响应式设计」一词的自定义词库），那么返回结果会是：

```json
{
  "tokens": [
    {
      "token": "响应式设计",
      "start_offset": 0,
      "end_offset": 5,
      "type": "word",
      "position": 0
    }
  ]
}
```
