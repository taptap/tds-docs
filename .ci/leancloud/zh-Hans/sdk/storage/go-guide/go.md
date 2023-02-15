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

用户系统几乎是每款应用都要加入的功能，我们为此专门提供了一个 `leancloud.User` 类来方便应用使用各项用户管理的功能。

`leancloud.User` 是 `leancloud.Object` 的子类，这意味着任何 `leancloud.Object` 提供的方法也适用于 `leancloud.User`，唯一的区别就是 `leancloud.User` 提供一些额外的用户管理相关的功能。每个应用都有一个专门的 `_User` class 用于存放所有的 `leancloud.User`。

### 用户的属性

`leancloud.User` 相比一个普通的 `leancloud.Object` 多出了以下属性：

- `username`：用户的用户名。
- `password`：用户的密码。
- `email`：用户的电子邮箱。
- `emailVerified`：用户的电子邮箱是否已验证。
- `mobilePhoneNumber`：用户的手机号。
- `mobilePhoneVerified`用户的手机号是否已验证。

在接下来对用户功能的介绍中我们会逐一了解到这些属性。

### 注册

用户第一次打开应用的时候，可以让用户注册一个账户。下面的代码展示了一个典型的使用用户名和密码注册的流程：

```go
// 注册用户
user, err := client.Users.SignUp("Tom", "cat!@#123")
if err != nil {
  panic(err)
}

// 设置其它属性
if err := client.Users.ID(user.ID).Set("email", "tom@leancloud.rocks", leancloud.UseUser(user)); err != nil {
  panic(err)
}
```

