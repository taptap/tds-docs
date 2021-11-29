---
id: php
title: 云引擎 PHP 运行环境
sidebar_label: PHP
---
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

目前云引擎支持 `5.6`、`7.0`、`7.1`、`7.2`、`7.3`、`7.4`、`8.0` 这几个版本，后续如果有新版本发布，也会添加支持。
