import { translate } from '@docusaurus/Translate';

type ActionCellLink = {
  label: string;
  to?: string;
  href?: string;
};

type Entry = {
  title: string;
  description: string;
  links: [] | [ActionCellLink] | [ActionCellLink, ActionCellLink];
  id: string;
}

export const entryList: (localePath: string, region: string) => Array<Entry> = (localePath: string, region: string) => {
  const isIntl = localePath !== '';
  const innerLinkSource: Array<Entry> = [
    {
      title: '游戏商店',
      description: '游戏商店配置相关服务说明',
      links: [
        {
          label: '查看更多',
          to: '/store',
        },
      ],
      id: 'store',
    },
    {
      title: '游戏服务',
      description: 'TDS为游戏开发提供的全套SDK服务',
      links: [
        {
          label: '查看更多',
          to: '/sdk',
        },
      ],
      id: 'sdk',
    },
    // {
    //   title: '社区运营指南',
    //   description: 'TapTap为开发者提供的社区新手攻略',
    //   links: [
    //     {
    //       label: '查看更多',
    //       to: '/community',
    //     }
    //   ],
    //   id: 'community',
    // },
    {
      title: '资源下载',
      description: 'TapTap相关品牌元素及开发工具包下载',
      links: [
        {
          label: '设计资源',
          to: '/design'
        },
        {
          label: 'SDK',
          to: '/tap-download',
        },
      ],
      id: 'download',
    },
    {
      title: '栏目收录申请',
      description: 'TapTap首页栏目申请',
      links: [
        {
          label: '查看更多',
          to: '/ad-apply',
        },
      ],
      id: 'apply'
    },
  ]

  // Ugly patching for now since these links may change in recent future.
  const innerLinks: Array<Entry> = innerLinkSource.map((elem) => {
    if (region === 'cn') {
      return elem;
    } else {
      if (elem.id === 'sdk') {
        elem.links = [];
        return elem;
      } else if (elem.id === 'download') {
        const brandResourcesLink: ActionCellLink = {
          label: '设计资源',
          href: 'https://www.taptap.io/about-us/brand-resources',
        };
        elem.links = [brandResourcesLink];
        return elem;
      } else if (elem.id === 'apply') {
        const applyLink: ActionCellLink = {
          label: '查看更多',
          href: 'https://www.taptap.io/doc/19',
        };
        elem.links = [applyLink];
        return elem;
      } else {
        return elem;
      }
    }
  })

  return innerLinks.map((i, index) => ({
    title: translate({
      message: i.title,
      id: `tds-home-${i.title}`,
      description: `from HomePage Cell ${index + 1} Title`,
    }),
    description: translate({
      message: i.description,
      id: `tds-home-${i.description}`,
      description: `from HomePage Cell ${index + 1} Desc`,
    }),
    links: i.links.map((link) => ({
      ...link,
      label: translate({
        message: link.label,
        id: `tds-home-link-${link.label}`,
        description: `from HomePage Cell Link`,
      }),
    })) as Entry['links'],
    id: i.id,
  }))
}
