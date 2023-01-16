# 点号使用指南

许多编程语言中都可以通过点号（`.`）访问对象的属性。
LeanCloud 的 SDK 和 REST API 也支持类似的功能。
善用点号常常可以让代码看上去更简短，降低网络通讯的开销。

## 在查询对象时使用点号

AVObject 字段允许的类型包括对象（`Object`），如果我们想要根据对象的属性发起查询，那么可以使用 `字段名.属性名` 的格式进行查询。
例如，假设有一个 `Member` 类，其 `occupation` 字段的结构如下：

```ts
{
    "profession": string;
    "remark": string;
    // ... 其他属性
}
```

那么我们可以像这样查询职业为「Other」（其他）的成员：

```js
query.equalTo("occupation.profession", "Other")
```

注意，如果需要频繁查询 `occupation.profession`，可以考虑双写一个 `occupation_profession` 字段，然后为该字段添加索引，以加速查询。

在获取对象时，我们可以通过 `select` 指定需要返回的属性。
当指定的属性的类型是对象时，我们可以在 `select` 条件中使用点号，指定只获取该属性的某个属性。
例如，假设包含 `query.select(["occupation"])` 语句的某个查询返回如下对象：

```js
{
    "occupation": {
        "profession": "Other",
        "remark": "Feng Shui Consultant"
    },
    // objectId、createdAt、updatedAt
}
```

那么包含 `query.select(["occupation.profession"])` 语句的相应查询将返回如下对象：

```js
{
    "occupation": {
        "profession": "Other"
    },
    // objectId、createdAt、updatedAt
}
```
## 在设置对象属性时使用点号

同理，我们也可以使用点号直接设置某个对象的属性。例如：

```js
member.set("occupation.profession", "Software Developer")
```

注意，使用点号的前提是点号左侧的字段已经存在。
也就是说，在上面的例子中，`member` 对象上必须已经存在 `occupation` 字段，否则直接使用 `occupation.profession` 会报错。
这种情况下，可以使用以下方式设置属性：

```js
member.set("occupation": '{ "profession": "Software Developer" }')

// 下面这样也行，但是不如上一种方式简洁，因此不推荐使用。
member.set("occupation": "{}")
member.set("occupation.profession", "Software Developer")
```

更新数组的操作（`add`、`addUnique`、`remove`）同样适用于内嵌于字段的数组，可以搭配点号使用。
例如，假设 `Article` 类的 `section` 字段的类型为对象（object)，其中有一个属性 `tags` 是一个数组，那么我们可以通过以下方式新增标签：

```js
const article = new AV.Object.createWithoutData('Article', '582570f38ac247004f39c24b');
article.addUnique('section.tags', ['LeanStorage', 'JavaScript']);
```

## Pointer 和点号

无需额外查询即可获取来自另一个 Class 的数据的 `include` 语句，也支持点号。
例如，假设 `Comment` 类的 `post` 字段是一个指向 `Post` 类的 Pointer，而 `Post` 类又有一个指向 `Author` 类的 Pointer 字段 `author`，那么我们可以使用如下语句同时获取评论所属文章的作者：

```js
query.include('post.author')
```

Pointer 中的点号看起来和前面提到的对象中的点号很相似，但两者是独立的功能。例如：

- `include` 语句中的点号只是在查询到结果后，「展开」指定的 Pointer 字段，而不是在查询前就「展开」Pointer 字段。因此，无法像查询对象属性一样，通过点号对 Pointer 的属性发起查询。
- 假设 `Comment` 类的 `post` 字段是一个指向 `Post` 类的 Pointer，而 `Post` 类又有一个指向 `Author` 类的 Pointer 字段 `author`， 然后 `Author` 类还有一个指向 `Group` 类的 Pointer 字段 `group`，那么 `query.include('post.author.group')` 可以同时获取评论所属文章的作者所属的群组。但如果 `post` 字段是一个 Pointer，它指向的 `Post` 类的 `author` 字段是一个**对象**，其中包含一个指向 `Group` 类的 `group` 字段，那么无法使用 `query.include('post.author.group')`。 