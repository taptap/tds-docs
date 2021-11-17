---
id: python
title: 云引擎 Python 运行环境
sidebar_label: Python
---
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
