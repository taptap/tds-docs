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
            label: 'API 文档',
            position: 'right',
            items: [
              {
                label: 'Android/Java SDK API',
                href: 'https://leancloud.cn/api-docs/android/index.html',
              },
              {
                label: 'Objective-C SDK API',
                href: 'https://leancloud.cn/api-docs/iOS/index.html',
              },
              {
                label: 'Swfit SDK API',
                href: 'https://leancloud.cn/api-docs/swift/index.html',
              },
              {
                label: 'Flutter 数据存储 SDK API',
                href: 'https://pub.dev/documentation/leancloud_storage/latest/leancloud_storage/leancloud_storage-library.html',
              },
              {
                label: 'Flutter 即时通讯 SDK API',
                href: 'https://pub.dev/documentation/leancloud_official_plugin/latest/leancloud_plugin/leancloud_plugin-library.html',
              },
              {
                label: 'JavaScript 数据存储 SDK API',
                href: 'https://leancloud.github.io/javascript-sdk/docs/',
              },
              {
                label: 'JavaScript 多人在线对战 SDK API',
                href: 'https://leancloud.github.io/Play-SDK-JS/doc/global.html',
              },
              {
                label: 'Python SDK API',
                href: 'https://leancloud.github.io/python-sdk/',
              },
              {
                label: 'PHP SDK API',
                href: 'https://leancloud.github.io/php-sdk/',
              },
              {
                label: 'Go SDK API',
                href: 'https://pkg.go.dev/github.com/leancloud/go-sdk/leancloud',
              },
              {
                label: '.NET SDK API',
                href: 'https://leancloud.github.io/csharp-sdk/html/',
              }
            ],
          },
          {
            label: '资源',
            position: 'right',
            items: [
              {
                label: 'SDK',
                href: '/sdk/sdk-page/',
              },
              {
                label: 'Demo',
                to: '/demo',
              }
            ],
          },
          {
            label: "云课堂",
            to: "/classroom",
            position: "right",
          },
          {
            type: "localeDropdown",
            position: "right",
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
