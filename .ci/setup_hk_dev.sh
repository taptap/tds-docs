#!/bin/sh

set -e

# 备份 CN 文档
mkdir -p cn_bak
rm -rf cn_bak/*
mv docs i18n versioned_docs versioned_sidebars versions.json cn_bak || true
mv docusaurus.config.js cn_bak/ || true
mv sidebars.js cn_bak/ || true
cp -r src cn_bak/

# 移动 TDS HK 文档
mv tds_hk/docs .
mv tds_hk/i18n .

# 替换配置文件
mv tds_hk/conf/env.ts src/constants/env.ts
mv tds_hk/conf/docusaurus.config.js docusaurus.config.js
mv tds_hk/conf/sidebars.js sidebars.js

# 预览
yarn start
