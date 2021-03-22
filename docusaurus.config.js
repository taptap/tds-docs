/**
 * doc: https://v2.docusaurus.io/docs/docusaurus.config.js
 * */

const baseUrl = '/v2-doc/';

module.exports = {
  title: 'TapTap 开发者文档中心',
  url: 'https://developer.taptap.com/v2-doc',
  baseUrl: baseUrl,
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: '/img/favicon.ico',
  organizationName: 'TapTap',
  projectName: 'TapSDK Document',
  themeConfig: {
    prism: {
      theme: require('prism-react-renderer/themes/dracula'),
      additionalLanguages: ['csharp', 'java'],
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
      title: 'TapSDK Doc',
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
          label: 'SDK功能',
          to: 'sdk',
          position: 'right',
        },
        {
          label: '资源下载',
          position: 'right',
          items: [
            {
              label: '品牌素材',
              href: 'https://www.taptap.com/about-us/brand-resources',
            },
            {
              label: 'SDK工具包',
              to: '/sdk/tap-download',
            },
          ],
        },
        {
          type: 'localeDropdown',
          position: 'right',
        },
      ],
    },
    footer: {}
  },
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
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          routeBasePath: "/",
        },
        theme: {
          customCss: require.resolve('./src/styles/index.scss'),
        },
      },
    ],
  ],
  plugins: ['docusaurus-plugin-sass'],
};
