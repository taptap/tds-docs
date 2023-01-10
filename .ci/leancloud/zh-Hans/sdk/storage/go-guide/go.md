---
title: 数据存储开发指南 · Go
sidebar_label: Go 开发指南
slug: /sdk/storage/guide/go/
sidebar_position: 2
---

import Path from "/src/docComponents/path";

数据存储是云服务提供的核心功能之一，可用于存放和查询应用数据。下面的代码展示了如何创建一个对象并将其存入云端：

```go
import "github.com/leancloud/go-sdk/leancloud"

type Todo struct {
  leancloud.Object
  Title   string `json:"title"`
  Content string `json:"content"`
}

todo := Todo{
  Title: "工程师周会",
  Content: "周二两点，全体成员",
}

if ref, err := client.Class("Todo").Create(&todo); err != nil {
  panic(err)
}
```

我们为各个平台或者语言开发的 SDK 在底层都是通过 HTTPS 协议调用统一的 REST API，提供完整的接口对数据进行各类操作。

## SDK 安装与初始化

请阅读 [Go 安装指南](/sdk/storage/guide/setup-go/)。

## 对象

### `leancloud.Object`

`leancloud.Object` 是云服务对复杂对象的封装，每个 `leancloud.Object` 包含若干与 JSON 格式兼容的属性值对（也称键值对，key-value pairs）。这个数据是无模式化的（schema free），意味着你不需要提前标注每个 `leancloud.Object` 上有哪些 key，你只需要随意设置键值对就可以，云端会保存它。

比如说，一个保存着单个 Todo 的 `leancloud.Object` 可能包含如下数据：

```json
title:      "给小林发邮件确认会议时间",
isComplete: false,
priority:   2,
tags:       ["工作", "销售"]
```

由于 Go 的类型系统的特性，开发者在使用 `map[string]interface{}` 时需要进行类型断言，所以我们强烈建议开发者在与 SDK 交互的过程中使用自行定义的结构体，并且将 `leancloud.Object` 作为元数据嵌入到结构体中，SDK 会尽可能将对象上的字段绑定到结构体的对应字段上。

在定义自定义结构体时，除了要嵌入 `leancloud.Object` 作为元数据外，还需要对希望使用的 **可导出** 字段加上 **JSON Tag**。因为 Go SDK 使用反射来对自定义结构体进行修改，而反射是无法访问结构体的 **非导出字段** 的。

对于上面 Todo 类型，可以定义新的对象类型:

```go
type Todo struct {
  leancloud.Object
  Title      string   `json:"title"`
  IsComplete bool     `json:"isComplete"`
  Priority   int      `json:"priority"`
  Tags       []string `json:"tags"`
}
```

### 数据类型

`leancloud.Object` 支持的数据类型包括 `String`、`Number`、`Boolean`、`Object`、`Array`、`Date` 等等。你可以通过嵌套的方式在 `Object` 或 `Array` 里面存储更加结构化的数据。

`leancloud.Object` 还支持两种特殊的数据类型 `Pointer` 和 `File`，可以分别用来存储指向其他 `leancloud.Object` 的指针以及二进制数据。Go SDK 中 `leancloud.Object` 类型可以当作 `Pointer` 使用。

