import sdkVersions from "../../docComponents/sdkVersions";

export const ENTRIES = [
  {
    title: "通用说明",
    description:
      "SDK 名称：LeanCloud 云服务 SDK。           开发者：美味书签（北京）信息技术有限公司。           主要功能：数据存储，即时通讯，混合推送，实时对战等。",
    links: [
      {
        label: "个人信息处理与隐私政策",
        to: "/sdk/start/privacy/",
      },
      {
        label: "合规使用说明",
        to: "/sdk/start/compliance/",
      },
    ],
  },
  {
    title: "iOS",
    description:
      "Objective-C SDK 包含数据存储、即时通讯与推送、社交、用户反馈、全文搜索等模块。Swift SDK 包含数据存储、即时通讯与推送等功能。",
    links: [
      {
        label: `Objective-C SDK (v${sdkVersions.leancloud.objc})`,
        href: "https://releases.leanapp.cn/#/leancloud/objc-sdk/releases",
      },
      {
        label: `Swift SDK (v${sdkVersions.leancloud.swift})`,
        href: "https://releases.leanapp.cn/#/leancloud/swift-sdk/releases",
      },
    ],
  },
  {
    title: "JavaScript",
    description: "根据功能需求选择对应的 SDK",
    links: [
      {
        label: `数据存储 SDK ${sdkVersions.leancloud.js.storage})`,
        href: "https://releases.leanapp.cn/#/leancloud/javascript-sdk/releases",
      },
      {
        label: `即时通讯 SDK ${sdkVersions.leancloud.js.realtime})`,
        href: "https://releases.leanapp.cn/#/leancloud/js-realtime-sdk/releases",
      },
    ],
  },
  {
    title: "Java",
    description:
      "包含 LeanCloud 平台全部功能的客户端接口，适用于 Java 和 Android 两个平台。SDK 中所有 API 接口与 LeanCloud 云端交互严格遵循 LeanCloud REST API 规范，并且全部采用了 RxJava 风格来设计。",
    links: [
      {
        label: `Java SDK (v${sdkVersions.leancloud.java})`,
        href: "https://releases.leanapp.cn/#/leancloud/java-unified-sdk/releases",
      },
    ],
  },
  {
    title: ".NET",
    description:
      "基于 .Net Standard 2.0 接口标准实现，支持 Unity 2018.1+、.NET Core 2.0+、.NET Framework 4.6.1+、Mono 5.4+ 等框架。阅读 SDK 安装指南 获取帮助，或者前往 Nuget 进行安装。",
    links: [
      {
        label: `.NET SDK (v${sdkVersions.leancloud.csharp})`,
        href: "https://github.com/leancloud/csharp-sdk",
      },
    ],
  },
  {
    title: "其他 SDK（开放源码）",
    description:
      "包括主要用于服务端的 Python、PHP SDK，以及旧版本的 Android、Java SDK. 可参考 SDK 安装指南 了解安装方法。",
    links: [
      {
        label: "Flutter 数据存储 SDK",
        href: "https://pub.dev/packages/leancloud_storage#-changelog-tab-",
      },
      {
        label: "Flutter 即时通讯 SDK",
        href: "https://pub.dev/packages/leancloud_official_plugin#-changelog-tab-",
      },
      {
        label: "Android SDK（旧版）",
        href: "https://github.com/leancloud/android-sdk-all",
      },
      {
        label: "Java SDK（旧版）",
        href: "https://github.com/leancloud/java-sdk",
      },
      {
        label: "Python SDK",
        href: "https://github.com/leancloud/python-sdk/",
      },
      {
        label: "PHP SDK",
        href: "https://github.com/leancloud/php-sdk/",
      },
    ],
  },
];
