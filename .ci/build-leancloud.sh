#!/bin/sh

set -e


# 创建临时文件目录
mkdir -p tmp/zh-Hans tmp/en


# 加入 TDS 和 LeanCloud 共有的文档

# 中文部分
cp -r docs/sdk/_partials tmp/zh-Hans
cp -r docs/sdk/domain tmp/zh-Hans # 域名
cp -r docs/sdk/storage tmp/zh-Hans # 数据存储
cp -r docs/sdk/engine tmp/zh-Hans # 云引擎
cp -r docs/shadow/push tmp/zh-Hans # 推送通知
cp -r docs/sdk/im tmp/zh-Hans # 即时通讯
cp -r docs/sdk/multiplayer tmp/zh-Hans # 对战
cp -r docs/sdk/leaderboard tmp/zh-Hans # 排行榜

# 减去
rm tmp/zh-Hans/storage/features.mdx # 数据存储/功能介绍
rm tmp/zh-Hans/leaderboard/guide.mdx # 排行榜-开发指南
rm tmp/zh-Hans/leaderboard/faq.mdx # 排行榜-常见问题

# 英文部分
cp -r i18n/en/docusaurus-plugin-content-docs/current/sdk/_partials tmp/en
cp -r i18n/en/docusaurus-plugin-content-docs/current/sdk/storage tmp/en # 数据存储
cp -r i18n/en/docusaurus-plugin-content-docs/current/sdk/engine tmp/en # 云引擎

# 减去
rm tmp/en/storage/features.mdx # 数据存储/功能介绍
rm tmp/en/storage/rest.mdx # 数据存储/REST API


# 加入 LeanCloud 独有的文档

# 中文部分
cp -r .ci/leancloud/zh-Hans/sdk/start tmp/zh-Hans # 控制台和账户相关文档
cp -r .ci/leancloud/zh-Hans/sdk/authentication tmp/zh-Hans # 内建账户
cp -r .ci/leancloud/zh-Hans/sdk/storage tmp/zh-Hans # 数据存储（LeanCloud 独有的语言）
cp -r .ci/leancloud/zh-Hans/sdk/sms tmp/zh-Hans # 短信
cp -r .ci/leancloud/zh-Hans/sdk/push tmp/zh-Hans # Flutter 推送
cp -r .ci/leancloud/zh-Hans/sdk/im tmp/zh-Hans # 即时通讯
cp -r .ci/leancloud/zh-Hans/sdk/leaderboard tmp/zh-Hans # 排行榜
cp -r .ci/leancloud/zh-Hans/sdk/other tmp/zh-Hans # 其他


# 英文部分
cp -r .ci/leancloud/en/sdk/authentication tmp/en # 内建账户
cp -r .ci/leancloud/en/sdk/im tmp/en # 即时通讯
cp -r .ci/leancloud/en/sdk/push tmp/en # 推送
cp -r .ci/leancloud/en/sdk/sms tmp/en # 短信
cp -r .ci/leancloud/en/sdk/storage tmp/en # 数据存储（LeanCloud 独有的语言）


# 移除 TDS 文档
rm -r docs/* i18n/en/docusaurus-plugin-content-docs/current/* versioned_docs versioned_sidebars versions.json


# 将临时文件转正
mv tmp/zh-Hans docs/sdk
mv tmp/en i18n/en/docusaurus-plugin-content-docs/current/sdk


# 替换配置文件
cp .ci/leancloud/env.ts src/constants/env.ts
cp .ci/leancloud/override.scss src/styles/override.scss
cp .ci/leancloud/docusaurus.config.js docusaurus.config.js
cp .ci/leancloud/sidebars.js sidebars.js

# 加入 LeanCloud 隐藏文档
cp .ci/leancloud/zh-Hans/sdk/deeplink.mdx docs
cp .ci/leancloud/zh-Hans/sdk/classroom.mdx docs

# 构建
yarn build --out-dir build-leancloud


# 重置到初始状态
# git clean -df
# git checkout -f