`leancloud.Object` 同时支持 `GeoPoint`，可以用来存储地理位置信息。参见 [GeoPoint](#geopoint)。

以下是一些示例：

```go
// 基本类型
boolean := true
number := 2021
str := "LeanCloud"
date := time.Now()
slice := []byte("LeanCloud")
point := leancloud.GeoPoint{
  Latitude: 39.9,
  Longitude: 116.4,
}

// 定义结构体
type Meeting struct {
  leancloud.Object
  Title      string     `json:"title"`
  Number     int        `json:"number"`
  Progress   float64    `json:"progress"`
  Date       time.Time  `json:"date"`
  Attachment []byte     `json:"attachment"`
}

// 构建对象
meeting := Meeting{
  Title: "Meeting",
  Number: 1,
  Progress: 10.0,
  Date: time.Now(),
  Attachment: []byte("Attachment content"),
}
```

我们不推荐在 `leancloud.Object` 里面存储图片、文档等大型二进制数据。每个 `leancloud.Object` 的大小不应超过 **128 KB**。如需存储大型文件，可创建 `leancloud.File` 实例并将将其关联到 `leancloud.Object` 的某个属性上。参见 [文件](#文件)。

注意：时间类型在云端将会以 UTC 时间格式存储，但是客户端在读取之后会转化成本地时间。

**<Path to="storage" /> > 结构化数据** 中展示的日期数据也会依据操作系统的时区进行转换。一个例外是当你通过 REST API 获得数据时，这些数据将以 UTC 呈现。你可以手动对它们进行转换。

若想了解云服务是如何保护应用数据的，请阅读[数据和安全](/sdk/storage/guide/security/)。

### 保存对象

下面的代码将一个 class 为 `Todo` 的对象存入云端：

Go SDK 支持 **自定义类型** 或 **hashmap** 创建对象:

```go
// 使用自定义类型
type Todo struct {
  leancloud.Object
  Title    string `json:"title"`
  Priority string `json:"priority"`
}

todo := Todo {
  Title: "马拉松报名",
  Priority: 2,
}

if ref, err := client.Class("Todo").Create(&todo); err != nil {
    panic(err)
}

// 使用 map
if ref, err := client.Class("Todo").Create(map[string]interface{}{
    "title": "马拉松报名",
    "priority": 2,
}); err != nil {
    panic(err)
}
```

为了确认对象已经保存成功，我们可以到 **<Path to="storage" /> > 结构化数据 > `Todo`** 里面看一下，应该会有一行新的数据产生。点一下这个数据的 `objectId`，应该能看到类似这样的内容：

```json
{
  "title":     "马拉松报名",
  "priority":  2,
  "ACL": {
    "*": {
      "read":  true,
      "write": true
    }
  },
  "objectId":  "582570f38ac247004f39c24b",
  "createdAt": "2017-11-11T07:19:15.549Z",
  "updatedAt": "2017-11-11T07:19:15.549Z"
}
```

注意，无需在 **<Path to="storage" /> > 结构化数据** 里面创建新的 `Todo` class 即可运行前面的代码。如果 class 不存在，它将自动创建。

以下是一些对象的内置属性，会在对象保存时自动创建，无需手动指定：

内置属性 | 类型 | 描述
--- | --- | ---
`objectId` | `string` | 该对象唯一的 ID 标识。
`ACL` | `ACL` | 该对象的权限控制，实际上是一个 JSON 对象，控制台做了展现优化。
`createdAt` | `time.Time` | 该对象被创建的时间。
`updatedAt` | `time.Time` | 该对象最后一次被修改的时间。

这些属性的值会在对象被存入云端时自动填入，代码中尚未保存的 `leancloud.Object` 不存在这些属性。

属性名（**keys**）只能包含字母、数字和下划线。自定义属性不得以双下划线（`__`）开头或与任何系统保留字段和内置属性（`ACL`、`className`、`createdAt`、`objectId` 和 `updatedAt`）重名，无论大小写。

属性值（**values**）可以是字符串、数字、布尔值、数组或字典（任何能以 JSON 编码的数据）。参见 [数据类型](#数据类型)。

我们推荐使用驼峰式命名法（CamelCase）为类和属性来取名。类，采用大驼峰法，如 `CustomData`。属性，采用小驼峰法，如 `imageUrl`。

### 获取对象

对于已经保存到云端的 `leancloud.Object`，可以通过它的 `objectId` 将其取回：

在使用 Go SDK 获取已经保存到云端的对象时，我们推荐使用自定义类型对象；如果不想使用自定义类型的对象，也可以直接使用 `leancloud.Object`。

```go
// 使用自定义类型对象
todo := new(Todo)
if err := client.Class("Todo").ID("582570f38ac247004f39c24b").Get(todo); err != nil {
  panic(err)
}

// 使用 Object
object := new(leancloud.Object)
if err := client.Class("Todo").ID("582570f38ac247004f39c24b").Get(object); err != nil {
  panic(err)
}
```

使用自定义类型对象时，SDK 会将对象的字段尽力绑定到自定义类型对象的导出字段上；

使用 `leancloud.Object` 获取对象时，可以使用 `leancloud.Object.Raw()` 来获取对象的 `map[string]interface{}` 原始数据；或者使用 `leancloud.Object` 提供的一系列[类型转换方法](https://pkg.go.dev/github.com/leancloud/go-sdk/leancloud#Object)来获取对象上某个属性的值。

### 更新对象

在使用 Go SDK 时，更新对象和创建对象相同，可以使用自定义类型对象或者 `map`。

在使用自定义类型的对象时，只需要填充想要更新的字段即可，其它字段默认会被初始化为零值，在执行更新操作时 SDK 会忽略对象中的零值字段。注意：**如果想要更新某个字段为对应类型的零值，应该将该字段声明为指针类型。**

```go
// 使用自定义类型对象更新
diff := Todo{
  Title: "Another Meeting",
}

if err := client.Class("Todo").ID("582570f38ac247004f39c24b").Update(diff); err != nil {
  panic(err)
}

// 使用 map[string]interface{} 更新

if err := client.Class("Todo").ID("582570f38ac247004f39c24b").Update(map[string]interface{}{
  "title": "Another Meeting",
}); err != nil {
  panic(err)
}
```

如果已经有之前保存的对象，则可以使用 client.Object(todo).Update 代替 client.Class("Todo").ID(id).Update 来更新对象。

#### 关于 Go 中的零值

由于 Go 的特性，所有的变量在被声明后都会被初始化为对应类型的 **零值**，例如 `int` 的零值为 `0`，`string` 的零值为 `""`等等。你可以通过嵌套的方式在

那么在使用 `Update` 时传入自定义结构体就会带来一个问题：字段的零值到底是用户设置的还是被默认初始化的？

想要解决这个问题只需要将字段的类型变为相应的指针类型即可:

```go
// 定义结构体
type Todo struct {
  leancloud.Object
  Title string `json:"title"`
  Content string `json:"content"`
  Order *int // 可以指定一个编号，如果不指定则为空不应为 0  
}
```

由于字段变为了指针类型，如果不对字段赋值，那么该字段为指针的零值 `nil`，而不是对应非指针类型的零值，这样就不会产生二义性问题。

另一种解决方案则是则是不使用自定义结构体，转而使用 `map[string]interface{}`。对于 `map[string]interface{}` 来说，如果 `key` 不存在，则 `value` 也不存在，不会产生自定义结构体字段的零值问题。

#### 有条件更新对象

通过传入查询参数 `Query`，可以按照指定条件去更新对象——当条件满足时，执行更新，条件不满足时，不执行更新并返回 `305` 错误。

例如，用户的账户表 `Account` 有一个余额字段 `balance`。为避免余额出现负值，只有当金额小于或等于余额的时候才能接受请求：

```go
query := client.Class("Account").NewQuery().GreaterThanOrEqualTo("balance", 100)

if err := client.Class("Account").ID("5745557f71cfe40068c6abe0").UpdateWithQuery(map[string]interface{}{
    "balance": leancloud.OpIncrement(-100),
}, query); err != nil {
    panic(err)
}
```

#### 更新计数器

设想我们正在开发一个微博，需要统计一条微博有多少个赞和多少次转发。由于赞和转发的操作可能由多个客户端同时进行，直接在本地更新数字并保存到云端的做法极有可能导致差错。为保证计数的准确性，可以通过 **原子操作** 来增加或减少一个属性内保存的数字：

```go
leancloud.OpIncrement(1)
```

可以指定需要增加或减少的值。若未指定，则默认使用 `1`。

注意，虽然原子增减支持浮点数，但因为底层数据库的浮点数存储格式限制，会有舍入误差。
因此，需要原子增减的字段建议使用整数以避免误差，例如 `3.14` 可以存储为 `314`，然后在客户端进行相应的转换。
否则，以比较大小为条件查询对象的时候，需要特殊处理，
`< a` 需改查 `< a + e`，`> a` 需改查 `> a - e`，`== a` 需改查 `> a - e` 且 `< a + e`，其中 `e` 为误差范围，据所需精度取值，比如 `0.0001`。

#### 更新数组

更新数组也是原子操作。使用以下方法可以方便地维护数组类型的数据：

- `OpAdd(value)` 将指定对象附加到数组末尾。
- `OpAddUnique(value)` 将指定对象附加到数组末尾，确保对象唯一。
- `OpRemove(value)` 从数组字段中删除指定对象的所有实例。

例如，`Todo` 用一个 `alarms` 属性保存所有闹钟的时间。下面的代码将多个时间加入这个属性：

```go
alarm1 := time.Parse("2006-01-02 15:04:05Z", "2018-04-30 07:10:00Z")
alarm2 := time.Parse("2006-01-02 15:04:05Z", "2018-04-30 07:20:00Z")
alarm3 := time.Parse("2006-01-02 15:04:05Z", "2018-04-30 07:30:00Z")

alarms := time.Time{alarm1, alarm2, alarm3}

if ref, err := client.Class("Todo").Create(map[string]interface{}{
    "alarms": leancloud.OpAdd(alarms),
}); err != nil {
    panic(err)
}
```

### 删除对象

下面的代码从云端删除一个 `Todo` 对象；

```go
if err := client.Class("Todo").ID("582570f38ac247004f39c24b").Destroy(); err != nil {
    panic(err)
}
```

注意，删除对象是一个较为敏感的操作，我们建议你阅读[ACL 权限管理开发指南](/sdk/storage/guide/acl/)来了解潜在的风险。熟悉 class 级别、对象级别和字段级别的权限可以帮助你有效阻止未经授权的操作。

### 数据模型

对象之间可以产生关联。拿一个博客应用来说，一个 `Post` 对象可以与许多个 `Comment` 对象产生关联。云服务支持三种关系：一对一、一对多、多对多。

#### 一对一、一对多关系

一对一、一对多关系可以通过将 `leancloud.Object` 保存为另一个对象的属性值的方式产生。比如说，让博客应用中的一个 `Comment` 指向一个 `Post`。

下面的代码会创建一个含有单个 `Comment` 的 `Post`：

```go
type Post struct {
    leancloud.Object
    Title   string `json:"title"`
    Content string `json:"content"`
}

type Comment struct {
    leancloud.Object
    Parent  Post   `json:"parent"` // 嵌入自定义结构体
    Content string `json:"content"`
}

post := Post{
    Title: "饿了……",
    Content: "中午去哪吃呢？",
}

if ref, err := client.Class("Post").Create(&post); err != nil {
    panic(err)
}

comment := Comment{
    Parent: post, //  嵌入已有的对象
    Content: "当然是肯德基啦！",
}

if ref, err := client.Class("Comment").Create(&comment); err != nil {
    panic(err)
}
```

注意：**只有已经保存到云端的对象可以嵌入。**

请参阅 [关系查询](#关系查询) 来了解如何获取关联的对象。

#### 多对多关系

想要建立多对多关系，最简单的办法就是使用 **数组**。在大多数情况下，使用数组可以有效减少查询的次数，提升程序的运行效率。但如果有额外的属性需要附着于两个 class 之间的关联，那么使用 **中间表** 可能是更好的方式。注意这里说到的额外的属性是用来描述 class 之间的关系的，而不是任何单一的 class 的。

我们建议你在任何一个 class 的对象数量超出 100 的时候考虑使用中间表。

## 查询

我们已经了解到如何从云端获取单个 `leancloud.Object`，但你可能还会有一次性获取多个符合特定条件的 `leancloud.Object` 的需求，这时候就需要用到 `leancloud.Query` 了。

### 基础查询

执行一次基础查询通常包括这些步骤：

1. 构建 `leancloud.Query`；
2. 向其添加查询条件；
3. 执行查询并获取包含满足条件的对象的数组。

下面的代码获取所有 `lastName` 为 `Smith` 的 `Student`：

```go
type Student struct {
    leancloud.Object
    FirstName string `json:"firstName"`
    LastName  string `json:"lastName"`
}

results := make([]Student, 0)

if err := client.Class("Student").NewQuery().EqualTo("lastName", "Smith").Find(&results); err != nil {
    panic(err)
}
```

注意：查询条件中指定的字段为 **云端的字段名** 而不是 结构体的字段名。

### 查询条件

可以给 `leancloud.Object` 添加不同的条件来改变获取到的结果。

下面的代码查询所有 `firstName` 不为 `Jack` 的对象：

```go
query := client.Class("Student").NewQuery().NotEqualTo("firstName", "Jack")
```

对于能够排序的属性（比如数字、字符串），可以进行比较查询：

```go
// 限制 age < 18
query := client.Class("Student").NewQuery().LessThan("age", 18)

// 限制 age <= 18
query := client.Class("Student").NewQuery().LessThanOrEqualTo("age", 18)

// 限制 age > 18
query := client.Class("Student").NewQuery().GreaterThan("age", 18)

// 限制 age >= 18
query := client.Class("Student").NewQuery().GreaterThanOrEqualTo("age", 18)
```

可以在同一个查询中设置多个条件，这样可以获取满足所有条件的结果。可以理解为所有的条件是 `AND` 的关系：

```go
query := client.Class("Student").NewQuery().EqualTo("firstName", "Jack").GreaterThan("age", 18)
```

可以通过指定 `limit` 限制返回结果的数量（默认为 `100`）：

```go
// 最多获取 10 条结果
query := client.Class("Student").NewQuery().Limit(10)
```

由于性能原因，`limit` 最大只能设为 `1000`。即使将其设为大于 `1000` 的数，云端也只会返回 1,000 条结果。

如果只需要一条结果，可以直接用 `First`：

```go
todo := new(Todo)

if err := client.Class("Todo").NewQuery().EqualTo("priority", 2).First(todo); err != nil {
    panic(err)
} 
```

可以通过设置 `skip` 来跳过一定数量的结果：

```go
query := client.Class("Todo").NewQuery().Skip(20)
```

把 `skip` 和 `limit` 结合起来，就能实现翻页功能：

```go
query := client.Class("Todo").NewQuery().EqualTo("priority", 2).Limit(10).Skip(20)
```

需要注意的是，`skip` 的值越高，查询所需的时间就越长。作为替代方案，可以通过设置 `createdAt` 或 `updatedAt` 的范围来实现更高效的翻页，因为它们都自带索引。
同理，也可以通过设置自增字段的范围来实现翻页。

对于能够排序的属性，可以指定结果的排序规则：

```go
// 按 createdAt 升序排列
query := client.Class("Todo").NewQuery().Order("createdAt")

// 按 createdAt 降序排列
query := client.Class("Todo").NewQuery().Order("-createdAt")
```

还可以为同一个查询添加多个排序规则；

```go
query := client.Class("Todo").NewQuery().Order("priority").Order("-createdAt")
```

下面的代码可用于查找包含或不包含某一属性的对象：

```go
// 查找包含 "image" 的对象
query := client.Class("Todo").NewQuery().Exists("image")

// 查找不包含 "image" 的对象
query := client.Class("Todo").NewQuery().NotExists("image")
```

可以通过 `Select` 指定需要返回的属性。下面的代码只获取每个对象的 `title` 和 `content`（包括内置属性 `objectId`、`createdAt` 和 `updatedAt`）：

```go
todos := make([]Todo, 0)

if err := client.Class("Todo").NewQuery().Select("title", "content").Find(&todo); err != nil {
    panic(err)
}
```

`Select`
支持点号（`author.firstName`），详见[点号使用指南](https://leancloud.cn/docs/dot-notation.html)。
另外，字段名前添加减号前缀表示反向选择，例如 `-author` 表示不返回 `author` 字段。
反向选择同样适用于内置字段，比如 `-objectId`，也可以和点号组合使用，比如 `-pubUser.createdAt`。

### 字符串查询

可以用 `Query.StartsWith` 来查找某一属性值以特定字符串开头的对象。和 SQL 中的 `LIKE` 一样，你可以利用索引带来的优势：

```go
// 相当于 SQL 中的 title LIKE 'lunch%'
query := client.Class("Todo").NewQuery().StartsWith("title", "lunch")
```

可以用 `Query.Contains` 来查找某一属性值包含特定字符串的对象：

```go
// 相当于 SQL 中的 title LIKE '%lunch%'
query := client.Class("Todo").NewQuery().Contains("title", "lunch")
```

和 `Query.StartsWith` 不同，`Query.Contains` 无法利用索引，因此不建议用于大型数据集。

注意 `Query.StartsWith` 和 `` 都是 **区分大小写** 的，所以上述查询会忽略 `Lunch`、`LUNCH` 等字符串。

如果想查找某一属性值不包含特定字符串的对象，可以使用 `Query.Regexp` 进行基于正则表达式的查询：

```go
query := client.Class("Todo").NewQuery().Regexp("title", "^((?!ticket).)*$", "i")
```

不过我们并不推荐大量使用这类查询，尤其是对于包含超过 100,000 个对象的 class，
因为这类查询无法利用索引，实际操作中云端会遍历所有对象来获取结果。如果有进行全文搜索的需求，可以使用全文搜索服务。

使用查询时如果遇到性能问题，可参阅 [查询性能优化](#查询性能优化)。

### 数组查询

下面的代码查找所有数组属性 `tags` 包含 `工作` 的对象：

下面的代码查询数组属性长度为 3 （正好包含 3 个标签）的对象：

```go
query := client.Class("Todo").NewQuery().EqualTo("tags", "工作")
```

下面的代码查找所有数组属性 `tags` **同时包含** `工作`、`销售` 和 `会议` 的对象：

```go
query := client.Class("Todo").NewQuery().ContainsAll("tags", []string{"工作", "销售", "会议"})
```

### 关系查询

查询关联数据有很多种方式，常见的一种是查询某一属性值为特定 `leancloud.Object` 的对象，这时可以像其他查询一样直接用 ``。比如说，如果每一条博客评论 `Comment` 都有一个 `post` 属性用来存放原文 `Post`，则可以用下面的方法获取所有与某一 `Post` 相关联的评论：

如需获取某一属性值为另一查询结果中任一 `leancloud.Object` 的对象，可以用 ``。下面的代码构建的查询可以找到所有包含图片的博客文章的评论：

如需获取某一属性值不是另一查询结果中任一 `leancloud.Object` 的对象，则使用 ``。

有时候可能需要获取来自另一个 class 的数据而不想进行额外的查询，此时可以在同一个查询上使用 ``。下面的代码查找最新发布的 10 条评论，并包含各自对应的博客文章：

可以用 dot 符号（`.`）来获取多级关系，例如 `post.author`，详见《点号使用指南》的《在查询对象时使用点号》一节。

可以在同一查询上应用多次 `` 以包含多个属性。通过这种方法获取到的对象同样接受 `` 等 `leancloud.Query` 辅助方法。

通过 `` 进行多级查询的方式不适用于数组属性内部的 `leancloud.Object`，只能包含到数组本身。

#### 关系查询的注意事项

云端使用的并非关系型数据库，无法做到真正的联表查询，所以实际的处理方式是：先执行内嵌/子查询（和普通查询一样，`limit` 默认为 `100`，最大 `1000`），然后将子查询的结果填入主查询的对应位置，再执行主查询。如果子查询匹配到的记录数量超出 `limit`，且主查询有其他查询条件，那么可能会出现没有结果或结果不全的情况，因为只有 `limit` 数量以内的结果会被填入主查询。

我们建议采用以下方案进行改进：

- 确保子查询的结果在 100 条以下，如果在 100 至 1,000 条之间的话请将子查询的 `limit` 设为 `1000`。
- 将需要查询的字段冗余到主查询所在的表上。
- 进行多次查询，每次在子查询上设置不同的 `skip` 值来遍历所有记录（注意 `skip` 的值较大时可能会引发性能问题，因此不是很推荐）。

### 统计总数量

如果只需知道有多少对象匹配查询条件而无需获取对象本身，可使用 `Query.Count()` 来代替 `Query.Find()`。比如说，查询有多少个已完成的 todo：

```go
count, err := client.Class("Todo").NewQuery().EqualTo("isComplete", true).Count()
if err != nil {
  panic(err)
}
fmt.Printf("%d 个 todo 已完成。", count)
```

### 组合查询

组合查询就是把诸多查询条件用一定逻辑合并到一起（`OR` 或 `AND`）再交给云端去查询。

组合查询不支持在子查询中包含 `GeoPoint` 或其他非过滤性的限制（例如 `near`、`withinGeoBox`、`limit`、`skip`、`ascending`、`descending`、`include`）。

#### OR 查询

OR 操作表示多个查询条件符合其中任意一个即可。 例如，查询优先级大于等于 `3` 或者已经完成了的 todo：

```go
priorityQuery := client.Class("Todo").NewQuery().GreaterThanOrEqualTo("priority", 3)
isCompleteQuery := client.Class("Todo").NewQuery().EqualTo("isComplete", true)
query = client.Class("Todo").NewQuery().Or(priorityQuery, isCompleteQuery)
```

使用 OR 查询时，子查询中不能包含 `GeoPoint` 相关的查询。

#### AND 查询

使用 AND 查询的效果等同于往 `leancloud.Query` 添加多个条件。下面的代码构建的查询会查找创建时间在 `2016-11-13` 和 `2016-12-02` 之间的 todo：

```go
startDateQuery := client.Class("Todo").NewQuery().GreaterThanOrEqualTo("createdAt", time.Parse("2000-01-01 00:00:00Z", "2016-11-13 00:00:00Z"))
endDateQuery := client.Class("Todo").NewQuery().LessThan("createdAt", time.Parse("2000-01-01 00:00:00Z", "2016-12-03 00:00:00Z"))
query := client.Class("Todo").NewQuery().And(startDateQuery, endDateQuery)
```

单独使用 AND 查询跟使用基础查询相比并没有什么不同，不过当查询条件中包含不止一个 OR 查询时，就必须使用 AND 查询：

```go
createdAtQuery := client.Class("Todo").NewQuery().GreaterThanOrEqualTo("createdAt", time.Parse("2000-01-01", "2018-04-30")).LessThan("createdAt", time.Parse("2000-01-01", "2018-05-01"))

locationQuery := client.Class("Todo").NewQuery().Near("location", leancloud.GeoPoint{30, 150})

priority2Query := client.Class("Todo").NewQuery().EqualTo("priority", 2)

priority3Query := client.Class("Todo").NewQuery().EqualTo("priority", 3)

priorityQuery := client.Class("Todo").NewQuery().Or(priority2Query, priority3Query)

timeLocationQuery := client.Class("Todo").NewQuery().Or(createdAtQuery, locationQuery)

query := client.Class("Todo").NewQuery().And(priorityQuery, timeLocationQuery)
```

### 查询性能优化

影响查询性能的因素很多。特别是当查询结果的数量超过 10 万，查询性能可能会显著下降或出现瓶颈。以下列举一些容易降低性能的查询方式，开发者可以据此进行有针对性的调整和优化，或尽量避免使用。

- 不等于和不包含查询（无法使用索引）
- 通配符在前面的字符串查询（无法使用索引）
- 有条件的 `count`（需要扫描所有数据）
- `skip` 跳过较多的行数（相当于需要先查出被跳过的那些行）
- 无索引的排序（另外除非复合索引同时覆盖了查询和排序，否则只有其中一个能使用索引）
- 无索引的查询（另外除非复合索引同时覆盖了所有条件，否则未覆盖到的条件无法使用索引，如果未覆盖的条件区分度较低将会扫描较多的数据）

## 文件

有时候应用需要存储尺寸较大或结构较为复杂的数据，这类数据不适合用 `leancloud.Object` 保存，此时文件对象 `leancloud.File` 便成为了更好的选择。文件对象最常见的用途是保存图片，不过也可以用来保存文档、视频、音乐等其他二进制数据。

### 上传文件

可以通过传入一个实现了 `io.ReadSeeker` 的类型提供文件内容，并填充 `File` 类型的变量提供文件信息：

```go
// 打开文件
filename := "/tmp/file.txt"
fd, err := os.Open(filename)
if err != nil {
  panic(err)
}
defer fd.Close()

_, name := filepath.Split(filename) // 分割路径以获取文件名
file := &File{ // 构造 File 对象
  Name: name,
  MIME: mime.TypeByExtension(filepath.Ext(name)) // 通过扩展名获取 MIME 类型
}

if err := client.Files.Upload(file, fd); err != nil {
  panic(err)
}
```

除此之外，还可以通过 URL 构建文件：

```go
file := &File{
 Name: "go-sdk-file-upload.txt",
 MIME: "text/plain",
 URL:  "https://example.com/assets/go-sdk-file-upload.txt",
}

if err := client.Files.UploadFromURL(file); err != nil {
  panic(err)
}
```

通过 URL 构建文件时，SDK 并不会将原本的文件转储到云端，而是会将文件的物理地址存储为字符串，这样也就不会产生任何文件上传流量。使用其他方式构建的文件会被保存在云端。

与前面提到的方式相比，一个更常见的文件构建方式是从本地路径上传。

```go
file, err := client.Files.UploadFromFile("resume.txt")
if err != nil {
 t.Fatal(err)
}
```

这里上传的文件名字叫做 `avatar.jpg`。需要注意：

- 每个文件会被分配到一个独一无二的 `objectId`，所以在一个应用内是允许多个文件重名的。
- 文件必须有扩展名才能被云端正确地识别出类型。比如说要用 `leancloud.File` 保存一个 PNG 格式的图像，那么扩展名应为 `.png`。
- 如果文件没有扩展名，且没有手动指定类型，那么云服务将默认使用 `application/octet-stream`。

### 保存文件

将文件保存到云端后，便可获得一个永久指向该文件的 URL：

```go
file, err := client.Files.UploadFromFile("resume.txt")
if err != nil {
    t.Fatal(err)
}

fmt.Println("The URL of file is ", file.URL)
```

文件上传后，可以在 `_File` class 中找到。已上传的文件无法再被修改。如果需要修改文件，只能重新上传修改过的文件并取得新的 `objectId` 和 URL。

已经保存到云端的文件可以关联到 `leancloud.Object`：

```go
type Todo struct {
  Title         string `json:"title"`
  Attachment    File   `json:"attachments"`
}

todo := &Todo{
  Title: "买蛋糕",
  Attachment: file,
}

if ref, err := client.Class("Todo").Create(todo); err != nil {
  panic(err)
}
```

也可以通过构建 `leancloud.Query` 进行[查询](#查询)：

```go
query := client.Class("_File").NewQuery()
```

需要注意的是，内部文件（上传到文件服务的文件）的 `url` 字段是由云端动态生成的，其中涉及切换自定义域名的相关处理逻辑。
因此，通过 url 字段查询文件仅适用于外部文件（直接保存外部 URL 到 `_File` 表创建的文件），内部文件请改用 key 字段（URL 中的路径）查询。

### 文件元数据

上传文件时，可以用 `metaData` 添加额外的属性。文件一旦保存，`metaData` 便不可再修改。

```go
// 打开文件
filename := "/tmp/file.txt"
fd, err := os.Open(filename)
if err != nil {
  panic(err)
}
defer fd.Close()

_, name := filepath.Split(filename) // 分割路径以获取文件名
file := &File{ // 构造 File 对象
  Name: name,
  MIME: mime.TypeByExtension(filepath.Ext(name)) // 通过扩展名获取 MIME 类型
  Metadata: map[string]interface{ // 设置 Metadata
    "size": 1024,
    "width": 128,
    "height": 256,
  }
}

if err := client.Files.Upload(file, fd); err != nil {
  panic(err)
}

```

### 删除文件

下面的代码从云端删除一个文件：

```go
if err := client.File("552e0a27e4b0643b709e891e").Destroy(); err != nil {
  panic(err)
}
```

默认情况下，文件的删除权限是关闭的，需要进入 **<Path to="storage" /> > 结构化数据 > `_File`**，选择 **权限** > **`delete`** 来开启。

## GeoPoint

云服务允许你通过将 `leancloud.GeoPoint` 关联到 `leancloud.Object` 的方式存储折射真实世界地理位置的经纬坐标，这样做可以让你查询包含一个点附近的坐标的对象。常见的使用场景有「查找附近的用户」和「查找附近的地点」。

要构建一个包含地理位置的对象，首先要构建一个地理位置。下面的代码构建了一个 `leancloud.GeoPoint` 并将其纬度（`latitude`）设为 `39.9`，经度（`longitude`）设为 `116.4`：

```go
point := leancloud.GeoPoint{
  Latitude: 39.9,
  Longitude: 116.4,
}
```

现在可以将这个地理位置存储为一个对象的属性：

```go
if err := client.Class("Todo").Set("location", point); err != nil {
  panic(err)
}
```

### 地理位置查询

给定一些含有地理位置的对象，可以从中找出离某一点最近的几个，或者处于某一范围内的几个。要执行这样的查询，可以向普通的 `leancloud.Query` 添加 `Near` 条件。下面的代码查找 `location` 属性值离某一点最近的 `Todo` 对象：

```go
point := &leancloud.GeoPoint{
  Latitude: 39.9,
  Longitude: 116.4,
}

todos := make([]Todo, 0)

if err := client.Class("Todo").NewQuery().Near("location", point).Limit(10).Find(&todos); err != nil {
  panic(err)
}
```

像 `Order` 这样额外的排序条件会获得比默认的距离排序更高的优先级。

若要限制结果和给定地点之间的距离，可以参考 API 文档中的 `WithinKilometers`、`WithinMiles` 和 `WithinRadians` 参数。

若要查询在某一矩形范围内的对象，可以用 `WithinGeoBox`：

![withinGeoBox](/img/geopoint-withingeobox.svg)

```go
southwest := leancloud.GeoPoint{30, 115}
northeast := leancloud.GeoPoint{40, 118}
query := client.Class("Todo").WithinBox("location", southwest, northeast)
```

### GeoPoint 的注意事项

GeoPoint 的经纬度的类型是数字，且经度需在 -180.0 到 180.0 之间，纬度需在 -90.0 到 90.0 之间。
另外，每个对象最多只能有一个类型为 GeoPoint 的属性。

## 用户

请参阅[内建账户指南](/sdk/authentication/guide/)。

## 角色

随着用户量的增长，你可能会发现相比于为每一名用户单独设置权限，将预先设定好的权限直接分配给一部分用户是更好的选择。为了迎合这种需求，云服务支持基于角色的权限管理。请参阅 [ACL 权限管理开发指南](/sdk/storage/guide/acl/)

## 全文搜索

全文搜索是一个针对应用数据进行全局搜索的接口，它基于搜索引擎构建，提供更强大的搜索功能。要深入了解其用法和阅读示例代码，请阅读 [全文搜索指南](/sdk/storage/guide/fulltext-search/)。
