type LinkInternal = {
  label: string;
  to: string;
};

type LinkExternal = {
  label: string;
  href: string;
};

type Link = LinkInternal | LinkExternal;

type Entry = {
  title: string;
  description?: string;
  tag?: string;
  links: Link[];
};

export const getEntries = (brand: string, region: string): Entry[] => {
  const ENTRIES_TDS: Entry[] = [
    {
      title: "游戏商店",
      description: "有关如何上架游戏、开放测试和参与平台活动",
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
      ],
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
    ...(region === "global"
      ? [
        {
          title: "开发者运营手册",
          links: [
            {
              label: "查看更多",
              to: "/operations/manual",
            },
          ],
        },
      ]
      : []),
  ];

  const ENTRIES_LEANCLOUD: Entry[] = [
    {
      title: "控制台和账户",
      description: "LeanCloud 控制台使用指南",
      links: [
        {
          label: "查看更多",
          to: "/sdk/start/dashboard/",
        },
      ],
    },
    {
      title: "域名",
      description: "域名绑定、备案及常见问题",
      links: [
        {
          label: "查看更多",
          to: "/sdk/domain/guide",
        },
      ],
    },
    {
      title: "内建账户",
      description: "支持用户通过邮件或手机进行注册和登录，并提供密码重置、第三方登录等实用功能",
      links: [
        {
          label: "查看更多",
          to: "/sdk/authentication/guide",
        },
      ],
    },
    {
      title: "数据存储",
      description: "高效存取海量级 JSON 对象、二进制文件、地理位置等数据，提供完整的增删改查操作接口",
      links: [
        {
          label: "查看更多",
          to: "/sdk/storage/overview",
        },
      ],
    },
    {
      title: "云引擎",
      links: [
        {
          label: "查看更多",
          to: "/sdk/engine/overview",
        },
      ],
    },
    {
      title: "推送通知",
      links: [
        {
          label: "查看更多",
          to: "/sdk/push/features",
        },
      ],
    },
    {
      title: "即时通讯",
      links: [
        {
          label: "查看更多",
          to: "/sdk/im/features",
        },
      ],
    },
    {
      title: "短信",
      description: "支持国内短信和国际短信，用途包括验证类、通知类、营销类，方便与 LeanCloud 账户系统集成",
      links: [
        {
          label: "查看更多",
          to: "/sdk/sms/guide",
        },
      ],
    },
    {
      title: "多人在线对战",
      description: "不需要自己搭建后端系统，轻松实现游戏内玩家匹配、在线对战消息同步等功能",
      links: [
        {
          label: "查看更多",
          to: "/sdk/multiplayer/features",
        },
      ],
    },
    {
      title: "其他",
      links: [
        {
          label: "查看更多",
          to: "/sdk/other/error-code",
        },
      ],
    },
  ];

  const entries = brand === "leancloud" ? ENTRIES_LEANCLOUD : ENTRIES_TDS;
  return entries;
};
