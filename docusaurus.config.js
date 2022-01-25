// @ts-check

/* Environment variables */
const BRAND = process.env.BRAND ?? "tds";
const REGION = process.env.REGION ?? "cn";
const PREVIEW = process.env.PREVIEW ?? "false";

/* Configs for different versions */
const CONFIG_TDS_CN = {
  root: {
    title: "TapTap 开发者文档",
    url: "https://developer.taptap.com",
    baseUrl: PREVIEW === "true" ? "/" : "/docs/",
    favicon: "/img/favicon.ico",
  },
  custom: {
    searchUrl: "https://tds-doc-search-api.cn-e1.leanapp.cn/search",
    mainDomainHost: "https://www.taptap.com",
    dcDomainHost: "https://developer.taptap.com",
  },
  keywords: "taptap tds 开发者 文档",
  i18n: { defaultLocale: "zh-Hans", locales: ["zh-Hans", "en"] },
};

const CONFIG_TDS_GLOBAL = {
  root: {
    title: "TapTap Developer Documentation",
    url: "https://developer.taptap.io",
    baseUrl: PREVIEW === "true" ? "/" : "/docs/",
    favicon: "/img/favicon.ico",
  },
  custom: {
    searchUrl: "https://tds-doc-search-api.avosapps.us/search",
    mainDomainHost: "https://www.taptap.io",
    dcDomainHost: "https://developer.taptap.io",
  },
  keywords: "taptap tds developer documentation",
  i18n: { defaultLocale: "en", locales: ["en"] },
};

const CONFIG_LEANCLOUD_CN = {
  root: {
    title: "LeanCloud 开发者文档",
    url: "https://docs.leancloud.cn",
    baseUrl: "/",
    favicon: "/img/lc-favicon.ico",
  },
  custom: {
    searchUrl: "", // TODO
    mainDomainHost: "https://www.leancloud.cn",
    dcDomainHost: "https://www.leancloud.cn",
  },
  keywords: "leancloud 开发者 文档",
  i18n: { defaultLocale: "zh-Hans", locales: ["zh-Hans"] },
};

const CONFIG =
  BRAND === "tds"
    ? REGION === "cn"
      ? CONFIG_TDS_CN
      : CONFIG_TDS_GLOBAL
    : CONFIG_LEANCLOUD_CN;

/* Navbar items for different versions */
const NAVBAR_ITEMS_COMMON = [
  {
    label: "文档首页",
    to: "/",
    position: "right",
    activeBaseRegex: "^" + CONFIG.root.baseUrl + "(?!.+)",
  },
];

const NAVBAR_ITEMS_TDS = [
  ...NAVBAR_ITEMS_COMMON,
  {
    label: "游戏商店",
    to: "store",
    position: "right",
  },
];

const NAVBAR_ITEMS_TDS_CN = [
  ...NAVBAR_ITEMS_TDS,
  {
    label: "游戏服务",
    to: "sdk",
    position: "right",
  },
  {
    label: "API",
    to: "/sdk-api",
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
        label: "SDK工具包",
        to: "/tap-download",
      },
      {
        label: "Demos",
        to: "/demos",
      },
    ],
  },
  {
    type: "docsVersionDropdown",
    position: "right",
  },
  {
    type: "localeDropdown",
    position: "right",
  },
];

const NAVBAR_ITEMS =
  BRAND === "tds"
    ? REGION === "cn"
      ? NAVBAR_ITEMS_TDS_CN
      : NAVBAR_ITEMS_TDS
    : NAVBAR_ITEMS_COMMON;

/** @type {import('@docusaurus/types').Config} */
const config = {
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  organizationName: "taptap",
  projectName: "tds-docs",
  trailingSlash: true,
  ...CONFIG.root,

  customFields: {
    brand: BRAND,
    region: REGION,
    ...CONFIG.custom,
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
        items: NAVBAR_ITEMS,
      },
      prism: {
        theme: require("./src/theme/prism-taptap"),
        additionalLanguages: ["csharp", "java", "php", "groovy"],
      },
      image: "/img/logo.svg",
      metadata: [
        {
          name: "keywords",
          content: CONFIG.keywords,
        },
      ],
      colorMode: {
        defaultMode: "light",
        disableSwitch: true,
      },
    }),

  i18n: {
    localeConfigs: {
      en: {
        label: "English",
      },
      "zh-Hans": {
        label: "简体中文",
      },
    },
    ...CONFIG.i18n,
  },

  plugins: ["docusaurus-plugin-sass"],
};

module.exports = config;
