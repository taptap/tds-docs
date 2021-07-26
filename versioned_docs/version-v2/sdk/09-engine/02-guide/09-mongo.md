---
id: mongo
title: LeanDB MongoDB 指南
sidebar_label: LeanDB MongoDB
---



LeanDB 是 LeanCloud 推出的数据库托管方案，开发者可以在「控制台 => 云引擎 => LeanDB」中创建托管在 LeanCloud 的数据库实例，这篇文章主要介绍其中的 MongoDB 数据库。

开发者可以在云引擎中连接到自己的 LeanDB 实例，使用通用的 MongoDB 客户端类库，访问完整的 MongoDB 功能。

## 实例规格

- LeanDB MongoDB 提供 MongoDB 4.2 版本。
- LeanDB MongoDB 的规格分为 `512`、`1024`、`2048`、`4096`、`8192` 几种，代表不同的运算能力。
- 每种规格有固定的连接数和存储空间限制，如需要更多连接数或存储空间需要升级到更高的规格。
- 具体的价格可以在控制台上点击「创建 LeanDB 实例」来查看。

## 在云引擎中使用

LeanDB 所在的应用的云引擎在部署时，会被注入包含 MongoDB 连接字符串的环境变量 `MONGODB_URL_<NAME>`，其中 `<NAME>` 是你在创建 LeanDB 时为它指定的名字，如果你的 LeanDB 名为 `MYDB` 的话，就会有名为 `MONGODB_URL_MYDB` 的环境变量。

### Node.js

在 Node.js 中你可以这样连接到 MongoDB（假定 LeanDB 名称为 `MYDB`）：

```javascript
const {MongoClient} = require('mongodb')

const mongoClient = new MongoClient(process.env['MONGODB_URL_MYDB'], {
  useUnifiedTopology: true,
  poolSize: 10
})

mongoClient.connect().then( () => {
  console.log('Connected to MongoDB')
}).catch( err => {
  console.eror('Connect to MongoDB failed', err.message)
})

app.get('/', (req, res) => {
  const cats = mongoClient.collection('cats')

  res.json(cats.find({}, {limit: 10}))
})
```

- 你需要运行 `npm install mongodb` 来安装上面代码中用到的依赖
- 更多的用法请参考 [MongoDB Node Driver 官方文档](https://docs.mongodb.com/drivers/node/)

## 常见问题

- 目前 LeanDB 只支持从云引擎中访问，在本地调试时无法访问。
- 目前 LeanDB 不提供自助扩容的能力，如需扩容请联系我们的技术支持。
- 如账户欠费超过 3 天，LeanDB 及其中的数据会被彻底删除。
- LeanDB 每天扣费，不足一天按照一天扣费。
