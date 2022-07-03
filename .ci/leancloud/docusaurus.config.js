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
            // to: "/",
            to: "https://leancloud.cn/docs/",
            position: "right",
            activeBaseRegex: "^/(?!.+)",
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
