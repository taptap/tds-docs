---
id: webhosting
title: 云引擎网站托管指南
sidebar_label: 网站托管
---

import MultiLang from '@theme/MultiLang';



网站托管是云引擎的一个子模块，允许你用各种程序语言开发 Web 程序，提供云函数和 Hook，还可以提供静态文件的托管和自定义的路由、绑定你自己的域名。
你可以用它为你的移动应用提供一个介绍和下载页、开发一个管理员控制台或完整的网站，或者运行一些必须在服务器端运行的自定义逻辑。

云引擎支持 Node.js、Python、PHP、Java、.NET、Go，你可以选择自己熟悉的技术栈进行开发。

## 从示例项目开始

我们为云引擎支持的各种语言准备了示例项目，建议从示例项目着手开始开发。

要理解如何从示例项目开始开发云引擎项目，本地调试，部署到云端，请先阅读[云引擎快速入门](/v2/sdk/engine/guide/quickstart)。

### 本地运行和调试

在确保所有的依赖都正确安装之后，就可以在项目根目录用我们的命令行工具来启动本地调试了：

```sh
tds up
```

更多有关命令行工具和本地调试的内容请看[云引擎命令行工具使用指南](/v2/sdk/engine/guide/cli)。

### 部署到云端

在你的项目根目录运行：

```sh
tds deploy
```

如果生产环境是标准实例，需要加上 `--prod 1` 参数，指定部署到生产环境：

```sh
tds deploy --prod 1
```

你可以在控制台绑定云引擎域名，绑定域名后，即可通过绑定域名访问你的应用。
例如，假定你在控制台绑定了 `web.example.com` 这个域名，即可通过 `https://web.example.com` 访问你的应用（生产环境）。
注意，DNS 可能需要等待几个小时后才能生效。

### 项目骨架

<MultiLang kind="engine">
<>

以示例项目为例，在根目录我们看到有一个 `package.json` 文件，注意：**所有 Node.js 的项目必须包含 `package.json` 才会正确地被云引擎识别为 Node.js 项目**。

#### `package.json`

