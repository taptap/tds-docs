---
id: dotnet
title: 云引擎 .Net (C#) 运行环境
sidebar_label: .Net (C#)
---
为了更为简洁的支持 .NET Core 的 Web 项目，云引擎要求您的源代码目录如下：

```
├── app.sln
├── web
|    ├── StartUp.cs
|    ├── Program.cs
|    ├── web.csproj
|    └── wwwroot
|        ├── css
|        ├── lib
|        └── js
└── global.json
```

示例项目 [`dotNET-getting-started`](https://github.com/leancloud/dotNET-getting-started) 是推荐的模板。

其中根目录必须拥有一个 `app.sln` 解决方案文件 和一个 `web/` 文件夹，这是必须的（这一硬性规定会将在未来取消，取消之后开发者自定义自己的项目结构）。
