---
title: LeanDB MySQL 使用指南
sidebar_label: LeanDB MySQL
sidebar_position: 2
---

import EngineRuntimes from '/src/docComponents/MultiLang/engine';
import LeandbCliAccess from '../_partials/leandb-cli-access.mdx';
import LeandbCreateInstance from '../_partials/leandb-create-instance.mdx';
import TabItem from '@theme/TabItem';

LeanDB MySQL 是云引擎提供的托管数据库，开发者可以在云引擎中使用 MySQL 客户端类库连接，访问完整的 MySQL 功能，更多其他托管数据库请查看 [云引擎服务总览](/sdk/engine/overview)。

## 创建和管理实例
开发者可以在 **开发者中心 > 你的游戏 > 游戏服务 > 云服务 > 云引擎 > MySQL** 页面创建和管理 LeanDB 实例。

### 创建实例

<LeandbCreateInstance>

- **实例名称** 用于在云引擎中通过环境变量引用到该 LeanDB 实例，在账户下需唯一。
- **内存规格** 目前提供 `0.5GB`、`1GB`、`2GB`、`4GB` 几种，代表不同的运算能力，是计费的基础。
- **存储空间** 每个实例默认有 20G 的存储空间，可以选配 100G 或者 500G 的存储空间。

</LeandbCreateInstance>

### MySQL 版本

目前 LeanDB 仅提供 MySQL 5.6 版本。

### 在线扩容

目前 LeanDB MySQL 不提供自助扩容的能力，如需扩容请提交工单联系我们的技术支持。

### 管理共享

可以使用控制台上的「管理共享」功能将 LeanCache 实例共享给其他应用，被共享的应用的 LeanCache 页面可能看到这个实例，相关的环境变量也会出现在其他应用的云引擎中。

## 在云引擎中使用

LeanDB 所在的应用的云引擎在部署时，会被注入几个包含 MySQL 连接信息的环境变量，包括：

- `MYSQL_HOST_<NAME>`
- `MYSQL_PORT_<NAME>`
- `MYSQL_ADMIN_USER_<NAME>`
- `MYSQL_ADMIN_PASSWORD_<NAME>`

其中 `<NAME>` 是你在创建 LeanDB 时为它指定的名字，如果你的 LeanDB 名为 `MYRDB` 的话，就会有名为 `MYSQL_HOST_MYRDB` 的环境变量（以及其他三个）。

<EngineRuntimes>
<TabItem value='nodejs'>

在 Node.js 中你可以这样连接到 MySQL:

```javascript
const mysql = require('mysql')
const Promise = require('bluebird')

const mysqlPool = Promise.promisifyAll(mysql.createPool({
  host: process.env['MYSQL_HOST_MYRDB'],
  port: process.env['MYSQL_PORT_MYRDB'],
  user: process.env['MYSQL_ADMIN_USER_MYRDB'],
  password: process.env['MYSQL_ADMIN_PASSWORD_MYRDB'],
  database: 'test',
  connectionLimit: 10
}))

mysqlPool.queryAsync('SELECT 1 + 1 AS solution').then( rows => {
  console.log('The solution is', rows[0].solution)
}).catch( err => {
  console.error(err)
})
```

- 你需要运行 `npm install --save mysql bluebird` 来安装上面代码中用到的依赖
- 更多的用法请参考 [mysqljs/mysql 的文档](https://github.com/mysqljs/mysql)

</TabItem>
<TabItem value='python'>

在 Python 中你可以这样连接到 MySQL:

```python
import os
import mysql.connector

result = ''

host = os.environ['MYSQL_HOST_MYRDB']
port = os.environ['MYSQL_PORT_MYRDB']
user = os.environ['MYSQL_ADMIN_USER_MYRDB']
password = os.environ['MYSQL_ADMIN_PASSWORD_MYRDB']
try:
  cnx = mysql.connector.connect(
    user=user, password=password, database='test', host=host, port=port)
except mysql.connector.Error as err:
  if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
    print("username or password error")
  elif err.errno == errorcode.ER_BAD_DB_ERROR:
    print("Database does not exist")
  else:
    print(err)
  else:
    cursor = cnx.cursor()
    cursor.execute('SELECT 1 + 1 AS solution')
    for row in cursor:
      result = "The solution is {}".format(row[0])

    cursor.close()
    cnx.close()
```

- 上面用的是 MySQL 官方的 python driver，你需要在 `requirements.txt` 中列出这一依赖，例如：`mysql-connector-python>=8.0.16,<9.0.0`
- 更多的用法请参考 [MySQL Connector/Python 文档](https://dev.mysql.com/doc/connector-python/en/)

</TabItem>
<TabItem value='php'>

在 PHP 中你可以这样连接到 MySQL:

```php
try {
  $mysqlHost = getenv('MYSQL_HOST_MYRDB');
  $mysqlPort = getenv('MYSQL_PORT_MYRDB');
  $pdo = new PDO("mysql:host=$mysqlHost:$mysqlPort;dbname=test", getenv('MYSQL_ADMIN_USER_MYRDB'), getenv('MYSQL_ADMIN_PASSWORD_MYRDB'));

  foreach($pdo->query('SELECT 1 + 1 AS solution') as $row) {
    print "The solution is {$row['solution']}";
  }
} catch (PDOException $e) {
  print $e->getMessage();
}
```

- 更多的用法请参考 [PDO 的文档](https://www.php.net/manual/zh/class.pdo.php)

</TabItem>
<TabItem value='java'>

在 Java 中你可以这样连接到 MySQL:

```java
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;
import java.sql.ResultSet;
import java.sql.SQLException;

String host = System.getenv("MYSQL_HOST_MYRDB");
String port = System.getenv("MYSQL_PORT_MYRDB");
String user = System.getenv("MYSQL_ADMIN_USER_MYRDB");
String password = System.getenv("MYSQL_ADMIN_PASSWORD_MYRDB");
try {
  Class.forName("com.mysql.jdbc.Driver").newInstance();
} catch (Exception ex) {
  // 处理异常
}
try {
  Connection connection = DriverManager.getConnection("jdbc:mysql://" + host + ":" + port + "/test?" +
  "user=" + user + "&password=" + password);
  Statement statement = connection.createStatement();
  ResultSet resultSet = statement.executeQuery("SELECT 1 + 1 AS solution");
  resultSet.first();
  System.out.format("The solution is %d", resultSet.getInt("solution"));
} catch (SQLException ex) {
  // 处理异常
}
```

- 需要在 `pom.xml` 中加入 mysql connector 依赖：

```xml
<dependency>
  <groupId>mysql</groupId>
  <artifactId>mysql-connector-java</artifactId>
  <version>8.0.16</version>
</dependency>
```

- 更多的用法请参考 [MySQL Connector/J 文档](https://dev.mysql.com/doc/connector-j/8.0/en/connector-j-usagenotes-connect-drivermanager.html)

</TabItem>
</EngineRuntimes>

## 管理数据
除了在云引擎中通过编程的方式访问 LeanDB，我们还提供了用于进行管理、调试或一次性数据操作的方式。

### 在线管理面板
为方便开发和调试，我们为开发者提供了一个 Web 界面来对 MySQL 进行管理，你可以在控制台上点击「管理员面板」链接来访问这个 Web 界面。

开发者可以在这个页面上进行 SQL 查询和更新，创建和管理数据库，创建和管理索引等操作。

### 使用命令行工具连接

<LeandbCliAccess />
