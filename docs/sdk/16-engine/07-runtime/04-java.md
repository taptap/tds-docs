---
id: java
title: 云引擎 Java 运行环境
sidebar_label: Java
---

云引擎目前支持 Java 8、11、12、13、14 运行环境和 war 包运行，你的项目需要遵循一定格式才会被云引擎识别并运行。

云引擎 Java 运行环境使用 Maven 进行构建，所以 LeanEngine Java 项目必须有 `$PROJECT_DIR/pom.xml` 文件，该文件为整个项目的配置文件。构建完成后云引擎会尝试到 `$PROJECT_DIR/target` 目录下寻找可以使用的包：

- WAR：如果项目打包成 WAR 文件，则云引擎会将其放入 Servlet 容器（当前是 Jetty 9.x）来运行。
- JAR：如果项目打包成 JAR 文件，则云引擎会通过 `java -jar <packageName>.jar` 来运行。

我们建议使用示例项目做为起步，因为一些细节的开发环境的配置会让开发调试方便很多：

- [`java-war-getting-started`](https://github.com/leancloud/java-war-getting-started)：使用 Servlet，集成 LeanEngine Java SDK 的一个简单项目，打包成 WAR 文件。
- [`spring-boot-getting-started`](https://github.com/leancloud/spring-boot-getting-started)：使用 [Spring Boot](https://projects.spring.io/spring-boot/) 作为项目框架，集成 LeanEngine Java SDK 的一个简单的项目，打包成 JAR 文件。

Java 运行环境对内存的使用较多，所以建议：

- 以 [示例项目](https://github.com/leancloud/java-war-getting-started) 起步的应用，建议使用 512 MB 或以上规格的实例。
- 使用 [Spring Boot](https://projects.spring.io/spring-boot/) 的应用，建议使用 1 GB 或以上规格的实例。
- 本地启动并模拟完成主要业务流程操作，待应用充分初始化后，根据 Java 进程内存占用量选择相应的实例规格，需要注意保留一定的余量用以应对请求高峰。

如果云引擎实例规格**选择不当**，可能造成应用启动时因为内存溢出（OOM）导致部署失败，或运行期内存溢出导致应用频繁重启。

Java 云引擎默认使用 Java 11 运行环境，如果希望使用其他版本的 Java，可以在项目根目录创建一个名为 `system.properties` 的文件，指定 `java.runtime.version`：

```
java.runtime.version=14
```

#### 打包成 WAR 文件的项目

首先确认项目 `pom.xml` 中配置了 [Jetty plugin](https://www.eclipse.org/jetty/documentation/9.4.x/jetty-maven-plugin.html)，并且 web server 的端口通过环境变量 `LEANCLOUD_APP_PORT` 获取，具体配置可以参考我们的 [示例代码](https://github.com/leancloud/java-war-getting-started/blob/master/pom.xml)。

然后使用 Maven 安装依赖并打包：

```sh
mvn package
```

然后使用命令行工具本地启动应用：

```sh
tds up
```

更多有关命令行工具和本地调试的内容请参考[云引擎命令行工具使用指南](/sdk/engine/guide/cli/)。

除了使用命令行工具本地启动应用外，还可以手动设置相应环境变量后，直接启动应用，详见[云引擎 FAQ](/sdk/engine/guide/faq/)。
