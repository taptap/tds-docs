---
id: cli
title: 命令行工具 CLI 使用指南
sidebar_label: 命令行工具
---

import LeandbCliAccess from './_partials/leandb-cli-access.mdx';
import QuickStartInit from './_partials/quick-start-init.mdx';
import {Conditional} from '/src/docComponents/conditional';
import {CLI_BINARY} from '/src/constants/env.ts';

<p>命令行工具（<code>{CLI_BINARY}</code>）是用来部署云引擎应用和和进行其他管理操作的客户端工具。</p>

## 安装

### macOS

<Conditional brand='leancloud'>

推荐通过 [Homebrew](https://brew.sh/) 安装：

```sh
brew update && brew install lean-cli
```

<details>
<summary>点击展开 Homebrew 安装常见问题（安装失败）</summary>

如访问 Homebrew 网络不畅，可以 [设置 `http_proxy` 等环境变量来加速访问](https://docs.brew.sh/Manpage#using-homebrew-behind-a-proxy)，或为 Homebrew 配置镜像源（如 [TUNA](https://mirror.tuna.tsinghua.edu.cn/help/homebrew/)）

或者也可以在 [GitHub releases 页面] 下载适用于 macOS 的二进制文件，重命名为 `lean`　后移动到 `$PATH` 下的路径，并添加可执行权限（`chmod a+x /path/to/lean`）。
</details>

</Conditional>
<Conditional brand='tds'>

macOS 用户可以在 [GitHub releases 页面] 下载二进制文件 `tds-macos-x64`，赋予可执行权限（`chmod a+x tds-macos-x64`），重命名为 `tds`　后移动到 `$PATH` 下的路径，并添加可执行权限（`chmod a+x /path/to/tds`）。

</Conditional>

### Windows

Windows 用户可以在 [GitHub releases 页面] 根据操作系统版本下载最新的 32 位 或 64 位 **msi** 安装包进行安装，安装成功之后在 Windows 命令提示符（或 PowerShell）下直接输入 `tds` 命令即可使用。

也可以选择编译好的绿色版 **exe** 文件，下载后将此文件更名为 `tds.exe`，并将其路径加入到系统 **PATH** 环境变量（[设置方法](https://www.java.com/zh_CN/download/help/path.xml)）中去。这样使用时在 Windows 命令提示符（或 PowerShell）下，在任意目录下输入 `tds` 就可以使用命令行工具了。当然也可以将此文件直接放到已经在 PATH 环境变量中声明的任意目录中去，比如 `C:\Windows\System32` 中。

### Linux

基于 Debian 的发行版可以从 [GitHub releases 页面] 下载 deb 包安装。

其他发行版可以从 [GitHub releases 页面] 下载预编译好的二进制文件 `tds-linux-x64`，重命名为 `tds`　后移动到 `$PATH` 下的路径，并添加可执行权限（`chmod a+x /path/to/tds`）。

[GitHub releases 页面]: https://releases.leanapp.cn/#/leancloud/lean-cli/releases

### 升级版本

下载最新的文件，重新执行一遍安装流程，即可把旧版本的命令行工具覆盖，升级到最新版。

## 命令介绍

安装成功之后，直接在 terminal 终端运行 `tds help`，输出帮助信息：

<details>
<summary>点击展开 <code>tds help</code> 的输出</summary>

```
NAME:
   tds - Command line to manage and deploy LeanCloud apps

USAGE:
   tds [global options] command [command options] [arguments...]

COMMANDS:
     login    Log in to LeanCloud
     switch   Change the associated LeanCloud app
     metric   Obtain LeanStorage performance metrics of current project
     info     Show information about the current user and app
     up       Start a development instance locally
     init     Initialize a LeanEngine project
     deploy   Deploy the project to LeanEngine
     publish  Publish code from staging to production
     upload   Upload files to the current application (available in the '_File' class)
     logs     Show LeanEngine logs
     debug    Start the debug console without running the project
     env      Output environment variables used by the current project
     cache    LeanCache shell
     cql      Start CQL interactive mode (warn: CQL is deprecated)
     help, h  Show all commands or help info for one command

GLOBAL OPTIONS:
   --version, -v  print the version
```

</details>

可以通过 `--version` 选项查看命令行工具的版本：

```
$ tds --version
tds version 0.25.0
```

简单介绍下主要的子命令：

命令 | 用途
- | -
`login` | 登录 LeanCloud 账号
`switch` | 切换关联的云引擎应用和分组
`info` | 显示当前应用和分组信息
`up` | 启动本地开发调试
`init` | 初始化云引擎项目
`deploy` | 部署项目至云引擎
`publish` | 将预备环境的版本发布至生产环境
`upload` | 上传文件至数据存储服务（可以在 **开发者中心 > 你的游戏 > 游戏服务 > 云服务 > 数据存储 > 文件** 中查看）
`logs` | 显示云引擎日志
`debug` | 单独启动云函数调试控制台（不运行应用本身）
`env` | 显示当前项目的环境变量
`db` | 连接到云端的 LeanCache 或 LeanDB


用 `tds <command> --help` 可以进一步了解每个子命令的用法，例如：

<details>
<summary>点击展开 <code>tds deploy --help</code> 的输出</summary>

```
NAME:
   tds deploy - Deploy the project to LeanEngine

USAGE:
   tds deploy [command options] [arguments...]

OPTIONS:
   -g                                              Deploy from git repo
   --war                                           Deploy .war file for Java project. The first .war file in target/ is used by default
   --no-cache                                      Force download dependencies
   --overwrite-functions                           Overwrite cloud functions with the same name in other groups
   --leanignore value                              Rule file for ignored files in deployment (default: ".leanignore")
   --message value, -m value                       Comment for this deployment, only applicable when deploying from local files
   --keep-deploy-file
   --revision value, -r value                      Git revision or branch. Only applicable when deploying from Git (default: "master")
   --options --options build-root=app&atomic=true  Send additional deploy options to server, in urlencode format(like --options build-root=app&atomic=true)
   --prod --prod 1                                 Deploy to production(--prod 1) or staging(`--prod 0`) environment, default to staging if it exists
   --direct                                        Upload project's tarball to remote directly
```

</details>

## 登录账号

安装完命令行工具之后，首先第一步需要登录云服务账号。
请进入开发者后台，点击左侧「创建游戏」按照需要填写基础信息和基础游戏资料，然后进入对应的游戏，依次进入**游戏服务 > 云服务 > 云引擎 > 开启 > 部署项目 > 命令行工具部署**，按照指引登录你的云服务账号。

如要切换到另一账号，重新执行 `tds login` 即可。

## 初始化项目

登录完成之后，可以使用 `tds init` 命令来初始化一个项目，并且关联到已有的云服务应用上。

<QuickStartInit noCliSetup={true} />

## 关联应用和分组

命令行工具的大部分操作都是针对关联的应用进行的，使用 `tds swtich` 可以将已有的项目关联到云端的应用：

```sh
tds switch
```

如应用中有多个分组，则会需要你选择一个分组。

如需管理项目到其他应用，可以重新运行 `tds swtich`。

另外还可以直接执行 `$ tds switch 其他应用的id` 来快速切换关联应用。

使用 `tds info` 可以查看当前项目关联的应用。

## 本地运行调试

在项目根目录运行：

```sh
tds up
```

即可开始本地调试，命令行工具会在启动你的应用同时启动一个云函数调试控制台。

- 在浏览器中打开 <http://localhost:3000>，进入 web 应用的首页。
- 在浏览器中打开 <http://localhost:3001>，进入云引擎云函数和 Hook 函数调试控制台。

如果想变更启动端口号，可以使用 `tds up --port 新端口号` 命令来指定。

旧版命令行工具可以在 `tds up` 的过程中，监测项目文件的变更，实现自动重启开发服务进程。新版命令行工具移除了这一功能，转由项目代码本身来实现，以便更好地与项目使用的编程语言或框架集成。

除了使用命令行工具来启动项目之外，还可以**原生地**启动项目，比如直接使用 `node server.js` 或者 `python wsgi.py`。这样能够将云引擎开发流程更好地集成到开发者管用的工作流程中，也可以直接和 IDE 集成。但是直接使用命令行工具创建的云引擎项目，默认会依赖一些环境变量，因此需要提前设置好这些环境变量。

使用命令 `tds env` 可以显示出这些环境变量，手动在当前终端中设置好之后，就可以不依赖命令行工具来启动项目了。另外使用兼容 `sh` shell 的用户，还可以直接使用 `eval $(tds env)`，自动设置好所有的环境变量。

启动时还可以给启动命令增加自定义参数，在 `tds up` 命令后增加两个横线 `--`，所有在横线后的参数会被传递到实际执行的命令中。比如启动 node 项目时，想增加 `--inspect` 参数给 node 进程，来启动 node 自带的远程调试功能，只要用 `tds up -- --inspect` 来启动项目即可。

另外还可以使用 `--cmd` 来指定启动命令，这样即可使用任意自定义命令来执行项目：`tds up --cmd=my-custom-command`。

有些情况下，我们需要让 IDE 来运行项目，或者需要调试在虚拟机／远程机器上的项目的云函数，这时可以单独运行云函数调试功能，而不在本地运行项目本身：

```sh
$ tds debug --remote=http://remote-url-or-ip-address:remote-port --app-id=xxxxxx
```

更多关于云引擎开发的内容，请参考[云引擎服务总览](/sdk/engine/overview/)。

## 部署

### 从本地代码部署

当开发和本地测试云引擎项目通过后，你可以直接将本地源码推送到 LeanCloud 云引擎平台运行：

```sh
tds deploy
```

对于生产环境是**体验实例**的云引擎的应用，这个命令会将本地源码部署到线上的生产环境，无条件覆盖之前的代码（无论是从本地仓库部署、Git 部署还是在线定义）；而对于生产环境是**标准实例**的云引擎的应用，这个命令会先部署到**预备环境**，后续需要使用 `tds publish` 来完成向生产环境的部署，如需直接部署到生产环境，可额外添加 `--prod 1` 选项：

```sh
tds deploy --prod 1
```

部署过程会实时打印进度：

```
$ tds deploy
[INFO] Current CLI tool version:  0.21.0
[INFO] Retrieving app info ...
[INFO] Preparing to deploy AwesomeApp(xxxxxx) to region: cn group: web staging
[INFO] Python runtime detected
[INFO] pyenv detected. Please make sure pyenv is configured properly.
[INFO] Uploading file 6.40 KiB / 6.40 KiB [=========================] 100.00% 0s
[REMOTE] 开始构建 20181207-115634
[REMOTE] 正在下载应用代码 ...
[REMOTE] 正在解压缩应用代码 ...
[REMOTE] 运行环境: python
[REMOTE] 正在下载和安装依赖项 ...
[REMOTE] 存储镜像到仓库（0B）...
[REMOTE] 镜像构建完成：20181207-115634
[REMOTE] 开始部署 20181207-115634 到 web-staging
[REMOTE] 正在创建新实例 ...
[REMOTE] 正在启动新实例 ...
[REMOTE] [Python] 使用 Python 3.7.1, Python SDK 2.1.8
[REMOTE] 实例启动成功：{"version": "2.1.8", "runtime": "cpython-3.7.1"}
[REMOTE] 正在更新云函数信息 ...
[REMOTE] 部署完成：1 个实例部署成功
[INFO] Deleting temporary files
```

默认部署备注为「从命令行工具构建」，显示在 **开发者中心 > 你的游戏 > 游戏服务 > 云服务 > 云引擎 > 云引擎分组 > 日志** 中。你可以通过 `-m` 选项来自定义部署的备注信息：

```sh
tds deploy -m 'fix #42'
```

部署之后需要绑定一个云引擎自定义域名，然后就可以通过 curl 命令来测试你的云引擎代码，或者通过浏览器访问相应的网址。

<details>
<summary>点击展开如何在部署时忽略部分文件（<code>.leanignore</code>）</summary>

部署项目时，如果有一些临时文件或是项目源码管理软件用到的文件，不需要上传到服务器，可以将它们加入到 `.leanignore` 文件。

`.leanignore` 文件格式与 Git 使用的 `.gitignore` 格式基本相同（严格地说，`.leanignore` 支持的语法为 `.gitignore` 的子集），每行写一个忽略项，可以是文件或者文件夹。如果项目没有 `.leanignore` 文件，部署时会根据当前项目所使用的语言创建一个默认的 `.leanignore` 文件。请确认此文件中的 [默认配置][defaultIgnorePatterns] 是否与项目需求相符。

[defaultIgnorePatterns]: https://github.com/leancloud/lean-cli/blob/master/runtimes/ignorefiles.go#L13

</details>

### 触发 Git 部署

如果代码保存在某个 Git 仓库上，例如 [GitHub](https://github.com)，并且在 LeanCloud 控制台已经正确设置了 git repo 地址以及 deploy key，你也可以请求云引擎从 Git 仓库获取源码并自动部署。这个操作可以在云引擎的部署菜单里完成，也可以在本地执行：

```sh
tds deploy -g
```

- `-g` 选项要求从 Git 仓库部署，Git 仓库地址必须已经在云引擎菜单中保存。
- 默认部署使用 **master** 分支的最新代码，你可以通过 `-r <revision>` 来指定部署特定的 commit 或者 branch。
- 设置 git repo 地址以及 deploy key 的方法可以参考 [云引擎平台功能 § Git 部署](/sdk/engine/deploy/platform/#git-部署)。

### 发布到生产环境

以下步骤仅适用于生产环境是标准实例的用户。

如果预备环境如果测试没有问题，此时需要将预备环境的云引擎代码切换到生产环境，可以在 **开发者中心 > 你的游戏 > 游戏服务 > 云服务 > 云引擎 > 云引擎分组 > 部署** 中发布，也可以直接运行 `publish` 命令：

```sh
tds publish
```

这样预备环境的云引擎代码就发布到了生产环境：

```
$ tds publish
[INFO] Current CLI tool version:  0.21.0
[INFO] Retrieving app info ...
[INFO] Deploying AwesomeApp(xxxxxx) to region: cn group: web production
[REMOTE] 开始部署 20181207-115634 到 web1,web2
[REMOTE] 正在创建新实例 ...
[REMOTE] 正在创建新实例 ...
[REMOTE] 正在启动新实例 ...
[REMOTE] 正在启动新实例 ...
[REMOTE] 实例启动成功：{"version": "2.1.8", "runtime": "cpython-3.7.1"}
[REMOTE] 实例启动成功：{"version": "2.1.8", "runtime": "cpython-3.7.1"}
[REMOTE] 正在更新云函数信息 ...
[REMOTE] 部署完成：2 个实例部署成功
```

## 查看日志

使用 `logs` 命令可以查询云引擎的最新日志：

```
$ tds logs
      2019-11-20 17:17:12  Deploying 20191120-171431 to web1
      2019-11-20 17:17:12  Creating new instance ...
      2019-11-20 17:17:22  Starting new instance ...
web1  2019-11-20 17:17:22
web1  2019-11-20 17:17:22  > node-js-getting-started@1.0.0 start /home/leanengine/app
web1  2019-11-20 17:17:22  > node server.js
web1  2019-11-20 17:17:22
web1  2019-11-20 17:17:23  Node app is running on port: 3000
      2019-11-20 17:17:23  Instance started: {"runtime":"nodejs-v12.13.1","version":"3.4.0"}
      2019-11-20 17:17:23  Updating cloud functions metadata ...
      2019-11-20 17:17:23  Deploy finished: 1 instances deployed
```

默认返回最新的 30 条，最新的在最下面。

可以加上 `-f` 选项来自动滚动更新日志，类似 `tail -f` 命令的效果：

```sh
tds logs -f
```

新的云引擎日志产生后，都会被自动填充到屏幕下方。

<details>
<summary>点击展开 <code>tds logs</code> 的更多用法（时间筛选等）</summary>

可以通过 `-l` 选项设定返回的日志数目，例如返回最近的 100 条：

```sh
tds logs -l 100
```

如果想查询某一段时间的日志，可以指定 `--from` 和 `--to` 参数：

```
tds logs --from=2017-07-01 --to=2017-07-07
```

单独使用 `--from` 参数导出从某一天到现在的日志：

```
tds logs --from=2017-07-01
```

另外可以配合重定向功能，将一段时间内的 JSON 格式日志导出到文件，再配合本地工具进行查看：

```
tds logs --from=2017-07-01 --to=2017-07-07 --format=json > leanengine.logs
```

`--from`、`--to` 的时区为本地时区（运行 lean-cli 命令行工具的机器的本地时区）。

</details>

## 连接到云端的 LeanDB

<LeandbCliAccess />

## 疑难问题

### 使用命令行工具部署失败怎么办？

部署失败有多种原因，请根据显示的报错信息耐心排查。
一般来说，如果你使用命令行工具部署，首先建议你检查命令行工具是否是最新版，如果不是最新版，先升级到最新版再重试。

### 之前使用 `npm` 装过旧版的命令行工具，如果升级到新版？

如果之前使用 `npm` 安装过旧版本的命令行工具，为了避免与新版本产生冲突，建议使用 `npm uninstall -g leancloud-cli` 卸载旧版本命令行工具。或者直接按照 `homebrew` 的提示，执行 `brew link --overwrite lean-cli` 覆盖掉之前的 `lean` 命令来解决。

### 命令行工具在本地调试时提示 `Error: listen EADDRINUSE :::3000`，无法访问应用

`listen EADDRINUSE :::3000` 表示你的程序默认使用的 3000 端口被其他应用占用了，可以按照下面的方法找到并关闭占用 3000 端口的程序：

* [macOS 使用 `lsof` 和 `kill`](http://stackoverflow.com/questions/3855127/find-and-kill-process-locking-port-3000-on-mac)
* [Linux 使用 `fuser`](http://stackoverflow.com/questions/11583562/how-to-kill-a-process-running-on-particular-port-in-linux)
* [Windows 使用 `netstat` 和 `taskkill`](http://stackoverflow.com/questions/6204003/kill-a-process-by-looking-up-the-port-being-used-by-it-from-a-bat)

也可以修改命令行工具默认使用的 3000 端口：
```
lean -p 3002
```

### 如何通过命令行工具上传文件至文件服务？

```sh
$ lean upload public/index.html
Uploads /Users/dennis/programming/avos/new_app/public/index.html successfully at: http://ac-7104en0u.qiniudn.com/f9e13e69-10a2-1742-5e5a-8e71de75b9fc.html
```

文件上传成功后会自动生成在云端的 URL，即上例中 `successfully at:` 之后的信息。

上传 images 目录下的所有文件：

```sh
$ lean upload images/
```

### 同一个项目如何批量部署到多个应用的云引擎？

可以通过 `lean switch` 切换项目所属应用，然后通过 `lean deploy` 部署。
`lean switch` 支持通过参数以非交互的方式使用：

```sh
lean switch --region REGION --group GROUP_NAME APP_ID
lean deploy --prod 1
```

上述命令中，`REGION` 代表应用所在区域，目前支持的值为 `cn-n1`（华北节点）、`cn-e1`（华东节点）、`us-w1`（国际版）。
`--prod 1` 表示部署到生产环境，如果希望部署到预备环境，换成 `lean deploy` 即可。
基于这两个命令可以自行编写 CI 脚本快速部署至多个应用的云引擎实例。


### 如何扩展命令行工具的功能？

有时我们需要对某个应用进行特定并且频繁的操作，比如查看应用 `_User` 表的记录总数，这样可以使用命令行工具的自定义命令来实现。

只要在当前系统的 `PATH` 环境变量下，或者在项目目录 `.leancloud/bin` 下存在一个以 `lean-` 开头的可执行文件，比如 `lean-usercount`，那么执行 `$ lean usercount`，命令行工具就会自动调用这个可执行文件。与直接执行 `$ lean-usercount` 不同的是，这个命令可以获取与应用相关的环境变量，方便访问对应的数据。

例如将如下脚本放到当前系统的 `PATH` 环境变量中（比如 `/usr/local/bin`）：

```python
#! /bin/env python

import sys

import leancloud

app_id = os.environ['LEANCLOUD_APP_ID']
master_key = os.environ['LEANCLOUD_APP_MASTER_KEY']

leancloud.init(app_id, master_key=master_key)
print(leancloud.User.query.count())
```

同时赋予这个脚本可执行权限 `$ chmod +x /usr/local/bin/lean-usercount`，然后执行 `$ lean usercount`，就可以看到当前应用对应的 `_User` 表中记录总数了。
