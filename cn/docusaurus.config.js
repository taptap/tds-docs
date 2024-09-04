// @ts-check

const path = require("path");
const PREVIEW = process.env.PREVIEW ?? "false";

/** @type {import('@docusaurus/types').Config} */
const config = {
    title: "TapTap 开发者文档",
    url: "https://developer.taptap.cn",
    baseUrl: PREVIEW === "true" ? "/" : "/docs/",
    onBrokenLinks: "throw",
    onBrokenMarkdownLinks: "warn",
    favicon: "img/logoh.png",
    trailingSlash: true,
    customFields: {
        searchUrl: "https://tds-doc-search-api.leanapp.cn/search",
        upItemListIndexUrl: "https://tds-doc-search-check-log.leanapp.cn/api/check-log-up",
        aiSearchUrl: "https://tds-doc-search-ai-api.ap-sg.tdsapps.com/api/ai-search?type=TDS",
        aiSearchEnUrl: "https://tds-doc-search-ai-api.ap-sg.tdsapps.com/api/ai-search?type=TDSen",
        searchProviderName: "LeanDB Elasticsearch",
        searchProviderWebsite:
            "https://developer.taptap.cn/docs/sdk/engine/database/es/",
        mainDomainHost: "https://developer.taptap.cn/",
        dcDomainHost: "https://developer.taptap.cn?from=tds-docs",
    },

    i18n: {
        localeConfigs: {
            "zh-Hans": {
                label: "简体中文",
            },
        },
        defaultLocale: "zh-Hans",
        locales: ["zh-Hans"],
    },

    presets: [
        [
            "classic",
            /** @type {import('@docusaurus/preset-classic').Options} */
            ({
                docs: {
                    sidebarPath: require.resolve("./sidebars.js"),
                    routeBasePath: "/",
                    lastVersion: "current",
                    versions: {
                        current: {
                            label: "v4",
                        },
                        'v3': {
                            label: 'v3',
                            path: 'v3',
                            banner: "unmaintained",
                        },
                        'v2': {
                            label: 'v2',
                            path: 'v2',
                            banner: 'unmaintained',
                        },
                    },
                },
                theme: {
                    customCss: require.resolve("./src/styles/index.scss"),
                },
                googleAnalytics: {
                    trackingID: "UA-73963350-1",
                },
            }),
        ],
    ],

    themeConfig:
        /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
        ({
            navbar: {
                items: [
                    {
                        label: "文档首页",
                        to: "/",
                        position: "right",
                        activeBaseRegex: `^${PREVIEW === "true" ? "/" : "/docs/"
                            }(en/)?(?!.+)`,
                    },
                    {
                        label: "游戏商店",
                        to: "store",
                        position: "right",
                    },
                    {
                        label: "游戏服务",
                        to: "sdk",
                        position: "right",
                    },
                    {
                        label: "下载",
                        position: "right",
                        items: [
                            {
                                label: "设计资源",
                                to: "/design",
                            },
                            {
                                label: "SDK 工具包",
                                to: "/tap-download",
                            },
                        ],
                    },
                    {
                        type: "docsVersionDropdown",
                        position: "right",
                    },
                ],
            },
            prism: {
                theme: require("./src/theme/prism-taptap"),
                additionalLanguages: ["csharp", "java", "php", "groovy", "swift", "dart", "kotlin", "json"],
            },
            image: "/img/logo.svg",
            metadata: [
                {
                    name: "keywords",
                    content: "taptap tds 开发者 文档",
                },
            ],
            colorMode: {
                defaultMode: "light",
                disableSwitch: true,
            },
        }),

    plugins: [
        "docusaurus-plugin-sass",
        path.resolve(__dirname, "./plugins/npsmeter"),
    ],
};

module.exports = config;
