type ActionCellLink = {
  label: string;
  to: string;
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
        to: '/1'
      }
    ]
  },
  {
    title: 'SDK功能',
    description: 'TDS为游戏开发提供的全套SDK服务',
    links: [
      {
        label: '查看更多',
        to: '/2'
      }
    ]
  },
  {
    title: '资源下载',
    description: 'TapTap相关品牌元素及开发工具包下载',
    links: [
      {
        label: '品牌素材库',
        to: '/3'
      },
      {
        label: 'SDK工具包',
        to: '/4'
      }
    ]
  },
  {
    title: '栏目收录申请',
    description: 'TapTap首页栏目申请',
    links: [
      {
        label: '查看更多',
        to: '/5'
      }
    ]
  },
]