// @ts-check

/** env */
const REGION = process.env.TDS_REGION ?? 'cn';
const PREVIEW = process.env.PREVIEW ?? 'false';

const baseUrl = PREVIEW === 'true' ? '/' : '/docs/';

function regionDependantSidebarItems(items) {
  if (REGION === 'cn') {
    return items;
  } else {
    // TODO generate based on filesystem structure
    const hardCodedList = [
      'store-about',
      'store-devagreement',
      'store-agree',
      'store-admin',
      'store-register',
      'store-auth',
      'store-material',
      'store-creategame',
      'store-publish-game',
      'store-update',
      'store-test',
      'store-complaint',
      'store-contact',
      'store-faq',
    ].map((elem) => `store/${elem}`);
    return items.filter(item => hardCodedList.includes(item.id));
  }
}

/** @type {import('@docusaurus/types').Config} */
const config = {
  customFields: {
    region: REGION,
    searchUrl: REGION === 'cn'
      ? 'https://tds-doc-search-api.cn-e1.leanapp.cn/search'
      : 'https://tds-doc-search-api.avosapps.us/search',
    mainDomainHost: REGION === 'cn' ? 'https://www.taptap.com' : 'https://www.taptap.io',
    dcDomainHost: REGION === 'cn' ? 'https://developer.taptap.com' : 'https://developer.taptap.io',
  },
  title: REGION === 'cn' ? 'TapTap 开发者文档' : 'TapTap Developer Documentation',
  url: PREVIEW === 'true' ? 'https://doc-preview.cn-e1.leanapp.cn' : (REGION === 'cn' ? 'https://developer.taptap.com' : 'https://developer.taptap.io'),
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
      metadata: [{
        name: 'keywords',
        content: REGION === 'cn' ? 'taptap tds 开发者 文档' : 'taptap tds developer documentation',
      }],
      colorMode: {
        defaultMode: 'light',
        disableSwitch: true,
      },
      navbar: {
        items: REGION === 'cn' ? [
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
        ] : [
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
        ],
      },
      googleAnalytics: REGION === 'cn' ? {
        trackingID: 'UA-73963350-1',
      } : {
        trackingID: 'UA-73963350-4',
      },
    }),

  i18n: {
    defaultLocale: REGION === 'cn' ? 'zh-Hans' : 'en',
    locales: REGION === 'cn' ? ['zh-Hans', 'en'] : ['en'],
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
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          sidebarItemsGenerator: async function ({
            defaultSidebarItemsGenerator,
            ...args
          }) {
            const defaultItems = await defaultSidebarItemsGenerator(args);
            return regionDependantSidebarItems(defaultItems);
          },
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
