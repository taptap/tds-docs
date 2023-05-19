import { translate } from "@docusaurus/Translate";

/* 内部地址 */
type ActionCellLinkInternal = {
  label: string;
  to: string;
};

/* 外跳地址 */
type ActionCellLinkExternal = {
  label: string;
  href: string;
};

type Entry = {
  title: string;
  description?: string;
  links: (ActionCellLinkInternal | ActionCellLinkExternal)[];
};






export const getEntries = (brand: string, region: string): Entry[] => {
 

  const ENTRIES_LEANCLOUD: Entry[] =[{
    "title": "iOS",
    "description": "Objective-C SDK 包含数据存储、即时通讯与推送、社交、用户反馈、全文搜索等模块。Swift SDK 包含数据存储、即时通讯与推送等功能。",
    "links": [
      {
        "label": "Objective-C SDK",
        "to": "https://releases.leanapp.cn/#/leancloud/objc-sdk/releases"
      },
      {
        "label": "Swift SDK ",
        "to": "https://releases.leanapp.cn/#/leancloud/swift-sdk/releases"
      }
    ]
  },
  {
    "title": "JavaScript",
    "description": "根据功能需求选择对应的 SDK",
    "links": [
      {
        "label": "数据存储 SDK",
        "to": "https://releases.leanapp.cn/#/leancloud/javascript-sdk/releases"
      },
      {
        "label": "即时通讯 SDK",
        "to": "https://releases.leanapp.cn/#/leancloud/js-realtime-sdk/releases"
      }
    ]
  },
  {
    "title": "Java",
    "description": "包含 LeanCloud 平台全部功能的客户端接口，适用于 Java 和 Android 两个平台。SDK 中所有 API 接口与 LeanCloud 云端交互严格遵循 LeanCloud REST API 规范，并且全部采用了 RxJava 风格来设计。",
    "links": [
      {
        "label": "Java SDK",
        "to": "https://releases.leanapp.cn/#/leancloud/java-unified-sdk/releases"
      }
    ]
  },
  {
    "title": ".NET（新版）",
    "description": "基于 .Net Standard 2.0 接口标准实现，支持 Unity 2018.1+、.NET Core 2.0+、.NET Framework 4.6.1+、Mono 5.4+ 等框架。阅读 SDK 安装指南 获取帮助，或者前往 Nuget 进行安装。",
    "links": [
      {
        "label": ".NET SDK",
        "to": "https://github.com/leancloud/csharp-sdk"
      }
    ]
  },
  {
    "title": "Flutter",
    "description": "Leancloud Storage SDK 包含数据存储模块的全部功能（暂不支持 LiveQuery）。开发者可以在 Flutter 项目中直接使用 Dart 来编写相关代码。\n\nFlutter Plugin SDK 包含即时通信模块的全部功能，Flutter Plugin SDK 基于 Swift SDK 以及 Java Unified SDK 开发。",
    "links": [
      {
        "label": "数据存储 SDK",
        "to": "https://pub.dev/packages/leancloud_storage#-changelog-tab-"
      },
      {
        "label": "即时通讯 SDK",
        "to": "https://pub.dev/packages/leancloud_official_plugin#-changelog-tab-"
      }
    ]
  },
  {
    "title": "其他 SDK（开放源码）",
    "description": "包括主要用于服务端的 Python、PHP SDK，以及旧版本的 Android、Java SDK. 可参考 SDK 安装指南 了解安装方法。",
    "links": [
      {
        "label": "Android SDK（旧版）",
        "to": "https://github.com/leancloud/android-sdk-all"
      },
      {
        "label": "Java SDK（旧版）",
        "to": "https://github.com/leancloud/java-sdk"
      },
      {
        "label": "Python SDK",
        "to": "https://github.com/leancloud/python-sdk/"
      },
      {
        "label": "PHP SDK",
        "to": "https://github.com/leancloud/php-sdk/"
      }
    ]
  }
]
  ;

  const entries =  ENTRIES_LEANCLOUD ;

  return entries.map((entry) => ({
    title: translate({
      message: entry.title,
      id: `tds-home-${entry.title}`,
    }),
    ...(entry.description
      ? {
          description: translate({
            message: entry.description,
            id: `tds-home-${entry.description}`,
          }),
        }
      : {}),
    links: entry.links.map((link) => ({
      ...link,
      label: translate({
        message: link.label,
        id: `tds-home-link-${link.label}`,
      }),
    })),
  }));
};
