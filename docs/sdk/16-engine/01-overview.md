---
id: overview
title: 云引擎服务总览
sidebar_label: 总览
---

import PlatformIntroduction from './_partials/platform-introduction.mdx';

<PlatformIntroduction />

## 部署应用

:::tip
请从 [快速开始部署云引擎应用](/sdk/engine/deploy/getting-started/) 开始部署你的第一个应用，然后阅读特定语言的文档来了解更多有关云引擎运行环境的信息。
:::

运行环境 | 支持版本 | 支持包管理器 | 文档页面 | 示例项目
--- | --- | --- | --- | ---
Web 前端 | Node.js >= 0.12 | NPM / Yarn | [Web 前端运行环境](/sdk/engine/deploy/webapp/) | [Web 前端运行环境 § 快速开始](/sdk/engine/deploy/webapp#快速开始) |
Node.js | >= 0.12 | NPM / Yarn | [Node.js 运行环境](/sdk/engine/deploy/nodejs/) | [node-js-getting-started](https://github.com/leancloud/node-js-getting-started/) (Express)
Python | >= 2.7 | pip | [Python 运行环境](/sdk/engine/deploy/python/) | [python-getting-started](https://github.com/leancloud/python-getting-started) (Flask)
Java | 8, 11 - 15 | Maven | [Java 运行环境](/sdk/engine/deploy/java/) | [servlet-getting-started](https://github.com/leancloud/servlet-getting-started)<br />[spring-boot-getting-started](https://github.com/leancloud/spring-boot-getting-started)
PHP | 5.6, 7.0 - 8.0 | Composer(v1) | [PHP 运行环境](/sdk/engine/deploy/php/) | [slim-getting-started](https://github.com/leancloud/slim-getting-started)
.NET | 2.1 | dotnet | [.Net 运行环境](/sdk/engine/deploy/dotnet/) | [dotnet-core-getting-started](https://github.com/leancloud/dotnet-core-getting-started)
Go | >= 1.10 | go mod | [Go 运行环境](/sdk/engine/deploy/go/) | [golang-getting-started](https://github.com/leancloud/golang-getting-started) (Echo)

## 云函数和 Hook

云函数是云引擎提供的一种经过高度封装的函数计算功能，可以自动地序列化 [数据存储](/sdk/storage/features/) 服务中的各种数据类型，在我们的各个客户端 SDK 中也有对应的支持。Hook 功能则允许开发者在数据存储中的对象被创建、更新、删除，或用户登录、认证，实时通讯发送消息、创建对话、客户端上下线时触发自定义的逻辑，进行额外的权限检查。

:::tip
使用云函数几乎不需要你有传统后端开发经验，可以帮助开发者专注在业务逻辑上，请从 [快速部署云函数和 Hook](/sdk/engine/functions/getting-started/) 开始编写你的第一个云函数。
:::

基于云函数我们还提供了 [定时任务](/sdk/engine/functions/guides#定时任务) 和 [云队列](/sdk/engine/functions/cloud-queue/) 等功能，可以对云函数进行更复杂的调度。如在特定时间或基于一定时间间隔来运行云函数，还有重试、去重、结果查询、延时任务等功能。

## LeanDB 数据库

除了使用 [数据存储](/sdk/storage/features/) 服务外，云引擎也提供了业界使用广泛的一些数据库的托管方案：

数据库 | 集群配置 | 集群可用性 | 文档页面
--- | --- | --- | ---
Redis | 主从结构（1M/1S） | 默认高可用，自动切换 | [LeanCache 使用指南](/sdk/engine/database/redis/)
MongoDB | 副本集（1P/1S/1A） | 默认高可用，自动切换 | [LeanDB MongoDB 使用指南](/sdk/engine/database/mongo/)
MySQL | 主从结构（1M/1S） | 默认高可用，自动切换 | [LeanDB MySQL 使用指南](/sdk/engine/database/mysql/)
Elasticsearch | 单节点 / 三个节点 | 默认高可用，自动切换（三个节点时） | [LeanDB Elasticsearch 使用指南](/sdk/engine/database/es/)

## 更多

- **命令行工具** 可以用来部署、调试云函数项目，详见 [命令行工具 CLI 使用指南](/sdk/engine/cli/)。
- 除了使用数据存储 SDK，云函数也提供了 **REST API**，详见 [云引擎 REST API 指南](/sdk/engine/functions/rest-api/)。
- 云引擎支持绑定 **独立 IP**，详见 [云引擎独立 IP 指南](/sdk/engine/dedicated-IP)。
- 在 [深入了解云引擎](/sdk/engine/deep-dive/) 中我们会向有经验的开发者介绍云引擎背后的一些细节。
