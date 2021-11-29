---
id: python
title: 云引擎 Python 运行环境
sidebar_label: Python
---

import BuildingScripts from '../_partials/building-scripts.mdx';
import CloudLogs from '../_partials/cloud-logs.mdx';
import CloudFilesystem from '../_partials/cloud-filesystem.mdx';
import BuildingSystemDependencies from '../_partials/building-system-dependencies.mdx';
import CloudHealthCheck from '../_partials/cloud-health-check.mdx';
import CloudEnvironments from '../_partials/cloud-environments.mdx';
import CloudTimezone from '../_partials/cloud-timezone.mdx';
import CloudLoadBalancer from '../_partials/cloud-load-balancer.mdx';
import CloudCustomDomain from '../_partials/cloud-custom-domain.mdx';
import CloudInternetAddress from '../_partials/cloud-internet-address.mdx';

:::info
这篇文档是针对 Python 运行环境的深入介绍，如希望快速地开始使用云引擎，请查看 [云引擎开发指南 § 快速开始](/sdk/engine/cloud-engine#快速开始)。
:::

所有 Python 项目都必须在根目录下包含有 `wsgi.py` 和 `requirements.txt` 文件才会被云引擎正确识别。

云引擎默认使用 WSGI 来运行 Python 项目，运行时会首先加载 `wsgi.py` 这个模块，并将此模块的全局变量 `application` 作为 WSGI 函数进行调用。因此请保证 `wsgi.py` 文件中包含一个 `application` 的全局变量／函数／类，并且符合 [WSGI 规范](https://www.python.org/dev/peps/pep-0333/)：

```python title='app.py'
from flask import Flask
app = Flask(__name__)
@app.route('/')
def index():
    return "hi"
```

```python title='wsgi.py'
from app import app
application = app
```

流行的 Python Web 框架对 WSGI 都有支持，比如 [Flask](http://flask.pocoo.org)、[Django](https://www.djangoproject.com)、[Tornado](http://www.tornadoweb.org)。我们提供了 Flask 和 Django 两个框架的示例项目作为参考，你也可以直接把它们当作一个应用项目的初始化模版：

- [Flask](https://github.com/leancloud/python-getting-started)
- [Django](https://github.com/leancloud/django-getting-started)

## 非 WSGI 运行
云引擎也支持直接运行 Python 程序而不使用 WSGI（或者自行来运行 WSGI Server），你可以创建一个 `leanengine.yaml` 文件，在其中设置：

```yaml title='leanengine.yaml'
run: python app.py
```

这种情况下你的应用需要自行监听环境变量 `LEANCLOUD_APP_PORT` 中的端口来提供 HTTP 服务。

## 配置 Python 版本
云引擎兼容 [pyenv](https://github.com/pyenv/pyenv) 的 `.python-version` 文件，你可以将它放在项目根目录来指定版本：

```plain title='.python-version'
3.10
```

这样将代码部署到云端时，云引擎就会自动安装对应的 Python 版本。

云引擎目前仅支持 CPython 版本，暂时不支持 PyPy、Jython、IronPython 等其他 Python 实现。

:::note
对于新创建的应用，如未设置 Python 版本，云引擎会默认使用最新的稳定版本。在 2021-09-02 之前创建的分组因兼容考虑会默认使用 `2.7` 版本。
:::

:::note
如果在本地开发时已使用了 `pyenv`，`pyenv` 也会根据此文件来自动使用对应的 Python 运行项目。我们建议本地开发使用 `pyenv`，以保证本地环境与线上相同。`pyenv` 的安装方法请参考 [pyenv 的 GitHub 仓库](https://github.com/pyenv/pyenv)。
:::

## 安装依赖（`requirements.txt`）

云引擎会使用 `pip` 来安装 [requirements.txt](https://pip.pypa.io/en/stable/user_guide/#requirements-files) 中的包：

```plain title='requirements.txt'
leancloud>=2.9.1,<3.0.0
Flask>=1.0.0
```

:::note
建议将依赖的包的版本都按照 `leancloud>=2.9.1,<3.0.0` 这种格式来明确包的大版本，防止因为包的大版本中的不兼容改动导致再次部署应用时出现问题。
:::

## 自定义构建过程

<BuildingScripts />

### 系统级依赖

<BuildingSystemDependencies />

## 健康检查

<CloudHealthCheck />

## 云引擎 SDK
云引擎 SDK 提供了云函数和 Hook 等功能的支持，但并不是必须的。

### 接入云引擎 SDK
模板项目已经集成了 Python SDK，并且包含 SDK 初始化的逻辑。

如果项目自行接入 Web 框架，那么需要将 `leancloud` 添加到 `requirements.txt` 中，部署到线上即可自动安装此依赖。在本地运行和调试项目的时候，可以在项目目录下使用如下命令进行依赖安装：

```sh
pip install -r requirements.txt
```

同时也需要自行初始化 SDK。
因为 `wsgi.py` 是项目最先被执行的文件，推荐在此文件进行 Python SDK 的初始化工作：

```python
import os
import leancloud

APP_ID = os.environ['LEANCLOUD_APP_ID']
APP_KEY = os.environ['LEANCLOUD_APP_KEY']
MASTER_KEY = os.environ['LEANCLOUD_APP_MASTER_KEY']

leancloud.init(APP_ID, app_key=APP_KEY, master_key=MASTER_KEY)

leancloud.use_master_key(True)
```

注意我们在云引擎中开启了 masterKey 权限，这将会跳过 ACL 和其他权限限制。

### 使用数据存储服务

### CookieSessionMiddleware

Python SDK 提供了一个 `leancloud.engine.CookieSessionMiddleware` 的 WSGI 中间件，使用 Cookie 来维护用户（`leancloud.User`）的登录状态。要使用这个中间件，可以在 `wsgi.py` 中将：

```python
application = engine
```

替换为：

```python
application = leancloud.engine.CookieSessionMiddleware(engine, secret=YOUR_APP_SECRET)
```

你需要传入一个 `secret` 的参数用于签名 Cookie（必须提供），这个中间件会将 `AV.User` 的登录状态信息记录到 Cookie 中，用户下次访问时自动检查用户是否已经登录，如果已经登录，可以通过 `leancloud.User.get_current()` 获取当前登录用户。

`leancloud.engine.CookieSessionMiddleware` 初始化时支持的非必须选项包括：

- **name**：在 cookie 中保存的 session token 的 key 的名称，默认为 `leancloud:session`。
- **excluded_paths**：指定哪些 URL path 不处理 session token，比如在处理静态文件的 URL path 上不进行处理，防止无谓的性能浪费。接受参数类型 `list`。
- **fetch_user**：处理请求时是否要从存储服务获取用户数据，如果为 `False` 的话，`leancloud.User.get_current()` 获取到的用户数据上除了 `session_token` 之外没有任何其他数据，需要自己调用 `fetch()` 来获取。为 `True` 的话，会自动在用户对象上调用 `fetch()`，这样将会产生一次数据存储的 API 调用。默认为 `False`。
- **expires**：设置 cookie 的失效日期（参考 [Werkzeug Document](http://werkzeug.pocoo.org/docs/0.12/http/#werkzeug.http.dump_cookie)）。
- **max_age**：设置 cookie 在多少秒后失效（参考 [Werkzeug Document](http://werkzeug.pocoo.org/docs/0.12/http/#werkzeug.http.dump_cookie)）。

## 云端环境

### 绑定自定义域名

<CloudCustomDomain />

### 负载均衡和加速节点

<CloudLoadBalancer only='nodejs' />

### 环境变量

<CloudEnvironments />

### 日志

<CloudLogs only='python' />

### 时区

<CloudTimezone />

### 文件系统

<CloudFilesystem />

### 出入口 IP 地址

<CloudInternetAddress />

## 疑难问题
### PyPI 上有 `leancloud-sdk` 和 `leancloud` 两个包，该用哪一个？

请使用 `leancloud`。

`leancloud-sdk` 是旧版的 Python SDK，已经不再维护。

不同版本的差别详见 Python SDK 的[更新日志](https://github.com/leancloud/python-sdk/blob/master/changelog)。
