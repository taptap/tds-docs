---
title: 云引擎 Python 运行环境
sidebar_label: Python
sidebar_position: 5
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
import {Conditional} from '/src/docComponents/conditional';

:::info
这篇文档是针对 Python 运行环境的深入介绍，如希望快速地开始使用云引擎，请查看 [快速开始部署云引擎应用](/sdk/engine/deploy/getting-started)。
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
<Conditional brand="leancloud">对于新创建的应用，</Conditional>如未设置 Python 版本，云引擎会默认使用最新的稳定版本。<Conditional brand="leancloud">在 2021-09-02 之前创建的分组因兼容考虑会默认使用 `2.7` 版本。</Conditional>
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
