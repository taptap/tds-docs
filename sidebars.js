// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  store: [
    {
      type: "link",
      label: "关于 TapTap",
      href: "https://www.taptap.cn/about-us/",
    },
    {
      type: "autogenerated",
      dirName: "store",
    },
    {
      type: "link",
      label: "侵权投诉",
      href: "https://www.taptap.cn/doc/27",
    },
  ],
  sdk: [
    {
      type: "autogenerated",
      dirName: "sdk",
    },
  ],
  design: [
    {
      type: "autogenerated",
      dirName: "design",
    },
    {
      type: "link",
      label: "品牌素材",
      href: "https://www.taptap.cn/about-us/brand-resources",
    },
  ],
  community: [
    {
      type: "autogenerated",
      dirName: "community",
    },
  ],
};

module.exports = sidebars;
