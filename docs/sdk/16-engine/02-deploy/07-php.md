---
id: php
title: 云引擎 PHP 运行环境
sidebar_label: PHP
---

import CloudEnvironments from '../_partials/cloud-environments.mdx';
import LeanstorageUsages from '../_partials/leanstorage-usages.mdx';
import CloudTimezone from '../_partials/cloud-timezone.mdx';
import CloudLogs from '../_partials/cloud-logs.mdx';
import CloudInternetAddress from '../_partials/cloud-internet-address.mdx';
import CloudLoadBalancer from '../_partials/cloud-load-balancer.mdx';
import CloudFilesystem from '../_partials/cloud-filesystem.mdx';
import BuildingScripts from '../_partials/building-scripts.mdx';
import BuildingBuildLogs from '../_partials/building-build-logs.mdx';
import CloudCustomDomain from '../_partials/cloud-custom-domain.mdx';
import CloudHealthCheck from '../_partials/cloud-health-check.mdx';
import BuildingSystemDependencies from '../_partials/building-system-dependencies.mdx';

:::info
这篇文档是针对 PHP 运行环境的深入介绍，如希望快速地开始使用云引擎，请查看 [快速开始部署云引擎应用](/sdk/engine/deploy/getting-started)。
:::

所有 PHP 项目必须在根目录包含一个 `composer.json` 和 `public/index.php` 才会被云引擎正确识别。

如果你希望创建一个新的项目，推荐从我们的 [PHP 示例项目](https://github.com/leancloud/slim-getting-started) 开始。

## 运行机制

云引擎会使用 Nginx 和 PHP-FPM 来运行你的应用，项目中的 `public` 目录会被映射为网站的根目录（document root），其中 `.php` 文件由 PHP-FPM 处理，其他静态文件由 Nginx 处理。如果被请求的路径不存在则会由 `public/index.php` 处理，这一点可以满足绝大部分框架对应用入口点的需求。


云引擎默认每 64 MB 内存分配一个 PHP-FPM Worker，如果希望自定义 Worker 数量，可以在云引擎设置页面的「自定义环境变量」中添加名为 `PHP_WORKERS` 的环境变量，值是一个数字。设置过低会导致收到新请求时无可用的 Worker；过高会导致内存不足、请求处理失败，建议谨慎调整。

## 配置 PHP 版本

在 `composer.json` 中可以指定 PHP 的版本：

```json
"require": {
  "php": "8.0"
}
```

目前云引擎支持的版本有：`5.6`、`7.0`、`7.1`、`7.2`、`7.3`、`7.4`、`8.0`。

:::note
对于新创建的应用，如未设置 PHP 版本，云引擎会默认使用最新的稳定版本。在 2021-09-02 之前创建的分组因兼容考虑会默认使用 `5.6` 版本。
:::

## 安装依赖（`composer.json`）

云引擎会自动安装 `composer.json` 中的依赖，目前云引擎云端使用的是 Composer 1.x 版本。

## PHP 扩展

所有版本的 PHP 默认开启 `fpm`、`curl`、`mysql`、`zip`、`xml`、`mbstring`、`gd`、`soap`、`sqlite3`。

7.0 以上版本默认开启 `mongodb`。

在 PHP 7.2 中官方从核心中移除了 `mcrypt` 这个拓展，云引擎以选装的方式继续提供支持，在 `composer.json` 的 `require` 中加入 `ext-mcrypt: *` 即可，使用 `mcrypt` 会增加部署耗时，如果没有用到请不要加。

## 自定义构建过程

<BuildingScripts />

### 构建日志

<BuildingBuildLogs />

### 系统级依赖

<BuildingSystemDependencies />

## 健康检查

<CloudHealthCheck />

## 云引擎 SDK
云引擎 SDK 提供了云函数和 Hook 等功能的支持，但并不是必须的。

### 接入云引擎 SDK

模板项目已经集成了 PHP SDK，并且包含 SDK 初始化的逻辑。

如果自行接入 [Slim 框架](http://www.slimframework.com)，可以参考示例项目直接使用 SDK 提供的中间件。

如果自行接入其他框架，则需要自己配置依赖：

```sh
composer require leancloud/leancloud-sdk
```

同时也需要自行初始化 SDK（注意我们在云引擎中开启了 masterKey 权限，这将会跳过 ACL 和其他权限限制）。

```php
use \LeanCloud\Client;

Client::initialize(
    getenv("LEANCLOUD_APP_ID"),
    getenv("LEANCLOUD_APP_KEY"),
    getenv("LEANCLOUD_APP_MASTER_KEY")
);

Client::useMasterKey(true);
```

### 使用数据存储服务

<LeanstorageUsages />

### CookieSession

云引擎提供了一个 `LeanCloud\Storage\CookieStorage` 模块，用 Cookie 来维护用户（`User`）的登录状态，要使用它可以在 `app.php` 中添加下列代码：

```php
use \LeanCloud\Storage\CookieStorage;
Client::setStorage(new CookieStorage(60 * 60 * 24, "/"));
```

`CookieStorage` 支持传入秒作为过期时间，以及路径作为 cookie 的作用域。默认过期时间为 7 天。

可以通过 `User::getCurrentUser()` 来获取当前登录用户。你可以这样简单地实现一个具有登录功能的站点：

```php
$app->get('/login', function($req, $res) {
  // login page
});

$app->post('/login', function($req, $res) {
    $params = $req->getQueryParams();
    try {
        User::logIn($params["username"], $params["password"]);
        return $res->withRedirect('/profile');
    } catch (Exception $ex) {
        return $res->withRedirect('/login');
    }
});

$app->get('/profile', function($req, $res) {
    $user = User::getCurrentUser();
    if ($user) {
        return $res->getBody()->write($user->getUsername());
    } else {
        return $res->withRedirect('/login');
    }
});

$app->get('/logout', function($req, $res) {
    User::logOut();
    return $res->redirect("/");
});
```

一个简单的登录页面可以是这样：

```html
<html>
  <head></head>
  <body>
    <form method="post" action="/login">
      <label>Username</label>
      <input name="username">
      <label>Password</label>
      <input name="password" type="password">
      <input class="button" type="submit" value="login">
    </form>
  </body>
</html>
```

`CookieStorage` 也支持保存其他属性：

```php
$cookieStorage = Client::getStorage();
$cookieStorage->set("key", "val");
```

## 云端环境

### 绑定自定义域名

<CloudCustomDomain />

### 负载均衡和加速节点

<CloudLoadBalancer only='php' />

### 环境变量

<CloudEnvironments />

### 日志

<CloudLogs only='php' />

### 时区

<CloudTimezone />

### 文件系统

<CloudFilesystem />

### 出入口 IP 地址

<CloudInternetAddress />

## 疑难问题
### 是否支持 `path` 类型的 composer 本地仓库？

由于构建时会复制 `composer.json` 和 `composer.lock` 到专门的目录安装依赖，因此不支持 `path` 类型的 composer 本地仓库。
如果你的项目使用了 `path` 类型的本地仓库，我们建议改为 `vcs` 类型。

### PHP 项目从 files.phpcomposer.com 下载文件失败，部署失败怎么办？

phpcomposer.com 镜像已经停止服务，PHP 项目的 `composer.lock` 文件如果包含了这个地址的 url，会导致依赖安装失败。
解决方法有两种：

1. 移除 `composer.lock` 后再部署（云引擎会直接根据 `coposer.json` 安装依赖）。
2. 在本地正确配置仓库地址后，运行 `composer update --lock` 更新 `composer.lock` 文件中的下载链接（不改变具体的版本）。
