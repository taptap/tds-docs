---
id: java
title: 云引擎 Java 运行环境
sidebar_label: Java
---

import {CLI_BINARY} from '/src/constants/env.ts';
import CloudEnvironments from '../_partials/cloud-environments.mdx';
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
import CodeBlock from '@theme/CodeBlock';

:::info
这篇文档是针对 Java 运行环境的深入介绍，如希望快速地开始使用云引擎，请查看 [快速开始部署云引擎应用](/sdk/engine/deploy/getting-started)。
:::

云引擎目前支持使用 Maven 构建出的 WAR 或 JAR 项目。也支持直接上传 WAR 包。

如果要开始一个新的项目，建议从我们的示例项目开始：

- [Servlet 示例项目](https://github.com/leancloud/java-war-getting-started)
- [Spring Boot 示例项目](https://github.com/leancloud/spring-boot-getting-started)

:::caution
Java 对内存的需求较高，体验版实例的 256M 内存可能会导致 Java 进程启动时内存不足而崩溃（OOM）导致部署失败，或运行时内存不足而频繁重启。

我们建议 Java 项目至少选用 512 MB 以上的内存，Spring Boot 项目至少选用 1024 MB 以上的内存，并在之后的运行过程中根据内存用量统计随时调整。调整内存规格的方法详见 [云引擎平台功能 § 调整实例规格和数量](/sdk/engine/deploy/platform#调整实例规格和数量)。
:::

## 启动命令

在完成构建后，云引擎会在 `target` 目录下查找 `.war` 或者 `.jar` 文件：

- 如果找到 `.war` 会将其放入 Servlet 容器（Jetty 9.x）来运行
- 如果找到 `.jar` 会通过 `java -jar` 来运行

### 配置 JVM 参数

云引擎运行 Java 应用时，会自动将 `-Xmx` 参数设置为实例规格的 70%，剩下的 30% 留给堆外内存和其他开销。如果你的应用比较特殊（比如大量使用堆外内存）可以自己定制 `-Xmx` 参数。假设使用 2 GB 内存规格的实例运行，则可以在云引擎的设置页面增加「自定义环境变量」，名称为 `JAVA_OPTS`，值为 `-Xmx1500m`，这样会限制 JVM 堆最大为 1.5 GB，剩下 500 MB 留给持久代、堆外内存或者其他一些杂项使用。**注意：`-Xmx` 参数如果设置得过小可能会导致大量 CPU 消耗在反复的的 GC 任务上**。

## 配置 Java 版本

在项目根目录创建一个 `system.properties` 即可配置 Java 的版本：

```plain title='system.properties'
java.runtime.version=11
```

目前云引擎支持的版本有 AdoptOpenJDK `8`、`11`、`12`、`13`、`14`。

:::note
对于新创建的应用，如未设置 Java 版本，云引擎会默认使用支持的版本中最新的稳定版本（LTS）。在 2021-09-02 之前创建的分组因兼容考虑会默认使用 Java `8`。
:::

## 直接上传 WAR 包

在本地构建（如使用 `mvn package`）出 WAR 包后，可以在使用命令行工具部署时添加 `--war` 选项表示上传 WAR 包而不是源代码：

<CodeBlock className='sh'>
{`${CLI_BINARY} deploy --war`}
</CodeBlock>

这种情况下在云端不会有安装依赖和构建的过程，WAR 包会被直接放入 Servlet 容器运行。

## 安装依赖和构建

如果上传了源代码，云引擎会使用 Maven 来安装 `pom.xml` 中列出的依赖，然后使用 `mvn package` 来进行构建。

## 自定义构建过程

<BuildingScripts />

### 构建日志

<BuildingBuildLogs />

### 系统级依赖

<BuildingSystemDependencies />

## 健康检查

<CloudHealthCheck />

## 云端环境

### 绑定自定义域名

<CloudCustomDomain />

### 负载均衡和加速节点

<CloudLoadBalancer only='java' />

### 环境变量

<CloudEnvironments />

### 日志

<CloudLogs only='java' />

### 时区

<CloudTimezone />

### 文件系统

<CloudFilesystem />

### 出入口 IP 地址

<CloudInternetAddress />

## 疑难问题
### 如何脱离命令行工具本地启动云引擎 Java 项目？

设置云引擎运行需要的环境变量后，可以通过脱离命令行工具，直接运行相应命令或使用 IDE 本地启动 Java 项目。

通过命令行启动 Jetty 项目或 JAR 项目，先设置环境变量：

```sh
eval "$(lean env)"
```

提示：命令 `lean env` 可以输出当前应用所需环境变量的设置语句，外层的 `eval` 是直接执行这些语句。
Windows 系统下需要手动设置 `lean env` 输出的环境变量。

如果是 Jetty 项目，运行：

```
mvn jetty:run
```

如果是 JAR 项目，使用 Maven 打包项目并运行：

```sh
mvn package
java -jar target/{zipped jar file}
```

使用 Eclipse 启动应用：

首先确保 Eclipse 已经安装 Maven 插件，并将项目以 **Maven Project** 方式导入 Eclipse 中。

在 **Package Explorer** 视图右键点击项目：

- 如果是 Jetty 项目，选择 **Run As** > **Maven build…**，将 **Main** 标签页的 **Goals** 设置为 `jetty:run`。
- 如果是 JAR 项目，选择 **Run As** > **Run Configurations…**，选择 `Application`，设置 `Main class:`（示例项目为 `cn.leancloud.demo.todo.Application`）。

最后在 **Environment** 标签页增加以下环境变量和相应的值：

名称 | 值
--- | ---
`LEANCLOUD_APP_ENV` | `development`
`LEANCLOUD_APP_ID` | `{{appid}}`
`LEANCLOUD_APP_KEY` | `{{appkey}}`
`LEANCLOUD_APP_MASTER_KEY` | `{{masterkey}}`
`LEANCLOUD_APP_PORT` | `3000`

配置完成后，以后只需点击 run 按钮即可启动应用。


### 如何在云引擎中依赖内部 library（也称为「二方库」）？

云引擎构建环境只能访问公开的程序库（library），如果你项目中使用了一些公司内部的依赖库，可以按照如下方式进行引用：

1. 首先在项目根目录下新建 libs 目录，把所有依赖的 jar 文件拷贝进来；
2. 然后在项目根目录下新建 leanengine.yaml 文件，并自定义 install 环节（详见下文示例）；
3. 最后修改 pom.xml 中依赖项和 `spring-boot-maven-plugin` 配置，增加 `includeSystemScope` 设置项（详见下文示例）；

最终的工程目录结构如下：

```
{root}
|---libs
|       |- yourdependency.jar etc.
|---leanengine.yaml
\---pom.xml
```

leanengine.yaml 内容如下：

```yaml
install:
  - require:
    - libs
  - {use: 'default'}
```

pom.xml 中增加依赖项目：

```xml
<dependency>
    <groupId>com.sample</groupId>
    <artifactId>sample</artifactId>
    <version>1.0</version>
    <scope>system</scope>
    <systemPath>${project.basedir}/libs/yourdependency.jar</systemPath>
</dependency>
```

pom.xml 中对 `spring-boot-maven-plugin` 改动如下：

```xml
<plugin>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-maven-plugin</artifactId>
  <configuration>
    <executable>true</executable>
    <includeSystemScope>true</includeSystemScope>
  </configuration>
</plugin>
```

