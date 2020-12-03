module.exports = {
  title: 'TapSDK',
  tagline: 'The tagline of my site',
  url: 'https://your-docusaurus-test-site.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'facebook', // Usually your GitHub org/user name.
  projectName: 'docusaurus', // Usually your repo name.
  themeConfig: {
    algolia: {
      apiKey: '9158d2e78cea72731892281efc0509c4',
      indexName: 'tap-sdk-doc',
      appId: 'TVQNXY05EF',
      contextualSearch: true,

      searchParameters: {},

    },
    navbar: {
      title: 'TapSDK Doc',
      logo: {
        alt: 'Tap Logo',
        src: 'img/favicon.ico',
      },
      items: [
        {
          type: 'doc',
          //to: '/',
          docId: 'tap-android',
          //activeBasePath: 'docs',
          label: 'TapSDK',
          position: 'left',
        },
        {
          //to: '/',
          type: 'doc',
          //activeBasePath: 'docs',
          docId: 'tap-api',
          label: 'API',
          position: 'left',
        },
        // {
        //   to: 'blog',
        //   label: 'Blog',
        //   position: 'left'
        // },
        // {
        //   href: 'https://github.com/facebook/docusaurus',
        //   label: 'Github',
        //   position: 'right',
        // },
      ],
    },
    footer: {
      // style: 'dark',
      // links: [
      //   {
      //     title: 'Docs',
      //     items: [
      //       {
      //         label: 'Style Guide',
      //         to: 'docs/',
      //       },
      //       {
      //         label: 'Second Doc',
      //         to: 'docs/doc2/',
      //       },
      //     ],
      //   },
      //   {
      //     title: 'Community',
      //     items: [
      //       {
      //         label: 'Stack Overflow',
      //         href: 'https://stackoverflow.com/questions/tagged/docusaurus',
      //       },
      //       {
      //         label: 'Discord',
      //         href: 'https://discordapp.com/invite/docusaurus',
      //       },
      //       {
      //         label: 'Twitter',
      //         href: 'https://twitter.com/docusaurus',
      //       },
      //     ],
      //   },
      //   {
      //     title: 'More',
      //     items: [
      //       {
      //         label: 'Blog',
      //         to: 'blog',
      //       },
      //       {
      //         label: 'GitHub',
      //         href: 'https://github.com/facebook/docusaurus',
      //       },
      //     ],
      //   },
      // ],
      copyright: `Copyright © ${new Date().getFullYear()} TapTap, Inc. Built with Docusaurus.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          routeBasePath: "/",
          // Please change this to your repo.
          // editUrl:
          //   'https://github.com/facebook/docusaurus/edit/master/website/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // editUrl:
          //   'https://github.com/facebook/docusaurus/edit/master/website/blog/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
