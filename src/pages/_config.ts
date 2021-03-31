import { translate } from '@docusaurus/Translate';

type ActionCellLink = {
  label: string;
  to?: string;
  href?: string;
};

type Entry = {
  title: string;
  description: string;
  links?: [ActionCellLink] | [ActionCellLink, ActionCellLink];
}

export const entryList: Array<Entry> = [
  {
    title: '游戏商店',
    description: '游戏商店配置相关服务说明',
    links: [
      {
        label: '查看更多',
        to: '/store',
      },
    ],
  },
  {
    title: 'SDK功能',
    description: 'TDS为游戏开发提供的全套SDK服务',
    links: [
      {
        label: '查看更多',
        to: '/sdk',
      },
    ],
  },
  {
    title: '资源下载',
    description: 'TapTap相关品牌元素及开发工具包下载',
    links: [
      {
        label: '品牌素材库',
        href: 'https://www.taptap.com/about-us/brand-resources',
      },
      // {
      //   label: 'SDK工具包',
      //   to: '/sdk/tap-download',
      // },
    ],
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
  },
].map((i, index) => ({
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
}))
