---
id: cloudfunction
title: 云函数指南
sidebar_label: 云函数
---

import MultiLang from '@theme/MultiLang';
import Mermaid from '@theme/Mermaid';



当你开发移动端应用时，可能会有下列需求：

- 应用在多平台客户端（Android、iOS、浏览器等）中很多逻辑都是一样的，希望将这部分逻辑抽取出来只维护一份。
- 有些逻辑希望能够较灵活的调整（比如某些个性化列表的排序规则），但又不希望频繁的更新和发布移动客户端。
- 有些逻辑需要的数据量很大，或者运算成本高（比如某些统计汇总需求），不希望在移动客户端进行运算，因为这样会消耗大量的网络流量和手机运算能力。
- 当应用执行特定操作时，由云端系统自动触发一段逻辑（称为 [Hook 函数](#Hook-函数)），例如用户注册后对该用户增加一些信息记录用于统计；或某业务数据发生变化后希望做一些别的业务操作。
- 客户端提供能够越过 ACL 或表权限的限制，对数据进行操作。
- 需要定时运行任务，比如每天凌晨清理垃圾注册账号等。

这时，你可以使用云引擎的云函数。
云函数是一段部署在服务端的 JavaScript、Python、PHP、C#、Go 代码，可以很好地完成上述需求。

如果还不知道如何创建云引擎项目、本地调试并部署到云端，请阅读[云引擎快速入门](/sdk/engine/guide/quickstart/)。


## 云函数

示例项目中文件定义了一个很简单的 `hello` 云函数。
在云端进行计算的一个重要理由是，你不需要将大量的数据发送到设备上做计算，而是将这些计算放到服务端，并返回结果这一点点信息就好。

现在让我们看一个较复杂的例子来展示云函数的用途。

例如，你写了一个应用，让用户对电影评分，一个评分对象大概是这样：

```json
{
  "movie": "夏洛特烦恼",
  "stars": 5,
  "comment": "夏洛一梦，笑成麻花"
}
```

`stars` 表示评分，1-5。如果你想查找《夏洛特烦恼》这部电影的平均分，你可以找出这部电影的所有评分，并在设备上根据这个查询结果计算平均分。但是这样一来，尽管你只是需要平均分这样一个数字，却不得不耗费大量的带宽来传输所有的评分。通过云引擎，我们可以简单地传入电影名称，然后返回电影的平均分。

云函数接收 JSON 格式的请求对象，我们可以用它来传入电影名称。
各语言的 SDK 都在云引擎运行环境上有效，可以直接使用，所以我们可以使用它来查询所有的评分。
结合在一起，实现 `averageStars` 函数的代码如下：

<MultiLang kind="engine">
<>

```js
AV.Cloud.define('averageStars', function (request) {
  var query = new AV.Query('Review');
  query.equalTo('movie', request.params.movie);
  return query.find().then(function (results) {
    var sum = 0;
    for (var i = 0; i < results.length; i++) {
      sum += results[i].get('stars');
    }
    return sum / results.length;
  });
});
```

</>
<>

```python
@engine.define
def averageStars(movie, **params):
    reviews = leancloud.Query(Review).equal_to('movie', movie).find()
    result = sum(x.get('stars') for x in reviews)
    return result
```

客户端 SDK 调用时，云函数的名称默认为 Python 代码中函数的名称。有时需要设置云函数的名称与 Python 代码中的函数名称不相同，可以在 `engine.define` 后面指定云函数名称，比如：

```python
@engine.define('averageStars')
def my_custom_average_start(movie, **params):
    pass
```

</>
<>

```php
use \LeanCloud\Engine\Cloud;
use \LeanCloud\Query;
use \LeanCloud\CloudException;

Cloud::define("averageStars", function($params, $user) {
    $query = new Query("Review");
    $query->equalTo("movie", $params["movie"]);
    try {
        $reviews = $query->find();
    } catch (CloudException $ex) {
        // 查询失败，将错误输出到日志
        error_log($ex->getMessage());
        return 0;
    }
    $sum = 0;
    forEach($reviews as $review) {
        $sum += $review->get("stars");
    }
    if (count($reviews) > 0) {
         return $sum / count($reviews);
    } else {
         return 0;
    }
});
```

</>
<>

```java
@EngineFunction("averageStars")
public static float getAverageStars(@EngineFunctionParam("movie") String movie)
    throws LCException {
  LCQuery<LCObject> query = new LCQuery("Review");
  query.whereEqualTo("movie", movie);
  List<LCObject> reviews = query.find();
  int sum = 0;
  if (reviews == null && reviews.isEmpty()) {
    return 0;
  }
  for (LCObject review : reviews) {
    sum += review.getInt("star");
  }
  return sum / reviews.size();
}
```

</>
<>

```cs
[LCEngineFunction("averageStars")]
public static float AverageStars([LCEngineFunctionParam("movie")] string movie) {
    if (movie == "夏洛特烦恼") {
        return 3.8f;
    }
    return 0;
}
```

然后在程序启动的入口函数中添加如下代码来启用刚才编写的云函数：

```cs
public class Startup {
    ...

    // This method gets called by the runtime. Use this method to add services to the container.
    public void ConfigureServices(IServiceCollection services) {
        // 开启日志（可选）
        LCLogger.LogDelegate = (level, log) => {
            switch (level) {
                case LCLogLevel.Debug:
                    Console.WriteLine($"[DEBUG] {log}");
                    break;
                case LCLogLevel.Warn:
                    Console.WriteLine($"[WARN] {log}");
                    break;
                case LCLogLevel.Error:
                    Console.WriteLine($"[ERROR] {log}");
                    break;
                default:
                    break;
            }
        };
        // 初始化
        LCEngine.Initialize(services);

        services.AddControllersWithViews();
    }

    ...
}
```

</>
<>

```go
type Review struct {
  leancloud.Object
  Movie string `json:"movie"`
  Stars int `json:"stars"`
  Comment string `json:"comment"`
}

leancloud.Define("averageStars", func(req *leancloud.FunctionRequest) (interface{}, error) {
  reviews := make([]Review, 10) // 预留一小部分空间
  if err := client.Class("Review").NewQuery().EqualTo("movie", req.Params["movie"].(string)).Find(&reviews); err != nil {
    return nil, err
  }

  sum := 0
  for _, v := range reviews {
    sum += v.Stars
  }

  return sum / len(reviews), nil
})
```

</>
</MultiLang>

### 参数和返回值

<MultiLang kind="engine">
<>

`Request` 会作为参数传入到云函数中，`Request` 上的属性包括：

- `params: object`：客户端发送的参数对象，当使用 `rpc` 调用时，也可能是 `AV.Object`。
- `currentUser?: AV.User`：客户端所关联的用户（根据客户端发送的 `X-LC-Session` 头）。
- `sessionToken?: string`：客户端发来的 `sessionToken`（`X-LC-Session` 头）。
- `meta: object`：有关客户端的更多信息，目前只有一个 `remoteAddress` 属性表示客户端的 IP。

另外，`AV.Cloud.define` 还接受一个可选参数 `options`（位置在函数名称和调用函数之间）。
这个 `options` 对象上的属性包括：

- `fetchUser: boolean`：是否自动抓取客户端的用户信息，默认为真。设置为假时，`Request` 将不会有 `currentUser` 属性。
- `internal: boolean`：是否只允许在云引擎内（使用 `AV.Cloud.run` 且未开启 `remote` 选项）或使用 `Master Key` （使用 `AV.Cloud.run` 时传入 `useMasterKey`）调用，不允许客户端直接调用。默认为假。

例如，假设我们不希望客户端直接调用上述函数，也不关心客户端用户信息，那么上述函数的定义可以改写为：

```js
AV.Cloud.define('averageStars', { fetchUser: false, internal: true }, function (request) {
  // 定义同上
});
```

如果云函数返回了一个 Promise，那么云函数会使用 Promise 成功结束后的结果作为成功响应；如果 Promise 中发生了错误，云函数会使用这个错误作为错误响应，对于使用 `AV.Cloud.Error` 构造的异常对象，我们认为是客户端错误，不会在标准输出打印消息，对于其他异常则会在标准输出打印调用栈，以便排查错误。

我们推荐大家使用链式的 Promise 写法来完成业务逻辑，这样会极大地方便异步任务的处理和异常处理，**请注意一定要将 Promise 串联起来并在云函数中 return** 以保证上述逻辑正确工作，推荐阅读 [JavaScript Promise 迷你书](http://liubin.org/promises-book/) 来深入地了解 Promise。

在 2.0 之前的早期版本中，云函数接受 `request` 和 `response` 两个参数，我们会继续兼容这种用法到下一个大版本，希望开发者尽快迁移到 Promise 风格的云函数上。之前版本的文档见[Node SDK v1 API 文档](https://github.com/leancloud/leanengine-node-sdk/blob/v1/API.md)。

</>
<>

调用云函数时的参数会直接传递给云函数，因此直接声明这些参数即可。另外调用云函数时可能会根据不同情况传递不同的参数，这时如果定义云函数时没有声明这些参数，会触发 Python 异常，因此建议声明一个额外的关键字参数（关于关键字参数，请参考 [此篇文档](http://www.liaoxuefeng.com/wiki/0014316089557264a6b348958f449949df42a6d3a2e542c000/001431752945034eb82ac80a3e64b9bb4929b16eeed1eb9000) 中「关键字参数」一节）来保存多余的参数。

```python
@engine.define
def my_cloud_func(foo, bar, baz, **params):
    pass
```

除了调用云函数的参数之外，还可以通过 `engine.current` 对象，来获取到调用此云函数的客户端的其他信息。`engine.current` 对象上的属性包括：

- `engine.current.user: leancloud.User`：客户端所关联的用户（根据客户端发送的 `X-LC-Session` 头）。
- `engine.current.session_token: str`：客户端发来的 `sessionToken`（`X-LC-Session` 头）。
- `engine.current.meta: dict`：有关客户端的更多信息，目前只有一个 `remote_address` 属性表示客户端的 IP。

</>
<>

传递给云函数的参数依次为：

- `$params: array`：客户端发送的参数。
- `$user: User`：客户端所关联的用户（根据客户端发送的 `X-LC-Session` 头）。
- `$meta: array`：有关客户端的更多信息，目前只有一个 `$meta['remoteAddress']` 属性表示客户端的 IP。

</>
<>

云函数中可以获取的参数和上下文信息有：

- `@EngineFunctionParam`：客户端发送的参数。
- `EngineRequestContext` 有关客户端的更多信息，其中 `EngineRequestContext.getSessionToken()` 会返回客户端所关联用户的 sessionToken（根据客户端发送的 `X-LC-Session` 头），`EngineRequestContext.getRemoteAddress()` 会返回客户端的实际地址。

</>
<>

云函数中可以获取的参数和上下文信息有：

- `LCEngineFunctionParam`：客户端发送的参数。
- `LCEngineRequestContext` 有关客户端的更多信息，其中 `LCEngineRequestContext.SessionToken` 会返回客户端所关联用户的 sessionToken（根据客户端发送的 `X-LC-Session` 头），`LCEngineRequestContext.RemoteAddress` 会返回客户端的实际地址。

</>
<>

`leancloud.FunctionRequest` 会作为参数传入到云函数中，`leancloud.FunctionRequest` 上的属性包括：

- `Params` 包含客户端发送的参数
- `CurrentUser` 包含客户端所关联的用户（根据客户端发送的 `X-LC-Session` 头）。可以在 `Define` 定义云函数时，在最后传入可选参数 `WithoutFetchUser()` 禁止获取当前调用的用户。
- `SessionToken` 包含客户端发来的 `sessionToken` 根据客户端发送的 `X-LC-Session` 头）。可以在 `Define` 定义云函数时，在最后传入可选参数 `WithoutFetchUser()` 禁止获取当前调用的 `sessionToken`。
- `Meta` 包含有关客户端的更多信息，目前只有一个 `remoteAddress` 属性表示客户端的 IP。

</>
</MultiLang>

### SDK 调用云函数

LeanCloud 各个语言版本的 SDK 都提供了调用云函数的接口：

<MultiLang>

```cs
try {
  Dictionary<string, object> response = await LCCloud.Run("averageStars", parameters: new Dictionary<string, object> {
    { "movie", "夏洛特烦恼" }
  });
  // 处理结果
} catch (LCException e) {
  // 处理异常
}
```
```java
// 构建传递给服务端的参数字典
Map<String, String> dicParameters = new HashMap<String, String>();
dicParameters.put("movie", "夏洛特烦恼");

// 调用指定名称的云函数 averageStars，并且传递参数（默认不使用缓存）
LCCloud.callFunctionInBackground("averageStars", dicParameters).subscribe(new Observer<Object>() {
  @Override
  public void onSubscribe(Disposable disposable) {

  }

  @Override
  public void onNext(Object object) {
    // succeed.
  }

  @Override
  public void onError(Throwable throwable) {
    // failed.
  }

  @Override
  public void onComplete() {

  }
});

// Java SDK 还提供了一个支持缓存的版本，和 LCQuery 一样，开发者在请求的时候，可以指定 CachePolicy 以及缓存的
// 最长期限，这样可以避免短时间一直直接请求云端服务器。
// 下面的请求表示优先使用上次缓存的结果，缓存有效期为 30 秒（30000 毫秒）。
LCCloud.callFunctionWithCacheInBackground("averageStars", dicParameters, LCQuery.CachePolicy.CACHE_ELSE_NETWORK, 30000)
.subscribe(new Observer<Object>() {
  @Override
  public void onSubscribe(Disposable disposable) {

  }

  @Override
  public void onNext(Object object) {
    // succeed.
  }

  @Override
  public void onError(Throwable throwable) {
    // failed.
  }

  @Override
  public void onComplete() {

  }
});
```
```objc
// 构建传递给服务端的参数字典
NSDictionary *dicParameters = [NSDictionary dictionaryWithObject:@"夏洛特烦恼"
                                                          forKey:@"movie"];

// 调用指定名称的云函数 averageStars，并且传递参数
[LCCloud callFunctionInBackground:@"averageStars"
                   withParameters:dicParameters
                   block:^(id object, NSError *error) {
                   if(error == nil){
                     // 处理结果
                   } else {
                     // 处理报错
                   }
}];
```
```swift
LCEngine.run("averageStars", parameters: ["movie": "夏洛特烦恼"]) { (result) in
    switch result {
    case .success(value: let resultValue):
        print(resultValue)
    case .failure(error: let error):
        print(error)
    }
}
```
```dart
try {
  Map response = await LCCloud.run('averageStars', params: { 'movie': '夏洛特烦恼' });
  // 处理结果
} on LCException catch (e) {
  // 处理异常
}
```
```js
var paramsJson = {
  movie: "夏洛特烦恼"
};
AV.Cloud.run('averageStars', paramsJson).then(function (data) {
  // 处理结果
}, function (err) {
  // 处理报错
});
```
```python
from leancloud import cloud

cloud.run('averageStars', movie='夏洛特烦恼')
```
```php
use \LeanCloud\Engine\Cloud;
$params = array(
    "movie" => "夏洛特烦恼"
);
Cloud::run("averageStars", $params);
```
```go
// ...
averageStars, err := leancloud.Run("averageStars", map[string]string{"movie": "夏洛特烦恼"})
if err != nil {
  panic(err)
}
// ...
```

</MultiLang>

### RPC 调用云函数

在这种调用方式下，云引擎会自动为 HTTP Response Body 做序列化，
而 SDK 调用之后拿回的返回结果就是一个完整的 LCObject 或包含这样的对象的数据结构：

<MultiLang>

```cs
try {
  LCObject response = await LCCloud.RPC("averageStars", parameters: new Dictionary<string, object> {
    { "movie", "夏洛特烦恼" }
  });
  // 处理结果
} catch (LCException e) {
  // 处理异常
}
```
```java
// 构建参数
Map<String, Object> dicParameters = new HashMap<>();
dicParameters.put("movie", "夏洛特烦恼");

LCCloud.<LCObject>callRPCInBackground("averageStars", dicParameters).subscribe(new Observer<LCObject>() {
  @Override
  public void onSubscribe(Disposable disposable) {

  }

  @Override
  public void onNext(LCObject avObject) {
    // succeed.
  }

  @Override
  public void onError(Throwable throwable) {
    // failed
  }

  @Override
  public void onComplete() {

  }
});

// Java SDK 还提供了一个支持缓存的版本，和 LCQuery 一样，开发者在请求的时候，可以指定 CachePolicy 以及缓存的
// 最长期限，这样可以避免短时间一直直接请求云端服务器。
// 下面的请求表示优先使用上次缓存的结果，缓存有效期为 30 秒（30000 毫秒）。
LCCloud.<LCObject>callRPCWithCacheInBackground("averageStars", dicParameters, LCQuery.CachePolicy.CACHE_ELSE_NETWORK, 30000)
.subscribe(new Observer<LCObject>() {
  @Override
  public void onSubscribe(Disposable disposable) {

  }

  @Override
  public void onNext(LCObject avObject) {
    // succeed.
  }

  @Override
  public void onError(Throwable throwable) {
    // failed
  }

  @Override
  public void onComplete() {

  }
});
```
```objc
NSDictionary *dicParameters = [NSDictionary dictionaryWithObject:@"夏洛特烦恼"
                                                          forKey:@"movie"];

[LCCloud rpcFunctionInBackground:@"averageStars"
                  withParameters:parameters
                  block:^(id object, NSError *error) {
                  if(error == nil){
                    // 处理结果
                  }
                  else {
                    // 处理报错
                  }
}];
```
```swift
LCEngine.call("averageStars", parameters: ["movie": "夏洛特烦恼"]) { (result) in
    switch result {
    case .success(object: let object):
        if let object = object {
            print(object)
        }
    case .failure(error: let error):
        print(error)
    }
}
```
```dart
try {
  LCObject response = await LCCloud.rpc('averageStars', params: { 'movie': '夏洛特烦恼' });
  // 处理结果
} on LCException catch (e) {
  // 处理异常
}
```
```js
var paramsJson = {
  movie: "夏洛特烦恼"
};

AV.Cloud.rpc('averageStars', paramsJson).then(function (object) {
  // 处理结果
}, function (error) {
  // 处理报错
});
```
```python
from leancloud import cloud

cloud.rpc('averageStars', movie='夏洛特烦恼')
```
```php
// 暂不支持
```
```go
// ...
averageStars := 0
if err := leancloud.RPC("averageStars", Review{Movie: "夏洛特烦恼"}, &averageStars); err != nil {
  panic(err)
}
// ..
```

</MultiLang>

### 云函数错误响应码

可以根据 [HTTP status codes](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes) 自定义错误响应码。

<MultiLang kind="engine">

```js
AV.Cloud.define('customErrorCode', function (request) {
  throw new AV.Cloud.Error('自定义错误信息。', { code: 123 });
});
```
```python
from leancloud import LeanEngineError

@engine.define
def custom_error_code(**params):
    raise LeanEngineError(123, '自定义错误信息。')
```
```php
Cloud::define("customErrorCode", function($params, $user) {
    throw new FunctionError("自定义错误信息。", 123);
});
```
```java
@EngineFunction()
public static void customErrorCode() throws Exception {
  throw new LCException(123, "自定义错误信息。");
}
```
```cs
[LCEngineFunction("throwLCException")]
public static void ThrowLCException() {
    throw new LCException(123, "自定义错误信息。");
}
```
```go
leancloud.Define("customErrorCode", func(req *leancloud.FunctionRequest) (interface{}, error) {
  return nil, leancloud.CloudError{123, "自定义错误信息。"}
})
```

</MultiLang>

客户端收到的响应：`{ "code": 123, "error": "自定义错误信息。" }`。

### 云函数超时

云函数超时时间为 15 秒，如果超过阈值，客户端将收到 HTTP status code 为 `503` 的响应，body 为 `The request timed out on the server`。
注意即使已经响应，此时云函数可能仍在执行，但执行完毕后的响应是无意义的（不会发给客户端，会在日志中打印一个 `Can't set headers after they are sent` 的异常）。
除了 `503` 错误外，有些情况下客户端也可能收到其他报错，如 `524` 或 `141`。

#### 超时的处理方案

我们建议将代码中的任务转化为异步队列处理，以优化运行时间，避免云函数或定时任务发生超时。

例如：

1. 在存储服务中创建一个队列表，包含 `status` 列；
2. 接到任务后，向队列表保存一条记录，`status` 值设置为 `处理中`，然后将请求结束掉，将队列对象的 `id` 发给客户端。
3. 当业务处理完毕，根据处理结果更新刚才的队列对象状态，将 `status` 字段设置为 `完成` 或者 `失败`；
4. 在任何时候，在控制台通过队列 `id` 可以获取某个任务的执行结果，判断任务状态。

不过，对于 before 类 hook 函数，改为异步处理通常没有意义。
虽然改为异步后能保证 before 类函数能够运行完成，不会因超时而报错。
但是，只要 before 类 hook 函数不能及时抛出异常，就无法起到中断操作执行的作用。
对于超时的 before 类 hook 函数，如果无法优化代码，压缩执行时间的话，那只能改为 after 类函数。
例如，假设某个 beforeSave 函数需要调用耗时较久的第三方的自然语言处理接口判断用户提交的评论是否来自真实用户，导致超时，
那么可以改为 afterSave 函数，在保存评论后再调用第三方接口，如果判断是水军评论，那么再行删除。

## Hook 函数

Hook 函数本质上是云函数，但它有固定的名称，定义之后会 **由系统** 在特定事件或操作（如数据保存前、保存后，数据更新前、更新后等等）发生时 **自动触发**，而不是由开发者来控制其触发时机。需要注意：

- 通过控制台进行数据导入时不会触发任何 hook 函数。
- 使用 Hook 函数需要 [防止死循环调用](#防止死循环调用)。
- `_Installation` 表暂不支持 Hook 函数。
- Hook 函数只对当前应用的 Class 生效，对绑定后的目标 Class 无效。

对于 `before` 类的 Hook，如果返回了一个错误的话，这个操作就会被中断，因此你可以在这些 Hook 中主动抛出一个错误来拒绝掉某些操作。对于 `after` 类的 Hook，返回错误并不会影响操作的执行（因为其实操作已经执行完了）。

<Mermaid diagram={`
graph LR
A((save)) -->D{object}
D-->E(new)
E-->|beforeSave|H{error?}
H-->N(No)
N-->B[create new object on the cloud]
B -->|afterSave|C((done))
H-->Y(Yes)
Y-->Z((interrupted))
D-->F(existing)
F-->|beforeUpdate|I{error?}
I-->Y
I-->V(No)
V-->G[update existing object on the cloud]
G-->|afterUpdate| C
`} />


<Mermaid diagram={`
graph LR
A((delete))-->|beforeDelete|H{error?}
H-->Y(Yes)
Y-->Z((interrupted))
H-->N(No)
N-->B[delete object on the cloud]
B -->|afterDelete|C((done))
`} />

为了认证 Hook 调用者的身份，我们的 SDK 内部会确认请求确实是从云引擎内网的云存储组件发出的，如果认证失败，可能会出现 `Hook key check failed` 的提示，如果在本地调试时出现这样的错误，请确保是通过命令行工具启动调试的。

### BeforeSave

在创建新对象之前，可以对数据做一些清理或验证。例如，一条电影评论不能过长，否则界面上显示不开，需要将其截断至 140 个字符：

<MultiLang kind="engine">
<>

```js
AV.Cloud.beforeSave('Review', function (request) {
  var comment = request.object.get('comment');
  if (comment) {
    if (comment.length > 140) {
      // 截断并添加 '…'
      request.object.set('comment', comment.substring(0, 140) + '…');
    }
  } else {
    // 不保存数据，并返回错误
    throw new AV.Cloud.Error('No comment provided!');
  }
});
```

上面的代码示例中，`request.object` 是被操作的 `AV.Object`。除了 `object` 之外，`request` 上还有一个属性：

- `currentUser?: AV.User`：发起操作的用户。

类似地，其他 hook 的 `request` 参数上也包括 `object` 和 `currentUser` 这两个属性。

</>
<>

```python
@engine.before_save('Review') # Review 为需要 hook 的 class 的名称
def before_review_save(review):
    comment = review.get('comment')
    if not comment:
        raise leancloud.LeanEngineError(message='No comment provided!')
    if len(comment) > 140:
        review.comment.set('comment', comment[:140] + '…')
```

</>
<>

```php
Cloud::beforeSave("Review", function($review, $user) {
    $comment = $review->get("comment");
    if ($comment) {
        if (strlen($comment) > 140) {
            // 截断并添加 '…'
            $review->set("comment", substr($comment, 0, 140) . "…");
        }
    } else {
        // 不保存数据，并返回错误
        throw new FunctionError("No comment provided!", 101);
    }
});
```

</>
<>

```java
@EngineHook(className = "Review", type = EngineHookType.beforeSave)
public static LCObject reviewBeforeSaveHook(LCObject review) throws Exception {
  if (StringUtil.isEmpty(review.getString("comment"))) {
    throw new Exception("No comment provided!");
  } else if (review.getString("comment").length() > 140) {
    review.put("comment", review.getString("comment").substring(0, 140) + "…");
  }
  return review;
}
```

</>
<>

```cs
[LCEngineClassHook("Review", LCEngineObjectHookType.BeforeSave)]
public static LCObject ReviewBeforeSave(LCObject review) {
    if (string.IsNullOrEmpty(review["comment"])) {
        throw new Exception("No comment provided!");
    }
    string comment = review["comment"] as string;
    if (comment.Length > 140) {
        review["comment"] = string.Format($"{comment.Substring(0, 140)}...");
    }
    return review;
}
```

</>
<>

```go
leancloud.BeforeSave("Review", func(req *ClassHookRequest) (interface{}, error) {
  review := new(Review)
  if err := req.Object.Clone(review); err != nil {
    return nil, err
  }

  if len(review.Comment) > 140 {
    review.Comment = review.Comment[:140]
  }

  return review, nil
})
```

</>
</MultiLang>

### AfterSave

在创建新对象后触发指定操作，比如当一条留言创建后再更新一下所属帖子的评论总数：

<MultiLang kind="engine">

```js
AV.Cloud.afterSave('Comment', function (request) {
  var query = new AV.Query('Post');
  return query.get(request.object.get('post').id).then(function (post) {
    post.increment('comments');
    return post.save();
  });
});
```
```python
import leancloud

@engine.after_save('Comment') # Comment 为需要 hook 的 class 的名称
def after_comment_save(comment):
    post = leancloud.Query('Post').get(comment.id)
    post.increment('commentCount')
    try:
        post.save()
    except leancloud.LeanCloudError:
        raise leancloud.LeanEngineError(message='An error occurred while trying to save the post.')
```
```php
Cloud::afterSave("Comment", function($comment, $user) {
    $query = new Query("Post");
    $post = $query->get($comment->get("post")->getObjectId());
    $post->increment("commentCount");
    try {
        $post->save();
    } catch (CloudException $ex) {
        throw new FunctionError("An error occurred while trying to save the post: " . $ex->getMessage());
    }
});
```
```java
@EngineHook(className = "Review", type = EngineHookType.afterSave)
public static void reviewAfterSaveHook(LCObject review) throws Exception {
  LCObject post = review.getLCObject("post");
  post.fetch();
  post.increment("comments");
  post.save();
}
```
```cs
[LCEngineClassHook("Review", LCEngineObjectHookType.AfterSave)]
public static async Task ReviewAfterSave(LCObject review) {
    LCObject post = review["post"] as LCObject;
    await post.Fetch();
    post.Increment("comments", 1);
    await post.Save();
}
```
```go
leancloud.AfterSave("Review", func(req *ClassHookRequest) error {
  review := new(Review)
  if err := req.Object.Clone(review); err != nil {
    return err
  }
  
  if err := client.Object(review.Post).Update(map[string]interface{}{
    "comment": leancloud.OpIncrement(1),
  }); err != nil {
    return leancloud.CloudError{Code: 500, Message: err.Error()}
  }

  return nil
})
```

</MultiLang>

再如，在用户注册成功之后，给用户增加一个新的属性 `from` 并保存：

<MultiLang kind="engine">
<>

```js
AV.Cloud.afterSave('_User', function (request) {
  console.log(request.object);
  request.object.set('from', 'LeanCloud');
  return request.object.save().then(function (user) {
    console.log('Success!');
  });
});
```

虽然对于 `after` 类的 Hook 我们并不关心返回值，但我们仍建议你返回一个 Promise，这样如果发生了非预期的错误，会自动在标准输出中打印异常信息和调用栈。

</>
<>

```python
@engine.after_save('_User')
def after_user_save(user):
    print user
    user.set('from', 'LeanCloud')
    try:
        user.save()
    except LeanCloudError, e:
        print 'Error: ', e
```

</>
<>

```php
Cloud::afterSave("_User", function($userObj, $currentUser) {
    $userObj->set("from", "LeanCloud");
    try {
        $userObj->save();
    } catch (CloudException $ex) {
        throw new FunctionError("An error occurred while trying to save the user: " . $ex->getMessage());
    }
});
```

</>
<>

```java
@EngineHook(className = "_User", type = EngineHookType.afterSave)
public static void userAfterSaveHook(LCUser user) throws Exception {
  user.put("from", "LeanCloud");
  user.save();
}
```

</>
<>

```cs
[LCEngineClassHook("_User", LCEngineObjectHookType.AfterSave)]
public static async Task UserAfterSave(LCObject user) {
    user["from"] = "LeanCloud";
    await user.Save();
}
```

</>
<>

```go
leancloud.AfterSave("_User", func(req *ClassHookRequest) error{
  if req.User != nil {
    if err := client.User(req.User).Set("from", "LeanCloud"); err != nil {
      return err
    }
  }
  return nil
})
```

</>
</MultiLang>

### BeforeUpdate

在更新已存在的对象前执行操作，这时你可以知道哪些字段已被修改，还可以在特定情况下拒绝本次修改：

<MultiLang kind="engine">

```js
AV.Cloud.beforeUpdate('Review', function (request) {
  // 如果 comment 字段被修改了，检查该字段的长度
  if (request.object.updatedKeys.indexOf('comment') != -1) {
    if (request.object.get('comment').length > 140) {
      // 拒绝过长的修改
      throw new AV.Cloud.Error('comment 长度不得超过 140 字符。');
    }
  }
});
```
```python
@engine.before_update('Review')
def before_hook_object_update(obj):
    # 如果 comment 字段被修改了，检查该字段的长度
    if 'comment' in obj.updated_keys and len(obj.get('comment')) > 140:
        # 拒绝过长的修改
        raise leancloud.LeanEngineError(message='comment 长度不得超过 140 字符。')
```
```php
Cloud::beforeUpdate("Review", function($review, $user) {
    // 如果 comment 字段被修改了，检查该字段的长度
    if (in_array("comment", $review->updatedKeys) &&
        strlen($review->get("comment")) > 140) {
        throw new FunctionError("comment 长度不得超过 140 字符。");
    }
});
```
```java
@EngineHook(className = "Review", type = EngineHookType.beforeUpdate)
public static LCObject reviewBeforeUpdateHook(LCObject review) throws Exception {
  List<String> updateKeys = EngineRequestContext.getUpdateKeys();
  for (String key : updateKeys) {
    // 如果 comment 字段被修改了，检查该字段的长度
    if ("comment".equals(key) && review.getString("comment").length()>140) {
      throw new Exception("comment 长度不得超过 140 字符。");
    }
  }
  return review;
}
```
```cs
[LCEngineClassHook("Review", LCEngineObjectHookType.BeforeUpdate)]
public static LCObject ReviewBeforeUpdate(LCObject review) {
    ReadOnlyCollection<string> updatedKeys = review.GetUpdatedKeys();
    if (updatedKeys.Contains("comment")) {
        string comment = review["comment"] as string;
        if (comment.Length > 140) {
            throw new Exception("comment 长度不得超过 140 字符。");
        }
    }
    return review;
}
```
```go
leancloud.BeforeUpdate("Review", func(req *ClassHookRequest) (interface{}, error) {
  updatedKeys = req.UpdatedKeys()
  for _, v := range updatedKeys {
    if v == "comment" {
      comment, ok := req.Object.Raw()["comment"].(string)
      if !ok {
        return nil, leancloud.CloudError{Code: 400, Message: "Bad Request"}
      }

      if len(comment) > 140 {
        return nil, leancloud.CloudError{Code: 400, Message: "Bad Request"}
      }
    }
  }
  
  return nil, nil
})
```

</MultiLang>

对传入对象直接进行的修改不会被保存。如需拒绝修改，可以让函数返回一个错误。

传入的对象是一个尚未保存到数据库的临时对象，并不保证与最终储存到数据库的对象完全相同，这是因为修改中可能包含自增、数组增改、关系增改等原子操作。

### AfterUpdate


本 Hook 使用不当可能会造成死循环，导致数据存储 API 的调用次数暴涨，甚至产生更多的费用。因此请仔细阅读 [防止死循环调用](#防止死循环调用) 部分，做出必要的调整和预防措施。


在更新已存在的对象后执行特定的动作。和 BeforeUpdate 一样，你可以知道哪些字段已被修改。

<MultiLang kind="engine">

```js
AV.Cloud.afterUpdate('Review', function(request) {
  if (request.object.updatedKeys.indexOf('comment') != -1) {
    if (request.object.get('comment').length < 5) {
      console.log(review.ObjectId + " 看起来像灌水评论：" + comment)
    }
  }
});
```
```python
@engine.after_update('Review')
def after_review_update(article):
    if 'comment' in obj.updated_keys and len(obj.get('comment')) < 5:
        print(review.ObjectId + " 看起来像灌水评论：" + comment)
```
```php
Cloud::afterUpdate("Review", function($review, $user) {
    if (in_array("comment", $review->updatedKeys) &&
        strlen($review->get("comment")) < 5) {
        error_log(review.ObjectId . " 看起来像灌水评论：" . comment);
    }
});
```
```java
@EngineHook(className = "Review", type = EngineHookType.afterUpdate)
public static void reviewAfterUpdateHook(LCObject review) throws Exception {
  List<String> updateKeys = EngineRequestContext.getUpdateKeys();
  for (String key : updateKeys) {
    if ("comment".equals(key) && review.getString("comment").length()<5) {
      LOGGER.d(review.ObjectId + " 看起来像灌水评论：" + comment);
    }
  }
}
```
```cs
[LCEngineClassHook("Review", LCEngineObjectHookType.AfterUpdate)]
public static void ReviewAfterUpdate(LCObject review) {
    ReadOnlyCollection<string> updatedKeys = review.GetUpdatedKeys();
    if (updatedKeys.Contains("comment")) {
        string comment = review["comment"] as string;
        if (comment.Length < 5) {
            Console.WriteLine($"{review.ObjectId} 看起来像灌水评论：{comment}");
        }
    }
}
```
```go
leancloud.AfterUpdate("Review", func(req *ClassHookRequest) error {
  updatedKeys := req.UpdatedKeys()
  for _, v := range updatedKeys {
    if v == "comment" {
      comment, ok := req.Object.Raw()["comment"].(string)
      if !ok {
        return nil, leancloud.CloudError{Code: 400, Message: "Bad Request"}
      }

      if len(comment) < 5 {
        fmt.Println(req.Object.ID, " 看起来像灌水评论：", comment))
      }
    }
  }

  return nil
})
```

</MultiLang>

#### 防止死循环调用

你也许会好奇为什么可以在 AfterUpdate 中保存 `post` 而不会再次触发该 hook。
这是因为云引擎对所有传入对象做了处理，以阻止死循环调用的产生。

不过请注意，以下情况还需要开发者自行处理：

- 对传入对象进行 `fetch` 操作。
- 重新构造传入的对象。

对于使用上述方式产生的对象，请根据需要自行调用禁用 hook 的接口：

<MultiLang kind="engine">

```js
// 直接修改并保存对象不会再次触发 afterUpdate Hook 函数
request.object.set('foo', 'bar');
request.object.save().then(function (obj) {
  // 你的业务逻辑
});

// 如果有 fetch 操作，则需要在新获得的对象上调用 disableAfterHook 来确保不会再次触发 Hook 函数
request.object.fetch().then(function (obj) {
  obj.disableAfterHook();
  obj.set('foo', 'bar');
  return obj.save();
}).then(function (obj) {
  // 你的业务逻辑
});

// 如果是其他方式构建对象，则需要在新构建的对象上调用 disableAfterHook 来确保不会再次触发 Hook 函数
var obj = AV.Object.createWithoutData('Post', request.object.id);
obj.disableAfterHook();
obj.set('foo', 'bar');
obj.save().then(function (obj) {
  // 你的业务逻辑
});
```
```python
@engine.after_update('Post')
def after_post_update(post):
    # 直接修改并保存对象不会再次触发 after_update Hook 函数
    post.set('foo', 'bar')
    post.save()

    # 如果有 fetch 操作，则需要在新获得的对象上调用 disable_after_hook 来确保不会再次触发 Hook 函数
    post.fetch()
    post.disable_after_hook()
    post.set('foo', 'bar')

    # 如果是其他方式构建对象，则需要在新构建的对象上调用 disable_after_hook 来确保不会再次触发 Hook 函数
    post = leancloud.Object.extend('Post').create_without_data(post.id)
    post.disable_after_hook()
    post.save()
```
```php
Cloud::afterUpdate("Post", function($post, $user) {
    // 直接修改并保存对象不会再次触发 afterUpdate Hook 函数
    $post->set('foo', 'bar');
    $post->save();

    // 如果有 fetch 操作，则需要在新获得的对象上调用 disableAfterHook 来确保不会再次触发 Hook 函数
    $post->fetch();
    $post->disableAfterHook();
    $post->set('foo', 'bar');
    $post->save();

    // 如果是其他方式构建对象，则需要在新构建的对象上调用 disableAfterHook 来确保不会再次触发 Hook 函数
    $post = LeanObject::create("Post", $post->getObjectId());
    $post->disableAfterHook();
    $post->save();
});
```
```java
@EngineHook(className="Post", type = EngineHookType.afterUpdate)
public static void afterUpdatePost(LCObject post) throws LCException {
  // 直接修改并保存对象不会再次触发 afterUpdate Hook 函数
  post.put("foo", "bar");
  post.save();

  // 如果有 fetch 操作，则需要在新获得的对象上调用 disableAfterHook 来确保不会再次触发 Hook 函数
  post.fetch();
  post.disableAfterHook();
  post.put("foo", "bar");

  // 如果是其他方式构建对象，则需要在新构建的对象上调用 disableAfterHook 来确保不会再次触发 Hook 函数
  post = LCObject.createWithoutData("Post", post.getObjectId());
  post.disableAfterHook();
  post.save();
}
```
```cs
// 直接修改并保存对象不会再次触发 afterUpdate Hook 函数
post["foo"] = "bar";
await post.Save();

// 如果有 fetch 操作，则需要在新获得的对象上调用 DisableAfterHook 来确保不会再次触发 Hook 函数
await post.Fetch();
post.DisableAfterHook();
post["foo"] = "bar";

// 如果是其他方式构建对象，则需要在新构建的对象上调用 DisableAfterHook 来确保不会再次触发 Hook 函数
post = LCObject.CreateWithoutData("Post", post.ObjectId);
post.DisableAfterHook();
await post.Save();
```
```go
// Go SDK 目前尚未提供 DisableAfterHook 接口。 
```

</MultiLang>

### BeforeDelete

在删除一个对象之前做一些检查工作，比如在删除一个相册 `Album` 前，先检查一下该相册中还有没有照片 `Photo`：

<MultiLang kind="engine">

```js
AV.Cloud.beforeDelete('Album', function (request) {
  // 查询 Photo 中还有没有属于这个相册的照片
  var query = new AV.Query('Photo');
  var album = AV.Object.createWithoutData('Album', request.object.id);
  query.equalTo('album', album);
  return query.count().then(function (count) {
    if (count > 0) {
      // delete 操作会被丢弃
      throw new AV.Cloud.Error('Cannot delete an album if it still has photos in it.');
    }
  }, function (error) {
    throw new AV.Cloud.Error('Error ' + error.code + ' occurred when finding photos: ' + error.message);
  });
});
```
```python
import leancloud

@engine.before_delete('Album') # Album 为需要 hook 的 class 的名称
def before_album_delete(album):
    query = leancloud.Query('Photo')
    query.equal_to('album', album)
    try:
        matched_count = query.count()
    except leancloud.LeanCloudError:
        raise engine.LeanEngineError(message='An error occurred with LeanEngine.')
    if count > 0:
        # delete 操作会被丢弃
        raise engine.LeanEngineError(message='Cannot delete an album if it still has photos in it.')
```
```php
Cloud::beforeDelete("Album", function($album, $user) {
    $query = new Query("Photo");
    $query->equalTo("album", $album);
    try {
        $count = $query->count();
    } catch (CloudException $ex) {
        throw new FunctionError("An error occurred when getting photo count: {$ex->getMessage()}");
    }
    if ($count > 0) {
        // delete 操作会被丢弃
        throw new FunctionError("Cannot delete an album if it still has photos in it.");
    }
});
```
```java
@EngineHook(className = "Album", type = EngineHookType.beforeDelete)
public static LCObject albumBeforeDeleteHook(LCObject album) throws Exception {
  LCQuery query = new LCQuery("Photo");
  query.whereEqualTo("album", album);
  int count = query.count();
  if (count > 0) {
    // delete 操作会被丢弃
    throw new Exception("Cannot delete an album if it still has photos in it.");
  } else {
    return album;
  }
}
```
```cs
[LCEngineClassHook("Album", LCEngineObjectHookType.BeforeDelete)]
public static async Task<LCObject> AlbumBeforeDelete(LCObject album) {
    LCQuery<LCObject> query = new LCQuery<LCObject>("Photo");
    query.WhereEqualTo("album", album);
    int count = await query.Count();
    if (count > 0) {
        throw new Exception("Cannot delete an album if it still has photos in it.");
    }
    return album;
}
```
```go
leancloud.BeforeDelete("Album", func(req *ClassHookRequest) (interface{}, error) {
  photo := new(Photo)
  if err := req.Object.Clone(photo); err != nil {
    return nil, err
  }

  count, err := client.Class("Photo").NewQuery().EqualTo("album", photo.Album).Count()
  if err != nil {
    return nil, err
  }

  if count > 0 {
    return nil, leancloud.CloudError{Code: 500, Message: "Cannot delete an album if it still has photos in it."}
  }

  fmt.Println("Deleted.")

  return nil, nil
})  
```

</MultiLang>

### AfterDelete

在一个对象后被删执行操作，例如递减计数、删除关联对象等等。同样以相册为例，这次我们不在删除相册前检查是否还有照片，而是在删除后，同时删除相册中的照片：

<MultiLang kind="engine">

```js
AV.Cloud.afterDelete('Album', function (request) {
  var query = new AV.Query('Photo');
  var album = AV.Object.createWithoutData('Album', request.object.id);
  query.equalTo('album', album);
  return query.find().then(function (posts) {
    return AV.Object.destroyAll(posts);
  }).catch(function (error) {
    console.error('Error ' + error.code + ' occurred when finding photos: ' + error.message);
  });
});
```
```python
import leancloud

@engine.after_delete('Album') # Album 为需要 hook 的 class 的名称
def after_album_delete(album):
    query = leancloud.Query('Photo')
    query.equal_to('album', album)
    try:
        query.destroy_all()
    except leancloud.LeanCloudError:
        raise leancloud.LeanEngineError(message='An error occurred with LeanEngine.')
```
```php
Cloud::afterDelete("Album", function($album, $user) {
    $query = new Query("Photo");
    $query->equalTo("album", $album);
    try {
        $photos = $query->find();
        LeanObject::destroyAll($photos);
    } catch (CloudException $ex) {
        throw new FunctionError("An error occurred when getting photo count: {$ex->getMessage()}");
    }
});
```
```java
@EngineHook(className = "Album", type = EngineHookType.afterDelete)
public static void albumAfterDeleteHook(LCObject album) throws Exception {
  LCQuery query = new LCQuery("Photo");
  query.whereEqualTo("album", album);
  List<LCObject> result = query.find();
  if (result != null && !result.isEmpty()) {
    LCObject.deleteAll(result);
  }
}
```
```cs
[LCEngineClassHook("Album", LCEngineObjectHookType.AfterDelete)]
public static async Task AlbumAfterDelete(LCObject album) {
    LCQuery<LCObject> query = new LCQuery<LCObject>("Photo");
    query.WhereEqualTo("album", album);
    ReadOnlyCollection<LCObject> result = await query.Find();
    if (result != null && result.Count > 0) {
        await LCObject.DeleteAll(result);
    }
}
```
```go
leancloud.AfterDelete("Album", func(req *ClassHookRequest) error {
  photo := new(Photo)
  if err := req.Object.Clone(photo); err != nil {
    return nil, err
  }

  count, err := client.Class("Photo").NewQuery().EqualTo("album", photo.Album).Count()
  if err != nil {
    return nil, err
  }

  if count > 0 {
    return nil, leancloud.CloudError{Code: 500, Message: "An error occurred with LeanEngine."}
  }

  fmt.Println("Deleted.")
  
  return nil, nil
})  
})
```

</MultiLang>

### OnVerified

当用户通过邮箱或者短信验证时，对该用户执行特定操作。比如：

<MultiLang kind="engine">
<>

```js
AV.Cloud.onVerified('sms', function (request) {
  console.log('User ' + request.object + ' is verified by SMS.');
});
```

上面的代码示例中的 `object` 换成 `currentUser` 也可以。因为这里被操作的对象正好是发起操作的用户。
下面的 `onLogin` 函数同理。

</>
<>

```python
@engine.on_verified('sms')
def on_sms_verified(user):
    print user
```

</>
<>

```php
Cloud::onVerifed("sms", function($user, $meta) {
    error_log("User {$user->getUsername()} is verified by SMS.");
});
```

</>
<>

```java
@EngineHook(className = "_User", type = EngineHookType.onVerifiedSMS)
public static void userOnVerifiedHook(LCUser user) throws Exception {
  LOGGER.d("用户 " + user.getObjectId() + " 已通过短信验证。");
}

@EngineHook(className = "_User", type = EngineHookType.onVerifiedEmail)
public static void userOnVerifiedHook(LCUser user) throws Exception {
  LOGGER.d("用户 " + user.getObjectId() + " 已通过邮箱验证。");
}
```

</>

<>

```cs
[LCEngineUserHook(LCEngineUserHookType.OnSMSVerified)]
public static void OnVerifiedSMS(LCUser user) {
    Console.WriteLine($"用户 {user.ObjectId} 已通过短信验证。");
}

[LCEngineUserHook(LCEngineUserHookType.OnEmailVerified)]
public static void OnVerifiedEmail(LCUser user) {
    Console.WriteLine($"用户 {user.ObjectId} 已通过邮箱验证。");
}
```

</>

<>

```go
leancloud.OnVerified("sms", func(req *ClassHookRequest) error {
  fmt.Println("用户 ", req.User.ID, " 已通过短信验证。")
})

leancloud.OnVerified("email", func(req *ClassHookRequest) error {
  fmt.Println("用户 ", req.User.ID, " 已通过邮箱验证。")
})
```

</>
</MultiLang>

数据库中相关的验证字段，如 `emailVerified` 不需要修改，系统会自动更新。

该 hook 属于 after 类 hook.

### OnLogin

在用户登录之时执行指定操作，比如禁止在黑名单上的用户登录：

<MultiLang kind="engine">

```js
AV.Cloud.onLogin(function (request) {
  // 因为此时用户还没有登录，所以用户信息是保存在 request.object 对象中
  console.log('User ' + request.object + ' is trying to log in.');
  if (request.object.get('username') === 'noLogin') {
    // 如果是 error 回调，则用户无法登录（收到 401 响应）
    throw new AV.Cloud.Error('Forbidden');
  }
});
```
```python
@engine.on_login
def on_login(user):
    print user
    if user.get('username') == 'noLogin':
      # 如果抛出 LeanEngineError，则用户无法登录（收到 401 响应）
      raise LeanEngineError('Forbidden')
    # 没有抛出异常，函数正常执行完毕的话，用户可以登录
```
```php
Cloud::onLogin(function($user) {
    error_log("User {$user->getUsername()} is trying to log in.");
    if ($user->get("blocked")) {
        // 如果抛出异常，则用户无法登录（收到 401 响应）
        throw new FunctionError("Forbidden");
    }
    // 没有抛出异常，函数正常执行完毕的话，用户可以登录
});
```
```java
@EngineHook(className = "_User", type = EngineHookType.onLogin)
public static LCUser userOnLoginHook(LCUser user) throws Exception {
  if ("noLogin".equals(user.getUsername())) {
    throw new Exception("Forbidden");
  } else {
    return user;
  }
}
```
```cs
[LCEngineUserHook(LCEngineUserHookType.OnLogin)]
public static LCUser OnLogin(LCUser user) {
    if (user.Username == "noLogin") {
        throw new Exception("Forbidden");
    }
    return user;
}
```
```go
leancloud.OnLogin(func(req *ClassHookRequest) error {
  fmt.Println("用户 ", req.User.ID, " 已登录。")
})
```

</MultiLang>

该 hook 属于 before 类 hook.

### 即时通讯 Hook 函数

参见[即时通讯指南第四篇](/sdk/im/guide/systemconv/)的《万能的 Hook 机制》章节。

### Hook 函数错误响应码

为 `BeforeSave` 这类的 hook 函数定义错误码，需要这样：

<MultiLang kind="engine">

```js
AV.Cloud.beforeSave('Review', function (request) {
  // 使用 JSON.stringify() 将 object 变为字符串
  throw new AV.Cloud.Error(JSON.stringify({
    code: 123,
    message: 'An error occurred.'
  }));
});
```
```python
@engine.before_save('Review') # Review 为需要 hook 的 class 的名称
def before_review_save(review):
    comment = review.get('comment')
    if not comment:
      raise leancloud.LeanEngineError(
        code=123,
        message='An error occurred.'
      )
```
```php
Cloud::beforeSave("Review", function($review, $user) {
   $comment = $review->get("comment");
   if (!$comment) {
       throw new FunctionError(json_encode(array(
           "code" => 123,
           "message" => "An error occurred.",
       )));
   }
});
```
```java
@EngineHook(className = "Review", type = EngineHookType.beforeSave)
public static LCObject reviewBeforeSaveHook(LCObject review) throws Exception {
  throw new LCException(123, "An error occurred.");
}
```
```cs
[LCEngineClassHook("Review", LCEngineObjectHookType.BeforeDelete)]
public static void ReviewBeforeDelete(LCObject review) {
    throw new LCException(123, "An error occurred.");
}
```
```go
leancloud.BeforeSave("Review", func(req *ClassHookRequest) (interface{}, error) {
  return nil, leancloud.CloudError{Code: 123, Message: "An error occurred."}
})
```

</MultiLang>

客户端收到的响应为 `Cloud Code validation failed. Error detail: { "code": 123, "message": "An error occurred." }`。可通过 **截取字符串** 的方式取出错误信息，再转换成需要的对象。

### Hook 函数超时

Before 类 Hook 函数的超时时间为 10 秒，其他类 Hook 函数的超时时间为 3 秒。如果 Hook 函数被其他的云函数调用（比如因为保存对象而触发 `BeforeSave` 和 `AeforeSave`），那么它们的超时时间会进一步被其他云函数调用的剩余时间限制。

例如，如果一个 `BeforeSave` 函数是被一个已经运行了 13 秒的云函数触发，那么它就只剩下 2 秒的时间来运行。同时请参考 [云函数超时及处理方案](#云函数超时)。


## 在线编写云函数

很多人使用云引擎是为了在服务端提供一些个性化的方法供各终端调用，而不希望关心诸如代码托管、npm 依赖管理等问题。为此我们提供了在线维护云函数的功能。使用此功能需要注意：

- 在线定义的函数会覆盖你之前用 Git 或命令行部署的项目。
- 目前只能在线编写云函数和 Hook，不支持托管静态网页、编写动态路由。
- 只能使用 JavaScript SDK 和一些内置的 Node.js 模块（详见下节表格），无法引入其他模块作为依赖。

在 **云服务控制台 > 云引擎 > 云引擎分组 > 部署 > 在线编辑** 标签页，可以：

- **创建函数**：指定函数类型、函数名称、函数体的具体代码、注释等信息，点击「保存」即可创建一个云函数。
- **部署**：选择要部署的环境，点击「部署」即可看到部署过程和结果。
- **预览**：会将所有函数汇总并生成一个完整的代码段，可以确认代码，或者将其保存为 `cloud.js` 覆盖项目模板的同名文件，即可快速的转换为使用项目部署。
- **维护云函数**：可以编辑已有云函数，查看保存历史，以及删除云函数。

云函数编辑之后需要点击 **部署** 才能生效。

### 在线编写的 SDK 版本

目前在线编辑仅支持 Node.js，提供了 4 种 SDK 版本：

在线编辑版本 |Node.js SDK|JS SDK|Node.js| 备注 | 可用依赖
---|---|---|---|---|---
v0|0.x|0.x|0.12| 已不推荐使用 |moment, request, underscore
v1|1.x|1.x|4||async, bluebird, co, ejs, handlebars, joi, lodash, marked, moment, q, request, superagent, underscore
v2|2.x|2.x|6| 需要使用 Promise 写法 |async, bluebird, crypto, debug, ejs, jade, lodash, moment, nodemailer, qiniu, redis, request, request-promise, superagent, underscore, uuid, wechat-api, xml2js
v3|3.x|3.x|8| 需要使用 Promise 写法 |async, bluebird, crypto, debug, ejs, jade, lodash, moment, nodemailer, qiniu, redis, request, request-promise, superagent, underscore, uuid, wechat-api, xml2js

**从 v0 升级到 v1：**

- JS SDK 升级到了 [1.0](https://github.com/leancloud/javascript-sdk/releases/tag/v1.0.0)。
- 需要从 `request.currentUser` 获取用户，而不是 `AV.User.current`。
- 在调用 `AV.Cloud.run` 时需要手动传递 user 对象。

**从 v1 升级到 v2：**

- JS SDK 升级到 [2.0](https://github.com/leancloud/javascript-sdk/releases/tag/v2.0.0)（必须使用 Promise，不再支持 callback 风格）。
- 删除了 `AV.Cloud.httpRequest`。
- 在云函数中 **必须** 返回 Promise 作为云函数的值，抛出 `AV.Cloud.Error` 来表示错误。

**从 v2 升级到 v3：**

- JS SDK 升级到了 [3.0](https://github.com/leancloud/javascript-sdk/releases/tag/v3.0.0)（`AV.Object.toJSON` 的行为变化等）。

## 查看和运行云函数

**云服务控制台 > 云引擎 > 云函数**页面以表格的形式展示了应用所属各分组上定义的云函数（包括 Hook）的基本信息，包括云函数名称、所属分组、QPM（每分钟请求数）。
在云函数表格中，点击**运行**按钮可以通过控制台调用云函数。
通过左上角的控制按钮则可以刷新页面、切换预备环境和生产环境。

## 定时任务

定时任务可以按照设定，以一定间隔自动完成指定动作，比如半夜清理过期数据，每周一向所有用户发送推送消息等等。定时任务的最小时间单位是 **秒**，正常情况下时间误差都可以控制在秒级别。

定时任务是普通的云函数，也会遇到 [超时问题](#云函数超时)，具体请参考 [超时处理方案](#超时的处理方案)。

一个定时任务如果在 24 小时内收到了超过 30 次的 `400`（Bad Request）或 `502`（Bad Gateway）的应答，它将会被云引擎禁用，同时系统会向开发者发出相关的禁用通知邮件。在控制台的日志中，对应的错误信息为 `timerAction short-circuited and no fallback available`。

部署云引擎之后，进入 **云服务控制台 > 云引擎 > 定时任务**，点击 **创建定时任务**，然后设定执行的函数名称、执行环境等等。例如定义一个打印循环打印日志的任务 `logTimer`：

<MultiLang kind="engine">

```js
AV.Cloud.define('logTimer', function (request) {
  console.log('This log is printed by logTimer.');
});
```
```python
@engine.define
def logTimer(movie, **params):
    print('This log is printed by logTimer.')
```
```php
Cloud::define("logTimer", function($params, $user) {
    error_log("This log is printed by logTimer.");
});
```
```java
@EngineFunction("logTimer")
public static float logTimer throws Exception {
  LogUtil.avlog.d("This log is printed by logTimer.");
}
```
```cs
[LCEngineFunction("logTimer")]
public static void LogTimer() {
    Console.WriteLine("This log is printed by logTimer.");
}
```
```go
leancloud.Define("logTimer", func(req *FunctionRequest) (interface{}, error) {
  fmt.Println("This log is printed by logTimer.")
  return nil, nil
})
```

</MultiLang>

定时任务分为两类：

- 使用 Cron 表达式安排调度
- 以分钟为单位的简单循环调度

以 Cron 表达式为例，比如每周一早上 8 点打印日志（运行之前定义的 `logTimer` 函数），创建定时任务的时候，选择 **Cron 表达式** 并填入 `0 0 8 ? * MON`。

Cron 表达式的语法可以参考[云队列指南](/sdk/engine/guide/cloudqueue/)的《Cron 表达式》一节。

点击「非必填」会展开更多选项：

- 运行参数：传递给云函数的参数（JSON 对象）。
- 异常策略：任务因云函数超时失败后重试执行还是放弃执行。

定时任务创建后，会显示「最近一次执行时间」和「下次执行时间」。
「最近一次执行时间」除了显示时间外，还会显示执行结果，点击「查看详情」还可以查看细节：

- `status` 任务的状态，包括 `success`（成功）、`failed`（失败）
- `uniqueId` 任务的唯一 ID
- `finishedAt` 执行完成的精确时间（仅限成功任务）
- `statusCode` 云函数响应的 HTTP 状态码（仅限成功任务）
- `result` 来自云函数的响应（仅限成功任务）
- `error` 错误提示（仅限失败任务）
- `retryAt` 下次重试时间（仅限失败任务）

具体的执行日志可以在**云服务控制台 > 云引擎 > 云引擎分组 > 日志** 查看。
例如：

```
CloudQueue 运行失败 24e1b480-aeb5-4222-ab7d-7d4b8ee170b9: hello !! {"error":"Error: ESOCKETTIMEDOUT"}
```

如果希望暂停定时任务（比如遇到报错需要排查），可以点击状态栏的「暂停」按钮。
相应地，点击「启用」按钮可以重新启用暂停的任务。
点击操作栏的「编辑」、「删除」按钮则可以修改、删除定时任务。

## Master Key 和超级权限

因为云引擎运行在可信的服务器端环境中，所以你可以全局开启超级权限（`Master Key`），这样云端会跳过包括 ACL 和 Class 权限在内的检查，让你自由地操作所有云存储中的数据，当然这种方式也允许调用一些仅供 `Master Key` 使用的 API。开启 `Master Key` 的方法如下：

<MultiLang kind="engine">
<>

```js
// 通常位于 server.js
AV.Cloud.useMasterKey();
```

如果没有添加这些代码，默认是没有超级权限的，这意味着在云引擎中你也不能修改被 ACL 保护的数据，你需要在进行操作时手动指定 `sessionToken`，让操作以这个用户的权限来执行：

```js
const post = new Post();
post.save(
  { author: user },
  // 或者使用 request.sessionToken（网站托管中需启用 `Cloud.CookieSession`）
  // {
  //  sessionToken: user.getSessionToken()
  // }
);
```

或者你也可单独对某一个操作使用 `Master Key`，跳过权限检查：

```js
post.destroy({ useMasterKey: true });
```

当然你也可以在启用了超级权限的情况下使用 `useMasterKey: false` 来对单个操作关掉超级权限。

</>
<>

```python
# 通常位于 wsgi.py
leancloud.use_master_key(True)
```

</>
<>

```php
// 通常位于 src/app.php
Client::useMasterKey(true);
```

</>
<>

```java
// 通常位于 src/…/AppInitListener.java
RequestSignImplementation.setMasterKey(appMasterKey);
```

</>
<>

```cs
// 暂不支持
```

</>
<>

SDK 中每个请求都可以使用 `UseMasterKey()` 为请求带上 `Master Key` 来开启超级权限，只需要作为可选参数传入最后即可，例如 `Create` `Set` `Update` 等操作。

</>
</MultiLang>

那么究竟是否应该使用超级权限呢，我们的建议如下：

- 如果你的云引擎代码中特权操作比较多、操作不属于用户的全局数据比较多，那么建议全局开启 `Master Key`，并自行做好对于用户请求的权限检查。
- 如果你的云引擎代码中的请求通常和单个用户自己的数据相关、需要遵守 ACL，那么建议不开启 `Master Key`，将用户请求的 `sessionToken` 传入数据修改的相关操作。

关于云引擎上的权限问题，还可以参考[《ACL 权限管理开发指南》](https://leancloud.cn/docs/acl-guide.html)和[《在云引擎中使用 ACL》](https://leancloud.cn/docs/acl_guide_leanengine.html)。