Node.js 的 `package.json` 中可以指定 [很多选项](https://docs.npmjs.com/files/package.json)，它通常看起来是这样：

```json
{
    "name": "node-js-getting-started",
    "scripts": {
        "start": "node server.js"
    },
    "engines": {
        "node": "12.x"
    },
    "dependencies": {
        "express": "4.16.4",
        "leanengine": "^3.3.2",
        "leancloud-storage": "^3.11.0"
    }
}
```

其中云引擎会尊重的选项包括：

- `scripts.start` 启动项目时使用的命令；默认为 `node server.js`，如果你希望为 Node.js 附加启动选项（如 `--es_staging`）或使用其他的文件作为入口点，可以修改该选项。
- `scripts.postinstall` 会在项目构建结束时运行一次；可以将构建命令（如 `gulp build`）写在这里。
- `engines.node` 指定所需的 Node.js 版本；出于兼容性考虑默认版本仍为比较旧的 `0.12`，**因此建议大家自行指定一个更高的版本，建议使用 `12.x` 版本进行开发**，你也可以设置为 `*` 表示总是使用最新版本的 Node.js。
- `dependencies` 项目所依赖的包；使用 Node.js 10 以上的版本时，云引擎会在部署时用 `npm ci` 为你安装这里列出的所有依赖。
- `devDependencies` 项目开发时所依赖的包；使用 Node.js 10 以上的版本时，云引擎会安装这里的依赖。

建议你参考我们的 [项目模板](https://github.com/leancloud/node-js-getting-started/blob/master/package.json) 来编写自己的 `package.json`。

我们也对 `package-lock.json` 和 `yarn.lock` 提供了支持。

</>
<>

参照示例项目，你的项目需要遵循一定格式才会被云引擎识别并运行。

使用 WSGI 规范来运行项目，项目根目录下必须有 `wsgi.py` 与 `requirements.txt` 文件，可选文件 `.python-version`、`runtime.txt`。云引擎运行时会首先加载 `wsgi.py` 这个模块，并将此模块的全局变量 `application` 作为 WSGI 函数进行调用。因此请保证 `wsgi.py` 文件中包含一个 `application` 的全局变量／函数／类，并且符合 WSGI 规范。

例如，一个[最简单的基于 Flask 框架的项目][lean-flask]只需两个文件（`requirements.txt` 除外，不考虑本地调试功能）：

```python
# app.py

from flask import Flask
app = Flask(__name__)
@app.route('/')
def index():
    return "hi"

# wsgi.py
from app import app
application = app
```

[lean-flask]: https://github.com/leancloud/lean-flask

更多关于 **WSGI 函数** 的内容，请参考 [PEP333](https://www.python.org/dev/peps/pep-0333/)。

兼容 Python WSGI 规范的框架都可以在云引擎运行。目前比较流行的 Python Web 框架对此都有支持，比如 [Flask](http://flask.pocoo.org)、[Django](https://www.djangoproject.com)、[Tornado](http://www.tornadoweb.org)。我们提供了 Flask 和 Django 两个框架的示例项目作为参考，你也可以直接把它们当作一个应用项目的初始化模版：

- [Flask](https://github.com/leancloud/python-getting-started)
- [Django](https://github.com/leancloud/django-getting-started)

#### 添加第三方依赖模块

`requirements.txt` 中填写项目依赖的第三方模块，每行一个，如：

```
# 井号至行尾为注释
leancloud>=2.9.1,<3.0.0
Flask>=1.0.0                                       # 可以指定版本号／范围
git+https://github.com/foo/bar.git@master#egg=bar  # 可以使用 Git/SVN 等版本管理工具的远程地址
```

详细格式请参考 [pip 19.0.1 Documentation > User Guide > Requirements Files](https://pip.pypa.io/en/stable/user_guide/#requirements-files)。

应用部署到云引擎之后，会自动按照 `requirements.txt` 中的内容进行依赖安装。在本地运行和调试项目的时候，可以在项目目录下使用如下命令安装依赖：

```sh
pip install -r requirements.txt
```

另外当你部署应用的时候，建议将依赖的包的版本都按照 `foo==1.0.0` 这种格式来明确指定版本号（或版本的范围），防止因为依赖的模块升级且不再兼容老的 API 时，再次部署会导致应用运行失败。

#### 指定 Python 版本

你可以选择运行代码的 Python 版本，选择方法与 [`pyenv`](https://github.com/pyenv/pyenv) 相同，即在项目根目录的 `.python-version` 中写入需要的 Python 版本即可，比如 `3.6.1`。这样将代码部署到云引擎之后，系统会自动选择对应的 Python 版本。

如果在本地开发时已使用了 `pyenv`，`pyenv` 也会根据此文件来自动使用对应的 Python 运行项目。我们建议本地开发使用 `pyenv`，以保证本地环境与线上相同。`pyenv` 的安装方法请参考 [`pyenv` 的 GitHub 仓库](https://github.com/pyenv/pyenv)。

</>
<>

你的项目需要遵循一定格式才会被云引擎识别并运行。

LeanEngine PHP 项目必须有 `$PROJECT_DIR/public/index.php` 文件，该文件为整个项目的启动文件。

云引擎默认提供 PHP 5.6 的运行环境，如需指定 PHP 版本，请在 `composer.json` 中添加：

```json
"require": {
  "php": "7.4.x"
}
```

LeanEngine PHP 不依赖第三方框架，你可以使用你最熟悉的框架进行开发，或者不使用任何框架。但是请保证通过执行 `public/index.php` 能够启动你的项目。

在项目中存在 `composer.lock` 文件时，云引擎会优先根据 composer.lock 安装依赖。

</>
<>

云引擎目前支持 Java 8、11、12、13、14 运行环境和 war 包运行，你的项目需要遵循一定格式才会被云引擎识别并运行。

云引擎 Java 运行环境使用 Maven 进行构建，所以 LeanEngine Java 项目必须有 `$PROJECT_DIR/pom.xml` 文件，该文件为整个项目的配置文件。构建完成后云引擎会尝试到 `$PROJECT_DIR/target` 目录下寻找可以使用的包：

- WAR：如果项目打包成 WAR 文件，则云引擎会将其放入 Servlet 容器（当前是 Jetty 9.x）来运行。
- JAR：如果项目打包成 JAR 文件，则云引擎会通过 `java -jar <packageName>.jar` 来运行。

我们建议使用示例项目做为起步，因为一些细节的开发环境的配置会让开发调试方便很多：

- [`java-war-getting-started`](https://github.com/leancloud/java-war-getting-started)：使用 Servlet，集成 LeanEngine Java SDK 的一个简单项目，打包成 WAR 文件。
- [`spring-boot-getting-started`](https://github.com/leancloud/spring-boot-getting-started)：使用 [Spring Boot](https://projects.spring.io/spring-boot/) 作为项目框架，集成 LeanEngine Java SDK 的一个简单的项目，打包成 JAR 文件。

Java 运行环境对内存的使用较多，所以建议：

- 以 [示例项目](https://github.com/leancloud/java-war-getting-started) 起步的应用，建议使用 512 MB 或以上规格的实例。
- 使用 [Spring Boot](https://projects.spring.io/spring-boot/) 的应用，建议使用 1 GB 或以上规格的实例。
- 本地启动并模拟完成主要业务流程操作，待应用充分初始化后，根据 Java 进程内存占用量选择相应的实例规格，需要注意保留一定的余量用以应对请求高峰。

如果云引擎实例规格**选择不当**，可能造成应用启动时因为内存溢出（OOM）导致部署失败，或运行期内存溢出导致应用频繁重启。 

Java 云引擎默认使用 Java 11 运行环境，如果希望使用其他版本的 Java，可以在项目根目录创建一个名为 `system.properties` 的文件，指定 `java.runtime.version`：

```
java.runtime.version=14
```

#### 打包成 WAR 文件的项目

首先确认项目 `pom.xml` 中配置了 [Jetty plugin](https://www.eclipse.org/jetty/documentation/9.4.x/jetty-maven-plugin.html)，并且 web server 的端口通过环境变量 `LEANCLOUD_APP_PORT` 获取，具体配置可以参考我们的 [示例代码](https://github.com/leancloud/java-war-getting-started/blob/master/pom.xml)。

然后使用 Maven 安装依赖并打包：

```sh
mvn package
```

然后使用命令行工具本地启动应用：

```sh
tds up
```

更多有关命令行工具和本地调试的内容请参考[云引擎命令行工具使用指南](/v2/sdk/engine/guide/cli)。

除了使用命令行工具本地启动应用外，还可以手动设置相应环境变量后，直接启动应用，详见[云引擎 FAQ](/v2/sdk/engine/guide/faq)。

</>
<>

为了更为简洁的支持 .NET Core 的 Web 项目，云引擎要求您的源代码目录如下：

```
├── app.sln
├── web
|    ├── StartUp.cs
|    ├── Program.cs
|    ├── web.csproj
|    └── wwwroot
|        ├── css
|        ├── lib
|        └── js
└── global.json
```

示例项目 [`dotNET-getting-started`](https://github.com/leancloud/dotNET-getting-started) 是推荐的模板。

其中根目录必须拥有一个 `app.sln` 解决方案文件 和一个 `web/` 文件夹，这是必须的（这一硬性规定会将在未来取消，取消之后开发者自定义自己的项目结构）。

</>
<>

你的 Go 程序需要使用 Go Modules 才能被云引擎识别。

云引擎默认提供 Go 1.14.0 的运行环境。

你可以使用你最熟悉的框架或不使用任何框架来开发 Go 程序，但需要将 Go SDK 中提供的云引擎中间件正确地接入你的程序中。

</>
</MultiLang>

## 使用数据存储服务

在云引擎中你可以使用云服务提供的数据存储作为应用的后端数据库，以及使用其他云服务提供的功能。
SDK 可以让你更加方便地使用这些功能。

建议使用云引擎模板项目。
模板项目已经集成了 SDK，也包含了初始化 SDK 的逻辑，可以直接使用。

建议在客户端（浏览器端、移动端）登录用户，调用 SDK 的接口获取 session token。
对于需要后端以当前用户的身份完成的操作，客户端通过 HTTP Header 等方式将 session token 发送给后端。

参见[数据存储指南](/v2/sdk/storage/guide/dotnet)。

## 健康监测

你的应用在启动时，云引擎的管理程序会每秒去检查你的应用是否启动成功，如果超过启动时间限制仍未启动成功，即认为启动失败。
在之后应用正常运行的过程中，也会有定期的「健康监测」，以确保你的应用正常运行，如果健康监测失败，云引擎管理程序会自动重启你的应用。

健康检查的 URL 包括你的应用首页（`/`）和 SDK 负责处理的 `/__engine/1/ping`，只要 **两者之一** 返回了 HTTP `200` 的响应，就视作成功。
因此请确保你的应用使用了 SDK，或你的应用 **首页能够正常地返回 HTTP `200`** 响应。

## 部署与发布

### 命令行部署

在你的项目根目录运行：

```sh
tds deploy
```

即可部署至预备环境。
之后运行 `tds publish` 可以将预备环境的代码发布到生产环境。
注意，免费版只有一个环境，`tds deploy` 会直接部署到生产环境。

使用命令行工具可以非常方便地部署、发布应用，查看应用状态，查看日志，甚至支持多应用部署。
具体使用请参考《命令行工具指南》。

### 依赖缓存

云引擎实现了一个缓存机制来加快构建的速度，所谓构建就是指你的应用在云引擎上安装依赖的过程，在每次构建时，如果依赖没有新增或者删减，那么就直接使用上次安装的依赖，只将新的应用代码替换上去。
例如 Node.js 项目连续两次部署，`package.json` 并没有修改，那么就会直接使用已经缓存的依赖。


依赖缓存也会因为很多原因失效，因此不保证每次构建都可以利用上缓存。
如果你遇到了与依赖安装有关的问题，可以在控制台部署时勾选「下载最新依赖」，或通过命令行工具部署时添加 `--no-cache` 选项。

```sh
tds deploy --no-cache
```

### Git 部署

除此之外，还可以使用 git 仓库部署。你需要将项目提交到一个 git 仓库，我们并不提供源码的版本管理功能，而是借助于 git 这个优秀的分布式版本管理工具。我们推荐你使用 [GitHub](https://github.com/)、[Coding](https://coding.net/) 或者 [码云](https://gitee.com/) 这样第三方的源码托管网站，也可以使用你自己搭建的 git 仓库（比如 [GitLab](https://about.gitlab.com/)）。

你需要先在这些平台上创建一个项目（如果已有代码，请不需要选择「Initialize this repository with a README」），在网站的个人设置中填写本地机器的 SSH 公钥（以 GitHub 为例，在 **Settings** > **SSH and GPG keys** 中点击 **New SSH key**），然后在项目目录执行：

```sh
git remote add origin git@github.com:<username>/<repoName>.git
git push -u origin master
```

然后到云引擎的设置界面填写你的 Git 仓库地址，如果是公开仓库建议填写 HTTPS 地址，例如 `https://github.com/<username>/<repoName>.git`。

如果是私有仓库需要填写 SSH 地址（<code>git&commat;github.com:&lt;username&gt;/&lt;repoName&gt;.git</code>），还需要你将云引擎分配给你的公钥填写到第三方托管平台的 Deploy keys 中，以 GitHub 为例，在项目的 **Settings** > **Deploy keys** 中点击 **Add deploy key**。

设置好之后，今后需要部署代码时就可以在云引擎的部署界面直接点击「部署」了，默认会部署 `master` 分支的代码，你也可以在部署时填写分支、标签或具体的 Commit。
如果仓库使用了 submodule，云引擎也会自动拉取 submodule。

如果希望 push 到项目的 Git 仓库的特定分支后自动触发云引擎部署，可以在应用的 **云服务控制台 > 云引擎 > 部署 > git 部署 > 自动部署** 查看 deploy token 和 webhook 地址。
控制台显示的 deploy token 可以用来构造 HTTP 请求触发部署。
在控制台填写项目仓库的分支名称，并选择云引擎的运行环境后，控制台会生成相应的 webhook 地址。
该地址收到任意 POST 请求后，会部署指定分支的代码到指定的运行环境。

例如，在 GitHub 代码仓库的 **Settings** > **Webhooks** > **Payload URL** 填写生成的 webhook 后（其他选项均使用默认值，不用修改），下次 push 到项目仓库的 **任意** 分支，云引擎会自动根据 **指定** 分支更新代码，重新部署。之所以 push 到任意分支都会触发重新部署，是因为 GitHub 的 webhook 触发事件设置粒度较粗，不能指定仅在 push 到特定分支时触发 webhook。另一方面，云引擎也没有适配具体的托管平台，不会根据 GitHub 提交的 POST 内容中的分支信息决定是否重新部署。
不过，你可以使用 GitHub Action 更精细地控制部署时机，具体可以参考控制台显示的示例。

### 预备环境和生产环境

默认情况，云引擎只有一个「生产环境」。在生产环境中有一个「体验实例」来运行应用。

当生产环境的体验实例升级到「标准实例」后会有一个额外的「预备环境」。两个环境所访问的都是同样的数据，你可以用预备环境测试你的云引擎代码，每次修改先部署到预备环境，测试通过后再发布到生产环境；如果你希望有一个独立数据源的测试环境，建议单独创建一个应用。

在云引擎托管的网站需要绑定域名才能访问。
以 `stg-` 开头的域名会自动绑定到预备环境。

如果访问云引擎遇到「Application not Found」的错误，通常是因为对应的环境还没有部署代码。例如应用可能没有预备环境，或应用尚未发布代码到生产环境。

有些时候你可能需要知道当前云引擎运行在什么环境（开发环境、预备环境或生产环境），从而做不同的处理。
Node.js 项目可以通过检查环境变量 `NODE_ENV` 的值来判断：值为 `development` 意味着当前环境为「开发环境」，是由命令行工具启动的；值为 `production` 意味着当前环境为「生产环境」，是线上正式运行的环境；值为 `staging` 意味着当前环境为「预备环境」。
其他语言的项目可以通过检查环境变量 `LEANCLOUD_APP_ENV` 的值来判断：值为 `development` 意味着当前环境为「开发环境」，是由命令行工具启动的；值为 `production` 意味着当前环境为「生产环境」，是线上正式运行的环境；值为 `stage` 意味着当前环境为「预备环境」。




### 部署历史

在**云服务控制台 > 云引擎 > 云引擎分组 > 部署**页面可以分别查看预备环境和生产环境的历史部署。
每个历史部署版本会显示简短描述（基于 git 提交日志等信息）、部署版本号、部署时间。
历史部署按部署时间倒序排列，当前部署排在最前。
点击**回滚至该版本**按钮，可以回滚至相应的部署版本。
点击**查看更多历史部署**可以查看最近部署的 10 个版本。
除了按预备环境和生产环境分别查看历史部署外，点击右上角的**查看部署时间线**则可以按照时间顺序（最新部署在前）查看部署到云引擎的各个版本。

除了查看部署历史外，这里还会显示预备环境或生产环境的部署状态（「休眠中」、「部署中」、「运行中」）。
通过右上角的按钮还可以**重启**（重新部署当前版本）或**清除部署**（移除部署，注销相应的云函数和 Hook）。
预备环境还可以点击右上角的**部署到生产环境**按钮将最近部署到预备环境的版本发布到生产环境。
当部署状态为「部署中」时，控制台会显示部署进行中的一些信息，也会显示一个**取消部署**按钮，点击可以取消部署。

## 云端环境

### 环境变量

云引擎平台默认提供下列环境变量供应用使用：

变量名 | 说明
--- | ---
`LEANCLOUD_APP_ID` | 当前应用的 `App ID`。
`LEANCLOUD_APP_KEY` | 当前应用的 `App Key`。
`LEANCLOUD_APP_MASTER_KEY`| 当前应用的 `Master Key`。
`LEANCLOUD_APP_ENV` | 当前的应用环境：开发环境没有该环境变量，或值为 `development`（通过命令行工具启动）。预备环境值为 `stage`。生产环境值为 `production`。
`LEANCLOUD_APP_PORT` | 当前应用开放给外网的端口，只有监听此端口，用户才可以访问到你的服务。
`LEANCLOUD_API_SERVER` | 访问存储服务时使用的地址。该值会因为所在数据中心等原因导致不一样，所以使用 REST API 请求存储服务或其他云服务时请使用此环境变量的值。
`LEANCLOUD_APP_GROUP`| 云引擎实例所在的组。当使用云引擎组管理功能时，该值为组的名称。
`LEANCLOUD_REGION` | 云引擎服务所在区域，值为 `CN` 或 `US`，分别表示国内版和国际版。
`LEANCLOUD_VERSION_TAG` | 云引擎实例部署的版本号

旧版云引擎使用的以 `LC_` 开头的环境变量（如 `LC_APP_ID`）已经被弃用。为了保证代码兼容性，`LC_` 变量在一段时间内依然有效，但未来可能会完全失效。为了避免报错，建议使用 `LEANCLOUD_` 变量来替换。

你也可以在 **云服务控制台 > 云引擎 > 云引擎分组 > 设置 > 自定义环境变量** 页面中添加自定义的环境变量。其中名字必须是字母、数字、下划线且以字母开头，值必须是字符串，修改环境变量后会在下一次部署时生效。

按照一般的实践，可以将一些配置项存储在环境变量中，这样可以在不修改代码的情况下，修改环境变量并重新部署，来改变程序的行为；或者可以将一些第三方服务的 Secret Key 存储在环境变量中，避免这些密钥直接出现在代码中。

### 负载均衡和边缘节点

在云引擎上，用户的请求会先经过负载均衡组件，然后到达你的应用。
负载均衡组件会处理 HTTPS 加密、对响应进行压缩等一般性工作，因此你不必在你的应用中添加 HTTPS 或 gzip 相关的功能。

### 文件系统

你可以向 `/home/leanengine` 或 `/tmp` 目录写入临时文件，最多不能超过 1 GB。

云引擎每次部署都会产生一个新的容器，即使不部署系统偶尔也会进行一些自动调度，这意味着你 **不能将本地文件系统当作持久的存储**，只能用作临时存储。

如果你写入的文件体积较大，建议在使用后自动删除他们，否则如果占用磁盘空间超过 1 GB，继续写入文件可能会收到类似 `Disk quota exceeded` 的错误，这种情况下你可以重新部署一下，这样文件就会被清空了。

### 日志

在 **云服务控制台 > 云引擎 > 云引擎分组 > 日志** 中可以查看云引擎的部署和运行日志，还可以通过环境（预备环境、生产环境）、类型（标准输出、标准错误）、实例、日期时间进行筛选。

你还可以通过命令行工具来导出最近七天的日志到本地文件，方便进行进一步的分析和统计。

应用的日志可以直接输出到「标准输出」或者「标准错误」，这些信息会分别对应日志的 `info` 和 `error` 级别。

云引擎的访问日志（Access Log）也可以在控制台导出（**云服务控制台 > 云引擎 > 访问日志**）。
