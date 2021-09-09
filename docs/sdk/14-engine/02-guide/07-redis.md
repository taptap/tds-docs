---
id: redis
title: LeanCache 指南 
sidebar_label: LeanCache
---



LeanCache 使用 [Redis](http://redis.io/) 5.x 版本来提供高性能、高可用的 Key-Value 内存存储，主要用作缓存数据的存储，也可以用作持久化数据的存储。它非常适合用于以下场景：

* 某些数据量少，但是读写比例很高，比如某些应用的菜单可以通过后台调整，所有用户会频繁读取该信息。
* 需要同步锁或者队列处理，比如秒杀、抢红包等场景。
* 多个云引擎节点的协同和通信。

下图为 LeanCache 和云引擎配合使用的架构：

![LeanCache 架构](/img/leancache_arch.png)

恰当使用 LeanCache 不仅可以极大地提高应用的服务性能，还能**降低成本**，因为某些高频率的查询不需要走存储服务（存储服务按调用次数收费）。你可以在 [leanengine-nodejs-demos](https://github.com/leancloud/leanengine-nodejs-demos) 中找到一些有关 LeanCache 的示例：

- [associated-data](https://github.com/leancloud/leanengine-nodejs-demos/blob/master/functions/associated-data.js) 缓存关联数据
- [leaderboard](https://github.com/leancloud/leanengine-nodejs-demos/blob/master/functions/leaderboard.js) 实现排行榜
- [limited-stock-rush](https://github.com/leancloud/leanengine-nodejs-demos/blob/master/functions/limited-stock-rush.js) 实现秒杀抢购
- [redlock](https://github.com/leancloud/leanengine-nodejs-demos/blob/master/functions/redlock.js) 实现分布式锁


## 主要特性

* **高性能**：接近 7 万的 QPS
* **高可用**：基于 [AOF 持久化](http://www.redis.cn/topics/persistence.html) 的 Master-Slave 主从热备份。
* **在线扩容**：在线调整容量，数据平滑迁移。
* **多实例**：满足更大容量或更高性能的需求。

## 创建实例

在**云服务控制台 > 云引擎 > LeanCache (Redis)**页面点击**创建实例**即可创建新实例。

**LeanCache 实例一旦生成，就开始计费，因此请认真对待该操作。**

创建实例时可设置的参数有：

* **实例名称**：最大长度不超过 32 个字符，限英文、数字、下划线，只能以字母开头。每个开发者账户下 LeanCache 实例名称<u>必须唯一</u>。
* **实例容量**：可选 128 MB、256 MB、512 MB、1 GB、2 GB、4 GB、8 GB。
* **删除策略**：内存满时对 key 的删除策略，默认为 `volatile-lru`，更多选择请参考 [数据删除策略](#数据删除策略)。

创建好的实例会在控制台显示基本信息，包括实例名称、创建时间、运行状态、当前连接数、已用容量、访问地址、数据删除策略、Redis 版本。
点击**调整容量**按钮可以扩容或缩容。
点击**管理共享**按钮可以查看可以访问该 LeanCache 实例的应用，
### 数据删除策略

目前我们支持如下几种策略：

| 策略                                       | 说明                                   |
| ---------------------------------------- | ------------------------------------ |
| `noeviction`                             | 不删除，当内存满时，直接返回错误。                    |
| `allkeys-lru`                            | 优先删除最近最少使用的 key，以释放内存。               |
| `volatile-lru`                           | 优先删除设定了过期时间的 key 中最近最少使用的 key，以释放内存。 |
| `allkeys-random`                         | 随机删除一个 key，以释放内存。                    |
| `volatile-random`                        | 从设定了过期时间的 key 中随机删除一个，以释放内存。         |
| `volatile-ttl`                           | 从设定了过期时间的 key 中删除最老的 key，以释放内存。      |

请注意，如果所有的 key 都不设置过期时间，那么 `volatile-lru`、`volatile-random`、`volatile-ttl` 这三种策略会等同于 `noeviction`（不删除）。更详细的内容请参考 [Using Redis as an LRU cache](http://redis.io/topics/lru-cache)。

**LeanCache 实例一旦生成后，该属性不可修改。**

## 删除实例

在**云服务控制台 > 云引擎 > LeanCache (Redis)**页面的每个实例卡片中，点击**删除**按钮即可删除实例。

删除**其他应用共享的实例**需要至该实例所属应用删除。

## 使用

LeanCache 目前支持通过云引擎访问。实例创建完毕后，云引擎应用就可以从环境变量中获取 `REDIS_URL_<实例名称>` 的 Redis 连接字符串，通过该信息连接并使用 Redis。

LeanCache 不提供外网直接访问。如果需要进行简单的数据操作或者查看状态，可以查看控制台：

![image](/img/leancache_status.png)

或者使用命令行工具。

### 在命令行工具中使用

LeanCache 用户可以使用命令行工具来连接线上的 LeanCache 实例，对数据进行增删改查。

在一个已经关联过 LeanCache 实例的云引擎项目中，使用 `lean cache` 命令，即可连上对应的 LeanCache 实例。另外需要注意的是，每个 LeanCache 实例，默认会分成 16 个 db，方便管理。没有特殊设置的话，默认使用的都是 db0。

连接成功之后，可以直接执行命令来对数据进行操作，比如查看某个 key 的值：

```
LeanCache (db 0) > GET foo
"bar"
```

LeanCache 基于 Redis，所以大部分 Redis 命令都可以使用。关于 Redis 的命令，请参考[官方文档](https://redis.io/commands) 。

可以通过下列命令查询当前应用有哪些 LeanCache 实例：

```sh
$ lean cache list
```

**注意**：命令行工具操作 LeanCache 时，是通过 HTTPS 请求来进行通讯的，因此类似 `pub/sub`、`blpop` 等需要长连接的命令不能直接使用。但是线上没有这个限制，可以直接使用。

### 在云引擎中使用（Node.js 环境）

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

### 在云引擎中使用（Python 环境）

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

### 在云引擎中使用（PHP 环境）

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

### 在云引擎中使用（Java 环境）

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

### 在云引擎中使用（.NET Core 环境）

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


### 多应用间共享使用

可以使用控制台上的「管理共享」功能将 LeanCache 实例共享给其他应用，相关的环境变量就会出现在其他应用的云引擎中，调用方法和上述例子一样。

对于某些使用场景，譬如 O2O 行业的用户端和管理端，或者网络租约车平台的乘客端和司机端，需要多个应用共享同一个 LeanCache 数据，这一点将会非常有用。

## 性能

下面是使用 redis-benchmark 测试一个典型的容量为 2 GB 的 LeanCache 实例的性能表现：

```sh
$ redis-benchmark -n 100000 -q
PING_INLINE: 69783.67 requests per second
PING_BULK: 68306.01 requests per second
SET: 68634.18 requests per second
GET: 67659.00 requests per second
INCR: 67294.75 requests per second
LPUSH: 61236.99 requests per second
LPOP: 62460.96 requests per second
SADD: 63451.78 requests per second
SPOP: 64724.92 requests per second
LPUSH (needed to benchmark LRANGE): 64808.82 requests per second
LRANGE_100 (first 100 elements): 62189.05 requests per second
LRANGE_300 (first 300 elements): 64267.35 requests per second
LRANGE_500 (first 450 elements): 66934.41 requests per second
LRANGE_600 (first 600 elements): 61462.82 requests per second
MSET (10 keys): 60096.15 requests per second
```

## 可靠性

每个 LeanCache 实例使用 Redis Master-Slave 主从热备，其下的多个观察节点每隔 1 秒钟观察一次主节点的状态。如果「主节点」最后一次有效响应在 5 秒之前，则该观察节点认为主节点失效。如果超过总数一半的观察节点发现主节点失效，则自动将「从节点」切换为主节点，并会有新的从节点启动重新组成主从热备。这个过程对应用完全透明，不需要修改连接字符串或者重启，整个切换过程应用只有几秒钟会出现访问中断。

与此同时，从节点还会以 [AOF 方式](http://www.redis.cn/topics/persistence.html) 将数据持久化存储到可靠的中央文件中，每秒刷新一次。如果很不巧主从节点同时失效，则马上会有新的 Redis 节点启动，并从 AOF 文件恢复，完成后即可再次提供服务，并且会有新的从节点与之构成主从热备。

### 极端情况下的数据丢失

当一个实例中的主节点失效，而最新的数据没有同步到对应的从节点时，主从切换会造成这部分数据丢失。

当主、从节点同时失效，未同步到从节点和从节点未刷新到磁盘 AOF 文件中的数据将会丢失。

## 在线扩容

你可以在线扩大（或者缩小） LeanCache 实例的最大内存容量。整个过程可能会持续一段时间，在此期间 LeanCache 会中断几秒钟进行切换，其他时间都正常提供服务。如果你的应用访问量较大的话，LeanCache 中断的这几秒可能会对你的云引擎实例产生较为明显的影响（例如内存增加），可以考虑将扩容安排在低峰时刻。

**缩小容量之前，请务必确认现有数据体积小于目标容量，否则可能造成数据丢失。**

## 多实例

有些时候，你可能希望在一个应用里创建多个 LeanCache 实例：

* **需要存储的数据大于 8 GB**：目前我们提供的实例最大容量为 8 GB。如果有大于此容量的数据，建议你创建多个实例，然后根据功能来划分，比如一个用来做持久化，另一个用来做缓存。
* **需要更高的性能**：如果单实例的性能已经成为应用的瓶颈，你可以创建多个实例，然后在云引擎中同时连接，并自己决定 key 的分片策略，使请求分散到不同的实例来获得更高的性能。

添加实例的方式请参考 [创建实例](#创建实例)。

## 价格

因为用户可能需要随时调整 LeanCache 实例的容量，所以为了方便计算，我们按照每个实例当天所使用的「最大容量」来结算，而不是「实际使用容量」。

不同容量的 LeanCache 实例的价格，请参考官网报价。不同的节点使用不同的结算货币，价格会有差异，敬请留意。

### 费用计算

LeanCache 采取按天扣费，使用时间不足一天按一天收费，次日凌晨系统从账户余额中扣费。付费范围包括当前账户下隶属于每个应用的所有 LeanCache 实例，取每个实例当天使用的最大容量的价格，累计相加计算出总的使用费用。

如果在系统扣费之时，账户没有充足余额，那么在扣费当天的上午 10 点，账户内所有应用使用的**全部实例会停止服务**，但数据仍会保留，期限为 1 个月。

已停止服务的实例状态显示为「未运行」。要恢复服务，需要向账户充值。在账户余额补足后的 5 分钟内，已停止服务的所有实例将会自动恢复运行。

### 删除无用实例

为了避免发生不必要的使用费，请及时删除不再使用的实例，步骤请参考 [删除实例](#删除实例)。

## 常见问题

### 与自建的 HashTable 相比较，LeanCache 有什么优势？

与自己在程序的全局作用域中维护一个 HashTable 相比，使用 LeanCache 的优势在于：

- **多实例之间的数据共享**：云引擎支持多实例运行，自行维护的 HashTable 数据无法[跨实例共享](#多应用间共享使用)。
- **数据持久化存储**：在程序重启或重新部署后数据不会丢失，Redis 会帮你完成数据持久化的工作。LeanCache 还会为你的 Redis 做热备，具有非常高的[可靠性](#可靠性)。
- **原子操作和性能**：Redis 提供了常见的数据结构和大量原子操作，其文档中列出了每个操作符的时间复杂度，而自行实现的 HashTable 的性能则很大程度依赖于具体语言的实现。

### 报错：Redis connection gone from end event

LeanCache 或者任何网络程序都有可能出现连接闪断的问题，可能是因为网络波动，或是服务器负载、容量调整等等。这时只需要重建连接即可使用。而 Redis Client 一般都有断开重连的机制，未连接期间指令会保存到队列，待连接成功后再发送队列中的指令（[Redis client library](https://www.npmjs.com/package/redis) 便是如此实现）。所以如果这个错误<u>偶尔发生</u>，一般不会有什么问题；同时建议在应用中 [增加 Redis 的 on error 事件处理](#在云引擎中使用_Node_js_环境_)。

如果这个错误**频繁出现**，那么很可能 LeanCache 节点处于非受控状态，请提交工单联系技术支持进行处理。
