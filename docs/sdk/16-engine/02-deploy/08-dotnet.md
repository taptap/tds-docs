---
id: dotnet
title: 云引擎 .NET 运行环境
sidebar_label: .NET (C#)
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
这篇文档是针对 .NET 运行环境的深入介绍，如希望快速地开始使用云引擎，请查看 [云引擎开发指南 § 快速开始](/sdk/engine/cloud-engine#快速开始)。
:::

所有 .NET 项目都必须在根目录包含一个 `app.sln` 文件才会被云引擎正确识别，通常一个 .NET 项目的结构如下：

```
├── web
|    ├── StartUp.cs
|    ├── Program.cs
|    ├── web.csproj
|    └── wwwroot
|        ├── css
|        ├── lib
|        └── js
├── app.sln
└── global.json
```

如果你希望创建一个新的项目，推荐从我们的 [.NET 示例项目](https://github.com/leancloud/dotNET-getting-started) 开始。

## 启动命令

在完成构建后，云引擎会通过 `dotnet release/web.dll` 来启动应用。

## .NET 版本

目前云引擎仅提供 .NET 2.1.500 版本。

## 安装依赖和构建

云引擎会在云端使用 `dotnet restore app.sln` 来安装依赖；使用 `dotnet publish -o release -c Release` 来进行构建。

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

模板项目已经集成了 .NET SDK，并且包含 SDK 初始化的逻辑。

如果自行接入其他框架，则需要自己添加依赖：

```sh
dotnet add package LeanCloud.Storage
```

同时也需要自行初始化 SDK：

```cs
LCEngine.Initialize(services);
```


### 使用数据存储服务

<LeanstorageUsages />

## 云端环境

### 绑定自定义域名

<CloudCustomDomain />

### 负载均衡和加速节点

<CloudLoadBalancer only='dotnet' />

### 环境变量

<CloudEnvironments />

### 日志

<CloudLogs only='dotnet' />

### 时区

<CloudTimezone />

### 文件系统

<CloudFilesystem />

### 出入口 IP 地址

<CloudInternetAddress />

## 疑难问题
