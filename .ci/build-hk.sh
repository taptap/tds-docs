#!/bin/sh

set -e


# 移除海外版没有的文档

# 中文版「文档首页」
rm -r docs/community # 社区运营指南

# 中文版「游戏商店」
rm -r docs/store

# 中文版「游戏服务」
rm docs/sdk/start/agreement.mdx # 入门指南/TapSDK 隐私政策
rm -r docs/sdk/domain # 域名
rm -r docs/sdk/fire-test # 薪火计划
rm docs/sdk/taptap-login/guide/upgrade1.x.mdx # TapTap 登录/开发指南/1.x 升级 3.x
rm docs/sdk/taptap-login/guide/upgrade2.x.mdx # TapTap 登录/开发指南/2.x 升级 3.x
rm docs/sdk/embedded-moments/features.mdx # 内嵌动态/功能介绍
rm docs/sdk/embedded-moments/bestpractice.mdx # 内嵌动态/最佳实践
rm -r docs/sdk/tap-friend # TapTap 好友
rm docs/sdk/achievement/bestpractice.mdx # 成就系统/最佳实践
rm -r docs/sdk/taplink # TapLink
rm -r docs/sdk/anti-addiction # 防沉迷
rm -r docs/sdk/tap-play # TapPlay
rm -r docs/sdk/tap-canary # TapCanary
rm docs/sdk/engine/dedicated-IP.mdx # 云引擎/独立 IP
rm docs/sdk/push/guide/android-mixpush.mdx # 推送通知/开发指南/Android 混合推送
rm docs/sdk/push/guide/callback-vendor.mdx # 推送通知/开发指南/回调服务厂商配置
rm -r docs/sdk/multiplayer # 多人在线对战

# 英文版「游戏商店」
rm -r i18n/en/docusaurus-plugin-content-docs/current/store

# 英文版「游戏服务」
rm i18n/en/docusaurus-plugin-content-docs/current/sdk/embedded-moments/features.mdx # 内嵌动态/功能介绍


# 增加海外版独有的文档

# 中文版「文档首页」
cp -r .ci/hk/zh-Hans/operations docs/operations # 开发者运营手册

# 中文版「游戏商店」
cp -r .ci/hk/zh-Hans/store docs/store

# 中文版「游戏服务」
cp .ci/hk/zh-Hans/sdk/embedded-moments/features.mdx docs/sdk/embedded-moments/features.mdx # 内嵌动态/功能介绍
cp .ci/hk/zh-Hans/sdk/push/guide/android-mixpush.mdx docs/sdk/push/guide/android-mixpush.mdx # 推送通知/开发指南/FCM 推送

# 英文版「文档首页」
cp -r .ci/hk/en/operations i18n/en/docusaurus-plugin-content-docs/current/operations # 开发者运营手册

# 英文版「游戏商店」
cp -r .ci/hk/en/store i18n/en/docusaurus-plugin-content-docs/current/store

# 英文版「游戏服务」
cp .ci/hk/en/sdk/embedded-moments/features.mdx i18n/en/docusaurus-plugin-content-docs/current/sdk/embedded-moments/features.mdx # 内嵌动态/功能介绍


# 替换配置文件
cp .ci/hk/env.ts src/constants/env.ts
cp .ci/hk/docusaurus.config.js docusaurus.config.js
cp .ci/hk/sidebars.js sidebars.js


# 移除 v2 文档
rm -r versioned_docs versioned_sidebars versions.json


# 构建
yarn build --out-dir build-hk


# 重置到初始状态
git clean -df
git checkout -f
