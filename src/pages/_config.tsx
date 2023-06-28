import { translate } from "@docusaurus/Translate";
import React from "react";
import { BRAND, REGION ,HAS_ENGINE_CDN_DOMAIN } from "../constants/env";


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
  description?: string;
  links: (ActionCellLinkInternal | ActionCellLinkExternal)[];
};

export const getEntries = (brand: string, region: string, pathname: String ): Entry[] => {


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
      title: "入门指南",
      description: "LeanCloud 的入门指南",
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
      description: "",
      links: [
        {
          label: "查看更多",
          to: "/sdk/other/error-code",
        },
      ],
    },
  ];
  const ENTRIES_LEANCLOUDEN: Entry[] = [


    {
      title: "内建账户",
      description: " Support users to register and log in via email or mobile, and provide practical functions such as password reset and third-party login.",
      links: [
        {
          label: "查看更多",
          to: "/sdk/authentication/guide",
        },
      ],
    },
    {
      title: "数据存储",
      description: "Efficient access to massive JSON objects, binary files and other data, providing a complete interface for adding, deleting, modifying, and querying operations",
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
      description: "Support domestic and international SMS, including verification, notification, and marketing purposes, to facilitate integration with the LeanCloud account system",
      links: [
        {
          label: "查看更多",
          to: "/sdk/sms/guide",
        },
      ],
    }

  ];

  var entries = brand === "leancloud" ?
  pathname=="/en/"? ENTRIES_LEANCLOUDEN:
  ENTRIES_LEANCLOUD : ENTRIES_TDS;



  return entries.map((entry) => ({
    title: translate({
      message: entry.title,
      id: `tds-home-${entry.title}`,
    }),
    ...(entry.description
      ? {
          description: translate({
            message: entry.description,
            id: `tds-home-${entry.description}`,
          }),
        }
      : {}),
    links: entry.links.map((link) => ({
      ...link,
      label: translate({
        message: link.label,
        id: `tds-home-link-${link.label}`,
      }),
    })),
  }));
};
