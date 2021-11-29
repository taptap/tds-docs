---
id: overview
title: 云引擎服务总览
sidebar_label: 总览
---

云引擎是一个托管后端程序的平台，开发者可以将 Web 应用（例如一个网站），或者 Node.js、Python、Java、PHP、.Net、Go 等语言的后端程序（例如一个 RESTful API 服务器）部署到云引擎上，云引擎会自动从源代码构建出可运行的「版本」，然后将它运行在独立的容器中，同时提供日志和监控、负载均衡、平滑发布、弹性扩容等能力。此外，云引擎还提供了定时任务、域名和证书管理和 Redis、MySQL、MongoDB、Elasticsearch 等多种托管数据库供开发者使用。

如果希望快速开始，请从 [云引擎开发指南](/sdk/engine/cloud-engine/) 开始部署你的第一个应用，然后阅读特定语言的文档来了解更多有关云引擎运行环境的信息：

运行环境 | 支持版本 | 支持包管理器 | 文档页面 | 示例项目
--- | --- | --- | --- | ---
Web 前端 | Node.js >= 0.12 | NPM 或 Yarn | [Web 前端运行环境](/sdk/engine/runtime/webapp/) | [static-getting-started](https://github.com/leancloud/static-getting-started)<br />[react-getting-started](https://github.com/leancloud/react-getting-started) (WIP) |
Node.js | >= 0.12 | NPM 或 Yarn | [Node.js 运行环境](/sdk/engine/runtime/nodejs/) | [node-js-getting-started](https://github.com/leancloud/node-js-getting-started/) (Express)<br />[koa-getting-started](https://github.com/leancloud/koa-getting-started/)
Python | >= 2.7 | pip | [Python 运行环境](/sdk/engine/runtime/python/) | [python-getting-started](https://github.com/leancloud/python-getting-started) (Flask)<br />[django-getting-started](https://github.com/leancloud/django-getting-started)
Java | 8, 11 - 15 | Maven | [Java 运行环境](/sdk/engine/runtime/java/) | [java-war-getting-started](https://github.com/leancloud/java-war-getting-started) (Servlet)<br />[spring-boot-getting-started](https://github.com/leancloud/spring-boot-getting-started)
PHP | 5.6, 7.0 - 8.0 | Composer(v1) | [PHP 运行环境](/sdk/engine/runtime/php/) | [slim-getting-started](https://github.com/leancloud/slim-getting-started)
.NET | 2.1 | dotnet | [.Net 运行环境](/sdk/engine/runtime/dotnet/) | [dotNET-getting-started](https://github.com/leancloud/dotNET-getting-started)
Go | >= 1.10 | go mod | [Go 运行环境](/sdk/engine/runtime/go/) | [golang-getting-started](https://github.com/leancloud/golang-getting-started) (Echo)

## 云函数和 Hook

云函数是云引擎提供的一种经过高度封装的函数计算功能，在我们的各个客户端 SDK 中也有对应的支持，可以自动地序列化 [数据存储] 服务中的各种数据类型。Hook 功能则允许开发者在数据存储中的对象被创建、更新、删除，或用户登录、认证时，触发自定义的逻辑，进行额外的权限检查。基于云函数我们还提供了 [定时任务] 的功能，能够在特定时间或基于一定时间间隔来运行云函数。

使用云函数几乎不需要你有传统后端开发经验，可以专注在业务逻辑上，请从 [云函数开发指南](/sdk/engine/cloud-function/) 开始编写你的第一个云函数。

## LeanDB 数据库

除了使用 [数据存储] 服务外，云引擎也提供了业界使用广泛的一些数据库的托管方案：

数据库 | 集群配置 | 集群可用性 | 文档页面
--- | --- | --- | ---
Redis | 主从结构（1M/1S） | 默认高可用，自动切换 | [LeanCache 使用指南](/sdk/engine/database/redis/)
MongoDB | 副本集（1P/1S/1A） | 默认高可用，自动切换 | [LeanDB MongoDB 使用指南](/sdk/engine/database/mongo/)
MySQL | 主从结构（1M/1S） | 默认高可用，自动切换 | [LeanDB MySQL 使用指南](/sdk/engine/database/mysql/)
Elasticsearch | 单节点 / 三个节点 | 默认高可用，自动切换（三个节点时） | [LeanDB Elasticsearch 使用指南](/sdk/engine/database/es/)

## 更多

* [命令行工具 CLI](/sdk/engine/guide/cli/)：用来管理和部署云引擎项目的工具。它不仅可以部署、发布和回滚云引擎代码，对同一个云引擎项目做多应用管理，还能查看云引擎日志，批量将文件上传到云端。
* [云引擎 REST API 指南](/sdk/engine/guide/rest/)：直接通过 REST API 接口调用云函数。
* [云队列（Cloud Queue）指南](/sdk/engine/guide/cloudqueue/)：云队列实现了重试、去重、结果查询、延时任务、定时任务等功能，是对云函数功能的一个补充。尚未运行的任务会以一种可靠的方式暂存在云队列，即使你的云引擎因部署、过载、崩溃而重启，任务也不会丢失，云队列会等待你的云引擎实例恢复正常后继续运行它们。
* [云引擎常见问题解答](/sdk/engine/guide/faq/)：希望大多数关于云引擎的问题，都能在这里找到答案。
* [深入了解云引擎](/sdk/engine/deep-dive/)：为有经验的开发者介绍云引擎背后的更多细节。
