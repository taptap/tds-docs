import { translate } from "@docusaurus/Translate";

/* 内部地址 */
type ActionCellLinkInternal = {
  label: string;
  to: string;
};

/* 外跳地址 */
type ActionCellLinkExternal = {
  label: string;
  href: string;
};

type Entry = {
  title: string;
  description: string;
  links: (ActionCellLinkInternal | ActionCellLinkExternal)[];
};

export const getEntries = (brand: string, region: string): Entry[] => {
  const ENTRIES_TDS: Entry[] = [
    {
      title: "游戏商店",
      description: "游戏商店配置相关服务说明",
      links: [
        {
          label: "查看更多",
          to: "/store",
        },
      ],
    },
    {
      title: "游戏服务",
      description: "TDS 为游戏开发提供的全套 SDK 服务",
      links: [
        {
          label: "查看更多",
          to: "/sdk",
        },
      ]
    },
    ...(region === "cn"
      ? [
          {
            title: "社区运营指南",
            description: "TapTap 为开发者提供的社区新手攻略",
            links: [
              {
                label: "查看更多",
                to: "/community",
              },
            ],
          },
        ]
      : []),
    {
      title: "资源下载",
      description: "TapTap 相关品牌元素及开发工具包下载",
      links: [
        {
          label: "设计资源",
          to: "/design",
        },
        {
          label: "SDK",
          to: "/tap-download",
        },
      ],
    },
    {
      title: "平台功能申请",
      description: "TapTap 平台功能申请",
      links:
        region === "cn"
          ? [
              {
                label: "查看更多",
                to: "/ad-apply",
              },
            ]
          : [
              {
                label: "查看更多",
                href: "https://www.taptap.io/doc/19",
              },
            ],
    },
  ];

  const ENTRIES_LEANCLOUD: Entry[] = [
    {
      title: "云引擎",
      description: "",
      links: [
        {
          label: "开发指南",
          to: "/sdk/engine/overview",
        },
      ],
    },
  ];

  if (brand === "leancloud") {
    return ENTRIES_LEANCLOUD;
  } else {
    return ENTRIES_TDS.map((entry, index) => ({
      title: translate({
        message: entry.title,
        id: `tds-home-${entry.title}`,
        description: `from HomePage Cell ${index + 1} Title`,
      }),
      description: translate({
        message: entry.description,
        id: `tds-home-${entry.description}`,
        description: `from HomePage Cell ${index + 1} Desc`,
      }),
      links: entry.links.map((link) => ({
        ...link,
        label: translate({
          message: link.label,
          id: `tds-home-link-${link.label}`,
          description: `from HomePage Cell Link`,
        }),
      })),
    }));
  }
};
