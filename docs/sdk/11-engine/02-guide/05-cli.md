---
id: cli
title: 云引擎命令行工具使用指南
sidebar_label: 命令行工具
---



命令行工具是用来管理和部署云引擎项目的工具。它不仅可以部署、发布和回滚云引擎代码，对同一个云引擎项目做多应用管理，还能查看云引擎日志，批量将文件上传到云端。

## 安装命令行工具

### macOS

目前 `tds` 暂未发布到 Homebrew，macOS 用户请先到 [GitHub releases 页面] 下载二进制文件 `tds-macos-x64`，赋予可执行权限（`chmod a+x tds-macos-x64`），重命名为 `tds` 并放到已经在 PATH 环境变量中声明的任意目录中即可。

[GitHub releases 页面]: https://releases.leanapp.cn/#/leancloud/lean-cli/releases

### Windows

Windows 用户可以在 [GitHub releases 页面]根据操作系统版本下载最新的 32 位 或 64 位 **msi** 安装包进行安装，安装成功之后在 Windows 命令提示符（或 PowerShell）下直接输入 `tds` 命令即可使用。

也可以选择编译好的绿色版 **exe** 文件，下载后将此文件更名为 `tds.exe`，并将其路径加入到系统 **PATH** 环境变量（[设置方法](https://www.java.com/zh_CN/download/help/path.xml)）中去。这样使用时在 Windows 命令提示符（或 PowerShell）下，在任意目录下输入 `tds` 就可以使用命令行工具了。当然也可以将此文件直接放到已经在 PATH 环境变量中声明的任意目录中去，比如 `C:\Windows\System32` 中。

### Linux

基于 Debian 的发行版可以从 [GitHub releases 页面] 下载 deb 包安装。

其他发行版可以从 [GitHub releases 页面] 下载预编译好的二进制文件 `tds-linux-x64`，赋予可执行权限（`chmod a+x tds-linux-x64`），重命名为 `tds` 并放到已经在 PATH 环境变量中声明的任意目录中即可。

### 通过源码安装

请参考项目源码 [README](https://github.com/leancloud/lean-cli)。

### 升级

下载最新的文件，重新执行一遍安装流程，即可把旧版本的命令行工具覆盖，升级到最新版。

## 使用

安装成功之后，直接在 terminal 终端运行 `tds help`，输出帮助信息：

```sh
NAME:
   tds - Command line to manage and deploy LeanCloud apps

USAGE:
   tds [global options] command [command options] [arguments...]

VERSION:
   0.25.0

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

简单介绍下主要的子命令：

命令 | 用途
- | -
`login` | 登录 LeanCloud 账号
`switch` | 切换关联的云引擎项目
`metric` | 当前项目的 LeanStorage 统计信息
`info` | 当前用户、应用
`up` | 启动本地开发调试实例
`init` | 初始化云引擎项目
`deploy` | 部署项目至云引擎
`publish` | 部署至生产环境
`upload` | 上传文件至当前应用（可以在 `_File` 类中查看）
`logs` | 显示云引擎日志
`debug` | 单独运行云函数调试功能，而不在本地运行项目本身
`env` | 显示当前项目的环境变量
`cache` | LeanCache 命令行

可以通过 `--version` 选项查看版本：

```sh
$ tds --version
tds version 0.25.0
```

`tds command -h` 可以查看子命令的帮助信息，例如：

```sh
$ tds deploy -h
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

下文中凡是以 `$ tds` 开头的文字即表示在终端里执行命令。

## 登录

安装完命令行工具之后，首先第一步需要登录云服务账户。
请进入开发者后台，点击左侧「创建游戏」按照需要填写基础信息和基础游戏资料，然后进入对应的游戏，依次进入**游戏服务 > 技术服务 > 云引擎 > 开启 > 部署项目 > 命令行工具部署**，按照指引登录你的云服务账户。

### 切换账户

要切换到另一账户，重新执行 `tds login` 即可。

## 初始化项目

登录完成之后，可以使用 `tds init` 命令来初始化一个项目，并且关联到已有的云服务应用上。

```sh
[?] Please select an app:
 1) AwesomeApp
 2) Foobar
```

选择项目语言／框架：

```sh
[?] Please select a language
 1) Node.js
 2) Python
 3) Java
 4) PHP
 5) .Net
 6）Go
 7) Others
```

之后命令行工具会将此项目模版下载到本地，这样初始化就完成了：

```sh
[INFO] Downloading templates 6.33 KiB / 6.33 KiB [==================] 100.00% 0s
[INFO] Creating project...
```

进入以应用名命名的目录就可以看到新建立的项目。

## 关联已有项目

如果已经使用其他方法创建好了项目，可以直接在项目目录执行：

```sh
$ tds switch
```

将已有项目关联到云服务应用上。

## 切换分组

如果应用启用了云引擎多分组功能，同样可以使用 `$ tds switch` 命令切换当前目录关联的分组。

## 本地运行

如果想将一份代码简单地部署到服务器而不在本地运行和调试，可以暂时跳过此章节。

进入项目目录：

```sh
$ cd AwesomeApp
```

安装此项目相关的依赖后，可以通过命令行工具启动应用：

```sh
$ tds up
```

- 在浏览器中打开 <http://localhost:3000>，进入 web 应用的首页。
- 在浏览器中打开 <http://localhost:3001>，进入云引擎云函数和 Hook 函数调试界面。

注意，如果想变更启动端口号，可以使用 `tds up --port 新端口号` 命令来指定。

旧版命令行工具可以在 `$ tds up` 的过程中，监测项目文件的变更，实现自动重启开发服务进程。新版命令行工具移除了这一功能，转由项目代码本身来实现，以便更好地与项目使用的编程语言或框架集成。

除了使用命令行工具来启动项目之外，还可以**原生地**启动项目，比如直接使用 `node server.js` 或者 `python wsgi.py`。这样能够将云引擎开发流程更好地集成到开发者管用的工作流程中，也可以直接和 IDE 集成。但是直接使用命令行工具创建的云引擎项目，默认会依赖一些环境变量，因此需要提前设置好这些环境变量。

使用命令 `tds env` 可以显示出这些环境变量，手动在当前终端中设置好之后，就可以不依赖命令行工具来启动项目了。另外使用兼容 `sh` shell 的用户，还可以直接使用 `eval $(tds env)`，自动设置好所有的环境变量。

启动时还可以给启动命令增加自定义参数，在 `tds up` 命令后增加两个横线 `--`，所有在横线后的参数会被传递到实际执行的命令中。比如启动 node 项目时，想增加 `--inspect` 参数给 node 进程，来启动 node 自带的远程调试功能，只要用 `tds up -- --inspect` 来启动项目即可。

另外还可以使用 `--cmd` 来指定启动命令，这样即可使用任意自定义命令来执行项目：`tds up --cmd=my-custom-command`。

有些情况下，我们需要让 IDE 来运行项目，或者需要调试在虚拟机／远程机器上的项目的云函数，这时可以单独运行云函数调试功能，而不在本地运行项目本身：

```sh
$ tds debug --remote=http://remote-url-or-ip-address:remote-port --app-id=xxxxxx
```

更多关于云引擎开发的内容，请参考[云引擎服务总览](/sdk/engine/guide/overview/)。

## 部署

### 从本地代码部署

当开发和本地测试云引擎项目通过后，你可以直接将本地源码推送到 LeanCloud 云引擎平台运行：

```sh
$ tds deploy
```

对于生产环境是**体验实例**的云引擎的应用，这个命令会将本地源码部署到线上的生产环境，无条件覆盖之前的代码（无论是从本地仓库部署、Git 部署还是在线定义）；而对于生产环境是**标准实例**的云引擎的应用，这个命令会先部署到**预备环境**，后续需要使用 `tds publish` 来完成向生产环境的部署，如需直接部署到生产环境，可额外添加 `--prod 1` 选项：

```sh
$ tds deploy --prod 1
```

部署过程会实时打印进度：

```sh
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

默认部署备注为「从命令行工具构建」，显示在 **云服务控制台 > 云引擎 > 云引擎分组 > 日志** 中。你可以通过 `-m` 选项来自定义部署的备注信息：

```sh
$ tds deploy -m 'fix #42'
```

部署之后需要绑定一个云引擎自定义域名，然后就可以通过 curl 命令来测试你的云引擎代码，或者通过浏览器访问相应的网址。

#### 部署时忽略部分文件

部署项目时，如果有一些临时文件或是项目源码管理软件用到的文件，不需要上传到服务器，可以将它们加入到 `.leanignore` 文件。

`.leanignore` 文件格式与 Git 使用的 `.gitignore` 格式基本相同（严格地说，`.leanignore` 支持的语法为 `.gitignore` 的子集），每行写一个忽略项，可以是文件或者文件夹。如果项目没有 `.leanignore` 文件，部署时会根据当前项目所使用的语言创建一个默认的 `.leanignore` 文件。请确认此文件中的 [默认配置][defaultIgnorePatterns] 是否与项目需求相符。

[defaultIgnorePatterns]: https://github.com/leancloud/lean-cli/blob/master/runtimes/ignorefiles.go#L13

### 从 Git 仓库部署

如果代码保存在某个 Git 仓库上，例如 [GitHub](https://github.com)，并且在 LeanCloud 控制台已经正确设置了 git repo 地址以及 deploy key，你也可以请求云引擎从 Git 仓库获取源码并自动部署。这个操作可以在云引擎的部署菜单里完成，也可以在本地执行：

```sh
$ tds deploy -g
```

- `-g` 选项要求从 Git 仓库部署，Git 仓库地址必须已经在云引擎菜单中保存。
- 默认部署使用 **master** 分支的最新代码，你可以通过 `-r <revision>` 来指定部署特定的 commit 或者 branch。
- 设置 git repo 地址以及 deploy key 的方法可以参考[云引擎网站托管指南](/sdk/engine/guide/webhosting/)的《Git 部署》一节。
## 发布到生产环境

以下步骤仅适用于生产环境是标准实例的用户。

如果预备环境如果测试没有问题，此时需要将预备环境的云引擎代码切换到生产环境，可以在 **云服务控制台 > 云引擎 > 云引擎分组 > 部署** 中发布，也可以直接运行 `publish` 命令：

```sh
$ tds publish
```

这样预备环境的云引擎代码就发布到了生产环境：

```sh
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

```sh
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

可以通过 `-l` 选项设定返回的日志数目，例如返回最近的 100 条：

```sh
$ tds logs -l 100
```

也可以加上 `-f` 选项来自动滚动更新日志，类似 `tail -f` 命令的效果：

```sh
$ tds logs -f
```

新的云引擎日志产生后，都会被自动填充到屏幕下方。

如果想查询某一段时间的日志，可以指定 `--from` 和 `--to` 参数：

```
$ tds logs --from=2017-07-01 --to=2017-07-07
```

单独使用 `--from` 参数导出从某一天到现在的日志：

```
$ tds logs --from=2017-07-01
```

另外可以配合重定向功能，将一段时间内的 JSON 格式日志导出到文件，再配合本地工具进行查看：

```
$ tds logs --from=2017-07-01 --to=2017-07-07 --format=json > leanengine.logs
```

`--from`、`--to` 的时区为本地时区（运行 lean-cli 命令行工具的机器的本地时区）。

## 多应用管理

一个项目的代码可以同时部署到多个云服务应用上。

### 查看当前应用状态

使用 `tds info` 可以查看当前项目关联的应用：

```sh
$ tds info
[INFO] Retrieving user info from region: cn
[INFO] Retrieving app info ...
[INFO] Current region:  cn User: lan (lan@leancloud.rocks)
[INFO] Current region: cn App: AwesomeApp (xxxxxx)
[INFO] Current group: web
```

此时，执行 `deploy`、`publish`、`logs` 等命令都是针对当前被激活的应用。

### 切换应用

如果需要将当前项目切换到其他应用，可以使用 `switch` 命令：

```sh
$ tds switch
```

之后运行向导会给出可供切换的应用列表。

另外还可以直接执行 `$ tds switch 其他应用的id` 来快速切换关联应用。

## 贡献

`lean-cli` 是开源项目，基于 [Apache](https://github.com/leancloud/lean-cli/blob/master/LICENSE.txt) 协议，源码托管在  <https://github.com/leancloud/lean-cli>，欢迎大家贡献。