如果收到 `202` 错误码，意味着 `_User` 表里已经存在使用同一 `username` 的账号，此时应提示用户换一个用户名。除此之外，每个用户的 `email` 和 `mobilePhoneNumber` 也需要保持唯一性，否则会收到 `203` 或 `214` 错误。
可以考虑在注册时把用户的 `username` 设为与 `email` 相同，这样用户可以直接 [用邮箱重置密码](#重置密码)。

采用「用户名 + 密码」注册时需要注意：密码是以明文方式通过 HTTPS 加密传输给云端，云端会以密文存储密码（云端对密码的长度、复杂度不作限制），并且我们的加密算法是无法通过所谓「彩虹表撞库」获取的，这一点请开发者放心。换言之，用户的密码只可能用户本人知道，开发者不论是通过控制台还是 API 都是无法获取。另外我们需要强调 **在客户端，应用切勿再次对密码加密，这会导致 [重置密码](#重置密码) 等功能失效**。

#### 手机号注册

对于移动应用来说，允许用户以手机号注册是个很常见的需求。实现该功能大致分两步，第一步是让用户提供手机号，点击「获取验证码」按钮后，该号码会收到一个六位数的验证码：

```go
if err := client.Users.RequestMobilePhoneVerify("+8618200008888"); err != nil {
  panic(err)
}
```

用户填入验证码后，用下面的方法完成注册：

```go
user, err := client.Users.SignUpByMobilePhone("+8618200008888", "123456")
if err != nil {
  panic(err)
}
```

`username` 将与 `mobilePhoneNumber` 相同，`password` 会由云端随机生成。
如果希望让用户指定密码，可以在客户端让用户填写手机号和密码，然后按照上一小节使用用户名和密码注册的流程，将用户填写的手机号作为 `username` 和 `mobilePhoneNumber` 的值同时提交。
同时根据业务需求，在**云服务控制台 > 内建账户 > 设置**勾选**未验证手机号码的用户，禁止登录**、**已验证手机号码的用户，允许以短信验证码登录**。

#### 手机号格式

`leancloud.User` 接受的手机号以 `+` 和国家代码开头，后面紧跟着剩余的部分。手机号中不应含有任何划线、空格等非数字字符。例如，`+19490008888` 是一个合法的美国或加拿大手机号（`1` 是国家代码），`+8618200008888` 是一个合法的中国手机号（`86` 是国家代码）。

请参阅官网的价格页面以了解支持的国家和地区。

### 登录

下面的代码用用户名和密码登录一个账户：

```go
user, err := client.Users.LogIn("Tom", "cat!@#123")
if err != nil {
  panic(err)
}
```

#### 邮箱登录

下面的代码用邮箱和密码登录一个账户：

```go
user, err := client.LoginByEmail("tom@leancloud.rocks", "cat!@#123")
if err != nil {
  panic(err)
}

fmt.Println(user)
```

#### 手机号登录

如果应用允许用户以手机号注册，那么也可以让用户以手机号配合密码或短信验证码登录。下面的代码用手机号和密码登录一个账户：

默认情况下，云服务允许所有关联了手机号的用户直接以手机号登录，无论手机号是否 [通过验证](#验证手机号)。为了让应用更加安全，你可以选择只允许验证过手机号的用户通过手机号登录。可以在 **控制台 > 内建账户 > 设置** 里面开启该功能。

除此之外，还可以让用户通过短信验证码登录，适用于用户忘记密码且不愿重置密码的情况。和 [通过手机号注册](#手机号注册) 的步骤类似，首先让用户填写与账户关联的手机号码，然后在用户点击「获取验证码」后调用下面的方法：

```go
if err := client.Users.RequestLoginSMSCode("+8618200008888"); err != nil {
    panic(err)
}
```

用户填写收到的验证码后，用下面的方法完成登录：

```go
user, err := client.Users.LogInByMobilePhoneNumber("+8618200008888", "123456")
if err != nil {
    panic(err)
}
```

#### 测试手机号和固定验证码

在开发过程中，可能会因测试目的而需要频繁地用手机号注册登录，然而运营商的发送频率限制往往会导致测试过程耗费较多的时间。

为了解决这个问题，可以在 **控制台 > 短信 > 设置** 里面设置一个测试手机号，而云端会为该号码生成一个固定验证码。以后进行登录操作时，只要使用的是这个号码，云端就会直接放行，无需经过运营商网络。

测试手机号还可用于将 iOS 应用提交到 App Store 进行审核的场景，因为审核人员可能因没有有效的手机号码而无法登录应用来进行评估审核。如果不提供一个测试手机号，应用有可能被拒绝。

可参阅 [短信 SMS 服务使用指南](sms-guide.html) 来了解更多有关短信发送和接收的限制。

#### 单设备登录

某些场景下需要确保用户的账户在同一时间只在一台设备上登录，也就是说当用户在一台设备上登录后，其他设备上的会话全部失效。可以按照以下方案来实现：

1. 新建一个专门用于记录用户登录信息和当前设备信息的 class。
2. 每当用户在新设备上登录时，将该 class 中该用户对应的设备更新为该设备。
3. 在另一台设备上打开客户端时，检查该设备是否与云端保存的一致。若不一致，则将用户 [登出](#当前用户)。

#### 账户锁定

输入错误的密码或验证码会导致用户登录失败。如果在 15 分钟内，同一个用户登录失败的次数大于 6 次，该用户账户即被云端暂时锁定，此时云端会返回错误码 `{ "code": 1, "error": "You have exceeded the maximum number of login attempts, please try again later, or consider resetting your password." }`，开发者可在客户端进行必要提示。

锁定将在最后一次错误登录的 15 分钟之后由云端自动解除，开发者无法通过 SDK 或 REST API 进行干预。在锁定期间，即使用户输入了正确的验证信息也不允许登录。这个限制在 SDK 和云引擎中都有效。

### 验证邮箱

可以通过要求用户在登录或使用特定功能之前验证邮箱的方式防止恶意注册。默认情况下，当用户注册或变更邮箱后，`emailVerified` 会被设为 `false`。在应用的 **云服务控制台 > 内建账户 > 设置** 中，可以开启 **启用邮箱验证功能** 选项，这样当用户注册或变更邮箱时，会收到一封含有验证链接的邮件。在同一设置页面还可找到阻止未验证邮箱的用户登录的选项。

如果用户忘记点击链接并且在未来某一时刻需要进行验证，可以用下面的代码发送一封新的邮件：

```go
if err := client.Users.RequestEmailVerify("tom@leancloud.rocks"); err != nil {
    panic(err)
}
```

用户点击邮件内的链接后，`emailVerified` 会变为 `true`。如果用户的 `email` 属性为空，则该属性永远不会为 `true`。

### 验证手机号

和 [验证邮箱](#验证邮箱) 类似，应用还可以要求用户在登录或使用特定功能之前验证手机号。默认情况下，当用户注册或变更手机号后，`mobilePhoneVerified` 会被设为 `false`。
在应用的「控制台 > 内建账户 > 设置」中，可以开启阻止未验证手机号的用户登录的选项。

可以用下面的代码发送一条新的验证码：（如果相应用户的 `mobilePhoneVerified` 已经为 `true`，那么验证短信不会发送）

```go
if err := client.Users.RequestMobilePhoneVerify("+8618200008888"); err != nil {
    panic(err)
}
```

用户填写验证码后，调用下面的方法来完成验证。`mobilePhoneVerified` 将变为 `true`：

#### 绑定、修改手机号之前先验证

除了在用户绑定、修改手机号**之后**进行验证，云服务也支持在用户绑定或修改手机号**之前**先通过短信验证。
也就是说，绑定手机号或修改手机号时先请求发送验证码（用户需处于登录状态），再凭短信验证码完成绑定或修改操作。

```go
if err := client.Users.requestChangePhoneNumber("+8618200008888"); err != nil {
  panic(err)
}

if err := client.Users.ChangePhoneNumber("123456", "+8618200008888"); err != nil {
  panic(err)
}
```

### 当前用户

用户登录后，SDK 会自动将会话信息存储到客户端，这样用户在下次打开客户端时无需再次登录。下面的代码检查是否有已经登录的用户：

```go
// TODO
```

会话信息会长期有效，直到用户主动登出：

### 设置当前用户

用户登录后，云端会返回一个 **session token** 给客户端，它会由 SDK 缓存起来并用于日后同一 `leancloud.User` 的鉴权请求。session token 会被包含在每个客户端发起的 HTTP 请求的 header 里面，这样云端就知道是哪个 `leancloud.User` 发起的请求了。

以下是一些应用可能需要用到 session token 的场景：

- 应用根据以前缓存的 session token 登录（可以用 `` 获取到当前用户的 session token，在服务端等受信任的环境下，可以通过 Master Key 读取任意用户的 `sessionToken` 字段以获取 session token）。
- 应用内的某个 WebView 需要知道当前登录的用户。
- 在服务端登录后，返回 session token 给客户端，客户端根据返回的 session token 登录。

下面的代码使用 session token 登录一个用户（云端会验证 session token 是否有效）：

```go
user, err := client.Users.Become("anmlwi96s381m6ca7o7266pzf")
if err != nil {
    panic(err)
}
```

请避免在外部浏览器使用 URL 来传递 session token，以防范信息泄露风险。

如果在 **控制台 > 内建账户 > 设置** 中勾选了 **密码修改后，强制客户端重新登录**，那么当一个用户修改密码后，该用户的 session token 会被重置。此时需要让用户重新登录，否则会遇到 [`403 (Forbidden)`](error_code.html#_403) 错误。

下面的代码检查 session token 是否有效：

```go
// 暂不支持
```

### 重置密码

我们都知道，应用一旦加入账户密码系统，那么肯定会有用户忘记密码的情况发生。对于这种情况，我们为用户提供了多种重置密码的方法。

邮箱重置密码的流程如下：

1. 用户输入注册的电子邮箱，请求重置密码；
2. 云端向该邮箱发送一封包含重置密码的特殊链接的电子邮件；
3. 用户点击重置密码链接后，一个特殊的页面会打开，让他们输入新密码；
4. 用户的密码已被重置为新输入的密码。

首先让用户填写注册账户时使用的邮箱，然后调用下面的方法：

```go
if err := client.Users.RequestPasswordReset("tom@leancloud.rocks"); err != nil {
    panic(err)
}
```

上面的代码会查询 `_User` 表中是否有对象的 `email` 属性与前面提供的邮箱匹配。如果有的话，则向该邮箱发送一封密码重置邮件。之前提到过，应用可以让 `username` 与 `email` 保持一致，也可以单独收集用户的邮箱并将其存为 `email`。

密码重置邮件的内容可在应用的 **云服务控制台 > 内建账户 > 邮件模版** 中自定义。更多关于自定义邮件模板和验证链接的内容，请参考《自定义邮件验证和重设密码页面》。

除此之外，还可以用手机号重置密码：

1. 用户输入注册的手机号，请求重置密码；
2.云端向该号码发送一条包含验证码的短信；
3. 用户输入验证码和新密码。

下面的代码向用户发送含有验证码的短信：

```go
if err := client.Users.RequestPasswordResetBySmsCode("+8618200008888"); err != nil {
    panic(err)
}
```

上面的代码会查询 `_User` 表中是否有对象的 `mobilePhoneNumber` 属性与前面提供的手机号匹配。如果有的话，则向该号码发送验证码短信。

可以在 **云服务控制台 > 内建账户 > 设置** 中设置只有在 `mobilePhoneVerified` 为 `true` 的情况下才能用手机号重置密码。

用户输入验证码和新密码后，用下面的代码完成密码重置：

```go
if err := client.Users.ResetPasswordBySmsCode("+8618200008888", "123456", "cat!@#123"); err != nil {
    panic(err)
}
```

### 用户的查询

可以直接构建一个针对 `_User` 的 `leancloud.Query` 来查询用户：

```go
userQuery := client.Users.NewUserQuery()
```

为了安全起见，**新创建的应用的 `_User` 表默认关闭了 `find` 权限**，这样每位用户登录后只能查询到自己在 `_User` 表中的数据，无法查询其他用户的数据。如果需要让其查询其他用户的数据，建议单独创建一张表来保存这类数据，并开放这张表的 `find` 查询权限。除此之外，还可以在云引擎里封装用户查询相关的方法。

可以参见 [用户对象的安全](#用户对象的安全) 来了解 `_User` 表的一些限制，还可以阅读《数据和安全》来了解更多 class 级权限设置的方法。

### 关联用户对象

关联 `leancloud.User` 的方法和 `leancloud.Object` 是一样的。下面的代码为一名作者保存了一本书，然后获取所有该作者写的书：

```go
// TODO
```

### 用户对象的安全

`leancloud.User` 类自带安全保障，只有通过 `LogIn` 或者 `SignUp` 这种经过鉴权的方法获取到的 `leancloud.User` 才能进行保存或删除相关的操作，保证每个用户只能修改自己的数据。

这样设计是因为 `leancloud.User` 中存储的大多数数据都比较敏感，包括手机号、社交网络账号等等。为了用户的隐私安全，即使是应用的开发者也应避免直接接触这些数据。

下面的代码展现了这种安全措施：

```go
user, err := client.Users.LogIn("Tom", "cat!@#123")
if err != nil {
    panic(err)
}

// 试图修改用户名，未鉴权将失败
if err := client.User(user).Set("username", "Jerry"); err != nil {
    panic(err)
}

// 密码已被加密，这样做会获取到空字符串
password := user.String("password")

// 可以执行，因为用户已鉴权
if err := client.User(user).Set("username", "Jerry", leancloud.UseUser(user)); err != nil {
    panic(err)
}

// 绕过鉴权直接获取用户
unauthenticatedUser := User{}
if err := client.Users.NewUserQuery().EqualTo("objectId", user.ID).First(&unauthenticatedUser); err != nil {
    panic(err)
}

// 会出错，因为用户未鉴权
if err := client.User(unauthenticatedUser).Set("username", "Toodle"); err != nil {
    panic(err)
}
```

通过 `` 获取的 `leancloud.User` 总是经过鉴权的。

要查看一个 `leancloud.User` 是否经过鉴权，可以调用 `` 方法。通过经过鉴权的方法获取到的 `leancloud.User` 无需进行该检查。

注意，用户的密码只能在注册的时候进行设置，日后如需修改，只能通过 [重置密码](#重置密码) 的方式进行。密码不会被缓存在本地。如果尝试直接获取已登录用户的密码，会得到 `null`。

### 其他对象的安全

对于给定的一个对象，可以指定哪些用户有权限读取或修改它。为实现该功能，每个对象都有一个由 `` 对象组成的访问控制表。请参阅《ACL 权限管理开发指南》。

### 第三方账户登录

云服务支持应用层直接使用第三方社交平台（例如微信、微博、QQ 等）的账户信息来创建自己的账户体系并完成登录，也允许将既有账户与第三方账户绑定起来，这样终端用户后续可以直接用第三方账户信息来便捷登录。

例如以下的代码展示了终端用户使用微信登录的处理流程：

```go
// TODO
```

`leancloud.User#loginWithAuthData` 系列方法需要两个参数来唯一确定一个账户：

- 第三方平台的名字，就是前例中的 `weixin`，该名字由应用层自己决定。
- 第三方平台的授权信息，就是前例中的 `thirdPartyData`（一般包括 `uid`、`token`、`expires` 等信息，与具体的第三方平台有关）。

云端会使用第三方平台的鉴权信息来查询是否已经存在与之关联的账户。如果存在的话，则返回 `200 OK` 状态码，同时附上用户的信息（包括 [`sessionToken`](#设置当前用户)）。如果第三方平台的信息没有和任何账户关联，客户端会收到 `201 Created` 状态码，意味着新账户被创建，同时附上用户的 `objectId`、`createdAt`、`sessionToken` 和一个自动生成的 `username`，例如：

```json
{
  "username":     "k9mjnl7zq9mjbc7expspsxlls",
  "objectId":     "5b029266fb4ffe005d6c7c2e",
  "createdAt":    "2018-05-21T09:33:26.406Z",
  "updatedAt":    "2018-05-21T09:33:26.575Z",
  "sessionToken": "…",
  // authData 通常不会返回，继续阅读以了解其中原因
  "authData": {
    "weixin": {
      "openid":        "OPENID",
      "access_token":  "ACCESS_TOKEN",
      "expires_in":    7200,
      "refresh_token": "REFRESH_TOKEN",
      "scope":         "SCOPE"
    }
  }
  // …
}
```

这时候我们会看到 `_User` 表中出现了一条新的账户记录，账户中有一个名为 `authData` 的列，保存了第三方平台的授权信息。出于安全考虑，`authData` 不会被返回给客户端，除非它属于当前用户。

开发者需要自己完成第三方平台的鉴权流程（一般通过 OAuth 1.0 或 2.0），以获取鉴权信息，继而到云端来登录。

#### 鉴权数据的保存

`_User` class 中的 `authData` 是一个以平台名为键名，鉴权信息为键值的 JSON 对象。

一个关联了微信账户的用户应该会有下列对象作为 `authData`：

```json
{
  "weixin": {
    "openid":        "…",
    "access_token":  "…",
    "expires_in":    7200,
    "refresh_token": "…",
    "scope":         "…"
  }
}
```

而一个关联了微博账户的用户，则会有如下的 `authData`：

```json
{
    "weibo": {
      "refresh_token": "2.0xxx",
      "uid": "271XFEFEW273",
      "expires_in": 115057,
      "access_token": "2.00xxx",
    }
}
```

我们允许一个账户绑定多个第三方平台的鉴权数据，这样如果某个用户同时关联了微信和微博账户，则其 `authData` 可能会是这样的：

```json
{
  "weixin": {
    "openid":        "…",
    "access_token":  "…",
    "expires_in":    7200,
    "refresh_token": "…",
    "scope":         "…"
  },
  "weibo": {
    "refresh_token": "2.0xxx",
    "uid": "271XFEFEW273",
    "expires_in": 115057,
    "access_token": "2.00xxx",
  }
}
```

理解 `authData` 的数据结构至关重要。一个终端用户通过如下的鉴权信息来登录的时候，

```json
"weixin": {
  "openid":        "OPENID",
  "access_token":  "ACCESS_TOKEN",
  "expires_in":    7200,
  "refresh_token": "REFRESH_TOKEN",
  "scope":         "SCOPE"
}
```

云端首先会查找账户系统（_User 表），看看是否存在 authData.weixin.openid = “OPENID” 的账户，如果存在，则返回现有账户，如果不存在那么就创建一个新账户，同时将上面的鉴权信息写入新账户的 `authData` 属性中，并将新账户的数据当成结果返回。

云端会自动为 `_User` class 中每个用户的 `authData.<PLATFORM>.<uid>` 创建唯一索引，从而避免重复数据。
`<uid>` 在微信等部分云服务内建支持的第三方平台上为 `openid` 字段，在其他第三方平台（包括部分云服务专门支持的第三方平台和所有云服务没有专门支持的第三方平台）上为 `uid` 字段。

#### 自动验证第三方平台授权信息

为了确保账户数据的有效性，云端还支持对部分平台的 access token 的有效性进行自动验证，以防止伪造账户数据。如果有效性验证不通过，云端会返回 `invalid authData` 错误，关联不会被建立。对于云端无法识别的服务，开发者需要自己去验证 access token 的有效性。
比如，注册、登录时分别通过云引擎的 `beforeSave hook`、`beforeUpdate hook` 来验证 access token 有效性。

如果希望使用这一功能，则在开始使用前，需要在 **控制台 > 内建账户 > 设置** 配置相应平台的 **应用 ID** 和 **应用 Secret Key**。

如果不希望云端自动验证 access token，可以在 **控制台 > 内建账户 > 设置** 里面取消勾选 **第三方登录时，验证用户 AccessToken 合法性**。

配置平台账号的目的在于创建 `leancloud.User` 时，云端会使用相关信息去校验请求参数 `thirdPartyData` 的合法性，确保 `leancloud.User` 实际对应着一个合法真实的用户，确保平台安全性。

#### 绑定第三方账户

用户已经有了 LCUser 并登录成功后，可以绑定新的第三方账号信息。
绑定成功后，新的第三方账户信息会被添加到 LCUser 的 authData 字段里。

例如，下面的代码可以关联微信账户：

为节省篇幅，上面的代码示例中没有给出具体的微信平台授权信息，相关内容请参考上面的[「第三方账户登录」](#第三方账户登录)一节。

#### 解除与第三方账户的关联

类似地，可以解绑第三方账户。

例如，下面的代码可以解除用户和微信账户的关联：

#### 扩展：第三方登录时补充完整的用户信息

有些产品，新用户在使用第三方账号授权拿到相关信息后，仍然需要补充设置用户名、手机号、密码等重要信息后，才被允许登录成功。

这时要使用 `loginWithauthData` 登录接口的 `failOnNotExist` 参数并将其设置为 `true`。服务端会判断是否已存在能匹配上的 `authData`，如果不存在则会返回 `211` 错误码和 `Could not find user` 报错信息。开发者根据这个 `211` 错误码，跳转到要求输入用户名、密码、手机号等信息的页面，实例化一个 `leancloud.User` 对象，保存上述补充数据，再次调用 `loginWithauthData` 接口进行登录，并 **不再传入 `failOnNotExist` 参数**。示例代码如下：

#### 扩展：接入 UnionID 体系，打通不同子产品的账号系统

随着第三方平台的账户体系变得日渐复杂，它们的第三方鉴权信息出现了一些较大的变化。下面我们以最典型的微信开放平台为例来进行说明。

当一个用户在移动应用内登录微信账号时，会被分配一个 OpenID；在微信小程序内登录账号时，又会被分配另一个不同的 OpenID。这样的架构会导致的问题是，使用同一个微信号的用户，也无法在微信开发平台下的移动应用和小程序之间互通。

微信官方为了解决这个问题，引入了 `UnionID` 的体系，以下为其官方说明：

> 通过获取用户基本信息接口，开发者可通过 OpenID 来获取用户基本信息，而如果开发者拥有多个公众号，可使用以下办法通过 UnionID 机制来在多公众号之间进行用户帐号互通。只要是同一个微信开放平台帐号下的公众号，用户的 UnionID 是唯一的。换句话说，同一用户，对同一个微信开放平台帐号下的不同应用，UnionID 是相同的。

其他平台，如 QQ 和微博，与微信的设计也基本一致。

云服务支持 `UnionID` 体系。你只需要给 `loginWithauthData` 和 `associateWithauthData` 接口传入更多的第三方鉴权信息，即可完成新 UnionID 体系的集成。新增加的第三方鉴权登录选项包括：

- unionId，指第三方平台返回的 UnionId 字符串。
- unionId platform，指 unionId 对应的 platform 字符串，由应用层自己指定，[后面](#该如何指定-unionIdPlatform)会详述。
- asMainAccount，指示是否把当前平台的鉴权信息作为主账号来使用。如果作为主账号，那么就由当前用户唯一占有该 unionId，以后其他平台使用同样的 unionId 登录的话，会绑定到当前的用户记录上来；否则，当前应用的鉴权信息会被绑定到其他账号上去。

下面让我们通过一个例子来说明如何使用这些参数完成 UnionID 登录。

假设云服务在微信开放平台上有两个应用，一个是「云服务通讯」，一个是「云服务技术支持」，这两个应用在接入第三方鉴权的时候，分别使用了 `wxleanoffice` 和 `wxleansupport` 作为 platform 来进行登录。现在我们开启 UnionID 的用户体系，希望同一个微信用户在这两个应用中都能对应到同一个账户系统（_User 表中的同一条记录），同时我们决定将 `wxleanoffice` 平台作为主账号平台。

假设对于用户 A，微信给 ta 为 云服务分配的 UnionId 为 `unionid4a`，而对两个应用的授权信息分别为：

```json
"wxleanoffice": {
  "access_token": "officetoken",
  "openid": "officeopenid",
  "expires_in": 1384686496
},
"wxleansupport": {
  "openid": "supportopenid",
  "access_token": "supporttoken",
  "expires_in": 1384686496
}
```

现在，用户 A 在「云服务通讯」中通过微信登录，其调用请求为：

> 注意代码中将微信传回来的 openid 属性改为了 uid，这是因为云端要求对于自定义的 platform，只能使用 uid 这样的属性名，才能保证自动建立 `authData.<PLATFORM>.uid` 的唯一索引，具体可以参考《数据存储 REST API 使用详解》的《连接用户账户和第三方平台》。

如果用户 A 是第一次在「云服务通讯」中通过微信登录，那么 _User 表中会增加一个新用户（假设其 objectId 为 `ThisIsUserA`），其 `authData` 的结果如下：

```json
{
  "wxleanoffice": {
    "platform": "weixin",
    "uid": "officeopenid",
    "expires_in": 1384686496,
    "main_account": true,
    "access_token": "officetoken",
    "unionid": "unionid4a"
  },
  "_weixin_unionid": {   // 新增键值对
    "uid": "unionid4a"
  }
}
```

可以看到，与之前的第三方登录 API 相比，这里由于登录时指定了 `asMainAccount` 为 true，所以 authData 的第一级子目录中增加了 `_weixin_unionid` 的键值对，这里的 `weixin` 就是我们指定的 `unionIdPlatform` 的值。`_weixin_unionid` 这个增加的键值对非常重要，以后我们判断是否存在同样 UnionID 的账户就是依靠它来查找的，而是否增加这个键值对，则是由登录时指定的 `asMainAccount` 的值决定的：

- 当 `asMainAccount` 为 true 时，云端会在 `authData` 下面增加名为 `_{unionIdPlatform}_unionid` 的键值对，当前账号就会作为这一个 UnionID 对应的主账号被唯一确定。
- 当 `asMainAccount` 为 false 时，云端不会在 `authData` 下面增加名为 `_{unionIdPlatform}_unionid` 的键值对，此时如果通过提供的 UnionID 可以找到主账号，则会将当前的鉴权信息合并进主账号的 `authData` 属性里，同时返回主账号对应的 _User 表记录；如果通过提供的 UnionID 找不到主账号，则会根据平台的 `openid` 去查找账户，找到匹配的账户就返回匹配的，找不到就新建一个账户，此时的处理逻辑与不使用 UnionID 时的逻辑完全一致。

接下来，用户 A 继续在「云服务技术支持」中进行微信登录，其登录逻辑为：

与「云服务通讯」中的登录过程相比，在「云服务技术支持」这个应用中，我们在登录时只是将 `asMainAccount` 设为了 false。 这时我们看到，本次登录得到的还是 objectId 为 `ThisIsUserA` 的 _User 表记录（同一个账户），同时该账户的 `authData` 属性中发生了变化，多了 `wxleansupport` 的数据，如下：

```json
{
  "wxleanoffice": {
    "platform": "weixin",
    "uid": "officeopenid",
    "expires_in": 1384686496,
    "main_account": true,
    "access_token": "officetoken",
    "unionid": "unionid4a"
  },
  "_weixin_unionid": {
    "uid": "unionid4a"
  },
  "wxleansupport": {
    "platform": "weixin",
    "uid": "supportopenid",
    "expires_in": 1384686496,
    "main_account": false,
    "access_token": "supporttoken",
    "unionid": "unionid4a"
  }
}
```

在新的登录方式中，当一个用户以「平台名为 `wxleanoffice`、uid 为 `officeopenid`、UnionID 为 `unionid4a`」的第三方鉴权信息登录得到新的 `leancloud.User` 后，接下来这个用户以「平台名为 `wxleansupport`、uid 为 `supportopenid`、UnionID 为 `unionid4a`」的第三方鉴权信息登录时，云端判定是同样的 UnionID，就直接把来自 `wxleansupport` 的新用户数据加入到已有账户的 `authData` 里了，不会再创建新的账户。

这样一来，云端通过识别平台性的用户唯一标识 UnionID，让来自同一个 UnionID 体系内的应用程序、小程序等不同平台的用户都绑定到了一个 `leancloud.User` 上，实现互通。

##### 为 UnionID 建立索引

云端会为 UnionID 自动建立索引，不过因为自动创建基于请求的抽样统计，可能会滞后。
因此，我们推荐自行创建相关索引，特别是用户量（`_User`　表记录数）很大的应用，更需要预先创建索引，否则用户使用 UnionID 账号登录时可能超时失败。
以上面的微信 UnionID 为例，建议在控制台预先创建下列唯一索引（允许缺失值）：

- `authData.wxleanoffice.uid`
- `authData.wxleansupport.uid`
- `authData._weixin_unionid.uid`

##### 该如何指定 unionIdPlatform

从上面的例子可以看出，使用 UnionID 登录的时候，需要指定 `unionIdPlatform` 的主要目的，就是为了便于查找已经存在的唯一主账号。云端会在主账号对应账户的 `authData` 属性中增加一个 `_{unionIdPlatform}_unionid` 键值对来标记唯一性，终端用户在其他应用中登录的时候，云端会根据参数中提供的 `uniondId` + `unionIdPlatform` 的组合，在 `_User` 表中进行查找，这样来确定唯一的既存主账号。

本来 `unionIdPlatform` 的取值，应该是开发者可以自行决定的，但是 JavaScript SDK 基于易用性的目的，在 `loginWithAuthDataAndUnionId` 之外，还额外提供了两个接口：

- `AV.User.loginWithQQAppWithUnionId`，这里默认使用 `qq` 作为 `unionIdPlatform`。
- `AV.User.loginWithWeappWithUnionId`，这里默认使用 `weixin` 作为 `unionIdPlatform`。

从我们的统计来看，这两个接口已经被很多开发者接受，在大量线上产品中产生着实际数据。所以为了避免数据在不同平台（例如 Android 和 iOS 应用）间发生冲突，建议大家统一按照 JavaScript SDK 的默认值来设置 `unionIdPlatform`，即：

- 微信平台的多个应用，统一使用 `weixin` 作为 `unionIdPlatform`；
- QQ 平台的多个应用，统一使用 `qq` 作为 `unionIdPlatform`；
- 微博平台的多个应用，统一使用 `weibo` 作为 `unionIdPlatform`；
- 除此之外的其他平台，开发者可以自行定义 `unionIdPlatform` 的名字，只要自己保证多个应用间统一即可。

##### 主副应用不同登录顺序出现的不同结果

上面的流程是用户先登录了「云服务通讯」这个主应用，然后再登录「云服务技术支持」这个副应用，所以账号都被通过 UnionID 有效关联起来了。可能有人会想到另外一个问题，如果用户 B 先登录副应用，后登录主应用，这时候会发生什么事情呢？

用户 B 首先登录副应用的时候，提供了「平台名为 `wxleansupport`、uid 为 `supportopenid`、UnionID 为 `unionid4a`」的第三方鉴权信息，并且指定「UnionIDPlatform 为 `weixin`、`asMainAccount` 为 false」（与上面的调用完全一致），此时云端由于找不到存在的 UnionID，会新建一个 `leancloud.User` 对象，该账户 `authData` 结果为：

```json
{
  "wxleansupport": {
    "platform": "weixin",
    "uid": "supportopenid",
    "expires_in": 1384686496,
    "main_account": false,
    "access_token": "supporttoken",
    "unionid": "unionid4a"
  }
}
```

用户 B 接着又使用了主应用，ta 再次通过微信登录，此时以「平台名为 `wxleanoffice`、uid 为 `officeopenid`、UnionID 为 `unionid4a`」的第三方鉴权信息，以及「UnionIDPlatform 为 `weixin`、`asMainAccount` 为 true」的参数进行登录，此时云端由于找不到存在的 UnionID，会再次新建一个 `leancloud.User` 对象，该账户 `authData` 结果为：

```json
{
  "wxleanoffice": {
    "platform": "weixin",
    "uid": "officeopenid",
    "expires_in": 1384686496,
    "main_account": true,
    "access_token": "officetoken",
    "unionid": "unionid4a"
  },
  "_weixin_unionid": {
    "uid": "unionid4a"
  }
}
```

还有更复杂的情况。如果某公司的产品之前就接入了微信登录，产生了很多存量用户，并且分散在不同的子产品中，这时候怎么办？我们接下来专门讨论此时的解决方案。

##### 存量账户如何通过 UnionID 实现关联

还是以我们的两个子产品「云服务通讯」（后续以「产品 1」指代）和「云服务技术支持为例」（后续以「产品 2」指代），在接入 UnionID 之前，我们就接入了之前版本的微信平台登录，这时候账户系统内可能存在多种账户：

- 只使用产品 1 的微信用户 A
- 只使用产品 2 的微信用户 B
- 同时使用两个产品的微信用户 C

此时的存量账户表如下所示：

objectId | 微信用户 | authData.{platform} | authData._{platform}_unionid
------ | ------ | ------ | ------
1 | UserA | openid1（对应产品 1） | N/A
2 | UserB | openid2（对应产品 2） | N/A
3 | UserC | openid3（对应产品 1） | N/A
4 | UserC | openid4（对应产品 2） | N/A

现在我们对两个子产品进行升级，接入 UnionID 体系。这时因为已经有同一个微信用户在不同子产品中创建了不同的账户（例如 objectId 为 3 和 4 的账户），我们需要确定以哪个平台的账号为主。比如决定使用「云服务通讯」上生成的账号为主账号，则在该应用程序更新版本时，使用 `asMainAccount=true` 参数。这个应用带着 UnionID 登录匹配或创建的账号将作为主账号，之后所有这个 UnionID 的登录都会匹配到这个账号。请注意这时 `_User` 表里会剩下一些用户数据，也就是没有被选为主账号的、其他平台的同一个用户的旧账号数据（例如 objectId 为 2 和 4 的账户）。这部分数据会继续服务于已经发布的但仍然使用 OpenID 登录的旧版应用。

接下来我们看一下，如果以产品 1 的账户作为「主账户」，按照前述的方式同时提供 openid/unionid 完成登录，则最后达到的结果是：

1. 使用老版本的用户，不管在哪个产品里面，都可以和往常一样通过 openid 登录到正确的账户；
2. 使用产品 1 的新版本的老用户，通过 openid/unionid 组合，还是绑定到原来的账户。例如 UserC 在产品 1 中通过 openid3/unionId3 还是会绑定到 objectId=3 的账户（会增加 uniondId 记录）；而 UserC 在产品 2 的新版本中，通过 openid4/unionId3 的组合则会绑定到 objectId=3 的账户，而不再是原来的 objectId=4 的账户。
3. 使用产品 1 的新版本的新用户，通过 openid/unionid 组合，会创建新的账户；之后该用户再使用产品 2 的新版本，也会绑定到刚才创建的新账户上。

以上面的三个用户为例，他们分别升级到两个产品的最新版，且最终都会启用两个产品，则账户表的最终结果如下：

objectId | 微信用户 | authData.{platform} | authData._{platform}_unionid
------ | ------ | ------ | ------
1 | UserA | openid1（对应产品 1）/openid6（对应产品 2） | unionId_user_A
2 | UserB | openid2（对应产品 2） | N/A
3 | UserC | openid3（对应产品 1）/openid4（对应产品 2） | unionId_user_C
4 | UserC | openid4（对应产品 2） | N/A
5 | UserB | openid5（对应产品 1）/openid2（对应产品 2） | unionId_user_B

之后有新的用户 D，分别在两个产品的新版本中登录，则账户表中会增加一条新的 objectId=6 的记录，结果如下：

objectId | 微信用户 | authData.{platform} | authData._{platform}_unionid
------ | ------ | ------ | ------
1 | UserA | openid1（对应产品 1）/openid6（对应产品 2） | unionId_user_A
2 | UserB | openid2（对应产品 2） | N/A
3 | UserC | openid3（对应产品 1）/openid4（对应产品 2） | unionId_user_C
4 | UserC | openid4（对应产品 2） | N/A
5 | UserB | openid5（对应产品 1）/openid2（对应产品 2） | unionId_user_B
6 | UserD | openid7（对应产品 1）/openid8（对应产品 2） | unionId_user_D

如果之后我们增加了新的子产品 3，这些用户在子产品 3 中也进行微信登录的话，那么四个用户还是会继续绑定到 objectId 为 1/3/5/6 的主账户。此时账户表的结果会变为：

objectId | 微信用户 | authData.{platform} | authData._{platform}_unionid
------ | ------ | ------ | ------
1 | UserA | openid1（对应产品 1）/openid6（对应产品 2）/openid9（对应产品 3） | unionId_user_A
2 | UserB | openid2（对应产品 2） | N/A
3 | UserC | openid3（对应产品 1）/openid4（对应产品 2）/openid10（对应产品 3） | unionId_user_C
4 | UserC | openid4（对应产品 2） | N/A
5 | UserB | openid5（对应产品 1）/openid2（对应产品 2）/openid11（对应产品 3） | unionId_user_B
6 | UserD | openid7（对应产品 1）/openid8（对应产品 2）/openid12（对应产品 3） | unionId_user_D

### 匿名用户

将数据与用户关联需要首先创建一个用户，但有时你不希望强制用户在一开始就进行注册。使用匿名用户，可以让应用不提供注册步骤也能创建用户。下面的代码创建一个新的匿名用户：

可以像给普通用户设置属性那样给匿名用户设置 `username`、`password`、`email` 等属性，还可以通过走正常的注册流程来将匿名用户转化为普通用户。匿名用户能够：

- [使用用户名和密码注册](#注册)
- [关联第三方平台](#第三方账户登录)，比如微信

下面的代码为一名匿名用户设置用户名和密码：

下面的代码检查当前用户是否为匿名用户：

如果匿名用户未能在登出前转化为普通用户，那么该用户将无法再次登录同一账户，且之前产生的数据也无法被取回。

## 角色

随着用户量的增长，你可能会发现相比于为每一名用户单独设置权限，将预先设定好的权限直接分配给一部分用户是更好的选择。为了迎合这种需求，云服务支持基于角色的权限管理。请参阅 [ACL 权限管理开发指南](/sdk/storage/guide/acl/)

## 全文搜索

全文搜索是一个针对应用数据进行全局搜索的接口，它基于搜索引擎构建，提供更强大的搜索功能。要深入了解其用法和阅读示例代码，请阅读 [全文搜索指南](/sdk/storage/guide/fulltext-search/)。

## 应用内社交

应用内社交包含「好友关系」及「信息流」，例如陌生人的关注、好友申请、朋友圈、状态等，请参考[好友关系开发指南](leanstorage_friendship_guide.html)及[社交信息流开发指南](status_system.html)。

<!-- This code is for Google Ads -->
<!-- Event snippet for conversion page of google Ads -->
<!-- This code is not for Google Analytics but ads. Connect ycui if you have any questions. -->
<script>
  gtag('event', 'conversion', {'send_to': 'AW-1030743864/TDDfCJ_C8K8BELjOv-sD'});
</script>
