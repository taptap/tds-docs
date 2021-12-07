---
id: redis
title: LeanCache 使用指南
sidebar_label: LeanCache
---

import EngineRuntimes from '/src/docComponents/MultiLang/engine';
import LeandbCliAccess from '../_partials/leandb-cli-access.mdx';
import LeandbCreateInstance from '../_partials/leandb-create-instance.mdx';

LeanCache 是云引擎提供的托管 Redis，开发者可以在云引擎中使用 Redis 客户端类库连接，访问完整的 Redis 功能，更多其他托管数据库请查看 [云引擎总览]。

LeanCache 使用 [Redis](http://redis.io/) 提供了高性能、高可用的 Key-Value 内存存储，主要用作缓存数据的存储，也可以用作持久化数据的存储。LeanCache 采用主从架构的 **高可用** 配置，通过 AOF 和 RDB 进行数据的持久化，还提供来在不中断服务的情况下在线扩容的能力。

<details>
<summary>点击展开 LeanCache 的使用场景</summary>

* 某些数据量少，但是读写比例很高，比如某些应用的菜单可以通过后台调整，所有用户会频繁读取该信息。
* 需要同步锁或者队列处理，比如秒杀、抢红包等场景。
* 多个云引擎节点的协同和通信。

恰当使用 LeanCache 不仅可以极大地提高应用的服务性能，还能 **降低成本**，因为某些高频率的查询不需要走存储服务（存储服务按调用次数收费）。你可以在 [leanengine-nodejs-demos](https://github.com/leancloud/leanengine-nodejs-demos) 中找到一些有关 LeanCache 的示例：

- [associated-data](https://github.com/leancloud/leanengine-nodejs-demos/blob/master/functions/associated-data.js) 缓存关联数据
- [leaderboard](https://github.com/leancloud/leanengine-nodejs-demos/blob/master/functions/leaderboard.js) 实现排行榜
- [limited-stock-rush](https://github.com/leancloud/leanengine-nodejs-demos/blob/master/functions/limited-stock-rush.js) 实现秒杀抢购
- [redlock](https://github.com/leancloud/leanengine-nodejs-demos/blob/master/functions/redlock.js) 实现分布式锁

</details>

<details>
<summary>点击展开 LeanCache 高可用详情</summary>

每个 LeanCache 实例使用 Redis Master-Slave 主从热备，其下的多个观察节点每隔 1 秒钟观察一次主节点的状态。如果「主节点」最后一次有效响应在 5 秒之前，则该观察节点认为主节点失效。如果超过总数一半的观察节点发现主节点失效，则自动将「从节点」切换为主节点，并会有新的从节点启动重新组成主从热备。这个过程对应用完全透明，不需要修改连接字符串或者重启，整个切换过程应用只有几秒钟会出现访问中断。

与此同时，从节点还会以 [AOF 方式](http://www.redis.cn/topics/persistence.html) 将数据持久化存储到可靠的中央文件中，每秒刷新一次。如果很不巧主从节点同时失效，则马上会有新的 Redis 节点启动，并从 AOF 文件恢复，完成后即可再次提供服务，并且会有新的从节点与之构成主从热备。

当一个实例中的主节点失效，而最新的数据没有同步到对应的从节点时，主从切换会造成这部分数据丢失。当主、从节点同时失效，未同步到从节点和从节点未刷新到磁盘 AOF 文件中的数据将会丢失。

</details>

## 创建和管理实例
开发者可以在 **开发者中心 > 你的游戏 > 游戏服务 > 云服务 > 云引擎 > LeanCache (Redis)** 页面创建和管理 LeanDB 实例。

### 创建实例

<LeandbCreateInstance instanceName='LeanCache'>

- **实例名称** 用于在云引擎中通过环境变量引用到该 LeanDB 实例，在账户下需唯一。
- **数据删除策略** 内存用满时的删除策略，默认为 `volatile-lru`，详见 [数据删除策略](#数据删除策略)
- **实例容量** 目前提供 `128M`、`256M`、`512M`、`1G`、`2G `、`4G`、`8G` 几种，代表不同的内存容量，是计费的基础。

</LeandbCreateInstance>

### 数据删除策略

详见 [官方文档](https://redis.io/topics/lru-cache#eviction-policies)，下面是一个简单的概括：

- `noeviction` 不删除，当内存满时，直接返回错误。
- `allkeys-lru` 优先删除最近最少使用的 key，以释放内存。
- `volatile-lru` 优先删除设定了过期时间的 key 中最近最少使用的 key，以释放内存。
- `allkeys-random` 随机删除一个 key，以释放内存。
- `volatile-random` 从设定了过期时间的 key 中随机删除一个，以释放内存。
- `volatile-ttl` 从设定了过期时间的 key 中删除最老的 key，以释放内存。

### Redis 版本

目前 LeanCache 仅提供 Redis 6 版本。

### 在线扩容

你可以在线扩大（或者缩小） LeanCache 实例的最大内存容量。整个过程可能会持续一段时间，在此期间 LeanCache 会中断几秒钟进行切换，其他时间都正常提供服务。如果你的应用访问量较大的话，LeanCache 中断的这几秒可能会对你的云引擎实例产生较为明显的影响（例如内存增加），可以考虑将扩容安排在低峰时刻。

:::caution
缩小容量之前，请务必确认现有数据体积小于目标容量，否则可能造成数据丢失。
:::

### 管理共享

可以使用控制台上的「管理共享」功能将 LeanCache 实例共享给其他应用，被共享的应用的 LeanCache 页面可能看到这个实例，相关的环境变量也会出现在其他应用的云引擎中。

## 在云引擎中使用

LeanDB 所在的应用的云引擎在部署时，会被注入几个包含 Redis 连接信息的环境变量，包括：

- `REDIS_URL_<NAME>`

其中 `<NAME>` 是你在创建 LeanDB 时为它指定的名字，如果你的 LeanDB 名为 `MYRDB` 的话，就会有名为 `REDIS_URL_MYRDB` 的环境变量。

<EngineRuntimes>
<TabItem value='nodejs'>

首先添加相关依赖到云引擎应用中：

```json
"dependencies": {
  "ioredis": "^4.9.0"
}
```

然后可以使用下列代码获取 Redis 连接：（假定实例名称为 `MYCACHE`）

```js
const Redis = require('ioredis')

const client = new Redis(process.env['REDIS_URL_MYCACHE']);
client.on('error', function(err) {
  return console.error('redis err: ', err);
});
```

</TabItem>
<TabItem value='python'>

首先添加相关依赖到云引擎应用的 `requirements.txt` 中：

```python
Flask>=0.10.1
leancloud-sdk>=1.0.9
...
redis
```

然后可以使用下列代码获取 Redis 连接：（假定实例名称为 `MYCACHE`）

```python
import os
import redis

r = redis.from_url(os.environ.get("REDIS_URL_MYCACHE"))
```

</TabItem>
<TabItem value='php'>

首先添加 redis 库的依赖，比如 predis：

```sh
composer require 'predis/predis:1.1.*'
```

然后在 PHP 应用中通过环境变量获取 Redis 地址并创建链接，如：（假定实例名称为 `MYCACHE`）

```php
use Predis;
$redis = new Predis\Client(getenv("REDIS_URL_MYCACHE"));
$redis->ping();
```

</TabItem>
<TabItem value='java'>

在 `pom.xml` 中添加 redis client 的依赖：

```xml
<dependency>
    <groupId>redis.clients</groupId>
    <artifactId>jedis</artifactId>
    <version>3.2.0</version>
</dependency>
```

并引入依赖：

```java
import redis.clients.jedis.Jedis;
```

从环境变量中获取链接字符串，然后再创建 redis client 实例即可。（假定实例名称为 `MYCACHE`）

```java
String redisUrl = System.getenv("REDIS_URL_MYCACHE");
Jedis jedis = new Jedis(redisUrl);
jedis.set("foo", "bar");
String value = jedis.get("foo");
jedis.close();
```

并发请求较高的情况下可以考虑使用连接池：

```java
public class RedisHelper {
    private final JedisPool jedisPool;
    public RedisHelper() {
        // 创建应用时，先创建连接池；使用默认配置
        jedisPool = new JedisPool(System.getenv("REDIS_URL_jedis_128m"));
    }

    // 使用；从连接池取出一个 jedis 连接使用
    // 注意，使用完了之后，要调用返回的 jedis 对象的 close 方法返还连接。`jedis.close()`
    public Jedis getJedis() {
        Jedis jedis = jedisPool.getResource();
        return jedis;
    }

    public void closePool() {
        // 关闭应用时关闭连接池
        jedisPool.close();
    }
}
```

</TabItem>
<TabItem value='dotnet'>

首先在项目里面安装 nuget 依赖：

```sh
dotnet add LeanCloud.Engine.Middleware.AspNetCore
```

直接使用 [StackExchange.Redis](https://stackexchange.github.io/StackExchange.Redis/) 里面构建的方式。

假设在控制台创建了一个名字叫做 `dev` LeanCache 实例，如下代码将演示如何连接这个实例，并且存储、读取数据：

```cs
// 获取 dev 实例
var leancache = new LeanCache("dev");
// 获取 dev 的配置
var redisConfiguration = leancache.CurrentConfigurations;
// 构建 StackExchange.Redis.ConfigurationOptions
ConfigurationOptions config = new ConfigurationOptions
{
    ServiceName = this.InstanceName,
    ClientName = this.InstanceName,
    EndPoints =
        {
            {
                redisConfiguration.Host, redisConfiguration.Port
            },
        },
    KeepAlive = 180,
    DefaultVersion = new Version(2, 8, 8),
    Password = redisConfiguration.Password,
    AbortOnConnectFail = false,
    ConnectRetry = 3,
};
// 直接连接
var conn = ConnectionMultiplexer.Connect(config);
IDatabase db = conn.GetDatabase();
db.StringSet("foo", "bar");
var bar = db.StringGet("foo");
```

关于 `IConnectionMultiplexer` 的用法和相关文档请参阅：[StackExchange.Redis](https://stackexchange.github.io/StackExchange.Redis/)，这个库是 .NET Core 环境中比较推荐的 Redis Client。

</TabItem>
</EngineRuntimes>

## 管理数据
除了在云引擎中通过编程的方式访问 LeanDB，我们还提供了用于进行管理、调试或一次性数据操作的方式。

### 使用命令行工具连接

<LeandbCliAccess />

## 常见问题
### 在本地调试依赖 LeanCache 的应用

目前不支持直接连接线上的 LeanCache 进行调试，所以需要先在本地安装好 Redis。

* Mac 上运行 `brew install redis` 来安装 Redis，然后使用 `redis-server` 启动服务。
* Debian/Ubuntu 上运行 `apt-get install redis-server`
* CentOS/RHEL 运行 `yum install redis`
* Windows 尚无官方支持，可以下载 [微软的分支版本](https://github.com/MSOpenTech/redis/releases) 安装包。

默认情况下，在本地运行时程序没有 LeanCache 的环境变量，因此会使用本地的 Redis 服务器地址。

```js
// 在本地 process.env['REDIS_URL_<实例名称>'] 为 undefined，会连接默认的 127.0.0.1:6379
const client = new Redis(process.env['REDIS_URL_MYCACHE']); // 假定实例名称为 MYCACHE
```

如果部署到预备或生产环境时遇到类似 `redis err: Error: Redis connection to 127.0.0.1:6379 failed - connect ECONNREFUSED 127.0.0.1:6379` 错误，请核实以上代码中 `REDIS_URL_<实例名称>` 这个环境变量的值是否替换正确，也可参考 [在云引擎中使用（Node.js 环境）](#在云引擎中使用_Node_js_环境_) 的示例。

更详细的 Redis 操作说明请参考 [Redis 官方文档](http://redis.io/documentation)。

### 与自建的 HashTable 相比较，LeanCache 有什么优势？

与自己在程序的全局作用域中维护一个 HashTable 相比，使用 LeanCache 的优势在于：

- **多实例之间的数据共享**：云引擎支持多实例运行，自行维护的 HashTable 数据无法[跨实例共享](#多应用间共享使用)。
- **数据持久化存储**：在程序重启或重新部署后数据不会丢失，Redis 会帮你完成数据持久化的工作。LeanCache 还会为你的 Redis 做热备，具有非常高的[可靠性](#可靠性)。
- **原子操作和性能**：Redis 提供了常见的数据结构和大量原子操作，其文档中列出了每个操作符的时间复杂度，而自行实现的 HashTable 的性能则很大程度依赖于具体语言的实现。

### 报错：Redis connection gone from end event

LeanCache 或者任何网络程序都有可能出现连接闪断的问题，可能是因为网络波动，或是服务器负载、容量调整等等。这时只需要重建连接即可使用。而 Redis Client 一般都有断开重连的机制，未连接期间指令会保存到队列，待连接成功后再发送队列中的指令（[Redis client library](https://www.npmjs.com/package/redis) 便是如此实现）。所以如果这个错误<u>偶尔发生</u>，一般不会有什么问题；同时建议在应用中 [增加 Redis 的 on error 事件处理](#在云引擎中使用_Node_js_环境_)。

如果这个错误**频繁出现**，那么很可能 LeanCache 节点处于非受控状态，请提交工单联系技术支持进行处理。

### 多实例

有些时候，你可能希望在一个应用里创建多个 LeanCache 实例：

* **需要存储的数据大于 8 GB**：目前我们提供的实例最大容量为 8 GB。如果有大于此容量的数据，建议你创建多个实例，然后根据功能来划分，比如一个用来做持久化，另一个用来做缓存。
* **需要更高的性能**：如果单实例的性能已经成为应用的瓶颈，你可以创建多个实例，然后在云引擎中同时连接，并自己决定 key 的分片策略，使请求分散到不同的实例来获得更高的性能。
