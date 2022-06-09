// @ts-check

const PREVIEW = process.env.PREVIEW ?? "false";

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "TapTap Developer Documentation",
  url: "https://developer.taptap.io",
  baseUrl: PREVIEW === "true" ? "/" : "/docs/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",
  trailingSlash: true,
  customFields: {
    searchUrl: "https://tds-doc-search-api.avosapps.us/search",
    searchProviderName: "LeanDB Elasticsearch",
    searchProviderWebsite:
      "https://developer.taptap.io/docs/sdk/engine/database/es/",
    mainDomainHost: "https://www.taptap.io",
    dcDomainHost: "https://developer.taptap.io",
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
    defaultLocale: "en",
    locales: ["en", "zh-Hans"],
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
            activeBaseRegex: `^${
              PREVIEW === "true" ? "/" : "/docs/"
            }(zh-Hans/)?(?!.+)`,
          },
          {
            label: "游戏商店",
            to: "store",
            position: "right",
          },
          {
            label: "游戏服务",
            to: "sdk",
            position: "right",
          },
          {
            label: "下载",
            position: "right",
            items: [
              {
                label: "设计资源",
                to: "/design",
              },
              {
                label: "SDK 工具包",
                to: "/tap-download",
              },
            ],
          },
          {
            type: "localeDropdown",
            position: "right",
          },
        ],
      },
      prism: {
        theme: require("./src/theme/prism-taptap"),
        additionalLanguages: ["csharp", "java", "php", "groovy"],
      },
      image: "/img/logo.svg",
      metadata: [
        {
          name: "keywords",
          content: "taptap tds developer documentation",
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
