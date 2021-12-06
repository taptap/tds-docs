// @ts-check

/** env */
const REGION = process.env.DOCUSAURUS_REGION;

const baseUrl = '/docs/';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: REGION == 'cn' ? 'TapTap 开发者文档' : 'TapTap Developer Documentation',
  url: REGION == 'cn' ? 'https://developer.taptap.com' : 'https://developer.taptap.io',
  baseUrl,
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: '/img/favicon.ico',
  trailingSlash: true,
  organizationName: 'TapTap',
  projectName: 'TapSDK-Doc',

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      prism: {
        theme: require('./src/theme/prism-taptap'),
        additionalLanguages: ['csharp', 'java', 'php', 'groovy'],
      },
      image: '/img/logo.svg',
      metadatas: [{
        name: 'keywords',
        content: 'taptap tds 开发者 文档中心'
      }],
      colorMode: {
        defaultMode: 'light',
        disableSwitch: true,
      },
      algolia: {
        apiKey: '9158d2e78cea72731892281efc0509c4',
        indexName: 'tap-sdk-doc',
        appId: 'TVQNXY05EF',
      },
      navbar: {
        items: [
          {
            label: '文档首页',
            to: '/',
            position: 'right',
            activeBaseRegex: '^' + baseUrl + '(?!.+)',
          },
          {
            label: '游戏商店',
            to: 'store',
            position: 'right',
          },
          {
            label: '游戏服务',
            to: 'sdk',
            position: 'right',
          },
          {
            label: 'API',
            to: '/sdk-api',
            position: 'right',
          },
  
          {
            label: '下载',
            position: 'right',
            items: [
              {
                label: '设计资源',
                to: '/design'
                //withRef: true,
                // i18nHref: {
                //   'zh-Hans': 'https://www.taptap.com/developer/location_page?force_region=CN&redirect_url=https://www.taptap.com/about-us/brand-resources',
                //   en: 'https://www.taptap.com/developer/location_page?force_region=US&redirect_url=https://www.taptap.com/about-us/brand-resources'
                // },
              },
              {
                label: 'SDK工具包',
                to: '/tap-download',
              },
              {
                label: 'Demos',
                to: '/demos',
              },
            ],
          },
          {
            type: 'docsVersionDropdown',
            position: 'right',
          },
          {
            type: 'localeDropdown',
            position: 'right',
          },
        ],
      },
      googleAnalytics: {
        trackingID: 'UA-73963350-1',
      },
    }),

  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans', 'en'],
    localeConfigs: {
      en: {
        label: 'English',
      },
      'zh-Hans': {
        label: '简体中文',
      },
    },
  },

  presets: [
    [
      '@docusaurus/preset-classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          routeBasePath: '/',
          lastVersion: 'current',
          versions: {
            current: {
              label: 'v3',
            },
          },
        },
        theme: {
          customCss: require.resolve('./src/styles/index.scss'),
        },
      }),
    ],
  ],

  plugins: ['docusaurus-plugin-sass'],
};

module.exports = config;
