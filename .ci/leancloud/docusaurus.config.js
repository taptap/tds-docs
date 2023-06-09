// @ts-check

const PREVIEW = process.env.PREVIEW ?? "false";

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "LeanCloud 开发者文档",
  url: "https://docs.leancloud.cn",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/lc-favicon.ico",
  trailingSlash: true,
  customFields: {
    searchUrl: "https://lc-doc-search-api.cn-e1.leanapp.cn/search",
    searchProviderName: "LeanDB Elasticsearch",
    searchProviderWebsite: "https://docs.leancloud.cn/sdk/engine/database/es/",
    mainDomainHost: "https://www.leancloud.cn",
    dcDomainHost: "https://www.leancloud.cn",
  },

  i18n: {
    localeConfigs: {
      en: {
        label: "English",
      },
      "zh-Hans": {
        label: "简体中文",
      },
    },
    defaultLocale: "zh-Hans",
    locales: ["zh-Hans", "en"],
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          routeBasePath: "/",
          lastVersion: "current",
          versions: {
            current: {
              label: "v3",
            },
          },
        },
        theme: {
          customCss: require.resolve("./src/styles/index.scss"),
        },
        googleAnalytics: {
          trackingID: "UA-73963350-1",
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        items: [
          {
            label: "文档首页",
             to: "/",
            position: "right",
            activeBaseRegex: "^/(?!.+)",
          },
          {
            label: 'API文档',
            position: 'right',
            items: [
              {
                label: 'Android/Java SDK API',
                href: 'https://leancloud.cn/api-docs/android/index.html',
                activeBaseRegex: 'none',
              },
              {
                label: 'Objective-C SDK API',
                to: 'https://leancloud.cn/api-docs/iOS/index.html',
                activeBaseRegex: 'none',
              },
              {
                label: 'Swfit SDK API',
                to: 'https://leancloud.cn/api-docs/swift/index.html',
                activeBaseRegex: 'none',
              },
              {
                label: 'Flutter 数据存储 SDK API',
                to: 'https://pub.dev/documentation/leancloud_storage/latest/leancloud_storage/leancloud_storage-library.html',
                activeBaseRegex: 'none',
              },
              {
                label: 'Flutter 即时通讯 SDK API',
                to: 'https://pub.dev/documentation/leancloud_official_plugin/latest/leancloud_plugin/leancloud_plugin-library.html',
                activeBaseRegex: 'none',
              },
              {
                label: 'JavaScript 数据存储 SDK API',
                to: 'https://leancloud.github.io/javascript-sdk/docs/',
                activeBaseRegex: 'none',
              },
              {
                label: 'JavaScript 即时通讯 SDK API',
                to: 'https://leancloud.github.io/js-realtime-sdk/docs/',
                activeBaseRegex: 'none',
              },
              {
                label: 'JavaScript 多人在线对战 SDK API',
                to: 'https://leancloud.github.io/Play-SDK-JS/doc/global.html',
                activeBaseRegex: 'none',
              },
              {
                label: 'Python SDK API',
                to: 'https://leancloud.github.io/python-sdk/',
                activeBaseRegex: 'none',
              },
              {
                label: 'PHP SDK API',
                to: 'https://leancloud.github.io/php-sdk/',
                activeBaseRegex: 'none',
              },
              {
                label: 'Go SDK API',
                to: 'https://pkg.go.dev/github.com/leancloud/go-sdk/leancloud',
                activeBaseRegex: 'none',
              },
              {
                label: '.NET SDK API',
                to: 'https://leancloud.github.io/csharp-sdk/html/',
                activeBaseRegex: 'none',
              }
            ],
          },
          {
            label: '资源下载',
            position: 'right',
            items: [
              {
                label: 'SDK',
                href: '/sdk/sdk-page/',
                activeBaseRegex: 'none',
              },
              {
                label: 'Demo',
                to: '/demo',
                activeBaseRegex: 'none',
              },
            ],
          }
         
        ],
      },
      prism: {
        theme: require("./src/theme/prism-taptap"),
        additionalLanguages: ["csharp", "java", "php", "groovy", "swift", "dart"],
      },
      image: "/img/logo.svg",
      metadata: [
        {
          name: "keywords",
          content: "leancloud 开发者 文档",
        },
      ],
      colorMode: {
        defaultMode: "light",
        disableSwitch: true,
      },
    }),

  plugins: ["docusaurus-plugin-sass"],
};

module.exports = config;
