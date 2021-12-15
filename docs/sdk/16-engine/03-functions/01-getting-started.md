---
id: getting-started
title: 快速开始部署云函数和 Hook
sidebar_label: 快速开始
---

import QuickStartInit from '../_partials/quick-start-init.mdx';
import QuickStartDeploy from '../_partials/quick-start-deploy.mdx';
import FunctionsIntroduction from '../_partials/functions-introduction.mdx';
import PlatformRuntimes from '../_partials/platform-runtimes.mdx';
import {CLI_BINARY} from '/src/constants/env.ts';
import EngineRuntimes from '/src/docComponents/MultiLang/engine';
import TabItem from '@theme/TabItem';

<FunctionsIntroduction />

:::info
如果希望使用 Node.js 编写简单的云函数或 Hook，也可以尝试 [在线编写云函数](#在线编写云函数)。
:::

## 创建项目

<QuickStartInit appName='my-functions' />

## 编写云函数

在示例项目中可以看到一个云函数的例子：

<EngineRuntimes>
<TabItem value='nodejs'>

```js title='cloud.js'
AV.Cloud.define('hello', function(request) {
  return 'Hello world!'
})
```

</TabItem>
<TabItem value='python'>

```python title='cloud.py'
@engine.define
def hello(**params):
    if 'name' in params:
        return 'Hello, {}!'.format(params['name'])
    else:
        return 'Hello, LeanCloud!'
```

</TabItem>
<TabItem value='php'>

```php title='src/cloud.php'
Cloud::define("sayHello", function($params, $user) {
    return "hello {$params['name']}";
});
```

</TabItem>
<TabItem value='java'>

```java title='src/main/java/cn/leancloud/demo/todo/Cloud.java'
@EngineFunction("hello")
public static String hello(@EngineFunctionParam("name") String name) {
  if (name == null) {
    return "What is your name?";
  }

  return String.format("Hello %s!", name);
}
```

</TabItem>
<TabItem value='dotnet'>

```cs title='web/HelloSample.cs'
[EngineFunction("Hello")]
public static string Hello([EngineFunctionParameter("text")]string text)
{
    return $"Hello, {text}";
}
```

</TabItem>
<TabItem value='go'>

```go title='functions/hello.go'
func init() {
	leancloud.Engine.Define("hello", hello)
}

func hello(req *leancloud.FunctionRequest) (interface{}, error) {
	return map[string]string{
		"hello": "world",
	}, nil
}
```

</TabItem>
</EngineRuntimes>

Hook 的编写和云函数很类似，在后文中我们会详细介绍云函数和 Hook 的详细用法。

## 本地运行和调试

<p>可以使用 <code>{CLI_BINARY} up</code> 进行本地运行和调试，命令行工具会自动注入关联应用的环境变量，让云函数可以访问到线上数据存储中的数据。</p>

<pre>
<CodeBlock className='sh'>
{`$ ${CLI_BINARY} up
[INFO] The project is running at: http://localhost:3000
[INFO] Cloud function debug console (if available) is accessible at: http://localhost:3001`}
</CodeBlock>
</pre>

<p><code>{CLI_BINARY} up</code> 同时默认在 3001 端口启动了一个用于调试云函数的控制台（<a href='http://localhost:3001'>http://localhost:3001</a>），开发者可以通过这个控制台来调试云函数和 Hook，模拟特定的输入。</p>

![云函数调试控制台](/img/cloud-engine/engine-cli-debug-console.png)

## 部署到云引擎

<QuickStartDeploy noCustomDomain={true} />

## 更多

接下来可以查看 [云函数和 Hook 开发指南](/sdk/engine/functions/guides) 来了解云函数开发的详细信息、查看 [云引擎 SDK 使用指南](/sdk/engine/functions/sdk) 了解 SDK 的进阶用法、查看 [云引擎平台功能](/sdk/engine/deploy/platform) 来了解云引擎提供的更多功能，或查看专门的页面来了解具体运行环境的详情：

<PlatformRuntimes />
