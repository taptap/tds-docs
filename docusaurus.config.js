/**
 * doc: https://www.docusaurus.cn/docs/docusaurus.config.js
 * */

const baseUrl = '/v2-doc/';

module.exports = {
  title: 'TapTap 开发者文档中心',
  url: 'https://developer.taptap.com', // todo should overwrite
  baseUrl: baseUrl,
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: '/img/favicon.ico',
  organizationName: 'TapTap',
  projectName: 'TapSDK Document',
  themeConfig: {
    image: '/img/logo.svg',
    // todo SEO 数据
    metadatas: [{
      name: 'keywords',
      content: 'taptap tds'
    }],
    colorMode: {
      defaultMode: 'light',
      disableSwitch: true,
    },
    algolia: {
      apiKey: '9158d2e78cea72731892281efc0509c4',
      indexName: 'tap-sdk-doc',
      appId: 'TVQNXY05EF',
      contextualSearch: true,
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
      ],
    },
    footer: {}
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
